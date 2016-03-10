 

// ===================
// USER underscorejs.org library to modify attempt arrays.
// ===================
// EXAMPLES for usage of underscorejs.org library functions

// var list = _.size(studentdata) ; // size of object
// var first = _.first(studentdata) ; // size of object
// var compact = _.compact(studentdata) ; // size of object
// var flatten_test = _.flatten(studentdata,true) ; // size of object
// var keys = _.keys(studentdata); // size of object
// var allkeys = _.allKeys(studentdata); // size of object
// var array_test = _.isArray(studentdata); // size of object
// var object_test = _.isObject(student_ids);
// var indexOf_test = _.indexOf(studentdata, "userid");
// var zip_test = _.zip(student_ids, student_attempts, quiz_ids);
// var studentdata =  _.omit(studentdata, 'layout');
// var studentdata =  _.pick(studentdata,);
// var stooge = {name: 'moe', age: 32};
// matching = _.isMatch(studentdata, {"id": "1516"});
// var student_indexed = _.indexBy(studentdata, 'userid'); // gives unique IDs, strips repeat of IDs
// var clean_data = _.omit(studentdata, 'attempt');


/* =======================================
   All Results - show Concatenated results of all students with all attempt grades
* ======================================= */

function concatenated_results(){

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  concatenated_results   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

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

        var quiz_ids = _.pluck(q, 'id');
        var quiz_names = _.pluck(q, 'name');
        var quiz_sumgrades = _.pluck(q, 'sumgrades');
        var zip_quizzes = _.zip(quiz_ids,quiz_names,quiz_sumgrades);
        var student_firstnames = _.pluck(s, 'firstname');
        // Debug
        // dump(zip_quizzes  , 'body');
        // dump(student_firstnames  , 'body'); 
        // Attempt Data
        var student_ids = _.pluck(a, 'userid');
        var student_attempts = _.pluck(a, 'attempt');
        var quiz_ids = _.pluck(a, 'quiz');
        var student_sumgrades = _.pluck(a, 'sumgrades');
        // DEBUG
        // dump(student_ids  , 'body'); 

        // Build list of unique Students and Quizzes
        var unique_student_ids = _.uniq(student_ids);
        var unique_quiz_ids = _.uniq(quiz_ids);

        // Sort the quiz IDs for viewing
        unique_quiz_ids.sort(function(a, b) {
            return a - b;
        });  

        // Set variables for nestled arrays
        var _resultarr = [];
        var tmpresult = [];
        var text ='';
        var student_user = null;
        var quiz_no = null;
        var student_stress = null;
        var student_instructor_comments = null;
        var student_instructor_comments_trimmed = null;
        var student_first_access_date_details = null;
        var student_last_access_date_details = null;
        var modal_buttons = null;
        
        // loop through each unique student ID
        jQuery.each(unique_student_ids, function(i, student_user) {
            
            var searchresult = findStudentByID(s,student_user);
            // find the student data in the preloaded data object
            if(searchresult){
                student_id = searchresult[0].id;
                student_firstname = searchresult[0].firstname;
                student_lastname = searchresult[0].lastname;
                student_email = searchresult[0].email;
                student_username = searchresult[0].username;
                student_firstaccess = searchresult[0].firstaccess;
                student_lastaccess = searchresult[0].lastaccess;
                // console.log("Student Found for userid " + student_user + " with name of " + student_firstname);
                // console.log("======== Student data built =======");
                // console.log("Student Name: " + student_firstname + " " + student_lastname);
                
                // Get the Data for the single student
                url_student_extended_data = 'http://comstor.lumiousanalytics.com/api/lumiousreports/studentdata/' +student_id;
                // console.log(url_student_extended_data);
                $.getJSON( url_student_extended_data, function( extended_students_data ) {
                    console.log(extended_students_data);
                    var loop_number = 0;

                    $.each( extended_students_data, function( key, i) {
                        // Get new data from nestled array
                        loop_number++; 
                        student_id = i.id;
                        student_firstname = i.firstname;
                        // Student Notes Content - get array values, manipulate to clean up and use as comments and stress level
                        var student_posts = i.posts;

                        $.each(student_posts, function (index, x) {
                            // console.log('comment content: ' +x.content + ' publishstate: ' + x.publishstate );
                            student_instructor_comments = x.content;
                            student_instructor_comments_trimmed = student_instructor_comments.trim(); // remove whitespace
                            student_instructor_comments_trimmed = student_instructor_comments.substr(2); // remove first 2 digits for stress level
                            student_stress = student_instructor_comments.substring(0, 1); // take first 1 digits, use as stress setting

                            if (isNaN(student_stress)) { // cleanup data, don't pass NaN results
                                student_stress = '<span class="student-stress null_label label">N/A</span>';
                            }else{
                                if (student_stress >= 6 ) {student_stress = '<span class="student-stress danger label stress-'+student_stress+'">'+student_stress+'</span>';};
                                if (student_stress < 6 && student_stress >= 4) {student_stress = '<span class="student-stress warning label stress-'+student_stress+'">'+student_stress+'</span>';};
                                if (student_stress < 4 ) {student_stress = '<span class="student-stress success label stress-'+student_stress+'">'+student_stress+'</span>';};
                            }
                            if ( (student_instructor_comments_trimmed.indexOf("Test") > -1) ) {
                                student_instructor_comments_trimmed = 'N/A (test message only)';
                            }
                        });
                        // find student row in the DOM using student id
                        // append the stress and comments to the student details
                        var append_stress_to = '#student_stress-'+student_id; 
                        $(append_stress_to).html(student_stress);
                        var append_comments_to = '#student_comments-'+student_id; 
                        $(append_comments_to).text(student_instructor_comments_trimmed);
                    }); // end each loop

                }); // end getJSON for extended data

                // List of User ID's connected to interal test accounts that are not acutal student data
                // var test_users_id_list = ['0']; // Debug Only
                var test_users_id_list = ['3','4','5','6','7','9','37','96', '36','112', '248']; // Christine, John Mauritz, George, Theresa, Kim, Jamie Morgan
                var ignore_student = isInArray(student_id, test_users_id_list ); // ignore intenal test users - found in report_filters.js
                // Format dates for better display
                var firstaccess_dateVal = student_firstaccess;
                if (firstaccess_dateVal == 0) {
                    var firstaccess_formatted_date = 'Never';
                    student_first_access_date_details = firstaccess_formatted_date;
                }else{
                    var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');    
                    student_first_access_date_details = '<span class="hidden">'+student_firstaccess+'</span><span> '+firstaccess_formatted_date+'</span>';
                };
                var lastaccess_dateVal = student_lastaccess;
                if (lastaccess_dateVal == 0) {
                    var lastaccess_formatted_date = 'Never';
                    student_last_access_date_details = lastaccess_formatted_date;
                }else{
                    var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');  
                    student_last_access_date_details = '<span class="hidden">'+student_lastaccess+'</span><span> '+lastaccess_formatted_date+'</span>';
                };

                // CONSTRUCT RESULT ROW
                if (ignore_student) { // dont include Kim Park - clean up
                    text += '';    
                }
                else{
                    modal_buttons = '<td class="dna-nucleotide user-actions"><a href="quiz-reports#" class="switch" gumby-trigger="#modal-challenge">Challenge</a><br><a href="quiz-reports#" class="switch" gumby-trigger="#modal-remediation">Remediation</a><br><a href="quiz-reports#" class="switch" gumby-trigger="#modal-badge">Badge</a></td>';
                    text += '<tr class="single_student_results" id="student_id-'+student_id+'"><td class="student_id">'+student_id+'</td><td class="student_details"><span class="student_name"><i class="fa fa-user"></i> '+student_firstname+' '+student_lastname+'</span><span class="student_email"><a href="mailto:'+student_email+'">'+student_email+'</a></span><br><small>Instructor Comments:</small><br><span id="student_comments-'+student_id+'" class="instructor_comments">Instructor Comments: '+student_instructor_comments_trimmed+'</span></td><td><span id="student_lastaccess-'+student_id+'">'+student_last_access_date_details+'</span></td><td><span id="student_firstaccess-'+student_id+'">'+student_first_access_date_details+'</span></td><td><span id="student_stress-'+student_id+'">Stress: '+student_stress+'</span></td>'+modal_buttons;    
                }
            }
            else{
                // if no student result found then return a blank row
                text += '<tr><td><td>';
            }
            // Only include actual students, ignore test users
            if (!ignore_student) { 

                text += '<td class="attempt_data">'; // start attempt data cell
                // loop through each unique quiz ID

                // dump(unique_quiz_ids,'body');
                // Get individual Quiz attempt data, bind to single student row
                jQuery.each(unique_quiz_ids, function(j, quiz_no) {
                        // console.log('Looping through quiz:' +quiz_no); 
                        jQuery.each(zip_quizzes, function(i, data) {
                            if (quiz_no == data[0]) {
                                quiz_name = data[1];
                                quiz_sumgrades = data[2];
                            };
                        });
                        tmpresult = [];
                        texttemp = '';
                        jQuery.each(a, function(x, qdata) {
                            // loop through each unique attempt, if a match is found, save the attempt data to this row
                            
                            
                            if (selected_data_id_value == 0) { // Include All Results
                                if( qdata.userid == student_user && qdata.quiz == quiz_no && qdata.attempt>0) {
                                    // console.log('*********** Adding data for qdata.attempt ' +qdata.attempt);    
                                    tmpresult.push({ attempt: qdata.attempt, sumgrades: qdata.sumgrades});
                                    // Calculate individual Attempt percentages
                                    attempt_percentage = (qdata.sumgrades/quiz_sumgrades)*100;
                                    attempt_percentage = Math.round(attempt_percentage);
                                    if (!isNaN(attempt_percentage)) { // cleanup data, don't pass NaN results
                                        if (!attempt_percentage) {
                                            attempt_percentage = '<span class="student-stress null_label label">Incomplete</span>';
                                        }else{
                                            if (attempt_percentage < 60) {attempt_percentage = '<span class="student-stress danger label">'+attempt_percentage+'&#37;</span>';};
                                            if (attempt_percentage < 75) {attempt_percentage = '<span class="student-stress warning label">'+attempt_percentage+'&#37;</span>';};
                                            if (attempt_percentage >= 75) {attempt_percentage = '<span class="student-stress success label">'+attempt_percentage+'&#37;</span>';};
                                        }
                                        texttemp += '<span class="attempt_object">Attempt: '+qdata.attempt+': '+attempt_percentage+'</span>';    
                                    }
                                }
                            }
                            else{ // only include specified attempt result
                                if( qdata.userid == student_user && qdata.quiz == quiz_no && qdata.attempt == selected_data_id_value) {
                                   
                                    // console.log('*********** Adding data for qdata.attempt ' +qdata.attempt);    
                                    tmpresult.push({ attempt: qdata.attempt, sumgrades: qdata.sumgrades});
                                    // Calculate individual Attempt percentages
                                    attempt_percentage = (qdata.sumgrades/quiz_sumgrades)*100;
                                    attempt_percentage = Math.round(attempt_percentage);
                                    if (!isNaN(attempt_percentage)) { // cleanup data, don't pass NaN results
                                        if (!attempt_percentage) {
                                            attempt_percentage = '<span class="student-stress null_label label">Incomplete</span>';
                                        }else{
                                            if (attempt_percentage < 60) {attempt_percentage = '<span class="student-stress danger label">'+attempt_percentage+'&#37;</span>';};
                                            if (attempt_percentage < 75) {attempt_percentage = '<span class="student-stress warning label">'+attempt_percentage+'&#37;</span>';};
                                            if (attempt_percentage >= 75) {attempt_percentage = '<span class="student-stress success label">'+attempt_percentage+'&#37;</span>';};
                                        }
                                        texttemp += '<span class="attempt_object attempt_number_'+qdata.attempt+'">Attempt: '+qdata.attempt+': '+attempt_percentage+'</span>';    
                                    }
                                }
                            }

                        });
                        if(tmpresult.length>0) {
                            _resultarr.push({userid:student_user,quiz:quiz_no,results:tmpresult});
                            if (!ignore_student) { // ignore test users
                                if (quiz_name !== null) {
                                    text += '<div class="quiz_result_holder"><span class="quiz_details"><strong>'+quiz_name+'</strong> (Quiz ID: '+quiz_no+')</span>'+texttemp+'</div>';
                                }
                            }
                        }
                });
                text += '</td></tr>'; // end attempt data cell
                
                
                // add listeners to modal links 
                $('#tbody_quiz_result').on('click', 'a.switch', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var triggered = $(this).attr('gumby-trigger');
                    console.log(triggered);
                    var student = $(this).closest('td.student_id').text();
                    var tofield = $(triggered).find('input[name=To]');
                    tofield.val(student);
                    $(triggered).addClass('active');
                });
            } // end ignore test students
        });
        //dump(_resultarr  , 'body'); 
        $("#concatenated-results tbody").html(text);
        $('#loading_gif').hide();
        $("#concatenated-results").show();
        $("#email_report").show();
        $("#concatenated-results").trigger("update"); 
    });
    //widget_quiz_reports.show();
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END concatenated_results    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}
