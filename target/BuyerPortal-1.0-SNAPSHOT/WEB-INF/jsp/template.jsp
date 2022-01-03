<%-- 
    Document   : template
    Created on : 8 Jan, 2019, 2:23:02 PM
    Author     : admin
--%>

<!DOCTYPE html>
<html>
    <head>
        <!--        <style>
        
                    .nav-left-sidebar:hover,.nav-left-sidebar.expanded {
                        width:280px;
                        overflow:visible;
                    }
                    .nav-left-sidebar {
        
        
                    }
                </style>-->
    </head>
    <body>
        <form id="EditApprovedPoForm" method="post" action="createpo.do">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
            <input type="hidden" name="reqFrom" value="editApprovedPo">
        </form>
        <form id="ShortcutPoForm" method="post" action="createpo.do">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
            <input type="hidden" name="reqFrom" value="shortcutPo">
        </form>
            
        <div class="dashboard-header">
            <nav class="navbar navbar-expand-lg bg-white fixed-top">
                <!--saurabh-->
                <a class="navbar-brand" href="/BuyerPortal/dashboardcont.do">Buyer Portal</a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto navbar-right-top">
                        <!--                        <li class="nav-item">
                                                    <div id="custom-search" class="top-search-bar">
                                                        <input class="form-control" type="text" placeholder="Search..">
                                                    </div>
                                                </li>-->
                        <li class="nav-item dropdown notification">
                            <a class="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Notification"><i class="fas fa-fw fa-bell"></i> <span class=""></span></a>
                            <ul class="dropdown-menu dropdown-menu-right notification-dropdown">
                                <li>
                                    <div class="notification-title"> Notification</div>
                                    <div class="notification-list">
                                        <div class="list-group">
                                            <c:forEach var="notification" items="${BuyerNotificationList}">
                                                <a href="${notification.url}" class="list-group-item list-group-item-action unread-lotification" id="${notification.id}">
                                                    <div class="notification-info">
                                                        <div class="notification-list-user-img"><img src="assets/images/avatar.png" alt="" class="user-avatar-md rounded-circle"></div>
                                                        <div class="notification-list-user-block">
                                                            <span class="notification-list-user-name">${notification.ngBpVendordetailsId.firstname} ${notification.ngBpVendordetailsId.lastname}</span>
                                                            ${notification.notification}
                                                            <div class="notification-date">${notification.commentdate}</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </c:forEach>
                                        </div>
                                    </div>
                                </li>
                                <!--                                <li>
                                                                    <div class="list-footer"> <a href="#">View all notifications</a></div>
                                                                </li>-->
                            </ul>
                        </li>
                        <!--                        <li class="nav-item dropdown connection">
                                                    <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fas fa-fw fa-th"></i> </a>
                                                    <ul class="dropdown-menu dropdown-menu-right connection-dropdown">
                                                        <li class="connection-list">
                                                            <div class="row">
                                                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                                    <a href="#" class="connection-item"><img src="assets/images/github.png" alt="" > <span>Github</span></a>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                                    <a href="#" class="connection-item"><img src="assets/images/dribbble.png" alt="" > <span>Dribbble</span></a>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                                    <a href="#" class="connection-item"><img src="assets/images/dropbox.png" alt="" > <span>Dropbox</span></a>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                                    <a href="#" class="connection-item"><img src="assets/images/bitbucket.png" alt=""> <span>Bitbucket</span></a>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                                    <a href="#" class="connection-item"><img src="assets/images/mail_chimp.png" alt="" ><span>Mail chimp</span></a>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 ">
                                                                    <a href="#" class="connection-item"><img src="assets/images/slack.png" alt="" > <span>Slack</span></a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="conntection-footer"><a href="#">More</a></div>
                                                        </li>
                                                    </ul>
                                                </li>-->
                        <li class="nav-item dropdown nav-user">
                            <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="data:image/jpg;base64,${profilePicString}" alt="" class="user-avatar-md rounded-circle">
                                <span>
                                    <sec:authentication property="principal.firstname"/> <sec:authentication property="principal.lastname"/>
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div class="nav-user-info">
                                    <!--<h5 class="mb-0 text-white nav-user-name">John Abraham </h5>-->
                                    <h5 class="mb-0 text-white nav-user-name">
                                        <sec:authentication property="principal.firstname"/> <sec:authentication property="principal.lastname"/>
                                    </h5>
                                    <span class="status"></span><span class="ml-2">Available</span>
                                </div>
                                <a class="dropdown-item" href="editprofile.do"><i class="fas fa-user mr-2"></i>Account</a>
                                <a class="dropdown-item" href="#"><i class="fas fa-cog mr-2"></i>Setting</a>
                                <a class="dropdown-item" href="logout.do"><i class="fas fa-power-off mr-2"></i>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        <!-- ============================================================== -->
        <!-- left sidebar -->
        <!-- ============================================================== -->
        <div class="nav-left-sidebar sidebar-dark-primary">
            <div class="menu-list">
                <nav class="navbar navbar-expand-lg navbar-light">

                    <a class="d-xl-none d-lg-none" href="#">Dashboard</a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav flex-column">
                            <li class="nav-divider font-color-white">
                                Menu
                            </li>

                            <li class="nav-item custom-hover">
                                <a class="nav-link custom-hover" href="dashboardcont.do" ><i class="fa fa-fw fa-tachometer-alt"></i><span class="">Dashboard</span></a>
                            </li>

                            <!--RFP Management-->

                            <!--                            <li class="nav-divider">
                                                            Features
                                                        </li>-->

                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#view_pr_contract_status" aria-controls="view_pr_contract_status"><i class="fa fa-fw fa-eye"></i><span class="">View PR/ Contract Status</span></a>
                                    <div id="view_pr_contract_status" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#pr_contract_assigned" aria-controls="pr_contract_assigned"><i class="fa fa-circle fa-xs"></i>PR Lines/ Contract Assigned to Me</a>
                                                <div id="pr_contract_assigned" class="collapse submenu submenu-bg-color">
                                                    <ul class="nav flex-column">
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="pendingprlines.do"><i class="fa fa-circle fa-xs"></i>Pending PR Lines/ Contracts</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="rfqinprogress.do"><i class="fa fa-circle fa-xs"></i>RFQ In-Progress</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="pendingpocreation.do"><i class="fa fa-circle fa-xs"></i>Pending PO Creation</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" href="pocreated.do"><i class="fa fa-circle fa-xs"></i>PO Created</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="allprlinescontract.do"><i class="fa fa-circle fa-xs"></i>View All PR Lines/ Contract</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="mytask.do" ><i class="fa fa-fw fa-tasks"></i><span class="">Manage RFQ's</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#managepo" aria-controls="managepo"><i class="fa fa-fw fa-tasks"></i><span class="">Manage PO's</span></a>    
                                    <div id="managepo" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="#" id="shortcutPoLink"><i class="fa fa-circle fa-xs"></i>Cr-Am-Del PO </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="managepo.do"><i class="fa fa-circle fa-xs"></i>Revoke & Edit PO </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#" id="editApprovedPoLink"><i class="fa fa-circle fa-xs"></i>Amend PO </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="acknowledgepo.do"><i class="fa fa-circle fa-xs"></i>Acknowledge PO </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="posavingreport.do"><i class="fa fa-circle fa-xs"></i>PO Saving Report</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="draftPo.do"><i class="fa fa-circle fa-xs"></i>Draft POs</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="errorTransactions.do"><i class="fa fa-circle fa-xs"></i>Error Transactions</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#managestandalonepo" aria-controls="managestandalonepo"><i class="fa fa-fw fa-tasks"></i><span class="">Manage Standalone PO</span></a>    
                                    <div id="managestandalonepo" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="createstandalonepo.do?type=new"><i class="fa fa-circle fa-xs"></i>Create PO </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="managestandalonepo.do"><i class="fa fa-circle fa-xs"></i>Draft POs</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="personalsettings.do"><i class="fa fa-circle fa-xs"></i>Personal Settings</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="errorTransactionsSA.do"><i class="fa fa-circle fa-xs"></i>Error Transactions</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#manageOLA" aria-controls="manageOLA"><i class="fa fa-fw fa-tasks"></i><span class="">Manage OLA</span></a>    
                                    <div id="manageOLA" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="manageola.do"><i class="fa fa-circle fa-xs"></i>Revoke & Edit OLA </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="amendcontract.do"><i class="fa fa-circle fa-xs"></i>Amend OLA</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </sec:authorize>

                            <li class="nav-item">
                                <a class="nav-link" href="vendorgrouping.do" ><i class="fas fa-users"></i><span class="">Vendor Grouping</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="propectmanagement.do" ><i class="fa fa-fw fa-plus-circle"></i><span class="">Prospect Management</span></a>
                            </li>

                            <!--<sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="vendorresponses.do" ><i class="fa fa-fw fa-tasks"></i><span class="">Order Evaluation</span></a>
                                </li>
                            </sec:authorize>-->
                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#vendorresponses" aria-controls="vendorresponses"><i class="fa fa-fw fa-plus-circle"></i><span class="">Order Evaluation</span></a>    
                                    <div id="vendorresponses" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="rfqevaluation.do"><i class="fa fa-circle fa-xs"></i>Finalize PO </a>
                                            </li>
                                            <!--5516  -->
                                            <li class="nav-item">
                                                <a class="nav-link" href="vendorresponsescontract.do"><i class="fa fa-circle fa-xs"></i>Finalize Contract</a>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </li>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#rfpManagement" aria-controls="rfpManagement"><i class="fa fa-fw fa-plus-circle"></i><span class="">RFP Management</span></a>    
                                    <div id="rfpManagement" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="createrfp.do"><i class="fa fa-circle fa-xs"></i>Create RFP </a>
                                            </li>
                                            <!--5516  -->
                                            <li class="nav-item">
                                                <a class="nav-link" href="createrfpforcontract.do"><i class="fa fa-circle fa-xs"></i>Create RFP for Contract</a>
                                            </li>
                                            
                                            
                                            
                                         
                                            <li class="nav-item">
                                                <a class="nav-link" href="managerfp.do"><i class="fa fa-circle fa-xs"></i>Manage RFP </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="managerfpforcontract.do"><i class="fa fa-circle fa-xs"></i>Manage RFP for Contract</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </sec:authorize>
                            <li class="nav-item">
                                <a class="nav-link" href="acknowledgecontract.do" ><i class="fa fa-fw fa-user-circle"></i><span class="">Acknowledge Contract</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="editprofile.do" ><i class="fa fa-fw fa-user-circle"></i><span class="">Edit Profile</span></a>
                            </li>

                            <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT','ROLE_TEAM_LEAD','ROLE_TL_BUYER')">
                                <!--Ram-->
                                
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#report" aria-controls="report"><i class="fa fa-fw fa-tasks"></i><span class="">Reports</span></a>    
                                    <div id="report" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="reports.do"><i class="fa fa-circle fa-xs"></i>PRPO Reports </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="contractreports.do"><i class="fa fa-circle fa-xs"></i>Contract Reports </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <!--Ram-->
                                
                                <!--added by abhishek on 02/03/2020-->
                         <!--       <li class="nav-item">
                                    <a class="nav-link" href="SpendAnalysisReport.do" ><i class="fas fa-folder-open"></i><span class="">Upload Spend  Report</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="SpendAnalysisReport.do" ><i class="fas fa-folder-open"></i><span class="">spend analysis cart</span></a>
                                </li> -->
                                
                                <li class="nav-item">
                                    <a class="nav-link" href="RatedParameters.do" ><i class="fas fa-folder-open"></i><span class="">Rated Parameters</span></a>
                                </li>
                                <!--  ended by abhishek on 02/03/2020-->
                                <li class="nav-item">
                                    <a class="nav-link" href="acknowledgepo.do"><i class="fa fa-file-alt fa-xs"></i>Acknowledge PO </a>
                                </li>
                            </sec:authorize>
                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="SpendAnalysisReport1.do" ><i class="fas fa-folder-open"></i><span class="">Spend Analysis Cart </span></a>
                                </li> 
                                <li class="nav-item">
                                    <a class="nav-link" href="SpendAnalysisLibrary1.do" ><i class="fas fa-folder-open"></i><span class="">Spend Analysis Library</span></a>
                                </li>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_ADMIN,ROLE_ADMIN_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#administrator" aria-controls="administrator"><i class="fa fa-fw fa-tv"></i><span class="">Administrator</span></a>    
                                    <div id="administrator" class="collapse submenu submenu-bg-color">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link" href="createbuyer.do"><i class="fa fa-circle fa-xs"></i>Create/ Manage Buyer</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="createvendor.do"><i class="fa fa-circle fa-xs"></i>Create/ Manage Vendor</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="authorizevendor.do"><i class="fa fa-circle fa-xs"></i>Authorize Vendor</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="vendors.do"><i class="fa fa-circle fa-xs"></i>Vendor Notifications</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="reports.do"><i class="fa fa-circle fa-xs"></i>Reports</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="query.do" ><i class="fa fa-fw fa-question-circle"></i><span class="">Response Management</span></a>
                                </li>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_ADMIN_TL_BUYER,ROLE_ADMIN,ROLE_ADMIN_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="groupmanagement.do" ><i class="fas fa-users"></i><span class="">Group Management</span></a>
                                </li>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <li class="nav-item">
                                    <a class="nav-link" href="prcontractassignment.do" ><i class="fas fa-user-plus"></i><span class="">PR / Contract Assignment</span></a>
                                </li>
                            </sec:authorize>

                        </ul>
                    </div>
                </nav>
            </div>
        </div>

    </body>
</html>
