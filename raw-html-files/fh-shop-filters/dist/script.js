$('label').on('click', function(){
var color = $(this).next().css('color');
  console.log(color);
  if (color == 'rgb(177, 177, 177)') {
    $(this).next().addClass('grey');
  }
  else { 
    $(this).next().removeClass('grey');
  }
});

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}
    
$('#slider').slider({
	range: true,
	min: 0,
	max: 20000,
	values: [ 1300, 14000 ],
	slide: function(event, ui) {
		
		$('.minPrice').html(ui.values[ 0 ]).digits();
		$('.maxPrice').html(ui.values[ 1 ]).digits();
		$('.price-range-both').html('<i>$' + ui.values[ 0 ] + ' - </i>$' + ui.values[ 1 ] );
	}
});


$('.ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + $('#slider').slider('values', 0 ) + '</span>');

$('.ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + $('#slider').slider('values', 1 ) + '</span>');

var navHeight;
  navHeight = $(window).height() - 70;
  if ($(window).scrollTop() > navHeight) {
    $('nav').addClass('fixed');
  } else {
    $('nav').removeClass('fixed');
  }

$(window).on('scroll', function() {
	var navHeight = $(window).height() - 55;
  if ($(window).scrollTop() > navHeight){
  	$('#topBar').addClass('fixed');
  }else{
    $('#topBar').removeClass('fixed');
    }
});