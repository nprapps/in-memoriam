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
		supplied: "oga, mp3",
		//errorAlerts:true
	});
	pop = Popcorn('#jp_audio_0');
		

	/* LOAD SLIDESHOW DATA FROM EXTERNAL JSON */
	function load_slideshow_data() {
		$.getJSON('deaths.json', function(data) {
			slideshow_data = data;
			$.each(slideshow_data, function(k,v) {
                var slide_info = JST.slide({ k: k, v: v });
				
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

			$next.click(function() {
				if (active_slide < num_slides) {
					active_slide++;
					// jump to the next cuepoint
					var cue = slideshow_data[active_slide]['cue_start']
					console.log(active_slide,cue);
					$player.jPlayer("play", cue);
					/*
					$.smoothScroll({
						speed: 800,
						direction: 'left',
						scrollElement: $s,
						scrollTarget: '#panel' + active_slide,
						afterScroll: function() {
							$player.jPlayer("play", slideshow_data[active_slide]['cue_start']);
						}
					});
					*/
				}
				return false;
			});

			$back.click(function() {
				if (active_slide > 0) {
					active_slide--;
					// jump to the previous cuepoint
					var cue = slideshow_data[active_slide]['cue_start']
					console.log(active_slide,cue);
					$player.jPlayer("play", cue);
					/*
					$.smoothScroll({
						speed: 800,
						direction: 'left',
						scrollElement: $s,
						scrollTarget: '#panel' + active_slide,
						afterScroll: function() {
							$player.jPlayer("play", slideshow_data[active_slide]['cue_start']);
						}
					});
					*/
				}
				return false;
			});
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

	
	/* INIT */
	load_slideshow_data();

});
