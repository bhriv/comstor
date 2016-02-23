	
/**
 * Author: Bret Van Horn
 * notes: 1
 */

$( window ).load(function() {

    var user = [];
    user = {
                "id": "628",
                "username": "ben@invitrosocialmedia.com",
                "firstname": "Ben",
                "lastname": "Richards",
                "email": "ben@invitrosocialmedia.com",
                "city": "Los Angeles",
                "country": "US",
                "lang": "en",
                "timezone": "8.0",
                "firstaccess": "1426697383",
                "lastaccess": "1431449532",
                "lastlogin": "1431446607",
                "currentlogin": "1431446768",
                "lastip": "104.35.169.218",
                "picture": "39366",
                "url": "",
                "timecreated": "1426602943",
                "timemodified": "1426699319",
                "posts": [
                  {
                    "id": "47",
                    "module": "notes",
                    "userid": "628",
                    "courseid": "23",
                    "groupid": "0",
                    "moduleid": "0",
                    "coursemoduleid": "0",
                    "subject": "",
                    "summary": null,
                    "content": "Ben Richards Test Student Notes 5-8-15",
                    "uniquehash": "",
                    "rating": "0",
                    "format": "2",
                    "summaryformat": "0",
                    "attachment": null,
                    "publishstate": "draft",
                    "lastmodified": "1431117607",
                    "created": "1431117579",
                    "usermodified": "36"
                  }
                ],
                "quizattempts": [
                  
                ],
                "quizgrades": [
                  
                ]
             };
	// initial vars set solely for showing/hiding menus based on populated values
	var current_cat = checkLocalStorage('current_cat');
	var current_course = checkLocalStorage('current_course');
	var filter_mode = checkLocalStorage('current_filter');
	var actor = user.email; 
	var user_roles = user.roles;

	// console.log(user.roles);

    var base_url = urls.analytics;
    var url_cat = base_url + "lumiousreports/coursecategories/";
    cc('category URL: '+url_cat, 'success');
    var url_course = base_url + "lumiousreports/course";
    var url_quiz = base_url + "lumiousreports/quiz";

    var filter_cat_menu = $('#catfilter');
    var filter_course_menu = $('#coursefilter');
    var filter_quiz_menu = $('#quizfilter');

	// hide the menus, except cat; set filter mode
	if(filter_mode === null || filter_mode === ''){
    	setLocalStorage('filter_mode','');
    }
    if(current_cat !== null && current_cat !== '' && searchRoles('ROLE_STUDENT') === false && searchRoles('ROLE_INSTRUCTOR') === false){
    	setLocalStorage('filter_mode','cat');
    }
    if(current_course === null || current_course === ''){
    	filter_course_menu.fadeOut();
    }else{
    	setLocalStorage('filter_mode','course');
    }
	
	//Populate cat filter menu always
	if(! searchRoles('ROLE_INSTRUCTOR') && ! searchRoles('ROLE_STUDENT') ){
		$.getJSON( url_cat, function( json ) {
			console.log('populating category menu...');
			var selected = "";
			var currentcat = checkLocalStorage('current_cat');
			clearMenu(filter_cat_menu);
			jQuery.each(json, function(i, val) {
				if(currentcat == val.id){
					selected = ' selected="selected"';
					setLocalStorage('current_cat',val.id);
					populateCourseMenu(val.id);
				}else{
					selected = "";
				}
				filter_cat_menu.append('<option value="'+$.trim(val.id)+'" '+selected+'>'+$.trim(val.name)+'</option>');
			});
			
			// @BHRIV
			// after loading the options convert all select boxes into a selectBoxIt display

            // @2016 BHRIV hack
			// $("#catfilter select").selectBoxIt({ 
			// 	autoWidth: false
			// });
			// $("#coursefilter select").selectBoxIt({ 
			// 	autoWidth: false
			// });
			
			// $("#quizfilter select").selectBoxIt({ 
			// 	autoWidth: false
			// });
			
		 });
	}

	// event listener for category menu changes
	filter_cat_menu.on('change',function(){
		console.log('cat changed');
		var thiscat = $(this).val();
		clearMenu(filter_course_menu);
		if(thiscat !== 'NULL' && thiscat > 0){
			setLocalStorage('current_cat',thiscat);
			setLocalStorage('filter_mode','cat');
			populateCourseMenu(thiscat);
		}else{
			setLocalStorage('filter_mode','');
			setLocalStorage('current_cat','');
			setLocalStorage('current_course','');
			filter_course_menu.fadeOut();
		}
	});

	// event listener for course menu changes
	filter_course_menu.on('change',function(){
		var thiscourse = $(this).val();
		if(thiscourse !== 'NULL' && thiscourse > 0){
			setLocalStorage('current_course',thiscourse);
			setLocalStorage('filter_mode','course');
			populateQuizMenu(thiscourse);
		}else{
			setLocalStorage('filter_mode','');
			setLocalStorage('current_cat','');
			setLocalStorage('current_course','');
		}
	});

	// event listener for course menu changes
	filter_quiz_menu.on('change',function(){
		var thisquiz = $(this).val();
		if(thisquiz !== 'NULL' && thisquiz > 0){
			setLocalStorage('current_quiz',thisquiz);
			// setLocalStorage('filter_mode','course');
			// populateQuizMenu(thisquiz);
		}
		// else{
		// 	setLocalStorage('filter_mode','');
		// 	setLocalStorage('current_cat','');
		// 	setLocalStorage('current_course','');
		// 	setLocalStorage('current_quiz','');
		// }
	});

	// report filter event listeners moved from footer-js
	 $('#report-basis-criteria select').on('change', function() {
        var _report_basis_criteria = $(this).val();
        console.log('_report_basis_criteria: ' +_report_basis_criteria);

        switch(_report_basis_criteria) {
            case 'student_based_report':
                $('#student_query').show();
                $('#quiz_query').hide();
                break;
            case 'quiz_based_report':
                $('#student_query').hide();
                $('#quiz_query').show();
                break;
        }
    });

    $('#query-criteria select').on('change', function() {
        var _criteria = $(this).val();
        console.log('criteria: ' +_criteria);

        switch(_criteria) {
            case 'access':
                $('#query-show-students-access').show();
                $('#query-show-students-performance').hide();
                $('#report_results_holder').hide();
                break;
            case 'performance':
                $('#query-show-students-access').hide();
                $('#query-show-students-performance').show();
                $('#report_results_holder').hide();
                break;
        }
    });

    $('#report-type select').on('change', function() {
        var _report_type = $(this).val();
        console.log('report type: ' +_report_type);

        switch(_report_type) {
            case 'student-report':
                $('#query-show-students-report').show();
                $('#query-show-questions-report').hide();
                $('#query-show-subjects-report-report').hide();
                break;
            case 'question-report':
                $('#query-show-students-report').hide();
                $('#query-show-questions-report').show();
                $('#query-show-subjects-report-report').hide();
                break;
            case 'subject-report':
                $('#query-show-students-report').hide();
                $('#query-show-questions-report').hide();
                $('#query-show-subjects-report-report').show();
                break;
        }
    });

    $('#report-basis-criteria select').on('change', function() {
        var _report_basis_criteria = $(this).val();
        console.log('_report_basis_criteria: ' +_report_basis_criteria);

        switch(_report_basis_criteria) {
            case 'student_based_report':
                $('#query-show-students-report').show();
                $('#query-show-questions-report').hide();
                $('#query-show-subjects-report-report').hide();
                break;
            case 'quiz_based_report':
                $('#query-show-students-report').hide();
                $('#query-show-questions-report').show();
                $('#query-show-subjects-report-report').hide();
                break;
            case 'subject-report':
                $('#query-show-students-report').hide();
                $('#query-show-questions-report').hide();
                $('#query-show-subjects-report-report').show();
                break;
        }
    });

    $('#query-show-students-access select').on('change', function() {
        var _query_show_students_access = $(this).val();
        console.log('_query_show_students_access: ' +_query_show_students_access);

		filterFunction(_query_show_students_access);

		$('#report_results_holder').show();
        /*switch(_query_show_students_access) {
            case 'all_students':
                $('#report_results_holder').show();
                $('#all_students_result').show();
                $('#students_who_havent_logged_in_yet_result').hide();
                $('#students_who_have_logged_in').hide();
                break;

            case 'show_students_that_have_logged_in':
                $('#report_results_holder').show();
                $('#all_students_result').show();
                $('#students_who_havent_logged_in_yet_result').hide();
                $('#students_who_have_logged_in').hide();
                break;

            case 'show_students_that_have_not_logged_in':
                $('#report_results_holder').show();
                $('#all_students_result').hide();
                $('#students_who_havent_logged_in_yet_result').show();
                $('#students_who_have_logged_in').hide();
                break;

            case 'show_students_that_have_not_logged_in_two_days_before_start_date':
                $('#report_results_holder').show();
                $('#all_students_result').hide();
                $('#students_who_havent_logged_in_yet_result').hide();
                $('#students_who_have_logged_in').show();
                break;

            case 'show_students_that_have_not_logged_in_two_days_before_start_date':
                $('#report_results_holder').show();
                $('#all_students_result').hide();
                $('#students_who_havent_logged_in_yet_result').hide();
                $('#students_who_have_logged_in').show();
                break;
        }*/
    });

    $('#query-show-students-performance select').on('change', function() {
        $('#loading_gif').show();
        $('#concatenated-results').hide();
        $('#report_results_holder').hide(); 

        console.log('SELECT menu changed');
        var selected_course_id = checkLocalStorage('current_course');
        console.log('LOCAL STORAGE current_course ' +selected_course_id);

        var _query_show_students_performance = $(this).val();
        console.log('_query_show_students_performance: ' +_query_show_students_performance);
        
        // var parent_data_id_value = $(this).data('id');
        var selected_data_id_value = $(this).find(':selected').data('id');
        console.log('selected_data_id_value: ' +selected_data_id_value);
        console.log(!isNaN(selected_data_id_value));
        if (!isNaN(selected_data_id_value)) {
            console.log('selected_data_id_value is NUMBER');
            if (selected_data_id_value == 0 ) { // 0 = 'All Results'
                console.log('SELECTION = 0; concatenated_results ');
                _query_show_students_performance = 'concatenated_results';    
            }else{
                console.log('SELECTION != 0; concatenated_results ')
                _query_show_students_performance = 'concatenated_results';    
                // _query_show_students_performance = 'show_all_students_with_selected_attempt';    
            }
            $('#loading_gif').show();
            $('#report_results_holder').hide();
        }
        else{
            $('#concatenated-results').show();
            $('#report_results_holder').show();    
        }
        filterFunction(_query_show_students_performance);
    });


    $('#query-show-questions-report select').on('change', function() {
        var _query_show_questions_report = $(this).val();
        console.log('_query_show_questions_report: ' +_query_show_questions_report);

        filterFunction(_query_show_questions_report);

		$('#report_results_holder').show();

       /* switch(_query_show_students_performance) {
            case '1':
                $('#report_results_holder').show();
                $('#students_who_are_doing_well_on_prework').show();
                $('#students_who_are_not_doing_well_on_prework').hide();
                
                break;
            case '2':
                $('#report_results_holder').show();
                $('#students_who_are_doing_well_on_prework').hide();
                $('#students_who_are_not_doing_well_on_prework').show();
                break;
        }*/
    });


	// function to query localstorage for a given variable
	function checkLocalStorage(item){
		var thisitemval = JSON.parse(localStorage.getItem(item));
		// if local storage empty
		if(thisitemval === null){
			return '';
		}else{
			return thisitemval;
		}
	}

	// function to set localstorage for a given variable
	function setLocalStorage(item,val){
		localStorage.setItem( item, JSON.stringify(val) );
	}

	// function to clear a select menu
	function clearMenu(menu){
		menu.find('option').remove();
		menu.append('<option value="NULL">ALL</option>');
	}

    
    
	// function to search roles array for specific role
	function searchRoles(role){
    // TEMP
		// if(user_roles.indexOf(role) > -1){
		// 	return true;
		// }else{
		// 	return false;
		// }
	}

	// abstract function to select an item from a given select menu
	function staticMenuSelect(sel, item){
		$(sel).val(item);
	}

	// export searchRoles function
	window.searchRoles = searchRoles;

	// populate course menu options
	function populateCourseMenu(catid){
		thisurl = url_course+'/'+catid;
		console.log('populating course menu for category '+catid);
		$.getJSON(thisurl, function( json ) {
			var selected = "";
			var currentcourse = checkLocalStorage('current_course');	
			clearMenu(filter_course_menu);
			jQuery.each(json, function(i, val) {
				//console.log('results loop');
				cid = val.id;
				cname = val.fullname;
				sdate = val.startdate;
				if(currentcourse == cid){
					selected = ' selected="selected"';
					setLocalStorage('current_course',cid);
					//populateBasisMenu();
				}else{
					selected = "";
				}
				var menustr = '<option value="'+$.trim(cid)+'" '+selected+' data-startdate="'+sdate+'">';
					menustr += '<span data-fullname="'+$.trim(cname)+'">'+$.trim(cname)+'</span>';
                	menustr += '</option>';

				filter_course_menu.append(menustr);
			});

			filter_course_menu.fadeIn();

		});
	}

	// populate quiz menu options
	function populateQuizMenu(courseid){
		var thisurl = url_quiz + '/' + courseid;
		console.log('populating quiz menu for course '+courseid);
		$.getJSON(thisurl, function( json ) {
			var currentcourse = checkLocalStorage('current_course');	
			clearMenu(filter_quiz_menu);
			jQuery.each(json, function(i, val) {
				qid = val.id;
				qname = val.name;
				var menustr = '<option value="'+$.trim(qid)+'">'+$.trim(qname)+'</option>';
				filter_quiz_menu.append(menustr);
			});
			
		});
	}
	// export checkLocalStorage function
	window.checkLocalStorage = checkLocalStorage;
});

