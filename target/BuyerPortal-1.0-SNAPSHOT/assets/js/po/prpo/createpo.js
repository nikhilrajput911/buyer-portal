/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var conditionLineLevelArr = [];

var conditionLineLevelArray = [];
var conditionLineLevelArrayTemp = [];
var conditionLineLevelObject = {};
var conitionClick = "";
var isCheckedSerAccAsgnCount = 0;
var conditioncurrentpossition = "";
$(document).ready(function() {

    // Set buyer details in header note field
    var buyerUsername = $("#buyerUsername").val();
    var buyerEmailId = $("#buyerEmailId").val();
    var buyerFirstName = $("#buyerFirstName").val();
    var buyerLastName = $("#buyerLastName").val();
    var buyerFullName = "";
    buyerFullName += buyerFirstName;
    buyerFullName += (buyerLastName !== "" ? (" " + buyerLastName) : "");
    $("#HeaderNote").val(buyerUsername + "\n" + buyerEmailId + "\n" + buyerFullName);

    // Set valuation type in delivery tab, selected from picklist
    $("#valuationTypeModalTable").on("click", ".valuationTypeModalTableTr", function() {
        var valuationType = $(this).text();
        console.log("valuationType: " + valuationType);
        $("#ValuationType").val(valuationType);
        $("#valuationTypeModal").modal("hide");
        saveDeliveryTabDataOnLoadFieldChange();
    });

    // Create picklist for valuation type field in delivery tab for selected po line by material code and company code
    var valuationTypeModalTable = null;
    $("#ValuationType").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            console.log("ValuationType click");
            var prMaterialCode = "";
            var prCompanyCode = "";
            var insertionOrderId = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prInsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionOrderId === prInsertionOrderId) {
                    prMaterialCode = $(this).find("td").eq(0).children(".prMaterialCodeHidden").val();
                    prCompanyCode = $(this).find("td").eq(0).children(".PRCompanyCode_Class").val();
                    return;
                }
            });
            console.log("prMaterialCode: " + prMaterialCode);
            console.log("prCompanyCode: " + prCompanyCode);

            $("#overlay").css("display", "block");
            setTimeout(function() {
                var jsonArr = getMaterialMasterOnLoad(prMaterialCode, prCompanyCode);
                console.log("jsonArr len: " + jsonArr.length);
                $("#valuationTypeModalTable tbody tr").remove();
                if (jsonArr.length > 0)
                {
                    console.log("Record found for " + prMaterialCode + " in material master!");

                    var row = "";
                    for (var i = 0; i < jsonArr.length; i++) {
                        var valuationType = jsonArr[i].valuationType;
                        console.log("valuationType: " + valuationType);

                        if (valuationType !== "" && valuationType !== undefined)
                            row += "<tr class='valuationTypeModalTableTr'><td>" + valuationType + "</td></tr>";
                    }
                    console.log("row: " + row);

                    $("#valuationTypeModalTable tbody").append(row);
                    if ($.fn.DataTable.isDataTable('#valuationTypeModalTable')) {
                        valuationTypeModalTable.destroy();
                        valuationTypeModalTable = null;
                        $("#valuationTypeModalTable").children('tbody').html(row);
                        valuationTypeModalTable = $('table.valuationTypeModalTable').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        valuationTypeModalTable.buttons().container()
                                .appendTo('#valuationTypeModalTable_wrapper .col-md-6:eq(0)');
                    } else {
                        $('#valuationTypeModalTable thead tr').clone(true).appendTo('#valuationTypeModalTable thead');
                        $('#valuationTypeModalTable thead tr:eq(1) th').each(function(i) {
                            $('#valuationTypeModalTable thead tr:eq(0) th').addClass("table-header-color");
                            var title = $(this).text();
                            if (title === '') {
                                $(this).html('');
                            } else {
                                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                            }
                            $('input', this).on('keyup change', function() {
                                if (valuationTypeModalTable.column(i).search() !== this.value) {
                                    valuationTypeModalTable
                                            .column(i)
                                            .search(this.value)
                                            .draw();
                                }
                            });
                        });
                        valuationTypeModalTable = $('table.valuationTypeModalTable').DataTable({
                            lengthChange: false,
                            orderCellsTop: true
                        });
                        valuationTypeModalTable.buttons().container()
                                .appendTo('#valuationTypeModalTable_wrapper .col-md-6:eq(0)');
                    }
                    $("#valuationTypeModal").modal("show");
                }
                else
                {
                    console.log("Record not found for " + prMaterialCode + " in material master!");
                }
                $("#overlay").css("display", "none");
            }, 1000);
        }
    });

    // Set Net Price to 0.00 and disabled if FOC is enabled
    $("#material_headerClass").on("click", ".prFreeOfCharge", function() {
        var linkIdArray = [];
        console.log("prFreeOfCharge clicked");
        var isFOCEnabled = $(this).prop("checked");
        console.log("isFOCEnabled: " + isFOCEnabled);
        var PrType = $("#PrType").val();
        var PoFrom = $("#PoFrom").val();
        if (isFOCEnabled) {
            $(this).parent().parent().find("td").eq(12).children(".pr-net-price").val("0.00");
            $(this).parent().parent().find("td").eq(12).children(".pr-net-price").prop("readonly", true);
        } else {
            $(this).parent().parent().find("td").eq(12).children(".pr-net-price").val("");
            $(this).parent().parent().find("td").eq(12).children(".pr-net-price").prop("readonly", false);

            var isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).parent().parent().find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            if (PrType === "Service" && (PoFrom === "createpo" || isPoLineOrPrLineOrRfqLineOrEmptyLine === "PrLine"
                    || isPoLineOrPrLineOrRfqLineOrEmptyLine === "RfqLine")) {
                var LinkID = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
                var totalNetPrice = getSumOfNetPriceOfServiceByLinkId(LinkID);
                if (Number(totalNetPrice) !== 0 && Number(totalNetPrice) !== 0.0) {
                    $(this).parent().parent().find('td').eq(12).children(".pr-net-price").val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                    $(this).parent().parent().find('td').eq(12).children(".pr-net-price").attr("value", formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                    $(this).parent().parent().find('td').eq(12).children(".pr-net-price").prop("readonly", true);

                    $(this).parent().parent().find('td').eq(0).children(".netPriceHidden").val(Number(totalNetPrice));

                }
            }
            var currentPr = $(this).parent().parent();
            if (PoFrom === "byrfq") {
                var prRfqNumber = $(this).parent().parent().find("td").eq(33).children(".pr-rfq-Number").val();
                var prRfqLineItemNumber = $(this).parent().parent().find("td").eq(34).children(".pr-rfq-line-item-number").val();
                console.log("prRfqNumber: " + prRfqNumber);
                console.log("prRfqLineItemNumber: " + prRfqLineItemNumber);
                var VendorFinalizationTableDataArrayAsJsonString = JSON.parse($("#VendorFinalizationTableDataArrayAsJsonString").val());
                if (VendorFinalizationTableDataArrayAsJsonString.length !== 0) {
                    console.log("VendorFinalizationTableDataArrayAsJsonString: " + JSON.stringify(VendorFinalizationTableDataArrayAsJsonString));
                    VendorFinalizationTableDataArrayAsJsonString.forEach(function(e, index) {
                        console.log("e.rfqNumber: " + e.rfqNumber);
                        console.log("e.rfqLineItemNumber: " + e.rfqLineItemNumber);
                        if (prRfqNumber === e.rfqNumber && prRfqLineItemNumber === e.rfqLineItemNumber) {
                            var rfeLineNetPrice = Number(e.quantity) * Number(e.vendorPerUnitPrice);
                            console.log("rfeLineNetPrice: " + rfeLineNetPrice);
                            currentPr.find('td').eq(12).children(".pr-net-price").val(formatAmountByComma(Number(rfeLineNetPrice).toFixed(2)));
                            currentPr.find('td').eq(12).children(".pr-net-price").attr("value", formatAmountByComma(Number(rfeLineNetPrice).toFixed(2)));
                            currentPr.find('td').eq(12).children(".pr-net-price").prop("readonly", true);

                            currentPr.find('td').eq(0).children(".netPriceHidden").val(rfeLineNetPrice);
                        }
                    });
                }
            }
        }
        var id = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $(".ItemNumberSelectClass").val();
        if (id === insertionid) {
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
            }
        }
        $("#material_headerClass tbody tr").each(function() {
            var linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            linkIdArray.push(linkid);
        });
        var isSaved = "";
        var LinkID = "";
//        if (id === insertionid) {
        isSaved = $(this).parent().parent().find("td").eq(0).children(".isPrSaved").val();
//            LinkID = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        var insertionid = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        if (isFOCEnabled) {
            if (isSaved === 'Yes') {
                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "delCondiionIfFOCChecked",
                        "insertionid": insertionid,
                        "linkidArrayAsString": linkIdArray.toString()
                    },
                    success: function(responseJson) {
                        console.log("response :: " + responseJson);
                        var obj = $.parseJSON(responseJson);
                        var jsonCondArr = obj.jsonCondArr;
                        console.log("jsonCondArr after FOC checked :" + jsonCondArr.length);
                        if (jsonCondArr.length !== 0) {
                            getConditionsByLinkId(jsonCondArr);
                        } else {
                            $("#conditionTableId tbody tr").remove();
                        }
                    }
                });
            }
        }
    });

    // Set ServiceBasedIV in Invoice Tab
    if ($("#PrType").val() === "Material")
    {
        $("#serviceBasedIV").prop("checked", false);
        $("#serviceBasedIVDiv").css("display", "none");
    }
    else
    {
        $("#serviceBasedIVDiv").css("display", "block");
    }

    // Unmarked in Material and Marked in Service after PO is created
    if ($("#PrType").val() === "Material")
    {
        $("#unlimited").prop("checked", false);
    }
    else
    {
        $("#unlimited").prop("checked", true);
    }

    $(".modal-header").on("mousedown", function(mousedownEvt) {
        var $draggable = $(this);
        var x = mousedownEvt.pageX - $draggable.offset().left,
                y = mousedownEvt.pageY - $draggable.offset().top;
        $("body").on("mousemove.draggable", function(mousemoveEvt) {
            $draggable.closest(".modal-dialog").offset({
                "left": mousemoveEvt.pageX - x,
                "top": mousemoveEvt.pageY - y
            });
        });
        $("body").one("mouseup", function() {
            $("body").off("mousemove.draggable");
        });
        $draggable.closest(".modal").one("bs.modal.hide", function() {
            $("body").off("mousemove.draggable");
        });
    });

    $("#serviceTableId").on("click", ".selectServiceToDeleteFromSAP", function() {
        console.log("selectServiceToDeleteFromSAP=============");
        if ($(this).prop("checked") === true)
        {
            $(this).parent().parent().find("td").eq(0).children(".checkboxServices").prop("checked", false);
            $(this).parent().parent().find("td").eq(0).children(".checkboxServices").prop("disabled", true);
            $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
        }
        else
        {
            $(this).parent().parent().find("td").eq(0).children(".checkboxServices").prop("disabled", false);
        }
        saveServiceTabDataOnLoadFieldChange();
    });

//    if ($("#PoFrom").val() === "createpo" || $("#PoFrom").val() === "byrfq")
//    {
//        makeAccountAssignmentTabFormFieldReadonly();
//    }

    $("#material_headerClass").on("change", ".prDeliveryDatepicker", function() {
        var prDeliveryDate = $(this).val();
        console.log("prDeliveryDate: " + prDeliveryDate);

        var weekNumber = $.datepicker.iso8601Week(new Date(prDeliveryDate));
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber: " + weekNumber);

        var ItemNumberSelectClass = $(".ItemNumberSelectClass").val();
        var insertionOrderId_Class = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();

        var delvDateCat = $(this).parent().parent().find("td").eq(0).children(".prDeliveryDateCategoryHidden").val();
        console.log("delvDateCat: " + delvDateCat);

        if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
        {
            var prDeliveryDateArr = prDeliveryDate.toString().split("/");
            console.log("prDeliveryDateArr len: " + prDeliveryDateArr.length);
            var mon = prDeliveryDateArr[0];
            var day = prDeliveryDateArr[1];
            var year = prDeliveryDateArr[2];

            var newPrDeliveryDate = "";
            if (delvDateCat === "D")
            {
                newPrDeliveryDate = day + "." + mon + "." + year;
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
            }
            else if (delvDateCat === "M")
            {
                newPrDeliveryDate = mon + "." + year;
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
            }
            else if (delvDateCat === "W")
            {
                newPrDeliveryDate = weekNumber + "." + year;
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
            }

            $(this).parent().children(".PR_DeliveryDate").text(newPrDeliveryDate);

            if (ItemNumberSelectClass === insertionOrderId_Class)
            {
                $("#DeliveryScheduleTableId tbody tr").each(function() {
                    $(this).find("td").eq(1).children(".deliveryDateClass").val(newPrDeliveryDate);
                    if (delvDateCat === "D") {
                        $(this).find("td").eq(2).children(".statisticaldeliveryDateClass").val(newPrDeliveryDate);
                    } else {
                        $(this).find("td").eq(2).children(".statisticaldeliveryDateClass").val("");
                    }
                });
                saveDeliveryScheduleTabDataOnFieldChange("OnChange");
            }
        }
    });

    $("#DeliveryScheduleTableId").on("change", ".deliveryScheduleDatepicker", function() {
        var prDeliveryDate = $(this).val();
        console.log("prDeliveryDate: " + prDeliveryDate);
        var ItemNumberSelectClass = $(".ItemNumberSelectClass").val();

        var delvDateCat = $(this).parent().parent().find("td").eq(0).children(".deliveryDateCategory").val();
        console.log("delvDateCat: " + delvDateCat);

        var weekNumber = $.datepicker.iso8601Week(new Date(prDeliveryDate));
        console.log("WeekNumber 1: " + weekNumber);
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber 2: " + weekNumber);

        if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
        {
            var prDeliveryDateArr = prDeliveryDate.toString().split("/");
            console.log("prDeliveryDateArr len: " + prDeliveryDateArr.length);
            var mon = prDeliveryDateArr[0];
            var day = prDeliveryDateArr[1];
            var year = prDeliveryDateArr[2];

            var newPrDeliveryDate = "";
            if (delvDateCat === "D")
            {
                newPrDeliveryDate = day + "." + mon + "." + year;
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
                $(this).parent().parent().find("td").eq(2).children(".statisticaldeliveryDateClass").val(newPrDeliveryDate);
            }
            else if (delvDateCat === "M")
            {
                newPrDeliveryDate = mon + "." + year;
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
            }
            else if (delvDateCat === "W")
            {
                newPrDeliveryDate = weekNumber + "." + year;
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
            }

            $(this).parent().children(".deliveryDateClass").val(newPrDeliveryDate);

            $("#material_headerClass tbody tr").each(function() {
                var insertionOrderId_Class = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (ItemNumberSelectClass === insertionOrderId_Class)
                {
                    $(this).find("td").eq(11).children(".PR_DeliveryDate").text(newPrDeliveryDate);
                    return;
                }
            });

            // Set Min Delv Sch Date to PR Delv Date
//            var delDate = "";
//            var DeliveryDateArray = [];
//            $("#DeliveryScheduleTableId tbody tr").each(function(index) {
//                delDate = $(this).find("td").eq(1).children(".deliveryDateClass").val();
//                console.log(index + " : " + delDate);
//
//                var prDeliveryDateArr = delDate.toString().split(".");
//                console.log("prDeliveryDateArr len: " + prDeliveryDateArr.length);
//                var mon = prDeliveryDateArr[1];
//                var day = prDeliveryDateArr[0];
//                var year = prDeliveryDateArr[2];
//
//                var temp = new Date(year + "-" + mon + "-" + day);
//                console.log("temp: " + temp);
//                DeliveryDateArray.push(temp);
//            });
//            DeliveryDateArray.sort(function(a, b) {
//                return a > b ? 1 : -1;
//            });
//            console.log("DeliveryDateArray length: " + DeliveryDateArray.length);
//            console.log("DeliveryDateArray: " + DeliveryDateArray);
//
//            var smallestDate = "";
//            var months = {"0": "01", "1": "02", "2": "03", "3": "04", "4": "05", "5": "06", "6": "07", "7": "08", "8": "09", "9": "10", "10": "11", "11": "12"};
//            $("#material_headerClass tbody tr").each(function() {
//                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//                if (ItemNumberSelectClass === id) {
//                    var date = DeliveryDateArray[0].getDate();
//                    var month = DeliveryDateArray[0].getMonth();
//                    var year = DeliveryDateArray[0].getFullYear();
//                    date = date < 10 ? ("0" + date) : date;
//                    smallestDate = date + "." + months[month] + "." + year;
//                    console.log("smallestDate: " + smallestDate);
//                    $(this).find('td').eq(8).children(".PR_DeliveryDate").text(smallestDate);
//                }
//            });
            saveDeliveryScheduleTabDataOnFieldChange("OnChange");
        }
    });

    $("#DeliveryScheduleTableId").on("change", ".statisticalDeliveryScheduleDatepicker", function() {
        var prDeliveryDate = $(this).val();
        console.log("prDeliveryDate: " + prDeliveryDate);

        var delvDateCat = $(this).parent().parent().find("td").eq(0).children(".deliveryDateCategory").val();
        console.log("delvDateCat: " + delvDateCat);

        var statisticalDate = new Date(prDeliveryDate);

        var weekNumber = $.datepicker.iso8601Week(statisticalDate);
        console.log("WeekNumber 1: " + weekNumber);
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber 2: " + weekNumber);

        var firstDateOfWeek = statisticalDate.getDate() - statisticalDate.getDay() + (statisticalDate.getDay() === 0 ? -6 : 1);
        firstDateOfWeek = new Date(statisticalDate.setDate(firstDateOfWeek));
        console.log("firstDateOfWeek: " + firstDateOfWeek);

        if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
        {
            var prDeliveryDateArr = prDeliveryDate.toString().split("/");
            console.log("prDeliveryDateArr len: " + prDeliveryDateArr.length);
            var mon = prDeliveryDateArr[0];
            var day = prDeliveryDateArr[1];
            var year = prDeliveryDateArr[2];

            var newPrDeliveryDate = "";
            newPrDeliveryDate = day + "." + mon + "." + year;
            console.log("statisticaldeliveryDateClass: " + newPrDeliveryDate);

            if (delvDateCat === "M")
            {
                newPrDeliveryDate = "01" + "." + mon + "." + year;
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
                $(this).parent().children(".statisticaldeliveryDateClass").val(newPrDeliveryDate);
            }
            else if (delvDateCat === "W")
            {
                var tempMon = firstDateOfWeek.getMonth() + 1;
                newPrDeliveryDate = (firstDateOfWeek.getDate() < 10 ? "0" + firstDateOfWeek.getDate() : firstDateOfWeek.getDate())
                        + "." + (tempMon < 10 ? "0" + tempMon : tempMon)
                        + "." + firstDateOfWeek.getFullYear();
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
                $(this).parent().children(".statisticaldeliveryDateClass").val(newPrDeliveryDate);
            }
            else
            {
                $(this).parent().children(".statisticaldeliveryDateClass").val(newPrDeliveryDate);
            }

            saveDeliveryScheduleTabDataOnFieldChange("OnChange");
        }
    });

    $("#componentTableIdLineLevel").on("change", ".compReqDatepicker", function() {
        var compReqDate = $(this).val();
        console.log("compReqDate: " + compReqDate);

        var weekNumber = $.datepicker.iso8601Week(new Date(compReqDate));
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber: " + weekNumber);

        if (compReqDate !== "" && compReqDate !== undefined)
        {
            var compReqDateArr = compReqDate.toString().split("/");
            console.log("compReqDateArr len: " + compReqDateArr.length);
            var mon = compReqDateArr[0];
            var day = compReqDateArr[1];
            var year = compReqDateArr[2];

            var newCompReqDate = "";
            newCompReqDate = day + "." + mon + "." + year;
            console.log("newCompReqDate: " + newCompReqDate);

            $(this).parent().children(".comRequirementDate").val(newCompReqDate);
            $(this).parent().parent().find("td").eq(9).children(".compLatestReqDate").val(newCompReqDate);
            hideComponentModal();
            saveComponentTblDataOnLoadFieldChange();
        }
    });

    $("#componentTableIdLineLevel").on("change", ".compLatestReqDatepicker", function() {
        var compLatestReqDate = $(this).val();
        console.log("compLatestReqDate: " + compLatestReqDate);

        var weekNumber = $.datepicker.iso8601Week(new Date(compLatestReqDate));
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber: " + weekNumber);

        if (compLatestReqDate !== "" && compLatestReqDate !== undefined)
        {
            var compLatestReqDateArr = compLatestReqDate.toString().split("/");
            console.log("compLatestReqDateArr len: " + compLatestReqDateArr.length);
            var mon = compLatestReqDateArr[0];
            var day = compLatestReqDateArr[1];
            var year = compLatestReqDateArr[2];

            var newCompLatestReqDate = "";
            newCompLatestReqDate = day + "." + mon + "." + year;
            console.log("newCompLatestReqDate: " + newCompLatestReqDate);

            $(this).parent().children(".compLatestReqDate").val(newCompLatestReqDate);
            hideComponentModal();
            saveComponentTblDataOnLoadFieldChange();
        }
    });

    if ($("#validityFromHeader_div").length) {
        $('#validityFromHeader_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date(),
            defaultDate: new Date()
        });
    }

    if ($("#validityToHeader_div").length) {
        $('#validityToHeader_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date(),
            defaultDate: new Date()
        });
    }
    $("#PaymentImmediate").click(function() {
        var isChecked = $(this).prop("checked");
        if (isChecked === true) {
            $("#TaxCode").val("PN");
            $("#TexCodeForLine").val("PN");
        } else {
            $("#TaxCode").val("");
//            $("#TexCodeForLine").val("");
        }
    });

    var PrType = $("#PrType").val();
    var PoFrom = $("#PoFrom").val();


    if (PrType === "Service" && PoFrom === "createpo") {
        var LinkID;

//        $("#serviceTableId tbody tr").each(function() {
//            var netPrice = $(this).find("td").eq(8).children(".netPrice_Services").val();
//            totalNetPrice = Number(totalNetPrice) + Number(netPrice);
//        });
        $("#material_headerClass tbody tr").each(function() {
            LinkID = $(this).find("td").eq(0).children(".linkId_Class").val();
            var totalNetPrice = getSumOfNetPriceOfServiceByLinkId(LinkID);

            if (Number(totalNetPrice) !== 0 && Number(totalNetPrice) !== 0.0)
            {
                $(this).find('td').eq(12).children(".pr-net-price").val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                $(this).find('td').eq(12).children(".pr-net-price").attr("value", formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                $(this).find('td').eq(12).children(".pr-net-price").prop("readonly", true);

                $(this).find('td').eq(0).children(".netPriceHidden").val(Number(totalNetPrice));
                $(this).find('td').eq(0).children(".prNetPriceHidden").val(Number(totalNetPrice));
            }
        });
    }

    if (PoFrom === "byrfq") {
        calculatePBXXForHeader();
    }
    if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
        $("#addRowServiceAccAsgnTblBtnId").css("display", "");
    }


