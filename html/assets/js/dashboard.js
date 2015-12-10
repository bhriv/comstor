// Main.js non-minified


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
console.log('**************** urlParams ************');
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

$('#process_ended').on('click', function(event) {
  localStorage.setItem('process_ended','false');
  console.log('process_ended click.');
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
    localStorage.setItem( 'apiKey','');
    console.log('CLEARED:');
  }  




/**********************************************************/
/********* Helper Functions - Commonly Useful   *********/
/*****************************************************/

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
  
  // Get Stored Data Example
  $('#getactor').on('click', function(event) {
    // getActorFromEndpoint();
  });



/***********************************************************************/
/*************************** Setup Flurry API **********************/
/***********************************************************************/

var apiAccessCode             = 'FX2FBFN9RQXW8DKJH4WB',
    // apiKey                    = 'VW7Z3VDXXSK7HM6GKWZ3',
    apiKey                    = get_apiKey_from_storage(),
    flurry_country_data       = [], 
    flurry_metric_data        = [],

    dates                     = [],
    combined_dates            = [],
    flurry_dates              = [],
    flurry_moment_dates              = [],
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

function constructFlurryAppInfoEndpoint(){
  url_app_metric_specific = 'getApplication';
  // construct endpoint URL with api access code and api key
  url_new_Flurry = base_url_Flurry + 'appInfo/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey;
  return url_new_Flurry;
}

function getFlurryAppInfo(){
  // get the app details from Flurry endpoint, then add to the app_overview div
  console.log('----- START getFlurryAppInfo -----');
  
  $.getJSON( constructFlurryAppInfoEndpoint(), function( Flurry_json ) {
    console.log('getting url_Flurry data...');
    console.log(Flurry_json);
      //By using javasript json parser
      // console.log('@category:' +Flurry_json['@category']);
      // console.log('@createdDate:' +Flurry_json['@createdDate']);
      // console.log('@name:' +Flurry_json['@name']);
      // console.log('@platform:' +Flurry_json['@platform']);
      // console.log('@generatedDate:' +Flurry_json['@generatedDate']);
      // console.log('@version:' +Flurry_json['@version']);
      // console.log('version:');
      // console.log(Flurry_json['version']);
      var app_versions = Flurry_json['version'];
      // loop through the version history and pass all version names to a list
      jQuery.each(app_versions, function(i, vdata) {
        console.log('app_versions DATA');
        console.log(vdata);
        var v_createdDate = vdata['@createdDate'];
        var v_name = vdata['@name'];
        var v_version = '<strong>Version Name:</strong> ' +v_name +'  <strong>Created:</strong> ' +v_createdDate;
        //console.log('v_version: '+v_version);
        var v_history = '<li>'+v_version+'</li>';
        
        $('ul.app_version_history').append(v_history);
      });
      
      $('span.app_category').html(Flurry_json['@category']);
      $('span.app_createdDate').html(Flurry_json['@createdDate']);
      $('span.app_name').html(Flurry_json['@name']);
      $('span.app_platform').html(Flurry_json['@platform']);
      $('span.app_generatedDate').html(Flurry_json['@generatedDate']);
    console.log('----- END getFlurryAppInfo -----');
  });
}

function constructFlurryAllAppsInfoEndpoint(){
  url_app_metric_specific = 'getAllApplications';
  // construct endpoint URL with api access code and api key
  url_new_Flurry = base_url_Flurry + 'appInfo/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode;
  return url_new_Flurry;
}

function getFlurryAllAppsInfo(){
  // get the app details from Flurry endpoint, then add to the app_overview div
  console.log('----- START getFlurryAllAppsInfo -----');
  $.getJSON( constructFlurryAllAppsInfoEndpoint(), function( Flurry_json ) {
    console.log('getting url_Flurry data...');
    console.log(Flurry_json);
      //By using javasript json parser

      // {"@companyName":"Tech 2000, Inc.","@generatedDate":"11/18/15 4:05 PM","@version":"1.0","application":[{"@apiKey":"3R6JJMNY284SC6B3TD99","@createdDate":"2014-10-11","@platform":"Android","@name":"The SELL Closer App D - Android"},
      console.log('@companyName:' +Flurry_json['@companyName']);
      console.log('@generatedDate:' +Flurry_json['@generatedDate']);
      console.log('@version:' +Flurry_json['@version']);
      console.log('application:');
      console.log(Flurry_json['application']);

      var all_app_versions = Flurry_json['application'];

      // loop through the version history and pass all version names to a list
      jQuery.each(all_app_versions, function(i, vdata) {
        console.log('app_versions DATA');
        // @apiKey":"3R6JJMNY284SC6B3TD99","@createdDate":"2014-10-11","@platform":"Android","@name"
        console.log(vdata);
        
        var this_url = window.location.href;

        var v_name = vdata['@name'];
        var v_platform = vdata['@platform'];
        var v_createdDate = vdata['@createdDate'];
        var v_apiKey = vdata['@apiKey'];
        var v_analytics_link = this_url+'analytics.html?apiKey='+v_apiKey;
        var v_app_data = '<li><h5><a class="link_to_analytics" href="'+v_analytics_link+'" target="blank"><i class="fa fa-file"></i> ' +v_name+ '<span style="float:right;"><i class="fa fa-external-link"></i></span></a></h5></li><li><strong><i class="fa fa-apple"></i> Platform: </strong> ' +v_platform+ '</li><li><strong><i class="fa fa-calendar"></i> Created: </strong> ' +v_createdDate+ '</li><li><strong><i class="fa fa-key"></i> API Key: </strong> ' +v_apiKey +'</li><li style="display:none;"><strong><a href="'+v_analytics_link+'" target="blank"><i class="fa fa-external-link"></i> '+v_analytics_link+'</a></strong></li>';
        //console.log('v_version: '+v_version);
        var v_all_apps = '<li><ul class="app_overview">'+v_app_data+'</ul></li>';
        
        $('ul.all_apps').append(v_all_apps);
      });
      
      // $('span.app_category').html(Flurry_json['@category']);
      // $('span.app_createdDate').html(Flurry_json['@createdDate']);
      // $('span.app_name').html(Flurry_json['@name']);
      // $('span.app_platform').html(Flurry_json['@platform']);
      // $('span.app_generatedDate').html(Flurry_json['@generatedDate']);
    console.log('----- END getFlurryAllAppsInfo -----');
  });
}



/*******************************************************/
/**************  Document Ready Functions  **************/
/*******************************************************/

// UX Functions Dependent on Doc Ready State

$(document).ready(function() {
  
  // Setup basic app needs
  console.log('Document ready: Session Start Functions');
  $('.hideme').hide();
  
  // Set an ID for this Session to ensure uniqueness
  setSessionID();

  $(".restart").click(function() {
    clearSession();
  });
  $("#testFlurryAnalytics").click(function() {
    testFlurryAnalytics();
  });
  $("#getData").click(function() {
    getData();
  });

  $("#analytics_triggers li a").click(function() {
    $('#analytics_triggers li a').removeClass('active');
    $(this).addClass(' active');
  });

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
  
  // $("ul.all_apps").click(function() {
  //   // alert('click');
  //   var this_link = $("ul.app_overview li").find("a.link_to_analytics");
  //   window.location.href = this_link;
  // });


/*****************************************************************/
/**************** Date Picker Processing Functions  **************/
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


/*************************************************************************************/
/************** UX filter event listeners to determine data query type **************/
/*********************************************************************************/
  // 
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

  $('#graphs-holder li h2 span.days').addClass('active');

  $('#graphs-holder li .widget-content').addClass('active');
  $('#graphs-holder li#widget-NewUsers .widget-content').removeClass('active');

}); 
// end Doc Ready 


/**********************************************************/
/************** Plugin Default Settings   **************/
/*****************************************************/

$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd'
});


