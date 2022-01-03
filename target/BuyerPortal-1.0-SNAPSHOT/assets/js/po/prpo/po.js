(function() {
    (function() {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
    })();
});
var amountArr = [];
var perArr = [];
var canValArr = [];
var savePoLineLobiboxNotifyAlert = null;
var condType = [];
var condName = [];
var jsonResponseWhenDataGetAfterSaveOnLoad = "";
var serviceTabTableCurrentTd;
var prevousSelectedItem = $("#ItemNumberSelect").val();
var pickListKeyCode = $("#pickListKeyCode").val();
console.log("pickListKeyCode: " + pickListKeyCode);

$(document).ready(function() {
    $("#overlay").css("display", "none");
    $(".chosen").chosen();
    $(".selectpicker").selectpicker();
    $('.needs-validation').parsley();
    var purOrg = $("#purchasingOrgHidden").val();
    $("#purchasingOrg").val(purOrg);
    var PoFrom = $("#PoFrom").val();
    var insertionid = $("#ItemNumberSelect").val();
    var overalllimit;
    var expectedValue;
    var nolimit;
    var accAsgn;
    var itemCat;
    $("#material_headerClass tbody tr").each(function(index) {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if ($(this).find('td').eq(3).children(".itemCategoryClass").val() === "D") {
            $(this).find("td").eq(6).children(".pr-quantity").prop("disabled", true);
        } else {
            $(this).find("td").eq(6).children(".pr-quantity").prop("disabled", false);
        }
        if (insertionid === id) {
            overalllimit = $(this).find("td").eq(0).children(".overAllLimitHidden").val();
            expectedValue = $(this).find("td").eq(0).children(".expectedValueHidden").val();
            nolimit = $(this).find("td").eq(0).children(".noLimitHidden").val();
            accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
        }
        if (index === 0) {
            console.log("PR Type 42: =============");
            var itemCatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
            if (itemCatogory === "D") {
                $("#PrType").val("Service");                
            } else {
                $("#PrType").val("Material");                
            }
        }
        var quantityBeforeChange = $(this).find("td").eq(0).children(".quantityBeforeChange").val();
        var totalQuantityOfThisLine = $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val();
        $(this).find("td").eq(0).children(".quantityBeforeChange").val(removeCommaInNumber(quantityBeforeChange));
        $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val(removeCommaInNumber(totalQuantityOfThisLine));
    });

    hideDeliveryTabFieldsByPoType(); // Added by nikhil on 07112020
    hidePoLineTableColsByPoType(); // Added by nikhil on 06112020

    if (accAsgn === "U" && itemCat === "D") {
        $("#OverallLimit").val(formatAmountByComma(overalllimit));
        $("#ExpectedValue").val(formatAmountByComma(expectedValue));
        if (nolimit === "true" || nolimit === "True") {
            $("#NoLimit").prop("checked", true);
        } else {
            $("#NoLimit").prop("checked", false);
        }
        $("#OverallLimit").prop("readonly", true);
        $("#ExpectedValue").prop("readonly", true);
        $("#NoLimit").prop("disabled", true);
    }
    
    $("#material_headerClass").on("change", ".pr-net-price", function() {
//        alert("Net Price Change start");
        $(this).parent().parent().find("td").eq(0).children(".prNetPriceHidden").val(removeCommaInNumber($(this).val()));
        var prNetPrice = removeCommaInNumber($(this).val());
        if (prNetPrice !== "")
        {
            if (Number(prNetPrice) < 0 || Number(prNetPrice) === -0)
            {
                $(this).val("");
                $(this).focus();
                Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please enter valid Unit Price in PO Line Item!"
                });
                return false;
            }

            var insertionid = $(".ItemNumberSelectClass :selected").val();
            var id = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
            if (id === insertionid) {
                console.log(id + "===" + insertionid);
//                var perQuant = $(this).find("td").eq(14).children(".priceUnitClass").val();
                calculationForPBXX();
//                $("#conditionTableIdLineLevel tbody tr").each(function() {
//                    var perunit = $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
//                    var conditiontype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
//                    console.log("conditiontype on netprice :" + conditiontype + " ,perunit :" + perunit);
//                    if (perunit === "") {
//                        $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val(Number(perQuant).toFixed(2));
//                    }
//                });
            }
        }
        calculatePBXXForHeader();
        var insertionid = $(".ItemNumberSelectClass :selected").val();
        var id = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        if (id === insertionid) {
            saveConditionTabDataOnLoadFieldChange("netpriceChange");
        }
        clearPerColumnatHeader();
        findApproverDetails();
        // Set net price in comma format
        $(this).val(formatAmountByComma(Number(prNetPrice).toFixed(2)));
//        alert("Net Price Change end");
    });
    
    function calculationForPBXX() {
        var timeOfChangeCurrency = "";
        $("#material_headerClass tbody tr").each(function() {
            var insertionid = $(".ItemNumberSelectClass :selected").val();
            var id = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
            if (id === insertionid) {
                timeOfChangeCurrency = $(this).parent().parent().find("td").eq(0).children(".timeOfChangeCurrency").val();
            }
        });
        console.log("timeOfChangeCurrency: " + timeOfChangeCurrency);
        var exchangeRate = $("#ExchangeRate").val();
        var headerCurrency = $("#CurrencyDeliveryInvoice").val();
        var companyCode = $("#companycodeHeader").val();
        console.log("companyCode in Exchange Rate: " + companyCode);
        var fromCurrency = "";
        if (companyCode === "0640" || companyCode === "0641")
        {
            fromCurrency = "SGD";
            ifHeaderCurrencyNotChange();
            if (timeOfChangeCurrency === "after") {
                if (headerCurrency !== fromCurrency) {
                    calculateConditionOnCurrncyChange(exchangeRate);
                }
            }
        }
        else if (companyCode === "0680")
        {
            fromCurrency = "MYR";
            ifHeaderCurrencyNotChange();
            if (timeOfChangeCurrency === "after") {
                if (headerCurrency !== fromCurrency) {
                    calculateConditionOnCurrncyChange(exchangeRate);
                }
            }
        }
    }

    $("#referenceDocType").change(function() {
        var refDocType = $(this).val();
        if (refDocType === "N/A") {
            $("#referenceDocNumber").prop("disabled", true);
            $("#referenceDocLine").prop("disabled", true);
        } else {
            $("#referenceDocNumber").prop("disabled", false);
            $("#referenceDocLine").prop("disabled", false);
        }
    });
    var currentTd;
    $(".itemCategoryClass").click(function() {
//        $("#itemCategoryModal").modal("show");
//        getAllItemCategory();
        currentTd = $(this).parent();
        $('#ro_ItemCategory').val("LineTable");
    });
    insertionid = $(".ItemNumberSelectClass").val();
    var deliveryDate;
    var material_header_table_Currency = "";
    var material_header_table_Current_td = "";
    var Ref_Doc_Number = "";
    var Ref_Doc_Line = "";
    var QuantityWeightJsonArray = [];
    var DeliveryScheduleJsonArray = [];
    var poDeliveryDate = $("#poDeliveryDate").val();
    console.log("poDeliveryDate: " + poDeliveryDate);
    // Added by nikhil on 02:53PM 08-02-2020
    var VendorFinalizationTableDataArrayAsJsonString = $("#VendorFinalizationTableDataArrayAsJsonString").val();
    console.log("VendorFinalizationTableDataArrayAsJsonString: " + VendorFinalizationTableDataArrayAsJsonString);
    var vendorCompanyCode = $("#vendorCompanyCode").val();
    console.log("vendorCompanyCode: " + vendorCompanyCode);
    if (vendorCompanyCode !== "")
    {
        $("#referenceDocType").val("RFQ");
    }
    else
    {
        $("#referenceDocType").val("Purchase Requisition");
    }
// Ended
    if (vendorCompanyCode !== "") {
        var VendorFinalizationTableDataArrayAsJsonArray = $.parseJSON(VendorFinalizationTableDataArrayAsJsonString);
        console.log("VendorFinalizationTableDataArrayAsJsonArray: " + VendorFinalizationTableDataArrayAsJsonArray);
        console.log("VendorFinalizationTableDataArrayAsJsonArray length: " + VendorFinalizationTableDataArrayAsJsonArray.length);
        var noteToApprover = VendorFinalizationTableDataArrayAsJsonArray[0].noteToApprover;
        $("#PONoteToApprover").val(noteToApprover);
        setRfqNumberInField(VendorFinalizationTableDataArrayAsJsonArray);
    }
    $("#material_headerClass tbody tr").each(function(index) {
        // If PO from RFQ
        // Added by nikhil on 02:53PM 08-02-2020
        var ValuationPrice = $(this).find("td").eq(0).children(".ValuationPrice").val();
        var PerUnit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val().trim());
        var PrQty = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val().trim());
        var OldNetPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
        console.log("ValuationPrice: " + ValuationPrice);
        console.log("PerUnit: " + PerUnit);
        console.log("PrQty: " + PrQty);
        console.log("OldNetPrice: " + OldNetPrice);
        if (vendorCompanyCode !== "")
        {
            var VendorFinalizationTableDataArrayAsJsonArray = $.parseJSON(VendorFinalizationTableDataArrayAsJsonString);
            console.log("VendorFinalizationTableDataArrayAsJsonArray: " + VendorFinalizationTableDataArrayAsJsonArray);
            console.log("VendorFinalizationTableDataArrayAsJsonArray length: " + VendorFinalizationTableDataArrayAsJsonArray.length);
            $(this).find('td').eq(6).children(".pr-quantity").val(formatNumberByComma(Number(VendorFinalizationTableDataArrayAsJsonArray[index].quantity).toFixed(3)));
            $(this).find('td').eq(0).children(".totalQuantityOfThisLine").val(Number(VendorFinalizationTableDataArrayAsJsonArray[index].quantity).toFixed(3));
            $(this).find('td').eq(0).children(".quantityBeforeChange").val(Number(VendorFinalizationTableDataArrayAsJsonArray[index].quantity).toFixed(3));
            var quantity = VendorFinalizationTableDataArrayAsJsonArray[index].quantity;
            var vendorPerUnitPrice = VendorFinalizationTableDataArrayAsJsonArray[index].vendorPerUnitPrice;
            var noteToApprover = VendorFinalizationTableDataArrayAsJsonArray[index].noteToApprover;
            $(this).find("td").eq(0).children(".prComments").val(noteToApprover);
            console.log("quantity: " + quantity);
            console.log("vendorPerUnitPrice: " + vendorPerUnitPrice);
            var netPrice = Number(quantity) * Number(vendorPerUnitPrice);
            console.log("netPrice: " + netPrice);
            var aaCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            var itemcat = $(this).find('td').eq(3).children(".itemCategoryClass").val();
            if (aaCat !== "U" || itemCat !== "D") {
                $(this).find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(Number(netPrice).toFixed(2)));
                $(this).find("td").eq(0).children(".prNetPriceHidden").val(Number(netPrice).toFixed(2));
            }
            $(this).find("td").eq(12).children(".pr-net-price").prop("disabled", true);
//            var NetPrice = calculateNetPrice(Quantity, ValuationPrice, PerUnit);
//            $(this).find("td").eq(9).text(NetPrice);
            $(this).find("td").eq(0).children(".prRfqNumber").val(VendorFinalizationTableDataArrayAsJsonArray[index].rfqNumber);
            $(this).find("td").eq(0).children(".prRfqLineItemNumber").val(VendorFinalizationTableDataArrayAsJsonArray[index].rfqLineItemNumber);
            $(this).find("td").eq(33).children(".pr-rfq-Number").val(VendorFinalizationTableDataArrayAsJsonArray[index].rfqNumber);
            $(this).find("td").eq(34).children(".pr-rfq-line-item-number").val(VendorFinalizationTableDataArrayAsJsonArray[index].rfqLineItemNumber);
        }
        else
        {
        }

        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var AccAsgnCat = "";
        $("#FirstReminderExpediter").val(10);
        $("#SecondReminderExpediter").val(20);
        $("#ThirdReminderExpediter").val(30);
//        $("#ValuationType").val("OWN_SEMI");
        Ref_Doc_Number += "<option>" + $(this).find("td").eq(0).children(".prNumber_Class").val() + "</option>";
        Ref_Doc_Line += "<option>" + $(this).find("td").eq(0).text().trim() + "</option>";
        var delDate = $(this).find("td").eq(11).children(".PR_DeliveryDate").html();
        var delDateCat = $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val();
        if (delDateCat === "D") {
            var dateArray = delDate.split("/");
            console.log("date :" + dateArray[0] + " ,month :" + dateArray[1] + " ,year :" + dateArray[2]);
            var newDate = dateArray[0] + "." + dateArray[1] + "." + dateArray[2];
            $(this).find("td").eq(11).children(".PR_DeliveryDate").text(newDate);
        }
        if (insertionid === id) {
            console.log("insertionid :" + insertionid + " " + "id :" + id);
            material_header_table_Currency = $(this).find("td").eq(13).children(".currencyClass").val();
            material_header_table_Current_td = $(this);
            $(".currency_Services").val(material_header_table_Currency);
            var acountAssgnCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            $("#accountAssignmentCategory").val(acountAssgnCat);
            var itemcatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
            var orderpriceunit = $(this).find("td").eq(0).children(".prOrderPriceUnitHidden").val();
            var quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            var uom = $(this).find('td').eq(7).children(".prUom").val();
            var perPrice = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
            var itemNumber = $(this).find('td').eq(24).text();
            var prNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
            var deliveryDate = $(this).find('td').eq(11).children(".PR_DeliveryDate").text();
            var deliveryDateDategory = $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val();
            var prMaterialCode = $(this).find("td").eq(0).children(".prMaterialCodeHidden").val();
            var invoiceReceiptHidden = $(this).find("td").eq(0).children(".invoiceReceiptHidden").val();
            var goodsReceiptHidden = $(this).find("td").eq(0).children(".goodsReceiptHidden").val();
            var prCompanyCode = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
            console.log("prMaterialCode: " + prMaterialCode);

            //Set Invoice Tab Fields Starts
            if (invoiceReceiptHidden === "true")
            {
                $("#InvoiceReceipt").prop("checked", true);
            }
            else
            {
                $("#InvoiceReceipt").prop("checked", false);
            }
            if (goodsReceiptHidden === "true")
            {
                $("#GRBasedIV").prop("checked", true);
            }
            else
            {
                $("#GRBasedIV").prop("checked", false);
            }
            $("#InvoiceReceipt").prop("disabled", true);
            $("#GRBasedIV").prop("disabled", true);
            $("#FinalInvoice").prop("disabled", true);
            //Set Invoice Tab Fields Ends

            // Delivery Schedule Tab Starts
            console.log("deliveryDate: " + deliveryDate);
            var newDD = "";
            if (deliveryDate !== "")
            {
                var ddSplit = deliveryDate.toString().split(".");
//                var months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "July": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"};
                var months = {"01": "01", "02": "02", "03": "03", "04": "04", "05": "05", "06": "06", "07": "07", "08": "08", "09": "09", "10": "10", "11": "11", "12": "12"};
                newDD = ddSplit[2] + "-" + months[ddSplit[1]] + "-" + ddSplit[0];
                console.log("newDD: " + newDD);
            }
//            $("#DeliveryScheduleTableId tbody tr").find("td").eq(1).children(".deliveryDateClass").attr("min", $("#currentDate").val());
            $("#DeliveryScheduleTableId tbody tr").find("td").eq(0).children(".deliveryDateCategory").val(deliveryDateDategory);
            $("#DeliveryScheduleTableId tbody tr").find("td").eq(1).children(".deliveryDateClass").val(deliveryDate);
            $("#DeliveryScheduleTableId tbody tr").find("td").eq(3).children(".scheduledQuantityClass").val(formatNumberByComma(quantity));
            $("#DeliveryScheduleTableId tbody tr").find("td").eq(5).children(".prNumberDeliveryScheduledClass").val(prNumber);
            $("#DeliveryScheduleTableId tbody tr").find("td").eq(6).children(".reqItemNumberClass").val(itemNumber);
            $("#DeliveryScheduleTableId tbody tr").find("td").eq(2).children(".statisticaldeliveryDateClass").val(deliveryDate);
            // Delivery Schedule Tab Ends

            // Quantity/Weight Tab Starts
            if (itemcatogory === 'D') {
                $("#pOQuantity").val(quantity !== "" ? formatNumberByComma(quantity) : "");
                $("#pOUnit").val(uom);
                $("#orderUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                $("#unitOrderUnit").val(uom);
                $("#orderPriceUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                $("#unitOrderPriceUnit").val(uom);
            }
            else
            {
                $("#pOQuantity").val(quantity !== "" ? formatNumberByComma(quantity) : "");
                $("#pOUnit").val(uom);
                $("#pOQuantitySKU").val(quantity !== "" ? formatNumberByComma(quantity) : "");
                $("#pOUnitSKU").val(uom);
                $("#orderUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                $("#orderUnit2").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                $("#unitOrderUnit").val(uom);
                $("#unitOrderUnit2").val(uom);
                $("#orderPriceUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                $("#sKUUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                $("#unitOrderPriceUnit").val(uom);
                $("#unitSKUUnit").val(uom);
            }
            // Quantity/Weight Tab Ends

            // Set Planned Delivery Time in Delivery Tab Starts
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "FindPlanDelvTimeByMaterialCode",
                    "materialCode": prMaterialCode
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    var PlannedDelvTime = obj.PlannedDelvTime;
                    console.log("PlannedDelvTime: " + PlannedDelvTime);
                    if (PlannedDelvTime !== "PlannedDelvTimeIsNullOrEmpty" && PlannedDelvTime !== "NoTimeFound")
                    {
                        $("#PlDeliveryTime").val(PlannedDelvTime);
                    }
                }
            });
            // Set Planned Delivery Time in Delivery Tab Ends

            // Set Valuation Type field in delivery tab by nikhil on 12112020
            if ($("#PrType").val() === "Material") {
                var jsonMaterialArr = getMaterialMasterOnLoad(prMaterialCode, prCompanyCode);
                console.log("jsonMaterialArr len2: " + jsonMaterialArr.length);
                if (jsonMaterialArr.length > 0) {
                    var valuationType = jsonMaterialArr[0].valuationType;
                    console.log("valuationType: " + valuationType);
                    $("#ValuationType").val(valuationType);
                }
            } else {
                $("#ValuationType").val("");
            }

            // Check print price by default in condition control tab on load
            $("#PrintPrice").prop("checked", true);

            if (itemcatogory === 'D') {
                $("#serviceTab_li").css("display", "none");
                $("#services-tab").removeClass("active");
                $("#limits-tab").addClass("active");
                var priceunit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
//                $(this).find("td").eq(11).text(priceunit); //Commented by nikhil on 11082020
            } else {
                $("#serviceTab_li").css("display", "block");
                $("#services-tab").addClass("active");
                $("#limits-tab").removeClass("active");
            }

//            $("#component_linelevel").css("display", "none");
            $("#componentPopUpBtnDiv").css("display", "none");
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var pr_linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
                var pr_itemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                var pr_quantity = $(this).find("td").eq(6).children(".pr-quantity").val();
                var insertionid = $(".ItemNumberSelectClass").val();
                console.log("ItemCat: " + itemcatogory);
                if (id === insertionid) {
                    if (acountAssgnCat === "" && itemcatogory === "L") {                    
                        console.log("ItemCat: " + itemcatogory);
    //                        $("#component_linelevel").css("display", "block");
                        $("#componentPopUpBtnDiv").css("display", "block");
                        $("#GRNonValuated").prop("checked", false);
                        $("#GRNonValuated").prop("disabled", false);                             
                        saveComponentsFromCmplxTableToLocalTable(pr_linkId, insertionid, pr_itemNumber, pr_quantity);
                    } else {
                        $("#GRNonValuated").prop("checked", true);
                        $("#GRNonValuated").prop("disabled", true);
                    }
                }
            });
            if (id === insertionid) {
                var materialPOText = $(this).find("td").eq(5).children(".pr-short-text").val();
                $("#MaterialPOText").val(materialPOText);
                $("#MaterialPOText").prop("disabled", true);
            }

            var materialcode = $(this).find("td").eq(0).children(".prMaterialCodeHidden").val();
//            $(this).find("td").eq(1).children(".accountAssignmentClass").prop("disabled", false); //Commented by nikhil on 11082020
//            $(this).find("td").eq(2).children(".itemCategoryClass").prop("disabled", false); //Commented by nikhil on 11082020
            // Set Acc Ass Cat in AccAss Tab Starts
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
                    var AccAssCat = obj.AccAssCat;
                    console.log("AccAssCat: " + AccAssCat);
                    if (AccAssCat !== "NotFound")
                    {
                        $("#accountAssignmentCategoryDisplay").val(AccAssCat);
                    }
                }
            });
            // Set Acc Ass Cat in AccAss Tab Ends
            
            if ($("#PrType").val() === "Material" && acountAssgnCat !== "") {
                $("#replicateMainAccAssBtn").prop("disabled", false);
            } else {
                $("#replicateMainAccAssBtn").prop("disabled", true);
            }
        }

        // Set IM Material, MFR Part Number and Manufacturer
        var prMatCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
        if (prMatCode !== "") {
            console.log("prMatCode: " + prMatCode);
            var masterMaterialMARADetailsObj = findMasterMaterialMARAByMatCode(prMatCode);
            if (masterMaterialMARADetailsObj["Result"] === "Found") {
                if (masterMaterialMARADetailsObj["MFRPN"] !== undefined && masterMaterialMARADetailsObj["MFRPN"] !== ""
                        && masterMaterialMARADetailsObj["MFRNR"] !== undefined && masterMaterialMARADetailsObj["MFRNR"] !== "") {
                    $(this).find("td").eq(30).children(".prImMaterial").val(prMatCode);
                }
                if (masterMaterialMARADetailsObj["MFRPN"] !== undefined) {
                    $(this).find("td").eq(0).children(".prMfrPartNumber").val(masterMaterialMARADetailsObj["MFRPN"]);
                }
                if (masterMaterialMARADetailsObj["MFRNR"] !== undefined) {
                    $(this).find("td").eq(0).children(".prManufacturer").val(masterMaterialMARADetailsObj["MFRNR"]);
                }
                if (index === 0) {
                    if (masterMaterialMARADetailsObj["MFRPN"] !== undefined) {
                        $("#mfrPartNumber").val(masterMaterialMARADetailsObj["MFRPN"]);
                    }
                    if (masterMaterialMARADetailsObj["MFRNR"] !== undefined) {
                        $("#manufacturer").val(masterMaterialMARADetailsObj["MFRNR"]);
                    }
                }
            }
        }


    });
//    var QuantityWeightAsJsonString = JSON.stringify(QuantityWeightJsonArray);
//    console.log("QuantityWeightAsJsonString: " + QuantityWeightAsJsonString);
//    saveQuantityWeightForMultiplePr(QuantityWeightAsJsonString);
    $("#referenceDocNumber").append(Ref_Doc_Number);
    $("#referenceDocLine").append(Ref_Doc_Line);
    var insertionid = $("#ItemNumberSelect").val();
    var linkid;
    var PrType = $("#PrType").val();
    console.log("PrType 424: " + PrType);
    var LinkID;
    var linkidArray = [];
    var lineItemNumber = "";
    var lineItemNumberArr = [];
    var PrItemNumber = "";
    var PrItemNumberArr = [];
    var assAsgnCat = "";
    var accAsgnCatArr = [];
    var PrLinkID = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var itemcatogory;
//        LinkID = ($(this).find("td").eq(0).children(".linkId_Class").val()).trim();
//        lineItemNumber = ($(this).find("td").eq(1).children(".insertionOrderId_Class").val()).trim();
//        PrItemNumber = ($(this).find("td").eq(0).children(".PRItemNumber_Class").val()).trim();
//        assAsgnCat = ($(this).find("td").eq(1).children(".accountAssignmentClass").val()).trim();
//        lineItemNumberArr.push(lineItemNumber);
//        PrItemNumberArr.push(PrItemNumber);
//        accAsgnCatArr.push(assAsgnCat);
        if (insertionid === id) {
            linkid = ($(this).find("td").eq(0).children(".linkId_Class").val()).trim();
            linkidArray.push(linkid);
            lineItemNumber = ($(this).find("td").eq(0).children(".insertionOrderId_Class").val()).trim();
            PrItemNumber = ($(this).find("td").eq(0).children(".PRItemNumber_Class").val()).trim();
            assAsgnCat = ($(this).find("td").eq(2).children(".accountAssignmentClass").val()).trim();
            lineItemNumberArr.push(lineItemNumber);
            PrItemNumberArr.push(PrItemNumber);
            accAsgnCatArr.push(assAsgnCat);
            console.log("insertionid bt:" + insertionid + " " + "id :" + id);
            var accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
            material_header_table_Currency = $(this).find("td").eq(13).children(".currencyClass").val();
            itemcatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
            material_header_table_Current_td = $(this);
            if (itemcatogory !== 'D') {
                $("#serviceTab_li").css("display", "none");
                $("#services-tab").removeClass("active");
                $("#services").removeClass("active");
                $("#limits_li").css("display", "none");
//                $("#quantities-tab").addClass("active");
//                $("#quantities").addClass("active");
                $("#material-tab").addClass("active");
                $("#material").addClass("active");
                var priceunit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
//                $(this).find("td").eq(11).text(priceunit); //Commented by nikhil on 11082020
            } else {
                $("#serviceTab_li").css("display", "block");
                $("#services-tab").addClass("active");
                $("#limits-tab").removeClass("active");
            }
            if (PrType === "Service") {
                if (accountAssignmentCategory === 'K') {
                    service_AccAsgnCat_K("onLoad");
                    limits_AccAsgnCat_K("onLoad");
                } else if (accountAssignmentCategory === 'N') {
                    service_AccAsgnCat_N("onLoad");
                    limits_AccAsgnCat_N("onLoad");
                } else if (accountAssignmentCategory === 'A') {
                    service_AccAsgnCat_A("onLoad");
                    limits_AccAsgnCat_A("onLoad");
                } else if (accountAssignmentCategory === 'B') {
                } else if (accountAssignmentCategory === 'C') {
                    service_AccAsgnCat_C("onLoad");
                    limits_AccAsgnCat_C("onLoad");
                } else if (accountAssignmentCategory === 'D') {
                } else if (accountAssignmentCategory === 'E') {
                } else if (accountAssignmentCategory === 'F') {
                    service_AccAsgnCat_F("onLoad");
                    limits_AccAsgnCat_F("onLoad");
                } else if (accountAssignmentCategory === 'G') {
                } else if (accountAssignmentCategory === 'M') {
                } else if (accountAssignmentCategory === 'P') {
                    service_AccAsgnCat_P("onLoad");
                    limits_AccAsgnCat_P("onLoad");
                } else if (accountAssignmentCategory === 'Q') {
                } else if (accountAssignmentCategory === 'R') {
                    service_AccAsgnCat_R("onLoad");
                    limits_AccAsgnCat_R("onLoad");
                } else if (accountAssignmentCategory === 'T') {
                } else if (accountAssignmentCategory === 'U') {
                } else if (accountAssignmentCategory === 'X') {
                    service_AccAsgnCat_X("onLoad");
                    limits_AccAsgnCat_X("onLoad");
                } else if (accountAssignmentCategory === 'Z') {
                    service_AccAsgnCat_Z("onLoad");
                    limits_AccAsgnCat_Z("onLoad");
                }
                var PoFrom = $("#PoFrom").val();
                if ($("#PoFrom").val() === "createpo" || $("#PoFrom").val() === "byrfq") {
                    saveServiceAndAccountAssignment(linkidArray, lineItemNumberArr, PrItemNumberArr, accAsgnCatArr, linkid);
                }
            }
            var accountAssignmentCategory = $("#accountAssignmentCategory").val();
            if (accountAssignmentCategory === 'K') {
                accAsgnCat_K_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'N') {
                accAsgnCat_N_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'A') {
                accAsgnCat_A_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'B') {
                accAsgnCat_B_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'C') {
                accAsgnCat_C_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'D') {
                accAsgnCat_D_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'E') {
                accAsgnCat_E_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'F') {
                accAsgnCat_F_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'G') {
                accAsgnCat_G_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'M') {
                accAsgnCat_M_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'P') {
                accAsgnCat_P_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'Q') {
                accAsgnCat_Q_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'R') {
                accAsgnCat_R_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'T') {
                accAsgnCat_T_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'U') {
                accAsgnCat_U_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'X') {
                accAsgnCat_X_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'Z') {
                accAsgnCat_Z_Dist_SAA("onLoad");
            }
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data:
                        {
                            "reqFrom": "getCmplxPRToPOLineItemServiceByLinkId",
                            "linkid": linkid
                        },
                dataType: "json",
                complete: function(responseJson)
                {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Servcie Tab Len: " + obj.length);
                    var row = "";
                    $("#serviceTableId tbody tr").remove();
                    for (var i = 0; i < obj.length; i++) {
                        if (i === 0) {
                            row += "<tr>\n\
                                    <td><input type='checkbox' class='checkboxServices' title='View service account assignment'>\n\
                                    <input type='hidden' class='isProfitabilitySegmentDataSaved' value='No'>\n\
                                    <input type='hidden' class='saveSarviceAccountAssignment' value='No'>\n\
                                    <input type='hidden' class='ServiceAccAssDist' value='" + (obj[i].DISTRIBUTION === undefined ? "" : obj[i].DISTRIBUTION) + "'>\n\
                                    <input type='hidden' class='lineNumberService'>\n\
                                    <input type='hidden' class='LinkId' value=" + obj[i].LINKID + ">\n\
                                    <input type='hidden' class='serviceId' value=" + obj[i].SERVICE_ID + ">\n\
                                    <input type='hidden' class='ServiceLinkId' value=" + obj[i].SERVICELINKID + "></td>\n\
                                    <td></td>\n\
                                    <td><input type='text' class='form-control form-rounded lineItemNumberServices tableInputField' readonly value='" + obj[i].SERVICE_LINE_ITEM_NUMBER + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded ServicesNumber_Services tableInputField' style='width: 100px;' readonly value='" + obj[i].SERVICE_NUMBER + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded shortText_Services tableInputField' style='width: 150px;display: inline-block;' readonly value='Short text...'> <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' class='form-control form-rounded quantity_Services tableInputField' style='width:150px;' value='" + formatNumberByComma(Number(obj[i].QUANTITY).toFixed(3)) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded servicesUnit_Services tableInputField' style='width:70px;' readonly value='" + obj[i].UNIT + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded grossPrice_Services tableInputField' style='width:150px;' value='" + formatAmountByComma(Number(obj[i].GROSS_PRICE).toFixed(2)) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded currency_Services tableInputField'style='width: 55px;' readonly value='" + obj[i].CURRENCY + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded netPrice_Services tableInputField' style='width:150px;' readonly value='" + formatAmountByComma(Number(obj[i].NET_PRICE).toFixed(2)) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded edition_Services tableInputField' style='width:100px;' readonly value='" + obj[i].EDITION + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded lineItemLongText_Services tableInputField' readonly style='width: 150px;display: inline-block;' value='Line item long text...'> <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' class='form-control form-rounded overfTolerance_Services tableInputField' readonly value='" + obj[i].OVERF_TOLERANCE + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceNetValue tableInputField' style='width:150px;' readonly value='" + (obj[i].NET_VALUE !== undefined ? formatAmountByComma(Number(obj[i].NET_VALUE).toFixed(2)) : "") + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceActualQty tableInputField' readonly value=''></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded serviceText tableInputField' readonly value='Service text...' style='width: 150px;display: inline-block;'> <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td>\n\
                                    <td><i title='Delete Row' class='fa fa-window-close btn-lg deleteServiceTebleRow' aria-hidden='true' style='width:10px;'></i></td>\n\
                                </tr>";
                        } else {
                            row += "<tr>\n\
                                    <td><input type='checkbox' class='checkboxServices' title='View service account assignment'>\n\
                                    <input type='hidden' class='isProfitabilitySegmentDataSaved' value='No'>\n\
                                    <input type='hidden' class='saveSarviceAccountAssignment' value='No'>\n\
                                    <input type='hidden' class='ServiceAccAssDist' value='" + (obj[i].DISTRIBUTION === undefined ? "" : obj[i].DISTRIBUTION) + "'>\n\
                                    <input type='hidden' class='lineNumberService'>\n\
                                    <input type='hidden' class='LinkId' value=" + obj[i].LINKID + ">\n\
                                    <input type='hidden' class='serviceId' value=" + obj[i].SERVICE_ID + ">\n\
                                    <input type='hidden' class='ServiceLinkId' value=" + obj[i].SERVICELINKID + "></td>\n\
                                    <td></td>\n\
                                    <td><input type='text' class='form-control form-rounded lineItemNumberServices tableInputField' readonly value='" + obj[i].SERVICE_LINE_ITEM_NUMBER + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded ServicesNumber_Services tableInputField' style='width: 100px;' readonly value='" + obj[i].SERVICE_NUMBER + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded shortText_Services tableInputField' style='width: 150px;display: inline-block;' readonly value='Short text...'> <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' class='form-control form-rounded quantity_Services tableInputField' style='width:150px;' value='" + formatNumberByComma(Number(obj[i].QUANTITY).toFixed(3)) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded servicesUnit_Services tableInputField' style='width:70px;' readonly value='" + obj[i].UNIT + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded grossPrice_Services tableInputField' style='width:150px;' value='" + formatAmountByComma(Number(obj[i].GROSS_PRICE).toFixed(2)) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded currency_Services tableInputField' style='width: 55px;' readonly value='" + obj[i].CURRENCY + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded netPrice_Services tableInputField' style='width:150px;' readonly value='" + formatAmountByComma(Number(obj[i].NET_PRICE).toFixed(2)) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded edition_Services tableInputField' style='width:100px;' readonly value='" + obj[i].EDITION + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded lineItemLongText_Services tableInputField' readonly style='width: 150px;display: inline-block;' value='Line item long text...'> <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' class='form-control form-rounded overfTolerance_Services tableInputField' readonly value='" + obj[i].OVERF_TOLERANCE + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceNetValue tableInputField' style='width:150px;' readonly value='" + (obj[i].NET_VALUE !== undefined ? formatAmountByComma(Number(obj[i].NET_VALUE).toFixed(2)) : "") + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceActualQty tableInputField' readonly value=''></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded serviceText tableInputField' readonly value='Service text...' style='width: 150px;display: inline-block;'> <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td>\n\
                                    <td><i title='Delete Row' class='fa fa-window-close btn-lg deleteServiceTebleRow' aria-hidden='true' style='width:10px;'></i></td>\n\
                                </tr>";
                        }
                    }
                    $("#serviceTableId tbody").append(row);
                }
            });
            var PoFrom = $("#PoFrom").val();
            if (PoFrom === "createpo" || PoFrom === "byrfq" || PoFrom === "shortcutPo") {
                $("#serviceTableId tr").each(function() {
                    $(this).find("th").eq(1).css("display", "none");
                    $(this).find("td").eq(1).css("display", "none");
                });
            } else {
                $("#serviceTableId tr").each(function() {
                    $(this).find("th").eq(1).css("display", "");
                    $(this).find("td").eq(1).css("display", "");
                });
            }
            var plant = $(this).find("td").eq(16).children(".hiddenPlantCode").val();
            var requirementDate = $(this).find("td").eq(0).children(".prRequisitionDateHidden").val();
            var matCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            var itemNumber = $(this).find("td").eq(1).text();
            var prQuantity = $(this).find("td").eq(6).children(".pr-quantity").val();
            getMasterMaterialGeneral(matCode, plant, requirementDate, itemNumber, prQuantity);
            var prType = $(this).find("td").eq(0).children(".prType_Class").val();
            /*-----------For Populate values in AccountAssignment Distribution dropdown------*/
//            if (prType === 'Capital PR for Services' || prType === 'PR for Services') {
//                getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId(linkid);
//            }
        }
    });


    $(".rightCircle").click(function() {
        $(".collapseDiv").toggle();
        $(this).find("i").toggleClass("fa-minus-square fa-plus-square");
    });
    $(".rightCircle2").click(function() {
        $(".collapseDiv2").toggle();
        $(this).find("i").toggleClass("fa-minus-square fa-plus-square");
    });
    $(".rightCircle3").click(function() {
        $(".collapseDiv3").toggle();
        $(this).find("i").toggleClass("fa-minus-square fa-plus-square");
    });
    var date = moment();
    console.log(date.format('DD-MM-YYYY'));
    $("#transactionInitiatedOn").html(date.format('DD-MM-YYYY'));
    if ($("#docDateHeader_div").length) {
        $('#docDateHeader_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date(),
            defaultDate: new Date()
        });
    }

    var companycode = $("#ro_companyCode").val();

    var PRType = $("#ro_PRType").val();
    if (PRType === "Service") {
        $("#purchasingGroup").val("N18");
//            $('#purchasingGroup [value=N18').attr('selected', true);
    } else if (PRType === "Material") {
        $("#purchasingGroup").val("N19");
    }

    $("#referenceDocumentType").change(function() {
        var referenceDocumentType = $("#referenceDocumentType").val();
        if (referenceDocumentType === 'N/A') {
            $("#referenceDocumentNumber").attr('disabled', 'true');
            $("#referenceDocumentLine").attr('disabled', 'true');
            $("#purchasingOrg").attr('disabled', true);
            $("#purchasingGroup").attr('disabled', true);
        } else {

            $("#referenceDocumentNumber").attr('disabled', false);
            $("#referenceDocumentLine").attr('disabled', false);
            $("#purchasingOrg").attr('disabled', false);
            $("#purchasingGroup").attr('disabled', false);
        }

        if (referenceDocumentType === 'RFQ' || referenceDocumentType === 'Purchase Requisition') {
//            $("#currencyDeliveryInvoice").attr('disabled', true);
//            $("#exchangeRate").attr('disabled', true);
        } else {
            $("#currencyDeliveryInvoice").attr('disabled', false);
            $("#exchangeRate").attr('disabled', false);
        }

        if (referenceDocumentType === 'RFQ') {
            $("#vendorcodeHeader").attr('disabled', true);
            $("#vendorNameHeader").attr('disabled', true);
        } else {
            $("#vendorcodeHeader").attr('disabled', false);
            $("#vendorNameHeader").attr('disabled', false);
        }

    });
    
    var pricingprocedure = "";
    $("#vendorMasterTable").on("click", ".select-vendor-from-vendor-master", function() {
//    $("#vendorcodeHeader").change(function() {
        var vendorSnoFromVM = $(this).parent().children(".vendorSno").val();
        var vendorCodeFromVM = $(this).parent().children(".vendorCode").val();
        var vendorNameFromVM = $(this).parent().children(".vendorName").val();                
        console.log("vendorSnoFromVM: " + vendorSnoFromVM);
        console.log("vendorCodeFromVM: " + vendorCodeFromVM);
        console.log("vendorNameFromVM: " + vendorNameFromVM);
        $("#vendorSno").val(vendorSnoFromVM);
        $("#vendorcodeHeader").val(vendorNameFromVM + "-" + vendorCodeFromVM);
        $("#vendorMasterModal").modal("hide");
        
        $("#overlay").css("display", "block");
        var sno = vendorSnoFromVM; // $("#vendorcodeHeader :selected").val();
        var orgData = $("#purchasingOrg").val();
        $('#vendorNameHeader').val(sno);
        $('.selectpicker').selectpicker('refresh');
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data:
                    {
                        "reqFrom": "getVendorBySno",
                        "sno": sno
                    },
            dataType: "json",
            complete: function(responseJson)
            {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("obj.PURCHASE_ORG: " + obj.PURCHASE_ORG);
                $("#postalCodeVendorAddress").val(obj.POSTAL_CODE);
                $("#cityVendorAddress").val(obj.CITY);
                $("#telephoneVendorAddress").val(obj.CONTACT);
                $("#countryVendorAddress").val(obj.COUNTRY);
                $("#countryCodeVendorAddress").val(obj.COUNTRY_CODE);
                $("#purchasingOrg").val(obj.PURCHASE_ORG);
                $("#paymentTermsDelivery").val(obj.PAYMENT_TERM);
                $("#streetVendorAddress").val(obj.STREET);
                $("#houseNumberVendorAddress").val(obj.ADDRESS1 + ", " + obj.ADDRESS2 + ", " + obj.ADDRESS3);
                $("#extFax").val(obj.FAX_EXT);
                $("#faxVendorAddress").val(obj.FAX_NO);
                $("#vendorEmail").val(obj.EMAILID);
                $("#IncoTermsPart1").val(obj.INCO_TERM1);
                $("#IncoTermsPart2").val(obj.INCO_TERM2);
                $("#regNoHidden").val(obj.REGNO);
                orgData = obj.PURCHASE_ORG;
                orgData = orgData.replace(/^0+/, '');
                $("#kalsmHiddenfield").val(obj.kalsm);
                var kalsm = obj.kalsm;
                console.log("kalsm: " + kalsm);
                Lobibox.notify("info", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please wait, fetching conditions..."
                });
                setTimeout(
                        function()
                        {
                            $("#conditionHeaderReqFrom").val("VendorChange");
                            getAllByPricingProcedure(kalsm);
                            var PrType = $("#PrType").val();
                            if (PrType === "Service") {
                                calculationForPBXX();
                            }
                            /*********************Save Line Level Condition On Vendor Change on 27Aug2020***************/
                            deleteAllConditionsOnLoad();
                            saveConditionTabDataOnLoadFieldChange("VendorChange");
                            /*********************Save Line Level Condition On Vendor Change End on 27Aug2020***************/
                            if (obj.PAYMENT_TERM !== "")
                            {
                                var WebServiceCallIp = $("#WebServiceCallIp").val();
                                console.log("WebServiceCallIp: " + WebServiceCallIp);
                                var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_ListPaymentTerms?PaymentTerm=" + obj.PAYMENT_TERM;
                                console.log("serviceUrl: " + serviceUrl);
                                var local_dev_uat = $("#local_dev_uat").val();
                                console.log("local_dev_uat: " + local_dev_uat);
                                if (local_dev_uat === "dev" || local_dev_uat === "uat")
                                {
                                    console.log("Calling Web Service...");
                                    $("#overlay").css("display", "block");
                                    $.ajax({
                                        type: "GET",
                                        url: serviceUrl,
                                        contentType: "application/xml",
                                        dataType: "xml",
                                        async: false,
                                        success: function(data, textStatus, jqXHR) {
                                            console.log("success: " + data);
                                            fetchPaymentInDays(data);
                                            setOverDelivTolAndUnderDelvTolInDelvTab("VendorChange");
                                            $("#overlay").css("display", "none");
                                        }
                                    });
                                }
                                else
                                {
                                    fetchPaymentInDaysFromLocal("");
                                    setOverDelivTolAndUnderDelvTolInDelvTab("VendorChange");
                                    $("#overlay").css("display", "none");
                                }
                            }
                            else
                            {
                                $("#overlay").css("display", "none");
                            }
                        }
                , 1000);
            }
        });
    });
    
    $("#vendorNameHeader").change(function() {
        var sno = $("#vendorNameHeader").val();
        $('#vendorcodeHeader').val(sno);
        $('.selectpicker').selectpicker('refresh');
        var obj = vendorBySno(sno, "VendorName");
    });


    $("#downPaymentReqd").change(function() {
        var downPaymentReqd = $("#downPaymentReqd").val();
        if (downPaymentReqd === "Yes") {
            $("#downPaymentReqdValue").prop("disabled", false);
            $("#downPaymentFor").prop("disabled", false);
        } else if (downPaymentReqd === "No") {
            $("#downPaymentReqdValue").prop("disabled", true);
            $("#downPaymentFor").prop("disabled", true);
        }
    });
    $(".manual-date-input-check").keyup(function() {

        var from_date = $(this).val();
        if (from_date !== "")
        {
            if (from_date.length === 2)
            {
                if (from_date > 31)
                {
                    Lobibox.alert("error", {
                        msg: "Enter valid day!"
                    });
//                    $(this).focus();
                    return false;
                }
                $(this).val(from_date + "-");
            }
            if (from_date.length === 5)
            {
                var month = from_date.substr(from_date.indexOf("-") + 1, 2);
                console.log("month: " + month);
                if (month > 12)
                {
                    Lobibox.alert("error", {
                        msg: "Enter valid month!"
                    });
//                    $(this).focus();
                    return false;
                }
                $(this).val(from_date + "-");
            }
            if (from_date.length > 10)
            {

            }
        }
    });
    if ($("#TransactionInitiatedOn").length) {
        $('#TransactionInitiatedOn').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }

    if ($("#DocumentDate").length) {
        $('#DocumentDate').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#ConditionPricingDate").length) {
        $('#ConditionPricingDate').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#RequisitionDate").length) {
        $('#RequisitionDate').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#DeliveryDate").length) {
        $('#DeliveryDate').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#DelSch_DeliveryDate").length) {
        $('#DelSch_DeliveryDate').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#RequirementDate").length) {
        $('#RequirementDate').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#LatestGRDate").length) {
        $('#LatestGRDate').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#ConditionPricingDate2").length) {
        $('#ConditionPricingDate2').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }

//    if ($("DeliveryScheduleTableId tbody tr").find("tr").eq(1).children(".deliveryDateClass").length) {
//        $("DeliveryScheduleTableId tbody tr").find("tr").eq(1).children(".deliveryDateClass").datetimepicker({
//            format: 'DD-MM-YYYY',
//            minDate: new Date()
////            defaultDate : deliveryDate
//        });
//    }
//    $("#CreatorID").change(function() {

//    });
//    $('#TransactionInitiatedOn').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#DocumentDate').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#ConditionPricingDate').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#RequisitionDate').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#DeliveryDate').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#DelSch_DeliveryDate').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#RequirementDate').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#LatestGRDate').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });
//    $('#ConditionPricingDate2').datepicker({
//        uiLibrary: 'bootstrap4',
//        format: 'dd-mm-yyyy'
//    });

    $(".finish-btn").click(function() {
//        $("#overlay").css("display", "block");


        $("#createpoform").submit();
    });
//   

    $("#country").change(function() {
        var country = $("#country").val();
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getCompanyCodeByCompany",
                "country": country
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Data.COUNTRYCODE);
                console.log(obj.Data.CURRENCY);
                var countrycode = obj.Data.COUNTRYCODE;
                var currency = obj.Data.CURRENCY;
                $("#countrycode").val(countrycode);
                $("#ordercurrency").val(currency);
            }
        });
    });
    $("#itemCategoryTableId").on("click", ".itemCategoryCheckboxClass", function() {
        var reqFrom = $("#ro_ItemCategory").val();
        var itemCategory = $(this).parent().parent().find("td").eq(1).html();
        if (reqFrom === "ProfitabilitySegment") {
            $("#ItemCategory").val(itemCategory);
            $("#itemCategoryModal").modal("hide");
        } else if (reqFrom === "LineTable") {
            var itemCatDesc = $(this).parent().parent().find("td").eq(2).html();
            var accountAssignmentCategory;
            var desc;
            var accAsgnDesc;
            var id = currentTd.parent().find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                console.log("insertionid :" + insertionid + " " + "id :" + id);
                accountAssignmentCategory = currentTd.parent().find("td").eq(2).children(".accountAssignmentClass").val();
                desc = $(this).find("td").eq(1).children(".accountAssignmentDescClass").val();
                $("#accountAssignmentCategoryTableId tbody tr").each(function() {
                    var accAsgn = $(this).find("td").eq(1).html();
                    if (accAsgn === accountAssignmentCategory) {
                        accAsgnDesc = $(this).find("td").eq(2).html();
                    }
                });
                currentTd.children(".itemCategoryClass").val(itemCategory);
                $(".itemCategoryCheckboxClass").prop("checked", false);
                $("#itemCategoryModal").modal("hide");
                if ((accountAssignmentCategory === 'K')) {
                    if (itemCategory === 'K') {
                        Lobibox.alert("error", {
                            msg: "" + accAsgnDesc + " & " + itemCatDesc + " is not a valid combination!"
                        });
                        currentTd.parent().find("td").eq(2).children(".accountAssignmentClass").val("");
                        currentTd.parent().find("td").eq(3).children(".itemCategoryClass").val("");
                    }
                }
                if ((accountAssignmentCategory === 'B' || accountAssignmentCategory === 'D' || accountAssignmentCategory === 'E' || accountAssignmentCategory === 'G' || accountAssignmentCategory === 'M' ||
                        accountAssignmentCategory === 'Q' || accountAssignmentCategory === 'T')) {
                    if (itemCategory === 'D') {
                        Lobibox.alert("error", {
                            msg: "" + accAsgnDesc + " & " + itemCatDesc + " is not a valid combination!"
                        });
                        currentTd.parent().find("td").eq(2).children(".accountAssignmentClass").val("");
                        currentTd.parent().find("td").eq(3).children(".itemCategoryClass").val("");
                        if ($("#services").hasClass("active") === true) {
                            $("#serviceTab_li").css("display", "none");
                            $("#services-tab").removeClass("active");
                            $("#services").removeClass("active");
                            $("#limits_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                            $("#material").addClass("active");
                            $("#material-tab").addClass("active");
                            $("#material-tab").addClass("show");
                        } else if ($("#limits").hasClass("active") === true) {
                            $("#limits_li").css("display", "none");
                            $("#limits-tab").removeClass("active");
                            $("#limits").removeClass("active");
                            $("#serviceTab_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                            $("#material").addClass("active");
                            $("#material-tab").addClass("active");
                            $("#material-tab").addClass("show");
                        } else {
                            $("#serviceTab_li").css("display", "none");
                            $("#limits_li").css("display", "none");
                        }
                        return false;
                    }
                } else {
                    $("#serviceTab_li").css("display", "block");
                    $("#limits_li").css("display", "block");
                    if (itemCategory !== 'D') {
                        if ($("#services").hasClass("active") === true) {
                            $("#serviceTab_li").css("display", "none");
                            $("#services-tab").removeClass("active");
                            $("#services").removeClass("active");
                            $("#limits_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                            $("#material").addClass("active");
                            $("#material-tab").addClass("active");
                            $("#material-tab").addClass("show");
                        } else if ($("#limits").hasClass("active") === true) {
                            $("#limits_li").css("display", "none");
                            $("#limits-tab").removeClass("active");
                            $("#limits").removeClass("active");
                            $("#serviceTab_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                            $("#material").addClass("active");
                            $("#material-tab").addClass("active");
                            $("#material-tab").addClass("show");
                        } else {
                            $("#serviceTab_li").css("display", "none");
                            $("#limits_li").css("display", "none");
                        }
                    } else {
                        $("#serviceTab_li").css("display", "block");
                        $("#limits_li").css("display", "block");
                    }
                }

            }
        }
//        });
    });
    
    $("#conditionDetailsLineBtn").click(function() {
        $("#conditiondetailsForm").trigger("reset");
        $("#conditiondetailsModal").modal("show");
        var vendorname = [];
        var currency1 = conditionTableCurrentClick.parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val(); // PO Currency
        var currency2 = conditionTableCurrentClick.parent().parent().find("td").eq(9).children(".Currency2LineLevel").val(); // Local Currency
        var pricingUnit = conditionTableCurrentClick.parent().parent().find("td").eq(6).children(".ConditionPricingUnitLineLevel").val();
        var Uom = conditionTableCurrentClick.parent().parent().find("td").eq(7).children(".UoMLineLevel").val();
        var amount = removeCommaInNumber(conditionTableCurrentClick.parent().parent().find("td").eq(3).children("input[name=AmountLineLevel]").val());
        var condValue = removeCommaInNumber(conditionTableCurrentClick.parent().parent().find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
        var condType = conditionTableCurrentClick.parent().parent().find("td").eq(1).children("input[name=ConditionTypeLineLevel]").val();
        var condName = conditionTableCurrentClick.parent().parent().find("td").eq(2).children("input[name=nameConditionsLineLevel]").val();
        var kappl = conditionTableCurrentClick.parent().parent().find("td").eq(17).children(".conditionKAPPL").val();
        var kvsl1 = conditionTableCurrentClick.parent().parent().find("td").eq(17).children(".conditionKVSL1").val();
        var kvsl2 = conditionTableCurrentClick.parent().parent().find("td").eq(17).children(".conditionKVSL2").val();
        var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        vendorname = vendor.split("-");
        vendor = conditionTableCurrentClick.parent().parent().find("td").eq(0).children(".conditionVendor").val();
        var fromCurrency;
        var item;
//        var toCurrency = conditionTableCurrentClick.parent().parent().find("td").eq(6).children(".CurrencyLineLevel").val();
        var insertionid = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                item = $(this).find("td").eq(1).text();
            }
        });
        var toCurrency1 = currency1;
        var toCurrency2 = currency2;
        var exchangeRate1 = getExchangeRate(toCurrency1, fromCurrency);
        var exchangeRate2 = getExchangeRate(toCurrency2, fromCurrency);
        console.log("exchangeRate1: " + exchangeRate1);
        console.log("exchangeRate2: " + exchangeRate2);
        $("#amountConditions").val(amount);
        $("#conditionValueConditions").val(condValue);
        $("#currency1Conditions").val(currency1);
        $("#currency2Conditions").val(currency2);
        $("#pricingUnitConditions").val(pricingUnit);
        $("#uoMConditionValuesConditions").val(Uom);
        $("#currencyConditions").val(currency1);
        $("#currencyPr").val(currency2);
        $("#ExchangeRateCondition").val(exchangeRate1);
        $("#ExchangeRatePr").val(exchangeRate2);
        $("#condTypeConditions").val(condType);
        $("#condNameConditions").val(condName);
        $("#itemConditions").val(item);
        $("#applicationConditions").val(kappl);
        $("#AccountKey").val(kvsl1);
        $("#accrualsAccountDetermination").val(kvsl2);
        $("#vendorCondition").val(vendor);
    });
    $("#amountConditions").change(function() {
        var amount = $(this).val();
        var condType;
        var per;
        var name;
        var Quantity;
        var fromCurrency;
        var toCurrency;
        var grossCondVal;
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var isChecked = $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop("checked");
            if (isChecked === true) {
                condType = $(this).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").val();
                name = $(this).find("td").eq(2).children("input[name=nameConditionsLineLevel]").val();
                per = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                grossCondVal = removeCommaInNumber($(this).parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueLineLevel").val());
                var insertionid = $("#ItemNumberSelect").val();
                $("#material_headerClass tbody tr").each(function() {
                    var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    if (insertionid === itemDropdownId) {
                        Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                        fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                    }
                });
                var fml = formula(condType);
                var exp = new String(fml);
                var poQty = Quantity;
                var perQty = per;
                var condValue = eval(exp.toString());
                if (toCurrency === fromCurrency || toCurrency === '%') {
                    $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(condValue));
                    $("#conditionValueConditions").val(condValue);
                } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                    var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                    if (exchangeRate === "") {
                        exchangeRate = 1;
                    }
                    $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(condValue * exchangeRate));
                    $("#conditionValueConditions").val(condValue * exchangeRate);
                }
                $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(amount));
                if (condType === 'PBXX') {
                    var taxCode = $("#TaxCode").val();
                    var companycode = $("#companycodeHeader").val();
                    var WebServiceCallIp = $("#WebServiceCallIp").val();
                    console.log("WebServiceCallIp: " + WebServiceCallIp);
                    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
                    console.log("serviceUrl: " + serviceUrl);
                    var TaxPer = "";
                    $("#overlay").css("display", "block");
                    $.ajax({
                        type: "POST",
                        url: serviceUrl,
                        contentType: "application/xml",
                        dataType: "xml",
                        async: false,
                        success: function(data, textStatus, jqXHR) {
                            console.log("Response: " + data);
                            TaxPer = getTaxResponse(data);
                            console.log("TaxPer: " + TaxPer);
                            $("#overlay").css("display", "none");
                        }
                    });
                    var PBXX_CondVal = "";
                    var NAVSCondVal = "";
                    var ZNAVCondVal = "";
                    var JEXSCondVal = "";
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "PBXX") {
                            PBXX_CondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
                        }
                    });
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                        if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "NAVS") {
                            var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                            var fml = formula(conType);
                            var exp = new String(fml);
                            NAVSCondVal = eval(exp.toString());
                            if (toCurrency === fromCurrency || toCurrency === '%') {
                                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(NAVSCondVal));
                            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                                if (exchangeRate === "") {
                                    exchangeRate = 1;
                                }
                                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(NAVSCondVal * exchangeRate));
                            }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(NAVSCondVal);
                        }
                    });
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                        if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "ZNAV") {
                            var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                            var fml = formula(conType);
                            var exp = new String(fml);
                            ZNAVCondVal = eval(exp.toString());
                            if (toCurrency === fromCurrency || toCurrency === '%') {
                                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(ZNAVCondVal));
                            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                                if (exchangeRate === "") {
                                    exchangeRate = 1;
                                }
                                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(ZNAVCondVal * exchangeRate));
                            }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(ZNAVCondVal);
                        }
                    });
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                        if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "JEXS") {
                            var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                            var fml = formula(conType);
                            var exp = new String(fml);
                            JEXSCondVal = eval(exp.toString());
                            if (toCurrency === fromCurrency || toCurrency === '%') {
                                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(JEXSCondVal));
                            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                                if (exchangeRate === "") {
                                    exchangeRate = 1;
                                }
                                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(JEXSCondVal * exchangeRate));
                            }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(JEXSCondVal);
                        }
                    });
                }
            }
        });
    });
    $("#profitabilitysegmentmodelbtn").click(function() {
        $("#profitabilitySegmentForm").trigger("reset");
        $("#profitabilitySegmentModal").modal("show");
        $("#profitabilitySegmentModal").css({
            "padding-right": 430,
            "padding-left": 0
        });
        var plantCode = "";
        var linkid = "";
        var insertionOrderId = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionOrderId === itemDropdownId) {
                plantCode = $(this).find("td").eq(16).children(".hiddenPlantCode").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
        console.log("linkid :" + linkid);
        console.log("serviceLineItemNumber :" + serviceLineItemNumber);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getProfitabilitySegmentByLinkIdAndServiceLineItemNumberInPrRfq",
                "linkid": linkid,
                "serviceLineItemNumber": serviceLineItemNumber,
                "insertionOrderId": insertionOrderId
            },
            complete: function(responseJson) {
                var jsonArray = $.parseJSON(responseJson.responseText);
                jsonArray = JSON.parse(JSON.stringify(jsonArray));
                if (jsonArray.length !== 0) {
                    $("#Characteristic").val(jsonArray[0].characterstic);
                    $("#CustomerCode").val(jsonArray[0].customerCode);
                    $("#Product").val(jsonArray[0].product);
                    $("#BillingType").val(jsonArray[0].billingType);
                    $("#salesOrderProfitabilitySegment").val(jsonArray[0].salesOrder);
                    $("#itemNumberProfitabilitySegment").val(jsonArray[0].itemNumber);
                    $("#companyCodeProfitabilitySegment").val(jsonArray[0].companyCode);
                    $("#Plant").val(jsonArray[0].plant);
                    $("#BusinessArea").val(jsonArray[0].businessArea);
                    $("#SalesOrganization").val(jsonArray[0].salesOrg);
                    $("#DistrChannel").val(jsonArray[0].distrChannel);
                    $("#Division").val(jsonArray[0].division);
                    $("#WBSElement").val(jsonArray[0].wBSElement);
                    $("#CostObject").val(jsonArray[0].costObject);
                    $("#ProfitCentre").val(jsonArray[0].profitCenter);
                    $("#PartnerPC").val(jsonArray[0].partnerPC);
                    $("#countryProfitabilitySegment").val(jsonArray[0].country);
                    $("#SalesOffice").val(jsonArray[0].salesOffice);
                    $("#SalesEmployee").val(jsonArray[0].salesEmployee);
                    $("#MatlGroup").val(jsonArray[0].matlGroup);
                    $("#Prodhierarchy").val(jsonArray[0].prodHierarchy);
                    $("#ItemCategory").val(jsonArray[0].itemCategory);
                    $("#HigherLevItem").val(jsonArray[0].higherLevItem);
                    $("#Industry").val(jsonArray[0].industry);
                    $("#CustomerGroup").val(jsonArray[0].customerGroup);
                    $("#ProductHierLevel1").val(jsonArray[0].prodHierLev1);
                    $("#ProductHierLevel2").val(jsonArray[0].prodHierLev2);
                    $("#ProductHierLevel3").val(jsonArray[0].prodHierLev3);
                    $("#MaterialType").val(jsonArray[0].materialType);
                    $("#ReferenceDoc").val(jsonArray[0].referenceDoc);
                    $("#ProjectNumber1").val(jsonArray[0].projectNumber1);
                    $("#ProjectIndicator").val(jsonArray[0].projectIndecator);
                    $("#valuationTypeProfitabilitySegment").val(jsonArray[0].valuationType);
                    $("#CustomerClass").val(jsonArray[0].customerClass);
                    $("#MaterialSourceInd").val(jsonArray[0].materialSourceInd);
                    $("#ContractType").val(jsonArray[0].contractType);
                    $("#ShipToParty").val(jsonArray[0].shipToParty);
                    $("#IndustryCode1").val(jsonArray[0].industryCode1);
                    $("#IndustryField001").val(jsonArray[0].industryField001);
                    $("#IndustryCode2").val(jsonArray[0].industryCode2);
                    $("#IndustryCode3").val(jsonArray[0].industryCode3);
                    $("#SalesDocType").val(jsonArray[0].salesDocType);
                    $("#ReferenceItem").val(jsonArray[0].referenceItem);
                    $("#orderProfitabilitySegment").val(jsonArray[0].sgOrder);
                } else {
                    $("#profitabilitySegmentForm").trigger("reset");
                    $("#Plant").val(plantCode);
                }
            }
        });
    });
    $("#backChangedScreen").click(function() {
        $("#changeAccountAssignmentScreenModal").modal("hide");
        $("#accountAssignmentModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("InputFields");
    });
    $("#accountAssignmentchangeScreenbtn").click(function() {
        $("#accountAssignmentModal").modal("hide");
        $("#changeAccountAssignmentScreenModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("Table");
        var PoFrom = $("#PoFrom").val();
        $("#accountAssignmentTebleId tbody tr").remove();
        var gLCode = $("#gLCode").val();
        var costCenter = $("#costCenter").val();
        var commitmentItem = $("#commitmentItemservices").val();
        var fund = $("#fundServices").val();
        var fundCenter = $("#fundCenterServices").val();
        var functionalArea = $("#functionalAreaServices").val();
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        var itemNumber = $("itemNumberAccountAssignment").val();
        var percentage = 100;
        var lineItem = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
        var serviceNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(3).children(".ServicesNumber_Services").val();
        var shortText = serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".shortText_Services").val();
        var uom = serviceTabTableCurrentTd.parent().parent().find("td").eq(6).children(".servicesUnit_Services").val();
        console.log("lineItem :" + lineItem);
        console.log("quantityService :" + quantityService);
        console.log("serviceNumber :" + serviceNumber);
        console.log("shortText :" + shortText);
        $("#accountAssignLine").val(lineItem);
        $("#accountAssignQuantity").val(formatNumberByComma(parseFloat(quantityService).toFixed(3)));
        $("#accountAssignActivity").val(serviceNumber);
        $("#accountAssignShortText").val(shortText);
        $("#accountAssignuom").val(uom);
        if (PoFrom === "createpo" || PoFrom === "byrfq" || PoFrom === "shortcutPo") {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(0).children(".deleteServiceLine").css("display", "none");
            });
        }
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
            var LineNoSerAcc = $("#LineNoSerAccId").val();
            var ServiceLinkNumberId = $("#ServiceLinkNumberId").val();
            var grossPrice = Number(removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(7).children('.grossPrice_Services').val()).toFixed(1));
            var netvalue = quantityService * grossPrice;
            var rowCount = $("#serviceTabAccAsgnTebleId tr").closest("tr").length;
            if (rowCount === 2) {
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(0).children(".LineNoSerAcc").val(LineNoSerAcc);
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(16).children(".netValue").val(netvalue);
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(16).children(".linkNumber").val(ServiceLinkNumberId);
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quantityService).toFixed(3)));
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
                    "max": quantityService,
                    "value": formatNumberByComma(quantityService)
                });
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(percentage);
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
                    "max": percentage,
                    "value": percentage
                });

                var accountAssignmentCategory = "";
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    var insertionid = $("#ItemNumberSelect").val();
                    if (insertionid === id) {
                        accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    }
                });
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val($("#gLAccountService").val());
                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").val($("#coAreaService").val());
                if (accountAssignmentCategory === 'A') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(10).children(".serviceAccAsgnTblOrder").val($("#OrderService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(11).children(".serviceAccAsgnTblAssets").val($("#AssetService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val($("#WBSElementInputService").val());
                } else if (accountAssignmentCategory === 'C') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(13).children(".serviceAccAsgnTblSalesOrder").val($("#SalesOrderService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(15).children(".serviceAccAsgnTblItemNumber").val($("#ItemNumberService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(16).children(".serviceAccAsgnTblDeliverySchedule").val($("#DelivSchService").val());
                } else if (accountAssignmentCategory === 'F') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val($("#costCenterService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(10).children(".serviceAccAsgnTblOrder").val($("#OrderService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").val($("#fundService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").val($("#functionalAreaService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").val($("#FundCenterServiceInput").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").val($("#CommItemServiceInput").val());
                } else if (accountAssignmentCategory === 'K') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val($("#costCenterService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").val($("#fundService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").val($("#functionalAreaService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").val($("#FundCenterServiceInput").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").val($("#CommItemServiceInput").val());
                } else if (accountAssignmentCategory === 'N') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val($("#costCenterService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").val($("#NActNumServiceInput").val());
                } else if (accountAssignmentCategory === 'P') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val($("#WBSElementInputService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").val($("#NActNumServiceInput").val());
                } else if (accountAssignmentCategory === 'R') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val($("#costCenterService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(13).children(".serviceAccAsgnTblSalesOrder").val($("#SalesOrderService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(15).children(".serviceAccAsgnTblItemNumber").val($("#ItemNumberService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(16).children(".serviceAccAsgnTblDeliverySchedule").val($("#DelivSchService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").val($("#fundService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").val($("#functionalAreaService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").val($("#FundCenterServiceInput").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").val($("#CommItemServiceInput").val());
                } else if (accountAssignmentCategory === 'X') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val($("#costCenterService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(10).children(".serviceAccAsgnTblOrder").val($("#OrderService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val($("#WBSElementInputService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(13).children(".serviceAccAsgnTblSalesOrder").val($("#SalesOrderService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(15).children(".serviceAccAsgnTblItemNumber").val($("#ItemNumberService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(16).children(".serviceAccAsgnTblDeliverySchedule").val($("#DelivSchService").val());
                } else if (accountAssignmentCategory === 'Z') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val($("#costCenterService").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(10).children(".serviceAccAsgnTblOrder").val($("#OrderService").val());
                }
            } else {
                if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                    var totalServiceAccAsgnQuant = 0;
                    var serviceQuantity = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
                    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                        var quantity = removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
                        totalServiceAccAsgnQuant = Number(totalServiceAccAsgnQuant) + Number(quantity);
                    });
                    if (serviceQuantity !== totalServiceAccAsgnQuant) {
                        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                            var Quantity = removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
                            var per = Quantity * 100 / quantityService;
                            $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(Number(per).toFixed(2));
                        });
                    }
                }
            }
        }
    });

    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblQuantity", function(e) {
        if (event.keyCode === 13) {
            e.preventDefault();
            console.log("Quantity enter/keypress event.");
            var Quantity = removeCommaInNumber($(this).val());
            var quantity = Number(Quantity).toFixed(1);
            $(this).val(formatNumberByComma(Quantity));
            var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
            var grossPrice = Number(removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(7).children('.grossPrice_Services').val()).toFixed(1));
            var PoFrom = $("#PoFrom").val();
            var current_tr = $(this).parent().parent();
            var accountAssignmentCategory;
            var ident = $(this).parent().parent().find("td").eq(0).children(".serAccAsgnIdent").val();
            console.log("quantity :" + quantity);
            console.log("quantityService :" + quantityService);
            console.log("Max Quant :" + this.max);
            var remainingQuantity = parseFloat(this.max) - parseFloat(quantity);
            var percentage = (quantity / (quantityService) * 100).toFixed(2);
            var netValue = Number(remainingQuantity) * Number(grossPrice);
//            var remPer = (remainingQuantity / quantityService * 100).toFixed(2);
//            var prevLinkNumber = $(this).parent().parent().find("td").eq(16).children(".linkNumber").val();
            var prevLinkNumber = $("#serviceTabAccAsgnTebleId tbody tr").last().find("td").eq(16).children(".linkNumber").val();
            var linkNumber = parseInt(prevLinkNumber) + 10;
            if (parseFloat(removeCommaInNumber(this.value)) < parseFloat(this.max)) {
                $(this).attr({
                    "max": quantity,
                    "value": formatNumberByComma(quantity)
                });
                var max = $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
                    "max": percentage,
                    "value": percentage
                });
                $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(percentage);
                var totalAssgnPer = 0.0;
                $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                    var asgnPer = $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
                    totalAssgnPer = Number(asgnPer) + Number(totalAssgnPer);
                });
                var remPer = 100 - Number(totalAssgnPer);
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    var insertionid = $("#ItemNumberSelect").val();
                    if (insertionid === id) {
                        console.log("insertionid bt:" + insertionid + " " + "id :" + id);
                        accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    }
                });
                $(this).parent().parent().find("td").eq(16).children(".netValue").val(Number(quantity) * Number(grossPrice));
                var LineNoSerAcc = $("#serviceTabAccAsgnTebleId tbody tr:first").find("td").eq(0).children(".LineNoSerAcc").val();
                var glCode = $("#gLAccountService").val();
                var tdrow = "<tr><td>" + (PoFrom === 'editpo' || PoFrom === 'editApprovedPo' ? "<input type=checkbox class=deleteServiceLine> |" : '') + " <input type='hidden' class='LineNoSerAcc' value='" + LineNoSerAcc + "'><input type=hidden class=serAccAsgnIdent value='" + (ident) + "'>" + "<i class='fa fa-window-close deleterowClass' aria-hidden='true' style='width:22px;'>" +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value=' + formatNumberByComma(Number(remainingQuantity).toFixed(2)) + ' max=' + Number(remainingQuantity).toFixed(2) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" value=' + Number(remPer).toFixed(2) + ' max=' + Number(remPer).toFixed(2) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value="' + glCode + '" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value="' + glCode + '" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value="" style="width: 100px;">\n\
                        <input type="hidden" class="form-control form-rounded input-height netValue" value= ' + Number(netValue).toFixed(2) + '>\n\
                        <input type="hidden" class="form-control form-rounded input-height linkNumber" value=' + linkNumber + '>' +
                        "</td></tr>";
                $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
//                current_tr.next().find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", true);
                $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                    $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", true);
                });
                serviceTabAccAsgnTblQuantPerChange(current_tr, accountAssignmentCategory);
            } else {
                $(this).val(formatNumberByComma(this.max));
            }
        }
    });

    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblPercentage", function(e) {
        var PoFrom = $("#PoFrom").val();
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        var grossPrice = Number(removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(7).children('.grossPrice_Services').val()).toFixed(1));

        var percentage = $(this).val();
        if (event.keyCode === 13) {
            e.preventDefault();
            $(this).val(Number(percentage).toFixed(2));
            var ident = $(this).parent().parent().find("td").eq(0).children(".serAccAsgnIdent").val();
            var accountAssignmentCategory;
            var current_tr = $(this).parent().parent();
            var maxQuantity = $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr("max");
            console.log("percentage :" + percentage);
            console.log("quantityService :" + quantityService);
            console.log("max :" + maxQuantity);
            var remPer = this.max - percentage;
            var quantFromPer = parseInt(quantityService) * parseInt(percentage) / 100;
            var remainingQuantity = maxQuantity - parseFloat(quantFromPer);
            if (parseFloat(this.value) < parseFloat(this.max)) {
                $(this).attr({
                    "max": Number(percentage).toFixed(2),
                    "value": Number(percentage).toFixed(2)
                });
                var max = $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
                    "max": Number(quantFromPer).toFixed(2),
                    "value": formatAmountByComma(Number(quantFromPer).toFixed(2))
                });
                var netValue = Number(remainingQuantity) * Number(grossPrice);
                $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quantFromPer).toFixed(3)));
                $(this).parent().parent().find("td").eq(16).children(".netValue").val(Number(quantFromPer) * Number(grossPrice));
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    var insertionid = $("#ItemNumberSelect").val();
                    if (insertionid === id) {
                        console.log("insertionid bt:" + insertionid + " " + "id :" + id);
                        accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    }
                });
                var LineNoSerAcc = $("#serviceTabAccAsgnTebleId tbody tr:first").find("td").eq(0).children(".LineNoSerAcc").val();
//                var prevLinkNumber = $(this).parent().parent().find("td").eq(16).children(".linkNumber").val();
                var prevLinkNumber = $("#serviceTabAccAsgnTebleId tbody tr").last().find("td").eq(16).children(".linkNumber").val();
                var linkNumber = parseInt(prevLinkNumber) + 10;
                var glCode = $("#gLAccountService").val();
                var tdrow = "<tr><td>" + (PoFrom === 'editpo' || PoFrom === 'editApprovedPo' ? "<input type=checkbox class=deleteServiceLine> |" : '') + " <input type='hidden' class='LineNoSerAcc' value='" + LineNoSerAcc + "'><input type=hidden class=serAccAsgnIdent value='" + (ident) + "'>" + "<i class='fa fa-window-close deleterowClass' aria-hidden='true' style='width:22px;'>" +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value=' + formatNumberByComma(Number(remainingQuantity).toFixed(2)) + ' max=' + Number(remainingQuantity).toFixed(2) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" value=' + Number(remPer).toFixed(2) + ' max=' + Number(remPer).toFixed(2) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value="' + glCode + '" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value="' + glCode + '" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value="" style="width: 100px;">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value="" style="width: 100px;">\n\
                        <input type="hidden" class="form-control form-rounded input-height netValue" value="' + Number(netValue).toFixed(2) + '">\n\
                        <input type="hidden" class="form-control form-rounded input-height linkNumber" value="' + linkNumber + '">' +
                        "</td></tr>";
                $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
                $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                    $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
                });
//                current_tr.next().find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
                serviceTabAccAsgnTblQuantPerChange(current_tr, accountAssignmentCategory);
            } else {
                $(this).val(this.max);
            }
        }
    });
    
    $("#serviceTabAccAsgnTebleId").on("change", ".serviceAccAsgnTblQuantity", function(e) {
        if (e.key === undefined) {
            console.log("Quantity change event.");
            var Quantity = removeCommaInNumber($(this).val());
            var quantity = Number(Quantity).toFixed(1);
            $(this).val(formatNumberByComma(Quantity));
            var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
            var grossPrice = Number(removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(7).children('.grossPrice_Services').val()).toFixed(1));
            var netValue = Number(quantity) * Number(grossPrice);
            var PoFrom = $("#PoFrom").val();
            console.log("PoFrom: " + PoFrom);
//            if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                var per = Quantity * 100 / quantityService;
                var totalQuantity = 0;
                var totalPer = 0;
                $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                    var isChecked = $(this).find("td").eq(0).children(".deleteServiceLine").prop("checked");
                    if (isChecked !== true) {
                        totalQuantity += Number(removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val()));
                    }
                    totalPer += Number($(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val());
                });
                console.log("totalQuantity: " + totalQuantity);
                console.log("totalPer: " + totalPer);
                
                $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
                    "max": Number(per).toFixed(2),
                    "value": Number(per).toFixed(2)
                });
                $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(Number(per).toFixed(2));
                $(this).parent().parent().find("td").eq(16).children(".netValue").val(netValue);
                if (Number(quantityService).toFixed(1) !== totalQuantity.toFixed(1) && totalQuantity.toFixed(1) > Number(quantityService).toFixed(1)) {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter correct Quantity!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    return false;
                }
//            }
        }
    });
    $("#serviceTabAccAsgnTebleId").on("change", ".serviceAccAsgnTblPercentage", function(e) {
        if (e.key === undefined) {
            var PoFrom = $("#PoFrom").val();
            var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
            var grossPrice = Number(removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(7).children('.grossPrice_Services').val()).toFixed(1));
            var percentage = $(this).val();
            $(this).val(Number(percentage).toFixed(2));
            if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                var quant = quantityService * percentage / 100;
                var totalQuantity = 0;
                var totalPer = 0;
                $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                    var isChecked = $(this).find("td").eq(0).children(".deleteServiceLine").prop("checked");
                    if (isChecked !== true) {
                        totalPer += Number($(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val());
                    }
                    totalQuantity += Number(removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val()));
                });
                $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
                    "max": Number(quant).toFixed(2),
                    "value": formatNumberByComma(Number(quant).toFixed(2))
                });
                $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quant).toFixed(3)));
                var netValue = Number(quant) * Number(grossPrice);
                $(this).parent().parent().find("td").eq(16).children(".netValue").val(netValue);
                if (totalQuantity.toFixed(1) !== 100 && totalQuantity.toFixed(1) > 100) {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter correct Percentage!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    return false;
                }
//                return false;
            }
        }
    });
    var rowCount;
    $("#serviceTabAccAsgnTebleId").on("click", ".deleterowClass", function() {

        var indent = $(this).parent().children(".serAccAsgnIdent").val();
        rowCount = 0;
//        var quantity = $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val();
//        var per = $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
        var rowCount = $('#serviceTabAccAsgnTebleId tbody tr').length;
        var netValue = $(this).parent().parent().find("td").eq(16).children(".netValue").val();
        var prevRowNetValue = $(this).parent().parent().prev().find("td").eq(16).children(".netValue").val();
        var quantity = removeCommaInNumber($(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
        var prevRowquantity = removeCommaInNumber($(this).parent().parent().prev().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
        var per = $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
        var prevRowPer = $(this).parent().parent().prev().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
        var quantityAfterRowDeletion = parseFloat(quantity) + parseFloat(prevRowquantity);
        var totalNetValue = parseFloat(netValue) + parseFloat(prevRowNetValue);
        var perAfterRowDeletion;
        if (rowCount === 2) {
            perAfterRowDeletion = (parseFloat(per) + parseFloat(prevRowPer)).toFixed(2);
        } else {
            perAfterRowDeletion = parseFloat(per) + parseFloat(prevRowPer);
        }
        $(this).parent().parent().prev().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quantityAfterRowDeletion).toFixed(3)));
        $(this).parent().parent().prev().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(perAfterRowDeletion);
        $(this).parent().parent().prev().find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
            "max": Number(quantityAfterRowDeletion).toFixed(2),
            "value": formatNumberByComma(Number(quantityAfterRowDeletion).toFixed(2))
        });
        $(this).parent().parent().prev().find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
            "max": perAfterRowDeletion,
            "value": perAfterRowDeletion
        });
        $(this).parent().parent().prev().find("td").eq(16).children(".netValue").val(totalNetValue);
        $(this).parent().parent().remove();
        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
            $(this).parent().parent().remove();
            Lobibox.notify('warning', {
                msg: 'Save Account Assignment!'
            });
            return false;
        }
    });
    $("#associatesubmitbtn").click(function() {

        var condpricdate = $("#ConditionPricingDate_Value").val();
        var amountConditions = $("#amountConditions").val();
        var currency1Conditions = $("#currency1Conditions").val();
        var pricingUnitConditions = $("#pricingUnitConditions").val();
        var uomCondition = $("#uoMConditionValuesConditions").val();
        var amouConditionBaseValuent = $("#ConditionBaseValue").val();
        var conditionBaseRateConditions = $("#conditionBaseRateConditions").val();
        var conditionValueConditions = $("#conditionValueConditions").val();
        var currency2Conditions = $("#currency2Conditions").val();
        var ConditionClass = $("#ConditionClass").val();
        var CalculateType = $("#CalculateType").val();
        var ConditionCategory = $("#ConditionCategory").val();
        var ConditionControl = $("#ConditionControl").val();
        var ConditionOrigin = $("#ConditionOrigin").val();
        var Statistical = $("#Statistical").val();
        var Accruals = $("#Accruals").val();
        var ChangedManually = $("#ChangedManually").val();
        var AccountKey = $("#AccountKey").val();
        var accrualsAccountDetermination = $("#accrualsAccountDetermination").val();
        console.log("condpricdate :" + condpricdate);
        console.log("amountConditions :" + amountConditions);
        console.log("currency1Conditions :" + currency1Conditions);
        console.log("pricingUnitConditions :" + pricingUnitConditions);
        console.log("amouConditionBaseValuent :" + amouConditionBaseValuent);
        console.log("conditionBaseRateConditions :" + conditionBaseRateConditions);
        console.log("conditionValueConditions :" + conditionValueConditions);
        console.log("currency2Conditions :" + currency2Conditions);
        console.log("ConditionClass :" + ConditionClass);
        console.log("CalculateType :" + CalculateType);
        console.log("ConditionCategory :" + ConditionCategory);
        console.log("ConditionControl :" + ConditionControl);
        console.log("ConditionOrigin :" + ConditionOrigin);
        console.log("Statistical :" + Statistical);
        console.log("Accruals :" + Accruals);
        console.log("ChangedManually :" + ChangedManually);
        console.log("AccountKey :" + AccountKey);
        console.log("accrualsAccountDetermination :" + accrualsAccountDetermination);
        $("#conditiondetailsModal").modal("hide");
    });
    $("#addConditionDetailsLineBtn").click(function() {

        var ConditionType = $("#ConditionType").val();
        var nameConditions = $("#nameConditions").val();
        var Amount = $("#Amount").val();
        var ConditionPricingUnit = $("#ConditionPricingUnit").val();
        var Currency = $("#Currency").val();
        var UoM = $("#UoM").val();
        var ConditionValue = $("#ConditionValue").val();
        var Currency2 = $("#Currency2").val();
        var ConditionValue2 = $("#ConditionValue2").val();
        var ConditionCurrency = $("#ConditionCurrency").val();
        var vendorcodename = $("#vendorcodename").val();
        console.log("ConditionType :" + ConditionType);
        console.log("nameConditions :" + nameConditions);
        console.log("Amount :" + Amount);
        console.log("ConditionPricingUnit :" + ConditionPricingUnit);
        console.log("Currency :" + Currency);
        console.log("UoM :" + UoM);
        console.log("ConditionValue :" + ConditionValue);
        console.log("Currency2 :" + Currency2);
        console.log("ConditionValue2 :" + ConditionValue2);
        console.log("ConditionCurrency :" + ConditionCurrency);
        console.log("vendorcodename :" + vendorcodename);
        var row = "";
        row = "<tr><td>" + ConditionType + "</td><td>" + nameConditions + "</td><td>" + Amount + "</td><td>" + ConditionPricingUnit + "</td><td>" + Currency +
                "</td><td>" + UoM + "</td><td>" + ConditionValue + "</td><td>" + Currency2 + "</td><td>" + ConditionValue2 + "</td><td>" + ConditionCurrency +
                "</td><td>" + vendorcodename +
                "</td></tr>";
        $("#conditionTableId").children("tbody").append(row);
        $("#ConditionType").val("");
        $("#nameConditions").val("");
        $("#Amount").val("");
        $("#ConditionPricingUnit").val("");
        $("#Currency").val("");
        $("#UoM").val("");
        $("#ConditionValue").val("");
        $("#Currency2").val("");
        $("#ConditionValue2").val("");
        $("#ConditionCurrency").val("");
        $("#vendorcodename").val("");
    });
    $("#serviceAccountAssignmentAddBtn").click(function() {
        $("#accountAssignmentModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("InputFields");
    });
//    $("#typeOfPOHeader").change(function() {
//        $("#overlay").css("display", "block");
//        var typeOfPO = $("#typeOfPOHeader").val();
//        if (typeOfPO === 'Non-Ferrous PO - Imp' || typeOfPO === 'Ferrous Joint Pur' || typeOfPO === 'Ferrous PO - Import' || typeOfPO === 'Ferrous PO - Local'
//                || typeOfPO === 'Non-Ferrous PO - Loc') {
//            //            console.log("Bittu");
//            $("#customerdata_li").css({display: "block"});
//        } else {
//            $("#customerdata_li").css({display: "none"});
//            console.log("Bittu");
//        }
//        $("#overlay").css("display", "none");
//    });

    var currentConditionTypeInputField = "";
    $("#conditionTableClass").on("keypress", ".ConditionTypeHeader", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ConditionTypeHeaderModal").modal("show");
            currentConditionTypeInputField = $(this);
            $(".conditionTypeCheckbox").prop("checked", false);
        }
    });
    var currentCurrencyInputField = "";
    $("#conditionTableClass").on("click", ".CurrencyHeader", function() {

        $("#CurrencyHeaderModal").modal("show");
        currentCurrencyInputField = $(this);
        $(".currencyCheckbox").prop("checked", false);
    });
    var currentUOMInputField = "";
    $("#conditionTableClass").on("click", ".UoMHeader", function() {

        $("#UoMHeaderModal").modal("show");
        currentUOMInputField = $(this);
        $(".UOMCheckbox").prop("checked", false);
    });
    var currentConditionValueInputField = "";
    $("#conditionTableClass").on("click", ".ConditionValueHeader", function() {

        $("#ConditionValueHeaderModal").modal("show");
        currentConditionValueInputField = $(this);
        $(".ConditionValueCheckbox").prop("checked", false);
    });
    var currentCurrency2InputField = "";
    $("#conditionTableClass").on("click", ".Currency2Header", function() {

        $("#Currency2HeaderModal").modal("show");
        currentCurrency2InputField = $(this);
        $(".Currency2Checkbox").prop("checked", false);
    });
    var currencyTable = null;
    $("#CurrencyDeliveryInvoice").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getAllCurrency();
                $(".CurrencyDeliveryInvoiceCheckbox").prop("checked", false);
                $("#overlay").css("display", "none");
                $("#CurrencyDeliveryInvoiceModal").modal("show");
            }, 500);
        }
    });
    $(".conditionTypeCheckbox").focus(function() {
        var contype = $(this).parent().parent().find("td").eq(1).html();
        currentConditionTypeInputField.val(contype);
        $("#ConditionTypeHeaderModal").modal("hide");
    });
    $(".currencyCheckbox").focus(function() {
        var curruncy = $(this).parent().parent().find("td").eq(1).html();
        currentCurrencyInputField.val(curruncy);
        $("#CurrencyHeaderModal").modal("hide");
    });
    $(".UOMCheckbox").change(function() {
        var UOM = $(this).parent().parent().find("td").eq(1).html();
        currentUOMInputField.val(UOM);
        $("#UoMHeaderModal").modal("hide");
    });
    $(".ConditionValueCheckbox").focus(function() {
        var ConditionValue = $(this).parent().parent().find("td").eq(1).html();
        currentConditionValueInputField.val(ConditionValue);
        $("#ConditionValueHeaderModal").modal("hide");
    });
    $(".Currency2Checkbox").focus(function() {
        var currency = $(this).parent().parent().find("td").eq(1).html();
        currentCurrency2InputField.val(currency);
        $("#Currency2HeaderModal").modal("hide");
    });
    $("#CurrencyDeliveryInvoiceModelTebleId").on("click", ".CurrencyDeliveryInvoiceCheckbox", function() {
        var currency = $(this).parent().parent().find("td").eq(1).html();
        if (currency === 'SGD') {
            $("#ExchangeRate").val('1.00000');
        } else {
            $("#ExchangeRate").val('');
        }
        var newCurrency = currency.toString().trim();
        $("#CurrencyDeliveryInvoice").val(newCurrency);
        if (newCurrency !== "")
        {
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
            console.log("fromCurrency in Exchange Rate: " + fromCurrency);
            $("#CurrencyDeliveryInvoiceModal").modal("hide");
            var exchangeRate = findExchangeRate(fromCurrency, newCurrency);
        }
//        saveServiceTabDataOnLoadFieldChange();
//        saveConditionControlTabDataOnLoadFieldChange();
    });
    $("#CurrencyDeliveryInvoiceModelTebleId_Service").on("click", ".CurrencyDeliveryInvoiceCheckboxService", function() {
        var currency = $(this).parent().parent().find("td").eq(1).html();
//        $(".currency_Services").val(currency);
        var reqFrom = $("#ro_Currency").val();
        if (reqFrom === "DeliveryInvoice") {
            $(".currency_Services").val(currency);
        } else if (reqFrom === "Currency") {
            $("#currencyConditions").val(currency);
            var fromCurrency;
            var toCurrency = currency;
            $("#material_headerClass tbody tr").each(function() {
                var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === itemDropdownId) {
                    fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                }
            });
            var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
            if (exchangeRate === "") {
                exchangeRate = 1;
            }
            $("#ExchangeRateCondition").val(exchangeRate);
        } else if (reqFrom === "DocCurrency") {
            $("#currencyPr").val(currency);
        } else if (reqFrom === "condition") {
            conditioncurrentpossition.find("td").eq(4).children(".CurrencyLineLevel").val(currency);
            if (currency !== "")
            {
                var toCurrency = currency;
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
                console.log("fromCurrency in Exchange Rate: " + fromCurrency);
                $("#overlay").css("display", "block");
                $("#CurrencyDeliveryInvoiceModal").modal("hide");
//                var exchangeRate = findExchangeRate(fromCurrency, toCurrency);
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
                        $("#ExchangeRate").val(Number(obj.ExchangeRate).toFixed(5));
                        exchangeRate = obj.ExchangeRate;
                        console.log("exchangeRate :" + Number(exchangeRate).toFixed(5));
                        var amount = "";
                        var perQuant = "";
                        var condVal = removeCommaInNumber(conditioncurrentpossition.find("td").eq(8).children(".ConditionValueLineLevel").val());

                        if (conditioncurrentpossition.find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
                            amount = removeCommaInNumber(conditioncurrentpossition.find("td").eq(3).children(".AmountLineLevel").val());
                            if (amount !== "") {
                                conditioncurrentpossition.find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
                            }
                        } else if (conditioncurrentpossition.find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
                            amount = removeCommaInNumber(conditioncurrentpossition.find("td").eq(3).children(".newAmountLineLevel").val());
                            if (amount !== "") {
                                conditioncurrentpossition.find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
                            }
                        }
                        if (conditioncurrentpossition.find("td").eq(5).children("input").hasClass("PerQuantityLineLavel") === true) {
                            perQuant = removeCommaInNumber(conditioncurrentpossition.find("td").eq(5).children(".PerQuantityLineLavel").val());
                            if (perQuant !== "") {
                                conditioncurrentpossition.find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma((Number(perQuant) * Number(exchangeRate)).toFixed(2)));
                            }
                        } else if (conditioncurrentpossition.find("td").eq(5).children("input").hasClass("newPerQuantityLineLavel") === true) {
                            perQuant = removeCommaInNumber(conditioncurrentpossition.find("td").eq(5).children(".newPerQuantityLineLavel").val());
                            if (perQuant !== "") {
                                conditioncurrentpossition.find("td").eq(5).children(".newPerQuantityLineLavel").val(formatAmountByComma((Number(perQuant) * Number(exchangeRate)).toFixed(2)));
                            }
                        }
                        if (condVal !== "") {
                            conditioncurrentpossition.find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma((Number(condVal) * Number(exchangeRate)).toFixed(2)));
                        }

                        deleteRowFormCondition("");
                        $("#overlay").css("display", "none");
                    }
                });
            }
            saveConditionTabDataOnLoadFieldChange();
        } else if (reqFrom === "headercondition") {
            var LinkID;
            var PrCurrency;
            var Itemcode;
            var itemCodeArray = [];
            var linkidArray = [];
            var PrCurrencyArray = [];
            conditioncurrentpossition.find("td").eq(4).children(".CurrencyHeader").val(currency);

            if (currency !== "")
            {
                var toCurrency = currency;
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
                console.log("fromCurrency in Exchange Rate: " + fromCurrency);
                $("#overlay").css("display", "block");
                $("#CurrencyDeliveryInvoiceModal").modal("hide");
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
                        $("#ExchangeRate").val(Number(obj.ExchangeRate).toFixed(5));
                        exchangeRate = obj.ExchangeRate;
                        console.log("exchangeRate :" + Number(exchangeRate).toFixed(5));
                        var amount = "";
                        var perQuant = "";
                        var condVal = removeCommaInNumber(conditioncurrentpossition.find("td").eq(8).children(".ConditionValueHeader").val());

                        if (conditioncurrentpossition.find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                            amount = removeCommaInNumber(conditioncurrentpossition.find("td").eq(3).children(".AmountHeader").val());
                            if (amount !== "") {
                                conditioncurrentpossition.find("td").eq(3).children(".AmountHeader").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
                            }
                        } else if (conditioncurrentpossition.find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                            amount = removeCommaInNumber(conditioncurrentpossition.find("td").eq(3).children(".newAmountHeader").val());
                            if (amount !== "") {
                                conditioncurrentpossition.find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma((Number(amount) * Number(exchangeRate)).toFixed(2)));
                            }
                        }
                        if (conditioncurrentpossition.find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                            perQuant = removeCommaInNumber(conditioncurrentpossition.find("td").eq(5).children(".PerQuantityHeader").val());
                            if (perQuant !== "") {
                                conditioncurrentpossition.find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma((Number(perQuant) * Number(exchangeRate)).toFixed(2)));
                            }
                        } else if (conditioncurrentpossition.find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                            perQuant = removeCommaInNumber(conditioncurrentpossition.find("td").eq(5).children(".newPerQuantityHeader").val());
                            if (perQuant !== "") {
                                perQuant = removeCommaInNumber(conditioncurrentpossition.find("td").eq(5).children(".newPerQuantityHeader").val((Number(perQuant) * Number(exchangeRate)).toFixed(2)));
                            }
                        }
                        if (condVal !== "") {
                            conditioncurrentpossition.find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma((Number(condVal) * Number(exchangeRate)).toFixed(2)));
                        }

                        deleteRowFormConditionHeader();
                        clearPerColumnatHeader();
                        var indexnumber = conditioncurrentpossition.find("td").eq(0).children(".conditionindex").val();
                        var conditiontype = conditioncurrentpossition.find("td").eq(1).children(".ConditionTypeHeader").val();
                        for (var p = 0; p < conditionLineLevelArray.length; p++) {
                            if (conditiontype === conditionLineLevelArray[p].Ctype && indexnumber === conditionLineLevelArray[p].indexnumber) {
                                conditionLineLevelArray[p].amount = ((Number(conditionLineLevelArray[p].amount) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArray[p].per = ((Number(conditionLineLevelArray[p].per) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArray[p].oldAmountHidden = ((Number(conditionLineLevelArray[p].oldAmountHidden) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArray[p].oldPerHidden = ((Number(conditionLineLevelArray[p].oldPerHidden) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArray[p].conditionValue = ((Number(conditionLineLevelArray[p].conditionValue) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArray[p].prCurrency = currency;
                            }
                        }
                        console.log("conditionLineLevelArray after currency change :" + JSON.stringify(conditionLineLevelArray));
                        var totlAmmount = "";
                        var totlPer = "";
                        var totlCondVal = "";
                        for (var p = 0; p < conditionLineLevelArray.length; p++) {
                            if (conditiontype === conditionLineLevelArray[p].Ctype) {
                                $("#material_headerClass tbody tr").each(function() {
                                    var insertionid = $("#ItemNumberSelect").val();
                                    var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                    if (insertionid === itemDropdownId) {
                                        var InsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                        if (conditionLineLevelArray[p].itemCode === InsertionOrderId) {
                                            var amount = conditionLineLevelArray[p].amount;
                                            var per = conditionLineLevelArray[p].per;
                                            var condVal = conditionLineLevelArray[p].conditionValue;

                                            totlAmmount = Number(totlAmmount) + Number(amount);
                                            totlPer = Number(totlPer) + Number(per);
                                            totlCondVal = Number(totlCondVal) + Number(condVal);


                                            $("#conditionTableIdLineLevel tbody tr").each(function(i) {
                                                var conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                                                var addedFrom = $(this).find("td").eq(0).children(".lineAddedFromLineLevel").val();
                                                if (conType === conditiontype && addedFrom === "headerlevel") {
                                                    $(this).find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma(Number(totlAmmount).toFixed(2)));
                                                    $(this).find("td").eq(5).children(".newPerQuantityLineLavel").val(formatAmountByComma(Number(totlPer).toFixed(2)));
                                                    $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totlCondVal).toFixed(2)));
                                                }
                                            });
                                        }
                                    }
                                    LinkID = ($(this).find("td").eq(0).children(".linkId_Class").val()).trim();
                                    Itemcode = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                    PrCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                                    linkidArray.push(LinkID);
                                    PrCurrencyArray.push(PrCurrency);
                                    itemCodeArray.push(Itemcode);

                                });
                                $.ajax({
                                    type: "GET",
                                    url: "poajaxrequest.do",
                                    async: false,
                                    data: {
                                        "reqFrom": "saveConditionsDataOnAddingInHeader",
                                        "conditionLineLevelArr": JSON.stringify(conditionLineLevelArray),
                                        "linkidArrayAsString": linkidArray.toString(),
                                        "PrCurrencyArrayAsString": PrCurrencyArray.toString(),
                                        "itemCodeArrayAsString": itemCodeArray.toString(),
                                        "indexnumber": indexnumber,
                                        "conditiontype": conditiontype
                                    }
                                });
                            }
                        }
                        deleteRowFormCondition("");
                        $("#overlay").css("display", "none");
                    }
                });
            }
        }
        $("#CurrencyDeliveryInvoiceModal_Service").modal("hide");
    });
    $("#serviceTableId").on('keypress', '.currency_Services', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CurrencyDeliveryInvoiceModal_Service").modal("show");
            getAllCurrencyService();
            $("#ro_Currency").val("DeliveryInvoice");
            $(".CurrencyDeliveryInvoiceCheckboxService").prop("checked", false);
        }
    });
    $("#addRowConditionsBtnIdLineLevel").click(function() {
        var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
        var uom;
        var materialcode = "";
        var opu = "";
        var prPerUnit = "";
        var insertionid = $("#ItemNumberSelect").val();
        var isPoLineOrPrLineOrRfqLineOrEmptyLine = "";
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                uom = $(this).find("td").eq(7).children(".prUom").val();
                materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                opu = $(this).find("td").eq(8).children(".prOrderPriceUnit").val();
                prPerUnit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
                isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            }
        });
        var convTo = "";
        var convFrom = "";

        var CompanyCode = $("#companycodeHeader").val();
        var PrType = $("#PrType").val();
        if (PrType === "Material") {
            var jsonArr = getMaterialMasterOnLoad(materialcode, CompanyCode);
            if (jsonArr.length !== 0) {
                if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                    convTo = jsonArr[0].conversionTo;
                    convFrom = jsonArr[0].conversionFrom;
                }
            }
            var requestFor = isPoLineOrPrLineOrRfqLineOrEmptyLine === "EmptyLine" ? "SA" : "PR";
            console.log("requestFor: " + requestFor);
            var infoRecordJsonObj = fetchInfoRecordDetails(materialcode, requestFor);            
            convTo = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArr[0].conversionTo : infoRecordJsonObj.CONV_NUM1;
            convFrom = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArr[0].conversionFrom : infoRecordJsonObj.CONV_DEN1;
            console.log("convTo: " + convTo + " ,convFrom: " + convFrom);
        }
        if (vendor === '') {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select vendor!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#vendorcodeHeader").focus();
            return false;
        }
        var row = "";
        row = "<tr><td>"
                + '<input type="checkbox" name="checkConditionTableRowLineLevel" class="checkConditionTableRowLineLevel"><input type="hidden" class="conditionVendor" value=' + vendorcode + '><input type="hidden" class="lineAddedFromLineLevel" value="linelevel">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField newConditionTypeLineLevel" style="width:100px;" name="ConditionTypeLineLevel">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField NameConditionsLineLevel" style="width:200px;" disabled name="nameConditionsLineLevel">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField newAmountLineLevel" disabled name="AmountLineLevel" style="width:150px;"><input type="hidden" class="AmountLineLevelHidden">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField CurrencyLineLevel" disabled name="CurrencyLineLevel" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField newPerQuantityLineLavel " disabled name="PerQuantityLineLavel" style="width:150px;" value=' + prPerUnit + '><input type="hidden" class="PerQuantityLineLavelHidden">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField ConditionPricingUnitLineLevel" disabled name="ConditionPricingUnitLineLevel">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField UoMLineLevel" style="width:100px;" disabled name="UoMLineLevel">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField ConditionValueLineLevel" disabled name="ConditionValueLineLevel" style="width:150px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField Currency2LineLevel" disabled name="Currency2LineLevel" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField ConditionValue2LineLevel" disabled name="ConditionValue2LineLevel" disabled>' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField ConditionCurrencyLineLevel" disabled name="ConditionCurrencyLineLevel" disabled>' + "</td><td>"
                + '<input type="checkbox" class="statusLineLevel" disabled name="statusLineLevel">' + "</td><td>"
                + '<input type="number" class="form-control form-rounded tableInputField numeratorLineLevel" style="width:100px;" name="numeratorLineLevel" min="0" value="' + convTo + '">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField baseUoMLineLevel" name="baseUoMLineLevel" style="width:100px;" value="' + uom + '">' + "</td><td>"
                + '<input type="number" class="form-control form-rounded tableInputField denoForConvLineLevel" style="width:100px;" name="denoForConvLineLevel" min="0" value="' + convFrom + '">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField uOMExtraLineLevel" style="width:100px;" name="uOMExtraLineLevel" disabled value="' + opu + '">' + "</td><td>"
                + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteConditionTebleRowLineLevel" aria-hidden="true" style="width:30px;"></i>\n\
                  <input type="hidden" class="form-control form-rounded conditionKAPPL tableInputField" name="conditionKAPPL" value="">\n\
                  <input type="hidden" class="form-control form-rounded conditionKVSL1 tableInputField" name="conditionKVSL1" value="">\n\
                  <input type="hidden" class="form-control form-rounded conditionKVSL2 tableInputField" name="conditionKVSL2" value="">\n\
                  <input type="hidden" class="form-control form-rounded conditionZAEHK tableInputField" name="conditionZAEHK" value="">\n\
                  <input type="hidden" class="form-control form-rounded conditionSTUNR tableInputField" name="conditionSTUNR" value="">\n\
                  <input type="hidden" class="form-control form-rounded conditionChangeId tableInputField" name="conditionChangeId" value="I">'
                + "</td></tr>";
        $(".conditionTableClassLineLevel").children("tbody").append(row);

        $(".conditionTableClassLineLevel tbody tr").last().find("td").eq(1).children(".newConditionTypeLineLevel").focus();

    });
    var conType = null;
    var condTabCurrentClick = "";
    $("#conditionTableIdLineLevel").on("keypress", ".newConditionTypeLineLevel", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#conditionTypeTableId tbody tr").remove();
            condTabCurrentClick = $(this);
            condTypeLineCurrent = $(this);
            var pricingprocedure = $("#kalsmHiddenfield").val();
    //        alert("pricingprocedure :" + pricingprocedure);
            $("#ConditionTypeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "getByPricingProcedure",
                    "pricingprocedure": pricingprocedure.trim()
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].CTYPE !== "PBXX") {
                            row += "<tr>"
                                    + "<td><input type='checkbox' class='checkConditionTypeModelClass'></td>"
                                    + "<td>" + obj[i].CTYPE + "</td>"
                                    + "<td>" + obj[i].NAME + "</td>"
                                    + "<td>" + obj[i].CRCY + "</td>"
                                    + "</tr>";
                        }
                    }
                    $("#conditionTypeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#conditionTypeTableId')) {
                        conType.destroy();
                        conType = null;
                        $("#conditionTypeTableId").children('tbody').html(row);
                        conType = $('table.conditionTypeCheckboxClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        conType.buttons().container()
                                .appendTo('#conditionTypeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#conditionTypeTableId thead tr').clone(true).appendTo('#conditionTypeTableId thead');
                        $('#conditionTypeTableId thead tr:eq(1) th').each(function(i) {
                            $('#conditionTypeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (conType.column(i).search() !== this.value) {
                                    conType
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        conType = $('table.conditionTypeCheckboxClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        conType.buttons().container()
                                .appendTo('#conditionTypeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#conditionTypeTableId").on("click", ".checkConditionTypeModelClass", function() {
        var Ctype = $(this).parent().parent().find("td").eq(1).text();
        var name = $(this).parent().parent().find("td").eq(2).text();
        var crcy = $(this).parent().parent().find("td").eq(3).text();
        var uom;
        var prCurrency = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $(".ItemNumberSelectClass").val();
            if (id === insertionid) {
                uom = $(this).find("td").eq(7).children(".prUom").val();
                prCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
            }
        });
        var flag = false;
//        condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMLineLevel').val(uom);
//        $("#conditionTableIdLineLevel tbody tr").not(':last').each(function() {
//            var conType = $(this).find("td").eq(1).children('.newConditionTypeLineLevel').val();
//            if (conType === undefined) {
//                conType = "";
//            }
//            if (Ctype === conType) {
//                Lobibox.alert("error", {
//                    msg: "This Condition Type already selected, Please Select Another One !"
//                });
//                condTabCurrentClick.val("");
//                condTabCurrentClick.parent().parent().find("td").eq(2).children('.NameConditionsLineLevel').val("");
//                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').val("");
//                condTabCurrentClick.parent().parent().find("td").eq(9).children('.Currency2LineLevel').val("");
//                condTabCurrentClick.parent().parent().find("td").eq(10).children('.ConditionValue2LineLevel').val("");
//                condTabCurrentClick.parent().parent().find("td").eq(6).children('.ConditionPricingUnitLineLevel').val("");
//                condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMLineLevel').val("");
//                flag = true;
//            }
//        });
        if (flag === false) {
            condTabCurrentClick.val(Ctype);
            condTabCurrentClick.parent().parent().find("td").eq(2).children('.NameConditionsLineLevel').val(name);
            if (crcy === "%") {
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').val("%");
            } else {
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').val(prCurrency);
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').prop("disabled", false);
            }
            condTabCurrentClick.parent().parent().find("td").eq(9).children('.Currency2LineLevel').val("SGD");
            condTabCurrentClick.parent().parent().find("td").eq(10).children('.ConditionValue2LineLevel').val("0.00");
            condTabCurrentClick.parent().parent().find("td").eq(6).children('.ConditionPricingUnitLineLevel').val(uom);
            condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMLineLevel').val(uom);
            condTabCurrentClick.parent().parent().find("td").eq(3).children('.newAmountLineLevel').prop("disabled", false);
            condTabCurrentClick.parent().parent().find("td").eq(5).children('.newPerQuantityLineLavel').prop("disabled", false);
            if (condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMLineLevel').val() === "%") {
                condTabCurrentClick.parent().parent().find("td").eq(5).children('.newPerQuantityLineLavel').prop("disabled", false);
            }

            var kalsm = $("#kalsmHiddenfield").val();
            $.ajax({
                type: "GET",
                url: "doajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "getPricingProcedureByConditionType",
                    "Ctype": Ctype,
                    "kalsm": kalsm
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("KAPPL :" + obj.KAPPL);
                    condTabCurrentClick.parent().parent().find("td").eq(17).children('.conditionKAPPL').val(obj.KAPPL);
                    condTabCurrentClick.parent().parent().find("td").eq(17).children('.conditionKVSL1').val(obj.KVSL1);
                    condTabCurrentClick.parent().parent().find("td").eq(17).children('.conditionKVSL2').val(obj.KVSL2);
                    condTabCurrentClick.parent().parent().find("td").eq(17).children('.conditionZAEHK').val(obj.ZAEHK);
                    condTabCurrentClick.parent().parent().find("td").eq(17).children('.conditionSTUNR').val(obj.STUNR);
                }
            });
        }

        $("#ConditionTypeModal").modal("hide");
        findApproverDetails();
    });
    $("#addRowServiceBtnId").click(function() {
        var lineitemArr = [];
        var linkid = "";
        var row = "";
        var serviceRefLineNo = "";
        var lineType = "";
        $("#serviceTableId tbody tr").each(function() {
            var lineitemnumber = $(this).find("td").eq(2).children(".lineItemNumberServices").val();
            lineitemArr.push(lineitemnumber);
        });
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                serviceRefLineNo = $(this).find("td").eq(0).children(".serviceRefLineNo").val();
                lineType = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            }
        });
        var lastlineitem = lineitemArr[lineitemArr.length - 1];
        var int_lastlineitem = parseInt(lastlineitem) + 10;
        row = "<tr>\n\
                <td><input type='checkbox' class='checkboxServices'>\n\
                <input type='hidden' class='isProfitabilitySegmentDataSaved' value='No'>\n\
                <input type='hidden' class='saveSarviceAccountAssignment' value='No'>\n\
                <input type='hidden' class='ServiceAccAssDist'>\n\
                <input type='hidden' class='LinkId' value='" + linkid + "'>\n\
                <input type='hidden' class='serviceId' value=''>\n\
                <input type='hidden' class='ServiceLinkId' value=''>\n\
                <input type=hidden class=lineNumberService>\n\
                <input type=hidden class=isServOldOrNew value='" + (serviceRefLineNo !== '' ? 'Yes' : '') + "'></td>\n\
                <td></td>\n\
                <td><input type='text' class='form-control form-rounded lineItemNumberServices tableInputField' value='" + int_lastlineitem + "'></td>\n\
                <td><input type='text' class='form-control form-rounded ServicesNumber_Services tableInputField' style='width: 100px;' value=''></td>\n\
                <td style='text-align: center'><input type='hidden' class='form-control form-rounded shortText_Services tableInputField' style='width: 150px;display: inline-block;' value='Short text...' readonly> <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td>\n\
                <td><input type='text' class='form-control form-rounded quantity_Services tableInputField' style='width:150px;' value=''></td>\n\
                <td><input type='text' class='form-control form-rounded servicesUnit_Services tableInputField' style='width:70px;' value=''></td>\n\
                <td><input type='text' class='form-control form-rounded grossPrice_Services tableInputField' style='width:150px;' value=''></td>\n\
                <td><input type='text' class='form-control form-rounded currency_Services tableInputField' style='width: 55px;' value='" + material_header_table_Currency + "'></td>\n\
                <td><input type='text' class='form-control form-rounded netPrice_Services tableInputField' style='width:150px;' readonly value=''></td>\n\
                <td><input type='text' class='form-control form-rounded edition_Services tableInputField' style='width:100px;' value=''></td>\n\
                <td style='text-align: center'><input type='hidden' class='form-control form-rounded lineItemLongText_Services tableInputField' style='width: 150px;display: inline-block;' value='Line item long text...' readonly> <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td>\n\
                <td><input type='text' class='form-control form-rounded overfTolerance_Services tableInputField' value=''></td>\n\
                <td><input type='text' class='form-control form-rounded serviceNetValue tableInputField' style='width:150px;' readonly value=''></td>\n\
                <td><input type='text' class='form-control form-rounded serviceActualQty tableInputField' readonly value=''></td>\n\
                <td style='text-align: center'><input type='hidden' class='form-control form-rounded serviceText tableInputField' readonly value='Service text...' style='width: 150px;display: inline-block;'> <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td>\n\
                <td><i title='Delete Row' class='fa fa-window-close btn-lg deleteServiceTebleRow' aria-hidden='true' style='width:10px;'></i></td>\n\
                </tr>";
        $("#serviceTableId tbody").append(row);
        if (lineType === "EmptyLine") {
            $("#serviceTableId tr").each(function() {
                $(this).find("td").eq(1).css("display", "none");
                $(this).find("th").eq(1).css("display", "none");
            });
        } else {
            $("#serviceTableId tr").each(function() {
                $(this).find("td").eq(1).css("display", "");
                $(this).find("th").eq(1).css("display", "");
            });
        }
    });
    /*SUNNY KUMAR PRAJAPATI CODE START*/
    $(".conditionTableClassLineLevel").on("click", ".deleteConditionTebleRowLineLevel", function() {
        var linkId;
//        var conditionType = $(this).parent().parent().find("td").eq(1).children(".newConditionTypeLineLevel").val();
        $(this).parent().parent().remove();
        var amount = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".newAmountLineLevel").val());
        var per = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").val());
        var conVal = removeCommaInNumber($(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val());
        var conType = $(this).parent().parent().find("td").eq(1).children(".newConditionTypeLineLevel").val();
        var oldAmount = $(this).parent().parent().find("td").eq(3).children(".AmountLineLevelHidden").val();
        var oldPercentage = $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
        deleteRowFormCondition("");
        /*Code added by SUNNY KUMAR PRAJAPATI on 08 June 2020*/
        var InsertionOrderId = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
                InsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            }
        });
//        var count = 0;
//        if (conditionLineLevelArray.length !== 0) {
//            conditionLineLevelArray.forEach(function(e, index) {
//                console.log("Ctype :" + e.Ctype + " ,conditionType :" + conType);
//                if (conType === e.Ctype && InsertionOrderId === e.itemCode) {
//                    conditionLineLevelArray.splice(index, 1);
//                }
//            });
//            console.log("conditionLineLevelArray after delete Row in line :" + JSON.stringify(conditionLineLevelArray));
//            var flag = false;
//            for (var k = 0; k < conditionLineLevelArray.length; k++) {
//                console.log("Find BITTU out:" + conditionLineLevelArray[k].Ctype);
//                if (conType !== conditionLineLevelArray[k].Ctype) {
//                    count++;
//                } else {
//                    console.log("Find BITTU :" + conditionLineLevelArray[k].Ctype);
//                    flag = true;
//                    break;
//                }
//            }
//            if (flag === false) {
//                $("#conditionTableId tbody tr").each(function(i) {
//                    var condType = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
//                    var changeid = $(this).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
//                    if (condType === conType && changeid === "I") {
//                        console.log("I am Romoving :" + condType);
//                        $(this).remove();
//                        return false;
//                    }
//                });
//            } else if (flag === true) {
//                $("#conditionTableId tbody tr").each(function(i) {
//                    var totalamount = 0;
//                    var totalPer = 0;
//                    var totalConVal = 0;
//                    var ctypeheader = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
//                    var changeid = $(this).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
//                    var current = $(this);
//                    conditionLineLevelArray.forEach(function(e, index) {
//                        var conditionType = e.Ctype;
//                        var linkid = e.linkid;
//                        console.log("ctypeheader :[" + index + "][" + i + "]" + ctypeheader + " ,Ctype :" + e.Ctype + " ,linkId :" + linkId + " ,elinkid :" + e.linkid);
//                        if (ctypeheader === e.Ctype && changeid === e.CHANGEID) {
//                            totalamount = Number(totalamount) + Number(e.amount);
//                            totalPer = Number(totalPer) + Number(e.per);
//                            totalConVal = Number(totalConVal) + Number(e.conditionValue);
////                            current.find("td").eq(3).children(".newAmountHeader").val(Number(totalamount).toFixed(2));
//                            current.find("td").eq(3).children("input[name=AmountHeader]").val(Number(totalamount).toFixed(2));
////                            current.find("td").eq(5).children(".newPerQuantityHeader").val(Number(totalPer).toFixed(2));
//                            current.find("td").eq(5).children("input[name=PerQuantityHeader]").val(Number(totalPer).toFixed(2));
//                            current.find("td").eq(8).children(".ConditionValueHeader").val(Number(totalConVal).toFixed(2));
//                        }
//                    });
//                });
//            }
//            deleteRowFormConditionHeader();
//        }
        saveConditionTabDataOnLoadFieldChange("");
    });
    /*SUNNY KUMAR PRAJAPATI CODE END*/
    $("#serviceTableId").on("click", ".deleteServiceTebleRow", function() {
        var totalNetPrice = 0;
        var netPriceService = 0;
        var current = $(this);
        var serviceLength = $("#serviceTableId tbody tr").length;
        var ischecked = $(this).parent().parent().find("td").eq(0).children(".checkboxServices").prop("checked");
        if (ischecked === false) {
            if (serviceLength !== 1) {
                $(this).parent().parent().remove();
                saveServiceTabDataOnLoadFieldChange();
            } else {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "This Service line can't be deleted !";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                return false;
            }

            $("#serviceTableId tbody tr").each(function() {
                netPriceService = removeCommaInNumber($(this).find("td").eq(9).children('.netPrice_Services').val());
                if (netPriceService !== "") {
                    totalNetPrice = totalNetPrice + parseInt(netPriceService);
                }
            });
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    $(this).find('td').eq(12).children(".pr-net-price").val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                    $(this).find('td').eq(0).children(".prNetPriceHidden").val(Number(totalNetPrice).toFixed(2));
                    calculationForPBXX();
                }
            });
            var row = $("#conditionTableIdLineLevel tbody tr");
            var condLength = $("#conditionTableIdLineLevel tbody tr").length;
            for (var i = 0; i < condLength; i++) {
                var condType = $(row[i]).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").val();
                if (condType !== "") {
                    var amount = removeCommaInNumber($(row[i]).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    if (amount > totalNetPrice) {
                        if (lobiboxNotifyAlert !== null) {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Condition table having Amount greater the Net Price, Please Check..";
                        lobiboxNotifyAlert = Lobibox.notify("info", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        break;
                    }
                }
            }

            calculatePBXXForHeader();
        }

        saveConditionTabDataOnLoadFieldChange();
    });
    var checkBoxArr = [];
    var conditionTableCurrentClick = "";
    $("#conditionTableIdLineLevel").on("click", ".checkConditionTableRowLineLevel", function() {
        var isChasked = $(this).prop("checked");
        checkBoxArr = [];
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop("checked", false);
        });
        if (isChasked === true) {
            $(this).prop("checked", true);
        } else {
            $(this).prop("checked", false);
        }
        conditionTableCurrentClick = $(this);
        var isCheckConditionTable = $(this).prop("checked");
        if (isCheckConditionTable === true) {
            checkBoxArr.push(isCheckConditionTable);
            if (checkBoxArr.length === 1) {
                $("#conditionDetailsBtnLineLevel_div").css("display", "block");
            } else {
                $("#conditionDetailsBtnLineLevel_div").css("display", "none");
            }
        } else {
            var index = checkBoxArr.indexOf(isCheckConditionTable);
            checkBoxArr.splice(index, 1);
            if (checkBoxArr.length === 1) {
                $("#conditionDetailsBtnLineLevel_div").css("display", "block");
            } else {
                $("#conditionDetailsBtnLineLevel_div").css("display", "none");
            }
        }
    });
//    if ($("table.accountAssignmentCategoryTable-Class").length) {
//        $(document).ready(function() {
//            $('#accountAssignmentCategoryTableId thead tr').clone(true).appendTo('#accountAssignmentCategoryTableId thead');
//            $('#accountAssignmentCategoryTableId thead tr:eq(1) th').each(function(i) {
//                $('#accountAssignmentCategoryTableId thead tr:eq(0) th').addClass("table-header-color");
//                var title = $(this).text();
//                if (title === '') {
//                    $(this).html('');
//                } else {
//                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
//                }
//                $('input', this).on('keyup change', function() {
//                    if (table.column(i).search() !== this.value) {
//                        table
//                                .column(i)
//                                .search(this.value)
//                                .draw();
//                    }
//                });
//            });
//            var table = $('table.accountAssignmentCategoryTable-Class').DataTable({
////                "scrollY": 200,
////            "scrollX": true,
//                lengthChange: false,
//                orderCellsTop: true,
//                buttons: [
//                    {
//                        extend: 'collection',
//                        text: 'Export',
//                        //                        buttons: ['copy', 'excel', 'pdf', 'print']
//                        buttons: [
//                            {extend: 'copy', title: 'Assisned PR Details'},
//                            {extend: 'excel', title: 'Assisned PR Details'},
//                            {extend: 'pdf', title: 'Assisned PR Details'},
//                            {extend: 'print', title: 'Assisned PR Details'}
//                        ]
//                    }
//                ]
//            });
//            table.buttons().container()
//                    .appendTo('#accountAssignmentCategoryTableId_wrapper .col-md-6:eq(0)');
//        });
//    }

    var serviceTableId = "";
//    var prevousSelectedItem = $("#ItemNumberSelect").val();
    $(".ItemNumberSelectClass").change(function() {
        var isPrSavedAfterEditDetails = $("#isPrSavedAfterEditDetails").val();
        console.log("isPrSavedAfterEditDetails: " + isPrSavedAfterEditDetails);
        var isAnyFieldValueChanged = $("#isAnyFieldValueChanged").val();
        console.log("isAnyFieldValueChanged: " + isAnyFieldValueChanged);
        console.log("In ItemNumber Change.");
//        clearAllLineLevelFields();
        console.log("In ItemNumber Change. After clearing line level tab.");
        var PoFrom = $("#PoFrom").val();
        console.log("PoFrom: " + PoFrom);
        var accAsgn = "";
        var itemCat = "";
        $("#material_headerClass tbody tr").each(function() {
            var itemcatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $(".ItemNumberSelectClass").val();
            if (id === insertionid) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            }
        });
        if (PoFrom === "editpo")
        {
            var dropDownItemNumber = $(this).val();
            if ((accAsgn === "" || itemCat === "") && dropDownItemNumber !== "") {
                var ch = prLineItemTableValidation();
                if (ch === "1") {
                    $('#lineLevelTabsDiv').css("display", "none");
                    $(this).val("");
                    return false;
                }
            } else if (dropDownItemNumber === "") {
                $('#lineLevelTabsDiv').css("display", "none");
            } else {
                $('#lineLevelTabsDiv').css("display", "block");
            }
            var ch = prLineItemTableValidation();
            if (ch === "1") {
                $('#lineLevelTabsDiv').css("display", "none");
                $(this).val("");
                return false;
            }
        }
        else if (PoFrom === "editApprovedPo" || PoFrom === "shortcutPo")
        {
            var dropDownItemNumber = $(this).val();
            if ((accAsgn === "" || itemCat === "") && dropDownItemNumber !== "") {
                var ch = prLineItemTableValidation();
                if (ch === "1") {
                    $('#lineLevelTabsDiv').css("display", "none");
                    $(this).val("");
                    return false;
                }
            } else if (dropDownItemNumber === "") {
                $('#lineLevelTabsDiv').css("display", "none");
            } else {
                $('#lineLevelTabsDiv').css("display", "block");
            }
            var ch = prLineItemTableValidation();
            if (ch === "1") {
                $('#lineLevelTabsDiv').css("display", "none");
                $(this).val("");
                return false;
            }
        }
        else if (PoFrom === "acknowledgePo")
        {
            var itemNumber = $(this).val();
            if (itemNumber !== "")
                $("#lineLevelTabsDiv").css("display", "block");
            else
                $("#lineLevelTabsDiv").css("display", "none");
        }
        var value = $(this).val();
        if (value === "") {
            $("#lineLevelTabsDiv").css("display", "none");
            prevousSelectedItem = $(this).val();
            return false;
        } else {
            /*Edited by Bittu on 15/09/2020*/
            var PoFrom = $("#PoFrom").val();
            if (prevousSelectedItem !== null && prevousSelectedItem !== "") {
                var isSaved = checkLineLevelFieldsSaveOrNot(prevousSelectedItem);
                if (isSaved === false) {
                    $("#ItemNumberSelect").val(prevousSelectedItem);
                    $("#lineLevelTabsDiv").css("display", "block");
                    return false;
                } else {
                    prevousSelectedItem = $(this).val();
                }
            } else {
                prevousSelectedItem = $(this).val();
            }
//            }
            $("#lineLevelTabsDiv").css("display", "block");
        }
        clearAllLineLevelFields();
        var id = document.getElementById("ItemNumberSelectClass");
        var prLineUOM = "";
        //saurabh
//        $("#component_linelevel").css("display", "none");
        $("#componentPopUpBtnDiv").css("display", "none");
        $("#material_headerClass tbody tr").each(function() {
            var accAsgnCategory = $(this).find('td').eq(2).children(".accountAssignmentClass").val();
            var itemcatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var pr_linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
            var pr_itemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            var pr_isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
            var pr_quantity = $(this).find("td").eq(6).children(".pr-quantity").val();
            var pr_isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            console.log("pr_isPrSaved: " + pr_isPrSaved);
            var insertionid = $(".ItemNumberSelectClass").val();
            if (id === insertionid) {
                if (accAsgnCategory === "" && itemcatogory === "L") {                
//                    $("#component_linelevel").css("display", "block");
                    $("#componentPopUpBtnDiv").css("display", "block");
                    $("#GRNonValuated").prop("checked", false);
                    $("#GRNonValuated").prop("disabled", false);      
                    if(pr_isPrSaved !== "Yes" && pr_isPoLineOrPrLineOrRfqLineOrEmptyLine !== "EmptyLine") {
                        saveComponentsFromCmplxTableToLocalTable(pr_linkId, insertionid, pr_itemNumber, pr_quantity);
                    }
                } else {
                    $("#GRNonValuated").prop("checked", true);
                    $("#GRNonValuated").prop("disabled", true);
                }
            }
            if (id === insertionid) {
                var materialPOText = $(this).find("td").eq(5).children(".pr-short-text").val();
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                $("#MaterialPOText").val(materialPOText);
                $("#MaterialPOText").prop("disabled", true);
                //Change Ref. Doc No. and Ref. Doc Line
                $("#referenceDocNumber").val($(this).find('td').eq(0).children(".prNumber_Class").val());
                $("#referenceDocLine").val($(this).find('td').eq(0).text().trim());
                prLineUOM = $(this).find("td").eq(7).children(".prUom").val();
                //Ended
                var comments = $(this).find("td").eq(0).children(".prComments").val();
                $("#PONoteToApprover").val(comments);
                /*Code By BITTU on 06 May 2020*/
                var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
//                if (isPrSaved === "Yes") {
//                    $('#addRowConditionsBtnId').css('pointer-events', '');
//                    $("#addRowConditionsBtnId").css("background-color", "");
//                } else {
//                    $('#addRowConditionsBtnId').css('pointer-events', 'none');
//                    $("#addRowConditionsBtnId").css("background-color", "#007bff");
//                }
            }
        });
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        if (typeOfPOHeader !== "Inter Company") {
//             $('#hideLineLevelData').css("display", "none");
            $('#hideLineLevelData').css("display", "block");
        }
        if (typeOfPOHeader === "Inter Company") {
            if (accAsgn === "" && itemCat === "") {
                $("#interCompanyAccAsgn").css({display: "block"});
                $(".costCenterDiv").css({display: "none"});
//                $("#earMarkedFundsLabel").css({
//                    "display": "inline",
//                    "margin-left": "8px"
//                });
            } else {
//                $("#validityFromHeaderDiv").css("display", "none");
//                $("#validityToHeaderDiv").css("display", "none");
                $("#interCompanyAccAsgn").css({display: "none"});
                $(".costCenterDiv").css({display: "block"});
            }
        }

        $("#overlay").css("display", "block");
        setTimeout(
                function()
                {

                    var accAsgnDesc;
                    var itemcatogory;
                    var itemCatDesc;
                    //deleted commentd code
                    $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
                    checkboxServicesArr = [];
//        $("#material_headerClass :input").prop("disabled", true);

                    $(".ServicesNumber_Services").val("");
                    $(".shortText_Services").val("");
                    $(".quantity_Services").val("");
                    $(".servicesUnit_Services").val("");
                    $(".grossPrice_Services").val("");
                    $(".currency_Services").val("");
                    $(".netPrice_Services").val("");
                    $(".edition_Services").val("");
                    $(".lineItemLongText_Services").val("");
                    $(".overfTolerance_Services").val("");
                    var insertionid = $(".ItemNumberSelectClass").val();
                    var accountAssignmentCategory;
                    var linkid = "";
                    var LinkID;
                    var linkidArray = [];
                    var lineItemNumber = "";
                    var lineItemNumberArr = [];
                    var PrItemNumber = "";
                    var PrItemNumberArr = [];
                    var assAsgnCat = "";
                    var accAsgnCatArr = [];
                    var PrLinkID = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        if (insertionid === id) {
                            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
//                $(this).find("td").eq(1).children(".accountAssignmentClass").prop("disabled", false); //Commented by nikhil on 11082020
//                $(this).find("td").eq(2).children(".itemCategoryClass").prop("disabled", false); //Commented by nikhil on 11082020
                            linkidArray.push(linkid);
                            lineItemNumber = ($(this).find("td").eq(0).children(".insertionOrderId_Class").val()).trim();
                            PrItemNumber = ($(this).find("td").eq(0).children(".PRItemNumber_Class").val()).trim();
                            assAsgnCat = ($(this).find("td").eq(2).children(".accountAssignmentClass").val()).trim();
                            lineItemNumberArr.push(lineItemNumber);
                            PrItemNumberArr.push(PrItemNumber);
                            accAsgnCatArr.push(assAsgnCat);
                            console.log("insertionid :" + insertionid + " " + "id :" + id);
                            material_header_table_Currency = $(this).find("td").eq(13).children(".currencyClass").val();
                            material_header_table_Current_td = $(this);
                            $(".currency_Services").val(material_header_table_Currency);
                            itemcatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
                            accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                            $("#accountAssignmentCategory").val(accountAssignmentCategory);
                            $("#accountAssignmentCategoryTableId tbody tr").each(function() {
                                var accAsgn = $(this).find("td").eq(1).html();
                                if (accAsgn === accountAssignmentCategory) {
                                    accAsgnDesc = $(this).find("td").eq(2).html();
                                }
                            });
                            $("#itemCategoryTableId tbody tr").each(function() {
                                var itemCat = $(this).find("td").eq(1).html();
                                if (itemcatogory === itemCat) {
                                    itemCatDesc = $(this).find("td").eq(2).html();
                                }
                            });
                            if ((accountAssignmentCategory === 'B' || accountAssignmentCategory === 'D' || accountAssignmentCategory === 'E' || accountAssignmentCategory === 'G' || accountAssignmentCategory === 'M' ||
                                    accountAssignmentCategory === 'Q' || accountAssignmentCategory === 'T')) {
                                if (itemcatogory === 'D') {
                                    Lobibox.alert("error", {
                                        msg: "" + accAsgnDesc + " & " + itemcatogory + " is not a valid combination!"
                                    });
                                    $(this).find('td').eq(3).children(".itemCategoryClass").val("");
                                    $(this).find("td").eq(2).children(".accountAssignmentClass").val("");
                                    if ($("#services").hasClass("active") === true) {
                                        $("#serviceTab_li").css("display", "none");
                                        $("#services-tab").removeClass("active");
                                        $("#services").removeClass("active");
                                        $("#limits_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                                        $("#material").addClass("active");
                                        $("#material-tab").addClass("active");
                                        $("#material-tab").addClass("show");
                                    } else if ($("#limits").hasClass("active") === true) {
                                        $("#limits_li").css("display", "none");
                                        $("#limits-tab").removeClass("active");
                                        $("#limits").removeClass("active");
                                        $("#serviceTab_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                                        $("#material").addClass("active");
                                        $("#material-tab").addClass("active");
                                        $("#material-tab").addClass("show");
                                    } else {
                                        $("#serviceTab_li").css("display", "none");
                                        $("#limits_li").css("display", "none");
                                    }
                                    return false;
                                }
                            } else {
                                $("#serviceTab_li").css("display", "block");
                                $("#limits_li").css("display", "block");
                                if (itemcatogory !== 'D') {
                                    if ($("#services").hasClass("active") === true) {
                                        $("#serviceTab_li").css("display", "none");
                                        $("#services-tab").removeClass("active");
                                        $("#services").removeClass("active");
                                        $("#limits_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                                        $("#material").addClass("active");
                                        $("#material-tab").addClass("active");
                                        $("#material-tab").addClass("show");
                                    } else if ($("#limits").hasClass("active") === true) {
                                        $("#limits_li").css("display", "none");
                                        $("#limits-tab").removeClass("active");
                                        $("#limits").removeClass("active");
                                        $("#serviceTab_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                                        $("#material").addClass("active");
                                        $("#material-tab").addClass("active");
                                        $("#material-tab").addClass("show");
                                    } else {
                                        $("#serviceTab_li").css("display", "none");
                                        $("#limits_li").css("display", "none");
                                    }
                                } else {
                                    $("#serviceTab_li").css("display", "block");
                                    $("#limits_li").css("display", "block");
                                }
                            }

                            {
                                console.log("insertionid :" + insertionid + " " + "id :" + id);
                                var currency = $(this).find("td").eq(13).children(".currencyClass").val();
                                material_header_table_Current_td = $(this);
                                $(".currency_Services").val(material_header_table_Currency);
                                var acountAssgnCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                                $("#accountAssignmentCategory").val(acountAssgnCat);
                                var itemcatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
                                var orderpriceunit = $(this).find("td").eq(0).children(".prOrderPriceUnitHidden").val();
                                var quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());

                                var uom = $(this).find('td').eq(7).children(".prUom").val();
                                var perPrice = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
                                var itemNumber = $(this).find('td').eq(1).text();
                                var prNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
                                var deliveryDate = $(this).find('td').eq(11).children(".PR_DeliveryDate").text();
                                var deliveryDateDategory = $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val();
                                var prMaterialCode = $(this).find("td").eq(0).children(".prMaterialCodeHidden").val();
                                var prMfrPartNumber = $(this).find("td").eq(0).children(".prMfrPartNumber").val();
                                var prManufacturer = $(this).find("td").eq(0).children(".prManufacturer").val();
                                var prCompanyCode = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
                                var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                                console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);
                                var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
                                console.log("isPrSaved: " + isPrSaved);
                                var newDD = "";
                                console.log("deliveryDate: " + deliveryDate);
                                if (deliveryDate !== "")
                                {
                                    var ddSplit = deliveryDate.toString().split(".");
//                        var months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "July": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"};
                                    var months = {"01": "01", "02": "02", "03": "03", "04": "04", "05": "05", "06": "06", "07": "07", "08": "08", "09": "09", "10": "10", "11": "11", "12": "12"};
                                    newDD = ddSplit[2] + "-" + months[ddSplit[1]] + "-" + ddSplit[0];
                                    console.log("newDD: " + newDD);
                                }
                                $("#DeliveryScheduleTableId tbody").find("tr:gt(0)").remove();
                                $("#DeliveryScheduleTableId tbody tr").each(function(index) {
                                    console.log("newDD in loop: " + newDD);
                                    $(this).find("td").eq(0).children(".deliveryDateCategory").val(deliveryDateDategory);
                                    $(this).find("td").eq(1).children(".deliveryDateClass").val(deliveryDate);
                                    $(this).find("td").eq(3).children(".scheduledQuantityClass").val(formatNumberByComma(quantity));
                                    $(this).find("td").eq(5).children(".prNumberDeliveryScheduledClass").val(prNumber);
                                    $(this).find("td").eq(6).children(".reqItemNumberClass").val(prNumber === "" ? "" : itemNumber);
                                    $(this).find("td").eq(2).children(".statisticaldeliveryDateClass").val(deliveryDate);
                                    $(this).find("td").eq(9).children(".schLineClass").val(index + 1);
                                });
                                var PrType = $(this).find("td").eq(0).children(".prType_Class").val();
                                if (PrType === 'Capital PR for Services' || PrType === 'PR for Services')
                                {
                                    $("#pOQuantity").val(quantity !== "" ? formatNumberByComma(quantity) : quantity);
                                    $("#pOUnit").val(uom);
                                    $("#orderUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                                    $("#unitOrderUnit").val(uom);
                                    $("#orderPriceUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                                    $("#unitOrderPriceUnit").val(uom);
                                    $("#pOQuantitySKU").val("");
                                    $("#pOUnitSKU").val("");
                                    $("#orderUnit2").val("");
                                    $("#unitOrderUnit2").val("");
                                    $("#sKUUnit").val("");
                                    $("#unitSKUUnit").val("");
                                }
                                else
                                {
                                    $("#pOQuantity").val(quantity !== "" ? formatNumberByComma(quantity) : "");
                                    $("#pOUnit").val(uom);
                                    $("#orderUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                                    $("#unitOrderUnit").val(uom);
                                    $("#orderPriceUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                                    $("#unitOrderPriceUnit").val(uom);
                                    $("#pOQuantitySKU").val(quantity !== "" ? formatNumberByComma(quantity) : "");
                                    $("#pOUnitSKU").val(uom);
                                    $("#orderUnit2").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                                    $("#unitOrderUnit2").val(uom);
                                    $("#sKUUnit").val(perPrice !== "" ? formatAmountByComma(perPrice) : "");
                                    $("#unitSKUUnit").val(uom);
                                }

                                // Set Planned Delivery Time in Delivery Tab Starts
                                $.ajax({
                                    type: "GET",
                                    url: "standalonepoajaxrequest.do",
                                    async: false,
                                    data: {
                                        "reqFrom": "FindPlanDelvTimeByMaterialCode",
                                        "materialCode": prMaterialCode
                                    },
                                    complete: function(responseJson) {
                                        var obj = $.parseJSON(responseJson.responseText);
                                        var PlannedDelvTime = obj.PlannedDelvTime;
                                        console.log("PlannedDelvTime: " + PlannedDelvTime);
                                        if (PlannedDelvTime !== "PlannedDelvTimeIsNullOrEmpty" && PlannedDelvTime !== "NoTimeFound")
                                        {
                                            $("#PlDeliveryTime").val(PlannedDelvTime);
                                        }
                                    }
                                });
                                // Set Planned Delivery Time in Delivery Tab Ends

                                if (isPrSaved === "Yes")
                                {
                                    $("#isPrSavedAfterEditDetails").val("No");
                                    $("#isAnyFieldValueChanged").val("No");
                                }
                                else
                                {
                                    $("#isPrSavedAfterEditDetails").val("Yes");
                                    $("#isAnyFieldValueChanged").val("No");
                                }
                                $("#isPrSavedAlready").val(isPrSaved);
                                //Set Invoice Tab Fields Starts
                                var invoiceReceiptHidden = $(this).find("td").eq(0).children(".invoiceReceiptHidden").val();
                                var goodsReceiptHidden = $(this).find("td").eq(0).children(".goodsReceiptHidden").val();
                                if (invoiceReceiptHidden === "true")
                                {
                                    $("#InvoiceReceipt").prop("checked", true);
                                }
                                else
                                {
                                    $("#InvoiceReceipt").prop("checked", false);
                                }
                                if (goodsReceiptHidden === "true")
                                {
                                    $("#GRBasedIV").prop("checked", true);
                                }
                                else
                                {
                                    $("#GRBasedIV").prop("checked", false);
                                }
                                $("#InvoiceReceipt").prop("disabled", true);
                                $("#GRBasedIV").prop("disabled", true);
                                if ($("#PoFrom").val() !== "createpo" && $("#PoFrom").val() !== "byrfq")
                                {
                                    if (itemcatogory === 'D')
                                        $("#FinalInvoice").prop("disabled", false);
                                    else
                                        $("#FinalInvoice").prop("disabled", true);
                                }
                                else
                                {
                                    $("#FinalInvoice").prop("disabled", true);
                                }
                                if ($("#PrType").val() === "Material") {
                                    $("#serviceBasedIV").prop("checked", false);
                                    $("#serviceBasedIVDiv").css("display", "none");
                                } else {
                                    $("#serviceBasedIVDiv").css("display", "block");
                                }
                                if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "EmptyLine") {
                                    $("#InvoiceReceipt").prop("checked", true);
                                    $("#GRBasedIV").prop("checked", true);
                                    $("#InvoiceReceipt").prop("disabled", true);
                                    $("#GRBasedIV").prop("disabled", true);
                                }
                                //Set Invoice Tab Fields Ends

                                // Set Material Tab
                                $("#mfrPartNumber").val(prMfrPartNumber);
                                $("#manufacturer").val(prManufacturer);

                                // Set Valuation Type field in delivery tab by nikhil on 12112020
                                if ($("#PrType").val() === "Material") {
                                    var jsonMaterialArr = getMaterialMasterOnLoad(prMaterialCode, prCompanyCode);
                                    console.log("jsonMaterialArr len2: " + jsonMaterialArr.length);
                                    if (jsonMaterialArr.length > 0) {
                                        var valuationType = jsonMaterialArr[0].valuationType;
                                        console.log("valuationType: " + valuationType);
                                        $("#ValuationType").val(valuationType);
                                    }
                                } else {
                                    $("#ValuationType").val("");
                                }

                                // Set Acc Ass Cat in AccAss Tab Starts
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
                                        var AccAssCat = obj.AccAssCat;
                                        console.log("AccAssCat: " + AccAssCat);
                                        if (AccAssCat !== "NotFound")
                                        {
                                            $("#accountAssignmentCategoryDisplay").val(AccAssCat);
                                        }
                                    }
                                });
                                // Set Acc Ass Cat in AccAss Tab Ends
                                
                                if ($("#PrType").val() === "Material" && acountAssgnCat !== "") {
                                    $("#replicateMainAccAssBtn").prop("disabled", false);
                                } else {
                                    $("#replicateMainAccAssBtn").prop("disabled", true);
                                }
                            }
                            /*-----------For Populate values in AccountAssignment Distribution dropdown------*/
                            var prType = $(this).find("td").eq(0).children(".prType_Class").val();
//                if (prType === 'Capital PR for Services' || prType === 'PR for Services') {
//                    getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId(linkid);
//                }
                            var PrType = $("#PrType").val();
                            if (PrType === "Service") {
//                                var PoFrom = $("#PoFrom").val();
                                if ($("#PoFrom").val() === "createpo" || $("#PoFrom").val() === "byrfq") {
                                    saveServiceAndAccountAssignment(linkidArray, lineItemNumberArr, PrItemNumberArr, accAsgnCatArr, linkid);
                                }
                            }
                        }

                        if (accountAssignmentCategory === 'K') {
                            accAsgnCat_K_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_K("itemCatDropDown");
                            limits_AccAsgnCat_K("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'N') {
                            accAsgnCat_N_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_N("itemCatDropDown");
                            limits_AccAsgnCat_N("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'A') {
                            accAsgnCat_A_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_A("itemCatDropDown");
                            limits_AccAsgnCat_A("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'B') {
                            accAsgnCat_B_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'C') {
                            accAsgnCat_C_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_C("itemCatDropDown");
                            limits_AccAsgnCat_C("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'D') {
                            accAsgnCat_D_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'E') {
                            accAsgnCat_E_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'F') {
                            accAsgnCat_F_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_F("itemCatDropDown");
                            limits_AccAsgnCat_F("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'G') {
                            accAsgnCat_G_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'M') {
                            accAsgnCat_M_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'P') {
                            accAsgnCat_P_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_P("itemCatDropDown");
                            limits_AccAsgnCat_P("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'Q') {
                            accAsgnCat_Q_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'R') {
                            accAsgnCat_R_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_R("itemCatDropDown");
                            limits_AccAsgnCat_R("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'T') {
                            accAsgnCat_T_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'U') {
                            accAsgnCat_U_Dist_SAA("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'X') {
                            accAsgnCat_X_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_X("itemCatDropDown");
                            limits_AccAsgnCat_X("itemCatDropDown");
                        } else if (accountAssignmentCategory === 'Z') {
                            accAsgnCat_Z_Dist_SAA("itemCatDropDown");
                            service_AccAsgnCat_Z("itemCatDropDown");
                            limits_AccAsgnCat_Z("itemCatDropDown");
                        }

//            var PoFrom = $("#PoFrom").val();
//            if (PoFrom === "createpo" || PoFrom === "byrfq" || PoFrom === "shortcutPo") {
                        var CompanyCode = "";
                        var matCode = "";
                        var isPoLineOrPrLineOrRfqLineOrEmptyLine = "";
                        if (id === insertionid) {
                            matCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                            CompanyCode = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
                            isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                        }
                        if (matCode !== "" && isPoLineOrPrLineOrRfqLineOrEmptyLine !== "PoLine") {
                            var jsonArr = getMaterialMasterOnLoad(matCode, CompanyCode);
                            if (jsonArr.length !== 0) {
                                if (jsonArr[0].orderUnit !== jsonArr[0].baseUOM) {
                                    var infoRecordJsonObj = fetchInfoRecordDetails(matCode, "PR");
                                    console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));
                                    populateQtyWeights(jsonArr, $(this), infoRecordJsonObj);
                                }
                            }
                        }
//            }
                    });
                    var linkid;
                    var isPrSaved;
                    var currency;
                    var isPoLineOrPrLineOrRfqLineOrEmptyLine;
                    $("#material_headerClass tbody tr").each(function() {
                        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        var insertionid = $("#ItemNumberSelect").val();
                        if (insertionid === id) {
                            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                            isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
                            currency = $(this).find("td").eq(13).children(".currencyClass").val();
                            isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                        }
                    });
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data:
                                {
                                    "reqFrom": "getServicesByInsertionId",
                                    "insertionid": insertionid,
                                    "linkid": linkid
                                },
                        dataType: "json",
                        complete: function(responseJson)
                        {
                            var obj = $.parseJSON(responseJson.responseText);
                            var row = "";
                            var PoFrom = $("#PoFrom").val();
                            console.log("PoFrom: " + PoFrom);
                            var IsServOldOrNew = "";
                            $("#serviceTableId tbody tr").remove();
                            if (obj.jArraService.length !== 0) {
                                for (var i = 0; i < obj.jArraService.length; i++) {
                                    IsServOldOrNew = obj.jArraService[i].IsServOldOrNew;
                                    if (i === 0) {
                                        row += "<tr>\n\
                                    <td><input type='checkbox' class='checkboxServices' title='View service account assignment'>\n\
                                    <input type='hidden' class='isProfitabilitySegmentDataSaved' value='Yes'>\n\
                                    <input type='hidden' class='saveSarviceAccountAssignment' value='Yes'>\n\
                                    <input type='hidden' class='ServiceAccAssDist' value='" + (obj.jArraService[i].ServiceAccAssDist === undefined ? '' : obj.jArraService[i].ServiceAccAssDist) + "'>\n\
                                    <input type='hidden' class='lineNumberService' value='" + (obj.jArraService[i].LINENUMBERSERVICE === undefined ? '' : obj.jArraService[i].LINENUMBERSERVICE) + "'>\n\
                                    <input type='hidden' class='LinkId' value='" + (obj.jArraService[i].LINKID === undefined ? '' : obj.jArraService[i].LINKID) + "'>\n\
                                    <input type='hidden' class='serviceId' value='" + (obj.jArraService[i].SERVICE_ID === undefined ? '' : obj.jArraService[i].SERVICE_ID) + "'>\n\
                                    <input type='hidden' class='ServiceLinkId' value=" + (obj.jArraService[i].SERVICELINKID === undefined ? '' : obj.jArraService[i].SERVICELINKID) + "></td>\n\\n\
                                    <td>" + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' && isPoLineOrPrLineOrRfqLineOrEmptyLine === 'PoLine' && IsServOldOrNew !== 'Yes' ? "<input type='checkbox' class='selectServiceToDeleteFromSAP' title='Select service to delete from SAP'>" : '') + "</td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded lineItemNumberServices tableInputField' value='" + (obj.jArraService[i].SERVICELINEITEMNUMBER === undefined ? '' : obj.jArraService[i].SERVICELINEITEMNUMBER) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded ServicesNumber_Services tableInputField' style='width: 100px;' value='" + (obj.jArraService[i].SERVICENUMBER === undefined ? '' : obj.jArraService[i].SERVICENUMBER) + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' readonly class='form-control form-rounded shortText_Services tableInputField' style='width: 150px;display: inline-block;' value='Short text...'> <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' " + (PoFrom === 'createpo' || PoFrom === 'byrfq' ? '' : '') + " class='form-control form-rounded quantity_Services tableInputField' style='width:150px;' value='" + (obj.jArraService[i].QUANTITY === undefined ? '' : formatNumberByComma(Number(obj.jArraService[i].QUANTITY).toFixed(3))) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded servicesUnit_Services tableInputField' style='width:70px;' value='" + (obj.jArraService[i].UNIT === undefined ? '' : obj.jArraService[i].UNIT) + "'></td>\n\
                                    <td><input type='text' " + (PoFrom === 'createpo' || PoFrom === 'byrfq' ? 'readonly' : '') + " class='form-control form-rounded grossPrice_Services tableInputField' style='width:150px;' value='" + (obj.jArraService[i].GROSSPRICE === undefined ? '' : formatAmountByComma(Number(obj.jArraService[i].GROSSPRICE).toFixed(2))) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded currency_Services tableInputField' style='width: 55px;' value='" + (obj.jArraService[i].CURRENCY === undefined ? '' : obj.jArraService[i].CURRENCY) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded netPrice_Services tableInputField' style='width:150px;' value='" + (obj.jArraService[i].NETPRICE === undefined ? '' : formatAmountByComma(Number(obj.jArraService[i].NETPRICE).toFixed(2))) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded edition_Services tableInputField' style='width:100px;' value='" + (obj.jArraService[i].EDITION === undefined ? '' : obj.jArraService[i].EDITION) + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' readonly class='form-control form-rounded lineItemLongText_Services tableInputField' style='width: 150px;display: inline-block;' value='Line item long text...'> <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded overfTolerance_Services tableInputField' value='" + (obj.jArraService[i].OVERFTOLERANCE === undefined ? '' : obj.jArraService[i].OVERFTOLERANCE) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceNetValue tableInputField' style='width:150px;' readonly value='" + (obj.jArraService[i].NET_VALUE === undefined ? "" : formatAmountByComma(Number(obj.jArraService[i].NET_VALUE).toFixed(2))) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceActualQty tableInputField' readonly value=''></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded serviceText tableInputField' readonly value='Service text...' style='width: 150px;display: inline-block;'> <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td>\n\
                                    <td><i title='Delete Row' class='fa fa-window-close btn-lg deleteServiceTebleRow' aria-hidden='true' style='width:10px;'></i></td>\n\
                                </tr>";
                                    } else {
                                        row += "<tr>\n\
                                    <td><input type='checkbox' class='checkboxServices' title='View service account assignment'>\n\
                                    <input type='hidden' class='isProfitabilitySegmentDataSaved' value='Yes'>\n\
                                    <input type='hidden' class='saveSarviceAccountAssignment' value='Yes'>\n\
                                    <input type='hidden' class='ServiceAccAssDist' value='" + (obj.jArraService[i].ServiceAccAssDist === undefined ? '' : obj.jArraService[i].ServiceAccAssDist) + "'>\n\
                                    <input type='hidden' class='lineNumberService' value='" + (obj.jArraService[i].LINENUMBERSERVICE === undefined ? '' : obj.jArraService[i].LINENUMBERSERVICE) + "'>\n\
                                    <input type='hidden' class='LinkId' value='" + (obj.jArraService[i].LINKID === undefined ? '' : obj.jArraService[i].LINKID) + "'>\n\
                                    <input type='hidden' class='serviceId' value='" + (obj.jArraService[i].SERVICE_ID === undefined ? '' : obj.jArraService[i].SERVICE_ID) + "'>\n\
                                    <input type='hidden' class='ServiceLinkId' value=" + (obj.jArraService[i].SERVICELINKID === undefined ? '' : obj.jArraService[i].SERVICELINKID) + "></td>\n\\n\
                                    <td>" + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' && isPoLineOrPrLineOrRfqLineOrEmptyLine === 'PoLine' && IsServOldOrNew !== 'Yes' ? "<input type='checkbox' class='selectServiceToDeleteFromSAP' title='Select service to delete from SAP'>" : '') + "</td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded lineItemNumberServices tableInputField' value='" + (obj.jArraService[i].SERVICELINEITEMNUMBER === undefined ? '' : obj.jArraService[i].SERVICELINEITEMNUMBER) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded ServicesNumber_Services tableInputField' style='width: 100px;' value='" + (obj.jArraService[i].SERVICENUMBER === undefined ? '' : obj.jArraService[i].SERVICENUMBER) + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' readonly class='form-control form-rounded shortText_Services tableInputField' style='width: 150px;display: inline-block;' value='Short text...'> <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' " + (PoFrom === 'createpo' || PoFrom === 'byrfq' ? '' : '') + " class='form-control form-rounded quantity_Services tableInputField' style='width:150px;' value='" + (obj.jArraService[i].QUANTITY === undefined ? '' : formatNumberByComma(Number(obj.jArraService[i].QUANTITY).toFixed(3))) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded servicesUnit_Services tableInputField' style='width:70px;' value='" + (obj.jArraService[i].UNIT === undefined ? '' : obj.jArraService[i].UNIT) + "'></td>\n\
                                    <td><input type='text' " + (PoFrom === 'createpo' || PoFrom === 'byrfq' ? 'readonly' : '') + " class='form-control form-rounded grossPrice_Services tableInputField' style='width:150px;' value='" + (obj.jArraService[i].GROSSPRICE === undefined ? '' : formatAmountByComma(Number(obj.jArraService[i].GROSSPRICE).toFixed(2))) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded currency_Services tableInputField' style='width: 55px;' value='" + (obj.jArraService[i].CURRENCY === undefined ? '' : obj.jArraService[i].CURRENCY) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded netPrice_Services tableInputField' style='width:150px;' value='" + (obj.jArraService[i].NETPRICE === undefined ? '' : formatAmountByComma(Number(obj.jArraService[i].NETPRICE).toFixed(2))) + "'></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded edition_Services tableInputField' style='width:100px;' value='" + (obj.jArraService[i].EDITION === undefined ? '' : obj.jArraService[i].EDITION) + "'></td>\n\
                                    <td style='text-align: center'><input type='hidden' readonly class='form-control form-rounded lineItemLongText_Services tableInputField' style='width: 150px;display: inline-block;' value='Line item long text...'> <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td>\n\
                                    <td><input type='text' readonly class='form-control form-rounded overfTolerance_Services tableInputField' value='" + (obj.jArraService[i].OVERFTOLERANCE === undefined ? '' : obj.jArraService[i].OVERFTOLERANCE) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceNetValue tableInputField' style='width:150px;' readonly value='" + (obj.jArraService[i].NET_VALUE === undefined ? "" : formatAmountByComma(Number(obj.jArraService[i].NET_VALUE).toFixed(2))) + "'></td>\n\
                                    <td><input type='text' class='form-control form-rounded serviceActualQty tableInputField' readonly value=''></td>\n\
                                    <td style='text-align: center'><input type='hidden' class='form-control form-rounded serviceText tableInputField' readonly value='Service text...' style='width: 150px;display: inline-block;'> <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td>\n\
                                    <td><i title='Delete Row' class='fa fa-window-close btn-lg deleteServiceTebleRow' aria-hidden='true' style='width:10px;'></i></td>\n\
                                </tr>";
                                    }
                                }
                                $("#serviceTableId tbody").append(row);
                                var PoFrom = $("#PoFrom").val();
                                if (PoFrom === "createpo" || PoFrom === "byrfq" || PoFrom === "shortcutPo") {
                                    $("#serviceTableId tr").each(function() {
                                        $(this).find("th").eq(1).css("display", "none");
                                        $(this).find("td").eq(1).css("display", "none");
                                    });
                                } else {
                                    $("#serviceTableId tr").each(function() {
                                        $(this).find("th").eq(1).css("display", "");
                                        $(this).find("td").eq(1).css("display", "");
                                    });
                                }

                                if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                                    var prNumber = "";
                                    $("#material_headerClass tbody tr").each(function() {
                                        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                        var insertionid = $("#ItemNumberSelect").val();
                                        if (insertionid === id) {
                                            prNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
                                        }
                                    });
                                    if (prNumber !== "") {
                                        if ($('#addRowServiceBtnId').is(':visible'))
                                        {
                                            $("#addRowServiceBtnId").css("display", "none");
                                        } else {
                                            $("#addRowServiceBtnId").css("display", "none");
                                        }
                                    } else {
                                        $("#addRowServiceBtnId").css("display", "");
                                    }
                                }
                            } else {
                                var PoFrom = $("#PoFrom").val();
                                if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                                    var typeOfLine = "";
                                    var prNumber = "";
                                    var linkid = "";
                                    $("#material_headerClass tbody tr").each(function() {
                                        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                        var insertionid = $("#ItemNumberSelect").val();
                                        if (insertionid === id) {
                                            typeOfLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                                            prNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
                                            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                                        }
                                    });
                                    if (prNumber === "") {
                                        if ($('#addRowServiceBtnId').is(':visible'))
                                        {
                                            $("#addRowServiceBtnId").css("display", "");
                                        } else {
                                            $("#addRowServiceBtnId").css("display", "");
                                        }
                                    }
                                    if (typeOfLine === "EmptyLine") {
                                        ifServiceIsEmpty(currency, linkid);
                                        $("#serviceTableId tr").each(function() {
                                            $(this).find("td").eq(1).css("display", "none");
                                            $(this).find("th").eq(1).css("display", "none");
                                        });
                                    }
                                }
                            }
                            if (obj.jArraDelivery.length !== 0) {
                                console.log("obj.jArraDelivery.length: " + obj.jArraDelivery.length);
                                for (var i = 0; i < obj.jArraDelivery.length; i++) {
                                    var delCompleted = obj.jArraDelivery[i].DELCOMPLETED;
                                    if (delCompleted === 'true') {
                                        $("#DelivCompleted").prop("checked", true);
                                    } else {
                                        $("#DelivCompleted").prop("checked", false);
                                    }
                                    $("#OverdeliveryTolerance").val(obj.jArraDelivery[i].OVERDELTOL);
                                    $("#UnderdeliveryTolerance").val(obj.jArraDelivery[i].UNDERDELTOL);
                                    $("#ShippingInstruction").val(obj.jArraDelivery[i].SHIPPING_INSTRUCTION);
                                    $("#StockType").val(obj.jArraDelivery[i].STOCKTYPE);
                                    $("#ValuationType").val(obj.jArraDelivery[i].VALUATIONTYPE);
                                    $("#RemShelfLife").val(obj.jArraDelivery[i].REM_SHEL_FLIFE);
                                    $("#QAControlLife").val(obj.jArraDelivery[i].QA_CONTROL_LIFE);
                                    $("#GRProcTime").val(obj.jArraDelivery[i].GR_PROC_TIME);
                                    $("#FirstReminderExpediter").val(obj.jArraDelivery[i].FIRST_REM);
                                    $("#SecondReminderExpediter").val(obj.jArraDelivery[i].SECOND_REM);
                                    $("#ThirdReminderExpediter").val(obj.jArraDelivery[i].THIRD_REM);
                                    $("#DelivCompleted").val();
                                    $("#NoExpend").val(obj.jArraDelivery[i].NOEXPEND);
                                    $("#PlDeliveryTime").val(obj.jArraDelivery[i].PLDELTIME);
                                    $("#incoTermsPart1Delivery").val(obj.jArraDelivery[i].INCOTERMS1);
                                    $("#incoTermsPart2Delivery").val(obj.jArraDelivery[i].INCOTERMS);
                                    if (obj.jArraDelivery[i].UNLIMITED === "true" || obj.jArraDelivery[i].UNLIMITED === "True") {
                                        $("#unlimited").prop("checked", true);
                                    } else {
                                        $("#unlimited").prop("checked", false);
                                    }
                                    if (obj.jArraDelivery[i].GOODRECEIPT === "true" || obj.jArraDelivery[i].UNLIMITED === "True") {
                                        $("#GoodsReceipt").prop("checked", true);
                                    } else {
                                        $("#GoodsReceipt").prop("checked", false);
                                    }
                                    if (obj.jArraDelivery[i].GRNONVALUATED === "true" || obj.jArraDelivery[i].GRNONVALUATED === "True") {
                                        $("#GRNonValuated").prop("checked", true);
                                    } else {
                                        $("#GRNonValuated").prop("checked", false);
                                    }
                                }
                            }
                            if (obj.jArraInvoice.length !== 0) {
                                for (var i = 0; i < obj.jArraInvoice.length; i++) {
                                    if (obj.jArraInvoice[i].INVOICE_RECEIPT === 'true' || obj.jArraInvoice[i].INVOICE_RECEIPT === 'True') {
                                        $("#InvoiceReceipt").prop("checked", true);
                                    } else {
                                        $("#InvoiceReceipt").prop("checked", false);
                                    }
                                    if (obj.jArraInvoice[i].FINAL_INVOICE === 'true' || obj.jArraInvoice[i].FINAL_INVOICE === 'True') {
                                        $("#FinalInvoice").prop("checked", true);
                                    } else {
                                        $("#FinalInvoice").prop("checked", false);
                                    }
                                    if (obj.jArraInvoice[i].GR_BASED_IV === 'true' || obj.jArraInvoice[i].GR_BASED_IV === 'True') {
                                        $("#GRBasedIV").prop("checked", true);
                                    } else {
                                        $("#GRBasedIV").prop("checked", false);
                                    }
                                    if (obj.jArraInvoice[i].SERVICE_BASED_IV === 'true' || obj.jArraInvoice[i].SERVICE_BASED_IV === 'True') {
                                        $("#serviceBasedIV").prop("checked", true);
                                    } else {
                                        $("#serviceBasedIV").prop("checked", false);
                                    }
                                    $("#DPCategory").val(obj.jArraInvoice[i].DP_CATEGORY);
                                    $("#TaxCode").val(obj.jArraInvoice[i].TAXCODE);
                                    var PoFrom = $("#PoFrom").val();
                                    if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                                        $("#TexCodeForLine").val(obj.jArraInvoice[i].TAXCODE);
                                    }
                                }
                            }
                            if (obj.jArraText.length !== 0) {
                                for (var i = 0; i < obj.jArraText.length; i++) {
                                    $("#ItemText").val(obj.jArraText[i].ITEMTEXT);
                                    $("#InfoRecordPOText").val(obj.jArraText[i].INFO_RECORD_POTEXT);
                                    $("#MaterialPOText").val(obj.jArraText[i].MATERIAL_POTEXT);
                                    $("#PONoteToApprover").val(obj.jArraText[i].PO_NOTES_TO_APPROVER);
                                    $("#DeliveryText").val(obj.jArraText[i].DELIVERY_TEXT);
                                    $("#prNoteToApproval").val(obj.jArraText[i].PR_NOTES_TO_APPROVER);
                                }
                            }
                            if (obj.jArraAddress.length !== 0) {
                                for (var i = 0; i < obj.jArraAddress.length; i++) {
                                    if (obj.jArraAddress[i].TITLE !== undefined && obj.jArraAddress[i].TITLE !== "") {
                                        $("#Title").val(obj.jArraAddress[i].TITLE);
                                    }
                                    $("#Name1").val(obj.jArraAddress[i].NAME1);
                                    $("#Name2").val(obj.jArraAddress[i].NAME2);
                                    $("#Street").val(obj.jArraAddress[i].STREET);
                                    $("#HouseNumber").val(obj.jArraAddress[i].HOUSE_NUMBER);
                                    $("#PostalCode").val(obj.jArraAddress[i].POSTAL_CODE);
                                    $("#City").val(obj.jArraAddress[i].CITY);
                                    $("#countryCode").val(obj.jArraAddress[i].COUNTRY_CODE);
                                    $("#countryDesc").val(obj.jArraAddress[i].COUNTRY_DESC);
                                }
                            }
                            if (obj.jArraConf.length !== 0) {
                                for (var i = 0; i < obj.jArraConf.length; i++) {
                                    $("#confControlLimits").val(obj.jArraConf[i].CONF_CONTROL);
                                    $("#OrderAck").val(obj.jArraConf[i].ORDER_ACK);
//                        $("#ConfirmationRequired").val(obj.jArraConf[i].CONF_REQ);
                                    if (obj.jArraConf[i].CONF_REQ === 'true') {
                                        $("#ConfirmationRequired").prop("checked", true);
                                    } else {
                                        $("#ConfirmationRequired").prop("checked", false);
                                    }
                                }
                            }
                            if (obj.jArraCond.length !== 0) {
                                for (var i = 0; i < obj.jArraCond.length; i++) {
                                    if (obj.jArraCond[i].ESTIMATE_PRICE === 'true' || obj.jArraCond[i].ESTIMATE_PRICE === 'True') {
                                        $("#EstimatedPrice").prop("checked", true);
                                    } else {
                                        $("#EstimatedPrice").prop("checked", false);
                                    }
                                    if (obj.jArraCond[i].PRINT_PRICE === 'true' || obj.jArraCond[i].PRINT_PRICE === 'True') {
                                        $("#PrintPrice").prop("checked", true);
                                    } else {
                                        $("#PrintPrice").prop("checked", false);
                                    }
                                }
                            } else {
                                $("#PrintPrice").prop("checked", true);
                            }
                            if (obj.jArraCustomerData.length !== 0) {
                                for (var i = 0; i < obj.jArraCustomerData.length; i++) {
                                    $("#ProductOriginLine").val(obj.jArraCustomerData[i].PRODUCT_ORIGIN);
                                    $("#SegmentDescriptionLine").val(obj.jArraCustomerData[i].SEGMENT);
                                }
                            }
                            if (obj.jArraQuantity.length !== 0) {
                                for (var i = 0; i < obj.jArraQuantity.length; i++) {
                                    $("#pOQuantity").val(obj.jArraQuantity[i].POQuantity !== undefined && obj.jArraQuantity[i].POQuantity !== "" ? formatNumberByComma(obj.jArraQuantity[i].POQuantity) : "");
                                    $("#pOUnit").val(obj.jArraQuantity[i].Unit_POQuantity);
                                    $("#orderUnit").val(obj.jArraQuantity[i].OrderUnit !== undefined && obj.jArraQuantity[i].OrderUnit !== "" ? formatAmountByComma(obj.jArraQuantity[i].OrderUnit) : "");
                                    $("#unitOrderUnit").val(obj.jArraQuantity[i].Unit_OrderUnit);
                                    $("#orderPriceUnit").val(obj.jArraQuantity[i].OrderPriceUnit !== undefined && obj.jArraQuantity[i].OrderPriceUnit !== "" ? formatAmountByComma(obj.jArraQuantity[i].OrderPriceUnit) : "");
                                    $("#unitOrderPriceUnit").val(obj.jArraQuantity[i].Unit_OrderPriceUnit);
                                    console.log("PrType in Qty/Wt change: " + $("#PrType").val());
                                    if ($("#PrType").val() === "Material") {
                                        $("#pOQuantitySKU").val(obj.jArraQuantity[i].POQuantityInSKU !== undefined && obj.jArraQuantity[i].POQuantityInSKU !== "" ? formatNumberByComma(obj.jArraQuantity[i].POQuantityInSKU) : "");
                                        $("#pOUnitSKU").val(obj.jArraQuantity[i].Unit_POQuantityInSKU);
                                        $("#orderUnit2").val(obj.jArraQuantity[i].OrderUnitSKU !== undefined && obj.jArraQuantity[i].OrderUnitSKU !== "" ? formatAmountByComma(obj.jArraQuantity[i].OrderUnitSKU) : "");
                                        $("#unitOrderUnit2").val(obj.jArraQuantity[i].Unit_OrderUnitSKU);
                                        $("#sKUUnit").val(obj.jArraQuantity[i].SKU !== undefined && obj.jArraQuantity[i].SKU !== "" ? formatAmountByComma(obj.jArraQuantity[i].SKU) : "");
                                        $("#unitSKUUnit").val(obj.jArraQuantity[i].Unit_SKU);
                                    } else {
                                        $("#pOQuantitySKU").val("");
                                        $("#pOUnitSKU").val("");
                                        $("#orderUnit2").val("");
                                        $("#unitOrderUnit2").val("");
                                        $("#sKUUnit").val("");
                                        $("#unitSKUUnit").val("");
                                    }
                                    $("#netWeight").val(obj.jArraQuantity[i].NetWeight !== "" ? formatAmountByComma(obj.jArraQuantity[i].NetWeight) : "");
                                    $("#grossWeight").val(obj.jArraQuantity[i].GrossWeight !== "" ? formatAmountByComma(obj.jArraQuantity[i].GrossWeight) : "");
                                    $("#volume").val(obj.jArraQuantity[i].Volume !== "" ? formatAmountByComma(obj.jArraQuantity[i].Volume) : "");
                                    $("#points").val(obj.jArraQuantity[i].Points !== "" ? formatAmountByComma(obj.jArraQuantity[i].Points) : "");
                                    $("#netWeightUnit").val(obj.jArraQuantity[i].NetWeightUnit);
                                    $("#grossWeightUnit").val(obj.jArraQuantity[i].GrossWeightUnit);
                                    $("#volumeUnit").val(obj.jArraQuantity[i].VolumeUnit);
                                    $("#pointsUnit").val(obj.jArraQuantity[i].PointsUnit);
                                    $("#netWeightPerPrice").val(obj.jArraQuantity[i].NetWeightPerPrice);
                                    $("#grossWeightPerPrice").val(obj.jArraQuantity[i].GrossWeightPerPrice);
                                    $("#volumePerPrice").val(obj.jArraQuantity[i].VolumePerPrice);
                                    $("#pointsPerPrice").val(obj.jArraQuantity[i].PointsPerPrice);
                                    $("#netWeightOrderUnit").val(obj.jArraQuantity[i].NetWeightOrderUnit);
                                    $("#grossWeightOrderUnit").val(obj.jArraQuantity[i].GrossWeightOrderUnit);
                                    $("#volumeOrderUnit").val(obj.jArraQuantity[i].VolumeOrderUnit);
                                    $("#pointsOrderUnit").val(obj.jArraQuantity[i].PointsOrderUnit);
                                    $("#netWeight2").val(obj.jArraQuantity[i].NetWeight2 !== undefined && obj.jArraQuantity[i].NetWeight2 !== "" ? formatNumberByComma(obj.jArraQuantity[i].NetWeight2) : "");
                                    $("#grossWeight2").val(obj.jArraQuantity[i].GrossWeight2 !== undefined && obj.jArraQuantity[i].GrossWeight2 !== "" ? formatNumberByComma(obj.jArraQuantity[i].GrossWeight2) : "");
                                    $("#volume2").val(obj.jArraQuantity[i].Volume2 !== undefined && obj.jArraQuantity[i].Volume2 !== "" ? formatAmountByComma(obj.jArraQuantity[i].Volume2) : "");
                                    $("#points2").val(obj.jArraQuantity[i].Points2 !== undefined && obj.jArraQuantity[i].Points2 !== "" ? formatAmountByComma(obj.jArraQuantity[i].Points2) : "");
                                    $("#netWeightUnit2").val(obj.jArraQuantity[i].NetWeightUnit2);
                                    $("#grossWeightUnit2").val(obj.jArraQuantity[i].GrossWeightUnit2);
                                    $("#volumeUnit2").val(obj.jArraQuantity[i].VolumeUnit2);
                                    $("#pointsUnit2").val(obj.jArraQuantity[i].PointsUnit2);
                                }
                            }
                            
                            if (obj.jArraDeliverySchedule.length !== 0) {
                                $("#DeliveryScheduleTableId tbody tr").remove();
                                console.log("obj.jArraDeliverySchedule.length: " + obj.jArraDeliverySchedule.length);
                                var row = "";
                                for (var i = 0; i < obj.jArraDeliverySchedule.length; i++) {
                                    var deliveryDate = obj.jArraDeliverySchedule[i].DELIVERY_DATE === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE;
                                    var deliDateCat = obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT;
                                    var purReqNumber = obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER;
                                    var reqItemNumber = obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER;
                                    var scheduledQuantity = obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY;
                                    var delivDateByCat = obj.jArraDeliverySchedule[i].DELIVERY_DATE_BY_CAT === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE_BY_CAT;
                                    var time = obj.jArraDeliverySchedule[i].TIME === undefined ? '' : obj.jArraDeliverySchedule[i].TIME;
                                    var grQuantity = obj.jArraDeliverySchedule[i].GR_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].GR_QUANTITY;
                                    var openQuantity = obj.jArraDeliverySchedule[i].OPEN_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].OPEN_QUANTITY;
                                    var schLine = obj.jArraDeliverySchedule[i].SCH_LINE === undefined ? '' : obj.jArraDeliverySchedule[i].SCH_LINE;
                                    var statisticalDeliveryDate = obj.jArraDeliverySchedule[i].STATISTICAL_DELIVERY_DATE === undefined ? '' : obj.jArraDeliverySchedule[i].STATISTICAL_DELIVERY_DATE;
                                    if (i === 0)
                                    {
                                        row += "<tr><td>" + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" value="' + deliDateCat + '">' + "</td>\n\
                                <td>" + '<input readonly type="text" class="deliveryDateClass" style="width:150px;" value="' + (deliDateCat === 'D' ? deliveryDate : delivDateByCat) + '">  <input type="hidden" class="deliveryScheduleDatepicker">' + "</td>\n\
                                <td>" + '<input readonly type="text" class="statisticaldeliveryDateClass" style="width:150px;" value="' + statisticalDeliveryDate + '">  <input type="hidden" class="statisticalDeliveryScheduleDatepicker">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" style="width:150px;" value="' + formatNumberByComma(scheduledQuantity) + '">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" value="' + time + '">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" value="' + purReqNumber + '" readonly>' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" value="' + reqItemNumber + '" readonly>' + "</td>\n\
                                <td>" + '<input type="number" class="form-control form-rounded tableInputField grQuantityClass" name="grQuantityClass" value="' + (grQuantity === "0" || grQuantity === 0 ? "" : grQuantity) + '" readonly>' + "</td>\n\
                                <td>" + '<input type="number" class="form-control form-rounded tableInputField openQuantityClass" name="openQuantityClass" value="' + (openQuantity === "0" || openQuantity === 0 ? "" : openQuantity) + '" readonly>' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField schLineClass" name="schLineClass" value="' + schLine + '" readonly>' + "</td>\n\
                                <td></td>\n\
                                </tr>";
                                    }
                                    else
                                    {
                                        row += "<tr><td>" + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" value="' + deliDateCat + '">' + "</td>\n\
                                <td>" + '<input readonly type="text" class="deliveryDateClass" style="width:300px;" value="' + (deliDateCat === 'D' ? deliveryDate : delivDateByCat) + '"> <input type="hidden" class="deliveryScheduleDatepicker">' + "</td>\n\
                                <td>" + '<input readonly type="text" class="statisticaldeliveryDateClass" style="width:150px;" value="' + statisticalDeliveryDate + '">  <input type="hidden" class="statisticalDeliveryScheduleDatepicker">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" style="width:150px;" value="' + formatNumberByComma(scheduledQuantity) + '">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" value="' + time + '">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" value="' + purReqNumber + '" readonly>' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" value="' + reqItemNumber + '" readonly>' + "</td>\n\
                                <td>" + '<input type="number" class="form-control form-rounded tableInputField grQuantityClass" name="grQuantityClass" value="' + (grQuantity === "0" || grQuantity === 0 ? "" : grQuantity) + '" readonly>' + "</td>\n\
                                <td>" + '<input type="number" class="form-control form-rounded tableInputField openQuantityClass" name="openQuantityClass" value="' + (openQuantity === "0" || openQuantity === 0 ? "" : openQuantity) + '" readonly>' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField schLineClass" name="schLineClass" value="' + schLine + '" readonly>' + "</td>\n\
                                <td style='width:0px;'>" + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>' + "</td>\n\
                                </tr>";
                                    }
                                }
                                $("#DeliveryScheduleTableId tbody").append(row);
                                refreshDelvSchDatepicker();
                                refreshDelvSchStatisticalDatepicker();
                            }
                            if (obj.jArraMaterialTab.length !== 0) {
                                for (var i = 0; i < obj.jArraMaterialTab.length; i++) {
                                    $("#revisionLevel").val(obj.jArraMaterialTab[i].RevisionLevel);
                                    $("#vendMatNo").val(obj.jArraMaterialTab[i].VendMatNo);
                                    $("#eanUpc").val(obj.jArraMaterialTab[i].EanUpc);
                                    $("#vendorSubRange").val(obj.jArraMaterialTab[i].VendorSubrange);
                                    $("#batch").val(obj.jArraMaterialTab[i].Batch);
                                    $("#vendorBatch").val(obj.jArraMaterialTab[i].VendorBatch);
                                    $("#infoUpdate").prop("checked", (obj.jArraMaterialTab[i].InfoUpdate === 'true' ? true : false));
                                    $("#mfrPartNumber").val(obj.jArraMaterialTab[i].MfrPartNumber);
                                    $("#manufacturer").val(obj.jArraMaterialTab[i].Manufacturer);
                                }
                            }

                            $("#material_headerClass tbody tr").each(function(index) {
                                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                var insertionid = $("#ItemNumberSelect").val();
                                if (insertionid === id) {
                                    var isFOCEnabled = $(this).find("td").eq(32).children(".prFreeOfCharge").prop("checked");
                                    if (isFOCEnabled) {
                                        $("#conditions_linelevel_li").css("display", "none");
                                        $("#conditions_linelevel-tab").removeClass("active");
                                        if ($(".collapseDivLineLevel").hasClass(".active") === false) {
                                            $("#material").addClass("active");
                                            $("#material-tab").addClass("active");
                                            $("#material-tab").addClass("show");
                                        }
                                    } else {
                                        $("#conditions_linelevel_li").css("display", "block");
                                        $(".collapseDivLineLevel").find(".active").removeClass("active");

                                        $("#conditions_linelevel").addClass("active");
                                        $("#conditions_linelevel-tab").addClass("active");
                                        $("#conditions_linelevel-tab").addClass("show");

                                        if (obj.jArraCondition.length !== 0 && isPrSaved === "Yes") {
                                            var trow = "";
                                            $("#conditionTableIdLineLevel tbody tr").remove();
                                            console.log("obj.jArraCondition.length: " + obj.jArraCondition.length);
                                            for (var i = 0; i < obj.jArraCondition.length; i++) {
                                                console.log("change id on item change [" + i + "]:" + obj.jArraCondition[i].CHANGEID);
                                                trow += "<tr>"
                                                        + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor' value='" + (obj.jArraCondition[i].VENDORCODE === undefined ? '' : obj.jArraCondition[i].VENDORCODE) + "'><input type='hidden' class='lineAddedFromLineLevel' value='" + (obj.jArraCondition[i].ADDEDFROM === undefined ? '' : obj.jArraCondition[i].ADDEDFROM) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' style='width:100px;' disabled = 'true' value='" + (obj.jArraCondition[i].CONDITION_TYPE === undefined ? '' : obj.jArraCondition[i].CONDITION_TYPE) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded nameConditionsLineLevel tableInputField' style='width:200px;' name='nameConditionsLineLevel' disabled = 'true' value='" + (obj.jArraCondition[i].NAME === undefined ? '' : obj.jArraCondition[i].NAME) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded AmountLineLevel tableInputField' name='AmountLineLevel' style='width:150px;' value='" + (obj.jArraCondition[i].AMOUNT === undefined ? '' : formatAmountByComma(Number(obj.jArraCondition[i].AMOUNT).toFixed(2))) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' style='width:100px;' value='" + (obj.jArraCondition[i].CURRENCY1 === undefined ? '' : obj.jArraCondition[i].CURRENCY1) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' name='PerQuantityLineLavel' style='width:150px;' value='" + (obj.jArraCondition[i].PERCETAGE === undefined ? '' : formatAmountByComma(Number(obj.jArraCondition[i].PERCETAGE).toFixed(2))) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' disabled name='ConditionPricingUnitLineLevel' value='" + (obj.jArraCondition[i].CONDITION_PRICING_UNIT === undefined ? '' : obj.jArraCondition[i].CONDITION_PRICING_UNIT) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' style='width:100px;' disabled value='" + (obj.jArraCondition[i].UOM === undefined ? '' : obj.jArraCondition[i].UOM) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;' disabled value='" + (obj.jArraCondition[i].CONDITION_VALUE1 === undefined ? '' : formatAmountByComma(Number(obj.jArraCondition[i].CONDITION_VALUE1).toFixed(2))) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' style='width:100px;' readonly = 'true' value='" + (obj.jArraCondition[i].CURRENCY2 === undefined ? '' : obj.jArraCondition[i].CURRENCY2) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' style='width:100px;' disabled='true' value='" + (obj.jArraCondition[i].CONDITION_VALUE2 === undefined ? '' : obj.jArraCondition[i].CONDITION_VALUE2) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' style='width:100px;' disabled='true' value='" + (obj.jArraCondition[i].CONDITION_CURRENCY === undefined ? '' : obj.jArraCondition[i].CONDITION_CURRENCY) + "'></td>"
                                                        + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel' value=" + (obj.jArraCondition[i].STATUS) + "></td>"
                                                        + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' name='numeratorLineLevel' min='0' style='width:100px;' value='" + (obj.jArraCondition[i].NUMERATOR === undefined ? '' : obj.jArraCondition[i].NUMERATOR) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' name='baseUoMLineLevel' style='width:100px;' value='" + (obj.jArraCondition[i].BASEUOM === undefined ? '' : obj.jArraCondition[i].BASEUOM) + "'></td>"
                                                        + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' name='denoForConvLineLevel' min='0' style='width:100px;' value='" + (obj.jArraCondition[i].DENO_FOR_CONV === undefined ? '' : obj.jArraCondition[i].DENO_FOR_CONV) + "'></td>"
                                                        + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' name='uOMExtraLineLevel' style='width:100px;' value='" + (obj.jArraCondition[i].UOMEXTRA === undefined ? '' : obj.jArraCondition[i].UOMEXTRA) + "'></td>"
                                                        + "<td><input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + (obj.jArraCondition[i].KAPPL === undefined ? '' : obj.jArraCondition[i].KAPPL) + "'>"
                                                        + "<input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + (obj.jArraCondition[i].KVSL1 === undefined ? '' : obj.jArraCondition[i].KVSL1) + "'>"
                                                        + "<input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + (obj.jArraCondition[i].KVSL2 === undefined ? '' : obj.jArraCondition[i].KVSL2) + "'>"
                                                        + "<input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + (obj.jArraCondition[i].ZAEHK === undefined ? '' : obj.jArraCondition[i].ZAEHK) + "'>"
                                                        + "<input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + (obj.jArraCondition[i].STUNR === undefined ? '' : obj.jArraCondition[i].STUNR) + "'>"
                                                        + "<input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='" + (obj.jArraCondition[i].CHANGEID === undefined ? '' : obj.jArraCondition[i].CHANGEID) + "'>"
                                                        + "<i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRowLineLevel' aria-hidden='true' style='width:30px;display:none;'></i></td>"
                                                        + "</tr>";
                                            }
                                            $("#conditionTableIdLineLevel tbody").append(trow);
                                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                                var currency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                                                var contype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                                var condName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                                                var status = $(this).find("td").eq(12).children(".statusLineLevel").val();
                                                console.log("condition Currency :" + currency);
                                                if (contype === "JEXS" || contype === "NAVS" || contype === "ZNAV") {
                                                    $(this).find("td input").prop("disabled", true);
                                                    $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop('disabled', false);
                                                    $(this).find("td").eq(12).children(".statusLineLevel").prop('disabled', false);
                                                    $(this).find("td").eq(4).children(".CurrencyLineLevel").prop('disabled', false);
                                                }
                                                if (contype === "NAVM") {
                                                    $(this).find("td input").prop("disabled", true);
                                                    $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop('disabled', false);
                                                    $(this).find("td").eq(12).children(".statusLineLevel").prop('disabled', false);
                                                    $(this).find("td").eq(4).children(".CurrencyLineLevel").prop('disabled', false);
                                                    $(this).find("td").eq(3).children(".AmountLineLevel").prop("disabled", true);
                                                    $(this).find("td").eq(5).children(".PerQuantityLineLavel").prop("disabled", true);
                                                }
                                                if (currency === "%") {
                                                    $(this).find("td").eq(4).children(".CurrencyLineLevel").prop("disabled", true);
                                                }

                                                if (contype === "") {
                                                    $(this).find("td input :text").prop("disabled", true);
                                                }
                                                if (contype === "") {
                                                    $(this).find("input").prop("disabled", true);
                                                }
                                                console.log("status in fetch:" + status);
                                                if (status === "True") {
                                                    $(this).find("td").eq(12).children(".statusLineLevel").prop("checked", true);
                                                }
                                            });
                                            var conType;
                                            var changeid;
                                            for (var i = 0; i < conditionLineLevelArray.length; i++) {
                                                console.log("Find BITTU conditionLineLevelArray[" + i + "]" + conditionLineLevelArray[i].Ctype);
                                                var rows = $("#conditionTableIdLineLevel tbody tr");
                                                for (var j = 0; j < rows.length; j++) {
                                                    conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                                    changeid = $(rows[j]).find("td").eq(17).children(".conditionChangeId").val();
                                                    if (conType === conditionLineLevelArray[i].Ctype && changeid === conditionLineLevelArray[i].CHANGEID) {
                                                        console.log("Inside for loop");
                                                        $(rows[j]).find("td").eq(17).children(".deleteConditionTebleRowLineLevel").css("display", "block");
                                                        $(rows[j]).find("td").eq(1).children(".ConditionTypeLineLevel").prop("disabled", false);
//                                $(rows[j]).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").prop("disabled", false);
                                                    }
                                                }
                                            }
                                            var rows = $("#conditionTableIdLineLevel tbody tr");
                                            for (var j = 0; j < rows.length; j++) {
                                                var changeid = $(rows[j]).find("td").eq(17).children(".conditionChangeId").val();
                                                if (changeid === "I") {
                                                    $(rows[j]).find("td").eq(17).children(".deleteConditionTebleRowLineLevel").css("display", "block");
                                                    $(rows[j]).find("td").eq(1).children(".ConditionTypeLineLevel").prop("disabled", false);
//                            $(rows[j]).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").prop("disabled", false);

                                                }
                                            }

                                            /*SUNNY KUMAR PRAJAPATI CODE START*/
                                            if (conditionLineLevelArray.length !== 0) {
//                                                addTOLineConditionOnItemChange();                     //Commented by Bittu
                                                deleteRowFormCondition("");
                                            }
                                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                                var addedFrom = $(this).find("td").eq(0).children(".lineAddedFromLineLevel").val();
                                                if (addedFrom === "headerlevel") {
                                                    $(this).find("td input").prop("disabled", true);
                                                    $(this).find("td").eq(17).children(".deleteConditionTebleRowLineLevel").css("display", 'none');
                                                }
                                            });
                                            /*SUNNY KUMAR PRAJAPATI CODE END*/
                                        }
                                        else {
                                            var kalsm = $("#kalsmHiddenfield").val();
                                            getAllByPricingProcedure(kalsm);
                                            calculationForPBXX();
                                        }
                                    }
                                }
                            });

                            if (obj.jArraLimits.length !== 0) {
                                for (var i = 0; i < obj.jArraLimits.length; i++) {
                                    if (obj.jArraLimits[i].NoLimits === "Yes") {
                                        $("#NoLimit").prop("checked", true);
                                    } else {
                                        $("#NoLimit").prop("checked", false);
                                    }
                                    $("#ExpectedValue").val(formatAmountByComma(obj.jArraLimits[i].ExpectedValue));
                                    $("#OverallLimit").val(formatAmountByComma(obj.jArraLimits[i].OverAllLimits));
                                    $("#ActualValue").val(formatAmountByComma(obj.jArraLimits[i].ActualValue));
                                }
                                var PoFrom = $("#PoFrom").val();
                                var insertionid = $("#ItemNumberSelect").val();
                                var accAsgn;
                                var itemCat;
                                $("#material_headerClass tbody tr").each(function() {
                                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                    if (insertionid === id) {
                                        accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                                        itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                                    }
                                });
                                if (accAsgn === "U" && itemCat === "D") {
                                    $("#OverallLimit").prop("readonly", true);
                                    $("#ExpectedValue").prop("readonly", true);
                                    $("#NoLimit").prop("disabled", true);
                                } else {
                                    $("#OverallLimit").prop("readonly", false);
                                    $("#ExpectedValue").prop("readonly", false);
                                    $("#NoLimit").prop("disabled", false);
                                }
//                    }
                            } else {
                                var PoFrom = $("#PoFrom").val();
                                var insertionid = $("#ItemNumberSelect").val();
                                var overalllimit;
                                var expectedValue;
                                var nolimit;
                                var accAsgn;
                                var itemCat;
                                $("#material_headerClass tbody tr").each(function() {
                                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                    if (insertionid === id) {
                                        overalllimit = $(this).find("td").eq(0).children(".overAllLimitHidden").val();
                                        expectedValue = $(this).find("td").eq(0).children(".expectedValueHidden").val();
                                        nolimit = $(this).find("td").eq(0).children(".noLimitHidden").val();
                                        accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                                        itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                                    }
                                });
                                if (accAsgn === "U" && itemCat === "D") {
                                    $("#OverallLimit").prop("readonly", true);
                                    $("#ExpectedValue").prop("readonly", true);
                                    $("#NoLimit").prop("disabled", true);
                                    $("#OverallLimit").val(formatAmountByComma(overalllimit));
                                    $("#ExpectedValue").val(formatAmountByComma(expectedValue));
                                    if (nolimit === "true" || nolimit === "True") {
                                        $("#NoLimit").prop("checked", true);
                                    } else if (nolimit === "No") {
                                        $("#NoLimit").prop("checked", false);
                                    }
                                } else {
                                    $("#OverallLimit").prop("readonly", false);
                                    $("#ExpectedValue").prop("readonly", false);
                                    $("#NoLimit").prop("disabled", false);
                                    $("#OverallLimit").val("");
                                    $("#ExpectedValue").val("");
                                }
                            }
                        }
                    });
                    enableValidityFromAndToDateInAdditionalDataTab(); // Added by nikhil on 17082020
//        if($("#PoFrom").val() === "createpo" || $("#PoFrom").val() === "byrfq") {

                    /*UOM population on RFQ Addition code by Bittu Starts*/
                    var PrType = $("#PrType").val();

                    if (PrType === "Material") {
                        $("#material_headerClass tbody tr").each(function() {
                            var insertionid = $("#ItemNumberSelect").val();
                            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                            if (id === insertionid) {
                                var CompanyCode = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
                                var matCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                                var lineType = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                                var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();

                                if (isPrSaved === "No") {
                                    if (lineType !== "EmptyLine" && lineType !== "PoLine") {
                                        if (matCode !== "") {
                                            var jsonArr = getMaterialMasterOnLoad(matCode, CompanyCode);
                                            if (jsonArr.length !== 0) {
                                                if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                                                    populateAccAsgn(jsonArr, $(this));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                    /*UOM population on RFQ Addition code by Bittu End*/
                    $("#overlay").css("display", "block");
                    setTimeout(
                            function()
                            {
                                setOverDelivTolAndUnderDelvTolInDelvTab("ItemNumberChange");
                                saveAllTabsItemChange();
                                $("#overlay").css("display", "none");
                            }
                    , 500);
//        }     
                    $("#overlay").css("display", "none");
                }
        , 500);
    });
    
    var prevQuantity = 0;
    $("#serviceTableId").on("change", ".quantity_Services", function() {
        var quantity = removeCommaInNumber($(this).val());
        $(this).val(formatNumberByComma(quantity));
        console.log("quantity :" + quantity);
        var totalNetPrice = 0;
        var grossprice = removeCommaInNumber($(this).parent().parent().find("td").eq(7).children(".grossPrice_Services").val());
        var serviceAccAssDist = $(this).parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val();
        console.log("grossprice :" + grossprice);
        console.log("serviceAccAssDist :" + serviceAccAssDist);
        if (grossprice !== "" && quantity !== "") {
            var netprice = Number(quantity) * Number(grossprice);
            $(this).parent().parent().find("td").eq(9).children(".netPrice_Services").val(formatAmountByComma(Number(netprice).toFixed(2)));
            $(this).parent().parent().find("td").eq(13).children(".serviceNetValue").val(formatAmountByComma(Number(netprice).toFixed(2)));
            var insertionid = $("#ItemNumberSelect").val();
            $("#serviceTableId tbody tr").each(function() {
                var netPriceService = removeCommaInNumber($(this).find("td").eq(9).children('.netPrice_Services').val());
                if (netPriceService !== "") {
                    totalNetPrice = totalNetPrice + parseInt(netPriceService);
                }
            });
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === id) {
                    console.log("insertionid :" + insertionid + " " + "id :" + id);
                    if (totalNetPrice !== "") {
                        material_header_table_Current_td.find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(parseInt(totalNetPrice).toFixed(2)));
                        material_header_table_Current_td.find('td').eq(0).children(".prNetPriceHidden").val(Number(totalNetPrice).toFixed(2));
                    } else {
                        totalNetPrice = 0;
                        material_header_table_Current_td.find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(parseInt(totalNetPrice).toFixed(2)));
                        material_header_table_Current_td.find('td').eq(0).children(".prNetPriceHidden").val(Number(totalNetPrice).toFixed(2));
                    }
                    calculationForPBXX();
                    console.log("NetPrice Calculate in Qty.");
                }
            });
            calculatePBXXForHeader();
            saveConditionTabDataOnLoadFieldChange("");
        }
        if (quantity !== prevQuantity) {
            if (serviceAccAssDist !== "" && serviceAccAssDist !== "0" && serviceAccAssDist !== undefined) {
                Lobibox.notify('warning', {
                    msg: 'Quantity is modified, Kindly check AA!'
                });
                prevQuantity = $(this).val();
                return false;
            }
        }
    });
    $("#serviceTableId").on("change", ".grossPrice_Services", function() {
        var grossprice = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(grossprice));
        console.log("grossprice on grossprice change :" + grossprice);
        var totalNetPrice = 0;
        var quantity = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".quantity_Services").val());
        console.log("quantity on grossprice change :" + quantity);
        if (grossprice !== "" && quantity !== "") {
            var netprice = parseInt(quantity) * parseInt(grossprice);
            $(this).parent().parent().find("td").eq(9).children(".netPrice_Services").val(formatAmountByComma(Number(netprice).toFixed(2)));
            $(this).parent().parent().find("td").eq(13).children(".serviceNetValue").val(formatAmountByComma(Number(netprice).toFixed(2)));
            var insertionid = $("#ItemNumberSelect").val();
            $("#serviceTableId tbody tr").each(function() {
                var netPriceService = removeCommaInNumber($(this).find("td").eq(9).children('.netPrice_Services').val());
                if (netPriceService !== "") {
                    totalNetPrice = totalNetPrice + parseInt(netPriceService);
                }
            });
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === id) {
                    console.log("insertionid :" + insertionid + " " + "id :" + id);
                    if (totalNetPrice !== "") {
                        material_header_table_Current_td.find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(parseInt(totalNetPrice).toFixed(2)));
                        material_header_table_Current_td.find('td').eq(0).children(".prNetPriceHidden").val(Number(totalNetPrice).toFixed(2));
                    } else {
                        totalNetPrice = 0;
                        material_header_table_Current_td.find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(parseInt(totalNetPrice).toFixed(2)));
                        material_header_table_Current_td.find('td').eq(0).children(".prNetPriceHidden").val(Number(totalNetPrice).toFixed(2));
                    }
                    calculationForPBXX();
                    console.log("NetPrice Calculate in GrossPrice.");
                }
            });
            calculatePBXXForHeader();
            saveConditionTabDataOnLoadFieldChange("");
        }
    });
//    var serviceTabTableCurrentTd;
    var checkboxServicesArr = [];
    $("#serviceTableId").on("click", ".checkboxServices", function() {
        isCheckedSerAccAsgnCount = 0;
        checkboxServicesArr = [];
        var isConditionChecked = $(this).prop("checked");
        $("#serviceTableId tbody tr").each(function() {
            $(this).find("td").eq(0).children(".checkboxServices").prop("checked", false);
        });
        if (isConditionChecked === true) {
            $(this).prop("checked", true);
        } else {
            $(this).prop("checked", false);
        }
        serviceTabTableCurrentTd = $(this);
        var ServiceNumber = $(this).parent().parent().find("td").eq(3).children(".ServicesNumber_Services").val();
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getServiceMasterByServiceNumber",
                "ServiceNumber": ServiceNumber
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                if (obj.SIZE !== 0) {
                    var gLCode = obj.GLCODE;
                    var zGLCode = obj.ZGLCODE;
                    console.log("obj.GLCODE: " + obj.GLCODE);
                    console.log("obj.ZGLCODE: " + obj.ZGLCODE);
                    var prType = $("#PrType").val();
                    $("#accountAssignmentForm :input").val("");
                    var category = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        var insertionid = $(".ItemNumberSelectClass").val();
                        if (insertionid === id) {
                            category = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                        }
                    });
                    $("#accountAssignmentForm").trigger("reset");
                    if (prType === "Service" && category !== "A") {
                        if (category !== "Z") {
                            $("#gLAccountService").val(gLCode);
                            $("#CommItemServiceInput").val(gLCode);
                            $("#gLAccountInp_Limits").val(gLCode);
                            $("#commItemServiceInp_Limits").val(gLCode);
                            $("#glCodeNot_A_In_ServicePR").val(gLCode); // For Fetch values in Service Account Assignment on quantity/ Percentage distribution.
                        }
                        if (category === "Z") {
                            $("#gLAccountService").val(zGLCode);
                            $("#CommItemServiceInput").val(zGLCode);
                            $("#gLAccountInp_Limits").val(zGLCode);
                            $("#commItemServiceInp_Limits").val(zGLCode);
                            $("#glCodeNot_A_In_ServicePR").val(zGLCode);
                        }
                    } else {
                        $("#gLAccountService").val("");
                        $("#CommItemServiceInput").val("");
                        $("#gLAccountInp_Limits").val("");
                        $("#commItemServiceInp_Limits").val("");
                    }
                }
            }
        });
        //$("#limitTabAccAsgnTebleId tbody").each(function() {
          //  $(this).children('tr:not(:first)').remove();
        //});
        var isChecked = $(this).prop("checked");
        var accountAssignmentCategory;
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $(".ItemNumberSelectClass").val();
            if (insertionid === id) {
                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            
                if (accountAssignmentCategory === 'K') {
                    service_AccAsgnCat_K("serviceTableCheckBox");
    //                limits_AccAsgnCat_K("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'N') {
                    service_AccAsgnCat_N("serviceTableCheckBox");
    //                limits_AccAsgnCat_N("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'A') {
                    service_AccAsgnCat_A("serviceTableCheckBox");
    //                limits_AccAsgnCat_A("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'C') {
                    service_AccAsgnCat_C("serviceTableCheckBox");
    //                limits_AccAsgnCat_C("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'F') {
                    service_AccAsgnCat_F("serviceTableCheckBox");
    //                limits_AccAsgnCat_F("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'P') {
                    service_AccAsgnCat_P("serviceTableCheckBox");
    //                limits_AccAsgnCat_P("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'R') {
                    service_AccAsgnCat_R("serviceTableCheckBox");
    //                limits_AccAsgnCat_R("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'X') {
                    service_AccAsgnCat_X("serviceTableCheckBox");
    //                limits_AccAsgnCat_X("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'Z') {
                    service_AccAsgnCat_Z("serviceTableCheckBox");
    //                limits_AccAsgnCat_Z("serviceTableCheckBox");
                }
            }
        });
        if (accountAssignmentCategory !== "U") {
            if (isChecked === true) {
                checkboxServicesArr.push(isChecked);
                if (checkboxServicesArr.length === 1) {
                    $("#serviceTabAccAssgnModelBtn_div").css("display", "block");
                    $("#replicateServiceAccAssgnModelBtn_div").css("display", "block");
                } else {
                    $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
                    $("#replicateServiceAccAssgnModelBtn_div").css("display", "none");
                }
            } else {
                var index = checkboxServicesArr.indexOf(isChecked);
                checkboxServicesArr.splice(index, 1);
                if (checkboxServicesArr.length === 1) {
                    $("#serviceTabAccAssgnModelBtn_div").css("display", "block");
                    $("#replicateServiceAccAssgnModelBtn_div").css("display", "block");
                } else {
                    $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
                    $("#replicateServiceAccAssgnModelBtn_div").css("display", "none");
                }
            }
        }

        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
            var netValue = removeCommaInNumber($(this).parent().parent().find("td").eq(9).children(".netPrice_Services").val());
            $("#ServiceNetValueId").val(netValue);
        }
    });
    
    $("#costCenter").change(function() {
        var costCenter = $("#costCenter").val();
        console.log(costCenter);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getAllCostCenter",
                "costCenter": costCenter
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("FUND :" + obj.FUND);
                console.log("FUNDCENTER :" + obj.FUNDCENTER);
                console.log("FUNCTIONALAREA :" + obj.FUNCTIONALAREA);
                console.log("COMMITMENTITEM :" + obj.COMMITMENTITEM);
                console.log("COAREA :" + obj.COAREA);
                $("#fundServices").val(obj.FUND);
                $("#fundCenterServices").val(obj.FUNDCENTER);
                $("#functionalAreaServices").val(obj.FUNCTIONALAREA);
                $("#commitmentItemservices").val(obj.COMMITMENTITEM);
                $("#cOAreaServices").val(obj.COAREA);
//            if (obj.SIZE !== 0) {
//                console.log(obj.GLCODE);
//                var gLCode = obj.GLCODE;

//                $("#gLCode").val(gLCode);
//            } else {
//
                //            }

            }
        });
    });
    $("#noMultiAcctAssignment").click(function() {
        var PoFrom = $("#PoFrom").val();
        var count = 0;
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
            var length = $("#serviceTabAccAsgnTebleId tbody tr").length;
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                var isChecked = $(this).find("td").eq(0).children(".deleteServiceLine").prop("checked");
                if (isChecked === true) {
                    count++;
                }
            });
            if (count + 1 !== length) {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                var errorMsg = "Can not be converted to Single Account Assignmemnt!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                return false;
            }
        }
        $("#serviceTabAccAsgnTebleId :input").prop("disabled", true);
    });
    $("#distOnQuantBases").click(function() {
        $("#serviceTabAccAsgnTebleId :input").prop("disabled", false);
        var rowCount = serviceTabAccAsgnTebleId.rows.length;
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        var percentage = 100;
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(quantityService);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
//            "max": quantityService,
//            "value": quantityService
//        });
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(percentage);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
//            "max": percentage,
//            "value": percentage
//        });
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", false);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", true);

        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                console.log("insertionid bt:" + insertionid + " " + "id :" + id);
                var accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                distOnQuantPercentageBases(accountAssignmentCategory, "quantity");
            }
        });
        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                var isChecked = $(this).find("td").eq(0).children(".deleteServiceLine").prop("checked");
                if (isChecked === true) {
                    $(this).find("input[type='text']").prop("disabled", true);
                }
            });
        }
    });
    $('#distByPercentage').click(function() {
        $("#serviceTabAccAsgnTebleId :input").prop("disabled", false);
        var rowCount = serviceTabAccAsgnTebleId.rows.length;
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        var percentage = 100;
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(quantityService);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
//            "max": quantityService,
//            "value": quantityService
//        });
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(percentage);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
//            "max": percentage,
//            "value": percentage
//        });
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", false);

        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            var itemcatogory;
            if (insertionid === id) {
                var accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                distOnQuantPercentageBases(accountAssignmentCategory, "percentage");
            }
        });
        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                var isChecked = $(this).find("td").eq(0).children(".deleteServiceLine").prop("checked");
                if (isChecked === true) {
                    $(this).find("input[type='text']").prop("disabled", true);
                }
            });
        }
    });
    var DeliveryScheduleTabTableCurrentTR;
    $("#DeliveryScheduleTableId").on("keypress", ".deliveryDateCategory", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $(".DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass").prop("checked", false);
            DeliveryScheduleTabTableCurrentTR = $(this);
            delDateCateCurrent = $(this);
            $("#DeliverySchedule-DelDateCategoryField-Picklist-Model").modal("show");
        }
    });
    $(".DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass").click(function() {
        var val = $(this).parent().next("td").text();
        var valSubString = val.substring(0, 1);
        DeliveryScheduleTabTableCurrentTR.val(valSubString);
        DeliveryScheduleTabTableCurrentTR.parent().parent().find("td").eq(1).children(".deliveryDateClass").val("");
        DeliveryScheduleTabTableCurrentTR.parent().parent().find("td").eq(2).children(".statisticaldeliveryDateClass").val("");
        updatePoLineDelvDateCatFromDelvSchTab(valSubString);
        $("#DeliverySchedule-DelDateCategoryField-Picklist-Model").modal("hide");
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });
    $("#addRowdeliveryScheduleBtnId").click(function() {
        var insertionOrderId = $(".ItemNumberSelectClass").val();
        var id = "";
        var PrNumber = "";
        var PrItemNumber = "";
        var deliveryDate = "";
        var deliveryDateCategory = "";
        var quantity = "";
        $("#material_headerClass tbody tr").each(function() {
            id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (id === insertionOrderId)
            {
                PrNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
                PrItemNumber = $(this).find("td").eq(24).text().trim();
                deliveryDate = $(this).find('td').eq(11).children(".PR_DeliveryDate").text();
                quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                deliveryDateCategory = $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val();
                return false;
            }
        });
        var newDD = "";
        console.log("deliveryDate: " + deliveryDate);
        if (deliveryDate !== "")
        {
            var ddSplit = deliveryDate.toString().split(".");
            var months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "July": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"};
            newDD = ddSplit[2] + "-" + ddSplit[1] + "-" + ddSplit[0];
            console.log("newDD: " + newDD);
        }

        var prNumberSelect = "<input type='text' value='" + PrNumber + "' class='form-control form-rounded tableInputField prNumberDeliveryScheduledClass' name='prNumberDeliveryScheduled' readonly='true'>";
        var prItemNumberSelect = "<input type='text' value='" + PrItemNumber + "' class='form-control form-rounded tableInputField reqItemNumberClass' name='reqItemNumber' readonly='true'>";
        console.log("prNumberSelect " + prNumberSelect);
        console.log("prItemNumberSelect " + prItemNumberSelect);
        var currentDate = $("#currentDate").val();
        console.log("currentDate " + currentDate);
        var delvSchLen = $("#DeliveryScheduleTableId tbody tr").length;
        var row = "";
        row = "<tr><td>"
                + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" value=' + deliveryDateCategory + '>' + "</td><td>"
                + '<input readonly type="text" value=' + deliveryDate + ' class="deliveryDateClass" style="width:150px;"> <input type="hidden" class="deliveryScheduleDatepicker">' + "</td>"
                + '<td><input readonly type="text" value=' + deliveryDate + ' class="statisticaldeliveryDateClass" style="width:150px;"> <input type="hidden" class="statisticalDeliveryScheduleDatepicker"></td>'
                + '<td><input type="text" value=' + formatNumberByComma(quantity) + ' class="form-control form-rounded tableInputField scheduledQuantityClass" name="scheduledQuantity">' + "</td>"
                + '<td><input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" name="timeDeliveryScheduled">' + "</td><td>"
                + prNumberSelect + "</td><td>"
                + prItemNumberSelect + "</td>"
                + '<td><input type="number" class="form-control form-rounded tableInputField grQuantityClass" name="grQuantityClass" readonly="true"></td>'
                + '<td><input type="number" class="form-control form-rounded tableInputField openQuantityClass" name="openQuantityClass" readonly="true"></td>'
                + '<td><input type="text" class="form-control form-rounded tableInputField schLineClass" name="schLineClass" readonly="true" value=' + (delvSchLen + 1) + '></td>'
                + "<td style='width:0px;'>"
                + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>'
                + "</td></tr>";
        $("#DeliveryScheduleTableId").children("tbody").append(row);
        refreshDelvSchDatepicker();
        refreshDelvSchStatisticalDatepicker();
    });
    $("#DeliveryScheduleTableId").on("click", ".deleteDeliverySchTebleRow", function() {
        $(this).parent().parent().remove();
        $("#DeliveryScheduleTableId tbody tr").each(function(index) {
            $(this).find("td").eq(9).children(".schLineClass").val(index + 1);
        });
    });
    var current_td;
    $(".accountAssignmentClass").click(function() {
//        $("#accountAssignmentCategoryModal").modal("show");
        current_td = $(this).parent();
    });
    $(".accountAssignmentCategoryTable-btn").click(function() {
        var accountAssignmentCategory = $(this).parent().parent().find("td").eq(1).html();
        var accAsgCatDesc = $(this).parent().parent().find("td").eq(2).html();
        var desc = $(this).parent().parent().find("td").eq(2).html();
        var itemCategory;
        var itemCatDesc;
//        $("#MaterialType").val(accountAssignmentCategory);
        $("#accountAssignmentCategory").val(accountAssignmentCategory);
        $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
        current_td.children(".accountAssignmentClass").val(accountAssignmentCategory);
        current_td.children(".accountAssignmentDescClass").val(accAsgCatDesc);
        $(".accountAssignmentCategoryTable-btn").prop("checked", false);
        $("#accountAssignmentCategoryModal").modal("hide");
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === id) {
                console.log("insertionid :" + insertionid + " " + "id :" + id);
                itemCategory = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                $("#itemCategoryTableId tbody tr").each(function() {
                    var itemCat = $(this).find("td").eq(1).html();
                    if (itemCategory === itemCat) {
                        itemCatDesc = $(this).find("td").eq(2).html();
                    }
                });
                material_header_table_Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            }
            var percentage = 100;
            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(material_header_table_Quantity).toFixed(3)));
            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").attr({
                "max": material_header_table_Quantity,
                "value": formatNumberByComma(material_header_table_Quantity)
            });
            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").val(percentage);
            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").attr({
                "max": percentage,
                "value": percentage
            });
        });
        var rowCount = costCenteraccountAssignmentTebleId.rows.length;
        for (var i = rowCount - 1; i > 1; i--) {
            costCenteraccountAssignmentTebleId.deleteRow(i);
        }
        if ((accountAssignmentCategory === 'K')) {
            if (itemCategory === 'K') {
                Lobibox.alert("error", {
                    msg: "" + desc + " & " + itemCatDesc + " is not a valid combination!"
                });
                currentTd.parent().find("td").eq(2).children(".accountAssignmentClass").val("");
                currentTd.parent().find("td").eq(3).children(".itemCategoryClass").val("");
            }
        }

        var prType = $("#PrType").val();
        if (prType === "Material") {
            if ((accountAssignmentCategory === 'U')) {
                Lobibox.alert("error", {
                    msg: "" + desc + " is not a valid in material PO!"
                });
                current_td.parent().find("td").eq(2).children(".accountAssignmentClass").val("");
//                currentTd.parent().find("td").eq(3).children(".itemCategoryClass").val("");
            }
        }

        if ((accountAssignmentCategory === 'B' || accountAssignmentCategory === 'D' || accountAssignmentCategory === 'E' || accountAssignmentCategory === 'G' || accountAssignmentCategory === 'M' ||
                accountAssignmentCategory === 'Q' || accountAssignmentCategory === 'T') && (itemCategory === 'D')) {
            Lobibox.alert("error", {
                msg: "" + desc + " & " + itemCatDesc + " is not a valid combination!"
            });
            current_td.children(".accountAssignmentClass").val('');
            current_td.parent().find("td").eq(3).children(".itemCategoryClass").val("");
            current_td.parent().find("td").eq(3).children(".itemCategoryDescClass").val("");
            if ($("#services").hasClass("active") === true) {
                $("#serviceTab_li").css("display", "none");
                $("#services-tab").removeClass("active");
                $("#services").removeClass("active");
                $("#limits_li").css("display", "none");
//                $("#quantities").addClass("active");
//                $("#quantities-tab").addClass("active");
//                $("#quantities-tab").addClass("show");
                $("#material").addClass("active");
                $("#material-tab").addClass("active");
                $("#material-tab").addClass("show");
            } else if ($("#limits").hasClass("active") === true) {
                $("#limits_li").css("display", "none");
                $("#limits-tab").removeClass("active");
                $("#limits").removeClass("active");
                $("#serviceTab_li").css("display", "none");
//                $("#quantities").addClass("active");
//                $("#quantities-tab").addClass("active");
//                $("#quantities-tab").addClass("show");
                $("#material").addClass("active");
                $("#material-tab").addClass("active");
                $("#material-tab").addClass("show");
            } else {
                $("#serviceTab_li").css("display", "none");
                $("#limits_li").css("display", "none");
            }
            return false;
        }
        if (accountAssignmentCategory === 'K') {
            accAsgnCat_K_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_K("AccAsgnModel");
            limits_AccAsgnCat_K("AccAsgnModel");
        } else if (accountAssignmentCategory === 'N') {
            accAsgnCat_N_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_N("AccAsgnModel");
            limits_AccAsgnCat_N("AccAsgnModel");
        } else if (accountAssignmentCategory === 'A') {
            accAsgnCat_A_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_A("AccAsgnModel");
            limits_AccAsgnCat_A("AccAsgnModel");
        } else if (accountAssignmentCategory === 'B') {
            accAsgnCat_B_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'C') {
            accAsgnCat_C_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_C("AccAsgnModel");
            limits_AccAsgnCat_C("AccAsgnModel");
        } else if (accountAssignmentCategory === 'D') {
            accAsgnCat_D_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'E') {
            accAsgnCat_E_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'F') {
            accAsgnCat_F_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_F("AccAsgnModel");
            limits_AccAsgnCat_F("AccAsgnModel");
        } else if (accountAssignmentCategory === 'G') {
            accAsgnCat_G_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'M') {
            accAsgnCat_M_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'P') {
            accAsgnCat_P_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_P("AccAsgnModel");
            limits_AccAsgnCat_P("AccAsgnModel");
        } else if (accountAssignmentCategory === 'Q') {
            accAsgnCat_Q_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'R') {
            accAsgnCat_R_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_R("AccAsgnModel");
            limits_AccAsgnCat_R("AccAsgnModel");
        } else if (accountAssignmentCategory === 'T') {
            accAsgnCat_T_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'U') {
            accAsgnCat_U_Dist_SAA("AccAsgnModel");
        } else if (accountAssignmentCategory === 'X') {
            accAsgnCat_X_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_X("AccAsgnModel");
            limits_AccAsgnCat_X("AccAsgnModel");
        } else if (accountAssignmentCategory === 'Z') {
            accAsgnCat_Z_Dist_SAA("AccAsgnModel");
            service_AccAsgnCat_Z("AccAsgnModel");
            limits_AccAsgnCat_Z("AccAsgnModel");
        }

        if ((accountAssignmentCategory === 'X' || accountAssignmentCategory === 'Z' || accountAssignmentCategory === 'K' || accountAssignmentCategory === 'F')) {
            $(".costCenter-Div").css("display", "block");
        } else {
            $(".costCenter-Div").css("display", "none");
        }
        if (accountAssignmentCategory === 'X' || accountAssignmentCategory === 'Z' || accountAssignmentCategory === 'K' || accountAssignmentCategory === 'E'
                || accountAssignmentCategory === 'M' || accountAssignmentCategory === 'D' || accountAssignmentCategory === 'G' || accountAssignmentCategory === 'N'
                || accountAssignmentCategory === 'F' || accountAssignmentCategory === 'P' || accountAssignmentCategory === 'C') {
        }
    });

    $("#distribution").change(function() {
        $("#distribution").css("border-color", "");
        var rowCount = $("#costCenteraccountAssignmentTebleId tr").closest("tr").length;
        var distribution = $("#distribution").val();
        if (distribution === 'Distrib. On Quantity Basis') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".accAsgnQuantity").prop("disabled", false);
                $(this).find("td").eq(2).children(".accAsgnPercentage").prop("disabled", true);
                $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").prop("disabled", false);
                $(this).find("td").eq(11).children(".accAsgnRecipients").prop("disabled", false);
            });
            $("#costCenteraccountAssignmentTebleId tbody").find("tr:gt(0)").remove();
//            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    var quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                    var percentage = 100;
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(quantity).toFixed(3)));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").val(parseInt(percentage).toFixed(1));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").attr({"max": quantity,
                        "value": formatNumberByComma(quantity)
                    });
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").attr({"max": parseInt(percentage).toFixed(1),
                        "value": parseInt(percentage).toFixed(1)
                    });
                    distributionByQuantity();
                }
            });
        } else if (distribution === 'Distrib. By Percentage') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".accAsgnPercentage").prop("disabled", false);
                $(this).find("td").eq(1).children(".accAsgnQuantity").prop("disabled", true);
                $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").prop("disabled", false);
                $(this).find("td").eq(11).children(".accAsgnRecipients").prop("disabled", false);
            });
            $("#costCenteraccountAssignmentTebleId tbody").find("tr:gt(0)").remove();
//            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    var quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                    var percentage = 100;
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(quantity).toFixed(3)));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").val(parseInt(percentage).toFixed(1));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").attr({"max": Number(quantity).toFixed(1),
                        "value": formatNumberByComma(parseInt(quantity).toFixed(1))
                    });
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").attr({"max": Number(percentage).toFixed(1),
                        "value": parseInt(percentage).toFixed(1)
                    });
                    var accountAssignmentCategory = $(this).find('td').eq(2).children(".accountAssignmentClass").val();
                    distributionByPercentage();
                }
            });
        } else if (distribution === 'Single Account Assignment') {
            var quantity = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                }
            });
            var percentage = 100;
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(parseFloat(quantity).toFixed(3)));
                $(this).find("td").eq(2).children(".accAsgnPercentage").val(parseFloat(percentage).toFixed(1));
            });
            $("#costCenteraccountAssignmentTebleId").find("tr:gt(1)").remove();
            $("#costCenteraccountAssignmentTebleId :input").prop("disabled", true);
        }
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });

    var insertionid = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var prType = $("#PrType").val();
        //SET OPU as AU by default
        if (prType === "Service") {
            $(this).find("td").eq(8).children(".prOrderPriceUnit").val("AU");
        }
//            if (insertionid === id) {
//                var qty = $(this).find("td").eq(7).html();

//                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").val(qty);
//                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").attr({
//                    "max": qty,
//                    "value": qty
//                });
//                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").val(100);
//                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").attr({
//                    "max": 100.00,
//                    "value": 100.00
//                });
//            }
    });
    var distribution = $("#distribution").val();
    if (distribution === 'Distrib. On Quantity Basis') {
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(2).children(".accAsgnPercentage").prop("disabled", true);
            $(this).find("td").eq(1).children(".accAsgnQuantity").prop("disabled", false);
        });
    } else if (distribution === 'Distrib. By Percentage') {
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(2).children(".accAsgnPercentage").prop("disabled", false);
            $(this).find("td").eq(1).children(".accAsgnQuantity").prop("disabled", true);
        });
    } else if (distribution === 'Single Account Assignment') {
        $("#costCenteraccountAssignmentTebleId :input").prop("disabled", true);
    }

    var material_header_table_AccAsgn = "";
    var material_header_table_Quantity = 0;
    var itemDropdownId;
    $("#costCenterAccountAssignmentchangeScreenbtn").click(function() {
        $(".costCenterDiv").css("display", "none");
        $(".multipleCostCenterDiv").css("display", "block");
        var distribution = $("#distribution").val();
        var glAccount = $("#gLAccount").val();
        var coArea = $("#coArea").val();
        var costCenter = $("#costCenterAccAsgn").val();
        var fund = $("#accAsgnfund").val();
        var functionalArea = $("#accAsgnfunctionalArea").val();
        var fundCenter = $("#accAsgnFundCenterInput").val();
        var commitmentItem = $("#accAsgnCommItemInput").val();
        var unloadingpoint = $("#unloadingPoint").val();
        var recipients = $("#recipient").val();
        var order = $("#accAsgnOrder").val();
        var asset = $("#accAsgnAssets").val();
        var wBSElement = $("#accAsgnWBSElement").val();
        var accAsgnS_I_D = $("#accAsgnS_I_D").val();
        var network = $("#accAsgnNetActNumber").val();
        var salesOrder = $("#accAsgnSalesOrder").val();
        var itemNumber = $("#assAsgnItemNumber").val();
        var delSch = $("#assAsgnDelivSch").val();
        console.log("glAccount :" + glAccount);
        console.log("coArea :" + coArea);
        console.log("costCenter :" + costCenter);
        console.log("fund :" + fund);
        console.log("functionalArea :" + functionalArea);
        console.log("fundCenter :" + fundCenter);
        console.log("commitmentItem :" + commitmentItem);
        console.log("unloadingpoint :" + unloadingpoint);
        console.log("recipients :" + recipients);
        console.log("asset :" + asset);
        console.log("wBSElement :" + wBSElement);
        console.log("accAsgnS_I_D :" + accAsgnS_I_D);
        console.log("network :" + network);
//        $("#distribution").prop("disabled", false);
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                material_header_table_Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
            }
        });
        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
            $("#distribution").prop("disabled", false);
            var prNumber = "";
            $("#costCenteraccountAssignmentTebleId tbody").find("input").prop("disabled", true);
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    prNumber = $(this).find("td").eq(0).children('.prNumber_Class').val();
                }
            });
            if (prNumber === "") {
                if (!$("#costCenterAccountAssignmentTablechangeScreenbtn").is(":visible")) {
                    $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "");
                }
            }
        }
        var rowCount = $("#costCenteraccountAssignmentTebleId tr").closest("tr").length;
        if (rowCount === 2) {
            var table_tr = $("#costCenteraccountAssignmentTebleId tbody tr");
            table_tr.find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(material_header_table_Quantity).toFixed(3)));
            table_tr.find("td").eq(1).children(".accAsgnQuantity").attr({
                "val": formatNumberByComma(material_header_table_Quantity),
                "max": material_header_table_Quantity
            });
            table_tr.find("td").eq(2).children(".accAsgnPercentage").val(100);
            table_tr.find("td").eq(2).children(".accAsgnPercentage").attr({
                "val": 100,
                "max": 100
            });
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    console.log("insertionid :" + insertionid + " " + "id :" + id);
                    var material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    if (material_header_table_AccAsgn === 'K') {

                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
                        table_tr.find("td").eq(6).children(".accAsgnFund").val(fund);
                        table_tr.find("td").eq(7).children(".accAsgnFunctionalArea").val(functionalArea);
                        table_tr.find("td").eq(8).children(".accAsgnFundCenter").val(fundCenter);
                        table_tr.find("td").eq(9).children(".accAsgnCommitmentItem").val(commitmentItem);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                    } else if (material_header_table_AccAsgn === 'F') {
                        console.log("Order IN f :" + order);
                        console.log("glAccount in Acc Cat F :" + glAccount);
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
                        table_tr.find("td").eq(6).children(".accAsgnFund").val(fund);
                        table_tr.find("td").eq(7).children(".accAsgnFunctionalArea").val(functionalArea);
                        table_tr.find("td").eq(8).children(".accAsgnFundCenter").val(fundCenter);
                        table_tr.find("td").eq(9).children(".accAsgnCommitmentItem").val(commitmentItem);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnOrder").val(order);
                    } else if (material_header_table_AccAsgn === 'A') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnOrder").val(order);
                        table_tr.find("td").eq(13).children(".accAsgnAssets").val(asset);
                        table_tr.find("td").eq(14).children(".accAsgnWBSElement").val(wBSElement);
                    } else if (material_header_table_AccAsgn === 'B') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                    } else if (material_header_table_AccAsgn === 'C') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                    } else if (material_header_table_AccAsgn === 'D') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnWBSElement").val(wBSElement);
                        table_tr.find("td").eq(15).children(".accAsgnSalesOrder").val(salesOrder);
                        table_tr.find("td").eq(17).children(".accAsgnItemNumber").val(itemNumber);
                        table_tr.find("td").eq(18).children(".accAsgnDeliverySchedule").val(delSch);
                    } else if (material_header_table_AccAsgn === 'E') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(15).children(".accAsgnSalesOrder").val(salesOrder);
                        table_tr.find("td").eq(17).children(".accAsgnItemNumber").val(itemNumber);
                        table_tr.find("td").eq(18).children(".accAsgnDeliverySchedule").val(delSch);
                    } else if (material_header_table_AccAsgn === 'G') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                    } else if (material_header_table_AccAsgn === 'M') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(15).children(".accAsgnSalesOrder").val(salesOrder);
                    } else if (material_header_table_AccAsgn === 'N') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(16).children(".accAsgnNetActNumber").val(network);
                    } else if (material_header_table_AccAsgn === 'P') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(16).children(".accAsgnNetActNumber").val(network);
                        table_tr.find("td").eq(12).children(".accAsgnWBSElement").val(wBSElement);
                    } else if (material_header_table_AccAsgn === 'Q') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnWBSElement").val(wBSElement);
                        table_tr.find("td").eq(15).children(".accAsgnSalesOrder").val(salesOrder);
                        table_tr.find("td").eq(17).children(".accAsgnItemNumber").val(itemNumber);
                        table_tr.find("td").eq(18).children(".accAsgnDeliverySchedule").val(delSch);
                    } else if (material_header_table_AccAsgn === 'R') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
                        table_tr.find("td").eq(6).children(".accAsgnFund").val(fund);
                        table_tr.find("td").eq(7).children(".accAsgnFunctionalArea").val(functionalArea);
                        table_tr.find("td").eq(8).children(".accAsgnFundCenter").val(fundCenter);
                        table_tr.find("td").eq(9).children(".accAsgnCommitmentItem").val(commitmentItem);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnWBSElement").val(wBSElement);
                        table_tr.find("td").eq(15).children(".accAsgnSalesOrder").val(salesOrder);
                        table_tr.find("td").eq(17).children(".accAsgnItemNumber").val(itemNumber);
                        table_tr.find("td").eq(18).children(".accAsgnDeliverySchedule").val(delSch);
                    } else if (material_header_table_AccAsgn === 'T') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
                        table_tr.find("td").eq(9).children(".accAsgnCommitmentItem").val(commitmentItem);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnOrder").val(order);
                        table_tr.find("td").eq(12).children(".accAsgnWBSElement").val(wBSElement);
                        table_tr.find("td").eq(15).children(".accAsgnSalesOrder").val(salesOrder);
                        table_tr.find("td").eq(16).children(".accAsgnNetActNumber").val(network);
                        table_tr.find("td").eq(17).children(".accAsgnItemNumber").val(itemNumber);
                        table_tr.find("td").eq(18).children(".accAsgnDeliverySchedule").val(delSch);
                    } else if (material_header_table_AccAsgn === 'X') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
                        table_tr.find("td").eq(10).children(".accAsgnUnloadingPoint").val(unloadingpoint);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnOrder").val(order);
                        table_tr.find("td").eq(12).children(".accAsgnWBSElement").val(wBSElement);
                        table_tr.find("td").eq(15).children(".accAsgnSalesOrder").val(salesOrder);
                        table_tr.find("td").eq(17).children(".accAsgnItemNumber").val(itemNumber);
                        table_tr.find("td").eq(18).children(".accAsgnDeliverySchedule").val(delSch);
                    } else if (material_header_table_AccAsgn === 'Z') {
                        table_tr.find("td").eq(3).children(".accAsgnGLAccount").val(glAccount);
                        table_tr.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
                        table_tr.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
                        table_tr.find("td").eq(11).children(".accAsgnRecipients").val(recipients);
                        table_tr.find("td").eq(12).children(".accAsgnOrder").val(order);
                    }
                }
            });
        }
    });
    $("#costCenterAccountAssignmentTablechangeScreenbtn").click(function() {
        var distribution = $("#distribution").val();
        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
            if (distribution !== 'Single Account Assignment') {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                var errorMsg = "Please change distribution to Single Account Assignment!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
//                isPrLineData = "No";
//                $("#distribution").css("border-color", "red");
                $("#distribution").focus();
                return false;
            } else {
                $("#distribution").css("border-color", "");
            }
            $("#distribution").prop("disabled", true);
        }
        $(".multipleCostCenterDiv").css("display", "none");
        $(".costCenterDiv").css("display", "block");
//        if (distribution === 'Single Account Assignment') {
//            $("#distribution").prop("disabled", true);
//        }
    });
    $("#gLAccount").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#gLAccountModal").modal("show");
            getAllGLCode();
            $("#ro_GLCOde").val("FromInputField");
        }
    });
    var gLAccountTable = null;
    function getAllGLCode() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllGLCode",
                "companyCode": $("#companycodeHeader").val()
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='gLCodeCheckboxClass'></td>"
                            + "<td>" + obj[i].CODE + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }

                $("#gLAccountTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#gLAccountTableId')) {
                    gLAccountTable.destroy();
                    gLAccountTable = null;
                    $("#gLAccountTableId").children('tbody').html(row);
                    gLAccountTable = $('table.gLAccountTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    gLAccountTable.buttons().container()
                            .appendTo('#gLAccountTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#gLAccountTableId thead tr').clone(true).appendTo('#gLAccountTableId thead');
                    $('#gLAccountTableId thead tr:eq(1) th').each(function(i) {
                        $('#gLAccountTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (gLAccountTable.column(i).search() !== this.value) {
                                gLAccountTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    gLAccountTable = $('table.gLAccountTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    gLAccountTable.buttons().container()
                            .appendTo('#gLAccountTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#coArea").click(function() {
        $("#coAreaModal").modal("show");
    });
    $("#costCenterAccAsgn").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    trackingNumber = $(this).find("td").eq(19).children(".pr-tracking-number").val();
                    if (trackingNumber === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Please enter tracking number!"
                        });
                        $(this).find("td").eq(19).children(".pr-tracking-number").focus();
                        status = "empty";
                    } else {
                        status = "notempty";
                    }
                }
            });
            if (status === "empty") {
                return false;
            }
            $("#ro_costCenter").val("FromInputField");
            getAllCostCenter();
            $("#costCenterModal").modal("show");
        }   
    });

    $("#fund").click(function() {
        $("#fundModal").modal("show");
    });
    $("#functionalArea").click(function() {
        $("#functionalAreaModal").modal("show");
    });
    $("#fundCenter").click(function() {
        $("#fundCenterModal").modal("show");
    });
    $("#commitmentItem").click(function() {
        $("#commitmentItemModal").modal("show");
    });
    $("#accAsgnOrder").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#ro_Order").val("FromField");
        }
    });

    $("#accAsgnCommItemInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#commitmentItemModal").modal("show");
            getAllCommitmentItem();
            $("#ro_CommitItem").val("FromInputField");
        }
    });

    $("#accAsgnWBSElementInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
            $("#ro_WBSElement").val("FromInputField");
        }
    });

    $("#accAsgnNActNumInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#networkActivityNumberModal").modal("show");
            getAllMasterNetwork();
            $("#ro_NetworkNumber").val("FromInputField");
        }
    });

    $("#accAsgnAsset").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnAssetModal").modal("show");
            getAllMasterAsset();
            $("#ro_Asset").val("FromInputField");
        }
    });

    if ($("table.coAreaTable-Class").length) {
        $(document).ready(function() {
            $('#coAreaTableId thead tr').clone(true).appendTo('#coAreaTableId thead');
            $('#coAreaTableId thead tr:eq(1) th').each(function(i) {
                $('#coAreaTableId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.coAreaTable-Class').DataTable({
//                "scrollY": 200,
//            "scrollX": true,
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#coAreaTableId_wrapper .col-md-6:eq(0)');
        });
    }

    if ($("table.fundTable-Class").length) {
        $(document).ready(function() {
            $('#fundTableId thead tr').clone(true).appendTo('#fundTableId thead');
            $('#fundTableId thead tr:eq(1) th').each(function(i) {
                $('#fundTableId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.fundTable-Class').DataTable({
//                "scrollY": 200,
//            "scrollX": true,
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#fundTableIdcostCenterTableId_wrapper .col-md-6:eq(0)');
        });
    }
    if ($("table.functionalAreaTable-Class").length) {
        $(document).ready(function() {
            $('#functionalAreaTableId thead tr').clone(true).appendTo('#functionalAreaTableId thead');
            $('#functionalAreaTableId thead tr:eq(1) th').each(function(i) {
                $('#functionalAreaTableId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.functionalAreaTable-Class').DataTable({
//                "scrollY": 200,
//            "scrollX": true,
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#functionalAreaTableId_wrapper .col-md-6:eq(0)');
        });
    }
    if ($("table.fundCenterTable-Class").length) {
        $(document).ready(function() {
            $('#fundCenterTableId thead tr').clone(true).appendTo('#fundCenterTableId thead');
            $('#fundCenterTableId thead tr:eq(1) th').each(function(i) {
                $('#fundCenterTableId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.fundCenterTable-Class').DataTable({
//                "scrollY": 200,
//            "scrollX": true,
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#fundCenterTableId_wrapper .col-md-6:eq(0)');
        });
    }


    if ($("table.conditionTypeModelTebleClass").length) {
        $(document).ready(function() {
            $('#conditionTypeModelTebleId thead tr').clone(true).appendTo('#conditionTypeModelTebleId thead');
            $('#conditionTypeModelTebleId thead tr:eq(1) th').each(function(i) {
                $('#conditionTypeModelTebleId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.conditionTypeModelTebleClass').DataTable({
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#conditionTypeModelTebleId_wrapper .col-md-6:eq(0)');
        });
    }

    if ($("table.CurrencyModelTebleClass").length) {
        $(document).ready(function() {
            $('#CurrencyModelTebleId thead tr').clone(true).appendTo('#CurrencyModelTebleId thead');
            $('#CurrencyModelTebleId thead tr:eq(1) th').each(function(i) {
                $('#CurrencyModelTebleId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.CurrencyModelTebleClass').DataTable({
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#CurrencyModelTebleId_wrapper .col-md-6:eq(0)');
        });
    }
    if ($("table.UOMModelTebleClass").length) {
        $(document).ready(function() {
            $('#UOMModelTebleId thead tr').clone(true).appendTo('#UOMModelTebleId thead');
            $('#UOMModelTebleId thead tr:eq(1) th').each(function(i) {
                $('#UOMModelTebleId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.UOMModelTebleClass').DataTable({
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#UOMModelTebleId_wrapper .col-md-6:eq(0)');
        });
    }
    if ($("table.ConditionValueModelTebleClass").length) {
        $(document).ready(function() {
            $('#ConditionValueModelTebleId thead tr').clone(true).appendTo('#ConditionValueModelTebleId thead');
            $('#ConditionValueModelTebleId thead tr:eq(1) th').each(function(i) {
                $('#ConditionValueModelTebleId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.ConditionValueModelTebleClass').DataTable({
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#ConditionValueModelTebleId_wrapper .col-md-6:eq(0)');
        });
    }
    if ($("table.Currency2ModelTebleClass").length) {
        $(document).ready(function() {
            $('#Currency2ModelTebleId thead tr').clone(true).appendTo('#Currency2ModelTebleId thead');
            $('#Currency2ModelTebleId thead tr:eq(1) th').each(function(i) {
                $('#Currency2ModelTebleId thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.Currency2ModelTebleClass').DataTable({
                lengthChange: false,
                orderCellsTop: true
            });
            table.buttons().container()
                    .appendTo('#Currency2ModelTebleId_wrapper .col-md-6:eq(0)');
        });
    }

    $("#costCenterTableId").on("click", ".costCenterCheckboxClass", function() {
        $(".costCenterCheckboxClass").prop("checked", false);
        var costCenter = $(this).parent().parent().find("td").eq(1).html();
        var companycode = $("#companycodeHeader").val();
        var requestFrom = $("#ro_costCenter").val();
        var fund;
        var coArea;
        var functionalArea = "";
        $("#costCenterModal").modal("hide");
        var costCenterId = $(this).val();
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {"reqFrom": "getFromCostCenter",
                "costCenter": costCenter
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
//                console.log("FUND :" + obj.FUND);
//                console.log("FUNDCENTER :" + obj.FUNDCENTER);
//                console.log("FUNCTIONALAREA :" + obj.FUNCTIONALAREA);
//                console.log("COMMITMENTITEM :" + obj.COMMITMENTITEM);
//                console.log("COAREA :" + obj.COAREA);
                coArea = obj.COAREA;
                functionalArea = obj.FUNCTIONALAREA;
            }
        });
        coArea = $(this).parent().children(".coAreaInCostCenter").val();
        var companycode = $("#companycodeHeader").val();
        $("#accAsgnfunctionalArea").val(functionalArea);
        $("#companyCodeService").val(companycode);
        $("#functionalAreaService").val(functionalArea);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {"reqFrom": "getFundFMAreaByComCode",
                "companyCode": companycode
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("FUND :" + obj.FUND);
                fund = obj.FUND;
            }
        });
        if (requestFrom === 'FromInputField') {
            $("#costCenterAccAsgn").val(costCenter);
            $("#accAsgnFundCenterInput").val(costCenter);
            $("#accAsgnfund").val(fund);
            $("#coArea").val(coArea);
            $("#costCenterAccAsgn").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
            currentClick.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
            currentClick.find("td").eq(6).children(".accAsgnFund").val(fund);
            currentClick.find("td").eq(8).children(".accAsgnFundCenter").val(costCenter);
            currentClick.find("td").eq(7).children(".accAsgnFunctionalArea").val(functionalArea);
            currentClick.find("td").eq(5).children(".accAsgnCostCetner").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#costCenterService").val(costCenter);
            $("#FundCenterServiceInput").val(costCenter);
            $("#fundService").val(fund);
            $("#coAreaService").val(coArea);
        } else if (requestFrom === 'FromLimitTabInputField') {
            $("#costCenterInp_Limits").val(costCenter);
            $("#fundCenterInp_Limits").val(costCenter);
            $("#fundInp_Limits").val(fund);
            $("#coAreaInp_Limits").val(coArea);
            $("#companyCodeInp_Limits").val(companycode);
            $("#functionalAreaInp_Limits").val(functionalArea);
            $('#costCenterModal').modal("hide");
            $("#limitsAccAssignmentModal").modal("show");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            currentClick.find("td").eq(3).children(".limitAccAsgnTblCOArea").val(coArea);
            currentClick.find("td").eq(4).children(".limitAccAsgnTblCostCetner").val(costCenter);
            currentClick.find("td").eq(5).children(".limitAccAsgnTblFund").val(fund);
            currentClick.find("td").eq(7).children(".limitAccAsgnTblFundCenter").val(costCenter);
            currentClick.find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").val(functionalArea);
            currentClick.find("td").eq(4).children(".limitAccAsgnTblCostCetner").css("border-color", "");
            $('#costCenterModal').modal("hide");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            currentClick.find("td").eq(4).children(".serviceAccAsgnTblCOArea").val(coArea);
            currentClick.find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val(costCenter);
            currentClick.find("td").eq(6).children(".serviceAccAsgnTblFund").val(fund);
            currentClick.find("td").eq(8).children(".serviceAccAsgnTblFundCenter").val(costCenter);
            currentClick.find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").val(functionalArea);
            currentClick.find("td").eq(5).children(".serviceAccAsgnTblCostCetner").css("border-color", "");
            $('#costCenterModal').modal("hide");
            $("#changeAccountAssignmentScreenModal").modal("show");
        }
    });
    $("#accAsgnOrderTableId").on("click", ".accAsgnOrderCheckboxClass", function() {
        $(".accAsgnOrderCheckboxClass").prop("checked", false);
        var order = $(this).parent().parent().find("td").eq(1).text();
        var requestFrom = $("#ro_Order").val();
        $("#accAsgnOrderModal").modal("hide");
        if (requestFrom === 'FromField') {
            $("#accAsgnOrder").val(order);
            $("#accAsgnOrder").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(12).children(".accAsgnOrder").val(order);
            currentClick.find("td").eq(12).children(".accAsgnOrder").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#OrderService").val(order);
            $("#OrderService").css("border-color", "");
            $("#accountAssignmentModal").modal("show");
            $("#accAsgnOrderModal").modal("hide");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            currentClick.find("td").eq(10).children(".serviceAccAsgnTblOrder").val(order);
            currentClick.find("td").eq(10).children(".serviceAccAsgnTblOrder").css("border-color", "");
            $("#accAsgnOrderModal").modal("hide");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#orderInp_Limits").val(order);
            $("#orderInp_Limits").css("border-color", "");
            $("#accAsgnOrderModal").modal("hide");
            $("#limitsAccAssignmentModal").modal("show");
        } else if (requestFrom === 'FromLimitTabAccAsgnTableInputField') {
            currentClick.find("td").eq(9).children(".limitAccAsgnTblOrder").val(order);
            currentClick.find("td").eq(9).children(".limitAccAsgnTblOrder").css("border-color", "");
            $("#accAsgnOrderModal").modal("hide");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
    });
    $("#gLAccountTableId").on("click", ".gLCodeCheckboxClass", function() {
        $(".gLCodeCheckboxClass").prop("checked", false);
        var code = $(this).parent().parent().find("td").eq(1).text();
//        var code = '0000123434';
//        var commItem = "";
//        var commitmentItem = "";
//        if (code !== "") {
//            commitmentItem = Number(code);
//            commItem = commitmentItem.toString();
//        } else {
//            commItem = code;
//        }
        var requestFrom = $("#ro_GLCOde").val();
        if (requestFrom === 'FromInputField') {
            $("#gLAccount").val(code);
            $("#accAsgnCommItemInput").val(code);
            $("#gLAccount").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(3).children(".accAsgnGLAccount").val(code);
            currentClick.find("td").eq(9).children(".accAsgnCommitmentItem").val(code);
            currentClick.find("td").eq(3).children(".accAsgnGLAccount").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#gLAccountService").val(code);
            $("#CommItemServiceInput").val(code);
            $("#accountAssignmentModal").modal("show");
            $("#gLAccountService").css("border-color", "");
        } else if (requestFrom === "FromServiceTabAccAsgnTableInputField") {
            currentClick.find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val(code);
            currentClick.find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").val(code);
            currentClick.find("td").eq(3).children(".serviceAccAsgnTblGLAccount").css("border-color", "");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#gLAccountInp_Limits").val(code);
            $("#commItemServiceInp_Limits").val(code);
            $("#limitsAccAssignmentModal").modal("show");
            $("#gLAccountInp_Limits").css("border-color", "");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            currentClick.find("td").eq(2).children(".limitAccAsgnTblGLAccount").val(code);
            currentClick.find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").val(code);
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#gLAccountModal").modal("hide");
    });
    $("#networkActivityNumberTableId").on("click", ".networkActivityNumberCheckboxClass", function() {
        $(".networkActivityNumberCheckboxClass").prop("checked", false);
        var network = $(this).parent().parent().find("td").eq(1).text();
        var requestFrom = $("#ro_NetworkNumber").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnNActNumInput").val(network);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(16).children(".accAsgnNetActNumber").val(network);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === "FromServiceTabInputField") {
            $("#NActNumServiceInput").val(network);
            $('#accountAssignmentModal').modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            currentClick.find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").val(network);
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#nActNumServiceInp_Limits").val(network);
            $('#limitsAccAssignmentModal').modal("show");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            currentClick.find("td").eq(13).children(".limitAccAsgnTblNetActNumber").val(network);
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#networkActivityNumberModal").modal("hide");
    });
    $("#commitmentItemTableId").on("click", ".commmentItemCheckboxClass", function() {
        $(".commmentItemCheckboxClass").prop("checked", false);
        var item = $(this).parent().parent().find("td").eq(1).text();
        var requestFrom = $("#ro_CommitItem").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnCommItemInput").val(item);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(9).children(".accAsgnCommitmentItem").val(item);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        }
        $("#commitmentItemModal").modal("hide");
    });
    $("#WBSElementTableId").on("click", ".wBSElementCheckboxClass", function() {
        $(".wBSElementCheckboxClass").prop("checked", false);
        var element = $(this).parent().parent().find('td').eq(1).text();
        var requestFrom = $("#ro_WBSElement").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnWBSElementInput").val(element);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(14).children(".accAsgnWBSElement").val(element);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#WBSElementInputService").val(element);
            $("#accountAssignmentModal").modal("show");
        } else if (requestFrom === "FromServiceTabAccAsgnTableInputField") {
            currentClick.find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val(element);
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#wBSElementInp_Limits").val(element);
            $("#limitsAccAssignmentModal").modal('show');
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            currentClick.find("td").eq(11).children(".limitAccAsgnTblWBSElement").val(element);
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        } else if (requestFrom === "ProfitabilitySegment") {
            $("#WBSElement").val(element);
//            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#WBSElementModal").modal("hide");
    });
    $("#accAsgnAssetTableId").on("click", ".accAsgnAssetCheckboxClass", function() {
        $(".accAsgnAssetCheckboxClass").prop("checked", false);
        var asset = $(this).parent().parent().find('td').eq(1).text();
        var requestFrom = $("#ro_Asset").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnAsset").val(asset);
            $("#accAsgnAsset").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(13).children(".accAsgnAssets").val(asset);
            currentClick.find("td").eq(13).children(".accAsgnAssets").css("border-color", "");
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (requestFrom === "FromServiceTabInputField") {
            $("#AssetService").val(asset);
            $("#AssetService").css("border-color", "");
            $("#accountAssignmentModal").modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            currentClick.find("td").eq(11).children(".serviceAccAsgnTblAssets").val(asset);
            currentClick.find("td").eq(11).children(".serviceAccAsgnTblAssets").css("border-color", "");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === 'FromLimitTabInputField') {
            $("#assetInp_Limits").val(asset);
            $("#assetInp_Limits").css("border-color", "");
            $("#limitsAccAssignmentModal").modal('show');
        } else if (requestFrom === 'FromLimitTabAccAsgnTableInputField') {
            currentClick.find("td").eq(10).children(".limitAccAsgnTblAssets").val(asset);
            currentClick.find("td").eq(10).children(".limitAccAsgnTblAssets").css("border-color", "");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#accAsgnAssetModal").modal("hide");
    });
    $("#serviceNumberTableId").on("click", ".serviceNumberTableCheckboxClass", function() {
        $(".serviceNumberTableCheckboxClass").prop("checked", false);
        var serviceNumber = $(this).parent().parent().find('td').eq(1).text();
        currentClick.find("td").eq(3).children(".ServicesNumber_Services ").val(serviceNumber);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getServiceMasterByServiceNumber",
                "ServiceNumber": serviceNumber
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.SHORTTEXT);
                console.log(obj.UNIT);
                var shorttext = obj.SHORTTEXT;
                var unit = obj.UNIT;
                var SLTextInfo = obj.SLTextInfo;
//                currentClick.find("td").eq(4).children(".shortText_Services").val(shorttext);
                currentClick.find("td").eq(6).children(".servicesUnit_Services").val(unit);
//                currentClick.find("td").eq(15).children(".serviceText").val(SLTextInfo);

                updateShortTextAndServiceTextByServiceId(currentClick, obj);
            }
        });
        $("#ServiceNumberModal").modal("hide");
    });
    $("#costCenteraccountAssignmentTebleId").on("keypress", ".accAsgnQuantity", function(e) {
        if (e.keyCode === 13) {
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    material_header_table_Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                }
            });

            $(this).val(removeCommaInNumber($(this).val()));
            var totalQuant = material_header_table_Quantity;
            var quantity = removeCommaInNumber($(this).val());
            var current_tr = $(this).parent().parent();
            console.log("quantity :" + quantity);
            console.log("totalQuant :" + totalQuant);
            console.log("Max Quant :" + this.max);
            var remainingQuantity = parseFloat(this.max) - parseFloat(quantity);
            var percentage = (quantity / (totalQuant) * 100).toFixed(2);
            var remPer = (remainingQuantity / totalQuant * 100).toFixed(2);
            console.log("remainingQuantity :" + remainingQuantity);
            console.log("remPer :" + remPer);
            if (parseFloat(removeCommaInNumber(this.value)) < parseFloat(this.max)) {
                $(this).attr({
                    "max": Number(quantity).toFixed(2),
                    "value": formatNumberByComma(Number(quantity).toFixed(2))
                });
                $(this).val(formatNumberByComma(quantity));
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").attr({
                    "max": Number(percentage).toFixed(2),
                    "value": Number(percentage).toFixed(2)
                });
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val(percentage);
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    var insertionid = $("#ItemNumberSelect").val();
                    if (insertionid === id) {
                        console.log("insertionid :" + insertionid + " " + "id :" + id);
                        var material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                        var row = "<tr><td><input type=hidden class=deleteFlag value='false'>" + "<i class='fa fa-window-close deleteAccAsgnTableRowClass' aria-hidden='true' style='width:22px;'>" +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" value=' + formatNumberByComma(Number(remainingQuantity).toFixed(3)) + ' max=' + remainingQuantity + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" disabled value=' + Number(remPer).toFixed(2) + ' max=' + remPer + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" value="" disabled style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" disabled value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" value="" style="width: 100px;">\n\
                            <input type=hidden class="form-control form-rounded input-height accAsgnLinkNumber" value="">' +
                                "</td></tr>";
                        $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);
                        var PoFrom = $("#PoFrom").val();
                        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                            populateGlCodeOnDistribution();
                        }
                        accAsgnTblQuantPerChange(current_tr, material_header_table_AccAsgn);
                    }
                });
            } else {
                $(this).val(formatNumberByComma(this.max));
            }
            saveAccountAssignmentTabDataOnLoadFieldChange();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnQuantity", function(e) {
        if (e.key === undefined) {
            var totalQuantity = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    totalQuantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                }
            });
            var quantity = removeCommaInNumber($(this).val());
            var remainingQuantity = Number(totalQuantity) - Number(quantity);
            var per = quantity * 100 / totalQuantity;
            $(this).val(formatNumberByComma(quantity));
            $(this).attr({
//                "max": quantity,
                "value": formatNumberByComma(quantity)
            });
            $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val(Number(per).toFixed(2));
            $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").attr({
//                "max": per,
                "value": per
            });
            var totalAccAsgnQuant = 0;
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                var accAsgnQuant = removeCommaInNumber($(this).find("td").eq(1).children(".accAsgnQuantity").val());
                totalAccAsgnQuant = Number(totalAccAsgnQuant) + Number(accAsgnQuant);
            });
//            alert("totalAccAsgnQuant :" + totalAccAsgnQuant + " ,totalQuantity :" + totalQuantity);
            if (Number(totalAccAsgnQuant) > Number(totalQuantity)) {
                $(this).val("0.000");
                $(this).attr({
                    "value": "0.000"
                });
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val("0.00");
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").attr({
                    "value": "0.00"
                });
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter correct Quantity!";
                $("#gLAccount").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
            } else {
                $(this).attr({
                    "max": quantity
                });
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val(Number(per).toFixed(2));
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").attr({
                    "max": per
                });
            }
            totalQuantity = remainingQuantity;
            saveAccountAssignmentTabDataOnLoadFieldChange();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on("keypress", ".accAsgnPercentage", function(e) {
        if (e.keyCode === 13) {
            $(this).val(Number($(this).val()).toFixed(2));
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    material_header_table_Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                }
            });
            var totalQuant = material_header_table_Quantity;
            var percentage = $(this).val();
            var current_tr = $(this).parent().parent();
            var maxQuantity = $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr("max");
            console.log("percentage :" + percentage);
            console.log("totalQuant :" + totalQuant);
            console.log("max :" + maxQuantity);
            var remPer = this.max - percentage;
            var quantFromPer = Number(totalQuant) * Number(percentage) / 100;
            var remainingQuantity = Number(maxQuantity) - Number(quantFromPer);
            if (Number(this.value) < Number(this.max)) {
                $(this).attr({
                    "max": Number(percentage).toFixed(2),
                    "value": Number(percentage).toFixed(2)
                });
                $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr({
                    "max": Number(quantFromPer).toFixed(2),
                    "value": formatNumberByComma(Number(quantFromPer).toFixed(2))
                });
                $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(quantFromPer).toFixed(3)));
                //       
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    var insertionid = $("#ItemNumberSelect").val();
                    if (insertionid === id) {
                        console.log("insertionid :" + insertionid + " " + "id :" + id);
                        var material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                        var row = "<tr><td><input type=hidden class=deleteFlag value='false'>" + "<i class='fa fa-window-close deleteAccAsgnTableRowClass' aria-hidden='true' style='width:22px;'>" +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" disabled value=' + formatNumberByComma(Number(remainingQuantity).toFixed(3)) + ' max=' + remainingQuantity + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" value=' + Number(remPer).toFixed(2) + ' max=' + remPer + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" value="" disabled style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" disabled value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" value="" style="width: 100px;">' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" value="" style="width: 100px;">\n\
                            <input type=hidden class="form-control form-rounded input-height accAsgnLinkNumber" value="">' +
                                "</td></tr>";
                        $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);
                        var PoFrom = $("#PoFrom").val();
                        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                            populateGlCodeOnDistribution();
                        }
                        accAsgnTblQuantPerChange(current_tr, material_header_table_AccAsgn);
                    }
                });
            } else {
                $(this).val(this.max);
            }
            saveAccountAssignmentTabDataOnLoadFieldChange();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnPercentage", function(e) {
        if (e.key === undefined) {
            var totalQuantity = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    totalQuantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                }
            });
            var per = $(this).val();
            var quantity = Number(totalQuantity) * Number(per) / 100;
            var remainingQuantity = Number(totalQuantity) - Number(quantity);
//            var per = quantity * 100 / totalQuantity;
            $(this).val(Number(per).toFixed(2));
            $(this).attr({
//                "max": quantity,
                "value": per
            });
            $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(quantity).toFixed(3)));
            $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr({
//                "max": per,
                "value": formatNumberByComma(quantity)
            });
            var totalAccAsgnQuant = 0;
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                var accAsgnQuant = removeCommaInNumber($(this).find("td").eq(1).children(".accAsgnQuantity").val());
                totalAccAsgnQuant = Number(totalAccAsgnQuant) + Number(accAsgnQuant);
            });

            if (Number(totalAccAsgnQuant) > Number(totalQuantity)) {
                $(this).val("0.000");
                $(this).attr({
                    "value": "0.000"
                });
                $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").val("0.000");
                $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr({
                    "value": "0.000"
                });
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter correct Percentage!";
                $("#gLAccount").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
            } else {
                $(this).attr({
                    "max": quantity
                });
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val(Number(per).toFixed(2));
                $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").attr({
                    "max": per
                });
            }
            totalQuantity = remainingQuantity;
            saveAccountAssignmentTabDataOnLoadFieldChange();
        }
    });
    function accAsgnTblQuantPerChange(current_tr, material_header_table_AccAsgn) {
        if (material_header_table_AccAsgn === 'K') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(12).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(14).css("display", "none");
                $(this).find("td").eq(15).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
                $(this).find("td").eq(17).css("display", "none");
                $(this).find("td").eq(18).css("display", "none");
                $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
                $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", true);
                $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", true);
                $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", true);
                $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", true);
            });

        } else if (material_header_table_AccAsgn === 'N') {
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

                $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", true);
            });
        } else if (material_header_table_AccAsgn === 'A') {
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
                $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
                $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", true);
            });
        } else if (material_header_table_AccAsgn === 'B') {
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
            });
        } else if (material_header_table_AccAsgn === 'C') {
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
            });
        } else if (material_header_table_AccAsgn === 'D') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(5).css("display", "none");
                $(this).find("td").eq(6).css("display", "none");
                $(this).find("td").eq(7).css("display", "none");
                $(this).find("td").eq(8).css("display", "none");
                $(this).find("td").eq(9).css("display", "none");
                $(this).find("td").eq(12).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
            });
        } else if (material_header_table_AccAsgn === 'E') {
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
            });
        } else if (material_header_table_AccAsgn === 'F') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(14).css("display", "none");
                $(this).find("td").eq(15).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
                $(this).find("td").eq(17).css("display", "none");
                $(this).find("td").eq(18).css("display", "none");
                $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", true);
                $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", true);
                $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", true);
                $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", true);
            });
        } else if (material_header_table_AccAsgn === 'G') {
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
            });
        } else if (material_header_table_AccAsgn === 'M') {
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
            });
        } else if (material_header_table_AccAsgn === 'P') {
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
            });
        } else if (material_header_table_AccAsgn === 'Q') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(5).css("display", "none");
                $(this).find("td").eq(6).css("display", "none");
                $(this).find("td").eq(7).css("display", "none");
                $(this).find("td").eq(8).css("display", "none");
                $(this).find("td").eq(9).css("display", "none");
                $(this).find("td").eq(12).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
                $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", true);
                $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", true);
                $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", true);
            });
        } else if (material_header_table_AccAsgn === 'R') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(12).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(15).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
                $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", true);
                $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", true);
                $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", true);
                $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", true);
            });
        } else if (material_header_table_AccAsgn === 'T') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(6).css("display", "none");
                $(this).find("td").eq(7).css("display", "none");
                $(this).find("td").eq(8).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
            });
        } else if (material_header_table_AccAsgn === 'X') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(6).css("display", "none");
                $(this).find("td").eq(7).css("display", "none");
                $(this).find("td").eq(8).css("display", "none");
                $(this).find("td").eq(9).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
            });
        } else if (material_header_table_AccAsgn === 'Z') {
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
            });
        }
    }
    var totalRowCount;
    $("#costCenteraccountAssignmentTebleId").on("click", ".deleteAccAsgnTableRowClass", function() {
        totalRowCount = 0;
        var quantity = removeCommaInNumber($(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").val());
        var prevRowquantity = removeCommaInNumber($(this).parent().parent().prev().find("td").eq(1).children(".accAsgnQuantity").val());
        var per = $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val();
        var prevRowPer = $(this).parent().parent().prev().find("td").eq(2).children(".accAsgnPercentage").val();
        var quantityAfterRowDeletion = parseFloat(quantity) + parseFloat(prevRowquantity);
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            totalRowCount++;
        });
        var perAfterRowDeletion;
        if (totalRowCount === 2) {
            perAfterRowDeletion = Math.round(parseFloat(per) + parseFloat(prevRowPer));
        } else {
            perAfterRowDeletion = parseFloat(per) + parseFloat(prevRowPer);
        }
        $(this).parent().parent().prev().find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(quantityAfterRowDeletion).toFixed(3)));
        $(this).parent().parent().prev().find("td").eq(2).children(".accAsgnPercentage").val(perAfterRowDeletion);
        $(this).parent().parent().prev().find("td").eq(1).children(".accAsgnQuantity").attr({"max": quantityAfterRowDeletion,
            "value": formatNumberByComma(quantityAfterRowDeletion)
        });
        $(this).parent().parent().prev().find("td").eq(2).children(".accAsgnPercentage").attr({"max": perAfterRowDeletion,
            "value": perAfterRowDeletion
        });
        $(this).parent().parent().remove();
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });
    
    var currentClick;
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnCostCetner', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    trackingNumber = $(this).find("td").eq(19).children(".pr-tracking-number").val();
                    if (trackingNumber === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Please enter tracking number!"
                        });
                        $(this).find("td").eq(19).children(".pr-tracking-number").focus();
                        status = "empty";
    //                return false;
                    } else {
                        status = "notempty";
                    }
                }
            });
            if (status === "empty") {
                return false;
            }
            $("#ro_costCenter").val("FromTable");
            currentClick = $(this).parent().parent();
            costCenterCurrent = $(this).parent().parent();
            $("#costCenterModal").modal("show");
            getAllCostCenter();
        }
    });
//var currentOrderClick;
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnOrder', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ro_Order").val("FromTable");
            currentClick = $(this).parent().parent();
            orderCurrent = $(this).parent().parent();
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnGLAccount', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ro_GLCOde").val("FromTable");
            currentClick = $(this).parent().parent();
            gLAccountCurrent = $(this).parent().parent();
            $("#gLAccountModal").modal("show");
            getAllGLCode();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnCommitmentItem', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ro_CommitItem").val("FromTable");
            currentClick = $(this).parent().parent();
            $("#commitmentItemModal").modal("show");
            getAllCommitmentItem();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnWBSElement', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ro_WBSElement").val("FromTable");
            currentClick = $(this).parent().parent();
            wbsElementCurrent = $(this).parent().parent();
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnNetActNumber', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ro_NetworkNumber").val("FromTable");
            currentClick = $(this).parent().parent();
            netActCurrent = $(this).parent().parent();
            $("#networkActivityNumberModal").modal("show");
            getAllMasterNetwork();
        }
    });
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnAssets', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ro_Asset").val("FromTable");
            currentClick = $(this).parent().parent();
            assetCurrent = $(this).parent().parent();
            $("#accAsgnAssetModal").modal("show");
            getAllMasterAsset();
        }
    });
    
    $("#serviceTableId").on("keypress", ".ServicesNumber_Services", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var status = "";
            var materialGroup = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    materialGroup = $(this).find("td").eq(15).children(".materialGroupClass").val();
                    if (materialGroup === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Please enter material group!"
                        });
                        $(this).find("td").eq(15).children(".materialGroupClass").focus();
                        status = "empty";
                    } else {
                        status = "notempty";
                    }
                }
            });
            if (status === "empty") {
                return false;
            }
            $("#ServiceNumberModal").modal("show");
            getAllServiceMaster();
            currentClick = $(this).parent().parent();
        }
    });
//Service Tab ============================================================================
    $("#costCenterService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    trackingNumber = $(this).find("td").eq(19).children(".pr-tracking-number").val();
                    if (trackingNumber === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Please enter tracking number!"
                        });
                        $(this).find("td").eq(19).children(".pr-tracking-number").focus();
                        status = "empty";
    //                return false;
                    } else {
                        status = "notempty";
                    }
                }
            });
            if (status === "empty") {
                return false;
            }
            $("#costCenterModal").modal("show");
            getAllCostCenter();
            $("#ro_costCenter").val("FromServiceTabInputField");
        }
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblCostCetner", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    trackingNumber = $(this).find("td").eq(19).children(".pr-tracking-number").val();
                    if (trackingNumber === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Please enter tracking number!"
                        });
                        $(this).find("td").eq(19).children(".pr-tracking-number").focus();
                        status = "empty";
    //                return false;
                    } else {
                        status = "notempty";
                    }
                }
            });
            if (status === "empty") {
                return false;
            }
            currentClick = $(this).parent().parent();
            costCenterCurrent = $(this).parent().parent();
            $("#costCenterModal").modal("show");
            getAllCostCenter();
            $("#changeAccountAssignmentScreenModal").modal("hide");
            $("#ro_costCenter").val("FromServiceTabAccAsgnTableInputField");
        }
    });
    $("#OrderService").click(function() {
        $("#accAsgnOrderModal").modal("show");
        getAllInterOrder();
        $("#accountAssignmentModal").modal("hide");
        $("#ro_Order").val("FromServiceTabInputField");
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblOrder", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
    //$("#serviceAccAsgnTblOrder").click(function(){
            currentClick = $(this).parent().parent();
            orderCurrent = $(this).parent().parent();
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#changeAccountAssignmentScreenModal").modal("hide");
            $("#ro_Order").val("FromServiceTabAccAsgnTableInputField");
        }
    });
    $("#AssetService").click(function() {
        $("#accAsgnAssetModal").modal("show");
        getAllMasterAsset();
        $("#accountAssignmentModal").modal("hide");
        $("#ro_Asset").val("FromServiceTabInputField");
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblAssets", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            assetCurrent = $(this).parent().parent();
            $("#accAsgnAssetModal").modal("show");
            getAllMasterAsset();
            $("#changeAccountAssignmentScreenModal").modal("hide");
            $("#ro_Asset").val("FromServiceTabAccAsgnTableInputField");
        }
    });
    $("#gLAccountService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#gLAccountModal").modal("show");
            getAllGLCode();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_GLCOde").val("FromServiceTabInputField");
        }
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblGLAccount", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            gLAccountCurrent = $(this).parent().parent();
            $("#gLAccountModal").modal("show");
            getAllGLCode();
            $("#changeAccountAssignmentScreenModal").modal("hide");
            $("#ro_GLCOde").val("FromServiceTabAccAsgnTableInputField");
        }
    });
    $("#WBSElementInputService").click(function() {
        $("#WBSElementModal").modal("show");
        getAllMasterWBSElement();
        $("#accountAssignmentModal").modal("hide");
        $("#ro_WBSElement").val("FromServiceTabInputField");
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblWBSElement", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            wbsElementCurrent = $(this).parent().parent();
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
            $("#changeAccountAssignmentScreenModal").modal("hide");
            $("#ro_WBSElement").val("FromServiceTabAccAsgnTableInputField");
        }
    });
    $("#NActNumServiceInput").click(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#networkActivityNumberModal").modal('show');
            getAllMasterNetwork();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_NetworkNumber").val("FromServiceTabInputField");
        }
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblNetActNumber", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            netActCurrent = $(this).parent().parent();
            $("#networkActivityNumberModal").modal('show');
            getAllMasterNetwork();
            $("#changeAccountAssignmentScreenModal").modal("hide");
            $("#ro_NetworkNumber").val("FromServiceTabAccAsgnTableInputField");
        }
    });
//Limits Tab==============================================================================

    $("#costCenterInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    trackingNumber = $(this).find("td").eq(19).children(".pr-tracking-number").val();
                    if (trackingNumber === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Please enter tracking number!"
                        });
                        $(this).find("td").eq(19).children(".pr-tracking-number").focus();
                        status = "empty";
    //                return false;
                    } else {
                        status = "notempty";
                    }
                }
            });
            if (status === "empty") {
                return false;
            }
            $("#costCenterModal").modal("show");
            getAllCostCenter();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_costCenter").val("FromLimitTabInputField");
        }
    });
    
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblCostCetner", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    trackingNumber = $(this).find("td").eq(19).children(".pr-tracking-number").val();
                    if (trackingNumber === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Please enter tracking number!"
                        });
                        $(this).find("td").eq(19).children(".pr-tracking-number").focus();
                        status = "empty";
    //                return false;
                    } else {
                        status = "notempty";
                    }
                }
            });
            if (status === "empty") {
                return false;
            }
            currentClick = $(this).parent().parent();
            costCenterCurrent = $(this).parent().parent();
            $("#costCenterModal").modal("show");
            getAllCostCenter();
            $("#limitsChangeAccAsgnScreenModal").modal("hide");
            $("#ro_costCenter").val("FromLimitTabAccAsgnTableInputField");
        }
    });
    $("#orderInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_Order").val("FromLimitTabInputField");
        }
    });
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblOrder", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            orderCurrent = $(this).parent().parent();
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#limitsChangeAccAsgnScreenModal").modal("hide");
            $("#ro_Order").val("FromLimitTabAccAsgnTableInputField");
        }
    });
    $("#assetInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnAssetModal").modal("show");
            getAllMasterAsset();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_Asset").val("FromLimitTabInputField");
        }
    });
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblAssets", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            assetCurrent = $(this).parent().parent();
            $("#accAsgnAssetModal").modal("show");
            getAllMasterAsset();
            $("#limitsChangeAccAsgnScreenModal").modal("hide");
            $("#ro_Asset").val("FromLimitTabAccAsgnTableInputField");
        }
    });
    $("#gLAccountInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#gLAccountModal").modal("show");
            getAllGLCode();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_GLCOde").val("FromLimitTabInputField");
        }
    });
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblGLAccount", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            gLAccountCurrent = $(this).parent().parent();
            $("#gLAccountModal").modal("show");
            getAllGLCode();
            $("#limitsChangeAccAsgnScreenModal").modal("hide");
            $("#ro_GLCOde").val("FromLimitTabAccAsgnTableInputField");
        }
    });
    $("#wBSElementInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_WBSElement").val("FromLimitTabInputField");
        }
    });
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblWBSElement", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            wbsElementCurrent = $(this).parent().parent();
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
            $("#limitsChangeAccAsgnScreenModal").modal("hide");
            $("#ro_WBSElement").val("FromLimitTabAccAsgnTableInputField");
        }
    });
    $("#nActNumServiceInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#networkActivityNumberModal").modal('show');
            getAllMasterNetwork();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_NetworkNumber").val("FromLimitTabInputField");
        }
    });
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblNetActNumber", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            netActCurrent = $(this).parent().parent();
            $("#networkActivityNumberModal").modal("show");
            getAllMasterNetwork();
            $("#limitsChangeAccAsgnScreenModal").modal("hide");
            $("#ro_NetworkNumber").val("FromLimitTabAccAsgnTableInputField");
        }
    });
//===================================================================================================================

    $("#limitsAccAsgnBtn").click(function() {
        $("#limitsAccAssignmentModal").modal("show");
    });
    $("#limitAccAsgnChangeScreenbtn").click(function() {
        $("#limitsChangeAccAsgnScreenModal").modal("show");
        $("#limitsAccAssignmentModal").modal("hide");
        var limitAccountAssignmentTableLength = $('#limitTabAccAsgnTebleId tr').length;
        var accountAssignmentCategory;
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $(".ItemNumberSelectClass").val();
            if (insertionid === id) {
                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            }
            if (accountAssignmentCategory === 'K') {
                limits_AccAsgnCat_K("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'N') {
                limits_AccAsgnCat_N("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'A') {
                limits_AccAsgnCat_A("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'C') {
                limits_AccAsgnCat_C("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'F') {
                limits_AccAsgnCat_F("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'P') {
                limits_AccAsgnCat_P("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'R') {
                limits_AccAsgnCat_R("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'X') {
                limits_AccAsgnCat_X("serviceTableCheckBox");
            } else if (accountAssignmentCategory === 'Z') {
                limits_AccAsgnCat_Z("serviceTableCheckBox");
            }
        });
        if (limitAccountAssignmentTableLength === 1 || limitAccountAssignmentTableLength === 2) {
//            var quantityService = serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val();
            var quantityService = 100;
            $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".limitAccAsgnTblQuantity").val(quantityService);
            $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".limitAccAsgnTblQuantity").attr({
                "max": quantityService,
                "value": quantityService
            });
//            var lineItem = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
//            var serviceNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".ServicesNumber_Services").val();
//            var shortText = serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".shortText_Services").val();
//            var uom = serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".servicesUnit_Services").val();
//            $("#limitAccountAssignLine").val(lineItem);
//            $("#limitAccountAssignQuantity").val(parseFloat(quantityService));
//            $("#limitAccountAssignActivity").val(serviceNumber);
//            $("#limitAccountAssignShortText").val(shortText);
//            $("#limitAccountAssignuom").val(uom);
//
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    $("#limitAccountAssignQuantity").val(formatNumberByComma(quantity));
                    var accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".limitAccAsgnTblGLAccount").val($("#gLAccountInp_Limits").val());
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").val($("#coAreaInp_Limits").val());
                    if (accountAssignmentCategory === 'A') {
//                        limits_AccAsgnCat_A("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".limitAccAsgnTblOrder").val($("#orderInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(10).children(".limitAccAsgnTblAssets").val($("#assetInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(11).children(".limitAccAsgnTblWBSElement").val($("#wBSElementInp_Limits").val());
                    } else if (accountAssignmentCategory === 'C') {
//                        limits_AccAsgnCat_C("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".limitAccAsgnTblSalesOrder").val($("#salesOrderInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(14).children(".limitAccAsgnTblItemNumber").val($("#itemNumberInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(15).children(".limitAccAsgnTblDeliverySchedule").val($("#delivSchInp_Limits").val());
                    } else if (accountAssignmentCategory === 'F') {
//                        limits_AccAsgnCat_F("serviceTableCheckBox");

                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".limitAccAsgnTblCostCetner").val($("#costCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".limitAccAsgnTblOrder").val($("#orderInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".limitAccAsgnTblFund").val($("#fundInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").val($("#functionalAreaInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".limitAccAsgnTblFundCenter").val($("#fundCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").val($("#commItemServiceInp_Limits").val());
                    } else if (accountAssignmentCategory === 'K') {
//                        limits_AccAsgnCat_K("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".limitAccAsgnTblCostCetner").val($("#costCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".limitAccAsgnTblFund").val($("#fundInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").val($("#functionalAreaInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".limitAccAsgnTblFundCenter").val($("#fundCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").val($("#commItemServiceInp_Limits").val());
                    } else if (accountAssignmentCategory === 'N') {
//                        limits_AccAsgnCat_N("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".limitAccAsgnTblCostCetner").val($("#costCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(13).children(".limitAccAsgnTblNetActNumber").val($("#nActNumServiceInp_Limits").val());
                    } else if (accountAssignmentCategory === 'P') {
//                        limits_AccAsgnCat_P("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(11).children(".limitAccAsgnTblWBSElement").val($("#wBSElementInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(13).children(".limitAccAsgnTblNetActNumber").val($("#nActNumServiceInp_Limits").val());
                    } else if (accountAssignmentCategory === 'R') {
//                        limits_AccAsgnCat_R("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".limitAccAsgnTblCostCetner").val($("#costCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".limitAccAsgnTblSalesOrder").val($("#salesOrderInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(14).children(".limitAccAsgnTblItemNumber").val($("#itemNumberInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(15).children(".limitAccAsgnTblDeliverySchedule").val($("#delivSchInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".limitAccAsgnTblFund").val($("#fundInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").val($("#functionalAreaInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".limitAccAsgnTblFundCenter").val($("#fundCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").val($("#commItemServiceInp_Limits").val());
                    } else if (accountAssignmentCategory === 'X') {
//                        limits_AccAsgnCat_X("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".limitAccAsgnTblCostCetner").val($("#costCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".limitAccAsgnTblOrder").val($("#orderInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(11).children(".limitAccAsgnTblWBSElement").val($("#wBSElementInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".limitAccAsgnTblSalesOrder").val($("#salesOrderInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(14).children(".limitAccAsgnTblItemNumber").val($("#itemNumberInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(15).children(".limitAccAsgnTblDeliverySchedule").val($("#delivSchInp_Limits").val());
                    } else if (accountAssignmentCategory === 'Z') {
//                        limits_AccAsgnCat_Z("serviceTableCheckBox");
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".limitAccAsgnTblCostCetner").val($("#costCenterInp_Limits").val());
                        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".limitAccAsgnTblOrder").val($("#orderInp_Limits").val());
                    }
                }
            });
            var distributionId = $('input[type=radio][name=limitDistributionIndicator]:checked').attr('id');
            if (distributionId === "limitDistByPercentageBases") {
//                $("#limitTabAccAsgnTebleId tbody tr").children("input").prop("disabled",true);
                $("#limitTabAccAsgnTebleId input[type='text']").prop('disabled', true);
            }
        }
    });
    $("#limitBackChangedScreen").click(function() {
        $("#limitsAccAssignmentModal").modal("show");
        $("#limitsChangeAccAsgnScreenModal").modal("hide");
    });
    $("#limitNoMultiAcctAssignment").click(function() {
        var rowCount = limitTabAccAsgnTebleId.rows.length;
        for (var i = rowCount - 1; i > 1; i--) {
            limitTabAccAsgnTebleId.deleteRow(i);
        }
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".limitAccAsgnTblQuantity").val(quantityService);
        $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".limitAccAsgnTblQuantity").attr({
            "max": quantityService,
            "value": quantityService
        });
        $("#limitTabAccAsgnTebleId :input").prop("disabled", true);
    });
    $("#limitDistOnQuantBases").click(function() {
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            $("#limitTabAccAsgnTebleId :input").prop("disabled", false);
            //        var itemcatogory;
            if (insertionid === id) {
                console.log("insertionid bt:" + insertionid + " " + "id :" + id);
                var accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                if (accountAssignmentCategory === 'A') {

                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(11).children(".limitAccAsgnTblWBSElement").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'C') {
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'F') {
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'K') {
                    $("#limitTabAccAsgnTebleId tr").find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tr").find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tr").find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tr").find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tr").find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'N') {
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".limitAccAsgnTblCostCetner").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'P') {
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'R') {
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'X') {
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'Z') {
                    $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
                }
            }
        });
    });
    $("#limitTabAccAsgnTebleId").on("change", ".limitAccAsgnTblQuantity", function() {
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        var quantity = $(this).val();
        var current_tr = $(this).parent().parent();
        var accountAssignmentCategory;
        console.log("quantity :" + quantity);
        console.log("quantityService :" + quantityService);
        console.log("Max Quant :" + this.max);
        var remainingQuantity = parseFloat(this.max) - parseFloat(quantity);
        if (parseFloat(this.value) < parseFloat(this.max)) {
            $(this).attr({
                "max": quantity,
                "value": quantity
            });
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    console.log("insertionid limit:" + insertionid + " " + "id limit:" + id);
                    accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                }
            });
            var tdrow = "<tr><td>" + "<i class='fa fa-window-close deleteLimitTabAccAsgnModelTblRowClass' aria-hidden='true' style='width:22px;'>" +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblQuantity" value=' + remainingQuantity + ' max=' + remainingQuantity + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblGLAccount" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCOArea" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCostCetner" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFund" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFunctionalArea" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFundCenter" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCommitmentItem" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblOrder" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblAssets" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblWBSElement" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblSalesOrder" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblNetActNumber" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblItemNumber" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblDeliverySchedule" value="">' +
                    "</td></tr>";
            $("#limitTabAccAsgnTebleId").children("tbody").append(tdrow);
            ;
            limitTabAccAsgnTblQuantChange(current_tr, accountAssignmentCategory);
        } else {
            $(this).val(this.max);
        }
    });
    function limitTabAccAsgnTblQuantChange(current_tr, accountAssignmentCategory) {
        if (accountAssignmentCategory === 'A') {
            current_tr.next().find("td").eq(4).css("display", "none");
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
            current_tr.next().find("td").eq(11).children(".limitAccAsgnTblWBSElement").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'C') {
            current_tr.next().find("td").eq(4).css("display", "none");
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(11).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'F') {
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(11).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
            current_tr.next().find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
            current_tr.next().find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
            current_tr.next().find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
            current_tr.next().find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'K') {
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(11).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
            current_tr.next().find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
            current_tr.next().find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
            current_tr.next().find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
            current_tr.next().find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'N') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(11).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
            current_tr.next().find("td").eq(4).children(".limitAccAsgnTblCostCetner").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'P') {
            current_tr.next().find("td").eq(4).css("display", "none");
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'R') {
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(11).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
            current_tr.next().find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
            current_tr.next().find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
            current_tr.next().find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
            current_tr.next().find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'X') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        } else if (accountAssignmentCategory === 'Z') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(11).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        }
    }

    $("#limitTabAccAsgnTebleId").on("click", ".deleteLimitTabAccAsgnModelTblRowClass", function() {
        totalRowCount = 0;
        var quantity = $(this).parent().parent().find("td").eq(1).children(".limitAccAsgnTblQuantity").val();
        var prevRowquantity = $(this).parent().parent().prev().find("td").eq(1).children(".limitAccAsgnTblQuantity").val();
        var quantityAfterRowDeletion = parseFloat(quantity) + parseFloat(prevRowquantity);
//    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
//        totalRowCount++;
        //    });
        $(this).parent().parent().prev().find("td").eq(1).children(".limitAccAsgnTblQuantity").val(quantityAfterRowDeletion);
        $(this).parent().parent().prev().find("td").eq(1).children(".limitAccAsgnTblQuantity").attr({
            "max": quantityAfterRowDeletion,
            "value": quantityAfterRowDeletion
        });
        $(this).parent().parent().remove();
    });
    $("#OverallLimit").change(function() {
        var overalllimit = removeCommaInNumber($("#OverallLimit").val());
        if (overalllimit > 0) {
            $("#limitAccountAsgn").css("display", "block");
        } else {
            $("#limitAccountAsgn").css("display", "none");
        }
        $("#OverallLimit").val(formatAmountByComma(overalllimit));
    });
    $("#addRowLimitTabBtnId").click(function() {

        var OverallLimit = removeCommaInNumber($("#OverallLimit").val());
        var ExpectedValue = removeCommaInNumber($("#ExpectedValue").val());
        var NoLimit = $("#NoLimit").prop("checked");
        var row;
        row = "<tr>"
                + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteLimitTebleRow' aria-hidden='true' style='width:10px;'></i></td>"
                + "<td><input type='text' class='form-control form-rounded tableInputField limitTblContract' name='limitTblContract'></td>"
                + "<td><input type='text' class='form-control form-rounded tableInputField limitTblItemNumber' name='limitTblItemNumber'></td>"
                + "<td><input type='text' class='form-control form-rounded tableInputField limitTblOverAllLimit' value='" + OverallLimit + "' name='limitTblOverAllLimit'></td>"
                + "<td><input type='text' class='form-control form-rounded tableInputField limitTblExpctValue' value='" + ExpectedValue + "' name='limitTblExpctValue'></td>"
                + "<td><input type='checkbox' class='limitTblNoLimit' name='limitTblNoLimit'></td>"
                + "</tr>";
        $("#limitTabTableId").children("tbody").append(row);
    });
    $("#limitTabTableId").on("click", ".deleteLimitTebleRow", function() {
        $(this).parent().parent().remove();
    });
    $("#typeOfPOHeader").change(function() {
        $("#overlay").css("display", "block");
        var errorMsg = "";
        var typeOfPO = $("#typeOfPOHeader").val();
        if (typeOfPO === 'Non-Ferrous PO - Imp' || typeOfPO === 'Ferrous Joint Pur' || typeOfPO === 'Ferrous PO - Import' || typeOfPO === 'Ferrous PO - Local'
                || typeOfPO === 'Non-Ferrous PO - Loc') {
//            console.log("Bittu");
            $("#customerdata_li").css({display: "block"});
        } else {
            $("#customerdata_li").css({display: "none"});
            console.log("Bittu");
        }
        var accAsgn;
        var itemCat;
        var insertionid = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            }
        });
        if (typeOfPO === "Inter Company") {
            $("#validityFromHeaderDiv").css("display", "block");
            $("#validityToHeaderDiv").css("display", "block");
            if (accAsgn === "" && itemCat === "") {
                $("#interCompanyAccAsgn").css({display: "block"});
                $(".costCenterDiv").css({display: "none"});
            } else {
                $("#interCompanyAccAsgn").css({display: "none"});
                $(".costCenterDiv").css({display: "block"});
            }
        }
        else {
            $("#validityFromHeaderDiv").css("display", "none");
            $("#validityToHeaderDiv").css("display", "none");
        }
        var prType = $("#PrType").val();
        if (accAsgn === "U" && prType === "Service") {
            if (typeOfPO === "Release Order for Goods" || typeOfPO === "Release order for Serv") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "<b>" + typeOfPO + " </b>is not valid with<b>" + " Unknown" + "</b> category!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
//                currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").focus();
                $("#overlay").css("display", "none");
                $("#typeOfPOHeader").val("");
                return false;
            }
        }

        var companyCode = $("#companycodeHeader").val();
        var POType = $("#typeOfPOHeader").val();
        if (POType === 'Stock Transp. Order') {
            pricingprocedure = 'ZM2000';
        }
        enableValidityFromAndToDateInAdditionalDataTab(); // Added by nikhil on 17082020
        findApproverDetails();
        $("#overlay").css("display", "none");

    });

    function getAllByPricingProcedure(pricingprocedure) {
        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getConditionValuesFormulas"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                for (var i = 0; i < obj.length; i++) {
                    window['socket_' + obj[i].ALIAS] = obj[i].RULES; // var TotalFreight = 'FRA1 + FRB1 + FRC1 + ZFR1';
                }
            }
        });
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getAllByPricingProcedure",
                "pricingprocedure": pricingprocedure
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                var uom;
                var prCurrency = "";
                var insertionid = $("#ItemNumberSelect").val();
                var materialcode = "";
                var opu = "";
                var lineType = "";
                $("#material_headerClass tbody tr").each(function() {
                    var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    if (insertionid === itemDropdownId) {
                        uom = $(this).find("td").eq(7).children(".prUom").val();
                        prCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                        materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                        opu = $(this).find("td").eq(8).children(".prOrderPriceUnit").val();
                        lineType = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                    }
                });
                var CompanyCode = $("#companycodeHeader").val();

                if ($("#ItemNumberSelect").val() === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Kindly select Po Line!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    $("#ItemNumberSelect").focus();
                    return false;
                }

                $("#conditionTableIdLineLevel tbody tr").remove();
                var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
                var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].CTYPE !== undefined && obj[i].CTYPE !== "")
                    {
                        row += "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'>\n\
                                <input type='hidden' class='conditionVendor' value='" + vendorcode + "'>\n\
                                <input type='hidden' class='lineAddedFromLineLevel' value='linelevel'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionTypeLineLevel tableInputField' style='width:100px;' name='ConditionTypeLineLevel' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "' disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded nameConditionsLineLevel tableInputField' style='width:200px;' name='nameConditionsLineLevel' value='" + obj[i].NAME + "' disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded AmountLineLevel tableInputField' style='width:150px;' name='AmountLineLevel'><input type='hidden' class='AmountLineLevelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' style='width:100px;' name='CurrencyLineLevel' value=" + obj[i].CRCY + "></td>"
                                + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' style='width:150px;' name='PerQuantityLineLavel'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' value=" + uom + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' style='width:100px;' value=" + uom + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;' disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' style='width:100px;' readonly = 'true' value='" + obj[i].CURRENCY2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' disabled='true'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled='true'></td>"
//                                + "<td><input type='text' class='form-control form-rounded conditionDetailsLineLevel tableInputField' name='conditionDetailsLineLevel'></td>"
                                + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel'></td>"
                                + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' name='numeratorLineLevel' min='0' style='width:100px;'></td>"
                                + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' name='baseUoMLineLevel' style='width:100px;'></td>"
                                + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' name='denoForConvLineLevel' min='0' style='width:100px;'></td>"
                                + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' name='uOMExtraLineLevel' style='width:100px;'></td>"
                                + "<td><input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + (obj[i].KAPPL === undefined ? '' : obj[i].KAPPL) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + (obj[i].KVSL1 === undefined ? '' : obj[i].KVSL1) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + (obj[i].KVSL2 === undefined ? '' : obj[i].KVSL2) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + (obj[i].ZAEHK === undefined ? '' : obj[i].ZAEHK) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + (obj[i].STUNR === undefined ? '' : obj[i].STUNR) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='U'></td>"
                                + "</tr>";
                    }
                    else if (obj[i].CTYPE === undefined || obj[i].CTYPE === "")
                    {
                        row += "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor' value='" + vendorcode + "'><input type='hidden' class='lineAddedFromLineLevel' value='linelevel'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "' disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded nameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' value='" + obj[i].NAME + "' disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded AmountLineLevel tableInputField' readonly name='AmountLineLevel' style='width:150px;'><input type='hidden' class='AmountLineLevelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' disabled name='CurrencyLineLevel' value=" + obj[i].CRCY + "></td>"
                                + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' readonly name='PerQuantityLineLavel' style='width:150px;'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' value=" + uom + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' value=" + uom + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;' disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' readonly = 'true' value='" + obj[i].CURRENCY2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' disabled='true'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled='true'></td>"
//                                + "<td><input type='text' class='form-control form-rounded conditionDetailsLineLevel tableInputField' name='conditionDetailsLineLevel'></td>"
                                + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel' disabled></td>"
                                + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' name='numeratorLineLevel' disabled='true' min='0' style='width:100px;'></td>"
                                + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' name='baseUoMLineLevel' disabled='true' style='width:100px;'></td>"
                                + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' name='denoForConvLineLevel' min='0' disabled='true' style='width:100px;'></td>"
                                + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' name='uOMExtraLineLevel' disabled='true' style='width:100px;'></td>"
                                + "<td><input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + (obj[i].KAPPL === undefined ? '' : obj[i].KAPPL) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + (obj[i].KVSL1 === undefined ? '' : obj[i].KVSL1) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + (obj[i].KVSL2 === undefined ? '' : obj[i].KVSL2) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + (obj[i].ZAEHK === undefined ? '' : obj[i].ZAEHK) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + (obj[i].STUNR === undefined ? '' : obj[i].STUNR) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='U'></td>"
                                + "</tr>";
                    }
                }

                $("#conditionTableIdLineLevel tbody").append(row);

                var PrType = $("#PrType").val();
                if (PrType === "Material") {
                    console.log("materialcode :" + materialcode + " ,CompanyCode :" + CompanyCode);
                    var jsonArr = getMaterialMasterOnLoad(materialcode, CompanyCode);
                    if (jsonArr.length !== 0) {
                        if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                            var infoRecordJsonObj = fetchInfoRecordDetails(materialcode, "PR");
                            var convTo = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArr[0].conversionFrom : infoRecordJsonObj.CONV_NUM1;
                            var convFrom = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArr[0].conversionTo : infoRecordJsonObj.CONV_DEN1;
                            if (lineType === "EmptyLine") {
                                uom = infoRecordJsonObj.PO_UNIT === "" || infoRecordJsonObj.PO_UNIT === undefined ? uom : infoRecordJsonObj.PO_UNIT;
                            }
                            opu = infoRecordJsonObj.ORDERPR_UN === "" || infoRecordJsonObj.ORDERPR_UN === undefined ? uom : infoRecordJsonObj.ORDERPR_UN;
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                $(this).find("td").eq(13).children(".numeratorLineLevel").val(convTo);
                                $(this).find("td").eq(14).children(".baseUoMLineLevel").val(uom);
                                $(this).find("td").eq(15).children(".denoForConvLineLevel").val(convFrom);
                                $(this).find("td").eq(16).children(".uOMExtraLineLevel").val(opu);
                            });
                        }
                    }
                }
                updateConditionTableOnOPUChange(opu);
                var condLength = $("#conditionTableIdLineLevel tbody tr").length;
                var PoFrom = $("#PoFrom").val();
                if (PoFrom === "byrfq") {
                    calculationForPBXX();
                }

                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var currency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                    var contype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                    console.log("condition Currency :" + currency);
                    if (currency !== "%") {
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").val(prCurrency);
                    } else {
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").val("%");
                    }

                    if (contype === "JEXS" || contype === "NAVS" || contype === "ZNAV") {
                        $(this).find("td input").prop("disabled", true);
                        $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop('disabled', false);
                        $(this).find("td").eq(12).children(".statusLineLevel").prop('disabled', false);
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").prop('disabled', false);
                    }
                    if (contype === "NAVM") {
                        $(this).find("td").eq(3).children(".AmountLineLevel").prop("disabled", true);
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").prop("disabled", true);
                    }
                    if (currency === "%") {
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").prop("disabled", true);
                    }
                });
                var isConditionPopulateInHeader = $("#isConditionPopulateInHeader").val();
                var conditionHeaderReqFrom = $("#conditionHeaderReqFrom").val();
//                alert("isConditionPopulateInHeader :" + isConditionPopulateInHeader + " ,conditionHeaderReqFrom :" + conditionHeaderReqFrom);
                if (isConditionPopulateInHeader === "No" && conditionHeaderReqFrom === "VendorChange") {
                    addRowInConditionTableInHeader(obj, uom, prCurrency);
                    $("#conditionHeaderReqFrom").val("");
                }

                var conType;
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    conType = $(this).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").val();
                    if (conType === "NAVS" || conType === "JEXS" || conType === "ZNAV") {
                        $(this).find("td").eq(3).children("input[name=AmountLineLevel]").prop("readonly", true);
                        $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").prop("readonly", true);
                    }
                });
                /*SUNNY KUMAR PRAJAPATI CODE START*/
                if (conditionLineLevelArray.length !== 0) {
                    addTOLineConditionOnItemChange();
                    deleteRowFormCondition("");
                }
                /*SUNNY KUMAR PRAJAPATI CODE END*/
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Conditions fetched successfully!"
                });
                $("#overlay").css("display", "none");
            }
        });
    }

    var currentCondTabTr = "";
    var grossCondVal = "";
    var errorMsg = "";
    $("#conditionTableIdLineLevel").on("change", ".AmountLineLevel", function() {
        var current = $(this);
        var Quantity;
        var fromCurrency;
        var insertionid = $("#ItemNumberSelect").val();
        var netPrice;
        var current = "";
        var conType = $(this).parent().prev().prev().children(".ConditionTypeLineLevel").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
//                $(this).find("td").eq(9).children(".pr-net-price").val($(this).val(Number(amount).toFixed(2)));
                current = $(this);
            }
        });
        if (netPrice === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Kindly enter unit price!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            current.find("td").eq(12).children(".pr-net-price").focus();
            $(this).val("");
            return false;
        }
        if (conType !== "PBXX") {
            if (Number(netPrice) < Number(removeCommaInNumber($(this).val()))) {
                errorMsg = "Amount is greater then Net Value!";
                Lobibox.notify('warning', {
                    msg: errorMsg
                });
            }
        }

        grossCondVal = removeCommaInNumber($(this).parent().parent().parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueLineLevel").val());
        var amount = removeCommaInNumber($(this).val());
        console.log("amount: " + amount);
        $(this).val(formatAmountByComma(amount));
        var perQty = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").val());
        var cType = $(this).parent().prev().prev().children(".newConditionTypeLineLevel").val();
        var condValue = "";
        var totalCondVal = 0;
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        if (conType === 'PBXX') {
            $("#material_headerClass tbody tr").each(function() {
                var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === itemDropdownId) {
//                    alert("amount :" + amount);
                    $(this).find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(Number(amount).toFixed(2)));
                    $(this).find("td").eq(0).children(".prNetPriceHidden").val(Number(amount).toFixed(2));
                    calculationForPBXX();
                }
            });
        }
        var poQty = Quantity;
        var fml = formula(conType);
        var exp = new String(fml);
        var quant;
        console.log("perQty: " + perQty);
        console.log("poQty: " + poQty);
        var expAfterSplit = exp.split("/");
        if (expAfterSplit[0].trim() === "(grossCondVal" || expAfterSplit[0].trim() === "amount") {
            condValue = eval(exp.toString());
            var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
            if (toCurrency === fromCurrency || toCurrency === '%') {
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue * exchangeRate).toFixed(2)));
            }
            $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").attr("disabled", true);
            $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").val("0.00");
        } else if (expAfterSplit[0].trim() === "(amount*poQty)") {
            condValue = eval(exp.toString());
            if (toCurrency === fromCurrency || toCurrency === '%') {
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue * exchangeRate).toFixed(2)));
            }
        }
//        $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").attr("disabled", true);
        var oldAmount = $(this).parent().children(".AmountLineLevelHidden").val();
        var oldPercentage = $(this).parent().parent().find("td").eq(4).children(".PerQuantityLineLavelHidden").val();
        calculateConditionValue(amount, conType, perQty, oldAmount, oldPercentage);

        $(this).parent().children(".AmountLineLevelHidden").val(removeCommaInNumber($(this).val()));
        saveConditionTabDataOnLoadFieldChange("AmountChange");
    });

    $("#conditionTableIdLineLevel").on("change", ".PerQuantityLineLavel", function() {
        var Quantity;
        var amount = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".AmountLineLevel").val());
        var perQuant = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(perQuant));
        if (amount === "") {
            return false;
        }
        var condValue = "";
        var insertionid = $("#ItemNumberSelect").val();
        var totalCondVal = 0;
        var fromCurrency;
//        var conType = $(this).parent().prev().prev().children(".ConditionTypeLineLevel").val();
        var conType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeLineLevel").val();
        var netPrice = "";
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            }
        });
        var fml = formula(conType);
        var poQty = Quantity;
        var perQty = perQuant;
        var quant;
        var exp = new String(fml);
        condValue = eval(exp.toString());
//            $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(condValue);
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        if (toCurrency === fromCurrency || toCurrency === '%') {
            $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
        } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
            var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
            if (exchangeRate === "") {
                exchangeRate = 1;
            }
            $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue * exchangeRate).toFixed(2)));
        }
        var oldPercentage = $(this).parent().children(".PerQuantityLineLavelHidden").val();
        var oldAmount = $(this).parent().parent().find("td").eq(3).children(".AmountLineLevelHidden").val();
        calculateConditionValue(amount, conType, perQty, oldAmount, oldPercentage);
        if (conType === 'PBXX') {
            var taxCode = $("#TaxCode").val();
            var companycode = $("#companycodeHeader").val();
            var dmsip = $("#dmsip").val();
            var serviceUrl = dmsip + "/PR2POWebservice/ng/sapservice/POTaxCalc";
            console.log("serviceUrl: " + serviceUrl);
            var TaxPer = "";
//                TaxPer = getTaxResponse("");  //Localhost 
            var WebServiceCallIp = $("#WebServiceCallIp").val();
            console.log("WebServiceCallIp: " + WebServiceCallIp);
            var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
            console.log("serviceUrl: " + serviceUrl);
            $("#overlay").css("display", "block");
            $.ajax({
                type: "POST",
                url: serviceUrl,
                contentType: "application/xml",
                dataType: "xml",
                async: false,
                success: function(data, textStatus, jqXHR) {
                    console.log("Response: " + data);
                    TaxPer = getTaxResponse(data);
                    console.log("TaxPer: " + TaxPer);
                    $("#overlay").css("display", "none");
                }
            });
            $("#overlay").css("display", "none");
            var PBXX_CondVal = "";
            var NAVSCondVal = "";
            var ZNAVCondVal = "";
            var JEXSCondVal = "";
            var PBXX_Amount = "";
            var PBXX_Per = "";
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "PBXX") {
                    PBXX_CondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
                    PBXX_Amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
                    PBXX_Per = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel ").val());
                }
            });
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "NAVS") {
                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                    var fml = formula(conType);
                    var exp = new String(fml);
                    NAVSCondVal = eval(exp.toString());
                    if (toCurrency === fromCurrency || toCurrency === '%') {
                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(NAVSCondVal).toFixed(2)));
                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                    } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                        var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                        if (exchangeRate === "") {
                            exchangeRate = 1;
                        }
                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(NAVSCondVal * exchangeRate).toFixed(2)));
                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                    }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(NAVSCondVal);
                }
            });
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "ZNAV") {
                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                    var fml = formula(conType);
                    var exp = new String(fml);
                    ZNAVCondVal = eval(exp.toString());
                    if (toCurrency === fromCurrency || toCurrency === '%') {
                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(ZNAVCondVal).toFixed(2)));
                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                    } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                        var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                        if (exchangeRate === "") {
                            exchangeRate = 1;
                        }
                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(ZNAVCondVal * exchangeRate).toFixed(2)));
                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                    }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(ZNAVCondVal);
                }
            });
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "JEXS") {
                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                    var fml = formula(conType);
                    var exp = new String(fml);
                    JEXSCondVal = eval(exp.toString());
                    if (toCurrency === fromCurrency || toCurrency === '%') {
                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(JEXSCondVal).toFixed(2)));
                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                    } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                        var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                        if (exchangeRate === "") {
                            exchangeRate = 1;
                        }
                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(JEXSCondVal * exchangeRate).toFixed(2)));
                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                    }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(JEXSCondVal);
                }
            });
        }
//        }
        $(this).parent().children(".PerQuantityLineLavelHidden").val(removeCommaInNumber($(this).val()));
        saveConditionTabDataOnLoadFieldChange("PercentageChange");
    });
    
    var TotalInsuranceCondVal = "";
    $("#conditionTableIdLineLevel").on("change", ".newAmountLineLevel", function() {
        var grossCondVal = removeCommaInNumber($(this).parent().parent().parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueLineLevel").val());
        var Quantity = "";
        var amount = removeCommaInNumber($(this).val());
        console.log("New Amount: " + amount);
        $(this).val(formatAmountByComma(amount));
        var perQty = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").val());
        var insertionid = $("#ItemNumberSelect").val();
        var cType = $(this).parent().prev().prev().children(".newConditionTypeLineLevel").val();
        var condValue = "";
        var totalCondVal = 0;
        var fromCurrency;
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        var netPrice = "";
        var current = "";
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
                current = $(this);
            }
        });
        if (netPrice === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Kindly enter unit price!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            current.find("td").eq(12).children(".pr-net-price").focus();
            $(this).val("");
            return false;
        }
        if (conType !== "PBXX") {
            if (Number(netPrice) < Number(removeCommaInNumber($(this).val()))) {
                errorMsg = "Amount is greater then Net Value!";
                Lobibox.notify('warning', {
                    msg: errorMsg
                });
            }
        }
        $(this).css("border-color", "");
        var quant;
        var poQty = Quantity;
        var fml = formula(cType);
        var exp = new String(fml);
        var expAfterSplit = exp.split("/");
//        if (expAfterSplit[0] === "(amount*poQty)") {
//            return false;
//        }
        condValue = eval(exp.toString());
        if (expAfterSplit[0].trim() === "(grossCondVal" || expAfterSplit[0].trim() === "amount") {
            if (toCurrency === fromCurrency || toCurrency === '%') {
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue * exchangeRate).toFixed(2)));
            }
            $(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").attr("disabled", true);
            $(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").val("0.00");
        } else if (expAfterSplit[0].trim() === "(amount*poQty)") {
//            $(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").attr("disabled", true);
//        }
            if (toCurrency === fromCurrency || toCurrency === '%') {
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue * exchangeRate).toFixed(2)));
            }
        }

        var oldAmount = $(this).parent().children(".AmountLineLevelHidden").val();
        var oldPercentage = $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
        calculateConditionValue(amount, cType, perQty, oldAmount, oldPercentage);
        $(this).parent().children(".AmountLineLevelHidden").val(removeCommaInNumber($(this).val()));
        saveConditionTabDataOnLoadFieldChange("AmountChange");
    });
    
    $("#conditionTableIdLineLevel").on("change", ".newPerQuantityLineLavel", function() {
        var Quantity;
        var amount = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".newAmountLineLevel").val());
        var perQuant = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(perQuant));
        var condValue = "";
        var insertionid = $("#ItemNumberSelect").val();
        var totalCondVal = 0;
        var fromCurrency;
        var netPrice = "";
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            }
        });
        var conType = $(this).parent().parent().find("td").eq(1).children(".newConditionTypeLineLevel").val();
        var fml = formula(conType);
        var poQty = Quantity;
        var perQty = perQuant;
        var quant;
        var exp = new String(fml);
        condValue = eval(exp.toString());
        console.log("Condition val :" + eval(exp.toString()));
//        }
        if (toCurrency === fromCurrency || toCurrency === '%') {
            $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
        } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
            var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
            if (exchangeRate === "") {
                exchangeRate = 1;
            }
            $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue * exchangeRate).toFixed(2)));
        }
//        $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(condValue);
        var oldPercentage = $(this).parent().children(".PerQuantityLineLavelHidden").val();
        var oldAmount = $(this).parent().parent().find("td").eq(3).children(".AmountLineLevelHidden").val();
        calculateConditionValue(amount, conType, perQty, oldAmount, oldPercentage);
        
        $(this).parent().children(".PerQuantityLineLavelHidden").val(removeCommaInNumber($(this).val()));
        saveConditionTabDataOnLoadFieldChange("PercentageChange");
    });
    
    function calculateConditionValue(conAmount, conType, perQty, oldAmount, oldPercentage) {

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
        var amount;
        var perQty;
        var insertionid = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                poQty = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function(i) {
            var condtype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            if (condtype === 'PBXX') {
                PBXX = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()));
                if (PBXX === "" || isNaN(PBXX)) {
                    PBXX = 0;
                }
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
            if (condtype === 'ZBIN') {
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
            if (condtype === 'ZBIN') {
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
        var expGrossPriceInclDiscount = new String(GrossPriceInclDiscount);
        var GrossPriceInclDiscountCondValue = eval(expGrossPriceInclDiscount.toString());
        ;
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
        var conPerQty;
        var totalFreightArr = (expTotalFreight.toString()).split('+');
        for (var i = 0; i < totalFreightArr.length; i++) {
            if (totalFreightArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Total Freight") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        var expTotalFreightCommArr = (expTotalFreightComm.toString()).split('+');
        for (var i = 0; i < expTotalFreightCommArr.length; i++) {
            if (expTotalFreightCommArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Total Freight & commisioning") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }

        var expNetPriceArr = (expNetPrice.toString()).split('+');
        for (var i = 0; i < expNetPriceArr.length; i++) {
            if (expNetPriceArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Net Price") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }

                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }

//        var expGrossPriceInclDiscountArr = (expGrossPriceInclDiscount.toString()).split('+');
//        for (var i = 0; i < expGrossPriceInclDiscountArr.length; i++) {
//            if (expGrossPriceInclDiscountArr[i].trim() === conType.trim()) {
//                $("#conditionTableIdLineLevel tbody tr").each(function() {
//                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
//                    amount = $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val();
//                    conPerQty = $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val();
//                    if (conName === "Gross Price Incl Discount") {
//                        $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val((Number(amount) + Number(conAmount)).toFixed(2));
//                        $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
//                    }
//                });
//            }
//        }


        var expCostFreightCFRArr = (expCostFreightCFR.toString()).split('+');
        for (var i = 0; i < expCostFreightCFRArr.length; i++) {
            if (expCostFreightCFRArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Cost & Freight(CFR)") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        var expTotalInsuranceArr = (expTotalInsurance.toString()).split('+');
        for (var i = 0; i < expTotalInsuranceArr.length; i++) {
            if (expTotalInsuranceArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Total Insurance") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        var expInsuranceFreightArr = (expInsuranceFreight.toString()).split('+');
        for (var i = 0; i < expInsuranceFreightArr.length; i++) {
            if (expInsuranceFreightArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Insurance and Freight") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        var expCostInsuranceFreightCIFArr = (expCostInsuranceFreightCIF.toString()).split('+');
        for (var i = 0; i < expCostInsuranceFreightCIFArr.length; i++) {
            if (expCostInsuranceFreightCIFArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Cost Insurance & Freight (CIF)") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        var expCIFWithGSTArr = (expCIFWithGST.toString()).split('+');
        for (var i = 0; i < expCIFWithGSTArr.length; i++) {
            if (expCIFWithGSTArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "CIF With GST") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        var expZBordercrossingvalueArr = (expZBordercrossingvalue.toString()).split('+');
        for (var i = 0; i < expZBordercrossingvalueArr.length; i++) {
            if (expZBordercrossingvalueArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "@3Z@Border crossing value") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        var expPriceInclofdiscSurchargeArr = (expPriceInclofdiscSurcharge.toString()).split('+');
        for (var i = 0; i < expPriceInclofdiscSurchargeArr.length; i++) {
            if (expPriceInclofdiscSurchargeArr[i].trim() === conType.trim()) {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    if (conName === "Price Incl of disc/Surcharge") {
                        if (isNaN(conPerQty)) {
                            conPerQty = 0;
                        }
                        if (perQty === undefined) {
                            perQty = 0;
                        }
                        if (oldAmount === undefined || oldAmount === "") {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                        }
                        if (oldPercentage === undefined || oldPercentage === "") {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                        } else {
                            $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
                        }
                    }
                });
            }
        }
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Total Freight") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(TotalFreightCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Total Freight & commisioning") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(TotalFreightCommCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Net Price") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(NetPriceCondValue).toFixed(2)));
            }
        });
//        $("#conditionTableIdLineLevel tbody tr").each(function() {
//            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
//            if (conName === "Gross Price Incl Discount") {
//                $(this).find("td").eq(8).children(".ConditionValueLineLevel ").val(Number(GrossPriceInclDiscountCondValue).toFixed(2));
//            }
//        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Cost & Freight(CFR)") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(CostFreightCFRCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Total Insurance") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(TotalInsuranceCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Insurance and Freight") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(InsuranceFreightCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Cost Insurance & Freight (CIF)") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(CostInsuranceFreightCIFCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "CIF With GST") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(CIFWithGSTCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "@3Z@Border crossing value") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(ZBordercrossingvalueCondValue).toFixed(2)));
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            if (conName === "Price Incl of disc/Surcharge") {
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(PriceInclofdiscSurchargeCondValue).toFixed(2)));
            }
        });
    }
    function formula(Cnty) {

        var fml = "";
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getFurmulaByConType",
                "Cnty": Cnty
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Formula :" + obj.FORMULA);
                fml = obj.FORMULA;
            }
        });
        return fml;
    }

    $("#TaxCode").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var regNo = $("#regNoHidden").val();
            var companyCode = $("#companycodeHeader").val();
            getTaxCode(regNo, companyCode);
        }
    });
    
    $("#TaxCodeTableId").on("click", ".checkTaxCodeTableClass", function() {
        var taxCode = $(this).parent().parent().find("td").eq(1).text();
        var taxCodeDesc = $(this).parent().parent().find("td").eq(2).text();
        var TexCodeForLine = $("#TexCodeForLine").val();
        if (TexCodeForLine === "") {
            $("#TexCodeForLine").val(taxCode);
        }
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                $(this).find("td").eq(0).children(".TexCodeForLineInPr").val(taxCode);
            }
        });
        $("#TaxCode").val(taxCode);
        $("#TaxCode").css("border-color", "");
        $("#TaxCodeModal").modal("hide");
        $("#overlay").css("display", "block");
        setTimeout(
                function() {
                    var fromCurrency = "";
                    var insertionid = $("#ItemNumberSelect").val();
                    $("#material_headerClass tbody tr").each(function() {
                        var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        if (insertionid === itemDropdownId) {
                            fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                        }
                    });
                    var conType = "";
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                        if (conType === 'PBXX') {
                            var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                            var amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
                            var companycode = $("#companycodeHeader").val();
                            var dmsip = $("#dmsip").val();
                            var serviceUrl = dmsip + "/PR2POWebservice/ng/sapservice/POTaxCalc";
                            console.log("serviceUrl: " + serviceUrl);
                            var TaxPer = "";
//                TaxPer = getTaxResponse("");  //Localhost 

                            var WebServiceCallIp = $("#WebServiceCallIp").val();
                            console.log("WebServiceCallIp: " + WebServiceCallIp);
                            var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
                            console.log("serviceUrl: " + serviceUrl);
//                $("#overlay").css("display", "block");
                            $.ajax({
                                type: "POST",
                                url: serviceUrl,
                                contentType: "application/xml",
                                dataType: "xml",
                                async: false,
                                success: function(data, textStatus, jqXHR) {
                                    console.log("Response: " + data);
                                    TaxPer = getTaxResponse(data);
                                    console.log("TaxPer: " + TaxPer);
//                        $("#overlay").css("display", "none");
                                }
                            });
//                $("#overlay").css("display", "none");
                            var PBXX_CondVal = "";
                            var NAVSCondVal = "";
                            var ZNAVCondVal = "";
                            var JEXSCondVal = "";
                            var PBXX_Amount = "";
                            var PBXX_Per = "";
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "PBXX") {
                                    PBXX_CondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
                                    PBXX_Amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
                                    PBXX_Per = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel ").val());
                                }
                            });
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "NAVS") {
                                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                                    var fml = formula(conType);
                                    var exp = new String(fml);
                                    NAVSCondVal = eval(exp.toString());
                                    console.log("exp :" + exp + "PBXX_CondVal :" + PBXX_CondVal + "TaxPer :" + TaxPer);
                                    if (toCurrency === fromCurrency || toCurrency === '%') {
                                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(NAVSCondVal).toFixed(2)));
                                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                                    } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                                        var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                                        if (exchangeRate === "") {
                                            exchangeRate = 1;
                                        }
                                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(NAVSCondVal * exchangeRate).toFixed(2)));
                                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                                    }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(NAVSCondVal);
                                }
                            });
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "ZNAV") {
                                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                                    var fml = formula(conType);
                                    var exp = new String(fml);
                                    ZNAVCondVal = eval(exp.toString());
                                    if (toCurrency === fromCurrency || toCurrency === '%') {
                                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(ZNAVCondVal).toFixed(2)));
                                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                                    } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                                        var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                                        if (exchangeRate === "") {
                                            exchangeRate = 1;
                                        }
                                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(ZNAVCondVal * exchangeRate).toFixed(2)));
                                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                                    }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(ZNAVCondVal);
                                }
                            });
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "JEXS") {
                                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                                    var fml = formula(conType);
                                    var exp = new String(fml);
                                    JEXSCondVal = eval(exp.toString());
                                    if (toCurrency === fromCurrency || toCurrency === '%') {
                                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(JEXSCondVal).toFixed(2)));
                                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                                    } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                                        var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                                        if (exchangeRate === "") {
                                            exchangeRate = 1;
                                        }
                                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(JEXSCondVal * exchangeRate).toFixed(2)));
                                        $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(PBXX_Amount).toFixed(2)));
                                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(PBXX_Per).toFixed(2)));
                                    }
//                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(JEXSCondVal);
                                }
                            });
                        }
                    });
                    /*Code By BITTU 07 June 2020*/
                    var totalAmount_ZBordercrossingvalue = 0;
                    var totalPer_ZBordercrossingvalue = 0;
                    var totalConVal_ZBordercrossingvalue = 0;
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
//                        var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val()
                        if (conType === "NAVS" || conType === "NAVM" || conType === "PBXX") {
                            var amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                            var perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                            var conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                            totalAmount_ZBordercrossingvalue = Number(totalAmount_ZBordercrossingvalue) + Number(amount);
                            totalPer_ZBordercrossingvalue = Number(totalPer_ZBordercrossingvalue) + Number(perQty);
                            totalConVal_ZBordercrossingvalue = Number(totalConVal_ZBordercrossingvalue) + Number(conValue);
                        }
                    });
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                        if (cname === "@3Z@Border crossing value") {
                            console.log("totalAmount_ZBordercrossingvalue :" + totalAmount_ZBordercrossingvalue);
                            console.log("totalPer_ZBordercrossingvalue :" + totalPer_ZBordercrossingvalue);
                            console.log("totalConVal_ZBordercrossingvalue :" + totalConVal_ZBordercrossingvalue);
                            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_ZBordercrossingvalue).toFixed(2)));
                            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_ZBordercrossingvalue).toFixed(2)));
                            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_ZBordercrossingvalue).toFixed(2)));
                        }
                    });
//                    $("#overlay").css("display", "none");
                    saveConditionTabDataOnLoadFieldChange("TaxCodeTable");
                    saveInvoiceTabDataOnLoadFieldChange("OnChange");
                    findApproverDetails();
                }, 1000);
    });
//    var amountArr = [];
//    var perArr = [];
//    var canValArr = [];
    $("#conditionDetailsAddRowBtn").click(function() {
        $("#overlay").css("display", "block");
        var itemCode = $("#ItemNumberSelect").val();
        var codtnTblValue = "";
        var conditionTableRow = "";
        var conType = "";
        var name = "";
        var amount = "";
        var perQuant = "";
        var pRItemNumber = "";
        $("#conditionTableIdLineLevel tbody tr").each(function(i) {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if ($(this).find("td").eq(2).children("input").hasClass("nameConditionsLineLevel") === true) {
                name = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            } else if ($(this).find("td").eq(2).children("input").hasClass("NameConditionsLineLevel") === true) {
                name = $(this).find("td").eq(2).children(".NameConditionsLineLevel").val();
            }
            if ($(this).find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
            } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountLineLevel").val());
            }
            if ($(this).find("td").eq(5).children("input").hasClass("PerQuantityLineLavel") === true) {
                perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel").val());
            } else if ($(this).find("td").eq(5).children("input").hasClass("newPerQuantityLineLavel") === true) {
                perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".newPerQuantityLineLavel").val());
            }
            var conPrUnit = $(this).find("td").eq(6).children(".ConditionPricingUnitLineLevel").val();
            var curr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
            var uOM = $(this).find("td").eq(7).children(".UoMLineLevel").val();
            var conVal1 = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
            var curr2 = $(this).find("td").eq(9).children(".Currency2LineLevel").val();
            var conVal2 = $(this).find("td").eq(10).children(".ConditionValue2LineLevel").val();
            var conCurr = $(this).find("td").eq(11).children(".ConditionCurrencyLineLevel").val();
//            var conDetails = $(this).find("td").eq(12).children(".conditionDetailsLineLevel ").val();

            var stNumber = $(this).find("td").eq(17).children(".conditionSTUNR").val();
            var condCount = $(this).find("td").eq(17).children(".conditionZAEHK").val();
            var KAPPL = $(this).find("td").eq(17).children(".conditionKAPPL").val();
            var KVSL1 = $(this).find("td").eq(17).children(".conditionKVSL1").val();
            var KVSL2 = $(this).find("td").eq(17).children(".conditionKVSL2").val();
            var condChangeId = $(this).find("td").eq(17).children(".conditionChangeId ").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var linkid;
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                }
            });
            amountArr.push(amount);
            perArr.push(perQuant);
            canValArr.push(conVal1);
            conditionTableRow = conType + ',' + name + ',' + amount + ',' + perQuant + ',' + conPrUnit + ',' + curr1 + ',' + uOM + ',' + conVal1
                    + ',' + curr2 + ',' + conVal2 + ',' + conCurr + ',' + itemCode + ',' + pRItemNumber + ',' + linkid
                    + ',' + stNumber + ',' + condCount + ',' + KAPPL + ',' + KVSL1 + ',' + KVSL2 + ',' + condChangeId;
            codtnTblValue = codtnTblValue + conditionTableRow + "#";
        });
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveConditionsTabData",
                "codtnTblValueRowString": codtnTblValue
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data  saved successfully"
                });
            }
        });
        getMasterConditionLineLevelByLineItemNumber(itemCode);
    });

    function getMasterConditionLineLevelByLineItemNumber(itemCode) {

        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getMasterConditionLineLevelByLineItemNumber",
                "itemCode": itemCode
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                for (var i = 0; i < obj.length; i++) {
                    console.log("CONDITION_TYPE :" + obj[i].CONDITION_TYPE);
                    console.log("NAME :" + obj[i].NAME);
                }
                console.log("Obj length :" + obj.length);
                var row = "";
//                $("#conditionTableId tbody tr").remove();
                var rowCount = $('#conditionTableId tr').length;
                if (rowCount === 1) {

                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor'><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex' value='" + (obj[i].conditionIndex === undefined ? '' : obj[i].conditionIndex) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (obj[i].CONDITION_TYPE === undefined ? '' : obj[i].CONDITION_TYPE) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (obj[i].NAME === undefined ? '' : obj[i].NAME) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' style='width: 150px;' value='" + (obj[i].AMOUNT === undefined ? '' : formatAmountByComma(obj[i].AMOUNT)) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (obj[i].CURRENCY1 === undefined ? '' : obj[i].CURRENCY1) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width: 150px;' value='" + (obj[i].PER === undefined ? '' : formatAmountByComma(obj[i].PER)) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value='" + (obj[i].CONDITION_PRICING_UNIT === undefined ? '' : obj[i].CONDITION_PRICING_UNIT) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (obj[i].UOM === undefined ? '' : obj[i].UOM) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' value='" + (obj[i].CONDITION_VALUE1 === undefined ? '' : formatAmountByComma(obj[i].CONDITION_VALUE1)) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (obj[i].CURRENCY2 === undefined ? '' : obj[i].CURRENCY2) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (obj[i].CONDITION_VALUE2 === undefined ? '' : obj[i].CONDITION_VALUE2) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (obj[i].CONDITION_CURRENCY === undefined ? '' : obj[i].CONDITION_CURRENCY) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (obj[i].KAPPL === undefined ? '' : obj[i].KAPPL) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (obj[i].KVSL1 === undefined ? '' : obj[i].KVSL1) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (obj[i].KVSL2 === undefined ? '' : obj[i].KVSL2) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (obj[i].ZAEHK === undefined ? '' : obj[i].ZAEHK) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (obj[i].STUNR === undefined ? '' : obj[i].STUNR) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (obj[i].CHANGEID === undefined ? '' : obj[i].CHANGEID) + "'></td>"
//                                + "<td><input type='text' class='form-control form-rounded statusHeader tableInputField' name='statusHeader' style='width:100px;' disabled></td>"
//                                + "<td><input type='text' class='form-control form-rounded numeratorHeader tableInputField' name='numeratorHeader' style='width:100px;' disabled></td>"
//                                + "<td><input type='text' class='form-control form-rounded baseUoMHeader tableInputField' name='baseUoMHeader' style='width:100px;' disabled></td>"
//                                + "<td><input type='text' class='form-control form-rounded denoForConvHeader tableInputField' name='denoForConvHeader' style='width:100px;' disabled></td>"
//                                + "<td><input type='text' class='form-control form-rounded uOMExtraHeader tableInputField' name='uOMExtraHeader' style='width:100px;' disabled></td>"
                                + "<td></td>"
                                + "</tr>";
                    }

                    $("#conditionTableId tbody").append(row);
                } else {
                    $("#conditionTableId tbody tr").each(function(i) {
                        var amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
                        var per = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityHeader").val());
                        var condVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
                        if (amount !== 0 && obj[i].AMOUNT !== '') {
                            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(obj[i].AMOUNT) + parseInt(amount)));
                        } else {
                            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(obj[i].AMOUNT)));
                        }
                        if (per !== 0 && obj[i].PER !== '') {
                            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(obj[i].PER) + parseInt(per)));
                        } else {
                            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(obj[i].PER)));
                        }
                        if (condVal !== 0 && canValArr[i] !== '') {
                            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(obj[i].CONDITION_VALUE1) + parseInt(condVal)));
                        } else {
                            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(obj[i].CONDITION_VALUE1)));
                        }
                    });
                }
            }
        });
    }

    var businessAreaTable = null;
    $("#BusinessArea").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#BusinessAreaModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllBusinessArea",
                    "companyCode": $("#companycodeHeader").val()
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkbusinessAreaTableClass'></td>"
                                + "<td>" + obj[i].BUSINESSAREA + "</td>"
                                + "<td>" + obj[i].DESCRIPTION + "</td>"
                                + "</tr>";
                    }
                    $("#BusinessAreaTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#BusinessAreaTableId')) {
                        businessAreaTable.destroy();
                        businessAreaTable = null;
                        $("#BusinessAreaTableId").children('tbody').html(row);
                        businessAreaTable = $('table.BusinessAreaTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        businessAreaTable.buttons().container()
                                .appendTo('#BusinessAreaTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#BusinessAreaTableId thead tr').clone(true).appendTo('#BusinessAreaTableId thead');
                        $('#BusinessAreaTableId thead tr:eq(1) th').each(function(i) {
                            $('#BusinessAreaTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (businessAreaTable.column(i).search() !== this.value) {
                                    businessAreaTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        businessAreaTable = $('table.BusinessAreaTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        businessAreaTable.buttons().container()
                                .appendTo('#BusinessAreaTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#BusinessAreaTableId").on("click", ".checkbusinessAreaTableClass", function() {

        var businessArea = $(this).parent().parent().find("td").eq(1).text();
        $('#BusinessArea').val(businessArea);
        $("#BusinessAreaModal").modal("hide");
    });
    var salesOrgTable = null;
    $("#SalesOrganization").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrgModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllSalesOrg",
                    "companyCode": $("#companycodeHeader").val()
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkSalesOrgTableClass'></td>"
                                + "<td>" + obj[i].CODE + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#SalesOrgTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#SalesOrgTableId')) {
                        salesOrgTable.destroy();
                        salesOrgTable = null;
                        $("#SalesOrgTableId").children('tbody').html(row);
                        salesOrgTable = $('table.SalesOrgTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        salesOrgTable.buttons().container()
                                .appendTo('#SalesOrgTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#SalesOrgTableId thead tr').clone(true).appendTo('#SalesOrgTableId thead');
                        $('#SalesOrgTableId thead tr:eq(1) th').each(function(i) {
                            $('#SalesOrgTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (salesOrgTable.column(i).search() !== this.value) {
                                    salesOrgTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        salesOrgTable = $('table.SalesOrgTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        salesOrgTable.buttons().container()
                                .appendTo('#SalesOrgTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#SalesOrgTableId").on("click", ".checkSalesOrgTableClass", function() {
        var code = $(this).parent().parent().find('td').eq(1).text();
        $("#SalesOrganization").val(code);
        $("#SalesOrgModal").modal("hide");
    });
    var distChannelTable = null;
    $('#DistrChannel').keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#DistrChannelModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllDistChannel",
                    "companyCode": $("#companycodeHeader").val()
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkSalesOrgTableClass'></td>"
                                + "<td>" + obj[i].CHANNEL + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#DistrChannelTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#DistrChannelTableId')) {
                        distChannelTable.destroy();
                        distChannelTable = null;
                        $("#DistrChannelTableId").children('tbody').html(row);
                        distChannelTable = $('table.DistrChannelTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        distChannelTable.buttons().container()
                                .appendTo('#DistrChannelTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#DistrChannelTableId thead tr').clone(true).appendTo('#DistrChannelTableId thead');
                        $('#DistrChannelTableId thead tr:eq(1) th').each(function(i) {
                            $('#DistrChannelTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (distChannelTable.column(i).search() !== this.value) {
                                    distChannelTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        distChannelTable = $('table.DistrChannelTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        distChannelTable.buttons().container()
                                .appendTo('#DistrChannelTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#DistrChannelTableId").on("click", ".checkSalesOrgTableClass", function() {
        var channel = $(this).parent().parent().find('td').eq(1).text();
        $("#DistrChannel").val(channel);
        $("#DistrChannelModal").modal("hide");
    });
//    $("#Division").click(function() {
//        $("#DividionModal").modal("show");
//    });
    $('#WBSElement').keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
    //        $("#ro_WBSElement").val("FromInputField");
            $("#ro_WBSElement").val("ProfitabilitySegment");
        }
    });
//    $("#CostObject").click(function() {
//        $("#CostObjectModal").modal("show");
//    });

    var profitCenterTable = null;
    $("#ProfitCentre").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ProfitCenterModal").modal("show");
            $("#ro_ProfitCenter").val("ProfitCenter");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllProfitCenter"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkProfitCenterTableClass'></td>"
                                + "<td>" + obj[i].PROFIT + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#ProfitCenterTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ProfitCenterTableId')) {
                        profitCenterTable.destroy();
                        profitCenterTable = null;
                        $("#ProfitCenterTableId").children('tbody').html(row);
                        profitCenterTable = $('table.ProfitCenterTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        profitCenterTable.buttons().container()
                                .appendTo('#ProfitCenterTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ProfitCenterTableId thead tr').clone(true).appendTo('#ProfitCenterTableId thead');
                        $('#ProfitCenterTableId thead tr:eq(1) th').each(function(i) {
                            $('#ProfitCenterTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (profitCenterTable.column(i).search() !== this.value) {
                                    profitCenterTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        profitCenterTable = $('table.ProfitCenterTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        profitCenterTable.buttons().container()
                                .appendTo('#ProfitCenterTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ProfitCenterTableId").on("click", ".checkProfitCenterTableClass", function() {
        var profit = $(this).parent().parent().find('td').eq(1).text();
        $("#ProfitCentre").val(profit);
        $("#ProfitCenterModal").modal("hide");
        $("#ProfitCentre").css("border-color", "");
    });
    var partnerPCTable = null;
    $("#PartnerPC").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#PartnerPCModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllProfitCenter"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkPartnerPCTableClass'></td>"
                                + "<td>" + obj[i].PROFIT + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#PartnerPCTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#PartnerPCTableId')) {
                        partnerPCTable.destroy();
                        partnerPCTable = null;
                        $("#PartnerPCTableId").children('tbody').html(row);
                        partnerPCTable = $('table.PartnerPCTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        partnerPCTable.buttons().container()
                                .appendTo('#PartnerPCTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#PartnerPCTableId thead tr').clone(true).appendTo('#PartnerPCTableId thead');
                        $('#PartnerPCTableId thead tr:eq(1) th').each(function(i) {
                            $('#PartnerPCTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (partnerPCTable.column(i).search() !== this.value) {
                                    partnerPCTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        partnerPCTable = $('table.PartnerPCTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        partnerPCTable.buttons().container()
                                .appendTo('#PartnerPCTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#PartnerPCTableId").on("click", ".checkPartnerPCTableClass", function() {
        var partner = $(this).parent().parent().find('td').eq(1).text();
        $("#PartnerPC").val(partner);
        $("#PartnerPCModal").modal("hide");
        $("#PartnerPC").css("border-color", "");
    });
    var countryTable = null;
    $("#countryProfitabilitySegment").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CountryModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllMasterCountry"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkCountryTableClass'></td>"
                                + "<td>" + obj[i].CODE + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#CountryTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#CountryTableId')) {
                        countryTable.destroy();
                        countryTable = null;
                        $("#CountryTableId").children('tbody').html(row);
                        countryTable = $('table.CountryTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        countryTable.buttons().container()
                                .appendTo('#CountryTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#CountryTableId thead tr').clone(true).appendTo('#CountryTableId thead');
                        $('#CountryTableId thead tr:eq(1) th').each(function(i) {
                            $('#CountryTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (countryTable.column(i).search() !== this.value) {
                                    countryTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        countryTable = $('table.CountryTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        countryTable.buttons().container()
                                .appendTo('#CountryTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#CountryTableId").on("click", ".checkCountryTableClass", function() {
        var code = $(this).parent().parent().find('td').eq(1).text();
//    var name = $(this).parent().parent().find('td').eq(2).text();
        $("#countryProfitabilitySegment").val(code);
        $("#CountryModal").modal("hide");
    });
    var salesOfficeTable = null;
    $("#SalesOffice").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOfficeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllSalesOffice",
                    "companyCode": $("#companycodeHeader").val()
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkSalesOfficeTableClass'></td>"
                                + "<td>" + obj[i].SALESOFFICE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#SalesOfficeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#SalesOfficeTableId')) {
                        salesOfficeTable.destroy();
                        salesOfficeTable = null;
                        $("#SalesOfficeTableId").children('tbody').html(row);
                        salesOfficeTable = $('table.SalesOfficeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        salesOfficeTable.buttons().container()
                                .appendTo('#SalesOfficeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#SalesOfficeTableId thead tr').clone(true).appendTo('#SalesOfficeTableId thead');
                        $('#SalesOfficeTableId thead tr:eq(1) th').each(function(i) {
                            $('#SalesOfficeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (salesOfficeTable.column(i).search() !== this.value) {
                                    salesOfficeTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        salesOfficeTable = $('table.SalesOfficeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        salesOfficeTable.buttons().container()
                                .appendTo('#SalesOfficeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#SalesOfficeTableId").on("click", ".checkSalesOfficeTableClass", function() {
        var sales = $(this).parent().parent().find('td').eq(1).text();
        $("#SalesOffice").val(sales);
        $("#SalesOfficeModal").modal("hide");
    });
    var matlGroupTable = null;
    $('#MatlGroup').keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#MatlGroupModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllMaterialGroup"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkMaterialGroupTableClass'></td>"
                                + "<td>" + obj[i].CODE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#MatlGroupTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#MatlGroupTableId')) {
                        matlGroupTable.destroy();
                        matlGroupTable = null;
                        $("#MatlGroupTableId").children('tbody').html(row);
                        matlGroupTable = $('table.MatlGroupTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        matlGroupTable.buttons().container()
                                .appendTo('#MatlGroupTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#MatlGroupTableId thead tr').clone(true).appendTo('#MatlGroupTableId thead');
                        $('#MatlGroupTableId thead tr:eq(1) th').each(function(i) {
                            $('#MatlGroupTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (matlGroupTable.column(i).search() !== this.value) {
                                    matlGroupTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        matlGroupTable = $('table.MatlGroupTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        matlGroupTable.buttons().container()
                                .appendTo('#MatlGroupTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#MatlGroupTableId").on("click", ".checkMaterialGroupTableClass", function() {
        var group = $(this).parent().parent().find('td').eq(1).text();
        $("#MatlGroup").val(group);
        $("#MatlGroupModal").modal("hide");
    });
    $("#ItemCategory").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#itemCategoryModal").modal("show");
            getAllItemCategory();
            $("#ro_ItemCategory").val("ProfitabilitySegment");
        }
    });
    var itemCategoryTable = null;
    function getAllItemCategory() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllItemCategory"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='itemCategoryCheckboxClass'></td>"
                            + "<td>" + obj[i].ITEMM_CATEGORY + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }
                $("#itemCategoryTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#itemCategoryTableId')) {
                    itemCategoryTable.destroy();
                    itemCategoryTable = null;
                    $("#itemCategoryTableId").children('tbody').html(row);
                    itemCategoryTable = $('table.itemCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCategoryTable.buttons().container()
                            .appendTo('#itemCategoryTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#itemCategoryTableId thead tr').clone(true).appendTo('#itemCategoryTableId thead');
                    $('#itemCategoryTableId thead tr:eq(1) th').each(function(i) {
                        $('#itemCategoryTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (itemCategoryTable.column(i).search() !== this.value) {
                                itemCategoryTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    itemCategoryTable = $('table.itemCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCategoryTable.buttons().container()
                            .appendTo('#itemCategoryTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    var customerGroupTable = null;
    $("#CustomerGroup").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CustomerGroupModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllCustomerGroup"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkCustomerGroupTableClass'></td>"
                                + "<td>" + obj[i].GROUP + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#CustomerGroupTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#CustomerGroupTableId')) {
                        customerGroupTable.destroy();
                        customerGroupTable = null;
                        $("#CustomerGroupTableId").children('tbody').html(row);
                        customerGroupTable = $('table.CustomerGroupTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        customerGroupTable.buttons().container()
                                .appendTo('#CustomerGroupTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#CustomerGroupTableId thead tr').clone(true).appendTo('#CustomerGroupTableId thead');
                        $('#CustomerGroupTableId thead tr:eq(1) th').each(function(i) {
                            $('#CustomerGroupTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (customerGroupTable.column(i).search() !== this.value) {
                                    customerGroupTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        customerGroupTable = $('table.CustomerGroupTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        customerGroupTable.buttons().container()
                                .appendTo('#CustomerGroupTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#CustomerGroupTableId").on("click", ".checkCustomerGroupTableClass", function() {
        var group = $(this).parent().parent().find('td').eq(1).text();
        $("#CustomerGroup").val(group);
        $("#CustomerGroupModal").modal("hide");
    });
    var prodHirLev1Table = null;
    $("#ProductHierLevel1").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ProdHierLev1Modal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllProdHierLev1"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkProdHirLev1TableClass'></td>"
                                + "<td>" + obj[i].PROD_HIER + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#ProdHierLev1TableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ProdHierLev1TableId')) {
                        prodHirLev1Table.destroy();
                        prodHirLev1Table = null;
                        $("#ProdHierLev1TableId").children('tbody').html(row);
                        prodHirLev1Table = $('table.ProdHierLev1TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirLev1Table.buttons().container()
                                .appendTo('#ProdHierLev1TableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ProdHierLev1TableId thead tr').clone(true).appendTo('#ProdHierLev1TableId thead');
                        $('#ProdHierLev1TableId thead tr:eq(1) th').each(function(i) {
                            $('#ProdHierLev1TableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (prodHirLev1Table.column(i).search() !== this.value) {
                                    prodHirLev1Table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        prodHirLev1Table = $('table.ProdHierLev1TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirLev1Table.buttons().container()
                                .appendTo('#ProdHierLev1TableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ProdHierLev1TableId").on("click", ".checkProdHirLev1TableClass", function() {
        var product = $(this).parent().parent().find('td').eq(1).text();
        $("#ProductHierLevel1").val(product);
        $("#ProdHierLev1Modal").modal("hide");
    });
    var prodHirLev2Table = null;
    $("#ProductHierLevel2").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ProdHierLev2Modal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllProdHierLev2"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkProdHirLev2TableClass'></td>"
                                + "<td>" + obj[i].PROD_HIER + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#ProdHierLev2TableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ProdHierLev2TableId')) {
                        prodHirLev2Table.destroy();
                        prodHirLev2Table = null;
                        $("#ProdHierLev2TableId").children('tbody').html(row);
                        prodHirLev2Table = $('table.ProdHierLev2TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirLev2Table.buttons().container()
                                .appendTo('#ProdHierLev2TableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ProdHierLev2TableId thead tr').clone(true).appendTo('#ProdHierLev2TableId thead');
                        $('#ProdHierLev2TableId thead tr:eq(1) th').each(function(i) {
                            $('#ProdHierLev2TableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (prodHirLev2Table.column(i).search() !== this.value) {
                                    prodHirLev2Table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        prodHirLev2Table = $('table.ProdHierLev2TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirLev2Table.buttons().container()
                                .appendTo('#ProdHierLev2TableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ProdHierLev2TableId").on("click", ".checkProdHirLev2TableClass", function() {
        var product = $(this).parent().parent().find('td').eq(1).text();
        $("#ProductHierLevel2").val(product);
        $("#ProdHierLev2Modal").modal("hide");
    });
    var prodHirLev3Table = null;
    $("#ProductHierLevel3").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ProdHierLev3Modal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllProdHierLev3"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkProdHirLev3TableClass'></td>"
                                + "<td>" + obj[i].PROD_HIER + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#ProdHierLev3TableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ProdHierLev3TableId')) {
                        prodHirLev3Table.destroy();
                        prodHirLev3Table = null;
                        $("#ProdHierLev3TableId").children('tbody').html(row);
                        prodHirLev3Table = $('table.ProdHierLev3TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirLev3Table.buttons().container()
                                .appendTo('#ProdHierLev3TableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ProdHierLev3TableId thead tr').clone(true).appendTo('#ProdHierLev3TableId thead');
                        $('#ProdHierLev3TableId thead tr:eq(1) th').each(function(i) {
                            $('#ProdHierLev3TableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (prodHirLev3Table.column(i).search() !== this.value) {
                                    prodHirLev3Table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        prodHirLev3Table = $('table.ProdHierLev3TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirLev3Table.buttons().container()
                                .appendTo('#ProdHierLev3TableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ProdHierLev3TableId").on("click", ".checkProdHirLev3TableClass", function() {
        var product = $(this).parent().parent().find('td').eq(1).text();
        $("#ProductHierLevel3").val(product);
        $("#ProdHierLev3Modal").modal("hide");
    });
    var refDocTable = null;
    $("#ReferenceDoc").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ReferenceDocModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllRferenceItem"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkRefDocTableClass'></td>"
                                + "<td>" + obj[i].ITEM + "</td>"
                                + "<td>" + obj[i].DOCUMENT + "</td>"
                                + "</tr>";
                    }
                    $("#ReferenceDocTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ReferenceDocTableId')) {
                        refDocTable.destroy();
                        refDocTable = null;
                        $("#ReferenceDocTableId").children('tbody').html(row);
                        refDocTable = $('table.ReferenceDocTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        refDocTable.buttons().container()
                                .appendTo('#ReferenceDocTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ReferenceDocTableId thead tr').clone(true).appendTo('#ReferenceDocTableId thead');
                        $('#ReferenceDocTableId thead tr:eq(1) th').each(function(i) {
                            $('#ReferenceDocTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (refDocTable.column(i).search() !== this.value) {
                                    refDocTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        refDocTable = $('table.ReferenceDocTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        refDocTable.buttons().container()
                                .appendTo('#ReferenceDocTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ReferenceDocTableId").on("click", ".checkRefDocTableClass", function() {
        var reference = $(this).parent().parent().find('td').eq(1).text();
        $("#ReferenceDoc").val(reference);
        $("#ReferenceDocModal").modal("hide");
    });
    var materialTypeTable = null;
    $("#MaterialType").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#MaterialTypeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllMaterialType"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkMaterialTypeTableClass'></td>"
                                + "<td>" + obj[i].TYPE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#MaterialTypeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#MaterialTypeTableId')) {
                        materialTypeTable.destroy();
                        materialTypeTable = null;
                        $("#MaterialTypeTableId").children('tbody').html(row);
                        materialTypeTable = $('table.MaterialTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        materialTypeTable.buttons().container()
                                .appendTo('#MaterialTypeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#MaterialTypeTableId thead tr').clone(true).appendTo('#MaterialTypeTableId thead');
                        $('#MaterialTypeTableId thead tr:eq(1) th').each(function(i) {
                            $('#MaterialTypeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (materialTypeTable.column(i).search() !== this.value) {
                                    materialTypeTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        materialTypeTable = $('table.MaterialTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        materialTypeTable.buttons().container()
                                .appendTo('#MaterialTypeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#MaterialTypeTableId").on("click", ".checkMaterialTypeTableClass", function() {
        var material = $(this).parent().parent().find('td').eq(1).text();
        $("#MaterialType").val(material);
        $("#MaterialTypeModal").modal("hide");
    });
    var projIndTable = null;
    $("#ProjectIndicator").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ProjectIndModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllProjectInd"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkProjIndTableClass'></td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "<td>" + obj[i].PROJECT_IND + "</td>"
                                + "</tr>";
                    }
                    $("#ProjectIndTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ProjectIndTableId')) {
                        projIndTable.destroy();
                        projIndTable = null;
                        $("#ProjectIndTableId").children('tbody').html(row);
                        projIndTable = $('table.ProjectIndTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        projIndTable.buttons().container()
                                .appendTo('#ProjectIndTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ProjectIndTableId thead tr').clone(true).appendTo('#ProjectIndTableId thead');
                        $('#ProjectIndTableId thead tr:eq(1) th').each(function(i) {
                            $('#ProjectIndTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (projIndTable.column(i).search() !== this.value) {
                                    projIndTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        projIndTable = $('table.ProjectIndTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        projIndTable.buttons().container()
                                .appendTo('#ProjectIndTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ProjectIndTableId").on("click", ".checkProjIndTableClass", function() {
        var project = $(this).parent().parent().find('td').eq(1).text();
        $("#ProjectIndicator").val(project);
        $("#ProjectIndModal").modal("hide");
    });
    var valuationTypeTable = null;
    $("#valuationTypeProfitabilitySegment").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ValuationTypeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllValuationType"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkValTypeTableClass'></td>"
                                + "<td>" + obj[i].VAL_TYPE + "</td>"
    //                        + "<td>" + obj[i].PROJECT_IND + "</td>"
                                + "</tr>";
                    }
                    $("#ValuationTypeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ValuationTypeTableId')) {
                        valuationTypeTable.destroy();
                        valuationTypeTable = null;
                        $("#ValuationTypeTableId").children('tbody').html(row);
                        valuationTypeTable = $('table.ValuationTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        valuationTypeTable.buttons().container()
                                .appendTo('#ValuationTypeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ValuationTypeTableId thead tr').clone(true).appendTo('#ValuationTypeTableId thead');
                        $('#ValuationTypeTableId thead tr:eq(1) th').each(function(i) {
                            $('#ValuationTypeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (valuationTypeTable.column(i).search() !== this.value) {
                                    valuationTypeTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        valuationTypeTable = $('table.ValuationTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        valuationTypeTable.buttons().container()
                                .appendTo('#ValuationTypeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ValuationTypeTableId").on("click", ".checkValTypeTableClass", function() {
        var valuation = $(this).parent().parent().find('td').eq(1).text();
        $("#valuationTypeProfitabilitySegment").val(valuation);
        $("#ValuationTypeModal").modal("hide");
    });
    var customerClassTable = null;
    $("#CustomerClass").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CustomerClassModal").modal('show');
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllCustomerClass"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkCustomerClassTableClass'></td>"
                                + "<td>" + obj[i].CLASS + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#CustomerClassTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#CustomerClassTableId')) {
                        customerClassTable.destroy();
                        customerClassTable = null;
                        $("#CustomerClassTableId").children('tbody').html(row);
                        customerClassTable = $('table.CustomerClassTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        customerClassTable.buttons().container()
                                .appendTo('#CustomerClassTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#CustomerClassTableId thead tr').clone(true).appendTo('#CustomerClassTableId thead');
                        $('#CustomerClassTableId thead tr:eq(1) th').each(function(i) {
                            $('#CustomerClassTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (customerClassTable.column(i).search() !== this.value) {
                                    customerClassTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        customerClassTable = $('table.CustomerClassTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        customerClassTable.buttons().container()
                                .appendTo('#CustomerClassTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#CustomerClassTableId").on("click", ".checkCustomerClassTableClass", function() {
        var customer = $(this).parent().parent().find('td').eq(1).text();
        $("#CustomerClass").val(customer);
        $("#CustomerClassModal").modal("hide");
    });
    var materialSecIndTable = null;
    $("#MaterialSourceInd").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#MaterialSourceIndModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllMaterialSourceInd"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkMaterialSrcIndTableClass'></td>"
                                + "<td>" + obj[i].MAT_SRC_IND + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#MaterialSourceIndTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#MaterialSourceIndTableId')) {
                        materialSecIndTable.destroy();
                        materialSecIndTable = null;
                        $("#MaterialSourceIndTableId").children('tbody').html(row);
                        materialSecIndTable = $('table.MaterialSourceIndTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        materialSecIndTable.buttons().container()
                                .appendTo('#MaterialSourceIndTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#MaterialSourceIndTableId thead tr').clone(true).appendTo('#MaterialSourceIndTableId thead');
                        $('#MaterialSourceIndTableId thead tr:eq(1) th').each(function(i) {
                            $('#MaterialSourceIndTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (materialSecIndTable.column(i).search() !== this.value) {
                                    materialSecIndTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        materialSecIndTable = $('table.MaterialSourceIndTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        materialSecIndTable.buttons().container()
                                .appendTo('#MaterialSourceIndTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#MaterialSourceIndTableId").on("click", ".checkMaterialSrcIndTableClass", function() {
        var material = $(this).parent().parent().find('td').eq(1).text();
        $("#MaterialSourceInd").val(material);
        $("#MaterialSourceIndModal").modal("hide");
    });
    var contractTypeTable = null;
    $("#ContractType").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ContractTypeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllContractType"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkContractTypeTableClass'></td>"
                                + "<td>" + obj[i].CON_TYPE + "</td>"
                                + "<td>" + obj[i].PROCESS_TYPE + "</td>"
                                + "</tr>";
                    }
                    $("#ContractTypeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ContractTypeTableId')) {
                        contractTypeTable.destroy();
                        contractTypeTable = null;
                        $("#ContractTypeTableId").children('tbody').html(row);
                        contractTypeTable = $('table.ContractTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        contractTypeTable.buttons().container()
                                .appendTo('#ContractTypeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ContractTypeTableId thead tr').clone(true).appendTo('#ContractTypeTableId thead');
                        $('#ContractTypeTableId thead tr:eq(1) th').each(function(i) {
                            $('#ContractTypeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (contractTypeTable.column(i).search() !== this.value) {
                                    contractTypeTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        contractTypeTable = $('table.ContractTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        contractTypeTable.buttons().container()
                                .appendTo('#ContractTypeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ContractTypeTableId").on("click", ".checkContractTypeTableClass", function() {
        var contract = $(this).parent().parent().find('td').eq(1).text();
        $("#ContractType").val(contract);
        $("#ContractTypeModal").modal("hide");
    });
    var industryCode1Table = null;
    $("#IndustryCode1").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#IndustryCode1Modal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllIndustryCode1"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkIndustryCode1TableClass'></td>"
                                + "<td>" + obj[i].INDUSTRYCODE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#IndustryCode1TableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#IndustryCode1TableId')) {
                        industryCode1Table.destroy();
                        industryCode1Table = null;
                        $("#IndustryCode1TableId").children('tbody').html(row);
                        industryCode1Table = $('table.IndustryCode1TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        industryCode1Table.buttons().container()
                                .appendTo('#IndustryCode1TableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#IndustryCode1TableId thead tr').clone(true).appendTo('#IndustryCode1TableId thead');
                        $('#IndustryCode1TableId thead tr:eq(1) th').each(function(i) {
                            $('#IndustryCode1TableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (industryCode1Table.column(i).search() !== this.value) {
                                    industryCode1Table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        industryCode1Table = $('table.IndustryCode1TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        industryCode1Table.buttons().container()
                                .appendTo('#IndustryCode1TableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#IndustryCode1TableId").on("click", ".checkIndustryCode1TableClass", function() {
        var industry = $(this).parent().parent().find('td').eq(1).text();
        $("#IndustryCode1").val(industry);
        $("#IndustryCode1Modal").modal("hide");
    });
    var industryCode2Table = null;
    $("#IndustryCode2").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#IndustryCode2Modal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllIndustryCode2"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkIndustryCode2TableClass'></td>"
                                + "<td>" + obj[i].INDUSTRYCODE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#IndustryCode2TableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#IndustryCode2TableId')) {
                        industryCode2Table.destroy();
                        industryCode2Table = null;
                        $("#IndustryCode2TableId").children('tbody').html(row);
                        industryCode2Table = $('table.IndustryCode2TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        industryCode2Table.buttons().container()
                                .appendTo('#IndustryCode2TableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#IndustryCode2TableId thead tr').clone(true).appendTo('#IndustryCode2TableId thead');
                        $('#IndustryCode2TableId thead tr:eq(1) th').each(function(i) {
                            $('#IndustryCode2TableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (industryCode2Table.column(i).search() !== this.value) {
                                    industryCode2Table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        industryCode2Table = $('table.IndustryCode2TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        industryCode2Table.buttons().container()
                                .appendTo('#IndustryCode2TableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#IndustryCode2TableId").on("click", ".checkIndustryCode2TableClass", function() {
        var industry = $(this).parent().parent().find('td').eq(1).text();
        $("#IndustryCode2").val(industry);
        $("#IndustryCode2Modal").modal("hide");
    });
    var industryCode3Table = null;
    $("#IndustryCode3").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#IndustryCode3Modal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllIndustryCode3"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkIndustryCode3TableClass'></td>"
                                + "<td>" + obj[i].INDUSTRYCODE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#IndustryCode3TableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#IndustryCode3TableId')) {
                        industryCode3Table.destroy();
                        industryCode3Table = null;
                        $("#IndustryCode3TableId").children('tbody').html(row);
                        industryCode3Table = $('table.IndustryCode3TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        industryCode3Table.buttons().container()
                                .appendTo('#IndustryCode3TableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#IndustryCode3TableId thead tr').clone(true).appendTo('#IndustryCode3TableId thead');
                        $('#IndustryCode3TableId thead tr:eq(1) th').each(function(i) {
                            $('#IndustryCode3TableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (industryCode3Table.column(i).search() !== this.value) {
                                    industryCode3Table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        industryCode3Table = $('table.IndustryCode3TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        industryCode3Table.buttons().container()
                                .appendTo('#IndustryCode3TableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#IndustryCode3TableId").on("click", ".checkIndustryCode3TableClass", function() {
        var industry = $(this).parent().parent().find('td').eq(1).text();
        $("#IndustryCode3").val(industry);
        $("#IndustryCode3Modal").modal("hide");
    });
    var salesDocTypeTable = null;
    $("#SalesDocType").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesDocTypeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllSalesDocType"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkSalesDocTypeTableClass'></td>"
                                + "<td>" + obj[i].SALESDOCTYPE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#SalesDocTypeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#SalesDocTypeTableId')) {
                        salesDocTypeTable.destroy();
                        salesDocTypeTable = null;
                        $("#SalesDocTypeTableId").children('tbody').html(row);
                        salesDocTypeTable = $('table.SalesDocTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        salesDocTypeTable.buttons().container()
                                .appendTo('#SalesDocTypeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#SalesDocTypeTableId thead tr').clone(true).appendTo('#SalesDocTypeTableId thead');
                        $('#SalesDocTypeTableId thead tr:eq(1) th').each(function(i) {
                            $('#SalesDocTypeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (salesDocTypeTable.column(i).search() !== this.value) {
                                    salesDocTypeTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        salesDocTypeTable = $('table.SalesDocTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        salesDocTypeTable.buttons().container()
                                .appendTo('#SalesDocTypeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#SalesDocTypeTableId").on("click", ".checkSalesDocTypeTableClass", function() {
        var sales = $(this).parent().parent().find('td').eq(1).text();
        $("#SalesDocType").val(sales);
        $("#SalesDocTypeModal").modal("hide");
    });
    var referenceItemTable = null;
    $("#ReferenceItem").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ReferenceItemModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllReferenceItem"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkReferenceItemTableClass'></td>"
                                + "<td>" + obj[i].ITEM + "</td>"
                                + "<td>" + obj[i].DOC + "</td>"
                                + "</tr>";
                    }
                    $("#ReferenceItemTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ReferenceItemTableId')) {
                        referenceItemTable.destroy();
                        referenceItemTable = null;
                        $("#ReferenceItemTableId").children('tbody').html(row);
                        referenceItemTable = $('table.ReferenceItemTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        referenceItemTable.buttons().container()
                                .appendTo('#ReferenceItemTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ReferenceItemTableId thead tr').clone(true).appendTo('#ReferenceItemTableId thead');
                        $('#ReferenceItemTableId thead tr:eq(1) th').each(function(i) {
                            $('#ReferenceItemTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (referenceItemTable.column(i).search() !== this.value) {
                                    referenceItemTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        referenceItemTable = $('table.ReferenceItemTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        referenceItemTable.buttons().container()
                                .appendTo('#ReferenceItemTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ReferenceItemTableId").on("click", ".checkReferenceItemTableClass", function() {
        var sales = $(this).parent().parent().find('td').eq(1).text();
        $("#ReferenceItem").val(sales);
        $("#ReferenceItemModal").modal("hide");
    });
    var billTypeTable = null;
    $("#BillingType").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#BillingTypeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllBillType",
                    "companyCode": $("#companycodeHeader").val()
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkBillTypeTableClass'></td>"
                                + "<td>" + obj[i].BILLTYPE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#BillingTypeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#BillingTypeTableId')) {
                        billTypeTable.destroy();
                        billTypeTable = null;
                        $("#BillingTypeTableId").children('tbody').html(row);
                        billTypeTable = $('table.BillingTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        billTypeTable.buttons().container()
                                .appendTo('#BillingTypeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#BillingTypeTableId thead tr').clone(true).appendTo('#BillingTypeTableId thead');
                        $('#BillingTypeTableId thead tr:eq(1) th').each(function(i) {
                            $('#BillingTypeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (billTypeTable.column(i).search() !== this.value) {
                                    billTypeTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        billTypeTable = $('table.BillingTypeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        billTypeTable.buttons().container()
                                .appendTo('#BillingTypeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#BillingTypeTableId").on("click", ".checkBillTypeTableClass", function() {
        var bill = $(this).parent().parent().find('td').eq(1).text();
//    var desc = $(this).parent().parent().find('td').eq(2).text();
        $("#BillingType").val(bill);
        $("#BillingTypeModal").modal("hide");
    });
    var prodHirTable = null;
    $("#Prodhierarchy").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ProdHierarchyModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllProdHierLev1"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkProdHirTableClass'></td>"
                                + "<td>" + obj[i].PROD_HIER + "</td>"
                                + "<td>" + obj[i].NAME + "</td>"
                                + "</tr>";
                    }
                    $("#ProdHierarchyTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#ProdHierarchyTableId')) {
                        prodHirTable.destroy();
                        prodHirTable = null;
                        $("#ProdHierarchyTableId").children('tbody').html(row);
                        prodHirTable = $('table.ProdHierarchyTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirTable.buttons().container()
                                .appendTo('#ProdHierarchyTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#ProdHierarchyTableId thead tr').clone(true).appendTo('#ProdHierarchyTableId thead');
                        $('#ProdHierarchyTableId thead tr:eq(1) th').each(function(i) {
                            $('#ProdHierarchyTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (prodHirTable.column(i).search() !== this.value) {
                                    prodHirTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        prodHirTable = $('table.ProdHierarchyTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        prodHirTable.buttons().container()
                                .appendTo('#ProdHierarchyTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#ProdHierarchyTableId").on("click", ".checkProdHirTableClass", function() {
        var prod = $(this).parent().parent().find('td').eq(1).text();
//    var name = $(this).parent().parent().find('td').eq(2).text();
        $("#Prodhierarchy").val(prod);
        $("#ProdHierarchyModal").modal("hide");
    });
    var higherLevItemTable = null;
    $("#HigherLevItem").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#HigherLevItemModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllHigherLevItem"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkProdHirTableClass'></td>"
                                + "<td>" + obj[i].HIGHLEVITEM + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#HigherLevItemTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#HigherLevItemTableId')) {
                        higherLevItemTable.destroy();
                        higherLevItemTable = null;
                        $("#HigherLevItemTableId").children('tbody').html(row);
                        higherLevItemTable = $('table.HigherLevItemTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        higherLevItemTable.buttons().container()
                                .appendTo('#HigherLevItemTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#HigherLevItemTableId thead tr').clone(true).appendTo('#HigherLevItemTableId thead');
                        $('#HigherLevItemTableId thead tr:eq(1) th').each(function(i) {
                            $('#HigherLevItemTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (higherLevItemTable.column(i).search() !== this.value) {
                                    higherLevItemTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        higherLevItemTable = $('table.HigherLevItemTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        higherLevItemTable.buttons().container()
                                .appendTo('#HigherLevItemTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#HigherLevItemTableId").on("click", ".checkProdHirTableClass", function() {
        var item = $(this).parent().parent().find('td').eq(1).text();
//    var desc = $(this).parent().parent().find('td').eq(2).text();
        $("#HigherLevItem").val(item);
        $("#HigherLevItemModal").modal("hide");
    });
    var IndCodeTableTable = null;
    $("#Industry").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#IndCodeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllIndustryCode"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkIndCodeClass'></td>"
                                + "<td>" + obj[i].INDCODE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#IndCodeTableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#IndCodeTableId')) {
                        IndCodeTableTable.destroy();
                        IndCodeTableTable = null;
                        $("#IndCodeTableId").children('tbody').html(row);
                        IndCodeTableTable = $('table.IndCodeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        IndCodeTableTable.buttons().container()
                                .appendTo('#IndCodeTableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#IndCodeTableId thead tr').clone(true).appendTo('#IndCodeTableId thead');
                        $('#IndCodeTableId thead tr:eq(1) th').each(function(i) {
                            $('#IndCodeTableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (IndCodeTableTable.column(i).search() !== this.value) {
                                    IndCodeTableTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        IndCodeTableTable = $('table.IndCodeTableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        IndCodeTableTable.buttons().container()
                                .appendTo('#IndCodeTableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#IndCodeTableId").on("click", '.checkIndCodeClass', function() {
        var code = $(this).parent().parent().find('td').eq(1).text();
//    var desc = $(this).parent().parent().find('td').eq(2).text();
        $("#Industry").val(code);
        $("#IndCodeModal").modal("hide");
    });
    var IndField001Table = null;
    $("#IndustryField001").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#IndField001Modal").modal("show");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "getAllIndustryCode"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Obj lengtth :" + obj.length);
                    var row = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr>"
                                + "<td><input type='checkbox' class='checkIndField001Class'></td>"
                                + "<td>" + obj[i].INDCODE + "</td>"
                                + "<td>" + obj[i].DESC + "</td>"
                                + "</tr>";
                    }
                    $("#IndField001TableId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#IndField001TableId')) {
                        IndField001Table.destroy();
                        IndField001Table = null;
                        $("#IndField001TableId").children('tbody').html(row);
                        IndField001Table = $('table.IndField001TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        IndField001Table.buttons().container()
                                .appendTo('#IndField001TableId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#IndField001TableId thead tr').clone(true).appendTo('#IndField001TableId thead');
                        $('#IndField001TableId thead tr:eq(1) th').each(function(i) {
                            $('#IndField001TableId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (IndField001Table.column(i).search() !== this.value) {
                                    IndField001Table
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        IndField001Table = $('table.IndField001TableClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        IndField001Table.buttons().container()
                                .appendTo('#IndField001TableId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    $("#IndField001TableId").on("click", ".checkIndField001Class", function() {
        var code = $(this).parent().parent().find('td').eq(1).text();
//    var desc = $(this).parent().parent().find('td').eq(2).text();
        $("#IndustryField001").val(code);
        $("#IndField001Modal").modal("hide");
    });
    $("#profitabilitySegmentSubmitBtn").click(function() {

        var characteristic = $("#Characteristic").val();
        var customerCode = $("#CustomerCode").val();
        var product = $("#Product").val();
        var billingType = $("#BillingType").val();
        var salesOrder = $("#salesOrderProfitabilitySegment").val();
        var itemNumber = $("#itemNumberProfitabilitySegment").val();
        var order = $("#orderProfitabilitySegment").val();
        var companyCode = $("#companyCodeProfitabilitySegment").val();
        var plant = $("#Plant").val();
        var businessArea = $("#BusinessArea").val();
        var salesOrganization = $("#SalesOrganization").val();
        var distrChannel = $("#DistrChannel").val();
        var division = $("#Division").val();
        var wBSElement = $("#WBSElement").val();
        var costObject = $("#CostObject").val();
        var profitCentre = $("#ProfitCentre").val();
        var partnerPC = $("#PartnerPC").val();
        var country = $("#countryProfitabilitySegment").val();
        var salesOffice = $("#SalesOffice").val();
        var salesEmployee = $("#SalesEmployee").val();
        var matlGroup = $("#MatlGroup").val();
        var prodhierarchy = $("#Prodhierarchy").val();
        var itemcategory = $("#ItemCategory").val();
        var higherlevitem = $("#HigherLevItem").val();
        var industry = $("#Industry").val();
        var customergroup = $("#CustomerGroup").val();
        var productHierLevel1 = $("#ProductHierLevel1").val();
        var productHierLevel2 = $("#ProductHierLevel2").val();
        var productHierLevel3 = $("#ProductHierLevel3").val();
        var materialType = $("#MaterialType").val();
        var referencedoc = $("#ReferenceDoc").val();
        var projectNumber1 = $("#ProjectNumber1").val();
        var projectIndicator = $("#ProjectIndicator").val();
        var valuationType = $("#valuationTypeProfitabilitySegment").val();
        var customerclass = $("#CustomerClass").val();
        var materialSourceInd = $("#MaterialSourceInd").val();
        var contractType = $("#ContractType").val();
        var shiptoparty = $("#ShipToParty").val();
        var industryCode1 = $("#IndustryCode1").val();
        var industryfield001 = $("#IndustryField001").val();
        var industrycode2 = $("#IndustryCode2").val();
        var industrycode3 = $("#IndustryCode3").val();
        var salesDocType = $("#SalesDocType").val();
        var referenceitem = $("#ReferenceItem").val();
        var itemCode = $("#ItemNumberSelect").val();
        console.log("serviceTabTableCurrentTd: " + serviceTabTableCurrentTd);
        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
        var pRItemNumber = "";
        var linkId = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        console.log("pRItemNumber: " + pRItemNumber);
        console.log("linkId: " + linkId);
        var errorMsg = "";
        if (profitCentre === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Profit Center!";
            $("#ProfitCentre").css("border-color", "red");
            $("#ProfitCentre").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }
        if (partnerPC === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter PartnerPC!";
            $("#PartnerPC").css("border-color", "red");
            $("#PartnerPC").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }


        var profitabilitySegmentString = characteristic + "," + customerCode + "," + product + "," + billingType + "," + salesOrder + "," + itemNumber
                + "," + order + "," + companyCode + "," + plant + "," + businessArea + "," + salesOrganization + "," + distrChannel + "," + division
                + "," + wBSElement + "," + costObject + "," + profitCentre + "," + partnerPC + "," + country + "," + salesOffice + "," + salesEmployee
                + "," + matlGroup + "," + prodhierarchy + "," + itemcategory + "," + higherlevitem + "," + industry + "," + customergroup + "," + productHierLevel1
                + "," + productHierLevel2 + "," + productHierLevel3 + "," + materialType + "," + referencedoc + "," + projectNumber1 + "," + projectIndicator
                + "," + valuationType + "," + customerclass + "," + materialSourceInd + "," + contractType + "," + shiptoparty + "," + industryCode1
                + "," + industryfield001 + "," + industrycode2 + "," + industrycode3 + "," + salesDocType + "," + referenceitem + "," + itemCode
                + "," + serviceLineItemNumber + "," + pRItemNumber + "," + linkId;
        console.log("profitabilitySegmentString: " + profitabilitySegmentString);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveProfitabilitySegmentData",
                "profitabilitySegmentString": profitabilitySegmentString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.alert("success", {
                    msg: "Data saved successfully "
                });
                serviceTabTableCurrentTd.parent().children(".isProfitabilitySegmentDataSaved").val("Yes");
                $("#profitabilitySegmentModal").modal("hide");
            }
        });
    });
    $("#serviceAccAsgnmentSubmitBtn").click(function() {
        var serviceAccAsgnTblRow = "";
        var serviceAccAsgnTblRowString = "";
        var pRItemNumber = "";
        //By Bittu
        var accAsgnLen = $("#serviceTabAccAsgnTebleId tbody tr").length;
        var serviceGLAccount = "";
        var serviceSalesOrder = "";
        var serviceItemNumber = "";
        var errorMsg = "";
//        var isCorrect = "Yes";
        var rows = $('#serviceTabAccAsgnTebleId tbody tr');
        var accountAssignment = $("#accountAssignmentCategory").val();
//        var accountAssignment = "C";
        var ServiceAccAssDist = $('input[type=radio][name=distributionIndicator]:checked').attr('id');
        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
            var totalQuantity = 0;
            var totalPer = 0;
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                var isChecked = $(this).find("td").eq(0).children(".deleteServiceLine").prop("checked");
                if (ServiceAccAssDist === "noMultiAcctAssignment") {
                    serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("");
                } else if (ServiceAccAssDist === "distOnQuantBases") {
                    if (isChecked !== true) {
                        totalQuantity += Number(removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val()));
                    }
                    totalPer += Number($(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val());
                } else if (ServiceAccAssDist === "distByPercentage") {
                    if (isChecked !== true) {
                        totalPer += Number($(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val());
                    }
                    totalQuantity += Number(removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val()));
                }
            });
            if (ServiceAccAssDist === "noMultiAcctAssignment") {
                serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("");
            } else if (ServiceAccAssDist === "distOnQuantBases") {
                var serviceQuantity = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
                if (Number(serviceQuantity) !== Number(totalQuantity)) {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter correct Quantity!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    return false;
                }
            } else if (ServiceAccAssDist === "distByPercentage") {
                if (Number(totalPer) !== 100) {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter correct Percentage!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    return false;
                }
            }
//            return false;
        }

        var isCorrect = ServiceAccountAssignmentValidationforMultipleDistribution(accountAssignment);
        if (isCorrect === false) {
            return false;
        }
        var isDelete = false;
// Added by Nikhil

        if (ServiceAccAssDist === "noMultiAcctAssignment") {
            serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("");
        } else if (ServiceAccAssDist === "distOnQuantBases") {
            serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("1");
        } else if (ServiceAccAssDist === "distByPercentage") {
            serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("2");
        }
        console.log("ServiceAccAssDist: " + ServiceAccAssDist);
        // End

        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            var quantity = removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
            var per = $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
            var gLAccount = $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val();
            var cOArea = $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").val();
            var costCenter = $(this).find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val();
            var fund = $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").val();
            var funArea = $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").val();
            var fundCenter = $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").val();
            var commitmentItem = $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").val();
            var Order = $(this).find("td").eq(10).children(".serviceAccAsgnTblOrder").val();
            var Asset = $(this).find("td").eq(11).children(".serviceAccAsgnTblAssets").val();
            var WBSElement = $(this).find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val();
            var SalesOrder = $(this).find("td").eq(13).children(".serviceAccAsgnTblSalesOrder").val();
            var NetActNumber = $(this).find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").val();
            var ItemNumber = $(this).find("td").eq(15).children(".serviceAccAsgnTblItemNumber").val();
            var DeliverySch = $(this).find("td").eq(16).children(".serviceAccAsgnTblDeliverySchedule").val();
            var netValue = $(this).find("td").eq(16).children(".netValue").val();
            var linkNumber = $(this).find("td").eq(16).children(".linkNumber").val();
            var LineNoSerAcc = $(this).find("td").eq(0).children(".LineNoSerAcc").val();
            if (LineNoSerAcc === "") {
                LineNoSerAcc = "NON";
            }
            var activity = $("#accountAssignActivity").val();
            var shortText = $("#accountAssignShortText").val();
            var distributionId = $('input[type=radio][name=distributionIndicator]:checked').attr('id');
            var distribution;
            var linkid;
            var accAsgn = "";
            if (distributionId === "noMultiAcctAssignment") {
                distribution = "";
            } else if (distributionId === "distOnQuantBases") {
                distribution = "1";
            } else if (distributionId === "distByPercentage") {
                distribution = "2";
            }
            if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                isDelete = $(this).find("td").eq(0).children(".deleteServiceLine").prop("checked");
            }

            var itemCode = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                }
            });
            console.log("AccountAssignment :" + accAsgn);
            console.log("AccountAssignment LinkId:" + linkid);
            serviceAccAsgnTblRow = quantity + "," + per + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + "," +
                    fundCenter + "," + commitmentItem + "," + Order + "," + itemCode + "," + serviceLineItemNumber + "," + Asset + "," + WBSElement + ","
                    + SalesOrder + "," + NetActNumber + "," + ItemNumber + "," + DeliverySch + "," + activity + "," + shortText + "," +
                    distribution + "," + accAsgn + "," + netValue + "," + linkNumber + "," + linkid + "," + pRItemNumber + "," + isDelete + "," +
                    PoFrom + "," + LineNoSerAcc;
            console.log("serviceAccAsgnTblRow12 :" + serviceAccAsgnTblRow);
            console.log("netValue12 :" + netValue);
            serviceAccAsgnTblRowString = serviceAccAsgnTblRowString + serviceAccAsgnTblRow + "#";
            console.log("serviceAccAsgnTblRowString :" + serviceAccAsgnTblRowString);
//            serviceAccAsgnTblRowString = "5,50,0008514908,0640,0640-22301,NSH001,3000,,8514908,,2580,40,,00000000,,,,,REMA01001,SERVICING AIR CON/CHILLER/COOLING TWR,1,K,,10,10084642,10#5,50,0008514908,0640,0640-53030,NSH001,1000,,8514908,,2580,40,,00000000,,,,,REMA01001,SERVICING AIR CON/CHILLER/COOLING TWR,1,K,,20,10084642,10#"
        });
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveServiceTabAccAsgnTblData",
                "serviceAccAsgnTblRowString": serviceAccAsgnTblRowString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                $("#overlay").css("display", "none");
                Lobibox.alert("success", {
                    msg: "Data saved successfully "
                });
                serviceTabTableCurrentTd.parent().children(".saveSarviceAccountAssignment").val("Yes");
//                if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
//                    $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
//                        var isAvailable = $(this).find("td").eq(0).children("i").hasClass("deleterowClass");
//                        if (isAvailable === true) {
//                            $(this).find("td").eq(0).children(".deleterowClass").css("display", "none");
//                        }
//                    });
//                }
                saveServiceTabDataOnLoadFieldChange();
            }
        });
        var accountAssignmentCategory = $("#accountAssignmentCategory").val();
        if (accountAssignmentCategory === 'K') {
            accAsgnCat_K_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'N') {
            accAsgnCat_N_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'A') {
            accAsgnCat_A_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'B') {
            accAsgnCat_B_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'C') {
            accAsgnCat_C_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'D') {
            accAsgnCat_D_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'E') {
            accAsgnCat_E_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'F') {
            accAsgnCat_F_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'G') {
            accAsgnCat_G_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'M') {
            accAsgnCat_M_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'P') {
            accAsgnCat_P_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Q') {
            accAsgnCat_Q_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'R') {
            accAsgnCat_R_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'T') {
            accAsgnCat_T_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'U') {
            accAsgnCat_U_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'X') {
            accAsgnCat_X_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Z') {
            accAsgnCat_Z_Dist_SAA("serviceTableCheckbox");
        }
    });
    $("#serviceInpAccAsgnmentSubmitBtn").click(function() {
        var gLAccount = $("#gLAccountService").val();
        var cOARea = $("#coAreaService").val();
        var companyCode = $("#companyCodeService").val();
        var costCenter = $("#costCenterService").val();
        var order = $("#OrderService").val();
        var asset = $("#AssetService").val();
        var WBSElement = $("#WBSElementInputService").val();
        var salesOrder = $("#SalesOrderService").val();
        var itemNumber = $("#ItemNumberService").val();
        var delSchedule = $("#DelivSchService").val();
        var fund = $("#fundService").val();
        var functionalArea = $("#functionalAreaService").val();
        var fundCenter = $("#FundCenterServiceInput").val();
        var comItem = $("#CommItemServiceInput").val();
        var nANumber = $("#NActNumServiceInput").val();
        var itemCode = $("#ItemNumberSelect").val();
        var linknumber = $("#ServiceLinkNumberId").val();
        var netvalue = $("#ServiceNetValueId").val();
        var distribution = "";
        var pRItemNumber = "";
        var accAsgn = "";
        var linkid;
        var errorMsg = "";
        var accountAssignment = $("#accountAssignmentCategory").val();
        var LineNoSerAcc = $("#LineNoSerAccId").val();
        if (LineNoSerAcc === "") {
            LineNoSerAcc = "NON";
        }
//        var accountAssignment = "C";

// Added by Bittu 03/04/2020
        var isCorrect = ServiceAccountAssignmentValidation("Single Account Assignment", accountAssignment);
        if (isCorrect === false) {
            return false;
        }

        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                accAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
            }
        });
        // Added by Nikhil
        serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("");
        // End

        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
        var quantity = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        var accAsgnString = gLAccount + "," + cOARea + "," + companyCode + "," + costCenter + "," + order + "," + asset + "," + WBSElement + "," +
                salesOrder + "," + itemNumber + "," + delSchedule + "," + fund + "," + functionalArea + "," + fundCenter + "," + comItem + ","
                + nANumber + "," + itemCode + "," + serviceLineItemNumber + "," + quantity + "," + linknumber + "," + netvalue + "," + pRItemNumber
                + "," + accAsgn + "," + linkid + "," + LineNoSerAcc;
//        accAsgnString: "0008514908,0640,,0640-22301,,,,,,,NSH001,,0640-22301,0008514908,,4808,10,10.000,10,100.1,10,K,27273705,NON";
        console.log("accAsgnString: " + accAsgnString);
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveServiceAccAsgnData",
                "accAsgnString": accAsgnString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                $("#overlay").css("display", "none");
                Lobibox.alert("success", {
                    msg: "Data saved successfully "
                });
                serviceTabTableCurrentTd.parent().children(".saveSarviceAccountAssignment").val("Yes");
                saveServiceTabDataOnLoadFieldChange();
            }
        });
        var accountAssignmentCategory = $("#accountAssignmentCategory").val();
        if (accountAssignmentCategory === 'K') {
            accAsgnCat_K_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'N') {
            accAsgnCat_N_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'A') {
            accAsgnCat_A_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'B') {
            accAsgnCat_B_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'C') {
            accAsgnCat_C_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'D') {
            accAsgnCat_D_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'E') {
            accAsgnCat_E_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'F') {
            accAsgnCat_F_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'G') {
            accAsgnCat_G_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'M') {
            accAsgnCat_M_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'P') {
            accAsgnCat_P_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Q') {
            accAsgnCat_Q_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'R') {
            accAsgnCat_R_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'T') {
            accAsgnCat_T_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'U') {
            accAsgnCat_U_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'X') {
            accAsgnCat_X_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Z') {
            accAsgnCat_Z_Dist_SAA("serviceTableCheckbox");
        }

    });
    $("#serviceTabTableSaveBtn").click(function() {
        $("#overlay").css("display", "block");
        var serviceTblRow = "";
        var serviceTblRowString = "";
        var pRItemNumber = "";
        $("#serviceTableId tbody tr").each(function() {
            var ServiceAccAssDist = $(this).find("td").eq(0).children(".ServiceAccAssDist").val();
            var servicesLinkId = $(this).find("td").eq(0).children(".ServiceLinkId").val();
            var lineItemNumber = $(this).find("td").eq(2).children(".lineItemNumberServices").val();
            var serviceNumber = $(this).find("td").eq(3).children(".ServicesNumber_Services").val();
            var shortText = $(this).find("td").eq(4).children(".shortText_Services").val();
            var qunatity = removeCommaInNumber($(this).find("td").eq(5).children(".quantity_Services").val());
            var unit = $(this).find("td").eq(6).children(".servicesUnit_Services").val();
            var grossPrice = removeCommaInNumber($(this).find("td").eq(7).children(".grossPrice_Services").val());
            var currency = $(this).find("td").eq(8).children(".currency_Services").val();
            var netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".netPrice_Services").val());
            var edition = $(this).find("td").eq(10).children(".edition_Services").val();
            var lineItemLongText = $(this).find("td").eq(11).children(".lineItemLongText_Services").val();
            var overfTolerance = $(this).find("td").eq(12).children(".overfTolerance_Services").val();
            var itemCode = $("#ItemNumberSelect").val();
            var linkid;
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                }
            });
            if (ServiceAccAssDist === "")
            {
                ServiceAccAssDist = 0;
            }

            serviceTblRow = lineItemNumber + "," + serviceNumber + "," + shortText + "," + qunatity + "," + unit + "," + grossPrice + "," + currency
                    + "," + netPrice + "," + edition + "," + lineItemLongText + "," + overfTolerance + "," + itemCode + "," + linkid + "," + servicesLinkId
                    + "," + pRItemNumber + "," + ServiceAccAssDist;
            serviceTblRowString = serviceTblRowString + serviceTblRow + "#";
            console.log("serviceTblRowString :" + serviceTblRowString);
        });
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveServiceTableData",
                "serviceTblRowString": serviceTblRowString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
                $("#isServiceTabSaved").val("Yes");
            }
        });
    });
    $("#limitAccountAsgnTblSaveBtn").click(function() {
        var limitAccAsgnTblRow = "";
        var limitAccAsgnTblRowString = "";
        var pRItemNumber = "";
        var itemCode = "";
        var linkid = "";
        var quantity = removeCommaInNumber($("#limitAccountAssignQuantity").val());
        console.log("quantity: " + quantity);
//        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
        $("#limitTabAccAsgnTebleId tbody tr").each(function() {
            var percentage = $(this).find("td").eq(1).children(".limitAccAsgnTblPercentage").val();
            var gLAccount = $(this).find("td").eq(2).children(".limitAccAsgnTblGLAccount").val();
            var cOArea = $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").val();
            var costCenter = $(this).find("td").eq(4).children(".limitAccAsgnTblCostCetner").val();
            var fund = $(this).find("td").eq(5).children(".limitAccAsgnTblFund").val();
            var funArea = $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").val();
            var fundCenter = $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").val();
            var commitmentItem = $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").val();
            var order = $(this).find("td").eq(9).children(".limitAccAsgnTblOrder").val();
            var asset = $(this).find("td").eq(10).children(".limitAccAsgnTblAssets").val();
            var wBSElement = $(this).find("td").eq(11).children(".limitAccAsgnTblWBSElement").val();
            var salesOrder = $(this).find("td").eq(12).children(".limitAccAsgnTblSalesOrder").val();
            var netActNumber = $(this).find("td").eq(13).children(".limitAccAsgnTblNetActNumber").val();
            var itemNumber = $(this).find("td").eq(14).children(".limitAccAsgnTblItemNumber").val();
            var deliverySch = $(this).find("td").eq(15).children(".limitAccAsgnTblDeliverySchedule").val();
            itemCode = $("#ItemNumberSelect").val();
            var expectedValue = removeCommaInNumber($("#ExpectedValue").val());
            var distributionId = $('input[type=radio][name=limitDistributionIndicator]:checked').attr('id');
            if (distributionId === "limitNoMultiAcctAssignment") {
                distribution = "";
            } else if (distributionId === "limitDistOnQuantBases") {
                distribution = "1";
            } else if (distributionId === "limitDistByPercentageBases") {
                distribution = "2";
            }
            var accAsgn = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                }
            });
            limitAccAsgnTblRow = percentage + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + ","
                    + fundCenter + "," + commitmentItem + "," + order + "," + asset + "," + wBSElement + "," + salesOrder + ","
                    + netActNumber + "," + itemNumber + "," + deliverySch + "," + itemCode + "," + ","
                    + distribution + "," + accAsgn + "," + expectedValue + "," + pRItemNumber + "," + linkid + "," + quantity;
            limitAccAsgnTblRowString = limitAccAsgnTblRowString + limitAccAsgnTblRow + "#";
            console.log("limitAccAsgnTblRowString :" + limitAccAsgnTblRowString);
        });
        saveLimitsTabData(itemCode, pRItemNumber, linkid);
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveLimitTabAccAsgnTblData",
                "limitAccAsgnTblRowString": limitAccAsgnTblRowString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.alert("success", {
                    msg: "Data saved successfully "
                });
            }
        });
        var accountAssignmentCategory = $("#accountAssignmentCategory").val();
        if (accountAssignmentCategory === 'K') {
            accAsgnCat_K_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'N') {
            accAsgnCat_N_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'A') {
            accAsgnCat_A_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'B') {
            accAsgnCat_B_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'C') {
            accAsgnCat_C_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'D') {
            accAsgnCat_D_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'E') {
            accAsgnCat_E_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'F') {
            accAsgnCat_F_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'G') {
            accAsgnCat_G_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'M') {
            accAsgnCat_M_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'P') {
            accAsgnCat_P_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Q') {
            accAsgnCat_Q_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'R') {
            accAsgnCat_R_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'T') {
            accAsgnCat_T_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'U') {
            accAsgnCat_U_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'X') {
            accAsgnCat_X_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Z') {
            accAsgnCat_Z_Dist_SAA("serviceTableCheckbox");
        }

    });
    $("#saveLimitAccAsgnData").click(function() {
        var gLAccount = $("#gLAccountInp_Limits").val();
        var cOARea = $("#coAreaInp_Limits").val();
        var companyCode = $("#companyCodeInp_Limits").val();
        var costCenter = $("#costCenterInp_Limits").val();
        var order = $("#orderInp_Limits").val();
        var asset = $("#assetInp_Limits").val();
        var WSElement = $("#wBSElementInp_Limits").val();
        var salesOrder = $("#salesOrderInp_Limits").val();
        var itemNumber = $("#itemNumberInp_Limits").val();
        var delSchedule = $("#delivSchInp_Limits").val();
        var fund = $("#fundInp_Limits").val();
        var functionalArea = $("#functionalAreaInp_Limits").val();
        var fundCenter = $("#fundCenterInp_Limits").val();
        var comItem = $("#commItemServiceInp_Limits").val();
        var nANumber = $("#nActNumServiceInp_Limits").val();
        var itemCode = $("#ItemNumberSelect").val();
        var linkid = "";
        var accountAssignment = $("#accountAssignmentCategory").val();
//        var accountAssignment = "C";
        var errorMsg = "";
//        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices ").val();
//        var quantity = serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services").val();
        var expectedValue = removeCommaInNumber($("#ExpectedValue").val());
        var pRItemNumber = "";
        var accAsgn = "";
        if (accountAssignment !== "K") {
            if (gLAccount === "") {
                $("#gLAccountInp_Limits").css("border-color", "red");
                errorMsg = "Please enter GL Account.";
                Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                return false;
            }
        }

        if (accountAssignment === "D" || accountAssignment === "C") {

            if (salesOrder === "") {
                errorMsg = "Please enter Sales Order.";
                $("#salesOrderInp_Limits").css("border-color", "red");
                Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                return false;
            }

            if (itemNumber === "") {
                $("#itemNumberInp_Limits").css("border-color", "red");
                errorMsg = "Please enter Item Number.";
                Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                return false;
            }
        }


        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        saveLimitsTabData(itemCode, pRItemNumber, linkid);
        console.log("serviceLineItemNumber quantity :");
        var accAsgnString = gLAccount + "," + cOARea + "," + companyCode + "," + costCenter + "," + order + "," + asset + "," + WSElement + "," +
                salesOrder + "," + itemNumber + "," + delSchedule + "," + fund + "," + functionalArea + "," + fundCenter + "," + comItem + ","
                + nANumber + "," + itemCode + "," + pRItemNumber + "," + accAsgn + "," + expectedValue + "," + linkid;
        console.log("Limit accAsgnString: " + accAsgnString);
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveLimitAccAsgnData",
                "accAsgnString": accAsgnString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                $("#overlay").css("display", "none");
                Lobibox.alert("success", {
                    msg: "Data saved successfully "
                });
            }
        });
        var accountAssignmentCategory = $("#accountAssignmentCategory").val();
        if (accountAssignmentCategory === 'K') {
            accAsgnCat_K_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'N') {
            accAsgnCat_N_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'A') {
            accAsgnCat_A_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'B') {
            accAsgnCat_B_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'C') {
            accAsgnCat_C_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'D') {
            accAsgnCat_D_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'E') {
            accAsgnCat_E_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'F') {

            accAsgnCat_F_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'G') {
            accAsgnCat_G_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'M') {
            accAsgnCat_M_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'P') {
            accAsgnCat_P_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Q') {
            accAsgnCat_Q_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'R') {
            accAsgnCat_R_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'T') {
            accAsgnCat_T_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'U') {
            accAsgnCat_U_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'X') {
            accAsgnCat_X_Dist_SAA("serviceTableCheckbox");
        } else if (accountAssignmentCategory === 'Z') {
            accAsgnCat_Z_Dist_SAA("serviceTableCheckbox");
        }

    });
    function saveLimitsTabData(itemCode, pRItemNumber, linkid) {

        var overAllLimit = removeCommaInNumber($("#OverallLimit").val());
        var expectedValue = removeCommaInNumber($("#ExpectedValue").val());
//        var noLimit = $("#NoLimit").val();
        var noLimit = $("#InvoiceReceipt").prop("checked");
        var limitsString = overAllLimit + "," + expectedValue + "," + noLimit + "," + itemCode + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveLimitsTabData",
                "limitsString": limitsString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
//                $("#overlay").css("display", "none");
//                Lobibox.alert("success", {
//                    msg: "Data saved successfully "
//                });
            }
        });
    }
    $("#saveDeliverSch").click(function() {

        var deliverySchTblRow = "";
        var deliverySchTblRowString = "";
        //saurabh
        var total = "";
        var temp = 0;
        var isValid = "Yes";
        $("#DeliveryScheduleTableId tbody tr").each(function() {
            var delDateCat = $(this).find("td").eq(0).children(".deliveryDateCategory").val();
            var delDate = $(this).find("td").eq(1).children(".deliveryDateClass").val();
            var schQuantity = removeCommaInNumber($(this).find("td").eq(3).children(".scheduledQuantityClass").val());
            if (delDate === "" && delDate.toString().trim() === "")
            {
                $(this).find("td").eq(2).children(".deliveryDateClass").focus();
                Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please Enter Delivery Date!"
                });
                return false;
            }
            if (schQuantity === "" && schQuantity.toString().trim() === "")
            {
                $(this).find("td").eq(3).children(".scheduledQuantityClass").focus();
                isValid = "No";
                return false;
            }

            total = schQuantity;
            temp = Number(schQuantity) + Number(temp);
            var time = $(this).find("td").eq(4).children(".timeDeliveryScheduledClass").val();
            var purReqNumber = $(this).find("td").eq(5).children(".prNumberDeliveryScheduledClass").val();
            var reqItemNumber = $(this).find("td").eq(6).children(".reqItemNumberClass").val();
            if (purReqNumber === null) {
                purReqNumber = "";
            }
            if (reqItemNumber === null) {
                reqItemNumber = "";
            }
            var reqItemNum = $("#ItemNumberSelect").val();
            var pRItemNumber = "";
            var linkid = "";
            var insertionid = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === id) {
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                }

            });
            deliverySchTblRow = delDateCat + "," + delDate + "," + schQuantity + "," + time + "," + purReqNumber + "," + reqItemNumber.toString().trim() + "," + pRItemNumber + "," + linkid;
            deliverySchTblRowString = deliverySchTblRowString + deliverySchTblRow + "#";
            console.log("deliverySchTblRowString :" + deliverySchTblRowString);
        });
        console.log("Temp is ::" + temp);
        var Quantity = removeCommaInNumber($("#pOQuantity").val());
        console.log("Quantity is ::" + Quantity);
        if (isValid === "No") {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Enter Scheduled quantity!"
            });
            return false;
        }
//        alert("Number(Quantity) :" + Number(Quantity) + " ,Number(temp) :" + Number(temp));
        if (Number(Quantity) !== Number(temp)) {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Sum of scheduled quantity should be equal to PR Quantity!"
            });
            return false;
        }
        else
        {
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "saveDeliveryScheduleTblData",
                    "deliverySchTblRowString": deliverySchTblRowString,
                    "insertionOrderId": insertionid
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    $("#overlay").css("display", "none");
                    Lobibox.notify("success", {
                        rounded: true,
                        delayIndicator: false,
                        size: 'mini',
                        msg: "Data saved successfully"
                    });
                    $("#isDeliveryScheduleTabSaved").val("Yes");
                }
            });
        }
    });
    $("#saveDeliveryBtn").click(function() {

        var OverdelTol = $("#OverdeliveryTolerance").val();
        var UnderdelTol = $("#UnderdeliveryTolerance").val();
        var ShippingInstruction = $("#ShippingInstruction").val();
        var StockType = $("#StockType").val();
        var ValuationType = $("#ValuationType").val();
        var RemShelfLife = $("#RemShelfLife").val();
        var QAControlLife = $("#QAControlLife").val();
        var GRProcTime = $("#GRProcTime").val();
        var FirstRemender = $("#FirstReminderExpediter").val();
        var SecondRemender = $("#SecondReminderExpediter").val();
        var ThirdRemender = $("#ThirdReminderExpediter").val();
        var GoodsReceipt = $("#GoodsReceipt").prop("checked");
        var GrNonValuated = $("#GRNonValuated").prop("checked");
        var DelCompleted = $("#DelivCompleted").prop("checked");
        var NoExpend = $("#NoExpend").val();
        var PlDelTime = $("#PlDeliveryTime").val();
        var Incotems = $("#incoTermsPart2Delivery").val();
        var LineItemNum = $("#ItemNumberSelect").val();
        var pRItemNumber = "";
        var linkid = "";
        console.log("FirstRemender: " + FirstRemender);
        console.log("GRProcTime: " + GRProcTime);
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        console.log("GoodsReceipt :" + GoodsReceipt);
        console.log("GrNonValuated :" + GrNonValuated);
        console.log("LineItemNum :" + LineItemNum);
        if (GoodsReceipt === 'on') {
            GoodsReceipt = "true";
        }
        if (GrNonValuated === 'on') {
            GrNonValuated = "true";
        }
        if ($("#DelivCompleted").prop("checked")) {
            DelCompleted = "true";
        } else {
            DelCompleted = "false";
        }

        console.log("DelCompleted After :" + DelCompleted);
        var deliveryString = OverdelTol + "," + UnderdelTol + "," + ShippingInstruction + "," + StockType + "," + ValuationType + "," + RemShelfLife + ","
                + QAControlLife + "," + GRProcTime + "," + FirstRemender + "," + SecondRemender + "," + ThirdRemender + "," + GoodsReceipt + ","
                + GrNonValuated + "," + DelCompleted + "," + NoExpend + "," + PlDelTime + "," + Incotems + "," + LineItemNum + "," + pRItemNumber + ","
                + linkid;
        console.log("deliveryString: " + deliveryString);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveDeliveryTabData",
                "deliveryString": deliveryString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
            }
        });
    });
    $("#saveQuantityDatesBtn").click(function() {

        var POQuantity = $("#pOQuantity").val() !== "" ? removeCommaInNumber($("#pOQuantity").val()) : "";
        var Unit_POQuantity = $("#pOUnit").val();
        var POQuantityInSKU = $("#pOQuantitySKU").val() !== "" ? removeCommaInNumber($("#pOQuantitySKU").val()) : "";
        var Unit_POQuantityInSKU = $("#pOUnitSKU").val();
        var OrderUnit = $("#orderUnit").val() !== "" ? removeCommaInNumber($("#orderUnit").val()) : "";
        var Unit_OrderUnit = $("#unitOrderUnit").val();
        var OrderPriceUnit = $("#orderPriceUnit").val() !== "" ? removeCommaInNumber($("#orderPriceUnit").val()) : "";
        var Unit_OrderPriceUnit = $("#unitOrderPriceUnit").val();
        var OrderUnitSKU = $("#orderUnit2").val() !== "" ? removeCommaInNumber($("#orderUnit2").val()) : "";
        var Unit_OrderUnitSKU = $("#unitOrderUnit2").val();
        var SKU = $("#sKUUnit").val() !== "" ? removeCommaInNumber($("#sKUUnit").val()) : "";
        var Unit_SKU = $("#unitSKUUnit").val();
        var LineItemNum = $("#ItemNumberSelect").val();
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        console.log("POQuantity :" + POQuantity);
        console.log("Unit_POQuantity :" + Unit_POQuantity);
        console.log("LineItemNum :" + LineItemNum);
        if (POQuantity === "") {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Enter PO Quantity"
            });
            $("#pOQuantity").focus();
            return false;
        }
        if (Unit_POQuantity === "") {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Enter PO Unit"
            });
            $("#pOUnit").focus();
            return false;
        }

//        console.log("DelCompleted After :" + DelCompleted);

//
        var quantityString = POQuantity + "," + Unit_POQuantity + "," + POQuantityInSKU + "," + Unit_POQuantityInSKU + "," + OrderUnit + "," + Unit_OrderUnit + ","
                + OrderPriceUnit + "," + Unit_OrderPriceUnit + "," + OrderUnitSKU + "," + Unit_OrderUnitSKU + "," + SKU + "," + Unit_SKU + "," + LineItemNum
                + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveQuantityDates",
                "quantityString": quantityString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
            }
        });
    });
    $("#saveInvoiceBtn").click(function() {

        var InvoiceReceipt;
        var FinalInvoice;
        var GRBasedIV;
        var DPCategory = $("#DPCategory").val();
        var TaxCode = $("#TaxCode").val();
        var LineItemNum = $("#ItemNumberSelect").val();
//        var taxCodeDesc = $("#TaxCodeDescription").val();
        var taxCodeDesc = "";
        DPCategory = "";
        if (TaxCode === "") {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Select Tax Code!"
            });
            $("#TaxCode").focus();
            return false;
        }

        if ($("#InvoiceReceipt").prop("checked")) {
            InvoiceReceipt = "true";
        } else {
            InvoiceReceipt = "false";
        }
        if ($("#FinalInvoice").prop("checked")) {
            FinalInvoice = "true";
        } else {
            FinalInvoice = "false";
        }
        if ($("#GRBasedIV").prop("checked")) {
            GRBasedIV = "true";
        } else {
            GRBasedIV = "false";
        }
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        console.log("InvoiceReceipt :" + InvoiceReceipt);
        console.log("FinalInvoice :" + FinalInvoice);
        console.log("GRBasedIV :" + GRBasedIV);
        var invoiceString = InvoiceReceipt + "," + FinalInvoice + "," + GRBasedIV + "," + DPCategory + "," + TaxCode + "," + LineItemNum + "," +
                taxCodeDesc + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveInvoiceTabData",
                "invoiceString": invoiceString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
                $("#isInvoiceTabSaved").val("Yes");
            }
        });
    });
    $("#saveAccAsgnTblBtn").click(function() {

// Added by nikhil on 24-01-2020
        var POAccAssPartialInvoiceIndicator = $("#POAccAssPartialInvoiceIndicator").val();
        console.log("POAccAssPartialInvoiceIndicator :" + POAccAssPartialInvoiceIndicator);
        if (POAccAssPartialInvoiceIndicator === "")
        {
            POAccAssPartialInvoiceIndicator = "0";
        }
// End

        var accAsgnTblRow = "";
        var accAsgnTblRowString = "";
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            var quantity = removeCommaInNumber($(this).find("td").eq(1).children(".accAsgnQuantity").val());
            var percentage = $(this).find("td").eq(2).children(".accAsgnPercentage").val();
            var gLAccount = $(this).find("td").eq(3).children(".accAsgnGLAccount").val();
            var cOArea = $(this).find("td").eq(4).children(".accAsgnCOArea").val();
            var costCenter = $(this).find("td").eq(5).children(".accAsgnCostCetner").val();
            var fund = $(this).find("td").eq(6).children(".accAsgnFund").val();
            var funArea = $(this).find("td").eq(7).children(".accAsgnFunctionalArea").val();
            var fundCenter = $(this).find("td").eq(8).children(".accAsgnFundCenter").val();
            var commitmentItem = $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val();
            var unloadingPoint = $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").val();
            var recipients = $(this).find("td").eq(11).children(".accAsgnRecipients").val();
            var order = $(this).find("td").eq(12).children(".accAsgnOrder").val();
            var asset = $(this).find("td").eq(13).children(".accAsgnAssets").val();
            var wBSElement = $(this).find("td").eq(14).children(".accAsgnWBSElement").val();
            var salesOrder = $(this).find("td").eq(15).children(".accAsgnSalesOrder").val();
            var netActNumber = $(this).find("td").eq(16).children(".accAsgnNetActNumber").val();
            var itemNumber = $(this).find("td").eq(17).children(".accAsgnItemNumber").val();
            var deliverySch = $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").val();
            var linkNumber = $(this).find("td").eq(18).children(".accAsgnLinkNumber").val();
            var itemCode = $("#ItemNumberSelect").val();
            var accAsgnCat = $("#accountAssignmentCategory").val();
            var distribution = $("#distribution").val();
            if (distribution === 'Single Account Assignment') {
                distribution = "";
            } else if (distribution === 'Distrib. On Quantity Basis') {
                distribution = 1;
            } else if (distribution === 'Distrib. By Percentage') {
                distribution = 2;
            }
            var cOCode = $("#CoCode").val();
            var pRItemNumber = "";
            var linkid = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                    // Added by nikhil on 24-01-2020
                    $(this).find("td").eq(0).children(".PODistribution").val($("#distribution").val());
                    $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val($("#POAccAssPartialInvoiceIndicator").val());
                    // End
                }
            });
            if (deliverySch === 'undefined') {
                deliverySch = '';
            }

            accAsgnTblRow = quantity + "," + percentage + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + ","
                    + fundCenter + "," + commitmentItem + "," + unloadingPoint + "," + recipients + "," + order + "," + asset + "," + wBSElement + ","
                    + salesOrder + "," + netActNumber + "," + itemNumber + "," + deliverySch + "," + itemCode + "," + accAsgnCat + ","
                    + distribution + "," + cOCode + "," + linkNumber + "," + pRItemNumber + "," + linkid + "," + POAccAssPartialInvoiceIndicator;
            accAsgnTblRowString = accAsgnTblRowString + accAsgnTblRow + "#";
            console.log("accAsgnTblRowString :" + accAsgnTblRowString);
        });
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveAccAsgnTabTblData",
                "accAsgnTblRowString": accAsgnTblRowString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
                $("#isAccountAssignmentTabSaved").val("Yes");
            }
        });
    });
    $("#saveAccAsgnFieldBtn").click(function() {
//        var accAsgnRow = "";
        var accAsgnValString = "";
        var pRItemNumber = "";
        var quantity;
        var linkid = "";
        insertionid = $("#ItemNumberSelect").val();
        console.log("insertionid: " + insertionid);
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                // Added by nikhil on 24-01-2020
                $(this).find("td").eq(0).children(".PODistribution").val("");
                $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val($("#POAccAssPartialInvoiceIndicator").val());
                // End
            }
        });
        console.log("PRItemNumber: " + pRItemNumber);
//        var quantity = $(this).find("td").eq(1).children(".accAsgnQuantity").val();
//        var percentage = $(this).find("td").eq(2).children(".accAsgnPercentage").val();
        var percentage = "100.00";
        var gLAccount = $("#gLAccount").val();
        var cOArea = $("#coArea").val();
        var costCenter = $("#costCenterAccAsgn").val();
        var fund = $("#accAsgnfund").val();
        var funArea = $("#accAsgnfunctionalArea").val();
        var fundCenter = $("#accAsgnFundCenterInput").val();
        var commitmentItem = $("#accAsgnCommItemInput").val();
        var unloadingPoint = $("#unloadingPoint").val();
        var recipients = $("#recipient").val();
        var order = $("#accAsgnOrder").val();
        var asset = $("#accAsgnAsset").val();
        var wBSElement = $("#accAsgnWBSElementInput").val();
        var salesOrder = $("#accAsgnSalesOrder").val();
        var netActNumber = $("#accAsgnNActNumInput").val();
        var itemNumber = $("#assAsgnItemNumber").val();
        var deliverySch = $("#assAsgnDelivSch").val();
        var itemCode = $("#ItemNumberSelect").val();
        var accAsgnCat = $("#accountAssignmentCategory").val();
        var distribution = "";
        var cOCode = $("#CoCode").val();
        // Added by nikhil on 24-01-2020
        var POAccAssPartialInvoiceIndicator = $("#POAccAssPartialInvoiceIndicator").val();
        console.log("POAccAssPartialInvoiceIndicator :" + POAccAssPartialInvoiceIndicator);
        if (POAccAssPartialInvoiceIndicator === "")
        {
            POAccAssPartialInvoiceIndicator = "0";
        }
// End

        accAsgnValString = quantity + "," + percentage + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + ","
                + fundCenter + "," + commitmentItem + "," + unloadingPoint + "," + recipients + "," + order + "," + asset + "," + wBSElement + ","
                + salesOrder + "," + netActNumber + "," + itemNumber + "," + deliverySch + "," + itemCode + "," + accAsgnCat + ","
                + distribution + "," + cOCode + "," + pRItemNumber + "," + linkid + "," + POAccAssPartialInvoiceIndicator;
        console.log("accAsgnValString :" + accAsgnValString);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveAccAsgnTabFieldData",
                "accAsgnValString": accAsgnValString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
                $("#isAccountAssignmentTabSaved").val("Yes");
            }
        });
    });
    $("#saveTextTabBtn").click(function() {
        var ItemText = $("#ItemText").val();
        var InfoRecordPOText = $("#InfoRecordPOText").val();
        var MaterialPOText = $("#MaterialPOText").val();
        var PONoteToApprover = $("#PONoteToApprover").val();
        var DeliveryText = $("#DeliveryText").val();
        var LineItemNum = $("#ItemNumberSelect").val();
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        var textString = ItemText + "," + InfoRecordPOText + "," + MaterialPOText + "," + PONoteToApprover + "," + DeliveryText + "," + LineItemNum
                + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveTextTabData",
                "textString": textString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
            }
        });
    });
    $("#saveDeliveryAddressBtn").click(function() {

        var title = $("#Title").val();
        var name1 = $("#Name1").val();
        var name2 = $("#Name2").val();
        var street = $("#Street").val();
        var houseNo = $("#HouseNumber").val();
        var postalCode = $("#PostalCode").val();
        var city = $("#City").val();
        var country = $("#countryCode").val();
        var LineItemNum = $("#ItemNumberSelect").val();
        var countryDesc = $("#countryDesc").val();
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        var deliveryAddressString = title + "," + name1 + "," + name2 + "," + street + "," + houseNo + "," + postalCode + "," + city + ","
                + country + "," + LineItemNum + "," + countryDesc + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveDeliveryAddressTabData",
                "deliveryAddressString": deliveryAddressString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
            }
        });
    });
    $("#saveConfirmationsBtn").click(function() {
        var ConfControl = $("#confControlLimits").val();
        var OrderAck = $("#OrderAck").val();
//        if (ConfControl === "") {
//            Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: "Please Select Conf. Control!"
//            });
//            $("#confControlLimits").focus();
//            return false;
//        }

        var ConfReq = $("#ConfirmationRequired").prop("checked");
        var RejectionInd = $("#RejectionInd").prop("checked");
        console.log("ConfReq: " + ConfReq);
        console.log("RejectionInd: " + RejectionInd);
        var LineItemNum = $("#ItemNumberSelect").val();
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        var confirmationString = ConfControl + "," + OrderAck + "," + ConfReq + "," + RejectionInd + "," + LineItemNum + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveConfirmationsData",
                "confirmationString": confirmationString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
            }
        });
    });
    $("#saveConditionControlBtn").click(function() {
        var PrintPrice = $("#PrintPrice").prop("checked");
        var EstimatePrice = $("#EstimatedPrice").prop("checked");
        console.log("PrintPrice: " + PrintPrice);
        console.log("EstimatePrice: " + EstimatePrice);
        var LineItemNum = $("#ItemNumberSelect").val();
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        var conditionControlString = PrintPrice + "," + EstimatePrice + "," + LineItemNum + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveConditionControlData",
                "conditionControlString": conditionControlString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
            }
        });
    });
    $("#saveCustomerDataBtn").click(function() {
        var ProductOrigin = $("#ProductOriginLine").val();
        var Segment = $("#SegmentDescriptionLine").val();
        var LineItemNum = $("#ItemNumberSelect").val();
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        var customerDataString = ProductOrigin + "," + Segment + "," + LineItemNum + "," + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveCustomerData",
                "customerDataString": customerDataString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                Lobibox.notify("success", {
                    rounded: true,
                    delayIndicator: false,
                    size: 'mini',
                    msg: "Data saved successfully"
                });
            }
        });
    });
    $("#saveHeaderTextBtn").click(function() {
        var PONotesTOApprover = $("#pONotetoApproverHeaderTextsLimits").val();
        var HeaderNotes = $("#HeaderNote").val();
        var PricingTypes = $("#PricingTypes").val();
        var Deadlines = $("#Deadlines").val();
        var TermsofDelivery = $("#TermsofDelivery").val();
        var TermsofPayment = $("#TermsofPayment").val();
        var VendorMemoGeneral = $("#VendorMemoGeneral").val();
        var VendorMemoSpecial = $("#VendorMemoSpecial").val();
        var LineItemNum = $("#ItemNumberSelect").val();
        var shippingInstruction = $("#ShippingInstructions").val();
        if (PONotesTOApprover === "") {
            Lobibox.alert("error", {
                msg: "Please enter PO Note to Approver!"
            });
            return false;
        }

        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }
        });
        var headerTextString = PONotesTOApprover + "," + HeaderNotes + "," + PricingTypes + "," + Deadlines + "," + TermsofDelivery + ","
                + TermsofPayment + "," + VendorMemoGeneral + "," + VendorMemoSpecial + "," + LineItemNum + "," + shippingInstruction + ","
                + pRItemNumber + "," + linkid;
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveHeaderTextData",
                "headerTextString": headerTextString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                $("#overlay").css("display", "none");
                Lobibox.alert("success", {
                    msg: "Data saved successfully"
                });
            }
        });
    });
    var purchaseOrgTable = null;
    $("#purchasingOrg").click(function() {
        $("#PurchaseOrgModal").modal("show");
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getAllPurchaseOrg"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='checkPurchaseOrgClass'></td>"
                            + "<td>" + obj[i].PURCHASE_ORG_CODE + "</td>"
                            + "<td>" + obj[i].DESC + "</td>"
                            + "</tr>";
                }
                $("#puechaseOrgTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#puechaseOrgTableId')) {
                    purchaseOrgTable.destroy();
                    purchaseOrgTable = null;
                    $("#puechaseOrgTableId").children('tbody').html(row);
                    purchaseOrgTable = $('table.purchaseOrgTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    purchaseOrgTable.buttons().container()
                            .appendTo('#puechaseOrgTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#puechaseOrgTableId thead tr').clone(true).appendTo('#puechaseOrgTableId thead');
                    $('#puechaseOrgTableId thead tr:eq(1) th').each(function(i) {
                        $('#puechaseOrgTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (purchaseOrgTable.column(i).search() !== this.value) {
                                purchaseOrgTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    purchaseOrgTable = $('table.purchaseOrgTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    purchaseOrgTable.buttons().container()
                            .appendTo('#puechaseOrgTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    });
    $("#puechaseOrgTableId").on("click", ".checkPurchaseOrgClass", function() {
        var code = $(this).parent().parent().find("td").eq(1).text();
        $("#purchasingOrg").val(code);
        $("#PurchaseOrgModal").modal("hide");
        var sno = $("#vendorSno").val(); // $("#vendorcodeHeader :selected").val();
        if (sno !== "" && code !== "") {
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data:
                        {
                            "reqFrom": "getVendorBySno",
                            "sno": sno
                        },
                dataType: "json",
                complete: function(responseJson)
                {
                    var obj = $.parseJSON(responseJson.responseText);
                    var SchemaGroup = obj.SCHEMA_GROUP;
//                var orgData = $("#purchasingOrg").val()
                    if (SchemaGroup === 'Z1' && code === '640') {
                        pricingprocedure = 'ZM0000';
                    } else if (SchemaGroup === 'Z2' && code === '640') {
                        pricingprocedure = 'ZM0002';
                    } else if (SchemaGroup === 'Z1' && code === '680') {
                        pricingprocedure = 'ZM0004';
                    } else if (SchemaGroup === 'Z2' && code === '680') {
                        pricingprocedure = 'ZM0005';
                    }
                    getAllByPricingProcedure(pricingprocedure);
                }
            });
        }
    });
    $("#salesOrderProfitabilitySegment").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            $("#ro_SalesOrder").val("ProfitabilitySegment");
        }
    });
    var salesOrderTeble = null;
    function salesOrderFunction() {
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getSalesOrder"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='checkSalesOrderClass'></td>"
                            + "<td>" + obj[i].SONUMBER + "</td>"
//                            + "<td>" + obj[i].ITEM + "</td>"
                            + "</tr>";
                }
                $("#salesOrderTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#salesOrderTableId')) {
                    salesOrderTeble.destroy();
                    salesOrderTeble = null;
                    $("#salesOrderTableId").children('tbody').html(row);
                    salesOrderTeble = $('table.salesOrderTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    salesOrderTeble.buttons().container()
                            .appendTo('#salesOrderTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#salesOrderTableId thead tr').clone(true).appendTo('#salesOrderTableId thead');
                    $('#salesOrderTableId thead tr:eq(1) th').each(function(i) {
                        $('#salesOrderTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (salesOrderTeble.column(i).search() !== this.value) {
                                salesOrderTeble
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    salesOrderTeble = $('table.salesOrderTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    salesOrderTeble.buttons().container()
                            .appendTo('#salesOrderTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#salesOrderTableId").on("click", ".checkSalesOrderClass", function() {
        var salesOrder = $(this).parent().parent().find("td").eq(1).text();
        var reqFrom = $("#ro_SalesOrder").val();
        if (reqFrom === "ProfitabilitySegment") {
            $("#salesOrderProfitabilitySegment").val(salesOrder);
        } else if (reqFrom === "AccountAssignmentTabField") {
            $("#accAsgnSalesOrder").val(salesOrder);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (reqFrom === "AccountAssignmentTable") {
            accAsgnCurrentTd.val(salesOrder);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (reqFrom === "ServiceAccountAssignmentTabField") {
            $("#SalesOrderService").val(salesOrder);
            $("#SalesOrderService").css("border-color", "");
        } else if (reqFrom === 'ServiceAccountAssignmentTable') {
            accAsgnCurrentTd.val(salesOrder);
            accAsgnCurrentTd.css("border-color", "");
        } else if (reqFrom === "LimitAccountAssignmentTabField") {
            $("#salesOrderInp_Limits").val(salesOrder);
            $("#salesOrderInp_Limits").css("border-color", "");
        } else if (reqFrom === 'LimitAccountAssignmentTable') {
            accAsgnCurrentTd.val(salesOrder);
            accAsgnCurrentTd.css("border-color", "");
        }
        $("#SalesOrderModal").modal("hide");
    });
    $("#itemNumberProfitabilitySegment").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            $("#ro_ItemNumber").val("ProfitabilitySegment");
        }
    });
    var itemNumberTeble = null;
    function itemNumberFunction() {
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getItemNumber"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='checkItemNumberClass'></td>"
                            + "<td>" + obj[i].ITEM + "</td>"
//                            + "<td>" + obj[i].ITEM + "</td>"
                            + "</tr>";
                }
                $("#itemNumberTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#itemNumberTableId')) {
                    itemNumberTeble.destroy();
                    itemNumberTeble = null;
                    $("#itemNumberTableId").children('tbody').html(row);
                    itemNumberTeble = $('table.itemNumberTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemNumberTeble.buttons().container()
                            .appendTo('#itemNumberTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#itemNumberTableId thead tr').clone(true).appendTo('#itemNumberTableId thead');
                    $('#itemNumberTableId thead tr:eq(1) th').each(function(i) {
                        $('#itemNumberTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (itemNumberTeble.column(i).search() !== this.value) {
                                itemNumberTeble
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    itemNumberTeble = $('table.itemNumberTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemNumberTeble.buttons().container()
                            .appendTo('#itemNumberTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#itemNumberTableId").on("click", ".checkItemNumberClass", function() {
        var itemNumber = $(this).parent().parent().find("td").eq(1).text();
        var reqFrom = $("#ro_ItemNumber").val();
        if (reqFrom === "ProfitabilitySegment") {
            $("#itemNumberProfitabilitySegment").val(itemNumber);
        } else if (reqFrom === "AccountAssignmentTabField") {
            $("#assAsgnItemNumber").val(itemNumber);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (reqFrom === "AccountAssignmentTable") {
            accAsgnCurrentTd.val(itemNumber);
            saveAccountAssignmentTabDataOnLoadFieldChange();
        } else if (reqFrom === 'ServiceAccountAssignmentTabField') {
            $("#ItemNumberService").val(itemNumber);
            $("#ItemNumberService").css("border-color", "");
        } else if (reqFrom === "ServiceAccountAssignmentTable") {
            accAsgnCurrentTd.val(itemNumber);
            accAsgnCurrentTd.css("border-color", "");
        } else if (reqFrom === "LimitAccountAssignmentTabField") {
            $("#itemNumberInp_Limits").val(itemNumber);
            $("#itemNumberInp_Limits").css("border-color", "");
        } else if (reqFrom === "LimitAccountAssignmentTable") {
            accAsgnCurrentTd.val(itemNumber);
            accAsgnCurrentTd.css("border-color", "");
        }
        $("#ItemNumberModal").modal("hide");
    });
    $("#accAsgnSalesOrder").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            $("#ro_SalesOrder").val("AccountAssignmentTabField");
        }
    });
    $("#assAsgnItemNumber").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            $("#ro_ItemNumber").val("AccountAssignmentTabField");
        }
    });
    var accAsgnCurrentTd = "";
    $("#costCenteraccountAssignmentTebleId").on("keypress", ".accAsgnSalesOrder", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            accAsgnCurrentTd = $(this);
            salesOrderCurrent = $(this);
            $("#ro_SalesOrder").val("AccountAssignmentTable");
        }
    });
    $("#costCenteraccountAssignmentTebleId").on("keypress", ".accAsgnItemNumber", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            accAsgnCurrentTd = $(this);
            itemNumberCurrent = $(this);
            $("#ro_ItemNumber").val("AccountAssignmentTable");
        }
    });
    $("#SalesOrderService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            $("#ro_SalesOrder").val("ServiceAccountAssignmentTabField");
        }
    });
    $("#ItemNumberService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            $("#ro_ItemNumber").val("ServiceAccountAssignmentTabField");
        }
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblSalesOrder", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            accAsgnCurrentTd = $(this);
            salesOrderCurrent = $(this);
            $("#ro_SalesOrder").val("ServiceAccountAssignmentTable");
        }
    });
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblItemNumber", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            accAsgnCurrentTd = $(this);
            itemNumberCurrent = $(this);
            $("#ro_ItemNumber").val("ServiceAccountAssignmentTable");
        }
    });
    $("#salesOrderInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            $("#ro_SalesOrder").val("LimitAccountAssignmentTabField");
        }
    });
    $("#itemNumberInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            $("#ro_ItemNumber").val("LimitAccountAssignmentTabField");
        }
    });
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblSalesOrder", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            accAsgnCurrentTd = $(this);
            salesOrderCurrent = $(this);
            $("#ro_SalesOrder").val("LimitAccountAssignmentTable");
        }
    });
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblItemNumber", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            accAsgnCurrentTd = $(this);
            itemNumberCurrent = $(this);
            $("#ro_ItemNumber").val("LimitAccountAssignmentTable");
        }
    });
    $("#uploadSignedPOCopyBtn").click(function() {
        $("#uploadSignedPOCopyModal").modal("show");
    });
    
    function getTaxResponse(xmlsap) {
        var xmlString = XMLToString(xmlsap); //Convert the XML Object to a String
        var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

//        var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//                + "<POTaxCalcOP>"
//                + "<Message>" + 'Success' + "</Message>"
//                + "<TaxAmnt>" + 10 + "</TaxAmnt>"
//                + "</POTaxCalcOP>";
//        var xmlDoc = $.parseXML(xmlString);

        var $xml = $(xmlDoc);
        var TaxAmnt = $xml.find('TaxAmnt');
        var Message = $xml.find('Message');
        var TaxAmnt = TaxAmnt.text();
        var msg = Message.text();
        console.log("TaxAmnt: " + TaxAmnt);
        console.log("Message: " + msg);
//        var PBXXCondValue = currentCondTabTr

        var message = "";
//        if (TaxAmnt.toString().trim() !== "" && Number(TaxAmnt) === 0)
//        {
//            message = msg + " and PO Number is " + TaxAmnt;
//            Lobibox.alert("success", {
//                msg: message
//            });
//        }
//        else
//        {
//            message = msg;
//            Lobibox.alert("error", {
//                msg: message
//            });
//        }

        return TaxAmnt;
    }
    function XMLToString(oXML)
    {
//code for IE

        if (window.ActiveXObject) {
            var oString = oXML.xml;
            return oString;
        }
// code for Chrome, Safari, Firefox, Opera, etc.
        else {
            return (new XMLSerializer()).serializeToString(oXML);
        }
    }

    $("#componentAddRowBtn").click(function() {
        var row = "";
        var material = "";
        var plant = "";
        var reqDate = "";
        var latestReqDate = "";
        var itemNumber = "";
        var desc = "";
        var unit = "";
        var stLoc = "";
        $("#componentTableIdLineLevel tbody tr").each(function(index) {
            if (index === 0)
            {
                material = $(this).find("td").eq(0).children(".comMaterial").val();
                desc = $(this).find("td").eq(1).children(".comDescription").val();
                plant = $(this).find("td").eq(2).children(".comPlant").val();
                unit = $(this).find("td").eq(3).children(".comUnit").val();
                stLoc = $(this).find("td").eq(5).children(".comProdStorageLoc").val();
                reqDate = $(this).find("td").eq(7).children(".comRequirementDate").val();
                latestReqDate = $(this).find("td").eq(9).children(".compLatestReqDate").val();
                itemNumber = $(this).find("td").eq(11).children(".compItemNo").val();
                return;
            }
        });
        row = "<tr><td>"
                + '<input type="hidden" class="changeId" value=""><input type="text" class="form-control form-rounded input-height comMaterial" value="' + material + '" style="width:150px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comDescription" value="' + desc + '" style="width:200px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comPlant" value="' + plant + '" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comUnit" value="' + unit + '" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comQuantity" value="" style="width:150px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comProdStorageLoc" value="' + stLoc + '" style="width:150px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comSupplyArea" value="" style="width:150px;">' + "</td><td>"
                + '<input type="text" readonly class="form-control form-rounded input-height comRequirementDate" value="' + reqDate + '" style="width:150px;display: inline;"> <input type="hidden" class="compReqDatepicker">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height compQtyIsFixed" value="" style="width:100px;">' + "</td><td>"
                + '<input type="text" readonly class="form-control form-rounded input-height compLatestReqDate" value="' + latestReqDate + '" style="width:150px;display: inline;"> <input type="hidden" class="compLatestReqDatepicker">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height compDistKey" value="" style="width:150px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height compItemNo" value="' + itemNumber + '" readonly="true" style="width:80px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height compBatch" value="" style="width:150px;">' + "</td><td>"
                + '<i title="Delete Row" class="fa fa-window-close btn-lg componentDeleteTebleRow" aria-hidden="true"></i>'
                + "</td></tr>";
        $("#componentTableIdLineLevel tbody").append(row);
        refreshCompLatestReqDatepicker();
        refreshCompReqDatepicker();
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("click", ".componentDeleteTebleRow", function() {
        $(this).parent().parent().remove();
        saveComponentTblDataOnLoadFieldChange();
    });
    var componentTabCurrentLoc = "";
//    $("#componentTableIdLineLevel").on("click", ".comMaterial", function() {
//        $("#materialRequestFrom").val("FromComponentTab");
//        componentTabCurrentLoc = $(this).parent().parent();
//    });
    var materialCodeTable = '';
    function getAllMasterMaterialGeneral() {

        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllMasterMaterialGeneral",
                "companyCode": $("#companycodeHeader").val()
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
//                            + "<td><input type='checkbox' class='checkRefDocTableClass'></td>"
                            + "<td>" + obj[i].MATERIALCODE + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "<td>" + obj[i].STORAGE_LOCATION + "</td>"
                            + "</tr>";
                }
                $("#materailTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#materailTableId')) {
                    materialCodeTable.destroy();
                    materialCodeTable = null;
                    $("#materailTableId").children('tbody').html(row);
                    materialCodeTable = $('table.materialCheckboxClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    materialCodeTable.buttons().container()
                            .appendTo('#materailTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#materailTableId thead tr').clone(true).appendTo('#materailTableId thead');
                    $('#materailTableId thead tr:eq(1) th').each(function(i) {
                        $('#materailTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (materialCodeTable.column(i).search() !== this.value) {
                                materialCodeTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    materialCodeTable = $('table.materialCheckboxClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    materialCodeTable.buttons().container()
                            .appendTo('#materailTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#materailTableId tbody").on("click", "tr", function() {
        var material = $(this).find("td").eq(0).text();
        var description = $(this).find("td").eq(1).text();
        var storageLoc = $(this).find("td").eq(2).text();
        componentTabCurrentLoc.find("td").eq(0).children(".comMaterial").val(material);
        componentTabCurrentLoc.find("td").eq(1).children(".comDescription").val(description);
        componentTabCurrentLoc.find("td").eq(5).children(".comProdStorageLoc").val(storageLoc);
        saveComponentTblDataOnLoadFieldChange();
        $("#MaterialCodeModal").modal("hide");
    });
    $("#componentTableIdLineLevel").on("keypress", ".comPlant", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#componentsModal").modal("hide");
            $("#PlantModal").modal("show");
            componentTabCurrentLoc = $(this).parent().parent();
            plantComponentCurrent = $(this).parent().parent();
            getAllMasterPlant();
        }
    });
    var plantTable = '';
    function getAllMasterPlant() {

        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllMasterPlant"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
//                            + "<td><input type='checkbox' class='checkRefDocTableClass'></td>"
                            + "<td>" + obj[i].PLANT + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }
                $("#plantTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#plantTableId')) {
                    plantTable.destroy();
                    plantTable = null;
                    $("#plantTableId").children('tbody').html(row);
                    plantTable = $('table.plantTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    plantTable.buttons().container()
                            .appendTo('#plantTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#plantTableId thead tr').clone(true).appendTo('#plantTableId thead');
                    $('#plantTableId thead tr:eq(1) th').each(function(i) {
                        $('#plantTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (plantTable.column(i).search() !== this.value) {
                                plantTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    plantTable = $('table.plantTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    plantTable.buttons().container()
                            .appendTo('#plantTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#plantTableId tbody").on("click", "tr", function() {
        var plantcode = $(this).find("td").eq("0").text();
        componentTabCurrentLoc.find("td").eq(2).children(".comPlant").val(plantcode);
        saveComponentTblDataOnLoadFieldChange();
        $("#PlantModal").modal("hide");
        $("#componentsModal").modal("show");
        $("#componentsModal").css({
            "padding-right": 430,
            "padding-left": 0,
            "padding-top": 70
        });
    });
    $("#componentSaveBtn").click(function() {
        var componentTblRow = "";
        var componentRowString = "";
        var pRItemNumber = "";
        var linkid = "";
        $("#componentTableIdLineLevel tbody tr").each(function() {
            var material = $(this).find("td").eq(0).children(".comMaterial ").val();
            var description = $(this).find("td").eq(1).children(".comDescription").val();
            var plant = $(this).find("td").eq(2).children(".comPlant").val();
            var unit = $(this).find("td").eq(3).children(".comUnit").val();
            var quantity = removeCommaInNumber($(this).find("td").eq(4).children(".comQuantity").val());
            var prodStorageLoc = $(this).find("td").eq(5).children(".comProdStorageLoc").val();
            var supplyArea = $(this).find("td").eq(6).children(".comSupplyArea").val();
            var reqDate = $(this).find("td").eq(7).children(".comRequirementDate").val();
            var lineItemNum = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                }
            });
            componentTblRow = material + "," + description + "," + plant + "," + unit + "," + quantity + "," + prodStorageLoc + "," +
                    supplyArea + "," + reqDate + "," + lineItemNum + "," + pRItemNumber + "," + linkid;
            componentRowString = componentRowString + componentTblRow + "#";
            console.log("componentRowString :" + componentRowString);
        });
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveComponentTblData",
                "componentRowString": componentRowString
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
                $("#overlay").css("display", "none");
                Lobibox.alert("success", {
                    msg: "Data saved successfully "
                });
            }
        });
    });
    $("#CustomerCode").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CustomerCodeModal").modal("show");
    //        $("#profitabilitySegmentModal").modal("hide");
            getAllCustomerSeeded();
            $("#customerSeeded").val("CustomerCode");
        }
    });
    var customerCodeTable = "";
    function getAllCustomerSeeded() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllCustomerSeeded"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td>" + obj[i].CUSTOMER_CODE + "</td>"
                            + "<td>" + obj[i].FIRST_NAME + " " + obj[i].FIRST_NAME + "</td>"
                            + "<td>" + obj[i].EMAILID + "</td>"
                            + "</tr>";
                }
                $("#customerCodeTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#customerCodeTableId')) {
                    customerCodeTable.destroy();
                    customerCodeTable = null;
                    $("#customerCodeTableId").children('tbody').html(row);
                    customerCodeTable = $('table.customerCodeTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    customerCodeTable.buttons().container()
                            .appendTo('#customerCodeTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#customerCodeTableId thead tr').clone(true).appendTo('#customerCodeTableId thead');
                    $('#customerCodeTableId thead tr:eq(1) th').each(function(i) {
                        $('#customerCodeTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (customerCodeTable.column(i).search() !== this.value) {
                                customerCodeTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    customerCodeTable = $('table.customerCodeTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    customerCodeTable.buttons().container()
                            .appendTo('#customerCodeTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#customerCodeTableId tbody").on("click", "tr", function() {
        var customerCode = $(this).find("td").eq(0).text();
        var reqType = $("#customerSeeded").val();
        if (reqType === "CustomerCode") {
            $("#CustomerCode").val(customerCode);
        } else if (reqType === "ProjectNumber1") {
            $("#ProjectNumber1").val(customerCode);
        } else if (reqType === "ShipToParty") {
            $("#ShipToParty").val(customerCode);
        }
        $("#CustomerCodeModal").modal("hide");
//        $("#profitabilitySegmentModal").css({
//            "padding-right": 430,
//            "padding-left": 0
//        });
        $("#profitabilitySegmentModal").modal("show");
    });
    $("#ProjectNumber1").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CustomerCodeModal").modal("show");
            getAllCustomerSeeded();
            $("#customerSeeded").val("ProjectNumber1");
        }
    });
    $("#ShipToParty").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CustomerCodeModal").modal("show");
            getAllCustomerSeeded();
            $("#customerSeeded").val("ShipToParty");
        }
    });
    $("#addRowPartnersBtnId").click(function() {
        var row;
        row = "<tr>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height TabPartnerFunction">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height TabPartnerFunctionName" readonly>' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height TabPartnerNumber">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height TabPartnerFunctionVendorName" readonly>' + "</td>\n\
            <td>" + '<i title="Delete Row" class="fa fa-window-close btn-lg deletePartnersRow" aria-hidden="true" style="width:10px;padding: 0px 8px;"></i>'
                + "</td></tr>";
        $("#partnerTableId tbody").append(row);
    });
    $("#partnerTableId").on("click", ".deletePartnersRow", function() {

        $(this).parent().parent().remove();
    });
    var partnerFunctionTabTableCurrentTr = '';
    $("#partnerTableId").on("click", ".TabPartnerFunction", function() {
        partnerFunctionTabTableCurrentTr = $(this).parent().parent();
        $("#PartnerFunctionModal").modal("show");
        getAllMasterPartnerFunctions();
    });
    var partnerFunctionTable = "";
    function getAllMasterPartnerFunctions() {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "FindAllMasterPartnerFunctions"
            },
            complete: function(responseJson) {
                var jsonPartnerFunctionArr = $.parseJSON(responseJson.responseText);
                console.log("jsonPartnerFunctionArr lengtth :" + jsonPartnerFunctionArr.length);
                jsonPartnerFunctionArr = JSON.parse(JSON.stringify(jsonPartnerFunctionArr));
                var row = "";
                for (var i = 0; i < jsonPartnerFunctionArr.length; i++) {
                    row += "<tr class='partnerFunctionModalTableTr'>"
                            + "<td>" + jsonPartnerFunctionArr[i].partnerFunction + "</td>"
                            + "<td>" + jsonPartnerFunctionArr[i].functionName + "</td>"
                            + "</tr>";
                }
                $("#partnerFunctionTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#partnerFunctionTable')) {
                    partnerFunctionTable.destroy();
                    partnerFunctionTable = null;
                    $("#partnerFunctionTable").children('tbody').html(row);
                    partnerFunctionTable = $('table.partnerFunctionTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    partnerFunctionTable.buttons().container()
                            .appendTo('#partnerFunctionTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#partnerFunctionTable thead tr').clone(true).appendTo('#partnerFunctionTable thead');
                    $('#partnerFunctionTable thead tr:eq(1) th').each(function(i) {
                        $('#partnerFunctionTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (partnerFunctionTable.column(i).search() !== this.value) {
                                partnerFunctionTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    partnerFunctionTable = $('table.partnerFunctionTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    partnerFunctionTable.buttons().container()
                            .appendTo('#partnerFunctionTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#partnerFunctionTable").on("click", ".partnerFunctionModalTableTr", function() {
        var partnerFunction = $(this).find("td").eq(0).text();
        var partnerFunctionName = $(this).find("td").eq(1).text();
        partnerFunctionTabTableCurrentTr.find("td").eq(0).children(".TabPartnerFunction").val(partnerFunction);
        partnerFunctionTabTableCurrentTr.find("td").eq(1).children(".TabPartnerFunctionName").val(partnerFunctionName);
        $("#PartnerFunctionModal").modal("hide");
    });
    $("#vendorCondition").click(function() {
        partnerFunctionTabTableCurrentTr = $(this).parent().parent();
        $("#overlay").css("display", "block");
        var companyCodeHeader = $("#companycodeHeader").val();
        findVendorByCompanyCode(companyCodeHeader);
        $("#conditiondetailsModal").modal("hide");
    });
    var vendorMaster = "";
    function findVendorByCompanyCode(companyCodeHeader) {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "FindVendorByCompanyCode",
                "companyCode": companyCodeHeader
            },
            complete: function(responseJson) {
                var jsonVendorArr = $.parseJSON(responseJson.responseText);
                console.log("jsonVendorArr lengtth :" + jsonVendorArr.length);
                jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));
                var row = "";
                $("#vendorMasterModalTable tbody tr").remove();
                for (var i = 0; i < jsonVendorArr.length; i++) {
                    row += "<tr class='vendorMasterModalTableTr'>"
                            + "<td>" + jsonVendorArr[i].vendorCode + "</td>"
                            + "<td>" + jsonVendorArr[i].vendorName + "</td>"
                            + "</tr>";
                }

                $("#vendorMasterModalTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#vendorMasterModalTable')) {
                    vendorMaster.destroy();
                    vendorMaster = null;
                    $("#vendorMasterModalTable").children('tbody').html(row);
                    vendorMaster = $('table.vendorMasterModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    vendorMaster.buttons().container()
                            .appendTo('#vendorMasterModalTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#vendorMasterModalTable thead tr').clone(true).appendTo('#vendorMasterModalTable thead');
                    $('#vendorMasterModalTable thead tr:eq(1) th').each(function(i) {
                        $('#vendorMasterModalTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (vendorMaster.column(i).search() !== this.value) {
                                vendorMaster
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    vendorMaster = $('table.vendorMasterModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    vendorMaster.buttons().container()
                            .appendTo('#vendorMasterModalTable_wrapper .col-md-6:eq(0)');
                }
                $("#VendorMasterModal").modal("show");
                $("#overlay").css("display", "none");
            }
        });
    }

    $("#vendorMasterModalTable").on("click", ".vendorMasterModalTableTr", function() {
        var vendorCode = $(this).find("td").eq(0).text();
        var vendorName = $(this).find("td").eq(1).text();
        conditionTableCurrentClick.parent().parent().find("td").eq(0).children(".conditionVendor").val(vendorCode);
        $("#vendorCondition").val(vendorCode);
//        partnerFunctionTabTableCurrentTr.find("td").eq(2).children(".TabPartnerNumber").val(vendorCode);
//        partnerFunctionTabTableCurrentTr.find("td").eq(3).children(".TabPartnerFunctionVendorName").val(vendorName);
        $("#VendorMasterModal").modal("hide");
        $("#conditiondetailsModal").modal("show");
        saveConditionTabDataOnLoadFieldChange("");
    });
    var RequestType = $("#RequestType").val();
    if (RequestType === "CreatePO")
    {
        $("#material_headerClass tbody tr").each(function(index) {
            console.log("index: " + index);
            if (index === 0)
            {
                var CompCode = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
                //saurabh                
//                var currency = document.getElementById("material_headerClass");
//                var currencyObtain = currency.rows[1].cells[10].innerHTML;
                var currencyObtain = $(this).find("td").eq(13).children(".currencyClass").val();
                //document.getElementById("CurrencyDeliveryInvoice").innerHTML = currencyObtain;

                console.log("CompCode: " + CompCode);
                console.log("currency: " + currencyObtain);
                $("#companycodeHeader").val(CompCode);
                var fromCurrency = "";
//                alert("CompCode :" + CompCode);
                if (CompCode === "0640" || CompCode === "0641")
                {
                    fromCurrency = "SGD";
                    $("#CurrencyDeliveryInvoice").val(fromCurrency);

                }
                else if (CompCode === "0680")
                {
                    fromCurrency = "MYR";
                    $("#CurrencyDeliveryInvoice").val(fromCurrency);
                }
                $("#CoCode").val(CompCode);
//                $("#CurrencyDeliveryInvoice").val(currencyObtain);
//                $("#CurrencyDeliveryInvoice").prop("disabled", true);
//                $("#ExchangeRate").prop("disabled", true);
                $("#ExchangeReateFixed").prop("disabled", true);
                $.ajax({
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data: {"reqFrom": "getFundFMAreaByComCode",
                        "companyCode": companycode
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("FUND :" + obj.FUND);
                        var fund = obj.FUND;
                        $("#interCompanyFund").val(fund);
                    }
                });
            }
            else
            {
                return;
            }
        });

        if (PrType === "Service") {
            $("#material_headerClass tbody tr").each(function() {
                saveQtyWeightsWhenPOType_Service_Or_OrderUnit_Blank($(this));
            });
        } else if (PrType === "Material" && $("#draftPo").val() !== "Yes") {
            $("#material_headerClass tbody tr").each(function() {
                var materialCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                var infoRecordJsonObj = fetchInfoRecordDetails(materialCode, "PR");
                console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));
                var jsonArray = uOMPopulation($(this), infoRecordJsonObj);
                setPoLineDetailsFromInfoRecord(infoRecordJsonObj, $(this));
                if (jsonArray.length !== 0) {
                    saveQtyWeightsWhenPOType_Material_Or_OrderUnit_NotBlank(jsonArray, $(this), infoRecordJsonObj);
                }
            });
        }
        /*UOM population on RFQ Addition code by Bittu End*/
    }

    var companyCodeHeader = $("#companycodeHeader").val();
    if (RequestType === "CreatePO")
    {
        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "FindVendorByCompanyCode",
                "companyCode": companyCodeHeader
            },
            beforeSend: function() {
                $("#overlay").css("display", "block");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "block");
                var jsonVendorArr = $.parseJSON(responseJson.responseText);
                console.log("jsonVendorArr lengtth :" + jsonVendorArr.length);
                jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));
                var vendorCompanyCode = $("#vendorCompanyCode").val();
                console.log("vendorCompanyCode 1: " + vendorCompanyCode);
                var vendorSno = "";
                if (jsonVendorArr.length !== 0) {
                    setTimeout(function() {
//                        var option = "";
                        for (var i = 0; i < jsonVendorArr.length; i++) {
                            if (vendorCompanyCode.toString() === jsonVendorArr[i].vendorCode.toString())
                            {
                                console.log("Inside If=====");
                                console.log("jsonVendorArr[i].sno: " + jsonVendorArr[i].sno);
                                vendorSno = jsonVendorArr[i].sno;
                                console.log("vendorSno: " + vendorSno);
                                
                                $("#vendorSno").val(vendorSno);
                                $("#vendorcodeHeader").val(jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode);
                            }
//                            option += "<option value='" + jsonVendorArr[i].sno + "'>" + jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode + "</option>";
                        }
//                        $("#vendorcodeHeader").append(option);
//                        $('.selectpicker').selectpicker('refresh');
                    }, 100);
                }
                console.log("vendorCompanyCode 2: " + vendorCompanyCode);
                console.log("vendorSno: " + vendorSno);
                if ($("#draftPo").val() === "Yes") {
                    setDraftPoDetailsOnForm();
                }
                $("#overlay").css("display", "none");
                if (vendorCompanyCode !== "")
                {
                    $("#overlay").css("display", "block");
                    Lobibox.notify("info", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Please wait, fetching conditions..."
                    });
                    setTimeout(function()
                    {
                        $.ajax({
                            type: "GET",
                            url: "ajaxcontroller.do",
                            async: false,
                            data:
                                    {
                                        "reqFrom": "findMasterVendorByVendorCode",
                                        "vendorCode": vendorCompanyCode
                                    },
                            dataType: "json",
                            complete: function(responseJson)
                            {
                                var obj = $.parseJSON(responseJson.responseText);
                                console.log("obj.VENDORCODE: " + obj.VENDORCODE);
//                                var option = "";
//                                option += "<option value='" + obj.SNO + "'>" + obj.VENDORNAME + "-" + obj.VENDORCODE + "</option>";
//                                $("#vendorcodeHeader").append(option);
//                                $('.selectpicker').selectpicker('refresh');
//                                $("#vendorcodeHeader").val(vendorSno);
//                                $('.selectpicker').selectpicker('refresh');
                                $("#vendorcodeHeader").prop("disabled", true);
                                
                                $("#postalCodeVendorAddress").val(obj.POSTAL_CODE);
                                $("#cityVendorAddress").val(obj.CITY);
                                $("#telephoneVendorAddress").val(obj.CONTACT_NO);
                                $("#countryVendorAddress").val(obj.COUNTRY);
                                $("#countryCodeVendorAddress").val(obj.COUNTRY_CODE);
                                $("#purchasingOrg").val(obj.PURCHASE_ORG);
                                $("#paymentTermsDelivery").val(obj.PAYMENTTERM);
                                $("#streetVendorAddress").val(obj.STREET);
                                $("#houseNumberVendorAddress").val(obj.ADDRESS1 + ", " + obj.ADDRESS2 + ", " + obj.ADDRESS3);
                                $("#extFax").val(obj.FAX_EXT);
                                $("#faxVendorAddress").val(obj.FAX_NO);
                                $("#vendorEmail").val(obj.EMAILID);
                                $("#IncoTermsPart1").val(obj.INCO_TERM1);
                                $("#IncoTermsPart2").val(obj.INCO_TERM2);
                                var kalsm = obj.kalsm;
                                console.log("kalsm: " + kalsm);
                                $("#conditionHeaderReqFrom").val("VendorChange");
                                getAllByPricingProcedure(kalsm);
                                var PoFrom = $("#PoFrom").val();
                                if (PoFrom === "byrfq") {
                                    deleteAllConditionsOnLoad();
                                    saveConditionTabDataOnLoadFieldChange("Onload");
                                }

                                $("#kalsmHiddenfield").val(obj.kalsm);
                                if (obj.PAYMENTTERM !== "")
                                {
                                    var xmlInput = "<POPaymentTermsIP>";
                                    xmlInput += "<PaymentTerm>" + obj.PAYMENTTERM + "</PaymentTerm>";
                                    xmlInput += "</POPaymentTermsIP>";
                                    console.log("xmlInput: " + xmlInput);
                                    var WebServiceCallIp = $("#WebServiceCallIp").val();
                                    console.log("WebServiceCallIp: " + WebServiceCallIp);
                                    var URLParam = xmlInput;
                                    console.log("URLParam: " + URLParam);
                                    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_ListPaymentTerms?PaymentTerm=" + obj.PAYMENTTERM;
                                    console.log("serviceUrl: " + serviceUrl);
                                    var local_dev_uat = $("#local_dev_uat").val();
                                    console.log("local_dev_uat: " + local_dev_uat);
                                    if (local_dev_uat === "dev" || local_dev_uat === "uat")
                                    {
                                        $("#overlay").css("display", "block");
                                        console.log("Calling Web Service...");
                                        $.ajax({
                                            type: "GET",
                                            url: serviceUrl,
                                            contentType: "application/xml",
                                            dataType: "xml",
                                            async: true,
                                            success: function(data, textStatus, jqXHR) {
                                                console.log("success: " + data);
                                                fetchPaymentInDays(data);
                                                $("#overlay").css("display", "none");
                                            }
                                        });
                                    }
                                    else
                                    {
                                        fetchPaymentInDaysFromLocal("");
                                    }
                                }
                                setOverDelivTolAndUnderDelvTolInDelvTab("OnLoad");
                            }
                        });

                    }, 1000);
                }
            }
        });
    }

    $("#uploaddocumentModalBtn").click(function() {

        $("#overlay").css("display", "block");
//        event.preventDefault();
        if ($("input[name='file_docDiv1']").val().trim() !== "") {

//            $("#prlineitemattachmentmodal").modal("hide");
//            var lobiboxProgress = Lobibox.progress({
//                title: 'Please wait',
//                label: 'Uploading files...',
//                onShow: function($this) {
//                    var i = 0;
//                    var inter = setInterval(function() {
//                        if (i > 100) {
//                            inter = clearInterval(inter);
//                        }
//                        i = i + 0.05;
//                        $this.setProgress(i);
//                    }, 1);
//                },
//                progressCompleted: function($this)
//                {
//                    $this.hide();
//                    Lobibox.notify("success", {
//                        rounded: true,
//                        delayIndicator: false,
//                        msg: 'Files uploaded successfully.'
//                    });
//                }
//            });
            $("#uploadSignedPOCopyModal").modal("hide");
        }
        else
        {
            Lobibox.alert("error",
                    {
                        msg: "Please select at least one file!"
                    });
        }
    });
    $("#acknowledgeDocForm").submit(function(event) {

        event.preventDefault();
        if ($("input[name='file_docDiv1']").val().trim() !== "") {
//        $("#prlinedocform").prop("action", "submitrfqprlineattachment.do");
            var poNumber = $("#PoNumber").val();
            var pid = $("#Pid").val();
            $("#ro_poNumber").val(poNumber);
            $("#ro_pid").val(pid);
            var formData = new FormData(this);
            $.ajax(
                    {
                        type: "POST",
                        url: "uploadsignedpo.do",
                        async: true,
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        complete: function(responseJson)
                        {
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("obj.Result: " + obj.Result);
                            console.log("obj.Message: " + obj.Message);
                            if (obj.Result === "Success")
                            {
                                $("#isSignedPoUploaded").val("Yes");
                            }
                            else
                            {
                                $("#isSignedPoUploaded").val("No");
                            }
                            $("#overlay").css("display", "none");
                            Lobibox.alert("success", {
                                msg: obj.Message
                            });
//                        lobiboxProgress.hide();
                        }
                    });
//            $("#prlineitemattachmentmodal").modal("hide");
        }
//        $("#overlay").css("display", "none");
    });
    var currencyDeliveryInvoice = $("#CurrencyDeliveryInvoice").val();
    console.log("currencyDeliveryInvoice or To Currency in Exchange Rate: " + currencyDeliveryInvoice);
    if (currencyDeliveryInvoice === 'SGD') {
        $("#ExchangeRate").val('1.00000');
    } else {
        $("#ExchangeRate").val('');
        if (currencyDeliveryInvoice !== "")
        {
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
            console.log("fromCurrency in Exchange Rate: " + fromCurrency);
            $.ajax({
                type: "GET",
                url: "poajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "FindExchangeRateByFromCurrencyAndToCurrency",
                    "fromCurrency": fromCurrency,
                    "toCurrency": currencyDeliveryInvoice
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Result in Exchange Rate: " + obj.Result);
                    console.log("Exchange Rate: " + obj.ExchangeRate);
                    $("#ExchangeRate").val(Number(obj.ExchangeRate).toFixed(5));
                }
            });
        }
    }

    var lobiboxNotifyAlert = null;
    $("#savePoLineItemData").click(function(event) {
        console.log("Saving Line Item Tab Data.........");
        var PrType = $("#PrType").val();
        console.log("PrType: " + PrType);
        var isUnitPriceEntered = "Yes";
        var accAsgn = "";
        var itemCat = "";
        $("#material_headerClass tbody tr").each(function(index) {
            var insertionid = $("#ItemNumberSelect").val();
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var prNetPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            if (id === insertionid)
            {
                if (prNetPrice.toString().trim() === "" || Number(prNetPrice) === 0)
                {
                    $(this).find("td").eq(12).children(".pr-net-price").focus();
                    isUnitPriceEntered = "No";
                    return false;
                }
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            }
        });
        console.log("isUnitPriceEntered: " + isUnitPriceEntered);
        if (isUnitPriceEntered === "No")
        {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please enter valid Unit Price in PO Line Item!"
            });
            return false;
        }



        var errorMsg = "";
//        event.preventDefault();
        $(".collapseDivLineLevel").find(".active").removeClass("active");
        var isDelSchValid = checkDeliveryScheduleTabValidation();
        console.log("isDelSchValid: " + isDelSchValid);
        if (isDelSchValid === false)
        {
            $("#overlay").css("display", "none");
            return false;
        }
        var accAsgn = "";
        var itemCat = "";
        var lineType = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                lineType = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            }
        });
        var isAccAsgnSaved = "Yes";
        var prIndex = -1;
        if (PrType === "Service") {
            var PoFrom = $("#PoFrom").val();
            if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
//                if (lineType === "EmptyLine") {
                $("#serviceTableId tbody tr").each(function(index) {
                    if ($(this).find("td").eq(0).children(".saveSarviceAccountAssignment").val() === "No")
                    {
                        isAccAsgnSaved = "No";
                        prIndex = index + 1;
                        return false;
                    }
                });
                if (itemCat !== "" && itemCat === "D") {
                    if (accAsgn !== "U") {
                        if (isAccAsgnSaved === "No")
                        {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please Save Service Account Assignment " + prIndex;
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            $("#services").addClass("active");
                            $("#services-tab").addClass("active");
                            $("#services-tab").addClass("show");
                            return false;
                        }
                    }
                }
//                }
            }
            if (itemCat !== "" && itemCat === "D") {
                if (accAsgn !== "U")
                {
                    if (accAsgn === "R") {
                        var isProfSegSaved = "Yes";
                        var prIndex = -1;
                        $("#serviceTableId tbody tr").each(function(index) {
                            if ($(this).find("td").eq(0).children(".isProfitabilitySegmentDataSaved").val() === "No")
                            {
                                isProfSegSaved = "No";
                                prIndex = index + 1;
                                return false;
                            }
                        });
                        if (isProfSegSaved === "No")
                        {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please Save Profitability Segment for Service " + prIndex;
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            $("#services").addClass("active");
                            $("#services-tab").addClass("active");
                            $("#services-tab").addClass("show");
                            return false;
                        }
                    }
                }
            }
        }

        var TaxCode = $("#TaxCode").val();
        if (TaxCode === "" && TaxCode.toString().trim() === "")
        {
            $("#overlay").css("display", "none");
            if (savePoLineLobiboxNotifyAlert !== null)
            {
                savePoLineLobiboxNotifyAlert.remove();
            }
            savePoLineLobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Enter Tax Code in Invoice Tab!"
            });
            $("#TaxCode").focus();
            $("#invoice").addClass("active");
            $("#invoice-tab").addClass("active");
            $("#invoice-tab").addClass("show");
            $("#TaxCode").focus();
            return false;
        } else {
            $("#invoice").addClass("active");
            $("#invoice-tab").addClass("active");
            $("#invoice-tab").addClass("show");
        }

        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
            var PrType = $("#PrType").val();
            var distribution = $("#distribution").val();
            console.log("distribution on save :" + distribution);

            if (PrType === "Material") {
                var isCorrect = lineLevelValidation(distribution, accAsgn, "pr");
                $("#invoice").removeClass("active");
                $("#invoice-tab").removeClass("active");
                $("#invoice-tab").removeClass("show");
                $("#account_assignment").addClass("active");
                $("#account_assignment-tab").addClass("active");
                $("#account_assignment-tab").addClass("show");
                if (isCorrect === false) {
                    return false;
                }
            } else if (PrType === "Service") {
                if (TaxCode !== "") {
                    $("#invoice").addClass("active");
                    $("#invoice-tab").addClass("active");
                    $("#invoice-tab").addClass("show");
                }
            }
        }
//        var ConfControl = $("#confControlLimits").val();
//        if (ConfControl === "") {
//            $("#overlay").css("display", "none");
//            if (savePoLineLobiboxNotifyAlert !== null)
//            {
//                savePoLineLobiboxNotifyAlert.remove();
//            }
//            savePoLineLobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: "Please Select Conf. Control in Confirmations Tab!"
//            });
//            $("#confirmations").addClass("active");
//            $("#confirmations-tab").addClass("active");
//            $("#confirmations-tab").addClass("show");
//            $("#confControlLimits").focus();
//            return false;
//        } else {
//            $("#confirmations").addClass("active");
//            $("#confirmations-tab").addClass("active");
//            $("#confirmations-tab").addClass("show");
//        }

        console.log("Validation Check Passed=========================");
        $("#savePoLineItemData").prop("disabled", true);
        $("#savePoLineItemData").html("Saving...");
        $("#savePoLineSpinner").css("visibility", "visible");
        setTimeout(function() {
            savePoLineLevelTabData();
            if ($("#isPrSavedAfterEditDetails").val() === "Yes")
            {
                $("#isPrSavedAfterEditDetails").val("No");
            }
            else if ($("#isPrSavedAfterEditDetails").val() === "No")
            {
                $("#isAnyFieldValueChanged").val("No");
            }
        }, 2000);
    });
    $("#DeliveryScheduleTableId").on("change", ".deliveryDateClass", function() {
        var deliveryDate = $(this).val();
        console.log("deliveryDate: " + deliveryDate);
        var delDate = "";
        var DeliveryDateArray = [];
        $("#DeliveryScheduleTableId tbody tr").each(function(index) {
            delDate = $(this).find("td").eq(1).children(".deliveryDateClass").val();
            console.log(index + " : " + delDate);
            var temp = new Date(delDate);
            console.log("temp: " + temp);
            DeliveryDateArray.push(temp);
        });
        DeliveryDateArray.sort(function(a, b) {
            return a > b ? 1 : -1;
        });
        console.log("DeliveryDateArray length: " + DeliveryDateArray.length);
        console.log("DeliveryDateArray: " + DeliveryDateArray);
//        var months = {"0": "Jan", "1": "Feb", "2": "Mar", "3": "Apr", "4": "May", "5": "Jun", "6": "Jul", "7": "Aug", "8": "Sep", "9": "Oct", "10": "Nov", "11": "Dec"};
        var months = {"0": "01", "1": "02", "2": "03", "3": "04", "4": "05", "5": "06", "6": "07", "7": "08", "8": "09", "9": "10", "10": "11", "11": "12"};
        if (DeliveryDateArray.length !== 0)
        {
            var smallestDate = "";
            var insertionid = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === id) {
                    var date = DeliveryDateArray[0].getDate();
                    var month = DeliveryDateArray[0].getMonth();
                    var year = DeliveryDateArray[0].getFullYear();
                    date = date < 10 ? ("0" + date) : date;
                    smallestDate = date + "." + months[month] + "." + year;
                    console.log("smallestDate: " + smallestDate);
                    $(this).find('td').eq(11).children(".PR_DeliveryDate").text(DeliveryDateArray[0]);
                }
            });
        }
    });
    $("#DeliveryScheduleTableId").on("change", ".scheduledQuantityClass", function() {
        var schQty = removeCommaInNumber($(this).val());
        console.log("schQty: " + schQty);
        if (Number(schQty) < 0)
        {
            console.log("-----------");
            $(this).val("");
        }
        if (Number(schQty) === -0)
        {
            console.log("-0-0-0-0-0-0-0-0-0-0-");
            $(this).val("");
        }
        if (schQty !== "")
        {
            validateScheduledQtyLenInDelvSchTab($(this));
        }
    });
    $("#material_headerClass").on("click", ".delete-pr-line-btn", function() {
        console.log("Deleting PR Line......");
        var poNumber = $("#poNumber").val();
        var prNumber = $(this).parent().parent().find("td").eq(0).children(".prNumber_Class").val();
        var prItemNumber = $(this).parent().parent().find("td").eq(0).children(".PRItemNumber_Class").val();
        console.log("poNumber: " + poNumber);
        console.log("prNumber: " + prNumber);
        console.log("prItemNumber: " + prItemNumber);
        var _csrf = $("input[name=_csrf]").val();
        $.ajax({
            type: "POST",
            url: "standalonePoPostAjaxRequest.do",
            async: false,
            data: {
                "reqFrom": "DeletePrLineInEditPo",
                "poNumber": poNumber,
                "prNumber": prNumber,
                "prItemNumber": prItemNumber,
                _csrf: _csrf
            },
            complete: function(responseJson) {
                var jsonObj = $.parseJSON(responseJson.responseText);
                console.log("CreatedFrom: " + jsonObj.CreatedFrom);
                console.log("PoDetails: " + jsonObj.PoDetails.length);
                $("#deletePrLinePoTable tbody tr").remove();
                var poDetailsArray = jsonObj.PoDetails;
                var row = "";
                for (var i = 0; i < poDetailsArray.length; i++)
                {
                    var poDetailsObj = poDetailsArray[i];
                    if (poNumber === poDetailsObj.PoNumber)
                        row += "<tr><td><a href='#' title='Delete' class='delete-pr-line'><i class='fas fa-trash-alt'></i></a><input type='hidden' class='finalizedRfqId' value='" + poDetailsObj.FinalizedRfqId + "'><input type='hidden' class='rfqId' value='" + poDetailsObj.RfqId + "'><input type='hidden' class='prId' value='" + poDetailsObj.PrId + "'></td><td>" + poDetailsObj.PoNumber + "</td><td>" + poDetailsObj.PrNumber + "</td><td>" + poDetailsObj.PrItemNumber + "</td><td>" + poDetailsObj.QuantityUsed + "</td></tr>";
                    else
                        row += "<tr><td></td><td>" + poDetailsObj.PoNumber + "</td><td>" + poDetailsObj.PrNumber + "</td><td>" + poDetailsObj.PrItemNumber + "</td><td>" + poDetailsObj.QuantityUsed + "</td></tr>";
                }
                console.log("row: " + row);
                $("#deletePrLinePoTable tbody").append(row);
                $("#DeletePrLineModal").modal("show");
            }
        });
    });
    $("#deletePrLinePoTable").on("click", ".delete-pr-line", function() {
        var currentTR = $(this).parent().parent();
        var finalizedRfqId = $(this).parent().children(".finalizedRfqId").val();
        var rfqId = $(this).parent().children(".rfqId").val();
        var prId = $(this).parent().children(".prId").val();
        var quantity = $(this).parent().parent().find("td").eq(4).text();
        console.log("rfqId: " + rfqId);
        console.log("prId: " + prId);
        console.log("quantity: " + quantity);
        var _csrf = $("input[name=_csrf]").val();
        $.ajax({
            type: "POST",
            url: "standalonePoPostAjaxRequest.do",
            async: false,
            data: {
                "reqFrom": "AddQuantityToPrFromPo",
                "finalizedRfqId": finalizedRfqId,
                "rfqId": rfqId,
                "prId": prId,
                "quantity": quantity,
                _csrf: _csrf
            },
            complete: function(responseJson) {
                var jsonObj = $.parseJSON(responseJson.responseText);
                console.log("Result: " + jsonObj.Result);
                if (jsonObj.Result === "Success")
                {
                    Lobibox.alert("success", {
                        msg: "PR Line Deleted successfully "
                    });
                    currentTR.remove();
                }
                else
                {
                    Lobibox.alert("error", {
                        msg: "Error in deleting PR Line !"
                    });
                }
            }
        });
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnUnloadingPoint", function() {
        var unloadingpoint = $(this).val();
        if (unloadingpoint !== "") {
            $(this).css("border-color", "");
        }
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnRecipients", function() {
        var recipient = $(this).val();
        if (recipient !== "") {
            $(this).css("border-color", "");
        }
    });
    $("#assAsgnDelivSch").change(function() {
        var delivSch = $(this).val();
        if (delivSch !== "") {
            $(this).css("border-color", "");
        }
    });
    $("#DelivSchService").change(function() {
        var delivSch = $(this).val();
        if (delivSch !== "") {
            $(this).css("border-color", "");
        }
    });
});

function calculateNetPrice(Quantity, ValuationPrice, PerUnit)
{
    var NetPrice = (Number(Quantity) * Number(ValuationPrice)) / Number(PerUnit);
    console.log("NetPrice: " + NetPrice);
    return NetPrice;
}

function saveServiceTabData()
{
    var serviceTblRow = "";
    var serviceTblRowString = "";
    var pRItemNumber = "";
    $("#serviceTableId tbody tr").each(function() {
        var selectServiceToDeleteFromSAP = $(this).find("td").eq(1).children(".selectServiceToDeleteFromSAP").prop("checked");
        var ServiceAccAssDist = $(this).find("td").eq(0).children(".ServiceAccAssDist").val();
        var servicesLinkId = $(this).find("td").eq(0).children(".ServiceLinkId").val();
        var lineItemNumber = $(this).find("td").eq(2).children(".lineItemNumberServices").val();
        var serviceNumber = $(this).find("td").eq(3).children(".ServicesNumber_Services").val();
        var shortText = $(this).find("td").eq(4).children(".shortText_Services").val();
        var qunatity = removeCommaInNumber($(this).find("td").eq(5).children(".quantity_Services").val());
        var unit = $(this).find("td").eq(6).children(".servicesUnit_Services").val();
        var grossPrice = removeCommaInNumber($(this).find("td").eq(7).children(".grossPrice_Services").val());
        var currency = $(this).find("td").eq(8).children(".currency_Services").val();
        var netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".netPrice_Services").val());
        var edition = $(this).find("td").eq(10).children(".edition_Services").val();
        var lineItemLongText = $(this).find("td").eq(11).children(".lineItemLongText_Services").val();
        var overfTolerance = $(this).find("td").eq(12).children(".overfTolerance_Services").val();
        var lineNumberService = $(this).find("td").eq(0).children(".lineNumberService").val();
        var isServOldOrNew = $(this).find("td").eq(0).children(".isServOldOrNew").val();
        var itemCode = $("#ItemNumberSelect").val();
        var linkid;
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            }
        });
        if (ServiceAccAssDist === "")
        {
            ServiceAccAssDist = 0;
        }
        selectServiceToDeleteFromSAP = (selectServiceToDeleteFromSAP === true ? "true" : "false");
        servicesLinkId = (servicesLinkId === undefined ? "" : servicesLinkId)
        lineNumberService = (lineNumberService === undefined || lineNumberService === "" ? "NON" : lineNumberService);
        isServOldOrNew = (isServOldOrNew === undefined || isServOldOrNew === "" ? "NON" : isServOldOrNew);
        serviceTblRow = lineItemNumber + "," + serviceNumber + "," + shortText + "," + qunatity + "," + unit + "," + grossPrice + "," + currency
                + "," + netPrice + "," + edition + "," + lineItemLongText + "," + overfTolerance + "," + itemCode + "," + linkid + "," + servicesLinkId
                + "," + pRItemNumber + "," + ServiceAccAssDist + "," + selectServiceToDeleteFromSAP + "," + lineNumberService + "," + isServOldOrNew;
        serviceTblRowString = serviceTblRowString + serviceTblRow + "#";
        console.log("serviceTblRowString :" + serviceTblRowString);
    });
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveServiceTableData",
            "serviceTblRowString": serviceTblRowString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            $("#isServiceTabSaved").val("Yes");
        }
    });
}
function saveLimitTabData() {

    var itemCode = $("#ItemNumberSelect").val();
    var pRItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    var overAllLimit = removeCommaInNumber($("#OverallLimit").val());
    var expectedValue = removeCommaInNumber($("#ExpectedValue").val());
    var noLimit = $("#NoLimit").prop("checked");
    var limitsString = overAllLimit + "," + expectedValue + "," + noLimit + "," + itemCode + "," + pRItemNumber + "," + linkid;
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "saveLimitsTabData",
            "limitsString": limitsString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
        }
    });
}
function saveDeliveryScheduleTabData()
{

    var deliverySchTblRow = "";
    var deliverySchTblRowString = "";
    //saurabh
    var total = "";
    var temp = 0;
    var isValid = "Yes";
    var insertionid = $("#ItemNumberSelect").val();
    $("#DeliveryScheduleTableId tbody tr").each(function() {

        var delDateCat = $(this).find("td").eq(0).children(".deliveryDateCategory").val();
        var delDate = $(this).find("td").eq(1).children(".deliveryDateClass").val();
        var schQuantity = removeCommaInNumber($(this).find("td").eq(3).children(".scheduledQuantityClass").val());
        if (delDate === "" && delDate.toString().trim() === "")
        {
            $(this).find("td").eq(2).children(".deliveryDateClass").focus();
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Enter Delivery Date!"
            });
            return false;
        }
        if (schQuantity === "" && schQuantity.toString().trim() === "")
        {
            $(this).find("td").eq(3).children(".scheduledQuantityClass").focus();
            isValid = "No";
            return false;
        }

        total = schQuantity;
        temp = Number(schQuantity) + Number(temp);
        var time = $(this).find("td").eq(4).children(".timeDeliveryScheduledClass").val();
        var purReqNumber = $(this).find("td").eq(5).children(".prNumberDeliveryScheduledClass").val();
        var reqItemNumber = $(this).find("td").eq(6).children(".reqItemNumberClass").val();
        if (purReqNumber === null) {
            purReqNumber = "";
        }
        if (reqItemNumber === null) {
            reqItemNumber = "";
        }
        var reqItemNum = $("#ItemNumberSelect").val();
        var pRItemNumber = "";
        var linkid = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === id) {
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            }

        });
        deliverySchTblRow = delDateCat + "," + delDate + "," + schQuantity + "," + time + "," + purReqNumber + "," + reqItemNumber.toString().trim() + "," + pRItemNumber + "," + linkid;
        deliverySchTblRowString = deliverySchTblRowString + deliverySchTblRow + "#";
        console.log("deliverySchTblRowString :" + deliverySchTblRowString);
    });
    console.log("Temp is ::" + temp);
    var Quantity = removeCommaInNumber($("#pOQuantity").val());
    console.log("Quantity is ::" + Quantity);
    if (isValid === "No") {
        Lobibox.notify("error", {
            rounded: true,
            delayIndicator: false,
            msg: "Please Enter Scheduled quantity!"
        });
        return false;
    }
    if (Number(Quantity) !== Number(temp)) {
        Lobibox.notify("error", {
            rounded: true,
            delayIndicator: false,
            msg: "Sum of scheduled quantity should be equal to PR Quantity!"
        });
        return false;
    }
    else
    {
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveDeliveryScheduleTblData",
                "deliverySchTblRowString": deliverySchTblRowString,
                "insertionOrderId": insertionid
            },
            beforeSend: function() {
                console.log("Start beforeSend");
                showLoader();
                console.log("End beforeSend");
            },
            error: function() {
//                $("#overlay").css("display", "none");
            },
            success: function() {
//                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#isDeliveryScheduleTabSaved").val("Yes");
            }
        });
    }
}
function saveDeliveryTabData()
{
    var OverdelTol = $("#OverdeliveryTolerance").val();
    var UnderdelTol = $("#UnderdeliveryTolerance").val();
    var ShippingInstruction = $("#ShippingInstruction").val();
    var StockType = $("#StockType").val();
    var ValuationType = $("#ValuationType").val();
    var RemShelfLife = $("#RemShelfLife").val();
    var QAControlLife = $("#QAControlLife").val();
    var GRProcTime = $("#GRProcTime").val();
    var FirstRemender = $("#FirstReminderExpediter").val();
    var SecondRemender = $("#SecondReminderExpediter").val();
    var ThirdRemender = $("#ThirdReminderExpediter").val();
    var GoodsReceipt = $("#GoodsReceipt").prop("checked");
    var GrNonValuated = $("#GRNonValuated").prop("checked");
    var DelCompleted = $("#DelivCompleted").prop("checked");
    var NoExpend = $("#NoExpend").val();
    var PlDelTime = $("#PlDeliveryTime").val();
    var Incotems = $("#incoTermsPart2Delivery").val();
    var LineItemNum = $("#ItemNumberSelect").val();
    var pRItemNumber = "";
    var linkid = "";
    console.log("FirstRemender: " + FirstRemender);
    console.log("GRProcTime: " + GRProcTime);
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    console.log("GoodsReceipt :" + GoodsReceipt);
    console.log("GrNonValuated :" + GrNonValuated);
    console.log("LineItemNum :" + LineItemNum);
    if (GoodsReceipt === 'on') {
        GoodsReceipt = "true";
    }
    if (GrNonValuated === 'on') {
        GrNonValuated = "true";
    }
    if ($("#DelivCompleted").prop("checked")) {
        DelCompleted = "true";
    } else {
        DelCompleted = "false";
    }

    console.log("DelCompleted After :" + DelCompleted);
    var deliveryString = OverdelTol + "," + UnderdelTol + "," + ShippingInstruction + "," + StockType + "," + ValuationType + "," + RemShelfLife + ","
            + QAControlLife + "," + GRProcTime + "," + FirstRemender + "," + SecondRemender + "," + ThirdRemender + "," + GoodsReceipt + ","
            + GrNonValuated + "," + DelCompleted + "," + NoExpend + "," + PlDelTime + "," + Incotems + "," + LineItemNum + "," + pRItemNumber + ","
            + linkid;
    console.log("deliveryString: " + deliveryString);
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveDeliveryTabData",
            "deliveryString": deliveryString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Delivery Tab Data Saved=============");
        }
    });
}
function saveInvoiceTabData()
{
    var InvoiceReceipt;
    var FinalInvoice;
    var GRBasedIV;
    var DPCategory = $("#DPCategory").val();
    var TaxCode = $("#TaxCode").val();
    var LineItemNum = $("#ItemNumberSelect").val();
//    var taxCodeDesc = $("#TaxCodeDescription").val();
    var taxCodeDesc = "";
    DPCategory = "";
    if (TaxCode === "") {
        Lobibox.notify("error", {
            rounded: true,
            delayIndicator: false,
            msg: "Please Select Tax Code!"
        });
        $("#TaxCode").focus();
        $("#invoice").addClass("active");
        $("#invoice-tab").addClass("active");
        $("#invoice-tab").addClass("show");
        return false;
    }

    if ($("#InvoiceReceipt").prop("checked")) {
        InvoiceReceipt = "true";
    } else {
        InvoiceReceipt = "false";
    }
    if ($("#FinalInvoice").prop("checked")) {
        FinalInvoice = "true";
    } else {
        FinalInvoice = "false";
    }
    if ($("#GRBasedIV").prop("checked")) {
        GRBasedIV = "true";
    } else {
        GRBasedIV = "false";
    }
    var pRItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    console.log("InvoiceReceipt :" + InvoiceReceipt);
    console.log("FinalInvoice :" + FinalInvoice);
    console.log("GRBasedIV :" + GRBasedIV);
    var invoiceString = InvoiceReceipt + "," + FinalInvoice + "," + GRBasedIV + "," + DPCategory + "," + TaxCode + "," + LineItemNum + "," +
            taxCodeDesc + "," + pRItemNumber + "," + linkid;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveInvoiceTabData",
            "invoiceString": invoiceString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            $("#isInvoiceTabSaved").val("Yes");
        }
    });
}
function saveConditionTabData()
{
    amountArr = [];
    perArr = [];
    canValArr = [];
    condType = [];
    condName = [];
    var itemCode = $("#ItemNumberSelect").val();
    var codtnTblValue = "";
    var conditionTableRow = "";
    var conType = "";
    var name = "";
    var amount = "";
    var perQuant = "";
    var pRItemNumber = "";
    var linkid;
    var insertionid = $("#ItemNumberSelect").val();
    var linkIdArray = [];
    var LinkID;
//    var LinkIDAsJson = {};

    $("#material_headerClass tbody tr").each(function() {
//        var linkIdObj = {};
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
        LinkID = $(this).find("td").eq(0).children(".linkId_Class").val();
        linkIdArray.push(LinkID);
    });
    console.log("LinkID String :" + linkIdArray.toString());
//    LinkIDAsJson["linkIdArray"] = linkIdArray;

    var vendorHeader = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendor = "";
    console.log("vendor on condition save:" + vendor);
    $("#conditionTableIdLineLevel tbody tr").each(function(i) {
        if (vendorHeader !== "") {
            vendor = vendorHeader.substring(vendorHeader.lastIndexOf('-') + 1, vendorHeader.length);
        }
        if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
            conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
        } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
            conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
        }
        if ($(this).find("td").eq(2).children("input").hasClass("nameConditionsLineLevel") === true) {
            name = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        } else if ($(this).find("td").eq(2).children("input").hasClass("NameConditionsLineLevel") === true) {
            name = $(this).find("td").eq(2).children(".NameConditionsLineLevel").val();
        }
        if ($(this).find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
        } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
            amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountLineLevel").val());
        }
        if ($(this).find("td").eq(5).children("input").hasClass("PerQuantityLineLavel") === true) {
            perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel").val());
        } else if ($(this).find("td").eq(5).children("input").hasClass("newPerQuantityLineLavel") === true) {
            perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".newPerQuantityLineLavel").val());
        }
        var vendorCondition = $(this).find("td").eq(0).children(".conditionVendor").val();
//        var vendor;
//        console.log("vendorCondition :" + " i :" + vendorCondition + "vendorHeader :" + vendorHeader);
        if (vendorCondition !== "") {
            vendor = vendorCondition;
        }
        var conPrUnit = $(this).find("td").eq(6).children(".ConditionPricingUnitLineLevel").val();
        var curr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
        var uOM = $(this).find("td").eq(7).children(".UoMLineLevel").val();
        var conVal1 = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
        var curr2 = $(this).find("td").eq(9).children(".Currency2LineLevel").val();
        var conVal2 = $(this).find("td").eq(10).children(".ConditionValue2LineLevel").val();
        var conCurr = $(this).find("td").eq(11).children(".ConditionCurrencyLineLevel").val();
        var conDetails = "";
        var stNumber = $(this).find("td").eq(17).children(".conditionSTUNR").val();
        var condCount = $(this).find("td").eq(17).children(".conditionZAEHK").val();
        var KAPPL = $(this).find("td").eq(17).children(".conditionKAPPL").val();
        var KVSL1 = $(this).find("td").eq(17).children(".conditionKVSL1").val();
        var KVSL2 = $(this).find("td").eq(17).children(".conditionKVSL2").val();
        var condChangeId = $(this).find("td").eq(17).children(".conditionChangeId").val();

        var status = $(this).find("td").eq(12).children(".statusLineLevel").val();
        var numerator = $(this).find("td").eq(13).children(".numeratorLineLevel").val();
        var baseUom = $(this).find("td").eq(14).children(".baseUoMLineLevel").val();
        var denoForConv = $(this).find("td").eq(15).children(".denoForConvLineLevel").val();
        var uomExtra = $(this).find("td").eq(16).children(".uOMExtraLineLevel").val();
        amountArr.push(amount);
        perArr.push(perQuant);
        canValArr.push(conVal1);
        condType.push(conType);
        condName.push(name);
        conditionTableRow = conType + ',' + name + ',' + amount + ',' + perQuant + ',' + conPrUnit + ',' + curr1 + ',' + uOM + ',' + conVal1
                + ',' + curr2 + ',' + conVal2 + ',' + conCurr + ',' + conDetails + ',' + itemCode + ',' + pRItemNumber + ',' + linkid
                + ',' + stNumber + ',' + condCount + ',' + KAPPL + ',' + KVSL1 + ',' + KVSL2 + ',' + condChangeId + "," + vendor + ',' + status
                + ',' + numerator + ',' + baseUom + ',' + denoForConv + ',' + uomExtra;
        codtnTblValue = codtnTblValue + conditionTableRow + "#";
    });
    console.log("conditionTableRow: " + codtnTblValue);
    var TotalCond = $("#conditionTableIdLineLevel tbody tr").length;
    console.log("TotalCond: " + TotalCond);
    // By Nikhil on 14052020
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
// Ends

    if (TotalCond !== 0)
    {
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveConditionsTabData",
                "codtnTblValueRowString": codtnTblValue,
                "poCurrency": $("#CurrencyDeliveryInvoice").val(),
                "localCurrency": localCurrency,
                "linkIdArray": linkIdArray.toString()
            },
            beforeSend: function() {
                console.log("Start beforeSend");
                $("#overlay").css("display", "block");
                console.log("End beforeSend");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            success: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
//                var obj = $.parseJSON(responseJson.responseText);

                var jsonCondArr = $.parseJSON(responseJson.responseText);
                jsonCondArr = JSON.parse(JSON.stringify(jsonCondArr));
//                setHeaderLevelConditionByLineItemNumber(itemCode);
                $("#isConditionPopulateInHeader").val("Yes");
                getConditionsByLinkId(jsonCondArr); //Added by BITTU on 21 April 2020
            }
        });
    }
}
function saveAccountAssignmentTabData()
{
    var distribution = $("#distribution").val();
    console.log("distribution: " + distribution);
    if (distribution === "Single Account Assignment")
    {
        var accAsgnValString = "";
        var pRItemNumber = "";
        var quantity;
        var linkid = "";
        var accAsgn = "";
        var itemCat = "";
        var insertionid = $("#ItemNumberSelect").val();
        console.log("insertionid: " + insertionid);
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                // Added by nikhil on 24-01-2020
                $(this).find("td").eq(0).children(".PODistribution").val("Single Account Assignment");
                $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val($("#POAccAssPartialInvoiceIndicator").val());
                // End
            }
        });
        console.log("PRItemNumber: " + pRItemNumber);
//        var quantity = $(this).find("td").eq(1).children(".accAsgnQuantity").val();
//        var percentage = $(this).find("td").eq(2).children(".accAsgnPercentage").val();
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        var percentage = "";
        var gLAccount = "";
        var cOArea = "";
        var costCenter = "";
        var fund = "";
        var funArea = "";
        var fundCenter = "";
        var commitmentItem = "";
        var unloadingPoint = "";
        var recipients = "";
        var order = "";
        var asset = "";
        var wBSElement = "";
        var salesOrder = "";
        var netActNumber = "";
        var itemNumber = "";
        var deliverySch = "";
        var itemCode = "";
        var accAsgnCat = "";
        var distribution = "";
        var cOCode = "";
        itemCode = $("#ItemNumberSelect").val();
        accAsgnCat = $("#accountAssignmentCategory").val();
        cOCode = $("#CoCode").val();
        if (typeOfPOHeader === "Inter Company" && accAsgn === "" && itemCat === "") {
            percentage = "100.00";
            fund = $("#interCompanyFund").val();
            funArea = $("#interCompanyFunctionalArea").val();
            fundCenter = $("#interCompanyFundCenterInput").val();
            commitmentItem = $("#interCompanyCommItemInput").val();
        } else {
            percentage = "100.00";
            gLAccount = $("#gLAccount").val();
            cOArea = $("#coArea").val();
            costCenter = $("#costCenterAccAsgn").val();
            fund = $("#accAsgnfund").val();
            funArea = $("#accAsgnfunctionalArea").val();
            fundCenter = $("#accAsgnFundCenterInput").val();
            commitmentItem = $("#accAsgnCommItemInput").val();
            unloadingPoint = $("#unloadingPoint").val();
            recipients = $("#recipient").val();
            order = $("#accAsgnOrder").val();
            asset = $("#accAsgnAsset").val();
            wBSElement = $("#accAsgnWBSElementInput").val();
            salesOrder = $("#accAsgnSalesOrder").val();
            netActNumber = $("#accAsgnNActNumInput").val();
            itemNumber = $("#assAsgnItemNumber").val();
            deliverySch = $("#assAsgnDelivSch").val();
//            itemCode = $("#ItemNumberSelect").val();
//            accAsgnCat = $("#accountAssignmentCategory").val();
            distribution = "";
//            cOCode = $("#CoCode").val();
        }


// Added by nikhil on 24-01-2020
        var POAccAssPartialInvoiceIndicator = $("#POAccAssPartialInvoiceIndicator").val();
        console.log("POAccAssPartialInvoiceIndicator :" + POAccAssPartialInvoiceIndicator);
        if (POAccAssPartialInvoiceIndicator === "")
        {
            POAccAssPartialInvoiceIndicator = "0";
        }
// End

        accAsgnValString = quantity + "," + percentage + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + ","
                + fundCenter + "," + commitmentItem + "," + unloadingPoint + "," + recipients + "," + order + "," + asset + "," + wBSElement + ","
                + salesOrder + "," + netActNumber + "," + itemNumber + "," + deliverySch + "," + itemCode + "," + accAsgnCat + ","
                + distribution + "," + cOCode + "," + pRItemNumber + "," + linkid + "," + POAccAssPartialInvoiceIndicator;
        console.log("accAsgnValString :" + accAsgnValString);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveAccAsgnTabFieldData",
                "accAsgnValString": accAsgnValString
            },
            beforeSend: function() {
                console.log("Start beforeSend");
                $("#overlay").css("display", "block");
                console.log("End beforeSend");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            success: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#isAccountAssignmentTabSaved").val("Yes");
            }
        });
    }
    else
    {
        var POAccAssPartialInvoiceIndicator = $("#POAccAssPartialInvoiceIndicator").val();
        console.log("POAccAssPartialInvoiceIndicator :" + POAccAssPartialInvoiceIndicator);
        if (POAccAssPartialInvoiceIndicator === "")
        {
            POAccAssPartialInvoiceIndicator = "0";
        }
// End

        var accAsgnTblRow = "";
        var accAsgnTblRowString = "";
        var PoFrom = $("#PoFrom").val();
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            var quantity = removeCommaInNumber($(this).find("td").eq(1).children(".accAsgnQuantity").val());
            var percentage = $(this).find("td").eq(2).children(".accAsgnPercentage").val();
            var gLAccount = $(this).find("td").eq(3).children(".accAsgnGLAccount").val();
            var cOArea = $(this).find("td").eq(4).children(".accAsgnCOArea").val();
            var costCenter = $(this).find("td").eq(5).children(".accAsgnCostCetner").val();
            var fund = $(this).find("td").eq(6).children(".accAsgnFund").val();
            var funArea = $(this).find("td").eq(7).children(".accAsgnFunctionalArea").val();
            var fundCenter = $(this).find("td").eq(8).children(".accAsgnFundCenter").val();
            var commitmentItem = $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val();
            var unloadingPoint = $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").val();
            var recipients = $(this).find("td").eq(11).children(".accAsgnRecipients").val();
            var order = $(this).find("td").eq(12).children(".accAsgnOrder").val();
            var asset = $(this).find("td").eq(13).children(".accAsgnAssets").val();
            var wBSElement = $(this).find("td").eq(14).children(".accAsgnWBSElement").val();
            var salesOrder = $(this).find("td").eq(15).children(".accAsgnSalesOrder").val();
            var netActNumber = $(this).find("td").eq(16).children(".accAsgnNetActNumber").val();
            var itemNumber = $(this).find("td").eq(17).children(".accAsgnItemNumber").val();
            var deliverySch = $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").val();
            var linkNumber = $(this).find("td").eq(18).children(".accAsgnLinkNumber").val();
//            alert("linkNumber :" + linkNumber)
            if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                var deleteFlag = $(this).find("td").eq(0).children(".deleteFlag").val();
            } else {
                var deleteFlag = "NON";
            }

            var itemCode = $("#ItemNumberSelect").val();
            var accAsgnCat = $("#accountAssignmentCategory").val();
            var distribution = $("#distribution").val();
            if (distribution === 'Single Account Assignment') {
                distribution = "";
            } else if (distribution === 'Distrib. On Quantity Basis') {
                distribution = 1;
            } else if (distribution === 'Distrib. By Percentage') {
                distribution = 2;
            }
            var cOCode = $("#CoCode").val();
            var pRItemNumber = "";
            var linkid = "";
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                    // Added by nikhil on 24-01-2020
                    $(this).find("td").eq(0).children(".PODistribution").val($("#distribution").val());
                    $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val($("#POAccAssPartialInvoiceIndicator").val());
                    // End
                }
            });
            if (deliverySch === 'undefined') {
                deliverySch = '';
            }

            accAsgnTblRow = quantity + "," + percentage + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + ","
                    + fundCenter + "," + commitmentItem + "," + unloadingPoint + "," + recipients + "," + order + "," + asset + "," + wBSElement + ","
                    + salesOrder + "," + netActNumber + "," + itemNumber + "," + deliverySch + "," + itemCode + "," + accAsgnCat + ","
                    + distribution + "," + cOCode + "," + linkNumber + "," + pRItemNumber + "," + linkid + "," + POAccAssPartialInvoiceIndicator + "," + deleteFlag;
            accAsgnTblRowString = accAsgnTblRowString + accAsgnTblRow + "#";
            console.log("accAsgnTblRowString :::::" + accAsgnTblRowString);
        });
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveAccAsgnTabTblData",
                "accAsgnTblRowString": accAsgnTblRowString
            },
            beforeSend: function() {
                console.log("Start beforeSend");
                $("#overlay").css("display", "block");
                console.log("End beforeSend");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            success: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#isAccountAssignmentTabSaved").val("Yes");
            }
        });
    }
}
function saveTextsTabData()
{
    var ItemText = $("#ItemText").val();
    var InfoRecordPOText = $("#InfoRecordPOText").val();
    var MaterialPOText = $("#MaterialPOText").val();
    var PONoteToApprover = $("#PONoteToApprover").val();
    var DeliveryText = $("#DeliveryText").val();
    var LineItemNum = $("#ItemNumberSelect").val();
    var pRItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    var textString = ItemText + "," + InfoRecordPOText + "," + MaterialPOText + "," + PONoteToApprover + "," + DeliveryText + "," + LineItemNum
            + "," + pRItemNumber + "," + linkid;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveTextTabData",
            "textString": textString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
        }
    });
}
function saveDeliveryAddressTabData()
{
    var title = $("#Title").val();
    var name1 = $("#Name1").val();
    var name2 = $("#Name2").val();
    var street = $("#Street").val();
    var houseNo = $("#HouseNumber").val();
    var postalCode = $("#PostalCode").val();
    var city = $("#City").val();
    var country = $("#countryCode").val();
    var LineItemNum = $("#ItemNumberSelect").val();
    var countryDesc = $("#countryDesc").val();
    var pRItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    var deliveryAddressString = title + "," + name1 + "," + name2 + "," + street + "," + houseNo + "," + postalCode + "," + city + ","
            + country + "," + LineItemNum + "," + countryDesc + "," + pRItemNumber + "," + linkid;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveDeliveryAddressTabData",
            "deliveryAddressString": deliveryAddressString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
        }
    });
}
function saveConfirmationsTabData()
{
    var ConfControl = $("#confControlLimits").val();
    var OrderAck = $("#OrderAck").val();
//    if (ConfControl === "") {
//        Lobibox.notify("error", {
//            rounded: true,
//            delayIndicator: false,
//            msg: "Please Select Conf. Control!"
//        });
//        $("#confControlLimits").focus();
//        $("#confirmations").addClass("active");
//        $("#confirmations-tab").addClass("active");
//        $("#confirmations-tab").addClass("show");
//        return false;
//    }

    var ConfReq = $("#ConfirmationRequired").prop("checked");
    var RejectionInd = $("#RejectionInd").prop("checked");
    console.log("ConfReq: " + ConfReq);
    console.log("RejectionInd: " + RejectionInd);
    var LineItemNum = $("#ItemNumberSelect").val();
    var pRItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    var confirmationString = ConfControl + "," + OrderAck + "," + ConfReq + "," + RejectionInd + "," + LineItemNum + "," + pRItemNumber + "," + linkid;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveConfirmationsData",
            "confirmationString": confirmationString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
        }
    });
}
function saveConditionControlTabData()
{
    var PrintPrice = $("#PrintPrice").prop("checked");
    var EstimatePrice = $("#EstimatedPrice").prop("checked");
    console.log("PrintPrice: " + PrintPrice);
    console.log("EstimatePrice: " + EstimatePrice);
    var LineItemNum = $("#ItemNumberSelect").val();
    var pRItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    var conditionControlString = PrintPrice + "," + EstimatePrice + "," + LineItemNum + "," + pRItemNumber + "," + linkid;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveConditionControlData",
            "conditionControlString": conditionControlString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
        }
    });
}
function saveCustomerTabData()
{
    var ProductOrigin = $("#ProductOriginLine").val();
    var Segment = $("#SegmentDescriptionLine").val();
    var LineItemNum = $("#ItemNumberSelect").val();
    var pRItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    var customerDataString = ProductOrigin + "," + Segment + "," + LineItemNum + "," + pRItemNumber + "," + linkid;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "saveCustomerData",
            "customerDataString": customerDataString
        },
        beforeSend: function() {
            console.log("Start beforeSend");
            $("#overlay").css("display", "block");
            console.log("End beforeSend");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
        }
    });
}
function setHeaderLevelConditionByLineItemNumber(itemCode) {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getMasterConditionLineLevelByLineItemNumber",
            "itemCode": itemCode
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);
            var row = "";
//                $("#conditionTableId tbody tr").remove();
            var rowCount = $('#conditionTableId tr').length;
            if (rowCount === 1) {

                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (obj[i].CONDITION_TYPE === undefined ? '' : obj[i].CONDITION_TYPE) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (obj[i].NAME === undefined ? '' : obj[i].NAME) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' style='width: 150px;' value='" + (obj[i].AMOUNT === undefined ? '' : formatAmountByComma(obj[i].AMOUNT)) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (obj[i].CURRENCY1 === undefined ? '' : obj[i].CURRENCY1) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width: 150px;' value='" + (obj[i].PER === undefined ? '' : formatAmountByComma(obj[i].PER)) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value='" + (obj[i].CONDITION_PRICING_UNIT === undefined ? '' : obj[i].CONDITION_PRICING_UNIT) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (obj[i].UOM === undefined ? '' : obj[i].UOM) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' value='" + (obj[i].CONDITION_VALUE1 === undefined ? '' : formatAmountByComma(obj[i].CONDITION_VALUE1)) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (obj[i].CURRENCY2 === undefined ? '' : obj[i].CURRENCY2) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (obj[i].CONDITION_VALUE2 === undefined ? '' : obj[i].CONDITION_VALUE2) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (obj[i].CONDITION_CURRENCY === undefined ? '' : obj[i].CONDITION_CURRENCY) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded conditionDetailsHeader tableInputField' name='conditionDetailsHeader' value='" + (obj[i].CONDITION_DETAILS === undefined ? '' : obj[i].CONDITION_DETAILS) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (obj[i].KAPPL === undefined ? '' : obj[i].KAPPL) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (obj[i].KVSL1 === undefined ? '' : obj[i].KVSL1) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (obj[i].KVSL2 === undefined ? '' : obj[i].KVSL2) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (obj[i].ZAEHK === undefined ? '' : obj[i].ZAEHK) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (obj[i].STUNR === undefined ? '' : obj[i].STUNR) + "'>\n\
                                <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (obj[i].CHANGEID === undefined ? '' : obj[i].CHANGEID) + "'></td>"
//                            + "<td><input type='text' class='form-control form-rounded statusHeader tableInputField' name='statusHeader' style='width:100px;' disabled></td>"
//                            + "<td><input type='text' class='form-control form-rounded numeratorHeader tableInputField' name='numeratorHeader' style='width:100px;' disabled></td>"
//                            + "<td><input type='text' class='form-control form-rounded baseUoMHeader tableInputField' name='baseUoMHeader' style='width:100px;' disabled></td>"
//                            + "<td><input type='text' class='form-control form-rounded denoForConvHeader tableInputField' name='denoForConvHeader' style='width:100px;' disabled></td>"
//                            + "<td><input type='text' class='form-control form-rounded uOMExtraHeader tableInputField' name='uOMExtraHeader' style='width:100px;' disabled></td>"
                            + "<td></td>"
                            + "</tr>";
                }

                $("#conditionTableId tbody").append(row);
            } else {

                $("#conditionTableId tbody tr").each(function(i) {
                    var amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
                    var per = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityHeader").val());
                    var condVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
                    if (amount !== 0 && obj[i].AMOUNT !== '') {
                        $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(obj[i].AMOUNT) + parseInt(amount)));
                    } else {
                        $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(obj[i].AMOUNT)));
                    }
                    if (per !== 0 && obj[i].PER !== '') {
                        $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(obj[i].PER) + parseInt(per)));
                    } else {
                        $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(obj[i].PER)));
                    }
                    if (condVal !== 0 && canValArr[i] !== '') {
                        $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(obj[i].CONDITION_VALUE1) + parseInt(condVal)));
                    } else {
                        $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(obj[i].CONDITION_VALUE1)));
                    }
                });
            }
        }
    });
}


function checkDeliveryScheduleTabValidation()
{
    var temp = 0;
    var isValid = "Yes";
    $("#DeliveryScheduleTableId tbody tr").each(function() {
        var schQuantity = removeCommaInNumber($(this).find("td").eq(3).children(".scheduledQuantityClass").val());
        if (schQuantity === "" && schQuantity.toString().trim() === "")
        {
            $(this).find("td").eq(3).children(".scheduledQuantityClass").focus();
            isValid = "No";
            $("#deliverySchedule").addClass("active");
            $("#deliverySchedule-tab").addClass("active");
            $("#deliverySchedule-tab").addClass("show");
            return false;
        }

        temp = Number(schQuantity) + Number(temp);
    });
    console.log("Temp is ::" + temp);
    var Quantity = removeCommaInNumber($("#pOQuantity").val());
    console.log("Quantity is ::" + Quantity);
    if (isValid === "No") {
        if (savePoLineLobiboxNotifyAlert !== null)
        {
            savePoLineLobiboxNotifyAlert.remove();
        }
        savePoLineLobiboxNotifyAlert = Lobibox.notify("error", {
            rounded: true,
            delayIndicator: false,
            msg: "Please Enter Scheduled quantity!"
        });
        $("#deliverySchedule").addClass("active");
        $("#deliverySchedule-tab").addClass("active");
        $("#deliverySchedule-tab").addClass("show");
        return false;
    }
    if (Number(Quantity) !== Number(temp)) {
        if (savePoLineLobiboxNotifyAlert !== null)
        {
            savePoLineLobiboxNotifyAlert.remove();
        }
        savePoLineLobiboxNotifyAlert = Lobibox.notify("error", {
            rounded: true,
            delayIndicator: false,
            msg: "Kindly check quantity in delivery schedule tab.<br>Sum of scheduled quantity should be equal to PO Quantity!"
        });
        $("#deliverySchedule").addClass("active");
        $("#deliverySchedule-tab").addClass("active");
        $("#deliverySchedule-tab").addClass("show");
        return false;
    }
}

function showLoader()
{
    $("#overlay").css("display", "block");
}
function hideLoader()
{
    $("#overlay").css("display", "none");
}

function savePoLineLevelTabData()
{
    var PrType = $("#PrType").val();
    if (PrType === "Service")
    {
        saveServiceTabData();
        saveLimitTabData();
    }

    var isDelSchSaved = saveDeliveryScheduleTabData();
    console.log("isDelSchSaved: " + isDelSchSaved);
    if (isDelSchSaved === false)
    {
        $("#overlay").css("display", "none");
        return false;
    }
    saveDeliveryTabData();
    var isInvoiceSaved = saveInvoiceTabData();
    console.log("isInvoiceSaved: " + isInvoiceSaved);
    if (isInvoiceSaved === false)
    {
        $("#overlay").css("display", "none");
        return false;
    }
    saveConditionTabData();
    saveAccountAssignmentTabData();
    saveTextsTabData();
    saveDeliveryAddressTabData();
    var isConfirmationSaved = saveConfirmationsTabData();
    console.log("isConfirmationSaved: " + isConfirmationSaved);
    if (isConfirmationSaved === false)
    {
        $("#overlay").css("display", "none");
        return false;
    }
    saveConditionControlTabData();
    saveCustomerTabData();
    console.log("Completed Saving Line Item Tab Data++++++++++++++++++++++");
    var insertionid = $(".ItemNumberSelectClass").val();
    var taxCode = $("#TaxCode").val();
    var areAllPrSaved = "Yes";
    $("#material_headerClass tbody tr").each(function() {

        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var pr_quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
        var pr_perUnit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
        var pr_netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
        var pr_currency = $(this).find("td").eq(13).children(".currencyClass").val();
        var pr_linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
        if (id === insertionid)
        {
            var prTaxAmount = "";
            prTaxAmount = prTaxAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_perUnit);
            $(this).find("td").eq(0).children(".isPrSaved").val("Yes");
            $(this).find("td").eq(0).children(".prTaxAmount").val(prTaxAmount);
        }

        var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
        if (isPrSaved !== "Yes")
        {
            areAllPrSaved = "No";
        }
    });
    console.log("areAllPrSaved: " + areAllPrSaved);
    if (areAllPrSaved === "Yes")
    {
        var totalPoAmount = 0;
        var totalPoAmountExcludingVendor = 0;
        var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
        $("#material_headerClass tbody tr").each(function(index) {

            var pr_quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            var pr_perUnit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
            var pr_netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            var pr_currency = $(this).find("td").eq(13).children(".currencyClass").val();
            var pr_linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
            totalPoAmount = totalPoAmount + totalPoAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_linkId, vendorCode, "IncludingVendor", pr_perUnit);
            console.log("index: " + (index + 1) + ", totalPoAmount: " + totalPoAmount);
            totalPoAmountExcludingVendor = totalPoAmountExcludingVendor + totalPoAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_linkId, vendorCode, "ExcludingVendor", pr_perUnit);
            console.log("index: " + (index + 1) + ", totalPoAmountExcludingVendor: " + totalPoAmountExcludingVendor);
        });
        console.log("totalPoAmount: " + Number(totalPoAmount).toFixed(2));
        console.log("totalPoAmountExcludingVendor: " + Number(totalPoAmountExcludingVendor).toFixed(2));
        $("#totalPoAmt").val(Number(totalPoAmount).toFixed(2));
        $("#totalPoAmtExcludingVendor").val(Number(totalPoAmountExcludingVendor).toFixed(2));
    }

    $("#savePoLineItemData").prop("disabled", false);
    $("#savePoLineItemData").html("Save");
    $("#savePoLineSpinner").css("visibility", "hidden");
    Lobibox.alert("success", {
        msg: "Data Saved successfully."
    });
//    $('#addRowConditionsBtnId').css('pointer-events', '');
//    $("#addRowConditionsBtnId").css("background-color", "");
}
function addRowInConditionTableInHeader(obj, uom, prCurrency) {
    var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
    $("#conditionTableId tbody tr").remove();
    var row = "";
//    alert(obj.length);
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].CTYPE !== undefined && obj[i].CTYPE !== "")
        {
            row += "<tr>"
                    + "<td>\n\
                    <input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'><input type='hidden' class='conditionVendorHeader' value='" + vendorcode + "'><input type='hidden' class='lineAddedFromHeader' value='headerlevel'><input type='hidden' class='conditionindex' value='" + (obj[i].conditionIndex === undefined ? '' : obj[i].conditionIndex) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' disabled = 'true' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' style='width:200px;' name='nameConditionsHeader' disabled = 'true' value='" + obj[i].NAME + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' style='width:150px;' name='AmountHeader' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value=" + obj[i].CRCY + " disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' style='width:150px;' name='PerQuantityHeader' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value=" + uom + " disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' style='width:50px;' value=" + uom + " disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width:150px;' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' disabled = 'true' value='" + obj[i].CURRENCY2 + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (obj[i].KAPPL === undefined ? '' : obj[i].KAPPL) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (obj[i].KVSL1 === undefined ? '' : obj[i].KVSL1) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (obj[i].KVSL2 === undefined ? '' : obj[i].KVSL2) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (obj[i].ZAEHK === undefined ? '' : obj[i].ZAEHK) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (obj[i].STUNR === undefined ? '' : obj[i].STUNR) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='U'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value=''></td>"
////                    + "<td><input type='text' class='form-control form-rounded conditionDetailsHeader tableInputField' name='conditionDetailsHeader' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded statusHeader tableInputField' name='statusHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded numeratorHeader tableInputField' name='numeratorHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded baseUoMHeader tableInputField' name='baseUoMHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded denoForConvHeader tableInputField' name='denoForConvHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded uOMExtraHeader tableInputField' name='uOMExtraHeader' style='width:100px;' disabled></td>"
                    + "<td></td>"
                    + "</tr>";
        }
        else if (obj[i].CTYPE === undefined || obj[i].CTYPE === "")
        {
            row += "<tr>"
                    + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'><input type='hidden' class='conditionVendorHeader'><input type='hidden' class='lineAddedFromHeader' value='headerlevel'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' disabled = 'true' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' style='width:200px;' name='nameConditionsHeader' disabled = 'true' value='" + obj[i].NAME + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' style='width:150px;' name='AmountHeader' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value=" + obj[i].CRCY + " disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' style='width:150px;' name='PerQuantityHeader' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value=" + uom + "></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' style='width:50px;' value=" + uom + " disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' disabled = 'true' value='" + obj[i].CURRENCY2 + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (obj[i].KAPPL === undefined ? '' : obj[i].KAPPL) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (obj[i].KVSL1 === undefined ? '' : obj[i].KVSL1) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (obj[i].KVSL2 === undefined ? '' : obj[i].KVSL2) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (obj[i].ZAEHK === undefined ? '' : obj[i].ZAEHK) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (obj[i].STUNR === undefined ? '' : obj[i].STUNR) + "'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='U'>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value=''>\n\
                            <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value=''></td>"
//                    + "<td><input type='text' class='form-control form-rounded conditionDetailsHeader tableInputField' name='conditionDetailsHeader' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded statusHeader tableInputField' name='statusHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded numeratorHeader tableInputField' name='numeratorHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded baseUoMHeader tableInputField' name='baseUoMHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded denoForConvHeader tableInputField' name='denoForConvHeader' style='width:100px;' disabled></td>"
//                    + "<td><input type='text' class='form-control form-rounded uOMExtraHeader tableInputField' name='uOMExtraHeader' style='width:100px;' disabled></td>"
                    + "<td></td>"
                    + "</tr>";
        }
    }
    $("#conditionTableId tbody").append(row);
    $("#conditionTableId tbody tr").each(function() {
        var currency = $(this).find("td").eq(4).children(".CurrencyHeader").val();
        console.log("condition Currency :" + currency);
        if (currency !== "%") {
            $(this).find("td").eq(4).children(".CurrencyHeader").val(prCurrency);
        } else {
            $(this).find("td").eq(4).children(".CurrencyHeader").val("%");
        }
    });
    var PrType = $("#PrType").val();
    var PoFrom = $("#PoFrom").val();
    if (PrType === "Service" || PoFrom === "byrfq") {
        calculatePBXXForHeader();
    }
}

