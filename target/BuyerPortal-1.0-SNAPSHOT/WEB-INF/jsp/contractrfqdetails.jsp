
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

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <!--<link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />-->

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/css/custom.css">

        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <style>
            .vendor-table thead th{
                background-color: #5969ff !important;
                color: white !important;
                /*                padding: 5px!important;
                                font-size: 12px;*/
            }
            .line_items_data_table thead th{
                background-color: #5969ff !important;
                color: white !important;
                /*                padding: 5px!important;
                                font-size: 12px;*/
            }

            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            /*            .table tbody td {
                            padding: 4px!important;
                            font-size: 12px;
                        }*/
            .documentListTable thead th {
                background-color: #5969ff !important;
                color: white !important;
                text-align: center;
            }
            ul{
                list-style-type: none;
            }
        </style>

        <title>RFQ Details</title>
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
                                    <h2 class="pageheader-title">RFQ Details </h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item">RFP/ RFQ Management</li>
                                                <li class="breadcrumb-item active" aria-current="page"><a href="mytask.do" class="breadcrumb-link">My Task </a></li>
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
                                            

                                                <!-- SmartWizard html -->
                                                <div class="row">
                                                    <div class="col-12 col-lg-12 col-sm-12">
                                                        <div class="btn-group" role="group" style="padding: 8px;margin-left: 985px;">
                                                            <!--<div class="btn-group" role="group" style="padding: 10px;text-align: right;">-->
                                                            <button class="btn btn-primary" id="prev-btn" type="button">Previous</button>
                                                            <button class="btn btn-primary next-btn" id="next-btn" type="button">Next</button>
                                                            <button class="btn btn-success finish-btn" id="finish-btn" type="button">Finish</button>
<!--                                                            <button class="btn btn-default" id="reset-btn" type="button">Reset</button>-->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="smartwizard">
                                                    <ul>
                                                        <li><a href="#step-1"><small>RFQ Data</small></a></li>
                                                        <li><a href="#step-2"><small>Line Items Data</small></a></li>
                                                        <li><a href="#step-3"><small>Vendor Details</small></a></li>
                                                        <li><a href="#step-4"><small>Other Comments</small></a></li>
                                                    </ul>

                                                    <div>
                                                        <div id="step-1" class="">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Basic Details</h3>-->
                                                            <br>
                                                            <form action="updatecontractrfqdetails.do" id="updatecontractrfqdetailsform" method="post">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" name="rfq_operation" id="rfq_operation" value="update_contract_rfq">

                                                <input type="hidden" name="ratedParameterHidden" id="ratedParameterHidden">
                                                        <input type="hidden" name="ratedParameterWeigthHidden" id="ratedParameterWeigthHidden">
                                                        

                                                        <input type="hidden" name="ro_vendorname" id="ro_vendorname">
                                                        <input type="hidden" name="ro_sapVendorCode" id="ro_sapVendorCode">
                                                        <input type="hidden" name="co_deliveryterms" id="co_deliveryterms">
                                                        <input type="hidden" name="co_paymentterms" id="co_paymentterms">
                                                        <input type="hidden" name="co_rfqvaliduntil" id="co_rfqvaliduntil">
