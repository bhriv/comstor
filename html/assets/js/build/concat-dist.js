/******************************************************************/
/*********  Commonly Useful Functions and Custom Helpers  *********/
/******************************************************************/

$(document).ready(function() {
  console.error();
  console.warn();
  console.log('%c Document Ready', 'background: #00cc00; color: #000; padding: 2px 300px');
}); // end Doc Ready 

/*************************************************************/
/******************** Open Link in Pop Up Window  ****************/
/*************************************************************/

// Open link in a new popup window pre-sized 
function pop_up(hyperlink, window_name){
    if (!window.focus) {
        return true;
    }
    var href = (typeof(hyperlink) == 'string' ? hyperlink : hyperlink.href);
    window.open(href, window_name, 'width=800,height=800,toolbar=no, scrollbars=yes');
    return false;
}


/*************************************************************/
/*************************** Merge Two Arrays ****************/
/*************************************************************/

// https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}

// Sort Array of Dates
(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();


/*****************************************************************/
/****************** FIND parameters in URL string ****************/
/*****************************************************************/
/*
   Populate a JSON object of all URL query string parameters
   Reference Resource: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
*/

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();
console.log('*************** urlParams ************');
console.log(urlParams);
// console.log('apiKey +': urlParams["apiKey"]);
console.log('apiKey from URL: '+urlParams['apiKey']);
var this_page_apiKey = urlParams['apiKey'];
localStorage.setItem( 'apiKey',this_page_apiKey);


// Return API Key from Storage
function get_apiKey_from_storage(){
  var apiKey_from_storage = localStorage.getItem( 'apiKey');
  console.log('function - get apiKey from STORAGE: '+apiKey_from_storage);
  return apiKey_from_storage;
}


/*****************************************************************/
/****************************** Plugin Functions  ****************/
/*****************************************************************/

$('.accordion-tabs-minimal').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs-minimal');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
});


/*****************************************************************/
// Date Picker Processing Functions 
/*****************************************************************/

$(function() {
  $( "#start_date" ).datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 3,
    onClose: function( selectedDate ) {
      $( "#end_date" ).datepicker( "option", "minDate", selectedDate );
      localStorage.setItem( 'start_date', selectedDate );
      console.log('NEW start_date: ' +selectedDate);
    }
  });
  $( "#end_date" ).datepicker({
    formatDate: "yyyy-mm-dd",
    // defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 3,
    onClose: function( selectedDate ) {
      $( "#start_date" ).datepicker( "option", "maxDate", selectedDate );
      localStorage.setItem( 'end_date', selectedDate );
      console.log('NEW end_date: ' +selectedDate);
    }
  });
});
// end Date Picker


/*****************************************************************/
// Date Picker Processing Functions 
/*****************************************************************/

function isItemNullorUndefined(item){
  cc('isItemNullorUndefined','run')
  if (item == null || item == 'null' || item == undefined || item == 'undefined') {
    cc('ITEM is - '+item,'error');
    return true
  }else{
    return false
  }
}

/**********************************************************/
/************** Plugin Default Settings   **************/
/*****************************************************/

$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd'
});


/*****************************************************************/
/*************** Force Login for some Links **********************/
/*****************************************************************/
// - use for testing simple functions such as 'Document Ready' state etc.

function you_must_login(){
  alert('Please Log In.')
}

/*****************************************************************/
/***************************  Debugging Functions ***************/
/*****************************************************************/

function cheatModeToggle(){
  $('.cheatmode').toggle();
}


/*****************************************************************/
/********** Work With Local Storage Session Data *****************/
/*****************************************************************/

function startSession(){
  cc('startSession','run');
  setSessionID();
  setDefaultData();
}

function clearSession(){
  cc('clearSession','run');
  localStorage.setItem( 'session_id','');
  localStorage.setItem( 'start_date','');
  localStorage.setItem( 'end_date','');
  localStorage.setItem( 'apiKey','');
}  

function getStoredSessionData(data_name){
  cc('getStoredSessionData('+data_name+')','run');
  var d = localStorage.getItem(data_name);
  return d;
  // Example:  localStorage.setItem( 'session_item_data_array',data);
}


/*****************************************************************/
/***********************  Set Local Storage Values **************/
/*****************************************************************/

function saveLastAction(event){
  localStorage.setItem( 'last_action', event );
}

function setSessionID(){
  // create new random ID
  var session_id = Math.random().toString(36).substr(2, 7);
  localStorage.setItem( 'session_id', session_id );
  console.log('session_id set: '+session_id);
}

function setDefaultData(){
  // create new random ID
  cc('setDefaultData','run');
  localStorage.setItem( 'students', null );
  localStorage.setItem( 'quizzes', null );
  localStorage.setItem( 'courses', null );
  localStorage.setItem( 'all_students',null );
}

function setStartDate(){
  cc('setDefaultData','run');
  var start_date = $('#start_date').val();
  localStorage.setItem( 'start_date', start_date );
  console.log('start_date set: '+start_date);
}

function setEndDate(){
  var end_date = $('#end_date').val();
  localStorage.setItem( 'end_date', end_date );
  console.log('end_date set: '+end_date);
}

function setMetricType(metric_type){
  localStorage.setItem( 'metric_type', metric_type );
  console.log('metric_type set: '+metric_type);
}

function setAppMetricSpecific(app_metric_specific){
  localStorage.setItem( 'app_metric_specific', app_metric_specific );
  console.log('app_metric_specific set: '+app_metric_specific);
}

function setEventMetricSpecific(event_metric_specific){
  localStorage.setItem( 'event_metric_specific', event_metric_specific );
  console.log('event_metric_specific set: '+event_metric_specific);
}


/*****************************************************************/
/**********************  Check Variable Values *******************/
/*****************************************************************/

function checkUserSessionID(){
  var my_session_id = localStorage.getItem( 'session_id' );
  return my_session_id;
}

function checkStartDate(){
  var start_date = localStorage.getItem( 'start_date' );
  cc('STORAGE start_date: '+start_date, 'info');
  if (start_date == null) {
    start_date = '2015-01-01';
  };
  return start_date;
}

function checkEndDate(){
  var end_date = localStorage.getItem( 'end_date' );
  cc('STORAGE end_date: '+end_date, 'info');
  if (end_date == null) {
    end_date = '2015-12-31';
    alert('No End Date is set so the default date of '+end_date+' will be used');
  };
  return end_date;
}

function checkMetricType(){
  var metric_type = localStorage.getItem( 'metric_type' );
  if (metric_type == null) {
    metric_type = 'appMetrics';
  };
  cc('STORAGE metric_type: '+metric_type, 'info');
  return metric_type;
}

function checkAppMetricSpecific(){
  var app_metric_specific = localStorage.getItem( 'app_metric_specific' );
  cc('STORAGE app_metric_specific: '+app_metric_specific,'info');
  if (app_metric_specific == null) {
    app_metric_specific = 'ActiveUsers';
  };
  return app_metric_specific;
}

function checkEventMetricSpecific(){
  var event_metric_specific = localStorage.getItem( 'event_metric_specific' );
  cc('STORAGE event_metric_specific: '+event_metric_specific,'info')
  return event_metric_specific;
}

function checkStorageItem(item_NAME){
  var item_DATA = localStorage.getItem( item_NAME );
  cc('STORAGE '+item_NAME,'info');
  return item_DATA;
}
// Moved here from the head.
FpJsFormValidator.config = {'routing':{'check_unique_entity':null}};

/**
 * Author: Bret Van Horn
 * 
 */
