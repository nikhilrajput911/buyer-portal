<%-- 
    Document   : SpendAnalysisReport.jsp
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


        <title>Spend Analysis Report</title>
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
                            <input type="hidden" value="${isPassUpdated}" id="ispasswordupdated">
                            <input type="hidden" value="${isPersonalInfoUpdated}" id="isPersonalInfoUpdated">
                            <input type="hidden" value="${pid}" id="pid">
                            <input type="hidden" value="${docStatus}" id="docStatus">
                            <input type="hidden" value="${revoke}" id="revoke">
                            
                            <div id="overlay">
                                <div id="loader"></div>
                            </div> 

                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">

                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
                                        <div class="section-block">
                                        </div>
                                        <div class="tab-regular">
                                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                <!--<li class="nav-item" onclick="location.reload();">-->
                                                <li class="nav-item">
                                                    <a class="nav-link active" id="PRMaterial-tab-justify" data-toggle="tab" href="#PRMaterial-justify" role="tab" aria-controls="PRMaterial" aria-selected="true">Material Spend Analysis</a>
                                                </li>
                                                 <li class="nav-item">
                                                    <a class="nav-link" id="PRService-tab-justify" data-toggle="tab" href="#PRService-justify" role="tab" aria-controls="PRService" aria-selected="false">Service Spend Analysis</a>
                                                </li>
                                            </ul>
                                            
                                            <div class="tab-content" id="myTabContent7">

                                                <!-- PR Started -->

                                                <div class="tab-pane fade show active" id="PRMaterial-justify" role="tabpanel" aria-labelledby="PRMaterial-tab-justify">


                                                                                <form class="" method="post" action="unassignedSpendLines.do" id="unassignedSpendLinesformMat">

                                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                                    <input type="hidden" value="" name="unassignedspendlines" id="unassignedspendlines">
                                                                                    <input type="hidden" name="removeCartValues" id="removeCartValues" value="">
                                                                                    <input type="hidden" name="messageids" id="messageids" value="">
                                                                                    <input type="hidden" name="spendValuesJava" id="spendValuesJava" value="">
                                                                                    <input type="hidden" name="addlineids" id="addlineids" value="">
                                                                                    <input type="hidden" name="typeofRequest" id="typeofRequest" value="">
                                                                                    <input type="hidden" name="mainvalue" id="mainvalue" value="">
                                                                                    <input type="hidden" name="requestType" id="requestType" value="">
                                                                                    <input type="hidden" name="tenderTitle" id="tenderTitle" value="">
                                                                                    <input type="hidden" name="companyCode" id="companyCode" value="">
                                                                                    <input type="hidden" name="contractType" id="contractType" value="">
                                                                                    <input type="hidden" name="costCentre" id="costCentre" value="">
                                                                                    <input type="hidden" name="uniqueIDMat" id="uniqueIDMat" value="">
                                                                                    <input type="hidden" name="bucketNameMat" id="bucketNameMat" value="">
                                                                                    




                                                                                    <div class="row">
                                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                            <!--<div class="card">-->
                                                                                            <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                                            <div class="card-body" style="padding-top: 0em;">
                                                                                                <!--<div class="row">-->
                                                                                                <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                                                <div class="table-responsive">
                                                                                                    <table class="table table-bordered table-hover sar-DetailsMAT" id="sar_DetailsMAT">
                                                                                                        <thead class="">
                                                                                                            <tr class="">
                                                                                                                <th class="noExport1" scope="col" style = "width:68px">
                                                                                                                    <c:if test="${spendAnalysisReportList.size() > 0}">
                                                                                                                        <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                                                                    </c:if> 
                                                                                                                   
                                                                                                                </th>
                                                                                                                <th class="" scope="col">Material Number</th>
                                                                                                                <th class="" scope="col">Short Text </th>
                                                                                                                <th class="" scope="col" style="display:none;">Po Long</th>
                                                                                                                <th class="noExport1" scope="col">PO Long Text</th>
                                                                                                                <th class="" scope="col">UOM</th>
                                                                                                                <th class="" scope="col">Order Price Unit</th>
                                                                                                                <th class="" scope="col">Purchase Group</th>
                                                                                                                <th class="" scope="col">Currency</th>
                                                                                                                <th class="" scope="col">Unit Price</th>
                                                                                                                <th class="" scope="col">GR Quantity</th>
                                                                                                                <th class="" scope="col">Per Price Unit</th>
                                                                                                                <th class="" scope="col">LC Amount</th>
                                                                                                                <th class="" scope="col" >Type</th>
                                                                                                                <th class="" scope="col" style="display:none;">Mat Group</th>
                                                                                                                <th class="" scope="col" style="display:none;">Storage Loc</th>
                                                                                                                <th class="" scope="col" style="display:none;">Mat Group Desc</th>
                                                                                                                <th class="" scope="col" style="display:none;">UniqueID</th>
                                                                                                                <th class="" scope="col" style="display:none;">OldMatNo</th>
                                                                                                                <th class="" scope="col" style="display:none;">CountryOrigin</th>
                                                                                                                <th class="" scope="col" style="display:none;">UOMStore</th>

                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            <c:forEach var="Cont" items="${spendAnalysisReportList}" varStatus="status">
                                                                                                                <tr>
                                                                                                                    <td align="center" style = "width:68px"><input type="checkbox" value="${Cont.sno}" class="spend-checkbox-class"></td>
                                                                                                                    <td align="left">${Cont.materialSVSNumber}</td>
                                                                                                                    <td align="left">${Cont.materialServiceDescription}</td>
                                                                                                                    <td style="display:none;">${Cont.poLong}</td>
                                                                                                                    <td align="center">
                                                                                                                        <a href="#" class="longTextClassSAR" title="PO Text" data-toggle="tooltip" data-placement="auto">
                                                                                                                            <i class="fa fa-file" aria-hidden="true"></i>
                                                                                                                        </a>
                                                                                                                        <input type="hidden" name="longTextId" class="longTextClassSAR" value="${Cont.poLong}">
                                                                                                                    </td>
                                                                                                                    <td align="left">${Cont.uom}</td>
                                                                                                                    <td align="left">${Cont.uom}</td>
                                                                                                                    <td align="left">${Cont.purchaseGroup}</td>
                                                                                                                    <td align="left">${Cont.currency}</td>
                                                                                                                    <td align=right>${Cont.unitPrice}</td>
                                                                                                                    <td align="right">${Cont.grQty}</td>
                                                                                                                    <td align="right">${Cont.perPriceUnit}</td>
                                                                                                                    <td align="right">${Cont.lcAmount}</td>
                                                                                                                    <td align="left">${Cont.type}</td>
                                                                                                                    <td style="display:none;">${Cont.matGroup}</td>
                                                                                                                    <td style="display:none;">${Cont.matStorageLoc}</td>
                                                                                                                    <td style="display:none;">${Cont.matGroupDesc}</td>
                                                                                                                    <td style="display:none;">${Cont.uniqueID}</td>
                                                                                                                    <td style="display:none;">${Cont.oldMaterialNo}</td>
                                                                                                                    <td style="display:none;">${Cont.countryOrigin}</td>
                                                                                                                    <td style="display:none;">${Cont.uomStore}</td>
                                                                                                                </tr>
                                                                                                            </c:forEach> 
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
<!--                                                                                              </secauthorize>                  -->
                                                                                            </div>
                                                                                            <!--</div>-->
                                                                                        

                                                                                            <br>
                                                                                        <div class="row">
                                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">


                                                                                                <div class="align-center text-align-center">

                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="assignSpend" value="Create Tender">
