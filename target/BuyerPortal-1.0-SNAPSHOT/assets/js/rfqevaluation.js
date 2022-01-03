$(function() {
    (function() {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome',
            soundPath: 'assets/vendor/parsley/sounds/', // The folder path where sounds are located
            soundExt: '.ogg' // Default extension for all sounds
        });

        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            title: true, // Title of notification. If you do not include the title in options it will automatically takes its value 
            //from Lobibox.notify.OPTIONS object depending of the type of the notifications or set custom string. Set this false to disable title
            size: 'normal', // normal, mini, large
            soundPath: 'assets/vendor/lobibox/sounds/', // The folder path where sounds are located
            soundExt: '.ogg', // Default extension for all sounds
            showClass: 'fadeInDown', // Show animation class.
            hideClass: 'zoomOut', // Hide animation class.
            icon: true, // Icon of notification. Leave as is for default icon or set custom string
            msg: '', // Message of notification
            img: null, // Image source string
            closable: true, // Make notifications closable
            hideCloseButton: false, // Notification may be closable but you can hide close button and it will be closed by clicking on notification itsef
            delay: 5000, // Hide notification after this time (in miliseconds)
            delayIndicator: true, // Show timer indicator
            closeOnClick: true, // Close notifications by clicking on them
            width: 400, // Width of notification box
            sound: true, // Sound of notification. Set this false to disable sound. Leave as is for default sound or set custom soud path
            // Place to show notification. Available options: "top left", "top right", "bottom left", "bottom right", "center top", "center bottom"
            // It can also be object {left: number, top: number} to position notification at any place
            position: "bottom right",
            iconSource: 'fontAwesome', // "bootstrap" or "fontAwesome" the library which will be used for icons
            rounded: false, // Whether to make notification corners rounded
            messageHeight: 60, // Notification message maximum height. This is not for notification itself, this is for <code>.lobibox-notify-msg</code>
            pauseDelayOnHover: true, // When you mouse over on notification delay (if it is enabled) will be paused.
            onClickUrl: null, // The url which will be opened when notification is clicked
            showAfterPrevious: false, // Set this to true if you want notification not to be shown until previous notification is closed. This is useful for notification queues
            continueDelayOnInactiveTab: true, // Continue delay when browser tab is inactive
            // Events
            onClick: null
        });
    })();
});