$( document ).ready(function() {
	// misc variables
	// TEMP
	// var user = [];
	// user = {
	// 		    "id": "628",
	// 		    "username": "ben@invitrosocialmedia.com",
	// 		    "firstname": "Ben",
	// 		    "lastname": "Richards",
	// 		    "email": "ben@invitrosocialmedia.com",
	// 		    "city": "Los Angeles",
	// 		    "country": "US",
	// 		    "lang": "en",
	// 		    "timezone": "8.0",
	// 		    "firstaccess": "1426697383",
	// 		    "lastaccess": "1431449532",
	// 		    "lastlogin": "1431446607",
	// 		    "currentlogin": "1431446768",
	// 		    "lastip": "104.35.169.218",
	// 		    "picture": "39366",
	// 		    "url": "",
	// 		    "timecreated": "1426602943",
	// 		    "timemodified": "1426699319",
	// 		    "posts": [
	// 		      {
	// 		        "id": "47",
	// 		        "module": "notes",
	// 		        "userid": "628",
	// 		        "courseid": "23",
	// 		        "groupid": "0",
	// 		        "moduleid": "0",
	// 		        "coursemoduleid": "0",
	// 		        "subject": "",
	// 		        "summary": null,
	// 		        "content": "Ben Richards Test Student Notes 5-8-15",
	// 		        "uniquehash": "",
	// 		        "rating": "0",
	// 		        "format": "2",
	// 		        "summaryformat": "0",
	// 		        "attachment": null,
	// 		        "publishstate": "draft",
	// 		        "lastmodified": "1431117607",
	// 		        "created": "1431117579",
	// 		        "usermodified": "36"
	// 		      }
	// 		    ],
	// 		    "quizattempts": [
			      
	// 		    ],
	// 		    "quizgrades": [
			      
	// 		    ]
	// 		 };

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

// Gumby is ready to go

// Gumby.ready(function() {
//   Gumby.log('Gumby is ready to go...', Gumby.dump());

//   // placeholder polyfil
//   if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
//     $('input, textarea').placeholder();
//   }

//   // skip link and toggle on one element
//   // when the skip link completes, trigger the switch
//   $('#skip-switch').on('gumby.onComplete', function() {
//     $(this).trigger('gumby.trigger');
//   });

// // Oldie document loaded
// }).oldie(function() {
//   Gumby.warn("This is an oldie browser...");

// // Touch devices loaded
// }).touch(function() {
//   Gumby.log("This is a touch enabled device...");
// });


// // This is called with the results from from FB.getLoginStatus().
// function statusChangeCallback(response) {
// console.log('statusChangeCallback');
// console.log(response);
// // The response object is returned with a status field that lets the
// // app know the current login status of the person.
// // Full docs on the response object can be found in the documentation
// // for FB.getLoginStatus().
// if (response.status === 'connected') {
//   // Logged into your app and Facebook.
//   testAPI();
// } else if (response.status === 'not_authorized') {
//   // The person is logged into Facebook, but not your app.
//   document.getElementById('status').innerHTML = 'Please log ' +
//     'into this app.';
// } else {
//   // The person is not logged into Facebook, so we're not sure if
//   // they are logged into this app or not.
//   document.getElementById('status').innerHTML = 'Please log ' +
//     'into Facebook.';
// }
// }

// stubbed login form validation

//$('#login-form').validation({
//  // pass an array of required field objects
//  required: [
//    {
//      // name should reference a form inputs name attribute
//      // just passing the name property will default to a check for a present value
//      name: '_password',
//    },
//    {
//      name: '_username',
//      // pass a function to the validate property for complex custom validations
//      // the function will receive the jQuery element itself, return true or false depending on validation
//      validate: function($el) {
//        return $el.val().match('@') !== null;
//      }
//    }
//  ],
//  // callback for failed validaiton on form submit
//  fail: function() {
//    Gumby.error('Form validation failed');
//    $('#status-message').removeClass();
//    $('#status-message').addClass('danger alert');
//    $('#status-message').text('Please enter a valid email address and password.');
//    $('#status-message').show();
//  }
//});


// $('#join-form').validation({
//   // pass an array of required field objects
//   required: [
//     {
//       // name should reference a form inputs name attribute
//       // just passing the name property will default to a check for a present value
//       name: 'coursecode',
//     }
//   ],
//   // callback for failed validaiton on form submit
//   fail: function() {
//     Gumby.error('Form validation failed');
//     $('#join-status-message').removeClass();
//     $('#join-status-message').addClass('danger alert');
//     $('#join-status-message').text("We're sorry, the provided course code is invalid.");
//     $('#join-status-message').show();
//   },
//   // callback for successful validation on form submit
//   // if omited, form will submit normally
//   submit: function(data) {
//       $('#join-status-message').removeClass();
//       $('#join-status-message').addClass('success alert');
//       $('#join-status-message').text('Course join successful.');
//       $('#join-status-message').show();
//   } 
// });


// $('#request-form').validation({
//   // pass an array of required field objects
//   required: [
//     {
//       // name should reference a form inputs name attribute
//       // just passing the name property will default to a check for a present value
//       name: 'firstname',
//         name: 'lastname'
//     },
//     {
//       name: 'email',
//         // pass a function to the validate property for complex custom validations
//         // the function will receive the jQuery element itself, return true or false depending on validation
//         validate: function($el) {
//           return $el.val().match('@') !== null;
//         }
//     },
//     {
//       name: 'password',
//     },
//     {
//       name: 'birthday',
//     },
//     {
//       name: 'coursename',
//     }

//   ],
//   // callback for failed validaiton on form submit
//   fail: function() {
//     Gumby.error('Form validation failed');
//     $('#access-status-message').removeClass();
//     $('#access-status-message').addClass('danger alert');
//     $('#access-status-message').text("Please fill out all fields.");
//     $('#access-status-message').show();
//   },
//   // callback for successful validation on form submit
//   // if omited, form will submit normally
//   //submit: function(data) {
//   //    $('#access-status-message').removeClass();
//   //    $('#access-status-message').addClass('success alert');
//   //    $('#access-status-message').text('Course join successful.');
//   //    $('#access-status-message').show();
//   //}
// });


// // stubbed out form swap code 

// $('.forgot-pass').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#forgot-form-container').slideDown();
// });

// $('.back-to-login').on('click',function(){
//   $('#login-form-container').slideDown();
//   $('#forgot-form-container').slideUp();
//   $('#join-course-container').slideUp();
//   $('#request-access-container').slideUp();
// });

// $('.join-course').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#join-course-container').slideDown();
// });

// $('.request-access').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#join-course-container').slideUp();
//   $('#request-access-container').slideDown();
// });

// /*$('.create-account').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#join-course-container').slideUp();
//   $('#request-access-container').slideDown();
// });*/

// select all checkbox code 

$('#select-all').on('click',function(e) {
  var table= $(e.target).closest('table');
  $('td input:checkbox',table).prop('checked',this.checked);
});

// // define pager options
//   var pagerOptions = {
//     // target the pager markup - see the HTML block below
//     container: $(".pager"),
//     // output string - default is '{page}/{totalPages}'; possible variables: {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
//     output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
//     // if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
//     // table row set to a height to compensate; default is false
//     fixedHeight: false,
//     // remove rows from the table to speed up the sort of large tables.
//     // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
//     removeRows: false,
//     // go to page selector - select dropdown that sets the current page
//     cssGoto: '.gotoPage'
//   };
// 


$(document).ready(function() {
  //ckeditor 
  
  // Replace the <textarea id="editor1"> with a CKEditor
  // instance, using default configuration.
  // CKEDITOR.replace( 'textarea.editor' );


  $(".tablesorter").tablesorter({
    headers: {
        // disable sorting of the first column (we can use zero or the header class name)
        0 : {
          // disable it by setting the property sorter to false
          //sorter: false
        }
      },
  });

  $(".tablesorter-filter-paged").tablesorter({
    headers: {
        // disable sorting of the first column (we can use zero or the header class name)
        0 : {
          // disable it by setting the property sorter to false
          //sorter: false
        }
      },
      widgets: ["zebra", "filter"],
      widthFixed: true,
      widgetOptions : {
        // filter_anyMatch replaced! Instead use the filter_external option
        // Set to use a jQuery selector (or jQuery object) pointing to the
        // external filter (column specific or any match)
        //filter_external : '.search',
        // add a default type search to the first name column
        filter_defaultFilter: { 1 : '~{query}' },
        // include column filters
        filter_columnFilters: true,
        filter_placeholder: { search : 'Search...' },
        filter_saveFilters : true,
        filter_reset: '.reset'
      }
  }); //.tablesorterPager(pagerOptions);

  //instantiate any input fields with a 'datepicker' class // If you're using jQuery make sure to pass only the first element:
  var picker = new Pikaday({ field: $('.datepicker')[0] });
  // old version
  // $('.datepicker').pikaday({
  //   format: 'MM/DD/YYYY'
  // });

  // Add a Group user filter
  $('#filterbox').on('keyup',function(){
    searchstr = $(this).val().toLowerCase();
    filterel = $('.filteritems td.name');
    filterel.each(function(){
      if($(this).text().toLowerCase().indexOf(searchstr) < 0){
        $(this).parent().hide();
      }else{
        $(this).parent().show();
      }
    });
  });


}); // end doc ready

// // global to track total mentions
// var tally = 0;
// // social radar display logic
// var sociallist = $('#widget-social-radar ul.social-radar li');
// // if the list exists, proceed. 
// if(sociallist.length){
//   // get the total number of cumulative mentions for doing some math
//   getTotalMentions();
//   // loop through each social source
//   sociallist.each(function(){
//     // grab the value of the data-count attribute
//     // to get total mentions for this source
//     thisval = parseInt($(this).attr('data-count'));
//     // determine the bubble size based on number of mentions
//     // multiply by a buffer (may need to adjust buffer based on actual numbers)
//     bubbleSize = (thisval/tally)*130;
//     // if it's a very small percentage, increase by a little bit so it's visible
//     if(bubbleSize < 15) {
//       bubbleSize = bubbleSize + 10;
//     }
//     // animate the resizing of each bubble
//     $(this).animate({
//       width: bubbleSize*3+'px',
//       height: bubbleSize*3+'px',
//     },500, function(){
//       //console.log('fist animation done');
//     });
//     $(this).find('i').animate({
//       fontSize: bubbleSize*3/2+'px',
//       lineHeight: bubbleSize*3+'px'
//     },500, function(){
//       //console.log('second animation done');
//     });
//   });
//   // loop is done, but are the animations done?
//   var wait = setInterval(function() {
//     // animations all done, apply masonry for layout twiddling
//     if( !sociallist.is(":animated") ) {
//       clearInterval(wait);
//       $('#widget-social-radar ul.social-radar').masonry({
//         gutter : 0,
//         columnWidth: 10,
//         itemSelector: 'li',
//         isFitWidth: false
//       });
//     }
//   }, 200);
// }

// // bring each element to the foreground when moused over
// // so tooltips show
// sociallist.on('mouseover',function(){
//   $(this).css('z-index',10000);
// });
// // send it to the background after
// sociallist.on('mouseout',function(){
//   $(this).css('z-index',1);
// });

// function getTotalMentions(){
//   sociallist.each(function(){
//     thiscount = parseInt($(this).attr('data-count'));
//     tally+=thiscount;
//   });
// }


// //******** dashboard customization, sorting, and storage *********

// //initialize variables from localstorage
// var storedactivewidgets = JSON.parse(localStorage.getItem( 'activewidgets'));
// var storedinactivewidgets = JSON.parse(localStorage.getItem( 'inactivewidgets'));

// // if local storage empty
// if((storedinactivewidgets === null && storedactivewidgets === null) || (storedinactivewidgets.length <= 0 && storedactivewidgets.length <= 0)){
//   //console.log('local storage empty! parsing document...');
//   var activewidgets = [];
//   var inactivewidgets = [];
//   var id = 0;
//   // parse widgets on page, create arrays of active and inactive ones
//   $('.widget-grid > li').each(function(index, element){
//     tmp = {
//       "id": id,
//       "name": $(this).find('h2:first-of-type').text(),
//       "target": $(this).attr('id')
//     }
//     //console.log("adding item to array:");
//     //console.log(tmp);
//     // if item is visible, put it in the visible widgets array
//     if($(this).is(":visible")){
//       activewidgets.push(tmp);
//     }else{
//       inactivewidgets.push(tmp);
//     }
//     id++;
//   });
//   localStorage.setItem( 'activewidgets', JSON.stringify(activewidgets) );
//   localStorage.setItem( 'inactivewidgets', JSON.stringify(inactivewidgets) );
//   // show/hide items; populate lists
//   dashlayout(activewidgets,inactivewidgets);

// // else; populate variables from local storage
// }else{
//   //console.log('local storage found! updating variables...');
//   var activewidgets = JSON.parse(localStorage.getItem( 'activewidgets'));
//   var inactivewidgets = JSON.parse(localStorage.getItem( 'inactivewidgets'));
//   //console.log('active widgets variable from local storage:');
//   //console.log(activewidgets);
//   //console.log('inactive widgets variable from local storage:');
//   //console.log(inactivewidgets);
//   // show/hide items; populate lists
//   dashlayout(activewidgets,inactivewidgets);
// }
// // end if cookie empty

// // debug output
// /*console.log("active widgets: ");
// $.each(activewidgets, function(i,item){
//   console.log(item.name);
// });
// console.log("inactive widgets: ");
// $.each(inactivewidgets, function(i,item){
//   console.log(item.name);
// });*/


// // drag and drop/sort functionality
// var group = $("ul.sortable").sortable({
//   group: 'sortable',
//   handle: 'h2',
//   pullPlaceholder: false,
//   onDrop: function  (item, targetContainer, _super) {
//     var clonedItem = $('<li/>').css({height: 0});
//     item.before(clonedItem);
//     clonedItem.animate({'height': item.height()});
    
//     item.animate(clonedItem.position(), function  () {
//       clonedItem.detach();
//       _super(item);
//     })

//     // hide elements in dashboard if they are dragged to hidden box in dash editor
//     par = item.parent();
//     widgetid = item.attr('data-target');

//     if(par.attr('class') === "sortable disabled"){
//       //console.log("hiding: "+widgetid);
//       //$("#"+widgetid).hide();
//     }else{
//       dashul = $('.widget-grid');
//       par.find('li').each(function(){
//         thistarget = "#"+$(this).attr('data-target');
//         //console.log('moving this li: '+thistarget);
//         dashul.append($(thistarget));
//       });
//       //$("#"+widgetid).show();
//     }
//     // store layout in two variables and write to cookie
//     var data = group.sortable("serialize").get();
//     // active widgets
//     activewidgets = [];
//     $.each(data[0], function(i,item){
//       if(item.name !== undefined){
//         tmp = {
//           "id": item.id,
//           "name": item.name,
//           "target": item.target
//         }
//         activewidgets.push(tmp);
//       }
//     });
//     // inactive widgets
//     inactivewidgets = [];
//     $.each(data[1], function(i,item){
//       if(item.name !== undefined){
//         tmp = {
//           "id": item.id,
//           "name": item.name,
//           "target": item.target
//         }
//         inactivewidgets.push(tmp);
//       }
//     });

//     // set local storage data
//     localStorage.setItem( 'activewidgets', JSON.stringify(activewidgets) );
//     localStorage.setItem( 'inactivewidgets', JSON.stringify(inactivewidgets) );

//     // re-read local storage data and layout dash
//     storedactivewidgets = JSON.parse(localStorage.getItem( 'activewidgets'));
//     storedinactivewidgets = JSON.parse(localStorage.getItem( 'inactivewidgets'));

//     dashlayout(storedactivewidgets,storedinactivewidgets);

//     // debug output
//     /*console.log("--active widgets:-- ");
//     $.each(activewidgets, function(i,item){
//       console.log(item.name);
//     });
//     console.log("--inactive widgets:-- ");
//     $.each(inactivewidgets, function(i,item){
//       console.log(item.name);
//     });*/
//   },

//   // set item relative to cursor position
//   onDragStart: function ($item, container, _super) {
//     var offset = $item.offset(),
//     pointer = container.rootGroup.pointer

//     adjustment = {
//       left: pointer.left - offset.left,
//       top: pointer.top - offset.top
//     }

//     _super($item, container)
//   },
//   onDrag: function ($item, position) {
//     $item.css({
//       left: position.left - adjustment.left,
//       top: position.top - adjustment.top
//     })
//   }
// });


// // populate dashboard editor lists and show/hide elements as needed
// function dashlayout(active,inactive){
//   console.log('entering dash layout function...');

//   var activelist = $('#activewidgets');
//   var inactivelist = $('#inactivewidgets');

//   // empty lists
//   activelist.empty();
//   inactivelist.empty();
//    var lastitem = "";

//   // repopulate lists
//   $.each(active,function(index,item){
//     tmp = '<li data-id="'+item.id+'" data-name="'+item.name+'" data-target="'+item.target+'"><h2>'+item.name+'</h2></li>';
//     activelist.append(tmp);
//     if(lastitem != ""){
//       $("#"+item.target).insertAfter(lastitem);
//     }
//     lastitem = $("#"+item.target);
//     $("#"+item.target).show("slow");
//   });
//   $.each(inactive,function(index,item){
//     tmp = '<li data-id="'+item.id+'" data-name="'+item.name+'" data-target="'+item.target+'"><h2>'+item.name+'</h2></li>';
//     inactivelist.append(tmp);
//     $("#"+item.target).hide("slow");
//   });
//   var delaybtn = window.setTimeout(pulseButton,2000);
// }

// function pulseButton(){
//   var dashbtn = $('#dash-edit');
//   dashbtn.fadeTo("slow", 0.3,function(){
//     $(this).fadeTo("slow",1,function(){
//       $(this).fadeTo("slow",0.3,function(){
//         $(this).fadeTo("slow",1);
//       });
//     });
//   });
// }


var base_url = urls.messaging;
// var base_url = 'http://akronzip.com/';

// // get user's courses
// if($('#mycourselist').length){
//   var courselist = $('#mycourselist');
//   var actor = user.email; //user.email;
//   // var actor = bretvanhorn@gmail.com;
//   var courselisturl = base_url + 'actorcourses/'+actor;

//   var thisurl;
//   $.ajax({
//         url: courselisturl,
//         type: 'GET',
//         success: function(result) {
//            //console.log(result);
//            $.each(result, function(i, val) {
//               getCourseURL(val.CourseID, function(data){
//                 //console.log('getCourseURL data: '+ data);
//                 thisurl = data;
//                 courselist.append('<li><a href="'+thisurl+'" target="_blank">'+val.CourseName+'</a></li>'); 
//               }); 
//            });
//         }
//     });
// } 

// function getCourseURL(cid, fn){
//   var coursedetailurl = base_url + 'course/'+cid;
//   $.ajax({
//     url: coursedetailurl,
//     type: 'GET',
//     success: function(result) {
//       //console.log('get courseurl result: '+ result);
//       $.each(result, function(i, val) {
//           fn(val.URL);
//       });
//     }
//   });
// }

// handler to close any open drawers when not clicked on 

$('body').on('click', function(e) {
  var target = $(e.target);
  if (! target.hasClass('active')) {
    // It's not an active element. Does it have an active parent.
    var activeParents = target.parents('.active');
    if (activeParents.length == 0) {
      $('a.active').click();
    }
  }
});

$("#fos_user_profile_form_country").selectBoxIt({ 
  autoWidth: false
});
$("#fos_user_profile_form_company").selectBoxIt({ 
  autoWidth: false
});
$("#root form ul li.field select").selectBoxIt({ 
  autoWidth: false
});
$("#Priority").selectBoxIt({ 
  autoWidth: false
});

/*$("#lumious_user_form_type select").selectBoxIt({ 
  autoWidth: false
});*/

// Modal Selects
$("#type").selectBoxIt({ 
  autoWidth: false
});



// ciscoone charts and data -- move to separate file!

var base_url = urls.analytics;
// var base_url = 'http://akronzip.com/';
var url_activityfeed = base_url + "statement";


    //     // dig down to the responseText object
    //     var s = $.parseJSON(studentobject[2].responseText);
    //     var q = $.parseJSON(quizobject[2].responseText);
    //     var a = $.parseJSON(attemptobject[2].responseText);   

        // var quiz_ids = _.pluck(q, 'planID');
    //     var quiz_names = _.pluck(q, 'name');
    //     var quiz_sumgrades = _.pluck(q, 'sumgrades');
    //     var zip_quizzes = _.zip(quiz_ids,quiz_names,quiz_sumgrades);
    //     var student_firstnames = _.pluck(s, 'firstname');

// New array of arrays that match a condition
var plan_ids_matched = [];
var course_ids_matched = [];

function find_most_popular_courses(){
  console.log(' #### most_popular_courses ####');

  // declare variables
  var plan_courses_data = [];
  var overview_data = [];
  var overview_values = [];

  // Get user selcection
  var plan_filter_id = $('#plan_filter').find(':selected').data('id');
  plan_filter_id = parseInt(plan_filter_id);
  console.log('plan_filter_id: '+plan_filter_id);

  // Original array of arrays
  var plan_courses_data = [
      {"planID":"99","courseID":"30"},
      {"planID":"00","courseID":"29"},
      {"planID":"00","courseID":"31"},
      {"planID":"99","courseID":"32"}
  ];
  
  // json is converted to an array object to use
  console.log(plan_courses_data);
  console.log('end plan_courses_data');

  
  // @FORLATERUSE - use each unique courseID to populate the Menu
  // Get courseIDs
  var courseIDs = _.pluck(plan_courses_data, 'courseID');
  var unique_courseIDs = _.uniq(courseIDs);
  console.log(unique_courseIDs);
  console.log('end unique_courseIDs');
  // Sort courseIDs lowest to hightest
  unique_courseIDs.sort(function(a, b) {
      return a - b;
  });  
  console.log(unique_courseIDs);
  console.log('end SORTED unique_courseIDs');

  // Iterate through each array within the array. Dig down to values within the current array.
  // filter values by passing condidtion
  // save in new array of arrays that matched the test condition
  jQuery.each(plan_courses_data, function(key, single_plan_data_values) { 
    var planID_value = parseInt(single_plan_data_values.planID);
    // only save in the new array if the id matches the userselection
    
    if (plan_filter_id = planID_value) {
        plan_ids_matched.push(single_plan_data_values);
    };
  });
  console.log(plan_ids_matched);
  console.log('plan_ids_matched end');
    
  // Now work with the array that only contains the matched data. 
  // function get_overview_data(){
    jQuery.each(plan_ids_matched, function(key, single_course_data_values) { 
  
      var courseID_value = parseInt(single_course_data_values.courseID);
      // get the data for this single specified value from the endpoint
      var url_overview_data = base_url + "course/overview/" +courseID_value;

      $.getJSON( url_overview_data, function( overview_json ) {
        console.log('getting INTERNAL url_overview_data:' +url_overview_data);
        console.log(overview_json);
        course_ids_matched.push(overview_json);
        //By using javasript json parser
        console.log('course_ids_matched ADDED INNER');
        console.log(course_ids_matched);

        var sorted_course_overview_data = _.sortBy(course_ids_matched, 'Viewed');
        // console.log('sorted_course_overview_data ----------------');
        // console.log(sorted_course_overview_data);

        var reversed_sorted_course_overview_data = sorted_course_overview_data.reverse();
        console.log('reversed_sorted_course_overview_data ^^^^^^^^^^^^-');
        console.log(reversed_sorted_course_overview_data);
      });

    });
} // end most_popular_courses

function show_most_popular_courses(){
  find_most_popular_courses();
  console.log(course_ids_matched);
  console.log('course_ids_matched OUTER');
}


function populate_data_content(){
  console.log('DO: populate_data_content()');
  
  // var plan_course_filter_id = $('#plan_course_filter').find(':selected').data('id');
  var plan_course_filter_id = 30;

  var url_course_duration = base_url + "course/duration/" +plan_course_filter_id;
  var url_course_graph = base_url + "course/graph/" +plan_course_filter_id;
  var url_course_module_duration = base_url + "coursemodule/courseduration/" +plan_course_filter_id +"/";
  var url_course_knowledge_check = base_url + "knowledgecheck/student/";
  var url_course_response_check = base_url + "knowledgecheck/response/";
  // http://akronzip.com/coursemodule/courseduration/30/ciscoone~025008514@t2000inc.com

  // Overview Data
  var url_lastupate_data = base_url + "course/lastupdate/" +plan_course_filter_id;
  var lastupdate_data = [];
  var lastupdate_values = [];
  

  $.getJSON( url_lastupate_data, function( lastupdate_json ) {
    console.log('******* getting lastupdate_json data *********');
    console.log(lastupdate_json);
    //By using javasript json parser
    console.log(lastupdate_json['LAST UPDATED']);
    console.log(lastupdate_json['NEWEST RECORD']);

    var lastupdate_moment = lastupdate_json['LAST UPDATED'];
    lastupdate_moment = moment(lastupdate_json['LAST UPDATED']).format("MM/DD/YYYY, h:mm:ss a");
    $('#overview_updated_date').html(lastupdate_moment);
    
    var lastusage_moment = lastupdate_json['NEWEST RECORD'];
    lastusage_moment = moment(lastupdate_json['NEWEST RECORD']).format("MM/DD/YYYY, h:mm:ss a");
    $('#overview_updated_usage').html(lastusage_moment);
    
  });

  // cisco one Learner Detail tab
  $.getJSON( url_course_duration, function( json ) {

    console.log("summary learner data:");
    console.log(json);
    
    var tbody_details = $("#learnerdetails");

    tbody_details.empty();
    
    jQuery.each(json, function(i, val) {

      var module_data = "";
      var kcheck_data = "";
      var responses_data = "";

      var mdata = $.getJSON(url_course_module_duration + val.ACTOR);
      var kdata = $.getJSON(url_course_knowledge_check + val.ACTOR);
      var rdata = $.getJSON(url_course_response_check + val.ACTOR);

      console.log('========================== GETTING LEARNER DETAILS FOR ACTOR: '+ val.ACTOR +'=========================');

      // a way to target each row individually to compensate for 
      // asynchronous requests completing after table is rendered.
      var actorid = val.ACTOR.replace(/[^a-zA-Z 0-9]+/g, '');

      $.when(mdata,kdata,rdata).done(function(mdata,kdata,rdata) {

        // get and loop through module durations
        md = $.parseJSON(mdata[2].responseText);

        jQuery.each(md, function(x, module) { 
          module_data += "<li>" + module.Duration + ": " + module.name + "</li>";
        });


        // get and loop through knowledge check drops
        kd = $.parseJSON(kdata[2].responseText);

        jQuery.each(kd, function(y, k) { 
          thistarget = unescape(k.TARGET);
          tmparray = thistarget.split('/');
          targetname = $(tmparray).get(-2);
          kcheck_data += "<li>" + targetname + ": " + k.ACTIVITY + "</li>";
        });


        // get and loop through knowledge check responses
        rd = JSON.parse(rdata[2].responseText);

        console.log("responses raw data: ");
        console.log(rd[1]);

        //rdresponse = rd['RESPONSE'].split(';');

        console.log("response element: ");

        jQuery.each(rd, function(z, r) { 
          console.log(r.RESPONSE);
          rdresponse = r.RESPONSE.split(';');
          jQuery.each(rdresponse, function(xx, rr) {
            responses_data += "<li>" + rr + "</li>";
          });
        });

        mtmp = "#"+actorid+" .mdata ul.m";
        ktmp = "#"+actorid+" .kdata ul.k";
        rtmp = "#"+actorid+" .kdata ul.r";
        mico = "#"+actorid+" .mdata i";
        kico = "#"+actorid+" .kdata i";

        // console.log("module_data : " + module_data);
        // console.log("kcheck_data : " + kcheck_data);
        // console.log("responses_data : " + responses_data);

        if(module_data != ""){
          $(mico).removeClass('red').addClass('green');
        }

        if(kcheck_data != ""){
          // var new_icon = '<i class="fa fa-check-square-o">';
          $(kico).removeClass('red fa-minus-square-o').addClass('fa-check-square-o green');
        }

        $(mtmp).append(module_data);
        $(ktmp).append(kcheck_data);
        $(rtmp).append(responses_data);

      });

      tbody_details.append("<tr class=\"expand\" id=\""+actorid+"\">" +
        "<td>" + val.NAME + "</td>" +
        "<td class=\"tdata\">" + moment(val.Enter).format("MM/DD/YYYY") + "<br><span>" + moment(val.Enter).format("h:mm:ss a") + "</span></td>" +
        "<td class=\"mdata\"><i class=\"fa fa-puzzle-piece red\"></i><ul class=\"m\">"+ module_data + "</ul></td>" +
        "<td class=\"kdata\"><i class=\"fa fa-minus-square-o red\"></i>" +
        "<div><h5>Knowledge Checks:</h5><ul class=\"k\">"+ kcheck_data + "</ul>" +
        "<div><h5>Responses:</h5><ul class=\"r\">"+ responses_data + "</ul>" +
        "</div></td>" +
        "<td>" + val.Duration + "</td>" +
        "</tr>"       
      );

    });

    tbody_details.trigger('update'); 
  });


  // cisco one All Data tab
  $.getJSON( url_activityfeed, function( json ) {
    
    var tbody_activity = $(".verbtable");

    tbody_activity.empty();

    var uniqueverburis = _.uniq(_.pluck(json, 'VERB'));
    var uniqueverbs = [];

    // this is a workaround to deal with doubled up URIs which
    // cause duplicate entries
    jQuery.each( uniqueverburis, function( i, val ) {
      tmp = val.split('/');
      tmp = "<span class=\"light label\">"+tmp.slice(-1)[0]+"</span>";
      uniqueverbs.push(tmp);
    });
    uniqueverbs = _.uniq(uniqueverbs);

    // add verb buttons to layout
    $('#verbsheader').append(uniqueverbs);
    
    jQuery.each(json, function(i, val) {
  
      // parse verb for endpoint
      act = val.VERB;
      act = act.split('/');
      act = act.slice(-1)[0];

      tbody_activity.append("<tr>" +
          "<td>" + val.ID + "</td>" +
          "<td style=\"white-space:nowrap\">" + val.NAME + "</td>" +
          "<td style=\"white-space:nowrap\">" + moment(val.SOURCE_TIMESTAMP).format("MM/DD/YYYY")  +"</td>" +
          "<td style=\"white-space:nowrap\">" + moment(val.SOURCE_TIMESTAMP).format("h:mm A")  +"</td>" +
          "<td style=\"white-space:nowrap\">" + act + "</td>" +
          "<td>" + decodeURI(val.ACTIVITY) + "</td>" +
         // "<td> </td>" +
        // "<td>" + val.ACTOR + "</td>" +
          "</tr>"       
          );
    });

    tbody_activity.trigger('update'); 
  });


  //Charts tab (tab 1)

  var dates = [];
  var data = [];

  $.getJSON( url_course_graph, function( json ) {
    console.log('getting chart data...');
    console.log(json);

    // get all of the keys and values
    $.each(json, function(key, value){
        console.log(key, value);
        dates.push(key);
        data.push(value);
    });

    console.log(dates);
    console.log(data);

    var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: dates,
      datasets: [
          {
              fillColor: "#fe5f55",
              strokeColor: "#fe5f55",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: data
          }/*,
          {
              fillColor: "#82bfd8",
              strokeColor: "#82bfd8",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [15, 20, 50, 50, 72, 37, 43]
          }*/
      ]
    },
    latestLabel = startingData.labels[6];
    // Reduce the animation steps for demo clarity.
    var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});

  });


