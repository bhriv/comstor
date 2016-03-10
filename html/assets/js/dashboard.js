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

  $("#loadAllCategories_visible").click(function() {
    loadAllCategories('visible');
  });
  $("#loadAllCategories_hidden").click(function() {
    loadAllCategories('hidden');
  });

  $("#count_students").click(function() {
    count_students();
  });
  $("#get_courses_with_students").click(function() {
    get_courses_with_students();
  });

  $("#new_dashboard").click(function() {
    new_dashboard();
  });
  $("#getAllHiddenCategories").click(function() {
    getAllHiddenCategories();
  });

  $("#getAllVisibleCategories").click(function() {
    getAllVisibleCategories();
  });

  if (urlParams['page'] == 'teacher-reports'){
    if (urlParams['current_cat'] != undefined) {
      var catid = urlParams['current_cat'];
      // var catid = 41;
      getAllCoursesInCategory(catid);
      // getAllStudentsInCourse(catid);
    }else{
      cc('No current_cat found in URL','warning');
    }
  }
  

  // $(".popup_link").click(function() {
  //   return pop_up(this, "Pop Up");
  // });


}); // end Doc Ready 

// Show Hide Login and Signup Inner Divs in Modal
function hide_reports(){
  $('.report_display_switch').hide();
}


/*****************************************************************************/
/************************* COURSES WITH STUDENTS *****************************/
/*****************************************************************************/


function new_dashboard(){
  cc('new_dashboard','run')
  var item_TYPE = 'students';
  // getHiddenCategories();
  // remove 14
  // var all_visible_categories = _.filter(all_hidden_categories,function(num){ return num != 14; })
  // cc('all_visible_categories: ','success')
  // console.log(all_visible_categories);
  for(var i = 0; i <= max_val; i++) {
    var item_ID = i;
    // get all courses in each category
    count_students(item_ID,item_TYPE);
  }
}  
// Find all courses that have enrolled students. Prevent blank Dashboards
var courses_with_students = [];
var max_val = 200;

function get_courses_with_students(){
  var item_TYPE = 'students';
  for(var i = 0; i <= max_val; i++) {
    var item_ID = i;
    count_students(item_ID,item_TYPE);
  }
}

// Get all courses
// var all_course_ids = [];

// function all_course_ids(){
//   base_url = urls.reports;
//   var item_url = base_url +'course';
//   console.log('%c ENDPOINT url '+item_url, 'background: #ddd; color: #fff');
//   var item_data_from_array = [];
//   var itemdata = $.getJSON(item_url);
//   $.when(itemdata).done(function(item_data_from_array) {
//     // count number of results 
//     var size = _.size(item_data_from_array);
//     if (size != 0) {
//       cc('Course ('+item_ID+') TOTAL '+item_TYPE +'='+size,'success');  
//       all_course_ids.push(item_ID);
//       console.log(courses_with_students);
//       jQuery.each(item_data_from_array, function(i, cdata) {
//         // Process all item_TYPE within the array
//         var d = item_data_from_array[0];
//         if (d != undefined) {
//           var this_item_ID = cdata.id;
//           cc(item_TYPE+' ID: '+this_item_ID, 'info');
//           // get_item_data(this_item_ID,item_TYPE);
//         }else{
//           cc('Could not dig down to data.','error');
//         }
//       }); // end $.each
//     } // end if != 0
//     if(item_ID == max_val){
//       cc('ALL courses with students','done');
//       console.log(courses_with_students);
//       processCourses(courses_with_students);
//     }
//   }); // end $.when
// }
  
function count_students(item_ID, item_TYPE){
  // get the course details from endpoint, then add to the results table
  cc('count_students('+item_ID+', '+item_TYPE+')','info');
  // console.log('%c FUNCTION getAllItemDataFromEndpoint('+item_ID+', '+item_TYPE+') ', 'background: #ff9900; color: #000');
  base_url = urls.reports;
  var item_url = base_url + item_TYPE+'/'+item_ID;
  console.log('%c ENDPOINT url '+item_url, 'background: #ddd; color: #fff');
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    // count number of results 
    var size = _.size(item_data_from_array);
    if (size != 0) {
      cc('Course ('+item_ID+') TOTAL '+item_TYPE +'='+size,'success');  
      courses_with_students.push(item_ID);
      console.log(courses_with_students);
      jQuery.each(item_data_from_array, function(i, cdata) {
        // Process all item_TYPE within the array
        var d = item_data_from_array[0];
        if (d != undefined) {
          var this_item_ID = cdata.id;
          cc(item_TYPE+' ID: '+this_item_ID, 'info');
          // get_item_data(this_item_ID,item_TYPE);
        }else{
          cc('Could not dig down to data.','error');
        }
      }); // end $.each
    } // end if != 0
    if(item_ID == max_val){
      cc('ALL courses with students','done');
      console.log(courses_with_students);
      processCourses(courses_with_students);
    }
  }); // end $.when
}