<!--                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="assignGroupSpend" value="Create Group Tender">-->
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="addtolibrary" value="Add to Library">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="removecart" value="Remove from Cart">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="uploadSpend" value="Upload Spend Data">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="uploadSpendSVChist" value="Upload Spend History">
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>

                                                                            </form>
                                                                        </div>

                                                              
                                                        <div class="tab-pane fade show " id="PRService-justify" role="tabpanel" aria-labelledby="PRService-tab-justify">

                                                    
                                                                                <form class="" method="post" action="spendAnalysisServiceForm.do" id="spendAnalysisServiceForm">

                                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                                    
                                                                                    <input type="hidden" name="removeCartValuesSVC" id="removeCartValuesSVC" value="">
                                                                                    <input type="hidden" name="spendValuesJavaSVC" id="spendValuesJavaSVC" value="">
                                                                                    <input type="hidden" name="typeofRequestSVC" id="typeofRequestSVC" value="">
                                                                                    <input type="hidden" name="addlineidsSVC" id="addlineidsSVC" value="">
                                                                                    <input type="hidden" name="mainvalueSVC" id="mainvalueSVC" value="">
                                                                                    <input type="hidden" name="spoc_contract" id="spoc_contract" value="">
                                                                                    <input type="hidden" name="uniqueIDSvc" id="uniqueIDSvc" value="">
                                                                                    <input type="hidden" name="bucketNameSvc" id="bucketNameSvc" value="">
                                                                                    <input type="hidden" name="requestTypeSVC" id="requestTypeSVC" value="">
                                                                                    <input type="hidden" name="tenderTitleSVC" id="tenderTitleSVC" value="">
                                                                                    <input type="hidden" name="companyCodeSVC" id="companyCodeSVC" value="">
                                                                                    <input type="hidden" name="contractTypeSVC" id="contractTypeSVC" value="">
                                                                                    <input type="hidden" name="costCentreSVC" id="costCentreSVC" value="">
                                                                                    <input type="hidden" name="replyDateSVC" id="replyDateSVC" value="">
                                                                                    <input type="hidden" name="documentsSVC" id="documentsSVC" value="">
                                                                                    <input type="hidden" name="terminationSVC" id="terminationSVC" value="">
                                                                                    



                                                                                    <div class="row">
                                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                                                                            <div class="card-body" style="padding-top: 0em;">

                                                                                                <div class="table-responsive">
                                                                                                    <table class="table table-bordered table-hover sarSVC-Details" id="sarSVC_Details">
                                                                                                        <thead class="">
                                                                                                            <tr class="">
                                                                                                                <th class="noExport2" scope="col">
                                                                                                                   <c:if test="{spendAnalysisReportListSVC.size() > 0}">
                                                                                                                        <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                                                                    </c:if>  
