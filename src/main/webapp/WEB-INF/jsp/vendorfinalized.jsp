<%-- 
    Document   : createrfp
    Created on : 8 Jan, 2019, 3:07:01 PM
    Author     : admin
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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

        <!--        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard.min.css">
                <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_arrows.min.css">
                <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_circles.min.css">
                <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_dots.min.css">-->

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />


        <link rel="stylesheet" href="assets/css/custom.css">

        <!--<link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/jquery.dataTables.min.css">-->
        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <style>
            #myTab7{
                width: 25%;
            }
            .reject-pr-btn {
                padding: 2px 6px;
            }
            .query-pr-btn {
                padding: 2px 6px;
            }
            /*            .btn {
                            cursor: pointer;
                            height: 10px;
                            margin-top: 10px;
                            margin-left: 10px;
                            padding-bottom: 30px; 
                        }
                        div.dataTables_wrapper div.dataTables_filter input{
                            margin-top: 10px;
                            margin-right: 10px;
                        }*/
        </style>
        <title>PRs with PO created on hold/rejected/cancelled Finalization</title>
    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>


            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content">

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>
<!--                        <input type="hidden" id="RejectStatus" name="RejectStatus" value="${RejectStatus}">
                        <input type="hidden" id="QueryStatus" name="QueryStatus" value="${QueryStatus}">-->

                        <form id="pendingPrtoPoForm" method="post" action="createpo.do">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                            <input type="hidden" name="prids" id="prids">
                            <input type="hidden" name="reqFrom" id="reqFrom">
                        </form>

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header" id="pageheader">
                                    <h2 class="pageheader-title">PRs with PO created on hold/rejected/cancelled Finalization</h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <!--<li class="breadcrumb-item">View PR/ Contract Status</li>-->
                                                <!--<li class="breadcrumb-item" aria-current="page">PR Lines/ Contract Assigned to Me</li>-->
                                                <!--<li class="breadcrumb-item active" aria-current="page">Pending PR Lines/ Contract</li>-->
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
                                <div class="tab-regular">
                                    <!--                                    <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                                            <li class="nav-item">
                                                                                <a class="nav-link active" id="pendingPR-tab-justify" data-toggle="tab" href="#pendingPR-justify" role="tab" aria-controls="pendingPR" aria-selected="true">Pending PR</a>
                                                                            </li>
                                                                                                                                                            <li class="nav-item">
                                                                                                                                                                <a class="nav-link" id="contractPR-tab-justify" data-toggle="tab" href="#contractPR-justify" role="tab" aria-controls="contractPR" aria-selected="false">Pending Contract</a>
                                                                                                                                                            </li>
                                                                        </ul>-->
                                    <div class="tab-content">
                                        <!--<div class="tab-pane fade show active" id="pendingPR-justify" role="tabpanel" aria-labelledby="pendingPR-tab-justify">-->

                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <!--<div class="card">-->
                                                <!--                                                        <div class="card-header bg-primary">
                                                                                                            Pending PR Lines
                                                                                                        </div>-->
                                                <div class="card-body">
                                                    <!--<div class="row">-->
                                                    <!--<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-align-right">-->
                                                    <input id="createrfq" type="button" value="Create RFQ" class="btn btn-outline-success btn-sm button-ht hidden" style="float:right;"/>
                                                    <input id="createpo" type="button" value="Create PO" class="btn btn-outline-success btn-sm button-ht hidden" style="float:right;"/>
                                                    <!--</div>-->
                                                    <!--</div>-->
                                                    <br>
                                                    <div class="tab-regular">
                                                        <div class="card-body">
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered table-striped vendor_Finalized_class" id="vendor_Finalized_Id" style="width:100%;">
                                                                    <thead class="">
                                                                        <tr>
