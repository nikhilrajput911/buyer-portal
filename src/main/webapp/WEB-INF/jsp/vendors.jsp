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
        <link rel="stylesheet" href="assets/libs/css/style.css">
        <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
        <link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">
        <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
        <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <!--<link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/jquery.dataTables.min.css">-->

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">
        <!--        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css">
                <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.4/css/buttons.bootstrap4.min.css">-->
        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">
        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/vendor/summernote/css/summernote-bs4.css">
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <title>Vendor Notification</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }
        </style>
    </head>

    <body>
        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">
            <!-- ============================================================== -->

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

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="page-header" id="pageheader">
                                        <h2 class="pageheader-title">Vendor Notifications </h2>
                                        <div class="page-breadcrumb">
                                            <nav aria-label="breadcrumb">
                                                <ol class="breadcrumb">
                                                    <li class="breadcrumb-item">Administrator</li>
                                                    <li class="breadcrumb-item active" aria-current="page">Vendor Notifications</li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="overlay">
                                <div id="loader"></div>
                            </div>


                            <div class="card">
                                <h5 class="card-header bg-primary">Vendors</h5>
                                <div class="card-body update-backgroud-color">
                                    <h3 class="text-align-center" style="color: green;display: none;">${message}</h3>
                                    <input type="hidden" name="message" id="message" value="${message}">

                                    <c:if test="${VendorList.size() > 0}">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-align-right">
                                                <button id="sendMessageToAllBtn" data-toggle="modal" data-target="#sendMessageToAllVendorModal" class="btn btn-outline-primary btn-rounded" title="Send message to all vendors">Send Message To All</button>
                                            </div>
                                        </div>
                                    </c:if>

                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                            <div class="table-responsive">
                                                <table class="table table-striped table-hover vendornotification" id="vendornotification">
                                                    <thead class="">
                                                        <tr class="">
                                                            <th class="border-0"></th>
                                                            <th class="border-0"></th>
                                                            <th class="border-0">Vendor Name</th>
                                                            <th class="border-0">Vendor Code</th>
                                                            <th class="border-0">Organization</th>
                                                            <th class="border-0">Vendor Email</th>
                                                            <th class="border-0">Country</th>
                                                            <th class="border-0">Vendor Username</th>
                                                            <th class="border-0"> Create Date</th>
                                                            <th class="border-0"> Update Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <c:forEach var="vendor" items="${VendorList}" varStatus="status">
                                                            <tr>
                                                                <td><input type="checkbox" value="${vendor.id}" class="vendor-checkbox-class"></td>
                                                                <td><a href="vendornotification.do?vendorid=${vendor.id}" title="Chat" data-toggle="tooltip" data-placement="auto"><i class='fas fa-comments fa-lg'></i></a></td>
                                                                <td>${vendor.firstname} ${vendor.lastname}</td>
                                                                <td>${vendor.code}</td>
                                                                <td>${vendor.organization}</td>
                                                                <td>${vendor.emailid}</td>
                                                                <td>${vendor.country}</td>
                                                                <td>${vendor.username}</td>
                                                                <td> <fmt:formatDate value="${vendor.createdate}" pattern="dd/MMM/yyyy hh:mm:ss" /></td>
                                                                <td> <fmt:formatDate value="${vendor.updatedate}" pattern="dd/MMM/yyyy hh:mm:ss" /></td>
                                                            </tr>
                                                        </c:forEach>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <c:forEach var="vendor" items="${VendorList}" varStatus="status">
                                    
                                </c:forEach>    

                                <div class="modal fade" id="sendMessageToAllVendorModal" tabindex="-1" role="dialog" aria-labelledby="sendMessageToAllLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="sendMessageToAllLabel">Send Message To All Vendors</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="container-fluid">
                                                    <form id="sendmessagetoallvendorform" action="makevendornotificationtoallvendors.do" method="post" enctype="multipart/form-data">
                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                        <input type="hidden" name="vendorids" id="vendorids" value="">
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="email editor">
                                                                    <div class="col-md-12 p-0">
                                                                        <div class="form-group">
                                                                            <label class="control-label sr-only" for="summernote">Descriptions </label>
                                                                            <textarea class="form-control" id="summernote" name="editordata" rows="6" placeholder="Write Descriptions"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="custom-file custom-file-naked">
                                                                        <input type="file" class="custom-file-input" id="customFile" name="customFile">
                                                                        <label class="custom-file-label" for="customFile">
                                                                            <button class="btn btn-sm btn-primary">Browse</button>
                                                                            <span id="file_name"></span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" id="sendMessageToAllVendorsModalBtn">Send</button>
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

        <!--<script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>-->
        <!--        <script src="https://cdn.datatables.net/1.10.18/js/dataTables.bootstrap4.min.js"></script>
                <script src="https://cdn.datatables.net/buttons/1.5.4/js/buttons.bootstrap4.min.js"></script>-->

        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <script src="assets/js/vendor.js"></script>
        <script src="assets/vendor/summernote/js/summernote-bs4.js"></script>

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
//                $("#mytasktable").dataTable();

                $(".selectpicker").selectpicker();

                $('#summernote').summernote({
                    height: 250

                });
                if ($("#message").val() !== "")
                {
                    Lobibox.alert("success", {
                        msg: 'Message sent successfully.'
                    });
                }
            });
        </script>

    </body>

</html>