<!--                                                                                                                    <input type="checkbox" class="select-all-prline" title="Select All"/> -->
                                                                                                                </th>
														<th class="" scope="col">Purchase Document</th>
                                                                                                                <th class="" scope="col">Item </th>
                                                                                                                <th class="" scope="col">Order Type</th>
														<th class="" scope="col">Vendor Code</th>
                                                                                                                <th class="" scope="col">Vendor</th>
                                                                                                                <th class="" scope="col">Material/SVS Number</th>
                                                                                                                <th class="" scope="col">Material/Service Description </th>
                                                                                                                <th class="" scope="col">Plant Code</th> 
                                                                                                                <th class="" scope="col">Material Group/SVS No </th>
														<th class="" scope="col">Material Group/SVS No Description</th>                
                                                                                                                <th class="" scope="col">UOM</th>
                                                                                                                <th class="" scope="col">Unit Price</th>
                                                                                                                <th class="" scope="col">LC Amount</th>
                                                                                                                <th class="" scope="col">Posting Date</th>
                                                                                                                <th class="" scope="col">GR Quantity</th>
                                                                                                                <th class="" scope="col" style="display:none;">UniqueID</th>
                                                                                                                

                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                                <c:forEach var="Cont" items="${spendAnalysisReportListSVC}" varStatus="status">
                                                                                                                <tr>
                                                                                                                    <td align="center" style = "width:35px"><input type="checkbox" value="${Cont.sno}" class="spendSVC-checkbox-class"></td>
                                                                                                                    <td align="left">${Cont.purchaseDoc}</td>
                                                                                                                    <td align="left">${Cont.item}</td>
                                                                                                                    <td align="left">${Cont.orderType}</td>
                                                                                                                    <td align="left">${Cont.vendorCode}</td>
                                                                                                                    <td align="left">${Cont.vendorName}</td>
                                                                                                                    <td align="left">${Cont.svsNumber}</td>
                                                                                                                    <td align="left">${Cont.longText}</td>
                                                                                                                    <td align="left">${Cont.plantCode}</td>
                                                                                                                    <td align="left">${Cont.serviceGroupNo}</td>
                                                                                                                    <td align="left">${Cont.svsDescription}</td>
                                                                                                                    <td align="left">${Cont.uom}</td>
                                                                                                                    <td align="right">${Cont.unitPrice}</td>
                                                                                                                    <td align="right">${Cont.lcAmnt}</td>
                                                                                                                    <td align="ledt">${Cont.postingDate}</td>
                                                                                                                    <td align="right">${Cont.grQty}</td>
                                                                                                                    <td style="display:none;">${Cont.uniqueID}</td>
                                                                                                                </tr>
                                                                                                              </c:forEach> 
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </sec:authorize>                     
                                                                                            <!--</div>-->
                                                                                        </div>

                                                                                            <br>
                                                                                        <div class="row">
                                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">


                                                                                                <div class="align-center text-align-center">
                                                                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                                                                                        <div class="form-group">
                                                                                                            <label for="spoc_contract">SPOC Name:</label>
                                                                                                            <!--<select class="selectpicker show-tick show-menu-arrow" title="Choose Spoc name..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="spoc_contract" name="spoc_contract">-->
                                                                                                            <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Spoc name..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="spoc_contractSVC" name="spoc_contractSVC">
                                                                                                                <!--<select>-->
                                                                                                                <c:forEach var="user" items="${spocusers}">
                                                                                                                    <option value="${user.userName}">${user.userName}</option>
                                                                                                                </c:forEach>
                                                                                                            </select>

                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="assignSpendSVC" value="Send for SOW">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="addtolibrarySVC" value="Add to Library">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="removecartSVC" value="Remove from Cart">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="uploadSpendSVC" value="Upload Spend Data">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="uploadSpendHistSVC" value="Upload Spend History">
                                                                                                    
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
                     
        <div class="modal fade" id="longTextModalSAR" tabindex="-1" role="dialog" aria-labelledby="longTextLabel" aria-hidden="true">
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
                                                    
                                                    
        <div class="modal fade" id="uploadSpendHistoryMod" tabindex="-1" role="dialog" aria-labelledby="uploadSpendHistory" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="uploadSpendHistory">Upload Spend History</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                        <div class="card-body" style="padding-top: 0em;">

                                            <div class="table-responsive">
                                                <table class="table table-bordered table-hover uploadHistory-Details" id="uploadHistory_Details">
                                                    <thead class="">
                                                        <tr class="">
