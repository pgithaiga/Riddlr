$(document).ready(function() {
 
	//ACCORDION BUTTON ACTION	
	$('div').click(function() {
		if($(this).is("#riddlrHead")){
			$("#tab-content").hide();
		};


		$('div.accordionContent').slideUp('normal');	
		$(this).next().slideDown('normal');
	});
 
	//HIDE THE DIVS ON PAGE LOAD	
	$("div.accordionContent").hide();


});