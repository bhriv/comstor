// Main.js non-minified

// ===========================
// Force Login for some Links - use for testing simple functions such as 'Document Ready' state etc.
// ===========================

function you_must_login(){
  alert('Please Log In.')
}


/*****************************************************************/
/*************************** UX Actions *****************************/
/*****************************************************************/

$('#actions .action').on('click', function(event) {
  trackAction(event);    
});

$('#deal').on('click', function(event) {
  localStorage.setItem('hand_is_ended','false');
  console.log('Deal click.');
});

    
/*****************************************************************/
/***************************  Debugging Functions ***************/
/*****************************************************************/

  function cheatModeToggle(){
    $('.cheatmode').toggle();
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

  function setStartDate(){
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

  function refreshDashboard(){
    console.log('-- refreshDashboard ---');
    var a = localStorage.getItem( 'start_date' );
    var b = localStorage.getItem( 'end_date' );
    var c = localStorage.getItem( 'metric_type' );
    var d = localStorage.getItem( 'app_metric_specific' );
    // var e = localStorage.getItem( 'event_metric_specific' );
    if (a && b && c && d) {
      console.log('All requirements met, runDashboard executing');
      runDashboard();
    }else{
      console.log('All requirements NOT met, runDashboard NOT executing');
    }
  }

/*****************************************************************/
/***************************  Check Variable Values *********************/
/*****************************************************************/

  function checkUserSessionID(){
    var my_session_id = localStorage.getItem( 'session_id' );
    return my_session_id;
  }
  
  function checkStartDate(){
    var start_date = localStorage.getItem( 'start_date' );
    console.log('STORAGE start_date: '+start_date)
    return start_date;
  }

  function checkEndDate(){
    var end_date = localStorage.getItem( 'end_date' );
    console.log('STORAGE end_date: '+end_date)
    return end_date;
  }

  function checkMetricType(){
    var metric_type = localStorage.getItem( 'metric_type' );
    console.log('STORAGE metric_type: '+metric_type)
    return metric_type;
  }

  function checkAppMetricSpecific(){
    var app_metric_specific = localStorage.getItem( 'app_metric_specific' );
    console.log('STORAGE app_metric_specific: '+app_metric_specific)
    return app_metric_specific;
  }

  function checkEventMetricSpecific(){
    var event_metric_specific = localStorage.getItem( 'event_metric_specific' );
    console.log('STORAGE event_metric_specific: '+event_metric_specific)
    return event_metric_specific;
  }


/*****************************************************************/
/***************************  General **************************/
/*****************************************************************/

  function startSession(){
    // Clear stored session_id
    setSessionID();
  }

  function clearSession(){
    localStorage.setItem( 'session_id','');
    localStorage.setItem( 'start_date','');
    localStorage.setItem( 'end_date','');
    console.log('CLEARED:');
  }
  
// Get Stored Data

  $('#getactor').on('click', function(event) {
    // getActorFromEndpoint();
  });

// Document Ready Functions

$(document).ready(function() {

  console.log('Document ready');

  $('.hideme').hide();
    
  setSessionID();

  // Setup UX with Previous selections from Local Storage

  $('#start_date').val(checkStartDate());
  $('#end_date').val(checkEndDate());
  
  // auto load from Storage
  $("#metric_type select option").filter(function() {
      return $(this).val() == checkMetricType(); 
  }).prop('selected', true);
  
  // $("#app_metric_specific select option").filter(function() {
  //     return $(this).val() == checkAppMetricSpecific(); 
  // }).prop('selected', true);
  
    
  // UX Functions

  $(".restart").click(function() {
    clearSession();
  });

  $("#testFlurryAnalytics").click(function() {
    testFlurryAnalytics();
  });

  $("#getData").click(function() {
    getData();
  });


  // Date Picker Processing

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


  // UX filter event listeners to determine data query type

  // $('#controller .date_changer').on('change', function() {
  //   refreshDashboard();
  // }); 

  $('#flurry_reports select').on('change', function() {
    refreshDashboard();
  });

  $('#metric_type select').on('change', function() {
      var metric_type = $(this).val();
      console.log('metric_type: ' +metric_type);
      setMetricType(metric_type);
      console.log('NEW metric_type:' +metric_type);
  });

  $('#app_metric_specific select').on('change', function() {
      var app_metric_specific = $(this).val();
      console.log('app_metric_specific: ' +app_metric_specific);
      setAppMetricSpecific(app_metric_specific);
      console.log('NEW app_metric_specific:' +app_metric_specific);
  });

  $('#event_metric_specific select').on('change', function() {
      var event_metric_specific = $(this).val();
      console.log('event_metric_specific: ' +event_metric_specific);
      setEventMetricSpecific(event_metric_specific);
      console.log('NEW event_metric_specific:' +event_metric_specific);
  });

}); 
// end Doc Ready 

$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd'
});

