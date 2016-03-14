
/*****************************************************************/
/********** Work With Local Storage Session Data *****************/
/*****************************************************************/

function startSession(){
  cc('startSession','run');
  setupStorage();
  // setSessionID();
  // setSessionTime();
  setDefaultData();
}

function clearSession(){
  cc('clearSession','run');
  localStorage.removeItem( 'session_id');
  localStorage.removeItem( 'session_started');
  localStorage.removeItem( 'session_timestamp');
  localStorage.removeItem( 'start_date');
  localStorage.removeItem( 'end_date');
  setDefaultData();
}  

function setDefaultData(){
  // create new random ID
  cc('setDefaultData','run');
  localStorage.removeItem('students');
  localStorage.removeItem('quizzes');
  localStorage.removeItem('courses');
  localStorage.removeItem('all_students');
}

function resetSessionData(){
  cc('resetSessionData','run')
  clearSession();
  setSessionID();
  setSessionTime();
  setDateRange();
  setDefaultData();
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
  cc('setSessionID','run')
  var session_id = Math.random().toString(36).substr(2, 7);
  localStorage.setItem( 'session_id', session_id );
  console.log('session_id set: '+session_id);
}

function setSessionTime(){
  // create new random ID
  cc('setSessionTime','run')
  var now = new Date();
  now = moment().format("YYYY-MM-DD, h:mm:ss a");
  var session_started = now;
  localStorage.setItem( 'session_started', session_started );
  var timestamp = moment().format("X");
  localStorage.setItem( 'session_timestamp', timestamp );
}

function setupStorage(){
  cc('checkSessionTime','run')
  var stored_timestamp = localStorage.getItem('session_timestamp');
  var stored_id = localStorage.getItem('session_id');
  var session_started = localStorage.getItem('session_started');
  if (stored_timestamp == undefined || stored_id == undefined || session_started == undefined ) {
    resetSessionData();
  }else{
    cc('Session already set: id('+stored_id+') timestamp('+stored_timestamp+')','info');
    var timestamp = moment().format("X");
    var time_passed = timestamp - stored_timestamp;
    // alert('time_passed passed(millisec): '+time_passed)
    // alert('time_passed passed(mins): '+time_passed/60)
    // alert('time_passed passed(hours): '+time_passed/60/60)
    var hours_passed = time_passed/60/60;
    if (hours_passed > 1) {
      cc('Last session started over 1 hour ago, resetting session to get new data','warning')
      resetSessionData();
    };
  }
}

function setDateRange(){
  // create new random ID
  cc('setDateRange','run');
  var earlier = moment().subtract(3, 'months');
  earlier = moment(earlier).format("YYYY-MM-DD");
  var today = moment().format("YYYY-MM-DD");
  localStorage.setItem( 'start_date', earlier );
  localStorage.setItem( 'end_date', today );
}

function setStartDate(){
  cc('setStartDate','run');
  var start_date = $('#start_date').val();
  if (isItemNullorUndefined(start_date)) {
    setDateRange();
  }
  localStorage.setItem( 'start_date', start_date );
  cc('start_date set: '+start_date,'info');
}

function setEndDate(){
  cc('setEndDate','run');
  var end_date = $('#end_date').val();
  if (isItemNullorUndefined(end_date)) {
    setDateRange();
  }
  localStorage.setItem( 'end_date', end_date );
  cc('end_date set: '+end_date,'info');
}

function setMetricType(metric_type){
  localStorage.setItem( 'metric_type', metric_type );
  cc('metric_type set: '+metric_type,'info');
}

function setAppMetricSpecific(app_metric_specific){
  localStorage.setItem( 'app_metric_specific', app_metric_specific );
  cc('app_metric_specific set: '+app_metric_specific,'info');
}

function setEventMetricSpecific(event_metric_specific){
  localStorage.setItem( 'event_metric_specific', event_metric_specific );
  cc('event_metric_specific set: '+event_metric_specific,'info');
}

function setApiKey(apiKey){
  localStorage.setItem( 'apiKey', apiKey );
  cc('apiKey set: '+apiKey,'info');
}


/*****************************************************************/
/**********************  Check Variable Values *******************/
/*****************************************************************/

function checkUserSessionID(){
  var session_id = localStorage.getItem( 'session_id' );
  if (isItemNullorUndefined(session_id)) {
    session_id = '999999999_session_id_default';
    cc('No session_id is set so the default of '+session_id+' will be used');
    setSessionID(session_id);
  }
  return session_id;
}

function checkStartDate(){
  var start_date = localStorage.getItem( 'start_date' );
  if (isItemNullorUndefined(start_date)) {
    cc('No Start Date set;');
    setDateRange();
    var start_date = localStorage.getItem( 'start_date' );
  }
  return start_date;
}

function checkEndDate(){
  var end_date = localStorage.getItem( 'end_date' );
  if (isItemNullorUndefined(end_date)) {
    cc('No End Date set;');
    setDateRange();
    var end_date = localStorage.getItem( 'end_date' );
  };
  return end_date;
}

function checkMetricType(){
  var metric_type = localStorage.getItem( 'metric_type' );
  if (isItemNullorUndefined(metric_type)) {
    metric_type = 'appMetrics';
    cc('No metric_type is set so the default of '+metric_type+' will be used');
    setMetricType(metric_type);
  };
  return metric_type;
}

function checkAppMetricSpecific(){
  var app_metric_specific = localStorage.getItem( 'app_metric_specific' );
  if (isItemNullorUndefined(app_metric_specific)) {
    app_metric_specific = 'NewUsers';
    cc('No app_metric_specific is set so the default of '+app_metric_specific+' will be used');
    setAppMetricSpecific(app_metric_specific);
  };
  return app_metric_specific;
}

function checkEventMetricSpecific(){
  var event_metric_specific = localStorage.getItem( 'event_metric_specific' );
  if (isItemNullorUndefined(event_metric_specific)) {
    event_metric_specific = 'CourseViewed';
    cc('No event_metric_specific is set so the default of '+event_metric_specific+' will be used');
    setEventMetricSpecific(event_metric_specific);
  };
  return event_metric_specific;
}

function checkStorageItem(item_NAME){
  var item_DATA = localStorage.getItem( item_NAME );
  cc('Check STORAGE Item '+item_NAME,'info');
  return item_DATA;
}

// Return API Key from Storage
function checkApiKey(){
  cc('checkApiKey','run');
  var apiKey = localStorage.getItem( 'apiKey');
  if (isItemNullorUndefined(apiKey)) {
    cc('No apiKey is set so check URL for parameter','warning');
    var this_page_apiKey = urlParams['apiKey'];
    if (isItemNullorUndefined(this_page_apiKey)) {
      cc('No apiKey is found in the URL. Queries will not find data.','fatal');
    }else{
      setApiKey(this_page_apiKey);
      apiKey = this_page_apiKey;  
    }
  }
  return apiKey;
}
