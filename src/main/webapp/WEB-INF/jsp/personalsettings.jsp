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

        <title>Personal Settings</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
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
                                        <h5 class="card-header bg-primary">Personal Settings</h5>
                                        <div class="card-body update-backgroud-color">
                                            <div class="card">
                                                <h5 class="card-header bg-primary">Header Level</h5>
                                                <div class="card-body update-backgroud-color">
                                                    <!--<div class="table-responsive">-->
                                                    <form action="savePersonalSettings.do" class="needs-validation md-form" method="post" id="personalSettingsform" data-parsley-validate="" novalidate="" enctype="multipart/form-data">
                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                        <input type="hidden" id="plantHidden" name="plantHidden">
                                                        <input type="hidden" id="itemCatHidden" name="itemCatHidden">
                                                        <input type="hidden" id="accAsgnCatHidden" name="accAsgnCatHidden">
                                                        <input type="hidden" id="requisitionerHidden" name="requisitionerHidden">
                                                        <input type="hidden" id="trackingNumberHidden" name="trackingNumberHidden">
                                                        <input type="hidden" id="matlGroupHidden" name="matlGroupHidden">
                                                        <input type="hidden" id="delDateCatHidden" name="delDateCatHidden">
                                                        <input type="hidden" id="ackReqdHidden" name="ackReqdHidden">
                                                        <input type="hidden" id="PromotionHidden" name="PromotionHidden">
                                                        <input type="hidden" id="incoTerms1LineHidden" name="incoTerms1LineHidden">
                                                        <input type="hidden" id="incoTerms2LineHidden" name="incoTerms2LineHidden">
                                                        <input type="hidden" id="grMessageHidden" name="grMessageHidden">
                                                        <input type="hidden" id="isAckReqHidden" name="isAckReqHidden">

                                                        <input type="hidden" id="reqFrom">
                                                        <input type="hidden" id="companyCodeHidden" value="${perSettingsObj.companyCode}">
                                                        <input type="hidden" id="paymentHidden" value="${perSettingsObj.paymentTerms}">
                                                        <input type="hidden" id="pOTypeHidden" value="${perSettingsObj.purDocType}">
                                                        <input type="hidden" id="purOrgHidden" value="${perSettingsObj.purOrg}">
                                                        <input type="hidden" id="currencyHidden" value="${perSettingsObj.currency}">
                                                        <input type="hidden" id="ro_plantHidden" value="${perSettingsObj.plant}">
                                                        <input type="hidden" id="ro_delDateCatHidden" value="${perSettingsObj.delDateCat}">
                                                        <input type="hidden" id="ro_grMessageHidden" value="${perSettingsObj.grMessage}">
                                                        <input type="hidden" id="ro_isAckReqHidden" value="${perSettingsObj.isAckReq}">


                                                        <div class="row">
                                                            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="companycodeHeader" class="">Co-Code:</label>
                                                                    <select  tabindex="1" class="custom-select" id="companycodeHeader" name="companycodeHeader">
                                                                        <option value="">Select</option>
                                                                        <c:forEach var="companyCode" items="${companyCodeList}" varStatus="status">
                                                                            <option value="${companyCode}">${companyCode}</option>
                                                                        </c:forEach>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                <label for="purchasingDocType">Purchasing Doc Type:</label>
                                                                <select class="custom-select dropdown-height" id="purchasingDocType" name="purchasingDocType">
                                                                    <option value="">select</option>
                                                                    <c:forEach var="potype" items="${PurchaseOrderTypeList}" varStatus="status">
                                                                        <option value="${potype.type}">${potype.type}</option>
                                                                    </c:forEach>
                                                                    <!--                                                                <option>Outline Argument</option>
                                                                                                                                    <option>RFQ</option>
                                                                                                                                    <option>Purchase Requisition</option>
                                                                                                                                    <option>purchase Order</option>-->
                                                                </select>
                                                            </div>
                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="purchasingOrg" class="">Purchasing Organization:</label>
                                                                    <select  tabindex="1" class="custom-select" id="purchasingOrg" name="purchasingOrg">
                                                                        <option value="">Select</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="paymentTerms" class="">Payment Terms:</label>
                                                                    <select  tabindex="1" class="custom-select" id="paymentTerms" name="paymentTerms">
                                                                        <option value="">Select</option>
                                                                        <c:forEach var="paymentList" items="${paymentList}" varStatus="status">
                                                                            <option value="${paymentList.paymentTerms}">${paymentList.paymentTerms} - ${paymentList.description}</option>
                                                                        </c:forEach>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="currency" class="">Currency:</label>
                                                                    <select  tabindex="1" class="custom-select" id="currency" name="currency">
                                                                        <option value="">Select</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="YourReference" class="">Our Reference:</label>
                                                                    <input type="text" class="form-control form-rounded" id="ourReference" name="ourReference" value="${perSettingsObj.ourRef}" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                </div>
                                                            </div>               
                                                            <!--</form>-->
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="Incoterms" class="inline">Incoterms:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="IncoTermsPart1" name="IncoTermsPart1" value="${perSettingsObj.incoTerms1}" style="width: 50px;margin-left: 32px;">
                                                                    <input type="text" class="form-control form-rounded inline" id="IncoTermsPart2" name="IncoTermsPart2" value="${perSettingsObj.incoTerms2}" style="width: 300px;">
                                                                    <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                        <input type="checkbox" style="padding-bottom :-50px;" name="GRMessage" id="GRMessage" class="custom-control-input"><span class="custom-control-label">GR Message</span>
                                                                    </label>
                                                                    <label class="custom-control custom-checkbox inline">
                                                                        <input type="checkbox" name="isAckReq" id="isAckReq" class="custom-control-input"><span class="custom-control-label" title="Is Acknowledgement Required ?">Is Ack Req</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                            <div class="card">
                                                <h5 class="card-header bg-primary">Line Level</h5>
                                                <div class="card-body update-backgroud-color">
                                                    <div class="row">
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="plantLineLevel" class="">Plant:</label>
                                                                <select  tabindex="1" class="custom-select" id="plantLineLevel" name="plantLineLevel" required>
                                                                    <option value="">Select</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="itemCategory" class="">Item Category:</label>
                                                                <input type="text" class="form-control form-rounded" id="itemCategory" name="itemCategory" value="${perSettingsObj.itemCategory}">
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="accAssCat" class="">Acc Asgn Cat:</label>
                                                                <input type="text" class="form-control form-rounded" id="accAssCat" name="accAssCat" value="${perSettingsObj.accAssgnCat}">
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="requisitioner" class="">Requisitioner:</label>
                                                                <input type="text" class="form-control form-rounded" id="requisitioner" name="requisitioner" value="${perSettingsObj.requisitioner}">
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="trackingNumber" class="">Tracking Number:</label>
                                                                <input type="text" class="form-control form-rounded" id="trackingNumber" name="trackingNumber" value="${perSettingsObj.trackingNumber}">
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="materialGroup" class="">Material Group:</label>
                                                                <input type="text" class="form-control form-rounded" id="materialGroup" name="materialGroup" value="${perSettingsObj.matlGroup}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="delDateCat" class="">Del Date Cat:</label>
                                                                <select  tabindex="1" class="custom-select" id="delDateCat" name="delDateCat" required>
                                                                    <option value="">Select</option>
                                                                    <option value="D">D - Day Format</option>
                                                                    <option value="T">T - Day Format</option>
                                                                    <option value="W">W - Week Format</option>
                                                                    <option value="M">M - Month Format</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="ackRequired" class="">Ack Reqd:</label>
                                                                <select  tabindex="1" class="custom-select" id="ackRequired" name="ackRequired" required>
                                                                    <option value="">Select</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="promotion" class="">Promotion:</label>
                                                                <textarea class="form-control form-rounded" id="promotion" name="promotion">${perSettingsObj.promotion}</textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="form-group two">
                                                                <label for="IncotermsLineLevel" class="inline">Incoterms:</label>
                                                                <input type="text" class="form-control form-rounded inline" id="IncoTermsPart1_LineLevel" name="IncoTermsPart1_LineLevel" value="${perSettingsObj.incoTerms1Line}" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                <input type="text" class="form-control form-rounded inline" id="IncoTermsPart2_LineLevel" name="IncoTermsPart2_LineLevel" value="${perSettingsObj.incoTerms2Line}" style="width: 300px;" data-parsley-trigger="change" data-parsley-maxlength="28" required="true">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="align-center text-align-center">
                                                                <button class="btn btn-google-plus btn-rounded" id="savePersonalSettings">Update</button>
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
                    <div class="modal fade" id="itemCategoryModal" tabindex="-1" role="dialog" aria-labelledby="itemCategoryLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="itemCategoryLabel">Item Category</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-hover table-bordered itemCategoryTable-Class" id="itemCategoryTableId" style="width: 100%">
                                                    <thead class="">
                                                        <tr class="">

                                                            <th class="border-1" scope="col" style="width:50px;">Item Category Code</th>
                                                            <th class="border-1" scope="col">Item Category  Desc</th>
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
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="clearItemCategoryModalBtn">Clear</button>
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
                    <div class="modal fade" id="trackingNumnerModal" tabindex="-1" role="dialog" aria-labelledby="trackingNumnerModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="trackingNumnerModalLabel">Tracking Number</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover trackingNumnerModalTable" id="trackingNumnerModalTable" style="width:100%;">
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="border-0">Department Code</th>
                                                    <th class="border-0">Department Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="clearTrackNumberModalBtn">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="materialGroupModal" tabindex="-1" role="dialog" aria-labelledby="materialGroupModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="materialGroupModalLabel">Material Group</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover materialGroupTable" id="materialGroupTable" style="width:100%;">
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="border-0">Material Group Code</th>
                                                    <th class="border-0">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="clearMaterialGroupModalBtn">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="incoTermsModal" tabindex="-1" role="dialog" aria-labelledby="incoTermsModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="incoTermsModalLabel">Incoterms</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover incoTermsTable" id="incoTermsTable" style="width:100%;">
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
                                    <!--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>-->
                                    <button type="button" class="btn btn-primary" id="clearIncoTermsModalBtn">Clear</button>
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
            <script src="assets/js/personalsettings.js"></script>

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
