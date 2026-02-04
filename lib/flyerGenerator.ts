import html2canvas from 'html2canvas';
import { FlyerConfig } from '../types';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateFlyer = async (config: FlyerConfig): Promise<string> => {
  const container = document.createElement('div');
  container.id = 'flyer-generator-container';
  
  const width = 1080;
  const height = 1080;

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

  container.innerHTML = `
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:wght@400;600;700&family=Amiri:wght@700&display=swap" rel="stylesheet">
    
    <div id="flyer-canvas" style="
        width: 1080px; 
        height: 1080px; 
        position: relative; 
        background: linear-gradient(135deg, #0A4D3C 0%, #0F766E 30%, #14B8A6 60%, #0D9488 100%);
        font-family: 'Cormorant Garamond', serif;
        overflow: hidden;
    ">
        
        <!-- Geometric Pattern Overlay -->
        <div style="
            position: absolute; 
            inset: 0; 
            opacity: 0.12;
            background-image: url('data:image/svg+xml,%3Csvg width=%2780%27 height=%2780%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cpath d=%27M40 0L80 40L40 80L0 40z%27 stroke=%27%23FFF%27 stroke-width=%271%27/%3E%3Cpath d=%27M40 20L60 40L40 60L20 40z%27 stroke=%27%23FFF%27 stroke-width=%271%27/%3E%3Ccircle cx=%2740%27 cy=%2740%27 r=%278%27 stroke=%27%23FFF%27 stroke-width=%271%27/%3E%3C/g%3E%3C/svg%3E');
            z-index: 1;
        "></div>

        <!-- Top Gold Border -->
        <div style="
            position: absolute; 
            top: 0; 
            left: 0; 
            right: 0; 
            height: 4px; 
            background: linear-gradient(90deg, transparent 0%, #D4AF37 10%, #F4D03F 50%, #D4AF37 90%, transparent 100%);
            z-index: 5;
        "></div>

        <!-- Islamic Lantern SVG (Top Right) -->
        <svg style="
            position: absolute; 
            top: 40px; 
            right: 50px; 
            width: 100px; 
            height: 140px; 
            z-index: 3; 
            opacity: 0.85;
            filter: drop-shadow(0 4px 15px rgba(244, 208, 63, 0.4));
        " viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="lanternGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#F4D03F"/>
                    <stop offset="50%" style="stop-color:#D4AF37"/>
                    <stop offset="100%" style="stop-color:#F4D03F"/>
                </linearGradient>
            </defs>
            <line x1="50" y1="0" x2="50" y2="20" stroke="#D4AF37" stroke-width="2"/>
            <circle cx="50" cy="20" r="3" fill="#D4AF37"/>
            <path d="M 35 20 L 50 15 L 65 20 L 60 30 L 40 30 Z" fill="url(#lanternGrad)" stroke="#B8860B" stroke-width="1.5"/>
            <ellipse cx="50" cy="35" rx="18" ry="8" fill="url(#lanternGrad)" opacity="0.8"/>
            <rect x="32" y="35" width="36" height="50" fill="url(#lanternGrad)" stroke="#B8860B" stroke-width="2"/>
            <line x1="32" y1="45" x2="68" y2="45" stroke="#B8860B" stroke-width="1" opacity="0.6"/>
            <line x1="32" y1="60" x2="68" y2="60" stroke="#B8860B" stroke-width="1" opacity="0.6"/>
            <line x1="32" y1="75" x2="68" y2="75" stroke="#B8860B" stroke-width="1" opacity="0.6"/>
            <ellipse cx="50" cy="60" rx="12" ry="20" fill="rgba(255, 249, 230, 0.5)"/>
            <ellipse cx="50" cy="60" rx="8" ry="15" fill="#FFF9E6" opacity="0.7"/>
            <path d="M 32 85 L 40 95 L 60 95 L 68 85 Z" fill="url(#lanternGrad)" stroke="#B8860B" stroke-width="1.5"/>
            <circle cx="50" cy="98" r="4" fill="#D4AF37"/>
            <path d="M 50 102 L 45 115 L 50 110 L 55 115 Z" fill="#D4AF37"/>
        </svg>

        <!-- Content Wrapper -->
        <div style="
            position: relative; 
            z-index: 2; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            padding: 60px 50px 30px;
            height: 100%;
        ">

            <!-- Day Badge -->
            <div style="
                position: relative;
                background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%);
                padding: 18px 55px;
                border-radius: 50px;
                margin-bottom: 30px;
                box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4);
                text-align: center;
            ">
                <div style="
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255,255,255,0.8);
                    font-size: 20px;
                ">◆</div>
                <div style="
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255,255,255,0.8);
                    font-size: 20px;
                ">◆</div>
                <div style="
                    font-family: 'Cinzel', serif; 
                    font-size: 52px; 
                    font-weight: 700; 
                    color: #0A4D3C; 
                    letter-spacing: 4px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    line-height: 1;
                ">DAY ${config.day}</div>
                <div style="
                    font-family: 'Cinzel', serif; 
                    font-size: 16px; 
                    font-weight: 600; 
                    color: #0A4D3C; 
                    letter-spacing: 3px; 
                    text-transform: uppercase;
                    margin-top: 3px;
                ">RAMADAN</div>
            </div>

            <!-- Moon Crescent SVG -->
            <svg style="
                width: 70px; 
                height: 70px; 
                margin-bottom: 25px; 
                opacity: 0.9;
            " viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#F4D03F"/>
                        <stop offset="100%" style="stop-color:#D4AF37"/>
                    </linearGradient>
                </defs>
                <path d="M50 10 A 40 40 0 1 1 50 90 A 30 30 0 1 0 50 10" 
                      fill="url(#moonGrad)" 
                      stroke="#F4D03F" 
                      stroke-width="2"
                      style="filter: drop-shadow(0 4px 10px rgba(244, 208, 63, 0.4))"/>
                <circle cx="70" cy="25" r="3" fill="#F4D03F" opacity="0.8"/>
            </svg>

            <!-- Message Card -->
            <div style="
                background: rgba(255, 255, 255, 0.98);
                border-radius: 30px;
                padding: 50px 45px;
                margin: 20px 0;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                border: 3px solid rgba(212, 175, 55, 0.3);
                position: relative;
                width: 900px;
                min-height: 280px;
                max-height: 450px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <!-- Corner Decorations -->
                <div style="
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    width: 50px;
                    height: 50px;
                    border-left: 2px solid #D4AF37;
                    border-top: 2px solid #D4AF37;
                    border-top-left-radius: 30px;
                "></div>
                <div style="
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 50px;
                    height: 50px;
                    border-right: 2px solid #D4AF37;
                    border-bottom: 2px solid #D4AF37;
                    border-bottom-right-radius: 30px;
                "></div>
                
                <p style="
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 34px;
                    line-height: 1.6;
                    color: #0F766E;
                    text-align: center;
                    font-weight: 400;
                    letter-spacing: 0.3px;
                    margin: 0;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                ">${escapeHtml(config.message)}</p>
            </div>

            <!-- User Name Section -->
            <div style="text-align: center; margin: 25px 0 20px;">
                <!-- Decorative Line -->
                <div style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    gap: 15px; 
                    margin-bottom: 12px;
                ">
                    <div style="
                        width: 90px; 
                        height: 2px; 
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                    "></div>
                    <span style="
                        color: #F4D03F; 
                        font-size: 18px;
                        filter: drop-shadow(0 0 10px rgba(244, 208, 63, 0.5));
                    ">✦</span>
                    <div style="
                        width: 90px; 
                        height: 2px; 
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                    "></div>
                </div>
                
                <h2 style="
                    font-family: 'Cinzel', serif;
                    font-size: 42px;
                    font-weight: 600;
                    color: #FFFFFF;
                    letter-spacing: 1.5px;
                    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                    margin: 0;
                ">${escapeHtml(config.userName)}</h2>
            </div>

        </div>

        <!-- Mosque Silhouette SVG (Bottom) -->
        <svg style="
            position: absolute; 
            bottom: 90px; 
            left: 0; 
            right: 0; 
            height: 120px; 
            z-index: 1; 
            opacity: 0.25;
        " viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
            <defs>
                <linearGradient id="mosqueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#000000;stop-opacity:0.4"/>
                    <stop offset="100%" style="stop-color:#000000;stop-opacity:0.7"/>
                </linearGradient>
            </defs>
            <rect x="100" y="40" width="20" height="80" fill="url(#mosqueGrad)"/>
            <ellipse cx="110" cy="40" rx="15" ry="8" fill="url(#mosqueGrad)"/>
            <path d="M 105 35 L 110 20 L 115 35" fill="url(#mosqueGrad)"/>
            <circle cx="110" cy="18" r="4" fill="url(#mosqueGrad)"/>
            <rect x="680" y="40" width="20" height="80" fill="url(#mosqueGrad)"/>
            <ellipse cx="690" cy="40" rx="15" ry="8" fill="url(#mosqueGrad)"/>
            <path d="M 685 35 L 690 20 L 695 35" fill="url(#mosqueGrad)"/>
            <circle cx="690" cy="18" r="4" fill="url(#mosqueGrad)"/>
            <ellipse cx="400" cy="60" rx="120" ry="60" fill="url(#mosqueGrad)"/>
            <circle cx="400" cy="25" r="8" fill="url(#mosqueGrad)"/>
            <path d="M 395 20 L 400 5 L 405 20" fill="url(#mosqueGrad)"/>
            <ellipse cx="260" cy="80" rx="60" ry="40" fill="url(#mosqueGrad)"/>
            <circle cx="260" cy="50" r="5" fill="url(#mosqueGrad)"/>
            <ellipse cx="540" cy="80" rx="60" ry="40" fill="url(#mosqueGrad)"/>
            <circle cx="540" cy="50" r="5" fill="url(#mosqueGrad)"/>
            <rect x="200" y="90" width="400" height="30" fill="url(#mosqueGrad)"/>
            <path d="M 280 95 Q 280 85 290 85 Q 300 85 300 95 Z" fill="rgba(244, 208, 63, 0.2)"/>
            <path d="M 390 95 Q 390 85 400 85 Q 410 85 410 95 Z" fill="rgba(244, 208, 63, 0.2)"/>
            <path d="M 500 95 Q 500 85 510 85 Q 520 85 520 95 Z" fill="rgba(244, 208, 63, 0.2)"/>
        </svg>

        <!-- Footer -->
        <div style="
            position: absolute; 
            bottom: 0; 
            left: 0; 
            right: 0; 
            background: rgba(0, 0, 0, 0.15); 
            backdrop-filter: blur(10px);
            padding: 20px 30px; 
            text-align: center; 
            z-index: 3;
        ">
            <p style="
                font-family: 'Cormorant Garamond', serif;
                font-size: 24px;
                color: #FFFFFF;
                letter-spacing: 0.5px;
                line-height: 1.4;
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                margin: 0;
            ">
                With <span style="color: #FF6B6B; font-size: 26px;">❤️</span> for the Ummah, 
                <span style="
                    font-weight: 700;
                    color: #F4D03F;
                    font-family: 'Cinzel', serif;
                    font-size: 26px;
                ">Abdallah Nangere</span> 🇳🇬
            </p>
        </div>

        <!-- Bottom Gold Border -->
        <div style="
            position: absolute; 
            bottom: 0; 
            left: 0; 
            right: 0; 
            height: 4px; 
            background: linear-gradient(90deg, transparent 0%, #D4AF37 10%, #F4D03F 50%, #D4AF37 90%, transparent 100%);
            z-index: 5;
        "></div>

    </div>
  `;

  try {
    await document.fonts.ready;
    await wait(1000); // Give more time for complex SVGs

    const flyerElement = document.getElementById('flyer-canvas');
    if (!flyerElement) throw new Error('Flyer element not found');

    const canvas = await html2canvas(flyerElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0A4D3C',
      logging: false,
      width: 1080,
      height: 1080,
      windowWidth: 1080,
      windowHeight: 1080,
    });

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    document.body.removeChild(container);
    return dataUrl;
  } catch (error) {
    console.error('Flyer generation error:', error);
    const existingContainer = document.getElementById('flyer-generator-container');
    if (existingContainer) {
      document.body.removeChild(existingContainer);
    }
    throw error;
  }
};

// Helper to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

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