$(document).ready(function() {
    $("#overlay").css("display", "none");

    $("#rfqEvalNumber").change(function() {
        console.log("rfqEvalNumber");

        var rfqIds = $("#rfqEvalNumber").val();
        console.log("rfqIds: " + rfqIds);

        var rfqIdTextArr = [];
        $("#rfqEvalNumber option:selected").each(function() {
            rfqIdTextArr.push($(this).text());
        });
        console.log(rfqIdTextArr);

        var isMaterialRfq = false;
        var isServiceRfq = false;
        for (var i = 0; i < rfqIdTextArr.length; i++) {
            if (rfqIdTextArr[i].toString().startsWith("G")) {
                isMaterialRfq = true;
            }
            if (rfqIdTextArr[i].toString().startsWith("S")) {
                isServiceRfq = true;
            }
        }
        console.log("isMaterialRfq: " + isMaterialRfq);
        console.log("isServiceRfq: " + isServiceRfq);

        if (isMaterialRfq === true && isServiceRfq === true) {
            if (createPoNotifyAlert !== null)
            {
                createPoNotifyAlert.remove();
            }
            createPoNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select either material or service RFQ(s)!"
            });
            $("#generateRfqEvaluationReport").prop("disabled", true);
        } else {
            if (rfqIds.toString().trim() !== "")
            {
                $("#rfqIds").val(rfqIds);
                $("#generateRfqEvaluationReport").prop("disabled", false);
            }
            else
            {
                $("#rfqIds").val("");
                $("#generateRfqEvaluationReport").prop("disabled", true);
            }
        }
    });

    $("#generateRfqEvaluationReport").click(function() {
        console.log("generateRfqEvaluationReport");
        var rfqIds = $("#rfqIds").val();
        console.log("rfqIds: " + rfqIds);
        var vendorIdArray = [];
        var supplierHeaderIdArray = [];
        $("#overlay").css("display", "block");

        $.ajax({
            type: "GET",
            url: "rfqEvaluationGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "rfqEvaluationReport",
                "rfqIds": rfqIds
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
//                console.log("SupplierHeader JSON.stringify(obj): " + JSON.stringify(obj));
                obj = JSON.parse(JSON.stringify(obj));
                var RfqHeaderJsonArray = obj.RfqHeaderJsonArray;
                console.log("RfqHeaderJsonArray len: " + RfqHeaderJsonArray.length);

                var rfqVendorListOption = "";
                var thead_tr = "";
                var tbody_tr = "";
                var awardedVendorSelectBox = "<select class='custom-select awarded-vendor-select' style='width: 100%;'><option value=''>Select</option>";

                thead_tr += "<tr>";
                thead_tr += "<th>#</th>";
                thead_tr += "<th>RFQ Details</th>";
                thead_tr += "<th>PR Details</th>";
                thead_tr += "<th>Remaining Qty.</th>";

                $("#rfqVendorList option").remove();
                $("#vendorComparisonFinalizationReportTable thead tr").remove();
                $("#vendorComparisonFinalizationReportTable tbody tr").remove();

                for (var i = 0; i < obj.SupplierHeaderJsonArray.length; i++)
                {
                    var supplierHeaderId = obj.SupplierHeaderJsonArray[i].id;
                    var vendorId = obj.SupplierHeaderJsonArray[i].ngBpVendordetailsId.id;
                    var vendorName = "";
                    var vendorType = obj.SupplierHeaderJsonArray[i].ngBpVendordetailsId.type;
                    console.log("type: " + vendorType);
                    if (vendorType !== "Prospect")
                    {
                        vendorName = obj.SupplierHeaderJsonArray[i].ngBpVendordetailsId.firstname + " " + (obj.SupplierHeaderJsonArray[i].ngBpVendordetailsId.lastname === undefined ? "" : obj.SupplierHeaderJsonArray[i].ngBpVendordetailsId.lastname);
                    }
                    else
                    {
                        vendorName = obj.SupplierHeaderJsonArray[i].ngBpVendordetailsId.prospectvendorname;
                    }

                    if (vendorIdArray.indexOf(vendorId) === -1)
                    {
                        vendorIdArray.push(vendorId);
                        supplierHeaderIdArray.push(supplierHeaderId);
                        thead_tr += "<th>"
                                + "<input type='hidden' value='vendor' class='vendorColumn'>"
                                + "<input type='hidden' class='vendorId' value='" + vendorId + "'>" + vendorName
                                + "</th>";

                        rfqVendorListOption += "<option value='" + vendorId + "'>" + vendorName + "</option>";
                        awardedVendorSelectBox += "<option value='" + vendorId + "'>" + vendorName + "</option>";
                    }
                }
                thead_tr += "<th>PO Status</th>";
                thead_tr += "<th>Awarded Vendor</th>";
                thead_tr += "<th>Note to Approver</th>";
                thead_tr += "<th>Comments</th>";
                thead_tr += "<th>Why was this vendor selected ?</th>";
                thead_tr += "</tr>";

                awardedVendorSelectBox += "</select>";

//                console.log("thead_tr: " + thead_tr);
                $("#vendorComparisonFinalizationReportTable thead").append(thead_tr);

                for (var rfqHeaderIndex = 0; rfqHeaderIndex < RfqHeaderJsonArray.length; rfqHeaderIndex++)
                {
                    var rfqId = RfqHeaderJsonArray[rfqHeaderIndex].rfqid;
                    var rfqNumber = RfqHeaderJsonArray[rfqHeaderIndex].rfqNumber;
                    var rfqStatus = RfqHeaderJsonArray[rfqHeaderIndex].rfqstatus;
                    $.ajax({
                        type: "GET",
                        url: "rfqEvaluationGetAjaxRequest.do",
                        async: false,
                        data: {
                            "reqFrom": "findWorkOrderLineItemByRfqId",
                            "rfqId": rfqId
                        },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
//                            console.log("RfqLineItemJsonArray JSON.stringify(obj): " + JSON.stringify(obj));
                            obj = JSON.parse(JSON.stringify(obj));
                            var RfqLineItemJsonArray = obj.RfqLineItemJsonArray;
                            console.log("RfqLineItemJsonArray len: " + RfqLineItemJsonArray.length);

                            for (var rfqLineItemIndex = 0; rfqLineItemIndex < RfqLineItemJsonArray.length; rfqLineItemIndex++)
                            {
                                var RFQLineID = RfqLineItemJsonArray[rfqLineItemIndex].RFQLineID;
                                var insertionOrderId = RfqLineItemJsonArray[rfqLineItemIndex].ngBpNewgenPRLineItemId.insertionOrderId;
                                var materialCode = RfqLineItemJsonArray[rfqLineItemIndex].ngBpNewgenPRLineItemId.materialCode;
                                var materialGroup = RfqLineItemJsonArray[rfqLineItemIndex].ngBpNewgenPRLineItemId.materialGroup;
                                var itemCategory = RfqLineItemJsonArray[rfqLineItemIndex].ngBpNewgenPRLineItemId.itemCategory;
                                var shortText = RfqLineItemJsonArray[rfqLineItemIndex].ngBpNewgenPRLineItemId.shortText;
                                var quantity = RfqLineItemJsonArray[rfqLineItemIndex].quantity;
                                var comments = RfqLineItemJsonArray[rfqLineItemIndex].comments;
                                var whyThisVendor = RfqLineItemJsonArray[rfqLineItemIndex].whyThisVendor;
                                var noteToApprover = RfqLineItemJsonArray[rfqLineItemIndex].noteToApprover;
                                var awardedVendor = RfqLineItemJsonArray[rfqLineItemIndex].awardedVendor;
                                var poVendor = RfqLineItemJsonArray[rfqLineItemIndex].poVendor;
                                var remainingQuantity = RfqLineItemJsonArray[rfqLineItemIndex].remainingQuantity;
                                var poStatus = RfqLineItemJsonArray[rfqLineItemIndex].poStatus;
                                var rfqLineItemNumber = RfqLineItemJsonArray[rfqLineItemIndex].itemNumber;

                                remainingQuantity = remainingQuantity === undefined ? quantity : remainingQuantity;

                                var awardedVendorType = "";
                                var awardedVendorName = "";
                                if (poVendor !== undefined)
                                {
                                    awardedVendorType = poVendor.type;
                                    if (awardedVendorType !== "Prospect")
                                    {
                                        awardedVendorName = poVendor.firstname + " " + (poVendor.lastname === undefined ? "" : poVendor.lastname);
                                    }
                                    else
                                    {
                                        awardedVendorName = poVendor.prospectvendorname;
                                    }
                                }
                                else if (awardedVendor !== undefined)
                                {
                                    awardedVendorType = awardedVendor.type;
                                    if (awardedVendorType !== "Prospect")
                                    {
                                        awardedVendorName = awardedVendor.firstname + " " + (awardedVendor.lastname === undefined ? "" : awardedVendor.lastname);
                                    }
                                    else
                                    {
                                        awardedVendorName = awardedVendor.prospectvendorname;
                                    }
                                }
                                var tempRfqStatus = (rfqStatus === "Pending" ? "true" : "false");
                                console.log("tempRfqStatus: " + tempRfqStatus);

                                var lastFyAvgPrice = 0.0;
                                var by = "";
                                var data = "";
                                if (itemCategory === "D")
                                {
                                    by = "MatGroup";
                                    data = materialGroup;
                                }
                                else
                                {
                                    by = "MatCode";
                                    data = materialCode;
                                }
                                console.log("by: " + by);
                                console.log("data: " + data);
                                $.ajax({
                                    type: "GET",
                                    url: "rfqEvaluationGetAjaxRequest.do",
                                    async: false,
                                    data: {
                                        "reqFrom": "FindLastFYAveragePriceByMatCodeOrMatGroup",
                                        "by": by,
                                        "data": data
                                    },
                                    complete: function(responseJson) {
                                        var jsonObj = $.parseJSON(responseJson.responseText);
                                        console.log("jsonObj.lastFyAvgPrice: " + jsonObj.LastFyAvgPrice);
                                        lastFyAvgPrice = jsonObj.LastFyAvgPrice;
                                    }
                                });

                                tbody_tr += "<tr>"
                                        + "<td>"
                                        + "<input type='checkbox' class='rfq-pr-line' " + (tempRfqStatus === 'true' || Number(remainingQuantity) === 0 ? 'disabled' : '') + ">"
                                        + "<input type='hidden' class='rfq-line-id' value='" + RFQLineID + "'>"
                                        + "<input type='hidden' class='insertion-Order-Id' value='" + insertionOrderId + "'>"
                                        + "<input type='hidden' class='rfq-Id' value='" + rfqId + "'>"
                                        + "<input type='hidden' class='rfq-status' value='" + rfqStatus + "'>"
                                        + "<input type='hidden' class='rfq-number' value='" + rfqNumber + "'>"
                                        + "<input type='hidden' class='rfq-line-item-number' value='" + (rfqLineItemNumber === undefined ? '' : rfqLineItemNumber) + "'>"
                                        + "</td>"
                                        + "<td>"
                                        + "<label>RFQ No: </label> <span style='margin-left: 20px;'>" + rfqNumber + "</span>"
                                        + "<br>"
                                        + "<label>RFQ Status: </label> <span>" + rfqStatus + "</span>"
                                        + "</td>"
                                        + "<td>"
                                        + "<input type='hidden' class='insertion-Order-Id' value='" + insertionOrderId + "'>"
                                        + "<label>Material Code: </label> <span style='margin-left: 25px;'>" + materialCode + "</span>"
                                        + "<br>"
                                        + "<label>Short Text: </label> <span style='margin-left: 48px;'>" + shortText + "</span>"
                                        + "<br>"
                                        + "<label>Quantity: </label> <span style='margin-left: 57px;'>" + formatNumberByComma(Number(quantity).toFixed(2)) + "</span>"
                                        + "<br>"
                                        + "<label>Long Text: </label> <a href='#' class='longTextClass' title='PO Long Text' style='margin-left: 52px;'><i class='fa fa-file' aria-hidden='true'></i></a>"
                                        + "<br>"
                                        + "<label>Last FY Avg. Price: </label> <span>" + formatAmountByComma(Number(lastFyAvgPrice).toFixed(2)) + "</span>"
                                        + "<br>"
                                        + "<button class='btn btn-success btn-sm lastPoDetailsClass' title='Last PO Details' style='padding: 3px;font-size: 11px;'>PO Details</button>"
                                        + "</td>"
                                        + "<td>"
                                        + "<input type='text' class='remaining-quantity' max='" + remainingQuantity + "' value='" + formatNumberByComma(remainingQuantity) + "' style='width: 150px;' " + (Number(remainingQuantity) === 0 ? 'disabled' : '') + ">"
                                        + "</td>";

                                $.ajax({
                                    type: "GET",
                                    url: "rfqEvaluationGetAjaxRequest.do",
                                    async: false,
                                    data: {
                                        "reqFrom": "findSupplierHeaderByRfqId",
                                        "rfqId": rfqId
                                    },
                                    complete: function(responseJson) {
                                        var obj = $.parseJSON(responseJson.responseText);
//                                        console.log("SupplierHeaderJsonArray JSON.stringify(obj): " + JSON.stringify(obj));
                                        obj = JSON.parse(JSON.stringify(obj));
                                        var SupplierHeaderJsonArray = obj.SupplierHeaderJsonArray;
                                        console.log("SupplierHeaderJsonArray len: " + SupplierHeaderJsonArray.length);
                                        console.log("vendorIdArray len: " + vendorIdArray.length);

                                        for (var supplierHeaderIndex = 0; supplierHeaderIndex < SupplierHeaderJsonArray.length; supplierHeaderIndex++)
                                        {
                                            var supplierHeaderVendorId = SupplierHeaderJsonArray[supplierHeaderIndex].ngBpVendordetailsId.id;
                                            var supplierHeaderId = SupplierHeaderJsonArray[supplierHeaderIndex].id;
                                            console.log("supplierHeaderVendorId: " + supplierHeaderVendorId);

                                            $.ajax({
                                                type: "GET",
                                                url: "rfqEvaluationGetAjaxRequest.do",
                                                async: false,
                                                data: {
                                                    "reqFrom": "findSupplierLineItemBySupplierHeaderIdAndInsertionOrderId",
                                                    "supplierHeaderId": supplierHeaderId,
                                                    "insertionOrderId": insertionOrderId
                                                },
                                                complete: function(responseJson) {
                                                    var obj = $.parseJSON(responseJson.responseText);
//                                                    console.log("SupplierLineItem JSON.stringify(obj): " + JSON.stringify(obj));
                                                    obj = JSON.parse(JSON.stringify(obj));
                                                    var SupplierLineItemJsonArray = obj.SupplierLineItemJsonArray;
                                                    console.log("SupplierLineItemJsonArray len: " + SupplierLineItemJsonArray.length);

                                                    for (var supplierLineItemIndex = 0; supplierLineItemIndex < SupplierLineItemJsonArray.length; supplierLineItemIndex++)
                                                    {
                                                        var supplierLineItemId = SupplierLineItemJsonArray[supplierLineItemIndex].id;
                                                        console.log("supplierLineItemId: " + supplierLineItemId);

                                                        tbody_tr += "<td>"
                                                                + "<input type='hidden' class='rfq-Id' value=''>"
                                                                + "<input type='hidden' class='rfq-number' value=''>"
                                                                + "<input type='hidden' class='supplier-Id' value=''>"
                                                                + "<input type='hidden' class='supplier-code' value=''>"
                                                                + "<input type='hidden' class='supplier-Header-Id' value=''>"
                                                                + "<input type='hidden' class='supplier-LineItem-Id' value=''>"
                                                                + "<input type='hidden' class='insertion-Order-Id' value=''>"
                                                                + "<input type='hidden' class='link-Id' value=''>"
                                                                + "<input type='hidden' class='process-instance-Id' value=''>"
                                                                + "<input type='hidden' class='vendor-per-unit-price' value=''>"
                                                                + "<label>Documents:</label> <a href='#' class='view-supporting-docs' title='View & Download Supplorting Documents' style='margin-left: 104px;'><i class='fa fa-eye fa-lg' aria-hidden='true'></i></a>"
                                                                + "<br>"
                                                                + "<label>Vendor Currency:</label> <input type='text' class='vendor-currency' value='' disabled='true' style='margin-left: 70px;'>"
                                                                + "<br>"
                                                                + "<label>Price in Vendor Currency:</label> <input type='text' class='vendor-price' value='' disabled='true' style='margin-left: 24px;'>"
                                                                + "<br>"
                                                                + "<label>Price in SGD:</label> <input type='text' class='vendor-price-sgd' value='' disabled='true' style='margin-left: 93px;'>"
                                                                + "<br>"
                                                                + "<label>Final Price(Vendor Currency):</label> <input type='text' class='final-price' value=''>"
                                                                + "<br>"
                                                                + "<label>Final Financial Price:</label> <input type='text' class='final-financial-price' value='' style='margin-left: 51px;'>"
                                                                + "<br>"
                                                                + "<label>MOQ/MOV:</label> <input type='text' class='moq-mov' value='' disabled='true' style='margin-left: 104px;'>"
                                                                + "<br>"
                                                                + "<label>Lead Time:</label> <input type='text' class='lead-time' value='' disabled='true' style='margin-left: 107px;'>"
                                                                + "<br>"
                                                                + "<label>Brand:</label> <input type='text' class='brand' value='' disabled='true' style='margin-left: 133px;'>"
                                                                + "<br>"
                                                                + "<button class='btn btn-primary btn-sm view-rated-parameter-score' title='View Rated Parameter & Score'><i class='fa fa-eye fa-lg' aria-hidden='true'></i> Rated Parameter & Score</button>"
                                                                + "</td>";
                                                    }
                                                }
                                            });
                                        }
                                        if (vendorIdArray.length > SupplierHeaderJsonArray.length)
                                        {
                                            for (var i = 0; i < (vendorIdArray.length - SupplierHeaderJsonArray.length); i++)
                                            {
                                                tbody_tr += "<td>"
                                                        + "<input type='hidden' class='rfq-Id' value=''>"
                                                        + "<input type='hidden' class='rfq-number' value=''>"
                                                        + "<input type='hidden' class='supplier-Id' value=''>"
                                                        + "<input type='hidden' class='supplier-code' value=''>"
                                                        + "<input type='hidden' class='supplier-Header-Id' value=''>"
                                                        + "<input type='hidden' class='supplier-LineItem-Id' value=''>"
                                                        + "<input type='hidden' class='insertion-Order-Id' value=''>"
                                                        + "<input type='hidden' class='link-Id' value=''>"
                                                        + "<input type='hidden' class='process-instance-Id' value=''>"
                                                        + "<input type='hidden' class='vendor-per-unit-price' value=''>"
                                                        + "<label>Documents:</label> <a href='#' class='view-supporting-docs' title='View & Download Supplorting Documents'><i class='fa fa-eye fa-lg' aria-hidden='true'></i></a>"
                                                        + "<br>"
                                                        + "<label>Vendor Currency:</label> <input type='text' class='vendor-currency' value='' disabled='true'>"
                                                        + "<br>"
                                                        + "<label>Price in Vendor Currency:</label> <input type='text' class='vendor-price' value='' disabled='true'>"
                                                        + "<br>"
                                                        + "<label>Price in SGD:</label> <input type='text' class='vendor-price-sgd' value='' disabled='true'>"
                                                        + "<br>"
                                                        + "<label>Final Price(Vendor Currency):</label> <input type='text' class='final-price' value=''>"
                                                        + "<br>"
                                                        + "<label>Final Financial Price:</label> <input type='text' class='final-financial-price' value=''>"
                                                        + "<br>"
                                                        + "<label>MOQ/MOV:</label> <input type='text' class='moq-mov' value='' disabled='true'>"
                                                        + "<br>"
                                                        + "<label>Lead Time:</label> <input type='text' class='lead-time' value='' disabled='true'>"
                                                        + "<br>"
                                                        + "<label>Brand:</label> <input type='text' class='brand' value='' disabled='true'>"
                                                        + "<br>"
                                                        + "<button class='btn btn-primary btn-sm view-rated-parameter-score' title='View Rated Parameter & Score'><i class='fa fa-eye fa-lg' aria-hidden='true'></i> Rated Parameter & Score</button>"
                                                        + "</td>";
                                            }
                                        }
                                    }
                                });
                                tbody_tr += "<td>" + (poStatus !== undefined ? poStatus : '') + "</td>";
                                tbody_tr += "<td>"
                                        + "<input type='hidden' class='rfq-line-id' value='" + RFQLineID + "'>"
                                        + "<div class='awarded-vendor-div' style='max-width: 100%;'>" + awardedVendorName + "</div>"
                                        + awardedVendorSelectBox
                                        + "</td>";

                                tbody_tr += "<td>"
                                        + "<input type='hidden' class='rfq-line-id' value='" + RFQLineID + "'>"
                                        + "<textarea class='note-to-approver' cols='40' rows='10' class=''>" + (noteToApprover === undefined ? "" : noteToApprover) + "</textarea>"
                                        + "</td>";

                                tbody_tr += "<td>"
                                        + "<input type='hidden' class='rfq-line-id' value='" + RFQLineID + "'>"
                                        + "<textarea class='comments' cols='40' rows='10' class=''>" + (comments === undefined ? "" : comments) + "</textarea>"
                                        + "</td>";

                                tbody_tr += "<td>"
                                        + "<input type='hidden' class='rfq-line-id' value='" + RFQLineID + "'>"
                                        + "<textarea class='why-this-vendor' cols='40' rows='10' class=''>" + (whyThisVendor === undefined ? "" : whyThisVendor) + "</textarea>"
                                        + "</td>";

                                tbody_tr += "</tr>";
                            }
                        }
                    });
                }

                console.log("tbody_tr: " + tbody_tr);
                console.log("vendorIdArray: " + vendorIdArray);
                console.log("supplierHeaderIdArray: " + supplierHeaderIdArray);

                $("#vendorComparisonFinalizationReportTable tbody").append(tbody_tr);

                $("#rfqVendorList").append(rfqVendorListOption);
                $("#rfqVendorList").selectpicker("refresh");

                $("#summaryOfQuotation").removeClass("disabled");
                $("#summaryOfQuotation").prop("href", "downloadRfqEvalCompExlReport.do?rfqIds=" + rfqIds);

                $("#vendorSelectionCriteria").removeClass("disabled");
                $("#vendorSelectionCriteria").prop("href", "downloadRfqEvalVendorCompPdfReport.do?rfqIds=" + rfqIds);

                $("#reponseManagementBtn").removeClass("disabled");
                $("#createPoBtn").prop("disabled", false);

                var vendorTotalPriceInVendorCurrMap = {};
                var vendorTotalPriceInSGDMap = {};
                var vendorTotalFinalFinancialPriceMap = {};
                var vendorTotalFinalPriceMap = {};
                $("#vendorComparisonFinalizationReportTable tbody tr").each(function() {
                    var currentTr = $(this);
                    var rfqId = $(this).find("td").eq(0).children(".rfq-Id").val();
                    var insertionOrderId = $(this).find("td").eq(0).children(".insertion-Order-Id").val();
                    console.log("rfqId: " + rfqId);
                    console.log("insertionOrderId: " + insertionOrderId);

                    for (var i = 0; i < vendorIdArray.length; i++)
                    {
                        var vendorId = vendorIdArray[i];
                        console.log("vendorId: " + vendorId);

                        var supplierHeaderId = "";
                        $.ajax({
                            type: "GET",
                            url: "rfqEvaluationGetAjaxRequest.do",
                            async: false,
                            data: {
                                "reqFrom": "findSupplierHeaderByVendorIdAndRfqId",
                                "rfqId": rfqId,
                                "vendorId": vendorId
                            },
                            complete: function(responseJson) {
                                var obj = $.parseJSON(responseJson.responseText);
                                obj = JSON.parse(JSON.stringify(obj));
                                var SupplierHeaderJsonArray = obj.SupplierHeaderJsonArray;
                                console.log("SupplierHeaderJsonArray len: " + SupplierHeaderJsonArray.length);

                                for (var supplierHeaderIndex = 0; supplierHeaderIndex < SupplierHeaderJsonArray.length; supplierHeaderIndex++)
                                {
                                    supplierHeaderId = SupplierHeaderJsonArray[supplierHeaderIndex].id;
                                    var supplierCode = SupplierHeaderJsonArray[supplierHeaderIndex].ngBpVendordetailsId.code;
                                    var rfqNumber = SupplierHeaderJsonArray[supplierHeaderIndex].ngBpWorkorderrfqheaderRfqid.rfqNumber;
                                    console.log("supplierHeaderId: " + supplierHeaderId);

                                    $.ajax({
                                        type: "GET",
                                        url: "rfqEvaluationGetAjaxRequest.do",
                                        async: false,
                                        data: {
                                            "reqFrom": "findSupplierLineItemBySupplierHeaderIdAndInsertionOrderId",
                                            "supplierHeaderId": supplierHeaderId,
                                            "insertionOrderId": insertionOrderId
                                        },
                                        complete: function(responseJson) {
                                            var obj = $.parseJSON(responseJson.responseText);
                                            obj = JSON.parse(JSON.stringify(obj));
                                            var SupplierLineItemJsonArray = obj.SupplierLineItemJsonArray;
                                            console.log("SupplierLineItemJsonArray len: " + SupplierLineItemJsonArray.length);
                                            if (SupplierLineItemJsonArray.length > 0)
                                            {
                                                for (var supplierLineItemIndex = 0; supplierLineItemIndex < SupplierLineItemJsonArray.length; supplierLineItemIndex++)
                                                {
                                                    var supplierLineItemId = SupplierLineItemJsonArray[supplierLineItemIndex].id;
                                                    var vendorPriceOfferedTotal = SupplierLineItemJsonArray[supplierLineItemIndex].vendorpriceofferedtotal;
                                                    var vendorPriceOfferedPerUnit = SupplierLineItemJsonArray[supplierLineItemIndex].vendorpriceofferedperunit;
                                                    var buyerBaselinePrice = SupplierLineItemJsonArray[supplierLineItemIndex].buyerBaselinePrice;
                                                    var buyerFinalFinancialPrice = SupplierLineItemJsonArray[supplierLineItemIndex].buyerFinalFinancialPrice;
                                                    var brand = SupplierLineItemJsonArray[supplierLineItemIndex].brand;
                                                    var leadTime = SupplierLineItemJsonArray[supplierLineItemIndex].leadTime;
                                                    var moqMov = SupplierLineItemJsonArray[supplierLineItemIndex].moqMov;
                                                    var currency = SupplierLineItemJsonArray[supplierLineItemIndex].currency;
                                                    var linkId = SupplierLineItemJsonArray[supplierLineItemIndex].ngBpNewgenPRLineItemId.linkId;
                                                    var procInstId = SupplierLineItemJsonArray[supplierLineItemIndex].ngBpNewgenPRLineItemId.procInstId;
                                                    var vendorPriceInSGD = "";

                                                    console.log("vendorPriceOfferedTotal: " + vendorPriceOfferedTotal);
                                                    console.log("vendorPriceOfferedPerUnit: " + vendorPriceOfferedPerUnit);
                                                    console.log("buyerBaselinePrice: " + buyerBaselinePrice);
                                                    console.log("buyerFinalFinancialPrice: " + buyerFinalFinancialPrice);
                                                    console.log("currency: " + currency);

                                                    currentTr.find("td").eq(3 + (i + 1)).children(".rfq-Id").val(rfqId);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".rfq-number").val(rfqNumber);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".supplier-Id").val(vendorId);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".supplier-code").val(supplierCode);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".supplier-Header-Id").val(supplierHeaderId);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".supplier-LineItem-Id").val(supplierLineItemId);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".insertion-Order-Id").val(insertionOrderId);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".link-Id").val(linkId);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".process-instance-Id").val(procInstId);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".vendor-currency").val(currency);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".moq-mov").val(moqMov);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".lead-time").val(leadTime);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".brand").val(brand);
                                                    currentTr.find("td").eq(3 + (i + 1)).children(".vendor-per-unit-price").val(vendorPriceOfferedPerUnit);

                                                    if (buyerFinalFinancialPrice !== undefined && buyerFinalFinancialPrice !== 0)
                                                    {
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".final-financial-price").val(formatAmountByComma(Number(buyerFinalFinancialPrice).toFixed(2)));
                                                    }
                                                    else
                                                    {
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".final-financial-price").val("0.00");
                                                    }

                                                    if (buyerBaselinePrice !== undefined && buyerBaselinePrice !== 0)
                                                    {
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".final-price").val(formatAmountByComma(Number(buyerBaselinePrice).toFixed(2)));
                                                    }
                                                    else
                                                    {
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".final-price").val("0.00");
                                                    }

                                                    if (vendorPriceOfferedTotal !== undefined && vendorPriceOfferedTotal !== 0)
                                                    {
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".vendor-price").val(formatAmountByComma(vendorPriceOfferedTotal));
                                                    }
                                                    else
                                                    {
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".vendor-price").val("0.00");
                                                    }

                                                    if (currency === "SGD")
                                                    {
                                                        vendorPriceInSGD = vendorPriceOfferedTotal;
                                                    }
                                                    else
                                                    {
                                                        if (currency !== undefined && currency !== "")
                                                        {
                                                            var exchangeRate = getExchangeRate("SGD", currency);
                                                            if (exchangeRate !== undefined && exchangeRate !== "")
                                                            {
                                                                vendorPriceInSGD = Number(vendorPriceOfferedTotal) * Number(exchangeRate);
                                                            }
                                                        }
                                                        else
                                                        {
                                                            vendorPriceInSGD = 0;
                                                        }
                                                    }
                                                    if (vendorPriceInSGD !== undefined && vendorPriceInSGD !== 0)
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".vendor-price-sgd").val(formatAmountByComma(vendorPriceInSGD));
                                                    else
                                                        currentTr.find("td").eq(3 + (i + 1)).children(".vendor-price-sgd").val("0.00");

                                                    // Sum of Price in Vendor Currency    
                                                    if (vendorTotalPriceInVendorCurrMap[vendorId] !== undefined)
                                                    {
                                                        if (vendorPriceOfferedTotal !== undefined)
                                                            vendorTotalPriceInVendorCurrMap[vendorId] = Number(vendorTotalPriceInVendorCurrMap[vendorId]) + Number(vendorPriceOfferedTotal);
                                                        else
                                                            vendorTotalPriceInVendorCurrMap[vendorId] = Number(vendorTotalPriceInVendorCurrMap[vendorId]);
                                                    }
                                                    else
                                                    {
                                                        if (vendorPriceOfferedTotal !== undefined)
                                                            vendorTotalPriceInVendorCurrMap[vendorId] = vendorPriceOfferedTotal;
                                                        else
                                                            vendorTotalPriceInVendorCurrMap[vendorId] = 0;
                                                    }

                                                    // Sum of Price in SGD
                                                    if (vendorTotalPriceInSGDMap[vendorId] !== undefined)
                                                    {
                                                        if (vendorPriceInSGD !== undefined)
                                                            vendorTotalPriceInSGDMap[vendorId] = Number(vendorTotalPriceInSGDMap[vendorId]) + Number(vendorPriceInSGD);
                                                        else
                                                            vendorTotalPriceInSGDMap[vendorId] = Number(vendorTotalPriceInSGDMap[vendorId]);
                                                    }
                                                    else
                                                    {
                                                        if (vendorPriceInSGD !== undefined)
                                                            vendorTotalPriceInSGDMap[vendorId] = vendorPriceInSGD;
                                                        else
                                                            vendorTotalPriceInSGDMap[vendorId] = 0;
                                                    }

                                                    // Sum of Final Price(Vendor Currency)
                                                    if (vendorTotalFinalPriceMap[vendorId] !== undefined)
                                                    {
                                                        if (buyerBaselinePrice !== undefined)
                                                            vendorTotalFinalPriceMap[vendorId] = Number(vendorTotalFinalPriceMap[vendorId]) + Number(buyerBaselinePrice);
                                                        else
                                                            vendorTotalFinalPriceMap[vendorId] = Number(vendorTotalFinalPriceMap[vendorId]);
                                                    }
                                                    else
                                                    {
                                                        if (buyerBaselinePrice !== undefined)
                                                            vendorTotalFinalPriceMap[vendorId] = buyerBaselinePrice;
                                                        else
                                                            vendorTotalFinalPriceMap[vendorId] = 0;
                                                    }

                                                    // Sum of Final Financial Price
                                                    if (vendorTotalFinalFinancialPriceMap[vendorId] !== undefined)
                                                    {
                                                        if (buyerFinalFinancialPrice !== undefined)
                                                            vendorTotalFinalFinancialPriceMap[vendorId] = Number(vendorTotalFinalFinancialPriceMap[vendorId]) + Number(buyerFinalFinancialPrice);
                                                        else
                                                            vendorTotalFinalFinancialPriceMap[vendorId] = Number(vendorTotalFinalFinancialPriceMap[vendorId]);
                                                    }
                                                    else
                                                    {
                                                        if (buyerFinalFinancialPrice !== undefined)
                                                            vendorTotalFinalFinancialPriceMap[vendorId] = buyerFinalFinancialPrice;
                                                        else
                                                            vendorTotalFinalFinancialPriceMap[vendorId] = 0;
                                                    }
                                                    console.log("vendorId: " + vendorId + ", vendorTotalPriceInVendorCurrMap[vendorId]: " + vendorTotalPriceInVendorCurrMap[vendorId]);
                                                    console.log("vendorId: " + vendorId + ", vendorTotalPriceInSGDMap[vendorId]: " + vendorTotalPriceInSGDMap[vendorId]);
                                                    console.log("vendorId: " + vendorId + ", vendorTotalFinalPriceMap[vendorId]: " + vendorTotalFinalPriceMap[vendorId]);
                                                    console.log("vendorId: " + vendorId + ", vendorTotalFinalFinancialPriceMap[vendorId]: " + vendorTotalFinalFinancialPriceMap[vendorId]);
                                                }
                                            }
                                            else
                                            {
//                                                currentTr.find("td").eq(3 + (i + 1)).children(".supplier-LineItem-Id").val("");
//                                                currentTr.find("td").eq(3 + (i + 1)).children(".vendor-currency").val("");
//                                                currentTr.find("td").eq(3 + (i + 1)).children(".vendor-price").val("");
//                                                currentTr.find("td").eq(3 + (i + 1)).children(".moq-mov").val("");
//                                                currentTr.find("td").eq(3 + (i + 1)).children(".lead-time").val("");
//                                                currentTr.find("td").eq(3 + (i + 1)).children(".brand").val("");
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });

                $("#vendorComparisonFinalizationReportTable tbody tr").each(function() {
                    for (var i = 0; i < vendorIdArray.length; i++)
                    {
                        var supplierLineItemId = $(this).find("td").eq(3 + (i + 1)).children(".supplier-LineItem-Id").val();
                        if (supplierLineItemId === "")
                        {
//                            $(this).find("td").eq(3 + (i + 1)).children(".vendor-currency").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".vendor-price").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".vendor-price-sgd").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".final-price").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".final-financial-price").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".moq-mov").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".lead-time").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".brand").prop("disabled", true);
//                            $(this).find("td").eq(3 + (i + 1)).children(".view-supporting-docs").css("pointer-events", "none");

                            $(this).find("td").eq(3 + (i + 1)).children().remove();
                        }
                    }
                });

                console.log("vendorTotalPriceInVendorCurrMap: " + vendorTotalPriceInVendorCurrMap);
                console.log("vendorTotalPriceInSGDMap: " + vendorTotalPriceInSGDMap);

                tbody_tr = "";
                tbody_tr += "<tr>"
                        + "<td colspan='4'><h3>Total Price</h3></td>";

                for (var i = 0; i < vendorIdArray.length; i++)
                {
                    console.log("i: " + i + ", vendorTotalPriceInVendorCurrMap: " + vendorTotalPriceInVendorCurrMap[vendorIdArray[i]]);
                    console.log("i: " + i + ", vendorTotalPriceInSGDMap: " + vendorTotalPriceInSGDMap[vendorIdArray[i]]);
                    console.log("vendorId: " + i + ", vendorTotalFinalPriceMap[vendorId]: " + vendorTotalFinalPriceMap[vendorId]);
                    console.log("vendorId: " + i + ", vendorTotalFinalFinancialPriceMap[vendorId]: " + vendorTotalFinalFinancialPriceMap[vendorId]);

                    tbody_tr += "<td>"
                            + "<label>Total Price in Vendor Currency:</label> <input type='text' class='total-vendor-price' value='" + (vendorTotalPriceInVendorCurrMap[vendorIdArray[i]] === undefined ? "0.00" : formatAmountByComma(Number(vendorTotalPriceInVendorCurrMap[vendorIdArray[i]].toString().trim()).toFixed(2))) + "' disabled='true' style='margin-left: 23px;'>"
                            + "<br>"
                            + "<label>Total Price in SGD:</label> <input type='text' class='total-vendor-price-sgd' value='" + (vendorTotalPriceInSGDMap[vendorIdArray[i]] === undefined ? "0.00" : formatAmountByComma(Number(vendorTotalPriceInSGDMap[vendorIdArray[i]].toString().trim()).toFixed(2))) + "' disabled='true' style='margin-left: 93px;'>"
                            + "<br>"
                            + "<label>Total Final Price(Vendor Currency):</label> <input type='text' class='total-final-price' value='" + (vendorTotalFinalPriceMap[vendorIdArray[i]] === undefined ? "0.00" : formatAmountByComma(Number(vendorTotalFinalPriceMap[vendorIdArray[i]].toString().trim()).toFixed(2))) + "' disabled='true'>"
                            + "<br>"
                            + "<label>Total Final Financial Price:</label> <input type='text' class='total-final-financial-price' value='" + (vendorTotalFinalFinancialPriceMap[vendorIdArray[i]] === undefined ? "0.00" : formatAmountByComma(Number(vendorTotalFinalFinancialPriceMap[vendorIdArray[i]].toString().trim()).toFixed(2))) + "' disabled='true' style='margin-left: 51px;'>"
                            + "</td>";
                }
                tbody_tr += "<td colspan='5'></td>";
                tbody_tr += "</tr>";

                $("#vendorComparisonFinalizationReportTable tbody").append(tbody_tr);

                $("#overlay").css("display", "none");
            }
        });
    });

    $("#vendorComparisonFinalizationReportTable").on("click", ".view-rated-parameter-score", function() {
        var rfqId = $(this).parent().children(".rfq-Id").val();
        var supplierId = $(this).parent().children(".supplier-Id").val();
        var supplierHeaderId = $(this).parent().children(".supplier-Header-Id").val();
        var supplierLineItemId = $(this).parent().children(".supplier-LineItem-Id").val();
        var insertionOrderId = $(this).parent().children(".insertion-Order-Id").val();

        console.log("supplierHeaderId: " + supplierHeaderId);

        $("#rfqId_RP_Modal").val(rfqId);
        $("#supplierId_RP_Modal").val(supplierId);
        $("#supplierHeaderId_RP_Modal").val(supplierHeaderId);
        $("#supplierLineItemId_RP_Modal").val(supplierLineItemId);
        $("#insertionOrderId_RP_Modal").val(insertionOrderId);

        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "rfqEvaluationGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "findSupplierHeaderById",
                "supplierHeaderId": supplierHeaderId
            },
            complete: function(responseJson) {
                var supplierHeaderJsonObj = $.parseJSON(responseJson.responseText);
//                console.log("supplierHeaderJsonObj JSON.stringify(supplierHeaderJsonObj): " + JSON.stringify(supplierHeaderJsonObj));
                console.log("RatedParamtereNo: " + $("#viewRatedParameterAndScoreModalTable tbody tr").length);

                $("#viewRatedParameterAndScoreModalTable tbody tr").each(function(index) {
//                    console.log("index: " + index);
                    $(this).find("td").eq(1).children(".rated-parameter-score").val("");
                    $(this).find("td").eq(2).children(".rated-parameter-weight").text("");
                    $(this).find("td").eq(3).children(".rated-parameter-description").val("");
                    if (index > 5)
                    {
                        $(this).remove();
                    }
                });
                $("#viewRatedParameterAndScoreModalTable tbody tr").each(function() {
                    var rateParameterType = $(this).find("td").eq(1).children(".rated-parameter-type").val();
                    console.log("rateParameterType: " + rateParameterType);
                    if (rateParameterType === "MoqMovRP")
                    {
                        $(this).find("td").eq(1).children(".rated-parameter-score").val(supplierHeaderJsonObj.buyerMoqmovDetailsRatedParameterScore);
                        $(this).find("td").eq(2).children(".rated-parameter-weight").text(supplierHeaderJsonObj.buyerMoqmovDetailsRatedParameterWeight);

                        console.log("supplierHeaderJsonObj.buyerMoqmovDetailsRatedParameter: " + supplierHeaderJsonObj.buyerMoqmovDetailsRatedParameter);
                        if (supplierHeaderJsonObj.buyerMoqmovDetailsRatedParameter !== undefined && supplierHeaderJsonObj.buyerMoqmovDetailsRatedParameter !== "")
                            $(this).find("td").eq(3).children(".rated-parameter-description").val(supplierHeaderJsonObj.buyerMoqmovDetailsRatedParameter);
                        else
                            $(this).find("td").eq(3).children(".rated-parameter-description").val("");

                    }
                    else if (rateParameterType === "DeliveryLeadTimeRP")
                    {
                        $(this).find("td").eq(1).children(".rated-parameter-score").val(supplierHeaderJsonObj.buyerDeliveryLeadtimeRatedParameterScore);
                        $(this).find("td").eq(2).children(".rated-parameter-weight").text(supplierHeaderJsonObj.buyerDeliveryLeadtimeRatedParameterWeight);

                        console.log("supplierHeaderJsonObj.buyerDeliveryLeadtimeRatedParameter: " + supplierHeaderJsonObj.buyerDeliveryLeadtimeRatedParameter);
                        if (supplierHeaderJsonObj.buyerDeliveryLeadtimeRatedParameter !== undefined && supplierHeaderJsonObj.buyerDeliveryLeadtimeRatedParameter !== "")
                            $(this).find("td").eq(3).children(".rated-parameter-description").val(supplierHeaderJsonObj.buyerDeliveryLeadtimeRatedParameter);
                        else
                            $(this).find("td").eq(3).children(".rated-parameter-description").val("");

                    }
                    else if (rateParameterType === "PaymentTermsRP")
                    {
                        $(this).find("td").eq(1).children(".rated-parameter-score").val(supplierHeaderJsonObj.buyerPaymentTermsRatedParameterScore);
                        $(this).find("td").eq(2).children(".rated-parameter-weight").text(supplierHeaderJsonObj.buyerPaymentTermsRatedParameterWeight);

                        console.log("supplierHeaderJsonObj.buyerPaymentTermsRatedParameter: " + supplierHeaderJsonObj.buyerPaymentTermsRatedParameter);
                        if (supplierHeaderJsonObj.buyerPaymentTermsRatedParameter !== undefined && supplierHeaderJsonObj.buyerPaymentTermsRatedParameter !== "")
                            $(this).find("td").eq(3).children(".rated-parameter-description").val(supplierHeaderJsonObj.buyerPaymentTermsRatedParameter);
                        else
                            $(this).find("td").eq(3).children(".rated-parameter-description").val("");

                    }
                    else if (rateParameterType === "BrandModelRP")
                    {
                        $(this).find("td").eq(1).children(".rated-parameter-score").val(supplierHeaderJsonObj.buyerBrandModelRatedParameterScore);
                        $(this).find("td").eq(2).children(".rated-parameter-weight").text(supplierHeaderJsonObj.buyerBrandModelRatedParameterWeight);

                        console.log("supplierHeaderJsonObj.buyerBrandModelRatedParameter: " + supplierHeaderJsonObj.buyerBrandModelRatedParameter);
                        if (supplierHeaderJsonObj.buyerBrandModelRatedParameter !== undefined && supplierHeaderJsonObj.buyerBrandModelRatedParameter !== "")
                            $(this).find("td").eq(3).children(".rated-parameter-description").val(supplierHeaderJsonObj.buyerBrandModelRatedParameter);
                        else
                            $(this).find("td").eq(3).children(".rated-parameter-description").val("");

                    }
                    else if (rateParameterType === "IncotermsRP")
                    {
                        $(this).find("td").eq(1).children(".rated-parameter-score").val(supplierHeaderJsonObj.buyerIncotermsRatedParameterScore);
                        $(this).find("td").eq(2).children(".rated-parameter-weight").text(supplierHeaderJsonObj.buyerIncotermsRatedParameterWeight);

                        console.log("supplierHeaderJsonObj.buyerIncotermsRatedParameter: " + supplierHeaderJsonObj.buyerIncotermsRatedParameter);
                        if (supplierHeaderJsonObj.buyerIncotermsRatedParameter !== undefined && supplierHeaderJsonObj.buyerIncotermsRatedParameter !== "")
                            $(this).find("td").eq(3).children(".rated-parameter-description").val(supplierHeaderJsonObj.buyerIncotermsRatedParameter);
                        else
                            $(this).find("td").eq(3).children(".rated-parameter-description").val("");
                    }
                    else if (rateParameterType === "ValidityOfOfferRP")
                    {
                        $(this).find("td").eq(1).children(".rated-parameter-score").val(supplierHeaderJsonObj.buyerValidityofferRatedParameterScore);
                        $(this).find("td").eq(2).children(".rated-parameter-weight").text(supplierHeaderJsonObj.buyerValidityofferRatedParameterWeight);

                        console.log("supplierHeaderJsonObj.buyerValidityofferRatedParameter: " + supplierHeaderJsonObj.buyerValidityofferRatedParameter);
                        if (supplierHeaderJsonObj.buyerValidityofferRatedParameter !== undefined && supplierHeaderJsonObj.buyerValidityofferRatedParameter !== "")
                            $(this).find("td").eq(3).children(".rated-parameter-description").val(supplierHeaderJsonObj.buyerValidityofferRatedParameter);
                        else
                            $(this).find("td").eq(3).children(".rated-parameter-description").val("");
                    }
                });

                $.ajax({
                    type: "GET",
                    url: "rfqEvaluationGetAjaxRequest.do",
                    async: false,
                    data: {
                        "reqFrom": "findSupplierHeaderRatedParamterByRfqId",
                        "rfqId": rfqId
                    },
                    complete: function(responseJson) {
                        var ratedParameterMappingJsonArray = $.parseJSON(responseJson.responseText);
                        ratedParameterMappingJsonArray = JSON.parse(JSON.stringify(ratedParameterMappingJsonArray));
                        console.log("ratedParameterMappingJsonArray len: " + ratedParameterMappingJsonArray.length);
                        var row = "";
                        for (var i = 0; i < ratedParameterMappingJsonArray.length; i++)
                        {
                            row += "<tr><td>"
                                    + "<a href='#' title='Save' class='save-new-rated-parameter'><i class='fa fa-save fa-2x' aria-hidden='true'></i></a> "
                                    + "<a href='#' title='Delete' class='delete-new-rated-parameter'><i class='fa fa-trash' aria-hidden='true'></i></a>"
                                    + "<input type='text' class='extra-rated-parameter form-control' value='" + ratedParameterMappingJsonArray[i].ratedParameter + "'>"
                                    + "</td>"
                                    + "<td>"
                                    + "<input type='hidden' class='extra-rated-parameter-mappingId' value='" + ratedParameterMappingJsonArray[i].id + "'>"
                                    + "<select class='custom-select extra-score-select'><option value='" + ratedParameterMappingJsonArray[i].ratedParameterScore + "'>" + ratedParameterMappingJsonArray[i].ratedParameterScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select>"
                                    + "</td>"
                                    + "<td></td>"
                                    + "<td style='text-align: center;'>"
                                    + "<input type='hidden' class='extra-rated-parameter-mappingId' value='" + ratedParameterMappingJsonArray[i].id + "'>"
                                    + "<textarea class='extra-rated-paramter-desc' cols='80' rows='3'>" + ratedParameterMappingJsonArray[i].description + "</textarea>"
                                    + "</td></tr>";
                        }
//                        console.log("row: " + row);
                        $("#viewRatedParameterAndScoreModalTable tbody").append(row);
                    }
                });

                $("#overlay").css("display", "none");
                $("#viewRatedParameterAndScoreModal").modal("show");
            }
        });
    });

    $("#viewRatedParameterAndScoreModalTable").on("change", ".rated-parameter-score", function() {

        var rfqId = $("#rfqId_RP_Modal").val();
        var vendorId = $("#supplierId_RP_Modal").val();

        var score = $(this).val();
        console.log("score: " + score);
        if (score !== "")
        {
            $("#viewRatedParameterAndScoreModal").modal("hide");
            $("#overlay").css("display", "block");

            var parameterType = $(this).parent().children(".rated-parameter-type").val();
            console.log("parameterType: " + parameterType);

            if (parameterType === "MoqMovRP")
            {
                parameterType = "MoqMov";
            }
            else if (parameterType === "DeliveryLeadTimeRP")
            {
                parameterType = "DLT";
            }
            else if (parameterType === "PaymentTermsRP")
            {
                parameterType = "PT";
            }
            else if (parameterType === "BrandModelRP")
            {
                parameterType = "BrandModel";
            }
            else if (parameterType === "IncotermsRP")
            {
                parameterType = "Incoterm";
            }
            else if (parameterType === "ValidityOfOfferRP")
            {
                parameterType = "VOO";
            }

            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: true,
                data: {
                    "reqFrom": "UpdateBuyerRatedParameterScore",
                    "rfqId": rfqId,
                    "vendorId": vendorId,
                    "parameterType": parameterType,
                    "score": score
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    $("#overlay").css("display", "none");
                    $("#viewRatedParameterAndScoreModal").modal("show");
                }
            });
        }
    });

    $("#viewRatedParameterAndScoreModalTable").on("change", ".rated-parameter-description", function() {

        var rfqId = $("#rfqId_RP_Modal").val();
        var vendorId = $("#supplierId_RP_Modal").val();

        var rated_parameter_value = $(this).val();
        console.log("rated_parameter_value: " + rated_parameter_value);

        if (rated_parameter_value !== "")
        {
            $("#viewRatedParameterAndScoreModal").modal("hide");
            $("#overlay").css("display", "block");

            var parameterType = $(this).parent().children(".rated-parameter-type").val();
            console.log("parameterType: " + parameterType);

            if (parameterType === "MoqMovRP")
            {
                parameterType = "MoqMov";
            }
            else if (parameterType === "DeliveryLeadTimeRP")
            {
                parameterType = "DLT";
            }
            else if (parameterType === "PaymentTermsRP")
            {
                parameterType = "PT";
            }
            else if (parameterType === "BrandModelRP")
            {
                parameterType = "BrandModel";
            }
            else if (parameterType === "IncotermsRP")
            {
                parameterType = "Incoterm";
            }
            else if (parameterType === "ValidityOfOfferRP")
            {
                parameterType = "VOO";
            }

            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: true,
                data: {
                    "reqFrom": "UpdateBuyerRatedParameter",
                    "rfqId": rfqId,
                    "vendorId": vendorId,
                    "parameterType": parameterType,
                    "parameterValue": rated_parameter_value
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    $("#overlay").css("display", "none");
                    $("#viewRatedParameterAndScoreModal").modal("show");
                }
            });
        }
    });
    $("#addNewRatedParameter").click(function() {
        var row = "<tr>";
        row += "<td>"
                + "<a href='#' title='Save' class='save-new-rated-parameter'><i class='fa fa-save fa-2x' aria-hidden='true'></i></a> "
                + "<a href='#' title='Delete' class='delete-new-rated-parameter'><i class='fa fa-trash' aria-hidden='true'></i></a>"
                + "<input type='text' class='extra-rated-parameter form-control' placeholder='Enter parameter name'>"
                + "</td>"
                + "<td>"
                + "<input type='hidden' class='extra-rated-parameter-mappingId'>"
                + "<select class='custom-select extra-score-select'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select>"
                + "</td>"
                + "<td></td>"
                + "<td style='text-align: center;'>"
                + "<input type='hidden' class='extra-rated-parameter-mappingId'>"
                + "<textarea class='extra-rated-paramter-desc' cols='80' rows='3'></textarea>"
                + "</td>";
        row += "</tr>";
        console.log("row: " + row);
        $("#viewRatedParameterAndScoreModalTable tbody").append(row);
    });
    $("#viewRatedParameterAndScoreModalTable").on("click", ".save-new-rated-parameter", function() {
        var currentTr = $(this).parent().parent();
        var rfqId = $("#rfqId_RP_Modal").val();
        var vendorId = $("#supplierId_RP_Modal").val();
        var extraRatedParameter = $(this).parent().children(".extra-rated-parameter").val();
        var extraRatedParameterMappingId = $(this).parent().parent().find("td").eq(1).children(".extra-rated-parameter-mappingId").val();
        var extraRatedParameterScore = $(this).parent().parent().find("td").eq(1).children(".extra-score-select").val();
        var extraRatedParameterDesc = $(this).parent().parent().find("td").eq(3).children(".extra-rated-paramter-desc").val();

        console.log("rfqId: " + rfqId);
        console.log("vendorId: " + vendorId);
        console.log("extraRatedParameter: " + extraRatedParameter);
        console.log("extraRatedParameterMappingId: " + extraRatedParameterMappingId);
        console.log("extraRatedParameterScore: " + extraRatedParameterScore);
        console.log("extraRatedParameterDesc: " + extraRatedParameterDesc);

        if (extraRatedParameter.toString().trim() === "")
        {
            $(this).parent().children(".extra-rated-parameter").focus();
            return false;
        }
        else if (extraRatedParameterScore === "")
        {
            $(this).parent().parent().find("td").eq(1).children(".extra-score-select").focus();
            return false;
        }
        else if (extraRatedParameterDesc === "")
        {
            $(this).parent().parent().find("td").eq(3).children(".extra-rated-paramter-desc").focus();
            return false;
        }
        else
        {
            $("#viewRatedParameterAndScoreModal").modal("hide");

            var extraaRatedParameterDetailsAsJsonArr = [];
            var extraaRatedParameterDetailsAsJsonObj = {};

            extraaRatedParameterDetailsAsJsonObj["MappingId"] = extraRatedParameterMappingId;
            extraaRatedParameterDetailsAsJsonObj["VendorId"] = vendorId;
            extraaRatedParameterDetailsAsJsonObj["RatedParameter"] = extraRatedParameter;
            extraaRatedParameterDetailsAsJsonObj["Score"] = extraRatedParameterScore;
            extraaRatedParameterDetailsAsJsonObj["RatedParameterDesc"] = extraRatedParameterDesc;

            extraaRatedParameterDetailsAsJsonArr.push(extraaRatedParameterDetailsAsJsonObj);

            var extraaRatedParameterDetailsAsJsonArrString = JSON.stringify(extraaRatedParameterDetailsAsJsonArr);
            console.log("extraaRatedParameterDetailsAsJsonArrString: " + extraaRatedParameterDetailsAsJsonArrString);

            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "SaveExtraaRatedParameter",
                    "rfqId": rfqId,
                    "extraaRatedParameterDetailsAsJsonArrString": extraaRatedParameterDetailsAsJsonArrString
                },
                beforeSend: function() {
                    $("#overlay").css("display", "block");
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                complete: function(responseJson) {
                    $("#overlay").css("display", "none");
                    var obj = $.parseJSON(responseJson.responseText);

                    console.log("Result: " + obj.Result);
                    console.log("MappingIds: " + obj.MappingIds.length);

                    for (var i = 0; i < obj.MappingIds.length; i++)
                    {
                        currentTr.find("td").eq(1).children(".extra-rated-parameter-mappingId").val(obj.MappingIds[i]);
                        currentTr.find("td").eq(3).children(".extra-rated-parameter-mappingId").val(obj.MappingIds[i]);
                    }

                    $("#viewRatedParameterAndScoreModal").modal("show");

                    Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                            {
                                msg: "Data saved successfully."
                            });
                }
            });
        }
    });

    $("#viewRatedParameterAndScoreModalTable").on("click", ".delete-new-rated-parameter", function() {
        var currentTr = $(this).parent().parent();
        var rfqId = $("#rfqId_RP_Modal").val();
        var extraRatedParameterMappingId = $(this).parent().parent().find("td").eq(1).children(".extra-rated-parameter-mappingId").val();

        console.log("rfqId: " + rfqId);
        console.log("extraRatedParameterMappingId: " + extraRatedParameterMappingId);

        if (extraRatedParameterMappingId !== "")
        {
            $("#viewRatedParameterAndScoreModal").modal("hide");

            var mappingIdAsJsonArr = [];
            var mappingIdAsJsonObj = {};
            mappingIdAsJsonObj["MappingId"] = extraRatedParameterMappingId;
            mappingIdAsJsonArr.push(mappingIdAsJsonObj);

            var mappingIdAsJsonArrString = JSON.stringify(mappingIdAsJsonArr);
            console.log("mappingIdAsJsonArrString: " + mappingIdAsJsonArrString);

            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "DeleteExtraaRatedParameter",
                    "rfqId": rfqId,
                    "mappingIdAsJsonArrString": mappingIdAsJsonArrString
                },
                beforeSend: function() {
                    $("#overlay").css("display", "block");
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                complete: function(responseJson) {
                    $("#overlay").css("display", "none");
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Result: " + obj.Result);
                    currentTr.remove();
                    $("#viewRatedParameterAndScoreModal").modal("show");
                    Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                            {
                                msg: "Rated Parameter deleted Successfully."
                            });
                }
            });
        }
        else
        {
            currentTr.remove();
        }
    });
    $("#vendorComparisonFinalizationReportTable").on("click", ".longTextClass", function() {
        var prLineInsertionOrderId = $(this).parent().children(".insertion-Order-Id").val();
        console.log("prLineInsertionOrderId: " + prLineInsertionOrderId);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "findPrLineByInertionOrderId",
                "prLineInsertionOrderId": prLineInsertionOrderId
            },
            beforeSend: function() {
                $("#overlay").css("display", "block");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var prLineJsonObj = $.parseJSON(responseJson.responseText);
                prLineJsonObj = JSON.parse(JSON.stringify(prLineJsonObj));
                console.log("prLineJsonObj.materialLongText: " + prLineJsonObj.prLineObj.materialLongText);
                $('div.longtext').text(prLineJsonObj.prLineObj.materialLongText);
                $("#longTextModal").modal("show");
            }
        });
    });

    $("#vendorComparisonFinalizationReportTable").on("click", ".lastPoDetailsClass", function() {
        var prLineInsertionOrderId = $(this).parent().children(".insertion-Order-Id").val();
        console.log("prLineInsertionOrderId: " + prLineInsertionOrderId);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "findLastPoDetailsByInertionOrderId",
                "prLineInsertionOrderId": prLineInsertionOrderId
            },
            beforeSend: function() {
                $("#overlay").css("display", "block");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var lastPoDetailsJsonArr = $.parseJSON(responseJson.responseText);
                lastPoDetailsJsonArr = JSON.parse(JSON.stringify(lastPoDetailsJsonArr));
                console.log("lastPoDetailsJsonArr len: " + lastPoDetailsJsonArr.length);
                var row = "";
                for (var i = 0; i < lastPoDetailsJsonArr.length; i++)
                {
                    row += "<tr><td>" + lastPoDetailsJsonArr[i].lastPoNumber + "</td><td>" + lastPoDetailsJsonArr[i].lastPoDate + "</td><td>" + lastPoDetailsJsonArr[i].lastPoBuyer + "</td><td>" + lastPoDetailsJsonArr[i].lastPoSupplier + "</td></tr>";
                }
                $("#lastPoDetailsTable").children("tbody").html(row);
                $("#lastPoDetailsModal").modal("show");
            }
        });
    });

    $("#vendorComparisonFinalizationReportTable").on("click", ".view-supporting-docs", function() {
        $("#overlay").css("display", "block");

        var rfqNumber = $(this).parent().children(".rfq-number").val();
        var VendorCode = $(this).parent().children(".supplier-code").val();
        var LinkId = $(this).parent().children(".link-Id").val();
        var PID = $(this).parent().children(".process-instance-Id").val();

        console.log("rfqNumber: " + rfqNumber);
        console.log("VendorCode: " + VendorCode);
        console.log("LinkId: " + LinkId);
        console.log("PID: " + PID);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=" + LinkId + "&PID=" + PID + "&RFQno=" + rfqNumber + "&VendorID=" + VendorCode + "&BankForm=&PONO=&AckSupportingDocument=";
        console.log("serviceUrl: " + serviceUrl);

//        getDocumentDetailsByLinkIdAndPid("");
//        $("#overlay").css("display", "none");
//        $("#showSupprtingDocFromDMSModal").modal("show");

        $.ajax({
            type: "GET",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
//            data: URLParam,
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.log("success: " + data);
                getDocumentDetailsByLinkIdAndPid(data);
                $("#overlay").css("display", "none");
                $("#showSupprtingDocFromDMSModal").modal("show");
            }
        });
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".final-price", function() {
        $("#overlay").css("display", "block");
        var buyerBaselinePrice = removeCommaInNumber($(this).val());
        var rfqId = $(this).parent().children(".rfq-Id").val();
        var vendorId = $(this).parent().children(".supplier-Id").val();
        var insertionOrderId = $(this).parent().children(".insertion-Order-Id").val();
        var supplierLineItemId = $(this).parent().children(".supplier-LineItem-Id").val();

        console.log("buyerBaselinePrice: " + buyerBaselinePrice);
        console.log("rfqId: " + rfqId);
        console.log("vendorId: " + vendorId);
        console.log("insertionOrderId: " + insertionOrderId);
        console.log("supplierLineItemId: " + supplierLineItemId);

        var buyerTotalBaselinePrice = 0;
        var currentColIndex = $(this).parent().index();
        console.log("currentColIndex: " + currentColIndex);

        var vendorComparisonFinalizationReportTableLen = $("#vendorComparisonFinalizationReportTable tbody tr").length;
        console.log("vendorComparisonFinalizationReportTableLen: " + vendorComparisonFinalizationReportTableLen);

        $("#vendorComparisonFinalizationReportTable").find("tbody tr").each(function(index) {
            var tempRfqId = $(this).find("td").eq(currentColIndex).children(".rfq-Id").val();
            console.log("tempRfqId: " + tempRfqId);
            console.log("index: " + index);
            if (tempRfqId !== undefined)
            {
                if (index < vendorComparisonFinalizationReportTableLen - 1)
                {
                    var baselinePrice = removeCommaInNumber($(this).find("td").eq(currentColIndex).children(".final-price").val());
                    buyerTotalBaselinePrice += Number(baselinePrice);
                }
            }
            if (index === vendorComparisonFinalizationReportTableLen - 1)
            {
                console.log("buyerTotalBaselinePrice 1: " + buyerTotalBaselinePrice);
                $(this).find("td").eq(currentColIndex - 3).children(".total-final-price").val(formatAmountByComma(Number(buyerTotalBaselinePrice).toFixed(2)));
            }
        });
        console.log("buyerTotalBaselinePrice 2: " + buyerTotalBaselinePrice);

        $.ajax({
            type: "GET",
            url: "rfqEvaluationGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "UpdateBuyerBaselinePrice",
                "supplierLineItemId": supplierLineItemId,
                "buyerBaselinePrice": buyerBaselinePrice
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Result: " + obj.Result);
                $("#overlay").css("display", "none");
            }
        });
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".final-financial-price", function() {
        $("#overlay").css("display", "block");

        var buyerFinalFinancialPrice = removeCommaInNumber($(this).val());
        var rfqId = $(this).parent().children(".rfq-Id").val();
        var vendorId = $(this).parent().children(".supplier-Id").val();
        var insertionOrderId = $(this).parent().children(".insertion-Order-Id").val();
        var supplierLineItemId = $(this).parent().children(".supplier-LineItem-Id").val();

        console.log("buyerFinalFinancialPrice: " + buyerFinalFinancialPrice);
        console.log("rfqId: " + rfqId);
        console.log("vendorId: " + vendorId);
        console.log("insertionOrderId: " + insertionOrderId);
        console.log("supplierLineItemId: " + supplierLineItemId);

        var buyerTotalFinalFinPrice = 0;
        var currentColIndex = $(this).parent().index();
        console.log("currentColIndex: " + currentColIndex);

        var vendorComparisonFinalizationReportTableLen = $("#vendorComparisonFinalizationReportTable tbody tr").length;
        console.log("vendorComparisonFinalizationReportTableLen: " + vendorComparisonFinalizationReportTableLen);

        $("#vendorComparisonFinalizationReportTable").find("tbody tr").each(function(index) {
            var tempRfqId = $(this).find("td").eq(currentColIndex).children(".rfq-Id").val();
            console.log("tempRfqId: " + tempRfqId);
            console.log("index: " + index);
            if (tempRfqId !== undefined)
            {
                if (index < vendorComparisonFinalizationReportTableLen - 1)
                {
                    var baselinePrice = removeCommaInNumber($(this).find("td").eq(currentColIndex).children(".final-financial-price").val());
                    buyerTotalFinalFinPrice += Number(baselinePrice);
                }
            }
            if (index === vendorComparisonFinalizationReportTableLen - 1)
            {
                console.log("buyerTotalFinalFinPrice 1: " + buyerTotalFinalFinPrice);
                $(this).find("td").eq(currentColIndex - 3).children(".total-final-financial-price").val(formatAmountByComma(Number(buyerTotalFinalFinPrice).toFixed(2)));
            }
        });
        console.log("buyerTotalFinalFinPrice 2: " + buyerTotalFinalFinPrice);

        $.ajax({
            type: "GET",
            url: "rfqEvaluationGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "UpdateBuyerFinalFinancialPrice",
                "supplierLineItemId": supplierLineItemId,
                "buyerFinalFinancialPrice": buyerFinalFinancialPrice
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Result: " + obj.Result);
                $("#overlay").css("display", "none");
            }
        });
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".note-to-approver", function() {

        var noteToApprover = $(this).val();
        var rfqLineId = $(this).parent().children(".rfq-line-id").val();
        console.log("noteToApprover: " + noteToApprover);
        console.log("rfqLineId: " + rfqLineId);

        if (noteToApprover.toString().trim() !== "")
        {
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "rfqEvaluationGetAjaxRequest.do",
                async: true,
                data: {
                    "reqFrom": "UpdateBuyerNoteToApprover",
                    "noteToApprover": noteToApprover,
                    "rfqLineId": rfqLineId
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Result: " + obj.Result);
                    $("#overlay").css("display", "none");
                }
            });
        }
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".comments", function() {

        var comments = $(this).val();
        var rfqLineId = $(this).parent().children(".rfq-line-id").val();
        console.log("comments: " + comments);
        console.log("rfqLineId: " + rfqLineId);

        if (comments.toString().trim() !== "")
        {
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "rfqEvaluationGetAjaxRequest.do",
                async: true,
                data: {
                    "reqFrom": "UpdateBuyerComments",
                    "comments": comments,
                    "rfqLineId": rfqLineId
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Result: " + obj.Result);
                    $("#overlay").css("display", "none");
                }
            });
        }
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".why-this-vendor", function() {

        var whyThisVendor = $(this).val();
        var rfqLineId = $(this).parent().children(".rfq-line-id").val();
        console.log("whyThisVendor: " + whyThisVendor);
        console.log("rfqLineId: " + rfqLineId);

        if (whyThisVendor.toString().trim() !== "")
        {
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "rfqEvaluationGetAjaxRequest.do",
                async: true,
                data: {
                    "reqFrom": "UpdateBuyerWhyThisVendor",
                    "whyThisVendor": whyThisVendor,
                    "rfqLineId": rfqLineId
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Result: " + obj.Result);
                    $("#overlay").css("display", "none");
                }
            });
        }
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".remaining-quantity", function() {
        var maxQty = $(this).prop("max");
        var changedQty = removeCommaInNumber($(this).val());
        if (Number(changedQty) > Number(maxQty))
        {
            console.log("++++++++++");
            $(this).val(formatNumberByComma(maxQty));
        }
        if (Number(changedQty) < 0)
        {
            console.log("-----------");
            $(this).val(formatNumberByComma(maxQty));
        }
        if (Number(changedQty) === -0)
        {
            console.log("-0-0-0-0-0-0-0-0-0-0-");
            $(this).val(formatNumberByComma(maxQty));
        }
        $(this).val(formatNumberByComma($(this).val()));
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".awarded-vendor-select", function() {
        var selectedAwardedVendorId = $(this).val();
        var rfqLineId = $(this).parent().children(".rfq-line-id").val();
        console.log("rfqLineId: " + rfqLineId);
        console.log("selectedAwardedVendorId: " + selectedAwardedVendorId);

        if (selectedAwardedVendorId.toString().trim() !== "")
        {
            var isProspect = "No";
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "findVendorById",
                    "vendorid": selectedAwardedVendorId
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);

                    var vendorCode = obj.Code;
                    var type = obj.TYPE;
                    var prospectName = obj.PROSPECT_NAME;

                    console.log("vendorCode: " + vendorCode);
                    console.log("type: " + type);
                    console.log("prospectName: " + prospectName);

                    if (type === "Prospect")
                    {
                        isProspect = "Yes";
                        confirmAlert = Lobibox.alert("error",
                                {
                                    msg: "'" + prospectName + "' is not a vendor, kindly contact to administrator !"
                                });
                    }
                }
            });

            if (isProspect === "Yes")
            {
                $(this).val("");
                return false;
            }

            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "rfqEvaluationGetAjaxRequest.do",
                async: true,
                data: {
                    "reqFrom": "UpdateAwardedVendor",
                    "selectedAwardedVendorId": selectedAwardedVendorId,
                    "rfqLineId": rfqLineId
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Result: " + obj.Result);
                    $("#overlay").css("display", "none");
                }
            });
        }
    });

    $("#vendorComparisonFinalizationReportTable").on("change", ".rfq-pr-line", function() {
        var isChecked = $(this).prop("checked");
        console.log("isChecked: " + isChecked);

        var rfqId = $(this).parent().children(".rfq-Id").val();
        var rfqLineId = $(this).parent().children(".rfq-line-id").val();
        var insertionOrderId = $(this).parent().children(".insertion-Order-Id").val();

        console.log("rfqId: " + rfqId);
        console.log("rfqLineId: " + rfqLineId);
        console.log("insertionOrderId: " + insertionOrderId);
    });

    var confirmAlert = null;
    var createPoNotifyAlert = null;
    $("#createPoBtn").click(function() {
        console.log("create po btn click");
        var vendorFinalizationTableDataArray = [];
        var prIdArray = [];
        var rfqIdArray = [];
        var reqFrom = "byprids";
        var poVendor = $("#rfqVendorList").val();
        console.log("poVendor: " + poVendor);

        if (confirmAlert !== null)
        {
            confirmAlert.destroy();
        }
        if (createPoNotifyAlert !== null)
        {
            createPoNotifyAlert.remove();
        }

        if (poVendor === "")
        {
            confirmAlert = Lobibox.alert("error",
                    {
                        msg: "Please Select PO Vendor!"
                    });
            return false;
        }

        var isProspect = "No";
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "findVendorById",
                "vendorid": poVendor
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);

                var vendorCode = obj.Code;
                var type = obj.TYPE;
                var vendorName = obj.FIRST_NAME + " " + obj.LAST_NAME;
                var prospectName = obj.PROSPECT_NAME;

                console.log("vendorCode: " + vendorCode);
                console.log("type: " + type);
                console.log("vendorName: " + vendorName);
                console.log("prospectName: " + prospectName);

                if (type === "Prospect")
                {
                    isProspect = "Yes";
                    confirmAlert = Lobibox.alert("error",
                            {
                                msg: "'" + prospectName + "' is not a vendor, kindly contact to Administrator!"
                            });
                }
            }
        });

        if (isProspect === "Yes")
        {
            return false;
        }

        var isValid = "Yes";
        $("#vendorComparisonFinalizationReportTable").find("tbody tr").each(function(index) {
            var isPrChecked = $(this).find("td").eq(0).children(".rfq-pr-line").prop("checked");
            console.log("isPrChecked: " + isPrChecked);

            var noOfVendor = $("#rfqVendorList option").length - 1;
            console.log("noOfVendor: " + noOfVendor);

            if (isPrChecked === true)
            {
                if ($(this).find("td").eq(3 + noOfVendor + 2 + 1).children(".note-to-approver").val().toString().trim() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(3 + noOfVendor + 2 + 1).children(".note-to-approver").focus();

                    createPoNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Please Enter Note to Approver!"
                    });
                    return false;
                }
                if ($(this).find("td").eq(3 + noOfVendor + 2 + 2).children(".comments").val().toString().trim() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(3 + noOfVendor + 2 + 2).children(".comments").focus();

                    createPoNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Please Enter Comments!"
                    });
                    return false;
                }
                if ($(this).find("td").eq(3 + noOfVendor + 2 + 3).children(".why-this-vendor").val().toString().trim() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(3 + noOfVendor + 2 + 3).children(".why-this-vendor").focus();

                    createPoNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Please enter why was this vendor selected!"
                    });
                    return false;
                }

                prIdArray.push($(this).find("td").eq(0).children(".insertion-Order-Id").val());
                rfqIdArray.push($(this).find("td").eq(0).children(".rfq-Id").val());

                var vendorFinalizationTableDataObject = {};
                vendorFinalizationTableDataObject["vendorId"] = poVendor;
                vendorFinalizationTableDataObject["rfqId"] = $(this).find("td").eq(0).children(".rfq-Id").val();
                vendorFinalizationTableDataObject["rfqNumber"] = $(this).find("td").eq(0).children(".rfq-number").val();
                vendorFinalizationTableDataObject["rfqLineId"] = $(this).find("td").eq(0).children(".rfq-line-id").val();
                vendorFinalizationTableDataObject["rfqLineItemNumber"] = $(this).find("td").eq(0).children(".rfq-line-item-number").val();
                vendorFinalizationTableDataObject["insertionOrderId"] = $(this).find("td").eq(0).children(".insertion-Order-Id").val();
                vendorFinalizationTableDataObject["quantity"] = removeCommaInNumber($(this).find("td").eq(3).children(".remaining-quantity").val()).toString();
                vendorFinalizationTableDataObject["noteToApprover"] = $(this).find("td").eq(3 + noOfVendor + 2 + 1).children(".note-to-approver").val();
                vendorFinalizationTableDataObject["comments"] = $(this).find("td").eq(3 + noOfVendor + 2 + 2).children(".comments").val();
                vendorFinalizationTableDataObject["whyThisVendor"] = $(this).find("td").eq(3 + noOfVendor + 2 + 3).children(".why-this-vendor").val();

                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "FindVendorPerUnitPrice",
                        "vendorId": vendorFinalizationTableDataObject["vendorId"],
                        "insertionOrderId": vendorFinalizationTableDataObject["insertionOrderId"],
                        "rfqId": vendorFinalizationTableDataObject["rfqId"]
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("vendorPerUnitPrice: " + obj.vendorPerUnitPrice);
                        vendorFinalizationTableDataObject["vendorPerUnitPrice"] = obj.vendorPerUnitPrice;
                    }
                });
                vendorFinalizationTableDataArray.push(vendorFinalizationTableDataObject);
            }
        });
        if (isValid === "No")
        {
            return false;
        }
        if (prIdArray.length === 0)
        {
            confirmAlert = Lobibox.alert("error",
                    {
                        msg: "Please select atleast one PR Line!"
                    });
            return false;
        }
        var vendorFinalizationTableDataArrayAsJsonString = JSON.stringify(vendorFinalizationTableDataArray);
        console.log("vendorFinalizationTableDataArrayAsJsonString: " + vendorFinalizationTableDataArrayAsJsonString);

        confirmAlert = Lobibox.confirm({
            msg: "Are you sure you want to create PO ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
//                    $("#overlay").css("display", "block");

                    $("#vendorFinalizationTableDataArrayAsJsonString").val(vendorFinalizationTableDataArrayAsJsonString);
                    $("#rfqid").val(rfqIdArray.toString());
                    $("#reqFrom").val(reqFrom);
                    $("#SelectedVendorId").val(poVendor);
                    $("#prids").val(prIdArray.toString());

                    $("#orderEvaluationForm").submit();

//                    updateRfqPoDetails(vendorFinalizationTableDataArrayAsJsonString, poNumber);

//                    var pid = "";
//                    uploadRfqQuotationAndRfqEvaluationReportIntoDMS(rfqIdArray.toString(), pid);        
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

});

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
            console.log("obj.EXCHANGE_RATE :" + obj.EXCHANGE_RATE);
            exchangeRate = obj.EXCHANGE_RATE;
        }
    });
    return exchangeRate;
}

