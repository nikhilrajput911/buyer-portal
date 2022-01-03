
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
        <style>
            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            ul{
                list-style-type: none;
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
                                    <h2 class="pageheader-title">Create RFQ  </h2>
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
                        <!-- <div class="">
                             
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
                                        <div class="row">
                                            <div class="col-12 col-lg-12 col-sm-12">
                                                <div class="btn-group" role="group" style="padding: 8px;margin-left: 985px;">
                                                    <!--<div class="btn-group" role="group" style="padding: 10px;text-align: right;">-->
                                                    <button class="btn btn-primary" id="prev-btn" type="button">Previous</button>
                                                    <button class="btn btn-primary next-btn" id="next-btn" type="button">Next</button>
                                                    <button class="btn btn-success finish-btn" id="finish-btn" type="button">Finish</button>
                                                    <!--<button class="btn btn-default" id="reset-btn" type="button">Reset</button>-->
                                                </div>
                                            </div>
                                        </div>
                                        <!-- SmartWizard html -->
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
                                                    <form action="submitcontractrfqdetails.do" id="contractrfqdataform" method="post">
                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                        <input type="hidden" name="contractType" id="contractType" value="${contractType}">

                                                        <input type="hidden" name="contractRefId" id="contractRefId" value="${contractRefId}">

                                                        <!--                                                        <input type="hidden" name="ro_rfqTitle" id="ro_rfqTitle">
                                                                                                                <input type="hidden" name="ro_contactPerName" id="ro_contactPerName">
                                                                                                                <input type="hidden" name="ro_contactPerNo" id="ro_contactPerNo">
                                                                                                                <input type="hidden" name="ro_contactPerEmail" id="ro_contactPerEmail">-->
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
                                                        <input type="hidden" name="ro_selectparameters" id="ro_selectparameters">

                                                        <input type="hidden" name="ro_noteToSupl" id="ro_noteToSupl">

                                                        <input type="hidden" name="ratedParam" id="ratedParam" >


                                                        <input type="hidden" name="DefaultRatedParam" id="DefaultRatedParam" value="${ratedParam}">

                                                        <input type="hidden" name="rfq_operation" id="rfq_operation" value="rfq_for_contract">

                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqNumber" class="">RFQ Number</label>
                                                                    <input type="text"  class="form-control form-rounded" id="rfqNumber" name="rfqNumber" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqRequestDate" class="">RFQ Request Date:</label>
                                                                    <div class="input-group date" id="rfqRequestDate_div" data-target-input="nearest">
                                                                        <input type="text" onload="getDate()" class="form-control datetimepicker-input manual-date-input-check" id="rfqRequestDate" name="rfqRequestDate" data-target="#rfqRequestDate_div" readonly/>
                                                                        <div class="input-group-append" data-target="#rfqRequestDate_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="RFQTitle">RFQ Title:</label>
                                                                    <input type="text" class="form-control form-rounded" id="RFQTitle" name="RFQTitle">
                                                                </div>
                                                                <ul class="filled" id="parsley-id-9">
                                                                    <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                    <li class="parsley-required" id="parsley_rfqtitle"></li>
                                                                </ul>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="rfqvaliduntil" class="">RFQ Valid Until:</label>
                                                                    <div class="input-group date" id="rfqvaliduntil_div" data-target-input="nearest">
                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil" data-target="#TransactionInitiatedOn" />
                                                                        <div class="input-group-append" data-target="#rfqvaliduntil_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>
                                                                    </div>
                                                                    <ul class="filled" id="parsley-id-5">
                                                                        <li class="parsley-required" id="parsley_rfqvaliduntil"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                        </div>




                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="deliveryterms" class="">Delivery Terms:</label>

                                                                    <input type="text" class="form-control form-rounded" id="deliveryterms" name="deliveryterms">

                                                                    <ul class="filled" id="parsley-id-1">
                                                                        <li class="parsley-required" id="parsley_deliveryterms"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="paymentterms" class="">Payment Terms:</label>
                                                                    <select class="selectpicker show-tick show-menu-arrow" title="Choose payment terms..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="paymentterms" name="paymentterms">
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
                                                                    <label for="rfqcloseson" class="">Expected Delivery Date:</label>
                                                                    <div class="input-group date" id="expecteddeliverydate_div" data-target-input="nearest">
                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check " id="expecteddeliverydate" name="expecteddeliverydate" data-target="#expecteddeliverydate_div"  />
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
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersonename" class="">Contact Person Name:</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="contactpersonename" name="contactpersonename" />
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
                                                                    <input type="text" class="form-control form-rounded" id="contactpersonetelno" name="contactpersonetelno" required>
                                                                    <ul class="filled" id="parsley-id-13">
                                                                        <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                        <li class="parsley-required" id="parsley_contactpersonetelno"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>


                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersoneemail" class="">Contact Person Email:</label>
                                                                    <input type="text" class="form-control form-rounded form_date" id="contactpersoneemail" name="contactpersoneemail" />
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
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="agreementdate">Agreement Date:</label>

                                                                    <div class="input-group date" id="agreementdate_div" data-target-input="nearest">
                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check " id="agreementdate" name="agreementdate" data-target="#agreementdate_div"  />
                                                                        <div class="input-group-append" data-target="#agreementdate_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>

                                                                    </div>
                                                                    <ul class="filled" id="parsley-id-16">
                                                                        <li class="parsley-required" id="parsley_agreementdate"></li>
                                                                    </ul>

                                                                </div>
                                                            </div>


                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="validitystartdate" class="">Validity Start Date:</label>

                                                                    <div class="input-group date" id="validitystartdate_div" data-target-input="nearest">
                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check " id="validitystartdate" name="validitystartdate" data-target="#validitystartdate_div"  />
                                                                        <div class="input-group-append" data-target="#validitystartdate_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>

                                                                    </div>
                                                                    <ul class="filled" id="parsley-id-17">
                                                                        <li class="parsley-required" id="parsley_validitystartdate"></li>
                                                                    </ul>

                                                                </div>
                                                            </div>

                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="validityenddate" class="">Validity End Date:</label>

                                                                    <div class="input-group date" id="validityenddate_div" data-target-input="nearest">
                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check " id="validityenddate" name="validityenddate" data-target="#validityenddate_div"  />
                                                                        <div class="input-group-append" data-target="#validityenddate_div" data-toggle="datetimepicker">
                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                        </div>
                                                                    </div>
                                                                    <ul class="filled" id="parsley-id-18">
                                                                        <li class="parsley-required" id="parsley_validityenddate"></li>
                                                                    </ul>

                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersoneemail" class="">Purch Organization:</label>

                                                                    <select class="selectpicker show-tick show-menu-arrow form-control"  title="Choose Purchase Org..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="PurchOrganization" name="PurchOrganization">
                                                                        <optgroup>
                                                                            <c:forEach var="user" items="${purchaseList}">
                                                                                <option value="${user.purchaseOrgCode.trim()}" >${user.purchaseOrgCode} - ${user.purchaseOrgDesc}</option>
                                                                            </c:forEach>
                                                                        </optgroup>
                                                                    </select>

                                                                    <ul class="filled" id="parsley-id-19">
                                                                        <!--<li class="parsley-required" id="parsley_paymentterm_required"></li>-->
                                                                        <li class="parsley-required" id="parsley_PurchOrganization"></li>
                                                                    </ul>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="contactpersonetelno">Purch Group:</label>

                                                                    <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Purchase Group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="PurchaseGroup" name="PurchaseGroup">
                                                                        <!--<select>-->
                                                                        <optgroup>
                                                                            <c:forEach var="user" items="${masterPurchasingGroupList}">
                                                                                <option value="${user.purchasingGroupCode}" >${user.purchasingGroupCode} - ${user.purchasingGroupDesc}</option>
                                                                            </c:forEach>
                                                                        </optgroup>
                                                                    </select>
                                                                    <ul class="filled" id="parsley-id-20">
                                                                        <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                        <li class="parsley-required" id="parsley_PurchaseGroup"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="termofcontract">Term of Contract .:</label>
                                                                    <input type="text"  class="form-control form-rounded" id="termofcontract" name="termofcontract" required>
                                                                    <ul class="filled" id="parsley-id-21">
                                                                        <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                        <li class="parsley-required" id="parsley_termofcontract"></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                <div class="form-group">
                                                                    <label for="extofcontract">Extension of Contract .:</label>
                                                                    <input type="text" class="form-control form-rounded" id="extofcontract" name="extofcontract" required>
                                                                    <ul class="filled" id="parsley-id-22">
                                                                        <!--<li class="parsley-required" id="parsley_required"></li>-->
                                                                        <li class="parsley-required" id="parsley_extofcontract"></li>
                                                                    </ul>
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
                                                                                <th>S.No.</th>
                                                                                <th>Item Number</th>
                                                                                <th>Plant</th>
                                                                                <th>Material code</th>
                                                                                <th>Matl. Long Text</th>
                                                                                <th>Item Text</th>
                                                                                <th>Order Unit(UoM)</th>
                                                                                <th>Quantity / Currency</th>
                                                                                <th>Price Per Unit </th>
                                                                                <th>Local Purchase</th>

                                                                                <th>Notes to Buyer</th>
                                                                                <th>Notes to Supplier</th>
                                                                                <th>Attachments</th>
                                                                                <th>Documents</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="contract" items="${contractList}" varStatus="status">
                                                                                <tr>
                                                                                    <td>${status.count}</td>
                                                                                    <td>${contract.itemNumber}</td>
                                                                                    <td>${contract.plant}</td>
                                                                                    <td>${contract.materialCode}</td>
                                                                                    <td>
                                                                                        <a href="#" class="matlLongTextClass" title="Long Text" data-toggle="tooltip" data-placement="auto">
                                                                                            <i class="fa fa-file" aria-hidden="true" style="padding-left: 40px;"></i>
                                                                                        </a>
                                                                                        <input type="hidden" id="longTextId" class="longTextClass" value="${contract.matlLongText}">
                                                                                    </td>
                                                                                    <td>${contract.itemText}</td>
                                                                                    <td>${contract.uoM}</td>
                                                                                    <td>
                                                                                        <input type="hidden" class="contract-att-temp" value="non"/>
                                                                                        <input type="hidden" class="contract-id" value="${contract.insertionOrderID}"/>
                                                                                        <c:choose>
                                                                                            <c:when test="${contract.bpQuantityRemaining == '' || contract.bpQuantityRemaining == null }">
                                                                                                <input class="contract-line-item-qty" type="number" min="1" max="${contract.targetedQuantity}" value="${contract.targetedQuantity}" style="width: 50%;"/> 
                                                                                            </c:when>
                                                                                            <c:otherwise>
                                                                                                <input class="contract-line-item-qty" type="number" min="1" max="${contract.bpQuantityRemaining}" value="${contract.bpQuantityRemaining}" style="width: 50%;"/>                                                                                                 
                                                                                            </c:otherwise>
                                                                                        </c:choose>

                                                                                    </td>
                                                                                    <!--                                                                                    //perunit--><td>${contract.perPriceUnit}</td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td><input type="text" class="noteToSupplier" id="noteToSupplier" id="noteToSupplier"></td>
                                                                                    <td><button class="btn btn-outline-primary btn-sm btn-rounded upload-prline-document">Upload</button></td>
                                                                                    <td align="center">
                                                                                        <a href="#" title="View Documents" class="viewContractUploadedDocFromDB" style="pointer-events: none;opacity: 0.6;"><i class="fas fa-eye fa-2x"></i></a>
                                                                                    </td>
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
                                                            <button style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="addvendorsbtnfrommodal">Add Vendor</button>
                                                            <button style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="associateGroupBtnId">Create Vendor Group</button>
                                                            <button style="margin-top: 25px;" class="btn btn-outline-primary btn-sm btn-rounded" id="registerprospectbtn">Register Prospect</button>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered rfq-vendor-table" id="rfq_vendor_table">
                                                                    <thead class="bg-primary">
                                                                        <tr class="rfq_vendor_table_class">

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

                                                <div id="step-4" class="">
                                                    <!--<h3 class="border-bottom border-gray pb-2">Other Comments</h3>-->
                                                    <!--<input type="text" id="comment" name="comment">-->
                                                    <!--<textarea id="comment" name="comment"></textarea>-->
                                                    <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="autosendpo" class="">Auto-Send OLA:</label>
                                                                <label class="custom-control custom-checkbox">
                                                                    <input type="checkbox" name="autosendpo" id="autosendpo" class="custom-control-input" checked="true"><span class="custom-control-label">Yes</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="notifyvendor" class="">Notify Vendor:</label>
                                                                <label class="custom-control custom-checkbox">
                                                                    <input type="checkbox" name="notifyvendor" id="notifyvendor" class="custom-control-input" checked="true"><span class="custom-control-label">Yes</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="vendorrecipients" class="">Vendor Recipients:</label>
                                                                <!--<input type="text" class="form-control form-rounded" id="VendorRecipients" name="VendorRecipients">-->
                                                                <select multiple id="VendorRecipients" name="VendorRecipients" class="selectpicker show-tick show-menu-arrow selectpicker-bg-color" title="Choose Vendor Recipients..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                    <!--                                                                    <option>Select</option>
                                                                                                                                        <optgroup>
                                                                    <c:forEach var="vendor" items="${Vendor}" varStatus="status">
                                                                        <option>${vendor.emailid}</option>
                                                                    </c:forEach>
                                                                </optgroup>-->
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="internalrecipients" class="">Internal Recipients:</label>
                                                                <input type="text" class="form-control form-rounded" id="internalrecipients" name="internalrecipients">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="comment" class="">Note To Supplier</label><br>
                                                                <textarea id="comment" name="comment"></textarea>
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
                            <input type="hidden" name="vendorIdsForEditGroup" id="vendorIdsForEditGroup">
                            <input type="hidden" name="sapVendorCodeForEditGroup" id="sapVendorCodeForEditGroup">
                            <input type="hidden" name="vendorGroupFrom" id="vendorGroupFrom" value="rfq">
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
                        <button type="button" class="btn btn-success btn-sm" id="associatesubmitbtn">Submit</button>
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
                                            <input type="text" data-parsley-maxlength="3" class="form-control form-rounded" id="countrycode" name="countrycode" readonly>
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
        <!--Girivasu-->      
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
        <!--Girivasu-->
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
    <script src="assets/js/createcontractrfq.js"></script>
    <!--<script src="assets/js/dashboard.js"></script>-->
    <script src="assets/js/vendorgrouping/manageVendorGroup.js"></script>
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
    <!--<script src="assets/vendor/bootstrap-select/js/bootstrap-select.js"></script>-->


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


                                                                                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

//                $("#expecteddeliverydate").datepicker({minDate: 0});


//                Lobibox.alert("info", {
//                        msg: "RFQID is"
//                    });
//                    return false;


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
        });
        $(function() {
            bs_input_file();
        });



    </script>
</body>
</html>
