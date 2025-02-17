document.addEventListener("DOMContentLoaded", function() {


    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".projects-grid .card")

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                const category = this.getAttribute("data-category");

                projectCards.forEach(card => {

                    card.style.display = (category === "all" || card.classList.contains(category)) ? "block" : "none";
                });

                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }


// });

// function setDarkModeToggle() {
//     console.log("setDarkModeToggle()");
//     const darkModeCheckbox = document.getElementById("dark-mode-checkbox");
//     const body = document.body;
//     const toggleLabel = document.querySelector(".toggle-label");

//     if (localStorage.getItem("darkMode") === "enabled") {
//         body.classList.add("dark-mode");
//         darkModeCheckbox.checked = true;
//         toggleLabel.textContent = "☀️";
//     }

//     darkModeCheckbox.addEventListener("change", function () {
//         console.log(`this.ischecked: ${this.checked}`);
//         if (this.checked) {
//             body.classList.add("dark-mode");
//             localStorage.setItem("darkMode", "enabled");
//             toggleLabel.textContent = "☀️";
//         } else {
//             body.classList.remove("dark-mode");
//             localStorage.setItem("darkMode", "disabled");
//             toggleLabel.textContent = "🌙";
//         }
//     });

//     const darkModeToggle = document.getElementById("dark-mode-toggle");
//     if (darkModeToggle) {
//         function applyDarkMode(isDark) {
//             document.body.classList.toggle("dark-mode", isDark);
//             localStorage.setItem("darkMode", isDark);
//         }

//         const isDarkMode = localStorage.getItem("darkMode") === "true";
//         applyDarkMode(isDarkMode);

//         darkModeToggle.addEventListener("click", function () {
//             applyDarkMode(!document.body.classList.contains("dark-mode"));
//         });

//     }
// }
});
