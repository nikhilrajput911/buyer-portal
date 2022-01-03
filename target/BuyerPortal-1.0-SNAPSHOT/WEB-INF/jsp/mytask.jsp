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
        <title>Manage RFQ</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }

            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            #myTab7{
                width: 30%;
            }
            .btn {
                cursor: pointer;
                /*height: 10px;*/
                margin-top: 10px;
                margin-left: 10px;
                padding-bottom: 30px; 
            }
            div.dataTables_wrapper div.dataTables_filter input{
                margin-top: 10px;
                margin-right: 10px;
            }
            .tab-regular .nav-tabs .nav-link.active {
                background-color: #25d5f2!important;
                color: white!important;
            }
            .tab-regular .nav-tabs .nav-link {
                background-color: gray!important;
                color: white!important;
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

                            <div id="overlay">
                                <div id="loader"></div>
                            </div>

                            <input type="hidden" value="${RfqNumber}" id="rfqnumber">
                            <input type="hidden" value="${RfqId}" id="rfqid">
                            <input type="hidden" value="${DMSUploadResponseMainCode}" id="DMSUploadResponseMainCode">
                            <input type="hidden" value="${DMSUploadResponsePID}" id="DMSUploadResponsePID">
                            <input type="hidden" value="${DMSUploadResponseMessage}" id="DMSUploadResponseMessage">
                            <input type="hidden" value="${DMSUploadFailed}" id="DMSUploadFailed">
                            
                            <input type="hidden" value="${uploadRfqFormatMainCode}" id="uploadRfqFormatMainCode">
                            <input type="hidden" value="${uploadRfqFormatMessage}" id="uploadRfqFormatMessage">
                            <input type="hidden" value="${uploadRfqFormatPid}" id="uploadRfqFormatPid">
                            <input type="hidden" value="${uploadRfqFormatAttIsIndex}" id="uploadRfqFormatAttIsIndex">
                            <input type="hidden" value="${uploadRfqFormatDocIndex}" id="uploadRfqFormatDocIndex">

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">Manage RFQ </h5>
                                        <div class="card-body update-backgroud-color">
                                            <br>
                                            <div class="tab-regular update-backgroud-color">
                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active update-backgroud-color" id="rfqforpr-tab-justify" data-toggle="tab" href="#rfqforpr-justify" role="tab" aria-controls="rfqforpr" aria-selected="true">RFQ FOR PR</a>
                                                    </li>

                                                    <li class="nav-item">
                                                        <a class="nav-link" id="rfqforcontract-tab-justify" data-toggle="tab" href="#rfqforcontract-justify" role="tab" aria-controls="rfqforcontract" aria-selected="false">RFQ FOR CONTRACT</a>
                                                    </li>
                                                </ul>

                                                <div class="tab-content update-backgroud-color">
                                                    <div class="tab-pane fade show active" id="rfqforpr-justify" role="tabpanel" aria-labelledby="rfqforpr-tab-justify">
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered table-striped mytask update-backgroud-color" id="mytask">
                                                                <thead class="">
                                                                    <tr class="border-0">
                                                                        <!--<th class="border-0"></th>-->
                                                                        <th class="border-0">RFQ Number</th>
                                                                        <th class="border-0">RFQ Title</th>
                                                                        <th class="border-0">RFQ Status</th>
                                                                        <th class="border-0">RFQ Request Date</th>
                                                                        <th class="border-0">RFQ Closes on</th>
                                                                        <th class="border-0">Number of Vendor</th>
                                                                        <th class="border-0">Response Received</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <c:forEach var="rfqHeader" items="${RfqHeaderList}" varStatus="status">
                                                                        <tr>
                                                                            <c:choose>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Saved'}">
                                                                                    <td><a href="savedRfqDetails.do?rfqid=${rfqHeader.rfqid}" style="color: blue">${rfqHeader.rfqNumber}</a></td>
                                                                                    </c:when>
                                                                                    <c:otherwise>
                                                                                    <td><a href="rfqdetails.do?rfqid=${rfqHeader.rfqid}" style="color: blue">${rfqHeader.rfqNumber}</a></td>
                                                                                    </c:otherwise>
                                                                                </c:choose>
                                                                            <td>${rfqHeader.RFQTitle}</td>
                                                                            <c:choose>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Pending'}">
                                                                                    <td><span class="badge-dot badge-pending mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Bid Submitted'}">
                                                                                    <td><span class="badge-dot badge-bid-submitted mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'On Hold'}">
                                                                                    <td><span class="badge-dot badge-on-hold mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Cancel'}">
                                                                                    <td><span class="badge-dot badge-cancel mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Reject'}">
                                                                                    <td><span class="badge-dot badge-reject mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Closed'}">
                                                                                    <td><span class="badge-dot badge-closed mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:otherwise>
                                                                                    <td>${rfqHeader.rfqstatus}</td>
                                                                                </c:otherwise>    
                                                                            </c:choose>
                                                                            <td><fmt:formatDate value="${rfqHeader.rfqRequestDate}" pattern="dd.MM.yyyy"></fmt:formatDate></td>
                                                                            <td><fmt:formatDate value="${rfqHeader.rfqvaliduntil}" pattern="dd.MM.yyyy"></fmt:formatDate></td>
                                                                            <td>${rfqHeader.vendorCount}</td>
                                                                            <td>${rfqHeader.vendorResponse}</td>
                                                                        </tr>
                                                                    </c:forEach>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show" id="rfqforcontract-justify" role="tabpanel" aria-labelledby="rfqforcontract-justify">
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered mytaskforcontract" id="mytaskforcontract" style="width: 100%;">
                                                                <thead class="">
                                                                    <tr class="border-0">
                                                                        <th class="border-0">RFQ Number</th>
                                                                        <th class="border-0">RFQ Title</th>
                                                                        <th class="border-0">RFQ Status</th>
                                                                        <th class="border-0">RFQ Request Date</th>
                                                                        <th class="border-0">RFQ Closes on</th>
                                                                        <th class="border-0">Number of Vendor</th>
                                                                        <th class="border-0">Response Received</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <c:forEach var="rfqHeader" items="${ContractRfqHeaderList}" varStatus="status">
                                                                        <tr>
                                                                            
                                                                            <td><a href="contractrfqdetails.do?rfqid=${rfqHeader.rfqid}" style="color: blue">${rfqHeader.rfqNumber}</a></td>
                                                                            <td>${rfqHeader.RFQTitle}</td>
                                                                            <c:choose>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Pending'}">
                                                                                    <td><span class="badge-dot badge-brand mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Bid Submitted'}">
                                                                                    <td><span class="badge-dot badge-success mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'On Hold'}">
                                                                                    <td><span class="badge-dot badge-danger mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Cancel'}">
                                                                                    <td><span class="badge-dot badge-secondary mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:when test="${rfqHeader.rfqstatus == 'Reject'}">
                                                                                    <td><span class="badge-dot badge-dark mr-1"></span> ${rfqHeader.rfqstatus}</td>
                                                                                </c:when>
                                                                                <c:otherwise>
                                                                                    <td>${rfqHeader.rfqstatus}</td>
                                                                                </c:otherwise>    
                                                                            </c:choose>
                                                                            <td><fmt:formatDate value="${rfqHeader.rfqRequestDate}" pattern="dd-MM-yyyy"></fmt:formatDate></td>
                                                                            <td><fmt:formatDate value="${rfqHeader.rfqvaliduntil}" pattern="dd-MM-yyyy"></fmt:formatDate></td>
                                                                            <td>${rfqHeader.vendorCount}</td>
                                                                            <td>${rfqHeader.vendorResponse}</td>
                                                                        </tr>
                                                                    </c:forEach>

                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <!--                                        <div class="card-body">
                                        
                                                                                </div>-->
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

        <script src="assets/js/createrfq.js"></script>

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

                var rfqnum = $("#rfqnumber").val();
                var rfqid = $("#rfqid").val();
                var DMSUploadFailed = $("#DMSUploadFailed").val();
                console.log("rfqnum: " + rfqnum);
                console.log("rfqid " + rfqid);
                console.log("DMSUploadFailed: " + DMSUploadFailed);

                if (rfqnum !== "" && DMSUploadFailed !== "") {
                    Lobibox.alert("info",
                            {
                                msg: "RFQ Number generated is <a style='color: blue;' href='rfqdetails.do?rfqid=" + rfqid + "'>" + rfqnum + "</a>.<br>Document upload to DMS has failed."
                            });
                }
                else if (rfqnum !== "") {
                    Lobibox.alert("info",
                            {
                                msg: "RFQ Number generated is <a style='color: blue;' href='rfqdetails.do?rfqid=" + rfqid + "'>" + rfqnum + "</a>."
                            });
                }
            });


        </script>

    </body>

</html>
