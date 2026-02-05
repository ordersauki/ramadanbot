import html2canvas from 'html2canvas';
import { FlyerConfig } from '../types';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to escape HTML
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

export const generateFlyer = async (config: FlyerConfig): Promise<string> => {
  const container = document.createElement('div');
  container.id = 'flyer-generator-container';
  
  const width = 1080;
  const height = 1080;

  // Ensure it's rendered but hidden from user view
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: `${width}px`,
    height: `${height}px`,
    zIndex: '-9999',
    visibility: 'visible',
    overflow: 'hidden',
  });

  document.body.appendChild(container);

  // Preload the background image with absolute path
  const backgroundImageUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/ramadan-background.png`;

  // Create hidden image element to preload
  const preloadImg = new Image();
  preloadImg.src = backgroundImageUrl;
  preloadImg.style.display = 'none';
  document.body.appendChild(preloadImg);

  container.innerHTML = `
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:wght@400;600;700&display=swap" rel="stylesheet">
    
    <div id="flyer-canvas" style="
        width: 1080px; 
        height: 1080px; 
        position: relative; 
        background-color: #0F766E; /* Fallback color */
        background-image: url('${backgroundImageUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        font-family: 'Cormorant Garamond', serif;
        overflow: hidden;
    ">
        
        <!-- Content Overlay -->
        <div style="
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 50px 40px 100px;
            z-index: 10;
        ">

            <!-- Day Badge (Top Left) -->
            <div style="
                position: absolute;
                top: 50px;
                left: 50px;
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(244, 208, 63, 0.95) 100%);
                padding: 20px 35px;
                border-radius: 20px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
                text-align: center;
                border: 2px solid rgba(255, 255, 255, 0.3);
            ">
                <div style="
                    font-family: 'Cinzel', serif;
                    font-size: 68px;
                    font-weight: 800;
                    color: #0A4D3C;
                    line-height: 1;
                    letter-spacing: 2px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                ">${config.day}</div>
                <div style="
                    font-family: 'Cinzel', serif;
                    font-size: 16px;
                    font-weight: 700;
                    color: #0A4D3C;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    margin-top: 5px;
                ">DAY</div>
            </div>

            <!-- Spacer to push content to center -->
            <div style="flex: 0.3;"></div>

            <!-- Message Card (Center) -->
            <div style="
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
                border-radius: 35px;
                padding: 55px 50px;
                width: 880px;
                max-width: 90%;
                min-height: 320px;
                max-height: 480px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
                border: 3px solid rgba(212, 175, 55, 0.4);
                position: relative;
                margin: 0 auto;
            ">
                <!-- Corner Decorations -->
                <div style="
                    position: absolute;
                    top: -3px;
                    left: -3px;
                    width: 60px;
                    height: 60px;
                    border-left: 3px solid #D4AF37;
                    border-top: 3px solid #D4AF37;
                    border-top-left-radius: 35px;
                "></div>
                <div style="
                    position: absolute;
                    bottom: -3px;
                    right: -3px;
                    width: 60px;
                    height: 60px;
                    border-right: 3px solid #D4AF37;
                    border-bottom: 3px solid #D4AF37;
                    border-bottom-right-radius: 35px;
                "></div>
                
                <p style="
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 38px;
                    line-height: 1.65;
                    color: #0F766E;
                    text-align: center;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    margin: 0;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                ">${escapeHtml(config.message)}</p>
            </div>

            <!-- Spacer -->
            <div style="flex: 0.15;"></div>

            <!-- User Name Section -->
            <div style="
                text-align: center;
                margin-top: 35px;
            ">
                <!-- Decorative Line -->
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 18px;
                    margin-bottom: 15px;
                ">
                    <div style="
                        width: 100px;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, rgba(244, 208, 63, 0.8), transparent);
                    "></div>
                    <span style="
                        color: #F4D03F;
                        font-size: 22px;
                        filter: drop-shadow(0 2px 8px rgba(244, 208, 63, 0.6));
                    ">✦</span>
                    <div style="
                        width: 100px;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, rgba(244, 208, 63, 0.8), transparent);
                    "></div>
                </div>
                
                <h2 style="
                    font-family: 'Cinzel', serif;
                    font-size: 48px;
                    font-weight: 700;
                    color: #FFFFFF;
                    letter-spacing: 2px;
                    text-shadow: 
                        0 4px 12px rgba(0, 0, 0, 0.6),
                        0 2px 4px rgba(0, 0, 0, 0.4);
                    margin: 0;
                    line-height: 1.2;
                ">${escapeHtml(config.userName)}</h2>
            </div>

        </div>

    </div>
  `;

  try {
    // Wait for DOM
    await wait(100);
    
    // Wait for fonts to load
    await document.fonts.ready;
    
    // Ensure background image is fully loaded before rendering
    const backgorundLoadedPromise = new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        console.log('Background image loaded successfully');
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`Could not load background image, using fallback color`);
        resolve(); // Resolve anyway so we generate something
      };
      
      // Set a timeout to prevent indefinite waiting
      setTimeout(() => {
        console.warn('Background image load timeout, proceeding with fallback');
        resolve();
      }, 2500);
      
      img.src = backgroundImageUrl;
    });
    
    await backgorundLoadedPromise;

    // Additional wait for rendering layout with the image
    await wait(1000);

    const flyerElement = document.getElementById('flyer-canvas');
    if (!flyerElement) throw new Error('Flyer element not found');

    // Ensure the background is visible before rendering
    const computedStyle = window.getComputedStyle(flyerElement);
    console.log('Flyer background image:', computedStyle.backgroundImage);

    const canvas = await html2canvas(flyerElement, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#0F766E',
      logging: false,
      width: 1080,
      height: 1080,
      windowWidth: 1080,
      windowHeight: 1080,
      imageTimeout: 0,
    });

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    
    // Clean up
    if (document.body.contains(preloadImg)) {
      document.body.removeChild(preloadImg);
    }
    document.body.removeChild(container);
    
    return dataUrl;
  } catch (error) {
    console.error('Flyer generation error:', error);
    const existingContainer = document.getElementById('flyer-generator-container');
    if (existingContainer && document.body.contains(existingContainer)) {
      document.body.removeChild(existingContainer);
    }
    if (document.body.contains(preloadImg)) {
      document.body.removeChild(preloadImg);
    }
    throw error;
  }
};

export const downloadFlyer = (dataUrl: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const slugify = (text: string) => 
  text.toLowerCase().replace(/[^\w]+/g, '-');