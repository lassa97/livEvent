$(document).ready(function() {

	
	$('.burger-container').on('click', function() {
		$('.main-navigation').toggle('medium');	/*velocidad de display del menu*/

		if($('#myBtn').hasClass('change')) {
			$('body').addClass('stop-scroll');
		} else {
			$('body').removeClass('stop-scroll');
		}
	});
	
	
});
