import React, { useEffect } from 'react';

interface GoogleAdProps {
  slot: string; // The Ad Slot ID from your AdSense dashboard
  client?: string; // Your Publisher ID (e.g., ca-pub-XXXXXXXXXXXXXXXX)
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const GoogleAd: React.FC<GoogleAdProps> = ({ 
  slot, 
  client = 'ca-pub-YOUR_PUBLISHER_ID', // Default placeholder
  format = 'auto', 
  responsive = true,
  style = { display: 'block' },
  className = ''
}) => {
  useEffect(() => {
    try {
      // Push the ad to Google's queue
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`ad-container w-full flex justify-center my-4 overflow-hidden ${className}`}>
        {/* The ins tag is where the ad will be injected by Google */}
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
    </div>
  );
};