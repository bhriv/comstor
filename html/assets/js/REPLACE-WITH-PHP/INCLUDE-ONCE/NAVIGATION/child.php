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
                $("#mobile_analytics_triggers li").click(function() {
                    location.replace('/dashboard.html?apiKey=VW7Z3VDXXSK7HM6GKWZ3&page=mobile-analytics');
                });
                $("#learning_activity_triggers li").click(function() {
                    location.replace('/dashboard.html?apiKey=VW7Z3VDXXSK7HM6GKWZ3&page=learning-activity');
                });
                $("#teacher_reports_triggers li").click(function() {
                    location.replace('/dashboard.html?apiKey=VW7Z3VDXXSK7HM6GKWZ3&page=admin');
                    $("#sidebar_widgets").hide();
                });
                
            </script>
        </ul>

        <!-- <ul id="learning_activity_triggers">
            <li><small><strong>Learning Activity</strong></small></li>
        </ul> -->

        <ul id="teacher_reports_triggers">
            <li>
                <small><strong>Teacher Reports</strong></small></li>
            <!-- <li><a onclick="work_in_progress();">TEST: work_in_progress();</a></li> -->
            <!-- <li><a class="get_item_data">TEST: get_item_data();</a></li> -->
        </ul>
    </nav>
</div><!-- / navbar column -->
<script>cc('child.php content loaded','ready');</script>