<?php // Sidebar widgets ?>
<script>
    $(document).ready(function() {
        if (urlParams['page'] == 'mobile-analytics'){
            cc('Loading mobile-analytics Sidebar widgets partial','ready');
            $( "#sidebar_widgets" ).load( "assets/js/REPLACE-WITH-PHP/INCLUDE-ONCE/PAGES/SIDEBAR-WIDGETS/mobile-analytics-sidebar.php", function( response, status, xhr ) {if ( status == "error" )   {cc( xhr.status + " " + xhr.statusText,'error' );}if ( status == "success" ) {cc( xhr.status + " " + xhr.statusText,'ready' );}});
        }
        // if (urlParams['page'] == 'learning-activity'){
        //     cc('Loading learning-activity partial','ready');
        //     $( "#content_loader" ).load( "assets/js/REPLACE-WITH-PHP/INCLUDE-ONCE/PAGES/learning-activity.php", function( response, status, xhr ) {if ( status == "error" )   {cc( xhr.status + " " + xhr.statusText,'error' );}if ( status == "success" ) {cc( xhr.status + " " + xhr.statusText,'ready' );}});
        // }
        // if (urlParams['page'] == 'teacher-reports'){
        //     cc('Loading teacher-reports partial','ready');
        //     $( "#content_loader" ).load( "assets/js/REPLACE-WITH-PHP/INCLUDE-ONCE/PAGES/teacher-reports.php", function( response, status, xhr ) {if ( status == "error" )   {cc( xhr.status + " " + xhr.statusText,'error' );}if ( status == "success" ) {cc( xhr.status + " " + xhr.statusText,'ready' );}});
        // }
    });
</script>