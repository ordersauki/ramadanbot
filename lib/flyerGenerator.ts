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

  // Build absolute URL for background image - ensure it's from /public
  const backgroundImageUrl = '/ramadan-background.png';
  const absoluteImageUrl = `${window.location.origin}${backgroundImageUrl}`;
  
  console.log('🖼️ Loading background from:', absoluteImageUrl);

  container.innerHTML = `
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:wght@400;600;700&family=Playfair+Display:wght@600;700&family=Amiri:wght@400;700&display=block" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    </style>
    
    <div id="flyer-canvas" style="
        width: 1080px; 
        height: 1080px; 
        position: relative; 
        background-image: url('${backgroundImageUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repabsoluteImageUrl}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed
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
    
    // Preload and verify background image exists and can be loaded
    const preloadBackgroundImage = new Promise<void>((resolve, reject) => {
      const img = new Image();
      let loadTimeoutId: NodeJS.Timeout;
      
      img.onload = () => {
        clearTimeout(loadTimeoutId);
        console.log('✓ Background image loaded successfully');
        resolve();
      };
      
      img.onerror = () => {
        clearTimeout(loadTimeoutId);
        console.error('✗ Background image failed to load from:', absoluteImageUrl);
        reject(new Error(`Failed to load from: ${absoluteImageUrl}`));
      };
      
      // Set a 10-second timeout 
      loadTimeoutId = setTimeout(() => {
        console.error('✗ Background image load timeout');
        reject(new Error('Image load timeout - server may be slow'));
      }, 8000);
      
      img.crossOrigin = 'anonymous';
      img.src = absoluteImageUrl;
    });
    
    try {
      await preloadBackgroundImage;
    } catch (imgError) {
      console.error('💥 Image loading error:', imgError);
      throw imgError;
    }

    // Wait for fonts to be fully loaded - simple non-blocking wait
    const waitForFonts = new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        console.warn('⚠️ Fonts: continuing anyway');
        resolve();
      }, 2000);
      document.fonts.ready.then(() => {
        clearTimeout(timeout);
        console.log('✓ Fonts ready');
        resolve();
      }).catch(() => {
        clearTimeout(timeout);
        resolve();
      });
    });
    
    await waitForFonts;

    // Quick render wait
    await wait(600);

    const flyerElement = document.getElementById('flyer-canvas');
    if (!flyerElement) throw new Error('Flyer element not found');

    // Verify the background is applied
    const computedStyle = window.getComputedStyle(flyerElement);
    console.log('✓ Canvas ready');

    try {
      console.log('🎨 Rendering...');
      const canvas = await html2canvas(flyerElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 1080,
        height: 1080,
        windowWidth: 1080,
        windowHeight: 1080,
        imageTimeout: 10000,
        backgroundColor: null,
        foreignObjectRendering: true,
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const sizeMB = (dataUrl.length / 1024 / 1024).toFixed(2);
      console.log('✓ Success -', sizeMB, 'MB');
      
      // Clean up
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      
      return dataUrl;
    } catch (canvasError) {
      console.error('💥 Canvas error:', canvasError);
      throw canvasError;
    }
  } catch (error) {
    console.error('CRITICAL Flyer generation error:', error);
    const existingContainer = document.getElementById('flyer-generator-container');
    if (existingContainer && document.body.contains(existingContainer)) {
      document.body.removeChild(existingContainer);
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