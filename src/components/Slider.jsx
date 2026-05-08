import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import imageData from "../data/images.json";

const Slider = () => {
  const spotlightRef = useRef(null);
  const tunnelRef = useRef(null);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);

  const CONFIG = {
    totalImages: imageData.images ? imageData.images.length : 12,
    scrollSpeed: 2.5,
    layerGap: 5000,
    lerp: 0.07,
    buttonScrollAmount: 2500,
  };

  useEffect(() => {
    if (!imageData.images || imageData.images.length === 0) return;

    // 1. Setup Constants
    const contentLayerCount = Math.ceil(CONFIG.totalImages / 4);
    const totalLayerCount = Math.max(contentLayerCount, 6);
    const tunnelDepth = totalLayerCount * CONFIG.layerGap;
    const visibleDepth = tunnelDepth; 
    const exitPoint = 2500;
    
    const layerData = [];

    if (tunnelRef.current) tunnelRef.current.innerHTML = "";

    // 2. Generate Layers
    const fragment = document.createDocumentFragment();
    const scaleFactor = window.innerWidth < 768 ? 0.5 : 1;

    for (let i = 0; i < totalLayerCount; i++) {
      const layerEl = document.createElement("div");
      layerEl.className = "layer";
      
      const imageStartIndex = (i % contentLayerCount) * 4;

      for (let j = 0; j < 4; j++) {
        const imageIndex = (imageStartIndex + j) % CONFIG.totalImages;
        const image = imageData.images[imageIndex];
        
        if (!image) break;

        const angle = (j / 4) * Math.PI * 2 - Math.PI / 2;
        const x = (Math.cos(angle) * 850 * scaleFactor) - 150; 
        const y = (Math.sin(angle) * 600 * scaleFactor) - 200; 

        const item = document.createElement("div");
        item.className = "item";
        item.style.cssText = `left: ${x}px; top: ${y}px;`;
        
        item.innerHTML = `
          <img src="${image.url}" alt="${image.title}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${imageIndex}/800/1200'" />
          <div class="item-overlay"></div>
        `;
        layerEl.appendChild(item);
      }
      
      fragment.appendChild(layerEl);
      layerData.push({ el: layerEl, baseZ: -i * CONFIG.layerGap });
    }
    
    tunnelRef.current.appendChild(fragment);

    // 3. Scroll Listeners
    const handleWheel = (e) => {
      // Respecting "remove scroll down" - only allow moving away from camera
      if (e.deltaY > 0) {
        targetScrollRef.current -= e.deltaY * CONFIG.scrollSpeed;
      }
    };

    const handleKeyDown = (e) => {
      // Keeping both arrows as requested
      if (e.key === "ArrowUp") {
        targetScrollRef.current -= CONFIG.buttonScrollAmount;
      } else if (e.key === "ArrowDown") {
        targetScrollRef.current += CONFIG.buttonScrollAmount;
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);

    // 4. Overlay Logic
    const calculateOverlay = (z) => {
      if (z > exitPoint) return 1;
      if (z > 0) return z / exitPoint;
      if (z > -visibleDepth) return Math.pow(Math.abs(z) / (visibleDepth * 0.95), 2.5);
      return 1;
    };

    // 5. Animation Loop
    const tickerFunc = () => {
      currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * CONFIG.lerp;

      layerData.forEach((layer) => {
        let z = layer.baseZ + currentScrollRef.current;
        z = ((z % tunnelDepth) + tunnelDepth) % tunnelDepth;
        z = z - tunnelDepth + exitPoint;

        const overlayVal = calculateOverlay(z);
        const opacity = Math.min(1, Math.max(0, 1 - Math.pow(overlayVal, 3.5)));

        gsap.set(layer.el, {
          z: z,
          xPercent: -50,
          yPercent: -50,
          "--overlay": Math.min(1, Math.max(0, overlayVal)),
          opacity: opacity,
          visibility: opacity <= 0.001 ? "hidden" : "visible",
        });
      });
    };

    gsap.ticker.add(tickerFunc);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      gsap.ticker.remove(tickerFunc);
    };
  }, []);

  return (
    <section className="spotlight" ref={spotlightRef} style={styles.spotlight}>
      <div className="tunnel" ref={tunnelRef} style={styles.tunnel}></div>
    </section>
  );
};

const styles = {
  spotlight: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: '#000',
    perspective: '1200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tunnel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transformStyle: 'preserve-3d',
  }
};

export default Slider;