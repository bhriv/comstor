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
if (this_page_apiKey != undefined) {
  localStorage.setItem( 'apiKey',this_page_apiKey);  
}else{
  alert('An API key is required to run the Dashboard. Try logging in again.')
}

var this_page_filter_mode = urlParams['cat_name'];
if (this_page_filter_mode != undefined) {
  localStorage.setItem( 'cat_name',this_page_filter_mode);  
}else{
  localStorage.setItem( 'cat_name','Miscellaneous');  
}

var this_page_current_cat = urlParams['current_cat'];
if (this_page_current_cat != undefined) {
  localStorage.setItem( 'current_cat',this_page_current_cat);
}else{
  localStorage.setItem( 'current_cat','1');
}
//https://css-tricks.com/snippets/javascript/get-url-variables/
/* Example:
http://www.example.com/index.php?id=1&image=awesome.jpg

Calling getQueryVariable("id") - would return "1".
Calling getQueryVariable("image") - would return "awesome.jpg".
*/
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

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
  // cc('isItemNullorUndefined: '+item,'run');
  cc('isItemNullorUndefined: ','run')
  if (item == null || item == 'null' || item == undefined || item == 'undefined') {
    cc('ITEM is - '+item,'error');
    return true
  }else{
    cc('ITEM is not Null or Underfined','success');
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
/*************************** Data Type ***************************/
/*****************************************************************/

function dataType(data,convert_to){
  cc('dataType', 'run');
  var data_return = 'not sure';

  if (_.isObject(data)) {
    cc('original data type is object','info');
    if(convert_to == 'string'){
      new_data_object = JSON.stringify(data);
      if (_.isString(new_data_object)) {
        cc('data is NOW converted from object to string','success');
        return new_data_object;
      }
      else{
        return data;
      }
    }
  }
  else if (_.isString(data)) {
    cc('original data type is string','info');
    if(convert_to == 'object'){
      new_data_object = JSON.parse(data);
      if (_.isObject(new_data_object)) {
        cc('data is NOW converted from string to object','success');
        return new_data_object;
      }
      else{
        return data;
      }
    }
  }
  else{
    return data;
  }
}


/*****************************************************************/
/*************** GET RESPONSE SIZE ***************/
/*****************************************************************/
/* useful when chaining events. 
/ Eg. When nestled loops depend on a prior process being complete you can use:
    itemdata_count++;
      if (itemdata_count == result_count) {
        cc('All chained processes complete. Now do something else','success');
        console.log(...something else.....);  
      };
*/
function getResponseSize(itemdata,data_type){
  if (data_type != undefined) {
    cc('getResponseSize with data type('+data_type+')', 'run');  
  }else{
    cc('getResponseSize with data type', 'run');
  }
  
  console.log(itemdata);
  if (data_type == 'JSON') {
    console.log(itemdata["responseJSON"]);
    var result_count_data = itemdata["responseJSON"];
    var result_count = _.size(result_count_data);
  }else{
    var result_count = _.size(itemdata);
  }
  cc('SIZE of result_count: '+result_count,'success');
  return result_count;
}



/*****************************************************************/
/********************** SET LOCAL STORAGE  ***********************/
/*****************************************************************/

function setLocalStorage(data,name){
  cc('setLocalStorage', 'run');
  var data_return = 'not sure';
  var d = dataType(data,'string');
  localStorage.setItem(name,d);
}



/*****************************************************************/
/********************** GET PARENT ID  ***********************/
/*****************************************************************/

function getParentID(path){
  cc('getParentID','run')
  // Remove Grandparent ID = 1
  var parent_id    = path.slice(3, -1);
  var n = parent_id.indexOf("/");
  var parent_id_trimmed = parent_id.substring(0, n);
  cc('parent_id_trimmed: '+parent_id_trimmed,'highlight')
  return parent_id_trimmed
}

function getGrandparentID(path){
  cc('getGrandparentID','run')
  var parent_id_trimmed    = path.slice(1, 2)
  // var n = parent_id.indexOf("/");
  // var parent_id_trimmed = parent_id.substring(0, n);
  cc('grandparent_id_trimmed: '+parent_id_trimmed,'highlight')
  return parent_id_trimmed
}

/*****************************************************************/
/********************** FILTER CATEGORY DATA ***********************/
/*****************************************************************/

function filterCategoryData(data){
  cc('filterCategoryData','run')
  var data_object = dataType(data,'object');
  // Remove Grandparent ID = 1
  var keys = ['idnumber','descriptionformat','visible','visibleold','theme','programcount','certifcount','display']
  var filtered_data  = _.omit(data_object,keys);
  var data_string = dataType(data_string,'string') 
  return data_string
}

// var name         = cdata['name'];
// var depth        = cdata['depth'];
// var path         = cdata['path'];
// var parent_ID    = getParentID(path);
// var this_item_ID = cdata['id'];
// var this_item_ID_int = parseInt(this_item_ID);
// var keys = ['idnumber','descriptionformat','visible','visibleold','theme','programcount','certifcount','display','sortorder']
// var filtered_data  = _.omit(cdata,keys);
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

