function findVendorByCompanyCode()
{
    var companyCodeHeader = $("#companycodeHeader").val();
    console.log("companyCodeHeader: " + companyCodeHeader);
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindVendorByCompanyCode",
            "companyCode": companyCodeHeader
        },
        complete: function(responseJson) {
            var jsonVendorArr = $.parseJSON(responseJson.responseText);
            console.log("jsonVendorArr lengtth :" + jsonVendorArr.length);
            jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));

            if (jsonVendorArr.length !== 0) {
//                var option = "";
                for (var i = 0; i < jsonVendorArr.length; i++) {
//                    option += "<option value='" + jsonVendorArr[i].vendorCode + "'>" + jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode + "</option>";
                }

//                $("#vendorcodeHeader").append(option);
//                $('.selectpicker').selectpicker('refresh');
                console.log("Set vendor================");
            }
        }
    });
}
function getInvoiceDataAsJson(ItemNumber, POLineItemDataLinkId)
{
    var POInvoiceData = {};
    POInvoiceData["ItemNumber"] = ItemNumber;
    POInvoiceData["LinkId"] = POLineItemDataLinkId;
    POInvoiceData["InvoiceReceipt"] = $("#InvoiceReceipt").prop("checked");
    POInvoiceData["FinalInvoice"] = $("#FinalInvoice").prop("checked");
    POInvoiceData["GRBasedIV"] = $("#GRBasedIV").prop("checked");
    POInvoiceData["DPCategory"] = "";
    POInvoiceData["TaxCode"] = $("#TaxCode").val();
    return POInvoiceData;
}
function addInvoiceToPOInvoiceDataArray(POInvoiceDataArray, POInvoiceData)
{
    var isInvoiceAdded = false;
    var InvoiceIndex = -1;
    for (var i = 0; i < POInvoiceDataArray.length; i++)
    {
        if (POInvoiceDataArray[i].ItemNumber === POInvoiceData.ItemNumber)
        {
            isInvoiceAdded = true;
            InvoiceIndex = i;
        }
    }
    if (isInvoiceAdded === false)
    {
        POInvoiceDataArray.push(POInvoiceData);
    }
    else
    {
        POInvoiceDataArray[InvoiceIndex] = POInvoiceData;
    }
    return POInvoiceDataArray;
}
function getAccountAssignmentTabDataAsJson(ItemNumber, POLineItemDataLinkId, POAccntAssignDataArray)
{
    var accountAssignmentCategory = $("#accountAssignmentCategory").val();
    var distribution = $("#distribution").val();
    var dist = '';

    if (distribution === "Single Account Assignment")
        dist = 0;
    else if (distribution === "Distrib. On Quantity Basis")
        dist = 1;
    else if (distribution === "Distrib. By Percentage")
        dist = 2;

    var CoCode = $("#CoCode").val();

    $("#costCenteraccountAssignmentTebleId tbody tr").each(function(index) {
//        alert("Index: " + index);
        var POAccntAssignData = {};

        POAccntAssignData["PRLinkID"] = POLineItemDataLinkId;
        POAccntAssignData["SerialNo"] = "";
        POAccntAssignData["LinkID"] = "";
        POAccntAssignData["AccountAssignmentCategory"] = accountAssignmentCategory;
        POAccntAssignData["Distribution"] = dist;
        POAccntAssignData["PartialInvoiceIndicator"] = "";
        POAccntAssignData["CoCode"] = CoCode;
        POAccntAssignData["UnloadingPoint"] = $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").val();
        POAccntAssignData["Recipient"] = $(this).find("td").eq(11).children(".accAsgnRecipients").val();
        POAccntAssignData["GLAccount"] = $(this).find("td").eq(3).children(".accAsgnGLAccount").val();
        POAccntAssignData["COArea"] = $(this).find("td").eq(4).children(".accAsgnCOArea").val();
        POAccntAssignData["CostCenter"] = $(this).find("td").eq(5).children(".accAsgnCostCetner").val();
        POAccntAssignData["AccOrder"] = $(this).find("td").eq(12).children(".accAsgnOrder").val();
        POAccntAssignData["Asset"] = $(this).find("td").eq(13).children(".accAsgnAssets").val();
        POAccntAssignData["WBSElement"] = $(this).find("td").eq(14).children(".accAsgnWBSElement").val();
        POAccntAssignData["SalesOrder"] = $(this).find("td").eq(15).children(".accAsgnSalesOrder").val();
        POAccntAssignData["ItemNumber"] = $(this).find("td").eq(17).children(".accAsgnItemNumber").val();
        POAccntAssignData["ItmNo"] = $(this).find("td").eq(17).children(".accAsgnItemNumber").val();
        POAccntAssignData["DeliverySchedule"] = $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").val();
        POAccntAssignData["Quantity"] = removeCommaInNumber($(this).find("td").eq(1).children(".accAsgnQuantity").val()).toString();
        POAccntAssignData["Percentage"] = $(this).find("td").eq(2).children(".accAsgnPercentage").val();
        POAccntAssignData["Fund"] = $(this).find("td").eq(6).children(".accAsgnFund").val();
        POAccntAssignData["FunctionalArea"] = $(this).find("td").eq(7).children(".accAsgnFunctionalArea").val();
        POAccntAssignData["FundsCentre"] = $(this).find("td").eq(8).children(".accAsgnFundCenter").val();
        POAccntAssignData["CommitmentItem"] = $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val();
        POAccntAssignData["Network"] = $(this).find("td").eq(16).children(".accAsgnNetActNumber").val();
        POAccntAssignData["ActivityNumber"] = $(this).find("td").eq(16).children(".accAsgnNetActNumber").val();

//        alert("LinkId: " + POAccntAssignData.LinkID);
        var isAccAssAdded = false;
        var AccAssIndex = -1;
        for (var i = 0; i < POAccntAssignDataArray.length; i++)
        {
            if (POAccntAssignDataArray[i].LinkID === POAccntAssignData.LinkID)
            {
//                alert("Same LinkId");
                isAccAssAdded = true;
                AccAssIndex = i;
            }
        }
//        alert("isAccAsssAdded: " + isAccAssAdded);
        if (isAccAssAdded === false)
        {
            POAccntAssignDataArray.push(POAccntAssignData);
        }
        else
        {
            POAccntAssignDataArray[AccAssIndex] = POAccntAssignData;
            isAccAssAdded = false;
        }

    });

    return POAccntAssignDataArray;
}

function getServiceAccountAssignmentTabDataAsJson()
{
    var POLineItemData = "";
    var POServiceRefData = "";
    var POServiceData = "";
    var POAccntAssignvalData = "";
    var PackageNo = "";
    var servicePackageNumber = $("#servicePackageNumber").val();
    console.log("servicePackageNumber: " + servicePackageNumber);


    $("#material_headerClass tbody tr").each(function(index) {
        console.log(index);
        if (PackageNo === "")
            PackageNo = index + 1;

        POLineItemData += "<POLineItemData>"
                + "<PRLinkID>" + $(this).find("td").eq(31).children(".POLineItemLinkId").val() + "</PRLinkID>"
                + "<PRNumber>" + $(this).find("td").eq(31).children(".POLineItemPrNumber").val() + "</PRNumber>"
                + "<PRItemNumber>" + $(this).find("td").eq(0).text().toString().trim() + "</PRItemNumber>"
                + "<ItemNumber>" + $(this).find("td").eq(31).children(".POLineItemItemNumber").val() + "</ItemNumber>"
                + "<AccountAssignment>" + $(this).find("td").eq(1).children(".accountAssignmentClass").val() + "</AccountAssignment>"
                + "<ItemCategory>" + $(this).find("td").eq(2).children(".itemCategoryClass").val() + "</ItemCategory>"
                + "<Criticality>" + $(this).find("td").eq(4).text() + "</Criticality>"
                + "<ShortText>" + $(this).find("td").eq(5).text() + "</ShortText>"
                + "<Quantity>" + $(this).find("td").eq(7).text() + "</Quantity>"
                + "<PriceUnit>" + $(this).find("td").eq(8).text() + "</PriceUnit>"
                + "<ValPrice></ValPrice>"
                + "<NetPrice>" + $(this).find("td").eq(9).text() + "</NetPrice>"
                + "<Currency>" + $(this).find("td").eq(10).text() + "</Currency>"
                + "<DeliveryDateCategory>" + $(this).find("td").eq(12).text() + "</DeliveryDateCategory>"
                + "<Total></Total>"
                + "<RequisitionDate>" + $(this).find("td").eq(13).text() + "</RequisitionDate>"
                + "<DeliveryDate>" + $(this).find("td").eq(14).text() + "</DeliveryDate>"
                + "<MaterialGroup>" + $(this).find("td").eq(16).text() + "</MaterialGroup>"
                + "<PurchasingGroup>" + $(this).find("td").eq(18).text() + "</PurchasingGroup>"
                + "<StorageLocation>" + $(this).find("td").eq(19).text() + "</StorageLocation>"
                + "<RequisitionerID></RequisitionerID>"
                + "<TrackingNumber>" + $(this).find("td").eq(28).text() + "</TrackingNumber>"
                + "<QuantityUnit></QuantityUnit>"
                + "<QuantityOrderedUnit></QuantityOrderedUnit>"
                + "<OpenQuantity></OpenQuantity>"
                + "<RequestDate></RequestDate>"
                + "<ReleaseDate></ReleaseDate>"
                + "<PlDelivTime></PlDelivTime>"
                + "<GRProcTime></GRProcTime>"
                + "<Closed></Closed>"
                + "<FixedID></FixedID>"
                + "<MaterialCode>" + $(this).find("td").eq(3).text() + "</MaterialCode>"
                + "<Description></Description>"
                + "<Plant>" + $(this).find("td").eq(15).text() + "</Plant>"
                + "<Unit>" + $(this).find("td").eq(30).text() + "</Unit>"
                + "<ProdStorageLocation></ProdStorageLocation>"
                + "<SupplyArea></SupplyArea>"
                + "<RequirementDate></RequirementDate>"
                + "<ValuationPrice></ValuationPrice>"
                + "<ValuationCurrency></ValuationCurrency>"
                + "<ValuationUnit></ValuationUnit>"
                + "<Promotion></Promotion>"
                + "<GoodsReceipt></GoodsReceipt>"
                + "<InvReceipt></InvReceipt>"
                + "<GRNonVal></GRNonVal>"
                + "<AgreementLineItem></AgreementLineItem>"
                + "<FixedVendor></FixedVendor>"
                + "<InfoRecord>" + $(this).find("td").eq(21).text() + "</InfoRecord>"
                + "<DesiredVendor></DesiredVendor>"
                + "<PurchasingOrganization>" + $(this).find("td").eq(17).text() + "</PurchasingOrganization>"
                + "<POUnit></POUnit>"
                + "<SupplyingPlant></SupplyingPlant>"
                + "<IssuingStorageLocation></IssuingStorageLocation>"
                + "<OverallLimit></OverallLimit>"
                + "<ExpectedValue></ExpectedValue>"
                + "<NoLimit></NoLimit>"
                + "<ItemTextLineItem></ItemTextLineItem>"
                + "<ItemNote></ItemNote>"
                + "<DeliveryText></DeliveryText>"
                + "<MaterialPOText></MaterialPOText>"
                + "<PRNotetoApprover></PRNotetoApprover>"
                + "<MaterialLongText>" + $(this).find("td").eq(6).text() + "</MaterialLongText>"
                + "<RequsitionEmail></RequsitionEmail>"
                + "<Distribution></Distribution>"  //Dist.
                + "<PartialInvoiceIndicator></PartialInvoiceIndicator>"  //Partial Inv. Ind.
                + "<BP_assign_date></BP_assign_date>"
                + "<BP_quantity_remaining></BP_quantity_remaining>"
                + "<BP_rfq_status></BP_rfq_status>"
                + "<BP_status></BP_status>"
                + "<BP_buyerdetails_id></BP_buyerdetails_id>"
                + "<BP_ItemCode></BP_ItemCode>"
                + "<BP_PRCreator>" + $(this).find("td").eq(23).text() + "</BP_PRCreator>"
                + "<BP_UOMStore></BP_UOMStore>"
                + "<BP_CompanyCode></BP_CompanyCode>"
                + "<RejectStatus></RejectStatus>"
                + "<QueryStatus></QueryStatus>"
                + "<ReferenceDate></ReferenceDate>"
                + "<SourceList></SourceList>"
                + "<CountryofOrigin></CountryofOrigin>"
                + "<HeaderNote></HeaderNote>"
                + "<OldMaterialCode></OldMaterialCode>"
                + "<NoteToBuyer></NoteToBuyer>"
                + "<UOMStore></UOMStore>"
                + "<PO_Requestor></PO_Requestor>"
                + "<PO_RequestorEmail></PO_RequestorEmail>"
                + "<PR_TrackingNumber></PR_TrackingNumber>"
                + "<QuotationNumber></QuotationNumber>"
                + "<HigherLevelItem></HigherLevelItem>"
                + "<SubitemCategory></SubitemCategory>"
                + "<Batch></Batch>"
                + "<LinkId></LinkId>"
                + "<PackageNo>" + PackageNo + "</PackageNo>"
                + "<TaxCode>" + $(this).find("td").eq(31).children(".POLineItemTaxCode").val() + "</TaxCode>"
                + "</POLineItemData>";

        POServiceRefData += "<POServiceRefData>"
                + "<PackageNo>" + PackageNo + "</PackageNo>"
                + "<SubPackageNo>" + (PackageNo + 1) + "</SubPackageNo>"
                + "<LineNo>" + PackageNo + "</LineNo>"
                + "</POServiceRefData>";

        $("#serviceTableId tbody tr").each(function() {
            POServiceData += "<POServiceData>"
                    + "<LineItemNumber>" + $(this).find("td").eq(2).children(".lineItemNumberServices").val() + "</LineItemNumber>"
                    + "<ServiceNumber>" + $(this).find("td").eq(3).children(".ServicesNumber_Services").val() + "</ServiceNumber>"
                    + "<ShortText>" + $(this).find("td").eq(4).children(".shortText_Services").val() + "</ShortText>"
                    + "<Quantity>" + removeCommaInNumber($(this).find("td").eq(5).children(".quantity_Services").val()) + "</Quantity>"
                    + "<Unit>" + $(this).find("td").eq(6).children(".servicesUnit_Services").val() + "</Unit>"
                    + "<GrossPrice>" + removeCommaInNumber($(this).find("td").eq(7).children(".grossPrice_Services").val()) + "</GrossPrice>"
                    + "<Currency>" + $(this).find("td").eq(8).children(".currency_Services").val() + "</Currency>"
                    + "<NetPrice>" + removeCommaInNumber($(this).find("td").eq(9).children(".netPrice_Services").val()) + "</NetPrice>"
                    + "<Edition>" + $(this).find("td").eq(10).children(".edition_Services").val() + "</Edition>"
                    + "<LineItemLongText>" + $(this).find("td").eq(11).children(".lineItemLongText_Services").val() + "</LineItemLongText>"
                    + "<OverfTolerance>" + $(this).find("td").eq(12).children(".overfTolerance_Services").val() + "</OverfTolerance>"
                    + "<CostCentre></CostCentre>"
                    + "<GLCode></GLCode>"
                    + "<CommitmentItem></CommitmentItem>"
                    + "<Fund></Fund>"
                    + "<FundCenter></FundCenter>"
                    + "<FunctionalArea></FunctionalArea>"
                    + "<ServiceLongText></ServiceLongText>"
                    + "<LinkId></LinkId>"
                    + "<ServiceLinkID></ServiceLinkID>"
                    + "<PackageNo>" + (PackageNo + 1) + "</PackageNo>"
                    + "<LineNo>" + (PackageNo + 1) + "</LineNo>"
                    + "</POServiceData>";

            for (var i = 0; i < SeriveAccountAssignmentDataJsonArray.length; i++)
            {
                console.log("ServicePackageNumber in its account assignment: " + SeriveAccountAssignmentDataJsonArray[i].ServicePackageNo);
                console.log("servicePackageNumber: " + servicePackageNumber);
                if (servicePackageNumber === SeriveAccountAssignmentDataJsonArray[i].ServicePackageNo)
                {
                    POAccntAssignvalData += "<POAccntAssignvalData>"
                            + "<Distribution>" + SeriveAccountAssignmentDataJsonArray[i].Distribution + "</Distribution>"
                            + "<Quantity>" + SeriveAccountAssignmentDataJsonArray[i].Quantity + "</Quantity>"
                            + "<Percentage>" + SeriveAccountAssignmentDataJsonArray[i].Percentage + "</Percentage>"
                            + "<ActivityNumber></ActivityNumber>"
                            + "<LinkNumber></LinkNumber>"
                            + "<LinkID></LinkID>"
                            + "<NETVALUE></NETVALUE>"
                            + "<CostCenter>" + SeriveAccountAssignmentDataJsonArray[i].CostCenter + "</CostCenter>"
                            + "<PRLinkID></PRLinkID>"
                            + "<Acc_Order>" + SeriveAccountAssignmentDataJsonArray[i].Order + "</Acc_Order>"
                            + "<Acc_Asset>" + SeriveAccountAssignmentDataJsonArray[i].Asset + "</Acc_Asset>"
                            + "<Acc_WBSElement>" + SeriveAccountAssignmentDataJsonArray[i].WBSElements + "</Acc_WBSElement>"
                            + "<SalesOrder>" + SeriveAccountAssignmentDataJsonArray[i].SalesOrder + "</SalesOrder>"
                            + "<Network></Network>"
                            + "<Activity></Activity>"
                            + "<CoArea>" + SeriveAccountAssignmentDataJsonArray[i].COArea + "</CoArea>"
                            + "<GLAccount>" + SeriveAccountAssignmentDataJsonArray[i].GLAccount + "</GLAccount>"
                            + "<UnloadingPoint></UnloadingPoint>"
                            + "<Recipient></Recipient>"
                            + "<CommitmentItem>" + SeriveAccountAssignmentDataJsonArray[i].CommitmentItem + "</CommitmentItem>"
                            + "<Fund>" + SeriveAccountAssignmentDataJsonArray[i].Fund + "</Fund>"
                            + "<FundsCentre>" + SeriveAccountAssignmentDataJsonArray[i].FundsCentre + "</FundsCentre>"
                            + "<FunctionalArea>" + SeriveAccountAssignmentDataJsonArray[i].FunctionalArea + "</FunctionalArea>"
                            + "<ItemNumber>" + SeriveAccountAssignmentDataJsonArray[i].ItemNumber + "</ItemNumber>"
                            + "<DeliverySchedule>" + SeriveAccountAssignmentDataJsonArray[i].DeliverySchedule + "</DeliverySchedule>"
                            + "<PackageNo>" + (PackageNo + 1) + "</PackageNo>"
                            + "<LineNo>" + (PackageNo + 1) + "</LineNo>"
                            + "<SerialNo></SerialNo>"
                            + "</POAccntAssignvalData>";
                }
            }
        });
    });

    console.log("POLineItemData: " + POLineItemData);
    console.log("POServiceData: " + POServiceData);
    console.log("POServiceRefData: " + POServiceRefData);
    console.log("POAccntAssignvalData: " + POAccntAssignvalData);

    POLineItemData += POServiceData;
    POLineItemData += POServiceRefData;
    POLineItemData += POAccntAssignvalData;

    console.log("POLineItemData: " + POLineItemData);

    return POLineItemData;
}

function getLineItemConditionsDataAsJson(ItemNumber, POLineItemDataLinkId, POLineItemConditionsDataArray)
{
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var POLineItemConditionsData = {};

        POLineItemConditionsData["LinkId"] = $(this).find("td").eq(13).children(".CoditionLinkId").val();
        POLineItemConditionsData["ItemNumber"] = $(this).find("td").eq(13).children(".CoditionItemNumber").val();
        POLineItemConditionsData["CondUnit"] = $(this).find("td").eq(7).children(".UoMLineLevel").val();
        POLineItemConditionsData["CondSTNo"] = $(this).find("td").eq(13).children(".conditionSTUNR").val();
        POLineItemConditionsData["CondCount"] = $(this).find("td").eq(13).children(".conditionZAEHK").val();
        POLineItemConditionsData["CondChangeId"] = $(this).find("td").eq(13).children(".conditionChangeId").val();
        POLineItemConditionsData["CondType"] = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
        POLineItemConditionsData["CondName"] = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        POLineItemConditionsData["CondVal"] = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()).toString();
        POLineItemConditionsData["CondCrncy"] = $(this).find("td").eq(6).children(".ConditionCurrencyLineLevel").val();
        POLineItemConditionsData["CondBaseRate"] = "";
        POLineItemConditionsData["Amount"] = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val()).toString();
        POLineItemConditionsData["CondPricUnit"] = $(this).find("td").eq(5).children(".ConditionPricingUnitLineLevel").val();
        POLineItemConditionsData["Currency"] = $(this).find("td").eq(11).children(".CurrencyLineLevel").val();
        POLineItemConditionsData["Currency1"] = "";
        POLineItemConditionsData["CondVal1"] = "";
        POLineItemConditionsData["CondDet"] = "";
        POLineItemConditionsData["VendorName"] = "";
        POLineItemConditionsData["VendorCode"] = "";
        POLineItemConditionsData["Application"] = "";
        POLineItemConditionsData["CondPriceDate"] = "";
        POLineItemConditionsData["CondBaseVal"] = "";
        POLineItemConditionsData["CondClass"] = "";
        POLineItemConditionsData["CalType"] = "";
        POLineItemConditionsData["CondCatg"] = "";
        POLineItemConditionsData["CondCtrl"] = "";
        POLineItemConditionsData["CondOrigin"] = "";
        POLineItemConditionsData["Statistical"] = "";
        POLineItemConditionsData["Accruals"] = "";
        POLineItemConditionsData["ChangedManually"] = "";
        POLineItemConditionsData["AcCrualsTxt"] = "";
        POLineItemConditionsData["AccountKey"] = "";

//        var isCondAdded = false;
//        var CondIndex = -1;
//        for (var i = 0; i < POLineItemConditionsDataArray.length; i++)
//        {
//            if (POLineItemConditionsDataArray[i].LinkId === POLineItemConditionsData.LinkId)
//            {
//                isCondAdded = true;
//                CondIndex = i;
//            }
//        }
//        if (isCondAdded === false)
//        {
//            POLineItemConditionsDataArray.push(POLineItemConditionsData);
//        }
//        else
//        {
//            POLineItemConditionsDataArray[CondIndex] = POLineItemConditionsData;
//            isCondAdded = false;
//        }
        POLineItemConditionsDataArray.push(POLineItemConditionsData);
    });
    return POLineItemConditionsDataArray;
}

function getDeliveryAddressDataAsJson(ItemNumber, POLineItemDataLinkId, PODeliveryAddressDataArray)
{
    var PODeliveryAddressData = {};

    PODeliveryAddressData["ItemNo"] = ItemNumber;
    PODeliveryAddressData["Name1"] = $("#Name1").val();
    PODeliveryAddressData["Name2"] = $("#Name2").val();
    PODeliveryAddressData["Street"] = $("#Street").val();
    PODeliveryAddressData["HouseNo"] = $("#HouseNumber").val();
    PODeliveryAddressData["PostalCode"] = $("#PostalCode").val();
    PODeliveryAddressData["City"] = $("#City").val();
    PODeliveryAddressData["Country"] = $("#countryLimits").val();

    var isDelAddAdded = false;
    var DelAddIndex = -1;
    for (var i = 0; i < PODeliveryAddressDataArray.length; i++)
    {
        if (PODeliveryAddressDataArray[i].ItemNo === PODeliveryAddressData.ItemNo)
        {
            isDelAddAdded = true;
            DelAddIndex = i;
        }
    }
    if (isDelAddAdded === false)
    {
        PODeliveryAddressDataArray.push(PODeliveryAddressData);
    }
    else
    {
        PODeliveryAddressDataArray[DelAddIndex] = PODeliveryAddressData;
    }
    return PODeliveryAddressDataArray;
}

function getTextDataAsJson(ItemNumber, POLineItemDataLinkId, POTextsDataArray)
{
    var POTextsData = {};

    POTextsData["ItemNumber"] = ItemNumber;
    POTextsData["ItemText"] = $("#ItemText").val();
    POTextsData["InfoRecordPOText"] = $("#InfoRecordPOText").val();
    POTextsData["MaterialPOText"] = $("#MaterialPOText").val();
    POTextsData["PONoteToApprover"] = $("#PONoteToApprover").val();
    POTextsData["DeliveryText"] = $("#DeliveryText").val();
    POTextsData["LinkId"] = POLineItemDataLinkId;

    var isTextAdded = false;
    var TextIndex = -1;
    for (var i = 0; i < POTextsDataArray.length; i++)
    {
        if (POTextsDataArray[i].ItemNumber === POTextsData.ItemNumber)
        {
            isTextAdded = true;
            TextIndex = i;
        }
    }
    if (isTextAdded === false)
    {
        POTextsDataArray.push(POTextsData);
    }
    else
    {
        POTextsDataArray[TextIndex] = POTextsData;
    }
    return POTextsDataArray;
}

function getConfirmationsDataAsJson(ItemNumber, POLineItemDataLinkId, POConfirmationsDataArray)
{
    var POConfirmationsData = {};

    POConfirmationsData["ItemNumber"] = ItemNumber;
    POConfirmationsData["ConfControl"] = $("#confControlLimits").val();
    POConfirmationsData["OrderAck"] = $("#OrderAck").val();
    POConfirmationsData["ConfirmnReq"] = $("#ConfirmationRequired").prop("checked");
    POConfirmationsData["RejectInd"] = $("#RejectionInd").prop("checked");
    POConfirmationsData["LinkId"] = POLineItemDataLinkId;

    var isConfAdded = false;
    var ConfIndex = -1;
    for (var i = 0; i < POConfirmationsDataArray.length; i++)
    {
        if (POConfirmationsDataArray[i].ItemNumber === POConfirmationsData.ItemNumber)
        {
            isConfAdded = true;
            ConfIndex = i;
        }
    }
    if (isConfAdded === false)
    {
        POConfirmationsDataArray.push(POConfirmationsData);
    }
    else
    {
        POConfirmationsDataArray[ConfIndex] = POConfirmationsData;
    }
    return POConfirmationsDataArray;
}

