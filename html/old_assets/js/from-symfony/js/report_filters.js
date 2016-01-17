	
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

	console.log(user.roles);

    // var base_url = urls.analytics;
    
	var base_url = 'http://akronzip.com/';
    var url_cat = base_url + "lumiousreports/coursecategories";
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
			$("#catfilter select").selectBoxIt({ 
				autoWidth: false
			});
			$("#coursefilter select").selectBoxIt({ 
				autoWidth: false
			});
			
			$("#quizfilter select").selectBoxIt({ 
				autoWidth: false
			});
			
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
    url_course_students = 'http://www.akronzip.com/lumiousreports/students/'+selected_course_id;
    url_course_quiz = 'http://www.akronzip.com/lumiousreports/quiz/'    +selected_course_id;
    url_quiz_attempts = 'http://www.akronzip.com/lumiousreports/quizattempts/'+selected_course_id;
    url_student_data = 'http://www.akronzip.com/lumiousreports/studentdata/';
    
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