//    $("#overlay").css("display", "none");
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
            if (custSeglist.length !== 0) {
                var option = "";
                for (var i = 0; i < custSeglist.length; i++) {
                    option += "<option>" + custSeglist[i].segment + "</option>";
                }
                $("#SegmentDescriptionLine").append(option);
            }
        }
    });
//    $.ajax({
//        type: "GET",
//        url: "doajaxrequest.do",
//        async: false,
//        data: {
//            "reqFrom": "findAllMasterPurchaseGroup"
//        },
//        complete: function(responseJson) {
//            var obj = $.parseJSON(responseJson.responseText);
//            if (obj.length !== 0) {
//                var option = "";
//                for (var i = 0; i < obj.length; i++) {
//                    option += "<option value='" + obj[i].PURCHASING_GROUP + "'>" + obj[i].PURCHASING_GROUP + " - " + obj[i].PURCHASING_GROUP_DESC + "</option>";
//                }
//                $("#purchasingGroup").append(option);
//            }
//            var purGrp = $("#purchasingGrpHidden").val();
//            $("#purchasingGroup").val(purGrp);
//        }
//    });
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "findBuyerPurchasingGroupMappingList"
        },
        complete: function(responseJson) {
            var buyerPurchaseGroupMappingJsonArr = $.parseJSON(responseJson.responseText);
            buyerPurchaseGroupMappingJsonArr = JSON.parse(JSON.stringify(buyerPurchaseGroupMappingJsonArr));
            if (buyerPurchaseGroupMappingJsonArr.length !== 0) {
                var option = "";
                for (var i = 0; i < buyerPurchaseGroupMappingJsonArr.length; i++) {
                    option += "<option value='" + buyerPurchaseGroupMappingJsonArr[i].purchasingGroupCode + "'>" + buyerPurchaseGroupMappingJsonArr[i].purchasingGroupCode + " - " + buyerPurchaseGroupMappingJsonArr[i].purchasingGroupDesc + "</option>";
                }
                $("#purchasingGroup").append(option);
            }
//            var purGrp = $("#purchasingGrpHidden").val();
//            $("#purchasingGroup").val(purGrp);
        }
    });
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
        var IncoTermsPart2 = $("#incoTermsPart2Delivery").val();
        $("#incoTermsModal").modal("hide");
        var itemDropdownIdArray = [];
        var isPrSaved = "";
        var insertionid = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
                if (isPrSaved === "Yes") {
                    itemDropdownIdArray.push(itemDropdownId);

                    $.ajax({
                        type: "GET",
                        url: "poajaxrequest.do",
                        async: false,
                        data: {
                            "reqFrom": "updateDeiveryTabData",
                            "insertionOrderIdArrayAsString": itemDropdownIdArray.toString(),
                            "IncoTermsPart1": code,
                            "IncoTermsPart2": IncoTermsPart2
                        }
                    });
                }
            }
        });

    });

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


    $("#addRowConditionsBtnId").click(function() {

        var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
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
        var vendorname = vendor.substring(0, vendor.lastIndexOf('-')); // vendor.split("-")[0];
        var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split("-")[1];

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
                + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled value=''style='width: 150px;'><input type='hidden' class='ConditionValueHeaderHidden'></td>"
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
//                + "<td><input type='text' class='form-control form-rounded statusHeader tableInputField' name='statusHeader' style='width:100px;'></td>"
//                + "<td><input type='text' class='form-control form-rounded numeratorHeader tableInputField' name='numeratorHeader' style='width:100px;'></td>"
//                + "<td><input type='text' class='form-control form-rounded baseUoMHeader tableInputField' name='baseUoMHeader' style='width:100px;'></td>"
//                + "<td><input type='text' class='form-control form-rounded denoForConvHeader tableInputField' name='denoForConvHeader' style='width:100px;'></td>"
//                + "<td><input type='text' class='form-control form-rounded uOMExtraHeader tableInputField' name='uOMExtraHeader' style='width:100px;'></td>"
                + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRow' aria-hidden='true' style='width:5px;'></i></td>"
                + "</tr>";
        $("#conditionTableId tbody").append(tdrow);

        $("#conditionTableId tbody tr").last().find("td").eq(1).children(".ConditionTypeHeader").focus();

    });

    $("#conditionTableId").on("click", ".deleteConditionTebleRow", function() {
        var condAmountJsonArray = [];
        var condAmountJsonObj = {};
        var LinkID;
        var linkIdArray = [];
        var linkIdForDelete;
        var linkIdArrayForDelete = [];
        var InsertionOrderId = "";
        var insIdArray = [];
        var insIdForDelete = "";
        var insIdArrayForDelete = [];
        var insIdSelected = "";
        var linkidSelected = "";
        var insertionid = $("#ItemNumberSelect").val();
        var prCount = $("#material_headerClass tbody tr").length;
        var conditionType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        var conditionValue = removeCommaInNumber($(this).parent().parent().find("td").eq(8).children(".ConditionValueHeader").val());
        var amount = removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".newAmountHeader").val());
        var per = removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val());
        var isChecked = $(this).parent().parent().find("td").eq(0).children(".checkConditionTableRow").prop("checked");
        var conditionindex = $(this).parent().parent().find("td").eq(0).children(".conditionindex").val();
        if (isChecked === false) {
            $(this).parent().parent().remove();
        } else {
            return false;
        }
        var count = 0;
        $("#material_headerClass tbody tr").each(function() {
            var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
            InsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            insIdArray.push(InsertionOrderId);
//            if (isPrSaved === 'Yes') {
            LinkID = $(this).find("td").eq(0).children(".linkId_Class").val();
            linkIdArray.push(LinkID);
            conditionLineLevelArray.forEach(function(e) {
                condAmountJsonObj = {};
                if (e.Ctype === conditionType && e.itemCode === InsertionOrderId) {
                    console.log("e.Ctype :" + e.Ctype + " ,conditionType :" + " ,e.linkid :" + e.itemCode + " ,LinkID :" + InsertionOrderId);
                    condAmountJsonObj["condValue"] = e.conditionValue;
                    condAmountJsonObj["LinkID"] = LinkID;
                    condAmountJsonObj["itemCode"] = InsertionOrderId;
                    count++;
                    condAmountJsonArray.push(condAmountJsonObj);
                }
            });
//            }
            linkIdForDelete = $(this).find("td").eq(0).children(".linkId_Class").val();
            linkIdArrayForDelete.push(linkIdForDelete);

            insIdForDelete = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            insIdArrayForDelete.push(insIdForDelete);

            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (id === insertionid) {
                linkidSelected = $(this).find("td").eq(0).children(".linkId_Class").val();
                insIdSelected = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            }
        });
        console.log("condAmountJsonArray :" + JSON.stringify(condAmountJsonArray));

        if (conditionValue !== "") {
            $.ajax({
                type: "GET",
                url: "poajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "deleteHeaderConditionHeader",
                    "linkidArrayAsString": linkIdArray.toString(),
                    "insIdArrayAsString": insIdArray.toString(),
                    "conditionType": conditionType,
                    "amount": Number(amount),
                    "per": Number(per),
                    "count": count,
                    "conditionValue": JSON.stringify(condAmountJsonArray)
                }
            });
        }
        var condType = "";
        var addedFrom = "";
        var linkIdAsArray = linkIdArrayForDelete.toString().split(',');
        var insIdAsArray = insIdArrayForDelete.toString().split(',');
        var abort = false;
        for (var i = 0; i < insIdAsArray.length; i++) {
            conditionLineLevelArray.forEach(function(e, index) {
                if (conditionType === e.Ctype && insIdAsArray[i] === e.itemCode) {
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        addedFrom = $(this).find("td").eq(0).children(".lineAddedFromLineLevel").val();
                        if (addedFrom === "headerlevel") {
                            if (abort === false) {
                                if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                                    condType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                                    condType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                                }
                                if (condType === e.Ctype && insIdSelected === e.itemCode && conditionindex === e.indexnumber) {
                                    var conAmount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountLineLevel").val());
                                    var per = removeCommaInNumber($(this).find("td").eq(5).children(".newPerQuantityLineLavel").val());
                                    var condVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
                                    console.log("conAmount==== :" + conAmount + " ,e.amount :" + e.amount + " ,condType :" + condType + " ,e.Ctype :" + e.Ctype);
                                    console.log("conAmount-- :" + conAmount + " ,e.amount :" + e.amount);
                                    console.log("per :::" + per + " ,e.per :" + e.per);
                                    console.log("condVal bittu:" + condVal + " ,e.conditionValue :" + e.conditionValue);
                                    if (Number(conAmount) === Number(e.amount)) {
                                        $(this).remove();
                                    } else if (conAmount !== Number(e.amount).toFixed(2)) {
                                        $(this).find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma(Number(Number(conAmount) - Number(e.amount)).toFixed(2)));
                                        $(this).find("td").eq(5).children(".newPerQuantityLineLavel").val(formatAmountByComma(Number(Number(per) - Number(e.per)).toFixed(2)));
                                        $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(Number(condVal) - Number(e.conditionValue)).toFixed(2)));
                                        abort = true;
                                    }
                                }
                            }
                        }
                    });
                    if (conditionindex === e.indexnumber) {
                        conditionLineLevelArray.splice(index, 1);
                    }
                }
//                conditionLineLevelArray.splice(index, 1);
//                alert("length :" + conditionLineLevelArray.length);
            });
        }
        console.log("conditionLineLevelArray after delete Row :" + JSON.stringify(conditionLineLevelArray));

        deleteRowFormConditionHeader();
        deleteRowFormCondition("");
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
//        vendorname = vendor.split("-")[1];
        var vendorCode = conditionTableCurrentClick.parent().parent().find("td").eq(0).children('.conditionVendorHeader').val();
        var fromCurrency;
        var item;
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
//        $("#VendorMasterModalHeader").modal("show");
        var companyCodeHeader = $("#companycodeHeader").val();
        $("#overlay").css("display", "block");
        findVendorByCompanyCodeHeader(companyCodeHeader);
        $("#conditiondetailsHeaderModal").modal("hide");
    });

    var vendorMasterModal = null;
    function findVendorByCompanyCodeHeader(companyCodeHeader) {
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
                    row += "<tr class='vendorMasterModalTableTrHeader'>"
                            + "<td>" + jsonVendorArr[i].vendorCode + "</td>"
                            + "<td>" + jsonVendorArr[i].vendorName + "</td>"
                            + "</tr>";
                }

                $("#vendorMasterModalHeaderTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#vendorMasterModalHeaderTable')) {
                    vendorMasterModal.destroy();
                    vendorMasterModal = null;
                    $("#vendorMasterModalHeaderTable").children('tbody').html(row);
                    vendorMasterModal = $('table.vendorMasterModalHeaderTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    vendorMasterModal.buttons().container()
                            .appendTo('#vendorMasterModalHeaderTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#vendorMasterModalHeaderTable thead tr').clone(true).appendTo('#vendorMasterModalHeaderTable thead');
                    $('#vendorMasterModalHeaderTable thead tr:eq(1) th').each(function(i) {
                        $('#vendorMasterModalHeaderTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (vendorMasterModal.column(i).search() !== this.value) {
                                vendorMasterModal
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    vendorMasterModal = $('table.vendorMasterModalHeaderTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    vendorMasterModal.buttons().container()
                            .appendTo('#vendorMasterModalHeaderTable_wrapper .col-md-6:eq(0)');
                }
                $("#VendorMasterModalHeader").modal("show");
                $("#overlay").css("display", "none");
            }
        });

    }
    $("#vendorMasterModalHeaderTable").on("click", ".vendorMasterModalTableTrHeader", function() {
        var vendorCode = $(this).find("td").eq(0).text();
        var vendorName = $(this).find("td").eq(1).text();
        conditionTableCurrentClick.parent().parent().find("td").eq(0).children(".conditionVendorHeader").val(vendorCode);
        $("#vendorConditionHeader").val(vendorCode);
        conditionTableCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderVendorName').val(vendorName);
        conditionTableCurrentClick.parent().parent().find("td").eq(11).children('.conditionHeaderVendorCode').val(vendorCode);
        var headerCondType = conditionTableCurrentClick.parent().parent().find("td").eq(1).children('.ConditionTypeHeader').val();
        $("#VendorMasterModalHeader").modal("hide");

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
        conditionLineLevelArray.forEach(function(e) {
            e.vendorcode = vendorCode;
            e.vendorname = vendorName;
        });
        console.log("conditionLineLevelArray after vendor change:" + JSON.stringify(conditionLineLevelArray));
        updateInConditionTable();
        $("#conditiondetailsHeaderModal").modal("show");
    });

    var conHeaderType = null;
    var condTabCurrentClick = "";
    $("#conditionTableId").on("keypress", ".ConditionTypeHeader", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            condTabCurrentClick = $(this);
            conitionClick = $(this).parent().parent();
            var pricingprocedure = $("#kalsmHiddenfield").val();
    //        alert("pricingprocedure :" + pricingprocedure);
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

    $("#conditionTypeTableHeaderId").on("click", ".checkConditionTypeModelHeaderClass", function() {
        var Ctype = $(this).parent().parent().find("td").eq(1).text();
        var name = $(this).parent().parent().find("td").eq(2).text();
        var crcy = $(this).parent().parent().find("td").eq(3).text();
        var uom;
        var prCurrency = "";
        var count = 1;
        $("#conditionTableId tbody tr").each(function() {
            var availaleCondition = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
            var addedFrom = $(this).find("td").eq(0).children('.lineAddedFromHeader').val();
            var changeId = $(this).find("td").eq(11).children('.conditionHeaderCHANGEID').val();
            if (addedFrom === "headerlevel" && changeId === "I") {
                if (availaleCondition === Ctype) {
                    count++;
                }
            }
        });
        console.log("count :" + count);
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $(".ItemNumberSelectClass").val();
            if (id === insertionid) {
                uom = $(this).find("td").eq(7).children(".prUom").val();
                prCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
            }
        });

        var flag = false;
//        for (var k = 0; k < conditionLineLevelArray.length; k++) {
//            if (conditionLineLevelArray[k].Ctype === Ctype) {
//                Lobibox.alert("error", {
//                    msg: "This Condition Type already selected, Please Select Another One !"
//                });
//                flag = true;
//                break;
//            }
//        }
        if (flag === false) {
            condTabCurrentClick.val(Ctype);
            condTabCurrentClick.parent().parent().find("td").eq(2).children('.nameConditionsHeader').val(name);
            if (crcy === "%") {
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyHeader').val("%");
            } else {
                condTabCurrentClick.parent().parent().find("td").eq(4).children('.CurrencyHeader').val(prCurrency);
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
            condTabCurrentClick.parent().parent().find("td").eq(0).children('.conditionindex').val(count);

            var fromCurrency;
            var item;
            var insertionid = $("#ItemNumberSelect").val();
            var linkid;
            var pRItemNumber = "";
            $("#material_headerClass tbody tr").each(function() {
                var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === itemDropdownId) {
                    fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                    item = $(this).find("td").eq(1).text();
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                    pRItemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
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

    var grossCondVal;
    var conditionAmountJsonArray = [];
    var lobiboxNotifyAlert = null;
    $("#conditionTableId").on("change", ".newAmountHeader", function() {
        var errorMsg = "";
        var PrType = $("#PrType").val();
        var isUnitPriceEmpty = "Yes";
        var prIndex = -1;
        if (PrType === "Material") {
            $("#material_headerClass tbody tr").each(function(index) {
                if ($(this).find("td").eq(12).children(".pr-net-price").val() === "") {
                    isUnitPriceEmpty = "No";
                    prIndex = index + 1;
                    return false;
                }
            });
            if (isUnitPriceEmpty === "No") {
                if (lobiboxNotifyAlert !== null) {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter the unit price in " + prIndex + " PR";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                $(this).val("");
                return false;
            }
        }

        conditionAmountJsonArray = [];
        var conditionValue = "";
        var prCount = $("#material_headerClass tbody tr").length;
        console.log("New Per Qty: " + $(this).parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val());
        var perQty = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val()));
        console.log("perQty: " + perQty);
        var Quantity = 0;
        //        var quantity = 0;
        var fromCurrency;
        var poQty = 0;
        var insertionid = $("#ItemNumberSelect").val();
        var netPrice;
        var linkid;
        var cType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        var possition = $(this);
        var totalCondValue = 0;
        var condValue = 0;
        var amount = possition.val();
        console.log("amount 1: " + amount);
        amount = removeCommaInNumber(amount);
        console.log("amount 2: " + amount);
        $(this).val(formatAmountByComma(removeCommaInNumber($(this).val())));
        $("#material_headerClass tbody tr").each(function() {
            var insertionid = $("#ItemNumberSelect").val();
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//            if (insertionid === itemDropdownId) {
            Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            grossCondVal = removeCommaInNumber(possition.parent().parent().parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueHeader").val());
            var toCurrency = possition.parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
            var conditionAmountJsonObject = {};
            var quant;
            var fml = formula(cType);
            var exp = new String(fml);
            var expAfterSplit = exp.split("/");
            var poQty = Quantity;
            if (expAfterSplit[0].trim() === "(grossCondVal" || expAfterSplit[0].trim() === "amount") {
                var quant;
                condValue = eval(exp.toString());
                totalCondValue = Number(totalCondValue) + Number(condValue);
                console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,poQty :" + poQty + " ,perQty :" + perQty);
                console.log("Condition val :" + eval(exp.toString()));
                possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").attr("disabled", true);
                possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val("0.00");
                if (toCurrency === fromCurrency || toCurrency === '%') {
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
                } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                    var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                    if (exchangeRate === "") {
                        exchangeRate = 1;
                    }
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
                }

            } else if (expAfterSplit[0].trim() === "(amount*poQty)") {
                condValue = eval(exp.toString());
                totalCondValue = Number(totalCondValue) + Number(condValue);
                console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,grossCondVal :" + grossCondVal);
                if (toCurrency === fromCurrency || toCurrency === '%') {
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
                } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                    var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                    if (exchangeRate === "") {
                        exchangeRate = 1;
                    }
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
                }
            }
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonObject["itemCode"] = itemDropdownId;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });
        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeader();
        clearPerColumnatHeaderAfterSave();
    });

    $("#conditionTableId").on("change", ".AmountHeader", function() {
        var errorMsg = "";
        var PrType = $("#PrType").val();
        var isUnitPriceEmpty = "Yes";
        var prIndex = -1;
        if (PrType === "Material") {
            $("#material_headerClass tbody tr").each(function(index) {
                if ($(this).find("td").eq(12).children(".pr-net-price").val() === "") {
                    isUnitPriceEmpty = "No";
                    prIndex = index + 1;
                    return false;
                }
            });
            if (isUnitPriceEmpty === "No") {
                if (lobiboxNotifyAlert !== null) {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter the unit price in " + prIndex + " PR";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                $(this).val("");
                return false;
            }
        }

        conditionAmountJsonArray = [];
        var conditionValue = "";
        var prCount = $("#material_headerClass tbody tr").length;
        var perQty = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".PerQuantityHeader").val()));
        var Quantity = 0;
        var fromCurrency;
        var poQty = 0;
        var insertionid = $("#ItemNumberSelect").val();
        var netPrice;
        var linkid;
        var cType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        var possition = $(this);
        var totalCondValue = 0;
        var condValue = 0;
        var amount = possition.val();
        $(this).val(Number(Number($(this).val())).toFixed(2));
        $("conditionTableId tbody tr").each(function() {
            var conType = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            if (conType === "PBXX") {
                grossCondVal = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val());
            }
        });
        $("#material_headerClass tbody tr").each(function() {
            var insertionid = $("#ItemNumberSelect").val();
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            var toCurrency = possition.parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
            var conditionAmountJsonObject = {};
            var quant;
            var fml = formula(cType);
            var exp = new String(fml);
            var expAfterSplit = exp.split("/");
            var poQty = Quantity;
            if (expAfterSplit[0].trim() === "(grossCondVal" || expAfterSplit[0].trim() === "amount") {
                var quant;
                condValue = eval(exp.toString());
                totalCondValue = Number(totalCondValue) + Number(condValue);
                console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,poQty :" + poQty + " ,perQty :" + perQty);
                console.log("Condition val :" + eval(exp.toString()));
                possition.parent().parent().find("td").eq(5).children(".PerQuantityHeader").attr("disabled", true);
                possition.parent().parent().find("td").eq(5).children(".PerQuantityHeader").val("0.00");
                if (toCurrency === fromCurrency || toCurrency === '%') {
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
                } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                    var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                    if (exchangeRate === "") {
                        exchangeRate = 1;
                    }
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
                }

            } else if (expAfterSplit[0].trim() === "(amount*poQty)") {
                condValue = eval(exp.toString());
                totalCondValue = Number(totalCondValue) + Number(condValue);
                console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,grossCondVal :" + grossCondVal);
                if (toCurrency === fromCurrency || toCurrency === '%') {
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
                } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                    var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                    if (exchangeRate === "") {
                        exchangeRate = 1;
                    }
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
                }
            }
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonObject["itemCode"] = itemDropdownId;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });

        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeader();
        clearPerColumnatHeaderAfterSave();
    });

    $("#conditionTableId").on("change", ".newPerQuantityHeader", function() {
        var linkid;
        var prCount = $("#material_headerClass tbody tr").length;
        var Quantity = 0;
        console.log("New Amount Header: " + $(this).parent().parent().find("td").eq(3).children(".newAmountHeader").val());
        var amount = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".newAmountHeader").val()));
        console.log("amount: " + amount);
        var perQuant = $(this).val();
        console.log("perQuant 1: " + perQuant);
        perQuant = removeCommaInNumber(perQuant);
        console.log("perQuant 2: " + perQuant);
        var condValue = 0;
        var totalCondValue = 0;
        var insertionid = $("#ItemNumberSelect").val();
        var fromCurrency;
        var perQty = "";
