      var currentRow = 0;
      var numValid = 0;

      function addRow(){
        currentRow++;
        numValid++;
        var row = document.createElement('tr');
        row.id = 'row'+currentRow;
        document.getElementById('respuestas').appendChild(row);

        var thNum = document.createElement('th');
        thNum.innerHTML = ""+numValid;
        thNum.id = "td"+currentRow;
        row.appendChild(thNum);

        var tdRojo = document.createElement('td');
        row.appendChild(tdRojo);
        var lblRojo = document.createElement('input');
        lblRojo.type = "text";
        lblRojo.className= "form-control";
        lblRojo.placeholder = "Rojo";
        lblRojo.id = "respRojo"+currentRow;
        tdRojo.appendChild(lblRojo);

        var tdBlanco = document.createElement('td');
        row.appendChild(tdBlanco);
        var lblBlanco = document.createElement('input');
        lblBlanco.type = "text";
        lblBlanco.className= "form-control";
        lblBlanco.placeholder = "Blanco";
        lblBlanco.id = "respBlanco"+currentRow;
        tdBlanco.appendChild(lblBlanco);

        var tdEliminar = document.createElement('td');
        row.appendChild(tdEliminar);
        var btnEliminar = document.createElement('button');
        btnEliminar.type = "button";
        btnEliminar.value = currentRow;
        btnEliminar.onclick=function(){deleteRow(this.value);}; 
        btnEliminar.className = "btn btn-danger";
        btnEliminar.innerHTML = "Eliminar";
        tdEliminar.appendChild(btnEliminar);

        var valid = document.createElement('input');
        valid.type = "hidden";
        valid.id = "validRow"+currentRow;
        valid.value = ""+1;
        tdEliminar.appendChild(valid);

      }

      function deleteRow(id){
        jQuery('#row'+id).hide();
        jQuery('#validRow'+id).val(0+"");
        numValid--;
        for( i = Number(id)+1; i <= currentRow; i++ ){
          if( jQuery('#validRow'+i).val() == "1" ){
            jQuery('#td'+i)[0].innerHTML = ""+(jQuery('#td'+i)[0].innerHTML-1);
          }
        }
      }

      function generateCode(){
        var respuestasRojo = [];
        var respuestasBlanco = [];
        var nombreCarpeta =  jQuery('#nomCarpeta').val(); 
        var titulo =  jQuery('#titulo').val(); 
        var descripcion =  jQuery('#descripcion').val(); 
        

        for( i = 1; i <= currentRow; i++ ){
          if( jQuery('#validRow'+i).val() == "1" ){
            var toBeAddedRojo = '"'+jQuery('#respRojo'+i).val()+'"';
            var toBeAddedBlanco = '"'+jQuery('#respBlanco'+i).val()+'"';
            respuestasRojo.push(toBeAddedRojo);
            respuestasBlanco.push(toBeAddedBlanco);
          }
        }

        var res = getCodeTemplate();
        res += '&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"&gt;&lt;/script&gt;&lt;script src="js/timer.js"&gt;&lt;/script&gt;&lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"&gt;&lt;script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"&gt;&lt;/script&gt;';
        res += '&lt;script&gt;';
        res += 'var respuestasRojo=['+respuestasRojo+'];';
        res += 'var respuestasBlanco=['+respuestasBlanco+'];';
        res += 'var nombreCarpeta="'+nombreCarpeta+'";';
        res += 'var titulo="'+titulo+'";';
        res += 'var descripcion="'+descripcion+'";';
        res += '&lt;/script&gt;';

        res += '&lt;script src="js/gymcana.js"&gt;&lt;/script&gt;';
        
        jQuery('#codigo')[0].innerHTML = res;
      }

      function selectText() {
        var element = jQuery('#codigo')[0];
        if (document.selection) {
            var range = document.body.createTextRange(element);
            range.moveToElementText();
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(element);
            window.getSelection().addRange(range);
        }
      }

      for(i=1;i<=20;i++){
        addRow();
      }

      function getCodeTemplate(){
        var strVar  = "    &lt;div id=\"intro\" class=\"col-md-8 col-md-offset-2\"&gt;";
            strVar += "      &lt;div class=\"col-md-6 col-md-offset-3\"&gt;";
            strVar += "        &lt;h2 id=\"titulo\"&gt;&lt;\/h2&gt;";
            strVar += "        &lt;pre id=\"descripcion\"&gt;&lt;\/pre&gt;";
            strVar += "        &lt;br \/&gt;";
            strVar += "        &lt;button type=\"button\" class=\"btn btn-default\" onClick=\"startApp();\"&gt;Comenzar gymcana&lt;\/button&gt;";
            strVar += "      &lt;\/div&gt; ";
            strVar += "    &lt;\/div&gt;";
            strVar += "";
            strVar += "    &lt;div id=\"gymcana\" class=\"col-md-8 col-md-offset-2\"&gt;";
            strVar += "    &lt;div class=\"col-md-8\"&gt;";
            strVar += "      &lt;div class=\"row\"&gt;";
            strVar += "        &lt;div class=\"col-md-12\"&gt;";
            strVar += "          &lt;div id=\"mainContainer1\" class=\"morfoObject\"&gt;";
            strVar += "            ";
            strVar += "          &lt;\/div&gt;";
            strVar += "          &lt;div id=\"mainContainer2\" class=\"morfoObject\"&gt;";
            strVar += "            ";
            strVar += "          &lt;\/div&gt;";
            strVar += "          &lt;div id=\"mainContainer3\" class=\"morfoObject\"&gt;";
            strVar += "            ";
            strVar += "          &lt;\/div&gt;";
            strVar += "        &lt;\/div&gt;";
            strVar += "        &lt;div id=\"rojoAnswerContainer\" class=\"col-md-6 morfoAnswer\"&gt;";
            strVar += "          &lt;\/br&gt;";
            strVar += "          &lt;div class=\"form-group\"&gt;";
            strVar += "            &lt;div class=\"input-group\"&gt;";
            strVar += "            &lt;input id=\"respuestaRojo\" type=\"text\" class=\"form-control\" placeholder=\"Rojo\" \/&gt;";
            strVar += "            &lt;span class=\"input-group-addon\"&gt;";
            strVar += "              &lt;button type=\"button\" id=\"btn-rojo\" class=\"btn btn-default\" onClick=\"revisarRespuestaRojo();\"&gt;&lt;\/button&gt;";
            strVar += "            &lt;\/span&gt;";
            strVar += "            &lt;\/div&gt;";
            strVar += "            &lt;\/br&gt;";
            strVar += "            &lt;input type=\"text\" id=\"lbl-rojo\" class=\"form-control\" value=\"\" disabled\/&gt;";
            strVar += "          &lt;\/div&gt;";
            strVar += "        &lt;\/div&gt;";
            strVar += "        &lt;div id=\"blancoAnswerContainer\" class=\"col-md-6 morfoAnswer\"&gt;";
            strVar += "          &lt;\/br&gt;";
            strVar += "          &lt;div class=\"form-group\"&gt;";
            strVar += "            &lt;div class=\"input-group\"&gt;";
            strVar += "            &lt;input id=\"respuestaBlanco\" type=\"text\" class=\"form-control\" placeholder=\"Blanco\" \/&gt;";
            strVar += "            &lt;span class=\"input-group-addon\"&gt;";
            strVar += "              &lt;button type=\"button\" id=\"btn-blanco\" class=\"btn btn-default\" onClick=\"revisarRespuestaBlanco();\"&gt;&lt;\/button&gt;";
            strVar += "              &lt;\/span&gt;";
            strVar += "            &lt;\/div&gt;";
            strVar += "            &lt;\/br&gt;";
            strVar += "            &lt;input type=\"text\" id=\"lbl-blanco\" class=\"form-control\" value=\"\" disabled\/&gt;";
            strVar += "            ";
            strVar += "          &lt;\/div&gt;";
            strVar += "        &lt;\/div&gt;";
            strVar += "      &lt;\/div&gt;";
            strVar += " &lt;\/div&gt;";
            strVar += "    &lt;div class=\"col-md-4\"&gt;";
            strVar += "      &lt;div class=\"col-md-12\"&gt;";
            strVar += "        &lt;label&gt;Estaci&oacute;n:&lt;\/label&gt; &lt;input type=\"text\" id=\"estacionId\" value=\"1\" size=\"2\" disabled\/&gt;\/&lt;input type=\"text\" id=\"estacionMaxId\" value=\"\" size=\"2\" disabled\/&gt;";
            strVar += "      &lt;\/div&gt;";
            strVar += "      &lt;div class=\"col-md-12\"&gt;";
            strVar += "        &lt;\/br&gt;";
            strVar += "        &lt;label&gt;Buenas:&lt;\/label&gt; &lt;input type=\"text\" id=\"buenasId\" value=\"0\" size=\"2\" disabled\/&gt;&lt;\/br&gt;";
            strVar += "        &lt;label&gt;Malas:&lt;\/label&gt; &lt;input type=\"text\" id=\"malasId\" value=\"0\" size=\"2\" disabled\/&gt;";
            strVar += "      &lt;\/div&gt;  ";
            strVar += "      &lt;div class=\"col-md-12 estacionNav\"&gt;";
            strVar += "        &lt;\/br&gt;";
            strVar += "        &lt;div class=\"btn-group btn-group-vertical\" role=\"group\"&gt;";
            strVar += "          &lt;button type=\"button\" id=\"btn-nav-1\" class=\"btn-nav btn btn-default btn-lg\" onClick=\"showContainer(1);\"&gt;1&lt;\/button&gt;";
            strVar += "          &lt;button type=\"button\" id=\"btn-nav-2\" class=\"btn-nav btn btn-default btn-lg\" onClick=\"showContainer(2);\"&gt;2&lt;\/button&gt;";
            strVar += "          &lt;button type=\"button\" id=\"btn-nav-3\" class=\"btn-nav btn btn-default btn-lg\" onClick=\"showContainer(3);\"&gt;3&lt;\/button&gt;";
            strVar += "        &lt;\/div&gt;";
            strVar += "      &lt;\/div&gt;  ";
            strVar += "      &lt;\/hr&gt;";
            strVar += "      &lt;div class=\"col-md-12\"&gt;";
            strVar += "        &lt;\/br&gt;";
            strVar += "          &lt;button type=\"button\" id=\"btn-sgnt-estacion\" class=\"btn btn-default btn-lg\" onClick=\"nextEstacion();\"&gt;Siguiente estaci&oacute;n&lt;\/button&gt;";
            strVar += "      &lt;\/div&gt;";
            strVar += "      &lt;div class=\"col-md-4\"&gt;";
            strVar += "        &lt;\/br&gt;";
            strVar += "        &lt;div class=\"form-group form-group-lg\"&gt;";
            strVar += "          &lt;input type=\"text\" id=\"timer\" class=\"form-control\" value=\"60\" size=\"2\" disabled\/&gt;";
            strVar += "        &lt;\/div&gt;  ";
            strVar += "      &lt;\/div&gt;  ";
            strVar += "";
            strVar += "    &lt;\/div&gt;";
            strVar += "";
            strVar += "    &lt;\/div&gt;";

            return strVar;
        }
