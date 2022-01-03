<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">

    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Buyer Login</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
        <link href="assets/vendor/fonts/circular-std/style.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/libs/css/style.css">
        <link rel="stylesheet" href="assets/css/login-css.css">
        <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
        <style>
            body
            {
                background: url(assets/images/natsteel2.jpg);
                background-repeat: no-repeat;
                background-size: cover;
            }

            #login-logo{
                width: 100%;
            }

            .newgen-logo-div {
                position: absolute;
                top: 8px;
                left: 16px;
                /*margin-left: 10px;*/
                /*font-size: 18px;*/
            }
            .buyerportal-logo-div {
                position: absolute;
                top: 5px;
                /*right: 10px;*/
                left: 1150px;
                /*float: right*/
                /*font-size: 18px;*/
            }
            #newgen-logo{
                /*width: 70%;*/
                height: 150px;
            }
            #buyerportal-logo{
                width:100%;
                top: 1px;
                height: 160px;
                /*height: 150px;*/
            }
            .btn-submit{
                background: #00264d;
                color: white;
            }
        </style>
    </head>

    <body onload="document.f.username.focus()">
        <!-- ============================================================== -->
        <!-- login page  -->
        <!-- ============================================================== -->
        <div class="splash-container">
            <!--<div class="newgen-logo-div"><img id="newgen-logo" src="assets/images/Newgen-Logo.png" alt="Newgen-Logo.png"></div>-->
            <!--<div class="buyerportal-logo-div"><img id="buyerportal-logo" src="assets/images/BuyerPortal.png" alt="BuyerPortal.png"></div>-->
            
            <div class="card login-box">
                <!--<div class="card-header text-center"><a class="navbar-brand login-logo" href="#">Buyer Portal</a></div>-->
                <div class="card-header text-center"><img id="login-logo" src="assets/images/NatSteel-logo.jpg" alt="NatSteel-logo.jpg"></div>
                <div class="card-body"> 
                    <!--<form name="f" role="form" action="dashboard.do" method="post">-->
                    <!--<h2>Login</h2>-->
                    <form name="f" role="form" action="dashboard.do" method="post">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                        <div class="inputBox">
                            <input type="text" name="username" required autocomplete="off">
                            <label>Username</label>
                        </div>
                        <div class="inputBox">
                            <input type="password" name="password" required autocomplete="off">
                            <label>Password</label>
                        </div>
                        <h3 style="color: red;">${message}</h3>
                        <div class="form-group">
                            <label class="custom-control custom-checkbox">
                                <input class="custom-control-input" type="checkbox" id="remember-me" name="remember-me"><span class="custom-control-label" for="remember_me" id="remember-me-span">Remember Me</span>
                            </label>
                        </div>
                        <button type="submit" class="btn btn-submit btn-lg btn-block">Sign in</button>
                    </form>
                </div>
                <div class="card-footer bg-white p-0 text-center">
<!--                    <div class="card-footer-item card-footer-item-bordered">
                        <a href="signup.do" class="footer-link">Create An Account</a>
                    </div>-->
                    <div class="card-footer-item card-footer-item-bordered">
                        <a href="forgotpass.do" class="footer-link">Forgot Password</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================== -->
        <!-- end login page  -->
        <!-- ============================================================== -->
        <!-- Optional JavaScript -->
        <script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
        <script>
            $(document).ready(function() {
                $(".footer-link").click(function() {
                    
                });
                
            });
        </script>
    </body>

</html>