//        var netPrice = "";
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
        $(this).val(formatAmountByComma(removeCommaInNumber($(this).val())));
        var possition = $(this);
        var conType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        conditionAmountJsonArray = [];
        $("#material_headerClass tbody tr").each(function() {
            var insertionid = $("#ItemNumberSelect").val();
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//            if (insertionid === itemDropdownId) {
            if (insertionid === itemDropdownId) {
                fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
            }
            Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            var conditionAmountJsonObject = {};
            var fml = formula(conType);
            var poQty = Quantity;
            perQty = perQuant;
            var quant;
            var exp = new String(fml);
            condValue = eval(exp.toString());
            totalCondValue = Number(totalCondValue) + Number(condValue);
            console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,poQty :" + poQty + " ,perQuant :" + perQuant);
            if (toCurrency === fromCurrency || toCurrency === '%') {
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
            }
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonObject["itemCode"] = itemDropdownId;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });
        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeader();
        clearPerColumnatHeaderAfterSave();
    });

    $("#conditionTableId").on("change", ".PerQuantityHeader", function() {
        var linkid;
        var prCount = $("#material_headerClass tbody tr").length;
        var Quantity = 0;
        var amount = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".AmountHeader").val()));
        var perQuant = $(this).val();
        var condValue = 0;
        var totalCondValue = 0;
        var insertionid = $("#ItemNumberSelect").val();
        var fromCurrency;
        var perQty = "";
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
        $(this).val(Number(Number($(this).val())).toFixed(2));
        var possition = $(this);
        var conType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        conditionAmountJsonArray = [];
        $("#material_headerClass tbody tr").each(function() {
            var insertionid = $("#ItemNumberSelect").val();
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
//            if (insertionid === itemDropdownId) {
            if (insertionid === itemDropdownId) {
                fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
            }
            linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            var conditionAmountJsonObject = {};
            var fml = formula(conType);
            var poQty = Quantity;
            perQty = perQuant;
            var quant;
            var exp = new String(fml);
            condValue = eval(exp.toString());
            totalCondValue = Number(totalCondValue) + Number(condValue);
            console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,poQty :" + poQty + " ,perQuant :" + perQuant);
            if (toCurrency === fromCurrency || toCurrency === '%') {
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRate(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
            }
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonObject["itemCode"] = itemDropdownId;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });
        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeader();
        clearPerColumnatHeaderAfterSave();
    });

    var current = "";
    var lobiboxNotifyAlert = null;
    var lobiboxDestroyAlert = null;
    $("#material_headerClass").on("click", ".delete-pr-line", function() {
        current = $(this);
        var nextPr = $(this).parent().parent().first().next();
//        $(".delete-pr-line").prop('checked', false);
//        $(this).prop('checked', true);
        var linkidPr = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        var lineItemNumber = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        var prRfqNumber = $(this).parent().parent().find("td").eq(33).children(".pr-rfq-Number").val();
        var prRfqLineItemNumber = $(this).parent().parent().find("td").eq(34).children(".pr-rfq-line-item-number").val();
        console.log("prRfqNumber: " + prRfqNumber);
        console.log("prRfqLineItemNumber: " + prRfqLineItemNumber);
        var prlength = $("#material_headerClass tbody tr").length;
//        var ischecked = $(this).prop("checked");
//        if (ischecked === true) {
        if (prlength === 1) {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            var errorMsg = "This PR can't be deleted!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        } else {
            console.log("lobiboxDestroyAlert :" + lobiboxDestroyAlert);
            if (lobiboxDestroyAlert !== null) {
                lobiboxDestroyAlert.destroy();
            }
            lobiboxDestroyAlert = Lobibox.confirm({
                msg: "Are you sure you want to delete this PR?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("yes");
                        current.parent().parent().remove();

                        var vendorcodeHeader = $("#vendorSno").val(); // $("#vendorcodeHeader").val();
                        if (vendorcodeHeader !== "") {
                            calculatePBXXForHeader();
                            deleteRowFormConditionHeader();

                            if (conditionLineLevelArray.length !== 0) {
                                console.log("conditionLineLevelArray before delete PR :" + JSON.stringify(conditionLineLevelArray));
                                conditionLineLevelArray.forEach(function(e, index) {
                                    if (lineItemNumber === e.itemCode) {
                                        conditionLineLevelArray.splice(index, 1);
                                    }
                                });
                                console.log("conditionLineLevelArray after delete PR :" + JSON.stringify(conditionLineLevelArray));
                            }
                        }
                        $("#ItemNumberSelect option").remove();

                        var option = "<option value=''>select</option>";
                        $("#material_headerClass tbody tr").each(function() {
                            var itemnumber = $(this).find("td").eq(1).text();
                            var shortText = $(this).find("td").eq(5).children(".pr-short-text").val();
                            var insOrder = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                            option += "<option value=" + insOrder + ">" + itemnumber.trim() + " - " + shortText.trim() + "</option>";
                        });
                        $("#ItemNumberSelect").append(option);
                        $("#lineLevelTabsDiv").css("display", "none");

                        var isPRSaved = current.parent().parent().find("td").eq(0).children(".isPrSaved").val();
                        if (isPRSaved === "Yes") {
                            $.ajax({
                                type: "GET",
                                url: "standalonepoajaxrequest.do",
                                async: false,
                                data: {
                                    "reqFrom": "deleteDataFromDBForDeletedPR",
                                    "linkId": linkidPr,
                                    "lineItemNumber": lineItemNumber
//                                    "ServiceArrAsString": JSON.stringify(ServiceArr)
                                }
                            });
                        }
                        var PoFrom = $("#PoFrom").val();
                        if (PoFrom === "byrfq") {
                            var VendorFinalizationTableDataArrayAsJsonString = JSON.parse($("#VendorFinalizationTableDataArrayAsJsonString").val());
                            if (VendorFinalizationTableDataArrayAsJsonString.length !== 0) {
                                console.log("VendorFinalizationTableDataArrayAsJsonString before delete PR :" + JSON.stringify(VendorFinalizationTableDataArrayAsJsonString));
                                VendorFinalizationTableDataArrayAsJsonString.forEach(function(e, index) {
                                    console.log("e.rfqNumber: " + e.rfqNumber);
                                    console.log("e.rfqLineItemNumber: " + e.rfqLineItemNumber);
                                    if (prRfqNumber === e.rfqNumber && prRfqLineItemNumber === e.rfqLineItemNumber) {
                                        VendorFinalizationTableDataArrayAsJsonString.splice(index, 1);
                                    }
                                });
                                console.log("VendorFinalizationTableDataArrayAsJsonString after delete PR :" + JSON.stringify(VendorFinalizationTableDataArrayAsJsonString));
                                $("#VendorFinalizationTableDataArrayAsJsonString").val(JSON.stringify(VendorFinalizationTableDataArrayAsJsonString));
                            }
                        }
//                            lobiboxNotifyAlert = null;
//                        callFnOnPrDeleteOrItemChange();

                        var taxCode = nextPr.find("td").eq(0).children(".TexCodeForLineInPr").val();
                        var confControl = nextPr.find("td").eq(0).children(".ConfirmationControlForLineInPr").val();
                        var segment = nextPr.find("td").eq(0).children(".SegmentForLineInPr").val();

                        $("#ConfirmationControlForLine").val(confControl);
                        $("#TexCodeForLine").val(taxCode);
                        $("#SegmentForLine").val(segment);

                    }
                    else if (type === 'no')
                    {
//                            $(".delete-pr-line").prop('checked', false);
                        console.log("no");
//                            lobiboxNotifyAlert = null;
                    }
                }
            });
        }
//        }
    });

    $("#InstructionToWeigher").change(function() {
        var InstructionToWeigher = $(this).val();
        if (InstructionToWeigher.match(/^\d/)) {
            var InstToWeigherSubStr = InstructionToWeigher.substring(0, 2);
            var option = "<option value=" + InstToWeigherSubStr + ">" + InstToWeigherSubStr + "</option>";
//            $("#ZoneCollectionScrap").append(option);
//            $("#ZoneCollectionScrap").val(InstToWeigherSubStr);
        } else {
            if (InstructionToWeigher === "SD_ALL GRADES") {
                $("#ZoneCollectionScrap").val("");
                $("#ZoneCollectionScrap").prop("disabled", true);
            } else {
                $("#ZoneCollectionScrap").prop("disabled", false);
            }
        }

    });

    $("#confControlLimits").change(function() {
        var confirmationControlForLine = $("#ConfirmationControlForLine").val();
        var confControl = $(this).val();
        if (confirmationControlForLine === "") {
            $("#ConfirmationControlForLine").val(confControl);
        }
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                $(this).find("td").eq(0).children(".ConfirmationControlForLineInPr").val(confControl);
            }
        });

    });
    $("#SegmentDescriptionLine").change(function() {
        var SegmentForLine = $("#SegmentForLine").val();
        var segment = $(this).val();
        if (SegmentForLine === "") {
            $("#SegmentForLine").val(segment);
        }
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                $(this).find("td").eq(0).children(".SegmentForLineInPr").val(segment);
            }
        });
    });


    $("#serviceTabAccAsgnTebleId").on("click", ".deleteServiceLine", function() {
        var isChecked = $(this).prop("checked");
        var current = $(this);
        var accountAssignmentCategory = "";
        var length = $("#serviceTabAccAsgnTebleId tbody tr").length;
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
            }
        });
        if (isChecked === true) {
            isCheckedSerAccAsgnCount++;
            $(this).parent().parent().find("input[type='text']").prop("disabled", true);
        } else {
            isCheckedSerAccAsgnCount--;
            $(this).parent().parent().find("input[type='text']").prop("disabled", false);
            serviceTabAccAsgnTblQuantPerChange("", accountAssignmentCategory);
            var ServiceAccAssDist = $('input[type=radio][name=distributionIndicator]:checked').attr('id');
            if (ServiceAccAssDist === "noMultiAcctAssignment") {
                $("#serviceTabAccAsgnTebleId :input").prop("disabled", true);
            } else if (ServiceAccAssDist === "distOnQuantBases") {
                distOnQuantPercentageBases(accountAssignmentCategory, "quantity");
            } else if (ServiceAccAssDist === "distByPercentage") {
                distOnQuantPercentageBases(accountAssignmentCategory, "percentage");
            }
        }

        if (isCheckedSerAccAsgnCount === length) {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            var errorMsg = "This Account Assignment can't be deleted!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            isCheckedSerAccAsgnCount--;
            current.parent().parent().find("input[type='text']").prop("disabled", false);
            serviceTabAccAsgnTblQuantPerChange("", accountAssignmentCategory);
            var ServiceAccAssDist = $('input[type=radio][name=distributionIndicator]:checked').attr('id');
            if (ServiceAccAssDist === "noMultiAcctAssignment") {
                $("#serviceTabAccAsgnTebleId :input").prop("disabled", true);
            } else if (ServiceAccAssDist === "distOnQuantBases") {
                distOnQuantPercentageBases(accountAssignmentCategory, "quantity");
            } else if (ServiceAccAssDist === "distByPercentage") {
                distOnQuantPercentageBases(accountAssignmentCategory, "percentage");
            }
            return false;
        }
    });
    $("#addRowServiceAccAsgnTblBtnId").click(function() {
        var accountAssignmentCategory = "";
//        var serviceTabTableCurrentTd = "";
        var ServiceAccAssDist = "";
        var current_tr = $(this).parent().parent();
        var LineNoSerAcc = $("#serviceTabAccAsgnTebleId tbody tr:first").find("td").eq(0).children(".LineNoSerAcc").val();
//        var glCode = $("#serviceTabAccAsgnTebleId tbody tr :first").eq(3).children(".serviceAccAsgnTblGLAccount").val();
        var rows = $("#serviceTabAccAsgnTebleId tbody tr");
        var glCode = "";
        var CoArea = "";
        for (var i = 0; i < rows.length; i++) {
            glCode = $(rows[i]).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val();
            CoArea = $(rows[i]).find("td").eq(4).children(".serviceAccAsgnTblCOArea").val();
            break;
        }
        var quantityService = removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".quantity_Services").val());
        var grossPrice = Number(removeCommaInNumber(serviceTabTableCurrentTd.parent().parent().find("td").eq(7).children('.grossPrice_Services').val()).toFixed(1));
        var totalAssgnQuantity = 0.0;
        var totalAssgnPer = 0.0;
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            var asgnQty = removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val());
            totalAssgnQuantity = Number(asgnQty) + Number(totalAssgnQuantity);
            var asgnPer = $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
            totalAssgnPer = Number(asgnPer) + Number(totalAssgnPer);
        });
        var remainingQty = Number(quantityService) - Number(totalAssgnQuantity);
        var remainingPer = 100 - Number(totalAssgnPer);
