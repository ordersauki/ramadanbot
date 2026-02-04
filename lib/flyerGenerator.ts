import html2canvas from 'html2canvas';
import { FlyerConfig } from '../types';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateFlyer = async (config: FlyerConfig): Promise<string> => {
  // Create a container that is fixed but visible to the engine
  const container = document.createElement('div');
  container.id = 'flyer-generator-container';
  
  // High Resolution
  const width = 1080;
  const height = 1080;

  // Position it off-screen but effectively "visible" for the renderer
  // We place it at 0,0 but behind everything with z-index.
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: `${width}px`,
    height: `${height}px`,
    zIndex: '-1000', // Behind UI
    visibility: 'visible',
    overflow: 'hidden',
    backgroundColor: '#0A4D3C' // Base color
  });

  document.body.appendChild(container);

  // We use inline styles heavily to ensure html2canvas picks them up without delay
  container.innerHTML = `
    <!-- Load Fonts explicitly inside the container -->
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Cormorant+Garamond:wght@600&display=swap" rel="stylesheet">
    
    <div style="
        width: 1080px; 
        height: 1080px; 
        position: relative; 
        background: linear-gradient(135deg, #0A4D3C 0%, #0F766E 100%);
        font-family: 'Cormorant Garamond', serif;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    ">
        
        <!-- Background Pattern -->
        <div style="
            position: absolute; 
            inset: 0; 
            opacity: 0.1; 
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGw0MCA0MEwwIDQweiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+');
            z-index: 1;
        "></div>

        <!-- Top Gold Border -->
        <div style="
            position: absolute; top: 0; left: 0; right: 0; height: 8px; 
            background: linear-gradient(90deg, #D4AF37, #F4D03F, #D4AF37);
            z-index: 10;
        "></div>

        <!-- Content Wrapper -->
        <div style="
            position: relative; 
            z-index: 20; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            width: 100%; 
            height: 100%; 
            padding-top: 80px;
        ">

            <!-- Day Badge -->
            <div style="
                background: linear-gradient(to right, #D4AF37, #F4D03F);
                padding: 15px 60px;
                border-radius: 50px;
                margin-bottom: 40px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                color: #0A4D3C;
                text-align: center;
            ">
                <div style="font-family: 'Cinzel', serif; font-size: 56px; font-weight: 700; line-height: 1;">DAY ${config.day}</div>
                <div style="font-family: 'Cinzel', serif; font-size: 18px; letter-spacing: 4px; font-weight: 700;">RAMADAN</div>
            </div>

            <!-- Lantern/Moon Graphic (Simplified for Canvas) -->
            <div style="font-size: 80px; margin-bottom: 30px; filter: drop-shadow(0 0 15px rgba(244, 208, 63, 0.5));">
                🌙
            </div>

            <!-- Message Box -->
            <div style="
                background: rgba(255, 255, 255, 0.95);
                border: 4px solid rgba(212, 175, 55, 0.5);
                border-radius: 40px;
                padding: 50px;
                width: 800px;
                min-height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 50px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ">
                <p style="
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 42px;
                    color: #0F766E;
                    text-align: center;
                    font-weight: 600;
                    line-height: 1.3;
                    margin: 0;
                ">
                    "${config.message}"
                </p>
            </div>

            <!-- User Name -->
            <div style="text-align: center;">
                <div style="color: #F4D03F; font-size: 30px; margin-bottom: 10px;">✦ &nbsp; REFLECTION BY &nbsp; ✦</div>
                <div style="
                    font-family: 'Cinzel', serif;
                    font-size: 48px;
                    color: white;
                    font-weight: 700;
                    text-shadow: 0 4px 10px rgba(0,0,0,0.5);
                ">${config.userName}</div>
            </div>

        </div>

        <!-- Footer -->
        <div style="
            position: absolute; 
            bottom: 0; 
            left: 0; 
            right: 0; 
            height: 80px; 
            background: rgba(0,0,0,0.4); 
            display: flex; 
            align-items: center; 
            justify-content: center;
            z-index: 20;
            border-top: 1px solid rgba(255,255,255,0.2);
        ">
            <span style="font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #ddd;">
                Designed with ❤️ for the Ummah
            </span>
        </div>

    </div>
  `;

  try {
    // Wait for DOM to digest and fonts to load
    await document.fonts.ready;
    await wait(800);

    const canvas = await html2canvas(container, {
      scale: 2, // High res
      useCORS: true,
      backgroundColor: '#0A4D3C',
      logging: false,
      width: 1080,
      height: 1080,
      windowWidth: 1080,
      windowHeight: 1080,
    });

    const dataUrl = canvas.toDataURL('image/png');
    document.body.removeChild(container);
    return dataUrl;
  } catch (error) {
    console.error("Flyer Gen Error", error);
    if(document.getElementById('flyer-generator-container')) {
        document.body.removeChild(container);
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

export const slugify = (text: string) => text.toLowerCase().replace(/[^\w]+/g, '-');