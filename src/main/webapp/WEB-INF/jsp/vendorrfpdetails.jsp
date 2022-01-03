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

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />

        <style>
            .rfp_details_table thead th{
                background-color: #5969ff !important;
                color: white !important;
            }

            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            .input-group-text {
                padding: 7px;
            }
            ul{
                list-style-type: none;
            }
        </style>
        <title>RFP Details</title>
    </head>
    <body onload="setNotifyVendorInRfpDetails();">
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
                                    <h2 class="pageheader-title">Vendor RFP Details </h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
<!--                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="rfpdetails.do?id=${RfpHeader.id}" class="breadcrumb-link"><h3 style="background-color: gray;color: white;padding: 7px;border-radius: 15px;font-size: 14px;">Back</h3></a></li>
                                            </ol>
                                        </nav>
                                    </div>-->
                                </div>
                            </div>
                        </div>
                        <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== -->
                        <div class="">
                            <!--                            
                                                                                    <div class="row d-flex align-items-center p-3 my-3 text-white-50">
                                                                                        <div class="col-12 col-lg-6 col-sm-12">
                                                                                            <label>Theme:</label>
                                                                                            <select id="theme_selector" class="custom-select col-lg-6 col-sm-12">
                                                                                                <option value="default">default</option>
                                                                                                <option value="arrows">arrows</option>
                                                                                                <option value="circles">circles</option>
                                                                                                <option value="dots">dots</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div class="col-12 col-lg-6 col-sm-12">
                                                                                            <label>External Buttons:</label>
                                                                                            <div class="btn-group col-lg-6 col-sm-12" role="group">
                                                                                                <button class="btn btn-secondary" id="prev-btn" type="button">Go Previous</button>
                                                                                                <button class="btn btn-secondary" id="next-btn" type="button">Go Next</button>
                                                                                                <button class="btn btn-danger" id="reset-btn" type="button">Reset Wizard</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>-->

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <!--<h5 class="card-header">Contract Status Panel</h5>-->
                                        <div class="card-body">
                                            <form action="submitRfpDetails.do" id="rfpdataform" method="post">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" name="rfq_operation" id="rfq_operation" value="rfp_details">
                                                <input type="hidden" name="rfpid" id="rfpid" value="${RfpHeader.id}">
                                                <!-- SmartWizard html -->
                                                <div class="row">
                                                    <div class="col-6 col-lg-6 col-sm-6 text-left">
                                                        <a href="rfpdetails.do?id=${RfpHeader.id}" class="btn btn-dark">Back</a>
                                                    </div>
                                                    <div class="col-6 col-lg-6 col-sm-6 text-right">
                                                        <div class="btn-group" role="group">
                                                            <!--<div class="btn-group" role="group" style="padding: 10px;text-align: right;">-->
                                                            <button class="btn btn-primary" id="prev-btn" type="button">Previous</button>
                                                            <button class="btn btn-primary next-btn" id="next-btn" type="button">Next</button>
                                                            <!--<button class="btn btn-success finish-btn" id="finish-btn" type="button">Finish</button>-->
                                                            <!--<button class="btn btn-default" id="reset-btn" type="button">Reset</button>-->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="smartwizard">
                                                    <ul>
                                                        <li><a href="#step-1"><small>RFP Details</small></a></li>
                                                        <li><a href="#step-2"><small>Line Items Data</small></a></li>
                                                        <li><a href="#step-3"><small>Comments</small></a></li>
                                                    </ul>

                                                    <div>
                                                        <div id="step-1" class="">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Basic Details</h3>-->

                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqNumber" class="">RFP Number</label>
                                                                        <input type="text" value="${RfpHeader.rfpNumber}" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqRequestDate" class="">RFP Request Date:</label>
                                                                        <input type="text" value="<fmt:formatDate value="${RfpHeader.rfpRequestdate}" pattern="dd.MM.yyyy"></fmt:formatDate>" class="form-control form-rounded form_date" id="rfqRequestDate" name="rfqRequestDate" readonly/>

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="rfqvaliduntil" class="">RFP Valid Until:</label>
                                                                            <input type="text" value="<fmt:formatDate value="${RfpHeader.rfqValidUntil}" pattern="dd.MM.yyyy"></fmt:formatDate>" class="form-control form-rounded" id="rfqvaliduntil" name="rfqvaliduntil" readonly>

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="expecteddeliverydate" class="">Expected Delivery Date:</label>
                                                                            <input type="text" value="<fmt:formatDate value="${RfpHeader.expectedDeliveryDate}" pattern="dd.MM.yyyy"></fmt:formatDate>" class="form-control form-rounded" id="expecteddeliverydate" name="expecteddeliverydate" readonly>

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                            <input type="text" value="${RfpHeader.contactPersonName}" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename" readonly/>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonetelno">Contact Person Tel. No.:</label>
                                                                        <input type="text" value="${RfpHeader.contactPersonTel}" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                        <input type="text" value="${RfpHeader.contactPersonEmail}" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" readonly/>

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="validityOfOfferVendor" class="">Validity of Offer</label>
                                                                        <input type="text" value="<fmt:formatDate value="${SupplierRfpHeader.validityOfOffer}" pattern="dd.MM.yyyy"></fmt:formatDate>" class="form-control form-rounded" id="validityOfOfferVendor" name="validityOfOfferVendor" readonly>
                                                                            <ul class="filled" id="parsley-id-1">
                                                                                <li class="parsley-required" id="parsley_validityofoffer"></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="row">

                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="deliveryterms" class="">Delivery Terms (Buyer):</label>
                                                                            <input type="text" value="${RfpHeader.deliveryTerms}" class="form-control form-rounded" id="deliveryterms" name="deliveryterms" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="paymentterms" class="">Payment Terms (Buyer):</label>
                                                                        <input type="text" value="${RfpHeader.paymentTerms}" class="form-control form-rounded" id="paymentterms" name="paymentterms" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="deliverytermsvendor" class="">Delivery Terms (Vendor):</label>
                                                                        <input type="text" class="form-control form-rounded" id="deliverytermsvendor" name="deliverytermsvendor" value="${SupplierRfpHeader.deliverytermsvendor}" readonly>
                                                                        <ul class="filled" id="parsley-id-2">
                                                                            <li class="parsley-required" id="parsley_deliverytermsvendor"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="paymenttermsvendor" class="">Payment Terms (Vendor):</label>
                                                                        <input type="text" class="form-control form-rounded" id="paymenttermsvendor" name="paymenttermsvendor" value="${SupplierRfpHeader.paymenttermsvendor}" readonly>
                                                                        <ul class="filled" id="parsley-id-3">
                                                                            <li class="parsley-required" id="parsley_paymenttermsvendor"></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="step-2" class="">
                                                            <!--<h3 class="border-bottom border-gray pb-2">RFP Data</h3>-->

                                                            <div class="row">

                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="form-group" id="addbtn">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered rfp_line_items_data_table rfp_details_table" id="rfp_line_items_data_table">
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
                                                                                        <th>Vendor Unit (Quantity / Unit)</th>
                                                                                        <th>Vendor Price Offered / Unit</th>
                                                                                        <th>Vendor Price Offered (Total)</th>
                                                                                        <th>Expected Delivery Date</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <c:forEach var="supplierLine" items="${SupplierRfpLineItemList}">
                                                                                        <tr>
                                                                                            <td align="center">
                                                                                                <input type="hidden" name="plantMasterId" value="${supplierLine.plantMasterId.sno}">
                                                                                                <input type="hidden" name="materialMasterId" value="${supplierLine.materialMatserId.sno}">
                                                                                            </td>
                                                                                            <td align="center">${supplierLine.plantMasterId.name}</td>
                                                                                            <td align="center">${supplierLine.materialMatserId.shortText} / ${supplierLine.materialMatserId.oldMaterialNo}</td>
                                                                                            <td>${supplierLine.alternateMaterial}</td>
                                                                                            <td>${supplierLine.brand}</td>
                                                                                            <td>${supplierLine.materialMatserId.shortText}</td>
                                                                                            <td align="center">
                                                                                                <a href="#" class="longTextClass" title="Long Text">
                                                                                                    <i class="fa fa-file" aria-hidden="true"></i>
                                                                                                </a>
                                                                                                <input type="hidden" id="longTextClass" class="longTextClass" value="${supplierLine.materialMatserId.longText}">
                                                                                            </td>
                                                                                            <td align="center">${supplierLine.materialMatserId.baseUOM}</td>
                                                                                            <td align="center"></td>
                                                                                            <td>${supplierLine.quantityAvailable}</td>
                                                                                            <td>${supplierLine.currency}</td>
                                                                                            <td>${supplierLine.vendorUnitQuantity} / ${supplierLine.vendorUnit}</td>
                                                                                            <td>${supplierLine.vendorPriceOfferedPerUnit}</td>
                                                                                            <td>${supplierLine.vendorPriceOfferedTotal}</td>
                                                                                            <td><fmt:formatDate value="${supplierLine.expectedDeliveryDate}" pattern="dd-MM-yyyy"></fmt:formatDate></td>
                                                                                            </tr>
                                                                                    </c:forEach>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div id="step-3" class="">
                                                            <!--<h3 class="border-bottom border-gray pb-2">Line Items Data</h3>-->
                                                            <div class="row">
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="comment" class="">Comments</label>
                                                                        <textarea class="form-control" id="othercomment" name="othercomment" readonly>${SupplierRfpHeader.otherComment}</textarea>
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
        <script src="assets/js/createrfp.js"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <script src="assets/vendor/parsley/parsley.js"></script>

        <script src="assets/vendor/datepicker/moment.js"></script>
        <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
        <script src="assets/vendor/datepicker/datepicker.js"></script>

        <script type="text/javascript">

        $(function() {

        });

        $(document).ready(function() {
            $(".chosen").chosen();

            $(".selectpicker").selectpicker();
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
