<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Conversor de videos</title>
	<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
	<style>
		#form_container{
		    position: absolute;
		    margin-left: 25vw;
		    margin-right: auto;
		    text-align: center;
		    width: 600px;
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
			jQuery("#mensajes").text(mensaje);
		}
		function limpiar(num){
			document.getElementById("video"+num).value="";
			jQuery("#check_"+num).removeClass("ticket").removeClass("cross");
			jQuery("#mensajes").text("");
		}
		function masArchivos(){
			//obtener nodo
			nodo=document.getElementById("mas_archivos");
			//añadir nuevo div de seleccion de archivo
			nuevo=document.createElement("div");
			nuevo.setAttribute("class","pure-control-group");
			n_archivos++;
			nuevo.innerHTML='<input type="button" class="boton" value="Limpiar" id="boton'+n_archivos+'" onclick="limpiar('+n_archivos+')"><label class="flotar" for="video'+n_archivos+'">Archivo '+n_archivos+':</label><input class="flotar" id="video'+n_archivos+'" type="file" name="archivos[]" onchange="validarVideo('+n_archivos+')">';
			//crear el div que mostrará el ticket o cruz
			checkdiv = document.createElement("div");
			checkdiv.setAttribute("class","check");
			checkdiv.setAttribute("id","check_"+n_archivos);
			// //añadir elementos
			nodo.appendChild(checkdiv);
			//nodo.appendChild(boton);
			nodo.appendChild(nuevo);
		}
		function validarVideo(num){
			//Verificar que video tiene extensión .flv
			/* OJO que parece que se admiten más formatos de videos... pero limitémoslo a .FLV */
			var re = /(?:\.([^.]+))?$/;
			//recorrer todos los file-inputs
			var texto = document.getElementById("video"+num).value;
			var ext = re.exec(texto)[1];
			if (ext != "flv"){
				alertar("Error, no se admite la extension: "+ext);
				jQuery("#check_"+num).removeClass("ticket").addClass("cross");
				return false;
			}
			jQuery("#check_"+num).removeClass("cross").addClass("ticket");
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
		}

		// Añadir los primeros "init_archivos" inputs del formulario
		jQuery(document).ready(function(){
			for (i=1; i<=init_inputs;i++) masArchivos();
		});
	</script>
</head>
<body>
	<div id="form_container">
		<h3>Conversor de videos</h3>
		<form id="formulario" class="pure-form pure-form-aligned" action="validar.php" method="post" onsubmit="return validarTodo()" enctype="multipart/form-data">
			<fieldset id="inputs">
				<div id="mas_archivos"></div>
				<input type="button" value="Mas archivos..." onclick="masArchivos()">
			</fieldset>
			<br>
			<button type="submit" class="pure-button pure-button-primary">Convertir!</button>
		</form>
		<div id="mensajes"></div>
	</div>
</body>
</html>