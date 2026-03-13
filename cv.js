document.addEventListener("DOMContentLoaded", () => {

  const carousels = document.querySelectorAll(".timeline-carousel");

  carousels.forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");
    const cards = carousel.querySelectorAll(".experience-card");
    const dotsContainer = carousel.querySelector(".pagination-dots");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".prev");

    let currentIndex = 0;

    // remove any existing dots
    dotsContainer.innerHTML = "";

    // create dots
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
      dots[currentIndex].classList.add("active");
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIndex < cards.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    updateCarousel();
    window.addEventListener("resize", updateCarousel);

  });

});