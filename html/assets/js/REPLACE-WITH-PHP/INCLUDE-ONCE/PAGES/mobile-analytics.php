<?php // Dashboard - mobile analytics powered by Flurry ?>
Mobile Analytics
<section class="report_display_switch" id="flurry_reports">
    <!-- status bar -->
    <div class="status-bar" style="padding-top:0;">
        <div id="" class="row" style="margin-bottom:1em;">
            <!-- <a onclick="getCustomEventSummaryData();">getCustomEventSummaryData()</a> -->
            <div class="picker_holder">
                <label for="start_date">Start Date</label>
                <input class="date_changer" id="start_date" name="start_date" type="text" value="2015-01-01">
            </div>
            <div class="picker_holder">
                <label for="end_date">End Date</label>
                <input class="date_changer" id="end_date" name="end_date" type="text" value="2015-12-10">
            </div>
            <!-- 
            <div class="picker_holder hideme" id="metric_type">
                <label>Metric Type:</label>
                <div class="picker">
                    <select id="basisfilter">
                        <option value="null">
                            - select -
                        </option>
                        <option value="appMetrics">
                            App Metrics
                        </option>
                        <option disabled value="eventMetrics">
                            Event Metrics
                        </option>
                    </select>
                </div>
            </div>
            <div class="picker_holder hideme" id="app_metric_specific" >
                <label>App Metric:</label>
                <div class="picker">
                    <select>
                        <option value="null">
                            - select -
                        </option>
                        <optgroup label="Sessions">
                            <option value="Sessions">
                                Sessions
                            </option>
                            <option value="MedianSessionLength">
                                Median Session Length
                            </option>
                            <option value="AvgSessionLength">
                                Avg Session Length
                            </option>
                        </optgroup>
                        <optgroup label="Users">
                            <option value="ActiveUsers">
                                Active Users
                            </option>
                            <option value="ActiveUsersByWeek">
                                Active Users By Week
                            </option>
                            <option value="ActiveUsersByMonth">
                                Active Users By Month
                            </option>
                            <option value="NewUsers">
                                New Users
                            </option>
                            <option value="RetainedUsers">
                                Retained Users
                            </option>
                        </optgroup>
                        <optgroup label="Views">
                            <option value="PageViews">
                                Page Views
                            </option>
                            <option value="AvgPageViewsPerSession">
                                Avg Page Views Per Session
                            </option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="hideme" id="event_metric_specific">
                <label>Event:</label> <input id="event_name" placeholder="Type EXACT Event Name..." type="text"> <label>Event Metric:</label>
                <div class="picker">
                    <select>
                        <option value="null">
                            - select -
                        </option>
                        <optgroup label="Sessions">
                            <option value="totalSessions">
                                Total Sessions
                            </option>
                            <option value="totalCount">
                                Total Count
                            </option>
                        </optgroup>
                        <optgroup label="Users">
                            <option value="usersLastDay">
                                Users Last Day
                            </option>
                            <option value="usersLastWeek">
                                Users Last Week
                            </option>
                            <option value="usersLastMonth">
                                Users Last Month
                            </option>
                        </optgroup>
                        <optgroup label="Average Users">
                            <option value="usersLastDay">
                                Ave Users Last Day
                            </option>
                            <option value="usersLastWeek">
                                Ave Users Last Week
                            </option>
                            <option value="usersLastMonth">
                                Ave Users Last Month
                            </option>
                        </optgroup>
                    </select>
                </div>
            </div> -->
       <!--  <div class="query_controls">
            <label for=""></label><br>
            <button id="runDashboard">Submit</button>
             <a class="restart"><i class="fa fa-refresh"></i> Restart</a>
             <a id="testFlurryAnalytics"><i class="fa fa-refresh"></i> testFlurryAnalytics()</a>
        </div> -->
    </div>
    <!-- <span id="chart_key"><small><strong>Key:</strong>: <span class="flurry_key" style="color:#82bfd8;"><i class="fa fa-line-chart"></i> Flurry Data</span> <span class="compare_key" style="color: #fe5f55"><i class="fa fa-line-chart"></i> Course Data</span></small></span> -->

    <ul id="graphs-holder" class="widget-grid full-width">
        <li id="widget-NewUsers">
            <h2 class="yellow">
                New Users <a class="ttip" data-tooltip="Total number of unique users who used the application for the first time in the chosen period (days/weeks/months)."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-NewUsers .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="NewUsersM" class="months">Months</span> 
                <span id="NewUsersW" class="weeks">Weeks</span> 
                <span id="NewUsersD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-NewUsers" class="flurry_chart"></canvas>            
            </div>
        </li>
        <li id="widget-RetainedUsers">
            <h2 class="yellow">
                Retained Users <a class="ttip" data-tooltip="Total number of users who remain active users of the application for chosen period (days/weeks/months)."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-RetainedUsers .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="RetainedUsersM" class="months">Months</span> 
                <span id="RetainedUsersW" class="weeks">Weeks</span> 
                <span id="RetainedUsersD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-RetainedUsers" class="flurry_chart"></canvas>            
            </div>
        </li>
        <li id="widget-ActiveUsers">
            <h2 class="yellow">
                Active Users <a class="ttip" data-tooltip="Total number of unique users who accessed the application per day."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-ActiveUsers .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="ActiveUsersM" class="months">Months</span> 
                <span id="ActiveUsersW" class="weeks">Weeks</span> 
                <span id="ActiveUsersD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-ActiveUsers" class="flurry_chart"></canvas>            
            </div>
        </li>

        <li id="widget-Sessions">
            <h2 class="yellow">
                Sessions <a class="ttip" data-tooltip="The total number of times users accessed the application per in chosen period (days/weeks/months)."><i class="icon-info"></i></a>  <a class="toggle" gumby-trigger="#widget-Sessions .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="SessionsM" class="months">Months</span> 
                <span id="SessionsW" class="weeks">Weeks</span> 
                <span id="SessionsD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-Sessions" class="flurry_chart"></canvas>            
            </div>
        </li>

        <li id="widget-MedianSessionLength">
            <h2 class="yellow">
                Median Session Length <a class="ttip" data-tooltip="Median length of a user in chosen period (days/weeks/months)."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-MedianSessionLength .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="MedianSessionLengthM" class="months">Months</span> 
                <span id="MedianSessionLengthW" class="weeks">Weeks</span> 
                <span id="MedianSessionLengthD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-MedianSessionLength" class="flurry_chart"></canvas>            
            </div>
        </li>

        <li id="widget-AvgSessionLength">
            <h2 class="yellow">
                Ave. Session Length <a class="ttip" data-tooltip="Average length of a user in chosen period (days/weeks/months)."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-AvgSessionLength .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="AvgSessionLengthM" class="months">Months</span> 
                <span id="AvgSessionLengthW" class="weeks">Weeks</span> 
                <span id="AvgSessionLengthD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-AvgSessionLength" class="flurry_chart"></canvas>            
            </div>
        </li>

        <li id="widget-PageViews">
            <h2 class="yellow">
                Page Views <a class="ttip" data-tooltip="Total number of page views in chosen period (days/weeks/months)."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-PageViews .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="PageViewsM" class="months">Months</span> 
                <span id="PageViewsW" class="weeks">Weeks</span> 
                <span id="PageViewsD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-PageViews" class="flurry_chart"></canvas>            
            </div>
        </li>

      <!--   <li id="widget-Interactions">
            <h2 class="yellow">
                Interactions <a class="ttip" data-tooltip="Total number of module views."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-Interactions .widget-content"><i class="icon-minus-squared"></i></a>
                <span id="PageViewsM" class="months">Months</span> 
                <span id="PageViewsW" class="weeks">Weeks</span> 
                <span id="PageViewsD" class="days">Days</span> 
            </h2>
            <div class="widget-content">
                <canvas id="flurry-chart-Interactions" class="flurry_chart"></canvas>            
            </div>
        </li> -->

        <li id="widget-Summary">
            <h2 class="yellow">
                Summary <a class="ttip" data-tooltip="Total number of module views."><i class="icon-info"></i></a> 
                <a class="toggle" gumby-trigger="#widget-Summary .widget-content"><i class="icon-minus-squared"></i></a>
            </h2>
            <div class="widget-content">
                <table class="tablesorter sortable">
                    <thead>
                        <tr>
                            <th>Event<br>Name</th>   
                            <th>Total<br>Count</th>   
                            <th>Total<br>Sessions</th>
                            <th>Users <span class="clearfix">Last Day</span></th>   
                            <th>Users <span class="clearfix">Last Week</span></th>   
                            <th>Users <span class="clearfix">Last Month</span></th>   
                            <th>Avg.Users <span class="clearfix">Last Day</span></th>   
                            <th>Avg.Users <span class="clearfix">Last Week</span></th>   
                            <th>Avg.Users <span class="clearfix">Last Month</span></th>   
                        </tr>
                    </thead>
                    <tbody id=""></tbody>
                </table>
                <canvas id="flurry-chart-Summary" class="flurry_chart"></canvas>            
            </div>
        </li>

        <li id="widget-ModuleViewed">
            <h2 class="yellow">
                Module Viewed <a class="ttip" data-tooltip="Total number of module views."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-ModuleViewed .widget-content"><i class="icon-minus-squared"></i></a>
            </h2>
            <div class="widget-content">
                <label>Summary</label>
                <table class="tablesorter sortable summary">
                    <thead>
                        <tr>
                            <th>Date</th>   
                            <th>Total<br>Count</th>   
                            <th>Total<br>Sessions</th>
                            <th>Unique Users</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <label>Comparison</label>
                <canvas id="flurry-chart-ModuleViewed" class="flurry_chart"></canvas>            
                <label>Details</label>
                <table class="tablesorter sortable byID">
                    <thead>
                        <tr>
                            <th>ID or Name</th>      
                            <th>Total Count</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                
            </div>
        </li>
        <li id="widget-CourseViewed" class="">
            <h2 class="yellow">
                Course Viewed <a class="ttip" data-tooltip="Total number of module views."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-CourseViewed .widget-content"><i class="icon-minus-squared"></i></a>
            </h2>
            <div class="widget-content">
                <label>Summary</label>
                <table class="tablesorter sortable summary">
                    <thead>
                        <tr>
                            <th>Date</th>   
                            <th>Total<br>Count</th>   
                            <th>Total<br>Sessions</th>
                            <th>Unique Users</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <label>Comparison</label>
                <canvas id="flurry-chart-CourseViewed" class="flurry_chart"></canvas>            
                <label>Details</label>
                <table class="tablesorter sortable byID">
                    <thead>
                        <tr>
                            <th>ID or Name</th>     
                            <th>Total Count</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>           
            </div>
        </li>
        <li id="widget-ModuleRated" class="">
            <h2 class="yellow">
                Module Rated <a class="ttip" data-tooltip="Total number of module views."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-ModuleRated .widget-content"><i class="icon-minus-squared"></i></a>
            </h2>
            <div class="widget-content">
                <label>Summary</label>
                <table class="tablesorter sortable summary">
                    <thead>
                        <tr>
                            <th>Date</th>   
                            <th>Total<br>Count</th>   
                            <th>Total<br>Sessions</th>
                            <th>Unique Users</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <label>Comparison</label>
                <canvas id="flurry-chart-ModuleRated" class="flurry_chart"></canvas>            
                <label>Details</label>
                <table class="tablesorter sortable byID">
                    <thead>
                        <tr>
                            <th>ID or Name</th>      
                            <th>Total Count</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table> 
            </div>
        </li>
        <li id="widget-PDFDownloaded" class="">
            <h2 class="yellow">
                PDF Downloaded <a class="ttip" data-tooltip="Total number of module views."><i class="icon-info"></i></a> <a class="toggle" gumby-trigger="#widget-PDFDownloaded .widget-content"><i class="icon-minus-squared"></i></a>
            </h2>
            <div class="widget-content">
                <label>Summary</label>
                <table class="tablesorter sortable summary">
                    <thead>
                        <tr>
                            <th>Date</th>   
                            <th>Total<br>Count</th>   
                            <th>Total<br>Sessions</th>
                            <th>Unique Users</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <label>Comparison</label>
                <canvas id="flurry-chart-PDFDownloaded" class="flurry_chart"></canvas>            
                <label>Details</label>
                <table class="tablesorter sortable byID">
                    <thead>
                        <tr>
                            <th>ID or Name</th>   
                            <th>Total Count</th>   
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>           
            </div>
        </li>
        
    </ul>
    
    <!-- TOTARA -->
    <!-- <span id="pull_student_data">pull_student_data()</span>  -->
    <!--  <h3><i class="fa fa-bar-chart"></i> Totara Activity</h3>
<table class="tablesorter sortable">
    <thead>
        <tr>
            <th>ID</th>   
            <th>Student</th>   
            <th>Action</th>
            <th>Course ID</th>   
            <th>Object Table</th>
            <th>Object ID</th> 
            <th>Date/Time</th>           
        </tr>
    </thead>
    <tbody id="tbody_activity_result"></tbody>
</table> -->
</section>
<!-- \"@endDate":"2015-12-08",
//    "@startDate":"2015-01-01",
//    "@type":"Summary",
//    "@generatedDate":"12/10/15 8:32 AM",
//    "@version":"1.0",
//    "event":[  
//       {  
//          "@avgUsersLastDay":"0",
//          "@avgUsersLastMonth":"1",
//          "@avgUsersLastWeek":"0",
//          "@eventName":"PDF Downloaded",
//          "@totalCount":"34",
//          "@totalSessions":"18",
//          "@usersLastDay":"0",
//          "@usersLastMonth":"6",
//          "@usersLastWeek":"7"
//       }, -->
