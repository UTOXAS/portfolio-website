

$(document).ready(function () {

    // let basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) || '/';
    // $("head").prepend(`<base href="${window.APP_CONFIG.basePath}">`);

    window.APP_CONFIG = {
        basePath: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? ''
            : '/portfolio-website'
    };

    // console.log(`basePath: ${basePath}`);
    // console.log(`window.APP_CONFIG.basePath: ${window.APP_CONFIG.basePath}`);


    $("body").prepend('<div id="header-container"></div>');
    $("body").append('<div id="footer-container"></div>');

    $("#header-container").load(`${window.APP_CONFIG.basePath}/partials/header.html`, function () {
        // let basePath = window.location.pathname.includes("/pages/") ? "../" : "./";
        // console.log(`window.APP_CONFIG.basePath: ${window.APP_CONFIG.basePath}`);
        $("#home-link").attr("href", `${window.APP_CONFIG.basePath}/index.html`);
        $("#header-logo").attr("src", `${window.APP_CONFIG.basePath}/assets/images/Portfolio Website Logo.png`);
        $("#home-nav-link").attr("href", `${window.APP_CONFIG.basePath}/index.html`);
        $("#about-nav-link").attr("href", `${window.APP_CONFIG.basePath}/pages/about.html`);
        $("#projects-nav-link").attr("href", `${window.APP_CONFIG.basePath}/pages/projects.html`);
        $("#contact-nav-link").attr("href", `${window.APP_CONFIG.basePath}/pages/contact.html`);


        highlightActiveNav();
        setDarkModeToggle();
    });

    $("#footer-container").load(`${window.APP_CONFIG.basePath}/partials/footer.html`);
    $("#footer-container").load(`${window.APP_CONFIG.basePath}/partials/footer.html`);

    $(document).ready(function () {
        $('a[href^="#"]').click(function (event) {
            event.preventDefault();
            let target = $($(this).attr("href"));
            if (target.length) {
                $("html, body").animate({ scrollTop: target.offset().top - 50 }, 500);
            }
        });
    });
});

function highlightActiveNav() {
    let currentPage = window.location.pathname.split("/").pop() || "index.html";
    $(".navbar-nav .nav-link").each(function () {
        $(this).toggleClass("active", $(this).attr("href") === currentPage);
    });
}

