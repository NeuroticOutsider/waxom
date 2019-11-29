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

	// Filter and load-more button (section projects)

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

	$('#play').click(function() {
    setTimeout(function(){
      $('.video__play').fadeOut();
    }, 300);
  });
});

function onYouTubeIframeAPIReady() {
  player = new YT.Player('videoiFrame', {
  playerVars: { 'autoplay': 0, 'showinfo': 0, 'rel': 0},
  videoId: 'vdahvoE25HA'
  });
}; 