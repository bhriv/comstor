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
var student_17_url = 'http://comstor.lumiousanalytics.com/api/lumiousreports/studentdata/17';
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
  console.log('FULL course_data object');                  
  console.log(course_data);                  
  var data = JSON.stringify(course_data);
  localStorage.setItem( 'session_item_data_array',data);
  console.log('*********** END temp_set_course_data *****************');
  return data;
}

// TEMP DATA for testing without having to hit the endpoing (no internet connection etc)
var quiz_data = [];
function temp_set_quiz_data(){

  var quiz_data = [
    {
        "id": "1",
        "course": "2",
        "name": "Test quiz/assessment",
        "sumgrades": "1.00000",
        "grade": "10.00000"
    },
    {
        "id": "2",
        "course": "99",
        "name": "Bens Fake Quiz",
        "sumgrades": "0.90000",
        "grade": "9.90000"
    }
  ];
  console.log('FULL quiz_data object');                  
  console.log(quiz_data);                  
  var data = JSON.stringify(quiz_data);
  localStorage.setItem( 'session_item_quiz_data',data);
  console.log('*********** END temp_set_quiz_data *****************');
  return data;
}

// TEMP DATA for testing without having to hit the endpoing (no internet connection etc)
var quizattempt_data = [];
function temp_set_quizattempt_data(){

  var quizattempt_data = [
    {
        "id": "12",
        "quiz": "2",
        "userid": "18",
        "attempt": "1",
        "uniqueid": "12",
        "timestart": "1449854318",
        "timefinish": "1449854898",
        "timemodified": "1449854898",
        "timecheckstate": null,
        "sumgrades": "0.00000"
    },
    {
        "id": "13",
        "quiz": "2",
        "userid": "18",
        "attempt": "2",
        "uniqueid": "13",
        "timestart": "1449855003",
        "timefinish": "1449855012",
        "timemodified": "1449855012",
        "timecheckstate": null,
        "sumgrades": "0.00000"
    },
    {
        "id": "14",
        "quiz": "2",
        "userid": "18",
        "attempt": "3",
        "uniqueid": "14",
        "timestart": "1449855484",
        "timefinish": "1449855498",
        "timemodified": "1449865746",
        "timecheckstate": null,
        "sumgrades": "9.50000"
    }
  ];
  console.log('FULL quizattempt_data object');                  
  console.log(quizattempt_data);                  
  var data = JSON.stringify(quizattempt_data);
  localStorage.setItem( 'session_item_quizattempt_data',data);
  console.log('*********** END temp_set_quizattempt_data *****************');
  return data;
}


// // WORKING TESTS USING STATIC TEST DATA in testing-only.js

//  var all_students = [];
//   all_students.push(student_result_id_17);
//   all_students.push(student_result_id_4);
//   cc('STUDENT TEST: IF SUCCESS console will iterate through array, list each ID found, stop if ID matches search, say success','warning');
//   var all_students_data_object = dataType(all_students,'object');
//   findItemByID(all_students,'17','all_students');
  
//   cc('set temp_set_course_data','info');
//   var course_data = temp_set_course_data();
//   // ensure data passed is an object
//   var course_data_object = dataType(course_data,'object');
//   cc('COURSE TEST: IF SUCCESS console will iterate through array, list each ID found, stop if ID matches search, say success','warning');
//   // for json storage items must stringify and parse
//   findItemByID(course_data_object,'4','courses');


//   cc('set temp_set_quizattempt_data','info');
//   var quizattempt_data = temp_set_quizattempt_data();
//   // ensure data passed is an object
//   var quizattempt_data_object = dataType(quizattempt_data,'object');
//   cc('QUIZATTEMPT TEST: IF SUCCESS console will iterate through array, list each ID found, stop if ID matches search, say success','warning');
//   findItemByID(quizattempt_data_object,'14','quizattempt');
  

//   cc('set temp_set_quiz_data','info');
//   var quiz_data = temp_set_quiz_data();
//   // ensure data passed is an object
//   var quiz_data_object = dataType(quiz_data,'object');
//   cc('QUIZ TEST: IF SUCCESS console will iterate through array, list each ID found, stop if ID matches search, say success','warning');
//   findItemByID(quiz_data_object,'2','quiz');
// // END - -------- WORKING TESTS USING STATIC TEST DATA in testing-only.js




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


