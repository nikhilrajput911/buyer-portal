<div>
    <div class="row">
        <div class="col-md-3">
            <div class="card border-info mx-sm-1 p-3 admin-buyer-card">
                <div class="card border-info shadow text-info p-3 admin-card" ><span class="fa fa-user" aria-hidden="true"></span></div>
                <div class="text-info text-center mt-3"><h4><a href="createbuyer.do" class="text-white" title="See All Buyers">Buyer</a></h4></div>
                <div class="text-info text-center mt-2"><h1 class="text-white">${adminDashCount.buyerCount}</h1></div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-success mx-sm-1 p-3 admin-vendor-card">
                <div class="card border-success shadow text-success p-3 admin-card"><span class="fa fa-user" aria-hidden="true"></span></div>
                <div class="text-success text-center mt-3"><h4><a href="createvendor.do" class="text-white" title="See All Vendors">Vendor</a></h4></div>
                <div class="text-success text-center mt-2"><h1 class="text-white">${adminDashCount.vendorCount}</h1></div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-danger mx-sm-1 p-3 admin-prospect-card">
                <div class="card border-danger shadow text-danger p-3 admin-card" ><span class="fa fa-user" aria-hidden="true"></span></div>
                <div class="text-danger text-center mt-3"><h4><a href="propectmanagement.do" class="text-white" title="See All Prospects">Prospect</a></h4></div>
                <div class="text-danger text-center mt-2"><h1 class="text-white">${adminDashCount.prospectCount}</h1></div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-warning mx-sm-1 p-3 admin-reqauth-card">
                <div class="card border-warning shadow text-warning p-3 admin-card" ><span class="fa fa-user" aria-hidden="true"></span></div>
                <div class="text-warning text-center mt-3"><h4><a href="authorizevendor.do" class="text-white" title="See All Requests">Request For Authentication</a></h4></div>
                <div class="text-warning text-center mt-2"><h1 class="text-white">${adminDashCount.reqForAuth}</h1></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header bg-primary">PR RFQ Status Chart </h5>
                <div class="card-body update-backgroud-color">
                    <div id="pr_rfq_status_chart" class="cChart"></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header bg-primary">RFP Status Chart </h5>
                <div class="card-body update-backgroud-color">
                    <div id="pr_rfp_status_chart" class="cChart"></div>
                </div>
            </div>
        </div>
    </div>
</div>
