var startPos = 0;
var endPos = 0;
var word = '';
var answers = [];


function checkAnswers(){
	jQuery('#answerSummary').show();
	for(var i = 0; i < answers.length; i++){
		var respUser = jQuery('#resp_'+Number(i))[0].value;
		var respReal = answers[i];
		var correct = Number(validateAnswer(respUser, respReal));
		jQuery('#summary_'+Number(i))[0].value = respUser;
		
		if( correct ){
			jQuery('.form_'+Number(i)).removeClass('has-error').addClass('has-success');
			jQuery('.feedback_'+Number(i)).removeClass('glyphicon-remove').addClass('glyphicon-ok');
		}else{
			jQuery('.form_'+Number(i)).removeClass('has-success').addClass('has-error');
			jQuery('.feedback_'+Number(i)).removeClass('glyphicon-ok').addClass('glyphicon-remove');
		}
	}
}


function validateAnswer(respUser, respReal){
	  respUser = standardize(respUser); 
	  respReal = standardize(respReal); 
	  return extremeCompare(respUser, respReal);  
}

//takes the string to lower case and replaces weird characters by regular ordinary characters
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

jQuery( document ).ready(function(){

	var answerSummary = '<br><input type="button" class="btn btn-primary" onClick="checkAnswers();" value="Validar" /><br>';
	answerSummary += '<div id="answerSummary">';
	answerSummary += '<div class="form-group"><div class="input-group"><span class="input-group-addon">#</span><div class="form-inline">';
	answerSummary += '<input type="text" class="form-control" value="Respuesta correcta" disabled/>';
	answerSummary += '<input type="text" class="form-control" value="Respuesta usuario" disabled/></div></div></div><br />';
		
	while( true ){
		startPos = text.indexOf('<', startPos) + 1;
		endPos = text.indexOf('>',startPos);
		word = text.substring(startPos,endPos);
		
		if(word == "br")
			continue;
		
		if( startPos == 0 )
			break;
		
		var stringToReplacePre = '<div class="form-group form_'+answers.length+'"><div class="input-group"><span class="input-group-addon">'+(answers.length + 1)+'</span>';
		var stringToReplacePost = '<span class="feedback_'+answers.length+' glyphicon form-control-feedback" aria-hidden="true"></span></div></div>';
		var stringToReplace = stringToReplacePre+'<input type="text" class="form-control" id="resp_'+answers.length+'" />'+stringToReplacePost;
		
		startPos += stringToReplace.length;
		text = text.replace("<" + word + ">", stringToReplace);
		
		answerSummary += stringToReplacePre + '<div class="form-inline">';
		answerSummary += '<input type="text" class="form-control" value="'+word.trim()+'" disabled/>';
		answerSummary += '<input type="text" class="form-control" id="summary_'+answers.length+'" disabled/>';
		answerSummary += stringToReplacePost+'</div><br>';
		answers.push(word.trim());
	}
	answerSummary += '</div>';
	text+=answerSummary;
	jQuery('#answers').html(text);
	jQuery('#answerSummary').hide();
});