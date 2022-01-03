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
        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">
        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">
        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">
        <link rel="stylesheet" href="assets/css/po-css.css">
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />

        <c:if test="${PoFrom == 'editApprovedPo'}">
            <title>Amend PO</title>
        </c:if>
        <c:if test="${PoFrom == 'editpo'}">
            <title>Edit PO</title>
        </c:if>
        <c:if test="${PoFrom == 'createpo' || PoFrom == 'byrfq'}">
            <title>Create PO</title>
        </c:if>
        <c:if test="${PoFrom == 'acknowledgePo'}">
            <title>Acknowledge PO</title>
        </c:if>
        <c:if test="${PoFrom == 'shortcutPo'}">
            <title>Create, Amend & Delete PO</title>
        </c:if>

        <style>
            td, th {
                white-space: nowrap;
                overflow: hidden;
            }

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
            #deletePrLinePoTable thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
            .documentListTable thead th, #approvalDetailsTable thead th, #preCheckResponseModalTable thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
            .parsley-errors-list {
                display: none;
            }
            .createPoBtn {
                position: fixed;
                /*top: 70px;*/
                right: 45%;
                bottom: 10px;
                z-index: 999;
            }
            .cancelPoBtn {
                position: fixed;
                right: 37%;
                bottom: 10px;
                z-index: 999;
            }
            .cancelEditPo {
                position: fixed;
                right: 37%;
                bottom: 10px;
                z-index: 999;
            }
            .acknowledge-po {
                position: fixed;
                right: 45%;
                bottom: 10px;
                z-index: 999;
            }
            .disable-click-event {
                pointer-events:none;
            }
            .saveAndCloseBtn {
                position: fixed;
                right: 35%;
                bottom: 10px;
                z-index: 999;
            }
            .editAmendSaveAndCloseBtn {
                position: fixed;
                /*right: 53%;*/
                bottom: 10px;
                z-index: 999;
            }
            .preCheckPoBtn {
                position:fixed;
                z-index:999;
                bottom:10px;
                /*right:54%;*/
            }
        </style>
    </head>
    <body>
        <div class="dashboard-main-wrapper">
            <%@include file = "template.jsp" %>
            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="" id="po">
                    <div class="container-fluid dashboard-content " >

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>

                        <!--<div id="overlay" class="overlay-loader-gif">-->
                        <!--<img src="assets/gif/small-loader.gif" alt="Loading" id="loader_gif">-->
                        <!--</div>-->

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <div class="row">
                                        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                            <c:if test="${PoFrom == 'editApprovedPo'}">
                                                <h2 class="pageheader-title">Amend PO </h2> <h4 id="errorTransactionLabel" style="color: red;display: none;">Error Transaction</h4>
                                            </c:if>
                                            <c:if test="${PoFrom == 'editpo'}">
                                                <h2 class="pageheader-title">Edit PO </h2> <h4 id="errorTransactionLabel" style="color: red;display: none;">Error Transaction</h4>
                                            </c:if>
                                            <c:if test="${PoFrom == 'createpo' || PoFrom == 'byrfq'}">
                                                <h2 class="pageheader-title">Create PO </h2> <h4 id="errorTransactionLabel" style="color: red;display: none;">Error Transaction</h4>
                                            </c:if>
                                            <c:if test="${PoFrom == 'acknowledgePo'}">
                                                <h2 class="pageheader-title">Acknowledge PO </h2> <h4 id="errorTransactionLabel" style="color: red;display: none;">Error Transaction</h4>
                                            </c:if>
                                            <c:if test="${PoFrom == 'shortcutPo'}">
                                                <h2 class="pageheader-title">Create, Amend & Delete PO </h2> <h4 id="errorTransactionLabel" style="color: red;display: none;">Error Transaction</h4>
                                            </c:if>    
                                        </div>
                                        <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">-->
                                        <div class="form-group two">
                                            <label for="transactionInitiatedOn" class="inline" style="margin-left:15px;color:#3d405c;">Tran. Init. On:</label>
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
                                                <c:if test="${PoFrom == 'createpo'}">
                                                    <li class="breadcrumb-item">View PR/ Contract Status</li>
                                                    <li class="breadcrumb-item">PR Lines/ Contract Assigned to Me</li>
                                                    <li class="breadcrumb-item"><a href="pendingprlines.do">Pending PR Lines/ Contract</a></li>
                                                    </c:if>
                                                    <c:if test="${PoFrom == 'byrfq'}">
                                                    <li class="breadcrumb-item"><a href="rfqevaluation.do">Order Evaluation</a></li>
                                                    </c:if>
                                                    <c:if test="${PoFrom == 'editpo'}">
                                                    <li class="breadcrumb-item">Manage PO</li>
                                                    <li class="breadcrumb-item"><a href="managepo.do">Revoke & Edit PO</a></li>
                                                    <li class="breadcrumb-item">Edit PO</li>
                                                    </c:if>
                                                    <c:if test="${PoFrom == 'editApprovedPo'}">
                                                    <li class="breadcrumb-item">Manage PO</li>
                                                    <li class="breadcrumb-item">Amend PO</li>
                                                    </c:if>
                                                    <c:if test="${PoFrom == 'acknowledgePo'}">
                                                    <li class="breadcrumb-item">Manage PO</li>
                                                    <li class="breadcrumb-item">Acknowledge PO</li>
                                                    </c:if>
                                                    <c:if test="${PoFrom == 'shortcutPo'}">
                                                    <li class="breadcrumb-item">Manage PO</li>
                                                    <li class="breadcrumb-item">Creation & Amend PO</li>
                                                    </c:if>
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
                                        <div class="card-body update-backgroud-color">
                                            <form action="#" class="needs-validation" method="post" id="createpoform" data-parsley-validate="" novalidate="">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" name="ro_companyCode" id="ro_companyCode" value="${companyCode}">
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
                                                <input type="hidden" id="PrType" name="PrType" value="">
                                                <input type="hidden" id="customerSeeded" name="customerSeeded" value="">
                                                <input type="hidden" name="dmsip" id="dmsip" value="${PONGwebserviceIp}">
                                                <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">
                                                <input type="hidden" name="ViewPrDoc_IP" id="ViewPrDoc_IP" value="${ViewPrDoc_IP}">
                                                <input type="hidden" name="PrIds" id="PrIds" value="${PrIds}">
                                                <input type="hidden" name="PoFrom" id="PoFrom" value="${PoFrom}">
                                                <input type="hidden" name="reqFrom" id="reqFrom" value="${reqFrom}">
                                                <input type="hidden" name="rfqid" id="rfqid" value="${rfqHeaderObj.rfqid}">
                                                <input type="hidden" name="vendorId" id="vendorId" value="${vendorObj.id}">
                                                <input type="hidden" name="vendorCompanyCode" id="vendorCompanyCode" value="${vendorObj.code}">
                                                <input type="hidden" name="VendorFinalizationTableDataArrayAsJsonString" id="VendorFinalizationTableDataArrayAsJsonString" value='${VendorFinalizationTableDataArrayAsJsonString}'>
                                                <input type="hidden" id="RequestType" name="RequestType" value="CreatePO">
                                                <input type="hidden" id="local_dev_uat" name="local_dev_uat" value="${local_dev_uat}">
                                                <input type="hidden" name="currentDate" id="currentDate" value="<fmt:formatDate value="<%= new java.util.Date()%>" pattern="yyyy-MM-dd" />">
                                                <input type="hidden" name="poDeliveryDate" id="poDeliveryDate" value="<fmt:formatDate value="<%= new java.util.Date()%>" pattern="dd MMM yyyy" />">
                                                <input type="hidden" name="PoNumber" id="PoNumber" value="${PoNumber}">
                                                <input type="hidden" name="Pid" id="Pid" value="${Pid}">
                                                <input type="hidden" name="editPoPid" id="editPoPid" value="${Pid}">
                                                <input type="hidden" name="isSignedPoUploaded" id="isSignedPoUploaded" value="">
                                                <input type="hidden" name="totalPoAmt" id="totalPoAmt" value="">
                                                <input type="hidden" name="totalPoAmtExcludingVendor" id="totalPoAmtExcludingVendor" value="">
                                                <input type="hidden" id="isConditionPopulateInHeader" name="isConditionPopulateInHeader" value="No">
                                                <input type="hidden" id="kalsmHiddenfield" name="kalsmHiddenfield">
                                                <input type="hidden" id="buyerUsername" name="buyerUsername" value="${buyer.username}">
                                                <input type="hidden" id="buyerEmailId" name="buyerEmailId" value="${buyer.emailid}">
                                                <input type="hidden" id="buyerFirstName" name="buyerFirstName" value="${buyer.firstname}">
                                                <input type="hidden" id="buyerLastName" name="buyerLastName" value="${buyer.lastname}">
                                                <input type="hidden" id="purchasingOrgHidden" name="purchasingOrgHidden" value="${newgenPrLineItemSingle.purchaseOrganization}">
                                                <input type="hidden" id="purchasingGrpHidden" name="purchasingGrpHidden" value="${newgenPrLineItemSingle.purchasingGroup}">
                                                <input type="hidden" id="incotermsReqFrom">
                                                <input type="hidden" id="PoRequestType" value="">
                                                <input type="hidden" id="draftPo" value="${draftPo}">
                                                <input type="hidden" id="draftPoExtId" value="${draftPoExtId}">
                                                <input type="hidden" id="draftPoVendorSno" value="">
                                                <input type="hidden" id="conditionHeaderReqFrom">
                                                <input type="hidden" id="PO_SequenceNO">
                                                <input type="hidden" id="newPrLineInsertionOrderId" value="">
                                                <input type="hidden" id="newRfqId" value="">
                                                <input type="hidden" id="newRfqLineRfqIdRfqLineIdInsertionOrderId" value="">
                                                <input type="hidden" id="ConfirmationControlForLine">
                                                <input type="hidden" id="TexCodeForLine">
                                                <input type="hidden" id="SegmentForLine">
                                                <input type="hidden" id="serviceAccountAssignmentDistribution">
                                                <input type="hidden" id="editAmendPoVendorCode">
                                                <input type="hidden" id="editAmendPoVendorId">
                                                <input type="hidden" id="regNoHidden">
                                                <input type="hidden" id="rfqIds">
                                                <input type="hidden" id="LineNoSerAccId">
                                                <input type="hidden" id="materialRequestFrom">
                                                <input type="hidden" id="errorTransactionStatus">
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
                                                                            <div class="form-group">
                                                                                <label for="companycodeHeader">Co-Code:</label>
                                                                                <c:if test="${PoFrom != 'shortcutPo'}">
                                                                                    <input type="text" class="form-control form-rounded" id="companycodeHeader" name="companycodeHeader" readonly="true">
                                                                                </c:if>
                                                                                <c:if test="${PoFrom == 'shortcutPo'}">
                                                                                    <select class="custom-select dropdown-height"  id="companycodeHeader" name="companycodeHeader" data-parsley-trigger="change" required="true">
                                                                                        <option value="">Select</option>
                                                                                        <c:forEach var="companyCode" items="${companyCodeList}" varStatus="status">
                                                                                            <option value="${companyCode}">${companyCode}</option>
                                                                                        </c:forEach>
                                                                                    </select>
                                                                                </c:if>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="typeOfPOHeader">Type of PO<span style="color:red;">*</span></label>
                                                                                <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height" id="typeOfPOHeader" name="typeOfPOHeader" data-parsley-trigger="change" required="true">
                                                                                    <option value="">Select</option>
                                                                                    <c:forEach var="potype" items="${PurchaseOrderTypeList}" varStatus="status">
                                                                                        <option value="${potype.type}">${potype.type}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendorcodeHeader">Vendor Name/Code</label> <a href="#" data-toggle="tooltip" data-placement="auto" title="Press enter key inside below text field to open vendor master"><i class="fa fa-info-circle" aria-hidden="true"></i></a>
                                                                                <input type="text" class="form-control form-rounded" id="vendorcodeHeader" name="vendorcodeHeader" placeholder="Press enter key to open vendor master">
                                                                                <!--<select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="vendorcodeHeader" name="vendorcodeHeader" data-parsley-trigger="change" data-parsley-length="[4,4]" required></select>-->                                                                                
                                                                            </div>
                                                                        </div>
                                                                        <%--<c:if test="${PoFrom == 'createpo' || PoFrom == 'byrfq' || PoFrom == 'editpo'}">--%>
                                                                        <!--<div class="col-xl-1 col-lg-1 col-md-1 col-sm-6 col-12">-->
                                                                        <div style="width: 100px; margin-top: 24px;">
                                                                            <div class="form-group">
                                                                                <label class="custom-control custom-checkbox inline">
                                                                                    <input type="checkbox" name="isAckReq" id="isAckReq" class="custom-control-input"><span class="custom-control-label" title="Is Acknowledgement Required ?">Is Ack Req</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <!--</div>-->
                                                                        <%--</c:if>--%>
                                                                        <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">-->
                                                                        <div style="width: 90px;">        
                                                                            <div class="form-group">
                                                                                <label for="">Doc. Date:</label>
                                                                                <input type="text" class="form-control form-rounded" id="docDateHeader" name="docDateHeader" readonly="true" value="<fmt:formatDate pattern="dd-MM-yyyy" value="<%=new java.util.Date()%>"></fmt:formatDate>">
                                                                                    <!--                                                                                <div class="input-group date" id="docDateHeader_div" data-target-input="nearest">
                                                                                                                                                                        <input type="text" class="form-control datetimepicker-input" id="docDateHeader" name="docDateHeader" data-target="#docDateHeader_div" readonly="true"/>
                                                                                                                                                                        <div class="input-group-append" data-target="#docDateHeader_div" data-toggle="datetimepicker">
                                                                                                                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>-->
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="display: none;" id="requestTypeDiv">
                                                                                <label for="requestType">Request Type:</label>
                                                                                <!--<input type="text" class="form-control form-rounded" id="requestType" name="requestType" value="Create Purchase Order" readonly="true">-->                                                                            
                                                                                <select class="custom-select dropdown-height" id="requestType" name="requestType">
                                                                                    <option value="">Select</option>
                                                                                    <option>Create Purchase Order</option>
                                                                                    <option>Amend Purchase Order</option>
                                                                                    <option>Delete Purchase Order</option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="display: none;" id="referenceDocTypeDiv">
                                                                                <label for="referenceDocType">Reference Doc Type:</label>
                                                                                <select class="custom-select dropdown-height" id="referenceDocType" name="referenceDocType" disabled="true">
                                                                                    <option value="">Select</option>
                                                                                    <!--<option>N/A</option>-->
                                                                                    <!--<option>Outline Argument</option>-->
                                                                                    <option>RFQ</option>
                                                                                    <option>Purchase Requisition</option>
                                                                                    <!--<option>purchase Order</option>-->
                                                                                </select>
                                                                            </div>
                                                                        <c:if test="${PoFrom == 'shortcutPo'}">            
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="display: none;" id="poNumberDiv">
                                                                                <div class="form-group">
                                                                                    <label for="poNumber">PO Number:</label>
                                                                                    <input type="text" class="form-control form-rounded" id="poNumber" name="poNumber" value="" placeholder="Enter PO Number to fetch details." disabled="true">
                                                                                </div>
                                                                            </div>
                                                                        </c:if>            
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" style="display: none;" id="prTypeDiv">
                                                                            <label for="requestType">PO Type:</label>
                                                                            <select class="custom-select dropdown-height" id="prType" name="prType" disabled="true">
                                                                                <option value="">Select</option>
                                                                                <option>Material</option>
                                                                                <option>Service</option>
                                                                            </select>
                                                                        </div>        

                                                                        <c:if test="${PoFrom == 'byrfq'}">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="rfqNumber">RFQ Number: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" value="${rfqHeaderObj.rfqNumber}" readonly="true">
                                                                                </div>
                                                                            </div>
                                                                        </c:if>
                                                                        <c:if test="${PoFrom == 'editpo' || PoFrom == 'acknowledgePo'}">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="poNumber">PO Number:</label>
                                                                                    <input type="text" class="form-control form-rounded" id="poNumber" name="poNumber" value="${PoNumber}" disabled="true">
                                                                                </div>
                                                                            </div>
                                                                        </c:if>
                                                                        <c:if test="${PoFrom == 'editApprovedPo'}">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="fetchPoNumber">PO Number:</label>
                                                                                    <input type="text" class="form-control form-rounded" id="poNumber" name="poNumber" placeholder="Enter PO Number to fetch details." value="">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <button type="button" title='Download Signed PO Copy' style="margin-top: 25px;" class='btn btn-primary btn-sm downloadSignedPoCopyFromDMS'><i class='fa fa-download'></i> Signed PO Copy</button>
                                                                                </div>
                                                                            </div>
                                                                        </c:if>
                                                                        <c:if test="${PoFrom == 'acknowledgePo'}">
                                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-primary btn-sm" id="uploadSignedPOCopyBtn">Upload Signed PO Copy</button>
                                                                                </div>
                                                                            </div>
                                                                        </c:if>
                                                                    </div>
                                                                    <div class="row">                                                                        

                                                                        <!--                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                                                                                    <label for="referenceDocNumber">Reference Doc Number:</label>
                                                                                                                                                    <select class="custom-select dropdown-height" id="referenceDocNumber" name="referenceDocNumber">
                                                                        
                                                                                                                                                    </select>
                                                                                                                                                </div>
                                                                                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                                                                                    <label for="referenceDocLine">Reference Doc Line:</label>
                                                                                                                                                    <select class="custom-select dropdown-height" id="referenceDocLine" name="referenceDocLine">
                                                                        
                                                                                                                                                    </select>
                                                                                                                                                </div>-->

                                                                    </div>

                                                                </div>
                                                                <!--</div>-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="card box">
                                                    <div class="rightCircle" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                                    <div class="tab-regular collapseDiv collapseDivHeader">
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
                                                            <!--                                                            <li class="nav-item">
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
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="headerText_linelevel" data-toggle="tab" href="#headerText_linelevel-tab" role="tab" aria-controls="headerText_linelevel" aria-selected="false">Header Text</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="statusTab" data-toggle="tab" href="#status-tab" role="tab" aria-controls="statusTab" aria-selected="false">Status</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" id="approvalDetailsTab" data-toggle="tab" href="#approvalDetails-tab" role="tab" aria-controls="approvalDetailsTab" aria-selected="false">Approval Details</a>
                                                            </li>
                                                        </ul>
                                                        <div class="tab-content update-backgroud-color">
                                                            <div class="tab-pane fade show active" id="deliveryInvoice-tab" role="tabpanel" aria-labelledby="deliveryInvoice-tab">
                                                                <!--<div class="card-body">-->
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="paymentTermsDelivery" class="inline">Payment Terms:</label>
                                                                                <select data-placeholder="Select..." tabindex="1" class="custom-select dropdown-height payment-term-custom-select inline" id="paymentTermsDelivery" name="paymentTermsDelivery" style="width:240px;" data-parsley-trigger="change" data-parsley-length="[4,4]">
                                                                                    <option value="">Select</option>
                                                                                </select>
                                                                                <label for="" class="inline"></label>
                                                                                <label for="currencyDeliveryInvoice" class="inline" style="margin-left: 250px;">Currency:</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="CurrencyDeliveryInvoice" name="CurrencyDeliveryInvoice" style="width: 100px;margin-left: 42px;" required>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group two">
                                                                                <label for="paymentDays1" class="inline">Payment in:</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="paymentDays1" name="paymentDays1" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                <label for="PaymentTerms" class="inline">days</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="paymentPer1" name="paymentPer1" style="width: 100px;" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                <label for="PaymentTerms" class="inline">%</label>
                                                                                <label for="ExchangeRate" class="inline" style="margin-left: 240px;">Exchange Rate</label>
                                                                                <input type="number" class="form-control form-rounded inline" id="ExchangeRate" name="ExchangeRate" style="width: 100px;margin-left: 10px;" data-parsley-trigger="change" data-parsley-maxlength="9" required="true">
                                                                                <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                    <input type="checkbox" style="padding-bottom :-50px;" name="ExchangeReateFixed" id="ExchangeReateFixed" class="custom-control-input"><span class="custom-control-label" required="">Exchange Rate Fixed</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group two">
                                                                                <label for="downPaymentReqd">Downpayment Reqd.</label>
                                                                                <select class="custom-select dropdown-height inline" id="downPaymentReqd" style="width: 100px;margin-left: 106px;" name="downPaymentReqd" data-parsley-trigger="change" required="true">
                                                                                    <option value="">Select</option>
                                                                                    <option>Yes</option>
                                                                                    <option>No</option>
                                                                                </select>
                                                                                <label for="downPaymentReqdValue" class="inline" style="margin-left:260px;">Value<span style="color:red;">*</span>:</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="downPaymentReqdValue" style="width:100px;margin-left: 50px;" name="downPaymentReqdValue" data-parsley-trigger="change" data-parsley-maxlength="11" disabled="true">
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
                                                                                <input type="text" class="form-control form-rounded inline" id="paymentDays2" name="paymentDays2" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                <label for="PaymentTerms" class="inline">days</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="paymentPer2" name="paymentPer2" style="width: 100px;" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                <label for="PaymentTerms" class="inline">%</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group two">
                                                                                <label for="PaymentTerms" class="inline">Payment in:</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="paymentDaysNet" name="paymentDaysNet" style="width: 100px;margin-left: 25px;" style="width: 100px;margin-left: 25px;" data-parsley-trigger="change" data-parsley-maxlength="3">&nbsp 
                                                                                <label for="PaymentTerms" class="inline">days net</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="form-group two">
                                                                                <label for="Incoterms" class="inline">Incoterms:</label>
                                                                                <input type="text" class="form-control form-rounded inline" id="IncoTermsPart1" name="IncoTermsPart1" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                <input type="text" class="form-control form-rounded inline" id="IncoTermsPart2" name="IncoTermsPart2" style="width: 300px;" data-parsley-trigger="change" data-parsley-maxlength="28" required="true">
                                                                                <label class="custom-control custom-checkbox inline" style=" margin-left: 10px;">
                                                                                    <input type="checkbox" style="padding-bottom :-50px;" name="GRMessage" id="GRMessage" class="custom-control-input"><span class="custom-control-label" required="">GR Message</span>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <!--</table>-->
                                                                <!--</div>-->
                                                            </div>
                                                            <div class="tab-pane fade show" id="conditions-tab" role="tabpanel" aria-labelledby="conditions-tab">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <!--Code added By Bittu on 06 May 2020-->
                                                                                <!--<a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowConditionsBtnId" style="margin-left: 20px;pointer-events: none;background-color:#007bff;"></i></a>-->
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
                                                                                <label for="streetVendorAddress" class="">Street<span style="color:red;">*</span></label>
                                                                                <input type="text" class="form-control form-rounded" id="streetVendorAddress" name="streetVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="250" required="true">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="houseNumberVendorAddress" class="">House Number<span style="color:red;">*</span></label>
                                                                                <input type="text" class="form-control form-rounded" id="houseNumberVendorAddress" name="houseNumberVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="250" required="true">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="postalCodeVendorAddress" class="">Postal Code:</label>
                                                                                <input type="text" class="form-control form-rounded" id="postalCodeVendorAddress" name="postalCodeVendorAddress" data-parsley-pattern="^[0-9]*$" data-parsley-trigger="change" data-parsley-maxlength="10">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="cityVendorAddress" class="">City:</label>
                                                                                <input type="text" class="form-control form-rounded" id="cityVendorAddress" name="cityVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="40">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="extTel" class="">Extension Tel:</label>
                                                                                <input type="text" class="form-control form-rounded" id="extTel" name="extTel" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="telephoneVendorAddress" class="">Telephone:</label>
                                                                                <input type="text" class="form-control form-rounded" id="telephoneVendorAddress" name="telephoneVendorAddress" data-parsley-pattern="^[0-9]*$" data-parsley-trigger="change" data-parsley-maxlength="30">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="extFax" class="">Extension Fax:</label>
                                                                                <input type="text" class="form-control form-rounded" id="extFax" name="extFax" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="faxVendorAddress" class="">Fax:</label>
                                                                                <input type="text" class="form-control form-rounded" id="faxVendorAddress" name="faxVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="30">
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
                                                                                <input type="text" class="form-control form-rounded" id="countryVendorAddress" name="countryVendorAddress" data-parsley-trigger="change" data-parsley-maxlength="15">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendorEmail" class="">Vendor Email:</label>
                                                                                <input type="text" class="form-control form-rounded" id="vendorEmail" name="vendorEmail" data-parsley-trigger="change">
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
                                                                                <label for="Salesperson" class="">Salesperson<span style="color:red;">*</span></label>
                                                                                <input type="text" class="form-control form-rounded" id="Salesperson" name="Salesperson" data-parsley-trigger="change" data-parsley-maxlength="30" required="true">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="YourReference" class="">Your Reference:</label>
                                                                                <input type="text" class="form-control form-rounded" id="YourReference" name="YourReference" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="Telephone" class="">Telephone:</label>
                                                                                <input type="text" class="form-control form-rounded" id="Telephone" name="Telephone" data-parsley-trigger="change" data-parsley-pattern="^[0-9]*$" data-parsley-maxlength="16">

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="OurReference" class="">Our Reference:</label>
                                                                                <input type="text" class="form-control form-rounded" id="OurReference" name="OurReference" data-parsley-trigger="change" data-parsley-maxlength="12">
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
                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowPartnersBtnId" style="margin-left: 20px;"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md- col-sm-12 col-12">
                                                                            <div class="table-responsive">
                                                                                <table class="table table-bordered" id="partnerTableId">
                                                                                    <thead class="table-header-color">
                                                                                        <tr class="border-0">
                                                                                            <th class="border-0 th-color" style="width: 20px;">Partner Function</th>
                                                                                            <th class="border-0 th-color">Name</th>
                                                                                            <th class="border-0 th-color" style="width:120px;">Number</th>
                                                                                            <th class="border-0 th-color">Vendor Name</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td><input type="text" class="form-control form-rounded TabPartnerFunction"></td>
                                                                                            <td><input type="text" class="form-control form-rounded TabPartnerFunctionName" readonly></td>
                                                                                            <td><input type="text" class="form-control form-rounded TabPartnerNumber"></td>
                                                                                            <td><input type="text" class="form-control form-rounded TabPartnerFunctionVendorName" readonly></td>
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

                                                                <!--<h5>Additional Data</h5>-->
                                                                <!--<div id="" class="" aria-labelledby="headingEight" data-parent="#accordion3">-->
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="CollectiveNumber" class="">Collective Number:</label>
                                                                                <input type="text" class="form-control form-rounded" id="CollectiveNumber" name="CollectiveNumber" data-parsley-trigger="change" data-parsley-maxlength="10">

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
                                                                                <label for="purchasingOrg" class="">Purchasing Organization<span style="color:red;">*</span></label>
                                                                                <input type="text" class="form-control form-rounded disable-click-event" id="purchasingOrg" name="purchasingOrg" data-parsley-trigger="change" data-parsley-maxlength="4" readonly="true">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="purchasingGroup" class="">Purchasing Group<span style="color:red;">*</span></label>
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
                                                            <div class="tab-pane fade show" id="headerText_linelevel-tab" role="tabpanel" aria-labelledby="headerText_linelevel-tab">
                                                                <div class="card-body">
                                                                    <div class="row"> 
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="headerTextOptionDiv">
                                                                                <!--<label for="ShippingInstruction" class="inline" style="margin-left:10px;">Shipping Instruction:</label>-->
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
                                                                                        <label for="headerText" class="">Header Text:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="headerText" name="headerText" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="HeaderNoteDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="HeaderNote" class="">Header Note:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="HeaderNote" name="HeaderNote" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;" readonly="true"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="PricingTypesdiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="PricingTypes" class="">Pricing Types:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="PricingTypes" name="PricingTypes" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="DeadlinesDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="Deadlines" class="">Deadlines:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="Deadlines" name="Deadlines" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="TermsofDeliveryDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="TermsofDelivery" class="">Terms of Delivery:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="TermsofDelivery" name="TermsofDelivery" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="TermsofPaymentDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="TermsofPayment" class="">Terms of Payment:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="TermsofPayment" name="TermsofPayment" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="ShippingInstructionsDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="ShippingInstructions" class="">Shipping Instructions:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="ShippingInstructions" name="ShippingInstructions" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="VendorMemoGeneralDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="VendorMemoGeneral" class="">Vendor Memo (General):</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="VendorMemoGeneral" name="VendorMemoGeneral" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>                                                                        
                                                                            </div>
                                                                            <div class="row">                                                                        
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="VendorMemoSpecialDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="VendorMemoSpecial" class="">Vendor Memo (Special):</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="VendorMemoSpecial" name="VendorMemoSpecial" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>                                                                        
                                                                                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="poNotesToApproverDiv" style='display:none;'>
                                                                                    <div class="form-group">
                                                                                        <label for="pONotetoApproverHeaderTextsLimits" class="">PO Note to Approver:</label>
                                                                                        <textarea class="form-control form-rounded" rows="5" id="pONotetoApproverHeaderTextsLimits" name="pONotetoApproverHeaderTextsLimits" data-parsley-trigger="change" data-parsley-maxlength="5000" required="true" style="height:250px;"></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="tab-pane fade show" id="status-tab" role="tabpanel" aria-labelledby="status-tab">
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
                                                            <div class="tab-pane fade show" id="approvalDetails-tab" role="tabpanel" aria-labelledby="approvalDetails-tab">
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
                                                            <div class="card-body update-backgroud-color">
                                                                <c:if test="${PoFrom == 'editpo' || PoFrom == 'editApprovedPo'}">
                                                                    <button type="button" class="btn btn-warning btn-sm" id="addNewPrLineBtn" title="Add PR Line" disabled="true"><i class="fa fa-plus"></i> PR Line</button>
                                                                    <button type="button" class="btn btn-warning btn-sm" id="addRfqLineBtn" title="Add RFQ Line" disabled="true"><i class="fa fa-plus"></i> RFQ Line</button>
                                                                    <button type="button" class="btn btn-warning btn-sm" id="addEmptyPoLineBtn" title="Add Empty PO Line" disabled="true"><i class="fa fa-plus"></i> New Line</button>                                                                    
                                                                    <br>
                                                                </c:if>
                                                                <c:if test="${PoFrom == 'shortcutPo'}">
                                                                    <button type="button" class="btn btn-warning btn-sm" id="addNewPrLineBtn" title="Add PR Line" disabled="true"><i class="fa fa-plus"></i> PR Line</button>
                                                                    <button type="button" class="btn btn-warning btn-sm" id="addRfqLineBtn" title="Add RFQ Line" disabled="true"><i class="fa fa-plus"></i> RFQ Line</button>
                                                                    <button type="button" class="btn btn-warning btn-sm" id="addEmptyPoLineBtn" title="Add Empty PO Line" disabled="true"><i class="fa fa-plus"></i> New Line</button>
                                                                    <br>
                                                                </c:if>    
                                                                <div class="table-responsive" style="height: 260px;">
                                                                    <table class="table table-bordered material_table-header-color" id="material_headerClass">
                                                                        <thead class="">
                                                                            <tr class="border-0">
                                                                                <th class="border-0"></th>                            <%--0--%>
                                                                                <th class="border-0">Itm</th>                         <%--1--%>
                                                                                <th class="border-0">AA</th>                          <%--2--%>               
                                                                                <th class="border-0">I. Catg</th>                     <%--3--%> 
                                                                                <th class="border-0">Material</th>                    <%--4--%> 
                                                                                <th class="border-0">Short Text</th>                  <%--5--%>
                                                                                <th class="border-0">PO Qty</th>                      <%--6--%>
                                                                                <th class="border-0">UOM</th>                         <%--7--%>
                                                                                <th class="border-0">OPU</th>                         <%--8--%>
                                                                                <th class="border-0">Criticality</th>                 <%--9--%>
                                                                                <th class="border-0">Catg</th>                        <%--10--%>
                                                                                <th class="border-0">Deliv. Date</th>                 <%--11--%>
                                                                                <th class="border-0">Net Price</th>                   <%--12--%>
                                                                                <th class="border-0">Currency</th>                    <%--13--%>
                                                                                <th class="border-0">Per</th>                         <%--14--%>
                                                                                <th class="border-0">Matl Group</th>                  <%--15--%>
                                                                                <th class="border-0">Plnt</th>                        <%--16--%>
                                                                                <th class="border-0">Stor. Location</th>              <%--17--%>
                                                                                <th class="border-0">Batch</th>                       <%--18--%>
                                                                                <th class="border-0">Track. No</th>                   <%--19--%>
                                                                                <th class="border-0">Info Record</th>                 <%--20--%>
                                                                                <th class="border-0">Pur. Org</th>                    <%--21--%>
                                                                                <th class="border-0">Pur. Group</th>                  <%--22--%>
                                                                                <th class="border-0">PR No</th>                       <%--23--%>
                                                                                <th class="border-0">PR Itm No</th>                   <%--24--%>
                                                                                <th class="border-0">Requisitioner</th>               <%--25--%>
                                                                                <th class="border-0">PR Creator</th>                  <%--26--%>
                                                                                <th class="border-0">PR Dept</th>                     <%--27--%>
                                                                                <th class="border-0">Higher Level Item</th>           <%--28--%>
                                                                                <th class="border-0">Sub Item Category</th>           <%--29--%>
                                                                                <th class="border-0">IM Material</th>                 <%--30--%>
                                                                                <th class="border-0">Returns Item</th>                <%--31--%>
                                                                                <th class="border-0">FOC</th>                         <%--32--%>
                                                                                <th class="border-0">RFQ</th>                         <%--33--%>
                                                                                <th class="border-0">RFQ Itm</th>                     <%--34--%>
                                                                                <th class="border-0"></th>                            <%--35--%>
                                                                                    <c:if test="${PoFrom == 'editpo' || PoFrom == 'editApprovedPo' || PoFrom == 'shortcutPo'}">
                                                                                    <th class="border-0"></th>
                                                                                    </c:if>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody class="update-backgroud-color">
                                                                            <c:forEach var="newgen" items="${newgenPrLineItem}" varStatus="status">
                                                                                <tr>
                                                                                    <td>
                                                                                        <c:if test="${PoFrom == 'createpo'}">
                                                                                            <input type="hidden" class="insertionOrderId_Class" value="${newgen.insertionOrderId}">
                                                                                        </c:if>
                                                                                        <c:if test="${PoFrom == 'byrfq'}">
                                                                                            <input type="hidden" class="insertionOrderId_Class" value="${newgen.insertionOrderId * status.count * 10}">
                                                                                        </c:if>
                                                                                        <i title='Delete PO Line' class='fa fa-window-close btn-lg delete-pr-line' aria-hidden='true'></i>
                                                                                        <input type="hidden" class="linkId_Class" value="${newgen.linkId}">
                                                                                        <input type="hidden" class="procInstId_Class" value="${newgen.procInstId}">
                                                                                        <input type="hidden" class="prType_Class" value="${newgen.prType}">
                                                                                        <input type="hidden" class="prNumber_Class" value="${newgen.purchaseRequestNumber}">
                                                                                        <input type="hidden" class="PRItemNumber_Class" value="${status.count * 10}">
                                                                                        <input type="hidden" class="PRCompanyCode_Class" value="${newgen.company}">
                                                                                        <input type="hidden" class="PODistribution">
                                                                                        <input type="hidden" class="POPartialInvoiceIndicator">
                                                                                        <input type="hidden" class="ValuationPrice" value="${newgen.valuationPrice}">
                                                                                        <input type="hidden" class="isPrSaved" value="No">
                                                                                        <input type="hidden" class="prTaxAmount" value="">
                                                                                        <input type="hidden" class="prComments"> 
                                                                                        <input type="hidden" class="noLimitHidden" value="${newgen.noLimit}">
                                                                                        <input type="hidden" class="overAllLimitHidden" value="${newgen.overAllLimit}">
                                                                                        <input type="hidden" class="expectedValueHidden" value="${newgen.expectedValue}">
                                                                                        <input type="hidden" class="invoiceReceiptHidden" value="${newgen.invoiceReceipt}">
                                                                                        <input type="hidden" class="goodsReceiptHidden" value="${newgen.goodsReceipt}">
                                                                                        <input type="hidden" class="prMaterialCodeHidden" value="${newgen.materialCode}">
                                                                                        <input type="hidden" class="prDeliveryDateCategoryHidden" value="${newgen.deliveryDateCategory}">
                                                                                        <input type="hidden" class="prRequisitionDateHidden" value="<fmt:formatDate value="${newgen.reqDate}" pattern="dd.MM.yyyy" />">
                                                                                        <input type="hidden" class="prCompanyCodeHidden" value="${newgen.company}">
                                                                                        <input type="hidden" class="prMaterialLongTextHidden" value="${newgen.materialLongText}">
                                                                                        <input type="hidden" class="prCriticalityHidden" value="${newgen.criticality}">
                                                                                        <input type="hidden" class="prOrderPriceUnitHidden" value="">
                                                                                        <input type="hidden" class="ConfirmationControlForLineInPr">
                                                                                        <input type="hidden" class="TexCodeForLineInPr">
                                                                                        <input type="hidden" class="SegmentForLineInPr">
                                                                                        <input type="hidden" class="prPackageNo">
                                                                                        <input type="hidden" class="serviceRefLineNo">
                                                                                        <input type="hidden" class="lineType" value="N">
                                                                                        <input type="hidden" class="isPoLineOrPrLineOrRfqLineOrEmptyLine" value="CreatePrLine">
                                                                                        <input type="hidden" class="prRfqNumber">
                                                                                        <input type="hidden" class="prRfqLineItemNumber">
                                                                                        <input type="hidden" class="quantityBeforeChange" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${newgen.remainingQuantity}"/>">
                                                                                        <input type="hidden" class="prMfrPartNumber">
                                                                                        <input type="hidden" class="prManufacturer">
                                                                                        <input type="hidden" class="prNetPriceHidden">
                                                                                        <input type="hidden" class="timeOfChangeCurrency" value='before'>
                                                                                        <input type="hidden" class="totalQuantityOfThisLine" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${newgen.remainingQuantity}"/>">
                                                                                    </td>
                                                                                    <td>
                                                                                        ${status.count * 10}
                                                                                    </td>
                                                                                    <td id="assignmentId">
                                                                                        <input type="text" class="form-control form-rounded accountAssignmentClass" value="${newgen.accountAssignment}" disabled="true" style="width:35px;">
                                                                                        <input type="hidden" class="accountAssignmentDescClass">
                                                                                    </td>
                                                                                    <td id="itemCategTdId">
                                                                                        <input type="text" class="form-control form-rounded itemCategoryClass" value="${newgen.itemCategory}" disabled="true" style="width:35px;">
                                                                                        <input type="hidden" class="itemCategoryDescClass">
                                                                                    </td>
                                                                                    <td><input type='text' class='materialCodeClass form-control form-rounded' value="${newgen.materialCode}" style='width:100px;' disabled="true"></td>
                                                                                    <td><input type="text" class="form-control form-rounded pr-short-text" value="${newgen.shortText}" style='width:340px;' disabled="true"></td>
                                                                                    <td>
                                                                                        <c:if test="${PoFrom == 'createpo'}">
                                                                                            <input type="text" class="form-control form-rounded pr-quantity" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${newgen.remainingQuantity}"/>" style='width:150px;'>
                                                                                        </c:if>
                                                                                        <c:if test="${PoFrom == 'byrfq'}">
                                                                                            <input type="text" class="form-control form-rounded pr-quantity" value="" style='width:150px;'>
                                                                                        </c:if>
                                                                                    </td>
                                                                                    <td><input type='text' class='prUom form-control form-rounded' style='width:70px;' value="${newgen.unit}" disabled="true"></td>
                                                                                    <td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value=""></td>
                                                                                    <td><input type='text' class='criticalityClass form-control form-rounded' value="${newgen.criticality}" style='width:150px;' disabled="true"></td>
                                                                                    <td><input type='text' class='prDeliveryDateCat form-control form-rounded' value="${newgen.deliveryDateCategory}" readonly="true" style="width:40px;"></td>
                                                                                    <td>
                                                                                        <span class="PR_DeliveryDate">${newgen.deliveryDate}</span>
                                                                                        <input type="hidden" class="prDeliveryDatepicker">
                                                                                    <td>
                                                                                        <c:choose>
                                                                                            <c:when test="${newgen.accountAssignment == 'U' and newgen.itemCategory == 'D'}">
                                                                                                <input type="text" class="form-control form-rounded pr-net-price" value="<fmt:formatNumber type="number" minFractionDigits="2" value="${newgen.expectedValue}"/>" style='width:150px;'>
                                                                                            </c:when>
                                                                                            <c:otherwise>
                                                                                                <input type="text" class="form-control form-rounded pr-net-price" value="" style='width:150px;'>
                                                                                            </c:otherwise>
                                                                                        </c:choose>    
                                                                                    </td>
                                                                                    <td><input type='text' class='currencyClass form-control form-rounded' value="${newgen.currency}" disabled="true" style='width:70px;'></td>
                                                                                    <td><input type="text" class='priceUnitClass form-control form-rounded' value="<fmt:formatNumber type="number" minFractionDigits="2" value="${newgen.priceUnit}"/>" disabled="true" style='width:150px;'></td>
                                                                                    <td><input type='text' class='materialGroupClass form-control form-rounded' value="${newgen.materialGroup}" disabled="true" style='width:100px;'></td>
                                                                                    <td><input type="text" class="hiddenPlantCode form-control form-rounded" value="${newgen.plantCode}" disabled="true" style='width:70px;'></td>
                                                                                    <td><input type="text" class="storageLocationClass form-control form-rounded" value="${newgen.storageLocation}" disabled="true" style='width:100px;'></td>
                                                                                    <td></td>
                                                                                    <td><input type="text" class="form-control form-rounded pr-tracking-number" value="${newgen.departmentDescription}" style='width:70px;'></td>
                                                                                    <td>${newgen.infoRecord}</td>
                                                                                    <td><input type="text" class="purchaseOrganizationClass form-control form-rounded" value="${newgen.purchaseOrganization}" disabled="true" style='width:70px;'></td>
                                                                                    <td><input type="text" class="purchasingGroupClass form-control form-rounded" value="${newgen.purchasingGroup}" disabled="true" style='width:100px;'></td>
                                                                                    <td>${newgen.purchaseRequestNumber}</td>
                                                                                    <td>${newgen.itemNumber}</td>
                                                                                    <td><input type="text" class="form-control form-rounded pr-requisitioner-id" value="${newgen.requisitionerId}" style='width:200px;' disabled="true"></td>
                                                                                    <td>${newgen.prCreator}</td>
                                                                                    <td><input type='text' class='prDeptNameClass form-control form-rounded' value="" disabled="true" style='width:200px;'></td>
                                                                                    <td></td>
                                                                                    <td><input type="text" class="prUom form-control form-rounded" style='width:50px;' readonly="true"></td>                                                                                    
                                                                                    <td><input type="text" class="prImMaterial form-control form-rounded" style='width:100px;' readonly="true"></td>
                                                                                    <td><input type="checkbox" class="prReturnsItem"></td>
                                                                                    <td><input type="checkbox" class="prFreeOfCharge"></td>
                                                                                    <td><input type="text" class="pr-rfq-Number form-control form-rounded" style='width:150px;' readonly="true"></td>
                                                                                    <td><input type="text" class="pr-rfq-line-item-number form-control form-rounded" style='width:70px;' readonly="true"></td>
                                                                                    <td>
                                                                                        <c:if test="${PoFrom == 'createpo'}">
                                                                                            <button type="button" class="btn btn-success btn-sm viewPrDoc">View PR Doc</button> 
                                                                                            <button type="button" class="btn btn-success btn-sm viewPrLineItemDoc">View PR Line Item Doc</button>
                                                                                        </c:if>
                                                                                        <c:if test="${PoFrom == 'byrfq'}">
                                                                                            <button type="button" class="btn btn-success btn-sm viewRfqDoc">View RFQ Doc</button>
                                                                                        </c:if>
                                                                                    </td>
                                                                                    <c:if test="${PoFrom == 'editpo' || PoFrom == 'editApprovedPo' || PoFrom == 'shortcutPo'}">
                                                                                        <td></td>
                                                                                    </c:if>
                                                                                </tr>
                                                                            </c:forEach>

                                                                            <c:if test="${draftPo == 'Yes'}">
                                                                                <c:forEach var="newgen" items="${cmplxPoCreationLineItemPoDraftList}" varStatus="status">
                                                                                    <tr>
                                                                                        <td>
                                                                                            <c:if test="${PoFrom == 'createpo' || PoFrom == 'byrfq'}">
                                                                                                <i title='Delete PO Line' class='fa fa-window-close btn-lg delete-pr-line' aria-hidden='true'></i>
                                                                                            </c:if>
                                                                                            <c:if test="${PoFrom == 'editApprovedPo' || PoFrom == 'editpo' || PoFrom == 'shortcutPo'}">
                                                                                                <c:if test="${newgen.isPoLineOrPrLineOrRfqLineOrEmptyLine == 'PoLine'}">
                                                                                                    <input type='checkbox' title='Select PR Line to delete' class='select-pr-to-delete'>
                                                                                                </c:if>
                                                                                                <c:if test="${newgen.isPoLineOrPrLineOrRfqLineOrEmptyLine == 'PrLine'}">
                                                                                                    <i class='fa fa-window-close fa-lg deleteNewAddedPrLine' title='Delete'></i>
                                                                                                </c:if>
                                                                                                <c:if test="${newgen.isPoLineOrPrLineOrRfqLineOrEmptyLine == 'RfqLine'}">
                                                                                                    <i class='fa fa-window-close fa-lg deleteRfqLine' title='Delete'></i>
                                                                                                </c:if>
                                                                                                <c:if test="${newgen.isPoLineOrPrLineOrRfqLineOrEmptyLine == 'EmptyLine'}">
                                                                                                    <i class='fa fa-window-close fa-lg deleteEmptyPoLine' title='Delete'></i>
                                                                                                </c:if>
                                                                                            </c:if>                                                                                            
                                                                                            <input type="hidden" class="insertionOrderId_Class" value="${newgen.prInsertionOrderId}">
                                                                                            <input type="hidden" class="linkId_Class" value="${newgen.linkId}">
                                                                                            <input type="hidden" class="procInstId_Class" value="${newgen.procInstId}">
                                                                                            <input type="hidden" class="prType_Class" value="${newgen.purchaseRequestType}">
                                                                                            <input type="hidden" class="prNumber_Class" value="${newgen.purchaseRequestNumber}">
                                                                                            <input type="hidden" class="PRItemNumber_Class" value="${newgen.itemNumber}">
                                                                                            <input type="hidden" class="PRCompanyCode_Class" value="${newgen.companyCode}">
                                                                                            <input type="hidden" class="PODistribution" value="${newgen.poDistribution}">
                                                                                            <input type="hidden" class="POPartialInvoiceIndicator" value="${newgen.partialInvoiceIndicator}">
                                                                                            <input type="hidden" class="ValuationPrice" value="${newgen.valuationPrice}">
                                                                                            <input type="hidden" class="isPrSaved" value="${newgen.isPrSaved}">
                                                                                            <input type="hidden" class="prTaxAmount" value="${newgen.prTaxAmount}">
                                                                                            <input type="hidden" class="prComments" value="${newgen.prComments}">
                                                                                            <input type="hidden" class="noLimitHidden" value="${newgen.noLimit}">
                                                                                            <input type="hidden" class="overAllLimitHidden" value="${newgen.overallLimit}">
                                                                                            <input type="hidden" class="expectedValueHidden" value="${newgen.expectedValue}">
                                                                                            <input type="hidden" class="invoiceReceiptHidden" value="${newgen.invReceipt}">
                                                                                            <input type="hidden" class="goodsReceiptHidden" value="${newgen.goodsReceipt}">
                                                                                            <input type="hidden" class="prMaterialCodeHidden" value="${newgen.materialCode}">
                                                                                            <input type="hidden" class="prDeliveryDateCategoryHidden" value="${newgen.deliveryDateCategory}">
                                                                                            <input type="hidden" class="prRequisitionDateHidden" value="<fmt:formatDate value="${newgen.requisitionDate}" pattern="dd.MM.yyyy" />">
                                                                                            <input type="hidden" class="prCompanyCodeHidden" value="${newgen.companyCode}">
                                                                                            <input type="hidden" class="prMaterialLongTextHidden" value="${newgen.materialLongText}">
                                                                                            <input type="hidden" class="prCriticalityHidden" value="${newgen.criticality}">
                                                                                            <input type="hidden" class="prOrderPriceUnitHidden" value="">
                                                                                            <input type="hidden" class="ConfirmationControlForLineInPr" value="${newgen.confirmationControlForLineInPr}">
                                                                                            <input type="hidden" class="TexCodeForLineInPr" value="${newgen.texCodeForLineInPr}">
                                                                                            <input type="hidden" class="SegmentForLineInPr" value="${newgen.segmentForLineInPr}">
                                                                                            <input type="hidden" class="prPackageNo" value="${newgen.prPackageNo}">
                                                                                            <input type="hidden" class="serviceRefLineNo" value="${newgen.serviceRefLineNo}">
                                                                                            <input type="hidden" class="lineType" value="${newgen.lineType}">
                                                                                            <input type="hidden" class="isPoLineOrPrLineOrRfqLineOrEmptyLine" value="${newgen.isPoLineOrPrLineOrRfqLineOrEmptyLine}">
                                                                                            <input type="hidden" class="prRfqNumber" value="${newgen.prRfqNumber}">
                                                                                            <input type="hidden" class="prRfqLineItemNumber" value="${newgen.prRfqLineItemNumber}">
                                                                                            <input type="hidden" class="quantityBeforeChange" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${newgen.quantityBeforeChange}"/>">
                                                                                            <input type="hidden" class="prMfrPartNumber" value="${newgen.mfrPartNumber}">
                                                                                            <input type="hidden" class="prManufacturer" value="${newgen.manufacturer}">
                                                                                            <!--EditAmend PO Hidden Fields-->
                                                                                            <input type="hidden" class="POLineItemPackageNo" value="${newgen.poLineItemPackageNo}">
                                                                                            <input type="hidden" class="POLineItemTaxCode" value="${newgen.poLineItemTaxCode}">
                                                                                            <input type="hidden" class="totalQuantityOfThisLine" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${newgen.totalQuantityOfThisLine}"/>">
                                                                                            <input type="hidden" class="parentPrLineInsertionOrderId" value="${newgen.parentPrLineInsertionOrderId}">
                                                                                            <input type="hidden" class="prgLCode" value="${newgen.prGLCode}">
                                                                                            <input type="hidden" class="przGLCode" value="${newgen.prZGLCode}">
                                                                                            <input type="hidden" class="rfqIdRfqLineIdInsertionOrderIdString" value="${newgen.rfqIdRfqLineIdInsertionOrderIdString}">
                                                                                            <input type="hidden" class="netPriceHidden" value="${newgen.unitPrice}">
                                                                                            <input type="hidden" class="prNetPriceHidden" value="${newgen.prNetPrice}">
                                                                                            <input type="hidden" class="timeOfChangeCurrency" value='before'>
                                                                                        </td>
                                                                                        <td>
                                                                                            ${newgen.itemNumber}
                                                                                        </td>
                                                                                        <td id="assignmentId">
                                                                                            <input type="text" class="form-control form-rounded accountAssignmentClass" value="${newgen.accountAssignment}" disabled="true" style="width:35px;">
                                                                                            <input type="hidden" class="accountAssignmentDescClass">
                                                                                        </td>
                                                                                        <td id="itemCategTdId">
                                                                                            <input type="text" class="form-control form-rounded itemCategoryClass" value="${newgen.itemCategory}" disabled="true" style="width:35px;">
                                                                                            <input type="hidden" class="itemCategoryDescClass">
                                                                                        </td>
                                                                                        <td><input type='text' class='materialCodeClass form-control form-rounded' value="${newgen.materialCode}" style='width:100px;' disabled="true"></td>
                                                                                        <td><input type="text" class="form-control form-rounded pr-short-text" value="${newgen.shortText}" style='width:340px;' disabled="true"></td>
                                                                                        <td><input type="text" class="form-control form-rounded pr-quantity" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${newgen.quantity}"/>" style='width:150px;'></td>
                                                                                        <td><input type='text' class='prUom form-control form-rounded' style='width:70px;' value="${newgen.unit}" disabled="true"></td>
                                                                                        <td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value="${newgen.orderPriceUnit}"></td>
                                                                                        <td>
                                                                                            <input type='text' class='criticalityClass form-control form-rounded materialCriticality' value="${newgen.criticality}" style='width:150px;display:none;' disabled="true">
                                                                                            <select style='width:150px;display:none;' class='custom-select criticalityClass serviceCriticality'>
                                                                                                <option value=''>Select</option>
                                                                                                <option value='High Criticality (h)'>High Criticality (h)</option>
                                                                                                <option value='Low Criticality (l)'>Low Criticality (l)</option>
                                                                                                <option value='Off Site (o)'>Off Site (o)</option>
                                                                                                <option value='Manpower (m)'>Manpower (m)</option>
                                                                                            </select>
                                                                                        </td>
                                                                                        <td><input type='text' class='prDeliveryDateCat form-control form-rounded' value="${newgen.deliveryDateCategory}" readonly="true" style="width:40px;"></td>
                                                                                        <td>
                                                                                            <span class="PR_DeliveryDate">${newgen.deliveryDate}</span>
                                                                                            <input type="hidden" class="prDeliveryDatepicker">
                                                                                        <td>
                                                                                            <c:choose>
                                                                                                <c:when test="${newgen.accountAssignment == 'U' and newgen.itemCategory == 'D'}">
                                                                                                    <input type="text" class="form-control form-rounded pr-net-price" value="<fmt:formatNumber type="number" minFractionDigits="2" value="${newgen.unitPrice}"/>" style='width:150px;'>
                                                                                                </c:when>
                                                                                                <c:otherwise>
                                                                                                    <input type="text" class="form-control form-rounded pr-net-price" value="<fmt:formatNumber type="number" minFractionDigits="2" value="${newgen.unitPrice}"/>" style='width:150px;'>
                                                                                                </c:otherwise>
                                                                                            </c:choose>    
                                                                                        </td>
                                                                                        <td><input type='text' class='currencyClass form-control form-rounded' value="${newgen.currency}" disabled="true" style='width:70px;'></td>
                                                                                        <td><input type="text" class='priceUnitClass form-control form-rounded' value="<fmt:formatNumber type="number" minFractionDigits="2" value="${newgen.priceUnit}"/>" disabled="true" style='width:150px;'></td>
                                                                                        <td><input type='text' class='materialGroupClass form-control form-rounded' value="${newgen.materialGroup}" disabled="true" style='width:100px;'></td>
                                                                                        <td><input type="text" class="hiddenPlantCode form-control form-rounded" value="${newgen.plant}" disabled="true" style='width:70px;'></td>
                                                                                        <td><input type="text" class="storageLocationClass form-control form-rounded" value="${newgen.storageLocation}" disabled="true" style='width:100px;'></td>
                                                                                        <td>${newgen.batch}</td>
                                                                                        <td><input type="text" class="form-control form-rounded pr-tracking-number" value="${newgen.trackingNumber}" style='width:70px;'></td>
                                                                                        <td>${newgen.infoRecord}</td>
                                                                                        <td><input type="text" class="purchaseOrganizationClass form-control form-rounded" value="${newgen.purchasingOrganization}" disabled="true" style='width:70px;'></td>
                                                                                        <td><input type="text" class="purchasingGroupClass form-control form-rounded" value="${newgen.purchasingGroup}" disabled="true" style='width:100px;'></td>
                                                                                        <td>${newgen.purchaseRequestNumber}</td>
                                                                                        <td>${newgen.prItemNumber}</td>
                                                                                        <td><input type="text" class="form-control form-rounded pr-requisitioner-id" value="${newgen.requisitionerID}" style='width:200px;' disabled="true"></td>
                                                                                        <td>${newgen.prCreator}</td>
                                                                                        <td><input type='text' class='prDeptNameClass form-control form-rounded' value="${newgen.prDeptName}" disabled="true" style='width:200px;'></td>
                                                                                        <td>${newgen.higherLevelItem}</td>
                                                                                        <td>${newgen.subitemCategory}</td>                                                                                    
                                                                                        <td><input type="text" class="prImMaterial form-control form-rounded" style='width:100px;' readonly="true" value="${newgen.imMaterial}"></td>
                                                                                        <td><input type="checkbox" class="prReturnsItem"></td>
                                                                                        <td><input type="checkbox" class="prFreeOfCharge"></td>
                                                                                        <td><input type="text" class="pr-rfq-Number form-control form-rounded" style='width:150px;' readonly="true" value="${newgen.prRfqNumber}"></td>
                                                                                        <td><input type="text" class="pr-rfq-line-item-number form-control form-rounded" style='width:70px;' readonly="true" value="${newgen.prRfqLineItemNumber}"></td>
                                                                                        <td>
                                                                                            <c:if test="${PoFrom == 'createpo'}">
                                                                                                <button type="button" class="btn btn-success btn-sm viewPrDoc">View PR Doc</button> 
                                                                                                <button type="button" class="btn btn-success btn-sm viewPrLineItemDoc">View PR Line Item Doc</button>
                                                                                            </c:if>
                                                                                            <c:if test="${PoFrom == 'byrfq'}">
                                                                                                <button type="button" class="btn btn-success btn-sm viewRfqDoc">View RFQ Doc</button>
                                                                                            </c:if>
                                                                                        </td>
                                                                                        <c:if test="${PoFrom == 'editpo' || PoFrom == 'editApprovedPo' || PoFrom == 'shortcutPo'}">
                                                                                            <td></td>
                                                                                        </c:if>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </c:if>    
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
                                                <div class="card update-backgroud-color">
                                                    <div class="rightCircle2" ><i class="fas fa-minus-square fa-2x" id="" style=""></i></div>
                                                    <div class="tab-regular collapseDiv2 collapseDivLineLevel">
                                                        <br>
                                                        <label for="Item" class="inline" style="margin-left:10px;margin-bottom:20px;">Item:</label>
                                                        <select class="custom-select inline ItemNumberSelectClass" style="width:500px;margin-bottom:0px;margin-left:50px;" id="ItemNumberSelect" name="Item">
                                                            <c:forEach var="newgen" items="${newgenPrLineItem}" varStatus="status">
                                                                <c:if test="${PoFrom == 'createpo'}">
                                                                    <option value="${newgen.insertionOrderId}">${status.count * 10} - ${newgen.shortText}</option>
                                                                </c:if>
                                                                <c:if test="${PoFrom == 'byrfq'}">
                                                                    <option value="${newgen.insertionOrderId * status.count * 10}">${status.count * 10} - ${newgen.shortText}</option>
                                                                </c:if>
                                                            </c:forEach>
                                                            <c:if test="${draftPo == 'Yes'}">
                                                                <option value="">Select</option>
                                                                <c:forEach var="newgen" items="${cmplxPoCreationLineItemPoDraftList}" varStatus="status">
                                                                    <option value="${newgen.prInsertionOrderId}">${newgen.itemNumber} - ${newgen.shortText}</option>
                                                                </c:forEach>        
                                                            </c:if>
                                                        </select>

                                                        <!--<button type="button" class="btn btn-primary btn-sm" id="savePoLineItemData">Save</button>-->
                                                        <button type="button" class="btn btn-warning btn-sm" id="savePoLineSpinner" style="pointer-events: none;visibility: hidden;"><i class="fa fa-spinner fa-spin"></i></button>

                                                        <div id="lineLevelTabsDiv">
                                                            <ul class="nav nav-tabs nav-fill nav-tabs" id="myTab7" role="tablist">
                                                                <li class="nav-item" id="serviceTab_li">
                                                                    <a class="nav-link active" id="services" data-toggle="tab" href="#services-tab" role="tab" aria-controls="services" aria-selected="true">Services</a>
                                                                </li>
                                                                <li class="nav-item" id="limits_li">
                                                                    <a class="nav-link" id="limits" data-toggle="tab" href="#limits-tab" role="tab" aria-controls="limits" aria-selected="false">Limits</a>
                                                                </li>
                                                                <li class="nav-item">
                                                                    <a class="nav-link" id="material" data-toggle="tab" href="#material-tab" role="tab" aria-controls="material" aria-selected="false">Material</a>
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
                                                                <li class="nav-item" style="display: none;">
                                                                    <a class="nav-link" id="component_linelevel" data-toggle="tab" href="#component_linelevel-tab" role="tab" aria-controls="component_linelevel" aria-selected="false">Component</a>
                                                                </li>                                                                
                                                            </ul>
                                                            <div class="tab-content update-backgroud-color">
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
                                                                                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <!--<a><i type="buttom"  class="fas fa-save btn-primary btn-sm" title="save" id="serviceTabTableSaveBtn" aria-hidden="true"></i></a>-->
                                                                                            <c:if test="${PoFrom != 'createpo' && PoFrom != 'byrfq'}">
                                                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowServiceBtnId" style="margin-left: 20px;"></i></a>
                                                                                            </c:if>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="replicateServiceAccAssgnModelBtn_div" style="display: none;">
                                                                                        <div class="form-group">
                                                                                            <button type="button" id="replicateServiceAccAssBtn" class="btn btn-primary btn-sm" style="margin-left: 950px;">Replicate</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <input type="hidden" id="isServiceTabSaved" value="No">

                                                                                <div class="table-responsive" style="height:260px;">
                                                                                    <table class="table table-bordered" id="serviceTableId">
                                                                                        <thead class="table-header-color">
                                                                                            <tr class="border-0">
                                                                                                <th class="border-0"></th>
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
                                                                                                <th class="border-0">Serv. Text</th>
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
                                                                        <!--                                                                    <div class="form-group">
                                                                                                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addRowLimitTabBtnId" style="margin-left: 20px;"></i></a>
                                                                                                                                            </div>-->
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
                                                                </div>
                                                                <div class="tab-pane fade show" id="material-tab" role="tabpanel" aria-labelledby="material-tab">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="revisionLevel" class="">Revision Level: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="revisionLevel" name="revisionLevel" data-parsley-trigger="change" data-parsley-maxlength="100">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="vendMatNo" class="">Vend Mat No: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="vendMatNo" name="vendMatNo" data-parsley-trigger="change" data-parsley-maxlength="100">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="eanUpc" class="">EAN/UPC: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="eanUpc" name="eanUpc" readonly="true">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="vendorSubRange" class="">Vendor Sub-Range: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="vendorSubRange" name="vendorSubRange" data-parsley-trigger="change" data-parsley-maxlength="100">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="batch" class="">Batch: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="batch" name="batch" data-parsley-trigger="change" data-parsley-maxlength="100">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="vendorBatch" class="">Vendor Batch: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="vendorBatch" name="vendorBatch" data-parsley-trigger="change" data-parsley-maxlength="100">
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
                                                                                    <label for="stockType" class="">MFR Part Number: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="mfrPartNumber" name="mfrPartNumber" readonly="true">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="stockType" class="">Manufacturer: </label>
                                                                                    <input type="text" class="form-control form-rounded" id="manufacturer" name="manufacturer" readonly="true">
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
                                                                <div class="tab-pane fade show" id="quantities-tab" role="tabpanel" aria-labelledby="quantities-tab">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group" style="margin-bottom:0px;">
                                                                                    <label for="pOQuantity" class="">PO Quantity/Unit:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="pOQuantity" name="pOQuantity" style="width:150px;margin-left:50px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$" required="true" readonly>
                                                                                    <input type="text" class="form-control form-rounded inline" id="pOUnit" name="pOUnit" style="width:50px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true" readonly>
                                                                                    <label for="orderUnit" class="" style="margin-left:30px;">Order Unit</label>
                                                                                    <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                                    <label for="orderPriceUnit" class="inline" style="margin-left:5px;">Order Price Unit:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="orderUnit" name="orderUnit" style="width:80px;margin-left:30px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$" readonly>
                                                                                    <input type="text" class="form-control form-rounded inline" id="unitOrderUnit" name="unitOrderUnit" style="width:50px" readonly>
                                                                                    <label for="orderUnit" class="inline" style="margin-left:5px;"><h3><-></h3></label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="orderPriceUnit" name="orderUnit" style="width:80px;margin-left:5px;" data-parsley-trigger="change" data-parsley-maxlength="17" data-parsley-pattern="^[0-9]*\.[0-9]{3}$" readonly>
                                                                                    <input type="text" class="form-control form-rounded inline" id="unitOrderPriceUnit" name="unitOrderPriceUnit" style="width:50px" readonly>
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
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="netWeight" class="">Net Weight: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeight" name="netWeight" style="width:150px;margin-left:55px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeightUnit" name="netWeightUnit" style="width:50px;"readonly="true">
                                                                                    / <input type="text" class="form-control form-rounded inline" id="netWeightPerPrice" name="netWeightPerPrice" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeightOrderUnit" name="netWeightUnit" style="width:50px;"readonly="true">
                                                                                    <label for="netWeight2" style="margin-left:111px;">Net Weight: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeight2" name="netWeight2" style="width:150px;margin-left:55px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="netWeightUnit2" name="netWeightUnit2" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="grossWeight">Gross Weight:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeight" name="grossWeight" style="width:150px;margin-left:42px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeightUnit" name="grossWeightUnit" style="width:50px;"readonly="true">
                                                                                    / <input type="text" class="form-control form-rounded inline" id="grossWeightPerPrice" name="grossWeightPerPrice" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeightOrderUnit" name="grossWeightUnit" style="width:50px;"readonly="true">
                                                                                    <label for="grossWeight2" style="margin-left:108px;">Gross Weight:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeight2" name="grossWeight2" style="width:150px;margin-left:42px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="grossWeightUnit2" name="grossWeightUnit2" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="volume" class="">Volume: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="volume" name="volume" style="width:150px;margin-left:77px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="volumeUnit" name="volumeUnit" style="width:50px;"readonly="true">
                                                                                    / <input type="text" class="form-control form-rounded inline" id="volumePerPrice" name="volumePerPrice" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="volumeOrderUnit" name="volumeUnit" style="width:50px;"readonly="true">
                                                                                    <label for="volume2" style="margin-left:108px;">Volume: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="volume2" name="volume" style="width:150px;margin-left:77px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="volumeUnit2" name="volumeUnit" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="points">Points:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="points" name="points" style="width:150px;margin-left:84px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="pointsUnit" name="pointsUnit" style="width:50px;"readonly="true">
                                                                                    / <input type="text" class="form-control form-rounded inline" id="pointsPerPrice" name="pointsPerPrice" style="width:70px;"readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="pointsOrderUnit" name="pointsUnit" style="width:50px;"readonly="true">
                                                                                    <label for="points2" style="margin-left:108px;">Points:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="points2" name="points2" style="width:150px;margin-left:84px;" readonly="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="pointsUnit2" name="pointsUnit2" style="width:50px;"readonly="true">
                                                                                    <label> /Item</label>
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
                                                                                <!--<a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveDeliverSch" aria-hidden="true" style="margin-left: 20px;margin-top:10px;"></i></a>-->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <input type="hidden" id="isDeliveryScheduleTabSaved" value="No">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive" style="height:260px;">
                                                                            <table class="table table-bordered deliveryScheduleTableClass" id="DeliveryScheduleTableId" style="width: 100%;">
                                                                                <thead class="table-header-color">
                                                                                    <tr class="">
                                                                                        <th class="border-1 th-color" style="width:50px;">D.D.Cat.</th>                            <%--0--%>         
                                                                                        <th class="border-1 th-color" style="width:300px;">Delivery Date</th>                      <%--1--%> 
                                                                                        <th class="border-1 th-color" style="width:300px;">Statistical Delivery Date</th>          <%--2--%>
                                                                                        <th class="border-1 th-color" style="width:150px;">Sch Qty</th>                            <%--3--%>
                                                                                        <th class="border-1 th-color" style="width:100px;">Time</th>                               <%--4--%>
                                                                                        <th class="border-1 th-color" style="width:100px;">Pur Req Num</th>                        <%--5--%> 
                                                                                        <th class="border-1 th-color" style="width:50px;">Req Item Num</th>                        <%--6--%>                                                                                   
                                                                                        <th class="border-1 th-color" style="width:150px;">GR Qty</th>                             <%--7--%>
                                                                                        <th class="border-1 th-color" style="width:150px;">Open Qty</th>                           <%--8--%>
                                                                                        <th class="border-1 th-color" style="width:150px;">Sch. Line</th>                          <%--9--%>
                                                                                        <th class="border-1 th-color" style="width:20px;"></th>                                    <%--10--%>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td><input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" name="deliveryDateCategoryId"></td>
                                                                                        <td><input readonly type="text" class="deliveryDateClass" style="width:150px;"> <input type="hidden" class="deliveryScheduleDatepicker"></td>
                                                                                        <td><input readonly type="text" class="statisticaldeliveryDateClass" style="width:150px;"> <input type="hidden" class="statisticalDeliveryScheduleDatepicker"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" name="scheduledQuantity" style="width:150px;"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" name="timeDeliveryScheduled"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" name="prNumberDeliveryScheduled" readonly="true"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" name="reqItemNumber" readonly="true"></td>                                                                                        
                                                                                        <td><input type="number" class="form-control form-rounded tableInputField grQuantityClass" name="grQuantityClass" readonly="true"></td>
                                                                                        <td><input type="number" class="form-control form-rounded tableInputField openQuantityClass" name="openQuantityClass" readonly="true"></td>
                                                                                        <td><input type="text" class="form-control form-rounded tableInputField schLineClass" name="schLineClass" value="1" readonly="true"></td>
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
                                                                                    <input type="number" class="form-control form-rounded inline" id="OverdeliveryTolerance" name="OverdeliveryTolerance" style="width:80px;margin-left:53px;" value="0.0" data-parsley-trigger="change" data-parsley-maxlength="5">
                                                                                    <!--<h5 class="inline">%</h5>-->
                                                                                    <label for="" class="inline">%</label>
                                                                                    <label class="custom-control custom-checkbox inline" style="margin-left:50px;padding-top:5px;">
                                                                                        <input type="checkbox" name="unlimited" id="unlimited" class="custom-control-input" disabled="true"><span class="custom-control-label" required=""></span>
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
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                                    <label for="Incoterms" class="inline">Incoterms:</label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="incoTermsPart1Delivery" name="incoTermsPart1Delivery" value="${perSettingsObj.incoTerms1Line}" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                    <input type="text" class="form-control form-rounded inline" id="incoTermsPart2Delivery" name="incoTermsPart2Delivery" style="width:300px;" data-parsley-trigger="change" data-parsley-maxlength="28">
                                                                                </div>
                                                                                <!--                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;">
                                                                                                                                                                    <label for="unlimitedInput" class="inline">Unlimited:</label>
                                                                                                                                                                    <input type="text" class="form-control form-rounded inline" id="unlimitedInput" name="unlimitedInput" style="width:150px;margin-left:35px;" readonly="true">
                                                                                                                                                                </div>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="align-center text-align-center">
                                                                                    <!--<input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveDeliveryBtn" value="Save">-->
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
                                                                                        <input type="checkbox" name="InvoiceReceipt" id="InvoiceReceipt" class="custom-control-input" disabled="true" checked="true"><span class="custom-control-label" required="">Yes</span>
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
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12" id="serviceBasedIVDiv">
                                                                                <div class="form-group">
                                                                                    <label for="serviceBasedIV" class="">Service based IV: </label>
                                                                                    <label class="custom-control custom-checkbox">
                                                                                        <input type="checkbox" name="serviceBasedIV" id="serviceBasedIV" class="custom-control-input" disabled="true" checked="true"><span class="custom-control-label" required="">Yes</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="TaxCode" class="">Tax Code:</label>
                                                                                    <input type="text" class="form-control form-rounded" id="TaxCode" name="TaxCode" data-parsley-trigger="change" data-parsley-maxlength="2" required="true">
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-secondary btn-sm" id="invoiceTaxes">Taxes</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <input type="hidden" id="isInvoiceTabSaved" value="No">

                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="align-center text-align-center">
                                                                                    <!--<input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveInvoiceBtn" value="Save">-->
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
                                                                                    <!--<a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="conditionDetailsAddRowBtn" aria-hidden="true" style="margin-left:1000px;"></i></a>-->
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
                                                                                                    <th class="border-1 th-color">Currency</th>
                                                                                                    <th class="border-1 th-color">Per</th>
                                                                                                    <th class="border-1 th-color">Condition Pricing Unit</th>
                                                                                                    <th class="border-1 th-color">UOM</th>
                                                                                                    <th class="border-1 th-color">Condition Value</th>
                                                                                                    <th class="border-1 th-color">Currency</th>
                                                                                                    <th class="border-1 th-color">Condition Value</th>
                                                                                                    <th class="border-1 th-color">Condition Currency</th>
                                                                                                    <!--<th class="border-1 th-color">Condition Detail</th>-->
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
                                                                </div>
                                                                <div class="tab-pane fade show" id="account_assignment-tab" role="tabpanel" aria-labelledby="account_assignment-tab">
                                                                    <div class="card-body">
                                                                        <!--<h5>Account Assignment</h5>-->
                                                                        <input type="hidden" id="isAccountAssignmentTabSaved" value="No">
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="accountAssignmentCategory" class="inline">Acc. Ass Category: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="accountAssignmentCategoryDisplay" name="accountAssignmentCategoryDisplay" style="width:200px;margin-left:25px;" disabled>
                                                                                    <input type="hidden" id="accountAssignmentCategory" name="accountAssignmentCategory">
                                                                                    <label for="distribution" class="inline" style="margin-left:50px;">Distribution: </label>
                                                                                    <select class="custom-select inline" id="distribution" name="distribution" style="width:200px;margin-left:25px;" disabled="true">
                                                                                        <option>Single Account Assignment</option>
                                                                                        <option>Distrib. On Quantity Basis</option>
                                                                                        <option>Distrib. By Percentage</option>
                                                                                    </select>
                                                                                    <label for="CoCode" class="inline" style="margin-left:50px;">Co Code: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="CoCode" name="CoCode" style="width:200px;margin-left:25px;" readonly="true">
                                                                                    <button type="button" id="replicateMainAccAssBtn" class="btn btn-primary btn-sm" style="margin-left: 135px;" title="Replicate this account assignment to all PO line having same account assingment category.">Replicate</button>
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
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" style="display:none;">
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
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFund" name="interCompanyFund" disabled style="width:100px;margin-left:43px;">
                                                                                    <label for="functionalArea" class="inline" id="interCompanyFunctionalAreaLabel" style="margin-left:15px;">Functional Area: </label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFunctionalArea" disabled name="interCompanyFunctionalArea" style="width:150px;margin-left:10px;">
                                                                                    <label for="fundCenter" class="inline" id="interCompanyFundCenterInputLabel" style="margin-left:20px;">Fund Center:</label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFundCenterInput" disabled name="interCompanyFundCenterInput" style="width:150px;margin-left:10px;">
                                                                                    <label for="commitmentItem" class="inline" id="interCompanyCommItemInputLabel" style="margin-left:15px;">Com Item:</label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyCommItemInput" disabled name="interCompanyCommItemInput" style="width:200px;margin-left:5px;">
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
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" style="display:none;">
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
                                                                        <!--<h5>texts</h5>-->
                                                                        <div class="row">
                                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="padding-top:3px;" id="headerTextOptionDiv">
                                                                                    <select class="custom-select" id="textTabOptionLineLevel" name="textTabOptionLineLevel" style="margin-top: 20px;">
                                                                                        <option value="materialPoText">Material PO Text</option>
                                                                                        <option value="itemText">Item Text</option>
                                                                                        <option value="infoRecordPoText">Info Record PO Text</option>
                                                                                        <option value="pONoteToApprover">PO Note To Approver</option>
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
                                                                                            <textarea class="form-control form-rounded" rows="5" id="MaterialPOText" name="MaterialPOText" readonly="true" style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id="PONoteToApproverDiv" style="display: none">
                                                                                        <div class="form-group">
                                                                                            <label for="PONoteToApprover" class="">PO Note to Approver:</label>
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
                                                                                            <label for="prNoteToApproval" class="">PR Note to Approval:</label>
                                                                                            <textarea class="form-control form-rounded" rows="5" id="prNoteToApproval" name="prNoteToApproval" data-parsley-trigger="change" data-parsley-maxlength="5000" style="height:250px;"></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade show" id="deliveryAddress-tab" role="tabpanel" aria-labelledby="deliveryAddress-tab">
                                                                    <div class="card-body">
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
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="align-center text-align-center">
                                                                                    <!--<input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveDeliveryAddressBtn" value="Save">-->
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!--</div>-->
                                                                </div>
                                                                <div class="tab-pane fade show" id="confirmations-tab" role="tabpanel" aria-labelledby="confirmations-tab">
                                                                    <div class="card-body">
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
                                                                                    <!--<input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveConfirmationsBtn" value="Save">-->
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
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="align-center text-align-center">
                                                                                    <!--<input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveConditionControlBtn" value="Save">-->
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
                                                                                    <label for="SegmentDescriptionLine" class="">Segment(Description):</label>
                                                                                    <select class="custom-select" id="SegmentDescriptionLine" name="SegmentDescriptionLine">
                                                                                        <option value="">Select</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="align-center text-align-center">
                                                                                    <!--<input type="button" class="btn btn-sm btn-primary btn-rounded" id="saveCustomerDataBtn" value="Save">-->
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
                                                                            <div class="row">
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="componentBtnLineLevel_div">
                                                                                    <div class="form-group">
                                                                                        <!--<a><i type="buttom"  class="fa fa-plus-circle btn-primary btn-sm" id="componentAddRowBtn" aria-hidden="true"></i></a>-->
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="card-body">
                                                                                        <div class="table-responsive"  style="height: 260px;">