function getCondCtrlDataAsJson(ItemNumber, POLineItemDataLinkId, POCondCtrlDataArray)
{
    var POCondCtrlData = {};

    POCondCtrlData["ItemNumber"] = ItemNumber;
    POCondCtrlData["PrintPrice"] = $("#PrintPrice").prop("checked");
    POCondCtrlData["EstimatedPrice"] = $("#EstimatedPrice").prop("checked");
    POCondCtrlData["LinkId"] = POLineItemDataLinkId;

    var isConfAdded = false;
    var ConfIndex = -1;
    for (var i = 0; i < POCondCtrlDataArray.length; i++)
    {
        if (POCondCtrlDataArray[i].ItemNumber === POCondCtrlData.ItemNumber)
        {
            isConfAdded = true;
            ConfIndex = i;
        }
    }
    if (isConfAdded === false)
    {
        POCondCtrlDataArray.push(POCondCtrlData);
    }
    else
    {
        POCondCtrlDataArray[ConfIndex] = POCondCtrlData;
    }
    return POCondCtrlDataArray;
}

function getLineItemCustomerDataAsJson(ItemNumber, POLineItemDataLinkId, POLineItemCustomerDataArray)
{
    var POLineItemCustomerData = {};

    POLineItemCustomerData["ItemNumber"] = ItemNumber;
    POLineItemCustomerData["ProductOrigin"] = $("#ProductOriginLine").val();
    POLineItemCustomerData["Segment"] = $("#SegmentDescriptionLine").val();
    POLineItemCustomerData["LinkId"] = POLineItemDataLinkId;

    var isLineItemCustomerAdded = false;
    var LineItemCustomerIndex = -1;
    for (var i = 0; i < POLineItemCustomerDataArray.length; i++)
    {
        if (POLineItemCustomerDataArray[i].ItemNumber === POLineItemCustomerData.ItemNumber)
        {
            isLineItemCustomerAdded = true;
            LineItemCustomerIndex = i;
        }
    }
    if (isLineItemCustomerAdded === false)
    {
        POLineItemCustomerDataArray.push(POLineItemCustomerData);
    }
    else
    {
        POLineItemCustomerDataArray[LineItemCustomerIndex] = POLineItemCustomerData;
    }
    return POLineItemCustomerDataArray;
}

function getHeaderTextDataAsJson(ItemNumber, POLineItemDataLinkId, POHeaderTextDataArray)
{
    var POHeaderTextData = {};

    POHeaderTextData["ItemNumber"] = ItemNumber;
    POHeaderTextData["PONoteToApprover"] = $("#pONotetoApproverHeaderTextsLimits").val();
    POHeaderTextData["HeaderNote"] = $("#HeaderNote").val();
    POHeaderTextData["PricingTypes"] = $("#PricingTypes").val();
    POHeaderTextData["Deadlines"] = $("#Deadlines").val();
    POHeaderTextData["TermsOfDelivery"] = $("#TermsofDelivery").val();
    POHeaderTextData["TermsOfPayment"] = $("#TermsofPayment").val();
    POHeaderTextData["ShippingInstructions"] = $("#ShippingInstructions").val();
    POHeaderTextData["VendorMemoGeneral"] = $("#VendorMemoGeneral").val();
    POHeaderTextData["VendorMemoSpecial"] = $("#VendorMemoSpecial").val();
    POHeaderTextData["LinkId"] = POLineItemDataLinkId;

    var isLineItemCustomerAdded = false;
    var LineItemCustomerIndex = -1;
    for (var i = 0; i < POHeaderTextDataArray.length; i++)
    {
        if (POHeaderTextDataArray[i].ItemNumber === POHeaderTextData.ItemNumber)
        {
            isLineItemCustomerAdded = true;
            LineItemCustomerIndex = i;
        }
    }
    if (isLineItemCustomerAdded === false)
    {
        POHeaderTextDataArray.push(POHeaderTextData);
    }
    else
    {
        POHeaderTextDataArray[LineItemCustomerIndex] = POHeaderTextData;
    }
    return POHeaderTextDataArray;
}
function getQuantityWeightsDataAsJson(ItemNumber, POLineItemDataLinkId, POQuantityWeightsDataArray)
{
    var POQuantityWeightsData = {};

    POQuantityWeightsData["ItemNumber"] = ItemNumber;
    POQuantityWeightsData["POQuantity"] = $("#pOQuantity").val() !== "" ? removeCommaInNumber($("#pOQuantity").val()).toString() : "";
    POQuantityWeightsData["POQuantityUnit"] = $("#pOUnit").val();
    POQuantityWeightsData["POQuantitySKU"] = $("#pOQuantitySKU").val() !== "" ? removeCommaInNumber($("#pOQuantitySKU").val()).toString() : "";
    POQuantityWeightsData["POQuantitySKUUnit"] = $("#pOUnitSKU").val();
    POQuantityWeightsData["Order1"] = $("#orderUnit").val() !== "" ? removeCommaInNumber($("#orderUnit").val()).toString() : "";
    POQuantityWeightsData["OrderUnit1"] = $("#unitOrderUnit").val();
    POQuantityWeightsData["Order2"] = $("#orderUnit2").val() !== "" ? removeCommaInNumber($("#orderUnit2").val()).toString() : "";
    POQuantityWeightsData["OrderUnit2"] = $("#unitOrderUnit2").val();
    POQuantityWeightsData["OrderPrice"] = $("#orderPriceUnit").val() !== "" ? removeCommaInNumber($("#orderPriceUnit").val()) : "";
    POQuantityWeightsData["OrderPriceUnit"] = $("#unitOrderPriceUnit").val();
    POQuantityWeightsData["SKU"] = $("#sKUUnit").val() !== "" ? removeCommaInNumber($("#sKUUnit").val()) : "";
    POQuantityWeightsData["SKUUnit"] = $("#unitSKUUnit").val();
    POQuantityWeightsData["LinkId"] = POLineItemDataLinkId;

    var isQWAdded = false;
    var QWIndex = -1;
    for (var i = 0; i < POQuantityWeightsDataArray.length; i++)
    {
        if (POQuantityWeightsDataArray[i].ItemNumber === POQuantityWeightsData.ItemNumber)
        {
            isQWAdded = true;
            QWIndex = i;
        }
    }
    if (isQWAdded === false)
    {
        POQuantityWeightsDataArray.push(POQuantityWeightsData);
    }
    else
    {
        POQuantityWeightsDataArray[QWIndex] = POQuantityWeightsData;
    }
    return POQuantityWeightsDataArray;
}

function getDeliveryDataAsJson(ItemNumber, POLineItemDataLinkId, PODeliveryDataArray)
{
    var PODeliveryData = {};

    PODeliveryData["ItemNumber"] = ItemNumber;
    PODeliveryData["OverDelTol"] = $("#OverdeliveryTolerance").val();
    PODeliveryData["UnderDelTol"] = $("#UnderdeliveryTolerance").val();
    PODeliveryData["ShippingInstructions"] = $("#ShippingInstruction").val();
    PODeliveryData["StockType"] = $("#StockType").val();
    PODeliveryData["FstRem_Exped"] = $("#FirstReminderExpediter").val();
    PODeliveryData["SecRem_Exped"] = $("#SecondReminderExpediter").val();
    PODeliveryData["ThrdRem_Exped"] = $("#ThirdReminderExpediter").val();
    PODeliveryData["ValuationType"] = $("#ValuationType").val();
    PODeliveryData["RemShelfLife"] = $("#RemShelfLife").val();
    PODeliveryData["QAControlLife"] = $("#QAControlLife").val();
    PODeliveryData["NoExpend"] = $("#NoExpend").val();
    PODeliveryData["PlDelTime"] = $("#PlDeliveryTime").val();
    PODeliveryData["GrProcTime"] = $("#GRProcTime").val();
    PODeliveryData["LatestGRDate"] = "";
    PODeliveryData["IncoTerms1"] = $("#incoTermsPart1Delivery").val();
    PODeliveryData["IncoTerm2"] = $("#incoTermsPart1Delivery").val();
    PODeliveryData["GoodsReceipt"] = $("#GoodsReceipt").prop("checked");
    PODeliveryData["GRNonVal"] = $("#GRNonValuated").prop("checked");
    PODeliveryData["DelvCompleted"] = $("#DelivCompleted").prop("checked");
    PODeliveryData["Unlimited"] = "";
    PODeliveryData["LinkId"] = POLineItemDataLinkId;

    var isDelAdded = false;
    var DelIndex = -1;
    for (var i = 0; i < PODeliveryDataArray.length; i++)
    {
        if (PODeliveryDataArray[i].ItemNumber === PODeliveryData.ItemNumber)
        {
            isDelAdded = true;
            DelIndex = i;
        }
    }
    if (isDelAdded === false)
    {
        PODeliveryDataArray.push(PODeliveryData);
    }
    else
    {
        PODeliveryDataArray[DelIndex] = PODeliveryData;
    }
    return PODeliveryDataArray;
}

function getDeliveryScheduleDataAsJson(ItemNumber, POLineItemDataLinkId, PODeliveryScheduleDataArray)
{
    $("#DeliveryScheduleTableId tbody tr").each(function() {
        var PODeliveryScheduleData = {};

        PODeliveryScheduleData["LinkId"] = POLineItemDataLinkId;
        PODeliveryScheduleData["ItemNo"] = ItemNumber;
        PODeliveryScheduleData["DelDateCatg"] = $(this).find("td").eq(0).children(".deliveryDateCategory").val();
        PODeliveryScheduleData["DelDate"] = "";
        PODeliveryScheduleData["ScheduledQuantity"] = removeCommaInNumber($(this).find("td").eq(3).children(".scheduledQuantityClass").val()).toString();
        PODeliveryScheduleData["DelTime"] = $(this).find("td").eq(4).children(".timeDeliveryScheduledClass").val();
        PODeliveryScheduleData["PRNumber"] = $(this).find("td").eq(5).children(".prNumberDeliveryScheduledClass").val();
        PODeliveryScheduleData["ReqItemNo"] = $(this).find("td").eq(6).children(".reqItemNumberClass").val();

        var isDelSchAdded = false;
        var DelSchIndex = -1;
        for (var i = 0; i < PODeliveryScheduleDataArray.length; i++)
        {
            if (PODeliveryScheduleDataArray[i].ItemNo === PODeliveryScheduleData.ItemNo)
            {
                isDelSchAdded = true;
                DelSchIndex = i;
            }
        }
        if (isDelSchAdded === false)
        {
            PODeliveryScheduleDataArray.push(PODeliveryScheduleData);
        }
        else
        {
            PODeliveryScheduleDataArray[DelSchIndex] = PODeliveryScheduleData;
            isDelSchAdded = false;
        }
    });
    return PODeliveryScheduleDataArray;
}

function getHeaderLevelDataAsXml()
{
    var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
    var vendorName = vendorNameCode.substring(0, vendorNameCode.lastIndexOf('-'));
    console.log(vendorCode + ", " + vendorName);
    vendorName = handleSpecialCharacter(vendorName);
    console.log("After Special Character: " + vendorName);

    var docDate = $("#docDateHeader").val();
    console.log("docDate: " + docDate);
    var arr1 = docDate.split("-");
    var day = arr1[0].trim();
    var month = arr1[1].trim();
    var year = arr1[2].trim();
    var newDocDate = year + "-" + month + "-" + day;
    console.log("newDocDate: " + newDocDate);

    var xmlString = "<POCreation>"
            + "<GeneralData>"
            + "<PID>" + $("#Pid").val() + "</PID>" //PID of WI
            + "<RequestFlag>M</RequestFlag>"
            + "<UniqueID></UniqueID>"
            + "<UserId>" + $("#creatorId").text() + "</UserId>"
            + "<InitiatorId>" + $("#creatorId").text() + "</InitiatorId>"
            + "<InitiatorEmailId>" + $("#creatorEmailId").text() + "</InitiatorEmailId>"
            + "<CompanyCode>" + $("#companycodeHeader").val() + "</CompanyCode>"
            + "<RequestType>Amend Purchase Order</RequestType>"
            + "<PurchaseSubCategory></PurchaseSubCategory>"
            + "<PurchaseOrderNumber>" + $("#poNumber").val() + "</PurchaseOrderNumber>"
            + "<PurchaseOrderType>" + $("#typeOfPOHeader").val() + "</PurchaseOrderType>"
            + "<ReferenceDocumentType>" + $("#referenceDocType").val() + "</ReferenceDocumentType>"
            + "<ReferenceDocumentNumber>" + $("#referenceDocNumber").val() + "</ReferenceDocumentNumber>"
            + "<ReferenceDocumentLine>" + $("#referenceDocLine").val() + "</ReferenceDocumentLine>"
            + "<VendorName>" + vendorName + "</VendorName>"
            + "<VendorCode>" + vendorCode + "</VendorCode>"
            + "<DocumentDate>" + docDate + "</DocumentDate>"
            + "<DownpaymentReqd>" + $("#downPaymentReqd").val() + "</DownpaymentReqd>"
            + "<value>" + $("#downPaymentReqdValue").val() + "</value>"
            + "<PurchasingOrg>" + $("#purchasingOrg").val() + "</PurchasingOrg>"
            + "<PurchasingGrp>" + $("#purchasingGroup").val() + "</PurchasingGrp>"
            + "<CollectiveNumber>" + $("#CollectiveNumber").val() + "</CollectiveNumber>"
            + "</GeneralData>";

//    console.log("GeneralData: " + xmlString);        

    var PODeliveryInvoiceData = "<PODeliveryInvoiceData>"
            + "<paymentTerms>" + $("#paymentTermsDelivery").val() + "</paymentTerms>"
            + "<paymentindays1>" + $("#paymentDays1").val() + "</paymentindays1>"
            + "<paymentinpercnt1>" + $("#paymentPer1").val() + "</paymentinpercnt1>"
            + "<paymentindays2>" + $("#paymentDays2").val() + "</paymentindays2>"
            + "<paymentinpercnt2>" + $("#paymentPer1").val() + "</paymentinpercnt2>"
            + "<paymentindaysnet>" + $("#paymentDaysNet").val() + "</paymentindaysnet>"
            + "<Currency>" + $("#CurrencyDeliveryInvoice").val() + "</Currency>"
            + "<ExchangeRate>" + $("#ExchangeRate").val() + "</ExchangeRate>"
            + "<ExchangeRateFixed>" + ($("#ExchangeReateFixed").prop("checked") === true ? 'true' : 'false') + "</ExchangeRateFixed>"
            + "<Incoterms1>" + $("#IncoTermsPart1").val() + "</Incoterms1>"
            + "<Incoterms2>" + $("#IncoTermsPart2").val() + "</Incoterms2>"
            + "<GRMessage>" + ($("#GRMessage").prop("checked") === true ? 'true' : 'false') + "</GRMessage>"
            + "</PODeliveryInvoiceData>";

//    console.log("PODeliveryInvoiceData: " + PODeliveryInvoiceData);

    var POVendorAddressData = "<POVendorAddressData>"
            + "<Street>" + $("#streetVendorAddress").val() + "</Street>"
            + "<HouseNumber>" + $("#houseNumberVendorAddress").val() + "</HouseNumber>"
            + "<PostalCode>" + $("#postalCodeVendorAddress").val() + "</PostalCode>"
            + "<City>" + $("#cityVendorAddress").val() + "</City>"
            + "<Country>" + $("#countryVendorAddress").val() + "</Country>"
            + "<TelNo>" + $("#telephoneVendorAddress").val() + "</TelNo>"
            + "<TelExt>" + $("#extTel").val() + "</TelExt>"
            + "<FaxNo>" + $("#faxVendorAddress").val() + "</FaxNo>"
            + "<FaxExt>" + $("#extFax").val() + "</FaxExt>"
            + "</POVendorAddressData>";

//    console.log("POVendorAddressData: " + POVendorAddressData);

    var POCustomerData = "<POCustomerData>"
            + "<PaymentImmediate>" + ($("#PaymentImmediate").prop("checked") === true ? 'true' : 'false') + "</PaymentImmediate>"
            + "<ExternalWeight>" + ($("#ExternalWeight").prop("checked") === true ? 'true' : 'false') + "</ExternalWeight>"
            + "<InstructionsToWeighter>" + $("#InstructionToWeigher").val() + "</InstructionsToWeighter>"
            + "<ZoneCollectionScrap>" + $("#ZoneCollectionScrap").val() + "</ZoneCollectionScrap>"
            + "<PriceDisplay>" + ($("#PriceDisplay").prop("checked") === true ? 'true' : 'false') + "</PriceDisplay>"
            + "<ProductOrigin>" + $("#ProductOrigin").val() + "</ProductOrigin>"
            + "<Segment>" + $("#SegmentDescription").val() + "</Segment>"
            + "</POCustomerData>";

//    console.log("POCustomerData: " + POCustomerData);

    var POCommunicationData = "<POCommunicationData>"
            + "<SalesPerson>" + $("#Salesperson").val() + "</SalesPerson>"
            + "<YourReference>" + $("#YourReference").val() + "</YourReference>"
            + "<Telephone>" + $("#Telephone").val() + "</Telephone>"
            + "<OurReference>" + $("#OurReference").val() + "</OurReference>"
            + "<Language>" + $("#Language").val() + "</Language>"
            + "</POCommunicationData>";

//    console.log("POCommunicationData: " + POCommunicationData);

    var POPartnersData = "";
    $("#partnerTableId tbody tr").each(function() {
        POPartnersData += "<POPartnersData>"
                + "<PartnerFunction></PartnerFunction>"
                + "<Name></Name>"
                + "<Number></Number>"
                + "<VendorName></VendorName>"
                + "</POPartnersData>";
    });
//    console.log("POPartnersData: " + POPartnersData);

    var POConditionsData = "";
    $("#conditionTableId tbody tr").each(function() {
        console.log($(this).find("td").eq(1).children(".ConditionTypeHeader").val());

        var condName = "";
        if ($(this).find("td").eq(2).children(".nameConditionsHeader").val() !== undefined && $(this).find("td").eq(2).children(".nameConditionsHeader").val() !== "")
        {
            condName = handleSpecialCharacter($(this).find("td").eq(2).children(".nameConditionsHeader").val());
        }

        POConditionsData += "<POConditionsData>"
                + "<CondUnit>" + $(this).find("td").eq(7).children(".UoMHeader").val() + "</CondUnit>"
                + "<CondSTNo>" + $(this).find("td").eq(13).children(".conditionHeaderSTUNR").val() + "</CondSTNo>"
                + "<CondCount>" + $(this).find("td").eq(13).children(".conditionHeaderZAEHK").val() + "</CondCount>"
                + "<CondChangeId>" + $(this).find("td").eq(13).children(".conditionHeaderCHANGEID").val() + "</CondChangeId>"
                + "<CondType>" + $(this).find("td").eq(1).children(".ConditionTypeHeader").val() + "</CondType>"
                + "<CondName>" + condName + "</CondName>"
                + "<CondVal>" + removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()) + "</CondVal>"
                + "<CondCrncy>" + $(this).find("td").eq(6).children(".CurrencyHeader").val() + "</CondCrncy>"
                + "<CondBaseRate></CondBaseRate>"
                + "<Amount></Amount>"
                + "<CondPricUnit></CondPricUnit>"
                + "<Currency></Currency>"
                + "<Currency1></Currency1>"
                + "<CondVal1></CondVal1>"
                + "<CondDet></CondDet>"
                + "<VendorName></VendorName>"
                + "<VendorCode></VendorCode>"
                + "<Application></Application>"
                + "<CondPriceDate></CondPriceDate>"
                + "<CondBaseVal></CondBaseVal>"
                + "<CondClass></CondClass>"
                + "<CalType></CalType>"
                + "<CondCatg></CondCatg>"
                + "<CondCtrl></CondCtrl>"
                + "<CondOrigin></CondOrigin>"
                + "<Statistical></Statistical>"
                + "<Accruals></Accruals>"
                + "<ChangedManually></ChangedManually>"
                + "<AcCrualsTxt></AcCrualsTxt>"
                + "<AccountKey></AccountKey>"
                + "<LinkId></LinkId>"
                + "</POConditionsData>";
    });
//        console.log("POConditionsData: " + POConditionsData);

    var POHeaderTextData = "";

    POHeaderTextData += "<POHeaderTextData>"
            + "<ItemNumber></ItemNumber>"
            + "<PONoteToApprover>" + $("#pONotetoApproverHeaderTextsLimits").val() + "</PONoteToApprover>"
            + "<HeaderNote>" + $("#HeaderNote").val() + "</HeaderNote>"
            + "<PricingTypes>" + $("#PricingTypes").val() + "</PricingTypes>"
            + "<Deadlines>" + $("#Deadlines").val() + "</Deadlines>"
            + "<TermsOfDelivery>" + $("#TermsofDelivery").val() + "</TermsOfDelivery>"
            + "<TermsOfPayment>" + $("#TermsofPayment").val() + "</TermsOfPayment>"
            + "<ShippingInstructions>" + $("#ShippingInstructions").val() + "</ShippingInstructions>"
            + "<VendorMemoGeneral>" + $("#VendorMemoGeneral").val() + "</VendorMemoGeneral>"
            + "<VendorMemoSpecial>" + $("#VendorMemoSpecial").val() + "</VendorMemoSpecial>"
            + "<LinkId></LinkId>"
            + "</POHeaderTextData>";

    console.log("POHeaderTextData: " + POHeaderTextData);

    xmlString += PODeliveryInvoiceData;
//    xmlString += POConditionsData;
    xmlString += POVendorAddressData;
    xmlString += POCustomerData;
    xmlString += POCommunicationData;
    xmlString += POPartnersData;
    xmlString += POHeaderTextData;

    return xmlString;
}

