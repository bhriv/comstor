/***********************************************************************/
/*************************** Setup Flurry API Variables **********************/
/***********************************************************************/

var base_url_Flurry           = 'http://api.flurry.com/',
    apiAccessCode             = 'FX2FBFN9RQXW8DKJH4WB',
    apiKey                    = checkApiKey(), //'VW7Z3VDXXSK7HM6GKWZ3',
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

    url_new_Flurry            = '',
    url_metric_type           = '',
    url_app_metric_specific   = '',
    url_startDate             = '',
    url_endDate               = '',
    url_country               = 'ALL';


/*******************************************************/
/**************  Run Flurry Dashboard  **************/
/*******************************************************/

$( document ).ready(function() {
  cc('Flurry JS is running','success');
  $('#start_date').val(checkStartDate());
  $('#end_date').val(checkEndDate());
  runFlurryDashboard();
});


function runFlurryDashboard(){
  cc('runFlurryDashboard','run');
  var a = checkStartDate();
  var b = checkEndDate();
  var c = checkMetricType();
  var d = checkAppMetricSpecific();
  // var e = localStorage.getItem( 'event_metric_specific' );
  if (a && b && c && d) {
    cc('All Flurry requirements met, runDashboard executing','success');
    // get default 
    getChartData('NewUsers','days');
    $('#flurry_reports').show();
    }else{
    cc('All Flurry requirements NOT met, runDashboard NOT executing','fatal');
  }
}


/***********************************************************************/
/****************** Construct Flurry API Endpoint **********************/
/***********************************************************************/


function constructFlurryEndpoint(){
  var base_url_Flurry       = 'http://api.flurry.com/',
  apiAccessCode             = 'FX2FBFN9RQXW8DKJH4WB',
  apiKey                    = checkApiKey(), //'VW7Z3VDXXSK7HM6GKWZ3',
  url_metric_type           = checkMetricType(),
  url_app_metric_specific   = checkAppMetricSpecific(),
  url_startDate             = checkStartDate(),
  url_endDate               = checkEndDate(),
  url_country               = 'ALL';
  url_new_Flurry = base_url_Flurry + url_metric_type + '/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
  // var DEBUG_url_new_Flurry = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=FX2FBFN9RQXW8DKJH4WB&apiKey=VW7Z3VDXXSK7HM6GKWZ3&startDate=2015-01-01&endDate=2015-10-31&country=ALL';
  // alert('URL for Endpoint is temp hardconded');
  cc('API URL: '+url_new_Flurry,'success');
  return url_new_Flurry;
}

// construct endpoint URL with api access code and api key
function constructFlurryAppInfoEndpoint(){
  url_app_metric_specific = 'getApplication';
  url_new_Flurry = base_url_Flurry + 'appInfo/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey;
  return url_new_Flurry;
}

