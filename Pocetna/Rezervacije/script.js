document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("res-date");
  const formSection = document.getElementById("res-form");

  formSection.style.display = "none";

  flatpickr(dateInput, {
    defaultDate: new Date(),
    dateFormat: "Y-m-d",
    disable: [
      function (date) {
        return !(date.getDay() === 5 || date.getDay() === 6);
      },
    ],
    locale: {
      firstDayOfWeek: 1,
    },
    onReady: function (selectedDates, dateStr, instance) {},
    onChange: function (selectedDates) {
      if (selectedDates.length) {
        formSection.style.display = "block";
      } else {
        formSection.style.display = "none";
      }
    },
  });

  document.getElementById("minus-guest").addEventListener("click", () => {
    const g = document.getElementById("res-guests");
    if (+g.value > 1) g.value = +g.value - 1;
  });
  document.getElementById("plus-guest").addEventListener("click", () => {
    const g = document.getElementById("res-guests");
    g.value = +g.value + 1;
  });
});
