<%-- 
    Document   : forgot-password
    Created on : 7 Jan, 2019, 12:35:40 PM
    Author     : admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!doctype html>
<html lang="en">

    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Forgot Password</title>
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

        <style>
            html,
            body {
                height: 100%;
            }

            body {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                padding-top: 20px;
                padding-bottom: 40px;
            }
        </style>
    </head>

    <body>
        <!-- ============================================================== -->
        <!-- forgot password  -->
        <!-- ============================================================== -->
        <div class="splash-container-forgotpassword">
            <div class="card">
                <div class="card-header text-center update-backgroud-color">
                    <!--<img class="logo-img" src="assets/images/logo.png" alt="logo">-->
                    <a class="navbar-brand" href="#">Buyer Portal</a>
                    <!--<span class="splash-description">Please enter your user information.</span>-->
                </div>
                <div class="card-body update-backgroud-color">
                    <form>
                        <!--<p>Don't worry, we'll send you an email to reset your password.</p>-->
                        <!--                        <input type="hidden" id="password" name="password">
                                                <input type="hidden" id="cnfpassword" name="cnfpassword">-->
                        <!--<input type="hidden" id="buyerid" value="buyerid">-->
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="username" class="">Username:</label>
                                    <input type="text" class="form-control form-rounded" data-parsley-pattern="^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$" id="forgot_username" name="username" placeholder="Username" required autocomplete="off">
                                    <!--<p class="text-danger" id="p3"></p>-->
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="question1" class="">Security Question 1:</label>
                                    <!--<select  tabindex="1" class="custom-select" id="question1" name="question1" required>-->
                                    <input type="text" class="form-control form-rounded" id="question1" name="question" readonly>
                                    <!--<option value="">--Select--</option>-->
<!--                                        <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                        <option>${secQuesSeeded.secquestion}</option>
                                    </c:forEach>-->
                                    <!--</select>-->
                                    <!--                                    <label for="answer1" class="">Answer 1:</label>
                                                                        <input type="text" class="form-control form-rounded" id="answer1" name="answer">-->

                                    <input type="hidden" name="secQueAns1" id="secQueAns1" value=""/>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <!--<label for="question1" class="">Security Question 1:</label>-->
                                    <!--<select  tabindex="1" class="custom-select" id="question1" name="question1" required>-->
                                    <!--<input type="text" class="form-control form-rounded" id="question1" name="question" readonly>-->
                                    <!--<option value="">--Select--</option>-->
<!--                                        <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                        <option>${secQuesSeeded.secquestion}</option>
                                    </c:forEach>-->
                                    <!--</select>-->
                                    <label for="answer1" class="">Answer 1:</label>
                                    <input type="text" class="form-control form-rounded" id="answer1" name="answer">

                                    <!--<input type="hidden" name="secQueAns1" id="secQueAns1" value=""/>-->
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="question2" class="">Security Question 2:</label>
                                    <!--<select  tabindex="1" class="custom-select" id="question2" name="question2" required>-->
                                    <input type="text" class="form-control form-rounded" id="question2" name="question" readonly>
                                    <!--<option value="">--Select--</option>-->
<!--                                        <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                        <option>${secQuesSeeded.secquestion}</option>
                                    </c:forEach>-->
                                    <!--</select>-->
                                    <!--                                    <label for="answer1" class="">Answer 2:</label>
                                                                        <input type="text" class="form-control form-rounded" id="answer2" name="answer">-->

                                    <input type="hidden" name="secQueAns2" id="secQueAns2" value=""/>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <!--<label for="question2" class="">Security Question 2:</label>-->
                                    <!--<select  tabindex="1" class="custom-select" id="question2" name="question2" required>-->
                                    <!--<input type="text" class="form-control form-rounded" id="question2" name="question" readonly>-->
                                    <!--<option value="">--Select--</option>-->
<!--                                        <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                        <option>${secQuesSeeded.secquestion}</option>
                                    </c:forEach>-->
                                    <!--</select>-->
                                    <label for="answer1" class="">Answer 2:</label>
                                    <input type="text" class="form-control form-rounded" id="answer2" name="answer">

                                    <!--<input type="hidden" name="secQueAns2" id="secQueAns2" value=""/>-->
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <label for="question3" class="">Security Question 3:</label>
                                    <input type="text" class="form-control form-rounded" id="question3" name="question" readonly>
                                    <!--<select  tabindex="1" class="custom-select" id="question3" name="question3" required>-->
                                    <!--<option value="">--Select--</option>-->
<!--                                        <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                        <option>${secQuesSeeded.secquestion}</option>
                                    </c:forEach>-->
                                    <!--</select>-->
                                    <!--<label for="answer1" class="">Answer 3:</label>-->
                                    <!--<input type="text" class="form-control form-rounded" id="answer3" name="answer">-->

                                    <input type="hidden" name="secQueAns3" id="secQueAns3" value=""/>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div class="form-group">
                                    <!--<label for="question3" class="">Security Question 3:</label>-->
                                    <!--<input type="text" class="form-control form-rounded" id="question3" name="question" readonly>-->
                                    <!--<select  tabindex="1" class="custom-select" id="question3" name="question3" required>-->
                                    <!--<option value="">--Select--</option>-->
<!--                                        <c:forEach var="secQuesSeeded" items="${secQuesSeeded}" varStatus="status">
                                        <option>${secQuesSeeded.secquestion}</option>
                                    </c:forEach>-->
                                    <!--</select>-->
                                    <label for="answer1" class="">Answer 3:</label>
                                    <input type="text" class="form-control form-rounded" id="answer3" name="answer">

                                    <input type="hidden" name="secQueAns3" id="secQueAns3" value=""/>
                                </div>
                            </div>
                        </div>

                        <div class="form-group pt-1"><a class="btn btn-block btn-primary btn-xl" id="resetpasswordid" href="#">Reset Password</a></div>

                    </form>
                </div>
                <div class="card-footer text-center">
                    <span><a href="welcome.do">Log In</a></span>
                </div>
            </div>
        </div>

        <div class="modal fade" id="resetpasswordmodal" tabindex="-1" role="dialog" aria-labelledby="resetpasswordmodallabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="resetpasswordmodallabel">Reset Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="container-fluid">
                            <form action="resetpassword.do" method="POST" data-parsley-validate="" novalidate="">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <input type="hidden" id="buyerid" name="buyerid">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="newpassword" class="">New Password: </label>
                                            <input type="password" class="form-control form-rounded" id="newpassword" name="newpassword" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="confirmnewpassword" class="">Confirm New Password: </label>
                                            <input type="password" class="form-control form-rounded" data-parsley-equalto="#newpassword" id="confirmnewpassword" name="confirmnewpassword" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!--                    <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                                        </div>-->
                </div>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- end forgot password  -->
        <!-- ============================================================== -->
        <!-- Optional JavaScript -->

        <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
        <!--bootstap bundle js--> 
        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
        <!--slimscroll js--> 
        <script src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
        <!--main js--> 
        <script src="assets/libs/js/main-js.js"></script>

        <script src="assets/js/buyer.js"></script>

        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>

        <script src="assets/vendor/parsley/parsley.js"></script>

    </body>


</html>
