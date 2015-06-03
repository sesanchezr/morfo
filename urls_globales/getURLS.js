function getURLS(){
	var URLS = null;
    jQuery.ajax({
        'async': false,
        'global': false,
        'url': '/~morfo3/urls_globales/urls.json',
        'dataType': "json",
        'success': function (data) {
            URLS = data;
        }
    });
    return URLS;
}