function getPRLineItemData()
{
    var POLineItemData = "";
    var PackageNo = "";
    $("#material_headerClass tbody tr").each(function(index) {
        console.log(index);
        if (PackageNo === "")
            PackageNo = index + 1;

        POLineItemData += "<POLineItemData>"
                + "<PRLinkID>" + $(this).find("td").eq(31).children(".POLineItemLinkId").val() + "</PRLinkID>"
                + "<PRNumber>" + $(this).find("td").eq(31).children(".POLineItemPrNumber").val() + "</PRNumber>"
                + "<PRItemNumber>" + $(this).find("td").eq(0).text().toString().trim() + "</PRItemNumber>"
                + "<ItemNumber>" + $(this).find("td").eq(31).children(".POLineItemItemNumber").val() + "</ItemNumber>"
                + "<AccountAssignment>" + $(this).find("td").eq(1).children(".accountAssignmentClass").val() + "</AccountAssignment>"
                + "<ItemCategory>" + $(this).find("td").eq(2).children(".itemCategoryClass").val() + "</ItemCategory>"
                + "<Criticality>" + $(this).find("td").eq(4).text() + "</Criticality>"
                + "<ShortText>" + $(this).find("td").eq(5).text() + "</ShortText>"
                + "<Quantity>" + $(this).find("td").eq(7).text() + "</Quantity>"
                + "<PriceUnit>" + $(this).find("td").eq(8).text() + "</PriceUnit>"
                + "<ValPrice></ValPrice>"
                + "<NetPrice>" + $(this).find("td").eq(9).text() + "</NetPrice>"
                + "<Currency>" + $(this).find("td").eq(10).text() + "</Currency>"
                + "<DeliveryDateCategory>" + $(this).find("td").eq(12).text() + "</DeliveryDateCategory>"
                + "<Total></Total>"
                + "<RequisitionDate>" + $(this).find("td").eq(13).text() + "</RequisitionDate>"
                + "<DeliveryDate>" + $(this).find("td").eq(14).text() + "</DeliveryDate>"
                + "<MaterialGroup>" + $(this).find("td").eq(16).text() + "</MaterialGroup>"
                + "<PurchasingGroup>" + $(this).find("td").eq(18).text() + "</PurchasingGroup>"
                + "<StorageLocation>" + $(this).find("td").eq(19).text() + "</StorageLocation>"
                + "<RequisitionerID></RequisitionerID>"
                + "<TrackingNumber>" + $(this).find("td").eq(28).text() + "</TrackingNumber>"
                + "<QuantityUnit></QuantityUnit>"
                + "<QuantityOrderedUnit></QuantityOrderedUnit>"
                + "<OpenQuantity></OpenQuantity>"
                + "<RequestDate></RequestDate>"
                + "<ReleaseDate></ReleaseDate>"
                + "<PlDelivTime></PlDelivTime>"
                + "<GRProcTime></GRProcTime>"
                + "<Closed></Closed>"
                + "<FixedID></FixedID>"
                + "<MaterialCode>" + $(this).find("td").eq(3).text() + "</MaterialCode>"
                + "<Description></Description>"
                + "<Plant>" + $(this).find("td").eq(15).text() + "</Plant>"
                + "<Unit>" + $(this).find("td").eq(30).text() + "</Unit>"
                + "<ProdStorageLocation></ProdStorageLocation>"
                + "<SupplyArea></SupplyArea>"
                + "<RequirementDate></RequirementDate>"
                + "<ValuationPrice></ValuationPrice>"
                + "<ValuationCurrency></ValuationCurrency>"
                + "<ValuationUnit></ValuationUnit>"
                + "<Promotion></Promotion>"
                + "<GoodsReceipt></GoodsReceipt>"
                + "<InvReceipt></InvReceipt>"
                + "<GRNonVal></GRNonVal>"
                + "<AgreementLineItem></AgreementLineItem>"
                + "<FixedVendor></FixedVendor>"
                + "<InfoRecord>" + $(this).find("td").eq(21).text() + "</InfoRecord>"
                + "<DesiredVendor></DesiredVendor>"
                + "<PurchasingOrganization>" + $(this).find("td").eq(17).text() + "</PurchasingOrganization>"
                + "<POUnit></POUnit>"
                + "<SupplyingPlant></SupplyingPlant>"
                + "<IssuingStorageLocation></IssuingStorageLocation>"
                + "<OverallLimit></OverallLimit>"
                + "<ExpectedValue></ExpectedValue>"
                + "<NoLimit></NoLimit>"
                + "<ItemTextLineItem></ItemTextLineItem>"
                + "<ItemNote></ItemNote>"
                + "<DeliveryText></DeliveryText>"
                + "<MaterialPOText></MaterialPOText>"
                + "<PRNotetoApprover></PRNotetoApprover>"
                + "<MaterialLongText>" + $(this).find("td").eq(6).text() + "</MaterialLongText>"
                + "<RequsitionEmail></RequsitionEmail>"
                + "<Distribution></Distribution>"  //Dist.
                + "<PartialInvoiceIndicator></PartialInvoiceIndicator>"  //Partial Inv. Ind.
                + "<BP_assign_date></BP_assign_date>"
                + "<BP_quantity_remaining></BP_quantity_remaining>"
                + "<BP_rfq_status></BP_rfq_status>"
                + "<BP_status></BP_status>"
                + "<BP_buyerdetails_id></BP_buyerdetails_id>"
                + "<BP_ItemCode></BP_ItemCode>"
                + "<BP_PRCreator>" + $(this).find("td").eq(23).text() + "</BP_PRCreator>"
                + "<BP_UOMStore></BP_UOMStore>"
                + "<BP_CompanyCode></BP_CompanyCode>"
                + "<RejectStatus></RejectStatus>"
                + "<QueryStatus></QueryStatus>"
                + "<ReferenceDate></ReferenceDate>"
                + "<SourceList></SourceList>"
                + "<CountryofOrigin></CountryofOrigin>"
                + "<HeaderNote></HeaderNote>"
                + "<OldMaterialCode></OldMaterialCode>"
                + "<NoteToBuyer></NoteToBuyer>"
                + "<UOMStore></UOMStore>"
                + "<PO_Requestor></PO_Requestor>"
                + "<PO_RequestorEmail></PO_RequestorEmail>"
                + "<PR_TrackingNumber></PR_TrackingNumber>"
                + "<QuotationNumber></QuotationNumber>"
                + "<HigherLevelItem></HigherLevelItem>"
                + "<SubitemCategory></SubitemCategory>"
                + "<Batch></Batch>"
                + "<LinkId></LinkId>"
                + "<PackageNo>" + PackageNo + "</PackageNo>"
                + "<TaxCode>" + $(this).find("td").eq(31).children(".POLineItemTaxCode").val() + "</TaxCode>"
                + "</POLineItemData>";
    });
    return POLineItemData;
}
function getAccAssTabForEdit(parsedJsonPoData, itemNumber)
{

    var POAccntAssignDataArray = parsedJsonPoData.POFetchOP.POAccntAssignData;
    console.log("POAccntAssignDataArray: " + POAccntAssignDataArray);
    console.log("POAccntAssignDataArray is Array: " + Array.isArray(POAccntAssignDataArray));
    $("#costCenteraccountAssignmentTebleId tbody tr").remove();
    if (POAccntAssignDataArray !== undefined) {
        $("#costCenteraccountAssignmentTebleId tbody tr").remove();
        if (Array.isArray(POAccntAssignDataArray) === true)
        {
            console.log("POAccntAssignDataArray len: " + POAccntAssignDataArray.length);
            var row = "";
            for (var i = 0; i < POAccntAssignDataArray.length; i++)
            {
                if (POAccntAssignDataArray[i].ItemNumber === itemNumber)
                {
//                        alert(POAccntAssignDataArray[i].ItemNumber);
                    row += "<tr>"
                            + "<td></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnQuantity' style='width: 150px;' value='" + (POAccntAssignDataArray[i].Quantity === undefined ? "" : formatNumberByComma(POAccntAssignDataArray[i].Quantity)) + "' max=''></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnPercentage' style='width: 100px;' value='" + (POAccntAssignDataArray[i].Percentage === undefined ? "" : POAccntAssignDataArray[i].Percentage) + "' max=''></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnGLAccount' style='width: 100px;' value='" + (POAccntAssignDataArray[i].GLAccount === undefined ? "" : POAccntAssignDataArray[i].GLAccount) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnCOArea' style='width: 100px;' value='" + (POAccntAssignDataArray[i].COArea === undefined ? "" : POAccntAssignDataArray[i].COArea) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnCostCetner' style='width: 100px;' value='" + (POAccntAssignDataArray[i].CostCenter === undefined ? "" : POAccntAssignDataArray[i].CostCenter) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnFund' style='width: 100px;' value='" + (POAccntAssignDataArray[i].Fund === undefined ? "" : POAccntAssignDataArray[i].Fund) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnFunctionalArea' style='width: 100px;' value='" + (POAccntAssignDataArray[i].FunctionalArea === undefined ? "" : POAccntAssignDataArray[i].FunctionalArea) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnFundCenter' style='width: 100px;' value='" + (POAccntAssignDataArray[i].FundsCentre === undefined ? "" : POAccntAssignDataArray[i].FundsCentre) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnCommitmentItem' style='width: 100px;' value='" + (POAccntAssignDataArray[i].CommitmentItem === undefined ? "" : POAccntAssignDataArray[i].CommitmentItem) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnUnloadingPoint' style='width: 100px;' value='" + (POAccntAssignDataArray[i].UnloadingPoint === undefined ? "" : POAccntAssignDataArray[i].UnloadingPoint) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnRecipients' style='width: 100px;' value='" + (POAccntAssignDataArray[i].Recipient === undefined ? "" : POAccntAssignDataArray[i].Recipient) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnOrder' style='width: 100px;' value='" + (POAccntAssignDataArray[i].AccOrder === undefined ? "" : POAccntAssignDataArray[i].AccOrder) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnAssets' style='width: 100px;' value='" + (POAccntAssignDataArray[i].Asset === undefined ? "" : POAccntAssignDataArray[i].Asset) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnWBSElement' style='width: 100px;' value='" + (POAccntAssignDataArray[i].WBSElement === undefined ? "" : POAccntAssignDataArray[i].WBSElement) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnSalesOrder' style='width: 100px;' value='" + (POAccntAssignDataArray[i].SalesOrder === undefined ? "" : POAccntAssignDataArray[i].SalesOrder) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnNetActNumber' style='width: 100px;' value=''></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnItemNumber' style='width: 100px;' value='" + (POAccntAssignDataArray[i].ItemNumber === undefined ? "" : POAccntAssignDataArray[i].ItemNumber) + "'></td>"
                            + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnDeliverySchedule' style='width: 100px;' value='" + (POAccntAssignDataArray[i].DeliverySchedule === undefined ? "" : POAccntAssignDataArray[i].DeliverySchedule) + "'></td>"
                            + "<td style='display:none;'>"
                            + "<input type='text' class='accAsgnLinkId' value='" + POAccntAssignDataArray[i].PRLinkID + "'>"
                            + "</td>"
                            + "</tr>";

                }
            }
            $("#costCenteraccountAssignmentTebleId tbody").append(row);
        }
        else
        {
            if (POAccntAssignDataArray.ItemNumber === itemNumber)
            {
                var row = "<tr>"
                        + "<td></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnQuantity' style='width: 150px;' value='" + (POAccntAssignDataArray.Quantity === undefined ? "" : formatNumberByComma(POAccntAssignDataArray.Quantity)) + "' max=''></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnPercentage' style='width: 100px;' value='" + (POAccntAssignDataArray.Percentage === undefined ? "" : POAccntAssignDataArray.Percentage) + "' max=''></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnGLAccount' style='width: 100px;' value='" + (POAccntAssignDataArray.GLAccount === undefined ? "" : POAccntAssignDataArray.GLAccount) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnCOArea' style='width: 100px;' value='" + (POAccntAssignDataArray.COArea === undefined ? "" : POAccntAssignDataArray.COArea) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnCostCetner' style='width: 100px;' value='" + (POAccntAssignDataArray.CostCenter === undefined ? "" : POAccntAssignDataArray.CostCenter) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnFund' style='width: 100px;' value='" + (POAccntAssignDataArray.Fund === undefined ? "" : POAccntAssignDataArray.Fund) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnFunctionalArea' style='width: 100px;' value='" + (POAccntAssignDataArray.FunctionalArea === undefined ? "" : POAccntAssignDataArray.FunctionalArea) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnFundCenter' style='width: 100px;' value='" + (POAccntAssignDataArray.FundsCentre === undefined ? "" : POAccntAssignDataArray.FundsCentre) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnCommitmentItem' style='width: 100px;' value='" + (POAccntAssignDataArray.CommitmentItem === undefined ? "" : POAccntAssignDataArray.CommitmentItem) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnUnloadingPoint' style='width: 100px;' value='" + (POAccntAssignDataArray.UnloadingPoint === undefined ? "" : POAccntAssignDataArray.UnloadingPoint) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnRecipients' style='width: 100px;' value='" + (POAccntAssignDataArray.Recipient === undefined ? "" : POAccntAssignDataArray.Recipient) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnOrder' style='width: 100px;' value='" + (POAccntAssignDataArray.AccOrder === undefined ? "" : POAccntAssignDataArray.AccOrder) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnAssets' style='width: 100px;' value='" + (POAccntAssignDataArray.Asset === undefined ? "" : POAccntAssignDataArray.Asset) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnWBSElement' style='width: 100px;' value='" + (POAccntAssignDataArray.WBSElement === undefined ? "" : POAccntAssignDataArray.WBSElement) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnSalesOrder' style='width: 100px;' value='" + (POAccntAssignDataArray.SalesOrder === undefined ? "" : POAccntAssignDataArray.SalesOrder) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnNetActNumber' style='width: 100px;' value=''></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnItemNumber' style='width: 100px;' value='" + (POAccntAssignDataArray.ItemNumber === undefined ? "" : POAccntAssignDataArray.ItemNumber) + "'></td>"
                        + "<td><input type='text' readonly='true' class='form-control form-rounded input-height accAsgnDeliverySchedule' style='width: 100px;' value='" + (POAccntAssignDataArray.DeliverySchedule === undefined ? "" : POAccntAssignDataArray.DeliverySchedule) + "'></td>"
                        + "<td style='display:none;'>"
                        + "<input type='hidden' class='accAsgnLinkId' value='" + POAccntAssignDataArray.LinkID + "'>"
                        + "</td>"
                        + "</tr>";
                $("#costCenteraccountAssignmentTebleId tbody").append(row);
            }
        }
    }
}
function hideAllField() {
//            alert("hide");
    $("#accAsgCostCenterLabel").css("display", "none");
    $("#costCenterAccAsgn").css("display", "none");
    $("#assAsgnorderLabel").css("display", "none");
    $("#accAsgnOrder").css("display", "none");
    $("#accAsgnAssetLabel").css("display", "none");
    $("#accAsgnAsset").css("display", "none");
    $("#wBSElementLabel").css("display", "none");
    $("#accAsgnWBSElementInput").css("display", "none");
    $("#accAsgnSalesOrderLabel").css("display", "none");
    $("#accAsgnSalesOrder").css("display", "none");
    $("#assAsgnItemNumLabel").css("display", "none");
    $("#assAsgnItemNumber").css("display", "none");
    $("#assAsgnDelivSchLabel").css("display", "none");
    $("#assAsgnDelivSch").css("display", "none");
    $("#accAsgnFundLabel").css("display", "none");
    $("#accAsgnfund").css("display", "none");
    $("#accAsgnfunctionalAreaLabel").css("display", "none");
    $("#accAsgnfunctionalArea").css("display", "none");
    $("#accAsgnFundCenterLabel").css("display", "none");
    $("#accAsgnFundCenterInput").css("display", "none");
    $("#accAsgnCommItemLabel").css("display", "none");
    $("#accAsgnCommItemInput").css("display", "none");
    $("#accAsgnNActNumLabel").css("display", "none");
    $("#accAsgnNActNumInput").css("display", "none");
    //    $("#accAsgnFundCenterInput").after("<br><br/>").remove();
    $('.costCenterDiv br').remove();
    var rowCount = costCenteraccountAssignmentTebleId.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        costCenteraccountAssignmentTebleId.deleteRow(i);
        if (i === 0) {
            return false;
        }
    }
}
function blockAllFields() {
//        alert("requestFrom :" + requestFrom);
    var row;
    row = "<tr><th class='border-0 th-color'>" +
            "</th><th class='border-0 th-color'>" + 'Quant' +
            "</th><th class='border-0 th-color'>" + '%' +
            "</th><th class='border-0 th-color'>" + 'GL A/C' +
            "</th><th class='border-0 th-color'>" + 'CO Area' +
            "</th><th class='border-0 th-color'>" + 'Cost Center' +
            "</th><th class='border-0 th-color'>" + 'Fund' +
            "</th><th class='border-0 th-color'>" + 'Fun Area' +
            "</th><th class='border-0 th-color'>" + 'Fund Center' +
            "</th><th class='border-0 th-color'>" + 'Com Item' +
            "</th><th class='border-0 th-color'>" + 'Unloading Point' +
            "</th><th class='border-0 th-color'>" + 'Recipients' +
            "</th><th class='border-0 th-color'>" + 'Order' +
            "</th><th class='border-0 th-color'>" + 'Asset' +
            "</th><th class='border-0 th-color'>" + 'WBS Elements' +
            "</th><th class='border-0 th-color'>" + 'Sales Order' +
            "</th><th class='border-0 th-color'>" + 'Network/Activity Number' +
            "</th><th class='border-0 th-color'>" + 'Item Number' +
            "</th><th class='border-0 th-color'>" + 'Delivery Schedule' +
            "</th></tr>";
    $("#costCenteraccountAssignmentTebleId").children("thead").append(row);
}

function accountAssignmentTab_AccAssCat_Z(parsedJsonPoData, itemNumber)
{
    $("#unloadingPointLabel").css("display", "none");
    $("#unloadingPoint").css("display", "none");
    $("#recipientLabel").css({
        "margin-left": "5px"
    });
    $("#recipient").css({
        "margin-left": "20px"
    });
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");

    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#accAsgCostCenterLabel").css({
        "display": "inline",
        "margin-left": "5px"
    });
    $("#costCenterAccAsgn").css({
        "display": "inline",
        "margin-left": "5px"
    });
    $("#assAsgnorderLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnOrder").css({
        "display": "inline",
        "margin-left": "45px"
    });

}
function accountAssignmentTab_AccAssCat_X(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "10px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "15px"
    });
    $("#gLAccount").css({
        "margin-left": "20px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "27px"
    });
    $("#accAsgCostCenterLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#costCenterAccAsgn").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnorderLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnOrder").css({
        "display": "inline",
        "margin-left": "35px"
    });
    $("#wBSElementLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnWBSElementInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").after("<br><br/>");
}
function accountAssignmentTab_AccAssCat_U(parsedJsonPoData, itemNumber)
{
    hideAllField();
    if ($("#account_assignment").hasClass("active") === true) {
        //        alert("Bittu");
        $("#accAsgn_li").css("display", "none");
        $("#account_assignment-tab").removeClass("active");
        $("#account_assignment").removeClass("active");
//        $("#quantities").addClass("active");
//        $("#quantities-tab").addClass("active");
//        $("#quantities-tab").addClass("show");
        $("#material_linelevel").addClass("active");
        $("#material_linelevel-tab").addClass("active");
        $("#material_linelevel-tab").addClass("show");
    } else {
        $("#accAsgn_li").css("display", "none");
    }

    $("#profitabilitysegmentmodelbtn").css("display", "none");
}
function accountAssignmentTab_AccAssCat_T(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");

    $("#profitabilitysegmentmodelbtn").css("display", "block");
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "10px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "25px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "25px"
    });
    $("#accAsgCostCenterLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#costCenterAccAsgn").css("display", "inline");
    $("#assAsgnorderLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnOrder").css({
        "display": "inline",
        "margin-left": "35px"
    });
    $("#wBSElementLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnWBSElementInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").after("<br><br/>");
    $("#accAsgnCommItemLabel").css({
        "display": "inline",
        "margin-left": "0px"

    });
    $("#accAsgnCommItemInput").css({
        "display": "inline",
        "margin-left": "20px",
        "width": "290px"
    });
    $("#accAsgnNActNumLabel").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#accAsgnNActNumInput").css({
        "display": "inline",
        "margin-left": "25px"
    });
}
function accountAssignmentTab_AccAssCat_R(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
//            $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", "true");
        $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", "true");
        $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
//        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");


    $("#profitabilitysegmentmodelbtn").css("display", "block");
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "25px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "13px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#accAsgCostCenterLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#costCenterAccAsgn").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "13px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#accAsgnFundLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnfund").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnfund").after("<br><br/>");
    $("#accAsgnfunctionalAreaLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnfunctionalArea").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnFundCenterLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnFundCenterInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnCommItemLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnfund").prop("disabled", true);
    $("#accAsgnfunctionalArea").prop("disabled", true);
    $("#accAsgnFundCenterInput").prop("disabled", true);
    $("#accAsgnCommItemInput").prop("disabled", true);
    $("#accAsgnCommItemInput").css("display", "inline");
}
function accountAssignmentTab_AccAssCat_Q(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");

        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", "true");
        $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", "true");
        $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");

    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "20px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "25px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "15px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#wBSElementLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnWBSElementInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#accAsgnSalesOrder").prop("disabled", true);
    $("#assAsgnItemNumber").prop("disabled", true);
    $("#assAsgnDelivSch").prop("disabled", true);
}
function accountAssignmentTab_AccAssCat_P(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");

    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "20px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "20px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#wBSElementLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnWBSElementInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnNActNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnNActNumInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
}
function accountAssignmentTab_AccAssCat_M(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");

        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");

    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "27px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "15px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "30px"
    });
}
function accountAssignmentTab_AccAssCat_N(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#coArea").prop("disabled", true);
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "15px"
    });
    $("#recipient").css({
        "margin-left": "10px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "15px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#accAsgCostCenterLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#costCenterAccAsgn").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#costCenterAccAsgn").prop("disabled", true);
    $("#accAsgnNActNumLabel").css({
        "display": "inline",
        "margin-left": '15px'
    });
    $("#accAsgnNActNumInput").css({
        "display": "inline",
        "margin-left": '3px'
    });
}
function accountAssignmentTab_AccAssCat_G(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");

        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");


    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "10px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#profitabilitysegmentmodelbtn").css("display", "none");
}
function accountAssignmentTab_AccAssCat_F(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");

        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", "true");
        $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", "true");
        $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");


    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "10px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "50px"
    });
    $("#accAsgCostCenterLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#costCenterAccAsgn").css("display", "inline");
    $("#assAsgnorderLabel").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#accAsgnOrder").css({
        "display": "inline",
        "margin-left": "30px"
    });
    $("#accAsgnFundLabel").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#accAsgnfund").css({
        "display": "inline",
        "margin-left": "43px"
    });
    $("#accAsgnfunctionalAreaLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnfunctionalArea").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnFundCenterLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnFundCenterInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnFundCenterInput").after("<br><br/>");
    $("#accAsgnCommItemLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnCommItemInput").css({
        "display": "inline",
        "margin-left": "20px"
    });
    $("#accAsgnfund").prop("disabled", true);
    $("#accAsgnfunctionalArea").prop("disabled", true);
    $("#accAsgnFundCenterInput").prop("disabled", true);
    $("#accAsgnCommItemInput").prop("disabled", true);
}
function accountAssignmentTab_AccAssCat_K(parsedJsonPoData, itemNumber)
{

    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");
        $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", "true");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", "true");
        $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", "true");
        $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");

    $("#unloadingPoint").css({"margin-left": "10px"});
    $("#recipientLabel").css({"margin-left": "10px"});
    $("#recipient").css({"margin-left": "10px"});
    $("#gLAccountLabel").css({"margin-left": "10px"});
    $("#gLAccount").css({"margin-left": "30px"});
    $("#coAreaLabel").css({"margin-left": "60px"});
    $("#coArea").css({"margin-left": "35px"});
    $("#accAsgCostCenterLabel").css({"display": "inline", "margin-left": "0px"});
    $("#costCenterAccAsgn").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnFundLabel").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnfund").css({"display": "inline", "margin-left": "35px"});
    $("#accAsgnfunctionalAreaLabel").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnfunctionalArea").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnFundCenterLabel").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnFundCenterInput").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnCommItemLabel").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnCommItemInput").css({"display": "inline", "margin-left": "10px"});
    $("#gLAccount").prop("disabled", true);
    $("#coArea").prop("disabled", true);
    $("#accAsgnfund").prop("disabled", true);
    $("#accAsgnfunctionalArea").prop("disabled", true);
    $("#accAsgnFundCenterInput").prop("disabled", true);
    $("#accAsgnCommItemInput").prop("disabled", true);
    $("#profitabilitysegmentmodelbtn").css("display", "none");
}
function accountAssignmentTab_AccAssCat_A(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");

        $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", "true");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#gLAccount").prop("disabled", true);
    $("#coArea").prop("disabled", true);
    $("#accAsgnWBSElementInput").prop("disabled", true);
    $("#unloadingPoint").css({"margin-left": "10px"});
    $("#recipientLabel").css({"margin-left": "10px"});
    $("#recipient").css({"margin-left": "10px"});
    $("#gLAccountLabel").css({"margin-left": "10px"});
    $("#gLAccount").css({"margin-left": "20px"});
    $("#coAreaLabel").css({"margin-left": "10px"});
    $("#coArea").css({"margin-left": "10px"});
    $("#assAsgnorderLabel").css({"display": "inline", "margin-left": "0px"});
    $("#accAsgnOrder").css({"display": "inline", "margin-left": "45px"});
    $("#accAsgnAssetLabel").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnAsset").css({"display": "inline", "margin-left": "35px"});
    $("#wBSElementLabel").css({"display": "inline", "margin-left": "10px"});
    $("#accAsgnWBSElementInput").css({"display": "inline", "margin-left": "10px"});
}
function accountAssignmentTab_AccAssCat_B(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(17).css("display", "none");
        $(this).find("td").eq(18).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");
    //    alert("Bittu");
    $("#coArea").prop("disabled", true);
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "10px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
}
function accountAssignmentTab_AccAssCat_C(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "5px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "30px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "15px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "5px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "35px"
    });
}
function accountAssignmentTab_AccAssCat_D(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "20px"
    });
    $("#recipientLabel").css({
        "margin-left": "15px"
    });
    $("#recipient").css({
        "margin-left": "25px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "15px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#wBSElementLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnWBSElementInput").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "15px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "15px"
    });
}
function accountAssignmentTab_AccAssCat_E(parsedJsonPoData, itemNumber)
{
    hideAllField();
    blockAllFields();
    getAccAssTabForEdit(parsedJsonPoData, itemNumber);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
    });
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
    $("#profitabilitysegmentmodelbtn").css("display", "none");
    $("#unloadingPoint").css({
        "margin-left": "10px"
    });
    $("#recipientLabel").css({
        "margin-left": "10px"
    });
    $("#recipient").css({
        "margin-left": "30px"
    });
    $("#gLAccountLabel").css({
        "margin-left": "10px"
    });
    $("#gLAccount").css({
        "margin-left": "10px"
    });
    $("#coAreaLabel").css({
        "margin-left": "10px"
    });
    $("#coArea").css({
        "margin-left": "10px"
    });
    $("#accAsgnSalesOrderLabel").css({
        "display": "inline",
        "margin-left": "0px"
    });
    $("#accAsgnSalesOrder").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnItemNumber").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSchLabel").css({
        "display": "inline",
        "margin-left": "10px"
    });
    $("#assAsgnDelivSch").css({
        "display": "inline",
        "margin-left": "35px"
    });
}
function getServiceAccAssTabForEdit(parsedJsonPoData)
{
    var servicePackageNumber = $("#servicePackageNumber").val();
    console.log("servicePackageNumber: " + servicePackageNumber);

    var POAccntAssignvalDataArray = parsedJsonPoData.POFetchOP.POAccntAssignvalData;
    console.log("POAccntAssignvalDataArray: " + POAccntAssignvalDataArray);
    console.log("POAccntAssignvalDataArray is Array: " + Array.isArray(POAccntAssignvalDataArray));

    if (POAccntAssignvalDataArray !== undefined) {
        $("#serviceTabAccAsgnTebleId tbody tr").remove();
        var row = "";
        if (Array.isArray(POAccntAssignvalDataArray) === true) {
            console.log("POAccntAssignvalDataArray len: " + POAccntAssignvalDataArray.length);
            for (var i = 0; i < POAccntAssignvalDataArray.length; i++) {
                if (POAccntAssignvalDataArray[i].PackageNo === servicePackageNumber)
                {
                    row += "<tr>"
                            + "<td></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblQuantity' style='width: 150px;' value='" + (POAccntAssignvalDataArray[i].Quantity === undefined ? "" : formatNumberByComma(POAccntAssignvalDataArray[i].Quantity)) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblPercentage' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].Percentage === undefined ? "" : POAccntAssignvalDataArray[i].Percentage) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblGLAccount' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].GLAccount === undefined ? "" : POAccntAssignvalDataArray[i].GLAccount) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblCOArea' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].CoArea === undefined ? "" : POAccntAssignvalDataArray[i].CoArea) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblCostCetner' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].CostCenter === undefined ? "" : POAccntAssignvalDataArray[i].CostCenter) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblFund' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].Fund === undefined ? "" : POAccntAssignvalDataArray[i].Fund) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblFunctionalArea' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].FunctionalArea === undefined ? "" : POAccntAssignvalDataArray[i].FunctionalArea) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblFundCenter' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].FundsCentre === undefined ? "" : POAccntAssignvalDataArray[i].FundsCentre) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblCommitmentItem' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].CommitmentItem === undefined ? "" : POAccntAssignvalDataArray[i].CommitmentItem) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblOrder' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].Acc_Order === undefined ? "" : POAccntAssignvalDataArray[i].Acc_Order) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblAssets' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].Acc_Asset === undefined ? "" : POAccntAssignvalDataArray[i].Acc_Asset) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblWBSElement' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].Acc_WBSElement === undefined ? "" : POAccntAssignvalDataArray[i].Acc_WBSElement) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblSalesOrder' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].SalesOrder === undefined ? "" : POAccntAssignvalDataArray[i].SalesOrder) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblNetActNumber' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].ActivityNumber === undefined ? "" : POAccntAssignvalDataArray[i].ActivityNumber) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblItemNumber' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].ItemNumber === undefined ? "" : POAccntAssignvalDataArray[i].ItemNumber) + "' max=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule' style='width: 100px;' value='" + (POAccntAssignvalDataArray[i].DeliverySchedule === undefined ? "" : POAccntAssignvalDataArray[i].DeliverySchedule) + "' max=''></td>"
                            + "</tr>";
                }
            }
            $("#serviceTabAccAsgnTebleId tbody").append(row);
        }
        else
        {
            if (POAccntAssignvalDataArray.PackageNo === servicePackageNumber)
            {
                row += "<tr>"
                        + "<td></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblQuantity' style='width: 150px;' value='" + (POAccntAssignvalDataArray.Quantity === undefined ? "" : formatNumberByComma(POAccntAssignvalDataArray.Quantity)) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblPercentage' style='width: 100px;' value='" + (POAccntAssignvalDataArray.Percentage === undefined ? "" : POAccntAssignvalDataArray.Percentage) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblGLAccount' style='width: 100px;' value='" + (POAccntAssignvalDataArray.GLAccount === undefined ? "" : POAccntAssignvalDataArray.GLAccount) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblCOArea' style='width: 100px;' value='" + (POAccntAssignvalDataArray.CoArea === undefined ? "" : POAccntAssignvalDataArray.CoArea) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblCostCetner' style='width: 100px;' value='" + (POAccntAssignvalDataArray.CostCenter === undefined ? "" : POAccntAssignvalDataArray.CostCenter) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblFund' style='width: 100px;' value='" + (POAccntAssignvalDataArray.Fund === undefined ? "" : POAccntAssignvalDataArray.Fund) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblFunctionalArea' style='width: 100px;' value='" + (POAccntAssignvalDataArray.FunctionalArea === undefined ? "" : POAccntAssignvalDataArray.FunctionalArea) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblFundCenter' style='width: 100px;' value='" + (POAccntAssignvalDataArray.FundsCentre === undefined ? "" : POAccntAssignvalDataArray.FundsCentre) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblCommitmentItem' style='width: 100px;' value='" + (POAccntAssignvalDataArray.CommitmentItem === undefined ? "" : POAccntAssignvalDataArray.CommitmentItem) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblOrder' style='width: 100px;' value='" + (POAccntAssignvalDataArray.Acc_Order === undefined ? "" : POAccntAssignvalDataArray.Acc_Order) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblAssets' style='width: 100px;' value='" + (POAccntAssignvalDataArray.Acc_Asset === undefined ? "" : POAccntAssignvalDataArray.Acc_Asset) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblWBSElement' style='width: 100px;' value='" + (POAccntAssignvalDataArray.Acc_WBSElement === undefined ? "" : POAccntAssignvalDataArray.Acc_WBSElement) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblSalesOrder' style='width: 100px;' value='" + (POAccntAssignvalDataArray.SalesOrder === undefined ? "" : POAccntAssignvalDataArray.SalesOrder) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblNetActNumber' style='width: 100px;' value='" + (POAccntAssignvalDataArray.ActivityNumber === undefined ? "" : POAccntAssignvalDataArray.ActivityNumber) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblItemNumber' style='width: 100px;' value='" + (POAccntAssignvalDataArray.ItemNumber === undefined ? "" : POAccntAssignvalDataArray.ItemNumber) + "' max=''></td>"
                        + "<td><input type='text' class='form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule' style='width: 100px;' value='" + (POAccntAssignvalDataArray.DeliverySchedule === undefined ? "" : POAccntAssignvalDataArray.DeliverySchedule) + "' max=''></td>"
                        + "</tr>";

                $("#serviceTabAccAsgnTebleId tbody").append(row);
            }
        }
    }
}
function hideServiceAccAsgnField() {
    $("#CostCenterServiceLabel").css("display", "none");
    $("#costCenterService").css("display", "none");
    $("#serviceOrderLabel").css("display", "none");
    $("#OrderService").css("display", "none");
    $("#AssetServiceLabel").css("display", "none");
    $("#AssetService").css("display", "none");
    $("#wBSElementServiceLabel").css("display", "none");
    $("#WBSElementInputService").css("display", "none");
    $("#SalesOrderServiceLabel").css("display", "none");
    $("#SalesOrderService").css("display", "none");
    $("#ItemNumServiceLabel").css("display", "none");
    $("#ItemNumberService").css("display", "none");
    $("#DelivSchServiceLabel").css("display", "none");
    $("#DelivSchService").css("display", "none");
    $("#FundServiceLabel").css("display", "none");
    $("#fundService").css("display", "none");
    $("#functionalAreaServiceLabel").css("display", "none");
    $("#functionalAreaService").css("display", "none");
    $("#FundCenterServiceLabel").css("display", "none");
    $("#FundCenterServiceInput").css("display", "none");
    $("#CommItemServiceLabel").css("display", "none");
    $("#CommItemServiceInput").css("display", "none");
    $("#NActNumServiceLabel").css("display", "none");
    $("#NActNumServiceInput").css("display", "none");


    $("#gLAccountService").prop("disabled", false);
    $("#costCenterService").prop("disabled", false);
    $("#OrderService").prop("disabled", false);
    $("#AssetService").prop("disabled", false);
    $("#WBSElementInputService").prop("disabled", false);
    $("#SalesOrderService").prop("disabled", false);
    $("#ItemNumberService").prop("disabled", false);
    $("#DelivSchService").prop("disabled", false);
    $("#fundService").prop("disabled", false);
    $("#functionalAreaService").prop("disabled", false);
    $("#FundCenterServiceInput").prop("disabled", false);
    $("#FundCenterServiceInput").prop("disabled", false);
    $("#CommItemServiceInput").prop("disabled", false);
    $("#NActNumServiceInput").prop("disabled", false);

    $("#accountAssignmentForm br").remove();

    var rowCount = serviceTabAccAsgnTebleId.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        serviceTabAccAsgnTebleId.deleteRow(i);
    }
    var row;
    row = "<tr><th class='border-0 th-color'>" +
            "</th><th class='border-0 th-color'>" + 'Quant' +
            "</th><th class='border-0 th-color'>" + '%' +
            "</th><th class='border-0 th-color'>" + 'GL A/C' +
            "</th><th class='border-0 th-color'>" + 'CO Area' +
            "</th><th class='border-0 th-color'>" + 'Cost Center' +
            "</th><th class='border-0 th-color'>" + 'Fund' +
            "</th><th class='border-0 th-color'>" + 'Fun Area' +
            "</th><th class='border-0 th-color'>" + 'Fund Center' +
            "</th><th class='border-0 th-color'>" + 'Com Item' +
            "</th><th class='border-0 th-color'>" + 'Order' +
            "</th><th class='border-0 th-color'>" + 'Asset' +
            "</th><th class='border-0 th-color'>" + 'WBS Elements' +
            "</th><th class='border-0 th-color'>" + 'Sales Order' +
            "</th><th class='border-0 th-color'>" + 'Network/Activity Number' +
            "</th><th class='border-0 th-color'>" + 'Item Number' +
            "</th><th class='border-0 th-color'>" + 'Delivery Schedule' +
            "</th></tr>";
    $("#serviceTabAccAsgnTebleId").children("thead").append(row);
}
function serviceAccountAssignmentTab_AccAssCat_A(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#WBSElementInputService").prop("disabled", true);
    $("#gLAccountService").prop("disabled", true);
    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "10px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "10px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "30px"});
    $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
    $("#OrderService").css({"display": "inline", "margin-left": "45px"});
    $("#AssetServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#AssetService").css({"display": "inline", "margin-left": "30px"});
    $("#wBSElementServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#WBSElementInputService").css({"display": "inline", "margin-left": "10px"});


    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");

        $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(12).children(".serviceAccAsgnTblWBSElement").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
}
function serviceAccountAssignmentTab_AccAssCat_C(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "10px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "35px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "10px"});
    $("#SalesOrderServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#SalesOrderService").css({"display": "inline", "margin-left": "10px"});
    $("#ItemNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#ItemNumberService").css({"display": "inline", "margin-left": "10px"});
    $("#DelivSchServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#DelivSchService").css({"display": "inline", "margin-left": "30px"});


    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");

    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");

}
function serviceAccountAssignmentTab_AccAssCat_F(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "30px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "10px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "10px"});
    $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterService").css({"display": "inline", "margin-left": "30px"});
    $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
    $("#OrderService").css({"display": "inline", "margin-left": "25px"});
    $("#FundServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#fundService").css({"display": "inline", "margin-left": "45px"});
    $("#functionalAreaServiceLabel").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaService").css({"display": "inline", "margin-left": "10px"});
    $("#FundCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#FundCenterServiceInput").css({"display": "inline", "margin-left": "22px"});
    $("#CommItemServiceLabel").css({"display": "inline", "margin-left": "50px"});
    $("#CommItemServiceInput").css({"display": "inline", "margin-left": "10px"});

    $("#fundService").prop("disabled", true);
    $("#functionalAreaService").prop("disabled", true);
    $("#FundCenterServiceInput").prop("disabled", true);
    $("#CommItemServiceInput").prop("disabled", true);
    $("#fundService").after("<br><br/>");
    $("#functionalAreaService").after("<br><br/>");

    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
}
function serviceAccountAssignmentTab_AccAssCat_K(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "30px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "10px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "35px"});
    $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterService").css({"display": "inline", "margin-left": "30px"});
    $("#FundServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#fundService").css({"display": "inline", "margin-left": "30px"});
    $("#functionalAreaServiceLabel").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaService").css({"display": "inline", "margin-left": "10px"});
    $("#FundCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#FundCenterServiceInput").css({"display": "inline", "margin-left": "22px"});
    $("#CommItemServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#CommItemServiceInput").css({"display": "inline", "margin-left": "45px"});

    $("#gLAccountService").prop("disabled", true);
    $("#fundService").prop("disabled", true);
    $("#functionalAreaService").prop("disabled", true);
    $("#FundCenterServiceInput").prop("disabled", true);
    $("#CommItemServiceInput").prop("disabled", true);
    $("#functionalAreaService").after("<br><br/>");
    $("#FundCenterServiceInput").after("<br><br/>");

    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");

}
function serviceAccountAssignmentTab_AccAssCat_N(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "30px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "20px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "35px"});
    $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterService").css({"display": "inline", "margin-left": "30px"});
    $("#NActNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#NActNumServiceInput").css({"display": "inline", "margin-left": "10px"});

    $("#costCenterService").prop("disabled", true);

    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".serviceAccAsgnTblCostCetner").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
}
function serviceAccountAssignmentTab_AccAssCat_P(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "25px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "20px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "35px"});
    $("#wBSElementServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#WBSElementInputService").css({"display": "inline", "margin-left": "10px"});
    $("#NActNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#NActNumServiceInput").css({"display": "inline", "margin-left": "10px"});

    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
}
function serviceAccountAssignmentTab_AccAssCat_R(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "20px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "30px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "35px"});
    $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterService").css({"display": "inline", "margin-left": "20px"});
    $("#SalesOrderServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#SalesOrderService").css({"display": "inline", "margin-left": "10px"});
    $("#ItemNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#ItemNumberService").css({"display": "inline", "margin-left": "25px"});
    $("#DelivSchServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#DelivSchService").css({"display": "inline", "margin-left": "43px"});
    $("#FundServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#fundService").css({"display": "inline", "margin-left": "50px"});
    $("#functionalAreaServiceLabel").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaService").css({"display": "inline", "margin-left": "10px"});
    $("#FundCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#FundCenterServiceInput").css({"display": "inline", "margin-left": "10px"});
    $("#CommItemServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#CommItemServiceInput").css({"display": "inline", "margin-left": "33px"});


    $("#ItemNumberService").after("<br><br/>");
    $("#functionalAreaService").after("<br><br/>");
    $("#FundCenterServiceInput").after("<br><br/>");
    $("#fundService").prop("disabled", true);
    $("#functionalAreaService").prop("disabled", true);
    $("#FundCenterServiceInput").prop("disabled", true);
    $("#CommItemServiceInput").prop("disabled", true);

    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");

}
function serviceAccountAssignmentTab_AccAssCat_X(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "10px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "35px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "28px"});
    $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterService").css({"display": "inline", "margin-left": "10px"});
    $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
    $("#OrderService").css({"display": "inline", "margin-left": "50px"});
    $("#wBSElementServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#WBSElementInputService").css({"display": "inline", "margin-left": "10px"});
    $("#SalesOrderServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#SalesOrderService").css({"display": "inline", "margin-left": "10px"});
    $("#ItemNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#ItemNumberService").css({"display": "inline", "margin-left": "10px"});
    $("#DelivSchServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#DelivSchService").css({"display": "inline", "margin-left": "45px"});

    $("#WBSElementInputService").after("<br><br/>");

    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
}
function serviceAccountAssignmentTab_AccAssCat_Z(parsedJsonPoData)
{
    hideServiceAccAsgnField();
    getServiceAccAssTabForEdit(parsedJsonPoData);

    $("#gLAccountServiceLabel").css({"margin-left": "10px"});
    $("#gLAccountService").css({"margin-left": "10px"});
    $("#coAreaServiceLabel").css({"margin-left": "10px"});
    $("#coAreaService").css({"margin-left": "10px"});
    $("#companyCodeServiceLabel").css({"margin-left": "10px"});
    $("#companyCodeService").css({"margin-left": "28px"});
    $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterService").css({"display": "inline", "margin-left": "10px"});
    $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
    $("#OrderService").css({"display": "inline", "margin-left": "30px"});

    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(16).css("display", "none");
        $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
    $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
}

