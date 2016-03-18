	
/**
 * Author: Bret Van Horn
 * notes: 1
 */

$( window ).load(function() {

	// initial vars set solely for showing/hiding menus based on populated values
	var current_plan = checkLocalStorage('current_plan');
	var current_course = checkLocalStorage('current_course');
	var current_session = checkLocalStorage('current_session');
	var current_actor = checkLocalStorage('current_actor');
	var filter_mode = checkLocalStorage('filter_mode');
	var actor = user.email; 
	var user_roles = user.roles;

	console.log(user.roles);

	var base_url = urls.analytics;
    var url_plan = base_url + "plan";
    var url_course = base_url + "courseplan";
    var url_course_info = base_url + "course";
    var url_session = base_url + "course/session";
    var url_actor = base_url + "session/actors";
    var url_teacher_session = base_url + "teacher/sessions";

    var filter_plan = $('#planfilter');
    var filter_course = $('#coursefilter');
    var filter_session = $('#sessionfilter');
    var filter_actor = $('#actorfilter');
    var filter_plan_menu = $('#planfilter select');
    var filter_course_menu = $('#coursefilter select');
    var filter_session_menu = $('#sessionfilter select');
    var filter_actor_menu = $('#actorfilter select');

	// override default filters based on user roles
	if(searchRoles('ROLE_MANAGER')){
		// temporarily hardcoding this for demo/testing
		planid = '';
		current_plan = planid;
		setLocalStorage('current_plan',planid);
		courseid = '';
		current_course = courseid;
		setLocalStorage('current_course',courseid);
		sessionid = '';
		current_session = sessionid;
		setLocalStorage('current_session',sessionid);
		actorid = '';
		current_actor = '';
		setLocalStorage('current_actor',actorid);
		filter_mode = '';
		setLocalStorage('filter_mode',filter_mode);
		//populateSessionMenu(courseid);
		renderDash();
	}

	// override default filters based on user roles
	if(searchRoles('ROLE_INSTRUCTOR')){
		// temporarily hardcoding this for demo/testing
		planid = '';
		current_plan = planid;
		setLocalStorage('current_plan',planid);
		courseid = '';
		current_course = courseid;
		setLocalStorage('current_course',courseid);
		sessionid = '';
		current_session = sessionid;
		setLocalStorage('current_session',sessionid);
		actorid = '';
		current_actor = '';
		setLocalStorage('current_actor',actorid);
		filter_mode = 'courseplan';
		setLocalStorage('filter_mode',filter_mode);
		populateCourseMenu(planid);
		//populateSessionMenu(courseid);
		renderDash();
	}

	if(searchRoles('ROLE_STUDENT')){
		// awaiting sample data
		// temporarily hardcoding this for demo/testing
		planid = '';
		current_plan = planid;
		setLocalStorage('current_plan',planid);
		courseid = '';
		current_course = courseid;
		setLocalStorage('current_course',courseid);
		actorid = actor;
		current_actor = actorid;
		setLocalStorage('current_actor',actorid);
		sessionid = '';
		current_session = sessionid;
		setLocalStorage('current_session',sessionid);
		filter_mode = 'actorplan';
		setLocalStorage('filter_mode',filter_mode);
		//populateCourseMenu();
		renderDash();
	}

	// hide the menus, except plan; set filter mode
	if(filter_mode === null || filter_mode === ''){
    	setLocalStorage('filter_mode','');
    }
    if(current_plan !== null && current_plan !== '' && searchRoles('ROLE_STUDENT') === false && searchRoles('ROLE_INSTRUCTOR') === false){
    	setLocalStorage('filter_mode','plan');
    }
    if(current_course === null || current_course === ''){
    	filter_course.fadeOut();
    	//setLocalStorage('filter_mode','plan');
    }else{
    	populateSessionMenu(current_course);
    	setLocalStorage('filter_mode','courseplan');
    }
    if(current_session === null || current_session === '' && searchRoles('ROLE_STUDENT') === false){
    	filter_session.fadeOut();
    	//setLocalStorage('filter_mode','courseplan');
    }else{
    	populateActorMenu(current_session);
    	setLocalStorage('filter_mode','sessionplan');
    }
    if(current_actor === null || current_actor === '' && searchRoles('ROLE_STUDENT') === false){
    	filter_actor.fadeOut();
    	//setLocalStorage('filter_mode','sessionplan');
	}else{
		setLocalStorage('filter_mode','actorplan');
	}

	//Populate plan filter menu always
	if(! searchRoles('ROLE_INSTRUCTOR') && ! searchRoles('ROLE_STUDENT') ){
		$.getJSON( url_plan, function( json ) {
			
			var selected = "";
			var currentplan = checkLocalStorage('current_plan');

			clearMenu(filter_plan_menu);
			 
			jQuery.each(json, function(i, val) {

				if(currentplan == val.ID){
					selected = ' selected="selected"';
					setLocalStorage('current_plan',val.ID);
					populateCourseMenu(val.ID);
				}else{
					selected = "";
				}
				filter_plan_menu.append('<option value="'+$.trim(val.ID)+'" '+selected+'>'+$.trim(val.name)+'</option>');
			});

			renderDash();
			if($('#messages-inbox').length){
				tmpurl = mailPrep();
				checkMail(tmpurl);
			}
			// @BHRIV
			// after loading the options convert all select boxes into a selectBoxIt display
			$("#planfilter select").selectBoxIt({ 
				autoWidth: false
			});
			$("#coursefilter select").selectBoxIt({ 
				autoWidth: false
			});
			$("#sessionfilter select").selectBoxIt({ 
				autoWidth: false
			});

			// @BHRIV TEMP
			/*$("#actorfilter select").selectBoxIt({ 
				autoWidth: false
			});*/
			// $("#customfilter select").selectBoxIt({ 
			// 	autoWidth: false
			// });
			
		 });
	}

	if(! searchRoles('ROLE_INSTRUCTOR') && ! searchRoles('ROLE_STUDENT')){
		// event listener for plan menu changes
		filter_plan_menu.on('change',function(){
			var thisplan = $(this).val();
			clearMenu(filter_course_menu);
			clearMenu(filter_session_menu);
			clearMenu(filter_actor_menu);
			if(thisplan !== 'NULL' && thisplan > 0){
				setLocalStorage('current_plan',thisplan);
				setLocalStorage('filter_mode','plan');
				populateCourseMenu(thisplan);

				filter_session.fadeOut();
				filter_actor.fadeOut();
			}else{
				setLocalStorage('filter_mode','');
				setLocalStorage('current_plan','');
				setLocalStorage('current_course','');
				setLocalStorage('current_session','');
				setLocalStorage('current_actor','');
				filter_course.fadeOut();
				filter_session.fadeOut();
				filter_actor.fadeOut();
			}
			renderDash();
			if($('#messages-inbox').length){
				tmpurl = mailPrep();
				checkMail(tmpurl);
			}
		});
	}

	//if(! searchRoles('ROLE_INSTRUCTOR')){
		// event listener for course menu changes
		filter_course_menu.on('change',function(){
			var thiscourse = $(this).val();
			clearMenu(filter_session_menu);
			clearMenu(filter_actor_menu);
			if(thiscourse !== 'NULL' && thiscourse > 0){
				setLocalStorage('current_course',thiscourse);
				setLocalStorage('filter_mode','courseplan');
				populateSessionMenu(thiscourse);
				filter_actor.fadeOut();
				// BHRIV refresh table to filter student names
				getAllStudentsInCourse(thiscourse);
			}else{
				setLocalStorage('current_course','');
				setLocalStorage('current_session','');
				setLocalStorage('current_actor','');
				setLocalStorage('filter_mode','plan');
				filter_session.fadeOut();
				filter_actor.fadeOut();
			}
			renderDash();
			if($('#messages-inbox').length){
				tmpurl = mailPrep();
				checkMail(tmpurl);
			}
		});
	//}

	if(! searchRoles('ROLE_STUDENT')){
		// event listener for session menu changes
		filter_session_menu.on('change',function(){
			var thissession = $(this).val();
			clearMenu(filter_actor_menu);
			if(thissession !== 'NULL' && thissession > 0){
				setLocalStorage('current_session',thissession);
				setLocalStorage('filter_mode','sessionplan');
				populateActorMenu(thissession);
			}else{
				setLocalStorage('filter_mode','courseplan');
				setLocalStorage('current_session','');
				setLocalStorage('current_actor','');
				filter_actor.fadeOut();
			}
			renderDash();
			if($('#messages-inbox').length){
				tmpurl = mailPrep();
				checkMail(tmpurl);
			}
		});
	}

	if(! searchRoles('ROLE_STUDENT')){
		// event listener for learner menu changes
		filter_actor_menu.on('change',function(){
			var thisactor = $(this).val();
			if(thisactor !== 'NULL' && thisactor !== ""){
				setLocalStorage('current_actor',thisactor);
				setLocalStorage('filter_mode','actorplan');
			}else{
				setLocalStorage('current_actor','');
				setLocalStorage('filter_mode','sessionplan');
			}
			renderDash();
			tmpurl = mailPrep();
			checkMail(tmpurl);
		});
	}

	if(searchRoles('ROLE_STUDENT')){
		console.log("student");

		// Hide on Change
		filter_plan.hide();
		filter_course.hide();
		filter_actor.hide();
		filter_session.hide();
	}

	if(searchRoles('ROLE_INSTRUCTOR')){
		console.log("instructor");
		// Hide on Change
		filter_plan.hide();
	}

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

	function clearMenu(menu){
		menu.find('option').remove();
		menu.append('<option value="NULL">ALL</option>');
	}

	// function to search roles array for specific role
	function searchRoles(role){
		if(user_roles.indexOf(role) > -1){
			return true;
		}else{
			return false;
		}
	}

	window.searchRoles = searchRoles;

	// listener to clear out filters on logout
	// temporary fix to support multiple users in same browser
	$('#signout').on('click', function(){
	  setLocalStorage('current_plan','');
	  setLocalStorage('current_course','');
	  setLocalStorage('current_session','');
	  setLocalStorage('current_actor','');
	  setLocalStorage('filter_mode','');
	});

	// populate course menu options
	function populateCourseMenu(pid){
		//if(! searchRoles('ROLE_INSTRUCTOR')){
			if(searchRoles('ROLE_STUDENT')){
				thisurl = base_url+"actorcourses/"+actor;
			}else if(searchRoles('ROLE_INSTRUCTOR')){
				thisurl = base_url+"teacher/courses/"+actor;
			}else{
				thisurl = url_course+'/'+pid;
			}
			$.getJSON(thisurl, function( json ) {
				
				var selected = "";
				var currentcourse = checkLocalStorage('current_course');	

				clearMenu(filter_course_menu);

				console.log(json);
				
				jQuery.each(json, function(i, val) {
					if(searchRoles('ROLE_STUDENT')){
						cid = val.CourseID;
						cname = val.CourseName;
					}else if(searchRoles('ROLE_INSTRUCTOR')){
						cid = val.ID;
						cname = val.name;
					}else{
						cid = val.courseID;
						cname = val.name;
					}
					if(currentcourse == cid){
						selected = ' selected="selected"';
						setLocalStorage('current_course',cid);
						populateSessionMenu(cid);
					}else{
						selected = "";
					}
					filter_course_menu.append('<option value="'+$.trim(cid)+'" '+selected+'>'+$.trim(cname)+'</option>');
				});
				// @BHRIV
				$("#coursefilter select").selectBoxIt({ 
					autoWidth: false,
					hideCurrent: false,
					showEffect: "fadeIn",
					showEffectSpeed: 400
				});
				
				// When the user selects a different option, rebuild options
				var selectBox = $("#coursefilter select").data("selectBox-selectBoxIt");
				selectBox.refresh(); // Chaining method of repopulating the course data
				// end @BHRIV

				filter_course.fadeIn();

			});
		//}
	}

	// populate session menu options
	function populateSessionMenu(sid){
		if(! searchRoles('ROLE_STUDENT')){

			if(searchRoles('ROLE_INSTRUCTOR')){
				thisurl = url_teacher_session +'/'+actor;
			}else{
				thisurl = url_session +'/'+sid;
			}
			console.log(thisurl);

			$.getJSON(thisurl, function( json ) {
				
				var selected = "";
				var currentsession = checkLocalStorage('current_session');		

				clearMenu(filter_session_menu);

				filter_session_menu.find('option').remove();
				filter_session_menu.append('<option value="NULL">ALL</option>');

				jQuery.each(json, function(i, val) {
					if(currentsession == val.ID){
						selected = ' selected="selected"';
						setLocalStorage('current_session',val.ID);
						populateActorMenu(val.ID);
					}else{
						selected = "";
					}
					filter_session_menu.append('<option value="'+$.trim(val.ID)+'" '+selected+'>'+$.trim(val.session_name)+'</option>');
				});
				// @BHRIV
				$("#sessionfilter select").selectBoxIt({ 
					autoWidth: false,
					hideCurrent: false,
					showEffect: "fadeIn",
					showEffectSpeed: 400
				});
				// When the user selects a different option, rebuild options
				var selectBox = $("#sessionfilter select").data("selectBox-selectBoxIt");
				selectBox.refresh(); // Chaining method of repopulating the course data
				
				// end @BHRIV
				filter_session.fadeIn();

			});
		}
	}

	// populate learner menu options
	function populateActorMenu(sid){
		if(! searchRoles('ROLE_STUDENT')){
			filter_actor.hide();
			$.getJSON(url_actor +'/'+sid, function( json ) {
				
				var selected = "";
				var currentactor = checkLocalStorage('current_actor');	

				clearMenu(filter_actor_menu);

				filter_actor_menu.find('option').remove();
				filter_actor_menu.append('<option value="NULL">ALL</option>');
				
				console.log("actors: "+json);


				jQuery.each(json, function(i, val) {
					if(currentactor == val.ACTOR){
						selected = ' selected="selected"';
						setLocalStorage('current_actor',val.ACTOR);
					}else{
						selected = "";
					}
					filter_actor_menu.append('<option value="'+$.trim(val.ACTOR)+'" '+selected+'>'+$.trim(val.ACTOR)+'</option>');
				});

				// @BHRIV
				// alert('populateActorMenu fired');
				/*$("#actorfilter select").selectBoxIt({ 
					autoWidth: false,
					hideCurrent: false,
					showEffect: "fadeIn",
					showEffectSpeed: 400
				});*/
				// When the user selects a different option, rebuild options
				//var selectBox = $("#actorfilter select").data("selectBox-selectBoxIt");
				//selectBox.refresh(); // Chaining method of repopulating the course data
				
				// end @BHRIV
				// selectBox.refresh(); // Chaining method of repopulating the course data
				
				filter_actor.fadeIn();
			});
		}
	}
});