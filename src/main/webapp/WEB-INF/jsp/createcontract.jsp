
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

        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_arrows.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_circles.min.css">
        <link rel="stylesheet" href="assets/step-wizard/css/smart_wizard_theme_dots.min.css">

        <!--<link rel="stylesheet" href="assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">-->

        <!--<link href="assets/vendor/gijgo/css/gijgo.min.css" rel="stylesheet" type="text/css" />-->

        <link href="assets/vendor/choosen/css/chosen.min.css" rel="stylesheet" type="text/css" />

        <link rel="stylesheet" type="text/css" href="assets/vendor/lobibox/css/lobibox.min.css">

        <link rel="stylesheet" href="assets/css/custom.css">
        <link rel="stylesheet" href="assets/css/contract.css">

        <link rel="stylesheet" href="assets/vendor/datepicker/tempusdominus-bootstrap-4.css" />

        <link rel="stylesheet" href="assets/vendor/bootstrap-select/css/bootstrap-select.css">
        <link rel="stylesheet" href="assets/vendor/summernote/css/summernote-bs4.css">

        <style>
            .table thead th{
                background-color: #5969ff !important;
                color: white !important;
            }

            .lobibox-footer {
                background-color:whitesmoke !important;
            }
            .createRFQOLA {
                position: fixed;
                /*top: 70px;*/
                right: 45%;
                bottom: 10px;
                z-index: 999;
            }

        </style>

        <title>Create Contract</title>
    </head>
    <body>
        <div class="dashboard-main-wrapper">

            <%@include file = "template.jsp" %>


            <!-- ============================================================== -->
            <div class="dashboard-wrapper">
                <div class="">
                    <div class="container-fluid dashboard-content ">
                        <!-- ============================================================== -->
                        <!-- pageheader  -->
                        <!-- ============================================================== -->

                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="page-header">
                                    <h2 class="pageheader-title">Create Contract</h2>
                                    <!--<p class="pageheader-text">Nulla euismod urna eros, sit amet scelerisque torton lectus vel mauris facilisis faucibus at enim quis massa lobortis rutrum.</p>-->
                                    <div class="page-breadcrumb">
                                        <nav aria-label="breadcrumb">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item active" aria-current="page"><a href="pendingprlines.do" title="Back" class="breadcrumb-link">Create Contract / Contracts </a></li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ============================================================== -->
                        <!-- end pageheader  -->
                        <!-- ============================================================== -->
                        <div class="">

                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                                    <div class="card">
                                        <!--<h5 class="card-header">Contract Status Panel</h5>-->
                                        <div class="card-body">
                                            <form action="createcontract.do" id="createcontractform" method="post">
                                                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                <input type="hidden" id="contractRefId" name="contractRefId" value="${contractRefId}">
                                                <input type="hidden" id="reqType" name="reqType" value="${reqType}">
                                                <input type="hidden" id="ro_costCenter" name="ro_costCenter">
                                                <input type="hidden" id="rfqid" name="rfqid" value="${contractVendorRfqLineItem.get(0).getContractVendorRfqHeaderId().getNgBpContractRfqHeaderRfqid().getRfqid()}">
                                                
                                               <input type="hidden" name="dmsip" id="dmsip" value="${PONGwebserviceIp}">
                                                <input type="hidden" name="WebServiceCallIp" id="WebServiceCallIp" value="${WebServiceCallIp}">

                                                <div class="row">
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                                                        <div class="form-group">
                                                            <label for="companyCode" class="">Company Code: </label>
                                                            <input type="text" class="form-control form-rounded" id="companyCode" name="companyCode" value="${contract.companyCode}" disabled />
                                                            
                                                            
<!--                                                            <select id="companyCode" class="custom-select">
                                                                <option value="0640">0640</option>
                                                            </select>-->
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                                                        <div class="form-group">
                                                            <label for="request_for" class="">Request For: </label>
                                                            <input type="text" class="form-control form-rounded" id="requestType" name="requestType" value="${contract.requestFor}" disabled />
<!--                                                            <select id="companyCode" class="custom-select">
                                                                <option value="" selected=""></option>
                                                            </select>-->
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="contract_type" class="">Contract Type: </label>
                                                            <input type="text" class="form-control form-rounded" id="contractType" name="contractType" value="${contract.contractType}" disabled />
<!--                                                            <select id="contract_type" class="custom-select">
                                                                <option>Standard Service Contract</option>
                                                            </select>-->
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="vendorname" class="">Vendor Name: </label>
                                                            <input type="text" class="form-control form-rounded" id="vendorname" name="vendorname" value="${vendorObj.vendorName} " disabled />
<!--                                                            <select id="contract_type" class="custom-select">
                                                                <option>Standard Service Contract</option>
                                                            </select>-->
                                                        </div>
                                                    </div>
                                                </div>
<div class="row">
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                        <div class="form-group">
                                                            <label for="vendorcode" class="">Vendor Code: </label>
                                                            <input type="text" class="form-control form-rounded" id="vendorcode" name="vendorcode" value="${vendorObj.vendorCode}" disabled />
<!--                                                            <select id="contract_type" class="custom-select">
                                                                <option>Standard Service Contract</option>
                                                            </select>-->
                                                        </div>
                                                    </div>


                                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="rfqno" class="">RFQ Number</label>
                                                                                    <input type="text" class="form-control form-rounded" id="rfqno" name="rfqno"value="${contractVendorRfqLineItem.get(0).contractVendorRfqHeaderId.ngBpContractRfqHeaderRfqid.rfqNumber}" disabled>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="rfqdate" class="">RFQ Date</label>

                                                                                    <div class="input-group date" id="rfqdate_div" data-target-input="nearest">
                                                                                        <input type="text" class="form-control datetimepicker-input manual-date-input-check" value="<fmt:formatDate value="${contractVendorRfqLineItem.get(0).contractVendorRfqHeaderId.ngBpContractRfqHeaderRfqid.creationdate}" pattern="dd-MM-yyyy"></fmt:formatDate>" readonly  disabled id="rfqdate" name="rfqdate" />
                                                                                        <div class="input-group-append" data-target="#rfqdate_div" data-toggle="datetimepicker">
                                                                                            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
</div>
<c:if test='${reqType != "Material"}'>
                                                <div class="row">
                                                    <div class="col-12 col-lg-12 col-sm-12">
                                                        <div class="btn-group" role="group" style="padding: 8px;margin-left: 910px;">
                                                            <!--<div class="btn-group" role="group" style="padding: 10px;text-align: right;">-->
                                                            <button class="btn btn-primary" id="prev-btn" type="button">Previous</button>
                                                            <button class="btn btn-primary next-btn" id="next-btn" type="button">Next</button>
                                                            <button class="btn btn-info save-btn" id="save-btn" type="button">Save</button>
                                                            <button class="btn btn-success finish-btn" id="finish-btn" type="button">Finish</button>
                                                            <button class="btn btn-default" id="reset-btn" type="button">Reset</button>
                                                        </div>
                                                    </div>
                                                </div>
</c:if>
                                                <div id="smartwizard">
                                                    <ul>
                                                        <li><a href="#step-1"><small>Create OLA</small></a></li>
                                                        <c:if test='${reqType != "Material"}'>
                                                        <li><a href="#step-2"><small>Contract Details</small></a></li>
                                                        <li><a href="#step-3"><small>Scope of Work</small></a></li>
                                                        <li><a href="#step-4"><small>SLA / Safety</small></a></li>
                                                        <li><a href="#step-5"><small>Documents / Termination</small></a></li>
                                                        </c:if>
                                                    </ul>
                                                    <input type="hidden" name="hd_action" id="hd_action" value="Pending">
                                                    <input type="hidden" name="rfq_operation" id="rfq_operation" value="ccreate">
                                                    <div>
                                                        <div id ="step-1" class ="">
                                                            <ul class="nav nav-tabs nav-fill" role="tablist">
                                                                <li class="nav-item">
                                                                    <a class="nav-link active" id="generaldata-tab-justify" data-toggle="tab" href="#generaldata-justify" role="tab" aria-controls="generaldata" aria-selected="true">General Data</a>
                                                                </li>
                                                                <li class="nav-item">
                                                                    <a class="nav-link" id="datadetails-tab-justify" data-toggle="tab" href="#datadetails-justify" role="tab" aria-controls="datadetails" aria-selected="false">Data Details</a>
                                                                </li>
                                                            </ul>

                                                            <div class="tab-content">
                                                                <div class="tab-pane fade show active" id="generaldata-justify" role="tabpanel" aria-labelledby="generaldata-tab-justify">
                                                                    
                                                                    <div class="card">
                                                                        <div class="card-header bg-primary">
                                                                            Agreement Data
                                                                        </div>
                                                                        <div class="card-body">
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="finalagreementvalue" class="">Final Agreement Value </label>
                                                                                        <input type="text" class="form-control form-rounded" value="${contractVendorRfqLineItem.get(0).contractVendorRfqHeaderId.buyerPriceOfferedTotal}" id="finalagreementvalue" name="finalagreementvalue" readonly>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="agreementtype" class="">Agreement Type</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderAgInfoList.size() == 0 ? '' :  cmHeaderAgInfoList.get(0).getAgreementType()}" id="agreementtype" name="agreementtype" readonly>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="agreementdate" class="">Agreement Date</label>

                                                                                        <div class="input-group date" id="agreementdate_div" data-target-input="nearest">
                                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" value="<fmt:formatDate value="${cmHeaderAgInfoList.size() == 0 ? '' :  cmHeaderAgInfoList.get(0).getAgreementDate()}" pattern="dd-MM-yyyy"></fmt:formatDate>" id="agreementdate" name="agreementdate" />
                                                                                            <div class="input-group-append" data-target="#agreementdate_div" data-toggle="datetimepicker">
                                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="validitystartdate" class="">Validity Start Date</label>

                                                                                        <div class="input-group date" id="validitystartdate_div" data-target-input="nearest">
                                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" value="<fmt:formatDate value="${cmHeaderAgInfoList.size() == 0 ? '' :  cmHeaderAgInfoList.get(0).getValidityStartDate()}" pattern="dd-MM-yyyy"></fmt:formatDate>"  id="validitystartdate" name="validitystartdate" />
                                                                                            <div class="input-group-append" data-target="#validitystartdate_div" data-toggle="datetimepicker">
                                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="validityenddate" class="">Validity End Date</label>

                                                                                        <div class="input-group date" id="validityenddate_div" data-target-input="nearest">
                                                                                            <input type="text" class="form-control datetimepicker-input manual-date-input-check" value="<fmt:formatDate value="${cmHeaderAgInfoList.size() == 0 ? '' :  cmHeaderAgInfoList.get(0).getValidityEndDate()}" pattern="dd-MM-yyyy"></fmt:formatDate>"  id="validityenddate" name="validityenddate" />
                                                                                            <div class="input-group-append" data-target="#validityenddate_div" data-toggle="datetimepicker">
                                                                                                <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="duration" class="">Duration</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderAgInfoList.size() == 0 ? '' : cmHeaderAgInfoList.get(0).getDuration()}" id="duration" name="duration">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="" class="">Currency </label>
