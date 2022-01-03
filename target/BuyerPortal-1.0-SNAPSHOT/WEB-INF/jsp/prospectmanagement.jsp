<%-- 
    Document   : createrfp
    Created on : 8 Jan, 2019, 3:07:01 PM
    Author     : admin
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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

        <link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">
        <link rel="stylesheet" href="assets/css/custom.css">

        <!--<link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/jquery.dataTables.min.css">-->
        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <title>Prospect Management</title>
    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>

            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div id="overlay">
                            <div id="loader"></div>
                        </div>

                        <input type="hidden" value="${msg}" id="msg"/>
                        <input type="hidden" value="${create}" id="create"/>
                        <input type="hidden" value="${update}" id="update"/>

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <!--                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                <div class="page-header" id="pageheader">
                                    <h2 class="pageheader-title">Create/ Manage Prospect </h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item">Prospect Management</li>
                                                <li class="breadcrumb-item active" aria-current="page">Create/ Manage Prospect</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                                <!--                                    </div>
                                                                </div>-->


                                <!--                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                <div class="accrodion-regular">
                                    <div id="accordion3">
                                        <!--                                        <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                        <div id="createprospectdiv">
                                            <div class="card">
                                                <div class="card-header bg-primary" id="headingEight">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#createprospect" aria-expanded="false" aria-controls="createprospect">
                                                            <span class="fas fa-angle-down mr-3"></span>Create Prospect
                                                        </button>       
                                                    </h5>
                                                </div>
                                                <div id="createprospect" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                    <div class="card-body update-backgroud-color">
                                                        <form class="needs-validation" action="saveprospect.do" method="post" id="createprospectform" data-parsley-validate="" novalidate="">
                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                            <!--<p id="head" style="color: red;"></p>-->
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="username" class="">Username:</label>
                                                                        <input type="text" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z0-9]+$" data-parsley-length="[4,20]" data-parsley-username class="form-control form-rounded" id="username" name="username" readonly>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="password" class="">Password:</label>
                                                                        <input type="password" data-parsley-length="[8,20]" data-parsley-trigger="keyup" data-parsley-uppercase="1" data-parsley-lowercase="1" data-parsley-number="1" data-parsley-special="1" data-parsley-length-message="This length should be 8 to 20 characters long" class="form-control form-rounded" id="password" name="password" required>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="prospectvendorname" class="">Prospect Vendor Name:</label>
                                                                        <input type="text" data-parsley-length="[10,110]" data-parsley-trigger="keyup" class="form-control form-rounded" id="prospectvendorname" name="prospectvendorname" required>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="country">Country</label>
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
                                                                        <label for="address" class="">Address:</label>
                                                                        <input type="text" data-parsley-length="[10,500]" data-parsley-trigger="keyup" class="form-control form-rounded" id="address" name="address">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactfirstname">Contact First Name:</label>
                                                                        <input type="text" data-parsley-length="[10,110]" data-parsley-trigger="keyup" class="form-control form-rounded" id="contactfirstname" name="contactfirstname" required>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="countrycode" class="">Country Code:</label>
                                                                        <input type="text" class="form-control form-rounded" id="countrycode" name="countrycode" readonly>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactnumberoff" class="">Contact Number (off):</label>
                                                                        <input type="text" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-trigger="keyup" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="contactnumberoff" name="contactnumberoff">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactnumberHp" class="">Contact Number (HP):</label>
                                                                        <input type="text" data-parsley-type="digits" data-parsley-trigger="keyup" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="contactnumberHp" name="contactnumberHp">
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactemailid" class="">E-Mail Address:</label>
                                                                        <input type="email" data-parsley-type="email" data-parsley-trigger="keyup" class="form-control form-rounded" id="contactemailid" name="contactemailid" required>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="contactnumberfax" class="">Fax Number:</label>
                                                                        <input type="text" data-parsley-type="digits" data-parsley-trigger="keyup" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="contactnumberfax" name="contactnumberfax">
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-outline-primary btn-rounded" id="createprospectbtn" value="Create">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--                                            </div>
                                                                                </div>-->

                                        <!--                                        <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                        <div id="manageprospectdiv">
                                            <div class="card">
                                                <div class="card-header bg-primary" id="headingEight">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#manageprospect" aria-expanded="false" aria-controls="manageprospect">
                                                            <span class="fas fa-angle-down mr-3" id="manageprospectspan"></span>Manage Prospect
                                                        </button>       
                                                    </h5>
                                                </div>
                                                <div id="manageprospect" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                    <div class="card-body update-backgroud-color">
                                                        <!--<div class="row">-->
                                                        <!--<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                                        <!--<div class="">-->
                                                        <div class="table-responsive">
                                                            <table class="table table-hover table-striped prospectdetailstable" id="prospectdetailstable">
                                                                <thead class="">
                                                                    <tr class="">
                                                                        <th class=""></th>
                                                                        <th class=""></th>
                                                                        <th class="">Prospect Vendor Name</th>
                                                                        <th class="">Country&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                        <th class="">Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                                        <th class="">Contact First Name</th>
                                                                        <th class="">Country Code</th>
                                                                        <th class="">Contact Number (off)</th>
                                                                        <th class="">Contact Number (HP)</th>
                                                                        <th class="">E-Mail Address</th>
                                                                        <th class="">Fax Number</th>
                                                                        <th class="">Creation Date</th>
                                                                        <th class="">Status</th>
                                                                    </tr>

                                                                </thead>
                                                                <tbody>

                                                                    <c:forEach var="prospect" items="${ProspectList}" varStatus="status">
                                                                        <tr>
                                                                            <td><input type="hidden" value="${prospect.id}" class="propect-id"><a href="#" title="Edit" class="editprospectlinkclass"><i class="far fa-edit fa-sm"></i></a></td>
                                                                            <td class="text-align-center"><a href="#" title='Delete Prospect' class="delete-prospect" value="${prospect.id}"><i class="fa fa-trash"></i></a> | <a href="#" title='${prospect.status == 'Block' ? 'Unblock Prospect' : 'Block Prospect'}' class="${prospect.status == 'Block' ? 'unblock-prospect' : 'block-prospect'}" value="${prospect.id}"><i class="${prospect.status == 'Block' ? 'fa fa-lock-open' : 'fa fa-lock'}"></i></a></td>
                                                                            <td>
                                                                                <c:if test="${prospect.prospectvendorname == '' || prospect.prospectvendorname == null}">
                                                                                    ${prospect.firstname} ${prospect.lastname}
                                                                                </c:if>
                                                                                <c:if test="${prospect.prospectvendorname != ''}">
                                                                                    ${prospect.prospectvendorname}
                                                                                </c:if>
                                                                            </td>
                                                                            <td>${prospect.country}</td>
                                                                            <td>${prospect.address}</td>
                                                                            <td>${prospect.contactfirstname}</td>
                                                                            <td>${prospect.countrycode}</td>
                                                                            <td>${prospect.contactnumberoff}</td>
                                                                            <td>${prospect.contactnumberHp}</td>
                                                                            <td>${prospect.contactemailid}</td>
                                                                            <td>${prospect.contactnumberfax}</td>
                                                                            <td><fmt:formatDate value="${prospect.createdate}" pattern="dd.MM.yyyy"></fmt:formatDate></td>
                                                                            <td>${prospect.status}</td>
                                                                        </tr>
                                                                    </c:forEach>

                                                                </tbody>

                                                            </table>
                                                        </div>
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                        <!--</div>-->

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--                                            </div>
                                                                                </div>-->

                                        <!--                                        <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                        <div id="editprospectdiv" style="display: none;">
                                            <div class="card">
                                                <div class="card-header bg-primary" id="">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="" aria-expanded="false" aria-controls="editprospect">
                                                            <span class="fas fa-angle-down mr-3"></span>Edit Prospect
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="editprospect" class="" aria-labelledby="headingEight" data-parent="#accordion3">
                                                    <div class="card-body">
                                                        <form class="needs-validation" action="updateprospect.do" method="post" id="updateprospectform" data-parsley-validate="" novalidate="">

                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                            <input type="hidden" name="prospect_id" id="prospect_id" value="">
                                                            <input type="hidden" id="code" value="" name="code">

                                                            <sec:authorize access="!hasRole('ROLE_BUYER')">
                                                                <div class="row">
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="vendorCodeName" class="">Vendor Code:</label>
                                                                            <input type="text" class="form-control form-rounded vendorCodeName" id="vendorCodeName" name="vendorCodeName" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="update_prospectvendorname" class="">Prospect Vendor Name:</label>
                                                                            <input type="text" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" class="form-control form-rounded" id="update_prospectvendorname" name="update_prospectvendorname" required>

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="update_country">Country</label>
                                                                            <!--<input type="text" class="form-control form-rounded" id="update_country" name="update_country" required>-->
                                                                            <select class="form-control-sm custom-select" id="update_country" name="update_country" required>

                                                                                <c:forEach var="country" items="${countryList}" varStatus="status">
                                                                                    <option value="${country.name}">${country.name}</option>
                                                                                </c:forEach>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="update_address" class="">Address:</label>
                                                                            <input type="text" data-parsley-type="alphanum" class="form-control form-rounded" id="update_address" name="update_address" required>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </sec:authorize>    

                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="update_contactfirstname">Contact First Name:</label>
                                                                        <input type="text" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" class="form-control form-rounded" id="update_contactfirstname" name="update_contactfirstname" required>

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="update_countrycode" class="">Country Code:</label>
                                                                        <input type="text" class="form-control form-rounded" id="update_countrycode" name="update_countrycode"readonly>

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="update_contactnumber_off" class="">Contact Number (off):</label>
                                                                        <input type="text" data-parsley-type="digits" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="update_contactnumberOff" name="update_contactnumberOff" required>

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="update_contactnumber_hp" class="">Contact Number (HP):</label>
                                                                        <input type="text" data-parsley-type="digits" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="update_contactnumberHp" name="update_contactnumberHp" required>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="update_emailaddress" class="">E-Mail Address:</label>
                                                                        <input type="text" data-parsley-type="email" class="form-control form-rounded" id="update_emailaddress" name="update_emailaddress" required>

                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="update_faxnumber" class="">Fax Number:</label>
                                                                        <input type="text" data-parsley-type="digits" data-parsley-type="digits" data-parsley-length="[10,10]" data-parsley-length-message="This value should be exactly 10 characters long" class="form-control form-rounded" id="update_faxnumber" name="update_faxnumber" required>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded ">Update</button>-->
                                                                        <input type="submit" class="btn btn-outline-primary btn-rounded" id="updateprospectbtn" value="Update">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <!--                                                    </div> 
                                                                                                </div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--                                    </div>
                                                                </div>-->


                            </div>

                            <!-- ============================================================== -->
                            <!-- sidenavbar -->
                            <!-- ============================================================== -->
                            <!--                            <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12">
                                                            <div class="sidebar-nav-fixed">
                                                                <ul class="list-unstyled">
                                                                    <li><a href="#pageheader" class="active">Overview</a></li>
                                                                    <li><a href="#createprospectdiv">Create Prospect</a></li>
                                                                    <li><a href="#manageprospectdiv">Manage Prospect</a></li>
                                                                    <li><a href="#editbuyerdiv">Edit Buyer</a></li>
                            
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
            $(document).ready(function() {
                $(".chosen").chosen();

//                $("#prospectdetailstable").dataTable();

                $('.needs-validation').parsley();


                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

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

                if ($("#create").val() !== "")
                {
                    var defailt_password = $("#defailt_password").val();
                    Lobibox.alert("success", {
                        msg: 'Prospect created successfully and Prospect Id generated is ' + $("#create").val()
                    });
                }
                if ($("#update").val() !== "")
                {
                    var defailt_password = $("#defailt_password").val();
                    Lobibox.alert("success", {
                        msg: 'Prospect updated successfully.'
                    });
                }
            });



        </script>


    </body>
</html>
