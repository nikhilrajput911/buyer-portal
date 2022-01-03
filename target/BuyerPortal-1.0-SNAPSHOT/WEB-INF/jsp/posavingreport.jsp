<%-- 
    Document   : personalsettings
    Created on : May 21, 2020, 10:21:12 AM
    Author     : Sunny Kumar
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
        <link rel="stylesheet" href="assets/css/po-css.css">
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />
        <title>PO Saving Report</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }
            #generatePoSavingReportBtn {
                position: fixed;
                right: 45%;
                bottom: 10px;
                z-index: 999;
            }
        </style>
        <!--        <style>
                    .file-field.medium .file-path-wrapper {
                        height: 3rem; }
                    .file-field.medium .file-path-wrapper .file-path {
                        height: 2.8rem; }
        
                    .file-field.big-2 .file-path-wrapper {
                        height: 3.7rem; }
                    .file-field.big-2 .file-path-wrapper .file-path {
                        height: 3.5rem; }
                    </style>-->
    </head>

    <body>
        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">
            <!-- ============================================================== -->
            <!--navbar-->
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
                        <div class="">

                            <div id="overlay">

                                <div id="loader"></div>

                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">PO Saving Report</h5><br>
                                        <div class="card-body update-backgroud-color">
                                            <div class="card">
                                                <h5 class="card-header bg-primary">Selection Parameter</h5>
                                                <div class="card-body update-backgroud-color">
                                                    <form action="#" class="needs-validation md-form" method="post" id="" data-parsley-validate="" novalidate="" enctype="multipart/form-data">
                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                        <input type="hidden" id="reqFrom">
                                                        <input type="hidden" id="vendorCodeFromHidden">
                                                        <input type="hidden" id="vendorCodeToHidden">
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label class="inline" for="companycode" style="margin-left: 32px;">Co-Code:</label>
                                                                    <select  tabindex="1" class="custom-select inline" id="companycode" name="companycode" style="width: 200px;margin-left: 32px;">
                                                                        <option value="">Select</option>
                                                                        <c:forEach var="companyCode" items="${companyCodeList}" varStatus="status">
                                                                            <option value="${companyCode}">${companyCode}</option>
                                                                        </c:forEach>
                                                                    </select>

                                                                    <label class="inline" for="tocompanycode" style="margin-left: 32px;">To:</label>
                                                                    <select  tabindex="1" class="custom-select inline" id="tocompanycode" name="tocompanycode" style="width: 200px;margin-left: 32px;">
                                                                        <option value="">Select</option>
                                                                        <c:forEach var="companyCode" items="${companyCodeList}" varStatus="status">
                                                                            <option value="${companyCode}">${companyCode}</option>
                                                                        </c:forEach>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="plantFrom" class="inline" style="margin-left: 32px;">Plant:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="plantFrom" name="plantFrom" style="width: 200px;margin-left: 55px;">
                                                                    <label for="plantto" class="inline" style="margin-left: 33px;">To:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="plantto" name="plantto" style="width: 200px;margin-left: 30px;">
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="purchasingGroupfrom" class="inline" style="margin-left: 32px;">Pur. Group:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="purchasingGroupfrom" name="purchasingGroupfrom" style="width: 200px;margin-left: 21px;">
                                                                    <label for="purchasingGroupto" class="inline" style="margin-left: 33px;">To:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="purchasingGroupto" name="purchasingGroupto" style="width: 200px;margin-left: 30px;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="purchasingOrgFrom" class="inline" style="margin-left: 32px;">Pur Org:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="purchasingOrgFrom" name="purchasingOrgFrom" style="width: 200px;margin-left: 38px;">
                                                                    <label for="purchasingOrgto" class="inline" style="margin-left: 32px;">To:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="purchasingOrgto" name="purchasingOrgto" style="width: 200px;margin-left: 30px;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="docTypeFrom" class="inline" style="margin-left: 32px;">Doc Type:</label>
                                                                    <!--<input type="text" class="form-control form-rounded inline" id="docTypeFrom" name="docTypeFrom" style="width: 200px;margin-left: 28px;">-->

                                                                    <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height inline" id="docTypeFrom" name="docTypeFrom" data-parsley-trigger="change" style="width: 200px;margin-left: 28px;" required="true">
                                                                        <option value="">Select</option>
                                                                        <c:forEach var="potype" items="${PurchaseOrderTypeList}" varStatus="status">
                                                                            <option value="${potype.type}">${potype.type}</option>
                                                                        </c:forEach>
                                                                    </select>
                                                                    <label for="docTypeto" class="inline" style="margin-left: 32px;">To:</label>
                                                                    <!--<input type="text" class="form-control form-rounded inline" id="docTypeto" name="docTypeto" style="width: 200px;margin-left: 30px;">-->

                                                                    <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height inline" id="docTypeto" name="docTypeto" data-parsley-trigger="change" required="true" style="width: 200px;margin-left: 30px;">
                                                                        <option value="">Select</option>
                                                                        <c:forEach var="potype" items="${PurchaseOrderTypeList}" varStatus="status">
                                                                            <option value="${potype.type}">${potype.type}</option>
                                                                        </c:forEach>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="docCatFrom" class="inline" style="margin-left: 32px;">Doc Cat:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="docCatFrom" name="docCatFrom" style="width: 200px;margin-left: 33px;">
                                                                </div>
                                                            </div>        
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="vendorFrom" class="inline" style="margin-left: 30px;">Vendor:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="vendorFrom" name="vendorFrom" style="width: 200px;margin-left: 40px;">
                                                                    <label for="vendorTo" class="inline" style="margin-left: 32px;">To:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="vendorTo" name="vendorTo" style="width: 200px;margin-left: 32px;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="pnoFrom" class="inline" style="margin-left: 30px;">Po No:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="ponoFrom" name="ponoFrom" style="width: 200px;margin-left: 46px;">
                                                                    <label for="pnoTo" class="inline" style="margin-left: 32px;">To:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="ponoTo" name="ponoTo" style="width: 200px;margin-left: 32px;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="gRPostingDateFrom" class="inline" style="margin-left: 30px;">GR Posting Date:</label>
                                                                    <div class="input-group date" id="gRPostingDateFrom_div" data-target-input="nearest" style="margin-left: 30px;">
                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="gRPostingDateFrom" name="gRPostingDateFrom" data-target="#gRPostingDateFrom_div"/>
                                                                        <div class="input-group-append" data-target="#gRPostingDateFrom_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="margin-left: 110px;">
                                                                <div class="form-group">
                                                                    <label for="gRPostingDateTo" class="inline" style="margin-left: 30px;">To:</label>
                                                                    <div class="input-group date" id="gRPostingDateTo_div" data-target-input="nearest" style="margin-left: 30px;">
                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="gRPostingDateTo" name="gRPostingDateTo" data-target="#gRPostingDateTo_div"/>
                                                                        <div class="input-group-append" data-target="#gRPostingDateTo_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <h5 class="card-header bg-primary">Option</h5>
                                                <div class="card-body update-backgroud-color">
                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="form-group two">
                                                                <label class="custom-control custom-radio" style="margin-left: 40px;">
                                                                    <input type="radio" name="poType" value="material" class="custom-control-input" checked="checked"><span class="custom-control-label">Material</span>
                                                                </label>
                                                                <label class="custom-control custom-radio" style="margin-left: 40px;">
                                                                    <input type="radio"name="poType" value="service" class="custom-control-input"><span class="custom-control-label">Service</span>
                                                                </label>
                                                            </div>
                                                        </div>                                                    
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="align-center text-align-center">
                                                                <button class="btn btn-google-plus btn-rounded" id="generatePoSavingReportBtn">Generate Report</button>
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
                    <div class="modal fade" id="accountAssignmentCategoryModal" tabindex="-1" role="dialog" aria-labelledby="accountAssignmentCategoryLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="accountAssignmentLabel">Account Assignment</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-hover table-bordered accountAssignmentCategoryTable-Class" id="accountAssignmentCategoryTableId" style="width: 100%">
                                                    <thead class="">
                                                        <tr class="">

                                                            <th class="border-1" scope="col" style="width:50px;">Code</th>
                                                            <th class="border-1" scope="col">Account Assignment Category</th>
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
                                    <button type="button" class="btn btn-primary" id="clearAccAsgnModalBtn">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>   

                    <div class="modal fade" id="plantMasterModal" tabindex="-1" role="dialog" aria-labelledby="plantMasterModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="plantMasterModalLabel">Plant Master</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover plantMasterTable" id="plantMasterTable" style="width:100%;">
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="border-0">Plant Name</th>
                                                    <th class="border-0">Plant Code</th>
                                                    <th class="border-0">Plant Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="clearPlantPrModalBtn">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="purchasingGroupModal" tabindex="-1" role="dialog" aria-labelledby="purchasingGroupModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="purchasingGroupModalLabel">Purchasing roup</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover purchasingGroupTableClass" id="purchasingGroupTableId" style="width:100%;">
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="border-0">Code</th>
                                                    <th class="border-0">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="clearPlantPrModalBtn">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="PurchaseOrgModal" tabindex="-1" role="dialog" aria-labelledby="PurchaseOrgLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="costCenterLabel">Purchase Organization</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-hover table-bordered purchaseOrgTableClass" id="puechaseOrgTableId" style="width: 100%">
                                                    <thead class="">
                                                        <tr class="">
                                                            <th class="border-1" scope="col" style="width:50px;">Purchase Organization &nbsp;&nbsp;</th>
                                                            <th class="border-1" scope="col">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <!--</div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="vendorModal" tabindex="-1" role="dialog" aria-labelledby="vendorLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="vendorLabel">Vendor</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-hover table-bordered vendorTableClass" id="vendorTableId" style="width: 100%">
                                                    <thead class="">
                                                        <tr class="">
                                                            <th class="border-1" scope="col" style="width:50px;">Vendor Code</th>
                                                            <th class="border-1" scope="col">Vendor Name</th>
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
                                    <button type="button" class="btn btn-primary" id="clearAccAsgnModalBtn">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="PONumberModal" tabindex="-1" role="dialog" aria-labelledby="PONumberLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="PONumberLabel">Vendor</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-hover table-bordered PONumberTableClass" id="PONumberTableId" style="width: 100%">
                                                    <thead class="">
                                                        <tr class="">
                                                            <th class="border-1" scope="col" style="width:50px;">PO Number</th>
                                                            <th class="border-1" scope="col">Company Code</th>
                                                            <th class="border-1" scope="col">PO Type</th>
                                                            <th class="border-1" scope="col">Vendor Code</th>
                                                            <th class="border-1" scope="col">Vendor Name</th>
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
                                    <button type="button" class="btn btn-primary" id="clearAccAsgnModalBtn">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- footer -->
                    <!-- ============================================================== -->

                    <!-- ============================================================== -->
                    <!-- end footer -->
                    <!-- ============================================================== -->
                </div>
                <!-- ============================================================== -->
                <!-- end wrapper  -->
                <!-- ============================================================== -->
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

            <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
            <script src="assets/js/posavingreport.js"></script>

            <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
            <script src="assets/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
            <script src="assets/vendor/datatables/js/dataTables.buttons.min.js"></script>
            <script src="assets/vendor/datatables/js/buttons.bootstrap4.min.js"></script>
            <script src="assets/vendor/datatables/js/data-table.js"></script>
            <script src="assets/vendor/datatables/js/jszip.min.js"></script>
            <script src="assets/vendor/datatables/js/pdfmake.min.js"></script>
            <script src="assets/vendor/datatables/js/vfs_fonts.js"></script>
            <script src="assets/vendor/datatables/js/buttons.html5.min.js"></script>
            <script src="assets/vendor/datatables/js/buttons.print.min.js"></script>
            <script src="assets/vendor/datatables/js/buttons.colVis.min.js"></script>
            <script src="assets/vendor/datatables/js/dataTables.rowGroup.min.js"></script>
            <script src="assets/vendor/datatables/js/dataTables.select.min.js"></script>
            <script src="assets/vendor/datatables/js/dataTables.fixedHeader.min.js"></script>
            <script src="assets/vendor/parsley/parsley.js"></script>

            <script src="assets/vendor/datepicker/moment.js"></script>
            <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
            <script src="assets/vendor/datepicker/datepicker.js"></script>

            <script>
                $(function() {
                    (function() {
                        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
                            iconSource: 'fontAwesome'
                        });
                        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
                            iconSource: 'fontAwesome'
                        });
                    })();

                });

                $(document).ready(function() {
                    $(".chosen").chosen({
                    });
                    //                $("#buyerdetailstable").dataTable();
                    $('.needs-validation').parsley();

                    $("#overlay").css("display", "none");


                });

            </script>

    </body>

</html>
