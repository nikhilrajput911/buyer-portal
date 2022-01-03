function findExchangeRate(fromCurrency, toCurrency)
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
            changeOnCurrency(exchangeRate, toCurrency);
            changeServiceAndConitionTabDataSavedInDB(exchangeRate, toCurrency);
            var PoFrom = $("#PoFrom").val();
            if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                calculateStatusTabValue(exchangeRate, toCurrency);
            }

//            saveServiceTabDataOnLoadFieldChange();
//            saveConditionControlTabDataOnLoadFieldChange();
        }
    });
}
function makeAccountAssignmentTabFormFieldReadonly()
{
    $("#unloadingPoint").prop("readonly", true);
    $("#recipient").prop("readonly", true);
    $("#gLAccount").prop("readonly", true);
    $("#coArea").prop("readonly", true);

    $("#costCenterAccAsgn").prop("readonly", true);
    $("#accAsgnOrder").prop("readonly", true);
    $("#accAsgnAsset").prop("readonly", true);
    $("#accAsgnWBSElementInput").prop("readonly", true);
    $("#accAsgnSalesOrder").prop("readonly", true);
    $("#assAsgnItemNumber").prop("readonly", true);
    $("#assAsgnDelivSch").prop("readonly", true);
    $("#accAsgnfund").prop("readonly", true);
    $("#accAsgnfunctionalArea").prop("readonly", true);
    $("#accAsgnFundCenterInput").prop("readonly", true);
    $("#accAsgnCommItemInput").prop("readonly", true);
    $("#accAsgnNActNumInput").prop("readonly", true);
}
function makeAccountAssignmentTabFormFieldNonReadonly()
{
    $("#unloadingPoint").prop("readonly", false);
    $("#recipient").prop("readonly", false);
    $("#gLAccount").prop("readonly", false);
    $("#coArea").prop("readonly", false);

    $("#costCenterAccAsgn").prop("readonly", false);
    $("#accAsgnOrder").prop("readonly", false);
    $("#accAsgnAsset").prop("readonly", false);
    $("#accAsgnWBSElementInput").prop("readonly", false);
    $("#accAsgnSalesOrder").prop("readonly", false);
    $("#assAsgnItemNumber").prop("readonly", false);
    $("#assAsgnDelivSch").prop("readonly", false);
    $("#accAsgnfund").prop("readonly", false);
    $("#accAsgnfunctionalArea").prop("readonly", false);
    $("#accAsgnFundCenterInput").prop("readonly", false);
    $("#accAsgnCommItemInput").prop("readonly", false);
    $("#accAsgnNActNumInput").prop("readonly", false);
}

function updatePrOrRfqLineRemainingQtyInEditOrAmendPo()
{
    console.log("In updatePrOrRfqLineRemainingQtyInEditOrAmendPo====");
    $("#material_headerClass tbody tr").each(function(index) {
        var itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
        console.log("itemCat: " + itemCat);

        var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
        console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);

        var totalQuantityOfThisLine = $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val();
        console.log("totalQuantityOfThisLine: " + totalQuantityOfThisLine);

        var pr_quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
        console.log("pr_quantity: " + pr_quantity);

        if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "RfqLine" || isPoLineOrPrLineOrRfqLineOrEmptyLine === "PrLine" || isPoLineOrPrLineOrRfqLineOrEmptyLine === "PoLine")
        {
            if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "RfqLine")
            {
                var rfqIdRfqLineIdInsertionOrderIdString = $(this).find("td").eq(0).children(".rfqIdRfqLineIdInsertionOrderIdString").val();
                console.log("rfqIdRfqLineIdInsertionOrderIdString: " + rfqIdRfqLineIdInsertionOrderIdString);

                var rfqIdRfqLineIdInsertionOrderIdArr = rfqIdRfqLineIdInsertionOrderIdString.split("#");

                var rfqId = rfqIdRfqLineIdInsertionOrderIdArr[0];
                var rfqLineId = rfqIdRfqLineIdInsertionOrderIdArr[1];
                var insertionOrderId = rfqIdRfqLineIdInsertionOrderIdArr[2];

                updateRfqLineRemainingQtyInAmendOrEditPo(rfqLineId, pr_quantity);
            }
            else if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "PrLine")
            {
                var insertionOrderId_Class = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var parentPrLineInsertionOrderId = $(this).find("td").eq(0).children(".parentPrLineInsertionOrderId").val();
                console.log("insertionOrderId_Class: " + insertionOrderId_Class);
                console.log("parentPrLineInsertionOrderId: " + parentPrLineInsertionOrderId);

                if (parentPrLineInsertionOrderId !== undefined && parentPrLineInsertionOrderId !== "")
                {
                    updatePrLineRemainingQtyInAmendOrEditPo(parentPrLineInsertionOrderId, pr_quantity);
                }
                else
                {
                    updatePrLineRemainingQtyInAmendOrEditPo(insertionOrderId_Class, pr_quantity);
                }
            }
            else if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "PoLine")
            {
                var pid = $(this).find("td").eq(0).children(".procInstId_Class").val();
                var prItemNumber = $(this).find("td").eq(24).text();
                var prRfqNumber = $(this).find("td").eq(0).children(".prRfqNumber").val();
                var prRfqLineItemNumber = $(this).find("td").eq(0).children(".prRfqLineItemNumber").val();
                var totalQuantityOfThisLine = $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val();
                var prQuantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                console.log("pid: " + pid);
                console.log("prItemNumber: " + prItemNumber);
                console.log("prRfqNumber: " + prRfqNumber);
                console.log("prRfqLineItemNumber: " + prRfqLineItemNumber);
                console.log("totalQuantityOfThisLine: " + totalQuantityOfThisLine);
                console.log("prQuantity: " + prQuantity);

                if (prRfqNumber !== "" && prRfqNumber !== undefined && prRfqLineItemNumber !== "" && prRfqLineItemNumber !== undefined) {
                    console.log("This is a RFQ Line!");
                    if (Number(totalQuantityOfThisLine) !== Number(prQuantity)) {
                        if (Number(prQuantity) > Number(totalQuantityOfThisLine)) {
                            var updatedQtyDiff = Number(prQuantity) - Number(totalQuantityOfThisLine);
                            console.log("updatedQtyDiff: " + Number(updatedQtyDiff).toFixed(3));
                            updateRfqLineRemQtyByRfqNumberAndRfqLineItemNumber(prRfqNumber, prRfqLineItemNumber, Number(updatedQtyDiff).toFixed(3));
                        }
                    } else {
                        console.log("RFQ Line quantity not changed!");
                    }
                } else if (pid !== "" && pid !== undefined) {
                    console.log("This is a PR Line!");
                    if (Number(totalQuantityOfThisLine) !== Number(prQuantity)) {
                        if (Number(prQuantity) > Number(totalQuantityOfThisLine)) {
                            var updatedQtyDiff = Number(prQuantity) - Number(totalQuantityOfThisLine);
                            console.log("updatedQtyDiff: " + Number(updatedQtyDiff).toFixed(3));
                            updatePrLineRemainingQtyAfterPoCreationByPid(pid, Number(updatedQtyDiff).toFixed(3), prItemNumber);
                        }
                    } else {
                        console.log("PR Line quantity not changed!");
                    }
                } else {
                    console.log("This is a Standalone Line!");
                }
            }
        }
    });
}

function updateRfqLineRemainingQtyInAmendOrEditPo(rfqLineId, remainingQty)
{
    console.log("In updateRfqLineRemainingQtyInAmendOrEditPo====");
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);

    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updateRfqLineRemainingQtyInAmendOrEditPo",
            "rfqLineId": rfqLineId,
            "remainingQty": remainingQty,
            "companyCode": companyCode,
            "prType": prType
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

function updatePrLineRemainingQtyInAmendOrEditPo(insertionOrderId, remainingQty)
{
    console.log("In updatePrLineRemainingQtyInAmendOrEditPo====");
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);

    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatePrLineRemainingQtyInAmendOrEditPo",
            "insertionOrderId": insertionOrderId,
            "remainingQty": remainingQty,
            "companyCode": companyCode,
            "prType": prType
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

function updatePrLineRemainingQtyAfterSaveDraft(insertionOrderId, remainingQty)
{
    console.log("In updatePrLineRemainingQtyAfterSaveDraft====");
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);

    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatePrLineRemainingQtyAfterSaveDraft",
            "insertionOrderId": insertionOrderId,
            "remainingQty": remainingQty,
            "companyCode": companyCode,
            "prType": prType
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

function updatePrLineRemainingQtyAfterPoCreation(insertionOrderIdString, poLineQuantityString)
{
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("In updatePrLineRemainingQtyAfterPoCreation====");
    console.log("insertionOrderIdString: " + insertionOrderIdString);
    console.log("poLineQuantityString: " + poLineQuantityString);
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatePrLineRemainingQtyAfterPoCreation",
            "insertionOrderIdString": insertionOrderIdString,
            "poLineQuantityString": poLineQuantityString,
            "companyCode": companyCode,
            "prType": prType
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

function updatePrLineRemainingQtyAfterPoCreationByPid(pid, updatedQtyDiff, prItemNumber)
{
    console.log("In updatePrLineRemainingQtyAfterPoCreationByPid");
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);
//    prItemNumber = Number(prItemNumber);
    console.log("prItemNumber: " + prItemNumber);
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatePrLineRemainingQtyAfterPoCreationByPid",
            "pid": pid,
            "updatedQtyDiff": updatedQtyDiff,
            "companyCode": companyCode,
            "prType": prType,
            "prItemNumber": prItemNumber
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function updateRfqLineRemQtyByRfqNumberAndRfqLineItemNumber(rfqNumber, rfqLineItemNumber, updatedQtyDiff)
{
    console.log("In updateRfqLineRemQtyByRfqNumberAndRfqLineItemNumber");
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updateRfqLineRemQtyByRfqNumberAndRfqLineItemNumber",
            "rfqNumber": rfqNumber,
            "rfqLineItemNumber": rfqLineItemNumber,
            "updatedQtyDiff": updatedQtyDiff,
            "companyCode": companyCode,
            "prType": prType
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function prLineItemTableValidation() {
    var accAsgn = "";
    var matcode = "";
    var errorMsg = "";
    var itemCat = "";
    var quantity = "";
    var pRLineCurrency = "";
    var delDate = "";
    var pRPlant = "";
    var pRPurchansingOrg = "";
    var pRPurGroup = "";
    var pRStorageLoc = "";
    var pRDeptName = "";
    var pODeptName = "";
    var prNetPrice = "";
    var prPerUnit = "";
    var isPrLineData = "Yes";
    var matlGroup = "";
    var trackingNumber = "";
    var criticality = "";
    var shortText = "";
    var prLineLen = $("#material_headerClass tbody tr").length;
    var rows = $('#material_headerClass tbody tr');
    var accAsgn;
    var insertionid = $(".ItemNumberSelectClass").val();

    for (var i = 0; i < prLineLen; i++) {
        accAsgn = $(rows[i]).find('td').eq(2).children(".accountAssignmentClass").val();
        itemCat = $(rows[i]).find("td").eq(3).children(".itemCategoryClass").val();
        matcode = $(rows[i]).find("td").eq(4).children(".materialCodeClass").val();
        quantity = removeCommaInNumber($(rows[i]).find("td").eq(6).children(".pr-quantity").val());
        prNetPrice = removeCommaInNumber($(rows[i]).find("td").eq(12).children(".pr-net-price").val());
        prPerUnit = removeCommaInNumber($(rows[i]).find("td").eq(14).children(".priceUnitClass").val());
        pRLineCurrency = $(rows[i]).find("td").eq(13).children(".currencyClass").val();
        delDate = $(rows[i]).find("td").eq(11).text();
        pRPlant = $(rows[i]).find("td").eq(16).children(".hiddenPlantCode").val();
        pRPurchansingOrg = $(rows[i]).find("td").eq(21).children(".purchaseOrganizationClass").val();
        pRPurGroup = $(rows[i]).find("td").eq(22).children(".purchasingGroupClass").val();
        pRStorageLoc = $(rows[i]).find("td").eq(17).children(".storageLocationClass").val();
        pRDeptName = $(rows[i]).find("td").eq(27).children(".prDeptNameClass").val();
//        pODeptName = $(rows[i]).find("td").eq(26).children(".poDeptNameClass").val();
        matlGroup = $(rows[i]).find("td").eq(15).children(".materialGroupClass").val();
        trackingNumber = $(rows[i]).find("td").eq(19).children(".pr-tracking-number").val();
        criticality = $(rows[i]).find("td").eq(9).children(".criticalityClass").val();
        shortText = $(rows[i]).find("td").eq(5).children(".pr-short-text").val();
        var id = $(rows[i]).find("td").eq(0).children(".insertionOrderId_Class").val();
        var typeOfLine = $(rows[i]).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
        if (insertionid === id) {
            if (typeOfLine === "EmptyLine") {
                var poType = $("#typeOfPOHeader").val();
                if ((poType !== "Inter Company" && poType !== "PO for Group Trade" && poType !== "PO for Associate Trade" && poType !== "PO for 3rd Party Trade" && poType !== "Ferrous PO - Local") && accAsgn === "") {
                    if (accAsgn === "" && itemCat !== "L") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Account Assignment Category!";
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isPrLineData = "No";
                        $(rows[i]).find("td").eq(2).children(".accountAssignmentClass").css("border-color", "red");
                        $(rows[i]).find("td").eq(2).children(".accountAssignmentClass").focus();
                        break;
                    } else {
                        $(rows[i]).find("td").eq(2).children(".accountAssignmentClass").css("border-color", "");
                    }
                }

                var prType = $("#PrType").val();
                if (prType === "Service") {
                    var dropDownItemNumber = $("#ItemNumberSelect").val();
                    if (accAsgn !== "" && itemCat === "") {
                        if (dropDownItemNumber !== "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please select the Item Categoty in PR!";
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isPrLineData = "No";
                            $(rows[i]).find("td").eq(3).children(".itemCategoryClass").css("border-color", "red");
                            $(rows[i]).find("td").eq(3).children(".itemCategoryClass").focus();
                            break;
                        }
                    } else {
                        $(rows[i]).find("td").eq(3).children(".itemCategoryClass").css("border-color", "");
                    }
                    if (shortText === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Short Text!";
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isPrLineData = "No";
                        $(rows[i]).find("td").eq(5).children(".pr-short-text").css("border-color", "red");
                        $(rows[i]).find("td").eq(5).children(".pr-short-text").focus();
                        break;
                    } else {
                        $(rows[i]).find("td").eq(5).children(".pr-short-text").css("border-color", "");
                    }
                    if (criticality === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Criticality!";
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isPrLineData = "No";
                        $(rows[i]).find("td").eq(9).children(".criticalityClass").css("border-color", "red");
                        $(rows[i]).find("td").eq(9).children(".criticalityClass").focus();
                        break;
                    } else {
                        $(rows[i]).find("td").eq(9).children(".criticalityClass").css("border-color", "");
                    }

                }

                if (prType === "Material") {
                    if (matcode === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Material Code!";
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isPrLineData = "No";
                        $(rows[i]).find("td").eq(4).children(".materialCodeClass").css("border-color", "red");
                        $(rows[i]).find("td").eq(4).children(".materialCodeClass").focus();
                        break;
                    } else {
                        $(rows[i]).find("td").eq(4).children(".materialCodeClass").css("border-color", "");
                    }
                }

                if (quantity === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Quantity!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isPrLineData = "No";
                    $(rows[i]).find("td").eq(6).children(".pr-quantity").css("border-color", "red");
                    $(rows[i]).find("td").eq(6).children(".pr-quantity").focus();
                    break;
                } else {
                    $(rows[i]).find("td").eq(6).children(".pr-quantity").css("border-color", "");
                }
                if (prType === "Material") {
                    if (prNetPrice === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Net Price!";
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isPrLineData = "No";
                        $(rows[i]).find("td").eq(12).children(".pr-net-price").css("border-color", "red");
                        $(rows[i]).find("td").eq(12).children(".pr-net-price").focus();
                        break;
                    } else {
                        $(rows[i]).find("td").eq(12).children(".pr-net-price").css("border-color", "");
                    }
                    if (prPerUnit === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Per Unit!";
                        $(rows[i]).find("td").eq(14).children(".priceUnitClass").css("border-color", "red");
                        $(rows[i]).find("td").eq(14).children(".priceUnitClass").focus();
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isPrLineData = "No";
                        break;
                    } else {
                        $(rows[i]).find("td").eq(14).children(".priceUnitClass").css("border-color", "");
                    }
                }
//
                if (pRLineCurrency === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Currency!";
                    $(rows[i]).find("td").eq(13).children(".currencyClass").css("border-color", "red");
                    $(rows[i]).find("td").eq(13).children(".currencyClass").focus();
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isPrLineData = "No";
                    break;
                } else {
                    $(rows[i]).find("td").eq(13).children(".currencyClass").css("border-color", "");
                }
//        alert("delDate :" + delDate);
//        if (delDate === "") {
//            alert("Insice");
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            errorMsg = "Please enter Delivery Date!";
//            $(rows[i]).find("td").eq(8).children(".prDeliveryDatepicker").css("border-color", "red");
//            $(rows[i]).find("td").eq(8).children(".prDeliveryDatepicker").focus();
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            isPrLineData = "No";
//            break;
//        } else {
//            $(rows[i]).find("td").eq(8).children(".prDeliveryDatepicker").css("border-color", "");
//        }
                if (prType === "Service") {
                    if (matlGroup === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter material group!";
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isPrLineData = "No";
                        $(rows[i]).find("td").eq(15).children(".materialGroupClass").css("border-color", "red");
                        $(rows[i]).find("td").eq(15).children(".materialGroupClass").focus();
                        break;
                    } else {
                        $(rows[i]).find("td").eq(15).children(".materialGroupClass").css("border-color", "");
                    }
                }
                if (pRPlant === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Plant!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isPrLineData = "No";
                    $(rows[i]).find("td").eq(16).children(".hiddenPlantCode").css("border-color", "red");
                    $(rows[i]).find("td").eq(16).children(".hiddenPlantCode").focus();
                    break;
                } else {
                    $(rows[i]).find("td").eq(16).children(".hiddenPlantCode").css("border-color", "");
                }
                if (trackingNumber === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Tracking Number!";
                    $(rows[i]).find("td").eq(19).children(".pr-tracking-number").css("border-color", "red");
                    $(rows[i]).find("td").eq(19).children(".pr-tracking-number").focus();
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isPrLineData = "No";
                    break
                } else {
                    $(rows[i]).find("td").eq(19).children(".pr-tracking-number").css("border-color", "");
                }
//        if (pRPurchansingOrg === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            errorMsg = "Please enter Purchasing Org!";
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            isPrLineData = "No";
//            $(rows[i]).find("td").eq(18).children(".purchaseOrganizationClass").css("border-color", "red");
//            $(rows[i]).find("td").eq(18).children(".purchaseOrganizationClass").focus();
//            break;
//        } else {
//            $(rows[i]).find("td").eq(18).children(".purchaseOrganizationClass").css("border-color", "");
//        }
//        if (pRPurGroup === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            errorMsg = "Please enter Purchasing Group!";
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            isPrLineData = "No";
//            $(rows[i]).find("td").eq(19).children(".purchasingGroupClass").css("border-color", "red");
//            $(rows[i]).find("td").eq(19).children(".purchasingGroupClass").focus();
//            break;
//        } else {
//            $(rows[i]).find("td").eq(19).children(".purchasingGroupClass").css("border-color", "");
//        }

//        if (pRStorageLoc === "") {
//            errorMsg = "Please enter Storage Location!";
//            $(rows[i]).find("td").eq(20).children(".storageLocationClass").css("border-color", "red");
//            $(rows[i]).find("td").eq(20).children(".storageLocationClass").focus();
//            Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            isPrLineData = "No";
//            break
//        } else {
//            $(rows[i]).find("td").eq(20).children(".storageLocationClass").css("border-color", "");
//
//        }

//            if (pRDeptName === "") {
//                errorMsg = "Please enter Dept Name!";
//                $(rows[i]).find("td").eq(25).children(".prDeptNameClass").css("border-color", "red");
//                Lobibox.notify("error", {
//                    rounded: true,
//                    delayIndicator: false,
//                    msg: errorMsg
//                });
//                isPrLineData = "No";
//                break
//            } else {
//                $(rows[i]).find("td").eq(25).children(".prDeptNameClass").css("border-color", "");
//            }
//            if (pODeptName === "") {
//                errorMsg = "Please enter Dept Name!";
//                $(rows[i]).find("td").eq(26).children(".poDeptNameClass").css("border-color", "red");
//                Lobibox.notify("error", {
//                    rounded: true,
//                    delayIndicator: false,
//                    msg: errorMsg
//                });
//                isPrLineData = "No";
//                break
//            } else {
//                $(rows[i]).find("td").eq(26).children(".poDeptNameClass").css("border-color", "");
//            }
            }

        }
    }
    if (isPrLineData === "No")
    {
        return "1";
    } else {
        return "0";
    }

//    var formatted_date = current_datetime.getFullYear() + "-" + mon + "-" + day;
//    $("#DeliveryScheduleTableId tbody tr").remove();
//    var row = "";
//    row = "<tr><td>"
//            + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" name="" value=' + delDateCat + '>' + "</td><td>"
//            + '<input type="date" id="deliveryDate" class="deliveryDateClass" style="width:300px;" value=' + formatted_date + ' min=' + formatted_date + '>' + "</td><td>"
//            + '<input type="number" class="form-control form-rounded tableInputField scheduledQuantityClass" value="' + quantity + '" id="scheduledQuantity" name="scheduledQuantity">' + "</td><td>"
//            + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" name="timeDeliveryScheduled">' + "</td><td>"
//            + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" name="prNumberDeliveryScheduled" disabled>' + "</td><td>"
//            + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" name="reqItemNumber" disabled>' + "</td><td style='width:0px;'>"
//            + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>'
//            + "</td></tr>";
//    $("#DeliveryScheduleTableId").children("tbody").append(row);


}

function enableValidityFromAndToDateInAdditionalDataTab()
{
    var typeOfPo = $("#typeOfPOHeader").val();
    if (typeOfPo === "PO for Services")
    {
        var itemCat = "";
        var accAssCat = "";
        var insertionid = $(".ItemNumberSelectClass").val();
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (id === insertionid) {
                accAssCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                return;
            }
        });
        if (accAssCat === "U" && itemCat === "D")
        {
            $("#validityFromHeaderDiv").css("display", "block");
            $("#validityToHeaderDiv").css("display", "block");
        }
        else
        {
            $("#validityFromHeaderDiv").css("display", "none");
            $("#validityToHeaderDiv").css("display", "none");
        }
    }
}

