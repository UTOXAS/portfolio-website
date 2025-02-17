document.addEventListener("DOMContentLoaded", function() {

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const basePath = isLocal ? '' : '/portfolio-website';

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
    fetch(`${basePath}/views/${page}.html`)
    .then(response => response.text())
    .then(html => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        const bodyContent = tempDiv.querySelector("body")?.innerHTML || html;
        
        let processedHtml = bodyContent.replace('/(href|src)="\/([^"]*)"/g', `$1="${basePath}/$2"`);;
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
                processedHtml = processedHtml.replace('/(href|src)="\/([^"]*)"/g', `$1="${basePath}/$2"`);
            }
        }

        const componentContainer = document.getElementById(`${componentName}-container`);
        if (componentContainer) {
            componentContainer.innerHTML = processedHtml;
        } else {
            console.error(`Component container with ID '${componentName}-container' not found`);
        }

        // setDarkModeToggle();
        hightlightActiveNav();

    });
}

function hightlightActiveNav() {
    const currentHash = window.location.hash.replace("#", "") || "home";
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
// window.addEventListener("DOMContentLoaded", handleRouting);
handleRouting();

});


