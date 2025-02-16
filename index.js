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
        appContainer.innerHTML = "<p style='color:red;'>Error loading page.</p>";
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
    const currentHash = window.location.hash.replace("#", "") || "home";
    // const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar-nav .nav-link');

    links.forEach(link => {
        const linkPage = link.getAttribute('href').replace("#", "");

        if (currentHash === linkPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function handleRouting() {
    let page = window.location.hash.replace("#", "") || "home";

    console.log(`page: ${page}`);


    if (window.location.pathname.startsWith("/views/")) {
        page = window.location.pathname.split("/").pop().replace(".html", "");
        window.location.replace(`/#${page}`);
        return;
    }


    loadPage(page, {}, function() {
        document.title = `My Portfolio - ${page.charAt(0).toUpperCase() + page.slice(1)}`;
    });
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);
handleRouting();

});