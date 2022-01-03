<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
    <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 buyer-card-col">
            <div class="card bg-beach1 border-3 dashboard-card box-shadow">
                <div class="card-body">
                    <h5 class="card-title text-muted"><a href="pendingprlines.do" title="Pending Tender/ PRs pending RFQ Creation" data-toggle="tooltip" data-placement="auto" class="text-white" style="font-size: 13px;">Pending Tender/ PRs pending RFQ Creation</a></h5>
                </div>
                <div class="card-footer bg-beach1-footer text-white text-align-center">
                    ${buyerPendingcontractList.size()} / ${buyerPendingPRList.size()} 
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 buyer-card-col">
            <div class="card bg-beach2 border-3 dashboard-card box-shadow">
                <div class="card-body">
                    <h5 class="card-title text-muted"><a href="pendingrfqclosure.do" title="Pending RFQ Closure Tender/ PRs with RFQ created" class="text-white" data-toggle="tooltip" data-placement="auto" style="font-size: 13px;">Pending RFQ Closure Tender/ PRs with RFQ created</a></h5>
                </div>
                <div class="card-footer bg-beach2-footer text-white text-align-center">
                    ${contractRfqHeaderListdash.size()}/ <label for="pendingrfqclosure" id="pendingrfqclosure" style="color: white;"></label>
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 buyer-card-col">
            <div class="card bg-beach3 border-3 dashboard-card box-shadow">
                <div class="card-body">
                    <h5 class="card-title text-muted"><a href="vendorfinalized.do" title="PRs with PO created on hold/rejected/cancelled / Tender Finalization" class="text-white" data-toggle="tooltip" data-placement="auto" style="font-size: 13px;">PRs with PO created on hold/rejected/cancelled / Tender Finalization</a></h5>
                </div>
                <div class="card-footer bg-beach3-footer text-white text-align-center">
                    <label for="vendorfinalized" id="vendorfinalized" style="color: white;"></label> / 0
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 buyer-card-col">
            <div class="card bg-beach4 border-3 dashboard-card box-shadow">
                <div class="card-body">
                    <h5 class="card-title text-muted"><a href="overduePrLines.do" title="Overdue RFQ Creation (Tender/ PR with overdue > 10 working days)" class="text-white" data-toggle="tooltip" data-placement="auto" style="font-size: 13px;">Overdue RFQ Creation (Tender/ PR with overdue > 10 working days)</a></h5>
                </div>
                <div class="card-footer bg-beach4-footer text-white text-align-center">
                    ${contractRfqHeaderListdash.size()} / <label for="overduePrLines" id="overduePrLines" style="color: white;"></label>
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 buyer-card-col">
            <div class="card bg-beach7 border-3 dashboard-card box-shadow">
                <div class="card-body">
                    <h5 class="card-title text-muted"><a href="managepo.do" title="PO/ Contracts Pending Approval (Matl./ Service)" class="text-white" data-toggle="tooltip" data-placement="auto" style="font-size: 13px;">PO/ Contracts Pending Approval (Matl./ Service)</a></h5>
                </div>
                <div class="card-footer bg-beach7-footer text-white text-align-center">
                    <span id="pendingPoAppMaterialCount">0</span> / ${buyerPendingServiceContractList.size()}
                </div>
            </div>
        </div>                                        
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 buyer-card-col">
            <div class="card bg-beach6 border-3 dashboard-card box-shadow">
                <div class="card-body">
                    <h5 class="card-title text-muted"><a href="pendingvendorack.do" title="PO pending vendor acknowledgement" class="text-white" data-toggle="tooltip" data-placement="auto" style="font-size: 13px;">PO pending vendor acknowledgement</a></h5>
                </div>
                <div class="card-footer bg-beach6-footer text-white text-align-center">
                    <label for="pendingvendorack" id="pendingvendorack" style="color: white;"></label>
                </div>
            </div>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 col-12 buyer-card-col">
            <div class="card bg-beach5 border-3 dashboard-card box-shadow">
                <div class="card-body">                             
                    <h5 class="card-title text-muted"><a href="contractexpiring.do" title="Contract Expiring" class="text-white" data-toggle="tooltip" data-placement="auto" style="font-size: 13px;">Contract Expiring</a></h5>
                </div>
                <div class="card-footer bg-beach5-footer text-white text-align-center">
                    ${ContractExpiringList.size()}
                </div>
            </div>
        </div>        
    </div>
    <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header bg-primary">PR Status Chart </h5>
                <div class="card-body update-backgroud-color">
                    <div id="buyer_pr_status_chart" class="cChart"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
            <ul class="">
                <li>
                    <div class="notification-title bg-primary"> Notification</div>
                    <div class="notification-list update-backgroud-color">
                        <div class="list-group update-backgroud-color">
                            <c:if test="${BuyerNotificationList.size() > 0}">
                                <marquee style="height:300px;" direction="up" scrollamount="3" onmouseover="this.stop()" onmouseout="this.start()">
                                    <c:forEach var="notification" items="${BuyerNotificationList}">
                                        <a href="${notification.url}" class="list-group-item list-group-item-action unread-notification update-backgroud-color" id="${notification.id}">
                                            <div class="notification-info">
                                                <div class="notification-list-user-img"><img src="assets/images/avatar.png" alt="" class="user-avatar-md rounded-circle"></div>
                                                <div class="notification-list-user-block">
                                                    <span class="notification-list-user-name">${notification.ngBpVendordetailsId.firstname} ${notification.ngBpVendordetailsId.lastname}</span>
                                                    ${notification.notification}
                                                    <div class="notification-date">${notification.commentdate}</div>
                                                </div>
                                            </div>
                                        </a>
                                    </c:forEach>
                                </marquee>
                            </c:if>
                            <c:if test="${BuyerNotificationList.size() == 0}">
                                <h3 style="text-align: center;padding-top: 20px;">No New Notifications</h3>
                            </c:if>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header bg-primary">RFQ Status Panel</h5>
                <div class="card-body update-backgroud-color">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover rfq-status-table update-backgroud-color" id="rfq_status_table">
                            <thead class="">
                                <tr class="">
                                    <th class="" scope="col">RFQ No.</th>
                                    <th class="" scope="col">RFQ Title</th>
                                    <th class="" scope="col">RFQ Status</th>
                                    <th class="" scope="col">RFQ Close Date</th>
                                    <th class="" scope="col">Count of Vendors</th>
                                    <th class="" scope="col">Responses Recd.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach var="rfqHeader" items="${buyerDashRfqPendingStatusPanelList}" varStatus="status">
                                    <tr>
                                        <td><a style="color: blue"  href="rfqdetails.do?rfqid=${rfqHeader.rfqId}">${rfqHeader.rfqNumber}</a></td>
                                        <td>${rfqHeader.rfqTitle}</td>
                                        <c:choose>
                                            <c:when test="${rfqHeader.rfqStatus == 'Pending'}">
                                                <td><span class="badge-dot badge-pending mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Bid Submitted'}">
                                                <td><span class="badge-dot badge-bid-submitted mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'On Hold'}">
                                                <td><span class="badge-dot badge-on-hold mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Cancel'}">
                                                <td><span class="badge-dot badge-cancel mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Closed'}">
                                                <td><span class="badge-dot badge-closed mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Reject'}">
                                                <td><span class="badge-dot badge-reject mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:otherwise>
                                                <td>${rfqHeader.rfqStatus}</td>
                                            </c:otherwise>    
                                        </c:choose>
                                        <td>${rfqHeader.rfqCloseDate}</td>
                                        <td>${rfqHeader.vendorCount}</td>
                                        <td>${rfqHeader.vendorResponse}</td>
                                    </tr>
                                </c:forEach>
                                <c:forEach var="rfqHeader" items="${buyerDashRfqExitStatusPanelList}" varStatus="status">
                                    <tr>
                                        <td><a style="color: blue"  href="rfqdetails.do?rfqid=${rfqHeader.rfqId}">${rfqHeader.rfqNumber}</a></td>
                                        <td>${rfqHeader.rfqTitle}</td>
                                        <c:choose>
                                            <c:when test="${rfqHeader.rfqStatus == 'Pending'}">
                                                <td><span class="badge-dot badge-pending mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Bid Submitted'}">
                                                <td><span class="badge-dot badge-bid-submitted mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'On Hold'}">
                                                <td><span class="badge-dot badge-on-hold mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Cancel'}">
                                                <td><span class="badge-dot badge-cancel mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Closed'}">
                                                <td><span class="badge-dot badge-closed mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:when test="${rfqHeader.rfqStatus == 'Reject'}">
                                                <td><span class="badge-dot badge-reject mr-1"></span> ${rfqHeader.rfqStatus}</td>
                                            </c:when>
                                            <c:otherwise>
                                                <td>${rfqHeader.rfqStatus}</td>
                                            </c:otherwise>    
                                        </c:choose>
                                        <td>${rfqHeader.rfqCloseDate}</td>
                                        <td>${rfqHeader.vendorCount}</td>
                                        <td>${rfqHeader.vendorResponse}</td>
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