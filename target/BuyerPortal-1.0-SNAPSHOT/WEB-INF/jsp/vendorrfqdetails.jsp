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

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <!--<link rel="stylesheet" href="assets/css/loader.css">-->

        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <title>Vendor RFQ Details</title>
        <style>
            .line_items_data_table thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
            .documentListTable thead th {
                background-color: #5969ff !important;
                color: white !important;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>


            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <!--<div class="container-fluid dashboard-content ">-->
                    <!-- ============================================================== -->
                    <!-- pageheader  -->
                    <!-- ============================================================== -->
                    <div id="overlay">
                        <div id="loader"></div>
                    </div>
                    <div class="container-fluid dashboard-content">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <h2 class="pageheader-title">Vendor RFQ Details </h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
<!--                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="rfqdetails.do?rfqid=${WorkOrderListObj.rfqid}" class="breadcrumb-link"><h3 style="background-color: gray;color: white;padding: 7px;border-radius: 15px;font-size: 14px;">Back</h3></a></li>
                                            </ol>
                                        </nav>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                        <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== -->

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                <div class="card">
                                    <!--<h5 class="card-header">Contract Status Panel</h5>-->
                                    <div class="card-body" style="padding: 0px;">
                                        <!-- SmartWizard html -->
                                        <div class="row">
                                            <div class="col-6 col-lg-6 col-sm-6 text-left">
                                                <a href="rfqdetails.do?rfqid=${WorkOrderListObj.rfqid}" class="btn btn-dark">Back</a>
                                            </div>
                                            <div class="col-6 col-lg-6 col-sm-6 text-right">
                                                <div class="btn-group" role="group">
                                                    <button class="btn btn-primary" id="prev-btn" type="button">Previous</button>
                                                    <button class="btn btn-primary" id="next-btn" type="button">Next</button>
                                                    <!--<button class="btn btn-default" id="reset-btn" type="button">Reset</button>-->
                                                </div>
                                            </div>
                                        </div>
                                        <div id="smartwizard">
                                            <ul>
                                                <li><a href="#step-1"><small>RFQ Details</small></a></li>
                                                <!--<li><a href="#step-2"><small>RFQ Data</small></a></li>-->
                                                <li><a href="#step-3"><small>Line Items Data</small></a></li>
                                                <!--<li><a href="#step-4">Step 4<br /><small>Line Texts</small></a></li>-->
                                                <li><a href="#step-4"><small>Other Comments</small></a></li>
                                            </ul>

                                            <div>
                                                <div id="step-1" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">Basic Details</h3>-->
                                                    <form id="basicdetailsform">
                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                        <input type="hidden" name="dmsip" id="dmsip" value="${NGwebserviceIp}">
                                                        <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">
                                                        <input type="hidden" name="VendorCode" id="VendorCode" value="${VendorObj.code}">
                                                        <input type="hidden" id="ro_moqMovDetails" name="ro_moqMovDetails" value="${SupplierHeaderObj.mOQMOVDetailsRatedParameter}">
                                                        <input type="hidden" id="ro_deliveryLeadTime" name="ro_deliveryLeadTime" value="${SupplierHeaderObj.deliveryLeadTImeRatedParameter}">
                                                        <input type="hidden" id="ro_paymentTerms" name="ro_paymentTerms" value="${SupplierHeaderObj.paymentTermsRatedParameter}">
                                                        <input type="hidden" id="ro_brandModel" name="ro_brandModel" value="${SupplierHeaderObj.brandModelRatedParameter}">
                                                        <input type="hidden" id="ro_incoterms" name="ro_incoterms" value="${SupplierHeaderObj.incotermsRatedParameter}">
                                                        <input type="hidden" id="ro_validityOfOffer" name="ro_validityOfOffer" value="${SupplierHeaderObj.validityOfferRatedParameter}">
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqNumber" class="">RFQ No:</label>
                                                                    <input type="text" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" value = "${WorkOrderListObj.rfqNumber}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqRequestDate" class="">RFQ Request Date:</label>

                                                                    <input type="text" class="form-control form-rounded form_date" id="rfqRequestDate" name="rfqRequestDate" value="<fmt:formatDate value="${WorkOrderListObj.rfqRequestDate}" pattern="dd.MM.yyyy" />" readonly>

                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="validityoffer" class="">RFQ Valid Until</label>
                                                                    <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="validityoffer" name="validityoffer" value="<fmt:formatDate value="${WorkOrderListObj.rfqvaliduntil}" pattern="dd.MM.yyyy"/>" readonly/>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename" value="${WorkOrderListObj.contactpersonename}" readonly/>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersonetelno">Contact Person Tel. No.:</label>
                                                                    <input type="text" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno" value="${WorkOrderListObj.contactpersonetelno}" readonly/>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" value="${WorkOrderListObj.contactpersoneemail}" readonly/>

                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="deliveryterms" class="">Buyer Preferred Delivery Terms:</label>
                                                                    <input type="text" class="form-control form-rounded" id="deliveryterms" name="deliveryterms" value="${WorkOrderListObj.deliveryterms}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="paymentterms" class="">Buyer Preferred Payment Terms:</label>
                                                                    <input type="text" class="form-control form-rounded" id="paymentterms" name="paymentterms" value= "${WorkOrderListObj.paymentterms}" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="deliverytermsvendor" class="">Delivery Terms(Vendor):</label>
                                                                    <input type="text" class="form-control form-rounded" id="deliverytermsvendor" name="deliverytermsvendor" value="${SupplierHeaderObj.deliverytermsvendor}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="paymenttermsvendor" class="">Payment Terms(Vendor):</label>
                                                                    <input type="text" class="form-control form-rounded" id="paymenttermsvendor" name="paymenttermsvendor" value= "${SupplierHeaderObj.paymenttermsvendor}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="validityoffer" class="">Validity of Offer:</label>

                                                                    <input type="text" class="form-control form-rounded" id="validityoffer" name="validityoffer" value="<fmt:formatDate value="${SupplierHeaderObj.validityOfOffer}" pattern="dd.MM.yyyy" />" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" style="display: none;" id="moqMovDetails_div">
                                                                <div class="form-group">
                                                                    <label for="moqMovDetails" class="">MAQ/MOV Details:</label>
                                                                    <input type="text" class="form-control form-rounded" id="moqMovDetails" name="moqMovDetails" value="${SupplierHeaderObj.mOQMOVDetailsRatedParameter}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" style="display: none;" id="deliveryLeadTime_div">
                                                                <div class="form-group">
                                                                    <label for="deliveryLeadTime" class="">Delivery Lead Time</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="deliveryLeadTime" name="deliveryLeadTime" value="${SupplierHeaderObj.deliveryLeadTImeRatedParameter}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" style="display: none;" id="paymentTerms_div">
                                                                <div class="form-group">
                                                                    <label for="paymentTerms" class="">Payment Terms:</label>
                                                                    <input type="text" class="form-control form-rounded" id="paymentTerms" name="paymentTerms" value="${SupplierHeaderObj.paymentTermsRatedParameter}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" style="display: none;" id="brandModel_div">
                                                                <div class="form-group">
                                                                    <label for="brandModel" class="">Brand/ Model</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="brandModel" name="brandModel" value="${SupplierHeaderObj.brandModelRatedParameter}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"  style="display: none;" id="incoterms_div">
                                                                <div class="form-group">
                                                                    <label for="incoterms" class="">Incoterms:</label>
                                                                    <input type="text" class="form-control form-rounded" id="incoterms" name="incoterms" value="${SupplierHeaderObj.incotermsRatedParameter}" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" style="display: none;" id="validityOfOffer_div">
                                                                <div class="form-group">
                                                                    <label for="validityOfOffer" class="">Validity of Offer</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="validityOfOffer" name="validityOfOffer" value="${SupplierHeaderObj.validityOfferRatedParameter}" readonly>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div id="step-2" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">RFQ Data</h3>-->

                                                    <!--</form>-->
                                                </div>

                                                <div id="step-3" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">Line Items Data</h3>-->
                                                    <!--<form>-->

                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="form-group" id="addbtn">
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered line_items_data_table" id="line_items_data_table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Item Number</th>
                                                                                <th>Plant</th>
                                                                                <th>Material Description / Old Material Code</th>
                                                                                <th>Alternate Material</th>
                                                                                <th>Brand</th>
                                                                                <th>Short Text</th>
                                                                                <th>Long Text</th>
                                                                                <th>Order Unit (UoM)</th>
                                                                                <th>Quantity</th>
                                                                                <th>Quantity Available</th>
                                                                                <th>Currency</th>
                                                                                <th>Vendor Unit (Quantity /Unit)</th>
                                                                                <th>Vendor Price Offered / Unit</th>
                                                                                <th>Vendor Price Offered (Total)</th>
                                                                                <th>Expected Delivery Date</th>
                                                                                <th>MOQ / MOV</th>
                                                                                <th>Quantity Tolerance</th>
                                                                                <th>Item Text</th>
                                                                                <th>Manufacturing Origin</th>
                                                                                <th>Documents</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="pr" items="${venorRfqLineItemBeanlist}">
                                                                                <tr>
                                                                                    <td align="center">${pr.itemNumber}</td>
                                                                                    <td align="center">${pr.plantName}</td>
                                                                                    <td align="center">${pr.shortText} / ${pr.materialCode}</td>
                                                                                    <td align="center">${pr.alternateMaterial}</td>
                                                                                    <td align="center">${pr.brand}</td>
                                                                                    <td>${pr.shortText}</td>
                                                                                    <td align="center">
                                                                                        <a href="#" class="matlLongTextClass" title="Long Text">
                                                                                            <i class="fa fa-file" aria-hidden="true"></i>
                                                                                        </a>
                                                                                        <input type="hidden" id="longTextId" class="longTextClass" value="${pr.materialLongText}">
                                                                                    </td>
                                                                                    <td align="center">${pr.unit}</td>
                                                                                    <td align="center"><fmt:formatNumber type="number" minFractionDigits="3" value="${pr.usedQuantity}"/></td>
                                                                                    <td align="center"><fmt:formatNumber type="number" minFractionDigits="3" value="${pr.quantityAvailable}"/></td>
                                                                                    <td align="center">${pr.vendorCurrency}</td>
                                                                                    <td align="center"><fmt:formatNumber type="number" minFractionDigits="3" value="${pr.vendorUnitQuantity}"/>/ ${pr.vendorUnit}</td>
                                                                                    <td align="center"><fmt:formatNumber type="number" minFractionDigits="2" value="${pr.vendorPriceOfferedPerUnit}"/></td>
                                                                                    <td align="center"><fmt:formatNumber type="number" minFractionDigits="3" value="${pr.vendorPriceOfferedTotal}"/></td>
                                                                                    <td align="center">${pr.leadTime}</td>
                                                                                    <td align="center">${pr.moqMov}</td>
                                                                                    <td align="center">${pr.quantityTolerance}</td>
                                                                                    <td align="center">${pr.itemTextLineItem}</td>
                                                                                    <td align="center">${pr.manufacturingOrigin}</td>
                                                                                    <td align="center">
                                                                                        <a href="#" title="View Supporting Documents" id="vendor" class="viewSupportingDocFromDMS"><i class="fas fa-eye fa-2x"></i></a>
                                                                                        <input type="hidden" class="linkId" value="${pr.linkId}">
                                                                                        <input type="hidden" class="procInstId" value="${pr.procInstId}">
                                                                                    </td>
                                                                                </tr>
                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal fade" id="lineitemattachmentmodal" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-lg" role="document">
                                                            <div class="modal-content">
                                                                <form action="submitrfqprlineattachment.do" method="post" enctype="multipart/form-data" id="lineitemdocform">
                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                    <div class="modal-header bg-primary">
                                                                        <h5 class="modal-title text-white" id="attLabel">Attachments</h5>
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
                                                                                                <button class="btn btn-primary btn-choose" type="button">V-Supporting documents-1</button>
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
                                                                                                <button class="btn btn-primary btn-choose" type="button">V-Supporting documents-2</button>
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
                                                                                                <button class="btn btn-primary btn-choose" type="button">V-Supporting documents-3</button>
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
                                                                                                <button class="btn btn-primary btn-choose" type="button">V-Supporting documents-4</button>
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
                                                                                                <button class="btn btn-primary btn-choose" type="button">V-Supporting documents-5</button>
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
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                        <button type="submit" class="btn btn-primary" id="uploadprlinefilesubmitbtn">Submit</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--</div>-->
                                                </div>
                                                <div id="step-4" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">Other Comments</h3>-->
                                                    <div class="form-group">
                                                        <label for="validityOfOffer" class="">Comments</label>
                                                        <textarea id="comment" name="comment" class="form-control" readonly>${SupplierHeaderObj.otherComments}</textarea>
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

        <script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <script src="assets/js/createrfq.js"></script>
        <script src="assets/js/newgen.js"></script>
        <!--<script src="assets/js/rfq.js"></script>-->

        <script type="text/javascript">

            $(function() {

//                $('#rfqRequestDate').datepicker({
//                    uiLibrary: 'bootstrap4',
//                    format: 'dd-mm-yyyy'
//                });

//                $('#validityoffer').datepicker({
//                    uiLibrary: 'bootstrap4',
//                    format: 'dd-mm-yyyy'
//                });
//
//
//                $('#rfqcloseson').datepicker({
//                    uiLibrary: 'bootstrap4',
//                    format: 'dd-mm-yyyy'
//                });

//                                                        $('.expecteddeliverydate').datepicker({
//                                                            uiLibrary: 'bootstrap4',
//                                                            format: 'dd-mm-yyyy'
//                                                        }); 

                var acceptPaymentTerms = $("#acceptPaymentTerms").val();
                var acceptDeleveryTerms = $("#acceptDeleveryTerms").val();
//            alert(acceptPaymentTerms);
                if (acceptPaymentTerms === "true") {
//                alert(acceptPaymentTerms);
                    $("#acceptPaymentTerms").prop("checked", true);
                }

                if (acceptDeleveryTerms === "true") {
                    $("#acceptDeleveryTerms").prop("checked", true);
                }
            });


            $(document).ready(function() {
                $(".chosen").chosen({
                });
//                $("#overlay").css("display", "none");
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

            var mOQMOVDetailsRated = $("#ro_moqMovDetails").val();
            var deliveryLeadTImeRated = $("#ro_deliveryLeadTime").val();
            var paymentTermsRated = $("#ro_paymentTerms").val();
            var brandModelRated = $("#ro_brandModel").val();
            var incotermsRated = $("#ro_incoterms").val();
            var validityOfferRated = $("#ro_validityOfOffer").val();
//    alert(deliveryLeadTImeRated);
            if (mOQMOVDetailsRated !== '') {
                console.log("mOQMOVDetailsRated");
                $("#moqMovDetails_div").css("display", "block");
//        $("#moqMovDetails").show();
            }
            if (deliveryLeadTImeRated !== '') {
//        $("#deliveryLeadTime").show();
                console.log("deliveryLeadTImeRated");
                $("#deliveryLeadTime_div").css({display: "block"});
            }
            if (paymentTermsRated !== '') {
                console.log("paymentTermsRated");
                $("#paymentTerms_div").css({display: "block"});
            }
            if (brandModelRated !== '') {
                console.log("brandModelRated");
                $("#brandModel_div").css({display: "block"});
            }
            if (incotermsRated !== '') {
                console.log("incotermsRated");
                $("#incoterms_div").css({display: "block"});
            }
            if (validityOfferRated !== '') {
                console.log("validityOfferRated");
                $("#validityOfOffer_div").css({display: "block"});
            }
        </script>

    </body>
</html>
