<?	// Teacher Reports ?>
Teacher Reports
<section class="pill tabs" id="four_stages">
        <ul class="tab-nav">
            <li class="active">
                <a href="#" onclick="populate_data_content()"><span class="light label">1</span> Interactions Summary</a>
            </li>
            <li>
                <a href="#"><span class="light label">2</span> All Data</a>
            </li>
            <li>
                <a href="#"><span class="light label">3</span> Learner Details</a>
            </li>
        </ul>
        <div class="tab-content active">
            <div class="widget-content" style="min-height: 500px;">
                <div class="row graph_holder" id="video_view_stats">
                    <!-- <canvas height="250" id="video_views_bar" width="250"></canvas> -->
                    <ul>
                        <li>
                            <h5>@eventName</h5>
                        </li>
                        <li>Total Times Video Launched: <span id="view_total_launches"></span></li>
                        <li>Total Abandoned Or Stalled Usages: <span id="total_abandoned_or_stalled"></span></li>
                        <li>Total Unique Users: <span id="total_unique_users"></span></li>
                        <li>Total instance Learning Module Consumed:
                            <ul>
                                <li>traditional model: <small>(coming soon...)</small>
                                </li>
                                <li>non-traditional model: <small>(coming soon...)</small>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="row graph_holder" id="video_time_stats">
                    <ul>
                        <li>
                            <h5>
                                Video View Report
                            </h5>
                        </li>
                        <li>Longest Time in Module: <span id="longest_view_in_module"></span> <small>min</small>
                        </li>
                        <li>Shortest Time in Module: <span id="shortest_view_in_module"></span> <small>sec</small>
                        </li>
                        <li>Average Time in Module: <span id="average_viewing_length_in_module"></span> min
                        </li>
                        <li>Duration of Module: XX
                        </li>
                    </ul>
                    <canvas height="250" id="video_view_duration" width="250"></canvas>
                </div>
            </div>
        </div>
        <div class="tab-content">
            <div class="">
                <div class="table_key" id="verbsheader">
                    <strong>Verbs:</strong>
                </div>
                <table class="tablesorter striped rounded" id="sortable">
                    <thead>
                        <tr>
                            <th>
                                ID <i class="icon-arrow-combo"></i>
                            </th>
                            <th>
                                Student <i class="icon-arrow-combo"></i>
                            </th>
                            <th>
                                Date <i class="icon-arrow-combo"></i>
                            </th>
                            <th>
                                Time <i class="icon-arrow-combo"></i>
                            </th>
                            <th>
                                Verb <i class="icon-arrow-combo"></i>
                            </th>
                            <th>
                                Object <i class="icon-arrow-combo"></i>
                            </th><!--<th>Part <i class="icon-arrow-combo"></i></th>-->
                            <!-- <th>User <i class="icon-arrow-combo"></i></th>-->
                        </tr>
                    </thead>
                    <tbody class="verbtable"></tbody>
                </table>
            </div>
        </div>
        <div class="tab-content">
            <div class="">
                <div class="table_key">
                    <strong>Key:</strong> <span class="light label"><i class="fa fa-puzzle-piece green"></i> Hover to See Module Data</span><span class="light label"><i class="fa fa-check-square-o green"></i> Hover to View Knowledge Check Data</span>
                </div>
                <table class="tablesorter striped rounded" id="sortable_learner_detail">
                    <thead>
                        <tr>
                            <th>
                                <i class="icon-arrow-combo"></i>Student
                            </th>
                            <th>
                                <i class="icon-arrow-combo"></i>Start Time
                            </th>
                            <th id="modules">
                                <i class="icon-arrow-combo"></i>Modules
                            </th>
                            <th id="knowledge_checks">
                                <i class="icon-arrow-combo"></i>Knowledge Checks
                            </th>
                            <th>
                                <i class="icon-arrow-combo"></i> <!--<span>Total</span><br><br> -->Duration
                            </th>
                        </tr>
                    </thead>
                    <tbody id="learnerdetails"></tbody>
                </table>
            </div>
        </div>
    </section>