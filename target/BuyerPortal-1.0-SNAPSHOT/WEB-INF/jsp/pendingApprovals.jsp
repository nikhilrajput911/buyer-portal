<%-- 
    Document   : pendingApprovals.jsp
    Created on : 6 Jul, 2020, 4:08:34 PM
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


        <title>View PR/ Contract Status</title>
        <style>
            #myTab7{
                width: 25%;
            }
            tr{
                /*height: 10px;*/
            }
            .query-contract-btn {
                padding: 2px 6px;
            }
            .reject-contract-btn
            {
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
                    <div class="container-fluid dashboard-content">

                        <div id="overlay">
                            <div id="loader"></div>
                        </div>
                        <input type="hidden" id="RejectStatus" name="RejectStatus" value="${RejectStatus}">
                        <input type="hidden" id="QueryStatus" name="QueryStatus" value="${QueryStatus}">

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
                                            <a class="nav-link active" id="pendingPR-tab-justify" data-toggle="tab" href="#pendingPR-justify" role="tab" aria-controls="pendingPR" aria-selected="true">Pending PR</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link " id="contractPR-tab-justify" data-toggle="tab" href="#contractPR-justify" role="tab" aria-controls="contractPR" aria-selected="true">Pending Contract</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
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
                                                        <input id="createrfq" type="button" value="Create RFQ" class="btn btn-outline-success btn-rounded btn-sm button-ht hidden" style="float:right;"/>
                                                        <input id="createpo" type="button" value="Create PO" class="btn btn-outline-success btn-rounded btn-sm button-ht hidden" style="float:right;"/>
                                                        <!--</div>-->
                                                        <!--</div>-->
                                                        <br>
                                                        <div class="tab-regular">
                                                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                                <li class="nav-item">
                                                                    <a class="nav-link active" id="PRMaterial-tab-justify" data-toggle="tab" href="#PRMaterial-justify" role="tab" aria-controls="PRMaterial" aria-selected="false">Material</a>
                                                                </li>

                                                                <li class="nav-item">
                                                                    <a class="nav-link" id="PRService-tab-justify" data-toggle="tab" href="#PRService-justify" role="tab" aria-controls="PRService" aria-selected="true">Service</a>
                                                                </li>

                                                            </ul>
                                                            <div class="tab-content">
                                                                <div class="tab-pane fade show" id="PRService-justify" role="tabpanel" aria-labelledby="PRService-tab-justify">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered pending-prlines" id="pending_prlines_table" style="width:100%;">
                                                                                <thead class="">
                                                                                    <tr>
                                                                                        <th class="noExport"><input type="checkbox" class="pending_service_prlines" title="Select All"/></th>
                                                                                        <th>Plant </th>
                                                                                        <th>PR No. </th>
                                                                                        <th>PR Line No. </th>
                                                                                        <th>Item Code </th>
                                                                                        <th class="noExport">PO Text</th>
                                                                                        <th style="display: none;">PO Text </th>
                                                                                        <th>Item Text</th>
                                                                                        <th>PR Req. </th>
                                                                                        <th>PR Creator</th>
                                                                                        <th>Dept. </th>
                                                                                        <th>UoM </th>
                                                                                        <th>PR Quantity</th>
                                                                                        <th>Days Overdue </th>
                                                                                        <th class="noExport"></th>
                                                                                        <th class="noExport"></th>

                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                        <c:forEach var="pr" items="${buyerPendingServicePRList}" varStatus="status">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <input type="checkbox" class="select-material-pr-line" value="${pr.insertionOrderID}">
                                                                                                <input type="hidden" class="prtype" name="prtype" value="Service">
                                                                                                <input type="hidden" class="procInstId" value="${pr.pID}">
                                                                                                <input type="hidden" class="linkIdClass" value="${pr.linkId}">
                                                                                                <input type="hidden" class="prCreator" value="${pr.pRCreator}">
                                                                                            </td>
                                                                                            <td align="center">${pr.plant}</td>
                                                                                            <td align="center">${pr.pRNumber}</td>
                                                                                            <td align="center">${pr.pRLineNumber}</td>
                                                                                            <td align="center">${pr.itemCode}</td>
                                                                                            <td align="center">
                                                                                                <a href="#" class="longTextClass" title="PO Text">
                                                                                                    <i class="fa fa-file" aria-hidden="true"></i>
                                                                                                </a>
                                                                                                <input type="hidden" id="" class="longTextHiddenFiled" value="${pr.poText}">
                                                                                            </td>
                                                                                            <td  style="display: none;">${pr.poText}</td>
                                                                                            <td align="center">${pr.itemText}</td>
                                                                                            <td>${pr.pRRequester}</td>
                                                                                            <td>${pr.pRCreator}</td>
                                                                                            <td align="center">${pr.department}</td>
                                                                                            <td align="center">${pr.uoM}</td>
                                                                                            <td align="center">${pr.remainingQuantity}</td>
                                                                                            <td align="center">${pr.noOfDaysOverdue}</td>
                                                                                            <td><input type="button" value="Reject" class="btn btn-outline-primary btn-rounded btn-sm reject-pr-btn button-ht" id="reject_pr_btn${status.count}"/></td>
                                                                                            <td><input type="button" value="Query" class="btn btn-outline-primary btn-rounded btn-sm query-pr-btn button-ht" id="query_pr_btn${status.count}"/></td>
                                                                                        </tr>
                                                                                    </c:forEach>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade show active" id="PRMaterial-justify" role="tabpanel" aria-labelledby="PRMaterial-tab-justify">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered pending-prmateriallines" id="pending_prmateriallines_table">
                                                                                <thead class="">
                                                                                    <tr>
                                                                                        <th class="noExport"><input type="checkbox" class="pending_material_prlines" title="Select All"/></th>
                                                                                        <th>Plant </th>
                                                                                        <th>PR No. </th>
                                                                                        <th>PR Line No. </th>
                                                                                        <th>Item Code </th>
                                                                                        <th class="noExport">PO Text</th>
                                                                                        <th style="display: none;">PO Text </th>
                                                                                        <th>Item Text</th>
                                                                                        <th>PR Req. </th>
                                                                                        <th>PR Creator</th>
                                                                                        <th>Dept. </th>
                                                                                        <th>UoM </th>
                                                                                        <th>PR Quantity</th>
                                                                                        <th>Days Overdue </th>
                                                                                        <th class="noExport"></th>
                                                                                        <th class="noExport"></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <c:forEach var="pr" items="${buyerPendingMaterialPRList}" varStatus="status">
                                                                                        <tr>
                                                                                            <td>
                                                                                                <input type="checkbox" class="select-material-pr-line" value="${pr.insertionOrderID}">
                                                                                                <input type="hidden" class="prtype" name="prtype" value="Material">
                                                                                                <input type="hidden" class="procInstId" value="${pr.pID}">
                                                                                                <input type="hidden" class="linkIdClass" value="${pr.linkId}">
                                                                                                <input type="hidden" class="prCreator" value="${pr.pRCreator}">
                                                                                            </td>
                                                                                            <td align="center">${pr.plant}</td>
                                                                                            <td align="center">${pr.pRNumber}</td>
                                                                                            <td align="center">${pr.pRLineNumber}</td>
                                                                                            <td align="center">${pr.itemCode}</td>
                                                                                            <td class="noExport" align="center">
                                                                                                <a href="#" class="longTextClass" title="PO Text">
                                                                                                    <i class="fa fa-file" aria-hidden="true"></i>
                                                                                                </a>
                                                                                                <input type="hidden" id="" class="longTextHiddenFiled" value="${pr.poText}">
                                                                                            </td>
                                                                                            <td  style="display: none;">${pr.poText}</td>
                                                                                            <td align="center">${pr.itemText}</td>
                                                                                            <td>${pr.pRRequester}</td>
                                                                                            <td>${pr.pRCreator}</td>
                                                                                            <td align="center">${pr.department}</td>
                                                                                            <td align="center">${pr.uoM}</td>
                                                                                            <td align="center">${pr.remainingQuantity}</td>
                                                                                            <td align="center">${pr.noOfDaysOverdue}</td>
                                                                                            <td><input type="button" value="Reject" class="btn btn-outline-primary btn-rounded btn-sm reject-pr-btn button-ht" id="reject_pr_btn${status.count}"/></td>
                                                                                            <td><input type="button" value="Query" class="btn btn-outline-primary btn-rounded btn-sm query-pr-btn button-ht" id="query_pr_btn${status.count}"/></td>
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
                                                                    <a class="nav-link" id="Service-tab-justify" data-toggle="tab" href="#Service-justify" role="tab" aria-controls="Service" aria-selected="true">Service</a>
                                                                </li>

                                                                
                                                            </ul>

                                                            <div class="tab-content">
                                              

                                                                <div class="tab-pane fade show active" id="Material-justify" role="tabpanel" aria-labelledby="Material-tab-justify">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-hover pendingMaterialContractLine-details" id="pendingMaterialContractLine_pr_details" style="width: 100%">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                         <th class="noExport"><input type="checkbox" class="pending_service_contractlines" title="Select All"/></th>
                                                                                    <th>PID</th>
                                                                                    <th>Tender Title</th>
                                                                                    <th>Tender Ref No</th>
                                                                                    <th>Tender Raised By</th>
                                                                                    <th>OLA Value</th>
<!--                                                                                    <th>Validity Start Date</th>-->
                                                                                    
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="Cont" items="${buyerPendingMaterialContractList}" varStatus="status">
<!--<tr>
                                                                                        <td><input type="checkbox" class="select-material-contract-line" value="{contract.insertionOrderID}">
                                                                                            <input type="hidden" class="contract-type" value="Service">
                                                                                            <input type="hidden" class="procInstId" value="{contract.pID}">
                                                                                        </td>
                                                                                        <td><a href="createcontract.do">{contract.refno}</a></td>
                                                                                         <td>{contract.companyCode}</td>
                                                                                        <td>{contract.plant}</td>
                                                                                        <td>{contract.itemCode}</td>
                     </tr>-->
                                                                                    <tr>
                                                                                            <td><input type="checkbox" class="select-material-contract-line" value="">
                                                                                            <td align="left">${Cont.pid}</td>
                                                                                            <td align="left">${Cont.tender_Title}</td>
                                                                                             <td align="left">${Cont.SOW_RefNo}</td>
                                                                                            <td align="left">${Cont.initiatorID}</td>
                                                                                             <td align="left">${Cont.OLAValue}</td>
                                                                                    </tr>

                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="tab-pane fade show " id="Service-justify" role="tabpanel" aria-labelledby="Service-tab-justify">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-hover pendingContractLine-details" id="pendingContractLine_pr_details" style="width: 100%">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExport"><input type="checkbox" class="pending_service_contractlines" title="Select All"/></th>
                                                                                    <th>PID</th>
                                                                                    <th>Tender Title</th>
                                                                                    <th>Tender Ref No</th>
                                                                                    <th>Tender Raised By</th>
                                                                                    <th>OLA Value</th>
                                                                                   <!-- <th>Validity Start Date</th>-->
                                                                                    
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <c:forEach var="Cont" items="${buyerPendingServiceContractList}" varStatus="status">

<!--                                                                                    <tr>
                                                                                        <td><input type="checkbox" class="select-material-contract-line" value="{contract.insertionOrderID}">
                                                                                            <input type="hidden" class="contract-type" value="Service">
                                                                                            <input type="hidden" class="procInstId" value="{contract.pID}">
                                                                                        </td>
                                                                                      
                                                                                         <td><a href="createcontract.do?contractRefId={contract.pID}">{contract.refno}</a></td>
                                                                                         <td></td>
                                                                                        <td>Pending</td>
                                                                                        <td>{contract.activationDate}</td>
                    
                                                                                 </tr>-->
                                                                                    <tr>
                                                                                            <td><input type="checkbox" class="select-material-contract-line" value="">
                                                                                            <td align="left">${Cont.pid}</td>
                                                                                            <td align="left">${Cont.tender_Title}</td>
                                                                                             <td align="left">${Cont.SOW_RefNo}</td>
                                                                                            <td align="left">${Cont.initiatorID}</td>
                                                                                             <td align="left">${Cont.OLAValue}</td>
                                                                                    </tr>
                                                                                </c:forEach>
                                                                            </tbody>
                                                                        </table>
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
                </div>
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
                                                    <input type="text" class="form-control rounded" id="rejectto" name="rejectto">

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
                                                        <c:forEach var="userName" items="${QueryUserName}">
                                                            <option value="${userName.userName}">${userName.personalName}</option>
                                                        </c:forEach>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="querymailaddress" class="">Query Mail Address: </label>
                                                    <input type="text" class="form-control rounded" id="querymailaddress" name="querymailaddress">
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
                                <button type="button" class="btn btn-primary button-ht" id="rejectcontractmodal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                        <c:forEach var="userName" items="${QueryUserName}">
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
                        <script src="assets/js/pr.js"></script>


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
                    $(".selectpicker").selectpicker();
                    $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

                    if ($("#RejectStatus").val() === "0")
                    {
                        console.log("Reject Status: " + $("#RejectStatus").val());
                        Lobibox.alert("success", {
                            msg: 'PR has been rejected successfully.'
                        });
                    } else if ($("#RejectStatus").val() !== "0" && $("#RejectStatus").val() !== "")
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
                    } else if ($("#QueryStatus").val() !== "0" && $("#QueryStatus").val() !== "")
                    {
                        Lobibox.alert("error", {
                            msg: 'Query has not been sent successfully, try again!'
                        });
                    }
                });

                        </script>


                        </body>

                        </html>

