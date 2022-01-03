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
        <link rel="stylesheet" href="assets/css/po-css.css">
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />

        <title>Edit PO</title>

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
            .updatePoBtn {
                position: fixed;
                right: 50%;
                bottom: 10px;
                z-index: 999;
            }
            .cancelPoBtn {
                position: fixed;
                right: 42%;
                bottom: 10px;
                z-index: 999;
            }
        </style>
    </head>
    <body onload="callNGWebServiceTOFetchPODetails();">
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
                                            <h2 class="pageheader-title">Edit PO </h2>
                                        </div>
                                        <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">-->
                                        <div class="form-group two">
                                            <label for="transactionInitiatedOn" class="inline" style="margin-left:15px;color:#3d405c;">Tran. Init. On:</label>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="transactionInitiatedOn" name="transactionInitiatedOn" disabled>-->
                                            <label for="transactionInitiatedOn" class="inline" id="transactionInitiatedOn"></label>
                                            <div class="vl inline"></div>
                                            <label for="creatorId" class="inline" style="color:#3d405c;">Creator Id:</label>
                                            <label for="creatorId" class="inline" id="creatorId"></label>
                                            <div class="vl inline"></div>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="creatorId" name="creatorId" value="${buyer.username}"disabled>-->
                                            <label for="creatorEmail" class="inline" style="color:#3d405c;">Creator Email:</label>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="creatorEmail" name="creatorEmail" value="${buyer.emailid}"disabled>-->
                                            <label for="creatorId" class="inline" id="creatorEmailId"></label>
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
                                                <li class="breadcrumb-item"><a href="managepo.do">Manage POs</a></li>
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
                                            <form action="#" method="post" id="createpoform">
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
                                                <input type="hidden" id="serviceTebAccAsgnReqFrom" name="serviceTebAccAsgnReqFrom">
                                                <input type="hidden" name="dmsip" id="dmsip" value="${PONGwebserviceIp}">
                                                <input type="hidden" id="PrType" name="PrType">
                                                <input type="hidden" name="Pid" id="Pid" value="${Pid}">
                                                <input type="hidden" name="currentDate" id="currentDate" value="<fmt:formatDate value="<%= new java.util.Date()%>" pattern="yyyy-MM-dd" />">
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <!--<div class="accrodion-regular">-->
                                                        <!--<div id="accordion3">-->
                                                        <div id="">
                                                            <div class="card">
                                                                <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                                <div class="card-body border-top">
                                                                    <!--                                                                    <div class="row">
                                                                                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                                                
                                                                                                                                            </div>
                                                                                                                                        </div>-->
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group" >
                                                                                <label for="companycodeHeader">Company Code:</label>
                                                                                <input type="text" class="form-control form-rounded" id="companycodeHeader" name="companycodeHeader" readonly>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="typeOfPOHeader">Type of PO:</label>
                                                                                <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height" id="typeOfPOHeader" name="typeOfPOHeader">
                                                                                    <option value="">Select</option>
                                                                                    <c:forEach var="potype" items="${PurchaseOrderTypeList}" varStatus="status">
                                                                                        <option value="${potype.type}">${potype.type}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendorCodeHeader">Vendor Name/Code:</label>
                                                                                <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="vendorcodeHeader" name="vendorcodeHeader">
                                                                                    <!--<option>Select</option>-->

                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="">Doc. Date:</label>
                                                                                <input type="text" class="form-control form-rounded" id="docDateHeader" name="docDateHeader" readonly>
                                                                                <!--                                                                                <div class="input-group date" id="docDateHeader_div" data-target-input="nearest">
                                                                                                                                                                    <input type="text" class="form-control datetimepicker-input" id="docDateHeader" name="docDateHeader" data-target="#docDateHeader_div"/>
                                                                                                                                                                    <div class="input-group-append" data-target="#docDateHeader_div" data-toggle="datetimepicker">
                                                                                                                                                                        <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="poNumber">PO Number:</label>
                                                                                <input type="text" class="form-control form-rounded" id="poNumber" name="poNumber" value="${PoNumber}" readonly>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <label for="requestType">Request Type:</label>
                                                                            <input type="text" class="form-control form-rounded" id="requestType" name="requestType" value="Amend Purchase Order" readonly="true">
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <label for="referenceDocType">Reference Doc Type:</label>
                                                                            <select class="custom-select dropdown-height" id="referenceDocType" name="referenceDocType">
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
                                                                            <select class="custom-select dropdown-height" id="referenceDocNumber" name="referenceDocNumber">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <label for="referenceDocLine">Reference Doc Line:</label>
                                                                            <select class="custom-select dropdown-height" id="referenceDocLine" name="referenceDocLine">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
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
                                                                            <select class="custom-select dropdown-height" id="downPaymentReqd" name="downPaymentReqd">
                                                                                <option value="">Select</option>
                                                                                <option>Yes</option>
                                                                                <option>No</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="downPaymentReqdValue">Value:</label>
                                                                            <input type="text" class="form-control form-rounded" id="downPaymentReqdValue" name="downPaymentReqdValue">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="downPaymentFor">Downpayment For:</label>
                                                                            <select class="custom-select dropdown-height" id="downPaymentFor" name="downPaymentFor">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <!--<label for="">Input XML</label>-->
                                                                            <textarea cols="60" rows="10" id="updateInputXml"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <button type="button" id="sapUpdate">Update PO</button>
                                                                    <!--<button type="button" id="sapEdit">Edit PO</button>-->
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
                                                    <!--                                                    <li class="nav-item">
                                                                                                            <a class="nav-link" id="partners" data-toggle="tab" href="#partner-tab" role="tab" aria-controls="Partner" aria-selected="false">Partners</a>
                                                                                                        </li>-->
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
                                                    <!--                                                    <li class="nav-item">
                                                                                                            <a class="nav-link" id="approverDetails" data-toggle="tab" href="#approverDetails-tab" role="tab" aria-controls="ApproverDetails" aria-selected="false">Approver Details</a>
                                                                                                        </li>-->
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="headerText_linelevel" data-toggle="tab" href="#headerText_linelevel-tab" role="tab" aria-controls="headerText_linelevel" aria-selected="false">Header Text</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content">
                                                    <div class="tab-pane fade show active" id="deliveryInvoice-tab" role="tabpanel" aria-labelledby="deliveryInvoice-tab">
                                                        <div class="card-body">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="paymentTermsDelivery" class="inline">Payment Terms:</label>
                                                                            <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height payment-term-custom-select inline" id="paymentTermsDelivery" name="paymentTermsDelivery" style="width:240px;">
                                                                                <option value="">Select</option>
                                                                                <c:forEach var="paymentterm" items="${paymenttermList}" varStatus="status">
                                                                                    <option value="${paymentterm.paymentTerms}">${paymentterm.paymentTerms}</option>
                                                                                </c:forEach>
                                                                            </select>
                                                                            <label for="" class="inline"></label>
                                                                            <label for="currencyDeliveryInvoice" class="inline" style="margin-left: 250px;">Currency:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="CurrencyDeliveryInvoice" value="SGD" name="CurrencyDeliveryInvoice" style="width: 100px;margin-left: 42px;" readonly="true">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group two">
                                                                            <label for="paymentDays1" class="inline">Payment in:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="paymentDays1" name="paymentDays1" style="width: 100px;margin-left: 25px;">&nbsp 
                                                                            <label for="PaymentTerms" class="inline">days</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="paymentPer1" name="paymentPer1" style="width: 100px;">
                                                                            <label for="PaymentTerms" class="inline">%</label>
                                                                            <label for="ExchangeRate" class="inline" style="margin-left: 240px;">Exchange Rate</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="ExchangeRate" name="ExchangeRate" style="width: 100px;margin-left: 10px;" readonly="true">
                                                                            <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                <input type="checkbox" style="padding-bottom :-50px;" name="ExchangeReateFixed" id="ExchangeReateFixed" class="custom-control-input"><span class="custom-control-label" required="">Exchange Rate Fixed</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group two">
                                                                            <label for="paymentDays2" class="inline">Payment in:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="paymentDays2" name="paymentDays2" style="width: 100px;margin-left: 25px;">&nbsp 
                                                                            <label for="PaymentTerms" class="inline">days</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="paymentPer1" name="paymentPer1" style="width: 100px;">
                                                                            <label for="PaymentTerms" class="inline">%</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group two">
                                                                            <label for="PaymentTerms" class="inline">Payment in:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="paymentDaysNet" name="paymentDaysNet" style="width: 100px;margin-left: 25px;">&nbsp 
                                                                            <label for="PaymentTerms" class="inline">days net</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group two">
                                                                            <label for="Incoterms" class="inline">Incoterms:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="IncoTermsPart1" name="IncoTermsPart1" style="width: 50px;margin-left: 32px;">
                                                                            <input type="text" class="form-control form-rounded inline" id="IncoTermsPart2" name="IncoTermsPart2" style="width: 300px;">
                                                                            <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                <input type="checkbox" style="padding-bottom :-50px;" name="GRMessage" id="GRMessage" class="custom-control-input"><span class="custom-control-label" required="">GR Message</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</table>-->
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show" id="conditions-tab" role="tabpanel" aria-labelledby="conditions-tab">
                                                        <!--<h5>Conditions</h5>-->
                                                        <!--<div class="card">-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
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
                                                            <!--                                                                    <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowConditionsBtnId" style="margin-left: 20px;"></i></a>-->
                                                            <!--<a><i type="buttom" style="display:none;" class="fa fa-arrow-circle-right btn-primary btn-sm" id="conditionDetailsBtn" aria-hidden="true"></i></a>-->
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <!--<div class="accrodion-regular">-->
                                                                    <!--<div id="accordion3">-->
                                                                    <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
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
                                                                                        <th class="border-0"></th>
                                                                                        <!--<th class="border-0"></th>-->
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                    <!--</div>-->
                                                                    <!--</div>-->
                                                                    <!--</div>-->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--</div>-->
                                                    <div class="tab-pane fade show" id="vendorAddress-tab" role="tabpanel" aria-labelledby="vendorAddress-tab">
                                                        <!--<h5>Texts</h5>-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="streetVendorAddress" class="">Street:</label>
                                                                        <input type="text" class="form-control form-rounded" id="streetVendorAddress" name="streetVendorAddress">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="houseNumberVendorAddress" class="">House Number:</label>
                                                                        <input type="text" class="form-control form-rounded" id="houseNumberVendorAddress" name="houseNumberVendorAddress">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="postalCodeVendorAddress" class="">Postal Code:</label>
                                                                        <input type="text" class="form-control form-rounded" id="postalCodeVendorAddress" name="postalCodeVendorAddress">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="cityVendorAddress" class="">City:</label>
                                                                        <input type="text" class="form-control form-rounded" id="cityVendorAddress" name="cityVendorAddress">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="extTel" class="">Extension Tel:</label>
                                                                        <input type="text" class="form-control form-rounded" id="extTel" name="extTel">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="telephoneVendorAddress" class="">Telephone:</label>
                                                                        <input type="text" class="form-control form-rounded" id="telephoneVendorAddress" name="telephoneVendorAddress">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="extFax" class="">Extension Fax:</label>
                                                                        <input type="text" class="form-control form-rounded" id="extFax" name="extFax">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="faxVendorAddress" class="">Fax:</label>
                                                                        <input type="text" class="form-control form-rounded" id="faxVendorAddress" name="faxVendorAddress">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="countryVendorAddress" class="">Country:</label>
                                                                        <input type="text" class="form-control form-rounded" id="countryVendorAddress" name="countryVendorAddress">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--</div>-->
                                                    </div>
                                                    <div class="tab-pane fade show" id="communication-tab" role="tabpanel" aria-labelledby="communication-tab">
                                                        <!--<h5>Communication</h5>-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="Salesperson" class="">Salesperson:</label>
                                                                        <input type="text" class="form-control form-rounded" id="Salesperson" name="Salesperson">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="YourReference" class="">Your Reference:</label>
                                                                        <input type="text" class="form-control form-rounded" id="YourReference" name="YourReference">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="Telephone" class="">Telephone:</label>
                                                                        <input type="text" class="form-control form-rounded" id="Telephone" name="Telephone">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="OurReference" class="">Our Reference:</label>
                                                                        <input type="text" class="form-control form-rounded" id="OurReference" name="OurReference">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="Language" class="">Language:</label>
                                                                        <input type="text" class="form-control form-rounded" value="EN" id="Language" name="Language" readonly="true">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--</div>-->
                                                    </div>
                                                    <div class="tab-pane fade show" id="partner-tab" role="tabpanel" aria-labelledby="partner-tab">
                                                        <!--<h5>Partner</h5>-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md- col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered" id="partnerTableId">
                                                                            <thead class="table-header-color">
                                                                                <tr class="border-0">
                                                                                    <th class="border-0 th-color" style="width: 20px;">Partner Function</th>
                                                                                    <th class="border-0 th-color">Name</th>
                                                                                    <th class="border-0 th-color" style="width: 120px;">Number</th>
                                                                                    <th class="border-0 th-color">Vendor Name</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--</div>-->
                                                    </div>
                                                    <div class="tab-pane fade show" id="additionaldata-tab" role="tabpanel" aria-labelledby="additionaldata-tab">

                                                        <!--<h5>Additional Data</h5>-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="CollectiveNumber" class="">Collective Number:</label>
                                                                        <input type="text" class="form-control form-rounded" id="CollectiveNumber" name="CollectiveNumber">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--</div>-->
                                                    </div>
                                                    <!--                                                        <div class="tab-pane fade show" id="address-tab" role="tabpanel" aria-labelledby="address-tab">
                                                    
                                                                                                                <h5>Address</h5>
                                                                                                                <div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">
                                                                                                                    <div class="card-body">
                                                    
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>-->
                                                    <div class="tab-pane fade show" id="org_data-tab" role="tabpanel" aria-labelledby="org_data-tab">

                                                        <!--<h5>Org. Data</h5>-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="purchasingOrg" class="">Purchasing Organization:</label>
                                                                        <input type="text" class="form-control form-rounded" id="purchasingOrg" name="purchasingOrg" data-parsley-trigger="change" data-parsley-maxlength="4" readonly="true">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="purchasingGroup" class="">Purchasing Group:</label>
                                                                        <select class="custom-select" id="purchasingGroup" name="purchasingGroup">
                                                                            <option value="">Select</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--</div>-->
                                                    </div>
                                                    <!--                                                        <div class="tab-pane fade show" id="MaterialDetils-tab" role="tabpanel" aria-labelledby="MaterialDetils-tab">
                                                    
                                                                                                                <h5>Status</h5>
                                                    
                                                                                                            </div>-->
                                                    <div class="tab-pane fade show" id="customerdata-tab" role="tabpanel" aria-labelledby="customerdata-tab">

                                                        <!--<h5>Customer Data</h5>-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
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
                                                                        <input type="text" class="form-control form-rounded" id="InstructionToWeigher" name="InstructionToWeigher">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ZoneCollectionScrap" class="">Zone Collection Scrap:</label>
                                                                        <select class="custom-select" id="ZoneCollectionScrap" name="ZoneCollectionScrap">
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
                                                                        <input type="text" class="form-control form-rounded" id="ProductOrigin" name="ProductOrigin">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="SegmentDescription" class="">Segment (Description):</label>

                                                                        <select class="custom-select" id="SegmentDescription" name="SegmentDescription">
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
                                                    <div class="tab-pane fade show" id="headerText_linelevel-tab" role="tabpanel" aria-labelledby="headerText_linelevel-tab">
                                                        <div class="card-body">
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
                                                            <!--                                                                    <div class="row">
                                                                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                                        <div class="align-center text-align-center">
                                                                                                                                            <input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveHeaderTextBtn" value="Save">
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>-->
                                                        </div>
                                                        <!--</div>-->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="card">
                                            <div class="rightCircle3" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                            <div class="row collapseDiv3">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <!--<div class="accrodion-regular">-->
                                                    <!--<div id="accordion3">-->
                                                    <!--<div class="card">-->
                                                    <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                    <div class="card-body">
                                                        <div class="table-responsive" style="height: 260px;">
                                                            <table class="table table-bordered material_table-header-color" id="material_headerClass">
                                                                <thead class="">
                                                                    <tr class="border-0">
                                                                        <!--<th class="border-0">S.No</th>-->
                                                                        <th class="border-0">Item Number</th>
                                                                        <th class="border-0">Ac Asgn</th>
                                                                        <th class="border-0">Item Cat</th>
                                                                        <th class="border-0">Material Code</th>
                                                                        <th class="border-0">Criticality</th>
                                                                        <th class="border-0">Short Text</th>
                                                                        <th class="border-0">Long Text</th>
                                                                        <th class="border-0">Quantity</th>
                                                                        <th class="border-0">(Per) Unit</th>
                                                                        <th class="border-0">Net Price</th>                                                                                
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
                                                                        <th class="border-0">Tracking Number</th>
                                                                        <th class="border-0">Company Code</th>
                                                                        <th class="border-0">UOM</th>
                                                                        <th style="display: none;"></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <!--</div>-->
                                                </div>
                                                <!--</div>-->
                                                <!--</div>-->
                                            </div>
                                        </div>
                                        <br>
                                        <!--</div>-->
                                        <div class="card">
                                            <div class="rightCircle2" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                            <div class="tab-regular collapseDiv2">
                                                <label for="Item" class="inline" style="margin-left:10px;margin-bottom:20px;">Item:</label>
                                                <select class="custom-select inline ItemNumberSelectClass" style="width:300px;margin-bottom:0px;margin-left:50px;" id="ItemNumberSelectEdit" name="Item">

                                                </select>
                                                <button type="button" class="btn btn-sm btn-primary" title="Save Line Level Data" id="SaveLineLevelDataBtn" disabled="true"><i class="fa fa-save"></i> Save</button>
                                                <div style="display: none;" id="lineLevelTabsDiv">
                                                    <ul class="nav nav-tabs nav-fill nav-tabs" id="myTab7" role="tablist">
                                                        <li class="nav-item" id="serviceTab_li">
                                                            <a class="nav-link active" id="services" data-toggle="tab" href="#services-tab" role="tab" aria-controls="services" aria-selected="true">Services</a>
                                                        </li>
                                                        <li class="nav-item" id="limits_li">
                                                            <a class="nav-link" id="limits" data-toggle="tab" href="#limits-tab" role="tab" aria-controls="limits" aria-selected="false">Limits</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="quantities" data-toggle="tab" href="#quantities-tab" role="tab" aria-controls="quantities" aria-selected="false">Quantities/Weights</a>
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
                                                    </ul>
                                                    <div class="tab-content">
                                                        <!--<input type="hidden">-->
                                                        <div class="tab-pane fade show active" id="services-tab" role="tabpanel" aria-labelledby="services-tab">
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="serviceTabAccAssgnModelBtn_div" style="display:none;">
                                                                                <div class="form-group">
                                                                                    <a><i type="buttom"  class="fa fa-arrow-circle-right btn-primary btn-sm" id="serviceAccountAssignmentAddBtn" aria-hidden="true"></i></a>
                                                                                </div>
                                                                            </div>
                                                                            <input type="hidden" value="" id="servicePackageNumber">
                                                                            <!--                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                                                                                        <div class="form-group">
                                                                                                                                                            <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" title="save" id="serviceTabTableSaveBtn" aria-hidden="true"></i></a>
                                                                                                                                                        </div>
                                                                                                                                                    </div>-->
                                                                        </div>
                                                                        <div class="table-responsive" style="height:260px;">
                                                                            <table class="table table-bordered" id="serviceTableId">
                                                                                <thead class="table-header-color">
                                                                                    <tr class="border-0">
                                                                                        <th class="border-0"></th>                      <!--0-->
                                                                                        <th class="border-0">Line Item Number</th>      <!--1-->    
                                                                                        <th class="border-0">Service Number</th>        <!--2-->
                                                                                        <th class="border-0">Short Text</th>            <!--3-->
                                                                                        <th class="border-0">Quantity</th>              <!--4-->
                                                                                        <th class="border-0">Unit</th>                  <!--5-->
                                                                                        <th class="border-0">Gross Price</th>           <!--6-->
                                                                                        <th class="border-0">Currency</th>              <!--7-->
                                                                                        <th class="border-0">Net Price</th>             <!--8-->
                                                                                        <th class="border-0">Edition</th>               <!--9-->
                                                                                        <th class="border-0">Line Item Long Text</th>   <!--10-->
                                                                                        <th class="border-0">Overf. Tolerance</th>      <!--11-->
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

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
                                                        <!--                                                        <section id="conditions-model"><p>1</p></section>-->
                                                        <div class="tab-pane fade show" id="limits-tab" role="tabpanel" aria-labelledby="limits-tab">
                                                            <!--<h5>Conditions</h5>-->
                                                            <!--<div class="card">-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
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
                                                                            <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="limitsAccountAssignmentBtn" title="Change Screen" aria-hidden="true"></i></a>
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
                                                            <!--<h5>Texts</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Quantities</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group" style="margin-bottom:0px;">
                                                                            <label for="pOQuantity" class="">PO Quantity/Unit:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="pOQuantity" name="pOQuantity" style="width:150px;margin-left:50px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$" required="true">
                                                                            <input type="text" class="form-control form-rounded inline" id="pOUnit" name="pOUnit" style="width:50px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                            <label for="orderUnit" class="" style="margin-left:30px;">Order Unit</label>
                                                                            <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <label for="orderPriceUnit" class="inline" style="margin-left:5px;">Order Price Unit:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="orderUnit" name="orderUnit" style="width:80px;margin-left:30px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$">
                                                                            <input type="text" class="form-control form-rounded inline" id="unitOrderUnit" name="unitOrderUnit" style="width:40px" readonly>
                                                                            <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <input type="text" class="form-control form-rounded inline" id="orderPriceUnit" name="orderUnit" style="width:80px;margin-left:5px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$">
                                                                            <input type="text" class="form-control form-rounded inline" id="unitOrderPriceUnit" name="unitOrderPriceUnit" style="width:40px" readonly>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group" style="margin-bottom:0px;">
                                                                            <label for="pOQuantitySKU" class="">PO Quantity in SKU/Unit:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="pOQuantitySKU" name="pOQuantitySKU" style="width:150px;margin-left:10px;" readonly>
                                                                            <input type="text" class="form-control form-rounded inline" id="pOUnitSKU" name="pOUnitSKU" style="width:50px;" readonly>
                                                                            <label for="orderUnit2" class="" style="margin-left:30px;">Order Unit</label>
                                                                            <label class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <label for="sKUUnit" class="inline" style="margin-left:5px;">SKU:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="orderUnit2" name="orderUnit2" style="width:80px;margin-left:90px;" readonly>
                                                                            <input type="text" class="form-control form-rounded inline" id="unitOrderUnit2" name="unitOrderUnit2" style="width:40px" readonly>
                                                                            <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                            <input type="text" class="form-control form-rounded inline" id="sKUUnit" name="sKUUnit" style="width:80px;margin-left:5px;" readonly>
                                                                            <input type="text" class="form-control form-rounded inline" id="unitSKUUnit" name="unitSKUUnit" style="width:40px" readonly>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="deliverySchedule-tab" role="tabpanel" aria-labelledby="deliverySchedule-tab">
                                                            <!--<h5>Communication</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
