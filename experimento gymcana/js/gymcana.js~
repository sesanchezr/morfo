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

        if( respUser.toLowerCase() == respReal.toLowerCase() ){
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

        if( respUser.toLowerCase() == respReal.toLowerCase() ){
          agregarBuena();
          jQuery("#btn-blanco").removeClass('btn-default btn-danger').addClass('btn-success');
        }else{
          agregarMala();
          jQuery("#btn-blanco").removeClass('btn-default btn-success').addClass('btn-danger');
        }

        jQuery('#lbl-blanco').val(''+respReal);
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
      
      jQuery('#gymcana').hide();
      jQuery('#intro').show();
      jQuery('#titulo')[0].innerHTML = titulo;
      jQuery('#descripcion')[0].innerHTML = descripcion;
      
      