/*******************************************************/
/**************  RUN APP - build Dashboard  **************/
/*******************************************************/

function refreshDashboard(){
  console.log('-- refreshDashboard ---');
  var a = localStorage.getItem( 'start_date' );
  var b = localStorage.getItem( 'end_date' );
  var c = localStorage.getItem( 'metric_type' );
  var d = localStorage.getItem( 'app_metric_specific' );
  // var e = localStorage.getItem( 'event_metric_specific' );
  if (a && b && c && d) {
    console.log('All requirements met, runDashboard executing');
    // runDashboard();
    // buildCombinedDataChart();
    buildFlurryChart();
  }else{
    console.log('All requirements NOT met, runDashboard NOT executing');
  }
}


/*****************************************************************/
/**************** Trigger Events to Build Charts  **************/
/*****************************************************************/

// Example: a#NewUsers_ 
$("span.chart_trigger").click(function(event) {
  event.stopPropagation();
  var id = $(this).attr('id');
  id = id.slice(0, -1);
  
  $('#graphs-holder li .widget-content').addClass('active');
  var current_widget = '#graphs-holder li#widget-'+id +' .widget-content';
  $(current_widget).removeClass('active');

  var app_metric_specific = id;
  setAppMetricSpecific(app_metric_specific);
  getChartData(id);
  var c = '#graphs-holder widget-' +id+ ' li h2 span.days';
  $(c).addClass('active');
});

