/*****************************************************************/
/******************** Testing Only Functions  *********************/
/*****************************************************************/

// var user = [];
user = {
    email: 'ben.porcelain@gmail.com',
    firstname: 'Joe',
    lastname: 'Average',
    roles: 'ROLE_USER'
};
// console.log('user.roles = '+user.roles);
message = {
            id: 0
}
fb = {
    client_id: '',
    redirect_url: 'http://ciscolive.lumious.co/oauth/redirect/facebook'
};
/*
// test_arr = student_result_id_17[0];
// test_arr = test_arr["user"];
// console.log(test_arr);

// var test_ID = 17;
// var TESTfindItemByID = findItemByID(test_arr,test_ID);

// work_in_progress();

var all_students = [];
all_students.push(student_result_id_17);
all_students.push(student_result_id_4);
console.log('find 17');
// for json storage items must stringify and parse
findItemByID(all_students,'17','all_students');
// WORKS

var all_courses = [];
all_courses.push(course_1);
all_courses.push(course_2);
console.log('find course id 2');
// for json storage items must stringify and parse
var c = findItemByID(all_courses,'1','all_courses');
console.log('c result');
console.log(c);
// WORKS


var item_storage_data = JSON.stringify(all_students);
// item_storage_data = item_storage_data[1];
localStorage.setItem( 'all_students',item_storage_data);
var string_arr = checkStorageItem('all_students');
var arr = JSON.parse(string_arr); 
// findItemByID(all_students,'4','all_students');
console.log('find 4');
// ID 4 search in all_students array from storage returns all the student data
var s = findItemByID(arr,'4','all_students');
console.log('s result');
console.log(s);
              
*/

// getItemDataFromEndpoint("6","course","get_startdate");
// getFlurryAppInfo();
// getFlurryAllAppsInfo();
// testFlurryAnalytics();
// getCustomEventSummaryData();
// localStorage.setItem( 'session_item_data_array','');
// temp_set_course_data();
// all_students.push(student_result_id_4);
// all_students.push(student_result_id_17);
// console.log('all_students');
// console.log(all_students);

//get_totara_activity();

// $('#mef_reports').show();

$(".get_item_data").click(function() {
  get_item_data("9","course","get_startdate");
});

function generate_table_row(){
  // pull exising DOM population elements from query
  // alert('generate_table_row FIRED');
}


var all_students = []
var student_17object = [];
var student_4object = [];

var student_result_id_17;
var student_result_id_4;

// var student_17_url = 'http://www.privacyvector.com/api/lumiousreports/studentdata/17';
var student_17_url = 'http://www.akronzip.com/lumiousreports/studentdata/17';
var student_4_url = 'http://www.privacyvector.com/api/lumiousreports/studentdata/4';

$("#pull_student_data").click(function() {
  alert('show_all_students_activity CLICK');
  // pull_student_data();
  show_all_students_activity();
});

function pull_student_data(){

  console.log('pull_student_data FUNCITON');
  console.log('student_17_url: '+student_17_url);
  console.log('student_4_url: '+student_4_url);

  $.when(student_17_url,student_4_url).done(function(student_17object, student_4object) {
    console.log('getting url_Student data...');
    all_students.push(student_17object);
    console.log(student_4object);
    console.log(student_17object);
  });
}


/*****************************************************************/
/******************** Testing Only Data  *********************/
/*****************************************************************/

// TEMP DATA for testing without having to hit the endpoing (no internet connection etc)
var course_data = [];
function temp_set_course_data(){

  var course_data = [
    {
      "id": "1",
      "category": "0",
      "fullname": "Comstor LMS",
      "shortname": "comstor",
      "startdate": "0"
    },
    {
      "id": "2",
      "category": "1",
      "fullname": "Test course ",
      "shortname": "test_course",
      "startdate": "1439938800"
    },
    {
      "id": "4",
      "category": "25",
      "fullname": "Collaboration Course",
      "shortname": "Collab",
      "startdate": "1444107600"
    },
    {
      "id": "5",
      "category": "26",
      "fullname": "Twitter Content",
      "shortname": "TWITTER",
      "startdate": "1444345200"
    },
    {
      "id": "6",
      "category": "21",
      "fullname": "Test course",
      "shortname": "Tes",
      "startdate": "1444777200"
    },
    {
      "id": "7",
      "category": "27",
      "fullname": "Testing",
      "shortname": "TEST",
      "startdate": "1445036400"
    }
  ];
  // console.log('FULL course_data object');                  
  // console.log(course_data);                  
  var data = JSON.stringify(course_data);
  localStorage.setItem( 'session_item_data_array',data);
  // console.log('*********** END temp_set_course_data *****************')
}


