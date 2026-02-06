import React, { useEffect } from 'react';

interface FontLoaderProps {
  headingFont: string;
  bodyFont: string;
}

export const FontLoader: React.FC<FontLoaderProps> = ({ headingFont, bodyFont }) => {
  useEffect(() => {
    const fonts = [headingFont, bodyFont];
    
    // Debounce to prevent flashing/spamming API during typing
    const timeoutId = setTimeout(() => {
        fonts.forEach(font => {
            if (!font) return;
            
            // Normalize ID to check for existence
            const fontId = `font-${font.replace(/\s+/g, '-').toLowerCase()}`;
            if (document.getElementById(fontId)) return;

            // Construct URL: Replace spaces with +, request common weights
            const normalizedFontName = font.replace(/\s+/g, '+');
            const url = `https://fonts.googleapis.com/css2?family=${normalizedFontName}:wght@300;400;500;600;700;800&display=swap`;

            const link = document.createElement('link');
            link.id = fontId;
            link.rel = 'stylesheet';
            link.href = url;
            
            document.head.appendChild(link);
            
            // Optional: Simple log for debugging
            console.log(`Loading font: ${font}`);
        });
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [headingFont, bodyFont]);

  return null;
};