// Example: span.months_
$("#graphs-holder li h2 span").click(function(event) {
  event.stopPropagation();
  var id = $(this).attr('id');
  id = id.slice(0, -1);
  var period = $(this).attr('class');
  // alert(id);
  // alert(period);
  $('#graphs-holder li .widget-content').addClass('active');
  var current_widget = '#graphs-holder li#widget-'+id +' .widget-content';
  $(current_widget).removeClass('active');

  var app_metric_specific = id;
  setAppMetricSpecific(app_metric_specific);
  getChartData(id,period);
  $('#graphs-holder li h2 span').removeClass('active');
  $(this).addClass('active');
});

// Pull App Stats when triggered
function showFlurryAppStats() {
  getFlurryAppInfo();
  $('#widget-app-overview .widget-content').removeClass('active');
  $('#widget-app-version-history .widget-content').removeClass('active');
}


/*****************************************************************/
/**************** Construct Flurry Chart DATA  **************/
/*****************************************************************/

function getChartData(id,period){
  console.log('----- getChartData -----');
  
  console.log('period: '+period);
  if (period == undefined) {
    period = 'days';
    console.log('period updated: '+period);
  }else{
    console.log('period NOT updated: '+period);
  }
  if (id == undefined) {
    id = 'ActiveUsers';
    console.log('id updated: '+id);
  }else{
    console.log('id NOT updated: '+id);
  }
  

  // GROUP DATA by Period
    var url_flurry_api = constructFlurryEndpoint();
    var url_group_by = period;

    url_flurry_api = base_url_Flurry + url_metric_type + '/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
    if (period != undefined) {
      url_flurry_api = url_flurry_api + '&groupBy=' +url_group_by;
    };
    console.log('Grouped By API URL: '+url_flurry_api);
    var flurry_data_loaded = $.getJSON( url_flurry_api);

    $.when(flurry_data_loaded).done(function(flurry_object) {

      if (url_country == 'ALL') {
        console.log('url_country: '+url_country);
        flurry_country_data = flurry_object['country'];
        flurry_metric_data = flurry_country_data['day'];  
      }else{
        alert('Currently Configured to query ALL countries');
      }
      flurry_dates = _.pluck(flurry_metric_data,'@date');
      flurry_values = _.pluck(flurry_metric_data,'@value');
      console.log('flurry_values: ');
      console.log(flurry_values);

      var current_val = _.last(flurry_values);
      var previous_val = flurry_values.reverse()[1];

      var growth_val = parseInt((current_val - previous_val) / current_val * 100);
      console.log('growth_val: '+growth_val);
      var growth_class = 'default';
      if (growth_val < 0) { growth_class = 'danger'; };
      if (growth_val > 0) { growth_class = 'success'; };
      console.log('growth_class: '+growth_class);
      var growth_factor = growth_val + '%';
      
      console.log('period inside loop: '+period);
      if (period == 'days') {
          period_label = 'Change<br>Today';
          growth_change_current = 'Today';
          growth_change_previous = 'Yesterday';
      };
      if (period == 'weeks') {
        period_label = 'Change This<br>Week';
        growth_change_current = 'This Week';
        growth_change_previous = 'Last Week';
      };
      if (period == 'months') {
        period_label = 'Change This<br>Month';
        growth_change_current = 'This Month';
        growth_change_previous = 'Last Month';
      };

      console.log('period_label: '+period_label);

      $('#widget-overview .current_val .number').html(current_val);
      $('#widget-overview .current_val .period').html(growth_change_current);
      $('#widget-overview .previous_val .number').html(previous_val);
      $('#widget-overview .previous_val .period').html(growth_change_previous);
      
      
      $('#overview_stats .period').html(period_label);
      $('#overview_stats .growth_factor span').text(growth_factor);
      $('#overview_stats .growth_factor .badge').addClass(growth_class);


      // var chart_id = 'newUsersPerWeek';
      var chart_id = id;
      if (chart_id == 'RetainedUsers') {
        newFlurryBarChart(chart_id);
      }else{
        newFlurryChart(chart_id);  
      }
    }); 

  console.log('------ end getChartData -------') ;
}


