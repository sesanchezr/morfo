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

	var res = getCodeTemplate();
	res += '&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"&gt;&lt;/script&gt;&lt;script src="aristoteles/js/timer.js"&gt;&lt;/script&gt;&lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"&gt;&lt;script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"&gt;&lt;/script&gt;';
	res += '&lt;script&gt;';
	res += 'var respuestasRojo=[' + respuestasRojo + '];';
	res += 'var respuestasBlanco=[' + respuestasBlanco + '];';
	res += 'var nombreCarpeta="../aristoteles/' + nombreCarpeta + '";';
//	res += 'var nombreCarpeta="../aristoteles/' + "gymkana1" + '";';
	res += 'var titulo="' + titulo + '";';
//	res += 'var titulo="' + "Gymkana 1" + '";';
	res += 'var descripcion="' + descripcion + '";';
	res += '&lt;/script&gt;';

	res += '&lt;script src="aristoteles/js/gymcana.js"&gt;&lt;/script&gt;';

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

function getCodeTemplate() {
	var strVar = "";
	strVar += "<style>.input-group .form-control {height : inherit;} </style>";
	strVar += " <div id=\"intro\" class=\"col-md-12\">";
	strVar += "      <div class=\"col-md-6 col-md-offset-3\">";
	strVar += "        <h2 id=\"titulo\"><\/h2>";
	strVar += "        <pre id=\"descripcion\"><\/pre>";
	strVar += "        <br \/>";
	strVar += "        <button type=\"button\" class=\"btn btn-default\" onClick=\"startApp();\">Comenzar gymcana<\/button>";
	strVar += "      <\/div> ";
	strVar += "    <\/div>";
	strVar += "";
	strVar += "    <div id=\"gymcana\" class=\"col-md-12\">";
	strVar += "    <div class=\"col-md-8\">";
	strVar += "      <div class=\"row\">";
	strVar += "        <div class=\"col-md-12\">";
	strVar += "          <div id=\"mainContainer1\" class=\"morfoObject\">";
	strVar += "            ";
	strVar += "          <\/div>";
	strVar += "          <div id=\"mainContainer2\" class=\"morfoObject\">";
	strVar += "            ";
	strVar += "          <\/div>";
	strVar += "          <div id=\"mainContainer3\" class=\"morfoObject\">";
	strVar += "            ";
	strVar += "          <\/div>";
	strVar += "        <\/div>";
	strVar += "        <div id=\"rojoAnswerContainer\" class=\"col-md-6 morfoAnswer\">";
	strVar += "          <\/br>";
	strVar += "          <div class=\"form-group\">";
	strVar += "            <div class=\"input-group\">";
	strVar += "            <input id=\"respuestaRojo\" type=\"text\" class=\"form-control\" placeholder=\"Rojo\" \/>";
	strVar += "            <span class=\"input-group-addon\">";
	strVar += "              <button type=\"button\" id=\"btn-rojo\" class=\"btn btn-default\" onClick=\"revisarRespuestaRojo();\"><\/button>";
	strVar += "            <\/span>";
	strVar += "            <\/div>";
	strVar += "            <\/br>";
	strVar += "            <input type=\"text\" id=\"lbl-rojo\" class=\"form-control\" value=\"\" disabled\/>";
	strVar += "          <\/div>";
	strVar += "        <\/div>";
	strVar += "        <div id=\"blancoAnswerContainer\" class=\"col-md-6 morfoAnswer\">";
	strVar += "          <\/br>";
	strVar += "          <div class=\"form-group\">";
	strVar += "            <div class=\"input-group\">";
	strVar += "            <input id=\"respuestaBlanco\" type=\"text\" class=\"form-control\" placeholder=\"Blanco\" \/>";
	strVar += "            <span class=\"input-group-addon\">";
	strVar += "              <button type=\"button\" id=\"btn-blanco\" class=\"btn btn-default\" onClick=\"revisarRespuestaBlanco();\"><\/button>";
	strVar += "              <\/span>";
	strVar += "            <\/div>";
	strVar += "            <\/br>";
	strVar += "            <input type=\"text\" id=\"lbl-blanco\" class=\"form-control\" value=\"\" disabled\/>";
	strVar += "            ";
	strVar += "          <\/div>";
	strVar += "        <\/div>";
	strVar += "      <\/div>";
	strVar += "	<\/div>";
	strVar += "    <div class=\"col-md-4\">";
	strVar += "      <div class=\"col-md-12\">";

	strVar += "		<div class=\"row\">";
	strVar += "			<div class=\"col-md-7\"><div class=\"row\">";
	strVar += "      		<label style=\"float:left\">EstaciÃ³n:</label>";
	strVar += "<input disabled=\"\" size=\"2\" value=\"1\" class=\"col-lg-3 text-center\" id=\"estacionId\" type=\"text\">";
	strVar += "      		<\/div>";
	strVar += "      		<\/div>";
	strVar += "			<div class=\"col-md-5\"><div class=\"row\">";
	strVar += "<label style=\"float:left\">/</label>";
	strVar += "			<input type=\"text\" id=\"estacionMaxId\" class=\"col-lg-4 text-center\" value=\"\" size=\"2\" disabled=\"\">";
	strVar += "      		<\/div>";
	strVar += "      		<\/div>";
	strVar += "      		<\/div>";
	strVar += "      	<\/div>";



	strVar += "      <div class=\"col-md-12\">";
	strVar += "        <\/br>";
	strVar += "	<div class=\"row\">";
	strVar += "        <label style=\"float: left\">Buenas:<\/label> <input type=\"text\" id=\"buenasId\" class=\"col-lg-2 text-center\" value=\"0\" size=\"2\" disabled\/><\/br>";
	strVar += "      	<\/div>";
	strVar += "		<div class=\"row\">";
	strVar += "        <label style=\"float: left\">Malas:<\/label> <input type=\"text\" id=\"malasId\"  class=\"col-lg-2 text-center\" value=\"0\" size=\"2\" disabled\/>";
	strVar += "      	<\/div>";
	strVar += "      <\/div>  ";
	strVar += "      <div class=\"col-md-12 estacionNav\">";
	strVar += "        <\/br>";
	strVar += "        <div class=\"btn-group btn-group-vertical\" role=\"group\">";
	strVar += "          <button type=\"button\" id=\"btn-nav-1\" class=\"btn-nav btn btn-default btn-lg\" onClick=\"showContainer(1);\">1<\/button>";
	strVar += "          <button type=\"button\" id=\"btn-nav-2\" class=\"btn-nav btn btn-default btn-lg\" onClick=\"showContainer(2);\">2<\/button>";
	strVar += "          <button type=\"button\" id=\"btn-nav-3\" class=\"btn-nav btn btn-default btn-lg\" onClick=\"showContainer(3);\">3<\/button>";
	strVar += "        <\/div>";
	strVar += "      <\/div>  ";
	strVar += "      <\/hr>";
	strVar += "      <div class=\"col-md-12\">";
	strVar += "        <\/br>";
	strVar += "          <button type=\"button\" id=\"btn-sgnt-estacion\" class=\"btn btn-default btn-lg\" onClick=\"nextEstacion();\">Siguiente estaci&oacute;n<\/button>";
	strVar += "      <\/div>";
	strVar += "      <div class=\"col-md-7\">";
	strVar += "        <\/br>";
	strVar += "        <div class=\"form-group form-group-lg\">";
	strVar += "          <input type=\"text\" id=\"timer\" class=\"form-control text-center\" value=\"60\" size=\"2\" disabled\/>";
	strVar += "        <\/div>  ";
	strVar += "      <\/div> ";
	strVar += "      <div class=\"col-md-12\">";
	strVar += "        <\/br>";
	strVar += "        <\/br>";
	strVar += "        <div class=\"form-group form-group-lg\">";
	strVar += "          <button type=\"button\" id=\"btn-repetir\" class=\"btn btn-danger\" onClick=\"reiniciar();\">Repetir Gymkana<\/button>";
	strVar += "        <\/div>  ";
	strVar += "      <\/div>  ";
	strVar += "";
	strVar += "    <\/div>";
	strVar += "";
	strVar += "    <\/div>";
	strVar += "";

	strVar = strVar.replace(/(?:\r\n|\r|\n)/g, '<br />');
	strVar = strVar.replace(/</g, '&lt;');
	strVar = strVar.replace(/>/g, '&gt;');
	
	return strVar;
}
