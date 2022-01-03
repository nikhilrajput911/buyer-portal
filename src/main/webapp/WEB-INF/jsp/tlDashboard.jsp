<div>
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

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="buyerid" name="buyerid">
                                                <option value=""></option>

                                                <c:forEach var="buyer" items="${buyerList}">
                                                    <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="buyerid" name="buyerid">
                                                <option value=""></option>
                                                <c:forEach var="mapping" items="${buyerMappingList}">
                                                    <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

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
                                        <div class="card-body" style="padding-top: 0em;">
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
                                                    <th class="" scope="col">Req?d Date/ Buyer</th>
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
                                                    <th class="" scope="col">MIQA Mat?l </th>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="PRService-justify" role="tabpanel" aria-labelledby="PRService-tab-justify">
                                <!--<h8>Service</h8>-->
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="card-body" style="padding-top: 0em;">
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
                                                    <th class="" scope="col">Req?d Date/ Buyer</th>
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
                                                    <th class="" scope="col">MIQA Mat?l </th>
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

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassignBuyerId" name="reassignBuyerId">
                                                <option value=""></option>

                                                <c:forEach var="buyer" items="${buyerList}">
                                                    <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassignBuyerId" name="reassignBuyerId">
                                                <option value=""></option>
                                                <c:forEach var="mapping" items="${buyerMappingList}">
                                                    <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

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
                                        <div class="card-body">
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
                                                            <th class="" scope="col">Req?d Date/ Buyer </th>
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
                                                            <th class="" scope="col">MIQA Mat?l </th>
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
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="card-body">
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
                                                            <th class="" scope="col">Req?d Date/ Buyer </th>
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
                                                            <th class="" scope="col">MIQA Mat?l </th>
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

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassignRfqBuyerId" name="reassignRfqBuyerId">
                                                <option value=""></option>

                                                <c:forEach var="buyer" items="${buyerList}">
                                                    <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassignRfqBuyerId" name="reassignRfqBuyerId">
                                                <option value=""></option>
                                                <c:forEach var="mapping" items="${buyerMappingList}">
                                                    <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

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
                                    <div class="card-body">
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
                                                    <td><fmt:formatDate value="${rfq.rfqRequestDate}" pattern="dd.MM.yyyy"></fmt:formatDate></td>
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
                    
                    <!--*****************************************************Contract Starts*************************************************-->
                    
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

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD')">
                                            <select id="contractbuyerid" name="contractbuyerid" data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen">
                                                <option value=""></option>
                                                <c:forEach var="mapping" items="${buyerMappingList}">
                                                    <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

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
                                    <div class="card-body">
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
                                    <div class="card-body">
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
                                    <div class="card-body">
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
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane fade show " id="AssignedContractService-justify" role="tabpanel" aria-labelledby="AssignedContractService-tab-justify">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="card-body">
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

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD_DEFAULT')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassigncRfqBuyerId" name="reassigncRfqBuyerId">
                                                <option value=""></option>

                                                <c:forEach var="buyer" items="${buyerList}">
                                                    <option value="${buyer.id}">${buyer.firstname} ${buyer.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

                                        <sec:authorize access="hasAnyRole('ROLE_TEAM_LEAD')">
                                            <select data-placeholder="Choose any buyer..." tabindex="1" class="form-control form-control-sm chosen" id="reassigncRfqBuyerId" name="reassigncRfqBuyerId">
                                                <option value=""></option>
                                                <c:forEach var="mapping" items="${buyerMappingList}">
                                                    <option value="${mapping.ngBpBuyerdetailsId.id}">${mapping.ngBpBuyerdetailsId.firstname} ${mapping.ngBpBuyerdetailsId.lastname}</option>
                                                </c:forEach>
                                            </select>
                                        </sec:authorize>

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
                                <div class="card-body">
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
                </div>
            </div>
        </div>
    </div>
</div>