//        var prevLinkNumber = $("#serviceTabAccAsgnTebleId tbody tr").last().find("td").eq(16).children(".linkNumber").val();
        var prevLinkNumber = $("#serviceTabAccAsgnTebleId tbody tr").last().find("td").eq(16).children(".linkNumber").val();
        var linkNumber = parseInt(prevLinkNumber) + 10;
        var netValue = Number(remainingQty) * Number(grossPrice);
        var tdrow = "<tr><td><input type='hidden' class='LineNoSerAcc' value='" + LineNoSerAcc + "'><input type=checkbox class=deleteServiceLine> | <i class='fa fa-window-close deleterowClass' aria-hidden='true' style='width:22px;'>" +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value="' + formatNumberByComma(Number(remainingQty).toFixed(2)) + '" max="' + Number(remainingQty).toFixed(2) + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" value="' + Number(remainingPer).toFixed(2) + '" max="' + Number(remainingPer).toFixed(2) + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" style="width: 100px;" value="' + glCode + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" style="width: 100px;" value="' + CoArea + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" style="width: 100px;" value="' + glCode + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" style="width: 100px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" style="width: 100px;" value="">\n\
                            <input type="hidden" class="form-control form-rounded input-height netValue" value="' + netValue + '">\n\
                            <input type="hidden" class="form-control form-rounded input-height linkNumber" value="' + linkNumber + '">' +
                "</td></tr>";
        $("#serviceTabAccAsgnTebleId tbody").append(tdrow);

        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                console.log("insertionid bt:" + insertionid + " " + "id :" + id);
                accountAssignmentCategory = $(this).find("td").eq(2).children('.accountAssignmentClass').val();
            }
        });
        serviceTabAccAsgnTblQuantPerChange(current_tr, accountAssignmentCategory);
        var ServiceAccAssDist = $('input[type=radio][name=distributionIndicator]:checked').attr('id');
        if (ServiceAccAssDist === "noMultiAcctAssignment") {
            $("#serviceTabAccAsgnTebleId :input").prop("disabled", true);
        } else if (ServiceAccAssDist === "distOnQuantBases") {
            distOnQuantPercentageBases(accountAssignmentCategory, "quantity");
        } else if (ServiceAccAssDist === "distByPercentage") {
            distOnQuantPercentageBases(accountAssignmentCategory, "percentage");
        }
    });

    var currentPrRow = null;
    $("#material_headerClass").on("keypress", ".pr-tracking-number", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            currentPrRow = $(this).parent().parent();
            $("#overlay").css("display", "block");
            setTimeout(function() {
                var companyCode = $("#companycodeHeader").val();
    //            getTrackingNumberByCompanyCode(companyCode);
                getDepartmentMaster(companyCode);
                $("#PoDepartmentMasterModal").modal("show");
    //            $("#overlay").css("display", "none");
            }, 1000);
        }
    });
    $("#poDepartmentMasterTable").on("click", ".poDepartmentMasterTrClass", function() {
        var dept = $(this).find("td").eq(0).text();
        console.log("dept: " + dept);
        currentPrRow.find("td").eq(19).children(".pr-tracking-number").val(dept);
        $("#PoDepartmentMasterModal").modal("hide");
    });

    // Populate OPU for this PO Line on clicking enter key
    var orderPriceUnitModalTable = null;
    var prLineTableCurrentRow = null;
    $("#material_headerClass").on("keypress", ".prOrderPriceUnit", function(e) {
        console.log("e.keyCode: " + e.keyCode);
        prLineTableCurrentRow = $(this).parent().parent();
        if (e.keyCode === 13)
        {
            console.log("Enter key pressed!");
            var CompanyCode = $("#companycodeHeader").val();
            var matCode = $(this).parent().parent().find("td").eq(0).children(".prMaterialCodeHidden").val();
            console.log("CompanyCode: " + CompanyCode);
            console.log("matCode: " + matCode);
            if (matCode !== "" && CompanyCode !== "")
            {
                $("#overlay").css("display", "block");
                setTimeout(function() {
                    var jsonArr = getMaterialMasterOnLoad(matCode, CompanyCode);
                    console.log("jsonArr len: " + jsonArr.length);
                    if (jsonArr.length > 0)
                    {
                        $("#orderPriceUnitModalTable tbody tr").remove();
                        console.log("Record found for " + matCode + " in material master!");
                        var orderUnit = jsonArr[0].orderUnit;
                        var baseUom = jsonArr[0].baseUOM;
                        console.log("orderUnit: " + orderUnit);
                        console.log("baseUom: " + baseUom);
                        var row = "";
                        if (orderUnit !== "")
                        {
                            if (baseUom !== orderUnit)
                            {
                                row += "<tr class='orderPriceUnitModalTableTr'><td>" + baseUom + "</td></tr>";
                                row += "<tr class='orderPriceUnitModalTableTr'><td>" + orderUnit + "</td></tr>";
                            }
                            else
                            {
                                row += "<tr class='orderPriceUnitModalTableTr'><td>" + baseUom + "</td></tr>";
                            }
                        }
                        console.log("row: " + row);

                        $("#orderPriceUnitModalTable tbody").append(row);

                        if ($.fn.DataTable.isDataTable('#orderPriceUnitModalTable')) {
                            orderPriceUnitModalTable.destroy();
                            orderPriceUnitModalTable = null;
                            $("#orderPriceUnitModalTable").children('tbody').html(row);
                            orderPriceUnitModalTable = $('table.orderPriceUnitModalTable').DataTable({
                                lengthChange: false,
                                orderCellsTop: true
                            });
                            orderPriceUnitModalTable.buttons().container()
                                    .appendTo('#orderPriceUnitModalTable_wrapper .col-md-6:eq(0)');
                        } else {
                            $('#orderPriceUnitModalTable thead tr').clone(true).appendTo('#orderPriceUnitModalTable thead');
                            $('#orderPriceUnitModalTable thead tr:eq(1) th').each(function(i) {
                                $('#orderPriceUnitModalTable thead tr:eq(0) th').addClass("table-header-color");
                                var title = $(this).text();
                                if (title === '') {
                                    $(this).html('');
                                } else {
                                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                                }
                                $('input', this).on('keyup change', function() {
                                    if (orderPriceUnitModalTable.column(i).search() !== this.value) {
                                        orderPriceUnitModalTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });
                            orderPriceUnitModalTable = $('table.orderPriceUnitModalTable').DataTable({
                                lengthChange: false,
                                orderCellsTop: true
                            });
                            orderPriceUnitModalTable.buttons().container()
                                    .appendTo('#orderPriceUnitModalTable_wrapper .col-md-6:eq(0)');
                        }
                        $("#orderPriceUnitModal").modal("show");
                    }
                    else
                    {
                        console.log("Record not found for " + matCode + " in material master!");
                    }
                    $("#overlay").css("display", "none");
                }, 1000);
            }
        }
        else
        {
            console.log("Enter key note pressed!");
        }
    });

    // Set and Update OPU on UI and DB
    $("#orderPriceUnitModalTable").on("click", ".orderPriceUnitModalTableTr", function() {
        console.log("orderPriceUnitModalTableTr click!");
        var opu = $(this).text();
        console.log("opu: " + opu);
        prLineTableCurrentRow.find("td").eq(8).children(".prOrderPriceUnit").val(opu);
        $("#orderPriceUnitModal").modal("hide");

        // Update Order Price Unit on UI
        var ItemNumberSelect = $("#ItemNumberSelect").val();
        var insertonOrderId = prLineTableCurrentRow.find("td").eq(0).children(".insertionOrderId_Class").val();
        if (ItemNumberSelect === insertonOrderId)
        {
            $("#unitOrderPriceUnit").val(opu);
        }
        // Update Order Price Unit in DB
        updateOrderPriceUnitInQtyAndWtTabOfPoLine(insertonOrderId, opu);
        updateConditionTableOnOPUChange(opu);
        saveConditionTabDataOnLoadFieldChange();
    });

    // Update OPU on change
    $("#material_headerClass").on("change", ".prOrderPriceUnit", function() {
        var insertonOrderId = $(this).parent().parent().find("td").eq(0).children(".insertionOrderId_Class").val();
        var prMaterialCode = $(this).parent().parent().find("td").eq(0).children(".prMaterialCodeHidden").val();
        if (prMaterialCode !== "")
        {
            var opu = $(this).val();

            // Update Order Price Unit on UI
            var ItemNumberSelect = $("#ItemNumberSelect").val();
            if (ItemNumberSelect === insertonOrderId)
            {
                $("#unitOrderPriceUnit").val(opu);
            }

            // Update Order Price Unit in DB
            updateOrderPriceUnitInQtyAndWtTabOfPoLine(insertonOrderId, opu);
            updateConditionTableOnOPUChange(opu);
        }
    });

    // Populate UOM for this PO Line on click
    var uomModalTable = null;
    $("#material_headerClass").on("keypress", ".prUom", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            console.log("prUom click");
            prLineTableCurrentRow = $(this).parent().parent();
            var CompanyCode = $("#companycodeHeader").val();
            var matCode = $(this).parent().parent().find("td").eq(0).children(".prMaterialCodeHidden").val();
            console.log("CompanyCode: " + CompanyCode);
            console.log("matCode: " + matCode);
            if (matCode !== "" && CompanyCode !== "")
            {
                $("#overlay").css("display", "block");
                setTimeout(function() {
                    var jsonArr = getMaterialMasterOnLoad(matCode, CompanyCode);
                    console.log("jsonArr len: " + jsonArr.length);
                    if (jsonArr.length > 0)
                    {
                        $("#uomModalTable tbody tr").remove();
                        console.log("%cRecord found for " + matCode + " in material master!", "color: green");
                        var orderUnit = jsonArr[0].orderUnit;
                        var baseUom = jsonArr[0].baseUOM;
                        console.log("orderUnit: " + orderUnit);
                        console.log("baseUom: " + baseUom);
                        var row = "";
                        if (orderUnit !== "")
                        {
                            if (baseUom !== orderUnit)
                            {
                                row += "<tr class='uomModalTableTr'><td>" + baseUom + "</td></tr>";
                                row += "<tr class='uomModalTableTr'><td>" + orderUnit + "</td></tr>";
                            }
                            else
                            {
                                row += "<tr class='uomModalTableTr'><td>" + baseUom + "</td></tr>";
                            }
                        }
                        console.log("row: " + row);

                        $("#uomModalTable tbody").append(row);

                        if ($.fn.DataTable.isDataTable('#uomModalTable')) {
                            uomModalTable.destroy();
                            uomModalTable = null;
                            $("#uomModalTable").children('tbody').html(row);
                            uomModalTable = $('table.uomModalTable').DataTable({
                                lengthChange: false,
                                orderCellsTop: true
                            });
                            uomModalTable.buttons().container()
                                    .appendTo('#uomModalTable_wrapper .col-md-6:eq(0)');
                        } else {
                            $('#uomModalTable thead tr').clone(true).appendTo('#uomModalTable thead');
                            $('#uomModalTable thead tr:eq(1) th').each(function(i) {
                                $('#uomModalTable thead tr:eq(0) th').addClass("table-header-color");
                                var title = $(this).text();
                                if (title === '') {
                                    $(this).html('');
                                } else {
                                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                                }
                                $('input', this).on('keyup change', function() {
                                    if (uomModalTable.column(i).search() !== this.value) {
                                        uomModalTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });
                            uomModalTable = $('table.uomModalTable').DataTable({
                                lengthChange: false,
                                orderCellsTop: true
                            });
                            uomModalTable.buttons().container()
                                    .appendTo('#uomModalTable_wrapper .col-md-6:eq(0)');
                        }
                        $("#uomModal").modal("show");
                    }
                    else
                    {
                        console.log("%cRecord not found for " + matCode + " in material master!", "color: red");
                    }
                    $("#overlay").css("display", "none");
                }, 1000);
            }
        }
    });

    // Set and Update UOM on UI and DB
    $("#uomModalTable").on("click", ".uomModalTableTr", function() {
        $("#overlay").css("display", "block");
        console.log("uomModalTableTr click!");
        var PoFrom = $("#PoFrom").val();

        var uom = $(this).text();
        console.log("uom: " + uom);

        prLineTableCurrentRow.find("td").eq(7).children(".prUom").val(uom);
        $("#uomModal").modal("hide");

        setTimeout(function() {
            var orderUnit2 = "";
            var pOUnit = "";
            var unitOrderUnit = "";
            var unitOrderPriceUnit = "";
            var unitOrderUnit2 = "";
            var netWeightOrderUnit = "";
            var grossWeightOrderUnit = "";
            var volumeOrderUnit = "";
            var pointsOrderUnit = "";
            var netWeight = "";
            var grossWeight = "";

            var jsonArr = "";
            var convFrom = "";
            var convTo = "";
            var baseUOM = "";
            var infoRecordJsonObj = "";

            var CompanyCode = prLineTableCurrentRow.find("td").eq(0).children(".PRCompanyCode_Class").val();
            var matCode = prLineTableCurrentRow.find("td").eq(4).children(".materialCodeClass").val();
            if (matCode !== "") {
                infoRecordJsonObj = fetchInfoRecordDetails(matCode, "PR");
                console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));

                jsonArr = getMaterialMasterOnLoad(matCode, CompanyCode);
                console.log("getMaterialMasterOnLoad jsonArr.length: " + jsonArr.length);

                if (jsonArr.length !== 0) {
                    convFrom = jsonArr[0].conversionFrom;
                    convTo = jsonArr[0].conversionTo;
                    baseUOM = jsonArr[0].baseUOM;

                    console.log("%cconvFrom 1: " + convFrom, "color: green");
                    console.log("%cconvTo 1: " + convTo, "color: green");
                    console.log("%cbaseUOM: " + baseUOM, "color: green");

                    if (Number(infoRecordJsonObj.mainCode) === 0) {
                        if (infoRecordJsonObj.CONV_NUM1 !== "") {
                            convFrom = infoRecordJsonObj.CONV_NUM1;
                        }
                        if (infoRecordJsonObj.CONV_DEN1 !== "") {
                            convTo = infoRecordJsonObj.CONV_DEN1;
                        }
                        if (infoRecordJsonObj.ORDERPR_UN !== "") {
                            unitOrderPriceUnit = infoRecordJsonObj.ORDERPR_UN;
                        } else {
                            unitOrderPriceUnit = uom;
                        }
                    }

                    console.log("%cconvFrom 2: " + convFrom, "color: green");
                    console.log("%cconvTo 2: " + convTo, "color: green");

                    if (uom !== baseUOM) {
                        orderUnit2 = convTo;
                    } else if (uom === baseUOM) {
                        orderUnit2 = convFrom;
                    }

                    if (PoFrom !== "createpo" && PoFrom !== "byrfq") {
                        netWeight = convFrom;
                        grossWeight = convFrom;
                    }
                }
            }

            pOUnit = uom;
            unitOrderUnit = uom;
            unitOrderUnit2 = uom;
            if (PoFrom !== "createpo" && PoFrom !== "byrfq") {
                netWeightOrderUnit = uom;
                grossWeightOrderUnit = uom;
                volumeOrderUnit = uom;
                pointsOrderUnit = uom;
            }

            var ItemNumberSelect = $("#ItemNumberSelect").val();
            var insertonOrderId = prLineTableCurrentRow.find("td").eq(0).children(".insertionOrderId_Class").val();
            if (ItemNumberSelect === insertonOrderId)
            {
                /**************************Update QtyWgts tab on UI*************************/
                $("#orderUnit2").val(orderUnit2 !== "" ? formatAmountByComma(orderUnit2) : "");
                $("#pOUnit").val(pOUnit);
                $("#unitOrderUnit").val(unitOrderUnit);
                $("#unitOrderPriceUnit").val(unitOrderPriceUnit);
                $("#unitOrderUnit2").val(unitOrderUnit2);
                if (PoFrom !== "createpo" && PoFrom !== "byrfq") {
                    $("#netWeight").val(netWeight !== "" ? formatAmountByComma(netWeight) : "");
                    $("#grossWeight").val(grossWeight !== "" ? formatAmountByComma(grossWeight) : "");
                    $("#netWeightOrderUnit").val(netWeightOrderUnit);
                    $("#grossWeightOrderUnit").val(grossWeightOrderUnit);
                    $("#volumeOrderUnit").val(volumeOrderUnit);
                    $("#pointsOrderUnit").val(pointsOrderUnit);
                }

                /**************************Update Condition Tab on UI*************************/
                /* Starts from here... */
//                if (PoFrom !== "createpo" && PoFrom !== "byrfq") {
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    $(this).find("td").eq(13).children(".numeratorLineLevel").val(convTo);
                    $(this).find("td").eq(14).children(".baseUoMLineLevel").val(uom);
                    $(this).find("td").eq(15).children(".denoForConvLineLevel").val(convFrom);
                });
                saveConditionTabDataOnLoadFieldChange();
//                }
            }

            /**************************Update QtyWgts tab in DB*************************/

            console.log("%corderUnit2: " + orderUnit2, "color: blue");
            console.log("%cpOUnit: " + pOUnit, "color: blue");
            console.log("%cunitOrderUnit: " + unitOrderUnit, "color: blue");
            console.log("%cunitOrderPriceUnit: " + unitOrderPriceUnit, "color: blue");
            console.log("%cunitOrderUnit2: " + unitOrderUnit2, "color: blue");
            console.log("%cnetWeightOrderUnit: " + netWeightOrderUnit, "color: blue");
            console.log("%cgrossWeightOrderUnit: " + grossWeightOrderUnit, "color: blue");
            console.log("%cvolumeOrderUnit: " + volumeOrderUnit, "color: blue");
            console.log("%cpointsOrderUnit: " + pointsOrderUnit, "color: blue");

            var QuantityWeightJsonObject = {};
            QuantityWeightJsonObject["InsertionOrderId"] = insertonOrderId;
            QuantityWeightJsonObject["POQuantityUnit"] = pOUnit;
            QuantityWeightJsonObject["OrderUnit1_Unit"] = unitOrderUnit;
            QuantityWeightJsonObject["OrderPriceUnit_Unit"] = unitOrderPriceUnit;
            QuantityWeightJsonObject["OrderUnit2"] = orderUnit2;
            QuantityWeightJsonObject["OrderUnit2_Unit"] = unitOrderUnit2;
            QuantityWeightJsonObject["NetWeightOrderUnit"] = netWeightOrderUnit;
            QuantityWeightJsonObject["GrossWeightOrderUnit"] = grossWeightOrderUnit;
            QuantityWeightJsonObject["VolumeOrderUnit"] = volumeOrderUnit;
            QuantityWeightJsonObject["PointsOrderUnit"] = pointsOrderUnit;
            QuantityWeightJsonObject["NetWeight"] = netWeight;
            QuantityWeightJsonObject["GrossWeight"] = grossWeight;

            var QuantityWeightAsJsonString = JSON.stringify(QuantityWeightJsonObject);
            console.log("QuantityWeightAsJsonString: " + QuantityWeightAsJsonString);
            updateQuantityWeightsOnUomChange(QuantityWeightAsJsonString);

            /**************************Update Condition Tab in DB*************************/
            /* Starts from here... */

            $("#overlay").css("display", "none");
        }, 1000);
    });

    $("#invoiceTaxes").click(function() {
        var item = "";
        var materialcode = '';
        var netValue = "";
        var currency = "";
        var per = 0;
//        $("#taxButtonModal").modal("show");
        var insertionid = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var currentRow = $(this);
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                item = $(this).find("td").eq(1).text();
                materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                netValue = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
                per = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
                currency = $(this).find("td").eq(13).children(".currencyClass").val();

                if (netValue !== "") {
                    $("#overlay").css("display", "block");
                    setTimeout(function() {
                        $("#taxButtonModal").modal("show");
                        var tax = taxFromTaxCode();

                        $("#itemTaxBtn").val(item.trim());
                        $("#materialTaxBtn").val(materialcode);
                        $("#netTaxBtn").val(Number(netValue).toFixed(2));
                        $("#netTaxBtn2").val(currency);
                        $("#taxTaxBtn").val((Number(tax) / Number(netValue)).toFixed(2));

                        $("#taxButtonTableId tbody tr").each(function() {
                            var condName = $(this).find("td").eq(1).children(".nameConditionsTaxBtn").val();
                            if (condName === "Calculated Cal" || condName === "Sub Total") {
                                $(this).find("td").eq(3).children(".currencyTaxBtn").val(currency);
                                $(this).find("td").eq(2).children(".amountTaxBtn").val(Number(netValue).toFixed(2));
                                $(this).find("td").eq(4).children(".perQuantityTaxBtn").val(Number(per).toFixed(2));
                            }
                            if (condName === "Input Text") {
                                $(this).find("td").eq(2).children(".amountTaxBtn").val(Number(tax).toFixed(2));
                                $(this).find("td").eq(7).children(".conditionValueTaxBtn").val((Number(tax) / Number(netValue)).toFixed(2));
                            }
                            if (condName !== "Input Text") {
                                $(this).find("td").eq(7).children(".conditionValueTaxBtn").val(Number(netValue).toFixed(2));
                            }
                            $(this).find("td").eq(8).children(".currency2TaxBtn").val(currency);
                        });
                        $("#overlay").css("display", "none");
                    }, 500);
                } else {
                    if (lobiboxNotifyAlert !== null) {
                        lobiboxNotifyAlert.remove();
                    }
                    var errorMsg = "Kindly enter netprice!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    currentRow.find("td").eq(12).children(".pr-net-price").focus();
//                    $("#taxButtonModal").modal("hide");
                }
            }
        });
    });

    $("#conditionTableIdLineLevel").on("keypress", ".CurrencyLineLevel", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            conditioncurrentpossition = $(this).parent().parent();
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getAllCurrencyService();
    //            $(".CurrencyDeliveryInvoiceCheckbox").prop("checked", false);
                $("#overlay").css("display", "none");
                $("#CurrencyDeliveryInvoiceModal_Service").modal("show");
                $("#ro_Currency").val("condition");
            }, 500);
        }
    });

    $("#conditionTableId").on("keypress", ".CurrencyHeader", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            conditioncurrentpossition = $(this).parent().parent();
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getAllCurrencyService();
    //            $(".CurrencyDeliveryInvoiceCheckbox").prop("checked", false);
                $("#overlay").css("display", "none");
                $("#CurrencyDeliveryInvoiceModal_Service").modal("show");
                $("#ro_Currency").val("headercondition");
            }, 500);
        }
    });

    $("#headerTextTabOption").change(function() {
        var value = $(this).val();
        $("#headerTextDiv").css("display", "none");
        $("#HeaderNoteDiv").css("display", "none");
        $("#PricingTypesdiv").css("display", "none");
        $("#DeadlinesDiv").css("display", "none");
        $("#TermsofDeliveryDiv").css("display", "none");
        $("#TermsofPaymentDiv").css("display", "none");
        $("#ShippingInstructionsDiv").css("display", "none");
        $("#VendorMemoGeneralDiv").css("display", "none");
        $("#VendorMemoSpecialDiv").css("display", "none");
        $("#poNotesToApproverDiv").css("display", "none");
        if (value === "headerText") {
            $("#headerTextDiv").css("display", "block");
        } else if (value === "headerNotes") {
            $("#HeaderNoteDiv").css("display", "block");
        } else if (value === "pricingTypes") {
            $("#PricingTypesdiv").css("display", "block");
        } else if (value === "deadlines") {
            $("#DeadlinesDiv").css("display", "block");
        } else if (value === "termsOfDelivery") {
            $("#TermsofDeliveryDiv").css("display", "block");
        } else if (value === "termsOfPayment") {
            $("#TermsofPaymentDiv").css("display", "block");
        } else if (value === "shippingInstruction") {
            $("#ShippingInstructionsDiv").css("display", "block");
        } else if (value === "vendorMemoGeneral") {
            $("#VendorMemoGeneralDiv").css("display", "block");
        } else if (value === "vendorMemoSpecial") {
            $("#VendorMemoSpecialDiv").css("display", "block");
        } else if (value === "pONoteToApprover") {
            $("#poNotesToApproverDiv").css("display", "block");
        }
    });
    $("#textTabOptionLineLevel").change(function() {
        var value = $(this).val();
        $("#ItemTextDiv").css("display", "none");
        $("#InfoRecordPOTextDiv").css("display", "none");
        $("#MaterialPOTextDiv").css("display", "none");
        $("#PONoteToApproverDiv").css("display", "none");
        $("#DeliveryTextDiv").css("display", "none");
        $("#prNoteToApprovalDiv").css("display", "none");

        if (value === "itemText") {
            $("#ItemTextDiv").css("display", "block");
        } else if (value === "infoRecordPoText") {
            $("#InfoRecordPOTextDiv").css("display", "block");
        } else if (value === "materialPoText") {
            $("#MaterialPOTextDiv").css("display", "block");
        } else if (value === "pONoteToApprover") {
            $("#PONoteToApproverDiv").css("display", "block");
        } else if (value === "DeliveryText") {
            $("#DeliveryTextDiv").css("display", "block");
        } else if (value === "prNoteToApproval") {
            $("#prNoteToApprovalDiv").css("display", "block");
        }
    });

    $("#replicateMainAccAssBtn").click(function() {
        replicateMainAccAssToPOLineHavingSameCategory();
    });

    $("#replicateServiceAccAssBtn").click(function() {
        replicateServiceAccAss();
    });

    //-------------------------------------------------------Vendor Master Picklist Starts------------------------------------------------------------//
    // Open vendor master picklist
    $("#vendorcodeHeader").keypress(function(e) {
        console.log("e.keyCode: " + e.keyCode);
        if (e.keyCode === 13)
        {
            var companyCode = $("#companycodeHeader").val();
            console.log("companyCode: " + companyCode);
            if (companyCode === "")
            {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                var errorMsg = "Company code can not be blank!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
            }
            else
            {
                $("#overlay").css("display", "block");
                $("#vendorMasterModal").modal("hide");
                setTimeout(function() {
                    findVendorsFromVendorMasterByCompanyCodeAndPagination();
                    $("#overlay").css("display", "none");
                    $("#vendorMasterModal").modal("show");
                }, 1000);
            }
        }
    });

    // Vendor Picklist Clear Btn
    $("#clearSearchVendorMasterBtn").click(function() {
        $("#vendorCodeOrName_SearchText").val("");
        $("#lastVMSno").val("1");
    });

    // Vendor Picklist Record Count Dropdown
    $("#vendorMasterRecordCount").change(function() {
        $("#lastVMSno").val("1");
    });

    // Vendor Picklist Search Btn
    $("#searchVendorMasterBtn").click(function() {
        $("#lastVMSno").val("1");
        $("#overlay").css("display", "block");
        $("#vendorMasterModal").modal("hide");
        setTimeout(function() {
            findVendorsFromVendorMasterByCompanyCodeAndPagination();
            $("#overlay").css("display", "none");
            $("#vendorMasterModal").modal("show");
        }, 1000);
    });

    // Vendor Picklist Next Btn
    $("#searchVendorMasterNextBtn").click(function() {
        $("#overlay").css("display", "block");
        $("#vendorMasterModal").modal("hide");

        var nextPageNo = Number($("#lastVMSno").val()) + 1;
        $("#lastVMSno").val(nextPageNo);

        setTimeout(function() {
            findVendorsFromVendorMasterByCompanyCodeAndPagination();
            $("#overlay").css("display", "none");
            $("#vendorMasterModal").modal("show");
        }, 1000);

        $("#searchVendorMasterPrevBtn").prop("disabled", false);
    });

    // Vendor Picklist Prev Btn
    $("#searchVendorMasterPrevBtn").click(function() {
        var prevPageNo = Number($("#lastVMSno").val()) - 1;
        $("#lastVMSno").val(prevPageNo);

        $("#overlay").css("display", "block");
        $("#vendorMasterModal").modal("hide");
        setTimeout(function() {
            findVendorsFromVendorMasterByCompanyCodeAndPagination();
            $("#overlay").css("display", "none");
            $("#vendorMasterModal").modal("show");
        }, 1000);

        if (Number(prevPageNo) === 1)
            $("#searchVendorMasterPrevBtn").prop("disabled", true);
        else
            $("#searchVendorMasterPrevBtn").prop("disabled", false);
    });
    //-------------------------------------------------------Vendor Master Picklist Ends--------------------------------------------------------------//
});

