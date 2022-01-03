/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    var PoFrom = $("#PoFrom").val();
    if (PoFrom !== "editpo" && PoFrom !== "editApprovedPo" && PoFrom !== "shortcutPo" && $("#draftPo").val() !== "Yes") {
        saveDeliveryScheduleTabDataOnFieldChange("Onload");
        saveDeliveryTabDataOnLoadFieldChange();
        saveInvoiceTabDataOnLoadFieldChange("OnLoad");
        var PrType = $("#PrType").val();
        if (PrType === "Material") {
            saveAccountAssignmentTabDataOnLoadFieldChange();
        }
        saveTextsTabDataOnLoadFieldChange();
        saveDeliveryAddressTabDataOnLoadFieldChange();
        saveConfirmationsTabDataOnLoadFieldChange();
        saveConditionControlTabDataOnLoadFieldChange();
        saveCustomerTabDataOnLoadFieldChange();
        saveOrUpdateMaterialTab();
        var accAsgn = "";
        var itemCat = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                $(this).find("td").eq(0).children(".isPrSaved").val("Yes");
            }
        });
        
        if (accAsgn === "" && itemCat === "L") {
//            saveComponentTblDataOnLoadFieldChange();
        }
    }
    /*********************Delivery Schedule*********************/
    $("#DeliveryScheduleTableId").on("change", ".deliveryDateCategory", function() {
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });
    $("#DeliveryScheduleTableId").on("change", ".deliveryDateClass", function() {
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });

    $("#DeliveryScheduleTableId").on("change", ".scheduledQuantityClass", function() {
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });
    $("#DeliveryScheduleTableId").on("change", ".timeDeliveryScheduledClass", function() {
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });
    $("#DeliveryScheduleTableId").on("change", ".grQuantityClass", function() {
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });
    $("#DeliveryScheduleTableId").on("change", ".openQuantityClass", function() {
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });
    $("#DeliveryScheduleTableId").on("change", ".schLineClass", function() {
        saveDeliveryScheduleTabDataOnFieldChange("OnChange");
    });

    /*********************Delivery*********************/
    $("#OverdeliveryTolerance").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#UnderdeliveryTolerance").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#ShippingInstruction").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#StockType").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#ValuationType").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#RemShelfLife").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#QAControlLife").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#GRProcTime").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#unlimited").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#FirstReminderExpediter").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#SecondReminderExpediter").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#ThirdReminderExpediter").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#NoExpend").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#PlDeliveryTime").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#incoTermsPart2Delivery").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#DelivCompleted").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });
    $("#GRNonValuated").change(function() {
        saveDeliveryTabDataOnLoadFieldChange("OnChange");
    });

    /**********************Texts**********************/
    $("#ItemText").change(function() {
        saveTextsTabDataOnLoadFieldChange();
    });
    $("#PONoteToApprover").change(function() {
        saveTextsTabDataOnLoadFieldChange();
    });
    $("#InfoRecordPOText").change(function() {
        saveTextsTabDataOnLoadFieldChange();
    });
    $("#DeliveryText").change(function() {
        saveTextsTabDataOnLoadFieldChange();
    });
    $("#prNoteToApproval").change(function() {
        saveTextsTabDataOnLoadFieldChange();
    });

    /**********************Delivery Address**********************/

    $("#Title").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#Name1").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#Name2").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#Street").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#HouseNumber").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#PostalCode").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#City").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#countryCode").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    $("#countryDesc").change(function() {
        saveDeliveryAddressTabDataOnLoadFieldChange();
    });
    /**********************Confirmations**********************/
    $("#confControlLimits").change(function() {
        saveConfirmationsTabDataOnLoadFieldChange();
    });
    $("#OrderAck").change(function() {
        saveConfirmationsTabDataOnLoadFieldChange();
    });
    $("#ConfirmationRequired").change(function() {
        saveConfirmationsTabDataOnLoadFieldChange();
    });
    /**********************Condition Control**********************/

    $("#PrintPrice").change(function() {
        saveConditionControlTabDataOnLoadFieldChange();
    });
    $("#EstimatedPrice").change(function() {
        saveConditionControlTabDataOnLoadFieldChange();
    });

    /**********************Customer Data**********************/

    $("#ProductOriginLine").change(function() {
        saveCustomerTabDataOnLoadFieldChange();
    });
    $("#SegmentDescriptionLine").change(function() {
        saveCustomerTabDataOnLoadFieldChange();
    });