function processCourses(item_data_from_array){
  cc('processCourses','run');

  jQuery.each(item_data_from_array, function(i, cdata) {
    // Process all item_TYPE within the array
    var d = cdata;
    if (d != undefined) {

      var item_ID = cdata;
      var item_TYPE = 'course';
      var item_ACTION = 'list_course_names';
      cc(item_TYPE+' with students ID:'+item_ID, 'success');
      getItemDataFromEndpoint(item_ID,item_TYPE,item_ACTION);
      // get_item_data(this_item_ID,item_TYPE);
    }else{
      cc('Could not list data.','error');
    }
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

// Get the single Item Data from the Endpoint
function getItemDataFromEndpoint(item_ID,item_TYPE,item_ACTION){
  // get the course details from endpoint, then add to the results table
  cc('getItemDataFromEndpoint('+item_ID+','+item_TYPE+') ', 'run');
  base_url = urls.reports;

  // FORMAT ENDPOINT
  if (item_TYPE == 'students' || item_TYPE == 'student') {
    var item_url = base_url + 'studentdata/'+item_ID;
  }else{
    var item_url = base_url +item_TYPE+'lookup/'+item_ID;  
  }
  cc('check ENDPOINT url '+item_url, 'success');
  
  // GET DATA FROM ENDPOINT
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    // cc('DOING LOOP','info');
    // dig down to data node
    if (item_TYPE == 'students' || item_TYPE == 'student') {
      var d = item_data_from_array["user"];  
    }else{
      var d = item_data_from_array[0];
    }
    // Process Data
    if (d != undefined) {
      cc('the following data has been successfully pulled from the endpoint','success');
      console.log(d);
      if (item_TYPE == 'course' || item_TYPE == 'courses') {
        if (item_ACTION == 'list_course_names') {
          cc(item_TYPE+' details:' ,'info');
          cc( 'ID: '+d.id+ ' NAME:'+d.fullname,'success');
          var table_id = '#active_courses table'
          var this_item_ID = d['id'];
          var fullname        = d['fullname'];
          var shortname       = d['shortname'];
          var startdate = d['startdate'];
          var readable_date = dateMoment(startdate);
          var category      = d['category'];

          // cc('name '+name+' timemodified '+timemodified+ ' readable_date '+readable_date+ ' depth '+depth+ ' path '+path+ ' switch_url '+ switch_url, 'success' );
          // Push to display table
          var table_data = '<tr><td>'+this_item_ID+'</td><td><h5>' +fullname+ '</h5></td><td>' +shortname+ '</td><td>' +category +'</td><td><span class="hidden">'+startdate+'</span></strong> ' +readable_date+ '</td></tr>';
          $(table_id).append(table_data);
        };
      };
      // findItemByID(d,item_ID,item_TYPE);
      processItemData(d,item_TYPE,item_ACTION)
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
      // cc('String will be returned','warning');
      // return s;
    }else{
      console.log('There was an error retrieving information '+item_TYPE+': '+item_ID+'. The response was NULL - meaning there was no information supplied to the Endpoint for this '+item_TYPE+'.')
    }
  }); // end $.when
}

// Given the Course ID determine if the specific data can be loaded from localStorage. If not, hit the endpoint.
function get_item_data(item_ID, item_TYPE, item_ACTION){
  cc('get_item_data('+item_ID +','+item_TYPE+','+item_ACTION+')', 'run');
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
  cc('session_item_data_array('+data_name+') is: ','info');
  console.log(session_item_data_array);

  if (isItemNullorUndefined(session_item_data_array)) {
    console.log('LINE 436: session_item_data_array is NULL or undefined');
    getItemDataFromEndpoint(item_ID,item_TYPE,item_ACTION);
    alert('434 Exiting - temp');
  }else{
    console.log('LINE 439: session_item_data_array is not NULL or undefined');
  }
  // TEMP

  // var arr = null;
  // var item_data_from_array = null;

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



/* =======================================
    Find Data within Array - Find a Needle in a Haystack
* ======================================= */

// given a data object (arr) and a value (query_item_id), check to see if the value is within the data.
// if value found found in data object, return the data for the matching ID
// Usage: If a Students ID (value) is found within a Course (arr), return the Student data so the Student ID and name can be displayed

function findItemByID(data,item_ID,item_TYPE,disable_console_log){
  cc('findItemByID(data,'+item_ID+','+item_TYPE+') disable_console_log('+disable_console_log+')','run',disable_console_log);
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
      cc('iterating through data COUNT = '+i, 'info',disable_console_log);
      cc('data.length = '+data.length, 'info',disable_console_log);
      
      cc('node = data['+i+']:','info',disable_console_log);
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Course Details: Course Name('+data[i].fullname+') Category('+data[i].category+') STARTDATE('+data[i].startdate+')', 'success',disable_console_log);
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
  else if (item_TYPE == 'parent_ID' ) {
    console.log('checking parent_ID...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info',disable_console_log);
      cc('data.length = '+data.length, 'info',disable_console_log);
      cc('node = data['+i+']:','info',disable_console_log );
      console.log(data[i]);

      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Parent Details: Name('+data[i].name+') ID('+data[i].id+')', 'success');
              return { // return dataay of data including labels for access
                  id: data[i].id,
                  name: data[i].name
              };
              break;
          }
          else{
            cc('ID not matched in data['+i+'], moving on to the next node', 'warning',disable_console_log);
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


// var item_ACTION = null;
var action_count = 0;
// Given a data object process the data, add the data to a localStorage object for future use, do something with the data
function processItemData(d,item_TYPE,item_ACTION){
  action_count++;
  cc('Count = '+action_count+' processItemData('+d["id"]+','+item_TYPE+','+item_ACTION+') ', 'run');

  if (item_TYPE == 'students' || item_TYPE == 'student') {
    cc('item_TYPE = students','info');
    console.log(
          'ID: '          +d["id"] +
          ' EMAIL: '      +d.email +
          ' firstname: '  +d.firstname +
          ' lastname: '   +d.lastname +
          ' city: '       +d.city +
          ' firstaccess:' +d.firstaccess +
          ' lastaccess: ' +d.lastaccess);
          // ' logstore: '   +d.logstore);
    filterLogstoreData(d);
    cc('Student data processing complete:','info');
    console.log(d);
  };

  // get existing storage data, parse new data, store updated data object string
  if (item_ACTION == 'update') {
    cc('ACTION:'+item_ACTION, 'run');

    var updated_data_object = [];
    var storage_data = localStorage.getItem(item_TYPE);

    if (isItemNullorUndefined(storage_data)) { 
      cc('INSIDE PROCESS LOOP FIRST RUN','success');
      // if no localstorage for item_TYPE, set this data as the storage data
      var data_object = dataType(d,'object');
      // flatten object to ensure new data is binded to last node
      var flattened_data_object = _.flatten(data_object);
      cc('flatten flattened_data_object','info');
      cc(flattened_data_object,'data');
      flattened_data_object.push(d);
      cc('flattened_data_object with OLD and NEW is:','done');
      cc(flattened_data_object,'data');
      var data_string = dataType(flattened_data_object,'string');
      localStorage.setItem(item_TYPE,data_string);
    }else{
      cc('storage_data is:','done');
      var data_object = dataType(storage_data,'object');
      var flattened_data_object = _.flatten(data_object);
      cc('flatten flattened_data_object','info');
      cc(flattened_data_object,'data');
      flattened_data_object.push(d);
      cc('flattened_data_object with OLD and NEW is:','done');
      cc(flattened_data_object,'data');
      var data_string = dataType(flattened_data_object,'string');
      localStorage.setItem(item_TYPE,data_string);
    }
    // var storage_data_object = dataType(storage_data, 'object');
    // console.log('storage_data_object ('+item_TYPE+') from storage');
    // console.log(storage_data_object);
    
    
    /*
    if (!isItemNullorUndefined(storage_data_object)) { 
      // convert storage data to object
      // dataType(storage_data,'object');
      // dataType(d,'object');
    
    // Push original data object to initiated new object 
      updated_data_object.push(storage_data_object);
    // combine new data with existing data
      updated_data_object.push(d);

      // var t = temp_set_quizattempt_data();
      // var q = temp_set_quiz_data();
      // var t_o = dataType(t,'object');
      // var q_o = dataType(q,'object');
      // updated_data_object.push(t_o);
      // updated_data_object.push(q_o);
      // cc('updated_data_object TEMP:','success');
      // console.log(updated_data_object);
      cc('Combined updated_data_object OBJECT:','info');
      console.log(updated_data_object);

      // var s = dataType(updated_data_object);
      
      // // var data_string = dataType(updated_data_object,'string');
      // // cc('updated_data_object CONVERTED to string','info');
      // localStorage.setItem(item_TYPE,updated_data_object);
      // cc('Data updated and stored in localStorage as string. Data from storage is NOW:','success');
      // var n = localStorage.getItem(item_TYPE);
      // console.log(n);

    // end TEMP
    }else{
      cc('No local storage for '+item_TYPE, 'warning');

      var data_string = dataType(d,'string');
      // cc('data_object CONVERTED to string','info');
      
      console.log(data_string);

      localStorage.setItem(item_TYPE,d);
      cc('Data updated and stored in localStorage as string. Data from storage is NOW:','success');
      var n = localStorage.getItem(item_TYPE);
      console.log(n);
    }
    */
  };
  
  
  // var m = _.extend(storage_data, d);
  // console.log('m');
  // console.log(m);
  
  // if (storage_data == null) {
    
  // }
  // else{
  //   console.log('storage_data NOT null');
  //   if (_.isObject(storage_data)) {
  //     console.log('storage_data is object');
      
  //   }else{
  //     console.log('storage_data is not object');
  //     // _.object()
  //     if (_.isString(storage_data)) {
  //       console.log('storage_data is string');
  //       new_data_object = JSON.parse(storage_data);
  //       if (_.isObject(new_data_object)) {
  //         console.log('storage_data is NOW converted from string to object');
  //       }
  //     };
  //   }

  //   console.log('is d an object?');
  //   console.log(_.isObject(d));

  //   console.log('is new_data_object an object?');
  //   console.log(_.isObject(new_data_object[0]));

  //   new_data_object.push.apply(new_data_object, d);
  //   console.log('new_data_object is push');
    
  //   var all_courses = [];
  //   all_courses.push(d);
  //   all_courses.push(new_data_object[0]);

  //   console.log('all_courses');
  //   console.log(all_courses);
  // }
  
  // if (item_TYPE == 'course')    {
  //   item_storage_name = 'courses';
  //   // var item_storage_data = JSON.stringify(d);
  //   localStorage.setItem( 'courses', JSON.stringify(all_courses) );
  //   cc('Data Stored in "courses" localStorage', 'done');
  //   var i = localStorage.getItem( 'courses');
  //   cc('New "courses" from localStorage:', 'info');
  //   console.log(i);
  // }

  // if (item_TYPE == 'quiz')      {
  //   item_storage_name = 'quizzes';
  //   var item_storage_data = JSON.stringify(d);
  //   localStorage.setItem( item_storage_name, item_storage_data );
  //   cc('Data Stored in '+item_storage_name+' localStorage', 'done');
  // }

  // if (item_TYPE == 'students')  { 
  //   item_storage_name = 'students';
  //   // For 'student's 
  //   // Filter the size of logstore in students array
  //   var data_filtered_logstore = filterLogstoreData(d);
  //   item_constructed_array.push(data_filtered_logstore);
  //   var item_storage_data = JSON.stringify(item_constructed_array);
  //   localStorage.setItem( item_storage_name, item_storage_data );
  //   cc('Data Stored in '+item_storage_name+' localStorage', 'done');
  // }
  // if (item_TYPE == 'all_students')      {
  //   item_storage_name = 'all_students';
  //   var item_storage_data = JSON.stringify(d);
  //   localStorage.setItem( item_storage_name, item_storage_data );
  //   cc('Data Stored in '+item_storage_name+' localStorage', 'done');
  // }

  // console.log('"'+item_storage_name+'" storage retrieval includes data for '+item_TYPE+' ID: '+d["id"]);
  // var s = JSON.parse(localStorage.getItem( item_storage_name));
  // console.log(s);
  // // Do something with the data
  // // if (item_ACTION == null) {
  //   displayItemData(d,item_TYPE,item_ACTION);  
  // // };
  // // if (item_ACTION == 'get_name') {
  // //   console.log('get name for course: '+item_ID);
  // // };
}

function filterLogstoreData(d){
  cc('filterLogstoreData(d) ','run');
  // get student data
    // remove the logstore array from the student array
  if (d.logstore != undefined) {
    
    var recent_activity = [],
        recent_logstore = [],
        data_with_recent_activity = [],
        profile_data = [],
        a = [];

    recent_activity = _.last(d.logstore,10);
    console.log('recent_activity');
    console.log(recent_activity);
    data_with_recent_activity.push(recent_activity);

    // jQuery.each(recent_activity, function(i, ldata) {
    //   var timecreated_int = Number(ldata.timecreated);
    //   recent_logstore.push(timecreated_int);
    //   var activity_moment = moment.unix(ldata.timecreated).format("YYYY/MM/DD hh:mm:ss");
    //   cc(d.firstname+' TIME:'+activity_moment+ ' '+ldata.action+ ' course ID:' +ldata.courseid, 'info')
    //   // Process Course ID to find Course Name
    //   // get_item_data(ldata.courseid, 'course', 'get_name');
    //   data_with_recent_activity.push(activity_moment);
    // }); // end $.each

    var keys = ['logstore','country','currentlogin','lang','lastip','lastlogin','picture','posts','quizattempts','quizgrades','timecreated','timemodified','timezone','url','username','']
    var profile_data = _.omit(d,keys);
    console.log('profile_data: ');
    console.log(profile_data);

    // data_with_recent_activity.push(profile_data);
    // console.log('data_with_recent_activity');
    // console.log(data_with_recent_activity);

    return profile_data;
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


/*****************************************************************************/
/**************************** GET COURSE CATEGORIES  *************************/
/*****************************************************************************/

var all_visible_categories = [];
var all_visible_category_data = [];
var all_hidden_categories = [];
var all_hidden_category_data = [];

var category_grandparents = [];
var category_parents = [];
var category_children = [];
var category_grandchildren = [];
var category_greatgrandchildren = [];
var category_greatgreatgrandchildren = [];
var category_greatgreatgreatgrandchildren = [];
var category_greatgreatgreatgrandchildren = [];
var category_orphans = [];

var visible_category_grandparents = [];
var visible_category_grandparents_data = [];
var visible_category_parents = [];
var visible_category_parents_data = [];

var visible_category_children = [];
var visible_category_children_data = [];

var visible_category_grandchildren = [];
var visible_category_grandchildren_data = [];


// Get Visible Course Category IDS, save in Array
// Non-Admin users only access visible categories

function getAllVisibleCategories(){  
  cc('getAllVisibleCategories','info');
  var all_visible_categories = [];
  var all_visible_category_data = [];
  var category_grandparents = [];
  var category_parents = [];
  var category_children = [];

  var visible_category_grandparents = [];
  var visible_category_grandparents_data = [];
  var visible_category_parents = [];
  var visible_category_parents_data = [];

  var visible_category_children = [];
  var visible_category_children_data = [];
  var visible_category_grandchildren = [];
  var visible_category_grandchildren_data = [];

  cc('all_visible_categories AND all_visible_category_data RESET','highlight');

  var switch_url = base_url +'lumiousreports/coursecategories/';
  var item_url = switch_url;
  console.log('%c SWITCH ENDPOINT url '+switch_url, 'background: #ddd; color: #fff');
  // Populate and extract data
  var item_data_from_array = [];
  var itemdata_count = 0;
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var result_count = getResponseSize(itemdata,'JSON');
    cc('results COUNT returned: '+result_count,'highlight');
    
    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var this_item_ID = cdata.id;
        cc('Category ID('+this_item_ID+')','success');
        // Get data from JSON
        all_visible_category_data.push(cdata);
        var this_item_ID = cdata['id'];
        var this_item_ID_int = parseInt(this_item_ID);
        all_visible_categories.push(this_item_ID_int);
        // Store Type of Category
        var depth = cdata['depth'];
        if (depth == '1') {
          visible_category_grandparents.push(this_item_ID);
          visible_category_grandparents_data.push(cdata);
        };
        if (depth == '2') {
          visible_category_parents.push(this_item_ID);
          visible_category_parents_data.push(cdata);
        };
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;
      if (itemdata_count == result_count) {
        cc('All Visible Category IDS','success');
        console.log(all_visible_categories);  
        console.log(all_visible_category_data);  
        setLocalStorage(all_visible_category_data,'visible_categories');
        cc('visible_category_parents')
        console.log(visible_category_parents);
      };
    }); // end $.each
  }); // end $.when
}

// Get Hidden Course Category IDS, save in Array

function getAllHiddenCategories(){  
  cc('getAllHiddenCategories','info');
  var all_hidden_categories = [];
  var all_hidden_category_data = [];

  var switch_url = base_url +'lumiousreports/hiddencategories/';
  var item_url = switch_url;
  console.log('%c SWITCH ENDPOINT url '+switch_url, 'background: #ddd; color: #fff');
  // Populate and extract data
  var item_data_from_array = [];
  var itemdata_count = 0;
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var result_count = getResponseSize(itemdata,'JSON');
    cc('results COUNT returned: '+result_count,'highlight');
    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var this_item_ID = cdata.id;
        cc('Hidden Category ID('+this_item_ID+')','success');
        // Get data from JSON
        all_hidden_category_data.push(cdata);
        var this_item_ID = cdata['id'];
        var this_item_ID_int = parseInt(this_item_ID);
        all_hidden_categories.push(this_item_ID_int);
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;
      if (itemdata_count == result_count) {
        cc('All Hidden Category IDS','success');
        console.log(all_hidden_categories); 
        console.log(all_hidden_category_data); 
        setLocalStorage(all_hidden_category_data,'hidden_categories');
      };
      
    }); // end $.each
  }); // end $.when
}