<!--                                                            <th class="noExport2" scope="col">
                                                                 <cif test="{spendAnalysisReportList.size() > 0}">
                                                                        <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                 </cif>  
                                                                <input type="checkbox" class="select-all-prline" title="Select All"/> 
                                                            </th>-->
								<th class="table-header-color" scope="col">UniqueID</th>
                                                                <th class="table-header-color" scope="col">FileName </th>
                                                                <th class="table-header-color" scope="col">UploadedBy</th>
								<th class="table-header-color" scope="col">BuyerID</th>
                                                                <th class="table-header-color" scope="col">UploadTime</th>
                                                                <th class="table-header-color" scope="col">FileProcessed</th>
                                                                <th class="table-header-color" scope="col">TenderProcessed </th>
                                                                <th class="table-header-color" scope="col">RevokeStatus</th> 
                                                                 <th class="table-header-color" scope="col">Revoke</th> 
                                                                 
                                                                 
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                            <c:forEach var="Cont" items="${uploadHistoryListMat}" varStatus="status">
                                                                <tr>
<!--                                                                    <td align="center" style = "width:35px"><input type="checkbox" value="${Cont.sno}" class="uploadHistory-checkbox-class"></td>-->
                                                                    <c:set var = "hyperlink" scope = "session" value = "http://192.168.13.119:8080/omnidocs/integration/foldView/viewFoldList.jsp?Application=SpendHistory&S=S&DocId=${Cont.documentIndex}" />
                                                                    <td style="display:none;">${Cont.sno}</td>
                                                                    <td align="left">${Cont.uniqueID}</td>
                                                                    <td align="left"><a href="${hyperlink}" target="_blank">${Cont.fileName}</a></td>
                                                                    <td align="left">${Cont.buyerName}</td>
                                                                    <td align="left">${Cont.buyerid}</td>
                                                                    <td align="left">${Cont.addedTime}</td>
                                                                    <td align="left">${Cont.processedFlag}</td>
                                                                    <td align="left">${Cont.tenderProcessedFlag}</td>
                                                                    <td align="left">${Cont.revokeStatus}</td> 
                                                                    <td style="display:none;">${Cont.documentIndex}</td>
                                                                    <c:choose>
                                                                        <c:when test="${Cont.tenderProcessedFlag != 'N' || Cont.revokeStatus !='N'}">
                                                                            <td><center><button type=button  id="revokeClick" value="" onclick="revoke(${Cont.sno},${Cont.uniqueID})" disabled="disabled"  class='btn btn-sm btn-danger'>Revoke </button></center></td>
                                                                        </c:when>    
                                                                        <c:otherwise>
                                                                             <td><center><button type=button  id="revokeClick" value="" onclick="revoke(${Cont.sno},${Cont.uniqueID})"  class='btn btn-sm btn-danger'>Revoke </button></center></td>
                                                                        </c:otherwise>
                                                                    </c:choose>
                                                                    
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
        </div>
        
        
        <div class="modal fade" id="uploadSpendHistoryModSvc" tabindex="-1" role="dialog" aria-labelledby="uploadSpendHistorySvc" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="uploadSpendHistorySvc">Upload Spend History</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                        <div class="card-body" style="padding-top: 0em;">

                                            <div class="table-responsive">
                                                <table class="table table-bordered table-hover uploadHistorySvc-Details" id="uploadHistorySvc_Details">
                                                    <thead class="">
                                                        <tr class="">
