/*****************************************************************/
/**************** // TOTARA Data Function  **************/
/*****************************************************************/

$( document ).ready(function() {
$( "#tbody_activity td.timestamp" ).each(function( index ) {
      var dateString = $(this).text();
      dateString = moment(dateString).format('MMMM Do YYYY, h:mm:ss a');
      console.log( index + ": " + dateString );
      $(this).text(dateString);
  });

  $( "#tbody_activity td.level-verb" ).each(function( index ) {
      var textstring = $(this).text();
      if (textstring.toLowerCase().indexOf("arrange") >= 0){
          $(this).addClass(' category-knowledge');    
      }
  });
});

function getAllData(){
  var selected_course_id = 33;
  // ajax URLs

  url_course_students = 'http://www.akronzip.com/lumiousreports/studentdata/628';
  url_course_quiz = 'http://www.akronzip.com/lumiousreports/quizlookup/55';

  // store results from these static URLs as objects to use with promises
  var students = $.getJSON(url_course_students);
  var quizzes = $.getJSON(url_course_quiz);

  // declare variables for student object
  var student_id = null;
  var student_firstname = null;
  var student_lastname = null;

  // declare variables for quiz object
  var quiz_id = null;
  var quiz_course = null;
  var quiz_name = null;

  var student_array = [];
  var quiz_array = [];
  // wait for all three ajax requests to complete before we proceed
  $.when(students,quizzes).done(function(studentobject, quizobject) {

      // dig down to the responseText object
      var s = $.parseJSON(studentobject[2].responseText);
      var q = $.parseJSON(quizobject[2].responseText);

      console.info("Student and Quiz Data for Course " + selected_course_id);
      console.info(s);
      console.info(q);

      // Pull Data from Multiple API Endpoint asynchronoulsy 
      jQuery.each(q, function(i, qdata) {
        console.log('QUIZ DATA');
          quiz_id = qdata.id;
          quiz_course = qdata.course;
          quiz_name = qdata.name;
          quiz_array.push(quiz_id,quiz_course,quiz_name);
          console.log(quiz_array);
      });

      jQuery.each(s, function(i, sdata) {
        console.log('STUDENT DATA');
          student_id = sdata.id;
          student_firstname = sdata.firstname;
          student_lastname = sdata.lastname;
          student_array.push(student_id,student_firstname,student_lastname);
          console.log(student_array);
      });
      // testFlurryAnalytics();
  });
}


function get_totara_activity(){
  // get each student in the course
  // use static data - replace with Endpoint data in the future

  jQuery.each(all_students, function(i, sdata) {

    console.log('sdata');
    console.log(sdata);
    // dive deeping into the array nodes to access the data
    var student_result = sdata;
    student_result = student_result[0];
    student_result = student_result['user'];
    // get all single student data as a clean array
    console.log(student_result);
    // get only the activity log information
    var activity_log =[];
    activity_log = student_result['log'];

    var activity_array = [];
    
    // Pull Data from Multiple Activties Endpoint 
    jQuery.each(activity_log, function(i, adata) {
      var a_row = '<tr>';
      var quizdata = [];
      var quizobject = [];
      

      console.log('activity_log DATA');
      activity_time = adata.timecreated;
      activity_moment = moment.unix(activity_time).format("YYYY/MM/DD hh:mm:ss");
      activity_id = adata.id;
      activity_name = adata.action;
      activity_table = adata.objecttable;
      activity_id = adata.objectid;
      activity_course = adata.courseid;

      
      // @TODO - add catch for failed return - i.e. if no courese id exists
      var course_url = base_url + 'lumiousreports/courselookup/'+activity_course;
      var coursedata = $.getJSON(course_url);

      $.when(coursedata).done(function(courseobject) {
        if (course_name = 'undefined') {
          course_name = '';
        };
        
        var course_name = null;        
        course_name = courseobject[0];
        course_name = course_name.fullname;
        console.log('COURSE NAME: '+course_name);
        
        var quiz_name = null; 
        if (adata.objecttable == 'quiz_attempts') {
         
          console.log('activity_table SWITCH: '+activity_table);
          var quiz_url = base_url + 'lumiousreports/quizlookup/'+adata.objectid;
          console.log('quiz_url '+quiz_url);

          var quizdata = $.getJSON(quiz_url);
          $.when(quizdata).done(function(quizobject) {
            console.log('DOING quizdata JSON call');
            console.log('quizobject');
            console.log(quizobject);
            var quiz_data = quizobject[0];
            console.log(quiz_data);
            var quiz_name = quiz_data.name;
            // quiz_name = quizobject.name;
            // console.log('QUIZ NAME: '+quiz_name);
            // wait for quiz name response before sending result
            a_row  += '<th>'+adata.id+'</th>';
            a_row  += '<th>'+student_result['firstname']+' '+student_result['lastname']+'</th>';
            a_row  += '<th>'+adata.action+'</th>';
            a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
            a_row  += '<th>'+adata.objecttable+'</th>';
            a_row  += '<th><span>(ID '+adata.objectid+')</span> '+quiz_name+'</th>';
            a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
            // add the readable data to the table rows        
            $('#tbody_activity_result').append(a_row);
          }); // end $.when
        }
        else{
          a_row  += '<th>'+adata.id+'</th>';
          a_row  += '<th>'+student_result['firstname']+' '+student_result['lastname']+'</th>';
          a_row  += '<th>'+adata.action+'</th>';
          a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
          a_row  += '<th>'+adata.objecttable+'</th>';
          a_row  += '<th><span>(ID '+adata.objectid+')</span></th>';
          a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
          // add the readable data to the table rows        
          $('#tbody_activity_result').append(a_row);
        } // end if
        
      }); // end $.when

      a_row  += '</tr>';
    }); // end each.activity_log
  }); // end each.all_students
}



