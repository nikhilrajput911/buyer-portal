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

                            <sec:authorize access="hasAnyRole('ROLE_BUYER,ROLE_ADMIN_BUYER,ROLE_TL_BUYER,ROLE_ADMIN_TL_BUYER')">

                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
                                        <div class="section-block">
                                        </div>
                                        <div class="tab-regular">
                                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                                <!--<li class="nav-item" onclick="location.reload();">-->
                                                <li class="nav-item">
                                                    <a class="nav-link active" id="materialLibrary-tab-justify" data-toggle="tab" href="#materialLibrary-justify" role="tab" aria-controls="materialLibrary" aria-selected="true">Material Library</a>
                                                </li>
                                                 <li class="nav-item">
                                                    <a class="nav-link" id="serviceLibrary-tab-justify" data-toggle="tab" href="#serviceLibrary-justify" role="tab" aria-controls="serviceLibrary" aria-selected="false">Service Library</a>
                                                </li>

                                            </ul>
                                            <div class="tab-content" id="myTabContent7">


                                                <div class="tab-pane fade show active" id="materialLibrary-justify" role="tabpanel" aria-labelledby="materialLibrary-tab-justify">
                                                    <form class="" method="post" action="spendAnalysisLibrary1.do" id="SpendAnalysisLibraryform">

                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                        <input type="hidden" name="mainvalue" id="mainvalue" value="">
                                                        <input type="hidden" name="spendValuesJavaLib" id="spendValuesJavaLib" value="">
                                                        <input type="hidden" name="typeofRequestLib" id="typeofRequestLib" value="">
                                                        <input type="hidden" name="removeCartValuesLib" id="removeCartValuesLib" value="">
                                                        <input type="hidden" name="requestTypeLib" id="requestTypeLib" value="">
                                                        <input type="hidden" name="companyCodeLib" id="companyCodeLib" value="">
                                                         <input type="hidden" name="tenderTitleLib" id="tenderTitleLib" value="">
                                                        <input type="hidden" name="contractTypeLib" id="contractTypeLib" value="">
                                                        <input type="hidden" name="costCentreLib" id="costCentreLib" value="">
                                                        <input type="hidden" name="uniqueIDMatLib" id="uniqueIDMatLib" value="">
                                                        
                                                        <div class="row">
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <!--<div class="card">-->
                                                                <!--<h5 class="card-header bg-primary">PR Details</h5>-->
                                                                <div class="card-body" style="padding-top: 0em;">
                                                                    <!--<div class="row">-->
                                                                    <!--<div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">-->
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered table-hover sarlib-details" id="sarlib_details">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th class="noExportLib" scope="col" style = "width:35px">
                                                                                        <c:if test="${spendAnalysisLibrary.size() > 0}">
                                                                                            <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                                        </c:if>
                                                                                    </th>
                                                                                                                <th class="" scope="col">Bucket Name</th>
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
                                                                                <c:forEach var="Cont" items="${spendAnalysisLibrary}" varStatus="status">
                                                                                    <tr>
                                                                                                                    <td align="center" style = "width:68px"><input type="checkbox" value="${Cont.sno}" class="spendLib-checkbox-class"></td>
                                                                                                                    <td align="left">${Cont.bucketNameLib}</td>
                                                                                                                    <td align="left">${Cont.materialSVSNumber}</td>
                                                                                                                    <td align="left">${Cont.materialServiceDescription}</td>
                                                                                                                    <td style="display:none;">${Cont.poLong}</td>
                                                                                                                    <td align="center">
                                                                                                                        <a href="#" class="longTextClassSARLib" title="PO Text" data-toggle="tooltip" data-placement="auto">
                                                                                                                            <i class="fa fa-file" aria-hidden="true"></i>
                                                                                                                        </a>
                                                                                                                        <input type="hidden" name="longTextId" class="longTextClassSARLib" value="${Cont.poLong}">
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
<!--                                                                </secauthorize>                     </div>-->
                                                                <!--</div>-->
                                                            </div>
                                                                <br>
                                                                 <div class="row">
                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">


                                                                    <div class="align-center text-align-center">

                                                                        <input type="button" class="btn btn-primary btn-rounded" id="assignSpend1" value="Create Tender">
                                                                        <input type="button" class="btn btn-primary btn-rounded" id="removecartLib" value="Remove from Library">
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>

                                                   

                                                        </div>
                                                    </div>

                                                </form>
                                            </div>

                                           <div class="tab-pane fade show " id="serviceLibrary-justify" role="tabpanel" aria-labelledby="serviceLibrary-tab-justify">

                                                    
                                                                                <form class="" method="post" action="spendAnalysisLibrary2.do" id="SpendAnalysisLibraryform2">

                                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                                    
                                                                                    <input type="hidden" name="removeCartValuesSVCLib" id="removeCartValuesSVCLib" value="">
                                                                                    <input type="hidden" name="spendValuesJavaSVCLib" id="spendValuesJavaSVCLib" value="">
                                                                                    <input type="hidden" name="typeofRequestSVCLib" id="typeofRequestSVCLib" value="">
                                                                                    <input type="hidden" name="mainvalueSVC" id="mainvalueSVC" value="">
                                                                                    <input type="hidden" name="spoc_contractLib" id="spoc_contractLib" value="">
                                                                                    <input type="hidden" name="uniqueIDSvcLib" id="uniqueIDSvcLib" value="">
                                                                                    <input type="hidden" name="requestTypeLibSVC" id="requestTypeLibSVC" value="">
                                                                                    <input type="hidden" name="companyCodeLibSVC" id="companyCodeLibSVC" value="">
                                                                                     <input type="hidden" name="tenderTitleLibSVC" id="tenderTitleLibSVC" value="">
                                                                                    <input type="hidden" name="contractTypeLibSVC" id="contractTypeLibSVC" value="">
                                                                                    <input type="hidden" name="costCentreLibSVC" id="costCentreLibSVC" value="">
                                                                                    <input type="hidden" name="replyDateLibSVC" id="replyDateLibSVC" value="">
                                                                                    <input type="hidden" name="documentsLibSVC" id="documentsLibSVC" value="">
                                                                                    <input type="hidden" name="terminationLibSVC" id="terminationLibSVC" value="">
                                                                                    



                                                                                    <div class="row">
                                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                                                                            <div class="card-body" style="padding-top: 0em;">

                                                                                                <div class="table-responsive">
                                                                                                    <table class="table table-bordered table-hover sarSVC-DetailsLib" id="sarSVC_DetailsLib">
                                                                                                        <thead class="">
                                                                                                            <tr class="">
                                                                                                                <th class="noExport2" scope="col">
                                                                                                                 <!--   <cif test="{spendAnalysisReportList.size() > 0}">
                                                                                                                        <input type="checkbox" class="select-all-prline" title="Select All"/>
                                                                                                                    </cif>  -->
                                                                                                                    <input type="checkbox" class="select-all-prline" title="Select All"/> 
                                                                                                                </th>
														<th class="" scope="col">Bucket Name</th>
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
                                                                                                                    <td align="center" style = "width:35px"><input type="checkbox" value="${Cont.sno}" class="spendSVCLib-checkbox-class"></td>
                                                                                                                    <td align="left">${Cont.bucketNameLib}</td>
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
                                                                                                            <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Spoc name..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="spoc_contractSVClib" name="spoc_contractSVClib">
                                                                                                                <!--<select>-->
                                                                                                                <c:forEach var="user" items="${spocusers}">
                                                                                                                    <option value="${user.userName}">${user.userName}</option>
                                                                                                                </c:forEach>
                                                                                                            </select>

                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="assignSpendSVCLib" value="Send for SOW">
                                                                                                    <input type="button" class="btn btn-primary btn-rounded" id="removecartSVCLib" value="Remove from Library">
                                                                                                    
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
                            
                            
                            
                            
                            <div class="modal fade" id="longTextModalSARLib" tabindex="-1" role="dialog" aria-labelledby="longTextLabel" aria-hidden="true">
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
                            
                            
                            
                            <div class="modal fade" id="addInfoSpendAnalysisReportLib" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
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
                                                                        <label for="modrequestTypeLib" class="">Request Type</label>
                                                                        <select class="form-control-sm custom-select" id="modrequestTypeLib" name="modrequestTypeLib" required>
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
                                                                        <label for="modcompanyCodeLib">Company Code</label>
                                                                        <select class="form-control-sm custom-select" id="modcompanyCodeLib" name="modcompanyCodeLib" required>
                                                                            <option value="">--Select--</option>
                                                                           <option value="${companyCode}">${companyCode}</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="modtenderTitleLib" class="">Tender Title</label>
                                                                            <input type="text" class="form-control form-rounded" id="modtenderTitleLib" name="modtenderTitleLib">

                                                                        </div>
                                                                </div>

                                                            </div>
                                                    
                                                    <div class="row">
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcontractTypeLib">Contract Type</label>
                                                                        <select class="form-control-sm custom-select" id="modcontractTypeLib" name="modcontractTypeLib" required>
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
                                                                        <label for="modcostCentreLib" class="">User Cost Centre</label>
                                                                        <input type="text" class="form-control form-rounded" id="modcostCentreLib" name="modcostCentreLib">
                                                                    </div>
                                                                </div>
                                                        
                                                                </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="assignModelBtnLib">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                         
                    <!--------------------------------------------Ram------------------------------------------------------------------------------------------------------->
                    
                    <div class="modal fade" id="addInfoSpendAnalysisReportLibSVC" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
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
                                                                        <label for="modrequestTypeLibSVC" class="">Request Type</label>
                                                                        <select class="form-control-sm custom-select" id="modrequestTypeLibSVC" name="modrequestTypeLibSVC" required>
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
                                                                        <label for="modcompanyCodeLibSVC">Company Code</label>
                                                                        <select class="form-control-sm custom-select" id="modcompanyCodeLibSVC" name="modcompanyCodeLibSVC" required>
                                                                            <option value="">--Select--</option>
                                                                           <option value="${companyCode}">${companyCode}</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="modtenderTitleLibSVC" class="">Tender Title</label>
                                                                            <input type="text" class="form-control form-rounded" id="modtenderTitleLibSVC" name="modtenderTitleLibSVC">

                                                                        </div>
                                                                </div>

                                                            </div>
                                                    
                                                    <div class="row">
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modcontractTypeLibSVC">Contract Type</label>
                                                                        <select class="form-control-sm custom-select" id="modcontractTypeLibSVC" name="modcontractTypeLibSVC" required>
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
                                                                        <label for="modcostCentreLibSVC" class="">User Cost Centre</label>
                                                                        <input type="text" class="form-control form-rounded" id="modcostCentreLibSVC" name="modcostCentreLibSVC">
                                                                    </div>
                                                                </div>
                                                        
                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                    <div class="form-group">
                                                                        <label for="modreplyDateLibSVC" class="">Reply Date To Buyer</label>
                                                                        <div class="input-group date" id="activationDate_div" data-target-input="nearest">
                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="modreplyDateLibSVC" name="modreplyDateLibSVC" data-target="" />
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
                                                                            <label for="moddocumentsLibSVC" class="">Documents & Invocing </label>
                                                                            <input type="text" class="form-control form-rounded" id="moddocumentsLibSVC" name="moddocumentsLibSVC">

                                                                        </div>
                                                                </div>
                                                        
                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="modterminationLibSVC" class="">Termination</label>
                                                                            <input type="text" class="form-control form-rounded" id="modterminationLibSVC" name="modterminationLibSVC">

                                                                        </div>
                                                                </div>   
                                                                
                                                                </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" id="assignModelBtnLibSVC">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!---------------------------------------------------------------Ram------------------------------------------------------------------------------------>
                    
                    <div class="modal fade" id="costCenterModalLib" tabindex="-1" role="dialog" aria-labelledby="costCenterLabel" aria-hidden="true" z-index="9999" position="fixed">
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
                                                                            <table class="table table-hover table-bordered costCenterTableLib-Class" id="costCenterTableIdLib" style="width: 100%">
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
                    <div class="modal fade" id="costCenterModalLibSVC" tabindex="-1" role="dialog" aria-labelledby="costCenterLabel" aria-hidden="true" z-index="9999" position="fixed">
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
                                                                            <table class="table table-hover table-bordered costCenterTableLibSVC-Class" id="costCenterTableIdLibSVC" style="width: 100%">
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
                                        msg: "Work Item is created with Transaction id - " + resID[0] + ", RefNo - " + resID[1]
                                    });
                                    return true;
                                    ;
                                }
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


                        </body>

                        </html>

