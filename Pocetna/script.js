document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slider img");
  let current = 0;

  // Prikaži prvu sliku
  slides[current].classList.add("active");

  setInterval(() => {
    // sakrij trenutnu, prikaži sljedeću
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 3000);
});
