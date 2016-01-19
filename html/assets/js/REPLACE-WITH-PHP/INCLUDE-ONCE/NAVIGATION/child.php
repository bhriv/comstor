<div class="two columns subnav-bar">
    <nav id="analytics_triggers">
        <ul>
            <li><h2>Reports <i class="icon-play"></i></h2></li>
        </ul>
        <ul id="mobile_analytics_triggers">
            <li><small><strong>Mobile Analytics</strong></small></li>
        </ul>
        <ul id="mobile_analytics_submenus">
            <li>
                <small><strong>Users</strong></small>
                <ul>
                    <li><span id="NewUsers_" class="chart_trigger"><a class="active">New Users <i class="icon-play"></i></a></span></li>
                    <li><span id="RetainedUsers_" class="chart_trigger"><a>Retained Users <i class="icon-play"></i></a></span></li>
                    <li><span id="ActiveUsers_" class="chart_trigger"><a>Active Users <i class="icon-play"></i></a></span></li>
                    <!-- <li><span id="ReturnRate_" class="chart_trigger"><a>Return Rate <i class="icon-play"></i></a></span></li> -->
                </ul>
            </li>
            <li>
                <small><strong>Sessions</strong></small>
                <ul>
                    <li><span id="Sessions_" class="chart_trigger"><a>Sessions <i class="icon-play"></i></a></span></li>
                    <li><span id="MedianSessionLength_" class="chart_trigger"><a>Median Session Length <i class="icon-play"></i></a></span></li>
                    <li><span id="AvgSessionLength_" class="chart_trigger"><a>Ave. Session Length <i class="icon-play"></i></a></span></li>
                    <li><span id="PageViews_" class="chart_trigger"><a>Page Views <i class="icon-play"></i></a></span></li>
                </ul>
            </li>
            <li>
                <small><strong>Interactions</strong></small>
                <ul>
                    <li><span id="Summary_" class="chart_trigger"><a>Summary <i class="icon-play"></i></a></span></li>
                    <li><span id="ModuleViewed_" class="chart_trigger"><a>Module Viewed <i class="icon-play"></i></a></span></li>
                    <li><span id="CourseViewed_" class="chart_trigger"><a>Course Viewed <i class="icon-play"></i></a></span></li>
                    <li><span id="ModuleRated_" class="chart_trigger"><a>Module Rated <i class="icon-play"></i></a></span></li>
                    <li><span id="PDFDownloaded_" class="chart_trigger"><a>PDF Downloaded <i class="icon-play"></i></a></span></li>
                    <!-- <li><span id="ItemBookmarked_" class="chart_trigger"><a>Item Bookmarked <i class="icon-play"></i></a></span></li> -->
                    <!-- <li><span id="TwitterHandleEnabled_" class="chart_trigger"><a>Twitter Handle Enabled <i class="icon-play"></i></a></span></li> -->
                </ul>
            </li>
            <script>cc('mobile-analytics-submenu.php content loaded','ready');</script>
            <script>
                $(document).ready(function() {
                    // if (urlParams['page'] == 'mobile-analytics'){
                    //     cc('Loading mobile-analytics submenu items partial','ready');
                    //     $( "#mobile_analytics_submenus" ).load( "assets/js/REPLACE-WITH-PHP/INCLUDE-ONCE/NAVIGATION/SUBMENUS/mobile-analytics-submenu.php", function( response, status, xhr ) {if ( status == "error" )   {cc( xhr.status + " " + xhr.statusText,'error' );}if ( status == "success" ) {cc( xhr.status + " " + xhr.statusText,'ready' );}});
                    // }
                    // var pageid = $.query.get('page');
                    // alert('Page from URL = '+pageid);
                    // var newerQuery = $.query.SET('page', 'learning-activity');
                    // alert('newerQuery = '+ newerQuery);
                    // var page = urlParams['page'];
                    // var url = location.search;
                });
                $("#mobile_analytics_triggers li").click(function() {
                    location.replace('/dashboard.html?apiKey=VW7Z3VDXXSK7HM6GKWZ3&page=mobile-analytics');
                });
                $("#learning_activity_triggers li").click(function() {
                    location.replace('/dashboard.html?apiKey=VW7Z3VDXXSK7HM6GKWZ3&page=learning-activity');
                });
                $("#teacher_reports_triggers li").click(function() {
                    location.replace('/dashboard.html?apiKey=VW7Z3VDXXSK7HM6GKWZ3&page=teacher-reports');
                });
                
            </script>
        </ul>

        <ul id="learning_activity_triggers">
            <li><small><strong>Learning Activity</strong></small></li>
        </ul>

        <ul id="teacher_reports_triggers">
            <li><small><strong>Teacher Reports</strong></small></li>
            <li><a onclick="work_in_progress();">TEST: work_in_progress();</a></li>
            <li><a class="get_item_data">TEST: get_item_data();</a></li>
        </ul>
    </nav>
