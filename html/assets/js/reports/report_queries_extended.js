
/* =======================================
	RUN LUMIOUS REPORTS - all available functions

  	// lumiousreports_get_course_details();
 	// lumiousreports_single_student_data(); 	
 	// lumiousreports_get_quiz_details();
 	// lumiousreports_single_student_quiz_grades_data();
 	// lumiousreports_single_student_quiz_attempt_grades_data();

* ======================================= */


/* =======================================
	Get Selected Course Details
* ======================================= */

function lumiousreports_get_course_details(){

	console.log('===XXX   BEGIN  lumiousreports_get_course_details  XXX====');

	var selected_course_id = checkLocalStorage('current_course');
	console.log('LOCAL STORAGE current_course ' +selected_course_id);

    var courselookup_id = null;
    var courselookup_category = null;
    var courselookup_fullname = null;
    var courselookup_shortname = null;
    var courselookup_startdate = null;

    url_courselookup = 'http://www.akronzip.com/lumiousreports/courselookup/' +selected_course_id;
    console.log('COURSE LOOKUP ' +url_courselookup);


    $.getJSON( url_courselookup, function( courselookup_data ) {
      $.each( courselookup_data, function( key, i) {
        courselookup_id = i.id;
        courselookup_category = i.category;
        courselookup_fullname = i.fullname;
        courselookup_shortname = i.shortname;
        courselookup_startdate = i.startdate;

		var dateVal = courselookup_startdate;
		var formatted_date = moment.unix(dateVal).format('MMMM Do YYYY, h:mm:ss a');
        
        console.log('=====================================================');
        console.log('----------- COURSE: '+courselookup_fullname+' (ID'+courselookup_id+') --------------');
        console.log('====================================================');
        // console.log('courselookup_id: '+courselookup_id);
        // console.log('courselookup_category: '+courselookup_category);
        // console.log('courselookup_fullname: '+courselookup_fullname);
        // console.log('courselookup_shortname: '+courselookup_shortname);
        // console.log('courselookup_startdate: '+courselookup_startdate);
        console.log('Course is in Category: '+courselookup_category);
        console.log('Short Name: '+courselookup_shortname);
        console.log('Start Date: '+courselookup_startdate);
        console.log('FORMATTED Start Date: '+formatted_date);
        console.log('====================================================');
      });
      // console.log('POST COURSE LOOKUP');
    });
}

/* =======================================
	Get Selected QUIZ Details
* ======================================= */

function lumiousreports_get_quiz_details(){

	console.log('===XXX   BEGIN  lumiousreports_get_quiz_details  XXX====');

    // var selected_quiz_id = 101;
    var selected_quiz_id = null;
    selected_quiz_id = checkLocalStorage('current_quiz');

    console.log('LOCAL STORAGE current_quiz ' +selected_quiz_id);

    var quizlookup_id = null;
    var quizlookup_course = null;
    var quizlookup_name = null;
    var quizlookup_sumgrades = null;
    var quizlookup_grade = null;

    url_quizlookup = 'http://www.akronzip.com/lumiousreports/quizlookup/' +selected_quiz_id;
    console.log('QUIZ LOOKUP ' +url_quizlookup);

    $.getJSON( url_quizlookup, function( quizlookup_data ) {
      $.each( quizlookup_data, function( key, i) {
        quizlookup_id = i.id;
        quizlookup_course = i.course;
        quizlookup_name = i.name;
        quizlookup_sumgrades = i.sumgrades;
        quizlookup_grade = i.grade;
        
        console.log('=====================================================');
        console.log('----------- QUIZ: '+quizlookup_name+' (ID'+quizlookup_id+') --------------');
        console.log('====================================================');
        // console.log('quizlookup_name: '+quizlookup_name);
        // console.log('quizlookup_id: '+quizlookup_id);
        console.log('quizlookup_course: '+quizlookup_course);
        console.log('quizlookup_sumgrades: '+quizlookup_sumgrades);
        console.log('quizlookup_grade: '+quizlookup_grade);
        console.log('====================================================');
      });
    });
}


/* =======================================
	Get Single Student Details
* ======================================= */