<!--                                                        <input type="hidden" name="co_expecteddeliverydate" id="co_expecteddeliverydate">-->
                                                         <input type="hidden" name="ro_expecteddeliverydate" id="ro_expecteddeliverydate">

                                                        <input type="hidden" name="contract_quantity" id="contract_quantity">
                                                        <input type="hidden" name="contract_ids" id="contract_ids">
                                                        <input type="hidden" name="contract_att_temp_ids" id="contract_att_temp_ids">

                                                        <input type="hidden" name="co_AutoSendPO" id="co_AutoSendPO">
                                                        <input type="hidden" name="co_NotifyVendor" id="co_NotifyVendor">
                                                        <input type="hidden" name="co_VendorRecipients" id="co_VendorRecipients">
                                                        <!--<input type="hidden" name="co_PORecipients1" id="co_PORecipients1">-->
                                                        <input type="hidden" name="co_InternalRecipients" id="co_InternalRecipients">
                                                        <input type="hidden" name="ro_notestosuppler" id="ro_notestosuppler">
                                                        <input type="hidden" name="co_comment" id="co_comment">
                                                        <input type="hidden" name="ratedParam" id="ratedParam" >
                                                        <input type="hidden" name="DefaultRatedParam" id="DefaultRatedParam" value="${ratedParam}">
                                                         <input type="hidden" name="ro_selectparameters" id="ro_selectparameters">
                                                <input type="hidden" name="rfqid" id="rfqid" value="${contractRfqHeaderObj.rfqid}">
                                                <input type="hidden" name="ro_autosendpo" id="ro_autosendpo" value="${contractRfqHeaderObj.autosendpo}">
                                                <input type="hidden" name="ro_notifyvendor" id="ro_notifyvendor" value="${contractRfqHeaderObj.notifyvendor}">

                                                            <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqNumber" class="">RFQ Number</label>
                                                                    <input type="text"  class="form-control form-rounded" value="${contractRfqHeaderObj.rfqNumber}" id="rfqNumber" name="rfqNumber" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="RFQTitle">RFQ Title:</label>
                                                                    <input type="text" class="form-control form-rounded" value="${contractRfqHeaderObj.RFQTitle}" id="RFQTitle" name="RFQTitle" readonly>
                                                                </div>
                                                                <ul class="filled" id="parsley-id-9">
                                                                    <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                    <li class="parsley-required" id="parsley_rfqtitle"></li>
                                                                </ul>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqRequestDate" class="">RFQ Request Date:</label>
                                                                    <div class="input-group date" id="rfqRequestDate_div" data-target-input="nearest">
                                                                        <input type="text" onload="getDate()" class="form-control datetimepicker-input manual-date-input-check" value="<fmt:formatDate value="${contractRfqHeaderObj.rfqRequestDate}" pattern="dd-MM-yyyy"></fmt:formatDate>" id="rfqRequestDate" name="rfqRequestDate" data-target="#rfqRequestDate_div" readonly/>
                                                                        <div class="input-group-append" data-target="#rfqRequestDate_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                         
                                                        
                                                        <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="deliveryterms" class="">Delivery Terms:</label>

                                                                <input type="text" class="form-control form-rounded" id="deliveryterms" name="deliveryterms" value="${contractRfqHeaderObj.deliveryterms}" readonly>

                                                                <ul class="filled" id="parsley-id-1">
                                                                    <li class="parsley-required" id="parsley_deliveryterms"></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="paymentterms" class="">Payment Terms:</label>
                                                                <!--<input type="text" value="${contractRfqHeaderObj.paymentterms}" class="form-control form-rounded" id="paymentterms" name="paymentterms" readonly>-->
                                                                <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose payment terms..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="paymentterms" name="paymentterms">
                                                                    <optgroup>
                                                                        <c:forEach var="paymentterm" items="${paymentterm}" varStatus="status">
                                                                            <c:choose>
                                                                                <c:when test="${contractRfqHeaderObj.paymentterms == paymentterm.paymentTerms}">
                                                                                     <c:choose>
                                                                                <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                    <option value="${paymentterm.paymentTerms}" selected>${paymentterm.paymentTerms} - ${paymentterm.description}</option>
                                                                                </c:when>
                                                                                <c:otherwise>
                                                                                    <option value="${paymentterm.paymentTerms}" readonly selected>${paymentterm.paymentTerms} - ${paymentterm.description}</option>
                                                                                 </c:otherwise>
                                                                            </c:choose>
                                                                                    </c:when>
                                                                                <c:otherwise>
                                                                                    <c:choose>
                                                                                <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                    <option value="${paymentterm.paymentTerms}" >${paymentterm.paymentTerms} - ${paymentterm.description}</option>
                                                                                </c:when>
                                                                                <c:otherwise>
                                                                                    <option value="${paymentterm.paymentTerms}" readonly >${paymentterm.paymentTerms} - ${paymentterm.description}</option>
                                                                                 </c:otherwise>
                                                                            </c:choose>
                                                                                </c:otherwise>
                                                                            </c:choose>
                                                                        </c:forEach>
                                                                    </optgroup>
                                                                </select>
                                                                <ul class="filled" id="parsley-id-3">
                                                                    <!--<li class="parsley-required" id="parsley_paymentterm_required"></li>-->
                                                                    <li class="parsley-required" id="parsley_paymentterms"></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqvaliduntil" class="">RFQ Valid Until:</label>
                                                                <div class="input-group date" onload="getDate()" id="rfqvaliduntil_div" data-target-input="nearest">
                                                                    <c:choose>
                                                                                <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                    <input type="text" class="form-control datetimepicker-input manual-date-input-check" value="<fmt:formatDate value="${contractRfqHeaderObj.rfqvaliduntil}" pattern="dd-MM-yyyy"></fmt:formatDate>" id="rfqvaliduntil" name="rfqvaliduntil" data-target="#rfqvaliduntil_div" />
                                                                                </c:when>
                                                                                <c:otherwise>
                                                                                    <input type="text" class="form-control datetimepicker-input manual-date-input-check" disabled value="<fmt:formatDate value="${contractRfqHeaderObj.rfqvaliduntil}" pattern="dd-MM-yyyy"></fmt:formatDate>" id="rfqvaliduntil" name="rfqvaliduntil" data-target="#rfqvaliduntil_div" />
                                                                                </c:otherwise>
                                                                            </c:choose>
                                                                    
                                                                    <div class="input-group-append" data-target="#rfqvaliduntil_div" data-toggle="datetimepicker">
                                                                        <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                    </div>
                                                                </div>
                                                                <ul class="filled" id="parsley-id-5">
                                                                    <li class="parsley-required" id="parsley_rfqvaliduntil"></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqcloseson" class="">Expected Delivery Date:</label>
                                                                 <div class="input-group date" id="expecteddeliverydate_div" data-target-input="nearest">
                                                                     <c:choose>
                                                                                <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                    <input type="text" onload="getDate()" class="form-control datetimepicker-input manual-date-input-check " value="<fmt:formatDate value="${contractRfqHeaderObj.expecteddeliverydate}" pattern="dd-MM-yyyy"></fmt:formatDate>" id="expecteddeliverydate" name="expecteddeliverydate" data-target="#expecteddeliverydate_div"  />
                                                                                </c:when>
                                                                                <c:otherwise>
                                                                                    <input type="text" onload="getDate()" class="form-control datetimepicker-input manual-date-input-check " disabled="true" value="<fmt:formatDate value="${contractRfqHeaderObj.expecteddeliverydate}" pattern="dd-MM-yyyy"></fmt:formatDate>" id="expecteddeliverydate" name="expecteddeliverydate" data-target="#expecteddeliverydate_div"  />
                                                                                </c:otherwise>
                                                                            </c:choose>
                                                                            
                                                                            <div class="input-group-append" data-target="#expecteddeliverydate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                <ul class="filled" id="parsley-id-7">
                                                                    <!--<li class="parsley-required" id="parsley_paymentterm_required"></li>-->
                                                                    <li class="parsley-required" id="parsley_rfqcloseson"></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                            
                                                            
                                                    </div>
                                                        <div class="row">
                                                              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename"  value="${contractRfqHeaderObj.contactpersonename}" readonly/>
                                                                    <ul class="filled" id="parsley-id-11">
                                                                        <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                        <li class="parsley-required" id="parsley_contactpersonename"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersonetelno">Contact Person Tel. No.:</label>
                                                                    <input type="text" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno" value="${contractRfqHeaderObj.contactpersonetelno}" readonly>
                                                                    <ul class="filled" id="parsley-id-13">
                                                                        <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                        <li class="parsley-required" id="parsley_contactpersonetelno"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            

                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" value="${contractRfqHeaderObj.contactpersoneemail}" readonly/>
                                                                    <ul class="filled" id="parsley-id-15">
                                                                        <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                        <li class="parsley-required" id="parsley_contactpersoneemail"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <!--<label for="contactpersoneemail" class="">Contact Person Email:</label>-->
                                                                        <c:choose>
                                                                                <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-primary btn-sm"  id="ratedParameterBtn">Rated Parameter</button>
                                                                                </c:when>
                                                                                <c:otherwise>
                                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-primary btn-sm" disabled id="ratedParameterBtn">Rated Parameter</button>
                                                                                </c:otherwise>
                                                                            </c:choose>
                                                                        

                                                                    </div>
                                                                </div>
                                                        </div>
 <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="" class="">RFQ Status</label>
                                                                        <input type="text" value="${contractRfqHeaderObj.rfqstatus}" class="form-control form-rounded" id="rfqstatus" name="rfqstatus" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="" class="">Action</label>
                                                                        <select id="action" name="action" class="custom-select">
                                                                            <option value="">Select</option>
                                                                            <c:if test="${contractRfqHeaderObj.rfqstatus == 'Pending'}">
                                                                                <option>On Hold</option>
                                                                            </c:if>
                                                                            <c:if test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                <option>Release</option>
                                                                            </c:if>
                                                                            <option>Cancel</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
