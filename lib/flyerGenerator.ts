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

  // Preload the background image - NO fallbacks, must load
  const preloadImg = new Image();
  preloadImg.src = backgroundImageUrl;
  preloadImg.style.display = 'none';
  document.body.appendChild(preloadImg);

  container.innerHTML = `
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:wght@400;600;700&family=Playfair+Display:wght@600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    
    <div id="flyer-canvas" style="
        width: 1080px; 
        height: 1080px; 
        position: relative; 
        background-image: url('${backgroundImageUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        font-family: 'Cormorant Garamond', serif;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 60px 40px;
    ">
        
        <!-- Day Circle (Top) -->
        <div style="
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(244, 208, 63, 0.9) 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 12px 40px rgba(212, 175, 55, 0.5), inset 0 2px 8px rgba(255, 255, 255, 0.4);
            border: 3px solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(10px);
        ">
            <div style="
                font-family: 'Cinzel', serif;
                font-size: 72px;
                font-weight: 800;
                color: #0A4D3C;
                line-height: 1;
                letter-spacing: 2px;
                text-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
            ">${config.day}</div>
            <div style="
                font-family: 'Cinzel', serif;
                font-size: 14px;
                font-weight: 700;
                color: #0A4D3C;
                letter-spacing: 3px;
                text-transform: uppercase;
                margin-top: 8px;
                opacity: 0.9;
            ">RAMADAN</div>
        </div>

        <!-- Message with Quote Marks (Center) -->
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            gap: 20px;
            position: relative;
        ">
            <!-- Opening Quote -->
            <div style="
                font-family: 'Playfair Display', serif;
                font-size: 80px;
                color: rgba(244, 208, 63, 0.8);
                line-height: 0.8;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            ">"</div>
            
            <!-- Message Text -->
            <p style="
                font-family: 'Playfair Display', serif;
                font-size: 42px;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.95);
                text-align: center;
                font-weight: 600;
                letter-spacing: 0.5px;
                margin: 0 20px;
                max-width: 850px;
                text-shadow: 
                    0 3px 12px rgba(0, 0, 0, 0.5),
                    0 1px 3px rgba(0, 0, 0, 0.3);
                word-wrap: break-word;
                overflow-wrap: break-word;
                white-space: normal;
            ">${escapeHtml(config.message)}</p>
            
            <!-- Closing Quote -->
            <div style="
                font-family: 'Playfair Display', serif;
                font-size: 80px;
                color: rgba(244, 208, 63, 0.8);
                line-height: 0.8;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                transform: scaleY(-1);
            ">"</div>
        </div>

        <!-- User Name Section (Bottom) -->
        <div style="
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        ">
            <!-- Decorative Star -->
            <span style="
                color: rgba(244, 208, 63, 0.7);
                font-size: 24px;
                text-shadow: 0 2px 6px rgba(244, 208, 63, 0.4);
            ">✦</span>
            
            <!-- User Name with Calligraphy Font -->
            <h2 style="
                font-family: 'Amiri', serif;
                font-size: 56px;
                font-weight: 700;
                color: rgba(244, 208, 63, 0.95);
                letter-spacing: 1px;
                text-shadow: 
                    0 4px 12px rgba(0, 0, 0, 0.6),
                    0 2px 4px rgba(0, 0, 0, 0.4);
                margin: 0;
                line-height: 1.1;
            ">${escapeHtml(config.userName)}</h2>
        </div>

    </div>
  `;


  try {
    // Wait for DOM
    await wait(100);
    
    // Wait for fonts to load
    await document.fonts.ready;
    
    // Ensure background image is fully loaded BEFORE rendering
    const backgroundLoadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        console.log('✓ Background image loaded successfully');
        resolve();
      };
      
      img.onerror = (error) => {
        console.error('✗ CRITICAL: Background image failed to load', error);
        reject(new Error(`Failed to load background: ${backgroundImageUrl}`));
      };
      
      // 5 second timeout before rejecting
      const timeout = setTimeout(() => {
        reject(new Error('Background image load timeout'));
      }, 5000);
      
      img.src = backgroundImageUrl;
      
      // Clean up timeout if image loads
      img.addEventListener('load', () => clearTimeout(timeout));
    });
    
    try {
      await backgroundLoadPromise;
    } catch (imgError) {
      console.error('Background image loading error:', imgError);
      throw new Error('Background image is required - cannot proceed without it');
    }

    // Extended wait for rendering layout
    await wait(1500);

    const flyerElement = document.getElementById('flyer-canvas');
    if (!flyerElement) throw new Error('Flyer element not found');

    // Verify the background is applied
    const computedStyle = window.getComputedStyle(flyerElement);
    console.log('Flyer background applied:', computedStyle.backgroundImage);

    const canvas = await html2canvas(flyerElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 1080,
      height: 1080,
      windowWidth: 1080,
      windowHeight: 1080,
      imageTimeout: 0,
      backgroundColor: null,
    });

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    
    // Clean up
    if (document.body.contains(preloadImg)) {
      document.body.removeChild(preloadImg);
    }
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    
    return dataUrl;
  } catch (error) {
    console.error('CRITICAL Flyer generation error:', error);
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