<!--                                                            <th class="noExport2" scope="col">
                                                                 <cif test="{spendAnalysisReportList.size() > 0}">
                                                                        <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                 </cif>  
                                                                <input type="checkbox" class="select-all-prline" title="Select All"/> 
                                                            </th>-->
								<th class="table-header-color" scope="col">UniqueID</th>
                                                                <th class="table-header-color" scope="col">FileName </th>
                                                                <th class="table-header-color" scope="col">UploadedBy</th>
								<th class="table-header-color" scope="col">BuyerID</th>
                                                                <th class="table-header-color" scope="col">UploadTime</th>
                                                                <th class="table-header-color" scope="col">FileProcessed</th>
                                                                <th class="table-header-color" scope="col">TenderProcessed </th>
                                                                <th class="table-header-color" scope="col">RevokeStatus</th> 
                                                                 <th class="table-header-color" scope="col">Revoke</th> 
                                                                 
                                                                 
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                            <c:forEach var="Cont" items="${uploadHistoryListSvc}" varStatus="status">
                                                                <tr>
<!--                                                                    <td align="center" style = "width:35px"><input type="checkbox" value="${Cont.sno}" class="uploadHistory-checkbox-class"></td>-->
                                                                    <c:set var = "hyperlink" scope = "session" value = "${serverIP}/omnidocs/integration/foldView/viewFoldList.jsp?Application=SpendHistory&S=S&DocId=${Cont.documentIndex}" />
                                                                    <td style="display:none;">${Cont.sno}</td>
                                                                    <td align="left">${Cont.uniqueID}</td>
                                                                    <td align="left"><a href="${hyperlink}" target="_blank">${Cont.fileName}</a></td>
                                                                    <td align="left">${Cont.buyerName}</td>
                                                                    <td align="left">${Cont.buyerid}</td>
                                                                    <td align="left">${Cont.addedTime}</td>
                                                                    <td align="left">${Cont.processedFlag}</td>
                                                                    <td align="left">${Cont.tenderProcessedFlag}</td>
                                                                    <td align="left">${Cont.revokeStatus}</td> 
                                                                    <td style="display:none;">${Cont.documentIndex}</td>
                                                                    <c:choose>
                                                                        <c:when test="${Cont.tenderProcessedFlag != 'N' || Cont.revokeStatus !='N'}">
                                                                            <td><center><button type=button  id="revokeClickSvc" value="" onclick="revokeSvc(${Cont.sno},${Cont.uniqueID})" disabled="disabled"  class='btn btn-sm btn-danger'>Revoke </button></center></td>
                                                                        </c:when>    
                                                                        <c:otherwise>
                                                                             <td><center><button type=button  id="revokeClickSvc" value="" onclick="revokeSvc(${Cont.sno},${Cont.uniqueID})"  class='btn btn-sm btn-danger'>Revoke </button></center></td>
                                                                        </c:otherwise>
                                                                    </c:choose>
                                                                    
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
        </div>
                                                    
                                                    
                                                    
                    <div class="modal fade" id="uploadSpendReportModal" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <form action="uploadSpendAttachment.do" method="post" enctype="multipart/form-data" id="uploadSpendContract">
                                
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                            
                                <div class="modal-header">
                                    <h5 class="modal-title" id="attLabel">Attachments for SpendAnalysis Material</h5>
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
                                                            <button class="btn btn-primary btn-choose" type="button">Spend Analysis Report</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc1" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                        </div>
                                                    <!--<input type="file" name="att1"/>-->
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="uploaddocumentContractModalBtn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>  
                                
                    <div class="modal fade" id="uploadSpendReportModalSVC" tabindex="-1" role="dialog" aria-labelledby="atLabelSvc" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <form action="uploadSpendAttachmentSVC.do" method="post" enctype="multipart/form-data" id="uploadSpendContractSvc">
                                
                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                            
                                <div class="modal-header">
                                    <h5 class="modal-title" id="atLabelSvc">Attachments for SpendAnalysis Service</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <div class="input-group input-file" name="docDiv2">
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-primary btn-choose" type="button">Spend Analysis Report</button>
                                                        </span>
                                                        <input type="text" class="form-control" id="doc2" placeholder='Choose a file...' />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                                        </span>
                                                        </div>
                                                    <!--<input type="file" name="att1"/>-->
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="uploaddocumentContractModalBtnSVC">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>  
                                
                                
                     <div class="modal fade" id="addInfoSpendAnalysisReport" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                           
                            
                                <div class="modal-header">
                                    <h5 class="modal-title" id="attLabel">Additional Details</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    
                                                    <div class="row">
                                                        
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modrequestType" class="">Request Type</label>
                                                                        <select class="form-control-sm custom-select" id="modrequestType" name="modrequestType" required>
                                                                            <option value="">--Select--</option>
                                                                            <c:forEach var="type" items="${requestTypeList}">
                                                                                <option value="${type.requestType}">${type.requestType}</option>
                                                                            </c:forEach>
