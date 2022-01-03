<%-- 
    Document   : contractreports
    Created on : 23 Jun, 2020, 2:19:17 PM
    Author     : ramkrishnan.elango
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
            .chosen-container { width: 100% !important; }
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
                                        <div class="card-body">
                                            <div class="tab-regular">
                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="SowRequestStatusReport-tab-justify" data-toggle="tab" href="#SowRequestStatusReport-justify" role="tab" aria-controls="SowRequestStatusReport" aria-selected="true">Sow Request Status Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="ContractStatusReport-tab-justify" data-toggle="tab" href="#ContractStatusReport-justify" role="tab" aria-controls="ContractStatusReport" aria-selected="false">Contract Status Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="AuditReport-tab-justify" data-toggle="tab" href="#AuditReport-justify" role="tab" aria-controls="AuditReport" aria-selected="false">Audit Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="ContractAcknowledgementReport-tab-justify" data-toggle="tab" href="#ContractAcknowledgementReport-justify" role="tab" aria-controls="ContractAcknowledgementReport" aria-selected="false">Contract Acknowledgement Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="ContractLineCycleReport-tab-justify" data-toggle="tab" href="#ContractLineCycleReport-justify" role="tab" aria-controls="ContractLineCycleReport" aria-selected="false">Contract Line Cycle Report</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="ContractVersioningReport-tab-justify" data-toggle="tab" href="#ContractVersioningReport-justify" role="tab" aria-controls="ContractVersioningReportt" aria-selected="false">Contract Versioning Report</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content">
                                                        <div class="tab-pane fade show active" id="SowRequestStatusReport-justify" role="tabpanel" aria-labelledby="SowRequestStatusReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromPlantCodeSR" class="">From Plant Code</label><br>
                                                                        <select tabindex="1" class="custom-select" id="FromPlantCodeSR" name="FromPlantCodeSR">
                                                                            <option value="0">Select</option>
                                                                            <option value="6400" selected>6400 -- NATSTEEL HOLDINGS</option>
                                                                            <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                                            <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                                            <option value="6800">6800 -- NATSTEEL ESM</option>
                                                                            <option value="7000">All</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPlantCodeSR" class="">To Plant Code</label><br>
                                                                        <select tabindex="1" class="custom-select" id="ToPlantCodeSR" name="ToPlantCodeSR">
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
                                                                        <label for="FromSowNo" class="">From Sow No.</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="FromSowNo" name="FromSowNo" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="pr" items="${prList}" varStatus="status">
                                                                                <option value="${pr.purchaseRequestNumber}">${pr.purchaseRequestNumber}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToSowNo" class="">To Sow No.</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToSowNo" name="ToSowNo" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
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
                                                                        <label for="FromPurchaseGroupSR" class="">From Purchase Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="FromPurchaseGroupSR" name="FromPurchaseGroupSR" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPurchaseGroupSR" class="">To Purchase Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToPurchaseGroupSR" name="ToPurchaseGroupSR" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="SowRaisedBy" class="">Sow Raised By</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="SowRaisedBy" name="SowRaisedBy"> 
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromSowApprovedDate" class="">From Sow Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="FromSowApprovedDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="FromSowApprovedDate" name="FromSowApprovedDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#FromSowApprovedDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>    
                                                            </div>
                                                            
                                                            <div class="row">  
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToSowApprovedDate" class="">To Sow Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate">-->

                                                                        <div class="input-group date" id="ToSowApprovedDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ToSowApprovedDate" name="ToSowApprovedDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#ToSowApprovedDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ProcessingStatusSRSow" class="">Processing Status</label><br>
                                                                        <select class="custom-select" id="ProcessingStatusSRSow" name="ProcessingStatusSRSow">
                                                                            <option value="">Select</option>
                                                                            <option>PR Line Created</option>
                                                                            <option>Contract Created</option>
                                                                            <option>RFQ Created</option>
                                                                            <option>PO Created</option>
                                                                            <option>Scheduling Agreement Created</option>
                                                                        </select> 
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="OLANo" class="">OLA Number</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="OLANo" name="OLANo"> 
                                                                    </div>
                                                                </div>
                                                            <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromMSGroup" class="">From Material/Service Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="FromMSGroup" name="FromMSGroup" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                              </div>
                                                            
                                                            <div class="row">
                                                               <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToMSGroup" class="">To Material/Service Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToMSGroup" name="ToMSGroup" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="MSNo" class="">Material/Service Number</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="MSNo" name="MSNo"> 
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ContractRaisedBySR" class="">Contract Raised By</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="ContractRaisedBySR" name="ContractRaisedBySR"> 
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromContractApprovedDateSR" class="">From Contract Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="FromContractApprovedDateSR_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="FromContractApprovedDateSR" name="FromContractApprovedDateSR" data-target="" />
                                                                            <div class="input-group-append" data-target="#FromContractApprovedDateSR_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                               <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToContractApprovedDateSR" class="">To Contract Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="expecteddeliverydate" name="expecteddeliverydate">-->

                                                                        <div class="input-group date" id="ToContractApprovedDateSR_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ToContractApprovedDateSR" name="ToContractApprovedDateSR" data-target="" />
                                                                            <div class="input-group-append" data-target="#ToContractApprovedDateSR_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ProcessingStatusSRContract" class="">Processing Status</label><br>
                                                                        <select class="custom-select" id="ProcessingStatusSRContract" name="ProcessingStatusSRContract">
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
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateSowStatusReportBtn" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearSowStatusReportBtn" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered sowStatusReportTable" id="sowStatusReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th class="noExport" scope="col"></th>
                                                                                    <th>Co-Code</th>
                                                                                    <th>Contract Number/Required By</th>
                                                                                    <th>Contract Title</th>
                                                                                    <th>Current Status</th>
                                                                                    <th>Service Number</th>
                                                                                    <th>Service Group</th>
                                                                                    <th>OLA Number</th>
                                                                                    <th>Contract Approved Date</th>
                                                                                    <th>Ageing</th>
                                                                                    <th>Vendor Name</th>
                                                                                    <th>Validity Start Date</th>
                                                                                    <th>Validity End Date</th>
                                                                                    <th>Differential(in Days)</th>
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
                                                    
                                                    <div class="tab-pane fade show" id="ContractStatusReport-justify" role="tabpanel" aria-labelledby="ContractStatusReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromPlantCodeCS" class="">From Plant Code</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="FromPlantCodeCS" name="FromPlantCodeCS" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <option value="6400" selected>6400 -- NATSTEEL HOLDINGS</option>
                                                                            <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                                            <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                                            <option value="6800">6800 -- NATSTEEL ESM</option>
                                                                            <option value="7000">All</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPlantCodeCS" class="">To Plant Code</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToPlantCodeCS" name="ToPlantCodeCS" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
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
                                                                        <label for="FromContractNo" class="">From Contract No.</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="FromContractNo" name="FromContractNo" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="pr" items="${prList}" varStatus="status">
                                                                                <option value="${pr.purchaseRequestNumber}">${pr.purchaseRequestNumber}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToContractNo" class="">To Contract No.</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToContractNo" name="ToContractNo" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
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
                                                                        <label for="FromPurchaseGroupCS" class="">From Purchase Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="FromPurchaseGroupCS" name="FromPurchaseGroupCS" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToPurchaseGroupCS" class="">From Purchase Group</label><br>

                                                                        <select class="selectpicker show-tick show-menu-arrow" id="ToPurchaseGroupCS" name="ToPurchaseGroupCS" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="group" items="${masterPurchasingGroupList}" varStatus="status">
                                                                                <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ContractRaisedByCS" class="">Contract Raised By</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="ContractRaisedByCS" name="ContractRaisedByCS"> 
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromContractApprovedDateCS" class="">From Contract Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="FromContractApprovedDateCS_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="FromContractApprovedDateCS" name="FromContractApprovedDateCS" data-target="" />
                                                                            <div class="input-group-append" data-target="#FromContractApprovedDateCS_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                 
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToContractApprovedDateCS" class="">To Contract Approved Date</label>
                                                                        <!--<input type="text" class="form-control form-rounded manual-date-input-check" id="rfqvaliduntil" name="rfqvaliduntil">-->

                                                                        <div class="input-group date" id="ToContractApprovedDateCS_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ToContractApprovedDateCS" name="ToContractApprovedDateCS" data-target="" />
                                                                            <div class="input-group-append" data-target="#ToContractApprovedDateCS_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ProcessingStatusCS" class="">Processing Status</label><br>
                                                                        <select class="custom-select" id="ProcessingStatusCS" name="ProcessingStatusCS">
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
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateContractStatusReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearContractStatusReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                        <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered contractStatusReportTable" id="contractStatusReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Co-Code</th>
                                                                                    <th>Contract Number/Required By</th>
                                                                                    <th>Item Code</th>
                                                                                    <th>Activation Date</th>
                                                                                    <th>Cost Centre</th>
                                                                                    <th>Ageing</th>
                                                                                    <th>Activation Date</th>
                                                                                    <th>Contract Code</th>
                                                                                    <th>Validity Start Date</th>
                                                                                    <th>Validity End Date</th>
                                                                                    <th>Differential(in Days)</th>
                                                                                    <th>Workmen Compensation</th>
                                                                                    <th>Public Liablity</th>
                                                                                    <th>Banker Guarantee/Deposit</th>
                                                                                    <th>BizSafe Level Certificate</th>
                                                                                    <th>Risk Assessment of Job</th>
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

                                                    <div class="tab-pane fade show" id="AuditReport-justify" role="tabpanel" aria-labelledby="AuditReport-tab-justify">
                                                        <!--<form action="" method="post" id="openRFQReportInputForm">-->
                                                            <!--<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">-->
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="FromDateBA" class="">From Date</label>
                                                                        <div class="input-group date" id="FromDateBA_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="FromDateBA" name="FromDateBA" data-target="" />
                                                                            <div class="input-group-append" data-target="#FromDateBA_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ToDateBA" class="">To Date</label>
                                                                        <div class="input-group date" id="ToDateBA_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ToDateBA" name="ToDateBA" data-target="" />
                                                                            <div class="input-group-append" data-target="#ToDateBA_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="BuyerIDBA" class="">Buyer ID</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="BuyerIDBA" name="BuyerIDBA" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="buyer" items="${buyerIdList}" varStatus="status">
                                                                                <option value="${buyer.id}">${buyer.username}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateAuditLogReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearAuditLogReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</form>-->
                                                            <br>
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered auditLogReportTable" id="auditLogReportTable">
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
                                                    
                                                    <div class="tab-pane fade show" id="ContractAcknowledgementReport-justify" role="tabpanel" aria-labelledby="ContractAcknowledgementReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ContractAckFromDate" class="">From Date</label>
                                                                        <div class="input-group date" id="ContractAckFromDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ContractAckFromDate" name="ContractAckFromDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#ContractAckFromDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ContractAckToDate" class="">To Date</label>
                                                                        <div class="input-group date" id="ContractAckToDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ContractAckToDate" name="ContractAckToDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#ContractAckToDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="ContractAckVendorCode" class="">Vendor Code</label><br>
                                                                        <input type="hidden" id="code" value="" name="code">
                                                                        <input type="text" placeholder="Type to search" class="form-control form-rounded vendorCodeName ui-autocomplete-input" id="vendorCodeName" name="vendorCodeName" value="" value autocomplete = "off">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                                                                                                
                                                                
                                                        
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateContractAckReportBtn" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearContractAckReportBtn" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <br>
                                                            
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered contractAckReportTable" id="contractAckReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Contract Number</th>
                                                                                    <th>Contract Acknowledged by Vendor</th>
                                                                                    <th>Contract Acknowledged by Buyer</th>
                                                                                    <th>Contract Not Acknowledged</th>
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
                                                
                                                        
                                                    <div class="tab-pane fade show" id="ContractLineCycleReport-justify" role="tabpanel" aria-labelledby="ContractLineCycleReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="CLRFromDate" class="">From Date</label>
                                                                        <div class="input-group date" id="CLRFromDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="CLRFromDate" name="CLRFromDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#CLRFromDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="CLRToDate" class="">To Date</label>
                                                                        <div class="input-group date" id="CLRToDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="CLRToDate" name="CLRToDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#CLRToDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="CLRBuyerID" class="">Buyer ID</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="CLRBuyerID" name="CLRBuyerID" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="buyer" items="${buyerIdList}" varStatus="status">
                                                                                <option value="${buyer.id}">${buyer.username}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="CLRVendorID" class="">Vendor ID</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="CLRVendorID" name="CLRVendorID" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
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
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateContractLineReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearContractLineReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered contractLineReportTable" id="contractLineReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Contract Number</th>
                                                                                    <th>Contract Title</th>
                                                                                    <th>Material/ Service Number (Desc.)</th>
                                                                                    <th>Vendor Name</th>
                                                                                    <th>OLA Number</th>
                                                                                    <th>Contract Initiated Date</th>
                                                                                    <th>Contract Approved Date</th>
                                                                                    <th>Cycle Time</th>
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
                                                    
                                                    <div class="tab-pane fade show" id="ContractVersioningReport-justify" role="tabpanel" aria-labelledby="ContractVersioningReport-tab-justify">
                                                        <div class="card-body">
                                                            <div class="row">
                                                               <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="CVRContractNo" class="">Contract No.</label><br>
                                                                        <select class="selectpicker show-tick show-menu-arrow" id="CVRContractNo" name="CVRContractNo" title="Choose any..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                                            <c:forEach var="pr" items="${prList}" varStatus="status">
                                                                                <option value="${pr.purchaseRequestNumber}">${pr.purchaseRequestNumber}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                              <div class="col-xl-3 col-lg-2 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="CVROlaNo" class="">OLA No.</label><br>
                                                                        <input type="text" class="form-control form-rounded" id="CVROlaNo" name="CVROlaNo"> 
                                                                    </div>
                                                                </div>  
                                                                
                                                            </div>
                                                            
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="align-center text-align-center">
                                                                        <!--<button class="btn btn-outline-primary btn-rounded" id="createprlineform">Create</button>-->
                                                                        <input type="submit" class="btn btn-primary btn-rounded" id="generateContractVersioningReport" value="Generate Report">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="clearContractVersioningReport" value="Clear">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered contractVersioningReportTable" id="contractVersioningReportTable" style="width: 100%;">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Contract Number</th>
                                                                                    <th>OLA No</th>
                                                                                    <th>Supplier/ Contractor</th>
                                                                                    <th>Contract Title</th>
                                                                                    <th>Version</th>
                                                                                    <th>Modified By</th>
                                                                                    <th>Modified On</th>
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
        <script src="assets/js/creport.js"></script>
        <script src="assets/js/report.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="assets/vendor/jQueryMinMaxSelect/js/jminmaxselect.dev.js"></script>
        <script>
            $(document).ready(function() {
                $(".selectpicker").selectpicker();
                $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

                $('#FromPlantCodeSR').jMinMaxSelect({
                    maxSelect: '#ToPlantCodeSR'
                });
                
                $('#FromPlantCodeCS').jMinMaxSelect({
                    maxSelect: '#ToPlantCodeCS'
                });

                if ($("#FromDateBA_div").length) {  //AuditReport
                    $(function() {
                        $('#FromDateBA_div').datetimepicker({
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $('#ToDateBA_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $("#FromDateBA_div").on("change.datetimepicker", function(e) {
                            $('#ToDateBA_div').datetimepicker('minDate', e.date);
                        });
                        $("#ToDateBA_div").on("change.datetimepicker", function(e) {
                            $('#FromDateBA_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#ContractAckFromDate_div").length) {   // Contract Ack Report
                    $(function() {
                        $('#ContractAckFromDate_div').datetimepicker({
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $('#ContractAckToDate_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $("#ContractAckFromDate_div").on("change.datetimepicker", function(e) {
                            $('#ContractAckToDate_div').datetimepicker('minDate', e.date);
                        });
                        $("#ContractAckToDate_div").on("change.datetimepicker", function(e) {
                            $('#ContractAckFromDate_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#CLRFromDate_div").length) {   //Contract Life cycle report
                    $(function() {
                        $('#CLRFromDate_div').datetimepicker({
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $('#CLRToDate_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $("#CLRFromDate_div").on("change.datetimepicker", function(e) {
                            $('#CLRToDate_div').datetimepicker('minDate', e.date);
                        });
                        $("#CLRToDate_div").on("change.datetimepicker", function(e) {
                            $('#CLRFromDate_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#FromContractApprovedDateCS_div").length) { //Contract status report
                    $(function() {
                        $('#FromContractApprovedDateCS_div').datetimepicker({
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $('#ToContractApprovedDateCS_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $("#FromContractApprovedDateCS_div").on("change.datetimepicker", function(e) {
                            $('#ToContractApprovedDateCS_div').datetimepicker('minDate', e.date);
                        });
                        $("#ToContractApprovedDateCS_div").on("change.datetimepicker", function(e) {
                            $('#FromContractApprovedDateCS_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#FromSowApprovedDate_div").length) {  //Sow repor
                    $(function() {
                        $('#FromSowApprovedDate_div').datetimepicker({
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $('#ToSowApprovedDate_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $("#FromSowApprovedDate_div").on("change.datetimepicker", function(e) {
                            $('#ToSowApprovedDate_div').datetimepicker('minDate', e.date);
                        });
                        $("#ToSowApprovedDate_div").on("change.datetimepicker", function(e) {
                            $('#FromSowApprovedDate_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }
                if ($("#FromContractApprovedDateSR_div").length) {  //Sow repor
                    $(function() {
                        $('#FromContractApprovedDateSR_div').datetimepicker({
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $('#ToContractApprovedDateSR_div').datetimepicker({
                            useCurrent: false,
                            format: 'DD-MM-YYYY'
//                            minDate: new Date()
                        });
                        $("#FromContractApprovedDateSR_div").on("change.datetimepicker", function(e) {
                            $('#ToContractApprovedDateSR_div').datetimepicker('minDate', e.date);
                        });
                        $("#ToContractApprovedDateSR_div").on("change.datetimepicker", function(e) {
                            $('#FromContractApprovedDateSR_div').datetimepicker('maxDate', e.date);
                        });
                    });
                }

            });
            
//            $('[data-toggle="tab"]').click(function(e) {
//                var $this = $(this),
//                loadurl = $this.attr('href'),
//                targ = $this.attr('data-target');
//
//                $.get(loadurl, function(data) {
//                $(targ).html(data);
//                });
//
//                $('[data-toggle="tab"]:eq(0)').trigger('click');
//
//                $this.tab('show');
//                return false;
//            });
//
//
//            $(document).ready(function(){
//                $('[data-toggle="tab"]:first').click();
//            });
//            
        </script>
    </body>

</html>
