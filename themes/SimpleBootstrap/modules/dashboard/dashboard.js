$(document).ready(function() {
	if($('h0').length>1){
		$('h0:first').css('margin-top', '5px').css('margin-bottom', '0px');
	}
	
	$('.online_servers td').each(function(){
		$(this).addClass('btn-primary').html($(this).children());
	});

	$('.one_fourth').addClass('col-xs-12').addClass('col-md-3');
	$('.one_two').addClass('col-xs-12').addClass('col-md-6');

	$('.dragbox-content img').remove();
	$('.bloc > div > br').remove();
	
	// Call Radial Indicator and Init Mod Function
	var url = "themes/SimpleBootstrap/js/radialIndicator.js";
	$.getScript( url, function() {
		animateProgressBars();
	});
	
	// Remove not wanted Tags in Containers every time when DOM is modified
	$('[id^=refreshed-]').bind("DOMSubtreeModified",function(){
		$('.currently-online').addClass('table').addClass('table-striped');
		$('.currently-online td').attr('style','');
		$('[id^=refreshed-] > br').remove();
		$('[id^=refreshed-] .load-container > br').remove();
		$('.dragbox-content .load-container > br').remove();
		$(".dragbox-content .load-container").each(function(){
			if($(this).find('.progress-wrap').length < 1){
				$(this).find('.progress').wrapAll('<div class="progress-wrap"></div>');
			}
		});

	});
});



function animateProgressBars(){
	// Init Radial Indicator for each Progress Bar
	$(".progress").addClass('inline-block');
	$(".progress-bar").each(function() {
		if($(this).children().length < 1){
		var value = $(this).attr("data");
		$(this).radialIndicator({
			barColor: '#1997c6',
			percentage: true,
			roundCorner: true,
			initValue: value
		});
		}
	});

	// Replace all <b> Tags with a Container in Server Status Section
	$('.progress').each(function(){
		var dragbox = $(this).parents('.dragbox-content').first();
		$(dragbox).children('b').each(function() {
			$('<cutter></cutter>').insertBefore(this);
		});
		$(dragbox).find('cutter').each(function() {
			var $set = $();
			var nxt = this.nextSibling;
			while (nxt) {
				if (!$(nxt).is('cutter')) {
					$set.push(nxt);
					nxt = nxt.nextSibling;
				} else break;
			}
			$set.wrapAll('<div class="load-container"/>');
		});
		$(dragbox).find('cutter').remove();
	});

	/* *** Only Storage *** */
	$('#column4:nth-child(4) > .dragbox > .load-container').addClass('storage');
	$('.storage br:first-of-type').replaceWith(' / ');

	/* *** Only CPU Cutting *** */
	$('#column4:nth-child(2) > .dragbox > .load-container').addClass('cpu_load');
	$('.cpu_load br').remove();
	$('.cpu_load').each(function() {
		var this_b = $(this).children('b');
		if($(this_b).text().indexOf(':') >= 0){
			$(this_b).text($(this_b).html().split(':')[0]);
		}
	});
}
