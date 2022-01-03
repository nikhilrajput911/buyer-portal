<%-- 
    Document   : createrfp
    Created on : 8 Jan, 2019, 3:07:01 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
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
        <!--<link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/jquery.dataTables.min.css">-->

        <link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">
        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">
        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <title>Vendor</title>

    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>


            <!-- ============================================================== -->


            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="page-header" id="pageheader">
                                            <h2 class="pageheader-title">Create/ Manage Vendor </h2>
                                            <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                            <div class="page-breadcrumb">
                                                <nav aria-label="breadcrumb">
                                                    <ol class="breadcrumb">
                                                        <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Administrator</a></li>
                                                        <li class="breadcrumb-item active" aria-current = "page">Create/ Manage Vendor</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="overlay">

                                    <div id="loader"></div>

                                </div>
                                <input type="hidden" value="${msg}" id="msg"/>
                                <input type="hidden" value="${create}" id="create"/>
                                <input type="hidden" value="${update}" id="update"/>

                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                        <div class="accrodion-regular">
                                            <div id="accordion3">
                                                <div id="createvendordiv">
                                                    <div class="card">
                                                        <div class="card-header bg-primary" id="headingEight">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#createvendor" aria-expanded="false" aria-controls="createvendor">
                                                                    <span class="fas fa-angle-down mr-3"></span>Create Vendor
                                                                </button>   
                                                            </h5>
                                                        </div>
                                                        <div id="createvendor" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body update-backgroud-color">

                                                                <form action="savevendordetails.do" method="POST" class="needs-validation" id="createvendorform" data-parsley-validate="" novalidate="">
                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                    <input type="hidden" name="defailt_password" id="defailt_password" value="${defailt_password}">
                                                                    <input type="hidden" name="ro_notifyvendor" id="ro_notifyvendor" value="Yes">
                                                                    <input type="hidden" name="code" id="code">

                                                                    <div class="row">
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendorCodeName" class="">Vendor Code /Name:</label>
                                                                                <input type="text" class="form-control form-rounded vendorCodeName" id="vendorCodeName" name="vendorCodeName">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="organization" class="">Organization:</label>
                                                                                <input type="text" class="form-control form-rounded" id="organization" name="organization" readonly required>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="firstname">Vendor First Name:</label>
                                                                                <input type="text" data-parsley-length="[5,55]" data-parsley-trigger="keyup" class="form-control form-rounded" id="firstname" name="firstname">
                                                                                <!--<p id="p2" style="color: red"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="lastname" class="">Vendor Last Name:</label>
                                                                                <input type="text" data-parsley-length="[5,55]" data-parsley-trigger="keyup" class="form-control form-rounded" id="lastname" name="lastname">
                                                                                <!--<p id="p3" style="color: red"></p>-->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="city" class="">City:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,55]" data-parsley-trigger="keyup" id="city" name="city">
                                                                                <!--<p id="p3" style="color: red"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="country">Country:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,15]" data-parsley-trigger="keyup" id="country" name="country">
                                                                                <!--                                                                                <select class="selectpicker show-tick show-menu-arrow" id="country" name="country" title="Choose any country..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                                <c:forEach var="country" items="${countryList}" varStatus="status">
                                                                                    <option value="${country.name}">${country.name}</option>
                                                                                </c:forEach>
                                                                            </select>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="postalcode" class="">Postal Code:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,10]" data-parsley-trigger="keyup" id="postalcode" name="postalcode" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="emailid">Vendor Email:</label>
                                                                                <input type="email" class="form-control form-rounded" data-parsley-length="[10,110]" data-parsley-trigger="keyup" data-parsley-type="email" id="emailid" name="emailid">
                                                                                <!--<p id="p5" style="color: red"></p>-->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="spocname" class="">SPOC Name:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,55]" data-parsley-trigger="keyup" id="spocname" name="spocname" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="spocemail">SPOC Email:</label>
                                                                                <input type="email" class="form-control form-rounded" data-parsley-length="[10,110]" data-parsley-type="email" data-parsley-trigger="keyup" id="spocemail" name="spocemail" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="vendoremailAuto">Vendor Alternate Email:</label>
                                                                                <input type="email" class="form-control form-rounded" data-parsley-length="[10,110]" data-parsley-type="email" data-parsley-trigger="keyup" id="vendoremailAuto" name="vendoremailAuto" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="paymentTerms">Payment Term:</label>
                                                                                <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose payment terms..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="paymentTerms" name="paymentTerms" required>
                                                                                    <c:forEach var="paymentterm" items="${paymentterm}" varStatus="status">
                                                                                        <option value="${paymentterm.paymentTerms}">${paymentterm.paymentTerms} - ${paymentterm.description}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div> 
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="contactnumberoff">Conatct Number(off):</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[10,25]" data-parsley-trigger="keyup" id="contactnumberoff" name="contactnumberoff">
                                                                                <!--<p id="p8" style="color: red"></p>-->

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="contactnumbermob">Contact Number(Mob):</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[10,25]" data-parsley-trigger="keyup"  id="contactnumbermob" name="contactnumbermob">
                                                                                <!--<p id="p9" style="color: red"></p>-->

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="contactnumberfax">Contact Number(Fax):</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[10,25]" data-parsley-trigger="keyup" id="contactnumberfax" name="contactnumberfax">
                                                                                <!--<p id="p9" style="color: red"></p>-->

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="ordercurrency">Order Currency:</label>
                                                                                <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose order currency..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="ordercurrency" name="ordercurrency" required>
                                                                                    <c:forEach var="currency" items="${currencyList}" varStatus="status">
                                                                                        <option value="${currency.currencyCode}">${currency.currencyCode} - ${currency.currencyDesc}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">

                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="natureOfPurchase">Nature of Purchase:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[10,500]" data-parsley-trigger="keyup" id="natureOfPurchase" name="natureOfPurchase">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="companyRegNumber">Company Reg. number:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,25]" data-parsley-trigger="keyup" id="companyRegNumber" name="companyRegNumber">
                                                                                <!--<p id="p11" style="color: red"></p>-->

                                                                            </div> </div>			
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="gstRegNumber">GST Reg Number:</label>
                                                                                <input type=text class="form-control form-rounded" data-parsley-length="[5,25]" data-parsley-trigger="keyup" id="gstRegNumber" name="gstRegNumber">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="username">Vendor Username</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,10]" data-parsley-trigger="keyup" data-parsley-username id="username" name="username" required>
                                                                                <p id="p22" style="color: red"></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="password">Vendor Password:</label>
                                                                                <input type="password" class="form-control form-rounded" data-parsley-length="[8,20]" data-parsley-trigger="keyup" data-parsley-uppercase="1" data-parsley-lowercase="1" data-parsley-number="1" data-parsley-special="1" data-parsley-length-message="This length should be 8 to 20 characters long" id="password" name="password" required>
                                                                                <!--<p id="p11" style="color: red"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <label for="">Notify Vendor:</label>
                                                                            <div class="radio">
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" name="notifyvendor" id ="notifyvendorY" class="custom-control-input" checked="true"><span class="custom-control-label">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" name="notifyvendor" id="notifyvendorN" class="custom-control-input"><span class="custom-control-label">No</span>
                                                                                </label>
                                                                                <!--<p id="p14" style="color: red"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="address" class="">Address:</label><br>
                                                                                <textarea class="form-control" data-parsley-length="[5,500]" id="address" name="address" style="height:120px;"></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!--<hr>-->
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-align-center">

                                                                            <!--<button class="btn btn-outline-primary btn-rounded" type="button">Create</button>-->
                                                                            <input type="submit" value="Create" class="btn btn-outline-primary btn-rounded" id="createvendorbtn" onsubmit="checkForm(this);"/>   
                                                                        </div>
                                                                    </div>

                                                                </form>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="managevendordiv">
                                                    <div class="card mb-2">
                                                        <div class="card-header bg-primary" id="headingEight">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#managevendor" aria-expanded="false" aria-controls="managevendor">
                                                                    <span class="fas fa-angle-down mr-3" id="managevendorspan"></span>Manage Vendor
                                                                </button>       </h5>
                                                        </div>
                                                        <div id="managevendor" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body update-backgroud-color">

                                                                <div class="table-responsive">
                                                                    <table class="table table-striped table-hover vendordetails" id="vendordetails">
                                                                        <thead class="">
                                                                            <tr class="border-0">
                                                                                <th></th>
                                                                                <th></th>
                                                                                <!--<th> Code&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </th>-->
                                                                                <th>Organization</th>
                                                                                <th> First Name&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                                <th> Last Name&nbsp;&nbsp;&nbsp;</th>
                                                                                <th>City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                                <th> Country&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                                <th> Address</th>
                                                                                <th>Postal Code&nbsp;</th>
                                                                                <th> Email </th>
                                                                                <th>SPOC Name</th>
                                                                                <th>SPOC Email</th>
                                                                                <th>Vendor Email</th>
                                                                                <th> Contact Number(off)</th>
                                                                                <th> Contact Number(mob)</th>
                                                                                <th> Contact Number(fax)</th>
                                                                                <th> Payment Terms</th>
                                                                                <th> Order Currency</th>
                                                                                <th> Nature of Purchase</th>
                                                                                <th> Company Reg Number</th>
                                                                                <th> GST Reg Number</th>
                                                                                <th> Notify Vendor</th>
                                                                                <th> Vendor Username</th>
                                                                                <th> Create Date</th>
                                                                                <th> Update Date</th>
                                                                                <th style="visibility: hidden;"></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="vendor" items="${vendor}" varStatus="status">
                                                                                <tr>
                                                                                    <td><a href="#" title="Edit" class="editvendorlinkclass"><i class="far fa-edit fa-sm"></i></a> </td>
                                                                                    <td class="text-align-center"><a href="#" title='Delete Vendor' class="delete-vendor" value="${vendor.id}"><i class="fa fa-trash"></i></a> | <a href="#" title="${vendor.status == 'Block' ? 'Unblock Vendor' : 'Block Vendor'}" class="${vendor.status == 'Block' ? 'unblock-vendor' : 'block-vendor'}" value="${vendor.id}"><i class="${vendor.status == 'Block' ? 'fa fa-lock-open' : 'fa fa-lock'}"></i></a></td>
                                                                                    <!--<td>${vendor.code}</td>-->
                                                                                    <td>${vendor.organization}</td>
                                                                                    <td>${vendor.firstname}</td>
                                                                                    <td>${vendor.lastname}</td>
                                                                                    <td>${vendor.city}</td>
                                                                                    <td>${vendor.country}</td>
                                                                                    <td>${vendor.address}</td>
                                                                                    <td>${vendor.postalcode}</td>
                                                                                    <td>${vendor.emailid}</td>
                                                                                    <td>${vendor.spocname}</td>
                                                                                    <td>${vendor.spocemail}</td>
                                                                                    <td>${vendor.vendoremailAuto}</td>
                                                                                    <td>${vendor.contactnumberoff}</td>
                                                                                    <td>${vendor.contactnumbermob}</td>
                                                                                    <td>${vendor.contactnumberfax}</td>
                                                                                    <td>${vendor.paymentTerms}</td>
                                                                                    <td>${vendor.ordercurrency}</td>
                                                                                    <td>${vendor.natureOfPurchase}</td>
                                                                                    <td>${vendor.companyRegNumber}</td>
                                                                                    <td>${vendor.gstRegNumber}</td>
                                                                                    <td>${vendor.notifyvendor == 'on' ? 'Yes' : 'No'}</td>
                                                                                    <td>${vendor.username}</td>
                                                                                    <td> <fmt:formatDate value="${vendor.createdate}" pattern="dd.MM.yyyy" /></td>
                                                                                    <td> <fmt:formatDate value="${vendor.updatedate}" pattern="dd.MM.yyyy" /></td>
                                                                                    <td style="visibility: hidden;">${vendor.id}</td>
                                                                                </tr>
                                                                            </c:forEach>
                                                                        </tbody>

                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div id="editvendordiv" style="display:none;">
                                                    <div class="card">
                                                        <div class="card-header bg-primary" id="headingEight">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#createvendor" aria-expanded="false" aria-controls="createvendor">
                                                                    <span class="fas fa-angle-down mr-3"></span>Edit Vendor
                                                                </button>      
                                                            </h5>
                                                        </div>
                                                        <div id="editvendor" class="" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body">

                                                                <form action="updatedetails.do" class="needs-validation" method="POST" id="updatevendorform" data-parsley-validate="" novalidate="">
                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                    <input type="hidden" name="update_id" id="updatevendor_id" value="" >

                                                                    <div class="row">
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_code" class="">Vendor Code /Name:</label>
                                                                                <!--                                                                                <select class="selectpicker show-tick show-menu-arrow" id="update_code" name="update_code" title="Choose any vendor code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                                <c:forEach var="vendor" items="${vendorMasterList}" varStatus="status">
                                                                                    <option value="${vendor.vendorCode}">${vendor.vendorCode} - ${vendor.vendorName}</option>
                                                                                </c:forEach>
                                                                            </select>-->
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
                                                                                <input type="text" data-parsley-length="[5,55]" class="form-control form-rounded" id="update_firstname" name="update_firstname">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_lastname" class="">Last Name:</label>
                                                                                <input type="text" data-parsley-length="[5,55]" class="form-control form-rounded" id="update_lastname" name="update_lastname">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_city" class="">City:</label>
                                                                                <input type="text" data-parsley-length="[5,55]" data-parsley-trigger="keyup" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" class="form-control form-rounded" id="update_city" name="update_city">
                                                                                <!--<p id="u_p5" style="color: red"></p>-->

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_country">Country:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,15]" data-parsley-trigger="keyup" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="update_country" name="update_country">
                                                                                <!--                                                                                <select data-placeholder="choose" tabindex="1" class="custom-select" id="update_country" name="update_country">
                                                                                                                                                                    <option>--Select---</option>
                                                                                <c:forEach var="country" items="${countryList}" varStatus="status">
                                                                                    <option value="${country.country}">${country.country}</option>
                                                                                </c:forEach>
                                                                            </select>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_postalcode" class="">Postal Code:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,10]" id="update_postalcode" name="update_postalcode" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_emailid" class="">Vendor Email:</label>
                                                                                <input type="email" class="form-control form-rounded" data-parsley-length="[10,110]" data-parsley-type="email" id="update_emailid" name="update_emailid">
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_spocname">SPOC Name:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-length="[5,55]" id="update_spocname" name="update_spocname" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_spocemail">SPOC Email:</label>
                                                                                <input type="email" class="form-control form-rounded" data-parsley-type="email" id="update_spocemail" name="update_spocemail" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_vendoremailAuto">Vendor Alternate Email:</label>
                                                                                <input type="email" class="form-control form-rounded" data-parsley-type="email" id="update_vendoremailAuto" name="update_vendoremailAuto" required>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_paymentTerms">Payment Term:</label>
                                                                                <input type="text" class="form-control form-rounded"  id="update_paymentTerms" name="update_paymentTerms" readonly>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_contactnumberoff">Conatct Number(off):</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" id="update_contactnumberoff" name="update_contactnumberoff" required>
                                                                                <!--<p id="p8" style="color: red"></p>-->

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_contactnumbermob">Contact Number(Mob):</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" id="update_contactnumbermob" name="update_contactnumbermob" required>
                                                                                <!--<p id="p9" style="color: red"></p>-->

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_contactnumberfax">Contact Number(Fax):</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" id="update_contactnumberfax" name="update_contactnumberfax" required>
                                                                                <!--<p id="p9" style="color: red"></p>-->

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_ordercurrency">Order Currency:</label>
                                                                                <input type="text" class="form-control form-rounded" id="update_ordercurrency" name="update_ordercurrency" readonly>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_natureOfPurchase">Nature of Purchase:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="update_natureOfPurchase" name="update_natureOfPurchase" required>

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_companyRegNumber">Company Reg. number:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-type="digits" id="update_companyRegNumber" name="update_companyRegNumber" required>
                                                                            </div> </div>			
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_gstRegNumber">GST Reg Number:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-type="digits" id="update_gstRegNumber" name="update_gstRegNumber" required>
                                                                                <!--<p id="p11" style="color: red"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_username">Vendor Username:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z0-9]+$" data-parsley-length="[4,20]" name="update_username" id="update_username" readonly>
                                                                                <p id="u_p22" style="color: red"></p>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <label for="">Notify Vendor:</label>
                                                                            <div class="radio">

                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" name="update_notifyvendor" id ="update_notifyvendorY" class="custom-control-input" ><span class="custom-control-label">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" name="update_notifyvendor" id="update_notifyvendorN" class="custom-control-input" ><span class="custom-control-label">No</span>
                                                                                </label>
                                                                                <!--<p id="p14" style="color: red"></p>-->

                                                                            </div>

                                                                        </div>
                                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="address2" class="">Address:</label><br>
                                                                                <textarea class="form-control" id="address2" name="address2" style="height:120px;" readonly="true"></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr>

                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-align-center">

                                                                            <!--<button class="btn btn-outline-primary btn-rounded" type="button">Create</button>-->
                                                                            <input type="submit" value="Update"  class="btn btn-outline-primary btn-rounded" id="updatevendorbtn"/> 
                                                                            <input type="button" class="btn btn-outline-primary btn-rounded" id="changevendorpasswordbtn" value="Reset Password">
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
                                </div>


                            </div>

                            <!-- ============================================================== -->
                            <!-- sidenavbar -->
                            <!-- ============================================================== -->
                            <!--                            <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12">
                                                            <div class="sidebar-nav-fixed">
                                                                <ul class="list-unstyled">
                                                                    <li><a href="#pageheader" class="active">Overview</a></li>
                                                                    <li><a href="#createvendordiv">Create Vendor</a></li>
                                                                    <li><a href="#managevendordiv">Manage Vendor</a></li>
                            
                                                                </ul>
                                                            </div>
                                                        </div>-->
                            <!-- ============================================================== -->
                            <!-- end sidenavbar -->
                            <!-- ============================================================== -->

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
                                                    <label for="vendorCodeOrName_SearchText">Vendor Code/ Name:</label>
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
        <!--<script src="assets/js/createrfq.js"></script>-->
        <script src="assets/js/vendor.js"></script>
        <script src="assets/js/vendorMasterPickList.js"></script>
        <script src="assets/js/main.js"></script>
        <!--<script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>-->
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

        <script>
            $('.collapse').on('shown.bs.collapse', function() {
                $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
            }).on('hidden.bs.collapse', function() {
                $(this).parent().find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
            });
        </script>

        <script>
            $(document).ready(function() {
                $(".chosen").chosen({
                });
                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");
//                $("#vendordetails").dataTable();

                $('.needs-validation').parsley();
                $("#overlay").css("display", "none");


                //has uppercase
                window.Parsley.addValidator('uppercase', {
                    requirementType: 'number',
                    validateString: function(value, requirement) {
                        var uppercases = value.match(/[A-Z]/g) || [];
                        return uppercases.length >= requirement;
                    },
                    messages: {
                        en: 'Your password must contain at least (%s) uppercase letter.'
                    }
                });

                //has lowercase
                window.Parsley.addValidator('lowercase', {
                    requirementType: 'number',
                    validateString: function(value, requirement) {
                        var lowecases = value.match(/[a-z]/g) || [];
                        return lowecases.length >= requirement;
                    },
                    messages: {
                        en: 'Your password must contain at least (%s) lowercase letter.'
                    }
                });

                //has number
                window.Parsley.addValidator('number', {
                    requirementType: 'number',
                    validateString: function(value, requirement) {
                        var numbers = value.match(/[0-9]/g) || [];
                        return numbers.length >= requirement;
                    },
                    messages: {
                        en: 'Your password must contain at least (%s) number.'
                    }
                });

                //has special char
                window.Parsley.addValidator('special', {
                    requirementType: 'number',
                    validateString: function(value, requirement) {
                        var specials = value.match(/[^a-zA-Z0-9]/g) || [];
                        return specials.length >= requirement;
                    },
                    messages: {
                        en: 'Your password must contain at least (%s) special characters.'
                    }
                });
                if ($("#msg").val() !== "")
                {
                    var defailt_password = $("#defailt_password").val();
                    Lobibox.alert("success", {
                        msg: 'Default Password is ' + defailt_password
                    });
                }
                if ($("#create").val() !== "")
                {
                    var defailt_password = $("#defailt_password").val();
                    Lobibox.alert("success", {
                        msg: 'Vendor created successfully.'
                    });
                }
                if ($("#update").val() !== "")
                {
                    var defailt_password = $("#defailt_password").val();
                    Lobibox.alert("success", {
                        msg: 'Vendor updated successfully.'
                    });
                }

                $("#notifyvendorY").click(function() {
                    $("#ro_notifyvendor").val("Yes");
                });
                $("#notifyvendorN").click(function() {
                    $("#ro_notifyvendor").val("No");
                });
            });

        </script>

    </body>
</html>