/*******************************************************/
/******  Build and Display  Flurry Chart  **************/
/*******************************************************/

function newFlurryChart(chart_id){
  //Chart Data
  var canvas_id = 'flurry-chart-' +chart_id;
    var canvas = document.getElementById(canvas_id),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: flurry_dates,
      datasets: [
          {
              fillColor: "transparent",
              strokeColor: "#fe5f55",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: flurry_values
          }
      ]
    },
    latestLabel = startingData.labels[6];
    // Reduce the animation steps for demo clarity.
    var myLiveChart = new Chart(ctx).Line(startingData);
} // end newCombinedChart

function newFlurryBarChart(chart_id){
  //Chart Data
  var canvas_id = 'flurry-chart-' +chart_id;
    var canvas = document.getElementById(canvas_id),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: flurry_dates,
      datasets: [
          {
              fillColor: "#5b90bf",
              strokeColor: "#5b90bf",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: flurry_values
          }
      ]
    },
    latestLabel = startingData.labels[6];
    // Reduce the animation steps for demo clarity.
    var myLiveChart = new Chart(ctx).Bar(startingData);
} // end newCombinedChart


/*******************************************************/
/**********  Build Chart Display Variations  **************/
/*******************************************************/

function newCombinedChart(){
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
} // end newCombinedChart



// Testing Functions - used for the initial build to test code. Replaced by specific functions

function buildFlurryChart(){
  console.log('----- buildFlurryChart -----')
  
  var url_flurry_api = constructFlurryEndpoint();
  var flurry_data_loaded = $.getJSON( url_flurry_api);

  $.when(flurry_data_loaded).done(function(flurry_object) {
    console.log('flurry_data_loaded is DONE');
    console.log('flurry_object');
    // flatten response object
    console.log(flurry_object);
    // flurry_object = flurry_object[0];
    // console.log(flurry_object);

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
    // console.log('FLURRY PLUCKED DATES:');
    // console.log(flurry_dates); 
    var flurry_moment_dates = [];
    $.each(flurry_dates, function(key, value){
      var date_timestamp = moment(value).unix();
      flurry_moment_dates.push(date_timestamp);
    });
    // flurry_dates = flurry_moment_dates;
    // console.log('FLURRY moment DATES:');
    // console.log(flurry_moment_dates); 
    // console.log('FLURRY PLUCKED VALUES:');
    // console.log(flurry_values);
    newFlurryChart();

  }); 
  console.log('------ end buildFlurryChart -------') ;
}

function buildCombinedDataChart(){
  console.log('----- buildCombinedDataChart -----')
  
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
    newCombinedChart();

  }); 
  console.log('------ end buildCombinedDataChart -------') ;
}

// Specific Example for Flurry Chart New Users
function newUsersPerWeek(){
  console.log('----- newUsersPerWeek -----')
  // var metric = 'newUsers';
  var url_flurry_api = constructFlurryEndpoint();
  var url_group_by = 'weeks';
  url_flurry_api = base_url_Flurry + url_metric_type + '/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country + '&groupBy=' +url_group_by;
  // console.log('Grouped By API URL: '+url_flurry_api);
  var flurry_data_loaded = $.getJSON( url_flurry_api);

  $.when(flurry_data_loaded).done(function(flurry_object) {

    if (url_country == 'ALL') {
      console.log('url_country: '+url_country);
      flurry_country_data = flurry_object['country'];
      flurry_metric_data = flurry_country_data['day'];  
    }else{
      alert('Currently Configured to query ALL countries');
    }
    flurry_dates = _.pluck(flurry_metric_data,'@date');
    flurry_values = _.pluck(flurry_metric_data,'@value');

    var chart_id = 'newUsersPerWeek';
    newFlurryChart(chart_id);
  }); 
  console.log('------ end newUsersPerWeek -------') ;
}


