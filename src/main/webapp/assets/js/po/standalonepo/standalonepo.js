var amountArr = [];
var perArr = [];
var canValArr = [];
var condType = [];
var condName = [];
var serviceTabTableCurrentTd;
var pickListKeyCode = $("#pickListKeyCode").val();
console.log("pickListKeyCode: " + pickListKeyCode);
$(document).ready(function() {
    $("#overlay").css("display", "none");
    var date = moment();
    console.log(date.format('DD-MM-YYYY'));
    $("#transactionInitiatedOn").html(date.format('DD-MM-YYYY'));
    var creat_Edit = $("#creat_Edit").val();
    if (creat_Edit === "edit") {
        var referenceDocType = $("#referenceDocType").val();
        if (referenceDocType === "N/A") {
            $("#referenceDocNumber").prop('disabled', true);
            $("#referenceDocLine").prop('disabled', true);
        }
        var prType = $("#prType").val();
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("td").eq(13).children(".requisitionDateClass").prop("min", new Date());
            $(this).find("input,select").prop("disabled", true);
            var prReturnsItem = $(this).find("td").eq(0).children(".prReturnsItemHidden").val();
            var prFreeOfCharge = $(this).find("td").eq(0).children(".prFreeOfChargeHidden").val();
            if (prReturnsItem === "Yes") {
                $(this).find("td").eq(33).children(".prReturnsItem").prop("checked", true);
            } else {
                $(this).find("td").eq(33).children(".prReturnsItem").prop("checked", false);
            }
            if (prFreeOfCharge === "Yes") {
                $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked", true);
            } else {
                $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked", false);
            }
        });
        hidePoLineTableColsByPoType();
        $("#prType").prop('disabled', true);
        var compCode = $("#companycodeHeader").val();
        getVendorByCompanycode(compCode);
        $("#createStandalonePoBtn").prop("disabled", false);
        if (prType === "Service") {
            $("#account_assignment-tab :input").prop("disabled", true);
            $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
        }

        var kalsm = $("#kalsmHiddenfield").val();
//        getAllByPricingProcedure(kalsm);
        findSAHeaderConditionsByExtId();
    }

    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllPaymentTerms"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            if (obj.length !== 0) {
                var option = "";
                for (var i = 0; i < obj.length; i++) {
                    option += "<option value=" + obj[i].PAYMENT_TERMS + ">" + obj[i].PAYMENT_TERMS + "-" + obj[i].DESCRIPTION + "</option>";
                }
                $("#paymentTermsDelivery").append(option);
            }
        }
    });
    if (creat_Edit === "new") {
        var compCode = $("#companyCodeNew").val();
        var typeOfPO = $("#typeOfPONew").val();
        var paymentTerms = $("#paymentTermsNew").val();
        var grMessage = $("#grMessageNew").val();
        if (grMessage === "Yes") {
            $("#GRMessage").prop("checked", true);
        } else {
            $("#GRMessage").prop("checked", false);
        }
        var isAckReg = $("#isAckReqNew").val();
        if (isAckReg === "Yes") {
            $("#isAckReq").prop("checked", true);
        } else {
            $("#isAckReq").prop("checked", false);
        }
        $("#companycodeHeader").val(compCode);
        $("#typeOfPOHeader").val(typeOfPO);
//        alert(paymentTerms);
        $("#paymentTermsDelivery").val(paymentTerms);
        getVendorByCompanycode(compCode);
    }

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
        if (DeliveryDateArray.length !== 0)
        {
            var smallestDate = "";
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber)
                {
                    var date = DeliveryDateArray[0].getDate();
                    var month = DeliveryDateArray[0].getMonth();
                    var year = DeliveryDateArray[0].getFullYear();
                    month = month + 1;
                    date = date < 10 ? ("0" + date) : date;
                    month = month < 10 ? ("0" + month) : month;
                    smallestDate = year + "-" + month + "-" + date;
                    console.log("smallestDate: " + smallestDate);
                    $(this).find("td").eq(15).children(".deliveryDateClass").val(smallestDate);
                }
            });
        }
    });
    $("#material_headerClass").on("change", ".check-negative-value", function() {
        var val = $(this).val();
        if (Number(val) < 0)
        {
            console.log("-----------");
            $(this).val("");
        }
        if (Number(val) === -0)
        {
            console.log("-0-0-0-0-0-0-0-0-0-0-");
            $(this).val("");
        }
    });
    $("#serviceTableId").on("change", ".check-negative-value", function() {
        var val = $(this).val();
        if (Number(val) < 0)
        {
            console.log("-----------");
            $(this).val("");
        }
        if (Number(val) === -0)
        {
            console.log("-0-0-0-0-0-0-0-0-0-0-");
            $(this).val("");
        }
    });
    if ($("#docDateHeader_div").length) {
        $('#docDateHeader_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date(),
            defaultDate: new Date()
        });
    }

    if ($("#validityFromHeader_div").length) {
        $(function() {
            $('#validityFromHeader_div').datetimepicker({
                format: 'DD-MM-YYYY',
                minDate: new Date()
            });
            $('#validityToHeader_div').datetimepicker({
                useCurrent: false,
                format: 'DD-MM-YYYY',
                minDate: new Date()
            });
            $("#validityFromHeader_div").on("change.datetimepicker", function(e) {
                $('#validityToHeader_div').datetimepicker('minDate', e.date);
            });
            $("#validityToHeader_div").on("change.datetimepicker", function(e) {
                $('#validityFromHeader_div').datetimepicker('maxDate', e.date);
            });
        });
    }

    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getStockType"
        },
        complete: function(responseJson) {
            var jsonVendorArr = $.parseJSON(responseJson.responseText);
            jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));
            if (jsonVendorArr.length !== 0) {
                var option = "";
                for (var i = 0; i < jsonVendorArr.length; i++) {
                    option += "<option>" + jsonVendorArr[i].stockType + "</option>";
                }
                $("#StockType").append(option);
            }
        }
    });
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllShippingInstruction"
        },
        complete: function(responseJson) {
            var jsonShipInstArr = $.parseJSON(responseJson.responseText);
            jsonShipInstArr = JSON.parse(JSON.stringify(jsonShipInstArr));
            if (jsonShipInstArr.length !== 0) {
                var option = "";
                for (var i = 0; i < jsonShipInstArr.length; i++) {
                    option += "<option>" + jsonShipInstArr[i].shippingInst + "</option>";
                }
                $("#ShippingInstruction").append(option);
            }
        }
    });
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindAllMasterQAControl"
        },
        complete: function(responseJson) {
            var qaCtrlList = $.parseJSON(responseJson.responseText);
            qaCtrlList = JSON.parse(JSON.stringify(qaCtrlList));
            if (qaCtrlList.length !== 0) {
                var option = "";
                console.log("qaCtrlList.length: " + qaCtrlList.length);
                for (var i = 0; i < qaCtrlList.length; i++) {
                    option += "<option>" + qaCtrlList[i].QAControl + "</option>";
                }
                $("#QAControlLife").append(option);
            }

        }
    });
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindAllMasterCustomerSegment"
        },
        complete: function(responseJson) {
            var custSeglist = $.parseJSON(responseJson.responseText);
            custSeglist = JSON.parse(JSON.stringify(custSeglist));
            console.log("custSeglist.length: " + custSeglist.length);
            if (custSeglist.length !== 0) {
                var option = "";
                for (var i = 0; i < custSeglist.length; i++) {
                    option += "<option>" + custSeglist[i].segment + "</option>";
                }
                $("#SegmentDescriptionLine").append(option);
                $("#SegmentDescription").append(option);
            }
        }
    });
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "findBuyerPurchasingGroupMappingList"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            if (obj.length !== 0) {
                var option = "";
                for (var i = 0; i < obj.length; i++) {
                    option += "<option value='" + obj[i].purchasingGroupCode + "'>" + obj[i].purchasingGroupCode + " - " + obj[i].purchasingGroupDesc + "</option>";
                }
                $("#purchasingGroup").append(option);
            }
        }
    });
    var creat_Edit = $("#creat_Edit").val();
    if (creat_Edit === "edit") {
        var prType = $("#prType").val();
        if (prType === "Material") {
            $("#serviceTab_li").css("display", "none");
            $("#services-tab").removeClass("active");
            $("#services").removeClass("active");
            $("#limits_li").css("display", "none");
//            $("#quantities").addClass("active");
//            $("#quantities-tab").addClass("active");
//            $("#quantities-tab").addClass("show");
            $("#material_linelevel").addClass("active");
            $("#material_linelevel-tab").addClass("active");
            $("#material_linelevel-tab").addClass("show");
        }
        var ro_purchasingGroup = $("#ro_purchasingGroup").val();
        $("#purchasingGroup").val(ro_purchasingGroup);
    }

    $("#uploadDocumentBtn").click(function() {
        $("#prlineitemattachmentmodal").modal("show");
    });
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
    var lastExtId = "";
    $("#addPrLineBtn").click(function() {
        var itemNumberArr = [];
        var itemNumberForItemDropDownArr = [];
        var rowCount = $('#material_headerClass tr').length;
        var prtype = $("#prType").val();
        var errorMsg;
        var currency = "";
        var purGroup = $("#purchasingGroup").val();
        var purOrg = $("#purchasingOrg").val();
        var companyCodeHeader = $("#companycodeHeader").val();
        if (companyCodeHeader === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Company Code !";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#companycodeHeader").focus();
            return false;
        }

        $(".collapseDivHeader").find(".active").removeClass("active");
        if (purOrg === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Purchasing Org in Org Data tab!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            $("#purchasingOrg").focus();
            return false;
        }
        if (purGroup === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Purchasing Group in Org Data tab!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            $("#purchasingGroup").focus();
            return false;
        }
        if (prtype === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.alert("error", {
                msg: "Please select PR type first !"
            });
        } else if (prtype !== "") {
            var poid = $("#poid").val();
            if (poid === '') {
                $.ajax({
                    type: "GET",
                    url: "doajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "getLastExtId"
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        lastExtId = obj.LASTEXTID;
                        console.log("Last Ext Id in getLastExtId :" + lastExtId);
                        if (lastExtId === undefined || lastExtId === "") {
                            lastExtId = '0';
                            console.log("lastExtId Again in IF:" + lastExtId);
                        }
                    }
                });
            }

            var creat_Edit = $("#creat_Edit").val();
            if (creat_Edit === "edit") {
                var linkid = $("#material_headerClass tbody tr").find('td').eq(0).children('.linkid').val();
                lastExtId = linkid.toString().split("-")[1] - 1;
            }
            var plant = "";
            var itemCategory = "";
            var accAssgnCat = "";
            var requisitioner = "";
            var trackNum = "";
            var matlGroup = "";
            var delDateCat = "";
            if (creat_Edit === "new") {
                plant = $("#plantNew").val();
                itemCategory = $("#itemCategoryNew").val();
                accAssgnCat = $("#accAssgnCatNew").val();
                requisitioner = $("#requisitionerNew").val();
                trackNum = $("#trackNumNew").val();
                matlGroup = $("#matlGroupNew").val();
                delDateCat = $("#delDateCatNew").val();
//                $("#material_headerClass tbody tr").each(function() {
//                    $(this).find("td").eq(2).children(".accountAssignmentClass").val(accAssgnCat);
//                    $(this).find("td").eq(3).children(".itemCategoryClass").val(itemCategory);
//                    $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val(delDateCat);
//                    $(this).find("td").eq(16).children(".plantClass").val(plant);
//                    $(this).find("td").eq(17).children(".matlGroup").val(matlGroup);
//                    $(this).find("td").eq(23).text(requisitioner);
//                    $(this).find("td").eq(29).children(".trackingNumber").val(trackNum);
//
//                });
            }
            var current_datetime = new Date();
            var day = current_datetime.getDate();
            var mon = current_datetime.getMonth() + 1;
            if (Number(day) < 10)
            {
                day = "0" + day;
            }
            if (Number(mon) < 10)
            {
                mon = "0" + mon;
            }

//            var formatted_date = current_datetime.getFullYear() + "-" + mon + "-" + day;
            var formatted_date = day + "." + mon + "." + current_datetime.getFullYear();
            console.log(formatted_date);
            var uom = "";
            if (prtype === "Service")
            {
                uom = "AU";
            }
            var int_lastitemNumber = "";
            if (rowCount === 1) {
                int_lastitemNumber = 10;
                var prOption = "<option>" + 'PR-' + (parseInt(lastExtId) + 1) + '-10' + "</option>";
                $("#referenceDocNumber").append(prOption);
//                $("#DeliveryScheduleTableId tbody tr").find("td").eq(4).children(".prNumberDeliveryScheduledClass").val('PR-' + (parseInt(lastExtId) + 1) + '-10');
                var itemNumber = "<option>10</option>";
                $("#referenceDocLine").append(itemNumber);
//                $("#DeliveryScheduleTableId tbody tr").find("td").eq(5).children(".reqItemNumberClass").val(10);
                var trow = "<tr>"
                        + "<td><input type=hidden class=PODistribution>\n\
                        <input type=hidden class=POPartialInvoiceIndicator>\n\
                        <input type=hidden class=prTaxCode><i class='fa fa-window-close delete-pr-line' aria-hidden='true'></i>\n\
                        <input type='hidden' class='linkid' value='SA-" + (parseInt(lastExtId) + 1) + "-10'>\n\
                        <input type='hidden' class='prNumber' value='PR-" + (parseInt(lastExtId) + 1) + "-10'>\n\
                        <input type='hidden' class='prgLCode'>\n\
                        <input type='hidden' class='przGLCode'>\n\
                        <input type='hidden' class='isLineLevelDataSavedSaved' value='No'>\n\
                        <input type='hidden' class='isPrSaved' value='No'>\n\
                        <input type='hidden' class='ConfirmationControlForLineInPr'>\n\
                        <input type='hidden' class='TexCodeForLineInPr'>\n\
                        <input type='hidden' class='SegmentForLineInPr'>\n\
                        <input type='hidden' class='prMfrPartNumber'>\n\
                        <input type='hidden' class='prManufacturer'>\n\
                        <input type='hidden' class='prReturnsItemHidden'>\n\
                        <input type='hidden' class='prFreeOfChargeHidden'>\n\
                        <input type='hidden' class='prNetPriceHidden'>\n\
                        <input type='hidden' class='timeOfChangeCurrency' value='before'></td>"
                        + "<td>10</td>"
                        + "<td><input type='text' class='accountAssignmentClass form-control form-rounded' value='" + accAssgnCat + "' style='width:35px;'></td>"
                        + "<td><input type='text' class='itemCategoryClass form-control form-rounded' value='" + itemCategory + "' style='width:35px;'></td>"
                        + "<td><input type='text' class='materialCodeClass form-control form-rounded' style='width:100px;'></td>"
                        + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value=''>Select</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
                        + "<td><input type=text class='form-control form-rounded prShortText' style='width:340px;'></td>"
                        + "<td></td>"
                        + "<td><input style='width:150px;' type='text' value='1.000' min='0' class='form-control form-rounded quantity_Class check-negative-value'></td>"
                        + "<td><input style='width:150px;' type=text min='0' class='form-control form-rounded prNetPrice check-negative-value'></td>"
                        + "<td><input style='width:150px;' type=text min='0' class='form-control form-rounded prPerUnit check-negative-value'></td>"
                        + "<td><input type='text' value='' class='currencyClass form-control form-rounded' disabled style='width:70px;'></td>"
                        + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value=''></td>"
                        + "<td><input type=text class='form-control form-rounded pODeliveryDateCetegory' value=" + delDateCat + " style='width:35px;'></td>"
                        + "<td><input style='width:90px;display: inline;' readonly type='text' value='" + formatted_date + "' class='requisitionDateClass form-control form-rounded'> <input type='hidden' class='prSARequisitionDatepicker'></td>"
                        + "<td><input style='width:90px;display: inline;' readonly type='text' class='deliveryDateClass form-control form-rounded' value='" + formatted_date + "'> <input type='hidden' class='prSADeliveryDatepicker'></td>"
                        + "<td><input type='text' style='width:70px;' class='plantClass form-control form-rounded' value=" + plant + "></td>"
                        + "<td><input type='text' class='matlGroup form-control form-rounded' style='width:100px;' value= " + matlGroup + "></td>"
                        + "<td><input type='text' class='purchaseOrgClass form-control form-rounded' disabled style='width:70px;'></td>"
                        + "<td><input type='text' class='purchaseGroupClass form-control form-rounded' disabled style='width:100px;'></td>"
                        + "<td><input type='text' class='storageLocationClass form-control form-rounded' style='width:100px;'></td>"
                        + "<td></td>"
                        + "<td></td>"
                        + "<td>" + requisitioner + "</td>"
                        + "<td></td>"
                        + "<td><input type='text' value='' class='prDeptNameClass form-control form-rounded' style='width:200px;'></td>"
                        + "<td style='display: none'><input type='text' value='' class='poDeptNameClass form-control form-rounded'></td>"
                        + "<td></td>"
                        + "<td></td>"
                        + "<td><input type='text' class='trackingNumber form-control form-rounded' value='" + trackNum + "' style='width:70px;'></td>"
                        + "<td></td>"
                        + "<td><input type = 'text' class = 'prUom form-control form-rounded' style='width:50px;' value='" + (uom === undefined ? "" : uom) + "' disabled='true'></td>"
                        + "<td><input type = 'text' class = 'prImMaterial form-control form-rounded' style = 'width:100px;' readonly></td>"
                        + "<td><input type = 'checkbox' class = 'prReturnsItem'></td>"
                        + "<td><input type = 'checkbox' class = 'prFreeOfCharge'></td>"
                        + "<td><input type = 'text' class = 'form-control form-rounded prRfqNo' style = 'width:150px;' readonly></td>"
                        + "<td><input type = 'text' class = 'form-control form-rounded prRfqItemNo' style = 'width:70px;' readonly></td>"
                        + "</tr>";
                $("#material_headerClass").children("tbody").append(trow);
            } else {
                var ch = prLineItemTableValidation();
                if (ch === "1") {
                    return false;
                }
                $("#material_headerClass tbody tr").each(function() {
                    var itemNumber = $(this).find("td").eq(1).html();
                    itemNumberArr.push(itemNumber);
                });
                var lastitemNumber = itemNumberArr[itemNumberArr.length - 1];
                int_lastitemNumber = parseInt(lastitemNumber) + 10;
                var prOption = "<option>" + 'PR-' + (parseInt(lastExtId) + 1) + '-' + int_lastitemNumber + "</option>";
                $("#referenceDocNumber").append(prOption);
                var itemNumber = "<option>" + int_lastitemNumber + "</option>";
                $("#referenceDocLine").append(itemNumber);
                var trow = "<tr>"
                        + "<td><input type=hidden class=PODistribution>\n\
                        <input type='hidden' class=POPartialInvoiceIndicator>\n\
                        <input type='hidden' class=prTaxCode>\n\
                        <i class='fa fa-window-close delete-pr-line' aria-hidden='true'></i>\n\
                        <input type='hidden' class='linkid' value='SA-" + (parseInt(lastExtId) + 1) + "-" + int_lastitemNumber + "'>\n\
                        <input type='hidden' class='prNumber' value='PR-" + (parseInt(lastExtId) + 1) + "-" + int_lastitemNumber + "'>\n\
                        <input type='hidden' class='prgLCode'>\n\
                        <input type='hidden' class='przGLCode'>\n\
                        <input type='hidden' class='isLineLevelDataSavedSaved' value='No'>\n\
                        <input type='hidden' class='isPrSaved' value='No'>\n\
                        <input type='hidden' class='ConfirmationControlForLineInPr'>\n\
                        <input type='hidden' class='TexCodeForLineInPr'>\n\
                        <input type='hidden' class='SegmentForLineInPr'>\n\
                        <input type='hidden' class='prMfrPartNumber'>\n\
                        <input type='hidden' class='prManufacturer'>\n\
                        <input type='hidden' class='prReturnsItemHidden'>\n\
                        <input type='hidden' class='prFreeOfChargeHidden'>\n\
                        <input type='hidden' class='prNetPriceHidden'>\n\
                        <input type='hidden' class='timeOfChangeCurrency' value='before'></td>"
                        + "<td>" + int_lastitemNumber + "</td>"
                        + "<td><input type='text' class='accountAssignmentClass form-control form-rounded' value='" + accAssgnCat + "' style='width:35px;'></td>"
                        + "<td><input type='text' class='itemCategoryClass form-control form-rounded' value='" + itemCategory + "' style='width:35px;'></td>"
                        + "<td><input type='text' class='materialCodeClass form-control form-rounded' style='width:100px;'></td>"
                        + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value=''>Select</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
                        + "<td><input type=text class='form-control form-rounded prShortText' style='width:340px;'></td>"
                        + "<td></td>"
                        + "<td><input type='text' value='1.000' style='width:150px;' min='0' class='form-control form-rounded quantity_Class check-negative-value'></td>"
                        + "<td><input type=text style='width:150px;' min='0' class='form-control form-rounded prNetPrice check-negative-value'></td>"
                        + "<td><input type=text style='width:150px;' min='0' class='form-control form-rounded prPerUnit check-negative-value'></td>"
                        + "<td><input type='text' value='' class='currencyClass form-control form-rounded' disabled style='width:70px;'></td>"
                        + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value=''></td>"
                        + "<td><input type=text class='form-control form-rounded pODeliveryDateCetegory' value=" + delDateCat + " style='width:35px;'></td>"
                        + "<td><input style='width:90px;display: inline;' readonly type='text' value='" + formatted_date + "' class='requisitionDateClass form-control form-rounded'> <input type='hidden' class='prSARequisitionDatepicker'></td>"
                        + "<td><input style='width:90px;display: inline;' readonly type='text' class='deliveryDateClass form-control form-rounded' value='" + formatted_date + "'> <input type='hidden' class='prSADeliveryDatepicker'></td>"
                        + "<td><input type='text' style='width:70px;' class='plantClass form-control form-rounded' value=" + plant + "></td>"
                        + "<td><input type='text' class='matlGroup form-control form-rounded' style='width:100px;' value=" + matlGroup + "></td>"
                        + "<td><input type='text' class='purchaseOrgClass form-control form-rounded' disabled style='width:70px;'></td>"
                        + "<td><input type='text' class='purchaseGroupClass form-control form-rounded' disabled style='width:100px;'></td>"
                        + "<td><input type='text' class='storageLocationClass form-control form-rounded' style='width:100px;'></td>"
                        + "<td></td>"
                        + "<td></td>"
                        + "<td>" + requisitioner + "</td>"
                        + "<td></td>"
                        + "<td><input type='text' class='prDeptNameClass form-control form-rounded' style='width:200px;'></td>"
                        + "<td style='display: none'><input type='text' class='poDeptNameClass form-control form-rounded'></td>"
                        + "<td></td>"
                        + "<td></td>"
                        + "<td><input type='text' class='trackingNumber form-control form-rounded' value='" + trackNum + "' style='width:70px;'></td>"
                        + "<td></td>"
                        + "<td><input type = 'text' class = 'prUom form-control form-rounded' style='width:50px;' value='" + (uom === undefined ? "" : uom) + "' disabled='true'></td>"
                        + "<td><input type = 'text' class = 'prImMaterial form-control form-rounded' style = 'width:100px;' readonly></td>"
                        + "<td><input type = 'checkbox' class = 'prReturnsItem'></td>"
                        + "<td><input type = 'checkbox' class = 'prFreeOfCharge'></td>"
                        + "<td><input type = 'text' class = 'form-control form-rounded prRfqNo' style = 'width:150px;' readonly></td>"
                        + "<td><input type = 'text' class = 'form-control form-rounded prRfqItemNo' style = 'width:70px;' readonly></td>"
                        + "</tr>";
                $("#material_headerClass tbody tr").each(function() {
                    $(this).find("input,select").prop("disabled", true);
                });
                $("#material_headerClass").children("tbody").append(trow);
            }

            $('.prSARequisitionDatepicker').each(function() {
                $(this).datepicker({
                    showOn: "button",
                    buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                    minDate: 0,
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '2020:2050',
                    showWeek: true
                });
            });
            if ($("#prType").val() === "Material") {
                $('.prSADeliveryDatepicker').each(function() {
                    $(this).datepicker({
                        showOn: "button",
                        buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                        minDate: 0,
                        changeMonth: true,
                        changeYear: true,
                        yearRange: '2020:2050',
                        showWeek: true
                    });
                });
            } else if ($("#prType").val() === "Service") {
                $('.prSADeliveryDatepicker').each(function() {
                    $(this).datepicker({
                        showOn: "button",
                        buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                        changeMonth: true,
                        changeYear: true,
                        yearRange: '2020:2050',
                        showWeek: true
                    });
                });
            }
            hidePoLineTableColsByPoType();

//            $('#material_headerClass tbody tr').each(function() {
//                $(this).find("td").eq(26).children(".poDeptNameClass").css("display", "none");
//            });
            var typeOfPOHeader = $("#typeOfPOHeader").val();
            var prType = $("#prType").val();
            if (prType === "Service") {
                $("#material_headerClass tbody tr").each(function() {
                    $(this).find("td").eq(3).children(".itemCategoryClass").val("D");
                    $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val("D");
                    $(this).find("td").eq(5).children(".poCriticality").prop("disabled", false);
                    $(this).find("td").eq(4).children(".materialCodeClass").prop("disabled", true);
                    $(this).find("td").eq(9).children(".prNetPrice").prop("disabled", true);
                    $(this).find("td").eq(12).children(".prOrderPriceUnit").val("AU")
                });
            } else if (prType === "Material") {
                $("#material_headerClass tbody tr").each(function() {
//                    $(this).find("td").eq(9).children(".prNetPrice").prop("disabled", false);
//                    $(this).find("td").eq(10).children(".prPerUnit").prop("disabled", false);
                    $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val("D");
                    $(this).find("td").eq(17).children(".matlGroup").prop("disabled", true);
                    $(this).find("td").eq(16).children(".plantClass").prop("disabled", true);
                    $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", true);
                    if (typeOfPOHeader === "Ferrous PO - Local") {
                        $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", false);
                    }
                });
            }
            $("#DeliveryScheduleTableId tbody tr").each(function() {
                $(this).find("td").eq(0).children(".deliveryDateCategory").val("D");
                $(this).find("td").eq(1).children(".deliveryDateClass").val(formatted_date);
            });
//            var typeOfPOHeader = $("#typeOfPOHeader").val();
//            if (typeOfPOHeader === "Ferrous PO - Local") {
//                $("#material_headerClass tbody tr").each(function() {
//                    $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", false);
//                });
//            }
        }

        /*For Add Item Number to DropDown Start*/
        $("#material_headerClass tbody tr").each(function() {
            var itemNumber = $(this).find("td").eq(1).html();
            itemNumberForItemDropDownArr.push(itemNumber);
        });
        var option = "";
        for (var i = 0; i < itemNumberForItemDropDownArr.length; i++) {
            option = "<option value = " + itemNumberForItemDropDownArr[i] + "> " + itemNumberForItemDropDownArr[i] + "</option>";
        }
        $("#ItemNumberSelect").append(option);
//        $("#ItemNumberSelect").val(int_lastitemNumber);
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        $("#ItemNumberSelect").val("");
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("td").eq(18).children(".purchaseOrgClass").val(purOrg);
            $(this).find("td").eq(19).children(".purchaseGroupClass").val(purGroup);
            $(this).find("td").eq(30).text(companyCodeHeader);
            if (companyCodeHeader === '0640' || companyCodeHeader === '0641') {
                $(this).find("td").eq(11).children(".currencyClass").val("SGD");
                $(this).find('td').eq(11).children(".currencyClass").attr("value", "SGD");
                currency = "SGD";
            } else if (companyCodeHeader === '0680') {
                $(this).find("td").eq(11).children(".currencyClass").val("MYR");
                $(this).find('td').eq(11).children(".currencyClass").attr("value", "MYR");
                currency = "MYR";
            }
            var current = $(this);
            if (typeOfPOHeader === "Ferrous PO - Local") {
                current.find("td").eq(2).children(".accountAssignmentClass").val("");
            }
        });
        /*For Add Item Number to DropDown End*/

        $("#serviceTableId tbody tr").each(function() {
            if ($(this).find("td").eq(0).children('.checkboxServices').prop("checked") === true) {
                $(this).find("td").eq(0).children('.checkboxServices').prop("checked", false);
            }
        });
        $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
        $("#replicateServiceAccAssgnModelBtn_div").css("display", "none");
        checkboxServicesArr = [];
        ifServiceIsEmpty(currency);
        ifDeliveryScheduleIsEmpty();
        var headerConditionTableLength = $("#conditionTableId tbody tr").length;
        console.log("headerConditionTableLength :" + headerConditionTableLength);
        ifConditionIsEmpty();
        $("#saveLineItemData").prop("disabled", true);
//        $("#createStandalonePoBtn").prop("disabled", true);
        $('#hideLineLevelData').css("display", "none");
        $("#OverallLimit").val("");
        $("#ExpectedValue").val("");
        $("#NoLimit").prop("checked", false);
        $("#delivery-tab :input").val("");
        $("#OverdeliveryTolerance").val("0.0");
        $("#UnderdeliveryTolerance").val("0.0");
        $("#invoice-tab :input").val("");
        $("#InvoiceReceipt").prop("checked", true);
        $("#FinalInvoice").prop("checked", false);
        $("#GRBasedIV").prop("checked", false);
        $("#serviceBasedIV").prop("checked", true);
        $("#account_assignment-tab :input").val("");
        $("#costCenteraccountAssignmentTebleId").find("tbody tr").remove();
        $("#distribution").val("Single Account Assignment");
        $("#CoCode").val($("#companycodeHeader").val());
//        $("#texts-tab :input").val("");
        $("#texts-tab").children("textarea").val("");
        $("#Title").val("Company");
        $("#Name1").val("Natsteel Holdings");
        $("#Name2").val("Natsteel Holdings");
        $("#Street").val("22");
        $("#HouseNumber").val("22");
        $("#PostalCode").val("628048");
        $("#City").val("628048");
        $("#countryDesc").val("SG");
        $("#countryLimits").val("SG");
        $("#confControlLimits").val("");
        $("#OrderAck").val("");
        $("#ConfirmationRequired").prop("checked", false);
        $("#PrintPrice").prop("checked", false);
        $("#EstimatedPrice").prop("checked", false);
        $("#ProductOriginLine").val("");
        $("#ProductOriginLine").val("");
        $("#SegmentDescriptionLine").val("");
//        var typeOfPOHeader = $("#typeOfPOHeader").val();
//        if(typeOfPOHeader === "Ferrous PO - Local"){
//            $("#material_headerClass tbody tr").each(function(){
//               $(this).find("td").eq(2).children(".accountAssignmentClass").val(""); 
//            });
//        }
    });
    $("#material_headerClass").on("change", ".deliveryDateClass", function() {
        var delDate = $(this).val();
        $("#DeliveryScheduleTableId tbody tr").each(function() {
            $(this).find("td").eq(1).children(".deliveryDateClass").val(delDate);
        });
    });
    var currentPrLineRow = '';
    $("#material_headerClass").on("keypress", ".accountAssignmentClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accountAssignmentCategoryModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            currentPrRow = $(this).parent().parent();
            getAllAccountAssignmentCategory();
        }
    });
    var accAsgnCatTable = null;
    function getAllAccountAssignmentCategory() {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllAccountAssignmentCategory"
            },
            complete: function(responseJson) {
                var jsonAccAsgnArr = $.parseJSON(responseJson.responseText);
                jsonAccAsgnArr = JSON.parse(JSON.stringify(jsonAccAsgnArr));
                console.log("jsonAccAsgnArr length :" + jsonAccAsgnArr.length);
                var row = "";
                for (var i = 0; i < jsonAccAsgnArr.length; i++) {
                    row += "<tr class='accountAssignmentModalTableTrClass'>"
                            + "<td>" + jsonAccAsgnArr[i].accountAssignmentCode + "</td>"
                            + "<td>" + jsonAccAsgnArr[i].accountAssignmentCategory + "</td>"
                            + "</tr>";
                }
                $("#accountAssignmentCategoryTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#accountAssignmentCategoryTableId')) {
                    accAsgnCatTable.destroy();
                    accAsgnCatTable = null;
                    $("#accountAssignmentCategoryTableId").children('tbody').html(row);
                    accAsgnCatTable = $('table.accountAssignmentCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    accAsgnCatTable.buttons().container()
                            .appendTo('#accountAssignmentCategoryTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#accountAssignmentCategoryTableId thead tr').clone(true).appendTo('#accountAssignmentCategoryTableId thead');
                    $('#accountAssignmentCategoryTableId thead tr:eq(1) th').each(function(i) {
                        $('#accountAssignmentCategoryTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (accAsgnCatTable.column(i).search() !== this.value) {
                                accAsgnCatTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    accAsgnCatTable = $('table.accountAssignmentCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    accAsgnCatTable.buttons().container()
                            .appendTo('#accountAssignmentCategoryTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    var currentClick;
    $("#costCenteraccountAssignmentTebleId").on('keypress', '.accAsgnCostCetner', function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    trackingNumber = $(this).find("td").eq(29).children(".trackingNumber").val();
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
                        $(this).find("td").eq(29).children(".trackingNumber").focus();
                        status = "empty";
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
    $("#material_headerClass").on("keypress", ".trackingNumber", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#trackingNumnerModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            currentPrRow = $(this).parent().parent();
            var companyCode = $("#companycodeHeader").val();
            getTrackingNumberByCompanyCode(companyCode);
    //        $("#reqFromPoDept").val("TrackingNumber");
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
    $("#accountAssignmentCategoryTableId").on("click", ".accountAssignmentModalTableTrClass", function() {
        var prType = $("#prType").val();
        if (prType === "Material") {
            $("#pOQuantitySKU").val("1.000");
        }
        var typeOfPOHeader = $("#typeOfPOHeader").val();

        var code = $(this).find("td").eq(0).text();
        var errorMsg = "";
        if ((code === "B" || code === "D" || code === "E" || code === "G" || code === "M" || code === "Q" || code === "T") && prType === "Service") {
            errorMsg = code + " is not valid in Service!";
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }

        if (code === "U" && prType === "Material") {
            errorMsg = code + " is not valid in Material!";
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }
        if (code === "U" && prType === "Service") {
            if (typeOfPOHeader === "Release Order for Goods" || typeOfPOHeader === "Release order for Serv") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "<b>" + typeOfPOHeader + " </b>is not valid with<b>" + " Unknown" + "</b> categoty!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").focus();
                return false;
            }
        }
        var itemCategory = currentPrLineRow.find("td").eq(3).children(".itemCategoryClass").val();
        if (itemCategory === "K" && code === "K") {
            errorMsg = "Item Category " + itemCategory + " is not valid with Account Assignment " + code + "!";
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }

//        var typeOfPOHeader = $("#typeOfPOHeader").val();
//        if (typeOfPOHeader === "Inter Company") {
//            if (code === "" && itemCategory === "") {
//                $("#interCompanyAccAsgn").css({display: "block"});
//                $(".costCenterDiv").css({display: "none"});
//            }
//
//        }

        console.log("code: " + code);
        $("#accountAssignmentCategory").val(code);
        currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").val(code);
        currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").css("border-color", "");
        var itemCat = currentPrLineRow.find("td").eq(3).children(".itemCategoryClass").val();
//        alert(prType + " ," + code);
        if (prType === "Material") {
            if (code === "" && itemCat === "L") {
//                $("#component_li").css("display", "block");
                $("#componentPopUpBtnDiv").css("display", "block");
                popValueInComponentTale();
            } else {
//                $("#component_li").css("display", "none");
                $("#componentPopUpBtnDiv").css("display", "none");
            }
        } else {
            $("#componentPopUpBtnDiv").css("display", "none");
        }
        var gLCode = currentPrLineRow.find("td").eq(0).children(".prgLCode").val();
        var glCode = "";
        if (code !== "A" && prType === "Material") {
            if (code !== 'Z') {
                glCode = currentPrLineRow.find("td").eq(0).children(".prgLCode").val();
            } else if (code === 'Z') {
                glCode = currentPrLineRow.find("td").eq(0).children(".przGLCode").val();
            }
            $("#gLAccount").val(glCode);
        }


        if (code === "A") {
            $("#accAsgnAsset").val("");
            $("#gLAccount").val("");
        }
        if (code === "F" || code === "K" || code === "R" || code === "T") {
            $("#accAsgnCommItemInput").val(glCode);
        }
        $("#accountAssignmentCategoryModal").modal("hide");
        var itemNumber = currentPrLineRow.find("td").eq(1).text();


//        $("#ItemNumberSelect").val(itemNumber);                       //Commentted by Bittu on 04122020
//        $('#hideLineLevelData').css("display", "block");              //Commentted by Bittu on 04122020


        var accountAssignmentCategory = code;
        callAllAcAsgnFun(accountAssignmentCategory, "OnLoad");

        if (prType === "Service") {
            $("#account_assignment-tab :input").prop("disabled", true);
            $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
        }
        var poid = $("#poid").val();
        if (poid === "") {
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                $(this).find("td").eq(3).children(".AmountLineLevel").val("");
                $(this).find("td").eq(5).children(".PerQuantityLineLavel").val("");
                $(this).find("td").eq(8).children(".ConditionValueLineLevel").val("");
            });
            calculationForPBXXInStandalone();
        }
        var isChecked = $("#PaymentImmediate").prop("checked");
        if (isChecked === true) {
            $("#TaxCode").val("PN");
        } else {
            $("#TaxCode").val("");
        }

        var code = $("#IncoTermsPart1").val();
        $("#incoTermsPart1Delivery").val(code);
        if (code === "DEL") {
            $("#incoTermsPart2Delivery").val("SELF DELIVER");
        } else if (code.trim() === "SC") {
            $("#incoTermsPart2Delivery").val("COLLECTION");
        } else {
            $("#incoTermsPart2Delivery").val("");
        }
        console.log("typeOfPOHeader 1024: " + $("#typeOfPOHeader").val());
        if ($("#typeOfPOHeader").val() === "PO for Services")
        {
            var accAssCat_temp1 = currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").val();
            var itemCat_temp1 = currentPrLineRow.find("td").eq(3).children(".itemCategoryClass").val();
            console.log("accAssCat_temp1: " + accAssCat_temp1);
            console.log("itemCat_temp1: " + itemCat_temp1);
            if (accAssCat_temp1 === "U" && itemCat_temp1 === "D")
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
    });

    $("#material_headerClass").on("keypress", ".itemCategoryClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#itemCategoryModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            currentPrRow = $(this).parent().parent();
            getAllItemCategory();
        }
    });
    var itemCatTable = null;
    function getAllItemCategory() {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllItemCategory"
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length getAllItemCategory:" + jsonArr.length);
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='itemCategoryModalTableTrClass'>"
                            + "<td>" + jsonArr[i].itemCategoryCode + "</td>"
                            + "<td>" + jsonArr[i].itemCategoryDesc + "</td>"
                            + "</tr>";
                }
                $("#itemCategoryTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#itemCategoryTableId')) {
                    itemCatTable.destroy();
                    itemCatTable = null;
                    $("#itemCategoryTableId").children('tbody').html(row);
                    itemCatTable = $('table.itemCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCatTable.buttons().container()
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
                            if (itemCatTable.column(i).search() !== this.value) {
                                itemCatTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    itemCatTable = $('table.itemCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCatTable.buttons().container()
                            .appendTo('#itemCategoryTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#itemCategoryTableId").on("click", ".itemCategoryModalTableTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        var desc = $(this).find("td").eq(1).text();
        var category = currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").val();
        var errorMsg = "";
        if (code === "K" && category === "K") {
            errorMsg = "Item Category " + code + " Is not valid with " + "Account Assignment " + category;
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }

        var accAsgn = currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").val();
        var prType = $("#prType").val();
        if ((prType === "Service" && desc === "Service") || (prType === "Material" && desc !== "Service")) {
            console.log("code: " + code);
            currentPrLineRow.find("td").eq(3).children(".itemCategoryClass").val(code);
        } else if ((prType === "Material" && desc === "Service")) {
            Lobibox.alert("error", {
                msg: "You can choose only Material item !"
            });
            currentPrLineRow.find("td").eq(3).children(".itemCategoryClass").val("");
        } else if (prType === "Service" && desc !== "Service") {
            Lobibox.alert("error", {
                msg: "You can choose only Service item !"
            });
            currentPrLineRow.find("td").eq(3).children(".itemCategoryClass").val("");
        }

        if (prType === "Material") {
            if (accAsgn === "" && code === "L") {
//                $("#component_li").css("display", "block");
                $("#componentPopUpBtnDiv").css("display", "block");
                popValueInComponentTale();
            } else {
//                $("#component_li").css("display", "none");
                $("#componentPopUpBtnDiv").css("display", "none");
            }
        } else {
            $("#componentPopUpBtnDiv").css("display", "none");
        }
        $("#itemCategoryModal").modal("hide");
    });
    var prAccAss = '';
    var lobiboxNotifyAlert = null;
    $("#material_headerClass").on("keypress", ".materialCodeClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#materialRequestFrom").val("FromPoLine");
            currentPrLineRow = $(this).parent().parent();
            var accAsgn = "";
            var errorMsg = "";
            accAsgn = $(this).parent().parent().find("td").eq(2).children(".accountAssignmentClass").val();
            var itemCat = $(this).parent().parent().find("td").eq(3).children(".itemCategoryClass").val();
            prAccAss = accAsgn;
            console.log("prAccAss :" + prAccAss);
            console.log("accAsgn :" + accAsgn);
            var poType = $("#typeOfPOHeader").val();
            if ((poType !== "Inter Company" && poType !== "PO for Group Trade" && poType !== "PO for Associate Trade" && poType !== "PO for 3rd Party Trade" && poType !== "Ferrous PO - Local") && accAsgn === "") {
                if (accAsgn === "" && itemCat !== "L") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please select Account Assignment!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    $("#overlay").css("display", "none");
                    $(this).parent().parent().find("td").eq(2).children(".accountAssignmentClass").focus();
                    return false;
                }
            }
            currentPrLineRow = $(this).parent().parent();
            materialCodedPrCurrent = $(this).parent().parent();
            $("#overlay").css("display", "block");
            $("#lastMatSno").val("");
            $("#materialRecordCount").val("");
            $("#materialCodeShortText_SearchText").val("");
            setTimeout(function() {
                getMaterialMaster(prAccAss);
                $("#overlay").css("display", "none");
                $("#materialMasterModal").modal("show");
            }, 1000);
        }
    });
    $("#searchMaterialCodeBtn").click(function() {
        $("#lastMatSno").val("");
        $("#overlay").css("display", "block");
        $("#materialMasterModal").modal("hide");
        setTimeout(function() {
            getMaterialMaster(prAccAss);
            $("#overlay").css("display", "none");
            $("#materialMasterModal").modal("show");
        }, 1000);
    });
    $("#searchMaterialCodeNextBtn").click(function() {
        $("#overlay").css("display", "block");
        $("#materialMasterModal").modal("hide");
        setTimeout(function() {
            getMaterialMaster(prAccAss);
            $("#overlay").css("display", "none");
            $("#materialMasterModal").modal("show");
        }, 1000);
    });
    $("#searchMaterialCodePrevBtn").click(function() {
        var materialRecordCount = $("#materialRecordCount").val();
        var firstMatSno = $("#firstMatSno").val();
        if (materialRecordCount === "")
        {
            materialRecordCount = 100;
        }
        if (materialRecordCount !== "All")
        {
            var newLastMatSno = Number(firstMatSno) - Number(materialRecordCount) - 1;
            console.log("newLastMatSno: " + newLastMatSno);
            $("#lastMatSno").val(newLastMatSno);
        }

        $("#overlay").css("display", "block");
        $("#materialMasterModal").modal("hide");
        setTimeout(function() {
            getMaterialMaster(prAccAss);
            $("#overlay").css("display", "none");
            $("#materialMasterModal").modal("show");
        }, 1000);
    });
    $("#materialRecordCount").change(function() {
        if ($(this).val() === "All")
        {
            $("#searchMaterialCodePrevBtn").prop("disabled", true);
            $("#searchMaterialCodeNextBtn").prop("disabled", true);
        }
        else
        {
            $("#searchMaterialCodePrevBtn").prop("disabled", false);
            $("#searchMaterialCodeNextBtn").prop("disabled", false);
        }
    });
    $("#clearSearchMaterialCodeBtn").click(function() {
        $("#materialCodeShortText_SearchText").val("");
    });
    var material = null;
    function getMaterialMaster(accAsgn) {
        console.log("accAsgn :" + accAsgn);
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getMasterMaterialGeneralByAccAsgnAndCoCode",
                "accAsgn": accAsgn,
                "companyCode": $("#companycodeHeader").val(),
                "recordCount": $("#materialRecordCount").val(),
                "materialCodeOrShortText": $("#materialCodeShortText_SearchText").val(),
                "lastMatSno": $("#lastMatSno").val()
            },
            complete: function(responseJson) {
                console.log("responseJson.responseText: " + responseJson.responseText);
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);
                var materialRecordCount = $("#materialRecordCount").val();
                if (materialRecordCount === "")
                {
                    materialRecordCount = 100;
                }
                if (materialRecordCount === "All")
                {
                    $("#searchMaterialCodePrevBtn").prop("disabled", true);
                    $("#searchMaterialCodeNextBtn").prop("disabled", true);
                }
                else
                {
                    $("#searchMaterialCodePrevBtn").prop("disabled", false);
                    $("#searchMaterialCodeNextBtn").prop("disabled", false);
                }

                if (materialRecordCount !== "All")
                {
                    if (jsonArr.length < Number(materialRecordCount))
                    {
                        $("#searchMaterialCodeNextBtn").prop("disabled", true);
                    }
                    else
                    {
                        $("#searchMaterialCodePrevBtn").prop("disabled", false);
                        $("#searchMaterialCodeNextBtn").prop("disabled", false);
                    }
                }
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='materialMasterTableTrClass'>"
                            + "<td>"
                            + "<input type='hidden' class='materialSno' value='" + (jsonArr[i].sno === undefined ? "" : jsonArr[i].sno) + "'>"
                            + "<input type='hidden' class='materialGLCode' value='" + (jsonArr[i].GLCode === undefined ? "" : jsonArr[i].GLCode) + "'>"
                            + "<input type='hidden' class='materialZGLCode' value='" + (jsonArr[i].ZGLCode === undefined ? "" : jsonArr[i].ZGLCode) + "'>"
                            + "<input type='hidden' class='materialType' value='" + (jsonArr[i].materialType === undefined ? "" : jsonArr[i].materialType) + "'>"
                            + (jsonArr[i].materialCode === undefined ? "" : jsonArr[i].materialCode) + "</td>"
                            + "<td>" + (jsonArr[i].companyCode === undefined ? "" : jsonArr[i].companyCode) + "</td>"
                            + "<td>" + (jsonArr[i].plantCode === undefined ? "" : jsonArr[i].plantCode) + "</td>"
                            + "<td>" + (jsonArr[i].shortText === undefined ? "" : jsonArr[i].shortText) + "</td>"
                            + "<td>" + "<a href='#' class='matlLongTextClass' title='Long Text' data-toggle='tooltip' data-placement='auto'>\n\
                                <i class='fa fa-file' aria-hidden='true'></i>\n\
                                </a><input type='hidden' name='longTextHiddenClass' class='longTextHiddenClass' value='" + (jsonArr[i].longText === undefined ? "" : jsonArr[i].longText) + "'>"
                            + "</td>"
                            + "<td>" + (jsonArr[i].storageLocation === undefined ? "" : jsonArr[i].storageLocation) + "</td>"
                            + "<td>" + (jsonArr[i].purchaseGroup === undefined ? "" : jsonArr[i].purchaseGroup) + "</td>"
                            + "<td>" + (jsonArr[i].materialGroup === undefined ? "" : jsonArr[i].materialGroup) + "</td>"
                            + "<td>" + (jsonArr[i].baseUOM === undefined ? "" : jsonArr[i].baseUOM) + "</td>"
                            + "<td>" + (jsonArr[i].UOMStore === undefined ? "" : jsonArr[i].UOMStore) + "</td>"
                            + "<td>" + (jsonArr[i].oldMaterialNo === undefined ? "" : jsonArr[i].oldMaterialNo) + "</td>"
                            + "<td>" + (jsonArr[i].valuePrice === undefined ? "" : jsonArr[i].valuePrice) + "</td>"
                            + "<td>" + (jsonArr[i].countryOfOrigin === undefined ? "" : jsonArr[i].countryOfOrigin) + "</td>"
                            + "<td>" + (jsonArr[i].orderUnit === undefined ? "" : jsonArr[i].orderUnit) + "</td>"
                            + "</tr>";
                    if (i === 0)
                    {
                        $("#firstMatSno").val(jsonArr[i].sno);
                    }
                    if (i === jsonArr.length - 1)
                    {
                        $("#lastMatSno").val(jsonArr[i].sno);
                    }
                }
                $("#materialMasterTable").append(row);
                if ($.fn.DataTable.isDataTable('#materialMasterTable')) {
                    material.destroy();
                    material = null;
                    $("#materialMasterTable").children('tbody').html(row);
                    material = $('table.materialMasterTable ').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    material.buttons().container()
                            .appendTo('#materialMasterTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#materialMasterTable thead tr').clone(true).appendTo('#materialMasterTable thead');
                    $('#materialMasterTable thead tr:eq(1) th').each(function(i) {
                        $('#materialMasterTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (material.column(i).search() !== this.value) {
                                material
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    material = $('table.materialMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    material.buttons().container()
                            .appendTo('#materialMasterTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#materialMasterTable").on("click", ".materialMasterTableTrClass", function() {
        var materialRequestFrom = $("#materialRequestFrom").val();
        console.log("materialRequestFrom: " + materialRequestFrom);

        var code = $(this).find("td").eq(0).text();
        var shortText = $(this).find("td").eq(3).text();
        var longText = $(this).find("td").eq(4).children(".longTextHiddenClass").val();
        var uom = $(this).find("td").eq(8).text();
        var stLoc = $(this).find("td").eq(5).text();
        var matlGroup = $(this).find("td").eq(7).text();
        var glCode = $(this).find("td").eq(0).children(".materialGLCode").val();
        var zglCode = $(this).find("td").eq(0).children(".materialZGLCode").val();
        var plant = $(this).find("td").eq(2).text();
        var storageLoc = $(this).find("td").eq(5).text();
        var orderunit = $(this).find("td").eq(13).text();
        var materialType = $(this).find("td").eq(0).children(".materialType").val();
        var prAccAsgnCat = currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").val();
        console.log("materialType: " + materialType);
        console.log("prAccAsgnCat: " + prAccAsgnCat);

        if (materialRequestFrom === "FromPoLine") {
            if ((prAccAsgnCat === "A" && materialType === "ASET") || (prAccAsgnCat !== "A" && materialType !== "ASET")) {
                $("#materialMasterModal").modal("hide");
                $("#overlay").css("display", "block");
                setTimeout(
                    function()
                    {
                        $("#materialGlCode").val(glCode);
                        $("#materialZGlCode").val(zglCode);
                        var prType = $("#prType").val();
                        var category = $("#accountAssignmentCategory").val();
                        if (category === "Z") {
                            $("#gLAccount").val(zglCode);
                            $("#accAsgnCommItemInput").val(zglCode);
                            if (prType === "Service") {
                                $("#gLAccountService").val(zglCode);
                                $("#CommItemServiceInput").val(zglCode);
                                $("#gLAccountInp_Limits").val(zglCode);
                                $("#commItemServiceInp_Limits").val(zglCode);
                            }
                        } else if (category !== "A") {
                            $("#gLAccount").val(glCode);
                            $("#accAsgnCommItemInput").val(glCode);
                            if (prType === "Service") {
                                $("#gLAccountService").val(glCode);
                                $("#CommItemServiceInput").val(glCode);
                                $("#gLAccountInp_Limits").val(glCode);
                                $("#commItemServiceInp_Limits").val(glCode);
                            }
                        }

                        var masterMaterialMARADetailsObj = findMasterMaterialMARAByMatCodeInStandalone(code);
                        if (masterMaterialMARADetailsObj["Result"] === "Found") {
                            if (masterMaterialMARADetailsObj["MFRPN"] !== undefined && masterMaterialMARADetailsObj["MFRPN"] !== ""
                                    && masterMaterialMARADetailsObj["MFRNR"] !== undefined && masterMaterialMARADetailsObj["MFRNR"] !== "") {
                                currentPrLineRow.find("td").eq(0).children(".prImMaterial").val(code);
                            }
                            if (masterMaterialMARADetailsObj["MFRPN"] !== undefined)
                                currentPrLineRow.find("td").eq(0).children(".prMfrPartNumber").val(masterMaterialMARADetailsObj["MFRPN"]);
                            if (masterMaterialMARADetailsObj["MFRNR"] !== undefined)
                                currentPrLineRow.find("td").eq(0).children(".prManufacturer").val(masterMaterialMARADetailsObj["MFRNR"]);
                        }

                        // Fetch info record details
                        var infoRecordJsonObj = fetchInfoRecordDetails(code);
                        console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));
                        if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
                            setHeaderLevelDataFromInfoRecord(infoRecordJsonObj);
                        }

                        console.log("code: " + code);
                        currentPrLineRow.find("td").eq(4).children(".materialCodeClass").css("border-color", "");
                        currentPrLineRow.find("td").eq(4).children(".materialCodeClass").val(code);
                        currentPrLineRow.find("td").eq(6).children(".prShortText").val(shortText);
                        currentPrLineRow.find("td").eq(7).text(longText);
                        if (orderunit === "") {
                            currentPrLineRow.find("td").eq(31).children(".prUom").val(uom);
                            currentPrLineRow.find("td").eq(12).children(".prOrderPriceUnit").val(uom);
                        } else {
                            currentPrLineRow.find("td").eq(31).children(".prUom").val(orderunit);
                            currentPrLineRow.find("td").eq(12).children(".prOrderPriceUnit").val(orderunit);
                        }
                        currentPrLineRow.find("td").eq(20).children(".storageLocationClass").val(stLoc);
                        currentPrLineRow.find("td").eq(17).children(".matlGroup").val(matlGroup);
                        currentPrLineRow.find("td").eq(17).children(".matlGroup").css("border-color", "");
                        currentPrLineRow.find("td").eq(0).children(".prgLCode").val(glCode);
                        currentPrLineRow.find("td").eq(0).children(".przGLCode").val(zglCode);
                        currentPrLineRow.find("td").eq(16).children(".plantClass").val(plant);
                        currentPrLineRow.find("td").eq(20).children(".storageLocationClass").val(storageLoc);

                        $("#Plant").val(plant);

                        if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
                            if (infoRecordJsonObj.VAR_ORD_UN === "1") {
                                currentPrLineRow.find("td").eq(31).children(".prUom").prop("disabled", false);
                            } else {
                                currentPrLineRow.find("td").eq(31).children(".prUom").prop("disabled", true);
                            }
                            if (infoRecordJsonObj.PO_UNIT !== "") {
                                currentPrLineRow.find("td").eq(31).children(".prUom").val(infoRecordJsonObj.PO_UNIT);
                            }
                            if (infoRecordJsonObj.ORDERPR_UN !== "") {
                                $("#unitOrderPriceUnit").val(infoRecordJsonObj.ORDERPR_UN);
                                currentPrLineRow.find("td").eq(12).children(".prOrderPriceUnit").val(infoRecordJsonObj.ORDERPR_UN);
                            }
                            if (infoRecordJsonObj.CURRENCY !== "") {
                                currentPrLineRow.find("td").eq(11).children(".currencyClass").val(infoRecordJsonObj.CURRENCY);
                            }
                            if (infoRecordJsonObj.PRICE_UNIT !== "") {
                                currentPrLineRow.find("td").eq(10).children(".prPerUnit").val(formatAmountByComma(Number(infoRecordJsonObj.PRICE_UNIT).toFixed(2)));
                            }
                            if (infoRecordJsonObj.PLND_DELRY !== "") {
                                $("#PlDeliveryTime").val(infoRecordJsonObj.PLND_DELRY);
                            }
                        } else {
                            currentPrLineRow.find("td").eq(31).children(".prUom").prop("disabled", true);
                        }

                        $("#MaterialPOText").val(shortText);

                        // Update conditions tab
                        if (infoRecordJsonObj.PO_UNIT !== "") {
                            uom = infoRecordJsonObj.PO_UNIT;
                        }
                        console.log("uom :" + uom);
                        $("#conditionTableIdLineLevel tbody tr").each(function() {
                            $(this).find("td").eq(7).children(".UoMLineLevel").val(uom);
                            $(this).find("td").eq(6).children(".ConditionPricingUnitLineLevel").val(uom);
                        });
                        
                        if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                if ($(this).find("td").eq(4).children(".CurrencyLineLevel").val() !== "%") {
                                    if (infoRecordJsonObj.CURRENCY !== "" && infoRecordJsonObj.CURRENCY !== undefined) {
                                        $(this).find("td").eq(4).children(".CurrencyLineLevel").val(infoRecordJsonObj.CURRENCY);
                                    }
                                }
                                if (infoRecordJsonObj.PO_UNIT !== "" && infoRecordJsonObj.PO_UNIT !== undefined) {
                                    $(this).find("td").eq(6).children(".ConditionPricingUnitLineLevel").val(infoRecordJsonObj.PO_UNIT);
                                }
                                if (infoRecordJsonObj.CONV_NUM1 !== "" && infoRecordJsonObj.CONV_NUM1 !== undefined) {
                                    $(this).find("td").eq(13).children(".numeratorLineLevel").val(infoRecordJsonObj.CONV_NUM1);
                                }
                                if (infoRecordJsonObj.CONV_DEN1 !== "" && infoRecordJsonObj.CONV_DEN1 !== undefined) {
                                    $(this).find("td").eq(15).children(".denoForConvLineLevel").val(infoRecordJsonObj.CONV_DEN1);
                                }
                                if (infoRecordJsonObj.ORDERPR_UN !== "" && infoRecordJsonObj.ORDERPR_UN !== undefined) {
                                    $(this).find("td").eq(16).children(".uOMExtraLineLevel").val(infoRecordJsonObj.ORDERPR_UN);
                                }
                                calculationForPBXXInStandalone();
                            });
                        }
        //                $("#conditionTableId tbody tr").each(function() {
        //                    $(this).find("td").eq(7).children(".UoMHeader").val(uom);
        //                    $(this).find("td").eq(6).children(".ConditionPricingUnitHeader").val(uom);
        //                });

                        var companycode = $("#companycodeHeader").val();
                        var jsonArr = getMaterialMasterOnLoadInStandalone(code, companycode);
                        if (jsonArr.length !== 0) {
                            populateValueInQuantityWeightsTab(jsonArr);
                        }
                        calulateDeliveryDate(currentPrLineRow, code);
                        popValueInComponentTale();

                        // Update po line level tab fields
                        if (Number(infoRecordJsonObj.mainCode) === 0 && $("#poNumber").val() === "") {
                            setPoLineLevelDataFromInfoRecord(infoRecordJsonObj, "");
                        }

                        var prShortText = shortText;
                        var insertionOrderId = currentPrLineRow.find("td").eq(1).html();
                        $(".ItemNumberSelectClass option").each(function() {
                            var optionVal = $(this).prop("value");
                            var optionText = $(this).text().split(" - ");
                            console.log("optionVal: " + optionVal);
                            console.log("optionText: " + optionText[0]);
                            if (insertionOrderId === optionVal)
                            {
                                $(this).text(optionText[0] + " - " + prShortText);
                                return;
                            }
                        });
                        $("#overlay").css("display", "none");
                    }
                , 1000);
            } else {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please select correct material code!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
            }
        } else if (materialRequestFrom === "FromComponentTab") {
            if ((prAccAsgnCat === "A" && materialType === "ASET") || (prAccAsgnCat !== "A" && materialType !== "ASET")) {
                componentTabCurrentLoc.find("td").eq(0).children(".comMaterial").val(code);
                componentTabCurrentLoc.find("td").eq(1).children(".comDescription").val(shortText);
                componentTabCurrentLoc.find("td").eq(5).children(".comProdStorageLoc").val(stLoc);
                $("#materialMasterModal").modal("hide");
                $("#componentsModal").modal("show");
                $("#componentsModal").css({
                    "padding-right": 430,
                    "padding-left": 0,
                    "padding-top": 70
                });
            } else {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please select correct material code!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
            }
        }
    });
    $("#materialMasterTable").on("click", '.matlLongTextClass', function() {
        $("#matlLongTextModal").modal("show");
        var longtext = $(this).parent().children().eq(1).val();
        $('div.longtext').text(longtext);
    });
    $("#material_headerClass").on("keypress", ".currencyClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#overlay").css("display", "block");
            setTimeout(function() {
                $("#CurrencyMasterModal").modal("show");
                getAllCurrencyInStandalone();
                currentPrLineRow = $(this).parent().parent();
                currentPrRow = $(this).parent().parent();
                $("#ro_Currency").val("PRLineTable");
                $("#reqFromCr").val("prtable");
                $("#overlay").css("display", "none");
            }, 500);
        }
    });
    $("#CurrencyDeliveryInvoice").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getAllCurrencyInStandalone();
                $("#CurrencyMasterModal").modal("show");
                $("#ro_Currency").val("DeliveryInvoice");
                $("#reqFromCr").val("header");
                $("#overlay").css("display", "none");
            }, 500);
        }
    });
//    var serviceTableCurrentClick = "";
    $("#serviceTableId").on("keypress", ".currency_Services", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            serviceTableCurrentClick = $(this);
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getAllCurrencyInStandalone();
                $("#CurrencyMasterModal").modal("show");
                $("#ro_Currency").val("ServieTable");
                $("#overlay").css("display", "none");
            }, 500);
        }
    });
    $("#CurrencyMasterTable").on("click", ".CurrencyMasterTrClass", function() {
        var currency = $(this).find("td").eq(0).text();
        var reqFrom = $("#ro_Currency").val();
        console.log("currency: " + currency);
        if (reqFrom === "PRLineTable") {
            var length = $("#material_headerClass tbody tr").length;
            if (length === 1) {
                currentPrLineRow.find("td").eq(11).children(".currencyClass").val(currency);
            } else {
                var prevCurrency = currentPrLineRow.prev().find("td").eq(11).children(".currencyClass").val();
                if (prevCurrency !== currency) {
                    Lobibox.alert("error", {
                        msg: "All PR currency should be same!"
                    });
                } else {
                    currentPrLineRow.find("td").eq(11).children(".currencyClass").val(currency);
                }
            }

            toCurrency = currency;
            var fromCurrency = $("#CurrencyDeliveryInvoice").val();
            var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
            if (exchangeRate === "") {
                exchangeRate = 1;
            }
            $("#ExchangeRate").val(Number(exchangeRate).toFixed(5));
        } else if (reqFrom === "DeliveryInvoice") {
            $("#CurrencyDeliveryInvoice").val(currency);
//            var fromCurrency = $("#material_headerClass tbody tr").find("td").eq(11).children(".currencyClass").val();
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
            var toCurrency = currency;
            var length = $("#material_headerClass tbody tr").length;
//            if (length !== 0 && toCurrency !== "") {
            var exchangeRate = findExchangeRate(toCurrency, fromCurrency);
            if (exchangeRate === "") {
                exchangeRate = 1;
            }
//                alert("exchangeRate :" + exchangeRate);
            $("#ExchangeRate").val(Number(exchangeRate).toFixed(5));
//            }
//            var conCurr1;
//            $("#conditionTableIdLineLevel tbody tr").each(function() {
//                conCurr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
//                if (conCurr1 !== "%") {
//                    $(this).find("td").eq(4).children(".CurrencyLineLevel").val(currency);
//                }
//            });
        } else if (reqFrom === "ServieTable") {
            serviceTableCurrentClick.parent().parent().find("td").eq(7).children(".currency_Services").val(currency);
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

                        deleteRowFormConditionInStandAlone("");
                        $("#overlay").css("display", "none");
                    }
                });
            }
        } else if (reqFrom === "headercondition") {
            conditioncurrentpossition.find("td").eq(4).children(".CurrencyHeader").val(currency);
            var LinkID;
            var PrCurrency;
            var Itemcode;
            var itemCodeArray = [];
            var linkidArray = [];
            var PrCurrencyArray = [];
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
                                conditioncurrentpossition.find("td").eq(5).children(".newPerQuantityHeader").val(formatAmountByComma((Number(perQuant) * Number(exchangeRate)).toFixed(2)));
                            }
                        }
                        if (condVal !== "") {
                            conditioncurrentpossition.find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma((Number(condVal) * Number(exchangeRate)).toFixed(2)));
                        }

                        deleteRowFormConditionHeaderInStandAlone();
                        clearPerColumnatHeaderInSA();

                        var indexnumber = conditioncurrentpossition.find("td").eq(0).children(".conditionindex").val();
                        var conditiontype = conditioncurrentpossition.find("td").eq(1).children(".ConditionTypeHeader").val();
                        for (var p = 0; p < conditionLineLevelArraySA.length; p++) {
                            if (conditiontype === conditionLineLevelArraySA[p].Ctype && indexnumber === conditionLineLevelArraySA[p].indexnumber) {
                                conditionLineLevelArraySA[p].amount = ((Number(conditionLineLevelArraySA[p].amount) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArraySA[p].per = ((Number(conditionLineLevelArraySA[p].per) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArraySA[p].oldAmountHidden = ((Number(conditionLineLevelArraySA[p].oldAmountHidden) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArraySA[p].oldPerHidden = ((Number(conditionLineLevelArraySA[p].oldPerHidden) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArraySA[p].conditionValue = ((Number(conditionLineLevelArraySA[p].conditionValue) * Number(exchangeRate)).toFixed(2)).toString();
                                conditionLineLevelArraySA[p].prCurrency = currency;
                            }
                        }
                        console.log("conditionLineLevelArray after currency change :" + JSON.stringify(conditionLineLevelArraySA));
                        var totlAmmount = "";
                        var totlPer = "";
                        var totlCondVal = "";
                        for (var p = 0; p < conditionLineLevelArraySA.length; p++) {
                            if (conditiontype === conditionLineLevelArraySA[p].Ctype) {
                                $("#material_headerClass tbody tr").each(function() {
                                    var dropDownItemNumber = $("#ItemNumberSelect").val();
                                    var prTableItemNumber = $(this).find("td").eq(1).html();
                                    if (prTableItemNumber === dropDownItemNumber) {
                                        var linkid = $(this).find("td").eq(0).children(".linkid").val();
                                        if (conditionLineLevelArraySA[p].linkid === linkid) {
                                            var amount = conditionLineLevelArraySA[p].amount;
                                            var per = conditionLineLevelArraySA[p].per;
                                            var condVal = conditionLineLevelArraySA[p].conditionValue;

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
                                    LinkID = ($(this).find("td").eq(0).children(".linkid").val()).trim();
                                    PrCurrency = $(this).find("td").eq(11).children('.currencyClass').val();
                                    linkidArray.push(LinkID);
                                    PrCurrencyArray.push(PrCurrency);
                                });
                                var extId = $("#poid").val();
//    return false;
                                $.ajax({
                                    type: "GET",
                                    url: "standalonepoajaxrequest.do",
                                    async: false,
                                    data: {
                                        "reqFrom": "saveStandAloneConditionsDataOnAddingInHeader",
                                        "conditionLineLevelArr": JSON.stringify(conditionLineLevelArraySA),
                                        "linkidArrayAsString": linkidArray.toString(),
                                        "PrCurrencyArrayAsString": PrCurrencyArray.toString(),
                                        "itemCodeArrayAsString": itemCodeArray.toString(),
                                        "extId": extId,
                                        "indexnumber": indexnumber,
                                        "conditiontype": conditiontype
                                    }
                                });
                            }
                        }

                        deleteRowFormConditionInStandAlone("");
                        $("#overlay").css("display", "none");
                    }
                });
            }
        }
        $("#CurrencyMasterModal").modal("hide");
    });
    $("#material_headerClass").on("keypress", ".plantClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#plantMasterModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            currentPrRow = $(this).parent().parent();
            getPlantMaster();
        }
    });
    var plantTable = null;
    function getPlantMaster() {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getPlantMaster"
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='plantMasterTrClass'>"
                            + "<td>" + jsonArr[i].name + "</td>"
                            + "<td>" + jsonArr[i].plantCode + "</td>"
                            + "<td>" + jsonArr[i].plantDesc + "</td>"
                            + "</tr>";
                }
                $("#plantMasterTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#plantMasterTable')) {
                    plantTable.destroy();
                    plantTable = null;
                    $("#plantMasterTable").children('tbody').html(row);
                    plantTable = $('table.plantMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    plantTable.buttons().container()
                            .appendTo('#plantMasterTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#plantMasterTable thead tr').clone(true).appendTo('#plantMasterTable thead');
                    $('#plantMasterTable thead tr:eq(1) th').each(function(i) {
                        $('#plantMasterTable thead tr:eq(0) th').addClass("table-header-color");
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
                    plantTable = $('table.plantMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    plantTable.buttons().container()
                            .appendTo('#plantMasterTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#plantMasterTable").on("click", ".plantMasterTrClass", function() {
        var plant = $(this).find("td").eq(1).text();
        console.log("plant: " + plant);
        currentPrLineRow.find("td").eq(16).children(".plantClass").val(plant);
        currentPrLineRow.find("td").eq(16).children(".plantClass").css("border-color", "");
        $("#plantMasterModal").modal("hide");
    });
    $("#material_headerClass").on("keypress", ".purchaseGroupClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#purchaseGroupMasterModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            getAllPurchaseGroup();
        }
    });
    var purchaseGrp = null;
    function getAllPurchaseGroup() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "findAllMasterPurchaseGroup"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                var row = "";
                if (obj.length !== 0) {
                    var option = "";
                    for (var i = 0; i < obj.length; i++) {
                        row += "<tr class='purchaseGroupMasterTrClass'>"
                                + "<td>" + obj[i].PURCHASING_GROUP + "</td>"
                                + "<td>" + obj[i].PURCHASING_GROUP_DESC + "</td>"
                                + "</tr>";
                    }
                    $("#purchaseGroupMasterTable").append(row);
                    if ($.fn.DataTable.isDataTable('#purchaseGroupMasterTable')) {
                        purchaseGrp.destroy();
                        purchaseGrp = null;
                        $("#purchaseGroupMasterTable").children('tbody').html(row);
                        purchaseGrp = $('table.purchaseGroupMasterTable ').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        purchaseGrp.buttons().container()
                                .appendTo('#purchaseGroupMasterTable_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#purchaseGroupMasterTable thead tr').clone(true).appendTo('#purchaseGroupMasterTable thead');
                        $('#purchaseGroupMasterTable thead tr:eq(1) th').each(function(i) {
                            $('#purchaseGroupMasterTable thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (purchaseGrp.column(i).search() !== this.value) {
                                    purchaseGrp
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        purchaseGrp = $('table.purchaseGroupMasterTable').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        purchaseGrp.buttons().container()
                                .appendTo('#purchaseGroupMasterTable_wrapper .col-md-6:eq(0)');
                    }
                }
            }
        });
    }
    $("#purchaseGroupMasterTable").on("click", ".purchaseGroupMasterTrClass", function() {
        var group = $(this).find("td").eq(0).text();
        console.log("group: " + group);
        currentPrLineRow.find("td").eq(19).children(".purchaseGroupClass").val(group);
        currentPrLineRow.find("td").eq(19).children(".purchaseGroupClass").css("borser-color", "");
        $("#purchaseGroupMasterModal").modal("hide");
    });
    $("#material_headerClass").on("keypress", ".purchaseOrgClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#PurchaseOrgModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            getAllPurchaseOrg();
            $("#reqFromPurOrg").val("prtable");
        }
    });
    var purchaseOrgTable = null;
    function getAllPurchaseOrg() {
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
    }
    $("#purchaseOrgMasterTable").on("click", ".purchaseOrgMasterTrClass", function() {
        var org = $(this).find("td").eq(0).text();
        console.log("org: " + org);
        currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").val(org);
        $("#PurchaseOrganizationMasterModal").modal("hide");
    });
    $("#material_headerClass").on("keypress", ".storageLocationClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#StorageLocationMasterModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            currentPrRow = $(this).parent().parent();
            getStorageLocationMaster();
        }
    });
    var storageLocationTable = null;
    function getStorageLocationMaster() {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getStorageLocationMaster"
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='storgageLocMasterTrClass'>"
                            + "<td>" + jsonArr[i].locationCode + "</td>"
                            + "<td>" + jsonArr[i].locationDesc + "</td>"
                            + "</tr>";
                }
                $("#storageLocationMasterTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#storageLocationMasterTable')) {
                    storageLocationTable.destroy();
                    storageLocationTable = null;
                    $("#storageLocationMasterTable").children('tbody').html(row);
                    storageLocationTable = $('table.storageLocationMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    storageLocationTable.buttons().container()
                            .appendTo('#storageLocationMasterTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#storageLocationMasterTable thead tr').clone(true).appendTo('#storageLocationMasterTable thead');
                    $('#storageLocationMasterTable thead tr:eq(1) th').each(function(i) {
                        $('#storageLocationMasterTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (storageLocationTable.column(i).search() !== this.value) {
                                storageLocationTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    storageLocationTable = $('table.storageLocationMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    storageLocationTable.buttons().container()
                            .appendTo('#storageLocationMasterTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#storageLocationMasterTable").on("click", ".storgageLocMasterTrClass", function() {
        var loc = $(this).find("td").eq(0).text();
        console.log("loc: " + loc);
        currentPrLineRow.find("td").eq(20).children(".storageLocationClass").val(loc);
        currentPrLineRow.find("td").eq(20).children(".storageLocationClass").css("border-color", "");
        $("#StorageLocationMasterModal").modal("hide");
    });
    $("#material_headerClass").on("keypress", ".prDeptNameClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#DepartmentMasterModal").modal("show");
            currentPrLineRow = $(this).parent().parent();
            currentPrRow = $(this).parent().parent();
            getDepartmentMaster();
        }
    });
    $("#departmentMasterTable").on("click", ".departmentMasterTrClass", function() {
        var dept = $(this).find("td").eq(0).text();
        console.log("dept: " + dept);
        currentPrLineRow.find("td").eq(25).children(".prDeptNameClass").val(dept);
        $("#DepartmentMasterModal").modal("hide");
    });
    $("#material_headerClass").on("click", ".poDeptNameClass", function() {
        $("#PoDepartmentMasterModal").modal("show");
//        currentPrRow = $(this).parent().parent();
        currentPrLineRow = $(this).parent().parent();
        getPODepartmentMaster();
        $("#reqFromPoDept").val("PODeptName");
    });
//saurabh
    $("#material_headerClass").on("click", ".poCriticality", function() {
        $('.poCriticality').click(function(e) {
            e.stopPropagation();
        });
    });
//quantity_Class
    $("#material_headerClass").on("click", ".quantity_Class", function() {
        $('.quantity_Class').click(function(e) {
            e.stopPropagation();
        });
    });
    var errorMsg;
    $("#material_headerClass").on("change", ".prNetPrice", function() {
        $('.prNetPrice').click(function(e) {
            e.stopPropagation();
        });

        var amount = removeCommaInNumber($(this).val());
        $(this).parent().parent().find("td").eq(0).children('.prNetPriceHidden').val(amount);
        var accAsgn = $(this).parent().parent().find("td").eq(2).children(".accountAssignmentClass").val();
        var itemCat = $(this).parent().parent().find("td").eq(3).children(".itemCategoryClass").val();
        var poType = $("#typeOfPOHeader").val();
        if (accAsgn === "" && itemCat !== "L" && poType !== "Inter Company" && poType !== "PO for Group Trade" && poType !== "PO for Associate Trade" && poType !== "PO for 3rd Party Trade" && poType !== "Ferrous PO - Local") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Account Assignment!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
//            $("#overlay").css("display", "none");
            $(this).val("");
            $(this).parent().parent().find("td").eq(2).children(".accountAssignmentClass").focus();
            return false;
        } else if (accAsgn === "A" && amount < 1000) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Amount less then 1000 not allowed!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
//                $("#overlay").css("display", "none
            $(this).val("");
            $(this).focus();
            return false;
        } else {
            $(this).css('border-color', "");
            calculationForPBXXInStandalone();
        }
    
        $(this).val(formatAmountByComma($(this).val()));

        calculatePBXXForHeaderInStandalone();
        clearPerColumnatHeaderInSA();
        findApproverDetails();
    });
    
    $("#material_headerClass").on("change", ".prPerUnit", function() {
        $('.prPerUnit').click(function(e) {
            e.stopPropagation();
        });
        $(this).css('border-color', "");
//        $("#conditionTableIdLineLevel tbody tr").each(function() {
//            $(this).find("td").eq(3).children(".AmountLineLevel").val("");
//            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val("");
//            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val("");
//        });
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        if (dropDownItemNumber !== "") {
            var perUnit = $(this).val();
            $("#netWeightPerUnit").val(Number(perUnit).toFixed(2));
            $("#grossWeightPerUnit").val(Number(perUnit).toFixed(2));
            $("#volumePerUnit").val(Number(perUnit).toFixed(2));
            $("#pointsPerUnit").val(Number(perUnit).toFixed(2));
        }

        calculationForPBXXInStandalone();
        calculatePBXXForHeaderInStandalone();
        clearPerColumnatHeaderInSA();
    });
//saurabh code ends

    $("#poDepartmentMasterTable").on("click", ".poDepartmentMasterTrClass", function() {
        var dept = $(this).find("td").eq(0).text();
        console.log("dept: " + dept);
        var reqFrom = $("#reqFromPoDept").val();
        if (reqFrom === "PODeptName") {
            currentPrLineRow.find("td").eq(26).children(".poDeptNameClass").val(dept);
            currentPrLineRow.find("td").eq(26).children(".poDeptNameClass").css("border-color", "");
        }

        $("#PoDepartmentMasterModal").modal("hide");
    });
    var deptMasterTable = null;
    function getDepartmentMaster() {
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getTrackingNumberByCompanyCode",
                "companyCode": ""
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='departmentMasterTrClass'>"
                            + "<td>" + jsonArr[i].departmentCode + "</td>"
                            + "<td>" + jsonArr[i].departmentDesc + "</td>"
                            + "</tr>";
                }
                $("#departmentMasterTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#departmentMasterTable')) {
                    deptMasterTable.destroy();
                    deptMasterTable = null;
                    $("#departmentMasterTable").children('tbody').html(row);
                    deptMasterTable = $('table.departmentMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    deptMasterTable.buttons().container()
                            .appendTo('#departmentMasterTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#departmentMasterTable thead tr').clone(true).appendTo('#departmentMasterTable thead');
                    $('#departmentMasterTable thead tr:eq(1) th').each(function(i) {
                        $('#departmentMasterTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (deptMasterTable.column(i).search() !== this.value) {
                                deptMasterTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    deptMasterTable = $('table.departmentMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    deptMasterTable.buttons().container()
                            .appendTo('#departmentMasterTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    var poDeptMasterTable = null;
    function getPODepartmentMaster() {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getDepartmentMaster"
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='poDepartmentMasterTrClass'>"
                            + "<td>" + jsonArr[i].departmentCode + "</td>"
                            + "<td>" + jsonArr[i].departmentDesc + "</td>"
                            + "</tr>";
                }
                $("#poDepartmentMasterTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#poDepartmentMasterTable')) {
                    poDeptMasterTable.destroy();
                    poDeptMasterTable = null;
                    $("#poDepartmentMasterTable").children('tbody').html(row);
                    poDeptMasterTable = $('table.poDepartmentMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    poDeptMasterTable.buttons().container()
                            .appendTo('#poDepartmentMasterTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#poDepartmentMasterTable thead tr').clone(true).appendTo('#poDepartmentMasterTable thead');
                    $('#poDepartmentMasterTable thead tr:eq(1) th').each(function(i) {
                        $('#poDepartmentMasterTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (poDeptMasterTable.column(i).search() !== this.value) {
                                poDeptMasterTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    poDeptMasterTable = $('table.poDepartmentMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    poDeptMasterTable.buttons().container()
                            .appendTo('#poDepartmentMasterTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    var trackingNumber = null;
    function getTrackingNumberByCompanyCode(companyCode) {
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
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='poTrackingNumberTrClass'>"
                            + "<td>" + jsonArr[i].departmentCode + "</td>"
                            + "<td>" + jsonArr[i].departmentDesc + "</td>"
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

    $("#trackingNumnerModalTable").on("click", ".poTrackingNumberTrClass", function() {
        var trackingnumber = $(this).find("td").eq(0).text();
        currentPrLineRow.find("td").eq(29).children(".trackingNumber").css("border-color", "");
        currentPrLineRow.find("td").eq(29).children(".trackingNumber").val(trackingnumber);
        $("#trackingNumnerModal").modal("hide");
    });
    $("#addRowServiceBtnId").click(function() {
        var lineitemArr = [];
        var row = "";
        $("#serviceTableId tbody tr").each(function() {
            var lineitemnumber = $(this).find("td").children(".lineItemNumberServices").val();
            lineitemArr.push(lineitemnumber);
        });
        var lastlineitem = lineitemArr[lineitemArr.length - 1];
        var int_lastlineitem = parseInt(lastlineitem) + 10;
        var currency = "";
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                currency = $(this).find("td").eq(11).children(".currencyClass").val();
            }
        });
        row = "<tr><td>"
                + '<input type="checkbox" class="checkboxServices" id="" name="">\n\
                    <input type="hidden" class="serviceId">\n\
                    <input type="hidden" class="ServiceAccAssDist">\n\
                    <input type="hidden" class="isProfitabilitySegmentDataSaved" value="No">\n\
                    <input type="hidden" class="saveSarviceAccountAssignment" value="No">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded lineItemNumberServices tableInputField" disabled="true" int_lastlineitem value=' + int_lastlineitem + '>' + "</td><td>"
                + '<input type="text" class="form-control form-rounded ServicesNumber_Services tableInputField" id="" name="" style="width: 100px;">' + "</td><td style='text-align: center'>"
                + '<input type="hidden" class="form-control form-rounded shortText_Services tableInputField" style="width: 150px;display: inline-block;" id="" name="" readonly value="Short text...">' + " <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td><td>"
                + '<input type="text" class="form-control form-rounded check-negative-value quantity_Services tableInputField" style="width:150px;" min="0" id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded servicesUnit_Services tableInputField" style="width:70px;" id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded check-negative-value grossPrice_Services tableInputField" style="width:150px;" min="0" id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded currency_Services tableInputField" style="width:55px;" id="" name="" value=' + currency + '>' + "</td><td>"
                + '<input type="text" class="form-control form-rounded netPrice_Services tableInputField" style="width:150px;" disabled id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded edition_Services tableInputField" style="width:100px;" id="" name="">' + "</td><td style='text-align: center'>"
                + '<input type="hidden" class="form-control form-rounded lineItemLongText_Services tableInputField" style="width: 150px;display: inline-block;" id="" name="" value="Line item long text..." readonly>' + " <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td><td>"
                + '<input type="text" class="form-control form-rounded overfTolerance_Services tableInputField" id="" name="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded serviceNetValue tableInputField" style="width:150px;" disabled value="">' + "</td><td>"
                + '<input type="number" class="form-control form-rounded serviceActualQty tableInputField" disabled value="">' + "</td><td style='text-align: center'>"
                + '<input type="hidden" class="form-control form-rounded serviceText tableInputField" style="width: 150px;display: inline-block;" value="Service text..." readonly>' + " <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td><td>"
//                + '<input type="text" class="form-control form-rounded serviceLineText tableInputField" style="width:150px;" value="">' + "</td><td>"
                + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteServiceTebleRow" aria-hidden="true" style="width:10px;"></i>'
                + "</td></tr>";
        $("#serviceTableId").children("tbody").append(row);
    });
    $("#prType").change(function() {
        var prType = $(this).val();
        if (prType !== "Select" && prType !== "") {
            hideDeliveryTabFieldsByPoType();
        }
//        var typeOfPOHeader = $("#typeOfPOHeader").val();
        var rowCount = $('#material_headerClass tr').length;
        if (rowCount === 1) {

//            if (typeOfPOHeader !== "Inter Company") {
            if (prType === 'Service') {
                $("#serviceTab_li").css("display", "block");
                $("#limits_li").css("display", "block");
                return false;
            } else {
                if ($("#services").hasClass("active") === true) {
                    $("#serviceTab_li").css("display", "none");
                    $("#services-tab").removeClass("active");
                    $("#services").removeClass("active");
                    $("#limits_li").css("display", "none");
//                    $("#quantities").addClass("active");
//                    $("#quantities-tab").addClass("active");
//                    $("#quantities-tab").addClass("show");
                    $("#material_linelevel").addClass("active");
                    $("#material_linelevel-tab").addClass("active");
                    $("#material_linelevel-tab").addClass("show");
                } else if ($("#limits").hasClass("active") === true) {
                    $("#limits_li").css("display", "none");
                    $("#limits-tab").removeClass("active");
                    $("#limits").removeClass("active");
                    $("#serviceTab_li").css("display", "none");
//                    $("#quantities").addClass("active");
//                    $("#quantities-tab").addClass("active");
//                    $("#quantities-tab").addClass("show");
                    $("#material_linelevel").addClass("active");
                    $("#material_linelevel-tab").addClass("active");
                    $("#material_linelevel-tab").addClass("show");
                } else {
                    $("#serviceTab_li").css("display", "none");
                    $("#limits_li").css("display", "none");
                }
            }
//            } else {
//                if (prType === 'Service') {
//                    $("#prType").val("");
//                    Lobibox.notify("error", {
//                        rounded: true,
//                        delayIndicator: false,
//                        msg: "Inter Company is not valid in Service PO!"
//                    });
//                    $("#serviceTab_li").css("display", "none");
//                    $("#limits_li").css("display", "none");
//                }
//
//            }

        } else {
            Lobibox.confirm({
                msg: "If you change PR the all data will be discarded?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#material_headerClass tbody tr").remove();
                        clearAllLineLevelFields();
                        if (prType === 'Service') {
                            $("#serviceTab_li").css("display", "block");
                            $("#limits_li").css("display", "block");
                            return false;
                        } else if (prType === 'Material') {
                            if ($("#services").hasClass("active") === true) {
                                $("#serviceTab_li").css("display", "none");
                                $("#services-tab").removeClass("active");
                                $("#services").removeClass("active");
                                $("#limits_li").css("display", "none");
//                                $("#quantities").addClass("active");
//                                $("#quantities-tab").addClass("active");
//                                $("#quantities-tab").addClass("show");
                                $("#material_linelevel").addClass("active");
                                $("#material_linelevel-tab").addClass("active");
                                $("#material_linelevel-tab").addClass("show");
                            } else if ($("#limits").hasClass("active") === true) {
                                $("#limits_li").css("display", "none");
                                $("#limits-tab").removeClass("active");
                                $("#limits").removeClass("active");
                                $("#serviceTab_li").css("display", "none");
//                                $("#quantities").addClass("active");
//                                $("#quantities-tab").addClass("active");
//                                $("#quantities-tab").addClass("show");
                                $("#material_linelevel").addClass("active");
                                $("#material_linelevel-tab").addClass("active");
                                $("#material_linelevel-tab").addClass("show");
                            } else {
                                $("#serviceTab_li").css("display", "none");
                                $("#limits_li").css("display", "none");
                            }
                        }
                        $("#hideLineLevelData").css("display", "none");
                        $("#prType").val(prType);
                        $(".ItemNumberSelectClass").empty();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                        if (prType === "Service") {
                            $("#prType").val("Material");
                        } else if (prType === "Material") {
                            $("#prType").val("Service");
                        }
                    }
                }
            });
        }
    });

    var checkboxServicesArr = [];
    $("#serviceTableId").on("click", ".checkboxServices", function() {
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
        var ServiceNumber = $(this).parent().parent().find("td").eq(2).children(".ServicesNumber_Services").val();
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
                    console.log("obj.GLCODE: " + obj.GLCODE);
                    console.log("obj.ZGLCODE: " + obj.ZGLCODE);
                    var gLCode = obj.GLCODE;
                    var zGLCode = obj.ZGLCODE;
                    var prType = $("#prType").val();
                    $("#accountAssignmentForm :input").val("");
                    var category = $("#accountAssignmentCategory").val();
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
//                    $("#gLCode").val(gLCode);
                }
            }
        });
        var isChecked = $(this).prop("checked");
        $("#limitTabAccAsgnTebleId tbody").each(function() {
            $(this).children('tr:not(:first)').remove();
        });
        if (isChecked === true) {
            var accountAssignmentCategory;
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {

                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                
                    if (accountAssignmentCategory === 'K') {
                        service_AccAsgnCat_K("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'N') {
                        service_AccAsgnCat_N("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'A') {
                        service_AccAsgnCat_A("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'C') {
                        service_AccAsgnCat_C("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'F') {
                        service_AccAsgnCat_F("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'P') {
                        service_AccAsgnCat_P("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'R') {
                        service_AccAsgnCat_R("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'X') {
                        service_AccAsgnCat_X("serviceTableCheckBox");
                    } else if (accountAssignmentCategory === 'Z') {
                        service_AccAsgnCat_Z("serviceTableCheckBox");
                    }
                }
            });
        }
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
    });
    $("#serviceTableId").on("keypress", ".ServicesNumber_Services", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var status = "";
            var materialGroup = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    materialGroup = $(this).find("td").eq(17).children(".matlGroup").val();
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
                        $(this).find("td").eq(17).children(".matlGroup").focus();
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
            serviceNumberCurrent = $(this).parent().parent();
        }
    });
    var serviceNumberTable = null;
    function getAllServiceMaster() {
        var materialGroup = "";
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                materialGroup = $(this).find("td").eq(17).children(".matlGroup").val();
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
    var currentClick = "";
    $("#serviceNumberTableId").on("click", ".serviceNumberTableCheckboxClass", function() {
        $(".serviceNumberTableCheckboxClass").prop("checked", false);
        var serviceNumber = $(this).parent().parent().find('td').eq(1).text();
        currentClick.find("td").eq(2).children(".ServicesNumber_Services").val(serviceNumber);
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
//                currentClick.find("td").eq(3).children(".shortText_Services").val(shorttext);
                currentClick.find("td").eq(5).children(".servicesUnit_Services").val(unit);
//                currentClick.find("td").eq(14).children(".serviceText").val(obj.SLTextInfo);

                updateShortTextAndServiceTextByServiceId(currentClick, obj);
            }
        });
        $("#ServiceNumberModal").modal("hide");
    });
    $("#accountAssignmentAddBtn").click(function() {
        $("#accountAssignmentModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("InputFields");
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
    $("#gLAccountTableId").on("click", ".gLCodeCheckboxClass", function() {
        $(".gLCodeCheckboxClass").prop("checked", false);
        var code = $(this).parent().parent().find("td").eq(1).text();
        var requestFrom = $("#ro_GLCOde").val();
        if (requestFrom === 'FromInputField') {
            $("#gLAccount").val(code);
            $("#accAsgnCommItemInput").val(code);
            $("#gLAccount").css("border-color", "");
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(3).children(".accAsgnGLAccount").val(code);
            currentClick.find("td").eq(9).children(".accAsgnCommitmentItem").val(code);
            currentClick.find("td").eq(3).children(".accAsgnGLAccount").css("border-color", "");
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
    $("#costCenterService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    trackingNumber = $(this).find("td").eq(29).children(".trackingNumber").val();
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
                        $(this).find("td").eq(29).children(".trackingNumber").focus();
                        status = "empty";
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
    var costCenterTable = null;
    function getAllCostCenter() {
        var trackingNumber = "";
        var companycodeHeader = $("#companycodeHeader").val();
        console.log("companycodeHeader :" + Number(companycodeHeader));
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                trackingNumber = $(this).find("td").eq(29).children(".trackingNumber").val();
            }
        });
        console.log("trackingNumber :" + trackingNumber);
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllCostCenter",
                "companyCode": companycodeHeader,
                "trackingNumber": trackingNumber
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='costCenterCheckboxClass'></td>"
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
    $("#costCenterTableId").on("click", ".costCenterCheckboxClass", function() {
        $(".costCenterCheckboxClass").prop("checked", false);
        var costCenter = $(this).parent().parent().find("td").eq(1).html();
        var companycode = $("#companycodeHeader").val();
        var requestFrom = $("#ro_costCenter").val();
        var fund;
        var coArea;
        var functionalArea;
        $("#costCenterModal").modal("hide");
        var costCenterId = $(this).val();
        var functionalArea = "";
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getFromCostCenter",
                "costCenter": costCenter
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("FUND :" + obj.FUND);
                console.log("FUNDCENTER :" + obj.FUNDCENTER);
                console.log("FUNCTIONALAREA :" + obj.FUNCTIONALAREA);
                console.log("COMMITMENTITEM :" + obj.COMMITMENTITEM);
                console.log("COAREA :" + obj.COAREA);
                coArea = obj.COAREA;
                functionalArea = obj.FUNCTIONALAREA;
            }
        });
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
            $("#accAsgnfunctionalArea").val(functionalArea);
            $("#costCenterAccAsgn").css("border-color", "");
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
            currentClick.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
            currentClick.find("td").eq(5).children(".accAsgnCostCetner").css("border-color", "");
            currentClick.find("td").eq(6).children(".accAsgnFund").val(fund);
            currentClick.find("td").eq(8).children(".accAsgnFundCenter").val(costCenter);
            currentClick.find("td").eq(7).children(".accAsgnFunctionalArea").val(functionalArea);
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#costCenterService").val(costCenter);
            $("#FundCenterServiceInput").val(costCenter);
            $("#fundService").val(fund);
            $("#coAreaService").val(coArea);
            $("#functionalAreaService").val(functionalArea);
            $("#costCenterService").css("border-color", "");
        } else if (requestFrom === 'FromLimitTabInputField') {
            $("#costCenterInp_Limits").val(costCenter);
            $("#fundCenterInp_Limits").val(costCenter);
            $("#fundInp_Limits").val(fund);
            $("#coAreaInp_Limits").val(coArea);
            $("#companyCodeInp_Limits").val(companycode);
            $("#functionalAreaInp_Limits").val(functionalArea);
            $("#costCenterInp_Limits").css("border-color", "");
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
    $("#OrderService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_Order").val("FromServiceTabInputField");
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
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(12).children(".accAsgnOrder").val(order);
            currentClick.find("td").eq(12).children(".accAsgnOrder").css("border-color", "");
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
    $("#AssetService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnAssetModal").modal("show");
            getAllMasterAsset();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_Asset").val("FromServiceTabInputField");
        }
    });
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
                            + "<td><input type='checkbox' class='accAsgnAssetCheckboxClass'><input type='hidden' class='assetGlCode' value=" + obj[i].GlCode + "></td>"
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
    $("#accAsgnAssetTableId").on("click", ".accAsgnAssetCheckboxClass", function() {
        $(".accAsgnAssetCheckboxClass").prop("checked", false);
        var asset = $(this).parent().parent().find('td').eq(1).text();
        var gLCode = $(this).parent().parent().find("td").eq(0).children(".assetGlCode").val();
        var requestFrom = $("#ro_Asset").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnAsset").val(asset);
            $("#accAsgnAsset").css("border-color", "");
            $("#gLAccount").val(gLCode);
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(13).children(".accAsgnAssets").val(asset);
            currentClick.find("td").eq(13).children(".accAsgnAssets").css("border-color", "");
            currentClick.find("td").eq(3).children(".accAsgnGLAccount").val(gLCode);
        } else if (requestFrom === "FromServiceTabInputField") {
            $("#AssetService").val(asset);
            $("#AssetService").css("border-color", "");
            $("#gLAccountService").val(gLCode);
            $("#accountAssignmentModal").modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            currentClick.find("td").eq(11).children(".serviceAccAsgnTblAssets").val(asset);
            currentClick.find("td").eq(11).children(".serviceAccAsgnTblAssets").css("border-color", "");
            currentClick.find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val(gLCode);
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === 'FromLimitTabInputField') {
            $("#assetInp_Limits").val(asset);
            $("#assetInp_Limits").css("border-color", "");
            $("#gLAccountInp_Limits").val(gLCode);
            $("#limitsAccAssignmentModal").modal('show');
        } else if (requestFrom === 'FromLimitTabAccAsgnTableInputField') {
            currentClick.find("td").eq(10).children(".limitAccAsgnTblAssets").val(asset);
            currentClick.find("td").eq(10).children(".limitAccAsgnTblAssets").css("border-color", "");
            currentClick.find("td").eq(2).children(".limitAccAsgnTblGLAccount").val(gLCode);
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#accAsgnAssetModal").modal("hide");
    });
    $("#WBSElementInputService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_WBSElement").val("FromServiceTabInputField");
        }
    });
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
    $("#WBSElementTableId").on("click", ".wBSElementCheckboxClass", function() {
        $(".wBSElementCheckboxClass").prop("checked", false);
        var element = $(this).parent().parent().find('td').eq(1).text();
        var requestFrom = $("#ro_WBSElement").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnWBSElementInput").val(element);
            $("#accAsgnWBSElementInput").css("border-color", "");
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(14).children(".accAsgnWBSElement").val(element);
            currentClick.find("td").eq(14).children(".accAsgnWBSElement").css("border-color", "");
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#WBSElementInputService").val(element);
            $("#accountAssignmentModal").modal("show");
            $("#WBSElementInputService").css("border-color", "");
        } else if (requestFrom === "FromServiceTabAccAsgnTableInputField") {
            currentClick.find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val(element);
            $("#changeAccountAssignmentScreenModal").modal("show");
            currentClick.find("td").eq(12).children(".serviceAccAsgnTblWBSElement").css("border-color", "");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#wBSElementInp_Limits").val(element);
            $("#limitsAccAssignmentModal").modal('show');
            $("#wBSElementInp_Limits").css("border-color", "");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            currentClick.find("td").eq(11).children(".limitAccAsgnTblWBSElement").val(element);
            $("#limitsChangeAccAsgnScreenModal").modal("show");
            currentClick.find("td").eq(11).children(".limitAccAsgnTblWBSElement").css("border-color", "");
        } else if (requestFrom === "ProfitabilitySegment") {
            $("#WBSElement").val(element);
//            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#WBSElementModal").modal("hide");
    });
    $("#SalesOrderService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#SalesOrderModal").modal("show");
            salesOrderFunction();
            $("#ro_SalesOrder").val("ServiceAccountAssignmentTabField");
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
            $("#accAsgnSalesOrder").css("border-color", "");
        } else if (reqFrom === "AccountAssignmentTable") {
            accAsgnCurrentTd.val(salesOrder);
            accAsgnCurrentTd.css("border-color", "");
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
    $("#ItemNumberService").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            $("#ro_ItemNumber").val("ServiceAccountAssignmentTabField");
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
            $("#assAsgnItemNumber").css("border-color", "");
        } else if (reqFrom === "AccountAssignmentTable") {
            accAsgnCurrentTd.val(itemNumber);
            accAsgnCurrentTd.css("border-color", "");
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
    $("#accAsgnCommItemInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#commitmentItemModal").modal("show");
            getAllCommitmentItem();
            $("#ro_CommitItem").val("FromInputField");
        }
    });
    var commitmentItemTable = null;
    function getAllCommitmentItem() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllCommitmentItem",
                "companyCode": $("#companycodeHeader").val()
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
    $("#commitmentItemTableId").on("click", ".commmentItemCheckboxClass", function() {
        $(".commmentItemCheckboxClass").prop("checked", false);
        var item = $(this).parent().parent().find("td").eq(1).text();
        var requestFrom = $("#ro_CommitItem").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnCommItemInput").val(item);
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(9).children(".accAsgnCommitmentItem").val(item);
        } else if (requestFrom === "InterCompany") {
            $("#interCompanyCommItemInput").val(item);
        }
        $("#commitmentItemModal").modal("hide");
    });
    $("#NActNumServiceInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#networkActivityNumberModal").modal('show');
            getAllMasterNetwork();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_NetworkNumber").val("FromServiceTabInputField");
        }
    });
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
    $("#networkActivityNumberTableId").on("click", ".networkActivityNumberCheckboxClass", function() {
        $(".networkActivityNumberCheckboxClass").prop("checked", false);
        var network = $(this).parent().parent().find("td").eq(1).text();
        var requestFrom = $("#ro_NetworkNumber").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnNActNumInput").val(network);
            $("#accAsgnNActNumInput").css("border-color", "");
        }
        else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(16).children(".accAsgnNetActNumber").val(network);
            currentClick.find("td").eq(16).children(".accAsgnNetActNumber").css("border-color", "");
        } else if (requestFrom === "FromServiceTabInputField") {
            $("#NActNumServiceInput").val(network);
            $("#NActNumServiceInput").css("border-color", "");
            $('#accountAssignmentModal').modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            currentClick.find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").val(network);
            currentClick.find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").css("border-color", "");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#nActNumServiceInp_Limits").val(network);
            $("#nActNumServiceInp_Limits").css("border-color", "");
            $('#limitsAccAssignmentModal').modal("show");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            currentClick.find("td").eq(13).children(".limitAccAsgnTblNetActNumber").val(network);
            currentClick.find("td").eq(13).children(".limitAccAsgnTblNetActNumber").css("border-color", "");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#networkActivityNumberModal").modal("hide");
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
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                plantCode = $(this).find("td").eq(16).children(".plantClass").val();
                linkid = $(this).find("td").eq(0).children(".linkid").val();
            }
        });
        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
        console.log("linkid :" + linkid);
        console.log("serviceLineItemNumber :" + serviceLineItemNumber);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getProfitabilitySegmentByLinkIdAndServiceLineItemNumber",
                "linkid": linkid,
                "serviceLineItemNumber": serviceLineItemNumber
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
    $("#limitBackChangedScreen").click(function() {
        $("#limitsAccAssignmentModal").modal("show");
        $("#limitsChangeAccAsgnScreenModal").modal("hide");
    });
    $("#accountAssignmentchangeScreenbtn").click(function() {
        $("#accountAssignmentModal").modal("hide");
        $("#changeAccountAssignmentScreenModal").modal("show");
        $("#accountAssignmentTebleId tbody tr").remove();
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services").val());
        var netvalue = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(8).children(".netPrice_Services").val());
        var percentage = 100;
        var rowCount = $("#serviceTabAccAsgnTebleId tr").closest("tr").length;
        if (rowCount === 2) {
            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quantityService).toFixed(3)));
            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
                "max": quantityService,
                "value": formatNumberByComma(quantityService)
            });
            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(Number(percentage).toFixed(2));
            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
                "max": percentage,
                "value": percentage
            });
//            if ($("#serviceTabAccAsgnTebleId tbody tr").length > 1) {
//                $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr("disabled", false);
//            }
//            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr("disabled", true);
            var lineItem = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
            var serviceNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".ServicesNumber_Services").val();
            var shortText = serviceTabTableCurrentTd.parent().parent().find("td").eq(3).children(".shortText_Services").val();
            var uom = serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".servicesUnit_Services").val();
            console.log("lineItem :" + lineItem);
            console.log("quantityService :" + quantityService);
            console.log("serviceNumber :" + serviceNumber);
            console.log("shortText :" + shortText);
            $("#accountAssignLine").val(lineItem);
            $("#accountAssignQuantity").val(formatNumberByComma(parseFloat(quantityService).toFixed(3)));
            $("#accountAssignActivity").val(serviceNumber);
            $("#accountAssignShortText").val(shortText);
            $("#accountAssignuom").val(uom);
            var accountAssignmentCategory = "";
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                if (prTableItemNumber === dropDownItemNumber) {
                    accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                }
            });
            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val($("#gLAccountService").val());
            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").val($("#coAreaService").val());
            $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(16).children(".netValue").val(netvalue);
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
        }
    });
    $("#backChangedScreen").click(function() {
        $("#changeAccountAssignmentScreenModal").modal("hide");
        $("#accountAssignmentModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("InputFields");
    });
    
    $("#serviceTabAccAsgnTebleId").on("change", ".serviceAccAsgnTblQuantity", function() {
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services").val());
        var Quantity = removeCommaInNumber($(this).val());
        var quantity = Number(Quantity).toFixed(1);
        $(this).val(formatNumberByComma(quantity));
        var glCode = "";
        var zgLCode = "";
        var current_tr = $(this).parent().parent();
        var accountAssignmentCategory;
        console.log("quantity :" + quantity);
        console.log("quantityService :" + quantityService);
        console.log("Max Quant :" + this.max);
        var remainingQuantity = (parseFloat(this.max) - parseFloat(quantity)).toFixed(1);
        var percentage = (quantity / (quantityService) * 100).toFixed(1);
        var remPer = (remainingQuantity / quantityService * 100).toFixed(1);
//        var prevLinkNumber = $(this).parent().parent().find("td").eq(16).children(".linkNumber").val();
        var prevLinkNumber = $("#serviceTabAccAsgnTebleId tbody tr").last().find("td").eq(16).children(".linkNumber").val();
//        var grossPrice = serviceTabTableCurrentTd.parent().parent().find("td").eq(6).children('.grossPrice_Services').val();
        var grossPrice = Number(removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(6).children('.grossPrice_Services').val())).toFixed(2);
        var linkNumber = parseInt(prevLinkNumber) + 10;
        var netValue = Number(remainingQuantity) * Number(grossPrice);
        if (parseFloat(removeCommaInNumber(this.value)) < parseFloat(this.max)) {
            $(this).attr({
                "max": quantity,
                "value": formatNumberByComma(quantity)
            });
            var max = $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
                "max": percentage,
                "value": formatAmountByComma(percentage)
            });
            $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(formatAmountByComma(percentage));
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var accAsgnCat = $("#accountAssignmentCategory").val();
                console.log("accAsgnCat in Quantity Distribute :" + accAsgnCat);
                if (prTableItemNumber === dropDownItemNumber) {
                    accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    var prType = $("#prType").val();
                    if (accAsgnCat !== "A" && prType === "Material") {
                        if (accAsgnCat !== "Z") {
                            glCode = $(this).find("td").eq(0).children(".prgLCode").val();
                        } else if (accAsgnCat === "Z") {
                            glCode = $(this).find("td").eq(0).children(".przGLCode").val();
                        }
                    } else if (accAsgnCat !== "A" && prType === "Service") {
                        glCode = $("#glCodeNot_A_In_ServicePR").val();
                    }

                }
            });
            $(this).parent().parent().find("td").eq(16).children(".netValue").val(Number(quantity) * Number(grossPrice));
            var tdrow = "<tr><td>" + "<i class='fa fa-window-close deleterowClass' aria-hidden='true' style='width:22px;'>" +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value=' + formatNumberByComma(remainingQuantity) + ' max=' + remainingQuantity + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" value=' + formatAmountByComma(remPer) + ' max=' + remPer + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" style="width: 100px;" value=' + glCode + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" style="width: 100px;" value=' + glCode + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" style="width: 100px;" value="">\n\
                    <input type="hidden" class="form-control form-rounded input-height netValue" value= ' + netValue + '>\n\
                    <input type="hidden" class="form-control form-rounded input-height linkNumber" value=' + linkNumber + '>' +
                    "</td></tr>";
            $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
//            current_tr.next().find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", true);
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", true);
            });
            serviceTabAccAsgnTblQuantPerChange(current_tr, accountAssignmentCategory);
        } else {
            $(this).val(formatNumberByComma(this.max));
        }
    });
    
    $("#serviceTabAccAsgnTebleId").on("change", ".serviceAccAsgnTblPercentage", function() {

        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services").val());
        var Percentage = removeCommaInNumber($(this).val());
        var percentage = parseFloat(Percentage).toFixed(1);
        var glCode = "";
        var accountAssignmentCategory;
        var current_tr = $(this).parent().parent();
        var maxQuantity = $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr("max");
        console.log("percentage :" + percentage);
        console.log("quantityService :" + quantityService);
        console.log("max :" + maxQuantity);
        var remPer = (this.max - percentage).toFixed(1);
        var quantFromPer = (parseInt(quantityService) * parseInt(percentage) / 100).toFixed(1);
        var remainingQuantity = (maxQuantity - parseFloat(quantFromPer)).toFixed(1);
        $(this).val(formatAmountByComma(percentage));
        if (parseFloat(removeCommaInNumber(this.value)) < parseFloat(this.max)) {
            $(this).attr({
                "max": percentage,
                "value": formatAmountByComma(percentage)
            });
            var max = $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
                "max": quantFromPer,
                "value": formatNumberByComma(quantFromPer)
            });
            $(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(quantFromPer));
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                if (prTableItemNumber === dropDownItemNumber) {
                    var prType = $("#prType").val();
                    accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    if (accountAssignmentCategory !== "A" && prType === "Material") {
                        if (accountAssignmentCategory !== "Z") {
                            glCode = $(this).find("td").eq(0).children(".prgLCode").val();
                        } else if (accountAssignmentCategory === "Z") {
                            glCode = $(this).find("td").eq(0).children(".przGLCode").val();
                        }
                    } else if (accountAssignmentCategory !== "A" && prType === "Service") {
                        glCode = $("#glCodeNot_A_In_ServicePR").val();
                    }
                }
            });
            var prevLinkNumber = $("#serviceTabAccAsgnTebleId tbody tr").last().find("td").eq(16).children(".linkNumber").val();
            var grossPrice = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(6).children('.grossPrice_Services').val());
            var linkNumber = parseInt(prevLinkNumber) + 10;
            var netValue = (parseInt(remainingQuantity) * parseInt(grossPrice)).toFixed(2);
            $(this).parent().parent().find("td").eq(16).children(".netValue").val(Number(quantFromPer) * Number(grossPrice));
//            alert("remainingQuantity :" + remainingQuantity + " ,grossPrice :" + grossPrice + " ,netValue :" + netValue);
            var tdrow = "<tr><td>" + "<i class='fa fa-window-close deleterowClass' aria-hidden='true' style='width:22px;'>" +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value=' + formatNumberByComma(remainingQuantity) + ' max=' + remainingQuantity + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" value=' + formatAmountByComma(remPer) + ' max=' + remPer + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" style="width: 100px;" value=' + glCode + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" style="width: 100px;" value=' + glCode + '>' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" style="width: 100px;" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" style="width: 100px;" value="">\n\
                    <input type="hidden" class="form-control form-rounded input-height netValue" value= ' + netValue + '>\n\
                    <input type="hidden" class="form-control form-rounded input-height linkNumber" value=' + linkNumber + '>' +
                    "</td></tr>";
            $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
//            current_tr.next().find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
            });
            serviceTabAccAsgnTblQuantPerChange(current_tr, accountAssignmentCategory);
        } else {
            $(this).val(formatAmountByComma(this.max));
        }

    });
    function serviceTabAccAsgnTblQuantPerChange(current_tr, accountAssignmentCategory) {
        if (accountAssignmentCategory === 'A') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(5).css("display", "none");
                $(this).next().find("td").eq(6).css("display", "none");
                $(this).next().find("td").eq(7).css("display", "none");
                $(this).next().find("td").eq(8).css("display", "none");
                $(this).next().find("td").eq(9).css("display", "none");
                $(this).next().find("td").eq(13).css("display", "none");
                $(this).next().find("td").eq(14).css("display", "none");
                $(this).next().find("td").eq(15).css("display", "none");
                $(this).next().find("td").eq(16).css("display", "none");
                $(this).next().find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).next().find("td").eq(12).children(".serviceAccAsgnTblWBSElement").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'C') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(5).css("display", "none");
                $(this).next().find("td").eq(6).css("display", "none");
                $(this).next().find("td").eq(7).css("display", "none");
                $(this).next().find("td").eq(8).css("display", "none");
                $(this).next().find("td").eq(9).css("display", "none");
                $(this).next().find("td").eq(10).css("display", "none");
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(12).css("display", "none");
                $(this).next().find("td").eq(14).css("display", "none");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'F') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(12).css("display", "none");
                $(this).next().find("td").eq(13).css("display", "none");
                $(this).next().find("td").eq(14).css("display", "none");
                $(this).next().find("td").eq(15).css("display", "none");
                $(this).next().find("td").eq(16).css("display", "none");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).next().find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).next().find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).next().find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).next().find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'K') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(10).css("display", "none");
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(12).css("display", "none");
                $(this).next().find("td").eq(13).css("display", "none");
                $(this).next().find("td").eq(14).css("display", "none");
                $(this).next().find("td").eq(15).css("display", "none");
                $(this).next().find("td").eq(16).css("display", "none");
                $(this).next().find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).next().find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).next().find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).next().find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).next().find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'N') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(6).css("display", "none");
                $(this).next().find("td").eq(7).css("display", "none");
                $(this).next().find("td").eq(8).css("display", "none");
                $(this).next().find("td").eq(9).css("display", "none");
                $(this).next().find("td").eq(10).css("display", "none");
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(12).css("display", "none");
                $(this).next().find("td").eq(13).css("display", "none");
                $(this).next().find("td").eq(15).css("display", "none");
                $(this).next().find("td").eq(16).css("display", "none");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).next().find("td").eq(5).children(".serviceAccAsgnTblCostCetner").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'P') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(5).css("display", "none");
                $(this).next().find("td").eq(6).css("display", "none");
                $(this).next().find("td").eq(7).css("display", "none");
                $(this).next().find("td").eq(8).css("display", "none");
                $(this).next().find("td").eq(9).css("display", "none");
                $(this).next().find("td").eq(10).css("display", "none");
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(13).css("display", "none");
                $(this).next().find("td").eq(15).css("display", "none");
                $(this).next().find("td").eq(16).css("display", "none");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'R') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(10).css("display", "none");
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(12).css("display", "none");
                $(this).next().find("td").eq(14).css("display", "none");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).next().find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).next().find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).next().find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).next().find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'X') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(6).css("display", "none");
                $(this).next().find("td").eq(7).css("display", "none");
                $(this).next().find("td").eq(8).css("display", "none");
                $(this).next().find("td").eq(9).css("display", "none");
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(14).css("display", "none");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'Z') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).next().find("td").eq(6).css("display", "none");
                $(this).next().find("td").eq(7).css("display", "none");
                $(this).next().find("td").eq(8).css("display", "none");
                $(this).next().find("td").eq(9).css("display", "none");
                $(this).next().find("td").eq(11).css("display", "none");
                $(this).next().find("td").eq(12).css("display", "none");
                $(this).next().find("td").eq(13).css("display", "none");
                $(this).next().find("td").eq(14).css("display", "none");
                $(this).next().find("td").eq(15).css("display", "none");
                $(this).next().find("td").eq(16).css("display", "none");
                $(this).next().find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        }
    }
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
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblCostCetner", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    trackingNumber = $(this).find("td").eq(29).children(".trackingNumber").val();
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
                        $(this).find("td").eq(29).children(".trackingNumber").focus();
                        status = "empty";
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
    $("#serviceTabAccAsgnTebleId").on("keypress", ".serviceAccAsgnTblOrder", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentClick = $(this).parent().parent();
            orderCurrent = $(this).parent().parent();
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#changeAccountAssignmentScreenModal").modal("hide");
            $("#ro_Order").val("FromServiceTabAccAsgnTableInputField");
        }
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
    $("#noMultiAcctAssignment").click(function() {
        $("#serviceTabAccAsgnTebleId :input").prop("disabled", true);
    });
    $("#distOnQuantBases").click(function() {
        $("#serviceTabAccAsgnTebleId :input").prop("disabled", false);
        var rowCount = serviceTabAccAsgnTebleId.rows.length;
        for (var i = rowCount - 1; i > 1; i--) {
            serviceTabAccAsgnTebleId.deleteRow(i);
        }
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services").val());
        var percentage = 100;
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quantityService).toFixed(3)));
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
            "max": quantityService,
            "value": formatNumberByComma(quantityService)
        });
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(Number(percentage).toFixed(2));
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
            "max": percentage,
            "value": percentage
        });
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", false);
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", true);
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            if (prTableItemNumber === dropDownItemNumber) {
                var accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                if (accountAssignmentCategory === 'A') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".serviceAccAsgnTblWBSElement").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'C') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'F') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'K') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'N') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'P') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'R') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'X') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'Z') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                }
            }
        });
    });
    $('#distByPercentage').click(function() {
        $("#serviceTabAccAsgnTebleId :input").prop("disabled", false);
        var rowCount = serviceTabAccAsgnTebleId.rows.length;
        for (var i = rowCount - 1; i > 1; i--) {
            serviceTabAccAsgnTebleId.deleteRow(i);
        }
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services").val());
        var percentage = 100;
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quantityService).toFixed(3)));
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
            "max": quantityService,
            "value": formatNumberByComma(quantityService)
        });
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(Number(percentage).toFixed(2));
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
            "max": percentage,
            "value": percentage
        });
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", false);
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            if (prTableItemNumber === dropDownItemNumber) {
                var accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                if (accountAssignmentCategory === 'A') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(12).children(".serviceAccAsgnTblWBSElement").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'C') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'F') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'K') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'N') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(5).children(".serviceAccAsgnTblCostCetner").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'P') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'R') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'X') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                } else if (accountAssignmentCategory === 'Z') {
                    $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                }
            }
        });
    });
    var rowCount;
    $("#serviceTabAccAsgnTebleId").on("click", ".deleterowClass", function() {
        rowCount = 0;
        var quantity = removeCommaInNumber($(this).parent().parent().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
        var netValue = $(this).parent().parent().find("td").eq(16).children(".netValue").val();
        var prevRowNetValue = $(this).parent().parent().prev().find("td").eq(16).children(".netValue").val();
        var prevRowquantity = removeCommaInNumber($(this).parent().parent().prev().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
        var per = $(this).parent().parent().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
        var prevRowPer = $(this).parent().parent().prev().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
        var quantityAfterRowDeletion = parseFloat(quantity) + parseFloat(prevRowquantity);
        var totalNetValue = parseFloat(netValue) + parseFloat(prevRowNetValue);
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            rowCount++;
        });
        var perAfterRowDeletion;
        if (rowCount === 2) {
//            perAfterRowDeletion = Math.round(parseFloat(per) + parseFloat(prevRowPer));
            perAfterRowDeletion = (parseFloat(per) + parseFloat(prevRowPer)).toFixed(2);
        } else {
            perAfterRowDeletion = parseFloat(per) + parseFloat(prevRowPer);
        }
        $(this).parent().parent().prev().find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(formatNumberByComma(Number(quantityAfterRowDeletion).toFixed(3)));
        $(this).parent().parent().prev().find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(Number(perAfterRowDeletion).toFixed(2));
        $(this).parent().parent().prev().find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
            "max": quantityAfterRowDeletion,
            "value": formatNumberByComma(quantityAfterRowDeletion)
        });
        $(this).parent().parent().prev().find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
            "max": perAfterRowDeletion,
            "value": perAfterRowDeletion
        });
        $(this).parent().parent().prev().find("td").eq(16).children(".netValue").val(totalNetValue);
        $(this).parent().parent().remove();
    });
    $("#limitsAccAsgnBtn").click(function() {
        $("#limitsAccAssignmentModal").modal("show");
        var accountAssignmentCategory;
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            }
        });
        callOnlyLimitAcAsgnFun(accountAssignmentCategory, "limitButton");
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
    $("#costCenterInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    trackingNumber = $(this).find("td").eq(29).children(".trackingNumber").val();
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
                        $(this).find("td").eq(29).children(".trackingNumber").focus();
                        status = "empty";
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
    $("#orderInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_Order").val("FromLimitTabInputField");
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
    $("#wBSElementInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_WBSElement").val("FromLimitTabInputField");
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
    $("#nActNumServiceInp_Limits").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#networkActivityNumberModal").modal('show');
            getAllMasterNetwork();
            $("#limitsAccAssignmentModal").modal("hide");
            $("#ro_NetworkNumber").val("FromLimitTabInputField");
        }
    });
    $("#limitAccAsgnChangeScreenbtn").click(function() {
        $("#limitsChangeAccAsgnScreenModal").modal("show");
        $("#limitsAccAssignmentModal").modal("hide");
        var limitAccountAssignmentTableLength = $('#limitTabAccAsgnTebleId tr').length;
        var accountAssignmentCategory;
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            if (prTableItemNumber === dropDownItemNumber) {
                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            }
            callOnlyLimitAcAsgnFun(accountAssignmentCategory, "");
        });
        if (limitAccountAssignmentTableLength === 1 || limitAccountAssignmentTableLength === 2) {
            var quantityService = 100;
            $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".limitAccAsgnTblQuantity").val(quantityService);
            $("#limitTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".limitAccAsgnTblQuantity").attr({
                "max": quantityService,
                "value": quantityService
            });
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                if (prTableItemNumber === dropDownItemNumber) {
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
    $("#limitTabAccAsgnTebleId").on("keypress", ".limitAccAsgnTblCostCetner", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    trackingNumber = $(this).find("td").eq(29).children(".trackingNumber").val();
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
                        $(this).find("td").eq(29).children(".trackingNumber").focus();
                        status = "empty";
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
    $("#gLAccount").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#gLAccountModal").modal("show");
            getAllGLCode();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_GLCOde").val("FromInputField");
        }
    });
    $("#costCenterAccAsgn").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var trackingNumber = "";
            var status = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    trackingNumber = $(this).find("td").eq(29).children(".trackingNumber").val();
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
                        $(this).find("td").eq(29).children(".trackingNumber").focus();
                        status = "empty";
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
            $("#ro_costCenter").val("FromInputField");
        }
    });
    $("#accAsgnOrder").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnOrderModal").modal("show");
            getAllInterOrder();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_Order").val("FromField");
        }
    });
    $("#accAsgnAsset").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#accAsgnAssetModal").modal("show");
            getAllMasterAsset();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_Asset").val("FromInputField");
        }
    });
    $("#accAsgnWBSElementInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#WBSElementModal").modal("show");
            getAllMasterWBSElement();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_WBSElement").val("FromInputField");
        }
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
    $("#accAsgnNActNumInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#networkActivityNumberModal").modal('show');
            getAllMasterNetwork();
            $("#accountAssignmentModal").modal("hide");
            $("#ro_NetworkNumber").val("FromInputField");
        }
    });
    var material_header_table_AccAsgn;
    var material_header_table_Quantity;
    var itemDropdownId;
    $("#costCenterAccountAssignmentchangeScreenbtn").click(function() {
        $(".costCenterDiv").css("display", "none");
        $(".multipleCostCenterDiv").css("display", "block");
        var material_header_table_AccAsgn = "";
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
        var order = set = $("#accAsgnAsset").val();
        var wBSElement = $("#accAsgnWBSElementInput").val();
        var accAsgnS_I_D = $("#accAsgnS_I_D").val();
        var network = $("#accAsgnNetActNumber").val();
        var salesOrder = $("#accAsgnSalesOrder").val();
        var itemNumber = $("#assAsgnItemNumber").val();
        var delSch = $("#assAsgnDelivSch").val();
        $("#accAsgnOrder").val();
        var asset = $("#accAsgnAsset").val();
        var wBSElement = $("#accAsgnWBSElementInput").val();
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
        var prType = $("#prType").val();
        if (prType === "Material") {
            $("#distribution").prop("disabled", false);
        }
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            if (prTableItemNumber === dropDownItemNumber) {
                material_header_table_Quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
            }
        });
        var rowCount = $("#costCenteraccountAssignmentTebleId tr").closest("tr").length;
        var reqFrom = $("#FromServiceAccountAssignment").val();
        if (rowCount === 2 && reqFrom !== "afterServiceAccAsgnSave") {
            var table_tr = $("#costCenteraccountAssignmentTebleId tbody tr");
            table_tr.find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(parseFloat(material_header_table_Quantity).toFixed(3)));
            table_tr.find("td").eq(1).children(".accAsgnQuantity").attr({
                "val": formatNumberByComma(parseFloat(material_header_table_Quantity).toFixed(1)),
                "max": parseFloat(material_header_table_Quantity).toFixed(1)
            });
            var percentage = 100;
            table_tr.find("td").eq(2).children(".accAsgnPercentage").val(parseFloat(percentage).toFixed(2));
            table_tr.find("td").eq(2).children(".accAsgnPercentage").attr({
                "val": parseFloat(percentage).toFixed(1),
                "max": parseFloat(percentage).toFixed(1)
            });
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#costCenteraccountAssignmentTebleId :input").prop("disabled", true);
            if (distribution === "Single Account Assignment") {
                $("#material_headerClass tbody tr").each(function() {
                    var prTableItemNumber = $(this).find("td").eq(1).html();
                    if (prTableItemNumber === dropDownItemNumber) {
                        material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    }
                });
                console.log("material_header_table_AccAsgn :" + material_header_table_AccAsgn);
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

        }
        if (distribution === "Distrib. On Quantity Basis") {
            distributionByQuantity();
        } else if (distribution === " Distrib. By Percentage") {
            distributionByPercentage();
        }
    });
    $("#costCenterAccountAssignmentTablechangeScreenbtn").click(function() {
        var distribution = $("#distribution").val();
        if (distribution !== 'Single Account Assignment') {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please change distribution to Single Account Assignment!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#distribution").focus();
//            $("#distribution").val("");
            $("#distribution").css("border-color", "red");
            return false;
        }
        $(".multipleCostCenterDiv").css("display", "none");
        $(".costCenterDiv").css("display", "block");
        if (distribution === 'Single Account Assignment') {
            $("#distribution").prop("disabled", true);
        }
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnQuantity", function() {
        var totalQuant = material_header_table_Quantity;
        var Quantity = removeCommaInNumber($(this).val());
        var quantity = parseFloat(Quantity).toFixed(1);
        var unloadingPoint = $("#unloadingPoint").val();
        var recipient = $("#recipient").val();
        var glCode = "";
        var coArea = $("#coArea").val();
        var costCenterAccAsgn = $("#costCenterAccAsgn").val();
        var accAsgnOrder = $("#accAsgnOrder").val();
        var accAsgnAsset = $("#accAsgnAsset").val();
        var accAsgnWBSElementInput = $("#accAsgnWBSElementInput").val();
        var accAsgnSalesOrder = $("#accAsgnSalesOrder").val();
        var assAsgnItemNumber = $("#assAsgnItemNumber").val();
        var assAsgnDelivSch = $("#assAsgnDelivSch").val();
        var accAsgnfund = $("#accAsgnfund").val();
        var accAsgnfunctionalArea = $("#accAsgnfunctionalArea").val();
        var accAsgnFundCenterInput = $("#accAsgnFundCenterInput").val();
        var accAsgnCommItemInput = $("#accAsgnCommItemInput").val();
        var accAsgnNActNumInput = $("#accAsgnNActNumInput").val();
        console.log("unloadingPoint :" + unloadingPoint);
        console.log("recipient :" + recipient);
        console.log("coArea :" + coArea);
        console.log("costCenterAccAsgn :" + costCenterAccAsgn);
        console.log("accAsgnOrder :" + accAsgnOrder);
        console.log("accAsgnAsset :" + accAsgnAsset);
        console.log("accAsgnWBSElementInput :" + accAsgnWBSElementInput);
        console.log("accAsgnSalesOrder :" + accAsgnSalesOrder);
        console.log("assAsgnItemNumber :" + assAsgnItemNumber);
        console.log("assAsgnDelivSch :" + assAsgnDelivSch);
        console.log("accAsgnfund :" + accAsgnfund);
        console.log("accAsgnfunctionalArea :" + accAsgnfunctionalArea);
        console.log("accAsgnFundCenterInput :" + accAsgnFundCenterInput);
        console.log("accAsgnCommItemInput :" + accAsgnCommItemInput);
        console.log("accAsgnNActNumInput :" + accAsgnNActNumInput);
        $(this).val(formatNumberByComma(quantity));
        var current_tr = $(this).parent().parent();
        console.log("quantity :" + quantity);
        console.log("totalQuant :" + totalQuant);
        console.log("Max Quant :" + this.max);
        var remainingQuantity = (parseFloat(this.max) - parseFloat(quantity)).toFixed(1);
        var percentage = (quantity / (totalQuant) * 100).toFixed(1);
        var remPer = (remainingQuantity / totalQuant * 100).toFixed(1);
        console.log("remainingQuantity :" + remainingQuantity);
        console.log("remPer :" + remPer);
        if (parseFloat(removeCommaInNumber(this.value)) < parseFloat(this.max)) {
            $(this).attr({
                "max": quantity,
                "value": formatNumberByComma(quantity)
            });
            $(this).val(formatNumberByComma(quantity));
            $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").attr({
                "max": percentage,
                "value": formatAmountByComma(percentage)
            });
            var accAsgnCat = $("#accountAssignmentCategory").val();
            $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val(formatAmountByComma(percentage));
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                if (prTableItemNumber === dropDownItemNumber) {
                    if (accAsgnCat !== "A") {
                        if (accAsgnCat !== "Z") {
                            glCode = $(this).find("td").eq(0).children(".prgLCode").val();
                        } else if (accAsgnCat === "Z") {
                            glCode = $(this).find("td").eq(0).children(".przGLCode").val();
                        }
                    }

                    var material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    var row = "<tr><td>" + "<i class='fa fa-window-close deleteAccAsgnTableRowClass' aria-hidden='true' style='width:22px;'>" +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" value=' + formatNumberByComma(remainingQuantity) + ' max=' + remainingQuantity + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" disabled value=' + formatAmountByComma(remPer) + ' max=' + remPer + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + glCode + ' disabled="true">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" disabled value="' + coArea + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value="' + costCenterAccAsgn + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value="' + accAsgnfund + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value="' + accAsgnfunctionalArea + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value="' + accAsgnFundCenterInput + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + glCode + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value="' + unloadingPoint + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value="' + recipient + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value="' + accAsgnOrder + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value="' + accAsgnAsset + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value="' + accAsgnWBSElementInput + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value="' + accAsgnSalesOrder + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value="' + accAsgnNActNumInput + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value="' + assAsgnItemNumber + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value="' + assAsgnDelivSch + '">' +
                            "</td></tr>";
                    $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);
                    accAsgnTblQuantPerChange(current_tr, material_header_table_AccAsgn);
                }
            });
        } else {
            $(this).val(formatNumberByComma(this.max));
        }
    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnPercentage", function() {
        var totalQuant = material_header_table_Quantity;
        var Percentage = removeCommaInNumber($(this).val());
        var percentage = parseFloat(Percentage).toFixed(1);
        var unloadingPoint = $("#unloadingPoint").val();
        var recipient = $("#recipient").val();
        var glCode = "";
        var coArea = $("#coArea").val();
        var costCenterAccAsgn = $("#costCenterAccAsgn").val();
        var accAsgnOrder = $("#accAsgnOrder").val();
        var accAsgnAsset = $("#accAsgnAsset").val();
        var accAsgnWBSElementInput = $("#accAsgnWBSElementInput").val();
        var accAsgnSalesOrder = $("#accAsgnSalesOrder").val();
        var assAsgnItemNumber = $("#assAsgnItemNumber").val();
        var assAsgnDelivSch = $("#assAsgnDelivSch").val();
        var accAsgnfund = $("#accAsgnfund").val();
        var accAsgnfunctionalArea = $("#accAsgnfunctionalArea").val();
        var accAsgnFundCenterInput = $("#accAsgnFundCenterInput").val();
        var accAsgnCommItemInput = $("#accAsgnCommItemInput").val();
        var accAsgnNActNumInput = $("#accAsgnNActNumInput").val();
        console.log("unloadingPoint :" + unloadingPoint);
        console.log("recipient :" + recipient);
        console.log("coArea :" + coArea);
        console.log("costCenterAccAsgn :" + costCenterAccAsgn);
        console.log("accAsgnOrder :" + accAsgnOrder);
        console.log("accAsgnAsset :" + accAsgnAsset);
        console.log("accAsgnWBSElementInput :" + accAsgnWBSElementInput);
        console.log("accAsgnSalesOrder :" + accAsgnSalesOrder);
        console.log("assAsgnItemNumber :" + assAsgnItemNumber);
        console.log("assAsgnDelivSch :" + assAsgnDelivSch);
        console.log("accAsgnfund :" + accAsgnfund);
        console.log("accAsgnfunctionalArea :" + accAsgnfunctionalArea);
        console.log("accAsgnFundCenterInput :" + accAsgnFundCenterInput);
        console.log("accAsgnCommItemInput :" + accAsgnCommItemInput);
        console.log("accAsgnNActNumInput :" + accAsgnNActNumInput);
        $(this).val(formatAmountByComma(percentage));
        var current_tr = $(this).parent().parent();
        var glCode = "";
        var maxQuantity = $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr("max");
        console.log("percentage :" + percentage);
        console.log("totalQuant :" + totalQuant);
        console.log("max :" + maxQuantity);
        var remPer = (this.max - percentage).toFixed(1);
        var quantFromPer = (parseInt(totalQuant) * parseInt(percentage) / 100).toFixed(1);
        var remainingQuantity = (maxQuantity - parseFloat(quantFromPer)).toFixed(1);
        if (parseFloat(removeCommaInNumber(this.value)) < parseFloat(this.max)) {
            $(this).attr({
                "max": percentage,
                "value": formatAmountByComma(percentage)
            });
            $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr({
                "max": quantFromPer,
                "value": formatNumberByComma(quantFromPer)
            });
            $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(Number(quantFromPer).toFixed(3)));
            var accAsgnCat = $("#accountAssignmentCategory").val();
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                if (prTableItemNumber === dropDownItemNumber) {
                    if (accAsgnCat !== "A") {
                        if (accAsgnCat !== "Z") {
                            glCode = $(this).find("td").eq(0).children(".prgLCode").val();
                        } else if (accAsgnCat === "Z") {
                            glCode = $(this).find("td").eq(0).children(".przGLCode").val();
                        }
                    }

                    var material_header_table_AccAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
                    var row = "<tr><td>" + "<i class='fa fa-window-close deleteAccAsgnTableRowClass' aria-hidden='true' style='width:22px;'>" +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" disabled value=' + formatNumberByComma(remainingQuantity) + ' max=' + remainingQuantity + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" value=' + formatAmountByComma(remPer) + ' max=' + remPer + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + glCode + ' disabled="true">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" disabled value="' + coArea + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value="' + costCenterAccAsgn + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value="' + accAsgnfund + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value="' + accAsgnfunctionalArea + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value="' + accAsgnFundCenterInput + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + glCode + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value="' + unloadingPoint + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value="' + recipient + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value="' + accAsgnOrder + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value="' + accAsgnAsset + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value="' + accAsgnWBSElementInput + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value="' + accAsgnSalesOrder + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value="' + accAsgnNActNumInput + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value="' + assAsgnItemNumber + '">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value="' + assAsgnDelivSch + '">' +
                            "</td></tr>";
                    $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);
                    accAsgnTblQuantPerChange(current_tr, material_header_table_AccAsgn);
                }
            });
        } else {
            $(this).val(formatAmountByComma(this.max));
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
            current_tr.next().find("td").eq(5).children(".accAsgnCostCetners").val("");
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(16).children(".accAsgnNetActNumber").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(12).children(".accAsgnOrder").val("");
            current_tr.next().find("td").eq(13).children(".accAsgnAssets").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").val("");
            current_tr.next().find("td").eq(17).children(".accAsgnItemNumber").val("");
            current_tr.next().find("td").eq(18).children(".accAsgnDeliverySchedule").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(14).children(".accAsgnWBSElement").val("");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").val("");
            current_tr.next().find("td").eq(17).children(".accAsgnItemNumber").val("");
            current_tr.next().find("td").eq(18).children(".accAsgnDeliverySchedule").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").val("");
            current_tr.next().find("td").eq(17).children(".accAsgnItemNumber").val("");
            current_tr.next().find("td").eq(18).children(".accAsgnDeliverySchedule").val("");
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
            current_tr.next().find("td").eq(5).children(".accAsgnCostCetner").val("");
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(12).children(".accAsgnOrder").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
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
                $(this).find("td").eq(17).css("display", "none");
                $(this).find("td").eq(18).css("display", "none");
            });
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(14).children(".accAsgnWBSElement").val("");
            current_tr.next().find("td").eq(16).children(".accAsgnNetActNumber").val("");
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
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(14).children(".accAsgnWBSElement").val("");
        } else if (material_header_table_AccAsgn === 'R') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(12).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(14).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
                $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", true);
                $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", true);
                $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", true);
                $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", true);
            });
            current_tr.next().find("td").eq(5).children(".accAsgnCostCetner").val("");
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").val("");
            current_tr.next().find("td").eq(17).children(".accAsgnItemNumber").val("");
            current_tr.next().find("td").eq(18).children(".accAsgnDeliverySchedule").val("");
        } else if (material_header_table_AccAsgn === 'T') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(6).css("display", "none");
                $(this).find("td").eq(7).css("display", "none");
                $(this).find("td").eq(8).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
            });
            current_tr.next().find("td").eq(5).children(".accAsgnCostCetner").val("");
            current_tr.next().find("td").eq(9).children(".accAsgnCommitmentItem").val("");
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(12).children(".accAsgnOrder").val("");
            current_tr.next().find("td").eq(14).children(".accAsgnWBSElement").val("");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").val("");
            current_tr.next().find("td").eq(16).children(".accAsgnNetActNumber").val("");
            current_tr.next().find("td").eq(17).children(".accAsgnItemNumber").val("");
            current_tr.next().find("td").eq(18).children(".accAsgnDeliverySchedule").val("");
        } else if (material_header_table_AccAsgn === 'X') {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(6).css("display", "none");
                $(this).find("td").eq(7).css("display", "none");
                $(this).find("td").eq(8).css("display", "none");
                $(this).find("td").eq(9).css("display", "none");
                $(this).find("td").eq(13).css("display", "none");
                $(this).find("td").eq(16).css("display", "none");
            });
            current_tr.next().find("td").eq(5).children(".accAsgnCostCetner").val("");
//            current_tr.next().find("td").eq(10).children(".accAsgnUnloadingPoint").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(12).children(".accAsgnOrder").val("");
            current_tr.next().find("td").eq(14).children(".accAsgnWBSElement").val("");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").val("");
            current_tr.next().find("td").eq(17).children(".accAsgnItemNumber").val("");
            current_tr.next().find("td").eq(18).children(".accAsgnDeliverySchedule").val("");
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
            current_tr.next().find("td").eq(5).children(".accAsgnCostCetner").val("");
//            current_tr.next().find("td").eq(11).children(".accAsgnRecipients").val("");
            current_tr.next().find("td").eq(12).children(".accAsgnOrder").val("");
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
        $(this).parent().parent().prev().find("td").eq(2).children(".accAsgnPercentage").val(Number(perAfterRowDeletion).toFixed(2));
        $(this).parent().parent().prev().find("td").eq(1).children(".accAsgnQuantity").attr({"max": quantityAfterRowDeletion,
            "value": formatNumberByComma(quantityAfterRowDeletion)
        });
        $(this).parent().parent().prev().find("td").eq(2).children(".accAsgnPercentage").attr({"max": perAfterRowDeletion,
            "value": perAfterRowDeletion
        });
        $(this).parent().parent().remove();
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
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {

                    var quantity = removeCommaInNumber($(this).find('td').eq(8).children(".quantity_Class").val());
                    var percentage = 100;
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(parseInt(quantity).toFixed(3)));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").val(parseInt(percentage).toFixed(2));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").attr({"max": parseInt(quantity).toFixed(1),
                        "value": formatNumberByComma(parseInt(quantity).toFixed(1))
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
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    var quantity = removeCommaInNumber($(this).find('td').eq(8).children(".quantity_Class").val());
                    var percentage = 100;
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(parseInt(quantity).toFixed(3)));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").val(parseInt(percentage).toFixed(2));
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").attr({"max": parseInt(quantity).toFixed(1),
                        "value": formatNumberByComma(parseInt(quantity).toFixed(1))
                    });
                    $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").attr({"max": parseInt(percentage).toFixed(1),
                        "value": parseInt(percentage).toFixed(1)
                    });
                    var accountAssignmentCategory = $(this).find('td').eq(2).children(".accountAssignmentClass").val();
                    distributionByPercentage();
                }
            });
        } else if (distribution === 'Single Account Assignment') {
            var quantity = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                }
            });
            var percentage = 100;
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".accAsgnQuantity").val(formatNumberByComma(parseFloat(quantity).toFixed(3)));
                $(this).find("td").eq(2).children(".accAsgnPercentage").val(parseFloat(percentage).toFixed(2));
            });
            $("#costCenteraccountAssignmentTebleId").find("tr:gt(1)").remove();
            $("#costCenteraccountAssignmentTebleId :input").prop("disabled", true);
        }
    });
    $("#purchasingOrg").click(function() {
        $("#PurchaseOrgModal").modal("show");
        getAllPurchaseOrg();
        $("#reqFromPurOrg").val("header");
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

        var sno = vendorSnoFromVM; // $("#vendorcodeHeader :selected").val();
        var orgData = $("#purchasingOrg").val();
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
                $("#postalCodeVendorAddress").val(obj.POSTAL_CODE);
                $("#cityVendorAddress").val(obj.CITY);
                $("#telephoneVendorAddress").val(obj.CONTACT);
                $("#countryVendorAddress").val(obj.COUNTRY);
                $("#countryCodeVendorAddress").val(obj.COUNTRY_CODE);
                $("#purchasingOrg").val(Number(obj.PURCHASE_ORG));
                $("#paymentTermsDelivery").val(obj.PAYMENT_TERM);
                $("#streetVendorAddress").val(obj.STREET);
                $("#houseNumberVendorAddress").val(obj.ADDRESS1 + ", " + obj.ADDRESS2 + ", " + obj.ADDRESS3);
                $("#extFax").val(obj.FAX_EXT);
                $("#faxVendorAddress").val(obj.FAX_NO);
                $("#vendorEmail").val(obj.EMAILID);
                $("#IncoTermsPart1").val(obj.INCO_TERM1);
                $("#IncoTermsPart2").val(obj.INCO_TERM2);
                $("#kalsmHiddenfield").val(obj.kalsm);
                $("#regNoHidden").val(obj.REGNO);
                var kalsm = obj.kalsm;
                console.log("kalsm: " + kalsm);
                $("#overlay").css("display", "block");
                Lobibox.notify("info", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please wait, fetching conditions..."
                });
                setTimeout(
                        function() {
                            $("#conditionHeaderReqFrom").val("VendorChange");
                            getAllByPricingProcedure(kalsm);
                            if (obj.PAYMENT_TERM !== "")
                            {
                                var WebServiceCallIp = $("#WebServiceCallIp").val();
                                console.log("WebServiceCallIp: " + WebServiceCallIp);
                                var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_ListPaymentTerms?PaymentTerm=" + obj.PAYMENT_TERM;
                                console.log("serviceUrl: " + serviceUrl);
                                //                    fetchStandAlonePaymentInDays("");
                                $.ajax({
                                    type: "GET",
                                    url: serviceUrl,
                                    contentType: "application/xml",
                                    dataType: "xml",
                                    async: false,
                                    success: function(data, textStatus, jqXHR) {
                                        console.log("success: " + data);
                                        fetchStandAlonePaymentInDays(data);
                                    }
                                });
                            }
                            // Fetch InfoRecord details
                            if ($("#poNumber").val() === "") {
                                setOverDelivTolAndUnderDelvTolInDelvTab("VendorChange");
                            }

                            var companyCodeHeader = $("#companycodeHeader").val();
                            var typeOfPOHeader = $("#typeOfPOHeader").val();
                            if (typeOfPOHeader === "Inter Company" || typeOfPOHeader === "Ferrous PO - Local") {
                                $.ajax({
                                    type: "GET",
                                    url: "ajaxcontroller.do",
                                    async: false,
                                    data: {"reqFrom": "getFundFMAreaByComCode",
                                        "companyCode": companyCodeHeader
                                    },
                                    complete: function(responseJson) {
                                        var obj = $.parseJSON(responseJson.responseText);
                                        console.log("FUND :" + obj.FUND);
                                        var fund = obj.FUND;
                                        $("#interCompanyFund").val(fund);
                                    }
                                });
                            }
                        }
                , 1000);
            }
        });
    });
    
    $("#puechaseOrgTableId").on("click", ".checkPurchaseOrgClass", function() {
        var reqFrom = $("#reqFromPurOrg").val();
        var errorMsg = "";
        var companycodeHeader = $("#companycodeHeader").val(); // By Bittu on 31/3/2020
        console.log("companycodeHeader :" + companycodeHeader);
        var code = $(this).parent().parent().find("td").eq(1).text();
        if (companycodeHeader === "0" + code || (companycodeHeader === "0641" && code === "640")) {
            if (reqFrom === "header") {
                $("#purchasingOrg").val(code);
                $("#purchasingOrg").css("border-color", "");
                $("#material_headerClass tbody tr").each(function() {
                    $(this).find("td").eq(18).children(".purchaseOrgClass").val(code);
                });
            } else if (reqFrom === "prtable") {
                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").css("border-color", "");
                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").val(code);
            }
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
                        var kalsm = obj.kalsm;
                        console.log("kalsm: " + kalsm);
                        getAllByPricingProcedure(kalsm);
                    }
                });
            }
        } else {
            errorMsg = "Please select valid Purchaseing Organisation!";
            if (reqFrom === "header") {
                $("#purchasingOrg").val("");
                $("#purchasingOrg").css("border-color", "red");
            } else if (reqFrom === "prtable") {
                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").val("");
                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").css("border-color", "red");
            }
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#PurchaseOrgModal").modal("hide");
            return false;
        }
//        if (companycodeHeader !== "0" + code || (companycodeHeader === "0641" && code === "640")) {
//            errorMsg = "Please select valid Purchaseing Organisation!";
//            if (reqFrom === "header") {
//                $("#purchasingOrg").val("");
//                $("#purchasingOrg").css("border-color", "red");
//            } else if (reqFrom === "prtable") {
//                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").val("");
//                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").css("border-color", "red");
//            }
//            Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            $("#PurchaseOrgModal").modal("hide");
//            return false;
//        } else {
//            if (reqFrom === "header") {
//
//                $("#purchasingOrg").val(code);
//                $("#purchasingOrg").css("border-color", "");
//                $("#material_headerClass tbody tr").each(function() {
//                    $(this).find("td").eq(18).children(".purchaseOrgClass").val(code);
//                });
//            } else if (reqFrom === "prtable") {
//                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").css("border-color", "");
//                currentPrLineRow.find("td").eq(18).children(".purchaseOrgClass").val(code);
//            }
//            $("#PurchaseOrgModal").modal("hide");
//            var sno = $("#vendorcodeHeader :selected").val();
//            if (sno !== "" && code !== "") {
//                $.ajax({
//                    type: "GET",
//                    url: "ajaxcontroller.do",
//                    async: false,
//                    data:
//                            {
//                                "reqFrom": "getVendorBySno",
//                                "sno": sno
//                            },
//                    dataType: "json",
//                    complete: function(responseJson)
//                    {
//                        var obj = $.parseJSON(responseJson.responseText);
//                        var SchemaGroup = obj.SCHEMA_GROUP;
//                        var kalsm = obj.kalsm;
//                        console.log("kalsm: " + kalsm);
//                        getAllByPricingProcedure(kalsm);
//                    }
//                });
//            }
//        }

    });
    var currentCondTabTr = "";
    var grossCondVal = "";
    $("#conditionTableIdLineLevel").on("change", ".AmountLineLevel", function() {
        var errorMsg = "";
        var Quantity;
        var fromCurrency;
        var netPrice;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prPerUnit = "";
        var conType = $(this).parent().prev().prev().children(".ConditionTypeLineLevel").val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                Quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                fromCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
                netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
                prPerUnit = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
            }
        });
        if (Quantity === "") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Quantity!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }

        if (netPrice === "") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the net price!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }

        if (prPerUnit === "") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the per unit!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }
        if (conType !== "PBXX") {
            if (Number(netPrice) < Number($(this).val())) {
                errorMsg = "Amount is greater then Net Value!";
                Lobibox.notify('warning', {
                    msg: errorMsg
                });
            }
        }

        grossCondVal = removeCommaInNumber($(this).parent().parent().parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueLineLevel").val());
        var amount = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(removeCommaInNumber(amount)));
        var perQty = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").val());
        var poQty = Quantity;
        var cType = $(this).parent().prev().prev().children(".newConditionTypeLineLevel").val();
        var condValue = "";
        var totalCondVal = 0;
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        if (conType === 'PBXX') {
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    $(this).find("td").eq(9).children(".prNetPrice").val(formatAmountByComma(Number(amount).toFixed(2)));
                    $(this).find("td").eq(0).children(".prNetPriceHidden").val(Number(amount).toFixed(2));
                    calculationForPBXXInStandalone();
                }
            });
        }

        var quant;
        var fml = formulaInStandAlone(conType);
        var exp = new String(fml);
        var expAfterSplit = exp.split("/");
//        if (expAfterSplit[0] === "(amount*poQty)") {
//            return false;
//        }
        condValue = eval(exp.toString());
        if (expAfterSplit[0].trim() === "(grossCondVal" || expAfterSplit[0].trim() === "amount") {
            $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").attr("disabled", true);
            $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").val("0.00");
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
        } else if (expAfterSplit[0].trim() === "(amount*poQty)") {
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
//        calculateConditionValueInStandAlone(amount, conType, perQty, poQty, oldAmount, oldPercentage);
        deleteRowFormConditionInStandAlone("");
        $(this).parent().children(".AmountLineLevelHidden").val(removeCommaInNumber($(this).val()));
//        }
    });
//    function getExchangeRate(toCurrency, fromCurrency) {
////        alert("toCurrency :" + toCurrency + " ,fromCurrency :" + fromCurrency);
//        var exchangeRate = "";
//        $.ajax({
//            type: "GET",
//            url: "doajaxrequest.do",
//            async: false,
//            data: {
//                "reqFrom": "getExchangeRate",
//                "toCurrency": toCurrency,
//                "fromCurrency": fromCurrency
//            },
//            complete: function(responseJson) {
//                var obj = $.parseJSON(responseJson.responseText);
//                exchangeRate = obj.ExchangeRate;
//                alert("exchangeRate :" + exchangeRate);
//            }
//        });
//        return exchangeRate;
//    }

    $("#conditionTableIdLineLevel").on("change", ".PerQuantityLineLavel", function() {
        var Quantity;
        var amount = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".AmountLineLevel").val());
        var perQuant = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(perQuant));
        var condValue = "";
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var totalCondVal = 0;
        var fromCurrency;
        //        var conType = $(this).parent().prev().prev().children(".ConditionTypeLineLevel").val();
        var conType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeLineLevel").val();
        var netPrice = "";
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                Quantity = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
                fromCurrency = $(this).find("td").eq(11).children('.currencyClass').val();
                netPrice = removeCommaInNumber($(this).find("td").eq(9).children('.prNetPrice').val());
            }
        });

        var fml = formulaInStandAlone(conType);
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
            $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavel").val("0.00");
        }
        var oldPercentage = $(this).parent().children(".PerQuantityLineLavelHidden").val();
        var oldAmount = $(this).parent().parent().find("td").eq(3).children(".AmountLineLevelHidden").val();
        calculateConditionValueInStandAlone(amount, conType, perQty, poQty, oldAmount, oldPercentage);
        if (conType === 'PBXX') {
            var taxCode = $("#TaxCode").val();
            var companycode = $("#companycodeHeader").val();
            var dmsip = $("#dmsip").val();
            var serviceUrl = dmsip + "/PR2POWebservice/ng/sapservice/POTaxCalc";
            console.log("serviceUrl: " + serviceUrl);
            var TaxPer = '';
//            TaxPer = getTaxResponseInStandalonePO(""); //Localhost 
            //                $("#overlay").css("display", "block");  //Localhost
//
            var xmlString = "<POTaxCalcIP>"
                    + "<CompCode>" + companycode + "</CompCode>"
                    + "<TaxCode>" + taxCode + "</TaxCode>"
                    + "<Currency></Currency>"
                    + "<Amount></Amount>"
                    + "</POTaxCalcIP>";
//
            var URLParam = xmlString;
            $.ajax({
                type: "POST",
                url: serviceUrl,
                contentType: "application/xml",
                dataType: "xml",
                data: URLParam,
                async: true,
                success: function(data, textStatus, jqXHR) {
                    console.log("Response: " + data);
                    TaxPer = getTaxResponseInStandalonePO(data);
                    console.log("TaxPer: " + TaxPer);
                    $("#overlay").css("display", "none");
                }
            });
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
                    PBXX_Per = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel").val());
                }
            });
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "NAVS") {
                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                    var fml = formulaInStandAlone(conType);
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
                    var fml = formulaInStandAlone(conType);
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
                    var fml = formulaInStandAlone(conType);
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
    });
    var TotalInsuranceCondVal = "";
    $("#conditionTableIdLineLevel").on("change", ".newAmountLineLevel", function() {
        var errorMsg = "";
        var grossCondVal = removeCommaInNumber($(this).parent().parent().parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueLineLevel").val());
        var Quantity;
        var amount = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(amount));
        var perQty = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").val());
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var cType = $(this).parent().prev().prev().children(".newConditionTypeLineLevel").val();
        var condValue = "";
        var totalCondVal = 0;
        var fromCurrency;
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        var netPrice = "";
        var prPerUnit = "";
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                Quantity = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
                fromCurrency = $(this).find("td").eq(11).children('.currencyClass').val();
                netPrice = removeCommaInNumber($(this).find("td").eq(9).children('.prNetPrice').val());
                prPerUnit = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
            }
        });
        if (Quantity === "") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Quantity!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }

        if (netPrice === "") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the net price!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }

        if (prPerUnit === "") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the per unit!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }
        if (conType !== "PBXX") {
            if (Number(netPrice) < Number($(this).val())) {
                errorMsg = "Amount is greater then Net Value!";
                Lobibox.notify('warning', {
                    msg: errorMsg
                });
            }
        }
        $(this).css("border-color", "");
        var poQty = Quantity;
        var quant;
        var fml = formulaInStandAlone(cType);
        var exp = new String(fml);
        var expAfterSplit = exp.split("/");
//        if (expAfterSplit[0] === "(amount*poQty)") {
//            return false;
//        }
        if (expAfterSplit[0].trim() === "(grossCondVal" || expAfterSplit[0].trim() === "amount") {
            condValue = eval(exp.toString());
            $(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").attr("disabled", true);
            $(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").val("0.00");
            if (toCurrency === fromCurrency || toCurrency === '%') {
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
//                alert("exchangeRate :" + exchangeRate);
                $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(condValue * exchangeRate).toFixed(2)));
            }
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

//        $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(condValue);
        var oldAmount = $(this).parent().children(".AmountLineLevelHidden").val();
        var oldPercentage = $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
        calculateConditionValueInStandAlone(amount, cType, perQty, poQty, oldAmount, oldPercentage);
        $(this).parent().children(".AmountLineLevelHidden").val(removeCommaInNumber($(this).val()));
    });
    
    $("#conditionTableIdLineLevel").on("change", ".newPerQuantityLineLavel ", function() {
        var Quantity;
        var amount = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".newAmountLineLevel").val());
        var perQuant = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(perQuant));
        var condValue = "";
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var totalCondVal = 0;
        var fromCurrency;
        var netPrice = "";
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                Quantity = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
                fromCurrency = $(this).find("td").eq(11).children('.currencyClass').val();
                netPrice = removeCommaInNumber($(this).find("td").eq(9).children('.prNetPrice').val());
            }
        });
        var conType = $(this).parent().parent().find("td").eq(1).children(".newConditionTypeLineLevel").val();
        var fml = formulaInStandAlone(conType);
        var poQty = Quantity;
        var perQty = perQuant;
        var quant;
        var exp = new String(fml);
        var expAfterSplit = exp.split("/");
        if (expAfterSplit[0] !== "(amount*poQty)") {
            return false;
        }
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
            $(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").val("0.00");
        }
//        $(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val(condValue);
        var oldPercentage = $(this).parent().children(".PerQuantityLineLavelHidden").val();
        var oldAmount = $(this).parent().parent().find("td").eq(3).children(".AmountLineLevelHidden").val();
        calculateConditionValueInStandAlone(amount, conType, perQty, poQty, oldAmount, oldPercentage);
        $(this).parent().children(".PerQuantityLineLavelHidden").val(removeCommaInNumber($(this).val()));
    });
    
    var conType = null;
    var condTabCurrentClick = "";
    $("#conditionTableIdLineLevel").on("keypress", ".newConditionTypeLineLevel", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var pricingprocedure = $("#kalsmHiddenfield").val();
            condTabCurrentClick = $(this);
            condTypeLineCurrent = $(this);
            $("#ConditionTypeModal").modal("show");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "getByPricingProcedure",
                    "pricingprocedure": pricingprocedure
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
        var prCurrency;
        var flag = false;
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                uom = $(this).find("td").eq(31).children(".prUom").val();
                prCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
            }
        });
        $("#conditionTableIdLineLevel tbody tr").not(':last').each(function() {
            var conType = $(this).find("td").eq(1).children('.newConditionTypeLineLevel').val();
            if (conType === undefined) {
                conType = "";
            }

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
//            else {
//                condTabCurrentClick.val(Ctype);
//                condTabCurrentClick.parent().parent().find("td").eq(2).children('.NameConditionsLineLevel').val(name);
//                if (crcy === "%") {
//                    condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').val("%");
//                } else {
//                    condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').val(prCurrency);
//                    condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').prop("disabled", false);
//                }
//                condTabCurrentClick.parent().parent().find("td").eq(9).children('.Currency2LineLevel').val(crcy);
//                condTabCurrentClick.parent().parent().find("td").eq(10).children('.ConditionValue2LineLevel').val("0.00");
//                condTabCurrentClick.parent().parent().find("td").eq(6).children('.ConditionPricingUnitLineLevel').val(uom);
//                condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMLineLevel').val(uom);
//                condTabCurrentClick.parent().parent().find("td").eq(3).children('.newAmountLineLevel').prop("disabled", false);
//                condTabCurrentClick.parent().parent().find("td").eq(5).children('.newPerQuantityLineLavel').prop("disabled", false);
//                if (condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMLineLevel').val() === "%") {
//                    condTabCurrentClick.parent().parent().find("td").eq(5).children('.newPerQuantityLineLavel').prop("disabled", false);
//                }
//
//
//
//                $.ajax({
//                    type: "GET",
//                    url: "ajaxcontroller.do",
//                    async: false,
//                    data: {
//                        "reqFrom": "getPricingProcedureByConditionType",
//                        "Ctype": Ctype
//                    },
//                    complete: function(responseJson) {
//                        var obj = $.parseJSON(responseJson.responseText);
//                        console.log("KAPPL :" + obj.KAPPL);
//                        condTabCurrentClick.parent().parent().find("td").eq(13).children('.conditionKAPPL').val(obj.KAPPL);
//                        condTabCurrentClick.parent().parent().find("td").eq(13).children('.conditionKVSL1').val(obj.KVSL1);
//                        condTabCurrentClick.parent().parent().find("td").eq(13).children('.conditionKVSL2').val(obj.KVSL2);
//                        condTabCurrentClick.parent().parent().find("td").eq(13).children('.conditionZAEHK').val(obj.ZAEHK);
//                        condTabCurrentClick.parent().parent().find("td").eq(13).children('.conditionSTUNR').val(obj.STUNR);
//                    }
//                });
//            }
        });
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
        var headerCurrency = $("#CurrencyDeliveryInvoice").val();
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                uom = $(this).find("td").eq(31).children(".prUom").val();
            }
        });
        condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMLineLevel').val(uom);
        condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyLineLevel').val(headerCurrency);
        $("#ConditionTypeModal").modal("hide");

        findApproverDetails();
    });
    var serviceTableId = "";
    var material_header_table_Currency = "";
    var material_header_table_Current_td = "";
    $(".ItemNumberSelectClass").change(function() {
        var item = $(this).val();
        var accAsgn = "";
        var itemCat = "";
        var errorMsg = "";
        var isPrSaved = "";
        var dropDownItemNumber = $(this).val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
            }
        });
        if (isPrSaved === "Yes") {
            $("#saveLineItemData").prop("disabled", false);
        }
        if (isPrSaved === "No") {
            $("#saveLineItemData").prop("disabled", true);
        }


//        var isLineLevelDataSavedSaved = "Yes";
//        $("#material_headerClass tbody tr").each(function() {
//            if ($(this).find("td").eq(0).children(".isLineLevelDataSavedSaved").val() === "No")
//            {
//                isLineLevelDataSavedSaved = "No";
//                return false;
//            }
//        });
//        if (isLineLevelDataSavedSaved === "No")
//        {
//            $("#createStandalonePoBtn").prop("disabled", true);
//        } else {
//            $("#createStandalonePoBtn").prop("disabled", false);
//        }

        var typeOfPOHeader = $("#typeOfPOHeader").val();
        if (typeOfPOHeader !== "Inter Company" && typeOfPOHeader !== "PO for Group Trade" && typeOfPOHeader !== "PO for Associate Trade" && typeOfPOHeader !== "PO for 3rd Party Trade" && typeOfPOHeader !== "Ferrous PO - Local") {
            if (accAsgn === "" && item !== "" && itemCat !== "L") {
                if (dropDownItemNumber !== "") {
                    errorMsg = "Please select the Account Assignment in PR!";
                    Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                }
                $('#hideLineLevelData').css("display", "none");
            } else if (item === "") {
                $('#hideLineLevelData').css("display", "none");
            } else {
                $('#hideLineLevelData').css("display", "block");
            }
        } else {
            $('#hideLineLevelData').css("display", "block");
        }
//SUNNY KUMAR PRAJAPATI
//        if (typeOfPOHeader === "Inter Company" || typeOfPOHeader === "Ferrous PO - Local" || typeOfPOHeader === "PO for Group Trade" || typeOfPOHeader === "PO for Associate Trade" || typeOfPOHeader === "PO for 3rd Party Trade") {
//            
//            if (accAsgn === "" && itemCat === "") {
//                $("#interCompanyAccAsgn").css({display: "block"});
//                $(".costCenterDiv").css({display: "none"});
////                $("#earMarkedFundsLabel").css({
////                    "display": "inline",
////                    "margin-left": "8px"
////                });
//            } else {
//                $("#interCompanyAccAsgn").css({display: "none"});
////                $(".costCenterDiv").css({display: "block"});
//                $(".costCenterDiv").css({display: "none"});
//                $(".multipleCostCenterDiv").css({display: "none"});
//            }
//        }


//        var creat_Edit = $("#creat_Edit").val();
//        var item = $(this).val();
//        if (creat_Edit === "edit") {
//            if (item !== "") {
//                $("#saveLineItemData").prop("disabled", false);
//            } else if (item === "") {
//                $("#saveLineItemData").prop("disabled", true);
//                $("#hideLineLevelData").css("display", "none");
//            }
//        }

        var accAsgnDesc;
        var itemcatogory;
        var itemCatDesc;
        var quantity;
        var perUnit;
        $("#serviceTableId tbody tr").each(function() {
            if ($(this).find("td").eq(0).children('.checkboxServices').prop("checked") === true) {
                $(this).find("td").eq(0).children('.checkboxServices').prop("checked", false);
            }
        });
        $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
        checkboxServicesArr = [];
        //        $("#overlay").css("display", "block");

        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var accountAssignmentCategory;
        var linkid = "";
        var ddCat = "";
        var poType = $("#typeOfPOHeader").val();
        var isLineLevelDataSavedSaved = "";
        $("#material_headerClass tbody tr").each(function() {
            $(this).find("input,select").prop("disabled", true);
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                isLineLevelDataSavedSaved = $(this).find("td").eq(0).children(".isLineLevelDataSavedSaved").val();
                console.log("isLineLevelDataSavedSaved: " + isLineLevelDataSavedSaved);
                $(this).find("input").prop("disabled", false);
                $(this).find("td").eq(11).children(".currencyClass").prop("disabled", true); //By Bittu on 31/3/2020
//                $(this).find("td").eq(16).children(".plantClass").prop("disabled", true);
//                $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", true);
                $(this).find("td").eq(18).children(".purchaseOrgClass").prop("disabled", true);
                $(this).find("td").eq(19).children(".purchaseGroupClass").prop("disabled", true);
                var prType = $("#prType").val();
                if (prType === "Service") {
                    $(this).find("td").eq(4).children(".materialCodeClass").prop("disabled", true);
                    $(this).find("td").eq(5).children(".poCriticality").prop("disabled", false);
                    $(this).find("td").eq(9).children(".prNetPrice").prop("disabled", true);
                } else if (prType === "Material") {
                    $(this).find("td").eq(17).children(".matlGroup").prop("disabled", true);
                    $(this).find("td").eq(16).children(".plantClass").prop("disabled", true);
                    $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", true);
                }
                if (poType === "Ferrous PO - Local") {
                    $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", false); //Bittu Kumar 08july2020
                }
                itemcatogory = $(this).find('td').eq(3).children(".itemCategoryClass").val();
                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                $("#accountAssignmentCategory").val(accountAssignmentCategory);
                $("#accountAssignmentCategoryTableId tbody tr").each(function() {
                    var accAsgn = $(this).find("td").eq(0).html();
                    if (accAsgn === accountAssignmentCategory) {
                        accAsgnDesc = $(this).find("td").eq(1).html();
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
                            $("#material_linelevel").addClass("active");
                            $("#material_linelevel-tab").addClass("active");
                            $("#material_linelevel-tab").addClass("show");
                        } else if ($("#limits").hasClass("active") === true) {
                            $("#limits_li").css("display", "none");
                            $("#limits-tab").removeClass("active");
                            $("#limits").removeClass("active");
                            $("#serviceTab_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                            $("#material_linelevel").addClass("active");
                            $("#material_linelevel-tab").addClass("active");
                            $("#material_linelevel-tab").addClass("show");
                        } else {
                            $("#serviceTab_li").css("display", "none");
                            $("#limits_li").css("display", "none");
                        }
                        return false;
                    }
                } else {
                    $("#serviceTab_li").css("display", "block");
                    $("#limits_li").css("display", "block");
                    if (itemcatogory !== 'D' && prType === "Material") {
                        if ($("#services").hasClass("active") === true) {
                            $("#serviceTab_li").css("display", "none");
                            $("#services-tab").removeClass("active");
                            $("#services").removeClass("active");
                            $("#limits_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                            $("#material_linelevel").addClass("active");
                            $("#material_linelevel-tab").addClass("active");
                            $("#material_linelevel-tab").addClass("show");
                        } else if ($("#limits").hasClass("active") === true) {
                            $("#limits_li").css("display", "none");
                            $("#limits-tab").removeClass("active");
                            $("#limits").removeClass("active");
                            $("#serviceTab_li").css("display", "none");
//                            $("#quantities").addClass("active");
//                            $("#quantities-tab").addClass("active");
//                            $("#quantities-tab").addClass("show");
                            $("#material_linelevel").addClass("active");
                            $("#material_linelevel-tab").addClass("active");
                            $("#material_linelevel-tab").addClass("show");
                        } else {
                            $("#serviceTab_li").css("display", "none");
                            $("#limits_li").css("display", "none");
                        }
                    } else {
                        $("#serviceTab_li").css("display", "block");
                        $("#limits_li").css("display", "block");
                    }
                }

                var typeOfPOHeader = $("#typeOfPOHeader").val();
                if ((typeOfPOHeader === "Inter Company" || typeOfPOHeader === "Ferrous PO - Local" || typeOfPOHeader === "PO for Group Trade" || typeOfPOHeader === "PO for Associate Trade"
                        || typeOfPOHeader === "PO for 3rd Party Trade") && accountAssignmentCategory === "" && itemcatogory === "") {
                    $("#interCompanyAccAsgn").css({display: "block"});
                    $(".costCenterDiv").css({display: "none"});
                    $(".multipleCostCenterDiv").css({display: "none"});
                } else {
                    $("#interCompanyAccAsgn").css({display: "none"});
                    $(".costCenterDiv").css({display: "none"});
                    $(".multipleCostCenterDiv").css({display: "none"});
//                if (typeOfPOHeader !== "Inter Company") {

                    callAllAcAsgnFun(accountAssignmentCategory, "itemCatDropDown");
                }
//                else {
////                    $("#interCompanyAccAsgn").css({display: "block"});
////                    $(".costCenterDiv").css({display: "none"});
//                }


                if (prType === "Material") {
                    if (accountAssignmentCategory === "" && itemcatogory === "L") {
//                        $("#component_li").css("display", "block");
                        $("#componentPopUpBtnDiv").css("display", "block");
                    } else {
//                        $("#component_li").css("display", "none");
                        $("#componentPopUpBtnDiv").css("display", "none");
                    }
                } else {
                    $("#componentPopUpBtnDiv").css("display", "none");
                }
                var PoId = $("#poid").val();
                var uom = "";
                $("#material_headerClass tbody tr").each(function() {
                    var dropDownItemNumber = $("#ItemNumberSelect").val();
                    var prTableItemNumber = $(this).find("td").eq(1).html();
                    if (prTableItemNumber === dropDownItemNumber) {
                        linkid = $(this).find("td").eq(0).children(".linkid").val();
                        uom = $(this).find("td").eq(31).children(".prUom").val();
                        ddCat = $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val();
                    }
                });
                quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                perUnit = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
                if ($("#prType").val() === "Material")
                {
                    $("#pOUnit").val(uom);
                    $("#pOUnitSKU").val(uom);
                    $("#unitOrderUnit").val(uom);
                    $("#unitOrderUnit2").val(uom);
                    $("#unitOrderPriceUnit").val(uom);
                    $("#unitSKUUnit").val(uom);
                    $("#orderUnit").val(formatAmountByComma(perUnit));
                    $("#orderUnit2").val(formatAmountByComma(perUnit));
                    $("#orderPriceUnit").val(formatAmountByComma(perUnit));
                    $("#sKUUnit").val(formatAmountByComma(perUnit));
                    $("#pOQuantity").val(formatNumberByComma(Number(quantity).toFixed(3)));
                    $("#pOQuantitySKU").val(formatNumberByComma(Number(quantity).toFixed(3)));
                    $("#netWeight").val("");
                    $("#grossWeight").val("");
                    $("#volume").val("");
                    $("#point").val("");
                }
                else
                {
                    $("#pOUnit").val(uom);
                    $("#pOUnitSKU").val("");
                    $("#unitOrderUnit").val(uom);
                    $("#unitOrderUnit2").val("");
                    $("#unitOrderPriceUnit").val(uom);
                    $("#unitSKUUnit").val("");
                    $("#orderUnit").val(formatAmountByComma(perUnit));
                    $("#orderUnit2").val("");
                    $("#orderPriceUnit").val(formatAmountByComma(perUnit));
                    $("#sKUUnit").val("");
                    $("#pOQuantity").val(formatNumberByComma(Number(quantity).toFixed(3)));
                    $("#pOQuantitySKU").val("");
                    $("#netWeight").val("");
                    $("#grossWeight").val("");
                    $("#volume").val("");
                    $("#point").val("");
                }

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

                if ($("#prType").val() === "Material") {
                    $("#serviceBasedIV").prop("checked", false);
                    $("#serviceBasedIVDiv").css("display", "none");
                } else {
                    $("#serviceBasedIVDiv").css("display", "block");
                }
                $("#InvoiceReceipt").prop("checked", true);
                $("#GRBasedIV").prop("checked", true);
                $("#InvoiceReceipt").prop("disabled", true);
                $("#GRBasedIV").prop("disabled", true);
            }
        });
        
        // Set Acc Ass Cat in AccAss Tab
        var accountAssignmentCategoryDisplay = findAccAssCatByAccountAssignmentCode(accAsgn);
        console.log("accountAssignmentCategoryDisplay 2: " + accountAssignmentCategoryDisplay);
//        $("#accountAssignmentCategoryDisplay").val(accountAssignmentCategoryDisplay);
//        $("#accountAssignmentCategoryDisplay").attr("value", accountAssignmentCategoryDisplay);
        $("#accountAssignmentCategoryDisplayDiv").text(accountAssignmentCategoryDisplay);
        
        $("#overlay").css("display", "block");
        setTimeout(
            function()
            {   
                console.log("accAsgn: " + accAsgn);
                console.log("itemcatogory: " + itemcatogory);
                var poid = $("#poid").val();
                console.log("poid: " + poid);
//                if (poid !== "") {
                    var prType = $("#prType").val();
                    console.log("prType: " + prType);
                    if (prType === "Service") {
                        getServiceByLinkidAndPoId(linkid);
                    }
                    if (itemcatogory === "L" && accAsgn === "") {
                        getComponentByLinkId(linkid);
                    }
                    getDeliveryScheduleByLinkId(linkid);
        //            getConditionsByLinkId(linkid);
//                }
                $("#material_headerClass tbody tr").each(function() {
                    var dropDownItemNumber = $("#ItemNumberSelect").val();
                    var prTableItemNumber = $(this).find("td").eq(1).html();
                    if (prTableItemNumber === dropDownItemNumber) {
                        var isFOCEnabled = $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked");
                        if (isFOCEnabled) {
                            $("#conditions_linelevel_li").css("display", "none");
                            $("#conditions_linelevel-tab").removeClass("active");
                            if ($(".collapseDivLineLevel").hasClass(".active") === false) {
                                $("#material_linelevel").addClass("active");
                                $("#material_linelevel-tab").addClass("active");
                                $("#material_linelevel-tab").addClass("show");
                            }
                        } else {
                            $("#conditions_linelevel_li").css("display", "block");
                            $(".collapseDivLineLevel").find(".active").removeClass("active");

                            $("#conditions_linelevel").addClass("active");
                            $("#conditions_linelevel-tab").addClass("active");
                            $("#conditions_linelevel-tab").addClass("show");
                        }

                        getConditionsByLinkId(linkid, isLineLevelDataSavedSaved);
                        if (poid === "") {
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                $(this).find("td").eq(3).children(".AmountLineLevel").val("");
                                $(this).find("td").eq(5).children(".PerQuantityLineLavel").val("");
        //                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val("");
                            });
                            calculationForPBXXInStandalone();
                        }
                    }
                });

        //Need to call function to populate line details
        //        var possition = $(this);
                var Result = popuDetails();
                if (Result === "NoRecordFound") {
                    var prType = $("#prType").val();
                    if (prType === "Material") {
                        var accountAssignmentCategory = "";
                        $("#material_headerClass tbody tr").each(function() {
                            var dropDownItemNumber = $("#ItemNumberSelect").val();
                            var prTableItemNumber = $(this).find("td").eq(1).html();
                            if (prTableItemNumber === dropDownItemNumber) {
                                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                            }
                        });
                        ArrayIsEmptyOnLineItemChange();
                        callOnlyMainAcAsgnFun(accountAssignmentCategory, "itemCatDropDown");
                    }
                    // Check print price by default in condition control tab on load
                    $("#PrintPrice").prop("checked", true);
                }

                if (prType === "Service") {
                    $("#account_assignment-tab :input").prop("disabled", true);
                    $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
                }
                // Fetch info record details
                if ($("#poNumber").val() === "") {
                    setOverDelivTolAndUnderDelvTolInDelvTab("ItemNumberChange");
                }
                $("#overlay").css("display", "none");
            }
        , 500);
    });
    $("#typeOfPOHeader").change(function() {
        $("#overlay").css("display", "block");
        var accAsgn;
        var itemCat;
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            }
        });
        var typeOfPO = $("#typeOfPOHeader").val();
        if (typeOfPO === 'Non-Ferrous PO - Imp' || typeOfPO === 'Ferrous Joint Pur' || typeOfPO === 'Ferrous PO - Import' || typeOfPO === 'Ferrous PO - Local'
                || typeOfPO === 'Non-Ferrous PO - Loc') {
            $("#customerdata_li").css({display: "block"});
        } else {
            $("#customerdata_li").css({display: "none"});
            console.log("Bittu");
        }


        if (typeOfPO === "Inter Company" || typeOfPO === "Ferrous PO - Local" || typeOfPO === "PO for Group Trade" || typeOfPO === "PO for Associate Trade"
                || typeOfPO === "PO for 3rd Party Trade") {
            if (typeOfPO === "Inter Company" || typeOfPO === "Ferrous PO - Local") {
                $("#validityFromHeaderDiv").css({"display": "block"});
                $("#validityToHeaderDiv").css({"display": "block"});
            } else {
                $("#validityFromHeaderDiv").css({"display": "none"});
                $("#validityToHeaderDiv").css({"display": "none"});
            }
            if (accAsgn === "" && itemCat === "") {
                $("#interCompanyAccAsgn").css({display: "block"});
                $(".costCenterDiv").css({display: "none"});
//                $("#earMarkedFundsLabel").css({
//                    "display": "inline",
//                    "margin-left": "8px"
//                });
            } else {
                $("#interCompanyAccAsgn").css({display: "none"});
                $(".costCenterDiv").css({display: "block"});
            }
        } else {
            $("#validityFromHeaderDiv").css({"display": "none"});
            $("#validityToHeaderDiv").css({"display": "none"});
        }

        prType = $("#prType").val();
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
            getAllByPricingProcedure(pricingprocedure);
        } else {
            $("#overlay").css("display", "none");
        }

        console.log("typeOfPOHeader 1024: " + $("#typeOfPOHeader").val());
        if ($("#typeOfPOHeader").val() === "PO for Services")
        {
            var accAssCat_temp1 = "";
            var itemCat_temp1 = "";
            $("#material_headerClass tbody tr").each(function(index) {
                if (index === 0) {
                    accAssCat_temp1 = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                    itemCat_temp1 = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                }
            });
            console.log("accAssCat_temp1: " + accAssCat_temp1);
            console.log("itemCat_temp1: " + itemCat_temp1);
            if (accAssCat_temp1 === "U" && itemCat_temp1 === "D")
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
        findApproverDetails();
    });
    /*SUNNY KUMAr PRAJAPATI CODE START*/
    $(".conditionTableClassLineLevel").on("click", ".deleteConditionTebleRowLineLevel", function() {
        var linkId;
//        var conditionType = $(this).parent().parent().find("td").eq(1).children(".newConditionTypeLineLevel").val();
        $(this).parent().parent().remove();
        /*Code Added By SUNNNY KUMAR PRAJAPATI on 07 June 2020*/

        var amount = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".newAmountLineLevel").val());
        var per = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".newPerQuantityLineLavel").val());
        var conVal = removeCommaInNumber($(this).parent().parent().find("td").eq(8).children(".ConditionValueLineLevel").val());
        var conType = $(this).parent().parent().find("td").eq(1).children(".newConditionTypeLineLevel").val();
        var oldAmount = $(this).parent().parent().find("td").eq(3).children(".AmountLineLevelHidden").val();
        var oldPercentage = $(this).parent().parent().find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
        deleteRowFormConditionInStandAlone("");
        /*Code added by SUNNY KUMAR PRAJAPATI on 08 June 2020*/
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                linkId = $(this).find("td").eq(0).children(".linkid").val();
            }
        });
        var count = 0;
        if (conditionLineLevelArraySA.length !== 0) {
            conditionLineLevelArraySA.forEach(function(e, index) {
                console.log("Ctype :" + e.Ctype + " ,conditionType :" + conType);
                if (conType === e.Ctype && linkId === e.linkid) {
                    conditionLineLevelArraySA.splice(index, 1);
                }
            });
            console.log("after delete Row in line :" + JSON.stringify(conditionLineLevelArraySA));
            var flag = false;
            for (var k = 0; k < conditionLineLevelArraySA.length; k++) {
                console.log("Find BITTU out:" + conditionLineLevelArraySA[k].Ctype);
                if (conType !== conditionLineLevelArraySA[k].Ctype) {
                    count++;
                } else {
                    console.log("Find BITTU :" + conditionLineLevelArraySA[k].Ctype);
                    flag = true;
                    break;
                }
//            });
            }
            if (flag === false) {
                $("#conditionTableId tbody tr").each(function(i) {
                    var condType = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
                    var changeid = $(this).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
                    console.log("condType delete [" + i + "] :" + condType + "changeid :" + changeid);
                    if (condType === conType && changeid === "I") {
                        console.log("I am Removing :" + condType);
                        $(this).remove();
                        return false;
                    }
                });
            } else if (flag === true) {
                $("#conditionTableId tbody tr").each(function(i) {
                    var totalamount = 0;
                    var totalPer = 0;
                    var totalConVal = 0;
                    var ctypeheader = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
                    var changeid = $(this).find("td").eq(11).children(".conditionHeaderCHANGEID").val();
                    var current = $(this);
                    conditionLineLevelArraySA.forEach(function(e, index) {
                        var conditionType = e.Ctype;
                        var linkid = e.linkid;
//                        console.log("ctypeheader :[" + index + "][" + i + "] :" + ctypeheader + " ,Ctype :" + e.Ctype + " ,linkId :" + linkId + " ,elinkid :" + e.linkid);
                        if (ctypeheader === e.Ctype && changeid === e.CHANGEID) {
                            console.log("ctypeheader :[" + index + "][" + i + "] :" + ctypeheader + " ,Ctype :" + e.Ctype + " ,linkId :" + linkId + " ,elinkid :" + e.linkid);
                            totalamount = Number(totalamount) + Number(e.amount);
                            totalPer = Number(totalPer) + Number(e.per);
                            totalConVal = Number(totalConVal) + Number(e.conditionValue);
                            console.log("totalamount ->" + totalamount + " , totalPer ->" + totalPer + " , totalConVal ->" + totalConVal)
//                            current.find("td").eq(3).children(".newAmountHeader").val(Number(totalamount).toFixed(2));
                            current.find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(Number(totalamount).toFixed(2)));
//                            current.find("td").eq(5).children(".newPerQuantityHeader").val(Number(totalPer).toFixed(2));
                            current.find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(Number(totalPer).toFixed(2)));
                            current.find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal).toFixed(2)));
//                            current.find("td").eq(3).children(".newAmountHeader").attr("value", Number(totalamount).toFixed(2));
//                            current.find("td").eq(5).children(".newPerQuantityHeader").attr("value", Number(totalPer).toFixed(2));
//                            current.find("td").eq(8).children(".ConditionValueHeader").attr("value", Number(totalConVal).toFixed(2));
                        }
                    });
                });
            }
            deleteRowFormConditionHeaderInStandAlone();
        }
    });
    /*SUNNY KUMAr PRAJAPATI CODE END*/

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
    $("#conditionDetailsLineBtn").click(function() {
        $("#conditiondetailsForm").trigger("reset");
        $("#conditiondetailsModal").modal("show");
        var vendorname = [];
        var currency1 = conditionTableCurrentClick.parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        var currency2 = conditionTableCurrentClick.parent().parent().find("td").eq(9).children(".Currency2LineLevel").val();
        var pricingUnit = conditionTableCurrentClick.parent().parent().find("td").eq(6).children(".ConditionPricingUnitLineLevel").val();
        var Uom = conditionTableCurrentClick.parent().parent().find("td").eq(7).children(".UoMLineLevel").val();
        var amount = removeCommaInNumber(conditionTableCurrentClick.parent().parent().find("td").eq(3).children("input[name=AmountLineLevel]").val());
        var condValue = removeCommaInNumber(conditionTableCurrentClick.parent().parent().find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
        var condType = conditionTableCurrentClick.parent().parent().find("td").eq(1).children("input[name=ConditionTypeLineLevel]").val();
        var condName = conditionTableCurrentClick.parent().parent().find("td").eq(2).children("input[name=nameConditionsLineLevel]").val();
        var kappl = conditionTableCurrentClick.parent().parent().find("td").eq(17).children(".conditionKAPPL").val();
        var kvsl1 = conditionTableCurrentClick.parent().parent().find("td").eq(17).children(".conditionKVSL1").val();
        var kvsl2 = conditionTableCurrentClick.parent().parent().find("td").eq(17).children(".conditionKVSL2").val();
        //        var vendor = $("#vendorcodeHeader : selected").text();
        var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        vendorname = vendor.split("-");
        vendor = conditionTableCurrentClick.parent().parent().find("td").eq(0).children(".conditionVendor").val();
        var fromCurrency;
        var item;
        //        var toCurrency = conditionTableCurrentClick.parent().parent().find("td").eq(4).children(".CurrencyLineLevel").val();
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
//                fromCurrency = $(this).find("td").eq(11).html();
                fromCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
                item = $(this).find("td").eq(1).text();
            }
        });
        var toCurrency1 = currency1;
        var toCurrency2 = currency2;
        var exchangeRate1 = getExchangeRate(toCurrency1, fromCurrency);
        var exchangeRate2 = getExchangeRate(toCurrency2, fromCurrency);
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
//        $(".modal-padding").css({
//            "padding-right": "430px",
//            "padding-left": "0px"
//        });
//       
//        $("#profitabilitySegmentModal").modal("show");
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
    $("#itemNumberProfitabilitySegment").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ItemNumberModal").modal("show");
            itemNumberFunction();
            $("#ro_ItemNumber").val("ProfitabilitySegment");
        }
    });
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
    $("#countryProfitabilitySegment").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#CountryModal").modal("show");
            $("#ro_country").val("FromProfitabilitySegment");
            getCountry();
        }
    });
    $("#countryCodeVendorAddress").click(function() {
        $("#CountryModal").modal("show");
        $("#ro_country").val("FromHeader");
        getCountry();
    });
    var countryTable = null;
    function getCountry() {
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

    $("#CountryTableId").on("click", ".checkCountryTableClass", function() {
        var code = $(this).parent().parent().find('td').eq(1).text();
        var name = $(this).parent().parent().find('td').eq(2).text();
        var reqFrom = $("#ro_country").val();
        if (reqFrom === "FromProfitabilitySegment") {
            $("#countryProfitabilitySegment").val(code);
        } else if (reqFrom === "FromHeader") {
            $("#countryCodeVendorAddress").val(code);
            $("#countryVendorAddress").val(name);
        }

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
    var currentMaterialTR = "";
    $("#material_headerClass").on("keypress", ".matlGroup", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentMaterialTR = $(this).parent().parent();
            currentPrRow = $(this).parent().parent();
            $("#MatlGroupModal").modal("show");
            getAllMaterialGroup();
            $("#materialGroupReqFrom").val("FromPRTable");
        }
    });
    $('#MatlGroup').keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#MatlGroupModal").modal("show");
            getAllMaterialGroup();
            $("#materialGroupReqFrom").val("FromField");
        }
    });
    var matlGroupTable = null;
    function getAllMaterialGroup() {
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

    var materialGroup = "";
    $("#MatlGroupTableId").on("click", ".checkMaterialGroupTableClass", function() {
        var group = $(this).parent().parent().find('td').eq(1).text();
        var reqFrom = $("#materialGroupReqFrom").val();
        if (reqFrom === "FromField") {
            $("#MatlGroup").val(group);
        } else if (reqFrom === "FromPRTable") {
//            currentMaterialTR.find("td").eq(17).children(".matlGroup").val(group);
//            currentMaterialTR.find("td").eq(17).children(".matlGroup").css("border-color", "");
            var prLength = $("#material_headerClass tbody tr").length;
//            if (materialGroup === "") {
            if (prLength === 1) {
                currentMaterialTR.find("td").eq(17).children(".matlGroup").val(group);
                currentMaterialTR.find("td").eq(17).children(".matlGroup").css("border-color", "");
                materialGroup = group;
            } else if (prLength !== 1) {
                if (group !== materialGroup) {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Material Group should be same for all PR!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    $(this).parent().parent().find("td").eq(2).children(".accountAssignmentClass").focus();
                    return false;
                } else {
                    currentMaterialTR.find("td").eq(17).children(".matlGroup").val(group);
                    currentMaterialTR.find("td").eq(17).children(".matlGroup").css("border-color", "");
                    materialGroup = group;
                }
            }
        }
        materialGroup = group;
        $("#MatlGroupModal").modal("hide");
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
    $("#serviceTableId").on("click", ".deleteServiceTebleRow", function() {
        var totalNetPrice = 0;
        var netPriceService = 0;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var current = $(this);
        var ischecked = $(this).parent().parent().find("td").eq(0).children(".checkboxServices").prop("checked");
        var serviceLength = $("#serviceTableId tbody tr").length;
        if (ischecked === false) {
            if (serviceLength !== 1) {
                $(this).parent().parent().remove();
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
            }
            $("#serviceTableId tbody tr").each(function() {
                netPriceService = removeCommaInNumber($(this).find("td").eq(8).children('.netPrice_Services').val());
                if (netPriceService !== "") {
                    totalNetPrice = totalNetPrice + parseInt(netPriceService);
                }
            });
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    $(this).find("td").eq(9).children('.prNetPrice').val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                    $(this).find("td").eq(0).children(".prNetPriceHidden").val(totalNetPrice);
                }
            });
            calculationForPBXXInStandalone();
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
            calculatePBXXForHeaderInStandalone();
        }
    });
    $("#addRowdeliveryScheduleBtnId").click(function() {
        var prNumber = "";
        var itemNumber = "";
        var prNumberOption = "";
        var itemNumberOption = "";
        var dropDownItemNumber;
        var prTableItemNumber;
        var delDate;
        var delDateCat = "";
        var PlannedDelvTime = $("#PlannedDelvTime").val();
        console.log("PlannedDelvTime: " + PlannedDelvTime);
        $("#material_headerClass tbody tr").each(function() {
            dropDownItemNumber = $("#ItemNumberSelect").val();
            prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                prNumber = $(this).find("td").eq(0).children(".prNumber").val();
                itemNumber = $(this).find("td").eq(1).text();
                delDate = $(this).find("td").eq(15).children(".deliveryDateClass").val();
                delDateCat = $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val();
            }
        });
        var currentDate = $("#currentDate").val();
        console.log("currentDate " + currentDate);
        console.log("prNumberOption :" + prNumberOption);
        console.log("itemNumberOption :" + itemNumberOption);
        var current_datetime = new Date();
        var day = current_datetime.getDate();
        var mon = current_datetime.getMonth() + 1;
        if (Number(day) < 10)
        {
            day = "0" + day;
        }
        if (Number(mon) < 10)
        {
            mon = "0" + mon;
        }

        var formatted_date = current_datetime.getFullYear() + "-" + mon + "-" + day;
        var delvSchLen = $("#DeliveryScheduleTableId tbody tr").length;
        var row = "";
        row = "<tr><td>"
                + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" name="" value=' + delDateCat + '>' + "</td><td>"
                + '<input readonly type="text" class="deliveryDateClass" style="width:150px;" value=' + delDate + '> <input type="hidden" class="delvSchDeliveryDatepicker">' + "</td><td>"
                + '<input readonly type="text" class="statistialDeliveryDate" style="width:150px;"> <input type="hidden" class="statistialDeliveryDatepicker">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" name="scheduledQuantity" style="width:150px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" name="timeDeliveryScheduled" value="">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" name="prNumberDeliveryScheduled" disabled>' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" name="reqItemNumber" disabled>' + "</td><td style='width:0px;'>"
                + '<input type="number" class="form-control form-rounded tableInputField gRQuantityClass" disabled>' + "</td><td>"
                + '<input type="number" class="form-control form-rounded tableInputField openQuantityClass" disabled>' + "</td><td>"
                + '<input type="text" class="form-control form-rounded tableInputField schLineClass" value=' + (delvSchLen + 1) + ' disabled>' + "</td><td>"
                + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>'
                + "</td></tr>";
        $("#DeliveryScheduleTableId").children("tbody").append(row);
        if ($("#prType").val() === "Material") {
            $('.delvSchDeliveryDatepicker').each(function() {
                $(this).datepicker({
                    showOn: "button",
                    buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                    minDate: 0,
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '2020:2050',
                    showWeek: true
                });
            });
            $('.statistialDeliveryDatepicker').each(function() {
                $(this).datepicker({
                    showOn: "button",
                    buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                    minDate: 0,
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '2020:2050',
                    showWeek: true
                });
            });
        } else if ($("#prType").val() === "Service") {
            $('.delvSchDeliveryDatepicker').each(function() {
                $(this).datepicker({
                    showOn: "button",
                    buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '2020:2050',
                    showWeek: true
                });
            });
            $('.statistialDeliveryDatepicker').each(function() {
                $(this).datepicker({
                    showOn: "button",
                    buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '2020:2050',
                    showWeek: true
                });
            });
        }
    });
    $("#DeliveryScheduleTableId").on("click", ".deleteDeliverySchTebleRow", function() {
        $(this).parent().parent().remove();
        var quantity = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".scheduledQuantityClass").val());
        var prevQuantity = removeCommaInNumber($(this).parent().parent().prev().find("td").eq(3).children(".scheduledQuantityClass").val());
        $("#DeliveryScheduleTableId tbody tr").each(function(index) {
            $(this).find("td").eq(9).children(".schLineClass").val(index + 1);
        });
    });
    var DeliveryScheduleTabTableCurrentTR;
    $("#DeliveryScheduleTableId").on("keypress", ".deliveryDateCategory", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $(".DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass").prop("checked", false);
            DeliveryScheduleTabTableCurrentTR = $(this);
            delDateCateCurrent = $(this);
            $("#DeliverySchedule-DelDateCategoryField-Picklist-Model").modal("show");
            $("#reqFromDelDateCat").val("FromDelSchTable");
        }
    });
    $(".DeliverySchedule-DelDateCategoryField-Picklist-CheckboxClass").click(function() {
        var val = $(this).parent().next("td").text();
        var valSubString = val.substring(0, 1);
        var reqFrom = $("#reqFromDelDateCat").val();
        if (reqFrom === "FromDelSchTable") {
            DeliveryScheduleTabTableCurrentTR.val(valSubString);
            DeliveryScheduleTabTableCurrentTR.parent().parent().find("td").eq(1).children(".deliveryDateClass").val("");
            DeliveryScheduleTabTableCurrentTR.parent().parent().find("td").eq(2).children(".statistialDeliveryDate").val("");
            updatePoLineDelvDateCatFromDelvSchTab(valSubString);
        } else if (reqFrom === "FromPR") {
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val(valSubString);
                }
            });
//            currentPrLineRow.find("td").eq(13).children(".pODeliveryDateCetegory").val(valSubString);
            $("#DeliveryScheduleTableId tbody tr").each(function() {
                $(this).find("td").eq(0).children(".deliveryDateCategory").val(valSubString);
            });
        }

        $("#DeliverySchedule-DelDateCategoryField-Picklist-Model").modal("hide");
    });
    $("#TaxCode").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            var regNo = $("#regNoHidden").val();
            var companyCode = $("#companycodeHeader").val();
            getTaxCode(regNo, companyCode);
        }
    });
    $("#TaxCodeTableId").on("click", ".checkTaxCodeTableClass", function() {

//        $("#overlay").css("display", "block");

        var taxCode = $(this).parent().parent().find("td").eq(1).text();
        var taxCodeDesc = $(this).parent().parent().find("td").eq(2).text();
        var TexCodeForLine = $("#TexCodeForLine").val();
        if (TexCodeForLine === "") {
            $("#TexCodeForLine").val(taxCode);
        }
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                $(this).find("td").eq(0).children(".TexCodeForLineInPr").val(taxCode);
            }
        });
        $("#TaxCode").val(taxCode);
        $("#TaxCode").css("border-color", "");
//        $("#TaxCodeDescription").val(taxCodeDesc);
        $("#TaxCodeModal").modal("hide");
        $("#overlay").css("display", "block");
        setTimeout(
                function() {
                    var fromCurrency = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var dropDownItemNumber = $("#ItemNumberSelect").val();
                        var prTableItemNumber = $(this).find("td").eq(1).html();
                        if (prTableItemNumber === dropDownItemNumber) {
                            $(this).find("td").eq(0).children(".prTaxCode").val(taxCode);
                            fromCurrency = $(this).find("td").eq(10).html();
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
//                TaxPer = getTaxResponseInStandalonePO("");  //Localhost 

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
                                    TaxPer = getTaxResponseInStandalonePO(data);
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
                                    PBXX_Per = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel").val());
                                }
                            });
                            $("#conditionTableIdLineLevel tbody tr").each(function() {
                                var conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                if ($(this).find("td").eq(1).children(".ConditionTypeLineLevel").val() === "NAVS") {
                                    var toCurrency = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                                    var fml = formulaInStandAlone(conType);
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
                                    var fml = formulaInStandAlone(conType);
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
                                    var fml = formulaInStandAlone(conType);
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
                    findApproverDetails();
                    $("#overlay").css("display", "none");
                }
        , 1000);
    });

    var componentTabCurrentLoc = "";
    $("#componentTableIdLineLevel").on("keypress", ".comMaterial", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#materialRequestFrom").val("FromComponentTab");
            componentTabCurrentLoc = $(this).parent().parent();
            $("#componentsModal").modal("hide");
            var prAccAss = "";
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    prAccAss = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                    return;
                }
            });
            console.log("prAccAss: " + prAccAss);

            $("#overlay").css("display", "block");
            $("#lastMatSno").val("");
            $("#materialRecordCount").val("");
            $("#materialCodeShortText_SearchText").val("");
            setTimeout(function() {
                getMaterialMaster(prAccAss);
                $("#overlay").css("display", "none");
                $("#materialMasterModal").modal("show");
            }, 1000);
        }
    });

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
        $("#PlantModal").modal("hide");
        componentTabCurrentLoc.find("td").eq(2).children(".comPlant").css("border-color", "");
        $("#componentsModal").modal("show");
        $("#componentsModal").css({
            "padding-right": 430,
            "padding-left": 0,
            "padding-top": 70
        });
    });
    $("#componentAddRowBtn").click(function() {

        var material = "";
        var desc = "";
        var plantcode = "";
        var uom = "";
        var stLoc = "";
        var itemnumber = "";
        var reqDate = "";
        var latestReqDate = "";
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
//                matcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                desc = $(this).find("td").eq(6).children(".prShortText").val();
//                plantcode = $(this).find("td").eq(16).children(".plantClass").val();
                uom = $(this).find("td").eq(31).children(".prUom").val();
                stLoc = $(this).find("td").eq(20).children(".storageLocationClass").val();
                itemnumber = $(this).find("td").eq(1).text();
            }
        });
        $("#componentTableIdLineLevel tbody tr").each(function(index) {
            if (index === 0)
            {
                material = $(this).find("td").eq(0).children(".comMaterial").val();
                plantcode = $(this).find("td").eq(2).children(".comPlant").val();
                reqDate = $(this).find("td").eq(7).children(".comRequirementDate").val();
                latestReqDate = $(this).find("td").eq(9).children(".latReqDate").val();
                return;
            }
        });
        var row = "";
        row = "<tr><td>"
                + '<input type="text" class="form-control form-rounded input-height comMaterial" value="' + material + '" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comDescription" value="' + desc + '" style="width:200px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comPlant" value="' + plantcode + '" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comUnit" value="' + uom + '" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comQuantity" value="" style="width:150px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comProdStorageLoc" value="' + stLoc + '" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comSupplyArea" value="" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="comRequirementDate" style="width:150px;" value="' + reqDate + '" disabled><input type="hidden" class="reqDatepicker">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height qtyIsFixed" value="" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="latReqDate" style="width:150px;" value=' + latestReqDate + ' disabled> <input type="hidden" class="latReqDatepicker">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height distKey" value="" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height itemNumber" disabled value="' + itemnumber + '" style="width:100px;">' + "</td><td>"
                + '<input type="text" class="form-control form-rounded input-height comBatch" value="" style="width:100px;">' + "</td><td>"
                + '<i title="Delete Row" class="fa fa-window-close btn-lg componentDeleteTebleRow" aria-hidden="true" style="width:10px;padding;float:right;: 0px 8px;"></i>'
                + "</td></tr>";
        $("#componentTableIdLineLevel tbody").append(row);
        $('.latReqDatepicker').each(function() {
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
        $('.reqDatepicker').each(function() {
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
    });
    $("#componentTableIdLineLevel").on("click", ".componentDeleteTebleRow", function() {
        $(this).parent().parent().remove();
    });
    
    $("#serviceTableId").on("change", ".quantity_Services", function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var quantity = removeCommaInNumber($(this).val());
        $(this).val(formatNumberByComma(quantity));
        var totalNetPrice = 0;
        var netPriceService = 0;
        console.log(quantity);
        var grossprice = removeCommaInNumber($(this).parent().parent().find("td").eq(6).children(".grossPrice_Services").val());
        console.log(grossprice);
        if (grossprice !== "" && quantity !== "") {
            var netprice = parseInt(quantity) * parseInt(grossprice);
            var netValue = Number(netprice) * Number(quantity);
            $(this).parent().parent().find("td").eq(8).children(".netPrice_Services").val(formatAmountByComma(Number(netprice).toFixed(2)));
            $(this).parent().parent().find("td").eq(12).children(".serviceNetValue").val(formatAmountByComma(Number(netprice).toFixed(2)));
            $("#serviceTableId tbody tr").each(function() {
                netPriceService = removeCommaInNumber($(this).find("td").eq(8).children('.netPrice_Services').val());
                if (netPriceService !== "") {
                    totalNetPrice = totalNetPrice + parseInt(netPriceService);
                }
            });
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    $(this).find("td").eq(9).children('.prNetPrice').val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                    $(this).find('td').eq(9).children(".prNetPrice").attr("value", formatAmountByComma(Number(totalNetPrice)));

                    $(this).find("td").eq(0).children('.prNetPriceHidden').val(totalNetPrice);
                }
            });
            calculationForPBXXInStandalone();
            calculatePBXXForHeaderInStandalone();
        }
    });
    
    $("#serviceTableId").on("change", ".grossPrice_Services", function() {
        var grossprice = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(grossprice));
        var totalNetPrice = 0;
        var netPriceService = 0;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        console.log("grossprice on grossprice change :" + grossprice);
        var quantity = removeCommaInNumber($(this).parent().parent().find("td").eq(4).children(".quantity_Services").val());
        console.log("quantity on grossprice change :" + quantity);
        if (grossprice !== "" && quantity !== "") {
            var netprice = parseInt(quantity) * parseInt(grossprice);
            var netValue = Number(netprice) * Number(quantity);
            $(this).parent().parent().find("td").eq(8).children(".netPrice_Services").val(formatAmountByComma(Number(netprice).toFixed(2)));
            $(this).parent().parent().find("td").eq(12).children(".serviceNetValue").val(formatAmountByComma(Number(netprice).toFixed(2)));
            $("#serviceTableId tbody tr").each(function() {
                netPriceService = removeCommaInNumber($(this).find("td").eq(8).children('.netPrice_Services').val());
                if (netPriceService !== "") {
                    totalNetPrice = totalNetPrice + parseInt(netPriceService);
                }
            });
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    $(this).find("td").eq(9).children('.prNetPrice').val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                    $(this).find('td').eq(9).children(".prNetPrice").attr("value", formatAmountByComma(Number(totalNetPrice)));

                    $(this).find("td").eq(0).children('.prNetPriceHidden').val(totalNetPrice);
                }
            });
            calculationForPBXXInStandalone();
            calculatePBXXForHeaderInStandalone();
        }

    });
    $("#ExpectedValue").change(function() {
        var expectedvalue = removeCommaInNumber($(this).val());
        $(this).val(formatAmountByComma(expectedvalue));
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                var totalNetPrice = removeCommaInNumber($(this).parent().find("td").eq(9).children('.prNetPrice').val());
                if (totalNetPrice !== "") {
                    $(this).parent().find("td").eq(9).children('.prNetPrice').val(formatAmountByComma(Number(parseInt(expectedvalue) + parseInt(totalNetPrice)).toFixed(2)));
                } else {
                    totalNetPrice = 0;
                    $(this).parent().find("td").eq(9).children('.prNetPrice').val(formatAmountByComma(Number(parseInt(expectedvalue) + parseInt(totalNetPrice)).toFixed(2)));
                }
            }
        });
    });
    $("#material_headerClass").on("change", ".deliveryDateClass", function() {
        $(this).css("border-color", "");
    });
    $("#material_headerClass").on("change", ".matlGroup", function() {
        $(this).css("border-color", "");
    });
    $("#material_headerClass").on("change", ".poCriticality", function() {
        $(this).css("border-color", "");
    });
    $("#material_headerClass").on("change", ".prShortText", function() {
        $(this).css("border-color", "");
        $(this).val("h-" + $(this).val());
        var insertionOrderId = $(this).parent().parent().find("td").eq(1).html();
        var prShortText = $(this).val();
        console.log("prShortText: " + prShortText);
        console.log("insertionOrderId: " + insertionOrderId);

        $(".ItemNumberSelectClass option").each(function() {
            var optionVal = $(this).prop("value");
            var optionText = $(this).text().split(" - ");
            console.log("optionVal: " + optionVal);
            console.log("optionText: " + optionText[0]);
            if (insertionOrderId === optionVal)
            {
                $(this).text(optionText[0] + " - " + prShortText);
                return;
            }
        });
    });
//    $("#material_headerClass").on("change", ".prNetPrice", function() {
//        $(this).css("border-color", "");
//    });
    $("#material_headerClass").on("change", ".prPerUnit", function() {
        $(this).css("border-color", "");
    });
    $("#pONotetoApproverHeaderTextsLimits").change(function() {
        $(this).css("border-color", "");
    });
    $("#saveHeadersa").click(function() {
        $("#reqDataSavedOnPoNumer").val("");
        saveHeadersa("SaveHeaderButton");
    });
    $("#componentTableIdLineLevel").on("change", ".comQuantity", function() {
        $(this).css("border-color", "");
        $(this).val(formatNumberByComma(removeCommaInNumber($(this).val())));
    });
    $("#componentTableIdLineLevel").on("change", ".comUnit", function() {               //Temporary
        $(this).css("border-color", "");
    });
    $("#componentTableIdLineLevel").on("change", ".comProdStorageLoc", function() {         //Temporary
        $(this).css("border-color", "");
    });
    $("#componentTableIdLineLevel").on("change", ".comSupplyArea", function() {             //Temporary
        $(this).css("border-color", "");
    });
    $("#componentTableIdLineLevel").on("change", ".comRequirementDate", function() {
        $(this).css("border-color", "");
    });
    $("#confControlLimits").change(function() {
        $(this).css("border-color", "");
    });
    $("#DeliveryScheduleTableId").on("change", ".scheduledQuantityClass", function() {
//        $(this).css("border-color", "");
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
        $(this).val(formatNumberByComma(removeCommaInNumber($(this).val())));
    });
    $("#OverallLimit").change(function() {
        $(this).css("border-color", "");
        $(this).val(formatAmountByComma(removeCommaInNumber($(this).val())));
    });
    $("#ExpectedValue").change(function() {
        $(this).css("border-color", "");
    });
//function savePrSubLine() {     var amountArr = [];     var perArr = [];     var canValArr = [];
    var lobiboxNotifyAlert = null;
    $("#saveLineItemData").click(function() {
        var accAsgn = "";
        var itemCat = "";
        amountArr = [];
        perArr = [];
        canValArr = [];
        condType = [];
        condName = [];
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            }
        });
        var isAccAsgnSaved = "Yes";
        var prIndex = -1;
        $(".collapseDivLineLevel").find(".active").removeClass("active");
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
                    console.log("lobiboxNotifyAlert: " + lobiboxNotifyAlert);
                    if (lobiboxNotifyAlert !== null && lobiboxNotifyAlert !== undefined)
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
                var lobiboxNotifyAlert = null;
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


        var poId = $("#poid").val();
        var prItemNumber = "";
        var linkid = "";
        var InvoiceReceipt;
        var FinalInvoice;
        var GRBasedIV;
        var serviceBasedIV;
        var DPCategory = $("#DPCategory").val();
        var TaxCode = $("#TaxCode").val();
        var LineItemNum = $("#ItemNumberSelect").val();
        var dropDownItemNumber = $("#ItemNumberSelect").val();
//        var taxCodeDesc = $("#TaxCodeDescription").val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                linkid = $(this).find("td").eq(0).children(".linkid").val();
                prItemNumber = $(this).find("td").eq(1).text();
            }
        });
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
            serviceBasedIV = "true";
        } else {
            serviceBasedIV = "false";
        }
        var accAsgnLen = $("#costCenteraccountAssignmentTebleId tbody tr").length;
        var gLAccount = "";
        var salesOrder = "";
        var iteNumber = "";
        var wBSElement = "";
        var order = "";
        var costCenter = "";
        var errorMsg;
        var isCorrect = "Yes";
        var accountAssignment = $("#accountAssignmentCategory").val();
        var componentLen = "";
        var compPlant = "";
        var schQuantityLen = "";
        var delSchQuant = "";
        var prType = $("#prType").val();
        var isSaved = $("#saveSarviceAccountAssignment").val();
        var isCorrect = "";
        if (isCorrect !== "No") {

            var delSchRows = $("#DeliveryScheduleTableId tbody tr");
            schQuantityLen = $("#DeliveryScheduleTableId tbody tr").length;
            $(".collapseDivLineLevel").find(".active").removeClass("active");
            for (var i = 0; i < schQuantityLen; i++) {
                delSchQuant = removeCommaInNumber($(delSchRows[i]).find('td').eq(3).children(".scheduledQuantityClass").val());
                if (delSchQuant === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Quantity in Delivery Schedule Tab!";
                    $(delSchRows[i]).find("td").eq(3).children(".scheduledQuantityClass").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    $("#deliverySchedule").addClass("active");
                    $("#deliverySchedule-tab").addClass("active");
                    $("#deliverySchedule-tab").addClass("show");
                    isCorrect = "No";
                    break
                }
            }
        }
        var lobiboxNotifyAlert = null;
        if (isCorrect !== "No") {
            var taxcode = $("#TaxCode").val();
            if (taxcode === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                $("#TaxCode").css("border-color", "red");
                errorMsg = "Please enter Tax Code in Invoice Tab!";
                //                $("#gLAccount").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                $("#invoice").addClass("active");
                $("#invoice-tab").addClass("active");
                $("#invoice-tab").addClass("show");
                isCorrect = "No";
                return false;
            }
            var rows = $("#costCenteraccountAssignmentTebleId tbody tr");
            var distribution = $("#distribution").val();
            console.log("distribution on save :" + distribution);
            if (prType === "Material") {
                isCorrect = lineLevelValidation(distribution, accountAssignment, "standalone");
                $("#account_assignment").addClass("active");
                $("#account_assignment-tab").addClass("active");
                $("#account_assignment-tab").addClass("show");
                if (isCorrect === false) {
                    return false;
                }
            } else if (prType === "Service") {
                if (taxcode !== "") {
                    $("#invoice").addClass("active");
                    $("#invoice-tab").addClass("active");
                    $("#invoice-tab").addClass("show");
                }
            }
        }

//        var confControl = $("#confControlLimits").val();
//        if (confControl === "") {
//            errorMsg = "Please enter Conf Control in Confirmations Tab!";
//            $("#confControlLimits").css("border-color", "red");
//            Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            $("#confirmations").addClass("active");
//            $("#confirmations-tab").addClass("active");
//            $("#confirmations-tab").addClass("show");
//            isCorrect = "No";
//        } else {
//            $("#confirmations").addClass("active");
//            $("#confirmations-tab").addClass("active");
//            $("#confirmations-tab").addClass("show");
//        }


        var compQuantity = "";
        var compUnit = "";
        var compStLoc = "";
        var compSupArea = "";
        var compReqDate = "";
        if ((accAsgn === "R" || accAsgn === "E" || accAsgn === "F" || accAsgn === "M" || accAsgn === "T") && (itemCat === "L")) {
            $(".collapseDivLineLevel").find(".active").removeClass("active");
            componentLen = $("#componentTableIdLineLevel tbody tr").length;
            var compRow = $("#componentTableIdLineLevel tbody tr");
            for (var i = 0; i < componentLen; i++) {
                compQuantity = removeCommaInNumber($(compRow[i]).find('td').eq(4).children(".comQuantity").val());
                compPlant = $(compRow[i]).find('td').eq(2).children(".comPlant").val();
                compUnit = $(compRow[i]).find('td').eq(3).children(".comUnit").val();
                compStLoc = $(compRow[i]).find('td').eq(5).children(".comProdStorageLoc").val();
                compSupArea = $(compRow[i]).find('td').eq(6).children(".comSupplyArea").val();
                compReqDate = $(compRow[i]).find('td').eq(7).children(".comRequirementDate").val();
                if (compPlant === "") {
                    errorMsg = "Please enter Plant in Component Tab!";
                    $(compRow[i]).find('td').eq(2).children(".comPlant").css("border-color", "red");
                    Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    $("#component_linelevel").addClass("active");
                    $("#component_linelevel-tab").addClass("active");
                    $("#component_linelevel-tab").addClass("show");
                    break;
                }
                if (compUnit === "") {
                    errorMsg = "Please enter Unit in Component Tab!";
                    $(compRow[i]).find('td').eq(3).children(".comUnit").css("border-color", "red");
                    Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    $("#component_linelevel").addClass("active");
                    $("#component_linelevel-tab").addClass("active");
                    $("#component_linelevel-tab").addClass("show");
                    break;
                }

                if (compQuantity === "") {
                    errorMsg = "Please enter Quantity in Component Tab!";
                    $(compRow[i]).find('td').eq(4).children(".comQuantity").css("border-color", "red");
                    Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    $("#component_linelevel").addClass("active");
                    $("#component_linelevel-tab").addClass("active");
                    $("#component_linelevel-tab").addClass("show");
                    break;
                }
                if (compStLoc === "") {
                    errorMsg = "Please enter Prod Storage Loc in Component Tab!";
                    $(compRow[i]).find('td').eq(5).children(".comProdStorageLoc").css("border-color", "red");
                    Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    $("#component_linelevel").addClass("active");
                    $("#component_linelevel-tab").addClass("active");
                    $("#component_linelevel-tab").addClass("show");
                    break;
                }
                if (compSupArea === "") {
                    errorMsg = "Please enter Supply Area in Component Tab!";
                    $(compRow[i]).find('td').eq(6).children(".comSupplyArea").css("border-color", "red");
                    Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    $("#component_linelevel").addClass("active");
                    $("#component_linelevel-tab").addClass("active");
                    $("#component_linelevel-tab").addClass("show");
                    break;
                }
                if (compReqDate === "") {
                    errorMsg = "Please enter Req Date in Component Tab!";
                    $(compRow[i]).find('td').eq(7).children(".comRequirementDate").css("border-color", "red");
                    Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    $("#component_linelevel").addClass("active");
                    $("#component_linelevel-tab").addClass("active");
                    $("#component_linelevel-tab").addClass("show");
                    break;
                }
            }
        }
        if (isCorrect === "No") {
            return false;
        }

        $("#overlay").css("display", "block");
        var shortText = $("#MaterialPOText").val();
        var MaterialPOText = "";
        if (shortText !== "") {
            MaterialPOText = handleSpecialCharacterOnSaveHeader($("#MaterialPOText").val());
        }


        console.log("--Coming Here IN PR Sub Line--");
        var isFOCEnabled = "";
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                isFOCEnabled = $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked");
            }
        });
        var formJSON = "";
        formJSON = '[{"itemId" : "' + document.getElementById("ItemNumberSelect").value + '",'
                + '"poid":"' + document.getElementById("poid").value + '",'
                + '"prItemNumber"  :  "' + prItemNumber + '",'
                + '"prType":"' + document.getElementById("prType").value + '",'
                + '"isFOCEnabled":"' + isFOCEnabled + '"'
                + '},{'//Quantities/Weights-1
                + '"pOQuantity" :  "' + removeCommaInNumber(document.getElementById("pOQuantity").value) + '",'
                + '"pOUnit" :  "' + document.getElementById("pOUnit").value + '",'
                + '"pOQuantitySKU" : "' + removeCommaInNumber(document.getElementById("pOQuantitySKU").value) + '",'
                + '"pOUnitSKU"  : "' + document.getElementById("pOUnitSKU").value + '",'
                + '"orderUnit"  : "' + removeCommaInNumber(document.getElementById("orderUnit").value) + '",'
                + '"unitOrderUnit"  :  "' + document.getElementById("unitOrderUnit").value + '",'
                + '"orderPriceUnit"  :  "' + removeCommaInNumber(document.getElementById("orderPriceUnit").value) + '",'
                + '"unitOrderPriceUnit"  : "' + document.getElementById("unitOrderPriceUnit").value + '",'
                + '"orderUnit2"  : "' + removeCommaInNumber(document.getElementById("orderUnit2").value) + '",'
                + '"unitOrderUnit2"  : "' + document.getElementById("unitOrderUnit2").value + '",'
                + '"sku" : "' + removeCommaInNumber(document.getElementById("sKUUnit").value) + '",'
                + '"sKUUnit"  :  "' + document.getElementById("unitSKUUnit").value + '",'
                + '"linkid"  :  "' + linkid + '",'
                + '"netWeight"  :  "' + document.getElementById("netWeight").value + '",'
                + '"grossWeight"  :  "' + document.getElementById("grossWeight").value + '",'
                + '"volume"  :  "' + document.getElementById("volume").value + '",'
                + '"points"  :  "' + document.getElementById("points").value + '",'
                + '"netWeight2"  :  "' + document.getElementById("netWeight2").value + '",'
                + '"grossWeight2"  :  "' + document.getElementById("grossWeight2").value + '",'
                + '"volume2"  :  "' + document.getElementById("volume2").value + '",'
                + '"points2"  :  "' + document.getElementById("points2").value + '",'
                + '"netWeightUnit"  :  "' + document.getElementById("netWeightUnit").value + '",'
                + '"grossWeightUnit"  :  "' + document.getElementById("grossWeightUnit").value + '",'
                + '"volumeUnit"  :  "' + document.getElementById("volumeUnit").value + '",'
                + '"poinstUnit"  :  "' + document.getElementById("pointsUnit").value + '",'
                + '"netWeightOrderUnit"  :  "' + document.getElementById("netWeightOrderUnit").value + '",'
                + '"grossWeightOrderUnit"  :  "' + document.getElementById("grossWeightOrderUnit").value + '",'
                + '"volumeOrderUnit"  :  "' + document.getElementById("volumeOrderUnit").value + '",'
                + '"pointsOrderUnit"  :  "' + document.getElementById("pointsOrderUnit").value + '",'
                + '"netWeightUnit2"  :  "' + document.getElementById("netWeightUnit2").value + '",'
                + '"grossWeightUnit2"  :  "' + document.getElementById("grossWeightUnit2").value + '",'
                + '"volumeUnit2"  :  "' + document.getElementById("volumeUnit2").value + '",'
                + '"netWeightPerUnit"  :  "' + document.getElementById("netWeightPerUnit").value + '",'
                + '"grossWeightPerUnit"  :  "' + document.getElementById("grossWeightPerUnit").value + '",'
                + '"volumePerUnit"  :  "' + document.getElementById("volumePerUnit").value + '",'
                + '"pointsPerUnit"  :  "' + document.getElementById("pointsPerUnit").value + '"'
                + '},{'//Delivery Schedule-2
                + '},{'//delivery-3
                + '"OverdeliveryTolerance" :  "' + document.getElementById("OverdeliveryTolerance").value + '",'
                + '"UnderdeliveryTolerance" :  "' + document.getElementById("UnderdeliveryTolerance").value + '",'
                + '"ShippingInstruction" : "' + document.getElementById("ShippingInstruction").value + '",'
                + '"StockType"  : "' + document.getElementById("StockType").value + '",'
                + '"ValuationType"  : "' + document.getElementById("ValuationType").value + '",'
                + '"RemShelfLife" : "' + document.getElementById("RemShelfLife").value + '",'
                + '"QAControlLife"  :  "' + document.getElementById("QAControlLife").value + '",'
                + '"GRProcTime"  :  "' + document.getElementById("GRProcTime").value + '",'
                + '"FirstReminderExpediter"  :  "' + document.getElementById("FirstReminderExpediter").value + '",'
                + '"SecondReminderExpediter"  :  "' + document.getElementById("SecondReminderExpediter").value + '",'
                + '"ThirdReminderExpediter"  :  "' + document.getElementById("ThirdReminderExpediter").value + '",'
                + '"NoExpend" : "' + document.getElementById("NoExpend").value + '",'
                + '"PlDeliveryTime"  :  "' + document.getElementById("PlDeliveryTime").value + '",'
                + '"incoTermsPart2Delivery"  :  "' + document.getElementById("incoTermsPart2Delivery").value + '",'
                + '"linkid"  :  "' + linkid + '",'
                + '"incoTermsPart1Delivery"  :  "' + document.getElementById("incoTermsPart1Delivery").value + '"'
                + '},{'// Texts -4
                + '"ItemText" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("ItemText").value) + '",'
                + '"InfoRecordPOText" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("InfoRecordPOText").value) + '",'
                + '"MaterialPOText" : "' + MaterialPOText + '",'
                + '"PONoteToApprover"  : "' + handleSpecialCharacterOnSaveHeader(document.getElementById("PONoteToApprover").value) + '",'
                + '"DeliveryText"  : "' + handleSpecialCharacterOnSaveHeader(document.getElementById("DeliveryText").value) + '",'
                + '"pRNoteToApproval"  : "' + handleSpecialCharacterOnSaveHeader(document.getElementById("pRNoteToApproval").value) + '",'
                + '"linkid"  :  "' + linkid + '"'
                + '},{'// Delivery Address-5
                + '"Title" :  "' + document.getElementById("Title").value + '",'
                + '"Name1" :  "' + document.getElementById("Name1").value + '",'
                + '"Name2" : "' + document.getElementById("Name2").value + '",'
                + '"Street"  : "' + document.getElementById("Street").value + '",'
                + '"HouseNumber"  : "' + document.getElementById("HouseNumber").value + '",'
                + '"PostalCode" : "' + document.getElementById("PostalCode").value + '",'
                + '"City"  : "' + document.getElementById("City").value + '",'
                + '"countryLimits"  : "' + document.getElementById("countryCode").value + '",'
                + '"countryDesc" : "' + document.getElementById("countryDesc").value + '",'
                + '"linkid" : "' + linkid + '"'
                + '},{'// Confirmation-6
                + '"confControlLimits" :  "' + document.getElementById("confControlLimits").value + '",'
                + '"OrderAck" :  "' + document.getElementById("OrderAck").value + '",'
                + '"ConfirmationRequired" : "' + ($("#ConfirmationRequired").prop('checked') === true ? "true" : "false") + '",'
                + '"RejectionInd"  : "' + ($("#RejectionInd").prop('checked') === true ? "true" : "false") + '",'
                + '"linkid"  :  "' + linkid + '"'
                + '},{'// ConditionControl-7
                + '"PrintPrice" :  "' + ($("#PrintPrice").prop('checked') === true ? "true" : "false") + '",'
                + '"EstimatedPrice" :  "' + ($("#EstimatedPrice").prop('checked') === true ? "true" : "false") + '",'
                + '"linkid" :  "' + linkid + '"'
                + '},{'// Customer Data-8
                + '"ProductOriginLine" :  "' + document.getElementById("ProductOriginLine").value + '",'
                + '"SegmentDescriptionLine" :  "' + document.getElementById("SegmentDescriptionLine").value + '",'
                + '"linkid"  :  "' + linkid + '"'
                + '},{'// Invoice-10
                + '"InvoiceReceipt" :  "' + InvoiceReceipt + '",'
                + '"FinalInvoice" :  "' + FinalInvoice + '",'
                + '"GRBasedIV" :  "' + GRBasedIV + '",'
                + '"DPCategory" :  "",'
                + '"TaxCode" :  "' + TaxCode + '",'
                + '"taxCodeDesc" :  " ",'
                + '"linkid"  :  "' + linkid + '",'
                + '"serviceBasedIV"  :  "' + serviceBasedIV + '"'
                + '},';
        // Account Assignment ==========================================================-11
        var tableData = "";
        var itemNumber = "";
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        if ((typeOfPOHeader === "Inter Company" || typeOfPOHeader === "PO for Group Trade" || typeOfPOHeader === "PO for Associate Trade"
                || typeOfPOHeader === "PO for 3rd Party Trade" || typeOfPOHeader === "Ferrous PO - Local")
                && $("#accountAssignmentCategory").val() === "" && itemCat === "") {
            var distribution = $("#distribution").val();
            var quantity = "";
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                    itemNumber = $(this).find("td").eq(1).text();
                    console.log("#quantity :" + quantity);
                    $(this).find("td").eq(0).children(".PODistribution").val(distribution);
                }
                var accAsgnCat = $("#accountAssignmentCategory").val();
            });
            if (distribution === 'Single Account Assignment') {
                distribution = "";
            }
            if (prType === "Material") {
                var earMarkedFunds = "";
                var earMarkedFunds2 = "";
                var grant = "";
                tableData = '{"accAsgnTableData" : [';
                tableData = tableData
                        + '{'
                        + '"accAsgnQuantity":"' + quantity + '",'
                        + '"accAsgnPercentage":"' + 100 + '",'
                        + '"accAsgnGLAccount":"",'
                        + '"accAsgnCOArea":"",'
                        + '"accAsgnCostCetner":"",'
                        + '"accAsgnFund":"' + $("#interCompanyFund").val() + '",'
                        + '"accAsgnFunctionalArea":"' + $("#interCompanyFunctionalArea").val() + '",'
                        + '"accAsgnFundCenter":"' + $("#interCompanyFundCenterInput").val() + '",'
                        + '"accAsgnCommitmentItem":"' + $("#interCompanyCommItemInput").val() + '",'
                        + '"accAsgnUnloadingPoint":"",'
                        + '"accAsgnRecipients":"",'
                        + '"accAsgnOrder":"",'
                        + '"accAsgnAssets":"",'
                        + '"accAsgnWBSElement":"",'
                        + '"accAsgnSalesOrder":"",'
                        + '"accAsgnNetActNumber":"",'
                        + '"accAsgnItemNumber":"",'
                        + '"accAsgnDeliverySchedule":"",'
                        + '"accountAssignment":"",'
                        + '"linkid":"' + linkid + '",'
                        + '"distribution":"' + distribution + '",'
                        + '"coCode":"' + $("#CoCode").val() + '",'
                        + '"itemNumber":"' + itemNumber + '",'
                        + '"accAsgnSerialNo":"' + $("#accountAssngSerialNumber").val() + '",'
                        + '"grant":"' + grant + '",'
                        + '"earMarkedFunds":"' + earMarkedFunds + '",'
                        + '"earMarkedFunds2":"' + earMarkedFunds2 + '"'
                        + '},';
            }
            tableData = tableData.slice(0, -1) + ']},';
        } else {
            if ($("#costCenteraccountAssignmentTebleId tbody tr").length !== 0) {
                tableData = '{"accAsgnTableData" : [';
                var i;
                var distribution = $("#distribution").val();
                var quantity = "";
                $("#material_headerClass tbody tr").each(function() {
                    var dropDownItemNumber = $("#ItemNumberSelect").val();
                    var prTableItemNumber = $(this).find("td").eq(1).html();
                    if (prTableItemNumber === dropDownItemNumber) {
                        quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                        itemNumber = $(this).find("td").eq(1).text();
                        console.log("#quantity :" + quantity);
                        $(this).find("td").eq(0).children(".PODistribution").val(distribution);
                    }
                });
                if (distribution === 'Single Account Assignment') {
                    distribution = "";
                } else if (distribution === 'Distrib. On Quantity Basis') {
                    distribution = "1";
                } else if (distribution === 'Distrib. By Percentage') {
                    distribution = "2";
                }
                var accAsgnCat = $("#accountAssignmentCategory").val();
//                if (prType === "Material") {
                if (distribution === "") {
                    var percentage = 100;
                    tableData = tableData
                            + '{'
                            + '"accAsgnQuantity":"' + quantity + '",'
                            + '"accAsgnPercentage":"' + percentage + '",'
                            + '"accAsgnGLAccount":"' + $("#gLAccount").val() + '",'
                            + '"accAsgnCOArea":"' + $("#coArea").val() + '",'
                            + '"accAsgnCostCetner":"' + $("#costCenterAccAsgn").val() + '",'
                            + '"accAsgnFund":"' + $("#accAsgnfund").val() + '",'
                            + '"accAsgnFunctionalArea":"' + $("#accAsgnfunctionalArea").val() + '",'
                            + '"accAsgnFundCenter":"' + $("#accAsgnFundCenterInput").val() + '",'
                            + '"accAsgnCommitmentItem":"' + $("#accAsgnCommItemInput").val() + '",'
                            + '"accAsgnUnloadingPoint":"' + $("#unloadingPoint").val() + '",'
                            + '"accAsgnRecipients":"' + $("#recipient").val() + '",'
                            + '"accAsgnOrder":"' + $("#accAsgnOrder").val() + '",'
                            + '"accAsgnAssets":"' + $("#accAsgnAsset").val() + '",'
                            + '"accAsgnWBSElement":"' + $("#accAsgnWBSElementInput").val() + '",'
                            + '"accAsgnSalesOrder":"' + $("#accAsgnSalesOrder").val() + '",'
                            + '"accAsgnNetActNumber":"' + $("#accAsgnNActNumInput").val() + '",'
                            + '"accAsgnItemNumber":"' + $("#assAsgnItemNumber").val() + '",'
                            + '"accAsgnDeliverySchedule":"' + $("#assAsgnDelivSch").val() + '",'
                            + '"accountAssignment":"' + accAsgnCat + '",'
                            + '"linkid":"' + linkid + '",'
                            + '"distribution":"' + distribution + '",'
                            + '"coCode":"' + $("#CoCode").val() + '",'
                            + '"itemNumber":"' + itemNumber + '",'
                            + '"accAsgnSerialNo":"' + $("#accountAssngSerialNumber").val() + '"'
                            + '},';
                } else if (distribution === "1" || (distribution === "2")) {
                    var length = $("#costCenteraccountAssignmentTebleId tbody tr").length;
                    if (length === 1) {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "please change distribution to Single Account Assignment!";
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        $(".collapseDivLineLevel").find(".active").removeClass("active");
                        $("#overlay").css("display", "none");
                        $("#distribution").focus();
                        $("#distribution").css("border-color", "red");
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                        tableData = tableData
                                + '{'
                                + '"accAsgnQuantity":"' + removeCommaInNumber($(this).find("td").eq(1).children(".accAsgnQuantity").val()) + '",'
                                + '"accAsgnPercentage":"' + $(this).find("td").eq(2).children(".accAsgnPercentage").val() + '",'
                                + '"accAsgnGLAccount":"' + $(this).find("td").eq(3).children(".accAsgnGLAccount").val() + '",'
                                + '"accAsgnCOArea":"' + $(this).find("td").eq(4).children(".accAsgnCOArea").val() + '",'
                                + '"accAsgnCostCetner":"' + $(this).find("td").eq(5).children(".accAsgnCostCetner").val() + '",'
                                + '"accAsgnFund":"' + $(this).find("td").eq(6).children(".accAsgnFund").val() + '",'
                                + '"accAsgnFunctionalArea":"' + $(this).find("td").eq(7).children(".accAsgnFunctionalArea").val() + '",'
                                + '"accAsgnFundCenter":"' + $(this).find("td").eq(8).children(".accAsgnFundCenter").val() + '",'
                                + '"accAsgnCommitmentItem":"' + $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val() + '",'
                                + '"accAsgnUnloadingPoint":"' + $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").val() + '",'
                                + '"accAsgnRecipients":"' + $(this).find("td").eq(11).children(".accAsgnRecipients").val() + '",'
                                + '"accAsgnOrder":"' + $(this).find("td").eq(12).children(".accAsgnOrder").val() + '",'
                                + '"accAsgnAssets":"' + $(this).find("td").eq(13).children(".accAsgnAssets").val() + '",'
                                + '"accAsgnWBSElement":"' + $(this).find("td").eq(14).children(".accAsgnWBSElement").val() + '",'
                                + '"accAsgnSalesOrder":"' + $(this).find("td").eq(15).children(".accAsgnSalesOrder").val() + '",'
                                + '"accAsgnNetActNumber":"' + $(this).find("td").eq(16).children(".accAsgnNetActNumber").val() + '",'
                                + '"accAsgnItemNumber":"' + $(this).find("td").eq(17).children(".accAsgnItemNumber").val() + '",'
                                + '"accAsgnDeliverySchedule":"' + $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").val() + '",'
                                + '"accountAssignment":"' + accAsgnCat + '",'
                                + '"linkid":"' + linkid + '",'
                                + '"distribution":"' + distribution + '",'
                                + '"coCode":"' + $("#CoCode").val() + '",'
                                + '"itemNumber":"' + itemNumber + '",'
                                + '"accAsgnSerialNo":"' + $(this).find("td").eq(0).children(".accAsgnSerialNo").val() + '"'
                                + '},';
                    });
                }
//                } else if (prType === "Service") {
//                    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
//                        tableData = tableData
//                                + '{'
//                                + '"accAsgnQuantity":"' + $(this).find("td").eq(1).children(".accAsgnQuantity").val() + '",'
//                                + '"accAsgnPercentage":"' + $(this).find("td").eq(2).children(".accAsgnPercentage").val() + '",'
//                                + '"accAsgnGLAccount":"' + $(this).find("td").eq(3).children(".accAsgnGLAccount").val() + '",'
//                                + '"accAsgnCOArea":"' + $(this).find("td").eq(4).children(".accAsgnCOArea").val() + '",'
//                                + '"accAsgnCostCetner":"' + $(this).find("td").eq(5).children(".accAsgnCostCetner").val() + '",'
//                                + '"accAsgnFund":"' + $(this).find("td").eq(6).children(".accAsgnFund").val() + '",'
//                                + '"accAsgnFunctionalArea":"' + $(this).find("td").eq(7).children(".accAsgnFunctionalArea").val() + '",'
//                                + '"accAsgnFundCenter":"' + $(this).find("td").eq(8).children(".accAsgnFundCenter").val() + '",'
//                                + '"accAsgnCommitmentItem":"' + $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val() + '",'
//                                + '"accAsgnUnloadingPoint":"' + $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").val() + '",'
//                                + '"accAsgnRecipients":"' + $(this).find("td").eq(11).children(".accAsgnRecipients").val() + '",'
//                                + '"accAsgnOrder":"' + $(this).find("td").eq(12).children(".accAsgnOrder").val() + '",'
//                                + '"accAsgnAssets":"' + $(this).find("td").eq(13).children(".accAsgnAssets").val() + '",'
//                                + '"accAsgnWBSElement":"' + $(this).find("td").eq(14).children(".accAsgnWBSElement").val() + '",'
//                                + '"accAsgnSalesOrder":"' + $(this).find("td").eq(15).children(".accAsgnSalesOrder").val() + '",'
//                                + '"accAsgnNetActNumber":"' + $(this).find("td").eq(16).children(".accAsgnNetActNumber").val() + '",'
//                                + '"accAsgnItemNumber":"' + $(this).find("td").eq(17).children(".accAsgnItemNumber").val() + '",'
//                                + '"accAsgnDeliverySchedule":"' + $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").val() + '",'
//                                + '"accountAssignment":"' + accAsgnCat + '",'
//                                + '"linkid":"' + linkid + '",'
//                                + '"distribution":"' + distribution + '",'
//                                + '"coCode":"' + $("#CoCode").val() + '",'
//                                + '"itemNumber":"' + itemNumber + '",'
//                                + '"accAsgnSerialNo":"' + $(this).find("td").eq(0).children(".accAsgnSerialNo").val() + '"'
//                                + '},';
//                    });
//                }
                tableData = tableData.slice(0, -1) + ']},';
            }
            else
            {
                tableData = '{"accAsgnTableData" : []},';
            }
        }

//Service Tab ========================================================-12
        var serviceTableData = "";
        if ($("#serviceTableId tbody tr").length !== 0) {
            serviceTableData = '{"serviceTableData" : [';
            var i;
            $("#serviceTableId tbody tr").each(function() {
                serviceTableData = serviceTableData
                        + '{'
                        + '"lineItemNumberServices":"' + $(this).find("td").eq(1).children(".lineItemNumberServices ").val() + '",'
                        + '"serviceNumber":"' + $(this).find("td").eq(2).children(".ServicesNumber_Services").val() + '",'
                        + '"shortText":"' + $(this).find("td").eq(3).children(".shortText_Services").val() + '",'
                        + '"quantity":"' + removeCommaInNumber($(this).find("td").eq(4).children(".quantity_Services").val()) + '",'
                        + '"unit":"' + $(this).find("td").eq(5).children(".servicesUnit_Services").val() + '",'
                        + '"grossPrice":"' + removeCommaInNumber($(this).find("td").eq(6).children(".grossPrice_Services").val()) + '",'
                        + '"currency":"' + $(this).find("td").eq(7).children(".currency_Services").val() + '",'
                        + '"netPrice":"' + removeCommaInNumber($(this).find("td").eq(8).children(".netPrice_Services").val()) + '",'
                        + '"edition":"' + $(this).find("td").eq(9).children(".edition_Services").val() + '",'
                        + '"lineItemLongText":"' + $(this).find("td").eq(10).children(".lineItemLongText_Services").val() + '",'
                        + '"overfTollerance":"' + $(this).find("td").eq(11).children(".overfTolerance_Services").val() + '",'
                        + '"linkid":"' + linkid + '",'
                        + '"ServiceAccAssDist":"' + $(this).find("td").eq(0).children(".ServiceAccAssDist ").val() + '",'
                        + '"isAccountAssignmentSaved":"' + $(this).find("td").eq(0).children(".saveSarviceAccountAssignment").val() + '",'
                        + '"isProfitabilitySegmentSaved":"' + $(this).find("td").eq(0).children(".isProfitabilitySegmentDataSaved").val() + '",'
                        + '"serviceNetValue":"' + removeCommaInNumber($(this).find("td").eq(12).children(".serviceNetValue").val()) + '",'
                        + '"serviceActualQty":"' + $(this).find("td").eq(13).children(".serviceActualQty").val() + '",'
                        + '"serviceText":"' + $(this).find("td").eq(14).children(".serviceText").val() + '",'
                        + '"serviceId":"' + $(this).find("td").eq(0).children(".serviceId").val() + '"'
                        + '},';
            });
            serviceTableData = serviceTableData.slice(0, -1) + "]},";
            console.log("serviceTableData :" + serviceTableData);
        }
        else
        {
            serviceTableData = '{"serviceTableData" : []},';
        }

// Limits tab ==================================================================================-13
        var noLimit;
        if ($("#NoLimit").prop("checked")) {
            noLimit = "true";
        } else {
            noLimit = "false";
        }
        var limits = '{'
                + '"OverallLimit" :  "' + ($("#OverallLimit").val() !== "" ? removeCommaInNumber($("#OverallLimit").val()) : "") + '",'
                + '"ExpectedValue" :  "' + ($("#ExpectedValue").val() !== "" ? removeCommaInNumber($("#ExpectedValue").val()) : "") + '",'
                + '"ActualValue" :  "' + ($("#ActualValue").val() !== "" ? removeCommaInNumber($("#ActualValue").val()) : "") + '",'
                + '"NoLimit" :  "' + noLimit + '",'
                + '"linkid"  :  "' + linkid + '"'
                + '},';
        //Material Tab ================================================================
        var infoUpdate;
        if ($("#infoUpdate").prop("checked")) {
            infoUpdate = "true";
        } else {
            infoUpdate = "false";
        }
        var materialTabData = '{'
                + '"revisionLevel" :  "' + $("#revisionLevel").val() + '",'
                + '"vendMatNo" :  "' + $("#vendMatNo").val() + '",'
                + '"eanUpc" :  "' + $("#eanUpc").val() + '",'
                + '"vendorSubRange" :  "' + $("#vendorSubRange").val() + '",'
                + '"vendBatch" :  "' + $("#vendBatch").val() + '",'
                + '"batch" :  "' + $("#batch").val() + '",'
                + '"infoUpdate" :  "' + infoUpdate + '",'
                + '"linkid"  :  "' + linkid + '",'
                + '"mfrPartNo" :  "' + $("#mfrPartNo").val() + '",'
                + '"manufacturer" :  "' + $("#manufacturer").val() + '"'
                + '},';
//        materialTabData = materialTabData.slice(0, -1) + "]}";
        //Condition tab ============================================================-14

        var conditionTableData = "";
        if ($("#conditionTableIdLineLevel tbody tr").length !== 0) {
            conditionTableData = '{"conditionTableData" : [';
            var i;
            var conType = "";
            var name = "";
            var amount = "";
            var perQuant = "";
            var conVal1 = "";
            var vendorHeader = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
            var vendor = "";
            var conditionDetails = "";
            console.log("vendor on condition save:" + vendor);
            $("#conditionTableIdLineLevel tbody tr").each(function() {
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

                if ($(this).find("td").eq(5).children("input").hasClass("PerQuantityLineLavel") === true) {
                    conVal1 = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
                } else if ($(this).find("td").eq(5).children("input").hasClass("newPerQuantityLineLavel") === true) {
                    conVal1 = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
                }

                var vendorCondition = $(this).find("td").eq(0).children(".conditionVendor").val();
                console.log("vendorCondition :" + " i :" + vendorCondition + "vendorHeader :" + vendorHeader);
                if (vendorCondition !== "") {
                    vendor = vendorCondition;
                }

                var condStatus = $(this).find("td").eq(12).children(".statusLineLevel").prop("checked");
                if (condStatus === "") {
                    condStatus = "NA";
                }
                var numerator = $(this).find("td").eq(13).children(".numeratorLineLevel").val();
                if (numerator === "") {
                    numerator = "NA";
                }
                var baseUoM = $(this).find("td").eq(14).children(".baseUoMLineLevel").val();
                if (baseUoM === "") {
                    baseUoM = "NA";
                }
                var denoForConv = $(this).find("td").eq(15).children(".denoForConvLineLevel").val();
                if (denoForConv === "") {
                    denoForConv = "NA";
                }
                var uOMExtra = $(this).find("td").eq(16).children(".uOMExtraLineLevel").val();
                if (uOMExtra === "") {
                    uOMExtra = "NA";
                }

                console.log("vendor in condition :" + vendor);
                amountArr.push(amount);
                perArr.push(perQuant);
                canValArr.push(conVal1);
                condType.push(conType);
                condName.push(name);
                conditionTableData = conditionTableData
                        + '{'
                        + '"conditionType":"' + conType + '",'
                        + '"Name":"' + name + '",'
                        + '"Amount":"' + amount + '",'
                        + '"PerQuant":"' + perQuant + '",'
                        + '"ConditionPricingUnit":"' + $(this).find("td").eq(6).children(".ConditionPricingUnitLineLevel").val() + '",'
                        + '"Currency":"' + $(this).find("td").eq(4).children(".CurrencyLineLevel").val() + '",'
                        + '"uom":"' + $(this).find("td").eq(7).children(".UoMLineLevel").val() + '",'
                        + '"ConditionValue":"' + removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val()) + '",'
                        + '"Currency1":"' + $(this).find("td").eq(9).children(".Currency2LineLevel").val() + '",'
                        + '"ConditionValue1":"' + $(this).find("td").eq(10).children(".ConditionValue2LineLevel").val() + '",'
                        + '"ConditionCurrency":"' + $(this).find("td").eq(11).children(".ConditionCurrencyLineLevel").val() + '",'
                        + '"ConditionDetails":"' + conditionDetails + '",'
                        + '"VondorCode":"' + vendor + '",'
                        + '"Application":"' + $("#applicationConditions").val() + '",'
                        + '"ConBaseValue":"' + $("#conditionBaseRateConditions").val() + '",'
                        + '"ConBaseRate":"' + $("#conditionValueConditions").val() + '",'
                        + '"Accurals":"' + $("#accrualsAccountDetermination").val() + '",'
                        + '"ItemNumber":"' + $("#itemConditions").val() + '",'
                        + '"AccountKey":"' + $("#AccountKey").val() + '",'
                        + '"stNumber":"' + $(this).find("td").eq(17).children(".conditionSTUNR").val() + '",'
                        + '"condCount":"' + $(this).find("td").eq(17).children(".conditionZAEHK").val() + '",'
                        + '"KAPPL":"' + $(this).find("td").eq(17).children(".conditionKAPPL").val() + '",'
                        + '"KVSL1":"' + $(this).find("td").eq(17).children(".conditionKVSL1").val() + '",'
                        + '"KVSL2":"' + $(this).find("td").eq(17).children(".conditionKVSL2").val() + '",'
                        + '"condChangeId":"' + $(this).find("td").eq(17).children(".conditionChangeId ").val() + '",'
                        + '"linkid":"' + linkid + '",'
                        + '"condStatus":"' + condStatus + '",'
                        + '"numerator":"' + numerator + '",'
                        + '"baseUoM":"' + baseUoM + '",'
                        + '"denoForConv":"' + denoForConv + '",'
                        + '"uOMExtra":"' + uOMExtra + '",'
                        + '"lineAddedFrom":"' + $(this).find("td").eq(0).children(".lineAddedFromLineLevel").val() + '"'
                        + '},';
            });
            console.log("conditionTableData: " + conditionTableData);
            conditionTableData = conditionTableData.slice(0, -1) + "]},";
        }
        else
        {
            conditionTableData = '{"conditionTableData" : []},';
        }

// Delivery Schedule ==========================================================-15
        var deliverySchTableData = "";
        var total = "";
        var temp = 0;
        if ($("#DeliveryScheduleTableId tbody tr").length !== 0) {
            deliverySchTableData = '{"deliverySchTableData" : [';
            $("#DeliveryScheduleTableId tbody tr").each(function() {

                var purReqNumber = $(this).find("td").eq(5).children(".prNumberDeliveryScheduledClass").val();
                var reqItemNumber = $(this).find("td").eq(6).children(".reqItemNumberClass").val();
                if (purReqNumber === null) {
                    purReqNumber = "";
                }
                if (reqItemNumber === null) {
                    reqItemNumber = "";
                }
                deliverySchTableData = deliverySchTableData
                        + '{'
                        + '"deliveryDateCategory":"' + $(this).find("td").eq(0).children(".deliveryDateCategory ").val() + '",'
                        + '"deliveryDate":"' + $(this).find("td").eq(1).children(".deliveryDateClass").val() + '",'
                        + '"scheduledQuantity":"' + removeCommaInNumber($(this).find("td").eq(3).children(".scheduledQuantityClass").val()) + '",'
                        + '"time":"' + $(this).find("td").eq(4).children(".timeDeliveryScheduledClass").val() + '",'
                        + '"purReqNumber":"' + purReqNumber + '",'
                        + '"reqItemNumber":"' + reqItemNumber + '",'
                        + '"linkid":"' + linkid + '",'
                        + '"statistialDeliveryDate":"' + $(this).find("td").eq(2).children(".statistialDeliveryDate").val() + '",'
                        + '"gRQuantity":"' + $(this).find("td").eq(7).children(".gRQuantityClass").val() + '",'
                        + '"openQuantity":"' + $(this).find("td").eq(8).children(".openQuantityClass").val() + '",'
                        + '"schLine":"' + $(this).find("td").eq(9).children(".schLineClass").val() + '"'
                        + '},';
            });
            deliverySchTableData = deliverySchTableData.slice(0, -1) + "]},";
        }
        else
        {
            deliverySchTableData = '{"deliverySchTableData" : []},';
        }

// Component Tab======================================================================

        var componentTableData = "";
        if ($("#componentTableIdLineLevel tbody tr").length !== 0) {
            componentTableData = '{"componentTableData" : [';
            $("#componentTableIdLineLevel tbody tr").each(function() {

                var description = handleSpecialCharacterOnSaveHeader($(this).find("td").eq(1).children(".comDescription").val());
                componentTableData = componentTableData
                        + '{'
                        + '"material":"' + $(this).find("td").eq(0).children(".comMaterial ").val() + '",'
                        + '"description":"' + description + '",'
                        + '"plant":"' + $(this).find("td").eq(2).children(".comPlant").val() + '",'
                        + '"unit":"' + $(this).find("td").eq(3).children(".comUnit").val() + '",'
                        + '"quantity":"' + removeCommaInNumber($(this).find("td").eq(4).children(".comQuantity").val()) + '",'
                        + '"prodStorageLoc":"' + $(this).find("td").eq(5).children(".comProdStorageLoc").val() + '",'
                        + '"supplyArea":"' + $(this).find("td").eq(6).children(".comSupplyArea").val() + '",'
                        + '"requirementDate":"' + $(this).find("td").eq(7).children(".comRequirementDate").val() + '",'
                        + '"linkid":"' + linkid + '",'
                        + '"qtyIsFixed":"' + $(this).find("td").eq(8).children(".qtyIsFixed").val() + '",'
                        + '"latReqDate":"' + $(this).find("td").eq(9).children(".latReqDate").val() + '",'
                        + '"distKey":"' + $(this).find("td").eq(10).children(".distKey").val() + '",'
                        + '"comBatch":"' + $(this).find("td").eq(12).children(".comBatch").val() + '"'
                        + '},';
            });
            componentTableData = componentTableData.slice(0, -1) + "]}";
        }
        else
        {
            componentTableData = '{"componentTableData" : []}';
        }

        formJSON = formJSON + tableData + serviceTableData + limits + materialTabData + conditionTableData +
                deliverySchTableData + componentTableData;
        formJSON = formJSON + "]";
//        formJSON = '[{"itemId" : "10","poid":"135","prItemNumber"  :  "10","prType":"Material","isFOCEnabled":"false"},{"pOQuantity" :  "1","pOUnit" :  "PC","pOQuantitySKU" : "1.000","pOUnitSKU"  : "PC","orderUnit"  : "1.00","unitOrderUnit"  :  "PC","orderPriceUnit"  :  "1.00","unitOrderPriceUnit"  : "PC","orderUnit2"  : "1.00","unitOrderUnit2"  : "PC","sku" : "1.00","sKUUnit"  :  "PC","linkid"  :  "SA-135-10","netWeight"  :  "","grossWeight"  :  "","volume"  :  "","points"  :  "","netWeight2"  :  "","grossWeight2"  :  "","volume2"  :  "","points2"  :  "","netWeightUnit"  :  "","grossWeightUnit"  :  "","volumeUnit"  :  "","poinstUnit"  :  "","netWeightOrderUnit"  :  "","grossWeightOrderUnit"  :  "","volumeOrderUnit"  :  "","pointsOrderUnit"  :  "","netWeightUnit2"  :  "","grossWeightUnit2"  :  "","volumeUnit2"  :  "","netWeightPerUnit"  :  "1.00","grossWeightPerUnit"  :  "1.00","volumePerUnit"  :  "1.00","pointsPerUnit"  :  "1.00"},{},{"OverdeliveryTolerance" :  "0.0","UnderdeliveryTolerance" :  "0.0","ShippingInstruction" : "","StockType"  : "","ValuationType"  : "","RemShelfLife" : "","QAControlLife"  :  "","GRProcTime"  :  "","FirstReminderExpediter"  :  "","SecondReminderExpediter"  :  "","ThirdReminderExpediter"  :  "","NoExpend" : "","PlDeliveryTime"  :  "20","incoTermsPart2Delivery"  :  "","linkid"  :  "SA-135-10","incoTermsPart1Delivery"  :  ""},{"ItemText" :  "","InfoRecordPOText" :  "","MaterialPOText" : "SERAM CRANE RUBBER STOPPER","PONoteToApprover"  : "","DeliveryText"  : "","pRNoteToApproval"  : "","linkid"  :  "SA-135-10"},{"Title" :  "Company","Name1" :  "Natsteel Holdings","Name2" : "Natsteel Holdings","Street"  : "22","HouseNumber"  : "22","PostalCode" : "628048","City"  : "628048","countryLimits"  : "SG","countryDesc" : "SG","linkid" : "SA-135-10"},{"confControlLimits" :  "","OrderAck" :  "","ConfirmationRequired" : "false","RejectionInd"  : "false","linkid"  :  "SA-135-10"},{"PrintPrice" :  "false","EstimatedPrice" :  "false","linkid" :  "SA-135-10"},{"ProductOriginLine" :  "","SegmentDescriptionLine" :  "","linkid"  :  "SA-135-10"},{"InvoiceReceipt" :  "true","FinalInvoice" :  "false","GRBasedIV" :  "false","DPCategory" :  "","TaxCode" :  "BO","taxCodeDesc" :  " ","linkid"  :  "SA-135-10","serviceBasedIV"  :  "true"},{"accAsgnTableData" : [{"accAsgnQuantity":"1.000","accAsgnPercentage":"100","accAsgnGLAccount":"8514937","accAsgnCOArea":"0640","accAsgnCostCetner":"0640-53030","accAsgnFund":"NSH001","accAsgnFunctionalArea":"","accAsgnFundCenter":"0640-53030","accAsgnCommitmentItem":"8514937","accAsgnUnloadingPoint":"","accAsgnRecipients":"","accAsgnOrder":"700000301","accAsgnAssets":"","accAsgnWBSElement":"","accAsgnSalesOrder":"","accAsgnNetActNumber":"","accAsgnItemNumber":"","accAsgnDeliverySchedule":"","accountAssignment":"F","linkid":"SA-135-10","distribution":"","coCode":"0640","itemNumber":"10","accAsgnSerialNo":""}]},{"serviceTableData" : []},{"OverallLimit" :  "","ExpectedValue" :  "","ActualValue" :  "0.00","NoLimit" :  "false","linkid"  :  "SA-135-10"},{"revisionLevel" :  "","vendMatNo" :  "","eanUpc" :  "","vendorSubRange" :  "","vendBatch" :  "","batch" :  "","infoUpdate" :  "true","linkid"  :  "SA-135-10","mfrPartNo" :  "","manufacturer" :  ""},{"conditionTableData" : [{"conditionType":"PBXX","Name":"Gross Price","Amount":"10.00","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"10.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"1","condCount":"2","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"","Name":"Price Incl of disc/Surcharge","Amount":"10.00","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"10.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"65","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"FRA1","Name":"Freight %","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"%","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"70","condCount":"0","KAPPL":"M","KVSL1":"FRE","KVSL2":"FR1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"FRB1","Name":"Freight (Value)","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"70","condCount":"1","KAPPL":"M","KVSL1":"FRE","KVSL2":"FR1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"FRC1","Name":"Freight/Quantity","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"70","condCount":"2","KAPPL":"M","KVSL1":"FRE","KVSL2":"FR1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZFR1","Name":"TM - Freight (Value)","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"70","condCount":"3","KAPPL":"M","KVSL1":"FRE","KVSL2":"ZFR","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZPAC","Name":"Packing charges.","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"71","condCount":"0","KAPPL":"M","KVSL1":"OTH","KVSL2":"IP1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZCOV","Name":"Commission (Value)","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"0","KAPPL":"M","KVSL1":"OTH","KVSL2":"PC4","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZCOP","Name":"Commission(Percenta)","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"%","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"1","KAPPL":"M","KVSL1":"OTH","KVSL2":"PC4","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZCOQ","Name":"Comission/Quantity","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"2","KAPPL":"M","KVSL1":"OTH","KVSL2":"PC4","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZMIS","Name":"Misc Charges","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"3","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZMSQ","Name":"Misc Charges Qty","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"4","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZITQ","Name":"Inland Transit Qty","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"5","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZCRQ","Name":"Container Repair Qty","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"6","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZIMP","Name":"Weight Variance","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"7","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZBIN","Name":"Bin Rental","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"8","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZSEC","Name":"Security","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"75","condCount":"9","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZINV","Name":"Insurance (Value)","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"76","condCount":"0","KAPPL":"M","KVSL1":"OTH","KVSL2":"IN1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZINP","Name":"Insurance(Percentag)","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"%","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"76","condCount":"1","KAPPL":"M","KVSL1":"OTH","KVSL2":"IN1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZINQ","Name":"Insurance( quntity)","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"76","condCount":"2","KAPPL":"M","KVSL1":"OTH","KVSL2":"IN1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM02","Name":"Surveyor@ load port","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"1","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM03","Name":"Surveyor@disc Port","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"2","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM04","Name":"Stevedoring","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"3","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM05","Name":"Cranage","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"4","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM06","Name":"Timekeeper","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"5","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM07","Name":"Jurong Port charges","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"6","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM08","Name":"Haulier","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"7","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM09","Name":"Incentive","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"8","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZLOD","Name":"Loading Equipment","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"9","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZUNL","Name":"Un Loading Equipment","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"10","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"ZM10","Name":"Marine Handling Chrg","Amount":"","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"78","condCount":"11","KAPPL":"M","KVSL1":"OTH","KVSL2":"OC1","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"","Name":"Total Freight","Amount":"0.00","PerQuant":"0.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"0.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"80","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"","Name":"Total Freight & commisioning","Amount":"0.00","PerQuant":"0.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"0.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"85","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"","Name":"Net Price","Amount":"10.00","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"10.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"90","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"NAVS","Name":"Non-Deductible Tax","Amount":"10.00","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"0.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"100","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"","Name":"@3Z@Border crossing value","Amount":"20.00","PerQuant":"2.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"10.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"200","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"},{"conditionType":"JEXS","Name":"Taxes on the PO","Amount":"10.00","PerQuant":"1.00","ConditionPricingUnit":"PC","Currency":"SGD","uom":"PC","ConditionValue":"0.00","Currency1":"SGD","ConditionValue1":"0.00","ConditionCurrency":"","ConditionDetails":"","VondorCode":"0001100937","Application":"","ConBaseValue":"","ConBaseRate":"","Accurals":"","ItemNumber":"","AccountKey":"","stNumber":"250","condCount":"0","KAPPL":"M","KVSL1":"","KVSL2":"","condChangeId":"U","linkid":"SA-135-10","condStatus":"false","numerator":"NA","baseUoM":"NA","denoForConv":"NA","uOMExtra":"NA","lineAddedFrom":"linelevel"}]},{"deliverySchTableData" : [{"deliveryDateCategory":"D","deliveryDate":"23.12.2020","scheduledQuantity":"1","time":"","purReqNumber":"","reqItemNumber":"","linkid":"SA-135-10","statistialDeliveryDate":"03.12.2020","gRQuantity":"","openQuantity":"","schLine":"1"}]},{"componentTableData" : [{"material":"0048A0001","description":"SERAM CRANE RUBBER STOPPER","plant":"6400","unit":"PC","quantity":"1","prodStorageLoc":"SC34","supplyArea":"asdas","requirementDate":"23.12.2020","linkid":"SA-135-10","qtyIsFixed":"1","latReqDate":"23.12.2020","distKey":"","comBatch":""}]}]';
        console.log("Table Data ::::  " + formJSON);
        console.log(JSON.parse(formJSON));
        console.log("savePrSubLine :::: " + formJSON);
        var _csrf = $("input[name=_csrf]").val();
        var total = "";
        var temp = 0;
        $("#DeliveryScheduleTableId tbody tr").each(function() {
            var schQuantity = removeCommaInNumber($(this).find("td").eq(3).children(".scheduledQuantityClass").val());
            total = schQuantity;
            temp = Number(schQuantity) + Number(temp);
        });
        console.log("Temp is ::" + temp);
        var Quantity = removeCommaInNumber($("#pOQuantity").val());
        console.log("Quantity in statndlone is ::" + Quantity);
        if (Number(Quantity) !== Number(temp)) {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
//                msg: "Kindly check quantity in delivery schedule tab.<br>Sum of scheduled quantity should be equal to PR Quantity!"
                msg: "Kindly check quantity in delivery schedule tab!"
            });
            $("#overlay").css("display", "none");
            return false;
        } else {

            setTimeout(function() {

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

                var linkIdArray = [];
                var LinkID;
                $("#material_headerClass tbody tr").each(function() {
                    LinkID = $(this).find("td").eq(0).children(".linkid").val();
                    linkIdArray.push(LinkID);
                });
                console.log("LinkID String :" + linkIdArray.toString());
                $.ajax({
                    type: "POST",
                    url: "savestandalonelineitemdata.do",
                    async: false,
                    data: {
                        formdata: formJSON,
                        reqFrom: "savePRLineSub",
                        poCurrency: $("#CurrencyDeliveryInvoice").val(),
                        localCurrency: localCurrency,
                        _csrf: _csrf,
                        "linkIdArray": linkIdArray.toString()
                    },
                    success: function(responseJson) {
                        console.log("response :: " + responseJson);
                        var obj = $.parseJSON(responseJson);
                        var response = obj.idext;
                        var jsonCondArr = obj.jsonCondArr;
                        if (response === '') {
                            Lobibox.alert("success", {
                                msg: "Data saved successfully "
                            });
                            $("#material_headerClass tbody tr").each(function() {
                                var dropDownItemNumber = $("#ItemNumberSelect").val();
                                var prTableItemNumber = $(this).find("td").eq(1).html();
                                if (prTableItemNumber === dropDownItemNumber) {
                                    console.log("prTableItemNumber :" + prTableItemNumber + " dropDownItemNumber :" + dropDownItemNumber);
                                    $(this).find("td").eq(0).children(".isLineLevelDataSavedSaved").val("Yes");
//                                    $(this).find("td").eq(0).children(".isPrSaved").val("Yes");
//                                 isFOCEnabled = $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked");
                                }
                            });
//                            $("#createStandalonePoBtn").prop("disabled", false);
                            $("#overlay").css("display", "none");
                            $("#isConditionPopulateInHeader").val("Yes");
                            console.log("isFOCEnabled after save:" + isFOCEnabled);
//                            if(isFOCEnabled === false){
                            if (jsonCondArr.length !== 0) {
                                getNGBPCmplxPOCreationLineItemConditionsByLinkId(jsonCondArr);
                                saveSAHeaderConditionsInDB();
                            } else {
                                $("#conditionTableId tbody tr").remove();
                            }
//                            }

                            // By Nikhil on 13052020
                            if ($("#isPrSavedAfterEditDetails").val() === "Yes")
                            {
                                $("#isPrSavedAfterEditDetails").val("No");
                            }
                            else if ($("#isPrSavedAfterEditDetails").val() === "No")
                            {
                                $("#isAnyFieldValueChanged").val("No");
                            }

                        } else {
                            Lobibox.alert("error", {
                                msg: "Data not saved!"
                            });
                            $("#overlay").css("display", "none");
                        }
                    }
                });
            }, 20);
        }
    });
    $("#serviceAccAsgnmentSubmitBtn").click(function() {
        var serviceAccAsgnTblRow = "";
        var serviceAccAsgnTblRowString = "";
        var pRItemNumber = "";
        var poid = $("#poid").val();
//        var netPrice = serviceTabTableCurrentTd.parent().parent().find("td").eq(8).children(".netPrice_Services").val();
        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
        var accAsgnLen = $("#serviceTabAccAsgnTebleId tbody tr").length;
        var serviceGLAccount = "";
        var serviceSalesOrder = "";
        var serviceItemNumber = "";
        var errorMsg = "";
        var wBSElement = "";
//        var isCorrect = "Yes";
        var costCenter = "";
        var rows = $('#serviceTabAccAsgnTebleId tbody tr');
        var accountAssignment = $("#accountAssignmentCategory").val();
        var isCorrect = ServiceAccountAssignmentValidationforMultipleDistribution(accountAssignment);
        if (isCorrect === false) {
            return false;
        }

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
            var netPrice = $(this).find("td").eq(16).children(".netValue").val();
//            var linkNumber = $(this).find("td").eq(16).children(".linkNumber").val();
//            var activity = $("#accountAssignActivity").val();
            //            var shortText = $("#accountAssignShortText").val();
            var distributionId = $('input[type=radio][name=distributionIndicator]:checked').attr('id');
            var distribution;
            var linkid;
            var accAsgn = "";
            if (distributionId === "noMultiAcctAssignment") {
                distribution = "";
                $("#distribution").val("Single Account Assignment");
                serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("0");
            } else if (distributionId === "distOnQuantBases") {
                distribution = "1";
                $("#distribution").val("Distrib. On Quantity Basis");
                serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("1");
            } else if (distributionId === "distByPercentage") {
                distribution = "2";
                $("#distribution").val("Distrib. By Percentage");
                serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("2");
            }
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                    linkid = $(this).find("td").eq(0).children(".linkid").val();
                    pRItemNumber = $(this).find("td").eq(1).text();
                }
            });
            console.log("AccountAssignment :" + accAsgn);
            console.log("AccountAssignment LinkId:" + linkid);
            serviceAccAsgnTblRow = quantity + "," + per + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + "," +
                    fundCenter + "," + commitmentItem + "," + Order + "," + dropDownItemNumber + "," + serviceLineItemNumber + "," + Asset + "," + WBSElement + ","
                    + SalesOrder + "," + NetActNumber + "," + ItemNumber + "," + DeliverySch + "," + distribution + "," + accAsgn + "," + linkid
                    + "," + poid + "," + netPrice;
            console.log("serviceAccAsgnTblRow12 :" + serviceAccAsgnTblRow);
            //            console.log("netValue12 :" + netValue);
            serviceAccAsgnTblRowString = serviceAccAsgnTblRowString + serviceAccAsgnTblRow + "#";
            console.log("serviceAccAsgnTblRowString :" + serviceAccAsgnTblRowString);
        });
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveStandAloneServiceTabAccAsgnTblData",
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
            }
        });
        var accountAssignmentCategory;
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                //                linkid = $(this).find("td").eq(0).children(".linkid").val();
            }
        });
        console.log("Account Assignment after save :" + accountAssignmentCategory);
        callOnlyMainAcAsgnFun(accountAssignmentCategory, "afterSave");
        var prType = $("#prType").val();
        if (prType === "Service") {
            $("#account_assignment-tab :input").prop("disabled", true);
            $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
        }
    });
    $("#serviceInpAccAsgnmentSubmitBtn").click(function() {
        var prType = $("#prType").val();
        var accountAssignment = $("#accountAssignmentCategory").val();
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
        //        var itemCode = $("#ItemNumberSelect").val();
        var linknumber = $("#ServiceLinkNumberId").val();
        var netvalue = $("#ServiceNetValueId").val();
        var PoId = $("#poid").val();
        var distribution = "";
        $("#distribution").val("Single Account Assignment");
        var pRItemNumber = "";
        var accAsgn = "";
        var linkid;
        var errorMsg = "";
        var wBSElement = "";
        var isCorrect = ServiceAccountAssignmentValidation("Single Account Assignment", accountAssignment);
        if (isCorrect === false) {
            return false;
        }

        var dropDownItemNumber = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                linkid = $(this).find("td").eq(0).children(".linkid").val();
                accAsgn = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
            }
        });
        serviceTabTableCurrentTd.parent().parent().find("td").eq(0).children(".ServiceAccAssDist").val("0");
        var netPrice = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(8).children(".netPrice_Services").val());
        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
        var quantity = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services ").val());
        var accAsgnString = gLAccount + "," + cOARea + "," + companyCode + "," + costCenter + "," + order + "," + asset + "," + WBSElement + "," +
                salesOrder + "," + itemNumber + "," + delSchedule + "," + fund + "," + functionalArea + "," + fundCenter + "," + comItem + ","
                + nANumber + "," + dropDownItemNumber + "," + serviceLineItemNumber + "," + quantity + "," + accAsgn + "," + linkid + "," + PoId
                + "," + netPrice;
        console.log("accAsgnString: " + accAsgnString);
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveStandAloneServiceAccAsgnData",
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
            }
        });
        var accountAssignmentCategory = $("#accountAssignmentCategory").val();
        callOnlyMainAcAsgnFun(accountAssignmentCategory, "afterSave");
        if (prType === "Service") {
            $("#account_assignment-tab :input").prop("disabled", true);
            $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
        }
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
        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
        var pRItemNumber = "";
        var linkid;
        var poid = $("#poid").val();
        $("#material_headerClass tbody tr").each(function() {
//            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                pRItemNumber = $(this).find("td").eq(1).text();
                linkid = $(this).find("td").eq(0).children(".linkid").val();
            }
        });
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
                + "," + serviceLineItemNumber + "," + pRItemNumber + "," + linkid + "," + poid;
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveStansAloneProfitabilitySegmentData",
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
    $("#material_headerClass").on("change", ".quantity_Class", function() {
        var itemCat = $(this).parent().parent().find("td").eq(3).children(".itemCategoryClass").val();
        console.log("itemCat: " + itemCat);
        var qunatity = removeCommaInNumber($(this).val());
        if (qunatity === 0) {
            $(this).css("border-color", "red");
        } else {
            $(this).css("border-color", "");
        }
        $("#pOQuantity").val(formatNumberByComma(Number(qunatity).toFixed(3)));
        if (itemCat !== "D")
        {
            $("#pOQuantitySKU").val(formatNumberByComma(Number(qunatity).toFixed(3)));
        }
        $("#DeliveryScheduleTableId tbody tr").find("td").eq(3).children(".scheduledQuantityClass").val(formatNumberByComma(Number(qunatity).toFixed(3)));
//        $("#conditionTableIdLineLevel tbody tr").each(function() {
//            $(this).find("td").eq(3).children(".AmountLineLevel").val("");
//            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val("");
//            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val("");
//        });

        $(this).val(formatNumberByComma($(this).val()));
        
        calculationForPBXXInStandalone();
        calculatePBXXForHeaderInStandalone();
        clearPerColumnatHeaderInSA();
        findApproverDetails();
    });
    $("#material_headerClass").on("change", ".prPerUnit", function() {
        var itemCat = $(this).parent().parent().find("td").eq(3).children(".itemCategoryClass").val();
        console.log("itemCat: " + itemCat);
        var perUnit = removeCommaInNumber($(this).val());
        $("#orderUnit").val(formatAmountByComma(perUnit));
        $("#orderPriceUnit").val(formatAmountByComma(perUnit));
        if (itemCat !== "D")
        {
            $("#orderUnit2").val(formatAmountByComma(perUnit));
            $("#sKUUnit").val(formatAmountByComma(perUnit));
        }
        $(this).val(formatAmountByComma($(this).val()));
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
        var expectedValue = $("#ExpectedValue").val() !== "" ? removeCommaInNumber($("#ExpectedValue").val()) : "";
        var accountAssignment = $("#accountAssignmentCategory").val();
        var pRItemNumber = "";
        var accAsgn = "";
        var errorMsg = "";
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
//                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                linkid = $(this).find("td").eq(0).children(".linkid").val();
            }
        });
        var isCorrect = limitAccountAssignmentValidationForSingle(accountAssignment);
        if (isCorrect === false) {
            return false;
        }
//        saveLimitsTabData(itemCode, pRItemNumber, linkid);
        console.log("serviceLineItemNumber quantity :");
        var accAsgnString = gLAccount + "," + cOARea + "," + companyCode + "," + costCenter + "," + order + "," + asset + "," + WSElement + "," +
                salesOrder + "," + itemNumber + "," + delSchedule + "," + fund + "," + functionalArea + "," + fundCenter + "," + comItem + ","
                + nANumber + "," + itemCode + "," + pRItemNumber + "," + accAsgn + "," + expectedValue + "," + linkid;
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveStandAloneLimitAccAsgnData",
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
        if (prType === "Service") {
            $("#account_assignment-tab :input").prop("disabled", true);
            $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
        }
    });
    $("#limitAccountAsgnTblSaveBtn").click(function() {
        var limitAccAsgnTblRow = "";
        var limitAccAsgnTblRowString = "";
        var pRItemNumber = "";
        var itemCode = "";
        var linkid = "";
        var quantity = "";
        //        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
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
            var expectedValue = $("#ExpectedValue").val() !== "" ? removeCommaInNumber($("#ExpectedValue").val()) : "";
            var distribution;
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
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
//                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                    accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                    linkid = $(this).find("td").eq(0).children(".linkid").val();
                    quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                }
            });
            limitAccAsgnTblRow = percentage + "," + gLAccount + "," + cOArea + "," + costCenter + "," + fund + "," + funArea + ","
                    + fundCenter + "," + commitmentItem + "," + order + "," + asset + "," + wBSElement + "," + salesOrder + ","
                    + netActNumber + "," + itemNumber + "," + deliverySch + "," + itemCode + "," + distribution + "," + accAsgn + ","
                    + expectedValue + "," + linkid + "," + quantity;
            limitAccAsgnTblRowString = limitAccAsgnTblRowString + limitAccAsgnTblRow + "#";
            console.log("limitAccAsgnTblRowString :" + limitAccAsgnTblRowString);
        });
        //        saveLimitsTabData(itemCode, pRItemNumber, linkid);

        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "saveStandAloneLimitTabAccAsgnTblData",
                "limitAccAsgnTblRowString": limitAccAsgnTblRowString
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
        var accountAssignmentCategory;
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
//                pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
                accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                //                linkid = $(this).find("td").eq(0).children(".linkid").val();
            }
        });
        console.log("Account Assignment after save :" + accountAssignmentCategory);
        callOnlyMainAcAsgnFun(accountAssignmentCategory, "afterSave");
        if (prType === "Service") {
            $("#account_assignment-tab :input").prop("disabled", true);
            $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
        }
    });
    var currencyHeader;
    $("#companycodeHeader").change(function() {
        $("#overlay").css("display", "block");
        var companyCodeHeader = $(this).val();
        console.log("companyCodeHeader: " + companyCodeHeader);
        $("#companyCodeService").val(companyCodeHeader);
        $("#CoCode").val(companyCodeHeader);
        setTimeout(function() {

            if (companyCodeHeader === '0640' || companyCodeHeader === '0641') {
                $("#CurrencyDeliveryInvoice").val("SGD");
                currencyHeader = "SGD";
            } else if (companyCodeHeader === '0680') {
                $("#CurrencyDeliveryInvoice").val("MYR");
                currencyHeader = "MYR";
            }
            $("#serviceTableId tbody tr").each(function() {
                $(this).find("td").eq(7).children(".currency_Services").val(currencyHeader);
            });
            $("#material_headerClass tbody tr").each(function() {
                $(this).find("td").eq(11).children(".currencyClass").val(currencyHeader);
                $(this).find("td").eq(30).text(companyCodeHeader);
            });
            var conCurr1;
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                conCurr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                if (conCurr1 !== "%") {
                    $(this).find("td").eq(4).children(".CurrencyLineLevel").val(currencyHeader);
                }
            });
            getVendorByCompanycode(companyCodeHeader);
            $("#overlay").css("display", "none");
        }, 1000);
    });
    $("#vendorCondition").click(function() {
//        partnerFunctionTabTableCurrentTr = $(this).parent().parent();
        $("#overlay").css("display", "block");
//        $("#VendorMasterModal").modal("show");
        var companyCodeHeader = $("#companycodeHeader").val();
        $("#vendorMasterreqFrom").val("vendorCondition");
        findVendorByCompanyCode(companyCodeHeader);
        $("#conditiondetailsModal").modal("hide");
    });
    var vendorMasterModalTable = "";
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
                for (var i = 0; i < jsonVendorArr.length; i++) {
                    row += "<tr class='vendorMasterModalTableTr'>"
                            + "<td>" + jsonVendorArr[i].vendorCode + "</td>"
                            + "<td>" + jsonVendorArr[i].vendorName + "</td>"
                            + "</tr>";
                }
                $("#vendorMasterModalTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#vendorMasterModalTable')) {
                    vendorMasterModalTable.destroy();
                    vendorMasterModalTable = null;
                    $("#vendorMasterModalTable").children('tbody').html(row);
                    vendorMasterModalTable = $('table.vendorMasterModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    vendorMasterModalTable.buttons().container()
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
                            if (vendorMasterModalTable.column(i).search() !== this.value) {
                                vendorMasterModalTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    vendorMasterModalTable = $('table.vendorMasterModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    vendorMasterModalTable.buttons().container()
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
        var reqFrom = $("#vendorMasterreqFrom").val();
        if (reqFrom === "vendorCondition") {
            conditionTableCurrentClick.parent().parent().find("td").eq(0).children(".conditionVendor").val(vendorCode);
            $("#vendorCondition").val(vendorCode);
            $("#conditiondetailsModal").modal("show");
        } else if (reqFrom === "vendorConditionHeader") {
            $("#vendorConditionHeader").val(vendorCode);
            conditionTableCurrentClick.parent().parent().find("td").eq(0).children(".conditionVendorHeader").val(vendorCode);
            conditionTableCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderVendorName').val(vendorName);
            conditionTableCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderVendorCode').val(vendorCode);
            var headerCondType = conditionTableCurrentClick.parent().parent().find("td").eq(1).children('.ConditionTypeHeader').val();
            $("#conditiondetailsHeaderModal").modal("show");
        }
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var conType = "";
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            var condChangeId = $(this).find("td").eq(17).children(".conditionChangeId").val();

            if (headerCondType === conType && condChangeId === "I") {
                $(this).find("td").eq(0).children(".conditionVendor").val(vendorCode);
            }
        });
        conditionLineLevelArraySA.forEach(function(e) {
            e.vendorcode = vendorCode;
            e.vendorname = vendorName;
        });
        $("#VendorMasterModal").modal("hide");
    });
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
//                    $("#vendorcodeHeader option").remove();
                    $('.selectpicker').selectpicker('refresh');
                    if (jsonVendorArr.length !== 0) {
//                        var option = "";
                        for (var i = 0; i < jsonVendorArr.length; i++) {
                            if (vendorCompanyCode === jsonVendorArr[i].vendorCode)
                            {
                                vendorSno = jsonVendorArr[i].sno;
                                $("#vendorSno").val(vendorSno);
                                $("#vendorcodeHeader").val(jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode);
                            }
//                            option += "<option value='" + jsonVendorArr[i].sno + "'>" + jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode + "</option>";
                        }
//                        $("#vendorcodeHeader").append(option);
//                        $('.selectpicker').selectpicker('refresh');
                    }
                    console.log("vendorCompanyCode: " + vendorCompanyCode);
                    console.log("vendorSno: " + vendorSno);
                    if (vendorCompanyCode !== "")
                    {
//                        $("#vendorcodeHeader").val(vendorSno);
//                        $('.selectpicker').selectpicker('refresh');
                    }

                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data:
                                {
                                    "reqFrom": "getVendorBySno",
                                    "sno": vendorSno
                                },
                        dataType: "json",
                        complete: function(responseJson)
                        {
                            var obj = $.parseJSON(responseJson.responseText);
                            var kalsm = obj.kalsm;
                            $("#kalsmHiddenfield").val(obj.kalsm);
                        }
                    });
                }
            });
            var fromCurrency = $("#CurrencyDeliveryInvoice").val();
            var toCurrency = $("#material_headerClass tbody tr").find("td").eq(11).children(".currencyClass").val();
            var length = $("#material_headerClass tbody tr").length;
            if (length !== 0 && toCurrency !== "") {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                $("#ExchangeRate").val(Number(exchangeRate).toFixed(5));
            }

        }
    }


    $("#uploaddocumentModalBtn").click(function() {
        if ($("input[name='file_docDiv1']").val().trim() !== "" || $("input[name='file_docDiv2']").val().trim() !== "" ||
                $("input[name='file_docDiv3']").val().trim() !== "" || $("input[name='file_docDiv4']").val().trim() !== "" ||
                $("input[name='file_docDiv5']").val().trim() !== "") {

            $("#prlineitemattachmentmodal").modal("hide");
        }
        else
        {
            Lobibox.alert("error",
                    {
                        msg: "Please select at least one file!"
                    });
        }
    });
    $("#pocreationdocform").submit(function(event) {

        event.preventDefault();
        if ($("input[name='file_docDiv1']").val().trim() !== "" || $("input[name='file_docDiv2']").val().trim() !== "" ||
                $("input[name='file_docDiv3']").val().trim() !== "" || $("input[name='file_docDiv4']").val().trim() !== "" ||
                $("input[name='file_docDiv5']").val().trim() !== "") {
            var id = $("#TempAttachmentId").val();
            var formData = new FormData(this);
            $.ajax({
                type: "POST",
                url: "submitpoattachment.do",
                async: true,
                data: formData,
                //                        enctype: 'multipart/form-data',
                contentType: false,
                processData: false,
                dataType: "json",
                complete: function(responseJson)
                {
                    var obj = $.parseJSON(responseJson.responseText);
                    $("#TempAttachmentId").val(obj.TempAttachmentId);
//                            current_tr.find("td").eq(9).children(".pr-att-temp").val(obj.TempAttachmentId);
//                            current_tr.find("td").eq(20).children(".viewUploadedDocFromDB").removeAttr("style");
////                        $("#prlineitemattachmentmodal").modal("hide");
//                            console.log(current_tr.find("td").eq(20).children(".viewUploadedDocFromDB").html());
                    //                        lobiboxProgress.hide();
                },
                success: function(status)
                {
                    //                        $("#overlay").css("display", "none");

                }
            });
        }
    }
    );


    $("#material_headerClass").on("keypress", ".pODeliveryDateCetegory", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            delDateCateCurrent = $(this);
            $("#DeliverySchedule-DelDateCategoryField-Picklist-Model").modal("show");
            $("#reqFromDelDateCat").val("FromPR");
        }
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
    $("#fundTableId").on("click", ".fundTR", function() {
        var fund = $(this).find("td").eq(0).text();
        $("#interCompanyFund").val(fund);
        $("#fundModal").modal("hide");
    });
    //SUNNY KUMAR PRAJAPATI
    $("#interCompanyFunctionalArea").click(function() {
        $("#functionalAreaModal").modal("show");
        var companycode = $("#companycodeHeader").val();
        getFunctionalAreaByCompanyCode(companycode);
    });
    $("#functionalAreaTableId").on("click", ".functionalAreaTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        $("#interCompanyFunctionalArea").val(code);
        $("#functionalAreaModal").modal("hide");
    });
    $("#interCompanyFundCenterInput").click(function() {
//        $("#fundCenterModal").modal("show");
    });
    $("#interCompanyCommItemInput").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#ro_CommitItem").val("InterCompany");
            $("#commitmentItemModal").modal("show");
            getAllCommitmentItem();
        }
    });
    $("#IncoTermsPart1").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#incoTermsModal").modal("show");
            $("#incotermsReqFrom").val("IncoTermsPart1");
            getAllMasterIncoTerms();
        }
    });
    
//    $("#IncoTermsPart2").click(function() {
//        $("#incoTermsModal").modal("show");
//        $("#incotermsReqFrom").val("IncoTermsPart2");
//        getAllMasterIncoTerms();
//    });

    $("#incoTermsPart1Delivery").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#incoTermsModal").modal("show");
            $("#incotermsReqFrom").val("IncoTermsPart1_LineLevel");
            getAllMasterIncoTerms();
        }
    });

//    $("#incoTermsPart2Delivery").click(function() {
//        $("#incoTermsModal").modal("show");
//        $("#incotermsReqFrom").val("IncoTermsPart2_LineLevel");
//        getAllMasterIncoTerms();
//    });
    
    $("#incoTermsTable").on("click", ".incoTermsTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        var desc = $(this).find("td").eq(1).text();        
        console.log("Incoterms: " + code);
        console.log("desc: " + desc);
        
        var reqFrom = $("#incotermsReqFrom").val();
        console.log("reqFrom: " + reqFrom);
        
        if (reqFrom === "IncoTermsPart1") {
            $("#IncoTermsPart1").val(code);
            $("#incoTermsPart1Delivery").val(code);
            if (code === "DEL") {
                $("#IncoTermsPart2").val("SELF DELIVER");
                $("#incoTermsPart2Delivery").val("SELF DELIVER");
            } else if (code.trim() === "SC") {
                $("#IncoTermsPart2").val("COLLECTION");
                $("#incoTermsPart2Delivery").val("COLLECTION");
            } else {
                $("#IncoTermsPart2").val("");
                $("#incoTermsPart2Delivery").val("");
            }
        } else if (reqFrom === "IncoTermsPart2") {
            $("#IncoTermsPart2").val(code);
        } else if (reqFrom === "IncoTermsPart1_LineLevel") {
            $("#incoTermsPart1Delivery").val(code);
            $("#incoTermsPart2Delivery").val(desc);
        } else if (reqFrom === "IncoTermsPart2_LineLevel") {
            $("#incoTermsPart1Delivery").val(code);
            $("#incoTermsPart2Delivery").val(desc);
        }
        $("#incoTermsModal").modal("hide");
    });
    $("#addRowConditionsBtnId").click(function() {
        var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        var vendorname = vendor.substring(0, vendor.lastIndexOf('-')); // vendor.split("-")[0];
        var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split("-")[1];
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
        var prlength = $('#material_headerClass tbody tr').length;
        if (prlength === 0) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please add PR!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }

        var tdrow = "<tr>"
                + "<td><input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                <input type='hidden' class='conditionVendorHeader' value='" + vendorcode + "'>\n\
                <input type='hidden' class='lineAddedFromHeader' value='headerlevel'>\n\
                <input type='hidden' class='conditionindex'></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value=''></td>"
                + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded newAmountHeader tableInputField' name='AmountHeader' disabled value = '' style='width: 150px;'><input type='hidden' class='newAmountHeaderHidden'></td>"
                + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded newPerQuantityHeader tableInputField' name='PerQuantityHeader' disabled value='1.00' style='width: 150px;'><input type='hidden' class='newPerQuantityHeaderHidden'></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled value=''></td>"
                + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled value='' style='width: 150px;'><input type='hidden' class='ConditionValueHeaderHidden'></td>"
                + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value=''></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='I'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + vendorname + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + vendorcode + "'>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value=''>\n\
                        <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value=''></td>"
                + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;'></i></td>"
                + "</tr>";
        $("#conditionTableId tbody").append(tdrow);

        $("#conditionTableId tbody tr").last().find("td").eq(1).children(".ConditionTypeHeader").focus();
    });
    var conHeaderType = null;
    var condTabCurrentClick = "";
    $("#conditionTableId").on("keypress", ".ConditionTypeHeader", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            condTabCurrentClick = $(this);
            var pricingprocedure = $("#kalsmHiddenfield").val();
            $("#ConditionTypeHeaderModal").modal("show");
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
                                    + "<td><input type='checkbox' class='checkConditionTypeModelHeaderClass'></td>"
                                    + "<td>" + obj[i].CTYPE + "</td>"
                                    + "<td>" + obj[i].NAME + "</td>"
                                    + "<td>" + obj[i].CRCY + "</td>"
                                    + "</tr>";
                        }
                    }
                    $("#conditionTypeTableHeaderId tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#conditionTypeTableHeaderId')) {
                        conHeaderType.destroy();
                        conHeaderType = null;
                        $("#conditionTypeTableHeaderId").children('tbody').html(row);
                        conHeaderType = $('table.conditionTypeTableHeaderClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        conHeaderType.buttons().container()
                                .appendTo('#conditionTypeTableHeaderId_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#conditionTypeTableHeaderId thead tr').clone(true).appendTo('#conditionTypeTableHeaderId thead');
                        $('#conditionTypeTableHeaderId thead tr:eq(1) th').each(function(i) {
                            $('#conditionTypeTableHeaderId thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (conHeaderType.column(i).search() !== this.value) {
                                    conHeaderType
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        conHeaderType = $('table.conditionTypeTableHeaderClass').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        conHeaderType.buttons().container()
                                .appendTo('#conditionTypeTableHeaderId_wrapper .col-md-6:eq(0)');
                    }
                }
            });
        }
    });
    var lobiboxNotifyAlert = null;
    $("#conditionTypeTableHeaderId").on("click", ".checkConditionTypeModelHeaderClass", function() {
        var Ctype = $(this).parent().parent().find("td").eq(1).text();
        var name = $(this).parent().parent().find("td").eq(2).text();
        var crcy = $(this).parent().parent().find("td").eq(3).text();
        var uom;
//        var prCurrency = "";
        var count = 1;
        var currency = $("#CurrencyDeliveryInvoice").val();
        var accAsgn = "";
        var itemCat = "";
        $("#conditionTableId tbody tr").each(function() {
            var availableCondition = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
            var addedFrom = $(this).find("td").eq(0).children('.lineAddedFromHeader').val();
            var changeId = $(this).find("td").eq(11).children('.conditionHeaderCHANGEID').val();
            if (addedFrom === "headerlevel" && changeId === "I") {
                if (availableCondition === Ctype) {
                    count++;
                }
            }
        });
        console.log("count :" + count);
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                uom = $(this).find("td").eq(31).children(".prUom").val();
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            }
        });
        if (accAsgn === "" && itemCat !== "L") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Account Assignmen!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }
        var flag = false;
        if (flag === false) {
            condTabCurrentClick.val(Ctype);
            condTabCurrentClick.parent().parent().find("td").eq(2).children('.nameConditionsHeader').val(name);
            if (crcy === "%") {
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyHeader').val("%");
            } else {
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyHeader').val(currency);
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyHeader').prop("disabled", false);
            }
            condTabCurrentClick.parent().parent().find("td").eq(9).children('.Currency2Header').val("SGD");
            condTabCurrentClick.parent().parent().find("td").eq(10).children('.ConditionValue2Header').val("0.00");
            condTabCurrentClick.parent().parent().find("td").eq(6).children('.ConditionPricingUnitHeader').val(uom);
            condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMHeader').val(uom);
            condTabCurrentClick.parent().parent().find("td").eq(3).children('.newAmountHeader').prop("disabled", false);
            condTabCurrentClick.parent().parent().find("td").eq(5).children('.newPerQuantityHeader').prop("disabled", false);
            if (condTabCurrentClick.parent().parent().find("td").eq(7).children('.UoMHeader').val() === "%") {
                condTabCurrentClick.parent().parent().find("td").eq(5).children('.newPerQuantityHeader').prop("disabled", false);
            }

            var fromCurrency;
            var item;
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    fromCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
                    item = $(this).find("td").eq(1).text();
                }
            });
            var currency1 = condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyHeader').val();
            var currency2 = condTabCurrentClick.parent().parent().find("td").eq(9).children('.Currency2Header').val();
            var toCurrency1 = currency1;
            var toCurrency2 = currency2;
            var exchangeRate1 = getExchangeRate(toCurrency1, fromCurrency);
            var exchangeRate2 = getExchangeRate(toCurrency2, fromCurrency);
            condTabCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderCondCurncyExchangeRate').val(exchangeRate1);
            condTabCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderPOCurrencyExchangeRate').val(exchangeRate2);
            condTabCurrentClick.parent().parent().find("td").eq(0).children('.conditionindex').val(count);
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
                    condTabCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderKAPPL').val(obj.KAPPL);
                    condTabCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderKVSL1').val(obj.KVSL1);
                    condTabCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderKVSL2').val(obj.KVSL2);
                    condTabCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderZAEHK').val(obj.ZAEHK);
                    condTabCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderSTUNR').val(obj.STUNR);
                }
            });
        }
        $("#ConditionTypeHeaderModal").modal("hide");
    });
    var checkArr = [];
    var conditionTableCurrentClick = "";
    $("#conditionTableId").on("click", ".checkConditionTableRow", function() {
        var isChasked = $(this).prop("checked");
        checkArr = [];
        $("#conditionTableId tbody tr").each(function() {
            $(this).find("td").eq(0).children(".checkConditionTableRow").prop("checked", false);
        });
        if (isChasked === true) {
            $(this).prop("checked", true);
        } else {
            $(this).prop("checked", false);
        }
        conditionTableCurrentClick = $(this);
        var isCheckConditionTable = $(this).prop("checked");
        if (isCheckConditionTable === true) {
            checkArr.push(isCheckConditionTable);
            if (checkArr.length === 1) {
                $("#conditionDetailsBtn_div").css("display", "block");
            } else {
                $("#conditionDetailsBtn_div").css("display", "none");
            }
        } else {
            var index = checkArr.indexOf(isCheckConditionTable);
            checkArr.splice(index, 1);
            if (checkArr.length === 1) {
                $("#conditionDetailsBtn_div").css("display", "block");
            } else {
                $("#conditionDetailsBtn_div").css("display", "none");
            }
        }
    });
    $("#conditionDetailsBtn").click(function() {
        $("#conditiondetailsFormHeader").trigger("reset");
        $("#conditiondetailsHeaderModal").modal("show");
        var vendorname = [];
        var currency1 = conditionTableCurrentClick.parent().parent().find("td").eq(4).children(".CurrencyHeader").val(); // PO Currency
        var currency2 = conditionTableCurrentClick.parent().parent().find("td").eq(9).children(".Currency2Header").val(); // Local Currency
        var pricingUnit = conditionTableCurrentClick.parent().parent().find("td").eq(6).children(".ConditionPricingUnitHeader").val();
        var Uom = conditionTableCurrentClick.parent().parent().find("td").eq(7).children(".UoMHeader").val();
        var amount = removeCommaInNumber(conditionTableCurrentClick.parent().parent().find("td").eq(3).children("input[name=AmountHeader]").val());
        var condValue = removeCommaInNumber(conditionTableCurrentClick.parent().parent().find("td").eq(8).children("input[name=ConditionValueHeader]").val());
        var condType = conditionTableCurrentClick.parent().parent().find("td").eq(1).children("input[name=ConditionTypeHeader]").val();
        var condName = conditionTableCurrentClick.parent().parent().find("td").eq(2).children("input[name=nameConditionsHeader]").val();
        var kappl = conditionTableCurrentClick.parent().parent().find("td").eq(11).children(".conditionHeaderKAPPL").val();
        var kvsl1 = conditionTableCurrentClick.parent().parent().find("td").eq(11).children(".conditionHeaderKVSL1").val();
        var kvsl2 = conditionTableCurrentClick.parent().parent().find("td").eq(11).children(".conditionHeaderKVSL2").val();
        console.log("currency1 :" + currency1);
        console.log("currency2 :" + currency2);
        console.log("pricingUnit :" + pricingUnit);
        console.log("Uom :" + Uom);
        console.log("amount :" + amount);
        console.log("condValue :" + condValue);
        console.log("condType :" + condType);
        console.log("condName :" + condName);
        console.log("kappl :" + kappl);
        console.log("kvsl1 :" + kvsl1);
        console.log("kvsl2 :" + kvsl2);
        var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
//        vendorname = vendor.split("-");
        var vendorCode = conditionTableCurrentClick.parent().parent().find("td").eq(0).children('.conditionVendorHeader').val();
        var fromCurrency;
        var item;
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                fromCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
                item = $(this).find("td").eq(1).text();
            }
        });
        var toCurrency1 = currency1;
        var toCurrency2 = currency2;
        var exchangeRate1 = getExchangeRate(toCurrency1, fromCurrency);
        var exchangeRate2 = getExchangeRate(toCurrency2, fromCurrency);
        console.log("exchangeRate1: " + exchangeRate1);
        console.log("exchangeRate2: " + exchangeRate2);
        $("#amountConditionsHeader").val(amount);
        $("#conditionValueConditionsHeader").val(condValue);
        $("#currency1ConditionsHeader").val(currency1);
        $("#currency2ConditionsHeader").val(currency2);
        $("#pricingUnitConditionsHeader").val(pricingUnit);
        $("#uoMConditionValuesConditionsHeader").val(Uom);
        $("#currencyConditionsHeader").val(currency1);
        $("#currencyPrHeader").val(currency2);
        $("#ExchangeRateConditionHeader").val(exchangeRate1);
        $("#ExchangeRatePrHeader").val(exchangeRate2);
        $("#condTypeConditionsHeader").val(condType);
        $("#condNameConditionsHeader").val(condName);
        $("#itemConditionsHeader").val(item);
        $("#applicationConditionsHeader").val(kappl);
        $("#AccountKeyHeader").val(kvsl1);
        $("#accrualsAccountDeterminationHeader").val(kvsl2);
        $("#vendorConditionHeader").val(vendorCode);
    });
    $("#vendorConditionHeader").click(function() {
//        partnerFunctionTabTableCurrentTr = $(this).parent().parent();
        $("#overlay").css("display", "block");
//        $("#VendorMasterModal").modal("show");
        var companyCodeHeader = $("#companycodeHeader").val();
        $("#vendorMasterreqFrom").val("vendorConditionHeader");
        findVendorByCompanyCode(companyCodeHeader);
        $("#conditiondetailsHeaderModal").modal("hide");
    });
});
var fncArea = null;
function getFunctionalAreaByCompanyCode(companycode) {
    //13699
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getFunctionalAreaByCompanyCode",
            "companycode": companycode
        },
        complete: function(responseJson) {
            var jsonFunArr = $.parseJSON(responseJson.responseText);
            jsonFunArr = JSON.parse(JSON.stringify(jsonFunArr));
            console.log("Obj length bittu:" + jsonFunArr.length);
            var row = "";
            for (var i = 0; i < jsonFunArr.length; i++) {
                row += "<tr class='functionalAreaTrClass'>"
                        + "<td>" + jsonFunArr[i].fnArea + "</td>"
                        + "<td>" + jsonFunArr[i].description + "</td>"
                        + "</tr>";
            }
            $("#functionalAreaTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#functionalAreaTableId')) {
                fncArea.destroy();
                fncArea = null;
                $("#functionalAreaTableId").children('tbody').html(row);
                fncArea = $('table.functionalAreaTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                fncArea.buttons().container()
                        .appendTo('#functionalAreaTableId_wrapper .col-md-6:eq(0)');
            } else {
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
                        if (fncArea.column(i).search() !== this.value) {
                            fncArea
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                fncArea = $('table.functionalAreaTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                fncArea.buttons().container()
                        .appendTo('#functionalAreaTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}
var incoTerms = null;
function getAllMasterIncoTerms() {
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllMasterIncoTerms"
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            console.log("Obj length :" + jsonArr.length);
            var row = "";
            for (var i = 0; i < jsonArr.length; i++) {
                row += "<tr class='incoTermsTrClass'>"
                        + "<td>" + jsonArr[i].incoterms + "</td>"
                        + "<td>" + jsonArr[i].incotermsDesc + "</td>"
                        + "</tr>";
            }
            $("#incoTermsTable tbody").append(row);
            if ($.fn.DataTable.isDataTable('#incoTermsTable')) {
                incoTerms.destroy();
                incoTerms = null;
                $("#incoTermsTable").children('tbody').html(row);
                incoTerms = $('table.incoTermsTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                incoTerms.buttons().container()
                        .appendTo('#incoTermsTable_wrapper .col-md-6:eq(0)');
            } else {
                $('#incoTermsTable thead tr').clone(true).appendTo('#incoTermsTable thead');
                $('#incoTermsTable thead tr:eq(1) th').each(function(i) {
                    $('#incoTermsTable thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (incoTerms.column(i).search() !== this.value) {
                            incoTerms
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                incoTerms = $('table.incoTermsTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                incoTerms.buttons().container()
                        .appendTo('#incoTermsTable_wrapper .col-md-6:eq(0)');
            }
        }
    });
}

function popuDetails() {
    var Result = "";
    var linkid = "";
    var accountAssignmentCategory;
    var confControlPr = "";
    var taxCodePr = "";
    var segmentPr = "";
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            linkid = $(this).find("td").eq(0).children(".linkid").val();
            accountAssignmentCategory = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            confControlPr = $(this).find("td").eq(0).children(".ConfirmationControlForLineInPr").val();
            taxCodePr = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
            segmentPr = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
        }
    });
    console.log("linkid in getExtPOCreationByPOidAndItemNumber :" + linkid);
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data:
                {
                    "reqFrom": "getExtPOCreationByPOidAndItemNumber",
                    "linkid": linkid
                },
        //        dataType: "json",
        complete: function(responseJson)
        {
            console.log("OUTPUT JSON ::: " + responseJson.responseText);
            var jsonObj = $.parseJSON(responseJson.responseText);
            jsonObj = JSON.parse(JSON.stringify(jsonObj));
            console.log("jsonObj in on Change: " + JSON.stringify(jsonObj));
            /**********************Limits**************************/
            Result = jsonObj.Result;
            if (jsonObj.Result === "RecordFound") {

                console.log("jsonObj.pOCreationLimits[0]: " + jsonObj.pOCreationLimits);
                if (jsonObj.pOCreationLimits !== undefined) {
                    var prType = $("#prType").val();
                    if (prType === "Service") {
                        $("#OverallLimit").val(formatAmountByComma(jsonObj.pOCreationLimits[0].overallLimit));
                        $("#ExpectedValue").val(formatAmountByComma(jsonObj.pOCreationLimits[0].expectedValue));
                        var noLimit = jsonObj.pOCreationLimits[0].noLimit;
                        if (noLimit === true) {
                            $("#NoLimit").prop("checked", true);
                        } else {
                            $("#NoLimit").prop("checked", false);
                        }
                    }
                } else {
                    $("#OverallLimit").val("");
                    $("#ExpectedValue").val("");
                    $("#NoLimit").prop("checked", false);
                }
                /********************QuantityDates****************/

                if (jsonObj.quanWeight !== undefined) {
                    if ($("#prType").val() === "Material")
                    {
                        $("#pOQuantity").val(formatNumberByComma(Number(jsonObj.quanWeight.poQuantity).toFixed(3)));
                        $("#pOUnit").val(jsonObj.quanWeight.poQuantityUnit);
                        $("#orderUnit").val(formatAmountByComma(jsonObj.quanWeight.order1));
                        $("#unitOrderUnit").val(jsonObj.quanWeight.orderUnit1);
                        $("#orderUnit2").val(formatAmountByComma(jsonObj.quanWeight.order2));
                        $("#unitOrderUnit2").val(jsonObj.quanWeight.orderUnit2);
                        $("#pOQuantitySKU").val(formatNumberByComma(Number(jsonObj.quanWeight.poQuantitySKU).toFixed(3)));
                        $("#pOUnitSKU").val(jsonObj.quanWeight.poQuantitySKUUnit);
                        $("#unitOrderPriceUnit").val(jsonObj.quanWeight.orderPriceUnit);
                        $("#orderPriceUnit").val(formatAmountByComma(jsonObj.quanWeight.orderPrice));
                        $("#sKUUnit").val(formatAmountByComma(jsonObj.quanWeight.sku));
                        $("#unitSKUUnit").val(jsonObj.quanWeight.skuUnit);
                        $("#netWeight").val(jsonObj.quanWeight.netweight);
                        $("#grossWeight").val(jsonObj.quanWeight.grossweight);
                        $("#volume").val(jsonObj.quanWeight.volume);
                        $("#points").val(jsonObj.quanWeight.points);
                        $("#netWeight2").val(jsonObj.quanWeight.netweight2);
                        $("#grossWeight2").val(jsonObj.quanWeight.grossweight2);
                        $("#volume2").val(jsonObj.quanWeight.volume2);
                        $("#points2").val(jsonObj.quanWeight.points2);
                        $("#netWeightUnit").val(jsonObj.quanWeight.netWeightUnit);
                        $("#grossWeightUnit").val(jsonObj.quanWeight.grossWeightUnit);
                        $("#volumeUnit").val(jsonObj.quanWeight.volumeUnit);
                        $("#pointsUnit").val(jsonObj.quanWeight.pointsUnit);
                        $("#netWeightUnit2").val(jsonObj.quanWeight.netWeightUnit2);
                        $("#grossWeightUnit2").val(jsonObj.quanWeight.grossWeightUnit2);
                        $("#volumeUnit2").val(jsonObj.quanWeight.volumeUnit2);
                        $("#pointsUnit2").val(jsonObj.quanWeight.pointsUnit2);
                        $("#netWeightOrderUnit").val(jsonObj.quanWeight.netWeightOrderUnit);
                        $("#grossWeightOrderUnit").val(jsonObj.quanWeight.grossWeightOrderUnit);
                        $("#volumeOrderUnit").val(jsonObj.quanWeight.volumeOrderUnit);
                        $("#pointsOrderUnit").val(jsonObj.quanWeight.pointsOrderUnit);
                        $("#netWeightPerUnit").val(jsonObj.quanWeight.netWeightPerPrice);
                        $("#grossWeightPerUnit").val(jsonObj.quanWeight.grossWeightPerPrice);
                        $("#volumePerUnit").val(jsonObj.quanWeight.volumePerPrice);
                        $("#pointsPerUnit").val(jsonObj.quanWeight.pointsPerPrice);
                    }
                    else
                    {
                        var matcode = "";
                        $("#pOQuantity").val(formatNumberByComma(Number(jsonObj.quanWeight.poQuantity).toFixed(3)));
                        $("#pOUnit").val(jsonObj.quanWeight.poQuantityUnit);
                        $("#orderUnit").val(formatAmountByComma(jsonObj.quanWeight.order1));
                        $("#unitOrderUnit").val(jsonObj.quanWeight.orderUnit1);
                        $("#orderUnit2").val("");
                        $("#unitOrderUnit2").val("");
                        $("#pOQuantitySKU").val("");
                        $("#pOUnitSKU").val("");
                        $("#unitOrderPriceUnit").val(jsonObj.quanWeight.orderPriceUnit);
                        $("#orderPriceUnit").val(formatAmountByComma(jsonObj.quanWeight.orderPrice));
                        $("#sKUUnit").val("");
                        $("#unitSKUUnit").val("");
                        var companycode = $("#companycodeHeader").val();
                        $("#material_headerClass tbody tr").each(function() {
                            var dropDownItemNumber = $("#ItemNumberSelect").val();
                            var prTableItemNumber = $(this).find("td").eq(1).html();
                            if (prTableItemNumber === dropDownItemNumber) {
                                matcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                            }
                        });
                        var jsonArr = getMaterialMasterOnLoadInStandalone(matcode, companycode);
                        if (jsonArr.length !== 0) {
//                            if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                            populateValueInQuantityWeightsTab(jsonArr);
//                            }
                        }
                    }

                } else {
                    var companycode = $("#companycodeHeader").val();
                    $("#material_headerClass tbody tr").each(function() {
                        var dropDownItemNumber = $("#ItemNumberSelect").val();
                        var prTableItemNumber = $(this).find("td").eq(1).html();
                        if (prTableItemNumber === dropDownItemNumber) {
                            matcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                        }
                    });
                    var jsonArr = getMaterialMasterOnLoadInStandalone(matcode, companycode);
                    if (jsonArr.length !== 0) {
//                        if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                        populateValueInQuantityWeightsTab(jsonArr);
//                        }
                    }
                }

                /********************Delivery****************/
                if (jsonObj.invDel !== undefined) {
                    $("#OverdeliveryTolerance").val(jsonObj.invDel.overDelTol);
                    $("#UnderdeliveryTolerance").val(jsonObj.invDel.underDelTol);
                    $("#ShippingInstruction").val(jsonObj.invDel.shippingInstructions);
                    $("#StockType").val(jsonObj.invDel.stockType);
                    $("#ValuationType").val(jsonObj.invDel.valuationType);
                    $("#RemShelfLife").val(jsonObj.invDel.remShelfLife);
                    $("#QAControlLife").val(jsonObj.invDel.qaControlLife);
                    $("#GRProcTime").val(jsonObj.invDel.grProcTime);
                    $("#FirstReminderExpediter").val(jsonObj.invDel.fstRemExped);
                    $("#SecondReminderExpediter").val(jsonObj.invDel.secRemExped);
                    $("#ThirdReminderExpediter").val(jsonObj.invDel.thrdRemExped);
                    $("#NoExpend").val(jsonObj.invDel.noExpend);
                    $("#PlDeliveryTime").val(jsonObj.invDel.plDelTime);
                    $("#incoTermsPart1Delivery").val(jsonObj.invDel.incoTerms1);
                    $("#incoTermsPart2Delivery").val(jsonObj.invDel.incoTerms2);
                    var unlimited = jsonObj.invDel.unlimited;
                    if (unlimited === true) {
                        $("#unlimited").prop("checked", true);
                    } else {
                        $("#unlimited").prop("checked", false);
                    }
                    var delvCompleted = jsonObj.invDel.delvCompleted;
                    if (delvCompleted === true) {
                        $("#DelivCompleted").prop("checked", true);
                    } else {
                        $("#DelivCompleted").prop("checked", false);
                    }
                } else {
                    $("#delivery-tab :input").val("");
                    $("#OverdeliveryTolerance").val("0.0");
                    $("#UnderdeliveryTolerance").val("0.0");
                    var code = $("#IncoTermsPart1").val();
                    $("#incoTermsPart1Delivery").val(code);
                    if (code === "DEL") {
                        $("#incoTermsPart2Delivery").val("SELF DELIVER");
                    } else if (code.trim() === "SC") {
                        $("#incoTermsPart2Delivery").val("COLLECTION");
                    } else {
                        $("#incoTermsPart2Delivery").val("");
                    }

                    var prType = $("#prType").val();
                    if (prType === "Service") {
                        $("#unlimited").prop("checked", true);
                    } else if (prType === "Material") {
                        $("#unlimited").prop("checked", false);
                    }
                }

                /********************Text****************/

                if (jsonObj.pOCreationText !== undefined) {
                    $("#ItemText").val(jsonObj.pOCreationText[0].itemText);
                    $("#InfoRecordPOText").val(jsonObj.pOCreationText[0].infoRecordPOText);
                    var MaterialLongText = handleSpecialCharacterReverse(jsonObj.pOCreationText[0].materialPOText);
                    $("#MaterialPOText").val(MaterialLongText);
                    $("#PONoteToApprover").val(jsonObj.pOCreationText[0].pONoteToApprover);
                    $("#DeliveryText").val(jsonObj.pOCreationText[0].deliveryText);
                } else {

//                    $("#texts-tab :input").val("");
                    $("#texts-tab").children("textarea").val("");
                    var shortText = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var dropDownItemNumber = $("#ItemNumberSelect").val();
                        var prTableItemNumber = $(this).find("td").eq(1).html();
                        if (prTableItemNumber === dropDownItemNumber) {
                            shortText = $(this).find("td").eq(6).children(".prShortText").val();
                        }
                    });
                    console.log("shortText :" + shortText);
                    $("#MaterialPOText").val(shortText);
                }

                /********************Delivery Address****************/
                if (jsonObj.pOCreationDel !== undefined) {
                    $("#Title").val(jsonObj.pOCreationDel[0].title);
                    $("#Name1").val(jsonObj.pOCreationDel[0].name1);
                    $("#Name2").val(jsonObj.pOCreationDel[0].name2);
                    $("#Street").val(jsonObj.pOCreationDel[0].street);
                    $("#HouseNumber").val(jsonObj.pOCreationDel[0].houseNo);
                    $("#PostalCode").val(jsonObj.pOCreationDel[0].postalCode);
                    $("#City").val(jsonObj.pOCreationDel[0].city);
                    $("#countryLimits").val(jsonObj.pOCreationDel[0].country);
                    $("#countryDesc").val(jsonObj.pOCreationDel[0].title);
                } else {
                    $("#Title").val("Company");
                    $("#Name1").val("Natsteel holdings");
                    $("#Name2").val("Natsteel holdings");
                    $("#Street").val("Natsteel holdings");
                    $("#HouseNumber").val("22");
                    $("#PostalCode").val("628048");
                    $("#City").val("Singapore");
                    $("#countryLimits").val("SG");
                    $("#countryDesc").val("Company");
                }

                /********************Confirmations****************/
                if (jsonObj.pOCreationcon !== undefined) {
                    $("#confControlLimits").val(jsonObj.pOCreationcon[0].confControl);
                    $("#OrderAck").val(jsonObj.pOCreationcon[0].orderAck);
                    var confirmnReq = jsonObj.pOCreationcon[0].confirmnReq;
                    if (confirmnReq === true) {
                        $("#ConfirmationRequired").prop("checked", true);
                    } else {
                        $("#ConfirmationRequired").prop("checked", false);
                    }
                    var rejectInd = jsonObj.pOCreationcon[0].rejectInd;
                    if (rejectInd === true) {
                        $("#RejectionInd").prop("checked", true);
                    } else {
                        $("#RejectionInd").prop("checked", false);
                    }
                } else {
//                    $("#confControlLimits").val("");
                    var confControl = $("#ConfirmationControlForLine").val();
                    if (confControlPr === "") {
                        $("#confControlLimits").val(confControl);
                    } else {
                        $("#confControlLimits").val(confControlPr);
                    }
                    $("#OrderAck").val("");
                    $("#ConfirmationRequired").prop("checked", false);
                }
                /********************Condition Control****************/
                if (jsonObj.pOCreationcond !== undefined) {
                    var printPrice = jsonObj.pOCreationcond[0].printPrice;
                    if (printPrice === true) {
                        $("#PrintPrice").prop("checked", true);
                    } else {
                        $("#PrintPrice").prop("checked", false);
                    }
                    var estimatedPrice = jsonObj.pOCreationcond[0].estimatedPrice;
                    if (estimatedPrice === true) {
                        $("#EstimatedPrice").prop("checked", true);
                    } else {
                        $("#EstimatedPrice").prop("checked", false);
                    }
                } else {
                    $("#PrintPrice").prop("checked", false);
                    $("#EstimatedPrice").prop("checked", false);
                }

                if (jsonObj.pOCreationMaterial !== undefined) {
                    $("#revisionLevel").val(jsonObj.pOCreationMaterial[0].revisionLevel);
                    $("#vendMatNo").val(jsonObj.pOCreationMaterial[0].vendMatNo);
                    $("#eanUpc").val(jsonObj.pOCreationMaterial[0].eanUpc);
                    $("#vendorSubRange").val(jsonObj.pOCreationMaterial[0].vendorSubrange);
                    $("#batch").val(jsonObj.pOCreationMaterial[0].batch);
                    $("#vendBatch").val(jsonObj.pOCreationMaterial[0].vendorBatch);
                    $("#infoUpdate").val(jsonObj.pOCreationMaterial[0].infoUpdate);
                    $("#mfrPartNo").val(jsonObj.pOCreationMaterial[0].mfrPartNumber);
                    $("#manufacturer").val(jsonObj.pOCreationMaterial[0].manufacturer);
                } else {
                    var mfrPartNo = "";
                    var manufacturer = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var dropDownItemNumber = $("#ItemNumberSelect").val();
                        var prTableItemNumber = $(this).find("td").eq(1).html();
                        if (prTableItemNumber === dropDownItemNumber) {
                            mfrPartNo = $(this).find("td").eq(0).children(".prMfrPartNumber").val();
                            manufacturer = $(this).find("td").eq(0).children(".prManufacturer").val();
                        }
                    });
                    $("#revisionLevel").val("");
                    $("#vendMatNo").val("");
                    $("#eanUpc").val("");
                    $("#vendorSubRange").val("");
                    $("#batch").val("");
                    $("#vendBatch").val("");
                    $("#infoUpdate").val("");
                    $("#mfrPartNo").val(mfrPartNo);
                    $("#manufacturer").val(manufacturer);
                }
            } else if (jsonObj.Result === "NoRecordFound") {

                var confControlPr = "";
                var taxCodePr = "";
                var segmentPr = "";
                $("#OverallLimit").val("");
                $("#ExpectedValue").val("");
                $("#NoLimit").prop("checked", false);
                $("#delivery-tab :input").val("");
                $("#OverdeliveryTolerance").val("0.0");
                $("#UnderdeliveryTolerance").val("0.0");
                if ($("#prType").val() === "Service") {
                    $("#unlimited").prop("checked", true);
                } else if (prType === "Material") {
                    $("#unlimited").prop("checked", false);
                }
                $("#account_assignment-tab :input").val("");
                $("#costCenteraccountAssignmentTebleId").find("tbody tr").remove();
                $("#distribution").val("Single Account Assignment");
                $("#CoCode").val($("#companycodeHeader").val());
                $("#accountAssignmentCategory").val(accountAssignmentCategory);
//                $("#texts-tab :input").val("");
                $("#texts-tab").children("textarea").val("");
                var shortText = "";
                var matcode = "";
                var mfrPartNo = "";
                var manufacturer = "";
                $("#material_headerClass tbody tr").each(function() {
                    var dropDownItemNumber = $("#ItemNumberSelect").val();
                    var prTableItemNumber = $(this).find("td").eq(1).html();
                    if (prTableItemNumber === dropDownItemNumber) {
                        shortText = $(this).find("td").eq(6).children(".prShortText").val();
                        confControlPr = $(this).find("td").eq(0).children(".ConfirmationControlForLineInPr").val();
                        taxCodePr = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
                        segmentPr = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
                        matcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                        mfrPartNo = $(this).find("td").eq(0).children(".prMfrPartNumber").val();
                        manufacturer = $(this).find("td").eq(0).children(".prManufacturer").val();
                    }
                });
                var companycode = $("#companycodeHeader").val();
//                $("#material_headerClass tbody tr").each(function() {
//                    var dropDownItemNumber = $("#ItemNumberSelect").val();
//                    var prTableItemNumber = $(this).find("td").eq(1).html();
//                    if (prTableItemNumber === dropDownItemNumber) {
//                        matcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
//                    }
//                });
                var jsonArr = getMaterialMasterOnLoadInStandalone(matcode, companycode);
                if (jsonArr.length !== 0) {
//                    if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                    populateValueInQuantityWeightsTab(jsonArr);
//                    }
                }

                $("#MaterialPOText").val(shortText);
                $("#Title").val("Company");
                $("#Name1").val("Natsteel Holdings");
                $("#Name2").val("Natsteel Holdings");
                $("#Street").val("22");
                $("#HouseNumber").val("22");
                $("#PostalCode").val("628048");
                $("#City").val("628048");
                $("#countryDesc").val("SG");
                $("#countryLimits").val("SG");
//                $("#confControlLimits").val("");
                var confControl = $("#ConfirmationControlForLine").val();
                if (confControlPr === "") {
                    $("#confControlLimits").val(confControl);
                } else {
                    $("#confControlLimits").val(confControlPr);
                }
                $("#OrderAck").val("");
                $("#ConfirmationRequired").prop("checked", false);
                $("#PrintPrice").prop("checked", false);
                $("#EstimatedPrice").prop("checked", false);
                $("#ProductOriginLine").val("");
                $("#ProductOriginLine").val("");
//                $("#SegmentDescriptionLine").val("");
                var segment = $("#SegmentForLine").val();
                if (segmentPr === "") {
                    $("#SegmentDescriptionLine").val(segment);
                } else {
                    $("#SegmentDescriptionLine").val(segmentPr);
                }

                $("#revisionLevel").val("");
                $("#vendMatNo").val("");
                $("#eanUpc").val("");
                $("#vendorSubRange").val("");
                $("#batch").val("");
                $("#vendBatch").val("");
                $("#infoUpdate").val("");
                $("#mfrPartNo").val(mfrPartNo);
                $("#manufacturer").val(manufacturer);
            }
            var dropDownItemNumber = $("#ItemNumberSelect").val();
//            $("#material_headerClass tbody tr").each(function() {
//                var accAss = "";
//                var itemCat = "";
//                var prTableItemNumber = $(this).find("td").eq(1).html();
//                if (prTableItemNumber === dropDownItemNumber) {
//                    accAss = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
//                    itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
//                    if ((itemCat !== '' && itemCat === 'L') &&
//                            (accAss !== '' && (accAss === 'R' || accAss === 'E' || accAss === 'F' || accAss === 'M' || accAss === 'T')))
//                    {
//                        $("#componentTableIdLineLevel").find("tbody tr:gt(0)").remove();
//                        $("#componentTableIdLineLevel :input").val("");
//                    }
//                }
//            });
        }
    });
    /********************Invoice****************/

    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindInvoiceByLinkid",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var jsonInvoiceArr = $.parseJSON(responseJson.responseText);
            jsonInvoiceArr = JSON.parse(JSON.stringify(jsonInvoiceArr));
            console.log("jsonInvoiceArr in FindInvoiceByLinkid :" + jsonInvoiceArr);
            if (jsonInvoiceArr !== null) {
                var invoiceReceipt = jsonInvoiceArr.invoiceReceipt;
                if (invoiceReceipt === true) {
                    $("#InvoiceReceipt").prop("checked", true);
                } else {
                    $("#InvoiceReceipt").prop("checked", false);
                }
                var finalInvoice = jsonInvoiceArr.finalInvoice;
                if (finalInvoice === true) {
                    $("#FinalInvoice").prop("checked", true);
                } else {
                    $("#FinalInvoice").prop("checked", false);
                }
                var grBased = jsonInvoiceArr.grBasedIV;
                if (grBased === true) {
                    $("#GRBasedIV").prop("checked", true);
                } else {
                    $("#GRBasedIV").prop("checked", false);
                }
                var serviceBasedIV = jsonInvoiceArr.serviceBasedIV;
                if (serviceBasedIV === true) {
                    $("#serviceBasedIV").prop("checked", true);
                } else {
                    $("#serviceBasedIV").prop("checked", false);
                }
                var taxCode = jsonInvoiceArr.taxCode;
                $("#TaxCode").val(taxCode);
            } else {
                $("#FinalInvoice").prop("checked", false);
                $("#GRBasedIV").prop("checked", true);
                var isChecked = $("#PaymentImmediate").prop("checked");
                if (isChecked === true) {
                    $("#TaxCode").val("PN");
                } else {
                    var TexCodeForLine = $("#TexCodeForLine").val();
                    if (taxCodePr === "") {
                        $("#TaxCode").val(TexCodeForLine);
                    } else {
                        $("#TaxCode").val(taxCodePr);
                    }
                }
            }
        }
    });
    return Result;
}

function getServiceByLinkidAndPoId(linkid) {
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getServiceByLinkid",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            var row = "";
            var dropDownItemNumber = "";
            var prTableItemNumber = "";
            var currency = "";
            console.log("jsonArr in getServiceByLinkidAndPoId: " + jsonArr);
            $("#material_headerClass tbody tr").each(function() {
                dropDownItemNumber = $("#ItemNumberSelect").val();
                prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    currency = $(this).find("td").eq(11).children(".currencyClass").val();
                }
            });
            if (jsonArr.length > 0) {
                $("#serviceTableId tbody tr").remove();
                for (var i = 0; i < jsonArr.length; i++) {

                    row += "<tr><td>"
                            + '<input type="checkbox" class=" checkboxServices" id="" name=""><input type="hidden" class="serviceId" value="' + (jsonArr[i].servicesLongTextId === undefined ? '' : jsonArr[i].servicesLongTextId) + '"><input type="hidden" class="saveSarviceAccountAssignment" value="' + (jsonArr[i].isAccountAssignmentSaved === undefined ? '' : jsonArr[i].isAccountAssignmentSaved) + '"><input type="hidden" class="isProfitabilitySegmentDataSaved" value="' + (jsonArr[i].isProfitabilitySegmentSaved === undefined ? '' : jsonArr[i].isProfitabilitySegmentSaved) + '"><input type=hidden class=ServiceAccAssDist value=' + (jsonArr[i].distribution === undefined ? "" : jsonArr[i].distribution) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded lineItemNumberServices tableInputField" disabled="true" int_lastlineitem value=' + (jsonArr[i].lineItemNumber === undefined ? '' : jsonArr[i].lineItemNumber) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded ServicesNumber_Services tableInputField" id="" name="" style="width: 100px;" value=' + (jsonArr[i].serviceNumber === undefined ? '' : jsonArr[i].serviceNumber) + '>' + "</td><td style='text-align: center'>"
                            + '<input type="hidden" class="form-control form-rounded shortText_Services tableInputField" id="" style="width: 150px;display: inline-block;" name="" readonly value="Short text...">' + " <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td><td>"
                            + '<input type="text" class="form-control form-rounded check-negative-value quantity_Services tableInputField" min="0" style="width:150px;" id="" name="" value=' + (jsonArr[i].quantity === undefined ? '' : formatNumberByComma(jsonArr[i].quantity)) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded servicesUnit_Services tableInputField" style="width:70px;" id="" name="" value=' + (jsonArr[i].unit === undefined ? '' : jsonArr[i].unit) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded check-negative-value grossPrice_Services tableInputField" style="width:150px;" min="0" id="" name="" value=' + (jsonArr[i].grossPrice === undefined ? '' : formatAmountByComma(jsonArr[i].grossPrice)) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded currency_Services tableInputField" id="" name="" style="width: 55px;" value=' + (jsonArr[i].currency === undefined ? '' : jsonArr[i].currency) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded netPrice_Services tableInputField" disabled id="" name="" style="width:150px;" value=' + (jsonArr[i].netPrice === undefined ? '' : formatAmountByComma(jsonArr[i].netPrice)) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded edition_Services tableInputField" id="" style="width:100px;" name="" value=' + (jsonArr[i].edition === undefined ? '' : jsonArr[i].edition) + '>' + "</td><td style='text-align: center'>"
                            + '<input type="hidden" class="form-control form-rounded lineItemLongText_Services tableInputField" id="" name="" style="width: 150px;display: inline-block;" readonly value="Line item long text...">' + " <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td><td>"
                            + '<input type="text" class="form-control form-rounded overfTolerance_Services tableInputField" id="" name="" value=' + (jsonArr[i].overfTolerance === undefined ? '' : jsonArr[i].overfTolerance) + '>' + "</td><td>"
                            + '<input type="text" class="form-control form-rounded serviceNetValue tableInputField" style="width:150px;" disabled value=' + (jsonArr[i].netValue === undefined ? '' : formatAmountByComma(jsonArr[i].netValue)) + '>' + "</td><td>"
                            + '<input type="number" class="form-control form-rounded serviceActualQty tableInputField" disabled value=' + (jsonArr[i].actualQuantity === undefined ? '' : jsonArr[i].actualQuantity) + '>' + "</td><td style='text-align: center'>"
                            + '<input type="hidden" class="form-control form-rounded serviceText tableInputField" style="width: 150px;display: inline-block;" readonly value="Service text...">' + " <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td><td>"
//                            + '<input type="text" class="form-control form-rounded serviceLineText tableInputField" style="width:150px;" value=' + (jsonArr[i].lineText === undefined ? '' : jsonArr[i].lineText) + '>' + "</td><td>"
                            + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteServiceTebleRow" aria-hidden="true" style="width:10px;"></i>' + "</td></tr>";
                }
                $("#serviceTableId tbody").append(row);
            }
            else {
                ifServiceIsEmpty(currency);
            }
        }
    });
}

function getComponentByLinkId(linkid) {
    console.log("getComponentByLinkId: ");
    var matcode = "";
    var desc = "";
    var plantcode = "";
    var uom = "";
    var stLoc = "";
    var itemnumber = "";
    var requisitionDate = "";
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            matcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            desc = $(this).find("td").eq(6).children(".prShortText").val();
            plantcode = $(this).find("td").eq(16).children(".plantClass").val();
            uom = $(this).find("td").eq(31).children(".prUom").val();
            stLoc = $(this).find("td").eq(20).children(".storageLocationClass").val();
            itemnumber = $(this).find("td").eq(1).text();
            requisitionDate = $(this).find("td").eq(14).children(".requisitionDateClass").val();
        }
    });
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getNGBPCmplxPOCreationLineItemComponentByLinkId",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            var row = "";
            console.log("jsonArr.length: " + jsonArr.length);
            if (jsonArr.length > 0) {
                console.log("%cComponent found in DB!", "color: green");
                $("#componentTableIdLineLevel tbody tr").remove();
                for (var i = 0; i < jsonArr.length; i++) {
                    var materialcode = jsonArr[i].materialCode === undefined ? '' : jsonArr[i].materialCode;
                    var description = jsonArr[i].description === undefined ? '' : jsonArr[i].description;
                    var plant = jsonArr[i].plant === undefined ? '' : jsonArr[i].plant;
                    var unit = jsonArr[i].unit === undefined ? '' : jsonArr[i].unit;
                    var quantity = jsonArr[i].quantity === undefined ? '' : jsonArr[i].quantity;
                    var prodStLoc = jsonArr[i].productStorageLocation === undefined ? '' : jsonArr[i].productStorageLocation;
                    var supplyArea = jsonArr[i].supplyArea === undefined ? '' : jsonArr[i].supplyArea;
                    var reqDate = jsonArr[i].requirementDate === undefined ? '' : jsonArr[i].requirementDate;
                    var qtyIsFixed = jsonArr[i].qtyIsFixed === undefined ? '' : jsonArr[i].qtyIsFixed;
                    var latestRequirementDate = jsonArr[i].latestRequirementDate === undefined ? '' : jsonArr[i].latestRequirementDate;
                    var distributionKey = jsonArr[i].distributionKey === undefined ? '' : jsonArr[i].distributionKey;
                    var batch = jsonArr[i].batch === undefined ? '' : jsonArr[i].batch;
                    var storageLocation = jsonArr[i].storageLocation === undefined ? '' : jsonArr[i].storageLocation;
                    var prItemNumber = jsonArr[i].prItemNumber === undefined ? '' : jsonArr[i].prItemNumber;
                    row = "<tr>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comMaterial" style="width:100px;" value="' + materialcode + '">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comDescription" style="width:200px;" value="' + description + '">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comPlant" style="width:100px;" value="' + plant + '" style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comUnit" style="width:100px;" value="' + unit + '" style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comQuantity" value="' + formatNumberByComma(quantity) + '" style="width:150px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comProdStorageLoc" value="' + prodStLoc + '" style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comSupplyArea" value="' + supplyArea + '" style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" class="comRequirementDate" value="' + reqDate + '" disabled style="width:150px;"><input type="hidden" class="reqDatepicker">' + "</td>\n\\n\
                            <td>" + '<input type="number" class="form-control form-rounded input-height qtyIsFixed" value="' + qtyIsFixed + '">' + "</td>\n\
                            <td>" + '<input type="text" class="latReqDate" style="width:150px;" value="' + latestRequirementDate + '" disabled> <input type="hidden" class="latReqDatepicker">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height distKey" style="width:100px;" value="' + distributionKey + '">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height itemNumber" value="' + prItemNumber + '" disabled style="width:100px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded input-height comBatch" style="width:100px;" value="' + batch + '">' + "</td>\n\
                            <td>" + "</td>\n\
                    </tr>";
                    $("#componentTableIdLineLevel tbody").append(row);
                }
            } else {
                console.log("%cComponent not found in DB!", "color: red");
                $("#componentTableIdLineLevel tbody tr").remove();
                var row = "";
                row = "<tr><td>"
                        + '<input type="text" class="form-control form-rounded input-height comMaterial" style="width:100px;" value="' + matcode + '" max="">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height comDescription" style="width:200px;" value="' + desc + '" max="">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height comPlant" style="width:100px;" value="' + plantcode + '">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height comUnit" style="width:100px;" value="' + uom + '">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height comQuantity" value="" style="width:150px;">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height comProdStorageLoc" value="' + stLoc + '" style="width:100px;">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height comSupplyArea" value="" style="width:100px;">' + "</td><td>"
                        + '<input type="text" class="comRequirementDate" value="' + requisitionDate + '" disabled style="width:150px;"> <input type="hidden" class="reqDatepicker">' + "</td><td>"
                        + '<input type="number" class="form-control form-rounded input-height qtyIsFixed" value="" style="width:100px;">' + "</td><td>"
                        + '<input type="text" class="latReqDate" style="width:150px;" value=' + requisitionDate + ' disabled> <input type="hidden" class="latReqDatepicker">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height distKey" style="width:100px;" value="">' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height itemNumber" style="width:100px;" value="' + itemnumber + '" disabled>' + "</td><td>"
                        + '<input type="text" class="form-control form-rounded input-height comBatch" style="width:100px;" value="">' + "</td><td>"
                        + '<i title="Delete Row" class="fa fa-window-close btn-lg componentDeleteTebleRow" aria-hidden="true" style="width:10px;padding;float:right;: 0px 8px;"></i>'
                        + "</td></tr>";
                $("#componentTableIdLineLevel tbody").append(row);
            }

            $('.latReqDatepicker').each(function() {
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
            $('.reqDatepicker').each(function() {
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
    });
}

function getDeliveryScheduleByLinkId(linkid) {
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getDeliveryScheduleByLinkId",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            if (obj.jArraDeliverySchedule.length !== 0) {
                var row = "";
                $("#DeliveryScheduleTableId tbody tr").remove();
                for (var i = 0; i < obj.jArraDeliverySchedule.length; i++) {
                    var deliveryDate = obj.jArraDeliverySchedule[i].DELIVERY_DATE === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE;
                    console.log("deliveryDate on itemnumnerselect change:" + deliveryDate);
                    var deliDateCat = obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT;
                    var purReqNumber = obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER;
                    var reqItemNumber = obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER;
                    var scheduledQuantity = obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY;
                    var time = obj.jArraDeliverySchedule[i].TIME === undefined ? '' : obj.jArraDeliverySchedule[i].TIME;
                    var stDelDate = obj.jArraDeliverySchedule[i].stDelDate === undefined ? '' : obj.jArraDeliverySchedule[i].stDelDate;
                    var grQty = obj.jArraDeliverySchedule[i].GR_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].GR_QUANTITY;
                    var openQty = obj.jArraDeliverySchedule[i].OPEN_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].OPEN_QUANTITY;
                    var schLine = obj.jArraDeliverySchedule[i].SCH_LINE === undefined ? '' : obj.jArraDeliverySchedule[i].SCH_LINE;
                    if (i === 0) {
                        row += "<tr><td>" + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" value="' + deliDateCat + '">' + "</td>\n\
                            <td>" + '<input readonly type="text" class="deliveryDateClass" style="width:150px;" value="' + deliveryDate + '"> <input type="hidden" class="delvSchDeliveryDatepicker">' + "</td>\n\
                            <td>" + '<input readonly type="text" class="statistialDeliveryDate" style="width:150px;" value="' + stDelDate + '"> <input type="hidden" class="statistialDeliveryDatepicker">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" value="' + formatNumberByComma(scheduledQuantity) + '" style="width:150px;">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" value="' + time + '">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" name="prNumberDeliveryScheduled" disabled value=' + purReqNumber + '>' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" name="reqItemNumber" disabled>' + "</td>\n\
                            <td>" + '<input type="number" class="form-control form-rounded tableInputField gRQuantityClass" value="' + grQty + '">' + "</td>\n\
                            <td>" + '<input type="number" class="form-control form-rounded tableInputField openQuantityClass" value="' + openQty + '">' + "</td>\n\
                            <td>" + '<input type="text" class="form-control form-rounded tableInputField schLineClass" value="' + schLine + '" readonly>' + "</td>\n\
                            <td></td>\n\
                    </tr>";
                    }
                    else {
                        row += "<tr><td>" + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" value="' + deliDateCat + '">' + "</td>\n\
                                <td>" + '<input readonly type="text" class="deliveryDateClass" style="width:150px;" value="' + deliveryDate + '"> <input type="hidden" class="delvSchDeliveryDatepicker">' + "</td>\n\\n\
                                <td>" + '<input readonly type="text" class="statistialDeliveryDate" style="width:150px;" value="' + stDelDate + '"> <input type="hidden" class="statistialDeliveryDatepicker">' + "</td>\n\\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" id="scheduledQuantity" value="' + formatNumberByComma(scheduledQuantity) + '" style="width:150px;">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" value="' + time + '">' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" value="' + purReqNumber + '" readonly>' + "</td>\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" readonly>' + "</td>\n\\n\
                                <td>" + '<input type="number" class="form-control form-rounded tableInputField gRQuantityClass" value="' + grQty + '" disabled>' + "</td>\n\\n\
                                <td>" + '<input type="number" class="form-control form-rounded tableInputField openQuantityClass" value="' + openQty + '" disabled>' + "</td>\n\\n\
                                <td>" + '<input type="text" class="form-control form-rounded tableInputField schLineClass" value="' + schLine + '" disabled>' + "</td>\n\
                                <td style='width:0px;'>" + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>' + "</td>\n\
                    </tr>";
                    }
                }
                $("#DeliveryScheduleTableId tbody").append(row);

                if ($("#prType").val() === "Material") {
                    $('.delvSchDeliveryDatepicker').each(function() {
                        $(this).datepicker({
                            showOn: "button",
                            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                            minDate: 0,
                            changeMonth: true,
                            changeYear: true,
                            yearRange: '2020:2050',
                            showWeek: true
                        });
                    });
                    $('.statistialDeliveryDatepicker').each(function() {
                        $(this).datepicker({
                            showOn: "button",
                            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                            minDate: 0,
                            changeMonth: true,
                            changeYear: true,
                            yearRange: '2020:2050',
                            showWeek: true
                        });
                    });
                } else if ($("#prType").val() === "Service") {
                    $('.delvSchDeliveryDatepicker').each(function() {
                        $(this).datepicker({
                            showOn: "button",
                            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                            changeMonth: true,
                            changeYear: true,
                            yearRange: '2020:2050',
                            showWeek: true
                        });
                    });
                    $('.statistialDeliveryDatepicker').each(function() {
                        $(this).datepicker({
                            showOn: "button",
                            buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                            changeMonth: true,
                            changeYear: true,
                            yearRange: '2020:2050',
                            showWeek: true
                        });
                    });
                }
            } else {
                ifDeliveryScheduleIsEmpty();
            }
        }
    });
}

function getConditionsByLinkId(linkid, isLineLevelDataSavedSaved) {

    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getConditionsByLinkId",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            var row = "";
            if (jsonArr.length > 0 && isLineLevelDataSavedSaved === "Yes") {
                $("#conditionTableIdLineLevel tbody tr").remove();
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor'><input type='hidden' class='lineAddedFromLineLevel' value='" + (jsonArr[i].addedFrom === undefined ? '' : jsonArr[i].addedFrom) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' readonly = 'true' value='" + (jsonArr[i].condType === undefined ? '' : jsonArr[i].condType) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded nameConditionsLineLevel tableInputField' style='width:200px;' name='nameConditionsLineLevel' readonly = 'true' value='" + (jsonArr[i].condName === undefined ? '' : jsonArr[i].condName) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded AmountLineLevel tableInputField' style='width:150px;' name='AmountLineLevel' value='" + (jsonArr[i].amount === undefined ? '' : formatAmountByComma(jsonArr[i].amount)) + "'><input type='hidden' class='AmountLineLevelHidden'></td>"
                            + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' value='" + (jsonArr[i].currency === undefined ? '' : jsonArr[i].currency) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' style='width:150px;' name='PerQuantityLineLavel' value='" + (jsonArr[i].perQuantity === undefined ? '' : formatAmountByComma(jsonArr[i].perQuantity)) + "'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' disabled value='" + (jsonArr[i].condPricUnit === undefined ? '' : jsonArr[i].condPricUnit) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' style='width:50px;' name='UoMLineLevel' disabled value='" + (jsonArr[i].uoM === undefined ? '' : jsonArr[i].uoM) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel disabled tableInputField' style='width: 150px;' disabled name='ConditionValueLineLevel' value='" + (jsonArr[i].condVal === undefined ? '' : formatAmountByComma(jsonArr[i].condVal)) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' disabled = 'true' value='" + (jsonArr[i].currency1 === undefined ? '' : jsonArr[i].currency1) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' disabled='true' value='" + (jsonArr[i].condVal1 === undefined ? '' : jsonArr[i].condVal1) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled='true' value='" + (jsonArr[i].condCrncy === undefined ? '' : jsonArr[i].condCrncy) + "'></td>"
                            + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel' value='" + (jsonArr[i].ngStatus) + "' readonly></td>"
                            + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' min='0' name='numeratorLineLevel' value='" + (jsonArr[i].numerator === undefined ? '' : jsonArr[i].numerator) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' name='baseUoMLineLevel' value='" + (jsonArr[i].baseUOM === undefined ? '' : jsonArr[i].baseUOM) + "'></td>"
                            + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' min='0' name='denoForConvLineLevel' value='" + (jsonArr[i].denominatorforconv === undefined ? '' : jsonArr[i].denominatorforconv) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' name='uOMExtraLineLevel' value='" + (jsonArr[i].uomextra === undefined ? '' : jsonArr[i].uomextra) + "'></td>"
                            + "<td><input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + (jsonArr[i].kvsl1 === undefined ? '' : jsonArr[i].kvsl1) + "'>\n\
                                   <input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + (jsonArr[i].kvsl2 === undefined ? '' : jsonArr[i].kvsl2) + "'>\n\
                                   <input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + (jsonArr[i].kappl === undefined ? '' : jsonArr[i].kappl) + "'>\n\
                                   <input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + (jsonArr[i].conditionCount === undefined ? '' : jsonArr[i].conditionCount) + "'>\n\
                                   <input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + (jsonArr[i].stNumber === undefined ? '' : jsonArr[i].stNumber) + "'>\n\
                                   <input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='" + (jsonArr[i].changeId === undefined ? '' : jsonArr[i].changeId) + "'>\n\
                                    <i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRowLineLevel' aria-hidden='true' style='width:30px;display:none;'></i></td>"
//                            + "<td></td>"
                            + "</tr>";
                }
                $("#conditionTableIdLineLevel tbody").append(row);
                var conType;
                var conCurr1;
                var currencyHeader = $("#CurrencyDeliveryInvoice").val();
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    conType = $(this).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").val();
                    conCurr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                    var status = $(this).find("td").eq(12).children(".statusLineLevel").val();
                    if (conType === "NAVS" || conType === "JEXS" || conType === "ZNAV") {
                        $(this).find("td input").prop("disabled", true);
                        $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop('disabled', false);
                        $(this).find("td").eq(12).children(".statusLineLevel").prop('disabled', false);
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").prop('disabled', false);
                    }
                    if (conType === "NAVM") {
                        $(this).find("td input").prop("disabled", true);
                        $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop('disabled', false);
                        $(this).find("td").eq(12).children(".statusLineLevel").prop('disabled', false);
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").prop('disabled', false);
                        $(this).find("td").eq(3).children(".AmountLineLevel").prop("disabled", true);
                        $(this).find("td").eq(5).children(".PerQuantityLineLavel").prop("disabled", true);
                    }
                    if (conType === "") {
                        $(this).find("td input").prop("disabled", true);
//                        $(this).find("td").eq(3).children("input[name=AmountLineLevel]").prop("readonly", true);
//                        $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").prop("readonly", true);
//                        $(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").prop("readonly", true);
//                        $(this).find("td").eq(4).children(".CurrencyLineLevel").prop("readonly", true);
                    }
                    if (conCurr1 !== "%") {
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").val(currencyHeader);
                    }
                    if (conCurr1 === "%") {
                        $(this).find("td").eq(4).children(".CurrencyLineLevel").prop("disabled", true);
                    }

                    if (status === 'True') {
                        $(this).find("td").eq(12).children(".statusLineLevel").prop("checked", true);
                    }
                });
            } else {
                ifConditionIsEmpty();
                if (conditionLineLevelArraySA.length !== 0) {
                    addTOLineConditionOnItemChangeInStandAlone();
                    deleteRowFormConditionInStandAlone("");
                }
            }
            var conType;
            var changeid;
            for (var i = 0; i < conditionLineLevelArraySA.length; i++) {
                console.log("Find BITTU conditionLineLevelArraySA[" + i + "]" + conditionLineLevelArraySA[i].Ctype);
                var rows = $("#conditionTableIdLineLevel tbody tr");
                for (var j = 0; j < rows.length; j++) {
                    conType = $(rows[j]).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                    changeid = $(rows[j]).find("td").eq(17).children(".conditionChangeId").val();
                    if (conType === conditionLineLevelArraySA[i].Ctype && changeid === conditionLineLevelArraySA[i].CHANGEID) {
                        console.log("Inside for loop");
                        $(rows[j]).find("td").eq(17).children(".deleteConditionTebleRowLineLevel").css("display", "block");
                        $(rows[j]).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").prop("readonly", false);
                    }
                }
            }
            var rows = $("#conditionTableIdLineLevel tbody tr");
            for (var j = 0; j < rows.length; j++) {
                var changeid = $(rows[j]).find("td").eq(17).children(".conditionChangeId").val();
                if (changeid === "I") {
                    $(rows[j]).find("td").eq(17).children(".deleteConditionTebleRowLineLevel").css("display", "block");
//                    $(rows[j]).find("td").eq(1).children(".ConditionTypeLineLevel").prop("disabled", false);
                    $(rows[j]).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").prop("readonly", false);
                }
                var addedFrom = $(rows[j]).find("td").eq(0).children(".lineAddedFromLineLevel").val();
                if (addedFrom === "headerlevel") {
                    $(rows[j]).find("td").eq(17).children(".deleteConditionTebleRowLineLevel").css("display", 'none');
                }
            }
            /*SUNNY KUMAr PRAJAPATI CODE START*/



            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var addedFrom = $(this).find("td").eq(0).children(".lineAddedFromLineLevel").val();
                if (addedFrom === "headerlevel") {
                    $(this).find("td input").prop("disabled", true);
                }
            });
            /*SUNNY KUMAr PRAJAPATI CODE END*/
        }
    });
}

function clearAllLineLevelFields() {


    /*Clear Service Tab Start*/
    $("#serviceTableId").find("tbody tr:gt(0)").remove();
    $("#serviceTableId :input").val("");
    $(".lineItemNumberServices").val("10");
    $('#accountAssignmentForm').trigger("reset"); // Clear Service Account Assignment form data
    $('#ServiceAccountAssignmentForm').trigger("reset");
    //                        $("#serviceTabAccAsgnTebleId :input").val("");
    $("#serviceTabAccAsgnTebleId").find("tbody tr").remove(); // Delete all rows of Service Account Assignment
    /*Clear Service Tab End*/

    /*Clear Limit Tab Start*/
    $("#OverallLimit").val("");
    $("#ExpectedValue").val("");
    $("#NoLimit").prop("checked", false);
    $("#limitAccountAsgn").css("display", "none");
    $('#limitsAccountAssignmentForm').trigger("reset");
    $('#limitAccountAssignmentTableModal').trigger("reset");
    $("#limitTabAccAsgnTebleId").find("tbody tr").remove();
    /*Clear Limit Tab End*/

    /*Clear QuantityDates Tab Start*/
    $("#quantities-tab :input").val("");
    /*Clear QuantityDates Tab End*/

    /*Clear Delivery Schedule Tab Start*/
    $("#DeliveryScheduleTableId").find("tbody tr:gt(0)").remove();
    $("#DeliveryScheduleTableId :input").val("");
    /*Clear Delivery Schedule Tab End*/

    /*Clear Delivery Tab Start*/
    $("#delivery-tab :input").val("");
    $("#saveDeliveryBtn").val("Save");
    var prType = $("#prType").val();
    if (prType === "Service") {
        $("#unlimited").prop("checked", true);
    } else if (prType === "Material") {
        $("#unlimited").prop("checked", false);
    }
    /*Clear Delivery Tab End*/

    /*Clear Invoice Tab Start*/
    $("#invoice-tab :input, select").val("");
    $("#InvoiceReceipt").prop("checked", true);
    $("#FinalInvoice").prop("checked", false);
    $("#GRBasedIV").prop("checked", false);
    $("#serviceBasedIV").prop("checked", true);
    /*Clear Invoice Tab End*/

    /*Clear Condition Tab Start*/
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        $(this).find("td :input").eq(3).val("");
        $(this).find("td :input").eq(4).val("");
        $(this).find("td :input").eq(5).val("");
        $(this).find("td :input").eq(7).val("");
        $(this).find("td :input").eq(8).val("");
        $(this).find("td :input").eq(12).val("");
    });
    /*Clear Condition Tab End*/

    /*Clear AccountAssignment Tab Start*/
    $("#account_assignment-tab :input").val("");
    $("#costCenteraccountAssignmentTebleId").find("tbody tr:gt(0)").remove();
    //                         $("#costCenteraccountAssignmentTebleId :input").val("");
    /*Clear AccountAssignment Tab End*/

    /*Clear Text Tab Start*/
//    $("#texts-tab :input").val("");
    $("#texts-tab").children("textarea").val("");
    /*Clear Text Tab End*/

    /*Clear delivery Adddress Tab Start*/
    $("#Title").val("Company");
    $("#Name1").val("Natsteel Holdings");
    $("#Name2").val("Natsteel Holdings");
    $("#Street").val("22");
    $("#HouseNumber").val("22");
    $("#PostalCode").val("628048");
    $("#City").val("628048");
    $("#countryDesc").val("SG");
    $("#countryLimits").val("SG");
    /*Clear delivery Adddress Tab End*/

    /*Clear Confirmations Tab Start*/
    $("#confControlLimits").val("Select");
    $("#OrderAck").val("");
    $("#ConfirmationRequired").prop("checked", false);
    /*Clear Confirmations Tab End*/

    /*Clear Condition Condtrol Tab Start*/
    $("#PrintPrice").prop("checked", false);
    $("#EstimatedPrice").prop("checked", false);
    /*Clear Condition Control Tab End*/

    /*Clear Customer Data Tab Start*/
    $("#ProductOriginLine").val("");
    //                        $("#SegmentDescriptionLine").val("Select");

    /*Clear Customer Data Tab End*/

    /*Clear Header text Tab Start*/
//    $("#headerText_linelevel-tab :input").val("");
    $("#saveHeaderTextBtn").val("Save");
    /*Clear Header Text Tab End*/

    /*Clear Component Tab Start*/
    $("#componentTableIdLineLevel").find("tbody tr:gt(0)").remove();
    $("#componentTableIdLineLevel :input").val("");
    /*Clear Component Tab End*/
}
function getPONumber(id) {
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getPONumber",
            "id": id.toString().trim()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("POnumber :" + obj.PONUMBER);
            var reqFrom = $("#reqDataSavedOnPoNumer").val();
            if (reqFrom === "FromPONumber") {
//                $("#overlay").css("display", "none");
            } else {
                if (obj.PONUMBER !== undefined) {
                    Lobibox.alert("success", {
                        msg: "Data saved successfully.<br>Temporary PO Number is <b>" + obj.PONUMBER + "</b>"
                    });
                } else if (obj.PONUMBER === undefined) {
                    Lobibox.alert("success", {
                        msg: "Data updated successfully."
                    });
                }
                if (obj.PONUMBER !== "") {
                    $("#saveLineItemData").prop("disabled", false);
                }
                $("#overlay").css("display", "none");
            }
        }
    });
}
function calulateDeliveryDate(currentPrLineRow, code)
{
    console.log("MaterialCode: " + code);
    console.log("currentPrLineRow: " + currentPrLineRow);
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindPlanDelvTimeByMaterialCode",
            "materialCode": code
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var PlannedDelvTime = obj.PlannedDelvTime;
            console.log("PlannedDelvTime: " + PlannedDelvTime);
//            $("#PlannedDelvTime").val(PlannedDelvTime);

            if (PlannedDelvTime !== "PlannedDelvTimeIsNullOrEmpty" && PlannedDelvTime !== "NoTimeFound")
            {
                var currentDateAfterAddingPlanDelvTime = obj.currentDateAfterAddingPlanDelvTime;
                console.log("currentDateAfterAddingPlanDelvTime: " + currentDateAfterAddingPlanDelvTime);
                var dateArr = currentDateAfterAddingPlanDelvTime.toString().split("-");
                var delvDate = dateArr[2] + "." + dateArr[1] + "." + dateArr[0];
                console.log("delvDate: " + delvDate);
                currentPrLineRow.find("td").eq(15).children(".deliveryDateClass").val(delvDate);
                $("#DeliveryScheduleTableId tbody tr").each(function() {
                    $(this).find("td").eq(1).children(".deliveryDateClass").val(delvDate);
                });
                $("#PlDeliveryTime").val(PlannedDelvTime);
            }
        }
    });
}

function getAllByPricingProcedure(pricingprocedure) {
    var currencyHeader = $("#CurrencyDeliveryInvoice").val();
    var CompanyCode = $("#companycodeHeader").val();
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
            var row = "";
            var tdrow = "";
            var uom;
            var materialcode = "";
            var opu;
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    uom = $(this).find("td").eq(31).children(".prUom").val();
                    materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                    opu = $(this).find("td").eq(12).children(".prOrderPriceUnit").val();
                }
            });
            var prType = $("#prType").val();
            console.log("prType: " + prType);
            if (prType === "Service")
            {
                uom = "AU";
            }
            var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
            var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
            $("#conditionTableIdLineLevel tbody tr").remove();
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor' value='" + vendorcode + "'><input type='hidden' class='lineAddedFromLineLevel' value='linelevel'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' readonly = 'true' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded nameConditionsLineLevel tableInputField' style='width:200px;' name='nameConditionsLineLevel' readonly = 'true' value='" + obj[i].NAME + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded AmountLineLevel tableInputField'style='width:150px;' name='AmountLineLevel'><input type='hidden' class='AmountLineLevelHidden'></td>"
                        + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' value=" + obj[i].CRCY + "></td>"
                        + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' style='width:150px;' name='PerQuantityLineLavel'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' disabled value=" + (uom === undefined ? '' : uom) + "></td>"
                        + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' style='width:100px;' disabled value=" + (uom === undefined ? '' : uom) + "></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width: 150px;' disabled></td>"
                        + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' style='width:100px;' readonly = 'true' value='" + obj[i].CURRENCY2 + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' style='width:100px;' disabled='true'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled='true'></td>"
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
//                        + "<td></td>"
                        + "</tr>";
            }
            $("#conditionTableIdLineLevel tbody").append(row);
            var PrType = $("#prType").val();
            if (PrType === "Material") {
                var jsonArr = getMaterialMasterOnLoadInStandalone(materialcode, CompanyCode);
                if (jsonArr.length !== 0) {
                    var infoRecordJsonObj = fetchInfoRecordDetails(materialcode);
                    var convTo = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArr[0].conversionTo : infoRecordJsonObj.CONV_NUM1;
                    var convFrom = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArr[0].conversionFrom : infoRecordJsonObj.CONV_DEN1;
                    uom = infoRecordJsonObj.PO_UNIT === "" || infoRecordJsonObj.PO_UNIT === undefined ? uom : infoRecordJsonObj.PO_UNIT;
                    opu = infoRecordJsonObj.ORDERPR_UN === "" || infoRecordJsonObj.ORDERPR_UN === undefined ? opu : infoRecordJsonObj.ORDERPR_UN;
                    if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                        $("#conditionTableIdLineLevel tbody tr").each(function() {
                            $(this).find("td").eq(13).children(".numeratorLineLevel").val(convTo);
                            $(this).find("td").eq(14).children(".baseUoMLineLevel").val(uom);
                            $(this).find("td").eq(15).children(".denoForConvLineLevel").val(convFrom);
                            $(this).find("td").eq(16).children(".uOMExtraLineLevel").val(opu);
                        });
                    }
                }
            }
            updateConditionTableOnOPUChangeInSA(opu);
            var isConditionPopulateInHeader = $("#isConditionPopulateInHeader").val();
            var conditionHeaderReqFrom = $("#conditionHeaderReqFrom").val();
            console.log("isConditionPopulateInHeader :" + isConditionPopulateInHeader);
            if (isConditionPopulateInHeader === "No" && conditionHeaderReqFrom === "VendorChange") {
                addRowInConditionTableInHeader(obj, uom, currencyHeader);
                $("#conditionHeaderReqFrom").val("");
            }

            var conType;
            var conCurr1;
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                conType = $(this).find("td").eq(1).children("input[name=ConditionTypeLineLevel]").val();
                conCurr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
                if (conType === "NAVS" || conType === "JEXS" || conType === "ZNAV") {
                    $(this).find("td input").prop("disabled", true);
                    $(this).find("td").eq(0).children(".checkConditionTableRowLineLevel").prop('disabled', false);
                    $(this).find("td").eq(12).children(".statusLineLevel").prop('disabled', false);
                    $(this).find("td").eq(4).children(".CurrencyLineLevel").prop('disabled', false);
                }
                if (conType === "NAVM") {
                    $(this).find("td").eq(3).children(".AmountLineLevel").prop("disabled", true);
                    $(this).find("td").eq(5).children(".PerQuantityLineLavel").prop("disabled", true);
                }
                if (conType === "") {
                    $(this).find("td input").prop("disabled", true);
//                    $(this).find("td").eq(3).children("input[name=AmountLineLevel]").prop("readonly", true);
//                    $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").prop("readonly", true);
//                    $(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").prop("readonly", true);
//                    $(this).find("td").eq(12).children(".statusLineLevel").prop('disabled', true);
                }
                if (conCurr1 !== "%") {
                    $(this).find("td").eq(4).children(".CurrencyLineLevel").val(currencyHeader);
                }
                if (conCurr1 === "%") {
                    $(this).find("td").eq(4).children(".CurrencyLineLevel").prop("disabled", true);
                }
            });
            Lobibox.notify("success", {
                rounded: true,
                delayIndicator: false,
                msg: "Conditions fetched successfully!"
            });
            $("#overlay").css("display", "none");
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
                window['socket_' + obj[i].ALIAS] = obj[i].RULES;
            }
        }
    });
}

function addRowInConditionTableInHeader(obj, uom, currencyHeader) {
    var creat_Edit = $("#creat_Edit").val();
    /*Code by BITTU Today*/
    if (creat_Edit === "edit") {
        var prCurrency;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                prCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
            }
        });
        $("#conditionTableId tbody tr").each(function() {
            var currency = $(this).find("td").eq(4).children(".CurrencyHeader").val();
            console.log("condition Currency :" + currency);
            if (currency !== "%") {
                $(this).find("td").eq(4).children(".CurrencyHeader").val(prCurrency);
            } else {
                $(this).find("td").eq(4).children(".CurrencyHeader").val("%");
            }
        });
    }
    $("#conditionTableId tbody tr").remove();
    var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
    var tdrow = "";
    for (var i = 0; i < obj.length; i++) {
        tdrow += "<tr>"
                + "<td>\n\
                <input type='hidden' class='conditionVendorHeader' value='" + vendorcode + "'>\n\
                <input type='checkbox' name='checkConditionTableRow' class='checkConditionTableRow'>\n\
                <input type='hidden' class='lineAddedFromHeader' value='headerlevel'>\n\
                <input type='hidden' class='conditionindex' value=''></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' style='width:100px;' name='ConditionTypeHeader' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' style='width:200px;' name='nameConditionsHeader' value='" + (obj[i].NAME === undefined ? '' : obj[i].NAME) + "' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' style='width:150px;' name='AmountHeader' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' style='width:100px;' name='CurrencyHeader' value='" + (obj[i].CRCY === undefined ? '' : obj[i].CRCY) + "' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' style='width:150px;' name='PerQuantityHeader' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' style='width:100px;' value='" + (uom === undefined ? '' : uom) + "' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' style='width:150px;' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' style='width:100px;' value='" + (obj[i].CURRENCY2 === undefined ? '' : obj[i].CURRENCY2) + "' disabled></td>"
                + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' style='width:100px;' disabled='true'></td>"
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
                                <input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='\n\'></td>"
                + "<td></td>"
                + "</tr>";
    }
    $("#conditionTableId tbody").append(tdrow);
    $("#conditionTableId tbody tr").each(function() {
        var currency = $(this).find("td").eq(4).children(".CurrencyHeader").val();
        console.log("condition Currency :" + currency);
        if (currency !== "%") {
            $(this).find("td").eq(4).children(".CurrencyHeader").val(currencyHeader);
        } else {
            $(this).find("td").eq(4).children(".CurrencyHeader").val("%");
        }
    });
}

function ifDeliveryScheduleIsEmpty() {
    var delDateCat = "";
    var itemNumber = "";
    var quantity = "";
    var delDate = "";
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            delDate = $(this).find("td").eq(15).children(".deliveryDateClass").val();
            delDateCat = $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val();
            itemNumber = $(this).find("td").eq(1).text();
            quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
        }
    });
    console.log("delDate: " + delDate);
    if (delDateCat === "") {
        delDateCat = "D";
    }
    if (quantity === "") {
        quantity = "1";
    }
    var current_datetime = new Date();
    var day = current_datetime.getDate();
    var mon = current_datetime.getMonth() + 1;
    if (Number(day) < 10)
    {
        day = "0" + day;
    }
    if (Number(mon) < 10)
    {
        mon = "0" + mon;
    }
//    var formatted_date = current_datetime.getFullYear() + "-" + mon + "-" + day;
    var formatted_date = day + "." + mon + "." + current_datetime.getFullYear();
    $("#DeliveryScheduleTableId tbody tr").remove();
    var row = "";
    row = "<tr><td>"
            + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" name="" value=' + delDateCat + '>' + "</td><td>"
            + '<input readonly type="text" class="deliveryDateClass" style="width:150px;" value=' + delDate + '> <input type="hidden" class="delvSchDeliveryDatepicker">' + "</td><td>"
            + '<input readonly type="text" class="statistialDeliveryDate" style="width:150px;" value=' + formatted_date + '> <input type="hidden" class="statistialDeliveryDatepicker">' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" value="' + formatNumberByComma(quantity) + '" id="scheduledQuantity" name="scheduledQuantity" style="width:150px;">' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" name="timeDeliveryScheduled">' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" name="prNumberDeliveryScheduled" disabled>' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" name="reqItemNumber" disabled>' + "</td><td style='width:0px;'>"
            + '<input type="number" class="form-control form-rounded tableInputField gRQuantityClass" disabled>' + "</td><td>"
            + '<input type="number" class="form-control form-rounded tableInputField openQuantityClass" disabled>' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField schLineClass" value="1" disabled>' + "</td><td>"
            + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>'
            + "</td></tr>";
    $("#DeliveryScheduleTableId").children("tbody").append(row);
    if ($("#prType").val() === "Material") {
        $('.delvSchDeliveryDatepicker').each(function() {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                minDate: 0,
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        });
        $('.statistialDeliveryDatepicker').each(function() {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                minDate: 0,
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        });
    } else if ($("#prType").val() === "Service") {
        $('.delvSchDeliveryDatepicker').each(function() {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        });
        $('.statistialDeliveryDatepicker').each(function() {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        });
    }
}
function ifConditionIsEmpty() {

    var sno = $("#vendorSno").val(); // $("#vendorcodeHeader :selected").val();
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
            var kalsm = obj.kalsm;
            console.log("kalsm: " + kalsm);
            getAllByPricingProcedure(kalsm);
            calculationForPBXXInStandalone();
        }
    });
}

var lobiboxNotifyAlert = null;
function saveHeadersa(reqFrom) {
    var companycode = $("#companycodeHeader").val();
    var vendor = $("#vendorSno").val(); // $("#vendorcodeHeader").val();
    var typeOfPOHeader = $("#typeOfPOHeader").val();
    var downPaymentReqd = $("#downPaymentReqd").val();
    var purchasingOrg = $("#purchasingOrg").val();
    var purchasingGroup = $("#purchasingGroup").val();
    var currencyDeliveryInvoice = $("#currencyDeliveryInvoice").val();
    var ExchangeRate = $("#ExchangeRate").val();
    var streetVendorAddress = $("#streetVendorAddress").val();
    var houseNumberVendorAddress = $("#houseNumberVendorAddress").val();
    var Salesperson = $("#Salesperson").val();
    var requestType = $("#requestType").val();
    var prType = $("#prType").val();
    var errorMsg = "";
    var downPaymentFor = "";
    var value = "";
    var poNotesToApprover = $("#pONotetoApproverHeaderTextsLimits").val();
    if (reqFrom === "SaveHeaderButton") {
        if (companycode === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Company Code!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#companycodeHeader").focus();
            return false;
        }
        if (typeOfPOHeader === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select PO Type!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#typeOfPOHeader").focus();
            return false;
        }
        if (vendor === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select vendor.";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#vendorcodeHeader").focus();
            return false;
        }


        if (prType === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select PR Type.";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#prType").focus();
            return false;
        }
//        var TempAttachmentId = $("#TempAttachmentId").val();
//        if (TempAttachmentId === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            errorMsg = "Please submit attachment !";
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            $("#uploadDocumentBtn").focus();
//            return false;
//        }

        $(".collapseDivHeader").find(".active").removeClass("active");
        if (currencyDeliveryInvoice === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Currency in Delivery / Invoice Tab";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#deliveryInvoice").addClass("active");
            $("#deliveryInvoice-tab").addClass("active");
            $("#deliveryInvoice-tab").addClass("show");
            $("#currencyDeliveryInvoice").focus();
            return false;
        }
        if (ExchangeRate === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter ExchangeRate in Delivery / Invoice Tab.";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#deliveryInvoice").addClass("active");
            $("#deliveryInvoice-tab").addClass("active");
            $("#deliveryInvoice-tab").addClass("show");
            $("#ExchangeRate").focus();
            return false;
        }


//        if (downPaymentReqd === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            errorMsg = "Please select Downpayment Reqd.";
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            $("#deliveryInvoice").addClass("active");
//            $("#deliveryInvoice-tab").addClass("active");
//            $("#deliveryInvoice-tab").addClass("show");
//            $("#downPaymentReqd").focus();
//            return false;
//        }
//        if (downPaymentReqd === "Yes") {
//            value = $("#downPaymentReqdValue").val();
//            downPaymentFor = $("#downPaymentFor").val();
//            if (value === "") {
//                if (lobiboxNotifyAlert !== null)
//                {
//                    lobiboxNotifyAlert.remove();
//                }
//                errorMsg = "Please enter the value";
//                lobiboxNotifyAlert = Lobibox.notify("error", {
//                    rounded: true,
//                    delayIndicator: false,
//                    msg: errorMsg
//                });
//                $("#deliveryInvoice").addClass("active");
//                $("#deliveryInvoice-tab").addClass("active");
//                $("#deliveryInvoice-tab").addClass("show");
//                $("#downPaymentReqdValue").focus();
//                return false;
//            }
//
//            if (downPaymentFor === "") {
//                if (lobiboxNotifyAlert !== null)
//                {
//                    lobiboxNotifyAlert.remove();
//                }
//                errorMsg = "Please enter the Downpayment For!";
//                lobiboxNotifyAlert = Lobibox.notify("error", {
//                    rounded: true,
//                    delayIndicator: false,
//                    msg: errorMsg
//                });
//                $("#deliveryInvoice").addClass("active");
//                $("#deliveryInvoice-tab").addClass("active");
//                $("#deliveryInvoice-tab").addClass("show");
//                $("#downPaymentFor").focus();
//                return false;
//            }
//        }


        if (streetVendorAddress === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Street in Vendor Address Tab.";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#vendorAddress").addClass("active");
            $("#vendorAddress-tab").addClass("active");
            $("#vendorAddress-tab").addClass("show");
            $("#streetVendorAddress").focus();
            return false;
        }
        if (houseNumberVendorAddress === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter House Number in Vendor Address Tab.";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#vendorAddress").addClass("active");
            $("#vendorAddress-tab").addClass("active");
            $("#vendorAddress-tab").addClass("show");
            $("#houseNumberVendorAddress").focus();
            return false;
        }

        /*Edited by Bittu on 15/09/2020*/

//        if (Salesperson === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            errorMsg = "Please enter Salesperson in Communication Tab!";
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            $("#communication").addClass("active");
//            $("#communication-tab").addClass("active");
//            $("#communication-tab").addClass("show");
//            $("#Salesperson").focus();
//            return false;
//        }

        var typeOfPOHeader = $("#typeOfPOHeader").val();
        if (typeOfPOHeader === "Inter Company" || typeOfPOHeader === "Ferrous PO - Local") {
            var validityFromHeader = $("#validityFromHeader").val();
            var validityToHeader = $("#validityToHeader").val();
            if (validityFromHeader === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Validity From in Additional Data tab!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                $("#additionaldata").addClass("active");
                $("#additionaldata-tab").addClass("active");
                $("#additionaldata-tab").addClass("show");
                $("#validityFromHeader").focus();
                return false;
            }
            if (validityToHeader === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Validity From in Additional Data tab!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                $("#additionaldata").addClass("active");
                $("#additionaldata-tab").addClass("active");
                $("#additionaldata-tab").addClass("show");
                $("#validityToHeader").focus();
                return false;
            }
        }

//        if (poNotesToApprover === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            errorMsg = "Please enter PO Note to Approver in Header Text Tab!";
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            $("#headerText_linelevel").addClass("active");
//            $("#headerText_linelevel-tab").addClass("active");
//            $("#headerText_linelevel-tab").addClass("show");
//            $("#pONotetoApproverHeaderTextsLimits").focus();
//            return false;
//        }

        if (purchasingOrg === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Purchasing Organization in Org. Data Tab!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            $("#purchasingOrg").focus();
            return false;
        }
        if (purchasingGroup === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Purchasing Group in Org. Data Tab";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            $("#purchasingGroup").focus();
            return false;
        } else {
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
        }
        var IncoTermsPart1 = $("#IncoTermsPart1").val();
        var typeOfPO = $("#typeOfPOHeader").val();
        if (IncoTermsPart1.trim() === "SC") {
            if (typeOfPO === 'Non-Ferrous PO - Imp' || typeOfPO === 'Ferrous Joint Pur' || typeOfPO === 'Ferrous PO - Import' || typeOfPO === 'Ferrous PO - Local'
                    || typeOfPO === 'Non-Ferrous PO - Loc') {
                var ZoneCollectionScrap = $("#ZoneCollectionScrap").val();
                if (ZoneCollectionScrap === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please select Zone in Customer Data Data Tab!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    $("#org_data").removeClass("active");
                    $("#org_data-tab").removeClass("active");
                    $("#org_data-tab").removeClass("show");
                    $("#customerdata").addClass("active");
                    $("#customerdata-tab").addClass("active");
                    $("#customerdata-tab").addClass("show");
                    $("#ZoneCollectionScrap").focus();
                    return false;
                }
            }
        }
        var length = $("#material_headerClass tbody tr").length;
        if (length === 0) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please Add PO Line";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }

        var ch = prLineItemTableValidation();
        if (ch === "1") {
            return false;
        }

    }
    $("#overlay").css("display", "block");
    var linkid;
    console.log("Coming here in SaveHeader from :" + reqFrom);
    var taxcode = $("#TaxCode").val();
    var dropDownItemNumber = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            linkid = $(this).find("td").eq(0).children(".linkid").val();
            $(this).find("td").eq(0).children(".prTaxCode").val(taxcode);
        }
    });
    var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
    var vendorName = vendorNameCode.substring(0, vendorNameCode.lastIndexOf('-'));
    var isAckReq = "";
    if ($("#isAckReq").prop("checked") === true) {
        isAckReq = "Yes";
    } else {
        isAckReq = "No";
    }

    var poNumber = $("#poNumber").val();
    var poid = $("#poid").val();
    if (poid === 'null') {
        poid = "";
    }
    
    console.log("conditionLineLevelArraySA len: " + conditionLineLevelArraySA.length);
    var conditionLineLevelArraySAAsJsonString = JSON.stringify(conditionLineLevelArraySA);
    console.log("conditionLineLevelArraySAAsJsonString :" + conditionLineLevelArraySAAsJsonString);    
    
    var formJSON = "";
    var formJSON1 = "";
    formJSON = '[{'     // General Data-1
            + '"poid" :  "' + poid + '",'
            + '"TempAttachmentId" :  "' + document.getElementById("TempAttachmentId").value + '",'
            + '"companycodeHeader" :  "' + document.getElementById("companycodeHeader").value + '",'
            + '"typeOfPOHeader" : "' + document.getElementById("typeOfPOHeader").value + '",'
            + '"docDateHeader"  : "' + document.getElementById("docDateHeader").value + '",'
            + '"requestType"  : "' + document.getElementById("requestType").value + '",'
            + '"referenceDocType"  : "N/A",'
            + '"referenceDocNumber"  : "",'
            + '"referenceDocLine"  : "",'
            + '"downPaymentReqd"  : "' + document.getElementById("downPaymentReqd").value + '",'
            + '"downPaymentReqdValue" : "' + document.getElementById("downPaymentReqdValue").value + '",'
            + '"prType" : "' + document.getElementById("prType").value + '",'
            + '"downPaymentFor"  :  "' + document.getElementById("downPaymentFor").value + '",'//document.getElementById("vendorcodeHeader").value
            + '"vendorName"  :  "' + vendorName + '",'
            + '"vendorCode"  :  "' + vendorCode + '",'//document.getElementById("vendorcodeHeader").value
            + '"isAckReq"  :  "' + isAckReq + '",'
            + '"poNumber"  :  "' + poNumber + '"'            
            + '},{'//delivery/invoice-2
            + '"paymentTermsDelivery" :  "' + document.getElementById("paymentTermsDelivery").value + '",'
            + '"paymentDays1" :  "' + document.getElementById("paymentDays1").value + '",'
            + '"paymentPer1" : "' + document.getElementById("paymentPer1").value + '",'
            + '"paymentDays2"  : "' + document.getElementById("paymentDays2").value + '",'
            + '"paymentPer2"  : "' + document.getElementById("paymentPer2").value + '",'
            + '"paymentDaysNet" : "' + document.getElementById("paymentDaysNet").value + '",'
            + '"IncoTermsPart1"  :  "' + document.getElementById("IncoTermsPart1").value + '",'
            + '"IncoTermsPart2"  :  "' + document.getElementById("IncoTermsPart2").value + '",' + '"CurrencyDeliveryInvoice"  :  "' + document.getElementById("CurrencyDeliveryInvoice").value + '",'
            + '"ExchangeRate"  :  "' + document.getElementById("ExchangeRate").value + '",'
            + '"ExchangeReateFixed"  :  "' + document.getElementById("ExchangeReateFixed").value + '"'
            + '},{'// for Conditions-3
            + '},{'//Vendor Address-4
            + '"streetVendorAddress" :  "' + document.getElementById("streetVendorAddress").value + '",'
            + '"houseNumberVendorAddress" :  "' + document.getElementById("houseNumberVendorAddress").value + '",'
            + '"postalCodeVendorAddress" : "' + document.getElementById("postalCodeVendorAddress").value + '",'
            + '"cityVendorAddress"  : "' + document.getElementById("cityVendorAddress").value + '",'
            + '"extTel"  : "' + document.getElementById("extTel").value + '",' + '"telephoneVendorAddress" : "' + document.getElementById("telephoneVendorAddress").value + '",'
            + '"extFax"  :  "' + document.getElementById("extFax").value + '",' + '"faxVendorAddress"  :  "' + document.getElementById("faxVendorAddress").value + '",'
            + '"countryCodeVendorAddress"  :  "' + document.getElementById("countryCodeVendorAddress").value + '",'
            + '"countryVendorAddress"  :  "' + document.getElementById("countryVendorAddress").value + '",'
            + '"vendorEmail"  :  "' + document.getElementById("vendorEmail").value + '"'
            + '},{'//Communication-5
            + '"Salesperson" :  "' + document.getElementById("Salesperson").value + '",'
            + '"YourReference" :  "' + document.getElementById("YourReference").value + '",'
            + '"Telephone" : "' + document.getElementById("Telephone").value + '",'
            + '"OurReference"  : "' + document.getElementById("OurReference").value + '",'
            + '"Language"  : "' + document.getElementById("Language").value + '"'
            + '},{'//Partners-6
            + '},{'//Additional Data-7
            + '"CollectiveNumber" :  "' + document.getElementById("CollectiveNumber").value + '"'
            + '},{'//ORG Data-8
            + '"purchasingOrg" :  "' + document.getElementById("purchasingOrg").value + '",' + '"purchasingGroup" :  "' + document.getElementById("purchasingGroup").value.split('-')[0] + '"'
            + '},{'//Approver Details-9
            + '"PaymentImmediate" : "' + document.getElementById("PaymentImmediate").value + '",'
            + '"ExternalWeight" : "' + document.getElementById("ExternalWeight").value + '",'
            + '"PriceDisplay" : "' + document.getElementById("PriceDisplay").value + '",'
            + '"InstructionToWeigher" : "' + document.getElementById("InstructionToWeigher").value + '",'
            + '"ZoneCollectionScrap" : "' + document.getElementById("ZoneCollectionScrap").value + '",'
            + '"ProductOrigin" : "' + document.getElementById("ProductOrigin").value + '",'
            + '"SegmentDescription" : "' + document.getElementById("SegmentDescription").value + '",' + '"ConfControl" : "' + document.getElementById("ConfControl").value + '"'
            + '},{'// Header Text -10
            + '"pONotetoApproverHeaderTextsLimits" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("pONotetoApproverHeaderTextsLimits").value) + '",'
            + '"HeaderNote" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("HeaderNote").value) + '",'
            + '"PricingTypes" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("PricingTypes").value) + '",'
            + '"Deadlines" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("Deadlines").value) + '",'
            + '"TermsofDelivery" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("TermsofDelivery").value) + '",'
            + '"TermsofPayment" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("TermsofPayment").value) + '",'
            + '"ShippingInstructions" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("ShippingInstructions").value) + '",'
            + '"VendorMemoGeneral" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("VendorMemoGeneral").value) + '",'
            + '"VendorMemoSpecial" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("VendorMemoSpecial").value) + '",'
            + '"headerTextHeader" :  "' + handleSpecialCharacterOnSaveHeader(document.getElementById("headerTextHeader").value) + '"'
            + '},{'// Status -11
            + '"Ordered" :  "' + document.getElementById("ordered").value + '",'
            + '"Delivered" :  "' + document.getElementById("delivered").value + '",'
            + '"stillToDeliv" :  "' + document.getElementById("stillToDeliv").value + '",'
            + '"Invoiced" :  "' + document.getElementById("invoiced").value + '",'
            + '"DownPayments" :  "' + document.getElementById("downpayments").value + '"'
            + '},';
    
    console.log("formJSON " + formJSON);
    var tableData = '{"prTableData" : [';
    var i;
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(1).text();
        var shortText = "";
        if ($(this).find("td").eq(5).text() !== "")
        {
            shortText = handleSpecialCharacterOnSaveHeader($(this).find("td").eq(6).children(".prShortText").val());
//            shortText = $(this).find("td").eq(6).children(".prShortText").val();
        }
        var MaterialLongText = "";
        if ($(this).find("td").eq(6).text() !== "")
        {
            MaterialLongText = handleSpecialCharacterOnSaveHeader($(this).find("td").eq(7).text());
        }
        var prReturnsItem = $(this).find("td").eq(33).children(".prReturnsItem").prop("checked");
        var returnsItem = "";
        if (prReturnsItem === true) {
            returnsItem = "Yes";
        } else {
            returnsItem = "No";
        }
        var prFreeOfCharge = $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked");
        var freeOfCharge = "";
        if (prFreeOfCharge === true) {
            freeOfCharge = "Yes";
        } else {
            freeOfCharge = "No";
        }

        tableData = tableData
                + '{'
                + '"itemNumber":"' + $(this).find("td").eq(1).text() + '",'
                + '"acAsgn":"' + $(this).find("td").eq(2).children(".accountAssignmentClass").val() + '",'
                + '"itemCat":"' + $(this).find("td").eq(3).children(".itemCategoryClass").val() + '",'
                + '"matCode":"' + $(this).find("td").eq(4).children(".materialCodeClass").val() + '",'
                + '"criticality":"' + $(this).find("td").eq(5).children(".poCriticality").val() + '",'
                + '"shortText":"' + shortText + '",'
                + '"longText":"' + MaterialLongText + '",'
                + '"quantity":"' + removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val()) + '",'
                + '"netPrice":"' + removeCommaInNumber($(this).find("td").eq(9).children('.prNetPrice').val()) + '",'
                + '"perUnit":"' + removeCommaInNumber($(this).find("td").eq(10).children('.prPerUnit').val()) + '",'
                + '"currency":"' + $(this).find("td").eq(11).children(".currencyClass").val() + '",'
                + '"opu":"' + $(this).find("td").eq(12).children(".prOrderPriceUnit").val() + '",'
                + '"deliveryDateCategory":"' + $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val() + '",'
                + '"reqDate":"' + $(this).find("td").eq(14).children('.requisitionDateClass').val() + '",'
                + '"deliveryDate":"' + $(this).find("td").eq(15).children('.deliveryDateClass').val() + '",'
                + '"plant":"' + $(this).find("td").eq(16).children(".plantClass").val() + '",'
                + '"unit":"' + $(this).find("td").eq(31).children(".prUom").val() + '",'
                + '"matlGrp":"' + $(this).find("td").eq(17).children(".matlGroup").val() + '",'
                + '"purOrg":"' + $(this).find("td").eq(18).children(".purchaseOrgClass").val() + '",'
                + '"purgrp":"' + $(this).find("td").eq(19).children(".purchaseGroupClass").val() + '",'
                + '"storeLoc":"' + $(this).find("td").eq(20).children(".storageLocationClass").val() + '",'
                + '"batch":"' + $(this).find("td").eq(21).text() + '",'
                + '"infoRecord":"' + $(this).find("td").eq(22).text() + '",'
                + '"pRRequisitioner":"' + $(this).find("td").eq(23).text() + '",'
                + '"pRCreator":"' + $(this).find("td").eq(24).text() + '",'
                + '"pRDepartmentName":"' + $(this).find("td").eq(25).children(".prDeptNameClass").val() + '",'
                + '"pODepartmentName":"' + $(this).find("td").eq(26).children(".poDeptNameClass").val() + '",'
                + '"higherItemCategory":"' + $(this).find("td").eq(27).text() + '",'
                + '"subItemCategory":"' + $(this).find("td").eq(28).text() + '",'
                + '"trackingNumber":"' + $(this).find("td").eq(29).children(".trackingNumber").val() + '",'
                + '"linkid":"' + $(this).find("td").eq(0).children(".linkid").val() + '",'
                + '"gLCode":"' + $(this).find("td").eq(0).children(".prgLCode").val() + '",'
                + '"zGLCOde":"' + $(this).find("td").eq(0).children(".przGLCode").val() + '",'
                + '"taxCode":"' + $(this).find("td").eq(0).children(".prTaxCode").val() + '",'
                + '"prImMaterial":"' + $(this).find("td").eq(32).children(".prImMaterial").val() + '",'
                + '"prReturnsItem":"' + returnsItem + '",'
                + '"prFreeOfCharge":"' + freeOfCharge + '",'
                + '"prRfqNo":"' + $(this).find("td").eq(35).children(".prRfqNo").val() + '",'
                + '"prRfqItemNo":"' + $(this).find("td").eq(36).children(".prRfqItemNo").val() + '",'
                + '"prNetPriceHidden":"' + $(this).find("td").eq(0).children(".prNetPriceHidden").val() + '"'
                + '},';
    });
    tableData = tableData.slice(0, -1);
    formJSON = formJSON + tableData + "]}]";
    //    formJSON = formJSON ;

//    formJSON1 = [{"poid": "", "TempAttachmentId": "6565", "companycodeHeader": "0640", "typeOfPOHeader": "Import PO for Goods", "docDateHeader": "30-03-2020", "requestType": "Create Purchase Order", "referenceDocType": "N/A", "referenceDocNumber": "", "referenceDocLine": "", "downPaymentReqd": "No", "downPaymentReqdValue": "", "prType": "Material", "downPaymentFor": "", "vendorName": "International Materials And  Techno logy (S) Pte Ltd (Imatech)", "vendorCode": "0001100001"}, {"paymentTermsDelivery": "D030", "paymentDays1": "30", "paymentPer1": "", "paymentDays2": "", "paymentPer2": "", "paymentDaysNet": "", "IncoTermsPart1": "", "IncoTermsPart2": "", "CurrencyDeliveryInvoice": "SGD", "ExchangeRate": "1.000", "ExchangeReateFixed": "on"}, {}, {"streetVendorAddress": "asdas", "houseNumberVendorAddress": "asd", "postalCodeVendorAddress": "", "cityVendorAddress": "", "extTel": "", "telephoneVendorAddress": "", "extFax": "", "faxVendorAddress": "", "countryCodeVendorAddress": "", "countryVendorAddress": ""}, {"Salesperson": "asdsd", "YourReference": "", "Telephone": "", "OurReference": "", "Language": "EN"}, {}, {"CollectiveNumber": ""}, {"purchasingOrg": "640", "purchasingGroup": "F04"}, {"PaymentImmediate": "on", "ExternalWeight": "on", "PriceDisplay": "on", "InstructionToWeigher": "", "ZoneCollectionScrap": "", "ProductOrigin": "", "SegmentDescription": "", "ConfControl": "Confirmations"}, {"pONotetoApproverHeaderTextsLimits": "dasdas", "HeaderNote": "", "PricingTypes": "", "Deadlines": "", "TermsofDelivery": "", "TermsofPayment": "", "ShippingInstructions": "", "VendorMemoGeneral": "", "VendorMemoSpecial": ""}, {"prTableData": [{"itemNumber": "10", "acAsgn": "K", "itemCat": "", "matCode": "0001A0001", "criticality": "", "shortText": "DRINKING WATER COOLING WATER", "longText": "", "quantity": "1", "netPrice": "1", "perUnit": "1", "currency": "SGD", "opu": "", "deliveryDateCategory": "D", "reqDate": "2020-03-30", "deliveryDate": "2020-03-31", "plant": "6400", "unit": "BOT", "matlGrp": "106", "purOrg": "640", "purgrp": "F04", "storeLoc": "SC34", "batch": "", "infoRecord": "", "pRRequisitioner": "", "pRCreator": "", "pRDepartmentName": "", "pODepartmentName": "", "higherItemCategory": "", "subItemCategory": "", "trackingNumber": "0017", "linkid": "SA-87-10", "gLCode": "0008512521", "zGLCOde": "", "taxCode": ""}]}];
//    formJSON1 = '[{"poid" :  "","TempAttachmentId" :  "","companycodeHeader" :  "0640","typeOfPOHeader" : "Import PO for Goods","docDateHeader"  : "03-07-2020","requestType"  : "Create Purchase Order","referenceDocType"  : "N/A","referenceDocNumber"  : "","referenceDocLine"  : "","downPaymentReqd"  : "","downPaymentReqdValue" : "","prType" : "Material","downPaymentFor"  :  "","vendorName"  :  "GEP ELECTRIC MOTOR (FE) PTE LTD","vendorCode"  :  "0001100937"},{"paymentTermsDelivery" :  "R030","paymentDays1" :  "30","paymentPer1" : "","paymentDays2"  : "","paymentPer2"  : "","paymentDaysNet" : "","IncoTermsPart1"  :  "","IncoTermsPart2"  :  "","CurrencyDeliveryInvoice"  :  "USD","ExchangeRate"  :  "1.000","ExchangeReateFixed"  :  "on"},{},{"streetVendorAddress" :  "NO. 1, TUAS SOUTH ST 1","houseNumberVendorAddress" :  "JURONG TOWN, , ","postalCodeVendorAddress" : "638059","cityVendorAddress"  : "SINGAPORE","extTel"  : "","telephoneVendorAddress" : "65-68699221","extFax"  :  "","faxVendorAddress"  :  "65-68633320","countryCodeVendorAddress"  :  "SG","countryVendorAddress"  :  ""},{"Salesperson" :  "Bitu","YourReference" :  "","Telephone" : "","OurReference"  : "UAT Test","Language"  : "EN"},{},{"CollectiveNumber" :  ""},{"purchasingOrg" :  "640","purchasingGroup" :  "F03"},{"PaymentImmediate" : "on","ExternalWeight" : "on","PriceDisplay" : "on","InstructionToWeigher" : "","ZoneCollectionScrap" : "","ProductOrigin" : "","SegmentDescription" : "","ConfControl" : "Confirmations"},{"pONotetoApproverHeaderTextsLimits" :  "Approver","HeaderNote" :  "","PricingTypes" :  "","Deadlines" :  "","TermsofDelivery" :  "","TermsofPayment" :  "","ShippingInstructions" :  "","VendorMemoGeneral" :  "","VendorMemoSpecial" :  ""},{"prTableData" : [{"itemNumber":"10","acAsgn":"K","itemCat":"","matCode":"0001A0001","criticality":"","shortText":"HP Storageworks MSA30 SB","longText":"","quantity":"1","netPrice":"10","perUnit":"2","currency":"SGD","opu":"","deliveryDateCategory":"D","reqDate":"2020-07-03","deliveryDate":"2020-07-03","plant":"6400","unit":"PAK","matlGrp":"140","purOrg":"640","purgrp":"F03","storeLoc":"CA11","batch":"","infoRecord":"","pRRequisitioner":"UAT Test","pRCreator":"","pRDepartmentName":"","pODepartmentName":"","higherItemCategory":"","subItemCategory":"","trackingNumber":"0017","linkid":"SA-140-10","gLCode":"","zGLCOde":"","taxCode":""}]}]';
    console.log(JSON.parse(formJSON));
    console.log("Table Data1 ::::  " + formJSON);
//    console.log("Table Data ::::  " + formJSON1);
//    console.log(JSON.stringify(formJSON));

    var _csrf = $("input[name=_csrf]").val();
    setTimeout(function() {
        $.ajax({
            type: "POST",
            url: "savestandalonelineitemdata.do",
            async: false,
            data: {
                formdata: formJSON,
                headerConditionsNew: conditionLineLevelArraySAAsJsonString,
                reqFrom: "saveHeaderData",
                _csrf: _csrf
            },
            success: function(response) {
                console.log("response :: " + response);
                if (response !== '0') {
//                    document.getElementById("poid").value = response;
                    $("#poid").val(response.toString().trim());
                    console.log("Response" + response);
                    if (response !== '') {
                        // Commented by nikhil
                        saveSAHeaderConditionsInDB();
                        getPONumber(response);
                        $("#saveLineItemData").prop("disabled", false);
//                        $("#overlay").css("display", "none");
//                        Lobibox.alert("success", {
//                            msg: "Data saved successfully."
//                        });
                        $("#saveLineItemData").prop("disabled", false);
                        $("#material_headerClass tbody tr").each(function() {
                            $(this).find("td").eq(0).children(".isPrSaved").val("Yes");
                        });
                    } else {
                        Lobibox.alert("error", {
                            msg: "Data not saved!"
                        });
                        $("#overlay").css("display", "none");
                    }
                }
            }
        });
    }, 20);
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
    for (var i = 0; i < prLineLen; i++) {
        accAsgn = $(rows[i]).find('td').eq(2).children(".accountAssignmentClass").val();
        itemCat = $(rows[i]).find("td").eq(3).children(".itemCategoryClass").val();
        matcode = $(rows[i]).find("td").eq(4).children(".materialCodeClass").val();
        quantity = removeCommaInNumber($(rows[i]).find("td").eq(8).children(".quantity_Class").val());
        prNetPrice = removeCommaInNumber($(rows[i]).find("td").eq(9).children(".prNetPrice").val());
        prPerUnit = removeCommaInNumber($(rows[i]).find("td").eq(10).children(".prPerUnit").val());
        pRLineCurrency = $(rows[i]).find("td").eq(11).children(".currencyClass").val();
        delDate = $(rows[i]).find("td").eq(15).children(".deliveryDateClass").val();
        pRPlant = $(rows[i]).find("td").eq(16).children(".plantClass").val();
        pRPurchansingOrg = $(rows[i]).find("td").eq(18).children(".purchaseOrgClass").val();
        pRPurGroup = $(rows[i]).find("td").eq(19).children(".purchaseGroupClass").val();
        pRStorageLoc = $(rows[i]).find("td").eq(20).children(".storageLocationClass").val();
        pRDeptName = $(rows[i]).find("td").eq(25).children(".prDeptNameClass").val();
        pODeptName = $(rows[i]).find("td").eq(26).children(".poDeptNameClass").val();
        matlGroup = $(rows[i]).find("td").eq(17).children(".matlGroup").val();
        trackingNumber = $(rows[i]).find("td").eq(29).children(".trackingNumber").val();
        criticality = $(rows[i]).find("td").eq(5).children(".poCriticality").val();
        shortText = $(rows[i]).find("td").eq(6).children(".prShortText").val();
        //            $(".fadeIndown").hide();

        var poType = $("#typeOfPOHeader").val();
        if ((poType !== "Inter Company" && poType !== "PO for Group Trade" && poType !== "PO for Associate Trade" && poType !== "PO for 3rd Party Trade" && poType !== "Ferrous PO - Local") && accAsgn === "") {
            if (accAsgn === "" && itemCat !== "L") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Account Assignment Category!";
                $(rows[i]).find("td").eq(2).children(".accountAssignmentClass").css("border-color", "red");
                $(rows[i]).find("td").eq(2).children(".accountAssignmentClass").focus();
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isPrLineData = "No";
                break
            } else {
                $(rows[i]).find("td").eq(2).children(".accountAssignmentClass").css("border-color", "");
            }
        }


        var prType = $("#prType").val();
        if (prType === "Service") {
            if (criticality === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Criticality!";
                $(rows[i]).find("td").eq(5).children(".poCriticality").css("border-color", "red");
                $(rows[i]).find("td").eq(5).children(".poCriticality").focus();
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isPrLineData = "No";
                break
            } else {
                $(rows[i]).find("td").eq(5).children(".poCriticality").css("border-color", "");
            }
            if (shortText === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Short Text!";
                $(rows[i]).find("td").eq(6).children(".prShortText").css("border-color", "red");
                $(rows[i]).find("td").eq(6).children(".prShortText").focus();
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isPrLineData = "No";
                break
            } else {
                $(rows[i]).find("td").eq(6).children(".prShortText").css("border-color", "");
            }
        }
//            if (itemCat === "") {
//                errorMsg = "Please enter Item Category!";
//                $(rows[i]).find("td").eq(3).children(".itemCategoryClass").css("border-color", "red");
//                Lobibox.notify("error", {
//                    rounded: true,
//                    delayIndicator: false,
//                    msg: errorMsg
//                });
//                isPrLineData = "No";
//                break
//            } else {
//                $(rows[i]).find("td").eq(3).children(".itemCategoryClass").css("border-color", "");
//            }

        if (prType === "Material") {
            if (matcode === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Material Code!";
                $(rows[i]).find("td").eq(4).children(".materialCodeClass").css("border-color", "red");
                $(rows[i]).find("td").eq(4).children(".materialCodeClass").focus();
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isPrLineData = "No";
                break
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
            $(rows[i]).find("td").eq(8).children(".quantity_Class").css("border-color", "red");
            $(rows[i]).find("td").eq(8).children(".quantity_Class").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isPrLineData = "No";
            break
        } else {
            $(rows[i]).find("td").eq(8).children(".quantity_Class").css("border-color", "");
        }
        if (prType === "Material") {
            if (prNetPrice === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Net Price!";
                $(rows[i]).find("td").eq(9).children(".prNetPrice").css("border-color", "red");
                $(rows[i]).find("td").eq(9).children(".prNetPrice").focus();
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isPrLineData = "No";
                break
            } else {
                $(rows[i]).find("td").eq(9).children(".prNetPrice").css("border-color", "");
            }
            if (prPerUnit === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Per Unit!";
                $(rows[i]).find("td").eq(10).children(".prPerUnit").css("border-color", "red");
                $(rows[i]).find("td").eq(10).children(".prPerUnit").focus();
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isPrLineData = "No";
                break
            } else {
                $(rows[i]).find("td").eq(10).children(".prPerUnit").css("border-color", "");
            }
        }

        if (pRLineCurrency === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Currency!";
            $(rows[i]).find("td").eq(11).children(".currencyClass").css("border-color", "red");
            $(rows[i]).find("td").eq(11).children(".currencyClass").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isPrLineData = "No";
            break
        } else {
            $(rows[i]).find("td").eq(11).children(".currencyClass").css("border-color", "");
        }
        if (delDate === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Delivery Date!";
            $(rows[i]).find("td").eq(15).children(".deliveryDateClass").css("border-color", "red");
            $(rows[i]).find("td").eq(15).children(".deliveryDateClass").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isPrLineData = "No";
            break
        } else {
            $(rows[i]).find("td").eq(15).children(".deliveryDateClass").css("border-color", "");
        }
        if (pRPlant === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Plant!";
            $(rows[i]).find("td").eq(16).children(".plantClass").css("border-color", "red");
            $(rows[i]).find("td").eq(16).children(".plantClass").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isPrLineData = "No";
            break
        } else {
            $(rows[i]).find("td").eq(16).children(".plantClass").css("border-color", "");
        }
        if (prType === "Service") {
            if (matlGroup === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter material group!";
                $(rows[i]).find("td").eq(17).children(".matlGroup").css("border-color", "red");
                $(rows[i]).find("td").eq(17).children(".matlGroup").focus();
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isPrLineData = "No";
                break
            } else {
                $(rows[i]).find("td").eq(17).children(".matlGroup").css("border-color", "");
            }
        }
        if (pRPurchansingOrg === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Purchasing Org!";
            $(rows[i]).find("td").eq(18).children(".purchaseOrgClass").css("border-color", "red");
            $(rows[i]).find("td").eq(18).children(".purchaseOrgClass").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isPrLineData = "No";
            break
        } else {
            $(rows[i]).find("td").eq(18).children(".purchaseOrgClass").css("border-color", "");
        }
        if (pRPurGroup === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Purchasing Group!";
            $(rows[i]).find("td").eq(19).children(".purchaseGroupClass").css("border-color", "red");
            $(rows[i]).find("td").eq(19).children(".purchaseGroupClass").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isPrLineData = "No";
            break
        } else {
            $(rows[i]).find("td").eq(19).children(".purchaseGroupClass").css("border-color", "");
        }

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

        if (trackingNumber === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Tracking Number!";
            $(rows[i]).find("td").eq(29).children(".trackingNumber").css("border-color", "red");
            $(rows[i]).find("td").eq(29).children(".trackingNumber").focus();
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isPrLineData = "No";
            break
        } else {
            $(rows[i]).find("td").eq(29).children(".trackingNumber").css("border-color", "");
        }
    }
    if (isPrLineData === "No")
    {
//            return false;
        return "1";
    } else {
        return "0";
    }
    var formatted_date = current_datetime.getFullYear() + "-" + mon + "-" + day;
    $("#DeliveryScheduleTableId tbody tr").remove();
    var row = "";
    row = "<tr><td>"
            + '<input type="text" class="form-control form-rounded deliveryDateCategory tableInputField" id="deliveryDateCategoryId" name="" value="">' + "</td><td>"
            + '<input type="date" id="deliveryDate" class="deliveryDateClass" style="width:150px;" value=' + formatted_date + ' min=' + formatted_date + '>' + "</td><td>"
            + '<input type="text" class="statistialDeliveryDate" style="width:150px;" value=' + formatted_date + ' min=' + formatted_date + '>' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField scheduledQuantityClass" value="' + formatNumberByComma(quantity) + '" id="scheduledQuantity" name="scheduledQuantity" style="width:150px;">' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField timeDeliveryScheduledClass" id="timeDeliveryScheduled" name="timeDeliveryScheduled">' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField prNumberDeliveryScheduledClass" id="prNumberDeliveryScheduled" name="prNumberDeliveryScheduled" disabled>' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField reqItemNumberClass" id="reqItemNumber" name="reqItemNumber" disabled>' + "</td><td style='width:0px;'>"
            + '<input type="number" class="form-control form-rounded tableInputField gRQuantityClass" disabled>' + "</td><td>"
            + '<input type="number" class="form-control form-rounded tableInputField openQuantityClass" disabled>' + "</td><td>"
            + '<input type="text" class="form-control form-rounded tableInputField schLineClass" disabled>' + "</td><td>"
            + '<i title="Delete Row" class="fa fa-window-close btn-lg deleteDeliverySchTebleRow" aria-hidden="true"></i>'
            + "</td></tr>";
    $("#DeliveryScheduleTableId").children("tbody").append(row);
}

function handleSpecialCharacterOnSaveHeader(str)
{
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/\n|\r/g, ' ');
    return str;
}
function handleSpecialCharacterReverse(str)
{

    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    return str;
}
function distributionByPercentage() {
    var accountAssignmentCategory = $("#accountAssignmentCategory").val();
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        if (accountAssignmentCategory === 'K') {
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'N') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'A') {
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
            $(this).find("td").eq(13).children(".accAsgnAssets").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'B') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
        }
        if (accountAssignmentCategory === 'C') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'D') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'E') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'F') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'G') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
        }
        if (accountAssignmentCategory === 'K') {
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'M') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'P') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'Q') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'R') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").prop("disabled", false);
            $(this).find("td").eq(11).children(".accAsgnRecipients").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'T') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", false);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
            $(this).find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'X') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'Z') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
        }
    });
}
function distributionByQuantity() {
    var accountAssignmentCategory = $("#accountAssignmentCategory").val();
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {

        if (accountAssignmentCategory === 'K') {
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'N') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'A') {
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
            $(this).find("td").eq(13).children(".accAsgnAssets").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'B') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
        }
        if (accountAssignmentCategory === 'C') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'D') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'E') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'F') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'G') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
        }
        if (accountAssignmentCategory === 'K') {
            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'M') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'P') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'Q') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'R') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(10).children(".accAsgnUnloadingPoint").prop("disabled", false);
            $(this).find("td").eq(11).children(".accAsgnRecipients").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'T') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", false);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
            $(this).find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'X') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
        }
        if (accountAssignmentCategory === 'Z') {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
            $(this).find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
        }
    });
}
function getTaxResponseInStandalonePO(xmlsap) {
    var xmlString = XMLToString(xmlsap); //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<POTaxCalcOP>"
//            + "<Message></Message>"
//            + "<TaxAmnt>10</TaxAmnt>"
//            + "</POTaxCalcOP>";

//    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);
    var TaxAmnt = $xml.find('TaxAmnt');
    var Message = $xml.find('Message');
    var TaxAmnt = TaxAmnt.text();
    var msg = Message.text();
    console.log("TaxAmnt: " + TaxAmnt);
    console.log("Message: " + msg);
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

function calculationForPBXXInStandalone() {
    var timeOfChangeCurrency = "";
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            timeOfChangeCurrency = $(this).find("td").eq(0).children(".timeOfChangeCurrency").val();
        }
    });
    var exchangeRate = $("#ExchangeRate").val();
    var headerCurrency = $("#CurrencyDeliveryInvoice").val();
    var companyCode = $("#companycodeHeader").val();
    console.log("companyCode in Exchange Rate: " + companyCode);
    var fromCurrency = "";
    if (companyCode === "0640" || companyCode === "0641")
    {
        fromCurrency = "SGD";
        ifHeaderCurrencyNotChangeInStandalone();
        if (timeOfChangeCurrency === "after") {
            if (headerCurrency !== fromCurrency) {
                calculateConditionOnCurrncyChange(exchangeRate);
            }
        }
    }
    else if (companyCode === "0680")
    {
        fromCurrency = "MYR";
        ifHeaderCurrencyNotChangeInStandalone();
        if (timeOfChangeCurrency === "after") {
            if (headerCurrency !== fromCurrency) {
                calculateConditionOnCurrncyChange(exchangeRate);
            }
        }
    }


}

function formulaInStandAlone(Cnty) {

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

function calculateConditionValueInStandAlone(conAmount, conType, perQty, poQty, oldAmount, oldPercentage) {
//amount, conType, perQty,poQty, oldAmount, oldPercentage
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
    var dropDownItemNumber = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            poQty = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
        }
    });
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
                        $(this).find("td").eq(3).children("input[name=AmountLineLevel]").attr({
                            "value": formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2))
                        });
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
            $("#conditionTableIdLineLevel tbody tr").each(function(i) {
                var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                if (conName === "Net Price") {
                    amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                    console.log("amount :" + amount);
                    conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                    console.log("amount in NetPrice [" + i + "]:" + amount + " ,conAmount :" + conAmount + " ,oldAmount :" + oldAmount);
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
    var expCostFreightCFRArr = (expCostFreightCFR.toString()).split('+');
    for (var i = 0; i < expCostFreightCFRArr.length; i++) {
        if (expCostFreightCFRArr[i].trim() === conType.trim()) {
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                if (conName === "Cost & Freight(CFR)") {
                    $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
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
                    $(this).find("td").eq(3).children("input[name=AmountLineLevel]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    $(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
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

var orderTable = null;
function getAllInterOrder() {
    var accAsgn;
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
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
            
            if(obj.length < Number(internalOrderRecordCount)) 
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