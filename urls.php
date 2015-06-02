<?php
	/*****************************************************************
	 Este archivo tiene que estar en $raiz_del_sitio/formularios_php/

	 Acá se definen los directorios y urls de los recursos utilizados principalmente
	 por los formularios. TODOS los paths y urls son ABSOLUTOS.

	Para utilizarlos, agregar al inicio del artículo del formulario lo siguiente: 
	´´´´´´´´´´´´´´´´´´´´´´´´
		<script src="/~morfo3/formularios_php/js/getURLS.js"></script>
		<script>
			//OBTENER URLS DESDE EL JSON
			var URLS = getURLS();
		</script>
	´´´´´´´´´´´´´´´´´´´´´´´´
	Notar que la primera URL es la única que debe estar hardcodeada.
	Para utilizarlos en un archivo .php, hacer:
	<?php
		require_once("urls.php");
	...
	?>
	Cuando se hace include o require (_once), es como copiar pegar lo del archivo incluido en el archivo que lo incluye.
	Por esto, NO sirven los links relativos desde el archivo incluido, osea, este.
	Hay que reconstruirlos de manera general, que no dependa de la ubicación del archivo actual, sinó
	que de las características del servidor. Por esto, NO SE PUEDEN USAR PATHS RELATIVOS.

	*/

	// urls web
	$url_raiz_sitio = $_SERVER['HTTP_HOST'];								//URL de la raíz del sitio
	if (substr($_SERVER['REQUEST_URI'], 0,2) == "/~") {
		$esplit = split("/",$_SERVER['REQUEST_URI']);
		$url_raiz_sitio .= "/".$esplit[1];
	}
	$protocolo = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
	$url_phps = 				"$protocolo$url_raiz_sitio/formularios_php";//URL hacia php's de formularios
	$url_aris_form = 			"$protocolo$url_raiz_sitio/aristoteles/formularios";//URL hacia recursos de los formularios
	// paths servidor
	// USAR ESTE PARA EL SERVER DE INTEGRACIÓN
	//$path_raiz_server =			$_SERVER["DOCUMENT_ROOT"];
	// USAR ESTE PARA EL SERVER HOSTGATOR
	$path_raiz_server = 		"/home/morfo3/public_html";
	$path_phps = 				"$path_raiz_server/formularios_php";		//Path en server hacia php's de formularios
	$path_aris_form = 			"$path_raiz_server/aristoteles/formularios";//Path en server hacia recursos de los formularios

	// Formulario puntos
	$url_generar_puntos = 		"$url_phps/puntos/generar.php"; 			//script para generar respuesta
	$url_template_puntos = 		"$url_phps/puntos/template.html"; 			//Archivo usado para generar respuesta
	$path_js_puntos =			"$path_aris_form/puntos/js";				//Carpeta donde guardar js's generados
	$url_img_ticket = 			"$url_aris_form/recursos/ticket.png";		//Icono
	$url_img_cross = 			"$url_aris_form/recursos/cross.png";		//Icono

	// Formulario partes
	$url_generar_partes = 		"$url_phps/partes/generar.php";
	//$url_template_partes = 		"$url_phps/partes/template.html";  // Deprecado ??
	$path_js_partes = 			"$path_aris_form/partes/js";				//Carpeta donde guardar js's generados
	$url_js_partes = 			"$url_aris_form/partes/js";					//URL desde donde incluir js's generados

	// Formulario Gymkana
	$url_timer_gym = 			"$url_aris_form/gymkana/js/timer.js";
	$url_template_gym = 		"$url_aris_form/gymkana/js/template.js";
	$url_gymkana_gym = 			"$url_aris_form/gymkana/js/gymkana.js";
	$url_form_gym = 			"$url_aris_form/gymkana/js/formulario.js";
/* 
IDEA GENERAL:
Dentro del servidor:
	Los archivos php podrán incluir a urls.php y acceder a las variables internas como $url_js_partes o $path_js_puntos.

Fuera del servidor:
	Javascript podrá acceder sólo a las URL's de urls.php incluyendo un archivo urls.json. Este archivo se genera a partir de las urls declaradas en urls.php, usando el archivo generarjson.php.
	El archivo generarjson.php NO debiera estar subido en la página, no es necesario. Lo que debe estar subido es efectivamente el json generado.


*/
?>