function testFlurryAnalytics(){
  console.log('----- START testFlurryAnalytics WEEKS GROUPING-----');
  
  constructFlurryEndpoint();
  var url_group_by = 'weeks';
  url_new_Flurry = url_new_Flurry + '&groupBy=' +url_group_by;
  console.log('url_new_Flurry with url_group_by');
  console.log(url_new_Flurry);

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








/*****************************************************************/
/**************** // TOTARA Data Function  **************/
/*****************************************************************/




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


// flurry_reports

// Show Hide Login and Signup Inner Divs in Modal
function hide_reports(){
  $('.report_display_switch').hide();
}

$("#show_mef_reports").click(function() {
  hide_reports();
  $('#mef_reports').show();
});
$("#show_flurry_reports").click(function() {
  hide_reports();
  $('#flurry_reports').show();
});
$("#show_ciscoone_reports").click(function() {
  hide_reports();
  $('#ciscoone_reports').show();
});

$("#get_course_data").click(function() {
  get_course_data();
});
$("#work_in_progress").click(function() {
  work_in_progress();
});


var all_students = []
var student_17object = [];
var student_4object = [];

var student_result_id_17;
var student_result_id_4;

// var student_17_url = 'http://www.privacyvector.com/api/lumiousreports/studentdata/17';
var student_17_url = 'http://www.akronzip.com/lumiousreports/studentdata/17';
var student_4_url = 'http://www.privacyvector.com/api/lumiousreports/studentdata/4';

$("#pull_student_data").click(function() {
  alert('show_all_students_activity CLICK');
  // pull_student_data();
  show_all_students_activity();
});

function pull_student_data(){

  console.log('pull_student_data FUNCITON');
  console.log('student_17_url: '+student_17_url);
  console.log('student_4_url: '+student_4_url);

  $.when(student_17_url,student_4_url).done(function(student_17object, student_4object) {
    console.log('getting url_Student data...');
    all_students.push(student_17object);
    console.log(student_4object);
    console.log(student_17object);
  });
}


// console.log('##### student_result_id_17 ##### ');
// console.log(student_result_id_17);

var student_result_id_17 = [{
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
        "courseid": "5", 
        // "other": "a:1:{s:6:"quizid";s:1:"2";}", 
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
        "courseid": "5", 
        "other": "N;", 
        "timecreated": "1447372676", 
        "origin": "web"
      }
    ]
  }
}];

var student_result_id_4 = [{
  "user": {
    "id": "4",
    "username": "testuser2",
    "firstname": "Bob",
    "lastname": "Testable",
    "email": "chris.h.devries+testuser2@gmail.com",
    "city": "Herndon",
    "country": "US",
    "lang": "en",
    "timezone": "99",
    "firstaccess": "1372297375",
    "lastaccess": "1375473515",
    "lastlogin": "1372791844",
    "currentlogin": "1375473332",
    "lastip": "69.132.7.103",
    "picture": "0",
    "url": "",
    "timecreated": "1372181144",
    "timemodified": "1372181144",
    "posts": [
      
    ],
    "log": [
      {
        "id": "5135", 
        "action": "viewed", 
        "target": "course_module", 
        "objecttable": "url", 
        "objectid": "5", 
        "edulevel": "2", 
        "contextid": "109", 
        "contextlevel": "70", 
        "contextinstanceid": "25", 
        "userid": "4",
        "courseid": "4", 
        // "other": "N;", 
        "timecreated": "1446482426", 
        "origin": "web"
      },
      {
        "id": "5236", 
        "action": "deleted", 
        "target": "course_module", 
        "objecttable": "quiz", 
        "objectid": "25", 
        "edulevel": "1", 
        "contextid": "109", 
        "contextlevel": "70", 
        "contextinstanceid": "25", 
        "userid": "4",
        "courseid": "4", 
        // "other": "a:2:{s:10:"modulename";s:3:"url";s:10:"instanceid"...", 
        "timecreated": "1446486235", 
        "origin": "web"
      }
    ]
  }
}];

