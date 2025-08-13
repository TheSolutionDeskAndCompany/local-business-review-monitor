#!/usr/bin/env node

/**
 * Smoke Test Suite for ReviewReady
 * Tests critical functionality to ensure basic app health
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const API_URL = process.env.API_URL || 'http://localhost:5000';

class SmokeTest {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.results = [];
  }

  async test(name, testFn) {
    try {
      console.log(`🧪 Testing: ${name}`);
      await testFn();
      console.log(`✅ PASS: ${name}`);
      this.passed++;
      this.results.push({ name, status: 'PASS' });
    } catch (error) {
      console.log(`❌ FAIL: ${name} - ${error.message}`);
      this.failed++;
      this.results.push({ name, status: 'FAIL', error: error.message });
    }
  }

  async runAll() {
    console.log('🚀 Starting ReviewReady Smoke Tests\n');

    // Test 1: Static files exist
    await this.test('Static files exist', async () => {
      const requiredFiles = [
        'client/public/index.html',
        'client/public/Review-Ready-logo.png',
        'client/src/App.js',
        'client/src/components/Landing.js',
        'client/src/components/Dashboard.js',
        'vercel.json',
        'package.json'
      ];

      for (const file of requiredFiles) {
        const filePath = path.join(__dirname, '..', file);
        if (!fs.existsSync(filePath)) {
          throw new Error(`Required file missing: ${file}`);
        }
      }
    });

    // Test 2: Package.json has required scripts
    await this.test('Package.json scripts', async () => {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      const requiredScripts = ['start', 'build', 'lint', 'test'];
      for (const script of requiredScripts) {
        if (!pkg.scripts[script]) {
          throw new Error(`Missing script: ${script}`);
        }
      }
    });

    // Test 3: Vercel config is valid
    await this.test('Vercel configuration', async () => {
      const vercelPath = path.join(__dirname, '..', 'vercel.json');
      const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
      
      if (!config.rewrites || !Array.isArray(config.rewrites)) {
        throw new Error('Missing or invalid rewrites configuration');
      }

      const spaRewrite = config.rewrites.find(r => r.destination === '/index.html');
      if (!spaRewrite) {
        throw new Error('Missing SPA fallback rewrite');
      }
    });

    // Test 4: API endpoints exist
    await this.test('API endpoints exist', async () => {
      const apiEndpoints = [
        'api/connectors.js',
        'api/auth/register.js',
        'api/auth/login.js',
        'api/auth/me.js',
        'api/business/connect/google.js',
        'api/business/connect/yelp.js',
        'api/business/connect/facebook.js'
      ];

      for (const endpoint of apiEndpoints) {
        const filePath = path.join(__dirname, '..', endpoint);
        if (!fs.existsSync(filePath)) {
          throw new Error(`API endpoint missing: ${endpoint}`);
        }
      }
    });

    // Test 5: Environment variables check
    await this.test('Environment variables', async () => {
      const requiredEnvVars = ['JWT_SECRET'];
      const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
      
      if (missingVars.length > 0) {
        console.warn(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
        console.warn('   These are required for production deployment');
      }
    });

    // Test 6: React components syntax check
    await this.test('React components syntax', async () => {
      const components = [
        'client/src/components/Landing.js',
        'client/src/components/Dashboard.js',
        'client/src/components/Login.js'
      ];

      for (const component of components) {
        const filePath = path.join(__dirname, '..', component);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Basic syntax checks
          if (!content.includes('export default')) {
            throw new Error(`${component}: Missing default export`);
          }
          
          if (content.includes('function') && !content.includes('return')) {
            throw new Error(`${component}: Function component missing return statement`);
          }
        }
      }
    });

    this.printResults();
  }

  printResults() {
    console.log('\n📊 Smoke Test Results');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${this.passed}`);
    console.log(`❌ Failed: ${this.failed}`);
    console.log(`📈 Success Rate: ${Math.round((this.passed / (this.passed + this.failed)) * 100)}%`);
    
    if (this.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results
        .filter(r => r.status === 'FAIL')
        .forEach(r => console.log(`   • ${r.name}: ${r.error}`));
    }

    console.log('\n🎯 Smoke test complete!');
    
    // Exit with error code if tests failed
    if (this.failed > 0) {
      process.exit(1);
    }
  }
}

// Run smoke tests if called directly
if (require.main === module) {
  const smokeTest = new SmokeTest();
  smokeTest.runAll().catch(error => {
    console.error('💥 Smoke test suite failed:', error);
    process.exit(1);
  });
}

module.exports = SmokeTest;
