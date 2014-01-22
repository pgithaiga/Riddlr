$(document).ready(function() {
 
	//ACCORDION BUTTON ACTION	
	var showing = "#mainbody"; //this is to fix changes when clicking on
	//current div
	$('div.accordionButton').click(function() {
		if($(this).is("#riddlrHead")){
			$("#tab-content").hide();
			console.log(showing);
		};
		if($(this).is(showing)){
			console.log("no change");
		}

		else{
		$('div.accordionContent').slideUp('normal');	
		$(this).next().slideDown('normal');
		showing = $(this).next();
	}});
 
	//HIDE THE DIVS ON PAGE LOAD	

	$("#tab-content").hide();
	$("#mainBody").show();


});