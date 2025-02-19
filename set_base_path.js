// (function () {
//     // console.log("index.html");

//     // Get the current URL path
//     let currentPath = window.location.pathname;

//     let basePath = currentPath.includes("/portfolio-website/")
//         ? "/portfolio-website/"
//         : "/";

//     document.querySelectorAll("link[rel='stylesheet'], script[src], img[src], a[href]").forEach(el => {
//         let attr = el.tagName === "LINK" || el.tagName === "SCRIPT"
//     })

//     if (!currentPath.endsWith("/")) {
//         basePath = basePath.replace(/\$/, "");
//     }

//     const existingBaseTag = document.querySelector("base");
//     if (existingBaseTag) {
//         existingBaseTag.remove();
//     }

//     // Create the <base> element dynamically
//     let baseTag = document.createElement('base');
//     baseTag.href = basePath;
//     document.head.prepend(baseTag);
// })();