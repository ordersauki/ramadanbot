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
  });

  document.body.appendChild(container);

  // Construct the HTML content
  // Note: Using inline styles strictly to ensure html2canvas captures everything correctly without external CSS dependency issues
  container.innerHTML = `
    <div style="
      width: 1080px; 
      height: 1080px; 
      background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
      padding: 60px;
      box-sizing: border-box;
    ">
      <!-- Background Pattern Overlay -->
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.1;
        background-image: radial-gradient(circle at 50% 50%, white 2px, transparent 2.5px);
        background-size: 48px 48px;
        z-index: 0;
      "></div>

      <!-- Main Content Container -->
      <div style="
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 60px;
        flex-grow: 1;
        justify-content: center;
      ">
        
        <!-- Day Badge -->
        <div style="
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
          padding: 20px 60px;
          border-radius: 9999px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        ">
          <h1 style="
            margin: 0;
            color: white;
            font-size: 48px;
            font-weight: 800;
            letter-spacing: 4px;
            text-transform: uppercase;
          ">🌙 DAY ${config.day} 🌙</h1>
        </div>

        <!-- Topic (Optional addition for context) -->
        <div style="
            font-size: 32px;
            color: rgba(255,255,255,0.9);
            font-weight: 500;
            margin-top: -20px;
            text-transform: uppercase;
            letter-spacing: 2px;
        ">${config.topic}</div>

        <!-- Message Card -->
        <div style="
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 40px;
          padding: 80px 60px;
          width: 100%;
          border: 4px solid #fbbf24;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          position: relative;
        ">
           <!-- Decorative Quote Marks -->
           <span style="position: absolute; top: 40px; left: 40px; font-size: 100px; color: #14b8a6; line-height: 0; font-family: serif;">&ldquo;</span>
           
           <p style="
            margin: 0;
            color: #115e59;
            font-size: 40px;
            font-weight: 500;
            line-height: 1.6;
            text-align: center;
          ">
            ${config.message}
          </p>
          
          <span style="position: absolute; bottom: -40px; right: 40px; font-size: 100px; color: #14b8a6; line-height: 0; font-family: serif;">&rdquo;</span>
        </div>

        <!-- User Name -->
        <div style="text-align: center; margin-top: 20px;">
          <p style="
            margin: 0;
            color: white;
            font-size: 44px;
            font-weight: 600;
            text-shadow: 0 4px 6px rgba(0,0,0,0.2);
          ">— ${config.userName} —</p>
        </div>

        <!-- Islamic Icon -->
        <div style="font-size: 100px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));">
          ☪️
        </div>

      </div>

      <!-- Footer -->
      <div style="
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      ">
        <span style="color: rgba(255,255,255,0.9); font-size: 24px;">Sponsored by</span>
        <span style="color: #ffffff; font-size: 28px; font-weight: 700;">Abdallah Nangere 🇳🇬❤️</span>
      </div>

    </div>
  `;

  try {
    // Generate the canvas
    const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
      scale: 2, // High res for mobile
      useCORS: true,
      backgroundColor: null,
    });

    const dataUrl = canvas.toDataURL('image/png');
    
    // Cleanup
    document.body.removeChild(container);
    
    return dataUrl;
  } catch (error) {
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