<!--                                                                           <option value="Create Contract">Create Contract</option>
                                                                            <option value="Amend Contract">Amend Contract</option>
                                                                            <option value="Cancel Contract">Cancel Contract</option>
                                                                            <option value="Renew Contract">Renew Contract</option>-->
                                                                        </select>

                                                                    </div>
                                                                </div>
                                                                 <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcompanyCode">Company Code</label>
                                                                        <select class="form-control-sm custom-select" id="modcompanyCode" name="modcompanyCode" required>
                                                                            <option value="">--Select--</option>
                                                                           <option value="${companyCode}">${companyCode}</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="modtenderTitle" class="">Tender Title</label>
                                                                            <input type="text" class="form-control form-rounded" id="modtenderTitle" name="modtenderTitle">

                                                                        </div>
                                                                </div>

                                                            </div>
                                                    
                                                    <div class="row">
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcontractType">Contract Type</label>
                                                                        <select class="form-control-sm custom-select" id="modcontractType" name="modcontractType" required>
                                                                            <option value="">--Select--</option>
<!--                                                                           <option value="Standard Service Contract">Standard Service Contract</option>
                                                                            <option value="Transport Contract">Transport Contract</option>-->
                                                                            <c:forEach var="type" items="${contractTypeList}">
                                                                                <option value="${type.contractTypeCode}">${type.contractType}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcostCentre" class="">User Cost Centre</label>
                                                                        <input type="text" class="form-control form-rounded" id="modcostCentre" name="modcostCentre">
                                                                    </div>
                                                                </div>
                                                        
