// gr.js non-minified


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

// MB API




$(document).ready(function() {
  // Set Input to previous search by Default


  var artist_name_storage = localStorage.getItem('search_name');
  if (!isItemNullorUndefined(artist_name_storage)) {
    $( "#who_to_host input:first" ).attr("placeholder", artist_name_storage);
    $( "#who_to_host input:first" ).val(artist_name_storage);
  };

  $( "#search_trigger" ).click(function() {
    var artist_name = $( "#who_to_host input:first" ).val();
    // var artist_name = 'Falls';
    // getENArtistDetails(artist_name);
    // getBITArtistDetails(artist_name);
    localStorage.setItem('search_name',artist_name);
    localStorage.setItem('results_page',1);
    localStorage.setItem('result_counter',0);
    getSKArtistDetails(artist_name);
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

  $( "td.name" ).click(function() {
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
}); // end Doc Ready 


var current_result_row = 0;

function getSKArtistDetails(artist_name,results_page){
  if (isItemNullorUndefined(artist_name,true)) {
    var artist_name = localStorage.getItem('artist_name');
    if (isItemNullorUndefined(artist_name)) {
      alert('Please enter an artist name to search.')
    };
  };
  // if (isItemNullorUndefined(results_page,true)) {
  //   var artist_name = localStorage.getItem('results_page');
  //   if (isItemNullorUndefined(results_page,true)) {
  //     var results_page = 1;
  //   };
  // };

  cc('getSKArtistDetails('+artist_name+') results_page('+results_page+')','run')

  // Construct Query URL
  var base_url = 'http://api.songkick.com/api/3.0/';
  var lowercase_query_name = artist_name.toLowerCase();
  var artist_query_name = encodeURI(lowercase_query_name);
  customEncodeURIComponent(artist_query_name);


  cc('Seaching for '+artist_query_name, 'info');
  // alert(artist_query_name);

  var table_id = '#search_results table',
      itemdata_count = 0,
      result_count = 0,
      item = [],
      artist_current_activity = null,
      artist_prev_activity = null,
      table_data = 'start';
  /* Pagination 
    on search set search name, 
    if total_result_entries count > 50 
    set addPagination = true
    localStorage('page')
    pagination link = page +1
    more = search(artistName, page)
  */
  $(table_id).show();

  var item_url = base_url +'search/artists.json?query='+artist_query_name + '&apikey='+sk_api_key +'&jsoncallback=?&page='+results_page;
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
    cc('total_result_entries: '+total_result_entries,'info');
    var results_counter = '#results_counter';
    $(results_counter).show();
    $(results_counter+ ' span').html(total_result_entries);

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
          var table_data = '<tr><td>'+current_result_row+'</td><td>'+this_item_ID+'</td><td>'+thumb+'</td><td>'+name+'</td><td>'+onTourUntil+'</td></tr>';
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
    }); // end $.each
  }); // end $.when                                                  
}


var all_artist_activity = [];

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



function getENArtistDetails(artist_name,action){
  cc('getENArtistDetails('+artist_name+') action('+action+')','run')
  
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
        cc('RESULT: '+this_item_ID+ ' '+name,'success');

        var artist_item_url = 'http://developer.echonest.com/api/v4/artist/profile?api_key='+en_api_key+'&id='+this_item_ID+'&format=json&bucket=familiarity&bucket=hotttnesss&bucket=images';
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
          // alert('Artist Name:'+artist["name"]);

        }); // end $.when 
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
