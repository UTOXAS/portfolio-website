$(document).ready(function () {
    $.getJSON(`${window.APP_CONFIG.basePath}/data/projects.json`, function (projects) {
        // console.log(projects);
        let projectPromises = projects.map((project) => {
            return $.get(`${window.APP_CONFIG.basePath}/partials/project-card.html`).then(function (template) {
                return template
                    .replaceAll(/\{\{title\}\}/g, project.title)
                    .replaceAll(/\{\{image\}\}/g, project.image)
                    .replaceAll(/\{\{description\}\}/g, project.description)
                    .replaceAll(/\{\{link\}\}/g, project.link)
                    .replaceAll(/\{\{category\}\}/g, project.category);

            });
        });

        Promise.all(projectPromises).then((projectHTMLArray) => {
            $("#projects-container").html(projectHTMLArray.join(""));
        });
        // let projectHTML = "";
        // projects.forEach((project) => {
        //     // console.log(project);
        //     $.get(`${window.APP_CONFIG.basePath}/partials/project-card.html`).then(function (data) {
        //         projectHTML += data;
        //     });
        // });
    });
});