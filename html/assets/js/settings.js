// Moved here from the head.
FpJsFormValidator.config = {'routing':{'check_unique_entity':null}};

/**
 * Author: Bret Van Horn
 * 
 */
$( document ).ready(function() {
	
	var base_url = urls.analytics;
    cc('base_url: '+base_url,'info');
    var user_roles = user.roles;
//	var base_url = "http://akronzip.com/";
	var url_activelearners = base_url + "activelearners";
	var url_challenges = base_url + "challenges";
	var url_remediations = base_url +"remediations";
	
	var url_alerts = base_url + "alerts";
	var url_openalerts = base_url +"openalerts";
	
	var url_activitygraph = base_url + "activitygraph";
	var url_usergraph = base_url +"usergraph";
	var url_messagegraph = base_url + "messagegraph";
	
	var url_plan = base_url + "plan";

	var url_activityfeed = base_url + "statement";

	var url_verbtrends = base_url + "verbtrends";
	var url_usertrends = base_url + "actortrends";
	var url_activitytrends = base_url + "targettrends";

	var url_quiz_reports = base_url + "results";

	var url_course_students = base_url + "results/courselist/";
	
	
	
	var actor = user.email; //user.email;
	var mode = $("#analytics_mode").html();
	var pcid = $("#pageid").html();
	var base_url = urls.settings;
	// var base_url = 'http://localhost:8000/temp/settings/';
	var loader = $('.loading');
	var empty = $('.empty');

	// object form references
	var objformcontainer = $('#objformcontainer');
	var objform = $('#object-form');
	var objidfield = $('#objformcontainer #id');
	
	// lrs endpoint variables
	var url_lrs_list = base_url  + "lrs/"; // GET returns list of all LRSs
	var url_lrs_view = base_url + "lrs/"; // + LRS ID --  GET - gets details for LRS
	var url_lrs_post = base_url + "lrs/"; // Post new LRS - POST DATA
	var url_lrs_update = base_url + "lrs/"; // + LRS ID - Update LRS - POST DATA
	var url_lrs_delete = base_url + "lrs/remove/"; // + LRS ID - Delete LRS - DELETE DATA
	// lrs form field mappings
	var lrsfieldarray = {
		lrsnamefield : $('#objformcontainer #name'),
		lrsurifield : $('#objformcontainer #uri'),
		lrsusernamefield : $('#objformcontainer #username'),
		lrspasswordfield : $('#objformcontainer #password'),
		lrsoauthfield : $('#objformcontainer #oAuth'),
		lrsdescriptionfield : $('#objformcontainer #description'),
		lrscontactfield : $('#objformcontainer #contact'),
		lrscreatedbyfield : $('#objformcontainer #createdBy')
	}

	// course endpoint variables
	var url_course_list = base_url  + "course/"; // GET returns list of all courses
	var url_course_view = base_url + "course/"; // + course ID --  GET - gets details for course
	var url_course_post = base_url + "course/"; // Post new course - POST DATA
	var url_course_update = base_url + "course/"; // + course ID - Update course - PUT DATA
	var url_course_delete = base_url + "course/remove/"; // + course ID - Delete course - DELETE DATA
	// course form field mappings
	var coursefieldarray = {
		coursenamefield : $('#objformcontainer #name'),
		courseurlfield : $('#objformcontainer #URL'),
		coursedescriptionfield : $('#objformcontainer #description'),
		coursecreatedbyfield : $('#objformcontainer #createdBy')
	}

	// curriculum endpoint variables
	var url_curriculum_list = base_url  + "plan/"; // GET returns list of all curriculum
	var url_curriculum_list_courses = base_url  + "courseplan/"; // + Plan ID GET returns list of all curriculum for plan
	var url_curriculum_view = base_url + "plan/"; // + curriculum ID --  GET - gets details for curriculum
	var url_curriculum_post = base_url + "plan/"; // Post new curriculum - POST DATA
	var url_curriculum_update = base_url + "plan/"; // + curriculum ID - Update curriculum - PUT DATA
	var url_curriculum_delete = base_url + "plan/remove/"; // + curriculum ID - Delete curriculum - DELETE DATA
	// variable to hold associated course ids
	var arraycourses = [];
	// curriculum form field mappings
	var curriculumfieldarray = {
		curriculumnamefield : $('#objformcontainer #name'),
		curriculumdescriptionfield : $('#objformcontainer #description'),
		curriculumcreatedbyfield : $('#objformcontainer #createdBy'),
		curriculumcoursesfield : $('#objformcontainer #availcourses'),
		curriculumtypefield : $('#objformcontainer #type')
	}

	// courseplan endpoint variables
	//var url_courseplan_list = base_url  + "courseplan/"; // GET returns list of all courseplan
	//var url_courseplan_view = base_url + "courseplan/"; // + courseplan ID --  GET - gets details for courseplan
	//var url_courseplan_post = base_url + "courseplan/"; // Post new courseplan - POST DATA
	//var url_courseplan_update = base_url + "courseplan/"; // + courseplan ID - Update courseplan - PUT DATA
	var url_courseplan_delete = base_url + "courseplan/remove/"; // + courseplan ID - Delete courseplan - DELETE DATA
	/*// courseplan form field mappings
	var courseplanfieldarray = {
		courseplanPlanfield : $('#objformcontainer #Plan'),
		courseplanCoursefield : $('#objformcontainer #Course'),
		courseplanactivelist : $('#objformcontainer #activelist'),
		courseplaninactivelist : $('#objformcontainer #inactivelist'),
	}*/

	/*********** Object Management ***********/

	// List Functions
	if($('#widget-object').length){
		var objtype = $('#widget-object').attr('data-type');
		console.log('object type:' + objtype);
		getObjectData(objtype);
	}

	// Detail/Edit Functions
	$('body').on('click','.add-object, .edit-object',function(e){ 
		console.log('add/edit object');
		var objid = $(this).attr('data-id');
		var objtype = $(this).attr('data-type');
		objidfield.val('');
		objform[0].reset();
		if(objtype == 'curriculum'){
			getCourses(objid);
		}
		if(objid !== undefined){
			console.log(objid);
			$.getJSON( eval("url_"+objtype+"_view")+objid, function( json ) {
				console.log(json);
				if(json.length !== 0){
					$.each(json, function(i, val) {
						objidfield.val(val.ID);
						$.each(eval(objtype+"fieldarray"), function(i, item){
							//console.log(item.attr('name'));
							//console.log(i);
							$("#"+item.attr('name')).val(eval("val."+item.attr('name')));
							// exception to select Plan type from select list
							// this could use more finessing, perhaps adding a field type option
							// to the field list array?
							if(objtype == 'curriculum' && item.attr('name') == "type"){
								console.log(item.attr('name'));
								var tmp = eval("val."+item.attr('name'));
								console.log(tmp);
								$("#"+item.attr('name')+" option[value='"+tmp+"']").attr('selected', 'selected');
							}
						});
					});
				}
			});
		}else{
			objform[0].reset();
		}
		objformcontainer.addClass('active');
	});

	// Insert/Update Function
	objform.submit(function(e){
		e.preventDefault();
		var objdata = jsonSerialize($(this));
		var objtype = $(this).attr('data-type');
		console.log(objdata);
		if(objidfield.val() == ""){
			console.log("Posting New Object");
			var url = eval("url_"+objtype+"_post"); 
			var txtype = 'POST';
		}else{
			console.log("Updating Object");
			var url = eval("url_"+objtype+"_update"); 
			var txtype = 'POST';
		}
		$.ajax({
		    url: url,
		    data: objdata,
		    type: txtype,
		    success: function(result) {
		    	objformcontainer.removeClass('active');
		    	getObjectData(objtype);
		    	console.log(result);
		   	}
		});
	});

	// Delete Functions
	$('body').on('click','.delete-object',function(e){
		e.preventDefault();
		var objtype = $(this).attr('data-type');
		var id = $(this).attr('data-id');
		if(window.confirm("Deletions cannot be undone. Continue?")){
			$.ajax({
			    url: eval("url_"+objtype+"_delete")+id,
			    type: 'GET',
			    success: function(result) {
			       getObjectData(objtype);
			   	}
			});
		}
	});

	// listen for items in the courses select list to be clicked
	$('body').on('click','#objformcontainer #availcourses option',function(e){
		//console.log('clicked course!');
		var thisval = $(this).val();
		//console.log(thisval);
		var thisname = $(this).text();
		//console.log(thisname);
		var activecourses = $('#objformcontainer #activecourses');
		$(this).hide();
		$(this).attr('selected','selected');
		activecourses.append('<li><a href="#" class="primary badge" data-id="'+thisval+'"><i class="icon-cancel-circled"></i> '+thisname+'</a></li>');
		// if we are in edit mode, send the courseplan association now
		if(objidfield.val() !== ""){
			var cparray = {
				'planID' : objidfield.val(),
				'courses' : [thisval],
				'createdBy' : actor
			}
			//console.log("sending coursplan association...");
			//console.log(cparray);
			$.ajax({
			    url: url_curriculum_list_courses,
			    type: 'POST',
			    data: cparray,
			    success: function(result) {
			       //console.log(result);
			   	}
			});
		// in create mode; push onto array
		}else{
			arraycourses.push(thisval);
		}
			
	});
	// remove selected courses on click
	$('body').on('click','#objformcontainer #activecourses li a.badge',function(e){
		e.preventDefault();
		if(confirm("This will remove this course from the current Plan. Proceed?")){
			var thisid = $(this).attr('data-id');
			var cpid = $(this).attr('data-courseplanid');
			$('#objformcontainer #availcourses option[value="' + thisid + '"]').show();
			$('#objformcontainer #availcourses option[value="' + thisid + '"]').removeAttr('selected');
			$(this).parent().remove();
			if(cpid !== ""){
				$.ajax({
				    url: url_courseplan_delete+cpid,
				    type: 'GET',
				    success: function(result) {
				       console.log(result);
				   	}
				});
			}
		}
	});

	// utility functions
	function getCourses(id){
		curriculumfieldarray.curriculumcoursesfield.find('option').remove();
		$.ajax({
		    url: url_course_list,
		    type: 'GET',
		    success: function(result) {
		       //console.log(result);
		       $.each(result, function(i, val) {
		       		curriculumfieldarray.curriculumcoursesfield.append('<option value="'+val.ID+'">'+val.name+'</option>');	
		       });
		       getPlanCourses(id);
		   	}
		});
	}

	function getPlanCourses(id){
		// clear out list
		var activecourses = $('#objformcontainer #activecourses');
		activecourses.find('li').remove();
		// get courses for plan
		$.ajax({
		    url: url_curriculum_list_courses+id,
		    type: 'GET',
		    success: function(result) {
		       //console.log("Getting courses for plan:");
		       //console.log(id);
		       //console.log("Data:");
		       //console.log(result);
		       $.each(result, function(i, val) {
		    		//console.log("--------------------------------------");
		       		//console.log("looping through data:");
		       		$('#objformcontainer #availcourses option').each(function(){
		       			//console.log('checking select for: ' + this.value + ' against ' + val.courseID); 
					    if (this.value == val.courseID) {
					    	$(this).attr('selected','selected');
					    	//console.log('found: ' + val.name + ' in select!'); 
							$(this).hide();
							activecourses.append('<li><a href="#" class="primary badge" data-courseplanid="'+val.ID+'" data-id="'+val.courseID+'"><i class="icon-cancel-circled"></i> '+val.name+'</a></li>');    	 
					    }
					 });
		       		//console.log("--------------------------------------");
		       		//curriculumfieldarray.curriculumcoursesfield.append('<option value="'+val.ID+'">'+val.name+'</option>');	
		       });
		   	}
		});
	}

	/*function getCurriculum(){
		$.ajax({
		    url: url_curriculum_list,
		    type: 'GET',
		    success: function(result) {
		       console.log(result);
		       $.each(result, function(i, val) {
		       		courseplanfieldarray.courseplanPlanfield.append('<option value="'+val.name+'">'+val.name+'</option>');	
		       });
		   	}
		});
	}*/

	function getObjectData(otype){
		dna.empty('obj-list', { fade: true });
		showLoader();
		$.getJSON(eval("url_"+otype+"_list"), function( data ) {
			if(data.length !== 0){
				$.each(data, function(i, val) {
					dna.clone('obj-list', val, {html: true, fade: true});
				});
				hideLoader();
			}
		});
	}

	function jsonSerialize(form){
	    var array = $(form).serializeArray();
	    console.log(array);
	    var json = {};
	    $.each(array, function() {
	    	// again, a little hacky... need to build in some multi-select handling functions
	    	// swap in the value from the stored array of courses if we are adding a new course
	    	if(objidfield.val() == ""){
		    	if(this.name == "courses"){
		    		this.value = arraycourses;
		    	}
		    }
	        json[this.name] = this.value || '';
	    });
	    console.log(json);
	    return json;
	}

	// LOADING ANIMATION
	function showLoader(){
		//console.log("showing loader...");
		loader.fadeIn();
	}

	function hideLoader(){
		//console.log("hiding loader...");
		loader.fadeOut();
	}

	// SelectBoxIt - default settin
	// $("select[name='coursename']").selectBoxIt({ 
	// 	showFirstOption: false,
	// 	autoWidth: false
	// });
});
