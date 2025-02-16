document.addEventListener("DOMContentLoaded", function() {
    const appContainer = document.getElementById('app-container');

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

function loadPage(page, data, onPageLoad) {
    fetch(`views/${page}.html`)
    .then(response => response.text())
    .then(html => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        const bodyContent = tempDiv.querySelector("body")?.innerHTML || html;
        
        let processedHtml = bodyContent;
        if (data) {
            for (const key in data) {
                const placeholder = `{{${key}}}`;
                const regex = new RegExp(placeholder, 'g');
                processedHtml = processedHtml.replace(regex, data[key]);
            }
        }
        appContainer.innerHTML = processedHtml;

        includeComponent('header', data);

        if (typeof onPageLoad === 'function') {
            onPageLoad(page);
        }
    })
    .catch(error => {
        console.error("Error loading page:", error);
        appContainer.innerHTML = "Error loading page.";
    });
}

function includeComponent(componentName, data) {
    fetch(`components/${componentName}.html`)
    .then(response => response.text())
    .then(html => {
        let processedHtml = html;

        if (data) {
            for (const key in data) {
                const placeholder = `{{${key}}}`;
                const regex = new RegExp(placeholder, 'g');
                processedHtml = processedHtml.replace(regex, data[key]);
            }
        }

        const componentContainer = document.getElementById(`${componentName}-container`);
        if (componentContainer) {
            componentContainer.innerHTML = processedHtml;
        } else {
            console.error(`Component container with ID '${componentName}-container' not found`);
        }

        hightlightActiveNav();

    });
}

function hightlightActiveNav() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar-nav .nav-link');

    links.forEach(link => {
        const linkPath = link.getAttribute('href');

        const normalizedLinkPath = new URL(linkPath, window.location.origin).pathname;
        const normalizedCurrentPath = currentPath.endsWith('/') ? `${currentPath}home.html` : currentPath;

        if (normalizedCurrentPath.includes(normalizedLinkPath) ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

const homePageData = {
    contextName: "home",
};



loadPage('home', homePageData, function() {


});

setTimeout(() => {
    appContainer.classList.add("styled-container");
})



});