const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 5,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination-bullets",
    typeof: "bullets",
    clickable: true,
  },

  // Navigation arrows disabled
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const arrow = button.querySelector(".arrow");

    content.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  });
});
