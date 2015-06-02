function getURLS(){
	var URLS = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': '/~morfo3/formularios_php/urls.json',
        'dataType': "json",
        'success': function (data) {
            URLS = data;
        }
    });
    return URLS;
}