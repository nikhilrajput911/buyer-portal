

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
        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-mdb/css/mdb.min.css">-->
        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-mdb/css/mdb-style.css">-->
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

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" type="text/css" href="assets/css/custom.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">

        <!--        <link rel="stylesheet" type="text/css" href="assets/vendor/material-dashboard/css/demo.css">
                <link rel="stylesheet" type="text/css" href="assets/vendor/material-dashboard/css/material-dashboard.min.css">-->
        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">


        <title>Spend Analysis Library</title>
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
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <div class="">
                            <input type="hidden" value="${isPassUpdated}" id="ispasswordupdated">
                            <input type="hidden" value="${isPersonalInfoUpdated}" id="isPersonalInfoUpdated">
                            <input type="hidden" value="${pid}" id="pid">
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
                                                    <a class="nav-link active" id="unassignedPR-tab-justify" data-toggle="tab" href="#unassignedPR-justify" role="tab" aria-controls="spendAnalysisLibrary" aria-selected="true">Spend Analysis Library</a>
                                                </li>


                                            </ul>
                                            <div class="tab-content" id="myTabContent7">


                                                <div class="tab-pane fade show active" id="unassignedPR-justify" role="tabpanel" aria-labelledby="unassignedPR-tab-justify">
                                                    <form class="" method="post" action="spendAnalysisLibrary.do" id="SpendAnalysisLibraryform">

                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <!--<div class="card">-->
                                                                <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                <div class="card-body" style="padding-top: 0em;">
                                                                    <!--<div class="row">-->
                                                                    <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-hover pr-details" id="pr_details">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExport" scope="col">
                                                                                        <c:if test="${spendAnalysisLibrary.size() > 0}">
                                                                                            <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                                        </c:if>
                                                                                    </th>
                                                                                    <th class="" scope="col">Purchase Document</th>
                                                                                    <th class="" scope="col">Material Document</th>
                                                                                    <th class="" scope="col">Movement Type</th>
                                                                                    <th class="" scope="col">Account Assignment</th>
                                                                                    <th class="" scope="col">Debit/Credit</th>
                                                                                    <th class="" scope="col">Item</th>
                                                                                    <th class="" scope="col">Order Type</th>
                                                                                    <th class="" scope="col">Material/Service Number</th>
                                                                                    <th class="" scope="col">Material/Service Description </th>
                                                                                    <th class="" scope="col">Plant Code</th>
                                                                                    <th class="" scope="col">Material/Group Service Number</th>
                                                                                    <th class="" scope="col">Material/Service Group Description</th>
                                                                                    <th class="" scope="col">Report Group</th>
                                                                                    <th class="" scope="col">Posting Date</th>
                                                                                    <th class="" scope="col">GR Quantity</th>
                                                                                    <th class="" scope="col">LC Amount</th>
                                                                                    <th class="" scope="col">Vendor</th>
                                                                                    <th class="" scope="col">Vendor Name</th>


                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="Cont" items="${spendAnalysisLibrary}" varStatus="status">
                                                                                    <tr>
                                                                                                  <td align="center"><input type="checkbox" value="${Cont.insertionOrderID}" class="spend-checkbox-class"></td>
                                                                                        <td align="center">${Cont.purchaseDoc}</td>
                                                                                        <td align="center">${Cont.materialDocument}</td>
                                                                                        <td align="center">${Cont.mvtTyp}</td>
                                                                                        <td align="center">${Cont.accountAssignment}</td>
                                                                                        <td align="center">${Cont.debitcredit}</td>
                                                                                        <td align="center">${Cont.item}</td>
                                                                                        <td align="center">${Cont.ordTyp}</td>
                                                                                        <td align="center">${Cont.materialClass}</td>
                                                                                        <td align="center">${Cont.materialClassDESC}</td>
                                                                                        <td align="center">${Cont.plnt}</td>
                                                                                        <td align="center">${Cont.matlGroupSVSNo}</td>
                                                                                        <td align="center">${Cont.materialGrpServiceNoDescription}</td>

                                                                                        <td align="center">${Cont.report}</td>
                                                                                        <td align="center">${Cont.pstngDATE}</td>
                                                                                        <td align="center">${Cont.GRQty}</td>
                                                                                        <td align="center">${Cont.LCAmount}</td>
                                                                                        <td align="center">${Cont.vendor}</td>
                                                                                        <td align="center">${Cont.vendorName}</td>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </sec:authorize>                     <!--</div>-->
                                                                <!--</div>-->
                                                            </div>
                                                                         <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">


                                                                    <div class="align-center text-align-center">
                                                                        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                            <div class="form-group">
                                                                                <label for="spoc_contract">SPOC Name:</label>
                                                                               <!--<select class="selectpicker show-tick show-menu-arrow" title="Choose Spoc name..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="spoc_contract" name="spoc_contract">-->
                                                                                   <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Code..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="spoc_contract" name="spoc_contract">
                                                                               <!--<select>-->
                                                                                       <c:forEach var="user" items="${spocusers}">
                                                                                           <option value="${user.userName}">${user.userName}</option>
                                                                                    </c:forEach>
                                                                                </select>
                                                                                 
                                                                            </div>
                                                      
                                                                        </div>
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="assignSpendlib" value="Send for SOW">
                                                                        
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
                                <%--</sec:authorize>--%>
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
                        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>

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
                            $(document).ready(function () {

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
                                
                                var pid = $("#pid").val();
                                console.log("pid: " + pid);
                                if (pid !== "")
                                {
                                    Lobibox.alert("success", {
                                        msg: "Work Item is created with Transaction id!"+pid
                                    });
                                    return true;
                                    ;
                                }
                            });


                        </script>


                        </body>

                        </html>
