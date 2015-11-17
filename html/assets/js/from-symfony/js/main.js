// Gumby is ready to go

// Gumby.ready(function() {
//   Gumby.log('Gumby is ready to go...', Gumby.dump());

//   // placeholder polyfil
//   if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
//     $('input, textarea').placeholder();
//   }

//   // skip link and toggle on one element
//   // when the skip link completes, trigger the switch
//   $('#skip-switch').on('gumby.onComplete', function() {
//     $(this).trigger('gumby.trigger');
//   });

// // Oldie document loaded
// }).oldie(function() {
//   Gumby.warn("This is an oldie browser...");

// // Touch devices loaded
// }).touch(function() {
//   Gumby.log("This is a touch enabled device...");
// });


// // This is called with the results from from FB.getLoginStatus().
// function statusChangeCallback(response) {
// console.log('statusChangeCallback');
// console.log(response);
// // The response object is returned with a status field that lets the
// // app know the current login status of the person.
// // Full docs on the response object can be found in the documentation
// // for FB.getLoginStatus().
// if (response.status === 'connected') {
//   // Logged into your app and Facebook.
//   testAPI();
// } else if (response.status === 'not_authorized') {
//   // The person is logged into Facebook, but not your app.
//   document.getElementById('status').innerHTML = 'Please log ' +
//     'into this app.';
// } else {
//   // The person is not logged into Facebook, so we're not sure if
//   // they are logged into this app or not.
//   document.getElementById('status').innerHTML = 'Please log ' +
//     'into Facebook.';
// }
// }

// stubbed login form validation

//$('#login-form').validation({
//  // pass an array of required field objects
//  required: [
//    {
//      // name should reference a form inputs name attribute
//      // just passing the name property will default to a check for a present value
//      name: '_password',
//    },
//    {
//      name: '_username',
//      // pass a function to the validate property for complex custom validations
//      // the function will receive the jQuery element itself, return true or false depending on validation
//      validate: function($el) {
//        return $el.val().match('@') !== null;
//      }
//    }
//  ],
//  // callback for failed validaiton on form submit
//  fail: function() {
//    Gumby.error('Form validation failed');
//    $('#status-message').removeClass();
//    $('#status-message').addClass('danger alert');
//    $('#status-message').text('Please enter a valid email address and password.');
//    $('#status-message').show();
//  }
//});


// $('#join-form').validation({
//   // pass an array of required field objects
//   required: [
//     {
//       // name should reference a form inputs name attribute
//       // just passing the name property will default to a check for a present value
//       name: 'coursecode',
//     }
//   ],
//   // callback for failed validaiton on form submit
//   fail: function() {
//     Gumby.error('Form validation failed');
//     $('#join-status-message').removeClass();
//     $('#join-status-message').addClass('danger alert');
//     $('#join-status-message').text("We're sorry, the provided course code is invalid.");
//     $('#join-status-message').show();
//   },
//   // callback for successful validation on form submit
//   // if omited, form will submit normally
//   submit: function(data) {
//       $('#join-status-message').removeClass();
//       $('#join-status-message').addClass('success alert');
//       $('#join-status-message').text('Course join successful.');
//       $('#join-status-message').show();
//   } 
// });


// $('#request-form').validation({
//   // pass an array of required field objects
//   required: [
//     {
//       // name should reference a form inputs name attribute
//       // just passing the name property will default to a check for a present value
//       name: 'firstname',
//         name: 'lastname'
//     },
//     {
//       name: 'email',
//         // pass a function to the validate property for complex custom validations
//         // the function will receive the jQuery element itself, return true or false depending on validation
//         validate: function($el) {
//           return $el.val().match('@') !== null;
//         }
//     },
//     {
//       name: 'password',
//     },
//     {
//       name: 'birthday',
//     },
//     {
//       name: 'coursename',
//     }

//   ],
//   // callback for failed validaiton on form submit
//   fail: function() {
//     Gumby.error('Form validation failed');
//     $('#access-status-message').removeClass();
//     $('#access-status-message').addClass('danger alert');
//     $('#access-status-message').text("Please fill out all fields.");
//     $('#access-status-message').show();
//   },
//   // callback for successful validation on form submit
//   // if omited, form will submit normally
//   //submit: function(data) {
//   //    $('#access-status-message').removeClass();
//   //    $('#access-status-message').addClass('success alert');
//   //    $('#access-status-message').text('Course join successful.');
//   //    $('#access-status-message').show();
//   //}
// });


// // stubbed out form swap code 

// $('.forgot-pass').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#forgot-form-container').slideDown();
// });

// $('.back-to-login').on('click',function(){
//   $('#login-form-container').slideDown();
//   $('#forgot-form-container').slideUp();
//   $('#join-course-container').slideUp();
//   $('#request-access-container').slideUp();
// });

