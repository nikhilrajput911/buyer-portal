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

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">
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

                            <input type="hidden" value="${isPassUpdated}" id="ispasswordupdated">
                            <input type="hidden" value="${isPersonalInfoUpdated}" id="isPersonalInfoUpdated">
                            <input type="hidden" value="${personalDataUpdated}" id="personalDataUpdated">

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">Edit Profile</h5>
                                        <div class="card-body update-backgroud-color">
                                            <!--<div class="table-responsive">-->
                                            <form action="editbuyerprofile.do" class="needs-validation md-form" method="post" id="createbyuerform" data-parsley-validate="" novalidate="" enctype="multipart/form-data">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <!--<p id="head" style="color: red;"></p>-->

                                                <div class="row">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="firstname" class="">First Name:</label>
                                                            <input type="text" class="form-control form-rounded" data-parsley-length="[4,20]" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="firstname" name="firstname" value="${buyerObj.firstname}" required>
                                                            <!--<p class="text-danger" id="p3"></p>-->
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="lastname">Last Name:</label>
                                                            <input type="text" class="form-control form-rounded" data-parsley-length="[4,20]" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="lastname" name="lastname" value="${buyerObj.lastname}" required>
                                                            <!--<p class="text-danger" id="p4"></p>-->
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="emailid" class="">Email Id:</label>
                                                            <input type="email" class="form-control form-rounded" data-parsley-type="email" id="emailid" name="emailid" value="${buyerObj.emailid}" required>
                                                            <!--<p class="text-danger" id="p5"></p>-->
                                                        </div>
                                                    </div>    
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="question1" class="">Security Question 1:</label>
                                                            <select  tabindex="1" class="custom-select" id="question1" name="question" required>
                                                                <option value="">--Select--</option>
                                                                <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                                                    <option>${secQuesSeeded.secquestion}</option>
                                                                </c:forEach>
                                                            </select>
                                                            <input type="hidden" name="secQue1" id="secQue1" value="${queAns.size() == 0 ? '' : queAns.get(0).question}"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="question2" class="">Security Question 2:</label>
                                                            <select  tabindex="1" class="custom-select" id="question2" name="question" required>
                                                                <option value="">--Select--</option>
                                                                <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                                                    <option>${secQuesSeeded.secquestion}</option>
                                                                </c:forEach>
                                                            </select>
                                                            <input type="hidden" name="secQue2" id="secQue2" value="${queAns.size() == 0 ? '' : queAns.get(1).question}"/>
                                                            <!--<p class="text-danger" id="p5"></p>-->
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="question3" class="">Security Question 3:</label>
                                                            <select  tabindex="1" class="custom-select" id="question3" name="question" required>
                                                                <option value="">--Select--</option>
                                                                <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                                                    <option>${secQuesSeeded.secquestion}</option>
                                                                </c:forEach>
                                                            </select>
                                                            <!--<p class="text-danger" id="p5"></p>-->
                                                            <input type="hidden" name="secQue3" id="secQue3" value="${queAns.size() == 0 ? '' : queAns.get(2).question}"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="answer1" class="">Answer 1:</label>
                                                            <input type="text" class="form-control form-rounded" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$"  id="answer1" name="answer" value="${queAns.size() == 0 ? '' : queAns.get(0).answer}" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="answer2" class="">Answer 2:</label>
                                                            <input type="text" class="form-control form-rounded"  data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" value="${queAns.size() == 0 ? '' : queAns.get(1).answer}" id="answer2" name="answer" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="answer3" class="">Answer 3:</label>
                                                            <input type="text" class="form-control form-rounded" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" value="${queAns.size() == 0 ? '' : queAns.get(2).answer}" id="answer3" name="answer" required>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="profilepicture" class="">Profile Picture:</label>
                                                            <div class="input-group input-file" name="Fichier1">
                                                                <span class="input-group-btn">
                                                                    <button class="btn btn-primary btn-choose" type="button">Choose</button>
                                                                </span>
                                                                <input type="text" class="form-control" placeholder='Choose a file...' />
                                                                <span class="input-group-btn">
                                                                    <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="align-center text-align-center">
                                                            <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                            <input type="submit" class="btn btn-outline-primary btn-rounded" id="createbuyerbtn" value="Update">
                                                            <a href="#" data-toggle="modal"  data-target="#cancelEditProfile" class="btn btn-outline-primary btn-rounded" id="editprofilecancelBtn">Cancel</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <!--</div>-->
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
        <!--         <div class="modal fade" id="cancelEditProfile" tabindex="-1" role="dialog" >
                    <div class="modal-dialog" role="dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirm </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
        
                                <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                               Do you want to cancel edtited record ?
                                                                                   </div>
                                            </div>
                                        </div>
                                       
                                        
                                    
                                </div>
                            </div>
                            <div class="modal-footer">
                                            <button type="button" class="btn btn-default btn-rounded" data-dismiss="modal">No</button>
                                            <a href="dashboardcont.do" class="btn btn-outline-primary btn-rounded" id="associatesubmitbtn">Yes</a>
                                        </div>
                        </div>
                    </div>
                </div>-->

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
        <!--        <script src="assets/js/dashboard.js"></script>-->

        <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.buttons.min.js"></script>
        <script src="assets/vendor/datatables/js/buttons.bootstrap4.min.js"></script>
        <script src="assets/vendor/datatables/js/data-table.js"></script>
        <script src="assets/vendor/datatables/js/jszip.min.js"></script>
        <script src="assets/vendor/datatables/js/pdfmake.min.js"></script>
        <script src="assets/vendor/datatables/js/vfs_fonts.js"></script>
        <script src="assets/vendor/datatables/js/buttons.html5.min.js"></script>
        <script src="assets/vendor/datatables/js/buttons.print.min.js"></script>
        <script src="assets/vendor/datatables/js/buttons.colVis.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.rowGroup.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.select.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.fixedHeader.min.js"></script>
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

            function bs_input_file() {
                $(".input-file").before(
                        function() {
                            if (!$(this).prev().hasClass('input-ghost')) {
                                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0' accept='image/*'>");
//                                alert(element);
                                element.attr("name", $(this).attr("name"));

                                element.change(function() {
                                    var file = this.files[0];

                                    if (file.size > 20000)
                                    {
                                        Lobibox.alert("error", {
                                            msg: " File size must be less than or equal to 20 KB  "
                                        });
                                        $(".input-ghost").val('');
                                    }
                                    else {
                                        element.next(element).find('input').val((element.val()).split('\\').pop());
                                    }
//                                    }


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

            $(document).ready(function() {
                $(".chosen").chosen({
                });
//                $("#buyerdetailstable").dataTable();
                $('.needs-validation').parsley();

                $("#overlay").css("display", "none");

                var ispasswordupdated = $("#ispasswordupdated").val();
                var isPersonalInfoUpdated = $("#isPersonalInfoUpdated").val();
                var personalDataUpdated = $("#personalDataUpdated").val();

                console.log("ispasswordupdated :" + ispasswordupdated);
                console.log("isPersonalInfoUpdated :" + isPersonalInfoUpdated);
                console.log("personalDataUpdated :" + personalDataUpdated);

                if (isPersonalInfoUpdated !== "Yes" && ispasswordupdated === "Yes" && personalDataUpdated !== "Yes") {
                    $(".nav-left-sidebar").hover(function() {
                        $(this).css("width", 10);
                    });
//                    $(".nav-left-sidebar").mouseleave(function() {
//                        $(this).css("width", 10);
//                    });
                }



//                $(".input-ghost").change(function() {
//                    var file = this.files[0];
////                alert("bittu");
//                    if (file.size > 10000)
//                    {
////                    alert("Allowed file size exceeded. (Max. 10 KB)")
////                                        this.value = null;
//                        $(".input-ghost").val('');
//                    }
//                });

                var que1 = $("#secQue1").val();
                if (que1 !== "")
                {
                    $("#question1").val(que1);
                }
                var que2 = $("#secQue2").val();
                if (que2 !== "")
                {
                    $("#question2").val(que2);
                }
                var que3 = $("#secQue3").val();
                if (que3 !== "")
                {
                    $("#question3").val(que3);
                }

                $("#question1").change(function() {

//                    alert($("#question1").val());
                    if (($("#question1").val() === $("#question2").val()) || ($("#question1").val() === $("#question3").val())) {
                        Lobibox.alert("error", {
                            msg: " Please choose another Question  "
                        });
                        var que1 = $("#secQue1").val();
                        $("#question1").val(que1);
                    }
                });

                $("#question2").change(function() {

//                    alert($("#question2").val());
                    if (($("#question2").val() === $("#question1").val()) || ($("#question2").val() === $("#question3").val())) {
                        Lobibox.alert("error", {
                            msg: " Please choose another Question  "
                        });
                        var que2 = $("#secQue2").val();
                        $("#question2").val(que2);
                    }
                });

                $("#question3").change(function() {

//                    alert($("#question3").val());
                    if (($("#question1").val() === $("#question3").val()) || ($("#question3").val() === $("#question2").val())) {
                        Lobibox.alert("error", {
                            msg: " Please choose another Question  "
                        });
                        var que3 = $("#secQue3").val();
                        $("#question3").val(que3);
                    }
                });
                $('#editprofilecancelBtn').click(function() {

                    Lobibox.confirm({
                        msg: "Are you sure you want to cancel?",
                        callback: function(lobibox, type) {
                            console.log("type: " + type);
                            if (type === 'yes')
                            {
                                console.log("ok");
//                        $("#assignprlineform").submit();
                                location.href = "dashboardcont.do";

                            }
                            else if (type === 'no')
                            {
                                console.log("no");
                            }
                        }
                    });

                });

            });






        </script>

    </body>

</html>