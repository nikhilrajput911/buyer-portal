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
        <title>PO Pending Vendor Acknowledgement</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }
            .documentListTable thead th {
                background-color: #5969ff !important;
                color: white !important;
                text-align: center;
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

                            <input type="hidden" name="dmsip" id="dmsip" value="${PONGwebserviceIp}">
                            <input type="hidden" name="viewPrDocIp" id="viewPrDocIp" value="${ViewPrDoc_IP}">
                            <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCall_IP}">
                            <input type="hidden" name="buyerUsername" id="buyerUsername" value="${buyerObj.username}">
                            <input type="hidden" name="isSignedPoUploaded" id="isSignedPoUploaded" value="">
                            <input type="hidden" name="selectedPid" id="selectedPid" value="">
                            <input type="hidden" name="currentDate" id="currentDate" value="<fmt:formatDate value="<%= new java.util.Date()%>" pattern="dd-MM-yy" />">

                            <form id="AcknowledgePoForm" method="post" action="createpo.do">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <input type="hidden" name="poNumber" id="poNumber">
                                <input type="hidden" name="pid" id="pid">
                                <!--<input type="hidden" name="reqFrom" id="reqFrom" value="acknowledgePo">-->
                                <input type="hidden" name="reqFrom" id="reqFrom" value="editpo">
                            </form>

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">PO Pending Vendor Acknowledgement</h5>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-bordered table-striped pendingVendorAckTableClass" id="pendingVendorAckTableId">
                                                    <thead class="">
                                                        <tr class="border-0">
                                                            <th class="border-0">PID</th>
                                                            <th class="border-0">PO Number</th>                                                            
                                                            <th class="border-0">Vendor Name</th>
                                                            <th class="border-0">Status</th>
                                                            <th class="border-0">Buyer Ack Action</th>
                                                            <th class="border-0">Vendor Ack Action</th>
                                                            <th class="border-0">PO Creation Date</th>
                                                            <th class="border-0">PO Approval Date</th>
                                                            <th class="border-0">PO Acknowledgement Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <c:forEach var="po" items="${acknowlegdePOList}">
                                                            <tr>
                                                                <td>${po.pid}</td>
                                                                <td>${po.purchaseOrderNumber}</td>                                                                
                                                                <td>${po.vendorCode} - ${po.vendorName}</td>
                                                                <td>
                                                                    <c:choose>
                                                                        <c:when test="${po.currentWorkstep == 'Vendor Ack'}">
                                                                            Pending for Vendor Action
                                                                        </c:when>
                                                                    </c:choose>
                                                                </td>
                                                                <td>${po.buyerAckAction}</td>
                                                                <td>${po.vendorAckAction}</td>
                                                                <td><fmt:formatDate value="${po.intiatiatedDate}" pattern="dd.MM.yyyy"></fmt:formatDate></td>
                                                                <td></td>
                                                                <td><fmt:formatDate value="${po.ackPOEntryDatetime}" pattern="dd.MM.yyyy"></fmt:formatDate></td>
                                                                    
                                                            </tr>
                                                        </c:forEach>
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
            <div class="modal fade" id="uploadSignedPOCopyModal" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <form action="uploadsignedpo.do" method="post" enctype="multipart/form-data" id="acknowledgeDocForm">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                            <input type="hidden" name="ro_pid" id="ro_pid" value="">
                            <input type="hidden" name="ro_poNumber" id="ro_poNumber" value="">
                            <div class="modal-header">
                                <h5 class="modal-title" id="attLabel">Attachments</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv1">
                                                    <span class="input-group-btn">
                                                        <!--<button class="btn btn-primary btn-choose" type="button">Signed PO Copy</button>-->
                                                        <button class="btn btn-primary btn-choose" type="button">Browse</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc1" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv2">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting Document-1</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc2" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv3">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting Document-2</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc3" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv4">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting Document-3</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc4" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv5">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting Document-4</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc5" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <div class="input-group input-file" name="docDiv6">
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-primary btn-choose" type="button">Supporting Document-5</button>
                                                    </span>
                                                    <input type="text" class="form-control" id="doc6" placeholder='Choose a file...' />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" id="uploaddocumentModalBtn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="showSignedPoDocFromDMSModal" tabindex="-1" role="dialog" aria-labelledby="showSignedPoDocFromDMSModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="showSignedPoDocFromDMSModalLabel">Documents</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered documentListTable" id="documentListTable">
                                    <thead>
                                        <tr>
                                            <th>Document Name</th>
                                            <th>View</th>
                                            <th>Download</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="cancelAckPoCommentsModal" tabindex="-1" role="dialog" aria-labelledby="cancelAckPoCommentsModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="cancelAckPoCommentsModalLabel">Comments</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <textarea class="form-control rounded-0" id="canAckPoComments" name="canAckPoComments" rows="5" required></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="cancelAckPoCommentsModalBtn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="sendPoCommentsModal" tabindex="-1" role="dialog" aria-labelledby="sendPoCommentsModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="sendPoCommentsModalLabel">Comments</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <textarea class="form-control rounded-0" id="sendPoComments" name="sendPoComments" rows="5" required></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="sendPoCommentsModalBtn">Submit</button>
                        </div>
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
        <script src="assets/js/newgen.js"></script>
        <script src="assets/js/acknowledgepo.js"></script>

        <script>
            $(document).ready(function() {
                $("#overlay").css("display", "none");
            });
        </script>
        <script>
            function bs_input_file() {
                //                alert("dfdf");
                $(".input-file").before(
                        function() {
                            if (!$(this).prev().hasClass('input-ghost')) {
                                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                                element.attr("name", "file_" + $(this).attr("name"));
                                element.change(function() {
                                    element.next(element).find('input').val((element.val()).split('\\').pop());
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
        </script>
    </body>

</html>