// dashboard.js non-minified


/*******************************************************/
/**************  Dashboard Functions  *************/
/*******************************************************/

// UX Functions Dependent on Doc Ready State

$(document).ready(function() {
  // Set an ID for this Session to ensure uniqueness
  setSessionID();

  $('.hideme').hide();
  
  /**********************************************/
  /************** UX Interactions **************/
  /**********************************************/

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

  $('#actions .action').on('click', function(event) {
    trackAction(event);    
  });

  $('#process_ended').on('click', function(event) {
    localStorage.setItem('process_ended','false');
    console.log('process_ended click.');
  });

  // Get Stored Data Example
  $('#getactor').on('click', function(event) {
    // getActorFromEndpoint();
    alert('blank');
  });

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

  $("#get_item_data").click(function() {
    get_item_data();
  });

  $("#get_course_cat_data").click(function() {
    get_course_cat_data();
  });

  $("#get_course_hidden_cat_data").click(function() {
    get_course_hidden_cat_data();
  });

  // $("li.mobile_analytics_triggers").click(function() {
  //   window.location.search = jQuery.query.set("page", "mobile-analytics");
  // });

  $("#work_in_progress").click(function() {
    // getItemDataFromEndpoint("16","course","get_startdate");
    work_in_progress();
  });

  $("#getCategories_visible").click(function() {
    getCategories('visible');
  });
  $("#getCategories_hidden").click(function() {
    getCategories('hidden');
  });

  // $(".popup_link").click(function() {
  //   return pop_up(this, "Pop Up");
  // });


}); // end Doc Ready 

// Show Hide Login and Signup Inner Divs in Modal
function hide_reports(){
  $('.report_display_switch').hide();
}


/*****************************************************************************/
/**************************** GET COURSE CATEGORIES  *************************/
/*****************************************************************************/
// get the course categories from endpoint, then add to the results table

var category_grandparents = [];
var category_parents = [];
var category_children = [];

function getCategories(visibility_type){  
  cc('getCategories('+visibility_type+')','info');
  // Setup ids and labels
  var switch_label = 'Show';
  var count_id = '#'+visibility_type+'_count';
  var table_id = '#'+visibility_type+'_categories';
  cc('table_id '+table_id, 'warning');
  if (visibility_type == 'visible') {
    visibility_type = 'course';
    var switch_url = base_url +'lumiousreports/hiddencategories/';
    var switch_label = 'Hide';
  }else{
    var switch_url = base_url +'lumiousreports/coursecategories/';
  }
  var item_url = base_url +'lumiousreports/'+visibility_type+'categories/';
  console.log('%c SWITCH ENDPOINT url '+switch_url, 'background: #ddd; color: #fff');
  // Populate and extract data
  var item_data_from_array = [];
  var itemdata_count = 0;
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var this_item_ID = cdata.id;
        cc('Category ID('+this_item_ID+')','success');
        // Get data from JSON
        var this_item_ID = cdata['id'];
        var hide_this_item_ID = switch_url + this_item_ID;
        var show_this_item_ID = switch_url + this_item_ID;
        var name        = cdata['name'];
        var depth       = cdata['depth'];
        var timemodified = cdata['timemodified'];
        var readable_date = dateMoment(timemodified);
        var path      = cdata['path'];
        cc('name '+name+' timemodified '+timemodified+ ' readable_date '+readable_date+ ' depth '+depth+ ' path '+path+ ' switch_url '+ switch_url, 'success' );
        // Push to display table
        var table_data = '<tr><td>'+this_item_ID+'</td><td><h5>' +name+ '</h5></td><td><span class="hidden">'+timemodified+'</span></strong> ' +readable_date+ '</td><td>' +depth+ '</td><td>' +path +'</td><td><strong><a class="popup_link" href="'+hide_this_item_ID+'" target="blank">'+switch_label+'</a></strong></tr>';
        $(table_id).append(table_data);
        if (visibility_type == 'course') {
          if (depth == '1') {
            category_grandparents.push(cdata);
          };
          if (depth == '2') {
            category_parents.push(cdata);
          };
        };
        
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;
    }); // end $.each
    var itemdata_count_display = '('+itemdata_count+ ')';
    cc('count_id '+count_id, 'success');
    $(count_id).append(itemdata_count_display);
    cc('category_grandparents array');
    processGrandparents();
    processParents();
    updateGrandparents();
  }); // end $.when
}

