$(function() {

  $('.hamburger').click(function () {
		$(this).toggleClass('is-active');
		if($(this).hasClass('is-active')) {
			$('.navbar__list-item').slideDown();
			$('.body').addClass('body--active');
		} else {
			$('.navbar__list-item').slideUp();
			$('.body').removeClass('body--active');
		};
	});

	// top slider

	$('.top-carousel').owlCarousel({
		loop: true,
		items: 1,
		nav: true,
		smartSpeed: 700,
		responsiveClass: true,
		dots: true, 
		autoplay: true,
    autoplayTimeout: 10000
	});
});