// Display the course categories grouped by visibility type for Admin

function loadAllCategories(visibility_type,level){  
  var all_nested_category_data = [];
  if (visibility_type == undefined) {
    visibility_type = 'visible';
  };
  cc('loadAllCategories('+visibility_type+')','run');
  var itemdata_count = 0;
  // Setup ids and labels
  if (visibility_type == 'visible') {
    var item_url = base_url +'lumiousreports/coursecategories/';
    var switch_url = base_url +'lumiousreports/hiddencategories/';
    var switch_label = 'Hide';
    var count_id = '#'+visibility_type+'_count';
    var table_id = '#'+visibility_type+'_categories';
  }else{
    var item_url = base_url +'lumiousreports/hiddencategories/';
    var switch_url = base_url +'lumiousreports/coursecategories/';
    var switch_label = 'Show';
    var count_id = '#'+visibility_type+'_count';
    var table_id = '#'+visibility_type+'_categories';
  }
  cc('loadAllCategories '+visibility_type+' ENDPOINT url '+item_url, 'info');
  // Populate and extract data
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var result_count = getResponseSize(itemdata,'JSON');
    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var depth       = cdata['depth'];
        if (visibility_type == 'visible' || visibility_type == 'course') {
          switch(depth){
            case '1': 
              category_grandparents.push(cdata);
              break;
            case '2':
              category_parents.push(cdata);
              break;
            case '3':
              category_children.push(cdata);
              break;
            case '4':
              category_grandchildren.push(cdata);
              break;
            case '5':
              category_greatgrandchildren.push(cdata);
              break;
            case '6':
              category_greatgreatgrandchildren.push(cdata);
              break;
            case '7':
              category_greatgreatgreatgrandchildren.push(cdata);
              break;
            default:
              category_orphans.push(cdata);
          }
        };
        itemdata_count++;
        // cc('CATEGORY COUNT '+itemdata_count+' name '+name+' timemodified '+timemodified+ ' readable_date '+readable_date+ ' depth '+depth+ ' path '+path+ ' switch_url '+ switch_url, 'done' );
        if (itemdata_count == result_count) {
          cc('loadAllCategories '+visibility_type+' done. Total '+visibility_type+' categories = '+itemdata_count,'success');
          var itemdata_count_display = '('+itemdata_count+ ')';
          $(count_id).append(itemdata_count_display);
          processCategory(visibility_type,'grandparents');
          processCategory(visibility_type,'parents');
          processCategory(visibility_type,'children');
          processCategory(visibility_type,'grandchildren');
          processCategory(visibility_type,'greatgrandchildren');
          processCategory(visibility_type,'greatgreatgrandchildren');
          processCategory(visibility_type,'greatgreatgreatgrandchildren');
          processCategory(visibility_type,'orphans');
          // processParents();
          // processChildren();
          // processGrandchildren();
          // updateGrandparents();
          // setLocalStorage(all_hidden_category_data,'hidden_categories');
        };
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
    }); // end $.each
  }); // end $.when
}

