$(document).ready(function() {

    var draftPo = $("#draftPo").val();
    console.log("draftPo: " + draftPo);
    if (draftPo === "Yes")
    {
//        $("#lineLevelTabsDiv").css("display", "none");
//        var prCount = $("#material_headerClass tbody tr").length;
//        if (prCount === 1) {
//            $("#material_headerClass tbody tr").each(function() {
//                var insertionId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//                $("#ItemNumberSelect").val(insertionId);
//                $("#ItemNumberSelect").trigger("change");
//            });
//        }
    }

    $(".edit-draft-po").click(function() {
        var extId = $(this).parent().children(".extId").val();
        var poFrom = $(this).parent().children(".poFromClass").val();
        var selectedVendorIdClass = $(this).parent().children(".selectedVendorIdClass").val();
        var vendorFinalizationTableDataArrayAsJsonStringClass = $(this).parent().children(".vendorFinalizationTableDataArrayAsJsonStringClass").val();
        console.log("extId: " + extId);
        console.log("poFrom: " + poFrom);
        console.log("selectedVendorIdClass: " + selectedVendorIdClass);
        console.log("vendorFinalizationTableDataArrayAsJsonStringClass: " + vendorFinalizationTableDataArrayAsJsonStringClass);

        $("#draftPoExtId").val(extId);
        $("#reqFrom").val(poFrom);
        if (poFrom === "byrfq") {
            $("#SelectedVendorId").val(selectedVendorIdClass);
            $("#vendorFinalizationTableDataArrayAsJsonString").val(vendorFinalizationTableDataArrayAsJsonStringClass);
        }
        $("#draftPoForm").submit();
    });

    var lobiboxNotifyAlert = null;
    $("#saveAndCloseBtn").click(function() {
        console.log("Save & Close PO============");
        var POHeaderJsonData = {};
        var POHeaderDeliveryInvoiceJsonData = {};
        var POHeaderVendorAddressJsonData = {};
        var POHeaderCommunicationJsonData = {};
        var POHeaderHeaderTextJsonData = {};
        var POHeaderCustomerDataJsonData = {};
        var POLineItemJsonDataArray = [];
        var POHeaderConditionJsonDataArray = [];
        var POHeaderApprovalDetailsJsonDataArray = [];

        var companycode = $("#companycodeHeader").val();
        var vendorCodeName = $("#vendorSno").val(); // $("#vendorcodeHeader").val();
        var typeOfPOHeader = $("#typeOfPOHeader").val();

        if (companycode === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Company Code can not be empty!"
            });
            return false;
        }
        if (typeOfPOHeader === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select PO Type!"
            });
            $("#typeOfPOHeader").focus();
            return false;
        }
        if (vendorCodeName === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select vendor!"
            });
            $("#vendorcodeHeader").focus();
            return false;
        }
        var vendorSno = $("#vendorSno").val(); // $("#vendorcodeHeader").val();
        var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        var vendorCode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length);
        var vendorName = vendor.substring(0, vendor.lastIndexOf('-'));
        console.log(vendorCode + ", " + vendorName);
        var downPaymentReqd = $("#downPaymentReqd").val();
        var purchasingOrg = $("#purchasingOrg").val();
        var purchasingGroup = $("#purchasingGroup").val();
        var downPaymentFor = $("#downPaymentFor").val();
        var downPaymentReqdValue = $("#downPaymentReqdValue").val();
        var CollectiveNumber = $("#CollectiveNumber").val();

        var paymentTermsDelivery = $("#paymentTermsDelivery").val();
        var CurrencyDeliveryInvoice = $("#CurrencyDeliveryInvoice").val();
        var paymentinpercnt1 = $("#paymentPer1").val();
        var paymentinpercnt2 = $("#paymentPer2").val();
        var paymentindays1 = $("#paymentDays1").val();
        var paymentindays2 = $("#paymentDays2").val();
        var ExchangeRate = $("#ExchangeRate").val();
        var paymentindaysnet = $("#paymentDaysNet").val();
        var incoterms1 = $("#IncoTermsPart1").val();
        var incoterms2 = $("#IncoTermsPart2").val();

        var gRMessage = "";
        var exchangeRateFixed = "";
        if ($("#GRMessage").prop("checked")) {
            gRMessage = "true";
        } else {
            gRMessage = "false";
        }
        if ($("#ExchangeReateFixed").prop("checked")) {
            exchangeRateFixed = "true";
        } else {
            exchangeRateFixed = "false";
        }

        var streetVendorAddress = $("#streetVendorAddress").val();
        var houseNumberVendorAddress = $("#houseNumberVendorAddress").val();
        var postalCodeVendorAddress = $("#postalCodeVendorAddress").val();
        var cityVendorAddress = $("#cityVendorAddress").val();
        var extTel = $("#extTel").val();
        var telephoneVendorAddress = $("#telephoneVendorAddress").val();
        var extFax = $("#extFax").val();
        var faxVendorAddress = $("#faxVendorAddress").val();
        var countryCodeVendorAddress = $("#countryCodeVendorAddress").val();
        var countryVendorAddress = $("#countryVendorAddress").val();

        var Salesperson = $("#Salesperson").val();
        var YourReference = $("#YourReference").val();
        var Telephone = $("#Telephone").val();
        var OurReference = $("#OurReference").val();
        var Language = $("#Language").val();

        var pONotetoApproverHeaderTextsLimits = $("#pONotetoApproverHeaderTextsLimits").val();
        var HeaderNote = $("#HeaderNote").val();
        var PricingTypes = $("#PricingTypes").val();
        var Deadlines = $("#Deadlines").val();
        var TermsofDelivery = $("#TermsofDelivery").val();
        var TermsofPayment = $("#TermsofPayment").val();
        var ShippingInstructions = $("#ShippingInstructions").val();
        var VendorMemoGeneral = $("#VendorMemoGeneral").val();
        var VendorMemoSpecial = $("#VendorMemoSpecial").val();
        var HeaderText = $("#headerText").val();

        var PaymentImmediate = "";

        if ($("#PaymentImmediate").prop("checked") === true) {

            PaymentImmediate = "true";
        } else {
            PaymentImmediate = "false";
        }

        var ExternalWeight = "";
        if ($("#ExternalWeight").prop("checked") === true) {
            ExternalWeight = "true";
        } else {
            ExternalWeight = "false";
        }

        var PriceDisplay = "";
        if ($("#PriceDisplay").prop("checked") === true) {
            PriceDisplay = "true";
        } else {
            PriceDisplay = "false";
        }
        var InstructionToWeigher = $("#InstructionToWeigher").val();
        var ZoneCollectionScrap = $("#ZoneCollectionScrap").val();
        var ProductOrigin = $("#ProductOrigin").val();
        var SegmentDescription = $("#SegmentDescription").val();
        var ConfControl = $("#ConfControl").val();

        var poNumber = $("#poNumber").val();
        console.log("poNumber: " + poNumber);
        var docDateHeader = $("#docDateHeader").val();
        console.log("docDateHeader: " + docDateHeader);
        var PoSequenceNumber = $("#PO_SequenceNO").val();
        console.log("PoSequenceNumber: " + PoSequenceNumber);
        var Pid = $("#Pid").val();
        console.log("Pid: " + Pid);

        var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
        var newRfqLineRfqIdRfqLineIdInsertionOrderId = $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val();

        /*Header Data*/
        POHeaderJsonData["companycode"] = companycode;
        POHeaderJsonData["vendorSno"] = vendorSno;
        POHeaderJsonData["vendorName"] = vendorName;
        POHeaderJsonData["vendorCode"] = vendorCode;
        POHeaderJsonData["typeOfPOHeader"] = typeOfPOHeader;
        POHeaderJsonData["downPaymentReqd"] = downPaymentReqd;
        POHeaderJsonData["purchasingOrg"] = purchasingOrg;
        POHeaderJsonData["purchasingGroup"] = purchasingGroup;
        POHeaderJsonData["downPaymentFor"] = downPaymentFor;
        POHeaderJsonData["downPaymentReqdValue"] = downPaymentReqdValue;
        POHeaderJsonData["CollectiveNumber"] = CollectiveNumber;
        POHeaderJsonData["prType"] = $("#PrType").val();
        POHeaderJsonData["poFrom"] = $("#PoFrom").val();
        POHeaderJsonData["selectedVendorId"] = vendorSno;
        POHeaderJsonData["vendorFinalizationTableDataArrayAsJsonString"] = $("#VendorFinalizationTableDataArrayAsJsonString").val() === "" ? "NA" : $("#VendorFinalizationTableDataArrayAsJsonString").val();
        
        if($("#PoFrom").val() === "createpo" || $("#PoFrom").val() === "byrfq")
            POHeaderJsonData["poNumber"] = $("#PoNumber").val();
        else
            POHeaderJsonData["poNumber"] = poNumber === "" || poNumber === undefined ? "NA" : poNumber;
        
        POHeaderJsonData["poSequenceNumber"] = PoSequenceNumber === "" || PoSequenceNumber === undefined ? "NA" : PoSequenceNumber;
        POHeaderJsonData["pid"] = Pid === "" || Pid === undefined ? "NA" : Pid;
        POHeaderJsonData["docDateHeader"] = docDateHeader === "" || docDateHeader === undefined ? "NA" : docDateHeader;
        POHeaderJsonData["newPrLineInsertionOrderId"] = newPrLineInsertionOrderId === "" || newPrLineInsertionOrderId === undefined ? "NA" : newPrLineInsertionOrderId;
        POHeaderJsonData["newRfqLineRfqIdRfqLineIdInsertionOrderId"] = newRfqLineRfqIdRfqLineIdInsertionOrderId === "" || newRfqLineRfqIdRfqLineIdInsertionOrderId === undefined ? "NA" : newRfqLineRfqIdRfqLineIdInsertionOrderId;
        POHeaderJsonData["requestType"] = $("#requestType").val() === "" || $("#requestType").val() === undefined ? "NA" : $("#requestType").val();
        POHeaderJsonData["referenceDocType"] = $("#referenceDocType").val() === "" || $("#referenceDocType").val() === undefined ? "NA" : $("#referenceDocType").val();
        
        /*Status Tab*/
        POHeaderJsonData["ordered"] = $("#ordered").val() === "" || $("#ordered").val() === undefined ? "" : removeCommaInNumber($("#ordered").val());
        POHeaderJsonData["orderedUnit"] = $("#orderedUnit").val() === "" || $("#orderedUnit").val() === undefined ? "" : $("#orderedUnit").val();
        POHeaderJsonData["orderedTotalPrice"] = $("#orderedTotalPrice").val() === "" || $("#orderedTotalPrice").val() === undefined ? "" : removeCommaInNumber($("#orderedTotalPrice").val());
        POHeaderJsonData["orderedCurrency"] = $("#orderedCurrency").val() === "" || $("#orderedCurrency").val() === undefined ? "" : $("#orderedCurrency").val();

        POHeaderJsonData["delivered"] = $("#delivered").val() === "" || $("#delivered").val() === undefined ? "" : removeCommaInNumber($("#delivered").val());
        POHeaderJsonData["deliveredUnit"] = $("#deliveredUnit").val() === "" || $("#deliveredUnit").val() === undefined ? "" : $("#deliveredUnit").val();
        POHeaderJsonData["deliveredTotalPrice"] = $("#deliveredTotalPrice").val() === "" || $("#deliveredTotalPrice").val() === undefined ? "" : removeCommaInNumber($("#deliveredTotalPrice").val());
        POHeaderJsonData["deliveredCurrency"] = $("#deliveredCurrency").val() === "" || $("#deliveredCurrency").val() === undefined ? "" : $("#deliveredCurrency").val();
        
        POHeaderJsonData["stillToDeliv"] = $("#stillToDeliv").val() === "" || $("#stillToDeliv").val() === undefined ? "" : removeCommaInNumber($("#stillToDeliv").val());
        POHeaderJsonData["stillToDelivUnit"] = $("#stillToDelivUnit").val() === "" || $("#stillToDelivUnit").val() === undefined ? "" : $("#stillToDelivUnit").val();
        POHeaderJsonData["stillToDelivTotalPrice"] = $("#stillToDelivTotalPrice").val() === "" || $("#stillToDelivTotalPrice").val() === undefined ? "" : removeCommaInNumber($("#stillToDelivTotalPrice").val());
        POHeaderJsonData["stillToDelivCurrency"] = $("#stillToDelivCurrency").val() === "" || $("#stillToDelivCurrency").val() === undefined ? "" : $("#stillToDelivCurrency").val();
        
        POHeaderJsonData["invoiced"] = $("#invoiced").val() === "" || $("#invoiced").val() === undefined ? "" : removeCommaInNumber($("#invoiced").val());
        POHeaderJsonData["invoicedUnit"] = $("#invoicedUnit").val() === "" || $("#invoicedUnit").val() === undefined ? "" : $("#invoicedUnit").val();
        POHeaderJsonData["invoicedTotalPrice"] = $("#invoicedTotalPrice").val() === "" || $("#invoicedTotalPrice").val() === undefined ? "" : removeCommaInNumber($("#invoicedTotalPrice").val());
        POHeaderJsonData["invoicedCurrency"] = $("#invoicedCurrency").val() === "" || $("#invoicedCurrency").val() === undefined ? "" : $("#invoicedCurrency").val();
        
        POHeaderJsonData["downpayments"] = $("#downpayments").val() === "" || $("#downpayments").val() === undefined ? "" : removeCommaInNumber($("#downpayments").val());
        POHeaderJsonData["downpaymentsUnit"] = $("#downpaymentsUnit").val() === "" || $("#downpaymentsUnit").val() === undefined ? "" : $("#downpaymentsUnit").val();
        POHeaderJsonData["downpaymentsTotalPrice"] = $("#downpaymentsTotalPrice").val() === "" || $("#downpaymentsTotalPrice").val() === undefined ? "" : removeCommaInNumber($("#downpaymentsTotalPrice").val());
        POHeaderJsonData["downpaymentsCurrency"] = $("#downpaymentsCurrency").val() === "" || $("#downpaymentsCurrency").val() === undefined ? "" : $("#downpaymentsCurrency").val();
        
        console.log("conditionLineLevelArray len: " + conditionLineLevelArray.length);
        var conditionLineLevelArrayAsJsonString = JSON.stringify(conditionLineLevelArray);
        console.log("conditionLineLevelArrayAsJsonString :" + conditionLineLevelArrayAsJsonString);        
        POHeaderJsonData["headerConditionsNew"] = conditionLineLevelArrayAsJsonString;
        POHeaderJsonData["kalsm"] = $("#kalsmHiddenfield").val();
        
        /*Delivery Invoice*/
        POHeaderDeliveryInvoiceJsonData["paymentTermsDelivery"] = paymentTermsDelivery;
        POHeaderDeliveryInvoiceJsonData["CurrencyDeliveryInvoice"] = CurrencyDeliveryInvoice;
        POHeaderDeliveryInvoiceJsonData["paymentinpercnt1"] = paymentinpercnt1;
        POHeaderDeliveryInvoiceJsonData["paymentinpercnt2"] = paymentinpercnt2;
        POHeaderDeliveryInvoiceJsonData["paymentindays1"] = paymentindays1;
        POHeaderDeliveryInvoiceJsonData["paymentindays2"] = paymentindays2;
        POHeaderDeliveryInvoiceJsonData["ExchangeRate"] = ExchangeRate;
        POHeaderDeliveryInvoiceJsonData["paymentInDaysNet"] = paymentindaysnet;
        POHeaderDeliveryInvoiceJsonData["incoterms1"] = incoterms1;
        POHeaderDeliveryInvoiceJsonData["incoterms2"] = incoterms2;
        POHeaderDeliveryInvoiceJsonData["gRMessage"] = gRMessage;
        POHeaderDeliveryInvoiceJsonData["exchangeRateFixed"] = exchangeRateFixed;
        /*Vendor Address*/
        POHeaderVendorAddressJsonData["streetVendorAddress"] = streetVendorAddress;
        POHeaderVendorAddressJsonData["houseNumberVendorAddress"] = houseNumberVendorAddress;
        POHeaderVendorAddressJsonData["postalCodeVendorAddress"] = postalCodeVendorAddress;
        POHeaderVendorAddressJsonData["cityVendorAddress"] = cityVendorAddress;
        POHeaderVendorAddressJsonData["extTel"] = extTel;
        POHeaderVendorAddressJsonData["telephoneVendorAddress"] = telephoneVendorAddress;
        POHeaderVendorAddressJsonData["extFax"] = extFax;
        POHeaderVendorAddressJsonData["faxVendorAddress"] = faxVendorAddress;
        POHeaderVendorAddressJsonData["countryCodeVendorAddress"] = countryCodeVendorAddress;
        POHeaderVendorAddressJsonData["countryVendorAddress"] = countryVendorAddress;
        /*Communication*/
        POHeaderCommunicationJsonData["Salesperson"] = Salesperson;
        POHeaderCommunicationJsonData["YourReference"] = YourReference;
        POHeaderCommunicationJsonData["Telephone"] = Telephone;
        POHeaderCommunicationJsonData["OurReference"] = OurReference;
        POHeaderCommunicationJsonData["Language"] = Language;
        /*Header Text*/
        POHeaderHeaderTextJsonData["pONotetoApproverHeaderTextsLimits"] = pONotetoApproverHeaderTextsLimits;
        POHeaderHeaderTextJsonData["HeaderNote"] = HeaderNote;
        POHeaderHeaderTextJsonData["PricingTypes"] = PricingTypes;
        POHeaderHeaderTextJsonData["Deadlines"] = Deadlines;
        POHeaderHeaderTextJsonData["TermsofDelivery"] = TermsofDelivery;
        POHeaderHeaderTextJsonData["TermsofPayment"] = TermsofPayment;
        POHeaderHeaderTextJsonData["ShippingInstructions"] = ShippingInstructions;
        POHeaderHeaderTextJsonData["VendorMemoGeneral"] = VendorMemoGeneral;
        POHeaderHeaderTextJsonData["VendorMemoSpecial"] = VendorMemoSpecial;
        POHeaderHeaderTextJsonData["HeaderText"] = HeaderText;

        /*Customer Data*/
        if (typeOfPOHeader === 'Non-Ferrous PO - Imp' || typeOfPOHeader === 'Ferrous Joint Pur' || typeOfPOHeader === 'Ferrous PO - Import' || typeOfPOHeader === 'Ferrous PO - Local'
                || typeOfPOHeader === 'Non-Ferrous PO - Loc') {

            POHeaderCustomerDataJsonData["PaymentImmediate"] = PaymentImmediate;
            POHeaderCustomerDataJsonData["ExternalWeight"] = ExternalWeight;
            POHeaderCustomerDataJsonData["PriceDisplay"] = PriceDisplay;
            POHeaderCustomerDataJsonData["InstructionToWeigher"] = InstructionToWeigher;
            POHeaderCustomerDataJsonData["ZoneCollectionScrap"] = ZoneCollectionScrap;
            POHeaderCustomerDataJsonData["ProductOrigin"] = ProductOrigin;
            POHeaderCustomerDataJsonData["SegmentDescription"] = SegmentDescription;
            POHeaderCustomerDataJsonData["ConfControl"] = ConfControl;

            POHeaderJsonData["POHeaderCustomerDataJsonData"] = POHeaderCustomerDataJsonData;
        }

        /*Conditions Start*/
        var conType = "";
        var name = "";
        var amount = "";
        var perQuant = "";
        console.log("cond len: " + $("#conditionTableId tbody tr").length);
        $("#conditionTableId tbody tr").each(function(index) {
//            console.log("index: " + index);
            var POConditionDataAsJsonObject = {};
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                conType = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            }
            if ($(this).find("td").eq(2).children("input").hasClass("nameConditionsHeader") === true) {
                name = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
            }
            if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
            }
            if ($(this).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityHeader").val());
            }
            var conPrUnit = $(this).find("td").eq(6).children(".ConditionPricingUnitHeader").val();
            var curr1 = $(this).find("td").eq(4).children(".CurrencyHeader").val();
            var uOM = $(this).find("td").eq(7).children(".UoMHeader").val();
            var conVal1 = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
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
        /*conditions Ends*/
        
        /*Approval Details Start*/
        $("#approvalDetailsTable tbody tr").each(function(index) {
            var POApprovalDetailsDataAsJsonObject = {};
            
            var level = $(this).find("td").eq(0).text();
            var name = $(this).find("td").eq(1).text();

            POApprovalDetailsDataAsJsonObject["level"] = level;
            POApprovalDetailsDataAsJsonObject["name"] = name;

            POHeaderApprovalDetailsJsonDataArray.push(POApprovalDetailsDataAsJsonObject);
        });
        console.log("POHeaderApprovalDetailsJsonDataArray len: " + POHeaderApprovalDetailsJsonDataArray.length);
        /*Approval Details End*/
        
        $("#material_headerClass tbody tr").each(function() {
            var poLineItemJsonObj = {};
            poLineItemJsonObj["insertionOrderId"] = $(this).find("td").eq(0).children(".insertionOrderId_Class").val() === "" || $(this).find("td").eq(0).children(".insertionOrderId_Class").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            poLineItemJsonObj["linkId"] = $(this).find("td").eq(0).children(".linkId_Class").val() === "" || $(this).find("td").eq(0).children(".linkId_Class").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".linkId_Class").val();
            poLineItemJsonObj["pid"] = $(this).find("td").eq(0).children(".procInstId_Class").val() === "" || $(this).find("td").eq(0).children(".procInstId_Class").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".procInstId_Class").val();
            poLineItemJsonObj["prType"] = $(this).find("td").eq(0).children(".prType_Class").val() === "" || $(this).find("td").eq(0).children(".prType_Class").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prType_Class").val();
            poLineItemJsonObj["prNumber"] = $(this).find("td").eq(0).children(".prNumber_Class").val() === "" || $(this).find("td").eq(0).children(".prNumber_Class").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prNumber_Class").val();
            poLineItemJsonObj["itemNumber"] = $(this).find("td").eq(0).children(".PRItemNumber_Class").val() === "" || $(this).find("td").eq(0).children(".PRItemNumber_Class").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            poLineItemJsonObj["coCode"] = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val() === "" || $(this).find("td").eq(0).children(".PRCompanyCode_Class").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
            poLineItemJsonObj["poDistribution"] = $(this).find("td").eq(0).children(".PODistribution").val() === "" || $(this).find("td").eq(0).children(".PODistribution").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".PODistribution").val();
            poLineItemJsonObj["poPartialInvoiceIndicator"] = $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val() === "" || $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val();
            poLineItemJsonObj["valuationPrice"] = $(this).find("td").eq(0).children(".ValuationPrice").val() === "" || $(this).find("td").eq(0).children(".ValuationPrice").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".ValuationPrice").val();
            poLineItemJsonObj["isPrSaved"] = $(this).find("td").eq(0).children(".isPrSaved").val() === "" || $(this).find("td").eq(0).children(".isPrSaved").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".isPrSaved").val();
            poLineItemJsonObj["prTaxAmount"] = $(this).find("td").eq(0).children(".prTaxAmount").val() === "" || $(this).find("td").eq(0).children(".prTaxAmount").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prTaxAmount").val();
            poLineItemJsonObj["prComments"] = $(this).find("td").eq(0).children(".prComments").val() === "" || $(this).find("td").eq(0).children(".prComments").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prComments").val();
            poLineItemJsonObj["noLimit"] = $(this).find("td").eq(0).children(".noLimitHidden").val() === "" || $(this).find("td").eq(0).children(".noLimitHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".noLimitHidden").val();
            poLineItemJsonObj["overAllLimit"] = $(this).find("td").eq(0).children(".overAllLimitHidden").val() === "" || $(this).find("td").eq(0).children(".overAllLimitHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".overAllLimitHidden").val();
            poLineItemJsonObj["expectedValue"] = $(this).find("td").eq(0).children(".expectedValueHidden").val() === "" || $(this).find("td").eq(0).children(".expectedValueHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".expectedValueHidden").val();
            poLineItemJsonObj["invoiceReceipt"] = $(this).find("td").eq(0).children(".invoiceReceiptHidden").val() === "" || $(this).find("td").eq(0).children(".invoiceReceiptHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".invoiceReceiptHidden").val();
            poLineItemJsonObj["goodsReceipt"] = $(this).find("td").eq(0).children(".goodsReceiptHidden").val() === "" || $(this).find("td").eq(0).children(".goodsReceiptHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".goodsReceiptHidden").val();
            poLineItemJsonObj["prDeliveryDateCategory"] = $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val() === "" || $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val();
            poLineItemJsonObj["prRequisitionDate"] = $(this).find("td").eq(0).children(".prRequisitionDateHidden").val() === "" || $(this).find("td").eq(0).children(".prRequisitionDateHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prRequisitionDateHidden").val();
            poLineItemJsonObj["prMaterialLongTextHidden"] = $(this).find("td").eq(0).children(".prMaterialLongTextHidden").val() === "" || $(this).find("td").eq(0).children(".prMaterialLongTextHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prMaterialLongTextHidden").val();
            poLineItemJsonObj["confirmationControlForLineInPr"] = $(this).find("td").eq(0).children(".ConfirmationControlForLineInPr").val() === "" || $(this).find("td").eq(0).children(".ConfirmationControlForLineInPr").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".ConfirmationControlForLineInPr").val();
            poLineItemJsonObj["texCodeForLineInPr"] = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val() === "" || $(this).find("td").eq(0).children(".TexCodeForLineInPr").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
            poLineItemJsonObj["segmentForLineInPr"] = $(this).find("td").eq(0).children(".SegmentForLineInPr").val() === "" || $(this).find("td").eq(0).children(".SegmentForLineInPr").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".SegmentForLineInPr").val();
            poLineItemJsonObj["prPackageNo"] = $(this).find("td").eq(0).children(".prPackageNo").val() === "" || $(this).find("td").eq(0).children(".prPackageNo").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prPackageNo").val();
            poLineItemJsonObj["serviceRefLineNo"] = $(this).find("td").eq(0).children(".serviceRefLineNo").val() === "" || $(this).find("td").eq(0).children(".serviceRefLineNo").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".serviceRefLineNo").val();
            poLineItemJsonObj["lineType"] = $(this).find("td").eq(0).children(".lineType").val() === "" || $(this).find("td").eq(0).children(".lineType").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".lineType").val();
            poLineItemJsonObj["isPoLineOrPrLineOrRfqLineOrEmptyLine"] = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val() === "" || $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            poLineItemJsonObj["prRfqNumber"] = $(this).find("td").eq(0).children(".prRfqNumber").val() === "" || $(this).find("td").eq(0).children(".prRfqNumber").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prRfqNumber").val();
            poLineItemJsonObj["prRfqLineItemNumber"] = $(this).find("td").eq(0).children(".prRfqLineItemNumber").val() === "" || $(this).find("td").eq(0).children(".prRfqLineItemNumber").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prRfqLineItemNumber").val();
            poLineItemJsonObj["quantityBeforeChange"] = $(this).find("td").eq(0).children(".quantityBeforeChange").val() === "" || $(this).find("td").eq(0).children(".quantityBeforeChange").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".quantityBeforeChange").val();
            poLineItemJsonObj["netPriceHidden"] = $(this).find("td").eq(0).children(".prNetPriceHidden").val() === "" || $(this).find("td").eq(0).children(".prNetPriceHidden").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prNetPriceHidden").val();

            if ($(this).find("td").eq(12).children(".pr-net-price").val() === "")
                poLineItemJsonObj["untiPrice"] = "0.0";
            else
                poLineItemJsonObj["untiPrice"] = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            
            var prDeliveryDate = $(this).find("td").eq(11).children(".PR_DeliveryDate").text() === "" || $(this).find("td").eq(11).children(".PR_DeliveryDate").text() === undefined ? "NA" : $(this).find("td").eq(11).children(".PR_DeliveryDate").text();
            console.log("prDeliveryDate 1: " + prDeliveryDate);
            if(prDeliveryDate !== "NA") {
                var tempDateArr = prDeliveryDate.toString().split(".");
                prDeliveryDate = tempDateArr[0] + "/" + tempDateArr[1] + "/" + tempDateArr[2];
                console.log("prDeliveryDate 2: " + prDeliveryDate);
            }
            
            poLineItemJsonObj["accountAssignment"] = $(this).find("td").eq(2).children(".accountAssignmentClass").val() === "" || $(this).find("td").eq(2).children(".accountAssignmentClass").val() === undefined ? "NA" : $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            poLineItemJsonObj["itemCategory"] = $(this).find("td").eq(3).children(".itemCategoryClass").val() === "" || $(this).find("td").eq(3).children(".itemCategoryClass").val() === undefined ? "NA" : $(this).find("td").eq(3).children(".itemCategoryClass").val();
            poLineItemJsonObj["materialCode"] = $(this).find("td").eq(4).children(".materialCodeClass").val() === "" || $(this).find("td").eq(4).children(".materialCodeClass").val() === undefined ? "NA" : $(this).find("td").eq(4).children(".materialCodeClass").val();
            poLineItemJsonObj["shortText"] = $(this).find("td").eq(5).children(".pr-short-text").val() === "" || $(this).find("td").eq(5).children(".pr-short-text").val() === undefined ? "NA" : $(this).find("td").eq(5).children(".pr-short-text").val();
            poLineItemJsonObj["quantity"] = $(this).find("td").eq(6).children(".pr-quantity").val() === "" || $(this).find("td").eq(6).children(".pr-quantity").val() === undefined ? "NA" : removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            poLineItemJsonObj["uom"] = $(this).find("td").eq(7).children(".prUom").val() === "" || $(this).find("td").eq(7).children(".prUom").val() === undefined ? "NA" : $(this).find("td").eq(7).children(".prUom").val();
            poLineItemJsonObj["orderPriceUnit"] = $(this).find("td").eq(8).children(".prOrderPriceUnit").val() === "" || $(this).find("td").eq(8).children(".prOrderPriceUnit").val() === undefined ? "NA" : $(this).find("td").eq(8).children(".prOrderPriceUnit").val();
            poLineItemJsonObj["criticality"] = $(this).find("td").eq(9).children(".criticalityClass").val() === "" || $(this).find("td").eq(9).children(".criticalityClass").val() === undefined ? "NA" : $(this).find("td").eq(9).children(".criticalityClass").val();
            poLineItemJsonObj["deliveryDate"] = prDeliveryDate;
            poLineItemJsonObj["currency"] = $(this).find("td").eq(13).children(".currencyClass").val() === "" || $(this).find("td").eq(13).children(".currencyClass").val() === undefined ? "NA" : $(this).find("td").eq(13).children(".currencyClass").val();
            poLineItemJsonObj["perUnit"] = $(this).find("td").eq(14).children(".priceUnitClass").val() === "" || $(this).find("td").eq(14).children(".priceUnitClass").val() === undefined ? "NA" : removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
            poLineItemJsonObj["materialGroup"] = $(this).find("td").eq(15).children(".materialGroupClass").val() === "" || $(this).find("td").eq(15).children(".materialGroupClass").val() === undefined ? "NA" : $(this).find("td").eq(15).children(".materialGroupClass").val();
            poLineItemJsonObj["plantCode"] = $(this).find("td").eq(16).children(".hiddenPlantCode").val() === "" || $(this).find("td").eq(16).children(".hiddenPlantCode").val() === undefined ? "NA" : $(this).find("td").eq(16).children(".hiddenPlantCode").val();
            poLineItemJsonObj["storageLocation"] = $(this).find("td").eq(17).children(".storageLocationClass").val() === "" || $(this).find("td").eq(17).children(".storageLocationClass").val() === undefined ? "NA" : $(this).find("td").eq(17).children(".storageLocationClass").val();
            poLineItemJsonObj["batch"] = $(this).find("td").eq(18).text() === "" || $(this).find("td").eq(18).text() === undefined ? "NA" : $(this).find("td").eq(18).text();
            poLineItemJsonObj["trackingNumber"] = $(this).find("td").eq(19).children(".pr-tracking-number").val() === "" || $(this).find("td").eq(19).children(".pr-tracking-number").val() === undefined ? "NA" : $(this).find("td").eq(19).children(".pr-tracking-number").val();
            poLineItemJsonObj["infoRecord"] = $(this).find("td").eq(20).text() === "" || $(this).find("td").eq(20).text() === undefined ? "NA" : $(this).find("td").eq(20).text();
            poLineItemJsonObj["purchaseOrganization"] = $(this).find("td").eq(21).children(".purchaseOrganizationClass").val() === "" || $(this).find("td").eq(21).children(".purchaseOrganizationClass").val() === undefined ? "NA" : $(this).find("td").eq(21).children(".purchaseOrganizationClass").val();
            poLineItemJsonObj["purchasingGroup"] = $(this).find("td").eq(22).children(".purchasingGroupClass").val() === "" || $(this).find("td").eq(22).children(".purchasingGroupClass").val() === undefined ? "NA" : $(this).find("td").eq(22).children(".purchasingGroupClass").val();
            poLineItemJsonObj["purchaseRequestNumber"] = $(this).find("td").eq(23).text() === "" || $(this).find("td").eq(23).text() === undefined ? "NA" : $(this).find("td").eq(23).text();
            poLineItemJsonObj["prItemNumber"] = $(this).find("td").eq(24).text() === "" || $(this).find("td").eq(24).text() === undefined ? "NA" : $(this).find("td").eq(24).text();
            poLineItemJsonObj["requisitionerId"] = $(this).find("td").eq(25).children(".pr-requisitioner-id").val() === "" || $(this).find("td").eq(25).children(".pr-requisitioner-id").val() === undefined ? "NA" : $(this).find("td").eq(25).children(".pr-requisitioner-id").val();
            poLineItemJsonObj["prCreator"] = $(this).find("td").eq(26).text() === "" || $(this).find("td").eq(26).text() === undefined ? "NA" : $(this).find("td").eq(26).text();
            poLineItemJsonObj["prDeptName"] = $(this).find("td").eq(27).children(".prDeptNameClass").val() === "" || $(this).find("td").eq(27).children(".prDeptNameClass").val() === undefined ? "NA" : $(this).find("td").eq(27).children(".prDeptNameClass").val();
            poLineItemJsonObj["higherLevelItem"] = $(this).find("td").eq(28).text() === "" || $(this).find("td").eq(28).text() === undefined ? "NA" : $(this).find("td").eq(28).text();
            poLineItemJsonObj["subItemCategory"] = $(this).find("td").eq(29).text() === "" || $(this).find("td").eq(29).text() === undefined ? "NA" : $(this).find("td").eq(29).text();
            poLineItemJsonObj["prImMaterial"] = $(this).find("td").eq(30).children(".prImMaterial").val() === "" || $(this).find("td").eq(30).children(".prImMaterial").val() === undefined ? "NA" : $(this).find("td").eq(30).children(".prImMaterial").val();
            poLineItemJsonObj["prReturnsItem"] = $(this).find("td").eq(31).children(".prReturnsItem").val() === "" || $(this).find("td").eq(31).children(".prReturnsItem").val() === undefined ? "NA" : $(this).find("td").eq(31).children(".prReturnsItem").val();
            poLineItemJsonObj["prFreeOfCharge"] = $(this).find("td").eq(32).children(".prFreeOfCharge").val() === "" || $(this).find("td").eq(32).children(".prFreeOfCharge").val() === undefined ? "NA" : $(this).find("td").eq(32).children(".prFreeOfCharge").val();
            poLineItemJsonObj["prMfrPartNumber"] = $(this).find("td").eq(0).children(".prMfrPartNumber").val() === "" || $(this).find("td").eq(0).children(".prMfrPartNumber").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prMfrPartNumber").val();
            poLineItemJsonObj["prManufacturer"] = $(this).find("td").eq(0).children(".prManufacturer").val() === "" || $(this).find("td").eq(0).children(".prManufacturer").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prManufacturer").val();
            poLineItemJsonObj["isPrSaved"] = $(this).find("td").eq(0).children(".isPrSaved").val() === "" || $(this).find("td").eq(0).children(".isPrSaved").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".isPrSaved").val();

            poLineItemJsonObj["poLineItemPackageNo"] = $(this).find("td").eq(0).children(".POLineItemPackageNo").val() === "" || $(this).find("td").eq(0).children(".POLineItemPackageNo").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".POLineItemPackageNo").val();
            poLineItemJsonObj["poLineItemTaxCode"] = $(this).find("td").eq(0).children(".POLineItemTaxCode").val() === "" || $(this).find("td").eq(0).children(".POLineItemTaxCode").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".POLineItemTaxCode").val();
            poLineItemJsonObj["totalQuantityOfThisLine"] = $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val() === "" || $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val();
            poLineItemJsonObj["parentPrLineInsertionOrderId"] = $(this).find("td").eq(0).children(".parentPrLineInsertionOrderId").val() === "" || $(this).find("td").eq(0).children(".parentPrLineInsertionOrderId").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".parentPrLineInsertionOrderId").val();
            poLineItemJsonObj["prGLCode"] = $(this).find("td").eq(0).children(".prgLCode").val() === "" || $(this).find("td").eq(0).children(".prgLCode").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".prgLCode").val();
            poLineItemJsonObj["prZGLCode"] = $(this).find("td").eq(0).children(".przGLCode").val() === "" || $(this).find("td").eq(0).children(".przGLCode").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".przGLCode").val();
            poLineItemJsonObj["rfqIdRfqLineIdInsertionOrderIdString"] = $(this).find("td").eq(0).children(".rfqIdRfqLineIdInsertionOrderIdString").val() === "" || $(this).find("td").eq(0).children(".rfqIdRfqLineIdInsertionOrderIdString").val() === undefined ? "NA" : $(this).find("td").eq(0).children(".rfqIdRfqLineIdInsertionOrderIdString").val();

            POLineItemJsonDataArray.push(poLineItemJsonObj);
        });

        POHeaderJsonData["POHeaderDeliveryInvoiceJsonData"] = POHeaderDeliveryInvoiceJsonData;
        POHeaderJsonData["POHeaderVendorAddressJsonData"] = POHeaderVendorAddressJsonData;
        POHeaderJsonData["POHeaderCommunicationJsonData"] = POHeaderCommunicationJsonData;
        POHeaderJsonData["POHeaderHeaderTextJsonData"] = POHeaderHeaderTextJsonData;
        POHeaderJsonData["POLineItemJsonData"] = POLineItemJsonDataArray;
        POHeaderJsonData["POHeaderConditionJsonData"] = POHeaderConditionJsonDataArray;
        POHeaderJsonData["POHeaderApprovalDetailsJsonData"] = POHeaderApprovalDetailsJsonDataArray;

        var POHeaderDataAsJsonString = JSON.stringify(POHeaderJsonData);
        console.log("POHeaderDataAsJsonString :" + POHeaderDataAsJsonString);

        var _csrf = $("input[name=_csrf]").val();
        var draftPoExtId = $("#draftPoExtId").val();
        var PrType = $("#PrType").val();
        var errorTransactionStatus = $("#errorTransactionStatus").val();
        console.log("draftPoExtId: " + draftPoExtId);
        console.log("PrType: " + PrType);
        console.log("errorTransactionStatus: " + errorTransactionStatus);

