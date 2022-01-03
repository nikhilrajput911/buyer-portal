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

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" href="assets/css/custom.css">

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

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <h2 class="pageheader-title">Create RFP/ RFQ </h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">RFP/ RFQ Management</a></li>
                                                <li class="breadcrumb-item active" aria-current="page">Create RFP/ RFQ</li>
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
                                            <!-- SmartWizard html -->
                                            <div id="smartwizard">
                                                <ul>
                                                    <li><a href="#step-1">Step 1<br /><small>Basic Details</small></a></li>
                                                    <li><a href="#step-2">Step 2<br /><small>RFQ Data</small></a></li>
                                                    <li><a href="#step-3">Step 3<br /><small>Line Items Data</small></a></li>
                                                    <!--<li><a href="#step-4">Step 4<br /><small>Line Texts</small></a></li>-->
                                                    <li><a href="#step-4">Step 4<br /><small>Other Comments</small></a></li>
                                                </ul>

                                                <div>
                                                    <div id="step-1" class="">
                                                        <h3 class="border-bottom border-gray pb-2">Basic Details</h3>
                                                        <!--                                                        <form action="submitrfqdetails.do" id="basicdetailsform" method="post">
                                                                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">-->

                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                                                                <button class="btn btn-outline-primary btn-sm btn-rounded" data-toggle="modal" data-target="#registerprospect">Register Prospect</button>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                                                                <button class="btn btn-outline-primary btn-sm btn-rounded" data-toggle="modal" data-target="#associategroupmodal">Associate Group</button>
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <!--                                                                <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="">Refer Group</button>-->
                                                                <select id="groupselect" name="groupselect" class="selectpicker show-tick show-menu-arrow" title="Choose any vendor group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                    <c:forEach var="vendorGroup" items="${VendorGroupList}">
                                                                        <option value="${vendorGroup.id}">${vendorGroup.groupname}</option>
                                                                    </c:forEach>
                                                                </select>
                                                            </div>

                                                            <!-- Modal -->
                                                            <div class="modal fade" id="registerprospect" tabindex="-1" role="dialog" aria-labelledby="registerProspectLabel" aria-hidden="true">
                                                                <div class="modal-dialog modal-lg" role="document">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5 class="modal-title" id="registerProspectLabel">Register Prospect</h5>
                                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            <div class="container-fluid">
                                                                                <div class="row">
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectvendorname" class="">Prospect Vendor Name: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectvendorname" name="prospectvendorname">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectcountry" class="">country: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectcountry" name="prospectcountry">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectaddress" class="">Address: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectaddress" name="prospectaddress">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectcontactfname" class="">Contact First Name: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectcontactfname" name="prospectcontactfname">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectcountrycode" class="">Country Code: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectcountrycode" name="prospectcountrycode">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectcontactno_off" class="">Contact Number (off): </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectcontactno_off" name="prospectcontactno_off">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectcontactno_hp" class="">Contact Number (HP): </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectcontactno_hp" name="prospectcontactno_hp">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectemailadd" class="">E-Mail Address: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectemailadd" name="prospectemailadd">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectfaxno" class="">Fax Number: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectfaxno" name="prospectfaxno">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="prospectidno" class="">Prospect ID Number: </label>
                                                                                            <input type="text" class="form-control form-rounded" id="prospectidno" name="prospectidno">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                            <button type="button" class="btn btn-primary">Register</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="modal fade" id="associategroupmodal" tabindex="-1" role="dialog" aria-labelledby="associateGroupLabel" aria-hidden="true">
                                                                <div class="modal-dialog modal-lg" role="document">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h5 class="modal-title" id="associateGroupLabel">Associate Group</h5>
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
                                                                                            <label for="vendor" class="">Vendor: </label>
                                                                                            <select id="vendors" name="vendors" multiple class="selectpicker show-tick show-menu-arrow" title="Choose vendors..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                                                <c:forEach var="vendor" items="${VendorList}">
                                                                                                    <option value="${vendor.id}">${vendor.firstname} ${vendor.lastname}</option>
                                                                                                </c:forEach>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                            <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <br>
                                                        <div class="row">

                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="vendorname" class="">Vendor Code/ Name:</label>
                                                                    <!--<input type="text" class="form-control form-rounded" id="vendorname" name="vendorname">-->
                                                                    <!--<select multiple data-placeholder="Choose a vendor..." tabindex="1" class="form-control form-rounded chosen" id="vendorname" name="vendorname">-->
                                                                    <select multiple id="vendorname" name="vendorname" class="selectpicker show-tick show-menu-arrow" title="Choose vendors..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                        <c:forEach var="vendor" items="${VendorList}">
                                                                            <option value="${vendor.id}">${vendor.firstname} ${vendor.lastname}</option>
                                                                        </c:forEach>
                                                                    </select>

                                                                </div>
                                                            </div>

                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="companycode" class="">Company Code:</label>
                                                                    <input type="text" class="form-control form-rounded" id="companycode" name="companycode">
                                                                </div>
                                                            </div>


                                                        </div>

                                                        <div class="row">

                                                        </div>

                                                        <div class="row">

                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="vendoraddress" class="">Vendor Address:</label>
                                                                    <input type="text" class="form-control form-rounded" id="vendoraddress" name="vendoraddress">
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="vendoremail" class="">Vendor E-Mail Address:</label>
                                                                    <input type="text" class="form-control form-rounded" id="vendoremail" name="vendoremail">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">

                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="deliveryterms" class="">Delivery Terms:</label>
                                                                    <input type="text" class="form-control form-rounded" id="deliveryterms" name="deliveryterms">
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="paymentterms" class="">Payment Terms:</label>
                                                                    <input type="text" class="form-control form-rounded" id="paymentterms" name="paymentterms">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqvaliduntil" class="">RFQ Valid Until:</label>
                                                                    <input type="text" class="form-control form-rounded" id="rfqvaliduntil" name="rfqvaliduntil">
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="expecteddeliverydate" class="">Expected Delivery Date:</label>
                                                                    <input type="text" class="form-control form-rounded" id="expecteddeliverydate" name="expecteddeliverydate">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--                                                        <div class="row">
                                                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                        <div class="form-group">
                                                                                                                            <label for="validityoffer" class="">Validity of Offer:</label>
                                                                                                                            <input type="text" class="form-control form-rounded" id="validityoffer" name="validityoffer">
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                        <div class="form-group">
                                                                                                                            <label for="rfqcloseson" class="">RFQ Closes on:</label>
                                                                                                                            <input type="text" class="form-control form-rounded" id="rfqcloseson" name="rfqcloseson">
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>-->
                                                        <!--</form>-->
                                                    </div>
                                                    <div id="step-2" class="">
                                                        <h3 class="border-bottom border-gray pb-2">RFQ Data</h3>
                                                        <form action="submitrfqdetails.do" id="rfqdataform" method="post">
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

                                                            <input type="hidden" name="rfq_operation" id="rfq_operation" value="create">

                                                            <div class="row">
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqNumber" class="">RFQ Number</label>
                                                                        <input type="text" value="RFQ-22-01-001" class="form-control form-rounded" id="rfqNumber" name="rfqNumber" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="RFQTitle">RFQ Title:</label>
                                                                        <input type="text" class="form-control form-rounded" id="RFQTitle" name="RFQTitle">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <!--                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                    <div class="form-group">
                                                                                                                                        <label for="rfqstatus" class="">RFQ Status:</label>
                                                                                                                                        <input type="text" class="form-control form-rounded" id="rfqstatus" name="rfqstatus">
                                                                                                                                    </div>
                                                                                                                                </div>-->
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqRequestDate" class="">RFQ Request Date:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="rfqRequestDate" name="rfqRequestDate" />

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename" />

                                                                    </div>
                                                                </div>
                                                                <!--                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                    <div class="form-group">
                                                                                                                                        <label for="initiatorname">Initiator Name:</label>
                                                                                                                                        <input type="text" class="form-control form-rounded" id="initiatorname" name="initiatorname">
                                                                                                                                    </div>
                                                                                                                                </div>-->
                                                            </div>
                                                            <div class="row">

                                                                <!--                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                    <div class="form-group">
                                                                                                                                        <label for="projectnamecode">Project Name/ Number:</label>
                                                                                                                                        <input type="text" class="form-control form-rounded" id="projectnamecode" name="projectnamecode">
                                                                                                                                    </div>
                                                                                                                                </div>-->
                                                            </div>
                                                            <div class="row">

                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersonetelno">Contact Person Tel. No.:</label>
                                                                        <input type="text" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                        <input type="text" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                
                                                            </div>
                                                            <!--                                                            <div class="row">
                                                                                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="costcode" class="">Cost Code:</label>
                                                                                                                                    <select data-placeholder="Choose a cost code..." tabindex="1" class="form-control form-control-sm chosen" id="costcode" name="costcode">
                                                                                                                                        <option value=""></option>
                                                                                                                                        <option value="Code 1">Code 1</option>
                                                                                                                                        <option value="Code 2">Code 2</option>
                                                                                                                                        <option value="Code 3">Code 3</option>
                                                                                                                                    </select>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="negotationstyle">Negotiation Style:</label>
                                                                                                                                    <select data-placeholder="Choose a negotiation style..." tabindex="1" class="form-control form-control-sm chosen" id="negotationstyle" name="negotationstyle">
                                                                                                                                        <option value=""></option>
                                                                                                                                        <option value="Style 1">Style 1</option>
                                                                                                                                        <option value="Style 2">Style 2</option>
                                                                                                                                        <option value="Style 3">Style 3</option>
                                                                                                                                    </select>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="row">
                                                                                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="billtoaddress" class="">Bill To Address:</label>
                                                                                                                                    <textarea class="form-control text-area-rounded" id="billtoaddress" name="billtoaddress"></textarea>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="shiptoaddress">Ship To Address:</label>
                                                                                                                                    <textarea class="form-control text-area-rounded" id="shiptoaddress" name="shiptoaddress"></textarea>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="row">
                                                                                                                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="description" class="">Description:</label>
                                                                                                                                    <textarea class="form-control text-area-rounded" id="description" name="description"></textarea>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            
                                                                                                                        </div>-->
                                                        </form>
                                                    </div>

                                                    <div id="step-3" class="">
                                                        <h3 class="border-bottom border-gray pb-2">Line Items Data</h3>
                                                        <!--<form>-->
                                                        <!--                                                            <div class="row">
                                                                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                                                            <div class="form-group">
                                                                                                                                <label for="catagory" class="">Catagory:</label><br>
                                                                                                                                <select data-placeholder="Choose a catagory..." tabindex="1" class="form-control form-control-sm chosen" id="catagory" name="catagory">
                                                                                                                                    <option value=""></option>
                                                                                                                                    <option value="Catagory 1">Catagory 1</option>
                                                                                                                                    <option value="Catagory 2">Catagory 2</option>
                                                                                                                                    <option value="Catagory 3">Catagory 3</option>
                                                                                                                                </select>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                                                            <div class="form-group">
                                                                                                                                <label for="subcatagory" class="">Sub-catagory:</label><br>
                                                                                                                                <select data-placeholder="Choose a sub catagory..." tabindex="1" class="form-control form-control-sm chosen" id="subcatagory" name="subcatagory">
                                                                                                                                    <option value=""></option>
                                                                                                                                    <option value="SubCatagory 1">Sub Catagory 1</option>
                                                                                                                                    <option value="SubCatagory 2">Sub Catagory 2</option>
                                                                                                                                    <option value="SubCatagory 3">Sub Catagory 3</option>
                                                                                                                                </select>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                                                            <div class="form-group">
                                                                                                                                <label for="itemcode" class="">Item Code:</label><br>
                                                                                                                                <select data-placeholder="Choose a Item Code..." tabindex="1" class="form-control form-control-sm chosen" id="itemcode" name="itemcode">
                                                                                                                                    <option value=""></option>
                                                                                                                                    <option value="ItemCode 1">Item Code 1</option>
                                                                                                                                    <option value="ItemCode 2">Item Code 2</option>
                                                                                                                                    <option value="ItemCode 3">Item Code 3</option>
                                                                                                                                </select>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>-->
                                                        <div class="row">
                                                            <!--                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="itemname" class="">Item Name:</label><br>
                                                                                                                                    <input type="text" class="form-control form-rounded" id="itemname" name="itemname">
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="targetprice" class="">Target Price ($):</label><br>
                                                                                                                                    <input type="text" class="form-control form-rounded" id="targetprice" name="targetprice">
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                                                                <div class="form-group">
                                                                                                                                    <label for="qty" class="">Quantity:</label><br>
                                                                                                                                    <input type="text" class="form-control form-rounded" id="qty" name="qty">
                                                                                                                                </div>
                                                                                                                            </div>-->
                                                            <!--<div class="row">-->
                                                            <!--                                                                <div class="col-xl-2 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                                <div class="form-group" id="addbtn">
                                                                                                                                    <button class="form-control btn btn-outline-primary btn-sm btn-rounded" onclick="addRow();">Add</button>
                                                                                                                                </div>
                                                                                                                            </div>-->
                                                            <!--</div>-->
                                                            <!--                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                                <div class="form-group" id="addbtn">
                                                                                                                                    <table class="table table-bordered" id="mytable">
                                                                                                                                        <thead>
                                                                                                                                            <tr>
                                                                                                                                                <th>S.No</th>
                                                                                                                                                <th>Catagory</th>
                                                                                                                                                <th>Sub-Catagory</th>
                                                                                                                                                <th>Item Code</th>
                                                                                                                                                <th>Item Name</th>
                                                                                                                                                <th>Target Price ($)</th>
                                                                                                                                                <th>Quantity</th>
                                                                                                                                                <th></th>
                                                                                                                                            </tr>
                                                            
                                                            
                                                                                                                                        </thead>
                                                            
                                                                                                                                    </table>
                                                                                                                                </div>
                                                                                                                            </div>-->
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="form-group" id="addbtn">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered" id="line_items_data_table">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>S.No.</th>
                                                                                    <th>Item Number</th>
                                                                                    <th>Plant</th>
                                                                                    <th>Purchase Request Number/ Line/ Requestor</th>
                                                                                    <th>Material code</th>
                                                                                    <th>Plant Code/ Description</th>
                                                                                    <th>Delivery Date/ Buyer</th>
                                                                                    <th>Matl. Long Text</th>
                                                                                    <th>Item Text</th>
                                                                                    <th>UoM</th>
                                                                                    <th>Quantity/ UoM Store</th>
                                                                                    <th>Local Purchase</th>
                                                                                    <th>Storage Location</th>
                                                                                    <th>Project/ Last Buyer Name</th>
                                                                                    <th>Ageing of the PR</th>
                                                                                    <th>Last PO/ PO Date</th>
                                                                                    <th>Price Per Unit/ Currency</th>
                                                                                    <th>Last Supplier Name</th>
                                                                                    <th>Notes to Supplier</th>
                                                                                    <th>Notes to Buyer</th>
                                                                                    <th>MIQA Material</th>
                                                                                    <th>Attachments</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="pr" items="${PrList}" varStatus="status">
                                                                                    <tr>
                                                                                        <td>${status.count}</td>
                                                                                        <td>${pr.itemnumber}</td>
                                                                                        <td>${pr.plant}</td>
                                                                                        <td></td>
                                                                                        <td>${pr.materialcode}</td>
                                                                                        <td></td>
                                                                                        <td><fmt:formatDate value="${pr.expecteddeliverydate}" pattern="dd/MMM/yyyy"></fmt:formatDate></td>
                                                                                        <td>${pr.longtext}</td>
                                                                                        <td></td>
                                                                                        <td>${pr.orderunitUOM}</td>
                                                                                        <td><input type="hidden" class="pr-att-temp" value="non"/><input type="hidden" class="pr-id" value="${pr.id}"/><input type="text" value="${pr.quantityUsed}" disabled/><input class="pr-line-item-qty" type="number" min="1" max="${pr.quantityUsed}" value="${pr.quantityUsed}" style="width: 100%;"/></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td>${pr.currency}</td>
                                                                                        <td></td>
                                                                                        <td><input type="text"></td>
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
                                                        <!--</form>-->
                                                    </div>
                                                    <!--                                                    <div id="step-4" class="">
                                                                                                            <h3 class="border-bottom border-gray pb-2">Line Text</h3>
                                                                                                            <div class="row">
                                                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                                    <div class="table-responsive">
                                                                                                                        <table id="linetexttable" class="table table-bordered">
                                                                                                                            <thead>
                                                                                                                                <tr>
                                                                                                                                    <th>S.No.
                                                                                                                                    <th>Item Number</th>
                                                                                                                                    <th>Plant</th>
                                                                                                                                    <th>Material code</th>
                                                                                                                                    <th>Short Text</th>
                                                                                                                                    <th>Long Text</th>
                                                                                                                                    <th>Order Unit (UoM)</th>
                                                                                                                                    <th>Quantity</th>
                                                                                                                                    <th>Currency</th>
                                                                                                                                    <th>Unit Price</th>
                                                                                                                                    <th>Price Unit</th>
                                                                                                                                    <th>Expected Delivery Date</th>
                                                                                                                                    <th>Baseline Price (Per Unit)</th>
                                                                                                                                    <th>Terms to Supplier</th>
                                                                                                                                    <th>Notes to Buyer</th>
                                                                                                                                </tr>
                                                                                                                            </thead>
                                                                                                                            <tbody>
                                                    <c:forEach var="pr" items="${PrList}" varStatus="status">
                                                            <tr>
                                                                <td>${status.count}</td>
                                                                <td>${pr.itemnumber}</td>
                                                                <td>${pr.plant}</td>
                                                                <td>${pr.materialcode}</td>
                                                                <td>${pr.shorttext}</td>
                                                                <td>${pr.longtext}</td>
                                                                <td>${pr.orderunitUOM}</td>
                                                                <td>${pr.quantity}</td>
                                                                <td>${pr.currency}</td>
                                                                <td>${pr.unitprice}</td>
                                                                <td>${pr.priceunit}</td>
                                                                <td><fmt:formatDate value="${pr.expecteddeliverydate}" pattern="dd/MMM/yyyy"></fmt:formatDate></td>
                                                                <td>20</td>
                                                                <td><input type="text"/></td>
                                                                <td><input type="text"/></td>
                                                            </tr>
                                                    </c:forEach>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                                                                                    <div class="card">
                                                                                        <div class="card-header">My Details</div>
                                                                                        <div class="card-block p-0">
                                                                                            <table class="table">
                                                                                                <tbody>
                                                                                                    <tr> <th>Name:</th> <td>Tim Smith</td> </tr>
                                                                                                    <tr> <th>Email:</th> <td>example@example.com</td> </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </div>
                        </div>-->
                                                    <div id="step-4" class="">
                                                        <h3 class="border-bottom border-gray pb-2">Other Comments</h3>

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

        <script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="assets/js/createcontractrfq.js"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>


        <script type="text/javascript">

            $(function() {

                $('#rfqRequestDate').datepicker({
                    uiLibrary: 'bootstrap4',
                    format: 'dd-mm-yyyy'
                });

                $('#rfqvaliduntil').datepicker({
                    uiLibrary: 'bootstrap4',
                    format: 'dd-mm-yyyy'
                });


                $('#expecteddeliverydate').datepicker({
                    uiLibrary: 'bootstrap4',
                    format: 'dd-mm-yyyy'
                });
            });

            $(document).ready(function() {
                $(".chosen").chosen();

                $(".selectpicker").selectpicker();
            });

        </script>
        <script>
            
        </script>
    </body>
</html>
