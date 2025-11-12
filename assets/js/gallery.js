document.addEventListener('DOMContentLoaded', function () {
    // ========================================
    // ARTWORK DATA
    // ========================================
    const artworks = [
        { 
            id: 1, 
            title: "Luminous Reflections", 
            artist: "Camille Rousseau", 
            type: "Digital Art", 
            image: "assets/images/Gallery1.jpeg", 
            description: "Explore the vibrant and dynamic world of digital art where technology meets creativity.", 
            cta: "View Artwork" 
        },
        { 
            id: 2, 
            title: "Whispers of Solitude", 
            artist: "Marcus Thorne", 
            type: "Photography", 
            image: "assets/images/Gallery2.jpg", 
            description: "A stunning capture of isolation and beauty in the natural world.", 
            cta: "Discover More" 
        },
        { 
            id: 3, 
            title: "Fragmented Dreams", 
            artist: "Saira Okafor", 
            type: "Mixed Media", 
            image: "assets/images/Gallery3.jpg", 
            description: "A complex composition that blends various materials to tell a unique story.", 
            cta: "Explore" 
        },
        { 
            id: 4, 
            title: "Infinite Geometry", 
            artist: "Julian Petrov", 
            type: "Abstract", 
            image: "assets/images/Gallery4.jpg", 
            description: "Dive into a world of shapes and colors that challenge perception.", 
            cta: "Learn More" 
        },
        { 
            id: 5, 
            title: "Ethereal Pathways", 
            artist: "Iris Chen", 
            type: "Contemporary", 
            image: "assets/images/Gallery5.jpeg", 
            description: "Follow the light through dreamy landscapes and surreal environments.", 
            cta: "View Details" 
        },
        { 
            id: 6, 
            title: "Veil of Silence", 
            artist: "Noah Bennett", 
            type: "Fine Art", 
            image: "assets/images/Gallery6.jpg", 
            description: "A powerful piece that speaks volumes through its quiet and subtle composition.", 
            cta: "See Collection" 
        },
        { 
            id: 7, 
            title: "Chromatic Essence", 
            artist: "Lena Volkov", 
            type: "Digital Painting", 
            image: "assets/images/Gallery7.jpg", 
            description: "A masterful display of color theory and digital brushwork.", 
            cta: "View Work" 
        },
        { 
            id: 8, 
            title: "Temporal Horizons", 
            artist: "Adrian Santoro", 
            type: "Conceptual", 
            image: "assets/images/Gallery8.jpg", 
            description: "An artwork that makes you question the very nature of time and space.", 
            cta: "Explore More" 
        },
        { 
            id: 9, 
            title: "Urban Symphony", 
            artist: "Diego Martinez", 
            type: "Street Art", 
            image: "assets/images/Gallery9.jpg", 
            description: "The rhythm and energy of city life captured in vibrant colors and bold strokes.", 
            cta: "View Gallery" 
        },
        { 
            id: 10, 
            title: "Celestial Dreams", 
            artist: "Aisha Johnson", 
            type: "Fantasy Art", 
            image: "assets/images/Gallery10.jpg", 
            description: "Journey through cosmic landscapes and otherworldly visions of imagination.", 
            cta: "Explore Universe" 
        }
    ];

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const slider = document.getElementById('carouselSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryBg = document.getElementById('galleryBg');
    const artType = document.getElementById('artType');
    const artworkTitle = document.getElementById('artworkTitle');
    const artworkDescription = document.getElementById('artworkDescription');
    const ctaButton = document.getElementById('ctaButton');
    const progressBar = document.getElementById('progressBar');
    const slideCounter = document.getElementById('slideCounter');
    const artworkInfo = document.getElementById('artworkInfo');
    const progressBarContainer = progressBar.closest('[role="progressbar"]');

    // ========================================
    // STATE VARIABLES
    // ========================================
    let currentIndex = 0;
    let autoplayInterval = null;
    const AUTOPLAY_DELAY = 5000; // 5 seconds
    let touchStartX = 0;
    let touchEndX = 0;
    let isTransitioning = false;

    // ========================================
    // CAROUSEL ITEM CREATION
    // ========================================
    function createCarouselItems() {
        artworks.forEach((artwork, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.dataset.index = index;
            item.role = 'listitem';
            item.setAttribute('aria-label', `${artwork.title} by ${artwork.artist}`);

            item.innerHTML = `
                <div class="item-background">
                    <img src="${artwork.image}" 
                         alt="${artwork.title}" 
                         class="item-image"
                         loading="lazy"
                         decoding="async">
                </div>
                <div class="item-overlay"></div>
                <div class="item-content">
                    <p class="item-type">${artwork.artist} - ${artwork.type}</p>
                    <h3 class="item-title">${artwork.title}</h3>
                </div>
            `;

            slider.appendChild(item);

            // Add click event listener with loading state
            item.addEventListener('click', () => {
                handleCarouselItemClick(index);
            });

            // Add keyboard support (Enter and Space)
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCarouselItemClick(index);
                }
            });

            // Make carousel items focusable
            item.setAttribute('tabindex', '0');
        });
    }

    // ========================================
    // HANDLE CAROUSEL ITEM CLICK
    // ========================================
    function handleCarouselItemClick(index) {
        if (currentIndex !== index && !isTransitioning) {
            pauseAutoplay();
            updateGallery(index);
        }
    }

    // ========================================
    // UPDATE GALLERY DISPLAY
    // ========================================
    function updateGallery(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = index;
        const currentArt = artworks[currentIndex];

        // Update background image with fade transition
        galleryBg.style.backgroundImage = `url('${currentArt.image}')`;
        
        // Update artwork information
        artType.textContent = currentArt.type;
        artworkTitle.textContent = currentArt.title;
        artworkDescription.textContent = currentArt.description;
        ctaButton.textContent = currentArt.cta;

        // Update ARIA attributes for screen readers
        galleryBg.setAttribute('aria-label', `${currentArt.title} by ${currentArt.artist}`);
        artworkInfo.setAttribute('aria-label', `Current artwork: ${currentArt.title}`);

        // Update carousel active state
        updateCarouselActiveState();

        // Scroll carousel to center active item
        scrollCarouselToActiveItem();

        // Update progress bar
        updateProgressBar();

        // Re-enable transitions
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    // ========================================
    // UPDATE CAROUSEL ACTIVE STATE
    // ========================================
    function updateCarouselActiveState() {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach((item, i) => {
            if (i === currentIndex) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'true');
            } else {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            }
        });
    }

    // ========================================
    // SCROLL CAROUSEL TO ACTIVE ITEM
    // ========================================
    function scrollCarouselToActiveItem() {
        const activeItem = document.querySelector('.carousel-item.active');
        if (activeItem) {
            const offset = activeItem.offsetLeft - (slider.offsetWidth / 2) + (activeItem.offsetWidth / 2);
            slider.style.transform = `translateX(-${offset}px)`;
        }
    }

    // ========================================
    // UPDATE PROGRESS BAR
    // ========================================
    function updateProgressBar() {
        const progress = ((currentIndex + 1) / artworks.length) * 100;
        progressBar.style.width = `${progress}%`;
        slideCounter.textContent = `${currentIndex + 1}/${artworks.length}`;
        
        // Update ARIA attributes
        progressBarContainer.setAttribute('aria-valuenow', currentIndex + 1);
    }

    // ========================================
    // AUTOPLAY FUNCTIONALITY
    // ========================================
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % artworks.length;
            updateGallery(nextIndex);
        }, AUTOPLAY_DELAY);
    }

    function pauseAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function resetAutoplay() {
        pauseAutoplay();
        startAutoplay();
    }

    // ========================================
    // NEXT/PREVIOUS NAVIGATION
    // ========================================
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % artworks.length;
        pauseAutoplay();
        updateGallery(nextIndex);
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
        pauseAutoplay();
        updateGallery(prevIndex);
        resetAutoplay();
    });

    // ========================================
    // KEYBOARD NAVIGATION (ARROW KEYS)
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (isTransitioning) return;

        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % artworks.length;
                pauseAutoplay();
                updateGallery(nextIndex);
                resetAutoplay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
                pauseAutoplay();
                updateGallery(prevIndex);
                resetAutoplay();
                break;
            case 'Home':
                e.preventDefault();
                pauseAutoplay();
                updateGallery(0);
                resetAutoplay();
                break;
            case 'End':
                e.preventDefault();
                pauseAutoplay();
                updateGallery(artworks.length - 1);
                resetAutoplay();
                break;
        }
    });

    // ========================================
    // TOUCH/SWIPE SUPPORT FOR MOBILE
    // ========================================
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold && !isTransitioning) {
            pauseAutoplay();
            
            if (diff > 0) {
                // Swiped left - show next
                const nextIndex = (currentIndex + 1) % artworks.length;
                updateGallery(nextIndex);
            } else {
                // Swiped right - show previous
                const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
                updateGallery(prevIndex);
            }
            
            resetAutoplay();
        }
    }

    // ========================================
    // PAUSE AUTOPLAY ON USER INTERACTION
    // ========================================
    const interactiveElements = [prevBtn, nextBtn, slider];
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', pauseAutoplay);
        element.addEventListener('mouseleave', resetAutoplay);
    });

    // Pause autoplay on focus
    document.addEventListener('focus', (e) => {
        if (interactiveElements.some(el => el.contains(e.target))) {
            pauseAutoplay();
        }
    }, true);

    // ========================================
    // IMAGE LOADING WITH FALLBACK
    // ========================================
    function preloadImage(imageSrc) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageSrc;
        });
    }

    // Preload current and next images
    function preloadNextImages() {
        const currentImg = artworks[currentIndex].image;
        const nextImg = artworks[(currentIndex + 1) % artworks.length].image;
        
        preloadImage(currentImg).catch(() => {
            console.warn(`Failed to load image: ${currentImg}`);
        });
        
        preloadImage(nextImg).catch(() => {
            console.warn(`Failed to load image: ${nextImg}`);
        });
    }

    // ========================================
    // VISIBILITY CHANGE HANDLER
    // ========================================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAutoplay();
        } else {
            resetAutoplay();
        }
    });

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        createCarouselItems();
        updateGallery(0);
        preloadNextImages();
        startAutoplay();
        
        console.log('Gallery initialized successfully');
    }

    // Start the gallery
    init();

    // ========================================
    // OPTIONAL: EXPOSE CONTROLS FOR EXTERNAL USE
    // ========================================
    window.galleryAPI = {
        next: () => nextBtn.click(),
        previous: () => prevBtn.click(),
        goToSlide: (index) => {
            if (index >= 0 && index < artworks.length) {
                pauseAutoplay();
                updateGallery(index);
                resetAutoplay();
            }
        },
        getCurrentIndex: () => currentIndex,
        getTotalSlides: () => artworks.length,
        pauseAutoplay: pauseAutoplay,
        resumeAutoplay: resetAutoplay
    };
});