function changeOnCurrency(exchangeRate, toCurrency) {
    var PrType = $("#PrType").val();

    if (PrType === "Service") {
        var totalNtePrice = 0.0;
        $("#serviceTableId tbody tr").each(function() {
            var grossPrice = removeCommaInNumber($(this).find("td").eq(7).children(".grossPrice_Services").val());
            var quantity = removeCommaInNumber($(this).find("td").eq(5).children(".quantity_Services").val());
            $(this).find("td").eq(7).children(".grossPrice_Services").val(formatAmountByComma((Number(grossPrice).toFixed(2) * Number(exchangeRate)).toFixed(2)));
            $(this).find("td").eq(8).children(".currency_Services").val(toCurrency);
//            var newGrossPrice = Number(grossPrice).toFixed(2) * Number(exchangeRate).toFixed(2);
            var newGrossPrice = removeCommaInNumber($(this).find("td").eq(7).children(".grossPrice_Services").val());
            var netprice = (Number(newGrossPrice).toFixed(2) * Number(quantity)).toFixed(2);
            totalNtePrice = Number(totalNtePrice) + Number(netprice);
            $(this).find("td").eq(9).children(".netPrice_Services").val(formatAmountByComma(netprice));
        });
    }

    $("#material_headerClass tbody tr").each(function() {
        $(this).find("td").eq(0).children(".timeOfChangeCurrency").val("after");
        $(this).find("td").eq(0).children(".isPrSaved").val("No");
        var netValue = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
        var NetPrice = Number(netValue) * Number(exchangeRate);
        if (PrType === "Service") {
            $(this).find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(Number(totalNtePrice).toFixed(2)));
        } else if (PrType === "Material") {
            $(this).find("td").eq(12).children(".pr-net-price").val(formatAmountByComma(Number(NetPrice).toFixed(2)));
        }
        $(this).find("td").eq(0).children(".isPrSaved").val("");
        $(this).find("td").eq(13).children(".currencyClass").val(toCurrency);

        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            console.log("insertionid bt:" + insertionid + " " + "id :" + id);
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var currency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                var condType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                if (currency !== "%" && condType === "") {
                    $(this).find("td").eq(4).children(".CurrencyLineLevel").val(toCurrency);
                }
                $(this).find("td").eq(9).children(".Currency2LineLevel").val(toCurrency);
            });
//            calculationForPBXX();
            calculateConditionOnCurrncyChange(exchangeRate);

        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var currency = $(this).find("td").eq(4).children(".CurrencyHeader").val();
        var conType = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
//        var condName = $(this).find("td").eq(2).children('.nameConditionsHeader').val();
        if (currency !== "%" && conType === "") {
            $(this).find("td").eq(4).children(".CurrencyHeader").val(toCurrency);
        }
        $(this).find("td").eq(9).children(".Currency2Header").val(toCurrency);
    });
//    calculatePBXXForHeader();
    calculateConditionOnCurrncyChangeAtHeader(exchangeRate);

    console.log("conditionLineLevelArray before currency change: " + JSON.stringify(conditionLineLevelArray));
    if (conditionLineLevelArray.length > 0) {
        for (var p = 0; p < conditionLineLevelArray.length; p++) {
//        if (conditiontype === conditionLineLevelArray[p].Ctype && indexnumber === conditionLineLevelArray[p].indexnumber) {
            conditionLineLevelArray[p].amount = ((Number(conditionLineLevelArray[p].amount) * Number(exchangeRate)).toFixed(2)).toString();
            conditionLineLevelArray[p].per = ((Number(conditionLineLevelArray[p].per) * Number(exchangeRate)).toFixed(2)).toString();
            conditionLineLevelArray[p].oldAmountHidden = ((Number(conditionLineLevelArray[p].oldAmountHidden) * Number(exchangeRate)).toFixed(2)).toString();
            conditionLineLevelArray[p].oldPerHidden = ((Number(conditionLineLevelArray[p].oldPerHidden) * Number(exchangeRate)).toFixed(2)).toString();
            conditionLineLevelArray[p].conditionValue = ((Number(conditionLineLevelArray[p].conditionValue) * Number(exchangeRate)).toFixed(2)).toString();
            conditionLineLevelArray[p].prCurrency = toCurrency;
//        }
        }
    }
    console.log("conditionLineLevelArray after currency change: " + JSON.stringify(conditionLineLevelArray));
}
function getAllCurrency() {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllCurrency"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj lengtth :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='CurrencyDeliveryInvoiceCheckbox'></td>"
                        + "<td>" + obj[i].CURRENCY_CODE + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#CurrencyDeliveryInvoiceModelTebleId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#CurrencyDeliveryInvoiceModelTebleId')) {
                currencyTable.destroy();
                currencyTable = null;
                $("#CurrencyDeliveryInvoiceModelTebleId").children('tbody').html(row);
                currencyTable = $('table.CurrencyDeliveryInvoiceModelTebleClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                currencyTable.buttons().container()
                        .appendTo('#CurrencyDeliveryInvoiceModelTebleId_wrapper .col-md-6:eq(0)');
            } else {
                $('#CurrencyDeliveryInvoiceModelTebleId thead tr').clone(true).appendTo('#CurrencyDeliveryInvoiceModelTebleId thead');
                $('#CurrencyDeliveryInvoiceModelTebleId thead tr:eq(1) th').each(function(i) {
                    $('#CurrencyDeliveryInvoiceModelTebleId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (currencyTable.column(i).search() !== this.value) {
                            currencyTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                currencyTable = $('table.CurrencyDeliveryInvoiceModelTebleClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                currencyTable.buttons().container()
                        .appendTo('#CurrencyDeliveryInvoiceModelTebleId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}

function changeServiceAndConitionTabDataSavedInDB(exchangeRate, toCurrency) {
    var PrType = $("#PrType").val();
    if (PrType === "Service") {
        var linkIdArray = [];
        var LinkID = "";
        $("#material_headerClass tbody tr").each(function() {
            LinkID = $(this).find("td").eq(0).children(".linkId_Class").val();
            linkIdArray.push(LinkID);
        });
        $.ajax({
            type: "GET",
            url: "createAmendDeletePoGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "changeServiceAndConitionTabDataSavedInDB",
                "linkidArrayAsString": linkIdArray.toString(),
                "currency": toCurrency,
                "exchangeRate": exchangeRate
            }
        });
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
            console.log("obj.EXCHANGE_RATE :" + obj.ExchangeRate);
            exchangeRate = obj.ExchangeRate;
        }
    });
    return exchangeRate;
}
//function calculateConditionOnCurrncyChange(exchangeRate) {
//    var conType = "";
//    var condName = '';
//    var netPrice = "";
//    var Quantity = "";
//    var perQuant = "";
//    var fromCurrency = "";
//    var grossCondVal = "";
//    var PBXX_CondVal = "";
//    var insertionid = $("#ItemNumberSelect").val();
//    $("#material_headerClass tbody tr").each(function() {
//        var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//        if (insertionid === itemDropdownId) {
//            Quantity = $(this).find("td").eq(6).children(".pr-quantity").val();
////            netPrice = $(this).find("td").eq(12).children(".pr-net-price").val();
//            netPrice = $(this).find("td").eq(0).children(".prNetPriceHidden").val();
//            perQuant = $(this).find("td").eq(14).children(".priceUnitClass").val();
//            fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
//        }
//    });
//    var amount = netPrice;
//    var condValue = "";
//    $("#conditionTableIdLineLevel tbody tr").each(function() {
//        $(this).find("td").eq(9).children('.Currency2Header').val();
//        if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
//            conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
//        } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
//            conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
//        }
//        if ($(this).find("td").eq(2).children("input").hasClass("nameConditionsLineLevel") === true) {
//            condName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
//        } else if ($(this).find("td").eq(2).children("input").hasClass("NameConditionsLineLevel") === true) {
//            condName = $(this).find("td").eq(2).children(".NameConditionsLineLevel").val();
//        }
//
//        var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
//        if (conType === "PBXX") {
//            grossCondVal = $(this).find("td").eq(8).children(".ConditionValueLineLevel").val();
//            PBXX_CondVal = grossCondVal;
//        }
//        var TaxPer = "";
//        if (conType === "ZNAV" || conType === "NAVS" || conType === "JEXS") {
//            var companycode = $("#companycodeHeader").val();
//            var taxCode = $("#TaxCode").val();
//            var WebServiceCallIp = $("#WebServiceCallIp").val();
//            console.log("WebServiceCallIp: " + WebServiceCallIp);
//            var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
//            console.log("serviceUrl: " + serviceUrl);
////            TaxPer = getTaxResponse("");                    //Localhost
//            $.ajax({
//                type: "POST",
//                url: serviceUrl,
//                contentType: "application/xml",
//                dataType: "xml",
//                async: false,
//                success: function(data, textStatus, jqXHR) {
//                    console.log("Response: " + data);
//                    TaxPer = getTaxResponse(data);              // this TaxPer used in ZNAV,NAVS,JEXS calculation
//                    console.log("TaxPer: " + TaxPer);
////                        $("#overlay").css("display", "none");
//                }
//            });
//        }
//
//
//        if ($(this).find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
//            amount = $(this).find("td").eq(3).children(".AmountLineLevel").val();
//        } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
//            amount = $(this).find("td").eq(3).children(".newAmountLineLevel").val();
//        }
//        var fml = formula(conType);
//        if (conType === "" && condName !== "") {
//            if ($(this).find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
//                $(this).find("td").eq(3).children(".AmountLineLevel").val((Number(amount) * Number(exchangeRate)).toFixed(2));
//                amount = $(this).find("td").eq(3).children(".AmountLineLevel").val();
//            } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
//                $(this).find("td").eq(3).children(".newAmountLineLevel").val((Number(amount) * Number(exchangeRate)).toFixed(2));
//                amount = $(this).find("td").eq(3).children(".newAmountLineLevel").val();
//            }
//        }
//
//
//        var poQty = Quantity;
//        var perQty = perQuant;
//        var quant;
//        var exp = new String(fml);
//        condValue = eval(exp.toString());
//
//        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(Number(condValue).toFixed(2));
//        if (conType !== "") {
//            condValue = $(this).find("td").eq(8).children(".ConditionValueLineLevel").val();
//            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val((Number(condValue) * Number(exchangeRate)).toFixed(2));
//        }
//    });
//}
function calculateConditionOnCurrncyChange(exchangeRate) {
    var conType = "";
    var condName = "";
    var netPrice = "";
    var Quantity = "";
    var perQuant = "";
    var fromCurrency = "";
    var grossCondVal = "";
    var PBXX_CondVal = "";
    var insertionid = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (insertionid === itemDropdownId) {
            Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
//            netPrice = $(this).find("td").eq(12).children(".pr-net-price").val();
            netPrice = $(this).find("td").eq(0).children(".prNetPriceHidden").val();
            perQuant = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
            fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
        }
    });
    var toCurrency = $("#CurrencyDeliveryInvoice").val();

    var TaxPer = calculateTaxCodeLineLevel(toCurrency, netPrice);
    var amount = netPrice;
    var condValue = "";
    $("#conditionTableIdLineLevel tbody tr").each(function() {
//        conType = $(this).find("td").eq(1).children('.ConditionTypeLineLevel').val();
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

//        var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
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
//    deleteRowFormCondition();
}
function calculateConditionOnCurrncyChangeAtHeader(exchangeRate) {
    var amount = "";
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
    var TaxPer = 0;

    $("#material_headerClass tbody tr").each(function() {
        prQuantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
        prnetPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
        prperQuant = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
        Quantity = Number(Quantity) + Number(prQuantity);
        netPrice = Number(netPrice) + Number(prnetPrice);
        perQuant = Number(perQuant) + Number(prperQuant);
    });
    var toCurrency = $("#CurrencyDeliveryInvoice").val();
    TaxPer = calculateTaxCode(toCurrency, netPrice);
    var condValue = "";
    $("#conditionTableId tbody tr").each(function(i) {
        var totalCondVal = "";
        conType = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
        condName = $(this).find("td").eq(2).children('.nameConditionsHeader').val();
//        var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
        if (conType === "PBXX") {
            grossCondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
        }

//        if (conType === "ZNAV" || conType === "NAVS" || conType === "JEXS") {
//            TaxPer = calculateTaxCode(toCurrency, netPrice);
//        }
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
            console.log("conType : " + conType + " ,exp bittu line:" + exp + ", amount :" + amount + " ,poQty :" + poQty + " ,perQty :" + perQty + " ,grossCondVal :" + grossCondVal + " ,PBXX_CondVal :" + PBXX_CondVal + " ,condValue :" + condValue + " ,totalCondVal :" + totalCondVal);
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(condValue).toFixed(2)));
        }
        if (conType === "PBXX") {
            PBXX_CondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
        }
    });

    deleteRowFormConditionHeader();
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

function findMaxServiceLineNoOfLastExistingPOItem()
{
    console.log("In findMaxServiceLineNoOfLastExistingPOItem ==>");
    var insertionOrderId = "";
    var totalPr = $("#material_headerClass tbody tr").length;
    console.log("totalPr: " + totalPr);
    $("#material_headerClass tbody tr").each(function(index) {
        var tempInsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (index === totalPr - 1)
            insertionOrderId = insertionOrderId + tempInsertionOrderId;
        else
            insertionOrderId = insertionOrderId + tempInsertionOrderId + ",";
    });
    console.log("insertionOrderId: " + insertionOrderId);
    var maxServiceLineNo = "";
    if (insertionOrderId !== "")
    {
        $.ajax({
            type: "GET",
            url: "createAmendDeletePoGetAjaxRequest.do",
            async: false,
            data: {
                "reqFrom": "findMaxServiceLineNoByInsertionOrderId",
                "insertionOrderId": insertionOrderId
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Result in findMaxServiceLineNoByInsertionOrderId: " + obj.Result);
                if (obj.Result === "Found")
                {
                    console.log("obj.MaxServiceLineNo: " + obj.MaxServiceLineNo);
                    maxServiceLineNo = obj.MaxServiceLineNo;
                }
            }
        });
    }
    return maxServiceLineNo;
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

function getVendorByCompanycode(companyCodeHeader) {
    if (companyCodeHeader !== "")
    {
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
                var vendorCompanyCode = $("#vendorCompanyCode").val();
                var vendorSno = "";
                $("#vendorcodeHeader option").remove();
                $('.selectpicker').selectpicker('refresh');
                if (jsonVendorArr.length !== 0) {
//                    var option = "";
                    for (var i = 0; i < jsonVendorArr.length; i++) {
                        if (vendorCompanyCode === jsonVendorArr[i].vendorCode)
                        {
                            vendorSno = jsonVendorArr[i].sno;
                            $("#vendorSno").val(jsonVendorArr[i].sno);
                            $("#vendorcodeHeader").val(jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode);
                        }
//                        option += "<option value='" + jsonVendorArr[i].sno + "'>" + jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode + "</option>";
                    }
//                    $("#vendorcodeHeader").append(option);
//                    $('.selectpicker').selectpicker('refresh');
                }
                console.log("vendorCompanyCode: " + vendorCompanyCode);
                console.log("vendorSno: " + vendorSno);
            }
        });
    }
}

