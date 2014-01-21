
//$('#tab-content div').hide();
$("#tab-content").hide();
//$('#tab-content div:first').show();

$('#nav li').click(function() {
    $("#tab-content").show();
    $('#nav li a').removeClass("active");
    $(this).find('a').addClass("active");
    $('#tab-content div').hide();

    var indexer = $(this).index(); //gets the current index of (this) which is #nav li
    $('#tab-content div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
});