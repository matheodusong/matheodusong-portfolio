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
    
    if (activeOverlay && activeOverlay !== id) {
        document.querySelector(activeOverlay).classList.remove('is-open');
        gsap.to(activeOverlay, { y: "100%", duration: 0.5 });
    }
    
    activeOverlay = id;
    isTransitioning = true;
    const target = document.querySelector(id);
    target.scrollTop = 0; 
    target.classList.add('is-open');

    gsap.to(id, {
        y: "0%",
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => { isTransitioning = false; }
    });
    gsap.to("#grid-view", { scale: 0.95, opacity: 0, duration: 1, ease: "power4.inOut" });
}

function closeAll() {
    if (isTransitioning || !activeOverlay) return;
    isTransitioning = true;
    
    const target = document.querySelector(activeOverlay);
    
    gsap.to(".overlay-page", {
        y: "100%",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => { 
            isTransitioning = false; 
            target.classList.remove('is-open');
            activeOverlay = null;
        }
    });
    gsap.to("#grid-view", { scale: 1, opacity: 1, duration: 0.8, ease: "power4.inOut" });
}

document.querySelectorAll('.overlay-page').forEach(page => {
    page.addEventListener('scroll', () => {
        if (isTransitioning) return;
        const isAtBottom = page.scrollTop + page.clientHeight >= page.scrollHeight - 5;
        if (isAtBottom && page.scrollTop > 50) {
            closeAll();
        }
    });
});
