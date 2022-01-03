<%-- 
    Document   : createrfp
    Created on : 8 Jan, 2019, 3:07:01 PM
    Author     : abhishek.e
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

        <title>Acknowledge Contract</title>

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
            .acknowledge-contract {
                position: fixed;
                /*top: 70px;*/
                right: 50%;
                bottom: 10px;
                z-index: 999;
            }
        </style>
    </head>
    <body onload="">
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
                                            <h2 class="pageheader-title">Acknowledge Contract </h2>
                                        </div>
                                        <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">-->
                                        <div class="form-group two">
                                            <label for="transactionInitiatedOn" class="inline" style="margin-left:15px;">Tran. Init. On:</label>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="transactionInitiatedOn" name="transactionInitiatedOn" disabled>-->
                                            <label for="transactionInitiatedOn" class="inline" id="transactionInitiatedOn"></label>
                                            <div class="vl inline"></div>
                                            <label for="creatorId" class="inline">Creator Id:</label>
                                            <label for="creatorId" class="inline" id="creatorId">${buyer.username}</label>
                                            <div class="vl inline"></div>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="creatorId" name="creatorId" value="${buyer.username}"disabled>-->
                                            <label for="creatorEmail" class="inline">Creator Email:</label>
                                            <!--<input type="text" style="height: 25px; width: 150px;" class="form-control form-rounded inline" id="creatorEmail" name="creatorEmail" value="${buyer.emailid}"disabled>-->
                                            <label for="creatorId" class="inline" id="creatorId">${buyer.emailid}</label>
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
                                                <input type="hidden" name="pid" id="pid" value="${pid}">
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
                                                                                <select class="custom-select dropdown-height" id="companycodeHeader" name="companycodeHeader">
                                                                                    <option value="">Select</option>
                                                                                    <c:forEach var="code" items="${companyCodeList}" varStatus="status">
                                                                                        <option value="${code.companyCode}">${code.companyCode}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="typeOfPOHeader">Type of Contract:</label>
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
                                                                                    <input type="text" class="form-control datetimepicker-input" id="docDateHeader" name="docDateHeader" data-target="#docDateHeader_div"/>
                                                                                    <div class="input-group-append" data-target="#docDateHeader_div" data-toggle="datetimepicker">
                                                                                        <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="poNumber">Contract Number:</label>
                                                                                <input type="text" class="form-control form-rounded" id="poNumber" name="poNumber" value="${PoNumber}" readonly>
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
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <button type="button" style="margin-top: 25px;" class="btn btn-primary btn-sm" id="uploadSignedContractCopyBtn">Upload Signed Contract Copy</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
<!--
                                                                                  <!--       <div class="row">
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <label for="OverdeliveryTolerance" class="inline" style="margin-left:10px;">Overdel. Tol:</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="OverdeliveryTolerance" name="OverdeliveryTolerance" style="width:50px;margin-left:53px;" value="0.00">
                                                                                <!--<h5 class="inline">%</h5>-->
                                                                            <!--       <label for="" class="inline">%</label>
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
                                                                         <!--      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
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
                                                             <!--      <div class="card-body">
                                                                    <!--<h5>Invoice</h5>-->
                                                                  <!--     <div class="row">
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
                                                                                <label for="TaxCodeDescription" class="">Tax Code:</label>
                                                                                <input type="text" class="form-control form-rounded" id="TaxCodeDescription" name="TaxCodeDescription">
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
                                                         <!--      <div class="tab-pane fade show" id="conditions_linelevel-tab" role="tabpanel" aria-labelledby="conditions_linelevel-tab">

                                                                <!--<h5>Org. Data</h5>-->
                                                                <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                            <!--       <div class="card-body">
                                                                    <!--<h5>Conditions</h5>-->
                                                                <!--       <div class="row">
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
                                                                                                <!--<th class="border-1" style="width:70px;"></th>-->
                                                                                     <!--          </tr>
                                                                                     <!--      </thead>
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
                                                                           <!--</div>-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="align-center text-align-center">
                                                        <input type="button" class="btn btn-success btn-rounded acknowledge-contract" id="acknowledgeContractBtn" value="Acknowledge Contract">
                                                        <!--<input type="button" class="btn btn-primary btn-rounded" id="cancelAckPoBtn" value="Cancel Acknowledge PO">-->
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
                                <form action="uploadsignedpo.do" method="post" enctype="multipart/form-data" id="acknowledgeDocForm">
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
                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="conditionvalues" data-toggle="tab" href="#conditionvalues-tab" role="tab" aria-controls="DeliveryInvoide" aria-selected="true">Condition Values</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="controldata" data-toggle="tab" href="#controldata-tab" role="tab" aria-controls="Conditions" aria-selected="false">Control Data</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="accountdetermination" data-toggle="tab" href="#accountdetermination-tab" role="tab" aria-controls="Texts" aria-selected="false">Account Determination</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content">
                                                    <div class="tab-pane fade show active" id="conditionvalues-tab" role="tabpanel" aria-labelledby="conditionvalues-tab">
                                                        <!--<h5>Delivery Invoice</h5>-->
                                                        <!--<div class="card">-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <!--<h5>Condition Values</h5>-->
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ConditionPricingDate" class="">Condition Pricing Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded datepicker" id="ConditionPricingDate" name="ConditionPricingDate" readonly="true">-->
                                                                        <div class="input-group date" id="ConditionPricingDate" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ConditionPricingDate_Value" name="ConditionPricingDate_Value" data-target="#ConditionPricingDate" />
                                                                            <div class="input-group-append" data-target="#ConditionPricingDate" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="amountConditions" class="">Amount </label>
                                                                        <input type="text" class="form-control form-rounded" id="amountConditions" name="amountConditions">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="currency1Conditions" class="">Currency1 </label>
                                                                        <input type="text" class="form-control form-rounded" id="currency1Conditions" name="currency1Conditions">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="pricingUnitConditions" class="">Pricing Unit</label>
                                                                        <input type="text" class="form-control form-rounded" id="pricingUnitConditions" name="pricingUnitConditions">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="uoMConditionValuesConditions" class="">UoM</label>
                                                                        <input type="text" class="form-control form-rounded" id="uoMConditionValuesConditions" name="uoMConditionValuesConditions">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="conditionBaseValueConditions" class="">Condition base value</label>
                                                                        <input type="text" class="form-control form-rounded" id="ConditionBaseValue" name="conditionBaseValueConditions" readonly="true">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="conditionBaseRateConditions" class="">Condition base Rate</label>
                                                                        <input type="text" class="form-control form-rounded" id="conditionBaseRateConditions" name="conditionBaseRateConditions" readonly="true">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="conditionValueConditions" class="">Condition Value </label>
                                                                        <input type="text" class="form-control form-rounded" id="conditionValueConditions" name="conditionValueConditions">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="currency2Conditions" class="">Currency2 </label>
                                                                        <input type="text" class="form-control form-rounded" id="currency2Conditions" name="currency2Conditions">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                    </div>
                                                    <div class="tab-pane fade show" id="controldata-tab" role="tabpanel" aria-labelledby="controldata-tab">
                                                        <!--<h5>Delivery Invoice</h5>-->
                                                        <!--<div class="card">-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
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
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                    </div>
                                                    <div class="tab-pane fade show" id="accountdetermination-tab" role="tabpanel" aria-labelledby="accountdetermination-tab">
                                                        <!--<h5>Delivery Invoice</h5>-->
                                                        <!--<div class="card">-->
                                                        <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <!--<h5>Account Determination</h5>-->
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="AccountKey" class="">Account Key</label>
                                                                        <input type="text" class="form-control form-rounded" id="AccountKey" name="AccountKey">

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="accrualsAccountDetermination" class="">Accruals</label>
                                                                        <input type="text" class="form-control form-rounded" id="accrualsAccountDetermination" name="accrualsAccountDetermination">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--</div>-->
                                                        <!--</div>-->
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
                                                    <tr>
                                                        <td></td>                                                                                                                       <!--0-->
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
                                    <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
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
            ,<!--    <div class="modal fade" id="Currency2HeaderModal" tabindex="-1" role="dialog" aria-labelledby="Currency2HeaderLabel" aria-hidden="true">
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
                                   
                <div class="modal fade" id="uploadSignedContractCopyModal" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <form action="uploadsignedcontract.do" method="post" enctype="multipart/form-data" id="acknowledgeDocFormContract">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                  <input type="hidden" name="ro_pid" value="${pid}">
                            <input type="hidden" name="ro_poNumber" value="${ContractNo}">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="attLabel">Attachments for Contract</h5>
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
                                                            <button class="btn btn-primary btn-choose" type="button">Signed Contract Copy</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc1" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                        </div>
                                                    <div class="input-group input-file" name="docDiv2">
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-primary btn-choose" type="button">Workman Compensation Insurance Policy</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc2" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                    </div>
                                                      <div class="input-group input-file" name="docDiv3">
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-primary btn-choose" type="button">Public Liability</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc3" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                    </div>
                                                    <div class="input-group input-file" name="docDiv4">
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-primary btn-choose" type="button">Banker Guarantee / Deposit</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc4" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                    </div>
                                                    <div class="input-group input-file" name="docDiv5">
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-primary btn-choose" type="button">BizSafe Level Cerificate</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc5" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                    </div>
                                                    <div class="input-group input-file" name="docDiv6">
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-primary btn-choose" type="button">Risk Assessment of Job</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc6" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                    </div>
                                                   
                                                    <!--<input type="file" name="att1"/>-->
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="uploaddocumentContractModalBtn">Submit</button>
                                </div>
                            </form>
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
                <script src="assets/js/po.js"></script>
                <script src="assets/js/newgen.js"></script>
                <script src="assets/js/contract.js"></script>
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