var deptMasterTable = null;
function getDepartmentMaster(companyCode) {
    $("#overlay").css("display", "block");
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "getTrackingNumberByCompanyCode",
            "companyCode": companyCode
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            console.log("Obj length :" + jsonArr.length);
            var row = "";
            $("#poDepartmentMasterTable tbody tr").remove();
            for (var i = 0; i < jsonArr.length; i++) {
                row += "<tr class='poDepartmentMasterTrClass'>"
                        + "<td>" + jsonArr[i].departmentCode + "</td>"
                        + "<td>" + jsonArr[i].departmentDesc + "</td>"
                        + "</tr>";
            }
            $("#poDepartmentMasterTable tbody").append(row);

            if ($.fn.DataTable.isDataTable('#poDepartmentMasterTable')) {
                deptMasterTable.destroy();
                deptMasterTable = null;
                $("#poDepartmentMasterTable").children('tbody').html(row);
                deptMasterTable = $('table.poDepartmentMasterTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                deptMasterTable.buttons().container()
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
                        if (deptMasterTable.column(i).search() !== this.value) {
                            deptMasterTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                deptMasterTable = $('table.poDepartmentMasterTable').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                deptMasterTable.buttons().container()
                        .appendTo('#poDepartmentMasterTable_wrapper .col-md-6:eq(0)');
            }
            $("#overlay").css("display", "none");
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

function addRowInLineLevelCondition(possition, conditionAmountJsonArray) {
    var oldAmount = possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val();
    var oldPercentage = possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeaderHidden").val();
    var amountHeaderHidden = possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val();
    var cndType = possition.parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();

    console.log("conditionAmountJsonArray bittu :" + JSON.stringify(conditionAmountJsonArray));
    var indexnumber = possition.parent().parent().find("td").eq(0).children(".conditionindex").val();
    var conditiontype = possition.parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
    var flag = false;
//        conditionLineLevelArray.forEach(function(e) {
    for (var p = 0; p < conditionLineLevelArray.length; p++) {
        if (conditiontype === conditionLineLevelArray[p].Ctype && indexnumber === conditionLineLevelArray[p].indexnumber) {
            if (possition.parent().parent().find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                amount = removeCommaInNumber(possition.parent().parent().find("td").eq(3).children(".AmountHeader").val());
            } else if (possition.parent().parent().find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                amount = removeCommaInNumber(possition.parent().parent().find("td").eq(3).children(".newAmountHeader").val());
            }
            if (possition.parent().parent().find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
                perQuant = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".PerQuantityHeader").val());
            } else if (possition.parent().parent().find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
                perQuant = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val());
            }
            conditionLineLevelArray[p].amount = (Number(amount)).toString();
            conditionLineLevelArray[p].per = (Number(perQuant)).toString();
            conditionLineLevelArray[p].oldAmountHidden = (possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val()).toString();
            conditionLineLevelArray[p].oldPerHidden = Number(removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val())).toString();
//            conditionLineLevelArray[p].oldConditionValue = conditionLineLevelArray[p].oldConditionValue;
            var abort = false;
            for (var k = 0; k < conditionAmountJsonArray.length && !abort; k++) {
                if (conditionLineLevelArray[p].itemCode === conditionAmountJsonArray[k].itemCode) {
                    conditionLineLevelArray[p].conditionValue = (Number(conditionAmountJsonArray[k].condValue)).toString();
//                    conditionLineLevelArray[p].oldConditionValue = (Number(possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val())).toString();
                    abort = true;
                }
            }
            flag = true;
        }
    }

//     if (flag === false) {
    conditionLineLevelArrayTemp = [];
    var itemCode = $("#ItemNumberSelect").val();
    var poCurrency = $("#CurrencyDeliveryInvoice").val();
    var prCurrency;
    var linkid;
    var InsertionOrderId = "";
    var prCount = $("#material_headerClass tbody tr").length;
    var perQuant = 0;
    var amount = 0;
    $("#material_headerClass tbody tr").each(function() {
        var perHidden = "";
        conditionLineLevelObject = {};
        prCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
        linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
        InsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
//        if (conditionLineLevelArray.length === 0) {
        conditionLineLevelObject["vendorcode"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderVendorCode").val();
        conditionLineLevelObject["vendorname"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderVendorName").val();
        conditionLineLevelObject["conditionVendor"] = possition.parent().parent().find("td").eq(0).children(".conditionVendorHeader").val();
        conditionLineLevelObject["itemCode"] = InsertionOrderId;
        conditionLineLevelObject["conditionKAPPL"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderKAPPL").val();
        conditionLineLevelObject["conditionKVSL1"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderKVSL1").val();
        conditionLineLevelObject["conditionKVSL2"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderKVSL2").val();
        conditionLineLevelObject["conditionZAEHK"] = (possition.parent().parent().find("td").eq(11).children(".conditionHeaderZAEHK").val()).toString();
        conditionLineLevelObject["conditionSTUNR"] = (possition.parent().parent().find("td").eq(11).children(".conditionHeaderSTUNR").val()).toString();
        conditionLineLevelObject["Ctype"] = possition.parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        conditionLineLevelObject["Cname"] = possition.parent().parent().find("td").eq(2).children(".nameConditionsHeader").val();
        conditionLineLevelObject["prCurrency"] = possition.parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
        conditionLineLevelObject["Currency2"] = "SGD";
        conditionLineLevelObject["ConditionValue2"] = "0.00";
        conditionLineLevelObject["ConditionPricingUnit"] = possition.parent().parent().find("td").eq(6).children(".ConditionPricingUnitHeader").val();
        conditionLineLevelObject["UoM"] = possition.parent().parent().find("td").eq(7).children(".UoMHeader").val();
        conditionLineLevelObject["oldAmountHidden"] = possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val();
        if (possition.parent().parent().find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
            perHidden = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".PerQuantityHeader").val());
        } else if (possition.parent().parent().find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
            perHidden = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val());
        }
//        conditionLineLevelObject["oldPerHidden"] = possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val();
        conditionLineLevelObject["oldPerHidden"] = possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeaderHidden").val();
        conditionLineLevelObject["oldConditionValue"] = possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val();
//        conditionLineLevelObject["CondCurncyExchangeRate"] = exchangeRate1;
//        conditionLineLevelObject["POCurrencyExchangeRate"] = exchangeRate2;
        //        conditionLineLevelObject["conditionpricingdate"] = "";
        conditionLineLevelObject["CHANGEID"] = "I";
        conditionLineLevelObject["Conditioncurrency"] = "";
        conditionLineLevelObject["linkid"] = linkid.trim();
        //        conditionLineLevelObject["pRItemNumber"] = pRItemNumber;
        conditionLineLevelObject["poCurrency"] = poCurrency;
        if (possition.parent().parent().find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
            amount = removeCommaInNumber(possition.parent().parent().find("td").eq(3).children(".AmountHeader").val());
        } else if (possition.parent().parent().find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
            amount = removeCommaInNumber(possition.parent().parent().find("td").eq(3).children(".newAmountHeader").val());
        }
        conditionLineLevelObject["amount"] = (Number(amount)).toString();
        if (possition.parent().parent().find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
            perQuant = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".PerQuantityHeader").val());
        } else if (possition.parent().parent().find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
            perQuant = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val());
        }
        conditionLineLevelObject["per"] = (Number(perQuant)).toString();
        conditionLineLevelObject["addedFrom"] = "headerlevel";
        conditionLineLevelObject["indexnumber"] = possition.parent().parent().find("td").eq(0).children(".conditionindex").val();
        var abort = false;
        for (var k = 0; k < conditionAmountJsonArray.length && !abort; k++) {
            if (InsertionOrderId === conditionAmountJsonArray[k].itemCode) {
                conditionLineLevelObject["conditionValue"] = (Number(conditionAmountJsonArray[k].condValue)).toString();
                abort = true;
            }
        }
        if (flag === false) {
            conditionLineLevelArray.push(conditionLineLevelObject);
        }
        conditionLineLevelArrayTemp.push(conditionLineLevelObject);
    });

    deleteRowFormCondition("");
//    }
    var prlinkid;
    var uom;
    var materialcode = "";
    var opu = "";
    var insertionid = $("#ItemNumberSelect").val();
    var InsertionOrderId = "";
    var isPoLineOrPrLineOrRfqLineOrEmptyLine = "";
    $("#material_headerClass tbody tr").each(function() {
        var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (insertionid === itemDropdownId) {
            prlinkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            uom = $(this).find("td").eq(7).children(".prUom").val();
            materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            opu = $(this).find("td").eq(8).children(".prOrderPriceUnit").val();
            InsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
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
        convTo = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? convTo : infoRecordJsonObj.CONV_NUM1;
        convFrom = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? convFrom : infoRecordJsonObj.CONV_DEN1;
        console.log("convTo: " + convTo + " ,convFrom: " + convFrom);
    }

    console.log("prlinkid :" + prlinkid);
    console.log("conditionLineLevelArray :" + JSON.stringify(conditionLineLevelArray));
    console.log("conditionLineLevelArray Temp:" + JSON.stringify(conditionLineLevelArrayTemp));
    var length = $("#conditionTableIdLineLevel tbody tr").length;

    var prCount = $("#material_headerClass tbody tr").length;
    var condType;
    var amount;
    var per;
    var condValue;
    var changeId = "";
//    var totalamount = 0;

    conditionLineLevelArrayTemp.forEach(function(e) {
        console.log("Ctype :" + e.Ctype);
        var rows = $("#conditionTableIdLineLevel tbody tr");
        if (InsertionOrderId === e.itemCode) {
            var count = 1;
            for (var j = 0; j < rows.length; j++) {
                if ($(rows[j]).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                    condType = $(rows[j]).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                    changeId = $(rows[j]).find("td").eq(17).children(".conditionChangeId").val();
                } else if ($(rows[j]).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                    condType = $(rows[j]).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                    changeId = $(rows[j]).find("td").eq(17).children(".conditionChangeId").val();
                }
                var addedFrom = $(rows[j]).find("td").eq(0).children(".lineAddedFromLineLevel").val();
                if (condType === e.Ctype && changeId === "I" && addedFrom === "headerlevel") {
                    console.log("condType in IF [" + j + "]:" + condType + " ,Ctype :" + e.Ctype + " ,changeId :" + changeId);
                    if ($(rows[j]).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                        amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountLineLevel").val());
                        per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityLineLavel").val());
                        condValue = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val());
                        $(rows[j]).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number((Number(amount) + Number(e.amount))).toFixed(2)));
                        $(rows[j]).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(Number(Number(per) + Number(e.per))).toFixed(2)));
                        $(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(Number(Number(condValue) + Number(e.conditionValue))).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                        amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".newAmountLineLevel").val());
                        per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".newPerQuantityLineLavel").val());
                        condValue = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val());
                        var totalamount = calculatetotalamount(condType, InsertionOrderId);
                        var totalper = calculatetotaper(condType, InsertionOrderId);
                        if (Number(totalamount) !== Number(amount) || Number(totalper) !== per) {
                            $(rows[j]).find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma(Number((Number(amount) + Number(e.amount) - Number(e.oldAmountHidden))).toFixed(2)));
                            $(rows[j]).find("td").eq(5).children(".newPerQuantityLineLavel").val(formatAmountByComma(Number(Number(Number(per) + Number(e.per) - Number(e.oldPerHidden))).toFixed(2)));
                            $(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(Number(Number(condValue) + Number(e.conditionValue) - Number(e.oldConditionValue))).toFixed(2)));
                        }
                    }
                    break;
                } else if (condType !== e.Ctype || (condType === e.Ctype && addedFrom !== "headerlevel")) {
                    if (length === count) {
                        var row = "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor' value='" + e.vendorcode + "'><input type='hidden' class='lineAddedFromLineLevel' value='headerlevel'></td>"
                                + "<td><input type='text' class='form-control form-rounded newConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' disabled value='" + e.Ctype + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded NameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' disabled value='" + e.Cname + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded newAmountLineLevel tableInputField' name='AmountLineLevel' style='width:150px;' disabled value='" + formatAmountByComma(Number(e.amount).toFixed(2)) + "'><input type='hidden' class='AmountLineLevelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' disabled value=" + e.prCurrency + "></td>"
                                + "<td><input type='text' class='form-control form-rounded newPerQuantityLineLavel tableInputField' name='PerQuantityLineLavel' style='width:150px;' disabled value='" + formatAmountByComma(Number(e.per).toFixed(2)) + "'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' disabled value=" + e.ConditionPricingUnit + "></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' disabled value=" + e.UoM + " disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;' disabled value='" + formatAmountByComma(Number(e.conditionValue).toFixed(2)) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' disabled value='" + e.Currency2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' name = 'ConditionValue2LineLevel' disabled value='" + e.ConditionValue2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled value='" + e.Conditioncurrency + "'></td>"
                                + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel'></td>"
                                + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' name='numeratorLineLevel' min='0' disabled style='width:100px;' value='" + convTo + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' name='baseUoMLineLevel' style='width:100px;' disabled value='" + uom + "'></td>"
                                + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' name='denoForConvLineLevel' disabled style='width:100px;' min='0' value='" + convFrom + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' name='uOMExtraLineLevel' disabled style='width:100px;' value='" + opu + "'></td>"
                                + "<td><input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + e.conditionKAPPL + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + e.conditionKVSL1 + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + e.conditionKVSL2 + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + e.conditionZAEHK + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + e.conditionSTUNR + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='" + e.CHANGEID + "'>\n\
                                <i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRowLineLevel' aria-hidden='true' style='width:30px;display: none;'></i></td>"
                                + "</tr>";
                        $("#conditionTableIdLineLevel tbody").append(row);
                    }
                }
                count++;
            }
            var conditionTypeLine = "";
            var oldAmountLine = "";
            var oldPerLine = "";
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                    conditionTypeLine = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                    conditionTypeLine = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                }
                if (conditionTypeLine === e.Ctype) {
                    oldAmountLine = $(this).find("td").eq(3).children(".AmountLineLevelHidden").val();
                    oldPerLine = $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val();
                }
            });
            var amount = e.amount;
            var per = e.per;
            var conType = e.Ctype;
//            var oldAmount = "";
//            var oldPercentage = "";

            calculateConditionValue(amount, conType, per, oldAmountLine, oldPerLine);
            var conditionType;
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                    conditionType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                    conditionType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                }
                if (conType === conditionType) {
                    $(this).find("td").eq(3).children(".AmountLineLevelHidden").val(amount);
                    $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val(per);
                }
            });