function get_totara_activity(){
  // get each student in the course
  // use static data - replace with Endpoint data in the future

  jQuery.each(all_students, function(i, sdata) {

    console.log('sdata');
    console.log(sdata);
    // dive deeping into the array nodes to access the data
    var student_result = sdata;
    student_result = student_result[0];
    student_result = student_result['user'];
    // get all single student data as a clean array
    console.log(student_result);
    // get only the activity log information
    var activity_log =[];
    activity_log = student_result['log'];

    var activity_array = [];
    
    // Pull Data from Multiple Activties Endpoint 
    jQuery.each(activity_log, function(i, adata) {
      var a_row = '<tr>';
      var quizdata = [];
      var quizobject = [];
      

      console.log('activity_log DATA');
      activity_time = adata.timecreated;
      activity_moment = moment.unix(activity_time).format("YYYY/MM/DD hh:mm:ss");
      activity_id = adata.id;
      activity_name = adata.action;
      activity_table = adata.objecttable;
      activity_id = adata.objectid;
      activity_course = adata.courseid;


      
      // @TODO - add catch for failed return - i.e. if no courese id exists
      var course_url = base_url + 'lumiousreports/courselookup/'+activity_course;
      var coursedata = $.getJSON(course_url);

      $.when(coursedata).done(function(courseobject) {
        if (course_name = 'undefined') {
          course_name = '';
        };
        
        var course_name = null;        
        course_name = courseobject[0];
        course_name = course_name.fullname;
        console.log('COURSE NAME: '+course_name);
        
        var quiz_name = null; 
        if (adata.objecttable == 'quiz_attempts') {
         
          console.log('activity_table SWITCH: '+activity_table);
          var quiz_url = base_url + 'lumiousreports/quizlookup/'+adata.objectid;
          console.log('quiz_url '+quiz_url);

          var quizdata = $.getJSON(quiz_url);
          $.when(quizdata).done(function(quizobject) {
            console.log('DOING quizdata JSON call');
            console.log('quizobject');
            console.log(quizobject);
            var quiz_data = quizobject[0];
            console.log(quiz_data);
            var quiz_name = quiz_data.name;
            // quiz_name = quizobject.name;
            // console.log('QUIZ NAME: '+quiz_name);
            // wait for quiz name response before sending result
            a_row  += '<th>'+adata.id+'</th>';
            a_row  += '<th>'+student_result['firstname']+' '+student_result['lastname']+'</th>';
            a_row  += '<th>'+adata.action+'</th>';
            a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
            a_row  += '<th>'+adata.objecttable+'</th>';
            a_row  += '<th><span>(ID '+adata.objectid+')</span> '+quiz_name+'</th>';
            a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
            // add the readable data to the table rows        
            $('#tbody_activity_result').append(a_row);
          }); // end $.when
        }
        else{
          a_row  += '<th>'+adata.id+'</th>';
          a_row  += '<th>'+student_result['firstname']+' '+student_result['lastname']+'</th>';
          a_row  += '<th>'+adata.action+'</th>';
          a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
          a_row  += '<th>'+adata.objecttable+'</th>';
          a_row  += '<th><span>(ID '+adata.objectid+')</span></th>';
          a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
          // add the readable data to the table rows        
          $('#tbody_activity_result').append(a_row);
        } // end if
        
      }); // end $.when

      a_row  += '</tr>';
    }); // end each.activity_log
  }); // end each.all_students
}


/*****************************************************************/
/*************** CACHING and PROCESSING **************************/
/*****************************************************************/


function get_course_name(activity_course){
  // get the course details from endpoint, then add to the results table
  // var course_url = base_url + 'lumiousreports/courselookup/'+activity_course;
  // console.log('ENDPOINT activity_course '+course_url);

  // var coursedata = $.getJSON(course_url);
  // // console.log('coursedata');
  // $.when(coursedata).done(function(courseobject) {
  //   // console.log('courseobject');
  //   // console.log(courseobject);
  //   var course_name = null;        
  //   course_name = courseobject[0];
  //   course_name = course_name.fullname;
  //   console.log('COURSE NAME: '+course_name);
  //   return course_name;
  // }); // end $.when
}

var course_data = [];

