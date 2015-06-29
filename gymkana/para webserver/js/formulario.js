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

	// Código para importar urls globales
	/*
	<script src="<raíz del sitio>urls_globales/getURLS.js"></script>
	<script>
		//OBTENER URLS DESDE EL JSON
		var URLS = getURLS();
	</script>
	<script type="text/javascript">
	    var script1 = document.createElement('script');
	    script1.src = URLS["url_de_este_script"];
	    head_tag = document.getElementsByTagName('head')[0];
	    head_tag.appendChild(script1);
	</script>

	A continuación se quiere importar los scripts que estarán en:
		- URLS["url_timer_gym"]
		- URLS["url_imagenes_gym"]
		- URLS["url_template_gym"]
		- URLS["url_gymkana_gym"]

	*/
	var res = 	'&lt;div id="gymkanaContainer"&gt;&lt;/div&gt;\n'+
	// Primer importar urls globales
	// OJO: EN ESTA LÍNEA CAMBIAR EL SOURCE SEGÚN EL HOST. EN HOSTGATOR ES "/~morfo3/urls...."
			  	'&lt;script src="/~morfo3/urls_globales/getURLS.js"&gt;&lt;/script&gt;\n'+
			  	'&lt;script type="text/javascript"&gt;\n'+
			  	'	var URLS = getURLS();\n'+
	// Ahora importar scripts
				'	var s_timer = document.createElement("script");\n'+
				'	var s_template = document.createElement("script");\n'+
				'	var s_gymkana = document.createElement("script");\n'+
				'	s_timer.src = URLS["url_timer_gym"];\n'+
				'	s_template.src = URLS["url_template_gym"];\n'+
				'	s_gymkana.src = URLS["url_gymkana_gym"];\n'+
				'	head_tag = document.getElementsByTagName("head")[0];\n'+
				'	head_tag.appendChild(s_timer);\n'+
				'	head_tag.appendChild(s_template);\n'+
				'	head_tag.appendChild(s_gymkana);\n'+
				'&lt;/script&gt;\n'+
	// Ahora, armar variables de la gymkana	
				'&lt;script&gt;\n'+
	// Asegurarse de que el documento esté ready para que "URLS" ya esté definida
				'	var nombreCarpeta="";\n'+
				'	jQuery(document).ready(function(){\n'+
				'		nombreCarpeta=URLS["url_imagenes_gym"]+"/"+"'+nombreCarpeta+'";\n'+
				'	});\n'+
				'	var respuestasRojo=['+respuestasRojo+'];\n'+
				'	var respuestasBlanco=['+respuestasBlanco+'];\n'+
//				'	var nombreCarpeta="../aristoteles/' + "gymkana1" + '";';
				'	var titulo="'+titulo+'";\n'+
//				'	var titulo="' + "Gymkana 1" + '";';
				'	var descripcion="'+descripcion+'";\n'+
				'&lt;/script&gt;\n';

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