function hidelimitsAccAsgnModelField() {
    $("#costCenterLabel_Limits").css("display", "none");
    $("#costCenterInp_Limits").css("display", "none");
    $("#orderLabel_Limits").css("display", "none");
    $("#orderInp_Limits").css("display", "none");
    $("#assetLabel_Limits").css("display", "none");
    $("#assetInp_Limits").css("display", "none");
    $("#wBSElementLabel_Limits").css("display", "none");
    $("#wBSElementInp_Limits").css("display", "none");
    $("#salesOrderLabel_Limits").css("display", "none");
    $("#salesOrderInp_Limits").css("display", "none");
    $("#itemNumLabel_Limits").css("display", "none");
    $("#itemNumberInp_Limits").css("display", "none");
    $("#delivSchLabel_Limits").css("display", "none");
    $("#delivSchInp_Limits").css("display", "none");
    $("#fundLabel_Limits").css("display", "none");
    $("#fundInp_Limits").css("display", "none");
    $("#functionalAreaLabel_Limits").css("display", "none");
    $("#functionalAreaInp_Limits").css("display", "none");
    $("#fundCenterLabel_Limits").css("display", "none");
    $("#fundCenterInp_Limits").css("display", "none");
    $("#commItemLabel_Limits").css("display", "none");
    $("#commItemServiceInp_Limits").css("display", "none");
    $("#nActNumLabel_Limits").css("display", "none");
    $("#nActNumServiceInp_Limits").css("display", "none");

    $("#gLAccountInp_Limits").prop("disabled", false);
    $("#costCenterInp_Limits").prop("disabled", false);
    $("#orderInp_Limits").prop("disabled", false);
    $("#assetInp_Limits").prop("disabled", false);
    $("#wBSElementInp_Limits").prop("disabled", false);
    $("#salesOrderInp_Limits").prop("disabled", false);
    $("#itemNumberInp_Limits").prop("disabled", false);
    $("#delivSchInp_Limits").prop("disabled", false);
    $("#fundInp_Limits").prop("disabled", false);
    $("#functionalAreaInp_Limits").prop("disabled", false);
    $("#fundCenterInp_Limits").prop("disabled", false);
    $("#commItemServiceInp_Limits").prop("disabled", false);
    $("#nActNumServiceInp_Limits").prop("disabled", false);

    $("#limitsAccountAssignmentForm br").remove();

    var rowCount = limitTabAccAsgnTebleId.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        limitTabAccAsgnTebleId.deleteRow(i);
    }

    var row;
    row = "<tr><th class='border-0 th-color'>" +
            "</th><th class='border-0 th-color'>" + 'Per' +
            "</th><th class='border-0 th-color'>" + 'GL A/C' +
            "</th><th class='border-0 th-color'>" + 'CO Area' +
            "</th><th class='border-0 th-color'>" + 'Cost Center' +
            "</th><th class='border-0 th-color'>" + 'Fund' +
            "</th><th class='border-0 th-color'>" + 'Fun Area' +
            "</th><th class='border-0 th-color'>" + 'Fund Center' +
            "</th><th class='border-0 th-color'>" + 'Com Item' +
            "</th><th class='border-0 th-color'>" + 'Order' +
            "</th><th class='border-0 th-color'>" + 'Asset' +
            "</th><th class='border-0 th-color'>" + 'WBS Elements' +
            "</th><th class='border-0 th-color'>" + 'Sales Order' +
            "</th><th class='border-0 th-color'>" + 'Network/Activity Number' +
            "</th><th class='border-0 th-color'>" + 'Item Number' +
            "</th><th class='border-0 th-color'>" + 'Delivery Schedule' +
            "</th></tr>";
    $("#limitTabAccAsgnTebleId").children("thead").append(row);

}

function limitsAccountAssignmentTab_AccAssCat_A(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#wBSElementInp_Limits").prop("disabled", true);
    $("#gLAccountInp_Limits").prop("disabled", true);

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "30px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "45px"});
    $("#assetLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#assetInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#wBSElementLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#wBSElementInp_Limits").css({"display": "inline", "margin-left": "10px"});

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(4).css("display", "none");
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(11).children(".limitAccAsgnTblWBSElement").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(4).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_C(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "35px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "10px"});
    $("#salesOrderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumberInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchInp_Limits").css({"display": "inline", "margin-left": "30px"});

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(4).css("display", "none");
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(4).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_F(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "30px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "10px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "25px"});
    $("#fundLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundInp_Limits").css({"display": "inline", "margin-left": "45px"});
    $("#functionalAreaLabel_Limits").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterInp_Limits").css({"display": "inline", "margin-left": "22px"});
    $("#commItemLabel_Limits").css({"display": "inline", "margin-left": "50px"});
    $("#commItemServiceInp_Limits").css({"display": "inline", "margin-left": "10px"});

    $("#fundInp_Limits").prop("disabled", true);
    $("#functionalAreaInp_Limits").prop("disabled", true);
    $("#fundCenterInp_Limits").prop("disabled", true);
    $("#commItemServiceInp_Limits").prop("disabled", true);
    $("#fundInp_Limits").after("<br><br/>");
    $("#functionalAreaInp_Limits").after("<br><br/>");

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_K(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "30px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#fundLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#functionalAreaLabel_Limits").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterInp_Limits").css({"display": "inline", "margin-left": "22px"});
    $("#commItemLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#commItemServiceInp_Limits").css({"display": "inline", "margin-left": "45px"});

    $("#gLAccountInp_Limits").prop("disabled", true);
    $("#fundInp_Limits").prop("disabled", true);
    $("#functionalAreaInp_Limits").prop("disabled", true);
    $("#fundCenterInp_Limits").prop("disabled", true);
    $("#commItemServiceInp_Limits").prop("disabled", true);

    $("#functionalAreaInp_Limits").after("<br><br/>");
    $("#fundCenterInp_Limits").after("<br><br/>");

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_N(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "30px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "20px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#nActNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#nActNumServiceInp_Limits").css({"display": "inline", "margin-left": "10px"});

    $("#costCenterInp_Limits").prop("disabled", true);

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(4).children(".limitAccAsgnTblCostCetner").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_P(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "25px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "20px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#wBSElementLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#wBSElementInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#nActNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#nActNumServiceInp_Limits").css({"display": "inline", "margin-left": "10px"});

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(4).css("display", "none");
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(4).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_R(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "20px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "30px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "20px"});
    $("#salesOrderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumberInp_Limits").css({"display": "inline", "margin-left": "25px"});
    $("#delivSchLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchInp_Limits").css({"display": "inline", "margin-left": "43px"});
    $("#fundLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundInp_Limits").css({"display": "inline", "margin-left": "50px"});
    $("#functionalAreaLabel_Limits").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#commItemLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#commItemServiceInp_Limits").css({"display": "inline", "margin-left": "33px"});

    $("#itemNumberInp_Limits").after("<br><br/>");
    $("#functionalAreaInp_Limits").after("<br><br/>");
    $("#fundCenterInp_Limits").after("<br><br/>");
    $("#fundInp_Limits").prop("disabled", true);
    $("#functionalAreaInp_Limits").prop("disabled", true);
    $("#fundCenterInp_Limits").prop("disabled", true);
    $("#commItemServiceInp_Limits").prop("disabled", true);

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
        $(this).find("td").eq(1).children(".limitAccAsgnTblQuantity").css("width", "100px");
        $(this).find("td").eq(2).children(".limitAccAsgnTblGLAccount").css("width", "100px");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").css("width", "100px");
        $(this).find("td").eq(4).children(".limitAccAsgnTblCostCetner").css("width", "100px");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").css("width", "100px");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").css("width", "100px");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").css("width", "100px");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").css("width", "100px");
        $(this).find("td").eq(12).children(".limitAccAsgnTblSalesOrder").css("width", "100px");
        $(this).find("td").eq(14).children(".limitAccAsgnTblItemNumber").css("width", "100px");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_X(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "35px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "28px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "50px"});
    $("#wBSElementLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#wBSElementInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumberInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchInp_Limits").css({"display": "inline", "margin-left": "45px"});

    $("#wBSElementInp_Limits").after("<br><br/>");

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
}
function limitsAccountAssignmentTab_AccAssCat_Z(parsedJsonPoData)
{
    hidelimitsAccAsgnModelField();

    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "28px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "30px"});

    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function mergerLineItemConditionForHeaderCondition(POLineItemConditionJsonArray, canValArr)
{
    var row = "";
    var rowCount = $('#conditionTableId tr').length;
    console.log("rowCount: " + rowCount);

    if (rowCount === 1) {
        for (var i = 0; i < POLineItemConditionJsonArray.length; i++) {
            row += "<tr>"
                    + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='lineAddedFromHeader' value='headerlevel'><input type='hidden' class='conditionindex' value=''></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (POLineItemConditionJsonArray[i].ConditionType === undefined ? '' : POLineItemConditionJsonArray[i].ConditionType) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (POLineItemConditionJsonArray[i].ConditionName === undefined ? '' : POLineItemConditionJsonArray[i].ConditionName) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' value='" + (POLineItemConditionJsonArray[i].ConditionAmount === undefined ? '' : formatAmountByComma(POLineItemConditionJsonArray[i].ConditionAmount)) + "' style='width: 150px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (POLineItemConditionJsonArray[i].ConditionCurrency === undefined ? '' : POLineItemConditionJsonArray[i].ConditionCurrency) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' value='" + (POLineItemConditionJsonArray[i].ConditionPerQty === undefined ? '' : formatAmountByComma(POLineItemConditionJsonArray[i].ConditionPerQty)) + "' style='width: 150px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value='" + (POLineItemConditionJsonArray[i].ConditionPricingUnit === undefined ? '' : POLineItemConditionJsonArray[i].ConditionPricingUnit) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (POLineItemConditionJsonArray[i].ConditionUOM === undefined ? '' : POLineItemConditionJsonArray[i].ConditionUOM) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' value='" + (POLineItemConditionJsonArray[i].ConditionValue === undefined ? '' : formatAmountByComma(POLineItemConditionJsonArray[i].ConditionValue)) + "' style='width: 150px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (POLineItemConditionJsonArray[i].ConditionCurrency2 === undefined ? '' : POLineItemConditionJsonArray[i].ConditionCurrency2) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (POLineItemConditionJsonArray[i].Conditionvalue2 === undefined ? '' : POLineItemConditionJsonArray[i].Conditionvalue2) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (POLineItemConditionJsonArray[i].ConditionCurrency3 === undefined ? '' : POLineItemConditionJsonArray[i].ConditionCurrency3) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded conditionDetailsHeader tableInputField' name='conditionDetailsHeader' value='" + (POLineItemConditionJsonArray[i].ConditionDetails === undefined ? '' : POLineItemConditionJsonArray[i].ConditionDetails) + "'></td>"
                    + "<td>"
                    + "<input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (POLineItemConditionJsonArray[i].ConditionKAPPL === undefined ? '' : POLineItemConditionJsonArray[i].ConditionKAPPL) + "'>"
                    + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (POLineItemConditionJsonArray[i].ConditionKVSL1 === undefined ? '' : POLineItemConditionJsonArray[i].ConditionKVSL1) + "'>"
                    + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (POLineItemConditionJsonArray[i].ConditionKVSL2 === undefined ? '' : POLineItemConditionJsonArray[i].ConditionKVSL2) + "'>"
                    + "<input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (POLineItemConditionJsonArray[i].ConditionCount === undefined ? '' : POLineItemConditionJsonArray[i].ConditionCount) + "'>"
                    + "<input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (POLineItemConditionJsonArray[i].ConditionSTNumber === undefined ? '' : POLineItemConditionJsonArray[i].ConditionSTNumber) + "'>"
                    + "<input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (POLineItemConditionJsonArray[i].ConditionChangeId === undefined ? '' : POLineItemConditionJsonArray[i].ConditionChangeId) + "'>"
                    + "</td>"
                    + "</tr>";
        }
        $("#conditionTableId tbody").append(row);
    } else {
        console.log("POLineItemConditionJsonArray.length: " + POLineItemConditionJsonArray.length);
        $("#conditionTableId tbody tr").each(function(i) {

            var amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
            var per = removeCommaInNumber($(this).find("td").eq(4).children(".PerQuantityHeader").val());
            var condVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());

            console.log("POLineItemConditionJsonArray[i].ConditionAmount: " + POLineItemConditionJsonArray[i].ConditionAmount);

            if (amount !== 0 && POLineItemConditionJsonArray[i].ConditionAmount !== '') {
                $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(POLineItemConditionJsonArray[i].ConditionAmount) + parseInt(amount)));
            } else {
                $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(POLineItemConditionJsonArray[i].ConditionAmount)));
            }
            if (per !== 0 && POLineItemConditionJsonArray[i].ConditionPerQty !== '') {
                $(this).find("td").eq(4).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(POLineItemConditionJsonArray[i].ConditionPerQty) + parseInt(per)));
            } else {
                $(this).find("td").eq(4).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(POLineItemConditionJsonArray[i].ConditionPerQty)));
            }
            if (condVal !== 0 && canValArr[i] !== '') {
                $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(POLineItemConditionJsonArray[i].ConditionValue) + parseInt(condVal)));
            } else {
                $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(POLineItemConditionJsonArray[i].ConditionValue)));
            }
        });
    }
}
function calculateConditionValue(parsedJsonPoData, pRItemNumber) {

    console.log("==============In calculateConditionValue==================");

    var TotalFreight = window.socket_TotalFreight;
    var TotalFreightComm = window.socket_TotalFreightComm;
    var NetPrice = window.socket_NetPrice;
    var GrossPriceInclDiscount = window.socket_GrossPriceInclDiscount;
    var CostFreightCFR = window.socket_CostFreightCFR;
    var TotalInsurance = window.socket_TotalInsurance;
    var InsuranceFreight = window.socket_InsuranceFreight;
    var CostInsuranceFreightCIF = window.socket_CostInsuranceFreightCIF;
    var CIFWithGST = window.socket_CIFWithGST;
    var ZBordercrossingvalue = window.socket_3ZBordercrossingvalue;
    var PriceInclofdiscSurcharge = window.socket_PriceInclofdiscSurcharge;

    var PBXX = 0;
    var FRA1 = 0;
    var FRB1 = 0;
    var FRC1 = 0;
    var ZFR1 = 0;
    var ZPAC = 0;
    var ZCRQ = 0;
    var ZCOV = 0;
    var ZIMP = 0;
    var ZCOP = 0;
    var ZBIN = 0;
    var ZCOQ = 0;
    var ZSEC = 0;
    var ZMIS = 0;
    var ZINV = 0;
    var ZMSQ = 0;
    var ZINP = 0;
    var ZITQ = 0;
    var ZINQ = 0;
    var NAVS = 0;
    var ZNAV = 0;
    var NAVM = 0;
    var poQty;

    poQty = findDataOfPrLineItem(parsedJsonPoData, "Quantity", pRItemNumber);
    console.log("poQty: " + poQty);

    $("#conditionTableIdLineLevel tbody tr").each(function(i) {
        var condtype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
        if (condtype === 'PBXX') {
            PBXX = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (PBXX === "" || isNaN(PBXX)) {
                PBXX = 0;
            }
            console.log("PBXX :" + PBXX);
        }
        if (condtype === 'FRA1') {
            FRA1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (FRA1 === "" || isNaN(FRA1)) {
                FRA1 = 0;
            }
            console.log("FRA1 :" + FRA1);
        }
        if (condtype === 'FRB1') {
            FRB1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (FRB1 === "" || isNaN(FRB1)) {
                FRB1 = 0;
            }
            console.log("FRB1 :" + FRB1);
        }
        if (condtype === 'ZFR1') {
            ZFR1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZFR1 === "" || isNaN(ZFR1)) {
                ZFR1 = 0;
            }
            console.log("ZFR1 :" + ZFR1);
        }
        if (condtype === 'ZPAC') {
            ZPAC = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZPAC === "" || isNaN(ZPAC)) {
                ZPAC = 0;
            }
            console.log("ZPAC :" + ZPAC);
        }
        if (condtype === 'FRC1') {
            FRC1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (FRC1 === "" || isNaN(FRC1)) {
                FRC1 = 0;
            }
            console.log("FRC1 :" + FRC1);
        }
        if (condtype === 'ZCRQ') {
            ZCRQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCRQ === "" || isNaN(ZCRQ)) {
                ZCRQ = 0;
            }
            console.log("ZCRQ :" + ZCRQ);
        }
        if (condtype === 'ZCOV') {
            ZCOV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCOV === "" || isNaN(ZCOV)) {
                ZCOV = 0;
            }
            console.log("ZCOV :" + ZCOV);
        }
        if (condtype === 'ZIMP') {
            ZIMP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZIMP === "" || isNaN(ZIMP)) {
                ZIMP = 0;
            }
            console.log("ZIMP :" + ZIMP);
        }
        if (condtype === 'ZCOP') {
            ZCOP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCOP === "" || isNaN(ZCOP)) {
                ZCOP = 0;
            }
            console.log("ZCOP :" + ZCOP);
        }
        if (condtype === 'ZCOV') {
            ZBIN = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZBIN === "" || isNaN(ZBIN)) {
                ZBIN = 0;
            }
            console.log("ZBIN :" + ZBIN);
        }
        if (condtype === 'ZCOQ') {
            ZCOQ = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCOQ === "" || isNaN(ZCOQ)) {
                ZCOQ = 0;
            }
            console.log("ZCOQ :" + ZCOQ);
        }
        if (condtype === 'ZSEC') {
            ZSEC = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZSEC === "" || isNaN(ZSEC)) {
                ZSEC = 0;
            }
            console.log("ZSEC :" + ZSEC);
        }
        if (condtype === 'ZMIS') {
            ZMIS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZMIS === "" || isNaN(ZMIS)) {
                ZMIS = 0;
            }
            console.log("ZMIS :" + ZMIS);
        }
        if (condtype === 'ZINV') {
            ZINV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZINV === "" || isNaN(ZINV)) {
                ZINV = 0;
            }
            console.log("ZINV :" + ZINV);
        }
        if (condtype === 'ZMSQ') {
            ZMSQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZMSQ === "" || isNaN(ZMSQ)) {
                ZMSQ = 0;
            }
            console.log("ZMSQ :" + ZMSQ);
        }
        if (condtype === 'ZINP') {
            ZINP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZINP === "" || isNaN(ZINP)) {
                ZINP = 0;
            }
            console.log("ZINP :" + ZINP);
        }
        if (condtype === 'ZITQ') {
            ZITQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZITQ === "" || isNaN(ZITQ)) {
                ZITQ = 0;
            }
            console.log("ZITQ :" + ZITQ);
        }
        if (condtype === 'ZINQ') {
            ZINQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZINQ === "" || isNaN(ZINQ)) {
                ZINQ = 0;
            }
            console.log("ZINQ :" + ZINQ);
        }
        if (condtype === 'NAVS') {
            NAVS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (NAVS === "" || isNaN(NAVS)) {
                NAVS = 0;
            }
            console.log("NAVS :" + NAVS);
        }
        if (condtype === 'ZNAV') {
            ZNAV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZNAV === "" || isNaN(ZNAV)) {
                ZNAV = 0;
            }
            console.log("ZNAV :" + ZNAV);
        }
        if (condtype === 'NAVM') {
            NAVM = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (NAVM === "" || isNaN(NAVM)) {
                NAVM = 0;
            }
            console.log("NAVM :" + NAVM);
        }
    });

    $("#conditionTableIdLineLevel tbody tr").each(function(i) {
        var condtype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();

        if (condtype === 'FRA1') {
            FRA1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (FRA1 === "" || isNaN(FRA1)) {
                FRA1 = 0;
            }
            console.log("FRA1 :" + FRA1);
        }
        if (condtype === 'FRB1') {
            FRB1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (FRB1 === "" || isNaN(FRB1)) {
                FRB1 = 0;
            }
            console.log("FRB1 :" + FRB1);
        }
        if (condtype === 'ZFR1') {
            ZFR1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZFR1 === "" || isNaN(ZFR1)) {
                ZFR1 = 0;
            }
            console.log("ZFR1 :" + ZFR1);
        }
        if (condtype === 'ZPAC') {
            ZPAC = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZPAC === "" || isNaN(ZPAC)) {
                ZPAC = 0;
            }
            console.log("ZPAC :" + ZPAC);
        }
        if (condtype === 'FRC1') {
            FRC1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (FRC1 === "" || isNaN(FRC1)) {
                FRC1 = 0;
            }
            console.log("FRC1 :" + FRC1);
        }
        if (condtype === 'ZCRQ') {
            ZCRQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCRQ === "" || isNaN(ZCRQ)) {
                ZCRQ = 0;
            }
            console.log("ZCRQ :" + ZCRQ);
        }
        if (condtype === 'ZCOV') {
            ZCOV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCOV === "" || isNaN(ZCOV)) {
                ZCOV = 0;
            }
            console.log("ZCOV :" + ZCOV);
        }
        if (condtype === 'ZIMP') {
            ZIMP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZIMP === "" || isNaN(ZIMP)) {
                ZIMP = 0;
            }
            console.log("ZIMP :" + ZIMP);
        }
        if (condtype === 'ZCOP') {
            ZCOP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCOP === "" || isNaN(ZCOP)) {
                ZCOP = 0;
            }
            console.log("ZCOP :" + ZCOP);
        }
        if (condtype === 'ZCOV') {
            ZBIN = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZBIN === "" || isNaN(ZBIN)) {
                ZBIN = 0;
            }
            console.log("ZBIN :" + ZBIN);
        }
        if (condtype === 'ZCOQ') {
            ZCOQ = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZCOQ === "" || isNaN(ZCOQ)) {
                ZCOQ = 0;
            }
            console.log("ZCOQ :" + ZCOQ);
        }
        if (condtype === 'ZSEC') {
            ZSEC = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZSEC === "" || isNaN(ZSEC)) {
                ZSEC = 0;
            }
            console.log("ZSEC :" + ZSEC);
        }
        if (condtype === 'ZMIS') {
            ZMIS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZMIS === "" || isNaN(ZMIS)) {
                ZMIS = 0;
            }
            console.log("ZMIS :" + ZMIS);
        }
        if (condtype === 'ZINV') {
            ZINV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZINV === "" || isNaN(ZINV)) {
                ZINV = 0;
            }
            console.log("ZINV :" + ZINV);
        }
        if (condtype === 'ZMSQ') {
            ZMSQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZMSQ === "" || isNaN(ZMSQ)) {
                ZMSQ = 0;
            }
            console.log("ZMSQ :" + ZMSQ);
        }
        if (condtype === 'ZINP') {
            ZINP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZINP === "" || isNaN(ZINP)) {
                ZINP = 0;
            }
        }
        if (condtype === 'ZITQ') {
            ZITQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZITQ === "" || isNaN(ZITQ)) {
                ZITQ = 0;
            }
            console.log("ZITQ :" + ZITQ);
        }
        if (condtype === 'ZINQ') {
            ZINQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZINQ === "" || isNaN(ZINQ)) {
                ZINQ = 0;
            }
            console.log("ZINQ :" + ZINQ);
        }
        if (condtype === 'NAVS') {
            NAVS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (NAVS === "" || isNaN(NAVS)) {
                NAVS = 0;
            }
            console.log("NAVS :" + NAVS);
        }
        if (condtype === 'ZNAV') {
            ZNAV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (ZNAV === "" || isNaN(ZNAV)) {
                ZNAV = 0;
            }
            console.log("ZNAV :" + ZNAV);
        }
        if (condtype === 'NAVM') {
            NAVM = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
            if (NAVM === "" || isNaN(NAVM)) {
                NAVM = 0;
            }
            console.log("NAVM :" + NAVM);
        }
    });
    var expTotalFreight = new String(TotalFreight);
    var TotalFreightCondValue = eval(expTotalFreight.toString());
    var expTotalFreightComm = new String(TotalFreightComm);
    var TotalFreightCommCondValue = eval(expTotalFreightComm.toString());
    var expNetPrice = new String(NetPrice);
    var NetPriceCondValue = eval(expNetPrice.toString());