function saveServiceAndServiceAccAsgnOnNewPOAddition(linkidArray, lineItemNumberArr, PrItemNumberArr, accAsgnCatArr) {
    console.log("linkidArray :" + linkidArray);
    console.log("lineItemNumberArr :" + lineItemNumberArr);
    console.log("PrItemNumberArr :" + PrItemNumberArr);
    console.log("accAsgnCatArr :" + accAsgnCatArr);
    var PrType = $("prType").val();
    var PrLinkID = "";
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
//            jsonResponseWhenDataGetAfterSaveOnLoad = $.parseJSON(responseJson.responseText);
        }
    });
}

function setRfqNumberInField(VendorFinalizationTableDataArrayAsJsonArray)
{
    var rfqNumbers = "";
    var rfqIds = "";
    for (var i = 0; i < VendorFinalizationTableDataArrayAsJsonArray.length; i++) {
        if (i === VendorFinalizationTableDataArrayAsJsonArray.length - 1)
        {
            rfqNumbers = rfqNumbers + VendorFinalizationTableDataArrayAsJsonArray[i].rfqNumber;
            rfqIds = rfqIds + VendorFinalizationTableDataArrayAsJsonArray[i].rfqId;
        }
        else
        {
            rfqNumbers = rfqNumbers + VendorFinalizationTableDataArrayAsJsonArray[i].rfqNumber + ",";
            rfqIds = rfqIds + VendorFinalizationTableDataArrayAsJsonArray[i].rfqId + ",";
        }
    }
    console.log("rfqNumbers: " + rfqNumbers);
    console.log("rfqIds: " + rfqIds);
    $("#rfqNumber").val(rfqNumbers);
    $("#rfqIds").val(rfqIds);
}

function updateRfqPoDetails(VendorFinalizationTableDataArrayAsJsonString, poNumber, poLineQuantityString)
{
    console.log("VendorFinalizationTableDataArrayAsJsonString in func: " + VendorFinalizationTableDataArrayAsJsonString);
    console.log("poLineQuantityString: " + poLineQuantityString);

    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);

    var _csrf = $("input[name=_csrf]").val();
    $.ajax({
        type: "POST",
        url: "rfqEvaluationPostAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "UpdateRfqPoDetails",
            "PoNumber": poNumber,
            "VendorFinalizationTableDataArrayAsJsonString": VendorFinalizationTableDataArrayAsJsonString,
            "poLineQuantityString": poLineQuantityString,
            "companyCode": companyCode,
            "prType": prType,
            _csrf: _csrf
        },
        complete: function(responseJson) {
            var jsonObj = $.parseJSON(responseJson.responseText);
            console.log("updateRfqPoDetails: " + jsonObj.Result);
        }
    });
}

function UpdateRfqLineRemainingQtyAfterSaveDraft(VendorFinalizationTableDataArrayAsJsonString)
{
    console.log("In UpdateRfqLineRemainingQtyAfterSaveDraft===============================");
    console.log("VendorFinalizationTableDataArrayAsJsonString in func: " + VendorFinalizationTableDataArrayAsJsonString);
    var _csrf = $("input[name=_csrf]").val();
    $.ajax({
        type: "POST",
        url: "rfqEvaluationPostAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "UpdateRfqLineRemainingQtyAfterSaveDraft",
            "VendorFinalizationTableDataArrayAsJsonString": VendorFinalizationTableDataArrayAsJsonString,
            _csrf: _csrf
        },
        complete: function(responseJson) {
            var jsonObj = $.parseJSON(responseJson.responseText);
            console.log("UpdateRfqLineRemainingQtyAfterSaveDraft: " + jsonObj.Result);
        }
    });
}

function uploadRfqQuotationAndRfqEvaluationReportIntoDMS(rfqIds, pid)
{
    $.ajax({
        type: "GET",
        url: "rfqEvaluationGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "UploadRfqQuotationAndRfqEvaluationIntoDMS",
            "rfqIds": rfqIds,
            "pid": pid
        },
        complete: function(responseJson) {
            var jsonObj = $.parseJSON(responseJson.responseText);
            console.log("jsonObj.Result: " + jsonObj.Result);
            console.log("jsonObj.Message: " + jsonObj.Message);
        }
    });
}
function checkLineLevelFieldsSaveOrNot(insertionid) {
    var accAsgn = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        /*Edited by Bittu on 15/09/2020*/
//        var insertionid = $(".ItemNumberSelectClass").val();
        if (id === insertionid) {
            accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
        }
    });

    var isSaved = "";
    $(".collapseDivLineLevel").find(".active").removeClass("active");
    var savePoLineLobiboxNotifyAlert = null;
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
//        isSaved = "No";
        return false;
    } else {
        $("#material").addClass("active");
        $("#material-tab").addClass("active");
        $("#material-tab").addClass("show");
    }
    var PoFrom = $("#PoFrom").val();
//    if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
    var PrType = $("#PrType").val();
    var distribution = $("#distribution").val();
    console.log("distribution on save :" + distribution);
    if (PrType === "Material") {
        var isCorrect = lineLevelValidation(distribution, accAsgn, "pr");
//            alert("isCorrect :" + isCorrect);
        $(".collapseDivLineLevel").find(".active").removeClass("active");
        $("#invoice").removeClass("active");
        $("#invoice-tab").removeClass("active");
        $("#invoice-tab").removeClass("show");
        if (isCorrect === false) {
            $("#account_assignment").addClass("active");
            $("#account_assignment-tab").addClass("active");
            $("#account_assignment-tab").addClass("show");
        } else if (isCorrect === true) {
            $("#material").addClass("active");
            $("#material-tab").addClass("active");
            $("#material-tab").addClass("show");
        }

        if (isCorrect === false) {
//                isSaved = "No";
            return false;
        }
    } else if (PrType === "Service") {
        var taxcode = $("#TaxCode").val();
        if (taxcode !== "") {
            $(".collapseDivLineLevel").find(".active").removeClass("active");
            $("#invoice").addClass("active");
            $("#invoice-tab").addClass("active");
            $("#invoice-tab").addClass("show");

        }
    }
//    }
    return true;
}

