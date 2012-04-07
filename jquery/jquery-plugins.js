/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

function include_file(filename, filetype) {

	if(!filetype)
		var filetype = 'js'; //js default filetype

	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement((filetype == "js") ? 'script' : 'link');

	s.setAttribute('type',(filetype == "js") ? 'text/javascript' : 'text/css');

	if (filetype == "css")
		s.setAttribute('rel','stylesheet');

	s.setAttribute((filetype == "js") ? 'src' : 'href', filename);
	th.appendChild(s);

}

function redirect_to_page (url, timer) {
	setTimeout('self.location.href="'+url+'"', timer);
}

$(document).ready(function()
{

        if($(".jcalendar").length) {
            $.insert(WB_URL+"/include/jscalendar/calendar-system.css");
          }

        if($(".jsadmin").length) {
            $.insert(WB_URL+"/modules/jsadmin/backend.css");
          }
	//Add external link class to external links -
	$('a[href^="http://"]').filter(function() {
		//Compare the anchor tag's host name with location's host name
	    return this.hostname && this.hostname !== location.hostname;
	  }).addClass("external").attr("target", "_blank");

	/* Add internal link class to external links -   */
	$('a[href^="http://"]').filter(function() {
		//Compare the anchor tag's host name with location's host name
	    return this.hostname && this.hostname == location.hostname;
	  }).addClass("internal");

	$('form').attr('autocomplete', 'off');


   //startpage
   var starttime = 500;
   $('.textlayer').css('bottom', "-70px");
   $(".actionblock").hoverIntent(
   function(){
    $('.textlayer', this).animate({"bottom": "0px"}  ,starttime);
    $('.actionblocklink.colored ', this).fadeOut(starttime)
    
    },
    function(){
    $('.textlayer', this).animate({"bottom": "-70px"},starttime);
    $('.actionblocklink.colored ', this).fadeIn(starttime)
   });

  //page add
  if($('#addpages').length > 0){
    $('#addpages').hide();
    $('#content_container').prepend('<div id="addpage"><div id="togglebutton"></div><div id="addpageform"></div></div>');
    $('#addpage #addpageform').html($('#addpages').html());
    $('#addpage #addpageform').hide();
    
  }
  $('#togglebutton').click(function(){
    if($(this).hasClass('addvisible')){
          $('#addpage #addpageform').hide();
          $(this).removeClass('addvisible');
    }else{
          $('#addpage #addpageform').show();
          $(this).addClass('addvisible');
    }
  });
  
  //options Tabs
  $("#tabs").tabs({ cookie: { expires: 30 } });


  //buttons
  $('input[type="button"], input[type="submit"], input[type="reset"]').css("opacity", "0.8");
   var starttime = 200;
   $('input[type="button"], input[type="submit"], input[type="reset"]').hoverIntent(
   function(){
    $(this).fadeTo(starttime,1);
   },
    function(){
    $(this).fadeTo(starttime,0.8);
   });

});