// Overview Data

  var url_overview_data = base_url + "course/overview/" +plan_course_filter_id;
  var overview_data = [];
  var overview_values = [];
  

  $.getJSON( url_overview_data, function( overview_json ) {
    console.log('getting url_overview_data data...');
    console.log(overview_json);
    //By using javasript json parser
    console.log(overview_json['Experienced']);
    console.log(overview_json['Viewed']);
    console.log(overview_json['Mastery']);
    $('#overview_viewed').html(overview_json['Viewed']);
    $('#overview_experienced').html(overview_json['Experienced']);
    $('#overview_mastery').html(overview_json['Mastery']);
  });

  // Overview Updated Data
  var overview_updated_url = base_url + "course/lastupdate/" +plan_course_filter_id;
  var overview_updated = [];
  var overview_updated_values = [];
  

  $.getJSON( overview_updated_url, function( overview_updated_json ) {
    console.log('getting overview_updated_url data...');
    console.log(overview_updated_json);
    //By using javasript json parser
    console.log(overview_updated_json['LASTUPDATED']);
    console.log(overview_updated_json['NEWESTRECORD']);
    $('#overview_updated_date').html(moment(overview_updated_json['LASTUPDATED']).format('MMMM Do YYYY, h:m a'));
    $('#overview_updated_usage').html(moment(overview_updated_json['NEWESTRECORD']).format('MMMM Do YYYY, h:m a'));
  });