</form>
                                                        </div>


                                                        
                                                        <div id="step-2" class="">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Line Items Data</h3>-->

                                                            <div class="row">

                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="form-group" id="addbtn">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-hover line_items_data_table" id="line_items_data_table">
                                                                                <thead>

                                                                                    <tr>
                                                                                    <th>Item Number</th>
                                                                                    <th>Plant</th>
                                                                                    <th>Material Code</th>
                                                                                    <th>Short Text / Old Material Code</th>
                                                                                    <th>Long Text</th>
                                                                                    <th>Order Unit (UoM)</th>
                                                                                    <th>Quantity</th>
                                                                                    
                                                                                    <th>Per Unit</th>
                                                                                    
                                                                                     <th>Notes To Supplier</th>
                                                                                    <th>Buyer Documents</th>
                                                                                    <th>Attachments</th>
                                                                                    <th>Vendor Documents</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <c:forEach var="lineItemObj" items="${contractRfqLineItemList}" varStatus="status">
                                                                                        <tr>
                                                                                            <td>${lineItemObj.newgenContractLineItemId.itemNumber}</td>
                                                                                            <td>${lineItemObj.newgenContractLineItemId.plant}</td>
                                                                                            
                                                                                            <td>${lineItemObj.newgenContractLineItemId.materialCode}</td>
                                                                                            <td>${lineItemObj.newgenContractLineItemId.shortText}/${lineItemObj.newgenContractLineItemId.old_Mat_Code}</td>
                                                                                            <td align="center">
                                                                                            <a href="#" class="matlLongTextClass" title="Long Text">
                                                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                                                            </a>
                                                                                            <input type="hidden" id="longTextId" class="longTextClass" value="${lineItemObj.newgenContractLineItemId.matlLongText}">
                                                                                        </td>
                                                                                            
                                                                                            <td>${lineItemObj.newgenContractLineItemId.uoM}</td>
                                                                                            <td><input type="hidden" class="contract-att-temp" value="${lineItemObj.contractAttachmentTempID.id}"/>
                                                                                                <input type="hidden" class="contract-id" name="contract_id" value="${lineItemObj.newgenContractLineItemId.insertionOrderID}"/>
                                                                                                <c:choose>
                                                                                            <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                                <input class="contract-line-item-qty readonly-field" name="contract_line_item_qty"  type="number" min="1" max="${lineItemObj.newgenContractLineItemId.bpQuantityRemaining}" value="${lineItemObj.quantity}" style="width: 50%;"/> / ${lineItemObj.newgenContractLineItemId.uoM}
                                                                                            </c:when>
                                                                                            <c:otherwise>
                                                                                                 <input class="contract-line-item-qty readonly-field" name="contract_line_item_qty" readonly="true" type="number" min="1" max="${lineItemObj.newgenContractLineItemId.bpQuantityRemaining}" value="${lineItemObj.quantity}" style="width: 50%;"/> / ${lineItemObj.newgenContractLineItemId.uoM}
                                                                                            </c:otherwise>
                                                                                                 </c:choose>
                                                                                            </td>
                                                                                            <td><input type="hidden" class="contract-rfqlineitem-id" name="contract_rfqlineitem_id" value="${lineItemObj.RFQLineID}"/>
                                                                                            ${lineItemObj.newgenContractLineItemId.perPriceUnit}</td>
                                                                                            <td>
                                                                                                 <c:choose>
                                                                                            <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                                <input type="text" class="noteToSupplier" id="noteToSupplier" id="noteToSupplier" value="${lineItemObj.noteToSupplier}"/>
                                                                                            </c:when>
                                                                                            <c:otherwise>
                                                                                                <input type="text" class="noteToSupplier" id="noteToSupplier" disabled id="noteToSupplier" value="${lineItemObj.noteToSupplier}"/>
                                                                                            </c:otherwise>
                                                                                                 </c:choose>
                                                                                            </td>
                                                                                            <td align="center">
                                                                                            <a href="#" title="View Documents" class="viewContractUploadedDocFromDB" ><i class="fas fa-eye fa-2x"></i></a>
                                                                                            </td>
                                                                                            <td>
                                                                                                <c:choose>
                                                                                            <c:when test="${contractRfqHeaderObj.rfqstatus == 'On Hold'}">
                                                                                                <button class="btn btn-outline-primary btn-sm btn-rounded upload-prline-document">Upload</button>
                                                                                            </c:when>
                                                                                            <c:otherwise>
                                                                                                 <button disabled class="btn btn-outline-primary btn-sm btn-rounded upload-prline-document">Upload</button>
                                                                                            </c:otherwise>
                                                                                            </c:choose>
                                                                                            </td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                    </c:forEach>
                                                                                </tbody>

                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                            <!--</form>-->
                                                        </div>
                                                        
                                                       <div id="step-3" class="">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Line Items Data</h3>-->

                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered rfpdetails_vendor_table rfp_details_table" id="rfqdetails_vendor_table">
                                                                            <thead class="">
                                                                                <tr>
                                                                                    <!--<th>Export</th>-->
                                                                                    <th>View</th>
                                                                                    <th>Vendor Code/ Name</th>
                                                                                    <th>Company Code</th>
                                                                                    <th>Vendor Address</th>
                                                                                    <th>Vendor E-Mail Address</th>
                                                                                    <th>Status</th>
