(function(){ window.JST || (window.JST = {}) 
window.JST["slide"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="panel'+
( id )+
'" class="panel" style="background-image: url(\'http://media.npr.org/assets/music/specials/memoriam2011/images/'+
( image )+
'\');">\n    <div class="panel-description">\n        <h2>'+
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

})();