// Video View Report

  var video_view_duration_url = base_url + "course/duration/" +plan_course_filter_id;
  console.log('video_view_duration_url: '+video_view_duration_url);

  // setup data
  var view_actors = [];
  var view_duration = [];
  var view_duration_seconds = [];
  var view_duration_seconds_clean_data = [];
  var view_total_launches = null;
  var view_total_launches_clean_data = null;
  var view_total_seconds_viewed = 0;

  var longest_view_in_module;
  var shortest_view_in_module;
  var average_viewing_length_in_module;


  $.getJSON( video_view_duration_url, function( json ) {

    var view_actors = _.pluck(json, 'ACTOR');
    console.log('ALL ACTORS ---------------');
    console.log(view_actors);
    var unique_view_actors = _.uniq(view_actors);
    console.log('unique_actors ---------------');
    console.log(unique_view_actors);
    var total_unique_users = _.size(unique_view_actors);
    console.log('UNIUE USERS ---------------' +total_unique_users );
    $('#total_unique_users').html(total_unique_users);

    var all_view_durations = _.pluck(json, 'Duration');
    
    $.each(all_view_durations, function(key, value){
        
        view_duration_seconds.push(key);
        view_duration_seconds_clean_data.push(key);
        // convert to seconds using Moment, clean up data and add to new clean array
        var value_seconds = moment.duration(value, "HH:mm:ss").asSeconds();
        value_seconds = Math.round(value_seconds);
        console.log('value_seconds:' +value_seconds);
        view_duration_seconds.push(value_seconds);

        if( (parseFloat(value_seconds,2) > 5) && (parseFloat(value_seconds,2) < 7201) && (parseFloat(value_seconds,2) > 0) ){
          view_duration_seconds_clean_data.push(value_seconds);  
          view_total_launches_clean_data++;
        }

        view_total_seconds_viewed = view_total_seconds_viewed+value_seconds;
        view_total_launches++;
    });
    // remove any null entries
    view_duration_seconds_clean_data = _.compact(view_duration_seconds_clean_data);
    console.log('oooooooo view_duration_seconds_clean_data ooooooooo');
    console.log(view_duration_seconds_clean_data);
    console.log('view_total_launches_clean_data:' +view_total_launches_clean_data);

    var total_abandoned_or_stalled = view_total_launches-view_total_launches_clean_data;
    console.log('****** total_abandoned_or_stalled:' +total_abandoned_or_stalled);
    $('#total_abandoned_or_stalled').html(total_abandoned_or_stalled);
    
    console.log('view_total_launches = ' +view_total_launches);
    $('#view_total_launches').html(view_total_launches);

    var longest_view_in_module = _.max(view_duration_seconds_clean_data);
    longest_view_in_module = longest_view_in_module/60;
    longest_view_in_module = Math.round(longest_view_in_module);

    console.log('longest_view_in_module (mins): '+longest_view_in_module);
    $('#longest_view_in_module').html(longest_view_in_module);

    var shortest_view_in_module = _.min(view_duration_seconds_clean_data);
    console.log('shortest_view_in_module (secs): '+shortest_view_in_module);
    $('#shortest_view_in_module').html(shortest_view_in_module);

    var average_viewing_length_in_module = view_total_seconds_viewed/view_total_launches;

    console.log('average_viewing_length_in_module (sec): '+average_viewing_length_in_module);
    average_viewing_length_in_module = average_viewing_length_in_module/60;
    // console.log('average_viewing_length_in_module (mins): '+average_viewing_length_in_module);
    average_viewing_length_in_module = Math.round(average_viewing_length_in_module);
    console.log('average_viewing_length_in_module rounded (mins): '+average_viewing_length_in_module);
    $('#average_viewing_length_in_module').html(average_viewing_length_in_module);
    
    
    console.log('##### END view_duration_seconds #######');
  
    // Bar Chart  
    var barData = {
    labels: ['Usage Overview'],
        datasets: [
            { // Comparitive Data Sets
                label: 'Usage Overview',
                fillColor: '#FFEA88',
                data: [view_total_launches]
            },
            {
                label: 'Usage Overview',
                fillColor: '#4ACAB4',
                data: [total_abandoned_or_stalled]
            },
            {
                label: 'Usage Overview',
                fillColor: '#FF8153',
                data: [total_unique_users]
            }
        ]
    };
    var video_views_bar_context = document.getElementById('video_views_bar').getContext('2d');
    var clientsChart = new Chart(video_views_bar_context).Bar(barData);

    // Donut Chart
    // console.log('---- DONUT CHART --------');

    var video_view_duration = document.getElementById("video_view_duration"),
    ctx_video_view_duration = video_view_duration.getContext('2d');

    var video_view_duration_Options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,
        segmentStrokeColor : "#eee",
        segmentStrokeWidth : 2,
        percentageInnerCutout : 50, // This is 0 for Pie charts
        animationSteps : 100,
        animationEasing : "easeOut",
        animateRotate : true,
        animateScale : true
    };

    // array of view duration and random color
    var video_view_duration_Data = [
        {
            value: shortest_view_in_module,
            color: "#878BB6"
        },
        {
            value : longest_view_in_module,
            color : "#4ACAB4"
        },
        {
            value : average_viewing_length_in_module,
            color : "#fdd687"
        }
    ];
    
    var myLiveChart_video_view_duration = new Chart(ctx_video_view_duration).Doughnut(video_view_duration_Data,video_view_duration_Options);
    
  }); // end video view duration

  // var url_course_module_duration = base_url + "coursemodule/studentduration/" +moduleid +"/";
}