<!--                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modactivationDate" class="">Activation Date</label>
                                                                        <div class="input-group date" id="activationDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="modactivationDate" name="modactivationDate" data-target="" />
                                                                            <div class="input-group-append" data-target="#activationDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>-->
<!--                                                                         <div class="form-group">  Date input 
                                                                            <label class="control-label" for="activationDate">Activation Date</label>
                                                                            <input class="form-control" id="activationDate" name="activationDate" placeholder="DD/MM/YYY" type="text"/>
                                                                          </div>-->
                                                                </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="assignModelBtn">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                        
                    <!------------------------------------------------------------------------Ram--------------------------------------------------------------------------->
                    
                    <div class="modal fade" id="addInfoSpendAnalysisReportSVC" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                           
                            
                                <div class="modal-header">
                                    <h5 class="modal-title" id="attLabel">Additional Details</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    
                                                    <div class="row">
                                                        
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modrequestTypeSVC" class="">Request Type</label>
                                                                        <select class="form-control-sm custom-select" id="modrequestTypeSVC" name="modrequestTypeSVC" required>
                                                                            <option value="">--Select--</option>
                                                                            <c:forEach var="type" items="${requestTypeList}">
                                                                                <option value="${type.requestType}">${type.requestType}</option>
                                                                            </c:forEach>
<!--                                                                           <option value="Create Contract">Create Contract</option>
                                                                            <option value="Amend Contract">Amend Contract</option>
                                                                            <option value="Cancel Contract">Cancel Contract</option>
                                                                            <option value="Renew Contract">Renew Contract</option>-->
                                                                        </select>

                                                                    </div>
                                                                </div>
                                                                 <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcompanyCodeSVC">Company Code</label>
                                                                        <select class="form-control-sm custom-select" id="modcompanyCodeSVC" name="modcompanyCodeSVC" required>
                                                                            <option value="">--Select--</option>
                                                                           <option value="${companyCode}">${companyCode}</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="modtenderTitleSVC" class="">Tender Title</label>
                                                                            <input type="text" class="form-control form-rounded" id="modtenderTitleSVC" name="modtenderTitleSVC">

                                                                        </div>
                                                                </div>

                                                            </div>
                                                    
                                                    <div class="row">
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcontractTypeSVC">Contract Type</label>
                                                                        <select class="form-control-sm custom-select" id="modcontractTypeSVC" name="modcontractTypeSVC" required>
                                                                            <option value="">--Select--</option>
<!--                                                                           <option value="Standard Service Contract">Standard Service Contract</option>
                                                                            <option value="Transport Contract">Transport Contract</option>-->
                                                                            <c:forEach var="type" items="${contractTypeList}">
                                                                                <option value="${type.contractTypeCode}">${type.contractType}</option>
                                                                            </c:forEach>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcostCentreSVC" class="">User Cost Centre</label>
                                                                        <input type="text" class="form-control form-rounded" id="modcostCentreSVC" name="modcostCentreSVC">
                                                                    </div>
                                                                </div>
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modreplyDateSVC" class="">Reply Date To Buyer</label>
                                                                        <div class="input-group date" id="activationDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="modreplyDateSVC" name="modreplyDateSVC" data-target="" />
                                                                            <div class="input-group-append" data-target="#activationDate_div" data-toggle="datetimepicker">
                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