//            calculateConditionValueHeader(Number(amount) * Number(prCount), conType, Number(per) * Number(prCount), oldAmount, oldPercentage);
            deleteRowFormConditionHeader();
            possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val(amount);
            possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeaderHidden").val(per);
        }
    });
    /***************************For saving the data to database when adding condition to header*******************************/
    var LinkID;
    var PrCurrency;
    var Itemcode;
    var itemCodeArray = [];
    var linkidArray = [];
    var PrCurrencyArray = [];
    $("#material_headerClass tbody tr").each(function() {
        var isPrSaved = $(this).find("td").eq(0).children(".isPrSaved").val();
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

    for (var p = 0; p < conditionLineLevelArray.length; p++) {
        if (conditiontype === conditionLineLevelArray[p].Ctype && indexnumber === conditionLineLevelArray[p].indexnumber) {
            var abort = false;
            conditionLineLevelArray[p].oldAmountHidden = Number(possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val()).toString();
            conditionLineLevelArray[p].oldPerHidden = Number(removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val())).toString();
            for (var k = 0; k < conditionAmountJsonArray.length && !abort; k++) {
                if (conditionLineLevelArray[p].itemCode === conditionAmountJsonArray[k].itemCode) {
                    conditionLineLevelArray[p].oldConditionValue = (Number(conditionAmountJsonArray[k].condValue)).toString();
                    abort = true;
                }
            }
            flag = true;
        }
    }
    console.log("conditionLineLevelArray after update :" + JSON.stringify(conditionLineLevelArray));
}
function addTOLineConditionOnItemChange() {
    var condType;
    var amount;
    var condValue;
    var per;
    var prlinkid;
    var insertionid = $("#ItemNumberSelect").val();
    var prCount = $("#material_headerClass tbody tr").length;
    var InsertionOrderId = "";
    $("#material_headerClass tbody tr").each(function() {
        var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (insertionid === itemDropdownId) {
            prlinkid = $(this).find("td").eq(0).children(".linkId_Class").val();
            InsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        }
    });
    console.log("prlinkid :" + prlinkid);
    console.log("conditionLineLevelArray :" + JSON.stringify(conditionLineLevelArray));
    conditionLineLevelArray.forEach(function(e) {
        var count = 1;
        var length = $("#conditionTableIdLineLevel tbody tr").length;
        var rows = $("#conditionTableIdLineLevel tbody tr");
        console.log("rows length ;" + rows.length);
        console.log("Clength :" + length);
        console.log("Ctype :" + e.Ctype);
        if (InsertionOrderId === e.itemCode) {
            console.log("prlinkid :" + prlinkid + "eprlinkid :" + e.linkid);
            for (var j = 0; j < rows.length; j++) {
                if ($(rows[j]).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                    condType = $(rows[j]).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                } else if ($(rows[j]).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                    condType = $(rows[j]).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                }
                var changeId = $(rows[j]).find("td").eq(17).children(".conditionChangeId").val();
                console.log("condType :[" + j + "]" + condType + " ,Ctype :" + e.Ctype);
                console.log("length :[" + j + "]" + length + " ,count :" + count);
                if (condType === e.Ctype && changeId === "I") {
                    console.log("condType in IF [" + j + "]:" + condType + " ,Ctype :" + e.Ctype);
                    if ($(rows[j]).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                        amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".AmountLineLevel").val());
                        per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".PerQuantityLineLavel").val());
                        condValue = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val());
                        $(rows[j]).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number((Number(amount) + Number(e.amount))).toFixed(2)));
                        $(rows[j]).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(Number(Number(per) + Number(e.per))).toFixed(2)));
                        $(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(Number(Number(condValue) + Number(e.conditionValue))).toFixed(2)));
                    } else if ($(rows[j]).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                        amount = removeCommaInNumber($(rows[j]).find("td").eq(3).children(".newAmountLineLevel").val());
                        per = removeCommaInNumber($(rows[j]).find("td").eq(5).children(".newPerQuantityLineLavel").val());
                        condValue = removeCommaInNumber($(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val());
                        var totalamount = calculatetotalamount(condType, InsertionOrderId);
                        var totalper = calculatetotaper(condType, InsertionOrderId);
//                        alert("totalamount :" + totalamount + " ,totalper :" + totalper);
                        if (Number(totalamount) !== Number(amount) || Number(totalper) !== per) {
                            console.log("amount on itemchange :" + amount + " ,e.amount :" + e.amount + " ,e.oldAmountHidden :" + e.oldAmountHidden);
                            console.log("per on itemchange :" + per + " ,e.per :" + e.per + " ,e.oldPerHidden :" + e.oldPerHidden);
                            console.log("condValue on itemchange :" + condValue + " ,e.conditionValue :" + e.conditionValue + " ,e.oldConditionValue :" + e.oldConditionValue);
                            $(rows[j]).find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma(Number((Number(amount) + Number(e.amount))).toFixed(2)));
                            $(rows[j]).find("td").eq(5).children(".newPerQuantityLineLavel").val(formatAmountByComma(Number(Number(per) + Number(e.per)).toFixed(2)));
                            $(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(Number(condValue) + Number(e.conditionValue)).toFixed(2)));
                        }
                    }
                    break;
                } else if (condType !== e.Ctype) {
                    if (length === count) {
                        console.log("condType in else[" + j + "]:" + condType + " ,Ctype :" + e.Ctype);
                        var row = "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor' value='" + e.vendorcode + "'><input type='hidden' class='lineAddedFromLineLevel' value='headerlevel'></td>"
                                + "<td><input type='text' class='form-control form-rounded newConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' disabled value='" + e.Ctype + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded NameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' disabled value='" + e.Cname + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded newAmountLineLevel tableInputField' name='AmountLineLevel' style='width:150px;' disabled value='" + formatAmountByComma(Number(e.amount).toFixed(2)) + "'><input type='hidden' class='AmountLineLevelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' disabled style='width:100px;' value=" + e.prCurrency + "></td>"
                                + "<td><input type='text' class='form-control form-rounded newPerQuantityLineLavel tableInputField' name='PerQuantityLineLavel' style='width:150px;' disabled value='" + formatAmountByComma(Number(e.per).toFixed(2)) + "'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' disabled value=" + e.ConditionPricingUnit + "></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' style='width:100px;' disabled value=" + e.UoM + "></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;' disabled value='" + formatAmountByComma(Number(e.conditionValue).toFixed(2)) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' style='width:100px;' disabled value='" + e.Currency2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' name = 'ConditionValue2LineLevel' disabled value='" + e.ConditionValue2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled value='" + e.Conditioncurrency + "'></td>"
                                + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel'></td>"
                                + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' name='numeratorLineLevel' disabled min='0' style='width:100px;'></td>"
                                + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' name='baseUoMLineLevel' style='width:100px;' disabled></td>"
                                + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' name='denoForConvLineLevel' min='0' disabled style='width:100px;'></td>"
                                + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' name='uOMExtraLineLevel' style='width:100px;' disabled></td>"
                                + "<td><input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + e.conditionKAPPL + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + e.conditionKVSL1 + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + e.conditionKVSL2 + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + e.conditionZAEHK + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + e.conditionSTUNR + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='" + e.CHANGEID + "'>\n\
                                <i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRowLineLevel' aria-hidden='true' style='width:30px;display: none'></i></td>"
                                + "</tr>";
                        $("#conditionTableIdLineLevel tbody").append(row);
                    }
                }
                count++;
            }
            var amount = e.amount;
            var per = e.per;
            var conType = e.Ctype;
            var oldAmount = "";
            var oldPercentage = "";
            var conditionType;
            calculateConditionValue(amount, conType, per, oldAmount, oldPercentage);
//            deleteRowFormCondition();
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                    conditionType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                    conditionType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                }
                if (conType === conditionType) {
                    $(this).find("td").eq(3).children(".AmountLineLevelHidden").val(amount);
                    $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val(per);
                }
            });
        }
    });
}

function calculateConditionValueHeader(conAmount, conType, perQty, oldAmount, oldPercentage) {

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
    $("#conditionTableId tbody tr").each(function(i) {
        var condtype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
        if (condtype === 'PBXX') {
            PBXX = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (PBXX === "" || isNaN(PBXX)) {
                PBXX = 0;
            }
        }
        if (condtype === 'FRA1') {
            FRA1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (FRA1 === "" || isNaN(FRA1)) {
                FRA1 = 0;
            }
            console.log("FRA1 :" + FRA1);
        }
        if (condtype === 'FRB1') {
            FRB1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (FRB1 === "" || isNaN(FRB1)) {
                FRB1 = 0;
            }
            console.log("FRB1 :" + FRB1);
        }
        if (condtype === 'ZFR1') {
            ZFR1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZFR1 === "" || isNaN(ZFR1)) {
                ZFR1 = 0;
            }
            console.log("ZFR1 :" + ZFR1);
        }
        if (condtype === 'ZPAC') {
            ZPAC = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZPAC === "" || isNaN(ZPAC)) {
                ZPAC = 0;
            }
            console.log("ZPAC :" + ZPAC);
        }
        if (condtype === 'FRC1') {
            FRC1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (FRC1 === "" || isNaN(FRC1)) {
                FRC1 = 0;
            }
            console.log("FRC1 :" + FRC1);
        }
        if (condtype === 'ZCRQ') {
            ZCRQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCRQ === "" || isNaN(ZCRQ)) {
                ZCRQ = 0;
            }
            console.log("ZCRQ :" + ZCRQ);
        }
        if (condtype === 'ZCOV') {
            ZCOV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCOV === "" || isNaN(ZCOV)) {
                ZCOV = 0;
            }
            console.log("ZCOV :" + ZCOV);
        }
        if (condtype === 'ZIMP') {
            ZIMP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZIMP === "" || isNaN(ZIMP)) {
                ZIMP = 0;
            }
            console.log("ZIMP :" + ZIMP);
        }
        if (condtype === 'ZCOP') {
            ZCOP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCOP === "" || isNaN(ZCOP)) {
                ZCOP = 0;
            }
            console.log("ZCOP :" + ZCOP);
        }
        if (condtype === 'ZCOV') {
            ZBIN = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZBIN === "" || isNaN(ZBIN)) {
                ZBIN = 0;
            }
            console.log("ZBIN :" + ZBIN);
        }
        if (condtype === 'ZCOQ') {
            ZCOQ = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCOQ === "" || isNaN(ZCOQ)) {
                ZCOQ = 0;
            }
            console.log("ZCOQ :" + ZCOQ);
        }
        if (condtype === 'ZSEC') {
            ZSEC = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZSEC === "" || isNaN(ZSEC)) {
                ZSEC = 0;
            }
            console.log("ZSEC :" + ZSEC);
        }
        if (condtype === 'ZMIS') {
            ZMIS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZMIS === "" || isNaN(ZMIS)) {
                ZMIS = 0;
            }
            console.log("ZMIS :" + ZMIS);
        }
        if (condtype === 'ZINV') {
            ZINV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZINV === "" || isNaN(ZINV)) {
                ZINV = 0;
            }
            console.log("ZINV :" + ZINV);
        }
        if (condtype === 'ZMSQ') {
            ZMSQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZMSQ === "" || isNaN(ZMSQ)) {
                ZMSQ = 0;
            }
            console.log("ZMSQ :" + ZMSQ);
        }
        if (condtype === 'ZINP') {
            ZINP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZINP === "" || isNaN(ZINP)) {
                ZINP = 0;
            }
            console.log("ZINP :" + ZINP);
        }
        if (condtype === 'ZITQ') {
            ZITQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZITQ === "" || isNaN(ZITQ)) {
                ZITQ = 0;
            }
            console.log("ZITQ :" + ZITQ);
        }
        if (condtype === 'ZINQ') {
            ZINQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZINQ === "" || isNaN(ZINQ)) {
                ZINQ = 0;
            }
            console.log("ZINQ :" + ZINQ);
        }
        if (condtype === 'NAVS') {
            NAVS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (NAVS === "" || isNaN(NAVS)) {
                NAVS = 0;
            }
            console.log("NAVS :" + NAVS);
        }
        if (condtype === 'ZNAV') {
            ZNAV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZNAV === "" || isNaN(ZNAV)) {
                ZNAV = 0;
            }
            console.log("ZNAV :" + ZNAV);
        }
        if (condtype === 'NAVM') {
            NAVM = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
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
    //        alert(PriceInclofdiscSurcharge);     var conPerQty;
    var totalFreightArr = (expTotalFreight.toString()).split('+');
    for (var i = 0; i < totalFreightArr.length; i++) {
        if (totalFreightArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                var amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                var conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Total Freight") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    var expTotalFreightCommArr = (expTotalFreightComm.toString()).split('+');
    for (var i = 0; i < expTotalFreightCommArr.length; i++) {
        if (expTotalFreightCommArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Total Freight & commisioning") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }

    var expNetPriceArr = (expNetPrice.toString()).split('+');
    for (var i = 0; i < expNetPriceArr.length; i++) {
        if (expNetPriceArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Net Price") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }

                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }

//        var expGrossPriceInclDiscountArr = (expGrossPriceInclDiscount.toString()).split('+');
//        for (var i = 0; i < expGrossPriceInclDiscountArr.length; i++) {
//            if (expGrossPriceInclDiscountArr[i].trim() === conType.trim()) {
//                $("#conditionTableId tbody tr").each(function() {
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
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Cost & Freight(CFR)") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    var expTotalInsuranceArr = (expTotalInsurance.toString()).split('+');
    for (var i = 0; i < expTotalInsuranceArr.length; i++) {
        if (expTotalInsuranceArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Total Insurance") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    var expInsuranceFreightArr = (expInsuranceFreight.toString()).split('+');
    for (var i = 0; i < expInsuranceFreightArr.length; i++) {
        if (expInsuranceFreightArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Insurance and Freight") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    var expCostInsuranceFreightCIFArr = (expCostInsuranceFreightCIF.toString()).split('+');
    for (var i = 0; i < expCostInsuranceFreightCIFArr.length; i++) {
        if (expCostInsuranceFreightCIFArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Cost Insurance & Freight (CIF)") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    var expCIFWithGSTArr = (expCIFWithGST.toString()).split('+');
    for (var i = 0; i < expCIFWithGSTArr.length; i++) {
        if (expCIFWithGSTArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "CIF With GST") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    var expZBordercrossingvalueArr = (expZBordercrossingvalue.toString()).split('+');
    for (var i = 0; i < expZBordercrossingvalueArr.length; i++) {
        if (expZBordercrossingvalueArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "@3Z@Border crossing value") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    var expPriceInclofdiscSurchargeArr = (expPriceInclofdiscSurcharge.toString()).split('+');
    for (var i = 0; i < expPriceInclofdiscSurchargeArr.length; i++) {
        if (expPriceInclofdiscSurchargeArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                if (conName === "Price Incl of disc/Surcharge") {
                    if (isNaN(conPerQty)) {
                        conPerQty = 0;
                    }
                    if (perQty === undefined) {
                        perQty = 0;
                    }
                    if (oldAmount === undefined || oldAmount === "") {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma((Number(amount) + Number(conAmount)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(3).children("input[name=AmountHeader]").val(formatAmountByComma(((Number(amount) + Number(conAmount)).toFixed(2) - Number(oldAmount).toFixed(2)).toFixed(2)));
                    }
                    if (oldPercentage === undefined || oldPercentage === "") {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val((Number(perQty) + Number(conPerQty)).toFixed(2));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2));
                    }
                }
            });
        }
    }
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Total Freight") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(TotalFreightCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Total Freight & commisioning") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(TotalFreightCommCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Net Price") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(NetPriceCondValue).toFixed(2)));
        }
    });
//        $("#conditionTableId tbody tr").each(function() {
//            var conName = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
//            if (conName === "Gross Price Incl Discount") {
    //                $(this).find("td").eq(8).children(".ConditionValueLineLevel ").val(Number(GrossPriceInclDiscountCondValue).toFixed(2));
//            }
    //        });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Cost & Freight(CFR)") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(CostFreightCFRCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Total Insurance") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(TotalInsuranceCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Insurance and Freight") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(InsuranceFreightCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Cost Insurance & Freight (CIF)") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(CostInsuranceFreightCIFCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "CIF With GST") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(CIFWithGSTCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "@3Z@Border crossing value") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(ZBordercrossingvalueCondValue).toFixed(2)));
        }
    });
    $("#conditionTableId tbody tr").each(function() {
        var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (conName === "Price Incl of disc/Surcharge") {
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(PriceInclofdiscSurchargeCondValue).toFixed(2)));
        }
    });
}
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

function deleteRowFormCondition(reqFrom) {

    var TotalFreight = window.socket_TotalFreight;
    var TotalFreightComm = window.socket_TotalFreightComm;
    var NetPrice = window.socket_NetPrice;
    //    var GrossPriceInclDiscount = window.socket_GrossPriceInclDiscount;
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
    var expTotalFreight = new String(TotalFreight);
    //    var TotalFreightCondValue = eval(expTotalFreight.toString());
    var expTotalFreightComm = new String(TotalFreightComm);
    //    var TotalFreightCommCondValue = eval(expTotalFreightComm.toString());
    var expNetPrice = new String(NetPrice);
//    var NetPriceCondValue = eval(expNetPrice.toString());
//    var expGrossPriceInclDiscount = new String(GrossPriceInclDiscount);
//    var GrossPriceInclDiscountCondValue = eval(expGrossPriceInclDiscount.toString());


    var expCostFreightCFR = new String(CostFreightCFR);
    //    var CostFreightCFRCondValue = eval(expCostFreightCFR.toString());
    var expTotalInsurance = new String(TotalInsurance);
    //    var TotalInsuranceCondValue = eval(expTotalInsurance.toString());
    var expInsuranceFreight = new String(InsuranceFreight);
    //    var InsuranceFreightCondValue = eval(expInsuranceFreight.toString());
    var expCostInsuranceFreightCIF = new String(CostInsuranceFreightCIF);
    //    var CostInsuranceFreightCIFCondValue = eval(expCostInsuranceFreightCIF.toString());
    var expCIFWithGST = new String(CIFWithGST);
    //    var CIFWithGSTCondValue = eval(expCIFWithGST.toString());
    var expZBordercrossingvalue = new String(ZBordercrossingvalue);
    //    var ZBordercrossingvalueCondValue = eval(expZBordercrossingvalue.toString());
    var expPriceInclofdiscSurcharge = new String(PriceInclofdiscSurcharge);
    //    var PriceInclofdiscSurchargeCondValue = eval(expPriceInclofdiscSurcharge.toString());
    //        alert(PriceInclofdiscSurcharge);
    var conPerQty;
    var ctype = "";
    var conValue = 0;
    var totalAmount_totalFreight = 0;
    var totalPer_totalFreight = 0;
    var totalConVal_totalFreight = 0;
    var totalFreightArr = (expTotalFreight.toString()).split('+');
    for (var i = 0; i < totalFreightArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (totalFreightArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_totalFreight = Number(totalAmount_totalFreight) + Number(amount);
                totalPer_totalFreight = Number(totalPer_totalFreight) + Number(perQty);
                totalConVal_totalFreight = Number(totalConVal_totalFreight) + Number(conValue);
            }
        });
    }
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Total Freight") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_totalFreight).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_totalFreight).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_totalFreight).toFixed(2)));
        }
    });
    var totalAmount_totalFreightComm = 0;
    var totalPer_totalFreightComm = 0;
    var totalConVal_totalFreightComm = 0;
    var expTotalFreightCommArr = (expTotalFreightComm.toString()).split('+');
    for (var i = 0; i < expTotalFreightCommArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expTotalFreightCommArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_totalFreightComm = Number(totalAmount_totalFreightComm) + Number(amount);
                totalPer_totalFreightComm = Number(totalPer_totalFreightComm) + Number(perQty);
                totalConVal_totalFreightComm = Number(totalConVal_totalFreightComm) + Number(conValue);
            }
        });
    }
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Total Freight & commisioning") {
            console.log("totalAmount :" + totalAmount_totalFreightComm + " ,totalPer :" + totalPer_totalFreightComm + " ,totalConVal :" + totalConVal_totalFreightComm);
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_totalFreightComm).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_totalFreightComm).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_totalFreightComm).toFixed(2)));
        }
    });
    var totalAmount_netPrice = 0;
    var totalPer_netPrice = 0;
    var totalConVal_netPrice = 0;
    var expNetPriceArr = (expNetPrice.toString()).split('+');
    for (var i = 0; i < expNetPriceArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function(j) {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expNetPriceArr[i].trim() === ctype.trim()) {
                console.log("expNetPriceArr bittu [" + i + "]:" + expNetPriceArr[i] + " ,ctype [" + j + "]:" + ctype.trim() + "expNetPriceArr.length :" + expNetPriceArr.length);
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_netPrice = Number(totalAmount_netPrice) + Number(amount);
                totalPer_netPrice = Number(totalPer_netPrice) + Number(perQty);
                totalConVal_netPrice = Number(totalConVal_netPrice) + Number(conValue);
            }
        });
    }

    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Net Price") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_netPrice).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_netPrice).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_netPrice).toFixed(2)));
        }
    });
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


    var totalAmount_CostFreightCFR = 0;
    var totalPer_CostFreightCFR = 0;
    var totalConVal_CostFreightCFR = 0;
    var expCostFreightCFRArr = (expCostFreightCFR.toString()).split('+');
    for (var i = 0; i < expCostFreightCFRArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expCostFreightCFRArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_CostFreightCFR = Number(totalAmount_CostFreightCFR) + Number(amount);
                totalPer_CostFreightCFR = Number(totalPer_CostFreightCFR) + Number(perQty);
                totalConVal_CostFreightCFR = Number(totalConVal_CostFreightCFR) + Number(conValue);
            }
        });
    }
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Cost & Freight(CFR)") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_CostFreightCFR).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_CostFreightCFR).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_CostFreightCFR).toFixed(2)));
        }
    });
    var totalAmount_TotalInsurance = 0;
    var totalPer_TotalInsurance = 0;
    var totalConVal_TotalInsurance = 0;
    var expTotalInsuranceArr = (expTotalInsurance.toString()).split('+');
    for (var i = 0; i < expTotalInsuranceArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expTotalInsuranceArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_TotalInsurance = Number(totalAmount_TotalInsurance) + Number(amount);
                totalPer_TotalInsurance = Number(totalPer_TotalInsurance) + Number(perQty);
                totalConVal_TotalInsurance = Number(totalConVal_TotalInsurance) + Number(conValue);
            }
        });
    }
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Total Insurance") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_TotalInsurance).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_TotalInsurance).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_TotalInsurance).toFixed(2)));
        }
    });
    var totalAmount_InsuranceFreight = 0;
    var totalPer_InsuranceFreight = 0;
    var totalConVal_InsuranceFreight = 0;
    var expInsuranceFreightArr = (expInsuranceFreight.toString()).split('+');
    for (var i = 0; i < expInsuranceFreightArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expInsuranceFreightArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_InsuranceFreight = Number(totalAmount_InsuranceFreight) + Number(amount);
                totalPer_InsuranceFreight = Number(totalPer_InsuranceFreight) + Number(perQty);
                totalConVal_InsuranceFreight = Number(totalConVal_InsuranceFreight) + Number(conValue);
            }
        });
    }
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Insurance and Freight") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_InsuranceFreight).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_InsuranceFreight).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_InsuranceFreight).toFixed(2)));
        }
    });
    var totalAmount_CostInsurance = 0;
    var totalPer_CostInsurance = 0;
    var totalConVal_CostInsurance = 0;
    var expCostInsuranceFreightCIFArr = (expCostInsuranceFreightCIF.toString()).split('+');
    for (var i = 0; i < expCostInsuranceFreightCIFArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expCostInsuranceFreightCIFArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_CostInsurance = Number(totalAmount_CostInsurance) + Number(amount);
                totalPer_CostInsurance = Number(totalPer_CostInsurance) + Number(perQty);
                totalConVal_CostInsurance = Number(totalConVal_CostInsurance) + Number(conValue);
            }
        });
    }
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Cost Insurance & Freight (CIF)") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_CostInsurance).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_CostInsurance).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_CostInsurance).toFixed(2)));
        }
    });
    var totalAmount_CIFWithGST = 0;
    var totalPer_CIFWithGST = 0;
    var totalConVal_CIFWithGST = 0;
    var expCIFWithGSTArr = (expCIFWithGST.toString()).split('+');
    for (var i = 0; i < expCIFWithGSTArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expCIFWithGSTArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_CIFWithGST = Number(totalAmount_CIFWithGST) + Number(amount);
                totalPer_CIFWithGST = Number(totalPer_CIFWithGST) + Number(perQty);
                totalConVal_CIFWithGST = Number(totalConVal_CIFWithGST) + Number(conValue);
            }
        });
    }

    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "CIF With GST") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_CIFWithGST).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_CIFWithGST).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_CIFWithGST).toFixed(2)));
        }
    });
    var totalAmount_ZBordercrossingvalue = 0;
    var totalPer_ZBordercrossingvalue = 0;
    var totalConVal_ZBordercrossingvalue = 0;
    var expZBordercrossingvalueArr = (expZBordercrossingvalue.toString()).split('+');
    for (var i = 0; i < expZBordercrossingvalueArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expZBordercrossingvalueArr[i].trim() === ctype.trim()) {
                console.log("ctype :" + ctype + " ,expZBordercrossingvalue :" + expZBordercrossingvalueArr[i]);
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_ZBordercrossingvalue = Number(totalAmount_ZBordercrossingvalue) + Number(amount);
                totalPer_ZBordercrossingvalue = Number(totalPer_ZBordercrossingvalue) + Number(perQty);
                totalConVal_ZBordercrossingvalue = Number(totalConVal_ZBordercrossingvalue) + Number(conValue);
            }
        });
    }
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
    var totalAmount_PriceIncl = 0;
    var totalPer_PriceIncl = 0;
    var totalConVal_PriceIncl = 0;
    var expPriceInclofdiscSurchargeArr = (expPriceInclofdiscSurcharge.toString()).split('+');
    for (var i = 0; i < expPriceInclofdiscSurchargeArr.length; i++) {
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expPriceInclofdiscSurchargeArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountLineLevel]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityLineLavel]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueLineLevel]").val());
                totalAmount_PriceIncl = Number(totalAmount_PriceIncl) + Number(amount);
                totalPer_PriceIncl = Number(totalPer_PriceIncl) + Number(perQty);
                totalConVal_PriceIncl = Number(totalConVal_PriceIncl) + Number(conValue);
            }
        });
    }

    $("#conditionTableIdLineLevel tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
        if (cname === "Price Incl of disc/Surcharge") {
            $(this).find("td").eq(3).children(".AmountLineLevel").val(formatAmountByComma(Number(totalAmount_PriceIncl).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(totalPer_PriceIncl).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(totalConVal_PriceIncl).toFixed(2)));
        }
    });
    if (reqFrom === "netprice") {
        var priceUnit = "";
        var insertionid = $("#ItemNumberSelect").val();
        $("#material_headerClass tbody tr").each(function() {
            var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (insertionid === itemDropdownId) {
                priceUnit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var perunit = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel").val());
            var conditiontype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            console.log("conditiontype on netprice :" + conditiontype + " ,perunit :" + perunit);
            if ((perunit === "" || perunit === 0 || perunit === "0.00") && conditiontype !== "" && conditiontype !== "ZNAV" && conditiontype !== "NAVS" && conditiontype !== "JEXS") {
                $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(priceUnit).toFixed(2)));
            }
        });
    }
}

