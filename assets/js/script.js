$(".page-scrool").on("click", function () {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
        // Store hash
        var hash = this.hash;
        console.log($(hash).offset().top);
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $("html, body").animate({
                scrollTop: $(hash).offset().top - 40
            },
            1000,
            function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            }
        );
    } // End if
});

$('.navbar-nav a').click(function () {
    $('a').removeClass("active");
    $(this).addClass("active");
});


var $backToTop = $(".backTop");
$backToTop.hide();
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
        $backToTop.fadeIn();
    } else {
        $backToTop.fadeOut();
    }
});

$backToTop.on('click', function (e) {
    $("html, body").animate({
        scrollTop: 0
    }, 500);
});