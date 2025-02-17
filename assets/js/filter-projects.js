document.addEventListener("DOMContentLoaded", function () {
    console.log("filter-projects.js");
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            const category = this.getAttribute("data-category");
            const projectCards = document.querySelectorAll(".project-card");

            projectCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        })
    })
})