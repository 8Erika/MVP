document.addEventListener("DOMContentLoaded", () => {
  /* ================= NAVBAR OFFSET (fiksna navigacija) ================= */
  function applyBodyOffset() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;
    const h = nav.offsetHeight;
    document.documentElement.style.setProperty("--nav-h", h + "px");
  }
  applyBodyOffset();
  window.addEventListener("resize", applyBodyOffset);

  /* ================= SLIDER (naslovna) ================= */
  (function initSlider() {
    const slides = document.querySelectorAll(".slider img");
    if (!slides.length) return;
    let current = 0;
    slides[current].classList.add("active");
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 3000);
  })();

  /* ================= GALERIJA: modal otvaranje/zatvaranje ================= */
  (function initGalleryModals() {
    const folders = document.querySelectorAll(".folder");
    const modals = document.querySelectorAll(".modal");
    if (!folders.length || !modals.length) return;

    folders.forEach((card) => {
      card.addEventListener("click", () => {
        const id = "modal-" + card.dataset.folder;
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add("open");
        document.body.classList.add("modal-open");
      });
    });

    modals.forEach((modal) => {
      const closeBtn = modal.querySelector(".close");
      const hide = () => {
        modal.classList.remove("open");
        document.body.classList.remove("modal-open");
      };
      closeBtn?.addEventListener("click", hide);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) hide();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      document
        .querySelectorAll(".modal.open")
        .forEach((m) => m.classList.remove("open"));
      document.body.classList.remove("modal-open");
    });
  })();

  /* ================= GALERIJA: povećanje slike + listanje ================= */
  (function initImageViewer() {
    const thumbs = document.querySelectorAll(".modal-images img");
    if (!thumbs.length) return;

    let currentImages = [];
    let currentIndex = 0;

    const viewer = document.createElement("div");
    viewer.className = "image-viewer";
    viewer.innerHTML = `
      <button class="viewer-close" aria-label="Zatvori">&times;</button>
      <button class="viewer-prev" aria-label="Prethodna">&#10094;</button>
      <img src="" alt="Pregled slike">
      <button class="viewer-next" aria-label="Sljedeća">&#10095;</button>
    `;
    document.body.appendChild(viewer);

    const viewerImg = viewer.querySelector("img");
    const btnPrev = viewer.querySelector(".viewer-prev");
    const btnNext = viewer.querySelector(".viewer-next");
    const btnClose = viewer.querySelector(".viewer-close");

    function showImage() {
      if (!currentImages.length) return;
      if (currentIndex < 0) currentIndex = currentImages.length - 1;
      if (currentIndex >= currentImages.length) currentIndex = 0;
      viewerImg.src = currentImages[currentIndex];
    }

    thumbs.forEach((img) => {
      img.addEventListener("click", () => {
        const group = img.closest(".modal-images").querySelectorAll("img");
        currentImages = Array.from(group).map((i) => i.src);
        currentIndex = currentImages.indexOf(img.src);
        showImage();
        viewer.classList.add("open");
      });
    });

    btnPrev.addEventListener("click", () => {
      currentIndex--;
      showImage();
    });
    btnNext.addEventListener("click", () => {
      currentIndex++;
      showImage();
    });

    function closeViewer() {
      viewer.classList.remove("open");
    }
    btnClose.addEventListener("click", closeViewer);
    viewer.addEventListener("click", (e) => {
      if (e.target === viewer) closeViewer();
    });
    document.addEventListener("keydown", (e) => {
      if (!viewer.classList.contains("open")) return;
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") {
        currentIndex--;
        showImage();
      }
      if (e.key === "ArrowRight") {
        currentIndex++;
        showImage();
      }
    });
  })();

  /* ================= REZERVACIJE (po tvom starom uzorku) ================= */
  (function initReservation() {
    const dateInput = document.getElementById("res-date");
    const formEl = document.getElementById("res-form");
    if (!dateInput || !formEl) return; // nije rezervacije stranica

    // 1) Inicijalno sakrij formu
    formEl.style.display = "none";

    // 2) Inicijaliziraj Flatpickr ako je učitan
    function startPicker() {
      if (typeof window.flatpickr !== "function") {
        console.warn("[Rezervacije] Flatpickr nije učitan.");
        return;
      }
      window.flatpickr(dateInput, {
        // bitno: isti format koji si imao ranije
        dateFormat: "Y-m-d",
        minDate: "today",
        // dozvoli samo pet(5) i sub(6) – ostale dane DISABLE
        disable: [
          function (date) {
            return !(date.getDay() === 5 || date.getDay() === 6);
          },
        ],
        // samo prvi dan tjedna (nema 'hr' locale da ne baca error)
        locale: { firstDayOfWeek: 1 },
        onChange(selectedDates) {
          // 3) Pokaži formu tek kad je stvarno odabran datum
          if (selectedDates && selectedDates.length) {
            formEl.style.display = "block";
            formEl.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            formEl.style.display = "none";
          }
        },
      });
      // Ako želiš da input već pokaže sljedeći pet/sub, možeš dodati defaultDate
      // defaultDate: new Date(), ali to ponekad zbuni korisnika, pa sam izostavio.
      console.log("[Rezervacije] Flatpickr inicijaliziran.");
    }

    if (typeof window.flatpickr === "function") {
      startPicker();
    } else {
      // ako CDN još nije gotov — inicijaliziraj čim se sve učita
      window.addEventListener("load", startPicker);
    }

    // 4) +/− gumbi za broj gostiju
    const minus = document.getElementById("minus-guest");
    const plus = document.getElementById("plus-guest");
    const guests = document.getElementById("res-guests");
    if (minus && plus && guests) {
      minus.addEventListener("click", () => {
        const val = Math.max(1, parseInt(guests.value || "1", 10) - 1);
        guests.value = String(val);
      });
      plus.addEventListener("click", () => {
        const val = Math.max(1, parseInt(guests.value || "1", 10) + 1);
        guests.value = String(val);
      });
    }
  })();
});