function processGrandparents(){
  var child_details = [];
  var nestled_categories = [];

  var itemdata_count = 0;
  var item_data_from_array = category_grandparents;
  var size = _.size(category_grandparents);
  cc('category_grandparents SIZE:'+size, 'success');

  jQuery.each(item_data_from_array, function(i, cdata) {
    // Process all courses within the category
    var d = item_data_from_array[0];
    if (d != undefined) {
      // Get data from JSON
      var this_item_ID = cdata['id'];
      var name         = cdata['name'];
      var depth        = cdata['depth'];
      var path         = cdata['path'];
      cc('GRANDPARENT: '+name+'('+this_item_ID+') depth('+depth+') path('+path+')', 'success' );
      // cc(cdata, 'warning');
      // Push to display table
    }
    else{
      cc('There was an error getting data. It seems that the endpoint does not return data.','error');
    }
    itemdata_count++;
  }); // end $.each
}

function processParents(){
  var itemdata_count = 0;
  var item_data_from_array = category_parents;
  jQuery.each(category_grandparents, function(i, cdata) {
    // Process all courses within the category
    var d = item_data_from_array[0];
    if (d != undefined) {
      // Get data from JSON
      var this_item_ID = cdata['id'];
      var name         = cdata['name'];
      var depth        = cdata['depth'];
      var path         = cdata['path'];
      cc('PARENT: '+name+'('+this_item_ID+') depth('+depth+') path('+path+')', 'success' );
      // cc(cdata, 'warning');
      // Push to display table
    }
    else{
      cc('There was an error getting data. It seems that the endpoint does not return data.','error');
    }
    itemdata_count++;
  }); // end $.each
}

function updateGrandparents(){
  var itemdata_count = 0;
  var item_data_from_array = category_parents;
  jQuery.each(category_grandparents, function(i, cdata) {
    // Process all courses within the category
    var d = item_data_from_array[0];
    if (d != undefined) {
      // Get data from JSON
      var this_item_ID = cdata['id'];
      var name         = cdata['name'];
      var depth        = cdata['depth'];
      var path         = cdata['path'];
      cc('GRANDPARENT: '+name+'('+this_item_ID+') depth('+depth+')', 'success' );
      cc(cdata, 'warning');
      // Push to display table
    }
    else{
      cc('There was an error getting data. It seems that the endpoint does not return data.','error');
    }
    itemdata_count++;
  }); // end $.each
}


/*****************************************************************************/
/************* PROCESSING COURSE DATA with CACHING **************************/
/*****************************************************************************/
  
// Given an ID (such as specifying a category of client courses), get all IDs within the item_TYPE, then process all course data
function getAllItemDataFromEndpoint(item_ID, item_TYPE){
  // get the course details from endpoint, then add to the results table
  cc('getAllItemDataFromEndpoint('+item_ID+', '+item_TYPE+')','info');
  // console.log('%c FUNCTION getAllItemDataFromEndpoint('+item_ID+', '+item_TYPE+') ', 'background: #ff9900; color: #000');
  base_url = urls.reports;
  var item_url = base_url + item_TYPE+'/'+item_ID;
  console.log('%c ENDPOINT url '+item_url, 'background: #ddd; color: #fff');
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var this_item_ID = cdata.id;
        console.log('%c item_TYPE '+item_TYPE+', ID: '+this_item_ID, 'background: #DDD; color: #000');
        get_item_data(this_item_ID,item_TYPE);
      }
    }); // end $.each
  }); // end $.when
}


/* =======================================
    Find Data within Array - Find a Needle in a Haystack
* ======================================= */

// given a data object (arr) and a value (query_item_id), check to see if the value is within the data.
// if value found found in data object, return the data for the matching ID
// Usage: If a Students ID (value) is found within a Course (arr), return the Student data so the Student ID and name can be displayed

