<?php
	/*****************************************************************
	 Este archivo tiene que estar en <raiz_del_sitio>/formularios_php/

	Acá se definen los directorios y urls de los recursos utilizados principalmente
	por los formularios. TODOS los paths y urls son ABSOLUTOS.

	Para utilizarlos en artículos y otras páginas html, agregar al inicio del artículo lo siguiente y modificar la primera línea: 
	´´´´´´´´´´´´´´´´´´´´´´´´
		<script src="<raíz del sitio>urls_globales/getURLS.js"></script>
		<script>
			//OBTENER URLS DESDE EL JSON
			var URLS = getURLS();
		</script>
	´´´´´´´´´´´´´´´´´´´´´´´´
	Para HOSTGATOR, la raíz del sitio es "/~morfo3/". Para otros casos suele ser sencillamente "/".
	Notar que la primera URL es la única que debe estar hardcodeada.
	IMPORTANTÍSIMO: Para que esto funcione, debe haberse ejecutado el archivo "generarjson.php" después de la última vez que se le hicieron cambios a este script "urls.php". Busque las instrucciones de cómo hacer esto en el README.
	Tras lo anterior, todas las url's están en el diccionario javascript URLS. Accesarlas como URLS["<nombre de la variable en urls.php>"].


	Para utilizarlos en un script .php, pegar lo siguiente al comienzo y modificar la primera línea:
	´´´´´´´´´´´´´´´´´´´´´´´´
	<?php
		$working_dir = "<directorio del archivo php actual>"
		$raiz_wwwserver = rtrim(str_replace($working_dir,"",shell_exec("pwd")));
		require_once("$raiz_wwwserver/urls_globales/urls.php");
	...?>
	´´´´´´´´´´´´´´´´´´´´´´´´
	El directorio actual debe ser relativo a la raíz del sitio (Ejemplo: "/aristoteles/formularios/puntos/php" si se está en /aristoteles/formularios/puntos/php/generar.php).
	Luego, accesar las variables directamente.


	¿Por qué no se pueden usar paths relativos? (lea sólo si quiere)
	------------------------------------------
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
	//!!!!!!!!!!!!!!$url_phps = 				"$protocolo$url_raiz_sitio/formularios_php";//URL hacia php's de formularios
	$url_aris_form = 			"$protocolo$url_raiz_sitio/aristoteles/formularios";//URL hacia recursos de los formularios
	$url_aris_gen = 			"$protocolo$url_raiz_sitio/aristoteles/generados";//URL hacia artículos generados
	$url_media = 				"$protocolo$url_raiz_sitio/aristoteles/media";
	// paths servidor

	//########### IMPORTANTE ############# CAMBIAR ESTA VARIABLE SEGÚN EL WEBSERVER
	$path_raiz_server = 		"/home/morfo3/public_html";					//CAMBIAR SEGÚN EL WEBSERVER
	$path_aris_form = 			"$path_raiz_server/aristoteles/formularios";//Path en server hacia recursos de los formularios
	$path_aris_gen = 			"$path_raiz_server/aristoteles/generados"; 	//Path en server hacia artículos generados
	$path_media = 				"$path_raiz_server/aristoteles/media";
	// Formulario puntos
	$path_js_puntos =			"$path_aris_gen/puntos/js";				//Carpeta donde guardar js's generados
	$url_js_puntos = 			"$url_aris_gen/puntos/js";				// url para pedir js's generados
	$url_generar_puntos = 		"$url_aris_form/puntos/php/generar.php"; 	//script para generar respuesta
	$url_template_puntos = 		"$url_aris_form/puntos/php/template.html"; 	//Archivo usado para generar respuesta
	$url_img_ticket = 			"$url_aris_form/puntos/imagenes/ticket.png";//Icono
	$url_img_cross = 			"$url_aris_form/puntos/imagenes/cross.png";	//Icono

	// Formulario partes
	$url_generar_partes = 		"$url_aris_form/partes/php/generar.php";
	//$url_template_partes = 		"$url_phps/partes/template.html";  // Deprecado ??
	$path_js_partes = 			"$path_aris_gen/partes/js";		//Carpeta donde guardar js's generados
	$url_js_partes = 			"$url_aris_gen/partes/js";		//URL desde donde incluir js's generados
	$url_js_template = 			"$url_aris_form/partes/js/template.js";		//js con template del formulario
	$url_js_runtime = 			"$url_aris_form/partes/js/runtime.js";		// runtime
	$url_js_partes_scr = 		"$url_aris_form/partes/js/partes.js";		// partes

	// Formulario Gymkana
	$url_timer_gym = 			"$url_aris_form/gymkana/js/timer.js";
	$url_template_gym = 		"$url_aris_form/gymkana/js/template.js";
	$url_gymkana_gym = 			"$url_aris_form/gymkana/js/gymkana.js";
	$url_form_gym = 			"$url_aris_form/gymkana/js/formulario.js";

	// Formularios Tutu-Tutu
	$url_thumb_tutu = 			"$url_media/imagenes/thumbs";
	$url_form_tutu = 			"$url_aris_form/tutututu/js/formulario.js";
	$url_tutu_tutu = 			"$url_aris_form/tutututu/js/tutututu.js";
?>