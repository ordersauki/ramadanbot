import html2canvas from 'html2canvas';
import { FlyerConfig } from '../types';

export const generateFlyer = async (config: FlyerConfig): Promise<string> => {
  // Create a container for the flyer
  const container = document.createElement('div');
  container.id = 'flyer-generator-container';
  
  // Style it to be off-screen but visible to html2canvas
  Object.assign(container.style, {
    position: 'fixed',
    top: '-10000px',
    left: '-10000px',
    width: '1080px',
    height: '1080px',
    zIndex: '-1',
    overflow: 'hidden',
    visibility: 'visible',
    display: 'block',
  });

  document.body.appendChild(container);

  // Construct the HTML content
  // Note: Using inline styles strictly to ensure html2canvas captures everything correctly without external CSS dependency issues
  const premiumBadge = config.isPremium ? `
    <div style="
      position: absolute;
      top: 40px;
      right: 40px;
      background: linear-gradient(45deg, #ffd700, #ffed4e);
      color: #000;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 18px;
      font-weight: bold;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      z-index: 20;
    ">⭐ PREMIUM</div>
  ` : '';

  container.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, 'Segoe UI', Arial, sans-serif;
      box-sizing: border-box;
      overflow: hidden;
    ">
      <!-- Geometric Pattern Background -->
      <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;" viewBox="0 0 1080 1080" preserveAspectRatio="none">
        <defs>
          <pattern id="geometric" patternUnits="userSpaceOnUse" width="60" height="60">
            <polygon points="30,5 55,30 30,55 5,30" fill="rgba(255,255,255,0.05)" />
            <circle cx="30" cy="30" r="2" fill="rgba(255,255,255,0.1)" />
          </pattern>
        </defs>
        <rect width="1080" height="1080" fill="url(#geometric)" />
      </svg>

      <!-- Minaret Silhouettes -->
      <svg style="position: absolute; bottom: 0; left: 0; width: 100%; height: 200px; z-index: 2; pointer-events: none;" viewBox="0 0 1080 200" preserveAspectRatio="none">
        <path d="M50,200 L50,100 L60,90 L70,100 L70,200 Z" fill="rgba(0,0,0,0.2)" />
        <path d="M80,200 L80,80 L90,70 L100,80 L100,200 Z" fill="rgba(0,0,0,0.2)" />
        <path d="M1000,200 L1000,120 L1010,110 L1020,120 L1020,200 Z" fill="rgba(0,0,0,0.2)" />
        <path d="M1030,200 L1030,90 L1040,80 L1050,90 L1050,200 Z" fill="rgba(0,0,0,0.2)" />
      </svg>

      ${premiumBadge}

      <!-- Main Content Container -->
      <div style="
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 95%;
        max-width: 950px;
        height: 95%;
        max-height: 950px;
        gap: 40px;
        position: relative;
      ">
        
        <!-- Day Badge with Calligraphy -->
        <div style="
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
          padding: 15px 50px;
          border-radius: 50px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          position: relative;
        ">
          <h1 style="
            margin: 0;
            color: #ffffff;
            font-size: 44px;
            font-weight: 800;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-family: Arial, sans-serif;
            text-shadow: 0 2px 3px rgba(0,0,0,0.1);
          ">🌙 DAY ${config.day} 🌙</h1>
        </div>

        <!-- Topic with Islamic Calligraphy Style -->
        <div style="
            font-size: 28px;
            color: #ffffff;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
            margin-top: -10px;
            text-align: center;
        ">${config.topic}</div>

        <!-- Message Card -->
        <div style="
          background-color: #ffffff;
          border-radius: 30px;
          padding: 50px 45px;
          width: 100%;
          border: 3px solid #fbbf24;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          position: relative;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 350px;
        ">
           <!-- Decorative Quote Marks -->
           <div style="position: absolute; top: 20px; left: 20px; font-size: 80px; color: #14b8a6; line-height: 0.8; opacity: 0.3;">"</div>
           
           <p style="
            margin: 0;
            color: #115e59;
            font-size: 32px;
            font-weight: 500;
            line-height: 1.7;
            text-align: center;
            font-family: Arial, sans-serif;
            position: relative;
            z-index: 1;
          ">
            ${config.message}
          </p>
          
          <div style="position: absolute; bottom: 20px; right: 20px; font-size: 80px; color: #14b8a6; line-height: 0.8; opacity: 0.3;">"</div>
        </div>

        <!-- User Name -->
        <div style="text-align: center; margin-top: 10px;">
          <p style="
            margin: 0;
            color: #ffffff;
            font-size: 38px;
            font-weight: 600;
            text-shadow: 0 3px 5px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
          ">— ${config.userName} —</p>
        </div>

        <!-- Islamic Icon -->
        <div style="font-size: 70px; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2));">
          ☪️
        </div>

      </div>

      <!-- Footer -->
      <div style="
        position: absolute;
        bottom: 35px;
        left: 0;
        right: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      ">
        <span style="color: rgba(255,255,255,0.85); font-size: 18px; font-family: Arial, sans-serif;">Powered by</span>
        <span style="color: #ffffff; font-size: 22px; font-weight: 700; font-family: Arial, sans-serif;">Ramadan Bot 🇳🇬❤️</span>
      </div>

    </div>
  `;

  try {
    // Add a small delay to ensure DOM is fully painted
    await new Promise(resolve => setTimeout(resolve, 100));

    // Generate the canvas with better settings for content capture
    const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
      scale: 2, // High res for mobile
      useCORS: true,
      backgroundColor: '#0f766e',
      allowTaint: true,
      logging: false,
      imageTimeout: 2000,
    });

    const dataUrl = canvas.toDataURL('image/png');
    
    // Cleanup
    document.body.removeChild(container);
    
    return dataUrl;
  } catch (error) {
    console.error('Flyer generation error:', error);
    document.body.removeChild(container);
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

export const slugify = (text: string) => {
  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};