var lobiboxNotifyAlert = null;
function validationOnCreatePoForShortcutPo()
{
    if ($("#PoFrom").val() === "shortcutPo")
    {
        if ($("#requestType").val() === "")
        {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select request type!"
            });
            $("#requestType").focus();
            return "NotValid";
        }
        if ($("#referenceDocType").val() === "")
        {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select reference doc type!"
            });
            $("#referenceDocType").focus();
            return "NotValid";
        }
        if ($("#requestType").val() === "Create Purchase Order" && $("#prType").val() === "")
        {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select pr type!"
            });
            $("#prType").focus();
            return "NotValid";
        }

        return "Valid";
    }
}
function setDistInPOHiddenField(dist) {
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            $(this).find("td").eq(0).children(".PODistribution").val(dist);
        }
    });
}
var taxCodeTable = null;
function getTaxCode(regNo, companyCode) {
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
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
var serviceCurrencyTable = null;
function getAllCurrencyService() {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllCurrency"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj lengtth :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='CurrencyDeliveryInvoiceCheckboxService'></td>"
                        + "<td>" + obj[i].CURRENCY_CODE + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#CurrencyDeliveryInvoiceModelTebleId_Service tbody").append(row);
            if ($.fn.DataTable.isDataTable('#CurrencyDeliveryInvoiceModelTebleId_Service')) {
                serviceCurrencyTable.destroy();
                serviceCurrencyTable = null;
                $("#CurrencyDeliveryInvoiceModelTebleId_Service").children('tbody').html(row);
                serviceCurrencyTable = $('table.CurrencyDeliveryInvoiceModelTebleClass_Service').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                serviceCurrencyTable.buttons().container()
                        .appendTo('#CurrencyDeliveryInvoiceModelTebleId_Service_wrapper .col-md-6:eq(0)');
            } else {
                $('#CurrencyDeliveryInvoiceModelTebleId_Service thead tr').clone(true).appendTo('#CurrencyDeliveryInvoiceModelTebleId_Service thead');
                $('#CurrencyDeliveryInvoiceModelTebleId_Service thead tr:eq(1) th').each(function(i) {
                    $('#CurrencyDeliveryInvoiceModelTebleId_Service thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (serviceCurrencyTable.column(i).search() !== this.value) {
                            serviceCurrencyTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                serviceCurrencyTable = $('table.CurrencyDeliveryInvoiceModelTebleClass_Service').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                serviceCurrencyTable.buttons().container()
                        .appendTo('#CurrencyDeliveryInvoiceModelTebleId_Service_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
var serviceNumberTable = null;
function getAllServiceMaster() {
    var materialGroup = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $(".ItemNumberSelectClass").val();
        if (insertionid === id) {
            materialGroup = $(this).find("td").eq(15).children(".materialGroupClass").val();
        }
    });
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getServiceMasterByMaterialGroup",
            "materialGroup": materialGroup
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='serviceNumberTableCheckboxClass'></td>"
                        + "<td>" + obj[i].ACTIVITY_NUMBER + "</td>"
                        + "<td>" + obj[i].CATEGORY + "</td>"
                        + "</tr>";
            }
            $("#serviceNumberTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#serviceNumberTableId')) {
                serviceNumberTable.destroy();
                serviceNumberTable = null;
                $("#serviceNumberTableId").children('tbody').html(row);
                serviceNumberTable = $('table.serviceNumberTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                serviceNumberTable.buttons().container()
                        .appendTo('#serviceNumberTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#serviceNumberTableId thead tr').clone(true).appendTo('#serviceNumberTableId thead');
                $('#serviceNumberTableId thead tr:eq(1) th').each(function(i) {
                    $('#serviceNumberTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (serviceNumberTable.column(i).search() !== this.value) {
                            serviceNumberTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                serviceNumberTable = $('table.serviceNumberTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                serviceNumberTable.buttons().container()
                        .appendTo('#serviceNumberTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
function getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId(linkid) {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data:
                {
                    "reqFrom": "getCmplxPRToPOLineItemPRAccountAssignmentValuesByPRLinkId",
                    "linkid": linkid
                },
        dataType: "json",
        complete: function(responseJson)
        {
            var jsonValuesArr = $.parseJSON(responseJson.responseText);
            console.log("JSON.stringify(jsonValuesArr)" + JSON.stringify(jsonValuesArr));
            jsonValuesArr = JSON.parse(JSON.stringify(jsonValuesArr));
            console.log("jsonValuesArr :" + jsonValuesArr);
            var flag = true;
            if (flag === true) {
                for (var i = 0; i < jsonValuesArr.length; i++) {
                    if (jsonValuesArr[i].distribution === 'Distrib. By Percentage') {
                        $("#distribution").val('Distrib. By Percentage');
                        flag = false;
                        return false;
                    }
                }
            }
            if (flag === true) {
                for (var i = 0; i < jsonValuesArr.length; i++) {
                    if (jsonValuesArr[i].distribution === 'Distrib. On Quantity Basis') {
                        $("#distribution").val('Distrib. On Quantity Basis');
                        flag = false;
                        return false;
                    }
                }
            }
            if (flag === true) {
                for (var i = 0; i < jsonValuesArr.length; i++) {
                    if (jsonValuesArr[i].distribution === 'Single Account Assignment') {
                        $("#distribution").val('Single Account Assignment');
                        flag = false;
                        return false;
                    }
                }
            }
        }
    });
}
function getMasterMaterialGeneral(matCode, plant, requirementDate, itemNumber, prQuantity) {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data:
                {
                    "reqFrom": "getMasterMaterialGeneral",
                    "matCode": matCode
                },
        dataType: "json",
        complete: function(responseJson)
        {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Servcie Tab Len: " + obj.length);
            var row = "";
            console.log("getMasterMaterialGeneral len :" + obj.length);
            console.log("matCode :" + matCode);
            console.log("Storage Location :" + obj.DESCRIPTION);
            console.log("Plant :" + plant);
            console.log("Unit :" + obj.UNIT);
            console.log("Storage Location :" + obj.STORAGE_LOCATION);
            console.log("Requirement Date :" + requirementDate);
            itemNumber = itemNumber.toString().trim();
            row = "<tr>\n\
                            <td>" + '<input type="hidden" class="changeId" value=""><input type="text" class="form-control form-rounded input-height comMaterial" value="' + matCode + '" style="width:150px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comDescription" value="' + (obj.DESCRIPTION === undefined ? "" : obj.DESCRIPTION) + '" style="width:200px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comPlant" value="' + plant + '" style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comUnit" value="' + (obj.UNIT === undefined ? "" : obj.UNIT) + '" style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comQuantity" value="' + prQuantity + '" style="width:150px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comProdStorageLoc" value="' + (obj.STORAGE_LOCATION === undefined ? "" : obj.STORAGE_LOCATION) + '" style="width:150px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comSupplyArea" value="" style="width:150px;">' + "</td>\n\
                            <td>" + '<input type="text" readonly class="form-control form-rounded input-height comRequirementDate" value="' + requirementDate + '" style="width:150px;display: inline;"> <input type="hidden" class="compReqDatepicker">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height compQtyIsFixed" value="" style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" readonly class="form-control form-rounded input-height compLatestReqDate" value="' + requirementDate + '" style="width:150px;display: inline;"> <input type="hidden" class="compLatestReqDatepicker">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height compDistKey" value="" style="width:150px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height compItemNo" value="' + itemNumber + '" readonly="true" style="width:80px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height compBatch" value="" style="width:150px;">' + "</td>\n\
                            <td>" + "</td>\n\
                            </tr>";
            $("#componentTableIdLineLevel tbody").append(row);
            refreshCompLatestReqDatepicker();
            refreshCompReqDatepicker();
        }
    });
}
function vendorBySno(sno, type) {
    $.ajax(
            {
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
                    var name = obj.NAME;
                    var code = obj.VENDORCODE;
                    console.log("Type :" + type + "--Name :" + name + "--Code :" + code);
                    var arr = [];
                    var vendorAddress = obj.VENDORADDRESS;
                    console.log(vendorAddress);
                    arr = vendorAddress.split(',');
                    for (var i = 0; i < arr.length; i++) {
                        console.log("Address: [" + i + "]" + arr[i]);
                    }
                    console.log("paymentterm:" + obj.PAYMENTTERM);
                    $('#paymentTermsDelivery [value=' + obj.PAYMENTTERM + ']').attr('selected', 'true');
                }
            });
}
var costCenterTable = null;
function getAllCostCenter() {
    var trackingNumber = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            trackingNumber = $(this).find("td").eq(19).children(".pr-tracking-number").val();
        }
    });
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllCostCenter",
            "companyCode": $("#companycodeHeader").val(),
            "trackingNumber": trackingNumber
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type=hidden value='" + obj[i].COAREA + "' class='coAreaInCostCenter'><input type='checkbox' class='costCenterCheckboxClass'></td>"
                        + "<td>" + obj[i].COST_CENTER + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#costCenterTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#costCenterTableId')) {
                costCenterTable.destroy();
                costCenterTable = null;
                $("#costCenterTableId").children('tbody').html(row);
                costCenterTable = $('table.costCenterTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                costCenterTable.buttons().container()
                        .appendTo('#costCenterTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#costCenterTableId thead tr').clone(true).appendTo('#costCenterTableId thead');
                $('#costCenterTableId thead tr:eq(1) th').each(function(i) {
                    $('#costCenterTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (costCenterTable.column(i).search() !== this.value) {
                            costCenterTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                costCenterTable = $('table.costCenterTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                costCenterTable.buttons().container()
                        .appendTo('#costCenterTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
var orderTable = null;
function getAllInterOrder() {
    console.log("In getAllInterOrder:");
    var accAsgn;
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
        }
    });
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllInterOrder",
            "accAsgn": accAsgn,
            "recordCount": $("#internalOrderRecordCount").val(),
            "internalOrderOrDescSearchText": $("#internalOrderOrDesc_SearchText").val(),
            "lastIOSno": $("#lastIOSno").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);

            var internalOrderRecordCount = $("#internalOrderRecordCount").val();
            console.log("internalOrderRecordCount: " + internalOrderRecordCount);

            if (obj.length < Number(internalOrderRecordCount))
            {
                $("#searchInternalOrderNextBtn").prop("disabled", true);
            }
            else
            {
                $("#searchInternalOrderNextBtn").prop("disabled", false);
            }

            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='accAsgnOrderCheckboxClass'></td>"
                        + "<td>" + (obj[i].internalOrder === undefined ? "" : obj[i].internalOrder) + "</td>"
                        + "<td>" + (obj[i].IODescription === undefined ? "" : obj[i].IODescription) + "</td>"
                        + "</tr>";
            }
            $("#accAsgnOrderTableId tbody").append(row);

            if ($.fn.DataTable.isDataTable('#accAsgnOrderTableId')) {
                orderTable.destroy();
                orderTable = null;
                $("#accAsgnOrderTableId").children('tbody').html(row);
                orderTable = $('table.accAsgnOrderTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                orderTable.buttons().container()
                        .appendTo('#accAsgnOrderTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#accAsgnOrderTableId thead tr').clone(true).appendTo('#accAsgnOrderTableId thead');
                $('#accAsgnOrderTableId thead tr:eq(1) th').each(function(i) {
                    $('#accAsgnOrderTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (orderTable.column(i).search() !== this.value) {
                            orderTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                orderTable = $('table.accAsgnOrderTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                orderTable.buttons().container()
                        .appendTo('#accAsgnOrderTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
var commitmentItemTable = null;
function getAllCommitmentItem() {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllCommitmentItem"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='commmentItemCheckboxClass'></td>"
                        + "<td>" + obj[i].ITEM + "</td>"
                        + "<td>" + obj[i].NAME + "</td>"
                        + "</tr>";
            }
            $("#commitmentItemTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#commitmentItemTableId')) {
                commitmentItemTable.destroy();
                commitmentItemTable = null;
                $("#commitmentItemTableId").children('tbody').html(row);
                commitmentItemTable = $('table.commitmentItemTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                commitmentItemTable.buttons().container()
                        .appendTo('#commitmentItemTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#commitmentItemTableId thead tr').clone(true).appendTo('#commitmentItemTableId thead');
                $('#commitmentItemTableId thead tr:eq(1) th').each(function(i) {
                    $('#commitmentItemTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (commitmentItemTable.column(i).search() !== this.value) {
                            commitmentItemTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                commitmentItemTable = $('table.commitmentItemTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                commitmentItemTable.buttons().container()
                        .appendTo('#commitmentItemTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
var wBSElementTable = null;
function getAllMasterWBSElement() {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllMasterWBSElement"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='wBSElementCheckboxClass'></td>"
                        + "<td>" + obj[i].CODE + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#WBSElementTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#WBSElementTableId')) {
                wBSElementTable.destroy();
                wBSElementTable = null;
                $("#WBSElementTableId").children('tbody').html(row);
                wBSElementTable = $('table.WBSElementClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                wBSElementTable.buttons().container()
                        .appendTo('#WBSElementTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#WBSElementTableId thead tr').clone(true).appendTo('#WBSElementTableId thead');
                $('#WBSElementTableId thead tr:eq(1) th').each(function(i) {
                    $('#WBSElementTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (wBSElementTable.column(i).search() !== this.value) {
                            wBSElementTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                wBSElementTable = $('table.WBSElementClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                wBSElementTable.buttons().container()
                        .appendTo('#WBSElementTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
var networkActivityTable = null;
function getAllMasterNetwork() {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllMasterNetwork",
            "companyCode": $("#companycodeHeader").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='networkActivityNumberCheckboxClass'></td>"
                        + "<td>" + obj[i].NETWORK + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#networkActivityNumberTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#networkActivityNumberTableId')) {
                networkActivityTable.destroy();
                networkActivityTable = null;
                $("#networkActivityNumberTableId").children('tbody').html(row);
                networkActivityTable = $('table.networkActivityNumberClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                networkActivityTable.buttons().container()
                        .appendTo('#networkActivityNumberTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#networkActivityNumberTableId thead tr').clone(true).appendTo('#networkActivityNumberTableId thead');
                $('#networkActivityNumberTableId thead tr:eq(1) th').each(function(i) {
                    $('#networkActivityNumberTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (networkActivityTable.column(i).search() !== this.value) {
                            networkActivityTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                networkActivityTable = $('table.networkActivityNumberClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                networkActivityTable.buttons().container()
                        .appendTo('#networkActivityNumberTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
var assetTable = null;
function getAllMasterAsset() {
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllMasterAsset",
            "companyCode": $("#companycodeHeader").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='accAsgnAssetCheckboxClass'></td>"
                        + "<td>" + obj[i].ASSET + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#accAsgnAssetTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#accAsgnAssetTableId')) {
                assetTable.destroy();
                assetTable = null;
                $("#accAsgnAssetTableId").children('tbody').html(row);
                assetTable = $('table.accAsgnAssetClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                assetTable.buttons().container()
                        .appendTo('#accAsgnAssetTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#accAsgnAssetTableId thead tr').clone(true).appendTo('#accAsgnAssetTableId thead');
                $('#accAsgnAssetTableId thead tr:eq(1) th').each(function(i) {
                    $('#accAsgnAssetTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (assetTable.column(i).search() !== this.value) {
                            assetTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                assetTable = $('table.accAsgnAssetClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                assetTable.buttons().container()
                        .appendTo('#accAsgnAssetTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
function getByPricingProcedure(pricingprocedure) {

    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllByPricingProcedure",
            "pricingprocedure": pricingprocedure
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            for (var i = 0; i < obj.length; i++) {
                console.log("CTYPE :" + obj[i].CTYPE);
                console.log("CNAME :" + obj[i].NAME);
            }
            console.log("Obj length :" + obj.length);
            var row = "";
//            $("#conditionTableId tbody tr").remove();
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor'><input type='hidden' class='lineAddedFromHeader' value='headerlevel'><input type='hidden' class='conditionindex' value=''></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + obj[i].NAME + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' style='width:150px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value=" + obj[i].CRCY + "></td>"
                        + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width:150px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader'></td>"
                        + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width:150px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + obj[i].CURRENCY2 + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true'></td>"
                        + "<td><input type='text' class='form-control form-rounded conditionDetailsHeader tableInputField' name='conditionDetailsHeader'></td>"
                        + "<td></td>"
                        + "</tr>";
            }

            $("#conditionTableIdLineLevel tbody").append(row);
            $("#conditionTableIdLineLevel tbody tr").each(function(i) {
                var amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
                var per = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityHeader").val());
                var condVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
                console.log("Amount :" + amount + "Per :" + per + "condVal :" + condVal);
                if (amount !== "") {
                    $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(amountArr[i]) + parseInt(amount)));
                } else {
                    $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(parseInt(amountArr[i])));
                }
                if (per !== "") {
                    $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(perArr[i]) + parseInt(per)));
                } else {
                    $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(parseInt(perArr[i])));
                }
                if (condVal !== "") {
                    $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(canValArr[i]) + parseInt(condVal)));
                } else {
                    $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(parseInt(canValArr[i])));
                }
            });
        }
    });
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "getConditionValuesFormulas"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            for (var i = 0; i < obj.length; i++) {
                console.log("ALIAS :" + obj[i].ALIAS);
                console.log("RULES :" + obj[i].RULES);
                console.log("NAME :" + obj[i].NAME);
                window['socket_' + obj[i].ALIAS] = obj[i].RULES;
            }
        }
    });
}

function updatePoLineDelvDateCatFromDelvSchTab(delvDatCat)
{
    console.log("delvDatCat: " + delvDatCat);
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val(delvDatCat);
            $(this).find("td").eq(10).children(".prDeliveryDateCat").val(delvDatCat);
            return;
        }
    });
}

function refreshDelvSchDatepicker()
{
    console.log("refreshDelvSchDatepicker called ==========>");
    $('.deliveryScheduleDatepicker').each(function() {
        if ($("#PrType").val() === "Material") {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                minDate: 0,
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        } else if ($("#PrType").val() === "Service") {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        }
    });
}

function refreshDelvSchStatisticalDatepicker()
{
    console.log("refreshDelvSchStatisticalDatepicker called ==========>");
    $('.statisticalDeliveryScheduleDatepicker').each(function() {
        if ($("#PrType").val() === "Material") {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                minDate: 0,
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        } else if ($("#PrType").val() === "Service") {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        }
    });
}

function refreshPrDelvDatepicker()
{
    console.log("refreshPrDelvDatepicker called ==========>");
    $('.prDeliveryDatepicker').each(function() {
        if ($("#PrType").val() === "Material") {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                minDate: 0,
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        } else if ($("#PrType").val() === "Service") {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        }
    });
}

function refreshCompLatestReqDatepicker()
{
    console.log("refreshCompLatestReqDatepicker called ==========>");
    $('.compLatestReqDatepicker').each(function() {
        $(this).datepicker({
            showOn: "button",
            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
            minDate: 0,
            changeMonth: true,
            changeYear: true,
            yearRange: '2020:2050',
            showWeek: true,
            beforeShow: function(textbox, instance) {
                setTimeout(function() {
                    instance.dpDiv.css({
                        "position": "absolute"
                    });
                }, 0);
            }
        });
    });
}
function refreshCompReqDatepicker()
{
    console.log("refreshCompReqDatepicker called ==========>");
    $('.compReqDatepicker').each(function() {
        $(this).datepicker({
            showOn: "button",
            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
            minDate: 0,
            changeMonth: true,
            changeYear: true,
            yearRange: '2020:2050',
            showWeek: true,
            beforeShow: function(textbox, instance) {
                setTimeout(function() {
                    instance.dpDiv.css({
                        "position": "absolute"
                    });
                }, 0);
            }
        });
    });
}


function getConditionsByLinkId(jsonCondArr) {
    var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
    var conType;
    var conName;
    var changeid;
    $("#conditionTableId tbody tr").remove();
    var length = $("#conditionTableId tbody tr").length;
    if (length === 0) {
        if (jsonCondArr[0].addedFrom !== "headerlevel") {
            if (jsonCondArr[0].conditionType === "FRA1") {
                console.log("jsonCondArr[0].vendorCode :" + jsonCondArr[0].vendorCode + " ,jsonCondArr[0].conditionType :" + jsonCondArr[0].conditionType);
            }
            var tdrow = "<tr>"
                    + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                    <input type='hidden' class='conditionVendorHeader' value='" + (jsonCondArr[0].vendorCode === undefined ? "" : jsonCondArr[0].vendorCode) + "'>\n\
                    <input type='hidden' class='lineAddedFromHeader' value='" + (jsonCondArr[0].addedFrom === undefined ? "" : jsonCondArr[0].addedFrom) + "'>\n\
                    <input type='hidden' class='conditionindex'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (jsonCondArr[0].conditionType === undefined ? "" : jsonCondArr[0].conditionType) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' style='width:200px;' value='" + (jsonCondArr[0].name === undefined ? "" : jsonCondArr[0].name) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' style='width:150px;' disabled value = '" + (jsonCondArr[0].amount === undefined ? "" : formatAmountByComma(Number(jsonCondArr[0].amount).toFixed(2))) + "'>\n\
                    <input type='hidden' class='newAmountHeaderHidden' value = '" + (jsonCondArr[0].amount === undefined ? "" : Number(jsonCondArr[0].amount).toFixed(2)) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' style='width:100px;' value='" + (jsonCondArr[0].currency1 === undefined ? "" : jsonCondArr[0].currency1) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width:150px;' disabled value='" + (jsonCondArr[0].per === undefined ? "" : formatAmountByComma(Number(jsonCondArr[0].per).toFixed(2))) + "'>\n\
                    <input type='hidden' class='newPerQuantityHeaderHidden' value='" + (jsonCondArr[0].per === undefined ? "" : Number(jsonCondArr[0].per).toFixed(2)) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + (jsonCondArr[0].conditionPricingUnit === undefined ? "" : jsonCondArr[0].conditionPricingUnit) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' style='width:100px;' value='" + (jsonCondArr[0].uom === undefined ? "" : jsonCondArr[0].uom) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' disabled value='" + (jsonCondArr[0].conditionValue1 === undefined ? "" : formatAmountByComma(Number(jsonCondArr[0].conditionValue1).toFixed(2))) + "'>\n\
                        <input type='hidden' class='ConditionValueHeaderHidden'></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' style='width:100px;' value='" + (jsonCondArr[0].currency2 === undefined ? "" : jsonCondArr[0].currency2) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (jsonCondArr[0].conditionValue2 === undefined ? "" : jsonCondArr[0].conditionValue2) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (jsonCondArr[0].conditionCurrency === undefined ? '' : jsonCondArr[0].conditionCurrency) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (jsonCondArr[0].kappl === undefined ? "" : jsonCondArr[0].kappl) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (jsonCondArr[0].kvsl1 === undefined ? "" : jsonCondArr[0].kvsl1) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (jsonCondArr[0].kvsl2 === undefined ? "" : jsonCondArr[0].kvsl2) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (jsonCondArr[0].conditionCount === undefined ? "" : jsonCondArr[0].conditionCount) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (jsonCondArr[0].stNumber === undefined ? "" : jsonCondArr[0].stNumber) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (jsonCondArr[0].changeId === undefined ? "" : jsonCondArr[0].changeId) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (jsonCondArr[0].vendorName === undefined ? "" : jsonCondArr[0].vendorName) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (jsonCondArr[0].vendorCode === undefined ? "" : jsonCondArr[0].vendorCode) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (jsonCondArr[0].condPriceDate === undefined ? "" : jsonCondArr[0].condPriceDate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (jsonCondArr[0].condCurncyExchangeRate === undefined ? "" : jsonCondArr[0].condCurncyExchangeRate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (jsonCondArr[0].poCurrencyExchangeRate === undefined ? "" : jsonCondArr[0].poCurrencyExchangeRate) + "'></td>"
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
                if (((jsonCondArr[i].conditionType === "") ? (jsonCondArr[i].name === conName) && (changeid === jsonCondArr[i].changeId) : (jsonCondArr[i].conditionType === conType)) && (changeid === jsonCondArr[i].changeId)) {
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
                    console.log("Total Amount :" + Number(Number(jsonCondArr[i].per) + Number(per)).toFixed(2));
                    console.log("Total Per :" + Number(Number(jsonCondArr[i].per) + Number(per)).toFixed(2));
                    console.log("Total Condition Value :" + Number(Number(jsonCondArr[i].conditionValue1) + Number(condVal)).toFixed(2));

                    if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                        $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].amount) + Number(amount)).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                        $(rows[j]).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].amount) + Number(amount)).toFixed(2)));
                    }
                    if ($(rows[j]).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                        $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].per) + Number(per)).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                        $(rows[j]).find("td").eq(5).children(".newPerQuantityHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].per) + Number(per)).toFixed(2)));
                    }
                    $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].conditionValue1) + Number(condVal)).toFixed(2)));
                    flag = true;
                    break;
                } else {
                    flag = false;
                }
            }
            if (flag === false) {
                var tdrow = "<tr>"
                        + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                            <input type='hidden' class='conditionVendorHeader' value='" + (jsonCondArr[i].vendorCode === undefined ? "" : jsonCondArr[i].vendorCode) + "'>\n\
                            <input type='hidden' class='lineAddedFromHeader' value='" + (jsonCondArr[i].addedFrom === undefined ? "" : jsonCondArr[i].addedFrom) + "'>\n\
                            <input type='hidden' class='conditionindex'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (jsonCondArr[i].conditionType === undefined ? "" : jsonCondArr[i].conditionType) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (jsonCondArr[i].name === undefined ? "" : jsonCondArr[i].name) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' style='width: 150px;' disabled value = '" + (jsonCondArr[i].amount === undefined ? "" : formatAmountByComma(Number(jsonCondArr[i].amount).toFixed(2))) + "'>\n\
                        <input type='hidden' class='newAmountHeaderHidden' value = '" + (jsonCondArr[i].amount === undefined ? "" : Number(jsonCondArr[i].amount).toFixed(2)) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (jsonCondArr[i].currency1 === undefined ? "" : jsonCondArr[i].currency1) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width: 150px;' disabled value='" + (jsonCondArr[i].per === undefined ? "" : formatAmountByComma(Number(jsonCondArr[i].per).toFixed(2))) + "'>\n\
                        <input type='hidden' class='newPerQuantityHeaderHidden' value='" + (jsonCondArr[i].per === undefined ? "" : Number(jsonCondArr[i].per).toFixed(2)) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + (jsonCondArr[i].conditionPricingUnit === undefined ? "" : jsonCondArr[i].conditionPricingUnit) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (jsonCondArr[i].uom === undefined ? "" : jsonCondArr[i].uom) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' disabled value='" + (jsonCondArr[i].conditionValue1 === undefined ? "" : formatAmountByComma(Number(jsonCondArr[i].conditionValue1).toFixed(2))) + "'>\n\
                            <input type='hidden' class='ConditionValueHeaderHidden'></td>"
                        + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (jsonCondArr[i].currency2 === undefined ? "" : jsonCondArr[i].currency2) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (jsonCondArr[i].conditionValue2 === undefined ? "" : jsonCondArr[i].conditionValue2) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (jsonCondArr[i].conditionCurrency === undefined ? '' : jsonCondArr[i].conditionCurrency) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (jsonCondArr[i].kappl === undefined ? "" : jsonCondArr[i].kappl) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (jsonCondArr[i].kvsl1 === undefined ? "" : jsonCondArr[i].kvsl1) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (jsonCondArr[i].kvsl2 === undefined ? "" : jsonCondArr[i].kvsl2) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (jsonCondArr[i].conditionCount === undefined ? "" : jsonCondArr[i].conditionCount) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (jsonCondArr[i].stNumber === undefined ? "" : jsonCondArr[i].stNumber) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (jsonCondArr[i].changeId === undefined ? "" : jsonCondArr[i].changeId) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (jsonCondArr[i].vendorName === undefined ? "" : jsonCondArr[i].vendorName) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (jsonCondArr[i].vendorCode === undefined ? "" : jsonCondArr[i].vendorCode) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (jsonCondArr[i].condPriceDate === undefined ? "" : jsonCondArr[i].condPriceDate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (jsonCondArr[i].condCurncyExchangeRate === undefined ? "" : jsonCondArr[i].condCurncyExchangeRate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (jsonCondArr[i].poCurrencyExchangeRate === undefined ? "" : jsonCondArr[i].poCurrencyExchangeRate) + "'></td>"
                        + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;display:none'></i></td>"
                        + "</tr>";
                $("#conditionTableId tbody").append(tdrow);
            }
        }
    }


    if (conditionLineLevelArray.length !== 0) {
        var fflag = false;
        var amount = "";
        var per = "";

        for (var i = 0; i < conditionLineLevelArray.length; i++) {
            var rows = $("#conditionTableId tbody tr");
            for (var j = 0; j < rows.length; j++) {
                conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
                conName = $(rows[j]).find("td").eq(2).children(".nameConditionsHeader").val();
                changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
                var itemindex = $(rows[j]).find("td").eq(0).children(".conditionindex").val();
                console.log("Ctype ####:" + conditionLineLevelArray[i].Ctype + " ,conType :" + conType + " ,Cname :" + conditionLineLevelArray[i].Cname +
                        " ,conName :" + conName + " ,changeid :" + changeid + " ,CHANGEID :" + conditionLineLevelArray[i].CHANGEID);
//                if (((conditionLineLevelArray[i].Ctype === "") ? (conditionLineLevelArray[i].Cname === conName) && (changeid === 'I') && (itemindex === conditionLineLevelArray[i].indexnumber) : (conditionLineLevelArray[i].Ctype === conType)) && (changeid === 'I') && (itemindex === conditionLineLevelArray[i].indexnumber)) {
                if ((conditionLineLevelArray[i].Ctype === conType) && (changeid === 'I') && (itemindex === conditionLineLevelArray[i].indexnumber)) {
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
                    console.log("Total Amount :" + Number(Number(conditionLineLevelArray[i].per) + Number(per)).toFixed(2));
                    console.log("Total Per :" + Number(Number(conditionLineLevelArray[i].per) + Number(per)).toFixed(2));
                    console.log("Total Condition Value :" + Number(Number(conditionLineLevelArray[i].conditionValue) + Number(condVal)).toFixed(2));

                    if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                        $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArray[i].amount) + Number(amount)).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                        $(rows[j]).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArray[i].amount) + Number(amount)).toFixed(2)));
                    }
                    if ($(rows[j]).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                        $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArray[i].per) + Number(per)).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                        $(rows[j]).find("td").eq(5).children(".newPerQuantityHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArray[i].per) + Number(per)).toFixed(2)));
                    }
                    $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(Number(conditionLineLevelArray[i].conditionValue) + Number(condVal)).toFixed(2)));
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
                        <input type='hidden' class='conditionVendorHeader' value='" + (conditionLineLevelArray[i].vendorcode === undefined ? "" : conditionLineLevelArray[i].vendorcode) + "'>\n\
                        <input type='hidden' class='lineAddedFromHeader' value='" + (conditionLineLevelArray[i].addedFrom === undefined ? "" : conditionLineLevelArray[i].addedFrom) + "'>\n\
                        <input type='hidden' class='conditionindex' value='" + conditionLineLevelArray[i].indexnumber + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (conditionLineLevelArray[i].Ctype === undefined ? "" : conditionLineLevelArray[i].Ctype) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (conditionLineLevelArray[i].Cname === undefined ? "" : conditionLineLevelArray[i].Cname) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' style='width: 150px;' disabled value = '" + (conditionLineLevelArray[i].amount === undefined ? "" : formatAmountByComma(Number(conditionLineLevelArray[i].amount).toFixed(2))) + "'>\n\
                        <input type='hidden' class='newAmountHeaderHidden' value = '" + (conditionLineLevelArray[i].amount === undefined ? "" : Number(conditionLineLevelArray[i].amount).toFixed(2)) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (conditionLineLevelArray[i].prCurrency === undefined ? "" : conditionLineLevelArray[i].prCurrency) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width: 150px;' disabled value='" + (conditionLineLevelArray[i].per === undefined ? "" : formatAmountByComma(Number(conditionLineLevelArray[i].per).toFixed(2))) + "'>\n\
                        <input type='hidden' class='newPerQuantityHeaderHidden' value='" + (conditionLineLevelArray[i].per === undefined ? "" : Number(conditionLineLevelArray[i].per).toFixed(2)) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + (conditionLineLevelArray[i].ConditionPricingUnit === undefined ? "" : conditionLineLevelArray[i].ConditionPricingUnit) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (conditionLineLevelArray[i].UoM === undefined ? "" : conditionLineLevelArray[i].UoM) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' disabled value='" + (conditionLineLevelArray[i].conditionValue === undefined ? "" : formatAmountByComma(Number(conditionLineLevelArray[i].conditionValue).toFixed(2))) + "'>\n\
                            <input type='hidden' class='ConditionValueHeaderHidden' value='" + conditionLineLevelArray[i].oldConditionValue + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (conditionLineLevelArray[i].Currency2 === undefined ? "" : conditionLineLevelArray[i].Currency2) + "' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (conditionLineLevelArray[i].ConditionValue2 === undefined ? "" : conditionLineLevelArray[i].ConditionValue2) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (conditionLineLevelArray[i].Conditioncurrency === undefined ? '' : conditionLineLevelArray[i].Conditioncurrency) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (conditionLineLevelArray[i].conditionKAPPL === undefined ? "" : conditionLineLevelArray[i].conditionKAPPL) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (conditionLineLevelArray[i].conditionKVSL1 === undefined ? "" : conditionLineLevelArray[i].conditionKVSL1) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (conditionLineLevelArray[i].conditionKVSL2 === undefined ? "" : conditionLineLevelArray[i].conditionKVSL2) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (conditionLineLevelArray[i].conditionZAEHK === undefined ? "" : conditionLineLevelArray[i].conditionZAEHK) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (conditionLineLevelArray[i].conditionSTUNR === undefined ? "" : conditionLineLevelArray[i].conditionSTUNR) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (conditionLineLevelArray[i].CHANGEID === undefined ? "" : conditionLineLevelArray[i].CHANGEID) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (conditionLineLevelArray[i].vendorname === undefined ? "" : conditionLineLevelArray[i].vendorname) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (conditionLineLevelArray[i].vendorcode === undefined ? "" : conditionLineLevelArray[i].vendorcode) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value=''></td>"
                        + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;display:none'></i></td>"
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
        console.log("conditionLineLevelArray after load :" + JSON.stringify(conditionLineLevelArray));
    }

    var totalNetPrice = 0;
    var toalPerQuant = 0;
    var condValue = "";
    var totalConditionValue = 0;
    var count = 0;
    var linkid = "";
    var InsertionOrderId = "";
    $("#material_headerClass tbody tr").each(function() {
        var conType = "";
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $(".ItemNumberSelectClass").val();
        var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
        if (isPrSaved === "No") {
            var Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            var netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            var perQuant = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
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
//                    $(this).find("td").eq(3).children(".AmountHeader").val(Number(ttlAmount).toFixed(2));
                    if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                        $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(ttlAmount).toFixed(2)));
                    } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                        $(this).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma(Number(ttlAmount).toFixed(2)));
                    }
                    deleteRowFormConditionHeader();
                }
            });
        }

