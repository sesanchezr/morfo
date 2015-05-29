<?php
	/*****************************************************************
	 Este archivo tiene que estar en $raiz_del_sitio/formularios_php/

	 Acá se definen los directorios y urls de los recursos utilizados principalmente
	 por los formularios. TODOS los paths y urls son ABSOLUTOS.

	Para utilizarlos, agregar al inicio del artículo del formulario lo siguiente: 
	´´´´´´´´´´´´´´´´´´´´´´´´
	{source}<?php 
		// ESTA VARIABLE HAY QUE CAMBIARLA DEPENDIENDO DEL SERVIDOR EN EL QUE ESTÁ MORFO
		$raiz_wwwserver = "/home/morfo3/public_html";
		require_once("$raiz_wwwserver/formularios_php/urls.php");
	?>{/source}
	´´´´´´´´´´´´´´´´´´´´´´´´
	
	Para utilizarlos en un archivo .php, omitir los tags {source}{/source} .



	 POR REVISAR:
	 	- Los directorios requeridos desde php pueden ser paths absolutos a los
	 	archivos. El problema de esto es que son dependientes del servidor donde 
	 	se encuentre la página (cada servidor nombra sus carpetas de forma distinta)
	 	Solución: Entregar a php urls a los archivos. Para eso hay que agregar excepciones
		 al archivo .htaccess que permita acceder a un directorio particular público.
		 Ojo que al hacer esto, todos pueden acceder directamente. Recordar refinar seguridad
		 de este paso, por ejemplo, exigiendo un referer.

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
	$path_raiz_server =			"/home/morfo3/public_html";					//Path a raíz del sitio. CAMBIAR DEPENDIENDO DEL SERVIDOR DONDE SE ESTÉ.
	$path_phps = 				"$path_raiz_server/formularios_php";		//Path en server hacia php's de formularios
	$path_aris_form = 			"$path_raiz_server/aristoteles/formularios";//Path en server hacia recursos de los formularios

	// Formulario puntos
	$url_generar_puntos = 		"$url_phps/puntos/generar.php"; 			//script para generar respuesta
	//$path_template_puntos = 	"$path_phps/puntos/template.html"; 			//Archivo usado para generar respuesta
	$url_template_puntos = 		"$url_phps/puntos/template.html"; 			//Archivo usado para generar respuesta
	$path_js_puntos =			"$path_aris_form/puntos/js";			//Carpeta donde guardar js's generados
	$url_img_ticket = 			"$url_aris_form/recursos/ticket.png";		//Icono
	$url_img_cross = 			"$url_aris_form/recursos/cross.png";		//Icono
?>