$('#plan_course_filter').on('change', function() {
    populate_data_content();
});


$( document ).ready(function() {
  // populate_data_content();
}); // end doc ready



/*
// Get all students that have taken Course 30
    
    get selected data-id
    hit endpoint http://akronzip.com/course/duration/30
    build student array
    add student email to array key/value

  
    // for each individual student (course = 30, student = ciscoone~025008514@t2000inc.com)
      
      // get the time spent in each course module

      // http://akronzip.com/coursemodule/courseduration/30/ciscoone~025008514@t2000inc.com
      url_course_module_duration + studentemail
      
      // get the time spent in each module (how do we get all the ID's of all modules within a course?)
      url_course_duration
      // http://akronzip.com/coursemodule/studentduration/10/ciscoone~025008514@t2000inc.com

// get the individual student responses (how do we know if the student response was correct?)
// http://akronzip.com/knowledgecheck/student/ciscoone~025008514@t2000inc.com

// get all of the 'knowledge check' responses for course 30
// http://akronzip.com/knowledgecheck/30
// determine the most common response (e.g. Drop Zone 2)

*/



/**
 * Author: Bret Van Horn
 * 
 */
$( document ).ready(function() {

	//renderDash();

	var loader = $('.loading');
	//hideLoader();

	function renderDash(){

	    var base_url = urls.analytics;
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
		
		var analytics_mode = checkLocalStorage('filter_mode');

		//override analytics mode based on user type
		/*if(searchRoles('ROLE_INSTRUCTOR')){
			analytics_mode = "courseplan";
		}*/
		
		if (analytics_mode == "plan") {
			var planid = checkLocalStorage('current_plan');
			
			url_activelearners = base_url + "planusers/"+planid;
			url_challenges = base_url + "planchallenges/"+planid;
			url_remediations = base_url +"planremediations/"+planid;
			
			url_activitygraph = base_url + "planactivitygraph/"+planid;
			url_usergraph = base_url +"planusergraph/"+planid;
			url_messagegraph = base_url + "planmessagegraph/"+planid;
			
			url_plan = base_url + "courseplan/"+planid;

			url_activityfeed = base_url + "planstatement/"+planid;

			url_verbtrends = base_url + "planverbtrends/"+planid;
			url_usertrends = base_url + "planactortrends/"+planid;
			url_activitytrends = base_url + "plantargettrends/"+planid;

			url_quiz_reports = base_url + "results/plan/"+planid;
			var url_course_students = base_url + "results/planlist/"+planid;
			
		} else if (analytics_mode == "courseplan") {
			var courseid = checkLocalStorage('current_course');
			//override analytics mode based on user type
			/*if(searchRoles('ROLE_INSTRUCTOR')){
				// temporarily hardcoding this for demo/testing
				courseid = 4;
			}*/
			url_activelearners = base_url + "courseusers/"+courseid;
			url_challenges = base_url + "coursechallenges/"+courseid;
			url_remediations = base_url +"courseremediations/"+courseid;
			
			url_activitygraph = base_url + "courseactivitygraph/"+courseid;
			url_usergraph = base_url +"courseusergraph/"+courseid;
			url_messagegraph = base_url + "coursemessagegraph/"+courseid;
			
			url_plan = base_url + "courseplan/"+courseid;

			url_activityfeed = base_url + "coursestatement/"+courseid;

			url_verbtrends = base_url + "courseverbtrends/"+courseid;
			url_usertrends = base_url + "courseactortrends/"+courseid;
			url_activitytrends = base_url + "coursetargettrends/"+courseid;

			url_quiz_reports = base_url + "results/course/"+courseid;
			var url_course_students = base_url + "results/courselist/"+courseid;


		} else if (analytics_mode == "sessionplan") {
			var sessionid = checkLocalStorage('current_session');
			
			url_activelearners = base_url + "sessionusers/"+sessionid;
			url_challenges = base_url + "sessionchallenges/"+sessionid;
			url_remediations = base_url +"sessionremediations/"+sessionid;
			
			url_activitygraph = base_url + "sessionactivitygraph/"+sessionid;
			url_usergraph = base_url +"sessionusergraph/"+sessionid;
			url_messagegraph = base_url + "sessionmessagegraph/"+sessionid;
			
			url_plan = base_url + "sessionplan/"+sessionid;

			url_activityfeed = base_url + "sessionstatement/"+sessionid;

			url_verbtrends = base_url + "sessionverbtrends/"+sessionid;
			url_usertrends = base_url + "sessionactortrends/"+sessionid;
			url_activitytrends = base_url + "sessiontargettrends/"+sessionid;

			url_quiz_reports = base_url + "results/session/"+sessionid;
			url_course_students = base_url + "results/sessionlist/"+sessionid;

		} else if (analytics_mode == "actorplan") {
			var actor = checkLocalStorage('current_actor');
			url_challenges = base_url + "actorchallenges/"+actor;
			url_remediations = base_url +"actorremediations/"+actor;
			url_activitygraph = base_url + "actoractivitygraph/"+actor;
			url_messagegraph = base_url + "actormessagegraph/"+actor;
			url_activityfeed = base_url + "actorstatement/"+actor;
			url_verbtrends = base_url + "actorverbtrends/"+actor;
			url_activitytrends = base_url + "actortargettrends/"+actor;
			
			url_quiz_reports = base_url + "results/actor/"+actor;
			url_course_students = base_url + "results/actorlist/"+actor;
			// 

		} 
		
		//ACTIVE LEARNERS
		$.getJSON( url_activelearners, function( json ) {
			$("#total_users").html(json.total);
			$("#active_users").html(json.active);
			$("#exhaustion_rate").html(json.inactive);
			$("#total_alerts").html(json.alerts);
		 });

		//CHALLENGES
		$.getJSON( url_challenges, function( json ) {
			$("#challenges_views").html(json.views);
			$("#challenges_submissions").html(json.submissions);
			$("#challenges_badges_awarded").html(json.badges_awarded);
			$("#challenges_alerts").html(json.alerts);
		 });

		//REMEDIATIONS
		$.getJSON( url_remediations, function( json ) {
			$("#remediation_enrolled").html(json.enrolled);
			$("#remediation_submissions").html(json.submissions);
			$("#remediation_converted").html(json.converted);
			$("#remediation_new").html(json.new);
		 });

		
		//ALERTS
		$.getJSON( url_openalerts, function( json ) {
			$("#openalerts_foryou").html(json.for_you);
			$("#openalerts_yourinstance").html(json.your_instance);
			$("#openalerts_good").html(json.good);
			$("#openalerts_bad").html(json.bad);
			$("#openalerts_solved").html(json.solved);
		 });
		
		//OPEN ALERTS
		$.getJSON( url_alerts, function( json ) {
			
			var tbody_alerts = $("#tbody_alerts");

			tbody_alerts.empty();
			
			jQuery.each(json, function(i, val) {
				tbody_alerts.append("<tr><td><input type='checkbox' id='row-"+i+"-select' name='row"+i+"select' value='true'></td>"+
						"<td><span class='status-sort'>d</span><i class='icon-dot red'></i></td>"+
						"<td>"+ val.ID +"</td>" +
						"<td>"+ val.Subject +"</td>" +
						"<td>"+ val.Requestor +"</td>" +
						"<td>"+ val.Updated +"</td>" +
						"<td>"+ val.Type +"</td>" +
						"<td>"+ val.Assignee +"</td>"				
					);
			});
			
		 });


		// quiz reports 
		var quizreports = $('#quiz-results');
		var quizreports_loop = 0;

		if(quizreports.length > 0){
			quizreports_loop++;
			quizreports.hide();
			console.log('------------------ quizreports_loop '+quizreports_loop +' ------------------ ');

			// $.getJSON( url_quiz_reports, function( json ) {

			// 	if(!("failed" in json)){
			// 		json.failed = [];
			// 		json.failed.Total = 0;
			// 		json.failed['Average Minutes'] = 0;
			// 	}

			// 	if(!("passed" in json)){
			// 		json.passed = [];
			// 		json.passed.Total = 0;
			// 		json.passed['Average Minutes'] = 0;
			// 	}

			// 	var failed = Math.round(json.failed.Total);
			// 	var passed = Math.round(json.passed.Total);
			// 	var totalQuizzes = Math.round(passed + failed);
			// 	var hasCourse = checkLocalStorage('current_course');
			// 	var studentList = $('#student-list');
			// 	var averageMin = Math.round(json.passed['Average Minutes']);

			// 	studentList.hide();

			// 	// ORIGINAL DNA STUDENTS POSITION

			// 	// build solid gauge charts
			//     var passedOptions = {

			//         chart: {
			//             type: 'solidgauge',
			//             style: {
			//             	fontFamily: 'Open Sans Condensed'
			//             },
			//             backgroundColor: '#E8FAEA'
			//         },

			//         title: null,

			//         pane: {
			//             center: ['50%', '85%'],
			//             size: '140%',
			//             startAngle: -90,
			//             endAngle: 90,
			//             background: {
			//                 backgroundColor: '#FFF',
			//                 innerRadius: '60%',
			//                 outerRadius: '100%',
			//                 shape: 'arc'
			//             }
			//         },

			//         tooltip: {
			//             enabled: false
			//         },

			//         // the value axis
			//         yAxis: {
			//             stops: [
			//                 [0.1, '#DF5353'], // red
			//                 [0.5, '#DDDF0D'], // yellow
			//                 [0.9, '#55BF3B'] // green      
			//             ],
			//             lineWidth: 0,
			//             minorTickInterval: null,
			//             tickPixelInterval: totalQuizzes*2,
			//             tickWidth: 0,
			//             title: {
			//                 y: -70,
			//                 style: {
			//                 	color: '#555555',
			//                 	fontWeight: 'bold'
			//                 }
			//             },
			//             labels: {
			//                 y: 16
			//             }
			//         },

			//         plotOptions: {
			//             solidgauge: {
			//                 dataLabels: {
			//                     y: 5,
			//                     borderWidth: 0,
			//                     useHTML: true
			//                 }
			//             }
			//         }
			//     };
			    
			//     var failedOptions = {

			//         chart: {
			//             type: 'solidgauge',
			//             style: {
			//             	fontFamily: 'Open Sans Condensed'
			//             },
			//             backgroundColor: '#FAE8E8'
			//         },

			//         title: null,

			//         pane: {
			//             center: ['50%', '85%'],
			//             size: '140%',
			//             startAngle: -90,
			//             endAngle: 90,
			//             background: {
			//                 backgroundColor: '#FFF',
			//                 innerRadius: '60%',
			//                 outerRadius: '100%',
			//                 shape: 'arc'
			//             }
			//         },

			//         tooltip: {
			//             enabled: false
			//         },

			//         // the value axis
			//         yAxis: {
			//             stops: [
			//                 [0.1, '#55BF3B'], // green
			//                 [0.5, '#DDDF0D'], // yellow
			//                 [0.9, '#DF5353'] // red
			//             ],
			//             lineWidth: 0,
			//             minorTickInterval: null,
			//             tickPixelInterval: totalQuizzes*2,
			//             tickWidth: 0,
			//             title: {
			//                 y: -70,
			//                 style: {
			//                 	color: '#555555',
			//                 	fontWeight: 'bold'
			//                 }
			//             },
			//             labels: {
			//                 y: 16
			//             }
			//         },

			//         plotOptions: {
			//             solidgauge: {
			//                 dataLabels: {
			//                     y: 5,
			//                     borderWidth: 0,
			//                     useHTML: true
			//                 }
			//             }
			//         }
			//     };

			//     // The speed gauge
			//     $('#container-passed').highcharts(Highcharts.merge(passedOptions, {
			//         yAxis: {
			//             min: 0,
			//             max: totalQuizzes,
			//             title: {
			//                 text: 'Passed',
			//                 style: { 'font-size' : '2.0em' }
			//             }
			//         },

			//         credits: {
			//             enabled: false
			//         },

			//         series: [{
			//             name: 'Passed',
			//             data: [passed],
			//             dataLabels: {
			//                 format: '<div style="text-align:center"><span style="font-size:25px;color:' +
			//                     ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
			//                        '<span style="font-size:12px;color:#999">'+Math.round(json.passed['Average Minutes'])+' avg min </span></div>' //+
			//                        //'<a href="">show students</a>'
			//             },
			//             tooltip: {
			//                 valueSuffix: ' avg min'
			//             }
			//         }]

			//     }));

			//     // The RPM gauge
			//     $('#container-failed').highcharts(Highcharts.merge(failedOptions, {
			//         yAxis: {
			//             min: 0,
			//             max: totalQuizzes,
			//             title: {
			//                 text: 'Failed',
			//                 style: { 'font-size' : '2.0em' }
			//             }
			//         },

			//         credits: {
			//             enabled: false
			//         },


			//         series: [{
			//             name: 'Failed',
			//             data: [failed],
			//             dataLabels: {
			//                 format: '<div style="text-align:center"><span style="font-size:25px;color:' +
			//                     ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
			//                        '<span style="font-size:12px;color:#999"> '+Math.round(json.failed['Average Minutes'])+' avg min</span></div>'//+
			//                        //'<a href="">show students</a>'
			//             },
			//             tooltip: {
			//                 valueSuffix: ' avg min'
			//             }
			//         }]

			//     }));

			// });

		}


		//OPEN ACTIVITY FEED - BVH
		/*$.getJSON( url_activityfeed, function( json ) {
			
			var tbody_activity = $("#tbody_activity");

			tbody_activity.empty()
			
			jQuery.each(json, function(i, val) {
				// if the NAME variable is populated, use it. Otherwise, use the email address
				if(val.NAME != "" && val.NAME != "undefined" && val.NAME != null){
					username = val.NAME;
				} else {
					username = val.ACTOR;
				}
				targeturl = val.TARGET;
				// if the ACTIVITY variable is populated, use it. Otherwise, use the VERB 
				if(val.ACTIVITY != "" && val.ACTIVITY != "undefined" && val.ACTIVITY != null){
					target = val.ACTIVITY;
				} else {
					// clean up target
					target = val.TARGET;
					target = target.replace('http://','');
				}

				// parse verb for endpoint
				act = val.VERB;
				act = act.split('/');
				act = act.slice(-1)[0];

				// map verbs to icons
				switch(act){
					case 'completed':
						actionclass = 'graduation-cap completed'; 
					break;
					case 'experienced':
						actionclass = 'flash experienced'; 
					break;
					case 'attempted':
						actionclass = 'target attempted'; 
					break;
					case 'answered':
						actionclass = 'check answered'; 
					break;
					default:
						actionclass = ''; 
				}


				tbody_activity.append("<tr><td>"+ val.SOURCE_TIMESTAMP +"</td>" +
						"<td>Knowledge</td>" +
						"<td><a href=\""+val.ACTOR+"\">"+ username +"</a></td>" +
						"<td style=\"text-transform:capitalize;\"><i class=\"icon-"+actionclass+"\"></i>"+ act +"</td>" +
						"<td><a href=\""+targeturl+"\"x>"+ target +"</a></td></tr>"				
						);
			});
 
			tbody_activity.trigger('update');	
		 });*/

		/*$("#level-filter").selectBoxIt({ 
			autoWidth: false,
			hideCurrent: false,
			showEffect: "fadeIn",
			showEffectSpeed: 400
		});
		var selectBox = $("#level-filter").data("selectBox-selectBoxIt");
		selectBox.refresh(); // Chaining method of repopulating the course data
		// end @BHRIV*/

		$('#level-filter').on('change',function(){
			console.log('level filter activated...');
			var selected = $(this).val();
			var tablebody = $('#tbody_activity');
			if(selected !== "NULL" && selected !== "ALL"){
				tablebody.find('tr').hide();
				tablebody.find('td[data-level="'+selected+'"]').parent().show();
			}else{
				tablebody.find('tr').show();
			}
		});

		$('#activity-chart').highcharts({
	        chart: {
	            type: 'area'
	        },
	        title: {
	            text: 'Bloom\'s Taxonomy Usage by Level for 2015' 
	        },
	        subtitle: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	            tickmarkPlacement: 'on',
	            title: {
	                enabled: false
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'Thousands'
	            },
	            labels: {
	                formatter: function () {
	                    return this.value / 1000;
	                }
	            }
	        },
	        tooltip: {
	            shared: true,
	            valueSuffix: ''
	        },
	        plotOptions: {
	            area: {
	                stacking: 'normal',
	                lineColor: '#666666',
	                lineWidth: 1,
	                marker: {
	                    lineWidth: 1,
	                    lineColor: '#666666'
	                }
	            }
	        },
	        series: [{
	            name: 'Knowledge',
	            data: [502, 635, 809, 947, 1402, 3634, 5268, 6000, 5434, 3000, 3430, 4348]
	        }, {
	            name: 'Comprehension',
	            data: [106, 107, 111, 133, 221, 767, 1766, 2012, 3011, 4890, 5000, 4899]
	        }, {
	            name: 'Application',
	            data: [163, 203, 276, 408, 547, 729, 628, 845, 988, 1023, 1500, 1822]
	        }, {
	            name: 'Analysis',
	            data: [18, 31, 54, 156, 339, 818, 1201, 1576, 1688, 1799, 1898, 2039]
	        }, {
	            name: 'Synthesis',
	            data: [2, 2, 2, 6, 13, 30, 46, 66, 109, 203, 312]
	        }, {
	            name: 'Evaluation',
	            data: [2, 2, 2, 6, 13, 30, 46, 56, 78, 99, 65, 22]
	        }]
	    });

		
		//OPEN VERB TRENDS - BVH
		$.getJSON( url_verbtrends, function( json ) {
			
			var verbtrendcontainer = $("#top-verbs");
			var verbs = [];

			jQuery.each(json, function(i, val) {
				// parse verb for endpoint
				act = val.VERB;
				act = act.split('/');
				act = act.slice(-1)[0];
				verbs.push([act, Number(val.COUNT)]);
			});

			//console.log(verbstr);

		    verbtrendcontainer.highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Verb usage'
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		                rotation: -45,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Occurrences'
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: 'Number of occurrences: <b>{point.y}</b>'
		        },
		        series: [{
		            name: 'Verb Usage',
		            data: 
		            		verbs
		                ,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            }
		        }]
		    });
		
		 });

		//OPEN USER TRENDS - BVH
		$.getJSON( url_usertrends, function( json ) {
			
			var usertrendcontainer = $("#top-users");
			var users = [];

			//console.log(json);

			jQuery.each(json, function(i, val) {
				// parse user for endpoint
				if(val.NAME == null){
					act = val.ACTOR;
					act = act.replace('mailto:','');
				}else{
					act = val.NAME;
				}
				users.push([act, Number(val.COUNT)]);
			});

			//console.log(verbstr);

		    usertrendcontainer.highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Users'
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		                rotation: -45,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Occurrences'
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: 'Number of occurrences: <b>{point.y}</b>'
		        },
		        series: [{
		            name: 'Users',
		            data: 
		            		users
		                ,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            }
		        }]
		    });
		
		 });

		//OPEN ACTIVITY TRENDS - BVH
		$.getJSON( url_activitytrends, function( json ) {
			
			var activitytrendcontainer = $("#top-activities");
			var activities = [];

			//console.log(json);

			jQuery.each(json, function(i, val) {
				// parse user for endpoint
				if(val.ACTIVITY == null){
					act = val.TARGET;
				}else{
					act = val.ACTIVITY;
				}
				activities.push([act, Number(val.COUNT)]);
			});

			//console.log(verbstr);

		    activitytrendcontainer.highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Activities'
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		                rotation: -45,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Occurrences'
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: 'Number of occurrences: <b>{point.y}</b>'
		        },
		        series: [{
		            name: 'Activities',
		            data: 
		            		activities
		                ,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            }
		        }]
		    });
		
		 });

		coursePeformance(url_activitygraph, url_usergraph, url_messagegraph);

		$('#refresh-course-performance').on('click',function(e){
			e.preventDefault();
			coursePeformance(url_activitygraph, url_usergraph, url_messagegraph);
		});

	}

	// window.renderDash=renderDash;
	// END RENDER DASH

	
	function coursePeformance(urlu, urla, urlm){

		//HOME- User Graph
		$.getJSON( urlu, function( json ) {
			
			$('#usergraph').highcharts({
		        title: {
		            text: 'Users',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: json.catagories
		        },
		        yAxis: {
		            title: {
		                text: 'Users'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: ' Users'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: json.name,
		            data: json.data
		        }]
		    });
		
		});

		//HOME- Activity Chart 
		$.getJSON( urla, function( json ) {
			
			$('#activitygraph').highcharts({
		        title: {
		            text: 'Activities',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: json.catagories
		        },
		        yAxis: {
		            title: {
		                text: 'Activities'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: ' Activities'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: json.name,
		            data: json.data
		        }]
		    });
		
		});

		//HOME- Messages Chart 
		$.getJSON( urlm, function( json ) {
			
			$('#messagegraph').highcharts({
		        title: {
		            text: 'Messages',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: json.catagories
		        },
		        yAxis: {
		            title: {
		                text: 'Messages'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: ' Messages'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: json.name,
		            data: json.data
		        }]
		    });
		
		});
		
		
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

});