<!--                                                            <div class="form-group">
                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowdeliveryScheduleBtnId" style="margin-left: 20px;margin-top:10px;"></i></a>
                                                            </div>-->
                                                            <div class="card-body">
                                                                <div class="table-responsive" style="height:260px;">
                                                                    <table class="table table-bordered deliveryScheduleTableClass" id="DeliveryScheduleTableId" style="width: 100%;">
                                                                        <thead class="table-header-color">
                                                                            <tr class="">
                                                                                <th class="border-1 th-color" style="width:20px;"></th>
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
                                                                            <!--
                                                                            <tr>
                                                                                <td><input type="checkbox" class=" checkboxDeliverySch" id="" name=""></td>
                                                                                <td><input type="text" class="form-control form-rounded deliveryDateCategory tableInputField "  id="deliveryDateCategoryId" name=""></td>
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
                                                                            </tr>-->
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="delivery-tab" role="tabpanel" aria-labelledby="delivery-tab">
                                                            <!--<h5>Partner</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Delivery</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <label for="OverdeliveryTolerance" class="inline" style="margin-left:10px;">Overdel. Tol:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="OverdeliveryTolerance" name="OverdeliveryTolerance" style="width:50px;margin-left:53px;" value="0.00">
                                                                            <!--<h5 class="inline">%</h5>-->
                                                                            <label for="" class="inline">%</label>
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="unlimited" id="unlimited" class="custom-control-input" checked="true"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GoodsReceipt" class="inline">Unlimited: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="UnderdeliveryTolerance" class="inline" style="margin-left:10px;">Underdel Tol:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="UnderdeliveryTolerance" value="0.00" name="UnderdeliveryTolerance" style="width:50px;margin-left:50px;">
                                                                            <label for="" class="inline">%</label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="ShippingInstruction" class="inline" style="margin-left:10px;">Shipping Instruction:</label>
                                                                            <select class="custom-select inline" id="ShippingInstruction" name="ShippingInstruction" style="width:80px;margin-left:10px;">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="StockType" class="inline" style="margin-left:10px;">Stock Type:</label>
                                                                            <select class="custom-select inline" id="StockType" name="StockType" style="width:80px;margin-left:60px;">
                                                                                <option value="">Select</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="ValuationType" class="inline" style="margin-left:10px;">Valuation Type:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="ValuationType" name="ValuationType" style="width:200px;margin-left:40px;">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="RemShelfLife" class="inline" style="margin-left:10px;">Rem. Shelf Life:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="RemShelfLife" name="RemShelfLife" style="width:100px;margin-left:35px;">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="QAControlLife" class="inline" style="margin-left:10px;">QA Control life:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="QAControlLife" name="QAControlLife" style="width:120px;margin-left:40px;">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="GRProcTime" class="inline" style="margin-left:10px;">GR Proc. Time:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="GRProcTime" name="GRProcTime" style="width:50px;margin-left:40px;"> 
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <label for="FirstReminderExpediter" class="inline">1st Rem/Exp:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="FirstReminderExpediter" name="FirstReminderExpediter" style="width:50px;margin-left:14px;">
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="GoodsReceipt" id="GoodsReceipt" class="custom-control-input" checked="true" disabled="true"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GoodsReceipt" class="inline">Goods Receipt: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="SecondReminderExpediter" class="inline">2nd Rem/Exp:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="SecondReminderExpediter" name="SecondReminderExpediter" style="width:50px;margin-left:10px;">
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="GRNonValuated" id="GRNonValuated" class="custom-control-input" checked="true" disabled="true"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GRNonVal" class="inline">GR Non-Valuated: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="ThirdReminderExpediter" class="inline">3rd Rem/Exp:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="ThirdReminderExpediter" name="ThirdReminderExpediter" style="width:50px;margin-left:14px;">
                                                                            <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                <input type="checkbox" name="DelivCompleted" id="DelivCompleted" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                                            </label>
                                                                            <label for="GoodsReceipt" class="inline">Deliv. Completed: </label>
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="NoExpend" class="inline">No.Expend: </label>
                                                                            <input type="text" class="form-control form-rounded inline" id="NoExpend" name="NoExpend" style="width:50px;margin-left:25px;">
                                                                        </div>
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="PlDeliveryTime" class="inline">Pl Del Time:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="PlDeliveryTime" name="PlDeliveryTime" style="width:50px;margin-left:22px;">
                                                                        </div>
                                                                        <!--                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                                                        <label for="LatestGRDate" class="inline">Latest GR Date:</label>
                                                                                                                                                        <div class="input-group inline date" id="LatestGRDate" data-target-input="nearest">
                                                                                                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check inline" id="LatestGRDate_Value" name="LatestGRDate_Value" data-target="#LatestGRDate" style="width:100px;"/>
                                                                                                                                                            <div class="input-group-append inline" data-target="#LatestGRDate" data-toggle="datetimepicker" style="margin-left:0px;">
                                                                                                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>-->
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                            <label for="PlDeliveryTime" class="inline">Incoterms:</label>
                                                                            <input type="text" class="form-control form-rounded inline" id="incoTermsPart1Delivery" name="incoTermsPart1Delivery" style="width:50px;margin-left:32px;">
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade show" id="invoice-tab" role="tabpanel" aria-labelledby="invoice-tab">

                                                            <!--<h5>Additional Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Invoice</h5>-->
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
                                                                    <!--                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                                                                            <div class="form-group">
                                                                                                                                                <label for="DPCategory" class="">DP Category:</label>
                                                                                                                                                <select class="custom-select" id="DPCategory" name="DPCategory">
                                                                                                                                                    <option value="">Select</option>
                                                                                                                                                </select>
                                                                                                                                            </div>
                                                                                                                                        </div>-->
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="TaxCodeDescription" class="">Tax Code:</label>
                                                                            <input type="text" class="form-control form-rounded" id="TaxCode" name="TaxCode">
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
                                                                <!--                                                                    <div class="row">
                                                                                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                                            <div class="card-body">
                                                                                                                                                <div class="table-responsive"  style="height: 260px;">
                                                                                                                                                    <table class="table table-bordered invoiceTableClassLineLevel" id="invoiceTableIdLineLevel">
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
                                                                                                                                                                <th class="border-1" style="width:70px;"></th>
                                                                                                                                                            </tr>
                                                                                                                                                        </thead>
                                                                                                                                                        <tbody>
                                                                                                                                                            <tr>
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
                                                                                                                                                                <td><input type="text" class="form-control form-rounded vendorcodenameLineLevel tableInputField" id="" name="vendorcodenameLineLevel"></td>
                                                                                                                                                                <td></td>
                                                                                                                                                            </tr> 
                                                                                                                                                        </tbody>
                                                                                                                                                    </table>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>-->
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="conditions_linelevel-tab" role="tabpanel" aria-labelledby="conditions_linelevel-tab">

                                                            <!--<h5>Org. Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Conditions</h5>-->
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
                                                                            <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveLineItemConditionDetailsBtn" aria-hidden="true" style="margin-left:1000px;"></i></a>
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
                                                                                            <th></th>
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
                                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignmentCategory" name="accountAssignmentCategory" style="width:200px;margin-left:25px;" readonly>
                                                                            <label for="distribution" class="inline" style="margin-left:50px;">Distribution: </label>
                                                                            <select class="custom-select inline" id="distribution" name="distribution" style="width:230px;margin-left:25px;" disabled="true">
                                                                                <option>Single Account Assignment</option>
                                                                                <option>Distrib. On Quantity Basis</option>
                                                                                <option> Distrib. By Percentage</option>
                                                                            </select>
                                                                            <label for="CoCode" class="inline" style="margin-left:50px;">Co Code: </label>
                                                                            <input type="text" class="form-control form-rounded inline" id="CoCode" name="CoCode" style="width:200px;margin-left:25px;" readonly>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="costCenterDiv">                                     
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <!--<div class="modal-footer">-->
                                                                            <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentchangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                            <!--</div>-->
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="unloadingPoint" class="inline" id="unloadingPointLabel">Unlod. Point:</label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="unloadingPoint" name="unloadingPoint" style="width:100px;margin-left:25px;">
                                                                                <label for="recipient" class="inline" style="margin-left: 15px;" id="recipientLabel">Recipient:</label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="recipient" name="recipient" style="width:100px;margin-left:15px;">
                                                                                <label for="gLAccount" class="inline" style="margin-left: 15px;" id="gLAccountLabel">GL Account: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="gLAccount" name="gLAccount" style="width:100px;margin-left:30px;">
                                                                                <label for="coArea" class="inline" id="coAreaLabel" style="margin-left:60px;">CO Area: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="coArea" name="coArea" style="width:100px;margin-left:35px;" disabled>
                                                                            </div>
                                                                        </div>
                                                                        <!--<div class="AccAsgn_K">-->
                                                                        <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="costCenterAccAsgn" id="accAsgCostCenterLabel" class="inline" style="margin-left:15px;">Cost Center: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="costCenterAccAsgn" name="costCenterAccAsgn" style="width:100px;margin-left:10px;">
                                                                                <label for="Order" class="inline" id="assAsgnorderLabel" style="margin-left:15px;">Order: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnOrder" name="Order" style="width:100px;margin-left:10px;">
                                                                                <label for="accAsgnAsset" class="inline" id="accAsgnAssetLabel" style="margin-left:15px;">Asset: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnAsset" name="accAsgnAsset" style="width:100px;margin-left:10px;">
                                                                                <label for="WBSElement" class="inline" id="wBSElementLabel" style="margin-left:15px;">WBS Element:</label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnWBSElementInput" name="WBSElement" style="width:100px;margin-left:10px;">
                                                                                <label for="assAsgnSalesOrder" class="inline" id="accAsgnSalesOrderLabel" style="margin-left:15px;"> Sales Order: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnSalesOrder" name="assAsgnSalesOrder" style="width:100px;margin-left:5px;">
                                                                                <label for="assAsgnItemNumber" class="inline" id="assAsgnItemNumLabel" style="margin-left:15px;"> Item Number: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="assAsgnItemNumber" name="assAsgnItemNumber" style="width:100px;margin-left:5px;">
                                                                                <label for="assAsgnDelivSch" class="inline" id="assAsgnDelivSchLabel" style="margin-left:15px;"> Del Sch: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="assAsgnDelivSch" name="assAsgnDelivSch" style="width:100px;margin-left:5px;">
                                                                                <label for="fund" class="inline" id="accAsgnFundLabel" style="margin-left:15px;">Fund: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnfund" name="fund" style="width:100px;margin-left:10px;">
                                                                                <label for="functionalArea" class="inline" id="accAsgnfunctionalAreaLabel" style="margin-left:15px;">Functional Area: </label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnfunctionalArea" name="functionalArea" style="width:150px;margin-left:10px;">
                                                                                <label for="fundCenter" class="inline" id="accAsgnFundCenterLabel">Fund Center:</label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnFundCenterInput" name="accAsgnFundCenterInput" style="width:150px;margin-left:10px;">
                                                                                <label for="commitmentItem" class="inline" id="accAsgnCommItemLabel" style="margin-left:15px;">Com Item:</label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnCommItemInput" name="commitmentItem" style="width:200px;margin-left:5px;">
                                                                                <label for="NetActNumber" class="inline" id="accAsgnNActNumLabel" style="margin-left:10px;">N/Act.Num:</label>
                                                                                <input type="text" readonly="true" class="form-control form-rounded inline input-height" id="accAsgnNActNumInput" name="accAsgnNActNumInput" style="width:100px;margin-left:15px;">
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
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <!--<div class="modal-footer">-->
                                                                            <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentTablechangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                            <!--</div>-->
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
                                                                                                <th class="border-0 th-color" style="display: none;">Link Id</th>
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
                                                        </div>
                                                        <div class="tab-pane fade show" id="texts-tab" role="tabpanel" aria-labelledby="texts-tab">

                                                            <!--<h5>Customer Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>texts</h5>-->
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ItemText" class="">Item Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="ItemText" name="ItemText">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="InfoRecordPOText" class="">Info Record PO Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="InfoRecordPOText" name="InfoRecordPOText">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="MaterialPOText" class="">Material PO Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="MaterialPOText" name="MaterialPOText">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="PONoteToApprover" class="">PO Note To Approver:</label>
                                                                            <input type="text" class="form-control form-rounded" id="PONoteToApprover" name="PONoteToApprover">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="DeliveryText" class="">Delivery Text:</label>
                                                                            <input type="text" class="form-control form-rounded" id="DeliveryText" name="DeliveryText">
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
                                                                            <input type="text" value="" class="form-control form-rounded" id="Name1" name="Name1">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Name2" class="">Name2:</label>
                                                                            <input type="text" value="" class="form-control form-rounded" id="Name2" name="Name2">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Street" class="">Street:</label>
                                                                            <input type="text" value="" class="form-control form-rounded" id="Street" name="Street">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="HouseNumber" class="">House Number:</label>
                                                                            <input type="text" value="" class="form-control form-rounded" id="HouseNumber" name="HouseNumber">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="PostalCode" class="">Postal Code:</label>
                                                                            <input type="text" value="" class="form-control form-rounded" id="PostalCode" name="PostalCode">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="City" class="">City:</label>
                                                                            <input type="text" value="" class="form-control form-rounded" id="City" name="City">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="countryLimits" class="">Country:</label>
                                                                            <input type="text" value="" class="form-control form-rounded" id="countryLimits" name="countryLimits">
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
                                                                            <select class="custom-select" id="confControlLimits" name="confControlLimits">
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
                                                                            <input type="text" class="form-control form-rounded" id="OrderAck" name="OrderAck">
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
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                        <div class="tab-pane fade show" id="conditionControl-tab" role="tabpanel" aria-labelledby="conditionControl-tab">
                                                            <!--<h5>Customer Data</h5>-->
                                                            <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <div class="card-body">
                                                                <!--<h5>Conditions Control</h5>-->
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
                                                                            <input type="text" class="form-control form-rounded" id="ProductOriginLine" name="ProductOriginLine">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </form>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="align-center text-align-center">
                                                    <input type="button" class="btn btn-success btn-rounded updatePoBtn" id="updatePoBtn" value="Update PO">
                                                    <!--<input type="button" class="btn btn-instagram btn-rounded cancelPoBtn" id="cancelPoBtn" value="Cancel PO">-->
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
                                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-lg btn-primary" id="serviceAccountAssignmentchangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                    <a><i type="button" class="fa fa-window-close btn-lg btn-primary" aria-hidden="true" data-dismiss="modal"></i></a>
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
                                                        <select class="custom-select" id="CustomerCode" name="CustomerCode">
                                                            <option value="">Select</option>
                                                        </select>
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
                                                        <select class="custom-select" id="BillingType" name="BillingType">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="salesOrderProfitabilitySegment" class="">Sales Order :</label>
                                                        <select  class="custom-select" id="salesOrderProfitabilitySegment" name="salesOrderProfitabilitySegment">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="itemNumberProfitabilitySegment" class="">Item Number :</label>
                                                        <select class="custom-select" id="itemNumberProfitabilitySegment" name="itemNumberProfitabilitySegment">
                                                            <option value="">Select</option>
                                                        </select>
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
                                                        <select class="custom-select" id="Prodhierarchy" name="Prodhierarchy">
                                                            <option value="">Select</option>
                                                        </select>
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
                                                        <label for="HigherLevItem" class="">Higher-lev.item</label>
                                                        <select class="custom-select" id="HigherLevItem" name="HigherLevItem">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="Industry" class="">Industry</label>
                                                        <select class="custom-select" id="Industry" name="Industry">
                                                            <option value="">Select</option>
                                                        </select>
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
                                                        <label for="PROJECTNUMBER1" class="">PROJECT NUMBER1</label>
                                                        <select class="custom-select" id="PROJECTNUMBER1" name="PROJECTNUMBER1">
                                                            <option value="">Select</option>
                                                        </select>
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
                                                        <label for="valuationTypeProfitabilitySegment" class="">Valuation Type</label>
                                                        <select class="custom-select" id="valuationTypeProfitabilitySegment" name="valuationTypeProfitabilitySegment">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="CustomerClass" class="">Customer Class</label>
                                                        <select class="custom-select" id="CustomerClass" name="CustomerClass">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="MaterialSourceInd" class="">Material Source Ind</label>
                                                        <select class="custom-select" id="MaterialSourceInd" name="MaterialSourceInd">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ContractType" class="">Contract Type</label>
                                                        <select class="custom-select" id="ContractType" name="ContractType">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ShipToParty" class="">Ship To Party</label>
                                                        <select class="custom-select" id="ShipToParty" name="ShipToParty">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryCode1" class="">Industry Code 1</label>
                                                        <select class="custom-select" id="IndustryCode1" name="IndustryCode1">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryField001" class="">Industry Field 001</label>
                                                        <select class="custom-select" id="IndustryField001" name="IndustryField001">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryCode2" class="">Industry Code 2</label>
                                                        <select class="custom-select" id="IndustryCode2" name="IndustryCode2">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="IndustryCode3" class="">Industry Code 3</label>
                                                        <select class="custom-select" id="IndustryCode3" name="IndustryCode3">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="SalesDocType" class="">Sales Doc. Type</label>
                                                        <select class="custom-select" id="SalesDocType" name="SalesDocType">
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="ReferenceItem" class="">Reference Item</label>
                                                        <select class="custom-select" id="ReferenceItem" name="ReferenceItem">
                                                            <option value="">Select</option>
                                                        </select>
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
                                    <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
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
                                <form id="profitabilitySegmentForm" method="post" action="#">
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
                                                <!--                                                <tr>
                                                                                                    <td></td>                                                                                                                       0
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblQuantity" value="" max=""></td>           1
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="" max=""></td>         2
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value=""></td>                 3
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value=""></td>                    4
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value=""></td>                5
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFund" value=""></td>                      6
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value=""></td>            7
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value=""></td>                8
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value=""></td>            9
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblOrder" value=""></td>                     10
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblAssets" value=""></td>                    11
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblAssets" value=""></td>                12
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value=""></td>                 13
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value=""></td>               14
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value=""></td>                 15
                                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value=""></td>           16
                                                                                                </tr>-->
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
                                <button type="button" class="btn btn-primary" id="submitServiceAccAssModalBtn">Submit</button>
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
                                                    <th></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Account Assignment Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="account" items="${accountObj}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="accountAssignmentCategoryTable-btn" value=""></td>
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
                                                    <th style="width:50px;"></th>
                                                    <th class="border-1" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                                    <th class="border-1" scope="col">Item Category  Desc</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="item" items="${itemCategList}" varStatus="status">
                                                    <tr>
                                                        <td><input type="checkbox" class="itemCategoryCheckboxClass" value=""></td>
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
                            <h5 class="modal-title" id="accAsgnOrderLabel">Commitment Item</h5>
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
                                <!--<button type="button" class="btn btn-primary" id="profitabilitysegmentmodelbtn" style="display:none;">Prof Segment</button>-->
                                <a><i type="buttom" class="fa fa-arrow-circle-right btn-lg btn-primary" id="limitAccAsgnChangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                <a><i type="button" class="fa fa-window-close btn-lg btn-primary" aria-hidden="true" data-dismiss="modal"></i></a>
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
                            <form id="" method="post" action="#">
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
                                                                <input type="radio" name="limitDistributionIndicator" id="limitNoMultiAcctAssignment" class="custom-control-input"><span class="custom-control-label">No Multi Act Assignment</span>
                                                            </label>
                                                            <label class="custom-control custom-radio ">
                                                                <input type="radio" name="limitDistributionIndicator" id="limitDistOnQuantBases" class="custom-control-input" checked="true"><span class="custom-control-label">Distribution On Quantity Bases</span>
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
                                                <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblQuantity" value="" max=""></td>           <!--1-->
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
                            <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
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
                            <h5 class="modal-title" id="PartnerPCLabel">Profit Center</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover PartnerPCTableClass" id="PartnerPCTableId" style="width: 100%">
                                            <!--                                                <thead class="">
                                                                                                <tr class="">
                                                                                                    <th style="width:50px;"></th>
                                                                                                    <th class="border-1" scope="col" style="width:50px;">Profit Center &nbsp;&nbsp;</th>
                                                                                                    <th class="border-1" scope="col">Description</th>
                                                                                                </tr>
                                                                                            </thead>-->
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
            <div class="modal fade" id="PartnerFunctionModal" tabindex="-1" role="dialog" aria-labelledby="PartnerFunctionLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="PartnerFunctionLabel">Partner Function Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered partnerFunctionTable" id="partnerFunctionTable" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th class="border-1" scope="col">Partner Function</th>
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
            <div class="modal fade" id="VendorMasterModal" tabindex="-1" role="dialog" aria-labelledby="VendorMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="VendorMasterModalLabel">Vendor Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-bordered vendorMasterModalTable" id="vendorMasterModalTable" style="width: 100%">
                                            <thead class="">
                                                <tr class="">
                                                    <th class="border-1" scope="col">Vendor Code</th>
                                                    <th class="border-1" scope="col">Vendor Name</th>
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
            <script type="text/javascript" src="assets/vendor/xml2json/xml2json.min.js"></script>
            <script src="assets/js/pofunction.js"></script>
            <!--<script src="assets/js/po.js"></script>-->
            <script src="assets/js/editpo.js"></script>
            <script src="assets/js/newgen.js"></script>
            <script src="assets/js/povalidations.js"></script>
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
        });

            </script>

    </body>
</html>
