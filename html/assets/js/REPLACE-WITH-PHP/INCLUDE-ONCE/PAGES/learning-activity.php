<?	// Learning Activity ?>
Learning Activity - TOTARA
<section class="report_display_switch" id="flurry_reports" style="display:block;">
    <!-- TOTARA -->
    
    <span id="new_dashboard">new_dashboard()</span>
    <hr>
    <h2>Get IDS</h2>
    <span id="getAllVisibleCategories">getAllVisibleCategories()</span>
    <span id="getAllHiddenCategories">getAllHiddenCategories()</span>
    <hr>
    <h2>Build Table</h2>
    <span id="displayCategories_visible">displayCategories(visible)</span>
    <span id="displayCategories_hidden">displayCategories(hidden)</span>
    <hr>

    

    <span id="get_courses_with_students">get_courses_with_students()</span>
    <span id="count_students">count_students()</span>
    <span id="pull_student_data">pull_student_data()</span> 
    <span id="work_in_progress">work_in_progress()</span> 
    <span onclick="runConsoleClassTests()">runConsoleClassTests()</span> 
     <h3><i class="fa fa-bar-chart"></i> Totara Activity</h3>
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
	</table>
</section>
<section id="active_courses">
	<h3>Active Courses</h3>
	<table class="tablesorter sortable">
	    <thead>
	        <tr>
	            <th>ID</th>   
	            <th>Course Full Name</th>   
	            <th>Course Short Name</th>   
	            <th>Category</th>
	            <th>Start Date/Time</th>           
	        </tr>
	    </thead>
	    <tbody id="tbody_activity_result"></tbody>
	</table>

</section>