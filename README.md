# Morfo 3
-------------------

Morfo 3 es el proyecto que renueva la página web www.morfo.cl para los estudiantes de medicina de la Universidad de Chile.
Con este proyecto se espera, primeramente:

* Disminuir tiempo de respuesta del sitio
* Aumentar resistencia a alta concurrencia de usuarios (~300)
* 

Metas secundarias son:
* Mejorar usabilidad
* 

Actualmente el sitio está implementado usando el administrador de contenidos Joomla 3.

### URLS, paths y portabilidad
La implementación actual es como sigue:
	Los scripts internos del servidor usan el archivo **urls.php** para obtener sus urls
	Las páginas usan el script __getURLS()__ para obtener las urls desde el archivo **urls.json**.
	El archivo **urls.json** debe ser generado usando manualmente el script **generarjson.php** poniendo en el navegador:
	http(s)://<host>/<user siesque tiene>/formularios_php/generarjson.php
	Luego, el json queda generado.
	NO es necesario generarlo nunca más, excepto cuando se editen las urls en el archivo urls.php.
	La única URL hardcodeada que debiera haber en cada artículo (formulario) es la necesaria para incluir la función __getURLS()__ desde el archivo **getURLS.js**.

	Hasta ahora está implementado esto sólo para formulario Partes. Pronto se portará al resto.