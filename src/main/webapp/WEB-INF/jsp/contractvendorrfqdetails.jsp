<%-- 
    Document   : createrfp
    Created on : 8 Jan, 2019, 3:07:01 PM
    Author     : admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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

        <style>
            .lobibox-footer {
                background-color:whitesmoke !important;
            }
        </style>

        <title>RFQ</title>
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
                    <!--                    <div id="overlay">
                                            <div id="loader"></div>
                                        </div>-->
                    <div class="container-fluid dashboard-content">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <a href="contractrfqdetails.do?rfqid=${contractRfqHeaderObj.rfqid}" title="Go to RFQ details page" class="btn btn-primary btn-rounded">Back</a>
                            </div>
                        </div>
                        <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== -->
                        <br>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                <div class="card">
                                    <!--<h5 class="card-header">Contract Status Panel</h5>-->
                                    <div class="card-body">
                                        <!--                                        <form action="savevendorcontractrfqdetails.do" id="contract_rfq_form" method="POST">
                                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">-->
                                        <input type="hidden" name="rfqid" id="rfqid" value="${Rfq.rfqid}">
                                        <input type="hidden" name="vendorid" id="vendorid" value="${Vendor.id}">
                                        <input type="hidden" name="rfq_operation" id="rfq_operation" value="contract_rfq_venodr_details">
                                        <!-- SmartWizard html -->
                                        <div id="smartwizard">
                                            <ul>
                                                <li><a href="#step-1"><small>Basic Details</small></a></li>
                                                <li><a href="#step-2"><small>RFQ Data</small></a></li>
                                                <li><a href="#step-3"><small>Line Items Data</small></a></li>
                                                <li><a href="#step-5"><small>Other Comments</small></a></li>
                                            </ul>

                                            <div>
                                                <div id="step-1" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">Basic Details</h3>-->


                                                    <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="vendorname" class="">Vendor Name:</label>
                                                                <input type="text" class="form-control form-rounded" id="vendorname" name="vendorname" value="${vendorObj.firstname} ${vendorObj.lastname}" readonly>

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="deliveryterms" class="">Delivery Terms(Buyer):</label>
                                                                <input type="text" class="form-control form-rounded" id="deliveryterms" name="deliveryterms" value="${contractRfqHeaderObj.deliveryterms}" readonly>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="deliverytermsvendor" class="">Delivery Terms(Vendor):</label>
                                                                <input type="text" class="form-control form-rounded" id="deliverytermsvendor" name="deliverytermsvendor" value="${contractVenodrRfqHeaderObj.deliveryterms}" readonly>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="paymentterms" class="">Payment Terms(Buyer):</label>
                                                                <input type="text" class="form-control form-rounded" id="paymentterms" name="paymentterms" value= "${contractRfqHeaderObj.paymentterms}" readonly>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="paymenttermsvendor" class="">Payment Terms(Vendor):</label>
                                                                <input type="text" class="form-control form-rounded" id="paymenttermsvendor" name="paymenttermsvendor" value = "${contractVenodrRfqHeaderObj.paymentterms}" readonly>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="validityoffer" class="">Validity of Offer:</label>
                                                                <input type="text" class="form-control form-rounded" id="validityoffer" name="validityoffer" value="${contractVenodrRfqHeaderObj.validityOfOffer}" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div id="step-2" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">RFQ Data</h3>-->

                                                    <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqNumber" class="">RFQ No:</label>
                                                                <input type="text" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" value = "${contractRfqHeaderObj.rfqNumber}" readonly>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqRequestDate" class="">RFQ Request Date:</label>
                                                                <input type="text" class="form-control form-rounded" id="rfqRequestDate" name="rfqRequestDate" value = "<fmt:formatDate value="${contractRfqHeaderObj.rfqRequestDate}" pattern="dd-MM-yyyy" />" readonly>

                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqNumber" class="">RFQ Valid Until</label>
                                                                <input type="text" class="form-control form-rounded" id="rfqValidUntil" name="rfqValidUntil" value = "<fmt:formatDate value="${contractRfqHeaderObj.rfqvaliduntil}" pattern="dd-MM-yyyy" />" readonly>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqRequestDate" class="">Contact Person Name (NSH)</label>
                                                                <input type="text" class="form-control form-rounded" id="contactPersonName" name="contactPersonName" value = "${contractRfqHeaderObj.contactpersonename}" readonly>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqNumber" class="">Contact Person Tel.No  (NSH)</label>
                                                                <input type="text" class="form-control form-rounded" id="contactPersonTel" name="contactPersonTel" value = "${contractRfqHeaderObj.contactpersonetelno}" readonly>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="rfqRequestDate" class="">Contact Person E-Mail (NSH)</label>
                                                                <input type="text" class="form-control form-rounded" id="contactPersonEmail" name="contactPersonEmail" value = "${contractRfqHeaderObj.contactpersoneemail}" readonly>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--</form>-->
                                                </div>

                                                <div id="step-3" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">Line Items Data</h3>-->
                                                    <!--<form>-->

                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="form-group" id="addbtn">
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-hover" id="contract_rfq_lineitem_date_table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Item Number</th>
                                                                                <th>Plant</th>
                                                                                <th>Material code</th>
                                                                                <th>Alternate Material</th>
                                                                                <th>Brand</th>
                                                                                <th>Short Text</th>
                                                                                <th>Long Text</th>
                                                                                <th>Order Unit (UoM)</th>
                                                                                <th>Quantity</th>
                                                                                <th>Quantity Available</th>
                                                                                <th>Currency</th>
                                                                                <th>Vendor Unit (Quantity/ Unit)</th>
                                                                                <th>Vendor Price Offered/ Unit</th>
                                                                                <th>Vendor Price Offered (Total)</th>
                                                                                <th>Expected Delivery Date</th>
                                                                                <th>Terms to Supplier</th>
                                                                                <th>Notes to Buyer</th>
                                                                                <th>Attachment1</th>
                                                                                <th>Attachment2</th>
                                                                                <th>Attachment3</th>
                                                                                <th>Attachment4</th>
                                                                                <th>Attachment5</th>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="lineItem" items="${contractVenodrRfqLineItemList}" varStatus="status">
                                                                                <tr>
                                                                                    <td></td>
                                                                                    <td>${lineItem.newgenContractLineItemInsertionOrderID.plant}</td>
                                                                                    <td></td>
                                                                                    <td>${lineItem.alternatematerial}</td>
                                                                                    <td>${lineItem.alternatematerial}</td>
                                                                                    <td>${lineItem.newgenContractLineItemInsertionOrderID.shortText}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td>${lineItem.quantityAvailable}</td>
                                                                                    <td>${lineItem.quantityAvailable}</td>
                                                                                    <td>${lineItem.currency}</td>
                                                                                    <td>${lineItem.vendorunit}</td>
                                                                                    <td>${lineItem.vendorpriceofferedperunit}</td>
                                                                                    <td>${lineItem.vendorpriceofferedtotal}</td>
                                                                                    <td><fmt:formatDate value="${lineItem.expectedDeliverydate}" pattern="dd-MM-yyyy" /></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!--</div>-->
                                                </div>

                                                <div id="step-5" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">Other Comments</h3>-->
                                                    <textarea id="comment" name="comment" readonly>${contractVenodrRfqHeaderObj.otherComments}</textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <!--</form>-->
                                    </div>
                                </div>
                            </div>
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
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" id="uploadprlinefilesubmitbtn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>                                                
            <!-- ============================================================== 
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
<script src="assets/js/contract.js"></script>

<!--<script src="assets/js/rfq.js"></script>-->

<script type="text/javascript">

    $(function() {


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
</script>

</body>
</html>
