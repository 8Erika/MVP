document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("res-date");
  const formSection = document.getElementById("res-form");

  // Inicijalno sakrij formu
  formSection.style.display = "none";

  flatpickr(dateInput, {
    defaultDate: new Date(),
    dateFormat: "Y-m-d",
    disable: [
      function (date) {
        // omogući samo petak (5) i subotu (6)
        return !(date.getDay() === 5 || date.getDay() === 6);
      },
    ],
    locale: {
      firstDayOfWeek: 1,
    },
    onReady: function (selectedDates, dateStr, instance) {
      // kad se kalendar prikazuje, flatpickr automatski označi today
    },
    onChange: function (selectedDates) {
      if (selectedDates.length) {
        // prikaz obrasca
        formSection.style.display = "block";
      } else {
        formSection.style.display = "none";
      }
    },
  });

  // plus/minus gostiju
  document.getElementById("minus-guest").addEventListener("click", () => {
    const g = document.getElementById("res-guests");
    if (+g.value > 1) g.value = +g.value - 1;
  });
  document.getElementById("plus-guest").addEventListener("click", () => {
    const g = document.getElementById("res-guests");
    g.value = +g.value + 1;
  });
});