//        POHeaderDataAsJsonString = '{"companycode":"0640","vendorSno":"4021843","vendorName":"GEP ELECTRIC MOTOR (FE) PTE LTD","vendorCode":"0001100937","typeOfPOHeader":"Import PO for Goods","downPaymentReqd":"","purchasingOrg":"640","purchasingGroup":"N19","downPaymentFor":"","downPaymentReqdValue":"","CollectiveNumber":"","POHeaderDeliveryInvoiceJsonData":{"paymentTermsDelivery":"R030","CurrencyDeliveryInvoice":"SGD","paymentinpercnt1":"","paymentinpercnt2":"","paymentindays1":"30","paymentindays2":"","ExchangeRate":"1.0000","paymentInDaysNet":"","incoterms1":"","incoterms2":"","gRMessage":"false","exchangeRateFixed":"false"},"POHeaderVendorAddressJsonData":{"streetVendorAddress":"NO. 1, TUAS SOUTH ST 1","houseNumberVendorAddress":"JURONG TOWN, , ","postalCodeVendorAddress":"638059","cityVendorAddress":"SINGAPORE","extTel":"","telephoneVendorAddress":"65-68699221","extFax":"","faxVendorAddress":"65-68633320","countryCodeVendorAddress":"SG","countryVendorAddress":""},"POHeaderCommunicationJsonData":{"Salesperson":"nikhil","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"POHeaderHeaderTextJsonData":{"pONotetoApproverHeaderTextsLimits":"dfghj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsofDelivery":"","TermsofPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":""},"POLineItemJsonData":[{"insertionOrderId":"2564","linkId":"35791035","untiPrice":"1"}],"POHeaderConditionJsonData":[{"conType":"PBXX","name":"Gross Price","amount":"1.00","perQuant":"1.00","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"10.00","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"1","condCount":"2","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"","name":"Price Incl of disc/Surcharge","amount":"1.00","perQuant":"1.00","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"10.00","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"65","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"FRA1","name":"Freight %","amount":"","perQuant":"","conPrUnit":"ST","curr1":"%","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"70","condCount":"0","KAPPL":"M","KVSL1":"FRE","KVSL2":"FR1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"FRB1","name":"Freight (Value)","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"70","condCount":"1","KAPPL":"M","KVSL1":"FRE","KVSL2":"FR1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"FRC1","name":"Freight/Quantity","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"70","condCount":"2","KAPPL":"M","KVSL1":"FRE","KVSL2":"FR1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZFR1","name":"TM - Freight (Value)","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"70","condCount":"3","KAPPL":"M","KVSL1":"FRE","KVSL2":"ZFR","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZPAC","name":"Packing charges.","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"71","condCount":"0","KAPPL":"M","KVSL1":"OTH","KVSL2":"IP1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZCOV","name":"Commission (Value)","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"0","KAPPL":"M","KVSL1":"OTH","KVSL2":"PC4","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZCOP","name":"Commission(Percenta)","amount":"","perQuant":"","conPrUnit":"ST","curr1":"%","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"1","KAPPL":"M","KVSL1":"OTH","KVSL2":"PC4","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZCOQ","name":"Comission/Quantity","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"2","KAPPL":"M","KVSL1":"OTH","KVSL2":"PC4","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZMIS","name":"Misc Charges","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"3","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZMSQ","name":"Misc Charges Qty","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"4","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZITQ","name":"Inland Transit Qty","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"5","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZCRQ","name":"Container Repair Qty","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"6","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZIMP","name":"Weight Variance","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"7","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZBIN","name":"Bin Rental","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"8","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZSEC","name":"Security","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"75","condCount":"9","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZINV","name":"Insurance (Value)","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"76","condCount":"0","KAPPL":"M","KVSL1":"OTH","KVSL2":"IN1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZINP","name":"Insurance(Percentag)","amount":"","perQuant":"","conPrUnit":"ST","curr1":"%","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"76","condCount":"1","KAPPL":"M","KVSL1":"OTH","KVSL2":"IN1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZINQ","name":"Insurance( quntity)","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"76","condCount":"2","KAPPL":"M","KVSL1":"OTH","KVSL2":"IN1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM02","name":"Surveyor@ load port","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"1","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM03","name":"Surveyor@disc Port","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"2","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM04","name":"Stevedoring","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"3","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM05","name":"Cranage","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"4","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM06","name":"Timekeeper","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"5","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM07","name":"Jurong Port charges","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"6","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM08","name":"Haulier","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"7","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM09","name":"Incentive","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"8","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZLOD","name":"Loading Equipment","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"9","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZUNL","name":"Un Loading Equipment","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"10","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"ZM10","name":"Marine Handling Chrg","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"78","condCount":"11","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"","name":"Total Freight","amount":"0.00","perQuant":"0.00","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"0.00","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"80","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"","name":"Total Freight & commisioning","amount":"0.00","perQuant":"0.00","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"0.00","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"85","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"","name":"Net Price","amount":"1.00","perQuant":"1.00","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"10.00","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"90","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"NAVS","name":"Non-Deductible Tax","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"100","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"","name":"@3Z@Border crossing value","amount":"1.00","perQuant":"1.00","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"10.00","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"200","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""},{"conType":"JEXS","name":"Taxes on the PO","amount":"","perQuant":"","conPrUnit":"ST","curr1":"SGD","uOM":"ST","conVal1":"","curr2":"SGD","conVal2":"0.00","conCurr":"","stNumber":"250","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","vendorName":"","vendorCode":"","condPriceDate":"","condCurrExchangeRate":"","poCurrExchangeRate":""}]}';

        $("#overlay").css("display", "block");
        setTimeout(
                function()
                {
                    $.ajax({
                        type: "POST",
                        url: "standalonePoPostAjaxRequest.do",
                        async: true,
                        data: {
                            formdata: POHeaderDataAsJsonString,
                            reqFrom: "SaveDraftPo",
                            _csrf: _csrf,
                            draftPoExtId: draftPoExtId,
                            prType: PrType,
                            errorTransactionStatus: errorTransactionStatus
                        },
                        error: function() {
                            $("#overlay").css("display", "none");
                        },
                        complete: function(responseJson) {
                            $("#overlay").css("display", "none");
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("extId: " + obj.extId);
                            console.log("tempPoNumber: " + obj.tempPoNumber);
                            $("#draftPoExtId").val(obj.extId);

                            var PoFrom = $("#PoFrom").val();
                            console.log("PoFrom: " + PoFrom);
                            if (PoFrom === "editpo" && PoFrom === "editApprovedPo" && PoFrom === "shortcutPo")
                            {
                                // Update PR or RFQ Line Quantity
//                                updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                            }
                            else if (PoFrom === "byrfq")
                            {
//                                var VendorFinalizationTableDataArrayAsJsonString = $("#VendorFinalizationTableDataArrayAsJsonString").val();
//                                UpdateRfqLineRemainingQtyAfterSaveDraft(VendorFinalizationTableDataArrayAsJsonString);
                            }
                            else if (PoFrom === "createpo")
                            {
                                $("#material_headerClass tbody tr").each(function(index) {
                                    var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                                    var pr_quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                                    var insertionOrderId_Class = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();

                                    console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);
                                    console.log("pr_quantity: " + pr_quantity);
                                    console.log("insertionOrderId_Class: " + insertionOrderId_Class);

                                    if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "CreatePrLine")
                                    {
//                                        updatePrLineRemainingQtyAfterSaveDraft(insertionOrderId_Class, pr_quantity);
                                    }
                                });
                            }
                            if (errorTransactionStatus === "") {
                                Lobibox.alert("success", {
                                    msg: "Data saved successfully!<br>Temp PO Number: <b>" + obj.tempPoNumber + "<b>",
                                    callback: function(lobibox, type) {
                                        location.href = "draftPo.do";
                                    }
                                });
                            } else {                                
                                var message = "PO Number: <b>" + $("#PoNumber").val() + "</b><br>Work Item: <b>Not generated</b>";
                                Lobibox.alert("warning", {
                                    msg: message,
                                    callback: function(lobibox, type) {
                                        location.href = "errorTransactions.do";
                                    }
                                });
                            }
                        }
                    });
                }
        , 500);
    });
});