<!--                                                                         <div class="form-group">  Date input 
                                                                            <label class="control-label" for="activationDate">Activation Date</label>
                                                                            <input class="form-control" id="activationDate" name="activationDate" placeholder="DD/MM/YYY" type="text"/>
                                                                          </div>-->
                                                                </div>
                                                        
                                                    </div>
                                                                        
                                                    <div class="row">
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="moddocumentsSVC" class="">Documents & Invocing </label>
                                                                            <input type="text" class="form-control form-rounded" id="moddocumentsSVC" name="moddocumentsSVC">

                                                                        </div>
                                                                </div>
                                                        
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="modterminationSVC" class="">Termination</label>
                                                                            <input type="text" class="form-control form-rounded" id="modterminationSVC" name="modterminationSVC">

                                                                        </div>
                                                                </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="assignModelBtnSVC">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                                                                        
                    <!-----------------------------------------------------------------------Ram---------------------------------------------------------------------------->
                    
                        <div class="modal fade" id="addInfoSpendLibraryMod" tabindex="-1" role="dialog" aria-labelledby="LibLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                           
                            
                                <div class="modal-header">
                                    <h5 class="modal-title" id="LibLabel">Bucket</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">

                                                <div class="form-group">
                                                        <div class ="col-xl-6"

                                                                    <label for="modtenderTitle" class="">Bucket Name</label>
                                                                    <input type="text" class="form-control form-rounded" id="modBucketName" name="modBucketName">

                                                                        
                                                                </div>    
                                                </div>

                                        
                                    </div>
                                </div>
                                
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" id="addInfoLibBtn">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>  
                                                                        
                    <div class="modal fade" id="addInfoSpendLibraryModSVC" tabindex="-1" role="dialog" aria-labelledby="LibLabelSVC" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                           
                            
                                <div class="modal-header">
                                    <h5 class="modal-title" id="LibLabelSVC">Bucket</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">

                                                <div class="form-group">
                                                            <div class ="col-xl-6">
                                                                    <label for="modBucketNameSVC" class="">Bucket Name</label>
                                                                    <input type="text" class="form-control form-rounded" id="modBucketNameSVC" name="modBucketNameSVC">

                                                                        
                                                                </div>    
                                                </div>

                                        
                                    </div>
                                    </div>
                                
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" id="addInfoLibBtnSVC">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>  
                                                                        
                                                                        
                
                    <div class="modal fade" id="costCenterModal" tabindex="-1" role="dialog" aria-labelledby="costCenterLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="costCenterLabel">Cost Center</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-hover table-bordered costCenterTable-Class" id="costCenterTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">Cost Center &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Description</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <!--</div>-->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                    <!-----------------------------------------------------------------------Ram---------------------------------------------------------------------------->
                    <div class="modal fade" id="costCenterModalSVC" tabindex="-1" role="dialog" aria-labelledby="costCenterLabel" aria-hidden="true" z-index="9999" position="fixed">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="costCenterLabel">Cost Center</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-hover table-bordered costCenterTableSVC-Class" id="costCenterTableIdSVC" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">Cost Center &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Description</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <!--</div>-->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                
                            <!-----------------------------------------------------------------------Ram---------------------------------------------------------------------------->
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
                            $(document).ready(function () {
                                $(".selectpicker").selectpicker();

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
                                var resID = pid.split("$$$");
                                if (pid !== "")
                                {
                                    Lobibox.alert("success", {
                                        msg: "Work Item is created with Transaction id - " + resID[0] + ", SOW RefNo - " + resID[1]
                                    });
                                    return true;
                                    ;
                                }
                                
                                var docStatus = $("#docStatus").val();
                                console.log("Document Status -> "+docStatus);
                                if(docStatus !== "")
                                {
                                    if(docStatus=="Success")
                                    {
                                        Lobibox.alert("success", {
                                             msg: "Document uploaded successfully !"
                                         });
                                         return true;
                                         ; 
                                    }
                                    else
                                    {
                                        Lobibox.alert("error", {
                                             msg: "Failed to upload Document !"
                                         });
                                         return true;
                                         ; 
                                    }
                                    docStatus="";
                                }
                            
                            
                            var revoke = $("#revoke").val();
                                console.log("revoke-> " + revoke);
                                
                                if (revoke !== "")
                                {
                                    Lobibox.alert("success", {
                                        msg: "File revoked from processing !"
                                    });
                                    return true;
                                    ;
                                }
                                var revoke="";
                            });
                            
                   if ($("#activationDate_div").length) {
                    $(function() {
                        $('#activationDate_div').datetimepicker({
                            format: 'DD-MM-YYYY',
                            minDate: new Date(),
                            defaultDate: new Date()
                        });

                    });
                }
            

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