//    if (PoFrom !== "editpo" || PoFrom !== "editApprovedPo") {
    $("#serviceNumberTableId").on("change", ".serviceNumberTableCheckboxClass", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".ServicesNumber_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".shortText_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".quantity_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".servicesUnit_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".grossPrice_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".currency_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".edition_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".lineItemLongText_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });
    $("#serviceTableId").on("change", ".overfTolerance_Services", function() {
        saveServiceTabDataOnLoadFieldChange();
    });

//    }
    $("#unloadingPoint").change(function() {
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnUnloadingPoint", function() {
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });
    $("#recipient").change(function() {
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnRecipients", function() {
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });
    $("#assAsgnDelivSch").change(function() {
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnDeliverySchedule", function() {
        saveAccountAssignmentTabDataOnLoadFieldChange();
    });

    $("#OverallLimit").change(function() {
        saveLimitTabDataOnLoadFieldChange();
    });
    $("#ExpectedValue").change(function() {
        $(this).val(formatAmountByComma($(this).val()));
        saveLimitTabDataOnLoadFieldChange();
    });
    $("#NoLimit").change(function() {
        saveLimitTabDataOnLoadFieldChange();
    });

    /**********************Material Tab**********************/
    $("#revisionLevel").change(function() {
        saveOrUpdateMaterialTab();
    });
    $("#vendMatNo").change(function() {
        saveOrUpdateMaterialTab();
    });
    $("#vendorSubRange").change(function() {
        saveOrUpdateMaterialTab();
    });
    $("#batch").change(function() {
        saveOrUpdateMaterialTab();
    });
    $("#vendorBatch").change(function() {
        saveOrUpdateMaterialTab();
    });
    $("#infoUpdate").change(function() {
        saveOrUpdateMaterialTab();
    });

    /**********************Component Tab**********************/
    $("#componentTableIdLineLevel").on("change", ".comDescription", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();        
    });
    $("#componentTableIdLineLevel").on("change", ".comUnit", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("change", ".comQuantity", function() {
        hideComponentModal();
        $(this).val(formatNumberByComma(removeCommaInNumber($(this).val())));
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("change", ".comProdStorageLoc", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("change", ".comSupplyArea", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("change", ".compQtyIsFixed", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("change", ".compDistKey", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("change", ".compBatch", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();
    });
    $("#componentTableIdLineLevel").on("change", ".compStorageLoc", function() {
        hideComponentModal();
        saveComponentTblDataOnLoadFieldChange();
    });
    
    /**********************Condition Tab**********************/
    $("#conditionTableIdLineLevel").on("change", ".CurrencyLineLevel", function() {
        saveConditionTabDataOnLoadFieldChange("CurrencyChange");
    });
    $("#conditionTableIdLineLevel").on("change", ".numeratorLineLevel", function() {
        saveConditionTabDataOnLoadFieldChange("NumeratorChange");
    });
    $("#conditionTableIdLineLevel").on("change", ".baseUoMLineLevel", function() {
        saveConditionTabDataOnLoadFieldChange("BaseUoMChange");
    });
    $("#conditionTableIdLineLevel").on("change", ".denoForConvLineLevel", function() {
        saveConditionTabDataOnLoadFieldChange("DenoFroConvChange");
    });
    $("#conditionTableIdLineLevel").on("change", ".uOMExtraLineLevel", function() {
        saveConditionTabDataOnLoadFieldChange("UoMExtraChange");
    });
});

function saveAllTabsItemChange() {
    $("#savePoLineSpinner").css("visibility", "visible");
    setTimeout(
            function()
            {
                console.log("Saving line item tab starts:");
                var PoFrom = $("#PoFrom").val();
                var PrType = $("#PrType").val();
                if (PoFrom !== "createpo" && PoFrom !== "byrfq") {
                    /*UOM population on RFQ Addition code by Bittu Starts*/
                    if (PrType === "Material") {
                        var insertionid = $("#ItemNumberSelect").val();
                        $("#material_headerClass tbody tr").each(function() {
                            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                            if (id === insertionid) {
                                var CompanyCode = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
                                var matCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                                var lineType = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                                var prOrRfqLineQty = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());

                                if (lineType !== "PoLine") {
                                    if (matCode !== "") {
                                        var jsonArr = getMaterialMasterOnLoad(matCode, CompanyCode);
                                        if (jsonArr.length !== 0) {
//                                            if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                                            var infoRecordJsonObj = fetchInfoRecordDetails(matCode, "PR");    
                                            console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));        
                                            populateQtyWeights(jsonArr, $(this), infoRecordJsonObj);
//                                            }

                                            // Set NetWeight2 & GrossWeight2 to quantity before conversion
                                            if (jsonArr.length !== 0) {
                                                if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                                                    if (jsonArr[0].orderUnit !== jsonArr[0].baseUOM) {
                                                        var convFrom = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArr[0].conversionFrom : infoRecordJsonObj.CONV_NUM1;
                                                        var convTo = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArr[0].conversionTo : infoRecordJsonObj.CONV_DEN1;
                                                        var qtyBeforeConversion = Number(convFrom) / Number(convTo) * Number(prOrRfqLineQty);
                                                        console.log("qtyBeforeConversion: " + qtyBeforeConversion);
                                                        $("#netWeight2").val(formatNumberByComma(qtyBeforeConversion));
                                                        $("#grossWeight2").val(formatNumberByComma(qtyBeforeConversion));
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                    /*UOM population on RFQ Addition code by Bittu End*/
//                    saveQuantityWeightsOnLoadFieldChange();
                    saveOrUpdateQuantityWeightsOnLoadFieldChange(); // Added by nikhil on 29102020
                }
                saveDeliveryScheduleTabDataOnFieldChange("Onload");
                saveDeliveryTabDataOnLoadFieldChange();
                saveInvoiceTabDataOnLoadFieldChange("OnLoad");
                saveConditionTabDataOnLoadFieldChange("ItemChange");

                if (PrType === "Material") {
                    saveAccountAssignmentTabDataOnLoadFieldChange();
                }
                saveTextsTabDataOnLoadFieldChange();
                saveDeliveryAddressTabDataOnLoadFieldChange();
                saveConfirmationsTabDataOnLoadFieldChange();
                saveConditionControlTabDataOnLoadFieldChange();
                saveOrUpdateMaterialTab();
                saveCustomerTabDataOnLoadFieldChange();

                var accAsgn = "";
                var itemCat = "";
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    var insertionid = $("#ItemNumberSelect").val();
                    if (insertionid === id) {
                        itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                        accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                        $(this).find("td").eq(0).children(".isPrSaved").val("Yes");
                    }
                });
                if (accAsgn === "" && itemCat === "L") {
//                    saveComponentTblDataOnLoadFieldChange();
                }
                console.log("Saving line item tab ends:");
//                $("#savePoLineSpinner").css("visibility", "hidden");
            }
    , 100);
}

function saveDeliveryScheduleTabDataOnFieldChange(reqFrom)
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
        var statisticalDeliveryDate = $(this).find("td").eq(2).children(".statisticaldeliveryDateClass").val();
        var grQuantity = $(this).find("td").eq(7).children(".grQuantityClass").val();
        var openQuantity = $(this).find("td").eq(8).children(".openQuantityClass").val();
        var schLine = $(this).find("td").eq(9).children(".schLineClass").val();
        if (reqFrom === "OnChange") {
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
        }
//        alert("schQuantity :" + schQuantity);

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
        grQuantity = grQuantity === "" ? "NA" : grQuantity;
        openQuantity = openQuantity === "" ? "NA" : openQuantity;
        schLine = schLine === "" ? "NA" : schLine;

        deliverySchTblRow = delDateCat + "," + delDate + "," + schQuantity + "," + time + "," + purReqNumber + "," + reqItemNumber.toString().trim() + ","
                + pRItemNumber + "," + linkid + "," + statisticalDeliveryDate + "," + grQuantity + "," + openQuantity + "," + schLine;
        deliverySchTblRowString = deliverySchTblRowString + deliverySchTblRow + "#";
        console.log("deliverySchTblRowString :" + deliverySchTblRowString);
    });
    console.log("Temp is ::" + temp);
    var Quantity = removeCommaInNumber($("#pOQuantity").val());
    console.log("Quantity is ::" + Quantity);

    if (reqFrom === "OnChange") {
        if (isValid === "No") {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Enter Scheduled quantity!"
            });
            return false;
        }
    }
//    alert("Quantity :" + Quantity + " ,temp :" + temp);
    if (Number(Quantity) !== Number(temp) && reqFrom === "OnChange") {
        Lobibox.notify("error", {
            rounded: true,
            delayIndicator: false,
            msg: "Sum of scheduled quantity should be equal to PR Quantity!"
        });
        return false;
    }
    else
    {
        $("#overlay").css("display", "block");
        setTimeout(function() {
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
//                showLoader();
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
                    $("#overlay").css("display", "none");
                    $("#isDeliveryScheduleTabSaved").val("Yes");
                }
            });
        }, 500);
    }
}
function saveDeliveryTabDataOnLoadFieldChange()
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
    var Incotems1 = $("#incoTermsPart1Delivery").val();
    var Incotems = $("#incoTermsPart2Delivery").val();
    var LineItemNum = $("#ItemNumberSelect").val();
    var unlimited = "";
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
    if ($("#unlimited").prop("checked")) {
        unlimited = "true";
    } else {
        unlimited = "false";
    }
    if (Incotems1 === '') {
        Incotems1 = "NA";
    }

    console.log("DelCompleted After :" + DelCompleted);
    var deliveryString = OverdelTol + "," + UnderdelTol + "," + ShippingInstruction + "," + StockType + "," + ValuationType + "," + RemShelfLife + ","
            + QAControlLife + "," + GRProcTime + "," + FirstRemender + "," + SecondRemender + "," + ThirdRemender + "," + GoodsReceipt + ","
            + GrNonValuated + "," + DelCompleted + "," + NoExpend + "," + PlDelTime + "," + Incotems + "," + LineItemNum + "," + pRItemNumber + ","
            + linkid + "," + unlimited + "," + Incotems1;
    console.log("deliveryString: " + deliveryString);
    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}