// $('.join-course').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#join-course-container').slideDown();
// });

// $('.request-access').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#join-course-container').slideUp();
//   $('#request-access-container').slideDown();
// });

// /*$('.create-account').on('click',function(){
//   $('#login-form-container').slideUp();
//   $('#join-course-container').slideUp();
//   $('#request-access-container').slideDown();
// });*/

// select all checkbox code 

$('#select-all').on('click',function(e) {
  var table= $(e.target).closest('table');
  $('td input:checkbox',table).prop('checked',this.checked);
});

// // define pager options
//   var pagerOptions = {
//     // target the pager markup - see the HTML block below
//     container: $(".pager"),
//     // output string - default is '{page}/{totalPages}'; possible variables: {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
//     output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
//     // if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
//     // table row set to a height to compensate; default is false
//     fixedHeight: false,
//     // remove rows from the table to speed up the sort of large tables.
//     // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
//     removeRows: false,
//     // go to page selector - select dropdown that sets the current page
//     cssGoto: '.gotoPage'
//   };

$(".tablesorter").tablesorter({
  headers: {
      // disable sorting of the first column (we can use zero or the header class name)
      0 : {
        // disable it by setting the property sorter to false
        //sorter: false
      }
    },
});

$(".tablesorter-filter-paged").tablesorter({
  headers: {
      // disable sorting of the first column (we can use zero or the header class name)
      0 : {
        // disable it by setting the property sorter to false
        //sorter: false
      }
    },
    widgets: ["zebra", "filter"],
    widthFixed: true,
    widgetOptions : {
      // filter_anyMatch replaced! Instead use the filter_external option
      // Set to use a jQuery selector (or jQuery object) pointing to the
      // external filter (column specific or any match)
      //filter_external : '.search',
      // add a default type search to the first name column
      filter_defaultFilter: { 1 : '~{query}' },
      // include column filters
      filter_columnFilters: true,
      filter_placeholder: { search : 'Search...' },
      filter_saveFilters : true,
      filter_reset: '.reset'
    }
}); //.tablesorterPager(pagerOptions);

//instantiate any input fields with a 'datepicker' class
$('.datepicker').pikaday({
  format: 'MM/DD/YYYY'
});

// Add a Group user filter
$('#filterbox').on('keyup',function(){
  searchstr = $(this).val().toLowerCase();
  filterel = $('.filteritems td.name');
  filterel.each(function(){
    if($(this).text().toLowerCase().indexOf(searchstr) < 0){
      $(this).parent().hide();
    }else{
      $(this).parent().show();
    }
  });
});

// //ckeditor 
// $( 'textarea.editor' ).ckeditor();


// // global to track total mentions
// var tally = 0;
// // social radar display logic
// var sociallist = $('#widget-social-radar ul.social-radar li');
// // if the list exists, proceed. 
// if(sociallist.length){
//   // get the total number of cumulative mentions for doing some math
//   getTotalMentions();
//   // loop through each social source
//   sociallist.each(function(){
//     // grab the value of the data-count attribute
//     // to get total mentions for this source
//     thisval = parseInt($(this).attr('data-count'));
//     // determine the bubble size based on number of mentions
//     // multiply by a buffer (may need to adjust buffer based on actual numbers)
//     bubbleSize = (thisval/tally)*130;
//     // if it's a very small percentage, increase by a little bit so it's visible
//     if(bubbleSize < 15) {
//       bubbleSize = bubbleSize + 10;
//     }
//     // animate the resizing of each bubble
//     $(this).animate({
//       width: bubbleSize*3+'px',
//       height: bubbleSize*3+'px',
//     },500, function(){
//       //console.log('fist animation done');
//     });
//     $(this).find('i').animate({
//       fontSize: bubbleSize*3/2+'px',
//       lineHeight: bubbleSize*3+'px'
//     },500, function(){
//       //console.log('second animation done');
//     });
//   });
//   // loop is done, but are the animations done?
//   var wait = setInterval(function() {
//     // animations all done, apply masonry for layout twiddling
//     if( !sociallist.is(":animated") ) {
//       clearInterval(wait);
//       $('#widget-social-radar ul.social-radar').masonry({
//         gutter : 0,
//         columnWidth: 10,
//         itemSelector: 'li',
//         isFitWidth: false
//       });
//     }
//   }, 200);
// }

// // bring each element to the foreground when moused over
// // so tooltips show
// sociallist.on('mouseover',function(){
//   $(this).css('z-index',10000);
// });
// // send it to the background after
// sociallist.on('mouseout',function(){
//   $(this).css('z-index',1);
// });

// function getTotalMentions(){
//   sociallist.each(function(){
//     thiscount = parseInt($(this).attr('data-count'));
//     tally+=thiscount;
//   });
// }


// //******** dashboard customization, sorting, and storage *********