<!--                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderAgInfoList.size() == 0 ? '' : cmHeaderAgInfoList.get(0).getCurrency()}" id="hiddenCurrency" name="hiddenCurrency">-->
                                                                                        <select class="selectpicker show-tick show-menu-arrow currencyAdmClass form-control"  title="Choose Currency..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="currency" name="currency">
                                                                                            
                                                                                            <optgroup>
                                                                                                
                                                                                                <c:forEach var="currencyList" items="${currencyList}" varStatus="status">
                                                                                                    <c:choose>
                                                                                                    <%--<c:when  test="${cmHeaderAgInfoList.size() == 0 ? '' : cmHeaderAgInfoList.get(0).getCurrency().trim() == currencyList.currencyCode.trim()}">--%>
                                                                                                    <c:when  test="${contractVendorRfqLineItem.size() == 0 ? '' : contractVendorRfqLineItem.get(0).currency.trim() == currencyList.currencyCode.trim()}">    
                                                                                                        <option value="${currencyList.currencyCode.trim()}" selected>${currencyList.currencyCode.trim()}</option>
                                                                                                    </c:when >
                                                                                                       <c:otherwise > 
                                                                                                          
                                                                                                    <option value="${currencyList.currencyCode.trim()}">${currencyList.currencyCode.trim()}</option>
                                                                                                       </c:otherwise>
                                                                                                    </c:choose>
                                                                                                </c:forEach>
                                                                                                    
                                                                                            </optgroup>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card">
                                                                        <div class="card-header bg-primary">
                                                                            OLA Administrative Fields
                                                                        </div>
                                                                        <div class="card-body">
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="PurchOrganization" class="">Purch. Organization </label>
                                                                                        <!--   <select id="PurchOrganization" name="PurchOrganization" class="custom-select">
                                                                                               <option>Select</option>
                                                                                           </select>-->
                                                                                        <select class="selectpicker show-tick show-menu-arrow form-control" value="${cmHeaderOLAInfoList.size() == 0 ? '' : cmHeaderOLAInfoList.get(0).getPurchaseOrganization()}" title="Choose Purchase Org..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="PurchOrganization" name="PurchOrganization">
                                                                                            <!--<select>-->
                                                                                            <c:forEach var="user" items="${purchaseList}">
                                                                                                 <c:choose>
                                                                                                    <c:when test="${cmHeaderOLAInfoList.size() == 0 ? '' : cmHeaderOLAInfoList.get(0).getPurchaseOrganization().trim() == user.purchaseOrgCode.trim()}">  
                                                                                                <option value="${user.purchaseOrgCode.trim()}" selected>${user.purchaseOrgCode} - ${user.purchaseOrgDesc}</option>
                                                                                                 </c:when>
                                                                                                 <c:otherwise>  
                                                                                                       <option value="${user.purchaseOrgCode.trim()}" >${user.purchaseOrgCode} - ${user.purchaseOrgDesc}</option>
                                                                                                 </c:otherwise>
                                                                                                 </c:choose>
                                                                                            </c:forEach>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="PurchaseGroup" class="">Purchase Group </label>
                                                                                        <!--   <select id="PurchaseGroup" name="PurchaseGroup" class="custom-select">
                                                                                               <option>Select</option>
                                                                                           </select>-->
                                                                                        <select class="selectpicker show-tick show-menu-arrow form-control" value="${cmHeaderOLAInfoList.size() == 0 ? '' : cmHeaderOLAInfoList.get(0).getPurchaseGroup()}" title="Choose Purchase Group..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="PurchaseGroup" name="PurchaseGroup">
                                                                                            <!--<select>-->
                                                                                            
                                                                                            <c:forEach var="user" items="${masterPurchasingGroupList}">
                                                                                                 <c:choose>
                                                                                                    <c:when test="${cmHeaderOLAInfoList.size() == 0 ? '' : cmHeaderOLAInfoList.get(0).getPurchaseGroup().trim() == user.purchasingGroupCode.trim()}"> 
                                                                                                <option value="${user.purchasingGroupCode}" selected>${user.purchasingGroupCode} - ${user.purchasingGroupDesc}</option>
                                                                                                </c:when>
                                                                                                 <c:otherwise> 
                                                                                                <option value="${user.purchasingGroupCode}" >${user.purchasingGroupCode} - ${user.purchasingGroupDesc}</option>
                                                                                                </c:otherwise>
                                                                                                 </c:choose>
                                                                                            </c:forEach>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ItemIntervalNumber" class="">Item Interval Number </label>
                                                                                        <!--   <select id="ItemIntervalNumber" name="ItemIntervalNumber" class="custom-select">
                                                                                               <option>Sel</option>
                                                                                           </select>-->
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderOLAInfoList.size() == 0 ? '' : cmHeaderOLAInfoList.get(0).getItemIntervalNo()}" id="ItemIntervalNumber" name="ItemIntervalNumber">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="SubItemInterval" class="">Sub Item Interval</label>
                                                                                        <!--                                                                                        <select id="SubItemInterval" name="SubItemInterval" class="custom-select">
                                                                                                                                                                                    <option>Sel</option>
                                                                                                                                                                                </select>-->
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderOLAInfoList.size() == 0 ? '' : cmHeaderOLAInfoList.get(0).getSubItemInterval()}" id="SubItemInterval" name="SubItemInterval">
                                                                                        <!--                                                                                        <input type="text" value="" class="form-control form-rounded" id="SubItemInterval" name="SubItemIntervals">-->
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <!--<label for="GRMessage" class="">GR Message</label>-->
                                                                                        <label class="custom-control custom-checkbox">
                                                                                             <c:choose>
                                                                                                    <c:when test="${cmHeaderOLAInfoList.size() == 0 ? '' : cmHeaderOLAInfoList.get(0).getGR_Message() =='on'}">
                                                                                            <input type="checkbox" name="GRMessage" id="GRMessage" class="custom-control-input" checked><span class="custom-control-label">GR Message</span>
                                                                                            </c:when>
                                                                                                 <c:otherwise> 
                                                                                                <input type="checkbox" name="GRMessage" id="GRMessage" class="custom-control-input" ><span class="custom-control-label">GR Message</span>
                                                                                            </c:otherwise>
                                                                                                 </c:choose>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card">
                                                                        <div class="card-header bg-primary">
                                                                            Terms of Delivery and Payment
                                                                        </div>
                                                                        <div class="card-body">
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="AgreedPaymentTerms" class="">Agreed Payment Terms</label>
                                                                                        <!--      <select id="AgreedPaymentTerms" name="AgreedPaymentTerms" class="custom-select">
                                                                                                  <option>Sel</option>
                                                                                              </select>-->
                                                                                        <select class="selectpicker show-tick show-menu-arrow form-control"  title="Choose Payment Terms..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="AgreedPaymentTerms" name="AgreedPaymentTerms">
                                                                                            <!--<select>-->
                                                                                            <c:forEach var="user" items="${paymentList}">
                                                                                                <c:choose>
                                                                                                    <%--<c:when test="${cmHeaderTermsDPInfoList.size() == 0 ? '' : cmHeaderTermsDPInfoList.get(0).getAgreedPaymentTerms().trim() == user.paymentTerms.trim()}">--%> 
                                                                                                    <c:when test="${contractVendorRfqLineItem.get(0).contractVendorRfqHeaderId.paymentterms.trim() == user.paymentTerms.trim()}">
                                                                                                <option value="${user.paymentTerms}" selected>${user.paymentTerms} - ${user.description}</option>
                                                                                                 </c:when>
                                                                                                 <c:otherwise>  
                                                                                                    <option value="${user.paymentTerms}" >${user.paymentTerms} - ${user.description}</option>
                                                                                                 </c:otherwise>
                                                                                                 </c:choose>
                                                                                            </c:forEach>
                                                                                        </select>

                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="paymentindays" class="">Payment In (Days)</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderTermsDPInfoList.getPaymentIn()}" id="paymentindays" name="paymentindays">  
<!--                                                                                        <input type="text" class="form-control form-rounded" value="${paymentTermvalue.getPaymentDays1()}" id="paymentindays" name="paymentindays">-->
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="paymentinperc" class="">Payment In (%)</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderTermsDPInfoList.getPaymentInPerc()}" id="paymentinperc" name="paymentinperc">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="paymentindays2" class="">Payment In (Days)</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderTermsDPInfoList.getPaymentInDaysNet()}" id="paymentindays2" name="paymentindays2">
<!--                                                                                        <input type="text" class="form-control form-rounded" value="${paymentTermvalue.getPaymentDays2()}" id="paymentindays2" name="paymentindays2">-->
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="paymentinperc2" class="">Payment In (%)</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderTermsDPInfoList.getPaymentInPerc()}" id="paymentinperc2" name="paymentinperc2">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="paymentindaysnet" class="">Payment In (Days Net)</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderTermsDPInfoList.getPaymentInDaysNet()}" id="paymentindaysnet" name="paymentindaysnet"> 
                                                                                        <!--<input type="text" class="form-control form-rounded" value="${paymentTermvalue.getPaymentDays3()}" id="paymentindaysnet" name="paymentindaysnet">-->
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ExchangeRate" class="">Exchange Rate</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderTermsDPInfoList.getExchangeRate()}" id="ExchangeRate" name="ExchangeRate">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ExchangeRateFixed" class="">Exchange Rate Fixed</label>
                                                                                        <label class="custom-control custom-checkbox">
                                                                                           <c:choose>
                                                                                                    <c:when test="${cmHeaderTermsDPInfoList.getExchangeRateFixed() =='on'}">
                                                                                                <input type="checkbox" name="ExchangeRateFixed" id="ExchangeRateFixed"  class="custom-control-input" checked><span class="custom-control-label">Yes</span>
                                                                                            </c:when>
                                                                                            <c:otherwise>
                                                                                                <input type="checkbox" name="ExchangeRateFixed" id="ExchangeRateFixed"  class="custom-control-input" ><span class="custom-control-label">Yes</span>
                                                                                                    </c:otherwise>
                                                                                           </c:choose>
                                                                                            
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="IncotermsPart1" class="">Incoterms Part 1</label>
                                                                                        <input type="text" class="form-control form-rounded inline" id="IncoTermsPart1" value="${cmHeaderTermsDPInfoList.getIncotermsPart1()}" name="IncoTermsPart1" style="width: 50px;margin-left: 32px;" data-parsley-trigger="change" data-parsley-maxlength="3" required="true">
                                                                                        <!--                                                                                        <select id="IncotermsPart1" name="IncotermsPart1" class="custom-select">
                                                                                                                                                                                    <option>Sel</option>
                                                                                                                                                                                </select>-->
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="IncotermsPart2" class="">Incoterms Part 2</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderTermsDPInfoList.getIncotermsPart2()}" id="IncotermsPart2" name="IncotermsPart2">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="card">
                                                                        <div class="card-header bg-primary">
                                                                            Reference Data
                                                                        </div>
                                                                        <div class="card-body">
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="YourReference" class="">Your Reference</label>
                                                                                        <input type="text" class="form-control form-rounded"  value="${cmHeaderReferenceInfoList.size() == 0 ? '' : cmHeaderReferenceInfoList.get(0).getYourReference()}" id="YourReference" name="YourReference">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="SalesPerson" class="">Sales Person</label>
                                                                                        <input type="text" class="form-control form-rounded"  value="${cmHeaderReferenceInfoList.size() == 0 ? '' : cmHeaderReferenceInfoList.get(0).getSalesPerson()}" id="SalesPerson" name="SalesPerson">
<!--                                                                                        <select id="SalesPerson" name="SalesPerson" class="custom-select">
                                                                                            <option>Select</option>
                                                                                        </select>-->
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="OurReference" class="">Our Reference</label>
                                                                                        <input type="text" class="form-control form-rounded" value="${cmHeaderReferenceInfoList.size() == 0 ? '' : cmHeaderReferenceInfoList.get(0).getOurReference()}" id="OurReference" name="OurReference">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Telephone" class="">Telephone</label>
