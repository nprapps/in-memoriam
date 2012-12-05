$(function() {
	/* VARS */
	var active_slide = 0;
	var slideshow_data = [];
	var slide_output = '';
	var num_slides = 0;
	
	/* ELEMENTS */
	var $s = $('#slideshow');
	var $sw = $('#slideshow-wrap');
	var $next = $('#next-btn');
	var $back = $('#back-btn');

	/* LOAD SLIDESHOW DATA FROM EXTERNAL JSON */
	function load_slideshow_data() {
		$.getJSON('deaths.json', function(data) {
			slideshow_data = data;
			$.each(slideshow_data, function(k,v) {
				var slide_info = '';
				
				slide_info += '<div id="panel' + k + '" class="panel" style="background-image: url(\'http://media.npr.org/assets/music/specials/memoriam2011/images/' + v["image"] + '\');">';
				slide_info += '<div class="panel-description">';
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
				
				num_slides++;
				
			});
			
			$s.append('<div id="slideshow-wrap">' + slide_output + '</div>');
			
			$next.click(function() {
				if (active_slide < num_slides) {
					active_slide++;
					var t = '#panel' + active_slide;
					$.smoothScroll({
						speed: 800,
						direction: 'left',
						scrollElement: $s,
						scrollTarget: t
					});
					return false;
				}
			});

			$back.click(function() {
				if (active_slide > 0) {
					active_slide--;
					var t = '#panel' + active_slide;
					$.smoothScroll({
						speed: 800,
						direction: 'left',
						scrollElement: $s,
						scrollTarget: t
					});
					return false;
				}
			});
		});
	}
	
	
	/* CLICK ACTIONS */
	$('#title-button').click(function() {
		$.smoothScroll({
			speed: 800,
			scrollTarget: '#slideshow',
			afterScroll: function() {
				$next.show();
				$back.show();
			}
//			afterScroll: function() {$("#pop-audio").jPlayer("play", 0);}
		});
		return false;
	});

	
	/* INIT */
	load_slideshow_data();

});