<!--                                                                                    <th>RFP Value</th>-->
                                                                                    <th class="hidden"></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="vendormapping" items="${VendorMappingList}">
                                                                                    <tr>
                                                                                        <!--<td></td>-->
                                                                                        <c:choose>
                                                                                            <c:when test="${vendormapping.status == 'Pending'}">
                                                                                                <td><i class="fas fa-eye-slash fa-lg"></i></td>
                                                                                                </c:when>
                                                                                                <c:when test="${vendormapping.status == 'Bid Submitted'}">
                                                                                                <td><a href="vendorcontractrfpdetails.do?vendorid=${vendormapping.ngBpVendordetailsId.id}&rfpid=${vendormapping.contractRfqHeaderRFQID.rfqid}" title="Check Details"><i class="fas fa-eye fa-lg"></i></a></td>
                                                                                                    </c:when>
                                                                                                    <c:otherwise>
                                                                                                <td><i class="fas fa-eye-slash fa-lg"></i></td>
                                                                                                </c:otherwise>    
                                                                                        </c:choose>
                                                                                        <td>${vendormapping.ngBpVendordetailsId.firstname} ${vendormapping.ngBpVendordetailsId.lastname}</td>
                                                                                        <td>${vendormapping.ngBpVendordetailsId.code}</td>
                                                                                        <td>${vendormapping.ngBpVendordetailsId.address}</td>
                                                                                        <td>${vendormapping.ngBpVendordetailsId.emailid}</td>
                                                                                        <td>${vendormapping.status}</td>