function deleteRowFormConditionHeader() {
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
    $("#conditionTableId tbody tr").each(function(i) {
        var condtype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
        if (condtype === 'PBXX') {
            PBXX = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (PBXX === "" || isNaN(PBXX)) {
                PBXX = 0;
            }
        }
        if (condtype === 'FRA1') {
            FRA1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (FRA1 === "" || isNaN(FRA1)) {
                FRA1 = 0;
            }
            console.log("FRA1 :" + FRA1);
        }
        if (condtype === 'FRB1') {
            FRB1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (FRB1 === "" || isNaN(FRB1)) {
                FRB1 = 0;
            }
            console.log("FRB1 :" + FRB1);
        }
        if (condtype === 'ZFR1') {
            ZFR1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZFR1 === "" || isNaN(ZFR1)) {
                ZFR1 = 0;
            }
            console.log("ZFR1 :" + ZFR1);
        }
        if (condtype === 'ZPAC') {
            ZPAC = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZPAC === "" || isNaN(ZPAC)) {
                ZPAC = 0;
            }
            console.log("ZPAC :" + ZPAC);
        }
        if (condtype === 'FRC1') {
            FRC1 = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (FRC1 === "" || isNaN(FRC1)) {
                FRC1 = 0;
            }
            console.log("FRC1 :" + FRC1);
        }
        if (condtype === 'ZCRQ') {
            ZCRQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCRQ === "" || isNaN(ZCRQ)) {
                ZCRQ = 0;
            }
            console.log("ZCRQ :" + ZCRQ);
        }
        if (condtype === 'ZCOV') {
            ZCOV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCOV === "" || isNaN(ZCOV)) {
                ZCOV = 0;
            }
            console.log("ZCOV :" + ZCOV);
        }
        if (condtype === 'ZIMP') {
            ZIMP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZIMP === "" || isNaN(ZIMP)) {
                ZIMP = 0;
            }
            console.log("ZIMP :" + ZIMP);
        }
        if (condtype === 'ZCOP') {
            ZCOP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCOP === "" || isNaN(ZCOP)) {
                ZCOP = 0;
            }
            console.log("ZCOP :" + ZCOP);
        }
        if (condtype === 'ZCOV') {
            ZBIN = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZBIN === "" || isNaN(ZBIN)) {
                ZBIN = 0;
            }
            console.log("ZBIN :" + ZBIN);
        }
        if (condtype === 'ZCOQ') {
            ZCOQ = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZCOQ === "" || isNaN(ZCOQ)) {
                ZCOQ = 0;
            }
            console.log("ZCOQ :" + ZCOQ);
        }
        if (condtype === 'ZSEC') {
            ZSEC = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZSEC === "" || isNaN(ZSEC)) {
                ZSEC = 0;
            }
            console.log("ZSEC :" + ZSEC);
        }
        if (condtype === 'ZMIS') {
            ZMIS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZMIS === "" || isNaN(ZMIS)) {
                ZMIS = 0;
            }
            console.log("ZMIS :" + ZMIS);
        }
        if (condtype === 'ZINV') {
            ZINV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZINV === "" || isNaN(ZINV)) {
                ZINV = 0;
            }
            console.log("ZINV :" + ZINV);
        }
        if (condtype === 'ZMSQ') {
            ZMSQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZMSQ === "" || isNaN(ZMSQ)) {
                ZMSQ = 0;
            }
            console.log("ZMSQ :" + ZMSQ);
        }
        if (condtype === 'ZINP') {
            ZINP = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZINP === "" || isNaN(ZINP)) {
                ZINP = 0;
            }
            console.log("ZINP :" + ZINP);
        }
        if (condtype === 'ZITQ') {
            ZITQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZITQ === "" || isNaN(ZITQ)) {
                ZITQ = 0;
            }
            console.log("ZITQ :" + ZITQ);
        }
        if (condtype === 'ZINQ') {
            ZINQ = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZINQ === "" || isNaN(ZINQ)) {
                ZINQ = 0;
            }
            console.log("ZINQ :" + ZINQ);
        }
        if (condtype === 'NAVS') {
            NAVS = parseInt(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (NAVS === "" || isNaN(NAVS)) {
                NAVS = 0;
            }
            console.log("NAVS :" + NAVS);
        }
        if (condtype === 'ZNAV') {
            ZNAV = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
            if (ZNAV === "" || isNaN(ZNAV)) {
                ZNAV = 0;
            }
            console.log("ZNAV :" + ZNAV);
        }
        if (condtype === 'NAVM') {
            NAVM = Number(removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()));
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
    var ctype = "";
    var conValue = "";
    var totalAmount_totalFreight = 0;
    var totalPer_totalFreight = 0;
    var totalConVal_totalFreight = 0;
    var totalFreightArr = (expTotalFreight.toString()).split('+');
    for (var i = 0; i < totalFreightArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (totalFreightArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_totalFreight = Number(totalAmount_totalFreight) + Number(amount);
                totalPer_totalFreight = Number(totalPer_totalFreight) + Number(perQty);
                totalConVal_totalFreight = Number(totalConVal_totalFreight) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Total Freight") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_totalFreight).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_totalFreight).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_totalFreight).toFixed(2)));
        }
    });
    var totalAmount_totalFreightComm = 0;
    var totalPer_totalFreightComm = 0;
    var totalConVal_totalFreightComm = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expTotalFreightCommArr = (expTotalFreightComm.toString()).split('+');
    for (var i = 0; i < expTotalFreightCommArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expTotalFreightCommArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_totalFreightComm = Number(totalAmount_totalFreightComm) + Number(amount);
                totalPer_totalFreightComm = Number(totalPer_totalFreightComm) + Number(perQty);
                totalConVal_totalFreightComm = Number(totalConVal_totalFreightComm) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Total Freight & commisioning") {
            console.log("totalAmount :" + totalAmount_totalFreightComm + " ,totalPer :" + totalPer_totalFreightComm + " ,totalConVal :" + totalConVal_totalFreightComm);
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_totalFreightComm).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_totalFreightComm).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_totalFreightComm).toFixed(2)));
        }
    });
    var totalAmount_netPrice = 0;
    var totalPer_netPrice = 0;
    var totalConVal_netPrice = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expNetPriceArr = (expNetPrice.toString()).split('+');
    for (var i = 0; i < expNetPriceArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expNetPriceArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                console.log("expNetPriceArr in netprice :" + expNetPriceArr + "ctype :" + ctype);
                console.log("amount in netprice :" + amount + " ,perQty :" + perQty + " ,conValue :" + conValue);
                totalAmount_netPrice = Number(totalAmount_netPrice) + Number(amount);
                totalPer_netPrice = Number(totalPer_netPrice) + Number(perQty);
                totalConVal_netPrice = Number(totalConVal_netPrice) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Net Price") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_netPrice).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_netPrice).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_netPrice).toFixed(2)));
        }
    });
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


    var totalAmount_CostFreightCFR = 0;
    var totalPer_CostFreightCFR = 0;
    var totalConVal_CostFreightCFR = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expCostFreightCFRArr = (expCostFreightCFR.toString()).split('+');
    for (var i = 0; i < expCostFreightCFRArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expCostFreightCFRArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_CostFreightCFR = Number(totalAmount_CostFreightCFR) + Number(amount);
                totalPer_CostFreightCFR = Number(totalPer_CostFreightCFR) + Number(perQty);
                totalConVal_CostFreightCFR = Number(totalConVal_CostFreightCFR) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Cost & Freight(CFR)") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_CostFreightCFR).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_CostFreightCFR).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_CostFreightCFR).toFixed(2)));
        }
    });
    var totalAmount_TotalInsurance = 0;
    var totalPer_TotalInsurance = 0;
    var totalConVal_TotalInsurance = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expTotalInsuranceArr = (expTotalInsurance.toString()).split('+');
    for (var i = 0; i < expTotalInsuranceArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expTotalInsuranceArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_TotalInsurance = Number(totalAmount_TotalInsurance) + Number(amount);
                totalPer_TotalInsurance = Number(totalPer_TotalInsurance) + Number(perQty);
                totalConVal_TotalInsurance = Number(totalConVal_TotalInsurance) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Total Insurance") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_TotalInsurance).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_TotalInsurance).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_TotalInsurance).toFixed(2)));
        }
    });
    var totalAmount_InsuranceFreight = 0;
    var totalPer_InsuranceFreight = 0;
    var totalConVal_InsuranceFreight = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expInsuranceFreightArr = (expInsuranceFreight.toString()).split('+');
    for (var i = 0; i < expInsuranceFreightArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expInsuranceFreightArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_InsuranceFreight = Number(totalAmount_InsuranceFreight) + Number(amount);
                totalPer_InsuranceFreight = Number(totalPer_InsuranceFreight) + Number(perQty);
                totalConVal_InsuranceFreight = Number(totalConVal_InsuranceFreight) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Insurance and Freight") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_InsuranceFreight).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_InsuranceFreight).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_InsuranceFreight).toFixed(2)));
        }
    });
    var totalAmount_CostInsurance = 0;
    var totalPer_CostInsurance = 0;
    var totalConVal_CostInsurance = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expCostInsuranceFreightCIFArr = (expCostInsuranceFreightCIF.toString()).split('+');
    for (var i = 0; i < expCostInsuranceFreightCIFArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expCostInsuranceFreightCIFArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_CostInsurance = Number(totalAmount_CostInsurance) + Number(amount);
                totalPer_CostInsurance = Number(totalPer_CostInsurance) + Number(perQty);
                totalConVal_CostInsurance = Number(totalConVal_CostInsurance) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Cost Insurance & Freight (CIF)") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_CostInsurance).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_CostInsurance).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_CostInsurance).toFixed(2)));
        }
    });
    var totalAmount_CIFWithGST = 0;
    var totalPer_CIFWithGST = 0;
    var totalConVal_CIFWithGST = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expCIFWithGSTArr = (expCIFWithGST.toString()).split('+');
    for (var i = 0; i < expCIFWithGSTArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expCIFWithGSTArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_CIFWithGST = Number(totalAmount_CIFWithGST) + Number(amount);
                totalPer_CIFWithGST = Number(totalPer_CIFWithGST) + Number(perQty);
                totalConVal_CIFWithGST = Number(totalConVal_CIFWithGST) + Number(conValue);
            }
        });
    }

    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "CIF With GST") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_CIFWithGST).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_CIFWithGST).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_CIFWithGST).toFixed(2)));
        }
    });
    var totalAmount_ZBordercrossingvalue = 0;
    var totalPer_ZBordercrossingvalue = 0;
    var totalConVal_ZBordercrossingvalue = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expZBordercrossingvalueArr = (expZBordercrossingvalue.toString()).split('+');
    for (var i = 0; i < expZBordercrossingvalueArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expZBordercrossingvalueArr[i].trim() === ctype.trim()) {
                console.log("ctype :" + ctype + " ,expZBordercrossingvalue :" + expZBordercrossingvalueArr[i]);
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_ZBordercrossingvalue = Number(totalAmount_ZBordercrossingvalue) + Number(amount);
                totalPer_ZBordercrossingvalue = Number(totalPer_ZBordercrossingvalue) + Number(perQty);
                totalConVal_ZBordercrossingvalue = Number(totalConVal_ZBordercrossingvalue) + Number(conValue);
            }
        });
    }
    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "@3Z@Border crossing value") {
            console.log("totalAmount_ZBordercrossingvalue :" + totalAmount_ZBordercrossingvalue);
            console.log("totalPer_ZBordercrossingvalue :" + totalPer_ZBordercrossingvalue);
            console.log("totalConVal_ZBordercrossingvalue :" + totalConVal_ZBordercrossingvalue);
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_ZBordercrossingvalue).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_ZBordercrossingvalue).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_ZBordercrossingvalue).toFixed(2)));
        }
    });
    var totalAmount_PriceIncl = 0;
    var totalPer_PriceIncl = 0;
    var totalConVal_PriceIncl = 0;
    amount = 0;
    perQty = 0;
    conValue = 0;
    var expPriceInclofdiscSurchargeArr = (expPriceInclofdiscSurcharge.toString()).split('+');
    for (var i = 0; i < expPriceInclofdiscSurchargeArr.length; i++) {
        $("#conditionTableId tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeHeader").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeHeader") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeHeader").val();
            }
            if (expPriceInclofdiscSurchargeArr[i].trim() === ctype.trim()) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                perQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
                conValue = removeCommaInNumber($(this).find("td").eq(8).children("input[name=ConditionValueHeader]").val());
                totalAmount_PriceIncl = Number(totalAmount_PriceIncl) + Number(amount);
                totalPer_PriceIncl = Number(totalPer_PriceIncl) + Number(perQty);
                totalConVal_PriceIncl = Number(totalConVal_PriceIncl) + Number(conValue);
            }
        });
    }

    $("#conditionTableId tbody tr").each(function() {
        var cname = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
        if (cname === "Price Incl of disc/Surcharge") {
            $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalAmount_PriceIncl).toFixed(2)));
            $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(totalPer_PriceIncl).toFixed(2)));
            $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConVal_PriceIncl).toFixed(2)));
        }
    });
}

function calculatePBXXForHeader() {
    console.log("calculatePBXXForHeader===================");
//    var unitprice = current.val();
    var conType = "";
    var Quantity = "";
    var netPrice = "";
    var perQuant = "";
    var totalConditionValue = 0;
//    var totalQuantity = 0;
    var totalNetPrice = 0;
    var toalPerQuant = 0;
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
//        if (insertionid === id) {
        Quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
        netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
        perQuant = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
//        totalQuantity = Number(totalQuantity) + Number(Quantity);
        totalNetPrice = Number(totalNetPrice) + Number(netPrice);
        if (netPrice !== "") {
            toalPerQuant = Number(toalPerQuant) + Number(perQuant);
        }

        var amount = netPrice;
        var condValue = "";
        $("#conditionTableId tbody tr").each(function() {
            conType = $(this).find("td").eq(1).children('.ConditionTypeHeader').val();
            if (conType === "PBXX") {
                var fml = formula(conType);
                var poQty = Quantity;
                var perQty = perQuant;
                var quant;
                var exp = new String(fml);
                condValue = eval(exp.toString());
                console.log("fml :" + fml + " ,amount :" + amount + " ,poQty :" + poQty + " ,perQty :" + perQty);
                totalConditionValue = Number(totalConditionValue) + Number(condValue);
                console.log("exp :" + exp);
                console.log("totalConditionValue bittu:" + totalConditionValue);
                $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(toalPerQuant).toFixed(2)));
                $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConditionValue).toFixed(2)));
                deleteRowFormConditionHeader();
            }
        });