var course_cat_data = [];
course_cat_data = [
    {
        "id": "1",
        "name": "Miscellaneous",
        "idnumber": null,
        "description": null,
        "descriptionformat": "0",
        "parent": "0",
        "sortorder": "10000",
        "coursecount": "18",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1439909344",
        "depth": "1",
        "path": "/1",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "13",
        "name": "4th sub level",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "1",
        "sortorder": "20000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1440095600",
        "depth": "2",
        "path": "/1/13",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "14",
        "name": "5th sub level",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "13",
        "sortorder": "30000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1440095613",
        "depth": "3",
        "path": "/1/13/14",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "15",
        "name": "6th sub level",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "14",
        "sortorder": "40000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1440095626",
        "depth": "4",
        "path": "/1/13/14/15",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "16",
        "name": "7th sub level",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "15",
        "sortorder": "50000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1440095638",
        "depth": "5",
        "path": "/1/13/14/15/16",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "17",
        "name": "8th sub level",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "16",
        "sortorder": "60000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1440095651",
        "depth": "6",
        "path": "/1/13/14/15/16/17",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "18",
        "name": "9th sublevel",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "17",
        "sortorder": "70000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1440095662",
        "depth": "7",
        "path": "/1/13/14/15/16/17/18",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "19",
        "name": "Sales Enablement",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "26",
        "sortorder": "200000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1443796414",
        "depth": "2",
        "path": "/26/19",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "20",
        "name": "Architectures",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "19",
        "sortorder": "210000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1444156232",
        "depth": "3",
        "path": "/26/19/20",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "21",
        "name": "EDGE Partner Info",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "19",
        "sortorder": "550000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453782115",
        "depth": "3",
        "path": "/26/19/21",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "22",
        "name": "SPIFFs and Promotions",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "19",
        "sortorder": "610000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453783381",
        "depth": "3",
        "path": "/26/19/22",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "23",
        "name": "Tools",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "19",
        "sortorder": "660000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1444156305",
        "depth": "3",
        "path": "/26/19/23",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "24",
        "name": "EDGE Program",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "21",
        "sortorder": "560000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453782182",
        "depth": "4",
        "path": "/26/19/21/24",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "27",
        "name": "Testing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "0",
        "sortorder": "780000",
        "coursecount": "2",
        "visible": "0",
        "visibleold": "0",
        "timemodified": "1445024719",
        "depth": "1",
        "path": "/27",
        "theme": null,
        "programcount": "0",
        "certifcount": "1",
        "display": "display"
    },
    {
        "id": "40",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "39",
        "sortorder": "680000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1447958418",
        "depth": "5",
        "path": "/26/19/23/39/40",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "93",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "23",
        "sortorder": "690000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1448062866",
        "depth": "4",
        "path": "/26/19/23/93",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "97",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "1",
        "sortorder": "130000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449244327",
        "depth": "2",
        "path": "/1/97",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "98",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "97",
        "sortorder": "140000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449244351",
        "depth": "3",
        "path": "/1/97/98",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "99",
        "name": "Cloud",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "20",
        "sortorder": "220000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449246179",
        "depth": "4",
        "path": "/26/19/20/99",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "101",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "97",
        "sortorder": "150000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449246380",
        "depth": "3",
        "path": "/1/97/101",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "104",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "99",
        "sortorder": "230000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449249139",
        "depth": "5",
        "path": "/26/19/20/99/104",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "105",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "104",
        "sortorder": "240000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449249159",
        "depth": "6",
        "path": "/26/19/20/99/104/105",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "106",
        "name": "BlueSky",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "99",
        "sortorder": "260000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449249587",
        "depth": "5",
        "path": "/26/19/20/99/106",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "107",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "106",
        "sortorder": "270000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453769708",
        "depth": "6",
        "path": "/26/19/20/99/106/107",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "108",
        "name": "Collaboration",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "20",
        "sortorder": "320000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449249951",
        "depth": "4",
        "path": "/26/19/20/108",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "109",
        "name": "GR8 Summit Challenge",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "108",
        "sortorder": "330000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453771059",
        "depth": "5",
        "path": "/26/19/20/108/109",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "110",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "109",
        "sortorder": "340000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449249984",
        "depth": "6",
        "path": "/26/19/20/108/109/110",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "112",
        "name": "Comstor",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "1",
        "sortorder": "80000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449250476",
        "depth": "2",
        "path": "/1/112",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "113",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "112",
        "sortorder": "90000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449250490",
        "depth": "3",
        "path": "/1/112/113",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "114",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "1",
        "sortorder": "100000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449252227",
        "depth": "2",
        "path": "/1/114",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "115",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "114",
        "sortorder": "110000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449252244",
        "depth": "3",
        "path": "/1/114/115",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "116",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "<p>&nbsp;</p>",
        "descriptionformat": "1",
        "parent": "114",
        "sortorder": "120000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449252689",
        "depth": "3",
        "path": "/1/114/116",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "117",
        "name": "Data Center",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "20",
        "sortorder": "360000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449255050",
        "depth": "4",
        "path": "/26/19/20/117",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "118",
        "name": "GR8 Summit Challenge",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "117",
        "sortorder": "370000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453772604",
        "depth": "5",
        "path": "/26/19/20/117/118",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "119",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "118",
        "sortorder": "380000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453772801",
        "depth": "6",
        "path": "/26/19/20/117/118/119",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "120",
        "name": "Enterprise Networking",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "20",
        "sortorder": "390000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449255475",
        "depth": "4",
        "path": "/26/19/20/120",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "121",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "120",
        "sortorder": "400000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453773979",
        "depth": "5",
        "path": "/26/19/20/120/121",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "124",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "1",
        "sortorder": "160000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449255872",
        "depth": "2",
        "path": "/1/124",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "125",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "121",
        "sortorder": "410000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449256037",
        "depth": "6",
        "path": "/26/19/20/120/121/125",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "126",
        "name": "Security",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "20",
        "sortorder": "450000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449256613",
        "depth": "4",
        "path": "/26/19/20/126",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "127",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "126",
        "sortorder": "460000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449256644",
        "depth": "5",
        "path": "/26/19/20/126/127",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "128",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "127",
        "sortorder": "470000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449256667",
        "depth": "6",
        "path": "/26/19/20/126/127/128",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "129",
        "name": "GR8 Summit Challenge",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "126",
        "sortorder": "480000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453776342",
        "depth": "5",
        "path": "/26/19/20/126/129",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "130",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "129",
        "sortorder": "490000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453776498",
        "depth": "6",
        "path": "/26/19/20/126/129/130",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "133",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "1",
        "sortorder": "180000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449259573",
        "depth": "2",
        "path": "/1/133",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "134",
        "name": "Services",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "20",
        "sortorder": "500000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449259757",
        "depth": "4",
        "path": "/26/19/20/134",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "135",
        "name": "GR8 Summit Challenge",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "134",
        "sortorder": "510000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453778077",
        "depth": "5",
        "path": "/26/19/20/134/135",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "136",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "135",
        "sortorder": "520000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449259784",
        "depth": "6",
        "path": "/26/19/20/134/135/136",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "137",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "134",
        "sortorder": "530000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449259931",
        "depth": "5",
        "path": "/26/19/20/134/137",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "139",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "93",
        "sortorder": "700000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449602777",
        "depth": "5",
        "path": "/26/19/23/93/139",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "140",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "93",
        "sortorder": "710000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1449604887",
        "depth": "5",
        "path": "/26/19/23/93/140",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "142",
        "name": "New Hire Training",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "0",
        "sortorder": "790000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1450824330",
        "depth": "1",
        "path": "/142",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "146",
        "name": "GR8 Summit Sales Challenge",
        "idnumber": "GR8101",
        "description": "<p>In order to help our sales team focus on the necessary business insights of Cisco and to drive results under tough circumstances, Chris Mills and the PM department developed the GR8 Summit Sales Challenge!</p><p>Gain feet and help your team climb the necessary fourteeners. &nbsp;The more success you and your team have the more opportunity you have to win some money!&nbsp;</p>",
        "descriptionformat": "1",
        "parent": "0",
        "sortorder": "800000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1452617166",
        "depth": "1",
        "path": "/146",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "147",
        "name": "Cirrity",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "99",
        "sortorder": "280000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453770154",
        "depth": "5",
        "path": "/26/19/20/99/147",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "148",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "147",
        "sortorder": "290000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453770201",
        "depth": "6",
        "path": "/26/19/20/99/147/148",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "149",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "109",
        "sortorder": "350000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453771825",
        "depth": "6",
        "path": "/26/19/20/108/109/149",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "150",
        "name": "GR8 Summit Challenge",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "1",
        "sortorder": "170000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453774160",
        "depth": "2",
        "path": "/1/150",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "151",
        "name": "GR8 Summit Challenge",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "120",
        "sortorder": "420000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453774318",
        "depth": "5",
        "path": "/26/19/20/120/151",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "152",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "151",
        "sortorder": "430000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453774341",
        "depth": "6",
        "path": "/26/19/20/120/151/152",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "153",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "151",
        "sortorder": "440000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453774376",
        "depth": "6",
        "path": "/26/19/20/120/151/153",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "154",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "104",
        "sortorder": "250000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453775568",
        "depth": "6",
        "path": "/26/19/20/99/104/154",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "155",
        "name": "GR8 Summit Challenge",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "99",
        "sortorder": "300000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453776643",
        "depth": "5",
        "path": "/26/19/20/99/155",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "156",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "155",
        "sortorder": "310000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453776661",
        "depth": "6",
        "path": "/26/19/20/99/155/156",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "158",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "137",
        "sortorder": "540000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453777710",
        "depth": "6",
        "path": "/26/19/20/134/137/158",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "159",
        "name": "Sales",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "23",
        "sortorder": "720000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453779127",
        "depth": "4",
        "path": "/26/19/23/159",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "160",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "159",
        "sortorder": "730000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453779179",
        "depth": "5",
        "path": "/26/19/23/159/160",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "161",
        "name": "BDM Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "23",
        "sortorder": "740000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453781218",
        "depth": "4",
        "path": "/26/19/23/161",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "162",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "161",
        "sortorder": "750000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453781254",
        "depth": "5",
        "path": "/26/19/23/161/162",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "163",
        "name": "Operations",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "23",
        "sortorder": "760000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453781796",
        "depth": "4",
        "path": "/26/19/23/163",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "164",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "163",
        "sortorder": "770000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453781813",
        "depth": "5",
        "path": "/26/19/23/163/164",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "165",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "24",
        "sortorder": "570000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453782471",
        "depth": "5",
        "path": "/26/19/21/24/165",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "166",
        "name": "Logistics and Integration",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "21",
        "sortorder": "580000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453783028",
        "depth": "4",
        "path": "/26/19/21/166",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "167",
        "name": "Partner Facing",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "166",
        "sortorder": "590000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453783049",
        "depth": "5",
        "path": "/26/19/21/166/167",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "168",
        "name": "Cisco",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "22",
        "sortorder": "620000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453783392",
        "depth": "4",
        "path": "/26/19/22/168",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "169",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "168",
        "sortorder": "630000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453783435",
        "depth": "5",
        "path": "/26/19/22/168/169",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "170",
        "name": "Services",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "22",
        "sortorder": "640000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453783458",
        "depth": "4",
        "path": "/26/19/22/170",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "171",
        "name": "Internal Only",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "170",
        "sortorder": "650000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453783483",
        "depth": "5",
        "path": "/26/19/22/170/171",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    },
    {
        "id": "172",
        "name": "Comstor Climb",
        "idnumber": "",
        "description": "<p>Overall curriculum and courses to help you setup and learn Comstor Climb.</p>",
        "descriptionformat": "1",
        "parent": "0",
        "sortorder": "810000",
        "coursecount": "6",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453936252",
        "depth": "1",
        "path": "/172",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "display"
    }
];


var course_hidden_cat_data = [
    {
        "id": "26",
        "name": "iPad App Content",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "0",
        "sortorder": "190000",
        "coursecount": "1",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1444309929",
        "depth": "1",
        "path": "/26",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "hide"
    },
    {
        "id": "39",
        "name": "Management",
        "idnumber": "",
        "description": "",
        "descriptionformat": "1",
        "parent": "23",
        "sortorder": "670000",
        "coursecount": "0",
        "visible": "1",
        "visibleold": "1",
        "timemodified": "1453781127",
        "depth": "4",
        "path": "/26/19/23/39",
        "theme": null,
        "programcount": "0",
        "certifcount": "0",
        "display": "hide"
    }
];

