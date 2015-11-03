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
  $('#start_date').val(checkStartDate());
  $('#end_date').val(checkEndDate());
  
    
  // UX Functions

  $(".restart").click(function() {
    clearSession();
  });

  $("#get_data").click(function() {
    newFlurryAnalytics();
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


  function newChart(){
    //Chart Data

    var dates = [];
    var data = [];
    

    var url_course_graph = 'http://akronzip.com/course/graph/30';

    $.getJSON( url_course_graph, function( json ) {
      console.log('getting chart data...');
      console.log(json);

      // get all of the keys and values
      $.each(json, function(key, value){
          console.log(key, value);
          dates.push(key);
          data.push(value);
      });

      console.log(dates); // @TODO - add dates from both data sources into single data array
      console.log(data); //
      console.log(compare_data); //

      var canvas = document.getElementById('updating-chart'),
      ctx = canvas.getContext('2d'),
      startingData = {
        labels: dates,
        datasets: [
            {
                fillColor: "transparent",
                strokeColor: "#fe5f55",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: data
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
    });
  } // end newChart

}); 
// end Doc Ready 

$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd'
});

function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}

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


/***********************************************************************/
/************************************* Flurry API **********************/
/***********************************************************************/

  var apiAccessCode         = 'FX2FBFN9RQXW8DKJH4WB',
      apiKey                = 'VW7Z3VDXXSK7HM6GKWZ3',
      flurry_country_data   = [], 
      flurry_metric_data    = [],
      flurry_values         = [],
      flurry_dates          = [];
      
  var compare_data = [15, 20, 50, 50, 72, 37, 43]; // replace with data from Flurry

    

  function newFlurryAnalytics(){
    console.log('----- START newFlurryAnalytics -----');

    var   url_metric_type           = checkMetricType(),
          url_app_metric_specific   = checkAppMetricSpecific(),
          url_startDate             = checkStartDate(),
          url_endDate               = checkEndDate(),
          url_country               = 'ALL';

    var base_url_Flurry = 'http://api.flurry.com/';
    var url_new_Flurry = base_url_Flurry + url_metric_type + '/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
    // var DEBUG_url_new_Flurry = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=FX2FBFN9RQXW8DKJH4WB&apiKey=VW7Z3VDXXSK7HM6GKWZ3&startDate=2015-01-01&endDate=2015-10-31&country=ALL';

    console.log('API URL: '+url_new_Flurry);
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
        
      console.log('----- END newFlurryAnalytics -----');
    });
    // draw data on graph
    newChart();
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
      // newFlurryAnalytics();
  });
}

