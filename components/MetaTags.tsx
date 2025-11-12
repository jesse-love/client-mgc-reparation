import React, { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  noIndex?: boolean;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, noIndex = false }) => {
  useEffect(() => {
    document.title = title;
    
    // Remove existing meta description if it exists
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Handle noindex for pages like /merci
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noIndex) {
        if (!metaRobots) {
            metaRobots = document.createElement('meta');
            metaRobots.setAttribute('name', 'robots');
            document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
        if (metaRobots) {
            metaRobots.remove();
        }
    }
    
    // Cleanup on component unmount
    return () => {
      // You might want to reset to a default title/description here
      // For this SPA, it's okay to leave it as the last set value
      if (noIndex && metaRobots) {
          metaRobots.remove();
      }
    };
  }, [title, description, noIndex]);

  return null;
};

export default MetaTags;