function saveInvoiceTabDataOnLoadFieldChange(reqFrom)
{
    var InvoiceReceipt;
    var FinalInvoice;
    var GRBasedIV;
    var ServiceBasedIV;
    var DPCategory = $("#DPCategory").val();
    var TaxCode = $("#TaxCode").val();
    var LineItemNum = $("#ItemNumberSelect").val();
//    var taxCodeDesc = $("#TaxCodeDescription").val();
    var taxCodeDesc = "";
    DPCategory = "";
    if (reqFrom !== "OnLoad") {
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
    if ($("#serviceBasedIV").prop("checked")) {
        ServiceBasedIV = "true";
    } else {
        ServiceBasedIV = "false";
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
            taxCodeDesc + "," + pRItemNumber + "," + linkid + "," + ServiceBasedIV;

    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}
var conditionArray = [];
function saveConditionTabDataOnLoadFieldChange(reqFrom)
{
    console.log("reqFrom saveConditionTabDataOnLoadFieldChange :" + reqFrom);
    var amountArr = [];
    var perArr = [];
    var canValArr = [];
    var condType = [];
    var condName = [];

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
    var insertionOrderIdArr = [];
//    var LinkIDAsJson = {};

    $("#material_headerClass tbody tr").each(function() {
//        var linkIdObj = {};
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        insertionOrderIdArr.push(id);
        if (insertionid === id) {
            pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
        var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
//       if(isPrSaved === "Yes"){
        LinkID = $(this).find("td").eq(0).children(".linkId_Class").val();
        linkIdArray.push(LinkID);
//        }
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
        var lineaddedfrom = $(this).find("td").eq(0).children(".lineAddedFromLineLevel").val();
        if (lineaddedfrom === "" || lineaddedfrom === undefined) {
            lineaddedfrom = "NA";
        }
        
        var status = $(this).find("td").eq(12).children(".statusLineLevel").prop("checked");
//        alert("status :" + status);
        if (status === "") {
            status = "NA";
        }
        var numerator = $(this).find("td").eq(13).children(".numeratorLineLevel").val();
        if (numerator === "") {
            numerator = "NA";
        }
        var baseUom = $(this).find("td").eq(14).children(".baseUoMLineLevel").val();
        if (baseUom === "") {
            baseUom = "NA";
        }
        var denoForConv = $(this).find("td").eq(15).children(".denoForConvLineLevel").val();
        if (denoForConv === "") {
            denoForConv = "NA";
        }
        var uomExtra = $(this).find("td").eq(16).children(".uOMExtraLineLevel").val();
        if (uomExtra === "") {
            uomExtra = "NA";
        }
        amountArr.push(amount);
        perArr.push(perQuant);
        canValArr.push(conVal1);
        condType.push(conType);
        condName.push(name);
        conditionTableRow = conType + ',' + name + ',' + amount + ',' + perQuant + ',' + conPrUnit + ',' + curr1 + ',' + uOM + ',' + conVal1
                + ',' + curr2 + ',' + conVal2 + ',' + conCurr + ',' + conDetails + ',' + itemCode + ',' + pRItemNumber + ',' + linkid
                + ',' + stNumber + ',' + condCount + ',' + KAPPL + ',' + KVSL1 + ',' + KVSL2 + ',' + condChangeId + "," + vendor + ',' + status
                + ',' + numerator + ',' + baseUom + ',' + denoForConv + ',' + uomExtra + ',' + lineaddedfrom;
        codtnTblValue = codtnTblValue + conditionTableRow + "#";
    });
//    codtnTblValue = "PBXX,Gross Price,10.00,0.00,PC,USD,PC,Infinity,SGD,0.00,,,P2_1265400,20,P2_1265400,1,2,M,,,U,0001100937,NA,NA,NA,NA,PC#,Price Incl of disc/Surcharge,10.00,0.00,PC,USD,PC,Infinity,SGD,0.00,,,P2_1265400,20,P2_1265400,65,0,M,,,U,0001100937,NA,NA,NA,NA,PC#FRA1,Freight %,,,PC,%,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,70,0,M,FRE,FR1,U,0001100937,NA,NA,NA,NA,NA#FRB1,Freight (Value),,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,70,1,M,FRE,FR1,U,0001100937,NA,NA,NA,NA,NA#FRC1,Freight/Quantity,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,70,2,M,FRE,FR1,U,0001100937,NA,NA,NA,NA,NA#ZFR1,TM - Freight (Value),,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,70,3,M,FRE,ZFR,U,0001100937,NA,NA,NA,NA,NA#ZPAC,Packing charges.,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,71,0,M,OTH,IP1,U,0001100937,NA,NA,NA,NA,NA#ZCOV,Commission (Value),,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,0,M,OTH,PC4,U,0001100937,NA,NA,NA,NA,NA#ZCOP,Commission(Percenta),,,PC,%,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,1,M,OTH,PC4,U,0001100937,NA,NA,NA,NA,NA#ZCOQ,Comission/Quantity,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,2,M,OTH,PC4,U,0001100937,NA,NA,NA,NA,NA#ZMIS,Misc Charges,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,3,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZMSQ,Misc Charges Qty,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,4,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZITQ,Inland Transit Qty,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,5,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZCRQ,Container Repair Qty,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,6,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZIMP,Weight Variance,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,7,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZBIN,Bin Rental,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,8,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZSEC,Security,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,75,9,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZINV,Insurance (Value),,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,76,0,M,OTH,IN1,U,0001100937,NA,NA,NA,NA,NA#ZINP,Insurance(Percentag),,,PC,%,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,76,1,M,OTH,IN1,U,0001100937,NA,NA,NA,NA,NA#ZINQ,Insurance( quntity),,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,76,2,M,OTH,IN1,U,0001100937,NA,NA,NA,NA,NA#ZM02,Surveyor@ load port,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,1,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM03,Surveyor@disc Port,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,2,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM04,Stevedoring,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,3,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM05,Cranage,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,4,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM06,Timekeeper,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,5,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM07,Jurong Port charges,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,6,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM08,Haulier,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,7,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM09,Incentive,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,8,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZLOD,Loading Equipment,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,9,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZUNL,Un Loading Equipment,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,10,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#ZM10,Marine Handling Chrg,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,78,11,M,OTH,OC1,U,0001100937,NA,NA,NA,NA,NA#,Total Freight,,,PC,USD,PC,0.00,SGD,0.00,,,P2_1265400,20,P2_1265400,80,0,M,,,U,0001100937,NA,NA,NA,NA,PC#,Total Freight & commisioning,,,PC,USD,PC,0.00,SGD,0.00,,,P2_1265400,20,P2_1265400,85,0,M,,,U,0001100937,NA,NA,NA,NA,PC#,Net Price,10.00,0.00,PC,USD,PC,Infinity,SGD,0.00,,,P2_1265400,20,P2_1265400,90,0,M,,,U,0001100937,NA,NA,NA,NA,PC#NAVS,Non-Deductible Tax,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,100,0,M,,,U,0001100937,NA,NA,NA,NA,NA#,@3Z@Border crossing value,10.00,0.00,PC,USD,PC,Infinity,SGD,0.00,,,P2_1265400,20,P2_1265400,200,0,M,,,U,0001100937,NA,NA,NA,NA,PC#JEXS,Taxes on the PO,,,PC,USD,PC,,SGD,0.00,,,P2_1265400,20,P2_1265400,250,0,M,,,U,0001100937,NA,NA,NA,NA,NA#";

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
    $("#overlay").css("display", "block");
    if (TotalCond !== 0)
    {
        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "saveConditionsTabData",
                    "codtnTblValueRowString": codtnTblValue,
                    "poCurrency": $("#CurrencyDeliveryInvoice").val(),
                    "localCurrency": localCurrency,
//                    "linkIdArray": linkIdArray.toString()
                    "insertionOrderIdArrAsString": insertionOrderIdArr.toString()
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
                    getConditionsByLinkId(jsonCondArr);
                    $("#overlay").css("display", "none");
                }
            });
        }, 500);
    }
}