function findItemByID(data,item_ID,item_TYPE){
  cc('findItemByID(data,'+item_ID+','+item_TYPE+')','run');
  console.log('findItemByID - below is the value of the incoming data:');
  console.log(data);
  cc('is data NULL?','info');
  isItemNullorUndefined(data);
  cc('is item NULL?','info');
  isItemNullorUndefined(item_ID);
  // ----- TEST TO ENSURE DATA IS WORKING ------ // 
  // var y = data[0];
  // console.log(y);
  // cc('data[0] ID = '+y.id,'success');
  // cc('data[0] fullname = '+y.fullname,'success');
  // ------------------------------------------ //

  var found = false;
  
  if (item_TYPE == 'course' || item_TYPE == 'courses') {
    console.log('checking courses...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through dataay COUNT = '+i, 'info');
      cc('data.length = '+data.length, 'info');
      
      cc('node = data['+i+']:','info' );
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Course Details: Course Name('+data[i].fullname+') Category('+data[i].category+') STARTDATE('+data[i].startdate+')', 'success');
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  category: data[i].category,
                  fullname: data[i].fullname,
                  shortname: data[i].shortname,
                  startdate: data[i].startdate
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning');
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for course or courses
  else if (item_TYPE == 'quizattempt' || item_TYPE == 'quizattempts') {
    console.log('checking quizattempts...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info');
      cc('data.length = '+data.length, 'info');
      cc('node = data['+i+']:','info' );
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Attempt Details: Quiz('+data[i].quiz+') User('+data[i].userid+')', 'success');
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  quiz: data[i].quiz,
                  userid: data[i].userid,
                  attempt: data[i].attempt,
                  uniqueid: data[i].uniqueid,
                  timestart: data[i].timestart,
                  timefinish: data[i].timefinish,
                  timemodified: data[i].timemodified,
                  timecheckstate: data[i].timecheckstate,
                  sumgrades: data[i].sumgrades
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning');
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for course or courses
  else if (item_TYPE == 'quiz' || item_TYPE == 'quizzes') {
    console.log('checking quiz...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info');
      cc('data.length = '+data.length, 'info');
      cc('node = data['+i+']:','info' );
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Quiz Details: Name('+data[i].name+') Course ID('+data[i].course+') SUMGRADES('+data[i].sumgrades+')', 'success');
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  name: data[i].name,
                  sumgrades: data[i].sumgrades,
                  course: data[i].grade
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning');
          }
      }else{
          cc('data['+i+'] is NULL or undefined', 'error');
      }
    } // end for // iterate through dataay
  } // end check for course or courses
  else{
    cc('Data type not found. Nothing specified to be done with the incoming data', 'error');
  } 
}


// Given the Course ID determine if the specific data can be loaded from localStorage. If not, hit the endpoint.
function get_item_data(item_ID, item_TYPE, item_ACTION){
  console.log('%c PROCESSING CURRENT '+item_TYPE+' ID: '+item_ID+' item_ACTION:'+item_ACTION, 'background: #FFCC00; color: #fff; padding: 2px 100px;');
  console.log('%c item_TYPE: '+item_TYPE +', item_ID:'+item_ID, 'background: #DDD; color: #000');
  var arr = null;
  var item_data_from_array = null;
  // console.log('Test Data Set: 4,99,5,6,68,7. -- Endpoint calls should be triggered for Course 99 and Course 68 as these are not saved in the TEMP data. Once retrieved add the new course Data to the Stored Data array. ')
  // temp_set_item_data();
  if (item_TYPE == 'course') {
    var data_name = 'courses';  
  };
  if (item_TYPE == 'quiz') {
    var data_name = 'quizzes';  
  };
  if (item_TYPE == 'students') {
    var data_name = 'students';  
  };
  if (item_TYPE == 'all_students') {
    var data_name = 'all_students';  
  };
  
  // var session_item_data_array = getStoredSessionData(data_name);
  var session_item_data_array = localStorage.getItem(data_name);
  console.log('session_item_data_array('+data_name+') is: ');
  console.log(session_item_data_array);


  if (isItemNullorUndefined(session_item_data_array)) {
    console.log('session_item_data_array is NULL or undefined');
    getItemDataFromEndpoint(item_ID,item_TYPE,item_ACTION);
  }else{
    console.log('session_item_data_array is not NULL or undefined');
  }

  if (session_item_data_array != null) {
    console.log('session_item_data_array is NOT NULL');
    // var arr = localStorage.getItem(item_storage_name);

    var arr = JSON.parse(session_item_data_array);
    // var arr = session_item_data_array;

    console.log('*********** arr **************');
    console.log(arr);  

    var item_data_from_array = findItemByID(arr,item_ID,data_name);
    console.log('---- item_data_from_array -----');
    console.log(item_data_from_array);

    // IF the item is not found, or if the arr is null or doesn't exist yet, hit the endpoint
    if (item_data_from_array == 'false') {
      console.log('FALSE satisfied - item_data_from_array is false, SO get data from endpoint for '+item_TYPE+': '+item_ID);
      // hit endpoint, get data, save to session array data
      getItemDataFromEndpoint(item_ID,item_TYPE,item_ACTION);
      // returns d
      var d = item_data_from_array[0];
      if (d != undefined) {
        processItemData(d,item_TYPE);
      }else{
        console.log('There was an error retrieving information for '+item_TYPE+' ID: '+item_ID+'. The response was NULL - meaning there was no information supplied to the Endpoint for this '+item_TYPE+'.')
      }
    }
    else{
      console.log('item_data_from_array is NOT false - get dataobject in localStorage for '+item_TYPE+' ID: '+item_ID+'. Endpoint WILL NOT be hit again. ');
      d = arr;
      if (d != undefined) {
        processItemData(d,item_TYPE,item_ACTION);
      }else{
        console.log('There was an error retrieving information from the localStorage for '+item_TYPE+' ID: '+item_ID);
      }
    }
  };
}

