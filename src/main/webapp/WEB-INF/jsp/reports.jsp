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
        <link href="assets/vendor/jquery-ui/css/jquery-ui.min.css" rel="stylesheet"/>
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
        <link rel="stylesheet" href="assets/css/loader.css">
        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />
        <title>Reports</title>

        <style>
            .dashboard-card {
                /*                width: 170px;
                                padding: 5px;*/
            }

            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            .edit-btn{
                padding-left:  60px;
            }
            .nav {
                /*flex-wrap: none;*/
                font-size: 12px;
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

                            <input type="hidden" value="" id="">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header bg-primary">Reports </h5>
                                        <div class="card-body update-backgroud-color">
                                            <div class="tab-regular">
                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active update-backgroud-color" id="POAcknowledgementReport-tab-justify" data-toggle="tab" href="#POAcknowledgementReport-justify" role="tab" aria-controls="POAcknowledgementReport" aria-selected="true">PO Acknowledgement Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link update-backgroud-color" id="PRtoPOCycleTime-tab-justify" data-toggle="tab" href="#PRtoPOCycleTime-justify" role="tab" aria-controls="PRtoPOCycleTime" aria-selected="false">PR to PO Cycle Time</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link update-backgroud-color" id="OpenRFQReport-tab-justify" data-toggle="tab" href="#OpenRFQReport-justify" role="tab" aria-controls="OpenRFQReport" aria-selected="false">Open RFQ Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link update-backgroud-color" id="PurchaseRequestStatusReport-tab-justify" data-toggle="tab" href="#PurchaseRequestStatusReport-justify" role="tab" aria-controls="PurchaseRequestStatusReport" aria-selected="false">Purchase Request Status Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link update-backgroud-color" id="BuyerAuditLogReport-tab-justify" data-toggle="tab" href="#BuyerAuditLogReport-justify" role="tab" aria-controls="BuyerAuditLogReport" aria-selected="false">Buyer Audit Log Report</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content update-backgroud-color">
                                                    <div class="tab-pane fade show active" id="POAcknowledgementReport-justify" role="tabpanel" aria-labelledby="POAcknowledgementReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PoAckFromDate" class="">From Date</label>
                                                                        <div class="input-group date" id="PoAckFromDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="PoAckFromDate" name="PoAckFromDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#PoAckFromDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PoAckToDate" class="">To Date</label>
                                                                        <div class="input-group date" id="PoAckToDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="PoAckToDate" name="PoAckToDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#PoAckToDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PoAckVendorCode" class="">Vendor Code</label><br>
                                                                        <input type="hidden" id="code" value="" name="code">
                                                                        <input type="text" placeholder="Type to search, at least 3 chars" class="form-control form-rounded vendorCodeName" id="vendorCodeName" name="vendorCodeName" value="">                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="PoAckGenReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearPoAckReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped PoAckReportTable" id="PoAckReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>PO Number</th>
                                                                                    <th>PO Acknowledged by Vendor</th>
                                                                                    <th>PO Acknowledged by Buyer</th>
                                                                                    <th>PO Not Acknowledged</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show" id="PRtoPOCycleTime-justify" role="tabpanel" aria-labelledby="PRtoPOCycleTime-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PrToPoCycleTimeFromDate" class="">From Date</label>
                                                                        <div class="input-group date" id="PrToPoCycleTimeFromDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="PrToPoCycleTimeFromDate" name="PrToPoCycleTimeFromDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#PrToPoCycleTimeFromDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PrToPoCycleTimeToDate" class="">To Date</label>
                                                                        <div class="input-group date" id="PrToPoCycleTimeToDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="PrToPoCycleTimeToDate" name="PrToPoCycleTimeToDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#PrToPoCycleTimeToDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="buyerId_R2" class="">Buyer ID</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="buyerId_R2" name="buyerId_R2" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="buyer" items="${buyerIdList}" varStatus="status">
                                                                                <option value="${buyer.username}">${buyer.username}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="teamLeadId_R2" class="">Team Lead ID</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="teamLeadId_R2" name="teamLeadId_R2" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="buyer" items="${teamLeadIdList}" varStatus="status">
                                                                                <option value="${buyer.id}">${buyer.username}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generatePrToPoCycleTimeReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearPrToPoCycleTimeReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped PrToPoCycleTimeReportTable" id="PrToPoCycleTimeReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th rowspan="2">PO <br> Number</th>
                                                                                    <th rowspan="2">PO <br> Type</th>
                                                                                    <th rowspan="2">Target <br> (in Days)</th>
                                                                                    <th rowspan="2">YTD <br> Avg. Day</th>
                                                                                    <th rowspan="2">Within <br> Target</th>
                                                                                    <th rowspan="2">Beyond <br> Target</th>
                                                                                    <th rowspan="2">Total PR <br> Lines</th>
                                                                                    <th colspan="4">Number of PO Lines</th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th><=30 Days</th>
                                                                                    <th>30 to 60 Days</th>
                                                                                    <th>60 to 90 Days</th>
                                                                                    <th>>90 Days</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="tab-pane fade show" id="OpenRFQReport-justify" role="tabpanel" aria-labelledby="OpenRFQReport-tab-justify">
                                                        <!--<form action="" method="post" id="openRFQReportInputForm">-->
                                                            <!--<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="plantCode_R3" class="">Plant Code</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="plantCode_R3" name="plantCode_R3" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                                            <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                                            <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                                            <option value="6800">6800 -- NATSTEEL ESM</option>
                                                                            <option value="7000">All</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="rfqNo_R3" class="">RFQ No.</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="rfqNo_R3" name="rfqNo_R3" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="rfq" items="${rfqList}" varStatus="status">
                                                                                <option value="${rfq.rfqid}">${rfq.rfqNumber}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PurchaseGroup_R3" class="">Purchase Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="PurchaseGroup_R3" name="PurchaseGroup_R3" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="BuyerName_R3" class="">Buyer Name</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="BuyerName_R3" name="BuyerName_R3" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="buyer" items="${buyerList}" varStatus="status">
                                                                                <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateOpenRfqReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearOpenRfqReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</form>-->
                                                            <br>
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered table-striped openRfqReportTable" id="openRfqReportTable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>RFQ Number</th>
                                                                            <th>Pending With</th>
                                                                            <th>Total PR Lines</th>
                                                                            <th>PR Number</th>
                                                                            <th>Vendor Count</th>
                                                                            <th>Vendor Selected</th>
                                                                            <th>Count of Responses Received</th>
                                                                            <th>Ageing (In Days)</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show" id="PurchaseRequestStatusReport-justify" role="tabpanel" aria-labelledby="PurchaseRequestStatusReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PlantCode_R4" class="">From Plant Code</label><br>
                                                                        <select tabindex="1" class="custom-select" id="PlantCode_R4" name="PlantCode_R4">
                                                                            <option value="0">Select</option>
                                                                            <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                                            <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                                            <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                                            <option value="6800">6800 -- NATSTEEL ESM</option>
                                                                            <option value="7000">All</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPlantCode_R4" class="">To Plant Code</label><br>
                                                                        <select tabindex="1" class="custom-select" id="ToPlantCode_R4" name="ToPlantCode_R4">
                                                                            <option value="0">Select</option>
                                                                            <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                                            <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                                            <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                                            <option value="6800">6800 -- NATSTEEL ESM</option>
                                                                            <option value="7000">All</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PrNo_R4" class="">From PR No.</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="PrNo_R4" name="PrNo_R4" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="pr" items="${prList}" varStatus="status">
                                                                                <option value="${pr.purchaseRequestNumber}">${pr.purchaseRequestNumber}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPrNo_R4" class="">To PR No.</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToPrNo_R4" name="ToPrNo_R4" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="pr" items="${prList}" varStatus="status">
                                                                                <option value="${pr.purchaseRequestNumber}">${pr.purchaseRequestNumber}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PurchaseGroup_R4" class="">From Purchase Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="PurchaseGroup_R4" name="PurchaseGroup_R4" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPurchaseGroup_R4" class="">To Purchase Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToPurchaseGroup_R4" name="ToPurchaseGroup_R4" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="TrackingNumber_R4" class="">Tracking Number</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="TrackingNumber_R4" name="TrackingNumber_R4" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="dept" items="${masterDepartmentlist}" varStatus="status">
                                                                                <option value="${dept.departmentCode}">${dept.departmentCode} - ${dept.departmentDesc}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ProcessingStatus_R4" class="">Processing Status</label><br>
                                                                        <select class="custom-select" id="ProcessingStatus_R4" name="ProcessingStatus_R4">
                                                                            <option value="">Select</option>
                                                                            <option>PR Line Created</option>
                                                                            <option>Contract Created</option>
                                                                            <option>RFQ Created</option>
                                                                            <option>PO Created</option>
                                                                            <option>Scheduling Agreement Created</option>
                                                                        </select> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromPRApprovedDate_R4" class="">From PR Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="FromPRApprovedDate_R4_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="FromPRApprovedDate_R4" name="FromPRApprovedDate_R4" data-target="" />
                                                                            <div class="input-group-append" data-target="#FromPRApprovedDate_R4_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPRApprovedDate_R4" class="">To PR Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate">-->

                                                                        <div class="input-group date" id="ToPRApprovedDate_R4_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ToPRApprovedDate_R4" name="ToPRApprovedDate_R4" data-target="" />
                                                                            <div class="input-group-append" data-target="#ToPRApprovedDate_R4_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromRequiredDate_R4" class="">From Required Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="FromRequiredDate_R4_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="FromRequiredDate_R4" name="FromRequiredDate_R4" data-target="" />
                                                                            <div class="input-group-append" data-target="#FromRequiredDate_R4_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToRequiredDate_R4" class="">To Required Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate">-->

                                                                        <div class="input-group date" id="ToRequiredDate_R4_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ToRequiredDate_R4" name="ToRequiredDate_R4" data-target="" />
                                                                            <div class="input-group-append" data-target="#ToRequiredDate_R4_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="PRRaisedBy_R4" class="">PR Raised By</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="PRRaisedBy_R4" name="PRRaisedBy_R4"> 
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="MaterialCode_R4" class="">Material Code</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="MaterialCode_R4" name="MaterialCode_R4"> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="prStatusReportBtn" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearPrStatusReportBtn" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped prStatusReportTable" id="prStatusReportTable">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Dept. Desc.</th>
                                                                                    <th>Co-Code</th>
                                                                                    <th>Req. Number/ Required By</th>
                                                                                    <th>Approved By/ Date</th>
                                                                                    <th>Req’d Date/ Buyer</th>
                                                                                    <th>Item Code/ Old Mat. No/ Description</th>
                                                                                    <th>PO Text</th>
                                                                                    <th>Item Text</th>
                                                                                    <th>UoM</th>
                                                                                    <th>Quantity/ UoM-Store</th>
                                                                                    <th>Loc Purchase</th>
                                                                                    <th>LT / SLoc</th>
                                                                                    <th>Project/ PO Buyer</th>
                                                                                    <th>Over Due</th>
                                                                                    <th>Last PO/ PO Date</th>
                                                                                    <th>Per Unit/ PR Currency</th>
                                                                                    <th>Supplier</th>
                                                                                    <th>Header Note</th>
                                                                                    <th>Item Note</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show" id="BuyerAuditLogReport-justify" role="tabpanel" aria-labelledby="BuyerAuditLogReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="buyerAuditFromDate" class="">From Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="buyerAuditFromDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="buyerAuditFromDate" name="buyerAuditFromDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#buyerAuditFromDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="buyerAuditToDate" class="">To Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate">-->

                                                                        <div class="input-group date" id="buyerAuditToDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="buyerAuditToDate" name="buyerAuditToDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#buyerAuditToDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="buyerAuditBuyerName" class="">Buyer Name</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="buyerAuditBuyerName" name="buyerAuditBuyerName" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="buyer" items="${buyerList}" varStatus="status">
                                                                                <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateBuyerAuditReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearBuyerAuditReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped buyer-AuditReport-Table" id="buyerAuditReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Activity Performed</th>
                                                                                    <th>Date and Time</th>
                                                                                    <th>Username</th>
                                                                                    <th>Buyer Name</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

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
        <script src="assets/vendor/jquery-ui/js/jquery-ui.min.js"></script>    
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

        <script src="assets/vendor/datepicker/moment.js"></script>
        <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
        <script src="assets/vendor/datepicker/datepicker.js"></script>
        <!--<script src="assets/js/vendor.js"></script>-->
        <script src="assets/js/report.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="assets/vendor/jQueryMinMaxSelect/js/jminmaxselect.dev.js"></script>
        <script>
//            $(document).ready(function() {
//                $('#PrToPoCycleTimeReportTable').DataTable();
//            });
            $(document).ready(function() {
                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

                $('#PlantCode_R4').jMinMaxSelect({
                    maxSelect: '#ToPlantCode_R4'
                });

                if ($("#buyerAuditFromDate_div").length) {
                    $(function() {
                        $('#buyerAuditFromDate_div').datetimepicker({
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $('#buyerAuditToDate_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $("#buyerAuditFromDate_div").on("change.datetimepicker", function(e) {
                            $('#buyerAuditToDate_div').datetimepicker('minDate', e.date);
                        });
                        $("#buyerAuditToDate_div").on("change.datetimepicker", function(e) {
                            $('#buyerAuditFromDate_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#PoAckFromDate_div").length) {
                    $(function() {
                        $('#PoAckFromDate_div').datetimepicker({
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $('#PoAckToDate_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $("#PoAckFromDate_div").on("change.datetimepicker", function(e) {
                            $('#PoAckToDate_div').datetimepicker('minDate', e.date);
                        });
                        $("#PoAckToDate_div").on("change.datetimepicker", function(e) {
                            $('#PoAckFromDate_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#PrToPoCycleTimeFromDate_div").length) {
                    $(function() {
                        $('#PrToPoCycleTimeFromDate_div').datetimepicker({
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $('#PrToPoCycleTimeToDate_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $("#PrToPoCycleTimeFromDate_div").on("change.datetimepicker", function(e) {
                            $('#PrToPoCycleTimeToDate_div').datetimepicker('minDate', e.date);
                        });
                        $("#PrToPoCycleTimeToDate_div").on("change.datetimepicker", function(e) {
                            $('#PrToPoCycleTimeFromDate_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#FromPRApprovedDate_R4_div").length) {
                    $(function() {
                        $('#FromPRApprovedDate_R4_div').datetimepicker({
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $('#ToPRApprovedDate_R4_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $("#FromPRApprovedDate_R4_div").on("change.datetimepicker", function(e) {
                            $('#ToPRApprovedDate_R4_div').datetimepicker('minDate', e.date);
                        });
                        $("#ToPRApprovedDate_R4_div").on("change.datetimepicker", function(e) {
                            $('#FromPRApprovedDate_R4_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#FromRequiredDate_R4_div").length) {
                    $(function() {
                        $('#FromRequiredDate_R4_div').datetimepicker({
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $('#ToRequiredDate_R4_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD.MM.YYYY'
//                            minDate: new Date()
                        });
                        $("#FromRequiredDate_R4_div").on("change.datetimepicker", function(e) {
                            $('#ToRequiredDate_R4_div').datetimepicker('minDate', e.date);
                        });
                        $("#ToRequiredDate_R4_div").on("change.datetimepicker", function(e) {
                            $('#FromRequiredDate_R4_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }

            });
        </script>
    </body>

</html>