//        var expGrossPriceInclDiscount = new String(GrossPriceInclDiscount);
//        alert("expGrossPriceInclDiscount :" + expGrossPriceInclDiscount);
//        var GrossPriceInclDiscountCondValue = eval(expGrossPriceInclDiscount.toString());
    var expCostFreightCFR = new String(CostFreightCFR);
    var CostFreightCFRCondValue = eval(expCostFreightCFR.toString());
    var expTotalInsurance = new String(TotalInsurance);
    var TotalInsuranceCondValue = eval(expTotalInsurance.toString());
    var expInsuranceFreight = new String(InsuranceFreight);
    var InsuranceFreightCondValue = eval(expInsuranceFreight.toString());
    var expCostInsuranceFreightCIF = new String(CostInsuranceFreightCIF);
    var CostInsuranceFreightCIFCondValue = eval(expCostInsuranceFreightCIF.toString());
    var expCIFWithGST = new String(CIFWithGST);
    var CIFWithGSTCondValue = eval(expCIFWithGST.toString());
    var expZBordercrossingvalue = new String(ZBordercrossingvalue);
    var ZBordercrossingvalueCondValue = eval(expZBordercrossingvalue.toString());
    var expPriceInclofdiscSurcharge = new String(PriceInclofdiscSurcharge);
    var PriceInclofdiscSurchargeCondValue = eval(expPriceInclofdiscSurcharge.toString());
//        
//        alert("GrossPriceInclDiscountCondValue :" + GrossPriceInclDiscountCondValue);
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Total Freight") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(TotalFreightCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Total Freight & commisioning") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(TotalFreightCommCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Net Price") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(NetPriceCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Cost & Freight(CFR)") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(CostFreightCFRCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Total Insurance") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(TotalInsuranceCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Insurance and Freight") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(InsuranceFreightCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Cost Insurance & Freight (CIF)") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(CostInsuranceFreightCIFCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "CIF With GST") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(CIFWithGSTCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "@3Z@Border crossing value") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(ZBordercrossingvalueCondValue));
        }
    });
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (conName === "Price Incl of disc/Surcharge") {
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(PriceInclofdiscSurchargeCondValue));
        }
    });
}

function findDataOfPrLineItem(parsedJsonPoData, input, itemNumber)
{
    console.log("==============In findDataOfPrLineItem==================");
    console.log("itemNumber: " + itemNumber);
    console.log("input: " + input);
    var output = '';
    var POLineItemDataArray = parsedJsonPoData.POFetchOP.POLineItemData;
    console.log("POLineItemDataArray: " + POLineItemDataArray);
    if (POLineItemDataArray !== undefined) {
        if (Array.isArray(POLineItemDataArray) === true) {
            console.log("POLineItemDataArray len: " + POLineItemDataArray.length);
            for (var i = 0; i < POLineItemDataArray.length; i++)
            {
                if (POLineItemDataArray[i].ItemNumber === itemNumber)
                {
                    if (input === "AccountAssignmentCategory")
                    {
                        output = POLineItemDataArray[i].AccountAssignment;
                    }
                    else if (input === "PackageNo")
                    {
                        output = POLineItemDataArray[i].PackageNo;
                    }
                    else if (input === "PRLinkID")
                    {
                        output = POLineItemDataArray[i].PRLinkID;
                    }
                    else if (input === "PackageNo")
                    {
                        output = POLineItemDataArray[i].PackageNo;
                    }
                    else if (input === "LinkId")
                    {
                        output = POLineItemDataArray[i].LinkId;
                    }
                    else if (input === "Currency")
                    {
                        output = POLineItemDataArray[i].Currency;
                    }
                    else if (input === "Quantity")
                    {
                        output = POLineItemDataArray[i].Currency;
                    }
                    else if (input === "PRItemNumber")
                    {
                        output = POLineItemDataArray[i].PRItemNumber;
                    }
                }
            }
        }
        else
        {
            if (POLineItemDataArray.ItemNumber === itemNumber)
            {
                if (input === "AccountAssignmentCategory")
                {
                    output = POLineItemDataArray.AccountAssignment;
                }
                else if (input === "PackageNo")
                {
                    output = POLineItemDataArray.PackageNo;
                }
                else if (input === "PRLinkID")
                {
                    output = POLineItemDataArray.PRLinkID;
                }
                else if (input === "PackageNo")
                {
                    output = POLineItemDataArray.PackageNo;
                }
                else if (input === "LinkId")
                {
                    output = POLineItemDataArray.LinkId;
                }
                else if (input === "Currency")
                {
                    output = POLineItemDataArray.Currency;
                }
                else if (input === "Quantity")
                {
                    output = POLineItemDataArray.Quantity;
                }
                else if (input === "PRItemNumber")
                {
                    output = POLineItemDataArray.PRItemNumber;
                }
            }
        }
        console.log("output: " + output);
        return output;
    }
}
function getExchangeRate(toCurrency, fromCurrency) {
    var exchangeRate = "";
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getExchangeRate",
            "toCurrency": toCurrency,
            "fromCurrency": fromCurrency
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Exchange Rate :" + obj.ExchangeRate);
            exchangeRate = obj.ExchangeRate;
        }
    });
    return exchangeRate;
}

function findFromCurrency() {
    var companyCode = $("#companycodeHeader").val();
    console.log("companyCode in Exchange Rate: " + companyCode);
    var fromCurrency = "";
    if (companyCode === "0640" || companyCode === "0641")
    {
        fromCurrency = "SGD";
    }
    else if (companyCode === "0680")
    {
        fromCurrency = "MYR";
    }

    return fromCurrency;
}
function findExchangeRate(toCurrency, fromCurrency)
{
    var exchangeRate = "";
    $("#overlay").css("display", "block");
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "FindExchangeRateByFromCurrencyAndToCurrency",
            "fromCurrency": fromCurrency,
            "toCurrency": toCurrency
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Result in Exchange Rate: " + obj.Result);
            console.log("Exchange Rate: " + obj.ExchangeRate);
            $("#ExchangeRate").val(Number(obj.ExchangeRate).toFixed(2));
            exchangeRate = obj.ExchangeRate;
            $("#overlay").css("display", "none");
            var prLength = $("#material_headerClass tbody tr").length;
            if (prLength !== 0) {
                changeOnCurrency(exchangeRate, toCurrency);
                changeServiceAndConitionTabDataSavedInDB(Number(exchangeRate).toFixed(2), toCurrency);
            }
        }
    });
}
function changeOnCurrency(exchangeRate, toCurrency) {
    var PrType = $("#prType").val();
    if (PrType === "Service") {
        var totalNtePrice = 0;
        $("#serviceTableId tbody tr").each(function() {
            var grossPrice = removeCommaInNumber($(this).find("td").eq(6).children(".grossPrice_Services").val());
            var quantity = removeCommaInNumber($(this).find("td").eq(4).children(".quantity_Services").val());
            $(this).find("td").eq(6).children(".grossPrice_Services").val(formatAmountByComma((Number(grossPrice) * Number(exchangeRate)).toFixed(2)));
            $(this).find("td").eq(7).children(".currency_Services").val(toCurrency);
            var newGrossPrice = Number(grossPrice) * Number(exchangeRate).toFixed(2);
            var netprice = (Number(newGrossPrice) * Number(quantity)).toFixed(2);
            totalNtePrice = Number(totalNtePrice) + Number(netprice);
            $(this).find("td").eq(8).children(".netPrice_Services").val(formatAmountByComma(netprice));
        });
    }

    $("#material_headerClass tbody tr").each(function() {
        $(this).find("td").eq(0).children(".isPrSaved").val("No");
        $(this).find("td").eq(0).children(".timeOfChangeCurrency").val("after");
        var netValue = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
        var NetPrice = Number(netValue) * Number(exchangeRate);
        if (PrType === "Service") {
            $(this).find("td").eq(9).children(".prNetPrice").val(formatAmountByComma(Number(totalNtePrice).toFixed(2)));
        } else if (PrType === "Material") {
            $(this).find("td").eq(9).children(".prNetPrice").val(formatAmountByComma(Number(NetPrice).toFixed(2)));
        }
        $(this).find("td").eq(11).children(".currencyClass").val(toCurrency);

        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var currency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                var condType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                if (currency !== "%" && condType === "") {
                    $(this).find("td").eq(4).children(".CurrencyLineLevel").val(toCurrency);
                }
                $(this).find("td").eq(9).children(".Currency2LineLevel").val(toCurrency);
            });
            calculateConditionOnCurrncyChange(exchangeRate);
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var currency = $(this).find("td").eq(4).children(".CurrencyHeader").val();
        var conType = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
        if (currency !== "%" && conType === "") {
            $(this).find("td").eq(4).children(".CurrencyHeader").val(toCurrency);
        }
        $(this).find("td").eq(9).children(".Currency2Header").val(toCurrency);
    });
    calculateConditionOnCurrncyChangeAtHeader(exchangeRate);

    console.log("conditionLineLevelArray before currency change: " + JSON.stringify(conditionLineLevelArraySA));
    for (var p = 0; p < conditionLineLevelArraySA.length; p++) {
//        if (conditiontype === conditionLineLevelArraySA[p].Ctype && indexnumber === conditionLineLevelArraySA[p].indexnumber) {
        conditionLineLevelArraySA[p].amount = ((Number(conditionLineLevelArraySA[p].amount) * Number(exchangeRate)).toFixed(2)).toString();
        conditionLineLevelArraySA[p].per = ((Number(conditionLineLevelArraySA[p].per) * Number(exchangeRate)).toFixed(2)).toString();
        conditionLineLevelArraySA[p].oldAmountHidden = ((Number(conditionLineLevelArraySA[p].oldAmountHidden) * Number(exchangeRate)).toFixed(2)).toString();
        conditionLineLevelArraySA[p].oldPerHidden = ((Number(conditionLineLevelArraySA[p].oldPerHidden) * Number(exchangeRate)).toFixed(2)).toString();
        conditionLineLevelArraySA[p].conditionValue = ((Number(conditionLineLevelArraySA[p].conditionValue) * Number(exchangeRate)).toFixed(2)).toString();
        conditionLineLevelArraySA[p].prCurrency = toCurrency;
//        }
    }
    console.log("conditionLineLevelArray after currency change: " + JSON.stringify(conditionLineLevelArraySA));
}

function calculateConditionOnCurrncyChange(exchangeRate) {
    var conType = "";
    var condName = '';
    var netPrice = "";
    var Quantity = "";
    var perQuant = "";
    var fromCurrency = "";
    var grossCondVal = "";
    var PBXX_CondVal = "";
    var dropDownItemNumber = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            Quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
//            netPrice = $(this).find("td").eq(9).children(".prNetPrice").val();
            netPrice = $(this).find("td").eq(0).children(".prNetPriceHidden").val();
            perQuant = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
//            fromCurrency = $(this).find("td").eq(10).children(".currencyClass").val();
        }
    });
    var toCurrency = $("#CurrencyDeliveryInvoice").val();
    var TaxPer = calculateTaxCodeLineLevelInStandalone(toCurrency, netPrice);
    var amount = netPrice;
    var condValue = "";
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
            conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
        } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
            conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
        }
        if ($(this).find("td").eq(2).children("input").hasClass("nameConditionsLineLevel") === true) {
            condName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        } else if ($(this).find("td").eq(2).children("input").hasClass("NameConditionsLineLevel") === true) {
            condName = $(this).find("td").eq(2).children(".NameConditionsLineLevel").val();
        }

        var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
        if (conType === "PBXX") {
            grossCondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
//            PBXX_CondVal = grossCondVal;
        }

        if ($(this).find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
        } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountLineLevel").val());
        }
        if (conType !== "") {
            amount = Number(amount) * Number(exchangeRate);
        }
        var fml = formula(conType);
        if (conType === "" && condName !== "") {
            if ($(this).find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
                $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
            } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
                $(this).find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountLineLevel").val());
            }
        }

        var poQty = Quantity;
        var perQty = perQuant;
        var quant;
        var exp = new String(fml);
        condValue = eval(exp.toString());
        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
        if (conType === "PBXX") {
            PBXX_CondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
        }

    });
//    deleteRowFormConditionInStandAlone()();
}
function calculateConditionOnCurrncyChangeAtHeader(exchangeRate) {
    var amount = "";
    var conVal = '';
    var condName = "";
    var conType = "";
    var Quantity = "";
    var netPrice = "";
    var perQuant = "";
    var totalConditionValue = 0;
//    var totalQuantity = 0;
    var totalNetPrice = 0;
    var toalPerQuant = 0;
    var grossCondVal = "";
    var PBXX_CondVal = "";
    var prQuantity = "";
    var prnetPrice = "";
    var prperQuant = "";
    $("#material_headerClass tbody tr").each(function() {
        Quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
        netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
        perQuant = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
        Quantity = Number(Quantity) + Number(prQuantity);
        netPrice = Number(netPrice) + Number(prnetPrice);
        perQuant = Number(perQuant) + Number(prperQuant);
    });

    var toCurrency = $("#CurrencyDeliveryInvoice").val();
    var TaxPer = calculateTaxCodeInStandalone(toCurrency, netPrice);
    var condValue = "";
    $("#conditionTableId tbody tr").each(function(i) {
        conType = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
        condName = $(this).find("td").eq(2).children('.nameConditionsHeader').val();
//        var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
        if (conType === "PBXX") {
            grossCondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
        }

        if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
        } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountHeader").val());
        }
        if (conType !== "") {
            amount = Number(amount) * Number(exchangeRate);
        }
        if (conType !== "") {
            var fml = formula(conType);

            var poQty = Quantity;
            var perQty = perQuant;
            var quant;
            var exp = new String(fml);
            condValue = eval(exp.toString());
            console.log("Condition value On currency change " + i + ":" + condValue);
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma((Number(condValue) * Number(exchangeRate)).toFixed(2)));
        }
        if (conType === "PBXX") {
            PBXX_CondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
        }
        if (conType === "" && condName !== "") {
            if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
            } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                $(this).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
            }
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(conVal).toFixed(2)));
        }
    });

    deleteRowFormConditionHeaderInStandAlone();
    $("#conditionTableId tbody tr").each(function(i) {
        conType = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
        condName = $(this).find("td").eq(2).children('.nameConditionsHeader').val();
        if (conType === "" && condName !== "") {
            if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
                $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
            } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountHeader").val());
                $(this).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
            }
        }
    });
}
function changeServiceAndConitionTabDataSavedInDB(exchangeRate, toCurrency) {
    var PrType = $("#prType").val();
    if (PrType === "Service") {
        var linkIdArray = [];
        var LinkID = "";
        $("#material_headerClass tbody tr").each(function() {
            LinkID = $(this).find("td").eq(0).children(".linkid").val();
            linkIdArray.push(LinkID);
        });
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "changeServiceAndConitionTabDataSavedInDBInStandAlonePO",
                "linkidArrayAsString": linkIdArray.toString(),
                "currency": toCurrency,
                "exchangeRate": exchangeRate
            }
        });
    }
}
var taxCodeTable = null;
function getTaxCode(regNo, companyCode) {
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do", async: false,
        data: {
            "reqFrom": "getAllTaxCode"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj lengtth :" + obj.length);
            var row = "";
            var elserow = "";
            var codeDesc;
            //            $("#TaxCodeTableId tbody tr").remove();
            if (companyCode === "0641") {
                if (regNo === "") {
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].CODE !== "P7") {
                            if (obj[i].CODE === "PN" || obj[i].CODE === "N0") {
                                row += "<tr>"
                                        + "<td><input type='checkbox' name='checkTaxCodeTable' class='checkTaxCodeTableClass'></td>"
                                        + "<td>" + obj[i].CODE + "</td>"
                                        + "<td>" + obj[i].CODEDESC + "</td>"
                                        + "</tr>";
                            } else if (obj[i].CODE !== "PN" && obj[i].CODE !== "N0") {
                                elserow += "<tr>"
                                        + "<td><input type='checkbox' name='checkTaxCodeTable' class='checkTaxCodeTableClass'></td>"
                                        + "<td>" + obj[i].CODE + "</td>"
                                        + "<td>" + obj[i].CODEDESC + "</td>"
                                        + "</tr>";
                            }
                        }
                    }
                } else if (regNo !== "") {
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].CODE === "P7") {
                            row += "<tr>"
                                    + "<td><input type='checkbox' name='checkTaxCodeTable' class='checkTaxCodeTableClass'></td>"
                                    + "<td>" + obj[i].CODE + "</td>"
                                    + "<td>" + obj[i].CODEDESC + "</td>"
                                    + "</tr>";
                        }
                    }
                }
            } else if (companyCode !== "0641") {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].CODE === "P7" || obj[i].CODE === "PN" || obj[i].CODE === "N0") {
                        row += "<tr>"
                                + "<td><input type='checkbox' name='checkTaxCodeTable' class='checkTaxCodeTableClass'></td>"
                                + "<td>" + obj[i].CODE + "</td>"
                                + "<td>" + obj[i].CODEDESC + "</td>"
                                + "</tr>";
                    } else if (obj[i].CODE !== "P7" && obj[i].CODE !== "PN" && obj[i].CODE !== "N0") {
                        elserow += "<tr>"
                                + "<td><input type='checkbox' name='checkTaxCodeTable' class='checkTaxCodeTableClass'></td>"
                                + "<td>" + obj[i].CODE + "</td>"
                                + "<td>" + obj[i].CODEDESC + "</td>"
                                + "</tr>";
                    }
                }
            }
            row = row + elserow;
            $("#TaxCodeTableId tbody").append(row);
            $("#TaxCodeModal").modal("show");
