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
		    margin-left: 30vw;
		    margin-right: auto;
		    text-align: center;
		    width: 500px;
		    height: auto;
		    padding: 30px;
		    vertical-align: middle;
		    margin-top: 100px;
		    background-color: rgba(230, 230, 230, 0.9);
		    border-radius: 40px;
		    box-shadow: 0px 0px 30px rgba(100, 120, 120, 0.4);
		    border: 1px solid #CFCFCF;
		}
	</style>
	<script>
		n_archivos=3;
		function masArchivos(){
			//obtener nodo
			nodo=document.getElementById("mas_archivos");
			//añadir nuevo div de seleccion de archivo
			nuevo=document.createElement("div");
			nuevo.setAttribute("class","pure-control-group");
			n_archivos++;
			nuevo.innerHTML='<label for="video'+n_archivos+'">Archivo '+n_archivos+':</label><input id="video'+n_archivos+'" type="file" name="archivos[]">';
			nodo.appendChild(nuevo);
		}
		function validar(){
			//verificar que archivos tienen la extensión .flv
			/* OJO que probablemente de lo mismo, el programa debiera ser capaz de convertir CUALQUIER
			formato de video. Pero por ahora, sólo verifiquemos el flv */
			//recordar que hay "n_archivos" file inputs con id "video"+n_archivos
			var re = /(?:\.([^.]+))?$/;
			vacios=true;
			for (var i=0;i<n_archivos;i++){
				//recorrer todos los file-inputs
				var texto = document.getElementById("video"+(i+1)).value;
				if (texto != ""){
					vacios=false;
					if (re.exec(texto)[1] != "flv"){
						alert("Error, no se admite la extension: "+re.exec(texto)[1]);
						return false;
					}
				}
			}
			if (vacios){
				alert("Debe ingresar algún archivo");
				return false;
			}
			return true;
		}
		// $(document).ready(function{
		// 	$('#formulario input[type=file]').each(
		// 		function (){

		// 		}
		// 	);
		// });
		//$('#video1').focusout(alert("hola"))
	</script>
</head>
<body>
	<div id="form_container">
		<form id="formulario" class="pure-form pure-form-aligned" action="validar.php" method="post" onsubmit="return validar()" enctype="multipart/form-data">
			<fieldset id="inputs">
				<div class="pure-control-group"><label for="video1">Archivo 1:</label><input id="video1" type="file" name="archivos[]"></div>
				<div class="pure-control-group"><label for="video2">Archivo 2:</label><input id="video2" type="file" name="archivos[]"></div>
				<div class="pure-control-group"><label for="video3">Archivo 3:</label><input id="video3" type="file" name="archivos[]"></div>
				<div id="mas_archivos"></div>
				<input type="button" value="Mas archivos..." onclick="masArchivos()">
			</fieldset>
			<br>
			<button type="submit" class="pure-button pure-button-primary">Convertir!</button>
		</form>
	</div>
</body>
</html>