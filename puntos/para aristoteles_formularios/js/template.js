jQuery("#bigImage").hide();
jQuery('body').addClass('smallBody');
jQuery('.container').addClass('smallImage');


var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.bigImage{min-width: 1050px;} .bigBody{min-width: 1100px;} .smallImage{min-width: 450px;} .smallBody{min-width: 500px;}';
document.getElementsByTagName('head')[0].appendChild(style);

//style
jQuery('#swiffycontainer').css({"width": "400px", "height":"300px"});
jQuery('#swiffycontainer2').css({"width": "1000px", "height":"611px"});

jQuery('#swiffycontainer').click(function(){ expandFigure(); });

checkIfResizeNecessary();
/*jQuery(window).bind('resize', function () { 
	checkIfResizeNecessary();
});*/
function checkIfResizeNecessary(){
	if( window.innerWidth >= 1000 ){
		expandFigure();
		jQuery('#zoomout').hide();
	}else{
		contractFigure();
		jQuery('#zoomout').show();
	}
}



function expandFigure(){
	jQuery('#smallImage').hide();
	jQuery('#bigImage').show();
	jQuery('#content').removeClass('span9').addClass('span11');
	jQuery('body').removeClass('smallBody').addClass('bigBody');
	jQuery('.container').removeClass('smallImage').addClass('bigImage');
}

function contractFigure(){
	jQuery('#smallImage').show();
	jQuery('#bigImage').hide();
	jQuery('#content').removeClass('span11').addClass('span9');
	jQuery('body').removeClass('bigBody').addClass('smallBody');
	jQuery('.container').removeClass('bigImage').addClass('smallImage');
}