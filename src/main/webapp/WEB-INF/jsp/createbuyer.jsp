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


        <title>Buyer</title>
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
                                            <h2 class="pageheader-title">Create/ Manage Buyer </h2>
                                            <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                            <div class="page-breadcrumb">
                                                <nav aria-label="breadcrumb">
                                                    <ol class="breadcrumb">
                                                        <li class="breadcrumb-item"><a href="#" class="breadcrumb-link">Administrator</a></li>
                                                        <li class="breadcrumb-item active" aria-current="page">Create/ Manage Buyer</li>
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
                                                <div id="createbuyerdiv">
                                                    <div class="card">
                                                        <div class="card-header bg-primary" id="headingEight">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#createbuyer" aria-expanded="false" aria-controls="createbuyer">
                                                                    <span class="fas fa-angle-down mr-3"></span>Create Buyer
                                                                    <!--<h4 class="font-color-white">Create Buyer</h4>-->
                                                                </button>      
                                                            </h5>
                                                        </div>
                                                        <div id="createbuyer" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body update-backgroud-color">
                                                                <form action="savebuyerdetails.do" class="needs-validation" method="post" id="createbyuerform" data-parsley-validate="" novalidate="">
                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                    <input type="hidden" name="defailt_password" id="defailt_password" value="${defailt_password}">
                                                                    <input type="hidden" name="ro_buyeradmin" id="ro_buyeradmin" value="No">
                                                                    <input type="hidden" name="ro_notifybuyer" id="ro_notifybuyer" value="No">
                                                                    <input type="hidden" name="ro_teamlead" id="ro_teamlead" value="No">
                                                                    <!--<p id="head" style="color: red;"></p>-->
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="username" class="">User Name:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-trigger="keyup" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z0-9]+$" data-parsley-length="[4,20]" id="username" name="username" required>
                                                                                <!--<p class="text-danger" id="p1"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="password">Password:</label>
                                                                                <input type="password" class="form-control form-rounded" data-parsley-trigger="keyup" data-parsley-length="[8,20]" data-parsley-uppercase="1" data-parsley-lowercase="1" data-parsley-number="1" data-parsley-special="1" data-parsley-length-message="This length should be 8 to 20 characters long" id="password" name="password" autocomplete="new-password" required>
                                                                                <!--<p class="text-danger" id="p2"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="firstname" class="">First Name:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-trigger="keyup" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="firstname" name="firstname" required>
                                                                                <!--<p class="text-danger" id="p3"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="lastname">Last Name:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-trigger="keyup" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="lastname" name="lastname" required>
                                                                                <!--<p class="text-danger" id="p4"></p>-->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="emailid" class="">Email Id:</label>
                                                                                <input type="email" class="form-control form-rounded" data-parsley-trigger="keyup" data-parsley-type="email" id="emailid" name="emailid" required>
                                                                                <!--<p class="text-danger" id="p5"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="buyerteamlead" class="">Buyer Team Lead:</label><br>
                                                                                <select class="selectpicker show-tick show-menu-arrow" id="buyerteamlead" name="buyerteamlead" title="Choose any Teamlead..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                                    <c:forEach var="buyer" items="${teamLeadList}" varStatus="status">
                                                                                        <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="purchaseGroup" class="">Purchasing Group: </label>
                                                                                <select multiple class="selectpicker show-tick show-menu-arrow" id="purchaseGroup" name="purchaseGroup" title="Choose any purchasing group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                                    <c:forEach var="group" items="${purchasingGroupList}" varStatus="status">
                                                                                        <option value="${group.sno}">${group.purchasingGroupCode} - ${group.purchasingGroupDesc}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="companyCode" class="">Company Code: </label>
                                                                                <select multiple class="selectpicker show-tick show-menu-arrow" id="companyCode" name="companyCode" title="Choose any company code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                                    <c:forEach var="code" items="${companyCodeList}" varStatus="status">
                                                                                        <option value="${code.companyCode}">${code.companyCode}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">

                                                                                <label for="admin" class="">Admin:</label>
                                                                                <!--                                                                                <input type="text" class="form-control form-rounded" id="teamlead" name="teamlead">-->
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" name="buyeradmin" id="adminyes" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio ">
                                                                                    <input type="radio"name="buyeradmin" id="adminno" class="custom-control-input"><span class="custom-control-label">No</span>
                                                                                </label>

                                                                                <!--<p class="text-danger" id="p7"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">

                                                                                <label for="notifybuyer" class="">Notify Buyer:</label>
                                                                                <!--                                                                                <input type="text" class="form-control form-rounded" id="teamlead" name="teamlead">-->
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" name="notifybuyer" id="notifybuyeryes" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio ">
                                                                                    <input type="radio" name="notifybuyer" id="notifybuyerno" class="custom-control-input"><span class="custom-control-label">No</span>
                                                                                </label>
                                                                                <!--<p class="text-danger" id="p8"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">

                                                                                <label for="teamlead" class="">Team Lead:</label>
                                                                                <!--                                                                                <input type="text" class="form-control form-rounded" id="teamlead" name="teamlead">-->
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" name="teamlead" id="teamleadyes" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio ">
                                                                                    <input type="radio" name="teamlead" id="teamleadno" class="custom-control-input"><span class="custom-control-label">No</span>
                                                                                </label>
                                                                                <!--<p class="text-danger" id="p9"></p>-->
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row">
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="align-center text-align-center">
                                                                                <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                                <input type="submit" class="btn btn-outline-primary btn-rounded" id="createbuyerbtn" value="Create">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="managebuyerdiv">
                                                    <div class="card mb-2">
                                                        <div class="card-header bg-primary" id="headingEight">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="#managebuyer" aria-expanded="false" aria-controls="managebuyer">
                                                                    <span class="fas fa-angle-down mr-3" id="managebuyerspan"></span>Manage Buyer
                                                                </button>       </h5>
                                                        </div>
                                                        <div id="managebuyer" class="collapse" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body update-backgroud-color">
                                                                <!--<div class="row">-->
                                                                <!--<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
                                                                <!--<div class="">-->
                                                                <div class="table-responsive" style="width:100%;">
                                                                    <table class="table table-striped table-hover buyerdetailstable" id="buyerdetailstable">
                                                                        <thead class="">
                                                                            <tr class="">
                                                                                <th class="block"></th>
                                                                                <th></th>
                                                                                <th>User Name</th>
                                                                                <th>First Name</th>
                                                                                <th>Last Name</th>
                                                                                <th>Email Id</th>
                                                                                <th>Buyer Team Lead</th>
                                                                                <th>Team Lead</th>
                                                                                <th>Admin</th>
                                                                                <th>Notify Buyer </th>
                                                                                <th>Create Date </th>
                                                                                <th>Update Date</th>
                                                                                <th>Purchasing Group</th>
                                                                                <th>Company Code</th>
                                                                                <th class="hidden"></th>
                                                                            </tr>

                                                                        </thead>
                                                                        <tbody>

                                                                            <c:forEach var="buyer" items="${buyer}" varStatus="status">
                                                                                <tr>
                                                                                    <td><a href="#" title="Edit" class="editbuyerlinkclass"><i class="far fa-edit fa-sm"></i></a></td>
                                                                                    <td class="text-align-center deleteBuyer"><a href="#" title='Delete Buyer'><i class="fa fa-trash"></i></a></td>
                                                                                    <td><c:out value="${buyer.username}"/></td>
                                                                                    <td>${buyer.firstname}</td>
                                                                                    <td>${buyer.lastname}</td>
                                                                                    <td>${buyer.emailid}</td>
                                                                                    <td>
                                                                                        <input type="hidden" class="teamleadid" value="${buyer.teamleadId.id}">
                                                                                        <input type="hidden" class="teamleadname" value="${buyer.teamleadId.firstname} ${buyer.teamleadId.lastname}">
                                                                                        ${buyer.teamleadId.firstname} ${buyer.teamleadId.lastname}
                                                                                    </td>
                                                                                    <td>${buyer.teamlead}</td>                                                                                   
                                                                                    <td>${buyer.buyeradmin}</td>
                                                                                    <td>${buyer.notifybuyer}</td>
                                                                                    <td><fmt:formatDate value="${buyer.createdate}" pattern="dd.MM.yyyy" /></td>
                                                                                    <td><fmt:formatDate value="${buyer.updatedate}" pattern="dd.MM.yyyy" /></td>
                                                                                    <td>${buyer.purchaseGroup}</td>
                                                                                    <td>${buyer.companyCode}</td>
                                                                                    <td class="hidden">${buyer.id}</td>
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
                                                <div id="editbuyerdiv" style="display: none;">
                                                    <div class="card">
                                                        <div class="card-header bg-primary" id="">
                                                            <h5 class="mb-0">
                                                                <button class="btn btn-link collapsed text-white" data-toggle="collapse" data-target="" aria-expanded="false" aria-controls="editbuyer">
                                                                    <span class="fas fa-angle-down mr-3"></span>Edit Buyer 
                                                                </button>
                                                            </h5>
                                                        </div>
                                                        <div id="editbuyer" class="" aria-labelledby="headingEight" data-parent="#accordion3">
                                                            <div class="card-body">
                                                                <form action="updatebuyerdetails.do" class="needs-validation" method="post" id="updatebuyerform" data-parsley-validate="" novalidate="">
                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                    <input type="hidden" name="updated_id" id="updated_id" value="">
                                                                    <input type="hidden" name="update_buyeradmin" id="update_buyeradmin" value="">
                                                                    <input type="hidden" name="update_notifybuyer" id="update_notifybuyer" value="">
                                                                    <input type="hidden" name="update_teamlead" id="update_teamlead" value="">
                                                                    <input type="hidden" name="ro_update_teamlead" id="ro_update_teamlead" value="">
                                                                    <input type="hidden" name="role" id="role">
                                                                    <input type="hidden" name="update_MasterPurchaseGroupSno" id="update_MasterPurchaseGroupSno">

                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_firstname" class="">First Name:</label>
                                                                                <input type="text" class="form-control form-rounded" id="update_firstname" name="update_firstname" required>
                                                                                <!--<p class="text-danger" id="u_p3"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_lastname">Last Name:</label>
                                                                                <input type="text" class="form-control form-rounded" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="update_lastname" name="update_lastname" required>
                                                                                <!--<p class="text-danger" id="u_p4"></p>-->
                                                                            </div> 
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_emailid" class="">Email Id:</label>
                                                                                <input type="email" class="form-control form-rounded"  data-parsley-type="email" id="update_emailid" name="update_emailid" required>
                                                                                <!--<p class="text-danger" id="u_p5"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12" id="buyer_team_lead_div">
                                                                            <div class="form-group">
                                                                                <label for="update_buyerteamlead" class="">Buyer Team Lead:</label><br>

                                                                                <select class="selectpicker show-tick show-menu-arrow" id="update_buyerteamlead" name="update_buyerteamlead" title="Choose any Teamlead..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                                    <c:forEach var="buyer" items="${teamLeadList}" varStatus="status">
                                                                                        <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="update_companyCode" class="">Company Code: </label>
                                                                                <select multiple class="selectpicker show-tick show-menu-arrow" id="update_companyCode" name="update_companyCode" title="Choose any company code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                                    <c:forEach var="code" items="${companyCodeList}" varStatus="status">
                                                                                        <option value="${code.companyCode}">${code.companyCode}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="purchaseGroup" class="">Purchasing Group: </label>
                                                                                <select multiple class="selectpicker show-tick show-menu-arrow" id="update_purchaseGroup" name="update_purchaseGroup" title="Choose any purchasing group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                                    <c:forEach var="group" items="${purchasingGroupList}" varStatus="status">
                                                                                        <option value="${group.sno}">${group.purchasingGroupCode} - ${group.purchasingGroupDesc}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">

                                                                                <label for="admin" class="">Admin:</label>
                                                                                <!--                                                                                <input type="text" class="form-control form-rounded" id="teamlead" name="teamlead">-->
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" class="custom-control-input" id="update_adminY" name="update_admin"><span class="custom-control-label">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio ">
                                                                                    <input type="radio" class="custom-control-input" id="update_adminN" name="update_admin"><span class="custom-control-label">No</span>
                                                                                </label>
                                                                                <!--<p class="text-danger" id="u_p6"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">

                                                                                <label for="notifybuyer" class="">Notify Buyer:</label>
                                                                                <!--                                                                                <input type="text" class="form-control form-rounded" id="teamlead" name="teamlead">-->
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" class="custom-control-input"  id="update_notifybuyerY" name="update_notifybuyer"><span class="custom-control-label">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio ">
                                                                                    <input type="radio"  class="custom-control-input" id="update_notifybuyerN" name="update_notifybuyer"><span class="custom-control-label">No</span>
                                                                                </label>
                                                                                <!--<p class="text-danger" id="u_p7"></p>-->
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                            <div class="form-group">

                                                                                <label for="teamlead" class="">Team Lead:</label>
                                                                                <!--                                                                                <input type="text" class="form-control form-rounded" id="teamlead" name="teamlead">-->
                                                                                <label class="custom-control custom-radio">
                                                                                    <input type="radio" class="custom-control-input" id="update_teamleadY" name="update_teamlead"><span class="custom-control-label">Yes</span>
                                                                                </label>
                                                                                <label class="custom-control custom-radio ">
                                                                                    <input type="radio" class="custom-control-input" id="update_teamleadN" name="update_teamlead"><span class="custom-control-label">No</span>
                                                                                </label>
                                                                                <!--<p class="text-danger" id="u_p8"></p>-->
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">

                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="align-center text-align-center">
                                                                                <!--<button class="btn btn-outline-primary btn-rounded ">Update</button>-->
                                                                                <input type="submit" class="btn btn-outline-primary btn-rounded" id="updatebuyerbtn" value="Update">
                                                                                <input type="button" class="btn btn-outline-primary btn-rounded" id="resetpasswordbtn" value="Reset Password">
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
                                </div>


                            </div>

                            <!-- ============================================================== -->
                            <!-- sidenavbar -->
                            <!-- ============================================================== -->
                            <!--                            <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12">
                                                            <div class="sidebar-nav-fixed">
                                                                <ul class="list-unstyled">
                                                                    <li><a href="#pageheader" class="active">Overview</a></li>
                                                                    <li><a href="#createbuyerdiv">Create Buyer</a></li>
                                                                    <li><a href="#managebuyerdiv">Manage Buyer</a></li>
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
        <!--<script src="assets/js/createrfq.js"></script>-->
        <script src="assets/js/buyer.js"></script>
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
            $(document).ready(function () {
                $(".chosen").chosen({
                });
//                $("#buyerdetailstable").dataTable();
                $('.needs-validation').parsley();
                $("#overlay").css("display", "none");
                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");
                //has uppercase
                window.Parsley.addValidator('uppercase', {
                    requirementType: 'number',
                    validateString: function (value, requirement) {
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
                    validateString: function (value, requirement) {
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
                    validateString: function (value, requirement) {
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
                    validateString: function (value, requirement) {
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
                    Lobibox.alert("success", {
                        msg: 'Buyer created successfully.'
                    });
                }
                if ($("#update").val() !== "")
                {
                    Lobibox.alert("success", {
                        msg: 'Buyer updated successfully.'
                    });
                }
            });
        </script>

    </body>
</html>
