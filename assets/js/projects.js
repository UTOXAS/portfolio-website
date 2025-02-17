// document.addEventListener("DOMContentLoaded", function () {
try {
// document.addEventListener("DOMContentLoaded", function() {

    console.log("projects.js domcontentloaded");
// document.addEventListener("load", function () {
    const projects = [
        {
            title: "Project One",
            description: "Showcasing my skills in HTML, CSS, and JavaScript.",
            image: "assets/images/project_placeholder.jpg",
            category: "web",
            link: "#"
        },
        {
            title: "Project Two",
            description: "An interactive mobile app built with Flutter.",
            image: "assets/images/project_placeholder.jpg",
            category: "mobile",
            link: "#"
        },
        {
            title: "Project Three",
            description: "A desktop automation tool using Python.",
            image: "assets/images/project_placeholder.jpg",
            category: "desktop",
            link: "#"
        },
        {
            title: "Project Four",
            description: "A JavaScript-based task automation tool.",
            image: "assets/images/project_placeholder.jpg",
            category: "web",
            link: "#"
        },
        {
            title: "Project Five",
            description: "A mobile weather app built with Flutter.",
            image: "assets/images/project_placeholder.jpg",
            category: "mobile",
            link: "#"
        },
        {
            title: "Project Six",
            description: "A JavaScript-based quiz app with interactive elements.",
            image: "assets/images/project_placeholder.jpg",
            category: "web",
            link: "#"
        }
    ];



    // if (!projectsContainer) {
    //     console.error("Error: #projects-container not found.");
    //     return;
    // }

    const projectsContainer = document.getElementById("projects-container");
    projects.forEach(project => {
        fetch(`${window.APP_CONFIG.basePath}/partials/project-card.html`)
        .then(response => response.text())
        .then(template => {
            let cardHTML = template
            .replaceAll("{{title}}", project.title)
            .replace("{{description}}", project.description)
            .replace("{{image}}", project.image)
            .replace("{{category}}", project.category)
            .replace("{{link}}", project.link);

            console.log(project.title);
            // projectsContainer.insertAdjacentElement("beforeend", cardHTML);
            projectsContainer.innerHTML += cardHTML;

        }).catch(error => console.error("Error loading card template:", error));
    });

// });
} catch (error) {
    console.error("Error in projects.js:", error);
}