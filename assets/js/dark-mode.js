
function setDarkModeToggle() {
    // console.log("setDarkModeToggle()");
    const darkModeCheckbox = $("#dark-mode-checkbox");

    function applyDarkMode(isDark) {
        $("body").toggleClass("dark-mode", isDark);
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
        $(".toggle-label").text(isDark ? "☀️" : "🌙");
    }

    let isDarkMode = localStorage.getItem("darkMode") === "enabled";
    // console.log(`isDarkMode: ${isDarkMode}`);
    applyDarkMode(isDarkMode);

    // console.log(`darkModeCheckbox: ${darkModeCheckbox}`);
    darkModeCheckbox.on("change", function () {
        // console.log("darkModeCheckbox clicked: " + isDarkMode);
        applyDarkMode(this.checked);
    })

    // darkModeCheckbox.click(function () {
    //     console.log("darkModeCheckbox clicked: " + isDarkMode);

    //     applyDarkMode(this.checked);

    // });

}