/**
 * Author: Bret Van Horn
 * 
 */
$( document ).ready(function() {
	var actor = user.email; //user.email;
	var mode;
	var pcid;
	
	setVarsFromLocalStorage();

	var base_url = urls.messaging;
    var attachment_url = urls.attachment;
	var mid = message.id; // individual message id
	// message actions
	var url_message_full = base_url + "message/"+mid; // returns full message; arg = message id
	var url_message_send = base_url + "message/"; // sends message
	var url_message_reply = base_url + "reply/"; // REPLY - POST DATA
	var url_message_delete = base_url + "message/remove/"; // ID - DELETE - POST DATA
	// message filter views
	var url_messages_10 = base_url + "messages"; // returns 10 summaries
	var url_messages_plan = base_url + "message/plan/"; // All messages in a plan; arg = plan id
	var url_messages_course = base_url + "message/course/"; // All messages in a course; arg = course id
	var url_messages_session = base_url + "message/session/"; // All messages in a plan; arg = plan id
	var url_messages_actor = base_url + "message/actor/"; // All messages in a course; arg = course id
	// inbox
	var url_messages_inbox = base_url + "message/actor/"+actor; // All messages TO an actor - INBOX; arg = actor email
	var url_messages_inbox_plan = base_url + "message/plan/"; // All messages within plan - inbox
	var url_messages_inbox_course = base_url + "message/course/"; // All messages within course plan - inbox
	var url_messages_inbox_session = base_url + "message/session/"; // All messages within course plan - inbox
	var url_messages_inbox_actor = base_url + "message/actor/"; // All messages within course plan - inbox
	// notifications
	var url_messages_note = base_url + "notification/actor/"+actor; // All messages TO an actor - INBOX; arg = actor email
	var url_messages_note_plan = base_url + "notification/plan/"; // All messages within plan - inbox
	var url_messages_note_course = base_url + "notification/course/"; // All messages within course plan - inbox
	var url_messages_note_session = base_url + "notification/session/"; // All messages within course plan - inbox
	var url_messages_note_actor = base_url + "notification/actor/"; // All messages within course plan - inbox
	// sent
	// most of these don't have endpoints yet, so we just load all sent for each filter. 
	var url_messages_sent = base_url + "message/sender/"+actor; // All messages within course plan - sent
	var url_messages_sent_course = base_url + "message/sender/"+actor; // All messages within course plan - sent
	var url_messages_sent_session = base_url + "message/sender/"+actor; // All messages within course plan - sent
	var url_messages_sent_actor = base_url + "message/sender/"+actor; // All messages within course plan - sent
	//attachments
	var url_lookup_attachments = base_url + "message/attachments/"; // Look up all attachment IDs for a message
	var url_get_attachment = attachment_url+"metadata/"; // Get attachment for a message
	var url_file_upload = attachment_url+'attachment';
	var url_get_sender_photo = '/app_dev.php/messages/actorphoto/';
	var upload_user = 'lumious';
	var upload_pass = '0zdkkINkN8y5qmOS';
	var loader = $('.loading');
	var empty = $('.empty');
	var notified = new Array();
	var uploaded_files = new Array();
	// instantiate dropzone so we can do stuff
	//var myDropzone = new Dropzone("#attachment-form", { url: "https://playground.learningconsole.com/lumiousattachment/"});
	// disable auto processing
	// Dropzone.options.myDropzone = false;
	
	// map priorities to gumby indicator css classes
	var priority_map = {
		Low : 'default',
		Normal : 'primary',
		High : 'danger'
	}

	var priority_icon_map = {
		Low : 'down',
		Normal : 'mail',
		High : 'attention'
	}

	var attachment_icon_map = {
		jpeg : 'image',
		jpg : 'image',
		png : 'image',
		gif : 'image',
		tiff : 'image',
		tif : 'image',
		bmp : 'image',
		pdf : 'pdf',
		zip : 'zip',
		csv : 'excel',
		word : 'word',
		mpeg : 'audio',
		mp3 : 'audio',
		quicktime : 'video',
		mp4 : 'video'
	}


	// set up remediation and challange plan select menus for forms
	var plantypeform = $('.chalrem-form');
	var plantypeselectmenu = $('.chalrem-form #PlanID');
	plantypeform.each(function(){
		var pmode = $(this).attr('data-type');
		var post_url = base_url + pmode + 'plan/';
		var thisform = $(this);
		$.ajax({
		    url: post_url,
		    type: 'GET',
		    success: function(result) {
		       console.log(result);
		       $.each(result, function(i, val) {
		       		thismenu = $(thisform).find('#PlanID');
		       		thismenu.append('<option value="'+val.ID+'">'+val.name+'</option>');	
		       });
		   	}
		});
	});	

	// MESSAGES INBOX FOR CURRENT USER
	if($('#messages-inbox #messages-body').length){
		tmpurl = mailPrep();
		checkMail(tmpurl);
		var checker = setInterval(function() { checkMail(tmpurl) }, 60000);
	}

	// MESSAGES SENT FOR CURRENT USER
	if($('#messages-sent #messages-body').length){
		tmpurl = mailPrep();
		checkMail(url_messages_sent);
		//var checker = setInterval(checkMail, 60000);
	}

	// NOTIFICATIONS FOR CURRENT USER
	if($('#messages-note #messages-body').length){
		tmpurl = mailPrep();
		checkMail(url_messages_note);
		//var checker = setInterval(checkMail, 60000);
	}

	// REFRESH INBOX EVENT LISTENER
	$('#messages-inbox .refresh-inbox').on("click", function(e){
		e.preventDefault();
		tmpurl = mailPrep();
		checkMail(tmpurl);
	});

	// MESSAGE DETAIL
	if($('#widget-message-detail').length){
		$.getJSON( url_message_full, function( json ) {	
			var replytext = "";
			var replytextfield = $('#message-reply-text');
			var replytofield = $('#reply-to');
			var replysubjectfield = $('#reply-subject');
			var replymessageidfield = $('#reply-id');
			var attachmentcontainer = $('#attachments');
			console.log(json);

			jQuery.each(json, function(i, val) {
				//console.log(val.Attachment);
				if(val.Attachment != "0"){
					console.log('checking attachments...');
					attachmentcontainer.show();
					getAttachments(val.ID);
				}else{
					console.log('not checking attachments...');
					attachmentcontainer.hide();
				}
				replytext = "<br><br><strong>On "+val.Time_Initiated+", "+val.From+" wrote:</strong><br>";
				// grab sender's photo for display
				$.ajax({
				    url: url_get_sender_photo+val.From,
				    type: 'GET',
				    success: function(result) {
				    	val.Senderphoto = '<img src="'+result+'">';
				    	// bind data to table template
						dna.clone('widget-message-detail', val, {html: true, fade: true});
					}
				});
				replytext += quoteReply(val.Message);
				replytextfield.val(replytext);
				replytofield.val(val.From);
				replysubjectfield.val('Re: '+val.Subject);
				replymessageidfield.val(val.ID);
			});
		});
	}
	// SEND NEW MESSAGE 
	$('#message-form').on('submit', function(e){
		e.preventDefault();
		var active_uploads = $('#fileupload').fileupload('active');
		console.log('total current uploads: '+active_uploads);
		var obj = $(this);

		if(active_uploads > 0){
			$('#fileupload').bind('fileuploadstop', function (e, data) {
				console.log('uploads done....');
				console.log(uploaded_files);
				messageSend(obj);
			});
		}else{
			console.log("no uploads in process");
			messageSend(obj);
		}
		
	});


	// SEND REPLY
	$('#reply-form').on('submit', function(e){
		e.preventDefault();
		var $form = $(this);
		var id = $form.find( "input[name='MessageID']" ).val();
		var to = $form.find( "input[name='To']" ).val();
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var priority = $( "#Priority option:selected" ).text();
		var data = {
			MessageID: id,
			To: to,
			From: from,
			Subject: subject,
			Message: message,
			Type: 'Message',
			Priority: priority
		}
		var send = $.post(url_message_reply, data, function(response){
			//console.log(response);
			window.location = "/app_dev.php/messages/home";
			//checkMail();
		}).fail(function(){
			alert("Your message was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
		
	});

	// SEND HELP/CONTACT/SUGGESTION REQUEST
	$('#messaging-form').on('submit', function(e){
		e.preventDefault();
		var $form = $(this);
		var mode = $(this).attr('class');
		var post_url = base_url + mode + '/';
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var data = {
			From: from,
			Subject: subject,
			Message: message,
		}
		var send = $.post(post_url, data, function(response){
			//console.log(response);
			$('#messaging-form').trigger('reset');
			for (instance in CKEDITOR.instances){
   				CKEDITOR.instances[instance].setData(" ");
			}
			alert("Your was successfully sent. You will receive a response soon.");
			//checkMail();
		}).fail(function(){
			alert("Your request was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
	});

	// SEND CHALLENGE OR REMEDIATION
	$('.chalrem-form').on('submit', function(e){
		e.preventDefault();
		var $form = $(this);
		var mode = $(this).attr('data-type');
		var post_url = base_url + mode + '/';
		//console.log(post_url);
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var to = $form.find( "input[name='To']" ).val();
		var planid = $form.find( "#PlanID" ).val();
		var data = {
			To: to,
			From: from,
			Subject: subject,
			Message: message,
			PlanID: planid,
			SendMail: 1
		}
		//console.log(data);
		var send = $.post(post_url, data, function(response){
			//console.log("response from sending:");
			//console.log(response);
			$('.chalrem-form').trigger('reset');
			for (instance in CKEDITOR.instances){
   				CKEDITOR.instances[instance].setData(" ");
			}
			$form.parent().parent().removeClass('active');
			alert("Your "+mode+" was successfully sent.");
			//checkMail();
		}).fail(function(){
			alert("Your request was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
	});

	// DELETE MESSAGE 
	$('body').on('click','.message-delete',function(e){
		$.support.cors = true;
		e.preventDefault();
		var id = $(this).attr('data-id');
		if(window.confirm("Are you sure you want to delete this message? Deletions cannot be undone. Proceed?")){
			var dstatus = deleteAttachments(id);
			console.log(dstatus);
			if(dstatus == "okay"){
				console.log("attachments deleted");
			}else{
				console.log("attachments NOT deleted");
			}
			$.ajax({
			    url: url_message_delete+id,
			    type: 'GET',
			    success: function(result) {
			       // Do something with the result
			       // console.log(result);
			       // window.location = "/Symfony/web/app_dev.php/messages/home";
			       if($('body').hasClass('sent')){
			       		url = url_messages_sent;
			       }else{
			       		url = url_messages_inbox;
			       }
			       checkMail(url);
			   	}
			});
		}
	});

	function mailPrep(){
		setVarsFromLocalStorage();
		if(mode == "plan"){
			tmpurl = url_messages_inbox_plan+pcid;
		}else if(mode == "courseplan"){
			tmpurl = url_messages_inbox_course+pcid;
		}else if(mode == "sessionplan"){
			tmpurl = url_messages_inbox_session+pcid;
		}else if(mode == "actorplan"){
			tmpurl = url_messages_inbox_actor+pcid;
		}else{
			tmpurl = url_messages_inbox;
		}
		console.log('checking this:'+tmpurl);

		return tmpurl;
	}

	window.mailPrep = mailPrep;

	// return attachments
	function getAttachments(message_id){
		console.log('getting attachments...');
		// look up attachments for message from Bruce's API
		var attachment_links = new Array();
		var attach_lookup_url = url_lookup_attachments + message_id;
		$.ajax({
		    url: attach_lookup_url,
		    type: 'GET',
		    success: function(result) {
		       console.log(result);
		       jQuery.each(result, function(i, val) {
		       		// loop through and get actual attachments from Chris's API
					attach_url = url_get_attachment + val.AttachmentID;
					console.log("loading: "+attach_url);
					var adata = $.ajax({
					    url: attach_url,
					    type: 'GET',
					    autoSubmit: false,
					    xhrFields: {
					        withCredentials: true
					    },
					    beforeSend: function (xhr) { 
					        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(upload_user + ":" + upload_pass));             
					    },
					    crossDomain: true,
					    success: function(result) {
					    	var aname = result.filename;
					    	var atype = result.mimetype.split('/');
					    	var asize = Math.round((result.filesize / 1048576) * 100) / 100;
					    	var sizetype = "mb";
					    	if(asize < 1){
					    		asize = Math.round((result.filesize / 1024) * 100) / 100;
					    		sizetype = "kb";
					    	}
					    	console.log(atype[1]);
					    	var icon = getIcon(atype[1]);
					    	var tmp = '<li><a href="/app_dev.php/messages/attachment/'+val.AttachmentID+'" class="ttip switch" data-tooltip="'+aname+' | '+asize+' '+sizetype+'"><i class="fa fa-file-'+icon+'o fa-2x"></i></a></li>'
					       	$(".message-attachments").append(tmp);
					    	console.log(tmp);
					   	}
					});
		       });
		   	}
		});
	}

	// delete attachments
	function deleteAttachments(message_id){
		console.log('getting attachments...');
		// look up attachments for message from Bruce's API
		var attachment_links = new Array();
		var attach_lookup_url = url_lookup_attachments + message_id;
		var status = false;
		$.ajax({
		    url: attach_lookup_url,
		    type: 'GET',
		    success: function(result) {
		       console.log(result);
		       jQuery.each(result, function(i, val) {
		       		// loop through and get actual attachments from Chris's API
					attach_url = url_file_upload + "/" + val.AttachmentID;
					console.log("deleting: "+attach_url);
					var adata = $.ajax({
					    url: attach_url,
					    type: 'DELETE',
					    autoSubmit: false,
					    xhrFields: {
					        withCredentials: true
					    },
					    beforeSend: function (xhr) { 
					        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(upload_user + ":" + upload_pass));             
					    },
					    crossDomain: true,
					    success: function(result) {
					    	console.log(result.status);
					    	status = result.status;
					   	},
					   	error: function(result) {
					   		console.log(result.status);
					   	}
					});
		       });
		   	}
		});
		return status;
	}

	function setVarsFromLocalStorage(){
		mode = checkLocalStorage('filter_mode');

		if(mode == 'plan'){
			pcid = checkLocalStorage('current_plan');
		}else if(mode == 'courseplan'){
			pcid = checkLocalStorage('current_course');
		}else if(mode == 'sessionplan'){
			pcid = checkLocalStorage('current_session');
		}else if(mode == 'actorplan'){
			pcid = checkLocalStorage('current_actor');
		}else{
			pcid = "";
		}
	}

	window.setVarsFromLocalStorage = setVarsFromLocalStorage;

	// this does the heavy lifting for message sending so it can be reused and called from callback methods
	function messageSend(obj){
		var $form = $(obj);
		var to = $form.find( "input[name='To']" ).val();
		var from = actor;
		var subject = $form.find( "input[name='Subject']" ).val();
		var message = $form.find( "textarea[name='Message']" ).val();
		var priority = $( "#Priority option:selected" ).text();

		var data = {
				To: to,
				From: from,
				Subject: subject,
				Message: message,
				Type: 'Message',
				Priority: priority,
				Attachment: uploaded_files
		}
		console.log(data);
		var send = $.post(url_message_send, data, function(response){
			console.log(response);
			window.location = "/app_dev.php/messages/home";
			//checkMail();
		}).fail(function(){
			alert("Your message was not sent due to an undisclosed error. Please check your recipient email address to ensure it's valid and try again.");
		});
	}

	// function to check email
	function checkMail(url){
		console.log("checking mail...");
		var notify = false;
		hideEmptyMessage();
		dna.empty('messages-body', { fade: true });
		showLoader();
		// console.log("checking mail...");
		// console.log("notified messages: ");
		// console.log(notified);
		$.getJSON( url, function( json ) {
			//console.log(json);
			if(json.length !== 0){
				jQuery.each(json, function(i, val) {
					// this is hacky, but dnajs
					if(val.Read == "0"){
						val.Read = 'unread';
						if($.inArray(val.ID,notified) === -1){
							notify = true;
							notified.push(val.ID);
						}
					}else{
						val.Read = 'read';
					}
					// reassign priority variable to contain html needed to display proper icons
					val.Priority = '<span class="'+priority_map[val.Priority]+' badge"><i class="icon-'+priority_icon_map[val.Priority]+'"></i></span>';
					
					/*if(val.Attachment != "0"){
						val.Attachmentcode = '<i class="icon-attach"></i>';
					}else{
						val.Attachmentcode = "";
					}*/

					// grab sender's photo for display
					$.ajax({
					    url: url_get_sender_photo+val.From,
					    type: 'GET',
					    success: function(result) {
					    	val.Senderphoto = '<img src="'+result+'">';
					    	// bind data to table template
							dna.clone('messages-body', val, {html: true, fade: true});
							// update table so sorting works after ajax call
							 $("#sortable").trigger("update"); 
				            // set sorting so new messages appear at top 
				            var sorting = [[3,1]]; 
				            $("#sortable").trigger("sorton",[sorting]); 
					    }
					});
					
				});
				if(notify){
					// play audio notification for unread message(s)
					//audio.play();
				}
			}else{
				showEmptyMessage();
			}
		});
		hideLoader();
	}

	window.checkMail = checkMail;

	// upload files
	$('#fileupload').fileupload({
        url: url_file_upload,
        dataType: 'json',
	    /*username: upload_user,
	    password: upload_pass,*/
        autoSubmit: false,
        xhrFields: {
	        withCredentials: true
	    },
	    beforeSend: function (xhr) { 
	        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(upload_user + ":" + upload_pass));  
	    },
	    crossDomain: true,
	    submit: function (e, data) {
	    	$.each(data.files, function (index, file) {
        		console.log('Added file: ' + file.size);
        		// customize the url to append the metadata to the URL for quicker link building
        		data.url = url_file_upload+"?filename="+file.name+"&mimetype="+file.type+"&filesize="+file.size;
		    });
	    },
        done: function (e, data) {
        	console.log(data.files.file);
        	uploaded_files.push(data.result.id);
        	$.each(data.files, function (index, file) {
	            $('<p/>').html('<i class="icon-check"></i>'+file.name).appendTo('#files');
	        });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .progress-bar').css(
                'width',
                progress + '%'
            );
        },
        error: function (request, textStatus, errorThrown) {
	        console.log(request.responseText);
	        console.log(textStatus);
	        console.log(errorThrown);
	    }
	    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

	function getIcon(key){
		if(attachment_icon_map[key] !== undefined){
			return attachment_icon_map[key]+"-";
		}else{
			return "";
		}
	}

	// utility functions

	// LOADING ANIMATION
	function showLoader(){
		//console.log("showing loader...");
		loader.fadeIn();
	}

	function hideLoader(){
		//console.log("hiding loader...");
		loader.fadeOut();
	}

	function showEmptyMessage(){
		empty.fadeIn();
	}

	function hideEmptyMessage(){
		empty.fadeOut();
	}

	// FORMAT QUOTED TEXT
	function quoteReply(text){
		var len = text.length;
		var linelen = 72;
		var textpart = "";
		var quoted;
		text = text.replace("<p>","");
		text = text.replace("</p>","");
		if(len > linelen){
			for(i=0; i<len; i+=linelen){
				//console.log(i);
				textpart += "&gt; "+text.substr(i,linelen)+"<br>";
				//console.log(textpart);
			}
		} else {
			textpart = "&gt; "+text+"<br>";
		}
		quoted = textpart;
		//console.log(quoted);//
		return quoted;
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
});