if ($("table.draftPoList").length) {
    $(document).ready(function() {
        $('#draftPoList thead tr').clone(true).appendTo('#draftPoList thead');
        $('#draftPoList thead tr:eq(1) th').each(function(i) {
            $('#draftPoList thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '' || title === 'Details')
            {
                $(this).html('');
            }
            else
            {
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

        var table = $('table.draftPoList').DataTable({
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'PO Details'},
                        {extend: 'pdf', title: 'PO Details'},
                        {extend: 'print', title: 'PO Details'}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#draftPoList_wrapper .col-md-6:eq(0)');
    });
}

function setDraftPoDetailsOnForm()
{
    var draftPoExtId = $("#draftPoExtId").val();
    console.log("draftPoExtId: " + draftPoExtId);
    $("#overlay").css("display", "block");
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "FindDraftPoDetails",
            "draftPoExtId": draftPoExtId
        },
        complete: function(responseJson) {
            var jsonObj = $.parseJSON(responseJson.responseText);
//            console.log("DraftPoDetails: " + JSON.stringify(jsonObj));
            jsonObj = JSON.parse(JSON.stringify(jsonObj));

            // Header Data Starts
            $("#errorTransactionStatus").val(jsonObj.extPoCreationDraftObj.errorTransactionStatus);
            $("#typeOfPOHeader").val(jsonObj.extPoCreationDraftObj.purchaseOrderType);
            $("#draftPoVendorSno").val(jsonObj.extPoCreationDraftObj.vendorSno);
            $("#vendorSno").val(jsonObj.extPoCreationDraftObj.vendorSno);
            $('.selectpicker').selectpicker('refresh');
            $("#CollectiveNumber").val(jsonObj.extPoCreationDraftObj.collectiveNumber);
            $("#purchasingOrg").val(jsonObj.extPoCreationDraftObj.purchasingOrg);
            $("#purchasingGroup").val(jsonObj.extPoCreationDraftObj.purchasingGrp);

            if (jsonObj.extPoCreationDraftObj.pid !== "" && jsonObj.extPoCreationDraftObj.pid !== undefined) {
                $("#Pid").val(jsonObj.extPoCreationDraftObj.pid);
            }
            if (jsonObj.extPoCreationDraftObj.poSequenceNumber !== "" && jsonObj.extPoCreationDraftObj.poSequenceNumber !== undefined) {
                $("#PO_SequenceNO").val(jsonObj.extPoCreationDraftObj.poSequenceNumber);
            }
            if (jsonObj.extPoCreationDraftObj.prType !== "" && jsonObj.extPoCreationDraftObj.prType !== undefined) {
                $("#PrType").val(jsonObj.extPoCreationDraftObj.prType);
                $("#prType").val(jsonObj.extPoCreationDraftObj.prType);
            }
            if (jsonObj.extPoCreationDraftObj.purchaseOrderNumber !== "" && jsonObj.extPoCreationDraftObj.purchaseOrderNumber !== undefined)
                $("#poNumber").val(jsonObj.extPoCreationDraftObj.purchaseOrderNumber);
                $("#PoNumber").val(jsonObj.extPoCreationDraftObj.purchaseOrderNumber);
            if (jsonObj.extPoCreationDraftObj.poDocDate !== "" && jsonObj.extPoCreationDraftObj.poDocDate !== undefined)
                $("#docDateHeader").val(jsonObj.extPoCreationDraftObj.poDocDate);
            if (jsonObj.extPoCreationDraftObj.newPrLineInsertionOrderId !== "" && jsonObj.extPoCreationDraftObj.newPrLineInsertionOrderId !== undefined)
                $("#newPrLineInsertionOrderId").val(jsonObj.extPoCreationDraftObj.newPrLineInsertionOrderId);
            if (jsonObj.extPoCreationDraftObj.newRfqLineRfqIdRfqLineIdInsertionOrderId !== "" && jsonObj.extPoCreationDraftObj.newRfqLineRfqIdRfqLineIdInsertionOrderId !== undefined)
                $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val(jsonObj.extPoCreationDraftObj.newRfqLineRfqIdRfqLineIdInsertionOrderId);
            if (jsonObj.extPoCreationDraftObj.requestType !== "" && jsonObj.extPoCreationDraftObj.requestType !== undefined)
                $("#requestType").val(jsonObj.extPoCreationDraftObj.requestType);
            if (jsonObj.extPoCreationDraftObj.referenceDocumentType !== "" && jsonObj.extPoCreationDraftObj.referenceDocumentType !== undefined)
                $("#referenceDocType").val(jsonObj.extPoCreationDraftObj.referenceDocumentType);

            if (jsonObj.extPoCreationDraftObj.poFrom === "editApprovedPo")
            {
                $("#saveAndCloseBtn").prop("disabled", false);
                $("#createPoBtn").prop("disabled", false);
                $("#cancelPoBtn").prop("disabled", false);

                $("#addNewPrLineBtn").prop("disabled", false);
                $("#addRfqLineBtn").prop("disabled", false);
                $("#addEmptyPoLineBtn").prop("disabled", false);
            }

            if (jsonObj.extPoCreationDraftObj.poFrom === "shortcutPo")
            {
                $("#referenceDocType").prop("disabled", false);
                $("#prType").prop("disabled", false);

                $(".saveAndCloseBtn").css("display", "block");

                if (jsonObj.extPoCreationDraftObj.requestType === "Create Purchase Order") {
                    $(".createPoBtnClass").css("display", "block");
                }
                else if (jsonObj.extPoCreationDraftObj.requestType === "Amend Purchase Order") {
                    $(".amendPoBtnClass").css("display", "block");
                    $("#poNumber").prop("disabled", false);
                }
                else if (jsonObj.extPoCreationDraftObj.requestType === "Delete Purchase Order") {
                    $(".cancelPoBtnClass").css("display", "block");
                    $("#poNumber").prop("disabled", false);
                }

                $("#addNewPrLineBtn").prop("disabled", false);
                $("#addRfqLineBtn").prop("disabled", false);
                $("#addEmptyPoLineBtn").prop("disabled", false);
            }
            
            var headerConditionsNew = jsonObj.extPoCreationDraftObj.headerConditionsNew;
            conditionLineLevelArray = JSON.parse(headerConditionsNew);
            console.log("conditionLineLevelArray len: " + conditionLineLevelArray.length);
            
            var kalsm = jsonObj.extPoCreationDraftObj.kalsm;
            console.log("kalsm: " + kalsm);
            $("#kalsmHiddenfield").val(kalsm);
            
            // Header Data Ends
                
            if(jsonObj.extPoCreationDraftObj.errorTransactionStatus === "Yes")
            {
                $("#errorTransactionLabel").css("display", "block");
                $("#saveAndCloseBtn").css("display", "none");
                $("#preCheckPoBtn").css("display", "none");
                $("#cancelPoBtn").css("display", "none");
                $("#cancelEditPo").css("display", "none");
                
                // Edit & Amend
                $("#addNewPrLineBtn").css("display", "none");
                $("#addRfqLineBtn").css("display", "none");
                $("#addEmptyPoLineBtn").css("display", "none");
            }
                
            // Status Tab
            $("#ordered").val(formatNumberByComma(jsonObj.extPoCreationDraftObj.ordered));
            $("#orderedUnit").val(jsonObj.extPoCreationDraftObj.orderedUnit);
            $("#orderedTotalPrice").val(formatAmountByComma(jsonObj.extPoCreationDraftObj.orderedTotalPrice));
            $("#orderedCurrency").val(jsonObj.extPoCreationDraftObj.orderedCurrency);
            
            $("#delivered").val(formatNumberByComma(jsonObj.extPoCreationDraftObj.delivered));
            $("#deliveredUnit").val(jsonObj.extPoCreationDraftObj.deliveredUnit);
            $("#deliveredTotalPrice").val(formatAmountByComma(jsonObj.extPoCreationDraftObj.deliveredTotalPrice));
            $("#deliveredCurrency").val(jsonObj.extPoCreationDraftObj.deliveredCurrency);
            
            $("#stillToDeliv").val(formatNumberByComma(jsonObj.extPoCreationDraftObj.stillToDeliv));
            $("#stillToDelivUnit").val(jsonObj.extPoCreationDraftObj.stillToDelivUnit);
            $("#stillToDelivTotalPrice").val(formatAmountByComma(jsonObj.extPoCreationDraftObj.stillToDelivTotalPrice));
            $("#stillToDelivCurrency").val(jsonObj.extPoCreationDraftObj.stillToDelivCurrency);
            
            $("#invoiced").val(formatNumberByComma(jsonObj.extPoCreationDraftObj.invoiced));
            $("#invoicedUnit").val(jsonObj.extPoCreationDraftObj.invoicedUnit);
            $("#invoicedTotalPrice").val(formatAmountByComma(jsonObj.extPoCreationDraftObj.invoicedTotalPrice));
            $("#invoicedCurrency").val(jsonObj.extPoCreationDraftObj.invoicedCurrency);
            
            $("#downpayments").val(jsonObj.extPoCreationDraftObj.downpayments);
            $("#downpaymentsUnit").val(jsonObj.extPoCreationDraftObj.downpaymentsUnit);
            $("#downpaymentsTotalPrice").val(formatAmountByComma(jsonObj.extPoCreationDraftObj.downpaymentsTotalPrice));
            $("#downpaymentsCurrency").val(jsonObj.extPoCreationDraftObj.downpaymentsCurrency);
            
            // Delivery/Invoice Tab Starts
            $("#paymentTermsDelivery").val(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.paymentTerms);
            $("#paymentDays1").val(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.paymentindays1);
            $("#paymentPer1").val(Number(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.paymentinpercnt1).toFixed(2));
            $("#paymentDays2").val(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.paymentindays2);
            $("#paymentPer2").val(Number(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.paymentinpercnt2).toFixed(2));
            $("#paymentDaysNet").val(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.paymentindaysnet);
            $("#IncoTermsPart1").val(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.incoterms1);
            $("#IncoTermsPart2").val(jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.incoterms2);

            if (jsonObj.cmplxPoCreationDeliveryInvoiceDraftObj.incoterms2 === "true")
                $("#GRMessage").prop("checked", true);
            else
                $("#GRMessage").prop("checked", false);
            // Delivery/Invoice Tab Ends

            // Vendor Address Tab Starts
            $("#streetVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.street);
            $("#houseNumberVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.houseNumber);
            $("#postalCodeVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.postalCode);
            $("#cityVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.city);
            $("#extTel").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.telExt);
            $("#telephoneVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.telNo);
            $("#extFax").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.faxExt);
            $("#faxVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.faxNo);
            $("#countryCodeVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.countryCode);
            $("#countryVendorAddress").val(jsonObj.cmplxPoCreationVendorAddressDraftObj.country);
            // Vendor Address Tab Ends

            // Communication Tab Starts
            $("#Salesperson").val(jsonObj.cmplxPoCreationCommunicationDraftObj.salesPerson);
            $("#YourReference").val(jsonObj.cmplxPoCreationCommunicationDraftObj.yourReference);
            $("#Telephone").val(jsonObj.cmplxPoCreationCommunicationDraftObj.telephone);
            $("#OurReference").val(jsonObj.cmplxPoCreationCommunicationDraftObj.ourReference);
            // Communication Tab Ends

            // Header Text Tab Starts
            $("#pONotetoApproverHeaderTextsLimits").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.poNoteToApprover);
            $("#HeaderNote").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.headerNote);
            $("#PricingTypes").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.pricingTypes);
            $("#Deadlines").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.deadlines);
            $("#TermsofDelivery").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.termsOfDelivery);
            $("#TermsofPayment").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.termsOfPayment);
            $("#ShippingInstructions").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.shippingInstructions);
            $("#VendorMemoGeneral").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.vendorMemoGeneral);
            $("#VendorMemoSpecial").val(jsonObj.cmplxPoCreationHeaderTextDraftObj.vendorMemoSpecial);
            // Header Text Tab Ends

            // Customer Data Tab Starts
            var typeOfPOHeader = jsonObj.extPoCreationDraftObj.purchaseOrderType;
            if (typeOfPOHeader === 'Non-Ferrous PO - Imp' || typeOfPOHeader === 'Ferrous Joint Pur' || typeOfPOHeader === 'Ferrous PO - Import'
                    || typeOfPOHeader === 'Ferrous PO - Local' || typeOfPOHeader === 'Non-Ferrous PO - Loc')
            {
                $("#customerdata_li").css({display: "block"});

                if (jsonObj.cmplxPoCreationCustomerDataDraftObj.paymentImmediate === "true")
                    $("#PaymentImmediate").prop("checked", true);
                else
                    $("#PaymentImmediate").prop("checked", false);

                if (jsonObj.cmplxPoCreationCustomerDataDraftObj.externalWeight === "true")
                    $("#ExternalWeight").prop("checked", true);
                else
                    $("#ExternalWeight").prop("checked", false);

                if (jsonObj.cmplxPoCreationCustomerDataDraftObj.priceDisplay === "true")
                    $("#PriceDisplay").prop("checked", true);
                else
                    $("#PriceDisplay").prop("checked", false);

                $("#InstructionToWeigher").val(jsonObj.cmplxPoCreationCustomerDataDraftObj.instructionsToWeighter);
                $("#ZoneCollectionScrap").val(jsonObj.cmplxPoCreationCustomerDataDraftObj.zoneCollectionScrap);
                $("#ProductOrigin").val(jsonObj.cmplxPoCreationCustomerDataDraftObj.productOrigin);
                $("#SegmentDescription").val(jsonObj.cmplxPoCreationCustomerDataDraftObj.segment);
                $("#ConfControl").val(jsonObj.cmplxPoCreationCustomerDataDraftObj.confControl);
            }
            // Customer Data Tab Ends

            // Header Condition Tab Starts
            if (jsonObj.cmplxPoCreationConditionsDraftArr !== undefined)
            {
                var headerCondArrLen = jsonObj.cmplxPoCreationConditionsDraftArr.length;
                console.log("headerCondArrLen: " + headerCondArrLen);
                $("#conditionTableId tbody tr").remove();
                var row = "";
                for (var i = 0; i < headerCondArrLen; i++)
                {
                    if (jsonObj.cmplxPoCreationConditionsDraftArr[i].condType !== undefined && jsonObj.cmplxPoCreationConditionsDraftArr[i].condType !== "")
                    {
                        row += "<tr>"
                                + "<td>\n\
                                <input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'><input type='hidden' class='conditionVendorHeader' value=''><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' disabled = 'true' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condType === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condType) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' style='width:200px;' name='nameConditionsHeader' disabled = 'true' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condName === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condName) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' style='width:150px;' name='AmountHeader' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].amount === undefined ? '' : formatAmountByComma(Number(jsonObj.cmplxPoCreationConditionsDraftArr[i].amount).toFixed(2))) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].currency === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].currency) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' style='width:150px;' name='PerQuantityHeader' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].perQuantity === undefined ? '' : formatAmountByComma(Number(jsonObj.cmplxPoCreationConditionsDraftArr[i].perQuantity).toFixed(2))) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condPricUnit === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condPricUnit) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' style='width:50px;' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].uoM === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].uoM) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width:50px;' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condVal === undefined ? '' : formatAmountByComma(Number(jsonObj.cmplxPoCreationConditionsDraftArr[i].condVal).toFixed(2))) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' disabled = 'true' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].currency1 === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].currency1) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].kappl === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].kappl) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl1 === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl1) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl2 === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl2) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].conditionCount === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].conditionCount) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].stNumber === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].stNumber) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='U'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorName === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorName) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorCode === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorCode) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condPriceDate === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condPriceDate) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condCurncyExchangeRate === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condCurncyExchangeRate) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].poCurrencyExchangeRate === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].poCurrencyExchangeRate) + "'></td>"
                                + "<td></td>"
                                + "</tr>";
                    }
                    else if (jsonObj.cmplxPoCreationConditionsDraftArr[i].condType === undefined || jsonObj.cmplxPoCreationConditionsDraftArr[i].condType === "")
                    {
                        row += "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'><input type='hidden' class='conditionVendorHeader' value=''><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' disabled = 'true' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condType === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condType) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' style='width:200px;' name='nameConditionsHeader' disabled = 'true' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condName === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condName) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' style='width:150px;' name='AmountHeader' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].amount === undefined ? '' : formatAmountByComma(Number(jsonObj.cmplxPoCreationConditionsDraftArr[i].amount).toFixed(2))) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].currency === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].currency) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' style='width:150px;' name='PerQuantityHeader' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].perQuantity === undefined ? '' : formatAmountByComma(Number(jsonObj.cmplxPoCreationConditionsDraftArr[i].perQuantity).toFixed(2))) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condPricUnit === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condPricUnit) + "></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' style='width:50px;' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].uoM === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].uoM) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' value=" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condVal === undefined ? '' : formatAmountByComma(Number(jsonObj.cmplxPoCreationConditionsDraftArr[i].condVal).toFixed(2))) + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' disabled = 'true' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].currency1 === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].currency1) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].kappl === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].kappl) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl1 === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl1) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl2 === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].kvsl2) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].conditionCount === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].conditionCount) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].stNumber === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].stNumber) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='U'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorName === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorName) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorCode === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].vendorCode) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condPriceDate === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condPriceDate) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].condCurncyExchangeRate === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].condCurncyExchangeRate) + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (jsonObj.cmplxPoCreationConditionsDraftArr[i].poCurrencyExchangeRate === undefined ? '' : jsonObj.cmplxPoCreationConditionsDraftArr[i].poCurrencyExchangeRate) + "'></td>"
                                + "<td></td>"
                                + "</tr>";
                    }
                }
                $("#conditionTableId tbody").append(row);
                console.log("cond len: " + $("#conditionTableId tbody tr").length);
            }
            // Header Condition Tab Ends
            
            // Approval Details Tab Starts
            if (jsonObj.cmplxPOCreationApproverDetailsDraftArr !== undefined)
            {
                $("#approvalDetailsTable tbody tr").remove();
                var row = "";
                for (var i = 0; i < jsonObj.cmplxPOCreationApproverDetailsDraftArr.length; i++)
                {
                    row += "<tr><td>" + jsonObj.cmplxPOCreationApproverDetailsDraftArr[i].approverLevel + "</td><td>" + jsonObj.cmplxPOCreationApproverDetailsDraftArr[i].approverName + "</td></tr>";
                }
                $("#approvalDetailsTable tbody").append(row);
            }
            
            var prType = $("#PrType").val();
            console.log("prType: " + prType);
            $("#material_headerClass tbody tr").each(function() {
                var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);

                if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "PoLine")
                {
                    $(this).find("td").eq(9).children(".materialCriticality").css("display", "block");
                    if (prType === "Material")
                    {
                        $(this).find("td").eq(6).children(".pr-quantity").prop("disabled", false);
                        $(this).find("td").eq(12).children(".pr-net-price").prop("disabled", false);
                        $(this).find("td").eq(25).children(".pr-requisitioner-id").prop("disabled", false);
                    }
                    else if (prType === "Service")
                    {
                        $(this).find("td").eq(5).children(".pr-short-text").prop("disabled", false);
                    }

                }
                else if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "PrLine" || isPoLineOrPrLineOrRfqLineOrEmptyLine === "RfqLine")
                {
                    if (prType === "Material")
                    {
                        $(this).find("td").eq(9).children(".materialCriticality").css("display", "block");
                        $(this).find("td").eq(6).children(".pr-quantity").prop("disabled", false);
                        $(this).find("td").eq(12).children(".pr-net-price").prop("disabled", false);
                        $(this).find("td").eq(25).children(".pr-requisitioner-id").prop("disabled", false);
                    }
                    else if (prType === "Service")
                    {
                        $(this).find("td").eq(5).children(".pr-short-text").prop("disabled", false);
                        $(this).find("td").eq(9).children(".serviceCriticality").css("display", "block");
                    }
                }
                else if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "EmptyLine")
                {
                    $(this).find("td").eq(2).children(".accountAssignmentClass").prop("disabled", false);
                    $(this).find("td").eq(3).children(".itemCategoryClass").prop("disabled", false);
                    $(this).find("td").eq(5).children(".pr-short-text").prop("disabled", false);
                    $(this).find("td").eq(6).children(".pr-quantity").prop("disabled", false);
                    $(this).find("td").eq(14).children(".priceUnitClass").prop("disabled", false);
                    $(this).find("td").eq(21).children(".purchaseOrganizationClass").prop("disabled", false);
                    $(this).find("td").eq(22).children(".purchasingGroupClass").prop("disabled", false);
                    $(this).find("td").eq(25).children(".pr-requisitioner-id").prop("disabled", false);
                    $(this).find("td").eq(27).children(".prDeptNameClass").prop("disabled", false);
                    if (prType === "Material")
                    {
                        $(this).find("td").eq(4).children(".materialCodeClass").prop("disabled", false);
                        $(this).find("td").eq(9).children(".materialCriticality").css("display", "block");
                        $(this).find("td").eq(12).children(".pr-net-price").prop("disabled", false);
                        $(this).find("td").eq(25).children(".pr-requisitioner-id").prop("disabled", false);
                    }
                    else if (prType === "Service")
                    {
                        $(this).find("td").eq(9).children(".serviceCriticality").css("display", "block");
                        $(this).find("td").eq(15).children(".materialGroupClass").prop("disabled", false);
                        $(this).find("td").eq(16).children(".hiddenPlantCode").prop("disabled", false);
                        $(this).find("td").eq(17).children(".storageLocationClass").prop("disabled", false);
                    }
                }
            });

            // Set line level tabs details for first PO line by default
            $("#lineLevelTabsDiv").css("display", "none");
            var prCount = $("#material_headerClass tbody tr").length;
            if (prCount === 1) {
                $("#material_headerClass tbody tr").each(function() {
                    var insertionId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    $("#ItemNumberSelect").val(insertionId);
                    $("#ItemNumberSelect").trigger("change");
                });
            }

            // PO Line Item Starts
