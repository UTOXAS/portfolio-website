// document.addEventListener("DOMContentLoaded", function () {

console.log("projects.js domcontentloaded");

const projects = [
    {
        title: "Java Calculator",
        description: "Basic Java Calculator",
        image: "assets/images/projects/calculator_java.png",
        category: "desktop",
        link: "https://www.mediafire.com/file/ln09wbpmne248lm/CalculatorApp_Java.rar/file"
    },
    {
        title: "Python Calculator",
        description: "A Basic Python Calculator",
        image: "assets/images/projects/calculator_python.png",
        category: "desktop",
        link: "https://www.mediafire.com/file/cqxkzpxryk2qjh9/Calculator_Python.rar/file"
    },
    {
        title: "Quiz App",
        description: "A Flutter Android Mock Quiz App",
        image: "assets/images/projects/quiz_app.jpg",
        category: "mobile",
        link: "https://www.mediafire.com/file/odqo7s18tb9arhy/Quiz_v1.0.0_20250218_2329.rar/file"
    },
    {
        title: "Unit Converter - J",
        description: "A Unit Converter App in Java",
        image: "assets/images/projects/unit_converter_java.png",
        category: "desktop",
        link: "https://www.mediafire.com/file/hncq4dls5a2ebcq/UnitConverterApp_Java.rar/file"
    },
    {
        title: "Unit Converter - P",
        description: "A Unit Converter App in Python",
        image: "assets/images/projects/unit_converter_python.png",
        category: "desktop",
        link: "https://www.mediafire.com/file/x6mfvihblvxtvpr/UnitConverter_Python.rar/file"
    }
]

// const projects = [
//     {
//         title: "Project One",
//         description: "Showcasing my skills in HTML, CSS, and JavaScript.",
//         image: "assets/images/project_placeholder.jpg",
//         category: "web",
//         link: "#"
//     },
//     {
//         title: "Project Two",
//         description: "An interactive mobile app built with Flutter.",
//         image: "assets/images/project_placeholder.jpg",
//         category: "mobile",
//         link: "#"
//     },
//     {
//         title: "Project Three",
//         description: "A desktop automation tool using Python.",
//         image: "assets/images/project_placeholder.jpg",
//         category: "desktop",
//         link: "#"
//     },
//     {
//         title: "Project Four",
//         description: "A JavaScript-based task automation tool.",
//         image: "assets/images/project_placeholder.jpg",
//         category: "web",
//         link: "#"
//     },
//     {
//         title: "Project Five",
//         description: "A mobile weather app built with Flutter.",
//         image: "assets/images/project_placeholder.jpg",
//         category: "mobile",
//         link: "#"
//     },
//     {
//         title: "Project Six",
//         description: "A JavaScript-based quiz app with interactive elements.",
//         image: "assets/images/project_placeholder.jpg",
//         category: "web",
//         link: "#"
//     }
// ];

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


// })