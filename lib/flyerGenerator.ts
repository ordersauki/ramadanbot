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
        
        <!-- Elegant Gold Badge (Top Left) -->
        <div style="
          position: absolute;
          top: 40px;
          left: 40px;
          z-index: 22;
          display: flex;
          align-items: center;
        ">
          <div style="
            background: rgba(255, 250, 240, 0.95);
            border: 3px solid #C9A961;
            border-radius: 20px;
            padding: 20px 35px;
            box-shadow: 0 8px 25px rgba(201, 169, 97, 0.3);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            min-width: 140px;
          ">
            <div style="
              font-family: 'Cinzel', 'Playfair Display', serif;
              font-size: 16px;
              font-weight: 700;
              color: #8B6F47;
              letter-spacing: 4px;
              text-transform: uppercase;
            ">DAY</div>

            <div style="
              font-family: 'Cinzel', 'Playfair Display', serif;
              font-size: 72px;
              font-weight: 800;
              color: #8B6F47;
              line-height: 1;
              -webkit-font-smoothing: antialiased;
            ">${config.day}</div>
          </div>
        </div>

        <!-- Ramadan header intentionally omitted (background contains caligraphy) -->

        <!-- Message with Quote Marks (Center) -->
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          gap: 12px;
          position: relative;
          padding: 60px 40px 0 40px;
          z-index: 15;
          max-width: 900px;
          margin: 0 auto;
        ">
            <!-- Opening Quote Mark -->
            <div style="
                font-family: 'Playfair Display', serif;
                font-size: 58px;
                color: rgba(244, 208, 63, 0.75);
                line-height: 0.6;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                opacity: 0.9;
            ">"</div>
            
            <!-- Message Text (Dark Brown) -->
            <p style="
                font-family: 'Playfair Display', serif;
                font-size: 32px;
                line-height: 1.7;
                color: #4E342E;
                text-align: center;
                font-weight: 500;
                letter-spacing: 0.2px;
                margin: 0;
                max-width: 850px;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                word-wrap: break-word;
                overflow-wrap: break-word;
                white-space: normal;
            ">${config.message}</p>
            
            <!-- Closing Quote Mark -->
            <div style="
                font-family: 'Playfair Display', serif;
                font-size: 58px;
                color: rgba(244, 208, 63, 0.75);
                line-height: 0.6;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                opacity: 0.9;
            ">"</div>

            <!-- User Name Signature: simple, modern, placed immediately below the message -->
            <p style="
              font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              font-size: 20px;
              font-weight: 600;
              color: #3B2F2B;
              margin: 0;
              line-height: 1.2;
              margin-top: 12px;
              letter-spacing: 0.4px;
              text-align: center;
            ">${escapeHtml(config.userName)}</p>
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