function runDashboard(){
  console.log('----- runDashboard -----')
  
  var url_course_graph = 'http://akronzip.com/course/graph/30';
  var course_data_loaded = $.getJSON(url_course_graph);

  var url_flurry_api = constructFlurryEndpoint();
  var flurry_data_loaded = $.getJSON( url_flurry_api);

  $.when(course_data_loaded,flurry_data_loaded).done(function(course_object,flurry_object) {
    console.log('course_data_loaded & flurry_data_loaded is DONE');
    
    /* ---------------------- */
    /* ------ COURSE DATA --- */
    /* ---------------------- */

      console.log('course_object');
      // flatten response object
      course_object = course_object[0];
      console.log(course_object);
      // get all of the keys and values
      $.each(course_object, function(key, value){
        var date_timestamp = moment(key).unix();
        dates.push(date_timestamp);
        // dates.push(key);
        course_values.push(value);
      });
      console.log('DATES');
      console.log(dates);
      console.log('course_values');
      console.log(course_values);

    /* ---------------------- */
    /* ------ FLURRY DATA --- */
    /* ---------------------- */
    
      console.log('flurry_object');
      // flatten response object
      flurry_object = flurry_object[0];
      console.log(flurry_object);

      //By using javasript json parser
      console.log('@generatedDate:' +flurry_object['@generatedDate']);
      console.log('@startDate:' +flurry_object['@startDate']);
      console.log('@endDate:' +flurry_object['@endDate']);
      console.log('@metric:' +flurry_object['@metric']);
      console.log('@version:' +flurry_object['@version']);

      if (url_country == 'ALL') {
        console.log('url_country: '+url_country);
        flurry_country_data = flurry_object['country'];
        flurry_metric_data = flurry_country_data['day'];  
      }else{
        alert('Currently Configured to query ALL countries');
      }
      flurry_dates = _.pluck(flurry_metric_data,'@date');
      flurry_values = _.pluck(flurry_metric_data,'@value');

      
      console.log('FLURRY PLUCKED DATES:')
      console.log(flurry_dates); 

      var flurry_moment_dates = [];
      $.each(flurry_dates, function(key, value){
        var date_timestamp = moment(value).unix();
        flurry_moment_dates.push(date_timestamp);
      });
      console.log('FLURRY moment DATES:')
      console.log(flurry_moment_dates); 

      console.log('FLURRY PLUCKED VALUES:')
      console.log(flurry_values);
    
    /* ---------------------- */
    /* ------ COMBINED DATA --- */
    /* ---------------------- */

    combined_dates = dates.concat(flurry_moment_dates);
    // combined_dates = dates.concat(flurry_dates);
    combined_dates = _.uniq(combined_dates);

    console.log('combined_dates');
    console.log(combined_dates);
    var sorted_dates = combined_dates.sort(function(a, b) {return a - b;}); 
    // Sort courseIDs lowest to hightest
    // combined_dates = combined_dates.sortBy(function(o){ return new Date( o.date ) });
    console.log('SORTED combined_dates');
    console.log(sorted_dates);

    var sorted_moment_dates = [];
    $.each(sorted_dates, function(key, value){
      var date_timestamp = moment(key).format('YYYY-MM-DD');
      sorted_moment_dates.push(date_timestamp);
    });
    // @TODO - ensure data still matches the date plotting on the graph
    // combined_dates = sorted_moment_dates;
    newChart();

  }); 
  console.log('------ end runDashboard -------') ;
}

