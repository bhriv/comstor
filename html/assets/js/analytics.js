
/**
 * Author: Bret Van Horn
 * 
 */
$( document ).ready(function() {

	//renderDash();

	var loader = $('.loading');
	//hideLoader();

	function renderDash(){

	    var base_url = urls.analytics;
	    var user_roles = user.roles;
	//	var base_url = "http://akronzip.com/";
		var url_activelearners = base_url + "activelearners";
		var url_challenges = base_url + "challenges";
		var url_remediations = base_url +"remediations";
		
		var url_alerts = base_url + "alerts";
		var url_openalerts = base_url +"openalerts";
		
		var url_activitygraph = base_url + "activitygraph";
		var url_usergraph = base_url +"usergraph";
		var url_messagegraph = base_url + "messagegraph";
		
		var url_plan = base_url + "plan";

		var url_activityfeed = base_url + "statement";

		var url_verbtrends = base_url + "verbtrends";
		var url_usertrends = base_url + "actortrends";
		var url_activitytrends = base_url + "targettrends";

		var url_quiz_reports = base_url + "results";

		var url_course_students = base_url + "results/courselist/";
		
		var analytics_mode = checkLocalStorage('filter_mode');

		//override analytics mode based on user type
		/*if(searchRoles('ROLE_INSTRUCTOR')){
			analytics_mode = "courseplan";
		}*/
		
		if (analytics_mode == "plan") {
			var planid = checkLocalStorage('current_plan');
			
			url_activelearners = base_url + "planusers/"+planid;
			url_challenges = base_url + "planchallenges/"+planid;
			url_remediations = base_url +"planremediations/"+planid;
			
			url_activitygraph = base_url + "planactivitygraph/"+planid;
			url_usergraph = base_url +"planusergraph/"+planid;
			url_messagegraph = base_url + "planmessagegraph/"+planid;
			
			url_plan = base_url + "courseplan/"+planid;

			url_activityfeed = base_url + "planstatement/"+planid;

			url_verbtrends = base_url + "planverbtrends/"+planid;
			url_usertrends = base_url + "planactortrends/"+planid;
			url_activitytrends = base_url + "plantargettrends/"+planid;

			url_quiz_reports = base_url + "results/plan/"+planid;
			var url_course_students = base_url + "results/planlist/"+planid;
			
		} else if (analytics_mode == "courseplan") {
			var courseid = checkLocalStorage('current_course');
			//override analytics mode based on user type
			/*if(searchRoles('ROLE_INSTRUCTOR')){
				// temporarily hardcoding this for demo/testing
				courseid = 4;
			}*/
			url_activelearners = base_url + "courseusers/"+courseid;
			url_challenges = base_url + "coursechallenges/"+courseid;
			url_remediations = base_url +"courseremediations/"+courseid;
			
			url_activitygraph = base_url + "courseactivitygraph/"+courseid;
			url_usergraph = base_url +"courseusergraph/"+courseid;
			url_messagegraph = base_url + "coursemessagegraph/"+courseid;
			
			url_plan = base_url + "courseplan/"+courseid;

			url_activityfeed = base_url + "coursestatement/"+courseid;

			url_verbtrends = base_url + "courseverbtrends/"+courseid;
			url_usertrends = base_url + "courseactortrends/"+courseid;
			url_activitytrends = base_url + "coursetargettrends/"+courseid;

			url_quiz_reports = base_url + "results/course/"+courseid;
			var url_course_students = base_url + "results/courselist/"+courseid;


		} else if (analytics_mode == "sessionplan") {
			var sessionid = checkLocalStorage('current_session');
			
			url_activelearners = base_url + "sessionusers/"+sessionid;
			url_challenges = base_url + "sessionchallenges/"+sessionid;
			url_remediations = base_url +"sessionremediations/"+sessionid;
			
			url_activitygraph = base_url + "sessionactivitygraph/"+sessionid;
			url_usergraph = base_url +"sessionusergraph/"+sessionid;
			url_messagegraph = base_url + "sessionmessagegraph/"+sessionid;
			
			url_plan = base_url + "sessionplan/"+sessionid;

			url_activityfeed = base_url + "sessionstatement/"+sessionid;

			url_verbtrends = base_url + "sessionverbtrends/"+sessionid;
			url_usertrends = base_url + "sessionactortrends/"+sessionid;
			url_activitytrends = base_url + "sessiontargettrends/"+sessionid;

			url_quiz_reports = base_url + "results/session/"+sessionid;
			url_course_students = base_url + "results/sessionlist/"+sessionid;

		} else if (analytics_mode == "actorplan") {
			var actor = checkLocalStorage('current_actor');
			url_challenges = base_url + "actorchallenges/"+actor;
			url_remediations = base_url +"actorremediations/"+actor;
			url_activitygraph = base_url + "actoractivitygraph/"+actor;
			url_messagegraph = base_url + "actormessagegraph/"+actor;
			url_activityfeed = base_url + "actorstatement/"+actor;
			url_verbtrends = base_url + "actorverbtrends/"+actor;
			url_activitytrends = base_url + "actortargettrends/"+actor;
			
			url_quiz_reports = base_url + "results/actor/"+actor;
			url_course_students = base_url + "results/actorlist/"+actor;
			// 

		} 
		
		//ACTIVE LEARNERS
		$.getJSON( url_activelearners, function( json ) {
			$("#total_users").html(json.total);
			$("#active_users").html(json.active);
			$("#exhaustion_rate").html(json.inactive);
			$("#total_alerts").html(json.alerts);
		 });

		//CHALLENGES
		$.getJSON( url_challenges, function( json ) {
			$("#challenges_views").html(json.views);
			$("#challenges_submissions").html(json.submissions);
			$("#challenges_badges_awarded").html(json.badges_awarded);
			$("#challenges_alerts").html(json.alerts);
		 });

		//REMEDIATIONS
		$.getJSON( url_remediations, function( json ) {
			$("#remediation_enrolled").html(json.enrolled);
			$("#remediation_submissions").html(json.submissions);
			$("#remediation_converted").html(json.converted);
			$("#remediation_new").html(json.new);
		 });

		
		//ALERTS
		$.getJSON( url_openalerts, function( json ) {
			$("#openalerts_foryou").html(json.for_you);
			$("#openalerts_yourinstance").html(json.your_instance);
			$("#openalerts_good").html(json.good);
			$("#openalerts_bad").html(json.bad);
			$("#openalerts_solved").html(json.solved);
		 });
		
		//OPEN ALERTS
		$.getJSON( url_alerts, function( json ) {
			
			var tbody_alerts = $("#tbody_alerts");

			tbody_alerts.empty();
			
			jQuery.each(json, function(i, val) {
				tbody_alerts.append("<tr><td><input type='checkbox' id='row-"+i+"-select' name='row"+i+"select' value='true'></td>"+
						"<td><span class='status-sort'>d</span><i class='icon-dot red'></i></td>"+
						"<td>"+ val.ID +"</td>" +
						"<td>"+ val.Subject +"</td>" +
						"<td>"+ val.Requestor +"</td>" +
						"<td>"+ val.Updated +"</td>" +
						"<td>"+ val.Type +"</td>" +
						"<td>"+ val.Assignee +"</td>"				
					);
			});
			
		 });


		// quiz reports 
		var quizreports = $('#quiz-results');
		var quizreports_loop = 0;

		if(quizreports.length > 0){
			quizreports_loop++;
			quizreports.hide();
			console.log('------------------ quizreports_loop '+quizreports_loop +' ------------------ ');

			// $.getJSON( url_quiz_reports, function( json ) {

			// 	if(!("failed" in json)){
			// 		json.failed = [];
			// 		json.failed.Total = 0;
			// 		json.failed['Average Minutes'] = 0;
			// 	}

			// 	if(!("passed" in json)){
			// 		json.passed = [];
			// 		json.passed.Total = 0;
			// 		json.passed['Average Minutes'] = 0;
			// 	}

			// 	var failed = Math.round(json.failed.Total);
			// 	var passed = Math.round(json.passed.Total);
			// 	var totalQuizzes = Math.round(passed + failed);
			// 	var hasCourse = checkLocalStorage('current_course');
			// 	var studentList = $('#student-list');
			// 	var averageMin = Math.round(json.passed['Average Minutes']);

			// 	studentList.hide();

			// 	// ORIGINAL DNA STUDENTS POSITION

			// 	// build solid gauge charts
			//     var passedOptions = {

			//         chart: {
			//             type: 'solidgauge',
			//             style: {
			//             	fontFamily: 'Open Sans Condensed'
			//             },
			//             backgroundColor: '#E8FAEA'
			//         },

			//         title: null,

			//         pane: {
			//             center: ['50%', '85%'],
			//             size: '140%',
			//             startAngle: -90,
			//             endAngle: 90,
			//             background: {
			//                 backgroundColor: '#FFF',
			//                 innerRadius: '60%',
			//                 outerRadius: '100%',
			//                 shape: 'arc'
			//             }
			//         },

			//         tooltip: {
			//             enabled: false
			//         },

			//         // the value axis
			//         yAxis: {
			//             stops: [
			//                 [0.1, '#DF5353'], // red
			//                 [0.5, '#DDDF0D'], // yellow
			//                 [0.9, '#55BF3B'] // green      
			//             ],
			//             lineWidth: 0,
			//             minorTickInterval: null,
			//             tickPixelInterval: totalQuizzes*2,
			//             tickWidth: 0,
			//             title: {
			//                 y: -70,
			//                 style: {
			//                 	color: '#555555',
			//                 	fontWeight: 'bold'
			//                 }
			//             },
			//             labels: {
			//                 y: 16
			//             }
			//         },

			//         plotOptions: {
			//             solidgauge: {
			//                 dataLabels: {
			//                     y: 5,
			//                     borderWidth: 0,
			//                     useHTML: true
			//                 }
			//             }
			//         }
			//     };
			    
			//     var failedOptions = {

			//         chart: {
			//             type: 'solidgauge',
			//             style: {
			//             	fontFamily: 'Open Sans Condensed'
			//             },
			//             backgroundColor: '#FAE8E8'
			//         },

			//         title: null,

			//         pane: {
			//             center: ['50%', '85%'],
			//             size: '140%',
			//             startAngle: -90,
			//             endAngle: 90,
			//             background: {
			//                 backgroundColor: '#FFF',
			//                 innerRadius: '60%',
			//                 outerRadius: '100%',
			//                 shape: 'arc'
			//             }
			//         },

			//         tooltip: {
			//             enabled: false
			//         },

			//         // the value axis
			//         yAxis: {
			//             stops: [
			//                 [0.1, '#55BF3B'], // green
			//                 [0.5, '#DDDF0D'], // yellow
			//                 [0.9, '#DF5353'] // red
			//             ],
			//             lineWidth: 0,
			//             minorTickInterval: null,
			//             tickPixelInterval: totalQuizzes*2,
			//             tickWidth: 0,
			//             title: {
			//                 y: -70,
			//                 style: {
			//                 	color: '#555555',
			//                 	fontWeight: 'bold'
			//                 }
			//             },
			//             labels: {
			//                 y: 16
			//             }
			//         },

			//         plotOptions: {
			//             solidgauge: {
			//                 dataLabels: {
			//                     y: 5,
			//                     borderWidth: 0,
			//                     useHTML: true
			//                 }
			//             }
			//         }
			//     };

			//     // The speed gauge
			//     $('#container-passed').highcharts(Highcharts.merge(passedOptions, {
			//         yAxis: {
			//             min: 0,
			//             max: totalQuizzes,
			//             title: {
			//                 text: 'Passed',
			//                 style: { 'font-size' : '2.0em' }
			//             }
			//         },

			//         credits: {
			//             enabled: false
			//         },

			//         series: [{
			//             name: 'Passed',
			//             data: [passed],
			//             dataLabels: {
			//                 format: '<div style="text-align:center"><span style="font-size:25px;color:' +
			//                     ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
			//                        '<span style="font-size:12px;color:#999">'+Math.round(json.passed['Average Minutes'])+' avg min </span></div>' //+
			//                        //'<a href="">show students</a>'
			//             },
			//             tooltip: {
			//                 valueSuffix: ' avg min'
			//             }
			//         }]

			//     }));

			//     // The RPM gauge
			//     $('#container-failed').highcharts(Highcharts.merge(failedOptions, {
			//         yAxis: {
			//             min: 0,
			//             max: totalQuizzes,
			//             title: {
			//                 text: 'Failed',
			//                 style: { 'font-size' : '2.0em' }
			//             }
			//         },

			//         credits: {
			//             enabled: false
			//         },


			//         series: [{
			//             name: 'Failed',
			//             data: [failed],
			//             dataLabels: {
			//                 format: '<div style="text-align:center"><span style="font-size:25px;color:' +
			//                     ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
			//                        '<span style="font-size:12px;color:#999"> '+Math.round(json.failed['Average Minutes'])+' avg min</span></div>'//+
			//                        //'<a href="">show students</a>'
			//             },
			//             tooltip: {
			//                 valueSuffix: ' avg min'
			//             }
			//         }]

			//     }));

			// });

		}


		//OPEN ACTIVITY FEED - BVH
		/*$.getJSON( url_activityfeed, function( json ) {
			
			var tbody_activity = $("#tbody_activity");

			tbody_activity.empty()
			
			jQuery.each(json, function(i, val) {
				// if the NAME variable is populated, use it. Otherwise, use the email address
				if(val.NAME != "" && val.NAME != "undefined" && val.NAME != null){
					username = val.NAME;
				} else {
					username = val.ACTOR;
				}
				targeturl = val.TARGET;
				// if the ACTIVITY variable is populated, use it. Otherwise, use the VERB 
				if(val.ACTIVITY != "" && val.ACTIVITY != "undefined" && val.ACTIVITY != null){
					target = val.ACTIVITY;
				} else {
					// clean up target
					target = val.TARGET;
					target = target.replace('http://','');
				}

				// parse verb for endpoint
				act = val.VERB;
				act = act.split('/');
				act = act.slice(-1)[0];

				// map verbs to icons
				switch(act){
					case 'completed':
						actionclass = 'graduation-cap completed'; 
					break;
					case 'experienced':
						actionclass = 'flash experienced'; 
					break;
					case 'attempted':
						actionclass = 'target attempted'; 
					break;
					case 'answered':
						actionclass = 'check answered'; 
					break;
					default:
						actionclass = ''; 
				}


				tbody_activity.append("<tr><td>"+ val.SOURCE_TIMESTAMP +"</td>" +
						"<td>Knowledge</td>" +
						"<td><a href=\""+val.ACTOR+"\">"+ username +"</a></td>" +
						"<td style=\"text-transform:capitalize;\"><i class=\"icon-"+actionclass+"\"></i>"+ act +"</td>" +
						"<td><a href=\""+targeturl+"\"x>"+ target +"</a></td></tr>"				
						);
			});
 
			tbody_activity.trigger('update');	
		 });*/

		/*$("#level-filter").selectBoxIt({ 
			autoWidth: false,
			hideCurrent: false,
			showEffect: "fadeIn",
			showEffectSpeed: 400
		});
		var selectBox = $("#level-filter").data("selectBox-selectBoxIt");
		selectBox.refresh(); // Chaining method of repopulating the course data
		// end @BHRIV*/

		$('#level-filter').on('change',function(){
			console.log('level filter activated...');
			var selected = $(this).val();
			var tablebody = $('#tbody_activity');
			if(selected !== "NULL" && selected !== "ALL"){
				tablebody.find('tr').hide();
				tablebody.find('td[data-level="'+selected+'"]').parent().show();
			}else{
				tablebody.find('tr').show();
			}
		});

		$('#activity-chart').highcharts({
	        chart: {
	            type: 'area'
	        },
	        title: {
	            text: 'Bloom\'s Taxonomy Usage by Level for 2015' 
	        },
	        subtitle: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	            tickmarkPlacement: 'on',
	            title: {
	                enabled: false
	            }
	        },
	        yAxis: {
	            title: {
	                text: 'Thousands'
	            },
	            labels: {
	                formatter: function () {
	                    return this.value / 1000;
	                }
	            }
	        },
	        tooltip: {
	            shared: true,
	            valueSuffix: ''
	        },
	        plotOptions: {
	            area: {
	                stacking: 'normal',
	                lineColor: '#666666',
	                lineWidth: 1,
	                marker: {
	                    lineWidth: 1,
	                    lineColor: '#666666'
	                }
	            }
	        },
	        series: [{
	            name: 'Knowledge',
	            data: [502, 635, 809, 947, 1402, 3634, 5268, 6000, 5434, 3000, 3430, 4348]
	        }, {
	            name: 'Comprehension',
	            data: [106, 107, 111, 133, 221, 767, 1766, 2012, 3011, 4890, 5000, 4899]
	        }, {
	            name: 'Application',
	            data: [163, 203, 276, 408, 547, 729, 628, 845, 988, 1023, 1500, 1822]
	        }, {
	            name: 'Analysis',
	            data: [18, 31, 54, 156, 339, 818, 1201, 1576, 1688, 1799, 1898, 2039]
	        }, {
	            name: 'Synthesis',
	            data: [2, 2, 2, 6, 13, 30, 46, 66, 109, 203, 312]
	        }, {
	            name: 'Evaluation',
	            data: [2, 2, 2, 6, 13, 30, 46, 56, 78, 99, 65, 22]
	        }]
	    });

		
		//OPEN VERB TRENDS - BVH
		$.getJSON( url_verbtrends, function( json ) {
			
			var verbtrendcontainer = $("#top-verbs");
			var verbs = [];

			jQuery.each(json, function(i, val) {
				// parse verb for endpoint
				act = val.VERB;
				act = act.split('/');
				act = act.slice(-1)[0];
				verbs.push([act, Number(val.COUNT)]);
			});

			//console.log(verbstr);

		    verbtrendcontainer.highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Verb usage'
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		                rotation: -45,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Occurrences'
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: 'Number of occurrences: <b>{point.y}</b>'
		        },
		        series: [{
		            name: 'Verb Usage',
		            data: 
		            		verbs
		                ,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            }
		        }]
		    });
		
		 });

		//OPEN USER TRENDS - BVH
		$.getJSON( url_usertrends, function( json ) {
			
			var usertrendcontainer = $("#top-users");
			var users = [];

			//console.log(json);

			jQuery.each(json, function(i, val) {
				// parse user for endpoint
				if(val.NAME == null){
					act = val.ACTOR;
					act = act.replace('mailto:','');
				}else{
					act = val.NAME;
				}
				users.push([act, Number(val.COUNT)]);
			});

			//console.log(verbstr);

		    usertrendcontainer.highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Users'
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		                rotation: -45,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Occurrences'
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: 'Number of occurrences: <b>{point.y}</b>'
		        },
		        series: [{
		            name: 'Users',
		            data: 
		            		users
		                ,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            }
		        }]
		    });
		
		 });

		//OPEN ACTIVITY TRENDS - BVH
		$.getJSON( url_activitytrends, function( json ) {
			
			var activitytrendcontainer = $("#top-activities");
			var activities = [];

			//console.log(json);

			jQuery.each(json, function(i, val) {
				// parse user for endpoint
				if(val.ACTIVITY == null){
					act = val.TARGET;
				}else{
					act = val.ACTIVITY;
				}
				activities.push([act, Number(val.COUNT)]);
			});

			//console.log(verbstr);

		    activitytrendcontainer.highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Activities'
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            type: 'category',
		            labels: {
		                rotation: -45,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif'
		                }
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Occurrences'
		            }
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: 'Number of occurrences: <b>{point.y}</b>'
		        },
		        series: [{
		            name: 'Activities',
		            data: 
		            		activities
		                ,
		            dataLabels: {
		                enabled: true,
		                rotation: -90,
		                color: '#FFFFFF',
		                align: 'right',
		                x: 4,
		                y: 10,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, sans-serif',
		                    textShadow: '0 0 3px black'
		                }
		            }
		        }]
		    });
		
		 });

		coursePeformance(url_activitygraph, url_usergraph, url_messagegraph);

		$('#refresh-course-performance').on('click',function(e){
			e.preventDefault();
			coursePeformance(url_activitygraph, url_usergraph, url_messagegraph);
		});

	}

	// window.renderDash=renderDash;
	// END RENDER DASH

	
	function coursePeformance(urlu, urla, urlm){

		//HOME- User Graph
		$.getJSON( urlu, function( json ) {
			
			$('#usergraph').highcharts({
		        title: {
		            text: 'Users',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: json.catagories
		        },
		        yAxis: {
		            title: {
		                text: 'Users'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: ' Users'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: json.name,
		            data: json.data
		        }]
		    });
		
		});

		//HOME- Activity Chart 
		$.getJSON( urla, function( json ) {
			
			$('#activitygraph').highcharts({
		        title: {
		            text: 'Activities',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: json.catagories
		        },
		        yAxis: {
		            title: {
		                text: 'Activities'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: ' Activities'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: json.name,
		            data: json.data
		        }]
		    });
		
		});

		//HOME- Messages Chart 
		$.getJSON( urlm, function( json ) {
			
			$('#messagegraph').highcharts({
		        title: {
		            text: 'Messages',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: json.catagories
		        },
		        yAxis: {
		            title: {
		                text: 'Messages'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: ' Messages'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: json.name,
		            data: json.data
		        }]
		    });
		
		});
		
		
	}	

	// function to query localstorage for a given variable
	function checkLocalStorage(item){
		var thisitemval = JSON.parse(localStorage.getItem(item));
		// if local storage empty
		if(thisitemval === null){
			return '';
		}else{
			return thisitemval;
		}
	}

});


