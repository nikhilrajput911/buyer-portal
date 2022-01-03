<%-- 
    Document   : RatedParameters
    Created on : 19 Aug, 2020, 9:58:10 PM
    Author     : ramkrishnan.elango
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
        <link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">
        <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
        <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">

        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_arrows.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_circles.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_dots.min.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <!--<link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />-->

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/loader.css">
<!--        <link rel="stylesheet" href="assets/css/po-css.css">-->
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />


        <title>Rated Parameters</title>
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
            
            .sar_details_class{
                /*float: left;*/
                padding-right: 50px;
                /*position: absolute;*/ 

            }
            .sarSVC_Details_class
            {
                 padding-right: 50px;
            }
            
            .notification-title{
                font-family: inherit;
            }
            .btn {
                cursor: pointer;

            }
            #unassignedSpendLinesform{
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

        </style>
        <style>
            .chosen-container { width: 100% !important; }
        </style>
    </head>

    <body style="">
        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">
            <!-- ============================================================== -->


            <%@include file = "template.jsp" %>

            <!-- ============================================================== -->
            <div class="dashboard-wrapper" background-color="white">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div class="">
                            
                            <div id="overlay">
                                <div id="loader"></div>
                            </div> 

                            <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT,ROLE_TEAM_LEAD')">

                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
                                        <div class="section-block">
                                        </div>
                                        <div class="tab-regular">
                                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                <!--<li class="nav-item" onclick="location.reload();">-->
                                                <li class="nav-item">
                                                    <a class="nav-link active" id="RatedParameters-tab-justify" data-toggle="tab" href="#RatedParameters-justify" role="tab" aria-controls="RatedParameters" aria-selected="true">Rated Parameters</a>
                                                </li>
                                            </ul>
                                            
                                            <div class="tab-content" id="myTabContent7">

                                                <!-- PR Started -->

                                                <div class="tab-pane fade show active" id="RatedParameters-justify" role="tabpanel" aria-labelledby="RatedParameters-tab-justify">


                                                              <form class="" method="post" action="ratedParameter.do" id="ratedParameterForm">
                                                                    <input type="hidden" name="newRatedParameter" id="newRatedParameter" value="">
                   




                                                                                    <div class="row">
                                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                            <!--<div class="card">-->
                                                                                            <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                                            <div class="card-body" style="padding-top: 0em;">
                                                                                                <!--<div class="row">-->
                                                                                                <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                                                <div class="table-responsive">
                                                                                                    <table class="table table-bordered table-hover ratedParameters" style="width:50% !important" id="ratedParameters">
                                                                                                        <thead class="">
                                                                                                            <tr class="">

                                                                                                                <th class="table-header-color" scope="col">Parameters</th>


                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            <c:forEach var="Cont" items="${ratedParameterList}" varStatus="status">
                                                                                                                <tr>
                                                                                                                    <td align="center">${Cont.parameter}</td>

                                                                                                                </tr>
                                                                                                            </c:forEach> 
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                              </sec:authorize>                  
                                                                                            </div>
                                                                                            <!--</div>-->
                                                                                        

                                                                                            <br>
                                                                                        <div class="row">
                                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">


                                                                                                <div class="align-center text-align-center">

                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="addRatedParameters" value="Add">
<!--                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="addRatedParameters" value="Delete">-->

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>

                                                                            </form>
                                                                        </div>

                                                              
                                                                    </div>
                                                                </div>
                                                            </div>                   
                                                        </div> <!-- Tab Content1 -->
                                            <!--</secauthorize>-->
                                            
                                                                </div>
                                                            </div>                   
                                                        </div> 
                                                        
                                                        
                                                    </div> <!-- Final Div for Spend Analysis Report Tab -->
        </div> <!--Main Wrapper end -->

                <div class="modal fade" id="ratedParameterModel" tabindex="-1" role="dialog" aria-labelledby="ratedParameter" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                           
                            
                                <div class="modal-header">
                                    <h5 class="modal-title" id="ratedParameter">Add</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">

                                                <div class="form-group">
                                                            <div class ="col-xl-6">
                                                                    <label for="modBucketNameSVC" class="">Parameter Name</label>
                                                                    <input type="text" class="form-control form-rounded" id="newRatedParameterMod" name="newRatedParameterMod">

                                                                        
                                                                </div>    
                                                </div>

                                        
                                    </div>
                                    </div>
                                
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" id="addNewParameterBtn">Add</button>
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
                        <!--bootstap bundle js--> 
                        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
                        <!--ss   <script src="http://code.jquery.com/jquery-1.9.1.js"></script>-->

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
                        <!--        <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
                                <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
                                <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>-->
                        <!--<script src="assets/libs/js/dashboard-ecommerce.js"></script>-->

                        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>

                        <!--<script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>-->

                        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>
                        <script src="assets/js/dashboard.js"></script>


                        <script src="assets/libs/js/main-js.js"></script>

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

                        <!--        <script src="assets/vendor/material-dashboard/js/demo.js"></script>
                                <script src="assets/vendor/material-dashboard/js/material-dashboard.min.js"></script>-->
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
                            
            

                        </script>


                        </body>

                        </html>

