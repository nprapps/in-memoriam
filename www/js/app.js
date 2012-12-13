$(document).ready(function() {
	/* VARS */
	var active_slide = 0;
	// NOTE: We have more cuepoints than the length of the placeholder audio file we have
//	var audio_length = 660;
	var audio_length = 326; // TODO: Pass in dynamically somehow?
	var num_slides = 0;
	var slideshow_data = [];
	var pop; // Popcorn element
    var play_audio = !($.browser.msie === true && $.browser.version < 9);
    var slide_list_open = false;

	/* ELEMENTS */
    var $main_content = $('#main-content');
	var $s = $('#slideshow');
	var $slide_wrap = $('#slideshow-wrap');
	var $slide_nav = $('#slide-nav');
	var $next = $('#next-btn');
	var $back = $('#back-btn');
    var $audio_nav = $('#audio-navbar');
	var $audio_branding = $audio_nav.find('.branding');
    var $audio = $('#audio');
	var $progress = $audio.find('.jp-progress-container');
	var $player = $('#pop-audio');
	var $slide_list = $('#list-nav');
	var $slide_browse_btn = $('#browse-btn');
	var $titlecard = $('#titlecard');
	var $panels;
	var $panel_images;

    if (!play_audio) {
        $audio.hide(); 
    }
    
    slide_list_toggle('close');
    
    if (play_audio) {
        /* LOAD AUDIO PLAYER */
        $player.jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: "http://stage-apps.npr.org/in-memoriam/audio/FalconHood.mp3",
                    oga: "http://stage-apps.npr.org/in-memoriam/audio/FalconHood.ogg"
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
        // associate jPlayer with Popcorn
        pop = Popcorn('#jp_audio_0');
    }

    function scroll_to_slide(id) {
        /*
         * Scroll horizontally to the correct slide position.
         */
        $.smoothScroll({
            direction: 'left',
            scrollElement: $s,
            scrollTarget: '#panel' + id,
            afterScroll: function() {
                $('#s' + id).addClass('active').siblings('li').removeClass('active');
            }
        });
        active_slide = id;

        return false;
    }

    function play_slide(id) {
        /*
         * Play a slide at the correct audio cue.
         */
        if (play_audio) {
            $player.jPlayer('play', slideshow_data[id]['cue_start']);
        } else {
            scroll_to_slide(id);
        }
        console.log("play slide: " + id + " | " + slideshow_data[id]['cue_start']);
    }

	/* LOAD SLIDESHOW DATA FROM EXTERNAL JSON */
	function load_slideshow_data() {
		var slide_output = '';
		var audio_output = '';
        var browse_output = '';

		$.getJSON('deaths.json', function(data) {
			slideshow_data = data;
			$.each(slideshow_data, function(k, v) {
			
				var slide_position = (v["cue_start"] / audio_length) * 100;

				// Markup for this slide and its entry in the slide nav
				// via Underscore template / JST
                var context = v;
                context['id'] = k;

                if ($main_content.width() <= 480) {
                    context['image_width'] = 480;
                } else if ($main_content.width() <= 979) {
                    context['image_width'] = 979;
                } else {
                    context['image_width'] = 1200;
                }

                context['position'] = slide_position;
				slide_output += JST.slide(context);
				audio_output += JST.slidenav(context);
				browse_output += JST.browse(context);
				
				num_slides++;
				
                if (play_audio) {
                    // Popcorn cuepoint for this slide
                    pop.code({
                        start: v["cue_start"],
                        end: v["cue_start"] + .5,
                        onStart: function( options ) {         
                            scroll_to_slide(k); 

                            return false;
                        },
                        onEnd: function( options ) {}
                    });
                }
			});
			
			$slide_wrap.append(slide_output);
			$slide_nav.append(audio_output);
			
			$slide_nav.find('.slide-nav-item').click( function() {
				var id = $(this).attr('data-id');

                if ($player.data().jPlayer.status.paused) {
                    scroll_to_slide(id);
                    $player.jPlayer('pause', slideshow_data[id]['cue_start']);
                } else {
                    play_slide(id);
                }
			});

			$slide_list.append(browse_output);
            $slide_list.find('a').click(function() {
                play_slide($(this).attr('data-id'));
                slide_list_toggle('close');
            });
            
            $panels = $slide_wrap.find('.panel');
            $panel_images = $panels.find('.panel-bg');

            resize_slideshow();
		});
	}
	
	
	/* RESIZE SLIDESHOW PANELS BASED ON SCREEN WIDTH */
	function resize_slideshow() {
		console.log("resize_slideshow");
		console.log($main_content.width());
		var new_width = $main_content.width();
		var new_height = $(window).height() - $audio.height();
		var height_43 = Math.ceil(($main_content.width() * 3) / 4);

		if (new_width <= 480) {
			new_height = 600;
		} else if (new_height > height_43) { 
			// image ratio can go no larger than 4:3
			new_height = height_43;
		}

		$s.width(new_width + 'px').height(new_height + 'px');
		$slide_wrap.width((num_slides * new_width) + 'px').height(new_height + 'px');
		$panels.width(new_width + 'px').height(new_height + 'px');
		$titlecard.height(new_height + 'px');

		if (new_width <= 480) {
			$panel_images.height((Math.ceil(new_width * 9) / 16) + 'px');
		} else {
			$panel_images.height('100%');
		}
		
		// reset navbar position
		var navpos = $audio_nav.position;
		$slide_list.css('top',navpos.top + $audio_nav.height());
	}
	$(window).resize(resize_slideshow);


	/* CLICK ACTIONS */
	$('#title-button').click(function() {
		$.smoothScroll({
			speed: 800,
			scrollTarget: $('#audio-navbar'),
			afterScroll: function() {
                play_slide(0);
			}
		});
		return false;
	});
	
	$audio_branding.click(function() {
		if (play_audio) {
            $player.jPlayer('stop');
        }
    	$.smoothScroll({
			speed: 800,
			scrollTarget: $('#top')
		});
		return false;
	});

	function slide_list_toggle(mode) {
		if (slide_list_open || mode == 'close') {
			$slide_list.hide();
			$slide_browse_btn.removeClass('active');
			slide_list_open = false;
		} else if (!slide_list_open || mode == 'open') {
			$slide_list.show();
			$slide_browse_btn.addClass('active');
			slide_list_open = true;
		}
	}
	$slide_browse_btn.on('click', function(e){
		slide_list_toggle()
	});
	$slide_browse_btn.on('mouseenter', function(e){
		slide_list_toggle('open')
	});
	$slide_list.on('mouseleave', function(e){
		slide_list_toggle('close')
	});
	
	function goto_next_slide() {
		if (active_slide < num_slides) {
            var id = active_slide + 1;

            if ($player.data().jPlayer.status.paused) {
                scroll_to_slide(id);
                $player.jPlayer('pause', slideshow_data[id]['cue_start']);
            } else {
                play_slide(id);
            }
		}
		return false;
	}
    $next.click(goto_next_slide);

	function goto_previous_slide() {
		if (active_slide > 0) {
            var id = active_slide - 1;

            if ($player.data().jPlayer.status.paused) {
                scroll_to_slide(id);
                $player.jPlayer('pause', slideshow_data[id]['cue_start']);
            } else {
                play_slide(id);
            }
		}
		return false;
	}
	$back.click(goto_previous_slide);

    $(document).keydown(function(ev) {
        if (ev.which == 37) {
            goto_previous_slide();
        } else if (ev.which == 39) {
            goto_next_slide();
        } else if (ev.which == 32) {
            if ($player.data().jPlayer.status.paused) {
                $player.jPlayer('play');
            } else {
                $player.jPlayer('pause');
            }
        }
        return false;
    });


	/* INIT */
	load_slideshow_data();

});