<!--                                                                                        <td></td>-->
                                                                                        <td class="hidden"></td>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                            <br>
                                                                                                                        <div class="row">
                                                                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                                <button type="button" class="btn btn-outline-primary btn-sm btn-rounded" id="addvendorsbtnfrommodal" data-toggle="modal" data-target="#addVendorsDetailsModal">Add New Vendor</button>
                                                                                                                            </div>
                                                                                                                        </div>
                                                            <br>
                                                        </div>

                                                        <div id="step-4" class="">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Other Comments</h3>-->
                                                            <!--<input type="text" id="comment" name="comment">-->
                                                            <!--<textarea id="comment" name="comment"></textarea>-->
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="autosendpo" class="">Auto-Send PO:</label>
                                                                        <label class="custom-control custom-checkbox">
                                                                            <input type="checkbox" name="autosendpo" id="autosendpo" class="custom-control-input readonly-field" ${contractRfqHeaderObj.autosendpo == true ? 'checked' : ''} disabled="true"><span class="custom-control-label">Yes</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="notifyvendor" class="">Notify Vendor:</label>
                                                                        <label class="custom-control custom-checkbox">
                                                                            <input type="checkbox" name="notifyvendor" id="notifyvendor" class="custom-control-input readonly-field"  ${contractRfqHeaderObj.notifyvendor == true ? 'checked' : ''} disabled="true"><span class="custom-control-label">Yes</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="vendorrecipients" class="">Vendor Recipients:</label>
                                                                        <input type="text" value="${contractRfqHeaderObj.vendorrecipients}" class="form-control form-rounded readonly-field" id="vendorrecipients" name="vendorrecipients" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="internalrecipients" class="">Internal Recipients:</label>
                                                                        <input type="text" value="${contractRfqHeaderObj.internalrecipients}" class="form-control form-rounded readonly-field" id="internalrecipients" name="internalrecipients" readonly>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="comment" class="">Comment:</label><br>
                                                                        <textarea id="comment" name="comment" class="readonly-field" readonly>${contractRfqHeaderObj.comment}</textarea>
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
                                                                    <div class="modal fade" id="addVendorsDetailsModal" tabindex="-1" role="dialog" aria-labelledby="addVendorsDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addVendorsDetailsModalLabel">Vendors</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!--<div class="container-fluid">-->
                        <!--<div class="card-body">-->
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover addVendorsDetailsModalTable_Id" id="addVendorsDetailsModalTableId" style="width:100%;">
                                <thead>
                                    <tr class="border-0">
                                        <th class="border-0"></th>
                                        <th class="border-0">Vendor Name</th>
                                        <th class="border-0">Company Code</th>
                                        <th class="border-0">Vendor Org.</th>
                                        <th class="border-0">Vendor Email Id</th>
                                        <th class="border-0">Vendor Address</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <c:forEach var="vendor" items="${VendorList}">
                                        <tr>
                                            <td><input type="checkbox" class="add-vendor-tocreatedrfq" value="${vendor.id}"></td>
                                            <td>${vendor.firstname} ${vendor.lastname}</td>
                                            <td></td>
                                            <td>${vendor.organization}</td>
                                            <td>${vendor.emailid}</td>
                                            <td>${vendor.address}</td>
                                        </tr>
                                    </c:forEach>

                                    <c:forEach var="prospect" items="${ProspectList}">
                                        <tr>
                                            <td><input type="checkbox" class="add-vendor-tocreatedrfq" value="${prospect.id}"></td>
                                            <td>${prospect.prospectvendorname}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </c:forEach>

                                </tbody>
                            </table>
                        </div>
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="addselectedvendortocreatedrfq">Add</button>
                    </div>
                </div>
            </div>
        </div>
            <div class="modal fade" id="rejectprlinemodal" tabindex="-1" role="dialog" aria-labelledby="rejectprlineLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="rejectprlineLabel">Reject PR Line</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <form action="rejectpr.do" method="post" id="rejectprform">
                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rejectreason" class="">Reject Reason: </label>
                                                <select class="custom-select" id="rejectreason" name="rejectreason">
                                                    <option>Select</option>
                                                    <c:forEach var="reason" items="${ReasonList}">
                                                        <option>${reason.reason}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rejectto" class="">Reject To: </label>
                                                <input type="text" class="form-control rounded" id="rejectto" name="rejectto">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rejectcomments" class="">Comments: </label>
                                                <input type="text" class="form-control rounded" id="rejectcomments" name="rejectcomments">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rejectprdoc" class="">Reject PR Document: </label>
                                                <label class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="rejectprdoc" id="rejectprdoc" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                </label>    
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" id="wiNumber" name="wiNumber">
                                    <input type="hidden" id="linkId" name="linkId">
                                </form>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="rejectprlinemodaltn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addVendorsDetailsModal" tabindex="-1" role="dialog" aria-labelledby="addVendorsDetailsModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addVendorsDetailsModalLabel">Vendors</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!--<div class="container-fluid">-->
                            <!--<div class="card-body">-->
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover addVendorsDetailsModalTable_Id" id="addVendorsDetailsModalTableId" style="width:100%;">
                                    <thead>
                                        <tr class="border-0">
                                            <th class="border-0"></th>
                                            <th class="border-0">Vendor Name</th>
                                            <th class="border-0">Company Code</th>
                                            <th class="border-0">Vendor Org.</th>
                                            <th class="border-0">Vendor Email Id</th>
                                            <th class="border-0">Vendor Address</th>
                                            <th class="border-0">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <c:forEach var="vendor" items="${VendorList}">
                                            <tr>
                                                <td><input type="checkbox" class="add-vendor-tocreatedrfq" value="${vendor.id}"></td>
                                                <td>${vendor.firstname} ${vendor.lastname}</td>
                                                <td></td>
                                                <td>${vendor.organization}</td>
                                                <td>${vendor.emailid}</td>
                                                <td>${vendor.address}</td>
                                                <td>${vendor.type}</td>
                                            </tr>
                                        </c:forEach>

                                        <c:forEach var="prospect" items="${ProspectList}">
                                            <tr>
                                                <td><input type="checkbox" class="add-vendor-tocreatedrfq" value="${prospect.id}"></td>
                                                <td>${prospect.firstname} ${prospect.lastname}</td>
                                                <td></td>
                                                <td></td>
                                                <td>${prospect.emailid}</td>
                                                <td>${prospect.address}</td>
                                                <td>${prospect.type}</td>
                                            </tr>
                                        </c:forEach>

                                    </tbody>
                                </table>
                            </div>
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="addselectedvendortocreatedrfq">Add</button>
                        </div>
                    </div>
                </div>
            </div>
           <div class="modal fade" id="ratedParameterModal" tabindex="-1" role="dialog" aria-labelledby="ratedParameterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ratedParameterModalLabel">Parameter</h5>
