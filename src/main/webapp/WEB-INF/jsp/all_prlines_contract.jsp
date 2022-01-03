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

        <title>View All PR Lines/Contract</title>
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
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header" id="pageheader">
                                    <h2 class="pageheader-title">View All PR Lines/Contract</h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item">View PR/ Contract Status</li>
                                                <li class="breadcrumb-item active" aria-current="page">View All PR Lines/Contract</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="card">
                                    <div class="card-header bg-primary">
                                        PR
                                    </div>
                                    <div class="card-body update-backgroud-color">

                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="table-responsive">
                                                    <table class="table table-striped all_prlines_contract_table" id="all_prlines_contract_table">
                                                        <thead class="">
                                                            <tr>
                                                                <th>Plant </th>
                                                                <th>PR No. </th>
                                                                <th>PR Line No. </th>
                                                                <th>Item Code </th>
                                                                <th class="noExport">PO Text</th>
                                                                <th style="display: none;">PO Text </th>
                                                                <th>Item Text</th>
                                                                <th>PR Req. </th>
                                                                <th>PR Creator</th>
                                                                <th>Dept. </th>
                                                                <th>UoM </th>
                                                                <th>PR Quantity</th>
                                                                <th>Days Overdue </th>
                                                        </thead>
                                                        <tbody>

                                                            <c:forEach var="pr" items="${prList}" varStatus="status">
                                                                <tr>
                                                                    <td>${pr.plant}</td>
                                                                    <td>${pr.pRNumber}</td>
                                                                    <td>${pr.pRLineNumber}</td>
                                                                    <td>${pr.itemCode}</td>
                                                                    <td>
                                                                        <a href="#" class="longTextClass" title="PO Text">
                                                                            <i class="fa fa-file" aria-hidden="true"></i>
                                                                        </a>
                                                                        <input type="hidden" id="" class="longTextHiddenFiled" value="${pr.poText}">
                                                                    </td>
                                                                    <td  style="display: none;">${pr.poText}</td>
                                                                    <td>${pr.itemText}</td>
                                                                    <td>${pr.pRRequester}</td>
                                                                    <td>${pr.pRCreator}</td>
                                                                    <td>${pr.department}</td>
                                                                    <td>${pr.uoM}</td>
                                                                    <td style="text-align: right;">${pr.remainingQuantity}</td>
                                                                    <td>${pr.noOfDaysOverdue}</td>
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

                        <div class="tab-regular">

                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                <!--                                <li class="nav-item">
                                                                    <a class="nav-link active" id="rfqforpr-tab-justify" data-toggle="tab" href="#rfqforpr-justify" role="tab" aria-controls="rfqforpr" aria-selected="true">PR LINES</a>
                                                                </li>-->
                                <!--
                                                                <li class="nav-item">
                                                                    <a class="nav-link" id="rfqforcontract-tab-justify" data-toggle="tab" href="#rfqforcontract-justify" role="tab" aria-controls="rfqforcontract" aria-selected="false">CONTRACT LINES</a>
                                                                </li>-->
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="rfqforpr-justify" role="tabpanel" aria-labelledby="rfqforpr-tab-justify">



                                </div>
                                <div class="tab-pane fade show" id="rfqforcontract-justify" role="tabpanel" aria-labelledby="rfqforcontract-tab-justify">

                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="card">
                                                <div class="card-header bg-primary">
                                                    PR
                                                </div>
                                                <div class="card-body">

                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="table-responsive">
                                                                <table class="table all-pending-contractlines" id="all_pending_contractlines_table">
                                                                    <thead class="">
                                                                        <tr class="">

                                                                            <th>S.No</th>
                                                                            <th class="" scope="col">Co-Code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Plant &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Tender/ Contract Number</th>
                                                                            <th class="" scope="col">Quantity</th>
                                                                            <th class="" scope="col">Purchase Group &nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Material Class</th>
                                                                            <th class="" scope="col">Material Group &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Type</th>
                                                                            <th class="" scope="col">Material/ Service Code &nbsp;&nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Tender Raised By &nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Tender Title &nbsp;</th>
                                                                            <th class="" scope="col">User Cost Center &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Activation Date(of the service)  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                            <th class="" scope="col">Over Due&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <c:forEach var="contract" items="${contractList}" varStatus="status">
                                                                            <tr>
                                                                                <td>${status.count}</td>
                                                                                <td></td>
                                                                                <td>${contract.plant}</td>
                                                                                <td></td>
                                                                                <td>${contract.bpQuantityRemaining}</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td>${contract.matlGroup}</td>
                                                                                <td>${contract.type}</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
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
                                <!--${pr.longtext}-->
                                <!--<input type="text" id="longtext" name="longtext">-->
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