// Get the Course Data from the Endpoint
function getItemDataFromEndpoint(item_ID,item_TYPE,item_ACTION){
  // get the course details from endpoint, then add to the results table
  console.log('%c FUNCTION getItemDataFromEndpoint('+item_ID+','+item_TYPE+') ', 'background: #d7d7d7; color: #000');
  base_url = urls.reports;

  // FORMAT ENDPOINT
  if (item_TYPE == 'students') {
    var item_url = base_url + 'studentdata/'+item_ID;
  }else{
    var item_url = base_url +item_TYPE+'lookup/'+item_ID;  
  }
  console.log('%c check ENDPOINT url '+item_url, 'background: #ddd; color: #fff');
  
  // GET DATA FROM ENDPOINT
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    cc('DOING LOOP','info');
    // dig down to data node
    if (item_TYPE == 'students') {
      var d = item_data_from_array["user"];  
    }else{
      var d = item_data_from_array[0];
    }
    // Process Data
    if (d != undefined) {
      cc('the following data has been successfully pulled from the endpoint','success');
      console.log(d);
      findItemByID(d,item_ID,'course');
      // BHRIV 20160226
// ----- All Course Details need to be stored in an array in LocalStorage...then iterated over to find an ID match
// ----- The purpose is to prevent hitting endpoint many times
// ----- The storage and check storage functions are the key to not hitting endpoint more than once, except for student data. 
      
      // if (item_TYPE == 'course' || item_TYPE == 'courses') {
      //     cc('Find Course by ID','info');
      //     console.log(d);
      //     // ensure data passed is an object
      //     var course_data_object = dataType(d,'object');
      //     cc('course_data_object','warning');
      //     console.log(course_data_object);
      //     findItemByID(course_data_object,item_ID,'courses');
      // }
      
      // processItemData(d,item_TYPE,item_ACTION);
      return d;
    }else{
      console.log('There was an error retrieving information '+item_TYPE+': '+item_ID+'. The response was NULL - meaning there was no information supplied to the Endpoint for this '+item_TYPE+'.')
    }
  }); // end $.when
}


var item_ACTION = null;