// //initialize variables from localstorage
// var storedactivewidgets = JSON.parse(localStorage.getItem( 'activewidgets'));
// var storedinactivewidgets = JSON.parse(localStorage.getItem( 'inactivewidgets'));

// // if local storage empty
// if((storedinactivewidgets === null && storedactivewidgets === null) || (storedinactivewidgets.length <= 0 && storedactivewidgets.length <= 0)){
//   //console.log('local storage empty! parsing document...');
//   var activewidgets = [];
//   var inactivewidgets = [];
//   var id = 0;
//   // parse widgets on page, create arrays of active and inactive ones
//   $('.widget-grid > li').each(function(index, element){
//     tmp = {
//       "id": id,
//       "name": $(this).find('h2:first-of-type').text(),
//       "target": $(this).attr('id')
//     }
//     //console.log("adding item to array:");
//     //console.log(tmp);
//     // if item is visible, put it in the visible widgets array
//     if($(this).is(":visible")){
//       activewidgets.push(tmp);
//     }else{
//       inactivewidgets.push(tmp);
//     }
//     id++;
//   });
//   localStorage.setItem( 'activewidgets', JSON.stringify(activewidgets) );
//   localStorage.setItem( 'inactivewidgets', JSON.stringify(inactivewidgets) );
//   // show/hide items; populate lists
//   dashlayout(activewidgets,inactivewidgets);

// // else; populate variables from local storage
// }else{
//   //console.log('local storage found! updating variables...');
//   var activewidgets = JSON.parse(localStorage.getItem( 'activewidgets'));
//   var inactivewidgets = JSON.parse(localStorage.getItem( 'inactivewidgets'));
//   //console.log('active widgets variable from local storage:');
//   //console.log(activewidgets);
//   //console.log('inactive widgets variable from local storage:');
//   //console.log(inactivewidgets);
//   // show/hide items; populate lists
//   dashlayout(activewidgets,inactivewidgets);
// }
// // end if cookie empty

// // debug output
// /*console.log("active widgets: ");
// $.each(activewidgets, function(i,item){
//   console.log(item.name);
// });
// console.log("inactive widgets: ");
// $.each(inactivewidgets, function(i,item){
//   console.log(item.name);
// });*/


// // drag and drop/sort functionality
// var group = $("ul.sortable").sortable({
//   group: 'sortable',
//   handle: 'h2',
//   pullPlaceholder: false,
//   onDrop: function  (item, targetContainer, _super) {
//     var clonedItem = $('<li/>').css({height: 0});
//     item.before(clonedItem);
//     clonedItem.animate({'height': item.height()});
    
//     item.animate(clonedItem.position(), function  () {
//       clonedItem.detach();
//       _super(item);
//     })

//     // hide elements in dashboard if they are dragged to hidden box in dash editor
//     par = item.parent();
//     widgetid = item.attr('data-target');

//     if(par.attr('class') === "sortable disabled"){
//       //console.log("hiding: "+widgetid);
//       //$("#"+widgetid).hide();
//     }else{
//       dashul = $('.widget-grid');
//       par.find('li').each(function(){
//         thistarget = "#"+$(this).attr('data-target');
//         //console.log('moving this li: '+thistarget);
//         dashul.append($(thistarget));
//       });
//       //$("#"+widgetid).show();
//     }
//     // store layout in two variables and write to cookie
//     var data = group.sortable("serialize").get();
//     // active widgets
//     activewidgets = [];
//     $.each(data[0], function(i,item){
//       if(item.name !== undefined){
//         tmp = {
//           "id": item.id,
//           "name": item.name,
//           "target": item.target
//         }
//         activewidgets.push(tmp);
//       }
//     });
//     // inactive widgets
//     inactivewidgets = [];
//     $.each(data[1], function(i,item){
//       if(item.name !== undefined){
//         tmp = {
//           "id": item.id,
//           "name": item.name,
//           "target": item.target
//         }
//         inactivewidgets.push(tmp);
//       }
//     });

//     // set local storage data
//     localStorage.setItem( 'activewidgets', JSON.stringify(activewidgets) );
//     localStorage.setItem( 'inactivewidgets', JSON.stringify(inactivewidgets) );

//     // re-read local storage data and layout dash
//     storedactivewidgets = JSON.parse(localStorage.getItem( 'activewidgets'));
//     storedinactivewidgets = JSON.parse(localStorage.getItem( 'inactivewidgets'));

//     dashlayout(storedactivewidgets,storedinactivewidgets);

//     // debug output
//     /*console.log("--active widgets:-- ");
//     $.each(activewidgets, function(i,item){
//       console.log(item.name);
//     });
//     console.log("--inactive widgets:-- ");
//     $.each(inactivewidgets, function(i,item){
//       console.log(item.name);
//     });*/
//   },

