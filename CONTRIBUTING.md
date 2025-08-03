# Contributing to ReviewMonitor

Thank you for your interest in contributing to ReviewMonitor! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/local-business-review-monitor.git
   cd local-business-review-monitor
   ```
3. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Add your API keys and configuration
   ```

## Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run dev  # Start backend
   cd client && npm start  # Start frontend
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Coding Standards

### Backend (Node.js/Express)
- Use ES6+ features
- Follow RESTful API conventions
- Add error handling for all routes
- Include JSDoc comments for functions
- Use async/await for asynchronous operations

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use descriptive component and variable names
- Add PropTypes for component props
- Keep components small and focused

### General
- Write clear, descriptive commit messages
- Add comments for complex logic
- Follow existing code style and patterns
- Update documentation when needed

## Commit Message Format

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
- `feat(auth): add password reset functionality`
- `fix(dashboard): resolve review loading issue`
- `docs(readme): update installation instructions`

## Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes
- **Breaking Changes**: Clearly mark any breaking changes

## Issue Guidelines

When creating issues:

- **Use templates** when available
- **Be specific** about the problem or feature request
- **Include steps to reproduce** for bugs
- **Add labels** to categorize the issue
- **Check for duplicates** before creating new issues

## Code Review Process

1. All changes require review before merging
2. Address all review comments
3. Ensure CI/CD checks pass
4. Maintain backward compatibility when possible
5. Update documentation if needed

## Getting Help

- **Documentation**: Check the README and docs
- **Issues**: Search existing issues first
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact support@reviewmonitor.com for sensitive matters

## License

By contributing to ReviewMonitor, you agree that your contributions will be licensed under the MIT License.