<!--                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>-->
                    </div>
                    <div class="modal-body">
                          <div>
                            
                            <button type="button" class="btn btn-primary" id="addratedparameter">Add New Parameter</button>
                            
                            
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered ratedParameterTable" id="ratedParameterTable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Parameter Name</th>
                                        <th>Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
<!--                                    <tr>
                                        <td><input type="checkbox" id="MoqMovDetailsRatedParameter" class="rated-parameter-checkbox"></td>
                                        <td>MOQ/ MOV Details </td>
                                        <td><input type="number" min="0" disabled="true" id="MoqMovDetailsRatedParameterWeight" class="rated-parameter-weight-class"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="DeliveryLeadTimeRatedParameter" class="rated-parameter-checkbox"></td>
                                        <td>Delivery Lead Time</td>
                                        <td><input type="number" min="0" disabled="true" id="DeliveryLeadTimeRatedParameterWeight" class="rated-parameter-weight-class"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="PaymentTermsRatedParameter" class="rated-parameter-checkbox"></td>
                                        <td>Payment Terms</td>
                                        <td><input type="number" min="0" disabled="true" id="PaymentTermsRatedParameterWeight" class="rated-parameter-weight-class"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="BrandModelRatedParameter" class="rated-parameter-checkbox"></td>
                                        <td>Brand/ Model</td>
                                        <td><input type="number" min="0" disabled="true" id="BrandModelRatedParameterWeight" class="rated-parameter-weight-class"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="IncotermsRatedParameter" class="rated-parameter-checkbox"></td>
                                        <td>Incoterms</td>
                                        <td><input type="number" min="0" disabled="true" id="IncotermsRatedParameterWeight" class="rated-parameter-weight-class"></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="ValidityOfOfferRatedParameter" class="rated-parameter-checkbox"></td>
                                        <td>Validity of Offer</td>
                                        <td><input type="number" min="0" disabled="true" id="ValidityOfOfferRatedParameterWeight" class="rated-parameter-weight-class"></td>
                                    </tr>-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!--<a href="#" class="btn btn-default" data-dismiss="modal">Close</a>-->
                        <button type="button" class="btn btn-primary" id="submitRatedParameterBtn">Submit</button>
                        <!--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>-->
                    </div>
                </div>
            </div>
        </div>                         
                              
            <div class="modal fade" id="showUploadedDocFromDBModal" tabindex="-1" role="dialog" aria-labelledby="showUploadedDocFromDBModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="showUploadedDocFromDBModalLabel">Documents</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-bordered documentListTable" id="documentListTable">
                                <thead>
                                    <tr>
                                        <!--<th>#</th>-->
                                        <th>Document Name</th>
                                        <th>Download</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <!--<button type="button" class="btn btn-primary" id="">Add</button>-->
                    </div>
                </div>
            </div>
        </div>   
                                    
                                    
                                    
                                    <div class="modal fade" id="prlineitemattachmentmodal" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <form action="submitrfqcontractlineattachment.do" method="post" enctype="multipart/form-data" id="contractlinedocform">
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
                                                    <button class="btn btn-primary btn-choose" type="button">B-Supporting documents-1</button>
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
                                                    <button class="btn btn-primary btn-choose" type="button">B-Supporting documents-2</button>
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
                                                    <button class="btn btn-primary btn-choose" type="button">B-Supporting documents-3</button>
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
                                                    <button class="btn btn-primary btn-choose" type="button">B-Supporting documents-4</button>
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
                                                    <button class="btn btn-primary btn-choose" type="button">B-Supporting documents-5</button>
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
                            <button type="submit" class="btn btn-primary" id="uploadcontractlinefilesubmitbtn">Submit</button>
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
        <script src="assets/step-wizard/js/createrfq.js"></script>

        <!--<script src="assets/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>-->

        <!--<script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>-->

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="assets/js/createcontractrfq.js"></script>
        <script src="assets/js/newgen.js"></script>
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

        <script src="assets/vendor/datepicker/moment.js"></script>
        <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
        <script src="assets/vendor/datepicker/datepicker.js"></script>

        <script type="text/javascript">

            $(function () {

//                $('#rfqRequestDate').datepicker({
//                    uiLibrary: 'bootstrap4',
//                    format: 'dd-mm-yyyy'
//                });
//
//                $('#rfqvaliduntil').datepicker({
//                    uiLibrary: 'bootstrap4',
//                    format: 'dd-mm-yyyy'
//                });
//
//
//                $('#expecteddeliverydate').datepicker({
//                    uiLibrary: 'bootstrap4',
//                    format: 'dd-mm-yyyy'
//                });
            });

            $(document).ready(function () {
               // $(".chosen").chosen({
              //  });
                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");


                var autosendpo = $("#autosendpo").val();
                var notifyvendor = $("#notifyvendor").val();
                var porecipients1 = $("#porecipients1").val();
                var porecipients2 = $("#porecipients2").val();

                console.log("autosendpo :" + autosendpo);
                console.log("notifyvendor :" + notifyvendor);
                console.log("porecipients1 :" + porecipients1);
                console.log("porecipients2 :" + porecipients2);
                if (autosendpo === "true") {
                    $("#AutoSendPO").prop("checked", true);
                }
                if (notifyvendor === "true") {
                    $("#NotifyVendor").prop("checked", true);
                }
                if (porecipients1 === "true") {
                    $("#PORecipients1").prop("checked", true);
                }
                if (porecipients2 === "true") {
                    $("#PORecipients2").prop("checked", true);
                }

                var action = $("#hd_action").val();
//                alert(action);
                if (action === 'Cancel' || action === 'Closed') {
//                    alert("Bittu");
                    $("#action").prop("disabled", true);
                    $("#rfqvaliduntil").prop('readonly', true);
                    if (action === 'Closed')
                    {
                        $("#rfq_operation").val("Closed");
                    }
                }

               // $("#paymentterms").val($("#ro_paymentterms").val());
               // $("#paymentterms").selectpicker("refresh");
            });



        </script>

    </body>
</html>
