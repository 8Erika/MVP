document.addEventListener("DOMContentLoaded", () => {
  const folders = document.querySelectorAll(".folder");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".modal .close");

  // Otvori modal na klik foldera
  folders.forEach((folder) => {
    folder.addEventListener("click", () => {
      const name = folder.dataset.folder;
      const modal = document.getElementById(`modal-${name}`);
      if (modal) modal.style.display = "flex";
    });
  });

  // Zatvori modal na klik X
  closes.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  // Zatvori klikom izvan sadržaja
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
});
