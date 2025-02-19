
$(".filter-btn").click(function () {
    let category = $(this).attr("data-category");

    // console.log(`categpry: ${category}`);

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    $(".project-card").each(function () {
        $(this).toggle(category === "all" || $(this).data("category") === category);
    });
});