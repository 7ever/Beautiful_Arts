document.addEventListener("DOMContentLoaded", function () {
    const carouselEl = document.getElementById("galleryCarousel");
    const track = document.getElementById("thumbnailTrack");

    if (!carouselEl || !track) return;

    const carouselItems = carouselEl.querySelectorAll(".carousel-item");
    const images = Array.from(carouselItems).map(
        (item) => item.querySelector("img").src
    );
    const imageCount = images.length;

    // Next image thumbnail-carousel function

    const indicesToCreate = [];
    for (let i = 0; i < imageCount; i++) indicesToCreate.push(i);
    // Add clones for the wrap-around effect
    for (let i = 0; i < 4; i++) indicesToCreate.push(i);

    indicesToCreate.forEach((imgIndex, trackIndex) => {
        const div = document.createElement("div");
        div.className = "thumbnail-item";
        div.innerHTML = `<img src="${images[imgIndex]}" alt="Thumbnail ${imgIndex + 1
            }">`;

        // Click to next image
        div.addEventListener("click", () => {
            const bootstrapCarousel =
                bootstrap.Carousel.getOrCreateInstance(carouselEl);
            bootstrapCarousel.to(imgIndex);
        });

        track.appendChild(div);
    });


    const firstItem = track.querySelector(".thumbnail-item");
    const itemWidth = firstItem ? firstItem.offsetWidth : 0;
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
    const singleItemWidth = itemWidth + gap;

    const updateTrack = (activeIndex) => {
        const startTrackIndex = activeIndex + 1;
        const translateX = -(startTrackIndex * singleItemWidth);
        track.style.transform = `translateX(${translateX}px)`;
    };

    updateTrack(0);

    // Listen for slide events
    carouselEl.addEventListener("slide.bs.carousel", (event) => {
        updateTrack(event.to);
    });
});
