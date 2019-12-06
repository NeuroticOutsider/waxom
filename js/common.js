$(function() {

	// Preloader and animation

	$('.preloader').delay(1500).fadeOut('slow');

	new WOW().init();

	// Hamburger

  $('.hamburger').click(function () {
		$(this).toggleClass('is-active');
		if($(this).hasClass('is-active')) {
			$('.navbar__list-items').slideDown();
			$('.body').addClass('body--active');
			$('.top-header--fixed .navbar__list-items li a').css({'color':'#fff'});
		} else {
			$('.navbar__list-items').slideUp();
			$('.body').removeClass('body--active');
		};
	});

	// top slider (header)

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

	// Filter (section projects)

	$('.projects__list-btn').click(function() {
		$('.projects__list-btn').removeClass('active');
		$(this).addClass('active');
	});

	var $projectsItem = $('.projects__list-item').hide(),
			viewLess = $('.projects__view-less').hide(),
			$curr;

  $('.projects__list-btn').click(function() {
		$curr = $projectsItem.filter('.' + this.id).hide();
    $curr.slice(0, 6).show();
		$projectsItem.not($curr).hide();
		let countItem = $('.projects__projects-list').find('.projects__list-item:visible').length;
		if (countItem < 6) {
			$('#load-more').hide();
		} else {
			$('#load-more').show();
		}
	}).filter('.active').click();
	
	// Load-more button (section projects)

	$("#load-more").click( function(event) {
		event.preventDefault();
		$curr.filter(':hidden').slice(0, 6).slideDown();
		if ($curr.filter(':hidden').length == 0) {
			$("#load-more").hide();
			$('#view-less').fadeIn();
		};
	});

	$("#view-less").click( function(event) {
		event.preventDefault();
		$curr.slice(6).slideUp();
		$("#load-more").fadeIn();
		$('#view-less').hide();;
	});

	// Section video
	
	$('#play').on('click', function(e) {
		e.preventDefault();
		setTimeout(function(){
			$('.video__play').fadeOut('slow');
    }, 1900);
		$("#player")[0].src += "?autoplay=1";
	})

	// Counter (section statistics)

	var cc = 1;
  $(window).scroll(function () {
		$('#counter').each(function(){
			var
			cPos = $(this).offset().top,
			topWindow = $(window).scrollTop();
			if (cPos < topWindow + 700) {
				if (cc < 2) {
				  $('.statistics__counts').each(function () {
						cc = cc + 2;
						$(this).prop('Counter',0).animate({
						Counter: $(this).text()
						}, {
							duration: 1500,
							easing: 'swing',
							step: function (now) {
								$(this).text(Math.ceil(now));
							}
						});
					});  	
				}
			}
		});
	});
 	
	// Posts slider

	$('#posts-carousel').owlCarousel({
    loop: false,
		responsiveClass: true,
		dots: false,
    responsive:{
        0:{
            items:1,
            nav: true
        },
        992:{
            items:2,
            nav: true
        },
        1200:{
            items: 3,
            nav: true
        }
    }
	})

// Button scroll top

	let btnScrollTop = $('.btn__scroll-top');

	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			btnScrollTop.addClass('show');
		} else {
			btnScrollTop.removeClass('show');
		};
	});

	btnScrollTop.click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

	// Menu fixed with scroll

	$(window).scroll(function(){
		if( $(window).scrollTop() > 300 ) {
			$('.top-header').addClass('top-header--fixed');
			$('.top-header--fixed').slideDown();
		} else {
				$('.top-header').removeClass('top-header--fixed');
			};
	});

});