//        clearPerColumnatHeader();
        if (id === insertionid) {
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            InsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        }

    });
    var totalPO = $("#material_headerClass tbody tr").length;
    var rows = $("#conditionTableId tbody tr");
    for (var i = 0; i < conditionLineLevelArray.length; i++) {
        for (var j = 0; j < rows.length; j++) {
            var amount = "";
            if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountHeader").val());
            } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".newAmountHeader").val());
            }
            var per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val());
            var conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
            var changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
            var conitemindex = $(rows[j]).find("td").eq(0).children(".conditionindex").val();
            if (conType === conditionLineLevelArray[i].Ctype && changeid === conditionLineLevelArray[i].CHANGEID && InsertionOrderId === conditionLineLevelArray[i].itemCode && (conitemindex === conditionLineLevelArray[i].indexnumber)) {
                amount = Number(amount) / Number(totalPO);
                if (per !== "") {
                    per = Number(per) / Number(totalPO);
                }
                if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                    $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(amount).toFixed(2)));
                } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                    $(rows[j]).find("td").eq(3).children(".newAmountHeader").val(formatAmountByComma(Number(amount).toFixed(2)));
                }
                $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(per).toFixed(2)));
            }
        }
    }
    clearPerColumnatHeaderAfterSave();
//clearPerColumnatHeader();
}
function clearPerColumnatHeaderAfterSave() {
    $("#conditionTableId tbody tr").prop("disabled", true);
    $("#conditionTableId tbody tr").each(function() {
        var addredFrom = $(this).find("td").eq(0).children(".lineAddedFromHeader").val();
        if (addredFrom === "headerlevel") {
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
            $(this).find("td").eq(1).children(".ConditionTypeHeader").prop("disabled", false);
            $(this).find("td").eq(12).children(".deleteConditionTebleRow").css('display', 'block');
        } else {
            $(this).find("td").eq(5).children(".PerQuantityHeader").val("");
        }
    });
}

function clearPerColumnatHeader() {
    var flag = false;
    if (conditionLineLevelArray.length === 0) {
        $("#conditionTableId tbody tr").each(function() {
            $(this).find("td").eq(5).children(".PerQuantityHeader").val("");
        });
    } else {
        for (var i = 0; i < conditionLineLevelArray.length; i++) {
            console.log("Find BITTU conditionLineLevelArray[" + i + "]" + conditionLineLevelArray[i].Ctype);
            var rows = $("#conditionTableId tbody tr");
            for (var j = 0; j < rows.length; j++) {
                var conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
                var changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
                if (conType === conditionLineLevelArray[i].Ctype && changeid === conditionLineLevelArray[i].CHANGEID) {
                    console.log("conType if IF [" + j + "]:" + conType + " ,Ctype [" + i + "]:" + conditionLineLevelArray[i].Ctype + " ,changeid [" + j + "]:" + changeid + " ,CHANGEID [" + i + "]:" + conditionLineLevelArray[i].CHANGEID);
                    $(rows[j]).find("td").eq(12).children(".deleteConditionTebleRow").css("display", "block");
                    $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").prop("disabled", false);
                    var fml = formula(conditionLineLevelArray[i].Ctype);
                    var exp = new String(fml);
                    var expAfterSplit = exp.split("/");
                    if (expAfterSplit[0] === "(amount*poQty)") {
                        if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                            $(rows[j]).find("td").eq(3).children(".AmountHeader").prop("disabled", false);
                        } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                            $(rows[j]).find("td").eq(3).children(".newAmountHeader").prop("disabled", false);
                        }
                        if ($(rows[j]).find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                            $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").prop("disabled", false);
                        } else if ($(rows[j]).find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                            $(rows[j]).find("td").eq(5).children(".newPerQuantityHeader").prop("disabled", false);
                        }
                    } else {
                        if ($(rows[j]).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                            $(rows[j]).find("td").eq(3).children(".AmountHeader").prop("disabled", false);
                        } else if ($(rows[j]).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                            $(rows[j]).find("td").eq(3).children(".newAmountHeader").prop("disabled", false);
                        }
                    }
//                    flag = true;
//                    break;
                } else {
                    console.log("conType if ELSE [" + j + "]:" + conType + " ,Ctype [" + i + "]:" + conditionLineLevelArray[i].Ctype + " ,changeid [" + j + "]:" + changeid + " ,CHANGEID [" + i + "]:" + conditionLineLevelArray[i].CHANGEID);
//                    $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val("");
//                    flag = false;
                    $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val("");
                }
            }
//            if (flag === false) {
//                $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val("");
//            }
        }

    }
}

function validateClonedPoLineQuantity()
{
    console.log("validateClonedPoLineQuantity: ");
    var parentPrLineInsertionOrderIdMap = {};
    $("#material_headerClass tbody tr").each(function() {
        var parentPrLineInsertionOrderId = $(this).find("td").eq(0).children(".parentPrLineInsertionOrderId").val();
        var totalQuantityOfThisLine = $(this).find("td").eq(0).children(".totalQuantityOfThisLine").val();

        console.log("parentPrLineInsertionOrderId: " + parentPrLineInsertionOrderId);
        console.log("totalQuantityOfThisLine: " + totalQuantityOfThisLine);

        if (parentPrLineInsertionOrderId !== undefined && parentPrLineInsertionOrderId !== "")
        {
            parentPrLineInsertionOrderIdMap[parentPrLineInsertionOrderId] = totalQuantityOfThisLine;
        }
    });
    console.log("parentPrLineInsertionOrderIdMap: " + parentPrLineInsertionOrderIdMap);
    console.log("parentPrLineInsertionOrderIdMap as string: " + JSON.stringify(parentPrLineInsertionOrderIdMap));

    var invalidPoLineInsertionOrderIdArr = [];
    for (var key in parentPrLineInsertionOrderIdMap)
    {
        var quantity = parentPrLineInsertionOrderIdMap[key];
        console.log("quantity: " + quantity);
        var totalQuantity = 0;
        $("#material_headerClass tbody tr").each(function() {
            var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var prQuantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            var parentPrLineInsertionOrderId = $(this).find("td").eq(0).children(".parentPrLineInsertionOrderId").val();

            if (key === parentPrLineInsertionOrderId || key === insertionOrderId)
            {
                console.log("Key equal:");
                totalQuantity += Number(prQuantity);
            }
        });
        console.log("totalQuantity: " + totalQuantity);
        if (Number(totalQuantity) > Number(quantity))
        {
            invalidPoLineInsertionOrderIdArr.push(key);
        }
    }
    console.log("invalidPoLineInsertionOrderIdArr: " + invalidPoLineInsertionOrderIdArr);
    var isValid = true;
    for (var i = 0; i < invalidPoLineInsertionOrderIdArr.length; i++)
    {
        $("#material_headerClass tbody tr").each(function() {
            var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var parentPrLineInsertionOrderId = $(this).find("td").eq(0).children(".parentPrLineInsertionOrderId").val();

            if (invalidPoLineInsertionOrderIdArr[i] === parentPrLineInsertionOrderId || invalidPoLineInsertionOrderIdArr[i] === insertionOrderId)
            {
                isValid = false;
                console.log("insertionOrderId equal:");
                $(this).find("td").eq(6).children(".pr-quantity").focus();
                $(this).find("td").eq(6).children(".pr-quantity").css("border-color", "red");
            }
        });
    }
    if (isValid === true)
    {
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("td").eq(6).children(".pr-quantity").css("border-color", "");
        });
    }
    return isValid;

}

function saveQuantityWeightForMultiplePr(QuantityWeightDataAsJsonArrayString)
{
//    alert(QuantityWeightDataAsJsonArrayString);
    var _csrf = $("input[name=_csrf]").val();
    $.ajax({
        type: "POST",
        url: "saveQuantityWeightForMultiplePr.do",
        async: false,
        data: {
            "reqFrom": "saveQuantityWeightForMultiplePr",
            "QuantityWeightDataAsJsonArrayString": QuantityWeightDataAsJsonArrayString,
            _csrf: _csrf
        },
        success: function(response) {
            console.log("QW Response :: " + response);
            if (response !== '') {
                console.log("QW Data saved successfully ");
//                Lobibox.alert("success", {
//                    msg: "QW Data saved successfully "
//                });
            } else {
                console.log("QW Data not saved!");
//                Lobibox.alert("error", {
//                    msg: "QW Data not saved!"
//                });
            }
        }
    });
}

/*UOM population on RFQ Addition code by Bittu Starts*/
function uOMPopulation(currentRow, infoRecordJsonObj) {
    var jsonArr = "";
    var CompanyCode = currentRow.find("td").eq(0).children(".PRCompanyCode_Class").val();
    var matCode = currentRow.find("td").eq(4).children(".materialCodeClass").val();
    if (matCode !== "") {
        jsonArr = getMaterialMasterOnLoad(matCode, CompanyCode);
        console.log("getMaterialMasterOnLoad jsonArr.length: " + jsonArr.length);
        if (jsonArr.length !== 0) {
            if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                currentRow.find("td").eq(7).children(".prUom").val(jsonArr[0].orderUnit);
                currentRow.find("td").eq(8).children(".prOrderPriceUnit").val(jsonArr[0].orderUnit);
                var convFrom = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArr[0].conversionFrom : infoRecordJsonObj.CONV_NUM1;
                var convTo = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArr[0].conversionTo : infoRecordJsonObj.CONV_DEN1;
                var prQty = removeCommaInNumber(currentRow.find("td").eq(6).children(".pr-quantity").val());
                if (jsonArr[0].orderUnit !== jsonArr[0].baseUOM) {
                    var ratioQuant = Number(convTo) / Number(convFrom) * Number(prQty);
                    currentRow.find("td").eq(6).children(".pr-quantity").val(formatNumberByComma(ratioQuant));
                    currentRow.find("td").eq(0).children(".totalQuantityOfThisLine").val(Number(ratioQuant).toFixed(3));
                }
            } else {
                currentRow.find("td").eq(7).children(".prUom").val(jsonArr[0].baseUOM);
                currentRow.find("td").eq(8).children(".prOrderPriceUnit").val(jsonArr[0].baseUOM);
            }
            populateAccAsgn(jsonArr, currentRow);
            populateQtyWeights(jsonArr, currentRow, infoRecordJsonObj);
            populateDeliverySchedule(jsonArr, currentRow);
        }
    }
    return jsonArr;
}
function getMaterialMasterOnLoad(matCode, CompCode) {
    console.log("In getMaterialMasterOnLoad");
    console.log("matCode: " + matCode);
    console.log("CompCode: " + CompCode);
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
            console.log("jsonMaterialArr len1: " + jsonArr.length);
        }
    });
    return jsonArr;
}
function populateAccAsgn(jsonArr, currentRow) {
    var convFrom = jsonArr[0].conversionFrom;
    var convTo = jsonArr[0].conversionTo;
    if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
//        $("#material_headerClass tbody tr").each(function() {
        var insertionid = $("#ItemNumberSelect").val();
        var id = currentRow.find("td").eq(0).children(".insertionOrderId_Class").val();
        if (id === insertionid) {
            var distribution = $("#distribution").val();
            if (distribution !== "Distrib. On Quantity Basis" || distribution !== "Distrib. By Percentage") {
                $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                    var accAsgnQuantity = removeCommaInNumber($(this).find("td").eq(1).children(".accAsgnQuantity").val());
                    var quantity = Number(convTo) / Number(convFrom) * Number(accAsgnQuantity);
                    $(this).find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(quantity).toFixed(3)));
                    $(this).find("td").eq(1).children(".accAsgnQuantity").attr({
                        "max": Number(quantity).toFixed(2),
                        "value": formatNumberByComma(Number(quantity).toFixed(2))
                    });
                });
            }
        }
//        });
    }
}

function populateQtyWeights(jsonArr, currentRow, infoRecordJsonObj) {
    console.log("In populateQtyWeights");
    var convFrom = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArr[0].conversionFrom : infoRecordJsonObj.CONV_NUM1;
    var convTo = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArr[0].conversionTo : infoRecordJsonObj.CONV_DEN1;
    var PoFrom = $("#PoFrom").val();
    var orderunit = "";
    var baseUom = "";
    var insertionid = $("#ItemNumberSelect").val();
    var id = currentRow.find("td").eq(0).children(".insertionOrderId_Class").val();
    console.log("insertionid: " + insertionid);
    console.log("id: " + id);
    if (id === insertionid) {
        var qtyBeforeConversion = currentRow.find("td").eq(0).children(".quantityBeforeChange").val();
        var prQty = removeCommaInNumber(currentRow.find("td").eq(6).children(".pr-quantity").val()); // Added by nikhil on 29102020
        var perPrice = removeCommaInNumber(currentRow.find("td").eq(14).children(".priceUnitClass").val());
        var lineType = currentRow.find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
        orderunit = jsonArr[0].orderUnit;
        baseUom = jsonArr[0].baseUOM;
        if (lineType === "EmptyLine") {
            if (infoRecordJsonObj.BASE_UOM !== "" && infoRecordJsonObj.BASE_UOM !== undefined) {
                baseUom = infoRecordJsonObj.BASE_UOM;
            }
        }
        if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
            $("#pOQuantity").val(formatNumberByComma(prQty));
            $("#pOUnit").val(jsonArr[0].orderUnit);
            $("#pOQuantitySKU").val(formatNumberByComma(qtyBeforeConversion));
        } else {
            orderunit = baseUom;
            $("#pOQuantity").val(formatNumberByComma(prQty));
            $("#pOUnit").val(orderunit);
            $("#pOQuantitySKU").val(formatNumberByComma(prQty));
        }

        $("#pOUnitSKU").val(baseUom);
        $("#unitOrderUnit").val(orderunit);
        if (infoRecordJsonObj.ORDERPR_UN !== "" && infoRecordJsonObj.ORDERPR_UN !== undefined) {
            $("#unitOrderPriceUnit").val(infoRecordJsonObj.ORDERPR_UN);
        } else {
            $("#unitOrderPriceUnit").val(orderunit);
        }
        $("#unitOrderUnit2").val(orderunit);
        $("#orderUnit2").val(convTo !== "" ? formatAmountByComma(convTo) : "");
        $("#sKUUnit").val(convFrom !== "" ? formatAmountByComma(convFrom) : "");
        $("#unitSKUUnit").val(baseUom);

        if (PoFrom !== "createpo" && PoFrom !== "byrfq") {
            $("#netWeight").val(convFrom !== "" ? formatAmountByComma(convFrom) : "");
            $("#grossWeight").val(convFrom !== "" ? formatAmountByComma(convFrom) : "");
            $("#volume").val("");
            $("#points").val("");
            $("#netWeightUnit").val(baseUom);
            $("#grossWeightUnit").val(baseUom);
            $("#volumeUnit").val("");
            $("#pointsUnit").val("");
            $("#netWeightOrderUnit").val(orderunit);
            $("#grossWeightOrderUnit").val(orderunit);
            $("#volumeOrderUnit").val(orderunit);
            $("#pointsOrderUnit").val(orderunit);
            $("#netWeightPerPrice").val(perPrice);
            $("#grossWeightPerPrice").val(perPrice);
            $("#volumePerPrice").val(perPrice);
            $("#pointsPerPrice").val(perPrice);
            $("#netWeight2").val(formatNumberByComma(qtyBeforeConversion));
            $("#grossWeight2").val(formatNumberByComma(qtyBeforeConversion));
            $("#volume2").val("0.00");
            $("#points2").val("0.00");
            $("#netWeightUnit2").val(baseUom);
            $("#grossWeightUnit2").val(baseUom);
            $("#volumeUnit2").val("");
            $("#pointsUnit2").val("");
        }
    }
}
function populateDeliverySchedule(jsonArr, currentRow) {
    var convFrom = jsonArr[0].conversionFrom;
    var convTo = jsonArr[0].conversionTo;
    if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
//        $("#material_headerClass tbody tr").each(function() {
        var insertionid = $("#ItemNumberSelect").val();
        var id = currentRow.find("td").eq(0).children(".insertionOrderId_Class").val();
        if (id === insertionid) {
//                var prQty = currentRow.find("td").eq(0).children(".quantityBeforeChange").val(); // Commented by nikhil on 29102020                
//                $("#DeliveryScheduleTableId tbody tr").find("td").eq(3).children(".scheduledQuantityClass").val(Number(Number(convTo) / Number(convFrom) * Number(prQty)).toFixed(3)); // Commented by nikhil on 29102020                
            var prQty = removeCommaInNumber(currentRow.find("td").eq(6).children(".pr-quantity").val()); // Added by nikhil on 29102020
            $("#DeliveryScheduleTableId tbody tr").find("td").eq(3).children(".scheduledQuantityClass").val(formatNumberByComma(prQty)); // Added by nikhil on 29102020
        }
//        });
    }
}