//   // set item relative to cursor position
//   onDragStart: function ($item, container, _super) {
//     var offset = $item.offset(),
//     pointer = container.rootGroup.pointer

//     adjustment = {
//       left: pointer.left - offset.left,
//       top: pointer.top - offset.top
//     }

//     _super($item, container)
//   },
//   onDrag: function ($item, position) {
//     $item.css({
//       left: position.left - adjustment.left,
//       top: position.top - adjustment.top
//     })
//   }
// });


// // populate dashboard editor lists and show/hide elements as needed
// function dashlayout(active,inactive){
//   console.log('entering dash layout function...');

//   var activelist = $('#activewidgets');
//   var inactivelist = $('#inactivewidgets');

//   // empty lists
//   activelist.empty();
//   inactivelist.empty();
//    var lastitem = "";

//   // repopulate lists
//   $.each(active,function(index,item){
//     tmp = '<li data-id="'+item.id+'" data-name="'+item.name+'" data-target="'+item.target+'"><h2>'+item.name+'</h2></li>';
//     activelist.append(tmp);
//     if(lastitem != ""){
//       $("#"+item.target).insertAfter(lastitem);
//     }
//     lastitem = $("#"+item.target);
//     $("#"+item.target).show("slow");
//   });
//   $.each(inactive,function(index,item){
//     tmp = '<li data-id="'+item.id+'" data-name="'+item.name+'" data-target="'+item.target+'"><h2>'+item.name+'</h2></li>';
//     inactivelist.append(tmp);
//     $("#"+item.target).hide("slow");
//   });
//   var delaybtn = window.setTimeout(pulseButton,2000);
// }

// function pulseButton(){
//   var dashbtn = $('#dash-edit');
//   dashbtn.fadeTo("slow", 0.3,function(){
//     $(this).fadeTo("slow",1,function(){
//       $(this).fadeTo("slow",0.3,function(){
//         $(this).fadeTo("slow",1);
//       });
//     });
//   });
// }


var base_url = urls.messaging;
// var base_url = 'http://akronzip.com/';

// // get user's courses
// if($('#mycourselist').length){
//   var courselist = $('#mycourselist');
//   var actor = user.email; //user.email;
//   // var actor = bretvanhorn@gmail.com;
//   var courselisturl = base_url + 'actorcourses/'+actor;

//   var thisurl;
//   $.ajax({
//         url: courselisturl,
//         type: 'GET',
//         success: function(result) {
//            //console.log(result);
//            $.each(result, function(i, val) {
//               getCourseURL(val.CourseID, function(data){
//                 //console.log('getCourseURL data: '+ data);
//                 thisurl = data;
//                 courselist.append('<li><a href="'+thisurl+'" target="_blank">'+val.CourseName+'</a></li>'); 
//               }); 
//            });
//         }
//     });
// } 

// function getCourseURL(cid, fn){
//   var coursedetailurl = base_url + 'course/'+cid;
//   $.ajax({
//     url: coursedetailurl,
//     type: 'GET',
//     success: function(result) {
//       //console.log('get courseurl result: '+ result);
//       $.each(result, function(i, val) {
//           fn(val.URL);
//       });
//     }
//   });
// }

// handler to close any open drawers when not clicked on 

$('body').on('click', function(e) {
  var target = $(e.target);
  if (! target.hasClass('active')) {
    // It's not an active element. Does it have an active parent.
    var activeParents = target.parents('.active');
    if (activeParents.length == 0) {
      $('a.active').click();
    }
  }
});

$("#fos_user_profile_form_country").selectBoxIt({ 
  autoWidth: false
});
$("#fos_user_profile_form_company").selectBoxIt({ 
  autoWidth: false
});
$("#root form ul li.field select").selectBoxIt({ 
  autoWidth: false
});
$("#Priority").selectBoxIt({ 
  autoWidth: false
});

/*$("#lumious_user_form_type select").selectBoxIt({ 
  autoWidth: false
});*/

// Modal Selects
$("#type").selectBoxIt({ 
  autoWidth: false
});



// ciscoone charts and data -- move to separate file!

var base_url = urls.analytics;
// var base_url = 'http://akronzip.com/';
var url_activityfeed = base_url + "statement";


    //     // dig down to the responseText object
    //     var s = $.parseJSON(studentobject[2].responseText);
    //     var q = $.parseJSON(quizobject[2].responseText);
    //     var a = $.parseJSON(attemptobject[2].responseText);   

        // var quiz_ids = _.pluck(q, 'planID');
    //     var quiz_names = _.pluck(q, 'name');
    //     var quiz_sumgrades = _.pluck(q, 'sumgrades');
    //     var zip_quizzes = _.zip(quiz_ids,quiz_names,quiz_sumgrades);
    //     var student_firstnames = _.pluck(s, 'firstname');