//            $("#overlay").css("display", "block");
            if ($.fn.DataTable.isDataTable('#TaxCodeTableId')) {
                taxCodeTable.destroy();
                taxCodeTable = null;
                $("#TaxCodeTableId").children('tbody').html(row);
                taxCodeTable = $('table.TaxCodeTableClass').DataTable({
                    //                "scrollY": 200,
                    //            "scrollX": true,
                    lengthChange: false,
                    orderCellsTop: true
                });
                taxCodeTable.buttons().container()
                        .appendTo('#TaxCodeTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#TaxCodeTableId thead tr').clone(true).appendTo('#TaxCodeTableId thead');
                $('#TaxCodeTableId thead tr:eq(1) th').each(function(i) {
                    $('#TaxCodeTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (taxCodeTable.column(i).search() !== this.value) {
                            taxCodeTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                taxCodeTable = $('table.TaxCodeTableClass').DataTable({
                    //                "scrollY": 200,
                    //            "scrollX": true,
                    lengthChange: false,
                    orderCellsTop: true
                });
                taxCodeTable.buttons().container()
                        .appendTo('#TaxCodeTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
function findMasterMaterialMARAByMatCodeInStandalone(materialCode)
{
    console.log("In findMasterMaterialMARAByMatCode====");
    var masterMaterialMARADetailsObj = {};
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do", async: false,
        data: {
            "reqFrom": "findMasterMaterialMARAByMatCode",
            "materialCode": materialCode
        },
        beforeSend: function() {
            $("#overlay").css("display", "block");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result: " + obj.Result);
            console.log("obj.MFRPN: " + obj.MFRPN);
            console.log("obj.MFRNR: " + obj.MFRNR);

            masterMaterialMARADetailsObj["Result"] = obj.Result;
            masterMaterialMARADetailsObj["MFRPN"] = obj.MFRPN;
            masterMaterialMARADetailsObj["MFRNR"] = obj.MFRNR;
        }
    });
    return masterMaterialMARADetailsObj;
}

function popValueInComponentTale() {
    var prType = $("#prType").val();
    var matcode = "";
    var desc = "";
    var plantcode = "";
    var uom = "";
    var stLoc = "";
    var itemnumber = "";
    var accAsgn = "";
    var code = "";
    var deliveryDate = "";
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            code = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            matcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            desc = $(this).find("td").eq(6).children(".prShortText").val();
            plantcode = $(this).find("td").eq(16).children(".plantClass").val();
            uom = $(this).find("td").eq(7).children(".prUom").val();
            stLoc = $(this).find("td").eq(20).children(".storageLocationClass").val();
            itemnumber = $(this).find("td").eq(1).text();
            deliveryDate = $(this).find("td").eq(15).children(".deliveryDateClass").val();
        }
    });
    if (prType === "Material") {
        if (accAsgn === "" && code === "L") {
            $("#componentTableIdLineLevel tbody tr").each(function() {
                $(this).find("td").eq(0).children(".comMaterial").val(matcode);
                $(this).find("td").eq(1).children(".comDescription").val(desc);
                $(this).find("td").eq(2).children(".comPlant").val(plantcode);
                $(this).find("td").eq(3).children(".comUnit").val(uom);
                $(this).find("td").eq(5).children(".comProdStorageLoc").val(stLoc);
                $(this).find("td").eq(11).children(".itemNumber").val(itemnumber);
                $(this).find("td").eq(7).children(".comRequirementDate").val(deliveryDate);
                $(this).find("td").eq(9).children(".latReqDate").val(deliveryDate);
            });
        }
    }
}

function getMaterialMasterOnLoadInStandalone(matCode, CompCode) {
    var jsonArr = "";
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getMasterMaterialGeneralByCoCodeAndMaterialCode",
            "companyCode": CompCode,
            "matCode": matCode
        },
        complete: function(responseJson) {
            jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
        }
    });
    return jsonArr;
}

function populateValueInQuantityWeightsTab(jsonArr) {

    // Fetch info record details
    console.log("In populateValueInQuantityWeightsTab:");
    console.log("jsonArr[0].materialCode: " + jsonArr[0].materialCode);
    var infoRecordJsonObj = fetchInfoRecordDetails(jsonArr[0].materialCode, "PR");
    console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));

    var conversionFrom = "";
    var conversionTo = "";
    if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
        if (infoRecordJsonObj.CONV_NUM1 !== "") {
            conversionFrom = infoRecordJsonObj.CONV_NUM1;
        } else {
            conversionFrom = jsonArr[0].conversionFrom;
        }
        if (infoRecordJsonObj.CONV_DEN1 !== "") {
            conversionTo = infoRecordJsonObj.CONV_DEN1;
        } else {
            conversionTo = jsonArr[0].conversionTo;
        }
    } else {
        conversionFrom = jsonArr[0].conversionFrom;
        conversionTo = jsonArr[0].conversionTo;
    }

    console.log("conversionFrom: " + conversionFrom);
    console.log("conversionTo: " + conversionTo);

    var prQuantity = 0;
    var prPerUnit = 0;
    var orderunit = jsonArr[0].orderUnit;
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            prQuantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
            prPerUnit = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
        }
    });

    if (orderunit === "" || orderunit === undefined) {
        orderunit = jsonArr[0].baseUOM;
        if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
            if (infoRecordJsonObj.BASE_UOM !== "") {
                orderunit = infoRecordJsonObj.BASE_UOM;
            }
        }
    }
    $("#pOUnit").val(orderunit);
    $("#orderUnit").val(formatAmountByComma(Number(prPerUnit).toFixed(2)));
    $("#orderPriceUnit").val(formatAmountByComma(Number(prPerUnit).toFixed(2)));

    $("#unitOrderUnit").val(orderunit);
    if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
        if (infoRecordJsonObj.ORDERPR_UN !== "" && infoRecordJsonObj.ORDERPR_UN !== undefined) {
            $("#unitOrderPriceUnit").val(infoRecordJsonObj.ORDERPR_UN);
        } else {
            $("#unitOrderPriceUnit").val(orderunit);
        }
    } else {
        $("#unitOrderPriceUnit").val(orderunit);
    }
    $("#unitOrderUnit2").val(orderunit);

    $("#orderUnit2").val(formatAmountByComma(Number(conversionTo).toFixed(2)));
    $("#sKUUnit").val(formatAmountByComma(Number(conversionFrom).toFixed(2)));

    if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
        if (infoRecordJsonObj.BASE_UOM !== "") {
            $("#pOUnitSKU").val(infoRecordJsonObj.BASE_UOM);
            $("#unitSKUUnit").val(infoRecordJsonObj.BASE_UOM);
        } else {
            $("#pOUnitSKU").val(jsonArr[0].baseUOM);
            $("#unitSKUUnit").val(jsonArr[0].baseUOM);
        }
    } else {
        $("#pOUnitSKU").val(jsonArr[0].baseUOM);
        $("#unitSKUUnit").val(jsonArr[0].baseUOM);
    }

//    $("#netWeight").val(Number(jsonArr[0].conversionFrom).toFixed(2));
//    $("#grossWeight").val(Number(jsonArr[0].conversionFrom).toFixed(2));
//    $("#netWeightOrderUnit").val(orderunit);
//    $("#grossWeightOrderUnit").val(orderunit);
//    $("#volumeOrderUnit").val(orderunit);
//    $("#pointsOrderUnit").val(orderunit);
//    $("#netWeightUnit").val(jsonArr[0].baseUOM);
//    $("#grossWeightUnit").val(jsonArr[0].baseUOM);

//    $("#netWeight2").val(Number(prQuantity).toFixed(2));
//    $("#grossWeight2").val(Number(prQuantity).toFixed(2));
//    $("#volume2").val("0.00");
//    $("#points2").val("0.00");

//    $("#netWeightUnit2").val(jsonArr[0].baseUOM);
//    $("#grossWeightUnit2").val(jsonArr[0].baseUOM);

//    $("#netWeightPerUnit").val(Number(prPerUnit).toFixed(2));
//    $("#grossWeightPerUnit").val(Number(prPerUnit).toFixed(2));
//    $("#volumePerUnit").val(Number(prPerUnit).toFixed(2));
//    $("#pointsPerUnit").val(Number(prPerUnit).toFixed(2));
}

function updateOrderPriceUnitInQtyAndWtTabOfPoLineInSA(linkId, newOpu)
{
    console.log("linkId: " + linkId);
    console.log("newOpu: " + newOpu);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "updateOrderPriceUnitInQtyAndWtTabOfPoLine",
            "linkId": linkId,
            "newOpu": newOpu
        },
        beforeSend: function() {
            $("#overlay").css("display", "block");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result: " + obj.Result);
        }
    });
}

function ifServiceIsEmpty(currency) {
    var prType = $("#prType").val();
    if (prType === "Service") {
        $("#serviceTableId tbody tr").remove();
        var row = "<tr><td>"
                + '<input type="checkbox" class=" checkboxServices" id="" name="">\n\
                    <input type=hidden class=ServiceAccAssDist>\n\
                    <input type="hidden" class=serviceId>\n\
                    <input type="hidden" class="isProfitabilitySegmentDataSaved" value="No">\n\
                <input type="hidden" class="saveSarviceAccountAssignment" value="No">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded lineItemNumberServices tableInputField" disabled="true" int_lastlineitem value=' + 10 + '>' + "</td><td>"
                + '<input type="text" class="form-control form-rounded ServicesNumber_Services tableInputField" id="" name="" style="width: 100px;">' + "</td><td style='text-align: center'>"
                + '<input type="hidden" class="form-control form-rounded shortText_Services tableInputField" style="width: 150px;display: inline-block;" id="" name="" readonly value="Short text...">' + " <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td><td>"
                + '<input type="text" class="form-control form-rounded check-negative-value quantity_Services tableInputField" style="width:150px;" min="0" id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded servicesUnit_Services tableInputField" id="" style="width:70px;" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded check-negative-value grossPrice_Services tableInputField" style="width:150px;" min="0" id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded currency_Services tableInputField" id="" name="" value=' + currency + ' style="width: 55px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded netPrice_Services tableInputField" style="width:150px;" disabled id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded edition_Services tableInputField" id="" style="width:100px;" name="">' + "</td><td style='text-align: center'>"
                + '<input type="hidden" class="form-control form-rounded lineItemLongText_Services tableInputField" style="width: 150px;display: inline-block;" id="" name="" value="Line item long text..." readonly>' + " <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td><td>"
                + '<input type="text" class="form-control form-rounded overfTolerance_Services tableInputField" id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded serviceNetValue tableInputField" style="width:150px;" disabled value="">' + "</td><td>"
                + '<input type="number" class="form-control form-rounded serviceActualQty tableInputField" disabled value="">' + "</td><td style='text-align: center'>"
                + '<input type="hidden" class="form-control form-rounded serviceText tableInputField" style="width: 150px;display: inline-block;" value="Service text..." readonly>' + " <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td><td>"
                + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteServiceTebleRow" aria-hidden="true" style="width:10px;"></i>' + "</td></tr>";

        $("#serviceTableId").children("tbody").append(row);
    }
}
function taxFromTaxCodeInStandalone() {
    var taxCode = $("#TaxCode").val();
    var companycode = $("#companycodeHeader").val();
    var toCurrency = "";
    var amount = 0;
    var dropDownItemNumber = $("#ItemNumberSelect").val();

    $("#material_headerClass tbody tr").each(function() {
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            toCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
            amount = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
        }
    });
    var dmsip = $("#dmsip").val();
    var serviceUrl = dmsip + "/PR2POWebservice/ng/sapservice/POTaxCalc";
    console.log("serviceUrl: " + serviceUrl);
    var TaxPer = "";

    //    TaxPer = getTaxResponseInStandalone("");  //Localhost 

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);
    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
    console.log("serviceUrl: " + serviceUrl);

    $.ajax({
        type: "POST",
        url: serviceUrl,
        contentType: "application/xml",
        dataType: "xml",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log("Response: " + data);
            TaxPer = getTaxResponseInStandalone(data);
            console.log("TaxPer: " + TaxPer);
//                        $("#overlay").css("display", "none");
        }
    });

    return TaxPer;
}
function updateConditionTableOnOPUChangeInSA(opu) {

    var conType = "";
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
            conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
        } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
            conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
        }
        if (conType === "PBXX") {
            $(this).find("td").eq(7).children(".UoMLineLevel").val(opu);
            $(this).find("td").eq(16).children(".uOMExtraLineLevel").val(opu);
        }
        if (conType === "") {
            $(this).find("td").eq(7).children(".UoMLineLevel").val(opu);
            $(this).find("td").eq(16).children(".uOMExtraLineLevel").val(opu);
        }
    });
}
var currencyTbl = "";
function getAllCurrencyInStandalone() {

    $.ajax({
        type: "GET",
        url: "doajaxrequest.do", async: false,
        data: {
            "reqFrom": "getAllCurrency"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj lengtth :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr class='CurrencyMasterTrClass'>"
                        + "<td>" + obj[i].CURRENCY_CODE + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#CurrencyMasterTable tbody").append(row);
            if ($.fn.DataTable.isDataTable('#CurrencyMasterTable')) {
                currencyTbl.destroy();
                currencyTbl = null;
                $("#CurrencyMasterTable").children('tbody').html(row);
                currencyTbl = $('table.CurrencyMasterTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                currencyTbl.buttons().container()
                        .appendTo('#CurrencyMasterTable_wrapper .col-md-6:eq(0)');
            } else {
                $('#CurrencyMasterTable thead tr').clone(true).appendTo('#CurrencyMasterTable thead');
                $('#CurrencyMasterTable thead tr:eq(1) th').each(function(i) {
                    $('#CurrencyMasterTable thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (currencyTbl.column(i).search() !== this.value) {
                            currencyTbl
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                currencyTbl = $('table.CurrencyMasterTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                currencyTbl.buttons().container()
                        .appendTo('#CurrencyMasterTable_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
function ifHeaderCurrencyNotChangeInStandalone() {
    var conType = "";
    var netPrice = "";
    var Quantity = "";
    var perQuant = "";
    var dropDownItemNumber = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            Quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
            netPrice = $(this).find("td").eq(0).children(".prNetPriceHidden").val();
//            netPrice = $(this).find("td").eq(9).children(".prNetPrice").val();
            perQuant = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
        }
    });
//    alert("Quantity :" + Quantity + " ,netPrice :" + netPrice + " ,perQuant :" + perQuant);
    if (Quantity !== "" && netPrice !== "" && perQuant !== "") {
        var amount = netPrice;
        var condValue = "";
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            conType = $(this).find("td").eq(1).children('.ConditionTypeLineLevel').val();
            if (conType === "PBXX") {
                var fml = formulaInStandAlone(conType);
                var poQty = Quantity;
                var perQty = perQuant;
                var quant;
                var exp = new String(fml);
                condValue = eval(exp.toString());
                $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(amount).toFixed(2)));
                $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(perQuant).toFixed(2)));
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
                var oldAmount = $(this).find("td").eq(3).children(".AmountLineLevelHidden").val();
                var oldPercentage = $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
                console.log("amount :" + amount);
                console.log("conType :" + conType);
                console.log("perQty :" + perQty);
                console.log("oldAmount :" + oldAmount);
                console.log("oldPercentage :" + oldPercentage);
//                calculateConditionValueInStandAlone(amount, conType, perQty, poQty, oldAmount, oldPercentage);
                deleteRowFormConditionInStandAlone("netprice");
                $(this).find("td").eq(3).children(".AmountLineLevelHidden").val(Number(amount).toFixed(2));
                $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val(Number(perQuant).toFixed(2));
//                alert($(this).find("td").eq(3).children(".AmountLineLevelHidden").val());
            }
        });
    }
}
function calculateTaxCodeInStandalone(toCurrency, amount) {
    var companycode = $("#companycodeHeader").val();
    var taxCode = $("#TaxCode").val();                              //Need to Change
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);
    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
    console.log("serviceUrl: " + serviceUrl);
    var TaxPer = "";
//     TaxPer = getTaxResponseInStandalone("");
    $.ajax({
        type: "POST",
        url: serviceUrl,
        contentType: "application/xml",
        dataType: "xml",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log("Response: " + data);
            TaxPer = getTaxResponseInStandalone(data);
            console.log("TaxPer: " + TaxPer);
//                        $("#overlay").css("display", "none");
        }
    });

    return TaxPer;
}
function calculateTaxCodeLineLevelInStandalone(toCurrency, amount) {
    var companycode = $("#companycodeHeader").val();
    var taxCode = $("#TaxCode").val();
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);
    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
    console.log("serviceUrl: " + serviceUrl);
    var TaxPer = "";
//     TaxPer = getTaxResponseInStandalone("");
    $.ajax({
        type: "POST",
        url: serviceUrl,
        contentType: "application/xml",
        dataType: "xml",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log("Response: " + data);
            TaxPer = getTaxResponseInStandalone(data);
            console.log("TaxPer: " + TaxPer);
//                        $("#overlay").css("display", "none");
        }
    });
    return TaxPer;
}

function findApproverDetails()
{
    console.log("In findApproverDetails");

    var areTaxCodePresent = true;
    var departmentCode = "";
    $("#material_headerClass tbody tr").each(function(index) {
        if (index === 0) {
            departmentCode = $(this).find("td").eq(29).children(".trackingNumber").val();
        }
        var TexCodeForLineInPr = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
        if (TexCodeForLineInPr === "")
        {
            areTaxCodePresent = false;
            return;
        }
    });
    console.log("departmentCode: " + departmentCode);
    console.log("areTaxCodePresent: " + areTaxCodePresent);
    if (areTaxCodePresent === true)
    {
        var docType = findDocType();
        console.log("docType: " + docType);

        var limit = findSumOfAllPoItem();
        console.log("limit: " + limit);

        var coCode = $("#companycodeHeader").val();
        console.log("coCode: " + coCode);

        // http://localhost:8080/BuyerPortalWebServices/findApproverDetails.do?companyCode=0640&documentTypeField=GPR,SCO&limitFrom=0.00000&limitTo=10000.00000&departmentCode=0001

        $.ajax({
            type: "GET",
            url: "createAmendDeletePoGetAjaxRequest.do",
            async: false,
            data: {
                "reqFrom": "findApproverDetails",
                "companyCode": coCode,
                "documentTypeField": docType,
                "limitFrom": limit,
                "limitTo": limit,
                "departmentCode": departmentCode
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var obj = $.parseJSON(responseJson.responseText);
                console.log("obj.Result :" + obj.Result);

                console.log("obj.ReleaseStrategyArr.length: " + obj.ReleaseStrategyArr.length);
                if (obj.ReleaseStrategyArr.length > 0)
                {
                    $("#releaseStrategy").val(obj.ReleaseStrategyArr[0].releaseStrategy);
                    $("#releaseStrategyDesc").text(obj.ReleaseStrategyArr[0].releaseStrategyDesc);
                }

                if (obj.Result === "Found")
                {
                    $("#approvalDetailsTable tbody tr").remove();
                    var row = "";
                    for (var i = 0; i < obj.ApproverDetailsArr.length; i++)
                    {
                        console.log("obj.ApproverDetailsArr[i].Username: " + obj.ApproverDetailsArr[i].Username);
                        console.log("obj.ApproverDetailsArr[i].RelationCode: " + obj.ApproverDetailsArr[i].RelationCode);
                        row += "<tr><td>" + obj.ApproverDetailsArr[i].RelationCode + "</td><td>" + obj.ApproverDetailsArr[i].Username + "</td></tr>";
                    }
                    $("#approvalDetailsTable tbody").append(row);
                }
            }
        });
    }
}

function findDocType()
{
    var poType = $("#typeOfPOHeader").val();
    console.log("poType: " + poType);
    var docType = "";
    if (poType !== "")
    {
        switch (poType)
        {
            case "Import PO for Goods":
                docType = "IPO";
                break;
            case "Joint Pur. For Goods":
                docType = "JIPO";
                break;
            case "Local PO for Goods":
                docType = "LPO";
                break;
            case "PO for Group Trade":
                docType = "PST2";
                break;
            case "Sub Contracting PO":
                docType = "SCO";
                break;
            case "PO for Services":
                docType = "SPO";
                break;
            case "Release order for Serv":
                docType = "SRO";
                break;
            case "Stock Transp. Order":
                docType = "ZSTO";
                break;
            case "Ferrous PO - Import":
                docType = "FFEP";
                break;
            case "Ferrous PO - Local":
                docType = "LFEP";
                break;
            case "Non-Ferrous PO - Loc":
                docType = "LNFP";
                break;
            case "Release Order for Goods":
                docType = "GRO";
                break;
            case "Inter Company":
                docType = "ICPO";
                break;
            case "PO for Associate Trade":
                docType = "PST3";
                break;
            case "PO for 3rd Party Trade":
                docType = "PST4";
                break;
            default:
                docType = "";
        }
    }
    console.log("docType: " + docType);
    return docType;
}

function findSumOfAllPoItem()
{
    var prTaxAmount = 0;
    $("#material_headerClass tbody tr").each(function() {
        var pr_quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
        var pr_netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
        var pr_currency = $(this).find("td").eq(11).children(".currencyClass").val();
        var taxCode = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
        console.log("taxCode: " + taxCode);

        prTaxAmount = prTaxAmount + prTaxAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode);
    });
    return prTaxAmount;
}

function getNGBPCmplxPOCreationLineItemConditionsByLinkId(jsonCondArr) {
    var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
    console.log("getNGBPCmplxPOCreationLineItemConditionsByLinkId :" + jsonCondArr.length);
    var conType;
    var conName;
    var changeid;
    $("#conditionTableId tbody tr").remove();
    var length = $("#conditionTableId tbody tr").length;
    if (length === 0) {
        if (jsonCondArr[0].addedFrom !== "headerlevel") {
            var tdrow = "<tr>"
                    + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                    <input type='hidden' class='conditionVendorHeader' value='" + vendorcode + "'>\n\
                    <input type='hidden' class='lineAddedFromHeader' value='" + jsonCondArr[0].addedFrom + "'>\n\
                    <input type='hidden' class='conditionindex' value=''></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' style='width:100px;' value='" + jsonCondArr[0].condType + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' style='width:200px;' value='" + jsonCondArr[0].condName + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' disabled style='width:150px;' value = '" + formatAmountByComma(Number(jsonCondArr[0].amount).toFixed(2)) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' style='width:100px;' value='" + jsonCondArr[0].currency + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width:150px;' disabled value='" + formatAmountByComma(Number(jsonCondArr[0].perQuantity).toFixed(2)) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + jsonCondArr[0].condPricUnit + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' style='width:100px;' value='" + jsonCondArr[0].uoM + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled value='" + formatAmountByComma(Number(jsonCondArr[0].condVal).toFixed(2)) + "' style='width: 150px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' style='width:100px;' value='" + jsonCondArr[0].currency1 + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + jsonCondArr[0].CondVal1 + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + jsonCondArr[0].kappl + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + jsonCondArr[0].kvsl1 + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + jsonCondArr[0].kvsl2 + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + jsonCondArr[0].conditionCount + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + jsonCondArr[0].stNumber + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + jsonCondArr[0].changeId + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (jsonCondArr[0].vendorName === undefined ? "" : jsonCondArr[0].vendorName) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (jsonCondArr[0].vendorCode === undefined ? "" : jsonCondArr[0].vendorCode) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (jsonCondArr[0].condPriceDate === undefined ? "" : jsonCondArr[0].condPriceDate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (jsonCondArr[0].condCurncyExchangeRate === undefined ? "" : jsonCondArr[0].condCurncyExchangeRate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (jsonCondArr[0].poCurrencyExchangeRate === undefined ? "" : jsonCondArr[0].poCurrencyExchangeRate) + "'></td>"
//                    + "<td><input type='text' class='form-control form-rounded statusHeader tableInputField' name='statusHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded numeratorHeader tableInputField' name='numeratorHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded baseUoMHeader tableInputField' name='baseUoMHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded denoForConvHeader tableInputField' name='denoForConvHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded uOMExtraHeader tableInputField' name='uOMExtraHeader' style='width:100px;' disabled></td>"
                    + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;display:none'></i></td>"
                    + "</tr>";
            $("#conditionTableId tbody").append(tdrow);
        }
    }
    var flag = false;
    for (var i = 1; i < jsonCondArr.length; i++) {
        if (jsonCondArr[i].addedFrom !== "headerlevel") {
            var rows = $("#conditionTableId tbody tr");
            for (var j = 0; j < rows.length; j++) {
                conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
                conName = $(rows[j]).find("td").eq(2).children(".nameConditionsHeader").val();
                changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
                if (((jsonCondArr[i].condType === "") ? (jsonCondArr[i].condName === conName) : (jsonCondArr[i].condType === conType)) && (changeid === jsonCondArr[i].changeId)) {
                    var amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountHeader").val());
                    var per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val());
                    var condVal = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val());
                    console.log("Total Amount :" + Number(Number(jsonCondArr[i].perQuantity) + Number(per)).toFixed(2));
                    console.log("Total Per :" + Number(Number(jsonCondArr[i].perQuantity) + Number(per)).toFixed(2));
                    console.log("Total Condition Value :" + Number(Number(jsonCondArr[i].condVal) + Number(condVal)).toFixed(2));
                    $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].amount) + Number(amount)).toFixed(2)));
                    $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].perQuantity) + Number(per)).toFixed(2)));
                    $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].condVal) + Number(condVal)).toFixed(2)));
                    $(rows[j]).find("td").eq(3).children(".AmountHeader").attr("value", formatAmountByComma(Number(Number(jsonCondArr[i].amount) + Number(amount)).toFixed(2)));
                    $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").attr("value", formatAmountByComma(Number(Number(jsonCondArr[i].perQuantity) + Number(per)).toFixed(2)));
                    $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").attr("value", formatAmountByComma(Number(Number(jsonCondArr[i].condVal) + Number(condVal)).toFixed(2)));