// var test_obj = {"test":"foo"};
var category_loop_count = 0;
/*****************************************************************************/
/********************************* GROUP CATEGORIES **************************/
/*****************************************************************************/
var all_nested_category_data = [];
var all_nested_category_data_reversed = [];
var master_category_data = [];

function processCategory(visibility_type,level){
  cc('processCategory','run');

  var itemdata_count = 0;
  var result_count = 0;
  var visible_category_grandparents_data = [];
  var item_data_from_array = category_grandparents;
  var visible_category_data = [];
  
  category_loop_count++;

  switch(level){
    case "grandparents" :
      var item_data_from_array = category_grandparents;
      break;
    case "parents" :
      var item_data_from_array = category_parents;
      break;
    case "children" :
      var item_data_from_array = category_children;
      break;
    case "grandchildren" :
      var item_data_from_array = category_grandchildren;
      break;
    case "greatgrandchildren" :
      var item_data_from_array = category_greatgrandchildren;
      break;
    case "greatgreatgrandchildren" :
      var item_data_from_array = category_greatgreatgrandchildren;
      break;
    case "greatgreatgreatgrandchildren" :
      var item_data_from_array = category_greatgreatgreatgrandchildren;
      break;
    default: 
      var item_data_from_array = category_orphans;
      break;
  }
  
  var result_count = getResponseSize(item_data_from_array);
  cc('Total '+level+': '+result_count,'highlight');
  jQuery.each(item_data_from_array, function(i, cdata) {
    // Process all courses within the category
    var d = item_data_from_array[0];
    if (d != undefined) {
      // Store core data
      var keys = ['idnumber','descriptionformat','visible','visibleold','theme','programcount','certifcount','sortorder']
      var filtered_data  = _.omit(cdata,keys);
      visible_category_data.push(filtered_data);
    }
    else{
      cc('There was an error getting data. It seems that the endpoint does not return data.','error');
    }
    itemdata_count++;

    if (itemdata_count == result_count) {
      cc('All processing of '+level+' complete. Category loop: '+category_loop_count,'success');

      console.log(visible_category_data)
      all_nested_category_data.push(visible_category_data);
      cc('all_nested_category_data UPDATED','info')
      console.log(all_nested_category_data);

      // cc('REVERSE all_nested_category_data','info')
      
      // all_nested_category_data_reversed.push(all_nested_category_data[]);
      // console.log(all_nested_category_data_reversed);

      // localStorage.removeItem(level);
      // setLocalStorage(visible_category_data,level);
      if (category_loop_count == 6 ) {
        localStorage.removeItem('categories');
        setLocalStorage(all_nested_category_data,'categories');
        nestleCategories(all_nested_category_data,0);
        nestleCategories(all_nested_category_data,1);
        nestleCategories(all_nested_category_data,2);
        nestleCategories(all_nested_category_data,3);
        nestleCategories(all_nested_category_data,4);
        nestleCategories(all_nested_category_data,5);
        cc('sorted_category_data','highlight')
        console.log(sorted_category_data);
        displaySortedCategoryResults(sorted_category_data);
      };
      
      // Once Data complete Process next set
      // processParents(visibility_type);
    };
  }); // end $.each
}

