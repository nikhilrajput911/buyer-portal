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
        <link href="assets/vendor/jquery-ui/css/jquery-ui.min.css" rel="stylesheet"/>
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

        <c:if test="${type != 'edit'}">
            <title>Create Standalone PO</title>
        </c:if>
        <c:if test="${type == 'edit'}">
            <title>Edit Standalone PO</title>
        </c:if>

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
            .accountAssignmentTebleClass thead th, #approvalDetailsTable thead th, #preCheckResponseModalTable thead th{
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
                right: 45%;
                bottom: 10px;
                z-index: 999;
            }
            .preCheckPoBtn {
                position: fixed;
                /*top: 70px;*/
                right: 45%;
                bottom: 10px;
                z-index: 999;
            }
            .disable-click-event {
                pointer-events:none;
            }
            .updatePoBtn {
                position: fixed;
                right: 50%;
                bottom: 10px;
                z-index: 999;
            }
            .deletePoBtn {
                position: fixed;
                right: 42%;
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
                <div class="" id="po">
                    <div class="container-fluid dashboard-content ">
                        <!-- ============================================================== -->
                        <!-- pageheader  -->
                        <!-- ============================================================== -->

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>

                        <c:if test="${Operation != 'edit'}">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="page-header">
                                        <div class="row">
                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                                <c:if test="${type != 'edit'}">
                                                    <h2 class="pageheader-title">Create Standalone PO </h2>
                                                </c:if>
                                                <c:if test="${type == 'edit'}">
                                                    <h2 class="pageheader-title">Edit Standalone PO </h2> <c:if test="${NGBPExtPOCreation.errorTransactionStatus == 'Yes'}"> <h4 id="errorTransactionLabel" style="color: red;">Error Transaction</h4> </c:if>
                                                </c:if>
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
                                        </div>
                                        <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                        <div class="page-breadcrumb">
                                            <nav aria-label="breadcrumb">
                                                <ol class="breadcrumb">
                                                    <li class="breadcrumb-item">Manage Standalone PO</li>
                                                        <c:if test="${type != 'edit'}">
                                                        <li class="breadcrumb-item"><a href="#">Create PO</a></li>
                                                        </c:if>
                                                        <c:if test="${type == 'edit'}">
                                                        <li class="breadcrumb-item"><a href="#">Edit PO</a></li>
                                                        </c:if>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:if>
                        <c:if test="${Operation == 'edit'}">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="page-header">
                                        <div class="row">
                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                                <h2 class="pageheader-title">Edit PO </h2>
                                            </div>
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

                                        </div>
                                        <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                        <div class="page-breadcrumb">
                                            <nav aria-label="breadcrumb">
                                                <ol class="breadcrumb">
                                                    <li class="breadcrumb-item">Manage PO</li>
                                                    <li class="breadcrumb-item"><a href="#">Edit PO</a></li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </c:if>
                        <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== -->
                        <div class="">

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <!--<h5 class="card-header">Contract Status Panel</h5>-->
                                        <div class="card-body update-backgroud-color">
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
                                                <input type="hidden" id="POAccAssPartialInvoiceIndicator">
                                                <input type="hidden"  id="TempAttachmentId">
                                                <input type="hidden"  id="reqFromCr">
                                                <input type="hidden"  id="reqFromPurOrg">
                                                <input type="hidden"  id="reqFromDelDateCat">
                                                <input type="hidden"  id="reqFromPoDept">
                                                <input type="hidden"  id="materialGlCode">
                                                <input type="hidden"  id="materialZGlCode">
                                                <input type="hidden"  id="accountAssngSerialNumber">
                                                <input type="hidden" id="glCodeNot_A_In_ServicePR">
                                                <input type="hidden" id="ro_country">
                                                <input type="hidden" id="saveSarviceAccountAssignment">
                                                <input type="hidden" id="FromServiceAccountAssignment">
                                                <input type="hidden" id="materialGroupReqFrom">
                                                <input type="hidden" id="creat_Edit" value="${type}">
                                                <input type="hidden" id="reqDataSavedOnPoNumer">
                                                <input type="hidden" id="incotermsReqFrom">
                                                <input type="hidden" id="timeOfChangeCurrency">
                                                <input type="hidden" id="vendorCompanyCode" name=""vendorCompanyCode value="${NGBPExtPOCreation.vendorCode}">
                                                <c:if test="${type == 'edit'}">
                                                    <input type="hidden" id="ro_purchasingGroup" value="${NGBPExtPOCreation.purchasingGrp}">
                                                    <input type="hidden" id="ro_vendorNameCode" value="${NGBPExtPOCreation.vendorName} - ${NGBPExtPOCreation.vendorCode}">
                                                </c:if>
                                                <c:if test="${type == 'new'}">
                                                    <input type="hidden" id="companyCodeNew" value="${perSettingsObj.companyCode}">
                                                    <input type="hidden" id="typeOfPONew" value="${perSettingsObj.purDocType}">
                                                    <input type="hidden" id="paymentTermsNew" value="${perSettingsObj.paymentTerms}">
                                                    <input type="hidden" id="grMessageNew" value="${perSettingsObj.grMessage}">
                                                    <input type="hidden" id="plantNew" value="${perSettingsObj.plant}">
                                                    <input type="hidden" id="itemCategoryNew" value="${perSettingsObj.itemCategory}">
                                                    <input type="hidden" id="accAssgnCatNew" value="${perSettingsObj.accAssgnCat}">
                                                    <input type="hidden" id="requisitionerNew" value="${perSettingsObj.requisitioner}">
                                                    <input type="hidden" id="trackNumNew" value="${perSettingsObj.trackingNumber}">
                                                    <input type="hidden" id="matlGroupNew" value="${perSettingsObj.matlGroup}">
                                                    <input type="hidden" id="delDateCatNew" value="${perSettingsObj.delDateCat}">
                                                    <input type="hidden" id="isAckReqNew" value="${perSettingsObj.isAckReq}">
                                                </c:if>
                                                <c:if test="${Operation == 'edit'}">
                                                    <input type="hidden" id="prType" name="prType" value="">
                                                </c:if>
                                                <input type="hidden" id="customerSeeded" name="customerSeeded" value="">
                                                <input type="hidden" id="poid" name="poid" value="${NGBPExtPOCreation.id}">
                                                <input type="hidden" name="dmsip" id="dmsip" value="${PONGwebserviceIp}">
                                                <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">
                                                <input type="hidden" name="Operation" id="Operation" value="${Operation}">
                                                <input type="hidden" name="currentDate" id="currentDate" value="<fmt:formatDate value="<%= new java.util.Date()%>" pattern="yyyy-MM-dd" />">
                                                <input type="hidden" id="local_dev_uat" name="local_dev_uat" value="${local_dev_uat}">
                                                <input type="hidden" id="PlannedDelvTime" name="PlannedDelvTime" value="">
                                                <input type="hidden" id="isConditionPopulateInHeader" name="isConditionPopulateInHeader" value="No">
                                                <input type="hidden" id="kalsmHiddenfield" name="kalsmHiddenfield">
                                                <input type="hidden" id="totalPoAmt" name="totalPoAmt">
                                                <input type="hidden" id="totalPoAmtExcludingVendor" name="totalPoAmtExcludingVendor">
                                                <input type="hidden" id="isPrSavedAfterEditDetails" name="isPrSavedAfterEditDetails" value="Yes">
                                                <input type="hidden" id="isAnyFieldValueChanged" name="isAnyFieldValueChanged" value="No">
                                                <input type="hidden" id="isPrSavedAlready" name="isPrSavedAlready" value="No">
                                                <input type="hidden" id="vendorMasterreqFrom" name="vendorMasterreqFrom">
                                                <input type="hidden" id="conditionHeaderReqFrom">
                                                <input type="hidden" id="ConfirmationControlForLine">
                                                <input type="hidden" id="TexCodeForLine">
                                                <input type="hidden" id="SegmentForLine">
                                                <input type="hidden" id="regNoHidden">
                                                <input type="hidden" id="materialRequestFrom">
                                                <input type="hidden" id="errorTransactionStatus" value="${NGBPExtPOCreation.errorTransactionStatus}">
                                                <input type="hidden" id="tempPoNumber" value="${NGBPExtPOCreation.poSequenceNumber}">
                                                <input type="hidden" id="poSequenceNumber" value="${NGBPExtPOCreation.tempPoNumber}">
                                                <input type="hidden" id="buyerUsername" name="buyerUsername" value="${buyer.username}">
                                                <input type="hidden" id="buyerEmailId" name="buyerEmailId" value="${buyer.emailid}">
                                                <input type="hidden" id="buyerFirstName" name="buyerFirstName" value="${buyer.firstname}">
                                                <input type="hidden" id="buyerLastName" name="buyerLastName" value="${buyer.lastname}">
                                                <input type="hidden" id="vendorSno">
                                                <input type="hidden" id="pickListKeyCode" value="${pickListKeyCode}">

                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <!--<div class="accrodion-regular">-->
                                                        <!--<div id="accordion3">-->
                                                        <div id="">
                                                            <div class="card">
                                                                <div class="card-body border-top update-backgroud-color">
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group" >
                                                                                <label for="companycodeHeader">Co-Code<span style="color:red;">*</span>:</label>
                                                                                <select class="custom-select dropdown-height"  id="companycodeHeader" name="companycodeHeader" data-parsley-trigger="change" required="true">
                                                                                    <c:if test="${type != 'edit'}">
                                                                                        <option value="">Select</option>
                                                                                    </c:if>
                                                                                    <c:if test="${type == 'edit'}">
                                                                                        <option value="${NGBPExtPOCreation.companyCode}">${NGBPExtPOCreation.companyCode}</option>
                                                                                    </c:if>
                                                                                    <c:forEach var="companyCode" items="${companyCodeList}" varStatus="status">
                                                                                        <option value="${companyCode}">${companyCode}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="typeOfPOHeader">Type of PO<span style="color:red;">*</span>:</label>
                                                                                <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height" id="typeOfPOHeader" name="typeOfPOHeader" data-parsley-trigger="change" required="true">
                                                                                    <c:if test="${type != 'edit'}">
                                                                                        <option value="">Select</option>
                                                                                    </c:if>
                                                                                    <c:if test="${type == 'edit'}">
                                                                                        <option value= "${NGBPExtPOCreation.purchaseOrderType}">${NGBPExtPOCreation.purchaseOrderType}</option>
                                                                                    </c:if>   
                                                                                    <c:forEach var="potype" items="${PurchaseOrderTypeList}" varStatus="status">
                                                                                        <option value="${potype.type}">${potype.type}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendorcodeHeader">Vendor Name/Code</label> <a href="#" data-toggle="tooltip" data-placement="auto" title="Press enter key to open vendor master"><i class="fa fa-info-circle" aria-hidden="true"></i></a>
                                                                                <input type="text" class="form-control form-rounded" id="vendorcodeHeader" name="vendorcodeHeader" placeholder="Press enter key to open vendor master">
                                                                                <!--<select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="vendorcodeHeader" name="vendorcodeHeader" data-parsley-trigger="change" data-parsley-length="[4,4]" required></select>-->
                                                                            </div>
                                                                        </div>
                                                                        <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-12">-->
                                                                        <div style="width: 100px; margin-top: 24px;">
                                                                            <div class="form-group">
                                                                                <label class="custom-control custom-checkbox inline">
                                                                                    <input type="checkbox" name="isAckReq" id="isAckReq" class="custom-control-input"><span class="custom-control-label" title="Is Acknowledgement Required ?">Is Ack Req</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <!--</div>-->
                                                                        <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">-->
                                                                        <div style="width: 90px;">    
                                                                            <div class="form-group">
                                                                                <label for="">Doc. Date:</label>
                                                                                <input type="text" class="form-control form-rounded" id="docDateHeader" name="docDateHeader" readonly="true" value="<fmt:formatDate pattern="dd-MM-yyyy" value="<%=new java.util.Date()%>"></fmt:formatDate>">
                                                                                    <!--                                                                                <div class="input-group date" id="docDateHeader_div" data-target-input="nearest">
                                                                                                                                                                        <input type="text" class="form-control datetimepicker-input" id="docDateHeader" name="docDateHeader" data-target="#docDateHeader_div" readonly/>
                                                                                                                                                                        <div class="input-group-append" data-target="#docDateHeader_div" data-toggle="datetimepicker">
                                                                                                                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>-->

                                                                                </div>
                                                                            </div>
                                                                        <c:if test="${type != 'edit'}">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <label for="poNumber">Purchase Order Number:</label>
                                                                                <input type="text" title="Enter SAP PO Number to fetch details" placeholder="Reference SAP PO" class="form-control form-rounded" id="poNumber" name="poNumber">
                                                                            </div>
                                                                        </c:if>

                                                                    </div>
                                                                    <div class="row">
                                                                        <c:if test="${Operation != 'edit'}">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="prType">PO Type<span style="color:red;">*</span>:</label>
                                                                                    <select class="custom-select dropdown-height" id="prType" name="prType">
                                                                                        <c:if test="${type != 'edit'}">
                                                                                            <option value="">Select</option>
                                                                                        </c:if>
                                                                                        <c:if test="${type == 'edit'}">
                                                                                            <option value= ${NGBPExtPOCreation.purchaseRequestType}>${NGBPExtPOCreation.purchaseRequestType}</option>
                                                                                        </c:if>
                                                                                        <option>Service</option>
                                                                                        <option>Material</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </c:if>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="display: none;">
                                                                            <label for="requestType">Request Type:</label>
                                                                            <input type="text" class="form-control form-rounded" id="requestType" name="requestType" value="${Operation == 'edit' ? 'Amend Purchase Order' : 'Create Purchase Order'}" readonly="true">
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="display: none;">
                                                                            <label for="referenceDocType">Reference Doc Type:</label>
                                                                            <select class="custom-select dropdown-height" id="referenceDocType" name="referenceDocType">
                                                                                <c:if test="${type != 'edit'}">
                                                                                    <option value="">Select</option>
                                                                                </c:if>
                                                                                <c:if test="${type == 'edit'}">
                                                                                    <option value= ${NGBPExtPOCreation.referenceDocumentType}>${NGBPExtPOCreation.referenceDocumentType}</option>
                                                                                </c:if>
                                                                                <option>N/A</option>
                                                                                <option>Outline Argument</option>
                                                                                <option>RFQ</option>
                                                                                <option>Purchase Requisition</option>
                                                                                <option>purchase Order</option>
                                                                            </select>
                                                                        </div>
                                                                        <c:if test="${Operation != 'edit'}">                                                                            
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-primary btn-sm inline" id="uploadDocumentBtn">Upload Documents</button>
                                                                                </div>
                                                                            </div>
                                                                        </c:if>   

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="card box">
                                                    <div class="rightCircle" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                                    <div class="tab-regular collapseDiv collapseDivHeader">
                                                        <ul class="nav nav-tabs nav-fill" id="myTab7 headerUl" role="tablist">
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
                                                            <!--                                                                                                                        <li class="nav-item">
                                                                                                                                                                                        <a class="nav-link" id="partners" data-toggle="tab" href="#partner-tab" role="tab" aria-controls="Partner" aria-selected="false">Partners</a>
                                                                                                                                                                                    </li>-->

                                                            <li class="nav-item">
                                                                <a class="nav-link" id="additionaldata" data-toggle="tab" href="#additionaldata-tab" role="tab" aria-controls="AdditionData" aria-selected="false">Additional Data</a>
                                                            </li>

                                                            <li class="nav-item">
                                                                <a class="nav-link" id="headerText_linelevel" data-toggle="tab" href="#headerText_linelevel-tab" role="tab" aria-controls="headerText_linelevel" aria-selected="false">Header Text</a>
                                                            </li>

                                                            <!--                                                                                                                    <li class="nav-item">
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
                                                            <li class="nav-item" id="statusTab_li">
                                                                <a class="nav-link" id="statusTab" data-toggle="tab" href="#status-tab" role="tab" aria-controls="statusTab" aria-selected="false">Status</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="approverDetails" data-toggle="tab" href="#approverDetails-tab" role="tab" aria-controls="ApproverDetails" aria-selected="false">Approver Details</a>
                                                            </li>
                                                        </ul>
                                                        <div class="tab-content update-backgroud-color" id="headerTab">
                                                            <div class="tab-pane fade show" id="headerText_linelevel-tab" role="tabpanel" aria-labelledby="headerText_linelevel-tab">
                                                                <div class="card-body">
                                                                    <div class="row"> 
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="headerTextOptionDiv">
                                                                                <select class="custom-select" id="headerTextTabOption" name="headerTextTabOption" style="margin-top: 20px;">
                                                                                    <option value="headerText">Header Text</option>
                                                                                    <option value="headerNotes">Header Note</option>
                                                                                    <option value="pricingTypes">Pricing Types</option>
                                                                                    <option value="deadlines">Deadlines</option>
                                                                                    <option value="termsOfDelivery">Terms of Delivery</option>
                                                                                    <option value="termsOfPayment">Terms of Payment</option>
                                                                                    <option value="shippingInstruction">Shipping Instruction</option>
                                                                                    <option value="vendorMemoGeneral">Vendor Memo (General)</option>
                                                                                    <option value="vendorMemoSpecial">Vendor Memo (Special)</option>
                                                                                    <option value="pONoteToApprover">PO Note to Approver</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                                                            <div class="row">
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="headerTextDiv">
                                                                                    <div class="form-group">
                                                                                        <label for="headerTextHeader" class="">Header Text:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="headerTextHeader" name="headerTextHeader" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="HeaderNoteDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="HeaderNote" class="">Header Note:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="HeaderNote" name="HeaderNote" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;" readonly="true">${NGBPExtPOCreation.headerText.headerNote}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="PricingTypesdiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="PricingTypes" class="">Pricing Types:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="PricingTypes" name="PricingTypes" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;">${NGBPExtPOCreation.headerText.pricingTypes}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="DeadlinesDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="Deadlines" class="">Deadlines:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="Deadlines" name="Deadlines" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;">${NGBPExtPOCreation.headerText.deadlines}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">                                                                                                                                                
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="TermsofDeliveryDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="TermsofDelivery" class="">Terms of Delivery:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="TermsofDelivery" name="TermsofDelivery" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;">${NGBPExtPOCreation.headerText.termsOfDelivery}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="TermsofPaymentDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="TermsofPayment" class="">Terms of Payment:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="TermsofPayment" name="TermsofPayment" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;">${NGBPExtPOCreation.headerText.termsOfPayment}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="ShippingInstructionsDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="ShippingInstructions" class="">Shipping Instructions:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="ShippingInstructions" name="ShippingInstructions" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;">${NGBPExtPOCreation.headerText.shippingInstructions}</textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="VendorMemoGeneralDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="VendorMemoGeneral" class="">Vendor Memo (General):</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="VendorMemoGeneral" name="VendorMemoGeneral" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;">${NGBPExtPOCreation.headerText.vendorMemoGeneral}</textarea>
                                                                                    </div>
                                                                                </div>                                                                        
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="VendorMemoSpecialDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="VendorMemoSpecial" class="">Vendor Memo (Special):</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="VendorMemoSpecial" name="VendorMemoSpecial" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;">${NGBPExtPOCreation.headerText.vendorMemoSpecial}</textarea>
                                                                                    </div>
                                                                                </div>                                                                        
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="poNotesToApproverDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="pONotetoApproverHeaderTextsLimits" class="">PO Note to Approver:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="pONotetoApproverHeaderTextsLimits" name="pONotetoApproverHeaderTextsLimits" data-parsley-trigger="change" data-parsley-maxlength="5000" required="true" style="height:250px;">${NGBPExtPOCreation.headerText.PONoteToApprover}</textarea>
                                                                                    </div>
                                                                                </div>    
                                                                            </div>        
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show active" id="deliveryInvoice-tab" role="tabpanel" aria-labelledby="deliveryInvoice-tab">
                                                                <div class="card-body">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="paymentTermsDelivery" class="inline">Payment Terms<span style="color:red;">*</span>:</label>
                                                                                    <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height payment-term-custom-select inline" id="paymentTermsDelivery" name="paymentTermsDelivery" style="width:240px;" data-parsley-trigger="change" data-parsley-length="[4,4]">
                                                                                        <c:if test="${type != 'edit'}">
                                                                                            <option value="">Select</option>
                                                                                        </c:if>
                                                                                        <c:if test="${type == 'edit'}">
                                                                                            <option value= ${NGBPExtPOCreation.deliveryInvoice.paymentTerms}>${NGBPExtPOCreation.deliveryInvoice.paymentTerms}</option>
                                                                                        </c:if>

                                                                                    </select>
                                                                                    <label for="" class="inline"></label>
                                                                                    <label for="currencyDeliveryInvoice" class="inline" style="margin-left: 250px;">Currency:</label>

                                                                                    <c:choose>
                                                                                        <c:when test="${type == 'edit'}">
                                                                                            <input type="text" class="form-control form-rounded inline" value= "${NGBPExtPOCreation.deliveryInvoice.currency}" id="CurrencyDeliveryInvoice" name="CurrencyDeliveryInvoice" style="width: 100px;margin-left: 42px;" required>
                                                                                        </c:when>
                                                                                        <c:when test="${type == 'new'}">
                                                                                            <input type="text" class="form-control form-rounded inline" value= "${perSettingsObj.currency}" id="CurrencyDeliveryInvoice" name="CurrencyDeliveryInvoice" style="width: 100px;margin-left: 42px;" required>
                                                                                        </c:when>
                                                                                        <c:otherwise>
                                                                                            <input type="text" class="form-control form-rounded" id="purchasingOrg" value="${perSettingsObj.purOrg}" name="purchasingOrg" data-parsley-trigger="change" data-parsley-maxlength="4"> 
                                                                                        </c:otherwise>
                                                                                    </c:choose>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="paymentDays1" class="inline">Payment in:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" value="${NGBPExtPOCreation.deliveryInvoice.paymentindays1}" id="paymentDays1" name="paymentDays1" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                    <label for="PaymentTerms" class="inline">days</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="paymentPer1" value="${NGBPExtPOCreation.deliveryInvoice.paymentinpercnt1}" name="paymentPer1" style="width: 100px;" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                    <label for="PaymentTerms" class="inline">%</label>
                                                                                    <label for="ExchangeRate" class="inline" style="margin-left: 240px;">Exchange Rate<span style="color:red;">*</span>:</label>
                                                                                    <c:if test="${type == 'edit'}">
                                                                                        <input type="number" class="form-control form-rounded inline" value="${NGBPExtPOCreation.deliveryInvoice.exchangeRate}" id="ExchangeRate" name="ExchangeRate" style="width: 100px;margin-left: 10px;" data-parsley-trigger="change" data-parsley-maxlength="9" required="true">
                                                                                    </c:if>
                                                                                    <c:if test="${type != 'edit'}">
                                                                                        <input type="number" class="form-control form-rounded inline" value="1.00000" id="ExchangeRate" name="ExchangeRate" style="width: 100px;margin-left: 10px;" data-parsley-trigger="change" data-parsley-maxlength="9" required="true">
                                                                                    </c:if>

                                                                                    <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                        <input type="checkbox" style="padding-bottom :-50px;" name="ExchangeReateFixed" id="ExchangeReateFixed" class="custom-control-input"><span class="custom-control-label" required="">Exchange Rate Fixed</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="downPaymentReqd">Downpayment Reqd<span style="color:red;">*</span>:</label>
                                                                                    <select class="custom-select dropdown-height inline" id="downPaymentReqd" style="width: 100px;margin-left: 106px;" name="downPaymentReqd" data-parsley-trigger="change" required="true">
                                                                                        <c:if test="${type != 'edit'}">
                                                                                            <option value="">Select</option>
                                                                                        </c:if>
                                                                                        <c:if test="${type == 'edit'}">
                                                                                            <option value= ${NGBPExtPOCreation.downpaymentReqd}>${NGBPExtPOCreation.downpaymentReqd}</option>
                                                                                        </c:if>
                                                                                        <option>Yes</option>
                                                                                        <option>No</option>
                                                                                    </select>
                                                                                    <label for="downPaymentReqdValue" class="inline" style="margin-left:260px;">Value<span style="color:red;">*</span>:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" style="width: 100px;margin-left: 60px;" id="downPaymentReqdValue" <c:if test="${NGBPExtPOCreation.valu == '0.00'}">value=""</c:if> <c:if test="${NGBPExtPOCreation.valu != ''}">value="${NGBPExtPOCreation.valu}"</c:if>  name="downPaymentReqdValue" data-parsley-trigger="change" data-parsley-maxlength="11" disabled="true">
                                                                                        <label for="downPaymentFor" class="inline" style="margin-left: 40px;">Downpayment For:</label>
                                                                                        <select class="custom-select dropdown-height inline" id="downPaymentFor" style="width: 100px;margin-left: 10px;" name="downPaymentFor" disabled="true">
                                                                                            <option value="">Select</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="form-group two">
                                                                                        <label for="paymentDays2" class="inline">Payment in:</label>
                                                                                            <input type="text" class="form-control form-rounded inline" id="paymentDays2" name="paymentDays2" value="${NGBPExtPOCreation.deliveryInvoice.paymentindays2}" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                    <label for="PaymentTerms" class="inline">days</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="paymentPer2" name="paymentPer2" value="${NGBPExtPOCreation.deliveryInvoice.paymentinpercnt2}" style="width: 100px;" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                    <label for="PaymentTerms" class="inline">%</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="PaymentTerms" class="inline">Payment in:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="paymentDaysNet" name="paymentDaysNet" value="${NGBPExtPOCreation.deliveryInvoice.paymentindaysnet}" style="width: 100px;margin-left: 25px;" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                    <label for="PaymentTerms" class="inline">days net</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group two">
                                                                                    <label for="Incoterms" class="inline">Incoterms:</label>

                                                                                    <c:choose>
                                                                                        <c:when test="${type == 'edit'}">
                                                                                            <input type="text" class="form-control form-rounded inline" id="IncoTermsPart1" name="IncoTermsPart1" value="${NGBPExtPOCreation.deliveryInvoice.incoterms1}" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                            <input type="text" class="form-control form-rounded inline" id="IncoTermsPart2" name="IncoTermsPart2" value="${NGBPExtPOCreation.deliveryInvoice.incoterms2}" style="width: 300px;" data-parsley-trigger="change" data-parsley-maxlength="28" required="true">
                                                                                        </c:when>
                                                                                        <c:otherwise>
                                                                                            <input type="text" class="form-control form-rounded inline" id="IncoTermsPart1" name="IncoTermsPart1" value="${perSettingsObj.incoTerms1}" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                            <input type="text" class="form-control form-rounded inline" id="IncoTermsPart2" name="IncoTermsPart2" value="${perSettingsObj.incoTerms2}" style="width: 300px;" data-parsley-trigger="change" data-parsley-maxlength="28" required="true">
                                                                                        </c:otherwise>
                                                                                    </c:choose>
                                                                                    <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                        <input type="checkbox" style="padding-bottom :-50px;" name="GRMessage" id="GRMessage" class="custom-control-input"><span class="custom-control-label" required="">GR Message</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!--                                                                        <div class="row">
                                                                                                                                                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                                                                                        <div class="form-group">
                                                                                                                                                            <label for="downPaymentFor">Downpayment For:</label>
                                                                                                                                                            <select class="custom-select dropdown-height" id="downPaymentFor" name="downPaymentFor" disabled="true">
                                                                                                                                                                <option value="">Select</option>
                                                                                                                                                            </select>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>-->
                                                                    </div>
                                                                    <!--</table>-->
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show" id="conditions-tab" role="tabpanel" aria-labelledby="conditions-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <!--<a><i type="button" class="fas fa-save btn-primary btn-sm" id="saveHeaderConditionBtn" style="margin-left: 20px"></i></a>-->
                                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowConditionsBtnId" style="margin-left: 20px"></i></a>
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
                                                                                                <th class="border-0">Currency</th>
                                                                                                <th class="border-0">Per</th>
                                                                                                <th class="border-0">Condition Pricing Unit</th>
                                                                                                <th class="border-0">UOM</th>
                                                                                                <th class="border-0">Condition Value</th>
                                                                                                <th class="border-0">Currency</th>
                                                                                                <th class="border-0">Condition Value</th>
                                                                                                <th class="border-0">Condition Currency</th>
                                                                                                <!--<th class="border-0">Condition Details</th>-->
                                                                                                <!--                                                                                                <th class="border-1 th-color">Status</th>
                                                                                                                                                                                                <th class="border-1 th-color">Numerator</th>
                                                                                                                                                                                                <th class="border-1 th-color">Base UOM</th>
                                                                                                                                                                                                <th class="border-1 th-color">Deno. for Conv</th>
                                                                                                                                                                                                <th class="border-1 th-color">UOM - Extra</th>-->
                                                                                                <th class="border-0"></th>
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
                                                            <div class="tab-pane fade show" id="vendorAddress-tab" role="tabpanel" aria-labelledby="vendorAddress-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="streetVendorAddress" class="">Street<span style="color:red;">*</span>:</label>
                                                                                <input type="text" class="form-control form-rounded" id="streetVendorAddress" name="streetVendorAddress" value="${NGBPExtPOCreation.vendorAddress.street}" data-parsley-trigger="change" data-parsley-maxlength="250" required="true">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="houseNumberVendorAddress" class="">House Number<span style="color:red;">*</span>:</label>
                                                                                <input type="text" class="form-control form-rounded" id="houseNumberVendorAddress" name="houseNumberVendorAddress" value="${NGBPExtPOCreation.vendorAddress.houseNumber}" data-parsley-trigger="change" data-parsley-maxlength="250" required="true">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="postalCodeVendorAddress" class="">Postal Code:</label>
                                                                                <input type="text" class="form-control form-rounded" id="postalCodeVendorAddress" name="postalCodeVendorAddress" value="${NGBPExtPOCreation.vendorAddress.postalCode}" data-parsley-pattern="^[0-9]*$" data-parsley-trigger="change" data-parsley-maxlength="10">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="cityVendorAddress" class="">City:</label>
                                                                                <input type="text" class="form-control form-rounded" id="cityVendorAddress" name="cityVendorAddress" value="${NGBPExtPOCreation.vendorAddress.city}" data-parsley-trigger="change" data-parsley-maxlength="40">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="extTel" class="">Extension Tel:</label>
                                                                                <input type="text" class="form-control form-rounded" id="extTel" value="${NGBPExtPOCreation.vendorAddress.telExt}" name="extTel" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="telephoneVendorAddress" class="">Telephone:</label>
                                                                                <input type="text" class="form-control form-rounded" id="telephoneVendorAddress" name="telephoneVendorAddress" value="${NGBPExtPOCreation.vendorAddress.telNo}" data-parsley-type="digits" data-parsley-trigger="change" data-parsley-maxlength="30">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="extFax" class="">Extension Fax:</label>
                                                                                <input type="text" class="form-control form-rounded" id="extFax" name="extFax" value="${NGBPExtPOCreation.vendorAddress.faxExt}" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="faxVendorAddress" class="">Fax:</label>
                                                                                <input type="text" class="form-control form-rounded" id="faxVendorAddress" name="faxVendorAddress" value="${NGBPExtPOCreation.vendorAddress.faxNo}" data-parsley-trigger="change" data-parsley-maxlength="30">
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
                                                                                <input type="text" class="form-control form-rounded" id="countryVendorAddress" name="countryVendorAddress" value="${NGBPExtPOCreation.vendorAddress.country}" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendorEmail" class="">Vendor Email:</label>
                                                                                <input type="text" class="form-control form-rounded" id="vendorEmail" name="vendorEmail" value="${NGBPExtPOCreation.vendorAddress.mailId}" data-parsley-trigger="change">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show" id="communication-tab" role="tabpanel" aria-labelledby="communication-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Salesperson" class="">Salesperson<span style="color:red;">*</span>:</label>
                                                                                <input type="text" class="form-control form-rounded" id="Salesperson" name="Salesperson" value="${NGBPExtPOCreation.deliveryComm.salesPerson}" data-parsley-trigger="change" data-parsley-maxlength="30" required="true">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="YourReference" class="">Your Reference:</label>
                                                                                <input type="text" class="form-control form-rounded" id="YourReference" name="YourReference" value="${NGBPExtPOCreation.deliveryComm.yourReference}" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Telephone" class="">Telephone:</label>
                                                                                <input type="text" class="form-control form-rounded" id="Telephone" value="${NGBPExtPOCreation.deliveryComm.telephone}" name="Telephone" data-parsley-type="digits" data-parsley-trigger="change" data-parsley-maxlength="16">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="OurReference" class="">Our Reference:</label>

                                                                                <c:choose>
                                                                                    <c:when test="${type == 'edit'}">
                                                                                        <input type="text" class="form-control form-rounded" id="OurReference" name="OurReference" value="${NGBPExtPOCreation.deliveryComm.ourReference}" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                                    </c:when>
                                                                                    <c:otherwise>
                                                                                        <input type="text" class="form-control form-rounded" id="OurReference" name="OurReference" value="${perSettingsObj.ourRef}" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                                    </c:otherwise>
                                                                                </c:choose>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Language" class="">Language:</label>
                                                                                <c:if test="${type != 'edit'}">
                                                                                    <input type="text" class="form-control form-rounded" value="EN" id="Language" name="Language" readonly="true">
                                                                                </c:if>
                                                                                <c:if test="${type == 'edit'}">
                                                                                    <input type="text" class="form-control form-rounded" value="${NGBPExtPOCreation.deliveryComm.lang}" id="Language" name="Language" readonly="true">
                                                                                </c:if>
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
                                                                        <!--<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="CollectiveNumber" class="">Collective Number:</label>
                                                                                <input type="text" class="form-control form-rounded" id="CollectiveNumber" name="CollectiveNumber" value="${NGBPExtPOCreation.collectiveNumber}" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group" style="display:none;" id="validityFromHeaderDiv">
                                                                                <label for="">Validity From:</label>
                                                                                <div class="input-group date" id="validityFromHeader_div" data-target-input="nearest">
                                                                                    <input type="text" class="form-control datetimepicker-input" id="validityFromHeader" name="validityFromHeader" data-target="#validityFromHeader_div"/>
                                                                                    <div class="input-group-append" data-target="#validityFromHeader_div" data-toggle="datetimepicker">
                                                                                        <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group" style="display:none;" id="validityToHeaderDiv">
                                                                                <label for="">Validity To:</label>
                                                                                <div class="input-group date" id="validityToHeader_div" data-target-input="nearest">
                                                                                    <input type="text" class="form-control datetimepicker-input" id="validityToHeader" name="validityToHeader" data-target="#validityToHeader_div"/>
                                                                                    <div class="input-group-append" data-target="#validityToHeader_div" data-toggle="datetimepicker">
                                                                                        <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!--</div>-->
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show" id="org_data-tab" role="tabpanel" aria-labelledby="org_data-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="purchasingOrg" class="">Purchasing Organization<span style="color:red;">*</span>:</label>
                                                                                <c:choose>
                                                                                    <c:when test="${type == 'edit'}">
                                                                                        <input type="text" class="form-control form-rounded" id="purchasingOrg" value="${NGBPExtPOCreation.purchasingOrg}" name="purchasingOrg" data-parsley-trigger="change" data-parsley-maxlength="4">
                                                                                    </c:when>
                                                                                    <c:otherwise>
                                                                                        <input type="text" class="form-control form-rounded" id="purchasingOrg" value="${perSettingsObj.purOrg}" name="purchasingOrg" data-parsley-trigger="change" data-parsley-maxlength="4"> 
                                                                                    </c:otherwise>
                                                                                </c:choose>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="purchasingGroup" class="">Purchasing Group<span style="color:red;">*</span>:</label>
                                                                                <select class="custom-select" id="purchasingGroup" name="purchasingGroup" data-parsley-trigger="change" required="true">
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
                                                                                <input type="text" class="form-control form-rounded" id="ProductOrigin" name="ProductOrigin" data-parsley-trigger="change" data-parsley-maxlength="15">
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
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <!--                                                                                <label for="InstructionToWeigher" class="">Instruction to Weigher:</label>
                                                                                                                                                                <input type="text" class="form-control form-rounded" id="InstructionToWeigher" name="InstructionToWeigher" data-parsley-trigger="change" data-parsley-maxlength="35">-->
                                                                                <div class="form-group">
                                                                                    <label for="InstructionToWeigher" class="">Instruction to Weigher:</label>
                                                                                    <textarea class="form-control form-rounded" rows="5" id="InstructionToWeigher" name="InstructionToWeigher" data-parsley-trigger="change" data-parsley-maxlength="5000" required="true"></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!--</div>-->
                                                            </div>
                                                            <div class="tab-pane fade show" id="approverDetails-tab" role="tabpanel" aria-labelledby="approverDetails-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="form-group" style="margin-bottom:10px;">
                                                                                        <label for="ordered" class="">Release Group: </label>
                                                                                        <input type="text" value="PO" class="form-control form-rounded inline" id="releaseGroup" name="releaseGroup" readonly="true" style="width:80px;margin-left:65px;">
                                                                                        <label>PO Release Strategy</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="form-group" style="margin-bottom:10px;">
                                                                                        <label for="ordered" class="">Release Strategy: </label>
                                                                                        <input type="text" class="form-control form-rounded inline" id="releaseStrategy" name="releaseStrategy" readonly="true" style="width:80px;margin-left:53px;">
                                                                                        <label id="releaseStrategyDesc"></label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="form-group" style="margin-bottom:10px;">
                                                                                        <label for="ordered" class="">Release Indicator: </label>
                                                                                        <input type="text" value="X" class="form-control form-rounded inline" id="releaseIndicator" name="releaseIndicator" readonly="true" style="width:80px;margin-left:50px;">
                                                                                        <label>Blocked</label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="table-responsive">
                                                                                <table class="table table-bordered" id="approvalDetailsTable">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th>Level</th>
                                                                                            <th>Name</th>
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
                                                            <div class="tab-pane fade show" id="status-tab" role="tabpanel" aria-labelledby="status-tab">
                                                                <!--<h8>Status</h8>-->
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group" style="margin-bottom:10px;">
                                                                                <label for="ordered" class="">Ordered: </label>
                                                                                <input type="text" class="form-control form-rounded inline" id="ordered" name="ordered" readonly="true" style="width:150px;margin-left:90px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="orderedUnit" name="orderedUnit" readonly="true" style="width:60px">
                                                                                <input type="text" class="form-control form-rounded inline" id="orderedTotalPrice" name="orderedTotalPrice" readonly="true" style="width:150px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="orderedCurrency" name="orderedCurrency" readonly="true" style="width:60px">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group" style="margin-bottom:10px;">
                                                                                <label for="delivered" class="">Delivered: </label>
                                                                                <input type="text" class="form-control form-rounded inline" id="delivered" name="delivered" readonly="true" style="width:150px;margin-left:82px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="deliveredUnit" name="deliveredUnit" readonly="true" style="width:60px">
                                                                                <input type="text" class="form-control form-rounded inline" id="deliveredTotalPrice" name="deliveredTotalPrice" readonly="true" style="width:150px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="deliveredCurrency" name="deliveredCurrency" readonly="true" style="width:60px">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group" style="margin-bottom:10px;">
                                                                                <label for="stillToDeliv" class="">Still to deliv: </label>
                                                                                <input type="text" class="form-control form-rounded inline" id="stillToDeliv" name="stillToDeliv" readonly="true" style="width:150px;margin-left:72px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="stillToDelivUnit" name="stillToDelivUnit" readonly="true" style="width:60px">
                                                                                <input type="text" class="form-control form-rounded inline" id="stillToDelivTotalPrice" name="stillToDelivTotalPrice" readonly="true" style="width:150px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="stillToDelivCurrency" name="stillToDelivCurrency" readonly="true" style="width:60px">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group" style="margin-bottom:10px;">
                                                                                <label for="invoiced" class="">Invoiced: </label>
                                                                                <input type="text" class="form-control form-rounded inline" id="invoiced" name="invoiced" readonly="true" style="width:150px;margin-left:89px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="invoicedUnit" name="invoicedUnit" readonly="true" style="width:60px">
                                                                                <input type="text" class="form-control form-rounded inline" id="invoicedTotalPrice" name="invoicedTotalPrice" readonly="true" style="width:150px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="invoicedCurrency" name="invoicedCurrency" readonly="true" style="width:60px">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group" style="margin-bottom:10px;">
                                                                                <label for="downpayments" class="">Down payments: </label>
                                                                                <input type="text" class="form-control form-rounded inline" id="downpayments" name="downpayments" readonly="true" style="width:150px;margin-left:44px;">
                                                                                <input type="text" class="form-control form-rounded inline" id="downpaymentsUnit" name="downpaymentsUnit" readonly="true" style="width:60px;">
                                                                                <input type="text" class="form-control form-rounded inline" id="downpaymentsTotalPrice" name="downpaymentsTotalPrice" readonly="true" style="width:150px;text-align:right;">
                                                                                <input type="text" class="form-control form-rounded inline" id="downpaymentsCurrency" name="downpaymentsCurrency" readonly="true" style="width:60px">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br>
                                                <br>
                                                <div class="card">
                                                    <div class="rightCircle3" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                                    <div class="row collapseDiv3">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="card-body update-backgroud-color">
                                                                <c:if test="${Operation != 'edit'}">
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <button type="button" class="btn btn-primary btn-sm" id="addPrLineBtn">Add PO Line</button>
                                                                        </div>
                                                                    </div>
                                                                </c:if>
                                                                <br>
                                                                <div class="table-responsive" style="height: 260px;">
                                                                    <table class="table table-bordered material_table-header-color" id="material_headerClass">
                                                                        <thead class="">
                                                                            <tr class="border-0">
                                                                                <th class="border-0"></th>
                                                                                <th class="border-0">Itm</th>
                                                                                <th class="border-0">AA</th>
                                                                                <th class="border-0">I. Catg</th>
                                                                                <th class="border-0">Material</th>
                                                                                <th class="border-0">Criticality</th>
                                                                                <th class="border-0">Short Text</th>
                                                                                <th class="border-0">Long Text</th>
                                                                                <th class="border-0">PO Qty</th>
                                                                                <th class="border-0">Net Price</th>
                                                                                <th class="border-0">Per</th>
                                                                                <th class="border-0">Currency</th>
                                                                                <th class="border-0">OPU</th>
                                                                                <th class="border-0">Catg</th>
                                                                                <th class="border-0">Req. Date</th>
                                                                                <th class="border-0">Deliv. Date</th>
                                                                                <th class="border-0">Plnt</th>
                                                                                <th class="border-0">Matl. Group</th>
                                                                                <th class="border-0">Pur. Org</th>
                                                                                <th class="border-0">Pur. Grp</th>
                                                                                <th class="border-0">Stor. Location</th>
                                                                                <th class="border-0">Batch</th>
                                                                                <th class="border-0">Info Record</th>
                                                                                <th class="border-0">Requisitioner</th>
                                                                                <th class="border-0">PR Creator</th>
                                                                                <th class="border-0">PR Dept</th>
                                                                                <th class="border-0" style="display: none;">PO Dept Name</th>
                                                                                <th class="border-0">Higher Level Item</th>
                                                                                <th class="border-0">Sub Item Category</th>
                                                                                <th class="border-0">Track. No</th>
                                                                                <th class="border-0">Company Code</th>
                                                                                <th class="border-0">UOM</th>
                                                                                <th class="border-0">IM Material</th>        
                                                                                <th class="border-0">Returns Item</th>      
                                                                                <th class="border-0">FOC</th>     
                                                                                <th class="border-0">RFQ</th>                
                                                                                <th class="border-0">RFQ Itm</th>           
                                                                                <!--                                                                                <th class="border-0">MFR Part Number</th>    
                                                                                                                                                                <th class="border-0">Manufacturer</th>       -->
                                                                                <th style="display: none;"></th>            <!--Added by nikhil at 01:46PM 15-01-2020 -->
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody class="update-backgroud-color">
                                                                            <c:if test="${type == 'edit'}">
                                                                                <c:forEach var="POCreationLineItem" items="${POCreationLineItem}" varStatus="status">
                                                                                    <tr>
                                                                                        <td><input type=hidden class=PODistribution value="${POCreationLineItem.distribution}">
                                                                                            <input type=hidden class=POPartialInvoiceIndicator value="${POCreationLineItem.partialInvoiceIndicator}">
                                                                                            <input type=hidden class=prTaxCode value="${POCreationLineItem.taxCode}"><i class='fa fa-window-close delete-pr-line' aria-hidden='true'></i>
                                                                                            <input type='hidden' class='linkid' value="${POCreationLineItem.linkId}">
                                                                                            <input type='hidden' class='prNumber' value=''>
                                                                                            <input type='hidden' class='prgLCode' value="${POCreationLineItem.gLCode}">
                                                                                            <input type='hidden' class='przGLCode' value="${POCreationLineItem.zGLCode}">
                                                                                            <input type='hidden' class='isItemNoPresent' value="Yes">
                                                                                            <input type="hidden" class="isPrSaved" value="Yes">
                                                                                            <input type="hidden" class="ConfirmationControlForLineInPr">
                                                                                            <input type="hidden" class="TexCodeForLineInPr">
                                                                                            <input type="hidden" class="SegmentForLineInPr">
                                                                                            <input type='hidden' class='isLineLevelDataSavedSaved' value='${POCreationLineItem.isLineLevelDataSaved}'>
                                                                                            <input type='hidden' class='prMfrPartNumber'>
                                                                                            <input type='hidden' class='prManufacturer'>
                                                                                            <input type='hidden' class='prReturnsItemHidden' value='${POCreationLineItem.returnsItem}'>
                                                                                            <input type='hidden' class='prFreeOfChargeHidden' value='${POCreationLineItem.freeOfCharge}'>
                                                                                            <input type="hidden" class="prNetPriceHidden" value="${POCreationLineItem.prNetPrice}">
                                                                                        </td>
                                                                                        <td>${POCreationLineItem.itemNumber}</td>
                                                                                        <td><input type='text' value='${POCreationLineItem.accountAssignment}' class='accountAssignmentClass form-control form-rounded' style='width:50px;'></td>
                                                                                        <td><input type='text' value='${POCreationLineItem.itemCategory}' class='itemCategoryClass form-control form-rounded' style='width:50px;'></td>
                                                                                        <td><input type='text' value='${POCreationLineItem.materialCode}' class='materialCodeClass form-control form-rounded' style='width:200px;'></td>
                                                                                        <td><select style='width:150px;' class='custom-select poCriticality' disabled><c:if test="${POCreationLineItem.criticality != ''}"><option>${POCreationLineItem.criticality}</option></c:if><option value=''>Select</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>
                                                                                        <td><input type=text class='form-control form-rounded prShortText' style='width:400px;' value='${POCreationLineItem.shortText}'></td>
                                                                                        <td>${POCreationLineItem.materialLongText}</td>
                                                                                        <td><input style='width:100px;' type='number' value='<fmt:formatNumber type="number" maxFractionDigits="0" value='${POCreationLineItem.quantity}' />' min='0' class='form-control form-rounded quantity_Class check-negative-value'></td>
                                                                                        <td><input style='width:100px;' type=number min='0' <c:if test='${POCreationLineItem.netPrice == "0.00"}'>value=""</c:if><c:if test='${POCreationLineItem.netPrice != ""}'>value='<fmt:formatNumber type="number" maxFractionDigits="0" value='${POCreationLineItem.netPrice}' />'</c:if> class='form-control form-rounded prNetPrice check-negative-value'></td>
                                                                                        <td><input style='width:100px;' type=number min='0' <c:if test='${POCreationLineItem.quantityUnit == "0.00"}'>value=""</c:if><c:if test='${POCreationLineItem.quantityUnit != ""}'>value='<fmt:formatNumber type="number" maxFractionDigits="0" value='${POCreationLineItem.quantityUnit}' />'</c:if> class='form-control form-rounded prPerUnit check-negative-value'></td>
                                                                                        <td><input type='text' class='currencyClass form-control form-rounded' value='${POCreationLineItem.currency}' style='width:70px;'></td>
                                                                                        <td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:80px;' value="${POCreationLineItem.prOrderPriceUnit}"></td>
                                                                                        <td><input type=text class='form-control form-rounded pODeliveryDateCetegory' value="${POCreationLineItem.deliveryDateCategory}" style='width:50px;'></td>
                                                                                        <td><input type='date' value = "<fmt:formatDate value="${POCreationLineItem.requisitionDate}" pattern="yyyy-MM-dd" />" class='requisitionDateClass form-control form-rounded' min=''></td>
                                                                                        <td><input type='date' class='deliveryDateClass form-control form-rounded' min=''  value = "<fmt:formatDate value="${POCreationLineItem.deliveryDate}" pattern="yyyy-MM-dd" />"></td>
                                                                                        <td><input type='text'  style='width:80px;' value='${POCreationLineItem.plant}' class='plantClass form-control form-rounded'></td>
                                                                                        <td><input type='text' value='${POCreationLineItem.materialGroup}' class='matlGroup form-control form-rounded' style='width:200px;'></td>
                                                                                        <td><input type='text' value='${POCreationLineItem.purchasingOrganization}' class='purchaseOrgClass form-control form-rounded' style='width:80px;'></td>
                                                                                        <td><input type='text' value='${POCreationLineItem.purchasingGroup}' class='purchaseGroupClass form-control form-rounded' style='width:200px;'></td>
                                                                                        <td><input type='text' value='${POCreationLineItem.storageLocation}' class='storageLocationClass form-control form-rounded' style='width:200px;'></td>
                                                                                        <td>${POCreationLineItem.batch}</td>
                                                                                        <td>${POCreationLineItem.infoRecord}</td>
                                                                                        <td>${POCreationLineItem.requisitionerID}</td>
                                                                                        <td></td>
                                                                                        <td><input type='text' value='' class='prDeptNameClass form-control form-rounded' style='width:250px;'></td>
                                                                                        <td style="display:none;"><input type='text' value='' class='poDeptNameClass form-control form-rounded'></td>
                                                                                        <td>${POCreationLineItem.higherLevelItem}</td>
                                                                                        <td>${POCreationLineItem.subitemCategory}</td>
                                                                                        <td><input type='text' value='${POCreationLineItem.trackingNumber}' class='trackingNumber form-control form-rounded' style='width:80px;'></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td><input type="text" class="prImMaterial form-control form-rounded" value='${POCreationLineItem.immaterial}' style='width:200px;' readonly="true"></td>
                                                                                        <td><input type="checkbox" class="prReturnsItem" value='${POCreationLineItem.returnsItem}'></td>
                                                                                        <td><input type="checkbox" class="prFreeOfCharge" value='${POCreationLineItem.freeOfCharge}'></td>
                                                                                        <td><input type="text" class="form-control form-rounded prRfqNo" value='${POCreationLineItem.rFQNo}' style='width:200px;' readonly="true"></td>
                                                                                        <td><input type="text" class="form-control form-rounded prRfqItemNo" value='${POCreationLineItem.rFQItemNo}' style='width:80px;' readonly="true"></td>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </c:if>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 update-backgroud-color" style="max-width: 100%;">
                                                        <c:if test="${Operation != 'edit'}">
                                                            <center>
                                                                <button type="button" class="btn btn-primary btn-sm" id="saveHeadersa">Save PO Header</button>
                                                            </center>
                                                        </c:if>
                                                        <c:if test="${Operation == 'edit'}">
                                                            <center>
                                                                <button type="button" class="btn btn-primary btn-sm" id="saveFetchPoHeaderDetails">Save PO Header</button>
                                                            </center>
                                                        </c:if>
                                                    </div>
                                                    <!--<br>-->
                                                </div>
                                                <br>
                                                <!--</div>-->
                                                <div class="card box update-backgroud-color">
                                                    <div class="rightCircle" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>


                                                    <div class="tab-regular collapseDiv collapseDivLineLevel">
                                                        <label for="Item" class="inline" style="margin-left:10px;margin-bottom:20px;">Item:</label>
                                                        <select class="custom-select inline ItemNumberSelectClass" style="width:500px;margin-bottom:0px;margin-left:50px;" id="ItemNumberSelect" name="Item">
                                                            <%--<c:if test="${type == 'edit'}">--%>
                                                            <option value="">Select</option>
                                                            <%--</c:if>--%>

                                                            <c:forEach var="POCreationLineItem" items="${POCreationLineItem}" varStatus="status">
                                                                <option>${POCreationLineItem.itemNumber}</option>
                                                            </c:forEach>

                                                        </select> 

                                                        <%--<c:if test="${type != 'edit'}">--%>
                                                        <button type="button" class="btn btn-primary btn-sm" id="saveLineItemData" disabled="true">Save</button>
                                                        <%--</c:if>--%>
                                                        <%--<c:if test="${type == 'edit'}">--%>
                                                        <!--<button type="button" class="btn btn-primary btn-sm" id="saveLineItemData">Save</button>-->
                                                        <%--</c:if>--%>

                                                        <!--<button type="button" class="btn btn-primary btn-sm" id="saveLineItemData">Save</button>-->
                                                        <!--<div style="display:none;">-->
                                                        <div style="display:none;" id="hideLineLevelData">
                                                            <ul class="nav nav-tabs nav-fill nav-tabs" id="myTab7" role="tablist">
                                                                <li class="nav-item" id="serviceTab_li">
                                                                    <a class="nav-link active" id="services" data-toggle="tab" href="#services-tab" role="tab" aria-controls="services" aria-selected="true">Services</a>
                                                                </li>
                                                                <li class="nav-item" id="limits_li">
                                                                    <a class="nav-link" id="limits" data-toggle="tab" href="#limits-tab" role="tab" aria-controls="limits" aria-selected="false">Limits</a>
                                                                </li>
                                                                <li class="nav-item" id="material_li">
                                                                    <a class="nav-link" id="material_linelevel" data-toggle="tab" href="#material_linelevel-tab" role="tab" aria-controls="material_linelevel" aria-selected="false">Material</a>
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
                                                                <li class="nav-item" id="conditions_linelevel_li">
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
                                                                <li class="nav-item" style="display:none;" id="component_li">
                                                                    <a class="nav-link" id="component_linelevel" data-toggle="tab" href="#component_linelevel-tab" role="tab" aria-controls="component_linelevel" aria-selected="false">Component</a>
                                                                </li>

                                                            </ul>
                                                            <div class="tab-content update-backgroud-color">
                                                                <!--<input type="hidden">-->
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
                                                                                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="replicateServiceAccAssgnModelBtn_div" style="display: none;">
                                                                                        <div class="form-group">
                                                                                            <button type="button" id="replicateServiceAccAssBtn" class="btn btn-primary btn-sm" style="margin-left: 950px;">Replicate</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="table-responsive" style="height:260px;">
                                                                                    <table class="table table-bordered" id="serviceTableId">
                                                                                        <thead class="table-header-color">
                                                                                            <tr class="border-0">
                                                                                                <th class="border-0"></th>
                                                                                                <th class="border-0">Line Itm No</th>
                                                                                                <th class="border-0">Service No</th>
                                                                                                <th class="border-0">Short Text</th>
                                                                                                <th class="border-0">Qty</th>
                                                                                                <th class="border-0">Unit</th>
                                                                                                <th class="border-0">Gross Price</th>
                                                                                                <th class="border-0">Curr.</th>
                                                                                                <th class="border-0">Net Price</th>
                                                                                                <th class="border-0">Edition</th>
                                                                                                <th class="border-0">Line Itm Long Txt</th>
                                                                                                <th class="border-0">Overf. Tolerance</th>
                                                                                                <th class="border-0">Net Val</th>
                                                                                                <th class="border-0">Actual Qty</th>
                                                                                                <th class="border-0">Serv. Txt</th>
                                                                                                <!--<th class="border-0">Line Text</th>-->
                                                                                                <th class="border-0" style="width:50px;"></th>
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
                                                                                    <label for="ActualValue" class="">Actual Value:</label>
                                                                                    <input type="text" class="form-control form-rounded" id="ActualValue" name="ActualValue" readonly="true" value="0.00">
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
                                                                        <!--                                                                        <div class="form-group">
                                                                                                                                                    <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowLimitTabBtnId" style="margin-left: 20px;"></i></a>
                                                                                                                                                </div>-->
                                                                    </div>
                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                        <ul class="nav nav-tabs nav-fill nav-tabs" id="myTab7" role="tablist">
                                                                            <li class="nav-item" id="contractlimits_li">
                                                                                <a class="nav-link" id="contractlimits" data-toggle="tab" href="#contractlimits-tab" role="tab" aria-controls="contractlimits" aria-selected="false">Contract Limits</a>
                                                                            </li>
                                                                            <li class="nav-item" id="otherlimits_li">
                                                                                <a class="nav-link" id="otherlimits" data-toggle="tab" href="#otherlimits-tab" role="tab" aria-controls="otherlimits" aria-selected="false">Other Limit</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div class="tab-content update-backgroud-color">
                                                                        <div class="tab-pane fade" id="contractlimits-tab" role="tabpanel" aria-labelledby="contractlimits-tab">
                                                                            <div class="card-body">
                                                                                <div class="table-responsive" style="height:150px;">
                                                                                    <table class="table table-bordered limitTabTableClass" id="limitTabTableId" style="width: 60%;">
                                                                                        <thead class="table-header-color">
                                                                                            <tr class="">
                                                                                                <th class="border-1 th-color" style="width:20px;"></th>
                                                                                                <th class="border-1 th-color" style="width:50px;">Contract</th>
                                                                                                <th class="border-1 th-color" style="width:50px;">Item</th>
                                                                                                <th class="border-1 th-color" style="width:100px;">Overall Limit</th>
                                                                                                <th class="border-1 th-color" style="width:100px;">Expected Value</th>
                                                                                                <th class="border-1 th-color" style="width:100px;">Actual Value</th>
                                                                                                <th class="border-1 th-color" style="width:100px;">Short Text</th>
                                                                                                <th class="border-1 th-color" style="width:10px;">No Limit</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td></td>
                                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblContract" name="limitTblContract"></td>
                                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblItemNumber" name="limitTblItemNumber"></td>
                                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblOverAllLimit" name="limitTblOverAllLimit"></td>
                                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblExpctValue" name="limitTblExpctValue"></td>
                                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblActualValue" name="limitTblActualValue" value="0.00"></td>
                                                                                                <td><input type="text" class="form-control form-rounded tableInputField limitTblShortText" name="limitTblShortText"></td>
                                                                                                <td><input type="checkbox" class="limitTblNoLimit" name="limitTblNoLimit"></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="tab-pane fade" id="otherlimits-tab" role="tabpanel" aria-labelledby="otherlimits-tab">
                                                                            <div class="card-body">
                                                                                <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="limitOtherLimits" class="inline" style="margin-left: 15px;" id="limitOtherLimitsLabel">Limit: </label>
                                                                                            <input type="text" class="form-control form-rounded inline input-height" id="limitOtherLimits" name="limitOtherLimits" style="width:100px;margin-left:44px;">
                                                                                            <label for="noLimitOtherLimit" class="inline" style="margin-left: 15px;">No Limit: </label>
                                                                                            <label class="custom-control custom-checkbox inline" style="padding-top:5px;">
                                                                                                <input type="checkbox" name="noLimitOtherLimit" id="noLimitOtherLimit" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="actualValueOtherLimits" class="inline" style="margin-left: 15px;" id="actualValueOtherLimitsLabel">Actual Value: </label>
                                                                                            <input type="text" class="form-control form-rounded inline input-height" id="actualValueOtherLimits" name="actualValueOtherLimits" value="0.00" style="width:100px;">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div class="tab-pane fade show" id="quantities-tab" role="tabpanel" aria-labelledby="quantities-tab">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group" style="margin-bottom:0px;">
                                                                                    <label for="pOQuantity" class="">PO Quantity/Unit:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" value="1"  id="pOQuantity" name="pOQuantity" style="width:150px;margin-left:50px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-type="digits" required="true" readonly>
                                                                                    <input type="text" class="form-control form-rounded inline" value="AU" id="pOUnit" name="pOUnit" style="width:50px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true" readonly>
                                                                                    <label for="orderUnit" class="" style="margin-left:30px;">Order Unit</label>
                                                                                    <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                                    <label for="orderPriceUnit" class="inline" style="margin-left:5px;">Order Price Unit:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="orderUnit" name="orderUnit" style="width:80px;margin-left:30px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$" readonly>
                                                                                    <input type="text" class="form-control form-rounded inline" value="AU" id="unitOrderUnit" name="unitOrderUnit" style="width:50px" readonly>
                                                                                    <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="orderPriceUnit" name="orderUnit" style="width:80px;margin-left:5px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$" readonly>
                                                                                    <input type="text" class="form-control form-rounded inline" id="unitOrderPriceUnit" value="AU" name="unitOrderPriceUnit" style="width:50px" readonly>
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
                                                                                    <input type="text" class="form-control form-rounded inline" id="unitOrderUnit2" name="unitOrderUnit2" style="width:50px" readonly>
                                                                                    <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="sKUUnit" name="sKUUnit" style="width:80px;margin-left:5px;" readonly>
                                                                                    <input type="text" class="form-control form-rounded inline" id="unitSKUUnit" name="unitSKUUnit" style="width:50px" readonly>
                                                                                </div>
                                                                            </div>
                                                                            <!--<div class="row">-->
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="netWeight" class="">Net Weight: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeight" name="netWeight" style="width:150px;margin-left:55px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeightUnit" name="netWeightUnit" style="width:50px;"readonly="true">
                                                                                    <label> /</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeightPerUnit" name="netWeightPerUnit" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeightOrderUnit" name="netWeightUnit" style="width:50px;"readonly="true">
                                                                                    <label for="netWeight2" style="margin-left:111px;">Net Weight: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeight2" name="netWeight2" style="width:150px;margin-left:55px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeightUnit2" name="netWeightUnit2" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
                                                                                </div>
                                                                            </div>
                                                                            <!--                                                                            </div>-->
                                                                            <!--<div class="row">-->
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="grossWeight">Gross Weight:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeight" name="grossWeight" style="width:150px;margin-left:42px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeightUnit" name="grossWeightUnit" style="width:50px;"readonly="true">
                                                                                    <label> /</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeightPerUnit" name="grossWeightPerUnit" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeightOrderUnit" name="grossWeightUnit" style="width:50px;"readonly="true">
                                                                                    <label for="grossWeight2" style="margin-left:108px;">Gross Weight:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeight2" name="grossWeight2" style="width:150px;margin-left:42px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeightUnit2" name="grossWeightUnit2" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
                                                                                </div>
                                                                            </div>
                                                                            <!--</div>-->
                                                                            <!--<div class="row">-->
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="volume" class="">Volume: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="volume" name="volume" style="width:150px;margin-left:77px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="volumeUnit" name="volumeUnit" style="width:50px;"readonly="true">
                                                                                    <label> /</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="volumePerUnit" name="volumePerUnit" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="volumeOrderUnit" name="volumeUnit" style="width:50px;"readonly="true">
                                                                                    <label for="volume2" style="margin-left:108px;">Volume: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="volume2" name="volume" style="width:150px;margin-left:77px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="volumeUnit2" name="volumeUnit" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
                                                                                </div>
                                                                            </div>
                                                                            <!--</div>-->
                                                                            <!--<div class="row">-->
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="points">Points:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="points" name="points" style="width:150px;margin-left:84px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="pointsUnit" name="pointsUnit" style="width:50px;"readonly="true">
                                                                                    <label> /</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="pointsPerUnit" name="pointsPerUnit" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="pointsOrderUnit" name="pointsOrderUnit" style="width:50px;"readonly="true">
                                                                                    <label for="points2" style="margin-left:108px;">Points:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="points2" name="points2" style="width:150px;margin-left:84px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="pointsUnit2" name="pointsUnit2" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
                                                                                </div>
                                                                            </div>
                                                                            <!--</div>-->  
                                                                        </div>
                                                                    </div>
                                                                    <!--</div>-->
                                                                </div>
                                                                <div class="tab-pane fade show" id="deliverySchedule-tab" role="tabpanel" aria-labelledby="deliverySchedule-tab">
                                                                    <!--<h5>Communication</h5>-->
                                                                    <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowdeliveryScheduleBtnId" style="margin-left: 20px;margin-top:10px;"></i></a>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div class="card-body">
                                                                        <div class="table-responsive" style="height:260px;">
                                                                            <table class="table table-bordered deliveryScheduleTableClass" id="DeliveryScheduleTableId" style="width: 100%;">
                                                                                <thead class="table-header-color">
                                                                                    <tr class="">
                                                                                        <th class="border-1 th-color" style="width:50px;">D.D.Cat.</th>                         <%--0--%>
                                                                                        <th class="border-1 th-color" style="width:150px;">Delivery Date</th>                   <%--1--%>
                                                                                        <th class="border-1 th-color" style="width:50px;">Statistical Delivery Date</th>        <%--2--%>
                                                                                        <th class="border-1 th-color" style="width:150px;">Sch Qty</th>                         <%--3--%>
                                                                                        <th class="border-1 th-color" style="width:100px;">Time</th>                            <%--4--%>    
                                                                                        <th class="border-1 th-color" style="width:100px;">Pur Req Num</th>                     <%--5--%>    
                                                                                        <th class="border-1 th-color" style="width:50px;">Req Item Num</th>                     <%--6--%>                                                                      
                                                                                        <th class="border-1 th-color" style="width:50px;">GR Qty</th>                           <%--7--%>        
                                                                                        <th class="border-1 th-color" style="width:50px;">Open Quantity</th>                    <%--8--%>
                                                                                        <th class="border-1 th-color" style="width:50px;">Sch. Line</th>                        <%--9--%>    
                                                                                        <th class="border-1 th-color" style="width:20px;"></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td><input  type="text" class="form-control form-rounded deliveryDateCategory tableInputField " id="deliveryDateCategoryId" name="deliveryDateCategoryId"></td>
                                                                                        <td><input readonly type="text" class="deliveryDateClass" style="width:300px;"> <input type='hidden' class='delvSchDeliveryDatepicker'></td>
                                                                                        <td><input type="text" class="statistialDeliveryDate" style="width:300px;"> <input type='hidden' class='statistialDeliveryDatepicker'></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" name="scheduledQuantity" value="1.000" style="width: 150px;"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" name="timeDeliveryScheduled"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" name="prNumberDeliveryScheduled" disabled></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" name="reqItemNumber" disabled></td>                                                                                        
                                                                                        <td><input type="number" class="form-control form-rounded tableInputField gRQuantityClass" value="1"></td>
                                                                                        <td><input type="number" class="form-control form-rounded tableInputField openQuantityClass" value="1"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField schLineClass" disabled></td>
                                                                                        <td></td>
                                                                                    </tr>
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

                                                                                    <input type="number" class="form-control form-rounded inline" id="OverdeliveryTolerance" name="OverdeliveryTolerance" style="width:80px;margin-left:53px;" value="0.0" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                    <!--<h5 class="inline">%</h5>-->
                                                                                    <label for="" class="inline">%</label>
                                                                                    <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                        <input type="checkbox" name="unlimited" id="unlimited" class="custom-control-input" disabled><span class="custom-control-label" required=""></span>
                                                                                    </label>
                                                                                    <label for="GoodsReceipt" class="inline">Unlimited: </label>
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="underDelvTolColDiv">
                                                                                    <label for="UnderdeliveryTolerance" class="inline" style="margin-left:10px;">Underdel Tol:</label>
                                                                                    <input type="number" class="form-control form-rounded inline" id="UnderdeliveryTolerance" value="0.0" name="UnderdeliveryTolerance" style="width:80px;margin-left:50px;" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                    <label for="" class="inline">%</label>

                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="shippingInstructionColDiv">
                                                                                    <label for="ShippingInstruction" class="inline" style="margin-left:10px;">Shipping Instruction:</label>
                                                                                    <select class="custom-select inline" id="ShippingInstruction" name="ShippingInstruction" style="width:200px;margin-left:10px;">
                                                                                        <option value="">Select</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="stockTypeColDiv">
                                                                                    <label for="StockType" class="inline" style="margin-left:10px;">Stock Type:</label>
                                                                                    <select class="custom-select inline" id="StockType" name="StockType" style="width:200px;margin-left:60px;">
                                                                                        <option value="">Select</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="valuationTypeColDiv">
                                                                                    <label for="ValuationType" class="inline" style="margin-left:10px;">Valuation Type:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="ValuationType" name="ValuationType" style="width:200px;margin-left:40px;" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="remShelfLifeColDiv">
                                                                                    <label for="RemShelfLife" class="inline" style="margin-left:10px;">Rem. Shelf Life:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="RemShelfLife" name="RemShelfLife" style="width:100px;margin-left:35px;" data-parsley-trigger="change" data-parsley-maxlength="4">
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                                    <label for="QAControlLife" class="inline" style="margin-left:10px;">QA Control life:</label>
                                                                                    <!--<input type="text" class="form-control form-rounded inline" id="QAControlLife" name="QAControlLife" style="width:120px;margin-left:40px;" data-parsley-trigger="change" data-parsley-maxlength="8">-->
                                                                                    <select class="custom-select inline" id="QAControlLife" name="QAControlLife" style="width:200px;margin-left:40px;">
                                                                                        <option value="">Select</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="grProcTimeColDiv">
                                                                                    <label for="GRProcTime" class="inline" style="margin-left:10px;">GR Proc. Time:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="GRProcTime" name="GRProcTime" style="width:50px;margin-left:40px;" data-parsley-trigger="change" data-parsley-maxlength="3"> 
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                                                                    <label for="FirstReminderExpediter" class="inline">1st Rem/Exp:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="FirstReminderExpediter" name="FirstReminderExpediter" style="width:50px;margin-left:14px;" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                                    <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                        <input type="checkbox" name="GoodsReceipt" id="GoodsReceipt" class="custom-control-input" checked="true" disabled="true"><span class="custom-control-label" required=""></span>
                                                                                    </label>
                                                                                    <label for="GoodsReceipt" class="inline">Goods Receipt: </label>







                                                                                </div>


                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                                    <label for="SecondReminderExpediter" class="inline">2nd Rem/Exp:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="SecondReminderExpediter" name="SecondReminderExpediter" style="width:50px;margin-left:10px;" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                                    <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                        <input type="checkbox" name="GRNonValuated" id="GRNonValuated" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                                                    </label>
                                                                                    <label for="GRNonVal" class="inline">GR Non-Valuated: </label>
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                                    <label for="ThirdReminderExpediter" class="inline">3rd Rem/Exp:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="ThirdReminderExpediter" name="ThirdReminderExpediter" style="width:50px;margin-left:14px;" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                                    <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                        <input type="checkbox" name="DelivCompleted" id="DelivCompleted" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                                                    </label>
                                                                                    <label for="GoodsReceipt" class="inline">Deliv. Completed: </label>
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                                    <label for="NoExpend" class="inline">No.Expend: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="NoExpend" name="NoExpend" style="width:80px;margin-left:25px;" data-parsley-trigger="change" data-parsley-maxlength="8">
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                                    <label for="PlDeliveryTime" class="inline">Pl Del Time:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="PlDeliveryTime" name="PlDeliveryTime" style="width:50px;margin-left:22px;" data-parsley-trigger="change" data-parsley-maxlength="3">
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
                                                                                    <c:choose>
                                                                                        <c:when test="${type == 'new'}">
                                                                                            <input type="text" class="form-control form-rounded inline" id="incoTermsPart1Delivery" name="incoTermsPart1Delivery" value="" value="${perSettingsObj.incoTerms1Line}" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                            <input type="text" class="form-control form-rounded inline" id="incoTermsPart2Delivery" value="${perSettingsObj.incoTerms2Line}" name="incoTermsPart2Delivery" style="width:300px;" data-parsley-trigger="change" data-parsley-maxlength="28">
                                                                                        </c:when>
                                                                                        <c:otherwise>
                                                                                            <input type="text" class="form-control form-rounded inline" id="incoTermsPart1Delivery" name="incoTermsPart1Delivery" value="" value="${perSettingsObj.incoTerms1Line}" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                            <input type="text" class="form-control form-rounded inline" id="incoTermsPart2Delivery" name="incoTermsPart2Delivery" style="width:300px;" data-parsley-trigger="change" data-parsley-maxlength="28">
                                                                                        </c:otherwise>
                                                                                    </c:choose>

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
                                                                                        <input type="checkbox" name="InvoiceReceipt" id="InvoiceReceipt" class="custom-control-input" disabled="true" checked><span class="custom-control-label" required="">Yes</span>
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
                                                                                        <input type="checkbox" name="GRBasedIV" id="GRBasedIV" class="custom-control-input" disabled="true" checked><span class="custom-control-label" required="">Yes</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" id="serviceBasedIVDiv">
                                                                                <div class="form-group">
                                                                                    <label for="GRBasedIV" class="">Service Based IV: </label>
                                                                                    <label class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" name="serviceBasedIV" id="serviceBasedIV" class="custom-control-input" checked><span class="custom-control-label" required="">Yes</span>
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
                                                                                    <label for="TaxCode" class="">Tax Code<span style="color:red;">*</span>:</label>
                                                                                    <input type="text" class="form-control form-rounded" id="TaxCode" name="TaxCode" data-parsley-trigger="change" data-parsley-maxlength="2" required="true">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="padding-top:25px;">
                                                                                <div class="form-group">
                                                                                    <button type="button" class="btn btn-secondary btn-sm" id="invoiceTaxes">Taxes</button>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">






                                                                                <!--<div class="form-group">-->
                                                                                <!--<label for="TaxCodeDescription" class="">Tax Code Description:</label>-->







                                                                                <!--<input type="text" class="form-control form-rounded" id="TaxCodeDescription" name="TaxCodeDescription" data-parsley-trigger="change" data-parsley-maxlength="50" required="true">-->
















                                                                                <!--</div>-->
                                                                            </div>
                                                                        </div>

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
                                                                            <!--                                                                            <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                                                                                            <div class="form-group">
                                                                                                                                                                <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="conditionDetailsAddRowBtn" aria-hidden="true" style="margin-left:1100px;"></i></a>
                                                                                                                                                            </div>
                                                                                                                                                        </div>-->
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
                                                                                                    <th class="border-1 th-color">Currency</th>
                                                                                                    <th class="border-1 th-color">Per</th>
                                                                                                    <th class="border-1 th-color">Condition Pricing Unit</th>
                                                                                                    <th class="border-1 th-color">UOM</th>
                                                                                                    <th class="border-1 th-color">Condition Value</th>
                                                                                                    <th class="border-1 th-color">Currency</th>
                                                                                                    <th class="border-1 th-color">Condition Value</th>
                                                                                                    <th class="border-1 th-color">Condition Currency</th>
                                                                                                    <th class="border-1 th-color">Status</th>
                                                                                                    <th class="border-1 th-color">Numerator</th>
                                                                                                    <th class="border-1 th-color">Base UOM</th>
                                                                                                    <th class="border-1 th-color">Deno. for Conv</th>
                                                                                                    <th class="border-1 th-color">UOM - Extra</th>
                                                                                                    <th class="border-1" style="width:30px;"></th>
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
                                                                                    <!--<input type="text" class="form-control form-rounded inline" id="accountAssignmentCategoryDisplay" name="accountAssignmentCategoryDisplay" style="width:200px;margin-left:25px;" readonly="true">-->
                                                                                    <div id="accountAssignmentCategoryDisplayDiv" class="inline" style="color: gray;"></div>
                                                                                    <input type="hidden" id="accountAssignmentCategory" name="accountAssignmentCategory">
                                                                                    
                                                                                    <label for="distribution" class="inline" style="margin-left:50px;">Distribution: </label>
                                                                                    <select class="custom-select inline" id="distribution" name="distribution" style="width:200px;margin-left:25px;" disabled="true">
                                                                                        <!--<option>Select</option>-->
                                                                                        <option>Single Account Assignment</option>
                                                                                        <option>Distrib. On Quantity Basis</option>
                                                                                        <option> Distrib. By Percentage</option>
                                                                                    </select>
                                                                                    <label for="CoCode" class="inline" style="margin-left:50px;">Co Code: </label>
                                                                                    <select class="custom-select inline" id="CoCode" name="CoCode" style="width:200px;margin-left:25px;" disabled="true">
                                                                                        <option value="">Select</option>
                                                                                        <c:forEach var="companyCode" items="${companyCodeList}" varStatus="status">
                                                                                            <option value="${companyCode}">${companyCode}</option>
                                                                                        </c:forEach>
                                                                                    </select>
                                                                                    <button type="button" id="replicateMainAccAssBtn" class="btn btn-primary btn-sm" style="margin-left: 280px;" title="Replicate this account assignment to all PO line having same account assingment category.">Replicate</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="costCenterDiv">                                     
                                                                            <div class="row">
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentchangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
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
                                                                                <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="costCenterAccAsgn" id="accAsgCostCenterLabel" class="inline" style="margin-left:15px;">Cost Center: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="costCenterAccAsgn" name="costCenterAccAsgn" style="width:100px;margin-left:10px;" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                                        <label for="Order" class="inline" id="assAsgnorderLabel" style="margin-left:15px;">Order: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="accAsgnOrder" name="Order" style="width:110px;margin-left:10px;">
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
                                                                        <div class="row" id="interCompanyAccAsgn" style="display:none;">
                                                                            <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="fund" class="inline" id="interCompanyFundLabel" style="margin-left:5px;">Fund: </label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFund" name="interCompanyFund" style="width:100px;margin-left:43px;">
                                                                                    <label for="functionalArea" class="inline" id="interCompanyFunctionalAreaLabel" style="margin-left:15px;">Functional Area: </label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFunctionalArea" name="interCompanyFunctionalArea" style="width:150px;margin-left:10px;">
                                                                                    <label for="fundCenter" class="inline" id="interCompanyFundCenterInputLabel" style="margin-left:20px;">Fund Center:</label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFundCenterInput" name="interCompanyFundCenterInput" style="width:150px;margin-left:10px;">
                                                                                    <label for="commitmentItem" class="inline" id="interCompanyCommItemInputLabel" style="margin-left:15px;">Com Item:</label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyCommItemInput" name="interCompanyCommItemInput" style="width:200px;margin-left:5px;">
                                                                                    <!--                                                                                    <label for="grant" class="inline" id="grantLabel" style="margin-left:10px;">Grant:</label>
                                                                                                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="grant" name="grant" style="width:100px;margin-left:5px;">-->
                                                                                </div>
                                                                            </div>
                                                                            <!--                                                                            <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                                                                                                            <label for="earMarkedFunds" class="inline" id="earMarkedFundsLabel" style="margin-left:10px;">Earmarked funds:</label>
                                                                                                                                                            <input type="text" class="form-control form-rounded inline input-height" id="earMarkedFunds" name="earMarkedFunds" style="width:200px;margin-left:15px;">
                                                                                                                                                            <input type="text" class="form-control form-rounded inline input-height" id="earMarkedFunds2" name="earMarkedFunds2" style="width:50px;">
                                                                                                                                                        </div>-->
                                                                        </div>
                                                                        <div class="multipleCostCenterDiv" style="display:none;">



                                                                            <div class="row">
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                    <!--<div class="modal-footer">-->
                                                                                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentTablechangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                                    <!--</div>-->





                                                                                </div>
                                                                                <!--                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                                                                                                    <div class="form-group">
                                                                                                                                                                        <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveAccAsgnTblBtn" aria-hidden="true"></i></a>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>-->
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
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnQuantity" value="" max="" style="width: 150px;"></td>         <!--1-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnPercentage" value="" max="" style="width: 100px;"></td>       <!--2-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnGLAccount" value="" style="width: 100px;"></td>                 <!--3-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnCOArea" value="" style="width: 100px;"></td>                    <!--4-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnCostCetner" value="" style="width: 100px;"></td>                <!--5-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnFund" value="" style="width: 100px;"></td>                      <!--6-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnFunctionalArea" value="" style="width: 100px;"></td>            <!--7-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnFundCenter" value="" style="width: 100px;"></td>                <!--8-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnCommitmentItem" value="" style="width: 100px;"></td>            <!--9-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnUnloadingPoint" value="" style="width: 100px;"></td>            <!--10-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnRecipients" value="" style="width: 100px;"></td>                <!--11-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnOrder" value="" style="width: 100px;"></td>                     <!--12-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnAssets" value="" style="width: 100px;"></td>                    <!--13-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnWBSElement" value="" style="width: 100px;"></td>                <!--14-->
                                                                                                        <!--<td><input type=text class="form-control form-rounded input-height accAsgnS_I_D" value=""></td>-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnSalesOrder" value="" style="width: 100px;"></td>                 <!--15-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnNetActNumber" value="" style="width: 100px;"></td>               <!--16-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnItemNumber" value="" style="width: 100px;"></td>                 <!--17-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnDeliverySchedule" value="" style="width: 100px;"></td>           <!--18-->
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
                                                                        <div class="row">
                                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="headerTextOptionDiv">
                                                                                    <select class="custom-select" id="textTabOptionLineLevel" name="textTabOptionLineLevel" style="margin-top: 20px;">
                                                                                        <option value="materialPoText">Material PO Text</option>
                                                                                        <option value="itemText">Item Text</option>
                                                                                        <option value="infoRecordPoText">Info Record PO Text</option>
                                                                                        <option value="pONoteToApprover">PO noe To Approver</option>
                                                                                        <option value="DeliveryText">Delivery Text</option>
                                                                                        <option value="prNoteToApproval">PR Note To Approval</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                                                                <div class="row">
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="ItemTextDiv" style="display: none">
                                                                                        <div class="form-group">
                                                                                            <label for="ItemText" class="">Item Text:</label>
                                                                                            <textarea class="form-control form-rounded" rows="5" id="ItemText" name="ItemText" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="InfoRecordPOTextDiv" style="display: none">
                                                                                        <div class="form-group">
                                                                                            <label for="InfoRecordPOText" class="">Info Record PO Text:</label>
                                                                                            <textarea class="form-control form-rounded" rows="5" id="InfoRecordPOText" name="InfoRecordPOText" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">                                                                            
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="MaterialPOTextDiv">
                                                                                        <div class="form-group">
                                                                                            <label for="MaterialPOText" class="">Material PO Text:</label>
                                                                                            <textarea class="form-control form-rounded" rows="5" id="MaterialPOText" name="MaterialPOText" readonly style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="PONoteToApproverDiv" style="display: none">
                                                                                        <div class="form-group">
                                                                                            <label for="PONoteToApprover" class="">PO Note To Approver:</label>
                                                                                            <textarea class="form-control form-rounded" rows="5" id="PONoteToApprover" name="PONoteToApprover" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>                                                                            
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="DeliveryTextDiv" style="display: none">
                                                                                        <div class="form-group">
                                                                                            <label for="DeliveryText" class="">Delivery Text:</label>
                                                                                            <textarea class="form-control form-rounded" rows="5" id="DeliveryText" name="DeliveryText" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="prNoteToApprovalDiv" style="display: none">
                                                                                        <div class="form-group">
                                                                                            <label for="pRNoteToApproval" class="">PR Note to Approval:</label>
                                                                                            <textarea class="form-control form-rounded" rows="5" id="pRNoteToApproval" name="pRNoteToApproval" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
                                                                                        <option>Transporter</option>
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
                                                                                    <label for="Street" class="">Street</label>
                                                                                    <input type="text" value="Tanjong Kling Road" class="form-control form-rounded" id="Street" name="Street" data-parsley-trigger="change" data-parsley-maxlength="60">
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
                                                                                    <input type="text" value="628048" class="form-control form-rounded" id="PostalCode" name="PostalCode" data-parsley-pattern="^[0-9]*$" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="City" class="">City:</label>
                                                                                    <input type="text" value="Singapore" class="form-control form-rounded" id="City" name="City" data-parsley-trigger="change" data-parsley-maxlength="40">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="countryCode" class="">Country Code:</label>
                                                                                    <input type="text" value="SG" class="form-control form-rounded" id="countryCode" name="countryCode" data-parsley-trigger="change" data-parsley-maxlength="3">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="countryDesc" class="">Country Description</label>
                                                                                    <input type="text" value="Singapore" class="form-control form-rounded" id="countryDesc" name="countryDesc" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <!--</div>-->
                                                                </div>
                                                                <div class="tab-pane fade show" id="confirmations-tab" role="tabpanel" aria-labelledby="confirmations-tab">


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
                                                                            <!--<h5>Conditions</h5>-->
<!--                                                                            <div class="row">
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="componentBtnLineLevel_div">
                                                                                    <div class="form-group">
                                                                                        <a><i type="buttom"  class="fa fa-plus-circle btn-primary btn-sm" id="componentAddRowBtn" aria-hidden="true"></i></a>
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
                                                                                                        <th></th>
                                                                                                        <th class="border-1 th-color">Material</th>
                                                                                                        <th class="border-1 th-color">Description</th>
                                                                                                        <th class="border-1 th-color">Plant</th>
                                                                                                        <th class="border-1 th-color">Unit</th>
                                                                                                        <th class="border-1 th-color">Quantity</th>
                                                                                                        <th class="border-1 th-color">Prod St Loc</th>
                                                                                                        <th class="border-1 th-color">Supply Area</th>
                                                                                                        <th class="border-1 th-color">Requirement Date</th>
                                                                                                        <th class="border-1 th-color">Qty Is Fixed</th>
                                                                                                        <th class="border-1 th-color">Latest Requirement Date</th>
                                                                                                        <th class="border-1 th-color">Dist. Key</th>
                                                                                                        <th class="border-1 th-color">Item Number</th>
                                                                                                        <th class="border-1 th-color">Batch</th>
                                                                                                        <th class="border-1 th-color">Storage Location</th>
                                                                                                        <th class="border-1" style="width:30px;"></th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height comMaterial" style="width:100px;"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height comDescription" style="width:200px;"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height comPlant" style="width:100px;"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height comUnit" style="width:100px;"></td>
                                                                                                        <td><input type="number" class="form-control form-rounded input-height comQuantity" style="width:100px;"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height comProdStorageLoc" style="width:100px;"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height comSupplyArea" style="width:100px;"></td>
                                                                                                        <td><input type="text" class="comRequirementDate" value="" style="width:150px;" disabled><input type="hidden" class="reqDatepicker"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height qtyIsFixed" style="width:100px;"></td>
                                                                                                        <td><input type="text" class="latReqDate" style="width:150px;" disabled><input type="hidden" class="latReqDatepicker"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height distKey" style="width:100px;"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height itemNumber" style="width:100px;" disabled></td>
                                                                                                        <td><input type="text" class="form-control form-rounded input-height comBatch" style="width:100px;"></td>
                                                                                                        <td></td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>-->
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade show" id="material_linelevel-tab" role="tabpanel" aria-labelledby="material_linelevel-tab">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <!--<h8>Material</h8>-->
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="revisionLevel" class="">Revision Level: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="revisionLevel" name="revisionLevel" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="vendMatNo" class="">Vend Mat No: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="vendMatNo" name="vendMatNo" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="eanUpc" class="">EAN / UPC: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="eanUpc" name="eanUpc" data-parsley-trigger="change" data-parsley-maxlength="15" disabled>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="eanUpc" class="">Vendor Sub-Range: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="vendorSubRange" name="vendorSubRange" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="batch" class="">Batch: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="batch" name="batch" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="vendBatch" class="">Vendor Batch: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="vendBatch" name="vendBatch" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="infoUpdate" class="">Info Update: </label>
                                                                                    <label class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" name="infoUpdate" id="infoUpdate" class="custom-control-input" disabled="true" checked="true"><span class="custom-control-label">Yes</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="mfrPartNo" class="">MFR Part No: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="mfrPartNo" name="mfrPartNo" readonly="true" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="manufacturer:" class="">Manufacturer: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="manufacturer" name="manufacturer" readonly="true" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group" style="margin-top: 25px;" id="componentPopUpBtnDiv">
                                                                                    <button type="button" id="componentPopUpBtn" style="background-color: white;">
                                                                                        <img src="assets/images/Component-Tab-Image.jpg" alt="Components" style="width: 25px;"/>
                                                                                    </button>
                                                                                    Components
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="align-center text-align-center">
                                                        <c:if test="${Operation != 'edit'}">
                                                            <c:if test="${NGBPExtPOCreation.errorTransactionStatus != 'Yes'}">
                                                                <input type="submit" class="btn btn-success btn-rounded preCheckPoBtn createStandalonePoBtn" id="preCheckPoBtn" style="right:53%;" value="Pre Check">
                                                            </c:if>
                                                            <input type="submit" class="btn btn-success btn-rounded createStandalonePoBtn" id="createStandalonePoBtn" value="Create PO" style="">
                                                        </c:if>

                                                        <c:if test="${Operation == 'edit'}">
                                                            <input type="submit" class="btn btn-success btn-rounded preCheckPoBtn createStandalonePoBtn" id="preCheckPoBtn" style="right:53%;" value="Pre Check">
                                                            <input type="submit" class="btn btn-success btn-rounded updatePoBtn" id="updatePoBtn" value="Update PO" style="">
                                                            <input type="submit" class="btn btn-instagram btn-rounded deletePoBtn" id="deletePoBtn" value="Delete PO" style="">
                                                        </c:if>
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
                    <!-- PO Modals or PickList  -->
                    <%@include file = "/WEB-INF/jsp/po/standalonePoModal.jsp" %>                                                                    
                </div>
            </div>
        </div>                                                                            
        <!-- ============================================================== -->
        <!-- end main wrapper  -->
        <!-- ============================================================== -->
        <!-- Optional JavaScript -->
        <!-- jquery 3.3.1 -->
        <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
        <script src="assets/vendor/jquery-ui/js/jquery-ui.min.js"></script>    
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
        
        <!--Standalone PO JS-->
        <script src="assets/js/po/standalonepo/standalonepo.js"></script>
        <script src="assets/js/po/standalonepo/createstandalonepo.js"></script>        
        <script src="assets/js/po/standalonepo/StandalonePoValidations.js"></script>
        <script src="assets/js/po/standalonepo/newgenstandalonepo.js"></script>
        <script src="assets/js/po/standalonepo/editstandalonepo.js"></script>
        <script src="assets/js/po/standalonepo/pofunction.js"></script>
        <script src="assets/js/po/standalonepo/acc_assgn_cat_standalone_functions.js"></script>
        
        <!--Common PO JS-->
        <script src="assets/js/po/cleartextboxes.js"></script>
        <script src="assets/js/po/accountassignmentvalidations.js"></script>
        <script src="assets/js/po/povalidations.js"></script>
        <script src="assets/js/po/internalOrderMasterPickList.js"></script>
        
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
                $(".deliveryDateClass").attr("min", $("#currentDate").val());
                $(".statistialDeliveryDate").attr("min", $("#currentDate").val());

                $('.delvSchDeliveryDatepicker').each(function() {
                    $(this).datepicker({
                        showOn: "button",
                        buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                        minDate: 0,
                        changeMonth: true,
                        changeYear: true,
                        yearRange: '2020:2050',
                        showWeek: true
                    });
                });
                $('.statistialDeliveryDatepicker').each(function() {
                    $(this).datepicker({
                        showOn: "button",
                        buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                        minDate: 0,
                        changeMonth: true,
                        changeYear: true,
                        yearRange: '2020:2050',
                        showWeek: true
                    });
                });
            });

        </script>
        <script>
            function bs_input_file() {
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
            $('.latReqDatepicker').each(function() {
                $(this).datepicker({
                    showOn: "button",
                    buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                    minDate: 0,
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '2020:2050',
                    showWeek: true,
                    beforeShow: function(textbox, instance) {
                        setTimeout(function() {
                            instance.dpDiv.css({
                                "position": "absolute"
                            });
                        }, 0);
                    }
                });
            });
            $('.reqDatepicker').each(function() {
                $(this).datepicker({
                    showOn: "button",
                    buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                    minDate: 0,
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '2020:2050',
                    showWeek: true,
                    beforeShow: function(textbox, instance) {
                        setTimeout(function() {
                            instance.dpDiv.css({
                                "position": "absolute"
                            });
                        }, 0);
                    }    
                });
            });
        </script>
    </body>
</html>
