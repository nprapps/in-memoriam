(function(){ window.JST || (window.JST = {}) 
window.JST["browse"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="browse-artist">\n    <a href="javascript:;" data-id="'+
( id )+
'">\n        <img src="img/mugs/'+
( image_name )+
'_120.jpg" />\n        <h2>'+
( artist_first_name )+
' '+
( artist_last_name )+
'</h2>\n    </a>\n</div>\n\n';
}
return __p;
};

window.JST["slide"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="panel'+
( id )+
'" class="panel">\n\t<div class="panel-bg" style="background-image: url(\'img/mugs/'+
( image_name )+
'_'+
( image_width )+
'.jpg\');"> </div>\n    <div class="panel-description">\n        <h2>'+
( artist_first_name )+
' '+
( artist_last_name )+
'</h2>\n        <p class="dates">'+
( dob )+
'-'+
( dod )+
'</p>\n        <p class="desc">'+
( known_as )+
'</p>\n        \n        ';
 if (full_obit.length > 2) { 
;__p+='\n        <p class="npr-obit">&gt; <a href="http://www.npr.org/templates/story/story.php?storyId='+
( full_obit )+
'" target="_blank">NPR Remembrance</a></p>\n        ';
 } 
;__p+='\n        \n        ';
 if (artist_page_id.length > 2) { 
;__p+='\n        <p class="npr-artist">&gt; <a href="http://www.npr.org/artists/'+
( artist_page_id )+
'" target="_blank">NPR Artist Page</a></p>\n        ';
 } 
;__p+='\n        \n        <p class="now-playing">Now Playing: '+
( song_name )+
'</p>\n        <p class="photo-credit">Photo: '+
( photo_credit )+
'</p>\n    </div>\n</div>\n\n';
}
return __p;
};

window.JST["slidenav"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<li id="s'+
( id )+
'" class="slide-nav-item" style="left: '+
( position )+
'%" title="'+
( artist_first_name )+
' '+
( artist_last_name )+
'" data-id="'+
( id )+
'">\n\t<span>'+
( artist_first_name )+
' '+
( artist_last_name )+
'</span>\n</li>';
}
return __p;
};

})();