// New array of arrays that match a condition
var plan_ids_matched = [];
var course_ids_matched = [];

function find_most_popular_courses(){
  console.log(' #### most_popular_courses ####');

  // declare variables
  var plan_courses_data = [];
  var overview_data = [];
  var overview_values = [];

  // Get user selcection
  var plan_filter_id = $('#plan_filter').find(':selected').data('id');
  plan_filter_id = parseInt(plan_filter_id);
  console.log('plan_filter_id: '+plan_filter_id);

  // Original array of arrays
  var plan_courses_data = [
      {"planID":"99","courseID":"30"},
      {"planID":"00","courseID":"29"},
      {"planID":"00","courseID":"31"},
      {"planID":"99","courseID":"32"}
  ];
  
  // json is converted to an array object to use
  console.log(plan_courses_data);
  console.log('end plan_courses_data');

  
  // @FORLATERUSE - use each unique courseID to populate the Menu
  // Get courseIDs
  var courseIDs = _.pluck(plan_courses_data, 'courseID');
  var unique_courseIDs = _.uniq(courseIDs);
  console.log(unique_courseIDs);
  console.log('end unique_courseIDs');
  // Sort courseIDs lowest to hightest
  unique_courseIDs.sort(function(a, b) {
      return a - b;
  });  
  console.log(unique_courseIDs);
  console.log('end SORTED unique_courseIDs');

  // Iterate through each array within the array. Dig down to values within the current array.
  // filter values by passing condidtion
  // save in new array of arrays that matched the test condition
  jQuery.each(plan_courses_data, function(key, single_plan_data_values) { 
    var planID_value = parseInt(single_plan_data_values.planID);
    // only save in the new array if the id matches the userselection
    
    if (plan_filter_id = planID_value) {
        plan_ids_matched.push(single_plan_data_values);
    };
  });
  console.log(plan_ids_matched);
  console.log('plan_ids_matched end');
    
  // Now work with the array that only contains the matched data. 
  // function get_overview_data(){
    jQuery.each(plan_ids_matched, function(key, single_course_data_values) { 
  
      var courseID_value = parseInt(single_course_data_values.courseID);
      // get the data for this single specified value from the endpoint
      var url_overview_data = base_url + "course/overview/" +courseID_value;

      $.getJSON( url_overview_data, function( overview_json ) {
        console.log('getting INTERNAL url_overview_data:' +url_overview_data);
        console.log(overview_json);
        course_ids_matched.push(overview_json);
        //By using javasript json parser
        console.log('course_ids_matched ADDED INNER');
        console.log(course_ids_matched);

        var sorted_course_overview_data = _.sortBy(course_ids_matched, 'Viewed');
        // console.log('sorted_course_overview_data ----------------');
        // console.log(sorted_course_overview_data);

        var reversed_sorted_course_overview_data = sorted_course_overview_data.reverse();
        console.log('reversed_sorted_course_overview_data ^^^^^^^^^^^^-');
        console.log(reversed_sorted_course_overview_data);
      });

    });
} // end most_popular_courses

function show_most_popular_courses(){
  find_most_popular_courses();
  console.log(course_ids_matched);
  console.log('course_ids_matched OUTER');
}