function lumiousreports_single_student_data(){

	console.log('===XXX   BEGIN  lumiousreports_single_student_data  XXX====');

	var selected_course_id = checkLocalStorage('current_course');
	console.log('LOCAL STORAGE current_course ' +selected_course_id);
	
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/' +selected_course_id;
    console.log('STUDENT LOOKUP ' +url_course_students);

    /* ---------------------
    * @FIXME - TEMP hardcode of selected COURSE ID for STUDENTS. Replace with <select><option> value from User Selection 
    * ----------------------
    */
    var current_student_id = 632;
    console.log('SINGLE STUDENT LOOKUP ID ' +current_student_id);
    
    // Set Student Data Variables
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;

    $.getJSON( url_course_students, function( course_students_data ) {

        $.each( course_students_data, function( key, i) {
            student_id = i.id;
            student_firstname = i.firstname;
            student_lastname = i.lastname;
            student_email = i.email;
            student_username = i.username;
            student_firstaccess = i.firstaccess;
            student_lastaccess = i.lastaccess;
            // Only Log details of matched stuent for test
            if (student_id == current_student_id) {
                console.log('************* SINGLE STUDENT TEST *************');
                console.log('student_id: '+student_id);
                console.log('student_firstname: '+student_firstname);
                console.log('student_lastname: '+student_lastname);
                console.log('student_email: '+student_email);
                console.log('student_username: '+student_username);
                console.log('student_firstaccess: '+student_firstaccess);
                console.log('student_lastaccess: '+student_lastaccess);
                console.log('************* SINGLE STUDENT TEST END *************');
            };
        });
    });
}	


/* =======================================
	Get Single Extended Student Details TEST
* ======================================= */

// function lumiousreports_single_student_data_2(){

// 	console.log('===XXX   BEGIN  lumiousreports_single_student_data_2  XXX====');

// 	var selected_course_id = checkLocalStorage('current_course');
// 	console.log('LOCAL STORAGE current_course ' +selected_course_id);
	
// 	// url_student_extended_data = 'http://www.akronzip.com/lumiousreports/studentdata/66';
//     url_student_extended_data = 'https://akronzip.com/studentdata.txt';
//     console.log('STUDENT LOOKUP ' +url_student_extended_data);

//     /* ---------------------
//     * @FIXME - TEMP hardcode of selected COURSE ID for STUDENTS. Replace with <select><option> value from User Selection 
//     * ----------------------
//     */
//     // var current_student_id = 632;
//     // console.log('SINGLE STUDENT LOOKUP ID ' +current_student_id);
    
//     // Set Student Data Variables
//     var student_id = null;
//     var student_firstname = null;
//     var student_lastname = null;
//     var student_email = null;
//     var student_username = null;
//     var student_firstaccess = null;
//     var student_lastaccess = null;

//     $.getJSON( url_student_extended_data, function( course_students_data ) {
//     	console.log('Inside loop');
//     	console.log('course_students_data');
//     	console.log(course_students_data);

//         $.each( course_students_data, function( key, i) {
//             student_id = i.id;
//             student_firstname = i.firstname;
//             student_lastname = i.lastname;
//             student_email = i.email;
//             student_username = i.username;
//             student_firstaccess = i.firstaccess;
//             student_lastaccess = i.lastaccess;
//             // Only Log details of matched stuent for test
//             // if (student_id == current_student_id) {
//                 console.log('************* SINGLE STUDENT TEST *************');
//                 console.log('student_id: '+student_id);
//                 console.log('student_firstname: '+student_firstname);
//                 console.log('student_lastname: '+student_lastname);
//                 console.log('student_email: '+student_email);
//                 console.log('student_username: '+student_username);
//                 console.log('student_firstaccess: '+student_firstaccess);
//                 console.log('student_lastaccess: '+student_lastaccess);
//                 console.log('************* SINGLE STUDENT TEST END *************');
//             // };
//         });
//     });
// }	


/* =======================================
	Get Single Student Extended Data
* ======================================= */