//            var poLineItemArrLen = jsonObj.cmplxPoCreationLineItemPoDraftArr.length;
//            console.log("poLineItemArrLen: " + poLineItemArrLen);
//            $("#material_headerClass tbody tr").each(function(index) {
//                $(this).find("td").children(".pr-net-price").val(jsonObj.cmplxPoCreationLineItemPoDraftArr[index].unitPrice);
//            });
            // PO Line Item Ends

            // Populate Line Level Tabs Starts
//            var linkid;
//            var insertionid = $("#ItemNumberSelect").val();
//            $("#material_headerClass tbody tr").each(function() {
//                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();                
//                if (insertionid === id) {
//                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
//                }
//            });
//            $.ajax({
//                type: "GET",
//                url: "ajaxcontroller.do",
//                async: false,
//                data:
//                        {
//                            "reqFrom": "getServicesByInsertionId",
//                            "insertionid": insertionid,
//                            "linkid": linkid
//                        },
//                dataType: "json",
//                complete: function(responseJson)
//                {
//                    var obj = $.parseJSON(responseJson.responseText);
//                    var row = "";
//                    if (obj.jArraService.length !== 0) {
//                        $("#serviceTableId tbody tr").remove();
//                        for (var i = 0; i < obj.jArraService.length; i++) {
//                            if (i === 0) {
//                                row += "<tr>\n\
//                                    <td><input type='checkbox' class='checkboxServices'>\n\
//                                    <input type='hidden' class='isProfitabilitySegmentDataSaved' value='No'>\n\
//                                    <input type='hidden' class='saveSarviceAccountAssignment' value='No'>\n\
//                                    <input type='hidden' class='ServiceAccAssDist'>\n\
//                                    <input type='hidden' class='LinkId' value='" + (obj.jArraService[i].LINKID === undefined ? '' : obj.jArraService[i].LINKID) + "'>\n\
//                                    <input type='hidden' class='ServiceLinkId' value=" + (obj.jArraService[i].SERVICELINKID === undefined ? '' : obj.jArraService[i].SERVICELINKID) + "></td>\n\\n\
//                                    <td></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded lineItemNumberServices tableInputField' value='" + (obj.jArraService[i].SERVICELINEITEMNUMBER === undefined ? '' : obj.jArraService[i].SERVICELINEITEMNUMBER) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded ServicesNumber_Services tableInputField' value='" + (obj.jArraService[i].SERVICENUMBER === undefined ? '' : obj.jArraService[i].SERVICENUMBER) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded shortText_Services tableInputField' value='" + (obj.jArraService[i].SHORTTEXT === undefined ? '' : obj.jArraService[i].SHORTTEXT) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded quantity_Services tableInputField' value='" + (obj.jArraService[i].QUANTITY === undefined ? '' : obj.jArraService[i].QUANTITY) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded servicesUnit_Services tableInputField' value='" + (obj.jArraService[i].UNIT === undefined ? '' : obj.jArraService[i].UNIT) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded grossPrice_Services tableInputField' value='" + (obj.jArraService[i].GROSSPRICE === undefined ? '' : obj.jArraService[i].GROSSPRICE) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded currency_Services tableInputField' value='" + (obj.jArraService[i].CURRENCY === undefined ? '' : obj.jArraService[i].CURRENCY) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded netPrice_Services tableInputField' value='" + (obj.jArraService[i].NETPRICE === undefined ? '' : obj.jArraService[i].NETPRICE) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded edition_Services tableInputField' value='" + (obj.jArraService[i].EDITION === undefined ? '' : obj.jArraService[i].EDITION) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded lineItemLongText_Services tableInputField' value='" + (obj.jArraService[i].LINEITEMLONGTEXT === undefined ? '' : obj.jArraService[i].LINEITEMLONGTEXT) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded overfTolerance_Services tableInputField' value='" + (obj.jArraService[i].OVERFTOLERANCE === undefined ? '' : obj.jArraService[i].OVERFTOLERANCE) + "'></td>\n\\n\
//                                    <td></td>\n\
//                                </tr>";
//                            } else {
//                                row += "<tr>\n\
//                                    <td><input type='checkbox' class='checkboxServices'>\n\
//                                    <input type='hidden' class='isProfitabilitySegmentDataSaved' value='No'>\n\
//                                    <input type='hidden' class='saveSarviceAccountAssignment' value='No'>\n\
//                                    <input type='hidden' class='ServiceAccAssDist'>\n\
//                                    <input type='hidden' class='LinkId' value='" + (obj.jArraService[i].LINKID === undefined ? '' : obj.jArraService[i].LINKID) + "'>\n\
//                                    <input type='hidden' class='ServiceLinkId' value=" + (obj.jArraService[i].SERVICELINKID === undefined ? '' : obj.jArraService[i].SERVICELINKID) + "></td>\n\\n\
//                                    <td></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded lineItemNumberServices tableInputField' value='" + (obj.jArraService[i].SERVICELINEITEMNUMBER === undefined ? '' : obj.jArraService[i].SERVICELINEITEMNUMBER) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded ServicesNumber_Services tableInputField' value='" + (obj.jArraService[i].SERVICENUMBER === undefined ? '' : obj.jArraService[i].SERVICENUMBER) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded shortText_Services tableInputField' value='" + (obj.jArraService[i].SHORTTEXT === undefined ? '' : obj.jArraService[i].SHORTTEXT) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded quantity_Services tableInputField' value='" + (obj.jArraService[i].QUANTITY === undefined ? '' : obj.jArraService[i].QUANTITY) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded servicesUnit_Services tableInputField' value='" + (obj.jArraService[i].UNIT === undefined ? '' : obj.jArraService[i].UNIT) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded grossPrice_Services tableInputField' value='" + (obj.jArraService[i].GROSSPRICE === undefined ? '' : obj.jArraService[i].GROSSPRICE) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded currency_Services tableInputField' value='" + (obj.jArraService[i].CURRENCY === undefined ? '' : obj.jArraService[i].CURRENCY) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded netPrice_Services tableInputField' value='" + (obj.jArraService[i].NETPRICE === undefined ? '' : obj.jArraService[i].NETPRICE) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded edition_Services tableInputField' value='" + (obj.jArraService[i].EDITION === undefined ? '' : obj.jArraService[i].EDITION) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded lineItemLongText_Services tableInputField' value='" + (obj.jArraService[i].LINEITEMLONGTEXT === undefined ? '' : obj.jArraService[i].LINEITEMLONGTEXT) + "'></td>\n\
//                                    <td><input type='text' readonly class='form-control form-rounded overfTolerance_Services tableInputField' value='" + (obj.jArraService[i].OVERFTOLERANCE === undefined ? '' : obj.jArraService[i].OVERFTOLERANCE) + "'></td>\n\\n\
//                                    <td><i title='Delete Row' class='fa fa-window-close btn-lg deleteServiceTebleRow' aria-hidden='true' style='width:10px;'></i></td>\n\
//                                </tr>";
//                            }
//                        }
//                        $("#serviceTableId tbody").append(row);
//                    }
//                    if (obj.jArraDelivery.length !== 0) {
//                        console.log("obj.jArraDelivery.length: " + obj.jArraDelivery.length);
//                        for (var i = 0; i < obj.jArraDelivery.length; i++) {
//                            var delCompleted = obj.jArraDelivery[i].DELCOMPLETED;
//                            if (delCompleted === 'true') {
//                                $("#DelivCompleted").prop("checked", true);
//                            } else {
//                                $("#DelivCompleted").prop("checked", false);
//                            }
//                            $("#OverdeliveryTolerance").val(obj.jArraDelivery[i].OVERDELTOL);
//                            $("#UnderdeliveryTolerance").val(obj.jArraDelivery[i].UNDERDELTOL);
//                            $("#ShippingInstruction").val(obj.jArraDelivery[i].SHIPPING_INSTRUCTION);
//                            $("#StockType").val(obj.jArraDelivery[i].STOCKTYPE);
//                            $("#ValuationType").val(obj.jArraDelivery[i].VALUATIONTYPE);
//                            $("#RemShelfLife").val(obj.jArraDelivery[i].REM_SHEL_FLIFE);
//                            $("#QAControlLife").val(obj.jArraDelivery[i].QA_CONTROL_LIFE);
//                            $("#GRProcTime").val(obj.jArraDelivery[i].GR_PROC_TIME);
//                            $("#FirstReminderExpediter").val(obj.jArraDelivery[i].FIRST_REM);
//                            $("#SecondReminderExpediter").val(obj.jArraDelivery[i].SECOND_REM);
//                            $("#ThirdReminderExpediter").val(obj.jArraDelivery[i].THIRD_REM);
//                            $("#DelivCompleted").val();
//                            $("#NoExpend").val(obj.jArraDelivery[i].NOEXPEND);
//                            $("#PlDeliveryTime").val(obj.jArraDelivery[i].PLDELTIME);
//                            $("#incoTermsPart2Delivery").val(obj.jArraDelivery[i].INCOTERMS);
//                        }
//                    }
//                    if (obj.jArraInvoice.length !== 0) {
//                        for (var i = 0; i < obj.jArraInvoice.length; i++) {
//                            if (obj.jArraInvoice[i].INVOICE_RECEIPT === 'true') {
//                                $("#InvoiceReceipt").prop("checked", true);
//                            } else {
//                                $("#InvoiceReceipt").prop("checked", false);
//                            }
//                            if (obj.jArraInvoice[i].FINAL_INVOICE === 'true') {
//                                $("#FinalInvoice").prop("checked", true);
//                            } else {
//                                $("#FinalInvoice").prop("checked", false);
//                            }
//                            if (obj.jArraInvoice[i].GR_BASED_IV === 'true') {
//                                $("#GRBasedIV").prop("checked", true);
//                            } else {
//                                $("#GRBasedIV").prop("checked", false);
//                            }
//                            $("#DPCategory").val(obj.jArraInvoice[i].DP_CATEGORY);
//                            $("#TaxCode").val(obj.jArraInvoice[i].TAXCODE);
////                        $("#TaxCodeDescription").val(obj.jArraInvoice[i].DESCRIPTION);
//                        }
//                    }
//                    if (obj.jArraText.length !== 0) {
//                        for (var i = 0; i < obj.jArraText.length; i++) {
//                            $("#ItemText").val(obj.jArraText[i].ITEMTEXT);
//                            $("#InfoRecordPOText").val(obj.jArraText[i].INFO_RECORD_POTEXT);
//                            $("#MaterialPOText").val(obj.jArraText[i].MATERIAL_POTEXT);
//                            $("#PONoteToApprover").val(obj.jArraText[i].PO_NOTES_TO_APPROVER);
//                            $("#DeliveryText").val(obj.jArraText[i].DELIVERY_TEXT);
//                        }
//                    }
//                    if (obj.jArraAddress.length !== 0) {
//                        for (var i = 0; i < obj.jArraAddress.length; i++) {
//                            $("#Title").val(obj.jArraAddress[i].TITLE);
//                            $("#Name1").val(obj.jArraAddress[i].NAME1);
//                            $("#Name2").val(obj.jArraAddress[i].NAME2);
//                            $("#Street").val(obj.jArraAddress[i].STREET);
//                            $("#HouseNumber").val(obj.jArraAddress[i].HOUSE_NUMBER);
//                            $("#PostalCode").val(obj.jArraAddress[i].POSTAL_CODE);
//                            $("#City").val(obj.jArraAddress[i].CITY);
//                            $("#countryCode").val(obj.jArraAddress[i].COUNTRY_CODE);
//                            $("#countryDesc").val(obj.jArraAddress[i].COUNTRY_DESC);
//                        }
//                    }
//                    if (obj.jArraConf.length !== 0) {
//                        for (var i = 0; i < obj.jArraConf.length; i++) {
//                            $("#confControlLimits").val(obj.jArraConf[i].CONF_CONTROL);
//                            $("#OrderAck").val(obj.jArraConf[i].ORDER_ACK);
////                        $("#ConfirmationRequired").val(obj.jArraConf[i].CONF_REQ);
//                            if (obj.jArraConf[i].CONF_REQ === 'true') {
//                                $("#ConfirmationRequired").prop("checked", true);
//                            } else {
//                                $("#ConfirmationRequired").prop("checked", false);
//                            }
//                        }
//                    }
//                    if (obj.jArraCond.length !== 0) {
//                        for (var i = 0; i < obj.jArraCond.length; i++) {
//                            if (obj.jArraCond[i].ESTIMATE_PRICE === 'true') {
//                                $("#EstimatedPrice").prop("checked", true);
//                            } else {
//                                $("#EstimatedPrice").prop("checked", false);
//                            }
//                            if (obj.jArraCond[i].PRINT_PRICE === 'true') {
//                                $("#PrintPrice").prop("checked", true);
//                            } else {
//                                $("#PrintPrice").prop("checked", false);
//                            }
//                        }
//                    }
//
//                    if (obj.jArraCustomerData.length !== 0) {
//                        for (var i = 0; i < obj.jArraCustomerData.length; i++) {
//                            $("#ProductOriginLine").val(obj.jArraCustomerData[i].PRODUCT_ORIGIN);
//                            $("#SegmentDescriptionLine").val(obj.jArraCustomerData[i].SEGMENT);
//                        }
//                    }
//                    if (obj.jArraQuantity.length !== 0) {
//                        for (var i = 0; i < obj.jArraQuantity.length; i++) {
//                            $("#pOQuantity").val(obj.jArraQuantity[i].POQuantity);
//                            $("#pOUnit").val(obj.jArraQuantity[i].Unit_POQuantity);
//                            $("#orderUnit").val(obj.jArraQuantity[i].OrderUnit);
//                            $("#unitOrderUnit").val(obj.jArraQuantity[i].Unit_OrderUnit);
//                            $("#orderPriceUnit").val(obj.jArraQuantity[i].OrderPriceUnit);
//                            $("#unitOrderPriceUnit").val(obj.jArraQuantity[i].Unit_OrderPriceUnit);
//                            console.log("PrType in Qty/Wt change: " + $("#PrType").val());
//                            if ($("#PrType").val() === "Material")
//                            {
//                                $("#pOQuantitySKU").val(obj.jArraQuantity[i].POQuantityInSKU);
//                                $("#pOUnitSKU").val(obj.jArraQuantity[i].Unit_POQuantityInSKU);
//                                $("#orderUnit2").val(obj.jArraQuantity[i].OrderUnitSKU);
//                                $("#unitOrderUnit2").val(obj.jArraQuantity[i].Unit_OrderUnitSKU);
//                                $("#sKUUnit").val(obj.jArraQuantity[i].SKU);
//                                $("#unitSKUUnit").val(obj.jArraQuantity[i].Unit_SKU);
//                            }
//                            else
//                            {
//                                $("#pOQuantitySKU").val("");
//                                $("#pOUnitSKU").val("");
//                                $("#orderUnit2").val("");
//                                $("#unitOrderUnit2").val("");
//                                $("#sKUUnit").val("");
//                                $("#unitSKUUnit").val("");
//                            }
//                        }
//                    }
//                    if (obj.jArraComponent.length !== 0) {
//                        $("#componentTableIdLineLevel tbody tr").remove();
//                        for (var i = 0; i < obj.jArraComponent.length; i++) {
//                            var materialcode = obj.jArraComponent[i].MATERIAL === undefined ? '' : obj.jArraComponent[i].MATERIAL;
//                            var description = obj.jArraComponent[i].DESCRIPTION === undefined ? '' : obj.jArraComponent[i].DESCRIPTION;
//                            var plant = obj.jArraComponent[i].PLANT === undefined ? '' : obj.jArraComponent[i].PLANT;
//                            var unit = obj.jArraComponent[i].UNIT === undefined ? '' : obj.jArraComponent[i].UNIT;
//                            var quantity = obj.jArraComponent[i].QUANTITY === undefined ? '' : obj.jArraComponent[i].QUANTITY;
//                            var prodStLoc = obj.jArraComponent[i].PROD_ST_LOC === undefined ? '' : obj.jArraComponent[i].PROD_ST_LOC;
//                            var supplyArea = obj.jArraComponent[i].SUPPLY_AREA === undefined ? '' : obj.jArraComponent[i].SUPPLY_AREA;
//                            var reqDate = obj.jArraComponent[i].REQUIREMENT_DATE === undefined ? '' : obj.jArraComponent[i].REQUIREMENT_DATE;
//                            row = "<tr>\n\
//                            <td>" + '<input type="text" class="form-control form-rounded input-height comMaterial" value="' + materialcode + '">' + "</td>\n\
//                            <td>" + '<input type="text" class="form-control form-rounded input-height comDescription" value="' + description + '">' + "</td>\n\
//                            <td>" + '<input type="text" class="form-control form-rounded input-height comPlant" value="' + plant + '">' + "</td>\n\
//                            <td>" + '<input type="text" class="form-control form-rounded input-height comUnit" value="' + unit + '">' + "</td>\n\
//                            <td>" + '<input type="number" class="form-control form-rounded input-height comQuantity" value="' + quantity + '">' + "</td>\n\
//                            <td>" + '<input type="text" class="form-control form-rounded input-height comProdStorageLoc" value="' + prodStLoc + '">' + "</td>\n\
//                            <td>" + '<input type="text" class="form-control form-rounded input-height comSupplyArea" value="' + supplyArea + '">' + "</td>\n\
//                            <td>" + '<input type="date" class="form-control form-rounded input-height comRequirementDate" value="' + reqDate + '">' + "</td>\n\
//                            <td>" + "</td>\n\
//                            </tr>";
//                            $("#componentTableIdLineLevel tbody").append(row);
//                        }
//                    }
//                    if (obj.jArraDeliverySchedule.length !== 0) {
//                        $("#DeliveryScheduleTableId tbody tr").remove();
//                        console.log("obj.jArraDeliverySchedule.length: " + obj.jArraDeliverySchedule.length);
//                        var row = "";
//                        for (var i = 0; i < obj.jArraDeliverySchedule.length; i++) {
//                            var deliveryDate = obj.jArraDeliverySchedule[i].DELIVERY_DATE === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE;
//                            var deliDateCat = obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT;
//                            var purReqNumber = obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER;
//                            var reqItemNumber = obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER;
//                            var scheduledQuantity = obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY;
//                            var time = obj.jArraDeliverySchedule[i].TIME === undefined ? '' : obj.jArraDeliverySchedule[i].TIME;
//                            if (i === 0)
//                            {
//                                row += "<tr><td>" + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" value="' + deliDateCat + '">' + "</td>\n\
//                                <td>" + '<input type="date" id="deliveryDate" class="deliveryDateClass" style="width:300px;" value="' + deliveryDate + '">' + "</td>\n\
//                                <td>" + '<input type="number" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" value="' + scheduledQuantity + '">' + "</td>\n\
//                                <td>" + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" value="' + time + '">' + "</td>\n\
//                                <td>" + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" value="' + purReqNumber + '" readonly>' + "</td>\n\
//                                <td>" + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" value="' + reqItemNumber + '" readonly>' + "</td>\n\
//                                <td></td>\n\
//                                </tr>";
//                            }
//                            else
//                            {
//                                row += "<tr><td>" + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" value="' + deliDateCat + '">' + "</td>\n\
//                                <td>" + '<input type="date" id="deliveryDate" class="deliveryDateClass" style="width:300px;" value="' + deliveryDate + '">' + "</td>\n\
//                                <td>" + '<input type="number" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" value="' + scheduledQuantity + '">' + "</td>\n\
//                                <td>" + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" value="' + time + '">' + "</td>\n\
//                                <td>" + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" value="' + purReqNumber + '" readonly>' + "</td>\n\
//                                <td>" + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" value="' + reqItemNumber + '" readonly>' + "</td>\n\
//                                <td style='width:0px;'>" + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>' + "</td>\n\
//                                </tr>";
//                            }
//                        }
//                        $("#DeliveryScheduleTableId tbody").append(row);
//                    }
//                    if (obj.jArraCondition.length !== 0) {
//                        var trow = "";
//                        $("#conditionTableIdLineLevel tbody tr").remove();
//                        for (var i = 0; i < obj.jArraCondition.length; i++) {
//                            trow += "<tr>"
//                                    + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' disabled = 'true' value='" + (obj.jArraCondition[i].CONDITION_TYPE === undefined ? '' : obj.jArraCondition[i].CONDITION_TYPE) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded nameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' disabled = 'true' value='" + (obj.jArraCondition[i].NAME === undefined ? '' : obj.jArraCondition[i].NAME) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded AmountLineLevel tableInputField' name='AmountLineLevel' value='" + (obj.jArraCondition[i].AMOUNT === undefined ? '' : Number(obj.jArraCondition[i].AMOUNT).toFixed(2)) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' value='" + (obj.jArraCondition[i].CURRENCY1 === undefined ? '' : obj.jArraCondition[i].CURRENCY1) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' name='PerQuantityLineLavel' value='" + (obj.jArraCondition[i].PERCETAGE === undefined ? '' : Number(obj.jArraCondition[i].PERCETAGE).toFixed(2)) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' disabled name='ConditionPricingUnitLineLevel' value='" + (obj.jArraCondition[i].CONDITION_PRICING_UNIT === undefined ? '' : obj.jArraCondition[i].CONDITION_PRICING_UNIT) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' disabled value='" + (obj.jArraCondition[i].UOM === undefined ? '' : obj.jArraCondition[i].UOM) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' disabled value='" + (obj.jArraCondition[i].CONDITION_VALUE1 === undefined ? '' : Number(obj.jArraCondition[i].CONDITION_VALUE1).toFixed(2)) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' readonly = 'true' value='" + (obj.jArraCondition[i].CURRENCY2 === undefined ? '' : obj.jArraCondition[i].CURRENCY2) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' disabled='true' value='" + (obj.jArraCondition[i].CONDITION_VALUE2 === undefined ? '' : obj.jArraCondition[i].CONDITION_VALUE2) + "'></td>"
//                                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled='true' value='" + (obj.jArraCondition[i].CONDITION_CURRENCY === undefined ? '' : obj.jArraCondition[i].CONDITION_CURRENCY) + "'></td>"
//                                    + "<td><input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + (obj.jArraCondition[i].KAPPL === undefined ? '' : obj.jArraCondition[i].KAPPL) + "'>"
//                                    + "<input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + (obj.jArraCondition[i].KVSL1 === undefined ? '' : obj.jArraCondition[i].KVSL1) + "'>"
//                                    + "<input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + (obj.jArraCondition[i].KVSL2 === undefined ? '' : obj.jArraCondition[i].KVSL2) + "'>"
//                                    + "<input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + (obj.jArraCondition[i].ZAEHK === undefined ? '' : obj.jArraCondition[i].ZAEHK) + "'>"
//                                    + "<input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + (obj.jArraCondition[i].STUNR === undefined ? '' : obj.jArraCondition[i].STUNR) + "'>"
//                                    + "<input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='U'></td>"
//                                    + "</td>"
//                                    + "</tr>";
//                        }
////                    alert("trow :" + trow);
//                        $("#conditionTableIdLineLevel tbody").append(trow);
//                        $("#conditionTableIdLineLevel tbody tr").each(function() {
//                            var currency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
//                            var contype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
//                            console.log("condition Currency :" + currency);
//                            if (contype === "JEXS" || contype === "NAVS" || contype === "ZNAV") {
//                                $(this).find("td input").prop("disabled", true);
//                                $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop('disabled', false);
//                            }
//                            if (contype === "NAVM") {
//                                $(this).find("td").eq(3).children(".AmountLineLevel").prop("disabled", true);
//                                $(this).find("td").eq(5).children(".PerQuantityLineLavel").prop("disabled", true);
//                            }
//                            if (currency === "%") {
//                                $(this).find("td").eq(4).children(".CurrencyLineLevel").prop("disabled", true);
//                            }
//
//                            if (contype === "") {
//                                $(this).find("td input").prop("disabled", true);
//                            }
//                        });
//                    }
//                    else {
//                        var kalsm = $("#kalsmHiddenfield").val();
//                        getAllByPricingProcedure(kalsm);
//                        calculationForPBXX();
//                    }
//
//                    if (obj.jArraLimits.length !== 0) {
//                        for (var i = 0; i < obj.jArraLimits.length; i++) {
//                            if (obj.jArraLimits[i].NoLimits === "Yes") {
//                                $("#NoLimit").prop("checked", true);
//                            } else {
//                                $("#NoLimit").prop("checked", false);
//                            }
//                            $("#ExpectedValue").val(obj.jArraLimits[i].ExpectedValue);
//                            $("#OverallLimit").val(obj.jArraLimits[i].OverAllLimits);
//                        }
//                        var PoFrom = $("#PoFrom").val();
//                        var insertionid = $("#ItemNumberSelect").val();
//                        var accAsgn;
//                        var itemCat;
//                        $("#material_headerClass tbody tr").each(function() {
//                            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//                            if (insertionid === id) {
//                                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
//                                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
//                            }
//                        });
//                        if (accAsgn === "U" && itemCat === "D") {
//                            $("#OverallLimit").prop("readonly", true);
//                            $("#ExpectedValue").prop("readonly", true);
//                            $("#NoLimit").prop("disabled", true);
//                        } else {
//                            $("#OverallLimit").prop("readonly", false);
//                            $("#ExpectedValue").prop("readonly", false);
//                            $("#NoLimit").prop("disabled", false);
//                        }
////                    }
//                    } else {
//                        var PoFrom = $("#PoFrom").val();
//                        var insertionid = $("#ItemNumberSelect").val();
//                        var overalllimit;
//                        var expectedValue;
//                        var nolimit;
//                        var accAsgn;
//                        var itemCat;
//                        $("#material_headerClass tbody tr").each(function() {
//                            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//                            if (insertionid === id) {
//                                overalllimit = $(this).find("td").eq(0).children(".overAllLimitHidden").val();
//                                expectedValue = $(this).find("td").eq(0).children(".expectedValueHidden").val();
//                                nolimit = $(this).find("td").eq(0).children(".noLimitHidden").val();
//                                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
//                                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
//                            }
//                        });
//                        if (accAsgn === "U" && itemCat === "D") {
//                            $("#OverallLimit").prop("readonly", true);
//                            $("#ExpectedValue").prop("readonly", true);
//                            $("#NoLimit").prop("disabled", true);
//                            $("#OverallLimit").val(overalllimit);
//                            $("#ExpectedValue").val(expectedValue);
//                            if (nolimit === "true" || nolimit === "True") {
//                                $("#NoLimit").prop("checked", true);
//                            } else if (nolimit === "No") {
//                                $("#NoLimit").prop("checked", false);
//                            }
//                        } else {
//                            $("#OverallLimit").prop("readonly", false);
//                            $("#ExpectedValue").prop("readonly", false);
//                            $("#NoLimit").prop("disabled", false);
//                            $("#OverallLimit").val("");
//                            $("#ExpectedValue").val("");
//                        }
////                    }
//                    }
//                }
//            });
            // Populate Line Level Tabs Ends
            $("#overlay").css("display", "none");
        }
    });
}