/* =======================================
    Show All Students in Selected Course - no filter
* ======================================= */

function show_all_students_activity(){

  console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_all_students_activity   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

  // POPULATE DATA to RESULTS TABLE
  // var selected_course_id = checkLocalStorage('current_course');
  var selected_course_id = 2;

  // console.log('LOCAL STORAGE current_course ' +selected_course_id);
  
  // ajax URLs
  url_course_students = 'http://www.privacyvector.com/api/lumiousreports/students/'+selected_course_id;
  url_student_data = 'http://www.privacyvector.com/api/lumiousreports/studentdata/';

  // store results from these static URLs as objects to use with promises
  var students = $.getJSON(url_course_students);

  // declare variables for student object
  var student_id = null;
  var student_firstname = null;
  var student_lastname = null;
  var student_email = null;
  var student_username = null;
  var student_firstaccess = null;
  var student_lastaccess = null;

  // wait for student ajax request to complete before we proceed
  $.when(students).done(function(studentobject) {

    // dig down to the responseText object
    //var s = $.parseJSON(studentobject[1]);

    console.info("Student Data for Course " + selected_course_id);
    console.info(studentobject);

    // loop through the student object
    jQuery.each(studentobject, function(i, sdata) {
            
        student_id = sdata.id;
        student_firstname = sdata.firstname;
        student_lastname = sdata.lastname;
        student_email = sdata.email;
        student_username = sdata.username;
        student_firstaccess = sdata.firstaccess;
        student_lastaccess = sdata.lastaccess;

        console.log("Checking data for Student ID: " + student_id);

        var student_stress = 'not_set';
        var student_instructor_comments = 'not_set';
        var student_instructor_comments_trimmed = 'not_set';
        var firstaccess_dateVal = student_firstaccess;

        // Format Date
        if (firstaccess_dateVal == 0) {
            var firstaccess_formatted_date = 'Never';
        }else{
            var firstaccess_formatted_date = moment.unix(firstaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');    
        };                      
        var lastaccess_dateVal = student_lastaccess;
        if (lastaccess_dateVal == 0) {
            var lastaccess_formatted_date = 'Never';
        }else{
            var lastaccess_formatted_date = moment.unix(lastaccess_dateVal).format('MMMM Do YYYY, h:mm:ss a');  
        };

        // ajax call to get student data details
        var studentdata = $.getJSON(url_student_data + student_id);

        // Store Details in DNA table values
        sdata['ID'] = student_id;
        sdata['FIRSTNAME'] = student_firstname;
        sdata['LASTNAME'] = student_lastname;
        sdata['EMAIL'] = student_email;
        sdata['USERNAME'] = student_username;
        sdata['FIRSTACCESS'] = student_firstaccess;
        sdata['FIRSTACCESSFORMATTEDDATE'] = firstaccess_formatted_date;
        sdata['LASTACCESS'] = student_lastaccess;
        sdata['LASTACCESSFORMATTEDDATE'] = lastaccess_formatted_date;

        // when ajax call is done
        $.when(studentdata).done(function(studentdataobject) {

            console.log("student data details: ");
            console.log(studentdataobject);

            // Student Notes Content - get array values, manipulate to clean up and use as comments and stress level
            var student_posts = studentdataobject.user["posts"];
            
            console.log(student_posts);

            // ensure the posts object contains usable data
            if(student_posts != undefined){
                $.each(student_posts, function (index, x) {
                  console.log('comment content: ' +x.content + ' publishstate: ' + x.publishstate );
                  student_instructor_comments = x.content;
                  student_instructor_comments_trimmed = student_instructor_comments.trim(); // remove whitespace
                  student_instructor_comments_trimmed = student_instructor_comments.substr(2); // remove first 2 digits for stress level
                  student_stress = student_instructor_comments.substring(0, 2); // take first 2 digits, use as stress setting
                  console.log('Stress content: ' +student_stress + ' student_instructor_comments_trimmed: ' + student_instructor_comments_trimmed );
                  
                  // Add Labels to stress levels
                  if ( student_stress == '20' || student_stress == 'Be' || student_stress == 'Jo' ) {
                      // If entry is a default entry then update the text 
                      sdata['STUDENTSTRESS'] = '<span class="content_not_available">N/A</span>';
                      sdata['STUDENTINSTRUCTORCOMMENTS'] = '<span class="content_not_available">No Comment</span>';
                      
                  }else{
                      // Pass the stress levels html to the data object for dna with the correct label wrapping
                      if (student_stress >= 7) {student_stress = '<span class="student-stress danger label">'+student_stress+'</span>';};
                      if (student_stress < 7) {student_stress = '<span class="student-stress warning label">'+student_stress+'</span>';};
                      if (student_stress < 4) {student_stress = '<span class="student-stress success label">'+student_stress+'</span>';};
                      sdata['STUDENTSTRESS'] = student_stress;
                      sdata['STUDENTINSTRUCTORCOMMENTS'] = student_instructor_comments_trimmed;
                  }
                  console.log(student_stress);
                  console.log(student_instructor_comments_trimmed);
              });
            } // if(student_posts != undefined){
           

            var activity_log =[];
            activity_log = studentdataobject.user["logstore"];;
            console.log(' ^^^^ activity_log ^^^^^^^');
            console.log(activity_log);

            var activity_array = [];
            
            // Pull Data from Multiple Activties Endpoint 
            jQuery.each(activity_log, function(i, adata) {
              var a_row = '<tr>';
              var quizdata = [];
              var quizobject = [];
              

              console.log('activity_log DATA');
              activity_time = adata.timecreated;
              activity_moment = moment.unix(activity_time).format("YYYY/MM/DD hh:mm:ss");
              activity_id = adata.id;
              activity_name = adata.action;
              activity_table = adata.objecttable;
              activity_id = adata.objectid;
              activity_course = adata.courseid;


              
              // @TODO - add catch for failed return - i.e. if no courese id exists
              // @TODO - add new base_url for privacyvector

              // EXAMPLE http://www.privacyvector.com/api/lumiousreports/courselookup/4
              
              // var course_url = base_url + 'lumiousreports/courselookup/'+activity_course;
              var course_url = 'http://www.privacyvector.com/api/lumiousreports/courselookup/'+activity_course;
              var coursedata = $.getJSON(course_url);

              $.when(coursedata).done(function(courseobject) {
                if (course_name = 'undefined') {
                  course_name = '';
                };
                
                var course_name = null;        
                course_name = courseobject[0];
                course_name = course_name.fullname;
                console.log('COURSE NAME: '+course_name);
                
                var quiz_name = null; 
                if (adata.objecttable == 'quiz_attempts') {
                 
                  console.log('activity_table SWITCH: '+activity_table);
                  var quiz_url = base_url + 'lumiousreports/quizlookup/'+adata.objectid;
                  console.log('quiz_url '+quiz_url);

                  var quizdata = $.getJSON(quiz_url);
                  $.when(quizdata).done(function(quizobject) {
                    console.log('DOING quizdata JSON call');
                    console.log('quizobject');
                    console.log(quizobject);
                    var quiz_data = quizobject[0];
                    console.log(quiz_data);
                    var quiz_name = quiz_data.name;
                    // quiz_name = quizobject.name;
                    // console.log('QUIZ NAME: '+quiz_name);
                    // wait for quiz name response before sending result
                    a_row  += '<th>'+adata.id+'</th>';
                    a_row  += '<th>'+student_firstname+' '+student_lastname+'</th>';
                    a_row  += '<th>'+adata.action+'</th>';
                    a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
                    a_row  += '<th>'+adata.objecttable+'</th>';
                    a_row  += '<th><span>(ID '+adata.objectid+')</span> '+quiz_name+'</th>';
                    a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
                    // add the readable data to the table rows        
                    $('#tbody_activity_result').append(a_row);
                  }); // end $.when
                }
                else{
                  a_row  += '<th>'+adata.id+'</th>';
                  a_row  += '<th>'+student_result['firstname']+' '+student_result['lastname']+'</th>';
                  a_row  += '<th>'+adata.action+'</th>';
                  a_row  += '<th>'+adata.courseid+' '+course_name+'</th>';
                  a_row  += '<th>'+adata.objecttable+'</th>';
                  a_row  += '<th><span>(ID '+adata.objectid+')</span></th>';
                  a_row  += '<th><span class="hidden">'+activity_time+'</span>'+activity_moment+'</th>';
                  // add the readable data to the table rows        
                  $('#tbody_activity_result').append(a_row);
                } // end if
                
              }); // end $.when

              a_row  += '</tr>';
            }); // end each.activity_log
        }); // END $.when(studentdata).d
    }); // jQuery.each(studentobject,
    // $('#loading_gif').hide();
  });
  console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_all_students_activity    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
}