/*UOM population on RFQ Addition code by Bittu Start*/
function saveQtyWeightsWhenPOType_Service_Or_OrderUnit_Blank(currentRow) {
    var QuantityWeightJsonArray = [];
    var QuantityWeightJsonObject = {};
    var InsertionOrderId = currentRow.find("td").eq(0).children(".insertionOrderId_Class").val();
    var PrItemNumber = currentRow.find("td").eq(0).children(".PRItemNumber_Class").val();
    var LinkId = currentRow.find("td").eq(0).children(".linkId_Class").val();
    var quantity = removeCommaInNumber(currentRow.find("td").eq(6).children(".pr-quantity").val());
    var uom = currentRow.find('td').eq(7).children(".prUom").val();
    var perPrice = removeCommaInNumber(currentRow.find("td").eq(14).children(".priceUnitClass").val());
    QuantityWeightJsonObject["InsertionOrderId"] = InsertionOrderId;
    QuantityWeightJsonObject["PrItemNumber"] = PrItemNumber;
    QuantityWeightJsonObject["LinkId"] = LinkId;
    QuantityWeightJsonObject["POQuantity"] = quantity.toString();
    QuantityWeightJsonObject["POQuantityUnit"] = uom;
    QuantityWeightJsonObject["POQuantityInSKU"] = quantity.toString();
    QuantityWeightJsonObject["POQuantityInSKUUnit"] = uom;
    QuantityWeightJsonObject["OrderUnit1"] = perPrice.toString();
    QuantityWeightJsonObject["OrderUnit1_Unit"] = uom;
    QuantityWeightJsonObject["OrderUnit2"] = perPrice.toString();
    QuantityWeightJsonObject["OrderUnit2_Unit"] = uom;
    QuantityWeightJsonObject["OrderPriceUnit"] = perPrice.toString();
    QuantityWeightJsonObject["OrderPriceUnit_Unit"] = uom;
    QuantityWeightJsonObject["SKU"] = perPrice.toString();
    QuantityWeightJsonObject["SKU_Unit"] = uom;
    QuantityWeightJsonObject["NetWeight"] = "";
    QuantityWeightJsonObject["GrossWeight"] = "";
    QuantityWeightJsonObject["Volume"] = "";
    QuantityWeightJsonObject["Points"] = "";
    QuantityWeightJsonObject["NetWeightUnit"] = "";
    QuantityWeightJsonObject["GrossWeightUnit"] = "";
    QuantityWeightJsonObject["VolumeUnit"] = "";
    QuantityWeightJsonObject["PointsUnit"] = "";
    QuantityWeightJsonObject["NetWeightPerPrice"] = "";
    QuantityWeightJsonObject["GrossWeightPerPrice"] = "";
    QuantityWeightJsonObject["VolumePerPrice"] = "";
    QuantityWeightJsonObject["PointsPerPrice"] = "";
    QuantityWeightJsonObject["NetWeightOrderUnit"] = "";
    QuantityWeightJsonObject["GrossWeightOrderUnit"] = "";
    QuantityWeightJsonObject["VolumeOrderUnit"] = "";
    QuantityWeightJsonObject["PointsOrderUnit"] = "";
    QuantityWeightJsonObject["NetWeight2"] = "";
    QuantityWeightJsonObject["GrossWeight2"] = "";
    QuantityWeightJsonObject["Volume2"] = "";
    QuantityWeightJsonObject["Points2"] = "";
    QuantityWeightJsonObject["NetWeightUnit2"] = "";
    QuantityWeightJsonObject["GrossWeightUnit2"] = "";
    QuantityWeightJsonObject["VolumeUnit2"] = "";
    QuantityWeightJsonObject["PointsUnit2"] = "";
    QuantityWeightJsonArray.push(QuantityWeightJsonObject);

    var QuantityWeightAsJsonString = JSON.stringify(QuantityWeightJsonArray);
    console.log("QuantityWeightAsJsonString: " + QuantityWeightAsJsonString);
    saveQuantityWeightForMultiplePr(QuantityWeightAsJsonString);
}
function saveQtyWeightsWhenPOType_Material_Or_OrderUnit_NotBlank(jsonArray, currentRow, infoRecordJsonObj) {
    var QuantityWeightJsonArray = [];
    var convFrom = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArray[0].conversionFrom : infoRecordJsonObj.CONV_NUM1;
    var convTo = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArray[0].conversionTo : infoRecordJsonObj.CONV_DEN1;
    var QuantityWeightJsonObject = {};
    var InsertionOrderId = currentRow.find("td").eq(0).children(".insertionOrderId_Class").val();
    var PrItemNumber = currentRow.find("td").eq(0).children(".PRItemNumber_Class").val();
    var LinkId = currentRow.find("td").eq(0).children(".linkId_Class").val();
    var quantity = currentRow.find("td").eq(0).children(".quantityBeforeChange").val();
    var uom = currentRow.find('td').eq(7).children(".prUom").val();
    var perPrice = removeCommaInNumber(currentRow.find("td").eq(14).children(".priceUnitClass").val());
    var POQuantity = Number(convTo) / Number(convFrom) * Number(quantity);
    console.log("convFrom: " + convFrom + ", convTo: " + convTo);
    console.log("POQuantity after conv: " + POQuantity);
    QuantityWeightJsonObject["InsertionOrderId"] = InsertionOrderId;
    QuantityWeightJsonObject["PrItemNumber"] = PrItemNumber;
    QuantityWeightJsonObject["LinkId"] = LinkId;
    QuantityWeightJsonObject["POQuantity"] = jsonArray[0].orderUnit === "" || jsonArray[0].orderUnit === undefined ? quantity : POQuantity.toString();
    QuantityWeightJsonObject["POQuantityUnit"] = jsonArray[0].orderUnit === "" || jsonArray[0].orderUnit === undefined ? jsonArray[0].baseUOM : jsonArray[0].orderUnit;
    QuantityWeightJsonObject["POQuantityInSKU"] = quantity.toString();
    QuantityWeightJsonObject["POQuantityInSKUUnit"] = jsonArray[0].baseUOM;
    QuantityWeightJsonObject["OrderUnit1"] = perPrice.toString();
    QuantityWeightJsonObject["OrderUnit1_Unit"] = jsonArray[0].orderUnit === "" || jsonArray[0].orderUnit === undefined ? jsonArray[0].baseUOM : jsonArray[0].orderUnit;
    QuantityWeightJsonObject["OrderUnit2"] = convTo;
    QuantityWeightJsonObject["OrderUnit2_Unit"] = jsonArray[0].orderUnit === "" || jsonArray[0].orderUnit === undefined ? jsonArray[0].baseUOM : jsonArray[0].orderUnit;
    QuantityWeightJsonObject["OrderPriceUnit"] = perPrice.toString();
    if (infoRecordJsonObj.ORDERPR_UN !== "" && infoRecordJsonObj.ORDERPR_UN !== undefined) {
        QuantityWeightJsonObject["OrderPriceUnit_Unit"] = infoRecordJsonObj.ORDERPR_UN;
    } else {
        QuantityWeightJsonObject["OrderPriceUnit_Unit"] = jsonArray[0].orderUnit === "" || jsonArray[0].orderUnit === undefined ? jsonArray[0].baseUOM : jsonArray[0].orderUnit;
    }
    QuantityWeightJsonObject["SKU"] = convFrom;
    QuantityWeightJsonObject["SKU_Unit"] = jsonArray[0].baseUOM;
    QuantityWeightJsonObject["NetWeight"] = ""; //convFrom;
    QuantityWeightJsonObject["GrossWeight"] = ""; // convFrom;
    QuantityWeightJsonObject["Volume"] = "";
    QuantityWeightJsonObject["Points"] = "";
    QuantityWeightJsonObject["NetWeightUnit"] = ""; // jsonArray[0].baseUOM;
    QuantityWeightJsonObject["GrossWeightUnit"] = ""; // jsonArray[0].baseUOM;
    QuantityWeightJsonObject["VolumeUnit"] = "";
    QuantityWeightJsonObject["PointsUnit"] = "";
    QuantityWeightJsonObject["NetWeightPerPrice"] = ""; // perPrice;
    QuantityWeightJsonObject["GrossWeightPerPrice"] = ""; // perPrice;
    QuantityWeightJsonObject["VolumePerPrice"] = ""; // perPrice;
    QuantityWeightJsonObject["PointsPerPrice"] = ""; // perPrice;
    QuantityWeightJsonObject["NetWeightOrderUnit"] = ""; // jsonArray[0].orderUnit;
    QuantityWeightJsonObject["GrossWeightOrderUnit"] = ""; // jsonArray[0].orderUnit;
    QuantityWeightJsonObject["VolumeOrderUnit"] = ""; // jsonArray[0].orderUnit;
    QuantityWeightJsonObject["PointsOrderUnit"] = ""; // jsonArray[0].orderUnit;
    QuantityWeightJsonObject["NetWeight2"] = ""; // quantity;
    QuantityWeightJsonObject["GrossWeight2"] = ""; // quantity;
    QuantityWeightJsonObject["Volume2"] = "";
    QuantityWeightJsonObject["Points2"] = "";
    QuantityWeightJsonObject["NetWeightUnit2"] = ""; // jsonArray[0].baseUOM;
    QuantityWeightJsonObject["GrossWeightUnit2"] = ""; // jsonArray[0].baseUOM;
    QuantityWeightJsonObject["VolumeUnit2"] = "";
    QuantityWeightJsonObject["PointsUnit2"] = "";
    QuantityWeightJsonArray.push(QuantityWeightJsonObject);

    var QuantityWeightAsJsonString = JSON.stringify(QuantityWeightJsonArray);
    console.log("QuantityWeightAsJsonString bittu: " + QuantityWeightAsJsonString);
    saveQuantityWeightForMultiplePr(QuantityWeightAsJsonString);
}
/*UOM population on RFQ Addition code by Bittu End*/


function findMasterMaterialMARAByMatCode(materialCode)
{
    console.log("In findMasterMaterialMARAByMatCode====");
    var masterMaterialMARADetailsObj = {};
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
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

function updateOrderPriceUnitInQtyAndWtTabOfPoLine(insertionOrderId, newOpu)
{
    console.log("insertionOrderId: " + insertionOrderId);
    console.log("newOpu: " + newOpu);
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updateOrderPriceUnitInQtyAndWtTabOfPoLine",
            "insertionOrderId": insertionOrderId,
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

function taxFromTaxCode() {
    var taxCode = $("#TaxCode").val();
    var companycode = $("#companycodeHeader").val();
    var toCurrency = "";
    var amount = 0;
    var insertionid = $("#ItemNumberSelect").val();

    $("#material_headerClass tbody tr").each(function() {
        var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (insertionid === itemDropdownId) {
            toCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
            amount = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
        }
    });
    var dmsip = $("#dmsip").val();
    var serviceUrl = dmsip + "/PR2POWebservice/ng/sapservice/POTaxCalc";
    console.log("serviceUrl: " + serviceUrl);
    var TaxPer = "";

//                    TaxPer = getTaxResponse("");  //Localhost 

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
            TaxPer = getTaxResponse(data);
            console.log("TaxPer: " + TaxPer);
//                        $("#overlay").css("display", "none");
        }
    });

    return TaxPer;
}

function calculateTaxCode(toCurrency, amount) {
    var companycode = $("#companycodeHeader").val();
    var taxCode = $("#TaxCode").val();                              //Need to Change
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);
    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
    console.log("serviceUrl: " + serviceUrl);
    var TaxPer = "";
//    TaxPer = getTaxResponse("");
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

    return TaxPer;
}
function calculateTaxCodeLineLevel(toCurrency, amount) {
    var companycode = $("#companycodeHeader").val();
    var taxCode = $("#TaxCode").val();
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);
    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companycode + "&TaxCode=" + taxCode + "&Currency=" + toCurrency + "&Amount=" + amount;
    console.log("serviceUrl: " + serviceUrl);
    var TaxPer = "";
//     TaxPer = getTaxResponse("");                  //Localhost
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
    return TaxPer;
}

function updateConditionTableOnOPUChange(opu) {

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

function calculateStatusTabValue(exchangeRate, toCurrency) {

    var orderedTotalPrice = $("#orderedTotalPrice").val();
    var deliveredTotalPrice = $("#deliveredTotalPrice").val();
    var stillToDelivTotalPrice = $("#stillToDelivTotalPrice").val();
    var invoicedTotalPrice = $("#invoicedTotalPrice").val();
    var downpaymentsTotalPrice = $("#downpaymentsTotalPrice").val();

    if (orderedTotalPrice !== "") {
        $("#orderedTotalPrice").val(formatAmountByComma((Number(orderedTotalPrice) * Number(exchangeRate)).toFixed(2)));
    }
    if (deliveredTotalPrice !== "") {
        $("#deliveredTotalPrice").val(formatAmountByComma((Number(deliveredTotalPrice) * Number(exchangeRate)).toFixed(2)));
    }
    if (stillToDelivTotalPrice !== "") {
        $("#stillToDelivTotalPrice").val(formatAmountByComma((Number(stillToDelivTotalPrice) * Number(exchangeRate)).toFixed(2)));
    }
    if (invoicedTotalPrice !== "") {
        $("#invoicedTotalPrice").val(formatAmountByComma((Number(invoicedTotalPrice) * Number(exchangeRate)).toFixed(2)));
    }
    if (downpaymentsTotalPrice !== "") {
        $("#downpaymentsTotalPrice").val(formatAmountByComma((Number(downpaymentsTotalPrice) * Number(exchangeRate)).toFixed(2)));
    }


    $("#orderedCurrency").val(toCurrency);
    $("#deliveredCurrency").val(toCurrency);
    $("#stillToDelivCurrency").val(toCurrency);
    $("#invoicedCurrency").val(toCurrency);
    $("#downpaymentsCurrency").val(toCurrency);
}
var trackingNumber = null;
function getTrackingNumberByCompanyCode(companyCode) {
//    alert("getTrackingNumberByCompanyCode :" + companyCode);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getTrackingNumberByCompanyCode",
            "companyCode": companyCode
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            console.log("Obj length :" + jsonArr.length);
            var row = "";
            var trackingNo = "";
            if (jsonArr.length !== 0) {
                trackingNo = jsonArr[0].trackingNo.toString().split(',');
            }
            for (var i = 0; i < trackingNo.length; i++) {
                row += "<tr class='poTrackingNumberTrClass'>"
                        + "<td>" + trackingNo[i] + "</td>"
//                            + "<td>" + jsonArr[i].departmentDesc + "</td>"
                        + "</tr>";
            }
            $("#trackingNumnerModalTable tbody").append(row);
            if ($.fn.DataTable.isDataTable('#trackingNumnerModalTable')) {
                trackingNumber.destroy();
                trackingNumber = null;
                $("#trackingNumnerModalTable").children('tbody').html(row);
                trackingNumber = $('table.trackingNumnerModalTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                trackingNumber.buttons().container()
                        .appendTo('#trackingNumnerModalTable_wrapper .col-md-6:eq(0)');
            } else {
                $('#trackingNumnerModalTable thead tr').clone(true).appendTo('#trackingNumnerModalTable thead');
                $('#trackingNumnerModalTable thead tr:eq(1) th').each(function(i) {
                    $('#trackingNumnerModalTable thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (trackingNumber.column(i).search() !== this.value) {
                            trackingNumber
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                trackingNumber = $('table.trackingNumnerModalTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                trackingNumber.buttons().container()
                        .appendTo('#trackingNumnerModalTable_wrapper .col-md-6:eq(0)');
            }
        }
    });
}

function ifHeaderCurrencyNotChange() {
    console.log("calculationForPBXX in po.js================");
    var conType = "";
    var netPrice = "";
    var Quantity = "";
    var perQuant = "";
    var fromCurrency = "";
    var insertionid = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (insertionid === itemDropdownId) {
            Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
//            netPrice = $(this).find("td").eq(12).children(".pr-net-price").val();
            netPrice = $(this).find("td").eq(0).children(".prNetPriceHidden").val();
            perQuant = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
            fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
        }
    });
    var amount = netPrice;
    var condValue = "";
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        conType = $(this).find("td").eq(1).children('.ConditionTypeLineLevel').val();
        var perQty = "";
        if (conType === "PBXX") {
            var fml = formula(conType);
            var poQty = Quantity;
            perQty = perQuant;
            var quant;
            var exp = new String(fml);
            condValue = eval(exp.toString());
            console.log("exp :" + exp);
            console.log("amount :" + amount + "poQty :" + poQty + "perQty :" + perQty);
            console.log("condValue :" + condValue);
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(amount).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(perQuant).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
            var oldAmount = $(this).find("td").eq(3).children(".AmountLineLevelHidden").val();
            var oldPercentage = $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
//            calculateConditionValue(amount, conType, perQty, oldAmount, oldPercentage);
//            alert("perQty :" + perQty);
            deleteRowFormCondition("netprice");
            $(this).find("td").eq(3).children(".AmountLineLevelHidden").val(Number(amount).toFixed(2));
            $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val(Number(perQuant).toFixed(2));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(perQuant).toFixed(2)));
        }
    });

}

