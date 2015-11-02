// Main.js non-minified

// ===========================
// Force Login for some Links
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
/***************************  Check Variable Values *********************/
/*****************************************************************/

  function checkGameID(){
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
  

  
/*****************************************************************/
/***************************  Cheat Mode Functions ***************/
/*****************************************************************/

  function cheatModeToggle(){
    $('.cheatmode').toggle();
  }

/*****************************************************************/
/***************************  Tracking *********************/
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
  
  $('#getactor').on('click', function(event) {
    // getActorFromEndpoint();
  });


$(document).ready(function() {
  console.log('Document ready');

  $('.hideme').hide();
    
  setSessionID();
  checkStartDate();
  checkEndDate();
    
  // UX Functions

  $(".restart").click(function() {
    clearSession();
  });

  $("#get_data").click(function() {
    // var player_level = $("input[name=player_level]:checked").val();
    // localStorage.setItem( 'player_level', player_level);
    // console.log('player_level from storage = '+ localStorage.getItem( 'player_level'));
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
      }
    });
  });
});

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


/*****************************************************************/
/*************************** API Based Game Deck *****************/
/*****************************************************************/

// if (use_DeckOfCardsAPI) {
//   // get new newFlurryAnalytics
//     // get DeckOfCards.id
//     // get draw_Card_from_DeckOfCards
//     // show single_Card

//   var DeckOfCards = [];
//   var DeckOfCards_id = null;

// Available Metrics (ActiveUsers,Sessions)
var metric_type   = 'appMetrics',
    query_metric  = 'Sessions',
    apiAccessCode = 'FX2FBFN9RQXW8DKJH4WB',
    apiKey        = 'VW7Z3VDXXSK7HM6GKWZ3',
    startDate     = checkStartDate(),
    endDate       = checkEndDate(),
    country       = 'ALL';

  var TESTurl_new_Flurry = 'http://api.flurry.com/appMetrics/ActiveUsers?apiAccessCode=FX2FBFN9RQXW8DKJH4WB&apiKey=VW7Z3VDXXSK7HM6GKWZ3&startDate=2015-01-01&endDate=2015-10-31&country=ALL';
  var base_url_Flurry = 'http://api.flurry.com/';
  var url_new_Flurry = base_url_Flurry + metric_type + '/' + query_metric + '/?apiAccessCode=' + apiAccessCode + '&apiKey=' + apiKey + '&startDate=' + startDate + '&endDate=' + endDate + '&country=' + country;
  console.log(url_new_Flurry);
//   var url_draw_card_DeckOfCards = 'default';

  function newFlurryAnalytics(){
    console.log('------------ START newFlurryAnalytics ------------');
    $.getJSON( url_new_Flurry, function( Flurry_json ) {
      console.log('getting url_Flurry data...');
      console.log(Flurry_json);
        //By using javasript json parser
      // if (Flurry_json['success']) {
        console.log('@endDate:' +Flurry_json['@endDate']);
        console.log('@metric:' +Flurry_json['@metric']);
        
        // var DeckOfCards_id = Flurry_json['deck_id'];
        // console.log('DeckOfCards_id: ' +DeckOfCards_id);
        // localStorage.setItem( 'DeckOfCards_id', DeckOfCards_id );
      // }else{
      //   alert('Error: Deck of Cards API not loaded. No deck ID is available.');
      // }
      console.log('------------ END newFlurryAnalytics ------------');
    });
  }
