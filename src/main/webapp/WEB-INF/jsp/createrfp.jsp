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
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />
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

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">



        <style>
            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            .rfp_line_items_data_table thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
            ul{
                list-style-type: none;
            }
            .updategroup_vendor_table thead th {
                background-color: #5969ff !important;
                color: white !important;
            }
        </style>

        <title>Create RFP</title>
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
                                    <h2 class="pageheader-title">Create RFP </h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item">RFP Management</li>
                                                <li class="breadcrumb-item active" aria-current="page">Create RFP</li>
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
                                            <form action="submitrfpdetails.do" id="rfpdataform" method="post">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                                                <input type="hidden" name="ro_vendorname" id="ro_vendorname">
                                                <input type="hidden" name="ro_sapVendorCode" id="ro_sapVendorCode">
                                                <input type="hidden" name="rfq_operation" id="rfq_operation" value="create_rfp">
                                                <input type="hidden" name="ro_notifyVendor" id="ro_notifyVendor" value="Yes">
                                                <input type="hidden" name="rfpCreationDate" id="rfpCreationDate" value="<fmt:formatDate value="<%= new java.util.Date()%>" pattern="yyyy-MM-dd" />">

                                                <!-- SmartWizard html -->
                                                <div class="row">
                                                    <div class="col-12 col-lg-12 col-sm-12 text-right">
                                                        <div class="btn-group" role="group">
                                                            <!--<div class="btn-group" role="group" style="padding: 10px;text-align: right;">-->
                                                            <button class="btn btn-primary" id="prev-btn" type="button">Previous</button>
                                                            <button class="btn btn-primary next-btn" id="next-btn" type="button">Next</button>
                                                            <button class="btn btn-success finish-btn" id="finish-btn" type="button">Finish</button>
                                                            <!--<button class="btn btn-default" id="reset-btn" type="button">Reset</button>-->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="smartwizard">
                                                    <ul>
                                                        <li><a href="#step-1"><small>RFP Details</small></a></li>
                                                        <li><a href="#step-2"><small>Line Items Data</small></a></li>
                                                        <li><a href="#step-3"><small>Vendor Details</small></a></li>
                                                        <!--<li><a href="#step-4">Step 4<br /><small>Line Texts</small></a></li>-->
                                                        <!--<li><a href="#step-4">Step 4<br /><small>Other Comments</small></a></li>-->
                                                    </ul>

                                                    <div>
                                                        <div id="step-1" class="update-backgroud-color">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Basic Details</h3>-->


                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqNumber" class="">RFP Number</label>
                                                                        <input type="text" value="" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqRequestDate" class="">RFP Request Date:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="rfqRequestDate" name="rfqRequestDate" readonly/>

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename" />
                                                                        <ul class="filled" id="parsley-id-11">
                                                                            <li class="parsley-required" id="parsley_contactpersonename"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonetelno">Contact Person Tel. No.:</label>
                                                                        <input type="text" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno">
                                                                        <ul class="filled" id="parsley-id-22">
                                                                            <li class="parsley-required" id="parsley_contactpersonetelno"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div> 
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" />
                                                                        <ul class="filled" id="parsley-id-33">
                                                                            <li class="parsley-required" id="parsley_contactpersoneemail"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="deliveryterms" class="">Delivery Terms:</label>
                                                                        <input type="text" class="form-control form-rounded" id="deliveryterms" name="deliveryterms">
                                                                        <ul class="filled" id="parsley-id-44">
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
                                                                        <ul class="filled" id="parsley-id-55">
                                                                            <li class="parsley-required" id="parsley_paymentterms"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqvaliduntil" class="">RFP Valid Until:</label>
                                                                        <!--<input type="text" class="form-control form-rounded" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="rfqvaliduntil_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input" id="rfqvaliduntil" name="rfqvaliduntil" data-target="#rfqvaliduntil_div" />
                                                                            <div class="input-group-append" data-target="#rfqvaliduntil_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                        <ul class="filled" id="parsley-id-66">
                                                                            <li class="parsley-required" id="parsley_rfqvaliduntil"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="row">

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="expecteddeliverydate" class="">Expected Delivery Date:</label>
                                                                        <!--<input type="text" class="form-control form-rounded" id="expecteddeliverydate" name="expecteddeliverydate">-->

                                                                        <div class="input-group date" id="expecteddeliverydate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate" data-target="#expecteddeliverydate_div" />
                                                                            <div class="input-group-append" data-target="#expecteddeliverydate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                        <ul class="filled" id="parsley-id-77">
                                                                            <li class="parsley-required" id="parsley_expecteddeliverydate"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="" class="">RFP for:</label>
                                                                        <select id="rfpType" name="rfpType" class="custom-select">
                                                                            <option value="">Select</option>
                                                                            <option value="Material">Material</option>
                                                                            <option value="Service">Service</option>
                                                                        </select>
                                                                        <ul class="filled" id="parsley-id-88">
                                                                            <li class="parsley-required" id="parsley_rfptype"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="notifyvendor" class="">Notify Vendor:</label>
                                                                        <label class="custom-control custom-checkbox">
                                                                            <input type="checkbox" name="notifyvendor" id="notifyvendor" class="custom-control-input" checked="true"><span class="custom-control-label" required="">Yes</span>
                                                                        </label>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="step-2" class="update-backgroud-color">
                                                            <!--<h3 class="border-bottom border-gray pb-2">RFP Data</h3>-->
                                                            <div class="row">
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <button type="button" class="btn btn-outline-primary btn-rounded btn-sm" id="addRowBtn">Add Line Item</button>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">

                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="form-group" id="addbtn">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered rfp_line_items_data_table" id="rfp_line_items_data_table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th></th>
                                                                                        <th>Item Number</th>
                                                                                        <th>Plant</th>
                                                                                        <th>Material Code / Old Material Code / Short Text</th>
                                                                                        <th>Plant Code / Description</th>
                                                                                        <th>Delivery Date / Buyer</th>
                                                                                        <th>Matl. Long Text</th>
                                                                                        <th>Item Text</th>
                                                                                        <th>UoM</th>
                                                                                        <th>Quantity / UoM Store</th>
                                                                                        <th>Local Purchase</th>
                                                                                        <th>Storage Location</th>
                                                                                        <th>Price Per Unit / Currency</th>
                                                                                        <th>Notes to Supplier</th>
                                                                                        <th>MIQA Material</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td></td>
                                                                                        <td><input type="text" value="10" class="itemNumberClass" name="itemNumberClass" readonly></td>
                                                                                        <td>
                                                                                            <input type="hidden" class="plantIdClass" name="plantIdClass"> 
                                                                                            <input type="text" class="plantClass">
                                                                                        </td>
                                                                                        <td>
                                                                                            <input type="hidden" class="materialIdClass" name="materialIdClass"> 
                                                                                            <input type="text" class="materialCodeClass"> 
                                                                                            <input type="text" class="oldMaterialCodeClass"> 
                                                                                            <input type="text" class="shortTextClass">
                                                                                        </td>
                                                                                        <td><input type="text" class="plantCodeClass"> <input type="text" class="plantDescClass"></td>
                                                                                        <td><input type="date" name="deliveryDateClass" class="deliveryDateClass"> <input type="text"></td>
                                                                                        <td><input type="text" class="longTextLineClass"></td>
                                                                                        <td><input type="text" class="itemTextClass"></td>
                                                                                        <td><input type="text" class="uomClass"></td>
                                                                                        <td><input type="number" name="quantityClass"> <input type="text" class="uomStoreClass"></td>
                                                                                        <td><input type="text" class="localPurchaseClass" name="localPurchaseClass"></td>
                                                                                        <td><input type="text" class="storageLocationClass"></td>
                                                                                        <td><input type="text"> <input type="text"></td>
                                                                                        <td><input type="text" name="notesToSupplierClass"></td>
                                                                                        <td><input type="text" class="miqaMaterialClass" readonly></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="step-3" class="update-backgroud-color">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Line Items Data</h3>-->

                                                            <div class="row">

                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">

                                                                    <div class="form-group">
                                                                        <label for="groupselect" class="">Associate Vendor Group</label>
                                                                        <select id="groupselect" name="groupselect" class="selectpicker show-tick show-menu-arrow" title="Choose any vendor group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="vendorGroup" items="${VendorGroupList}">
                                                                                <option value="${vendorGroup.id}">${vendorGroup.groupname}</option>
                                                                            </c:forEach>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-3 col-3">
                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="addvendorsbtnfrommodal">Add Vendor</button>
                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="associateGroupBtnId">Create Vendor Group</button>
                                                                    <button type="button" style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="registerprospectbtn">Register Prospect</button>
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

                                                    </div>
                                                </div>
                                            </form>
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
                                                <th class="border-0 noExport"></th>
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
                        <button type="button" class="btn btn-primary" id="addselectedvendortotable">Add</button>
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
                                            <input type="text" data-parsley-length="[10,110]" class="form-control form-rounded" id="prospectvendorname" name="prospectvendorname" required>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="country" class="">Country: </label>
                                            <select class="form-control-sm custom-select" id="country" name="country" required>
                                                <option value="">--Select--</option>
                                                <c:forEach var="country" items="${countryList}" varStatus="status">
                                                    <option value="${country.name}">${country.name}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="address" class="">Address: </label>
                                            <input type="text" data-parsley-length="[10,500]" class="form-control form-rounded" id="address" name="address" required>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="contactfirstname" class="">Contact First Name: </label>
                                            <input type="text" data-parsley-length="[3,110]" class="form-control form-rounded" id="contactfirstname" name="contactfirstname" required>
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
                            <input type="hidden" name="vendorIdsForEditGroup" id="vendorIdsForEditGroup">
                            <input type="hidden" name="sapVendorCodeForEditGroup" id="sapVendorCodeForEditGroup">
                            <input type="hidden" name="vendorGroupFrom" id="vendorGroupFrom" value="rfp">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="groupname" class="">Group Name: </label>
                                        <input type="text" class="form-control form-rounded" id="groupname" name="groupname">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="table-responsive">
                                        <table class="table table-bordered updategroup_vendor_table" id="updategroup_vendor_table">
                                            <thead class="bg-primary">
                                                <tr>
                                                    <th>Vendor Name</th>
                                                    <th>Vendor Code</th>
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-pinterest btn-sm" id="addNewVendorToManageGroupBtn">Add Vendor</button>
                        <button type="button" class="btn btn-primary btn-sm" id="associatesubmitbtn">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="manageGroupAddVendorsDetailsModal" tabindex="-1" role="dialog" aria-labelledby="manageGroupAddVendorsDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="manageGroupAddVendorsDetailsModalLabel">Vendors</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <input type="hidden" id="firstVMSno_MG">
                        <input type="hidden" id="lastVMSno_MG" value="1">

                        <div class="row">
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="vendorType_MG">Vendor Type: </label>
                                    <select class="custom-select" id="vendorType_MG">
                                        <option value="PortalVendor">Portal Vendor</option>
                                        <option value="SapVendor">SAP Vendor</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="vendorMasterRecordCount_MG">Record Count: </label>
                                    <select class="custom-select" id="vendorMasterRecordCount_MG">
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
                                    <label for="vendorCodeOrName_SearchText_MG">Vendor Code/ Name:</label>
                                    <input type="text" class="form-control form-rounded" id="vendorCodeOrName_SearchText_MG" title="Search by code or name">
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                <div class="form-group">
                                    <div class="btn-group" style="margin-top: 21px;">
                                        <input type="button" class="btn btn-success btn-sm" id="searchVendorMasterBtn_MG" value="Search">
                                        <input type="button" class="btn btn-dark btn-sm" id="clearSearchVendorMasterBtn_MG" value="Clear">
                                        <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterPrevBtn_MG" value="Prev" disabled="true">
                                        <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterNextBtn_MG" value="Next">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover manageGroupAddVendorsDetailsModalTableId" id="manageGroupAddVendorsDetailsModalTableId" style="width:100%;">
                                        <thead>
                                            <tr class="border-0">
                                                <th class="border-0 noExport"></th>
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
                        <button type="button" class="btn btn-primary" id="manageGroupAddSelectedVendorToEditGroupTable">Add</button>
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
                        <!--<div class="container-fluid">-->
                        <!--<div class="card-body">-->
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
                                        <tr class="plantRowClass">
                                            <td>
                                                ${plant.name}
                                                <input type='hidden' class='plantMasterIdClass' value="${plant.sno}">
                                            </td>
                                            <td>${plant.plantCode}</td>
                                            <td>${plant.plantDesc}</td>
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
                        <!--<button type="button" class="btn btn-primary" id="addPlantToLineItemTabelBtn">Add</button>-->
                    </div>
                </div>
            </div>
        </div>      

        <div class="modal fade" id="materialMasterModal" tabindex="-1" role="dialog" aria-labelledby="materialMasterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="materialMasterModalLabel">Material Master</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!--<div class="container-fluid">-->
                        <!--<div class="card-body">-->
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
                                        <tr class="materialRowClass">
                                            <td>
                                                ${material.materialCode}
                                                <input type='hidden' class='materialMasterIdClass' value="${material.sno}">
                                            </td>
                                            <td>${material.companyCode}</td>
                                            <td>${material.plantCode}</td>
                                            <td>${material.shortText}</td>
                                            <td>
                                                <a href="#" class="longTextClass" title="Long Text" data-toggle="tooltip" data-placement="auto">
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
                        <!--</div>-->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <!--<button type="button" class="btn btn-primary" id="addPlantToLineItemTabelBtn">Add</button>-->
                    </div>
                </div>
            </div>
        </div>             
        <div class="modal fade" id="longTextModal" tabindex="-1" role="dialog" aria-labelledby="longTextLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="longTextLabel">Long Text</h5>
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

        <script src="assets/vendor/datepicker/moment.js"></script>
        <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
        <script src="assets/vendor/datepicker/datepicker.js"></script>
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

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="assets/js/createrfq.js"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <script src="assets/vendor/parsley/parsley.js"></script>
        <script src="assets/js/createrfp.js"></script>
        <script src="assets/js/vendorgrouping/manageVendorGroup.js"></script>
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
//                $(".input-group-text").click(function() {
//                    $(".bootstrap-datetimepicker-widget").removeClass(".usetwentyfour.top");
//                    $(".bootstrap-datetimepicker-widget").addClass(".float-right.bottom");
//                    $(".bootstrap-datetimepicker-widget").css("top", 36px);
//                    $(".bootstrap-datetimepicker-widget").css("bottom", "auto");
//                    $(".bootstrap-datetimepicker-widget").css("left", "auto");
//                    $(".bootstrap-datetimepicker-widget").css("right", 0);
//                });


                $(".chosen").chosen();

                $(".selectpicker").selectpicker();

                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");
                $('.needs-validation').parsley();

                $("#notifyvendor").click(function() {
//                    alert($(this).prop("checked"));
                    if ($(this).prop("checked") === true)
                    {
                        $("#ro_notifyVendor").val("Yes");
                    }
                    else if ($(this).prop("checked") === false)
                    {
                        $("#ro_notifyVendor").val("No");
                    }
                });

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

                $(".deliveryDateClass").attr("min", $("#rfpCreationDate").val());
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
//                                $(this).find("button.btn-reset").click(function() {
//                                    element.val(null);
//                                    $(this).parents(".input-file").find('input').val('');
//                                });
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
