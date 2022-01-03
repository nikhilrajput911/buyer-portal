<div class="modal fade" id="conditiondetailsModal" tabindex="-1" role="dialog" aria-labelledby="conditiondetailsLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="conditiondetailsLabel">Condition Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="conditiondetailsForm" method="post" action="#">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                        <div class="tab-regular">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="itemConditions" class="inline">Item:</label>
                                            <input type="text" class="form-control form-rounded inline" id="itemConditions" name="itemConditions" style="width: 100px;margin-left: 75px;" readonly>&nbsp 
                                            <label for="applicationConditions" class="inline" style="margin-left: 200px;">Application:</label>
                                            <input type="text" class="form-control form-rounded inline" id="applicationConditions" name="applicationConditions" style="width: 60px;" readonly>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="condTypeConditions" class="inline">Condition Type:</label>
                                            <input type="text" class="form-control form-rounded inline" id="condTypeConditions" name="condTypeConditions" style="width: 60px;margin-left: 15px;" readonly>
                                            <input type="text" class="form-control form-rounded inline" id="condNameConditions" name="condTypeConditions" style="width: 100px;" readonly>&nbsp 
                                            <!--                                                                <label for="ConditionPricingDate" class="inline" style="margin-left: 135px;">Cond Pricing Date :</label>
                                                                                                            <div class="input-group date inline" id="ConditionPricingDate" data-target-input="nearest">
                                                                                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ConditionPricingDate_Value" name="ConditionPricingDate_Value" data-target="#ConditionPricingDate" />
                                                                                                                <div class="input-group-append" data-target="#ConditionPricingDate" data-toggle="datetimepicker">
                                                                                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                                                </div>
                                                                                                            </div>-->

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="conditionvalues" data-toggle="tab" href="#conditionvalues-tab" role="tab" aria-controls="DeliveryInvoide" aria-selected="true">Condition Values</a>
                                </li>
                                <!--                                                    <li class="nav-item">
                                                                                        <a class="nav-link" id="controldata" data-toggle="tab" href="#controldata-tab" role="tab" aria-controls="Conditions" aria-selected="false">Control Data</a>
                                                                                    </li>-->
                                <li class="nav-item">
                                    <a class="nav-link" id="accountdetermination" data-toggle="tab" href="#accountdetermination-tab" role="tab" aria-controls="Texts" aria-selected="false">Account Determination</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="conditionvalues-tab" role="tabpanel" aria-labelledby="conditionvalues-tab">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="amountConditions" class="inline">Amount:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="amountConditions" name="amountConditions" style="width: 200px;margin-left: 65px;">&nbsp 
                                                    <input type="text" class="form-control form-rounded inline" id="currency1Conditions" name="currency1Conditions" style="width: 60px;" readonly>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditions" class="inline">Condition Value:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="conditionValueConditions" name="conditionValueConditions" style="width: 150px;margin-left: 20px;">&nbsp 
                                                    <input type="text" class="form-control form-rounded inline" id="currency2Conditions" name="currency2Conditions" style="width: 60px;" readonly>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionBaseRateConditions" class="inline">Cond Base Value:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="conditionBaseRateConditions" name="conditionBaseRateConditions" readonly style="width: 200px;margin-left: 10px;">&nbsp 
                                                    <!--<input type="text" class="form-control form-rounded inline" id="currency1Conditions" name="currency1Conditions" style="width: 50px;">-->

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditions" class="inline">Cond Base Rate:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="conditionValueConditions" name="conditionValueConditions" readonly style="width: 200px;margin-left: 15px;">&nbsp 


                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditions" class="inline">UOM:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="uoMConditionValuesConditions" name="uoMConditionValuesConditions" style="width: 100px;margin-left: 80px;">&nbsp 

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditions" class="inline">Pricing Unit:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="pricingUnitConditions" name="pricingUnitConditions" style="width: 150px;margin-left: 45px;">&nbsp 

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="currencyConditions" class="inline">Currency:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="currencyConditions" name="currencyConditions" style="width: 60px;margin-left: 60px;" readonly>&nbsp 
                                                    <label for="ExchangeRateCondition" class="inline" style="margin-left: 60px;">Exchange Rate:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="ExchangeRateCondition" name="ExchangeRateCondition" style="width: 100px;margin-left: 10px;" readonly>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="currencyPr" class="inline">Doc. Currency:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="currencyPr" name="currencyPr" style="width: 60px;margin-left: 30px;" readonly>&nbsp 
                                                    <label for="ExchangeRatePr" class="inline" style="margin-left: 60px;">Exchange Rate:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="ExchangeRatePr" name="ExchangeRatePr" style="width: 100px;margin-left: 10px;" readonly>
                                                    <label for="locCurrency" class="inline" style="margin-left: 40px;">Local Currency:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="locCurrency" name="locCurrency" value="SGD" style="width: 60px;margin-left: 10px;" readonly="true">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="vendorCondition" class="inline">Vendor:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="vendorCondition" name="vendorCondition" style="width: 100px;margin-left: 70px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade show" id="controldata-tab" role="tabpanel" aria-labelledby="controldata-tab">
                                    <div class="card-body">
                                        <div class="row">
                                            <!--<h5>Control data</h5>-->
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionClass" class="">Condition Class (followed by Short Text)</label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionClass" name="ConditionClass">


                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="CalculateType" class="">Calculate Type  (followed by Short Text) </label>
                                                    <input type="text" class="form-control form-rounded" id="CalculateType" name="CalculateType">

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionCategory" class="">Condition Category  (followed by Short Text)</label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionCategory" name="ConditionCategory">


                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionControl" class="">Condition Control  (followed by Short Text) </label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionControl" name="ConditionControl">

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionOrigin" class="">Condition Origin  (followed by Short Text)</label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionOrigin" name="ConditionOrigin">


                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="Statistical" class="">Statistical</label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="Statistical" id="Statistical" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>

                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="Accruals" class="">Accruals</label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="Accruals" id="Accruals" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>

                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ChangedManually" class="">Changed Manually</label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="ChangedManually" id="ChangedManually" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>

                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade show" id="accountdetermination-tab" role="tabpanel" aria-labelledby="accountdetermination-tab" style="height:355px;">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="AccountKey" class="inline">Account Key:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="AccountKey" name="AccountKey" style="width: 100px;margin-left: 15px;" readonly>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="accrualsAccountDetermination" class="inline">Accurals:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="accrualsAccountDetermination" name="accrualsAccountDetermination" style="width: 100px;margin-left: 38px;" readonly>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="vendorCondition" class="inline" style="margin-left: 400px;">Vendor:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="vendorCondition" name="vendorCondition" style="width: 80px;margin-left: 15px;">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>



                </div>
                <!--                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                                                    </div>-->
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
                                        <input type="text" class="form-control form-rounded inline input-height" id="OrderService" name="OrderService" style="width:110px;margin-left:10px;">
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

                    </form>







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
<div class="modal fade modal-padding" id="profitabilitySegmentModal" style="max-height: 700px;max-width: 2000px;overflow-y: scroll;" tabindex="-1" role="dialog" aria-labelledby="profitabilitySegmentLabel" aria-hidden="true">
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



                    </form>
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
                <form id="ServiceAccountAssignmentForm" method="post" action="#">
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
                                            <input type="text" class="form-control form-rounded inline" id="accountAssignQuantity" name="accountAssignQuantity" style="width:150px;margin-left: 45px;height:25px;" disabled>
                                            <input type="text" class="form-control form-rounded inline" id="accountAssignuom" name="" style="width:50px;height:25px;" disabled>

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
                </form>
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
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblQuantity" value="" max="" style="width: 150px;"></td>           <!--1-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="" max="" style="width: 100px;"></td>         <!--2-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value="" style="width: 100px;"></td>                 <!--3-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value="" style="width: 100px;"></td>                    <!--4-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value="" style="width: 100px;"></td>                <!--5-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFund" value="" style="width: 100px;"></td>                      <!--6-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value="" style="width: 100px;"></td>            <!--7-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value="" style="width: 100px;"></td>                <!--8-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value="" style="width: 100px;"></td>            <!--9-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblOrder" value="" style="width: 100px;"></td>                     <!--10-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblAssets" value="" style="width: 100px;"></td>                    <!--11-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value="" style="width: 100px;"></td>                <!--12-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value="" style="width: 100px;"></td>                 <!--13-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value="" style="width: 100px;"></td>               <!--14-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value="" style="width: 100px;"></td>                 <!--15-->
                                    <td><input type="text" class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value="" style="width: 100px;"></td>           <!--16-->
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
                                    <tr class="">

                                        <th class="border-1" scope="col" style="width:50px;">Code</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearAccAsgnModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ConditionTypeHeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionTypeHeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ConditionTypeHeader">Condition Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered conditionTypeTableHeaderClass" id="conditionTypeTableHeaderId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Condition Type &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Name</th>
                                        <th class="border-1" scope="col">Currency</th>
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
<div class="modal fade" id="CurrencyHeaderModal" tabindex="-1" role="dialog" aria-labelledby="CurrencyHeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="CurrencyHeaderLabel">Currency</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover CurrencyModelTebleClass" id="CurrencyModelTebleId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="">Currency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="currencyCheckbox"></td>
                                        <td value="PQRS">PQRS</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="UoMHeaderModal" tabindex="-1" role="dialog" aria-labelledby="UoMHeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="UoMHeaderLabel">UOM</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover UOMModelTebleClass" id="UOMModelTebleId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="">UOM</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="UOMCheckbox"></td>
                                        <td value="LMNO">LMNO</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ConditionValueHeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionValueHeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ConditionValueHeaderLabel">Condition Value</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ConditionValueModelTebleClass" id="ConditionValueModelTebleId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="">Condition Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="ConditionValueCheckbox"></td>
                                        <td value="PQRTSE">PQRTSE</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="Currency2HeaderModal" tabindex="-1" role="dialog" aria-labelledby="Currency2HeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="Currency2HeaderLabel">Currency</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover Currency2ModelTebleClass" id="Currency2ModelTebleId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="">Currency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="Currency2Checkbox"></td>
                                        <td value="ABCDEFG">ABCDEFG</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
