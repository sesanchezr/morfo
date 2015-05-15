function getCodeTemplate(){
	
	var strVar="";
	strVar += "<style type=\"text\/css\">";
	strVar += "	  .bigImage{";
	strVar += "	    min-width: 850px;";
	strVar += "	  }";
	strVar += "	  .bigBody{";
	strVar += "	    min-width: 900px;";
	strVar += "	  }";
	strVar += "	  .smallImage{";
	strVar += "	    min-width: 450px;";
	strVar += "	  }";
	strVar += "	  .smallBody{";
	strVar += "	    min-width: 500px;";
	strVar += "	  }";
	strVar += "	<\/style>";
	strVar += "	<div class=\"row\">";
	strVar += "	    <div class=\"col-md-12\">";
	strVar += "	      <div class=\"col-md-12\">";
	strVar += "	      	<div id=\"navBar\" class=\"btn-group \" role=\"group\"><\/div>    ";
	strVar += "	      <\/div>";
	strVar += "	      <div id=\"puntoscontainer\" class=\"row\" >";
	strVar += "	        <div class=\"col-md-12\" id=\"smallImage\">";
	strVar += "	          <div class=\"col-md-12\">";
	strVar += "	            <button id=\"zoomin\" class=\"btn btn-primary\" onClick=\"expandFigure();\">";
	strVar += "	              <span class=\"glyphicon glyphicon-zoom-in\" aria-hidden=\"true\"><\/span> Zoom in";
	strVar += "	            <\/button><\/div>";
	strVar += "	          <div id=\"smallSwiffy\" class=\"col-md-12\"><\/div>";
	strVar += "	        <\/div>";
	strVar += "	        <div class=\"col-md-12\" id=\"bigImage\">";
	strVar += "	          <div class=\"col-md-12\">";
	strVar += "	            <button id=\"zoomout\" class=\"btn btn-primary\" onClick=\"contractFigure();\">";
	strVar += "	              <span class=\"glyphicon glyphicon-zoom-out\" aria-hidden=\"true\"><\/span> Zoom out";
	strVar += "	            <\/button><\/div>";
	strVar += "	          <div id=\"bigSwiffy\" class=\"col-md-12\"><\/div>";
	strVar += "	        <\/div>";
	strVar += "	      <\/div>";
	strVar += "	    <\/div>";
	strVar += "	    ";
	strVar += "  	<\/div>";

	
	strVar = strVar.replace(/(?:\r\n|\r|\n)/g, '<br />');
	//strVar = strVar.replace(/</g, '&lt;');
	//strVar = strVar.replace(/>/g, '&gt;');
	
	return strVar;
}