// gr.js non-minified




function findAreaByID(data,item_ID,item_TYPE,disable_console_log){
  cc('findItemByID(data,'+item_ID+','+item_TYPE+') disable_console_log('+disable_console_log+')','run',false);
  console.log('findItemByID - below is the value of the incoming data:');
  console.log(data);
  cc('is data NULL?','info');
  isItemNullorUndefined(data,true);
  cc('is item NULL?','info');
  isItemNullorUndefined(item_ID,true);
  // ----- TEST TO ENSURE DATA IS WORKING ------ // 
  // var y = data[0];
  // console.log(y);
  // cc('data[0] ID = '+y.id,'success');
  // cc('data[0] fullname = '+y.fullname,'success');
  // ------------------------------------------ //

  var found = false;
  
  if (item_TYPE == 'metroArea' || item_TYPE == 'metroAreas') {
    console.log('checking metroAreas...');
    for(var i = 0; i < data.length; i++) {
      cc('iterating through data COUNT = '+i, 'info',disable_console_log);
      cc('data.length = '+data.length, 'info',disable_console_log);
      cc('node = data['+i+']:','info',disable_console_log);
      console.log(data[i]);
      if (data[i] != null && data[i] != undefined) {
          if (data[i].id == item_ID) {
              found = true;
              cc('ID MATCHED!!!: '+found, 'success');
              cc('Details: ID('+data[i].id+') Name('+data[i].name+')', 'success',disable_console_log);
              return found;
              // return { // return dataay of data including labels for access
              //     id: data[i].id,
              //     category: data[i].category,
              //     fullname: data[i].fullname,
              //     shortname: data[i].shortname,
              //     startdate: data[i].startdate
              // };
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


/*******************************************************/
/**************  Dashboard Functions  *************/
/*******************************************************/

// UX Functions Dependent on Doc Ready State

$(document).ready(function() {
  // $("#getAllVisibleCategories").click(function() {
  //   getAllVisibleCategories();
  // });

  // if (urlParams['page'] == 'teacher-reports'){
  //   if (urlParams['student_id'] != undefined) {
  //     var studentid = urlParams['student_id'];
  //     // var catid = 41;
  //     getStudentActivity(studentid);
  //   }else if (urlParams['current_cat'] != undefined) {
  //     var catid = urlParams['current_cat'];
  //     // var catid = 41;
  //     getAllCoursesInCategory(catid);
  //     // getAllStudentsInCourse(catid);
  //   }else{
  //     cc('No current_cat found in URL','warning');
  //   }
  // }
}); // end Doc Ready 




/*****************************************************************************/
/************************* COURSES WITH STUDENTS *****************************/
/*****************************************************************************/


// function new_dashboard(){
//   cc('new_dashboard','run')
//   var item_TYPE = 'students';
//   for(var i = 0; i <= max_val; i++) {
//     var item_ID = i;
//     // get all courses in each category
//     count_students(item_ID,item_TYPE);
//   }
// }  

/*****************************************************************************/
/************* PROCESSING COURSE DATA with CACHING **************************/
/*****************************************************************************/
  
//////////// START CUSTOM gr.js

/*

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
  
  // var session_item_data_array = getStoredSessionData(data_name);
  var session_item_data_array = localStorage.getItem(data_name);
  cc('session_item_data_array('+data_name+') is: ','info');
  console.log(session_item_data_array);

  if (isItemNullorUndefined(session_item_data_array,true)) {
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




// var item_ACTION = null;
var action_count = 0;
// Given a data object process the data, add the data to a localStorage object for future use, do something with the data

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

function displayCategoryResults(cdata,visibility_type,switch_url,switch_label,table_id,level,breadcrumb){
  cc('displayCategoryResults','run');
  
  var name         = cdata['name'];
  var depth        = cdata['depth'];
  var path         = cdata['path'];
  var timemodified = cdata['timemodified'];
  var this_item_ID = cdata['id'];
  var this_item_ID_int = parseInt(this_item_ID);
  var readable_date = dateMoment(timemodified);
  // Get parent details
  // Push to display table
  var levelup_name = 'All > '+parent_details.name;
  var table_data = '<tr><td>'+this_item_ID+'</td><td><h5>'+levelup_name+'<small>('+parent_details.id+')</small> > '+name+ '</h5></td><td><span class="hidden">'+timemodified+'</span></strong> ' +readable_date+ '</td><td>' +depth+ '</td><td>' +path +'</td><td><strong><a class="popup_link" href="'+hide_this_item_ID+'" target="blank">'+switch_label+'</a></strong></tr>';
  $(table_id).append(table_data);
}

var all_student_ids_in_course = [];

function getAllStudentsInCourse(course_id,course_name,action){
  cc('getAllStudentsInCourse','run')
  var table_id = '#category-students tbody';
  $(table_id).show();
  var itemdata_count = 0;
  var result_count = 0;
  var item_url = base_url +'lumiousreports/students/'+course_id;
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);

  $.when(itemdata).done(function(item_data_from_array) {
    var result_count = getResponseSize(itemdata,'JSON');
    jQuery.each(item_data_from_array, function(i, cdata) {
      // Process all courses within the category
      var d = item_data_from_array[0];
      if (d != undefined) {
        var student_id = cdata["id"];
        all_student_ids_in_course.push(student_id)
      }
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;
      if (itemdata_count == result_count) {
        cc('All processing of getAllStudentsInCourse complete.','success');
        cc('Here are all the unique IDs of students in this course','info')
        var uniq_student_ids = _.uniq(all_student_ids_in_course);
        console.log(uniq_student_ids);
        courseStudentData(uniq_student_ids,table_id,course_id,course_name)
      };
    }); // end $.each
  }); // end $.when
}

$('#query-filterstatus select').on('change', function() {
    cc('query-filterstatus changed','info');
    var _query = $(this).val();
    filterStatus(_query);
});

function filterStatus(status){
    cc('filterStatus','run');
   switch(status) {
            case 'active':
                $('#category-students tbody tr td span').closest( "tr" ).hide();  
                $('#category-students tbody tr td span.success').closest( "tr" ).show();  
                $('#category-students tbody tr td span.info').closest( "tr" ).show();
                break;
            case 'stalled':
                $('#category-students tbody tr td span').closest( "tr" ).hide();
                $('#category-students tbody tr td span.danger').closest( "tr" ).show();
                $('#category-students tbody tr td span.warning').closest( "tr" ).show();
                break;
            case 'all':
                $('#category-students tbody tr').show();
        }
}

*/
////////// END NEW CUSTOM gr.js


/* 

Songkick API
key: oWvI2DgEJwiD1kd1
Search Endpoint:
http://api.songkick.com/api/3.0/search/artists.json?query={search_query}&apikey={your_api_key}
Example: 
http://api.songkick.com/api/3.0/search/artists.json?query=the%20falls&apikey=oWvI2DgEJwiD1kd1

*/
var sk_api_key = 'oWvI2DgEJwiD1kd1';


// BiT API
// key: GIGROOM_BIT
// http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=GIGROOM_BIT
var bit_api_key = 'GIGROOM_BIT';

// EN API
// http://developer.echonest.com/api/v4/artist/profile?api_key=LPFVZKF9VAJEM1QMT&id=ARZ6IGY1187B98EB94&format=json&bucket=biographies&bucket=blogs&bucket=familiarity&bucket=hotttnesss&bucket=images&bucket=news&bucket=reviews&bucket=terms&bucket=urls&bucket=video&bucket=id:musicbrainz
var en_api_key = 'LPFVZKF9VAJEM1QMT';

// Spotify API
// https://developer.spotify.com/web-api/console/get-search-item/#complete
// http://developer.echonest.com/api/v4/artist/profile?api_key=LPFVZKF9VAJEM1QMT&id=ARZ6IGY1187B98EB94&format=json&bucket=biographies&bucket=blogs&bucket=familiarity&bucket=hotttnesss&bucket=images&bucket=news&bucket=reviews&bucket=terms&bucket=urls&bucket=video&bucket=id:musicbrainz
var sp_api_client_id = 'a5240bdecaed47d9af61c32a7f10c54f';
var sp_api_client_secret = '7b995b01d';

// https://api.spotify.com/v1/search?q=%22daughter%22&type=artist

// MB API




$(document).ready(function() {
  // Set Input to previous search by Default


  var artist_name_storage = localStorage.getItem('search_name');
  if (!isItemNullorUndefined(artist_name_storage)) {
    $( "#who_to_host input:first" ).attr("placeholder", artist_name_storage);
    $( "#who_to_host input:first" ).val(artist_name_storage);
  };
  var location_search_name = localStorage.getItem('location_search_name');
  if (!isItemNullorUndefined(location_search_name)) {
    $( "#where_to_host" ).attr("placeholder", location_search_name);
    $( "#where_to_host" ).val(location_search_name);
  };

  $( "#location_search_trigger" ).click(function() {
    var location_name = $( "#where_to_host" ).val();
    var table_id = '#location_search_results table tbody';
    $(table_id).html('');
    // var artist_name = 'Falls';
    // getENArtistDetails(artist_name);
    // getBITArtistDetails(artist_name);
    localStorage.setItem('location_search_name',location_name);
    localStorage.setItem('location_results_page',1);
    localStorage.setItem('location_result_counter',0);
    getSKMetroAreas(location_name);
    // getSKArtistDetails(artist_name);
    // $( "#who_to_host" ).submit();
  });

  $( "#search_songkick_trigger" ).click(function() {
    var artist_name = $( "#search_songkick" ).val();
    getSKArtistDetails(artist_name);
  });

  $( "#search_trigger" ).click(function() {
    var artist_name = $( "#who_to_host input:first" ).val();
    var table_id = '#search_results table tbody';
    $(table_id).html('');
    // var artist_name = 'Falls';
    // getENArtistDetails(artist_name);
    // getBITArtistDetails(artist_name);
    localStorage.setItem('search_name',artist_name);
    localStorage.setItem('results_page',1);
    localStorage.setItem('result_counter',0);
    getSPArtistSearch(artist_name,'display_results');
    // getSKArtistDetails(artist_name);
    // $( "#who_to_host" ).submit();
  });
  $( "#get_more_results" ).click(function() {
    var artist_name = localStorage.getItem('search_name');
    var results_page = localStorage.getItem('results_page');
    results_page = parseInt(results_page);
    results_page++;
    localStorage.setItem('results_page',results_page);

    // var artist_name = 'Falls';
    // getENArtistDetails(artist_name);
    // getBITArtistDetails(artist_name);
    
    getSKArtistDetails(artist_name,results_page);
    // $( "#who_to_host" ).submit();
  });

  var construct_artist = urlParams["profile"]
  if (!isItemNullorUndefined(construct_artist)) {
    var artist_name = construct_artist;

    localStorage.setItem('search_name',artist_name);
    localStorage.setItem('results_page',1);
    localStorage.setItem('result_counter',0);
    getENArtistDetails(artist_name);
  };

  var sid = urlParams["sid"]
  if (!isItemNullorUndefined(sid)) {
    getSPArtistProfile(sid);
  };

  var metroarea_id = urlParams["metroarea_id"]
  if (!isItemNullorUndefined(metroarea_id)) {
    getSKMetroEvents(metroarea_id);
  };

  $( "a.name" ).click(function() {
    var artist_name = $(this).text();
    alert(artist_name);
    var results_page = localStorage.setItem('results_page',1);
    
    getENArtistDetails(artist_name,results_page);
    // $( "#who_to_host" ).submit();
  });
}); // end Doc Ready 

var all_location_results = [];
var all_metroevent_results = [];
var current_result_row = 0;



function getSKMetroAreas(location_name,results_page){
  // Reset location results array
  all_location_results = [];

  if (isItemNullorUndefined(results_page,true)) {
    var results_page = 1;
  }
  if (isItemNullorUndefined(location_name,true)) {
    if (isItemNullorUndefined(location_name)) {
      alert('Please enter a location name to search.')
    };
  };
  cc('getSKMetroAreas('+location_name+') results_page('+results_page+')','run')
  // Construct Query URL
  // http://api.songkick.com/api/3.0/search/locations.json?query={search_query}&apikey={your_api_key}
  var base_url = 'http://api.songkick.com/api/3.0/';  
  var location_query_name = encodeURI(location_name);;
  // var location_query_name = safeName(location_name);
  cc('Seaching for '+location_query_name, 'info');
  
  var table_id = '#location_search_results table tbody',
      itemdata_count = 0,
      result_count = 0,
      item = [],
      artist_current_activity = null,
      artist_prev_activity = null,
      table_data = 'start';
  $(table_id).show();
  $(table_id).html('');

  var item_url = base_url +'search/locations.json?query='+location_query_name + '&apikey='+sk_api_key +'&jsoncallback=?&page='+results_page;
  cc('SK search URL:'+item_url,'done')
  var itemdata = $.getJSON(item_url);
  var item_data_from_array = [];

  $.when(itemdata).done(function(item_data_from_array) {
    cc('item_data_from_array','info')
    // console.log(item_data_from_array);
    
    var results = item_data_from_array["resultsPage"];

    var total_result_entries = results["totalEntries"];
    total_result_entries = parseInt(total_result_entries);
    cc('total_result_entries: '+total_result_entries,'info');
    var results_counter = '#location_results_counter';
    $(results_counter).show();
    $(results_counter+ ' span').html(total_result_entries);

    if (total_result_entries > 0) {
      results = results["results"];
      results = results["location"];

      var result_count = getResponseSize(results);
      cc('results count: '+result_count,'highlight')

      jQuery.each(results, function(i, cdata) {     
        if (results != undefined) {
          var metroArea = cdata["metroArea"]
          var this_item_ID  = metroArea['id'];
          var name          = metroArea['displayName'];
          var lat   = metroArea['lat'];
          var lng   = metroArea['lng'];
          var lat_lng = lat+','+lng;
          var country        = metroArea['country'];
          country        = country['displayName'];

          cc('SK Location RESULT: '+this_item_ID+ ' '+name +' country: '+country,'success');
          current_result_row++;
          var item = {
              "id": this_item_ID,
              "name": name,
              "country": country,
              "lat_lng": lat_lng
          }
          // all_location_results.push(item);
          // var duplicate_found = _.isMatch(all_location_results, item);
          // cc('Duplicate found? '+duplicate_found,'highlight');
          
          var duplicate_location = findAreaByID(all_location_results,this_item_ID,'metroArea',false)
          if (!duplicate_location) {
            all_location_results.push(item);
            cc('all_location_results','info');
            console.log(all_location_results);  
          }else{
            cc('Duplicate found - do not add this location','info');
          }
          
        }// end if results undefined
        else{
          cc('There was an error getting data. It seems that the endpoint does not return data.','error');
        }
        itemdata_count++;

        if (itemdata_count == result_count) {
          cc('All processing of getSKMetroAreas complete.','success');
          displaySKMetroAreas(all_location_results);
        };
      }); // end $.each
    };// end total_result_entries > 0
  }); // end $.when                                                  
} // end getSKMetroAreas

function displaySKMetroAreas(results){
  var table_id = '#location_search_results table tbody',
      itemdata_count = 1,
      result_count = 1,
      item = [];
  $(table_id).empty();
  var result_count = getResponseSize(results);
  cc('results count: '+result_count,'highlight')

  jQuery.each(results, function(i, cdata) {
    if (results != undefined) { 
      var this_item_ID  = cdata['id'];
      var name          = cdata['name'];
      var lat_lng       = cdata['lat_lng'];
      var country       = cdata['country'];
      // var link = window.location.href+'?&profile='+link_name;
      var link = 'http://localhost:8000/dashboard.html?metroarea_id='+this_item_ID;
      var table_data = '<tr><td>'+itemdata_count+'</td><td>'+this_item_ID+'</td><td>'+country+'</td><td class="name">'+name+'</td><td>'+lat_lng+'</td><td><a href="'+link+'" class="name"><strong>GO</strong></a></td></tr>';
      $('#metroAreas tbody').append(table_data); 
    }// end if results undefined
    else{
      cc('There was an error getting data. It seems that the funciton does not recieve data.','error');
    }
    itemdata_count++;
    if (itemdata_count == result_count) {
      cc('All processing of displaySKMetroAreas complete.','success');
    };
  }); // end $.each
}


function getSKMetroEvents(metroarea_id,results_page){
  // Reset location results array
  all_metroevent_results = [];

  if (isItemNullorUndefined(results_page,true)) {
    var results_page = 1;
  }
  if (isItemNullorUndefined(metroarea_id,true)) {
    if (isItemNullorUndefined(metroarea_id)) {
      alert('No metro id found. Use the search box to find an area.')
    };
  };
  cc('getSKMetroEvents('+metroarea_id+') results_page('+results_page+')','run')
  // Construct Query URL
  // http://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={your_api_key}
  var base_url = 'http://api.songkick.com/api/3.0/';  
  // var metroarea_id = encodeURI(metroarea_id);;
  // var location_query_name = safeName(location_name);
  cc('Seaching for '+metroarea_id, 'info');
  
  var table_id = '#metroevents_search_results table tbody',
      itemdata_count = 0,
      result_count = 0,
      item = [],
      performance  = null,
      artist = null,
      artist_name = null,
      location = null,
      city = null,
      lat = null,
      lng = null,
      lat_lng = null,
      date = null,
      thumb_url = '';
      
  $(table_id).show();
  $(table_id).empty();

  var item_url = base_url +'metro_areas/'+metroarea_id + '/calendar.json?apikey='+sk_api_key +'&jsoncallback=?&page='+results_page;
  cc('SK metroarea search URL:'+item_url,'done')
  var itemdata = $.getJSON(item_url);
  var item_data_from_array = [];

  $.when(itemdata).done(function(item_data_from_array) {
    cc('item_data_from_array','info')
    console.log(item_data_from_array);
    
    var results = item_data_from_array["resultsPage"];
    var total_result_entries = results["totalEntries"];
    total_result_entries = parseInt(total_result_entries);
    cc('total_result_entries: '+total_result_entries,'info');
    var results_counter = '#location_results_counter';
    $(results_counter).show();
    $(results_counter+ ' span').html(total_result_entries);

    if (total_result_entries > 0) {
      results = results["results"];
      results = results["event"];

      var result_count = getResponseSize(results);
      cc('results count: '+result_count,'highlight')

      jQuery.each(results, function(i, cdata) {     
        if (results != undefined) {
          // var metroArea = cdata["metroArea"]
          var this_item_ID  = cdata['id'];
          var name          = cdata['displayName'];

          var performance   = cdata['performance'];
              performance   = performance[0];
              if (!isItemNullorUndefined(performance)) {
                artist =  performance["artist"];
                artist_name = artist["displayName"];
              };
          
          var location   = cdata['location'];
          var city =  location["city"];
          var lat = location["lat"];
          var lng = location["lng"];
          var lat_lng = lat+','+lng;
          var date   = cdata['start'];
            date =  date["date"];

          // only present Artists that are touring areas in 3 or more weeks to allow time to book. 
          var gig_date_timestamp = moment(date).format("X");
          var gig_date_test = moment().add(21, 'days');
          var gig_cuttoffdate = moment(gig_date_test).format("X");
          var gig_cuttoffdate_timestamp = moment(gig_cuttoffdate).format("X");

          var dif = parseInt(gig_date_timestamp) - parseInt(gig_cuttoffdate);
          var days_after_cuttoff = parseInt(dif/60/60/24);

          var gig_date_label = moment(date).fromNow();

          // cc('gig_date_timestamp: '+parseInt(gig_date_timestamp)+' gig_cuttoffdate: '+parseInt(gig_cuttoffdate) + ' dif = '+dif,'success');
          if (days_after_cuttoff > 0) {
            cc(gig_cuttoffdate+'(gig_date_timestamp: '+gig_date_timestamp+' days_after_cuttoff: '+days_after_cuttoff+') SK EVENT RESULT: '+this_item_ID+ ' '+city+ ' artist:'+artist_name+ ' on '+date+ ' which is '+gig_date_label ,'success');
            current_result_row++;
            // get SP thumb
            var item = {
                "id": this_item_ID,
                "artist_displayName": artist_name,
                "date": date,
                "city": city,
                "lat_lng": lat_lng
            }
            all_metroevent_results.push(item);
          };
           
        }// end if results undefined
        else{
          cc('There was an error getting data. It seems that the endpoint does not return data.','error');
        }
        itemdata_count++;

        if (itemdata_count == result_count) {
          cc('All processing of getSKMetroAreas complete.','success');
          cc('all_metroevent_results','info');
          console.log(all_metroevent_results);
          // getSPArtistDetails(all_metroevent_results);
          addSPArtistInfo(all_metroevent_results);
          // displaySKMetroAreaEvents(all_metroevent_results);
        };
      }); // end $.each
    };// end total_result_entries > 0
  }); // end $.when                                                  
} // end getSKMetroAreas




function getSPArtistDetails(results){
  var itemdata_count = 1,
      result_count = 1,
      item = [];
  
  var result_count = getResponseSize(results);

  jQuery.each(results, function(i, cdata) {
    if (results != undefined) { 
      // var this_item_ID  = cdata['id'];
      var name          = cdata['artist_displayName'];
      // send artist name to EN endpoint, get artist image
      var sp_thumb = getSPArtistSearch(name,'get_thumb');
      // should return a thumb URL
      cc('Thumb from SP: '+sp_thumb,'highlight');
      cdata["artist_thumb"] = sp_thumb;
      console.log(cdata);
    }// end if results undefined
    else{
      cc('There was an error getting data. It seems that the funciton does not recieve data.','error');
    }
    itemdata_count++;
    if (itemdata_count == result_count) {
      cc('All processing of displaySKMetroAreaEvents complete.','success');
    };
  }); // end $.each
}

function displaySKMetroAreaEvents(results){
  var table_id = '#metroevents_search_results table tbody',
      itemdata_count = 1,
      result_count = 1,
      item = [];
  $(table_id).empty();
  var result_count = getResponseSize(results);
  cc('results count: '+result_count,'highlight')

  jQuery.each(results, function(i, cdata) {
    if (results != undefined) { 
      var this_item_ID  = cdata['id'];
      var name          = cdata['artist_displayName'];
      var lat_lng       = cdata['lat_lng'];
      var city       = cdata['city'];
      var date       = cdata['date'];
      // send artist name to EN endpoint, get artist image
      var sp_thumb = cdata['thumb_url'];

      var link = 'http://localhost:8000/dashboard.html?metroarea_id='+this_item_ID;
      var table_data = '<tr><td>'+itemdata_count+'</td><td>'+this_item_ID+'</td><td>'+city+'</td><td class="name"><img src="'+sp_thumb+'" width="50" height="50"> '+name+'</td><td>'+date+'</td><td>'+lat_lng+'</td><td><a href="'+link+'" class="name"><strong>GO</strong></a></td></tr>';
      $('#metroArea_events tbody').append(table_data); 
    }// end if results undefined
    else{
      cc('There was an error getting data. It seems that the funciton does not recieve data.','error');
    }
    itemdata_count++;
    if (itemdata_count == result_count) {
      cc('All processing of displaySKMetroAreaEvents complete.','success');
      // addSPArtistInfo(results);
    };
  }); // end $.each
}


function addSPArtistInfo(results){
  var table_id = '#metroevents_search_results table tbody',
      itemdata_count = 0,
      result_count = 0,
      item = [];
  $(table_id).empty();
  var result_count = getResponseSize(results);
  cc('results count: '+result_count,'highlight')

  var artists = [];
  artists = results;
  var loop_count = 0;
  jQuery.each(results, function(i, cdata) { 

    var sp_base_url = 'https://api.spotify.com/v1/';

    var artist_name = cdata["artist_displayName"];
    var sp_artist_query_name = encodeURI(artist_name);
    var sp_item_url = sp_base_url + 'search?q="'+sp_artist_query_name +'"%20year:1990-2020&type=artist&client_id='+sp_api_client_id;
    var sp_item_data_from_array = [];
    var sp_itemdata = $.getJSON(sp_item_url);

    $.when(sp_itemdata).done(function(sp_item_data_from_array) {
      cc('FINDING Artist Thumb for: '+artist_name,'highlight')
      var sp_artist_details = sp_item_data_from_array;
      var sp_results = sp_artist_details["artists"];
      sp_results = sp_results["items"];

      jQuery.each(sp_results, function(i, cdata) {     
        if (sp_results != undefined) {
          var spotify_id    = cdata['id'];
          artists[loop_count].spotify_id = spotify_id;

          var images        = cdata['images'];
          if (images[0] != undefined) {
            var thumb_url = images[0].url;
            cc('thumb_url: '+thumb_url,'success');
            cc('artists['+loop_count+']','info');
            artists[loop_count].thumb_url = thumb_url;
          }else{
            cc('No thumb found','warning');
            var thumb_url = 'https://gigroom.com/apple-touch-icon-iphone4.png';
            cc('artists['+loop_count+']','warning');
            artists[loop_count].thumb_url = thumb_url;
          }// end if results undefined
          console.log(results[loop_count]);
          
          var this_item_ID  = results[loop_count].id;
          var name          = results[loop_count].artist_displayName;
          var lat_lng       = results[loop_count].lat_lng;
          var city       = results[loop_count].city;
          var date       = results[loop_count].date;
          // send artist name to EN endpoint, get artist image
          var sp_thumb = results[loop_count].thumb_url;
          var sid = results[loop_count].spotify_id;

          var link = 'http://localhost:8000/dashboard.html?sid='+sid;
          var table_data = '<tr><td>'+itemdata_count+'</td><td>'+this_item_ID+'</td><td>'+city+'</td><td class="name"><img src="'+sp_thumb+'" width="50" height="50"> '+name+'</td><td>'+date+'</td><td>'+lat_lng+'</td><td><a href="'+link+'" class="name"><strong>GO</strong></a></td></tr>';
          $('#metroArea_events tbody').append(table_data);
        }// end if results undefined
        else{
          cc('There was an error getting data. It seems that the endpoint does not return data.','error');
        }
        loop_count++;
      }); // end $.each
    }); // end $.when 

    itemdata_count++;
    if (itemdata_count == result_count) {
      cc('All processing of addSPArtistInfo complete.','success');
    }; 
  }); // end $.each
  
     
}







function getSKArtistDetails(artist_name,results_page){
  if (isItemNullorUndefined(artist_name,true)) {
    var artist_name = localStorage.getItem('artist_name');
    if (isItemNullorUndefined(artist_name)) {
      alert('Please enter an artist name to search.')
    };
  };
  cc('getSKArtistDetails('+artist_name+') results_page('+results_page+')','run')

  // Construct Query URL
  var base_url = 'http://api.songkick.com/api/3.0/';  
  var artist_query_name = artist_name
  cc('Seaching for '+artist_query_name, 'info');
  
  var table_id = '#songkick_search_results',
      itemdata_count = 0,
      result_count = 0,
      item = [];

  var item_url = base_url +'search/artists.json?query='+artist_query_name +'&apikey='+sk_api_key +'&jsoncallback=?&page='+results_page;
  cc('SK search URL:'+item_url,'done')
  var itemdata = $.getJSON(item_url);
  var item_data_from_array = [];

  $.when(itemdata).done(function(item_data_from_array) {
    cc('item_data_from_array','info')
    console.log(item_data_from_array);
    
    var results = item_data_from_array["resultsPage"];
    cc('results json','info');
    console.log(results);
    var total_result_entries = results["totalEntries"];
    total_result_entries = parseInt(total_result_entries);

    cc('total_result_entries: '+total_result_entries,'info');
    var results_counter = '#results_counter';
    $(results_counter).show();
    $(results_counter+ ' span').html(total_result_entries);

    if (total_result_entries > 0) {
      results = results["results"];
      results = results["artist"];

      var result_count = getResponseSize(results);
      cc('results count: '+result_count,'highlight')

      jQuery.each(results, function(i, cdata) {     
        if (results != undefined) {

          var this_item_ID  = cdata['id'];
          var name          = cdata['displayName'];
          // var eventsHref          = cdata['identifier'];
          //     eventsHref          = eventsHref[0];
          //     eventsHref          = eventsHref["eventsHref"];
          // ONLY show exact matches  
          if (name === artist_name) {       
            var onTourUntil   = cdata['onTourUntil'];
            if (onTourUntil == null) {
              onTourUntil = 'Not touring';
            }
            cc('SK RESULT: '+this_item_ID+ ' '+name,'success');
            var bit_base_url = 'http://api.bandsintown.com/artists/';
            var bit_artist_query_name = encodeURI(name);
           
            var bit_itemdata_count = 0;
                bit_result_count = 0,
                bit_item = [];

            var bit_item_url = bit_base_url +bit_artist_query_name + '?api_version=2.0&app_id='+bit_api_key +'&format=json&callback=?';
            // var item_url = 'http://api.bandsintown.com/artists/Lil%20Wayne?format=json&artist_id=fbid_6885814958&api_version=2.0&app_id=GIGROOM_BIT';
            cc('BIT search URL:'+bit_item_url,'done')
            var bit_item_data_from_array = [];
            var bit_itemdata = $.getJSON(bit_item_url);
            $.when(bit_itemdata).done(function(bit_item_data_from_array) {
              cc('SUCCESS from BIT','success');
              var bit_artist_details = bit_item_data_from_array;
              cc(bit_artist_details,'info',false);
              console.log(bit_artist_details);
              if (!isItemNullorUndefined(bit_artist_details)) {
                var thumb_url = bit_artist_details["image_url"];
                var thumb = '<img src="'+thumb_url+'"" alt="" width="50" height="50">';

              }else{
                var thumb = '';            
              }
              current_result_row++;
              var link_name = bit_artist_query_name;
              var link = window.location.href+'?&profile='+link_name;
              var table_data = '<tr><td>'+current_result_row+'</td><td>'+this_item_ID+'</td><td>'+thumb+'</td><td class="name">'+name+'</td><td>'+onTourUntil+'</td><td>'+link+'</td></tr>';
              $(table_id).append(table_data); 
            }); // end $.when  

          }// end if results undefined
          else{
            cc('There was an error getting data. It seems that the endpoint does not return data.','error');
          }
          itemdata_count++;

          if (itemdata_count == result_count) {
            cc('All processing of getSKArtistDetails complete.','success');
          };
        }; // end EXACT name match
      }); // end $.each
    };// end total_result_entries > 0
    
  }); // end $.when                                                  
}


var all_artist_activity = [];

function getSPArtistProfile(sid,action){
  cc('getSPArtistProfile('+sid+') action('+action+')','run')
  // var base_url = 'https://api.spotify.com/v1/search?q=%22daughter%22&type=artist';
  var base_url = 'https://api.spotify.com/v1/artists/';
  // var sid = urlParams["sid"];

  var itemdata_count = 0;
      result_count = 0,
      item = [],
      artist_current_activity = null,
      artist_prev_activity = null,
      table_data = 'start';

  var item_url = base_url + sid;
  // var item_url = 'http://api.bandsintown.com/artists/Lil%20Wayne?format=json&artist_id=fbid_6885814958&api_version=2.0&app_id=GIGROOM_BIT';
  cc('SPOTIFY profile URL:'+item_url,'done')
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var a = item_data_from_array;

    var url = a.external_urls;
    url = url.spotify;
    var name = a.name;
    var id = a.id;
    var popularity = a.popularity;
    var images = a.images;
    var img_url = images[0].url;
    var contructed_result_timestamp = localStorage.getItem('session_timestamp');
    // Construct own object
    item["id"] = id;
    item["name"] = name;
    item["popularity"] = popularity;
    item["img_url"] = img_url;
    item["url"] = url;
    item["cached"] = contructed_result_timestamp;

    cc('ARTIST DETAILS','done');
    console.log(item);
    if (!isItemNullorUndefined(img_url,true)) {
      $(construct_img).css('background-image', 'url(' + img_url + ')');  
    };
    
    if (!isItemNullorUndefined(name,true)) {
      $(construct_title).html('<h1>'+name+'</h1>');
      localStorage.setItem('search_name',name)
    };
    $('#construct_popularity').html('popularity: '+popularity);
    getENArtistDetails(name,item);
  }); // end $.when                                                  
}


function getSPArtistSearch(artist_name,action){
  cc('getSPArtistSearch('+artist_name+') action('+action+')','run')
  // var base_url = 'https://api.spotify.com/v1/search?q=%22daughter%22&type=artist';
  var base_url = 'https://api.spotify.com/v1/';
  var artist_query_name = encodeURI(artist_name);
  table_id = '#search_results table tbody';
  $(table_id).show();

  var itemdata_count = 0;
      result_count = 0,
      item = [],
      artist_current_activity = null,
      artist_prev_activity = null,
      table_data = 'start';

  var item_url = base_url + 'search?q="'+artist_query_name +'"%20year:1990-2020&type=artist&client_id='+sp_api_client_id;
  // var item_url = 'http://api.bandsintown.com/artists/Lil%20Wayne?format=json&artist_id=fbid_6885814958&api_version=2.0&app_id=GIGROOM_BIT';
  cc('SPOTIFY search URL:'+item_url,'done')
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var artist_details = item_data_from_array;
    var results = artist_details["artists"];
    results = results["items"];

    cc('SPOTIFY results','info',false);
    console.log(results);
    var result_count = getResponseSize(results);
    cc('results count: '+result_count,'highlight')

    jQuery.each(results, function(i, cdata) {     
      if (results != undefined) {

        var this_item_ID  = cdata['id'];
        var name          = cdata['name'];
        var onTourUntil = 'NA';
        var popularity    = cdata['popularity'];
        var images        = cdata['images'];
        var thumb = '';
        var image_loaded = false;
        // // Load one Thumb image
        // jQuery.each(images, function(i, cdata) {    
        //   if (images != undefined) {
        //     if (!image_loaded) {
        //       var thumb_url = cdata.url;
        //       var thumb = '<img src="'+thumb_url+'"" alt="" width="50" height="50">';
        //       image_loaded = true;
        //     }
        //   }// end if results undefined
        // }); // end images $.each
        current_result_row++;
        cc('SK RESULT: '+this_item_ID+ ' '+name,'success');
        cc('images','info');
        console.log(images);
        
        if (images[0] != undefined) {
            if (!image_loaded) {
              var thumb_url = images[0].url;
              if (action === 'display_results') {
                var thumb = '<img src="'+thumb_url+'"" alt="" width="50" height="50">';
                localStorage.setItem('search_artist_thumb_url',thumb_url);
                image_loaded = true;
              }
              if (action === 'get_details') {
                var details = {
                  "id" : id,
                  "thumb_url": thumb_url,
                  "name": name
                }
                return details;
              };
              if (action === 'get_thumb') {
                return thumb_url;
              };
            }
          }// end if results undefined
        if (action === 'display_results') {
          var link = 'http://localhost:8000/dashboard.html?&sid='+this_item_ID;
          var table_data = '<tr><td>'+current_result_row+'</td><td>'+this_item_ID+'</td><td>'+thumb+'</td><td class="name">'+name+'</td><td>'+popularity+'</td><td>'+onTourUntil+'</td><td><a href="'+link+'" class="name"><strong>GO</strong></a></td></tr>';
          $(table_id).append(table_data); 
        } // end display_results
      }// end if results undefined
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;

      if (itemdata_count == result_count) {
        cc('All processing of getSKArtistDetails complete.','success');
      };
    }); // end $.each
  }); // end $.when                                                  
}

function getBITArtistDetails(artist_name,action){
  cc('getBITArtistDetails('+artist_name+') action('+action+')','run')
  var base_url = 'http://api.bandsintown.com/artists/';
  var artist_query_name = encodeURI(artist_name);
  table_id = '#search_results table tbody';
  $(table_id).show();

  var itemdata_count = 0;
      result_count = 0,
      item = [],
      artist_current_activity = null,
      artist_prev_activity = null,
      table_data = 'start';

  var item_url = base_url +artist_query_name + '?api_version=2.0&app_id='+bit_api_key +'&format=json&callback=?';
  // var item_url = 'http://api.bandsintown.com/artists/Lil%20Wayne?format=json&artist_id=fbid_6885814958&api_version=2.0&app_id=GIGROOM_BIT';
  cc('BIT search URL:'+item_url,'done')
  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);
  $.when(itemdata).done(function(item_data_from_array) {
    var artist_details = item_data_from_array;
    cc(artist_details,'info',false);
    console.log(artist_details);
  }); // end $.when                                                  
}



