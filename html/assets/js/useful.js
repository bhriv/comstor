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
/*************** CONVERT TO READABLE MOMENT DATE  ****************/
/*************************************************************/

// Open link in a new popup window pre-sized 
function dateMoment(timestamp){
  var time_moment = moment.unix(timestamp).format("YYYY/MM/DD hh:mm:ss");
  return time_moment;
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
function checkApiKey(){
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
  cc('isItemNullorUndefined: '+item,'run')
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
/***************************  LOGIN ENDPIONT ***************/
/*****************************************************************/

// http://privacyvector.com/api/lumiouslogin/ben@me.com/lumious
// [18/12/2015, 2:53:36 PM] Bruce Carlson: http://privacyvector.com/api/lumiouslogin/ben@me.com/lumious
// [18/12/2015, 3:17:54 PM] Benjamin Holman Richards IV: Great! I'm assuming that I will pass the email address that the user enters on the login form to the endpoint and if I get a successful response (and the password matches) then I grant user access. Does that sound correct?
// [18/12/2015, 3:43:04 PM] Bruce Carlson: Sounds good to me
// [18/12/2015, 3:44:02 PM] Bruce Carlson: What would you like it to return if there isn't a match. Presently, it returns nothing.
// [18/12/2015, 4:07:42 PM] Bruce Carlson: It might return an empty set.
// [18/12/2015, 5:12:59 PM] Benjamin Holman Richards IV: it's fine as it is. thanks
// [18/12/2015, 5:14:08 PM] Bruce Carlson: Wonderful. I'll stand down. Have a great weekend.

