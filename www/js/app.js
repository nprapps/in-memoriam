$(function() {
	/* VARS */
	var slideshow_data = [];
	var slide_output = '';
	
	/* ELEMENTS */
	var $s = $('#slideshow');

	/* LOAD SLIDESHOW DATA FROM EXTERNAL JSON */
	function load_slideshow_data() {
		$.getJSON('deaths.json', function(data) {
			slideshow_data = data;
			$.each(slideshow_data, function(k,v) {
				var slide_info = '';
				
				slide_info += '<div id="slide' + k + '" class="slideshow_item" style="background-image: url(\'http://media.npr.org/assets/music/specials/memoriam2011/images/' + v["image"] + '\');">';
				slide_info += '<div class="slide_description">';
				slide_info += '<h2>' + v["artist_first_name"] + ' ' + v["artist_last_name"] + '</h2>';
				slide_info += '<p class="dates">' + v["dob"] + '-' + v["dod"] + '</p>';
				slide_info += '<p class="desc">' + v["known_as"] + '</p>';
				if (v["full_obit"].length > 2) {
					slide_info += '<p class="npr-obit">&gt; <a href="http://www.npr.org/templates/story/story.php?storyId=' + v["full_obit"] + '" target="_blank">NPR Remembrance</a></p>';
				}
				if (v["artist_page_id"].length > 2) {
					slide_info += '<p class="npr-artist">&gt; <a href="http://www.npr.org/artists/' + v["artist_page_id"] + '" target="_blank">NPR Artist Page</a></p>';
				}
				slide_info += '<p class="now-playing">Now Playing: ' + v["song_name"] + '</p>';
				slide_info += '<p class="photo-credit">Photo: ' + v["photo_credit"] + '</p>';
				
				slide_info += '</div>'; // end .slide_description
				slide_info += '</div>'; // end .slideshow_item
				
				slide_output += slide_info;
				
			});
			
			$s.append('<div id="slideshow_wrap">' + slide_output + '</div>');
		});
	}
	
	/* INIT */
	load_slideshow_data();

});