function temp_set_course_data(){

  var course_data = [
                      {
                        "id": "1",
                        "category": "0",
                        "fullname": "Comstor LMS",
                        "shortname": "comstor",
                        "startdate": "0"
                      },
                      {
                        "id": "2",
                        "category": "1",
                        "fullname": "Test course ",
                        "shortname": "test_course",
                        "startdate": "1439938800"
                      },
                      {
                        "id": "4",
                        "category": "25",
                        "fullname": "Collaboration Course",
                        "shortname": "Collab",
                        "startdate": "1444107600"
                      },
                      {
                        "id": "5",
                        "category": "26",
                        "fullname": "Twitter Content",
                        "shortname": "TWITTER",
                        "startdate": "1444345200"
                      },
                      {
                        "id": "6",
                        "category": "21",
                        "fullname": "Test course",
                        "shortname": "Tes",
                        "startdate": "1444777200"
                      },
                      {
                        "id": "7",
                        "category": "27",
                        "fullname": "Testing",
                        "shortname": "TEST",
                        "startdate": "1445036400"
                      },
                      {
                        "id": "8",
                        "category": "28",
                        "fullname": "Data Center 1:1",
                        "shortname": "DC11",
                        "startdate": "1446681600"
                      },
                      {
                        "id": "9",
                        "category": "21",
                        "fullname": "Test Course 42 - Comstor Testing",
                        "shortname": "Test Course",
                        "startdate": "1447372800"
                      }
                    ];
  console.log('course_data');                  
  console.log(course_data);                  
  var data = JSON.stringify(course_data);
  localStorage.setItem( 'session_course_data_array',data);
  
  console.log('*********** END temp_set_course_data *****************')
}

var course_constructed_array = [];


function get_course_data(c_temp){
  console.log('c_temp: '+c_temp);
  // localStorage.setItem( 'activewidgets', JSON.stringify(activewidgets) );
  // var storedactivewidgets = JSON.parse(localStorage.getItem( 'activewidgets'));
  temp_set_course_data();
  // @TODO - pull from actual query
  
  var session_course_data_array = localStorage.getItem( 'session_course_data_array');
  console.log('session_course_data_array');
  console.log(session_course_data_array);

  var query_course_id = c_temp;
  var arr = JSON.parse(session_course_data_array);
  console.log('CCCCCCCCC');
  console.log(arr);

  var course_data_from_array = findCourseByID(arr, query_course_id);
  console.log('course_data_from_array');
  console.log(course_data_from_array);

  
  if (course_data_from_array == false) {
    console.log('FALSE satisfied - get data from endpoint');
    // hit endpoint
    // get data
    // save to session array data
  }else{
    var d = course_data_from_array[0];
    console.log(' ID: '+d["id"] +
                ' SHORTNAME: '+d.shortname +
                ' FULLNAME: '+d.fullname +
                ' CATEGORY: '+d.category +
                ' STARTDATE: '+d.startdate);
    course_constructed_array.push(d);
    console.log('course_constructed_array');
    console.log(course_constructed_array);
    var courses = JSON.stringify(course_constructed_array);
    localStorage.setItem( 'courses', courses );
    var t = localStorage.getItem('courses');
    var s = JSON.parse(localStorage.getItem( 'courses'));
    console.log('courses - storage retrieval: ');
    console.log(s);
  }
  // use course data to generate table row
  generate_table_row();
}

function work_in_progress(){
  // testing for sending a course ID, avoiding hitting the endpoints if possible, 
  // check local storage to see if course details are already saved in session
  // use local details if possible
  // if ID not found, hit the endpoint, store the details
  // get the details, use to update the table / dom
  get_course_data(4);
  get_course_data(99);
  get_course_data(5);
  get_course_data(6);
  get_course_data(68);
  get_course_data(7);
}

// 

function findCourseByID(arr,query_course_id){
    // given a course ID
    // check course data array
    // var stored_course_data = getSession('course_array');
    // if ID found in session array, return data
    var result = $.grep(arr, function(e){ return e.id == query_course_id; });
    console.log("Local Course Session Search Result: ");
    console.log(result);
    if(result){
        return result;
    }else{
        return false;
    }
}

function generate_table_row(){
  // pull exising DOM population elements from query
  alert('generate_table_row FIRED');
}


// Doc ready functions moved to index.html

/* =======================================
    Show All Students in Selected Course - no filter
* ======================================= */