function newChart(){
  //Chart Data
  
    var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: combined_dates,
      datasets: [
          {
              fillColor: "transparent",
              strokeColor: "#fe5f55",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: course_values
          },
          {
              fillColor: "transparent",
              strokeColor: "#82bfd8",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: flurry_values
          }
      ]
    },
    latestLabel = startingData.labels[6];
    // Reduce the animation steps for demo clarity.
    var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
  
} // end newChart

/***********************************************************************/
/************************************* Flurry API **********************/
/***********************************************************************/

var apiAccessCode             = 'FX2FBFN9RQXW8DKJH4WB',
    apiKey                    = 'VW7Z3VDXXSK7HM6GKWZ3',
    flurry_country_data       = [], 
    flurry_metric_data        = [],

    dates                     = [],
    combined_dates            = [],
    flurry_dates              = [],
    course_values             = [],
    course_object             = [],
    flurry_values             = [],
    flurry_object             = [],

    url_metric_type           = '',
    url_app_metric_specific   = '',
    url_startDate             = '',
    url_endDate               = '',
    url_country               = 'ALL',
    url_new_Flurry            = '',
    base_url_Flurry           = 'http://api.flurry.com/';

function constructFlurryEndpoint(){
  url_metric_type           = checkMetricType(),
  url_app_metric_specific   = checkAppMetricSpecific(),
  url_startDate             = checkStartDate(),
  url_endDate               = checkEndDate(),
  url_country               = 'ALL';
  url_new_Flurry = base_url_Flurry + url_metric_type + '/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
  // var DEBUG_url_new_Flurry = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=FX2FBFN9RQXW8DKJH4WB&apiKey=VW7Z3VDXXSK7HM6GKWZ3&startDate=2015-01-01&endDate=2015-10-31&country=ALL';
  console.log('API URL: '+url_new_Flurry);
  return url_new_Flurry;
}

function testFlurryAnalytics(){
  console.log('----- START testFlurryAnalytics -----');
  constructFlurryEndpoint();
  
  $.getJSON( url_new_Flurry, function( Flurry_json ) {
    console.log('getting url_Flurry data...');
    console.log(Flurry_json);
      //By using javasript json parser
      console.log('@generatedDate:' +Flurry_json['@generatedDate']);
      console.log('@startDate:' +Flurry_json['@startDate']);
      console.log('@endDate:' +Flurry_json['@endDate']);
      console.log('@metric:' +Flurry_json['@metric']);
      console.log('@version:' +Flurry_json['@version']);

      if (url_country == 'ALL') {
        console.log('url_country: '+url_country);
        flurry_country_data = Flurry_json['country'];
        flurry_metric_data = flurry_country_data['day'];  
      }else{
        alert('Currently Configured to query ALL countries');
      }
      flurry_dates = _.pluck(flurry_metric_data,'@date');
      flurry_values = _.pluck(flurry_metric_data,'@value');
      console.log('FLURRY PLUCKED DATES:')
      console.log(flurry_dates); 
      console.log('FLURRY PLUCKED VALUES:')
      console.log(flurry_values);
      
    console.log('----- END testFlurryAnalytics -----');
  });
}


function getAllData(){
  var selected_course_id = 33;
  // ajax URLs

  url_course_students = 'http://www.akronzip.com/lumiousreports/studentdata/628';
  url_course_quiz = 'http://www.akronzip.com/lumiousreports/quizlookup/55';

  // store results from these static URLs as objects to use with promises
  var students = $.getJSON(url_course_students);
  var quizzes = $.getJSON(url_course_quiz);

  // declare variables for student object
  var student_id = null;
  var student_firstname = null;
  var student_lastname = null;

  // declare variables for quiz object
  var quiz_id = null;
  var quiz_course = null;
  var quiz_name = null;

  var student_array = [];
  var quiz_array = [];
  // wait for all three ajax requests to complete before we proceed
  $.when(students,quizzes).done(function(studentobject, quizobject) {

      // dig down to the responseText object
      var s = $.parseJSON(studentobject[2].responseText);
      var q = $.parseJSON(quizobject[2].responseText);

      console.info("Student and Quiz Data for Course " + selected_course_id);
      console.info(s);
      console.info(q);

      // Pull Data from Multiple API Endpoint asynchronoulsy 
      jQuery.each(q, function(i, qdata) {
        console.log('QUIZ DATA');
          quiz_id = qdata.id;
          quiz_course = qdata.course;
          quiz_name = qdata.name;
          quiz_array.push(quiz_id,quiz_course,quiz_name);
          console.log(quiz_array);
      });

      jQuery.each(s, function(i, sdata) {
        console.log('STUDENT DATA');
          student_id = sdata.id;
          student_firstname = sdata.firstname;
          student_lastname = sdata.lastname;
          student_array.push(student_id,student_firstname,student_lastname);
          console.log(student_array);
      });
      // testFlurryAnalytics();
  });
}