// function processParents(visibility_type){
//   cc('processParents','run');
//   var itemdata_count = 0;
//   var result_count = 0;
//   var visible_category_parents_data = [];
//   var item_data_from_array = category_parents;
//   var result_count = getResponseSize(category_parents);
//   cc('Total parents: '+result_count,'highlight');
//   jQuery.each(item_data_from_array, function(i, cdata) {
//     // Process all courses within the category
//     var d = item_data_from_array[0];
//     if (d != undefined) {
//       // Store core data
//       var keys = ['idnumber','descriptionformat','visible','visibleold','theme','programcount','certifcount','sortorder']
//       var filtered_data  = _.omit(cdata,keys);
//       visible_category_parents_data.push(filtered_data);
//     }
//     else{
//       cc('There was an error getting data. It seems that the endpoint does not return data.','error');
//     }
//     itemdata_count++;
//     if (itemdata_count == result_count) {
//       cc('All processGrandparents complete','success');
//       console.log(visible_category_parents_data)
//       localStorage.removeItem('parents');
//       setLocalStorage(visible_category_parents_data,'parents');
//       // Once Data complete Process next set
//       // processParents(visibility_type);
//     };
//   }); // end $.each
// }


// function processChildren(visibility_type){
//   // var visibility_type = localStorage.getItem('visibility_type')
//   cc('processChildren('+visibility_type+')','done')
//   var level = 'processChildren';

