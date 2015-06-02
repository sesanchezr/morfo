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
La implementación actual de las urls y dependencias está hecha en base al archivo **urls.php**. Este archivo posee la declaración de las direcciones internas y externas accesadas por elementos del sitio web, principalmente aplicaciones propias, ajenas al CMS. 
Para el funcionamiento de esta implementación, el sitio confía en el funcionamiento del complemento **Sourcerer** para Joomla. Este complemento revisa los archivos, busca la existencia de los tags ´{source}{/source}´ y ejecuta el código php que encuentre dentro.
Si se planea mover el sitio a otro CMS, es necesario tomar en cuenta este punto.