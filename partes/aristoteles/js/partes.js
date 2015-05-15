jQuery('body').addClass('smallBody');
jQuery('.container').addClass('smallImage');

var mobile = true;
if (window.innerWidth >= 900) {
	expandFigure();
	jQuery('#zoomin').hide();
	jQuery('#zoomout').hide();
	mobile = false;
}

function expandFigure() {
	jQuery('#smallImage').hide();
	jQuery('#bigImage').show();
	jQuery('.swiffyObject').hide();

	jQuery('#swiffycontainerBig-' + currentDiv).show();
	jQuery('#content').removeClass('span9').addClass('span11');
	jQuery('body').removeClass('smallBody').addClass('bigBody');
	jQuery('.container').removeClass('smallImage').addClass('bigImage');
	expanded = true;
}

function contractFigure() {
	jQuery('#bigImage').hide();
	jQuery('#smallImage').show();
	jQuery('.swiffyObject').hide();

	jQuery('#swiffycontainerSmall-' + currentDiv).show();
	jQuery('#content').removeClass('span11').addClass('span9');
	jQuery('body').removeClass('bigBody').addClass('smallBody');
	jQuery('.container').removeClass('bigImage').addClass('smallImage');
	expanded = false;
}

function toogleAll(id) {

	currentDiv = id;

	// only create divs if they do not exist
	if (!jQuery("#swiffycontainerSmall-" + id).length) {

		var smallDiv = $("<div>", {
			id : "swiffycontainerSmall-" + id,
			class : "swiffyObject",
			css : {
				'width' : '400px',
				'height' : '300px'
			}
		});
		jQuery("#smallSwiffy").append(smallDiv);

		var stageSmall = new swiffy.Stage(document
				.getElementById('swiffycontainerSmall-' + id),
				window['swiffySmall_' + id], {});

		stageSmall.start();

	}

	if (!jQuery("#swiffycontainerBig-" + id).length) {
		var bigDiv = $("<div>", {
			id : "swiffycontainerBig-" + id,
			class : "swiffyObject",
			css : {
				'width' : '800px',
				'height' : '550px'
			}
		});
		jQuery("#bigSwiffy").append(bigDiv);

		var stageBig = new swiffy.Stage(document
				.getElementById('swiffycontainerBig-' + id),
				window['swiffyBig_' + id], {});

		stageBig.start();
	}

	if (mobile) {
		contractFigure();
	} else {
		expandFigure();
	}
}

var currentDiv = 0;
toogleAll(currentDiv);      