//                    $(this).find('td').eq(9).children(".pr-net-price").attr("value", Number(totalNetPrice));
                    flag = true;
                    break;
                } else {
                    flag = false;
                }
            }
            if (flag === false) {
                var tdrow = "<tr>"
                        + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                        <input type='hidden' class='conditionVendorHeader' value='" + vendorcode + "'>\n\
                        <input type='hidden' class='lineAddedFromHeader' value='" + jsonCondArr[i].addedFrom + "'>\n\
                        <input type='hidden' class='conditionindex' value=''></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + jsonCondArr[i].condType + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + jsonCondArr[i].condName + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' disabled value = '" + formatAmountByComma(Number(jsonCondArr[i].amount).toFixed(2)) + "' style='width: 150px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + jsonCondArr[i].currency + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' disabled value='" + formatAmountByComma(Number(jsonCondArr[i].perQuantity).toFixed(2)) + "' style='width: 150px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + jsonCondArr[i].condPricUnit + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + jsonCondArr[i].uoM + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled value='" + formatAmountByComma(Number(jsonCondArr[i].condVal).toFixed(2)) + "' style='width: 150px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + jsonCondArr[i].currency1 + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + jsonCondArr[i].kappl + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + jsonCondArr[i].kvsl1 + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + jsonCondArr[i].kvsl2 + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + jsonCondArr[i].conditionCount + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + jsonCondArr[i].stNumber + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + jsonCondArr[i].changeId + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (jsonCondArr[i].vendorName === undefined ? "" : jsonCondArr[i].vendorName) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (jsonCondArr[i].vendorCode === undefined ? "" : jsonCondArr[i].vendorCode) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (jsonCondArr[i].condPriceDate === undefined ? "" : jsonCondArr[i].condPriceDate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (jsonCondArr[i].condCurncyExchangeRate === undefined ? "" : jsonCondArr[i].condCurncyExchangeRate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (jsonCondArr[i].poCurrencyExchangeRate === undefined ? "" : jsonCondArr[i].poCurrencyExchangeRate) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded statusHeader tableInputField' name='statusHeader' disabled></td>"
//                        + "<td><input type='text' class='form-control form-rounded numeratorHeader tableInputField' name='numeratorHeader' disabled></td>"
//                        + "<td><input type='text' class='form-control form-rounded baseUoMHeader tableInputField' name='baseUoMHeader' disabled></td>"
//                        + "<td><input type='text' class='form-control form-rounded denoForConvHeader tableInputField' name='denoForConvHeader' disabled></td>"
//                        + "<td><input type='text' class='form-control form-rounded uOMExtraHeader tableInputField' name='uOMExtraHeader' disabled></td>"
                        + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;display:none'></i></td>"
                        + "</tr>";
                $("#conditionTableId tbody").append(tdrow);
            }
        }
    }

    if (conditionLineLevelArraySA.length !== 0) {
        var fflag = false;
        var amount = "";
        var per = "";

        for (var i = 0; i < conditionLineLevelArraySA.length; i++) {
            var rows = $("#conditionTableId tbody tr");
            for (var j = 0; j < rows.length; j++) {
                conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
                conName = $(rows[j]).find("td").eq(2).children(".nameConditionsHeader").val();
                changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
                var itemindex = $(rows[j]).find("td").eq(0).children(".conditionindex").val();
                console.log("Ctype ####:" + conditionLineLevelArraySA[i].Ctype + " ,conType :" + conType + " ,Cname :" + conditionLineLevelArraySA[i].Cname +
                        " ,conName :" + conName + " ,changeid :" + changeid + " ,CHANGEID :" + conditionLineLevelArraySA[i].CHANGEID);
//                if (((conditionLineLevelArray[i].Ctype === "") ? (conditionLineLevelArray[i].Cname === conName) && (changeid === 'I') && (itemindex === conditionLineLevelArray[i].indexnumber) : (conditionLineLevelArray[i].Ctype === conType)) && (changeid === 'I') && (itemindex === conditionLineLevelArray[i].indexnumber)) {
                if ((conditionLineLevelArraySA[i].Ctype === conType) && (changeid === 'I') && (itemindex === conditionLineLevelArraySA[i].indexnumber)) {
                    var amount = "";
                    var per = "";
                    if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                        amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountHeader").val());
                    } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                        amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".newAmountHeader").val());
                    }
                    if ($(rows[j]).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                        per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val());
                    } else if ($(rows[j]).find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                        per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".newPerQuantityHeader").val());
                    }
                    var condVal = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val());
                    console.log("Total Amount :" + Number(Number(conditionLineLevelArraySA[i].per) + Number(per)).toFixed(2));
                    console.log("Total Per :" + Number(Number(conditionLineLevelArraySA[i].per) + Number(per)).toFixed(2));
                    console.log("Total Condition Value :" + Number(Number(conditionLineLevelArraySA[i].conditionValue) + Number(condVal)).toFixed(2));

                    if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                        $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArraySA[i].amount) + Number(amount)).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                        $(rows[j]).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArraySA[i].amount) + Number(amount)).toFixed(2)));
                    }
                    if ($(rows[j]).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                        $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArraySA[i].per) + Number(per)).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                        $(rows[j]).find("td").eq(5).children(".newPerQuantityHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArraySA[i].per) + Number(per)).toFixed(2)));
                    }
                    $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArraySA[i].conditionValue) + Number(condVal)).toFixed(2)));
                    fflag = true;
                    break;
                } else {
                    fflag = false;
                }
            }

            if (fflag === false) {
//                alert("i :" + i);
                var tdrow = "<tr>"
                        + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                        <input type='hidden' class='conditionVendorHeader' value='" + (conditionLineLevelArraySA[i].vendorcode === undefined ? "" : conditionLineLevelArraySA[i].vendorcode) + "'>\n\
                        <input type='hidden' class='lineAddedFromHeader' value='" + (conditionLineLevelArraySA[i].addedFrom === undefined ? "" : conditionLineLevelArraySA[i].addedFrom) + "'>\n\
                        <input type='hidden' class='conditionindex' value='" + conditionLineLevelArraySA[i].indexnumber + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (conditionLineLevelArraySA[i].Ctype === undefined ? "" : conditionLineLevelArraySA[i].Ctype) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (conditionLineLevelArraySA[i].Cname === undefined ? "" : conditionLineLevelArraySA[i].Cname) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded newAmountHeader tableInputField' name='AmountHeader' disabled value = '" + (conditionLineLevelArraySA[i].amount === undefined ? "" : formatAmountByComma(Number(conditionLineLevelArraySA[i].amount).toFixed(2))) + "' style='width: 150px;'>\n\
                        <input type='hidden' class='newAmountHeaderHidden' value = '" + (conditionLineLevelArraySA[i].amount === undefined ? "" : Number(conditionLineLevelArraySA[i].amount).toFixed(2)) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (conditionLineLevelArraySA[i].prCurrency === undefined ? "" : conditionLineLevelArraySA[i].prCurrency) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded newPerQuantityHeader tableInputField' name='PerQuantityHeader' value='" + (conditionLineLevelArraySA[i].per === undefined ? "" : formatAmountByComma(Number(conditionLineLevelArraySA[i].per).toFixed(2))) + "' style='width: 150px;'>\n\
                        <input type='hidden' class='newPerQuantityHeaderHidden' value='" + (conditionLineLevelArraySA[i].per === undefined ? "" : Number(conditionLineLevelArraySA[i].per).toFixed(2)) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + (conditionLineLevelArraySA[i].ConditionPricingUnit === undefined ? "" : conditionLineLevelArraySA[i].ConditionPricingUnit) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (conditionLineLevelArraySA[i].UoM === undefined ? "" : conditionLineLevelArraySA[i].UoM) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled value='" + (conditionLineLevelArraySA[i].conditionValue === undefined ? "" : formatAmountByComma(Number(conditionLineLevelArraySA[i].conditionValue).toFixed(2))) + "' style='width: 150px;'>\n\
                            <input type='hidden' class='ConditionValueHeaderHidden' value='" + conditionLineLevelArraySA[i].oldConditionValue + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (conditionLineLevelArraySA[i].Currency2 === undefined ? "" : conditionLineLevelArraySA[i].Currency2) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (conditionLineLevelArraySA[i].ConditionValue2 === undefined ? "" : conditionLineLevelArraySA[i].ConditionValue2) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (conditionLineLevelArraySA[i].Conditioncurrency === undefined ? '' : conditionLineLevelArraySA[i].Conditioncurrency) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (conditionLineLevelArraySA[i].conditionKAPPL === undefined ? "" : conditionLineLevelArraySA[i].conditionKAPPL) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (conditionLineLevelArraySA[i].conditionKVSL1 === undefined ? "" : conditionLineLevelArraySA[i].conditionKVSL1) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (conditionLineLevelArraySA[i].conditionKVSL2 === undefined ? "" : conditionLineLevelArraySA[i].conditionKVSL2) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (conditionLineLevelArraySA[i].conditionZAEHK === undefined ? "" : conditionLineLevelArraySA[i].conditionZAEHK) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (conditionLineLevelArraySA[i].conditionSTUNR === undefined ? "" : conditionLineLevelArraySA[i].conditionSTUNR) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (conditionLineLevelArraySA[i].CHANGEID === undefined ? "" : conditionLineLevelArraySA[i].CHANGEID) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (conditionLineLevelArraySA[i].vendorname === undefined ? "" : conditionLineLevelArraySA[i].vendorname) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (conditionLineLevelArraySA[i].vendorcode === undefined ? "" : conditionLineLevelArraySA[i].vendorcode) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value=''></td>"
                        + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;'></i></td>"
                        + "</tr>";
                $("#conditionTableId tbody").append(tdrow);
            }
        }

        var companyCode = $("#companycodeHeader").val();
        var localCurrency = "";
        if (companyCode === "0640" || companyCode === "0641")
        {
            localCurrency = "SGD";
        }
        else if (companyCode === "0680")
        {
            localCurrency = "MYR";
        }
        var poCurrency = $("#CurrencyDeliveryInvoice").val();

        $("#conditionTableId tbody tr").each(function() {
            var addedFrom = $(this).find("td").eq(0).children(".lineAddedFromHeader").val();
            var curr1 = "";
            if (addedFrom === "headerlevel") {
                curr1 = $(this).find("td").eq(4).children(".CurrencyHeader").val();
                var condCurncyExchangeRate = getExchangeRate(poCurrency, curr1);

                var poCurrencyExchangeRate = getExchangeRate(localCurrency, poCurrency);

                $(this).find("td").eq(11).children(".conditionHeaderCondCurncyExchangeRate").val(condCurncyExchangeRate);
                $(this).find("td").eq(11).children(".conditionHeaderPOCurrencyExchangeRate").val(poCurrencyExchangeRate);

                var todaydate = new Date();
                var day = todaydate.getDate();
                if (day < 10) {
                    day = "0" + day;
                }
                var month = todaydate.getMonth() + 1; // The months are 0-based
                if (month < 10) {
                    month = "0" + month;
                }
                var year = todaydate.getFullYear();

                var formateDate = year + "-" + month + "-" + day;
                console.log("formateDate :" + formateDate);
                $(this).find("td").eq(11).children(".conditionHeaderCondPriceDate").val(formateDate);
            }
        });

        console.log("conditionLineLevelArraySA after load :" + JSON.stringify(conditionLineLevelArraySA));
    }


    var totalNetPrice = 0;
    var toalPerQuant = 0;
    var condValue = "";
    var totalConditionValue = 0;
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var conType = "";
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
//        if (id === insertionid) {
        var isLineLevelDataSavedSaved = $(this).find("td").eq(0).children(".isLineLevelDataSavedSaved").val();
        if (isLineLevelDataSavedSaved === "No") {
            var Quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
            var netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
            var perQuant = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
            var amount = netPrice;
            totalNetPrice = Number(totalNetPrice) + Number(netPrice);
            if (netPrice !== "") {
                toalPerQuant = Number(toalPerQuant) + Number(perQuant);
            }
            $("#conditionTableId tbody tr").each(function() {
                conType = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
                if (conType === "PBXX") {
                    var fml = formula(conType);
                    var poQty = Quantity;
                    var perQty = perQuant;
                    var quant;
                    var exp = new String(fml);
                    condValue = eval(exp.toString());

                    totalConditionValue = Number(totalConditionValue) + Number(condValue);

                    var conditionValue = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
                    var conditionAmount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());

                    var ttlCondValue = Number(totalConditionValue) + Number(conditionValue);
                    var ttlAmount = Number(totalNetPrice) + Number(conditionAmount);
                    $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(ttlCondValue).toFixed(2)));
                    $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(ttlAmount).toFixed(2)));
                    deleteRowFormConditionHeaderInStandAlone();
                }
            });
        }

        if (dropDownItemNumber === prTableItemNumber) {
            linkid = $(this).find("td").eq(0).children(".linkid").val();
        }
//        }
    });

    var totalPO = $("#material_headerClass tbody tr").length;
    var rows = $("#conditionTableId tbody tr");
    for (var i = 0; i < conditionLineLevelArraySA.length; i++) {
        for (var j = 0; j < rows.length; j++) {
            var amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountHeader").val());
            var per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val());
            var conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
            var changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
            if (conType === conditionLineLevelArraySA[i].Ctype && changeid === conditionLineLevelArraySA[i].CHANGEID && linkid === conditionLineLevelArraySA[i].linkid) {
//                    alert("conType :" + conType + " ,Ctype :" + conditionLineLevelArraySA[i].Ctype + " ,changeid :" + changeid + " ,CHANGEID :" + conditionLineLevelArraySA[i].CHANGEID + " ,linkid :" + linkid + " ,ArraySA[i].linkid :" + conditionLineLevelArraySA[i].linkid);
                amount = Number(amount) / Number(totalPO);
                per = Number(per) / Number(totalPO);
//                alert("Bittu");
                if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                    $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(amount).toFixed(2)));
                } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                    $(rows[j]).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma(Number(amount).toFixed(2)));
                }
                $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(per).toFixed(2)));
            }
        }
    }
//    clearPerColumnatHeaderInSA();
    clearPerColumnatHeaderAfterSaveInSA();
}

function clearPerColumnatHeaderAfterSaveInSA() {
    $("#conditionTableId tbody tr").prop("disabled", true);
    $("#conditionTableId tbody tr").each(function() {
        var addredFrom = $(this).find("td").eq(0).children(".lineAddedFromHeader").val();
        var changeId = $(this).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
        if (addredFrom === "headerlevel" && changeId === "I") {
            var conType = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            var fml = formula(conType);
            var exp = new String(fml);
            var expAfterSplit = exp.split("/");
            if (expAfterSplit[0] === "(amount*poQty)") {
                if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                    $(this).find("td").eq(3).children(".AmountHeader").prop("disabled", false);
                } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                    $(this).find("td").eq(3).children(".newAmountHeader").prop("disabled", false);
                }
                if ($(this).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                    $(this).find("td").eq(5).children(".PerQuantityHeader").prop("disabled", false);
                } else if ($(this).find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                    $(this).find("td").eq(5).children(".newPerQuantityHeader").prop("disabled", false);
                }
            } else {
                if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                    $(this).find("td").eq(3).children(".AmountHeader").prop("disabled", false);
                } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                    $(this).find("td").eq(3).children(".newAmountHeader").prop("disabled", false);
                }
            }
        } else {
            $(this).find("td").eq(5).children(".PerQuantityHeader").val("");
        }
    });
}

function clearPerColumnatHeaderInSA() {
    if (conditionLineLevelArraySA.length === 0) {
        $("#conditionTableId tbody tr").each(function() {
            $(this).find("td").eq(5).children(".PerQuantityHeader").val("");
        });
    } else {
        for (var i = 0; i < conditionLineLevelArraySA.length; i++) {
            console.log("Find BITTU conditionLineLevelArraySA[" + i + "]" + conditionLineLevelArraySA[i].Ctype);
            var rows = $("#conditionTableId tbody tr");
            for (var j = 0; j < rows.length; j++) {
                var conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
                var changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
                if (conType === conditionLineLevelArraySA[i].Ctype && changeid === conditionLineLevelArraySA[i].CHANGEID) {

                    $(rows[j]).find("td").eq(12).children(".deleteConditionTebleRow").css("display", "block");
                    $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").prop("disabled", false);
                    var fml = formula(conditionLineLevelArraySA[i].Ctype);
                    var exp = new String(fml);
                    var expAfterSplit = exp.split("/");
                    if (expAfterSplit[0] === "(amount*poQty)") {
                        $(rows[j]).find("td").eq(3).children(".AmountHeader").prop("disabled", false);
                        $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").prop("disabled", false);
//                    $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val("");
                    } else {
                        $(rows[j]).find("td").eq(3).children(".AmountHeader").prop("disabled", false);
//                    $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val("");
                    }
                } else {
                    $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val("");
                }
            }
        }
    }
}

function updateShortTextAndServiceTextByServiceId(currentServiceTr, serviceMasterObj)
{
    var serviceId = currentServiceTr.find("td").eq(0).children(".serviceId").val();
    console.log("serviceId: " + serviceId);

    var ServiceIdAndServiceTextAndShortTextJsonObj = {};
    ServiceIdAndServiceTextAndShortTextJsonObj["ServiceId"] = serviceId;
    ServiceIdAndServiceTextAndShortTextJsonObj["ServiceText"] = serviceMasterObj.SLTextInfo;
    ServiceIdAndServiceTextAndShortTextJsonObj["ShortText"] = serviceMasterObj.SHORTTEXT;

    var ServiceIdAndServiceTextAndShortTextJsonObjAsString = JSON.stringify(ServiceIdAndServiceTextAndShortTextJsonObj);
    console.log("ServiceIdAndServiceTextAndShortTextJsonObjAsString: " + ServiceIdAndServiceTextAndShortTextJsonObjAsString);

    $("#serviceTextModal").modal("hide");
    var _csrf = $("input[name=_csrf]").val();
    $("#overlay").css("display", "block");

    $.ajax({
        type: "POST",
        url: "updateServicesLongTexts.do",
        async: true,
        data: {
            "reqFrom": "updateShortTextAndServiceTextByServiceId",
            "serviceIdAndServiceTextAndShortTextJsonObjAsString": ServiceIdAndServiceTextAndShortTextJsonObjAsString,
            _csrf: _csrf
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
            console.log("obj.ServiceId :" + obj.ServiceId);
            currentServiceTr.find("td").eq(0).children(".serviceId").val(obj.ServiceId);
        }
    });
}

function extractSAPResponseForPreCheck(message)
{
//    message = 'I~Function "Create Purchase Order" Performed in Test Run, E~PO header data still faulty, W~Purchase order date is in the past, W~Effective price is 0.00 SGD, E~Quantity conversion error in net price calculation, W~Can delivery date be met?, W~Can delivery date be met? (Realistic delivery date: 18.11.2020), I~Condition NAVS cannot be processed manually';
    console.log("extractSAPResponseForPreCheck");
    console.log("message: " + message);
    if (message !== undefined && message !== "")
    {
        var messageArr = [];
        messageArr = message.toString().split(",");
        console.log("messageArr len: " + messageArr.length);
        $("#preCheckResponseModalTable tbody tr").remove();
        var row = "";
        for (var i = 0; i < messageArr.length; i++)
        {
            var typeAndMessage = messageArr[i];
            console.log("typeAndMessage: " + typeAndMessage);
            var typeAndMessageArr = typeAndMessage.split("~");
            var type = typeAndMessageArr[0].toString().trim();
            var msg = typeAndMessageArr[1];

            if (type === "I")
                row += "<tr><td><div title='Information' style='width:-10px;height:15px;background-color:#17a2b8;'></div></td><td>" + msg + "</td></tr>";
            else if (type === "W")
                row += "<tr><td><div title='Warning' style='width:-10px;height:15px;background-color:#ffc107;'></div></td><td>" + msg + "</td></tr>";
            else if (type === "E")
                row += "<tr><td><div title='Error' style='width:-10px;height:15px;background-color:#dc3545;'></div></td><td>" + msg + "</td></tr>";
        }
        $("#preCheckResponseModalTable tbody").append(row);
        $("#preCheckReponseModal").modal("show");
    }
}

function hidePoLineTableColsByPoType()
{
    console.log("hidePoLineTableColsByPoType");
    console.log("PrType: " + $("#prType").val());
    if ($("#prType").val() === "Material")
    {
        $("#material_headerClass thead tr th").eq(5).css("display", "none");
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
        });
    }
    else if ($("#prType").val() === "Service")
    {
        $("#material_headerClass thead tr th").eq(4).css("display", "none");
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("td").eq(4).css("display", "none");
        });
    }
}

function hideDeliveryTabFieldsByPoType()
{
    console.log("hideDeliveryTabFieldsByPoType");
    var prType = $("#prType").val();
    console.log("prType: " + prType);
    if (prType === "Service")
    {
        $("#underDelvTolColDiv").css("visibility", "hidden");
        $("#shippingInstructionColDiv").css("visibility", "hidden");
        $("#stockTypeColDiv").css("visibility", "hidden");
        $("#valuationTypeColDiv").css("visibility", "hidden");
        $("#remShelfLifeColDiv").css("visibility", "hidden");
        $("#grProcTimeColDiv").css("visibility", "hidden");
        $("#incoTermsPart2Delivery").css("visibility", "hidden");
    }
    else
    {
        $("#underDelvTolColDiv").css("visibility", "visible");
        $("#shippingInstructionColDiv").css("visibility", "visible");
        $("#stockTypeColDiv").css("visibility", "visible");
        $("#valuationTypeColDiv").css("visibility", "visible");
        $("#remShelfLifeColDiv").css("visibility", "visible");
        $("#grProcTimeColDiv").css("visibility", "visible");
        $("#incoTermsPart2Delivery").css("visibility", "visible");
    }
}

function calculatetotalamountSA(condType, linkid) {
    var totalamount = 0;
    console.log("conditionLineLevelArraySA after taxcode :" + JSON.stringify(conditionLineLevelArraySA));
    conditionLineLevelArraySA.forEach(function(e) {
        if (condType === e.Ctype && linkid === e.linkid) {
            var amount = e.amount;
            totalamount = Number(amount) + Number(totalamount);
        }
    });
    return totalamount;
}

function calculatetotaperSA(condType, linkid) {
    var totalper = 0;
    console.log("conditionLineLevelArraySA after taxcode :" + JSON.stringify(conditionLineLevelArraySA));
    conditionLineLevelArraySA.forEach(function(e) {
        if (condType === e.Ctype && linkid === e.linkid) {
            var per = e.per;
            totalper = Number(per) + Number(totalper);
        }
    });
    return totalper;
}

function updateExtDraftPoDetailsOnErrorTransaction(extId)
{
    console.log("%cIn updateExtDraftPoDetailsOnErrorTransaction:", "color: green");
    console.log("extId: " + extId);

    var errorTransactionStatus = $("#errorTransactionStatus").val();
    var tempPoNumber = $("#tempPoNumber").val();
    var poSequenceNumber = $("#poSequenceNumber").val();
    console.log("errorTransactionStatus: " + errorTransactionStatus);
    console.log("tempPoNumber: " + tempPoNumber);
    console.log("poSequenceNumber: " + poSequenceNumber);

    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "updateExtDraftPoDetailsOnErrorTransaction",
            "extId": extId,
            "errorTransactionStatus": errorTransactionStatus,
            "tempPoNumber": tempPoNumber,
            "poSequenceNumber": poSequenceNumber
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result: " + obj.Result);
        }
    });
}

function setPoLineLevelDataFromInfoRecord(infoRecordJsonObj, requestFrom)
{
    console.log("In setPoLineLevelDataFromInfoRecord:");
    console.log("%cInfoRecord requestFrom 2: " + requestFrom, "color: blue");
    console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));

    if (requestFrom === "VendorChange")
    {
        console.log("Vendor changed");
        // Delivery/Invoice Tab
        $("#IncoTermsPart1").val(infoRecordJsonObj.INCOTERMS1);
        $("#IncoTermsPart2").val(infoRecordJsonObj.INCOTERMS2);

        // Communication Tab
        $("#Salesperson").val(infoRecordJsonObj.SALES_PERS);
        $("#Telephone").val(infoRecordJsonObj.TELEPHONE);
    }

    // Material Tab
    $("#vendMatNo").val(infoRecordJsonObj.VEND_MAT);

    // Delivery Tab        
    $("#OverdeliveryTolerance").val(infoRecordJsonObj.overDelTolerance);
    $("#UnderdeliveryTolerance").val(infoRecordJsonObj.underDelTolerance);
    $("#FirstReminderExpediter").val(infoRecordJsonObj.REMINDER1);
    $("#SecondReminderExpediter").val(infoRecordJsonObj.REMINDER2);
    $("#ThirdReminderExpediter").val(infoRecordJsonObj.REMINDER3);
    $("#ShippingInstruction").val(infoRecordJsonObj.SHIPPING);
    $("#ValuationType").val(infoRecordJsonObj.VAL_TYPE);
    $("#PlDeliveryTime").val(infoRecordJsonObj.PLND_DELRY);

    if (infoRecordJsonObj.UNLIMITED === "true" || infoRecordJsonObj.UNLIMITED === "True")
        $("#unlimited").prop("checked", true);
    else
        $("#unlimited").prop("checked", false);

    // Invoice Tab
    if (infoRecordJsonObj.GR_BASEDIV === "true" || infoRecordJsonObj.GR_BASEDIV === "True")
        $("#GRBasedIV").prop("checked", true);
    else
        $("#GRBasedIV").prop("checked", false);

    // Confirmations Tab
    $("#confControlLimits").val(infoRecordJsonObj.CONF_CTRL);
    if (infoRecordJsonObj.ACKN_REQD === "true" || infoRecordJsonObj.ACKN_REQD === "True")
        $("#ConfirmationRequired").prop("checked", true);
    else
        $("#ConfirmationRequired").prop("checked", false);
}

