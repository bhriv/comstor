<!-- /*******************  Header *************/ -->
<!-- // Emulate PHP route methods for loading content -->
<?php ?>
<header id="site_header">
  <div class="row">
    <div class="sixteen columns">
        <a href="/">
        <div class="logo"></div></a>
        <div class="user-profile">
            <a class="toggle" href="#"><i class="icon-user"></i> <i class="icon-down-dir"></i></a>
            <div class="drawer" id="user-options">
                <ul>
                    <li class="username">Logged in as: Admin</li>
                    <li><a href="/profile/">My Profile</a></li>
                    <li><a class="switch" href="#">My Courses</a></li>
                    <li><a href="/profile/change-password">Change Password</a></li>
                    <li><a href="/logout">Sign Out</a></li>
                </ul>
            </div>
        </div>
        <div class="mobile-nav">
            <a class="toggle" href="#"><i class="icon-menu"></i></a>
            <div class="drawer" id="mobile-menu">
                <ul>
                    <li>
                        <ul>
                            <li>
                                <a class="" href="/home"><i class="icon-play"></i>Manager Dashboard</a>
                            </li>
                            <li>
                                <a class="" href="/home/alerts"><i class="icon-play"></i>Alerts</a>
                            </li>
                            <li>
                                <a class="" href="/home/trending"><i class="icon-play"></i>Trending</a>
                            </li>
                            <li>
                                <a class="" href="/home/activity-feed"><i class="icon-play"></i>Activity Feed</a>
                            </li>
                            <li>
                                <a class="" href="/social-media-radar">Social Media Radar <i class="icon-play"></i></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/users"><i class="icon-play"></i>Users</a>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <a class="" href="/messages/home"><i class="icon-play"></i>Inbox</a>
                            </li>
                            <li>
                                <a class="" href="/messages/sent"><i class="icon-play"></i>Sent</a>
                            </li><!--<li><a href="#" class="">Unread <i class="icon-play"></i></a></li>
                        <li><a href="#" class="switch " gumby-trigger="#messagecats">+ Category <i class="icon-play"></i></a></li>-->
                            <li>
                                <a class="" href="/messages/notifications"><i class="icon-play"></i>Notifications</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/help"><i class="icon-play"></i>Help</a>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <a class="" href="/stats/home"><i class="icon-play"></i>Stats Home</a>
                            </li>
                            <li>
                                <a class="" href="/stats/sources"><i class="icon-play"></i>Sources</a>
                            </li>
                            <li>
                                <a class="" href="/stats/course-performance"><i class="icon-play"></i>Course Performance</a>
                            </li>
                            <li>
                                <a class="" href="/stats/settings"><i class="icon-play"></i>Settings</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <a class="" href="/settings"><i class="icon-play"></i>Settings Overview</a>
                            </li>
                            <li>
                                <a class="" href="/settings/people"><i class="icon-play"></i>People</a>
                            </li>
                            <li>
                                <a class="" href="/settings/permissions"><i class="icon-play"></i>Permissions</a>
                            </li>
                            <li>
                                <a class="" href="/settings/roles"><i class="icon-play"></i>Roles</a>
                            </li>
                            <li>
                                <a class="" href="/settings/groups"><i class="icon-play"></i>Groups</a>
                            </li>
                            <li>
                                <a class="" href="/settings/lrs"><i class="icon-play"></i>LRS</a>
                            </li>
                            <li>
                                <a class="" href="/settings/courses"><i class="icon-play"></i>Courses</a>
                            </li>
                            <li>
                                <a class="" href="/settings/curriculum"><i class="icon-play"></i>Curriculum</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>
                                <a href="/profile/"><i class="icon-play"></i>My Profile</a>
                            </li>
                            <li>
                                <a href="#"><i class="icon-play"></i>My Courses</a>
                            </li>
                            <li>
                                <a href="/profile/change-password"><i class="icon-play"></i>Change Password</a>
                            </li>
                            <li>
                                <a href="/logout"><i class="icon-play"></i>Sign Out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</header>
<script>
cc('Header Content added to DOM','ready');  
</script>