</div><!-- / navbar column -->
<style>
    #root .subnav-bar ul{
        margin-top: 0;
    }
    #root .subnav-bar ul li h2{
        margin-bottom: 0;
    }
    #root .subnav-bar ul li h2 i{
        margin-top: 0.6em;
    }
    #root .nav-bar nav ul li a i,
    #root .subnav-bar nav ul li a i
    {
        background-image: none;
        padding-top: 5px;
    }
    #root .subnav-bar ul li ul li {
        margin-bottom: 0;
        font-size: 14px;
        text-transform: capitalize;
    }
    #root .subnav-bar ul li a .icon-play{
        visibility: hidden;
        margin-top: 0;
    }
    #root .subnav-bar ul li a.active .icon-play{
        visibility: visible;
    }
    input[type="text"].date_changer{
        width: 90px;
    }
    input[type="text"].date_changer:hover{
        cursor: pointer;
    }
    #graphs-holder.widget-grid li h2{
        text-align: left;
        text-transform: none;
    }
    #graphs-holder.widget-grid li h2 span {
        float: right;
        padding: 2px 6px;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        font-size: 80%;
        margin-right: 4px;
    }
    #analytics_triggers li a:hover{
        cursor: pointer;
    }
    #widget-overview ul li span.period{
       text-transform: capitalize;
        font-size: 11px;
        line-height: 1.1em; 
    }
    #overview_stats span.period{
        
    }
    #graphs-holder li h2 span:hover{
        cursor: pointer;
    }
    #graphs-holder li h2 span.active{
        background-color: bisque;
        color: gray;
    }
    header#site_header .logo{
        float: left;
    }
    #root .nav-bar nav ul li{
        text-align: left;
        padding-left: 10px;
    }
    #app_overview{
        min-height: 145px !important;
    }
    #app_version_history{
        min-height: 400px;
    }
    #app_version_history,
    #app_overview ul{
        margin: 0;
    }
    #app_version_history li,
    #app_overview ul li{
        margin-bottom: 0;
        font-size: 16px;
        line-height: 1.5em;
        font-weight: bold;
    }
    #app_version_history li span,
    #app_overview ul li span{
        font-weight: normal;
    }
    #overview_stats .badge.default{
        color: #fff;
    }
    i.icon-info{
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 0.5em;
        position: relative;
        top: 2px;
    }
    .icon-info.icon-left a:before, .icon-info.icon-right a:after, i.icon-info:before {
        top: 0;
        position: absolute;
        left: 38%;
        top: 6%;
        color: #fff;
        font-size: 10px;
    }
   /* .tablesorter-header-inner {
        line-height: 1em;
        padding: 0.5em 0 0.5em 0.5em;
        text-align: center;
        font-size: 12px;
    }*/
    .widget-grid li div.widget-content table th{
        padding: 0.5em;
    }
    .widget-grid li div.widget-content table thead th{
        padding: 0;
    }
    #graphs-holder ul li .tablesorter-header-inner{
        padding: 4px 0 4px 4px;
        text-align: center;
    }
    .tablesorter-header-inner span.clearfix{
        display: block;
        clear: both;
        font-size: 9px;
    }
    .widget-grid li div.widget-content table thead{
        background-color: #7ea2aa;
    }
    .widget-grid li h2.yellow{
        background-color: #afdfdb;
    }
</style>
<script>cc('child.php content loaded','ready');</script>