// get the app details from Flurry endpoint, then add to the app_overview div
function getFlurryAppInfo(){
  cc('getFlurryAppInfo','run');
  $.getJSON( constructFlurryAppInfoEndpoint(), function( Flurry_json ) {
    console.log('getting url_Flurry data...');
    console.log(Flurry_json);
      //By using javasript json parser
      var app_versions = Flurry_json['version']; // @category, @createdDate, @createdDate,@name
      // loop through the version history and pass all version names to a list
      jQuery.each(app_versions, function(i, vdata) {
        console.log('app_versions DATA');
        console.log(vdata);
        var v_createdDate = vdata['@createdDate'];
        var v_name = vdata['@name'];
        var v_version = '<strong>Version Name:</strong> ' +v_name +'  <strong>Created:</strong> ' +v_createdDate;
        var v_history = '<li>'+v_version+'</li>';
        // Pass all version history to the UI
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

// Construct Endpoing to get all Company App Details
// construct endpoint URL with api access code and api key
function constructFlurryAllAppsInfoEndpoint(){
  url_app_metric_specific = 'getAllApplications';
  url_new_Flurry = base_url_Flurry + 'appInfo/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode;
  return url_new_Flurry;
}

// Pull all Company App Details
// get the app details from Flurry endpoint, then add to the app_overview div
function getFlurryAllAppsInfo(){
  cc('getFlurryAllAppsInfo','run');
  $.getJSON( constructFlurryAllAppsInfoEndpoint(), function( Flurry_json ) {
    console.log('getting url_Flurry data...');
    console.log(Flurry_json);
    // Parse using javasript json parser
    console.log('@companyName:' +Flurry_json['@companyName']);
    console.log('@generatedDate:' +Flurry_json['@generatedDate']);
    console.log('@version:' +Flurry_json['@version']);
    console.log('application:');
    console.log(Flurry_json['application']);
    var all_app_versions = Flurry_json['application'];
    // loop through the version history and pass all version names to a list
    // @apiKey":"3R6JJMNY284SC6B3TD99","@createdDate":"2014-10-11","@platform":"Android","@name"
    jQuery.each(all_app_versions, function(i, vdata) {
      console.log('app_versions DATA');
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
      // Display all apps in a list
      $('ul.all_apps').append(v_all_apps);
    });
    console.log('----- END getFlurryAllAppsInfo -----');
  });
}


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
  cc('getChartData','run');

  if (isItemNullorUndefined(period)) {
    period = 'days';
    period_label = 'Change This<br>Week';
    growth_change_current = stats_label+'<br>This Week';
    growth_change_previous = stats_label+'<br>Last Week';
    cc('No period is set so the default of '+period+' will be used','warning');
    }else{
    console.log('period NOT updated. Period parameter: '+period);
  }
  if (isItemNullorUndefined(id)) {
    id = 'ActiveUsers';
    cc('No id is set so the default of '+id+' will be used','warning');
    }else{
    console.log('id NOT updated. Id passed was: '+id);
  }

  // GROUP DATA by Period

  var url_flurry_api = constructFlurryEndpoint();
  url_flurry_api = url_flurry_api + '&groupBy=' + period;
  cc('url_flurry_api WITH PERIOD = '+url_flurry_api,'info');

  // Modify calls to Active Users endpoint
  if (id == 'ActiveUsers') { 
    stats_label = 'Active Users';
    if (period == 'weeks'){
      url_app_metric_specific = 'ActiveUsersByWeek';
      url_flurry_api = base_url_Flurry + 'appMetrics/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
      console.log('url_flurry_api: '+url_flurry_api);
    };
    if (period == 'months'){
      url_app_metric_specific = 'ActiveUsersByMonth';
      url_flurry_api = base_url_Flurry + 'appMetrics/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
      console.log('url_flurry_api: '+url_flurry_api);
    };
  }

  var stats_label = '';
  var data_query_label = '';

  if (id == 'NewUsers'){ stats_label = 'New Users'; data_query_label = 'New Users';}
  if (id == 'RetainedUsers') { stats_label = 'Retained Users';  data_query_label = 'Retained Users';}
  if (id == 'Sessions') { stats_label = 'Sessions'; data_query_label = 'Sessions';}
  if (id == 'MedianSessionLength') { stats_label = 'Med. Session<br>Length';  data_query_label = 'Med. Session Length (sec)';}
  if (id == 'AvgSessionLength') { stats_label = 'Ave. Session<br>Length'; data_query_label = 'Avg. Session Length (sec)';}
  if (id == 'PageViews') { stats_label = 'Page Views'; data_query_label = 'Page Views';}
  $("span#data_query").text(data_query_label);
  
  var flurry_data_loaded = $.getJSON( url_flurry_api);

  $.when(flurry_data_loaded).done(function(flurry_object) {
    // console.log('flurry_data_loaded is DONE');
    // console.log('flurry_object');
    // console.log(flurry_object);
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
        growth_change_current = stats_label+'<br>Today';
        growth_change_previous = stats_label +'<br>Yesterday';
    };
    if (period == 'weeks') {
      period_label = 'Change This<br>Week';
      growth_change_current = stats_label+'<br>This Week';
      growth_change_previous = stats_label+'<br>Last Week';
    };
    if (period == 'months') {
      period_label = 'Change This<br>Month';
      growth_change_current = stats_label+'<br>This Month';
      growth_change_previous = stats_label+'<br>Last Month';
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
  cc('newFlurryChart','run');
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
  cc('newFlurryBarChart','run');
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
/**********  CUSTOM EVENT DISPLAYS  **************/
/*******************************************************/


var event_labels = [];
var event_data = [];

function getCustomEventSummaryData(){
  var type = 'Summary';
  var url_flurry_api = constructFlurryEventEndpoint(type);
  // dig down and get summary data for query
  // loop through and get each event data
  // log
  var flurry_data_loaded = $.getJSON( url_flurry_api);

    $.when(flurry_data_loaded).done(function(flurry_object) {

      flurry_type = flurry_object['@type'];
      flurry_enddate = flurry_object['@endDate'];
      flurry_startdate = flurry_object['@startDate'];
      flurry_generateddate = flurry_object['@generatedDate'];

      flurry_events = [];
      flurry_events = flurry_object['event'];
      // console.log('flurry_type: '+flurry_type);
      // console.log('flurry_enddate: '+flurry_enddate);
      console.log(flurry_events);

      $.each(flurry_events, function(key, flurry_object){
        
        console.log('key: '+key);

        var eventName = flurry_object['@eventName'];
        var eventNameTrimmed = eventName.replace(/\s/g, '');
        var eventNameSpace = eventName.replace(/\s/g, '%20');
        if (eventName == 'CourseViewed') { eventName = 'Course Viewed'};
        if (eventName == 'ModuleViewed') { eventName = 'Module Viewed'};
        var avgUsersLastDay = flurry_object['@avgUsersLastDay'];
        var avgUsersLastWeek = flurry_object['@avgUsersLastWeek'];
        var avgUsersLastMonth = flurry_object['@avgUsersLastMonth'];
        var totalCount = flurry_object['@totalCount'];
        var totalSessions = flurry_object['@totalSessions'];
        var usersLastDay = flurry_object['@usersLastDay'];
        var usersLastWeek = flurry_object['@usersLastWeek'];
        var usersLastMonth = flurry_object['@usersLastMonth'];
        
        // Construct Rows for the tabel with the data available
        var a_row = '<tr>';
            a_row  += '<th>'+eventName+'</th>';
            a_row  += '<th>'+totalCount+'</th>';
            a_row  += '<th>'+totalSessions+'</th>';
            a_row  += '<th>'+usersLastDay+'</th>';
            a_row  += '<th>'+usersLastWeek+'</th>';
            a_row  += '<th>'+usersLastMonth+'</th>';
            a_row  += '<th>'+avgUsersLastDay+'</th>';
            a_row  += '<th>'+avgUsersLastWeek+'</th>';
            a_row  += '<th>'+avgUsersLastMonth+'</th>';
          a_row  += '</tr>';
        
        // add the readable data to the table rows        
        $('#widget-Summary tbody').append(a_row);

        // Build Chart Data with Labels and Data for the Summary
        event_labels.push(eventName);
        event_data.push(totalCount);

      }); // end each
        
        console.log('event_data');
        console.log(event_data);
        var shortest_view_in_module = 66;
        var longest_view_in_module = 24;
        var average_viewing_length_in_module = 31;

        var Summary = document.getElementById("flurry-chart-Summary"),
        ctx_Summary = Summary.getContext('2d');

        var Summary_Options = {
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
        var Summary_Data = [
            {
                label: event_labels[0],
                value: event_data[0],
                color: "#878BB6"
            },
            {
                label: event_labels[1],
                value : event_data[1],
                color : "#4ACAB4"
            },
            {
                label: event_labels[2],
                value : event_data[2],
                color : "#fdd687"
            },
            {
                label: event_labels[3],
                value : event_data[3],
                color : "#fff687"
            }
        ];
        var myLiveChart_Summary = new Chart(ctx_Summary).Doughnut(Summary_Data,Summary_Options);
    }); // end when
}

function buildCustomEventDataTables(id){
  var eventNameTrimmed = id.replace(/\s/g, '');
  var eventName = id;
  if (id == 'PDFDownloaded') { eventName = 'PDF%20Downloaded'};
  if (id == 'ModuleRated') { eventName = 'Module%20Rated'};
  // console.log('eventNameSpace: '+id);
  var url_flurry_event_api = 'http://api.flurry.com/eventMetrics/Event?apiAccessCode=FX2FBFN9RQXW8DKJH4WB&apiKey=VW7Z3VDXXSK7HM6GKWZ3&startDate=2015-01-01&endDate=2015-12-08&eventName='+eventName;
  var flurry_event_data_loaded = $.getJSON( url_flurry_event_api);

  $.when(flurry_event_data_loaded).done(function(flurry_event_object) {
    console.log(flurry_event_object);
    var flurry_event_name = flurry_event_object['@eventName'];
    var flurry_event_day = flurry_event_object['day'];
    var flurry_event_parameters = flurry_event_object['parameters'];
    console.log('flurry_event_name' +flurry_event_name);
    console.log('flurry_event_day');
    console.log(flurry_event_day);
    console.log('flurry_event_parameters');
    console.log(flurry_event_parameters);
    // process daily data
    
    $.each(flurry_event_day, function(key, flurry_object){
      var eventTotalCount = flurry_object['@totalCount'];
      // only store days where event occurred  
      if (eventTotalCount != "0") {
        var date = flurry_object['@date'];
        var totalCount = flurry_object['@totalCount'];
        var totalSessions = flurry_object['@totalSessions'];
        var uniqueUsers = flurry_object['@uniqueUsers'];
        
        // Construct Rows for the tabel with the data available
        var a_row = '<tr>';
            a_row  += '<th>'+date+'</th>';
            a_row  += '<th>'+totalSessions+'</th>';
            a_row  += '<th>'+totalCount+'</th>';
            a_row  += '<th>'+uniqueUsers+'</th>';
          a_row  += '</tr>';
        
        // add the readable data to the table rows 
        var widget_c = '#widget-'+eventNameTrimmed +' table.summary tbody';       
        $(widget_c).append(a_row);
      }
    });  // end each event day

    if (id == 'ModuleViewed' || id == 'CourseViewed' || id == 'ModuleRated' || id == 'PDFDownloaded') {
      var ModuleViewed_labels = [];
      var ModuleViewed_data = [];
      // dig into object
      var flurry_event_parameters_key = flurry_event_parameters["key"];
      console.log('flurry_event_parameters_key');
      console.log(flurry_event_parameters_key);

      $.each(flurry_event_parameters_key, function(key, flurry_object){
        console.log('flurry_object NAME');
        console.log(flurry_object['@name']);

        var flurry_parameter_values = flurry_object['value'];
        console.log('flurry_parameter_values');
        console.log(flurry_parameter_values);
        // var flurry_event_parameters_value = flurry_event_parameters["value"];
        $.each(flurry_parameter_values, function(key, flurry_object){
          
          var name = flurry_object['@name'];
          var totalCount = flurry_object['@totalCount'];
          ModuleViewed_labels.push(name);
          ModuleViewed_data.push(totalCount);
          // console.log('name: '+name);
          // console.log('totalCount: '+totalCount);
          // Construct Rows for the tabel with the data available
          var a_row = '<tr>';
              a_row  += '<th>'+name+'</th>';
              a_row  += '<th>'+totalCount+'</th>';
            a_row  += '</tr>';
          
          // add the readable data to the table rows 
          var widget_c = '#widget-'+id +' .byID tbody';       
          $(widget_c).append(a_row);
        });  // end each value

      //Chart Data
      var canvas_id = 'flurry-chart-' +id;
        var canvas = document.getElementById(canvas_id),
        ctx = canvas.getContext('2d'),
        startingData = {
          labels: ModuleViewed_labels,
          datasets: [
              {
                  fillColor: "#5b90bf",
                  strokeColor: "#5b90bf",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  data: ModuleViewed_data
              }
          ]
        },
        latestLabel = startingData.labels[6];
        // Reduce the animation steps for demo clarity.
        var myLiveChart = new Chart(ctx).Bar(startingData);
      });  // end each event day
    } // endif
    // Log 
  }); 
}

function constructFlurryEventEndpoint(type){
  console.log('...doing constructFlurryEventEndpoint()');
  url_metric_type           = 'eventMetrics',
  url_app_metric_specific   = type,
  url_startDate             = checkStartDate(),
  url_endDate               = checkEndDate(),
  url_country               = 'ALL';
  url_new_Flurry = base_url_Flurry + url_metric_type + '/' + url_app_metric_specific + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + url_startDate + '&endDate=' + url_endDate + '&country=' + url_country;
  // var DEBUG_url_new_Flurry = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=FX2FBFN9RQXW8DKJH4WB&apiKey=VW7Z3VDXXSK7HM6GKWZ3&startDate=2015-01-01&endDate=2015-10-31&country=ALL';
  console.log('CUSTOM EVENT API URL: '+url_new_Flurry);
  return url_new_Flurry;
}




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


/*****************************************************************/
/**************** Specific Testing Functions - not used in app  **************/
/*****************************************************************/

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
    // console.log('flurry_data_loaded is DONE');
    // console.log('flurry_object');
    // console.log(flurry_object);
    
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
// Set Flurry Date Picker Processing Functions 
/*****************************************************************/

function FlurryDatePicker(){
  cc('FlurryDatePicker','run');
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

  $.datepicker.setDefaults({
      dateFormat: 'yy-mm-dd'
  });
}
// end Date Picker


