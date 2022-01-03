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
        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">
        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">
        <link rel="stylesheet" href="assets/css/loader.css">
        <title>Error Transactions</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }
            .errorTransactionsTable thead th {
/*                background-color: #5969ff !important;
                color: white !important;
                text-align: center;*/
            }
        </style>
    </head>

    <body>
        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>

            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div class="">

                            <div id="overlay">
                                <div id="loader"></div>
                            </div>

                            <form id="draftPoForm" method="post" action="createpo.do">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <input type="hidden" name="reqFrom" id="reqFrom" value="">
                                <input type="hidden" name="draftPo" id="draftPo" value="Yes">
                                <input type="hidden" name="draftPoExtId" id="draftPoExtId">
                                <input type="hidden" name="SelectedVendorId" id="SelectedVendorId">
                                <input type="hidden" name="vendorFinalizationTableDataArrayAsJsonString" id="vendorFinalizationTableDataArrayAsJsonString">
                            </form>

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">Error Transactions</h5>
                                        <div class="card-body update-backgroud-color">
                                            <div class="table-responsive">
                                                <table class="table table-bordered table-striped errorTransactionsTable" id="errorTransactionsTable">
                                                    <thead class="">
                                                        <tr class="border-0">
                                                            <th class="border-0"></th>
                                                            <th class="border-0">PO Number</th>
                                                            <th class="border-0">PO Creation Date</th>
                                                            <th class="border-0">Vendor Name</th>
                                                            <th class="border-0">Company Code</th>
                                                            <th class="border-0">PO Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <c:forEach var="po" items="${errorTransactionList}">
                                                            <tr>
                                                                <td style="text-align: center;">
                                                                    <a href="#" title="Generate work item" class="editErrorTransaction"><i class="fa fa-edit fa-2x" aria-hidden="true"></i></a>
                                                                    <input type="hidden" class="extId" value="${po.id}">
                                                                    <input type="hidden" class="poFromClass" value="${po.poFrom}">
                                                                    <input type="hidden" class="selectedVendorIdClass" value="${po.selectedVendorId}">
                                                                    <input type="hidden" class="vendorFinalizationTableDataArrayAsJsonStringClass" value='${po.vendorFinalizationTableDataArrayAsJsonString}'>
                                                                </td>
                                                                <td>${po.purchaseOrderNumber}</td>
                                                                <td><fmt:formatDate value="${po.initiatedDate}" pattern="dd.MM.yyyy"></fmt:formatDate></td>
                                                                <td>${po.vendorCode} - ${po.vendorName}</td>
                                                                <td>${po.companyCode}</td>
                                                                <td>${po.purchaseOrderType}</td>
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
            <div class="modal fade" id="showSignedPoDocFromDMSModal" tabindex="-1" role="dialog" aria-labelledby="showSignedPoDocFromDMSModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="showSignedPoDocFromDMSModalLabel">Documents</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered documentListTable" id="documentListTable">
                                    <thead>
                                        <tr>
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
        <!--slimscroll js--> 
        <script src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
        <!--main js--> 
        <script src="assets/libs/js/main-js.js"></script>

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>

        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <!--        <script src="assets/js/dashboard.js"></script>-->

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
        <script src="assets/js/errortransaction.js"></script>

        <script>
            
        </script>

    </body>

</html>