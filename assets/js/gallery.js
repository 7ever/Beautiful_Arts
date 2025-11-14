document.addEventListener('DOMContentLoaded', function() {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');
    const sideItems = document.querySelectorAll('.side-item');
    const currentSlideSpan = document.querySelector('.current-slide');
    const progressFill = document.querySelector('.progress-fill');

    let currentIndex = 0;
    const totalItems = document.querySelectorAll('.slide .item').length;

    const updateStatus = () => {
        currentSlideSpan.textContent = currentIndex + 1;
        const progress = ((currentIndex + 1) / totalItems) * 100;
        progressFill.style.width = progress + '%';
    };

    const updateSideCarousel = () => {
        sideItems.forEach((item, idx) => {
            const itemIndex = (currentIndex + 2 + idx) % totalItems;
            const sourceItem = document.querySelectorAll('.slide .item')[itemIndex];
            const bgImage = sourceItem.style.backgroundImage;
            item.style.backgroundImage = bgImage;
            item.setAttribute('data-index', itemIndex);

            if (idx === 3) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    const navigate = (direction) => {
        const items = document.querySelectorAll('.slide .item');
        
        if (direction === 'next') {
            slide.appendChild(items[0]);
            currentIndex = (currentIndex + 1) % totalItems;
        } else {
            slide.prepend(items[items.length - 1]);
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        }

        updateStatus();
        updateSideCarousel();
    };

    // Click handlers
    next.addEventListener('click', () => navigate('next'));
    prev.addEventListener('click', () => navigate('prev'));

    // Side carousel click handlers
    sideItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemIndex = parseInt(item.getAttribute('data-index'));
            const steps = (itemIndex - 1) % totalItems;
            
            for (let i = 0; i < steps; i++) {
                navigate('next');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') navigate('next');
        if (e.key === 'ArrowLeft') navigate('prev');
    });

    // Initial side carousel setup
    updateStatus();
    updateSideCarousel();
});