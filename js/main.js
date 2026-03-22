let isTransitioning = false;
let activeOverlay = null;

function openProject(title, subtitle, mainImg, secImg1, secImg2) {
    document.getElementById('detail-title').innerText = title;
    document.getElementById('detail-subtitle').innerText = subtitle;
    document.getElementById('detail-img').src = mainImg;
    document.getElementById('detail-img-1').src = secImg1;
    document.getElementById('detail-img-2').src = secImg2;
    openOverlay('#detail-page');
}

function openOverlay(id) {
    if (isTransitioning) return;
    
    // Close existing if open
    if (activeOverlay && activeOverlay !== id) {
        gsap.to(activeOverlay, { y: "100%", duration: 0.5, ease: "power2.in" });
    }
    
    activeOverlay = id;
    isTransitioning = true;
    const target = document.querySelector(id);
    target.scrollTop = 0; 

    // Animate Overlay Up
    gsap.to(id, {
        y: "0%",
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => { isTransitioning = false; }
    });

    // Show Close Button
    gsap.to("#close-btn", { opacity: 1, pointerEvents: "auto", duration: 0.5 });

    // Background reaction
    gsap.to("#grid-view", { scale: 0.9, opacity: 0, duration: 1.2, ease: "power4.inOut" });
}

function closeAll() {
    if (isTransitioning || !activeOverlay) return;
    isTransitioning = true;
    
    gsap.to(".overlay-page", {
        y: "100%",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => { 
            isTransitioning = false; 
            activeOverlay = null;
        }
    });

    // Hide Close Button
    gsap.to("#close-btn", { opacity: 0, pointerEvents: "none", duration: 0.3 });

    gsap.to("#grid-view", { scale: 1, opacity: 1, duration: 0.8, ease: "power4.inOut" });
}

// Keyboard shortcut to close
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeAll();
});

// Optional: Keep the scroll-to-close logic but only for mobile users
document.querySelectorAll('.overlay-page').forEach(page => {
    page.addEventListener('scroll', () => {
        if (isTransitioning) return;
        const isAtBottom = page.scrollTop + page.clientHeight >= page.scrollHeight - 20;
        if (isAtBottom && page.scrollTop > 100) {
            // Uncomment next line if you want auto-close on scroll end
            // closeAll();
        }
    });
});