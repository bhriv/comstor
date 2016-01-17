
/* =======================================
    Show All Single Question Data
* ======================================= */

function show_all_single_question_data(){

    var studentList = $('#question-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    var widget_question_reports = $('#widget-question-reports');

    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_all_single_question_data   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_quiz_id = $('#quizfilter').val();

    console.log('Current Quiz: ' +selected_quiz_id);
    
    // ajax URL
    var url_questions = 'http://www.akronzip.com/lumiousreports/quizquestionscores/'+selected_quiz_id;

    // question variables
    var qid = null;
    var qtext = null;
    var qgrade = null;
    var qattempts = null;

    // store results from these static URLs as objects to use with promises
    var questions = $.getJSON(url_questions);

    // wait for student ajax request to complete before we proceed
    $.when(questions).done(function(questionobject) {

        // dig down to the responseText object
        //var s = $.parseJSON(studentobject[1]);

        console.info("Question Data for Quiz " + selected_quiz_id);
        console.info(questionobject);

        // reset the Results table
        // dna.empty('results-body', { fade: true });
        dna.empty('results-body-questions', { fade: true });

        // loop through the student object
        jQuery.each(questionobject, function(i, qdata) {

            qid = qdata.id;
            qgrade = qdata.grade;
            qattempts = qdata.attempts;
            qtext = qdata.questiontext;
            if (qdata.questiontext == null ) {
                qtext = '<span class="content_not_available">Content not available.</span>';
            }
            console.log(qdata);
            
            // show all questions

            qgrade = qgrade*100;
            grade_percentage = Math.round(qgrade);
            // Add appropriate labels to Grades
            if (grade_percentage < 60) {grade_percentage = '<span class="student-stress danger label">'+grade_percentage+'</span>';};
            if (grade_percentage < 75) {grade_percentage = '<span class="student-stress warning label">'+grade_percentage+'</span>';};
            if (grade_percentage >= 75) {grade_percentage = '<span class="student-stress success label">'+grade_percentage+'</span>';};
            
            // Prepare DNA data    
            qdata['ID'] = qid;
            qdata['AVERAGEGRADE'] = grade_percentage;
            qdata['TOTALATTEMPTS'] = qattempts;
            qdata['QUESTIONCONTENT'] = qtext;
            
            // Bind data to table template
            dna.clone('results-body-questions', qdata, {html: true, fade: true});
            
            // Update table so sorting works after ajax call
            $("#sortable").trigger("update"); 
            
        });
    });

    $('#loading_gif').hide();
    studentList.fadeIn();
    studentList.show();
    widget_question_reports.show();
    
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_all_single_question_data    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
  
}


/* =======================================
    Show Questions That the Majority of Students Pass
* ======================================= */

function show_questions_that_the_majority_of_students_pass(){

    var studentList = $('#question-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    var widget_question_reports = $('#widget-question-reports');

    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_questions_that_the_majority_of_students_pass   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_quiz_id = $('#quizfilter').val();

    console.log('Current Quiz: ' +selected_quiz_id);
    
    // ajax URL
    var url_questions = 'http://www.akronzip.com/lumiousreports/quizquestionscores/'+selected_quiz_id;

    // question variables
    var qid = null;
    var qtext = null;
    var qgrade = null;
    var qattempts = null;

    // store results from these static URLs as objects to use with promises
    var questions = $.getJSON(url_questions);

    // wait for student ajax request to complete before we proceed
    $.when(questions).done(function(questionobject) {

        // dig down to the responseText object
        //var s = $.parseJSON(studentobject[1]);

        console.info("Question Data for Quiz " + selected_quiz_id);
        console.info(questionobject);

        // reset the Results table
        // dna.empty('results-body', { fade: true });
        dna.empty('results-body-questions', { fade: true });

        // loop through the student object
        jQuery.each(questionobject, function(i, qdata) {

            qid = qdata.id;
            qgrade = qdata.grade;
            qattempts = qdata.attempts;
            qtext = qdata.questiontext;
            if (qdata.questiontext == null ) {
                qtext = '<span class="content_not_available">Content not available.</span>';
            }
            console.log(qdata);

            
            // only show questions above pass grade
            if (qgrade >= 0.50) {

                qgrade = qgrade*100;
                grade_percentage = Math.round(qgrade);
                // Add appropriate labels to Grades
                if (grade_percentage < 60) {grade_percentage = '<span class="student-stress danger label">'+grade_percentage+'</span>';};
                if (grade_percentage < 75) {grade_percentage = '<span class="student-stress warning label">'+grade_percentage+'</span>';};
                if (grade_percentage >= 75) {grade_percentage = '<span class="student-stress success label">'+grade_percentage+'</span>';};
                
                // Prepare DNA data    
                qdata['ID'] = qid;
                qdata['AVERAGEGRADE'] = grade_percentage;
                qdata['TOTALATTEMPTS'] = qattempts;
                qdata['QUESTIONCONTENT'] = qtext;
                
                // Bind data to table template
                dna.clone('results-body-questions', qdata, {html: true, fade: true});
                
                // Update table so sorting works after ajax call
                $("#sortable").trigger("update"); 
            };
            
        });
    });

    $('#loading_gif').hide();
    studentList.fadeIn();
    studentList.show();
    widget_question_reports.show();
    
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_questions_that_the_majority_of_students_pass    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
  
}



/* =======================================
    Show Questions That the Majority of Students Do Not Pass
* ======================================= */

function show_questions_that_the_majority_of_students_do_not_pass(){

    var studentList = $('#question-list');
    var widget_quiz_reports = $('#widget-quiz-reports');
    var widget_quiz_reports_performance = $('#widget-quiz-reports-performance');
    var widget_question_reports = $('#widget-question-reports');

    studentList.hide();
    widget_quiz_reports.hide();
    widget_quiz_reports_performance.hide();
    $('#loading_gif').show();

    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    BEGIN  show_questions_that_the_majority_of_students_do_not_pass   XXXXXXXXXXXXXXXXXXXXXXXXXXX====');

    // POPULATE DATA to RESULTS TABLE
    var selected_quiz_id = $('#quizfilter').val();

    console.log('Current Quiz: ' +selected_quiz_id);
    
    // ajax URL
    var url_questions = 'http://www.akronzip.com/lumiousreports/quizquestionscores/'+selected_quiz_id;

    // question variables
    var qid = null;
    var qtext = null;
    var qgrade = null;
    var qattempts = null;

    // store results from these static URLs as objects to use with promises
    var questions = $.getJSON(url_questions);

    // wait for student ajax request to complete before we proceed
    $.when(questions).done(function(questionobject) {

        // dig down to the responseText object
        //var s = $.parseJSON(studentobject[1]);

        console.info("Question Data for Quiz " + selected_quiz_id);
        console.info(questionobject);

        // reset the Results table
        // dna.empty('results-body', { fade: true });
        dna.empty('results-body-questions', { fade: true });

        // loop through the student object
        jQuery.each(questionobject, function(i, qdata) {

            qid = qdata.id;
            qgrade = qdata.grade;
            qattempts = qdata.attempts;
            qtext = qdata.questiontext;
            if (qdata.questiontext == null ) {
                qtext = '<span class="content_not_available">Content not available.</span>';
            }
            console.log(qdata);

            
            // only show questions above pass grade
            if (qgrade < 0.50) {

                qgrade = qgrade*100;
                grade_percentage = Math.round(qgrade);
                // Add appropriate labels to Grades
                if (grade_percentage < 60) {grade_percentage = '<span class="student-stress danger label">'+grade_percentage+'</span>';};
                if (grade_percentage < 75) {grade_percentage = '<span class="student-stress warning label">'+grade_percentage+'</span>';};
                if (grade_percentage >= 75) {grade_percentage = '<span class="student-stress success label">'+grade_percentage+'</span>';};
                
                // Prepare DNA data    
                qdata['ID'] = qid;
                qdata['AVERAGEGRADE'] = grade_percentage;
                qdata['TOTALATTEMPTS'] = qattempts;
                qdata['QUESTIONCONTENT'] = qtext;

                // Bind data to table template
                dna.clone('results-body-questions', qdata, {html: true, fade: true});
                
                // Update table so sorting works after ajax call
                $("#sortable").trigger("update"); 
            };
            
        });
    });

    $('#loading_gif').hide();
    studentList.fadeIn();
    studentList.show();
    widget_question_reports.show();
    
    console.log('===XXXXXXXXXXXXXXXXXXXXXXXXXX    END show_questions_that_the_majority_of_students_do_not_pass    XXXXXXXXXXXXXXXXXXXXXXXXXXX====');
  
}

