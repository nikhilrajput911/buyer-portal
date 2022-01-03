
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
                                                <div class="col-12 col-lg-12 col-sm-12 text-right">
                                                    <div class="btn-group" role="group">
                                                        <button class="btn btn-primary" id="prev-btn" type="button">Previous</button>
                                                        <button class="btn btn-primary next-btn" id="next-btn" type="button">Next</button>
                                                        <button class="btn btn-success finish-btn" id="finish-btn" type="button">Finish</button>
                                                        <!--<button class="btn btn-default" id="reset-btn" type="button">Reset</button>-->
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
                                                        <form action="updaterfqdetails.do" id="rfqdataform" method="post">
                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                                                            <input type="hidden" name="ro_vendorname" id="ro_vendorname">
                                                            <input type="hidden" name="ro_sapVendorCode" id="ro_sapVendorCode">
                                                            <input type="hidden" name="ro_deliveryterms" id="ro_deliveryterms">
                                                            <input type="hidden" name="ro_paymentterms" id="ro_paymentterms" value="${RfqHeader.paymentterms}">
                                                            <input type="hidden" name="ro_validityoffer" id="ro_validityoffer">
                                                            <input type="hidden" name="ro_rfqvaliduntil" id="ro_rfqvaliduntil">
                                                            <input type="hidden" name="ro_expecteddeliverdate" id="ro_expecteddeliverdate">
                                                            <input type="hidden" name="ro_rfqcloseson" id="ro_rfqcloseson">
                                                            <input type="hidden" name="ro_action" id="ro_action">

                                                            <!--<input type="hidden" name="pr_baseline_price" id="pr_baseline_price">-->
                                                            <input type="hidden" name="pr_quantity" id="pr_quantity">
                                                            <input type="hidden" name="pr_ids" id="pr_ids">
                                                            <input type="hidden" name="ro_AutoSendPO" id="ro_AutoSendPO">
                                                            <input type="hidden" name="ro_NotifyVendor" id="ro_NotifyVendor">
                                                            <input type="hidden" name="ro_VendorRecipients" id="ro_VendorRecipients">
                                                            <input type="hidden" name="ro_PORecipients1" id="ro_PORecipients1">
                                                            <input type="hidden" name="ro_InternalRecipients" id="ro_InternalRecipients">
                                                            <input type="hidden" name="ro_PORecipients2" id="ro_PORecipients2">
                                                            <input type="hidden" name="ro_comment" id="ro_comment">
                                                            <input type="hidden" name="pr_insertionOrderIds" id="pr_insertionOrderIds">

                                                            <input type="hidden" name="rfqid" id="rfqid" value="${RfqHeader.rfqid}">

                                                            <input type="hidden" name="rfq_operation" id="rfq_operation" value="update">
                                                            <input type="hidden" name="hd_action" id="hd_action" value="${RfqHeader.rfqstatus}">
                                                            <input type="hidden" name="dmsip" id="dmsip" value="${NGwebserviceIp}">
                                                            <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">

                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqNumber" class="">RFQ Number:</label>
                                                                        <input type="text" value="${RfqHeader.rfqNumber}" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" readonly>
                                                                    </div>
                                                                </div>

                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="RFQTitle">RFQ Title:</label>
                                                                        <input type="text" class="form-control form-rounded" id="RFQTitle" name="RFQTitle" value="${RfqHeader.RFQTitle}"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}>
                                                                        <ul class="filled" id="parsley-id-9">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_rfqtitle"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqRequestDate" class="">RFQ Request Date:</label>
                                                                        <input type="text" class="form-control form-rounded" id="rfqRequestDate" name="rfqRequestDate" data-target="#rfqRequestDate_div" value="<fmt:formatDate value="${RfqHeader.rfqRequestDate}" pattern="dd.MM.yyyy"/>" readonly/>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="deliveryterms" class="">Delivery Terms:</label>
                                                                        <input type="text" class="form-control form-rounded" id="deliveryterms" name="deliveryterms" value="${RfqHeader.deliveryterms}"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}>
                                                                        <ul class="filled" id="parsley-id-1">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_deliveryterms"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="paymentterms" class="">Payment Terms:</label>

                                                                        <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose payment terms..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="paymentterms" name="paymentterms" ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'disabled'}>
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
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqvaliduntil" class="">RFQ Valid Until:</label>
                                                                        <div class="input-group date" id="rfqvaliduntil_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil" data-target="" value="<fmt:formatDate value="${RfqHeader.rfqvaliduntil}" pattern="dd.MM.yyyy"/>" />
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

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="expectedDeliveryDate" class="">Expected Delivery Date:</label>
                                                                        <div class="input-group date" id="expecteddeliverydate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="expectedDeliveryDate" name="expectedDeliveryDate" data-target="" value="<fmt:formatDate value="${RfqHeader.expectedDeliveryDate}" pattern="dd.MM.yyyy"/>"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}/>
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
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename" value="${RfqHeader.contactpersonename}"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}/>
                                                                        <ul class="filled" id="parsley-id-11">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_contactpersonename"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonetelno">Contact Person Tel. No.:</label>
                                                                        <input type="text" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno" value="${RfqHeader.contactpersonetelno}"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}/>
                                                                        <ul class="filled" id="parsley-id-13">
                                                                            <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                            <li class="parsley-required" id="parsley_contactpersonetelno"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" value="${RfqHeader.contactpersoneemail}"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}/>
                                                                        <ul class="filled" id="parsley-id-15">
                                                                            <!--<li class="parsley-required" id="parsley_required_email"></li>-->
                                                                            <li class="parsley-required" id="parsley_contactpersoneemail"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqstatus" class="">RFQ Status:</label>
                                                                        <input type="text" class="form-control form-rounded" id="rfqstatus" name="rfqstatus" value="${RfqHeader.rfqstatus}" readonly>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="" class="">Action:</label>
                                                                        <select id="action" class="custom-select">
                                                                            <option value="">Select</option>
                                                                            <c:if test="${RfqHeader.rfqstatus == 'Pending' || RfqHeader.rfqstatus == 'Bid Submitted'}">
                                                                                <option>On Hold</option>
                                                                            </c:if>
                                                                            <c:if test="${RfqHeader.rfqstatus == 'On Hold'}">
                                                                                <option value="Pending">Release</option>
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
                                                                        <table class="table table-bordered line_items_data_table" id="line_items_data_table">
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
                                                                                        <c:if test="${RfqHeader.rfqstatus == 'On Hold' or RfqHeader.rfqstatus == 'Reject'}">
                                                                                        <!--<th></th>-->
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
                                                                                            <input class="pr-line-item-qty-afterRfqCreate" type="text" min="1" max="<fmt:formatNumber type="number" minFractionDigits="3" value="${pr.remainingQuantity}"/>" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${pr.usedQuantity}"/>" style="width: 150px;"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}/> / ${pr.uomStore}
                                                                                            <input type="hidden" class="rfq-line-id" value="${pr.rfqLineId}">
                                                                                            <input type="hidden" class="usedQuantity" value="<fmt:formatNumber type="number" minFractionDigits="3" value="${pr.usedQuantity}"/>">
                                                                                            <input type="hidden" class="pr-insertionOrderId" value="${pr.insertionOrderId}">
                                                                                        </td>
                                                                                        <td align="center">${pr.localPurchase}</td>
                                                                                        <td align="center">${pr.storageLocation}</td>
                                                                                        <td> / </td>
                                                                                        <td align="center">${pr.ageingOfPr}</td>
                                                                                        <td> / </td>
                                                                                        <td align="center">${pr.pricePerUnit} / ${pr.currency}</td>
                                                                                        <td></td>
                                                                                        <td>${pr.notesToSupplier}</td>
                                                                                        <td>${pr.noteToBuyer}</td>
                                                                                        <td align="center">${pr.miqaMaterial}</td>
                                                                                        <td align="center">
                                                                                            <a href="#" title="View Supporting Documents" id="buyer" class="viewSupportingDocFromDMS"><i class="fas fa-eye fa-2x"></i></a>
                                                                                            <input type="hidden" class="linkId" value="${pr.linkId}">
                                                                                            <input type="hidden" class="procInstId" value="${pr.procInstId}">
                                                                                        </td>
                                                                                        <c:if test="${RfqHeader.rfqstatus == 'On Hold' or RfqHeader.rfqstatus == 'Reject'}">
                                                                                            <!--                                                                                            <td>
                                                                                                                                                                                            <input type="button" value="Reject" class="btn btn-primary btn-rounded btn-sm reject-pr"/>
                                                                                                                                                                                            <input type="hidden" class="linkId" value="${pr.linkId}">
                                                                                                                                                                                            <input type="hidden" class="procInstId" value="${pr.procInstId}">
                                                                                                                                                                                            <input type="hidden" class="prCreator" value="${pr.prCreator}">
                                                                                                                                                                                        </td>-->
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
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered vendor-table" id="rfqdetails_vendor_table">
                                                                        <thead class="">
                                                                            <tr>
                                                                                <th>Export</th>
                                                                                <th>View</th>
                                                                                <th>Vendor Name</th>
                                                                                <th>Vendor Code</th>
                                                                                <th>Vendor Address</th>
                                                                                <th>Vendor E-Mail Address</th>
                                                                                <th>Status</th>
                                                                                <th>RFQ Value</th>
                                                                                <th class="hidden"></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="vendormapping" items="${VendorMappingList}" varStatus="status">
                                                                                <tr>
                                                                                    <c:choose>
                                                                                        <c:when test="${vendormapping.status == 'Pending'}">
                                                                                            <td><i class="fas fa-eye-slash fa-lg"></i></td>
                                                                                            </c:when>
                                                                                            <c:when test="${vendormapping.status == 'Bid Submitted' or vendormapping.status == 'Closed'}">
                                                                                            <td align="center"><a href="downloadrfqformat.do?rfqid=${RfqHeader.rfqid}&vendorid=${vendormapping.ngBpVendordetailsId.id}" title="Download PDF"><i class="fas fa-download fa-lg"></i></a></td>
                                                                                                </c:when>
                                                                                                <c:otherwise>
                                                                                            <td><i class="fas fa-eye-slash fa-lg"></i></td>
                                                                                            </c:otherwise>    
                                                                                        </c:choose>
                                                                                        <c:choose>
                                                                                            <c:when test="${vendormapping.status == 'Pending'}">
                                                                                            <td><i class="fas fa-eye-slash fa-lg"></i></td>
                                                                                            </c:when>
                                                                                            <c:when test="${vendormapping.status == 'Bid Submitted' or vendormapping.status == 'Closed'}">
                                                                                            <td><a href="vendorrfqdetails.do?vendorid=${vendormapping.ngBpVendordetailsId.id}&rfqid=${vendormapping.ngBpWorkorderrfqheaderRfqid.rfqid}" title="Check Details"><i class="fas fa-eye fa-lg"></i></a></td>
                                                                                                </c:when>
                                                                                                <c:otherwise>
                                                                                            <td><i class="fas fa-eye-slash fa-lg"></i></td>
                                                                                            </c:otherwise>    
                                                                                        </c:choose>
                                                                                        <c:if test="${vendormapping.ngBpVendordetailsId.type == 'Vendor'}">
                                                                                        <td>${vendormapping.ngBpVendordetailsId.firstname} ${vendormapping.ngBpVendordetailsId.lastname}</td>
                                                                                    </c:if>
                                                                                    <c:if test="${vendormapping.ngBpVendordetailsId.type == 'Prospect'}">
                                                                                        <td>${vendormapping.ngBpVendordetailsId.prospectvendorname}</td>
                                                                                    </c:if>
                                                                                    <c:if test="${vendormapping.ngBpVendordetailsId.type == 'SAP'}">
                                                                                        <td>${vendormapping.ngBpVendordetailsId.firstname}</td>
                                                                                    </c:if>    
                                                                                    <td>${vendormapping.ngBpVendordetailsId.code}</td>
                                                                                    <td>${vendormapping.ngBpVendordetailsId.address}</td>
                                                                                    <td>${vendormapping.ngBpVendordetailsId.emailid}</td>
                                                                                    <td>${vendormapping.status}</td>
                                                                                    <td>${supplierHeadersList[status.index].rfqvalue}</td>
                                                                                    <td class="hidden">${vendormapping.ngBpVendordetailsId.id}</td>
                                                                                </tr>
                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br>
                                                        <%--<c:if test="${RfqHeader.rfqstatus != 'Cancel' and RfqHeader.rfqstatus != 'Closed' and RfqHeader.rfqstatus != 'Reject'}">--%>
                                                        <c:if test="${RfqHeader.rfqstatus == 'Pending' || RfqHeader.rfqstatus == 'Bid Submitted'}">
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <button class="btn btn-outline-primary btn-sm btn-rounded" id="addvendorsbtnfrommodal">Add New Vendor</button>
                                                                </div>
                                                            </div>
                                                        </c:if>
                                                        <br>

                                                        <!--</form>-->
                                                    </div>
                                                    <div id="step-4" class="">
                                                        <!--<h3 class="border-bottom border-gray pb-2">Other Comments</h3>-->
                                                        <!--<input type="text" id="comment" name="comment">-->
                                                        <!--<textarea id="comment" name="comment"></textarea>-->
                                                        <input type="hidden" id="autosendpo" name="autosendpo" value="${RfqHeader.autosendPO}">
                                                        <input type="hidden" id="notifyvendor" name="notifyvendor" value="${RfqHeader.notifyVendor}">
                                                        <input type="hidden" id="porecipients1" name="porecipients1" value="${RfqHeader.pORecipients1}">
                                                        <input type="hidden" id="porecipients2" name="porecipients2" value="${RfqHeader.pORecipients2}">
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="AutoSendPO" class="">Auto-Send PO:</label>
                                                                    <label class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="AutoSendPO" id="AutoSendPO" class="custom-control-input"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'disabled'}><span class="custom-control-label">Yes</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="NotifyVendor" class="">Notify Vendor:</label>
                                                                    <label class="custom-control custom-checkbox">
                                                                        <input type="checkbox" name="NotifyVendor" id="NotifyVendor" class="custom-control-input" ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'disabled'}><span class="custom-control-label">Yes</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="VendorRecipients" class="">Vendor Recipients:</label>
                                                                    <input type="text" class="form-control form-rounded" id="VendorRecipients" name="VendorRecipients" value="${RfqHeader.vendorRecipients}"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}>

                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="InternalRecipients" class="">Internal Recipients:</label>
                                                                    <input type="text" class="form-control form-rounded" id="InternalRecipients" name="InternalRecipients" value="${RfqHeader.internalRecipients}"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'readonly'}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group" contenteditable="true">
                                                                    <label for="comment" class="">Comment:</label><br>
                                                                    <textarea id="comment" name="comment"  ${RfqHeader.rfqstatus == 'On Hold' ? '' : 'disabled'}>${RfqHeader.comment}</textarea>
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
                                <form method="post" id="rejectprform">
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

                            <input type="hidden" id="firstVMSno">
                            <input type="hidden" id="lastVMSno" value="1">

                            <div class="row">
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorType">Vendor Type: </label>
                                        <select class="custom-select" id="vendorType">
                                            <option value="PortalVendor">Portal Vendor</option>
                                            <option value="SapVendor">SAP Vendor</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorMasterRecordCount">Record Count: </label>
                                        <select class="custom-select" id="vendorMasterRecordCount">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                            <option>200</option>
                                            <option>500</option>
                                            <option>1000</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorCodeOrName_SearchText">Vendor Code/ Name:</label>
                                        <input type="text" class="form-control form-rounded" id="vendorCodeOrName_SearchText" title="Search by code or name">
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <div class="btn-group" style="margin-top: 21px;">
                                            <input type="button" class="btn btn-success btn-sm" id="searchVendorMasterBtn" value="Search">
                                            <input type="button" class="btn btn-dark btn-sm" id="clearSearchVendorMasterBtn" value="Clear">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterPrevBtn" value="Prev" disabled="true">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterNextBtn" value="Next">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover addVendorsDetailsModalTable_Id" id="addVendorsDetailsModalTableId" style="width:100%;">
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="border-0"></th>
                                                    <th class="border-0">Vendor Name</th>
                                                    <th class="border-0">Vendor Code</th>
                                                    <th class="border-0">Vendor Org.</th>
                                                    <th class="border-0">Vendor Email Id</th>
                                                    <th class="border-0">Vendor Address</th>
                                                    <th class="border-0">Type</th>
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
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="addselectedvendortocreatedrfq">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="showSupprtingDocFromDMSModal" tabindex="-1" role="dialog" aria-labelledby="showSupprtingDocFromDMSModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="showSupprtingDocFromDMSModalLabel">Documents</h5>
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
                            <!--<button type="button" class="btn btn-primary" id="">Add</button>-->
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

            $(function() {

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

            $(document).ready(function() {
                $(".chosen").chosen({
                });
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

                $("#paymentterms").val($("#ro_paymentterms").val());
                $("#paymentterms").selectpicker("refresh");
            });



        </script>

    </body>
</html>
