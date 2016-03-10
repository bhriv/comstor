/*******************************************************/
/*******************  Route Based Scripts  *************/
/*******************************************************/
// Emulate PHP route methods for loading scripts based on the current route

// LOAD on All Dashboard Pages

if (/dashboard/.test(window.location.href)){
    $.getScript( "assets/js/dashboard.js" )
      .done(function( script, textStatus ) {
        cc('dashboard.js loading '+ textStatus,'ready' );
        if (urlParams['page'] == 'admin'){
          $('#sidebar_widgets').addClass('hidden');
          $('#mobile_analytics_submenus').addClass('hidden');
          $('#mef_reports').addClass('hidden');
          $('#show_hide_categories').removeClass('hidden');
          $("#content_loader").removeClass('nine');
          $("#content_loader").addClass('sixteen');

          $(document).ready(function() {
            loadAllCategories('visible');
          // loadAllCategories('hidden');
          }); // end Doc Ready
           
        }
      })
      .fail(function( jqxhr, settings, exception ) {
        cc('Dashboard script not loaded','fatal');
    });

}

if (urlParams['page'] == 'mobile-analytics'){
  $.getScript( "assets/js/flurry.js" )
    .done(function( script, textStatus ) {
      cc('flurry.js loading '+ textStatus,'ready' );
    })
    .fail(function( jqxhr, settings, exception ) {
      cc('flurry script not loaded','fatal');
  });
}
if (urlParams['page'] == 'learning-activity'){
  $.getScript( "assets/js/totara.js" )
    .done(function( script, textStatus ) {
      cc('totara.js loading '+ textStatus,'ready' );
    })
    .fail(function( jqxhr, settings, exception ) {
      cc('totara script not loaded','fatal');
  });
}
if (urlParams['page'] == 'login'){
  $.getScript( "assets/js/fb_login.js" )
    .done(function( script, textStatus ) {
      cc('fb_login loading '+ textStatus,'ready' );
    })
    .fail(function( jqxhr, settings, exception ) {
      cc('fb_login script not loaded','fatal');
  }); 
}
if (urlParams['page'] == 'teacher-reports'){
  // $.getScript( "assets/js/build/concat-lumious_reports.js" )
  //   .done(function( script, textStatus ) {
  //     cc('concat-lumious_reports loading '+ textStatus,'ready' );
  //   })
  //   .fail(function( jqxhr, settings, exception ) {
  //     cc('concat-lumious_reports script not loaded','fatal');
  // }); 
  
  $('#sidebar_widgets').addClass('hidden');
  $('#mobile_analytics_submenus').addClass('hidden');
    
}


