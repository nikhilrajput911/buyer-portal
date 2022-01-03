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
        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <!--<link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />-->

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">


        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />
        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">
        <style>
            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            ul{
                list-style-type: none;
            }
            /*            .row{
                            position: fixed;
                        }*/
            .line_items_data_table thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
            .documentListTable thead th {
                background-color: #5969ff !important;
                color: white !important;
            }
            .ratedParameterTable thead th {
                background-color: #5969ff !important;
                color: white !important;
            }
        </style>


        <title>Create RFQ</title>
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
                                    <h2 class="pageheader-title">Create RFQ </h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">RFQ Management</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Create RFQ</li>
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
                                                        <button class="btn btn-default" id="reset-btn" type="button">Reset</button>
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
                                                        <!--<h3 class="border-bottom border-gray pb-2">RFQ Data</h3>-->
                                                        <form action="submitrfqdetails.do" id="rfqdataform"  method="post">
                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                                                            <input type="hidden" name="ro_vendorname" id="ro_vendorname">
                                                            <input type="hidden" name="ro_deliveryterms" id="ro_deliveryterms">
                                                            <input type="hidden" name="ro_paymentterms" id="ro_paymentterms">
                                                            <input type="hidden" name="ro_rfqvaliduntil" id="ro_rfqvaliduntil">
                                                            <input type="hidden" name="ro_expecteddeliverydate" id="ro_expecteddeliverydate">

                                                            <!--<input type="hidden" name="pr_baseline_price" id="pr_baseline_price">-->
                                                            <input type="hidden" name="pr_quantity" id="pr_quantity">
                                                            <input type="hidden" name="pr_ids" id="pr_ids">
                                                            <input type="hidden" name="pr_att_temp_ids" id="pr_att_temp_ids">

                                                            <input type="hidden" name="ro_AutoSendPO" id="ro_AutoSendPO">
                                                            <input type="hidden" name="ro_NotifyVendor" id="ro_NotifyVendor">
                                                            <input type="hidden" name="ro_VendorRecipients" id="ro_VendorRecipients">
                                                            <input type="hidden" name="ro_PORecipients1" id="ro_PORecipients1">
                                                            <input type="hidden" name="ro_InternalRecipients" id="ro_InternalRecipients">
                                                            <input type="hidden" name="ro_PORecipients2" id="ro_PORecipients2">
                                                            <input type="hidden" name="ro_comment" id="ro_comment">
                                                            <input type="hidden" name="prtype" id="prtype" value="${prtype}">
                                                            <input type="hidden" name="ro_selectparameters" id="ro_selectparameters">

                                                            <!--<input type="hidden" name="ro_termstosuppler" id="ro_termstosuppler">-->
                                                            <input type="hidden" name="ro_notestosuppler" id="ro_notestosuppler">
                                                            <input type="hidden" name="rfq_operation" id="rfq_operation" value="create">
                                                            <input type="hidden" name="ratedParameterHidden" id="ratedParameterHidden" value="Y">
                                                            <input type="hidden" name="ratedParameterWeigthHidden" id="ratedParameterWeigthHidden" value="Y">
                                                            <input type="hidden" name="ro_paymentterms2" id="ro_paymentterms2" value="${rfqHeader.paymentterms}">
                                                            <input type="hidden" name="tempRfqId" id="tempRfqId" value="${rfqHeader.rfqid}">

                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqNumber" class="">RFQ Number</label>
                                                                        <input type="text" value="${rfqHeader.rfqNumber}" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqRequestDate" class="">RFQ Request Date:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="rfqRequestDate" name="rfqRequestDate" readonly/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="RFQTitle">RFQ Title:</label>
                                                                        <input type="text" value="${rfqHeader.RFQTitle}" class="form-control form-rounded" id="RFQTitle" name="RFQTitle">
                                                                        <ul class="filled" id="parsley-id-9">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_rfqtitle"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqvaliduntil" class="">RFQ Valid Until:</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="rfqvaliduntil_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil" data-target="#TransactionInitiatedOn" value="<fmt:formatDate value="${rfqHeader.rfqvaliduntil}" pattern="dd-MM-yyyy"/>"/>
                                                                            <div class="input-group-append" data-target="#rfqvaliduntil_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                        <ul class="filled" id="parsley-id-5">
                                                                            <!--<li class="parsley-required" id="parsley_paymentterm_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_rfqvaliduntil"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="deliveryterms" class="">Delivery Terms:</label>
                                                                        <input type="text" value="${rfqHeader.deliveryterms}" class="form-control form-rounded" id="deliveryterms" name="deliveryterms">
                                                                        <ul class="filled" id="parsley-id-1">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_deliveryterms"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="paymentterms" class="">Payment Terms:</label>

                                                                        <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose payment terms..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="paymentterms" name="paymentterms">

                                                                            <optgroup>
                                                                                <c:forEach var="paymentterm" items="${paymentterm}" varStatus="status">
                                                                                    <option value="${paymentterm.paymentTerms}">${paymentterm.paymentTerms} - ${paymentterm.description}</option>
                                                                                </c:forEach>
                                                                            </optgroup>
                                                                        </select>
                                                                        <ul class="filled" id="parsley-id-3">
                                                                            <!--<li class="parsley-required" id="parsley_paymentterm_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_paymentterms"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                                <div class="col-xl- col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="expecteddeliverydate" class="">Expected Delivery Date:</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate">-->

                                                                        <div class="input-group date" id="expecteddeliverydate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate" data-target="#expecteddeliverydate_div" value="<fmt:formatDate value="${rfqHeader.expectedDeliveryDate}" pattern="dd-MM-yyyy"/>"/>
                                                                            <div class="input-group-append" data-target="#expecteddeliverydate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                        <ul class="filled" id="parsley-id-7">
                                                                            <!--<li class="parsley-required" id="parsley_paymentterm_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_expecteddeliverydate"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                        <input type="text" value="${rfqHeader.contactpersonename}" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename" />
                                                                        <ul class="filled" id="parsley-id-11">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_contactpersonename"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonetelno">Contact Person Tel. No.:</label>
                                                                        <input type="text" value="${rfqHeader.contactpersonetelno}" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno" required>
                                                                        <ul class="filled" id="parsley-id-13">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_contactpersonetelno"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                        <input type="text" value="${rfqHeader.contactpersoneemail}" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" />
                                                                        <ul class="filled" id="parsley-id-15">
                                                                            <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                            <li class="parsley-required" id="parsley_contactpersoneemail"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <!--<label for="contactpersoneemail" class="">Contact Person Email:</label>-->
                                                                        <button type="button" style="margin-top: 25px;" class="btn btn-primary btn-sm" id="ratedParameterBtn">Rated Parameter</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="saveRfqDataBtn" value="Save">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                        </form>
                                                    </div>

                                                    <div id="step-2" class="">
                                                        <!--<h3 class="border-bottom border-gray pb-2">Line Items Data</h3>-->
                                                        <!--<form>-->

                                                        <div class="row">

                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group" id="addbtn">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-hover line_items_data_table" id="line_items_data_table">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Item Number</th>
                                                                                    <th>Plant</th>
                                                                                    <th>Purchase Request Number / Line / Requestor</th>
                                                                                    <th>Material Code / Old Material Code / Short Text</th>
                                                                                    <th>Plant Code / Description</th>
                                                                                    <th>Delivery Date / Buyer</th>
                                                                                    <th>Matl. Long Text</th>
                                                                                    <th>Item Text</th>
                                                                                    <th>UoM</th>
                                                                                    <th>Quantity / UoM Store</th>
                                                                                    <th>Local Purchase</th>
                                                                                    <th>Storage Location</th>
                                                                                    <th>Project / Last Buyer Name</th>
                                                                                    <th>Ageing of the PR</th>
                                                                                    <th>Last PO / PO Date</th>
                                                                                    <th>Price Per Unit / Currency</th>
                                                                                    <th>Last Supplier Name</th>
                                                                                    <th>Notes to Supplier</th>
                                                                                    <th>Notes to Buyer</th>
                                                                                    <th>MIQA Material</th>
                                                                                    <th>Document </th>
                                                                                    <th>Attachments</th>
                                                                                        <c:if test="${rfqHeader.rfqstatus == 'On Hold' or rfqHeader.rfqstatus == 'Reject'}">
                                                                                        <th></th>
                                                                                        <th></th>
                                                                                        </c:if>

                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="pr" items="${buyerRfqLineItemBeanList}" varStatus="status">
                                                                                    <tr>
                                                                                        <td align="center">${pr.itemNumber}</td>
                                                                                        <td align="center">${pr.plantName}</td>
                                                                                        <td align="center">${pr.purchaseRequestNumber} / ${pr.itemNumber} / ${pr.prRequestor}</td>
                                                                                        <td align="center">${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                        <td align="center">${pr.plantCode}/ ${pr.plantDescription}</td>
                                                                                        <td align="center">${pr.deliveryDate}</td>
                                                                                        <td>
                                                                                            <a href="#" class="matlLongTextClass" title="Long Text" data-toggle="tooltip" data-placement="auto">
                                                                                                <i class="fa fa-file" aria-hidden="true" style="padding-left: 40px;"></i>
                                                                                            </a>
                                                                                            <input type="hidden" id="longTextId" class="longTextClass" value="${pr.materialLongText}">
                                                                                        </td>
                                                                                        <td align="center">${pr.itemText}</td>
                                                                                        <td align="center">${pr.unit}</td>
                                                                                        <td>
                                                                                            <input class="pr-line-item-qty-afterRfqCreate" type="number" min="1" max="${pr.remainingQuantity}" value="${pr.usedQuantity}" style="width: 50%;"/> / ${pr.uomStore}
                                                                                            <input type="hidden" class="rfq-line-id" value="${pr.rfqLineId}">
                                                                                            <input type="hidden" class="usedQuantity" value="${pr.usedQuantity}">
                                                                                            <input type="hidden" class="pr-att-temp" value="non"/>
                                                                                        </td>
                                                                                        <td align="center">${pr.localPurchase}</td>
                                                                                        <td align="center">${pr.storageLocation}</td>
                                                                                        <td> / </td>
                                                                                        <td align="center">${pr.ageingOfPr}</td>
                                                                                        <td> / </td>
                                                                                        <td align="center">${pr.pricePerUnit} / ${pr.currency}</td>
                                                                                        <td></td>
                                                                                        <td><input type="text" class="notesToSuppler" name="notesToSupplier" value="${pr.notesToSupplier}"></td>
                                                                                        <td>${pr.noteToBuyer}</td>
                                                                                        <td align="center">${pr.miqaMaterial}</td>
                                                                                        <td align="center">
                                                                                            <a href="#" title="View Documents" class="viewUploadedDocFromDB" style="pointer-events: none;opacity: 0.6;"><i class="fas fa-eye fa-2x"></i></a>
                                                                                        </td>
                                                                                        <td>
                                                                                            <button class="btn btn-outline-primary btn-sm btn-rounded upload-prline-document">Upload</button>
                                                                                            <input type="hidden" class="linkIdClass" value="${pr.linkId}"/>
                                                                                            <input type="hidden" class="procInstIdClass" value="${pr.procInstId}"/>
                                                                                            <input type="hidden" class="currentWorkstepClass" value="${pr.currentWorkstep}"/>
                                                                                            <input type="hidden" class="requesterClass" value="${pr.requester}"/>
                                                                                            <input type="hidden" class="materialCodeClass" value="${pr.materialCode}"/>
                                                                                            <input type="hidden" class="shortTextClass" value="${pr.shortText}"/>
                                                                                        </td>
                                                                                        <c:if test="${rfqHeader.rfqstatus == 'On Hold' or rfqHeader.rfqstatus == 'Reject'}">
                                                                                            <td>
                                                                                                <input type="button" value="Reject" class="btn btn-primary btn-rounded btn-sm reject-pr"/>
                                                                                                <input type="hidden" class="linkId" value="${pr.linkId}">
                                                                                                <input type="hidden" class="procInstId" value="${pr.procInstId}">
                                                                                                <input type="hidden" class="prCreator" value="${pr.prCreator}">
                                                                                            </td>
                                                                                            <td>
                                                                                                <input type="button" value="Disassociate" class="btn btn-primary btn-rounded btn-sm deassaiciate-pr"/>
                                                                                                <input type="hidden" class="insertionOrderId" value="${pr.insertionOrderId}">
                                                                                                <input type="hidden" class="rfqLineId" value="${pr.rfqLineId}">
                                                                                            </td>
                                                                                        </c:if>
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
                                                        <!--<h3 class="border-bottom border-gray pb-2">Basic Details</h3>-->
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="deliveryterms" class="">Associate Vendor Group</label>
                                                                    <select id="groupselect" name="groupselect" class="selectpicker show-tick show-menu-arrow" title="Choose any vendor group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                        <c:forEach var="vendorGroup" items="${VendorGroupList}">
                                                                            <option value="${vendorGroup.id}">${vendorGroup.groupname}</option>
                                                                        </c:forEach>

                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3">
                                                                <button style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="addvendorsbtnfrommodal" data-toggle="modal" data-target="#addVendorsDetailsModal">Add Vendor</button>
                                                                <button style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="associateGroupBtnId" data-toggle="modal" data-target="#associategroupmodal">Create Vendor Group</button>
                                                                <button style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="registerprospectbtn">Register Prospect</button>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered rfq-vendor-table" id="rfq_vendor_table">
                                                                        <thead class="bg-primary">
                                                                            <tr class="rfq_vendor_table_class">

                                                                                <th>Vendor Code/ Name</th>
                                                                                <th>Company Code</th>
                                                                                <th>Vendor Address</th>
                                                                                <th>Vendor E-Mail Address</th>
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
                                                    <div id="step-4" class="">
                                                        <!--<h3 class="border-bottom border-gray pb-2">Other Comments</h3>-->
                                                        <!--<input type="text" id="comment" name="comment">-->
                                                        <!--<textarea id="comment" name="comment"></textarea>-->
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="AutoSendPO" class="">Auto-Send PO:</label>
                                                                    <label class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="AutoSendPO" id="AutoSendPO" class="custom-control-input"  checked="true"><span class="custom-control-label">Yes</span>
                                                                        <ul class="filled" id="parsley-id-17">
                                                                            <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                            <li class="parsley-required" id="parsley_autosendpo"></li>
                                                                        </ul>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="NotifyVendor" class="">Notify Vendor:</label>
                                                                    <label class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="NotifyVendor" id="NotifyVendor" class="custom-control-input" checked="true"><span class="custom-control-label">Yes</span>
                                                                        <ul class="filled" id="parsley-id-19">
                                                                            <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                            <li class="parsley-required" id="parsley_notifyvendor"></li>
                                                                        </ul>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="VendorRecipients" class="">Vendor Recipients:</label>

                                                                    <select multiple id="VendorRecipients" name="VendorRecipients" class="selectpicker show-tick show-menu-arrow selectpicker-bg-color" title="Choose VendorRecipients..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                    </select>
                                                                    <ul class="filled" id="parsley-id-21">
                                                                        <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                        <li class="parsley-required" id="parsley_vendorrecipent"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="InternalRecipients" class="">Internal Recipients:</label>
                                                                    <input type="text" class="form-control form-rounded" id="InternalRecipients" name="InternalRecipients">
                                                                    <ul class="filled" id="parsley-id-23">
                                                                        <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                        <li class="parsley-required" id="parsley_internalrecipent"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="comment" class="">Comment:</label><br>
                                                                    <textarea id="comment" name="comment"></textarea>
                                                                    <ul class="filled" id="parsley-id-25">
                                                                        <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                        <li class="parsley-required" id="parsley_comment"></li>
                                                                    </ul>
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
                    <form action="submitrfqprlineattachment.do" method="post" enctype="multipart/form-data" id="prlinedocform">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                        <input type="hidden" name="linkId" id="linkId" value="">
                        <input type="hidden" name="procInstId" id="procInstId" value="">
                        <input type="hidden" name="currentWorkstep" id="currentWorkstep" value="">
                        <input type="hidden" name="requester" id="requester" value="">
                        <input type="hidden" name="materialCode" id="materialCode" value="">
                        <input type="hidden" name="shortText" id="shortText" value="">
                        <input type="hidden" name="quantity" id="quantity" value="">

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
                            <button type="submit" class="btn btn-primary" id="uploadprlinefilesubmitbtn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>                                                                
        <!-- Modal -->
        <div class="modal fade" id="associategroupmodal" tabindex="-1" role="dialog" aria-labelledby="associateGroupLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="associateGroupLabel">Create Vendor Group</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="groupname" class="">Group Name: </label>
                                        <input type="text" class="form-control form-rounded" id="groupname" name="groupname">
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendors" class="">Vendor: </label>
                                        <select id="vendors" name="vendors" multiple class="selectpicker show-tick show-menu-arrow" title="Choose vendors..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">

                                            <optgroup label="Vendor" id="associateVendorGroup"  class="associateVendorGroup">
                                                <c:forEach var="vendor" items="${VendorList}">
                                                    <option value="${vendor.id}">${vendor.firstname} ${vendor.lastname}</option>
                                                </c:forEach>
                                            </optgroup>

                                            <optgroup label="Prospect" id="prospectgroup">
                                                <c:forEach var="prospect" items="${ProspectList}">
                                                    <option value="${prospect.id}">${prospect.prospectvendorname}</option>
                                                </c:forEach>
                                            </optgroup>

                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="registerprospect" tabindex="-1" role="dialog" aria-labelledby="registerProspectLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="registerProspectLabel">Register Prospect</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="registerprospectmodalform" class="needs-validation" action="saveprospectfromrfq.do" method="post" data-parsley-validate="" novalidate="">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                        <div class="modal-body">
                            <div class="container-fluid">

                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="prospectvendorname" class="">Prospect Vendor Name: </label>
                                            <input type="text" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" class="form-control form-rounded" id="prospectvendorname" name="prospectvendorname" required>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="country" class="">Country: </label>
                                            <select class="form-control-sm custom-select" id="country" name="country" required>
                                                <option value="">--Select--</option>
                                                <c:forEach var="country" items="${countryList}" varStatus="status">
                                                    <option value="${country.country}">${country.country}</option>
                                                </c:forEach>
                                                <!--                                                    <option value="Country 1">Country 1</option>
                                                                                                    <option value="Country 2">Country 2</option>
                                                                                                    <option value="Country 3">Country 3</option>-->
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="address" class="">Address: </label>
                                            <input type="text" data-parsley-type="alphanum" class="form-control form-rounded" id="address" name="address" required>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="contactfirstname" class="">Contact First Name: </label>
                                            <input type="text" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" class="form-control form-rounded" id="contactfirstname" name="contactfirstname" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="countrycode" class="">Country Code: </label>
                                            <input type="text" class="form-control form-rounded" id="countrycode" name="countrycode" readonly>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="contactnumberoff" class="">Contact Number (off): </label>
                                            <input type="text" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="contactnumberoff" name="contactnumberoff" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="contactnumberHp" class="">Contact Number (HP): </label>
                                            <input type="text" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="contactnumberHp" name="contactnumberHp" required>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="contactemailid" class="">E-Mail Address: </label>
                                            <input type="email" data-parsley-type="email" class="form-control form-rounded" id="contactemailid" name="contactemailid" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="contactnumberfax" class="">Fax Number: </label>
                                            <input type="text" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="contactnumberfax" name="contactnumberfax" required>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" id="registerprospectmodalbtn">Register</button>
                        </div>
                    </form>
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
                    <!--                        <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                                            </div>-->
                </div>
            </div>
        </div>
        <div class="modal fade" id="vendordetailsmodal" tabindex="-1" role="dialog" aria-labelledby="vendordetailsmodalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="vendordetailsmodalLabel">Vendor Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_code" class="">Vendor Code:</label>
                                        <input type="text" class="form-control form-rounded" id="update_code" name="update_code" readonly>

                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_organization" class="">Organization:</label>
                                        <input type="text" class="form-control form-rounded" id="update_organization" name="update_organization" readonly>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_firstname">First Name:</label>
                                        <input type="text" class="form-control form-rounded" id="update_firstname" name="update_firstname" readonly>
                                        <!--<p id="u_p3" style="color: red"></p>-->
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_lastname" class="">Last Name:</label>
                                        <input type="text" class="form-control form-rounded" id="update_lastname" name="update_lastname" readonly>
                                        <!--<p id="u_p4" style="color: red"></p>-->

                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_city" class="">City:</label>
                                        <input type="text" class="form-control form-rounded" id="update_city" name="update_city" readonly>
                                        <!--<p id="u_p5" style="color: red"></p>-->

                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_country">Country:</label>
                                        <input type="text" class="form-control form-rounded" id="update_country" name="update_country" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_address" class="">Address:</label>
                                        <input type="text" class="form-control form-rounded" id="update_address" name="update_address" readonly>
                                        <!--<p id="p4" style="color: red"></p>-->
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_postalcode" class="">Postal Code:</label>
                                        <input type="text" class="form-control form-rounded" id="update_postalcode" name="update_postalcode" readonly>
                                        <!--<p id="p4" style="color: red"></p>-->

                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_emailid" class="">Vendor Email:</label>
                                        <input type="email" class="form-control form-rounded" id="update_emailid" name="update_emailid" readonly>
                                        <!--<p id="u_p6" style="color: red"></p>-->

                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_spocname">SPOC Name:</label>
                                        <input type="text" class="form-control form-rounded" id="update_spocname" name="update_spocname" readonly>
                                        <!--<p id="u_p7" style="color: red"></p>-->

                                    </div>
                                </div>
                            </div>
                            <div class="row">


                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_spocemail">SPOC Email:</label>
                                        <input type="email" class="form-control form-rounded" id="update_spocemail" name="update_spocemail" readonly>
                                        <!--<p id="p7" style="color: red"></p>-->


                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_vendoremailAuto">Vendor Alternate Email:</label>
                                        <input type="email" class="form-control form-rounded" id="update_vendoremailAuto" name="update_vendoremailAuto" readonly>
                                        <!--<p id="p8" style="color: red"></p>-->

                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_contactnumberoff">Conatct Number(off):</label>
                                        <input type="text" class="form-control form-rounded" id="update_contactnumberoff" name="update_contactnumberoff" readonly>
                                        <!--<p id="p8" style="color: red"></p>-->

                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_contactnumbermob">Contact Number(Mob):</label>
                                        <input type="text" class="form-control form-rounded" id="update_contactnumbermob" name="update_contactnumbermob" readonly>
                                        <!--<p id="p9" style="color: red"></p>-->

                                    </div>
                                </div> 
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_contactnumberfax">Contact Number(Fax):</label>
                                        <input type="text" class="form-control form-rounded" id="update_contactnumberfax" name="update_contactnumberfax" readonly>
                                        <!--<p id="p9" style="color: red"></p>-->

                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_paymentTerms">Payment Term:</label>
                                        <input type="text" class="form-control form-rounded" id="update_paymentTerms" name="update_paymentTerms" readonly>
                                    </div>
                                </div>  
                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_ordercurrency">Order Currency:</label>
                                        <input type="text" class="form-control form-rounded" id="update_ordercurrency" name="update_ordercurrency" readonly>

                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_natureOfPurchase">Nature of Purchase:</label>
                                        <input type="text" class="form-control form-rounded" id="update_natureOfPurchase" name="update_natureOfPurchase" readonly>

                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_companyRegNumber">Company Reg. number:</label>
                                        <input type="text" class="form-control form-rounded" id="update_companyRegNumber" name="update_companyRegNumber" readonly>
                                        <!--                                                                                <p id="p11" style="color: red"></p>-->

                                    </div> </div>			
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="update_gstRegNumber">GST Reg Number:</label>
                                        <input type="text" class="form-control form-rounded" id="update_gstRegNumber" name="update_gstRegNumber" readonly>
                                        <!--<p id="p11" style="color: red"></p>-->
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
                                            <td><input type="checkbox" class="select-vendor-from-modal" value="${vendor.id}"></td>
                                            <td>${vendor.firstname} ${vendor.lastname}</td>
                                            <td></td>
                                            <td>${vendor.organization}</td>
                                            <td>${vendor.emailid}</td>
                                            <td>${vendor.address}</td>
                                        </tr>
                                    </c:forEach>

                                    <c:forEach var="prospect" items="${ProspectList}">
                                        <tr>
                                            <td><input type="checkbox" class="select-vendor-from-modal" value="${prospect.id}"></td>
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
                        <button type="button" class="btn btn-primary" id="addselectedvendortotable">Add</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="ratedParameterModal" tabindex="-1" role="dialog" aria-labelledby="ratedParameterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ratedParameterModalLabel">Parameter</h5>
                        <!--                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>-->
                    </div>
                    <div class="modal-body">
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
                                    <tr>
                                        <td><input type="checkbox" id="MoqMovDetailsRatedParameter" class="rated-parameter-checkbox" ${rfqHeader.mOQMOVDetailsRatedParameter == 'true' ? 'checked' : ''}></td>
                                        <td>MOQ/ MOV Details </td>
                                        <td><input type="number" value="${rfqHeader.mOQMOVDetailsRatedParameterWeight}" max="100" id="MoqMovDetailsRatedParameterWeight" class="rated-parameter-weight-class" ${rfqHeader.mOQMOVDetailsRatedParameter == 'true' ? '' : 'disabled'}></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="DeliveryLeadTimeRatedParameter" class="rated-parameter-checkbox" ${rfqHeader.deliveryLeadTImeRatedParameter == 'true' ? 'checked' : ''}></td>
                                        <td>Delivery Lead Time</td>
                                        <td><input type="number" value="${rfqHeader.deliveryLeadTImeRatedParameterWeight}" id="DeliveryLeadTimeRatedParameterWeight" class="rated-parameter-weight-class" ${rfqHeader.deliveryLeadTImeRatedParameter == 'true' ? '' : 'disabled'}></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="PaymentTermsRatedParameter" class="rated-parameter-checkbox" ${rfqHeader.paymentTermsRatedParameter == 'true' ? 'checked' : ''}></td>
                                        <td>Payment Terms</td>
                                        <td><input type="number" value="${rfqHeader.paymentTermsRatedParameterWeight}" id="PaymentTermsRatedParameterWeight" class="rated-parameter-weight-class" ${rfqHeader.paymentTermsRatedParameter == 'true' ? '' : 'disabled'}></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="BrandModelRatedParameter" class="rated-parameter-checkbox" ${rfqHeader.brandModelRatedParameter == 'true' ? 'checked' : ''}></td>
                                        <td>Brand/ Model</td>
                                        <td><input type="number" value="${rfqHeader.brandModelRatedParameterWeight}" id="BrandModelRatedParameterWeight" class="rated-parameter-weight-class" ${rfqHeader.brandModelRatedParameter == 'true' ? '' : 'disabled'}></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="IncotermsRatedParameter" class="rated-parameter-checkbox" ${rfqHeader.incotermsRatedParameter == 'true' ? 'checked' : ''}></td>
                                        <td>Incoterms</td>
                                        <td><input type="number" value="${rfqHeader.incotermsRatedParameterWeight}" id="IncotermsRatedParameterWeight" class="rated-parameter-weight-class" ${rfqHeader.incotermsRatedParameter == 'true' ? '' : 'disabled'}></td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="ValidityOfOfferRatedParameter" class="rated-parameter-checkbox" ${rfqHeader.validityOfferRatedParameter == 'true' ? 'checked' : ''}></td>
                                        <td>Validity of Offer</td>
                                        <td><input type="number" value="${rfqHeader.validityOfferRatedParameterWeight}" id="ValidityOfOfferRatedParameterWeight" class="rated-parameter-weight-class" ${rfqHeader.validityOfferRatedParameter == 'true' ? '' : 'disabled'}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!--<a href="#" class="btn btn-default" data-dismiss="modal">Close</a>-->
                        <button type="button" class="btn btn-primary" id="submitRatedParameterBtn">Submit</button>
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
    <script src="assets/js/createrfq.js"></script>
    <!--<script src="assets/js/dashboard.js"></script>-->
    <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
    <script src="assets/vendor/parsley/parsley.js"></script>

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

    <script src="assets/vendor/bootstrap-select/js/bootstrap-select.js"></script>


    <script type="text/javascript">

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
        $(function() {

        });

        $(document).ready(function() {
            $(".chosen").chosen();

            //                alert("bittu"); 
            $(".selectpicker").selectpicker();

            $('.needs-validation').parsley();
            $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

            var current_datetime = new Date();
            var day = current_datetime.getDate();
            var mon = current_datetime.getMonth() + 1;

            if (Number(day) < 10)
            {
                day = "0" + day;
            }
            if (Number(mon) < 10)
            {
                mon = "0" + mon;
            }

            var formatted_date = day + "-" + mon + "-" + current_datetime.getFullYear();
            $("#rfqRequestDate").val(formatted_date);

            $("#paymentterms").val($("#ro_paymentterms2").val());
            $("#paymentterms").selectpicker("refresh");
//            alert($("#paymentterms").val());
        }
        );</script>
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