//   var itemdata_count = 0;
//   var visible_category_children = [];
//   var visible_category_children_data = [];
//   var item_data_from_array = category_children;

//   // Visibility Type Processing
//   if (visibility_type == 'course') {
//     visibility_type = 'visible';
//   };
//   var switch_label = 'Show';
//   var count_id = '#'+visibility_type+'_count';
//   var table_id = '#'+visibility_type+'_categories';
//   if (visibility_type == 'visible') {
//     // visibility_type = 'course';
//     var switch_url = base_url +'lumiousreports/hiddencategories/';
//     var switch_label = 'Hide';
//   }else{
//     var switch_url = base_url +'lumiousreports/coursecategories/';
//   }
//   // end visibility 

//   jQuery.each(item_data_from_array, function(i, cdata) {
//     var result_count = getResponseSize(item_data_from_array);
//     cc('processChildren results COUNT returned: '+result_count,'fatal');
//     // Process all courses within the category
//     var d = item_data_from_array[0];
//     if (d != undefined) {
//       // Only use essential data
//       var keys = ['idnumber','descriptionformat','visible','visibleold','theme','programcount','certifcount','display','sortorder']
//       var filtered_data  = _.omit(cdata,keys);
//       visible_category_children_data.push(filtered_data);
//       // visible_category_children.push(this_item_ID_int);
//       displayCategoryResults(cdata,visibility_type,switch_url,switch_label,table_id,level);
//       buildSortedCategoryData(cdata,visibility_type,switch_url,switch_label,table_id,level);
//       // cc('CHILD: '+name+'('+this_item_ID+') depth('+depth+') path('+path+') parent_ID('+parent_ID+') Parent: '+parent_details.name+'('+parent_details.id+')', 'success' );
//     }
//     else{
//       cc('There was an error getting data. It seems that the endpoint does not return data.','error');
//     }
//     itemdata_count++;
//     if (itemdata_count == result_count) {
//       cc('All processchildren complete. visible_category_children_data: ','success');
//       console.log(visible_category_children_data);
//       localStorage.removeItem('children');
//       setLocalStorage(visible_category_children_data,'children');
//       // processGrandchildren(visibility_type);
//     };
//   }); // end $.each
// }

// function processGrandchildren(visibility_type){
//   cc('processGrandchildren('+visibility_type+')','done')
//   var itemdata_count = 0;
//   var visible_category_grandchildren = [];
//   var visible_category_grandchildren_data = [];

//   var item_data_from_array = category_grandchildren;
//   jQuery.each(item_data_from_array, function(i, cdata) {
//     var result_count = getResponseSize(item_data_from_array);
//     // cc('results COUNT returned: '+result_count,'highlight');
//     // Process all courses within the category
//     var d = item_data_from_array[0];
//     if (d != undefined) {
//       // Get data from JSON
//       var name         = cdata['name'];
//       var depth        = cdata['depth'];
//       var path         = cdata['path'];
//       var this_item_ID = cdata['id'];
//       var this_item_ID_int = parseInt(this_item_ID);
//       visible_category_grandchildren.push(this_item_ID_int);
//       var keys = ['idnumber','descriptionformat','visible','visibleold','theme','programcount','certifcount','display','sortorder']
//       var filtered_data  = _.omit(cdata,keys);
//       visible_category_grandchildren_data.push(filtered_data);
//       cc('GRANDCHILD: '+name+'('+this_item_ID+') depth('+depth+') path('+path+')', 'success' );
//       // cc(cdata, 'warning');
//       // Push to display table
//     }
//     else{
//       cc('There was an error getting data. It seems that the endpoint does not return data.','error');
//     }
//     itemdata_count++;
//     if (itemdata_count == result_count) {
//       cc('All processgrandchildren complete. visible_category_grandchildren_data: ','success');
//       console.log(visible_category_grandchildren_data);
//       localStorage.removeItem('grandchildren');
//       setLocalStorage(visible_category_grandchildren_data,'grandchildren');
//     };
//   }); // end $.each
// }

// function updateGrandparents(){
//   var itemdata_count = 0;
//   var item_data_from_array = category_parents;
//   jQuery.each(category_grandparents, function(i, itemdata) {
//     // Process all courses within the category
//     var d = item_data_from_array[0];
//     if (d != undefined) {
//       // Get data from JSON
//       var this_item_ID = itemdata['id'];
//       var name         = itemdata['name'];
//       var depth        = itemdata['depth'];
//       var path         = itemdata['path'];
//       cc('GRANDPARENT: '+name+'('+this_item_ID+') depth('+depth+')', 'success' );
//       cc(itemdata, 'warning');
//       // Push to display table
//     }
//     else{
//       cc('There was an error getting data. It seems that the endpoint does not return data.','error');
//     }
//     itemdata_count++;
//   }); // end $.each
// }

