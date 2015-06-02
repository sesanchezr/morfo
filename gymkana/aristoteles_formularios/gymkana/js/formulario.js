var currentRow = 0;
var numValid = 0;
var amountOfFields = 3;

function addRow() {
	currentRow++;
	numValid++;
	var row = document.createElement('tr');
	row.id = 'row' + currentRow;
	document.getElementById('respuestas').appendChild(row);

	var thNum = document.createElement('th');
	thNum.innerHTML = "" + numValid;
	thNum.id = "td" + currentRow;
	row.appendChild(thNum);

	var tdRojo = document.createElement('td');
	row.appendChild(tdRojo);
	var lblRojo = document.createElement('input');
	lblRojo.type = "text";
	lblRojo.className = "form-control";
	lblRojo.placeholder = "Rojo";
	lblRojo.id = "respRojo" + currentRow;
	tdRojo.appendChild(lblRojo);

	var tdBlanco = document.createElement('td');
	row.appendChild(tdBlanco);
	var lblBlanco = document.createElement('input');
	lblBlanco.type = "text";
	lblBlanco.className = "form-control";
	lblBlanco.placeholder = "Blanco";
	lblBlanco.id = "respBlanco" + currentRow;
	tdBlanco.appendChild(lblBlanco);

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
	var respuestasRojo = [];
	var respuestasBlanco = [];
	var nombreCarpeta = jQuery('#nomCarpeta').val();
	var titulo = jQuery('#titulo').val();
	var descripcion = jQuery('#descripcion').val();

	for (i = 1; i <= currentRow; i++) {
		if (jQuery('#validRow' + i).val() == "1") {
			var toBeAddedRojo = '"' + jQuery('#respRojo' + i).val() + '"';
			var toBeAddedBlanco = '"' + jQuery('#respBlanco' + i).val() + '"';
			respuestasRojo.push(toBeAddedRojo);
			respuestasBlanco.push(toBeAddedBlanco);
		}
	}

	var res = '&lt;div id="gymkanaContainer"&gt;&lt;/div&gt;';
	//res += '&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"&gt;'
	res += '&lt;script src="';
	{source}<?php echo "res += '".$url_timer_gym."';";?>{/source}
	res += '&gt;$lt;/script&gt;';
	//res+='&lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"&gt;'
	//res+='&lt;script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"&gt;&lt;/script&gt;';
		
	res += '&lt;script&gt;';
	res += 'var respuestasRojo=[' + respuestasRojo + '];';
	res += 'var respuestasBlanco=[' + respuestasBlanco + '];';
	{source}<?php echo "res += 'var nombreCarpeta=\"".$url_aris_form."/gymkana/' + nombreCarpeta +'\";'";?>{/source}
//	res += 'var nombreCarpeta="../aristoteles/' + "gymkana1" + '";';
	res += 'var titulo="' + titulo + '";';
//	res += 'var titulo="' + "Gymkana 1" + '";';
	res += 'var descripcion="' + descripcion + '";';
	res += '&lt;/script&gt;';

	{source}<?php echo "res += '&lt;script src=\"".$url_template_gym."\"&gt;&lt;/script&gt;';";?>{/source}
	{source}<?php echo "res += '&lt;script src=\"".$url_gymkana_gym."\"&gt;&lt;/script&gt;';"?>{/source}
	

	jQuery('#codigo')[0].innerHTML = res;
}

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

for (i = 1; i <= amountOfFields; i++) {
	addRow();
}