<!--                                                                            <th class="noExport" scope="col">
                                                                                <input type="checkbox" class="pending_service_prlines" title="Select All"/>
                                                                            </th>-->
                                                                            <th class="" scope="col">PR No. </th>
                                                                            <th class="" scope="col">Dept. Desc.</th>
                                                                            <th class="" scope="col">Co-Code</th>
                                                                            <th class="" scope="col">Req. Number/ Required By </th>
                                                                            <th class="" scope="col">Approved By/ Date</th>
                                                                            <th class="" scope="col">Req’d Date/ Buyer</th>
                                                                            <th class="" scope="col">Item Code/ Old Mat. No/ Description </th>
                                                                            <th class="noExport" scope="col">PO Text </th>
                                                                            <!--<th style="display: none;">Long Text </th>-->
                                                                            <th class="" scope="col">Item Text </th>
                                                                            <th class="" scope="col">UoM </th>
                                                                            <th class="" scope="col">Quantity/ UoM-Store </th>
                                                                            <th class="" scope="col">Loc Purchase </th>
                                                                            <th class="" scope="col">LT / SLoc </th>
                                                                            <th class="" scope="col">Project/ PO Buyer </th>
                                                                            <th class="" scope="col">Over Due </th>
                                                                            <th class="" scope="col">Last PO / PO Date </th>
                                                                            <th class="" scope="col">Per Unit/ PR Currency </th>
                                                                            <th class="" scope="col">Supplier </th>
                                                                            <th class="" scope="col">Header Note </th>
                                                                            <th class="" scope="col">Item Note </th>
                                                                            <th class="" scope="col">MIQA Mat’l </th>
                                                                            <th class="" scope="col">PID </th>
                                                                            <!--                                                                            <th class="noExport"></th>
                                                                                                                                                        <th class="noExport"></th>-->
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <c:forEach var="pr" items="${vendorFinalizedList}" varStatus="status">
                                                                            <tr>
<!--                                                                                <td>
                                                                                    <input type="checkbox" class="select-material-pr-line" value="${pr.insertionOrderId}">
                                                                                    <input type="hidden" class="prtype" name="prtype" value="Service">
                                                                                    <input type="hidden" class="procInstId" value="${pr.pID}">
                                                                                    <input type="hidden" class="linkIdClass" value="${pr.linkId}">
                                                                                    <input type="hidden" class="prCreator" value="${pr.pRCreator}">
                                                                                    <input type="hidden" class="prCreatorEmailId" value="${pr.prCreatorEmailId}">
                                                                                    <input type="hidden" class="prQuantity" value="${pr.pRQuantity}">
                                                                                    <input type="hidden" class="remainingQuantity" value="${pr.remainingQuantity}">
                                                                                    <input type="hidden" class="companyCode" value="${pr.companyCode}">
                                                                                    <input type="hidden" class="plantCode" value="${pr.plantCode}">
                                                                                </td> -->
                                                                                <td align="center">${pr.pRNumber}</td>
                                                                                <td>${pr.departmentDescription}</td>
                                                                                <td>${pr.companyCode}</td>
                                                                                <td>${pr.purchaseRequestNumber} / ${pr.initiatorId}</td>
                                                                                <td>${pr.approverName} / ${pr.approvedDate}</td>
                                                                                <td>${pr.requisitionDate} / </td>
                                                                                <td>${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                <td>${pr.poText}</td>
                                                                                <td>${pr.itemText}</td>
                                                                                <td>${pr.uoM}</td>
                                                                                <td>${pr.pRQuantity}/</td>
                                                                                <td>${pr.localPurchase}</td>
                                                                                <td>${pr.leadTime} / ${pr.storageLocation}</td>
                                                                                <td>/</td>
                                                                                <td>${pr.overDue}</td>
                                                                                <td></td>
                                                                                <td>${pr.priceUnit} / ${pr.currency}</td>
                                                                                <td></td>
                                                                                <td>${pr.headerNote}</td>
                                                                                <td>${pr.itemNote}</td>
                                                                                <td>${pr.miqaMaterial}</td>
                                                                                <td>${pr.pID}</td>
<!--                                                                                <td><input type="button" value="Reject" class="btn btn-outline-primary btn-sm reject-pr-btn button-ht" id="reject_pr_btn${status.count}"/></td>
                                                                                <td><input type="button" value="Query" class="btn btn-outline-primary btn-sm query-pr-btn button-ht" id="query_pr_btn${status.count}"/></td>-->
                                                                            </tr>
                                                                        </c:forEach>
                                                                    </tbody>
                                                                </table>
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
            <!--<script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>-->
            <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>

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

            <script src="assets/js/pr.js"></script>

            <script>
                $(document).ready(function() {
                    $(".selectpicker").selectpicker();
                    $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

                });
            </script>

    </body>
</html>
