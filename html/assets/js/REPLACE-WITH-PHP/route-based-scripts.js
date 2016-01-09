/*******************************************************/
/*******************  Route Based Scripts  *************/
/*******************************************************/
// Emulate PHP route methods for loading scripts based on the current route


if (/dashboard/.test(window.location.href)){
    $.getScript( "assets/js/dashboard.js" )
      .done(function( script, textStatus ) {
        cc('dashboard.js loading '+ textStatus,'ready' );
      })
      .fail(function( jqxhr, settings, exception ) {
        cc('Dashboard script not loaded','fatal');
    });
}
if (/flurry/.test(window.location.href)){
    $.getScript( "assets/js/flurry.js" )
      .done(function( script, textStatus ) {
        cc('flurry.js loading '+ textStatus,'ready' );
      })
      .fail(function( jqxhr, settings, exception ) {
        cc('flurry script not loaded','fatal');
    });
}
if (/totara/.test(window.location.href)){
    $.getScript( "assets/js/totara.js" )
      .done(function( script, textStatus ) {
        cc('totara.js loading '+ textStatus,'ready' );
      })
      .fail(function( jqxhr, settings, exception ) {
        cc('totara script not loaded','fatal');
    });
}