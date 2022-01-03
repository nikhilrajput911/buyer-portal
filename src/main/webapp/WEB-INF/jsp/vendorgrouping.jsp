<%-- 
    Document   : createrfp
    Created on : 8 Jan, 2019, 3:07:01 PM
    Author     : admin
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<!DOCTYPE html>
<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
        <link href="assets/vendor/fonts/circular-std/style.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/libs/css/style.css">
        <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
        <!--<link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">-->
        <!--<link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">-->
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
        <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">

        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_arrows.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_circles.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_dots.min.css">

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />


        <link rel="stylesheet" href="assets/css/custom.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">
        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">
        <link rel="stylesheet" href="assets/vendor/multi-select/css/multi-select.css">

        <link rel="stylesheet" href="assets/css/loader.css">

        <style>
            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            .newgroup_vendor_table thead th, .updategroup_vendor_table thead th {
                background-color: #5969ff !important;
                color: white !important;
            }
        </style>

        <title>Vendor Grouping</title>
    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>


            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div id="overlay">
                            <div id="loader"></div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="page-header" id="pageheader">
                                            <h2 class="pageheader-title">Create/ Manage Group </h2>
                                            <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                            <div class="page-breadcrumb">
                                                <nav aria-label="breadcrumb">
                                                    <ol class="breadcrumb">
                                                        <li class="breadcrumb-item">Vendor Grouping</a></li>
                                                        <li class="breadcrumb-item active" aria-current="page">Create/ Manage Group</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div class="accrodion-regular">
                                            <div id="accordion3">
                                                <div id="creategroupdiv">
                                                    <div class="card">
                                                        <div class="card-header bg-primary" id="headingEight">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#creategroup" aria-expanded="false" aria-controls="creategroup">
                                                                    <span class="fas fa-angle-down mr-3"></span>Create Group
                                                                </button>       
                                                            </h5>
                                                        </div>
                                                        <div id="creategroup" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body update-backgroud-color">
                                                                <form action="createvendorgroup.do" method="post" id="creategroupform">
                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                    <input type="hidden" name="vendorIdsForNewGroup" id="vendorIdsForNewGroup">
                                                                    <input type="hidden" name="sapVendorCodeForNewGroup" id="sapVendorCodeForNewGroup">

                                                                    <div class="row">
                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                                            <div class="form-group">
                                                                                <label for="groupname" class="">Group Name: </label>
                                                                                <input type="text" class="form-control form-rounded" id="groupname" name="groupname">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="table-responsive">
                                                                                <table class="table table-bordered newgroup_vendor_table" id="newgroup_vendor_table">
                                                                                    <thead class="bg-primary">
                                                                                        <tr>
                                                                                            <th>Vendor Name</th>
                                                                                            <th>Vendor Code</th>
                                                                                            <th>Vendor Address</th>
                                                                                            <th>Vendor E-Mail Address</th>
                                                                                            <th></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>

                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="align-center text-align-center">
                                                                                <button type="button" class="btn btn-success btn-sm" id="creategroupbtn">Create Group</button>
                                                                                <button type="button" class="btn btn-pinterest btn-sm" id="addVendorToNewGroup">Add Vendor</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="managegroupdiv">
                                                    <div class="card mb-2">
                                                        <div class="card-header bg-primary" id="headingEight">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#managegroup" aria-expanded="false" aria-controls="managegroup">
                                                                    <span class="fas fa-angle-down mr-3" id="managegroupspan"></span>Manage Group
                                                                </button>       </h5>
                                                        </div>
                                                        <div id="managegroup" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body update-backgroud-color">

                                                                <input type="hidden" name="vendorIdsForEditGroup" id="vendorIdsForEditGroup">
                                                                <input type="hidden" name="sapVendorCodeForEditGroup" id="sapVendorCodeForEditGroup">

                                                                <div class="row">
                                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                                        <div class="form-group">
                                                                            <label for="groups" class="">Group: </label>
                                                                            <select id="groups" name="groups" class="selectpicker show-tick show-menu-arrow" title="Choose any group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                                <c:forEach var="vendorGroup" items="${VendorGroupList}">
                                                                                    <option value="${vendorGroup.id}">${vendorGroup.groupname}</option>
                                                                                </c:forEach>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 text-right">                                                                        
                                                                        <input id="changegroupname" type="button" value="Change Group Name" class="btn btn-outline-success btn-rounded btn-sm hidden"/>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-striped updategroup_vendor_table" id="updategroup_vendor_table">
                                                                                <thead class="bg-primary">
                                                                                    <tr>
                                                                                        <th>Vendor Name</th>
                                                                                        <th>Vendor Code</th>
                                                                                        <th>Vendor Address</th>
                                                                                        <th>Vendor E-Mail Address</th>
                                                                                        <th></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">                                                                            
                                                                            <input type="button" class="btn btn-success btn-sm" id="mappgroupbtn" value="Update Group" disabled="true">
                                                                            <input type="button" class="btn btn-pinterest btn-sm" id="addNewVendorToManageGroupBtn" value="Add Vendor" disabled="true">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <!-- ============================================================== -->
                            <!-- sidenavbar -->
                            <!-- ============================================================== -->
                            <!--                            <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12">
                                                            <div class="sidebar-nav-fixed">
                                                                <ul class="list-unstyled">
                                                                    <li><a href="#pageheader" class="active">Overview</a></li>
                                                                    <li><a href="#creategroupdiv">Create Group</a></li>
                                                                    <li><a href="#managegroupdiv">Manage Group</a></li>
                                                                    <li><a href="#editbuyerdiv">Edit Buyer</a></li>
                            
                                                                </ul>
                                                            </div>
                                                        </div>-->
                            <!-- ============================================================== -->
                            <!-- end sidenavbar -->
                            <!-- ============================================================== -->

                        </div>

                    </div>

                </div>
                <!-- ============================================================== -->
                <!-- footer -->
                <!-- ============================================================== -->
                <!--                <div class="footer">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div class="text-md-right footer-links d-none d-sm-block">
                                                    <a href="javascript: void(0);">About</a>
                                                    <a href="javascript: void(0);">Support</a>
                                                    <a href="javascript: void(0);">Contact Us</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->
                <!-- ============================================================== -->
                <!-- end footer -->
                <!-- ============================================================== -->
            </div>

            <div class="modal fade" id="changegroupname_div" tabindex="-1" role="dialog" aria-labelledby="changeGroupNameLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="changeGroupNameLabel">Change Group Name</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="changegroupnamemodalform" action="changegroupname.do" method="post" data-parsley-validate="" novalidate="">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                            <input type="hidden" id="changegroupname_id" name="changegroup_id">
                            <input type="hidden" id="vendorgroupname" name="vendorgroupname">
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="updategroupname" class="">Group Name: </label>
                                                <input type="text" class="form-control form-rounded" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="updategroupname" name="updategroupname" required="true">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" id="changegroupmodalbtn">Change</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
            <div class="modal fade" id="addVendorsDetailsModal" tabindex="-1" role="dialog" aria-labelledby="addVendorsDetailsModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addVendorsDetailsModalLabel">Vendors</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <input type="hidden" id="firstVMSno">
                            <input type="hidden" id="lastVMSno" value="1">

                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorType">Vendor Type: </label>
                                        <select class="custom-select" id="vendorType">
                                            <option value="PortalVendor">Portal Vendor</option>
                                            <option value="SapVendor">SAP Vendor</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorMasterRecordCount">Record Count: </label>
                                        <select class="custom-select" id="vendorMasterRecordCount">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                            <option>200</option>
                                            <option>500</option>
                                            <option>1000</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorCodeOrName_SearchText">Vendor Code/ Name:</label>
                                        <input type="text" class="form-control form-rounded" id="vendorCodeOrName_SearchText" title="Search by code or name">
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <div class="btn-group" style="margin-top: 21px;">
                                            <input type="button" class="btn btn-success btn-sm" id="searchVendorMasterBtn" value="Search">
                                            <input type="button" class="btn btn-dark btn-sm" id="clearSearchVendorMasterBtn" value="Clear">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterPrevBtn" value="Prev" disabled="true">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterNextBtn" value="Next">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">       
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover addVendorsDetailsModalTable_Id" id="addVendorsDetailsModalTableId" style="width:100%;">
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="border-0 noExport"></th>
                                                    <th class="border-0">Vendor Name</th>
                                                    <th class="border-0">Vendor Code</th>
                                                    <th class="border-0">Vendor Org.</th>
                                                    <th class="border-0">Vendor Email Id</th>
                                                    <th class="border-0">Vendor Address</th>
                                                    <th class="border-0">Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="addSelectedVendorToNewGroupTable">Add</button>
                        </div>
                    </div>
                </div>
            </div>                
        </div>
        <div class="modal fade" id="manageGroupAddVendorsDetailsModal" tabindex="-1" role="dialog" aria-labelledby="manageGroupAddVendorsDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="manageGroupAddVendorsDetailsModalLabel">Vendors</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <input type="hidden" id="firstVMSno_MG">
                        <input type="hidden" id="lastVMSno_MG" value="1">

                        <div class="row">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="vendorType_MG">Vendor Type: </label>
                                    <select class="custom-select" id="vendorType_MG">
                                        <option value="PortalVendor">Portal Vendor</option>
                                        <option value="SapVendor">SAP Vendor</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="vendorMasterRecordCount_MG">Record Count: </label>
                                    <select class="custom-select" id="vendorMasterRecordCount_MG">
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>500</option>
                                        <option>1000</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="vendorCodeOrName_SearchText_MG">Vendor Code/ Name:</label>
                                    <input type="text" class="form-control form-rounded" id="vendorCodeOrName_SearchText_MG" title="Search by code or name">
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                <div class="form-group">
                                    <div class="btn-group" style="margin-top: 21px;">
                                        <input type="button" class="btn btn-success btn-sm" id="searchVendorMasterBtn_MG" value="Search">
                                        <input type="button" class="btn btn-dark btn-sm" id="clearSearchVendorMasterBtn_MG" value="Clear">
                                        <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterPrevBtn_MG" value="Prev" disabled="true">
                                        <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterNextBtn_MG" value="Next">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover manageGroupAddVendorsDetailsModalTableId" id="manageGroupAddVendorsDetailsModalTableId" style="width:100%;">
                                        <thead>
                                            <tr class="border-0">
                                                <th class="border-0 noExport"></th>
                                                <th class="border-0">Vendor Name</th>
                                                <th class="border-0">Vendor Code</th>
                                                <th class="border-0">Vendor Org.</th>
                                                <th class="border-0">Vendor Email Id</th>
                                                <th class="border-0">Vendor Address</th>
                                                <th class="border-0">Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="manageGroupAddSelectedVendorToEditGroupTable">Add</button>
                    </div>
                </div>
            </div>
        </div>                
    </div>                    
    <!-- ============================================================== -->
    <!-- end main wrapper  -->
    <!-- ============================================================== -->
    <!-- Optional JavaScript -->
    <!-- jquery 3.3.1 -->
    <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
    <!--bootstap bundle js--> 
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>

    <script src="assets/vendor/bootstrap-select/js/bootstrap-select.js"></script>

    <!--slimscroll js--> 
    <script src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
    <!--main js--> 
    <script src="assets/libs/js/main-js.js"></script>
    <!--chart chartist js--> 
    <!--<script src="assets/vendor/charts/chartist-bundle/chartist.min.js"></script>-->
    <!--sparkline js--> 
    <script src="assets/vendor/charts/sparkline/jquery.sparkline.js"></script>
    <!--morris js--> 
    <script src="assets/vendor/charts/morris-bundle/raphael.min.js"></script>
    <!--<script src="assets/vendor/charts/morris-bundle/morris.js"></script>-->
    <!--chart c3 js--> 
    <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
    <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
    <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>
    <!--<script src="assets/libs/js/dashboard-ecommerce.js"></script>-->

    <script src="assets/step-wizard/js/popper.min.js"></script>
    <script src="assets/step-wizard/js/jquery.smartWizard.min.js"></script>
    <script src="assets/step-wizard/js/custom-js.js"></script>

    <!--<script src="assets/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>-->

    <script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>
    <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>

    <script src="assets/js/vendorgrouping/createVendorGroup.js"></script>
    <script src="assets/js/vendorgrouping/manageVendorGroup.js"></script>

    <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
    <script src="assets/vendor/datatables/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/js/buttons.bootstrap4.min.js"></script>
    <!--<script src="assets/vendor/datatables/js/data-table.js"></script>-->
    <script src="assets/vendor/datatables/js/jszip.min.js"></script>
    <script src="assets/vendor/datatables/js/pdfmake.min.js"></script>
    <script src="assets/vendor/datatables/js/vfs_fonts.js"></script>
    <script src="assets/vendor/datatables/js/buttons.html5.min.js"></script>
    <script src="assets/vendor/datatables/js/buttons.print.min.js"></script>
    <script src="assets/vendor/datatables/js/buttons.colVis.min.js"></script>
    <script src="assets/vendor/datatables/js/dataTables.rowGroup.min.js"></script>
    <script src="assets/vendor/datatables/js/dataTables.select.min.js"></script>
    <script src="assets/vendor/datatables/js/dataTables.fixedHeader.min.js"></script>

    <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
    <script src="assets/vendor/parsley/parsley.js"></script>
    <script src="assets/vendor/multi-select/js/jquery.multi-select.js"></script>
    <script src="assets/vendor/jquery/jquery.quicksearch.js"></script>
    <script>
        $(document).ready(function() {
            $("#overlay").css("display", "none");
            $(".chosen").chosen();
            $("#buyerdetailstable").dataTable();
            $(".selectpicker").selectpicker();
            $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");
            $('.needs-validation').parsley();
            $('#my-select').multiSelect();
        });
    </script>

</body>
</html>