function findApproverDetails()
{
    console.log("In findApproverDetails");

    var areTaxCodePresent = true;
    var departmentCode = "";
    $("#material_headerClass tbody tr").each(function(index) {
        if (index === 0) {
            departmentCode = $(this).find("td").eq(19).children(".pr-tracking-number").val();
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
        var pr_quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
        var pr_perUnit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
        var pr_netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
        var pr_currency = $(this).find("td").eq(13).children(".currencyClass").val();
        var TexCodeForLineInPr = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
        var IO_Id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        console.log("IO_Id: " + IO_Id);

        var taxCode = TexCodeForLineInPr;
        console.log("taxCode: " + taxCode);

        prTaxAmount = prTaxAmount + prTaxAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_perUnit);
    });
    return prTaxAmount;
}

function deleteAllConditionsOnLoad() {
    var InsOrderIdIdArray = [];
    $("#material_headerClass tbody tr").each(function() {
        var insertionid = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//        var LinkId = currentRow.find("td").eq(0).children(".linkId_Class").val();
        InsOrderIdIdArray.push(insertionid);

        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "deleteAllConditionsOnLoad",
                "InsOrderIdIdArrayAsString": InsOrderIdIdArray.toString()
            }
        });

    });
}

function popConditionAtHeaderOnAmount_PerChange(jsonCondArr) {
    console.log("conditionArray temp:====" + JSON.stringify(conditionArray));
    console.log("jsonCondArr.toString() :" + JSON.stringify(jsonCondArr));
    var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
    var conType = "";
    var conName = "";
    var changeid = "";
    conditionArray.forEach(function(e) {
        console.log("Ctype  bittu popConditionAtHeaderOnAmount_PerChange :" + e.conType);
        var rows = $("#conditionTableId tbody tr");
        for (var j = 0; j < rows.length; j++) {
            var ctypeheader = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
            conName = $(rows[j]).find("td").eq(2).children(".nameConditionsHeader").val();
            var changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
            if (((e.conType === "") ? (e.name === conName) && (changeid === e.changeId) && (changeid === e.changeId) : (e.conType === ctypeheader)) && (changeid === e.changeId)) {

                console.log("e.conType ::::" + e.conType + " ,conType :" + ctypeheader);
                console.log("e.name :::" + e.name + " ,conName :" + conName);
                console.log("e.changeId :::::" + e.changeId + " ,changeid :" + changeid);

                var amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountHeader").val());
                var per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val());
                var condVal = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val());

                var totalAmount = Number(amount) - Number(e.amount);
                var totalPer = Number(per) - Number(e.perQuant);
                var totalConVal = Number(condVal) - Number(e.conVal);
                if (ctypeheader === "PBXX") {
//                    alert("amount :" + amount + " ,e.amount :" + e.amount + " ,totalAmount :" + totalAmount);
                }

                $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount).toFixed(2)));
                $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer).toFixed(2)));
                $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal).toFixed(2)));

//                $(rows[j]).find("td").eq(3).children(".AmountHeader").attr({
//                    "value": Number(totalAmount).toFixed(2)
//                });
//                $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").attr({
//                   "value": Number(totalPer).toFixed(2)
//                });
//                $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").attr({
//                    "value": Number(totalConVal).toFixed(2)
//                });
            }
        }
    });

    var flag = false;
    for (var i = 0; i < jsonCondArr.length; i++) {
        var rows = $("#conditionTableId tbody tr");
        for (var j = 0; j < rows.length; j++) {
//            if (jsonCondArr[i].conditionType === "PB00") {
//                alert("jsonCondArr[i].conditionType :" + jsonCondArr[i].conditionType);
//            }
            conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeHeader").val();
            conName = $(rows[j]).find("td").eq(2).children(".nameConditionsHeader").val();
            changeid = $(rows[j]).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
            if (((jsonCondArr[i].conditionType === "") ? (jsonCondArr[i].name === conName) && (changeid === jsonCondArr[i].changeId) : (jsonCondArr[i].conditionType === conType)) && (changeid === jsonCondArr[i].changeId)) {
//                console.log("conditionType :" + jsonCondArr[i].conditionType + " ,conType :" + conType);
//                console.log("jsonCondArr[i].name :" + jsonCondArr[i].name + " ,conName :" + conName);
//                console.log("changeid :" + changeid + " ,jsonCondArr[i].changeId :" + jsonCondArr[i].changeId);
                var amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountHeader").val());
                var per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val());
                var condVal = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val());
                console.log("Total Amount :" + Number(Number(jsonCondArr[i].per) + Number(per)).toFixed(2));
                console.log("Total Per :" + Number(Number(jsonCondArr[i].per) + Number(per)).toFixed(2));
                console.log("Total Condition Value :" + Number(Number(jsonCondArr[i].conditionValue1) + Number(condVal)).toFixed(2));
                $(rows[j]).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].amount) + Number(amount)).toFixed(2)));
                $(rows[j]).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].per) + Number(per)).toFixed(2)));
                $(rows[j]).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(Number(jsonCondArr[i].conditionValue1) + Number(condVal)).toFixed(2)));
                flag = true;
                break;
            } else {
                flag = false;
            }
        }

        if (flag === false) {
            var tdrow = "<tr>"
                    + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'><input type='hidden' class='conditionVendorHeader' value='" + (vendorcode === undefined ? "" : vendorcode) + "'><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex' value=''></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (jsonCondArr[i].conditionType === undefined ? "" : jsonCondArr[i].conditionType) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (jsonCondArr[i].name === undefined ? "" : jsonCondArr[i].name) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' style='width: 150px;' disabled value = '" + (jsonCondArr[i].amount === undefined ? "" : formatAmountByComma(Number(jsonCondArr[i].amount).toFixed(2))) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (jsonCondArr[i].currency1 === undefined ? "" : jsonCondArr[i].currency1) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' style='width: 150px;' disabled value='" + (jsonCondArr[i].per === undefined ? "" : formatAmountByComma(Number(jsonCondArr[i].per).toFixed(2))) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value='" + (jsonCondArr[i].conditionPricingUnit === undefined ? "" : jsonCondArr[i].conditionPricingUnit) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (jsonCondArr[i].uom === undefined ? "" : jsonCondArr[i].uom) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width: 150px;' disabled value='" + (jsonCondArr[i].conditionValue1 === undefined ? "" : formatAmountByComma(Number(jsonCondArr[i].conditionValue1).toFixed(2))) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (jsonCondArr[i].currency2 === undefined ? "" : jsonCondArr[i].currency2) + "' disabled></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value='" + (jsonCondArr[i].conditionValue2 === undefined ? "" : jsonCondArr[i].conditionValue2) + "'></td>"
                    + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value='" + (jsonCondArr[i].conditionCurrency === undefined ? '' : jsonCondArr[i].conditionCurrency) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (jsonCondArr[i].kappl === undefined ? "" : jsonCondArr[i].kappl) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (jsonCondArr[i].kvsl1 === undefined ? "" : jsonCondArr[i].kvsl1) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (jsonCondArr[i].kvsl2 === undefined ? "" : jsonCondArr[i].kvsl2) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (jsonCondArr[i].conditionCount === undefined ? "" : jsonCondArr[i].conditionCount) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (jsonCondArr[i].stNumber === undefined ? "" : jsonCondArr[i].stNumber) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (jsonCondArr[i].changeId === undefined ? "" : jsonCondArr[i].changeId) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (jsonCondArr[i].vendorName === undefined ? "" : jsonCondArr[i].vendorName) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (jsonCondArr[i].vendorCode === undefined ? "" : jsonCondArr[i].vendorCode) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (jsonCondArr[i].condPriceDate === undefined ? "" : jsonCondArr[i].condPriceDate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (jsonCondArr[i].condCurncyExchangeRate === undefined ? "" : jsonCondArr[i].condCurncyExchangeRate) + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (jsonCondArr[i].poCurrencyExchangeRate === undefined ? "" : jsonCondArr[i].poCurrencyExchangeRate) + "'></td>"
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
    conditionArray = [];

}

function updatedQtyInQtyWtsTabByInsertionOrderId(insertionOrderId, quantity)
{
    console.log("insertionOrderId: " + insertionOrderId);
    console.log("quantity: " + quantity);

    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatedQtyInQtyWtsTabByInsertionOrderId",
            "insertionOrderId": insertionOrderId,
            "quantity": quantity
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function updatedQtyInDeliverySchByInsertionOrderId(insertionOrderId, quantity)
{
    console.log("insertionOrderId: " + insertionOrderId);
    console.log("quantity: " + quantity);

    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatedQtyInDeliverySchByInsertionOrderId",
            "insertionOrderId": insertionOrderId,
            "quantity": quantity
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function updateInConditionTable() {
    var LinkID;
    var itemCodeArray = [];
    var linkidArray = [];
    var PrCurrencyArray = [];
    $("#material_headerClass tbody tr").each(function() {
        LinkID = ($(this).find("td").eq(0).children(".linkId_Class").val()).trim();
        linkidArray.push(LinkID);
    });

    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "updateInConditionTable",
            "conditionLineLevelArr": JSON.stringify(conditionLineLevelArray),
            "linkidArrayAsString": linkidArray.toString(),
            "PrCurrencyArrayAsString": PrCurrencyArray.toString(),
            "itemCodeArrayAsString": itemCodeArray.toString()
        }
    });
}

function updatedQtyWtsTabByInsertionOrderId(insertionOrderId, prItemNumber, prLinkId) {
    var QuantityWeightJsonObject = {};
    QuantityWeightJsonObject["InsertionOrderId"] = insertionOrderId;
    QuantityWeightJsonObject["PrItemNumber"] = prItemNumber;
    QuantityWeightJsonObject["LinkId"] = prLinkId;
    QuantityWeightJsonObject["POQuantity"] = $("#pOQuantity").val() !== "" ? removeCommaInNumber($("#pOQuantity").val()).toString() : "";
    QuantityWeightJsonObject["POQuantityUnit"] = $("#pOUnit").val();
    QuantityWeightJsonObject["POQuantityInSKU"] = $("#pOQuantitySKU").val() !== "" ? removeCommaInNumber($("#pOQuantitySKU").val()).toString() : "";
    QuantityWeightJsonObject["POQuantityInSKUUnit"] = $("#pOUnitSKU").val();
    QuantityWeightJsonObject["OrderUnit1"] = $("#orderUnit").val() !== "" ? removeCommaInNumber($("#orderUnit").val()).toString() : "";
    QuantityWeightJsonObject["OrderUnit1_Unit"] = $("#unitOrderUnit").val();
    QuantityWeightJsonObject["OrderUnit2"] = $("#orderUnit2").val() !== "" ? removeCommaInNumber($("#orderUnit2").val()).toString() : "";
    QuantityWeightJsonObject["OrderUnit2_Unit"] = $("#unitOrderUnit2").val();
    QuantityWeightJsonObject["OrderPriceUnit"] = $("#orderPriceUnit").val() !== "" ? removeCommaInNumber($("#orderPriceUnit").val()).toString() : "";
    QuantityWeightJsonObject["OrderPriceUnit_Unit"] = $("#unitOrderPriceUnit").val();
    QuantityWeightJsonObject["SKU"] = $("#sKUUnit").val() !== "" ? removeCommaInNumber($("#sKUUnit").val()).toString() : "";
    QuantityWeightJsonObject["SKU_Unit"] = $("#unitSKUUnit").val();
    QuantityWeightJsonObject["NetWeight"] = $("#netWeight").val() !== "" ? removeCommaInNumber($("#netWeight").val()).toString() : "";
    QuantityWeightJsonObject["GrossWeight"] = $("#grossWeight").val() !== "" ? removeCommaInNumber($("#grossWeight").val()).toString() : "";
    QuantityWeightJsonObject["Volume"] = $("#volume").val() !== "" ? removeCommaInNumber($("#volume").val()).toString() : "";
    QuantityWeightJsonObject["Points"] = $("#points").val() !== "" ? removeCommaInNumber($("#points").val()).toString() : "";
    QuantityWeightJsonObject["NetWeightUnit"] = $("#netWeightUnit").val();
    QuantityWeightJsonObject["GrossWeightUnit"] = $("#grossWeightUnit").val();
    QuantityWeightJsonObject["VolumeUnit"] = $("#volumeUnit").val();
    QuantityWeightJsonObject["PointsUnit"] = $("#pointsUnit").val();
    QuantityWeightJsonObject["NetWeightPerPrice"] = $("#netWeightPerPrice").val();
    QuantityWeightJsonObject["GrossWeightPerPrice"] = $("#grossWeightPerPrice").val();
    QuantityWeightJsonObject["VolumePerPrice"] = $("#volumePerPrice").val();
    QuantityWeightJsonObject["PointsPerPrice"] = $("#pointsPerPrice").val();
    QuantityWeightJsonObject["NetWeightOrderUnit"] = $("#netWeightOrderUnit").val();
    QuantityWeightJsonObject["GrossWeightOrderUnit"] = $("#grossWeightOrderUnit").val();
    QuantityWeightJsonObject["VolumeOrderUnit"] = $("#volumeOrderUnit").val();
    QuantityWeightJsonObject["PointsOrderUnit"] = $("#pointsOrderUnit").val();
    QuantityWeightJsonObject["NetWeight2"] = $("#netWeight2").val() !== "" ? removeCommaInNumber($("#netWeight2").val()).toString() : "";
    QuantityWeightJsonObject["GrossWeight2"] = $("#grossWeight2").val() !== "" ? removeCommaInNumber($("#grossWeight2").val()).toString() : "";
    QuantityWeightJsonObject["Volume2"] = $("#volume2").val() !== "" ? removeCommaInNumber($("#volume2").val()).toString() : "";
    QuantityWeightJsonObject["Points2"] = $("#points2").val() !== "" ? removeCommaInNumber($("#points2").val()).toString() : "";
    QuantityWeightJsonObject["NetWeightUnit2"] = $("#netWeightUnit2").val();
    QuantityWeightJsonObject["GrossWeightUnit2"] = $("#grossWeightUnit2").val();
    QuantityWeightJsonObject["VolumeUnit2"] = $("#volumeUnit2").val();
    QuantityWeightJsonObject["PointsUnit2"] = $("#pointsUnit2").val();

    var QuantityWeightAsJsonString = JSON.stringify(QuantityWeightJsonObject);
    console.log("QuantityWeightAsJsonString: " + QuantityWeightAsJsonString);

    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatedQtyWtsTabByInsertionOrderId",
            "quantityWeightAsJsonString": QuantityWeightAsJsonString
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function saveOrUpdateQuantityWeightsOnLoadFieldChange() {
    var prItemNumber = "";
    var prLinkId = "";
    var insertionOrderId = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (insertionOrderId === id) {
            prItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            prLinkId = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });

    var QuantityWeightJsonObject = {};
    QuantityWeightJsonObject["InsertionOrderId"] = insertionOrderId;
    QuantityWeightJsonObject["PrItemNumber"] = prItemNumber;
    QuantityWeightJsonObject["LinkId"] = prLinkId;
    QuantityWeightJsonObject["POQuantity"] = $("#pOQuantity").val() !== "" ? removeCommaInNumber($("#pOQuantity").val()).toString() : "";
    QuantityWeightJsonObject["POQuantityUnit"] = $("#pOUnit").val();
    QuantityWeightJsonObject["POQuantityInSKU"] = $("#pOQuantitySKU").val() !== "" ? removeCommaInNumber($("#pOQuantitySKU").val()).toString() : "";
    QuantityWeightJsonObject["POQuantityInSKUUnit"] = $("#pOUnitSKU").val();
    QuantityWeightJsonObject["OrderUnit1"] = $("#orderUnit").val() !== "" ? removeCommaInNumber($("#orderUnit").val()).toString() : "";
    QuantityWeightJsonObject["OrderUnit1_Unit"] = $("#unitOrderUnit").val();
    QuantityWeightJsonObject["OrderUnit2"] = $("#orderUnit2").val() !== "" ? removeCommaInNumber($("#orderUnit2").val()).toString() : "";
    QuantityWeightJsonObject["OrderUnit2_Unit"] = $("#unitOrderUnit2").val();
    QuantityWeightJsonObject["OrderPriceUnit"] = $("#orderPriceUnit").val() !== "" ? removeCommaInNumber($("#orderPriceUnit").val()).toString() : "";
    QuantityWeightJsonObject["OrderPriceUnit_Unit"] = $("#unitOrderPriceUnit").val();
    QuantityWeightJsonObject["SKU"] = $("#sKUUnit").val() !== "" ? removeCommaInNumber($("#sKUUnit").val()).toString() : "";
    QuantityWeightJsonObject["SKU_Unit"] = $("#unitSKUUnit").val();
    QuantityWeightJsonObject["NetWeight"] = $("#netWeight").val() !== "" ? removeCommaInNumber($("#netWeight").val()).toString() : "";
    QuantityWeightJsonObject["GrossWeight"] = $("#grossWeight").val() !== "" ? removeCommaInNumber($("#grossWeight").val()).toString() : "";
    QuantityWeightJsonObject["Volume"] = $("#volume").val() !== "" ? removeCommaInNumber($("#volume").val()).toString() : "";
    QuantityWeightJsonObject["Points"] = $("#points").val() !== "" ? removeCommaInNumber($("#points").val()).toString() : "";
    QuantityWeightJsonObject["NetWeightUnit"] = $("#netWeightUnit").val();
    QuantityWeightJsonObject["GrossWeightUnit"] = $("#grossWeightUnit").val();
    QuantityWeightJsonObject["VolumeUnit"] = $("#volumeUnit").val();
    QuantityWeightJsonObject["PointsUnit"] = $("#pointsUnit").val();
    QuantityWeightJsonObject["NetWeightPerPrice"] = $("#netWeightPerPrice").val();
    QuantityWeightJsonObject["GrossWeightPerPrice"] = $("#grossWeightPerPrice").val();
    QuantityWeightJsonObject["VolumePerPrice"] = $("#volumePerPrice").val();
    QuantityWeightJsonObject["PointsPerPrice"] = $("#pointsPerPrice").val();
    QuantityWeightJsonObject["NetWeightOrderUnit"] = $("#netWeightOrderUnit").val();
    QuantityWeightJsonObject["GrossWeightOrderUnit"] = $("#grossWeightOrderUnit").val();
    QuantityWeightJsonObject["VolumeOrderUnit"] = $("#volumeOrderUnit").val();
    QuantityWeightJsonObject["PointsOrderUnit"] = $("#pointsOrderUnit").val();
    QuantityWeightJsonObject["NetWeight2"] = $("#netWeight2").val() !== "" ? removeCommaInNumber($("#netWeight2").val()).toString() : "";
    QuantityWeightJsonObject["GrossWeight2"] = $("#grossWeight2").val() !== "" ? removeCommaInNumber($("#grossWeight2").val()).toString() : "";
    QuantityWeightJsonObject["Volume2"] = $("#volume2").val() !== "" ? removeCommaInNumber($("#volume2").val()).toString() : "";
    QuantityWeightJsonObject["Points2"] = $("#points2").val() !== "" ? removeCommaInNumber($("#points2").val()).toString() : "";
    QuantityWeightJsonObject["NetWeightUnit2"] = $("#netWeightUnit2").val();
    QuantityWeightJsonObject["GrossWeightUnit2"] = $("#grossWeightUnit2").val();
    QuantityWeightJsonObject["VolumeUnit2"] = $("#volumeUnit2").val();
    QuantityWeightJsonObject["PointsUnit2"] = $("#pointsUnit2").val();

    var QuantityWeightAsJsonString = JSON.stringify(QuantityWeightJsonObject);
    console.log("QuantityWeightAsJsonString: " + QuantityWeightAsJsonString);

    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "updatedQtyWtsTabByInsertionOrderId",
            "quantityWeightAsJsonString": QuantityWeightAsJsonString
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
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

function calculatetotalamount(condType, InsertionOrderId) {
    var totalamount = 0;
    console.log("conditionLineLevelArray after taxcode :" + JSON.stringify(conditionLineLevelArray));
    conditionLineLevelArray.forEach(function(e) {
        if (condType === e.Ctype && InsertionOrderId === e.itemCode) {
            var amount = e.amount;
            totalamount = Number(amount) + Number(totalamount);
        }
    });
    return totalamount;
}

function calculatetotaper(condType, InsertionOrderId) {
    var totalper = 0;
    console.log("conditionLineLevelArray after taxcode :" + JSON.stringify(conditionLineLevelArray));
    conditionLineLevelArray.forEach(function(e) {
        if (condType === e.Ctype && InsertionOrderId === e.itemCode) {
            var per = e.per;
            totalper = Number(per) + Number(totalper);
        }
    });
    return totalper;
}

function hidePoLineTableColsByPoType()
{
    console.log("hidePoLineTableColsByPoType");
    console.log("PrType: " + $("#PrType").val());
    if ($("#PrType").val() === "Material")
    {
        $("#material_headerClass thead tr th").eq(9).css("display", "none");
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("td").eq(9).css("display", "none");
        });
    }
    else if ($("#PrType").val() === "Service")
    {
        $("#material_headerClass thead tr th").eq(4).css("display", "none");
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("td").eq(4).css("display", "none");
        });
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