function show_all_students_activity(){

  console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_all_students_activity   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

  // POPULATE DATA to RESULTS TABLE
  // var selected_course_id = checkLocalStorage('current_course');
  var selected_course_id = 2;

  // console.log('LOCAL STORAGE current_course ' +selected_course_id);
  
  // ajax URLs
  url_course_students = 'http://www.privacyvector.com/api/lumiousreports/students/'+selected_course_id;
  url_student_data = 'http://www.privacyvector.com/api/lumiousreports/studentdata/';

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
            } // if(student_posts != undefined){
           

            var activity_log =[];
            activity_log = studentdataobject.user["logstore"];;
            console.log(' ^^^^ activity_log ^^^^^^^');
            console.log(activity_log);

            var activity_array = [];
            
            // Pull Data from Multiple Activties Endpoint 
            jQuery.each(activity_log, function(i, adata) {
              var a_row = '<tr>';
              var quizdata = [];
              var quizobject = [];
              

              console.log('activity_log DATA');
              activity_time = adata.timecreated;
              activity_moment = moment.unix(activity_time).format("YYYY/MM/DD hh:mm:ss");
              activity_id = adata.id;
              activity_name = adata.action;
              activity_table = adata.objecttable;
              activity_id = adata.objectid;
              activity_course = adata.courseid;


              
              // @TODO - add catch for failed return - i.e. if no courese id exists
              // @TODO - add new base_url for privacyvector

              // EXAMPLE http://www.privacyvector.com/api/lumiousreports/courselookup/4
              
              // var course_url = base_url + 'lumiousreports/courselookup/'+activity_course;
              var course_url = 'http://www.privacyvector.com/api/lumiousreports/courselookup/'+activity_course;
              var coursedata = $.getJSON(course_url);

              $.when(coursedata).done(function(courseobject) {
                if (course_name = 'undefined') {
                  course_name = '';
                };
                
                var course_name = null;        
                course_name = courseobject[0];
                course_name = course_name.fullname;
                console.log('COURSE NAME: '+course_name);
                
                var quiz_name = null; 
                if (adata.objecttable == 'quiz_attempts') {
                 
                  console.log('activity_table SWITCH: '+activity_table);
                  var quiz_url = base_url + 'lumiousreports/quizlookup/'+adata.objectid;
                  console.log('quiz_url '+quiz_url);

                  var quizdata = $.getJSON(quiz_url);
                  $.when(quizdata).done(function(quizobject) {
                    console.log('DOING quizdata JSON call');
                    console.log('quizobject');
                    console.log(quizobject);
                    var quiz_data = quizobject[0];
                    console.log(quiz_data);
                    var quiz_name = quiz_data.name;
                    // quiz_name = quizobject.name;
                    // console.log('QUIZ NAME: '+quiz_name);
                    // wait for quiz name response before sending result
                    a_row  += '<th>'+adata.id+'</th>';
                    a_row  += '<th>'+student_firstname+' '+student_lastname+'</th>';
                    a_row  += '<th>'+adata.action+'</th>';
                    a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
                    a_row  += '<th>'+adata.objecttable+'</th>';
                    a_row  += '<th><span>(ID '+adata.objectid+')</span> '+quiz_name+'</th>';
                    a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
                    // add the readable data to the table rows        
                    $('#tbody_activity_result').append(a_row);
                  }); // end $.when
                }
                else{
                  a_row  += '<th>'+adata.id+'</th>';
                  a_row  += '<th>'+student_result['firstname']+' '+student_result['lastname']+'</th>';
                  a_row  += '<th>'+adata.action+'</th>';
                  a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
                  a_row  += '<th>'+adata.objecttable+'</th>';
                  a_row  += '<th><span>(ID '+adata.objectid+')</span></th>';
                  a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
                  // add the readable data to the table rows        
                  $('#tbody_activity_result').append(a_row);
                } // end if
                
              }); // end $.when

              a_row  += '</tr>';
            }); // end each.activity_log
        }); // END $.when(studentdata).d
    }); // jQuery.each(studentobject,
    // $('#loading_gif').hide();
  });
  console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_all_students_activity    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}


 // Mon 23, Tues 24
  // build function to test course data array
  // setup local arrays for faster processing
  // test local storage data arrays
  // setup needle in a haystack function
  // process course ID, test to see if in array
  // return array data for use in chart
  // if data not found, pull data from endpoint. 
  // recheck in array? or process directly?
  // dig down into array 
  // pull name, id, fullname, 

