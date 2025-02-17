document.addEventListener("DOMContentLoaded", function() {


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

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




});