function nestleCategories (all_nested_category_data,level) {
  cc('nestleCategories','run');
  cc('all_nested_category_data','info');
  console.log(all_nested_category_data);
  var visibility_type = 'visible',
      show_url = base_url +'lumiousreports/coursecategories/',
      hide_url = base_url +'lumiousreports/hiddencategories/',
      switch_label = 'Hide',
      table_id = '#visible_categories';
      breadcrumb = null;

  var itemdata_count = 0;
  var result_count = 0;
  // var category_count = 5;
  var category_parent_count = level;
  if (level != 0) {
    var category_parent_count = level - 1;
    // var category_up_2 = category_parent_count - 1;  
  };
  
  var item_data_from_array = all_nested_category_data[level];
  cc('item_data_from_array['+level+']','fatal');
  console.log(item_data_from_array);
  
  var result_count = getResponseSize(item_data_from_array);

  jQuery.each(item_data_from_array, function(i, cdata) {
    // Process all courses within the category
    var d = item_data_from_array[0];
    if (d != undefined) {
      console.log(d);
      // Store core data
      if (level != 0) {
        var parent_ID = cdata["parent"];
        var parent_data = all_nested_category_data[category_parent_count];
        var parent_details = findItemByID(parent_data,parent_ID,'parent_ID',true);
        // var levelup_data = {"levelupname" : parent_details.name, "levelupid" : parent_details.id, "levelcoursecount" : parent_details.coursecount }
        if (!isItemNullorUndefined(parent_details)) {
          cc('Category Name: '+cdata["name"]+' ID:'+cdata["id"]+' Depth:'+cdata["depth"]+ ' cdata["parent"]:'+cdata["parent"]+ ' Parent Name:'+parent_details.name+'('+parent_details.id+')','info');
          // var table_data = '<tr><td>'+cdata["id"]+'</td><td><h5>'+parent_details.name+'<small>('+parent_details.id+')</small> > '+cdata["name"]+'<small>('+cdata["id"]+')</small></h5></td><td><span class="hidden">timehere</span></strong>date</td><td>' +cdata["depth"]+ '</td><td>' +cdata["path"] +'</td><td><strong><a class="popup_link" href="'+cdata["id"]+'" target="blank">switch</a></strong></tr>';
          // $(table_id).append(table_data);
          // var breadcrumb = parent_details.name+'('+parent_details.id+' > ' +cdata["name"]+'('+cdata["id"]+') Depth:'+cdata["depth"];
          var item = [];
          var coursecount         = cdata['coursecount'];
          var name         = cdata['name'];
          var description         = cdata['description'];
          var depth        = cdata['depth'];
          var path         = cdata['path'];
          var timemodified = cdata['timemodified'];
          var this_item_ID = cdata['id'];
          var this_item_ID_int = parseInt(this_item_ID);
          var readable_date = dateMoment(timemodified);
          var hide_url = hide_url + this_item_ID;
          var show_url = show_url + this_item_ID;
          // Push to display table
          var levelup_name = parent_details.name;
          var levelup_id = parent_details.id;
          var this_courses = [];
          if (coursecount != 0) {
            this_courses = getCourseDetails(this_item_ID_int);
          };
          var item = {
              "id": this_item_ID,
              "coursecount": coursecount,
              "courses": this_courses,
              "this_item_ID_int": this_item_ID_int,
              "name": name,
              "description": description,
              "depth": depth,
              "path": path,
              "levelup_name": levelup_name,
              "levelup_id": levelup_id,
              "timemodified": timemodified,
              "readable_date": readable_date,
              "hide_url": hide_url,
              "show_url": show_url
          }
          // var item_object = dataType(item,'object')
          all_category_data.push(item);
          cc('sorted_category_data','highlight')
          sorted_category_data = _.sortBy(all_category_data, 'path');
        };
      }else{
        cc('Category Name: '+cdata["name"]+' ID:'+cdata["id"]+' Depth:'+cdata["depth"],'info');
        // var table_data = '<tr><td>'+cdata["id"]+'</td><td><h5>'+cdata["name"]+'<small>('+cdata["id"]+')</small></h5></td><td><span class="hidden">timehere</span></strong>date</td><td>' +cdata["depth"]+ '</td><td>' +cdata["path"] +'</td><td><strong><a class="popup_link" href="'+cdata["id"]+'" target="blank">switch</a></strong></tr>';
        // $(table_id).append(table_data);
        var item = [];
          var coursecount  = cdata['coursecount'];
          var name         = cdata['name'];
          var description  = cdata['description'];
          var depth        = cdata['depth'];
          var path         = cdata['path'];
          var timemodified = cdata['timemodified'];
          var this_item_ID = cdata['id'];
          var this_item_ID_int = parseInt(this_item_ID);
          var readable_date = dateMoment(timemodified);
          var hide_url = hide_url + this_item_ID;
          var show_url = show_url + this_item_ID;
          var this_courses = [];
          if (coursecount != 0) {
            this_courses = getCourseDetails(this_item_ID_int);
          };
          // Push to display table
          var item = {
              "id": this_item_ID,
              "this_item_ID_int": this_item_ID_int,
              "name": name,
              "coursecount": coursecount,
              "courses": this_courses,
              "description": description,
              "depth": depth,
              "path": path,
              "timemodified": timemodified,
              "readable_date": readable_date,
              "hide_url": hide_url,
              "show_url": show_url
          }
          // var item_object = dataType(item,'object')
          all_category_data.push(item);
          cc('sorted_category_data','highlight')
          sorted_category_data = _.sortBy(all_category_data, 'path');
      }
    }
    else{
      cc('There was an error getting data. It seems that the endpoint does not return data.','error');
    }
    itemdata_count++;
    if (itemdata_count == result_count) {
      cc('All processing of complete for loop['+level+']','success');
    };
  }); // end $.each
}
var all_course_data = [];

function getCourseDetails(id){  
  cc('getCourseDetails('+id+')','run');
  var itemdata_count = 0;
  var item = [];
  var all_course_data = [];
  var item_url = base_url +'lumiousreports/course/'+id;
  // Populate and extract data
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var result_count = getResponseSize(itemdata,'JSON');
    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var courseid       = cdata['id'];
        var fullname       = cdata['fullname'];
        var shortname       = cdata['shortname'];
        var startdate       = cdata['startdate'];
        var item = {
              "id": courseid,
              "fullname": fullname,
              "startdate": startdate
          }
          // var item_object = dataType(item,'object')
        all_course_data.push(item);
        itemdata_count++;
        if (itemdata_count == result_count) {
          cc('getCourseDetails done('+id+'). Total courses = '+itemdata_count,'success');
          console.log(all_course_data);
          return all_course_data;
        };
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
    }); // end $.each
  }); // end $.when
}
var all_category_data = [];
var sorted_category_data = [];