<div class="modal fade" id="ConditionValue2HeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionValue2HeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ConditionValue2HeaderLabel">Condition value</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ConditionValue2ModelTebleClass" id="ConditionValue2ModelTebleId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="">Condition Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="ConditionValue2Checkbox"></td>
                                        <td value="JKLMNOP">JKLMNOP</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ConditionCurrencyHeaderModal" tabindex="-1" role="dialog" aria-labelledby="ConditionCurrencyHeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ConditionCurrencyHeaderLabel">Condition Currency</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ConditionCurrencyModelTebleClass" id="ConditionCurrencyModelTebleId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="">Condition Currency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="ConditionCurrencyCheckbox"></td>
                                        <td value="XYZXYZ">XYZXYZ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="DeliverySchedule-DelDateCategoryField-Picklist-Model" tabindex="-1" role="dialog" aria-labelledby="DeliverySchedule-DelDateCategoryField-Picklist" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="DeliverySchedule-DelDateCategoryField-Picklist">Delivery Date Category</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover DeliverySchedule-DelDateCategoryField-Picklist-TableClass" id="DeliverySchedule-DelDateCategoryField-Picklist-TableId" style="width: 100%">
                                <thead class="table-header-color">
                                    <tr class="">
                                        <th class="border-1 th-color" style="width:50px;"></th>
                                        <th class="border-1 th-color">Delivery Date Category</th>
                                        <!--<th>Currency Description</th>-->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                        <td class="" value="D">D --  Day Format [Default Format for both Goods and Services -- Can be modified for Transport PO's]</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                        <td class="" value="T">T --  Day Format</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                        <td class="" value="W">W -- Week Format</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" class="DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass"></td>
                                        <td class="" value="M">M -- Month Format</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearDelDateCatModalBtn">Clear</button>
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

                                        <th class="border-1" scope="col" style="width:50px;">Item Category Code</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearItemCategoryModalBtn">Clear</button>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearGlAccountModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="coAreaModal" tabindex="-1" role="dialog" aria-labelledby="coAreaLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="coAreaLabel">CO Area</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover coAreaTable-Class" id="coAreaTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                        <th class="" scope="col">Item Category  Desc</th>
                                    </tr>
                                </thead>



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
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearCostCenterModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="fundModal" tabindex="-1" role="dialog" aria-labelledby="fundLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="fundLabel">Fund</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered fundTableClass" id="fundTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th class="" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                        <th class="" scope="col">Item Category  Desc</th>
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
<div class="modal fade" id="functionalAreaModal" tabindex="-1" role="dialog" aria-labelledby="functionalAreaLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="functionalAreaLabel">Functional Area</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered functionalAreaTableClass" id="functionalAreaTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th class="" scope="col" style="width:50px;">Code &nbsp;&nbsp;</th>
                                        <th class="" scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="fundCenterModal" tabindex="-1" role="dialog" aria-labelledby="fundCenterLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="fundCenterLabel">Fund Center</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered fundCenterTable-Class" id="fundCenterTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="" scope="col" style="width:50px;">Item Category Code &nbsp;&nbsp;</th>
                                        <th class="" scope="col">Item Category  Desc</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
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

                <input type="hidden" id="firstIOSno">
                <input type="hidden" id="lastIOSno" value="1">

                <div class="container-fluid">
                    <div class="card-body">

                        <div class="table-responsive">
                            <div class="row">
                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="internalOrderRecordCount">Record Count: </label>
                                        <select class="custom-select" id="internalOrderRecordCount">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                            <option>200</option>
                                            <option>500</option>
                                            <option>1000</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="">Order/ Description:</label>
                                        <input type="text" class="form-control form-rounded" id="internalOrderOrDesc_SearchText" placeholder="Search by order or description">
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <div class="btn-group" style="margin-top: 21px;">
                                            <input type="button" class="btn btn-success btn-sm" id="searchInternalOrderBtn" value="Search">
                                            <input type="button" class="btn btn-default btn-sm" id="clearSearchInternalOrderBtn" value="Clear">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <div class="btn-group" style="margin-top: 21px;">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchInternalOrderPrevBtn" value="Prev" disabled="true">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchInternalOrderNextBtn" value="Next">
                                        </div>                                                        
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <table class="table table-bordered table-hover accAsgnOrderTable-Class" id="accAsgnOrderTableId" style="width: 100%">
                                        <thead class="">
                                            <tr class="">
                                                <th style="width:50px;"></th>
                                                <th class="border-1" scope="col" style="width:50px;">Order &nbsp;&nbsp;</th>
                                                <th class="border-1" scope="col">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearOrderModalBtn">Clear</button>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearWbsElementModalBtn">Clear</button>
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
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearNetActModalBtn">Clear</button>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearAssetModalBtn">Clear</button>
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
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Service Number &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Service Category</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearServiceNumnerModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="limitsAccAssignmentModal" tabindex="-1" role="dialog" aria-labelledby="limitsAccAssignmentLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="limitsAccAssignmentLabel">Account Assignment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="">
                <div class="container-fluid">
                    <form id="limitsAccountAssignmentForm" method="post" action="#">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="gLAccount" class="inline" style="margin-left: 15px;" id="gLAccountLabel_Limits">GL Account: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="gLAccountInp_Limits" name="gLAccountService" style="width:100px;margin-left:30px;">
                                        <label for="coArea" class="inline" id="coAreaLabel_Limits" style="margin-left:60px;">CO Area: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="coAreaInp_Limits" name="coAreaService" style="width:100px;margin-left:35px;" disabled>
                                        <label for="coArea" class="inline" id="companyCodeLabel_Limits" style="margin-left:60px;">Com Code: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="companyCodeInp_Limits" name="companyCodeService" style="width:100px;margin-left:35px;" disabled>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-2 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="costCenterInp_Limits" id="costCenterLabel_Limits" class="inline" style="margin-left:15px;">Cost Center: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="costCenterInp_Limits" name="costCenterInp_Limits" style="width:100px;margin-left:10px;">
                                        <label for="orderInp_Limits" class="inline" id="orderLabel_Limits" style="margin-left:15px;">Order: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="orderInp_Limits" name="orderInp_Limits" style="width:100px;margin-left:10px;">
                                        <label for="assetInp_Limits" class="inline" id="assetLabel_Limits" style="margin-left:15px;">Asset: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="assetInp_Limits" name="assetInp_Limits" style="width:100px;margin-left:10px;">
                                        <label for="wBSElementInp_Limits" class="inline" id="wBSElementLabel_Limits" style="margin-left:15px;">WBS Element:</label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="wBSElementInp_Limits" name="wBSElementInp_Limits" style="width:100px;margin-left:10px;">
                                        <label for="salesOrderInp_Limits" class="inline" id="salesOrderLabel_Limits" style="margin-left:15px;"> Sales Order: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="salesOrderInp_Limits" name="salesOrderInp_Limits" style="width:100px;margin-left:5px;">
                                        <label for="itemNumberInp_Limits" class="inline" id="itemNumLabel_Limits" style="margin-left:15px;"> Item Number: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="itemNumberInp_Limits" name="itemNumberInp_Limits" style="width:100px;margin-left:5px;">
                                        <label for="delivSchInp_Limits" class="inline" id="delivSchLabel_Limits" style="margin-left:15px;"> Del Sch: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="delivSchInp_Limits" name="delivSchInp_Limits" style="width:100px;margin-left:5px;">
                                        <label for="fundInp_Limits" class="inline" id="fundLabel_Limits" style="margin-left:15px;">Fund: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="fundInp_Limits" name="fundInp_Limits" style="width:100px;margin-left:10px;">
                                        <label for="functionalAreaInp_Limits" class="inline" id="functionalAreaLabel_Limits" style="margin-left:15px;">Functional Area: </label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="functionalAreaInp_Limits" name="functionalAreaInp_Limits" style="width:150px;margin-left:10px;">
                                        <label for="fundCenterInp_Limits" class="inline" id="fundCenterLabel_Limits">Funds Center:</label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="fundCenterInp_Limits" name="fundCenterInp_Limits" style="width:150px;margin-left:10px;">
                                        <label for="commItemServiceInp_Limits" class="inline" id="commItemLabel_Limits" style="margin-left:15px;">Com Item:</label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="commItemServiceInp_Limits" name="commItemServiceInp_Limits" style="width:200px;margin-left:5px;">
                                        <label for="nActNumServiceInp_Limits" class="inline" id="nActNumLabel_Limits" style="margin-left:10px;">N/Act.Num:</label>
                                        <input type="text" class="form-control form-rounded inline input-height" id="nActNumServiceInp_Limits" name="nActNumServiceInp_Limits" style="width:100px;margin-left:15px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a><i type="buttom" class="fa fa-arrow-circle-right btn-lg btn-primary" id="limitAccAsgnChangeScreenbtn" title="Change Screen" aria-hidden="true"></i></a>
                    <a><i type="button" class="fas fa-save btn-lg btn-primary" id="saveLimitAccAsgnData" title="save"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>    
<div class="modal fade" id="limitsChangeAccAsgnScreenModal" tabindex="-1" role="dialog" aria-labelledby="limitsChangeAccAsgnScreenLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="limitsChangeAccAsgnScreenLabel">Account Assignment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="container-fluid">
                <form id="limitAccountAssignmentTableModal" method="post" action="#">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="limitAccountAssignLine" class="inline">Line:</label>
                                            <input type="text" class="form-control form-rounded inline" id="limitAccountAssignLine" name="limitAccountAssignLine" style="width:100px;margin-left: 65px;height:25px;" disabled>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="limitAccountAssignQuantity" class="inline">Quantity</label>
                                            <input type="text" class="form-control form-rounded inline" id="limitAccountAssignQuantity" name="limitAccountAssignQuantity" style="width:100px;margin-left: 45px;height:25px;" disabled>
                                            <input type="text" class="form-control form-rounded inline" id="limitAccountAssignuom" name="limitAccountAssignuom" style="width:40px;height:25px;" disabled>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="limitAccountAssignActivity" class="inline">Activity:</label>
                                            <input type="text" class="form-control form-rounded inline" id="limitAccountAssignActivity" name="limitAccountAssignActivity" style="width:100px;margin-left: 50px;height:25px;" disabled>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="limitAccountAssignShortText" class="inline">Short Text:</label>
                                            <input type="text" class="form-control form-rounded inline" id="limitAccountAssignShortText" name="limitAccountAssignShortText" style="width:250px;margin-left: 30px;height:25px;" disabled>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                <div class="row">
                                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="limitDistributionIndicator" class="inline">Distribution Indicator</label>
                                            <div><hr style="margin-top:0rem;margin-bottom:0rem">
                                                <label class="custom-control custom-radio">
                                                    <input type="radio" name="limitDistributionIndicator" id="limitNoMultiAcctAssignment" class="custom-control-input" disabled="true"><span class="custom-control-label">No Multi Act Assignment</span>
                                                </label>
                                                <label class="custom-control custom-radio ">
                                                    <input type="radio" name="limitDistributionIndicator" id="limitDistOnQuantBases" class="custom-control-input" disabled="true"><span class="custom-control-label">Distribution On Quantity Bases</span>
                                                </label>
                                                <label class="custom-control custom-radio ">
                                                    <input type="radio" name="limitDistributionIndicator" id="limitDistByPercentageBases" class="custom-control-input" checked="true"><span class="custom-control-label">Distribution By Percentage</span>

                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="limitTabAccAsgnTebleId">
                            <thead class="table-header-color">
                                <tr class="border-0">                                                   
                                    <th class="border-0"></th>                                      <!--0-->
                                    <th class="border-0 th-color">Quant</th>                        <!--1-->
                                    <th class="border-0 th-color">GL A/C</th>                       <!--2-->
                                    <th class="border-0 th-color">CO Area</th>                      <!--3-->
                                    <th class="border-0 th-color">Cost Center</th>                  <!--4-->
                                    <th class="border-0 th-color">Fund</th>                         <!--5-->
                                    <th class="border-0 th-color">Fun Area</th>                     <!--6-->
                                    <th class="border-0 th-color">Fund Center</th>                  <!--7-->
                                    <th class="border-0 th-color">Com Item</th>                     <!--8-->
                                    <th class="border-0 th-color">Order</th>                        <!--9-->
                                    <th class="border-0 th-color">Asset</th>                        <!--10-->
                                    <th class="border-0 th-color">WBS Elements</th>                 <!--11-->
                                    <th class="border-0 th-color">Sales Order</th>                  <!--12-->
                                    <th class="border-0 th-color">Network/Activity Number</th>      <!--13-->
                                    <th class="border-0 th-color">Item Number</th>                  <!--14-->
                                    <th class="border-0 th-color">Delivery Schedule</th>            <!--15-->
                                </tr>
                            </thead>
                            <tbody>   
                                <tr>
                                    <td></td>                                                                                                                     <!--0-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblQuantity" value="" max=""></td>           <!--1-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblGLAccount" value=""></td>                 <!--2-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblCOArea" value=""></td>                    <!--3-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblCostCetner" value=""></td>                <!--4-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblFund" value=""></td>                      <!--5-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblFunctionalArea" value=""></td>            <!--6-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblFundCenter" value=""></td>                <!--7-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblCommitmentItem" value=""></td>            <!--8-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblOrder" value=""></td>                     <!--9-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblAssets" value=""></td>                    <!--10-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblWBSElement" value=""></td>                <!--11-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblSalesOrder" value=""></td>                 <!--12-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblNetActNumber" value=""></td>               <!--13-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblItemNumber" value=""></td>                 <!--14-->
                                    <td><input type="text" class="form-control form-rounded input-height limitAccAsgnTblDeliverySchedule" value=""></td>           <!--15-->
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!--</form>-->
            <!--</div>-->
            <div class="modal-footer">
                <a><i type="buttom" class="fa fa-arrow-circle-left btn-lg btn-primary" id="limitBackChangedScreen" title="Change Screen" aria-hidden="true"></i></a>
                <button type="button" class="btn btn-primary" id="limitAccountAsgnTblSaveBtn">Submit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="TaxCodeModal" tabindex="-1" role="dialog" aria-labelledby="TaxCodeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="TaxCodeLabel">Tax Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover TaxCodeTableClass" id="TaxCodeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Tax Code &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Tax Code Description</th>













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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearTaxCodeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="BusinessAreaModal" tabindex="-1" role="dialog" aria-labelledby="BusinessAreaLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="BusinessAreaLabel">Business Area</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover BusinessAreaTableClass" id="BusinessAreaTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Business Area &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Business Area Description</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearBusinessAreaModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="SalesOrgModal" tabindex="-1" role="dialog" aria-labelledby="SalesOrgLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="SalesOrgLabel">Sales Organisation</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover SalesOrgTableClass" id="SalesOrgTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Sales Organisation Code &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Sales Organisation Name</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearSalesOrgModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="DistrChannelModal" tabindex="-1" role="dialog" aria-labelledby="DistrChannelLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="DistrChannelLabel">Distributed Channel</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover DistrChannelTableClass" id="DistrChannelTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearDistrChnlModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="DividionModal" tabindex="-1" role="dialog" aria-labelledby="DividionLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="DistrChannelLabel">Division</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover DividionTableClass" id="DividionTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
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
<div class="modal fade" id="CostObjectModal" tabindex="-1" role="dialog" aria-labelledby="CostObjectLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="CostObjectLabel">Cost Object</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <!--                                            <table class="table table-bordered table-hover DividionTableClass" id="DividionTableId" style="width: 100%">
                                                                            <thead class="">
                                                                                <tr class="">
                                                                                    <th style="width:50px;"></th>
                                                                                    <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
                                                                                    <th class="border-1" scope="col">Name</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                            
                                                                            </tbody>
                                                                        </table>-->
                        </div>
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ProfitCenterModal" tabindex="-1" role="dialog" aria-labelledby="ProfitCenterLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ProfitCenterLabel">Profit Center</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ProfitCenterTableClass" id="ProfitCenterTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Profit Center &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearProfitCenterModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="PartnerPCModal" tabindex="-1" role="dialog" aria-labelledby="PartnerPCLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="PartnerPCLabel">Partner PC</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover PartnerPCTableClass" id="PartnerPCTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Partner PC &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearPartnerPcModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="CountryModal" tabindex="-1" role="dialog" aria-labelledby="CountryLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="CountryLabel">Country</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover CountryTableClass" id="CountryTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Country Code &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearCountryModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="SalesOfficeModal" tabindex="-1" role="dialog" aria-labelledby="SalesOfficeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="SalesOfficeLabel">Sales Office</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover SalesOfficeTableClass" id="SalesOfficeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Sales Office &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearSalesOfcBtn">Clear</button>
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
                                        <th style="width:50px;"></th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearMatlGrpModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="CustomerGroupModal" tabindex="-1" role="dialog" aria-labelledby="CustomerGroupLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="CustomerGroupLabel">Customer Group</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover CustomerGroupTableClass" id="CustomerGroupTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Customer Group &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearCustomerGrpModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ProdHierLev1Modal" tabindex="-1" role="dialog" aria-labelledby="ProdHierLev1Label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ProdHierLev1Label">Product Hierarchy</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ProdHierLev1TableClass" id="ProdHierLev1TableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearProdHierLvl1ModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ProdHierLev2Modal" tabindex="-1" role="dialog" aria-labelledby="ProdHierLev2Label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ProdHierLev2Label">Product Hierarchy</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ProdHierLev2TableClass" id="ProdHierLev2TableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearProdHierLvl2ModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ProdHierLev3Modal" tabindex="-1" role="dialog" aria-labelledby="ProdHierLev3Label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ProdHierLev3Label">Product Hierarchy</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ProdHierLev3TableClass" id="ProdHierLev3TableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearProdHierLvl3ModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ReferenceDocModal" tabindex="-1" role="dialog" aria-labelledby="ReferenceDocLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ReferenceDocLabel">Reference Doc</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ReferenceDocTableClass" id="ReferenceDocTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Reference Doc &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Item</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearreferenceDocModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="MaterialTypeModal" tabindex="-1" role="dialog" aria-labelledby="MaterialTypeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="MaterialTypeLabel">Material Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover MaterialTypeTableClass" id="MaterialTypeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Material Type &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearMaterialTypeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ProjectIndModal" tabindex="-1" role="dialog" aria-labelledby="ProjectIndLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ProjectIndLabel">Project Indicator</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ProjectIndTableClass" id="ProjectIndTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Name &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Project Indicator</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearProjectIndModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ValuationTypeModal" tabindex="-1" role="dialog" aria-labelledby="ValuationTypeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ValuationTypeLabel">Valuation Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ValuationTypeTableClass" id="ValuationTypeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Valuation Type &nbsp;&nbsp;</th>
                                        <!--<th class="border-1" scope="col">Project Indicator</th>-->
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearValuationTypeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="CustomerClassModal" tabindex="-1" role="dialog" aria-labelledby="CustomerClassLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="CustomerClassLabel">Customer Classification</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover CustomerClassTableClass" id="CustomerClassTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Customer Classification &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearCustomerClassModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="MaterialSourceIndModal" tabindex="-1" role="dialog" aria-labelledby="MaterialSourceIndLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="MaterialSourceIndLabel">Material Source Ind</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover MaterialSourceIndTableClass" id="MaterialSourceIndTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Material Source Ind &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearMatlSourceIndModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ContractTypeModal" tabindex="-1" role="dialog" aria-labelledby="ContractTypeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ContractTypeLabel">Contract Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ContractTypeTableClass" id="ContractTypeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Contract Type &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearContractTypeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="IndustryCode1Modal" tabindex="-1" role="dialog" aria-labelledby="IndustryCode1Label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="IndustryCode1Label">Industry Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover IndustryCode1TableClass" id="IndustryCode1TableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearIndCodeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="IndustryCode2Modal" tabindex="-1" role="dialog" aria-labelledby="IndustryCode2Label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="IndustryCode2Label">Industry Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover IndustryCode2TableClass" id="IndustryCode2TableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearIndCode2ModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="IndustryCode3Modal" tabindex="-1" role="dialog" aria-labelledby="IndustryCode3Label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="IndustryCode3Label">Industry Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover IndustryCode3TableClass" id="IndustryCode3TableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearIndCode3ModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="SalesDocTypeModal" tabindex="-1" role="dialog" aria-labelledby="SalesDocTypeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="SalesDocTypeLabel">Sales Doc Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover SalesDocTypeTableClass" id="SalesDocTypeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Sales Doc Type &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearSalesDocTypeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ReferenceItemModal" tabindex="-1" role="dialog" aria-labelledby="ReferenceItemLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ReferenceItemLabel">Reference Item</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ReferenceItemTableClass" id="ReferenceItemTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Reference Item &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Document</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearRefItemModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="BillingTypeModal" tabindex="-1" role="dialog" aria-labelledby="BillingTypeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="BillingTypeLabel">Billing Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover BillingTypeTableClass" id="BillingTypeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Process Type &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearBillingTypeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ProdHierarchyModal" tabindex="-1" role="dialog" aria-labelledby="ProdHierarchyLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ProdHierarchyLabel">Product Hierarchy</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover ProdHierarchyTableClass" id="ProdHierarchyTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Product Hierarchy &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearProdHierModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="HigherLevItemModal" tabindex="-1" role="dialog" aria-labelledby="HigherLevItemLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="HigherLevItemLabel">Higher Level Item</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover HigherLevItemTableClass" id="HigherLevItemTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Higher Lev Item &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearHigherLvlItmModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="IndCodeModal" tabindex="-1" role="dialog" aria-labelledby="IndCodeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="IndCodeLabel">Industry Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover IndCodeTableClass" id="IndCodeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Industry Code &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearIndsTryCodeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="IndField001Modal" tabindex="-1" role="dialog" aria-labelledby="IndField001Label" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="IndField001Label">Industry Field 001</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover IndField001TableClass" id="IndField001TableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Industry Field 001 &nbsp;&nbsp;</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearIndField001ModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="prlineitemattachmentmodal" tabindex="-1" role="dialog" aria-labelledby="attLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form action="submitpoattachment" method="post" enctype="multipart/form-data" id="pocreationdocform">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                <!--<input type="hidden" id="linkid" value="">-->

                <div class="modal-header">
                    <h5 class="modal-title" id="attLabel">Attachments</h5>
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
                                            <button class="btn btn-primary btn-choose" type="button">Supporting documents-1</button>
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
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <div class="input-group input-file" name="docDiv2">
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary btn-choose" type="button">Supporting documents-2</button>
                                        </span>
                                        <input type="text" class="form-control" id="doc2" placeholder='Choose a file...' />
                                        <span class="input-group-btn">
                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <div class="input-group input-file" name="docDiv3">
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary btn-choose" type="button">Supporting documents-3</button>
                                        </span>
                                        <input type="text" class="form-control" id="doc3" placeholder='Choose a file...' />
                                        <span class="input-group-btn">
                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <div class="input-group input-file" name="docDiv4">
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary btn-choose" type="button">Supporting documents-4</button>
                                        </span>
                                        <input type="text" class="form-control" id="doc4" placeholder='Choose a file...' />
                                        <span class="input-group-btn">
                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="form-group">
                                    <div class="input-group input-file" name="docDiv5">
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary btn-choose" type="button">Supporting documents-5</button>
                                        </span>
                                        <input type="text" class="form-control" id="doc5" placeholder='Choose a file...' />
                                        <span class="input-group-btn">
                                            <button class="btn btn-warning btn-resetbtn" type="button">Reset</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="uploaddocumentModalBtn">Submit</button>
                </div>
            </form>
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
                                                <th class="border-0">Order Unit</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearMatPrModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="matlLongTextModal" tabindex="-1" role="dialog" aria-labelledby="matlLongTextLabel" aria-hidden="true">
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
<div class="modal fade" id="CurrencyMasterModal" tabindex="-1" role="dialog" aria-labelledby="CurrencyMasterLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="CurrencyMasterLabel">Currency</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover CurrencyMasterTable" id="CurrencyMasterTable" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th class="" style="width:50px;">Currency</th>
                                        <th>Currency Description</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearCurrencyModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="plantMasterModal" tabindex="-1" role="dialog" aria-labelledby="plantMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="plantMasterModalLabel">Plant Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover plantMasterTable" id="plantMasterTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Plant Name</th>
                                <th class="border-0">Plant Code</th>
                                <th class="border-0">Plant Description</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearPlantPrModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="purchaseGroupMasterModal" tabindex="-1" role="dialog" aria-labelledby="purchaseGroupMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="purchaseGroupMasterModalLabel">Purchase Group Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover purchaseGroupMasterTable" id="purchaseGroupMasterTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Purchase Group Code</th>

                                <th class="border-0">Purchase Group Description</th>
                            </tr>
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
<div class="modal fade" id="PurchaseOrganizationMasterModal" tabindex="-1" role="dialog" aria-labelledby="PurchaseOrganizationMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="PurchaseOrganizationMasterModalLabel">Purchase Organization Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover purchaseOrgMasterTable" id="purchaseOrgMasterTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Purchase Org. Code</th>
                                <th class="border-0">Purchase Org. Description</th>
                            </tr>
                        </thead>
                        <tbody>

                        <c:forEach var="purchase" items="${masterPurchaseOrgList}">
                            <tr class="purchaseOrgMasterTrClass">
                                <td>${purchase.purchaseOrgCode}</td>
                                <td>${purchase.purchaseOrgDesc}</td>
                            </tr>
                        </c:forEach>
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
<div class="modal fade" id="StorageLocationMasterModal" tabindex="-1" role="dialog" aria-labelledby="StorageLocationMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="StorageLocationMasterModalLabel">Storage Location Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover storageLocationMasterTable" id="storageLocationMasterTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Location Code</th>
                                <th class="border-0">Location Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearStLocModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<!--                <div class="modal fade" id="StorageLocationMasterModal" tabindex="-1" role="dialog" aria-labelledby="StorageLocationMasterModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="StorageLocationMasterModalLabel">Storage Location Master</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover storageLocationMasterTable" id="storageLocationMasterTable" style="width:100%;">
                                        <thead>
                                            <tr class="border-0">
                                                <th class="border-0">Location Code</th>
                                                <th class="border-0">Location Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>

<c:forEach var="loc" items="${masterLocationList}">
    <tr class="storgageLocMasterTrClass">
        <td>${loc.locationCode}</td>
        <td>${loc.locationDesc}</td>
    </tr>
</c:forEach>

</tbody>
</table>
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>-->
<div class="modal fade" id="DepartmentMasterModal" tabindex="-1" role="dialog" aria-labelledby="DepartmentMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="DepartmentMasterModalLabel">Department Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover departmentMasterTable" id="departmentMasterTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Department Code</th>
                                <th class="border-0">Department Description</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearDepartmentModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="PoDepartmentMasterModal" tabindex="-1" role="dialog" aria-labelledby="PoDepartmentMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="PoDepartmentMasterModalLabel">Department Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover poDepartmentMasterTable" id="poDepartmentMasterTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Department Code</th>
                                <th class="border-0">Department Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        <c:forEach var="dept" items="${masterDeptList}">
                            <tr class="poDepartmentMasterTrClass">
                                <td>${dept.departmentCode}</td>
                                <td>${dept.departmentDesc}</td>
                            </tr>
                        </c:forEach>
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
<div class="modal fade" id="trackingNumnerModal" tabindex="-1" role="dialog" aria-labelledby="trackingNumnerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="trackingNumnerModalLabel">Tracking Number</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover trackingNumnerModalTable" id="trackingNumnerModalTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Department Code</th>
                                <th class="border-0">Department Description</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearTrackNumberModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="PurchaseOrgModal" tabindex="-1" role="dialog" aria-labelledby="PurchaseOrgLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="costCenterLabel">Purchase Organization</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered purchaseOrgTableClass" id="puechaseOrgTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Purchase Organization &nbsp;&nbsp;</th>
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
<div class="modal fade" id="ConditionTypeModal" tabindex="-1" role="dialog" aria-labelledby="ConditionTypeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="costCenterLabel">Condition Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered conditionTypeCheckboxClass" id="conditionTypeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Condition Type &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Name</th>
                                        <th class="border-1" scope="col">Currency</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearConditionTypeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="CustomerCodeModal" tabindex="-1" role="dialog" aria-labelledby="CustomerCodeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="CustomerCodeLabel">Customer Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered customerCodeTableClass" id="customerCodeTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th class="border-1" scope="col" style="width:50px;">Customer Code  &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Name</th>
                                        <th class="border-1" scope="col">Email Id</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearCustomerCodeModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="SalesOrderModal" tabindex="-1" role="dialog" aria-labelledby="SalesOrderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="costCenterLabel">Sales Order</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered salesOrderTableClass" id="salesOrderTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Sales Order &nbsp;&nbsp;</th>
                                        <!--<th class="border-1" scope="col">Description</th>-->
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearSalesOrderModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="ItemNumberModal" tabindex="-1" role="dialog" aria-labelledby="ItemNumberLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ItemNumberLabel">Item Number</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered itemNumberTableClass" id="itemNumberTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Item Number &nbsp;&nbsp;</th>
                                        <!--<th class="border-1" scope="col">Description</th>-->
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearItemNumberModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="DividionModal" tabindex="-1" role="dialog" aria-labelledby="DividionLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="DistrChannelLabel">Division</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover DividionTableClass" id="DividionTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th style="width:50px;"></th>
                                        <th class="border-1" scope="col" style="width:50px;">Distributed Channel &nbsp;&nbsp;</th>
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
<div class="modal fade" id="MaterialCodeModal" tabindex="-1" role="dialog" aria-labelledby="MaterialCodeLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="MaterialCodeLabel">Material Code</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered materialCheckboxClass" id="materailTableId" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <!--<th style="width:50px;"></th>-->
                                        <th class="border-1" scope="col" style="width:50px;">Material  &nbsp;&nbsp;</th>
                                        <th class="border-1" scope="col">Description</th>
                                        <th class="border-1" scope="col">Product Storage Location</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearMaterialCodeModalBtn">Clear</button>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="clearPlantModalBtn">Clear</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="VendorMasterModal" tabindex="-1" role="dialog" aria-labelledby="VendorMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="VendorMasterModalLabel">Vendor Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered vendorMasterModalTable" id="vendorMasterModalTable" style="width: 100%">
                                <thead class="">
                                    <tr class="">
                                        <th class="border-1" scope="col">Vendor Code</th>
                                        <th class="border-1" scope="col">Vendor Name</th>
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
                            <tr class="border-0">
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
<div class="modal fade" id="conditiondetailsHeaderModal" tabindex="-1" role="dialog" aria-labelledby="conditiondetailsHeaderLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="conditiondetailsHeaderLabel">Condition Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="conditiondetailsHeaderForm" method="post" action="#">
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

                        <div class="tab-regular">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="itemConditionsHeader" class="inline">Item:</label>
                                            <input type="text" class="form-control form-rounded inline" id="itemConditionsHeader" name="itemConditionsHeader" style="width: 100px;margin-left: 75px;" readonly>&nbsp 
                                            <label for="applicationConditionsHeader" class="inline" style="margin-left: 200px;">Application:</label>
                                            <input type="text" class="form-control form-rounded inline" id="applicationConditionsHeader" name="applicationConditionsHeader" style="width: 60px;" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group two">
                                            <label for="condTypeConditionsHeader" class="inline">Condition Type:</label>
                                            <input type="text" class="form-control form-rounded inline" id="condTypeConditionsHeader" name="condTypeConditionsHeader" style="width: 60px;margin-left: 15px;" readonly>
                                            <input type="text" class="form-control form-rounded inline" id="condNameConditionsHeader" name="condTypeConditionsHeader" style="width: 100px;" readonly>&nbsp 
                                            <!--                                                                <label for="ConditionPricingDateHeader" class="inline" style="margin-left: 135px;">Cond Pricing Date :</label>
                                                                                                            <div class="input-group date inline" id="ConditionPricingDateHeader" data-target-input="nearest">
                                                                                                                <input type="text" class="form-control datetimepicker-input manual-date-input-check" id="ConditionPricingDateHeader_Value" name="ConditionPricingDateHeader_Value" data-target="#ConditionPricingDate" />
                                                                                                                <div class="input-group-append" data-target="#ConditionPricingDateHeader" data-toggle="datetimepicker">
                                                                                                                    <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                                                                                                                </div>
                                                                                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="nav nav-tabs nav-fill" id="myTab7" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="conditionvaluesHeader" data-toggle="tab" href="#conditionvaluesHeader-tab" role="tab" aria-controls="conditionvaluesHeader" aria-selected="true">Condition Values</a>
                                </li>
                                <!--                                                                                                        <li class="nav-item">
                                                                                                                                            <a class="nav-link" id="controldata" data-toggle="tab" href="#controldata-tab" role="tab" aria-controls="Conditions" aria-selected="false">Control Data</a>
                                                                                                                                        </li>-->
                                <!--                                                                                                        <li class="nav-item">
                                                                                                                                            <a class="nav-link" id="accountdetermination" data-toggle="tab" href="#accountdetermination-tab" role="tab" aria-controls="Texts" aria-selected="false">Account Determination</a>
                                                                                                                                        </li>-->
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="conditionvaluesHeader-tab" role="tabpanel" aria-labelledby="conditionvaluesHeader-tab">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="amountConditionsHeader" class="inline">Amount:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="amountConditionsHeader" name="amountConditionsHeader" style="width: 200px;margin-left: 65px;">&nbsp 
                                                    <input type="text" class="form-control form-rounded inline" id="currency1ConditionsHeader" name="currency1ConditionsHeader" style="width: 60px;" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditionsHeader" class="inline">Condition Value:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="conditionValueConditionsHeader" name="conditionValueConditionsHeader" style="width: 150px;margin-left: 20px;">&nbsp 
                                                    <input type="text" class="form-control form-rounded inline" id="currency2ConditionsHeader" name="currency2ConditionsHeader" style="width: 60px;" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionBaseRateConditionsHeader" class="inline">Cond Base Value:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="conditionBaseRateConditionsHeader" name="conditionBaseRateConditionsHeader" readonly style="width: 200px;margin-left: 10px;">&nbsp 
                                                    <!--<input type="text" class="form-control form-rounded inline" id="currency1Conditions" name="currency1Conditions" style="width: 50px;">-->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditionsHeader" class="inline">Cond Base Rate:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="conditionBaseRateHeader" name="conditionBaseRateHeader" readonly style="width: 200px;margin-left: 15px;">&nbsp 

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditionsHeader" class="inline">UOM:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="uoMConditionValuesConditionsHeader" name="uoMConditionValuesConditionsHeader" style="width: 100px;margin-left: 80px;">&nbsp 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="conditionValueConditionsHeader" class="inline">Pricing Unit:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="pricingUnitConditionsHeader" name="pricingUnitConditionsHeader" style="width: 150px;margin-left: 45px;">&nbsp 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="currencyConditionsHeader" class="inline">Currency:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="currencyConditionsHeader" name="currencyConditionsHeader" style="width: 60px;margin-left: 60px;" readonly>&nbsp 
                                                    <label for="ExchangeRateConditionHeader" class="inline" style="margin-left: 60px;">Exchange Rate:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="ExchangeRateConditionHeader" name="ExchangeRateConditionHeader" style="width: 100px;margin-left: 10px;" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="currencyPrHeader" class="inline">Doc. Currency:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="currencyPrHeader" name="currencyPrHeader" style="width: 60px;margin-left: 30px;" readonly>&nbsp 
                                                    <label for="ExchangeRatePrHeader" class="inline" style="margin-left: 60px;">Exchange Rate:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="ExchangeRatePrHeader" name="ExchangeRatePrHeader" style="width: 100px;margin-left: 10px;" readonly>
                                                    <label for="locCurrencyHeader" class="inline" style="margin-left: 40px;">Local Currency:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="locCurrencyHeader" name="locCurrencyHeader" value="SGD" style="width: 60px;margin-left: 10px;" readonly="true">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="vendorConditionHeader" class="inline">Vendor:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="vendorConditionHeader" name="vendorConditionHeader" style="width: 100px;margin-left: 70px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade show" id="controldataHeader-tab" role="tabpanel" aria-labelledby="controldataHeader-tab">
                                    <div class="card-body">
                                        <div class="row">
                                            <!--<h5>Control data</h5>-->
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionClassHeader" class="">Condition Class (followed by Short Text)</label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionClassHeader" name="ConditionClassHeader">

                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="CalculateTypeHeader" class="">Calculate Type  (followed by Short Text) </label>
                                                    <input type="text" class="form-control form-rounded" id="CalculateTypeHeader" name="CalculateTypeHeader">
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionCategoryHeader" class="">Condition Category  (followed by Short Text)</label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionCategoryHeader" name="ConditionCategoryHeader">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionControlHeader" class="">Condition Control  (followed by Short Text) </label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionControlHeader" name="ConditionControlHeader">
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ConditionOriginHeader" class="">Condition Origin  (followed by Short Text)</label>
                                                    <input type="text" class="form-control form-rounded" id="ConditionOriginHeader" name="ConditionOriginHeader">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="StatisticalHeader" class="">Statistical</label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="StatisticalHeader" id="StatisticalHeader" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="AccrualsHeader" class="">Accruals</label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="AccrualsHeader" id="AccrualsHeader" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="ChangedManuallyHeader" class="">Changed Manually</label>
                                                    <label class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="ChangedManuallyHeader" id="ChangedManuallyHeader" class="custom-control-input"><span class="custom-control-label" required="">Yes</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade show" id="accountdeterminationHeader-tab" role="tabpanel" aria-labelledby="accountdeterminationHeader-tab" style="height:355px;">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="AccountKeyHeader" class="inline">Account Key:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="AccountKeyHeader" name="AccountKeyHeader" style="width: 100px;margin-left: 15px;" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group two">
                                                    <label for="accrualsAccountDeterminationHeader" class="inline">Accurals:</label>
                                                    <input type="text" class="form-control form-rounded inline" id="accrualsAccountDeterminationHeader" name="accrualsAccountDeterminationHeader" style="width: 100px;margin-left: 38px;" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <!--                                                            <div class="row">
                                                                                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                                                            <div class="form-group two">
                                                                                                                <label for="vendorConditionHeader" class="inline" style="margin-left: 400px;">Vendor:</label>
                                                                                                                <input type="text" class="form-control form-rounded inline" id="vendorConditionHeader" name="vendorConditionHeader" style="width: 100px;margin-left: 15px;">
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <!--                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" id="associatesubmitbtn">Submit</button>
                                                    </div>-->
            </div>

        </div>
    </div>
</div>
<div class="modal fade" id="orderPriceUnitModal" tabindex="-1" role="dialog" aria-labelledby="orderPriceUnitModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderPriceUnitModalLabel">Order Price Unit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover orderPriceUnitModalTable" id="orderPriceUnitModalTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">OPU</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <!--<button type="button" class="btn btn-primary" id="clearOpuModalBtn">Clear</button>-->
            </div>
        </div>
    </div>
</div>                        
</div>
<div class="modal fade" id="taxButtonModal" tabindex="-1" role="dialog" aria-labelledby="taxButtonModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="taxButtonModalLabel">Display Taxes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="form-group two">
                            <label for="itemTaxBtn" class="inline">Item:</label>
                            <input type="text" class="form-control form-rounded inline" id="itemTaxBtn" name="itemTaxBtn" style="width: 50px;margin-left: 10px;" disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="form-group two">
                            <label for="materialTaxBtn" class="inline" style="margin-left: 250px;">Material:</label>
                            <input type="text" class="form-control form-rounded inline" id="materialTaxBtn" name="materialTaxBtn" style="width: 150px;margin-left: 10px;" disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="form-group two">
                            <label for="netTaxBtn" class="inline" style="margin-left: 250px;">Net:</label>
                            <input type="text" class="form-control form-rounded inline" id="netTaxBtn" name="netTaxBtn" style="width: 150px;margin-left: 35px;" disabled>
                            <input type="text" class="form-control form-rounded inline" id="netTaxBtn2" name="netTaxBtn2" style="width: 60px;" disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="form-group two">
                            <label for="taxTaxBtn" class="inline" style="margin-left: 250px;">Tax</label>
                            <input type="text" class="form-control form-rounded inline" id="taxTaxBtn" name="taxTaxBtn" style="width: 150px;margin-left: 38px;" disabled>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered taxButtonTableClass" id="taxButtonTableId">
                        <thead class="table-header-color">
                            <tr class="border-0">
                                <!--<th></th>-->
                                <th class="border-1 th-color">Condition Type</th>
                                <th class="border-1 th-color">Name</th>
                                <th class="border-1 th-color">Amount</th>
                                <th class="border-1 th-color">Currency</th>
                                <th class="border-1 th-color">Per</th>
                                <th class="border-1 th-color">Condition Pricing Unit</th>
                                <th class="border-1 th-color">UOM</th>
                                <th class="border-1 th-color">Condition Value</th>
                                <th class="border-1 th-color">Currency</th>
                                <th class="border-1 th-color">Condition Value</th>
                                <th class="border-1 th-color">Condition Currency</th>
                                <th class="border-1 th-color">Status</th>
                                <th class="border-1 th-color">Numerator</th>
                                <th class="border-1 th-color">Base UOM</th>
                                <th class="border-1 th-color">Deno. for Conv</th>
                                <th class="border-1 th-color">UOM - Extra</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type='text' class='form-control form-rounded conditionTypeTaxBtn tableInputField' name='conditionTypeTaxBtn' style='width:100px;' disabled = 'true' value='BABS'></td>
                                <td><input type='text' class='form-control form-rounded nameConditionsTaxBtn tableInputField' style='width:200px;' name='nameConditionsTaxBtn' disabled = 'true' value='Base Amount'></td>
                                <td><input type='text' class='form-control form-rounded amountTaxBtn tableInputField' name='amountTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded currencyTaxBtn tableInputField' name='currencyTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded perQuantityTaxBtn tableInputField' name='perQuantityTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded cpuTaxBtn tableInputField' disabled name='cpuTaxBtn' value=''></td>
                                <td><input type='text' class='form-control form-rounded UoMTaxBtn tableInputField' name='UoMTaxBtn' style='width:100px;' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionValueTaxBtn tableInputField' name='conditionValueTaxBtn' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded currency2TaxBtn tableInputField' name='currency2TaxBtn' style='width:100px;' readonly = 'true' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded conditionValue2TaxBtn tableInputField' value='0.00' name = 'conditionValue2TaxBtn' style='width:100px;' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionCurrencyTaxBtn tableInputField' name='conditionCurrencyTaxBtn' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded statusTaxBtn tableInputField' name='statusTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded numeratorTaxBtn tableInputField' name='numeratorTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded baseUoMTaxBtn tableInputField' name='baseUoMTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded denoForConvTaxBtn tableInputField' name='denoForConvTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded uOMExtraTaxBtn tableInputField' name='uOMExtraTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                            </tr>
                            <tr>
                                <td><input type='text' class='form-control form-rounded conditionTypeTaxBtn tableInputField' name='conditionTypeTaxBtn' style='width:100px;' disabled = 'true' value=''></td>
                                <td><input type='text' class='form-control form-rounded nameConditionsTaxBtn tableInputField' style='width:200px;' name='nameConditionsTaxBtn' disabled = 'true' value='Calculated Cal'></td>
                                <td><input type='text' class='form-control form-rounded amountTaxBtn tableInputField' name='amountTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded currencyTaxBtn tableInputField' name='currencyTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded perQuantityTaxBtn tableInputField' name='perQuantityTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded cpuTaxBtn tableInputField' disabled name='cpuTaxBtn' value=''></td>
                                <td><input type='text' class='form-control form-rounded UoMTaxBtn tableInputField' name='UoMTaxBtn' style='width:100px;' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionValueTaxBtn tableInputField' name='conditionValueTaxBtn' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded currency2TaxBtn tableInputField' name='currency2TaxBtn' style='width:100px;' readonly = 'true' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded conditionValue2TaxBtn tableInputField' value='0.00' name = 'conditionValue2TaxBtn' style='width:100px;' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionCurrencyTaxBtn tableInputField' name='conditionCurrencyTaxBtn' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded statusTaxBtn tableInputField' name='statusTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded numeratorTaxBtn tableInputField' name='numeratorTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded baseUoMTaxBtn tableInputField' name='baseUoMTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded denoForConvTaxBtn tableInputField' name='denoForConvTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded uOMExtraTaxBtn tableInputField' name='uOMExtraTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                            </tr>
                            <tr>
                                <td><input type='text' class='form-control form-rounded conditionTypeTaxBtn tableInputField' name='conditionTypeTaxBtn' style='width:100px;' disabled = 'true' value=''></td>
                                <td><input type='text' class='form-control form-rounded nameConditionsTaxBtn tableInputField' style='width:200px;' name='nameConditionsTaxBtn' disabled = 'true' value='Sub Total'></td>
                                <td><input type='text' class='form-control form-rounded amountTaxBtn tableInputField' name='amountTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded currencyTaxBtn tableInputField' name='currencyTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded perQuantityTaxBtn tableInputField' name='perQuantityTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded cpuTaxBtn tableInputField' disabled name='cpuTaxBtn' value=''></td>
                                <td><input type='text' class='form-control form-rounded UoMTaxBtn tableInputField' name='UoMTaxBtn' style='width:100px;' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionValueTaxBtn tableInputField' name='conditionValueTaxBtn' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded currency2TaxBtn tableInputField' name='currency2TaxBtn' style='width:100px;' readonly = 'true' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded conditionValue2TaxBtn tableInputField' value='0.00' name = 'conditionValue2TaxBtn' style='width:100px;' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionCurrencyTaxBtn tableInputField' name='conditionCurrencyTaxBtn' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded statusTaxBtn tableInputField' name='statusTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded numeratorTaxBtn tableInputField' name='numeratorTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded baseUoMTaxBtn tableInputField' name='baseUoMTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded denoForConvTaxBtn tableInputField' name='denoForConvTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded uOMExtraTaxBtn tableInputField' name='uOMExtraTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                            </tr>
                            <tr>
                                <td><input type='text' class='form-control form-rounded conditionTypeTaxBtn tableInputField' name='conditionTypeTaxBtn' style='width:100px;' disabled = 'true' value='MWVS'></td>
                                <td><input type='text' class='form-control form-rounded nameConditionsTaxBtn tableInputField' style='width:200px;' name='nameConditionsTaxBtn' disabled = 'true' value='Input Text'></td>
                                <td><input type='text' class='form-control form-rounded amountTaxBtn tableInputField' name='amountTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded currencyTaxBtn tableInputField' name='currencyTaxBtn' style='width:100px;' value='%' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded perQuantityTaxBtn tableInputField' name='perQuantityTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded cpuTaxBtn tableInputField' disabled name='cpuTaxBtn' value=''></td>
                                <td><input type='text' class='form-control form-rounded UoMTaxBtn tableInputField' name='UoMTaxBtn' style='width:100px;' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionValueTaxBtn tableInputField' name='conditionValueTaxBtn' disabled value=''></td>
                                <td><input type='text' class='form-control form-rounded currency2TaxBtn tableInputField' name='currency2TaxBtn' style='width:100px;' readonly = 'true' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded conditionValue2TaxBtn tableInputField' value='0.00' name = 'conditionValue2TaxBtn' style='width:100px;' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded conditionCurrencyTaxBtn tableInputField' name='conditionCurrencyTaxBtn' disabled='true' value=''></td>
                                <td><input type='text' class='form-control form-rounded statusTaxBtn tableInputField' name='statusTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded numeratorTaxBtn tableInputField' name='numeratorTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded baseUoMTaxBtn tableInputField' name='baseUoMTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded denoForConvTaxBtn tableInputField' name='denoForConvTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                                <td><input type='text' class='form-control form-rounded uOMExtraTaxBtn tableInputField' name='uOMExtraTaxBtn' style='width:100px;' value='' disabled = 'true'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <!--<button type="button" class="btn btn-primary" id="clearOpuModalBtn">Clear</button>-->
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="serviceShortTextModal" tabindex="-1" role="dialog" aria-labelledby="serviceShortTextModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 90%!important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="serviceShortTextModalLabel">Short Text</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="shortTextServiceId">
                <textarea class="form-control rounded-0" id="serviceShortText" name="serviceShortText" rows="20" required></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="serviceShortTextModalSubmitBtn">Submit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="serviceLineItemLongTextModal" tabindex="-1" role="dialog" aria-labelledby="serviceLineItemLongTextModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 90%!important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="serviceLineItemLongTextModalLabel">Line Item Long Text</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="lineItemLongTextServiceId">
                <textarea class="form-control rounded-0" id="serviceLineItemLongText" name="serviceLineItemLongText" rows="20" required></textarea>
            </div>
            <div class="modal-footer">      
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="serviceLineItemLongTextModalSubmitBtn">Submit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="serviceTextModal" tabindex="-1" role="dialog" aria-labelledby="serviceTextModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 90%!important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="serviceTextModalLabel">Service Text</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="serviceTextServiceId">
                <textarea class="form-control rounded-0" id="serviceText" name="serviceText" rows="20" required></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="serviceTextModalSubmitBtn">Submit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="preCheckReponseModal" tabindex="-1" role="dialog" aria-labelledby="preCheckReponseModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="max-width: 50%!important;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="preCheckReponseModalLabel">Pre-check Response</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-bordered table-hover preCheckResponseModalTable" id="preCheckResponseModalTable" style="width:100%;">
                    <thead>
                        <tr class="border-0">
                            <th class="border-0"></th>
                            <th class="border-0">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="valuationTypeModal" tabindex="-1" role="dialog" aria-labelledby="valuationTypeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="valuationTypeModalLabel">Valuation Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover valuationTypeModalTable" id="valuationTypeModalTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">Valuation Type</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <!--<button type="button" class="btn btn-primary" id="clearOpuModalBtn">Clear</button>-->
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="uomModal" tabindex="-1" role="dialog" aria-labelledby="uomModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="uomModalLabel">UOM</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover uomModalTable" id="uomModalTable" style="width:100%;">
                        <thead>
                            <tr class="border-0">
                                <th class="border-0">UOM</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <!--<button type="button" class="btn btn-primary" id="clearOpuModalBtn">Clear</button>-->
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="componentsModal" tabindex="-1" role="dialog" aria-labelledby="componentsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="width:1250px;">
            <div class="modal-header">
                <h5 class="modal-title" id="componentsModalLabel">Components</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12" id="componentBtnLineLevel_div">
                        <div class="form-group">
                            <a><i type="buttom"  class="fa fa-plus-circle btn-primary btn-sm" id="componentAddRowBtn" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card-body">
                            <div class="table-responsive"  style="height: 260px;">
                                <table class="table table-bordered componentTableClassLineLevel" id="componentTableIdLineLevel">
                                    <thead class="table-header-color">
                                        <tr class="border-0">
                                            <!--<th></th>-->
                                            <th class="border-1 th-color">Material</th>
                                            <th class="border-1 th-color">Description</th>
                                            <th class="border-1 th-color">Plant</th>
                                            <th class="border-1 th-color">Unit</th>
                                            <th class="border-1 th-color">Quantity</th>
                                            <th class="border-1 th-color">Prod St Loc</th>
                                            <th class="border-1 th-color">Supply Area</th>
                                            <th class="border-1 th-color">Requirement Date</th>
                                            <th class="border-1 th-color">Qty Is Fixed</th>
                                            <th class="border-1 th-color">Latest Requirement Date</th>
                                            <th class="border-1 th-color">Dist. Key</th>
                                            <th class="border-1 th-color">Item Number</th>
                                            <th class="border-1 th-color">Batch</th>
                                            <!--<th class="border-1 th-color">Storage Location</th>-->
                                            <th class="border-1" style="width:30px;"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" class="form-control form-rounded input-height comMaterial" style="width:100px;"></td>
                                            <td><input type="text" class="form-control form-rounded input-height comDescription" style="width:200px;"></td>
                                            <td><input type="text" class="form-control form-rounded input-height comPlant" style="width:100px;"></td>
                                            <td><input type="text" class="form-control form-rounded input-height comUnit" style="width:100px;"></td>
                                            <td><input type="text" class="form-control form-rounded input-height comQuantity" style="width:150px;"></td>
                                            <td><input type="text" class="form-control form-rounded input-height comProdStorageLoc" style="width:100px;"></td>
                                            <td><input type="text" class="form-control form-rounded input-height comSupplyArea" style="width:100px;"></td>
                                            <td><input type="text" class="comRequirementDate" value="" style="width:150px;" disabled><input type="hidden" class="reqDatepicker"></td>
                                            <td><input type="text" class="form-control form-rounded input-height qtyIsFixed" style="width:100px;"></td>
                                            <td><input type="text" class="latReqDate" style="width:150px;" disabled><input type="hidden" class="latReqDatepicker"></td>
                                            <td><input type="text" class="form-control form-rounded input-height distKey" style="width:100px;"></td>
                                            <td><input type="text" class="form-control form-rounded input-height itemNumber" style="width:100px;" disabled></td>
                                            <td><input type="text" class="form-control form-rounded input-height comBatch" style="width:100px;"></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="vendorMasterModal" tabindex="-1" role="dialog" aria-labelledby="vendorMasterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="vendorMasterModalLabel">Vendor Master</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <input type="hidden" id="firstVMSno">
                <input type="hidden" id="lastVMSno" value="1">

                <div class="container-fluid">
                    <div class="card-body">

                        <div class="table-responsive">
                            <div class="row">
                                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorMasterRecordCount">Record Count: </label>
                                        <select class="custom-select" id="vendorMasterRecordCount">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                            <option>200</option>
                                            <option>500</option>
                                            <option>1000</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                    <div class="form-group">
                                        <label for="vendorCodeOrName_SearchText">Vendor Code/ Name:</label>
                                        <input type="text" class="form-control form-rounded" id="vendorCodeOrName_SearchText" placeholder="Search by vendor code or name">
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <div class="btn-group" style="margin-top: 21px;">
                                            <input type="button" class="btn btn-success btn-sm" id="searchVendorMasterBtn" value="Search">
                                            <input type="button" class="btn btn-default btn-sm" id="clearSearchVendorMasterBtn" value="Clear">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <div class="form-group">
                                        <div class="btn-group" style="margin-top: 21px;">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterPrevBtn" value="Prev" disabled="true">
                                            <input type="button" class="btn btn-instagram btn-sm" id="searchVendorMasterNextBtn" value="Next">
                                        </div>                                                        
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">                                                    
                                    <table class="table table-bordered table-hover vendorMasterTable" id="vendorMasterTable" style="width: 100%">
                                        <thead class="">
                                            <tr class="">
                                                <th class="border-1" scope="col"></th>
                                                <th class="border-1" scope="col">Code</th>
                                                <th class="border-1" scope="col">Name</th>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>