<%-- 
    Document   : createrfp
    Created on : 8 Jan, 2019, 3:07:01 PM
    Author     : admin
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
        <!--<link rel="stylesheet" href="assets/vendor/charts/chartist-bundle/chartist.css">-->
        <!--<link rel="stylesheet" href="assets/vendor/charts/morris-bundle/morris.css">-->
        <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
        <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">

        <!--        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard.min.css">
                <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_arrows.min.css">
                <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_circles.min.css">
                <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_dots.min.css">-->

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />


        <link rel="stylesheet" href="assets/css/custom.css">

        <!--<link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/jquery.dataTables.min.css">-->
        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">

        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/buttons.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/select.bootstrap4.css">
        <link rel="stylesheet" type="text/css" href="assets/vendor/datatables/css/fixedHeader.bootstrap4.css">
        <link rel="stylesheet" href="assets/css/loader.css">

        <style>
            #myTab7{
                width: 25%;
            }
            .reject-pr-btn {
                padding: 2px 6px;
            }
            .query-pr-btn {
                padding: 2px 6px;
            }
            /*            .btn {
                            cursor: pointer;
                            height: 10px;
                            margin-top: 10px;
                            margin-left: 10px;
                            padding-bottom: 30px; 
                        }
                        div.dataTables_wrapper div.dataTables_filter input{
                            margin-top: 10px;
                            margin-right: 10px;
                        }*/
            .tab-regular .nav-tabs .nav-link.active {
                background-color: #25d5f2!important;
                color: white!important;
            }
            .tab-regular .nav-tabs .nav-link {
                background-color: gray!important;
                color: white!important;
            }
        </style>
        <title>View PR/ Contract Status</title>
    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>


            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content">

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>
                        
                        <input type="hidden" name="ViewPrDoc_IP" id="ViewPrDoc_IP" value="${ViewPrDoc_IP}">
                        <input type="hidden" id="RejectStatus" name="RejectStatus" value="${RejectStatus}">
                        <input type="hidden" id="QueryStatus" name="QueryStatus" value="${QueryStatus}">

                        <form id="pendingPrtoPoForm" method="post" action="createpo.do">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                            <input type="hidden" name="prids" id="prids">
                            <input type="hidden" name="reqFrom" id="reqFrom">
                        </form>

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header" id="pageheader">
                                    <h2 class="pageheader-title">View PR/ Contract Status</h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item">View PR/ Contract Status</li>
                                                <li class="breadcrumb-item" aria-current="page">PR Lines/ Contract Assigned to Me</li>
                                                <li class="breadcrumb-item active" aria-current="page">Pending PR Lines/ Contract</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
                                <div class="tab-regular">
                                    <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active update-backgroud-color" id="pendingPR-tab-justify" data-toggle="tab" href="#pendingPR-justify" role="tab" aria-controls="pendingPR" aria-selected="true">Pending PR</a>
                                        </li>
                                        <!--      abhishek--->
                                        <li class="nav-item">
                                                                                                                            <a class="nav-link" id="contractPR-tab-justify" data-toggle="tab" href="#contractPR-justify" role="tab" aria-controls="contractPR" aria-selected="false">Pending Contract</a>
                                                                                                                        </li>
                                                                                                                        <!--abhishek-->
                                    </ul>
                                    <div class="tab-content update-backgroud-color">
                                        <div class="tab-pane fade show active" id="pendingPR-justify" role="tabpanel" aria-labelledby="pendingPR-tab-justify">

                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <!--<div class="card">-->
                                                    <!--                                                        <div class="card-header bg-primary">
                                                                                                                Pending PR Lines
                                                                                                            </div>-->
                                                    <div class="card-body">
                                                        <!--<div class="row">-->
                                                        <!--<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-align-right">-->
                                                        <input id="createrfq" type="button" value="Create RFQ" class="btn btn-outline-success btn-sm button-ht hidden" style="float:right;"/>
                                                        <input id="createpo" type="button" value="Create PO" class="btn btn-outline-success btn-sm button-ht hidden" style="float:right;"/>
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                        <br>
                                                        <div class="tab-regular">
                                                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                                <li class="nav-item">
                                                                    <a class="nav-link active update-backgroud-color" id="PRMaterial-tab-justify" data-toggle="tab" href="#PRMaterial-justify" role="tab" aria-controls="PRMaterial" aria-selected="false">Material</a>
                                                                </li>

                                                                <li class="nav-item">
                                                                    <a class="nav-link update-backgroud-color" id="PRService-tab-justify" data-toggle="tab" href="#PRService-justify" role="tab" aria-controls="PRService" aria-selected="true">Service</a>
                                                                </li>

                                                            </ul>
                                                            <div class="tab-content update-backgroud-color">
                                                                <div class="tab-pane fade show" id="PRService-justify" role="tabpanel" aria-labelledby="PRService-tab-justify">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-striped pending-prlines" id="pending_prlines_table" style="width:100%;">
                                                                                <thead class="">
                                                                                    <tr>
                                                                                        <th class="noExport" scope="col">
                                                                                            <!--<input type="checkbox" class="pending_service_prlines" title="Select All"/>-->
                                                                                        </th>
                                                                                        <th class="" scope="col">PR No. </th>
                                                                                        <th class="" scope="col">PR Item No. </th>
                                                                                        <th class="" scope="col"></th>
                                                                                        <th class="" scope="col">Quantity </th>                                                                                        
                                                                                        <th class="" scope="col">Dept. Desc.</th>
                                                                                        <th class="" scope="col">Co-Code</th>
                                                                                        <th class="" scope="col">Req. Number/ Required By </th>
                                                                                        <th class="" scope="col">Approved By/ Date</th>
                                                                                        <th class="" scope="col">Req’d Date/ Buyer</th>
                                                                                        <th class="" scope="col">Item Code/ Old Mat. No/ Description </th>
                                                                                        <th class="noExport" scope="col">PO Text </th>
                                                                                        <!--<th style="display: none;">Long Text </th>-->
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
                                                                                        <th class="noExport"></th>
                                                                                        <th class="noExport"></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <c:forEach var="pr" items="${buyerPendingServicePRList}" varStatus="status">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <input type="checkbox" class="select-material-pr-line" value="${pr.insertionOrderId}">
                                                                                                <input type="hidden" class="prtype" name="prtype" value="Service">
                                                                                                <input type="hidden" class="procInstId" value="${pr.pID}">
                                                                                                <input type="hidden" class="linkIdClass" value="${pr.linkId}">
                                                                                                <input type="hidden" class="prCreator" value="${pr.pRCreator}">
                                                                                                <input type="hidden" class="prCreatorEmailId" value="${pr.prCreatorEmailId}">
                                                                                                <input type="hidden" class="prQuantity" value="${pr.pRQuantity}">
                                                                                                <input type="hidden" class="remainingQuantity" value="${pr.remainingQuantity}">
                                                                                                <input type="hidden" class="companyCode" value="${pr.companyCode}">
                                                                                                <input type="hidden" class="plantCode" value="${pr.plantCode}">
                                                                                            </td> 
                                                                                            <td align="center">${pr.pRNumber}</td>
                                                                                            <td style='text-align: center'><fmt:formatNumber type="number" value="${pr.itemNumber}"/></td>
                                                                                            <td><a href="#" title="View PR Doc" class="viewPrDoc"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></a> <a href="#" title="View PR Line Item Doc" class="viewPrLineItemDoc"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></a></td>
                                                                                            <td style="text-align: center;"><fmt:formatNumber type="number" minFractionDigits="3" value="${pr.remainingQuantity}"/></td>                                                                                            
                                                                                            <td>${pr.departmentDescription}</td>
                                                                                            <td>${pr.companyCode}</td>
                                                                                            <td>${pr.purchaseRequestNumber} / ${pr.initiatorId}</td>
                                                                                            <td>${pr.approverName} / ${pr.approvedDate}</td>
                                                                                            <td>${pr.requisitionDate} / </td>
                                                                                            <td>${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                            <td>${pr.poText}</td>
                                                                                            <td>${pr.itemText}</td>
                                                                                            <td>${pr.uoM}</td>
                                                                                            <td>${pr.pRQuantity} / </td>
                                                                                            <td>${pr.localPurchase}</td>
                                                                                            <td>${pr.leadTime} / ${pr.storageLocation}</td>
                                                                                            <td>/</td>
                                                                                            <td>${pr.overDue}</td>
                                                                                            <td></td>
                                                                                            <td>${pr.priceUnit} / ${pr.currency}</td>
                                                                                            <td></td>
                                                                                            <td>${pr.headerNote}</td>
                                                                                            <td>${pr.itemNote}</td>
                                                                                            <td>${pr.miqaMaterial}</td>
                                                                                            <td>${pr.pID}</td>
                                                                                            <td><input type="button" value="Reject" class="btn btn-outline-primary btn-sm reject-pr-btn button-ht" id="reject_pr_btn${status.count}"/></td>
                                                                                            <td><input type="button" value="Query" class="btn btn-outline-primary btn-sm query-pr-btn button-ht" id="query_pr_btn${status.count}"/></td>
                                                                                        </tr>
                                                                                    </c:forEach>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade show active" id="PRMaterial-justify" role="tabpanel" aria-labelledby="PRMaterial-tab-justify">
                                                                    <!--<b8>Material</h8-->
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-striped pending-prmateriallines" id="pending_prmateriallines_table">
                                                                                <thead class="">
                                                                                    <tr>
                                                                                        <th class="noExport" scope="col">
                                                                                            <!--<input type="checkbox" class="pending_service_prlines" title="Select All"/>-->
                                                                                        </th>
                                                                                        <th class="" scope="col">PR No. </th>
                                                                                        <th class="" scope="col">PR Item No. </th>
                                                                                        <th class="" scope="col" style="display: none;"></th>
                                                                                        <th class="" scope="col">Quantity </th>
                                                                                        <th class="" scope="col">Dept. Desc.</th>
                                                                                        <th class="" scope="col">Co-Code</th>
                                                                                        <th class="" scope="col">Req. Number/ Required By </th>
                                                                                        <th class="" scope="col">Approved By/ Date</th>
                                                                                        <th class="" scope="col">Req’d Date/ Buyer</th>
                                                                                        <th class="" scope="col">Item Code/ Old Mat. No/ Description </th>
                                                                                        <th class="noExport" scope="col">PO Text </th>
                                                                                        <!--<th style="display: none;">Long Text </th>-->
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
                                                                                        <th class="noExport"></th>
                                                                                        <th class="noExport"></th>

                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <c:forEach var="pr" items="${buyerPendingMaterialPRList}" varStatus="status">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <input type="checkbox" class="select-material-pr-line" value="${pr.insertionOrderId}">
                                                                                                <input type="hidden" class="prtype" name="prtype" value="Material">
                                                                                                <input type="hidden" class="procInstId" value="${pr.pID}">
                                                                                                <input type="hidden" class="linkIdClass" value="${pr.linkId}">
                                                                                                <input type="hidden" class="prCreator" value="${pr.pRCreator}">
                                                                                                <input type="hidden" class="prCreatorEmailId" value="${pr.prCreatorEmailId}">
                                                                                                <input type="hidden" class="prQuantity" value="${pr.pRQuantity}">
                                                                                                <input type="hidden" class="remainingQuantity" value="${pr.remainingQuantity}">
                                                                                                <input type="hidden" class="companyCode" value="${pr.companyCode}">
                                                                                                <input type="hidden" class="plantCode" value="${pr.plantCode}">
                                                                                            </td> 
                                                                                            <td align="center">${pr.pRNumber}</td>
                                                                                            <td style='text-align: center'><fmt:formatNumber type="number" value="${pr.itemNumber}"/></td>
                                                                                            <td style="display: none;"></td>
                                                                                            <td style="text-align: center;"><fmt:formatNumber type="number" minFractionDigits="3" value="${pr.remainingQuantity}"/></td>
                                                                                            <td>${pr.departmentDescription}</td>
                                                                                            <td>${pr.companyCode}</td>
                                                                                            <td>${pr.purchaseRequestNumber} / ${pr.initiatorId}</td>
                                                                                            <td>${pr.approverName} / ${pr.approvedDate}</td>
                                                                                            <td>${pr.requisitionDate} / </td>
                                                                                            <td>${pr.materialCode} / ${pr.oldMaterialCode} / ${pr.shortText}</td>
                                                                                            <td>${pr.poText}</td>
                                                                                            <td>${pr.itemText}</td>
                                                                                            <td>${pr.uoM}</td>
                                                                                            <td>${pr.pRQuantity} / </td>
                                                                                            <td>${pr.localPurchase}</td>
                                                                                            <td>${pr.leadTime} / ${pr.storageLocation}</td>
                                                                                            <td>/</td>
                                                                                            <td>${pr.overDue}</td>
                                                                                            <td></td>
                                                                                            <td>${pr.priceUnit} / ${pr.currency}</td>
                                                                                            <td></td>
                                                                                            <td>${pr.headerNote}</td>
                                                                                            <td>${pr.itemNote}</td>
                                                                                            <td>${pr.miqaMaterial}</td>
                                                                                            <td>${pr.pID}</td>
                                                                                            <td><input type="button" value="Reject" class="btn btn-outline-primary btn-sm reject-pr-btn button-ht" id="reject_pr_btn${status.count}"/></td>
                                                                                            <td><input type="button" value="Query" class="btn btn-outline-primary btn-sm query-pr-btn button-ht" id="query_pr_btn${status.count}"/></td>
                                                                                        </tr>
                                                                                    </c:forEach>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                        </div>

                                                        <!--                                                            <div class="table-responsive">
                                                                                                                       
                                                                                                                    </div>-->
                                                    </div>
                                                    <!--</div>-->
                                                </div>
                                            </div>


                                        </div>
                                        <div class="tab-pane fade" id="contractPR-justify" role="tabpanel" aria-labelledby="contractPR-tab-justify">

                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <!--<div class="card">-->
                                                    <!--                                                        <div class="card-header bg-primary">
                                                                                                                Pending Contract Lines
                                                                                                            </div>-->
                                                    <div class="card-body">
                                                        <!--<div class="row">-->
                                                        <!--<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-align-right">-->
                                                        <input id="createcontractrfq" type="button" value="Create RFQ" class="btn btn-outline-success btn-rounded btn-sm button-ht hidden" style="float: right;"/>
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                        <br>

                                                        <div class="tab-regular">
                                                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                                <li class="nav-item">
                                                                    <a class="nav-link active" id="Material-tab-justify" data-toggle="tab" href="#Material-justify" role="tab" aria-controls="Material" aria-selected="false">Material</a>
                                                                </li>
                                                                <li class="nav-item">
                                                                    <a class="nav-link " id="Service-tab-justify" data-toggle="tab" href="#Service-justify" role="tab" aria-controls="Service" aria-selected="true">Service</a>
                                                                </li>

                                                                
                                                            </ul>
<!--abhishek-->
                                                   <div class="tab-content">
                                                                

                                                                <div class="tab-pane fade show active" id="Material-justify" role="tabpanel" aria-labelledby="Material-tab-justify">
                                                                    <div class="card-body">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-hover pendingMaterialContractLine-details" id="pendingMaterialContractLine_pr_details" style="width: 100%">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                         <th class="noExport"><input type="checkbox" class="pending_service_contractlines" title="Select All"/></th>
                                                                                    <th>Tender Number</th>
                                                                                    <th>Company</th>
                                                                                    <th>Tender Title</th>
                                                                                    <th>Tender Requested By</th>

                                                                                    <th>Requested On</th>
                                                                                    <th>LC Amount</th>
                                                                                    <th>OverDue</th>
                                                                                    <th></th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="contract" items="${buyerPendingMaterialContractList}" varStatus="status">
<tr>
                                                                                        <td><input type="checkbox" class="select-material-contract-line" value="${contract.transactionID}">
                                                                                            <input type="hidden" class="contract-type" value="Material">
                                                                                            <input type="hidden" class="procInstId" value="${contract.transactionID}">
                                                                                             <input type="hidden" class="companyCode" value="${contract.companyCode}">
<!--                                                                                                <input type="hidden" class="materialGrp" value="">-->
                                                                                        </td>
                                                                                        <td><a href="createcontract.do?contractRefId=${contract.transactionID}&reqType=Material">${contract.tenderNumber}</a></td>
                                                                                       
                                                                                        <td>${contract.companyCode}</td>
                                                                                        <td>${contract.tenderTitle}</td>
                                                                                        <td>${contract.tenderCreatedBy}</td>

                                                                                        <td>${contract.tenderCreatedOn}</td>
                                                                                        <td>${contract.oLAAmount}</td>
                                                                                         <td>${contract.overDue}</td>
                                                                                        
                                                                                         
                    
                                                                                        <td><input type="button" value="Reject" class="btn btn-outline-primary btn-rounded btn-sm reject-contract-btn button-ht" id="reject_contract_btn${status.count}"/></td>
                                                                                        <td><input type="button" value="Query" class="btn btn-outline-primary btn-rounded btn-sm query-contract-btn button-ht" id="query_contract_btn${status.count}"/></td>
                                                                                    </tr>


                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                                <div class="tab-pane fade show " id="Service-justify" role="tabpanel" aria-labelledby="Service-tab-justify">
                                                                   <div class="card-body">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-hover pendingContractLine-details" id="pendingContractLine_pr_details" style="width: 100%">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExport"><input type="checkbox" class="pending_service_contractlines" title="Select All"/></th>
                                                                                    <th>Tender Number</th>
                                                                                    <th>Company</th>
                                                                                    <th>Tender Title</th>
                                                                                    <th>Tender Requested By</th>

                                                                                    <th>Requested On</th>
                                                                                    <th>LC Amount</th>
                                                                                    <th>OverDue</th>
                                                                                    <th></th>
                                                                                    
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="contract" items="${buyerPendingServiceContractList}" varStatus="status">


                                                                                    <td><input type="checkbox" class="select-material-contract-line" value="${contract.transactionID}">
                                                                                            <input type="hidden" class="contract-type" value="Material">
                                                                                            <input type="hidden" class="procInstId" value="${contract.transactionID}">
                                                                                             <input type="hidden" class="companyCode" value="${contract.companyCode}">
<!--                                                                                                <input type="hidden" class="materialGrp" value="">-->
                                                                                        </td>
                                                                                        <td><a href="createcontract.do?contractRefId=${contract.transactionID}&reqType=Material">${contract.tenderNumber}</a></td>
                                                                                       
                                                                                        <td>${contract.companyCode}</td>
                                                                                        <td>${contract.tenderTitle}</td>
                                                                                        <td>${contract.tenderCreatedBy}</td>

                                                                                        <td>${contract.tenderCreatedOn}</td>
                                                                                        <td>${contract.oLAAmount}</td>
                                                                                         <td>${contract.overDue}</td>

                    
                                                                                        <td><input type="button" value="Reject" class="btn btn-outline-primary btn-rounded btn-sm reject-contract-btn button-ht" id="reject_contract_btn${status.count}"/></td>
                                                                                        <td><input type="button" value="Query" class="btn btn-outline-primary btn-rounded btn-sm query-contract-btn button-ht" id="query_contract_btn${status.count}"/></td>
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
                                                    <!--</div>-->
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
                                                    Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
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
                <div class="modal fade" id="rejectprlinemodal" tabindex="-1" role="dialog" aria-labelledby="rejectprlineLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="rejectprlineLabel">Reject PR Line</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <form action="rejectpr.do" method="post" id="rejectprform">
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="rejectreason" class="">Reject Reason: </label>
                                                    <select class="custom-select" id="rejectreason" name="rejectreason">
                                                        <option>Select</option>
                                                        <c:forEach var="reason" items="${ReasonList}">
                                                            <option>${reason.reason}</option>
                                                        </c:forEach>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="rejectto" class="">Reject To: </label>
                                                    <input type="text" class="form-control rounded" id="rejectto" name="rejectto" readonly="true">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="rejectcomments" class="">Comments: </label>
                                                    <input type="text" class="form-control rounded" id="rejectcomments" name="rejectcomments">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="rejectprdoc" class="">Reject PR Document: </label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="rejectprdoc" id="rejectprdoc" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                    </label>    
                                                </div>
                                            </div>
                                        </div>
                                        <input type="hidden"  id="wiNumber" name="wiNumber">
                                        <input type="hidden"  id="linkId" name="linkId">
                                        <input type="hidden" id="prNumber" name="prNumber">
                                        <input type="hidden" id="prCreatorEmailId" name="prCreatorEmailId">
                                    </form>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default button-ht" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary button-ht" id="rejectprlinemodaltn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="queryprlinemodal" tabindex="-1" role="dialog" aria-labelledby="queryprlineLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="queryprlineLabel">Query PR Line</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <form action="querypr.do" method="post" id="queryprform">
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="queryreason" class="">Query Reason: </label>
                                                    <select class="custom-select" id="queryreason" name="queryreason">
                                                        <option>Select</option>
                                                        <c:forEach var="reason" items="${QueryReasonList}">
                                                            <option>${reason.reason}</option>
                                                        </c:forEach>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="queryraisedto" class="">Query Raised To: </label>
                                                    <select id="queryraisedto" name="queryraisedto" class="custom-select">
                                                        <option>Select</option>
                                                        <c:forEach var="userName" items="${QueryUserNameList}">
                                                            <option>${userName.userName}</option>
                                                        </c:forEach>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="querymailaddress" class="">Query Mail Address: </label>
                                                    <input type="text" class="form-control rounded" id="querymailaddress" name="querymailaddress" readonly="true">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="querycomment" class="">Comments: </label>
                                                    <textarea class="form-control rounded" id="querycomment" name="querycomment" style="height:100px;"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="queryprdoc" class="">Query PR Document: </label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="queryprdoc" id="queryprdoc" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                    </label>    
                                                </div>
                                            </div>
                                        </div>
                                        <input type="hidden" id="qwiNumber" name="qwiNumber">
                                        <input type="hidden" id="qlinkId" name="qlinkId">
                                        <input type="hidden" id="qPrNumber" name="qPrNumber">
                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default button-ht" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary button-ht" id="queryprlinemodaltn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="rejectcontractmodal" tabindex="-1" role="dialog" aria-labelledby="rejectcontractLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="rejectcontractLabel">Reject Contract Line</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">

                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rejectreason" class="">Reject Reason: </label>
                                                <select class="custom-select" id="rejectreason" name="rejectreason">
                                                    <option>Select</option>
                                                    <c:forEach var="reason" items="${ReasonList}">
                                                        <option>${reason.reason}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rejectto" class="">Reject To: </label>
                                                <input type="text" class="form-control rounded" id="rejectto" name="rejectto" readonly>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="rejectprdoc" class="">Reject Contract Lines: </label>
                                                <label class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="rejectprdoc" id="rejectprdoc" class="custom-control-input"><span class="custom-control-label" required=""></span>
                                                </label>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default button-ht" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary button-ht" id="rejectprlinemodaltn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
           <!--abhishek-->
           
               <div class="modal fade" id="querycontractmodal" tabindex="-1" role="dialog" aria-labelledby="querycontractLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="querycontractLabel">Query Contract Line</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                      <form action="querycontract.do" method="post" id="querycontractform">
                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                    <div class="row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group">
                                                <label for="queryreasoncontract" class="">Query Reason: </label>
                                                <select class="custom-select" id="queryreasoncontract" name="queryreasoncontract">
                                                    <option>Select</option>
                                                    <c:forEach var="reason" items="${ReasonList}">
                                                        <option>${reason.reason}</option>
                                                    </c:forEach>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                   <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="queryraisedtocontract" class="">Query Raised To: </label>
                                                    <select id="queryraisedtocontract" name="queryraisedtocontract" class="custom-select">
                                                        <option>Select</option>
                                                        <c:forEach var="userName" items="${QueryUserNameList}">
                                                            <option value="${userName.userName}">${userName.personalName}</option>
                                                        </c:forEach>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="querymailaddresscontract" class="">Query Mail Address: </label>
                                                    <input type="text" class="form-control rounded" id="querymailaddresscontract" name="querymailaddresscontract">
                                                </div>
                                            </div>
                                    </div>
                                    <input type="hidden" id="qwiNumberContract" name="qwiNumberContract">
                                    </form>
                                </div>
                            </div>
                                    
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default button-ht" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary button-ht" id="queryconlinemodaltn">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
           
           <!--abhishek-->
           
           
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
                                    <!--${pr.longtext}-->
                                    <!--<input type="text" id="longtext" name="longtext">-->
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
            <!--<script src="assets/vendor/charts/chartist-bundle/chartist.min.js"></script>-->
            <!--sparkline js--> 
            <script src="assets/vendor/charts/sparkline/jquery.sparkline.js"></script>
            <!--morris js--> 
            <script src="assets/vendor/charts/morris-bundle/raphael.min.js"></script>
            <!--<script src="assets/vendor/charts/morris-bundle/morris.js"></script>-->
            <!--chart c3 js--> 
            <script src="assets/vendor/charts/c3charts/c3.min.js"></script>
            <script src="assets/vendor/charts/c3charts/d3-5.4.0.min.js"></script>
            <script src="assets/vendor/charts/c3charts/C3chartjs.js"></script>
            <!--<script src="assets/libs/js/dashboard-ecommerce.js"></script>-->

            <script src="assets/step-wizard/js/popper.min.js"></script>
            <script src="assets/step-wizard/js/jquery.smartWizard.min.js"></script>
            <script src="assets/step-wizard/js/custom-js.js"></script>

            <!--<script src="assets/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>-->

            <script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>

            <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
            <!--<script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>-->
            <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>

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

            <script src="assets/js/pr.js"></script>
            <script src="assets/js/contract.js"></script>
            
            <script>
                $(document).ready(function() {
                    $(".selectpicker").selectpicker();
                    $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

                    if ($("#RejectStatus").val() === "0")
                    {
                        console.log("Reject Status: " + $("#RejectStatus").val());
                        Lobibox.alert("success", {
                            msg: 'PR has been rejected successfully.'
                        });
                    }
                    else if ($("#RejectStatus").val() !== "0" && $("#RejectStatus").val() !== "")
                    {
                        Lobibox.alert("error", {
                            msg: 'PR rejection has been failed, try again!'
                        });
                    }

                    if ($("#QueryStatus").val() === "0")
                    {
                        console.log("Query Status: " + $("#QueryStatus").val());
                        Lobibox.alert("success", {
                            msg: 'Query has been sent successfully.'
                        });
                    }
                    else if ($("#QueryStatus").val() !== "0" && $("#QueryStatus").val() !== "")
                    {
                        Lobibox.alert("error", {
                            msg: 'Query has not been sent successfully, try again!'
                        });
                    }
                });
            </script>

    </body>
</html>
