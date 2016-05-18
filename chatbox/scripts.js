(function() {
	var form = document.getElementById('form');
	form.addEventListener('submit', addMessage, false);

	function addMessage(e) {
		var text = document.getElementById('text');
		var val = text.value;
		if(val != '') {
			mes = document.createElement('div');
			mes.className = 'mes';

			var id = youtube_parser(val);
			if(id != ''){
				var img = document.createElement('img');
				img.setAttribute('src', 'http://img.youtube.com/vi/' + id + '/default.jpg');
				mes.appendChild(img); 
				mes.innerHTML += '<br>';
			}
			var t = document.createTextNode(val);
			mes.appendChild(t);
			document.getElementById('messages').appendChild(mes);
			text.value = '';
			e.preventDefault();
		}
	}
	function youtube_parser(url){
		var video_id = url.split('v=')[1] || '';
		var ampersandPosition = video_id.indexOf('&');
		if(ampersandPosition != -1) {
		  video_id = video_id.substring(0, ampersandPosition);
		  
		}
		return video_id;
	}
})();