      function showestacion(id){
        jQuery(".morfoObject").html("");
        loadAllImages(id);
        
        showContainer(1);
        cleanAnswerRojo();
        cleanAnswerBlanco();
        jQuery("#mainContainer1").show();
        jQuery("#estacionId").val(""+id);
      }
      
      function loadAllImages(estacionId){
    	  jQuery('.btn-nav').show();
    	  loadImage(estacionId, 1);
    	  loadImage(estacionId, 2);
    	  loadImage(estacionId, 3);
      }
      
      function loadImage(estacionId, imageId){
    	  var img = jQuery('<img class="img-responsive">');
    	  img.attr('src', nombreCarpeta+'/'+estacionId+'-'+imageId+'.jpg');
    	  img.error(function() { jQuery('#btn-nav-'+imageId).hide(); })
    	  img.appendTo('#mainContainer'+imageId);
      }
      
      function cleanAnswer(button, respuesta, label){
    	  button.removeClass('btn-default btn-danger btn-success active').addClass('btn-default');
    	  respuesta.val("");
    	  label.val("");
      }
      
      function cleanAnswerRojo(){
    	  cleanAnswer(jQuery('#btn-rojo'), jQuery('#respuestaRojo'), jQuery('#lbl-rojo'));
      }
      
      function cleanAnswerBlanco(){
    	  cleanAnswer(jQuery('#btn-blanco'), jQuery('#respuestaBlanco'), jQuery('#lbl-blanco'));
      }

      function setSelected(id){
        jQuery(".btn-nav").removeClass("active");
        jQuery("#btn-nav-"+id).addClass("active");
      }

      function showContainer(containerId){
        jQuery(".morfoObject").hide();
        jQuery("#mainContainer"+containerId).show();
        setSelected(containerId);
      }

      function nextEstacion(){
        revisarRespuestaRojo();
        revisarRespuestaBlanco();
        if( currentestacion < maxestacion ){
          currentestacion++;
          showestacion(currentestacion);
          tiempoPrueba = true;
          count = pruebaTime+1;
        }
        if( currentestacion >= maxestacion ){
          jQuery('#btn-sgnt-estacion').addClass("active");
        }
      }

      function agregarBuena(){
        buenas++;
        jQuery('#buenasId').val(buenas);
      }

      function agregarMala(){
        malas++;
        jQuery('#malasId').val(malas);
      }

      function revisarRespuestaRojo(){
        if( jQuery('#btn-rojo').hasClass('active') )
          return;

        var index = currentestacion - 1;
        var respUser = jQuery("#respuestaRojo").val()+"";
        var respReal = respuestasRojo[index]+"";
        jQuery('#btn-rojo').addClass("active");

        if( validateAnswer(respUser, respReal) ){
          agregarBuena();	  
          jQuery("#btn-rojo").removeClass('btn-default btn-danger').addClass('btn-success');
        }else{
          agregarMala();
          jQuery("#btn-rojo").removeClass('btn-default btn-success').addClass('btn-danger');
        }

        jQuery('#lbl-rojo').val(''+respReal);
      }

      function revisarRespuestaBlanco(){
        if( jQuery('#btn-blanco').hasClass('active') )
          return;

        var index = currentestacion - 1;
        var respUser = jQuery("#respuestaBlanco").val()+"";
        var respReal = respuestasBlanco[index]+"";
        jQuery('#btn-blanco').addClass("active");

        if( validateAnswer(respUser, respReal) ){
          agregarBuena();
          jQuery("#btn-blanco").removeClass('btn-default btn-danger').addClass('btn-success');
        }else{
          agregarMala();
          jQuery("#btn-blanco").removeClass('btn-default btn-success').addClass('btn-danger');
        }

        jQuery('#lbl-blanco').val(''+respReal);
      }

	  function validateAnswer(respUser, respReal){
		  respUser = standardize(respUser); 
		  respReal = standardize(respReal); 
		  return extremeCompare(respUser, respReal);  
	  }

	  // takes the string to lower case and replaces weird characters by regular ordinary characters
	  function standardize(s){
	      var r = s.toLowerCase();
	      non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
	      for (i in non_asciis) 
			  r = r.replace(new RegExp(non_asciis[i], 'g'), i); 
	      return r;
	  }
	  
	  // compares both answer ingnoring the order of the words
	  function extremeCompare(answ1, answ2){
		  var answer1 = answ1.split(" ");
		  var answer2 = answ2.split(" "); 
		  if (answer1.length != answer2.length)
			  return false; 
		  
		  var l = answer1.length; 
		  
		  var words = []; 
		  for (i=0; i<l; i++)
			  words[i] = false; 
 
		  for (i=0; i<l; i++)
		  	for(j=0; j<l; j++)
		    	if (answer1[i] == answer2[j]){
		        	words[i] = true; 
		         	break; 
				}
				
		  var ret = true; 
		  for (i=0; i<l; i++)
			  ret = ret && words[i]; 
 
		  return ret; 
	  }

      function startApp(){
        timer.set({ time : 1000, autostart : true });
        jQuery("#estacionMaxId").val(""+maxestacion);
        showestacion(currentestacion);
        count = pruebaTime;
        jQuery('#intro').hide();
        jQuery('#gymcana').show();
      }

      function reiniciar(){
        currentestacion = 1;
        buenas = 0;
        malas = 0;
        count = pruebaTime;
        tiempoPrueba = true;
        cleanAnswerRojo();
        cleanAnswerBlanco();
        jQuery('#btn-sgnt-estacion').removeClass("active");
        jQuery('#gymcana').hide();
        jQuery('#intro').show();
        jQuery('#malasId').val(malas);
        jQuery('#buenasId').val(buenas);
      }

      var currentestacion = 1;
      var maxestacion = respuestasRojo.length;
      var buenas = 0;
      var malas = 0;
      var pruebaTime = 60;
      var extraTime = 6;
      var count = pruebaTime;
      var tiempoPrueba = true;
      var timer = jQuery.timer(function() {
        count--;
        if( count >= 0 )
          jQuery('#timer').val(count);
        if( count <= 0 ){
          if( tiempoPrueba ){
            tiempoPrueba = false;
            count = extraTime+1;
            revisarRespuestaRojo();
            revisarRespuestaBlanco();
          }else{
            nextEstacion();
          }
        }
      });
      
      jQuery('body').css({minWidth: '750px'});
      
      viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=1');
      
      jQuery('#gymkanaContainer')[0].innerHTML = getCodeTemplate();
      
      jQuery('#gymcana').hide();
      jQuery('#intro').show();
      jQuery('#titulo')[0].innerHTML = titulo;
      jQuery('#descripcion')[0].innerHTML = descripcion;
