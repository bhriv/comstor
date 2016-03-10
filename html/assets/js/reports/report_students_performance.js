

/* =======================================
    Show All Students Who are Doing Well on Their Pre-work
* ======================================= */

function show_students_who_are_doing_well_on_their_prework(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_who_are_doing_well_on_their_prework   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // Pass the data value of the selected option to the concatenated 
    var selected_data_id_value = $('#performancefilter').find(':selected').data('id');
    console.log('selected_data_id_value: ' +selected_data_id_value);

    // get the data from the endpoints
    var endpoint_data = get_endpoint_data()
    var students = endpoint_data.students;
    var quizzes = endpoint_data.quizzes;
    var attempts = endpoint_data.attempts;

    // declare variables for quiz object
    var quiz_id = null;
    var quiz_course = null;
    var quiz_name = null;
    var quiz_sumgrades = null;
    var quiz_grade = null;

    // String quiz_id, quiz_course, quiz_name, quiz_sumgrades, quiz_grade;
    // quiz_id, quiz_course, quiz_name, quiz_sumgrades, quiz_grade = null;

    // declare variables for attempt object
    var attempt_quiz = null;
    var attempt_id = null;
    var attempt_user = null;
    var attempt_state = null;
    var attempt_sumgrades = null;
    var attempt_attempt = null;
    var attempt_percentage = null;

    // declare variables for student object
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;


    // wait for all three ajax requests to complete before we proceed
    $.when(students, quizzes, attempts).done(function(studentobject, quizobject, attemptobject) {

        // dig down to the responseText object
        var s = $.parseJSON(studentobject[2].responseText);
        var q = $.parseJSON(quizobject[2].responseText);
        var a = $.parseJSON(attemptobject[2].responseText);

        console.info("Student and Quiz Data for Course " + selected_course_id);
        console.info(s, q, a);

        // reset the Results table
        dna.empty('results-body-performance', { fade: true });

        // loop through the quizzes object
        jQuery.each(q, function(i, qdata) {
                
            quiz_id = qdata.id;
            quiz_course = qdata.course;
            quiz_name = qdata.name;
            quiz_sumgrades = qdata.sumgrades;
            quiz_grade = qdata.grade;

            var isprework = quiz_name.indexOf('(pre-work)');

            console.log("Prework quiz? " + isprework);

            // only continue if this is a prework quiz
            if(isprework > -1){
                console.log("Looking for Quiz Attempts for Quiz #" + quiz_id + " (" + quiz_name + ")");

                // for each quiz, loop through the attempts to check if there are attempts for the current quiz
                jQuery.each(a, function(x, adata) {

                    //console.log("Checking Attempt Data: ");
                    //console.log(adata);

                    attempt_quiz = adata.quiz;
                    attempt_id = adata.id;
                    attempt_user = adata.userid;
                    attempt_state = adata.state;
                    attempt_sumgrades = adata.sumgrades;
                    attempt_attempt = adata.attempt;
                    attempt_percentage = (attempt_sumgrades/quiz_sumgrades)*100;

                    /*
                    Overview: Currently the single attempt percentage grades are calculated on the front end. 
                    This is not scalable. We need an endpoint to caculate these scores to improve performance and reliabiliy. 

                    Requirements:

                    FOR each student in the current class:
                    GET each quiz
                    FOR each quiz 
                    GET quiz 'sumgrades' (this is the quiz 'max' score. Usually an integer between 10-20)
                    GET each attempt
                    GET single attempt 'sumgrades'
                    - calculate attempt percentage
                    - attempt_percentage = (attempt_sumgrades/quiz_sumgrades)*100;

                    Notes: As these are a % score, no score should be greater than 100%. 

                    Example: See attached image. 

                    */
                    if(attempt_user === 632){
                        console.log("##############################################");
                        console.log("Current Attempt ID: " + attempt_id);
                        console.log("Current Attempt for quiz: " + attempt_quiz);
                        console.log("Current Student for attempt: " + attempt_user);
                        console.log("Current Grade for attempt: " + attempt_percentage);
                    }

                    // if the current attempt matches the current quiz
                    if(attempt_quiz === quiz_id && attempt_percentage >= 80){
                    // if(attempt_quiz === quiz_id && attempt_percentage > 0){ // show users for which we have a result

                        console.log("Attempt found for student user id " + attempt_user + " on quiz " + quiz_id);
                        var searchresult = findStudentByID(s,attempt_user);

                        // find the student data in the preloaded data object
                        if(searchresult){

                            
                            student_id = searchresult[0].id;
                            student_firstname = searchresult[0].firstname;
                            student_lastname = searchresult[0].lastname;
                            student_email = searchresult[0].email;
                            student_username = searchresult[0].username;
                            student_firstaccess = searchresult[0].firstaccess;
                            student_lastaccess = searchresult[0].lastaccess;

                            console.log("Student Found for userid " + attempt_user + " with name of " + student_firstname);
                            console.log("============================= QUIZ ATTEMPT FOUND FOR QUIZ "+quiz_id+" ===============================");
                            console.log("Student Name: " + student_firstname + " " + student_lastname);
                            console.log("Quiz ID: "+attempt_quiz);
                            console.log("Attempt ID: "+attempt_id);
                            console.log("User ID: "+attempt_user);
                            console.log("Attempt: "+attempt_attempt);
                            console.log("State: "+attempt_state);
                            console.log("Quiz Sumgrades: "+quiz_sumgrades);
                            console.log("Student Sumgrades: "+attempt_sumgrades);
                            console.log("Actual Grade: "+attempt_percentage+"%");
                            console.log("================================ END QUIZ ATTEMPT ============================");

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
                            
                            
                            adata['ID'] = student_id;
                            adata['FIRSTNAME'] = student_firstname;
                            adata['LASTNAME'] = student_lastname;
                            adata['EMAIL'] = student_email;
                            adata['USERNAME'] = student_username;
                            adata['FIRSTACCESS'] = student_firstaccess;
                            adata['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                            adata['LASTACCESS'] = student_lastaccess;
                            adata['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                            
                            adata['QID'] = attempt_quiz;
                            adata['QATTEMPT'] = attempt_attempt;
                            
                            attempt_percentage = Math.round(attempt_percentage);
                            // Add appropriate labels to Stress levels
                            if (attempt_percentage < 60) {attempt_percentage = '<span class="student-stress danger label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage < 75) {attempt_percentage = '<span class="student-stress warning label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage >= 75) {attempt_percentage = '<span class="student-stress success label">'+attempt_percentage+'</span>';};
                            
                            adata['QPERCENTAGE'] = attempt_percentage;
                            
                            // Bind data to table template
                            dna.clone('results-body-performance', adata, {html: true, fade: true});
                        }
                    }
                });
            }
        });
        // Update table so sorting works after ajax call
        $("#sortable").trigger("update"); 
        $('#loading_gif').hide();
        studentList.show();
        widget_quiz_reports_performance.show();
    });

    //widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_who_are_doing_well_on_their_prework    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}


/* =======================================
    Show All Students Who are NOT Doing Well on Their Pre-work
* ======================================= */

function show_students_who_are_not_doing_well_on_their_prework(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_who_are_not_doing_well_on_their_prework   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    
    // ajax URLs
    url_course_quiz = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://comstor.lumiousanalytics.com/api/lumiousreports/studentdata/';

    // store results from these static URLs as objects to use with promises
    var students = $.getJSON(url_course_students);
    var quizzes = $.getJSON(url_course_quiz);
    var attempts = $.getJSON(url_quiz_attempts);

    // declare variables for quiz object
    var quiz_id = null;
    var quiz_course = null;
    var quiz_name = null;
    var quiz_sumgrades = null;
    var quiz_grade = null;

    // declare variables for attempt object
    var attempt_quiz = null;
    var attempt_id = null;
    var attempt_user = null;
    var attempt_state = null;
    var attempt_sumgrades = null;
    var attempt_attempt = null;
    var attempt_percentage = null;

    // declare variables for student object
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;


    // wait for all three ajax requests to complete before we proceed
    $.when(students, quizzes, attempts).done(function(studentobject, quizobject, attemptobject) {

        // dig down to the responseText object
        var s = $.parseJSON(studentobject[2].responseText);
        var q = $.parseJSON(quizobject[2].responseText);
        var a = $.parseJSON(attemptobject[2].responseText);

        console.info("Student and Quiz Data for Course " + selected_course_id);
        console.info(s, q, a);

        // reset the Results table
        dna.empty('results-body-performance', { fade: true });

        // loop through the quizzes object
        jQuery.each(q, function(i, qdata) {
                
            quiz_id = qdata.id;
            quiz_course = qdata.course;
            quiz_name = qdata.name;
            quiz_sumgrades = qdata.sumgrades;
            quiz_grade = qdata.grade;

            var isprework = quiz_name.indexOf('(pre-work)');

            console.log("Prework quiz? " + isprework);

            // only continue if this is a prework quiz
            if(isprework > -1){
                console.log("Looking for Quiz Attempts for Quiz #" + quiz_id + " (" + quiz_name + ")");

                // for each quiz, loop through the attempts to check if there are attempts for the current quiz
                jQuery.each(a, function(x, adata) {

                    //console.log("Checking Attempt Data: ");
                    //console.log(adata);

                    attempt_quiz = adata.quiz;
                    attempt_id = adata.id;
                    attempt_user = adata.userid;
                    attempt_state = adata.state;
                    attempt_sumgrades = adata.sumgrades;
                    attempt_attempt = adata.attempt;
                    attempt_percentage = (attempt_sumgrades/quiz_sumgrades)*100;

                    // if the current attempt matches the current quiz
                    if(attempt_quiz === quiz_id && attempt_percentage <= 60){
                    // if(attempt_quiz === quiz_id && attempt_percentage > 0){ // show users for which we have a result

                        console.log("Attempt found for student user id " + attempt_user + " on quiz " + quiz_id);
                        var searchresult = findStudentByID(s,attempt_user);

                        // find the student data in the preloaded data object
                        if(searchresult){

                            
                            student_id = searchresult[0].id;
                            student_firstname = searchresult[0].firstname;
                            student_lastname = searchresult[0].lastname;
                            student_email = searchresult[0].email;
                            student_username = searchresult[0].username;
                            student_firstaccess = searchresult[0].firstaccess;
                            student_lastaccess = searchresult[0].lastaccess;

                            console.log("Student Found for userid " + attempt_user + " with name of " + student_firstname);
                            console.log("============================= QUIZ ATTEMPT FOUND FOR QUIZ "+quiz_id+" ===============================");
                            console.log("Student Name: " + student_firstname + " " + student_lastname);
                            console.log("Quiz ID: "+attempt_quiz);
                            console.log("Attempt ID: "+attempt_id);
                            console.log("User ID: "+attempt_user);
                            console.log("Attempt: "+attempt_attempt);
                            console.log("State: "+attempt_state);
                            console.log("Quiz Sumgrades: "+quiz_sumgrades);
                            console.log("Student Sumgrades: "+attempt_sumgrades);
                            console.log("Actual Grade: "+attempt_percentage+"%");
                            console.log("================================ END QUIZ ATTEMPT ============================");

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
                            
                            
                            adata['ID'] = student_id;
                            adata['FIRSTNAME'] = student_firstname;
                            adata['LASTNAME'] = student_lastname;
                            adata['EMAIL'] = student_email;
                            adata['USERNAME'] = student_username;
                            adata['FIRSTACCESS'] = student_firstaccess;
                            adata['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                            adata['LASTACCESS'] = student_lastaccess;
                            adata['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                            
                            adata['QID'] = attempt_quiz;
                            adata['QATTEMPT'] = attempt_attempt;
                            
                            attempt_percentage = Math.round(attempt_percentage);
                            // Add appropriate labels to Stress levels
                            if (attempt_percentage < 60) {attempt_percentage = '<span class="student-stress danger label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage < 75) {attempt_percentage = '<span class="student-stress warning label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage >= 75) {attempt_percentage = '<span class="student-stress success label">'+attempt_percentage+'</span>';};
                            
                            adata['QPERCENTAGE'] = attempt_percentage;
                            
                            // Bind data to table template
                            dna.clone('results-body-performance', adata, {html: true, fade: true});
                        }
                    }
                });
            }
        });
        // Update table so sorting works after ajax call
        $("#sortable").trigger("update"); 
        $('#loading_gif').hide();
        studentList.show();
        widget_quiz_reports_performance.show();
    });

    //widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_who_are_not_doing_well_on_their_prework    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}



/* =======================================
    Show All Students Who are Doing Well on Their Homework
* ======================================= */

function show_students_who_are_doing_well_on_their_homework(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_who_are_doing_well_on_their_homework   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    
    // ajax URLs
    url_course_quiz = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://comstor.lumiousanalytics.com/api/lumiousreports/studentdata/';

    // store results from these static URLs as objects to use with promises
    var students = $.getJSON(url_course_students);
    var quizzes = $.getJSON(url_course_quiz);
    var attempts = $.getJSON(url_quiz_attempts);

    // declare variables for quiz object
    var quiz_id = null;
    var quiz_course = null;
    var quiz_name = null;
    var quiz_sumgrades = null;
    var quiz_grade = null;

    // declare variables for attempt object
    var attempt_quiz = null;
    var attempt_id = null;
    var attempt_user = null;
    var attempt_state = null;
    var attempt_sumgrades = null;
    var attempt_attempt = null;
    var attempt_percentage = null;

    // declare variables for student object
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;


    // wait for all three ajax requests to complete before we proceed
    $.when(students, quizzes, attempts).done(function(studentobject, quizobject, attemptobject) {

        // dig down to the responseText object
        var s = $.parseJSON(studentobject[2].responseText);
        var q = $.parseJSON(quizobject[2].responseText);
        var a = $.parseJSON(attemptobject[2].responseText);

        console.info("Student and Quiz Data for Course " + selected_course_id);
        console.info(s, q, a);

        // reset the Results table
        dna.empty('results-body-performance', { fade: true });

        // loop through the quizzes object
        jQuery.each(q, function(i, qdata) {
                
            quiz_id = qdata.id;
            quiz_course = qdata.course;
            quiz_name = qdata.name;
            quiz_sumgrades = qdata.sumgrades;
            quiz_grade = qdata.grade;

            // var isprework = quiz_name.indexOf('(pre-work)');
            var ishomework = quiz_name.indexOf('(homework)');

            // console.log("Prework quiz? " + isprework);
            console.log("Home quiz? " + ishomework);

            // only continue if this is a prework quiz
            // if(isprework > -1){
            if(ishomework > -1){
                console.log("Looking for Quiz Attempts for Quiz #" + quiz_id + " (" + quiz_name + ")");

                // for each quiz, loop through the attempts to check if there are attempts for the current quiz
                jQuery.each(a, function(x, adata) {

                    //console.log("Checking Attempt Data: ");
                    //console.log(adata);

                    attempt_quiz = adata.quiz;
                    attempt_id = adata.id;
                    attempt_user = adata.userid;
                    attempt_state = adata.state;
                    attempt_sumgrades = adata.sumgrades;
                    attempt_attempt = adata.attempt;
                    attempt_percentage = (attempt_sumgrades/quiz_sumgrades)*100;

                    // if the current attempt matches the current quiz
                    if(attempt_quiz === quiz_id && attempt_percentage >= 80 ){
                    // if(attempt_quiz === quiz_id && attempt_percentage > 0){ // show users for which we have a result

                        console.log("Attempt found for student user id " + attempt_user + " on quiz " + quiz_id);
                        var searchresult = findStudentByID(s,attempt_user);

                        // find the student data in the preloaded data object
                        if(searchresult){

                            
                            student_id = searchresult[0].id;
                            student_firstname = searchresult[0].firstname;
                            student_lastname = searchresult[0].lastname;
                            student_email = searchresult[0].email;
                            student_username = searchresult[0].username;
                            student_firstaccess = searchresult[0].firstaccess;
                            student_lastaccess = searchresult[0].lastaccess;

                            console.log("Student Found for userid " + attempt_user + " with name of " + student_firstname);
                            console.log("============================= QUIZ ATTEMPT FOUND FOR QUIZ "+quiz_id+" ===============================");
                            console.log("Student Name: " + student_firstname + " " + student_lastname);
                            console.log("Quiz ID: "+attempt_quiz);
                            console.log("Attempt ID: "+attempt_id);
                            console.log("User ID: "+attempt_user);
                            console.log("Attempt: "+attempt_attempt);
                            console.log("State: "+attempt_state);
                            console.log("Quiz Sumgrades: "+quiz_sumgrades);
                            console.log("Student Sumgrades: "+attempt_sumgrades);
                            console.log("Actual Grade: "+attempt_percentage+"%");
                            console.log("================================ END QUIZ ATTEMPT ============================");

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
                            
                            
                            adata['ID'] = student_id;
                            adata['FIRSTNAME'] = student_firstname;
                            adata['LASTNAME'] = student_lastname;
                            adata['EMAIL'] = student_email;
                            adata['USERNAME'] = student_username;
                            adata['FIRSTACCESS'] = student_firstaccess;
                            adata['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                            adata['LASTACCESS'] = student_lastaccess;
                            adata['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                            
                            adata['QID'] = attempt_quiz;
                            adata['QATTEMPT'] = attempt_attempt;
                            
                            attempt_percentage = Math.round(attempt_percentage);
                            // Add appropriate labels to Stress levels
                            if (attempt_percentage < 60) {attempt_percentage = '<span class="student-stress danger label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage < 75) {attempt_percentage = '<span class="student-stress warning label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage >= 75) {attempt_percentage = '<span class="student-stress success label">'+attempt_percentage+'</span>';};
                            
                            adata['QPERCENTAGE'] = attempt_percentage;
                            
                            // Bind data to table template
                            dna.clone('results-body-performance', adata, {html: true, fade: true});
                        }
                    }
                });
            }
        });
        // Update table so sorting works after ajax call
        $("#sortable").trigger("update"); 
        $('#loading_gif').hide();
        studentList.show();
        widget_quiz_reports_performance.show();
    });

    //widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_who_are_doing_well_on_their_homework    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}


/* =======================================
    Show All Students Who are NOT Doing Well on Their Homework
* ======================================= */

function show_students_who_are_not_doing_well_on_their_homework(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_who_are_not_doing_well_on_their_homework   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    
    // ajax URLs
    url_course_quiz = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://comstor.lumiousanalytics.com/api/lumiousreports/studentdata/';

    // store results from these static URLs as objects to use with promises
    var students = $.getJSON(url_course_students);
    var quizzes = $.getJSON(url_course_quiz);
    var attempts = $.getJSON(url_quiz_attempts);

    // declare variables for quiz object
    var quiz_id = null;
    var quiz_course = null;
    var quiz_name = null;
    var quiz_sumgrades = null;
    var quiz_grade = null;

    // declare variables for attempt object
    var attempt_quiz = null;
    var attempt_id = null;
    var attempt_user = null;
    var attempt_state = null;
    var attempt_sumgrades = null;
    var attempt_attempt = null;
    var attempt_percentage = null;

    // declare variables for student object
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;


    // wait for all three ajax requests to complete before we proceed
    $.when(students, quizzes, attempts).done(function(studentobject, quizobject, attemptobject) {

        // dig down to the responseText object
        var s = $.parseJSON(studentobject[2].responseText);
        var q = $.parseJSON(quizobject[2].responseText);
        var a = $.parseJSON(attemptobject[2].responseText);

        console.info("Student and Quiz Data for Course " + selected_course_id);
        console.info(s, q, a);

        // reset the Results table
        dna.empty('results-body-performance', { fade: true });

        // loop through the quizzes object
        jQuery.each(q, function(i, qdata) {
                
            quiz_id = qdata.id;
            quiz_course = qdata.course;
            quiz_name = qdata.name;
            quiz_sumgrades = qdata.sumgrades;
            quiz_grade = qdata.grade;

            // var isprework = quiz_name.indexOf('(pre-work)');
            var ishomework = quiz_name.indexOf('(homework)');

            // console.log("Prework quiz? " + isprework);
            console.log("Home quiz? " + ishomework);

            // only continue if this is a prework quiz
            // if(isprework > -1){
            if(ishomework > -1){
                console.log("Looking for Quiz Attempts for Quiz #" + quiz_id + " (" + quiz_name + ")");

                // for each quiz, loop through the attempts to check if there are attempts for the current quiz
                jQuery.each(a, function(x, adata) {

                    //console.log("Checking Attempt Data: ");
                    //console.log(adata);

                    attempt_quiz = adata.quiz;
                    attempt_id = adata.id;
                    attempt_user = adata.userid;
                    attempt_state = adata.state;
                    attempt_sumgrades = adata.sumgrades;
                    attempt_attempt = adata.attempt;
                    attempt_percentage = (attempt_sumgrades/quiz_sumgrades)*100;

                    // if the current attempt matches the current quiz
                    if(attempt_quiz === quiz_id && attempt_percentage < 60){
                    // if(attempt_quiz === quiz_id && attempt_percentage > 0){ // show users for which we have a result

                        console.log("Attempt found for student user id " + attempt_user + " on quiz " + quiz_id);
                        var searchresult = findStudentByID(s,attempt_user);

                        // find the student data in the preloaded data object
                        if(searchresult){

                            
                            student_id = searchresult[0].id;
                            student_firstname = searchresult[0].firstname;
                            student_lastname = searchresult[0].lastname;
                            student_email = searchresult[0].email;
                            student_username = searchresult[0].username;
                            student_firstaccess = searchresult[0].firstaccess;
                            student_lastaccess = searchresult[0].lastaccess;

                            console.log("Student Found for userid " + attempt_user + " with name of " + student_firstname);
                            console.log("============================= QUIZ ATTEMPT FOUND FOR QUIZ "+quiz_id+" ===============================");
                            console.log("Student Name: " + student_firstname + " " + student_lastname);
                            console.log("Quiz ID: "+attempt_quiz);
                            console.log("Attempt ID: "+attempt_id);
                            console.log("User ID: "+attempt_user);
                            console.log("Attempt: "+attempt_attempt);
                            console.log("State: "+attempt_state);
                            console.log("Quiz Sumgrades: "+quiz_sumgrades);
                            console.log("Student Sumgrades: "+attempt_sumgrades);
                            console.log("Actual Grade: "+attempt_percentage+"%");
                            console.log("================================ END QUIZ ATTEMPT ============================");

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
                            
                            
                            adata['ID'] = student_id;
                            adata['FIRSTNAME'] = student_firstname;
                            adata['LASTNAME'] = student_lastname;
                            adata['EMAIL'] = student_email;
                            adata['USERNAME'] = student_username;
                            adata['FIRSTACCESS'] = student_firstaccess;
                            adata['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                            adata['LASTACCESS'] = student_lastaccess;
                            adata['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                            
                            adata['QID'] = attempt_quiz;
                            adata['QATTEMPT'] = attempt_attempt;
                            
                            attempt_percentage = Math.round(attempt_percentage);
                            // Add appropriate labels to Stress levels
                            if (attempt_percentage < 60) {attempt_percentage = '<span class="student-stress danger label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage < 75) {attempt_percentage = '<span class="student-stress warning label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage >= 75) {attempt_percentage = '<span class="student-stress success label">'+attempt_percentage+'</span>';};
                            
                            adata['QPERCENTAGE'] = attempt_percentage;
                            
                            // Bind data to table template
                            dna.clone('results-body-performance', adata, {html: true, fade: true});
                        }
                    }
                });
            }
        });
        // Update table so sorting works after ajax call
        $("#sortable").trigger("update"); 
        $('#loading_gif').hide();
        studentList.show();
        widget_quiz_reports_performance.show();

    });

    //widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_who_are_not_doing_well_on_their_homework    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}



/* =======================================
    Show All Students Who are Not Going to Pass
* ======================================= */

function show_students_who_are_not_going_to_pass(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_students_who_are_not_going_to_pass   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('LOCAL STORAGE current_course ' +selected_course_id);
    
    // ajax URLs
    url_course_quiz = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://comstor.lumiousanalytics.com/api/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://comstor.lumiousanalytics.com/api/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://comstor.lumiousanalytics.com/api/lumiousreports/studentdata/';

    // store results from these static URLs as objects to use with promises
    var students = $.getJSON(url_course_students);
    var quizzes = $.getJSON(url_course_quiz);
    var attempts = $.getJSON(url_quiz_attempts);

    // declare variables for quiz object
    var quiz_id = null;
    var quiz_course = null;
    var quiz_name = null;
    var quiz_sumgrades = null;
    var quiz_grade = null;

    // declare variables for attempt object
    var attempt_quiz = null;
    var attempt_id = null;
    var attempt_user = null;
    var attempt_state = null;
    var attempt_sumgrades = null;
    var attempt_attempt = null;
    var attempt_percentage = null;

    // declare variables for student object
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;


    // wait for all three ajax requests to complete before we proceed
    $.when(students, quizzes, attempts).done(function(studentobject, quizobject, attemptobject) {

        // dig down to the responseText object
        var s = $.parseJSON(studentobject[2].responseText);
        var q = $.parseJSON(quizobject[2].responseText);
        var a = $.parseJSON(attemptobject[2].responseText);

        console.info("Student and Quiz Data for Course " + selected_course_id);
        console.info(s, q, a);

        // reset the Results table
        dna.empty('results-body-performance', { fade: true });

        // loop through the quizzes object
        jQuery.each(q, function(i, qdata) {
                
            quiz_id = qdata.id;
            quiz_course = qdata.course;
            quiz_name = qdata.name;
            quiz_sumgrades = qdata.sumgrades;
            quiz_grade = qdata.grade;

            // var isprework = quiz_name.indexOf('(pre-work)');
            var ishomework = quiz_name.indexOf('(homework)');

            // console.log("Prework quiz? " + isprework);
            console.log("Home quiz? " + ishomework);

            // only continue if this is a prework quiz
            // if(isprework > -1){
            // if(ishomework > -1){

            // ALLOW ALL TYPES OF QUIZZES   
                console.log("Looking for Quiz Attempts for Quiz #" + quiz_id + " (" + quiz_name + ")");

                // for each quiz, loop through the attempts to check if there are attempts for the current quiz
                jQuery.each(a, function(x, adata) {

                    //console.log("Checking Attempt Data: ");
                    //console.log(adata);

                    attempt_quiz = adata.quiz;
                    attempt_id = adata.id;
                    attempt_user = adata.userid;
                    attempt_state = adata.state;
                    attempt_sumgrades = adata.sumgrades;
                    attempt_attempt = adata.attempt;
                    attempt_percentage = (attempt_sumgrades/quiz_sumgrades)*100;

                    // if the current attempt matches the current quiz
                    if(attempt_quiz === quiz_id && attempt_percentage < 40){
                    // if(attempt_quiz === quiz_id && attempt_percentage > 0){ // show users for which we have a result

                        console.log("Attempt found for student user id " + attempt_user + " on quiz " + quiz_id);
                        var searchresult = findStudentByID(s,attempt_user);

                        // find the student data in the preloaded data object
                        if(searchresult){

                            
                            student_id = searchresult[0].id;
                            student_firstname = searchresult[0].firstname;
                            student_lastname = searchresult[0].lastname;
                            student_email = searchresult[0].email;
                            student_username = searchresult[0].username;
                            student_firstaccess = searchresult[0].firstaccess;
                            student_lastaccess = searchresult[0].lastaccess;

                            console.log("Student Found for userid " + attempt_user + " with name of " + student_firstname);
                            console.log("============================= QUIZ ATTEMPT FOUND FOR QUIZ "+quiz_id+" ===============================");
                            console.log("Student Name: " + student_firstname + " " + student_lastname);
                            console.log("Quiz ID: "+attempt_quiz);
                            console.log("Attempt ID: "+attempt_id);
                            console.log("User ID: "+attempt_user);
                            console.log("Attempt: "+attempt_attempt);
                            console.log("State: "+attempt_state);
                            console.log("Quiz Sumgrades: "+quiz_sumgrades);
                            console.log("Student Sumgrades: "+attempt_sumgrades);
                            console.log("Actual Grade: "+attempt_percentage+"%");
                            console.log("================================ END QUIZ ATTEMPT ============================");

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
                            
                            
                            adata['ID'] = student_id;
                            adata['FIRSTNAME'] = student_firstname;
                            adata['LASTNAME'] = student_lastname;
                            adata['EMAIL'] = student_email;
                            adata['USERNAME'] = student_username;
                            adata['FIRSTACCESS'] = student_firstaccess;
                            adata['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
                            adata['LASTACCESS'] = student_lastaccess;
                            adata['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
                            
                            adata['QID'] = attempt_quiz;
                            adata['QATTEMPT'] = attempt_attempt;
                            
                            attempt_percentage = Math.round(attempt_percentage);
                            // Add appropriate labels to Stress levels
                            if (attempt_percentage < 60) {attempt_percentage = '<span class="student-stress danger label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage < 75) {attempt_percentage = '<span class="student-stress warning label">'+attempt_percentage+'</span>';};
                            if (attempt_percentage >= 75) {attempt_percentage = '<span class="student-stress success label">'+attempt_percentage+'</span>';};
                            
                            adata['QPERCENTAGE'] = attempt_percentage;
                            
                            // Bind data to table template
                            dna.clone('results-body-performance', adata, {html: true, fade: true});
                        }
                    }
                });
            // }
        });
        // Update table so sorting works after ajax call
        $("#sortable").trigger("update"); 
        $('#loading_gif').hide();
       studentList.show();
        widget_quiz_reports_performance.show();
    });

    //widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_students_who_are_not_going_to_pass    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}