function saveTextsTabDataOnLoadFieldChange()
{
    var ItemText = $("#ItemText").val();
    var InfoRecordPOText = $("#InfoRecordPOText").val();
    var MaterialPOText = $("#MaterialPOText").val();
    var PONoteToApprover = $("#PONoteToApprover").val();
    var DeliveryText = $("#DeliveryText").val();
    var LineItemNumber = $("#ItemNumberSelect").val();
    var PrNoteToApprover = $("#prNoteToApproval").val();
    var prItemNumber = "";
    var linkid = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            prItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });

//    var textString = ItemText + "," + InfoRecordPOText + "," + MaterialPOText + "," + PONoteToApprover + "," + DeliveryText + "," + LineItemNum
//            + "," + pRItemNumber + "," + linkid + "," + PrNoteToApprover;

    var itemTextDataAsJson = {};

    itemTextDataAsJson["LineItemNumber"] = LineItemNumber;
    itemTextDataAsJson["PRItemNumber"] = prItemNumber;
    itemTextDataAsJson["LinkId"] = linkid;
    itemTextDataAsJson["ItemText"] = ItemText;
    itemTextDataAsJson["InfoRecordPOText"] = InfoRecordPOText;
    itemTextDataAsJson["MaterialPOText"] = MaterialPOText;
    itemTextDataAsJson["PONoteToApprover"] = PONoteToApprover;
    itemTextDataAsJson["DeliveryText"] = DeliveryText;
    itemTextDataAsJson["PrNoteToApprover"] = PrNoteToApprover;

    var itemTextDataAsJsonString = JSON.stringify(itemTextDataAsJson);
    console.log("itemTextDataAsJsonString: " + itemTextDataAsJsonString);

    var _csrf = $("input[name=_csrf]").val();
    $("#overlay").css("display", "block");
    setTimeout(function() {
        $.ajax({
            type: "POST",
            url: "saveOrUpdateLineItemTextTab.do",
            async: false,
            data: {
                "reqFrom": "saveOrUpdateLineItemTextTab",
                "itemTextDataAsJsonString": itemTextDataAsJsonString,
                _csrf: _csrf
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
                $("#overlay").css("display", "none");
                var obj = $.parseJSON(responseJson.responseText);
                console.log("obj.Result: " + obj.Result);
            }
        });
    }, 500);
}
function saveDeliveryAddressTabDataOnLoadFieldChange()
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
    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}
