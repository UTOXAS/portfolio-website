

document.addEventListener("DOMContentLoaded", function () {

    const appContainer = document.getElementById('app-container');

    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = `${window.APP_CONFIG.basePath}/assets/images/Portfolio Website Logo.ico`;

    function loadPage(page, data, onPageLoad) {
        // fetch(`${window.APP_CONFIG.basePath}/pages/${page}.html`)
        fetch(`${window.APP_CONFIG.basePath}/pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = html;

                // console.log(html);

                const bodyContent = tempDiv.querySelector("body")?.innerHTML || html;

                let processedHtml = bodyContent.replace('/(href|src)="\/([^"]*)"/g', `$1="${window.APP_CONFIG.basePath}/$2"`);
                if (data) {
                    for (const key in data) {
                        const placeholder = `{{${key}}}`;
                        const regex = new RegExp(placeholder, 'g');
                        processedHtml = processedHtml.replace(regex, data[key]);
                    }
                }

                // console.log(processedHtml);
                appContainer.innerHTML = processedHtml;
                // appContainer.innerHTML = `
                // <link rel="stylesheet" href="${window.APP_CONFIG.basePath}/assets/css/style.css">
                // ${processedHtml}
                // `;

                // console.log(`${appContainer.innerHTML}`);

                const scripts = tempDiv.querySelectorAll("script");
                scripts.forEach(script => {
                    const newScript = document.createElement("script");
                    if (script.src) {
                        newScript.src = script.src;
                        newScript.defer = script.defer;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });


                includeComponent('header');
                includeComponent('footer');

                // forceReapplyStyles();

                if (typeof onPageLoad === 'function') {
                    onPageLoad(page);
                }
            })
            .catch(error => {
                console.error("Error loading page:", error);
                appContainer.innerHTML = "<p style='color:red;'>Error loading page.</p>";
            });
    }

    // 🔹 Function to force reapply styles
    // function forceReapplyStyles() {
    //     const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    //     stylesheets.forEach(sheet => {
    //         const newSheet = sheet.cloneNode();
    //         newSheet.href = sheet.href.split("?")[0] + "?" + new Date().getTime(); // Cache busting
    //         sheet.parentNode.replaceChild(newSheet, sheet);
    //     });
    // }


    function includeComponent(componentName, data) {
        fetch(`${window.APP_CONFIG.basePath}/partials/${componentName}.html`)
            .then(response => response.text())
            .then(html => {
                let processedHtml = html;

                if (data) {
                    for (const key in data) {
                        const placeholder = `{{${key}}}`;
                        const regex = new RegExp(placeholder, 'g');
                        processedHtml = processedHtml.replace(regex, data[key]);
                        processedHtml = processedHtml.replace('/(href|src)="\/([^"]*)"/g', `$1="${window.APP_CONFIG.basePath}/$2"`);
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


        if (window.location.pathname.startsWith("/pages/")) {
            page = window.location.pathname.split("/").pop().replace(".html", "");
            window.location.replace(`/#${page}`);
            return;
        }

        loadPage(page, {}, function () {
            document.title = `My Portfolio - ${page.charAt(0).toUpperCase() + page.slice(1)}`;
        });
    }

    window.addEventListener("hashchange", handleRouting);
    handleRouting();

});


