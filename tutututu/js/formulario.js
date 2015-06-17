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

function generateCode() {


	var nombreImagenes = [];
	var nombreCarpeta = jQuery('#nombreCarpeta').val();

	for (i = 1; i <= currentRow; i++) {
		if (jQuery('#validRow' + i).val() == "1") {
			var toBeAddedImagen = '"' + jQuery('#imgNombre' + i).val() + '"';
			nombreImagenes.push(toBeAddedImagen);
		}
	}

	var textoTutututu = jQuery('#textoTutututu').val();
	textoTutututu = textoTutututu.trim();
	textoTutututu = textoTutututu.replace(/(?:\r\n|\r|\n)/g, '<br>');
	textoTutututu = textoTutututu.replace(/</g, '&lt;');
	textoTutututu = textoTutututu.replace(/>/g, '&gt;');
	var res = '&lt;script&gt;';
	res += 'var text="' + textoTutututu + '";';
	res += '&lt;/script&gt;';

	res += 'var fotitos=['+nombreImagenes+']';
	res += "jQuery(document).ready(function(){";
	res += "		\/\/ Agregar imágenes arriba del módulo";
	res += "		for (var i = 0; i < fotitos.length; i++) {";
	res += "			var html= \"<a href='\"+URLS['url_thumb_tutu']+\"/\"+fotitos[i]+\"' class='jcepopup fotitosclass' rel='title[\"+fotitos[i]+\"];caption[Este es un caption];group[este es un grupo]'>\"+";
	res += "					\"<img src='\"+URLS['url_thumb_tutu']+\"/\"+fotitos[i]+\"' alt='\"+fotitos[i]+\"' width='150' heigth='90'>\";";
	res += "			jQuery(\"#fotitos\").append(html);";
	res += "		}";
	res += "	});";

	res = "OJO QUE HAY QUE REPARAR ESTA VARIABLE QLIA EN TUTUTUTU/JS/FORMULARIO.JS"



	jQuery('#codigo')[0].innerHTML = res;
}