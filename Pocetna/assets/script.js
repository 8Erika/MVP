document.addEventListener("DOMContentLoaded", () => {
  /* Slider*/
  const slides = document.querySelectorAll(".slider img");
  let current = 0;

  // Prikaži prvu sliku
  if (slides.length > 0) {
    slides[current].classList.add("active");

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 3000);
  }

  /* Fix za navigaciju*/
  function applyBodyOffset() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    const h = nav.offsetHeight;
    document.documentElement.style.setProperty("--nav-h", h + "px");
  }

  // Izračunaj odmah i na promjenu veličine
  applyBodyOffset();
  window.addEventListener("resize", applyBodyOffset);
});
