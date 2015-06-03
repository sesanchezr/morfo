function loadImage(imageId) {
	var index = imageId - 1;
	var img = imgArray[index];

	jQuery('#imagen')[0].innerHTML = '';
	img.appendTo('#imagen');
}

function initImage(id) {
	var index = id - 1;
	img = jQuery('<img class="img-responsive">');
	img.attr('src', nombreCarpeta + '/' + id + '.jpg');
	imgArray[index] = img;
}

function initImages(num) {
	for (i = 1; i <= num; i++) {
		initImage(i);
	}
}

imgArray = new Array(numImages);
initImages(numImages);
loadImage(1);

jQuery("#slider").slider({
	"min" : 1
}, {
	"max" : numImages
}, {
	"slide" : function(event, ui) {
		if (event.originalEvent) {

			loadImage(ui.value);
		}
	}
});

//Instantiate EasyZoom instances
var $easyzoom = $('#imagen').easyZoom();

// Get an instance API
var api = $easyzoom.data('easyZoom');
