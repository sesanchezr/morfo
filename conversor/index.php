<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Conversor</title>
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
	<style>
		#form_container{
		    position: absolute;
		    margin-left: 200px;
		    margin-right: auto;
		    text-align: center;
		    width: 950px;
		    height: auto;
		    padding: 30px;
		    vertical-align: middle;
		    margin-top: 100px;
		    background-color: rgba(230, 230, 230, 0.9);
		    border-radius: 40px;
		    box-shadow: 0px 0px 30px rgba(100, 120, 120, 0.4);
		    border: 1px solid #CFCFCF;
		}
		.ticket{
			background-image: url("ticket.png");
		}
		.cross{
			background-image: url("cross.png");
		}
		.check{
			float:right;
			height: 35px;
			width: 40px;
			background-size: 40px;
			background-repeat: no-repeat;
			position: absolute;
			z-index:0;
		}
		.pure-control-group{
			overflow: hidden;
			border-bottom: solid 1px #aaa;
			padding-bottom: 4px;
			margin-bottom: -4px;
		}
		.float{
			float: left;
		}
		#mensajes{
			padding: 20px;
			color:#aa0000;
		}
		.boton{
			position:absolute;
			margin-left: -20px;
			z-index:10;
		}
	</style>
	<script>
		init_inputs = 3;
		n_archivos=0;
		function alertar(mensaje){
			$("#mensajes").text(mensaje);
		}
		function limpiar(num){
			document.getElementById("video"+num).value="";
			$("#check_"+num).removeClass("ticket").removeClass("cross");
			$("#mensajes").text("");
			$("#resol_"+num).val("1");
		}
		var resoluciones=["400x288","480x320","640x432","960x640","1024x768"];
		function masArchivos(){
			//obtener nodo
			nodo=document.getElementById("mas_archivos");
			//añadir nuevo div de seleccion de archivo
			nuevo=document.createElement("div");
			nuevo.setAttribute("class","pure-control-group");
			n_archivos++;
			var html = '<input type="button" class="boton" value="Limpiar" id="boton'+n_archivos+'" onclick="limpiar('+n_archivos+')"><label class="flotar" for="video'+n_archivos+'">Archivo '+n_archivos+':</label><input class="flotar" id="video'+n_archivos+'" type="file" name="archivos[]" onchange="validarVideo('+n_archivos+')">';
			// Añadir combobox con resoluciones admitidas
			html += "<label for='resol_n"+n_archivos+"'>Resolución: </label><select name='resol[]' id='resol_"+n_archivos+"'>\n<option value='defecto' selected>Misma del video</option>";
			for (var i=0; i<resoluciones.length; i++){
				html += "<option value='"+resoluciones[i]+"'>"+resoluciones[i]+"</option>\n";
			}
			html += "</select>\n";
			nuevo.innerHTML = html;
			//crear el div que mostrará el ticket o cruz
			checkdiv = document.createElement("div");
			checkdiv.setAttribute("class","check");
			checkdiv.setAttribute("id","check_"+n_archivos);
			// //añadir elementos
			nodo.appendChild(checkdiv);
			//nodo.appendChild(boton);
			nodo.appendChild(nuevo);
		}
		function menosArchivos(){
			if (n_archivos > 1){
				$("#mas_archivos div:last").remove();
				$("#mas_archivos div:last").remove();
				n_archivos -= 1;
			}

		}
		function validarVideo(num){
			//Verificar que video tiene extensión .flv
			/* OJO que parece que se admiten más formatos de videos... pero limitémoslo a FLV.*/
			var re = /(?:\.([^.]+))?$/;
			//recorrer todos los file-inputs
			var texto = document.getElementById("video"+num).value;
			var ext = re.exec(texto)[1];
			if (ext != "flv"){
				alertar("Error, no se admite la extension: "+ext);
				$("#check_"+num).removeClass("ticket").addClass("cross");
				return false;
			}
			$("#check_"+num).removeClass("cross").addClass("ticket");
			alertar("");
			return true;
		}
		function validarTodo(){
			//Verificar que todos tengan por lo menos algo
			vacios = true;
			novalido = false;
			for (var i=1;i<=n_archivos;i++){
				texto = document.getElementById("video"+i).value;
				if (texto != "") {
					vacios = false;
					if (!validarVideo(i)) return false;
					alertar("");
				}
			}
			if (vacios){
				alertar("Error: Debe ingresar algún archivo!");
				return false;
			}
			// Aquí está todo ok. No retorno true para evitar que se recargue la página
			alertar("Subiendo videos y convirtiendo. Esto puede demorar varios minutos dependiendo del tamaño de los archivos. ¡Paciencia!");
			jQuery("#conv_button").attr('disabled','disabled');
			jQuery("#mensajes").css("color","#33aa33");
		}
		// $(document).ready(function{
		// 	$('#formulario input[type=file]').each(
		// 		function (){

		// 		}
		// 	);
		// });
		$(document).ready(function(){
			//Añadir los primeros "init_archivos" inputs del formulario
			for (i=1; i<=init_inputs;i++) masArchivos();
		});
	</script>
</head>
<body>
	<div id="form_container">
		<form id="formulario" class="pure-form pure-form-aligned" action="validar.php" method="post" onsubmit="return validarTodo()" enctype="multipart/form-data">
			<fieldset id="inputs">
				<input type="button" value="Mas archivos..." onclick="masArchivos()">
				<input type="button" value="Quitar" onclick="menosArchivos()">
				<div id="mas_archivos"></div>
			</fieldset>
			<br>
			<button id="conv_button" type="submit" class="pure-button pure-button-primary">Convertir!</button>
		</form>
		<div id="mensajes"></div>
	</div>
</body>
</html>