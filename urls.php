<?php
	/*****************************************************************
	 Este archivo tiene que estar en /home/morfo3/public_html/formularios_php/ 

	 Acá se definen los directorios y urls de los recursos utilizados principalmente
	 por los formularios. 

	 POR REVISAR:
	 	- Los directorios requeridos desde php pueden ser paths absolutos a los
	 	archivos. El problema de esto es que son dependientes del servidor donde 
	 	se encuentre la página (cada servidor nombra sus carpetas de forma distinta)
	 	Solución: Entregar a php urls a los archivos. Para eso hay que agregar excepciones
		 al archivo .htaccess que permita acceder a un directorio particular público.
		 Ojo que al hacer esto, todos pueden acceder directamente. Recordar refinar seguridad
		 de este paso, por ejemplo, exigiendo un referer.

	*/
	// urls web
	$raiz_phps_web = "./";//"/~morfo3/formularios_php/";
	$raiz_aris_form_web = "../aristoteles/formularios/";//"/~morfo3/aristoteles/formularios/";
	// directorios en el server
	$raiz_phps_server = "/home/morfo3/public_html/formularios_php/";
	$raiz_aris_form_server = "/home/morfo3/public_html/aristoteles/formularios/";
	// Formulario puntos
	$url_generar_puntos = $raiz_phps_web."puntos/generar.php";
	$url_template_puntos = $raiz_phps_server."puntos/template.html";
	$url_img_ticket = $raiz_aris_form_web."recursos/ticket.png";
	$url_img_cross = $raiz_aris_form_web."recursos/cross.png";

	echo getcwd()."\n";
	echo $_SERVER['DOCUMENT_ROOT']."\n";
	print_r ($_SERVER);

?>