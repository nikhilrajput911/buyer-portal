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

        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_arrows.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_circles.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_dots.min.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <!--<link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />-->

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">
        <link rel="stylesheet" href="assets/css/standalonepo.css">
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />

        <title>Create Standalone PO</title>

        <style>
            td, th {
                white-space: nowrap;
                overflow: hidden;
                /*width: 1000px;*/
            }
            /*            .accountAssignmentClass input:focus{
                            border-color: none
                            outline: 0;
                            background-color: yellow;
                        }*/
            input:focus { 
                /*background-color: yellow;*/
                outline: 0;
            }
            #material_headerClass thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
            .accountAssignmentTebleClass thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
            /*            .nav-tabs{
                            display:inline-flex;
                        }
                        .nav-tabs li{
                            margin-right: 10px;
                            list-style-type:none;
                        }*/
            .parsley-errors-list {
                display: none;
            }
            .createStandalonePoBtn {
                position: fixed;
                /*top: 70px;*/
                right: 50%;
                bottom: 10px;
                z-index: 999;
            }
        </style>
    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>


            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <!-- ============================================================== -->
                        <!-- pageheader  -->
                        <!-- ============================================================== -->

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <div class="row">
                                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                            <h2 class="pageheader-title">Create Standalone PO </h2>
                                        </div>
                                        <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">-->
                                        <div class="form-group two">
                                            <label for="transactionInitiatedOn" class="inline" style="margin-left:15px;color:#3d405c;">Tran. Init. On:</label>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="transactionInitiatedOn" name="transactionInitiatedOn" disabled>-->
                                            <label for="transactionInitiatedOn" class="inline" id="transactionInitiatedOn"></label>
                                            <div class="vl inline"></div>
                                            <label for="creatorId" class="inline" style="color:#3d405c;">Creator Id:</label>
                                            <label for="creatorId" class="inline" id="creatorId">${buyer.username}</label>
                                            <div class="vl inline"></div>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="creatorId" name="creatorId" value="${buyer.username}"disabled>-->
                                            <label for="creatorEmail" class="inline" style="color:#3d405c;">Creator Email:</label>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="creatorEmail" name="creatorEmail" value="${buyer.emailid}"disabled>-->
                                            <label for="creatorId" class="inline" id="creatorEmailId">${buyer.emailid}</label>
                                        </div>
                                        <!--</div>-->
                                        <!--                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group" >
                                                                                        <label for="creatorId">Creator Id:</label>
                                                                                        <input type="text" style="height: 25px;" class="form-control form-rounded" id="creatorId" name="creatorId" value="${buyer.username}"readonly>
                                                                                    </div>
                                                                                </div>-->
                                        <!--                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group" >
                                                                                        <label for="creatorEmail">Creator Email:</label>
                                                                                        <input type="text" style="height: 25px;" class="form-control form-rounded" id="creatorEmail" name="creatorEmail" value="${buyer.emailid}"readonly>
                                                                                    </div>
                                                                                </div>-->
                                    </div>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item">Manage Standalone PO</li>
                                                <li class="breadcrumb-item"><a href="#">Create PO</a></li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== -->
                        <div class="">

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <!--<h5 class="card-header">Contract Status Panel</h5>-->
                                        <div class="card-body">
                                            <form action="#" class="needs-validation" method="post" id="createpoform" data-parsley-validate="" novalidate="">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" name="ro_companyCode" id="ro_companyCode" value="${companyCode}">
                                                <!--<input type="hidden" name="ro_PRType" id="ro_PRType" value="${workOrderObj.pRType}">-->
                                                <input type="hidden" id="ro_costCenter" name="ro_costCenter">
                                                <input type="hidden" id="ro_Order" name="ro_Order">
                                                <input type="hidden" id="ro_GLCOde" name="ro_GLCOde"> 
                                                <input type="hidden" id="ro_CommitItem" name="ro_CommitItem">
                                                <input type="hidden" id="ro_WBSElement" name="ro_WBSElement">
                                                <input type="hidden" id="ro_NetworkNumber" name="ro_NetworkNumber">
                                                <input type="hidden" id="ro_Asset" name="ro_Asset">
                                                <input type="hidden" id="ro_ItemCategory" name="ro_ItemCategory">
                                                <input type="hidden" id="ro_Currency" name="ro_Currency">
                                                <input type="hidden" id="ro_ProfitCenter" name="ro_ProfitCenter">
                                                <input type="hidden" id="serviceTebAccAsgnReqFrom" name="serviceTebAccAsgnReqFrom">
                                                <input type="hidden" id="ro_SalesOrder" name="ro_SalesOrder">
                                                <input type="hidden" id="ro_ItemNumber" name="ro_ItemNumber">
                                                <input type="hidden" id="ServiceLinkNumberId">
                                                <input type="hidden" id="ServiceNetValueId">
                                                <input type="hidden" id="PrType" name="PrType" value="">
                                                <input type="hidden" id="customerSeeded" name="customerSeeded" value="">
                                                <input type="hidden" id="poid" name="poid" value="${NGBPExtPOCreation.id}">
                                                <input type="hidden" name="dmsip" id="dmsip" value="${PONGwebserviceIp}">
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <!--<div class="accrodion-regular">-->
                                                        <!--<div id="accordion3">-->
                                                        <div id="">
                                                            <div class="card">
                                                                <div class="card-body border-top">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group" >
                                                                                <label for="companycodeHeader">Company Code:</label>
                                                                                <select class="custom-select dropdown-height" id="companycodeHeader" name="companycodeHeader" data-parsley-trigger="change" required="true">
                                                                                    <option value= ${NGBPExtPOCreation.companyCode}>${NGBPExtPOCreation.companyCode}</option>
                                                                                    <c:forEach var="code" items="${companyCodeList}" varStatus="status">
                                                                                        <option value="${code.companyCode}">${code.companyCode}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="typeOfPOHeader">Type of PO:</label>
                                                                                <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height" id="typeOfPOHeader" name="typeOfPOHeader" data-parsley-trigger="change" required="true">
                                                                                    <option value= ${NGBPExtPOCreation.purchaseOrderType}>${NGBPExtPOCreation.purchaseOrderType}</option>
                                                                                    <c:forEach var="potype" items="${PurchaseOrderTypeList}" varStatus="status">
                                                                                        <option value="${potype.type}">${potype.type}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendorCodeHeader">Vendor Name/Code:</label>
                                                                                <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Code..." value ="${NGBPExtPOCreation.vendorName}" title="${NGBPExtPOCreation.vendorName}"data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="vendorcodeHeader" name="vendorcodeHeader" data-parsley-trigger="change" data-parsley-length="[4,4]" required>
                                                                                    <!--<option>Select</option>-->
                                                                                    <c:forEach var="vendor" items="${vendorList}" varStatus="status">
                                                                                        <option value="${vendor.sno}">${vendor.vendorName}-${vendor.vendorCode}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="">Doc. Date:</label>
                                                                                <div class="input-group date" id="docDateHeader_div" data-target-input="nearest">
                                                                                    <input type="text" class="form-control datetimepicker-input" id="docDateHeader" value="<fmt:formatDate value="${NGBPExtPOCreation.documentDate}" pattern="dd-MM-yyyy"/>" name="docDateHeader" data-target="#docDateHeader_div"/>
                                                                                    <div class="input-group-append" data-target="#docDateHeader_div" data-toggle="datetimepicker">
                                                                                        <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <c:if test="${reqFrom == 'byrfq'}">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="rfqNumber">RFQ Number: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" value="${rfqHeaderObj.rfqNumber}" readonly="true">
                                                                                </div>
                                                                            </div>
                                                                        </c:if>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <label for="requestType">Request Type:</label>
                                                                            <input type="text" class="form-control form-rounded" id="requestType" name="requestType" value="${NGBPExtPOCreation.requestType}" readonly="true">
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <label for="referenceDocType">Reference Doc Type:</label>
                                                                            <select class="custom-select dropdown-height" id="referenceDocType" value="${NGBPExtPOCreation.referenceDocumentType}" name="referenceDocType">
                                                                                <option value="">Select</option>
                                                                                <option>N/A</option>
                                                                                <option>Outline Argument</option>
                                                                                <option>RFQ</option>
                                                                                <option>Purchase Requisition</option>
                                                                                <option>purchase Order</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <label for="referenceDocNumber">Reference Doc Number:</label>
                                                                            <select class="custom-select dropdown-height" id="referenceDocNumber" name="referenceDocNumber" value="${NGBPExtPOCreation.referenceDocumentNumber}">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <label for="referenceDocLine">Reference Doc Line:</label>
                                                                            <select class="custom-select dropdown-height" id="referenceDocLine" name="referenceDocLine" value="${NGBPExtPOCreation.referenceDocumentLine}">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--</div>-->
                                                            </div>
                                                            <div class="card">
                                                                <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="downPaymentReqd">Downpayment Reqd.:</label>
                                                                                <select class="custom-select dropdown-height" id="downPaymentReqd" value="${NGBPExtPOCreation.downpaymentReqd}" name="downPaymentReqd" data-parsley-trigger="change" required="true">
                                                                                    <!--<option value="">Select</option>-->
                                                                                    <option>Yes</option>
                                                                                    <option>No</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="downPaymentReqdValue">Value:</label>
                                                                                <input type="text" class="form-control form-rounded" id="downPaymentReqdValue" value="${NGBPExtPOCreation.valu}" name="downPaymentReqdValue" data-parsley-trigger="change" data-parsley-maxlength="11" disabled="true">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="downPaymentFor">Downpayment For:</label>
                                                                                <select class="custom-select dropdown-height" id="downPaymentFor" name="downPaymentFor" value="${NGBPExtPOCreation.valu}" disabled="true">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>

                                                                        <!--                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                    <div class="form-group">
                                                                                                                                                        <input type="text" class="form-control form-rounded" id="poid" name="poid" data-parsley-trigger="change" data-parsley-maxlength="11">
                                                                                                                                                    </div>
                                                                                                                                                </div>-->
                                                                        <!--                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                    <div class="form-group">
                                                                                                                                                        <button type="button" style="margin-top: 25px;" onclick="saveHeader()" class="btn btn-primary btn-sm" id="saveHeadersa">Save   </button>
                                                                                                                                                    </div>
                                                                                                                                                </div>-->

                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <button type="button" style="margin-top: 25px;" class="btn btn-primary btn-sm" id="uploadDocumentBtn">Upload Documents</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="prType">PR Type:</label>
                                                                                <select class="custom-select dropdown-height" id="prType" name="prType">
                                                                                    <option value="">Select</option>
                                                                                    <option>Service</option>
                                                                                    <option>Material</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="card box">
                                                    <div class="rightCircle" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                                    <div class="tab-regular collapseDiv">
                                                        <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                            <li class="nav-item">
                                                                <a class="nav-link active" id="deliveryInvoice" data-toggle="tab" href="#deliveryInvoice-tab" role="tab" aria-controls="DeliveryInvoide" aria-selected="true">Delivery/Invoice</a>
                                                            </li> 
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="Conditions" data-toggle="tab" href="#conditions-tab" role="tab" aria-controls="Conditions" aria-selected="false">Conditions</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="vendorAddress" data-toggle="tab" href="#vendorAddress-tab" role="tab" aria-controls="vendorAddress" aria-selected="false">Vendor Address</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="communication" data-toggle="tab" href="#communication-tab" role="tab" aria-controls="Communication" aria-selected="false">Communication</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="partners" data-toggle="tab" href="#partner-tab" role="tab" aria-controls="Partner" aria-selected="false">Partners</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="additionaldata" data-toggle="tab" href="#additionaldata-tab" role="tab" aria-controls="AdditionData" aria-selected="false">Additional Data</a>
                                                            </li>
                                                            <!--                                                        <li class="nav-item">
                                                                                                                        <a class="nav-link" id="address" data-toggle="tab" href="#address-tab" role="tab" aria-controls="Address" aria-selected="false">Address</a>
                                                                                                                    </li>-->
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="org_data" data-toggle="tab" href="#org_data-tab" role="tab" aria-controls="Orgdata" aria-selected="false">Org. Data</a>
                                                            </li>
                                                            <!--                                                        <li class="nav-item">
                                                                                                                        <a class="nav-link" id="MaterialDetils" data-toggle="tab" href="#MaterialDetils-tab" role="tab" aria-controls="MaterialDetils" aria-selected="false">Material Details</a>
                                                                                                                    </li>-->
                                                            <li class="nav-item" style="display: none;" id="customerdata_li">
                                                                <a class="nav-link" id="customerdata" data-toggle="tab" href="#customerdata-tab" role="tab" aria-controls="CustomerData" aria-selected="false">Customer Data</a>
                                                            </li>
                                                            <!--                                                            <li class="nav-item">
                                                                                                                            <a class="nav-link" id="approverDetails" data-toggle="tab" href="#approverDetails-tab" role="tab" aria-controls="ApproverDetails" aria-selected="false">Approver Details</a>
                                                                                                                        </li>-->
                                                        </ul>
                                                        <div class="tab-content">
                                                            <div class="tab-pane fade show active" id="deliveryInvoice-tab" role="tabpanel" aria-labelledby="deliveryInvoice-tab">
                                                                <div class="card-body">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="paymentTermsDelivery" class="inline">Payment Terms:</label>
                                                                                    <select data-placeholder="Select..." tabindex="1" value="${NGBPExtPOCreation.deliveryInvoice.paymentTerms}" class="custom-select dropdown-height payment-term-custom-select inline" id="paymentTermsDelivery" name="paymentTermsDelivery" style="width:240px;" data-parsley-trigger="change" data-parsley-length="[4,4]">
                                                                                        <option value="">Select</option>
                                                                                        <c:forEach var="paymentterm" items="${paymenttermList}" varStatus="status">
                                                                                            <option value="${paymentterm.paymentTerms}">${paymentterm.paymentTerms}</option>
                                                                                        </c:forEach>
                                                                                    </select>
                                                                                    <label for="" class="inline"></label>
                                                                                    <label for="currencyDeliveryInvoice" class="inline" style="margin-left: 250px;">Currency:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="CurrencyDeliveryInvoice" value="${NGBPExtPOCreation.deliveryInvoice.currency}" name="CurrencyDeliveryInvoice" style="width: 100px;margin-left: 42px;" required>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="paymentDays1" class="inline">Payment in:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="paymentDays1" name="paymentDays1" value="${NGBPExtPOCreation.deliveryInvoice.paymentindays1}" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                    <label for="PaymentTerms" class="inline">days</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="paymentPer1" name="paymentPer1" value="${NGBPExtPOCreation.deliveryInvoice.paymentinpercnt1}" style="width: 100px;" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                    <label for="PaymentTerms" class="inline">%</label>
                                                                                    <label for="ExchangeRate" class="inline" style="margin-left: 240px;">Exchange Rate</label>
                                                                                    <input type="number" class="form-control form-rounded inline" id="ExchangeRate" name="ExchangeRate" value="${NGBPExtPOCreation.deliveryInvoice.exchangeRate}" style="width: 100px;margin-left: 10px;" data-parsley-trigger="change" data-parsley-maxlength="9" required="true">
                                                                                    <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                        <input type="checkbox" style="padding-bottom :-50px;" name="ExchangeReateFixed" id="ExchangeReateFixed" value="${NGBPExtPOCreation.deliveryInvoice.exchangeRateFixed}" class="custom-control-input"><span class="custom-control-label" required="">Exchange Rate Fixed</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="paymentDays2" class="inline">Payment in:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" value="${NGBPExtPOCreation.deliveryInvoice.paymentindays2}" id="paymentDays2" name="paymentDays2" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                    <label for="PaymentTerms" class="inline">days</label>
                                                                                    <input type="text" class="form-control form-rounded inline" value="${NGBPExtPOCreation.deliveryInvoice.paymentinpercnt2}" id="paymentPer2" name="paymentPer2" style="width: 100px;" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                    <label for="PaymentTerms" class="inline">%</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="PaymentTerms" class="inline">Payment in:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" value="${NGBPExtPOCreation.deliveryInvoice.paymentindaysnet}" id="paymentDaysNet" name="paymentDaysNet" style="width: 100px;margin-left: 25px;" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                    <label for="PaymentTerms" class="inline">days net</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="Incoterms" class="inline">Incoterms:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" value="${NGBPExtPOCreation.deliveryInvoice.incoterms1}" id="IncoTermsPart1" name="IncoTermsPart1" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                    <input type="text" class="form-control form-rounded inline" value="${NGBPExtPOCreation.deliveryInvoice.incoterms2}" id="IncoTermsPart2" name="IncoTermsPart2" style="width: 300px;" data-parsley-trigger="change" data-parsley-maxlength="28" required="true">
                                                                                    <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                        <input type="checkbox" style="padding-bottom :-50px;"  name="GRMessage" id="GRMessage" class="custom-control-input"><span class="custom-control-label" required="">GR Message</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!--</table>-->
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show" id="conditions-tab" role="tabpanel" aria-labelledby="conditions-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowConditionsBtnId" style="margin-left: 20px;"></i></a>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="conditionDetailsBtn_div" style="display: none;">
                                                                            <div class="form-group">
                                                                                <a><i type="buttom"  class="fa fa-arrow-circle-right btn-primary btn-sm" id="conditionDetailsBtn" aria-hidden="true"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="card-body">
                                                                                <div class="table-responsive" style="height: 260px;">
                                                                                    <table class="table table-bordered" id="conditionTableId">
                                                                                        <thead class="table-header-color">
                                                                                            <tr class="border-0">
                                                                                                <th class="border-0"></th>
                                                                                                <th class="border-0">Condition Type</th>
                                                                                                <th class="border-0">Name</th>
                                                                                                <th class="border-0">Amount</th>
                                                                                                <th class="border-0">Per</th>
                                                                                                <th class="border-0">Condition Pricing Unit</th>
                                                                                                <th class="border-0">Currency</th>
                                                                                                <th class="border-0">UOM</th>
                                                                                                <th class="border-0">Condition Value</th>
                                                                                                <th class="border-0">Currency</th>
                                                                                                <th class="border-0">Condition Value</th>
                                                                                                <th class="border-0">Condition Currency</th>
                                                                                                <th class="border-0">Condition Details</th>
                                                                                                <!--<th class="border-0"></th>-->
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>

                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                            <div class="tab-pane fade show" id="vendorAddress-tab" role="tabpanel" aria-labelledby="vendorAddress-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="streetVendorAddress" class="">Street:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.street}" id="streetVendorAddress" name="streetVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="60" required="true">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="houseNumberVendorAddress" class="">House Number:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.houseNumber}" id="houseNumberVendorAddress" name="houseNumberVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="10" required="true">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="postalCodeVendorAddress" class="">Postal Code:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.postalCode}" id="postalCodeVendorAddress" name="postalCodeVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="10">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="cityVendorAddress" class="">City:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.city}" id="cityVendorAddress" name="cityVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="40">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="extTel" class="">Extension Tel:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.telExt}" id="extTel" name="extTel" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="telephoneVendorAddress" class="">Telephone:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.telNo}" id="telephoneVendorAddress" name="telephoneVendorAddress" data-parsley-type="digits" data-parsley-trigger="change" data-parsley-maxlength="30">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="extFax" class="">Extension Fax:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.faxExt}" id="extFax" name="extFax" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="faxVendorAddress" class="">Fax:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.faxNo}" id="faxVendorAddress" name="faxVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="30">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="countryCodeVendorAddress" class="">Country Code:</label>
                                                                                <input type="text" class="form-control form-rounded" id="countryCodeVendorAddress" name="countryCodeVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="countryVendorAddress" class="">Country:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.vendorAddress.country}" id="countryVendorAddress" name="countryVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--</div>-->
                                                            </div>
                                                            <div class="tab-pane fade show" id="communication-tab" role="tabpanel" aria-labelledby="communication-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Salesperson" class="">Salesperson:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.deliveryComm.salesPerson}" id="Salesperson" name="Salesperson" data-parsley-trigger="change" data-parsley-maxlength="30" required="true">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="YourReference" class="">Your Reference:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.deliveryComm.yourReference}" id="YourReference" name="YourReference" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Telephone" class="">Telephone:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.deliveryComm.telephone}" id="Telephone" name="Telephone" data-parsley-type="digits" data-parsley-trigger="change" data-parsley-maxlength="16">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="OurReference" class="">Our Reference:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.deliveryComm.ourReference}" id="OurReference" name="OurReference" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Language" class="">Language:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.deliveryComm.lang}" id="Language" name="Language" readonly="true">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--</div>-->
                                                            </div>
                                                            <div class="tab-pane fade show" id="partner-tab" role="tabpanel" aria-labelledby="partner-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md- col-sm-12 col-12">
                                                                            <div class="table-responsive">
                                                                                <table class="table table-bordered" id="partnerTableId">
                                                                                    <thead class="table-header-color">
                                                                                        <tr class="border-0">
                                                                                            <th class="border-0 th-color" style="padding-left:120px;">Partner Function</th>
                                                                                            <th class="border-0 th-color" style="padding-left:120px;">Name</th>
                                                                                            <th class="border-0 th-color" style="padding-left:120px;">Number</th>
                                                                                            <th class="border-0 th-color" style="padding-left:120px;">Vendor Name</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td><input type="text" class="form-control form-rounded PartnerFunction" name="PartnerFunction"></td>
                                                                                            <td><input type="text" class="form-control form-rounded namePertners" name="namePertners"></td>
                                                                                            <td><input type="text" class="form-control form-rounded numberPartner" name="numberPartner"></td>
                                                                                            <td><input type="text" class="form-control form-rounded vendorNamePartners" name="vendorNamePartners"></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--</div>-->
                                                            </div>
                                                            <div class="tab-pane fade show" id="additionaldata-tab" role="tabpanel" aria-labelledby="additionaldata-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="CollectiveNumber" class="">Collective Number:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.collectiveNumber}" id="CollectiveNumber" name="CollectiveNumber" data-parsley-trigger="change" data-parsley-maxlength="10">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show" id="org_data-tab" role="tabpanel" aria-labelledby="org_data-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="purchasingOrg" class="">Purchasing Organization:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.purchasingOrg}" id="purchasingOrg" name="purchasingOrg" data-parsley-trigger="change" data-parsley-maxlength="4">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="purchasingGroup" class="">Purchasing Group:</label>
                                                                                <select class="custom-select" id="purchasingGroup" value="${NGBPExtPOCreation.purchasingGrp}" name="purchasingGroup" data-parsley-trigger="change" required="true">
                                                                                    <option value="">Select</option>
                                                                                    <c:forEach var="PurchasingGroupList" items="${PurchasingGroupList}" varStatus="status">
                                                                                        <option value="${PurchasingGroupList.purchasingGroupCode}">${PurchasingGroupList.purchasingGroupCode}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show" id="customerdata-tab" role="tabpanel" aria-labelledby="customerdata-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="PaymentImmediate" class="">Payment Immediate: </label>
                                                                                <label class="custom-control custom-checkbox">
                                                                                    <input type="checkbox" name="PaymentImmediate" id="PaymentImmediate" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="ExternalWeight" class="">External Weight: </label>
                                                                                <label class="custom-control custom-checkbox">
                                                                                    <input type="checkbox" name="ExternalWeight" id="ExternalWeight" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="PriceDisplay" class="">Price Display: </label>
                                                                                <label class="custom-control custom-checkbox">
                                                                                    <input type="checkbox" name="PriceDisplay" id="PriceDisplay" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="InstructionToWeigher" class="">Instruction to Weigher:</label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.custData.instructionsToWeighter}" id="InstructionToWeigher" name="InstructionToWeigher" data-parsley-trigger="change" data-parsley-maxlength="35">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="ZoneCollectionScrap" class="">Zone Collection Scrap:</label>
                                                                                <select class="custom-select" value="${NGBPExtPOCreation.custData.zoneCollectionScrap}" id="ZoneCollectionScrap" name="ZoneCollectionScrap">
                                                                                    <option value="">Select</option>
                                                                                    <option>ZONE3</option>
                                                                                    <option>ZONE5</option>
                                                                                    <option>ZONE6</option>
                                                                                    <option>ZONE7</option>
                                                                                    <option>ZONE8</option>
                                                                                    <option>ZONE8</option>
                                                                                    <option>ZONE11</option>
                                                                                    <option>ZONE45</option>
                                                                                    <option>ZONE50</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="ProductOrigin" class="">Product Origin: </label>
                                                                                <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.custData.productOrigin}" id="ProductOrigin" name="ProductOrigin" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="SegmentDescription" class="">Segment (Description):</label>
                                                                                <select class="custom-select" value="${NGBPExtPOCreation.custData.segment}" id="SegmentDescription" name="SegmentDescription">
                                                                                    <option value="">Select</option>
                                                                                </select>

                                                                            </div>
                                                                        </div> 
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="ConfControl" class="">Conf. Control:</label>
                                                                                <select class="custom-select" id="ConfControl" name="ConfControl">
                                                                                    <option>Confirmations</option>
                                                                                    <option>Inb. Deliv./Rough GR</option>
                                                                                    <option>Inbound Delivery</option>
                                                                                    <option>Rough GR</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--</div>-->
                                                            </div>
                                                            <div class="tab-pane fade show" id="approverDetails-tab" role="tabpanel" aria-labelledby="approverDetails-tab">

                                                                <!--<h5>Customer Data</h5>-->
                                                                <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <!--<h5>Approver Details</h5>-->
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Approver1" class="">Approver 1:</label>
                                                                                <select class="custom-select" id="Approver1" name="Approver1">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Approver2" class="">Approver 2:</label>
                                                                                <select class="custom-select" id="Approver2" name="Approver2">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Approver3" class="">Approver 3:</label>
                                                                                <select class="custom-select" id="Approver3" name="Approver3">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Approver4" class="">Approver 4:</label>
                                                                                <select class="custom-select" id="Approver4" name="Approver4">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Approver5" class="">Approver 5:</label>
                                                                                <select class="custom-select" id="Approver5" name="Approver5">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Approver6" class="">Approver 6:</label>
                                                                                <select class="custom-select" id="Approver6" name="Approver6">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Approver7" class="">Approver 7:</label>
                                                                                <select class="custom-select" id="Approver7" name="Approver7">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--</div>-->
                                                                <!--</div>-->
                                                                <!--</div>-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <br>

                                                <br>
                                              <form>
                                               <div class="card">
                                                    <div class="rightCircle3" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                                    <div class="row collapseDiv3">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <button type="button" class="btn btn-primary btn-sm" id="addPrLineBtn">Add PR Line</button>
                                                                    </div>
                                                                </div>
                                                                <br>
                                                                
                                                                <div class="table-responsive" style="height: 260px;">
                                                                    <table class="table table-bordered material_table-header-color" id="material_headerClass">
                                                                        <thead class="">
                                                                            <tr class="border-0">
                                                                                <th class="border-0"></th>
                                                                                <th class="border-0">Item Number</th>
                                                                                <th class="border-0">Ac Asgn</th>
                                                                                <th class="border-0">Item Cat</th>
                                                                                <th class="border-0">Material Code</th>
                                                                                <th class="border-0">Criticality</th>
                                                                                <th class="border-0">Short Text</th>
                                                                                <th class="border-0">Long Text</th>
                                                                                <th class="border-0">Quantity</th>
                                                                                <th class="border-0">Net Price</th>
                                                                                <th class="border-0">(Per) Unit</th>
                                                                                <th class="border-0">Currency</th>
                                                                                <th class="border-0">O P U</th>
                                                                                <th class="border-0">Delivery Date Category</th>
                                                                                <th class="border-0">Requisition Date</th>
                                                                                <th class="border-0">Delivery Date</th>
                                                                                <th class="border-0">Plant</th>
                                                                                <th class="border-0">Matl. Group</th>
                                                                                <th class="border-0">Purchasing Organization</th>
                                                                                <th class="border-0">Purchasing Group</th>
                                                                                <th class="border-0">Storage Location</th>
                                                                                <th class="border-0">Batch</th>
                                                                                <th class="border-0">Info Record</th>
                                                                                <th class="border-0">PR Requisitioner</th>
                                                                                <th class="border-0">PR Creator</th>
                                                                                <th class="border-0">PR Department Name</th>
                                                                                <th class="border-0">PO Department Name</th>
                                                                                <th class="border-0">Higher Level Item</th>
                                                                                <th class="border-0">Sub Item Category</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="POCreationLineItem" items="${POCreationLineItem}" varStatus="status">
                                                                                <tr>
                                                                                    <td><input type=hidden class=PODistribution value="${POCreationLineItem.distribution}">
                                                                                    <input type='hidden' class=POPartialInvoiceIndicator value="${POCreationLineItem.partialInvoiceIndicator}">
                                                                                    <input type='hidden' class=prTaxCode value="${POCreationLineItem.taxCode}">
                                                                                    <input type='hidden' class='linkid' value="${POCreationLineItem.linkId}">
                                                                                    <input type='hidden' class='prNumber' value="">
                                                                                    <input type='hidden' class='prgLCode' value="${POCreationLineItem.gLCode}">
                                                                                    <input type='hidden' class='przGLCode' value="${POCreationLineItem.zGLCode}"></td>
                                                                                    <td>${POCreationLineItem.itemNumber}</td>
                                                                                    <td><input type='text' value='${POCreationLineItem.accountAssignment}' class='accountAssignmentClass form-control form-rounded'></td>
                                                                                    <td><input type='text' value='${POCreationLineItem.itemCategory}' class='itemCategoryClass form-control form-rounded'></td>
                                                                                    <td><input type='text' value='${POCreationLineItem.materialCode}' class='materialCodeClass form-control form-rounded'></td>
                                                                                    <td><select class='custom-select' value='${POCreationLineItem.criticality}'>><option Select</option><option>High Criticality (h)</option><option>Low Criticality (l)</option><option>Off Site (o)</option><option>Manpower (m)</option></select></td>
                                                                                    <td>${POCreationLineItem.shortText}</td>
                                                                                    <td>${POCreationLineItem.materialLongText}</td>
                                                                                    <td><input type='number' value='${POCreationLineItem.quantity}' class='form-control form-rounded quantity_Class'></td>
                                                                                    <td>${POCreationLineItem.priceUnit}</td>
                                                                                    <td>${POCreationLineItem.total}</td>
                                                                                    <td><input type='text' value='${POCreationLineItem.currency}' class='currencyClass form-control form-rounded'></td>
                                                                                    <td>${POCreationLineItem.priceUnit}</td>
                                                                                    <td>${POCreationLineItem.deliveryDateCategory}</td>
                                                                                    <td>${POCreationLineItem.requisitionDate}</td>
                                                                                    <td>${POCreationLineItem.deliveryDate}</td>
                                                                                    <td><input type='text' value='${POCreationLineItem.plant}' class='plantClass form-control form-rounded'></td>
                                                                                    <td>${POCreationLineItem.materialGroup}</td>
                                                                                    <td></td>
                                                                                    <td><input type='text' value='${POCreationLineItem.purchasingGroup}' class='purchaseGroupClass form-control form-rounded'></td>
                                                                                    <td><input type='text' value='${POCreationLineItem.storageLocation}' class='storageLocationClass form-control form-rounded'></td>
                                                                                    <td>${POCreationLineItem.batch}</td>
                                                                                    <td>${POCreationLineItem.infoRecord}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td><input type='text' value='' class='prDeptNameClass form-control form-rounded'></td>
                                                                                    <td><input type='text' value='' class='poDeptNameClass form-control form-rounded'></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" style="max-width: 100%;">
                                                            <center>
                                                                <button type="button" onclick="saveHeader()" class="btn btn-primary btn-sm" id="saveHeadersa">Save PO Header</button>
                                                            </center>
                                                        </div>
                                                        <br>
                                                    </div>
                                                </div>
                                              </form>
                                                <br>
                                                <!--</div>-->
                                                <div class="card">
                                                    <div class="rightCircle2" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                                    <div class="tab-regular collapseDiv2">
                                                        <label for="Item" class="inline" style="margin-left:10px;margin-bottom:20px;">Item:</label>
                                                        <select class="custom-select inline ItemNumberSelectClass" style="width:250px;margin-bottom:0px;margin-left:50px;" id="ItemNumberSelect" name="Item">
                                                            <c:forEach var="POCreationLineItem" items="${POCreationLineItem}" varStatus="status">
                                                                <option value="${POCreationLineItem.itemNumber}">${POCreationLineItem.itemNumber}</option>
                                                            </c:forEach>
                                                        </select> 
                                                        <button type="button" onclick="savePrSubLine()" class="btn btn-primary btn-sm" id="saveLineItemData">Save</button>
                                                    </div>
                                                    <ul class="nav nav-tabs nav-fill nav-tabs" id="myTab7" role="tablist">
                                                        <li class="nav-item" id="serviceTab_li">
                                                            <a class="nav-link active" id="services" data-toggle="tab" href="#services-tab" role="tab" aria-controls="services" aria-selected="true">Services</a>
                                                        </li>
                                                        <li class="nav-item" id="limits_li">
                                                            <a class="nav-link" id="limits" data-toggle="tab" href="#limits-tab" role="tab" aria-controls="limits" aria-selected="false">Limits</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="quantities" data-toggle="tab" href="#quantities-tab" role="tab" aria-controls="quantities" aria-selected="false">Qty/Wgts</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="deliverySchedule" data-toggle="tab" href="#deliverySchedule-tab" role="tab" aria-controls="deliverySchedule" aria-selected="false">Delivery Schedule</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="delivery" data-toggle="tab" href="#delivery-tab" role="tab" aria-controls="Delivery" aria-selected="false">Delivery</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="invoice" data-toggle="tab" href="#invoice-tab" role="tab" aria-controls="Invoice" aria-selected="false">Invoice</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="conditions_linelevel" data-toggle="tab" href="#conditions_linelevel-tab" role="tab" aria-controls="Conditions" aria-selected="false">Conditions</a>
                                                        </li>
                                                        <li class="nav-item" id="accAsgn_li">
                                                            <a class="nav-link" id="account_assignment" data-toggle="tab" href="#account_assignment-tab" role="tab" aria-controls="AccountAssignment" aria-selected="false">Account Assignment</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="texts" data-toggle="tab" href="#texts-tab" role="tab" aria-controls="texts" aria-selected="false">Texts</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="deliveryAddress" data-toggle="tab" href="#deliveryAddress-tab" role="tab" aria-controls="deliveryAddress" aria-selected="false">Delivery Address</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="confirmations" data-toggle="tab" href="#confirmations-tab" role="tab" aria-controls="confirmations" aria-selected="false">Confirmations</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="conditionControl" data-toggle="tab" href="#conditionControl-tab" role="tab" aria-controls="conditionControl" aria-selected="false">Condition Control</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="customerData_linelevel" data-toggle="tab" href="#customerData_linelevel-tab" role="tab" aria-controls="customerData_linelevel" aria-selected="false">Customer Data</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="headerText_linelevel" data-toggle="tab" href="#headerText_linelevel-tab" role="tab" aria-controls="headerText_linelevel" aria-selected="false">Header Text</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="component_linelevel" data-toggle="tab" href="#component_linelevel-tab" role="tab" aria-controls="component_linelevel" aria-selected="false">Component</a>
                                                        </li>
                                                    </ul>
                                                    <div class="tab-content">
                                                        <div class="tab-pane fade show active" id="services-tab" role="tabpanel" aria-labelledby="services-tab">
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowServiceBtnId" style="margin-left: 20px;"></i></a>
                                                                                    <!--<input type="button" class="fas fa-plus-circle btn-lg" id="addRowServiceBtnId" style="margin-left: 20px;">-->
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="serviceTabAccAssgnModelBtn_div" style="display:none;">
                                                                                <div class="form-group">
                                                                                    <a><i type="buttom"  class="fa fa-arrow-circle-right btn-primary btn-sm" id="accountAssignmentAddBtn" aria-hidden="true"></i></a>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" title="save" id="serviceTabTableSaveBtn" aria-hidden="true"></i></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="table-responsive" style="height:260px;">
                                                                            <table class="table table-bordered" id="serviceTableId">
                                                                                <thead class="table-header-color">
                                                                                    <tr class="border-0">
                                                                                        <th class="border-0"></th>
                                                                                        <th class="border-0">Line Item Number</th>
                                                                                        <th class="border-0">Service Number</th>
                                                                                        <th class="border-0">Short Text</th>
                                                                                        <th class="border-0">Quantity</th>
                                                                                        <th class="border-0">Unit</th>
                                                                                        <th class="border-0">Gross Price</th>
                                                                                        <th class="border-0">Currency</th>
                                                                                        <th class="border-0">Net Price</th>
                                                                                        <th class="border-0">Edition</th>
                                                                                        <th class="border-0">Line Item Long Text</th>
                                                                                        <th class="border-0">Overf. Tolerance</th>
                                                                                        <th class="border-0" style="width:50px;"></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td><input type="checkbox" class="checkboxServices" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded lineItemNumberServices tableInputField" value=10 id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded ServicesNumber_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded shortText_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded quantity_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded servicesUnit_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded grossPrice_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded currency_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded netPrice_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded edition_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded lineItemLongText_Services tableInputField" id="" name=""></td>
                                                                                        <td><input type="text" class="form-control form-rounded overfTolerance_Services tableInputField" id="" name=""></td>
                                                                                        <td></td>
                                                                                    </tr>                                                                             
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <!--                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="conditionDetailsBtn_div" style="display:none;">
                                                                                                                                                <div class="form-group">
                                                                                                                                                    <a><i type="buttom"  class="fa fa-arrow-circle-right btn-primary btn-sm" id="accountAssignmentAddBtn" aria-hidden="true"></i></a>
                                                                                                                                                </div>
                                                                                                                                            </div>-->
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                            <!--                                                                <div class="row">
                                                                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="conditionDetailsBtn_div">
                                                                                                                                    <div class="form-group">
                                                                                                                                        <a><i type="buttom"  class="fa fa-arrow-circle-right btn-primary btn-sm" id="accountAssignmentAddBtn" aria-hidden="true"></i></a>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>-->
                                                            <!--</div>-->
                                                            <!--</div>-->

                                                        </div>
                                                        <div class="tab-pane fade show" id="limits-tab" role="tabpanel" aria-labelledby="limits-tab">
                                                            <div class="card-body">
                                                                <!--<h5>Limits</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="OverallLimit" class="">Overall Limit:</label>
                                                                            <input type="text" class="form-control form-rounded" id="OverallLimit" name="OverallLimit">

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ExpectedValue" class="">Expected Value:</label>
                                                                            <input type="text" class="form-control form-rounded" id="ExpectedValue" name="ExpectedValue">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="NoLimit" class="">No Limit: </label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="NoLimit" id="NoLimit" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" id="limitAccountAsgn" style="padding-top:25px;display:none;">
                                                                        <div class="form-group">
                                                                            <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="limitsAccAsgnBtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowLimitTabBtnId" style="margin-left: 20px;"></i></a>
                                                                </div>
                                                            </div>
                                                            <div class="card-body">
                                                                <div class="table-responsive" style="height:260px;">
                                                                    <table class="table table-bordered deliveryScheduleTableClass" id="limitTabTableId" style="width: 60%;">
                                                                        <thead class="table-header-color">
                                                                            <tr class="">
                                                                                <th class="border-1 th-color" style="width:20px;"></th>
                                                                                <th class="border-1 th-color" style="width:50px;">Contract</th>
                                                                                <th class="border-1 th-color" style="width:300px;">Item Number</th>
                                                                                <th class="border-1 th-color" style="width:100px;">Over All Limit</th>
                                                                                <th class="border-1 th-color" style="width:100px;">Expected Value</th>
                                                                                <th class="border-1 th-color" style="width:150px;">No Limit</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblContract" name="limitTblContract"></td>
                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblItemNumber" name="limitTblItemNumber"></td>
                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblOverAllLimit" name="limitTblOverAllLimit"></td>
                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblExpctValue" name="limitTblExpctValue"></td>
                                                                                <td><input type="checkbox" class="limitTblNoLimit" name="limitTblNoLimit"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="quantities-tab" role="tabpanel" aria-labelledby="quantities-tab">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group" style="margin-bottom:0px;">
                                                                            <label for="pOQuantity" class="">PO Quantity/Unit:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.poQuantity}" id="pOQuantit" name="pOQuantity" style="width:150px;margin-left:50px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$" required="true">
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.poQuantityUnit}" id="pOUnit" name="pOUnit" style="width:50px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                            <label for="orderUnit" class="" style="margin-left:30px;">Order Unit</label>
                                                                            <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <label for="orderPriceUnit" class="inline" style="margin-left:5px;">Order Price Unit:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.orderUnit1}" id="orderUnit" name="orderUnit" style="width:80px;margin-left:30px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$">
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.order1}" id="unitOrderUnit" name="unitOrderUnit" style="width:40px" readonly>
                                                                            <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.orderPrice}" id="orderPriceUnit" name="orderUnit" style="width:80px;margin-left:5px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$">
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.orderPriceUnit}" id="unitOrderPriceUnit" name="unitOrderPriceUnit" style="width:40px" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group" style="margin-bottom:0px;">
                                                                            <label for="pOQuantitySKU" class="">PO Quantity in SKU/Unit:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.poQuantitySKU}" id="pOQuantitySKU" name="pOQuantitySKU" style="width:150px;margin-left:10px;" readonly>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.poQuantitySKUUnit}" id="pOUnitSKU" name="pOUnitSKU" style="width:50px;" readonly>
                                                                            <label for="orderUnit2" class="" style="margin-left:30px;">Order Unit</label>
                                                                            <label class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <label for="sKUUnit" class="inline" style="margin-left:5px;">SKU:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.orderUnit2}" id="orderUnit2" name="orderUnit2" style="width:80px;margin-left:90px;" readonly>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.order2}" id="unitOrderUnit2" name="unitOrderUnit2" style="width:40px" readonly>
                                                                            <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.sku}" id="sKUUnit" name="sKUUnit" style="width:80px;margin-left:5px;" readonly>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.quanWeight.skuUnit}" id="unitSKUUnit" name="unitSKUUnit" style="width:40px" readonly>

                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="align-center text-align-center">
                                                                                    <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveQuantityDatesBtn" value="Save" style="Margin-left:580px;">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade show" id="deliverySchedule-tab" role="tabpanel" aria-labelledby="deliverySchedule-tab">
                                                            <div class="row">
                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowdeliveryScheduleBtnId" style="margin-left: 20px;margin-top:10px;"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveDeliverSch" aria-hidden="true" style="margin-left: 20px;margin-top:10px;"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="card-body">
                                                                <div class="table-responsive" style="height:260px;">
                                                                    <table class="table table-bordered deliveryScheduleTableClass" id="DeliveryScheduleTableId" style="width: 100%;">
                                                                        <thead class="table-header-color">
                                                                            <tr class="">
                                                                                <!--<th class="border-1 th-color" style="width:20/px;"></th>-->
                                                                                <th class="border-1 th-color" style="width:50px;">D.D.Cat.</th>
                                                                                <th class="border-1 th-color" style="width:300px;">Delivery Date</th>
                                                                                <th class="border-1 th-color" style="width:150px;">Sch Qty</th>
                                                                                <th class="border-1 th-color" style="width:100px;">Time</th>
                                                                                <th class="border-1 th-color" style="width:100px;">Pur Req Num</th>
                                                                                <th class="border-1 th-color" style="width:50px;">Req Item Num</th>
                                                                                <th class="border-1 th-color" style="width:20px;"></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <!--<td><input type="checkbox" class=" checkboxDeliverySch" id="" name=""></td>-->
                                                                                <td><input type="text" class="form-control form-rounded deliveryDateCategory tableInputField " id="deliveryDateCategoryId" name="deliveryDateCategoryId"></td>
                                                                                <td><input type="date" id="deliveryDate" class="deliveryDateClass" style="width:300px;"></td>
                                                                                <td><input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" name="scheduledQuantity"></td>
                                                                                <td><input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" name="timeDeliveryScheduled"></td>
                                                                                <td>
                                                                                    <select class="custom-select tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" name="prNumberDeliveryScheduled">
                                                                                        <option value="">Select</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td>
                                                                                    <select class="custom-select tableInputField reqItemNumberClass" id="reqItemNumber" name="reqItemNumber">
                                                                                        <option value="">Select</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="delivery-tab" role="tabpanel" aria-labelledby="delivery-tab">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <label for="OverdeliveryTolerance" class="inline" style="margin-left:10px;">Overdel. Tol:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.overDelTol}" id="OverdeliveryTolerance" name="OverdeliveryTolerance" style="width:50px;margin-left:53px;" data-parsley-trigger="change" data-parsley-maxlength="5" data-parsley-pattern="^[0-9]*\.[0-9]{1}$">
                                                                            <label for="" class="inline">%</label>
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="unlimited" id="unlimited" class="custom-control-input" checked="true"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GoodsReceipt" class="inline">Unlimited: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="UnderdeliveryTolerance" class="inline" style="margin-left:10px;">Underdel Tol:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.underDelTol}" id="UnderdeliveryTolerance" value="0.0" name="UnderdeliveryTolerance" style="width:50px;margin-left:50px;" data-parsley-trigger="change" data-parsley-maxlength="5" data-parsley-pattern="^[0-9]*\.[0-9]{1}$">
                                                                            <label for="" class="inline">%</label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="ShippingInstruction" class="inline" style="margin-left:10px;">Shipping Instruction:</label>
                                                                            <select class="custom-select inline" value="${POCreationLineItemSingle.invDel.shippingInstructions}" id="ShippingInstruction" name="ShippingInstruction" style="width:80px;margin-left:10px;">
                                                                                <!--<option value="">Select</option>-->
                                                                            </select>

                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="StockType" class="inline" style="margin-left:10px;">Stock Type:</label>
                                                                            <select class="custom-select inline"  value="${POCreationLineItemSingle.invDel.stockType}" id="StockType" name="StockType" style="width:80px;margin-left:60px;">
                                                                                <!--<option value="">Select</option>-->
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="ValuationType" class="inline" style="margin-left:10px;">Valuation Type:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.valuationType}" id="ValuationType" name="ValuationType" style="width:200px;margin-left:40px;" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="RemShelfLife" class="inline" style="margin-left:10px;">Rem. Shelf Life:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.remShelfLife}" id="RemShelfLife" name="RemShelfLife" style="width:100px;margin-left:35px;" data-parsley-trigger="change" data-parsley-maxlength="4">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="QAControlLife" class="inline" style="margin-left:10px;">QA Control life:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.qaControlLife}" id="QAControlLife" name="QAControlLife" style="width:120px;margin-left:40px;" data-parsley-trigger="change" data-parsley-maxlength="8">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="GRProcTime" class="inline" style="margin-left:10px;">GR Proc. Time:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.grProcTime}" id="GRProcTime" name="GRProcTime" style="width:50px;margin-left:40px;" data-parsley-trigger="change" data-parsley-maxlength="3"> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <label for="FirstReminderExpediter" class="inline">1st Rem/Exp:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.fstRemExped}" id="FirstReminderExpediter" name="FirstReminderExpediter" style="width:50px;margin-left:14px;" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="GoodsReceipt" id="GoodsReceipt" class="custom-control-input" checked="true" disabled="true"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GoodsReceipt" class="inline">Goods Receipt: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="SecondReminderExpediter" class="inline">2nd Rem/Exp:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.secRemExped}" id="SecondReminderExpediter" name="SecondReminderExpediter" style="width:50px;margin-left:10px;" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="GRNonValuated" id="GRNonValuated" class="custom-control-input" checked="true" disabled="true"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GRNonVal" class="inline">GR Non-Valuated: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="ThirdReminderExpediter" class="inline">3rd Rem/Exp:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.thrdRemExped}" id="ThirdReminderExpediter" name="ThirdReminderExpediter" style="width:50px;margin-left:14px;" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="DelivCompleted" id="DelivCompleted" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GoodsReceipt" class="inline">Deliv. Completed: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="NoExpend" class="inline">No.Expend: </label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.noExpend}" id="NoExpend" name="NoExpend" style="width:80px;margin-left:25px;" data-parsley-trigger="change" data-parsley-maxlength="8">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="PlDeliveryTime" class="inline">Pl Del Time:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.plDelTime}" id="PlDeliveryTime" name="PlDeliveryTime" style="width:50px;margin-left:22px;" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="Incoterms" class="inline">Incoterms:</label>
                                                                            <input type="text" class="form-control form-rounded inline" value="${POCreationLineItemSingle.invDel.incoTerms1}" id="incoTermsPart2Delivery" name="incoTermsPart2Delivery" style="width:150px;margin-left:32px;" data-parsley-trigger="change" data-parsley-maxlength="28">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">
                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveDeliveryBtn" value="Save">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade show" id="invoice-tab" role="tabpanel" aria-labelledby="invoice-tab">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="InvoiceReceipt" class="">Invoice Receipt: </label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="InvoiceReceipt" id="InvoiceReceipt" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="FinalInvoice" class="">Final Invoice: </label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="FinalInvoice" id="FinalInvoice" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="GRBasedIV" class="">GR Based IV: </label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="GRBasedIV" id="GRBasedIV" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="DPCategory" class="">DP Category:</label>
                                                                            <select class="custom-select" id="DPCategory" name="DPCategory">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="TaxCode" class="">Tax Code:</label>
                                                                            <input type="text" class="form-control form-rounded" id="TaxCode" name="TaxCode" data-parsley-trigger="change" data-parsley-maxlength="2" required="true">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="TaxCodeDescription" class="">Tax Code Description:</label>
                                                                            <input type="text" class="form-control form-rounded" id="TaxCodeDescription" name="TaxCodeDescription" data-parsley-trigger="change" data-parsley-maxlength="50" required="true">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">
                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveInvoiceBtn" value="Save">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="conditions_linelevel-tab" role="tabpanel" aria-labelledby="conditions_linelevel-tab">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowConditionsBtnIdLineLevel" style="margin-left: 20px;"></i></a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="conditionDetailsBtnLineLevel_div" style="display:none;">
                                                                        <div class="form-group">
                                                                            <a><i type="buttom"  class="fa fa-arrow-circle-right btn-primary btn-sm" id="conditionDetailsLineBtn" aria-hidden="true"></i></a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="conditionDetailsAddRowBtn" aria-hidden="true" style="margin-left:1100px;"></i></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="card-body">
                                                                            <div class="table-responsive"  style="height: 260px;">
                                                                                <table class="table table-bordered conditionTableClassLineLevel" id="conditionTableIdLineLevel">
                                                                                    <thead class="table-header-color">
                                                                                        <tr class="border-0">
                                                                                            <th></th>
                                                                                            <th class="border-1 th-color">Condition Type</th>
                                                                                            <th class="border-1 th-color">Name</th>
                                                                                            <th class="border-1 th-color">Amount</th>
                                                                                            <th class="border-1 th-color">Per</th>
                                                                                            <th class="border-1 th-color">Condition Pricing Unit</th>
                                                                                            <th class="border-1 th-color">Currency</th>
                                                                                            <th class="border-1 th-color">UOM</th>
                                                                                            <th class="border-1 th-color">Condition Value</th>
                                                                                            <th class="border-1 th-color">Currency</th>
                                                                                            <th class="border-1 th-color">Condition Value</th>
                                                                                            <th class="border-1 th-color">Condition Currency</th>
                                                                                            <th class="border-1 th-color">Condition Detail</th>
                                                                                            <th class="border-1" style="width:30px;"></th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <!--                                                                                            <tr>
                                                                                                                                                                                        <td><input type="checkbox" name="checkConditionTableRowLineLevel" class="checkConditionTableRowLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded ConditionTypeLineLevel tableInputField" id="" name="ConditionTypeLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded nameConditionsLineLevel tableInputField" id="" name="nameConditionsLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded AmountLineLevel tableInputField" id="" name="AmountLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded PerQuantityLineLavel tableInputField" id="" name="PerQuantityLineLavel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded ConditionPricingUnitLineLevel tableInputField" id="" name="ConditionPricingUnitLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded CurrencyLineLevel tableInputField" id="" name="CurrencyLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded UoMLineLevel tableInputField" id="" name="UoMLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded ConditionValueLineLevel tableInputField" id="" name="ConditionValueLineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded Currency2LineLevel tableInputField" id="" name="Currency2LineLevel"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded ConditionValue2LineLevel tableInputField" value="0.00" id="" name="ConditionValue2LineLevel" disabled="true"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded ConditionCurrencyLineLevel tableInputField" id="" name="ConditionCurrencyLineLevel" disabled="true"></td>
                                                                                                                                                                                        <td><input type="text" class="form-control form-rounded conDetailsLineLevel tableInputField" id="" name="conDetailsLineLevel"></td>
                                                                                                                                                                                        <td></td>
                                                                                                                                                                                    </tr> -->
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="account_assignment-tab" role="tabpanel" aria-labelledby="account_assignment-tab">

                                                            <!--<h5>Customer Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Account Assignment</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="accountAssignmentCategory" class="inline">Acc. Ass Category: </label>
                                                                            <!--                                                                                <select type="text" class="custom-select inline" id="accountAssignmentCategory" name="accountAssignmentCategory" style="width:200px;margin-left:25px;">
                                                                                                                                                                <option>Select</option>
                                                                                                                                                            </select>-->
                                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignmentCategory" name="accountAssignmentCategory" style="width:200px;margin-left:25px;" disabled>
                                                                            <label for="distribution" class="inline" style="margin-left:50px;">Distribution: </label>
                                                                            <select class="custom-select inline" id="distribution" name="distribution" style="width:200px;margin-left:25px;" disabled="true">
                                                                                <!--<option>Select</option>-->
                                                                                <option>Single Account Assignment</option>
                                                                                <option>Distrib. On Quantity Basis</option>
                                                                                <option> Distrib. By Percentage</option>
                                                                            </select>
                                                                            <label for="CoCode" class="inline" style="margin-left:50px;">Co Code: </label>
                                                                            <select class="custom-select inline" id="CoCode" name="CoCode" style="width:200px;margin-left:25px;">
                                                                                <option value="">Select</option>
                                                                                <c:forEach var="company" items="${companyCodeList}" varStatus="status">
                                                                                    <option value="${company.companyCode}">${company.companyCode}</option>
                                                                                </c:forEach>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="costCenterDiv">                                     
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <!--<div class="modal-footer">-->
                                                                            <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentchangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                            <!--</div>-->
                                                                        </div>
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveAccAsgnFieldBtn" aria-hidden="true"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="unloadingPoint" class="inline" id="unloadingPointLabel">Unlod. Point:</label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="unloadingPoint" name="unloadingPoint" style="width:100px;margin-left:25px;" data-parsley-trigger="change" data-parsley-maxlength="25">
                                                                                <label for="recipient" class="inline" style="margin-left: 15px;" id="recipientLabel">Recipient:</label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="recipient" name="recipient" style="width:100px;margin-left:15px;" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                                <label for="gLAccount" class="inline" style="margin-left: 15px;" id="gLAccountLabel">GL Account: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="gLAccount" name="gLAccount" style="width:100px;margin-left:30px;" data-parsley-trigger="change" data-parsley-maxlength="10" required="true">
                                                                                <label for="coArea" class="inline" id="coAreaLabel" style="margin-left:60px;">CO Area: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="coArea" name="coArea" style="width:100px;margin-left:35px;" disabled>
                                                                            </div>
                                                                        </div>
                                                                        <!--<div class="AccAsgn_K">-->
                                                                        <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="costCenterAccAsgn" id="accAsgCostCenterLabel" class="inline" style="margin-left:15px;">Cost Center: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="costCenterAccAsgn" name="costCenterAccAsgn" style="width:100px;margin-left:10px;" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                                <label for="Order" class="inline" id="assAsgnorderLabel" style="margin-left:15px;">Order: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnOrder" name="Order" style="width:100px;margin-left:10px;">
                                                                                <label for="accAsgnAsset" class="inline" id="accAsgnAssetLabel" style="margin-left:15px;">Asset: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnAsset" name="accAsgnAsset" style="width:100px;margin-left:10px;">
                                                                                <label for="WBSElement" class="inline" id="wBSElementLabel" style="margin-left:15px;">WBS Element:</label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnWBSElementInput" name="WBSElement" style="width:100px;margin-left:10px;">
                                                                                <label for="assAsgnSalesOrder" class="inline" id="accAsgnSalesOrderLabel" style="margin-left:15px;"> Sales Order: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnSalesOrder" name="assAsgnSalesOrder" style="width:100px;margin-left:5px;">
                                                                                <label for="assAsgnItemNumber" class="inline" id="assAsgnItemNumLabel" style="margin-left:15px;"> Item Number: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="assAsgnItemNumber" name="assAsgnItemNumber" style="width:100px;margin-left:5px;">
                                                                                <label for="assAsgnDelivSch" class="inline" id="assAsgnDelivSchLabel" style="margin-left:15px;"> Del Sch: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="assAsgnDelivSch" name="assAsgnDelivSch" style="width:100px;margin-left:5px;">
                                                                                <label for="fund" class="inline" id="accAsgnFundLabel" style="margin-left:15px;">Fund: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnfund" name="fund" style="width:100px;margin-left:10px;">
                                                                                <label for="functionalArea" class="inline" id="accAsgnfunctionalAreaLabel" style="margin-left:15px;">Functional Area: </label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnfunctionalArea" name="functionalArea" style="width:150px;margin-left:10px;">
                                                                                <label for="fundCenter" class="inline" id="accAsgnFundCenterLabel">Fund Center:</label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnFundCenterInput" name="accAsgnFundCenterInput" style="width:150px;margin-left:10px;">
                                                                                <label for="commitmentItem" class="inline" id="accAsgnCommItemLabel" style="margin-left:15px;">Com Item:</label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnCommItemInput" name="commitmentItem" style="width:200px;margin-left:5px;">
                                                                                <label for="NetActNumber" class="inline" id="accAsgnNActNumLabel" style="margin-left:10px;">N/Act.Num:</label>
                                                                                <input type="text" class="form-control form-rounded inline input-height" id="accAsgnNActNumInput" name="accAsgnNActNumInput" style="width:100px;margin-left:15px;">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">

                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="multipleCostCenterDiv" style="display:none;">
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <!--<div class="modal-footer">-->
                                                                            <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentTablechangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                            <!--</div>-->
                                                                        </div>
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveAccAsgnTblBtn" aria-hidden="true"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="card-body">
                                                                                <div class="table-responsive" style="height:260px;">
                                                                                    <table class="table table-bordered" id="costCenteraccountAssignmentTebleId">
                                                                                        <thead class="table-header-color">
                                                                                            <tr class="border-0">
                                                                                                <th class="border-0"></th>
                                                                                                <th class="border-0 th-color">Quant</th>
                                                                                                <th class="border-0 th-color">%</th>
                                                                                                <th class="border-0 th-color">GL A/C</th>
                                                                                                <th class="border-0 th-color">CO Area</th>
                                                                                                <th class="border-0 th-color">Cost Center</th>
                                                                                                <th class="border-0 th-color">Fund</th>
                                                                                                <th class="border-0 th-color">Fun Area</th>
                                                                                                <th class="border-0 th-color">Fund Center</th>
                                                                                                <th class="border-0 th-color">Com Item</th>
                                                                                                <th class="border-0 th-color">Unloading Point</th>
                                                                                                <th class="border-0 th-color">Recipients</th>
                                                                                                <th class="border-0 th-color">Order</th>
                                                                                                <th class="border-0 th-color">Asset</th>
                                                                                                <th class="border-0 th-color">WBS Elements</th>
                                                                                                <th class="border-0 th-color">Sales Order</th>
                                                                                                <th class="border-0 th-color">Network/Activity Number</th>
                                                                                                <th class="border-0 th-color">Item Number</th>
                                                                                                <th class="border-0 th-color">Delivery Schedule</th>
                                                                                                <!--<th class="border-0 th-color" style="width:50px;"></th>-->
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>   
                                                                                            <tr>
                                                                                                <td></td>                                                                                                           <!--0-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnQuantity" value="" max=""></td>         <!--1-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnPercentage" value="" max=""></td>       <!--2-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnGLAccount" value=""></td>                 <!--3-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnCOArea" value=""></td>                    <!--4-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnCostCetner" value=""></td>                <!--5-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnFund" value=""></td>                      <!--6-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnFunctionalArea" value=""></td>            <!--7-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnFundCenter" value=""></td>                <!--8-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnCommitmentItem" value=""></td>            <!--9-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnUnloadingPoint" value=""></td>            <!--10-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnRecipients" value=""></td>                <!--11-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnOrder" value=""></td>                     <!--12-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnAssets" value=""></td>                    <!--13-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnWBSElement" value=""></td>                <!--14-->
                                                                                                <!--<td><input type=text class="form-control form-rounded input-height accAsgnS_I_D" value=""></td>-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnSalesOrder" value=""></td>                 <!--15-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnNetActNumber" value=""></td>               <!--16-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnItemNumber" value=""></td>                 <!--17-->
                                                                                                <td><input type="text" class="form-control form-rounded input-height accAsgnDeliverySchedule" value=""></td>           <!--18-->
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="texts-tab" role="tabpanel" aria-labelledby="texts-tab">
                                                            <div class="card-body">
                                                                <!--<h5>texts</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ItemText" class="">Item Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="ItemText" name="ItemText" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="InfoRecordPOText" class="">Info Record PO Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="InfoRecordPOText" name="InfoRecordPOText" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="MaterialPOText" class="">Material PO Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="MaterialPOText" name="MaterialPOText" readonly="true">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="PONoteToApprover" class="">PO Note To Approver:</label>
                                                                            <input type="text" class="form-control form-rounded" id="PONoteToApprover" name="PONoteToApprover" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="DeliveryText" class="">Delivery Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="DeliveryText" name="DeliveryText" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">
                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveTextTabBtn" value="Save">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="deliveryAddress-tab" role="tabpanel" aria-labelledby="deliveryAddress-tab">

                                                            <!--<h5>Customer Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Delivery Address</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Title" class="">Title:</label>
                                                                            <select class="custom-select" id="Title" name="Title">
                                                                                <option>Company</option>
                                                                                <option>Mr.</option>
                                                                                <option>Mrs.</option>
                                                                                <option>Transporter</option>>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Name1" class="">Name 1:</label>
                                                                            <input type="text" value="Natsteel holdings" class="form-control form-rounded" id="Name1" name="Name1" data-parsley-trigger="change" data-parsley-maxlength="40">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Name2" class="">Name2:</label>
                                                                            <input type="text" value="Natsteel holdings" class="form-control form-rounded" id="Name2" name="Name2" data-parsley-trigger="change" data-parsley-maxlength="40">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Street" class="">Street:</label>
                                                                            <input type="text" value="22" class="form-control form-rounded" id="Street" name="Street" data-parsley-trigger="change" data-parsley-maxlength="60">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="HouseNumber" class="">House Number:</label>
                                                                            <input type="text" value="22" class="form-control form-rounded" id="HouseNumber" name="HouseNumber" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="PostalCode" class="">Postal Code:</label>
                                                                            <input type="text" value="628048" class="form-control form-rounded" id="PostalCode" name="PostalCode" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="City" class="">City:</label>
                                                                            <input type="text" value="628048" class="form-control form-rounded" id="City" name="City" data-parsley-trigger="change" data-parsley-maxlength="40">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="countryLimits" class="">Country Code:</label>
                                                                            <input type="text" value="SG" class="form-control form-rounded" id="countryLimits" name="countryLimits" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="countryDesc" class="">Country Description</label>
                                                                            <input type="text" value="SG" class="form-control form-rounded" id="countryDesc" name="countryDesc" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">
                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveDeliveryAddressBtn" value="Save">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="confirmations-tab" role="tabpanel" aria-labelledby="confirmations-tab">

                                                            <!--<h5>Customer Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Conformations</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="confControlLimits" class="">Conf. Control:</label>
                                                                            <select class="custom-select" id="confControlLimits" name="confControlLimits" data-parsley-trigger="change" required="true">
                                                                                <option value="">Select</option>
                                                                                <option>Confirmations</option>
                                                                                <option>Inb. Deliv./ Rough GR</option>
                                                                                <option>Inbound Delivery</option>
                                                                                <option>Rough GR</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="OrderAck" class="">Order Ack:</label>
                                                                            <input type="text" class="form-control form-rounded" id="OrderAck" name="OrderAck" data-parsley-trigger="change" data-parsley-maxlength="20">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ConfirmationRequired" class="">Confirmation Required:</label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="ConfirmationRequired" id="ConfirmationRequired" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="RejectionInd" class="">Rejection Ind:</label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="RejectionInd" id="RejectionInd" class="custom-control-input" disabled="disabled"><span class="custom-control-label" required="">Yes</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">
                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveConfirmationsBtn" value="Save">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="conditionControl-tab" role="tabpanel" aria-labelledby="conditionControl-tab">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="PrintPrice" class="">Print Price:</label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="PrintPrice" id="PrintPrice" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="EstimatedPrice" class="">Estimated Price:</label>
                                                                            <label class="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="EstimatedPrice" id="EstimatedPrice" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">
                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveConditionControlBtn" value="Save">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="customerData_linelevel-tab" role="tabpanel" aria-labelledby="customerData_linelevel-tab">

                                                            <!--<h5>Customer Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Customer Data</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ProductOriginLine" class="">Product Origin: </label>
                                                                            <input type="text" class="form-control form-rounded" id="ProductOriginLine" name="ProductOriginLine" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="SegmentDescriptionLine" class="">Segment (Description):</label>
                                                                            <select class="custom-select" id="SegmentDescriptionLine" name="SegmentDescriptionLine">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="headerText_linelevel-tab" role="tabpanel" aria-labelledby="headerText_linelevel-tab">

                                                            <!--<h5>Customer Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Customer Data</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="pONotetoApproverHeaderTextsLimits" class="">PO Note to Approver:</label>
                                                                            <input type="text" class="form-control form-rounded" id="pONotetoApproverHeaderTextsLimits" name="pONotetoApproverHeaderTextsLimits" data-parsley-trigger="change" data-parsley-maxlength="5000" required="true">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="HeaderNote" class="">Header Note:</label>
                                                                            <input type="text" class="form-control form-rounded" id="HeaderNote" name="HeaderNote" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="PricingTypes" class="">Pricing Types:</label>
                                                                            <input type="text" class="form-control form-rounded" id="PricingTypes" name="PricingTypes" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Deadlines" class="">Deadlines:</label>
                                                                            <input type="text" class="form-control form-rounded" id="Deadlines" name="Deadlines" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="TermsofDelivery" class="">Terms of Delivery:</label>
                                                                            <input type="text" class="form-control form-rounded" id="TermsofDelivery" name="TermsofDelivery" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="TermsofPayment" class="">Terms of Payment:</label>
                                                                            <input type="text" class="form-control form-rounded" id="TermsofPayment" name="TermsofPayment" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ShippingInstructions" class="">Shipping Instructions:</label>
                                                                            <input type="text" class="form-control form-rounded" id="ShippingInstructions" name="ShippingInstructions" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="VendorMemoGeneral" class="">Vendor Memo (General):</label>
                                                                            <input type="text" class="form-control form-rounded" id="VendorMemoGeneral" name="VendorMemoGeneral" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="VendorMemoSpecial" class="">Vendor Memo (Special):</label>
                                                                            <input type="text" class="form-control form-rounded" id="VendorMemoSpecial" name="VendorMemoSpecial" data-parsley-trigger="change" data-parsley-maxlength="5000">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="align-center text-align-center">
                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveHeaderTextBtn" value="Save">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="component_linelevel-tab" role="tabpanel" aria-labelledby="component_linelevel-tab">
                                                            <div class="card-body">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="componentBtnLineLevel_div">
                                                                            <div class="form-group">
                                                                                <a><i type="buttom"  class="fa fa-plus-circle btn-primary btn-sm" id="componentAddRowBtn" aria-hidden="true"></i></a>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="componentSaveBtn" aria-hidden="true" style="margin-left:1050px;"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="card-body">
                                                                                <div class="table-responsive"  style="height: 260px;">
                                                                                    <table class="table table-bordered componentTableClassLineLevel" id="componentTableIdLineLevel">
                                                                                        <thead class="table-header-color">
                                                                                            <tr class="border-0">
                                                                                                <!--<th></th>-->
                                                                                                <th class="border-1 th-color">Material</th>
                                                                                                <th class="border-1 th-color">Description</th>
                                                                                                <th class="border-1 th-color">Plant</th>
                                                                                                <th class="border-1 th-color">Unit</th>
                                                                                                <th class="border-1 th-color">Quantity</th>
                                                                                                <th class="border-1 th-color">Prod St Loc</th>
                                                                                                <th class="border-1 th-color">Supply Area</th>
                                                                                                <th class="border-1 th-color">Requirement Date</th>
                                                                                                <!--<th class="border-1 th-color">Delivery Date</th>-->
                                                                                                <th class="border-1" style="width:30px;"></th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td><input type="text" class="form-control form-rounded input-height comMaterial" value=""></td>
                                                                                                <td><input type="text" class="form-control form-rounded input-height comDescription" value=""></td>
                                                                                                <td><input type="text" class="form-control form-rounded input-height comPlant" value=""></td>
                                                                                                <td><input type="text" class="form-control form-rounded input-height comUnit" value=""></td>
                                                                                                <td><input type="text" class="form-control form-rounded input-height comQuantity" value=""></td>
                                                                                                <td><input type="text" class="form-control form-rounded input-height comProdStorageLoc" value=""></td>
                                                                                                <td><input type="text" class="form-control form-rounded input-height comSupplyArea" value=""></td>
                                                                                                <td><input type="date" class="form-control form-rounded input-height comRequirementDate" value=""></td>
                                                                                                <td></td>
                                                                                            </tr>
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
                                        </form>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="align-center text-align-center">
                                                    <input type="submit" class="btn btn-success btn-rounded createStandalonePoBtn" id="createStandalonePoBtn" value="Create PO" style="">
                                                </div>
                                            </div>
                                        </div>   <br> 
                                        </form> 
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal fade" id="conditiondetailsModal" tabindex="-1" role="dialog" aria-labelledby="conditiondetailsLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="conditiondetailsLabel">Condition Details</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <form id="conditiondetailsForm" method="post" action="#">
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                                        <div class="tab-regular">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="form-group two">
                                                            <label for="itemConditions" class="inline">Item:</label>
                                                            <input type="text" class="form-control form-rounded inline" id="itemConditions" name="itemConditions" style="width: 100px;margin-left: 75px;" readonly>&nbsp 
                                                            <label for="applicationConditions" class="inline" style="margin-left: 200px;">Application:</label>
                                                            <input type="text" class="form-control form-rounded inline" id="applicationConditions" name="applicationConditions" style="width: 60px;" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="form-group two">
                                                            <label for="condTypeConditions" class="inline">Condition Type:</label>
                                                            <input type="text" class="form-control form-rounded inline" id="condTypeConditions" name="condTypeConditions" style="width: 60px;margin-left: 15px;" readonly>
                                                            <input type="text" class="form-control form-rounded inline" id="condNameConditions" name="condTypeConditions" style="width: 100px;" readonly>&nbsp 
                                                            <!--                                                                <label for="ConditionPricingDate" class="inline" style="margin-left: 135px;">Cond Pricing Date :</label>
                                                                                                                            <div class="input-group date inline" id="ConditionPricingDate" data-target-input="nearest">
                                                                                                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ConditionPricingDate_Value" name="ConditionPricingDate_Value" data-target="#ConditionPricingDate" />
                                                                                                                                <div class="input-group-append" data-target="#ConditionPricingDate" data-toggle="datetimepicker">
                                                                                                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                                                                </div>
                                                                                                                            </div>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                <li class="nav-item">
                                                    <a class="nav-link active" id="conditionvalues" data-toggle="tab" href="#conditionvalues-tab" role="tab" aria-controls="DeliveryInvoide" aria-selected="true">Condition Values</a>
                                                </li>
                                                <!--                                                    <li class="nav-item">
                                                                                                        <a class="nav-link" id="controldata" data-toggle="tab" href="#controldata-tab" role="tab" aria-controls="Conditions" aria-selected="false">Control Data</a>
                                                                                                    </li>-->
                                                <li class="nav-item">
                                                    <a class="nav-link" id="accountdetermination" data-toggle="tab" href="#accountdetermination-tab" role="tab" aria-controls="Texts" aria-selected="false">Account Determination</a>
                                                </li>
                                            </ul>
                                            <div class="tab-content">
                                                <div class="tab-pane fade show active" id="conditionvalues-tab" role="tabpanel" aria-labelledby="conditionvalues-tab">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="amountConditions" class="inline">Amount:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="amountConditions" name="amountConditions" style="width: 200px;margin-left: 65px;">&nbsp 
                                                                    <input type="text" class="form-control form-rounded inline" id="currency1Conditions" name="currency1Conditions" style="width: 60px;" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="conditionValueConditions" class="inline">Condition Value:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="conditionValueConditions" name="conditionValueConditions" style="width: 150px;margin-left: 20px;">&nbsp 
                                                                    <input type="text" class="form-control form-rounded inline" id="currency2Conditions" name="currency2Conditions" style="width: 60px;" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="conditionBaseRateConditions" class="inline">Cond Base Value:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="conditionBaseRateConditions" name="conditionBaseRateConditions" readonly style="width: 200px;margin-left: 10px;">&nbsp 
                                                                    <!--<input type="text" class="form-control form-rounded inline" id="currency1Conditions" name="currency1Conditions" style="width: 50px;">-->
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="conditionValueConditions" class="inline">Cond Base Rate:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="conditionValueConditions" name="conditionValueConditions" readonly style="width: 200px;margin-left: 15px;">&nbsp 

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="conditionValueConditions" class="inline">UOM:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="uoMConditionValuesConditions" name="uoMConditionValuesConditions" style="width: 100px;margin-left: 80px;">&nbsp 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="conditionValueConditions" class="inline">Pricing Unit:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="pricingUnitConditions" name="pricingUnitConditions" style="width: 150px;margin-left: 45px;">&nbsp 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="currencyConditions" class="inline">Currency:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="currencyConditions" name="currencyConditions" style="width: 60px;margin-left: 60px;" readonly>&nbsp 
                                                                    <label for="ExchangeRateCondition" class="inline" style="margin-left: 60px;">Exchange Rate:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="ExchangeRateCondition" name="ExchangeRateCondition" style="width: 100px;margin-left: 10px;" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="currencyPr" class="inline">Doc. Currency:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="currencyPr" name="currencyPr" style="width: 60px;margin-left: 30px;" readonly>&nbsp 
                                                                    <label for="ExchangeRatePr" class="inline" style="margin-left: 60px;">Exchange Rate:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="ExchangeRatePr" name="ExchangeRatePr" style="width: 100px;margin-left: 10px;" readonly>
                                                                    <label for="locCurrency" class="inline" style="margin-left: 40px;">Local Currency:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="locCurrency" name="locCurrency" value="SGD" style="width: 60px;margin-left: 10px;" readonly="true">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade show" id="controldata-tab" role="tabpanel" aria-labelledby="controldata-tab">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <!--<h5>Control data</h5>-->
                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="ConditionClass" class="">Condition Class (followed by Short Text)</label>
                                                                    <input type="text" class="form-control form-rounded" id="ConditionClass" name="ConditionClass">

                                                                </div>
                                                            </div>
                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="CalculateType" class="">Calculate Type  (followed by Short Text) </label>
                                                                    <input type="text" class="form-control form-rounded" id="CalculateType" name="CalculateType">
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-4 col-lg-4 col-md4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="ConditionCategory" class="">Condition Category  (followed by Short Text)</label>
                                                                    <input type="text" class="form-control form-rounded" id="ConditionCategory" name="ConditionCategory">

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="ConditionControl" class="">Condition Control  (followed by Short Text) </label>
                                                                    <input type="text" class="form-control form-rounded" id="ConditionControl" name="ConditionControl">
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="ConditionOrigin" class="">Condition Origin  (followed by Short Text)</label>
                                                                    <input type="text" class="form-control form-rounded" id="ConditionOrigin" name="ConditionOrigin">

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="Statistical" class="">Statistical</label>
                                                                    <label class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="Statistical" id="Statistical" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="Accruals" class="">Accruals</label>
                                                                    <label class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="Accruals" id="Accruals" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="ChangedManually" class="">Changed Manually</label>
                                                                    <label class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="ChangedManually" id="ChangedManually" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade show" id="accountdetermination-tab" role="tabpanel" aria-labelledby="accountdetermination-tab" style="height:355px;">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="AccountKey" class="inline">Account Key:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="AccountKey" name="AccountKey" style="width: 100px;margin-left: 15px;" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="accrualsAccountDetermination" class="inline">Accurals:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="accrualsAccountDetermination" name="accrualsAccountDetermination" style="width: 100px;margin-left: 38px;" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group two">
                                                                    <label for="vendorCondition" class="inline" style="margin-left: 400px;">Vendor:</label>
                                                                    <input type="text" class="form-control form-rounded inline" id="vendorCondition" name="vendorCondition" style="width: 100px;margin-left: 15px;" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!--                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                                        <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                                                                    </div>-->
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal fade" id="accountAssignmentModal" tabindex="-1" role="dialog" aria-labelledby="accountAssignmentLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="accountAssignmentLabel">Account Assignment</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="">
                                <div class="container-fluid">
                                    <form id="accountAssignmentForm" method="post" action="#">
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="gLAccount" class="inline" style="margin-left: 15px;" id="gLAccountServiceLabel">GL Account: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="gLAccountService" name="gLAccountService" style="width:100px;margin-left:30px;">
                                                        <label for="coArea" class="inline" id="coAreaServiceLabel" style="margin-left:60px;">CO Area: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="coAreaService" name="coAreaService" style="width:100px;margin-left:35px;" disabled>
                                                        <label for="coArea" class="inline" id="companyCodeServiceLabel" style="margin-left:60px;">Com Code: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="companyCodeService" name="companyCodeService" style="width:100px;margin-left:35px;" disabled>
                                                    </div>
                                                </div>
                                                <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="costCenterAccAsgn" id="CostCenterServiceLabel" class="inline" style="margin-left:15px;">Cost Center: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="costCenterService" name="costCenterService" style="width:100px;margin-left:10px;">
                                                        <label for="Order" class="inline" id="serviceOrderLabel" style="margin-left:15px;">Order: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="OrderService" name="OrderService" style="width:100px;margin-left:10px;">
                                                        <label for="accAsgnAsset" class="inline" id="AssetServiceLabel" style="margin-left:15px;">Asset: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="AssetService" name="AssetService" style="width:100px;margin-left:10px;">
                                                        <label for="WBSElement" class="inline" id="wBSElementServiceLabel" style="margin-left:15px;">WBS Element:</label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="WBSElementInputService" name="WBSElementInputService" style="width:100px;margin-left:10px;">
                                                        <label for="assAsgnSalesOrder" class="inline" id="SalesOrderServiceLabel" style="margin-left:15px;"> Sales Order: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="SalesOrderService" name="SalesOrderService" style="width:100px;margin-left:5px;">
                                                        <label for="assAsgnItemNumber" class="inline" id="ItemNumServiceLabel" style="margin-left:15px;"> Item Number: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="ItemNumberService" name="ItemNumberService" style="width:100px;margin-left:5px;">
                                                        <label for="assAsgnDelivSch" class="inline" id="DelivSchServiceLabel" style="margin-left:15px;"> Del Sch: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="DelivSchService" name="DelivSchService" style="width:100px;margin-left:5px;">
                                                        <label for="fund" class="inline" id="FundServiceLabel" style="margin-left:15px;">Fund: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="fundService" name="fundService" style="width:100px;margin-left:10px;">
                                                        <label for="functionalArea" class="inline" id="functionalAreaServiceLabel" style="margin-left:15px;">Functional Area: </label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="functionalAreaService" name="functionalAreaService" style="width:150px;margin-left:10px;">
                                                        <label for="fundCenter" class="inline" id="FundCenterServiceLabel">Funds Center:</label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="FundCenterServiceInput" name="FundCenterServiceInput" style="width:150px;margin-left:10px;">
                                                        <label for="commitmentItem" class="inline" id="CommItemServiceLabel" style="margin-left:15px;">Com Item:</label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="CommItemServiceInput" name="CommItemServiceInput" style="width:200px;margin-left:5px;">
                                                        <label for="NetActNumber" class="inline" id="NActNumServiceLabel" style="margin-left:10px;">N/Act.Num:</label>
                                                        <input type="text" class="form-control form-rounded inline input-height" id="NActNumServiceInput" name="NActNumServiceInput" style="width:100px;margin-left:15px;">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="profitabilitysegmentmodelbtn" style="display:none;">Prof Segment</button>
                                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-lg btn-primary" id="accountAssignmentchangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                    <!--<a><i type="button" class="fa fa-window-close btn-lg btn-primary" aria-hidden="true" data-dismiss="modal"></i></a>-->
                                    <button type="button" class="btn btn-primary" id="serviceInpAccAsgnmentSubmitBtn">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade modal-padding" id="profitabilitySegmentModal"  tabindex="-1" role="dialog" aria-labelledby="profitabilitySegmentLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content" style="width:1250px;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="profitabilitySegmentLabel">Profitability Segment</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="">
                                <div class="container-fluid">
                                    <form id="profitabilitySegmentForm" method="post" action="#">
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                        <div class="card-body">
                                            <div class="row">
                                                <!--<h5>Profitability segment</h5>-->
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="Characteristic" class="">Characteristic :</label>
                                                        <input type="text" class="form-control form-rounded" id="Characteristic" name="Characteristic">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="CustomerCode" class="">Customer Code :</label>
                                                        <!--                                                            <select class="custom-select" id="CustomerCode" name="CustomerCode">
                                                                                                                        <option value="">Select</option>
                                                                                                                    </select>-->
                                                        <input type="text" class="form-control form-rounded" id="CustomerCode" name="CustomerCode">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="Product" class="">Product :</label>
                                                        <select class="custom-select" id="Product" name="Product">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="BillingType" class="">Billing Type :</label>
                                                        <input type="text" class="form-control form-rounded" id="BillingType" name="BillingType">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="salesOrderProfitabilitySegment" class="">Sales Order :</label>
                                                        <input type="text" class="form-control form-rounded" id="salesOrderProfitabilitySegment" name="salesOrderProfitabilitySegment">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="itemNumberProfitabilitySegment" class="">Item Number :</label>
                                                        <input type="text" class="form-control form-rounded" id="itemNumberProfitabilitySegment" name="itemNumberProfitabilitySegment">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="companyCodeProfitabilitySegment" class="">Company Code :</label>
                                                        <input type="text" class="form-control form-rounded" id="companyCodeProfitabilitySegment" name="companyCodeProfitabilitySegment">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="Plant" class="">Plant :</label>
                                                        <input type="text" class="form-control form-rounded" id="Plant" name="Plant">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="BusinessArea" class="">Business Area :</label>
                                                        <input type="text" class="form-control form-rounded" id="BusinessArea" name="BusinessArea">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="SalesOrganization" class="">Sales Organization :</label>
                                                        <input type="text" class="form-control form-rounded" id="SalesOrganization" name="SalesOrganization">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="DistrChannel" class="">Distr. Channel :</label>
                                                        <input type="text" class="form-control form-rounded" id="DistrChannel" name="DistrChannel">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="Division" class="">Division :</label>
                                                        <input type="text" class="form-control form-rounded" id="Division" name="Division">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="WBSElement" class="">WBS Element :</label>
                                                        <input type="text" class="form-control form-rounded" id="WBSElement" name="WBSElement">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="CostObject" class="">Cost Object :</label>
                                                        <input type="text" class="form-control form-rounded" id="CostObject" name="CostObject">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ProfitCentre" class="">Profit Centre :</label>
                                                        <input type="text" class="form-control form-rounded" id="ProfitCentre" name="ProfitCentre">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="PartnerPC" class="">Partner PC :</label>
                                                        <input type="text" class="form-control form-rounded" id="PartnerPC" name="PartnerPC">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="countryProfitabilitySegment" class="">Country :</label>
                                                        <input type="text" class="form-control form-rounded" id="countryProfitabilitySegment" name="countryProfitabilitySegment">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="SalesOffice" class="">Sales Office :</label>
                                                        <input type="text" class="form-control form-rounded" id="SalesOffice" name="SalesOffice">                                                                                                                        
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="SalesEmployee" class="">Sales Employee :</label>
                                                        <select class="custom-select" id="SalesEmployee" name="SalesEmployee">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="MatlGroup" class="">Matl. Group :</label>
                                                        <input type="text" class="form-control form-rounded" id="MatlGroup" name="MatlGroup"> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="Prodhierarchy" class="">Prod. Hierarchy :</label>
                                                        <input type="text" class="form-control form-rounded" id="Prodhierarchy" name="Prodhierarchy"> 
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ItemCategory" class="">Item Category :</label>
                                                        <input type="text" class="form-control form-rounded" id="ItemCategory" name="ItemCategory"> 
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="HigherLevItem" class="">Higher-lev.item :</label>
                                                        <input type="text" class="form-control form-rounded" id="HigherLevItem" name="HigherLevItem">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="Industry" class="">Industry :</label>
                                                        <input type="text" class="form-control form-rounded" id="Industry" name="Industry">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="CustomerGroup" class="">Customer Group :</label>
                                                        <input type="text" class="form-control form-rounded" id="CustomerGroup" name="CustomerGroup"> 
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ProductHierLevel1" class="">Product Hier Level 1 :</label>
                                                        <input type="text" class="form-control form-rounded" id="ProductHierLevel1" name="ProductHierLevel1">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ProductHierLevel2" class="">Product Hier Level 2 :</label>
                                                        <input type="text" class="form-control form-rounded" id="ProductHierLevel2" name="ProductHierLevel2">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ProductHierLevel3" class="">Product Hier Level 3 :</label>
                                                        <input type="text" class="form-control form-rounded" id="ProductHierLevel3" name="ProductHierLevel3">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="MaterialType" class="">Material Type :</label>
                                                        <input type="text" class="form-control form-rounded" id="MaterialType" name="MaterialType">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ReferenceDoc" class="">Reference Doc. :</label>
                                                        <input type="text" class="form-control form-rounded" id="ReferenceDoc" name="ReferenceDoc">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ProjectNumber1" class="">PROJECT NUMBER1</label>
                                                        <!--                                                            <select class="custom-select" id="ProjectNumber1" name="ProjectNumber1">
                                                                                                                        <option value="">Select</option>
                                                                                                                    </select>-->
                                                        <input type="text" class="form-control form-rounded" id="ProjectNumber1" name="ProjectNumber1">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ProjectIndicator" class="">Project Indicator :</label>
                                                        <input type="text" class="form-control form-rounded" id="ProjectIndicator" name="ProjectIndicator">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="valuationTypeProfitabilitySegment" class="">Valuation Type :</label>
                                                        <input type="text" class="form-control form-rounded" id="valuationTypeProfitabilitySegment" name="valuationTypeProfitabilitySegment">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="CustomerClass" class="">Customer Class :</label>
                                                        <input type="text" class="form-control form-rounded" id="CustomerClass" name="CustomerClass">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="MaterialSourceInd" class="">Material Source Ind</label>
                                                        <input type="text" class="form-control form-rounded" id="MaterialSourceInd" name="MaterialSourceInd">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ContractType" class="">Contract Type</label>
                                                        <input type="text" class="form-control form-rounded" id="ContractType" name="ContractType">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ShipToParty" class="">Ship To Party</label>
                                                        <input type="text" class="form-control form-rounded" id="ShipToParty" name="ShipToParty">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryCode1" class="">Industry Code 1 :</label>
                                                        <input type="text" class="form-control form-rounded" id="IndustryCode1" name="IndustryCode1">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryField001" class="">Industry Field 001 :</label>
                                                        <input type="text" class="form-control form-rounded" id="IndustryField001" name="IndustryField001">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryCode2" class="">Industry Code 2 :</label>
                                                        <input type="text" class="form-control form-rounded" id="IndustryCode2" name="IndustryCode2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryCode3" class="">Industry Code 3 :</label>
                                                        <input type="text" class="form-control form-rounded" id="IndustryCode3" name="IndustryCode3">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="SalesDocType" class="">Sales Doc. Type :</label>
                                                        <input type="text" class="form-control form-rounded" id="SalesDocType" name="SalesDocType">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ReferenceItem" class="">Reference Item</label>
                                                        <input type="text" class="form-control form-rounded" id="ReferenceItem" name="ReferenceItem">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="orderProfitabilitySegment" class="">Order</label>
                                                        <select class="custom-select" id="orderProfitabilitySegment" name="orderProfitabilitySegment">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="profitabilitySegmentSubmitBtn">Submit</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal fade" id="changeAccountAssignmentScreenModal" tabindex="-1" role="dialog" aria-labelledby="changeAccountAssignmentScreenLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="changeAccountAssignmentScreenLabel">Account Assignment</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="container-fluid">
                                <form id="ServiceAccountAssignmentForm" method="post" action="#">
                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="form-group two">
                                                            <label for="accountAssignLine" class="inline">Line:</label>
                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignLine" name="accountAssignLine" style="width:100px;margin-left: 65px;height:25px;" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="form-group two">
                                                            <label for="accountAssignQuantity" class="inline">Quantity</label>
                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignQuantity" name="accountAssignQuantity" style="width:100px;margin-left: 45px;height:25px;" disabled>
                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignuom" name="" style="width:40px;height:25px;" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="form-group two">
                                                            <label for="accountAssignActivity" class="inline">Activity:</label>
                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignActivity" name="accountAssignActivity" style="width:100px;margin-left: 50px;height:25px;" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="form-group two">
                                                            <label for="accountAssignShortText" class="inline">Short Text:</label>
                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignShortText" name="accountAssignShortText" style="width:250px;margin-left: 30px;height:25px;" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                                <div class="row">
                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="distributionIndicator" class="inline">Distribution Indicator</label>
                                                            <div><hr style="margin-top:0rem;margin-bottom:0rem">
                                                                <label class="custom-control custom-radio">
                                                                    <input type="radio" name="distributionIndicator" id="noMultiAcctAssignment" class="custom-control-input"><span class="custom-control-label">No Multi Act Assignment</span>
                                                                </label>
                                                                <label class="custom-control custom-radio ">
                                                                    <input type="radio" name="distributionIndicator" id="distOnQuantBases" class="custom-control-input" checked="true"><span class="custom-control-label">Distribution On Quantity Bases</span>
                                                                </label>
                                                                <label class="custom-control custom-radio ">
                                                                    <input type="radio" name="distributionIndicator" id="distByPercentage" class="custom-control-input"><span class="custom-control-label">Distribution By Percentage</span>
                                                                </label>
                                                            </div>
                                                            <!--<p class="text-danger" id="p7"></p>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="serviceTabAccAsgnTebleId">
                                            <thead class="table-header-color">
                                                <tr class="border-0">                                                   
                                                    <th class="border-0"></th>                                      <!--0-->
                                                    <th class="border-0 th-color">Quant</th>                        <!--1-->
                                                    <th class="border-0 th-color">%</th>                            <!--2-->
                                                    <th class="border-0 th-color">GL A/C</th>                       <!--3-->
                                                    <th class="border-0 th-color">CO Area</th>                      <!--4-->
                                                    <th class="border-0 th-color">Cost Center</th>                  <!--5-->
                                                    <th class="border-0 th-color">Fund</th>                         <!--6-->
                                                    <th class="border-0 th-color">Fun Area</th>                     <!--7-->
                                                    <th class="border-0 th-color">Fund Center</th>                  <!--8-->
                                                    <th class="border-0 th-color">Com Item</th>                     <!--9-->
                                                    <th class="border-0 th-color">Order</th>                        <!--10-->
                                                    <th class="border-0 th-color">Asset</th>                        <!--11-->
                                                    <th class="border-0 th-color">WBS Elements</th>                 <!--12-->
                                                    <th class="border-0 th-color">Sales Order</th>                  <!--13-->
                                                    <th class="border-0 th-color">Network/Activity Number</th>      <!--14-->
                                                    <th class="border-0 th-color">Item Number</th>                  <!--15-->
                                                    <th class="border-0 th-color">Delivery Schedule</th>            <!--16-->
                                                    <!--<th class="border-0 th-color" style="width:50px;"></th>-->
                                                </tr>
                                            </thead>
                                            <tbody>   
                                                <tr>
                                                    <td></td>                                                                                                                      <!--0--> 
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblQuantity" value="" max=""></td>           <!--1-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="" max=""></td>         <!--2-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value=""></td>                 <!--3-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value=""></td>                    <!--4-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value=""></td>                <!--5-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFund" value=""></td>                      <!--6-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value=""></td>            <!--7-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value=""></td>                <!--8-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value=""></td>            <!--9-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblOrder" value=""></td>                     <!--10-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblAssets" value=""></td>                    <!--11-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value=""></td>                <!--12-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value=""></td>                 <!--13-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value=""></td>               <!--14-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value=""></td>                 <!--15-->
                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value=""></td>           <!--16-->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!--</form>-->
                            <!--</div>-->
                            <div class="modal-footer">
                                <a><i type="buttom" class="fa fa-arrow-circle-left btn-lg btn-primary" id="backChangedScreen" title="Change Screen" aria-hidden="true"></i></a>
                                <!--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>-->
                                <button type="button" class="btn btn-primary" id="serviceAccAsgnmentSubmitBtn">Submit</button>
                                <!--<a><i type="button" class="fa fa-window-close btn-lg btn-primary" aria-hidden="true" data-dismiss="modal">Submit</i></a>-->
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
                                                <c:forEach var="account" items="${accountObj}" varStatus="status">
                                                    <tr class="accountAssignmentModalTableTrClass">
                                                        <td>${account.accountAssignmentCode}</td>
                                                        <td>${account.accountAssignmentCategory}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="ConditionTypeHeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionTypeHeaderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ConditionTypeHeaderLabel">Condition Type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover conditionTypeModelTebleClass" id="conditionTypeModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="">Condition Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="conditionTypeCheckbox"></td>
                                                    <td value="ABCE">ABCE</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="CurrencyHeaderModal" tabindex="-1" role="dialog" aria-labelledby="CurrencyHeaderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CurrencyHeaderLabel">Currency</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover CurrencyModelTebleClass" id="CurrencyModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="">Currency</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="currencyCheckbox"></td>
                                                    <td value="PQRS">PQRS</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="UoMHeaderModal" tabindex="-1" role="dialog" aria-labelledby="UoMHeaderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="UoMHeaderLabel">UOM</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover UOMModelTebleClass" id="UOMModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="">UOM</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="UOMCheckbox"></td>
                                                    <td value="LMNO">LMNO</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ConditionValueHeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionValueHeaderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ConditionValueHeaderLabel">Condition Value</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ConditionValueModelTebleClass" id="ConditionValueModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="">Condition Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="ConditionValueCheckbox"></td>
                                                    <td value="PQRTSE">PQRTSE</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="Currency2HeaderModal" tabindex="-1" role="dialog" aria-labelledby="Currency2HeaderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="Currency2HeaderLabel">Currency</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover Currency2ModelTebleClass" id="Currency2ModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="">Currency</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="Currency2Checkbox"></td>
                                                    <td value="ABCDEFG">ABCDEFG</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="modal fade" id="ConditionValue2HeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionValue2HeaderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ConditionValue2HeaderLabel">Condition value</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ConditionValue2ModelTebleClass" id="ConditionValue2ModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="">Condition Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="ConditionValue2Checkbox"></td>
                                                    <td value="JKLMNOP">JKLMNOP</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ConditionCurrencyHeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionCurrencyHeaderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ConditionCurrencyHeaderLabel">Condition Currency</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ConditionCurrencyModelTebleClass" id="ConditionCurrencyModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="">Condition Currency</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="ConditionCurrencyCheckbox"></td>
                                                    <td value="XYZXYZ">XYZXYZ</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="CurrencyDeliveryInvoiceModal" tabindex="-1" role="dialog" aria-labelledby="CurrencyDeliveryInvoiceLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CurrencyDeliveryInvoiceLabel">Currency</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover CurrencyDeliveryInvoiceModelTebleClass" id="CurrencyDeliveryInvoiceModelTebleId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="" style="width:50px;">Currency</th>
                                                    <th>Currency Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="currencyList" items="${currencyList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="CurrencyDeliveryInvoiceCheckbox CurrencyDeliveryInvoiceCheckboxService"></td>
                                                        <td value="${currencyList.currencyCode}">${currencyList.currencyCode}</td>
                                                        <td>${currencyList.currencyDesc}</td>
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
            <div class="modal fade" id="CurrencyDeliveryInvoiceModal_Service" tabindex="-1" role="dialog" aria-labelledby="CurrencyDeliveryInvoiceLabel_Service" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CurrencyDeliveryInvoiceLabel_Service">Currency</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover CurrencyDeliveryInvoiceModelTebleClass_Service" id="CurrencyDeliveryInvoiceModelTebleId_Service" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" style="width:50px;">Currency</th>
                                                    <th class="border-1">Currency Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="currencyList" items="${currencyList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="CurrencyDeliveryInvoiceCheckboxService"></td>
                                                        <td value="${currencyList.currencyCode}">${currencyList.currencyCode}</td>
                                                        <td>${currencyList.currencyDesc}</td>
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
            <div class="modal fade" id="DeliverySchedule-DelDateCategoryField-Picklist-Model" tabindex="-1" role="dialog" aria-labelledby="DeliverySchedule-DelDateCategoryField-Picklist" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="DeliverySchedule-DelDateCategoryField-Picklist">Delivery Date Category</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover DeliverySchedule-DelDateCategoryField-Picklist-TableClass" id="DeliverySchedule-DelDateCategoryField-Picklist-TableId" style="width: 100%">
                                            <thead class="table-header-color">
                                                <tr class="">
                                                    <th class="border-1 th-color" style="width:50px;"></th>
                                                    <th class="border-1 th-color">Delivery Date Category</th>
                                                    <!--<th>Currency Description</th>-->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                                    <td class="" value="D">D --  Day Format [Default Format for both Goods and Services -- Can be modified for Transport PO's]</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                                    <td class="" value="T">T --  Day Format</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                                    <td class="" value="W">W -- Week Format</td>
                                                </tr>
                                                <tr>
                                                    <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                                    <td class="" value="M">M -- Month Format</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                                                <c:forEach var="item" items="${itemCategList}" varStatus="status">
                                                    <tr class="itemCategoryModalTableTrClass">
                                                        <td>${item.itemCategoryCode}</td>
                                                        <td>${item.itemCategoryDesc}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="gLAccountModal" tabindex="-1" role="dialog" aria-labelledby="gLAccountLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="gLAccountLabel">GL Account</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered gLAccountTable-Class" id="gLAccountTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">GL Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">GL Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="code" items="${codeList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="gLCodeCheckboxClass" value=""></td>
                                                        <td>${code.glCode}</td>
                                                        <td>${code.GLDescription}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="coAreaModal" tabindex="-1" role="dialog" aria-labelledby="coAreaLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="coAreaLabel">CO Area</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover coAreaTable-Class" id="coAreaTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                                    <th class="" scope="col">Item Category  Desc</th>
                                                </tr>
                                            </thead>
                                            <!--                                                <tbody>
                                            <c:forEach var="item" items="${itemCategList}" varStatus="status">
                                                <tr>
                                                    <td><input type="submit" class="btn btn-outline-primary btn-rounded accountAssignmentCategoryTable-btn" value="Select"></td>
                                                    <td><input type="checkbox" class="itemCategoryCheckboxClass" value=""></td>
                                                    <td>${item.itemCategoryCode}</td>
                                                    <td>${item.itemCategoryDesc}</td>
                                                </tr>
                                            </c:forEach>
                                        </tbody>-->
                                        </table>
                                    </div>
                                    <!--</div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="costCenterModal" tabindex="-1" role="dialog" aria-labelledby="costCenterLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="costCenterLabel">Cost Center</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered costCenterTable-Class" id="costCenterTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Cost Center &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="cost" items="${costCenterList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="costCenterCheckboxClass" value="${cost.sno}"></td>
                                                        <td>${cost.costCentre}</td>
                                                        <td>${cost.description}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="fundModal" tabindex="-1" role="dialog" aria-labelledby="fundLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="fundLabel">Fund</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover fundTable-Class" id="fundTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                                    <th class="" scope="col">Item Category  Desc</th>
                                                </tr>
                                            </thead>
                                            <!--                                                <tbody>
                                            <c:forEach var="item" items="${itemCategList}" varStatus="status">
                                                <tr>
                                                    <td><input type="submit" class="btn btn-outline-primary btn-rounded accountAssignmentCategoryTable-btn" value="Select"></td>
                                                    <td><input type="checkbox" class="itemCategoryCheckboxClass" value=""></td>
                                                    <td>${item.itemCategoryCode}</td>
                                                    <td>${item.itemCategoryDesc}</td>
                                                </tr>
                                            </c:forEach>
                                        </tbody>-->
                                        </table>
                                    </div>
                                    <!--</div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="functionalAreaModal" tabindex="-1" role="dialog" aria-labelledby="functionalAreaLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="functionalAreaLabel">Functional Area</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover functionalAreaTable-Class" id="functionalAreaTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                                    <th class="" scope="col">Item Category  Desc</th>
                                                </tr>
                                            </thead>
                                            <!--                                                <tbody>
                                            <c:forEach var="item" items="${itemCategList}" varStatus="status">
                                                <tr>
                                                    <td><input type="submit" class="btn btn-outline-primary btn-rounded accountAssignmentCategoryTable-btn" value="Select"></td>
                                                    <td><input type="checkbox" class="itemCategoryCheckboxClass" value=""></td>
                                                    <td>${item.itemCategoryCode}</td>
                                                    <td>${item.itemCategoryDesc}</td>
                                                </tr>
                                            </c:forEach>
                                        </tbody>-->
                                        </table>
                                    </div>
                                    <!--</div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="fundCenterModal" tabindex="-1" role="dialog" aria-labelledby="fundCenterLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="fundCenterLabel">Fund Center</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover fundCenterTable-Class" id="fundCenterTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                                    <th class="" scope="col">Item Category  Desc</th>
                                                </tr>
                                            </thead>
                                            <!--                                                <tbody>
                                            <c:forEach var="item" items="${itemCategList}" varStatus="status">
                                                <tr>
                                                    <td><input type="submit" class="btn btn-outline-primary btn-rounded accountAssignmentCategoryTable-btn" value="Select"></td>
                                                    <td><input type="checkbox" class="itemCategoryCheckboxClass" value=""></td>
                                                    <td>${item.itemCategoryCode}</td>
                                                    <td>${item.itemCategoryDesc}</td>
                                                </tr>
                                            </c:forEach>
                                        </tbody>-->
                                        </table>
                                    </div>
                                    <!--</div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="commitmentItemModal" tabindex="-1" role="dialog" aria-labelledby="commitmentItemLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="commitmentItemLabel">Commitment Item</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive table-bordered">
                                        <table class="table table-hover commitmentItemTable-Class" id="commitmentItemTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Commitment Item &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="item" items="${itemList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="commmentItemCheckboxClass" value=""></td>
                                                        <td>${item.commitItem}</td>
                                                        <td>${item.name}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="accAsgnOrderModal" tabindex="-1" role="dialog" aria-labelledby="accAsgnOrderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="accAsgnOrderLabel">Order</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover accAsgnOrderTable-Class" id="accAsgnOrderTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Order &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Order  Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="order" items="${orderList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="accAsgnOrderCheckboxClass" value=""></td>
                                                        <td>${order.internalOrder}</td>
                                                        <td>${order.IODescription}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="WBSElementModal" tabindex="-1" role="dialog" aria-labelledby="WBSElementLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="WBSElementLabel">WBS Element</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover WBSElementClass" id="WBSElementTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">WBS Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">WBS  Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="WBS" items="${WBSList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="wBSElementCheckboxClass" value=""></td>
                                                        <td>${WBS.WBSCode}</td>
                                                        <td>${WBS.WBSDesc}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="networkActivityNumberModal" tabindex="-1" role="dialog" aria-labelledby="networkActivityNumberLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="networkActivityNumberLabel">Network/Activity Number</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover networkActivityNumberClass" id="networkActivityNumberTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Network Number &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="network" items="${NetworkList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="networkActivityNumberCheckboxClass" value=""></td>
                                                        <td>${network.networkNumber}</td>
                                                        <td>${network.description}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="accAsgnAssetModal" tabindex="-1" role="dialog" aria-labelledby="accAsgnAssetLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="accAsgnAssetLabel">Assets</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover accAsgnAssetClass" id="accAsgnAssetTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Asset &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Asset Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="AssetList" items="${AssetList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="accAsgnAssetCheckboxClass" value=""></td>
                                                        <td>${AssetList.asset}</td>
                                                        <td>${AssetList.assetDesc}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="ServiceNumberModal" tabindex="-1" role="dialog" aria-labelledby="ServiceNumberLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ServiceNumberLabel">Service Number</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover serviceNumberTableClass" id="serviceNumberTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Service Number &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Service Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="service" items="${ServiceList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="serviceNumberTableCheckboxClass" value=""></td>
                                                        <td>${service.activityNumber}</td>
                                                        <td>${service.serviceCategory}</td>
                                                    </tr>
                                                </c:forEach>
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
            <div class="modal fade" id="limitsAccAssignmentModal" tabindex="-1" role="dialog" aria-labelledby="limitsAccAssignmentLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="limitsAccAssignmentLabel">Account Assignment</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="">
                            <div class="container-fluid">
                                <form id="limitsAccountAssignmentForm" method="post" action="#">
                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="gLAccount" class="inline" style="margin-left: 15px;" id="gLAccountLabel_Limits">GL Account: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="gLAccountInp_Limits" name="gLAccountService" style="width:100px;margin-left:30px;">
                                                    <label for="coArea" class="inline" id="coAreaLabel_Limits" style="margin-left:60px;">CO Area: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="coAreaInp_Limits" name="coAreaService" style="width:100px;margin-left:35px;" disabled>
                                                    <label for="coArea" class="inline" id="companyCodeLabel_Limits" style="margin-left:60px;">Com Code: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="companyCodeInp_Limits" name="companyCodeService" style="width:100px;margin-left:35px;" disabled>
                                                </div>
                                            </div>
                                            <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="costCenterInp_Limits" id="costCenterLabel_Limits" class="inline" style="margin-left:15px;">Cost Center: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="costCenterInp_Limits" name="costCenterInp_Limits" style="width:100px;margin-left:10px;">
                                                    <label for="orderInp_Limits" class="inline" id="orderLabel_Limits" style="margin-left:15px;">Order: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="orderInp_Limits" name="orderInp_Limits" style="width:100px;margin-left:10px;">
                                                    <label for="assetInp_Limits" class="inline" id="assetLabel_Limits" style="margin-left:15px;">Asset: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="assetInp_Limits" name="assetInp_Limits" style="width:100px;margin-left:10px;">
                                                    <label for="wBSElementInp_Limits" class="inline" id="wBSElementLabel_Limits" style="margin-left:15px;">WBS Element:</label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="wBSElementInp_Limits" name="wBSElementInp_Limits" style="width:100px;margin-left:10px;">
                                                    <label for="salesOrderInp_Limits" class="inline" id="salesOrderLabel_Limits" style="margin-left:15px;"> Sales Order: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="salesOrderInp_Limits" name="salesOrderInp_Limits" style="width:100px;margin-left:5px;">
                                                    <label for="itemNumberInp_Limits" class="inline" id="itemNumLabel_Limits" style="margin-left:15px;"> Item Number: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="itemNumberInp_Limits" name="itemNumberInp_Limits" style="width:100px;margin-left:5px;">
                                                    <label for="delivSchInp_Limits" class="inline" id="delivSchLabel_Limits" style="margin-left:15px;"> Del Sch: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="delivSchInp_Limits" name="delivSchInp_Limits" style="width:100px;margin-left:5px;">
                                                    <label for="fundInp_Limits" class="inline" id="fundLabel_Limits" style="margin-left:15px;">Fund: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="fundInp_Limits" name="fundInp_Limits" style="width:100px;margin-left:10px;">
                                                    <label for="functionalAreaInp_Limits" class="inline" id="functionalAreaLabel_Limits" style="margin-left:15px;">Functional Area: </label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="functionalAreaInp_Limits" name="functionalAreaInp_Limits" style="width:150px;margin-left:10px;">
                                                    <label for="fundCenterInp_Limits" class="inline" id="fundCenterLabel_Limits">Funds Center:</label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="fundCenterInp_Limits" name="fundCenterInp_Limits" style="width:150px;margin-left:10px;">
                                                    <label for="commItemServiceInp_Limits" class="inline" id="commItemLabel_Limits" style="margin-left:15px;">Com Item:</label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="commItemServiceInp_Limits" name="commItemServiceInp_Limits" style="width:200px;margin-left:5px;">
                                                    <label for="nActNumServiceInp_Limits" class="inline" id="nActNumLabel_Limits" style="margin-left:10px;">N/Act.Num:</label>
                                                    <input type="text" class="form-control form-rounded inline input-height" id="nActNumServiceInp_Limits" name="nActNumServiceInp_Limits" style="width:100px;margin-left:15px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <a><i type="buttom" class="fa fa-arrow-circle-right btn-lg btn-primary" id="limitAccAsgnChangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                <a><i type="button" class="fas fa-save btn-lg btn-primary" id="saveLimitAccAsgnData" title="save"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            <div class="modal fade" id="limitsChangeAccAsgnScreenModal" tabindex="-1" role="dialog" aria-labelledby="limitsChangeAccAsgnScreenLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="limitsChangeAccAsgnScreenLabel">Account Assignment</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="container-fluid">
                            <form id="limitAccountAssignmentTableModal" method="post" action="#">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="form-group two">
                                                        <label for="limitAccountAssignLine" class="inline">Line:</label>
                                                        <input type="text" class="form-control form-rounded inline" id="limitAccountAssignLine" name="limitAccountAssignLine" style="width:100px;margin-left: 65px;height:25px;" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="form-group two">
                                                        <label for="limitAccountAssignQuantity" class="inline">Quantity</label>
                                                        <input type="text" class="form-control form-rounded inline" id="limitAccountAssignQuantity" name="limitAccountAssignQuantity" style="width:100px;margin-left: 45px;height:25px;" disabled>
                                                        <input type="text" class="form-control form-rounded inline" id="limitAccountAssignuom" name="limitAccountAssignuom" style="width:40px;height:25px;" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="form-group two">
                                                        <label for="limitAccountAssignActivity" class="inline">Activity:</label>
                                                        <input type="text" class="form-control form-rounded inline" id="limitAccountAssignActivity" name="limitAccountAssignActivity" style="width:100px;margin-left: 50px;height:25px;" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="form-group two">
                                                        <label for="limitAccountAssignShortText" class="inline">Short Text:</label>
                                                        <input type="text" class="form-control form-rounded inline" id="limitAccountAssignShortText" name="limitAccountAssignShortText" style="width:250px;margin-left: 30px;height:25px;" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                            <div class="row">
                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="limitDistributionIndicator" class="inline">Distribution Indicator</label>
                                                        <div><hr style="margin-top:0rem;margin-bottom:0rem">
                                                            <label class="custom-control custom-radio">
                                                                <input type="radio" name="limitDistributionIndicator" id="limitNoMultiAcctAssignment" class="custom-control-input" disabled="true"><span class="custom-control-label">No Multi Act Assignment</span>
                                                            </label>
                                                            <label class="custom-control custom-radio ">
                                                                <input type="radio" name="limitDistributionIndicator" id="limitDistOnQuantBases" class="custom-control-input" disabled="true"><span class="custom-control-label">Distribution On Quantity Bases</span>
                                                            </label>
                                                            <label class="custom-control custom-radio ">
                                                                <input type="radio" name="limitDistributionIndicator" id="limitDistByPercentageBases" class="custom-control-input" checked="true"><span class="custom-control-label">Distribution By Percentage</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="limitTabAccAsgnTebleId">
                                        <thead class="table-header-color">
                                            <tr class="border-0">                                                   
                                                <th class="border-0"></th>                                      <!--0-->
                                                <th class="border-0 th-color">Quant</th>                        <!--1-->
                                                <th class="border-0 th-color">GL A/C</th>                       <!--2-->
                                                <th class="border-0 th-color">CO Area</th>                      <!--3-->
                                                <th class="border-0 th-color">Cost Center</th>                  <!--4-->
                                                <th class="border-0 th-color">Fund</th>                         <!--5-->
                                                <th class="border-0 th-color">Fun Area</th>                     <!--6-->
                                                <th class="border-0 th-color">Fund Center</th>                  <!--7-->
                                                <th class="border-0 th-color">Com Item</th>                     <!--8-->
                                                <th class="border-0 th-color">Order</th>                        <!--9-->
                                                <th class="border-0 th-color">Asset</th>                        <!--10-->
                                                <th class="border-0 th-color">WBS Elements</th>                 <!--11-->
                                                <th class="border-0 th-color">Sales Order</th>                  <!--12-->
                                                <th class="border-0 th-color">Network/Activity Number</th>      <!--13-->
                                                <th class="border-0 th-color">Item Number</th>                  <!--14-->
                                                <th class="border-0 th-color">Delivery Schedule</th>            <!--15-->
                                            </tr>
                                        </thead>
                                        <tbody>   
                                            <tr>
                                                <td></td>                                                                                                                     <!--0-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblPercentage" value="" max=""></td>           <!--1-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblGLAccount" value=""></td>                 <!--2-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblCOArea" value=""></td>                    <!--3-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblCostCetner" value=""></td>                <!--4-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblFund" value=""></td>                      <!--5-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblFunctionalArea" value=""></td>            <!--6-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblFundCenter" value=""></td>                <!--7-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblCommitmentItem" value=""></td>            <!--8-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblOrder" value=""></td>                     <!--9-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblAssets" value=""></td>                    <!--10-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblWBSElement" value=""></td>                <!--11-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblSalesOrder" value=""></td>                 <!--12-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblNetActNumber" value=""></td>               <!--13-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblItemNumber" value=""></td>                 <!--14-->
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblDeliverySchedule" value=""></td>           <!--15-->
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!--</form>-->
                        <!--</div>-->
                        <div class="modal-footer">
                            <a><i type="buttom" class="fa fa-arrow-circle-left btn-lg btn-primary" id="limitBackChangedScreen" title="Change Screen" aria-hidden="true"></i></a>
                            <button type="button" class="btn btn-primary" id="limitAccountAsgnTblSaveBtn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="TaxCodeModal" tabindex="-1" role="dialog" aria-labelledby="TaxCodeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="TaxCodeLabel">Tax Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover TaxCodeTableClass" id="TaxCodeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Tax Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Tax Code Description</th>
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
            <div class="modal fade" id="BusinessAreaModal" tabindex="-1" role="dialog" aria-labelledby="BusinessAreaLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="BusinessAreaLabel">Business Area</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover BusinessAreaTableClass" id="BusinessAreaTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Business Area &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Business Area Description</th>
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
            <div class="modal fade" id="SalesOrgModal" tabindex="-1" role="dialog" aria-labelledby="SalesOrgLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="SalesOrgLabel">Sales Organisation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover SalesOrgTableClass" id="SalesOrgTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Sales Organisation Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Sales Organisation Name</th>
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
            <div class="modal fade" id="DistrChannelModal" tabindex="-1" role="dialog" aria-labelledby="DistrChannelLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="DistrChannelLabel">Distributed Channel</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover DistrChannelTableClass" id="DistrChannelTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="DividionModal" tabindex="-1" role="dialog" aria-labelledby="DividionLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="DistrChannelLabel">Division</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover DividionTableClass" id="DividionTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="CostObjectModal" tabindex="-1" role="dialog" aria-labelledby="CostObjectLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CostObjectLabel">Cost Object</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <!--                                            <table class="table table-bordered table-hover DividionTableClass" id="DividionTableId" style="width: 100%">
                                                                                        <thead class="">
                                                                                            <tr class="">
                                                                                                <th style="width:50px;"></th>
                                                                                                <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
                                                                                                <th class="border-1" scope="col">Name</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                        
                                                                                        </tbody>
                                                                                    </table>-->
                                    </div>
                                    <!--</div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ProfitCenterModal" tabindex="-1" role="dialog" aria-labelledby="ProfitCenterLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ProfitCenterLabel">Profit Center</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ProfitCenterTableClass" id="ProfitCenterTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Profit Center &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="PartnerPCModal" tabindex="-1" role="dialog" aria-labelledby="PartnerPCLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="PartnerPCLabel">Partner PC</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover PartnerPCTableClass" id="PartnerPCTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Partner PC &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="CountryModal" tabindex="-1" role="dialog" aria-labelledby="CountryLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CountryLabel">Country</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover CountryTableClass" id="CountryTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Country Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="SalesOfficeModal" tabindex="-1" role="dialog" aria-labelledby="SalesOfficeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="SalesOfficeLabel">Sales Office</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover SalesOfficeTableClass" id="SalesOfficeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Sales Office &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="MatlGroupModal" tabindex="-1" role="dialog" aria-labelledby="MatlGroupLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="MatlGroupLabel">Material Group</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover MatlGroupTableClass" id="MatlGroupTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Material Group Code &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="CustomerGroupModal" tabindex="-1" role="dialog" aria-labelledby="CustomerGroupLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CustomerGroupLabel">Customer Group</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover CustomerGroupTableClass" id="CustomerGroupTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Customer Group &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="ProdHierLev1Modal" tabindex="-1" role="dialog" aria-labelledby="ProdHierLev1Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ProdHierLev1Label">Product Hierarchy</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ProdHierLev1TableClass" id="ProdHierLev1TableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="ProdHierLev2Modal" tabindex="-1" role="dialog" aria-labelledby="ProdHierLev2Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ProdHierLev2Label">Product Hierarchy</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ProdHierLev2TableClass" id="ProdHierLev2TableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="ProdHierLev3Modal" tabindex="-1" role="dialog" aria-labelledby="ProdHierLev3Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ProdHierLev3Label">Product Hierarchy</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ProdHierLev3TableClass" id="ProdHierLev3TableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="ReferenceDocModal" tabindex="-1" role="dialog" aria-labelledby="ReferenceDocLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ReferenceDocLabel">Reference Doc</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ReferenceDocTableClass" id="ReferenceDocTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Reference Doc &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Item</th>
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
            <div class="modal fade" id="MaterialTypeModal" tabindex="-1" role="dialog" aria-labelledby="MaterialTypeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="MaterialTypeLabel">Material Type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover MaterialTypeTableClass" id="MaterialTypeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Material Type &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="ProjectIndModal" tabindex="-1" role="dialog" aria-labelledby="ProjectIndLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ProjectIndLabel">Project Indicator</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ProjectIndTableClass" id="ProjectIndTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Name &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Project Indicator</th>
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
            <div class="modal fade" id="ValuationTypeModal" tabindex="-1" role="dialog" aria-labelledby="ValuationTypeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ValuationTypeLabel">Valuation Type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ValuationTypeTableClass" id="ValuationTypeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Valuation Type &nbsp;&nbsp;</th>
                                                    <!--<th class="border-1" scope="col">Project Indicator</th>-->
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
            <div class="modal fade" id="CustomerClassModal" tabindex="-1" role="dialog" aria-labelledby="CustomerClassLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CustomerClassLabel">Customer Classification</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover CustomerClassTableClass" id="CustomerClassTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Customer Classification &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="MaterialSourceIndModal" tabindex="-1" role="dialog" aria-labelledby="MaterialSourceIndLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="MaterialSourceIndLabel">Material Source Ind</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover MaterialSourceIndTableClass" id="MaterialSourceIndTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Material Source Ind &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="ContractTypeModal" tabindex="-1" role="dialog" aria-labelledby="ContractTypeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ContractTypeLabel">Contract Type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ContractTypeTableClass" id="ContractTypeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Contract Type &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="IndustryCode1Modal" tabindex="-1" role="dialog" aria-labelledby="IndustryCode1Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="IndustryCode1Label">Industry Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover IndustryCode1TableClass" id="IndustryCode1TableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="IndustryCode2Modal" tabindex="-1" role="dialog" aria-labelledby="IndustryCode2Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="IndustryCode2Label">Industry Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover IndustryCode2TableClass" id="IndustryCode2TableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="IndustryCode3Modal" tabindex="-1" role="dialog" aria-labelledby="IndustryCode3Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="IndustryCode3Label">Industry Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover IndustryCode3TableClass" id="IndustryCode3TableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="SalesDocTypeModal" tabindex="-1" role="dialog" aria-labelledby="SalesDocTypeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="SalesDocTypeLabel">Sales Doc Type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover SalesDocTypeTableClass" id="SalesDocTypeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Sales Doc Type &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="ReferenceItemModal" tabindex="-1" role="dialog" aria-labelledby="ReferenceItemLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ReferenceItemLabel">Reference Item</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ReferenceItemTableClass" id="ReferenceItemTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Reference Item &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Document</th>
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
            <div class="modal fade" id="BillingTypeModal" tabindex="-1" role="dialog" aria-labelledby="BillingTypeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="BillingTypeLabel">Billing Type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover BillingTypeTableClass" id="BillingTypeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Process Type &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="ProdHierarchyModal" tabindex="-1" role="dialog" aria-labelledby="ProdHierarchyLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ProdHierarchyLabel">Product Hierarchy</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ProdHierarchyTableClass" id="ProdHierarchyTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="HigherLevItemModal" tabindex="-1" role="dialog" aria-labelledby="HigherLevItemLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="HigherLevItemLabel">Product Hierarchy</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover HigherLevItemTableClass" id="HigherLevItemTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Higher Lev Item &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="IndCodeModal" tabindex="-1" role="dialog" aria-labelledby="IndCodeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="IndCodeLabel">Industry Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover IndCodeTableClass" id="IndCodeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="IndField001Modal" tabindex="-1" role="dialog" aria-labelledby="IndField001Label" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="IndField001Label">Industry Field 001</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover IndField001TableClass" id="IndField001TableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Industry Field 001 &nbsp;&nbsp;</th>
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

            <div class="modal fade" id="prlineitemattachmentmodal" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <form action="#" method="post" enctype="multipart/form-data" id="prlinedocform">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                            <div class="modal-header">
                                <h5 class="modal-title" id="attLabel">Attachments</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv1">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting documents-1</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc1" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                                <!--<input type="file" name="att1"/>-->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv2">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting documents-2</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc2" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv3">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting documents-3</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc3" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv4">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting documents-4</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc4" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv5">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting documents-5</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc5" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" id="uploaddocumentModalBtn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="materialMasterModal" tabindex="-1" role="dialog" aria-labelledby="materialCodeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="materialCodeLabel">Material Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover materialMasterTable" id="materialMasterTable" style="width:100%;">
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="border-0">Material Code</th>
                                                    <th class="border-0">Company Code</th>
                                                    <th class="border-0">Plant Code</th>
                                                    <th class="border-0">Short Text</th>
                                                    <th class="border-0">Long Text</th>
                                                    <th class="border-0">Storage Location</th>
                                                    <th class="border-0">Purchase Group</th>
                                                    <th class="border-0">Material Group</th>
                                                    <th class="border-0">UoM</th>
                                                    <th class="border-0">UoM Store</th>
                                                    <th class="border-0">Old Material No</th>
                                                    <th class="border-0">Value Price</th>
                                                    <th class="border-0">Country of Origin</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <c:forEach var="material" items="${masterMaterialList}">
                                                    <tr class="materialMasterTableTrClass">
                                                        <td>${material.materialCode}</td>
                                                        <td>${material.companyCode}</td>
                                                        <td>${material.plantCode}</td>
                                                        <td>${material.shortText}</td>
                                                        <td>
                                                            <a href="#" class="matlLongTextClass" title="Long Text" data-toggle="tooltip" data-placement="auto">
                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                            </a>
                                                            <input type="hidden" name="longTextHiddenClass" class="longTextHiddenClass" value="${material.longText}">
                                                        </td>
                                                        <td>${material.storageLocation}</td>
                                                        <td>${material.purchaseGroup}</td>
                                                        <td>${material.materialGroup}</td>
                                                        <td>${material.baseUOM}</td>
                                                        <td>${material.UOMStore}</td>
                                                        <td>${material.oldMaterialNo}</td>
                                                        <td>${material.valuePrice}</td>
                                                        <td>${material.countryOfOrigin}</td>
                                                    </tr>
                                                </c:forEach>

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
            <div class="modal fade" id="matlLongTextModal" tabindex="-1" role="dialog" aria-labelledby="matlLongTextLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="matlLongTextLabel">Long Text</h5>
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
            <div class="modal fade" id="CurrencyMasterModal" tabindex="-1" role="dialog" aria-labelledby="CurrencyMasterLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CurrencyMasterLabel">Currency</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover CurrencyMasterTable" id="CurrencyMasterTable" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th class="" style="width:50px;">Currency</th>
                                                    <th>Currency Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="currencyList" items="${currencyList}" varStatus="status">
                                                    <tr class="CurrencyMasterTrClass">
                                                        <td value="${currencyList.currencyCode}">${currencyList.currencyCode}</td>
                                                        <td>${currencyList.currencyDesc}</td>
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

                                        <c:forEach var="plant" items="${masterPlantList}">
                                            <tr class="plantMasterTrClass">
                                                <td>${plant.name}</td>
                                                <td>${plant.plantCode}</td>
                                                <td>${plant.plantDesc}</td>
                                            </tr>
                                        </c:forEach>
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
            <div class="modal fade" id="purchaseGroupMasterModal" tabindex="-1" role="dialog" aria-labelledby="purchaseGroupMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="purchaseGroupMasterModalLabel">Purchase Group Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover purchaseGroupMasterTable" id="purchaseGroupMasterTable" style="width:100%;">
                                    <thead>
                                        <tr class="border-0">
                                            <th class="border-0">Purchase Group Code</th>
                                            <th class="border-0">Purchase Group Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <c:forEach var="purchase" items="${masterPurchaseGroupList}">
                                            <tr class="purchaseGroupMasterTrClass">
                                                <td>${purchase.purchasingGroupCode}</td>
                                                <td>${purchase.purchasingGroupDesc}</td>
                                            </tr>
                                        </c:forEach>
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
            <div class="modal fade" id="PurchaseOrganizationMasterModal" tabindex="-1" role="dialog" aria-labelledby="PurchaseOrganizationMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="PurchaseOrganizationMasterModalLabel">Purchase Organization Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover purchaseOrgMasterTable" id="purchaseOrgMasterTable" style="width:100%;">
                                    <thead>
                                        <tr class="border-0">
                                            <th class="border-0">Purchase Org. Code</th>
                                            <th class="border-0">Purchase Org. Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <c:forEach var="purchase" items="${masterPurchaseOrgList}">
                                            <tr class="purchaseOrgMasterTrClass">
                                                <td>${purchase.purchaseOrgCode}</td>
                                                <td>${purchase.purchaseOrgDesc}</td>
                                            </tr>
                                        </c:forEach>
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
            <div class="modal fade" id="StorageLocationMasterModal" tabindex="-1" role="dialog" aria-labelledby="StorageLocationMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="StorageLocationMasterModalLabel">Storage Location Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover storageLocationMasterTable" id="storageLocationMasterTable" style="width:100%;">
                                    <thead>
                                        <tr class="border-0">
                                            <th class="border-0">Location Code</th>
                                            <th class="border-0">Location Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <c:forEach var="loc" items="${masterLocationList}">
                                            <tr class="storgageLocMasterTrClass">
                                                <td>${loc.locationCode}</td>
                                                <td>${loc.locationDesc}</td>
                                            </tr>
                                        </c:forEach>
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
            <div class="modal fade" id="StorageLocationMasterModal" tabindex="-1" role="dialog" aria-labelledby="StorageLocationMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="StorageLocationMasterModalLabel">Storage Location Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover storageLocationMasterTable" id="storageLocationMasterTable" style="width:100%;">
                                    <thead>
                                        <tr class="border-0">
                                            <th class="border-0">Location Code</th>
                                            <th class="border-0">Location Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <c:forEach var="loc" items="${masterLocationList}">
                                            <tr class="storgageLocMasterTrClass">
                                                <td>${loc.locationCode}</td>
                                                <td>${loc.locationDesc}</td>
                                            </tr>
                                        </c:forEach>
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
            <div class="modal fade" id="DepartmentMasterModal" tabindex="-1" role="dialog" aria-labelledby="DepartmentMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="DepartmentMasterModalLabel">Department Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover departmentMasterTable" id="departmentMasterTable" style="width:100%;">
                                    <thead>
                                        <tr class="border-0">
                                            <th class="border-0">Department Code</th>
                                            <th class="border-0">Department Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <c:forEach var="dept" items="${masterDeptList}">
                                            <tr class="departmentMasterTrClass">
                                                <td>${dept.departmentCode}</td>
                                                <td>${dept.departmentDesc}</td>
                                            </tr>
                                        </c:forEach>
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
            <div class="modal fade" id="PoDepartmentMasterModal" tabindex="-1" role="dialog" aria-labelledby="PoDepartmentMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="PoDepartmentMasterModalLabel">Department Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover poDepartmentMasterTable" id="poDepartmentMasterTable" style="width:100%;">
                                    <thead>
                                        <tr class="border-0">
                                            <th class="border-0">Department Code</th>
                                            <th class="border-0">Department Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <c:forEach var="dept" items="${masterDeptList}">
                                            <tr class="poDepartmentMasterTrClass">
                                                <td>${dept.departmentCode}</td>
                                                <td>${dept.departmentDesc}</td>
                                            </tr>
                                        </c:forEach>
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
                                                    <th style="width:50px;"></th>
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
            <div class="modal fade" id="ConditionTypeModal" tabindex="-1" role="dialog" aria-labelledby="ConditionTypeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="costCenterLabel">Condition Type</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered conditionTypeCheckboxClass" id="conditionTypeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Condition Type &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
                                                    <th class="border-1" scope="col">Currency</th>
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
            <div class="modal fade" id="CustomerCodeModal" tabindex="-1" role="dialog" aria-labelledby="CustomerCodeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="CustomerCodeLabel">Customer Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered customerCodeTableClass" id="customerCodeTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th class="border-1" scope="col" style="width:50px;">Customer Code  &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
                                                    <th class="border-1" scope="col">Email Id</th>
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
            <div class="modal fade" id="SalesOrderModal" tabindex="-1" role="dialog" aria-labelledby="SalesOrderLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="costCenterLabel">Sales Order</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered salesOrderTableClass" id="salesOrderTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Sales Order &nbsp;&nbsp;</th>
                                                    <!--<th class="border-1" scope="col">Description</th>-->
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
            <div class="modal fade" id="ItemNumberModal" tabindex="-1" role="dialog" aria-labelledby="ItemNumberLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="costCenterLabel">Item Number</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered itemNumberTableClass" id="itemNumberTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Item Number &nbsp;&nbsp;</th>
                                                    <!--<th class="border-1" scope="col">Description</th>-->
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
            <div class="modal fade" id="ItemNumberModal" tabindex="-1" role="dialog" aria-labelledby="ItemNumberLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="costCenterLabel">Item Number</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered itemNumberTableClass" id="itemNumberTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Item Number &nbsp;&nbsp;</th>
                                                    <!--<th class="border-1" scope="col">Description</th>-->
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
            <div class="modal fade" id="BusinessAreaModal" tabindex="-1" role="dialog" aria-labelledby="BusinessAreaLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="BusinessAreaLabel">Business Area</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover BusinessAreaTableClass" id="BusinessAreaTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Business Area &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Business Area Description</th>
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
            <div class="modal fade" id="SalesOrgModal" tabindex="-1" role="dialog" aria-labelledby="SalesOrgLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="SalesOrgLabel">Sales Organisation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover SalesOrgTableClass" id="SalesOrgTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Sales Organisation Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Sales Organisation Name</th>
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
            <div class="modal fade" id="DistrChannelModal" tabindex="-1" role="dialog" aria-labelledby="DistrChannelLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="DistrChannelLabel">Distributed Channel</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover DistrChannelTableClass" id="DistrChannelTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="DividionModal" tabindex="-1" role="dialog" aria-labelledby="DividionLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="DistrChannelLabel">Division</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover DividionTableClass" id="DividionTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Name</th>
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
            <div class="modal fade" id="ProfitCenterModal" tabindex="-1" role="dialog" aria-labelledby="ProfitCenterLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ProfitCenterLabel">Profit Center</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover ProfitCenterTableClass" id="ProfitCenterTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Profit Center &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="PartnerPCModal" tabindex="-1" role="dialog" aria-labelledby="PartnerPCLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="PartnerPCLabel">Partner PC</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover PartnerPCTableClass" id="PartnerPCTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Partner PC &nbsp;&nbsp;</th>
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
            <div class="modal fade" id="MaterialCodeModal" tabindex="-1" role="dialog" aria-labelledby="MaterialCodeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="costCenterLabel">Material Code</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered materialCheckboxClass" id="materailTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <!--<th style="width:50px;"></th>-->
                                                    <th class="border-1" scope="col" style="width:50px;">Material  &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Description</th>
                                                    <th class="border-1" scope="col">Product Storage Location</th>
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
            <div class="modal fade" id="PlantModal" tabindex="-1" role="dialog" aria-labelledby="PlantCodeLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="PlantLabel">Plant</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered plantTableClass" id="plantTableId" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th class="border-1" scope="col" style="width:50px;">Plant  &nbsp;&nbsp;</th>
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

            <!--<script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>-->

            <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
            <!--<script src="assets/js/po.js"></script>-->
            <script src="assets/js/standalonepo.js"></script>
            <!--<script src="assets/js/povalidations.js"></script>-->
            <script src="assets/js/newgen.js"></script>

            <!--savestandalonepo-->
            <!--                Changes By Shashank Tiwari 
                                13-11-2019
            -->
            <script src="assets/js/savestandalonepo.js"></script>

            <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
            <script src="assets/vendor/parsley/parsley.js"></script>

            <script src="assets/vendor/datepicker/moment.js"></script>
            <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
            <script src="assets/vendor/datepicker/datepicker.js"></script>
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
            <script type="text/javascript">

                                                            $(document).ready(function() {
                                                                //                    alert("hello");
                                                                $(".selectpicker").selectpicker();

                                                                //            $('.needs-validation').parsley();
                                                                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");
                                                                $('.needs-validation').parsley();
                                                            });

            </script>
            <script>
                function bs_input_file() {
//                alert("dfdf");
                    $(".input-file").before(
                            function() {
                                if (!$(this).prev().hasClass('input-ghost')) {
                                    var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                                    element.attr("name", "file_" + $(this).attr("name"));
                                    element.change(function() {
                                        element.next(element).find('input').val((element.val()).split('\\').pop());
                                    });
                                    $(this).find("button.btn-choose").click(function() {
                                        element.click();
                                    });
                                    $(this).find("button.btn-resetbtn").click(function() {
                                        element.val(null);
                                        $(this).parents(".input-file").find('input').val('');
                                    });
                                    $(this).find('input').css("cursor", "pointer");
                                    $(this).find('input').mousedown(function() {
                                        $(this).parents('.input-file').prev().click();
                                        return false;
                                    });
                                    return element;
                                }
                            }
                    );
                }
                $(function() {
                    bs_input_file();
                });
            </script>
    </body>
</html>