function getENArtistDetails(artist_name,artist_info){
  cc('getENArtistDetails('+artist_name+')','run')
  var base_url = 'http://developer.echonest.com/api/v4/artist/';

  var lowercase_query_name = artist_name.toLowerCase();
  var artist_query_name = encodeURI(artist_name);
  // alert(artist_query_name);
  table_id = '#search_results table tbody';
  $(table_id).show();

  var itemdata_count = 0;
      result_count = 0,
      item = [],
      artist_current_activity = null,
      artist_prev_activity = null,
      table_data = 'start';

  var item_url = base_url +'search?api_key='+en_api_key+'+&name='+artist_query_name;

  cc('EN search URL:'+item_url,'done')

  var item_data_from_array = [];
  var itemdata = $.getJSON(item_url);

  $.when(itemdata).done(function(item_data_from_array) {
    var artist_details = item_data_from_array;
    var artists = artist_details["response"];
    artists = artists["artists"];
    // artist_details = artist_details[0];
    cc(artist_details,'info',false);
    console.log(artist_details);
    console.log(artists);

    var result_count = getResponseSize(artists,'JSON');

    var logstore_data = artists;

    jQuery.each(logstore_data, function(i, cdata) {     

      if (logstore_data != undefined) {
        var this_item_ID       = cdata['id'];
        var name       = cdata['name'];
        if (name === artist_name) {


          cc('RESULT: '+this_item_ID+ ' '+name,'success');

          var artist_item_url = 'http://developer.echonest.com/api/v4/artist/profile?api_key='+en_api_key+'&id='+this_item_ID+'&format=json&bucket=familiarity&bucket=hotttnesss&bucket=images&bucket=biographies';
          // var artist_item_url = 'http://developer.echonest.com/api/v4/artist/profile?api_key='+en_api_key+'&id='+artist_id+'&format=json&bucket=biographies&bucket=blogs&bucket=familiarity&bucket=hotttnesss&bucket=images&bucket=news&bucket=reviews&bucket=terms&bucket=urls&bucket=video&bucket=id:musicbrainz';
          var artist_item_data_from_array = [];
          var artist_itemdata = $.getJSON(artist_item_url);

          $.when(artist_itemdata).done(function(artist_item_data_from_array) {
            var artist_artist_details = artist_item_data_from_array;
            cc(artist_artist_details,'info',false);
            console.log(artist_artist_details);
            
            // var artist_details = artist_item_data_from_array;
            var artist = artist_artist_details["response"];
            artist = artist["artist"];
            cc('Artist familiarity:'+artist["familiarity"],'success');
            
            // only use Wikipedia bios
            var bio_loaded = false;
            var bio = artist["biographies"];
            var bio_info = '';
            var bio_result_count = getResponseSize(bio);
            cc('# of Bios available '+bio_result_count,'info');

            jQuery.each(bio, function(i, cdata) { 
              if (bio != undefined) {
                if (!bio_loaded) {
                  var bio_site = cdata.site;
                  if (bio_site === "last.fm" && !bio_loaded) {
                    var bio_url = cdata.url;
                    var bio_text = cdata.text;
                    cc('BIO: '+bio_url+' '+bio_site,'highlight');
                    cc(bio_text,'info');
                    //trim the string to the maximum length
                    var maxLength = 260 
                    var trimmedBio = bio_text.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedBio = trimmedBio.substr(0, Math.min(trimmedBio.length, trimmedBio.lastIndexOf(" ")))
                    cc('trimmedBio: '+trimmedBio,'done');
                    var bio_info = '<p>'+trimmedBio+'...<a href="'+bio_url+'" target="blank">Read More</a></p>';
                    // alert(bio_info);
                    var construct_bio = '#construct_bio';
                    $(construct_bio).html(bio_info);
                    bio_loaded = true;
                  }
                  else if (bio_site === "facebook" && !bio_loaded) {
                    var bio_url = cdata.url;
                    var bio_text = cdata.text;
                    cc('BIO: '+bio_url+' '+bio_site,'highlight');
                    cc(bio_text,'info');
                    //trim the string to the maximum length
                    var maxLength = 260 
                    var trimmedBio = bio_text.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedBio = trimmedBio.substr(0, Math.min(trimmedBio.length, trimmedBio.lastIndexOf(" ")))
                    cc('trimmedBio: '+trimmedBio,'done');
                    var bio_info = '<p>'+trimmedBio+'...<a href="'+bio_url+'" target="blank">Read More</a></p>';
                    // alert(bio_info);
                    var construct_bio = '#construct_bio';
                    $(construct_bio).html(bio_info);
                    bio_loaded = true;
                  }
                  else if (bio_site === "wikipedia" && !bio_loaded) {
                    var bio_url = cdata.url;
                    var bio_text = cdata.text;
                    cc('BIO: '+bio_url+' '+bio_site,'highlight');
                    cc(bio_text,'info');
                    //trim the string to the maximum length
                    var maxLength = 260 
                    var trimmedBio = bio_text.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedBio = trimmedBio.substr(0, Math.min(trimmedBio.length, trimmedBio.lastIndexOf(" ")))
                    cc('trimmedBio: '+trimmedBio,'done');
                    var bio_info = '<p>'+trimmedBio+'...<a href="'+bio_url+'" target="blank">Read More</a></p>';
                    // alert(bio_info);
                    var construct_bio = '#construct_bio';
                    $(construct_bio).html(bio_info);
                    bio_loaded = true;
                  }
                }
              }// end if results undefined
              // itemdata_count++;
              // if (itemdata_count == bio_result_count) {
              //   cc('All processing of bios complete.','success');
              // };
            }); // end $.each
            
            artist_info["familiarity"] = artist["familiarity"];
            artist_info["hotttnesss"] = artist["hotttnesss"];
            artist_info["bio_trimmed"] = bio_info;
            cc('UPDATED Artist info object','success');
            console.log(artist_info);
            artist_cache.push(artist_info);
            
            cc('FULL Artist cache object','success');
            console.log(artist_cache);

            var profile_holder = '#construct_profile';
            var profile_info = '<p>'+artist["id"]+'</p><p>'+artist["name"]+'</p>';
            // var profile_info = 
            $(profile_holder).html(profile_info);
            $(profile_holder).append(bio_info);
            $('#contruct_fee_factors').html('<p>familiarity: '+artist["familiarity"]+'</p><p>hotttnesss: '+artist["hotttnesss"]+'</p>');

          }); // end $.when 
        }; // end name === artist_name
      }// end if d undefined
      else{
        cc('There was an error getting data. It seems that the endpoint does not return data.','error');
      }
      itemdata_count++;

      if (itemdata_count == result_count) {
        cc('All processing of getStudentActivity complete.','success');
      };

    }); // end $.each
  }); // end $.when                                                  
}

var artist_cache = [];

function getLastTimestamp(logstore_data){
  cc('getLastTimestamp','run')
    var timestamp_logstore_data = _.pluck(logstore_data, 'timecreated');
    var sorted = timestamp_logstore_data.sort(); 
    var last_element = sorted[sorted.length - 1];
    return last_element
}

function formatDate(timestamp){
  // cc('formatDate','run')
    var formatted_date = moment.unix(timestamp).format("YYYY/MM/DD hh:mm:ss");
    return formatted_date
}