//        }
    });
}

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
                window['socket_' + obj[i].ALIAS] = obj[i].RULES;
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
            $("#material_headerClass tbody tr").each(function() {
                var itemDropdownId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                if (insertionid === itemDropdownId) {
                    uom = $(this).find("td").eq(7).children(".prUom").val();
                    prCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
                }
            });
            $("#conditionTableIdLineLevel tbody tr").remove();
            var vendor = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
            var vendorcode = vendor.substring(vendor.lastIndexOf('-') + 1, vendor.length); // vendor.split('-')[1];
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].CTYPE !== undefined && obj[i].CTYPE !== "")
                {
                    row += "<tr>"
                            + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor' value='" + vendorcode + "'><input type='hidden' class='lineAddedFromLineLevel' value='linelevel'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' value='" + (obj[i].CTYPE === undefined ? '' : obj[i].CTYPE) + "' disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded nameConditionsLineLevel tableInputField' style='width:200px;' name='nameConditionsLineLevel' value='" + obj[i].NAME + "' disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded AmountLineLevel tableInputField' style='width:150px;' name='AmountLineLevel'><input type='hidden' class='AmountLineLevelHidden'></td>"
                            + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' value=" + obj[i].CRCY + "></td>"
                            + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' style='width:150px;' name='PerQuantityLineLavel'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' value=" + uom + " disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' value=" + uom + " disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;' disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' readonly = 'true' value='" + obj[i].CURRENCY2 + "'></td>"
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
                            + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' value=" + obj[i].CRCY + "></td>"
                            + "<td><input type='text' class='form-control form-rounded PerQuantityLineLavel tableInputField' readonly name='PerQuantityLineLavel' style='width:150px;'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' value=" + uom + " disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' value=" + uom + " disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;' disabled></td>"
                            + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' readonly = 'true' value='" + obj[i].CURRENCY2 + "'></td>"
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
            }

            $("#conditionTableIdLineLevel tbody").append(row);
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
function calculationForPBXX() {
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
            netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            perQuant = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
            fromCurrency = $(this).find("td").eq(13).children(".currencyClass").val();
        }
    });
    var amount = netPrice;
    var condValue = "";
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        conType = $(this).find("td").eq(1).children('.ConditionTypeLineLevel').val();
        if (conType === "PBXX") {
            var fml = formula(conType);
            var poQty = Quantity;
            var perQty = perQuant;
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
            calculateConditionValue(amount, conType, perQty, oldAmount, oldPercentage);
            $(this).find("td").eq(3).children(".AmountLineLevelHidden").val(Number(amount).toFixed(2));
            $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val(Number(perQuant).toFixed(2));
        }
    });
}

function pupolateDataInAccountAssignmentTable(jsonArr, requestFrom) {
    var tdrow = "";
    $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "");
    if (jsonArr.length === 1) {
        $("#distribution").val("Single Account Assignment");
        $("#unloadingPoint").val(jsonArr[0].unloadingPoint);
        $("#recipient").val(jsonArr[0].recipient);
        $("#gLAccount").val(jsonArr[0].GLAccount);
        $("#coArea").val(jsonArr[0].COArea);
        $("#costCenterAccAsgn").val(jsonArr[0].costCenter);
        $("#accAsgnOrder").val(jsonArr[0].accAsgnTblOrder);
        $("#accAsgnAsset").val(jsonArr[0].asset);
        $("#accAsgnWBSElementInput").val(jsonArr[0].WBSElement);
        $("#accAsgnSalesOrder").val(jsonArr[0].salesOrder);
        $("#assAsgnItemNumber").val(jsonArr[0].itemNumber);
        $("#assAsgnDelivSch").val(jsonArr[0].deliverySchedule);
        $("#accAsgnfund").val(jsonArr[0].fund);
        $("#accAsgnfunctionalArea").val(jsonArr[0].functionalArea);
        $("#accAsgnFundCenterInput").val(jsonArr[0].fundCenter);
        $("#accAsgnCommItemInput").val(jsonArr[0].commitmentItem);
        $("#accAsgnNActNumInput").val(jsonArr[0].netActNumber);
        $(".multipleCostCenterDiv").css("display", "none");
        $(".costCenterDiv").css("display", "block");
        $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
    } else {
        $("#distribution").val("Distrib. By Percentage");
        $(".multipleCostCenterDiv").css("display", "block");
        $(".costCenterDiv").css("display", "none");
        $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "none");
        for (var i = 0; i < jsonArr.length; i++) {
            tdrow += "<tr><td>" + "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" max="' + jsonArr[i].quantity + '" value="' + formatNumberByComma(jsonArr[i].quantity) + '">' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" max="' + jsonArr[i].percentage + '" value="' + jsonArr[i].percentage + '">' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (jsonArr[i].GLAccount === undefined ? '' : jsonArr[i].GLAccount) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (jsonArr[i].COArea === undefined ? '' : jsonArr[i].COArea) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (jsonArr[i].costCenter === undefined ? '' : jsonArr[i].costCenter) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (jsonArr[i].fund === undefined ? '' : jsonArr[i].fund) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (jsonArr[i].functionalArea === undefined ? '' : jsonArr[i].functionalArea) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (jsonArr[i].fundCenter === undefined ? '' : jsonArr[i].fundCenter) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (jsonArr[i].commitmentItem === undefined ? '' : jsonArr[i].commitmentItem) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (jsonArr[i].unloadingPoint === undefined ? '' : jsonArr[i].unloadingPoint) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (jsonArr[i].recipient === undefined ? '' : jsonArr[i].recipient) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (jsonArr[i].accAsgnTblOrder === undefined ? '' : jsonArr[i].accAsgnTblOrder) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (jsonArr[i].asset === undefined ? '' : jsonArr[i].asset) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (jsonArr[i].WBSElement === undefined ? '' : jsonArr[i].WBSElement) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (jsonArr[i].salesOrder === undefined ? '' : jsonArr[i].salesOrder) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (jsonArr[i].netActNumber === undefined ? '' : jsonArr[i].netActNumber) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (jsonArr[i].itemNumber === undefined ? '' : jsonArr[i].itemNumber) + '>' +
                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value="' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '">\n\
                    <input type=hidden class="form-control form-rounded input-height accAsgnLinkNumber" value=' + (jsonArr[i].linkNumber === undefined ? '' : jsonArr[i].linkNumber) + '>' +
                    "</td></tr>";
        }
        $("#costCenteraccountAssignmentTebleId tbody").append(tdrow);
    }
}

function ServiceAccountAssignmentArrayIsEmpty() {
    $("#serviceTabAccAsgnTebleId tbody tr").remove();
    var tdrow = "<tr><td><input type='hidden' class='LineNoSerAcc' value=''><input type=checkbox class=deleteServiceLine>" +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value="" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value="" style="width: 100px;">\n\
            <input type="hidden" class="form-control form-rounded input-height netValue">\n\
            <input type="hidden" class="form-control form-rounded input-height linkNumber" value="' + 10 + '">' +
            "</td></tr>";
    $("#serviceTabAccAsgnTebleId tbody").append(tdrow);
    $("#serviceTabAccAsgnTebleId tbody tr").find("input").attr("disabled", true);
    $("#noMultiAcctAssignment").prop("checked", true);
    $("#ServiceLinkNumberId").val(10);
}

function serviceTabAccAsgnTblQuantPerChange(current_tr, accountAssignmentCategory) {

    if (accountAssignmentCategory === 'A') {
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
    } else if (accountAssignmentCategory === 'C') {
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
    } else if (accountAssignmentCategory === 'F') {
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
    } else if (accountAssignmentCategory === 'K') {
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
    } else if (accountAssignmentCategory === 'N') {
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
    } else if (accountAssignmentCategory === 'P') {
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
    } else if (accountAssignmentCategory === 'R') {
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
    } else if (accountAssignmentCategory === 'X') {
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        });
    } else if (accountAssignmentCategory === 'Z') {
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
    }
}

function distOnQuantPercentageBases(accountAssignmentCategory, reqFrom) {
    if (reqFrom === "quantity") {
        if (accountAssignmentCategory === 'A') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(12).children(".serviceAccAsgnTblWBSElement").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'C') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'F') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'K') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'N') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(5).children(".serviceAccAsgnTblCostCetner").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'P') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'R') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'X') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'Z') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        }
    } else if (reqFrom === "percentage") {
        if (accountAssignmentCategory === 'A') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(12).children(".serviceAccAsgnTblWBSElement").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'C') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'F') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'K') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'N') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(5).children(".serviceAccAsgnTblCostCetner").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'P') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'R') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
                $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
                $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
                $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
                $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'X') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        } else if (accountAssignmentCategory === 'Z') {
            $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", "true");
                $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            });
        }
    }
}

function getSumOfNetPriceOfServiceByLinkId(LinkID) {

    var totalNetPrice = 0;
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data:
                {
                    "reqFrom": "getSumOfNetPriceOfServiceByLinkId",
                    "LinkID": LinkID
                },
        dataType: "json",
        success: function(response)
        {
            totalNetPrice = response;
        }
    });
    console.log("totalNetPrice: " + totalNetPrice);
    return totalNetPrice;
}
function ifServiceIsEmpty(currency, linkid) {
    var prType = $("#PrType").val();
    if (prType === "Service") {
        $("#serviceTableId tbody tr").remove();
        var row = "<tr>\n\
                <td><input type='checkbox' class='checkboxServices'>\n\
                <input type='hidden' class='isProfitabilitySegmentDataSaved' value='No'>\n\
                <input type='hidden' class='saveSarviceAccountAssignment' value='No'>\n\
                <input type='hidden' class='ServiceAccAssDist'>\n\
                <input type='hidden' class='LinkId' value='" + linkid + "'>\n\
                <input type='hidden' class='serviceId' value=''>\n\
                <input type='hidden' class='ServiceLinkId' value=''>\n\
                <input type=hidden class=lineNumberService>\n\
                <input type=hidden class=isServOldOrNew value=''></td>\n\
                <td></td>\n\
                <td><input type='text' class='form-control form-rounded lineItemNumberServices tableInputField' value='" + 10 + "'></td>\n\
                <td><input type='text' class='form-control form-rounded ServicesNumber_Services tableInputField' value='' style='width: 100px;'></td>\n\
                <td style='text-align: center'><input type='hidden' readonly class='form-control form-rounded shortText_Services tableInputField' value='Short text...' style='width:150px;display:inline-block;'> <i class='fa fa-file fa-2x service-short-text' aria-hidden='true' title='View Short Text' style='cursor: pointer;'></i></td>\n\
                <td><input type='text' class='form-control form-rounded quantity_Services tableInputField' min='0' value='' style='width:150px;'></td>\n\
                <td><input type='text' class='form-control form-rounded servicesUnit_Services tableInputField' style=width:70px;' value=''></td>\n\
                <td><input type='text' class='form-control form-rounded grossPrice_Services tableInputField' min='0' value='' style='width:150px;'></td>\n\
                <td><input type='text' class='form-control form-rounded currency_Services tableInputField' value='" + currency + "' style='width: 55px;'></td>\n\
                <td><input type='text' class='form-control form-rounded netPrice_Services tableInputField' min='0' value='' style='width:150px;' readonly></td>\n\
                <td><input type='text' class='form-control form-rounded edition_Services tableInputField' style=width:100px;' value=''></td>\n\
                <td style='text-align: center'><input type='hidden' readonly class='form-control form-rounded lineItemLongText_Services tableInputField' value='Line item long text...' style='width:150px;display:inline-block;'> <i class='fa fa-file fa-2x service-lineitem-long-text' aria-hidden='true' title='View Line Item Long Text' style='cursor: pointer;'></i></td>\n\
                <td><input type='text' class='form-control form-rounded overfTolerance_Services tableInputField' value=''></td>\n\
                <td><input type='text' class='form-control form-rounded serviceNetValue tableInputField' style='width:150px;' readonly value=''></td>\n\
                <td><input type='text' class='form-control form-rounded serviceActualQty tableInputField' readonly value=''></td>\n\
                <td style='text-align: center'><input type='hidden' class='form-control form-rounded serviceText tableInputField' readonly value='Service text...' style='width:150px;display:inline-block;'> <i class='fa fa-file fa-2x service-text' aria-hidden='true' title='View Service Text' style='cursor: pointer;'></i></td>\n\
                <td><i title='Delete Row' class='fa fa-window-close btn-lg deleteServiceTebleRow' aria-hidden='true' style='width:10px;'></i></td>\n\
                </tr>";
        $("#serviceTableId tbody").append(row);
    }
}

function populateGlCodeOnDistribution() {

    var gLCode = "";
    var zGLCOde = "";
    var category = "";
    var prNumber = "";
    var linetype = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            gLCode = $(this).find("td").eq(0).children(".prgLCode").val();
            zGLCOde = $(this).find("td").eq(0).children(".przGLCode").val();
            category = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            prNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
            linetype = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
        }
    });
    if (linetype === "PoLine" && prNumber === "") {
        var gLCode = $("#gLAccount").val();
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(3).children(".accAsgnGLAccount").val(gLCode);
            $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val(gLCode);
        });
    } else {
        if (category !== "Z") {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(3).children(".accAsgnGLAccount").val(gLCode);
                $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val(gLCode);
            });
        }
        if (category === "Z") {
            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                $(this).find("td").eq(3).children(".accAsgnGLAccount").val(zGLCOde);
                $(this).find("td").eq(9).children(".accAsgnCommitmentItem").val(zGLCOde);
            });
        }
    }
}
function ArrayIsEmptyOnLineItemChange() {
    $("#costCenteraccountAssignmentTebleId tbody tr").remove();
    var row = "";
    row += "<tr><td><input type=hidden class=deleteFlag value='false'>" +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;">' +
            "</td><td>" + '<input type=.text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;">\n\
            <input type=hidden class="form-control form-rounded input-height accAsgnLinkNumber" value="">' +
            "</td></tr>";
    $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);
}
function clearAllLineLevelFields() {
    console.log("In clearAllLineLevelFields Clearing line level tab data...");
    /*Clear Service Tab Start*/
    var confControlPr = "";
    var taxCodePr = "";
    var segmentPr = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            confControlPr = $(this).find("td").eq(0).children(".ConfirmationControlForLineInPr").val();
            taxCodePr = $(this).find("td").eq(0).children(".TexCodeForLineInPr").val();
            segmentPr = $(this).find("td").eq(0).children(".SegmentForLineInPr").val();
        }
    });
    $("#serviceTableId").find("tbody tr:gt(0)").remove();
    $("#serviceTableId :input").val("");
    $('#accountAssignmentForm').trigger("reset"); // Clear Service Account Assignment form data
    $('#ServiceAccountAssignmentForm').trigger("reset");
    $("#serviceTabAccAsgnTebleId").find("tbody tr").remove(); // Delete all rows of Service Account Assignment
    /*Clear Service Tab End*/

    /*Clear Limit Tab Start*/
    $("#OverallLimit").val("");
    $("#ExpectedValue").val("");
    $("#ActualValue").val("0.00");
    $("#NoLimit").prop("checked", false);
    $("#limitAccountAsgn").css("display", "none");
    $('#limitsAccountAssignmentForm').trigger("reset");
    $('#limitAccountAssignmentTableModal').trigger("reset");
    $("#limitTabAccAsgnTebleId").find("tbody tr").remove();
    /*Clear Limit Tab End*/

    /*Clear QuantityDates Tab Start*/
    $("#quantities-tab :input").val("");
    $("#netWeight").val("");
    $("#grossWeight").val("");
    $("#volume").val("");
    $("#points").val("");
    $("#netWeightUnit").val("");
    $("#grossWeightUnit").val("");
    $("#volumeUnit").val("");
    $("#pointsUnit").val("");
    $("#netWeightOrderUnit").val("");
    $("#grossWeightOrderUnit").val("");
    $("#volumeOrderUnit").val("");
    $("#pointsOrderUnit").val("");
    $("#netWeight2").val("");
    $("#grossWeight2").val("");
    $("#volume2").val("");
    $("#points2").val("");
    $("#netWeightUnit2").val("");
    $("#grossWeightUnit2").val("");
    $("#volumeUnit2").val("");
    $("#pointsUnit2").val("");
    /*Clear QuantityDates Tab End*/

    /*Clear Delivery Schedule Tab Start*/
    $("#DeliveryScheduleTableId").find("tbody tr:gt(0)").remove();
    $("#DeliveryScheduleTableId :input").val("");
    /*Clear Delivery Schedule Tab End*/

    /*Clear Delivery Tab Start*/
    $("#delivery-tab :input").val("");
    var code = $("#IncoTermsPart1").val();
    $("#incoTermsPart1Delivery").val(code);
    if (code === "DEL") {
        $("#incoTermsPart2Delivery").val("SELF DELIVER");
    } else if (code.trim() === "SC") {
        $("#incoTermsPart2Delivery").val("COLLECTION");
    } else {
        $("#incoTermsPart2Delivery").val("");
    }

    /*Clear Delivery Tab End*/

    /*Clear Invoice Tab Start*/
    $("#InvoiceReceipt").prop("checked", true);
    $("#FinalInvoice").prop("checked", false);
    $("#GRBasedIV").prop("checked", false);
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
    $("#serviceBasedIV").prop("checked", true);
//    $("#TaxCodeDescription").val("");
    /*Clear Invoice Tab End*/

    /*Clear Condition Tab Start*/
    $("#conditionTableIdLineLevel tbody tr").each(function() {
        $(this).find("td :input").eq(3).val("");
        $(this).find("td :input").eq(4).val("");
        $(this).find("td :input").eq(5).val("");
        $(this).find("td :input").eq(7).val("");
        $(this).find("td :input").eq(8).val("");
//        $(this).find("td :input").eq(12).val("");
    });
    /*Clear Condition Tab End*/

    /*Clear AccountAssignment Tab Start*/
    $("#account_assignment-tab :input").val("");
    $("#costCenteraccountAssignmentTebleId").find("tbody tr:gt(0)").remove();
    /*Clear AccountAssignment Tab End*/

    /*Clear Text Tab Start*/
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
    var confControl = $("#ConfirmationControlForLine").val();
    if (confControlPr === "") {
        $("#confControlLimits").val(confControl);
    } else {
        $("#confControlLimits").val(confControlPr);
    }

    $("#OrderAck").val("");
    $("#ConfirmationRequired").prop("checked", false);
    /*Clear Confirmations Tab Start*/

    /*Clear Condition Condtrol Tab Start*/
    $("#PrintPrice").prop("checked", false);
    $("#EstimatedPrice").prop("checked", false);
    /*Clear Condition Control Tab End*/

    /*Clear Customer Data Tab Start*/
    $("#ProductOriginLine").val("");
    var segment = $("#SegmentForLine").val();
    if (segmentPr === "") {
        $("#SegmentDescriptionLine").val(segment);
    } else {
        $("#SegmentDescriptionLine").val(segmentPr);
    }

    /*Clear Customer Data Tab End*/

    /*Clear Component Tab Start*/
    $("#componentTableIdLineLevel").find("tbody tr:gt(0)").remove();
    $("#componentTableIdLineLevel :input").val("");
    /*Clear Component Tab End*/

    // Clear Material Tab fields
    $("#revisionLevel").val("");
    $("#vendMatNo").val("");
    $("#eanUpc").val("");
    $("#vendorSubRange").val("");
    $("#batch").val("");
    $("#vendorBatch").val("");
    $("#infoUpdate").prop("checked", true);
    $("#mfrPartNumber").val("");
    $("#manufacturer").val("");
    console.log("In clearAllLineLevelFields Clearing line level tab data ends.");
}
function distributionByPercentage() {
    var accountAssignmentCategory = $("#accountAssignmentCategory").val();
//    alert(accountAssignmentCategory);
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