function populate_data_content(){
  console.log('DO: populate_data_content()');
  
  // var plan_course_filter_id = $('#plan_course_filter').find(':selected').data('id');
  var plan_course_filter_id = 30;

  var url_course_duration = base_url + "course/duration/" +plan_course_filter_id;
  var url_course_graph = base_url + "course/graph/" +plan_course_filter_id;
  var url_course_module_duration = base_url + "coursemodule/courseduration/" +plan_course_filter_id +"/";
  var url_course_knowledge_check = base_url + "knowledgecheck/student/";
  var url_course_response_check = base_url + "knowledgecheck/response/";
  // http://akronzip.com/coursemodule/courseduration/30/ciscoone~025008514@t2000inc.com

  // Overview Data
  var url_lastupate_data = base_url + "course/lastupdate/" +plan_course_filter_id;
  var lastupdate_data = [];
  var lastupdate_values = [];
  

  $.getJSON( url_lastupate_data, function( lastupdate_json ) {
    console.log('******* getting lastupdate_json data *********');
    console.log(lastupdate_json);
    //By using javasript json parser
    console.log(lastupdate_json['LAST UPDATED']);
    console.log(lastupdate_json['NEWEST RECORD']);

    var lastupdate_moment = lastupdate_json['LAST UPDATED'];
    lastupdate_moment = moment(lastupdate_json['LAST UPDATED']).format("MM/DD/YYYY, h:mm:ss a");
    $('#overview_updated_date').html(lastupdate_moment);
    
    var lastusage_moment = lastupdate_json['NEWEST RECORD'];
    lastusage_moment = moment(lastupdate_json['NEWEST RECORD']).format("MM/DD/YYYY, h:mm:ss a");
    $('#overview_updated_usage').html(lastusage_moment);
    
  });

  // cisco one Learner Detail tab
  $.getJSON( url_course_duration, function( json ) {

    console.log("summary learner data:");
    console.log(json);
    
    var tbody_details = $("#learnerdetails");

    tbody_details.empty();
    
    jQuery.each(json, function(i, val) {

      var module_data = "";
      var kcheck_data = "";
      var responses_data = "";

      var mdata = $.getJSON(url_course_module_duration + val.ACTOR);
      var kdata = $.getJSON(url_course_knowledge_check + val.ACTOR);
      var rdata = $.getJSON(url_course_response_check + val.ACTOR);

      console.log('========================== GETTING LEARNER DETAILS FOR ACTOR: '+ val.ACTOR +'=========================');

      // a way to target each row individually to compensate for 
      // asynchronous requests completing after table is rendered.
      var actorid = val.ACTOR.replace(/[^a-zA-Z 0-9]+/g, '');

      $.when(mdata,kdata,rdata).done(function(mdata,kdata,rdata) {

        // get and loop through module durations
        md = $.parseJSON(mdata[2].responseText);

        jQuery.each(md, function(x, module) { 
          module_data += "<li>" + module.Duration + ": " + module.name + "</li>";
        });


        // get and loop through knowledge check drops
        kd = $.parseJSON(kdata[2].responseText);

        jQuery.each(kd, function(y, k) { 
          thistarget = unescape(k.TARGET);
          tmparray = thistarget.split('/');
          targetname = $(tmparray).get(-2);
          kcheck_data += "<li>" + targetname + ": " + k.ACTIVITY + "</li>";
        });


        // get and loop through knowledge check responses
        rd = JSON.parse(rdata[2].responseText);

        console.log("responses raw data: ");
        console.log(rd[1]);

        //rdresponse = rd['RESPONSE'].split(';');

        console.log("response element: ");

        jQuery.each(rd, function(z, r) { 
          console.log(r.RESPONSE);
          rdresponse = r.RESPONSE.split(';');
          jQuery.each(rdresponse, function(xx, rr) {
            responses_data += "<li>" + rr + "</li>";
          });
        });

        mtmp = "#"+actorid+" .mdata ul.m";
        ktmp = "#"+actorid+" .kdata ul.k";
        rtmp = "#"+actorid+" .kdata ul.r";
        mico = "#"+actorid+" .mdata i";
        kico = "#"+actorid+" .kdata i";

        // console.log("module_data : " + module_data);
        // console.log("kcheck_data : " + kcheck_data);
        // console.log("responses_data : " + responses_data);

        if(module_data != ""){
          $(mico).removeClass('red').addClass('green');
        }

        if(kcheck_data != ""){
          // var new_icon = '<i class="fa fa-check-square-o">';
          $(kico).removeClass('red fa-minus-square-o').addClass('fa-check-square-o green');
        }

        $(mtmp).append(module_data);
        $(ktmp).append(kcheck_data);
        $(rtmp).append(responses_data);

      });

      tbody_details.append("<tr class=\"expand\" id=\""+actorid+"\">" +
        "<td>" + val.NAME + "</td>" +
        "<td class=\"tdata\">" + moment(val.Enter).format("MM/DD/YYYY") + "<br><span>" + moment(val.Enter).format("h:mm:ss a") + "</span></td>" +
        "<td class=\"mdata\"><i class=\"fa fa-puzzle-piece red\"></i><ul class=\"m\">"+ module_data + "</ul></td>" +
        "<td class=\"kdata\"><i class=\"fa fa-minus-square-o red\"></i>" +
        "<div><h5>Knowledge Checks:</h5><ul class=\"k\">"+ kcheck_data + "</ul>" +
        "<div><h5>Responses:</h5><ul class=\"r\">"+ responses_data + "</ul>" +
        "</div></td>" +
        "<td>" + val.Duration + "</td>" +
        "</tr>"       
      );

    });

    tbody_details.trigger('update'); 
  });


  // cisco one All Data tab
  $.getJSON( url_activityfeed, function( json ) {
    
    var tbody_activity = $(".verbtable");

    tbody_activity.empty();

    var uniqueverburis = _.uniq(_.pluck(json, 'VERB'));
    var uniqueverbs = [];

    // this is a workaround to deal with doubled up URIs which
    // cause duplicate entries
    jQuery.each( uniqueverburis, function( i, val ) {
      tmp = val.split('/');
      tmp = "<span class=\"light label\">"+tmp.slice(-1)[0]+"</span>";
      uniqueverbs.push(tmp);
    });
    uniqueverbs = _.uniq(uniqueverbs);

    // add verb buttons to layout
    $('#verbsheader').append(uniqueverbs);
    
    jQuery.each(json, function(i, val) {
  
      // parse verb for endpoint
      act = val.VERB;
      act = act.split('/');
      act = act.slice(-1)[0];

      tbody_activity.append("<tr>" +
          "<td>" + val.ID + "</td>" +
          "<td style=\"white-space:nowrap\">" + val.NAME + "</td>" +
          "<td style=\"white-space:nowrap\">" + moment(val.SOURCE_TIMESTAMP).format("MM/DD/YYYY")  +"</td>" +
          "<td style=\"white-space:nowrap\">" + moment(val.SOURCE_TIMESTAMP).format("h:mm A")  +"</td>" +
          "<td style=\"white-space:nowrap\">" + act + "</td>" +
          "<td>" + decodeURI(val.ACTIVITY) + "</td>" +
         // "<td> </td>" +
        // "<td>" + val.ACTOR + "</td>" +
          "</tr>"       
          );
    });

    tbody_activity.trigger('update'); 
  });


  //Charts tab (tab 1)

  var dates = [];
  var data = [];

  $.getJSON( url_course_graph, function( json ) {
    console.log('getting chart data...');
    console.log(json);

    // get all of the keys and values
    $.each(json, function(key, value){
        console.log(key, value);
        dates.push(key);
        data.push(value);
    });

    console.log(dates);
    console.log(data);

    var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: dates,
      datasets: [
          {
              fillColor: "#fe5f55",
              strokeColor: "#fe5f55",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: data
          }/*,
          {
              fillColor: "#82bfd8",
              strokeColor: "#82bfd8",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              data: [15, 20, 50, 50, 72, 37, 43]
          }*/
      ]
    },
    latestLabel = startingData.labels[6];
    // Reduce the animation steps for demo clarity.
    var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});

  });


