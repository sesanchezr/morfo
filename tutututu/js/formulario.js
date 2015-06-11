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

function generateCode() {
	var textoTutututu = jQuery('#textoTutututu').val();
	textoTutututu = textoTutututu.trim();
	textoTutututu = textoTutututu.replace(/(?:\r\n|\r|\n)/g, '<br>');
	textoTutututu = textoTutututu.replace(/</g, '&lt;');
	textoTutututu = textoTutututu.replace(/>/g, '&gt;');
	var res = '&lt;script&gt;';
	res += 'var text="' + textoTutututu + '";';
	res += '&lt;/script&gt;';
	jQuery('#codigo')[0].innerHTML = res;
}