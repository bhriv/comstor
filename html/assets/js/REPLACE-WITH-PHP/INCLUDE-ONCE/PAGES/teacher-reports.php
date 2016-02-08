<?	// Teacher Reports ?>
Teacher Reports
  <header>   
    <span id="pull_student_data">pull_student_data()</span>
    
    
    <nav>
         <ul>
            <li><a id="show_mef_reports">Lumious Reports</a></li>
            <li><a id="show_ciscoone_reports"><img src="/old_assets/images/logo@.png" width="103" height"20" alt="" class="hidden"> xAPI Activity</a></li>
            <li><a id="show_flurry_reports"><img src="/old_assets/images/flurry-logo@2x.png" width="103" height"20" alt="" class="hidden"> xAPI &amp; Flurry</a></li>
        </ul>   
    </nav>
</header>
<section id="mef_reports" class="report_display_switch">

    <h2>Reports</h2>
    <div class="">
        <div class="field columns main-filter" id="mdl_course_categories">
            <label>Category:</label>
            <div class="picker">
                <select id="catfilter">
                    <option value="null">
                        <span>- select -</span>
                    </option>
                </select>
            </div>
        </div>

        <div class="field columns main-filter" id="query-class">
            <label>Course:</label>
            <div class="picker">
                <select id="coursefilter">
                    <option value="null">
                        <span data-type="type">- select -</span>
                    </option> 
                </select>
            </div>
        </div>

        <div class="field columns main-filter" id="report-basis-criteria">
            <label>Report Basis:</label>
            <div class="picker">
                <select id="basisfilter">
                    <option value="null">
                        <span>- select -</span>
                    </option>
                    <option value="student_based_report">
                        <span data-criteria="access">Student Based Report</span>
                    </option>
                    <option value="quiz_based_report">
                        <span data-criteria="performance">Quiz Based Report</span>
                    </option>
                    <!-- static -->
                </select>
            </div>
        </div>

        <div id="student_query" class="hiddenXX">
            <div class="field columns main-filter" id="query-criteria">
                <label>Report On:</label>
                <div class="picker">
                    <select id="criteriafilter">
                        <option value="null">
                            <span>- select -</span>
                        </option>
                        <option value="performance">
                            <span data-criteria="performance">Performance</span>
                        </option>
                        <option value="access">
                            <span data-criteria="access">Access</span>
                        </option>
                        <!-- static -->
                    </select>
                </div>
            </div>

            <div class="field columns main-filter hiddenX" id="query-show-students-access">
                <label>Show Students:</label>
                <div class="picker">
                    <select id="accessfilter">
                        <option value="null">
                            <span data-type="type">- select -</span>
                        </option> 
                        <option value="show_all_students">
                            <span data-type="type">- All Students -</span>
                        </option>
                        <option value="show_students_that_have_logged_in">
                            <span data-show-students="">That have logged in</span>
                        </option> 
                        <option value="show_students_that_have_not_logged_in">
                            <span data-show-students="">That have NOT logged in yet</span>
                        </option> 
                        <option value="show_students_that_have_not_logged_in_two_days_before_start_date">
                            <span data-show-students="">That have NOT logged in two days before the start date</span>
                        </option>
                        <option value="show_students_that_have_not_logged_in_within_the_last_two_days">
                            <span data-show-students="">Have NOT logged in within the last two days</span>
                        </option>
                        <!-- static -->
                    </select>
                </div>
            </div>

            <div class="field columns main-filter hiddenX" id="query-show-students-performance">
                <label>Show Students:</label>
                <div class="picker">
                    <select id="performancefilter" data-id="parentvalue">
                        <option value="null">
                            <span data-type="type">- select -</span>
                        </option> 
                        <option value="concatenated_results" data-id="0">
                            <span data-show-students=""> All Results</span>
                        </option>
                                    <option value="show_all_students_with_all_grades_attempt_1" data-id="1">
                            <span data-show-students=""> -- By Attempt #1</span>
                        </option>
                        <option value="show_all_students_with_all_grades_attempt_2" data-id="2">
                            <span data-show-students=""> -- By Attempt #2</span>
                        </option>
                        <option value="show_all_students_with_all_grades_attempt_3" data-id="3">
                            <span data-show-students=""> -- By Attempt #3</span>
                        </option>
                        <option value="show_all_students_with_all_grades_attempt_4" data-id="4">
                            <span data-show-students=""> -- By Attempt #4</span>
                        </option>
                        <option value="show_all_students_with_all_grades_attempt_5" data-id="5">
                            <span data-show-students=""> -- By Attempt #5</span>
                        </option>

                        <option value="show_students_who_are_doing_well_on_their_prework">
                            <span data-show-students=""> Who are doing well on their pre-work</span>
                        </option>
                        <option value="show_students_who_are_not_doing_well_on_their_prework">
                            <span data-show-students=""> Who are NOT doing well on their pre-work</span>
                        </option>
                        <option value="show_students_who_are_doing_well_on_their_homework">
                            <span data-show-students=""> Who are doing well on their homework</span>
                        </option>
                        <option value="show_students_who_are_not_doing_well_on_their_homework">
                            <span data-show-students=""> Who are NOT doing well on their homework</span>
                        </option>
                        <option value="show_students_who_are_not_going_to_pass">
                            <span data-show-students=""> Who are NOT going to pass</span>
                        </option>
                        <!-- static -->
                    </select>
                </div>
            </div>
        </div>
        <!-- end #student_query -->
                    
        <div id="quiz_query" class="hiddenX">
                        
            <div class="field columns main-filter" id="query-criteria">
                <label>Quiz:</label>
                <div class="picker">
                    <select id="quizfilter">
                        <option value="null">
                            <span data-mdlquiz="type">- Select -</span>
                        </option> 
                    </select>
                </div>
            </div>


            <div class="field columns main-filter hidden" id="report-type">
                <label>Type of Report:</label>
                <div class="picker">
                    <select id="typefilter">
                        <option value="null">
                            <span data-type="type">- select -</span>
                        </option> 
                        <option value="student-report">
                            <span data-type="type">Student Report</span>
                        </option>
                        <option value="question-report">
                            <span data-type="type">Question Report</span>
                        </option>
                        <option value="subject-report">
                            <span data-type="type">Subject Report</span>
                        </option>
                        <!-- static -->
                    </select>
                </div>
            </div>


            <div class="field columns main-filter hidden" id="query-show-students-report">
                <label>Show Students:</label>
                <div class="picker">
                    <select id="studentfilter">
                        <option value="null">
                            <span data-type="type">- select -</span>
                        </option> 
                        <option value="">
                            <span data-show-students="">Who have completed the quiz</span>
                        </option>
                        <option value="">
                            <span data-show-students="">Who have NOT completed the quiz</span>
                        </option>
                        <!-- static -->
                    </select>
                </div>
            </div>

            <div class="field columns main-filter hidden" id="query-show-questions-report">
                <label>Show Questions:</label>
                <div class="picker">
                    <select id="questionfilter">
                        <option value="null">
                            <span data-type="type">- select -</span>
                        </option> 
                        <option value="show_all_single_question_data">
                            <span data-show-students=""> Show all single question data</span>
                        </option>
                        <option value="show_questions_that_the_majority_of_students_pass">
                            <span data-show-students=""> That the majority of students pass</span>
                        </option>
                        <option value="show_questions_that_the_majority_of_students_do_not_pass">
                            <span data-show-students=""> That the majority of students do NOT pass</span>
                        </option>
                        
                                   
                        <!-- static -->
                    </select>
                </div>
            </div>

            <div class="field columns main-filter hidden" id="query-show-subjects-report">
                <label>Show Subjects:</label>
                <div class="picker">
                    <select id="subjectfilter">
                        <option value="null">
                            <span data-type="type">- select -</span>
                        </option> 
                        <option value="">
                            <span data-show-students=""> That the majority of students pass</span>
                        </option>
                        <option value="">
                            <span data-show-students=""> That the majority of students do NOT pass</span>
                        </option>
                        
                        <option value="">
                            <span data-show-students=""> That students spend the MOST time on</span>
                        </option>
                        <option value="">
                            <span data-show-students=""> That students spend the LEAST time on</span>
                        </option>
                        
                        <!-- static -->
                    </select>
                </div>
            </div>
        </div>
        <!-- end #quiz_query -->
    

        <div class="row"></div>

    
        <div class="static">
              <table id="concatenated-results" class="tablesorter sortable" style="display:block;">
                <thead>
                    <tr>
                        <th>ID</th>   
                        <th>Student</th>   
                        <th>Last Access</th>
                        <th>First Access</th>
                        <th>Stress</th>   
                                        <th>Actions</th>
                        <th>Quiz Attempt Details</th>             
                    </tr>
                </thead>
                <tbody id="tbody_quiz_result"></tbody>
            </table>
        </div>


        <ul class="widget-grid full-width" id="report_results_holder">
            <li id="widget-quiz-reports-performance" style="display:block;">
                <h2 class="yellow">Results<a href="#" class="toggle" gumby-trigger="#widget-quiz-reports .widget-content"><i class="icon-minus-squared"></i></a></h2>
                <div class="widget-content">
                    <div class="row widget">
                        <div id="student-list-performance" class="sixteen columns detail">
                            <!-- populated by js -->
                            <table id="sortable" class="tablesorter">
                                <thead>
                                    <tr>
                                        <th>ID <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>STUDENT <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>ACTION <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>

                                        <th>LAST LOGIN <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>FIRST LOGIN <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>

                                        <th>QUIZ ID <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>ATTEMPT <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>GRADE %<i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_quiz_result">
                                    <!-- Filled by Javascript Dynamically -->
                                    <tr id="results-body-performance" class="dna-template" data-class="~~STATUS~~">
                                        <td><span class="student-id">~~ID~~</span></td>
                <td class="user-details">
                    <span class="student-firstname">~~FIRSTNAME~~</span>
                    <span class="student-lastname">~~LASTNAME~~</span>
                    <span class="student-email">~~EMAIL~~</span>
                </td>
                <td class="dna-nucleotide user-actions" data-firstname="~~FIRSTNAME~~">
                    <p><a href="quiz-reports#" class="switch" gumby-trigger="#modal-challenge">Challenge</a></p>
                    <p><a href="quiz-reports#" class="switch" gumby-trigger="#modal-remediation">Remediation</a></p>
                    <p><a href="quiz-reports#" class="switch" gumby-trigger="#modal-remediation">Badge</a></p>
                </td>
                                        <td>
                    <span class="hidden">~~LASTACCESS~~</span>
                    <span>~~LASTACCESSFORMATTEDDATE~~</span>
                </td>
                <td>
                    <span class="hidden">~~FIRSTACCESS~~</span>
                    <span>~~FIRSTACCESSFORMATTEDDATE~~</span>
                </td>

                                        <td>
                    <span>~~QID~~</span>
                </td>
                <td>
                    <span>~~QATTEMPT~~</span>
                </td>
                <td>~~QPERCENTAGE~~</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </li>
            <li id="widget-quiz-reports" style="display:block;">
                <h2 class="yellow">Results<a href="#" class="toggle" gumby-trigger="#widget-quiz-reports .widget-content"><i class="icon-minus-squared"></i></a></h2>
                <div class="widget-content">
                    <div class="row widget">
                        <div id="student-list" class="sixteen columns detail">
                            <!-- populated by js -->
                            <table id="sortable" class="tablesorter">
                                <thead>
                                    <tr>
                                        <th>ID <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>STUDENT <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>ACTION <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>

                                        <th>LAST LOGIN <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>FIRST LOGIN <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>

                                        <th>STRESS <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                <th>COMMENTS <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_quiz_result">
                                    <!-- Filled by Javascript Dynamically -->
                                    <tr id="results-body-access" class="dna-template" data-class="~~STATUS~~">
                                        <td><span class="student-id">~~ID~~</span></td>
                <td class="user-details">
                    <span class="student-firstname">~~FIRSTNAME~~</span>
                    <span class="student-lastname">~~LASTNAME~~</span>
                    <span class="student-email">~~EMAIL~~</span>
                </td>
                <td class="dna-nucleotide user-actions" data-firstname="~~FIRSTNAME~~">
                    <p><a href="quiz-reports#" class="switch" gumby-trigger="#modal-challenge">Challenge</a></p>
                    <p><a href="quiz-reports#" class="switch" gumby-trigger="#modal-remediation">Remediation</a></p>
                    <p><a href="quiz-reports#" class="switch" gumby-trigger="#modal-remediation">Badge</a></p>
                </td>
                                        <td>
                    <span class="hidden">~~LASTACCESS~~</span>
                    <span>~~LASTACCESSFORMATTEDDATE~~</span>
                </td>
                <td>
                    <span class="hidden">~~FIRSTACCESS~~</span>
                    <span>~~FIRSTACCESSFORMATTEDDATE~~</span>
                </td>

                                        <td>~~STUDENTSTRESS~~</td>
                <td>~~STUDENTINSTRUCTORCOMMENTS~~</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </li>
            <li id="widget-question-reports" style="display:block;">
                <h2 class="yellow">Results<a href="#" class="toggle" gumby-trigger="#widget-quiz-reports .widget-content"><i class="icon-minus-squared"></i></a></h2>
                <div class="widget-content">
                    <div class="row widget">
                        <div id="question-list" class="sixteen columns detail">
                            <!-- populated by js -->
                            <table id="sortable" class="tablesorter">
                                <thead>
                                    <tr>
                                        <th>ID <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                                        <th><small>TOTAL</small><br>ATTEMPTS <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                                        <th>AVE GRADE <i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                                        <th>QUESTION CONTENT<i class="icon-down-dir"></i><i class="icon-up-dir"></i></th>
                                    </tr>
                                </thead>
                                <tbody id="tbody_quiz_result">
                                    <!-- Filled by Javascript Dynamically -->
                                    <tr id="results-body-questions" class="dna-template" data-class="~~STATUS~~">
                                        <td><span class="student-id">~~ID~~</span></td>
                                        <td class="user-total-attempts">~~TOTALATTEMPTS~~</td>
                                        <td class="user-ave-grade">~~AVERAGEGRADE~~</td>
                                        <td class="user-question-content">~~QUESTIONCONTENT~~</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="loading" id="loading_gif" style="display: none;">
            Loading...
            <!-- <img src="/images/loading.gif" alt="Loading..." /> -->
        </div>
    </div>
</section>