// Overview Data

  var url_overview_data = base_url + "course/overview/" +plan_course_filter_id;
  var overview_data = [];
  var overview_values = [];
  

  $.getJSON( url_overview_data, function( overview_json ) {
    console.log('getting url_overview_data data...');
    console.log(overview_json);
    //By using javasript json parser
    console.log(overview_json['Experienced']);
    console.log(overview_json['Viewed']);
    console.log(overview_json['Mastery']);
    $('#overview_viewed').html(overview_json['Viewed']);
    $('#overview_experienced').html(overview_json['Experienced']);
    $('#overview_mastery').html(overview_json['Mastery']);
  });

  // Overview Updated Data
  var overview_updated_url = base_url + "course/lastupdate/" +plan_course_filter_id;
  var overview_updated = [];
  var overview_updated_values = [];
  

  $.getJSON( overview_updated_url, function( overview_updated_json ) {
    console.log('getting overview_updated_url data...');
    console.log(overview_updated_json);
    //By using javasript json parser
    console.log(overview_updated_json['LASTUPDATED']);
    console.log(overview_updated_json['NEWESTRECORD']);
    $('#overview_updated_date').html(moment(overview_updated_json['LASTUPDATED']).format('MMMM Do YYYY, h:m a'));
    $('#overview_updated_usage').html(moment(overview_updated_json['NEWESTRECORD']).format('MMMM Do YYYY, h:m a'));
  });