function saveConfirmationsTabDataOnLoadFieldChange()
{
    var ConfControl = $("#confControlLimits").val();
    var OrderAck = $("#OrderAck").val();
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
    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}
function saveConditionControlTabDataOnLoadFieldChange()
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
    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}
function saveCustomerTabDataOnLoadFieldChange()
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
    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                $("#overlay").css("display", "none");

                $("#savePoLineSpinner").css("visibility", "hidden");
            }
        });
    }, 500);
}

function saveComponentTblDataOnLoadFieldChange() {
    var componentTblRow = "";
    var componentRowString = "";
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
    $("#componentTableIdLineLevel tbody tr").each(function() {
        var changeId = $(this).find("td").eq(0).children(".changeId").val();
        var material = $(this).find("td").eq(0).children(".comMaterial").val();
        var description = $(this).find("td").eq(1).children(".comDescription").val();
        var plant = $(this).find("td").eq(2).children(".comPlant").val();
        var unit = $(this).find("td").eq(3).children(".comUnit").val();
        var quantity = removeCommaInNumber($(this).find("td").eq(4).children(".comQuantity").val());
        var prodStorageLoc = $(this).find("td").eq(5).children(".comProdStorageLoc").val();
        var supplyArea = $(this).find("td").eq(6).children(".comSupplyArea").val();
        var reqDate = $(this).find("td").eq(7).children(".comRequirementDate").val();
        var qtyIsFixed = $(this).find("td").eq(8).children(".compQtyIsFixed").val();
        var latestReqDate = $(this).find("td").eq(9).children(".compLatestReqDate").val();
        var distKey = $(this).find("td").eq(10).children(".compDistKey").val();
        var batch = $(this).find("td").eq(12).children(".compBatch").val();
        var lineItemNum = $("#ItemNumberSelect").val();

        console.log("changeId: " + changeId);

        qtyIsFixed = qtyIsFixed === "" ? "NA" : qtyIsFixed;
        latestReqDate = latestReqDate === "" ? "NA" : latestReqDate;
        distKey = distKey === "" ? "NA" : distKey;
        batch = batch === "" ? "NA" : batch;
        changeId = changeId === "" || changeId === undefined ? "NA" : changeId;

        componentTblRow = material + "<>" + description + "<>" + plant + "<>" + unit + "<>" + quantity + "<>" + prodStorageLoc + "<>" +
                supplyArea + "<>" + reqDate + "<>" + lineItemNum + "<>" + pRItemNumber + "<>" + linkid + "<>" + qtyIsFixed + "<>" +
                latestReqDate + "<>" + distKey + "<>" + batch + "<>" + changeId;

        componentRowString = componentRowString + componentTblRow + "#";
        console.log("componentRowString :" + componentRowString);
    });
    $("#overlay").css("display", "block");
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveComponentTblData",
                "componentRowString": componentRowString
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var obj = $.parseJSON(responseJson.responseText);
                showComponentModal();
            }
        });
    }, 500);
}

