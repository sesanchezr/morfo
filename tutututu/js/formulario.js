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
/*
var currentRow = 0;
var numValid = 0;
var amountOfFields = 3;


function addRow() {
	currentRow++;
	numValid++;
	var row = document.createElement('tr');
	row.id = 'row' + currentRow;
	document.getElementById('tabla_tutu').appendChild(row);

	var thNum = document.createElement('th');
	thNum.innerHTML = "" + numValid;
	thNum.id = "td" + currentRow;
	row.appendChild(thNum);

	var tdRojo = document.createElement('td');
	row.appendChild(tdRojo);
	var lblRojo = document.createElement('input');
	lblRojo.type = "text";
	lblRojo.className = "form-control";
	lblRojo.placeholder = "Nombre imagen";
	lblRojo.id = "imgNombre" + currentRow;
	tdRojo.appendChild(lblRojo);

	var tdEliminar = document.createElement('td');
	row.appendChild(tdEliminar);
	var btnEliminar = document.createElement('button');
	btnEliminar.type = "button";
	btnEliminar.value = currentRow;
	btnEliminar.onclick = function() {
		deleteRow(this.value);
	};
	btnEliminar.className = "btn btn-danger";
	btnEliminar.innerHTML = "Eliminar";
	tdEliminar.appendChild(btnEliminar);

	var valid = document.createElement('input');
	valid.type = "hidden";
	valid.id = "validRow" + currentRow;
	valid.value = "" + 1;
	tdEliminar.appendChild(valid);

}

function deleteRow(id) {
	jQuery('#row' + id).hide();
	jQuery('#validRow' + id).val(0 + "");
	numValid--;
	for (i = Number(id) + 1; i <= currentRow; i++) {
		if (jQuery('#validRow' + i).val() == "1") {
			jQuery('#td' + i)[0].innerHTML = ""
					+ (jQuery('#td' + i)[0].innerHTML - 1);
		}
	}
}
*/
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
	// for (i = 1; i <= currentRow; i++) {
	// 	if (jQuery('#validRow' + i).val() == "1") {
	// 		var toBeAddedImagen = '"' + jQuery('#imgNombre' + i).val() + '"';
	// 		nombreImagenes.push(toBeAddedImagen);
	// 	}
	// }
	var textoTutututu = jQuery('#textoTutututu').val();
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
	res += "jQuery(document).ready(function(){\n";
	res += "	\/\/ Agregar imágenes arriba del módulo\n";
	res += "	for (var i = 0; i &lt; galeria.length; i++) {\n";
	res += "		var html= \"&lt;a href='\"+URLS['url_thumb_tutu']+\"/"+nombreCarpeta+"/\"+galeria[i]+\"' class='jcepopup galeriaclass' rel='title[\"+galeria[i]+\"];caption[Este es un caption];group[este es un grupo]'&gt;\"+\n";
	res += "		          \"&lt;img src='\"+URLS['url_thumb_tutu']+\"/"+nombreCarpeta+"/\"+galeria[i]+\"' alt='\"+galeria[i]+\"' width='150' heigth='90'&gt;\";\n";
	res += "		jQuery(\"#galeria\").append(html);\n";
	res += "	}\n";
	res += "});\n";
	res += '&lt;/script&gt;\n';

	jQuery('#codigo')[0].innerHTML = res;
}