//function updateRfqPoDetails(VendorFinalizationTableDataArrayAsJsonString, poNumber)
//{
//    console.log("VendorFinalizationTableDataArrayAsJsonString in func: " + VendorFinalizationTableDataArrayAsJsonString);
//    var _csrf = $("input[name=_csrf]").val();
//    $.ajax({
//        type: "POST",
//        url: "rfqEvaluationPostAjaxRequest.do",
//        async: false,
//        data: {
//            "reqFrom": "UpdateRfqPoDetails",
//            "poNumber": poNumber,
//            "VendorFinalizationTableDataArrayAsJsonString": VendorFinalizationTableDataArrayAsJsonString,
//            _csrf: _csrf
//        },
//        complete: function(responseJson) {
//            var jsonObj = $.parseJSON(responseJson.responseText);
//            console.log("UpdateFinalizedVendorPoDetails: " + jsonObj.Result);
//        }
//    });
//}
//
//function uploadRfqQuotationAndRfqEvaluationReportIntoDMS(rfqIds, pid)
//{
//    $.ajax({
//        type: "GET",
//        url: "rfqEvaluationGetAjaxRequest.do",
//        async: false,
//        data: {
//            "reqFrom": "UploadRfqQuotationAndRfqEvaluationIntoDMS",
//            "rfqIds": rfqIds,
//            "pid": pid
//        },
//        complete: function(responseJson) {
//            var jsonObj = $.parseJSON(responseJson.responseText);
//            console.log("jsonObj.Result: " + jsonObj.Result);
//            console.log("jsonObj.Message: " + jsonObj.Message);
//        }
//    });
//}

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