function lumiousreports_single_student_extended_data(){

	console.log('===XXX   BEGIN  lumiousreports_single_student_extended_data  XXX====');
	
	// Set Markup and Endpoint elements
	var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
	widget_quiz_reports.hide();
	widget_quiz_reports_performance.hide();
    
    // Set Student Data Variables
    var student_id = null;
    var student_firstname = null;
    var student_lastname = null;
    var student_email = null;
    var student_username = null;
    var student_firstaccess = null;
    var student_lastaccess = null;
    var student_posts = null;
    var student_instructor_comments = null;
    var student_stress = null;

    var quiz_data_quiz_name_label = null;
	var quiz_data_quiz_name_value = null;

    // Clear the Table
	// dna.empty('results-body-single-extended-0', { fade: true });
	dna.empty('results-body', { fade: true });

    var current_student_id = 94; // @FIXME - need to loop through students
    url_student_extended_data = 'http://www.akronzip.com/lumiousreports/studentdata/' +current_student_id;
    console.log(url_student_extended_data);

	// Get the Data for the single student
    $.getJSON( url_student_extended_data, function( extended_students_data ) {
    	console.log(extended_students_data);

    	var loop_number = 0;

        $.each( extended_students_data, function( key, i) {
        	// Count the loops for debugging
        	loop_number++; console.log('Loop number: '+loop_number);

        	// Get new data from nestled array
        	student_id = i.id;
            student_firstname = i.firstname;
            student_lastname = i.lastname;
            student_email = i.email;
            student_username = i.username;
            student_firstaccess = i.firstaccess;
            student_lastaccess = i.lastaccess;
            // Format Date to be Readable
            if (student_firstaccess != 0) {
            	var firstaccess_dateVal = student_firstaccess;
            	var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');
				var lastaccess_dateVal = student_lastaccess;
				var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');	
            };
           
            // Student Notes Content - get array values, manipulate to clean up and use as comments and stress level
            var student_posts = i.posts;
            var student_stress = null;

            $.each(student_posts, function (index, x) {
            	console.log('comment content: ' +x.content + ' publishstate: ' + x.publishstate );
            	student_instructor_comments = x.content;
				student_instructor_comments_trimmed = student_instructor_comments.trim(); // remove whitespace
				student_instructor_comments_trimmed = student_instructor_comments.substr(2); // remove first 2 digits for stress level
				student_stress = student_instructor_comments.substring(0, 1); // take first 1 digits, use as stress setting
        	});


            /*
			*	Get Student Grade Data
			*	
			*/
	        // Total Student Grade Entries - get array values, count total for debugging
	        	var student_quizgrades = i.quizgrades;
	        	var total_student_quizgrades_count = 0; // Count Student Quiz Grades
	            $.each(student_quizgrades, function (count, value) {
	            	total_student_quizgrades_count++;
	        	});
	        	console.log('total_student_quizgrades_count: ' +total_student_quizgrades_count );

	       	// Student Quiz Grades 
	        	var student_quizgrades_count = 0; // reset count
	        	// Loop through each grade result in the array, set the corresponding data label and ID for the DNA table, set the data values
	        	// This allows us to display all the Quiz results associated with one student
	            $.each(student_quizgrades, function (index, x) {
	            	student_quizgrades_count++;

	            	// Constructed Example: i['QUIZDATA-1']
	            	quiz_data_count_label = "QUIZDATA-"+student_quizgrades_count;

	            	// Construct  i['QUIZDATA-1-ID'] =  x.id
		            	// Data ID
		            	quiz_data_id_label = quiz_data_count_label + "-ID";
		            	quiz_data_id_value = x.id;
		            	i[quiz_data_id_label] = quiz_data_id_value; // set DNA value
		            	// Quiz ID
		            	quiz_data_quiz_label = quiz_data_count_label + "-QUIZ";
		            	quiz_data_quiz_value = x.quiz;
		            	i[quiz_data_quiz_label] = quiz_data_quiz_value; // set DNA value

		            	quiz_data_name_label = quiz_data_count_label + "-QUIZNAME";  console.log('quiz_data_name_label: '+quiz_data_name_label);

		            		// Hit Quiz Endpoint and return the Quiz Name
		            		//
		            		//
		            		//
		            		console.log('===XXX   BEGIN  lumiousreports_get_quiz_details  XXX====');

						    var quizlookup_id = quiz_data_quiz_value;
						    var quizlookup_course = null;
						    var quizlookup_name = null;
						    var quizlookup_sumgrades = null;
						    var quizlookup_grade = null;

						    url_quizlookup = 'http://www.akronzip.com/lumiousreports/quizlookup/' +quizlookup_id; console.log('QUIZ LOOKUP ' +url_quizlookup);

						    $.getJSON( url_quizlookup, function( quizlookup_data ) {
								$.each( quizlookup_data, function( key, x) {
									quizlookup_id = x.id;
									quizlookup_course = x.course;
									var quizlookup_name = x.name;
									quizlookup_sumgrades = x.sumgrades;
									quizlookup_grade = x.grade;

									console.log('=====================================================');
									console.log('----------- QUIZ: '+quizlookup_name+' (ID'+quizlookup_id+') --------------');
									console.log('====================================================');
									console.log('quizlookup_course: '+quizlookup_course);
									console.log('quizlookup_sumgrades: '+quizlookup_sumgrades);
									console.log('quizlookup_grade: '+quizlookup_grade);
									console.log('quiz_data_name_label: '+quiz_data_name_label);
									console.log('quizlookup_name: '+quizlookup_name);
									console.log('====================================================');
								});
						    });
						// @FIXME - not returning??
						i[quiz_data_name_label] = quizlookup_name; // set DNA value

		            	// Quiz Grade
		            	quiz_data_grade_label = quiz_data_count_label + "-GRADE";
		            	quiz_data_grade_value = x.grade;
		            	i[quiz_data_grade_label] = quiz_data_grade_value; // set DNA value
		            	// Quiz Time modified
		            	quiz_data_time_label = quiz_data_count_label + "-TIME";
		            	quiz_data_time_value = x.timemodified;
		            	if (student_firstaccess != 'null') {
			            	var quiz_data_time_value_dateVal = quiz_data_time_value;
			            	var quiz_data_time_value_formatted_date = moment.unix(quiz_data_time_value_dateVal).format('MMMM Do YYYY, h:mm:ss a');
			            };
		            	i[quiz_data_time_label] = quiz_data_time_value_formatted_date; // set DNA value
	            	
	        	});

			// Store Details in DNA table values
	        	console.log('student_id: ' +student_id); // debug
	            console.log('student_firstname '+student_firstname); // debug
	            i['ID'] = student_id;
		        i['FIRSTNAME'] = student_firstname;
		        i['LASTNAME'] = student_lastname;
		        i['EMAIL'] = student_email;
		        i['USERNAME'] = student_username;
		        i['FIRSTACCESS'] = student_firstaccess;
		        i['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
		        i['LASTACCESS'] = student_lastaccess;
		        i['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;
		        i['INSTRUCTORCOMMENTS'] = student_instructor_comments_trimmed;
		        
		        // Add appropriate labels to Stress levels
                switch(student_stress) {
                    case (student_stress >= 6):
                        student_stress = '<span class="student-stress danger label">'+student_stress+'</span>';
                        break;
                    case (student_stress >= 3):
                        student_stress = '<span class="student-stress warning label">'+student_stress+'</span>';
                        break;
                    case (student_stress < 3):
                        student_stress = '<span class="student-stress success label">'+student_stress+'</span>';
                        break;
                    default:
                        '<span class="student-stress label">'+student_stress+'</span>';
                };
                i['STRESS'] = student_stress;
                


			// Student Quiz Attempts
			var bind_result_row = -1;
	        	var student_quizattempts = i.quizattempts;
	            $.each(student_quizattempts, function (index, x) {
	            	bind_result_row++;
	            	console.log('---------');
	            	console.log('quiz id: ' +x.id + ' quiz: ' + x.quiz + ' attempt: ' + x.attempt + ' state: ' + x.state+ ' sumgrades: ' + x.sumgrades );
	            	console.log('---------');
	            	// Bind data to table template
	            	var result_row = 'results-body-single-extended-' +bind_result_row;
            		dna.clone(result_row, i, {html: true, fade: true});
	        	});
    	 	
    	 	// Debug success
	        console.log('Populating Results for Student: ('+student_id+') '+student_firstname +' '+student_lastname);

            
            
            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            studentList.fadeIn();
            
            // add listeners to modal links 
            $('#tbody_quiz_result').on('click', 'a.switch', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var triggered = $(this).attr('gumby-trigger');
                console.log(triggered);
                var student = $(this).parent().parent().find('.student').text();
                var tofield = $(triggered).find('input[name=To]');
                tofield.val(student);
                $(triggered).addClass('active');
            });
            
        });
    });
	studentList.show();
	widget_quiz_reports.show();
	widget_quiz_reports_performance.show();
	
	console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END lumiousreports_single_student_extended_data    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}	


/* =======================================
	Get QUESTIONS Extended Data
* ======================================= */

// function lumiousreports_question_extended_data(){

// 	console.log('===XXX   BEGIN  lumiousreports_question_extended_data  XXX====');

//     // url_student_extended_data = 'http://www.akronzip.com/lumiousreports/studentdata/' +current_student_id;
//     // url_question_extended_data = 'http://www.akronzip.com/questionendpoint.php';

//     console.log('url_question_extended_data');
//     console.log(url_question_extended_data);

//     // Set question Data Variables
//     var question_id = null;
//     var question_course = null;
//     var question_name = null;
//     var question_sumgrades = null;
//     var question_grade = null;
//     var question_questions = null;

// 	$.getJSON( url_question_extended_data, function( extended_questions_data ) {
//     	var loop_number = 0;
//         $.each( extended_questions_data, function( key, i) {
//         	loop_number++;
//         	console.log('Loop number: '+loop_number);
//         // 	// Get new data from nestled array
//             question_id = i.id;
//             question_course = i.course;
//             console.log('question_id: ' +question_id);
//             console.log('question_course '+question_course);
           
//         });
//     });
// 	console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END lumiousreports_question_extended_data    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
// }	

/* =======================================
	Get Single Student QUIZ GRADES
* ======================================= */

function lumiousreports_single_student_quiz_grades_data(){

	console.log('===XXX   BEGIN  lumiousreports_single_student_quiz_grades_data  XXX====');


	// @FIXME - hardcoded student ID 
    var current_student_id = 632;
    url_student_quizgrades = 'http://akronzip.com/lumiousreports/studentquizgrades/' +current_student_id;

    var student_quizgrade_id = null;
    var student_quizgrade_quiz = null;
    var student_quizgrade_grade = null;
    var student_quizgrade_timemodified = null;

    $.getJSON( url_student_quizgrades, function( url_student_quizgrades_data ) {
        
        $.each( url_student_quizgrades_data, function( key, i) {
            student_quizgrade_id = i.id;
            student_quizgrade_quiz = i.quiz;
            student_quizgrade_grade = i.grade;
            student_quizgrade_timemodified = i.timemodified;
            console.log('               ');
            console.log('=====================================================');
            console.log('========   GRADE (student ID: '+current_student_id +')  =========');
            console.log('=====================================================');
            console.log('student_quizgrade_quiz: '+student_quizgrade_quiz);
            console.log('student_quizgrade_grade: '+student_quizgrade_grade);
            console.log('-----------------------------------------------------');
            console.log('student_quizgrade_id: '+student_quizgrade_id);
            console.log('student_quizgrade_timemodified: '+student_quizgrade_timemodified);
            console.log('=====================================================');
            console.log('               ');
            console.log('               ');
        });
    });
}	



/* =======================================
    Get Single Student QUIZ ATTEMPT GRADES
* ======================================= */

function lumiousreports_single_student_quiz_attempt_grades_data(){

    console.log('===XXX   BEGIN  lumiousreports_single_student_quiz_attempt_grades_data  XXX====');

    // @FIXME - hardcoded student ID 
    var current_student_id = 636;

    // New endpoint
    // url_student_quizattempt = 'http://www.akronzip.com/lumiousreports/studentdata/' +current_student_id;
    // Old endpoint
    url_student_quizattempt = 'http://akronzip.com/lumiousreports/studentquizattempts/' +current_student_id;
    console.log('url_student_quizattempt: '+url_student_quizattempt);

    var student_quizattempt_id = null;
    var student_quizattempt_quiz = null;
    var student_quizattempt_userid = null;
    var student_quizattempt_attempt = null;
    var student_quizattempt_sumgrades = null;
    var student_quizattempt_timemodified = null;

    $.getJSON( url_student_quizattempt, function( url_student_quizattempt_data ) {
        
        $.each( url_student_quizattempt_data, function( i, val) {
            student_quizattempt_id = val.id;
            student_quizattempt_quiz = val.quiz;
            student_quizattempt_userid = val.userid;
            student_quizattempt_attempt = val.attempt;
            student_quizattempt_sumgrades = val.grade;
            student_quizattempt_timemodified = val.timemodified;
            console.log('====================================================');
            console.log('========   QUIZ ATTEMPT (student ID: '+student_quizattempt_userid +')  =========');
            console.log('====================================================');
            console.log('student_quizattempt_quiz: '+student_quizattempt_quiz);
            console.log('student_quizattempt_sumgrades: '+student_quizattempt_sumgrades);
            console.log('student_quizattempt_id: '+student_quizattempt_id);
            console.log('student_quizattempt_timemodified: '+student_quizattempt_timemodified);
            // console.log('*** student_quizattempt_userid: '+student_quizattempt_userid +'****');
            console.log('====================================================');
        });
    });
}   
