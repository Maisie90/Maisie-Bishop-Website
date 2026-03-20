document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".timeline-carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const cards = carousel.querySelectorAll(".experience-card");
    const dotsContainer = carousel.querySelector(".pagination-dots");
    
    // CHANGE: Select ALL buttons (both desktop and mobile arrows)
    const nextBtns = carousel.querySelectorAll(".next");
    const prevBtns = carousel.querySelectorAll(".prev");

    let currentIndex = 0;
    let touchStartX = 0; // Declare these to avoid errors
    let touchEndX = 0;

    // 1. Create dots (Existing logic)
    dotsContainer.innerHTML = "";
    cards.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function getCardWidth() {
      return cards[0].offsetWidth;
    }

    function updateCarousel() {
      const cardWidth = getCardWidth();
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[currentIndex]) dots[currentIndex].classList.add("active");
    }

    // 2. Button Listeners: Loop through all found arrows (Desktop + Mobile)
    nextBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentIndex < cards.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    });

    // 3. Swipe Logic
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        if (currentIndex < cards.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      }
      if (touchEndX - touchStartX > swipeThreshold) {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      }
    }

    updateCarousel();
    window.addEventListener("resize", updateCarousel);
  });
});