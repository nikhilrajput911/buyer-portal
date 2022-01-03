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

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/jquery.dataTables.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">    
        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">
        
        <title>Vendor Details</title>

        <style>
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
                    <div class="container-fluid dashboard-content ">
                        <!-- ============================================================== -->
                        <!-- pageheader  -->
                        <!-- ============================================================== -->

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>

                        <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== -->
                        <div class="">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">Vendor Details</h5>
                                        <div class="card-body update-backgroud-color">
                                            <form action="registervendor.do" method="post" data-parsley-validate="" novalidate="">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" id="id" value="${vendorObj.id}" name="id">
                                                <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">
                                                <input type="hidden" id="requestFrom" value="vendorDetails" name="requestFrom">
                                                <input type="hidden" id="code" value="" name="code">

                                                <div class="row">
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="code" class="">Vendor Code Name:</label>
                                                            <input type="text" class="form-control form-rounded vendorCodeName" id="vendorCodeName" name="vendorCodeName" value="">
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="firstname">First Name:</label>
                                                            <input type="text" class="form-control form-rounded" id="firstname" name="firstname" value="${vendorObj.firstname}" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="lastname">Last Name:</label>
                                                            <input type="text" class="form-control form-rounded" id="lastname" name="lastname" value="${vendorObj.lastname}" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="vendoremail" class="">Vendor Email:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.emailid}" id="vendoremail" name="vendoremail" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="address" class="">Address:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.address}" id="address" name="address" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="city">City:</label>
                                                            <input type="text" class="form-control form-rounded" id="city" name="city" value="${vendorObj.city}" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="postalcode" class="">Postal Code:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.postalcode}" id="postalcode" name="postalcode" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="country">Country:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.country}" id="country" name="country" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="organization" class="">Organization</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.organization}" id="organization" name="organization" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="spocname">SPOC Name:</label>
                                                            <input type="text" class="form-control form-rounded" id="spocname" name="spocname" value="${vendorObj.spocname}"  readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="spocemail" class="">SPOC Email:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.spocemail}" id="spocemail" name="spocemail" readonly>

                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="contactnumberoff">Contact Number(Off):</label>
                                                            <input type="text" class="form-control form-rounded" id="contactnumberoff" name="contactnumberoff" value="${vendorObj.contactnumberoff}" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="contactnumbermob" class="">Contact Number(Mob):</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.contactnumbermob}" id="contactnumbermob" name="contactnumbermob" readonly>

                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="contactnumberfax">Contact Number(Fax):</label>
                                                            <input type="text" class="form-control form-rounded" id="contactnumberfax" name="contactnumberfax" value="${vendorObj.contactnumberfax}" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="paymentTerms" class="">Payment Terms:</label>
                                                            <input type="text" class="form-control form-rounded" id="paymentTerms" name="paymentTerms" value="${vendorObj.paymentTerms}" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="ordercurrency" class="">Order Currency:</label>
                                                            <input type="text" class="form-control form-rounded" id="ordercurrency" name="ordercurrency" value="${vendorObj.ordercurrency}" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="natureOfPurchase" class="">Nature of Purchase:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.natureOfPurchase}" id="natureOfPurchase" name="natureOfPurchase" readonly>

                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="companyRegNumber">Company Registration Number:</label>
                                                            <input type="text" class="form-control form-rounded" id="companyRegNumber" name="companyRegNumber" value="${vendorObj.companyRegNumber}" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="gstRegNumber" class="">GST Registration Number:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.gstRegNumber}" id="gstRegNumber" name="gstRegNumber" readonly>

                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="vendoremailAuto"> Vendor Alternate Email:</label>
                                                            <input type="text" class="form-control form-rounded" id="vendoremailAuto" name="vendoremailAuto" value="${vendorObj.vendoremailAuto}" readonly>
                                                        </div>
                                                    </div>
                                                </div>  
                                                <div class="row">
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="username" class="">Username:</label>
                                                            <input type="text" class="form-control form-rounded" value="${vendorObj.username}" id="username" name="username" readonly>

                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="notifyvendor" class="">Notify Vendor:</label>
                                                            <label class="custom-control custom-checkbox">
                                                                <input type="checkbox" name="notifyvendor" value="${vendorObj.notifyvendor}" id="notifyvendor" class="custom-control-input" checked="true"><span class="custom-control-label">Yes</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>          
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                                        <input type="submit" value="Register" class="btn btn-primary btn-rounded" id="registervendorbtn"/>
                                                        <input type="button" value="Get Vendor Bank Form" class="btn btn-success btn-rounded" id="getVendorBankForm"/>
                                                        <a href="authorizevendor.do" class="btn btn-dark btn-rounded">Close</a> 
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
                        </div>
                    </div>
                </div>
            </div>  
            <div class="modal fade" id="vendorMasterModal" tabindex="-1" role="dialog" aria-labelledby="vendorMasterModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="vendorMasterModalLabel">Vendor Master</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <input type="hidden" id="firstVMSno">
                            <input type="hidden" id="lastVMSno" value="1">

                            <div class="container-fluid">
                                <div class="card-body">

                                    <div class="table-responsive">
                                        <div class="row">
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
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="">Vendor Code/ Name:</label>
                                                    <input type="text" class="form-control form-rounded" id="vendorCodeOrName_SearchText" placeholder="Search by vendor code or name">
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <div class="btn-group" style="margin-top: 21px;">
                                                        <input type="button" class="btn btn-success btn-sm" id="searchVendorMasterBtn" value="Search">
                                                        <input type="button" class="btn btn-default btn-sm" id="clearSearchVendorMasterBtn" value="Clear">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <div class="btn-group" style="margin-top: 21px;">
                                                        <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterPrevBtn" value="Prev" disabled="true">
                                                        <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterNextBtn" value="Next">
                                                    </div>                                                        
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">                                                    
                                                <table class="table table-bordered table-hover vendorMasterTable" id="vendorMasterTable" style="width: 100%">
                                                    <thead class="">
                                                        <tr class="">
                                                            <th class="border-1" scope="col">Code</th>
                                                            <th class="border-1" scope="col">Name</th>
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
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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

        <script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="assets/js/vendor.js"></script>
        <script src="assets/js/vendorMasterPickList.js"></script>
        <script src="assets/js/newgen.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
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
        
        <script type="text/javascript">


            $(document).ready(function() {
                $(".chosen").chosen({
                });
                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

                var notifyvendor = $("#notifyvendor").val();
//               alert(notifyvendor);
                if (notifyvendor === "Yes") {
                    $('#notifyvendor').prop('checked', true);
                }
            });

        </script>

    </body>
</html>