// Given a data object process the data, add the data to a localStorage object for future use, do something with the data
function processItemData(d,item_TYPE,item_ACTION){
  console.log('%c FUNCTION processItemData('+d["id"]+','+item_TYPE+') ', 'background: #9933ff; color: #fff');
  console.log('d - incoming to processItemData');
  console.log(d);
  
  // get existing storage data, parse new data, store updated data object string
  var item_storage_name = item_TYPE;
  
  var storage_data = [];
  var storage_data = localStorage.getItem(item_storage_name);
  console.log('storage_data ('+item_storage_name+') from storage');
  console.log(storage_data);
  if (storage_data == undefined || storage_data == null) {
    console.log('%c ERROR: storage_data is null or undefined', 'background: #ff0000; color: #fff');
  }
  if (_.isArray(storage_data)) {
    console.log('storage_data is array');
  }else{
    console.log('storage_data is NOT array');
  }

  var new_data_object = [];
  // var m = _.extend(storage_data, d);
  // console.log('m');
  // console.log(m);
  
  if (storage_data == null) {
    new_data_object.push(d);
  }
  else{
    console.log('storage_data NOT null');
    if (_.isObject(storage_data)) {
      console.log('storage_data is object');
      
    }else{
      console.log('storage_data is not object');
      // _.object()
      if (_.isString(storage_data)) {
        console.log('storage_data is string');
        new_data_object = JSON.parse(storage_data);
        if (_.isObject(new_data_object)) {
          console.log('storage_data is NOW converted from string to object');
        }
      };
    }

    console.log('is d an object?');
    console.log(_.isObject(d));

    console.log('is new_data_object an object?');
    console.log(_.isObject(new_data_object[0]));

    new_data_object.push.apply(new_data_object, d);
    console.log('new_data_object is push');
    
    var all_courses = [];
    all_courses.push(d);
    all_courses.push(new_data_object[0]);

    console.log('all_courses');
    console.log(all_courses);
  }
  
  if (item_TYPE == 'course')    {
    item_storage_name = 'courses';
    // var item_storage_data = JSON.stringify(d);
    localStorage.setItem( 'courses', JSON.stringify(all_courses) );
    cc('Data Stored in "courses" localStorage', 'done');
    var i = localStorage.getItem( 'courses');
    cc('New "courses" from localStorage:', 'info');
    console.log(i);
  }

  if (item_TYPE == 'quiz')      {
    item_storage_name = 'quizzes';
    var item_storage_data = JSON.stringify(d);
    localStorage.setItem( item_storage_name, item_storage_data );
    cc('Data Stored in '+item_storage_name+' localStorage', 'done');
  }

  if (item_TYPE == 'students')  { 
    item_storage_name = 'students';
    // For 'student's 
    // Filter the size of logstore in students array
    var data_filtered_logstore = filterLogstoreData(d);
    item_constructed_array.push(data_filtered_logstore);
    var item_storage_data = JSON.stringify(item_constructed_array);
    localStorage.setItem( item_storage_name, item_storage_data );
    cc('Data Stored in '+item_storage_name+' localStorage', 'done');
  }
  if (item_TYPE == 'all_students')      {
    item_storage_name = 'all_students';
    var item_storage_data = JSON.stringify(d);
    localStorage.setItem( item_storage_name, item_storage_data );
    cc('Data Stored in '+item_storage_name+' localStorage', 'done');
  }

  console.log('"'+item_storage_name+'" storage retrieval includes data for '+item_TYPE+' ID: '+d["id"]);
  var s = JSON.parse(localStorage.getItem( item_storage_name));
  console.log(s);
  // Do something with the data
  // if (item_ACTION == null) {
    displayItemData(d,item_TYPE,item_ACTION);  
  // };
  // if (item_ACTION == 'get_name') {
  //   console.log('get name for course: '+item_ID);
  // };
}

function filterLogstoreData(d){
  cc('filterLogstoreData(d) ','run');
  // get student data
    // remove the logstore array from the student array
  if (d.logstore != undefined) {
    
    var recent_activity = [];
    var recent_logstore = [];
    var data_with_recent_activity = [];
    
    recent_activity = _.last(d.logstore,10);
    console.log('recent_activity');
    console.log(recent_activity);

    jQuery.each(recent_activity, function(i, ldata) {
      var timecreated_int = Number(ldata.timecreated);
      recent_logstore.push(timecreated_int);
      var activity_moment = moment.unix(ldata.timecreated).format("YYYY/MM/DD hh:mm:ss");
      cc(d.firstname+' TIME:'+activity_moment+ ' '+ldata.action+ ' course ID:' +ldata.courseid, 'info')
      // Process Course ID to find Course Name
      get_item_data(ldata.courseid, 'course', 'get_name');
    }); // end $.each

    // console.log('recent_logstore');
    // console.log(recent_logstore);

    var data_without_logstore = _.omit(d,'logstore');
    // console.log('data_without_logstore: ');
    // console.log(data_without_logstore);
    return data_without_logstore;
  }else{
    cc('d.logstore is undefined','warning');
  }
}

