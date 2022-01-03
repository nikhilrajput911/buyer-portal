<%-- 
    Document   : index
    Created on : 6 Jan, 2019, 6:05:34 PM
    Author     : admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>


<html lang="en">

    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
        <link href="assets/vendor/fonts/circular-std/style.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/libs/css/style.css">
        <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
        <link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">
        <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
        <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/jquery.dataTables.min.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" href="assets/css/loader.css">

        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/jquery-stickytable/css/jquery.stickytable.min.css">

        <title>Order Evaluation</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }
            .vendorFinalizationTable thead th, .vendorcomparisonreporttable thead th, .documentListTable thead th, .lastPoDetailsTable thead th{
                background-color: #5969ff !important;
                color: white !important;
            }

            #myTab7{
                width: 50%;
            }
            .baseline-price-class {
                width: 60px;;
            }
            .sticky-table {
                max-height: none;
            }
            .baseline-price-class {
                width: 30%;
            }
            .total-price{
                width: 30%;
            }
            .pr-line-quantity{
                width: 30%;
            }
            
        </style>
    </head>

    <body>

        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">
            <!-- ============================================================== -->

            <%--<sec:authentication property="principal.firstname"/>--%>

            <%--<sec:authorize access="hasRole('ROLE_USER')">
            </sec:authorize>--%>

            <%--<sec:authentication property="principal.authorities"/>--%>


            <%--<sec:authentication property="authorities" var="authorities" />
            <c:forEach items="${authorities}" var="auth">
                <h3>${auth.authority}</h3>
            </c:forEach>--%>


            <%@include file = "template.jsp" %>

            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>

                        <input type="hidden" name="dmsip" id="dmsip" value="${NGwebserviceIp}">
                        <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">

                        <div class="">
                            <form id="orderEvaluationForm" method="post" action="createpo.do">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <input type="hidden" name="vendorFinalizationTableDataArrayAsJsonString" id="vendorFinalizationTableDataArrayAsJsonString">
                                <input type="hidden" name="rfqid" id="rfqid">
                                <input type="hidden" name="reqFrom" id="reqFrom">
                                <input type="hidden" name="prids" id="prids">
                                <input type="hidden" name="SelectedVendorId" id="SelectedVendorId">
                            </form>
                            <div class="card">
                                <h5 class="card-header bg-primary">Order Evaluation</h5>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rfqnumber" class="">RFQ Number: </label>
                                                <select class="selectpicker show-tick show-menu-arrow" id="rfqnumber" name="rfqnumber" title="Choose any RFQ..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                    <c:forEach var="rfqHeader" items="${RfqHeaderList}" varStatus="status">
                                                        <option value="${rfqHeader.rfqid}">${rfqHeader.rfqNumber} - ${rfqHeader.rfqstatus}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                            <div class="form-group">
                                                <a href="#" class="btn btn-primary btn-rounded btn-sm disabled" id="summaryOfQuotation" style="margin-top: 25px;">
                                                    <i class="fa fa-download" aria-hidden="true"></i> Summary Of Quotation 
                                                </a>
                                                <a href="#" class="btn btn-primary btn-rounded btn-sm disabled" id="vendorSelectionCriteria" style="margin-top: 25px;">
                                                    <i class="fa fa-download" aria-hidden="true"></i> Vendor Selection Criteria 
                                                </a>
                                                <a href="query.do" class="btn btn-primary btn-rounded btn-sm disabled" id="reponseManagementBtn" style="margin-top: 25px;">
                                                    <i class="fa fa-comments" aria-hidden="true"></i> Reponse Management 
                                                </a>
                                                <a href="#" class="btn btn-primary btn-rounded btn-sm disabled" id="addNewRatedParameter" style="margin-top: 25px;">
                                                    <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Rated Parameter 
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="tab-regular">
                                        <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="vendorComparisonReport-tab-justify" data-toggle="tab" href="#vendorComparisonReport-justify" role="tab" aria-controls="vendorComparisonReport" aria-selected="true">Vendor Comparison</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="vendorFinalization-tab-justify" data-toggle="tab" href="#vendorFinalization-justify" role="tab" aria-controls="vendorFinalization" aria-selected="true">Vendor Finalization</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane fade show active" id="vendorComparisonReport-justify" role="tabpanel" aria-labelledby="vendorComparisonReport-tab-justify">
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                                        <!--<div class="sticky-table sticky-ltr-cells">-->
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered vendorcomparisonreporttable" id="vendorcomparisonreporttable">
                                                                <thead>

                                                                </thead>
                                                                <tbody>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade show" id="vendorFinalization-justify" role="tabpanel" aria-labelledby="vendorFinalization-tab-justify">
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered vendorFinalizationTable" id="vendorFinalizationTable">
                                                                <thead>
                                                                <th></th>
                                                                <th style="width: 20%;">PR Line / Total Quantity</th>
                                                                <th>Remaining Quantity</th>
                                                                <th>Vendor</th>
                                                                <th>Comments</th>
                                                                <th>Why was this Vendor selected ?</th>
                                                                <th>PO Status</th>
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
                                                            <input type="button" class="btn btn-primary btn-rounded" id="finalizeVendorBtn" value="Finalize Vendor" disabled="true">
                                                            <input type="button" class="btn btn-primary btn-rounded" id="createPOBtn" value="Create PO" disabled="true">
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

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
                                                Copyright © 2018. All rights reserved.
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
            <!-- ============================================================== -->
            <!-- end wrapper  -->
            <!-- ============================================================== -->
        </div>
        <div class="modal fade" id="showSupprtingDocFromDMSModal" tabindex="-1" role="dialog" aria-labelledby="showSupprtingDocFromDMSModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="showSupprtingDocFromDMSModalLabel">Documents</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-bordered documentListTable" id="documentListTable">
                                <thead>
                                    <tr>
                                        <!--<th>#</th>-->
                                        <th>Document Name</th>
                                        <th>View</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <!--<button type="button" class="btn btn-primary" id="">Add</button>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="longTextModal" tabindex="-1" role="dialog" aria-labelledby="longTextLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="longTextLabel">Long Text</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="form-group longtext">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="lastPoDetailsModal" tabindex="-1" role="dialog" aria-labelledby="lastPoDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="lastPoDetailsModalLabel">Last PO Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-bordered lastPoDetailsTable" id="lastPoDetailsTable">
                                <thead>
                                    <tr>
                                        <th>Last PO Number</th>
                                        <th>Last PO Date</th>
                                        <th>Last PO Buyer</th>
                                        <th>Last PO Supplier</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
        <script src="assets/vendor/charts/chartist-bundle/chartist.min.js"></script>
        <!--sparkline js--> 
        <script src="assets/vendor/charts/sparkline/jquery.sparkline.js"></script>
        <!--morris js--> 
        <!--        <script src="assets/vendor/charts/morris-bundle/raphael.min.js"></script>
                <script src="assets/vendor/charts/morris-bundle/morris.js"></script>-->
        <!--chart c3 js--> 
        <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
        <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
        <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>
        <!--<script src="assets/libs/js/dashboard-ecommerce.js"></script>-->

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>

        <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
        <!--        <script src="https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js"></script>
                <script src="https://cdn.datatables.net/buttons/1.5.4/js/buttons.bootstrap4.min.js"></script>-->

        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <!--        <script src="assets/js/dashboard.js"></script>-->
        <script src="assets/js/createrfq.js"></script>
        <script src="assets/js/newgen.js"></script>
        <!--<script src="assets/js/dashboard.js"></script>-->
        <script src="assets/vendor/jquery-stickytable/js/jquery.stickytable.min.js"></script>

        <script>
            $(document).ready(function() {
                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");
            });
        </script>

    </body>

</html>
