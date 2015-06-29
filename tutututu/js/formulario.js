function selectText() {
	var element = jQuery('#codigo')[0];
	if (document.selection) {
		var range = document.body.createTextRange(element);
		range.moveToElementText();
		range.select();
	} else if (window.getSelection) {
		var range = document.createRange();
		range.selectNode(element);
		window.getSelection().addRange(range);
	}
}
function generateCode() {
	var nombreImagenes = [];
	var nombreCarpeta = jQuery('#nombreCarpeta').val();
	if (nombreCarpeta == "") return false;
	// obtener listado de archivos
	var formData = new FormData();
	formData.append("foldername",jQuery("#nombreCarpeta").val());
	jQuery.ajax({
		// cambiar 'url_local' por 'url_remoto' cuando sea subido a joomla
		url: URLS["url_seek_tutu"],
		type: 'POST',
		data: formData,
		dataType: 'text',
		success: function(data){
			nombreImagenes = data.split(":");
		},
		async: false,
		cache: false,
		contentType: false,
		processData: false
	});
	var textoTutututu = jQuery('#textoTutututu').val();
	// validar que los <> están correctos
	var bracket=0;
	for (var i=0;i<textoTutututu.length;i++){
		if (textoTutututu[i]== "<")
			bracket+=1;
		if (textoTutututu[i]== ">")
			bracket-=1;
		if (bracket > 1 || bracket < 0)
			break;
	}
	if (bracket != 0){
		jQuery('#codigo')[0].innerHTML = "ERROR: símbolos \"<\" \">\" no están correctamente cerrados";
		return false;
	}
	textoTutututu = textoTutututu.trim();
	textoTutututu = textoTutututu.replace(/(?:\r\n|\r|\n)/g, '<br>');
	textoTutututu = textoTutututu.replace(/</g, '&lt;');
	textoTutututu = textoTutututu.replace(/>/g, '&gt;');
	var res = '&lt;script&gt;\n';
	res += 'var text="' + textoTutututu + '";\n';

	res += 'var galeria=[';
	for (var i=0;i<nombreImagenes.length;i++){
		if (i>0) res +=",";
		res+="\""+nombreImagenes[i]+"\"";
	}
	res += "];\n";
	// res += "jQuery(document).ready(function(){\n";
	// res += "	\/\/ Agregar imágenes arriba del módulo\n";
	// res += "	for (var i = 0; i &lt; galeria.length; i++) {\n";
	// res += "		var html= \"&lt;a href='\"+URLS['url_thumb_tutu']+\"/"+nombreCarpeta+"/\"+galeria[i]+\"' class='jcepopup galeriaclass' rel='title[\"+galeria[i]+\"];caption[ ];group[]'&gt;\"+\n";
	// res += "		          \"&lt;img src='\"+URLS['url_thumb_tutu']+\"/"+nombreCarpeta+"/\"+galeria[i]+\"' alt='\"+galeria[i]+\"' width='150' heigth='90'&gt;\";\n";
	// res += "		jQuery(\"#galeria\").append(html);\n";
	// res += "	}\n";
	// res += "});\n";
	res += 	"var tid = setInterval(function() {\n"+
			"	if (document.readyState !== 'complete') return;\n"+
			"	clearInterval(tid);\n"+
			"	// Trabajo se hace aquí\n"+
			"	for (var i = 0; i < galeria.length; i++) {\n"+
			"		var html= \"&lt;a href='\"+URLS['url_thumb_tutu']+\"/"+nombreCarpeta+"/\"+galeria[i]+\"' class='jcepopup galeriaclass' rel='title[\"+galeria[i]+\"];caption[ ];group[]'&gt;\"+\n"+
			"		          \"&lt;img src='\"+URLS['url_thumb_tutu']+\"/"+nombreCarpeta+"/\"+galeria[i]+\"' alt='\"+galeria[i]+\"' width='150' heigth='90'&gt;\";\n"+
			"		jQuery(\"#galeria\").append(html);\n"+
			"	}\n"+
			"}, 100);\n"+
			"&lt;/script&gt;\n";
	jQuery('#codigo')[0].innerHTML = res;
}