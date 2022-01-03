<%-- 
    Document   : index
    Created on : 6 Jan, 2019, 6:05:34 PM
    Author     : admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>


<html lang="en">

    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
        <link href="assets/vendor/fonts/circular-std/style.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
        <link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">
        <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
        <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" href="assets/libs/css/style.css">
        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <title>Dashboard</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }
        </style>
        <!--        <style>
                    .file-field.medium .file-path-wrapper {
                        height: 3rem; }
                    .file-field.medium .file-path-wrapper .file-path {
                        height: 2.8rem; }
        
                    .file-field.big-2 .file-path-wrapper {
                        height: 3.7rem; }
                    .file-field.big-2 .file-path-wrapper .file-path {
                        height: 3.5rem; }
                    </style>-->
    </head>

    <body>
        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">
            <!-- ============================================================== -->
            <!--navbar-->
            <%--<sec:authentication property="principal.firstname"/>--%>

            <%--<sec:authorize access="hasRole('ROLE_USER')">
            </sec:authorize>--%>

            <%--<sec:authentication property="principal.authorities"/>--%>


            <%--<sec:authentication property="authorities" var="authorities" />
            <c:forEach items="${authorities}" var="auth">
                <h3>${auth.authority}</h3>
            </c:forEach>--%>


            <%@include file = "template.jsp" %>

            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div class="">

                            <div id="overlay">

                                <div id="loader"></div>

                            </div>

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="page-header" id="pageheader" style="margin-bottom: 0px;">
                                        <h2 class="pageheader-title">Group Management </h2>
                                        <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">

                                    <h3 class="text-align-center" style="color: green">${message}</h3>

                                    <div class="card">
                                        <h5 class="card-header bg-primary">Create Team Lead</h5>
                                        <div class="card-body update-backgroud-color">
                                            <form action="createteamleadid.do" method="post" class="needs-validation md-form" data-parsley-validate="" novalidate="">

                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" id="companycode" name="companycode">

                                                <div class="row">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="firstname" class="">First Name:</label>
                                                            <input type="text" class="form-control form-rounded" id="firstname" name="firstname" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="lastname" class="">Last Name:</label>
                                                            <input type="text" class="form-control form-rounded" id="lastname" name="lastname" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="emailid" class="">Email Id:</label>
                                                            <input type="text" data-parsley-type="email" class="form-control form-rounded" id="emailid" name="emailid" required>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="teamleadid" class="">Team Lead Id:</label>
                                                            <input type="text" class="form-control form-rounded" id="teamleadid" name="teamleadid" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="gm_companycode" class="">Company Code:</label>
                                                            
                                                            <select multiple class="selectpicker show-tick show-menu-arrow" id="gm_companycode" name="gm_companycode" title="Choose any company code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                <c:forEach var="code" items="${companyCodeList}" varStatus="status">
                                                                    <option value="${code.companyCode}">${code.companyCode}</option>
                                                                </c:forEach>
                                                            </select>
                                                        </div>
                                                    </div>
<!--                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="purchasinggroup">Purchasing Group:</label>

                                                            <select class="selectpicker show-tick show-menu-arrow" id="purchasinggroup" name="purchasinggroup" title="Choose any purchase group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                <c:forEach var="group" items="${purchaseGroupList}" varStatus="status">
                                                                    <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                </c:forEach>
                                                            </select>
                                                        </div>
                                                    </div>-->
                                                </div>

                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="align-center text-align-center">
                                                            <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                            <input type="submit" class="btn btn-outline-primary btn-rounded" id="" value="Create">
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">Associate Buyer</h5>
                                        <div class="card-body update-backgroud-color">

                                            <form action="associatebuyerteamlead.do" method="post" class="needs-validation md-form" data-parsley-validate="" novalidate="">

                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                                                <div class="row">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="ass_companycode" class="">Company Code:</label>
                                                            
                                                            <select class="selectpicker show-tick show-menu-arrow" id="ass_companycode" name="ass_companycode" title="Choose any company code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>
                                                                <c:forEach var="code" items="${companyCodeList}" varStatus="status">
                                                                    <option value="${code.companyCode}">${code.companyCode}</option>
                                                                </c:forEach>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="ass_teamleadid" class="">Team Lead Id:</label>
                                                            <select tabindex="1" class="custom-select ass_teamlead-class" id="ass_teamleadid" name="ass_teamleadid" required>
                                                                <option value="">Select</option>
                                                                <c:forEach var="buyer" items="${teamleadtList}">
                                                                    <option value="${buyer.id}">${buyer.username}</option>
                                                                </c:forEach>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="buyerid" class="">Buyer Id:</label>
                                                            <select multiple id="buyerid" name="buyerid" class="selectpicker show-tick show-menu-arrow selectpicker-bg-color" title="Choose buyer..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" required>

                                                            </select>
                                                            <input type="hidden" name="buyerids" id="buyerids">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="align-center text-align-center">
                                                            <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                            <input type="submit" class="btn btn-outline-primary btn-rounded" id="associatesubmitbtn" value="Associate">
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">Associated Buyer</h5>
                                        <div class="card-body update-backgroud-color">

                                            <!--<form action="associatebuyerteamlead.do" method="post" class="needs-validation md-form" data-parsley-validate="" novalidate="">-->

                                                <!--<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">-->

                                            <div class="row">
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="asstd_teamleadid" class="">Team Lead Id:</label>
                                                        <select tabindex="1" class="custom-select" id="asstd_teamleadid" name="asstd_teamleadid" required>
                                                            <option value="">Select</option>
                                                            <c:forEach var="buyer" items="${teamleadtList}">
                                                                <option value="${buyer.id}">${buyer.username}</option>
                                                            </c:forEach>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <!--</form>-->
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <table id="mappedbuyerstable" class="table table-striped table-bordered">
                                                        <thead class="bg-primary">
                                                            <tr>
                                                                <th>S.No.</th>
                                                                <th>Username</th>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>Email Id</th>
                                                                <th>Action</th>
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
                                                Copyright © 2018. All rights reserved.
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
            <!-- ============================================================== -->
            <!-- end wrapper  -->
            <!-- ============================================================== -->
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
        <script src="assets/vendor/charts/chartist-bundle/chartist.min.js"></script>
        <!--sparkline js--> 
        <script src="assets/vendor/charts/sparkline/jquery.sparkline.js"></script>
        <!--morris js--> 
        <!--        <script src="assets/vendor/charts/morris-bundle/raphael.min.js"></script>
                <script src="assets/vendor/charts/morris-bundle/morris.js"></script>-->
        <!--chart c3 js--> 
        <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
        <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
        <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>
        <!--<script src="assets/libs/js/dashboard-ecommerce.js"></script>-->

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>

        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>

        <script src="assets/js/dashboard.js"></script>
        <script src="assets/js/buyer.js"></script>

        <script src="assets/vendor/parsley/parsley.js"></script>

        <script>
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
            $(document).ready(function() {
//                $("#buyerdetailstable").dataTable();
                $("#overlay").css("display", "none");

                $('.needs-validation').parsley();
            });

        </script>

    </body>

</html>