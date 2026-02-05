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

  // Fetch background image and convert to data URL for reliable rendering
  const backgroundImageUrl = '/ramadan-background.png';
  const absoluteImageUrl = `${window.location.origin}${backgroundImageUrl}`;
  
  console.log('🖼️ Fetching background from:', absoluteImageUrl);
  
  let backgroundDataUrl = 'none';
  try {
    const response = await fetch(absoluteImageUrl);
    if (response.ok) {
      const blob = await response.blob();
      backgroundDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      console.log('✓ Background fetched as data URL');
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    console.error('💥 Failed to fetch background:', err);
    throw new Error(`Background image load failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

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
        font-family: 'Cormorant Garamond', serif;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 60px 40px;
    ">
        <!-- Background Image Layer -->
        <img src="${backgroundDataUrl}" style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            z-index: 1;
        " alt="Ramadan Background" crossorigin="anonymous" />
        
        <!-- Day (Top Left - Caligraphic) -->
        <div style="
            position: absolute;
            top: 90px;
            left: 50px;
            text-align: left;
            z-index: 20;
        ">
            <div style="
                font-family: 'Amiri', serif;
                font-size: 84px;
                font-weight: 700;
                color: rgba(244, 208, 63, 0.95);
                line-height: 1;
                letter-spacing: -2px;
                text-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
            ">${config.day}</div>
            <div style="
                font-family: 'Playfair Display', serif;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
                letter-spacing: 3px;
                text-transform: uppercase;
                margin-top: 4px;
            ">RAMADAN</div>
        </div>

        <!-- Message with Quote Marks (Center) -->
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            gap: 16px;
            position: relative;
            padding: 0 30px;
            z-index: 15;
        ">
            <!-- Opening Quote Mark -->
            <div style="
                font-family: 'Playfair Display', serif;
                font-size: 72px;
                color: rgba(244, 208, 63, 0.75);
                line-height: 0.6;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
                opacity: 0.9;
            ">"</div>
            
            <!-- Message Text - Perfectly Fitted Quote -->
            <p style="
                font-family: 'Playfair Display', serif;
                font-size: 40px;
                line-height: 1.7;
                color: rgba(255, 255, 255, 0.98);
                text-align: center;
                font-weight: 500;
                letter-spacing: 0.2px;
                margin: 0;
                max-width: 900px;
                text-shadow: 
                    0 3px 14px rgba(0, 0, 0, 0.55),
                    0 1px 4px rgba(0, 0, 0, 0.3);
                word-wrap: break-word;
                overflow-wrap: break-word;
                white-space: normal;
            ">${escapeHtml(config.message)}</p>
            
            <!-- Closing Quote Mark -->
            <div style="
                font-family: 'Playfair Display', serif;
                font-size: 72px;
                color: rgba(244, 208, 63, 0.75);
                line-height: 0.6;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
                opacity: 0.9;
                transform: scaleY(-1);
            ">"</div>
        </div>

        <!-- User Name Section (Bottom - Repositioned & Restyled) -->
        <div style="
            position: absolute;
            bottom: 180px;
            left: 0;
            right: 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            z-index: 16;
        ">
            <!-- Decorative Divider Line -->
            <div style="
                width: 80px;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(244, 208, 63, 0.7), transparent);
                margin-bottom: 4px;
            "></div>
            
            <!-- User Name - Elegant Golden Styling -->
            <h2 style="
                font-family: 'Amiri', serif;
                font-size: 44px;
                font-weight: 700;
                color: rgba(244, 208, 63, 0.9);
                letter-spacing: 2px;
                text-shadow: 
                    0 4px 16px rgba(0, 0, 0, 0.7),
                    0 1px 4px rgba(0, 0, 0, 0.5);
                margin: 0;
                line-height: 1;
                font-style: italic;
            ">${escapeHtml(config.userName)}</h2>
        </div>

    </div>
  `;


  try {
    // Wait for DOM to settle
    await wait(200);
    
    // Wait for fonts to load
    const fontTimeout = setTimeout(() => {
      console.warn('⚠️ Fonts taking time, proceeding');
    }, 2500);
    
    try {
      await document.fonts.ready;
      clearTimeout(fontTimeout);
      console.log('✓ Fonts ready');
    } catch {
      clearTimeout(fontTimeout);
      console.warn('⚠️ Fonts: proceeding with fallback');
    }
    
    // Extended wait for layout and rendering
    await wait(1500);

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