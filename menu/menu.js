jQuery(document).ready(function(){
	// Tomar menu principal
	var menu = jQuery('nav')[0].children[0].children;
	// clono el dropdown activo
	var clon = jQuery(menu).children('.dropdown').children().children('ul').children('.active').clone();
	// borro el resto de dropdown
	jQuery(menu).children('.dropdown').children().children('ul').children().children('.dropdown').remove();
	// chek si hay dropdown
	if (jQuery.isEmptyObject(clon)){
		
	}
	else{
		jQuery('.maintop-1 .block').css('z-index',9999);
		var i = 1;
		while(!clon.length==0){
			var end = jQuery(clon).children('.dropdown').children('.column').children().children()
			if (end.length==0){
				break;
			}
			jQuery('.maintop-1').append("<div class=\"block widget widget-menu no-title clearfix \" style=\"min-height: 40px;\"><div class=\"content\"> \
	        <nav class=\"ex-menu hidden-phone\" dropdown-animation=\"scale-up\" dropdown-sub-animation=\"slide-right\">  \
	        <ul id=\"sub" + i + "\" class=\"l1\"><\/ul><\/nav><\/div>");
			var clon2 = jQuery(clon).children('.dropdown').children().children('ul').children('.active').clone();
			jQuery(clon).children('.dropdown').children('.column').children().children().children('.dropdown').remove();
	        jQuery("#sub" + i).append(jQuery(clon).children('.dropdown').children('.column').children().children());
	        ++i;
	        clon = clon2;
	    } 
	}

});