function saveAccountAssignmentTabDataOnLoadFieldChange()
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
        $("#overlay").css("display", "block");
        setTimeout(function() {
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
                    $("#overlay").css("display", "none");
                }
            });
        }, 500);
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
//            var pRItemNumber = "";
//            var linkid = "";
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
        $("#overlay").css("display", "block");
        setTimeout(function() {
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
                    $("#overlay").css("display", "none");
                }
            });
        }, 500);
    }
}

function saveServiceTabDataOnLoadFieldChange()
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
        var netValue = removeCommaInNumber($(this).find("td").eq(13).children(".serviceNetValue").val());
        var actualQty = $(this).find("td").eq(14).children(".serviceActualQty").val();
        var serviceText = $(this).find("td").eq(15).children(".serviceText").val();
        var lineNumberService = $(this).find("td").eq(0).children(".lineNumberService").val();
        var isServOldOrNew = $(this).find("td").eq(0).children(".isServOldOrNew").val();
        var serviceId = $(this).find("td").eq(0).children(".serviceId").val();
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
        servicesLinkId = (servicesLinkId === undefined ? "" : servicesLinkId);
        lineNumberService = (lineNumberService === undefined || lineNumberService === "" ? "NON" : lineNumberService);
        isServOldOrNew = (isServOldOrNew === undefined || isServOldOrNew === "" ? "NON" : isServOldOrNew);

        netValue = (netValue === undefined || netValue === "" ? "NA" : netValue);
        actualQty = (actualQty === undefined || actualQty === "" ? "NA" : actualQty);
        serviceText = (serviceText === undefined || serviceText === "" ? "NA" : serviceText);

        serviceTblRow = lineItemNumber + "," + serviceNumber + "," + shortText + "," + qunatity + "," + unit + "," + grossPrice + "," + currency
                + "," + netPrice + "," + edition + "," + lineItemLongText + "," + overfTolerance + "," + itemCode + "," + linkid + "," + servicesLinkId
                + "," + pRItemNumber + "," + ServiceAccAssDist + "," + selectServiceToDeleteFromSAP + "," + lineNumberService + "," + isServOldOrNew
                + "," + netValue + "," + actualQty + "," + serviceText + "," + serviceId;
        serviceTblRowString = serviceTblRowString + serviceTblRow + "#";
    });
    console.log("serviceTblRowString :" + serviceTblRowString);
    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                var serviceIdArr = $.parseJSON(responseJson.responseText);
                $("#isServiceTabSaved").val("Yes");
                $("#overlay").css("display", "none");
                console.log("serviceIdArr len: " + serviceIdArr.length);
                
            }
        });
    }, 500);
}

