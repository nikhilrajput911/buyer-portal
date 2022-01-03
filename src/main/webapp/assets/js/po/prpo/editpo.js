$(document).ready(function() {

    var newPrLineInsertionOrderIdArr = [];
    var newRfqLineRfqIdRfqLineIdInsertionOrderIdArr = [];
    var newPrLineModalTable = null;
    var lobiboxNotifyAlert = null;

    $("#addNewPrLineBtn").click(function() {
        var prType = "";
        var itemCategory = "";
        $("#material_headerClass tbody tr").each(function(index) {
            if (index === 0)
            {
                itemCategory = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                if (itemCategory.toString().trim() === "D")
                {
                    prType = "Service";
                }
                else
                {
                    prType = "Material";
                }
            }
            else
            {
                return false;
            }
        });
        console.log("itemCategory: " + itemCategory);
        console.log("prType: " + prType);

        var PoFrom = $("#PoFrom").val();
        console.log("PoFrom: " + PoFrom);
        if (PoFrom === "shortcutPo")
        {
            prType = $("#prType").val();
        }
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "findBuyerPendingPrLineByPrType",
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
                var buyerPendingPrJsonArr = $.parseJSON(responseJson.responseText);
//                console.log("JSON.stringify(buyerPendingPrJsonArr): " + JSON.stringify(buyerPendingPrJsonArr));
                buyerPendingPrJsonArr = JSON.parse(JSON.stringify(buyerPendingPrJsonArr));
                console.log("buyerPendingPrJsonArr len: " + buyerPendingPrJsonArr.length);
                if (buyerPendingPrJsonArr.length !== 0)
                {
                    var row = "";
                    $("#newPrLineModalTable tbody tr").remove();
                    var tempInsertionOrderIdArr = $("#newPrLineInsertionOrderId").val();
                    for (var i = 0; i < buyerPendingPrJsonArr.length; i++)
                    {
                        if (tempInsertionOrderIdArr.indexOf(buyerPendingPrJsonArr[i].insertionOrderId.toString()) === -1)
                        {
                            row += "<tr>"
                                    + "<td><input type='checkbox' class='newPrLineInsertionOrderId' value='" + buyerPendingPrJsonArr[i].insertionOrderId + "'></td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].itemNumber === undefined ? "-" : buyerPendingPrJsonArr[i].itemNumber) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].purchaseRequestNumber === undefined ? "-" : buyerPendingPrJsonArr[i].purchaseRequestNumber) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].departmentDescription === undefined ? "-" : buyerPendingPrJsonArr[i].departmentDescription) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].companyCode === undefined ? "-" : buyerPendingPrJsonArr[i].companyCode) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].purchaseRequestNumber === undefined ? "-" : buyerPendingPrJsonArr[i].purchaseRequestNumber) + " / " + (buyerPendingPrJsonArr[i].initiatorId === undefined ? "-" : buyerPendingPrJsonArr[i].initiatorId) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].approverName === undefined ? "-" : buyerPendingPrJsonArr[i].approverName) + " / " + (buyerPendingPrJsonArr[i].approvedDate === undefined ? "-" : buyerPendingPrJsonArr[i].approvedDate) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].requisitionDate === undefined ? "-" : buyerPendingPrJsonArr[i].requisitionDate) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].materialCode === undefined ? "-" : buyerPendingPrJsonArr[i].materialCode) + " / " + (buyerPendingPrJsonArr[i].oldMaterialCode === undefined ? "-" : buyerPendingPrJsonArr[i].oldMaterialCode) + " / " + (buyerPendingPrJsonArr[i].shortText === undefined ? "-" : buyerPendingPrJsonArr[i].shortText) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].poText === undefined ? "-" : buyerPendingPrJsonArr[i].poText) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].itemText === undefined ? "-" : buyerPendingPrJsonArr[i].itemText) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].uoM === undefined ? "-" : buyerPendingPrJsonArr[i].uoM) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].remainingQuantity === undefined ? "-" : formatNumberByComma(buyerPendingPrJsonArr[i].remainingQuantity)) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].localPurchase === undefined ? "-" : buyerPendingPrJsonArr[i].localPurchase) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].leadTime === undefined ? "-" : buyerPendingPrJsonArr[i].leadTime) + " / " + (buyerPendingPrJsonArr[i].storageLocation === undefined ? "-" : buyerPendingPrJsonArr[i].storageLocation) + "</td>"
                                    + "<td>-</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].overDue === undefined ? "-" : buyerPendingPrJsonArr[i].overDue) + "</td>"
                                    + "<td>-</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].priceUnit === undefined ? "-" : buyerPendingPrJsonArr[i].priceUnit) + " / " + (buyerPendingPrJsonArr[i].currency === undefined ? "-" : buyerPendingPrJsonArr[i].currency) + "</td>"
                                    + "<td>-</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].headerNote === undefined ? "-" : buyerPendingPrJsonArr[i].headerNote) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].itemNote === undefined ? "-" : buyerPendingPrJsonArr[i].itemNote) + "</td>"
                                    + "<td>" + (buyerPendingPrJsonArr[i].miqaMaterial === undefined ? "-" : buyerPendingPrJsonArr[i].miqaMaterial) + "</td>"
                                    + "</tr>";
                        }
                    }
                    $("#newPrLineModalTable tbody").append(row);

                    if ($.fn.DataTable.isDataTable('#newPrLineModalTable')) {
                        newPrLineModalTable.destroy();
                        newPrLineModalTable = null;
                        $("#newPrLineModalTable").children('tbody').html(row);
                        newPrLineModalTable = $('table.newPrLineModalTable').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        newPrLineModalTable.buttons().container()
                                .appendTo('#newPrLineModalTable_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#newPrLineModalTable thead tr').clone(true).appendTo('#newPrLineModalTable thead');
                        $('#newPrLineModalTable thead tr:eq(1) th').each(function(i) {
                            $('#newPrLineModalTable thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (newPrLineModalTable.column(i).search() !== this.value) {
                                    newPrLineModalTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        newPrLineModalTable = $('table.newPrLineModalTable').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        newPrLineModalTable.buttons().container()
                                .appendTo('#newPrLineModalTable_wrapper .col-md-6:eq(0)');
                    }
                    $("#newPrLineModal").modal("show");
                }
//                $("#newPrLineModal").modal("show");
            }
        });
    });

    $("#newPrLineModalTable").on("click", ".newPrLineInsertionOrderId", function() {
        var insertionOrderId = $(this).prop("value");
        console.log("insertionOrderId: " + insertionOrderId);
        if ($(this).prop("checked"))
        {
            newPrLineInsertionOrderIdArr.push(insertionOrderId);
        }
        else
        {
            var index = newPrLineInsertionOrderIdArr.indexOf(insertionOrderId);
            newPrLineInsertionOrderIdArr.splice(index, 1);
        }
        console.log("newPrLineInsertionOrderIdArr: " + newPrLineInsertionOrderIdArr);
//        $("#newPrLineInsertionOrderId").val(newPrLineInsertionOrderIdArr);
    });

    var alertNotification = null;
    $("#newPrLineModalAddBtn").click(function() {
        console.log("newPrLineModalAddBtn");
        console.log("newPrLineInsertionOrderIdArr.length: " + newPrLineInsertionOrderIdArr.length);

        if (newPrLineInsertionOrderIdArr.length === 0)
        {
            if (alertNotification !== null)
            {
                alertNotification.destroy();
            }
            alertNotification = Lobibox.alert("error", {
                msg: "Kindly select atleast one PR Line!"
            });
        }
        else
        {
            console.log("newPrLineInsertionOrderIdArr: " + newPrLineInsertionOrderIdArr);
            $("#newPrLineModal").modal("hide");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "findPrLineByInsertionOrderIds",
                    "insertionOrderIds": newPrLineInsertionOrderIdArr.toString()
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
                    var prLineJsonArr = $.parseJSON(responseJson.responseText);
                    console.log("JSON.stringify(prLineJsonArr): " + JSON.stringify(prLineJsonArr));
                    prLineJsonArr = JSON.parse(JSON.stringify(prLineJsonArr));
                    console.log("prLineJsonArr len: " + prLineJsonArr.length);

                    if (prLineJsonArr.length > 0)
                    {
                        var row = "";
                        var option = "";
                        var prNoAvail = $("#material_headerClass tbody tr").length;
                        console.log("prNoAvail: " + prNoAvail);
                        var headerCurrency = $("#CurrencyDeliveryInvoice").val();
                        console.log("headerCurrency: " + headerCurrency);
                        for (var i = 0; i < prLineJsonArr.length; i++)
                        {
                            var months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "July": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"};
                            var requisitionDate = (prLineJsonArr[i].requisitionDate === undefined ? "" : prLineJsonArr[i].requisitionDate);
                            var requisitionDateNew = "";
                            if (requisitionDate !== "")
                            {
                                var requisitionDateSplitArr = requisitionDate.split(" ");
                                requisitionDateNew = requisitionDateSplitArr[0] + "." + months[requisitionDateSplitArr[1]] + "." + requisitionDateSplitArr[2];
                            }

                            var deliveryDate = (prLineJsonArr[i].deliveryDate === undefined ? "" : prLineJsonArr[i].deliveryDate);
                            var deliveryDateNew = "";
                            if (deliveryDate !== "")
                            {
                                var deliveryDateSplitArr = deliveryDate.split("/");
                                deliveryDateNew = deliveryDateSplitArr[0] + "." + deliveryDateSplitArr[1] + "." + deliveryDateSplitArr[2];
                            }
                            console.log("deliveryDateNew: " + deliveryDateNew);

                            option += "<option value=" + prLineJsonArr[i].insertionOrderId + ">" + (10 * (i + 1 + prNoAvail)) + " - " + (prLineJsonArr[i].shortText === undefined ? "" : prLineJsonArr[i].shortText) + "</option>";

                            var itemCat = prLineJsonArr[i].itemCategory === undefined ? "" : prLineJsonArr[i].itemCategory;

//                            var totalNetPrice = getSumOfNetPriceOfServiceByLinkId(prLineJsonArr[i].linkId);

                            var totalNetPrice = "";
                            if (prLineJsonArr[i].accountAssignment !== "U" && prLineJsonArr[i].itemCategory === "D")
                            {
                                $.ajax({
                                    type: "GET",
                                    url: "poajaxrequest.do",
                                    async: false,
                                    data:
                                            {
                                                "reqFrom": "getSumOfNetPriceOfServiceByLinkId",
                                                "LinkID": prLineJsonArr[i].linkId
                                            },
                                    dataType: "json",
                                    success: function(response)
                                    {
                                        totalNetPrice = response;
                                    }
                                });
                            }
                            else if (prLineJsonArr[i].accountAssignment === "U" && prLineJsonArr[i].itemCategory === "D")
                            {
                                totalNetPrice = prLineJsonArr[i].expectedValue;
                            }
                            else
                            {
                                totalNetPrice = "";
                            }
                            console.log("totalNetPrice: " + totalNetPrice);

                            var prLineCurrency = (prLineJsonArr[i].currency === undefined ? "" : prLineJsonArr[i].currency);
                            console.log("prLineCurrency before: " + prLineCurrency);
                            if (headerCurrency !== prLineCurrency && totalNetPrice !== "")
                            {
                                prLineCurrency = headerCurrency;
                                var exchangeRate = getExchangeRate(prLineCurrency, headerCurrency);
                                console.log("exchangeRate: " + exchangeRate);
                                if (exchangeRate !== "" && exchangeRate !== undefined)
                                {
                                    totalNetPrice = Number(totalNetPrice) * Number(exchangeRate);
                                    console.log("NetPrice after changing pr line currency: " + totalNetPrice);
                                }
                            }

                            /*UOM population on PR addition code by Bittu Starts*/
                            var prQuantity = prLineJsonArr[i].remainingQuantity === undefined ? "" : prLineJsonArr[i].remainingQuantity;
                            console.log("prQuantity 1: " + prQuantity);
                            prQuantity = Number(prQuantity).toFixed(3);
                            console.log("prQuantity 2: " + prQuantity);
                            var uom = prLineJsonArr[i].unit === undefined ? "" : prLineJsonArr[i].unit;
                            var PrType = $("#PrType").val();
                            var quantityBeforeChange = prQuantity;
                            if (PrType === "Material") {
                                var jsonArr = getMaterialMasterOnLoad(prLineJsonArr[i].materialCode, prLineJsonArr[i].company);
                                if (jsonArr.length !== 0) {
                                    if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                                        var convFrom = jsonArr[0].conversionFrom;
                                        var convTo = jsonArr[0].conversionTo;
                                        if (prQuantity !== "") {
                                            prQuantity = Number(convTo) / Number(convFrom) * Number(prQuantity);
                                            uom = jsonArr[0].orderUnit;
                                        }
                                    }
                                }
                            }
                            /*UOM population code by Bittu End*/

                            // Set IM Material, MFR Part Number and Manufacturer
                            var MFRPN = "";
                            var MFRNR = "";
                            var imMaterial = "";
                            if (prLineJsonArr[i].materialCode !== undefined && prLineJsonArr[i].materialCode !== "")
                            {
                                var masterMaterialMARADetailsObj = findMasterMaterialMARAByMatCode(prLineJsonArr[i].materialCode);
                                if (masterMaterialMARADetailsObj["Result"] === "Found") {
                                    if (masterMaterialMARADetailsObj["MFRPN"] !== undefined && masterMaterialMARADetailsObj["MFRPN"] !== ""
                                            && masterMaterialMARADetailsObj["MFRNR"] !== undefined && masterMaterialMARADetailsObj["MFRNR"] !== "") {
                                        imMaterial = prLineJsonArr[i].materialCode;
                                    }
                                    if (masterMaterialMARADetailsObj["MFRPN"] !== undefined) {
                                        MFRPN = masterMaterialMARADetailsObj["MFRPN"];
                                    }
                                    if (masterMaterialMARADetailsObj["MFRNR"] !== undefined) {
                                        MFRNR = masterMaterialMARADetailsObj["MFRNR"];
                                    }
                                }
                            }

                            // Fetch info record details
                            var isVariableOrderUnitActive = false;
                            var infoRecordOPU = "";
                            if (prLineJsonArr[i].materialCode !== undefined && prLineJsonArr[i].materialCode !== "") {
                                var infoRecordJsonObj = fetchInfoRecordDetails(prLineJsonArr[i].materialCode, "PR");
                                console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));
                                if (Number(infoRecordJsonObj.mainCode) === 0) {
                                    if (infoRecordJsonObj.VAR_ORD_UN === "Active") {
                                        isVariableOrderUnitActive = true;
                                    }
                                    if (infoRecordJsonObj.ORDERPR_UN !== "") {
                                        infoRecordOPU = infoRecordJsonObj.ORDERPR_UN;
                                    }
                                }
                            }

                            row += "<tr>"
                                    + "<td>" + (itemCat !== 'D' && Number(prQuantity) > 1 ? "<i class='fa fa-columns fa-lg clonePoLine' title='Split PO Line'></i> " : "") + "<i class='fa fa-window-close fa-lg deleteNewAddedPrLine' title='Delete'></i>"
                                    + "<input type='hidden' class='insertionOrderId_Class' value='" + prLineJsonArr[i].insertionOrderId + "'>"
                                    + "<input type='hidden' class='linkId_Class' value='" + prLineJsonArr[i].linkId + "'>"
                                    + "<input type='hidden' class='prType_Class' value='" + prLineJsonArr[i].prType + "'>"
                                    + "<input type='hidden' class='prNumber_Class' value='" + prLineJsonArr[i].purchaseRequestNumber + "'>"
                                    + "<input type='hidden' class='PRItemNumber_Class' value='" + (10 * (i + 1 + prNoAvail)) + "'>"
                                    + "<input type='hidden' class='PRCompanyCode_Class' value='" + prLineJsonArr[i].company + "'>"
                                    + "<input type='hidden' class='PODistribution' value=''>"
                                    + "<input type='hidden' class='POPartialInvoiceIndicator' value=''>"
                                    + "<input type='hidden' class='ValuationPrice' value='" + (prLineJsonArr[i].valuationPrice === undefined ? "" : prLineJsonArr[i].valuationPrice) + "'>"
                                    + "<input type='hidden' class='POLineItemPackageNo' value=''>" // New
                                    + "<input type='hidden' class='POLineItemTaxCode' value=''>" // New
                                    + "<input type='hidden' class='noLimitHidden' value='" + (prLineJsonArr[i].noLimit === undefined ? "" : prLineJsonArr[i].noLimit) + "'>"
                                    + "<input type='hidden' class='overAllLimitHidden' value='" + (prLineJsonArr[i].overAllLimit === undefined ? "" : prLineJsonArr[i].overAllLimit) + "'>"
                                    + "<input type='hidden' class='expectedValueHidden' value='" + (prLineJsonArr[i].expectedValue === undefined ? "" : prLineJsonArr[i].expectedValue) + "'>"
                                    + "<input type='hidden' class='invoiceReceiptHidden' value='" + (prLineJsonArr[i].invoiceReceipt === undefined ? "" : prLineJsonArr[i].invoiceReceipt) + "'>"
                                    + "<input type='hidden' class='goodsReceiptHidden' value='" + (prLineJsonArr[i].goodsReceipt === undefined ? "" : prLineJsonArr[i].goodsReceipt) + "'>"
                                    + "<input type='hidden' class='prMaterialCodeHidden' value='" + (prLineJsonArr[i].materialCode === undefined ? "" : prLineJsonArr[i].materialCode) + "'>"
                                    + "<input type='hidden' class='prDeliveryDateCategoryHidden' value='" + (prLineJsonArr[i].deliveryDateCategory === undefined ? "" : prLineJsonArr[i].deliveryDateCategory) + "'>"
                                    + "<input type='hidden' class='prRequisitionDateHidden' value='" + requisitionDateNew + "'>"
                                    + "<input type='hidden' class='prCompanyCodeHidden' value='" + prLineJsonArr[i].company + "'>"
                                    + "<input type='hidden' class='prMaterialLongTextHidden' value='" + (prLineJsonArr[i].materialLongText === undefined ? "" : prLineJsonArr[i].materialLongText) + "'>"
                                    + "<input type='hidden' class='isPrSaved' value='No'>"
                                    + "<input type='hidden' class='procInstId_Class' value='" + prLineJsonArr[i].procInstId + "'>"
                                    + "<input type='hidden' class='prCriticalityHidden' value='" + (prLineJsonArr[i].criticality === undefined ? "" : prLineJsonArr[i].criticality) + "'>"
                                    + "<input type='hidden' class='prTaxAmount' value=''>"
                                    + "<input type='hidden' class='prPackageNo' value=''>"
                                    + "<input type='hidden' class='serviceRefLineNo' value=''>"
                                    + "<input type='hidden' class='lineType' value='N'>"
                                    + "<input type='hidden' class='isPoLineOrPrLineOrRfqLineOrEmptyLine' value='PrLine'>"
                                    + "<input type='hidden' class='prRfqNumber' value=''>"
                                    + "<input type='hidden' class='prRfqLineItemNumber' value=''>"
                                    + "<input type='hidden' class='totalQuantityOfThisLine' value='" + Number(prQuantity).toFixed(3) + "'>" // New
                                    + "<input type='hidden' class='parentPrLineInsertionOrderId' value=''>" // New
                                    + "<input type='hidden' class='TexCodeForLineInPr'>"
                                    + "<input type='hidden' class='SegmentForLineInPr'>"
                                    + "<input type='hidden' class='quantityBeforeChange' value='" + Number(quantityBeforeChange).toFixed(3) + "'>"
                                    + "<input type='hidden' class='prMfrPartNumber' value='" + MFRPN + "'>"
                                    + "<input type='hidden' class='prManufacturer' value='" + MFRNR + "'>"
                                    + "<input type='hidden' class='prNetPriceHidden' value='" + (prLineJsonArr[i].prNetPrice === undefined ? "" : prLineJsonArr[i].prNetPrice) + "'>"
                                    + "<input type='hidden' class='timeOfChangeCurrency' value='before'>"
                                    + "</td>"
                                    + "<td>" + (10 * (i + 1 + prNoAvail)) + "</td>"
                                    + "<td><input type='text' class='form-control form-rounded accountAssignmentClass' value='" + (prLineJsonArr[i].accountAssignment === undefined ? "" : prLineJsonArr[i].accountAssignment) + "' disabled='true' style='width:35px;'><input type='hidden' class='accountAssignmentDescClass'></td>"
                                    + "<td><input type='text' class='form-control form-rounded itemCategoryClass' value='" + (prLineJsonArr[i].itemCategory === undefined ? "" : prLineJsonArr[i].itemCategory) + "' disabled='true' style='width:35px;'><input type='hidden' class='itemCategoryDescClass'></td>"
                                    + "<td><input type='text' class='materialCodeClass form-control form-rounded' value='" + (prLineJsonArr[i].materialCode === undefined ? "" : prLineJsonArr[i].materialCode) + "' style='width:100px;' disabled='true'></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-short-text' value='" + (prLineJsonArr[i].shortText === undefined ? "" : prLineJsonArr[i].shortText) + "' style='width:340px;'" + (itemCat !== 'D' ? 'disabled' : '') + "></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-quantity' value='" + formatNumberByComma(prQuantity) + "' style='width:130px;'" + (itemCat === 'D' ? 'disabled' : '') + "></td>"
                                    + "<td><input type='text' class='prUom form-control form-rounded' style='width:70px;' value='" + uom + "' " + (isVariableOrderUnitActive === false ? 'disabled' : '') + "></td>"
                                    + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value='" + (infoRecordOPU !== "" ? infoRecordOPU : uom) + "'></td>"
                                    + "<td><input type='text' class='criticalityClass form-control form-rounded' value='" + (prLineJsonArr[i].criticality === undefined ? "" : prLineJsonArr[i].criticality) + "' style='width:150px;' disabled='true'></td>"
                                    + "<td><input type='text' class='prDeliveryDateCat form-control form-rounded' value='" + (prLineJsonArr[i].deliveryDateCategory === undefined ? "" : prLineJsonArr[i].deliveryDateCategory) + "' readonly='true' style='width:40px;'></td>"
                                    + "<td><span class='PR_DeliveryDate'>" + deliveryDateNew + "</span> <input type='hidden' class='prDeliveryDatepicker'></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-net-price' value='" + formatAmountByComma(Number(totalNetPrice).toFixed(2)) + "' " + (itemCat === 'D' ? 'disabled' : '') + " style='width:150px;'></td>"
                                    + "<td><input type='text' class='currencyClass form-control form-rounded' value='" + prLineCurrency + "' disabled='true' style='width:70px;'></td>"
                                    + "<td><input type='text' class='priceUnitClass form-control form-rounded' value='" + (prLineJsonArr[i].priceUnit === undefined ? "" : formatAmountByComma(Number(prLineJsonArr[i].priceUnit).toFixed(2))) + "' disabled='true' style='width:150px;'></td>"
                                    + "<td><input type='text' class='materialGroupClass form-control form-rounded' value='" + (prLineJsonArr[i].materialGroup === undefined ? "" : prLineJsonArr[i].materialGroup) + "' disabled='true' style='width:100px;'></td>"
                                    + "<td><input type='text' class='hiddenPlantCode form-control form-rounded' value='" + (prLineJsonArr[i].plantCode === undefined ? "" : prLineJsonArr[i].plantCode) + "' disabled='true' style='width:70px;'></td>"
                                    + "<td><input type='text' class='storageLocationClass form-control form-rounded' value='" + (prLineJsonArr[i].storageLocation === undefined ? "" : prLineJsonArr[i].storageLocation) + "' disabled='true' style='width:100px;'></td>"
                                    + "<td></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-tracking-number' value='" + (prLineJsonArr[i].departmentDescription === undefined ? "" : prLineJsonArr[i].departmentDescription) + "' style='width:70px;'></td>"
                                    + "<td>" + (prLineJsonArr[i].infoRecord === undefined ? "" : prLineJsonArr[i].infoRecord) + "</td>"
                                    + "<td><input type='text' class='purchaseOrganizationClass form-control form-rounded' value='" + (prLineJsonArr[i].purchaseOrganization === undefined ? "" : prLineJsonArr[i].purchaseOrganization) + "' disabled='true' style='width:70px;'></td>"
                                    + "<td><input type='text' class='purchasingGroupClass form-control form-rounded' value='" + (prLineJsonArr[i].purchasingGroup === undefined ? "" : prLineJsonArr[i].purchasingGroup) + "' disabled='true' style='width:100px;'></td>"
                                    + "<td>" + (prLineJsonArr[i].purchaseRequestNumber === undefined ? "" : prLineJsonArr[i].purchaseRequestNumber) + "</td>"
                                    + "<td>" + (prLineJsonArr[i].itemNumber === undefined ? "" : prLineJsonArr[i].itemNumber) + "</td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-requisitioner-id' value='" + (prLineJsonArr[i].requisitionerId === undefined ? "" : prLineJsonArr[i].requisitionerId) + "' style='width:200px;'" + (itemCat !== 'D' ? 'disabled' : '') + "></td>"
                                    + "<td>" + (prLineJsonArr[i].prCreator === undefined ? "" : prLineJsonArr[i].prCreator) + "</td>"
                                    + "<td><input type='text' class='prDeptNameClass form-control form-rounded' value='' disabled='true' style='width:200px;'></td>"
                                    + "<td></td>"
                                    + "<td></td>"
                                    + "<td><input type='text' class='prImMaterial form-control form-rounded' style='width:100px;' readonly='true' value=" + imMaterial + "></td>"
                                    + "<td><input type='checkbox' class='prReturnsItem'></td>"
                                    + "<td><input type='checkbox' class='prFreeOfCharge'></td>"
                                    + "<td><input type='text' class='pr-rfq-Number form-control form-rounded' style='width:150px;' readonly='true' value=''></td>"
                                    + "<td><input type='text' class='pr-rfq-line-item-number form-control form-rounded' style='width:70px;' readonly='true' value=''></td>"
                                    + "<td></td>"
                                    + "<td></td>"
                                    + "</tr>";
                        }

                        $("#material_headerClass tbody").append(row);
                        $("#ItemNumberSelect").append(option);
                        $("#ItemNumberSelect").val("");
                        prevousSelectedItem = "";
                        $("#lineLevelTabsDiv").css("display", "none");

                        refreshPrDelvDatepicker();
                        hidePoLineTableColsByPoType();

                        var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
                        if (newPrLineInsertionOrderId !== "")
                        {
                            $("#newPrLineInsertionOrderId").val(newPrLineInsertionOrderId + "," + newPrLineInsertionOrderIdArr);
                            newPrLineInsertionOrderIdArr = [];
                        }
                        else
                        {
                            $("#newPrLineInsertionOrderId").val(newPrLineInsertionOrderIdArr);
                            newPrLineInsertionOrderIdArr = [];
                        }
                    }
                    if ($("#PrType").val() === "Service") {
                        var LinkID;
                        var linkidArray = [];
                        var lineItemNumber = "";
                        var lineItemNumberArr = [];
                        var PrItemNumber = "";
                        var PrItemNumberArr = [];
                        var assAsgnCat = "";
                        var accAsgnCatArr = [];
                        var prNoAvail = $("#material_headerClass tbody tr").length;
                        for (var i = 0; i < prLineJsonArr.length; i++) {
                            LinkID = prLineJsonArr[i].linkId;
                            lineItemNumber = prLineJsonArr[i].insertionOrderId;
                            PrItemNumber = 10 * (i + 1 + prNoAvail);
                            assAsgnCat = prLineJsonArr[i].accountAssignment;
                            linkidArray.push(LinkID);
                            lineItemNumberArr.push(lineItemNumber);
                            PrItemNumberArr.push(PrItemNumber);
                            accAsgnCatArr.push(assAsgnCat);
                        }
                        saveServiceAndServiceAccAsgnOnNewPOAddition(linkidArray, lineItemNumberArr, PrItemNumberArr, accAsgnCatArr);
                    }
                }
            });
        }
    });

    $("#material_headerClass").on("click", ".deleteNewAddedPrLine", function() {
        var insertionOrderId = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        console.log("insertionOrderId: " + insertionOrderId);

        newPrLineInsertionOrderIdArr = $("#newPrLineInsertionOrderId").val().split(",");
        console.log("newPrLineInsertionOrderIdArr: " + newPrLineInsertionOrderIdArr);

        var index = newPrLineInsertionOrderIdArr.indexOf(insertionOrderId.toString().trim());
        console.log("index: " + index);
        newPrLineInsertionOrderIdArr.splice(index, 1);
        $("#newPrLineInsertionOrderId").val(newPrLineInsertionOrderIdArr);

        $(this).parent().parent().remove();
        newPrLineInsertionOrderIdArr = [];

        var isPrSaved = $(this).parent().parent().find("td").eq(0).children(".isPrSaved").val();
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        console.log("isPrSaved: " + isPrSaved);
        console.log("linkId: " + linkId);

        $("#ItemNumberSelect option").each(function() {
            var insOrderId = $(this).prop("value");
            if (insOrderId === insertionOrderId)
            {
                $(this).remove();
            }
        });

        $("#ItemNumberSelect").val("");
        $("#lineLevelTabsDiv").css("display", "none");

        if (isPrSaved === "Yes") {
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "deleteDataFromDBForDeletedPR",
                    "linkId": linkId,
                    "lineItemNumber": insertionOrderId
                },
                beforeSend: function() {
                    $("#overlay").css("display", "block");
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                success: function() {
                    $("#overlay").css("display", "none");
                }
            });
        }
    });

    $("#addEmptyPoLineBtn").click(function() {
        var prNoAvail = $("#material_headerClass tbody tr").length;
        console.log("prNoAvail: " + prNoAvail);
        var randomNumber = Math.floor(Math.random() * 100000);
        console.log("randomNumber: " + randomNumber);
        var PoFrom = $("#PoFrom").val();
        console.log("PoFrom: " + PoFrom);

        var accAss = "";
        var itemCat = "";
        var currency = "";
        var purOrg = "";
        var purGroup = "";
        $("#material_headerClass tbody tr").each(function(index) {
            if (index === 0)
            {
                accAss = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                currency = $(this).find("td").eq(13).children(".currencyClass").val();
                purOrg = $(this).find("td").eq(21).children(".purchaseOrganizationClass").val();
                purGroup = $(this).find("td").eq(22).children(".purchasingGroupClass").val();
                return;
            }
        });
        console.log("accAss: " + accAss);
        console.log("itemCat: " + itemCat);
        console.log("currency: " + currency);
        console.log("purOrg: " + purOrg);
        console.log("purGroup: " + purGroup);

        var insertionOrderId = "P" + (1 + prNoAvail) + "_" + (randomNumber * (10 * (1 + prNoAvail)));
        console.log("insertionOrderId: " + insertionOrderId);

        var option = "<option value=" + insertionOrderId + ">" + (10 * (1 + prNoAvail)) + "</option>";

        var currentDate = new Date();
        console.log("currentDate: " + currentDate);
        currentDate = (currentDate.getDate() < 10 ? ("0" + currentDate.getDate()) : currentDate.getDate()) + "."
                + ((currentDate.getMonth() + 1) < 10 ? ("0" + (currentDate.getMonth() + 1)) : (currentDate.getMonth() + 1)) + "."
                + currentDate.getFullYear();
        console.log("currentDate: " + currentDate);

        var uom = "";
        if ($("#PrType").val() === "Service")
        {
            uom = "AU";
        }
        else
        {
            uom = "";
        }

        var criticalitySelectBox = "<select style='width:150px;' class='custom-select criticalityClass'>"
                + "<option value=''>Select</option>"
                + "<option value='High Criticality (h)'>High Criticality (h)</option>"
                + "<option value='Low Criticality (l)'>Low Criticality (l)</option>"
                + "<option value='Off Site (o)'>Off Site (o)</option>"
                + "<option value='Manpower (m)'>Manpower (m)</option>"
                + "</select>";
        var criticalityInputField = "<input type='text' class='criticalityClass form-control form-rounded' value='' style='width:150px;' disabled>";
        var criticalityField = "";
        if ($("#PrType").val() === "Service")
        {
            criticalityField = criticalitySelectBox;
            itemCat = "D";
        }
        else
        {
            criticalityField = criticalityInputField;
        }

        if (PoFrom === "shortcutPo")
        {
            currency = $("#CurrencyDeliveryInvoice").val();
            purOrg = $("#purchasingOrg").val();
            purGroup = $("#purchasingGroup").val();
        }
        var companycode = $("#companycodeHeader").val();
        var row = "";
        row += "<tr>"
                + "<td><i class='fa fa-window-close fa-lg deleteEmptyPoLine' title='Delete'></i> "
                + "<input type='hidden' class='insertionOrderId_Class' value='" + insertionOrderId + "'>"
                + "<input type='hidden' class='linkId_Class' value='" + insertionOrderId + "'>"
                + "<input type='hidden' class='prType_Class' value=''>"
                + "<input type='hidden' class='prNumber_Class' value=''>"
                + "<input type='hidden' class='PRItemNumber_Class' value='" + (10 * (1 + prNoAvail)) + "'>"
                + "<input type='hidden' class='PRCompanyCode_Class' value='" + companycode + "'>"
                + "<input type='hidden' class='PODistribution' value=''>"
                + "<input type='hidden' class='POPartialInvoiceIndicator' value=''>"
                + "<input type='hidden' class='ValuationPrice' value=''>"
                + "<input type='hidden' class='POLineItemPackageNo' value=''>" // New
                + "<input type='hidden' class='POLineItemTaxCode' value=''>" // New
                + "<input type='hidden' class='noLimitHidden' value=''>"
                + "<input type='hidden' class='overAllLimitHidden' value=''>"
                + "<input type='hidden' class='expectedValueHidden' value=''>"
                + "<input type='hidden' class='invoiceReceiptHidden' value=''>"
                + "<input type='hidden' class='goodsReceiptHidden' value=''>"
                + "<input type='hidden' class='prMaterialCodeHidden' value=''>"
                + "<input type='hidden' class='prDeliveryDateCategoryHidden' value='D'>"
                + "<input type='hidden' class='prRequisitionDateHidden' value=''>"
                + "<input type='hidden' class='prCompanyCodeHidden' value=''>"
                + "<input type='hidden' class='prMaterialLongTextHidden' value=''>"
                + "<input type='hidden' class='isPrSaved' value='No'>"
                + "<input type='hidden' class='procInstId_Class' value=''>"
                + "<input type='hidden' class='prCriticalityHidden' value=''>"
                + "<input type='hidden' class='prTaxAmount' value=''>"
                + "<input type='hidden' class='prPackageNo' value=''>"
                + "<input type='hidden' class='serviceRefLineNo' value=''>"
                + "<input type='hidden' class='lineType' value='N'>"
                + "<input type='hidden' class='isPoLineOrPrLineOrRfqLineOrEmptyLine' value='EmptyLine'>"
                + "<input type='hidden' class='prRfqNumber' value=''>"
                + "<input type='hidden' class='prRfqLineItemNumber' value=''>"
                + "<input type='hidden' class='prgLCode'>" // New
                + "<input type='hidden' class='przGLCode'>" // New
                + "<input type='hidden' class='parentPrLineInsertionOrderId' value=''>" // New
                + "<input type='hidden' class='TexCodeForLineInPr'>"
                + "<input type='hidden' class='SegmentForLineInPr'>"
                + "<input type='hidden' class='quantityBeforeChange' value='1.000'>"
                + "<input type='hidden' class='prMfrPartNumber'>"
                + "<input type='hidden' class='prManufacturer'>"
                + "<input type='hidden' class='prNetPriceHidden'>"
                + "<input type='hidden' class='timeOfChangeCurrency' value='before'>"
                + "</td>"
                + "<td>" + (10 * (1 + prNoAvail)) + "</td>"
                + "<td><input type='text' class='form-control form-rounded accountAssignmentClass' value='' style='width:35px;'><input type='hidden' class='accountAssignmentDescClass'></td>"
                + "<td><input type='text' class='form-control form-rounded itemCategoryClass' value='' style='width:35px;'><input type='hidden' class='itemCategoryDescClass'></td>"
                + "<td><input type='text' class='materialCodeClass form-control form-rounded' value='' style='width:100px;'" + (itemCat === 'D' ? 'disabled' : '') + "></td>"
                + "<td><input type='text' class='form-control form-rounded pr-short-text' value='' style='width:340px;'></td>"
                + "<td><input type='text' class='form-control form-rounded pr-quantity' value='1.000' style='width:150px;'></td>"
                + "<td><input type='text' class='prUom form-control form-rounded' style='width:70px;' value='" + uom + "' disabled='true'></td>"
                + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value=''></td>"
                + "<td>" + criticalityField + "</td>"
                + "<td><input type='text' class='prDeliveryDateCat form-control form-rounded' value='D' readonly='true' style='width:40px;'></td>"
                + "<td><span class='PR_DeliveryDate'>" + currentDate + "</span> <input type='hidden' class='prDeliveryDatepicker'></td>"
                + "<td><input type='text' class='form-control form-rounded pr-net-price' value='' style='width:150px;'" + (itemCat === 'D' ? 'disabled' : '') + "></td>"
                + "<td><input type='text' class='currencyClass form-control form-rounded' value='" + currency + "' disabled='true' style='width:70px;'></td>"
                + "<td><input type='text' class='priceUnitClass form-control form-rounded' value='' style='width:150px;'></td>"
                + "<td><input type='text' class='materialGroupClass form-control form-rounded' value='' style='width:100px;'" + (itemCat !== 'D' ? 'disabled' : '') + "></td>"
                + "<td><input type='text' class='hiddenPlantCode form-control form-rounded' value='' style='width:70px;'" + (itemCat !== 'D' ? 'disabled' : '') + "></td>"
                + "<td><input type='text' class='storageLocationClass form-control form-rounded' value='' style='width:100px;'" + (itemCat !== 'D' ? 'disabled' : '') + "></td>"
                + "<td></td>"
                + "<td><input type='text' class='form-control form-rounded pr-tracking-number' value='' style='width:70px;'></td>"
                + "<td></td>"
                + "<td><input type='text' class='purchaseOrganizationClass form-control form-rounded' value='" + purOrg + "' style='width:70px;' disabled='true'></td>"
                + "<td><input type='text' class='purchasingGroupClass form-control form-rounded' value='" + purGroup + "' style='width:100px;' disabled='true'></td>"
                + "<td></td>"
                + "<td></td>"
                + "<td><input type='text' class='form-control form-rounded pr-requisitioner-id' value='' style='width:200px;'></td>"
                + "<td></td>"
                + "<td><input type='text' class='prDeptNameClass form-control form-rounded' value='' style='width:200px;'></td>"
                + "<td></td>"
                + "<td></td>"
                + "<td><input type='text' class='prImMaterial form-control form-rounded' style='width:100px;' readonly='true'></td>"
                + "<td><input type='checkbox' class='prReturnsItem'></td>"
                + "<td><input type='checkbox' class='prFreeOfCharge'></td>"
                + "<td><input type='text' class='pr-rfq-Number form-control form-rounded' style='width:150px;' readonly='true' value=''></td>"
                + "<td><input type='text' class='pr-rfq-line-item-number form-control form-rounded' style='width:70px;' readonly='true' value=''></td>"
                + "<td></td>"
                + "<td></td>"
                + "</tr>";

        $("#material_headerClass tbody").append(row);

        $("#ItemNumberSelect").append(option);
        $("#ItemNumberSelect").val("");
        prevousSelectedItem = "";
        $("#lineLevelTabsDiv").css("display", "none");

        refreshPrDelvDatepicker();
        hidePoLineTableColsByPoType();
    });

    $("#material_headerClass").on("click", ".deleteEmptyPoLine", function() {
        var insertionOrderId = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        console.log("insertionOrderId: " + insertionOrderId);

        $(this).parent().parent().remove();

        var isPrSaved = $(this).parent().parent().find("td").eq(0).children(".isPrSaved").val();
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        console.log("isPrSaved: " + isPrSaved);
        console.log("linkId: " + linkId);

        $("#ItemNumberSelect option").each(function() {
            var insOrderId = $(this).prop("value");
            if (insOrderId === insertionOrderId)
            {
                $(this).remove();
            }
        });

        $("#ItemNumberSelect").val("");
        $("#lineLevelTabsDiv").css("display", "none");

        if (isPrSaved === "Yes") {
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "deleteDataFromDBForDeletedPR",
                    "linkId": linkId,
                    "lineItemNumber": insertionOrderId
                },
                beforeSend: function() {
                    $("#overlay").css("display", "block");
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                success: function() {
                    $("#overlay").css("display", "none");
                }
            });
        }
    });

    // Account Assignment Category Picklist Code
    var currentPrLineRow = '';
    $("#material_headerClass").on("keypress", ".accountAssignmentClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentPrLineRow = $(this).parent().parent();
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

                $("#accountAssignmentCategoryModal").modal("show");
            }
        });
    }
    $("#accountAssignmentCategoryTableId").on("click", ".accountAssignmentModalTableTrClass", function() {

        var prType = $("#PrType").val();
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        if (prType === "Material") {
            $("#pOQuantitySKU").val("1.000");
        }

        var code = $(this).find("td").eq(0).text();

//        currentPrLineRow.find("td").eq(1).children(".accountAssignmentClass").val(code);
//        currentPrLineRow.find("td").eq(1).children(".accountAssignmentClass").css("border-color", "");

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

        console.log("code: " + code);
        $("#accountAssignmentCategory").val(code);
        currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").val(code);
        currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").css("border-color", "");
        var itemCat = currentPrLineRow.find("td").eq(3).children(".itemCategoryClass").val();
        if (prType === "Material") {
            if (code === "" && itemCat === "L") {
                $("#component_li").css("display", "block");
            } else {
                $("#component_li").css("display", "none");
            }
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
//        $("#ItemNumberSelect").val(itemNumber);
//        $('#lineLevelTabsDiv').css("display", "block");
        //Bittu Kumar======

        var accountAssignmentCategory = code;
        if (accountAssignmentCategory === 'K') {
            accAsgnCat_K_Dist_SAA("OnLoad");
            service_AccAsgnCat_K("OnLoad");
            limits_AccAsgnCat_K();
        } else if (accountAssignmentCategory === 'N') {
            accAsgnCat_N_Dist_SAA("OnLoad");
            service_AccAsgnCat_N("OnLoad");
            limits_AccAsgnCat_N();
        } else if (accountAssignmentCategory === 'A') {
            accAsgnCat_A_Dist_SAA("OnLoad");
            service_AccAsgnCat_A("OnLoad");
            limits_AccAsgnCat_A();
        } else if (accountAssignmentCategory === 'B') {
            accAsgnCat_B_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'C') {
            accAsgnCat_C_Dist_SAA("OnLoad");
            service_AccAsgnCat_C("OnLoad");
            limits_AccAsgnCat_C();
        } else if (accountAssignmentCategory === 'D') {
            accAsgnCat_D_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'E') {
            accAsgnCat_E_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'F') {
            accAsgnCat_F_Dist_SAA("OnLoad");
            service_AccAsgnCat_F("OnLoad");
            limits_AccAsgnCat_F();
        } else if (accountAssignmentCategory === 'G') {
            accAsgnCat_G_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'M') {
            accAsgnCat_M_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'P') {
            accAsgnCat_P_Dist_SAA("OnLoad");
            service_AccAsgnCat_P("OnLoad");
            limits_AccAsgnCat_P();
        } else if (accountAssignmentCategory === 'Q') {
            accAsgnCat_Q_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'R') {
            accAsgnCat_R_Dist_SAA("OnLoad");
            service_AccAsgnCat_R("OnLoad");
            limits_AccAsgnCat_R();
        } else if (accountAssignmentCategory === 'T') {
            accAsgnCat_T_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'U') {
            accAsgnCat_U_Dist_SAA("OnLoad");
        } else if (accountAssignmentCategory === 'X') {
            accAsgnCat_X_Dist_SAA("OnLoad");
            service_AccAsgnCat_X("OnLoad");
            limits_AccAsgnCat_X();
        } else if (accountAssignmentCategory === 'Z') {
            accAsgnCat_Z_Dist_SAA("OnLoad");
            service_AccAsgnCat_Z("OnLoad");
            limits_AccAsgnCat_Z();
        }

        if (prType === "Service") {
            $("#account_assignment-tab :input").prop("disabled", true);
            $("#costCenteraccountAssignmentTebleId").find("tbody tr").prop("disabled", true);
        }
        var poid = $("#poid").val();
//        alert("poid :" + poid);
//        if (poid === "") {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            $(this).find("td").eq(3).children(".AmountLineLevel").val("");
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val("");
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val("");
        });
//            alert("BITTU");
        calculationForPBXX();
//        }
        var isChecked = $("#PaymentImmediate").prop("checked");
        if (isChecked === true) {
            $("#TaxCode").val("PN");
        } else {
            $("#TaxCode").val("");
        }

        var code = $("#IncoTermsPart1").val();
        if (code === "DEL") {
            $("#incoTermsPart2Delivery").val("SELF DELIVER");
        } else if (code.trim() === "SC") {
            $("#incoTermsPart2Delivery").val("COLLECTION");
        } else {
            $("#incoTermsPart2Delivery").val("");
        }
    });

    // Item Category Picklist Code
    $("#material_headerClass").on("keypress", ".itemCategoryClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentPrLineRow = $(this).parent().parent();
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
                $("#amendEditPoItemCategoryModalTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#amendEditPoItemCategoryModalTable')) {
                    itemCatTable.destroy();
                    itemCatTable = null;
                    $("#amendEditPoItemCategoryModalTable").children('tbody').html(row);
                    itemCatTable = $('table.amendEditPoItemCategoryModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCatTable.buttons().container()
                            .appendTo('#amendEditPoItemCategoryModalTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#amendEditPoItemCategoryModalTable thead tr').clone(true).appendTo('#amendEditPoItemCategoryModalTable thead');
                    $('#amendEditPoItemCategoryModalTable thead tr:eq(1) th').each(function(i) {
                        $('#amendEditPoItemCategoryModalTable thead tr:eq(0) th').addClass("table-header-color");
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
                    itemCatTable = $('table.amendEditPoItemCategoryModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCatTable.buttons().container()
                            .appendTo('#amendEditPoItemCategoryModalTable_wrapper .col-md-6:eq(0)');
                }

                $("#amendEditPoItemCategoryModal").modal("show");
            }
        });
    }
    $("#amendEditPoItemCategoryModalTable").on("click", ".itemCategoryModalTableTrClass", function() {
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
        var prType = $("#PrType").val();
        console.log("prType: " + prType);
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
                $("#component_li").css("display", "block");
            } else {
                $("#component_li").css("display", "none");
            }
        }
        $("#amendEditPoItemCategoryModal").modal("hide");
    });

    // Material Code Picklist Code
    var prAccAss = '';
    $("#material_headerClass").on("keypress", ".materialCodeClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#materialRequestFrom").val("FromPoLine");
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
    //        materialCodedPrCurrent = $(this).parent().parent();
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
        var orderunit = $(this).find("td").eq(13).text();
        var materialType = $(this).find("td").eq(0).children(".materialType").val();
        console.log("materialType: " + materialType);

        if (materialRequestFrom === "FromPoLine")
        {
            var prAccAsgnCat = currentPrLineRow.find("td").eq(2).children(".accountAssignmentClass").val();
            var isPoLineOrPrLineOrRfqLineOrEmptyLine = currentPrLineRow.find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            var isPrSaved = currentPrLineRow.find("td").eq(0).children(".isPrSaved").val();
            console.log("prAccAsgnCat: " + prAccAsgnCat);
            console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);
            console.log("isPrSaved: " + isPrSaved);

            if ((prAccAsgnCat === "A" && materialType === "ASET") || (prAccAsgnCat !== "A" && materialType !== "ASET"))
            {
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

                            var infoRecordJsonObj = fetchInfoRecordDetails(code, "SA");
                            console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));

                            console.log("code: " + code);
                            currentPrLineRow.find("td").eq(4).children(".materialCodeClass").css("border-color", "");
                            currentPrLineRow.find("td").eq(4).children(".materialCodeClass").val(code);
                            currentPrLineRow.find("td").eq(5).children(".pr-short-text").val(shortText);
                            currentPrLineRow.find("td").eq(0).children(".prMaterialLongTextHidden").val(longText);
                            currentPrLineRow.find("td").eq(0).children(".prMaterialCodeHidden").val(code);

                            if (orderunit === "") {
                                currentPrLineRow.find("td").eq(7).children(".prUom").val(uom);
                                currentPrLineRow.find("td").eq(8).children(".prOrderPriceUnit").val(uom);
                            } else {
                                currentPrLineRow.find("td").eq(7).children(".prUom").val(uom);
                                currentPrLineRow.find("td").eq(8).children(".prOrderPriceUnit").val(orderunit);
                            }
                            if (Number(infoRecordJsonObj.mainCode) === 0) {
                                if (infoRecordJsonObj.VAR_ORD_UN === "1") {
                                    currentPrLineRow.find("td").eq(7).children(".prUom").prop("disabled", false);
                                } else {
                                    currentPrLineRow.find("td").eq(7).children(".prUom").prop("disabled", true);
                                }
                                if (infoRecordJsonObj.PO_UNIT !== "") {
                                    currentPrLineRow.find("td").eq(7).children(".prUom").val(infoRecordJsonObj.PO_UNIT);
                                }
                                if (infoRecordJsonObj.ORDERPR_UN !== "") {
                                    currentPrLineRow.find("td").eq(8).children(".prOrderPriceUnit").val(infoRecordJsonObj.ORDERPR_UN);
                                }
                                if (infoRecordJsonObj.CURRENCY !== "") {
                                    currentPrLineRow.find("td").eq(13).children(".currencyClass").val(infoRecordJsonObj.CURRENCY);
                                }
                                if (infoRecordJsonObj.PRICE_UNIT !== "") {
                                    currentPrLineRow.find("td").eq(14).children(".priceUnitClass").val(formatAmountByComma(Number(infoRecordJsonObj.PRICE_UNIT).toFixed(2)));
                                }
                            } else {
                                currentPrLineRow.find("td").eq(7).children(".prUom").prop("disabled", true);
                            }

                            currentPrLineRow.find("td").eq(17).children(".storageLocationClass").val(stLoc);
                            currentPrLineRow.find("td").eq(15).children(".materialGroupClass").val(matlGroup);
                            currentPrLineRow.find("td").eq(15).children(".materialGroupClass").css("border-color", "");
                            currentPrLineRow.find("td").eq(0).children(".prgLCode").val(glCode);
                            currentPrLineRow.find("td").eq(0).children(".przGLCode").val(zglCode);
                            currentPrLineRow.find("td").eq(16).children(".hiddenPlantCode").val(plant);

                            $("#Plant").val(plant);

                            // Update quantity/weights tab
                            var CompanyCode = $("#companycodeHeader").val();
                            var jsonArr = getMaterialMasterOnLoad(code, CompanyCode);
                            populateQtyWeights(jsonArr, currentPrLineRow, infoRecordJsonObj);
                            if (isPrSaved === "Yes") {
                                saveOrUpdateQuantityWeightsOnLoadFieldChange();
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
                            if (Number(infoRecordJsonObj.mainCode) === 0) {
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
                                    calculationForPBXX();
                                });
                            }
                            //                $("#conditionTableId tbody tr").each(function() {
                            //                    $(this).find("td").eq(7).children(".UoMHeader").val(uom);
                            //                    $(this).find("td").eq(6).children(".ConditionPricingUnitHeader").val(uom);
                            //                });
                            var insertionOrderId = currentPrLineRow.find("td").eq(0).children(".insertionOrderId_Class").val();
                            var insertionid = $("#ItemNumberSelect").val();
                            if (insertionid === insertionOrderId) {
                                saveConditionTabDataOnLoadFieldChange("materialcode");
                            }

                            calulateDeliveryDate(currentPrLineRow, code);
                            setPoLineLevelDataFromInfoRecord(infoRecordJsonObj, "", isPoLineOrPrLineOrRfqLineOrEmptyLine);
                            if (isPrSaved === "Yes") {
                                saveOrUpdateMaterialTab();
                                saveDeliveryTabDataOnLoadFieldChange();
                                saveInvoiceTabDataOnLoadFieldChange("OnLoad");
                                saveConfirmationsTabDataOnLoadFieldChange();
                            }

                            // Set Short Text in Item Number Dropdown
                            var prShortText = shortText;
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

                            // Set IM Material, MFR Part Number and Manufacturer
                            if (code !== "") {
                                var masterMaterialMARADetailsObj = findMasterMaterialMARAByMatCode(code);
                                if (masterMaterialMARADetailsObj["Result"] === "Found") {
                                    if (masterMaterialMARADetailsObj["MFRPN"] !== undefined && masterMaterialMARADetailsObj["MFRPN"] !== ""
                                            && masterMaterialMARADetailsObj["MFRNR"] !== undefined && masterMaterialMARADetailsObj["MFRNR"] !== "") {
                                        currentPrLineRow.find("td").eq(30).children(".prImMaterial").val(code);
                                    }
                                    if (masterMaterialMARADetailsObj["MFRPN"] !== undefined)
                                        currentPrLineRow.find("td").eq(0).children(".prMfrPartNumber").val(masterMaterialMARADetailsObj["MFRPN"]);
                                    if (masterMaterialMARADetailsObj["MFRNR"] !== undefined)
                                        currentPrLineRow.find("td").eq(0).children(".prManufacturer").val(masterMaterialMARADetailsObj["MFRNR"]);
                                }
                            }
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
                $("#materialMasterModal").modal("hide");
                componentTabCurrentLoc.find("td").eq(0).children(".comMaterial").val(code);
                componentTabCurrentLoc.find("td").eq(1).children(".comDescription").val(shortText);
                componentTabCurrentLoc.find("td").eq(5).children(".comProdStorageLoc").val(stLoc);
                saveComponentTblDataOnLoadFieldChange();
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

    var componentTabCurrentLoc = "";
    $("#componentTableIdLineLevel").on("keypress", ".comMaterial", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            $("#materialRequestFrom").val("FromComponentTab");
            componentTabCurrentLoc = $(this).parent().parent();
            $("#componentsModal").modal("hide");
            var prAccAss = "";
            var insertionid = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === id) {
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
                    var tempDateArr = currentDateAfterAddingPlanDelvTime.toString().split("-");
                    currentPrLineRow.find("td").eq(11).children(".PR_DeliveryDate").text(tempDateArr[2] + "." + tempDateArr[1] + "." + tempDateArr[0]);
                    $("#DeliveryScheduleTableId tbody tr").each(function() {
                        $(this).find("td").eq(1).children(".deliveryDateClass").val(currentDateAfterAddingPlanDelvTime);
                    });
                    $("#PlDeliveryTime").val(PlannedDelvTime);
                }
            }
        });
    }

    // Plant Picklist Code
    $("#material_headerClass").on("keypress", ".hiddenPlantCode", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentPrLineRow = $(this).parent().parent();
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getPlantMaster();
                $("#overlay").css("display", "none");
            }, 1000);
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

                $("#plantMasterModal").modal("show");
            }
        });
    }
    $("#plantMasterTable").on("click", ".plantMasterTrClass", function() {
        var plant = $(this).find("td").eq(1).text();
        console.log("plant: " + plant);
        currentPrLineRow.find("td").eq(16).children(".hiddenPlantCode").val(plant);
        currentPrLineRow.find("td").eq(16).children(".hiddenPlantCode").css("border-color", "");
        $("#plantMasterModal").modal("hide");
    });

    // Material Group Picklist Code
    $("#material_headerClass").on("keypress", ".materialGroupClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentPrLineRow = $(this).parent().parent();
            $("#material_headerClass tbody tr").each(function(index) {
                if (index === 0)
                {
                    materialGroup = $(this).find("td").eq(15).children(".materialGroupClass").val();
                    return;
                }
            });
            console.log("materialGroup: " + materialGroup);
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getAllMaterialGroup();
                $("#overlay").css("display", "none");
            }, 1000);
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
                $("#EditAndAmendPoMatlGroupTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#EditAndAmendPoMatlGroupTableId')) {
                    matlGroupTable.destroy();
                    matlGroupTable = null;
                    $("#EditAndAmendPoMatlGroupTableId").children('tbody').html(row);
                    matlGroupTable = $('table.EditAndAmendPoMatlGroupTableId').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    matlGroupTable.buttons().container()
                            .appendTo('#EditAndAmendPoMatlGroupTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#EditAndAmendPoMatlGroupTableId thead tr').clone(true).appendTo('#EditAndAmendPoMatlGroupTableId thead');
                    $('#EditAndAmendPoMatlGroupTableId thead tr:eq(1) th').each(function(i) {
                        $('#EditAndAmendPoMatlGroupTableId thead tr:eq(0) th').addClass("table-header-color");
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
                    matlGroupTable = $('table.EditAndAmendPoMatlGroupTableId').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    matlGroupTable.buttons().container()
                            .appendTo('#EditAndAmendPoMatlGroupTableId_wrapper .col-md-6:eq(0)');
                }

                $("#EditAndAmendPoMatlGroupModal").modal("show");
            }
        });
    }
    var materialGroup = "";
    $("#EditAndAmendPoMatlGroupTableId").on("click", ".checkMaterialGroupTableClass", function() {
        var group = $(this).parent().parent().find('td').eq(1).text();
        console.log("group code: " + group);
//        var reqFrom = $("#materialGroupReqFrom").val();
//        if (reqFrom === "FromField") {
//            $("#MatlGroup").val(group);
//        } else if (reqFrom === "FromPRTable") 
        {
            var prLength = $("#material_headerClass tbody tr").length;
            if (prLength === 1) {
                currentPrLineRow.find("td").eq(15).children(".materialGroupClass").val(group);
                currentPrLineRow.find("td").eq(15).children(".materialGroupClass").css("border-color", "");
                materialGroup = group;
            } else if (prLength !== 1) {
                if (group !== materialGroup) {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    var errorMsg = "Material Group should be same for all PO Line!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
//                    $(this).parent().parent().find("td").eq(1).children(".accountAssignmentClass").focus();
                    return false;
                } else {
                    currentPrLineRow.find("td").eq(15).children(".materialGroupClass").val(group);
                    currentPrLineRow.find("td").eq(15).children(".materialGroupClass").css("border-color", "");
                    materialGroup = group;
                }
            }
        }
        materialGroup = group;
        $("#EditAndAmendPoMatlGroupModal").modal("hide");
    });

    // Storage Location Picklist Code
    $("#material_headerClass").on("keypress", ".storageLocationClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentPrLineRow = $(this).parent().parent();
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getStorageLocationMaster();
                $("#overlay").css("display", "none");
            }, 1000);
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

                $("#StorageLocationMasterModal").modal("show");
            }
        });
    }
    $("#storageLocationMasterTable").on("click", ".storgageLocMasterTrClass", function() {
        var loc = $(this).find("td").eq(0).text();
        console.log("loc: " + loc);
        currentPrLineRow.find("td").eq(17).children(".storageLocationClass").val(loc);
        currentPrLineRow.find("td").eq(17).children(".storageLocationClass").css("border-color", "");
        $("#StorageLocationMasterModal").modal("hide");
    });

    // PR Department
    $("#material_headerClass").on("keypress", ".prDeptNameClass", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentPrLineRow = $(this).parent().parent();
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getDepartmentMaster();
                $("#overlay").css("display", "none");
            }, 1000);
        }
    });
    var deptMasterTable = null;
    function getDepartmentMaster() {
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

                $("#DepartmentMasterModal").modal("show");
            }
        });
    }
    $("#departmentMasterTable").on("click", ".departmentMasterTrClass", function() {
        var dept = $(this).find("td").eq(0).text();
        console.log("dept: " + dept);
        currentPrLineRow.find("td").eq(27).children(".prDeptNameClass").val(dept);
        $("#DepartmentMasterModal").modal("hide");
    });

    // Add RFQ Line
    var rfqLineModalTable = null;
    $("#addRfqLineBtn").click(function() {
        console.log("addRfqLineBtn");
        var vendorCode = $("#editAmendPoVendorCode").val();
        console.log("vendorCode: " + vendorCode);
        var PoFrom = $("#PoFrom").val();
        console.log("PoFrom: " + PoFrom);
        if (PoFrom === "shortcutPo")
        {
            var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
            var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
            var vendorName = vendorNameCode.substring(0, vendorNameCode.lastIndexOf('-'));
            console.log(vendorCode + ", " + vendorName);
        }
        var prType = $("#PrType").val();
        console.log("prType: " + prType);
        $.ajax({
            type: "GET",
            url: "createAmendDeletePoGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "findWorkOrderRfqLineItemByRfqStatus",
                "vendorCode": vendorCode,
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
                var editAmendPoRfqLineItemJsonArr = $.parseJSON(responseJson.responseText);
//                console.log("JSON.stringify(editAmendPoRfqLineItemJsonArr): " + JSON.stringify(editAmendPoRfqLineItemJsonArr));
                editAmendPoRfqLineItemJsonArr = JSON.parse(JSON.stringify(editAmendPoRfqLineItemJsonArr));
                console.log("editAmendPoRfqLineItemJsonArr len: " + editAmendPoRfqLineItemJsonArr.length);
                var row = "";
                var tempNewRfqLineRfqIdRfqLineIdInsertionOrderId = $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val();
                for (var i = 0; i < editAmendPoRfqLineItemJsonArr.length; i++)
                {
                    var rfqIdRfqLineIdInsertionOrderId = editAmendPoRfqLineItemJsonArr[i].rfqId + "#" + editAmendPoRfqLineItemJsonArr[i].rfqLineId + "#" + editAmendPoRfqLineItemJsonArr[i].insertionOrderId;
                    if (tempNewRfqLineRfqIdRfqLineIdInsertionOrderId.indexOf(rfqIdRfqLineIdInsertionOrderId) === -1)
                    {
                        row += "<tr>"
                                + "<td>"
                                + "<input type='checkbox' class='selectRfqLineCheckBox' " + (Number(editAmendPoRfqLineItemJsonArr[i].remainingQuantity) === 0 ? 'disabled' : '') + ">"
                                + "<input type='hidden' class='rfqId' value='" + editAmendPoRfqLineItemJsonArr[i].rfqId + "'>"
                                + "<input type='hidden' class='rfqLineId' value='" + editAmendPoRfqLineItemJsonArr[i].rfqLineId + "'>"
                                + "<input type='hidden' class='insertionOrderId' value='" + editAmendPoRfqLineItemJsonArr[i].insertionOrderId + "'>"
                                + "<input type='hidden' class='rfqStatus' value='" + editAmendPoRfqLineItemJsonArr[i].rfqStatus + "'>"
                                + "<input type='hidden' class='rfqLineItemNumber' value='" + (editAmendPoRfqLineItemJsonArr[i].rfqLineItemNumber === undefined ? "" : editAmendPoRfqLineItemJsonArr[i].rfqLineItemNumber) + "'>"
                                + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].rfqNo) + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].rfqLineItemNumber === undefined ? "" : editAmendPoRfqLineItemJsonArr[i].rfqLineItemNumber) + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].totalQuantity) + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].remainingQuantity !== undefined ? editAmendPoRfqLineItemJsonArr[i].remainingQuantity : editAmendPoRfqLineItemJsonArr[i].totalQuantity) + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].purchaseRequestNumber) + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].materialCode !== undefined ? editAmendPoRfqLineItemJsonArr[i].materialCode : '') + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].materialGroup !== undefined ? editAmendPoRfqLineItemJsonArr[i].materialGroup : '') + "</td>"
                                + "<td>" + (editAmendPoRfqLineItemJsonArr[i].shortText !== undefined ? editAmendPoRfqLineItemJsonArr[i].shortText : '') + "</td>"
                                + "</tr>";
                    }
                }
                $("#rfqLineModalTable tbody").append(row);

                if ($.fn.DataTable.isDataTable('#rfqLineModalTable')) {
                    rfqLineModalTable.destroy();
                    rfqLineModalTable = null;
                    $("#rfqLineModalTable").children('tbody').html(row);
                    rfqLineModalTable = $('table.rfqLineModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    rfqLineModalTable.buttons().container()
                            .appendTo('#rfqLineModalTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#rfqLineModalTable thead tr').clone(true).appendTo('#rfqLineModalTable thead');
                    $('#rfqLineModalTable thead tr:eq(1) th').each(function(i) {
                        $('#rfqLineModalTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (rfqLineModalTable.column(i).search() !== this.value) {
                                rfqLineModalTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    rfqLineModalTable = $('table.rfqLineModalTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    rfqLineModalTable.buttons().container()
                            .appendTo('#rfqLineModalTable_wrapper .col-md-6:eq(0)');
                }
                $("#rfqLineModal").modal("show");
            }
        });
    });
    $("#rfqLineModalTable").on("click", ".selectRfqLineCheckBox", function() {
        var rfqId = $(this).parent().children(".rfqId").val();
        var rfqLineId = $(this).parent().children(".rfqLineId").val();
        var insertionOrderId = $(this).parent().children(".insertionOrderId").val();

        console.log("rfqId: " + rfqId);
        console.log("rfqLineId: " + rfqLineId);
        console.log("insertionOrderId: " + insertionOrderId);

        var rfqIdRfqLineIdInsertionOrderId = rfqId + "#" + rfqLineId + "#" + insertionOrderId;
        console.log("rfqIdRfqLineIdInsertionOrderId: " + rfqIdRfqLineIdInsertionOrderId);

        if ($(this).prop("checked"))
        {
            newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.push(rfqIdRfqLineIdInsertionOrderId);
        }
        else
        {
            var index = newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.indexOf(rfqIdRfqLineIdInsertionOrderId);
            newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.splice(index, 1);
        }
        console.log("newRfqLineRfqIdRfqLineIdInsertionOrderIdArr: " + newRfqLineRfqIdRfqLineIdInsertionOrderIdArr);
    });
    $("#rfqLineModalAddBtn").click(function() {
        console.log("rfqLineModalAddBtn");
        console.log("newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.length: " + newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.length);

        if (newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.length === 0)
        {
            if (alertNotification !== null)
            {
                alertNotification.destroy();
            }
            alertNotification = Lobibox.alert("error", {
                msg: "Kindly select atleast one RFQ Line!"
            });
        }
        else
        {
            $("#rfqLineModal").modal("hide");
            $("#overlay").css("display", "block");
            setTimeout(function() {
                console.log("newRfqLineRfqIdRfqLineIdInsertionOrderIdArr: " + newRfqLineRfqIdRfqLineIdInsertionOrderIdArr);
                var row = "";
                var option = "";
                for (var i = 0; i < newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.length; i++)
                {
                    var rfqIdRfqLineIdInsertionOrderIdArr = newRfqLineRfqIdRfqLineIdInsertionOrderIdArr[i].split("#");

                    var rfqId = rfqIdRfqLineIdInsertionOrderIdArr[0];
                    var rfqLineId = rfqIdRfqLineIdInsertionOrderIdArr[1];
                    var insertionOrderId = rfqIdRfqLineIdInsertionOrderIdArr[2];
                    var vendorId = $("#editAmendPoVendorId").val();
                    var PoFrom = $("#PoFrom").val();
                    console.log("PoFrom: " + PoFrom);
                    if (PoFrom === "shortcutPo")
                    {
                        vendorId = $("#vendorSno").val(); // $("#vendorcodeHeader").val();
                    }
                    console.log("rfqId: " + rfqId);
                    console.log("rfqLineId: " + rfqLineId);
                    console.log("insertionOrderId: " + insertionOrderId);
                    console.log("vendorId: " + vendorId);

                    $.ajax({
                        type: "GET",
                        url: "createAmendDeletePoGetAjaxRequest.do",
                        async: false,
                        data: {
                            "reqFrom": "findPrDetailsAndSupplierLineDetailsAndRfqLineDetails",
                            "vendorId": vendorId,
                            "rfqId": rfqId,
                            "rfqLineId": rfqLineId,
                            "insertionOrderId": insertionOrderId
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
                            var detailsJsonObj = $.parseJSON(responseJson.responseText);
//                        console.log("JSON.stringify(detailsJsonObj): " + JSON.stringify(detailsJsonObj));
                            detailsJsonObj = JSON.parse(JSON.stringify(detailsJsonObj));

                            var headerCurrency = $("#CurrencyDeliveryInvoice").val();
                            var PRLineJsonObj = detailsJsonObj.PRLineJsonObj;
                            var RfqHeaderJsonObj = detailsJsonObj.RfqHeaderJsonObj;
                            var RfqLineItemJsonObj = detailsJsonObj.RfqLineItemJsonObj;
                            var SupplierHeaderJsonObj = detailsJsonObj.SupplierHeaderJsonObj;
                            var SupplierLineItemJsonObj = detailsJsonObj.SupplierLineItemJsonObj;

                            var rfqNumber = RfqHeaderJsonObj.rfqNumber;
                            var rfqLineItemNumber = RfqLineItemJsonObj.itemNumber === undefined ? RfqLineItemJsonObj.itemNumber : RfqLineItemJsonObj.itemNumber;
                            var rfqLineQuantity = RfqLineItemJsonObj.remainingQuantity === undefined ? RfqLineItemJsonObj.quantity : RfqLineItemJsonObj.remainingQuantity;
                            var vendorPerUnitPrice = SupplierLineItemJsonObj.vendorpriceofferedperunit;

                            console.log("rfqLineQuantity 1: " + rfqLineQuantity);
                            rfqLineQuantity = Number(rfqLineQuantity).toFixed(3);
                            console.log("rfqLineQuantity 2: " + rfqLineQuantity);

                            var totalNetPrice = "";
                            var prNoAvail = $("#material_headerClass tbody tr").length;
                            console.log("prNoAvail: " + prNoAvail);
                            var randomNumber = Math.floor(Math.random() * 100000);
                            console.log("randomNumber: " + randomNumber);

                            var insertionOrderId = "P" + (i + 1 + prNoAvail) + "_" + (randomNumber * (10 * (1 + prNoAvail)));
                            console.log("insertionOrderId: " + insertionOrderId);

                            totalNetPrice = Number(rfqLineQuantity) * Number(vendorPerUnitPrice);

                            var months = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "July": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"};
                            var requisitionDate = (PRLineJsonObj.requisitionDate === undefined ? "" : PRLineJsonObj.requisitionDate);
                            var requisitionDateNew = "";
                            if (requisitionDate !== "")
                            {
                                var requisitionDateSplitArr = requisitionDate.split(" ");
                                requisitionDateNew = requisitionDateSplitArr[0] + "." + months[requisitionDateSplitArr[1]] + "." + requisitionDateSplitArr[2];
                            }
                            console.log("requisitionDateNew: " + requisitionDateNew);

                            var deliveryDate = (PRLineJsonObj.deliveryDate === undefined ? "" : PRLineJsonObj.deliveryDate);
                            var deliveryDateNew = "";
                            if (deliveryDate !== "")
                            {
                                var deliveryDateSplitArr = deliveryDate.split("/");
                                deliveryDateNew = deliveryDateSplitArr[0] + "." + deliveryDateSplitArr[1] + "." + deliveryDateSplitArr[2];
                            }
                            console.log("deliveryDateNew: " + deliveryDateNew);

                            option += "<option value=" + insertionOrderId + ">" + (10 * (i + 1 + prNoAvail)) + " - " + (PRLineJsonObj.shortText === undefined ? "" : PRLineJsonObj.shortText) + "</option>";
                            var itemCat = PRLineJsonObj.itemCategory === undefined ? "" : PRLineJsonObj.itemCategory;

                            var prLineCurrency = (PRLineJsonObj.currency === undefined ? "" : PRLineJsonObj.currency);
                            console.log("prLineCurrency before: " + prLineCurrency);
                            console.log("totalNetPrice before: " + totalNetPrice);
                            if (headerCurrency !== prLineCurrency && totalNetPrice !== "")
                            {
                                prLineCurrency = headerCurrency;
                                var exchangeRate = getExchangeRate(prLineCurrency, headerCurrency);
                                console.log("exchangeRate: " + exchangeRate);
                                if (exchangeRate !== "" && exchangeRate !== undefined)
                                {
                                    totalNetPrice = Number(totalNetPrice) * Number(exchangeRate);
                                    console.log("NetPrice after changing pr line currency: " + totalNetPrice);
                                }
                            }

                            /*UOM population on RFQ Addition code by Bittu Starts*/
                            var unit = PRLineJsonObj.unit === undefined ? "" : PRLineJsonObj.unit;
                            var PrType = $("#PrType").val();
                            var quantityBeforeChange = rfqLineQuantity;
                            if (PrType === "Material") {
                                var jsonArr = getMaterialMasterOnLoad(PRLineJsonObj.materialCode, PRLineJsonObj.company);
//                                var jsonArr = getMaterialMasterOnLoad("0518A0023", PRLineJsonObj.company);
                                if (jsonArr.length !== 0) {
                                    if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                                        var convFrom = jsonArr[0].conversionFrom;
                                        var convTo = jsonArr[0].conversionTo;
                                        if (rfqLineQuantity !== "") {
                                            rfqLineQuantity = Number(convTo) / Number(convFrom) * Number(rfqLineQuantity);
                                            unit = jsonArr[0].orderUnit;

                                        }
                                    }
                                }
                            }
                            /*UOM population code by Bittu End*/

                            // Set IM Material, MFR Part Number and Manufacturer
                            var MFRPN = "";
                            var MFRNR = "";
                            var imMaterial = "";
                            if (PRLineJsonObj.materialCode !== undefined && PRLineJsonObj.materialCode !== "")
                            {
                                var masterMaterialMARADetailsObj = findMasterMaterialMARAByMatCode(PRLineJsonObj.materialCode);
                                if (masterMaterialMARADetailsObj["Result"] === "Found") {
                                    if (masterMaterialMARADetailsObj["MFRPN"] !== undefined && masterMaterialMARADetailsObj["MFRPN"] !== ""
                                            && masterMaterialMARADetailsObj["MFRNR"] !== undefined && masterMaterialMARADetailsObj["MFRNR"] !== "") {
                                        imMaterial = PRLineJsonObj.materialCode;
                                    }
                                    if (masterMaterialMARADetailsObj["MFRPN"] !== undefined) {
                                        MFRPN = masterMaterialMARADetailsObj["MFRPN"];
                                    }
                                    if (masterMaterialMARADetailsObj["MFRNR"] !== undefined) {
                                        MFRNR = masterMaterialMARADetailsObj["MFRNR"];
                                    }
                                }
                            }

                            // Fetch info record details
                            var isVariableOrderUnitActive = false;
                            var infoRecordOPU = "";
                            if (PRLineJsonObj.materialCode !== undefined && PRLineJsonObj.materialCode !== "") {
                                var infoRecordJsonObj = fetchInfoRecordDetails(PRLineJsonObj.materialCode, "PR");
                                console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));
                                if (Number(infoRecordJsonObj.mainCode) === 0) {
                                    if (infoRecordJsonObj.VAR_ORD_UN === "Active") {
                                        isVariableOrderUnitActive = true;
                                    }
                                    if (infoRecordJsonObj.ORDERPR_UN !== "") {
                                        infoRecordOPU = infoRecordJsonObj.ORDERPR_UN;
                                    }
                                }
                            }

                            row += "<tr>"
                                    + "<td>" + (itemCat !== 'D' && Number(rfqLineQuantity) > 1 ? "<i class='fa fa-columns fa-lg clonePoLine' title='Split PO Line'></i> " : "") + "<i class='fa fa-window-close fa-lg deleteRfqLine' title='Delete'></i>"
                                    + "<input type='hidden' class='insertionOrderId_Class' value='" + insertionOrderId + "'>"
                                    + "<input type='hidden' class='linkId_Class' value='" + PRLineJsonObj.linkId + "'>"
                                    + "<input type='hidden' class='prType_Class' value='" + PRLineJsonObj.prType + "'>"
                                    + "<input type='hidden' class='prNumber_Class' value='" + PRLineJsonObj.purchaseRequestNumber + "'>"
                                    + "<input type='hidden' class='PRItemNumber_Class' value='" + (10 * (i + 1 + prNoAvail)) + "'>"
                                    + "<input type='hidden' class='PRCompanyCode_Class' value='" + PRLineJsonObj.company + "'>"
                                    + "<input type='hidden' class='PODistribution' value=''>"
                                    + "<input type='hidden' class='POPartialInvoiceIndicator' value=''>"
                                    + "<input type='hidden' class='ValuationPrice' value='" + (PRLineJsonObj.valuationPrice === undefined ? "" : PRLineJsonObj.valuationPrice) + "'>"
                                    + "<input type='hidden' class='POLineItemPackageNo' value=''>" // New
                                    + "<input type='hidden' class='POLineItemTaxCode' value=''>"    // New
                                    + "<input type='hidden' class='noLimitHidden' value='" + (PRLineJsonObj.noLimit === undefined ? "" : PRLineJsonObj.noLimit) + "'>"
                                    + "<input type='hidden' class='overAllLimitHidden' value='" + (PRLineJsonObj.overAllLimit === undefined ? "" : PRLineJsonObj.overAllLimit) + "'>"
                                    + "<input type='hidden' class='expectedValueHidden' value='" + (PRLineJsonObj.expectedValue === undefined ? "" : PRLineJsonObj.expectedValue) + "'>"
                                    + "<input type='hidden' class='invoiceReceiptHidden' value='" + (PRLineJsonObj.invoiceReceipt === undefined ? "" : PRLineJsonObj.invoiceReceipt) + "'>"
                                    + "<input type='hidden' class='goodsReceiptHidden' value='" + (PRLineJsonObj.goodsReceipt === undefined ? "" : PRLineJsonObj.goodsReceipt) + "'>"
                                    + "<input type='hidden' class='prMaterialCodeHidden' value='" + (PRLineJsonObj.materialCode === undefined ? "" : PRLineJsonObj.materialCode) + "'>"
                                    + "<input type='hidden' class='prDeliveryDateCategoryHidden' value='" + (PRLineJsonObj.deliveryDateCategory === undefined ? "" : PRLineJsonObj.deliveryDateCategory) + "'>"
                                    + "<input type='hidden' class='prRequisitionDateHidden' value='" + requisitionDateNew + "'>"
                                    + "<input type='hidden' class='prCompanyCodeHidden' value='" + PRLineJsonObj.company + "'>"
                                    + "<input type='hidden' class='prMaterialLongTextHidden' value='" + (PRLineJsonObj.materialLongText === undefined ? "" : PRLineJsonObj.materialLongText) + "'>"
                                    + "<input type='hidden' class='isPrSaved' value='No'>"
                                    + "<input type='hidden' class='procInstId_Class' value='" + PRLineJsonObj.procInstId + "'>"
                                    + "<input type='hidden' class='prCriticalityHidden' value='" + (PRLineJsonObj.criticality === undefined ? "" : PRLineJsonObj.criticality) + "'>"
                                    + "<input type='hidden' class='prTaxAmount' value=''>"
                                    + "<input type='hidden' class='prPackageNo' value=''>"
                                    + "<input type='hidden' class='serviceRefLineNo' value=''>"
                                    + "<input type='hidden' class='lineType' value='N'>"
                                    + "<input type='hidden' class='TexCodeForLineInPr'>"
                                    + "<input type='hidden' class='SegmentForLineInPr'>"
                                    + "<input type='hidden' class='isPoLineOrPrLineOrRfqLineOrEmptyLine' value='RfqLine'>"
                                    + "<input type='hidden' class='prRfqNumber' value='" + rfqNumber + "'>"
                                    + "<input type='hidden' class='prRfqLineItemNumber' value='" + (rfqLineItemNumber === undefined ? "" : rfqLineItemNumber) + "'>"
                                    + "<input type='hidden' class='totalQuantityOfThisLine' value='" + Number(rfqLineQuantity).toFixed(3) + "'>" // New
                                    + "<input type='hidden' class='rfqIdRfqLineIdInsertionOrderIdString' value='" + newRfqLineRfqIdRfqLineIdInsertionOrderIdArr[i] + "'>" // New
                                    + "<input type='hidden' class='parentPrLineInsertionOrderId' value=''>" // New
                                    + "<input type='hidden' class='quantityBeforeChange' value='" + Number(quantityBeforeChange).toFixed(3) + "'>"
                                    + "<input type='hidden' class='prMfrPartNumber' value='" + MFRPN + "'>"
                                    + "<input type='hidden' class='prManufacturer' value='" + MFRNR + "'>"
                                    + "<input type='hidden' class='prNetPriceHidden' value='" + (PRLineJsonObj.prNetPrice === undefined ? "" : PRLineJsonObj.prNetPrice) + "'>"
                                    + "<input type='hidden' class='timeOfChangeCurrency' value='before'>"
                                    + "</td>"
                                    + "<td>" + (10 * (i + 1 + prNoAvail)) + "</td>"
                                    + "<td><input type='text' class='form-control form-rounded accountAssignmentClass' value='" + (PRLineJsonObj.accountAssignment === undefined ? "" : PRLineJsonObj.accountAssignment) + "' disabled='true' style='width:35px;'><input type='hidden' class='accountAssignmentDescClass'></td>"
                                    + "<td><input type='text' class='form-control form-rounded itemCategoryClass' value='" + (PRLineJsonObj.itemCategory === undefined ? "" : PRLineJsonObj.itemCategory) + "' disabled='true' style='width:35px;'><input type='hidden' class='itemCategoryDescClass'></td>"
                                    + "<td><input type='text' class='materialCodeClass form-control form-rounded' value='" + (PRLineJsonObj.materialCode === undefined ? "" : PRLineJsonObj.materialCode) + "' style='width:100px;' disabled='true'></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-short-text' value='" + (PRLineJsonObj.shortText === undefined ? "" : PRLineJsonObj.shortText) + "' style='width:340px;'" + (itemCat !== 'D' ? 'disabled' : '') + "></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-quantity' value='" + formatNumberByComma(rfqLineQuantity) + "' style='width:130px;'" + (itemCat === 'D' ? 'disabled' : '') + "></td>"
                                    + "<td><input type='text' class='prUom form-control form-rounded' style='width:70px;' value='" + unit + "' " + (isVariableOrderUnitActive === false ? 'disabled' : '') + "></td>"
                                    + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value='" + (infoRecordOPU !== "" ? infoRecordOPU : unit) + "'></td>"
                                    + "<td><input type='text' class='criticalityClass form-control form-rounded' value='" + (PRLineJsonObj.criticality === undefined ? "" : PRLineJsonObj.criticality) + "' style='width:150px;' disabled='true'></td>"
                                    + "<td><input type='text' class='prDeliveryDateCat form-control form-rounded' value='" + (PRLineJsonObj.deliveryDateCategory === undefined ? "" : PRLineJsonObj.deliveryDateCategory) + "' readonly='true' style='width:40px;'></td>"
                                    + "<td><span class='PR_DeliveryDate'>" + deliveryDateNew + "</span> <input type='hidden' class='prDeliveryDatepicker'></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-net-price' value='" + formatAmountByComma(Number(totalNetPrice).toFixed(2)) + "' " + (itemCat === 'D' ? 'disabled' : '') + " style='width:150px;'></td>"
                                    + "<td><input type='text' class='currencyClass form-control form-rounded' value='" + (prLineCurrency === undefined ? "" : prLineCurrency) + "' disabled='true' style='width:70px;'></td>"
                                    + "<td><input type='text' class='priceUnitClass form-control form-rounded' value='" + (PRLineJsonObj.priceUnit === undefined ? "" : formatAmountByComma(Number(PRLineJsonObj.priceUnit).toFixed(2))) + "' disabled='true' style='width:150px;'></td>"
                                    + "<td><input type='text' class='materialGroupClass form-control form-rounded' value='" + (PRLineJsonObj.materialGroup === undefined ? "" : PRLineJsonObj.materialGroup) + "' disabled='true' style='width:100px;'></td>"
                                    + "<td><input type='text' class='hiddenPlantCode form-control form-rounded' value='" + (PRLineJsonObj.plantCode === undefined ? "" : PRLineJsonObj.plantCode) + "' disabled='true' style='width:70px;'></td>"
                                    + "<td><input type='text' class='storageLocationClass form-control form-rounded' value='" + (PRLineJsonObj.storageLocation === undefined ? "" : PRLineJsonObj.storageLocation) + "' disabled='true' style='width:100px;'></td>"
                                    + "<td></td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-tracking-number' value='" + (PRLineJsonObj.departmentDescription === undefined ? "" : PRLineJsonObj.departmentDescription) + "' style='width:70px;'></td>"
                                    + "<td>" + (PRLineJsonObj.infoRecord === undefined ? "" : PRLineJsonObj.infoRecord) + "</td>"
                                    + "<td><input type='text' class='purchaseOrganizationClass form-control form-rounded' value='" + (PRLineJsonObj.purchaseOrganization === undefined ? "" : PRLineJsonObj.purchaseOrganization) + "' disabled='true' style='width:70px;'></td>"
                                    + "<td><input type='text' class='purchasingGroupClass form-control form-rounded' value='" + (PRLineJsonObj.purchasingGroup === undefined ? "" : PRLineJsonObj.purchasingGroup) + "' disabled='true' style='width:100px;'></td>"
                                    + "<td>" + (PRLineJsonObj.purchaseRequestNumber === undefined ? "" : PRLineJsonObj.purchaseRequestNumber) + "</td>"
                                    + "<td>" + (PRLineJsonObj.itemNumber === undefined ? "" : PRLineJsonObj.itemNumber) + "</td>"
                                    + "<td><input type='text' class='form-control form-rounded pr-requisitioner-id' value='" + (PRLineJsonObj.requisitionerId === undefined ? "" : PRLineJsonObj.requisitionerId) + "' style='width:200px;'" + (itemCat !== 'D' ? 'disabled' : '') + "></td>"
                                    + "<td>" + (PRLineJsonObj.prCreator === undefined ? "" : PRLineJsonObj.prCreator) + "</td>"
                                    + "<td><input type='text' class='prDeptNameClass form-control form-rounded' value='' disabled='true' style='width:200px;'></td>"
                                    + "<td></td>"
                                    + "<td></td>"
                                    + "<td><input type='text' class='prImMaterial form-control form-rounded' style='width:100px;' readonly='true' value=" + imMaterial + "></td>"
                                    + "<td><input type='checkbox' class='prReturnsItem'></td>"
                                    + "<td><input type='checkbox' class='prFreeOfCharge'></td>"
                                    + "<td><input type='text' class='pr-rfq-Number form-control form-rounded' style='width:150px;' readonly='true' value=''></td>"
                                    + "<td><input type='text' class='pr-rfq-line-item-number form-control form-rounded' style='width:70px;' readonly='true' value=''></td>"
                                    + "<td></td>"
                                    + "<td></td>"
                                    + "</tr>";

                            if ($("#PrType").val() === "Service") {
                                var linkidArray = [];
                                var lineItemNumberArr = [];
                                var PrItemNumber = "";
                                var PrItemNumberArr = [];
                                var accAsgnCatArr = [];
                                var prNoAvail = $("#material_headerClass tbody tr").length;
                                PrItemNumber = 10 * (i + 1 + prNoAvail);
                                linkidArray.push(PRLineJsonObj.linkId);
                                lineItemNumberArr.push(insertionOrderId);
                                PrItemNumberArr.push(PrItemNumber);
                                accAsgnCatArr.push(PRLineJsonObj.accountAssignment);
                                saveServiceAndServiceAccAsgnOnNewPOAddition(linkidArray, lineItemNumberArr, PrItemNumberArr, accAsgnCatArr);
                            }
                        }
                    });
                }
                $("#material_headerClass tbody").append(row);
                $("#ItemNumberSelect").append(option);
                $("#ItemNumberSelect").val("");
                prevousSelectedItem = "";
                $("#lineLevelTabsDiv").css("display", "none");

                refreshPrDelvDatepicker();
                hidePoLineTableColsByPoType();
//                $("#rfqLineModal").modal("hide");

                var newRfqLineRfqIdRfqLineIdInsertionOrderId = $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val();
                if (newRfqLineRfqIdRfqLineIdInsertionOrderId !== "")
                {
                    $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val(newRfqLineRfqIdRfqLineIdInsertionOrderId + "," + newRfqLineRfqIdRfqLineIdInsertionOrderIdArr);
                    newRfqLineRfqIdRfqLineIdInsertionOrderIdArr = [];
                }
                else
                {
                    $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val(newRfqLineRfqIdRfqLineIdInsertionOrderIdArr);
                    newRfqLineRfqIdRfqLineIdInsertionOrderIdArr = [];
                }

                $("#overlay").css("display", "none");
            }, 100);
        }
    });
    $("#material_headerClass").on("click", ".deleteRfqLine", function() {
        var insertionOrderId = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        console.log("insertionOrderId: " + insertionOrderId);

        $(this).parent().parent().remove();

        var isPrSaved = $(this).parent().parent().find("td").eq(0).children(".isPrSaved").val();
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        console.log("isPrSaved: " + isPrSaved);
        console.log("linkId: " + linkId);

        // Remove Item Number from Item Number Dropdown
        $("#ItemNumberSelect option").each(function() {
            var insOrderId = $(this).prop("value");
            if (insOrderId === insertionOrderId)
            {
                $(this).remove();
            }
        });

        var rfqIdRfqLineIdInsertionOrderIdString = $(this).parent().parent().find("td").eq(0).children(".rfqIdRfqLineIdInsertionOrderIdString").val();
        console.log("rfqIdRfqLineIdInsertionOrderIdString: " + rfqIdRfqLineIdInsertionOrderIdString);

        newRfqLineRfqIdRfqLineIdInsertionOrderIdArr = $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val().split(",");
        console.log("newRfqLineRfqIdRfqLineIdInsertionOrderIdArr: " + newRfqLineRfqIdRfqLineIdInsertionOrderIdArr);

        var index = newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.indexOf(rfqIdRfqLineIdInsertionOrderIdString.toString().trim());
        console.log("index: " + index);
        newRfqLineRfqIdRfqLineIdInsertionOrderIdArr.splice(index, 1);
        $("#newRfqLineRfqIdRfqLineIdInsertionOrderId").val(newRfqLineRfqIdRfqLineIdInsertionOrderIdArr);
        newRfqLineRfqIdRfqLineIdInsertionOrderIdArr = [];

        $("#ItemNumberSelect").val("");
        $("#lineLevelTabsDiv").css("display", "none");

        // Delete Save PO Line Data from DB
        if (isPrSaved === "Yes") {
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "deleteDataFromDBForDeletedPR",
                    "linkId": linkId,
                    "lineItemNumber": insertionOrderId
                },
                beforeSend: function() {
                    $("#overlay").css("display", "block");
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                success: function() {
                    $("#overlay").css("display", "none");
                }
            });
        }
    });

    var prevQuantity = 0;
    $("#material_headerClass").on("change", ".pr-quantity", function() {
        var prOrRfqLineQty = removeCommaInNumber($(this).val());
        console.log("prOrRfqLineQty: " + prOrRfqLineQty);

//        $(this).parent().parent().find("td").eq(0).children(".quantityBeforeChange").val(prOrRfqLineQty); // Commented by nikhil on 29102020

        var prInsertionOrderId = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        console.log("prInsertionOrderId: " + prInsertionOrderId);

        var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).parent().parent().find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
        console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);

        var totalQuantityOfThisLine = $(this).parent().parent().find("td").eq(0).children(".totalQuantityOfThisLine").val();
        console.log("totalQuantityOfThisLine: " + totalQuantityOfThisLine);

        var materialCode = $(this).parent().parent().find("td").eq(4).children(".materialCodeClass").val();
        console.log("materialCode: " + materialCode);

        var prCompanyCode = $(this).parent().parent().find("td").eq(0).children(".PRCompanyCode_Class").val();
        console.log("prCompanyCode: " + prCompanyCode);

        var prItemNumber = $(this).parent().parent().find("td").eq(0).children(".PRItemNumber_Class").val();
        console.log("prItemNumber: " + prItemNumber);

        var prLinkId = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        console.log("prLinkId: " + prLinkId);

        var acountAssgnCat = $(this).parent().parent().find("td").eq(2).children(".accountAssignmentClass").val();
        var itemCatogory = $(this).parent().parent().find('td').eq(3).children(".itemCategoryClass").val();
        console.log("acountAssgnCat: " + acountAssgnCat);
        console.log("itemCatogory: " + itemCatogory);

        var pid = $(this).parent().parent().find("td").eq(0).children(".procInstId_Class").val();
        var prItemNumber = $(this).parent().parent().find("td").eq(24).text();
        var prRfqNumber = $(this).parent().parent().find("td").eq(0).children(".prRfqNumber").val();
        var prRfqLineItemNumber = $(this).parent().parent().find("td").eq(0).children(".prRfqLineItemNumber").val();
        var itemNumberWithLeadingZeros = prItemNumber;

        console.log("pid: " + pid);
        console.log("prItemNumber: " + prItemNumber);
        console.log("itemNumberWithLeadingZeros: " + itemNumberWithLeadingZeros);
        console.log("prRfqNumber: " + prRfqNumber);
        console.log("prRfqLineItemNumber: " + prRfqLineItemNumber);

        if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "RfqLine" || isPoLineOrPrLineOrRfqLineOrEmptyLine === "PrLine"
                || isPoLineOrPrLineOrRfqLineOrEmptyLine === "CreatePrLine")
        {
            if (Number(prOrRfqLineQty) > Number(totalQuantityOfThisLine))
            {
                $(this).val(formatNumberByComma(totalQuantityOfThisLine));
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Quantity cannot be greator than specified quantity!"
                });
                return false;
            }
            if (Number(prOrRfqLineQty) === 0 || Number(prOrRfqLineQty) < 0)
            {
                $(this).val(formatNumberByComma(totalQuantityOfThisLine));
                return false;
            }

            // Update Component Quantity In DB
            if (acountAssgnCat === "" && itemCatogory === "L")
            {
                if (prRfqNumber !== "" && prRfqNumber !== undefined && prRfqLineItemNumber !== "" && prRfqLineItemNumber !== undefined)
                {
                    console.log("This is a RFQ Line!");
                    $("#overlay").css("display", "block");
                    $.ajax({
                        type: "GET",
                        url: "createAmendDeletePoGetAjaxRequest.do",
                        async: false,
                        data: {
                            "reqFrom": "findRfqLineByRfqNumberAndRfqLineItemNumber",
                            "rfqNumber": prRfqNumber,
                            "rfqLineItemNumber": prRfqLineItemNumber
                        },
                        complete: function(responseJson) {
                            $("#overlay").css("display", "none");
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("obj.Result :" + obj.Result);
                            if (obj.Result === "Found") {
                                var quantity = obj.RfqLineItem.ngBpNewgenPRLineItemId.quantity;
                                console.log("quantity: " + quantity);
                                
                                if (Number(prOrRfqLineQty) !== Number(quantity))
                                {
                                    var percentageQty = (Number(prOrRfqLineQty) / Number(quantity)) * 100;
                                    console.log("percentageQty: " + percentageQty);
                                    updateComponentByInsertionOrderId(prInsertionOrderId, percentageQty, prLinkId);
                                }
                            }
                        }
                    });
                }
                else if (pid !== "" && pid !== undefined)
                {
                    console.log("This is a PR Line!");
                    $("#overlay").css("display", "block");
                    prItemNumber = Number(prItemNumber);
                    console.log("prItemNumber: " + prItemNumber);
                    $.ajax({
                        type: "GET",
                        url: "createAmendDeletePoGetAjaxRequest.do",
                        async: false,
                        data: {
                            "reqFrom": "findPrLineByPid",
                            "pid": pid,
                            "itemNumber": prItemNumber,
                            "itemNumberWithLeadingZeros": itemNumberWithLeadingZeros
                        },
                        complete: function(responseJson) {
                            $("#overlay").css("display", "none");
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("obj.Result :" + obj.Result);
                            if (obj.Result === "Found") {
                                var quantity = obj.NewgenPrLine.quantity;
                                console.log("quantity: " + quantity);

                                if (Number(prOrRfqLineQty) !== Number(quantity))
                                {
                                    var percentageQty = (Number(prOrRfqLineQty) / Number(quantity)) * 100;
                                    console.log("percentageQty: " + percentageQty);
                                    updateComponentByInsertionOrderId(prInsertionOrderId, percentageQty, prLinkId);
                                }
                            }
                        }
                    });
                }
                else
                {
                    console.log("This is a Standalone Line!");
                }
            }
        }
        else if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "PoLine")
        {
            if (Number(prOrRfqLineQty) === 0 || Number(prOrRfqLineQty) < 0 || prOrRfqLineQty === "")
            {
                $(this).val(formatNumberByComma(totalQuantityOfThisLine));
                return false;
            }

            if (prRfqNumber !== "" && prRfqNumber !== undefined && prRfqLineItemNumber !== "" && prRfqLineItemNumber !== undefined) {
                console.log("This is a RFQ Line!");
                $("#overlay").css("display", "block");
                var isQtyValid = true;
                $.ajax({
                    type: "GET",
                    url: "createAmendDeletePoGetAjaxRequest.do",
                    async: false,
                    data: {
                        "reqFrom": "findRfqLineByRfqNumberAndRfqLineItemNumber",
                        "rfqNumber": prRfqNumber,
                        "rfqLineItemNumber": prRfqLineItemNumber
                    },
                    complete: function(responseJson) {
                        $("#overlay").css("display", "none");
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("obj.Result :" + obj.Result);
                        if (obj.Result === "Found") {
                            var rfqLineRemainingQty = obj.RfqLineItem.remainingQuantity;
                            console.log("rfqLineRemainingQty: " + rfqLineRemainingQty);

                            var prOriginalQuantity = obj.RfqLineItem.ngBpNewgenPRLineItemId.quantity;
                            console.log("prOriginalQuantity: " + prOriginalQuantity);

                            // Check if quantity is converted based on Order Unit
                            var jsonArr = getMaterialMasterOnLoad(materialCode, prCompanyCode);
                            console.log("getMaterialMasterOnLoad jsonArr.length: " + jsonArr.length);
                            if (jsonArr.length !== 0) {
                                if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                                    if (jsonArr[0].orderUnit !== jsonArr[0].baseUOM) {
                                        var convFrom = jsonArr[0].conversionFrom;
                                        var convTo = jsonArr[0].conversionTo;
                                        rfqLineRemainingQty = Number(convTo) / Number(convFrom) * Number(rfqLineRemainingQty);
                                        console.log("rfqLineRemainingQty after conversion: " + rfqLineRemainingQty);
                                    }
                                }
                            }

                            if (Number(prOrRfqLineQty) > Number(totalQuantityOfThisLine)) {
                                var updatedQtyDiff = Number(prOrRfqLineQty) - Number(totalQuantityOfThisLine);
                                console.log("updatedQtyDiff: " + Number(updatedQtyDiff).toFixed(3));
                                if (Number(updatedQtyDiff).toFixed(3) <= Number(rfqLineRemainingQty).toFixed(3)) {
                                    // Update Component Quantity In DB
                                    if (acountAssgnCat === "" && itemCatogory === "L") {
                                        if (Number(prOrRfqLineQty) !== Number(prOriginalQuantity)) {
                                            var percentageQty = (Number(prOrRfqLineQty) / Number(prOriginalQuantity)) * 100;
                                            console.log("percentageQty: " + percentageQty);
                                            updateComponentByInsertionOrderId(prInsertionOrderId, percentageQty, prLinkId);
                                        }
                                    }
                                } else {
                                    isQtyValid = false;
                                }
                            } else if (Number(prOrRfqLineQty) <= Number(totalQuantityOfThisLine)) {
                                // Update Component Quantity In DB
                                if (acountAssgnCat === "" && itemCatogory === "L") {
                                    if (Number(prOrRfqLineQty) !== Number(prOriginalQuantity)) {
                                        var percentageQty = (Number(prOrRfqLineQty) / Number(prOriginalQuantity)) * 100;
                                        console.log("percentageQty: " + percentageQty);
                                        updateComponentByInsertionOrderId(prInsertionOrderId, percentageQty, prLinkId);
                                    }
                                }
                            }
                        }
                    }
                });
                console.log("isQtyValid: " + isQtyValid);
                if (isQtyValid === false) {
                    $(this).val(formatNumberByComma(totalQuantityOfThisLine));
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Quantity cannot be greator than rfq line quantity!"
                    });
                    return false;
                }
            } else if (pid !== "" && pid !== undefined) {
                console.log("This is a PR Line!");
                $("#overlay").css("display", "block");
                var isQtyValid = true;
                prItemNumber = Number(prItemNumber);
                console.log("prItemNumber: " + prItemNumber);
                $.ajax({
                    type: "GET",
                    url: "createAmendDeletePoGetAjaxRequest.do",
                    async: false,
                    data: {
                        "reqFrom": "findPrLineByPid",
                        "pid": pid,
                        "itemNumber": prItemNumber,
                        "itemNumberWithLeadingZeros": itemNumberWithLeadingZeros
                    },
                    complete: function(responseJson) {
                        $("#overlay").css("display", "none");
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("obj.Result :" + obj.Result);
                        if (obj.Result === "Found") {
                            var prLineRemainingQty = obj.NewgenPrLine.bpQuantityRemaining;
                            console.log("prLineRemainingQty: " + prLineRemainingQty);
                            
                            var prOriginalQuantity = obj.NewgenPrLine.quantity;
                            console.log("prOriginalQuantity: " + prOriginalQuantity);
                            
                            // Check if quantity is converted based on Order Unit
                            var jsonArr = getMaterialMasterOnLoad(materialCode, prCompanyCode);
                            console.log("getMaterialMasterOnLoad jsonArr.length: " + jsonArr.length);
                            if (jsonArr.length !== 0) {
                                if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                                    if (jsonArr[0].orderUnit !== jsonArr[0].baseUOM) {
                                        var convFrom = jsonArr[0].conversionFrom;
                                        var convTo = jsonArr[0].conversionTo;
                                        prLineRemainingQty = Number(convTo) / Number(convFrom) * Number(prLineRemainingQty);
                                        console.log("prLineRemainingQty after conversion: " + prLineRemainingQty);
                                    }
                                }
                            }

                            if (Number(prOrRfqLineQty) > Number(totalQuantityOfThisLine)) {
                                var updatedQtyDiff = Number(prOrRfqLineQty) - Number(totalQuantityOfThisLine);
                                console.log("updatedQtyDiff: " + Number(updatedQtyDiff).toFixed(3));
                                if (Number(updatedQtyDiff).toFixed(3) <= Number(prLineRemainingQty).toFixed(3)) {
                                    // Update Component Quantity In DB
                                    if (acountAssgnCat === "" && itemCatogory === "L") {
                                        if (Number(prOrRfqLineQty) !== Number(prOriginalQuantity)) {
                                            var percentageQty = (Number(prOrRfqLineQty) / Number(prOriginalQuantity)) * 100;
                                            console.log("percentageQty: " + percentageQty);
                                            updateComponentByInsertionOrderId(prInsertionOrderId, percentageQty, prLinkId);
                                        }
                                    }
                                } else {
                                    isQtyValid = false;
                                }
                            } else if (Number(prOrRfqLineQty) <= Number(totalQuantityOfThisLine)) {
                                // Update Component Quantity In DB
                                if (acountAssgnCat === "" && itemCatogory === "L") {
                                    if (Number(prOrRfqLineQty) !== Number(prOriginalQuantity)) {
                                        var percentageQty = (Number(prOrRfqLineQty) / Number(prOriginalQuantity)) * 100;
                                        console.log("percentageQty: " + percentageQty);
                                        updateComponentByInsertionOrderId(prInsertionOrderId, percentageQty, prLinkId);
                                    }
                                }
                            }
                        }
                    }
                });
                console.log("isQtyValid: " + isQtyValid);
                if (isQtyValid === false) {
                    $(this).val(formatNumberByComma(totalQuantityOfThisLine));
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Quantity cannot be greator than pr line quantity!"
                    });
                    return false;
                }
            } else {
                console.log("This is a Standalone Line!");
            }
        }

        $(this).val(formatNumberByComma(prOrRfqLineQty));

        var insertionOrderIdSelect = $(".ItemNumberSelectClass").val();
        console.log("insertionOrderIdSelect: " + insertionOrderIdSelect);
        console.log("prInsertionOrderId: " + prInsertionOrderId);

        if (prInsertionOrderId === insertionOrderIdSelect) {
            // Update Quantity in Qty/Wgts tab
            $("#pOQuantity").val(formatNumberByComma(prOrRfqLineQty));
            $("#pOQuantitySKU").val(formatNumberByComma(prOrRfqLineQty));

            // Update quantity in Delivery Schedule tab
            $("#DeliveryScheduleTableId tbody tr").each(function() {
                $(this).find("td").eq(3).children(".scheduledQuantityClass").val(formatNumberByComma(prOrRfqLineQty));
            });

            console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);
            if (isPoLineOrPrLineOrRfqLineOrEmptyLine === "RfqLine" || isPoLineOrPrLineOrRfqLineOrEmptyLine === "PrLine") {
                // Check if quantity is converted based on Order Unit
                var jsonArr = getMaterialMasterOnLoad(materialCode, prCompanyCode);
                console.log("getMaterialMasterOnLoad jsonArr.length: " + jsonArr.length);
                if (jsonArr.length !== 0) {
                    if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                        if (jsonArr[0].orderUnit !== jsonArr[0].baseUOM) {
                            var convFrom = jsonArr[0].conversionFrom;
                            var convTo = jsonArr[0].conversionTo;
                            var qtyBeforeConversion = Number(convFrom) / Number(convTo) * Number(prOrRfqLineQty);
                            console.log("qtyBeforeConversion: " + qtyBeforeConversion);
                            $("#netWeight2").val(formatNumberByComma(qtyBeforeConversion));
                            $("#grossWeight2").val(formatNumberByComma(qtyBeforeConversion));
                            // Update Current PR Data in DB
                            updatedQtyWtsTabByInsertionOrderId(prInsertionOrderId, prItemNumber, prLinkId);
                        }
                    }
                }
            }
        }
        // Update quantity in DB
        updatedQtyInQtyWtsTabByInsertionOrderId(prInsertionOrderId, prOrRfqLineQty);
        // Update quantity in DB
        updatedQtyInDeliverySchByInsertionOrderId(prInsertionOrderId, prOrRfqLineQty);

        var prNetPrice = removeCommaInNumber($(this).parent().parent().find("td").eq(12).children(".pr-net-price").val());

        if (prInsertionOrderId === insertionOrderIdSelect) {
            if (prNetPrice !== "") {
                calculationForPBXX();
                saveConditionTabDataOnLoadFieldChange("");
            }
        }
        if (prNetPrice !== "") {
            calculatePBXXForHeader();
        }
        clearPerColumnatHeader();
        if (prInsertionOrderId === insertionOrderIdSelect) {
            var prType = $("#PrType").val();
            if (prType === "Material") {
                if (prOrRfqLineQty !== prevQuantity) {

                    prevQuantity = removeCommaInNumber($(this).val());
                    material_header_table_Quantity = prOrRfqLineQty;
//                    return false;
                    var distribution = $("#distribution").val();
                    if (distribution === "Distrib. On Quantity Basis" || distribution === "Distrib. By Percentage") {
                        Lobibox.notify('warning', {
                            msg: 'Quantity is modified, Kindly Check Account Assignment!'
                        });
//                            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
//                                $(this).find("td").eq(1).children(".accAsgnQuantity").val("0.00");
//                                $(this).find("td").eq(1).children(".accAsgnQuantity").attr({
//                                   "max": "0.00",
//                                   "value": "0.00"
//                                });
//                                $(this).find("td").eq(2).children(".accAsgnPercentage").val("0.00");
//                                $(this).find("td").eq(2).children(".accAsgnPercentage").attr({
//                                   "max": "0.00",
//                                   "value": "0.00"
//                                });
//                            });
                    }
                }
            }
            return;
        }
        findApproverDetails();
    });

    $("#material_headerClass").on("change", ".pr-short-text", function() {
        var prShortText = $(this).val();
        var insertionOrderId = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
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

    $("#material_headerClass").on("click", ".clonePoLine", function() {
        console.log("clonePrLine ============>");
        var currentTr = $(this).parent().parent();

        var parentPrLineInsertionOrderId = currentTr.find("td").eq(0).children(".insertionOrderId_Class").val();
        console.log("parentPrLineInsertionOrderId: " + parentPrLineInsertionOrderId);

        var cloneTr = currentTr.clone();

        var prNoAvail = $("#material_headerClass tbody tr").length;
        console.log("prNoAvail: " + prNoAvail);
        var randomNumber = Math.floor(Math.random() * 100000);
        console.log("randomNumber: " + randomNumber);
        var insertionOrderId = "P" + (1 + prNoAvail) + "_" + (randomNumber * (10 * (1 + prNoAvail)));
        console.log("insertionOrderId: " + insertionOrderId);

        cloneTr.find("td").eq(0).children(".clonePoLine").remove();
        cloneTr.find("td").eq(0).children(".deleteNewAddedPrLine").remove();
        cloneTr.find("td").eq(0).children(".deleteRfqLine").remove();
        cloneTr.find("td").eq(11).children(".prDeliveryDatepicker").remove();
        cloneTr.find("td").eq(11).children(".ui-datepicker-trigger").remove();

        cloneTr.find("td").eq(0).children(".insertionOrderId_Class").val(insertionOrderId);
        cloneTr.find("td").eq(0).children(".parentPrLineInsertionOrderId").val(parentPrLineInsertionOrderId);
        cloneTr.find("td").eq(0).children(".PRItemNumber_Class").val(10 * (1 + prNoAvail));
        cloneTr.find("td").eq(1).text(10 * (1 + prNoAvail));
        cloneTr.find("td").eq(0).append(" <i class='fa fa-window-close fa-lg removeClonePoLine' title='Remove'></i>");
        cloneTr.find("td").eq(11).append("<input type='hidden' class='prDeliveryDatepicker'>");

        var shortText = cloneTr.find("td").eq(5).children(".pr-short-text").val();
        var option = "<option value=" + insertionOrderId + ">" + (10 * (1 + prNoAvail)) + " - " + (shortText === undefined ? "" : shortText) + "</option>";

        $("#material_headerClass tbody").append(cloneTr);
        $("#ItemNumberSelect").append(option);
        $("#ItemNumberSelect").val("");
        $("#lineLevelTabsDiv").css("display", "none");
        refreshPrDelvDatepicker();
    });
    $("#material_headerClass").on("click", ".removeClonePoLine", function() {
        console.log("removeClonePoLine ============>");
        $(this).parent().parent().remove();

        var insertionOrderId = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        console.log("insertionOrderId: " + insertionOrderId);

        // Remove Item Number from Item Number Dropdown
        $("#ItemNumberSelect option").each(function() {
            var insOrderIdSelect = $(this).prop("value");
            if (insOrderIdSelect === insertionOrderId)
            {
                $(this).remove();
            }
        });
        $("#ItemNumberSelect").val("");
        $("#lineLevelTabsDiv").css("display", "none");
    });

    var currentServiceTr = null;
    // Show service short text in modal
    $("#serviceTableId").on("click", ".service-short-text", function() {
        console.log("service-short-text");
        $("#serviceShortText").val("");
        var serviceId = $(this).parent().parent().find("td").eq(0).children(".serviceId").val();
        console.log("serviceId: " + serviceId);
        currentServiceTr = $(this).parent().parent();

        if (serviceId !== undefined && serviceId !== "")
        {
            $("#shortTextServiceId").val(serviceId);
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "findServicesLongTextsById",
                    "serviceId": serviceId
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                complete: function(responseJson) {
                    $("#overlay").css("display", "none");
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("obj.Service :" + obj.Service);
                    $("#serviceShortText").val(obj.Service.shortText);
                    $("#serviceShortTextModal").modal("show");
                }
            });
        }
        else
        {
            $("#shortTextServiceId").val("");
            $("#serviceShortTextModal").modal("show");
        }
    });

    // Show service line item long text in modal
    $("#serviceTableId").on("click", ".service-lineitem-long-text", function() {
        console.log("service-lineitem-long-text");
        $("#serviceLineItemLongText").val("");
        var serviceId = $(this).parent().parent().find("td").eq(0).children(".serviceId").val();
        console.log("serviceId: " + serviceId);
        currentServiceTr = $(this).parent().parent();

        if (serviceId !== undefined && serviceId !== "")
        {
            $("#lineItemLongTextServiceId").val(serviceId);
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "findServicesLongTextsById",
                    "serviceId": serviceId
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                complete: function(responseJson) {
                    $("#overlay").css("display", "none");
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("obj.Service :" + obj.Service);
                    $("#serviceLineItemLongText").val(obj.Service.lineItemLongText);
                    $("#serviceLineItemLongTextModal").modal("show");
                }
            });
        }
        else
        {
            $("#lineItemLongTextServiceId").val("");
            $("#serviceLineItemLongTextModal").modal("show");
        }
    });

    // Show service text in modal
    $("#serviceTableId").on("click", ".service-text", function() {
        console.log("service-text");
        $("#serviceText").val("");
        var serviceId = $(this).parent().parent().find("td").eq(0).children(".serviceId").val();
        console.log("serviceId: " + serviceId);
        currentServiceTr = $(this).parent().parent();

        if (serviceId !== undefined && serviceId !== "")
        {
            $("#serviceTextServiceId").val(serviceId);
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: true,
                data: {
                    "reqFrom": "findServicesLongTextsById",
                    "serviceId": serviceId
                },
                error: function() {
                    $("#overlay").css("display", "none");
                },
                complete: function(responseJson) {
                    $("#overlay").css("display", "none");
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("obj.Service :" + obj.Service);
                    $("#serviceText").val(obj.Service.serviceText);
                    $("#serviceTextModal").modal("show");
                }
            });
        }
        else
        {
            $("#serviceTextServiceId").val("");
            $("#serviceTextModal").modal("show");
        }
    });

    // Update service short text
    $("#serviceShortTextModalSubmitBtn").click(function() {
        console.log("serviceShortTextModalSubmitBtn");
        var shortTextServiceId = $("#shortTextServiceId").val();
        var serviceShortText = $("#serviceShortText").val();
        console.log("shortTextServiceId: " + shortTextServiceId);

        if (serviceShortText === "" && serviceShortText.trim() === "")
        {
            $("#serviceShortText").focus();
            return false;
        }
        else
        {
            var ServiceIdAndServiceShortTextJsonObj = {};
            ServiceIdAndServiceShortTextJsonObj["ServiceId"] = shortTextServiceId;
            ServiceIdAndServiceShortTextJsonObj["ServiceShortText"] = serviceShortText;

            var ServiceIdAndServiceShortTextJsonObjAsString = JSON.stringify(ServiceIdAndServiceShortTextJsonObj);
            console.log("ServiceIdAndServiceShortTextJsonObjAsString: " + ServiceIdAndServiceShortTextJsonObjAsString);

            $("#serviceShortTextModal").modal("hide");
            var _csrf = $("input[name=_csrf]").val();
            $("#overlay").css("display", "block");

            $.ajax({
                type: "POST",
                url: "updateServicesLongTexts.do",
                async: true,
                data: {
                    "reqFrom": "updateServiceShortTextByServiceId",
                    "serviceIdAndServiceShortTextJsonObjAsString": ServiceIdAndServiceShortTextJsonObjAsString,
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

//                    Lobibox.alert("success", {
//                        msg: "Short text saved successfully!"
//                    });
                }
            });
        }
    });

    // Update service line item long text
    $("#serviceLineItemLongTextModalSubmitBtn").click(function() {
        console.log("serviceLineItemLongTextModalSubmitBtn");
        var lineItemLongTextServiceId = $("#lineItemLongTextServiceId").val();
        var serviceLineItemLongText = $("#serviceLineItemLongText").val();
        console.log("lineItemLongTextServiceId: " + lineItemLongTextServiceId);

        if (serviceLineItemLongText === "" && serviceLineItemLongText.trim() === "")
        {
            $("#serviceLineItemLongText").focus();
            return false;
        }
        else
        {
            var ServiceIdAndServiceLineItemLongTextJsonObj = {};
            ServiceIdAndServiceLineItemLongTextJsonObj["ServiceId"] = lineItemLongTextServiceId;
            ServiceIdAndServiceLineItemLongTextJsonObj["ServiceLineItemLongText"] = serviceLineItemLongText;

            var ServiceIdAndServiceLineItemLongTextJsonObjAsString = JSON.stringify(ServiceIdAndServiceLineItemLongTextJsonObj);
            console.log("ServiceIdAndServiceLineItemLongTextJsonObjAsString: " + ServiceIdAndServiceLineItemLongTextJsonObjAsString);

            $("#serviceLineItemLongTextModal").modal("hide");
            var _csrf = $("input[name=_csrf]").val();
            $("#overlay").css("display", "block");

            $.ajax({
                type: "POST",
                url: "updateServicesLongTexts.do",
                async: true,
                data: {
                    "reqFrom": "updateServiceLineItemLongTextByServiceId",
                    "serviceIdAndServiceLineItemLongTextJsonObjAsString": ServiceIdAndServiceLineItemLongTextJsonObjAsString,
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

//                    Lobibox.alert("success", {
//                        msg: "Service line item long text saved successfully!"
//                    });
                }
            });
        }
    });

    // Update service text
    $("#serviceTextModalSubmitBtn").click(function() {
        console.log("serviceTextModalSubmitBtn");
        var serviceTextServiceId = $("#serviceTextServiceId").val();
        var serviceText = $("#serviceText").val();
        console.log("serviceTextServiceId: " + serviceTextServiceId);

        if (serviceText === "" && serviceText.trim() === "")
        {
            $("#serviceText").focus();
            return false;
        }
        else
        {
            var ServiceIdAndServiceTextJsonObj = {};
            ServiceIdAndServiceTextJsonObj["ServiceId"] = serviceTextServiceId;
            ServiceIdAndServiceTextJsonObj["ServiceText"] = serviceText;

            var ServiceIdAndServiceTextJsonObjAsString = JSON.stringify(ServiceIdAndServiceTextJsonObj);
            console.log("ServiceIdAndServiceTextJsonObjAsString: " + ServiceIdAndServiceTextJsonObjAsString);

            $("#serviceTextModal").modal("hide");
            var _csrf = $("input[name=_csrf]").val();
            $("#overlay").css("display", "block");

            $.ajax({
                type: "POST",
                url: "updateServicesLongTexts.do",
                async: true,
                data: {
                    "reqFrom": "updateServiceTextByServiceId",
                    "serviceIdAndServiceTextJsonObjAsString": ServiceIdAndServiceTextJsonObjAsString,
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

//                    Lobibox.alert("success", {
//                        msg: "Service text saved successfully!"
//                    });
                }
            });
        }
    });

    // Open components in modal from material tab
    $("#componentPopUpBtn").click(function() {
        console.log("componentPopUpBtn click");
        $("#overlay").css("display", "block");
        setTimeout(function() {
            var insertionOrderId = $(".ItemNumberSelectClass").val();
            console.log("insertionOrderId: " + insertionOrderId);
            getComponentByInsertionOrderId(insertionOrderId);
            $("#overlay").css("display", "none");
            $("#componentsModal").modal("show");
            $("#componentsModal").css({
                "padding-right": 430,
                "padding-left": 0,
                "padding-top": 70
            });
        }, 1000);
    });
});

function getExchangeRate(fromCurrency, toCurrency) {
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