// Video View Report

  var video_view_duration_url = base_url + "course/duration/" +plan_course_filter_id;
  console.log('video_view_duration_url: '+video_view_duration_url);

  // setup data
  var view_actors = [];
  var view_duration = [];
  var view_duration_seconds = [];
  var view_duration_seconds_clean_data = [];
  var view_total_launches = null;
  var view_total_launches_clean_data = null;
  var view_total_seconds_viewed = 0;

  var longest_view_in_module;
  var shortest_view_in_module;
  var average_viewing_length_in_module;


  $.getJSON( video_view_duration_url, function( json ) {

    var view_actors = _.pluck(json, 'ACTOR');
    console.log('ALL ACTORS ---------------');
    console.log(view_actors);
    var unique_view_actors = _.uniq(view_actors);
    console.log('unique_actors ---------------');
    console.log(unique_view_actors);
    var total_unique_users = _.size(unique_view_actors);
    console.log('UNIUE USERS ---------------' +total_unique_users );
    $('#total_unique_users').html(total_unique_users);

    var all_view_durations = _.pluck(json, 'Duration');
    
    $.each(all_view_durations, function(key, value){
        
        view_duration_seconds.push(key);
        view_duration_seconds_clean_data.push(key);
        // convert to seconds using Moment, clean up data and add to new clean array
        var value_seconds = moment.duration(value, "HH:mm:ss").asSeconds();
        value_seconds = Math.round(value_seconds);
        console.log('value_seconds:' +value_seconds);
        view_duration_seconds.push(value_seconds);

        if( (parseFloat(value_seconds,2) > 5) && (parseFloat(value_seconds,2) < 7201) && (parseFloat(value_seconds,2) > 0) ){
          view_duration_seconds_clean_data.push(value_seconds);  
          view_total_launches_clean_data++;
        }

        view_total_seconds_viewed = view_total_seconds_viewed+value_seconds;
        view_total_launches++;
    });
    // remove any null entries
    view_duration_seconds_clean_data = _.compact(view_duration_seconds_clean_data);
    console.log('oooooooo view_duration_seconds_clean_data ooooooooo');
    console.log(view_duration_seconds_clean_data);
    console.log('view_total_launches_clean_data:' +view_total_launches_clean_data);

    var total_abandoned_or_stalled = view_total_launches-view_total_launches_clean_data;
    console.log('****** total_abandoned_or_stalled:' +total_abandoned_or_stalled);
    $('#total_abandoned_or_stalled').html(total_abandoned_or_stalled);
    
    console.log('view_total_launches = ' +view_total_launches);
    $('#view_total_launches').html(view_total_launches);

    var longest_view_in_module = _.max(view_duration_seconds_clean_data);
    longest_view_in_module = longest_view_in_module/60;
    longest_view_in_module = Math.round(longest_view_in_module);

    console.log('longest_view_in_module (mins): '+longest_view_in_module);
    $('#longest_view_in_module').html(longest_view_in_module);

    var shortest_view_in_module = _.min(view_duration_seconds_clean_data);
    console.log('shortest_view_in_module (secs): '+shortest_view_in_module);
    $('#shortest_view_in_module').html(shortest_view_in_module);

    var average_viewing_length_in_module = view_total_seconds_viewed/view_total_launches;

    console.log('average_viewing_length_in_module (sec): '+average_viewing_length_in_module);
    average_viewing_length_in_module = average_viewing_length_in_module/60;
    // console.log('average_viewing_length_in_module (mins): '+average_viewing_length_in_module);
    average_viewing_length_in_module = Math.round(average_viewing_length_in_module);
    console.log('average_viewing_length_in_module rounded (mins): '+average_viewing_length_in_module);
    $('#average_viewing_length_in_module').html(average_viewing_length_in_module);
    
    
    console.log('##### END view_duration_seconds #######');
  
    // Bar Chart  
    var barData = {
    labels: ['Usage Overview'],
        datasets: [
            { // Comparitive Data Sets
                label: 'Usage Overview',
                fillColor: '#FFEA88',
                data: [view_total_launches]
            },
            {
                label: 'Usage Overview',
                fillColor: '#4ACAB4',
                data: [total_abandoned_or_stalled]
            },
            {
                label: 'Usage Overview',
                fillColor: '#FF8153',
                data: [total_unique_users]
            }
        ]
    };
    var video_views_bar_context = document.getElementById('video_views_bar').getContext('2d');
    var clientsChart = new Chart(video_views_bar_context).Bar(barData);

    // Donut Chart
    // console.log('---- DONUT CHART --------');

    var video_view_duration = document.getElementById("video_view_duration"),
    ctx_video_view_duration = video_view_duration.getContext('2d');

    var video_view_duration_Options = {
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
    var video_view_duration_Data = [
        {
            value: shortest_view_in_module,
            color: "#878BB6"
        },
        {
            value : longest_view_in_module,
            color : "#4ACAB4"
        },
        {
            value : average_viewing_length_in_module,
            color : "#fdd687"
        }
    ];
    
    var myLiveChart_video_view_duration = new Chart(ctx_video_view_duration).Doughnut(video_view_duration_Data,video_view_duration_Options);
    
  }); // end video view duration

  // var url_course_module_duration = base_url + "coursemodule/studentduration/" +moduleid +"/";
}

$('#plan_course_filter').on('change', function() {
    populate_data_content();
});


$( document ).ready(function() {
  // populate_data_content();
}); // end doc ready



/*
// Get all students that have taken Course 30
    
    get selected data-id
    hit endpoint http://akronzip.com/course/duration/30
    build student array
    add student email to array key/value

  
    // for each individual student (course = 30, student = ciscoone~025008514@t2000inc.com)
      
      // get the time spent in each course module

      // http://akronzip.com/coursemodule/courseduration/30/ciscoone~025008514@t2000inc.com
      url_course_module_duration + studentemail
      
      // get the time spent in each module (how do we get all the ID's of all modules within a course?)
      url_course_duration
      // http://akronzip.com/coursemodule/studentduration/10/ciscoone~025008514@t2000inc.com

// get the individual student responses (how do we know if the student response was correct?)
// http://akronzip.com/knowledgecheck/student/ciscoone~025008514@t2000inc.com

// get all of the 'knowledge check' responses for course 30
// http://akronzip.com/knowledgecheck/30
// determine the most common response (e.g. Drop Zone 2)

*/