function saveServiceAndAccountAssignment(linkidArray, lineItemNumberArr, PrItemNumberArr, accAsgnCatArr, PrLinkID) {

    console.log("linkidArray :::" + linkidArray);
    console.log("lineItemNumberArr :::" + lineItemNumberArr);
    console.log("PrItemNumberArr :::" + PrItemNumberArr);
    console.log("accAsgnCatArr :::" + accAsgnCatArr);
    console.log("PrLinkID :::" + PrLinkID);
    var PrType = $("#PrType").val();
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "saveServiceAndServiceAccAsgnOnLoad",
            "linkidArrayAsString": linkidArray.toString(),
            "PrType": PrType,
            "lineItemNumberArrAsString": lineItemNumberArr.toString(),
            "PrItemNumberArrAsString": PrItemNumberArr.toString(),
            "accAsgnCatArrAsString": accAsgnCatArr.toString(),
            "PrLinkID": PrLinkID
        },
        complete: function(responseJson) {
            jsonResponseWhenDataGetAfterSaveOnLoad = $.parseJSON(responseJson.responseText);
        }
    });
}
function saveLimitTabDataOnLoadFieldChange() {

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
    var actualValue = removeCommaInNumber($("#ActualValue").val());
    var noLimit = $("#NoLimit").prop("checked");
    actualValue = actualValue === "" ? "NA" : actualValue;
    var limitsString = overAllLimit + "," + expectedValue + "," + noLimit + "," + itemCode + "," + pRItemNumber + "," + linkid + "," + actualValue;
    $("#overlay").css("display", "block");
    setTimeout(function() {
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
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}

function saveQuantityWeightsOnLoadFieldChange() {
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
    var netWeight = $("#netWeight").val() !== "" ? removeCommaInNumber($("#netWeight").val()) : "";
    var grossWeight = $("#grossWeight").val() !== "" ? removeCommaInNumber($("#grossWeight").val()) : "";
    
    var volume = $("#volume").val();
    if (volume === "") {
        volume = "NA";
    } else {
        volume = removeCommaInNumber($("#volume").val());
    }
    var points = $("#points").val();
    if (points === "") {
        points = "NA";
    } else {
        points = removeCommaInNumber($("#points").val());
    }
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

    var quantityString = POQuantity + "," + Unit_POQuantity + "," + POQuantityInSKU + "," + Unit_POQuantityInSKU + "," + OrderUnit + "," + Unit_OrderUnit + ","
            + OrderPriceUnit + "," + Unit_OrderPriceUnit + "," + OrderUnitSKU + "," + Unit_OrderUnitSKU + "," + SKU + "," + Unit_SKU + "," + LineItemNum
            + "," + pRItemNumber + "," + linkid + "," + netWeight + "," + grossWeight + "," + volume + "," + points;
    console.log("quantityWtString: " + quantityString);

    $("#overlay").css("display", "block");
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "saveQuantityDates",
                "quantityString": quantityString
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
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}

function saveOrUpdateMaterialTab()
{
    console.log("saveOrUpdateMaterialTab");
    var prItemNumber = "";
    var linkId = "";
    var insertionOrderId = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            prItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
            insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        }
    });
    console.log("prItemNumber: " + prItemNumber + ", linkId: " + linkId + ", insertionOrderId: " + insertionOrderId);

    var MaterialTabDataAsJson = {};

    MaterialTabDataAsJson["prItemNumber"] = prItemNumber;
    MaterialTabDataAsJson["linkId"] = linkId;
    MaterialTabDataAsJson["insertionOrderId"] = insertionOrderId;
    MaterialTabDataAsJson["revisionLevel"] = $("#revisionLevel").val();
    MaterialTabDataAsJson["vendMatNo"] = $("#vendMatNo").val();
    MaterialTabDataAsJson["eanUpc"] = $("#eanUpc").val();
    MaterialTabDataAsJson["vendorSubRange"] = $("#vendorSubRange").val();
    MaterialTabDataAsJson["batch"] = $("#batch").val();
    MaterialTabDataAsJson["vendorBatch"] = $("#vendorBatch").val();
    MaterialTabDataAsJson["infoUpdate"] = $("#infoUpdate").prop("checked").toString();
    MaterialTabDataAsJson["stockType"] = "";
    MaterialTabDataAsJson["mfrPartNumber"] = $("#mfrPartNumber").val();
    MaterialTabDataAsJson["manufacturer"] = $("#manufacturer").val();

    var MaterialTabDataAsJsonString = JSON.stringify(MaterialTabDataAsJson);
    console.log("MaterialTabDataAsJsonString: " + MaterialTabDataAsJsonString);

    $("#overlay").css("display", "block");
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "createAmendDeletePoGetAjaxRequest.do",
            async: false,
            data: {
                "reqFrom": "saveMaterialTab",
                "materialTabDataAsJsonString": MaterialTabDataAsJsonString
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            success: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("MaterialTab Saved");
                $("#overlay").css("display", "none");
            }
        });
    }, 500);
}
