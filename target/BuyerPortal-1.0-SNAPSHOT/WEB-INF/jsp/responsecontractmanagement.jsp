<%-- 
    Document   : index
    Created on : 6 Jan, 2019, 6:05:34 PM
    Author     : abhishek.e
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

        <link rel="stylesheet" href="assets/vendor/summernote/css/summernote-bs4.css">
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">

        <title>Dashboard</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }
        </style>
    </head>

    <body onload="setRfqIdAndVendorId();">
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
                <div class="main-container">
                    <div class="container-fluid dashboard-content ">
                        <div class="">

                            <div class="navbar bg-white breadcrumb-bar border-bottom">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="query.do">Query</a>
                                        </li>
                                        <li class="breadcrumb-item">Response Management
                                        </li>
                                        <!--<li class="breadcrumb-item active" aria-current="page">Chat</li>-->
                                    </ol>
                                </nav>
<!--                                <div class="dropdown">
                                    <button class="btn btn-outline-light btn-sm" data-toggle="dropdown" aria-expanded="false">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#">Manage Members</a>
                                        <a class="dropdown-item" href="#">Subscribe</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item text-danger" href="#">Leave Chat</a>
                                    </div>
                                </div>-->
                            </div>
                            <!--<div class="content-container">-->

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <!--<h5 class="card-header">My Task</h5>-->
                                        <div class="card-body">
                                            <form action="makenotification.do" method="post" enctype="multipart/form-data">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" name="rfqid" id="rfqid" value="">
                                                <input type="hidden" name="vendorid" id="vendorid" value="">

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
                                                    <hr>
                                                    <div class="email action-send">
                                                        <div class="col-md-12 ">
                                                            <div class="form-group">
                                                                <button class="btn btn-primary btn-space" type="submit"><i class="icon s7-mail"></i> Send</button>
                                                                <button class="btn btn-secondary btn-space" type="button" id="cancelchatbtn"><i class="icon s7-close"></i> Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                            <hr>
                                            <div class="chat-module">
                                                <div class="chat-module-top">
                                                    <div class="chat-module-body">

                                                        <c:forEach var="notification" items="${NotificationList}">
                                                            <div class="media chat-item">
                                                                <img alt="William" src="assets/images/avatar-1.jpg" class="rounded-circle user-avatar-lg">
                                                                <div class="media-body">
                                                                    <div class="chat-item-title">
                                                                        <!--<span class="chat-item-author">${notification.ngBpBuyerdetailsId.firstname}</span>-->
                                                                        <c:if test="${notification.commentby == 'Buyer'}">
                                                                            <span class="chat-item-author">${notification.ngBpBuyerdetailsId.firstname}</span>
                                                                        </c:if>
                                                                        <c:if test="${notification.commentby == 'Vendor'}">
                                                                            <span class="chat-item-author">${notification.ngBpVendordetailsId.firstname}</span>
                                                                        </c:if>
                                                                        <span>${notification.commentdate}</span>
                                                                    </div>
                                                                    <div class="chat-item-body">
                                                                        ${notification.notification}
                                                                    </div>
                                                                    <div class="media media-attachment">
                                                                        <!--                                                                        <div class="avatar bg-primary">
                                                                                                                                                    <i class="fas fa-file"></i>
                                                                                                                                                </div>-->
                                                                        <div class="media-body">
                                                                            <a href="downloadqueryattachment.do?attid=${notification.id}" class="">${notification.attachmentname}</a>
                                                                            <span>${notification.attachmentsize}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </c:forEach>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--</div>-->

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
        <!--slimscroll js--> 
        <script src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
        <!--main js--> 
        <script src="assets/libs/js/main-js.js"></script>
        <!--chart chartist js--> 
        <script src="assets/vendor/charts/chartist-bundle/chartist.min.js"></script>
        <!--sparkline js--> 
        <script src="assets/vendor/charts/sparkline/jquery.sparkline.js"></script>

        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>

        <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <script src="assets/vendor/summernote/js/summernote-bs4.js"></script>
        <script src="assets/js/query.js"></script>


        <script>
        $(document).ready(function() {
            $('#summernote').summernote({
                height: 150
            });
            
//            $('.note-icon-picture').remove();
            $('.note-icon-picture').prop('disabled', true);
//            $(".note-icon-picture").disable();

            $("#cancelchatbtn").click(function() {
                location.href = "query.do";
            });
//            location.reload(true);
        });
        function setRfqIdAndVendorId()
        {
            var param = window.location.search.substring(1).split("&");
//            alert(param);
            $("#rfqid").val(param[0].split("=")[1]);
            $("#vendorid").val(param[1].split("=")[1]);
        }
        </script>

    </body>

</html>