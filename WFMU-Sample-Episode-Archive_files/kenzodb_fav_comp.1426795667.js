//7/29/2012 12:24AM (C) 2012-13 Ken Garson. v3/29/13 / 5/8/13
var KDBFav={favorites_loaded_flag:!1,icon_states_already_set_flag:!1,icon_states_populating_flag:!1,dom_ready_flag:!1,favorites:{},menu_enabled_flag:!0,max_ajax_retry_attempts:3,ajax_retry_delay_ms:3E3,load_icon_states_poll_ms:3E4,signin_change_check_poll_delay_ms:5E3,pop_element:void 0,pop_element_is_error_flag:!1,pop_pixels_per_line:17,pop_pixels_extra_per_big_line:9,cookie_name:"kdbain",was_signed_out_flag:!1,icon_states_last_load_ts:0,initialize:function(a,b,c){KDBFav.urls=a;KDBFav.page_type=
b;KDBFav.page_id=c;KDBFav.initialize_pop();KDBFav.load_icon_states();jQuery(document).ready(function(){KDBFav.dom_ready_flag=!0;KDBFav.set_icon_states_if_ready()})},future_load_icon_states_timeout:null,schedule_future_load_icon_states:function(){KDBFav.future_load_icon_states_timeout&&clearTimeout(KDBFav.future_load_icon_states_timeout);KDBFav.future_load_icon_states_timeout=setTimeout(KDBFav.load_icon_states,KDBFav.load_icon_states_poll_ms)},load_icon_states:function(){var a=function(){setTimeout(KDBFav.load_icon_states,
KDBFav.ajax_retry_delay_ms)};KDBFav.future_load_icon_states_timeout&&clearTimeout(KDBFav.future_load_icon_states_timeout);jQuery.ajax({url:KDBFav.urls.controller+"?action=get_icon_states_from_server",dataType:"json",data:{myurl:KDBFav.urls.myurl,page_type:KDBFav.page_type,page_id:KDBFav.page_id,last_load_ts:KDBFav.icon_states_last_load_ts},xhrFields:{withCredentials:!0},success:function(b){if(!b||!b.status)b={status:"empty"};switch(b.status){case "error":a();break;case "again":a();break;case "noop":KDBFav.icon_states_already_set_flag=
!0;KDBFav.schedule_future_load_icon_states();break;case "content":KDBFav.favorites=b.data,KDBFav.icon_states_last_load_ts=b.last_mod_ts;case "empty":KDBFav.favorites_loaded_flag=!0,KDBFav.set_icon_states_if_ready(),KDBFav.schedule_future_load_icon_states()}},error:function(){a()}})},set_icon_states_if_ready:function(){!KDBFav.icon_states_populating_flag&&(KDBFav.dom_ready_flag&&KDBFav.favorites_loaded_flag)&&(KDBFav.icon_states_populating_flag=!0,jQuery(".KDBFavIcon").each(KDBFav.set_icon_visible_state_to_known_state),
KDBFav.icon_states_already_set_flag=!0,KDBFav.pop_close_error({fade:!0}),KDBFav.icon_states_populating_flag=!1,KDBFav.schedule_next_check_for_signin_change())},set_icon_visible_state_to_known_state:function(a,b){var c=KDBFav.get_type_and_id_from_element(b);KDBFav.set_icon_favorite_state(b,KDBFav.is_fav(c.type,c.id));KDBFav.restart_refresh_clock()},get_type_and_id_from_element:function(a){a=a.id.split("-");return{type:a[0].slice(3),id:fav_id=a[1]}},set_icon_busy:function(a,b){b?(jQuery(a).find("img").attr("src",
KDBFav.urls.fav_busy_icon),KDBFav.set_icon_title(a,"Busy...")):KDBFav.set_icon_visible_state_to_known_state(0,a)},is_icon_busy:function(a){return jQuery(a).find("img").attr("src")===KDBFav.urls.fav_busy_icon},set_icon_favorite_state:function(a,b){jQuery(a).find("img").attr("src",b?KDBFav.urls.fav_set_icon:KDBFav.urls.fav_unset_icon);KDBFav.set_icon_title(a,"Click for options")},set_icon_title:function(a,b){jQuery(a).find("a").attr("title",b)},fav_icon_clicked:function(a,b){a.preventDefault?a.preventDefault():
a.returnValue=!1;KDBFav.restart_refresh_clock();KDBFav.pop_close();KDBFav.icon_states_already_set_flag?KDBFav.is_icon_busy(b)||(KDBFav.set_icon_title(b,""),KDBFav.menu_enabled_flag?KDBFav.pop_favorite_menu(b):KDBFav.fav_icon_toggle(b)):KDBFav.pop_not_ready(b)},initialize_pop:function(){jQuery(".KDBFavPop").dialog({autoOpen:!1,resizable:!1,draggable:!1,dialogClass:"noDialogTitle"});jQuery("body").on("click",function(a){jQuery(".KDBFavPop").dialog("isOpen")&&(!jQuery(a.target).is(".ui-dialog, a")&&
!jQuery(a.target).closest(".ui-dialog").length&&(!KDBFav.pop_element||jQuery(a.target).parent().parent().attr("id")!==KDBFav.pop_element.id))&&KDBFav.pop_close()})},pop_not_ready:function(a){KDBFav.open_pop_with_options(a,{align:"center",message:["Not ready..."],width:130});KDBFav.pop_element_is_error_flag=!0},pop_error:function(a,b){KDBFav.open_pop_with_options(b,{align:"center",message:a,width:240});KDBFav.pop_element_is_error_flag=!0},open_pop_with_options:function(a,b){KDBFav.pop_element_is_error_flag=
!1;var c=jQuery(".KDBFavPop");a&&c.dialog({position:{my:"left top",at:"right top",of:a,collision:"fit flip"}});b.message.push('<a href="#" onclick="KDBFav.click_pop_close(event);">[close]</a>');jQuery(".KDBFavPopMessage").css("text-align",b.align).html(b.message.join("<br />"));c.dialog("option",{height:(b.message.length+1)*KDBFav.pop_pixels_per_line+(b.big_lines?b.big_lines*KDBFav.pop_pixels_extra_per_big_line:0),width:b.width});c.dialog("open");KDBFav.pop_element=a},click_pop_close:function(a){a.preventDefault?
a.preventDefault():a.returnValue=!1;KDBFav.pop_close()},pop_close:function(a){KDBFav.pop_element_is_error_flag=!1;var b=jQuery(".KDBFavPop");a&&a.fade?b.fadeOut(1300,function(){b.dialog("close");b.show()}):b.dialog("close")},pop_close_error:function(a){KDBFav.pop_element_is_error_flag&&KDBFav.pop_close(a)},pop_favorite_menu:function(a){var b=KDBFav.get_type_and_id_from_element(a),c=[],d;KDBFav.is_maybe_signed_in()||c.push('<span style="font-size: 130%; line-height:160%"><a href="'+KDBFav.htmlspecialchars(KDBFav.urls.login)+
'">Sign in</a> | <a href="'+KDBFav.htmlspecialchars(KDBFav.urls.register)+'">Register</a></span>');c.push('<a href="#" onclick="KDBFav.fav_icon_link(event);">'+(KDBFav.is_fav(b.type,b.id)?"user"==b.type?"Unfriend":"Unfavorite":"user"==b.type?"Friend":"Favorite")+" this "+b.type+"</a>");if((d=Math.max(0,KDBFav.get_fav_count(b.type,b.id)-KDBFav.is_fav(b.type,b.id)))&&"program"!==b.type)c.push('<a href="'+KDBFav.htmlspecialchars(KDBFav.urls.user_favs_base+"/"+b.type+"/"+b.id)+'">'+d+" other "+(1===d?
"person":"people")+"</a> favorited this");"update profile"!==KDBFav.page_type&&c.push('<a href="'+KDBFav.htmlspecialchars(KDBFav.urls.profile_favs)+'">Review your favorites</a>');KDBFav.open_pop_with_options(a,{align:"left",message:c,width:205,big_lines:!KDBFav.is_maybe_signed_in()})},fav_icon_link:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1;KDBFav.fav_icon_toggle(KDBFav.pop_element)},fav_icon_toggle:function(a){KDBFav.pop_close();KDBFav.set_icon_busy(a,!0);KDBFav.fav_icon_toggle_attempt(a)},
is_fav:function(a,b){return KDBFav.favorites[a]&&KDBFav.favorites[a][b]?KDBFav.favorites[a][b].is:!1},set_fav:function(a,b,c){KDBFav.favorites[a]||(KDBFav.favorites[a]={});KDBFav.favorites[a][b]||(KDBFav.favorites[a][b]={is:!1});KDBFav.favorites[a][b].is=c;KDBFav.favorites[a][b].cnt+=c?1:-1},get_fav_count:function(a,b){return KDBFav.favorites[a]&&KDBFav.favorites[a][b]?KDBFav.favorites[a][b].cnt:0},fav_icon_toggle_attempt:function(a,b){var c=function(){b>=KDBFav.max_ajax_retry_attempts?KDBFav.set_icon_visible_state_to_known_state(0,
a):KDBFav.ajax_get_post_key({success:function(){KDBFav.fav_icon_toggle_attempt(a,b+1)},error:function(){KDBFav.set_icon_visible_state_to_known_state(0,a)}})},d=function(a){window.location=KDBFav.urls.fav_icon_clicked+"&type="+encodeURIComponent(a.type)+"&id="+encodeURIComponent(a.id)+"&page_type="+encodeURIComponent(KDBFav.page_type)+"&page_id="+encodeURIComponent(KDBFav.page_id)},e=KDBFav.get_type_and_id_from_element(a);KDBFav.is_maybe_signed_in()?(b||(b=0),jQuery.ajax({url:KDBFav.urls.controller+
"?action=fav_icon_toggle",dataType:"json",type:"POST",data:{type:e.type,id:e.id,state:KDBFav.is_fav(e.type,e.id)?1:0,key:KDBFav.favorites.key,myurl:KDBFav.urls.myurl,page_type:KDBFav.page_type,page_id:KDBFav.page_id},xhrFields:{withCredentials:!0},context:a,success:function(a){if(!a||!a.status)a={status:"noop"};switch(a.status){case "change":KDBFav.change_favorite_state(this,a.new_fav);break;case "error":c();break;case "noop":KDBFav.set_icon_visible_state_to_known_state(0,this);break;case "login":a=
KDBFav.get_type_and_id_from_element(this);d({type:a.type,id:a.id,state:KDBFav.is_fav(a.type,a.id)?1:0});break;case "badkey":c()}},error:function(){c()}})):d({type:e.type,id:e.id,state:KDBFav.is_fav(e.type,e.id)?1:0})},change_favorite_state:function(a,b){KDBFav.restart_refresh_clock();var c=KDBFav.get_type_and_id_from_element(a),d=KDBFav.is_fav(c.type,c.id);b&&d||!b&&!d||KDBFav.set_fav(c.type,c.id,b);KDBFav.set_icon_visible_state_to_known_state(0,a)},ajax_get_post_key:function(a,b){var c=function(){b>=
KDBFav.max_ajax_retry_attempts?(KDBFav.pop_error(["Unable to update your favorites right now..."]),a.error()):setTimeout(KDBFav.ajax_get_post_key,KDBFav.ajax_retry_delay_ms,a,b+1)};b||(b=0);jQuery.ajax({url:KDBFav.urls.controller+"?action=get_post_key",dataType:"json",xhrFields:{withCredentials:!0},success:function(b){if(!b||!b.status)b={status:"empty"};switch(b.status){case "content":KDBFav.favorites.key=b.key;a.success();break;case "error":c()}},error:function(){c()}})},restart_refresh_clock:function(){"function"===
typeof KDBRestartRefreshClock&&KDBRestartRefreshClock()},is_maybe_signed_in:function(){return jQuery.cookie(KDBFav.cookie_name)},check_for_signin_change:function(){KDBFav.is_maybe_signed_in()?KDBFav.was_signed_out_flag&&(KDBFav.load_icon_states(),KDBFav.was_signed_out_flag=!1):KDBFav.was_signed_out_flag||(KDBFav.was_signed_out_flag=!0);KDBFav.schedule_next_check_for_signin_change()},schedule_next_check_for_signin_change:function(){setTimeout(KDBFav.check_for_signin_change,KDBFav.signin_change_check_poll_delay_ms)},
htmlspecialchars:function(a){return void 0===a?"":(""+a).replace(/[<>"&]/g,function(a){return"<"==a?"&lt;":">"==a?"&gt;":'"'==a?"&quot;":"&"==a?"&amp;":""})}};