var course_1 = [{
    "id": "1",
    "category": "0",
    "fullname": "Comstor LMS",
    "shortname": "comstor",
    "startdate": "0"
  }
];
var course_2 = [{
    "id": "2",
    "category": "1",
    "fullname": "Test course ",
    "shortname": "test_course",
    "startdate": "1439938800"
  }
];
var student_result_id_17 = [{
  "user": {
    "id": "17",
    "username": "jbandlow",
    "firstname": "Joanne",
    "lastname": "Bandlow",
    "email": "Joanne.bandlow@twcable.com",
    "city": "Herndon",
    "country": "US",
    "lang": "en",
    "timezone": "99",
    "firstaccess": "1375713529",
    "lastaccess": "1428695804",
    "lastlogin": "1428679875",
    "currentlogin": "1428695537",
    "lastip": "65.189.101.222",
    "picture": "0",
    "url": "",
    "timecreated": "1375461523",
    "timemodified": "1375461523",
    "log": [
      {
        "id": "7825", 
        "action": "viewed", 
        "target": "attempt", 
        "objecttable": "quiz_attempts", 
        "objectid": "5", 
        "edulevel": "2", 
        "contextid": "105", 
        "contextlevel": "70", 
        "contextinstanceid": "22", 
        "userid": "17",
        "courseid": "5", 
        // "other": "a:1:{s:6:"quizid";s:1:"2";}", 
        "timecreated": "1447372654", 
        "origin": "web"
      },
      {
        "id": "7828", 
        "action": "viewed", 
        "target": "course_module", 
        "objecttable": "quiz", 
        "objectid": "2", 
        "edulevel": "2", 
        "contextid": "105", 
        "contextlevel": "70", 
        "contextinstanceid": "22", 
        "userid": "17",
        "courseid": "5", 
        "other": "N;", 
        "timecreated": "1447372676", 
        "origin": "web"
      }
    ]
  }
}];

var student_result_id_4 = [{
  "user": {
    "id": "4",
    "username": "testuser2",
    "firstname": "Bob",
    "lastname": "Testable",
    "email": "chris.h.devries+testuser2@gmail.com",
    "city": "Herndon",
    "country": "US",
    "lang": "en",
    "timezone": "99",
    "firstaccess": "1372297375",
    "lastaccess": "1375473515",
    "lastlogin": "1372791844",
    "currentlogin": "1375473332",
    "lastip": "69.132.7.103",
    "picture": "0",
    "url": "",
    "timecreated": "1372181144",
    "timemodified": "1372181144",
    "posts": [
      
    ],
    "log": [
      {
        "id": "5135", 
        "action": "viewed", 
        "target": "course_module", 
        "objecttable": "url", 
        "objectid": "5", 
        "edulevel": "2", 
        "contextid": "109", 
        "contextlevel": "70", 
        "contextinstanceid": "25", 
        "userid": "4",
        "courseid": "4", 
        // "other": "N;", 
        "timecreated": "1446482426", 
        "origin": "web"
      },
      {
        "id": "5236", 
        "action": "deleted", 
        "target": "course_module", 
        "objecttable": "quiz", 
        "objectid": "25", 
        "edulevel": "1", 
        "contextid": "109", 
        "contextlevel": "70", 
        "contextinstanceid": "25", 
        "userid": "4",
        "courseid": "4", 
        // "other": "a:2:{s:10:"modulename";s:3:"url";s:10:"instanceid"...", 
        "timecreated": "1446486235", 
        "origin": "web"
      }
    ]
  }
}];