// Given a data object, modify and/or display the data in the UI
function displayItemData(d,item_TYPE,item_ACTION){
  cc('displayItemData(d,'+item_TYPE+','+item_ACTION+') ', 'run');
  // Specify What to do with the data
  if (item_TYPE == 'course') {
    console.log(' COURSE DATA display......');
    switch(item_ACTION){
      case "get_name":
        cc('%c Course Name generated by Activity Loop: '+d.shortname, 'info');
        break;
      case "get_startdate":
        cc('Course startdate generated by Activity Loop: '+d.startdate, 'info');
        break;
      default:
          console.log(' ID: '+d["id"] +
          ' SHORTNAME: '+d.shortname +
          ' FULLNAME: '+d.fullname +
          ' CATEGORY: '+d.category +
          ' STARTDATE: '+d.startdate);
    }
  };
  if (item_TYPE == 'quiz') {
    cc('item_TYPE = quiz','info');
    console.log(' ID: '+d["id"] +
          ' COURSE: '+d.course +
          ' NAME: '+d.name +
          ' SUMGRADES: '+d.sumgrades +
          ' GRADE: '+d.grade);
  };
  if (item_TYPE == 'students') {
    cc('item_TYPE = students','info');
    console.log(
          'ID: '          +d["id"] +
          ' EMAIL: '      +d.email +
          ' firstname: '  +d.firstname +
          ' lastname: '   +d.lastname +
          ' firstaccess:' +d.firstaccess +
          ' lastaccess: ' +d.lastaccess);
          // ' logstore: '   +d.logstore);
  };
  // add to table rows
}

/*
  For each student activity in single student log,
  pull data for logstor
  setup switching to only process relevant items
  add test loop counter for faster debugging
  get course ID
  pass to Item Processing
  view results

  // only test the activity of viewing courses
  if(adata.action == "viewed" && adata.target == "course")
  {
      "userid": "4",
      "action": "viewed",
      "target": "course",
      "objecttable": null,
      "objectid": null,
      "courseid": "1",
      "timecreated": "1440434141"
    },

    // DATA NAMES
    activity_action = adata.action;
    activity_target = adata.target;
    activity_timecreated = adata.timecreated;
    activity_moment = moment.unix(activity_time).format("YYYY/MM/DD hh:mm:ss");
    activity_table = adata.objecttable;
    activity_id = adata.objectid;
    activity_course = adata.courseid;
    activity_user_id = adata.id;
*/


/*
  - endpoints used:
  
  http://www.privacyvector.com/api/lumiousreports/course/1 (all courses in Category = 1)
  http://www.privacyvector.com/api/lumiousreports/students/2 (all students in Course ID = 2)
  http://www.privacyvector.com/api/lumiousreports/quiz/2 (all quizzes in Course ID = 2)
  http://www.privacyvector.com/api/lumiousreports/quizattempts/2 (all quizzes attempt of Quiz ID = 2), http://www.akronzip.com/lumiousreports/quizattempts/2

  http://www.privacyvector.com/api/lumiousreports/courselookup/1
  http://www.privacyvector.com/api/lumiousreports/studentdata/4
  http://www.privacyvector.com/api/lumiousreports/quizlookup/1

  http://www.privacyvector.com/api/lumiousreports/coursecategories/

*/

/*
  - authentication endpoint
  {
    "userid": "17",
    "email": "ben@me.com",
    "password": "39#2da0r13",
    "group": "Comstor",
    "role": "administrator",
    "timeauthorized": "1447371335"
  },
*/

/*
  - verify data in the Totara Dasboard
  http://comstor.learningconsole.com/login/

  DATA HOME:
  http://comstor.learningconsole.com/course/management.php?categoryid=1

  DATA FEED for DATA HOME:
  http://www.privacyvector.com/api/lumiousreports/course/1

*/

