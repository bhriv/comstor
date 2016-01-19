<?php // Mobile Analytics Sidebar widgets ?>
<ul class="widget-grid full-width">
    <li data-type="video" id="widget-overview">
        <h2 style="background-color:#b6dbac;">
            Overview: <span id="data_query"></span> <a class="toggle" gumby-trigger="#widget-overview .widget-content"><i class="icon-minus-squared"></i></a>
        </h2>
        <div class="widget-content">
            <div class="clearfix">
                <ul>
                    <li id="overview_stats">
                        <div class="growth_factor">
                            <span class="badge">
                                <span class="label"></span>
                            </span>
                        </div>
                        <div>
                            <p>
                                <span class="period"></span>
                            </p>
                        </div>
                        <span class="current_val"></span>
                        <span class="previous_val"></span>
                    </li>
                    <li class="current_val">
                        <div class="growth_factor">
                            <span class="badge default">
                                <span class="number"></span>
                            </span>
                        </div>
                        <div>
                            <p>
                                <span class="period"></span>
                            </p>
                        </div>
                    </li>
                    <li class="previous_val">
                        <div class="growth_factor">
                            <span class="badge default">
                                <span class="number"></span>
                            </span>
                        </div>
                        <div>
                            <p>
                                <span class="period"></span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div id="overview_updated">
                <span><i class="icon-arrows-ccw"></i> Data Updated: <time id="overview_updated_date"></time></span> <span><i class="icon-arrows-ccw"></i> Last Usage: <time id="overview_updated_usage"></time></span>
            </div> -->

        </div>
    </li>
</ul>

<ul class="widget-grid full-width">
    <li id="widget-app-overview">
        <h2 style="background-color:#b6dbac;">
            App Overview <a class="toggle" onclick="showFlurryAppStats();" ><i class="icon-minus-squared"></i></a>
        </h2>
        <div class="widget-content active" id="app_overview">
            <ul>
                <li>Name: <span class="app_name"></span></li>
                <li>Platform: <span class="app_platform"></span></li>
                <li>Category: <span class="app_category"></span></li>
                <li>App Created: <span class="app_createdDate"></span></li>
                <li>Report Generated: <span class="app_generatedDate"></span></li>
            </ul>
        </div>
    </li>
</ul>
<ul class="widget-grid full-width">
    <li id="widget-app-version-history">
        <h2 style="background-color:#b6dbac;">
            App Version History <a class="toggle" gumby-trigger="#widget-app-version-history .widget-content"><i class="icon-minus-squared"></i></a>
        </h2>
        <div class="widget-content active">
            <div class="row">
                <ul class="app_version_history" style="margin:0; font-size:14px; line-height:1.5em;">
                    <!-- populated by js -->
                </ul>
            </li>
            </div>
        </div>
    </li>
</ul>