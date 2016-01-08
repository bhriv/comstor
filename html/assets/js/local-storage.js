
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