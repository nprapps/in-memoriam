$(document).ready(function() {
	/* VARS */
	var active_slide = 0;
	var slideshow_data = [];
	var slide_output = '';
	var num_slides = 0;
	var pop;

	/* ELEMENTS */
	var $s = $('#slideshow');
	var $sw = $('#slideshow-wrap');
	var $next = $('#next-btn');
	var $back = $('#back-btn');
	var $player = $('#pop-audio');


	/* LOAD PLAYER */
	$player.jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3: "FalconHood.mp3",
				oga: "FalconHood.ogg"
			}).jPlayer("pause");
		},
		play: function() { // To avoid both jPlayers playing together.
			$(this).jPlayer("pauseOthers");
		},
		ended: function (event) {
			$(this).jPlayer("pause");
		},
		swfPath: "js",
		supplied: "oga, mp3"
//		,errorAlerts:true
	});
	pop = Popcorn('#jp_audio_0');
		

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
				
				pop.code({
					start: v["cue_start"],
					end: v["cue_start"] + .5,
					onStart: function( options ) {         
						$.smoothScroll({
							direction: 'left',
							scrollElement: $s,
							scrollTarget: '#panel' + k
						});
						return false;
					},
					onEnd: function( options ) {}
				});

				
			});
			
			$s.append('<div id="slideshow-wrap">' + slide_output + '</div>');
		});
	}
	
	
	/* CLICK ACTIONS */
	$('#title-button').click(function() {
		$.smoothScroll({
			speed: 800,
			scrollTarget: $('#audio-navbar'),
			afterScroll: function() {
				$next.show();
				$back.show();
				$player.jPlayer("play", 0);
			}
		});
		return false;
	});

	$next.click(function() {
		if (active_slide < num_slides) {
			active_slide++;
			// jump to the next cuepoint
			var cue = slideshow_data[active_slide]['cue_start'];
			$player.jPlayer("play", slideshow_data[active_slide]['cue_start']);
		}
		return false;
	});

	$back.click(function() {
		if (active_slide > 0) {
			active_slide--;
			// jump to the previous cuepoint
			var cue = slideshow_data[active_slide]['cue_start'];
			console.log(active_slide,cue);
			$player.jPlayer("play", cue);
		}
		return false;
	});

	
	/* INIT */
	load_slideshow_data();

});