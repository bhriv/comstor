
/* =======================================
    Show All Students in Selected Course - no filter
* ======================================= */

function show_all_students(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_all_students   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');

    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    
    // ajax URLs
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/'+selected_course_id;
    url_student_data = 'http://comstor.lumiousanalytics.com/api/lumiousreports/studentdata/';

    // store results from these static URLs as objects to use with promises
    var students = $.getJSON(url_course_students);

    // declare variables for student object
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;

    // wait for student ajax request to complete before we proceed
    $.when(students).done(function(studentobject) {

        // dig down to the responseText object
        //var s = $.parseJSON(studentobject[1]);

        console.info("Student Data for Course " + selected_course_id);
        console.info(studentobject);

        // reset the Results table
        dna.empty('results-body-access', { fade: true });

        // loop through the student object
        jQuery.each(studentobject, function(i, sdata) {
                
            student_id = sdata.id;
            student_firstname = sdata.firstname;
            student_lastname = sdata.lastname;
            student_email = sdata.email;
            student_username = sdata.username;
            student_firstaccess = sdata.firstaccess;
            student_lastaccess = sdata.lastaccess;

            console.log("Checking data for Student ID: " + student_id);

            var student_stress = 'not_set';
            var student_instructor_comments = 'not_set';
            var student_instructor_comments_trimmed = 'not_set';
            var firstaccess_dateVal = student_firstaccess;

            // Format Date
            if (firstaccess_dateVal == 0) {
                var firstaccess_formatted_date = 'Never';
            }else{
                var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');    
            };                      
            var lastaccess_dateVal = student_lastaccess;
            if (lastaccess_dateVal == 0) {
                var lastaccess_formatted_date = 'Never';
            }else{
                var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');  
            };

            // ajax call to get student data details
            var studentdata = $.getJSON(url_student_data + student_id);
            // Store Details in DNA table values
            sdata['ID'] = student_id;
            sdata['FIRSTNAME'] = student_firstname;
            sdata['LASTNAME'] = student_lastname;
            sdata['EMAIL'] = student_email;
            sdata['USERNAME'] = student_username;
            sdata['FIRSTACCESS'] = student_firstaccess;
            sdata['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
            sdata['LASTACCESS'] = student_lastaccess;
            sdata['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;

            // when ajax call is done
            $.when(studentdata).done(function(studentdataobject) {

                console.log("student data details: ");
                console.log(studentdataobject);

                // Student Notes Content - get array values, manipulate to clean up and use as comments and stress level
                var student_posts = studentdataobject.user["posts"];
                
                console.log(student_posts);

                // ensure the posts object contains usable data
                if(student_posts != undefined){
                    $.each(student_posts, function (index, x) {
                        console.log('comment content: ' +x.content + ' publishstate: ' + x.publishstate );
                        student_instructor_comments = x.content;
                        student_instructor_comments_trimmed = student_instructor_comments.trim(); // remove whitespace
                        student_instructor_comments_trimmed = student_instructor_comments.substr(2); // remove first 2 digits for stress level
                        student_stress = student_instructor_comments.substring(0, 2); // take first 2 digits, use as stress setting
                        console.log('Stress content: ' +student_stress + ' student_instructor_comments_trimmed: ' + student_instructor_comments_trimmed );
                        
                        // Add Labels to stress levels
                        if ( student_stress == '20' || student_stress == 'Be' || student_stress == 'Jo' ) {
                            // If entry is a default entry then update the text 
                            sdata['STUDENTSTRESS'] = '<span class="content_not_available">N/A</span>';
                            sdata['STUDENTINSTRUCTORCOMMENTS'] = '<span class="content_not_available">No Comment</span>';
                            
                        }else{
                            // Pass the stress levels html to the data object for dna with the correct label wrapping
                            if (student_stress >= 7) {student_stress = '<span class="student-stress danger label">'+student_stress+'</span>';};
                            if (student_stress < 7) {student_stress = '<span class="student-stress warning label">'+student_stress+'</span>';};
                            if (student_stress < 4) {student_stress = '<span class="student-stress success label">'+student_stress+'</span>';};
                            sdata['STUDENTSTRESS'] = student_stress;
                            sdata['STUDENTINSTRUCTORCOMMENTS'] = student_instructor_comments_trimmed;
                        }
                        console.log(student_stress);
                        console.log(student_instructor_comments_trimmed);
                    });
                }
            });
            

            // Bind data to table template
            dna.clone('results-body-access', sdata, {html: true, fade: true});

            
            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            studentList.fadeIn();
            
            
            // add listeners to modal links 
            // $('#tbody_quiz_result').on('click', 'a.switch', function(e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     var triggered = $(this).attr('gumby-trigger');
            //     console.log(triggered);
            //     var student = $(this).parent().parent().find('.student').text();
            //     var tofield = $(triggered).find('input[name=To]');
            //     tofield.val(student);
            //     $(triggered).addClass('active');
            // });
        });
        $('#loading_gif').hide();
        studentList.show();
        widget_quiz_reports.show();
    // widget_quiz_reports_performance.show();
    
    });

    //widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_all_students    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
  
}


/* =======================================
    Show All Students That Have Logged In
* ======================================= */

function show_students_that_have_logged_in(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_that_have_logged_in   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();
    // studentList.hide();
    // widget_quiz_reports.hide();

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/' +selected_course_id;

    // reset the Results table
    dna.empty('results-body-access', { fade: true });

    $.getJSON( url_course_students, function( json ) {
        
        // Reset Student Data Variables
        var student_id = null;
        var student_firstname = null;
        var student_lastname = null;
        var student_email = null;
        var student_username = null;
        var student_firstaccess = null;
        var student_lastaccess = null;


        jQuery.each(json, function(i, val) {
            
            student_id = val.id;
            student_firstname = val.firstname;
            student_lastname = val.lastname;
            student_email = val.email;
            student_username = val.username;
            student_firstaccess = val.firstaccess;
            student_lastaccess = val.lastaccess;
            
            // Filter Results - only show students that have logged in
            // Format Date to be Readable
            if (student_firstaccess != 0) {

                var firstaccess_dateVal = student_firstaccess;
                if (firstaccess_dateVal == 0) {
                    var firstaccess_formatted_date = 'Never';
                }else{
                    var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');    
                };
                
                var lastaccess_dateVal = student_lastaccess;
                if (lastaccess_dateVal == 0) {
                    var lastaccess_formatted_date = 'Never';
                }else{
                    var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');  
                };
                
                // Store Details in DNA table values
                val['ID'] = student_id;
                val['FIRSTNAME'] = student_firstname;
                val['LASTNAME'] = student_lastname;
                val['EMAIL'] = student_email;
                val['USERNAME'] = student_username;
                val['FIRSTACCESS'] = student_firstaccess;
                val['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                val['LASTACCESS'] = student_lastaccess;
                val['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                console.log('Students who have logged in: ('+student_id+') '+student_firstname +' '+student_lastname);
                // Bind data to table template
                dna.clone('results-body-access', val, {html: true, fade: true});
            };

            
            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            studentList.fadeIn();
            
            // add listeners to modal links 

            // $('#tbody_quiz_result').on('click', 'a.switch', function(e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     var triggered = $(this).attr('gumby-trigger');
            //     console.log(triggered);
            //     var student = $(this).parent().parent().find('.student').text();
            //     var tofield = $(triggered).find('input[name=To]');
            //     tofield.val(student);
            //     $(triggered).addClass('active');
            // });
        });
    });
    $('#loading_gif').hide();
    studentList.show();
    widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_that_have_logged_in    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}




/* =======================================
    Show All Students That Have NOT Logged In
* ======================================= */

function show_students_that_have_not_logged_in(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_that_have_not_logged_in   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/' +selected_course_id;

     // reset the Results table
     dna.empty('results-body-access', { fade: true });

    $.getJSON( url_course_students, function( json ) {

        // Reset Student Data Variables
        var student_id = null;
        var student_firstname = null;
        var student_lastname = null;
        var student_email = null;
        var student_username = null;
        var student_firstaccess = null;
        var student_lastaccess = null;

        
        jQuery.each(json, function(i, val) {
            
            student_id = val.id;
            student_firstname = val.firstname;
            student_lastname = val.lastname;
            student_email = val.email;
            student_username = val.username;
            student_firstaccess = val.firstaccess;
            student_lastaccess = val.lastaccess;
            console.log('Students who have NOT logged in: ('+student_id+') '+student_firstname +' '+student_lastname + ' Access: '+student_firstaccess);
            // Filter Results - only show students that have not logged in 2 days before start date

            // Format Date to be Readable
            if (student_firstaccess == 0 ) { 

                var firstaccess_dateVal = student_firstaccess;
                if (firstaccess_dateVal == 0) {
                    var firstaccess_formatted_date = 'Never';
                }else{
                    var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');    
                };
                
                var lastaccess_dateVal = student_lastaccess;
                if (lastaccess_dateVal == 0) {
                    var lastaccess_formatted_date = 'Never';
                }else{
                    var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');  
                };
                
                // Store Details in DNA table values
                val['ID'] = student_id;
                val['FIRSTNAME'] = student_firstname;
                val['LASTNAME'] = student_lastname;
                val['EMAIL'] = student_email;
                val['USERNAME'] = student_username;
                val['FIRSTACCESS'] = student_firstaccess;
                val['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                val['LASTACCESS'] = student_lastaccess;
                val['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                console.log('Students who have logged in: ('+student_id+') '+student_firstname +' '+student_lastname);
                // Bind data to table template
                dna.clone('results-body-access', val, {html: true, fade: true});
            };


            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            studentList.fadeIn();
            
            // add listeners to modal links 

            // $('#tbody_quiz_result').on('click', 'a.switch', function(e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     var triggered = $(this).attr('gumby-trigger');
            //     console.log(triggered);
            //     var student = $(this).prev().find('.student-firstname').text();
            //     var tofield = $(triggered).find('input[name=To]');
            //     tofield.val(student);
            //     $(triggered).addClass('active');
            // });

        });
    });
    $('#loading_gif').hide();
    studentList.show();
    widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_that_have_not_logged_in    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}



/* =======================================
    Show All Students That Have NOT Logged In Two Days Prior to Start Date
* ======================================= */

function show_students_that_have_not_logged_in_two_days_before_start_date(){
    var sdate = $('#coursefilter').find(':selected').attr('data-startdate');
    // debugs 2015-05-18
    // sdate = 1431998571; 
    // 2015-5-10
    sdate = 1431216000;

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_that_have_not_logged_in_two_days_before_start_date   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
    console.log(sdate);
    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();
    // studentList.hide();
    // widget_quiz_reports.hide();

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/' +selected_course_id;
    
    // reset the Results table
    dna.empty('results-body-access', { fade: true });

    $.getJSON( url_course_students, function( json ) {

        // Reset Student Data Variables
        var student_id = null;
        var student_firstname = null;
        var student_lastname = null;
        var student_email = null;
        var student_username = null;
        var student_firstaccess = null;
        var student_lastaccess = null;

        // @FIXME BRET - prior to startdate hardcoded
        var startdate = sdate;
        // Two days prior to start date in seconds = (2*24*3600);
        var prior_to_startdate = startdate - (2*24*3600);
        
        // var after_test_date = startdate + (2*24*3600);

        console.log('prior_to_startdate: '+prior_to_startdate);

        jQuery.each(json, function(i, val) {
            
            student_id = val.id;
            student_firstname = val.firstname;
            student_lastname = val.lastname;
            student_email = val.email;
            student_username = val.username;
            student_firstaccess = val.firstaccess;
            student_lastaccess = val.lastaccess;
            
            // Filter Results - only show students that have not logged in 2 days before start date

            // Format Date to be Readable
            if (student_lastaccess < prior_to_startdate ) { 
            // if (student_lastaccess > after_test_date ) { 

                var firstaccess_dateVal = student_firstaccess;
                if (firstaccess_dateVal == 0) {
                    var firstaccess_formatted_date = 'Never';
                }else{
                    var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');    
                };
                
                var lastaccess_dateVal = student_lastaccess;
                if (lastaccess_dateVal == 0) {
                    var lastaccess_formatted_date = 'Never';
                }else{
                    var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');  
                };
                
                // Store Details in DNA table values
                val['ID'] = student_id;
                val['FIRSTNAME'] = student_firstname;
                val['LASTNAME'] = student_lastname;
                val['EMAIL'] = student_email;
                val['USERNAME'] = student_username;
                val['FIRSTACCESS'] = student_firstaccess;
                val['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                val['LASTACCESS'] = student_lastaccess;
                val['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                console.log('Students who have logged in: ('+student_id+') '+student_firstname +' '+student_lastname);
                // Bind data to table template
                dna.clone('results-body-access', val, {html: true, fade: true});
            };

            
            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            studentList.fadeIn();
            
            // add listeners to modal links 
            // $('#tbody_quiz_result').on('click', 'a.switch', function(e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     var triggered = $(this).attr('gumby-trigger');
            //     console.log(triggered);
            //     var student = $(this).parent().parent().find('.student').text();
            //     var tofield = $(triggered).find('input[name=To]');
            //     tofield.val(student);
            //     $(triggered).addClass('active');
            // });
        });
    });
    $('#loading_gif').hide();
    studentList.show();
    widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_that_have_not_logged_in_two_days_before_start_date    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}



/* =======================================
    Show All Students That Have NOT Logged In Within the Last Two Days
* ======================================= */

function show_students_that_have_not_logged_in_within_the_last_two_days(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_that_have_not_logged_in_within_the_last_two_days   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/' +selected_course_id;

    // reset the Results table
    dna.empty('results-body-access', { fade: true });

    $.getJSON( url_course_students, function( json ) {

        // Reset Student Data Variables
        var student_id = null;
        var student_firstname = null;
        var student_lastname = null;
        var student_email = null;
        var student_username = null;
        var student_firstaccess = null;
        var student_lastaccess = null;

        // @FIXME BRET - prior to startdate hardcoded
        var startdate = 1400000000;

        // Two days prior to start date in seconds = (2*24*3600);
        var prior_to_startdate = startdate - (2*24*3600);
        console.log('prior_to_startdate: '+prior_to_startdate);

        jQuery.each(json, function(i, val) {
            
            student_id = val.id;
            student_firstname = val.firstname;
            student_lastname = val.lastname;
            student_email = val.email;
            student_username = val.username;
            student_firstaccess = val.firstaccess;
            student_lastaccess = val.lastaccess;
            
            // Filter Results - only show students that have not logged in last 2 days
            // Date.now()

            var right_now = Date.now();
            var within_two_days_length = (2*24*3600);
            var within_four_days_length = (4*24*3600);
            var login_time_difference = right_now - student_lastaccess;


            // Format Date to be Readable
            if (within_two_days_length < login_time_difference ) { 
            // if (within_four_days_length < login_time_difference ) { 

                var firstaccess_dateVal = student_firstaccess;
                if (firstaccess_dateVal == 0) {
                    var firstaccess_formatted_date = 'Never';
                }else{
                    var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');    
                };
                
                var lastaccess_dateVal = student_lastaccess;
                if (lastaccess_dateVal == 0) {
                    var lastaccess_formatted_date = 'Never';
                }else{
                    var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');  
                };
                
                // Store Details in DNA table values
                val['ID'] = student_id;
                val['FIRSTNAME'] = student_firstname;
                val['LASTNAME'] = student_lastname;
                val['EMAIL'] = student_email;
                val['USERNAME'] = student_username;
                val['FIRSTACCESS'] = student_firstaccess;
                val['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                val['LASTACCESS'] = student_lastaccess;
                val['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                console.log('Students who have logged in: ('+student_id+') '+student_firstname +' '+student_lastname);
                // Bind data to table template
                dna.clone('results-body-access', val, {html: true, fade: true});
            };

            
            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            studentList.fadeIn();
            
            // add listeners to modal links 
            // $('#tbody_quiz_result').on('click', 'a.switch', function(e) {
            //     e.preventDefault();
            //     e.stopPropagation();
            //     var triggered = $(this).attr('gumby-trigger');
            //     console.log(triggered);
            //     var student = $(this).parent().parent().find('.student').text();
            //     var tofield = $(triggered).find('input[name=To]');
            //     tofield.val(student);
            //     $(triggered).addClass('active');
            // });
        });
    });
    $('#loading_gif').hide();
    studentList.show();
    widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_that_have_not_logged_in_within_the_last_two_days    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}