<!--                                                                                        <select id="Telephone" name="Telephone" class="custom-select">
                                                                                            <option>Select</option>
                                                                                        </select>-->
                                                                                         <input type="text" class="form-control form-rounded" id="Telephone" name="Telephone" value="${cmHeaderReferenceInfoList.size() == 0 ? '' : cmHeaderReferenceInfoList.get(0).getTelephone()}" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="SupplVendor" class="">Suppl. Vendor</label>
<!--                                                                                        <select id="SupplVendor" name="SupplVendor" class="custom-select">
                                                                                            <option>Select</option>
                                                                                        </select>-->
                                                                                        <input type="text" class="form-control form-rounded" id="SupplVendor" name="SupplVendor" value="${vendorObj.vendorCode}" disabled />
                                                                                      
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="InvoicingParty" class="">Invoicing Party</label>
                                                                                        <select class="selectpicker show-tick show-menu-arrow form-control"  title="Choose Invoicing Party..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="InvoicingParty" name="InvoicingParty">
                                                                                        <c:forEach var="user" items="${vendorList}">
                                                                                                
                                                                                                <c:choose>
                                                                                                    
                                                                                                    <c:when test="${cmHeaderReferenceInfoList.get(0).getInvoicingParty().trim() == user.vendorCode.trim()}">
                                                                                                <option value="${user.vendorCode}" selected>${user.vendorCode} - ${user.vendorName}</option>
                                                                                                 </c:when>
                                                                                                 <c:otherwise>  
                                                                                                    <option value="${user.vendorCode}" >${user.vendorCode} - ${user.vendorName}</option>
                                                                                                 </c:otherwise>
                                                                                                 </c:choose>
                                                                                                 
                                                                                        </c:forEach>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade show" id="datadetails-justify" role="tabpanel" aria-labelledby="datadetails-tab-justify">
                                                                    <div class="row">
                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                            <div class="row">
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <!--<a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addContractItemRowBtnId" style="margin-left: 15%;margin-top: 10%;"></i></a>-->

                                                                                    </div>
                                                                                </div>

                                                                                <div class="table-responsive">
                                                                                    <table class="table table-bordered" id="contractItemTableId" style="width: 95%; margin-left: 2%;">
                                                                                        <thead class="table-header-color">
                                                                                            <tr class="border-0">

                                                                                                <th class="border-0">Item Number</th>
                                                                                                <th class="border-0">Account Assignment</th>
                                                                                                <th class="border-0">Item Category</th>
                                                                                                <th class="border-0">Material</th>
                                                                                                <th class="border-0">Short Text</th>
                                                                                                <th class="border-0">Targ. Qty</th>
                                                                                                <th class="border-0">Matl. Long Text</th>
                                                                                                <th class="border-0">UOM</th>
                                                                                                <th class="border-0">Per Price Unit</th>
                                                                                                <th class="border-0">Order Price Unit</th>
                                                                                                <th class="border-0">Net Price</th>
                                                                                                <th class="border-0">Matl. Group</th>
                                                                                                <th class="border-0">Plant</th>
                                                                                                <th class="border-0">SLoc</th>
                                                                                                <th class="border-0"></th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            <c:if test="${contractVendorRfqLineItem.size() > 0}">
                                                                                                <c:forEach var="Cont" items="${contractVendorRfqLineItem}" varStatus="status">
                                                                                                    <tr>


                                                                                                        <!--                                                                                                <td><input type="checkbox" class="checkboxServices" id="" name=""><input type="hidden" class="ServiceAccAssDist"><input type="hidden" class="saveSarviceAccountAssignment"></td>-->

                                                                                                        <td> <input type="hidden" class="form-control form-rounded linkIdClass tableInputField"  id="linkId" name="linkId" value="${Cont.newgenContractLineItemInsertionOrderID.linkid}">
                                                                                                            <!--<input type="hidden" class="form-control form-rounded accAsgnCommItemInputClass tableInputField"  id="accAsgnCommItemInput" name="accAsgnCommItemInput" >-->
                                                                                                            <input type="hidden" class="form-control form-rounded hgLAccountClass tableInputField" disabled="true"  id="hgLAccount" name="hgLAccount">
                                                                                                            <input type="hidden" class="form-control form-rounded hzgLAccountClass tableInputField" disabled="true"  id="hzgLAccount" name="hzgLAccount">
                                                                                                            <input type="text" class="form-control form-rounded lineItemNumberServices tableInputField" disabled="true" value="${Cont.newgenContractLineItemInsertionOrderID.itemNumber}" id="itemnumber" name="itemnumber"></td>
                                                                                                        <!--<td><input type="text" class="form-control form-rounded accountAssignmentClass tableInputField" id="accassignment" value=""  name="accassignment"></td>-->
                                                                                                        <td><input type="text" class="form-control form-rounded accountAssignmentClass tableInputField" id="accassignment" value="U" disabled name="accassignment"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded itemCategoryClass tableInputField" id="itemcategory" value="${Cont.newgenContractLineItemInsertionOrderID.itemCategory}"  name="itemcategory" disabled></td>
                                                                                                        <td><input type="text" class="form-control form-rounded materialCodeClass tableInputField" id="materialCode" value="${Cont.newgenContractLineItemInsertionOrderID.materialCode}"  name="materialCode" disabled></td>
                                                                                                        <td><input type="text" class="form-control form-rounded shortTextClass tableInputField check-negative-value" value="${Cont.newgenContractLineItemInsertionOrderID.shortText}"  min="0" id="shorttext" name="shorttext"></td>
                                                                                                        <!--<td><input type="number" class="form-control form-rounded targQtyClass tableInputField" id="targQty" value=""  name="targQty"></td>-->
                                                                                                        <td><input type="number" class="form-control form-rounded targQtyClass tableInputField" id="targQty" value="${Cont.usedQty}"  name="targQty"></td>
                                                                                                        <!--<td><input type="text" class="form-control form-rounded matlLongtxtClass tableInputField" id="matllongtext" value=""  name="matllongtext"></td>-->
                                                                                                        <td>
                                                                                                            <a href="#" class="matlLongTextClass" title="Long Text" data-toggle="tooltip" data-placement="auto">
                                                                                                                <i class="fa fa-file" aria-hidden="true"></i>
                                                                                                            </a>
                                                                                                            <input type="hidden" name="matllongtext" id="matllongtext" class="longTextHiddenClass" value="${Cont.newgenContractLineItemInsertionOrderID.matlLongText}">
                                                                                                        </td>
                                                                                                        <td><input type="text" class="form-control form-rounded uomClass tableInputField check-negative-value" min="0" value="${Cont.newgenContractLineItemInsertionOrderID.uoM}"  id="uom" name="uom"></td>
                                                                                                        <!--<td><input type="number" class="form-control form-rounded perUnitClass tableInputField" id="ppu" value=""  name="ppu"></td>-->
                                                                                                        <td><input type="number" class="form-control form-rounded perUnitClass tableInputField" id="ppu" value="${Cont.vendorpriceofferedperunit}"  name="ppu"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded orderPriUnClass tableInputField check-negative-value" value="${Cont.newgenContractLineItemInsertionOrderID.orderPriceUnit}"  id="opu" name="opu"></td>
                                                                                                        <!--<td><input type="number" class="form-control form-rounded netPriceClass tableInputField" id="np" value=""  name="np"></td>-->
                                                                                                        <td><input type="number" class="form-control form-rounded netPriceClass tableInputField" id="np" value="${Cont.vendorpriceofferedtotal}"  name="np"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded materialGrpClass tableInputField" id="matlgroup" value="${Cont.newgenContractLineItemInsertionOrderID.matlGroup}"  name="matlgroup"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded plantClass tableInputField" id="plant" value="${Cont.newgenContractLineItemInsertionOrderID.plant}"  name="plant"></td>
                                                                                                        <td><input type="text" class="form-control form-rounded SlocClass tableInputField" id="Sloc" value="${Cont.newgenContractLineItemInsertionOrderID.storageLocation}"  name="Sloc"></td>

                                                                                                            
                                                                                                            
                                                                                                            
                                                                                                    </tr>
                                                                                                </c:forEach>
                                                                                            </c:if>

                                                                                            <c:if test="${contractVendorRfqLineItem.size() == 0}">
                                                                                                <!--                                                                                            <tr>
                                                                                                                                                                                                        <td><input type="checkbox" class="checkboxServices" id="" name=""><input type="hidden" class="ServiceAccAssDist"><input type="hidden" class="saveSarviceAccountAssignment"></td>
                                                                                                
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded lineItemNumberServices tableInputField" disabled="true" value=10 id="itemnumber" name="itemnumber"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded accountAssignmentClass tableInputField" id="accassignment" name="accassignment"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded itemCategoryClass tableInputField" id="itemcategory" name="itemcategory"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded shortTextClass tableInputField check-negative-value" min="0" id="shorttext" name="shorttext"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded matlLongtxtClass tableInputField" id="matllongtext" name="matllongtext"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded uomClass tableInputField check-negative-value" min="0" id="uom" name="uom"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded perUnitClass tableInputField" id="ppu" name="ppu"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded orderPriUnClass tableInputField check-negative-value" id="opu" name="opu"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded netPriceClass tableInputField" id="np" name="np"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded plantClass tableInputField" id="plant" name="plant"></td>
                                                                                                                                                                                                <td><input type="text" class="form-control form-rounded materialGrpClass tableInputField" id="matlgroup" name="matlgroup"></td>
                                                                                                
                                                                                                                                                                                            </tr>-->
                                                                                            </c:if>

                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>

                                                                            </div>
                                                                            <br>
                                                                            <label for="Item" class="inline" style="margin-left:10px;margin-bottom:20px;">Item:</label>
                                                                            <select class="custom-select inline ItemNumberSelectClass" style="width:500px;margin-bottom:0px;margin-left:50px;" id="ItemNumberSelect" name="ItemNumberSelect">
                                                                                <option value="-Select-">--Select--</option>
                                                                                <c:forEach var="newgen" items="${newgenContractLineItemList}" varStatus="status">
                                                                                    <option value="${newgen.itemNumber}">${newgen.itemNumber} - ${newgen.shortText}</option>
                                                                                </c:forEach>
                                                                            </select>

                                                                            <!--<button type="button" class="btn btn-primary btn-sm" id="savePoLineItemData">Save</button>-->
                                                                            <button type="button" class="btn btn-warning btn-sm" id="savePoLineSpinner" style="pointer-events: none;visibility: hidden;"><i class="fa fa-spinner fa-spin"></i></button>

                                                                        </div>
                                                                        <div class="tab-regular" style="width: 95%;margin-left: 2%;display: none;" id="lineItemInfoTab">
                                                                            <ul class="nav nav-tabs nav-fill" role="tablist">
                                                                                <c:if test='${reqType == "Service"}'>
                                                                                <li class="nav-item">
                                                                                    <a class="nav-link active"   id="services-tab-justify" data-toggle="tab" href="#services-justify" role="tab" aria-controls="services" aria-selected="false">Services</a>
                                                                                </li>
                                                                                </c:if>
                                                                              <!--  <c:if test='${reqType == "Material"}'>
                                                                                <li class="nav-item">
                                                                                    <a class="nav-link active"  id="accountassignment-tab-justify" data-toggle="tab" href="#accountassignment-justify" role="tab" aria-controls="accountassignment" aria-selected="true">Account Assignment</a>
                                                                                </li>
                                                                                </c:if>
                                                                                
                                                                                                                                                                <li class="nav-item">
                                                                                                                                                                    <a class="nav-link" id="profitabilitysegment-tab-justify" data-toggle="tab" href="#profitabilitysegment-justify" role="tab" aria-controls="profitabilitysegment" aria-selected="false">Profitability Segment</a>
                                                                                                                                                                </li>-->
                                                                                <li class="nav-item">
                                                                                    <a class="nav-link" id="texts-tab-justify" data-toggle="tab" href="#texts-justify" role="tab" aria-controls="texts" aria-selected="false">Texts</a>
                                                                                </li>
                                                                            </ul>
                                                                           
                                                                            <div class="tab-content">
                                                                                 <c:if test='${reqType == "Material"}'>
                                                                                     <div class="tab-pane fade show active" id="accountassignment-justify" role="tabpanel" aria-labelledby="accountassignment-tab-justify" style="width: 95%; margin-left: 2%;display:none">
                                                                                         
                                                                                         
                                                                    <div class="card-body">
                                                                        <!--<h5>Account Assignment</h5>-->
                                                                        <input type="hidden" id="isAccountAssignmentTabSaved" value="No">
                                                                        <div class="row">
                                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="accountAssignmentCategory" class="inline">Acc. Ass Category: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="accountAssignmentCategoryDisplay" name="accountAssignmentCategoryDisplay" style="width:200px;margin-left:25px;" >
                                                                                    <input type="hidden" id="accountAssignmentCategory" name="accountAssignmentCategory">
                                                                                    <label for="distribution" class="inline" style="margin-left:50px;">Distribution: </label>
                                                                                    <select class="custom-select inline" id="distribution" name="distribution" style="width:200px;margin-left:25px;" >
                                                                                        <option value="Single Account Assignment">Single Account Assignment</option>
                                                                                        <option value="Distrib. On Quantity Basis">Distrib. On Quantity Basis</option>
                                                                                        <option value="Distrib. By Percentage">Distrib. By Percentage</option>
                                                                                    </select>
                                                                                    <label for="CoCode" class="inline" style="margin-left:50px;">Co Code: </label>
                                                                                    <input type="text" class="form-control form-rounded inline" id="CoCode" name="CoCode" style="width:200px;margin-left:25px;" >
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="costCenterDiv">                                     
                                                                            <div class="row">
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                    <!--<div class="modal-footer">-->
                                                                                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentchangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                                    <!--</div>-->
                                                                                </div>
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" style="display:none;">
                                                                                    <div class="form-group">
                                                                                        <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveAccAsgnFieldBtn" aria-hidden="true"></i></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div class="row">
                                                                                <input type="hidden"  class="" id="accLinkID" name="accLinkID"  >
                                                                                <input type="hidden"  class="" id="assAsgnQuantity" name="assAsgnQuantity" >
                                                                                <input type="hidden"  class="" id="assAsgnPercentage" name="assAsgnPercentage" value="" >
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="unloadingPoint" class="inline" id="unloadingPointLabel">Unlod. Point:</label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="unloadingPoint" name="unloadingPoint" style="width:100px;margin-left:25px;" data-parsley-trigger="change" data-parsley-maxlength="25">
                                                                                        <label for="recipient" class="inline" style="margin-left: 15px;" id="recipientLabel">Recipient:</label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="recipient" name="recipient" style="width:100px;margin-left:15px;" data-parsley-trigger="change" data-parsley-maxlength="12">
                                                                                        <label for="gLAccount" class="inline" style="margin-left: 15px;" id="gLAccountLabel">GL Account: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="gLAccount" name="gLAccount" style="width:100px;margin-left:30px;" data-parsley-trigger="change" data-parsley-maxlength="10" >
                                                                                        <label for="coArea" class="inline" id="coAreaLabel" style="margin-left:60px;">CO Area: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="coArea" name="coArea" style="width:100px;margin-left:35px;" >
                                                                                    </div>
                                                                                </div>
                                                                                <!--<div class="AccAsgn_K">-->
                                                                                <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="costCenterAccAsgn" id="accAsgCostCenterLabel" class="inline" style="margin-left:15px;">Cost Center: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="costCenterAccAsgn" name="costCenterAccAsgn" style="width:100px;margin-left:10px;" data-parsley-trigger="change" data-parsley-maxlength="10">
                                                                                        <label for="Order" class="inline" id="assAsgnorderLabel" style="margin-left:15px;">Order: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnOrder" name="Order" style="width:100px;margin-left:10px;">
                                                                                        <label for="accAsgnAsset" class="inline" id="accAsgnAssetLabel" style="margin-left:15px;">Asset: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnAsset" name="accAsgnAsset" style="width:100px;margin-left:10px;">
                                                                                        <label for="WBSElement" class="inline" id="wBSElementLabel" style="margin-left:15px;">WBS Element:</label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnWBSElementInput" name="WBSElement" style="width:100px;margin-left:10px;">
                                                                                        <label for="assAsgnSalesOrder" class="inline" id="accAsgnSalesOrderLabel" style="margin-left:15px;"> Sales Order: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnSalesOrder" name="assAsgnSalesOrder" style="width:100px;margin-left:5px;">
                                                                                        <label for="assAsgnItemNumber" class="inline" id="assAsgnItemNumLabel" style="margin-left:15px;"> Item Number: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="assAsgnItemNumber" name="assAsgnItemNumber" style="width:100px;margin-left:5px;">
                                                                                        <label for="assAsgnDelivSch" class="inline" id="assAsgnDelivSchLabel" style="margin-left:15px;"> Del Sch: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="assAsgnDelivSch" name="assAsgnDelivSch" style="width:100px;margin-left:5px;">
                                                                                        <label for="fund" class="inline" id="accAsgnFundLabel" style="margin-left:15px;">Fund: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnfund" name="fund" style="width:100px;margin-left:10px;">
                                                                                        <label for="functionalArea" class="inline" id="accAsgnfunctionalAreaLabel" style="margin-left:15px;">Functional Area: </label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnfunctionalArea" name="functionalArea" style="width:150px;margin-left:10px;">
                                                                                        <label for="fundCenter" class="inline" id="accAsgnFundCenterLabel">Fund Center:</label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnFundCenterInput" name="accAsgnFundCenterInput" style="width:150px;margin-left:10px;">
                                                                                        <label for="commitmentItem" class="inline" id="accAsgnCommItemLabel" style="margin-left:15px;">Com Item:</label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnCommItemInput" name="accAsgnCommItemInput" style="width:200px;margin-left:5px;">
                                                                                        <label for="NetActNumber" class="inline" id="accAsgnNActNumLabel" style="margin-left:10px;">N/Act.Num:</label>
                                                                                        <input type="text"  class="form-control form-rounded inline input-height" id="accAsgnNActNumInput" name="accAsgnNActNumInput" style="width:100px;margin-left:15px;">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="row" id="interCompanyAccAsgn" style="display:none;">
                                                                            <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                                <div class="form-group">
                                                                                    <label for="fund" class="inline" id="interCompanyFundLabel" style="margin-left:5px;">Fund: </label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFund" name="interCompanyFund" disabled style="width:100px;margin-left:43px;">
                                                                                    <label for="functionalArea" class="inline" id="interCompanyFunctionalAreaLabel" style="margin-left:15px;">Functional Area: </label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFunctionalArea" disabled name="interCompanyFunctionalArea" style="width:150px;margin-left:10px;">
                                                                                    <label for="fundCenter" class="inline" id="interCompanyFundCenterInputLabel" style="margin-left:20px;">Fund Center:</label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyFundCenterInput" disabled name="interCompanyFundCenterInput" style="width:150px;margin-left:10px;">
                                                                                    <label for="commitmentItem" class="inline" id="interCompanyCommItemInputLabel" style="margin-left:15px;">Com Item:</label>
                                                                                    <input type="text" class="form-control form-rounded inline input-height" id="interCompanyCommItemInput" disabled name="interCompanyCommItemInput" style="width:200px;margin-left:5px;">
                                                                                    <!--                                                                                    <label for="grant" class="inline" id="grantLabel" style="margin-left:10px;">Grant:</label>
                                                                                                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="grant" name="grant" style="width:100px;margin-left:5px;">-->
                                                                                </div>
                                                                            </div>
                                                                            <!--                                                                            <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                                                                                                            <label for="earMarkedFunds" class="inline" id="earMarkedFundsLabel" style="margin-left:10px;">Earmarked funds:</label>
                                                                                                                                                            <input type="text" class="form-control form-rounded inline input-height" id="earMarkedFunds" name="earMarkedFunds" style="width:200px;margin-left:15px;">
                                                                                                                                                            <input type="text" class="form-control form-rounded inline input-height" id="earMarkedFunds2" name="earMarkedFunds2" style="width:50px;">
                                                                                                                                                        </div>-->
                                                                        </div>
                                                                        <div class="multipleCostCenterDiv" style="display:none;">
                                                                            <div class="row">
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                    <!--<div class="modal-footer">-->
                                                                                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-sm btn-primary" id="costCenterAccountAssignmentTablechangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                                    <!--</div>-->
                                                                                </div>
                                                                                <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" style="display:none;">
                                                                                    <div class="form-group">
                                                                                        <a><i type="buttom"  class="fas fa-save btn-primary btn-sm" id="saveAccAsgnTblBtn" aria-hidden="true"></i></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="card-body">
                                                                                        <div class="table-responsive" style="height:260px;">
                                                                                            <table class="table table-bordered" id="costCenteraccountAssignmentTebleId">
                                                                                                <thead class="table-header-color">
                                                                                                    <tr class="border-0">
                                                                                                        <th class="border-0"></th>
                                                                                                        <th class="border-0 th-color">Quant</th>
                                                                                                        <th class="border-0 th-color">%</th>
                                                                                                        <th class="border-0 th-color">GL A/C</th>
                                                                                                        <th class="border-0 th-color">CO Area</th>
                                                                                                        <th class="border-0 th-color">Cost Center</th>
                                                                                                        <th class="border-0 th-color">Fund</th>
                                                                                                        <th class="border-0 th-color">Fun Area</th>
                                                                                                        <th class="border-0 th-color">Fund Center</th>
                                                                                                        <th class="border-0 th-color">Com Item</th>
                                                                                                        <th class="border-0 th-color">Unloading Point</th>
                                                                                                        <th class="border-0 th-color">Recipients</th>
                                                                                                        <th class="border-0 th-color">Order</th>
                                                                                                        <th class="border-0 th-color">Asset</th>
                                                                                                        <th class="border-0 th-color">WBS Elements</th>
                                                                                                        <th class="border-0 th-color">Sales Order</th>
                                                                                                        <th class="border-0 th-color">Network/Activity Number</th>
                                                                                                        <th class="border-0 th-color">Item Number</th>
                                                                                                        <th class="border-0 th-color">Delivery Schedule</th>
                                                                                                        <!--<th class="border-0 th-color" style="width:50px;"></th>-->
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>   
                                                                                                    <tr>
                                                                                                        <td></td>                                                                                                           <!--0-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnQuantity" value="" max=""></td>         <!--1-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnPercentage" value="" max=""></td>       <!--2-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnGLAccount" value=""></td>                 <!--3-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnCOArea" value=""></td>                    <!--4-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnCostCetner" value=""></td>                <!--5-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnFund" value=""></td>                      <!--6-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnFunctionalArea" value=""></td>            <!--7-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnFundCenter" value=""></td>                <!--8-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnCommitmentItem" value=""></td>            <!--9-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnUnloadingPoint" value=""></td>            <!--10-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnRecipients" value=""></td>                <!--11-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnOrder" value=""></td>                     <!--12-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnAssets" value=""></td>                    <!--13-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnWBSElement" value=""></td>                <!--14-->
                                                                                                        <!--<td><input type=text class="form-control form-rounded input-height accAsgnS_I_D" value=""></td>-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnSalesOrder" value=""></td>                 <!--15-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnNetActNumber" value=""></td>               <!--16-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnItemNumber" value=""></td>                 <!--17-->
                                                                                                        <td><input type="text" class="form-control form-rounded input-height accAsgnDeliverySchedule" value=""></td>           <!--18-->
                                                                                                    </tr>
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
                                                                            </c:if>
                                                                                <c:if test='${reqType == "Service"}'>
                                                                                <div class="tab-pane fade show active" id="services-justify" style="width: 95%; margin-left: 2%;" role="tabpanel" aria-labelledby="services-tab-justify">
                                                                                    <div class="row">
                                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <a><i type="button" class="fas fa-plus-circle btn-primary btn-sm" id="addContractServRowBtnId" style="margin-left: 15%;margin-top: 10%;"></i></a>

                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="serviceTabAccAssgnModelBtn_div" style="display:none;">
                                                                                            <div class="form-group">
                                                                                                <a><i type="buttom"  class="fa fa-arrow-circle-right btn-primary btn-sm" id="accountAssignmentAddBtn" aria-hidden="true"></i></a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <!--                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                                                    <div class="form-group">
                                                                                                                                                                                        <label for="ServiceNumber" class="">Service Number</label>
                                                                                                                                                                                        <input type="text" class="form-control form-rounded" id="ServiceNumber" name="ServiceNumber"/>
                                                                                                                                                                                        
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                                                    <div class="form-group">
                                                                                                                                                                                        <label for="ShortText" class="">Short Text</label>
                                                                                                                                                                                        <input type="text" class="form-control form-rounded" id="ShortText" disabled name="ShortText"/>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                                                    <div class="form-group">
                                                                                                                                                                                        <label for="Unit" class="">Unit</label>
                                                                                                                                                                                        <input type="text" class="form-control form-rounded" disabled id="Unit" name="Unit"/>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                                                    <div class="form-group">
                                                                                                                                                                                        <label for="Serv_Quantity" class="">Quantity</label>
                                                                                                                                                                                        <input type="text" class="form-control form-rounded" id="Serv_Quantity" name="Serv_Quantity"/>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                
                                                                                                                                                                            </div>
                                                                                                                                                                            <div class="row">
                                                                                                                                                                                
                                                                                                                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                                                    <div class="form-group">
                                                                                                                                                                                        <label for="GrossPrice" class="">Gross Price</label>
                                                                                                                                                                                        <input type="text" class="form-control form-rounded" id="GrossPrice" name="GrossPrice"/>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                                                                                                                    <div class="form-group">
                                                                                                                                                                                        <label for="Currency" class="">Currency</label>
                                                                                                                                                                                        <input type="text" class="form-control form-rounded" id="Currency" name="Currency"/>
                                                                                                                                                                                        <select class="selectpicker show-tick show-menu-arrow form-control" title="Choose Currency..." data-live-search-placeholder="Search" data-live-search="true" data-style="" data-width="100%" id="Serv-Currency" name="Serv-Currency">
                                                                                                                                                                                    <optgroup>
                                                                                        <c:forEach var="currencyList" items="${currencyList}" varStatus="status">
                                                                                            <option value="${currencyList.currencyCode}">${currencyList.currencyCode}</option>
                                                                                        </c:forEach>
                                                                                    </optgroup>
                                                                                </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Edition" class="">Edition</label>
                                                                                        <input type="text" class="form-control form-rounded" id="Edition" name="Edition"/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="align-center text-align-center">
                                                                                        <button title="Add" class="btn btn-primary"><i class="fas fa-plus-square fa-sm"></i></button>&nbsp;&nbsp;
                                                                                        <button title="Edit" class="btn btn-primary"><i class="fas fa-edit fa-sm"></i></button>&nbsp;&nbsp;
                                                                                        <button title="Delete" class="btn btn-primary"><i class="fas fa-trash-alt fa-sm"></i></button>
                                                                                    </div>
                                                                                </div>-->
                                                                                    </div>
                                                                                    <br>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                            <div class="table-responsive">
                                                                                                <table class="table" id="contractServiceTableId">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th class="border-0"></th>
                                                                                                            <th>Line Item Number</th>
                                                                                                            <th>Service Number</th>
                                                                                                            <th>Short Text</th>
                                                                                                            <th>Unit</th>
                                                                                                            <th>Quantity</th>
                                                                                                            <th>Gross Price</th>
                                                                                                            <th>Currency</th>
                                                                                                            <th>Edition</th>
                                                                                                            <th class="border-0"></th>

                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <c:if test="${cmHeaderServicesInfoList.size() > 0}">
                                                                                                            <c:forEach var="Cont" items="${cmHeaderServicesInfoList}" varStatus="status">
                                                                                                                <tr>
                                                                                                            <td>
                                                                                                                <input type='hidden' id='contlinkId' name='contlinkId' value="${Cont.getLinkId()}">
                                                                                                                <input type='hidden' id='serlinkId' name='serlinkId' value="${Cont.getServLinkId()}">
                                                                                                                <input type='checkbox' class='checkboxServices' id='' name=''></td>
                                                                                                            <td><input type='text' class='form-control form-rounded serviceItemNumber tableInputField' disabled='true' value="${Cont.getLineItemNo()}" id='itemnumber' name='itemnumber'></td>
                                                                                                            <td><input type='text' class='form-control form-rounded ServiceNumberClass tableInputField' id='ServiceNumber' value="${Cont.getServiceNo()}" name='ServiceNumber'></td>
                                                                                                            <td><input type='text' class='form-control form-rounded  ShortTextClass tableInputField' id='ShortText' value="${Cont.getShortText()}" disabled name='ShortText'></td>
                                                                                                            <td><input type='text' class='form-control form-rounded UnitClass tableInputField '  disabled id='Unit' value="${Cont.getUnit()}" name='Unit'></td>
                                                                                                            <td><input type='number' value='1' class='form-control form-rounded Serv_QuantityClass tableInputField check-negative-value' value="${Cont.getQuantity()}"  min='0' id='Serv_Quantity' name='Serv_Quantity'></td>
                                                                                                            <td><input type='number'  class='form-control form-rounded GrossPriceClass tableInputField check-negative-value'  min='0' value="${Cont.getGrossPrice()}" id='GrossPrice' name='GrossPrice'></td>
                                                                                                            <td><input type='Text'  class='form-control form-rounded CurrencyClass tableInputField '   id='Currency' value="${Cont.getCurrency()}" name='Currency'></td>
                                                                                                            <td><input type='text' class='form-control form-rounded  tableInputField EditionClass ' id='Edition' value="${Cont.getEdition()}"  name='Edition'></td>
                                                                                                            <td><a href='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>
                                                                                                                </tr>
                                                                                                                </c:forEach>
                                                                                                            </c:if>

                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                </c:if>
                                                                                <div class="tab-pane fade show" id="profitabilitysegment-justify" style="width: 95%; margin-left: 2%;" role="tabpanel" aria-labelledby="profitabilitysegment-tab-justify">
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="characteristic" class="">Characteristic</label>
                                                                                                <input type="text" class="form-control form-rounded" id="characteristic" name="characteristic">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="CustomerCode" class="">Customer Code</label>
                                                                                                <select id="CustomerCode" name="CustomerCode" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="Product" class="">Product</label>
                                                                                                <select id="Product" name="Product" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="BillingType" class="">Billing Type</label>
                                                                                                <select id="BillingType" name="BillingType" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="SalsesOrder" class="">Sales Order</label>
                                                                                                <select id="SalsesOrder" name="SalsesOrder" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="InterNumber" class="">Item Number</label>
                                                                                                <select id="InterNumber" name="InterNumber" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="Order" class="">Order</label>
                                                                                                <select id="Order" name="Order" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="CompanyCode" class="">Company Code</label>
                                                                                                <input type="text" id="CompanyCode" value="CompanyCode" class="form-control form-rounded">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="Plant" class="">Plant</label>
                                                                                                <input type="text" id="Plant" value="Plant" class="form-control form-rounded">
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="BusinessArea" class="">Business Area</label>
                                                                                                <select id="BusinessArea" name="BusinessArea" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="SalsesOrganization" class="">Sales Organization</label>
                                                                                                <select id="SalsesOrganization" name="SalsesOrganization" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="DistrChannel" class="">Distr. Channel</label>
                                                                                                <select id="DistrChannel" name="DistrChannel" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="Division" class="">Division</label>
                                                                                                <select id="Division" name="Division" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="WBSElement" class="">WBS Element</label>
                                                                                                <select id="WBSElement" name="WBSElement" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="CostObject" class="">Cost Object</label>
                                                                                                <select id="CostObject" name="CostObject" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ProfitCenter" class="">Profit Center</label>
                                                                                                <select id="ProfitCenter" name="ProfitCenter" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="PartnerPC" class="">Partner PC</label>
                                                                                                <select id="PartnerPC" name="PartnerPC" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="Country" class="">Country</label>
                                                                                                <select id="Country" name="Country" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="SalesOffice" class="">Sales Office</label>
                                                                                                <select id="SalesOffice" name="SalesOffice" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="SalesEmployee" class="">Sales Employee</label>
                                                                                                <select id="SalesEmployee" name="SalesEmployee" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for=MatlGroup class="">Matl. Group</label>
                                                                                                <select id="MatlGroup" name="MatlGroup" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ProdHierarchy" class="">Prod. Hierarchy</label>
                                                                                                <select id="ProdHierarchy" name="ProdHierarchy" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ItemCategory" class="">Item category</label>
                                                                                                <select id="ItemCategory" name="ItemCategory" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="HigherLevItem" class="">Higher-lev. Item</label>
                                                                                                <select id="HigherLevItem" name="HigherLevItem" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for=Industry class="">Industry</label>
                                                                                                <select id="Industry" name="Industry" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="CustomerGroup" class="">Customer Group</label>
                                                                                                <select id="CustomerGroup" name="CustomerGroup" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ProductHierLevel1" class="">Product Hier Level 1</label>
                                                                                                <select id="ProductHierLevel1" name="ProductHierLevel1" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ProductHierLevel2" class="">Product Hier Level 2</label>
                                                                                                <select id="ProductHierLevel2" name="ProductHierLevel2" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ProductHierLevel3" class="">Product Hier Level 3</label>
                                                                                                <select id="ProductHierLevel3" name="ProductHierLevel3" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="MaterialType" class="">Material Type</label>
                                                                                                <select id="MaterialType" name="MaterialType" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ReferenceDoc" class="">Reference Doc.</label>
                                                                                                <select id="ReferenceDoc" name="ReferenceDoc" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ProjectNumber1" class="">Project Number 1</label>
                                                                                                <select id="ProjectNumber1" name="ProjectNumber1" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ProjectIndicator" class="">Project Indicator</label>
                                                                                                <select id="ProjectIndicator" name="ProjectIndicator" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ValuationType" class="">Valuation Type</label>
                                                                                                <select id="ValuationType" name="ValuationType" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="CustomerClass" class="">Customer Class</label>
                                                                                                <select id="CustomerClass" name="CustomerClass" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="MaterialSourceInd" class="">Material Source Ind</label>
                                                                                                <select id="MaterialSourceInd" name="MaterialSourceInd" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ContractType" class="">Contract Type</label>
                                                                                                <select id="ContractType" name="ContractType" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ShipToParty" class="">Ship-to Party</label>
                                                                                                <select id="ShipToParty" name="ShipToParty" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="IndustryCode1" class="">Industry Code 1</label>
                                                                                                <select id="IndustryCode1" name="IndustryCode1" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="IndustryField001" class="">Industry Field 001</label>
                                                                                                <select id="IndustryField001" name="IndustryField001" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="IndustryCode2" class="">Industry Code 2</label>
                                                                                                <select id="IndustryCode2" name="IndustryCode2" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="IndustryCode3" class="">Industry Code 3</label>
                                                                                                <select id="IndustryCode3" name="IndustryCode3" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="SalesDocType" class="">Sales Doc. Type</label>
                                                                                                <select id="SalesDocType" name="SalesDocType" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ReferenceItem" class="">Reference Item</label>
                                                                                                <select id="ReferenceItem" name="ReferenceItem" class="custom-select">
                                                                                                    <option>Select</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="tab-pane fade show active" id="texts-justify" style="width: 95%; margin-left: 2%;" role="tabpanel" aria-labelledby="texts-tab-justify">
                                                                                    <div class="row">
                                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ItemText" class="">Item Text</label>
                                                                                                <textarea class="form-control form-rounded" rows="5" id="ItemText" name="ItemText" data-parsley-trigger="change" required="true"></textarea>
                                                                                                <!--<input type="text" class="form-control form-rounded" id="ItemText" name="ItemText"/>-->
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="ItemNote" class="">Item Note</label>
                                                                                                <textarea class="form-control form-rounded" rows="5" id="ItemNote" name="ItemNote" data-parsley-trigger="change" required="true"></textarea>
                                                                                                <!--<input type="text" class="form-control form-rounded" id="ItemNote" name="ItemNote"/>-->
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                                                            <div class="form-group">
                                                                                                <label for="NoteToApprover" class="">Note To Approver</label>
                                                                                                <textarea class="form-control form-rounded" rows="5" id="NoteToApprover" name="NoteToApprover" data-parsley-trigger="change" required="true"></textarea>
                                                                                                <!--<input type="text" class="form-control form-rounded" id="NoteToApprover" name="NoteToApprover"/>-->
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
                                                                                    
                                                                                    <div class="modal fade" id="matlLongTextModal"  tabindex="-1" role="dialog" aria-labelledby="matlLongTextLabel" aria-hidden="true">
                 <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="matlLongTextLabel">Long Text</h5>
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
                                                          
                                                       <div class="modal fade" id="materialMasterModal" tabindex="-1" role="dialog" aria-labelledby="materialCodeLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="materialCodeLabel">Material Code</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <input type="hidden" id="firstMatSno">
                                <input type="hidden" id="lastMatSno">

                                <div class="container-fluid">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <div class="row">
                                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="materialRecordCount">Record Count: </label>
                                                        <select class="custom-select" id="materialRecordCount">
                                                            <option value="">Select</option>
                                                            <option>10</option>
                                                            <option>20</option>
                                                            <option>50</option>
                                                            <option>100</option>
                                                            <option>200</option>
                                                            <option>500</option>
                                                            <option>1000</option>
                                                            <option>All</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="">Material Code/ Short Text:</label>
                                                        <input type="text" class="form-control form-rounded" id="materialCodeShortText_SearchText" placeholder="Search by material code or short text">
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <div class="btn-group" style="margin-top: 21px;">
                                                            <input type="button" class="btn btn-success btn-sm" id="searchMaterialCodeBtn" value="Search">
                                                            <input type="button" class="btn btn-default btn-sm" id="clearSearchMaterialCodeBtn" value="Clear">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <div class="btn-group" style="margin-top: 21px;">
                                                            <input type="button" class="btn btn-instagram btn-sm" id="searchMaterialCodePrevBtn" value="Prev">
                                                            <input type="button" class="btn btn-instagram btn-sm" id="searchMaterialCodeNextBtn" value="Next">
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <table class="table table-bordered table-hover materialMasterTable" id="materialMasterTable" style="width:100%;">
                                                        <thead>
                                                            <tr class="border-0">
                                                                <th class="border-0">Material Code</th>
                                                                <th class="border-0">Company Code</th>
                                                                <th class="border-0">Plant Code</th>
                                                                <th class="border-0">Short Text</th>
                                                                <th class="border-0">Long Text</th>
                                                                <th class="border-0">Storage Location</th>
                                                                <th class="border-0">Purchase Group</th>
                                                                <th class="border-0">Material Group</th>
                                                                <th class="border-0">UoM</th>
                                                                <th class="border-0">UoM Store</th>
                                                                <th class="border-0">Old Material No</th>
                                                                <th class="border-0">Value Price</th>
                                                                <th class="border-0">Country of Origin</th>
                                                                <th class="border-0">PRICE UNIT</th>
                                                                <th class="border-0">GL Code</th>
                                                                <th class="border-0">Z GLCode</th>
                                                                
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
                                                                                    
                                                        <div id="step-2" class="">
                                                            <c:forEach var="cmSOWContractDetailsInfo" items="${cmSOWContractDetailsInfoList}" varStatus="status">
                                                                <div class="row">
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="CompanyCode" class="">Company Code</label>
                                                                            <select id="CompanyCode" name="CompanyCode" class="custom-select">
                                                                                <option>Select</option>
                                                                                <option value="${cmSOWContractDetailsInfo.getCompanyCode()}" selected>${cmSOWContractDetailsInfo.getCompanyCode()}</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="UserCostCenter" class="">User Cost Center</label>
                                                                            <input type="text" class="form-control form-rounded" id="UserCostCenter" name="UserCostCenter" value="${cmSOWContractDetailsInfo.getUserCostCentre()}" readonly/>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ActivationDate" class="">Activation Date</label>

                                                                            <div class="input-group date" id="ActivationDate_div" data-target-input="nearest">
                                                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ActivationDate" name="ActivationDate" value="<fmt:formatDate value="${cmSOWContractDetailsInfo.getActivationDate()}" pattern="dd-MM-yyyy"></fmt:formatDate>" readonly/>
                                                                                <div class="input-group-append" data-target="#ActivationDate_div" data-toggle="datetimepicker">
                                                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="MatlGroupSVSNo" class="">Matl. Group/SVS No</label>
                                                                            <input type="text" class="form-control form-rounded" id="MatlGroupSVSNo" name="MatlGroupSVSNo" value="${cmSOWContractDetailsInfo.getMatlGroupSVSNo()}" readonly/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="MaterialServiceGrpDesc" class="">Material/Service Grp. Desc</label>
                                                                            <input type="text" class="form-control form-rounded" id="MaterialServiceGrpDesc" name="MaterialServiceGrpDesc" value="${cmSOWContractDetailsInfo.getMatlSrvGrpDesc()}" readonly/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </c:forEach>
                                                            <div class="row">

                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                    <c:forEach var="cmHeaderMislInfo" items="${cmCMHeaderMislInfoList}" varStatus="status">
                                                                        <div class="form-group">
                                                                            <label for="ServiceDescription" class="">Service Description</label>
                                                                            <textarea class="form-control" id="ServiceDescription" name="ServiceDescription" placeholder="Write Descriptions" readonly>${cmHeaderMislInfo.getServiceDescription()} </textarea>
                                                                        </div>
                                                                    </c:forEach>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div id="step-3" class="">
                                                            <c:forEach var="cmHeaderMislInfo" items="${cmCMHeaderMislInfoList}" varStatus="status">
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="SuppliesFromNatSteel" class="">Supplies From NatSteel</label>
                                                                            <textarea class="form-control" id="SuppliesFromNatSteel" name="SuppliesFromNatSteel" placeholder="Write Descriptions" readonly>${cmHeaderMislInfo.getSuppliesFromNatSteel()}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="SuppliesFromContractor" class="">Supplies From Contractor</label>
                                                                            <textarea class="form-control" id="SuppliesFromContractor" name="SuppliesFromContractor" placeholder="Write Descriptions" readonly>${cmHeaderMislInfo.getSuppliesFromContractor()}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </c:forEach>
                                                        </div>
                                                        <div id="step-4" class="">
                                                            <c:forEach var="cmHeaderMislInfo" items="${cmCMHeaderMislInfoList}" varStatus="status">
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="ServiceLevelAgreement" class="">Service Level Agreement</label>
                                                                            <textarea class="form-control" id="ServiceLevelAgreement" name="ServiceLevelAgreement" placeholder="Write Descriptions" readonly >${cmHeaderMislInfo.getSLA()}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Safety" class="">Safety</label>
                                                                            <textarea class="form-control" id="Safety" name="Safety" placeholder="Write Descriptions" readonly>${cmHeaderMislInfo.getSafety()}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </c:forEach>
                                                        </div>
                                                        <div id="step-5" class="">
                                                            <c:forEach var="cmHeaderMislInfo" items="${cmCMHeaderMislInfoList}" varStatus="status">
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="DocumentAndInvoicing" class="">Document & Invoicing</label>
                                                                            <textarea class="form-control" id="DocumentAndInvoicing" name="DocumentAndInvoicing" placeholder="Write Descriptions" readonly>${cmHeaderMislInfo.getDocumentsAndInvoicing()}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group">
                                                                            <label for="Termination" class="">Termination</label>
                                                                            <textarea class="form-control" id="Termination" name="Termination" placeholder="Write Descriptions" readonly >${cmHeaderMislInfo.getTermination()}</textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </c:forEach>
                                                        </div>
                                                    </div>

                                                </div>
                                                <!--Girivasu-->  

                                                <div class="modal fade" id="accountAssignmentCategoryModal" tabindex="-1" role="dialog" aria-labelledby="accountAssignmentCategoryLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="accountAssignmentLabel">Account Assignment</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-hover table-bordered accountAssignmentCategoryTable-Class" id="accountAssignmentCategoryTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="itemCategoryClass">

                                                                                        <th class="border-1" scope="col" style="width:50px;">Code &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Account Assignment Category</th>
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

                                                <div class="modal fade" id="MatlGroupModal" tabindex="-1" role="dialog" aria-labelledby="MatlGroupLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="MatlGroupLabel">Material Group</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-hover MatlGroupTableClass" id="MatlGroupTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">

                                                                                        <th class="border-1" scope="col" style="width:50px;">Material Group Code &nbsp;&nbsp;</th>
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

                                                <div class="modal fade" id="incoTermsModal" tabindex="-1" role="dialog" aria-labelledby="incoTermsModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="incoTermsModalLabel">Incoterms</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-hover incoTermsTable" id="incoTermsTable" style="width:100%;">
                                                                        <thead>
                                                                            <tr class="border-0 incoTermsTable-btn">
                                                                                <th class="border-0">Code</th>
                                                                                <th class="border-0">Description</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-primary" id="clearIncoTermsModalBtn">Clear</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="modal fade" id="itemCategoryModal" tabindex="-1" role="dialog" aria-labelledby="itemCategoryLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="itemCategoryLabel">Item Category</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-hover table-bordered itemCategoryTable-Class" id="itemCategoryTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">

                                                                                        <th class="border-1" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Item Category  Desc</th>
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
                                                <div class="modal fade" id="gLAccountModal" tabindex="-1" role="dialog" aria-labelledby="gLAccountLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="gLAccountLabel">GL Account</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-hover table-bordered gLAccountTable-Class" id="gLAccountTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">GL Code &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">GL Description</th>
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
                                                <div class="modal fade" id="commitmentItemModal" tabindex="-1" role="dialog" aria-labelledby="commitmentItemLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="commitmentItemLabel">Commitment Item</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive table-bordered">
                                                                            <table class="table table-hover commitmentItemTable-Class" id="commitmentItemTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">Commitment Item &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Name</th>
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
                                                <div class="modal fade" id="accAsgnOrderModal" tabindex="-1" role="dialog" aria-labelledby="accAsgnOrderLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="accAsgnOrderLabel">Order</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-hover accAsgnOrderTable-Class" id="accAsgnOrderTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">Order &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Order  Description</th>
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
                                                <div class="modal fade" id="WBSElementModal" tabindex="-1" role="dialog" aria-labelledby="WBSElementLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="WBSElementLabel">WBS Element</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-hover WBSElementClass" id="WBSElementTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">WBS Code &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">WBS  Description</th>
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
                                                <div class="modal fade" id="networkActivityNumberModal" tabindex="-1" role="dialog" aria-labelledby="networkActivityNumberLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="networkActivityNumberLabel">Network/Activity Number</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-hover networkActivityNumberClass" id="networkActivityNumberTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">Network Number &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Description</th>
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
                                                <div class="modal fade" id="accAsgnAssetModal" tabindex="-1" role="dialog" aria-labelledby="accAsgnAssetLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="accAsgnAssetLabel">Assets</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-hover accAsgnAssetClass" id="accAsgnAssetTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th style="width:50px;"></th>
                                                                                        <th class="border-1" scope="col" style="width:50px;">Asset &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Asset Description</th>
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
                                                <div class="modal fade" id="ServiceNumberModal" tabindex="-1" role="dialog" aria-labelledby="ServiceNumberLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="ServiceNumberLabel">Service Number</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-bordered table-hover serviceNumberTableClass" id="serviceNumberTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">

                                                                                        <th class="border-1" scope="col" style="width:50px;">Service Number &nbsp;&nbsp;</th>
                                                                                        <th class="border-1" scope="col">Short Text</th>
                                                                                        <th class="border-1" scope="col" style="display: none;">UOM</th>
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
                                                <div class="modal fade" id="PlantModal" tabindex="-1" role="dialog" aria-labelledby="PlantCodeLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="PlantLabel">Plant</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="container-fluid">
                                                                    <div class="card-body">
                                                                        <div class="table-responsive">
                                                                            <table class="table table-hover table-bordered plantTableClass" id="plantTableId" style="width: 100%">
                                                                                <thead class="">
                                                                                    <tr class="">
                                                                                        <th class="border-1" scope="col" style="width:50px;">Plant  &nbsp;&nbsp;</th>
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
                                                <div class="modal fade" id="accountAssignmentModal" tabindex="-1" role="dialog" aria-labelledby="accountAssignmentLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="accountAssignmentLabel">Account Assignment</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="">
                                                                <div class="container-fluid">
                                                                    <form id="accountAssignmentForm" method="post" action="#">
                                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                        <div class="card-body">
                                                                            <div class="row">
                                                                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="gLAccount" class="inline" style="margin-left: 15px;" id="gLAccountServiceLabel">GL Account: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="gLAccountService" name="gLAccountService" style="width:100px;margin-left:30px;">
                                                                                        <label for="coArea" class="inline" id="coAreaServiceLabel" style="margin-left:60px;">CO Area: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="coAreaService" name="coAreaService" style="width:100px;margin-left:35px;" disabled>
                                                                                        <label for="coArea" class="inline" id="companyCodeServiceLabel" style="margin-left:60px;">Com Code: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="companyCodeService" name="companyCodeService" style="width:100px;margin-left:35px;" disabled>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="costCenterAccAsgn" id="CostCenterServiceLabel" class="inline" style="margin-left:15px;">Cost Center: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="costCenterService" name="costCenterService" style="width:100px;margin-left:10px;">
                                                                                        <label for="Order" class="inline" id="serviceOrderLabel" style="margin-left:15px;">Order: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="OrderService" name="OrderService" style="width:100px;margin-left:10px;">
                                                                                        <label for="accAsgnAsset" class="inline" id="AssetServiceLabel" style="margin-left:15px;">Asset: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="AssetService" name="AssetService" style="width:100px;margin-left:10px;">
                                                                                        <label for="WBSElement" class="inline" id="wBSElementServiceLabel" style="margin-left:15px;">WBS Element:</label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="WBSElementInputService" name="WBSElementInputService" style="width:100px;margin-left:10px;">
                                                                                        <label for="assAsgnSalesOrder" class="inline" id="SalesOrderServiceLabel" style="margin-left:15px;"> Sales Order: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="SalesOrderService" name="SalesOrderService" style="width:100px;margin-left:5px;">
                                                                                        <label for="assAsgnItemNumber" class="inline" id="ItemNumServiceLabel" style="margin-left:15px;"> Item Number: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="ItemNumberService" name="ItemNumberService" style="width:100px;margin-left:5px;">
                                                                                        <label for="assAsgnDelivSch" class="inline" id="DelivSchServiceLabel" style="margin-left:15px;"> Del Sch: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="DelivSchService" name="DelivSchService" style="width:100px;margin-left:5px;">
                                                                                        <label for="fund" class="inline" id="FundServiceLabel" style="margin-left:15px;">Fund: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="fundService" name="fundService" style="width:100px;margin-left:10px;">
                                                                                        <label for="functionalArea" class="inline" id="functionalAreaServiceLabel" style="margin-left:15px;">Functional Area: </label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="functionalAreaService" name="functionalAreaService" style="width:150px;margin-left:10px;">
                                                                                        <label for="fundCenter" class="inline" id="FundCenterServiceLabel">Funds Center:</label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="FundCenterServiceInput" name="FundCenterServiceInput" style="width:150px;margin-left:10px;">
                                                                                        <label for="commitmentItem" class="inline" id="CommItemServiceLabel" style="margin-left:15px;">Com Item:</label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="CommItemServiceInput" name="CommItemServiceInput" style="width:200px;margin-left:5px;">
                                                                                        <label for="NetActNumber" class="inline" id="NActNumServiceLabel" style="margin-left:10px;">N/Act.Num:</label>
                                                                                        <input type="text" class="form-control form-rounded inline input-height" id="NActNumServiceInput" name="NActNumServiceInput" style="width:100px;margin-left:15px;">

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <!--                                        </form>-->
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-primary" id="profitabilitysegmentmodelbtn" style="display:none;">Prof Segment</button>
                                                                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-lg btn-primary" id="accountAssignmentchangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                                                                    <!--<a><i type="button" class="fa fa-window-close btn-lg btn-primary" aria-hidden="true" data-dismiss="modal"></i></a>-->
                                                                    <button type="button" class="btn btn-primary" id="serviceInpAccAsgnmentSubmitBtn">Submit</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal fade modal-padding" id="profitabilitySegmentModal" style="max-height: 700px;max-width: 2000px;overflow-y: scroll;"  tabindex="-1" role="dialog" aria-labelledby="profitabilitySegmentLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content" style="width:1250px;">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="profitabilitySegmentLabel">Profitability Segment</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="">
                                                                <div class="container-fluid">
                                                                    <form id="profitabilitySegmentForm" method="post" action="#">
                                                                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                        <div class="card-body">
                                                                            <div class="row">
                                                                                <!--<h5>Profitability segment</h5>-->
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Characteristic" class="">Characteristic :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="Characteristic" name="Characteristic">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="CustomerCode" class="">Customer Code :</label>
                                                                                        <!--                                                            <select class="custom-select" id="CustomerCode" name="CustomerCode">
                                                                                                                                                        <option value="">Select</option>
                                                                                                                                                    </select>-->
                                                                                        <input type="text" class="form-control form-rounded" id="CustomerCode" name="CustomerCode">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Product" class="">Product :</label>
                                                                                        <select class="custom-select" id="Product" name="Product">
                                                                                            <option value="">Select</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="BillingType" class="">Billing Type :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="BillingType" name="BillingType">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="salesOrderProfitabilitySegment" class="">Sales Order :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="salesOrderProfitabilitySegment" name="salesOrderProfitabilitySegment">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="itemNumberProfitabilitySegment" class="">Item Number :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="itemNumberProfitabilitySegment" name="itemNumberProfitabilitySegment">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="companyCodeProfitabilitySegment" class="">Company Code :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="companyCodeProfitabilitySegment" name="companyCodeProfitabilitySegment">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Plant" class="">Plant :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="Plant" name="Plant">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="BusinessArea" class="">Business Area :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="BusinessArea" name="BusinessArea">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="SalesOrganization" class="">Sales Organization :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="SalesOrganization" name="SalesOrganization">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="DistrChannel" class="">Distr. Channel :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="DistrChannel" name="DistrChannel">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Division" class="">Division :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="Division" name="Division">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="WBSElement" class="">WBS Element :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="WBSElement" name="WBSElement">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="CostObject" class="">Cost Object :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="CostObject" name="CostObject">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ProfitCentre" class="">Profit Centre :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ProfitCentre" name="ProfitCentre">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="PartnerPC" class="">Partner PC :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="PartnerPC" name="PartnerPC">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="countryProfitabilitySegment" class="">Country :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="countryProfitabilitySegment" name="countryProfitabilitySegment">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="SalesOffice" class="">Sales Office :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="SalesOffice" name="SalesOffice">                                                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="SalesEmployee" class="">Sales Employee :</label>
                                                                                        <select class="custom-select" id="SalesEmployee" name="SalesEmployee">
                                                                                            <option value="">Select</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="MatlGroup" class="">Matl. Group :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="MatlGroup" name="MatlGroup"> 
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Prodhierarchy" class="">Prod. Hierarchy :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="Prodhierarchy" name="Prodhierarchy"> 
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ItemCategory" class="">Item Category :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ItemCategory" name="ItemCategory"> 
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="HigherLevItem" class="">Higher-lev.item :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="HigherLevItem" name="HigherLevItem">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="Industry" class="">Industry :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="Industry" name="Industry">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="CustomerGroup" class="">Customer Group :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="CustomerGroup" name="CustomerGroup"> 
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ProductHierLevel1" class="">Product Hier Level 1 :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ProductHierLevel1" name="ProductHierLevel1">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ProductHierLevel2" class="">Product Hier Level 2 :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ProductHierLevel2" name="ProductHierLevel2">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ProductHierLevel3" class="">Product Hier Level 3 :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ProductHierLevel3" name="ProductHierLevel3">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="MaterialType" class="">Material Type :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="MaterialType" name="MaterialType">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ReferenceDoc" class="">Reference Doc. :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ReferenceDoc" name="ReferenceDoc">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ProjectNumber1" class="">PROJECT NUMBER1</label>
                                                                                        <!--                                                            <select class="custom-select" id="ProjectNumber1" name="ProjectNumber1">
                                                                                                                                                        <option value="">Select</option>
                                                                                                                                                    </select>-->
                                                                                        <input type="text" class="form-control form-rounded" id="ProjectNumber1" name="ProjectNumber1">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ProjectIndicator" class="">Project Indicator :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ProjectIndicator" name="ProjectIndicator">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="valuationTypeProfitabilitySegment" class="">Valuation Type :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="valuationTypeProfitabilitySegment" name="valuationTypeProfitabilitySegment">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="CustomerClass" class="">Customer Class :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="CustomerClass" name="CustomerClass">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="MaterialSourceInd" class="">Material Source Ind</label>
                                                                                        <input type="text" class="form-control form-rounded" id="MaterialSourceInd" name="MaterialSourceInd">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ContractType" class="">Contract Type</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ContractType" name="ContractType">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ShipToParty" class="">Ship To Party</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ShipToParty" name="ShipToParty">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="IndustryCode1" class="">Industry Code 1 :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="IndustryCode1" name="IndustryCode1">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="IndustryField001" class="">Industry Field 001 :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="IndustryField001" name="IndustryField001">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="IndustryCode2" class="">Industry Code 2 :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="IndustryCode2" name="IndustryCode2">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="IndustryCode3" class="">Industry Code 3 :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="IndustryCode3" name="IndustryCode3">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="SalesDocType" class="">Sales Doc. Type :</label>
                                                                                        <input type="text" class="form-control form-rounded" id="SalesDocType" name="SalesDocType">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="ReferenceItem" class="">Reference Item</label>
                                                                                        <input type="text" class="form-control form-rounded" id="ReferenceItem" name="ReferenceItem">
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                                                                    <div class="form-group">
                                                                                        <label for="orderProfitabilitySegment" class="">Order</label>
                                                                                        <select class="custom-select" id="orderProfitabilitySegment" name="orderProfitabilitySegment">
                                                                                            <option value="">Select</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!--                                        </form>-->
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                                    <button type="button" class="btn btn-primary" id="profitabilitySegmentSubmitBtn">Submit</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal fade" id="changeAccountAssignmentScreenModal" tabindex="-1" role="dialog" aria-labelledby="changeAccountAssignmentScreenLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-lg" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="changeAccountAssignmentScreenLabel">Account Assignment</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="container-fluid">
                                                                <form method="post" action="#">
                                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                                                                    <div class="card-body">
                                                                        <div class="row">
                                                                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                                                                <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                        <div class="form-group two">
                                                                                            <label for="accountAssignLine" class="inline">Line:</label>
                                                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignLine" name="accountAssignLine" style="width:100px;margin-left: 65px;height:25px;" disabled>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                        <div class="form-group two">
                                                                                            <label for="accountAssignQuantity" class="inline">Quantity</label>
                                                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignQuantity" name="accountAssignQuantity" style="width:100px;margin-left: 45px;height:25px;" disabled>
                                                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignuom" name="" style="width:40px;height:25px;" disabled>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                        <div class="form-group two">
                                                                                            <label for="accountAssignActivity" class="inline">Activity:</label>
                                                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignActivity" name="accountAssignActivity" style="width:100px;margin-left: 50px;height:25px;" disabled>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="row">
                                                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                        <div class="form-group two">
                                                                                            <label for="accountAssignShortText" class="inline">Short Text:</label>
                                                                                            <input type="text" class="form-control form-rounded inline" id="accountAssignShortText" name="accountAssignShortText" style="width:250px;margin-left: 30px;height:25px;" disabled>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                                                                <div class="row">
                                                                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                                                                        <div class="form-group">
                                                                                            <label for="distributionIndicator" class="inline">Distribution Indicator</label>
                                                                                            <div><hr style="margin-top:0rem;margin-bottom:0rem">
                                                                                                <label class="custom-control custom-radio">
                                                                                                    <input type="radio" name="distributionIndicator" id="noMultiAcctAssignment" class="custom-control-input"><span class="custom-control-label">No Multi Act Assignment</span>
                                                                                                </label>
                                                                                                <label class="custom-control custom-radio ">
                                                                                                    <input type="radio" name="distributionIndicator" id="distOnQuantBases" class="custom-control-input" checked="true"><span class="custom-control-label">Distribution On Quantity Bases</span>
                                                                                                </label>
                                                                                                <label class="custom-control custom-radio ">
                                                                                                    <input type="radio" name="distributionIndicator" id="distByPercentage" class="custom-control-input"><span class="custom-control-label">Distribution By Percentage</span>
                                                                                                </label>
                                                                                            </div>
                                                                                            <!--<p class="text-danger" id="p7"></p>-->
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!--                                    </form>-->
                                                            </div>
                                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div class="card-body">
                                                                    <div class="table-responsive">
                                                                        <table class="table table-bordered" id="serviceTabAccAsgnTebleId">
                                                                            <thead class="table-header-color">
                                                                                <tr class="border-0">                                                   
                                                                                    <th class="border-0"></th>                                      <!--0-->
                                                                                    <th class="border-0 th-color">Quant</th>                        <!--1-->
                                                                                    <th class="border-0 th-color">%</th>                            <!--2-->
                                                                                    <th class="border-0 th-color">GL A/C</th>                       <!--3-->
                                                                                    <th class="border-0 th-color">CO Area</th>                      <!--4-->
                                                                                    <th class="border-0 th-color">Cost Center</th>                  <!--5-->
                                                                                    <th class="border-0 th-color">Fund</th>                         <!--6-->
                                                                                    <th class="border-0 th-color">Fun Area</th>                     <!--7-->
                                                                                    <th class="border-0 th-color">Fund Center</th>                  <!--8-->
                                                                                    <th class="border-0 th-color">Com Item</th>                     <!--9-->
                                                                                    <th class="border-0 th-color">Order</th>                        <!--10-->
                                                                                    <th class="border-0 th-color">Asset</th>                        <!--11-->
                                                                                    <th class="border-0 th-color">WBS Elements</th>                 <!--12-->
                                                                                    <th class="border-0 th-color">Sales Order</th>                  <!--13-->
                                                                                    <th class="border-0 th-color">Network/Activity Number</th>      <!--14-->
                                                                                    <th class="border-0 th-color">Item Number</th>                  <!--15-->
                                                                                    <th class="border-0 th-color">Delivery Schedule</th>            <!--16-->
                                                                                    <!--<th class="border-0 th-color" style="width:50px;"></th>-->
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>   
                                                                                <tr>
                                                                                    <td></td>                                                                                                                      <!--0--> 
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblQuantity" value="" max=""></td>           <!--1-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="" max=""></td>         <!--2-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value=""></td>                 <!--3-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value=""></td>                    <!--4-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value=""></td>                <!--5-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFund" value=""></td>                      <!--6-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value=""></td>            <!--7-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value=""></td>                <!--8-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value=""></td>            <!--9-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblOrder" value=""></td>                     <!--10-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblAssets" value=""></td>                    <!--11-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value=""></td>                <!--12-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value=""></td>                 <!--13-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value=""></td>               <!--14-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value=""></td>                 <!--15-->
                                                                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value=""></td>           <!--16-->
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!--</form>-->
                                                            <!--</div>-->
                                                            <div class="modal-footer">
                                                                <a><i type="buttom" class="fa fa-arrow-circle-left btn-lg btn-primary" id="backChangedScreen" title="Change Screen" aria-hidden="true"></i></a>
                                                                <!--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>-->
                                                                <button type="button" class="btn btn-primary" id="serviceAccAsgnmentSubmitBtn">Submit</button>
                                                                <!--<a><i type="button" class="fa fa-window-close btn-lg btn-primary" aria-hidden="true" data-dismiss="modal">Submit</i></a>-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!--Girivasu-->                                  
                                                <div class="row">
                                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div class="align-center text-align-center">


                                                            <input type="submit" class="btn btn-success btn-rounded createRFQOLA" id="createRFQOLA"  value="Create OLA" style="">
                                                            
                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
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

        <!--<script src="assets/vendor/gijgo/js/gijgo.min.js" type="text/javascript"></script>-->
        
        <script src="assets/vendor/choosen/js/chosen.jquery.min.js" type="text/javascript"></script>
        <!--<script src="assets/js/createrfq.js"></script>-->
        <script src="assets/js/contract.js"></script>
        <!--                <script src="assets/js/po.js"></script>-->
        <script src="assets/js/createcontract.js"></script>
        <script src="assets/vendor/lobibox/js/lobibox.min.js"></script>

        <script src="assets/vendor/datepicker/moment.js"></script>
        <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>

                <script src="assets/vendor/datepicker/datepicker.js"></script>
                <script src="assets/vendor/datatables/js/jquery.dataTables.min.js"></script>
                <script src="assets/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
                <script src="assets/vendor/datatables/js/dataTables.buttons.min.js"></script>
                <script src="assets/vendor/datatables/js/buttons.bootstrap4.min.js"></script>
        <script src="assets/vendor/datepicker/tempusdominus-bootstrap-4.js"></script>
        <script src="assets/vendor/datepicker/datepicker.js"></script>
        <script src="assets/vendor/summernote/js/summernote-bs4.js"></script>
        
        <script type="text/javascript">

            $(document).ready(function () {



                $('#cm_data_details_services_table').on('click', '.clickable-row', function (event) {
                    // if ($(this).hasClass('bg-info')) {
                    //  $(this).removeClass('bg-info');
                    //} else {
                    $(this).addClass('bg-info').siblings().removeClass('bg-info');
                    // }
                });

                $('#cm_data_details_Acc_Assg_table').on('click', '.clickable-row', function (event) {
                    // if ($(this).hasClass('bg-info')) {
                    //  $(this).removeClass('bg-info');
                    //} else {
                    $(this).addClass('bg-info').siblings().removeClass('bg-info');
                    // }
                });

                var table = document.getElementById('cm_data_details_services_table');

                for (var i = 1; i < table.rows.length; i++)
                {
                    table.rows[i].onclick = function ()
                    {
                        //rIndex = this.rowIndex;
                        document.getElementById("Serv_LineItemNumber").value = this.cells[0].innerHTML;

                        var sel = document.getElementById("ServiceNumber");
                        var opt = document.createElement("option");
                        opt.text = this.cells[1].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        document.getElementById("ShortText").value = this.cells[2].innerHTML;
                        document.getElementById("Serv_Quantity").value = this.cells[3].innerHTML;

                        sel = document.getElementById("Unit");
                        opt = document.createElement("option");
                        opt.text = this.cells[4].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        document.getElementById("GrossPrice").value = this.cells[5].innerHTML;
                        document.getElementById("Currency").value = this.cells[6].innerHTML;
                        document.getElementById("Edition").value = this.cells[7].innerHTML;
                    };
                }

                var table1 = document.getElementById('cm_data_details_Acc_Assg_table');

                for (var i = 1; i < table1.rows.length; i++)
                {
                    table1.rows[i].onclick = function ()
                    {
                        //rIndex = this.rowIndex;
                        var sel = document.getElementById("GLCode");
                        var opt = document.createElement("option");
                        opt.text = this.cells[0].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("COArea");
                        opt = document.createElement("option");
                        opt.text = this.cells[1].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("CostCenter");
                        opt = document.createElement("option");
                        opt.text = this.cells[2].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("Order");
                        opt = document.createElement("option");
                        opt.text = this.cells[3].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("Asset");
                        opt = document.createElement("option");
                        opt.text = this.cells[4].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("WBSElement");
                        opt = document.createElement("option");
                        opt.text = this.cells[5].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("SalesOrder");
                        opt = document.createElement("option");
                        opt.text = this.cells[6].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("ItemNumber");
                        opt = document.createElement("option");
                        opt.text = this.cells[7].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        document.getElementById("DeliverySchedule").value = this.cells[8].innerHTML;
                        document.getElementById("Quantity").value = this.cells[9].innerHTML;
                        document.getElementById("Percentage").value = this.cells[10].innerHTML;

                        sel = document.getElementById("Fund");
                        opt = document.createElement("option");
                        opt.text = this.cells[11].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("FunctionalArea");
                        opt = document.createElement("option");
                        opt.text = this.cells[12].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("FundsCentre");
                        opt = document.createElement("option");
                        opt.text = this.cells[13].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("CommitmentItem");
                        opt = document.createElement("option");
                        opt.text = this.cells[14].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("Network");
                        opt = document.createElement("option");
                        opt.text = this.cells[15].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                        sel = document.getElementById("ActivityNumber");
                        opt = document.createElement("option");
                        opt.text = this.cells[16].innerHTML;
                        sel.remove(1);
                        sel.add(opt, sel.options[1]);
                        sel.selectedIndex = "1";

                    };
                }


                $('#ServiceDescription').summernote({
                    height: 180
                });
                $('#SuppliesFromNatSteel').summernote({
                    height: 180
                });
                $('#SuppliesFromContractor').summernote({
                    height: 180
                });
                $('#ServiceLevelAgreement').summernote({
                    height: 180
                });
                $('#Safety').summernote({
                    height: 180
                });
                $('#DocumentAndInvoicing').summernote({
                    height: 180
                });
                $('#Termination').summernote({
                    height: 180
                });
            });

        </script>

    </body>
</html>