/* =======================================
    Call Filter Function
* ======================================= */
function filterFunction(fname){
    this[fname].call(this);
}

window.filterFunction = filterFunction;

function findStudentByID(arr,sid){
    var result = $.grep(arr, function(e){ return e.id == sid; });
    console.log("Student Search Result: ");
    console.log(result);
    if(result){
        return result;
    }else{
        return false;
    }
}

function findQuizByID(arr,qid){
    var result = $.grep(arr, function(e){ return e.id == qid; });
    console.log("Quiz Search Result: ");
    console.log(result);
    if(result){
        return result;
    }else{
        return false;
    }
}

function findCourseByID(arr,cid){
    var result = $.grep(arr, function(e){ return e.id == cid; });
    console.log("Course Search Result: ");
    console.log(result);
    if(result){
        return result;
    }else{
        return false;
    }
}

// Pass quiz array and single quiz ID, return full quiz details
function findQuizByID(arr,qid){
    var result = $.grep(arr, function(e){ return e.id == qid; });
    console.log("Quiz Search Result: ");
    console.log(result);
    if(result){
        return result;
    }else{
        return false;
    }
}

function findCourseByID(arr,cid){
    var result = $.grep(arr, function(e){ return e.id == cid; });
    console.log("Course Search Result: ");
    console.log(result);
    if(result){
        return result;
    }else{
        return false;
    }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function get_endpoint_data(){
    console.log('===XXXXXX    BEGIN  get_endpoint_data   XXXXX====');
    // POPULATE DATA to RESULTS TABLE
    var selected_course_id = checkLocalStorage('current_course');
    console.log('LOCAL STORAGE current_course ' +selected_course_id);
        // Pass the data value of the selected option to the concatenated 
    var selected_data_id_value = $('#performancefilter').find(':selected').data('id');
    console.log('selected_data_id_value: ' +selected_data_id_value);

    // Set Markup and Endpoint elements
    var studentList = $('#student-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    
    // ajax URLs
    // url_course_students = 'http://www.akronzip.com/lumiousreports/students/'+selected_course_id;
    // url_course_quiz = 'http://www.akronzip.com/lumiousreports/quiz/'    +selected_course_id;
    // url_quiz_attempts = 'http://www.akronzip.com/lumiousreports/quizattempts/'+selected_course_id;
    // url_student_data = 'http://www.akronzip.com/lumiousreports/studentdata/';

    var reports_url = urls.analytics;

    url_course_students = reports_url + 'students/'+selected_course_id;
    url_course_quiz = reports_url + 'quiz/'    +selected_course_id;
    url_quiz_attempts = reports_url + 'quizattempts/'+selected_course_id;
    url_student_data = reports_url + 'studentdata/';
    
    // store results from these static URLs as objects to use with promises
    var students = $.getJSON(url_course_students);
    var quizzes = $.getJSON(url_course_quiz);
    var attempts = $.getJSON(url_quiz_attempts);
    return { // return array of data including labels for access
        students: students,
        quizzes: quizzes,
        attempts: attempts
    }; 
}


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
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/'+selected_course_id;
    url_student_data = 'http://www.akronzip.com/lumiousreports/studentdata/';

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
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/' +selected_course_id;

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
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/' +selected_course_id;

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
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/' +selected_course_id;
    
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
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/' +selected_course_id;

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
    url_course_quiz = 'http://www.akronzip.com/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://www.akronzip.com/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://www.akronzip.com/lumiousreports/studentdata/';

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
    url_course_quiz = 'http://www.akronzip.com/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://www.akronzip.com/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://www.akronzip.com/lumiousreports/studentdata/';

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
    url_course_quiz = 'http://www.akronzip.com/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://www.akronzip.com/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://www.akronzip.com/lumiousreports/studentdata/';

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
    url_course_quiz = 'http://www.akronzip.com/lumiousreports/quiz/'    +selected_course_id;
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/'+selected_course_id;
    url_quiz_attempts = 'http://www.akronzip.com/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://www.akronzip.com/lumiousreports/studentdata/';

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






/* =======================================
    Show All Single Question Data
* ======================================= */

function show_all_single_question_data(){

    var studentList = $('#question-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    var widget_question_reports = $('#widget-question-reports');

    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_all_single_question_data   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_quiz_id = $('#quizfilter').val();

    console.log('Current Quiz: ' +selected_quiz_id);
    
    // ajax URL
    var url_questions = 'http://www.akronzip.com/lumiousreports/quizquestionscores/'+selected_quiz_id;

    // question variables
    var qid = null;
    var qtext = null;
    var qgrade = null;
    var qattempts = null;

    // store results from these static URLs as objects to use with promises
    var questions = $.getJSON(url_questions);

    // wait for student ajax request to complete before we proceed
    $.when(questions).done(function(questionobject) {

        // dig down to the responseText object
        //var s = $.parseJSON(studentobject[1]);

        console.info("Question Data for Quiz " + selected_quiz_id);
        console.info(questionobject);

        // reset the Results table
        // dna.empty('results-body', { fade: true });
        dna.empty('results-body-questions', { fade: true });

        // loop through the student object
        jQuery.each(questionobject, function(i, qdata) {

            qid = qdata.id;
            qgrade = qdata.grade;
            qattempts = qdata.attempts;
            qtext = qdata.questiontext;
            if (qdata.questiontext == null ) {
                qtext = '<span class="content_not_available">Content not available.</span>';
            }
            console.log(qdata);
            
            // show all questions

            qgrade = qgrade*100;
            grade_percentage = Math.round(qgrade);
            // Add appropriate labels to Grades
            if (grade_percentage < 60) {grade_percentage = '<span class="student-stress danger label">'+grade_percentage+'</span>';};
            if (grade_percentage < 75) {grade_percentage = '<span class="student-stress warning label">'+grade_percentage+'</span>';};
            if (grade_percentage >= 75) {grade_percentage = '<span class="student-stress success label">'+grade_percentage+'</span>';};
            
            // Prepare DNA data    
            qdata['ID'] = qid;
            qdata['AVERAGEGRADE'] = grade_percentage;
            qdata['TOTALATTEMPTS'] = qattempts;
            qdata['QUESTIONCONTENT'] = qtext;
            
            // Bind data to table template
            dna.clone('results-body-questions', qdata, {html: true, fade: true});
            
            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            
        });
    });

    $('#loading_gif').hide();
    studentList.fadeIn();
    studentList.show();
    widget_question_reports.show();
    
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_all_single_question_data    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
  
}


/* =======================================
    Show Questions That the Majority of Students Pass
* ======================================= */

function show_questions_that_the_majority_of_students_pass(){

    var studentList = $('#question-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    var widget_question_reports = $('#widget-question-reports');

    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_questions_that_the_majority_of_students_pass   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_quiz_id = $('#quizfilter').val();

    console.log('Current Quiz: ' +selected_quiz_id);
    
    // ajax URL
    var url_questions = 'http://www.akronzip.com/lumiousreports/quizquestionscores/'+selected_quiz_id;

    // question variables
    var qid = null;
    var qtext = null;
    var qgrade = null;
    var qattempts = null;

    // store results from these static URLs as objects to use with promises
    var questions = $.getJSON(url_questions);

    // wait for student ajax request to complete before we proceed
    $.when(questions).done(function(questionobject) {

        // dig down to the responseText object
        //var s = $.parseJSON(studentobject[1]);

        console.info("Question Data for Quiz " + selected_quiz_id);
        console.info(questionobject);

        // reset the Results table
        // dna.empty('results-body', { fade: true });
        dna.empty('results-body-questions', { fade: true });

        // loop through the student object
        jQuery.each(questionobject, function(i, qdata) {

            qid = qdata.id;
            qgrade = qdata.grade;
            qattempts = qdata.attempts;
            qtext = qdata.questiontext;
            if (qdata.questiontext == null ) {
                qtext = '<span class="content_not_available">Content not available.</span>';
            }
            console.log(qdata);

            
            // only show questions above pass grade
            if (qgrade >= 0.50) {

                qgrade = qgrade*100;
                grade_percentage = Math.round(qgrade);
                // Add appropriate labels to Grades
                if (grade_percentage < 60) {grade_percentage = '<span class="student-stress danger label">'+grade_percentage+'</span>';};
                if (grade_percentage < 75) {grade_percentage = '<span class="student-stress warning label">'+grade_percentage+'</span>';};
                if (grade_percentage >= 75) {grade_percentage = '<span class="student-stress success label">'+grade_percentage+'</span>';};
                
                // Prepare DNA data    
                qdata['ID'] = qid;
                qdata['AVERAGEGRADE'] = grade_percentage;
                qdata['TOTALATTEMPTS'] = qattempts;
                qdata['QUESTIONCONTENT'] = qtext;
                
                // Bind data to table template
                dna.clone('results-body-questions', qdata, {html: true, fade: true});
                
                // Update table so sorting works after ajax call
                $("#sortable").trigger("update"); 
            };
            
        });
    });

    $('#loading_gif').hide();
    studentList.fadeIn();
    studentList.show();
    widget_question_reports.show();
    
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_questions_that_the_majority_of_students_pass    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
  
}



/* =======================================
    Show Questions That the Majority of Students Do Not Pass
* ======================================= */

function show_questions_that_the_majority_of_students_do_not_pass(){

    var studentList = $('#question-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    var widget_question_reports = $('#widget-question-reports');

    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_questions_that_the_majority_of_students_do_not_pass   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_quiz_id = $('#quizfilter').val();

    console.log('Current Quiz: ' +selected_quiz_id);
    
    // ajax URL
    var url_questions = 'http://www.akronzip.com/lumiousreports/quizquestionscores/'+selected_quiz_id;

    // question variables
    var qid = null;
    var qtext = null;
    var qgrade = null;
    var qattempts = null;

    // store results from these static URLs as objects to use with promises
    var questions = $.getJSON(url_questions);

    // wait for student ajax request to complete before we proceed
    $.when(questions).done(function(questionobject) {

        // dig down to the responseText object
        //var s = $.parseJSON(studentobject[1]);

        console.info("Question Data for Quiz " + selected_quiz_id);
        console.info(questionobject);

        // reset the Results table
        // dna.empty('results-body', { fade: true });
        dna.empty('results-body-questions', { fade: true });

        // loop through the student object
        jQuery.each(questionobject, function(i, qdata) {

            qid = qdata.id;
            qgrade = qdata.grade;
            qattempts = qdata.attempts;
            qtext = qdata.questiontext;
            if (qdata.questiontext == null ) {
                qtext = '<span class="content_not_available">Content not available.</span>';
            }
            console.log(qdata);

            
            // only show questions above pass grade
            if (qgrade < 0.50) {

                qgrade = qgrade*100;
                grade_percentage = Math.round(qgrade);
                // Add appropriate labels to Grades
                if (grade_percentage < 60) {grade_percentage = '<span class="student-stress danger label">'+grade_percentage+'</span>';};
                if (grade_percentage < 75) {grade_percentage = '<span class="student-stress warning label">'+grade_percentage+'</span>';};
                if (grade_percentage >= 75) {grade_percentage = '<span class="student-stress success label">'+grade_percentage+'</span>';};
                
                // Prepare DNA data    
                qdata['ID'] = qid;
                qdata['AVERAGEGRADE'] = grade_percentage;
                qdata['TOTALATTEMPTS'] = qattempts;
                qdata['QUESTIONCONTENT'] = qtext;

                // Bind data to table template
                dna.clone('results-body-questions', qdata, {html: true, fade: true});
                
                // Update table so sorting works after ajax call
                $("#sortable").trigger("update"); 
            };
            
        });
    });

    $('#loading_gif').hide();
    studentList.fadeIn();
    studentList.show();
    widget_question_reports.show();
    
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_questions_that_the_majority_of_students_do_not_pass    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
  
}


 

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
                url_student_extended_data = 'http://www.akronzip.com/lumiousreports/studentdata/' +student_id;
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

