import React from 'react';
import { ExternalLink } from 'lucide-react';

const Connectors = () => {
  const providers = [
    { 
      id: 'google', 
      name: 'Google Business Profile', 
      status: 'available',
      description: 'Connect your Google Business Profile to monitor and respond to reviews',
      icon: 'G',
      available: true
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      status: 'available',
      description: 'Connect your Facebook Business Page to monitor and respond to reviews',
      icon: 'F',
      available: true
    },
    { 
      id: 'yelp', 
      name: 'Yelp', 
      status: 'available',
      description: 'Connect your Yelp Business to monitor and respond to reviews',
      icon: 'Y',
      available: true
    }
  ];

  const handleRequestAccess = (provider) => {
    const subject = `Request Access to ${provider.name} Integration`;
    const body = `Hello ReviewReady team,\n\nI would like to request access to the ${provider.name} integration.\n\nBusiness Name: [Your Business Name]\nEmail: [Your Email]\n\nThank you!`;
    
    window.location.href = `mailto:support@thesolutiondesk.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Connect Your Review Platforms</h1>
      <p className="text-gray-600 mb-8">
        Connect your business profiles to monitor and respond to reviews from multiple platforms in one place.
      </p>
      
      <div className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-100 text-gray-700 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                  {provider.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{provider.name}</h3>
                  <p className="text-gray-600">{provider.description}</p>
                </div>
              </div>
              
              {provider.available ? (
                <a 
                  href="/dashboard" 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Connect
                </a>
              ) : (
                <button 
                  onClick={() => handleRequestAccess(provider)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Request Access
                </button>
              )}
            </div>
            
            {!provider.available && (
              <div className="mt-4 text-sm text-gray-500">
                Coming soon. Request early access to be notified when this integration is available.
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Need help connecting your accounts?</h3>
        <p className="text-blue-700 mb-4">
          Our team is here to help you set up your review monitoring. Contact us for assistance.
        </p>
        <a 
          href="mailto:support@thesolutiondesk.ca?subject=Help%20with%20Connecting%20Accounts"
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Contact Support <ExternalLink className="ml-1" size={16} />
        </a>
      </div>
    </div>
  );
};

export default Connectors;
