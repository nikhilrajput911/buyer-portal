<div>
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
                    <sec:authorize access="hasRole('ROLE_TEAM_LEAD')">
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
                    </sec:authorize>

                    <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT')">
                        <div id="ROLE_TEAM_LEAD_DEFAULT_CARD">
                            <div class="row">
                                <c:forEach var="buyer" items="${buyerList}" varStatus="status">
                                    <input type="hidden" class="cardstatus" value="${status.count}">
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <c:if test="${status.count%2!=0}">
                                            <div class="card bg-user-beach1 dashboard-user-card" id="buyer_count_card_${buyer.id}">
                                                <div class="card-body">
                                                    <div class="d-inline-block">
                                                        <h2 class="text-white" style="font-size: 15px;">${buyer.firstname}</h2>
                                                        <h3><a href="#" title="Assigned PR Count" class="text-white" id="buyer_assigned_pr_count_${buyer.id}" data-toggle="tooltip" data-placement="auto">${prCountList[status.index]} </a></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:if>
                                        <c:if test="${status.count%2==0}">
                                            <div class="card bg-user-beach2 dashboard-user-card" id="buyer_count_card_${buyer.id}">
                                                <div class="card-body">
                                                    <div class="d-inline-block">
                                                        <h2 class="text-white" style="font-size: 15px;">${buyer.firstname}</h2>
                                                        <h3><a href="#" title="Assigned PR Count" class="text-white" id="buyer_assigned_pr_count_${buyer.id}" data-toggle="tooltip" data-placement="auto">${prCountList[status.index]} </a></h3>
                                                    </div>

                                                </div>
                                            </div>
                                        </c:if>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                    </sec:authorize>
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
                
</div>