function hideDeliveryTabFieldsByPoType()
{
    console.log("hideDeliveryTabFieldsByPoType");
    var prType = $("#PrType").val();
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

function addPoLineQuantityBackToPrOrRfqLineOnCancelPo()
{
    console.log("In addPoLineQuantityBackToPrOrRfqLineOnCancelPo:");

    $("#material_headerClass tbody tr").each(function() {
        var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
        console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);

        if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "PoLine")
        {
            var pid = $(this).find("td").eq(0).children(".procInstId_Class").val();
            var prItemNumber = $(this).find("td").eq(24).text();
            var prRfqNumber = $(this).find("td").eq(0).children(".prRfqNumber").val();
            var prRfqLineItemNumber = $(this).find("td").eq(0).children(".prRfqLineItemNumber").val();
            var poLineQuantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            console.log("pid: " + pid);
            console.log("prItemNumber: " + prItemNumber);
            console.log("prRfqNumber: " + prRfqNumber);
            console.log("prRfqLineItemNumber: " + prRfqLineItemNumber);
            console.log("poLineQuantity: " + poLineQuantity);

            if (prRfqNumber !== "" && prRfqNumber !== undefined && prRfqLineItemNumber !== "" && prRfqLineItemNumber !== undefined) {
                console.log("This is a RFQ Line!");
                addPoLineQuantityBackToRfqLineOnCancelPo(prRfqNumber, prRfqLineItemNumber, poLineQuantity);
            } else if (pid !== "" && pid !== undefined) {
                console.log("This is a PR Line!");
                addPoLineQuantityBackToPrLineOnCancelPo(pid, prItemNumber, poLineQuantity);
            } else {
                console.log("This is a Standalone Line!");
            }
        }
    });
}

function addPoLineQuantityBackToPrLineOnCancelPo(pid, prItemNumber, poLineQuantity)
{
    console.log("In addPoLineQuantityBackToPrLineOnCancelPo:");
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "addPoLineQuantityBackToPrLineOnCancelPo",
            "pid": pid,
            "poLineQuantity": poLineQuantity,
            "companyCode": companyCode,
            "prType": prType,
            "prItemNumber": prItemNumber
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function addPoLineQuantityBackToRfqLineOnCancelPo(rfqNumber, rfqLineItemNumber, poLineQuantity)
{
    console.log("In addPoLineQuantityBackToRfqLineOnCancelPo");
    var companyCode = $("#companycodeHeader").val();
    var prType = $("#PrType").val();
    console.log("companyCode: " + companyCode);
    console.log("prType: " + prType);
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "addPoLineQuantityBackToRfqLineOnCancelPo",
            "rfqNumber": rfqNumber,
            "rfqLineItemNumber": rfqLineItemNumber,
            "poLineQuantity": poLineQuantity,
            "companyCode": companyCode,
            "prType": prType
        },
        complete: function(responseJson) {
            $("#overlay").css("display", "none");
            var obj = $.parseJSON(responseJson.responseText);
            console.log("obj.Result :" + obj.Result);
        }
    });
}

function updateQuantityWeightsOnUomChange(QuantityWeightAsJsonString) {
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
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

function setPoLineLevelDataFromInfoRecord(infoRecordJsonObj, requestFrom, isPoLineOrPrLineOrRfqLineOrEmptyLine)
{
    console.log("In setPoLineLevelDataFromInfoRecord:");
    console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);
    console.log("%cInfoRecord requestFrom 2: " + requestFrom, "color: blue");
    console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));

    if (requestFrom === "VendorChange" || requestFrom === "OnLoad")
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
    if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "EmptyLine") {
        if (infoRecordJsonObj.PLND_DELRY !== "") {
            $("#PlDeliveryTime").val(infoRecordJsonObj.PLND_DELRY);
        }
    }
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

function setPoLineDetailsFromInfoRecord(infoRecordJsonObj, currentPoLineRef)
{
    console.log("In setPoLineDetailsFromInfoRecord:");

    // Enable UOM if variable order unit is 'Active'
    if (infoRecordJsonObj.VAR_ORD_UN === "1") {
        currentPoLineRef.find("td").eq(7).children(".prUom").prop("disabled", false);
    }
    if (infoRecordJsonObj.ORDERPR_UN !== "") {
        currentPoLineRef.find("td").eq(8).children(".prOrderPriceUnit").val(infoRecordJsonObj.ORDERPR_UN);
    }
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

function getCmplxPRToPOLineItemComponentsByLinkId(linkId)
{
    console.log("In getCmplxPRToPOLineItemComponentsByLinkId:");
    console.log("linkId: " + linkId);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getCmplxPRToPOLineItemComponentsByLinkId",
            "linkId": linkId
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("componentsArr len: " + obj.componentsArr.length);
        }
    });
}

function getComponentByInsertionOrderId(insertionOrderId)
{
    console.log("In getComponentByInsertionOrderId:");
    console.log("insertionOrderId: " + insertionOrderId);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getComponentByInsertionOrderId",
            "insertionOrderId": insertionOrderId
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("componentsArr len: " + obj.componentsArr.length);
            setPrComponents(obj.componentsArr);
        }
    });
}

function setPrComponents(jArraComponent)
{
    console.log("In setPrComponents:");
    console.log("jArraComponent len: " + jArraComponent.length);
    $("#componentTableIdLineLevel tbody tr").remove();
    var row = "";
    for (var i = 0; i < jArraComponent.length; i++) {
        var materialcode = jArraComponent[i].materialCode === undefined ? '' : jArraComponent[i].materialCode;
        var description = jArraComponent[i].description === undefined ? '' : jArraComponent[i].description;
        var plant = jArraComponent[i].plant === undefined ? '' : jArraComponent[i].plant;
        var unit = jArraComponent[i].unit === undefined ? '' : jArraComponent[i].unit;
        var quantity = jArraComponent[i].quantity === undefined ? '' : jArraComponent[i].quantity;
        var prodStLoc = jArraComponent[i].productStorageLocation === undefined ? '' : jArraComponent[i].productStorageLocation;
        var supplyArea = jArraComponent[i].supplyArea === undefined ? '' : jArraComponent[i].supplyArea;
        var reqDate = jArraComponent[i].reqDateAsString === undefined ? '' : jArraComponent[i].reqDateAsString;
        var qtyIsFixed = jArraComponent[i].qtyIsFixed === undefined ? '' : jArraComponent[i].qtyIsFixed;
        var distKey = jArraComponent[i].distributionKey === undefined ? '' : jArraComponent[i].distributionKey;
        var batch = jArraComponent[i].batch === undefined ? '' : jArraComponent[i].batch;
        var latestReqDate = jArraComponent[i].latestReqDateAsString === undefined ? '' : jArraComponent[i].latestReqDateAsString;
        var itemNumber = jArraComponent[i].prItemNumber === undefined ? '' : jArraComponent[i].prItemNumber;

        if (reqDate !== "") {
            var dateArr = reqDate.toString().split("-");
            reqDate = dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
        }
        if (latestReqDate !== "") {
            var dateArr = latestReqDate.toString().split("-");
            latestReqDate = dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
        }

        row += "<tr>\n\
            <td>" + '<input type="hidden" class="changeId" value=""><input type="text" class="form-control form-rounded input-height comMaterial" value="' + materialcode + '" style="width:150px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height comDescription" value="' + description + '" style="width:200px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height comPlant" value="' + plant + '" style="width:100px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height comUnit" value="' + unit + '" style="width:100px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height comQuantity" value="' + formatNumberByComma(quantity) + '" style="width:150px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height comProdStorageLoc" value="' + prodStLoc + '" style="width:150px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height comSupplyArea" value="' + supplyArea + '" style="width:150px;">' + "</td>\n\
            <td>" + '<input type="text" readonly class="form-control form-rounded input-height comRequirementDate" value="' + reqDate + '" style="width:150px;display: inline;"> <input type="hidden" class="compReqDatepicker">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height compQtyIsFixed" value="' + qtyIsFixed + '" style="width:100px;">' + "</td>\n\
            <td>" + '<input type="text" readonly class="form-control form-rounded input-height compLatestReqDate" value="' + latestReqDate + '" style="width:150px;display: inline;"> <input type="hidden" class="compLatestReqDatepicker">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height compDistKey" value="' + distKey + '" style="width:150px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height compItemNo" value="' + itemNumber + '" readonly="true" style="width:80px;">' + "</td>\n\
            <td>" + '<input type="text" class="form-control form-rounded input-height compBatch" value="' + batch + '" style="width:150px;">' + "</td>\n\
            <td>" + "</td>\n\
            </tr>";
    }
    $("#componentTableIdLineLevel tbody").append(row);
    refreshCompLatestReqDatepicker();
    refreshCompReqDatepicker();
}

function saveComponentsFromCmplxTableToLocalTable(linkId, insertionOrderId, prItemNumber, prQuantity)
{
    console.log("In saveComponentsFromCmplxTableToLocalTable:");
    console.log("linkId: " + linkId);
    console.log("insertionOrderId: " + insertionOrderId);
    console.log("prItemNumber: " + prItemNumber);
    console.log("prQuantity: " + prQuantity);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "saveComponentsFromCmplxTableToLocalTable",
            "linkId": linkId,
            "insertionOrderId": insertionOrderId,
            "prItemNumber": prItemNumber,
            "prQuantity": prQuantity
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Result: " + obj.Result);
        }
    });
}

function showComponentModal()
{
    $("#componentsModal").modal("show");
    $("#componentsModal").css({
        "padding-right": 430,
        "padding-left": 0,
        "padding-top": 70
    });
}

function hideComponentModal()
{
    $("#componentsModal").modal("hide");
}

function updateComponentByInsertionOrderId(insertionOrderId, percentageQty, linkId)
{
    console.log("In updateComponentByInsertionOrderId:");
    console.log("insertionOrderId: " + insertionOrderId);
    console.log("percentageQty: " + percentageQty);

    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "updateComponentByInsertionOrderId",
            "insertionOrderId": insertionOrderId,
            "percentageQty": percentageQty,
            "linkId": linkId
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Component_Update_Result: " + obj.Result);
        }
    });
}

function replicateMainAccAssToPOLineHavingSameCategory()
{
    console.log("In replicateMainAccAssWithPOLineHavingSameCategory:");

    var currentPoLineInsertionOrderId = $("#ItemNumberSelect").val();
    console.log("currentPoLineInsertionOrderId: " + currentPoLineInsertionOrderId);

    var currentPoLineAccAssCat = "";
    var currentPoLineLinkId = "";
    var currentPoLineDistribution = "";
    $("#material_headerClass tbody tr").each(function() {
        var poLineInsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();

        if (currentPoLineInsertionOrderId === poLineInsertionOrderId) {
            currentPoLineAccAssCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            currentPoLineLinkId = $(this).find("td").eq(0).children(".linkId_Class").val();
            currentPoLineDistribution = $(this).find("td").eq(0).children(".PODistribution").val();
        }
    });
    console.log("currentPoLineAccAssCat: " + currentPoLineAccAssCat);
    console.log("currentPoLineLinkId: " + currentPoLineLinkId);
    console.log("currentPoLineDistribution: " + currentPoLineDistribution);

    var poLineDetailsArr = [];
    $("#material_headerClass tbody tr").each(function() {
        var poLineInsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var accAsgnCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
        var itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
        var linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
        var poLineQty = $(this).find("td").eq(6).children(".pr-quantity").val();
        var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
        var prItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();

        console.log("accAsgnCat: " + accAsgnCat);
        console.log("itemCat: " + itemCat);
        console.log("linkId: " + linkId);
        console.log("poLineQty: " + poLineQty);
        console.log("poLineInsertionOrderId: " + poLineInsertionOrderId);
        console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);
        console.log("prItemNumber: " + prItemNumber);

        if (accAsgnCat !== "") {
            if (currentPoLineInsertionOrderId !== poLineInsertionOrderId && accAsgnCat === currentPoLineAccAssCat) {
                var poLineDetails = {};
                poLineDetails["linkId"] = linkId;
                poLineDetails["insertionOrderId"] = poLineInsertionOrderId;
                poLineDetails["quantity"] = removeCommaInNumber(poLineQty).toString();
                poLineDetails["isPoLineOrPrLineOrRfqLineOrEmptyLine"] = isPoLineOrPrLineOrRfqLineOrEmptyLine;
                poLineDetails["prItemNumber"] = prItemNumber;
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

        var prType = $("#PrType").val();
        console.log("prType: " + prType);

        $("#overlay").css("display", "block");
        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "replicateMainAccAssToPOLineHavingSameCategory",
                    "currentPoLineInsertionOrderId": currentPoLineInsertionOrderId,
                    "currentPoLineLinkId": currentPoLineLinkId,
                    "currentPoLineDistribution": currentPoLineDistribution,
                    "poLineDetailsJsonArr": poLineDetailsJsonArr,
                    "prType": prType
                },
                error: function(error) {
                    console.log("error: " + error);
                    $("#overlay").css("display", "none");
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Replicate_Main_Acc_Ass_Result: " + obj.Result);
                    $("#overlay").css("display", "none");
                    Lobibox.alert("success", {
                        msg: "Account Assignment has been replicated in other PO Lines successfully."
                    });
                }
            });
        }, 100);
    }
}

function replicateServiceAccAss()
{
    console.log("In replicateServiceAccAss:");

    var currentPoLineInsertionOrderId = $("#ItemNumberSelect").val();
    console.log("currentPoLineInsertionOrderId: " + currentPoLineInsertionOrderId);

    var currentPoLineAccAssCat = "";
    var currentPoLineLinkId = "";
    $("#material_headerClass tbody tr").each(function() {
        var poLineInsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();

        if (currentPoLineInsertionOrderId === poLineInsertionOrderId) {
            currentPoLineAccAssCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            currentPoLineLinkId = $(this).find("td").eq(0).children(".linkId_Class").val();
        }
    });
    console.log("currentPoLineAccAssCat: " + currentPoLineAccAssCat);
    console.log("currentPoLineLinkId: " + currentPoLineLinkId);

    var selectedServiceAccAssDist = serviceTabTableCurrentTd.parent().children(".ServiceAccAssDist").val();
    var selectedServiceLinkId = serviceTabTableCurrentTd.parent().children(".ServiceLinkId").val();
    var selectedServiceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();

    console.log("selectedServiceAccAssDist: " + selectedServiceAccAssDist);
    console.log("selectedServiceLinkId: " + selectedServiceLinkId);
    console.log("selectedServiceLineItemNumber: " + selectedServiceLineItemNumber);

    var servicesDetailsArr = [];
    $("#serviceTableId tbody tr").each(function() {
        var serviceLinkId = $(this).find("td").eq(0).children(".ServiceLinkId").val();
        var serviceLineItemNumber = $(this).find("td").eq(2).children(".lineItemNumberServices").val();
        var serviceLineQuantity = $(this).find("td").eq(5).children(".quantity_Services").val();
        var serviceLineGrossPrice = $(this).find("td").eq(7).children(".grossPrice_Services").val();

        console.log("serviceLinkId: " + serviceLinkId);
        console.log("serviceLineItemNumber: " + serviceLineItemNumber);
        console.log("serviceLineQuantity: " + serviceLineQuantity);
        console.log("serviceLineGrossPrice: " + serviceLineGrossPrice);

        if (selectedServiceLineItemNumber !== serviceLineItemNumber && selectedServiceLinkId !== serviceLinkId) {
            if (serviceLineQuantity !== "" && serviceLineGrossPrice !== "") {
                var serviceDetailsObj = {};
                serviceDetailsObj["serviceLinkId"] = serviceLinkId;
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
        else
        {
            var servicesDetailsJsonArr = JSON.stringify(servicesDetailsArr);
            console.log("servicesDetailsJsonArr: " + servicesDetailsJsonArr);

            var PoFrom = $("#PoFrom").val();
            console.log("PoFrom: " + PoFrom);

            $("#overlay").css("display", "block");
            setTimeout(function() {
                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "replicateServiceAccAss",
                        "currentPoLineInsertionOrderId": currentPoLineInsertionOrderId,
                        "currentPoLineLinkId": currentPoLineLinkId,
                        "selectedServiceLinkId": selectedServiceLinkId,
                        "selectedServiceLineItemNumber": selectedServiceLineItemNumber,
                        "selectedServiceAccAssDist": selectedServiceAccAssDist,
                        "servicesDetailsJsonArr": servicesDetailsJsonArr,
                        "poFrom": PoFrom
                    },
                    error: function(error) {
                        console.log("error: " + error);
                        $("#overlay").css("display", "none");
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("Replicate_Service_Acc_Ass_Result: " + obj.Result);

                        var accountAssignmentCategory = $("#accountAssignmentCategory").val();
                        console.log("accountAssignmentCategory: " + accountAssignmentCategory);

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