function displaySortedCategoryResults(sorted_category_data){
  cc('displaySortedCategoryResults','run');
  var table_id = '#visible_categories';
  var itemdata_count = 0;
  var result_count = 0;
  var hide_url = base_url +'lumiousreports/hiddencategories/';
  var visible_category_grandparents_data = [];
  var item_data_from_array = sorted_category_data;
  var result_count = getResponseSize(item_data_from_array);
  cc('Total '+result_count,'highlight');
  jQuery.each(item_data_from_array, function(i, cdata) {
    // Process all courses within the category
    var d = item_data_from_array[0];
    if (d != undefined) {
      // Store core data
      //push to table
      var indent_depth = cdata["depth"];
      var indent_depth_int = parseInt(indent_depth);
      var indent = "<span class='indent indent_"+indent_depth+"'></span>";
      switch(indent_depth_int){
        case 1:
          var indent = "";
          break;
        case 2:
          var indent = "<span class='indent'></span>";
          break;
        case 3:
          var indent = "<span class='indent'></span><span class='indent'></span>";
          break;
        case 4:
          var indent = "<span class='indent'></span><span class='indent'></span><span class='indent'></span>";
          break;
        case 5:
          var indent = "<span class='indent'></span><span class='indent'></span><span class='indent'></span><span class='indent'></span>";
          break;
        case 6:
          var indent = "<span class='indent'></span><span class='indent'></span><span class='indent'></span><span class='indent'></span><span class='indent'></span>";
          break;
      }
      var description_details = '';
      if (!isItemNullorUndefined(cdata["description"]) && cdata["description"] != "") {
        var description_details = '<small>'+cdata["description"]+'</small>';  
      };

      // var report_url = window.location.pathname + window.location.search;
      var report_url = window.location.pathname;
      var apiKey_localstorage = localStorage.getItem('apiKey');
      
      report_url = report_url + '?apiKey='+apiKey_localstorage+'&page=teacher-reports&current_cat='+cdata["id"];
      var name_string = cdata["name"];
      var safe_name = name_string.replace(/ /g,'-');
      var safe_report_url = report_url + '&cat_name='+safe_name;

      var table_data = '<tr><td>'+cdata["id"]+'</td><td><h5>'+indent+' '+cdata["name"]+' <small>(ID:'+cdata["id"]+')</small></h5>'+description_details+'</td><td><span class="hidden">'+cdata["timemodified"]+'</span></strong>'+cdata["readable_date"]+'</td><td>' +cdata["coursecount"]+ '</td><td>' +cdata["depth"]+ '</td><td class="hidden">' +cdata["path"] +'</td><td><strong><a class="popup_link" href="'+safe_report_url+'" target="blank">Reports</a> <a class="popup_link" href="'+hide_url+cdata["id"]+'" target="blank">Hide</a></tr>';
      $(table_id).append(table_data);
    }
    else{
      cc('There was an error getting data. It seems that the endpoint does not return data.','error');
    }
    itemdata_count++;

    if (itemdata_count == result_count) {
      cc('All processing of displaySortedCategoryResults complete.','success');
    };
  }); // end $.each
}

var all_courses_in_category_ids = [];

function getAllCoursesInCategory(id){
  cc('getAllCoursesInCategory','run')
  // alert('running getAllStudentsInCategory('+id+')')
  var table_id = '#concatenated-results';
  var itemdata_count = 0;
  var result_count = 0;
  var item_url = base_url +'lumiousreports/course/'+id;

  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var result_count = getResponseSize(itemdata,'JSON');

    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var course_id = cdata["id"];
        all_courses_in_category_ids.push(course_id);
        cc('COURSE DETAILS: id('+course_id+')','info');
        getAllStudentsInCourse(course_id);
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;

      if (itemdata_count == result_count) {
        cc('All processing of getAllCoursesInCategory complete.','success');
        console.log(all_courses_in_category_ids);
      };
    }); // end $.each
  }); // end $.when
}

function getAllStudentsInCourse(id){
  cc('getAllStudentsInCourse','run')

  // alert('running getAllStudentsInCategory('+id+')')
  var table_id = '#concatenated-results';
  $(table_id).show();
  var itemdata_count = 0;
  var result_count = 0;
  var item_url = base_url +'lumiousreports/students/'+id;

  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var result_count = getResponseSize(itemdata,'JSON');

    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        // Store core data
        //push to table
        var student_id = cdata["id"];
        var student_username = cdata["username"];
        cc('STUDENT DETAILS: id('+student_id+') username('+student_username+')','info');
        // var report_url = window.location.pathname + window.location.search;

        // var table_data = '<tr><td>'+cdata["id"]+'</td><td><h5>'+indent+' '+cdata["name"]+' <small>(ID:'+cdata["id"]+')</small></h5>'+description_details+'</td><td><span class="hidden">'+cdata["timemodified"]+'</span></strong>'+cdata["readable_date"]+'</td><td>' +cdata["coursecount"]+ '</td><td>' +cdata["depth"]+ '</td><td class="hidden">' +cdata["path"] +'</td><td><strong><a class="popup_link" href="'+safe_report_url+'" target="blank">Reports</a> <a class="popup_link" href="'+hide_url+cdata["id"]+'" target="blank">Hide</a></tr>';
        
        // $(table_id).append(table_data);
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;

      if (itemdata_count == result_count) {
        cc('All processing of getAllStudentsInCategory complete.','success');
      };
    }); // end $.each
  }); // end $.when
}

function displayCategoryResults(cdata,visibility_type,switch_url,switch_label,table_id,level,breadcrumb){
  cc('displayCategoryResults','run');
  
  // if (level == undefined) {
  //   level = 0;
  // };
  var name         = cdata['name'];
  var depth        = cdata['depth'];
  var path         = cdata['path'];
  var timemodified = cdata['timemodified'];
  var this_item_ID = cdata['id'];
  var this_item_ID_int = parseInt(this_item_ID);
  var readable_date = dateMoment(timemodified);
  // var hide_this_item_ID = switch_url + this_item_ID;
  // var show_this_item_ID = switch_url + this_item_ID;
  // Get parent details
  // Push to display table
  var levelup_name = 'All > '+parent_details.name;
  var table_data = '<tr><td>'+this_item_ID+'</td><td><h5>'+levelup_name+'<small>('+parent_details.id+')</small> > '+name+ '</h5></td><td><span class="hidden">'+timemodified+'</span></strong> ' +readable_date+ '</td><td>' +depth+ '</td><td>' +path +'</td><td><strong><a class="popup_link" href="'+hide_this_item_ID+'" target="blank">'+switch_label+'</a></strong></tr>';
  $(table_id).append(table_data);
}


