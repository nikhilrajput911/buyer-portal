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

        <title>PR/Contract Assignment</title>
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
        <!-- ============================================================== -->
        <!-- main wrapper -->
        <!-- ============================================================== -->
        <div class="dashboard-main-wrapper">
            <!-- ============================================================== -->
            <!--<span id="spanId" style="font-size:40px;cursor:pointer">&#9776;</span>-->
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
                            <input type="hidden" value="${isPassUpdated}" id="ispasswordupdated">
                            <input type="hidden" value="${isPersonalInfoUpdated}" id="isPersonalInfoUpdated">
                            <!--<input type="hidden" value="${userRole}" id="userRole">-->
                            <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">
                            <input type="hidden" id="local_dev_uat" name="local_dev_uat" value="${local_dev_uat}">
                            <input type="hidden" id="buyerUsername" name="buyerUsername" value="${buyerObj.username}">
                            <input type="hidden" id="buyerRole" name="buyerRole" value="${buyerObj.role}">

                            <div id="overlay">
                                <div id="loader"></div>
                            </div>

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
                                    <div class="section-block">
                                    </div>
                                    <div class="tab-regular update-backgroud-color">
                                        <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                            <!--<li class="nav-item" onclick="location.reload();">-->
                                            <li class="nav-item">
                                                <a class="nav-link active update-backgroud-color" id="unassignedPR-tab-justify" data-toggle="tab" href="#unassignedPR-justify" role="tab" aria-controls="unassignedPR" aria-selected="true">UnAssigned PR</a>
                                            </li>
                                            <li class="nav-item" id="assigned_pr_tab">
                                                <a class="nav-link update-backgroud-color" id="assignedPR-tab-justify" data-toggle="tab" href="#assignedPR-justify" role="tab" aria-controls="assignedPR" aria-selected="false">Assigned PR</a>
                                            </li>
                                            <li class="nav-item" id="reassign_rfq_tab">
                                                <a class="nav-link update-backgroud-color" id="reassign_rfq-tab-justify" data-toggle="tab" href="#reassignRfq-justify" role="tab" aria-controls="reassignRfq" aria-selected="false">ReAssign RFQ</a>
                                            </li>
                                            <!--                                                <li class="nav-item">
                                                                                                <a class="nav-link update-backgroud-color" id="unassignedContractLine-tab-justify" data-toggle="tab" href="#unassignedContractLine-justify" role="tab" aria-controls="unassignedContractLine" aria-selected="false">UnAssigned Contract Line</a>
                                                                                            </li>-->
                                            <li class="nav-item">
                                                <a class="nav-link update-backgroud-color" id="assignedContractLine-tab-justify" data-toggle="tab" href="#assignedContractLine-justify" role="tab" aria-controls="assignedContractLine" aria-selected="false">Assigned Contract Line</a>
                                            </li>
                                            <!--abhishek-->
                                            <!--                                                <li class="nav-item">
                                                                                                <a class="nav-link" id="reassign_crfq-tab-justify" data-toggle="tab" href="#reassignContractrfq-justify" role="tab" aria-controls="reassignContractrfq" aria-selected="false">ReAssign</a>
                                                                                            </li> -->
                                            <!--abhishek-->
                                        </ul>
                                        <div class="tab-content update-backgroud-color" id="myTabContent7">

                                            <!-- PR Started -->

                                            <div class="tab-pane fade show active" id="unassignedPR-justify" role="tabpanel" aria-labelledby="unassignedPR-tab-justify">

                                                <form class="" method="post" action="assignprline.do" id="assignprlineform">
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                    <input type="hidden" value="" name="prlineids" id="prlineids">
<!--                                                                    <input type="hidden" value="${ispassupdated}" id="ispasswordupdated">-->
                                                    <input type="hidden" id="companycode" name="companycode">
                                                    <div class="row">
                                                        &emsp;
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                            <div class="form-group">
                                                                <label for="buyerlist" class="">Buyer:</label>

                                                                <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="buyerid" name="buyerid">
                                                                    <option value=""></option>
                                                                    <c:forEach var="mapping" items="${buyerMappingList}">
                                                                        <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                                    </c:forEach>
                                                                </select>

                                                            </div>
                                                        </div>

                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div class="form-group"><br>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="workloadAssignmentReportbtnpr" value="Workload Report" title="Workload Assignment Report"/>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="blockandsimulatebtnpr" value="Block & Simulate"/>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="assignbtn" value="Assign"/>
                                                                <button type="button" class=" btn-rounded btn btn-primary btn-sm" id="newworkloadAssignmentReportbtnpr" title="Workload Assignment Report">Workload Report <span class="badge badge-danger">New</span></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br>
                                                </form>
                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="material nav-link active update-backgroud-color" id="PRMaterial-tab-justify" data-toggle="tab" href="#PRMaterial-justify" role="tab" aria-controls="PRMaterial" aria-selected="false">Material</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="service nav-link update-backgroud-color" id="PRService-tab-justify" data-toggle="tab" href="#PRService-justify" role="tab" aria-controls="PRService" aria-selected="true">Service</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content update-backgroud-color">
                                                    <div class="tab-pane fade show active" id="PRMaterial-justify" role="tabpanel" aria-labelledby="PRMaterial-tab-justify">
                                                        <!--<h8>Material</h8>-->
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <!--<div class="card">-->
                                                                <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                <div class="card-body" style="padding-top: 0em;">
                                                                    <!--<div class="row">-->
                                                                    <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                        <div class="form-group"><br>
                                                                            <a href="#" class="btn btn-primary btn-rounded btn-sm" id="filterLinkId" title="Filter Worload Report" data-toggle="tooltip" data-placement="auto">
                                                                                <i class="fa fa-filter" aria-hidden="true"></i> Filter 
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped table-hover pr-details" id="pr_details">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExport" scope="col">
                                                                                        <c:if test="${tlUnassignedMaterialPRLineList.size() > 0}">
                                                                                            <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                                        </c:if>
                                                                                    </th>
                                                                                    <th class="" scope="col">Dept. Desc.</th>
                                                                                    <th class="" scope="col">Co-Code</th>
                                                                                    <th class="" scope="col">Req. Number/ Required By </th>
                                                                                    <th class="" scope="col">Approved By/ Date</th>
                                                                                    <th class="" scope="col">Req’d Date/ Buyer</th>
                                                                                    <th class="" scope="col">Item Code/ Old Mat. No/ Description </th>
                                                                                    <th class="noExport" scope="col">PO Text </th>
                                                                                    <th style="display: none;">Long Text </th>
                                                                                    <th class="" scope="col">Item Text </th>
                                                                                    <th class="" scope="col">UoM </th>
                                                                                    <th class="" scope="col">Quantity/ UoM-Store </th>
                                                                                    <th class="" scope="col">Loc Purchase </th>
                                                                                    <th class="" scope="col">LT / SLoc </th>
                                                                                    <th class="" scope="col">Project/ PO Buyer </th>
                                                                                    <th class="" scope="col">Over Due </th>
                                                                                    <th class="" scope="col">Last PO / PO Date </th>
                                                                                    <th class="" scope="col">Per Unit/ PR Currency </th>
                                                                                    <th class="" scope="col">Supplier </th>
                                                                                    <th class="" scope="col">Header Note </th>
                                                                                    <th class="" scope="col">Item Note </th>
                                                                                    <th class="" scope="col">MIQA Mat’l </th>
                                                                                    <th class="" scope="col">PID </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="pr" items="${tlUnassignedMaterialPRLineList}" varStatus="status">
                                                                                    <tr>
                                                                                        <td align="center">
                                                                                            <input type="checkbox" value="${pr.insertionOrderId}" class="pr-checkbox-class">
                                                                                            <input type="hidden" class="prAccountAssignment" value="${pr.accountAssignment}">
                                                                                            <input type="hidden" class="prItemCategory" value="${pr.itemCategory}">
                                                                                        </td>
                                                                                        <td align="center">${pr.departmentDescription}</td>
                                                                                        <td align="center">${pr.companyCode}</td>
                                                                                        <td align="center">${pr.purchaseRequestNumber} / ${pr.initiatorId}</td>
                                                                                        <td align="center">${pr.approverName} / ${pr.approvedDate}</td>
                                                                                        <td align="center">${pr.requisitionDate} / ${pr.lastBuyer}</td>
                                                                                        <td align="center">${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                        <td align="center">
                                                                                            <a href="#" class="longTextClass" title="PO Text" data-toggle="tooltip" data-placement="auto">
                                                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                                                            </a>
                                                                                            <input type="hidden" name="longTextId" class="longTextClass" value="${pr.materialLongText}">
                                                                                        </td>
                                                                                        <td  style="display: none;">${pr.materialLongText}</td>
                                                                                        <td align="center">${pr.itemText}</td>
                                                                                        <td align="center">${pr.unit}</td>
                                                                                        <td align="center">${pr.quantity} / ${pr.uomStore}</td>
                                                                                        <td align="center">${pr.localPurchase}</td>
                                                                                        <td align="center">${pr.leadTime} / ${pr.storageLocation}</td>
                                                                                        <td align="center">${pr.orderNumber == '' ? 'N' : pr.orderNumber} - ${pr.purchasingGroupDesc} / ${pr.lastPoBuyer}</td>
                                                                                        <td align="center">${pr.overDue}</td>
                                                                                        <td align="center">${pr.lastPoNumber}  / ${pr.lastPoDate}</td>
                                                                                        <td align="center"> ${pr.priceUnit} / ${pr.currency}</td>
                                                                                        <td align="center">${pr.lastPoSupplier}</td>
                                                                                        <td align="center">${pr.headerNote}</td>
                                                                                        <td align="center">${pr.itemNote}</td>
                                                                                        <td align="center">${pr.miqaMaterial}</td>
                                                                                        <td align="center">${pr.processInstId}</td>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <!--</div>-->
                                                                    <!--</div>-->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show" id="PRService-justify" role="tabpanel" aria-labelledby="PRService-tab-justify">
                                                        <!--<h8>Service</h8>-->
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <!--<div class="card">-->
                                                                <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                <div class="card-body" style="padding-top: 0em;">
                                                                    <!--<div class="row">-->
                                                                    <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                        <div class="form-group"><br>
                                                                            <a href="#" class="btn btn-primary btn-rounded btn-sm" id="filterLinkId_Service" title="Filter Worload Report" data-toggle="tooltip" data-placement="auto">
                                                                                <i class="fa fa-filter" aria-hidden="true"></i> Filter 
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped table-hover pr-detailsSerice" id="pr_detailsSerice">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExport" scope="col">
                                                                                        <c:if test="${tlUnassignedServicePRLineList.size() > 0}">
                                                                                            <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                                        </c:if>
                                                                                    </th>
                                                                                    <th class="" scope="col">Dept. Desc.</th>
                                                                                    <th class="" scope="col">Co-Code</th>
                                                                                    <th class="" scope="col">Req. Number/ Required By </th>
                                                                                    <th class="" scope="col">Approved By/ Date</th>
                                                                                    <th class="" scope="col">Req’d Date/ Buyer</th>
                                                                                    <th class="" scope="col">Item Code/ Old Mat. No/ Description </th>
                                                                                    <th class="noExport" scope="col">PO Text </th>
                                                                                    <th style="display: none;">Long Text </th>
                                                                                    <th class="" scope="col">Item Text </th>
                                                                                    <th class="" scope="col">UoM </th>
                                                                                    <th class="" scope="col">Quantity/ UoM-Store </th>
                                                                                    <th class="" scope="col">Loc Purchase </th>
                                                                                    <th class="" scope="col">LT / SLoc </th>
                                                                                    <th class="" scope="col">Project/ PO Buyer </th>
                                                                                    <th class="" scope="col">Over Due </th>
                                                                                    <th class="" scope="col">Last PO / PO Date </th>
                                                                                    <th class="" scope="col">Per Unit/ PR Currency </th>
                                                                                    <th class="" scope="col">Supplier </th>
                                                                                    <th class="" scope="col">Header Note </th>
                                                                                    <th class="" scope="col">Item Note </th>
                                                                                    <th class="" scope="col">MIQA Mat’l </th>
                                                                                    <th class="" scope="col">PID </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="pr" items="${tlUnassignedServicePRLineList}" varStatus="status">
                                                                                    <tr>
                                                                                        <td align="center">
                                                                                            <input type="checkbox" value="${pr.insertionOrderId}" class="pr-checkbox-class">
                                                                                            <input type="hidden" class="prAccountAssignment" value="${pr.accountAssignment}">
                                                                                            <input type="hidden" class="prItemCategory" value="${pr.itemCategory}">
                                                                                        </td>
                                                                                        <td align="center">${pr.departmentDescription}</td>
                                                                                        <td align="center">${pr.companyCode}</td>
                                                                                        <td align="center">${pr.purchaseRequestNumber} / ${pr.initiatorId}</td>
                                                                                        <td align="center">${pr.approverName} / ${pr.approvedDate}</td>
                                                                                        <td align="center">${pr.requisitionDate} / ${pr.lastBuyer} </td>
                                                                                        <td align="center">${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                        <td align="center">
                                                                                            <a href="#" class="longTextClass" title="PO Text" data-toggle="tooltip" data-placement="auto">
                                                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                                                            </a>
                                                                                            <input type="hidden" name="longTextId" class="longTextClass" value="${pr.materialLongText}">
                                                                                        </td>
                                                                                        <td  style="display: none;">${pr.materialLongText}</td>
                                                                                        <td align="center">${pr.itemText}</td>
                                                                                        <td align="center">${pr.unit}</td>
                                                                                        <td align="center">${pr.quantity} / ${pr.uomStore}</td>
                                                                                        <td align="center">${pr.localPurchase}</td>
                                                                                        <td align="center">${pr.leadTime} / ${pr.storageLocation}</td>
                                                                                        <td align="center">${pr.orderNumber == '' ? 'N' : pr.orderNumber} - ${pr.purchasingGroupDesc} / ${pr.lastPoBuyer}</td>
                                                                                        <td align="center">${pr.overDue}</td>
                                                                                        <td align="center">${pr.lastPoNumber}  / ${pr.lastPoDate}</td>
                                                                                        <td align="center"> ${pr.priceUnit} / ${pr.currency}</td>
                                                                                        <td align="center">${pr.lastPoSupplier}</td>
                                                                                        <td align="center">${pr.headerNote}</td>
                                                                                        <td align="center">${pr.itemNote}</td>
                                                                                        <td align="center">${pr.miqaMaterial}</td>
                                                                                        <td align="center">${pr.processInstId}</td>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <!--</div>-->
                                                                    <!--</div>-->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="tab-pane fade" id="assignedPR-justify" role="tabpanel" aria-labelledby="assignedPR-tab-justify">
                                                <form class="" method="post" action="reassignprline.do" id="reassignprlineform">
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                    <input type="hidden" value="" name="reassignprlineids" id="reassignprlineids">
                                                    <div class="row">
                                                        &emsp;
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                            <div class="form-group">
                                                                <label for="reassignBuyerId" class="">Buyer:</label>

                                                                <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassignBuyerId" name="reassignBuyerId">
                                                                    <option value=""></option>
                                                                    <c:forEach var="mapping" items="${buyerMappingList}">
                                                                        <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                                    </c:forEach>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div class="form-group"><br>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="reassignbtn" value="Re-Assign"/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active update-backgroud-color" id="assigned-PRMaterial-tab-justify" data-toggle="tab" href="#assigned-PRMaterial-justify" role="tab" aria-controls="assigned-PRMaterial" aria-selected="false">Material</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link update-backgroud-color" id="assigned-PRService-tab-justify" data-toggle="tab" href="#assigned-PRService-justify" role="tab" aria-controls="assigned-PRService" aria-selected="true">Service</a>
                                                    </li>

                                                </ul>
                                                <div class="tab-content update-backgroud-color">
                                                    <div class="tab-pane fade show active" id="assigned-PRMaterial-justify" role="tabpanel" aria-labelledby="assigned-PRMaterial-tab-justify">
                                                        <!--<h8>Material</h8>-->
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <!--<div class="card">-->
                                                                <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                <div class="card-body">
                                                                    <!--<div class="row">-->
                                                                    <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped table-hover assigned-pr-details" id="assigned_pr_details">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExport" scope="col"></th>
                                                                                    <th class="" scope="col">Assigned To</th>
                                                                                    <th class="" scope="col">Dept. Desc.</th>
                                                                                    <th class="" scope="col">Co-Code</th>
                                                                                    <th class="" scope="col">Req. Number/ Required By </th>
                                                                                    <th class="" scope="col">Approved By/ Date</th>
                                                                                    <th class="" scope="col">Req’d Date/ Buyer </th>
                                                                                    <th class="" scope="col">Item Code/ Old Mat. No/ Description </th>
                                                                                    <th class="noExport" scope="col">PO Text </th>
                                                                                    <th style="display: none;">Long Text </th>
                                                                                    <th class="" scope="col">Item Text </th>
                                                                                    <th class="" scope="col">UoM </th>
                                                                                    <th class="" scope="col">Quantity/ UoM-Store </th>
                                                                                    <th class="" scope="col">Loc Purchase </th>
                                                                                    <th class="" scope="col">LT / SLoc </th>
                                                                                    <th class="" scope="col">Project/ PO Buyer </th>
                                                                                    <th class="" scope="col">Over Due </th>
                                                                                    <th class="" scope="col">Last PO / PO Date </th>
                                                                                    <th class="" scope="col">Per Unit/ PR Currency </th>
                                                                                    <th class="" scope="col">Supplier </th>
                                                                                    <th class="" scope="col">Header Note </th>
                                                                                    <th class="" scope="col">Item Note </th>
                                                                                    <th class="" scope="col">MIQA Mat’l </th>
                                                                                    <th class="noExport" scope="col" style="display: none;">BuyerId</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="pr" items="${tlAssignedMaterialPRLineList}" varStatus="status">
                                                                                    <tr>
                                                                                        <!--<td align="center"><i title="Unassign" class="fa fa-window-close unAssignedPRbtn" aria-hidden="true"></i><input type="hidden" class="prid" name="prid" value="${pr.insertionOrderId}"></td>-->
                                                                                        <td align="center"><input type="checkbox" value="${pr.insertionOrderId}" class="reassign-pr-checkbox-class"></td>
                                                                                        <td align="center">${pr.buyerName}</td>
                                                                                        <td align="center">${pr.departmentDescription}</td>
                                                                                        <td align="center">${pr.companyCode}</td>
                                                                                        <td align="center">${pr.purchaseRequestNumber} / ${pr.initiatorId}</td>
                                                                                        <td align="center">${pr.approverName} / ${pr.approvedDate}</td>
                                                                                        <td align="center">${pr.requisitionDate} / </td>
                                                                                        <td align="center">${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                        <td align="center">
                                                                                            <a href="#" class="longTextClass" title="PO Text" data-toggle="tooltip" data-placement="auto">
                                                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                                                            </a>
                                                                                            <input type="hidden" name="longTextId" class="longTextClass" value="${pr.materialLongText}">
                                                                                        </td>
                                                                                        <td  style="display: none;">${pr.materialLongText}</td>
                                                                                        <td align="center">${pr.itemText}</td>
                                                                                        <td align="center">${pr.unit}</td>
                                                                                        <td align="center">${pr.quantity} / ${pr.uomStore}</td>
                                                                                        <td align="center">${pr.localPurchase}</td>
                                                                                        <td align="center">${pr.leadTime} / ${pr.storageLocation}</td>
                                                                                        <td align="center">${pr.orderNumber == '' ? 'N' : pr.orderNumber} - ${pr.purchasingGroupDesc} / ${pr.lastPoBuyer}</td>
                                                                                        <td align="center">${pr.overDue}</td>
                                                                                        <td align="center">${pr.lastPoNumber}  / ${pr.lastPoDate}</td>
                                                                                        <td align="center"> ${pr.priceUnit} / ${pr.currency}</td>
                                                                                        <td align="center">${pr.lastPoSupplier}</td>
                                                                                        <td align="center">${pr.headerNote}</td>
                                                                                        <td align="center">${pr.itemNote}</td>
                                                                                        <td align="center">${pr.miqaMaterial}</td>
                                                                                        <td align="center" style="display: none;">${pr.buyerId}</td>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="tab-pane fade show" id="assigned-PRService-justify" role="tabpanel" aria-labelledby="assigned-PRService-tab-justify">
                                                        <!--<h8>Service</h8>-->
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <!--<div class="card">-->
                                                                <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                <div class="card-body">
                                                                    <!--<div class="row">-->
                                                                    <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-striped table-hover assigned-pr-detailsService" id="assigned_pr_detailsService">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExport" scope="col"></th>
                                                                                    <th class="" scope="col">Assigned To</th>
                                                                                    <th class="" scope="col">Dept. Desc.</th>
                                                                                    <th class="" scope="col">Co-Code</th>
                                                                                    <th class="" scope="col">Req. Number/ Required By </th>
                                                                                    <th class="" scope="col">Approved By/ Date</th>
                                                                                    <th class="" scope="col">Req’d Date/ Buyer </th>
                                                                                    <th class="" scope="col">Item Code/ Old Mat. No/ Description </th>
                                                                                    <th class="noExport" scope="col">PO Text </th>
                                                                                    <th style="display: none;">Long Text </th>
                                                                                    <th class="" scope="col">Item Text </th>
                                                                                    <th class="" scope="col">UoM </th>
                                                                                    <th class="" scope="col">Quantity/ UoM-Store </th>
                                                                                    <th class="" scope="col">Loc Purchase </th>
                                                                                    <th class="" scope="col">LT / SLoc </th>
                                                                                    <th class="" scope="col">Project/ PO Buyer </th>
                                                                                    <th class="" scope="col">Over Due </th>
                                                                                    <th class="" scope="col">Last PO / PO Date </th>
                                                                                    <th class="" scope="col">Per Unit/ PR Currency </th>
                                                                                    <th class="" scope="col">Supplier </th>
                                                                                    <th class="" scope="col">Header Note </th>
                                                                                    <th class="" scope="col">Item Note </th>
                                                                                    <th class="" scope="col">MIQA Mat’l </th>
                                                                                    <th class="noExport" scope="col" style="display: none;">BuyerId</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="pr" items="${tlAssignedServicePRLineList}" varStatus="status">
                                                                                    <tr>
                                                                                        <!--<td align="center"><i title="Unassign" class="fa fa-window-close unAssignedPRbtn" aria-hidden="true"></i><input type="hidden" class="prid" name="prid" value="${pr.insertionOrderId}"></td>-->
                                                                                        <td align="center"><input type="checkbox" value="${pr.insertionOrderId}" class="reassign-pr-checkbox-class"></td>
                                                                                        <td align="center">${pr.buyerName}</td>
                                                                                        <td align="center">${pr.departmentDescription}</td>
                                                                                        <td align="center">${pr.companyCode}</td>
                                                                                        <td align="center">${pr.purchaseRequestNumber} / ${pr.initiatorId}</td>
                                                                                        <td align="center">${pr.approverName} / ${pr.approvedDate}</td>
                                                                                        <td align="center">${pr.requisitionDate} / </td>
                                                                                        <td align="center">${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                        <td align="center">
                                                                                            <a href="#" class="longTextClass" title="PO Text" data-toggle="tooltip" data-placement="auto">
                                                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                                                            </a>
                                                                                            <input type="hidden" name="longTextId" class="longTextClass" value="${pr.materialLongText}">
                                                                                        </td>
                                                                                        <td  style="display: none;">${pr.materialLongText}</td>
                                                                                        <td align="center">${pr.itemText}</td>
                                                                                        <td align="center">${pr.unit}</td>
                                                                                        <td align="center">${pr.quantity} / ${pr.uomStore}</td>
                                                                                        <td align="center">${pr.localPurchase}</td>
                                                                                        <td align="center">${pr.leadTime} / ${pr.storageLocation}</td>
                                                                                        <td align="center">${pr.orderNumber == '' ? 'N' : pr.orderNumber} - ${pr.purchasingGroupDesc} / ${pr.lastPoBuyer}</td>
                                                                                        <td align="center">${pr.overDue}</td>
                                                                                        <td align="center">${pr.lastPoNumber}  / ${pr.lastPoDate}</td>
                                                                                        <td align="center">${pr.priceUnit} / ${pr.currency}</td>
                                                                                        <td align="center">${pr.lastPoSupplier}</td>
                                                                                        <td align="center">${pr.headerNote}</td>
                                                                                        <td align="center">${pr.itemNote}</td>
                                                                                        <td align="center">${pr.miqaMaterial}</td>
                                                                                        <td align="center" style="display: none;">${pr.buyerId}</td>
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
                                            <div class="tab-pane fade" id="reassignRfq-justify" role="tabpanel" aria-labelledby="reassignRfq-tab-justify">
                                                <form class="" method="post" action="reassignrfq.do" id="reassignrfqform">
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                    <input type="hidden" value="" name="reassignrfqids" id="reassignrfqids">
                                                    <div class="row">
                                                        &emsp;
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                            <div class="form-group">
                                                                <label for="reassignRfqBuyerId" class="">Buyer:</label>

                                                                <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassignRfqBuyerId" name="reassignRfqBuyerId">
                                                                    <option value=""></option>
                                                                    <c:forEach var="mapping" items="${buyerMappingList}">
                                                                        <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                                    </c:forEach>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div class="form-group"><br>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="reassignRfqBtn" value="Re-Assign"/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div class="tab-content update-backgroud-color">
                                                    <div class="row">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <!--<div class="card">-->
                                                            <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                            <div class="card-body">
                                                                <!--<div class="row">-->
                                                                <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-striped table-hover reassign-rfq-details-table" id="reassign_rfq_details_table" style="width:100%;">
                                                                        <thead class="">
                                                                            <tr class="">
                                                                                <th class="noExport">#</th>
                                                                                <th>RFQ Number</th>
                                                                                <th>RFQ Title</th>
                                                                                <th>RFQ Status</th>
                                                                                <th>RFQ Request Date</th>
                                                                                <th>Buyer Username</th>
                                                                                <th>Buyer Name</th>
                                                                                <th class="noExport" style="display: none;">BuyerId</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="rfq" items="${allRfqList}" varStatus="status">
                                                                                <tr>
                                                                                    <td align="center"><input type="checkbox" value="${rfq.rfqid}" class="reassign-rfq-checkbox-class"></td>
                                                                                    <td>${rfq.rfqNumber}</td>
                                                                                    <td>${rfq.RFQTitle}</td>
                                                                                    <c:choose>
                                                                                        <c:when test="${rfq.rfqstatus == 'Pending'}">
                                                                                            <td><span class="badge-dot badge-brand mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                        </c:when>
                                                                                        <c:when test="${rfq.rfqstatus == 'Bid Submitted'}">
                                                                                            <td><span class="badge-dot badge-success mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                        </c:when>
                                                                                        <c:when test="${rfq.rfqstatus == 'On Hold'}">
                                                                                            <td><span class="badge-dot badge-danger mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                        </c:when>
                                                                                        <c:when test="${rfq.rfqstatus == 'Cancel'}">
                                                                                            <td><span class="badge-dot badge-secondary mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                        </c:when>
                                                                                        <c:otherwise>
                                                                                            <td>${rfq.rfqstatus}</td>
                                                                                        </c:otherwise>    
                                                                                    </c:choose>
                                                                                    <td><fmt:formatDate value="${rfq.rfqRequestDate}" pattern="dd-MM-yyyy"></fmt:formatDate></td>
                                                                                    <td>${rfq.ngBpBuyerdetailsId.username}</td>
                                                                                    <td>${rfq.ngBpBuyerdetailsId.firstname} ${rfq.ngBpBuyerdetailsId.lastname}</td>
                                                                                    <td style="display: none;">${rfq.ngBpBuyerdetailsId.id}</td>
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

                                            <!-- PR Ended -->

                                            <div class="tab-pane fade" id="unassignedContractLine-justify" role="tabpanel" aria-labelledby="unassignedContractLine-justify">

                                                <form class="" method="post" action="assigncontractline.do" id="unassignedContractLine">
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                    <input type="hidden" value="" name="unassignedContractLine_pr_details" id="unassignedContractLine_pr_details">
                                                    <input type="hidden" id="contractlineids" name="contractlineids">
                                                    <input type="hidden" value="${ispassupdated}" id="ispasswordupdated">
                                                    <div class="row">
                                                        &emsp;
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div class="form-group">
                                                                <label for="vendorname" class="">Buyer:</label>

                                                                <select id="contractbuyerid" name="contractbuyerid" data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen">
                                                                    <option value=""></option>
                                                                    <c:forEach var="mapping" items="${buyerMappingList}">
                                                                        <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                                    </c:forEach>
                                                                </select>

                                                            </div>
                                                        </div>

                                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div class="form-group"><br>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="workloadAssignmentReportbtnContract" value="Workload Report"/>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="blockandsimulatecontract" value="Block & Simulate"/>
                                                                <input type="button" class="btn btn-rounded btn-primary btn-sm" id="assigncontractbtn" value="Assign"/>
                                                                <a href="#" class="btn btn-primary btn-rounded btn-sm" id="contractFilter" title="Filter Worload Report" data-toggle="tooltip" data-placement="auto">
                                                                    <i class="fa fa-filter" aria-hidden="true"></i> Filter 
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="ContractMaterial-tab-justify" data-toggle="tab" href="#ContractMaterial-justify" role="tab" aria-controls="ContractMaterial" aria-selected="true">Material</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="ContractService-tab-justify" data-toggle="tab" href="#ContractService-justify" role="tab" aria-controls="ContractService" aria-selected="false">Service</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content">
                                                    <div class="tab-pane fade show active" id="ContractMaterial-justify" role="tabpanel" aria-labelledby="ContractMaterial-tab-justify">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <!--<div class="card">-->
                                                            <!--<h5 class="card-header bg-primary">Contract Line Report </h5>.-->
                                                            <div class="card-body">
                                                                <!--<div class="row">-->
                                                                <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-hover unassignedContractMaterialLine_table" id="unassignedContractMaterialLine_table" style="width: 100%">
                                                                        <thead class="">
                                                                            <tr class="">
                                                                                <th></th>
                                                                                <th>Co-Code</th>
                                                                                <th>Tender Number</th>
                                                                                <th>Tender Title</th>
                                                                                <th>Tender Raised By</th>
                                                                                <th>Total Amount</th>
                                                                                <th>Overdue</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="contract" items="${unAssignedContractList1}" varStatus="status">
                                                                                <c:if test="${contract.type == 'Material'}">
                                                                                    <tr>
                                                                                        <td><input type="checkbox" value="${contract.transactionID}"  class="contract-checkbox-class"></td>
                                                                                        <td>${contract.companyCode}</td>
                                                                                        <td>${contract.tenderNumber}</td>
                                                                                        <td>${contract.tenderTitle}</td>
                                                                                        <td>${contract.tenderRaisedBy}</td>
                                                                                        <td>${contract.total}</td>
                                                                                        <td>${contract.overDue}</td>

                                                                                    </tr>
                                                                                </c:if>
                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                    </div>

                                                    <div class="tab-pane fade show " id="ContractService-justify" role="tabpanel" aria-labelledby="ContractService-tab-justify">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <!--<div class="card">-->
                                                            <!--<h5 class="card-header bg-primary">Contract Line Report </h5>.-->
                                                            <div class="card-body">
                                                                <!--<div class="row">-->
                                                                <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-hover unassignedContractServiceLine_table" id="unassignedContractServiceLine_table" style="width: 100%">
                                                                        <thead class="">
                                                                            <tr class="">
                                                                                <th></th>
                                                                                <th>Co-Code</th>
                                                                                <th>Tender Number</th>
                                                                                <th>Tender Title</th>
                                                                                <th>Tender Raised By</th>
                                                                                <th>Total Amount</th>
                                                                                <th>Overdue</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="contract" items="${unAssignedContractList1}" varStatus="status">

                                                                                <c:if test="${contract.type == 'Service'}">
                                                                                    <tr>
                                                                                        <td><input type="checkbox" value="${contract.transactionID}"  class="contract-checkbox-class"></td>
                                                                                        <td>${contract.companyCode}</td>
                                                                                        <td>${contract.tenderNumber}</td>
                                                                                        <td>${contract.tenderTitle}</td>
                                                                                        <td>${contract.tenderRaisedBy}</td>
                                                                                        <td>${contract.total}</td>
                                                                                        <td>${contract.overDue}</td>

                                                                                    </tr>
                                                                                </c:if>

                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                            </div>
                                                            <!--</div>-->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="assignedContractLine-justify" role="tabpanel" aria-labelledby="assignedContractLine-justify">
                                                <form class="" method="post" action="reassigncontractline.do" id="reassigncontractlineform">
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                    <input type="hidden" value="" name="reassigncontractlineids" id="reassigncontractlineids">
                                                    <div class="row">
                                                        &emsp;
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                            <div class="form-group">
                                                                <label for="reassignContractBuyerId" class="">Buyer:</label>

                                                                <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassignContractBuyerId" name="reassignContractBuyerId">
                                                                    <option value=""></option>
                                                                    <c:forEach var="mapping" items="${buyerMappingList}">
                                                                        <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                                    </c:forEach>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div class="form-group"><br>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="reassignContractBtn" value="Re-Assign"/>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="workloadAssignmentReportbtnContract" value="Workload Report"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="AssignedContractMaterial-tab-justify" data-toggle="tab" href="#AssignedContractMaterial-justify" role="tab" aria-controls="AssignedContractMaterial" aria-selected="false">Material</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="AssignedContractService-tab-justify" data-toggle="tab" href="#AssignedContractService-justify" role="tab" aria-controls="AssignedContractService" aria-selected="true">Service</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content">
                                                    <div class="tab-pane fade show active" id="AssignedContractMaterial-justify" role="tabpanel" aria-labelledby="AssignedContractMaterial-tab-justify">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <!--<div class="card">-->
                                                            <!--<h5 class="card-header bg-primary">Contract Line Report</h5>-->
                                                            <div class="card-body">
                                                                <!--<div class="row">-->
                                                                <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-hover assignedContractMaterialLine_table" id="assignedContractMaterialLine_table" style="width: 100%">
                                                                        <thead class="">
                                                                            <tr class="">
                                                                                <th></th>
                                                                                <th>Buyer Name</th>
                                                                                <th>Co-Code</th>
                                                                                <th>Tender Number</th>
                                                                                <th>Tender Title</th>
                                                                                <th>Tender Raised By</th>
                                                                                <th>Total Amount</th>
                                                                                <th>Overdue</th>
                                                                                <th style="display:none;">Buyer ID</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="contract" items="${assignedContractList}" varStatus="status">
                                                                                <c:if test="${contract.type == 'Material'}">
                                                                                    <tr>

                                                                                        <td><input type="checkbox" value="${contract.transactionID}"  class="reassign-contract-checkbox-class"></td>
                                                                                        <td>${contract.buyerName}</td>
                                                                                        <td>${contract.companyCode}</td>
                                                                                        <td>${contract.tenderNumber}</td>
                                                                                        <td>${contract.tenderTitle}</td>
                                                                                        <td>${contract.tenderRaisedBy}</td>
                                                                                        <td>${contract.total}</td>
                                                                                        <td>${contract.overDue}</td>

                                                                                        <td style="display: none;" class="materialBuyerID">${contract.buyerID}</td>
                                                                                    </tr>
                                                                                </c:if>
                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <!--</div>-->
                                                                <!--</div>-->

                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div class="tab-pane fade show " id="AssignedContractService-justify" role="tabpanel" aria-labelledby="AssignedContractService-tab-justify">
                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <!--<div class="card">-->
                                                            <!--<h5 class="card-header bg-primary">Contract Line Report</h5>-->
                                                            <div class="card-body">
                                                                <!--<div class="row">-->
                                                                <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-hover assignedContractServiceLine_table" id="assignedContractServiceLine_table" style="width: 100%">
                                                                        <thead class="">
                                                                            <tr class="">
                                                                                <th></th>
                                                                                <th>Buyer Name</th>
                                                                                <th>Co-Code</th>
                                                                                <th>Tender Number</th>
                                                                                <th>Tender Title</th>
                                                                                <th>Tender Raised By</th>
                                                                                <th>Total Amount</th>
                                                                                <th>Overdue</th>
                                                                                <th style="display:none;">Buyer ID</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <c:forEach var="contract" items="${assignedContractList}" varStatus="status">
                                                                                <c:if test="${contract.type == 'Service'}">
                                                                                    <tr>

                                                                                        <td><input type="checkbox" value="${contract.transactionID}"  class="reassign-contract-checkbox-class"></td>
                                                                                        <td>${contract.buyerName}</td>
                                                                                        <td>${contract.companyCode}</td>
                                                                                        <td>${contract.tenderNumber}</td>
                                                                                        <td>${contract.tenderTitle}</td>
                                                                                        <td>${contract.tenderRaisedBy}</td>
                                                                                        <td>${contract.total}</td>
                                                                                        <td>${contract.overDue}</td>

                                                                                        <td style="display: none;" class="serviceBuyerID">${contract.buyerID}</td>
                                                                                    </tr>
                                                                                </c:if>
                                                                            </c:forEach>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <!--</div>-->
                                                                <!--</div>-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--abhishek--> 
                                            <div class="tab-pane fade" id="reassignContractrfq-justify" role="tabpanel" aria-labelledby="reassignContractrfq-tab-justify">
                                                <form class="" method="post" action="reassignContractrfq.do" id="reassignContractrfqform">
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                    <input type="hidden" value="" name="reassigncrfqids" id="reassigncrfqids">
                                                    <div class="row">
                                                        &emsp;
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                            <div class="form-group">
                                                                <label for="reassignRfqBuyerId" class="">Buyer:</label>

                                                                <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassigncRfqBuyerId" name="reassigncRfqBuyerId">
                                                                    <option value=""></option>
                                                                    <c:forEach var="mapping" items="${buyerMappingList}">
                                                                        <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                                    </c:forEach>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                            <div class="form-group"><br>
                                                                <input type="button" class=" btn-rounded btn btn-primary btn-sm" id="reassigncRfqBtn" value="Re-Assign"/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <!--<div class="card">-->
                                                        <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                        <div class="card-body">
                                                            <!--<div class="row">-->
                                                            <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                            <div class="table-responsive">
                                                                <table class="table table-bordered table-hover reassign-crfq-details-table" id="reassign-crfq-details-table" style="width:100%;">
                                                                    <thead class="">
                                                                        <tr class="">
                                                                            <th class="noExport">#</th>
                                                                            <th>RFQ Number</th>
                                                                            <th>RFQ Title</th>
                                                                            <th>RFQ Status</th>
                                                                            <th>RFQ Request Date</th>
                                                                            <th>Buyer Username</th>
                                                                            <th>Buyer Name</th>
                                                                            <th class="noExport" style="display: none;">BuyerId</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <c:forEach var="rfq" items="${allContractRfqList}" varStatus="status">
                                                                            <tr>
                                                                                <td align="center"><input type="checkbox" value="${rfq.rfqid}" class="reassign-crfq-checkbox-class"></td>
                                                                                <td>${rfq.rfqNumber}</td>
                                                                                <td>${rfq.RFQTitle}</td>
                                                                                <c:choose>
                                                                                    <c:when test="${rfq.rfqstatus == 'Pending'}">
                                                                                        <td><span class="badge-dot badge-brand mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                    </c:when>
                                                                                    <c:when test="${rfq.rfqstatus == 'Bid Submitted'}">
                                                                                        <td><span class="badge-dot badge-success mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                    </c:when>
                                                                                    <c:when test="${rfq.rfqstatus == 'On Hold'}">
                                                                                        <td><span class="badge-dot badge-danger mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                    </c:when>
                                                                                    <c:when test="${rfq.rfqstatus == 'Cancel'}">
                                                                                        <td><span class="badge-dot badge-secondary mr-1"></span> ${rfq.rfqstatus}</td>
                                                                                    </c:when>
                                                                                    <c:otherwise>
                                                                                        <td>${rfq.rfqstatus}</td>
                                                                                    </c:otherwise>    
                                                                                </c:choose>
                                                                                <td><fmt:formatDate value="${rfq.rfqRequestDate}" pattern="dd-MM-yyyy"></fmt:formatDate></td>
                                                                                <td>${rfq.ngBpBuyerdetailsId.username}</td>
                                                                                <td>${rfq.ngBpBuyerdetailsId.firstname} ${rfq.ngBpBuyerdetailsId.lastname}</td>
                                                                                <td style="display: none;">${rfq.ngBpBuyerdetailsId.id}</td>
                                                                            </tr>
                                                                        </c:forEach>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <!--abhishek-->
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
        <div class="modal fade" id="longTextModal" tabindex="-1" role="dialog" aria-labelledby="longTextLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="longTextLabel">Long Text</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="form-group longtext">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="contractFilterWorkLoadReportModal" tabindex="-1" role="dialog" aria-labelledby="contractFilterWorkLoadReportLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="contractFilterWorkLoadReportLabel">Filter Workload Report </h5><label> &nbsp;&nbsp;(Company Code: ${CompanyCode})</label>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <form id="contractFilterWorloadReportForm" class="" action="contractFilterWorkLoadReport.do" method="post" action="#">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label style="padding-left: 145px;">From</label>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label>To</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="" class="filter-label">Plant</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromPlantCodeContract" name="fromPlantCodeContract">
                                                <option value="0">Select</option>
                                                <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                <option value="6800">6800 -- NATSTEEL ESM</option>
                                                <option value="7000">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPlantCode" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toPlantCodeContract" name="toPlantCodeContract">
                                                <option value="0">Select</option>
                                                <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                <option value="6800">6800 -- NATSTEEL ESM</option>
                                                <option value="7000">All</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="" class="filter-label">SOW Number</label>
                                            <input type="text" class="form-control form-rounded filter-input-field" id="fromSOWNumberContract" name="fromSOWNumberContract">

                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPRNumber"  class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <input type="text" class="form-control form-rounded filter-input-field" id="toSOWNumberContract" name="toSOWNumberContract">

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="" class="filter-label">Purchase Group</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromPurchaseGroupContract" name="fromPurchaseGroupContract">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${purchaseGroupList}" varStatus="status">
                                                    <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPurchaseGroup" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toPurchaseGroupContract" name="toPurchaseGroupContract">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${purchaseGroupList}" varStatus="status">
                                                    <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="materialServiceContract" class="">Material/ Service: </label>
                                            <select  tabindex="1" class="custom-select" id="materialServiceContract" name="materialServiceContract">
                                                <option>Material</option>
                                                <option>Service</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="prContractTypeContract" class="">Type </label>
                                            <select  tabindex="1" class="custom-select" id="prContractTypeContract" name="prContractTypeContract">
                                                <option value="">Select</option>
                                                <option>PR</option>
                                                <option>Contract</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="contractRaisedBy" class="">Contract Raised By: </label>
                                            <input type="text" class="form-control form-rounded" id="contractRaisedBy" name="contractRaisedBy" placeholder="">

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="contractFilterWorkloadReportBtn">Filter</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="filterWorkLoadReportModal" tabindex="-1" role="dialog" aria-labelledby="filterWorkLoadReportLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterWorkLoadReportLabel">Filter Workload Report </h5><label> &nbsp;&nbsp;(Company Code: ${CompanyCode})</label>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <form id="filterWorloadReportForm" class="" action="filterWorkLoadReport.do" method="post" action="#">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <input type="hidden" name="trackingNumberIds" id="trackingNumberIds">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label style="padding-left: 145px;">From</label>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label>To</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPlantCode" class="filter-label">Plant</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromPlantCode" name="fromPlantCode">
                                                <option value="0">Select</option>
                                                <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                <option value="6800">6800 -- NATSTEEL ESM</option>
                                                <option value="7000">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPlantCode" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toPlantCode" name="toPlantCode">
                                                <option value="0">Select</option>
                                                <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                <option value="6800">6800 -- NATSTEEL ESM</option>
                                                <option value="7000">All</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPRNumber" class="filter-label">PR Number</label>
                                            <input type="text" class="form-control form-rounded filter-input-field" id="fromPRNumber" name="fromPRNumber">

                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPRNumber"  class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <input type="text" class="form-control form-rounded filter-input-field" id="toPRNumber" name="toPRNumber">

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPurchaseGroup" class="filter-label">Purchase Group</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromPurchaseGroup" name="fromPurchaseGroup">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${purchaseGroupList}" varStatus="status">
                                                    <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPurchaseGroup" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toPurchaseGroup" name="toPurchaseGroup">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${purchaseGroupList}" varStatus="status">
                                                    <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPRApprovedDate" class="filter-label">PR Approved Date</label>
                                            <div class="input-group date filter-input-field" id="fromPRApprovedDate_div" data-target-input="nearest">
                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="fromPRApprovedDate" name="fromPRApprovedDate" data-target="#fromPRApprovedDate_div" />
                                                <div class="input-group-append" data-target="#fromPRApprovedDate_div" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <div class="input-group date filter-input-field" id="toPRApprovedDate_div" data-target-input="nearest">
                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="toPRApprovedDate" name="toPRApprovedDate" data-target="#toPRApprovedDate_div" />
                                                <div class="input-group-append" data-target="#toPRApprovedDate_div" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromMaterialGroup" class="filter-label">Material Group</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromMaterialGroup" name="fromMaterialGroup">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${masterMaterialGroupList}" varStatus="status">
                                                    <option value="${group.materialGroupCode}">${group.materialGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toMaterialGroup" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toMaterialGroup" name="toMaterialGroup">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${masterMaterialGroupList}" varStatus="status">
                                                    <option value="${group.materialGroupCode}">${group.materialGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromMaterialClass" class="filter-label">Material Class</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromMaterialClass" name="fromMaterialClass">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toMaterialClass" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toMaterialClass" name="toMaterialClass">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="trackingNumber" class="">Tracking Number: </label>
                                            <select multiple id="trackingNumber" name="trackingNumber" class="selectpicker show-tick show-menu-arrow" title="Choose Tracking Number..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                <c:forEach var="dept" items="${masterDepartmentlist}" varStatus="status">
                                                    <option value="${dept.departmentCode}">${dept.departmentCode} - ${dept.departmentDesc}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="prRaisedBy" class="">PR Raised By: </label>
                                            <input type="text" class="form-control form-rounded" id="prRaisedBy" name="prRaisedBy" placeholder="">

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="type" class="">Type: </label>
                                            <select  tabindex="1" class="custom-select" id="type" name="type">
                                                <option value="">Select</option>
                                                <option value="NewPR">New PR</option>
                                                <option value="ExistingPR">Existing PR</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="materialService" class="">Material/ Service: </label>
                                            <select  tabindex="1" class="custom-select" id="material" name="material">
                                                <option>Material</option>
                                                <!--<option>Service</option>-->
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <!--<button type="button" class="btn btn-default" data-dismiss="modal" id="clearWorkloadFilter">Clear</button>-->
                        <button type="button" class="btn btn-primary" id="filterWorkloadReportBtn">Filter</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="modal fade" id="filterWorkLoadReportModalService" tabindex="-1" role="dialog" aria-labelledby="filterWorkLoadReportLabelService" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterWorkLoadReportLabelService">Filter Workload Report </h5><label> &nbsp;&nbsp;(Company Code: ${CompanyCode})</label>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <form id="filterWorloadReportFormService" class="" action="filterWorkLoadReportService.do" method="post" action="#">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <input type="hidden" name="trackingNumberIdsService" id="trackingNumberIdsService">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label style="padding-left: 145px;">From</label>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label>To</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPlantCodeservice" class="filter-label">Plant</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromPlantCodeService" name="fromPlantCodeService">
                                                <option value="0">Select</option>
                                                <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                <option value="6800">6800 -- NATSTEEL ESM</option>
                                                <option value="7000">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toPlantCodeService" name="toPlantCodeService">
                                                <option value="0">Select</option>
                                                <option value="6400">6400 -- NATSTEEL HOLDINGS</option>
                                                <option value="6410">6410 -- NATSTEEL RECYCLING</option>
                                                <option value="6420">6420 -- NATSTEEL TRADE</option>
                                                <option value="6800">6800 -- NATSTEEL ESM</option>
                                                <option value="7000">All</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPRNumberService" class="filter-label">PR Number</label>
                                            <input type="text" class="form-control form-rounded filter-input-field" id="fromPRNumberService" name="fromPRNumberService">

                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPRNumber"  class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <input type="text" class="form-control form-rounded filter-input-field" id="toPRNumberService" name="toPRNumberservice">

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPurchaseGroupService" class="filter-label">Purchase Group</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromPurchaseGroupService" name="fromPurchaseGroupService">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${purchaseGroupList}" varStatus="status">
                                                    <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toPurchaseGroup" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toPurchaseGroupService" name="toPurchaseGroupService">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${purchaseGroupList}" varStatus="status">
                                                    <option value="${group.purchasingGroupCode}">${group.purchasingGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromPRApprovedDateService" class="filter-label">PR Approved Date</label>
                                            <div class="input-group date filter-input-field" id="fromPRApprovedDateService_div" data-target-input="nearest">
                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="fromPRApprovedDateService" name="fromPRApprovedDateService" data-target="#fromPRApprovedDateService_div" />
                                                <div class="input-group-append" data-target="#fromPRApprovedDateService_div" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <div class="input-group date filter-input-field" id="toPRApprovedDateService_div" data-target-input="nearest">
                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="toPRApprovedDateService" name="toPRApprovedDateService" data-target="#toPRApprovedDateService_div" />
                                                <div class="input-group-append" data-target="#toPRApprovedDateService_div" data-toggle="datetimepicker">
                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromMaterialGroupService" class="filter-label">Material Group</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromMaterialGroupService" name="fromMaterialGroupService">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${masterMaterialGroupList}" varStatus="status">
                                                    <option value="${group.materialGroupCode}">${group.materialGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toMaterialGroup" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toMaterialGroupService" name="toMaterialGroupService">
                                                <option value="0">Select</option>
                                                <c:forEach var="group" items="${masterMaterialGroupList}" varStatus="status">
                                                    <option value="${group.materialGroupCode}">${group.materialGroupCode}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <label for="fromMaterialClassService" class="filter-label">Material Class</label>
                                            <select  tabindex="1" class="custom-select filter-input-field" id="fromMaterialClassService" name="fromMaterialClassService">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group filter-form-group">
                                            <!--<label for="toMaterialClass" class="filter-label"><font style="color: white;">ABC</font></label>-->
                                            <select  tabindex="1" class="custom-select filter-input-field" id="toMaterialClassService" name="toMaterialClassService">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="trackingNumberService" class="">Tracking Number: </label>
                                            <select multiple id="trackingNumberService" name="trackingNumberService" class="selectpicker show-tick show-menu-arrow" title="Choose Tracking Number..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%">
                                                <c:forEach var="dept" items="${masterDepartmentlist}" varStatus="status">
                                                    <option value="${dept.departmentCode}">${dept.departmentCode} - ${dept.departmentDesc}</option>
                                                </c:forEach>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="prRaisedByService" class="">PR Raised By: </label>
                                            <input type="text" class="form-control form-rounded" id="prRaisedByService" name="prRaisedByService" placeholder="">

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="type" class="">Type: </label>
                                            <select  tabindex="1" class="custom-select" id="typeService" name="typeService">
                                                <option value="">Select</option>
                                                <option value="NewPR">New PR</option>
                                                <option value="ExistingPR">Existing PR</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="Service" class="">Service: </label>
                                            <select  tabindex="1" class="custom-select" id="Service" name="Service">
                                                <!--<option>Material</option>-->
                                                <option>Service</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <!--<button type="button" class="btn btn-default" data-dismiss="modal" id="clearWorkloadFilter">Clear</button>-->
                        <button type="button" class="btn btn-primary" id="filterWorkloadReportBtnService">Filter</button>
                    </div>
                </div>

            </div>
        </div>

        <%--<sec:authorize access="hasRole('ROLE_BUYER')">--%>
        <div id="modalDivId">
            <div class="modal fade" id="updatePasswordAtFirst" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
                            <h4 class="modal-title">Please Update Your Password</h4>
                        </div>
                        <div class="modal-body">
                            <form id="updatePasswordForm" class="needs-validation"  method="post" action="updatepass.do" data-parsley-validate="" novalidate="">
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                <!--                                <div class="space"></div>-->
                                <input type="hidden" id="passconfig" name="passconfig" value="${passconfig}">    
                                <!--<div class="row">-->
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="password">Password:</label>
                                        <input type="password" class="form-control form-rounded" data-parsley-length="[8,20]" data-parsley-uppercase="1" data-parsley-lowercase="1" data-parsley-number="1" data-parsley-special="1" data-parsley-length-message="This length should be 8 to 20 characters long" id="password" name="password" autocomplete="new-password" required>
                                        <!--<p class="text-danger" id="p2"></p>-->
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="conformpassword" class="">Confirm Password:</label>
                                        <input type="password" class="form-control form-rounded" data-parsley-equalto="#password" data-parsley-length="[8,20]" data-parsley-uppercase="1" data-parsley-lowercase="1" data-parsley-number="1" data-parsley-special="1" data-parsley-length-message="This length should be 8 to 20 characters long"  id="confirmpassword" name="confirmpassword" required>
                                        <!--<p class="text-danger" id="p1"></p>-->
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="align-center text-align-center">
                                            <!--<button class="btn btn-outline-primary btn-rounded ">Update</button>-->
                                            <input type="submit" class="btn btn-outline-primary btn-rounded" id="updatePasswordSubmitBtn" value="Update">
                                        </div>
                                    </div>
                                </div>
                        </div>
                        </form>
                    </div>
                    <!--                            <div class="modal-footer">
                                                    <button type="submit" value="Create" id="updatePasswordSubmitBtn" class="btn btn-primary">Submit</button>
                                                    <input type="submit" class="btn btn-outline-primary btn-rounded" id="updatepassword" value="Update">
                                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                </div>-->
                </div>

            </div>
        </div>

        <div class="modal fade" id="buyerPRAndContractCountModal" tabindex="-1" role="dialog" aria-labelledby="buyerPRAndContractCountModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="buyerPRAndContractCountModalLabel">Buyers</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!--<div class="container-fluid">-->
                        <!--<div class="card-body">-->
                        <div id="ROLE_TEAM_LEAD_DEFAULT_CARD">
                            <div class="row">
                                <c:forEach var="mapping" items="${buyerMappingList}" varStatus="status">
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <c:if test="${status.count%2!=0}">
                                            <div class="card bg-user-beach1 dashboard-user-card" id="buyer_count_card_${mapping.ngBpBuyerdetailsId.id}">
                                                <div class="card-body">
                                                    <div class="d-inline-block">
                                                        <h2 class="text-white" style="font-size: 15px;">${mapping.ngBpBuyerdetailsId.firstname}</h2>
                                                        <h3><a href="#" title="Assigned PR Count" class="text-white" id="buyer_assigned_pr_count_${mapping.ngBpBuyerdetailsId.id}" data-toggle="tooltip" data-placement="auto">${prCountList[status.index]}</a></h3>
                                                    </div>

                                                </div>
                                            </div>
                                        </c:if>
                                        <c:if test="${status.count%2==0}">
                                            <div class="card bg-user-beach2 dashboard-user-card" id="buyer_count_card_${mapping.ngBpBuyerdetailsId.id}">
                                                <div class="card-body">
                                                    <div class="d-inline-block">
                                                        <h2 class="text-white" style="font-size: 15px;">${mapping.ngBpBuyerdetailsId.firstname}</h2>
                                                        <h3><a href="#" title="Assigned PR Count" class="text-white" id="buyer_assigned_pr_count_${mapping.ngBpBuyerdetailsId.id}" data-toggle="tooltip" data-placement="auto">${prCountList[status.index]}</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:if>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>

                        <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="assignPRModalBtn">Assign</button>
                        <button type="button" class="btn btn-primary" id="assignContractModalBtn">Assign</button>
                    </div>
                </div>
            </div>
        </div>         

        <div class="modal fade" id="workloadAssignmentReportModal" tabindex="-1" role="dialog" aria-labelledby="workloadAssignmentReportModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="workloadAssignmentReportModalLabel">Workload Assignment Report</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!--<div class="container-fluid">-->
                        <!--<div class="card-body">-->

                        <%--<sec:authorize access="hasRole('ROLE_TEAM_LEAD')">--%>
                        <div id="ROLE_TEAM_LEAD_DEFAULT_CARD">
                            <div class="row">
                                <c:forEach var="mapping" items="${buyerMappingList}" varStatus="status">
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <c:if test="${status.count%2!=0}">
                                            <div class="card bg-user-beach1 dashboard-user-card">
                                                <div class="card-body">
                                                    <div class="d-inline-block">
                                                        <h2 class="text-white" style="font-size: 15px;">${mapping.ngBpBuyerdetailsId.firstname}</h2>
                                                        <h3><a href="#" title="Assigned PR Count" class="text-white" data-toggle="tooltip" data-placement="auto">${prCountList[status.index]}</a></h3>
                                                    </div>

                                                </div>
                                            </div>
                                        </c:if>
                                        <c:if test="${status.count%2==0}">
                                            <div class="card bg-user-beach2 dashboard-user-card">
                                                <div class="card-body">
                                                    <div class="d-inline-block">
                                                        <h2 class="text-white" style="font-size: 15px;">${mapping.ngBpBuyerdetailsId.firstname}</h2>
                                                        <h3><a href="#" title="Assigned PR Count" class="text-white" data-toggle="tooltip" data-placement="auto">${prCountList[status.index]}</a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:if>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                        <%--</sec:authorize>--%>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>                        
        <div class="modal fade" id="newWorkloadAssignmentReportModal" tabindex="-1" role="dialog" aria-labelledby="newWorkloadAssignmentReportModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newWorkloadAssignmentReportModalLabel">Workload Assignment Report</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover newWorkloadAssignmentReportModalTable" id="newWorkloadAssignmentReportModalTable" style="width:100%;">
                                <thead>                                    
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