// Merge two arrays
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
// Reference 
// var searchresult = findStudentByID(s,attempt_user);

// function findStudentByID(arr,sid){
//     var result = $.grep(arr, function(e){ return e.id == sid; });
//     console.log("Student Search Result: ");
//     console.log(result);
//     if(result){
//         return result;
//     }else{
//         return false;
//     }
// }

var temp_student_result = '{
  "user": {
    "id": "17",
    "username": "jbandlow",
    "firstname": "Joanne",
    "lastname": "Bandlow",
    "email": "Joanne.bandlow@twcable.com",
    "city": "Herndon",
    "country": "US",
    "lang": "en",
    "timezone": "99",
    "firstaccess": "1375713529",
    "lastaccess": "1428695804",
    "lastlogin": "1428679875",
    "currentlogin": "1428695537",
    "lastip": "65.189.101.222",
    "picture": "0",
    "url": "",
    "timecreated": "1375461523",
    "timemodified": "1375461523",
    "log": [
      {
        "id": "7825", 
        "action": "viewed", 
        "target": "attempt", 
        "objecttable": "quiz_attempts", 
        "objectid": "5", 
        "edulevel": "2", 
        "contextid": "105", 
        "contextlevel": "70", 
        "contextinstanceid": "22", 
        "userid": "17",
        "courseid": "7", 
        "other": "a:1:{s:6:"quizid";s:1:"2";}", 
        "timecreated": "1447372654", 
        "origin": "web"
      },
      {
        "id": "7828", 
        "action": "viewed", 
        "target": "course_module", 
        "objecttable": "quiz", 
        "objectid": "2", 
        "edulevel": "2", 
        "contextid": "105", 
        "contextlevel": "70", 
        "contextinstanceid": "22", 
        "userid": "17",
        "courseid": "7", 
        "other": "N;", 
        "timecreated": "1447372676", 
        "origin": "web"
      }
    ],
    "posts": [
      {
        "id": "41",
        "module": "notes",
        "userid": "17",
        "courseid": "23",
        "groupid": "0",
        "moduleid": "0",
        "coursemoduleid": "0",
        "subject": "",
        "summary": null,
        "content": "201x Test message saved in 'Personal Notes' section\"",
        "uniquehash": "",
        "rating": "0",
        "format": "2",
        "summaryformat": "0",
        "attachment": null,
        "publishstate": "draft",
        "lastmodified": "1431028904",
        "created": "1431028904",
        "usermodified": "36"
      }
    ],
    "quizattempts": [
      {
        "id": "76",
        "quiz": "6",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "324",
        "timestart": "1375713601",
        "timefinish": "1375714779",
        "timemodified": "1375714779",
        "timecheckstate": null,
        "sumgrades": "7.50000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "101",
        "quiz": "7",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "349",
        "timestart": "1375728188",
        "timefinish": "1375729194",
        "timemodified": "1375729194",
        "timecheckstate": null,
        "sumgrades": "11.16667",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "116",
        "quiz": "4",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "364",
        "timestart": "1375752390",
        "timefinish": "1375753510",
        "timemodified": "1375753510",
        "timecheckstate": null,
        "sumgrades": "11.33333",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "118",
        "quiz": "14",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "366",
        "timestart": "1375753645",
        "timefinish": "1375754574",
        "timemodified": "1375754574",
        "timecheckstate": null,
        "sumgrades": "8.50000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "190",
        "quiz": "8",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "438",
        "timestart": "1375803920",
        "timefinish": "1375804781",
        "timemodified": "1375804781",
        "timecheckstate": null,
        "sumgrades": "10.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "202",
        "quiz": "13",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "450",
        "timestart": "1375818690",
        "timefinish": "1375819754",
        "timemodified": "1375819754",
        "timecheckstate": null,
        "sumgrades": "7.33333",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "230",
        "quiz": "5",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "478",
        "timestart": "1375840911",
        "timefinish": "1375842239",
        "timemodified": "1375842239",
        "timecheckstate": null,
        "sumgrades": "16.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "303",
        "quiz": "9",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "551",
        "timestart": "1375887920",
        "timefinish": "1375888676",
        "timemodified": "1375888676",
        "timecheckstate": null,
        "sumgrades": "7.33333",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "342",
        "quiz": "6",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "590",
        "timestart": "1375927423",
        "timefinish": "1375928615",
        "timemodified": "1375928615",
        "timecheckstate": null,
        "sumgrades": "10.66667",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "365",
        "quiz": "7",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "613",
        "timestart": "1375931267",
        "timefinish": "0",
        "timemodified": "1376021701",
        "timecheckstate": null,
        "sumgrades": null,
        "needsupgradetonewqe": "0"
      },
      {
        "id": "367",
        "quiz": "12",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "615",
        "timestart": "1375931320",
        "timefinish": "0",
        "timemodified": "1376021701",
        "timecheckstate": null,
        "sumgrades": null,
        "needsupgradetonewqe": "0"
      },
      {
        "id": "377",
        "quiz": "13",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "625",
        "timestart": "1375932915",
        "timefinish": "1375933829",
        "timemodified": "1375933829",
        "timecheckstate": null,
        "sumgrades": "11.33333",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5203",
        "quiz": "112",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5706",
        "timestart": "1428072585",
        "timefinish": "1428537295",
        "timemodified": "1428537295",
        "timecheckstate": null,
        "sumgrades": "14.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5275",
        "quiz": "117",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5778",
        "timestart": "1428427323",
        "timefinish": "1428428611",
        "timemodified": "1428428611",
        "timecheckstate": null,
        "sumgrades": "12.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5291",
        "quiz": "118",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5794",
        "timestart": "1428429956",
        "timefinish": "1428431693",
        "timemodified": "1428431693",
        "timecheckstate": null,
        "sumgrades": "10.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5323",
        "quiz": "118",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "5827",
        "timestart": "1428450915",
        "timefinish": "1428452190",
        "timemodified": "1428452190",
        "timecheckstate": null,
        "sumgrades": "14.50000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5325",
        "quiz": "117",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "5829",
        "timestart": "1428452261",
        "timefinish": "1428453547",
        "timemodified": "1428453547",
        "timecheckstate": null,
        "sumgrades": "13.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5363",
        "quiz": "119",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5867",
        "timestart": "1428506217",
        "timefinish": "1428507424",
        "timemodified": "1428507424",
        "timecheckstate": null,
        "sumgrades": "11.50000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5397",
        "quiz": "113",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5901",
        "timestart": "1428537404",
        "timefinish": "1428538794",
        "timemodified": "1428538794",
        "timecheckstate": null,
        "sumgrades": "12.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5402",
        "quiz": "115",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5906",
        "timestart": "1428539265",
        "timefinish": "1428542050",
        "timemodified": "1428542050",
        "timecheckstate": null,
        "sumgrades": "21.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5409",
        "quiz": "116",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5913",
        "timestart": "1428542078",
        "timefinish": "1428542809",
        "timemodified": "1428542809",
        "timecheckstate": null,
        "sumgrades": "9.91667",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5410",
        "quiz": "116",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "5914",
        "timestart": "1428542839",
        "timefinish": "1428543241",
        "timemodified": "1428543241",
        "timecheckstate": null,
        "sumgrades": "12.50000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5434",
        "quiz": "121",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5938",
        "timestart": "1428582271",
        "timefinish": "1428583879",
        "timemodified": "1428583879",
        "timecheckstate": null,
        "sumgrades": "12.83333",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5459",
        "quiz": "120",
        "userid": "17",
        "attempt": "1",
        "uniqueid": "5963",
        "timestart": "1428603733",
        "timefinish": "1428604408",
        "timemodified": "1428604408",
        "timecheckstate": null,
        "sumgrades": "11.50000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5487",
        "quiz": "121",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "5991",
        "timestart": "1428624504",
        "timefinish": "1428626109",
        "timemodified": "1428626109",
        "timecheckstate": null,
        "sumgrades": "21.50000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5506",
        "quiz": "117",
        "userid": "17",
        "attempt": "3",
        "uniqueid": "6010",
        "timestart": "1428629455",
        "timefinish": "1428630933",
        "timemodified": "1428630933",
        "timecheckstate": null,
        "sumgrades": "10.83333",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5540",
        "quiz": "120",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "6044",
        "timestart": "1428679981",
        "timefinish": "1428681068",
        "timemodified": "1428681068",
        "timecheckstate": null,
        "sumgrades": "16.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5542",
        "quiz": "119",
        "userid": "17",
        "attempt": "2",
        "uniqueid": "6046",
        "timestart": "1428681185",
        "timefinish": "1428682674",
        "timemodified": "1428682674",
        "timecheckstate": null,
        "sumgrades": "20.00000",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5549",
        "quiz": "118",
        "userid": "17",
        "attempt": "3",
        "uniqueid": "6053",
        "timestart": "1428683511",
        "timefinish": "1428684569",
        "timemodified": "1428684569",
        "timecheckstate": null,
        "sumgrades": "12.66667",
        "needsupgradetonewqe": "0"
      },
      {
        "id": "5554",
        "quiz": "117",
        "userid": "17",
        "attempt": "4",
        "uniqueid": "6058",
        "timestart": "1428684969",
        "timefinish": "1428685857",
        "timemodified": "1428685857",
        "timecheckstate": null,
        "sumgrades": "13.50000",
        "needsupgradetonewqe": "0"
      }
    ],
    "quizgrades": [
      {
        "id": "28",
        "quiz": "6",
        "userid": "17",
        "grade": "10.66667",
        "timemodified": "1375928615"
      },
      {
        "id": "43",
        "quiz": "7",
        "userid": "17",
        "grade": "11.16667",
        "timemodified": "1375729195"
      },
      {
        "id": "65",
        "quiz": "4",
        "userid": "17",
        "grade": "11.33333",
        "timemodified": "1375753510"
      },
      {
        "id": "67",
        "quiz": "14",
        "userid": "17",
        "grade": "8.50000",
        "timemodified": "1375754574"
      },
      {
        "id": "109",
        "quiz": "8",
        "userid": "17",
        "grade": "10.00000",
        "timemodified": "1375804781"
      },
      {
        "id": "135",
        "quiz": "13",
        "userid": "17",
        "grade": "11.33333",
        "timemodified": "1375933829"
      },
      {
        "id": "147",
        "quiz": "5",
        "userid": "17",
        "grade": "8.00000",
        "timemodified": "1375842239"
      },
      {
        "id": "179",
        "quiz": "9",
        "userid": "17",
        "grade": "7.33333",
        "timemodified": "1375888676"
      },
      {
        "id": "2224",
        "quiz": "117",
        "userid": "17",
        "grade": "13.50000",
        "timemodified": "1428685857"
      },
      {
        "id": "2245",
        "quiz": "118",
        "userid": "17",
        "grade": "14.50000",
        "timemodified": "1428684569"
      },
      {
        "id": "2279",
        "quiz": "119",
        "userid": "17",
        "grade": "20.00000",
        "timemodified": "1428682675"
      },
      {
        "id": "2304",
        "quiz": "112",
        "userid": "17",
        "grade": "14.00000",
        "timemodified": "1428537295"
      },
      {
        "id": "2306",
        "quiz": "113",
        "userid": "17",
        "grade": "6.00000",
        "timemodified": "1428538794"
      },
      {
        "id": "2309",
        "quiz": "115",
        "userid": "17",
        "grade": "21.00000",
        "timemodified": "1428542050"
      },
      {
        "id": "2310",
        "quiz": "116",
        "userid": "17",
        "grade": "12.50000",
        "timemodified": "1428543241"
      },
      {
        "id": "2322",
        "quiz": "121",
        "userid": "17",
        "grade": "21.50000",
        "timemodified": "1428626109"
      },
      {
        "id": "2339",
        "quiz": "120",
        "userid": "17",
        "grade": "16.00000",
        "timemodified": "1428681069"
      }
    ]
  }
}';