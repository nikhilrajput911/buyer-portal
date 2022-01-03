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
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
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
        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">
        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">
        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
        <link rel="stylesheet" href="assets/css/loader.css">
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">

        <title>Dashboard</title>
        <style>
            #updatepassword{
                margin-right: 200px;
            }

            .lobibox-footer {
                background-color:whitesmoke !important;
            }

            #morris_donut{

                height: 230px !important;
                padding-bottom: 10px !important;
                /*width: 250px !important;*/
            }

            .moris-donut-card{
                height: 310px !important;

            }
            ul{
                list-style-type: none;
            }

            ul{
                list-style-type: none;
            }

            .pr_details_class{
                /*float: left;*/
                padding-right: 50px;
                /*position: absolute;*/ 

            }

            .notification-title{
                font-family: inherit;
            }
            .btn {
                cursor: pointer;

            }
            #assignprlineform{
                height: 75px;
            }
            div.notification-title{
                padding-top: 2px;
                padding-bottom: 5px;
            }
            #myTab7{
                width: 70%;
            }

            .admin-card
            {
                position:absolute;
                left:40%;
                top:-20px;
                border-radius:50%;
            }
            .dashboard-content {
                padding-top: 4px;
                padding-bottom: 0px;
            }
            .inline-filter-filed {
                display: inline-block;
            }
            .inline-filter-field-width {
                width: 200px;
            }
            .filter-form-group {
                display: flex;
            }
            .filter-label {
                width: 50%;
                padding-right: 10px;
                padding-top: 5px;
            }
            .filter-input-field {
                width: 70%;
            }

            .tab-regular .nav-tabs .nav-link.active {
                background-color: #25d5f2!important;
                color: white!important;
            }
            .tab-regular .nav-tabs .nav-link {
                background-color: gray!important;
                color: white!important;
            }
            .buyer-card-col {
                max-width: 14%!important;
            }
            #newWorkloadAssignmentReportModalTable thead th{
                background-color: #5969ff !important;
                color: white !important;
            }
        </style>
        <style>
            .chosen-container { width: 100% !important; }
        </style>
    </head>
    <body style="">
        <div class="dashboard-main-wrapper">
            <%@include file = "template.jsp" %>
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div class="">
                            <input type="hidden" value="${isPassUpdated}" id="ispasswordupdated">
                            <input type="hidden" value="${isPersonalInfoUpdated}" id="isPersonalInfoUpdated">
                            <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">
                            <input type="hidden" id="local_dev_uat" name="local_dev_uat" value="${local_dev_uat}">
                            <input type="hidden" id="buyerUsername" name="buyerUsername" value="${buyerObj.username}">
                            <input type="hidden" id="buyerRole" name="buyerRole" value="${buyerObj.role}">

                            <div id="overlay">
                                <div id="loader"></div>
                            </div>

                            <sec:authorize access="hasAnyRole('ROLE_ADMIN')">
                                <%@include file = "adminDashboard.jsp" %>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">
                                <%@include file = "buyerDashboard.jsp" %>
                            </sec:authorize>

                            <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT,ROLE_TEAM_LEAD')">
                                <%@include file = "tlDashboard.jsp" %>
                            </sec:authorize>

                        </div>
                    </div>
                </div>
            </div>
            <%@include file = "modalDashboard.jsp" %>                        
        </div>
        
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
        
        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
        <script src="assets/js/dashboard.js"></script>
        <script src="assets/libs/js/main-js.js"></script>
        <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.buttons.min.js"></script>
        <script src="assets/vendor/datatables/js/buttons.bootstrap4.min.js"></script>
        <script src="assets/vendor/datatables/js/jszip.min.js"></script>
        <script src="assets/vendor/datatables/js/pdfmake.min.js"></script>
        <script src="assets/vendor/datatables/js/vfs_fonts.js"></script>
        <script src="assets/vendor/datatables/js/buttons.html5.min.js"></script>
        <script src="assets/vendor/datatables/js/buttons.print.min.js"></script>
        <script src="assets/vendor/datatables/js/buttons.colVis.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.rowGroup.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.select.min.js"></script>
        <script src="assets/vendor/datatables/js/dataTables.fixedHeader.min.js"></script>

        <script src="assets/vendor/charts/morris-bundle/raphael.min.js"></script>
        <script src="assets/vendor/charts/morris-bundle/morris.js"></script>
        <script src="assets/vendor/charts/morris-bundle/Morrisjs.js"></script>

        <script src="assets/vendor/datepicker/moment.js"></script>
        <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
        <script src="assets/vendor/datepicker/datepicker.js"></script>
        <script src="assets/vendor/parsley/parsley.js"></script>
        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
        <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
        <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>
        <script src="assets/vendor/jQueryMinMaxSelect/js/jminmaxselect.dev.js"></script>

        <script>
            $(document).ready(function() {

                jQuery.extend(jQuery.fn.dataTableExt.oSort, {
                    "date-uk2-pre": function(a) {
                        if (a === null || a === "") {
                            return 0;
                        }
                        var ukDatea = a.split('-');
                        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
                    },
                    "date-uk2-asc": function(a, b) {
                        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                    },
                    "date-uk2-desc": function(a, b) {
                        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
                    }
                });

                $('#fromPlantCode').jMinMaxSelect({
                    maxSelect: '#toPlantCode'
                });
        //        $('#fromPurchaseGroup').jMinMaxSelect({
        //            maxSelect: '#toPurchaseGroup'
        //        });
        //        $('#fromMaterialGroup').jMinMaxSelect({
        //            maxSelect: '#toMaterialGroup'
        //        });

                $('.needs-validation').parsley();
                var cardstatus = $(".cardstatus").val();
        //                                                    alert(cardstatus);fromPurchaseGroup/ fromMaterialGroup
                console.log(cardstatus);

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

                $(".unread-notification").click(function() {
                    var notification_id = $(this).prop("id");
                    console.log(notification_id);
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: true,
                        data:
                                {
                                    "reqFrom": "MakeUnreadNotificationToRead",
                                    "notificationId": notification_id
                                },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
                        }
                    });
                });
            });
        </script>
    </body>
</html>