<!--                                                                                            <table class="table table-bordered componentTableClassLineLevel" id="componentTableIdLineLevel">
                                                                                                <thead class="table-header-color">
                                                                                                    <tr class="border-0">
                                                                                                        <th class="border-1 th-color">Material</th>
                                                                                                        <th class="border-1 th-color">Description</th>
                                                                                                        <th class="border-1 th-color">Plant</th>
                                                                                                        <th class="border-1 th-color">Unit</th>
                                                                                                        <th class="border-1 th-color">Quantity</th>
                                                                                                        <th class="border-1 th-color">Prod St Loc</th>
                                                                                                        <th class="border-1 th-color">Supply Area</th>
                                                                                                        <th class="border-1 th-color">Requirement Date</th>
                                                                                                        <th class="border-1 th-color">Qty is fixed</th>
                                                                                                        <th class="border-1 th-color">Latest Req. Date</th>
                                                                                                        <th class="border-1 th-color">Dist. Key</th>
                                                                                                        <th class="border-1 th-color">Item No.</th>
                                                                                                        <th class="border-1 th-color">Batch</th>
                                                                                                        <th class="border-1 th-color">Storage Location</th>
                                                                                                        <th class="border-1"></th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                </tbody>
                                                                                            </table>-->
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
                                            </form>
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="align-center text-align-center">

                                                        <c:if test="${PoFrom == 'editApprovedPo'}">
                                                            <input type="submit" class="btn btn-success btn-rounded preCheckPoBtn submitPoDetails" style="right:62.3%;" id="preCheckPoBtn" value="Pre Check" disabled="true">
                                                            <input type="button" class="btn btn-warning btn-rounded editAmendSaveAndCloseBtn" style="right: 53%;" id="saveAndCloseBtn" value="Save & Close" disabled="true">
                                                            <input type="submit" class="btn btn-success btn-rounded createPoBtn submitPoDetails" id="createPoBtn" value="Amend PO" disabled="true">
                                                            <input type="submit" class="btn btn-danger btn-rounded cancelPoBtn submitPoDetails" id="cancelPoBtn" value="Cancel PO" disabled="true">                                                            
                                                        </c:if>
                                                        <c:if test="${PoFrom == 'editpo'}">
                                                            <input type="submit" class="btn btn-success btn-rounded preCheckPoBtn submitPoDetails" style="right:60.8%;" id="preCheckPoBtn" value="Pre Check">
                                                            <input type="button" class="btn btn-warning btn-rounded editAmendSaveAndCloseBtn" style="right: 51.5%;" id="saveAndCloseBtn" value="Save & Close">
                                                            <input type="submit" class="btn btn-success btn-rounded createPoBtn submitPoDetails" id="createPoBtn" value=" Edit PO">
                                                            <input type="submit" class="btn btn-danger btn-rounded cancelEditPo" id="cancelEditPo" value="Cancel PO">                                                            
                                                        </c:if>
                                                        <c:if test="${PoFrom == 'createpo'}">
                                                            <input type="submit" class="btn btn-success btn-rounded preCheckPoBtn submitPoDetails" style="right:54%;" id="preCheckPoBtn" value="Pre Check">
                                                            <input type="submit" class="btn btn-success btn-rounded createPoBtn submitPoDetails" id="createPoBtn" value="Create PO">
                                                            <input type="button" class="btn btn-warning btn-rounded saveAndCloseBtn" id="saveAndCloseBtn" value="Save & Close">
                                                        </c:if>
                                                        <c:if test="${PoFrom == 'byrfq'}">
                                                            <input type="submit" class="btn btn-success btn-rounded preCheckPoBtn submitPoDetails" style="right:54%;" id="preCheckPoBtn" value="Pre Check">
                                                            <input type="submit" class="btn btn-success btn-rounded createPoBtn submitPoDetails" id="createPoBtn" value="Create PO">
                                                            <input type="button" class="btn btn-warning btn-rounded saveAndCloseBtn" id="saveAndCloseBtn" value="Save & Close">
                                                        </c:if>
                                                        <c:if test="${PoFrom == 'shortcutPo'}">
                                                            <input type="submit" class="btn btn-success btn-rounded createPoBtn preCheckPoBtn submitPoDetails" style="right:54%;display:none;" id="preCheckPoBtn" value="Pre Check">
                                                            <input type="submit" class="btn btn-success btn-rounded createPoBtn submitPoDetails createPoBtnClass" id="createPoBtn" value="Create PO" style="display: none;">
                                                            <input type="submit" class="btn btn-success btn-rounded createPoBtn submitPoDetails amendPoBtnClass" id="createPoBtn" value="Amend PO" style="display: none;">
                                                            <input type="submit" class="btn btn-danger btn-rounded cancelPoBtn submitPoDetails cancelPoBtnClass" id="cancelPoBtn" value="Cancel PO" style="display: none;">
                                                            <input type="button" class="btn btn-warning btn-rounded saveAndCloseBtn" id="saveAndCloseBtn" value="Save & Close" style="display: none;">
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
                    <%@include file = "/WEB-INF/jsp/po/poModal.jsp" %>                                                                                                            
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
        
        <!-- PR-PO JS -->
        <script src="assets/js/po/prpo/po.js"></script>        
        <script src="assets/js/po/prpo/createpo.js"></script>
        <script src="assets/js/po/prpo/draftpo.js"></script>
        <script src="assets/js/po/prpo/editpo.js"></script>                
        <script src="assets/js/po/prpo/newgen.js"></script>
        <script src="assets/js/po/prpo/pofunctions.js"></script>
        <script src="assets/js/po/prpo/CreateAmendDeletePo.js"></script>
        <script src="assets/js/po/prpo/savepolineitemdata.js"></script>
        <script src="assets/js/po/prpo/acc_assgn_cat_functions.js"></script>
        
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

                console.log("currentDate " + $("#currentDate").val());
                $(".deliveryDateClass").attr("min", $("#currentDate").val());

                if ($("#PrType").val() === "Material") {
                    $('.prDeliveryDatepicker').each(function() {
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
                    $('.deliveryScheduleDatepicker').each(function() {
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
                    $('.statisticalDeliveryScheduleDatepicker').each(function() {
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
                } else if ($("#PrType").val() === "Service") {
                    $('.prDeliveryDatepicker').each(function() {
                        $(this).datepicker({
                            showOn: "button",
                            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                            changeMonth: true,
                            changeYear: true,
                            yearRange: '2020:2050',
                            showWeek: true
                        });
                    });
                    $('.deliveryScheduleDatepicker').each(function() {
                        $(this).datepicker({
                            showOn: "button",
                            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                            changeMonth: true,
                            changeYear: true,
                            yearRange: '2020:2050',
                            showWeek: true
                        });
                    });
                    $('.statisticalDeliveryScheduleDatepicker').each(function() {
                        $(this).datepicker({
                            showOn: "button",
                            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                            changeMonth: true,
                            changeYear: true,
                            yearRange: '2020:2050',
                            showWeek: true
                        });
                    });
                }
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