function setHeaderLevelDataFromInfoRecord(infoRecordJsonObj)
{
    console.log("In setHeaderLevelDataFromInfoRecord:");
    // Delivery/Invoice Tab
    $("#CurrencyDeliveryInvoice").val(infoRecordJsonObj.CURRENCY);
    $("#IncoTermsPart1").val(infoRecordJsonObj.INCOTERMS1);
    $("#IncoTermsPart2").val(infoRecordJsonObj.INCOTERMS2);

    // Communication Tab
    $("#Salesperson").val(infoRecordJsonObj.SALES_PERS);
    $("#Telephone").val(infoRecordJsonObj.TELEPHONE);
}

function updateQuantityWeightsOnUomChange(QuantityWeightAsJsonString) {
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "updateQuantityWeightsOnUomChange",
            "quantityWeightAsJsonString": QuantityWeightAsJsonString
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function findAccAssCatByAccountAssignmentCode(acountAssgnCat)
{
    // Set Acc Ass Cat in AccAss Tab Starts
    console.log("acountAssgnCat: " + acountAssgnCat);
    var accountAssignmentCategoryDisplay = "";
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "findAccAssCatByAccountAssignmentCode",
            "code": acountAssgnCat
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            accountAssignmentCategoryDisplay = obj.AccAssCat;
            console.log("accountAssignmentCategoryDisplay 1: " + accountAssignmentCategoryDisplay);
        }
    });
    return accountAssignmentCategoryDisplay;
}

function updateExtDraftPoDetailsOnPoCreation(extId)
{
    // Set Acc Ass Cat in AccAss Tab Starts
    console.log("extId: " + extId);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "updateExtDraftPoDetailsOnPoCreation",
            "extId": extId
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Result: " + obj.Result);
        }
    });
}

function saveSAHeaderConditionsInDB()
{
    var POHeaderConditionJsonDataArray = [];
    console.log("cond len: " + $("#conditionTableId tbody tr").length);
    $("#conditionTableId tbody tr").each(function() {
        var POConditionDataAsJsonObject = {};
        var conditionVendorHeader = $(this).find("td").eq(0).children(".conditionVendorHeader").val();
        var lineAddedFromHeader = $(this).find("td").eq(0).children(".lineAddedFromHeader").val();
        var conditionIndex = $(this).find("td").eq(0).children(".conditionindex").val();
        var conType = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();

        var amount = "";
        var perQuant = "";

        if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val()).toString();
        }
        if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountHeader").val()).toString();
        }
        if ($(this).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
            perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityHeader").val()).toString();
        }
        if ($(this).find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
            perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".newPerQuantityHeader").val()).toString();
        }

        var name = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        var curr1 = $(this).find("td").eq(4).children(".CurrencyHeader").val();
        var conPrUnit = $(this).find("td").eq(6).children(".ConditionPricingUnitHeader").val();
        var uOM = $(this).find("td").eq(7).children(".UoMHeader").val();
        var conVal1 = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()).toString();
        var curr2 = $(this).find("td").eq(9).children(".Currency2Header").val();
        var conVal2 = $(this).find("td").eq(10).children(".ConditionValue2Header").val();
        var conCurr = $(this).find("td").eq(11).children(".ConditionCurrencyHeader").val();
        var stNumber = $(this).find("td").eq(11).children(".conditionHeaderSTUNR").val();
        var condCount = $(this).find("td").eq(11).children(".conditionHeaderZAEHK").val();
        var KAPPL = $(this).find("td").eq(11).children(".conditionHeaderKAPPL").val();
        var KVSL1 = $(this).find("td").eq(11).children(".conditionHeaderKVSL1").val();
        var KVSL2 = $(this).find("td").eq(11).children(".conditionHeaderKVSL2").val();
        var condChangeId = $(this).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
        var conditionHeaderVendorName = $(this).find("td").eq(11).children(".conditionHeaderVendorName").val();
        var conditionHeaderVendorCode = $(this).find("td").eq(11).children(".conditionHeaderVendorCode").val();
        var conditionHeaderCondPriceDate = $(this).find("td").eq(11).children(".conditionHeaderCondPriceDate").val();
        var conditionHeaderCondCurncyExchangeRate = $(this).find("td").eq(11).children(".conditionHeaderCondCurncyExchangeRate").val();
        var conditionHeaderPOCurrencyExchangeRate = $(this).find("td").eq(11).children(".conditionHeaderPOCurrencyExchangeRate").val();

        POConditionDataAsJsonObject["conditionVendorHeader"] = conditionVendorHeader;
        POConditionDataAsJsonObject["lineAddedFromHeader"] = lineAddedFromHeader;
        POConditionDataAsJsonObject["conditionIndex"] = conditionIndex;
        POConditionDataAsJsonObject["conType"] = conType;
        POConditionDataAsJsonObject["name"] = name;
        POConditionDataAsJsonObject["amount"] = amount;
        POConditionDataAsJsonObject["perQuant"] = perQuant;
        POConditionDataAsJsonObject["conPrUnit"] = conPrUnit;
        POConditionDataAsJsonObject["curr1"] = curr1;
        POConditionDataAsJsonObject["uOM"] = uOM;
        POConditionDataAsJsonObject["conVal1"] = conVal1;
        POConditionDataAsJsonObject["curr2"] = curr2;
        POConditionDataAsJsonObject["conVal2"] = conVal2;
        POConditionDataAsJsonObject["conCurr"] = conCurr;
        POConditionDataAsJsonObject["stNumber"] = stNumber;
        POConditionDataAsJsonObject["condCount"] = condCount;
        POConditionDataAsJsonObject["KAPPL"] = KAPPL;
        POConditionDataAsJsonObject["KVSL1"] = KVSL1;
        POConditionDataAsJsonObject["KVSL2"] = KVSL2;
        POConditionDataAsJsonObject["condChangeId"] = condChangeId;
        POConditionDataAsJsonObject["vendorName"] = conditionHeaderVendorName;
        POConditionDataAsJsonObject["vendorCode"] = conditionHeaderVendorCode;
        POConditionDataAsJsonObject["condPriceDate"] = conditionHeaderCondPriceDate;
        POConditionDataAsJsonObject["condCurrExchangeRate"] = conditionHeaderCondCurncyExchangeRate;
        POConditionDataAsJsonObject["poCurrExchangeRate"] = conditionHeaderPOCurrencyExchangeRate;

        POHeaderConditionJsonDataArray.push(POConditionDataAsJsonObject);
    });
    console.log("POHeaderConditionJsonDataArray len: " + POHeaderConditionJsonDataArray.length);

    var POHeaderConditionAsJsonString = JSON.stringify(POHeaderConditionJsonDataArray);
    console.log("POHeaderConditionAsJsonString :" + POHeaderConditionAsJsonString);

    var extPoId = $("#poid").val();
    console.log("extPoId: " + extPoId);

    var _csrf = $("input[name=_csrf]").val();
    $.ajax({
        type: "POST",
        url: "standalonePoPostAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "saveSAHeaderConditionsInDB",
            _csrf: _csrf,
            POHeaderConditionAsJsonString: POHeaderConditionAsJsonString,
            extPoId: extPoId
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Result: " + obj.Result);
        }
    });
}

function findSAHeaderConditionsByExtId()
{
    var extPoId = $("#poid").val();
    console.log("extPoId: " + extPoId);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "findSAHeaderConditionsByExtId",
            "extPoId": extPoId
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("HeaderConditionsArr len: " + obj.HeaderConditionsArr.length);
            setSAHeaderConditions(obj.HeaderConditionsArr);
        }
    });
}

function setSAHeaderConditions(HeaderConditionsArr)
{
    console.log("In setSAHeaderConditions:");
    console.log("HeaderConditionsArr len: " + HeaderConditionsArr.length);

    $("#conditionTableId tbody tr").remove();
    var row = "";
    for (var i = 0; i < HeaderConditionsArr.length; i++)
    {
        if (HeaderConditionsArr[i].lineAddedFromHeader === "linelevel")
        {
            row += "<tr>"
                    + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                        <input type='hidden' class='conditionVendorHeader' value='" + (HeaderConditionsArr[i].conditionVendorHeader !== undefined ? HeaderConditionsArr[i].conditionVendorHeader : '') + "'>\n\
                        <input type='hidden' class='lineAddedFromHeader' value='" + (HeaderConditionsArr[i].lineAddedFromHeader !== undefined ? HeaderConditionsArr[i].lineAddedFromHeader : '') + "'>\n\
                        <input type='hidden' class='conditionindex' value='" + (HeaderConditionsArr[i].conditionIndex !== undefined ? HeaderConditionsArr[i].conditionIndex : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (HeaderConditionsArr[i].condType !== undefined ? HeaderConditionsArr[i].condType : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' style='width:200px;' value='" + (HeaderConditionsArr[i].condName !== undefined ? HeaderConditionsArr[i].condName : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' disabled value = '" + (HeaderConditionsArr[i].amount !== undefined ? formatAmountByComma(Number(HeaderConditionsArr[i].amount).toFixed(2)) : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (HeaderConditionsArr[i].currency1 !== undefined ? HeaderConditionsArr[i].currency1 : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' disabled value='" + (HeaderConditionsArr[i].perQuantity !== undefined ? formatAmountByComma(Number(HeaderConditionsArr[i].perQuantity).toFixed(2)) : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + (HeaderConditionsArr[i].condPricUnit !== undefined ? HeaderConditionsArr[i].condPricUnit : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (HeaderConditionsArr[i].uoM !== undefined ? HeaderConditionsArr[i].uoM : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled value='" + (HeaderConditionsArr[i].CondVal1 !== undefined ? formatAmountByComma(Number(HeaderConditionsArr[i].CondVal1).toFixed(2)) : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (HeaderConditionsArr[i].currency !== undefined ? HeaderConditionsArr[i].currency : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (HeaderConditionsArr[i].kappl !== undefined ? HeaderConditionsArr[i].kappl : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (HeaderConditionsArr[i].kvsl1 !== undefined ? HeaderConditionsArr[i].kvsl1 : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (HeaderConditionsArr[i].kvsl2 !== undefined ? HeaderConditionsArr[i].kvsl2 : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (HeaderConditionsArr[i].conditionCount !== undefined ? HeaderConditionsArr[i].conditionCount : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (HeaderConditionsArr[i].stNumber !== undefined ? HeaderConditionsArr[i].stNumber : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (HeaderConditionsArr[i].changeId !== undefined ? HeaderConditionsArr[i].changeId : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (HeaderConditionsArr[i].vendorName !== undefined ? HeaderConditionsArr[i].vendorName : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (HeaderConditionsArr[i].vendorCode !== undefined ? HeaderConditionsArr[i].vendorCode : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (HeaderConditionsArr[i].condPriceDate !== undefined ? HeaderConditionsArr[i].condPriceDate : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (HeaderConditionsArr[i].condCurncyExchangeRate !== undefined ? HeaderConditionsArr[i].condCurncyExchangeRate : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (HeaderConditionsArr[i].poCurrencyExchangeRate !== undefined ? HeaderConditionsArr[i].poCurrencyExchangeRate : '') + "'></td>"
                    + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;display:none'></i></td>"
                    + "</tr>";
        }
        else if (HeaderConditionsArr[i].lineAddedFromHeader === "headerlevel")
        {
            row += "<tr>"
                    + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                        <input type='hidden' class='conditionVendorHeader' value='" + (HeaderConditionsArr[i].conditionVendorHeader !== undefined ? HeaderConditionsArr[i].conditionVendorHeader : '') + "'>\n\
                        <input type='hidden' class='lineAddedFromHeader' value='" + (HeaderConditionsArr[i].lineAddedFromHeader !== undefined ? HeaderConditionsArr[i].lineAddedFromHeader : '') + "'>\n\
                        <input type='hidden' class='conditionindex' value='" + (HeaderConditionsArr[i].conditionIndex !== undefined ? HeaderConditionsArr[i].conditionIndex : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (HeaderConditionsArr[i].condType !== undefined ? HeaderConditionsArr[i].condType : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' style='width:200px;' value='" + (HeaderConditionsArr[i].condName !== undefined ? HeaderConditionsArr[i].condName : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded newAmountHeader tableInputField' name='AmountHeader' value = '" + (HeaderConditionsArr[i].amount !== undefined ? formatAmountByComma(Number(HeaderConditionsArr[i].amount).toFixed(2)) : '') + "' style='width: 150px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (HeaderConditionsArr[i].currency1 !== undefined ? HeaderConditionsArr[i].currency1 : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded newPerQuantityHeader tableInputField' name='PerQuantityHeader' value='" + (HeaderConditionsArr[i].perQuantity !== undefined ? formatAmountByComma(Number(HeaderConditionsArr[i].perQuantity).toFixed(2)) : '') + "' style='width: 150px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + (HeaderConditionsArr[i].condPricUnit !== undefined ? HeaderConditionsArr[i].condPricUnit : '') + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (HeaderConditionsArr[i].uoM !== undefined ? HeaderConditionsArr[i].uoM : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled value='" + (HeaderConditionsArr[i].CondVal1 !== undefined ? formatAmountByComma(Number(HeaderConditionsArr[i].CondVal1).toFixed(2)) : '') + "' style='width: 150px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (HeaderConditionsArr[i].currency !== undefined ? HeaderConditionsArr[i].currency : '') + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (HeaderConditionsArr[i].kappl !== undefined ? HeaderConditionsArr[i].kappl : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (HeaderConditionsArr[i].kvsl1 !== undefined ? HeaderConditionsArr[i].kvsl1 : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (HeaderConditionsArr[i].kvsl2 !== undefined ? HeaderConditionsArr[i].kvsl2 : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (HeaderConditionsArr[i].conditionCount !== undefined ? HeaderConditionsArr[i].conditionCount : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (HeaderConditionsArr[i].stNumber !== undefined ? HeaderConditionsArr[i].stNumber : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (HeaderConditionsArr[i].changeId !== undefined ? HeaderConditionsArr[i].changeId : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (HeaderConditionsArr[i].vendorName !== undefined ? HeaderConditionsArr[i].vendorName : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (HeaderConditionsArr[i].vendorCode !== undefined ? HeaderConditionsArr[i].vendorCode : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (HeaderConditionsArr[i].condPriceDate !== undefined ? HeaderConditionsArr[i].condPriceDate : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (HeaderConditionsArr[i].condCurncyExchangeRate !== undefined ? HeaderConditionsArr[i].condCurncyExchangeRate : '') + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (HeaderConditionsArr[i].poCurrencyExchangeRate !== undefined ? HeaderConditionsArr[i].poCurrencyExchangeRate : '') + "'></td>"
                    + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;'></i></td>"
                    + "</tr>";
        }
    }
    $("#conditionTableId tbody").append(row);
    console.log("Setting header conditions completes.");
}

function formatNumberByComma(number)
{
    console.log("In formatNumberByComma");
    console.log("number: " + number);
    number = Number(number);
    var formatNumber = number.toLocaleString('en-US', {minimumFractionDigits: 3});
    console.log("formatNumber: " + formatNumber);
    return formatNumber;
}

function formatAmountByComma(amount)
{
    console.log("In formatAmountByComma");
    console.log("amount: " + amount);
    amount = Number(amount);
    var formatAmount = amount.toLocaleString('en-US', {minimumFractionDigits: 2});
    console.log("formatAmount: " + formatAmount);
    return formatAmount;
}

function removeCommaInNumber(formatNumber)
{
    console.log("In removeCommaInNumber");
    console.log("formatNumber: " + formatNumber);
    formatNumber = formatNumber.toString();
    var numberWOComma = formatNumber.replace(/,/g, '');
    console.log("numberWOComma: " + numberWOComma);
    return Number(numberWOComma);
}

function replicateMainAccAssToPOLineHavingSameCategory()
{
    console.log("In replicateMainAccAssWithPOLineHavingSameCategory:");

    var currentPoLineItemNo = $("#ItemNumberSelect").val();
    console.log("currentPoLineItemNo: " + currentPoLineItemNo);

    var currentPoLineAccAssCat = "";
    var currentPoLineLinkId = "";
    var currentPoLineDistribution = "";
    $("#material_headerClass tbody tr").each(function() {
        var poLineItemNo = $(this).find("td").eq(1).text();

        if (currentPoLineItemNo === poLineItemNo) {
            currentPoLineAccAssCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            currentPoLineLinkId = $(this).find("td").eq(0).children(".linkid").val();
            currentPoLineDistribution = $(this).find("td").eq(0).children(".PODistribution").val();
        }
    });
    console.log("currentPoLineAccAssCat: " + currentPoLineAccAssCat);
    console.log("currentPoLineLinkId: " + currentPoLineLinkId);
    console.log("currentPoLineDistribution: " + currentPoLineDistribution);

    if (currentPoLineDistribution === "")
    {
        Lobibox.alert("error", {
            msg: "Kindly save PO line level tabs first!"
        });
    }
    else
    {
        var poLineDetailsArr = [];
        $("#material_headerClass tbody tr").each(function() {
            var poLineItemNo = $(this).find("td").eq(1).text();
            var accAsgnCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            var linkId = $(this).find("td").eq(0).children(".linkid").val();
            var poLineQty = $(this).find("td").eq(8).children(".quantity_Class").val();

            console.log("accAsgnCat: " + accAsgnCat);
            console.log("linkId: " + linkId);
            console.log("poLineQty: " + poLineQty);
            console.log("poLineItemNo: " + poLineItemNo);

            if (accAsgnCat !== "") {
                if (currentPoLineItemNo !== poLineItemNo && accAsgnCat === currentPoLineAccAssCat) {
                    var poLineDetails = {};
                    poLineDetails["linkId"] = linkId;
                    poLineDetails["quantity"] = removeCommaInNumber(poLineQty).toString();
                    poLineDetails["itemNo"] = poLineItemNo;
                    poLineDetailsArr.push(poLineDetails);
                }
            }
        });

        if (poLineDetailsArr.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Only one PO line is present with category " + currentPoLineAccAssCat
            });
        }
        else
        {
            var poLineDetailsJsonArr = JSON.stringify(poLineDetailsArr);
            console.log("poLineDetailsArr: " + poLineDetailsJsonArr);

            var prType = $("#prType").val();
            console.log("prType: " + prType);

            var poId = $("#poid").val();
            console.log("poId: " + poId);

            $("#overlay").css("display", "block");
            setTimeout(function() {
                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "replicateSAMainAccAssToPOLineHavingSameCategory",
                        "currentPoLineItemNo": currentPoLineItemNo,
                        "currentPoLineLinkId": currentPoLineLinkId,
                        "currentPoLineDistribution": currentPoLineDistribution,
                        "poLineDetailsJsonArr": poLineDetailsJsonArr,
                        "prType": prType,
                        "poId": poId
                    },
                    error: function(error) {
                        console.log("error: " + error);
                        $("#overlay").css("display", "none");
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("Replicate_SA_Main_Acc_Ass_Result: " + obj.Result);
                        $("#overlay").css("display", "none");
                        Lobibox.alert("success", {
                            msg: "Account Assignment has been replicated in other PO Lines successfully."
                        });
                    }
                });
            }, 100);
        }
    }
}

function replicateServiceAccAss()
{
    console.log("In replicateServiceAccAss:");

    var currentPoLineItemNo = $("#ItemNumberSelect").val();
    console.log("currentPoLineItemNo: " + currentPoLineItemNo);

    var currentPoLineAccAssCat = "";
    var currentPoLineLinkId = "";
    $("#material_headerClass tbody tr").each(function() {
        var poLineItemNo = $(this).find("td").eq(1).text();

        if (currentPoLineItemNo === poLineItemNo) {
            currentPoLineAccAssCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            currentPoLineLinkId = $(this).find("td").eq(0).children(".linkid").val();
        }
    });
    console.log("currentPoLineAccAssCat: " + currentPoLineAccAssCat);
    console.log("currentPoLineLinkId: " + currentPoLineLinkId);

    var selectedServiceAccAssDist = serviceTabTableCurrentTd.parent().children(".ServiceAccAssDist").val();
    var selectedServiceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();

    console.log("selectedServiceAccAssDist: " + selectedServiceAccAssDist);
    console.log("selectedServiceLineItemNumber: " + selectedServiceLineItemNumber);

    var servicesDetailsArr = [];
    $("#serviceTableId tbody tr").each(function() {
        var serviceLineItemNumber = $(this).find("td").eq(1).children(".lineItemNumberServices").val();
        var serviceLineQuantity = $(this).find("td").eq(4).children(".quantity_Services").val();
        var serviceLineGrossPrice = $(this).find("td").eq(6).children(".grossPrice_Services").val();

        console.log("serviceLineItemNumber: " + serviceLineItemNumber);
        console.log("serviceLineQuantity: " + serviceLineQuantity);
        console.log("serviceLineGrossPrice: " + serviceLineGrossPrice);

        if (selectedServiceLineItemNumber !== serviceLineItemNumber) {
            if (serviceLineQuantity !== "" && serviceLineGrossPrice !== "") {
                var serviceDetailsObj = {};
                serviceDetailsObj["serviceLineItemNumber"] = serviceLineItemNumber;
                serviceDetailsObj["serviceLineQuantity"] = removeCommaInNumber(serviceLineQuantity).toString();
                serviceDetailsObj["serviceLineGrossPrice"] = removeCommaInNumber(serviceLineGrossPrice).toString();
                servicesDetailsArr.push(serviceDetailsObj);
            }
        }
    });

    if (currentPoLineAccAssCat !== "" && currentPoLineAccAssCat !== "U")
    {
        if (servicesDetailsArr.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Only one service is present for this PO line!"
            });
        }
        else if(selectedServiceAccAssDist === "")
        {
            Lobibox.alert("error", {
                msg: "Kindly submit account assignment for this service line first!"
            });
        }
        else
        {
            var servicesDetailsJsonArr = JSON.stringify(servicesDetailsArr);
            console.log("servicesDetailsJsonArr: " + servicesDetailsJsonArr);
            
            var poId = $("#poid").val();
            console.log("poId: " + poId);
            
            $("#overlay").css("display", "block");
            setTimeout(function() {
                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "replicateSAServiceAccAss",
                        "currentPoLineItemNo": currentPoLineItemNo,
                        "currentPoLineLinkId": currentPoLineLinkId,
                        "selectedServiceLineItemNumber": selectedServiceLineItemNumber,
                        "selectedServiceAccAssDist": selectedServiceAccAssDist,
                        "servicesDetailsJsonArr": servicesDetailsJsonArr,
                        "poId": poId
                    },
                    error: function(error) {
                        console.log("error: " + error);
                        $("#overlay").css("display", "none");
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("Replicate_SA_Service_Acc_Ass_Result: " + obj.Result);
                        
                        $("#serviceTableId tbody tr").each(function() {
                            $(this).find("td").eq(0).children(".saveSarviceAccountAssignment").val("Yes");
                            $(this).find("td").eq(0).children(".ServiceAccAssDist").val(selectedServiceAccAssDist);
                        });
                        
                        var accountAssignmentCategory = $("#accountAssignmentCategory").val();
                        console.log("accountAssignmentCategory: " + accountAssignmentCategory);
                        
                        callOnlyMainAcAsgnFun(accountAssignmentCategory, "afterSave");
                        
                        $("#account_assignment-tab :input").prop("disabled", true);
                        $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
                        
                        console.log("Resetting main account assignment tab details.");

                        $("#overlay").css("display", "none");
                        Lobibox.alert("success", {
                            msg: "Account Assignment has been replicated in other services of this PO Line successfully."
                        });
                    }
                });
            }, 100);
        }
    }
}


var vendorMasterTable = null;
function findVendorsFromVendorMasterByCompanyCodeAndPagination() {
    console.log("In findVendorsFromVendorMasterByCompanyCodeAndPagination:");
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "findVendorsFromVendorMasterByCompanyCodeAndPagination",
            "recordCount": $("#vendorMasterRecordCount").val(),
            "vendorCodeOrNameSearchText": $("#vendorCodeOrName_SearchText").val(),
            "lastVMSno": $("#lastVMSno").val(),
            "companyCode": $("#companycodeHeader").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);

            var vendorMasterRecordCount = $("#vendorMasterRecordCount").val();
            console.log("vendorMasterRecordCount: " + vendorMasterRecordCount);

            if (obj.length < Number(vendorMasterRecordCount))
            {
                $("#searchVendorMasterNextBtn").prop("disabled", true);
            }
            else
            {
                $("#searchVendorMasterNextBtn").prop("disabled", false);
            }

            $("#vendorMasterTable tbody tr").remove();
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr class='vendorMasterTr'>"
                        + "<td style='text-align: center;'><i class='fa fa-plus select-vendor-from-vendor-master' aria-hidden='true' title='Select this vendor'></i>" 
                        + "<input type='hidden' class='vendorSno' value='" + (obj[i].sno === undefined ? "" : obj[i].sno) + "'>"
                        + "<input type='hidden' class='vendorCode' value='" + (obj[i].vendorCode === undefined ? "" : obj[i].vendorCode) + "'>"
                        + "<input type='hidden' class='vendorName' value='" + (obj[i].vendorName === undefined ? "" : obj[i].vendorName) + "'>"                        
                        + "</td>"
                        + "<td>" + (obj[i].vendorCode === undefined ? "" : obj[i].vendorCode) + "</td>"
                        + "<td>" + (obj[i].vendorName === undefined ? "" : obj[i].vendorName) + "</td>"
                        + "</tr>";
            }
            $("#vendorMasterTable tbody").append(row);

            if ($.fn.DataTable.isDataTable('#vendorMasterTable')) {
                vendorMasterTable.destroy();
                vendorMasterTable = null;
                $("#vendorMasterTable").children('tbody').html(row);
                vendorMasterTable = $('table.vendorMasterTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                vendorMasterTable.buttons().container()
                        .appendTo('#vendorMasterTable_wrapper .col-md-6:eq(0)');
            } else {
                $('#vendorMasterTable thead tr').clone(true).appendTo('#vendorMasterTable thead');
                $('#vendorMasterTable thead tr:eq(1) th').each(function(i) {
                    $('#vendorMasterTable thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (vendorMasterTable.column(i).search() !== this.value) {
                            vendorMasterTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                vendorMasterTable = $('table.vendorMasterTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                vendorMasterTable.buttons().container()
                        .appendTo('#vendorMasterTable_wrapper .col-md-6:eq(0)');
            }
        }
    });
}