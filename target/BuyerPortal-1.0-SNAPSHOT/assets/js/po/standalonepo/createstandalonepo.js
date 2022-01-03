/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var conditionLineLevelArraySA = [];
var conditionLineLevelArraySATemp = [];
var conditionLineLevelObject = {};
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
    
    $("#saveHeaderConditionBtn").click(function() {
        saveSAHeaderConditionsInDB();
    });
    
    var extPoid = $("#poid").val();
    console.log("extPoid: " + extPoid);
    if (extPoid !== "") {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getPONumber",
                "id": extPoid.toString().trim()
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("obj.headerConditionsNew :" + obj.headerConditionsNew);

                conditionLineLevelArraySA = JSON.parse(obj.headerConditionsNew);
                console.log("conditionLineLevelArraySA len: " + conditionLineLevelArraySA.length);
            }
        });

    }

    // Set valuation type in delivery tab, selected from picklist
    $("#valuationTypeModalTable").on("click", ".valuationTypeModalTableTr", function() {
        var valuationType = $(this).text();
        console.log("valuationType: " + valuationType);
        $("#ValuationType").val(valuationType);
        $("#valuationTypeModal").modal("hide");
    });

    // Create picklist for valuation type field in delivery tab for selected po line by material code and company code
    var valuationTypeModalTable = null;
    $("#ValuationType").keypress(function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            console.log("ValuationType click");
            var prMaterialCode = "";
            var prCompanyCode = $("#companycodeHeader").val();
            var insertionOrderId = $("#ItemNumberSelect").val();
            $("#material_headerClass tbody tr").each(function() {
                var prInsertionOrderId = $(this).find("td").eq(1).html();
                if (insertionOrderId === prInsertionOrderId) {
                    prMaterialCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                    return;
                }
            });
            console.log("prMaterialCode: " + prMaterialCode);
            console.log("prCompanyCode: " + prCompanyCode);

            $("#overlay").css("display", "block");
            setTimeout(function() {
                var jsonArr = getMaterialMasterOnLoadInStandalone(prMaterialCode, prCompanyCode);
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
    var linkIdArray = [];
    $("#material_headerClass").on("click", ".prFreeOfCharge", function() {
        console.log("prFreeOfCharge clicked");
        var isFOCEnabled = $(this).prop("checked");
        console.log("isFOCEnabled: " + isFOCEnabled);
        if (isFOCEnabled) {
            $(this).parent().parent().find("td").eq(9).children(".prNetPrice").val("0.00");
            $(this).parent().parent().find("td").eq(9).children(".prNetPrice").prop("readonly", true);
        } else {
            $(this).parent().parent().find("td").eq(9).children(".prNetPrice").val("");
            if ($("#prType").val() === "Material") {
                $(this).parent().parent().find("td").eq(9).children(".prNetPrice").prop("readonly", false);
            }
        }

        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).parent().parent().find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
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
        }
        if (isFOCEnabled) {
            $("#material_headerClass tbody tr").each(function() {
                var linkid = $(this).find("td").eq(0).children(".linkid").val();
                linkIdArray.push(linkid);
            });
            var isSaved = $(this).parent().parent().find("td").eq(0).children(".isLineLevelDataSavedSaved").val();
            var LinkID = $(this).parent().parent().find("td").eq(0).children(".linkid").val();
            if (isSaved === 'Yes') {
                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "delCondiionIfFOCCheckedInST",
                        "LinkID": LinkID,
                        "linkidArrayAsString": linkIdArray.toString()
                    },
                    success: function(responseJson) {
                        console.log("response :: " + responseJson);
                        var obj = $.parseJSON(responseJson);
                        var jsonCondArr = obj.jsonCondArr;
                        console.log("jsonCondArr after FOC checked :" + jsonCondArr.length);
                        if (jsonCondArr.length !== 0) {
                            getNGBPCmplxPOCreationLineItemConditionsByLinkId(jsonCondArr);
                        } else {
                            $("#conditionTableId tbody tr").remove();
                        }
                    }
                });
//            $("#conditions_linelevel_li").css("display", "block");
                $(".collapseDivLineLevel").find(".active").removeClass("active");

                $("#conditions_linelevel").addClass("active");
                $("#conditions_linelevel-tab").addClass("active");
                $("#conditions_linelevel-tab").addClass("show");
            }
        }
    });

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

    $("#material_headerClass").on("change", ".prSARequisitionDatepicker", function() {
        var prDeliveryDate = $(this).val();
        console.log("prDeliveryDate: " + prDeliveryDate);

        if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
        {
            var prDeliveryDateArr = prDeliveryDate.toString().split("/");
            console.log("prDeliveryDateArr len: " + prDeliveryDateArr.length);
            var mon = prDeliveryDateArr[0];
            var day = prDeliveryDateArr[1];
            var year = prDeliveryDateArr[2];

            var newPrDeliveryDate = day + "." + mon + "." + year;
            console.log("newPrDeliveryDate: " + newPrDeliveryDate);

            $(this).parent().children(".requisitionDateClass").val(newPrDeliveryDate);

        }
    });

    $("#material_headerClass").on("change", ".prSADeliveryDatepicker", function() {
        var prDeliveryDate = $(this).val();
        console.log("prDeliveryDate: " + prDeliveryDate);

        var weekNumber = $.datepicker.iso8601Week(new Date(prDeliveryDate));
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber: " + weekNumber);

        var ItemNumberSelectClass = $(".ItemNumberSelectClass").val();
        var insertionOrderId_Class = $(this).parent().parent().find("td").eq(1).text();

        var delvDateCat = $(this).parent().parent().find("td").eq(13).children(".pODeliveryDateCetegory").val();
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

            $(this).parent().children(".deliveryDateClass").val(newPrDeliveryDate);

            if (ItemNumberSelectClass === insertionOrderId_Class)
            {
                $("#DeliveryScheduleTableId tbody tr").each(function() {
                    $(this).find("td").eq(1).children(".deliveryDateClass").val(newPrDeliveryDate);
                    if (delvDateCat === "D") {
                        $(this).find("td").eq(2).children(".statistialDeliveryDate").val(newPrDeliveryDate);
                    } else {
                        $(this).find("td").eq(2).children(".statistialDeliveryDate").val("");
                    }
                });
            }
        }
    });

    $("#DeliveryScheduleTableId").on("change", ".delvSchDeliveryDatepicker", function() {
        var prDeliveryDate = $(this).val();
        console.log("prDeliveryDate: " + prDeliveryDate);
        var ItemNumberSelectClass = $(".ItemNumberSelectClass").val();

        var delvDateCat = $(this).parent().parent().find("td").eq(0).children(".deliveryDateCategory").val();
        console.log("delvDateCat: " + delvDateCat);

        var weekNumber = $.datepicker.iso8601Week(new Date(prDeliveryDate));
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber: " + weekNumber);

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
                $(this).parent().parent().find("td").eq(2).children(".statistialDeliveryDate").val(newPrDeliveryDate);
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
                var insertionOrderId_Class = $(this).parent().parent().find("td").eq(1).text();
                if (ItemNumberSelectClass === insertionOrderId_Class)
                {
                    $(this).find("td").eq(15).children(".deliveryDateClass").val(newPrDeliveryDate);
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
//                var id = $(this).parent().parent().find("td").eq(1).text();
//                if (ItemNumberSelectClass === id) {
//                    var date = DeliveryDateArray[0].getDate();
//                    var month = DeliveryDateArray[0].getMonth();
//                    var year = DeliveryDateArray[0].getFullYear();
//                    date = date < 10 ? ("0" + date) : date;
//                    smallestDate = date + "." + months[month] + "." + year;
//                    console.log("smallestDate: " + smallestDate);
//                    $(this).find('td').eq(15).children(".deliveryDateClass").val(smallestDate);
//                }
//            });
        }
    });

    $("#DeliveryScheduleTableId").on("change", ".statistialDeliveryDatepicker", function() {
        var prDeliveryDate = $(this).val();
        console.log("prDeliveryDate: " + prDeliveryDate);

        var delvDateCat = $(this).parent().parent().find("td").eq(0).children(".deliveryDateCategory").val();
        console.log("delvDateCat: " + delvDateCat);

        var statisticalDate = new Date(prDeliveryDate);

        var weekNumber = $.datepicker.iso8601Week(statisticalDate);
        if (weekNumber !== undefined && weekNumber !== "")
        {
            weekNumber = weekNumber - 1;
        }
        console.log("WeekNumber: " + weekNumber);

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
                $(this).parent().children(".statistialDeliveryDate").val(newPrDeliveryDate);
            }
            else if (delvDateCat === "W")
            {
                var tempMon = firstDateOfWeek.getMonth() + 1;
                newPrDeliveryDate = (firstDateOfWeek.getDate() < 10 ? "0" + firstDateOfWeek.getDate() : firstDateOfWeek.getDate())
                        + "." + (tempMon < 10 ? "0" + tempMon : tempMon)
                        + "." + firstDateOfWeek.getFullYear();
                console.log("newPrDeliveryDate: " + newPrDeliveryDate);
                $(this).parent().children(".statistialDeliveryDate").val(newPrDeliveryDate);
            }
            else
            {
                $(this).parent().children(".statistialDeliveryDate").val(newPrDeliveryDate);
            }
        }
    });
    $("#componentTableIdLineLevel").on("change", ".latReqDatepicker", function() {
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

            $(this).parent().children(".latReqDate").val(newCompLatestReqDate);

//            saveDeliveryScheduleTabDataOnFieldChange("OnChange");
        }
    });

    $("#componentTableIdLineLevel").on("change", ".reqDatepicker", function() {
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

            $(this).parent().children(".comRequirementDate").val(newCompLatestReqDate);
            $(this).parent().parent().find("td").eq(9).children(".latReqDate").val(newCompLatestReqDate);

//            saveDeliveryScheduleTabDataOnFieldChange("OnChange");
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
//       alert("isChecked :" + isChecked);
        if (isChecked === true) {
            $("#TaxCode").val("PN");
        } else {
            $("#TaxCode").val("");
        }
    });


    $("#conditionTableId").on("click", ".deleteConditionTebleRow", function() {
        var condAmountJsonArray = [];
        var condAmountJsonObj = {};

        var LinkID;
        var linkIdArray = [];
        var linkIdForDelete;
        var linkIdArrayForDelete = [];
        var linkidSelected = "";
        var dropDownItemNumber = $("#ItemNumberSelect").val();
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
//            if (isPrSaved === 'Yes') {
            LinkID = $(this).find("td").eq(0).children(".linkid").val();
            linkIdArray.push(LinkID);
            conditionLineLevelArraySA.forEach(function(e) {
                condAmountJsonObj = {};
                if (e.Ctype === conditionType && e.linkid === LinkID) {
                    console.log("e.Ctype :" + e.Ctype + " ,conditionType :" + " ,e.linkid :" + e.linkid + " ,LinkID :" + LinkID);
                    condAmountJsonObj["condValue"] = e.conditionValue;
                    condAmountJsonObj["LinkID"] = LinkID;
                    count++;
                    condAmountJsonArray.push(condAmountJsonObj);
                }
            });
//            }
            linkIdForDelete = $(this).find("td").eq(0).children(".linkid").val();
            linkIdArrayForDelete.push(linkIdForDelete);

            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                linkidSelected = $(this).find("td").eq(0).children(".linkid").val();
            }
        });

        if (conditionValue !== "") {
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "deleteHeaderConditionHeaderInStandAlone",
                    "linkidArrayAsString": linkIdArray.toString(),
                    "conditionType": conditionType,
                    "amount": Number(amount) / Number(prCount),
                    "per": Number(per) / Number(prCount),
                    "count": count,
                    "conditionValue": JSON.stringify(condAmountJsonArray)
                }
            });
        }

        var condType;
        var abort = false;
        var addedFrom = "";
        var linkIdAsArray = linkIdArrayForDelete.toString().split(',');
        for (var i = 0; i < linkIdArrayForDelete.length; i++) {
            conditionLineLevelArraySA.forEach(function(e, index) {
                console.log("Ctype :" + e.Ctype + " ,conditionType :" + conditionType);
                if (conditionType === e.Ctype && linkIdAsArray[i] === e.linkid) {
                    $("#conditionTableIdLineLevel tbody tr").each(function() {
                        addedFrom = $(this).find("td").eq(0).children(".lineAddedFromLineLevel").val();
                        if (addedFrom === "headerlevel") {
                            if (abort === false) {
                                if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                                    condType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                                } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                                    condType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                                }
                                if (condType === e.Ctype && linkidSelected === e.linkid && conditionindex === e.indexnumber) {
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
                        conditionLineLevelArraySA.splice(index, 1);
                    }
                }

            });
        }

        console.log("conditionLineLevelArraySA after delete Row :" + JSON.stringify(conditionLineLevelArraySA));
//        var condType;
//        $("#conditionTableIdLineLevel tbody tr").each(function() {
//            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
//                condType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
//            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
//                condType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
//            }
//
//            if (conditionType === condType) {
//                $(this).remove();
//            }
//        });

        deleteRowFormConditionHeaderInStandAlone();
        deleteRowFormConditionInStandAlone("");
    });

    var grossCondVal;
    var conditionAmountJsonArray = [];
    var lobiboxNotifyAlert = null;
    $("#conditionTableId").on("change", ".newAmountHeader", function() {
        var errorMsg = "";
        var isUnitPriceEmpty = "Yes";
        var isPrQtyEmpty = "Yes";
        var isPrUnitEmpty = "Yes";
        var prIndex = -1;
        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(8).children(".quantity_Class").val() === "") {
                isPrQtyEmpty = "No";
                prIndex = index + 1;
                return false;
            }
        });
        if (isPrQtyEmpty === "No") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Quantity in " + prIndex + " PR";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }

        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(9).children(".prNetPrice").val() === "") {
                isUnitPriceEmpty = "No";
                prIndex = index + 1;
                return false;
            }
        });
        if (isUnitPriceEmpty === "No") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the net price in " + prIndex + " PR";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }
        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(10).children(".prPerUnit").val() === "") {
                isPrUnitEmpty = "No";
                prIndex = index + 1;
                return false;
            }
        });
        if (isPrUnitEmpty === "No") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the per unit in " + prIndex + " PR";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }
        conditionAmountJsonArray = [];
        var prCount = $("#material_headerClass tbody tr").length;
//        var perQty = Number($(this).parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val()) / Number(prCount);
        var perQty = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val()));
        var fromCurrency;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var netPrice;
        var linkid;
        var cType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        var possition = $(this);
        var totalCondValue = 0;
        var condValue = 0;
        var Quantity = 0;
        $(this).val(formatAmountByComma(removeCommaInNumber($(this).val())));
        $("#material_headerClass tbody tr").each(function() {
//            conditionAmountJsonArray = [];
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
//            if (prTableItemNumber === dropDownItemNumber) {
//            var prTableItemNumber = $(this).find("td").eq(1).text();
            Quantity = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
            fromCurrency = $(this).find("td").eq(11).children('.currencyClass').val().trim();
            linkid = $(this).find("td").eq(0).children(".linkid").val();
            grossCondVal = removeCommaInNumber(possition.parent().parent().parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueHeader").val());
            var amount = removeCommaInNumber(possition.val());
            console.log("New Amount Header: " + amount);
            var toCurrency = possition.parent().parent().find("td").eq(4).children(".CurrencyHeader").val().trim();

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
                console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,grossCondVal :" + grossCondVal);
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

                if (toCurrency === fromCurrency || toCurrency === '%') {
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
                } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                    var exchangeRate = getExchangeRateHeader(toCurrency, fromCurrency);
                    if (exchangeRate === "") {
                        exchangeRate = 1;
                    }
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
                }
            }
//                alert("condValue :" + condValue);
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });
        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeaderInSA();
        clearPerColumnatHeaderAfterSaveInSA();
    });

    $("#conditionTableId").on("change", ".AmountHeader", function() {
        var errorMsg = "";
        var isUnitPriceEmpty = "Yes";
        var isPrQtyEmpty = "Yes";
        var isPrUnitEmpty = "Yes";
        var prIndex = -1;
        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(8).children(".quantity_Class").val() === "") {
                isPrQtyEmpty = "No";
                prIndex = index + 1;
                return false;
            }
        });
        if (isPrQtyEmpty === "No") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter Quantity in " + prIndex + " PR";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }

        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(9).children(".prNetPrice").val() === "") {
                isUnitPriceEmpty = "No";
                prIndex = index + 1;
                return false;
            }
        });
        if (isUnitPriceEmpty === "No") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the net price in " + prIndex + " PR";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }
        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(10).children(".prPerUnit").val() === "") {
                isPrUnitEmpty = "No";
                prIndex = index + 1;
                return false;
            }
        });
        if (isPrUnitEmpty === "No") {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please enter the per unit in " + prIndex + " PR";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).val("");
            return false;
        }
        conditionAmountJsonArray = [];
        var prCount = $("#material_headerClass tbody tr").length;
        var perQty = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(5).children(".PerQuantityHeader").val()));
        var fromCurrency;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var netPrice;
        var linkid;
        var cType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        var possition = $(this);
        var totalCondValue = 0;
        var condValue = 0;
        var Quantity = 0;
        $(this).val(Number(Number($(this).val())).toFixed(2));
        $("#material_headerClass tbody tr").each(function() {
//            conditionAmountJsonArray = [];
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            Quantity = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
            fromCurrency = $(this).find("td").eq(11).children('.currencyClass').val().trim();
            linkid = $(this).find("td").eq(0).children(".linkid").val();
            grossCondVal = removeCommaInNumber(possition.parent().parent().parent().children('tr:first').next().find("td").eq(8).children(".ConditionValueHeader").val());
            var amount = possition.val();
            var toCurrency = possition.parent().parent().find("td").eq(4).children(".CurrencyHeader").val().trim();

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
                console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,grossCondVal :" + grossCondVal);
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

                if (toCurrency === fromCurrency || toCurrency === '%') {
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
                } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                    var exchangeRate = getExchangeRateHeader(toCurrency, fromCurrency);
                    if (exchangeRate === "") {
                        exchangeRate = 1;
                    }
                    possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
                }
            }
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });
        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeaderInSA();
        clearPerColumnatHeaderAfterSaveInSA();
    });

    $("#conditionTableId").on("change", ".newPerQuantityHeader", function() {
//        conditionAmountJsonArray = [];
        var linkid;
        var prCount = $("#material_headerClass tbody tr").length;
        var Quantity = 0;
//        var amount = Number($(this).parent().parent().find("td").eq(3).children(".newAmountHeader").val()) / Number(prCount);
        var amount = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".newAmountHeader").val()));

        var perQuant = removeCommaInNumber($(this).val());
        var condValue = 0;
        var totalCondValue = 0;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var fromCurrency;
        var perQty = "";
//        var netPrice = "";
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
//        $(this).val(Number(Number($(this).val()) * Number(prCount)).toFixed(2));
        $(this).val(formatAmountByComma(removeCommaInNumber($(this).val())));
        var possition = $(this);
        var conType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        conditionAmountJsonArray = [];
        $("#material_headerClass tbody tr").each(function() {
//            conditionAmountJsonArray = [];
            var prTableItemNumber = $(this).find("td").eq(1).html();
//            if (prTableItemNumber === dropDownItemNumber) {
            fromCurrency = $(this).find("td").eq(11).children('.currencyClass').val();
//                netPrice = $(this).find("td").eq(9).children(".pr-net-price").val();

            Quantity = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
            linkid = $(this).find("td").eq(0).children(".linkid").val();
            var conditionAmountJsonObject = {};
            var fml = formula(conType);
            var poQty = Quantity;
            perQty = perQuant;
            var quant;
            var exp = new String(fml);
            condValue = eval(exp.toString());
            totalCondValue = Number(totalCondValue) + Number(condValue);
            console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,poQty :" + poQty + " ,perQuant :" + perQuant);
            console.log("Condition val :" + eval(exp.toString()));
            if (toCurrency === fromCurrency || toCurrency === '%') {
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRateHeader(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
            }
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });

//        alert(condValue + " : Inamount in per");
        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeaderInSA();
        clearPerColumnatHeaderAfterSaveInSA();
    });
    $("#conditionTableId").on("change", ".PerQuantityHeader", function() {
//        conditionAmountJsonArray = [];
        var linkid;
        var prCount = $("#material_headerClass tbody tr").length;
        var Quantity = 0;
//        var amount = Number($(this).parent().parent().find("td").eq(3).children(".newAmountHeader").val()) / Number(prCount);
        var amount = Number(removeCommaInNumber($(this).parent().parent().find("td").eq(3).children(".AmountHeader").val()));

        var perQuant = $(this).val();
        var condValue = 0;
        var totalCondValue = 0;
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var fromCurrency;
        var perQty = "";
//        var netPrice = "";
        var toCurrency = $(this).parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
//        $(this).val(Number(Number($(this).val()) * Number(prCount)).toFixed(2));
        $(this).val(Number(Number($(this).val())).toFixed(2));
        var possition = $(this);
        var conType = $(this).parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        conditionAmountJsonArray = [];
        $("#material_headerClass tbody tr").each(function() {
//            conditionAmountJsonArray = [];
            var prTableItemNumber = $(this).find("td").eq(1).html();
//            if (prTableItemNumber === dropDownItemNumber) {
            fromCurrency = $(this).find("td").eq(11).children('.currencyClass').val();
//                netPrice = $(this).find("td").eq(9).children(".pr-net-price").val();

            Quantity = removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val());
            linkid = $(this).find("td").eq(0).children(".linkid").val();
            var conditionAmountJsonObject = {};
            var fml = formula(conType);
            var poQty = Quantity;
            perQty = perQuant;
            var quant;
            var exp = new String(fml);
            condValue = eval(exp.toString());
            totalCondValue = Number(totalCondValue) + Number(condValue);
            console.log("totalCondValue :" + totalCondValue + " ,amount :" + amount + " ,poQty :" + poQty + " ,perQuant :" + perQuant);
            console.log("Condition val :" + eval(exp.toString()));
            if (toCurrency === fromCurrency || toCurrency === '%') {
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue).toFixed(2)));
            } else if (toCurrency !== fromCurrency && toCurrency !== '%') {
                var exchangeRate = getExchangeRateHeader(toCurrency, fromCurrency);
                if (exchangeRate === "") {
                    exchangeRate = 1;
                }
                possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalCondValue * exchangeRate).toFixed(2)));
            }
            conditionAmountJsonObject["condValue"] = condValue;
            conditionAmountJsonObject["LinkID"] = linkid;
            conditionAmountJsonArray.push(conditionAmountJsonObject);
//            }
        });

//        alert(condValue + " : Inamount in per");
        if (condValue !== 0) {
            addRowInLineLevelCondition($(this), conditionAmountJsonArray);
        }
        possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val(condValue);
//        clearPerColumnatHeaderInSA();
        clearPerColumnatHeaderAfterSaveInSA();
    });

    var lobiboxDestroyAlert = null;
    $("#material_headerClass").on("click", ".delete-pr-line", function() {
        var nextPr = $(this).parent().parent().first().next();
        var linkidPr = $(this).parent().parent().find("td").eq(0).children(".linkid").val();
        var current = $(this);
        var prlength = $("#material_headerClass tbody tr").length;
        $(this).parent().parent().prev().find("td input").each(function() {
            $(this).prop('disabled', false);
        });
        var prType = $("#prType").val();
        if (prType === "Service") {
            $(this).parent().parent().prev().find("td").each(function() {
                $(this).children(".materialCodeClass").prop("disabled", true);
            });
        }
        if (prType === "Material") {
            $(this).parent().parent().prev().find("td").each(function() {
                $(this).children(".poCriticality").prop("disabled", true);
                $(this).children(".matlGroup").prop("disabled", true);
            });
        }
        if (prlength === 1) {
            if (lobiboxNotifyAlert !== null) {
                lobiboxNotifyAlert.remove();
            }
            var errorMsg = "This PR can be deleted!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        } else {
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
                            calculatePBXXForHeaderInStandalone();
                            deleteRowFormConditionHeaderInStandAlone();
                            if (conditionLineLevelArraySA.length !== 0) {
                                console.log("conditionLineLevelArraySA before delete PR :" + JSON.stringify(conditionLineLevelArraySA));
                                conditionLineLevelArraySA.forEach(function(e, index) {
                                    if (linkidPr === e.linkid) {
                                        conditionLineLevelArraySA.splice(index, 1);
                                    }
                                });
                                console.log("conditionLineLevelArraySA after delete PR :" + JSON.stringify(conditionLineLevelArraySA));
                            }
                        }
                        var item = "";
                        var shortText = "";
                        var option = "<option>Select</option>";
                        $("#material_headerClass tbody tr").each(function() {
                            item = $(this).find("td").eq(1).text();
                            shortText = $(this).find("td").eq(6).children(".prShortText").val();
                            option += "<option value=" + item + ">" + item + " - " + shortText + "</option>";
                        });
                        var itemdropdown = $(".ItemNumberSelectClass").val();
                        $("#ItemNumberSelect option").remove();
                        $("#ItemNumberSelect").append(option);
                        if (itemdropdown !== "Select") {
                            $(".ItemNumberSelectClass").val("Select");
                            $('#hideLineLevelData').css("display", "none");
                        }
                        var isPRSaved = current.parent().parent().find("td").eq(0).children(".isLineLevelDataSavedSaved").val();
                        if (isPRSaved === "Yes") {
                            $.ajax({
                                type: "GET",
                                url: "standalonepoajaxrequest.do",
                                async: false,
                                data: {
                                    "reqFrom": "deleteDataFromDBForDeletedPRInStandAlonePO",
                                    "linkId": linkidPr
                                }
                            });
                        }
                        var taxCode = nextPr.find("td").eq(0).children(".TexCodeForLineInPr").val();
                        var confControl = nextPr.find("td").eq(0).children(".ConfirmationControlForLineInPr").val();
                        var segment = nextPr.find("td").eq(0).children(".SegmentForLineInPr").val();

                        $("#ConfirmationControlForLine").val(confControl);
                        $("#TexCodeForLine").val(taxCode);
                        $("#SegmentForLine").val(segment);
                    } else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        }
        var itemnumber = $(this).parent().parent().find("td").eq(1).html();
        var prNumber = $(this).parent().children(".prNumber").val();
        $("#referenceDocNumber > option").each(function() {
            if (prNumber === this.value && this.value !== '') {
                $(this).remove();
            }
        });
        $("#referenceDocLine > option").each(function() {
            if (itemnumber === this.value && this.value !== '') {
                $(this).remove();
            }
        });
//        $("#ItemNumberSelect option[value='" + itemnumber + "']").remove();


        var input = "";
        var itemInput = "";
        $("#material_headerClass tbody tr").each(function() {
            var prItem = $(this).find("td").eq(0).children(".prNumber").val();
            var itemNumber = $(this).find("td").eq(1).text();
            if (input === "") {
                input = prItem;
            } else {
                input = input + "~" + prItem;
            }
            if (itemInput === "") {
                itemInput = itemNumber;
            } else {
                itemInput = itemInput + "~" + itemNumber;
            }
        });
        $("#DeliveryScheduleTableId tbody tr").each(function() {
            $(this).find("td").eq(5).children(".prNumberDeliveryScheduledClass").find("option").remove();
            var inputarray = input.split("~");
            var optionsss = "<option>select</option>";
            for (var i = 0; i < inputarray.length; i++) {
                optionsss = optionsss + "<option>" + inputarray[i] + "</option>";
            }
            $(this).find("td").eq(5).children(".prNumberDeliveryScheduledClass").append(optionsss);
            $(this).find("td").eq(6).children(".reqItemNumberClass").find("option").remove();
            var itemNumberarray = itemInput.split("~");
            var itemNumberOptions = "<option>select</option>";
            for (var i = 0; i < itemNumberarray.length; i++) {
                itemNumberOptions = itemNumberOptions + "<option>" + itemNumberarray[i] + "</option>";
            }
            $(this).find("td").eq(6).children(".reqItemNumberClass").append(itemNumberOptions);
        });
        var length = $("#material_headerClass tbody tr").length;
        if (length === 0) {
            $("#hideLineLevelData").css("display", "none");
        }
    });

    $("#InstructionToWeigher").change(function() {
        var InstructionToWeigher = $(this).val();
        if (InstructionToWeigher === "SD_ALL GRADES") {
            $("#ZoneCollectionScrap").val("");
            $("#ZoneCollectionScrap").prop("disabled", true);
        } else {
            $("#ZoneCollectionScrap").prop("disabled", false);
        }
    });

    $("#confControlLimits").change(function() {
        var confirmationControlForLine = $("#ConfirmationControlForLine").val();
        var confControl = $(this).val();
        if (confirmationControlForLine === "") {
            $("#ConfirmationControlForLine").val(confControl);
        }
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
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
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                $(this).find("td").eq(0).children(".SegmentForLineInPr").val(segment);
            }
        });
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
            var matCode = $(this).parent().parent().find("td").eq(4).children(".materialCodeClass").val();
            console.log("CompanyCode: " + CompanyCode);
            console.log("matCode: " + matCode);
            if (matCode !== "" && CompanyCode !== "")
            {
                $("#overlay").css("display", "block");
                setTimeout(function() {
                    var jsonArr = getMaterialMasterOnLoadInStandalone(matCode, CompanyCode);
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
        prLineTableCurrentRow.find("td").eq(12).children(".prOrderPriceUnit").val(opu);
        $("#orderPriceUnitModal").modal("hide");

        // Update Order Price Unit on UI
        var ItemNumberSelect = $("#ItemNumberSelect").val();
        var insertonOrderId = prLineTableCurrentRow.find("td").eq(1).html().trim();
        console.log("ItemNumberSelect: " + ItemNumberSelect);
        console.log("insertonOrderId: " + insertonOrderId);
        if (ItemNumberSelect === insertonOrderId)
        {
            $("#unitOrderPriceUnit").val(opu);
        }
        // Update Order Price Unit in DB
        var linkId = prLineTableCurrentRow.find("td").eq(0).children(".linkid").val();
        updateOrderPriceUnitInQtyAndWtTabOfPoLineInSA(linkId, opu);
        updateConditionTableOnOPUChangeInSA(opu);
    });

    // Update OPU on change
    $("#material_headerClass").on("change", ".prOrderPriceUnit", function() {
        var insertonOrderId = $(this).parent().parent().find("td").eq(1).html().trim();
        var prMaterialCode = $(this).parent().parent().find("td").eq(4).children(".materialCodeClass").val();
        if (prMaterialCode !== "")
        {
            var opu = $(this).val();

            // Update Order Price Unit on UI
            var ItemNumberSelect = $("#ItemNumberSelect").val();
            console.log("ItemNumberSelect: " + ItemNumberSelect);
            console.log("insertonOrderId: " + insertonOrderId);
            if (ItemNumberSelect === insertonOrderId)
            {
                $("#unitOrderPriceUnit").val(opu);
            }

            // Update Order Price Unit in DB
            var linkId = $(this).parent().parent().find("td").eq(0).children(".linkid").val();
            updateOrderPriceUnitInQtyAndWtTabOfPoLineInSA(linkId, opu);
            updateConditionTableOnOPUChangeInSA(opu);
        }
    });

    $("#invoiceTaxes").click(function() {

        var item = "";
        var materialcode = '';
        var netValue = "";
        var currency = "";
        var per = 0;
//        $("#taxButtonModal").modal("show");
        var dropDownItemNumber = $("#ItemNumberSelect").val();

        $("#material_headerClass tbody tr").each(function() {
            var currentRow = $(this);
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                item = $(this).find("td").eq(1).text();
                materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
                netValue = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
                per = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
                currency = $(this).find("td").eq(11).children(".currencyClass").val();

                if (netValue !== "") {
                    $("#overlay").css("display", "block");
                    setTimeout(function() {
                        $("#taxButtonModal").modal("show");
                        var tax = taxFromTaxCodeInStandalone();

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
                    currentRow.find("td").eq(9).children(".prNetPrice").focus();
//                    $("#taxButtonModal").modal("hide");
                }
            }
        });
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

        if (serviceShortText === "" && serviceShortText.toString().trim() === "")
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

                    Lobibox.alert("success", {
                        msg: "Short text saved successfully!"
                    });
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

        if (serviceLineItemLongText === "" && serviceLineItemLongText.toString().trim() === "")
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

                    Lobibox.alert("success", {
                        msg: "Service line item long text saved successfully!"
                    });
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

        if (serviceText === "" && serviceText.toString().trim() === "")
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

                    Lobibox.alert("success", {
                        msg: "Service text saved successfully!"
                    });
                }
            });
        }
    });

    $("#conditionTableIdLineLevel").on("keypress", ".CurrencyLineLevel", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            conditioncurrentpossition = $(this).parent().parent();
            $("#overlay").css("display", "block");
            setTimeout(function() {
                getAllCurrencyInStandalone();
    //            $(".CurrencyDeliveryInvoiceCheckbox").prop("checked", false);
                $("#overlay").css("display", "none");
                $("#CurrencyMasterModal").modal("show");
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
                getAllCurrencyInStandalone();
    //            $(".CurrencyDeliveryInvoiceCheckbox").prop("checked", false);
                $("#overlay").css("display", "none");
                $("#CurrencyMasterModal").modal("show");
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

    var uomModalTable = null;
    $("#material_headerClass").on("keypress", ".prUom", function(e) {
        console.log("pickListKeyCode: " + pickListKeyCode);
	if (e.keyCode === Number(pickListKeyCode)) {
            console.log("prUom click");
            prLineTableCurrentRow = $(this).parent().parent();
            var CompanyCode = $("#companycodeHeader").val();
            var matCode = $(this).parent().parent().find("td").eq(4).children(".materialCodeClass").val();
            console.log("CompanyCode: " + CompanyCode);
            console.log("matCode: " + matCode);
            if (matCode !== "" && CompanyCode !== "")
            {
                $("#overlay").css("display", "block");
                setTimeout(function() {
                    var jsonArr = getMaterialMasterOnLoadInStandalone(matCode, CompanyCode);
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
                        var infoRecordJsonObj = fetchInfoRecordDetails(matCode);
                        console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));
                        if (orderUnit !== "")
                        {
                            if (Number(infoRecordJsonObj.mainCode) === 0) {
                                if (infoRecordJsonObj.BASE_UOM !== "") {
                                    baseUom = infoRecordJsonObj.BASE_UOM;
                                }
                            }
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

        var uom = $(this).text();
        console.log("uom: " + uom);

        prLineTableCurrentRow.find("td").eq(31).children(".prUom").val(uom);
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

            var CompanyCode = $("#companycodeHeader").val();
            var matCode = prLineTableCurrentRow.find("td").eq(4).children(".materialCodeClass").val();
            console.log("CompanyCode: " + CompanyCode);
            console.log("matCode: " + matCode);
            if (matCode !== "") {
                infoRecordJsonObj = fetchInfoRecordDetails(matCode);
                console.log("InfoRecord: " + JSON.stringify(infoRecordJsonObj));

                jsonArr = getMaterialMasterOnLoadInStandalone(matCode, CompanyCode);
                console.log("getMaterialMasterOnLoad jsonArr.length: " + jsonArr.length);

                if (jsonArr.length !== 0) {
                    convFrom = jsonArr[0].conversionFrom;
                    convTo = jsonArr[0].conversionTo;
                    baseUOM = jsonArr[0].baseUOM;

                    console.log("%cconvFrom 1: " + convFrom, "color: green");
                    console.log("%cconvTo 1: " + convTo, "color: green");
                    console.log("%cbaseUOM 1: " + baseUOM, "color: green");

                    if (Number(infoRecordJsonObj.mainCode) === 0) {
                        if (infoRecordJsonObj.CONV_NUM1 !== "") {
                            convFrom = infoRecordJsonObj.CONV_NUM1;
                        }
                        if (infoRecordJsonObj.CONV_DEN1 !== "") {
                            convTo = infoRecordJsonObj.CONV_DEN1;
                        }
                        if (infoRecordJsonObj.BASE_UOM !== "") {
                            baseUOM = infoRecordJsonObj.BASE_UOM;
                        }
                        if (infoRecordJsonObj.ORDERPR_UN !== "") {
                            unitOrderPriceUnit = infoRecordJsonObj.ORDERPR_UN;
                        } else {
                            unitOrderPriceUnit = uom;
                        }
                    }

                    console.log("%cconvFrom 2: " + convFrom, "color: green");
                    console.log("%cconvTo 2: " + convTo, "color: green");
                    console.log("%cbaseUOM 1: " + baseUOM, "color: green");

                    if (uom !== baseUOM) {
                        orderUnit2 = convTo;
                    } else if (uom === baseUOM) {
                        orderUnit2 = convFrom;
                    }
                }
            }

            pOUnit = uom;
            unitOrderUnit = uom;
            unitOrderUnit2 = uom;

            var ItemNumberSelect = $("#ItemNumberSelect").val();
            var insertonOrderId = prLineTableCurrentRow.find("td").eq(1).text();
            var linkId = prLineTableCurrentRow.find("td").eq(0).children(".linkid").val();
            if (ItemNumberSelect === insertonOrderId)
            {
                /**************************Update QtyWgts tab on UI*************************/
                $("#orderUnit2").val(formatAmountByComma(Number(orderUnit2).toFixed(2)));
                $("#pOUnit").val(pOUnit);
                $("#unitOrderUnit").val(unitOrderUnit);
                $("#unitOrderPriceUnit").val(unitOrderPriceUnit);
                $("#unitOrderUnit2").val(unitOrderUnit2);

                /**************************Update Condition Tab on UI*************************/
                /* Starts from here... */
                $("#conditionTableIdLineLevel tbody tr").each(function() {
                    $(this).find("td").eq(13).children(".numeratorLineLevel").val(convTo);
                    $(this).find("td").eq(14).children(".baseUoMLineLevel").val(uom);
                    $(this).find("td").eq(15).children(".denoForConvLineLevel").val(convFrom);
                });
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
            console.log("%cnetWeight: " + netWeight, "color: blue");
            console.log("%cgrossWeight: " + grossWeight, "color: blue");

            var QuantityWeightJsonObject = {};
            QuantityWeightJsonObject["LinkId"] = linkId;
            QuantityWeightJsonObject["POQuantityUnit"] = pOUnit;
            QuantityWeightJsonObject["OrderUnit1_Unit"] = unitOrderUnit;
            QuantityWeightJsonObject["OrderPriceUnit_Unit"] = unitOrderPriceUnit;
            QuantityWeightJsonObject["OrderUnit2"] = orderUnit2;
            QuantityWeightJsonObject["OrderUnit2_Unit"] = unitOrderUnit2;

            var QuantityWeightAsJsonString = JSON.stringify(QuantityWeightJsonObject);
            console.log("QuantityWeightAsJsonString: " + QuantityWeightAsJsonString);
            updateQuantityWeightsOnUomChange(QuantityWeightAsJsonString);

            /**************************Update Condition Tab in DB*************************/
            /* Starts from here... */

            $("#overlay").css("display", "none");
        }, 1000);
    });
    
    // Open components in modal from material tab
    $("#componentPopUpBtn").click(function() {
        console.log("componentPopUpBtn click");
        $("#componentsModal").modal("show");
        $("#componentsModal").css({
            "padding-right": 430,
            "padding-left": 0,
            "padding-top": 70
        });
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

function deleteRowFormConditionInStandAlone(reqFrom) {
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
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                ctype = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if (expNetPriceArr[i].trim() === ctype.trim()) {
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
//    alert(expZBordercrossingvalueArr);
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
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                priceUnit = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
            }
        });
        $("#conditionTableIdLineLevel tbody tr").each(function() {
            var perunit = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel").val());
            var conditiontype = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            console.log("conditiontype on netprice :" + conditiontype + " ,perunit :" + perunit);
            if ((perunit === "" || perunit === "0.00" || perunit === 0) && conditiontype !== "" && conditiontype !== "ZNAV" && conditiontype !== "NAVS" && conditiontype !== "JEXS") {
                $(this).find("td").eq(5).children(".PerQuantityLineLavel").val(formatAmountByComma(Number(priceUnit).toFixed(2)));
            }
        });
    }

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
    var perQuant = 0;

    console.log("conditionLineLevelArraySA bittu :" + JSON.stringify(conditionLineLevelArraySA));
    var indexnumber = possition.parent().parent().find("td").eq(0).children(".conditionindex").val();
    var conditiontype = possition.parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
    var flag = false;

    for (var p = 0; p < conditionLineLevelArraySA.length; p++) {
        if (conditiontype === conditionLineLevelArraySA[p].Ctype && indexnumber === conditionLineLevelArraySA[p].indexnumber) {
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
            conditionLineLevelArraySA[p].amount = (Number(amount)).toString();
            conditionLineLevelArraySA[p].per = (Number(perQuant)).toString();
            conditionLineLevelArraySA[p].oldAmountHidden = (possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val()).toString();
            conditionLineLevelArraySA[p].oldPerHidden = (Number(removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val()))).toString();
//            conditionLineLevelArray[p].oldConditionValue = conditionLineLevelArray[p].oldConditionValue;
            var abort = false;
            for (var k = 0; k < conditionAmountJsonArray.length && !abort; k++) {
                if (conditionLineLevelArraySA[p].linkid === conditionAmountJsonArray[k].LinkID) {
                    conditionLineLevelArraySA[p].conditionValue = (Number(conditionAmountJsonArray[k].condValue)).toString();
//                    conditionLineLevelArray[p].oldConditionValue = (Number(possition.parent().parent().find("td").eq(8).children(".ConditionValueHeader").val())).toString();
                    abort = true;
                }
            }
            flag = true;
        }
    }

    conditionLineLevelArraySATemp = [];
    var itemCode = $("#ItemNumberSelect").val();
    var poCurrency = $("#CurrencyDeliveryInvoice").val();
    var prCurrency;
    var linkid;
    var prCount = $("#material_headerClass tbody tr").length;
    $("#material_headerClass tbody tr").each(function() {
        conditionLineLevelObject = {};
        prCurrency = $(this).find("td").eq(11).children(".currencyClass").val();
        linkid = $(this).find("td").eq(0).children(".linkid").val();
        conditionLineLevelObject["vendorcode"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderVendorCode").val();
        conditionLineLevelObject["vendorname"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderVendorName").val();
        conditionLineLevelObject["conditionVendor"] = possition.parent().parent().find("td").eq(0).children(".conditionVendorHeader").val();
        conditionLineLevelObject["itemCode"] = itemCode;
        conditionLineLevelObject["conditionKAPPL"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderKAPPL").val();
        conditionLineLevelObject["conditionKVSL1"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderKVSL1").val();
        conditionLineLevelObject["conditionKVSL2"] = possition.parent().parent().find("td").eq(11).children(".conditionHeaderKVSL2").val();
        conditionLineLevelObject["conditionZAEHK"] = (possition.parent().parent().find("td").eq(11).children(".conditionHeaderZAEHK").val()).toString();
        conditionLineLevelObject["conditionSTUNR"] = (possition.parent().parent().find("td").eq(11).children(".conditionHeaderSTUNR").val()).toString();
        conditionLineLevelObject["Ctype"] = possition.parent().parent().find("td").eq(1).children(".ConditionTypeHeader").val();
        conditionLineLevelObject["Cname"] = possition.parent().parent().find("td").eq(2).children(".nameConditionsHeader").val();
        conditionLineLevelObject["prCurrency"] = possition.parent().parent().find("td").eq(4).children(".CurrencyHeader").val();
        ;
        conditionLineLevelObject["Currency2"] = "SGD";
        conditionLineLevelObject["ConditionValue2"] = "0.00";
        conditionLineLevelObject["ConditionPricingUnit"] = possition.parent().parent().find("td").eq(6).children(".ConditionPricingUnitHeader").val();
        conditionLineLevelObject["UoM"] = possition.parent().parent().find("td").eq(7).children(".UoMHeader").val();
        conditionLineLevelObject["oldAmountHidden"] = possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val();
        conditionLineLevelObject["oldPerHidden"] = possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeaderHidden").val();
        conditionLineLevelObject["oldConditionValue"] = removeCommaInNumber(possition.parent().parent().find("td").eq(8).children(".ConditionValueHeaderHidden").val());
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
//        conditionLineLevelObject["amount"] = (Number(possition.parent().parent().find("td").eq(3).children(".newAmountHeader").val())).toString();
        if (possition.parent().parent().find("td").eq(5).children("input").hasClass("PerQuantityHeader") === true) {
            perQuant = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".PerQuantityHeader").val());
        } else if (possition.parent().parent().find("td").eq(5).children("input").hasClass("newPerQuantityHeader") === true) {
            perQuant = removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val());
        }
        conditionLineLevelObject["per"] = (Number(perQuant)).toString();
//        conditionLineLevelObject["per"] = (Number(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val())).toString();
        conditionLineLevelObject["addedFrom"] = "headerlevel";
        conditionLineLevelObject["indexnumber"] = possition.parent().parent().find("td").eq(0).children(".conditionindex").val();
        for (var k = 0; k < conditionAmountJsonArray.length; k++) {
            if (linkid === conditionAmountJsonArray[k].LinkID) {
                conditionLineLevelObject["conditionValue"] = (Number(conditionAmountJsonArray[k].condValue)).toString();
                break;
            }
        }
        if (flag === false) {
            conditionLineLevelArraySA.push(conditionLineLevelObject);
        }
        conditionLineLevelArraySATemp.push(conditionLineLevelObject);
    });

//    if (amountHeaderHidden !== "") {
//        conditionLineLevelArraySATemp.forEach(function(k) {
//            var ctype = k.Ctype;
//            $("#conditionTableIdLineLevel tbody tr").each(function() {
//                if (ctype === $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val()) {
//                    $(this).remove();
//                }
//            });
//        });
    deleteRowFormConditionInStandAlone("");
//    }

    var prlinkid;
    var uom = "";
    var materialcode = "";
    var opu = "";
    var dropDownItemNumber = $("#ItemNumberSelect").val();
    $("#material_headerClass tbody tr").each(function() {
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            prlinkid = $(this).find("td").eq(0).children(".linkid").val();
            uom = $(this).find("td").eq(31).children(".prUom").val();
            materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            opu = $(this).find("td").eq(12).children(".prOrderPriceUnit").val();
        }
    });
    console.log("1. uom: " + uom + ", opu: " + opu + ", materialcode: " + materialcode);

    var convTo = "";
    var convFrom = "";
    var CompanyCode = $("#companycodeHeader").val();
    if ($("#prType").val() === "Material") {
        var jsonArr = getMaterialMasterOnLoadInStandalone(materialcode, CompanyCode);
        if (jsonArr.length !== 0) {
            if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                convTo = jsonArr[0].conversionTo;
                convFrom = jsonArr[0].conversionFrom;
            }
        }
        var infoRecordJsonObj = fetchInfoRecordDetails(materialcode);
        convTo = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? convTo : infoRecordJsonObj.CONV_NUM1;
        convFrom = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? convFrom : infoRecordJsonObj.CONV_DEN1;
        uom = infoRecordJsonObj.PO_UNIT === "" || infoRecordJsonObj.PO_UNIT === undefined ? uom : infoRecordJsonObj.PO_UNIT;
        opu = infoRecordJsonObj.ORDERPR_UN === "" || infoRecordJsonObj.ORDERPR_UN === undefined ? opu : infoRecordJsonObj.ORDERPR_UN;
        console.log("2. convTo: " + convTo + ", convFrom: " + convFrom + ", uom: " + uom + ", opu: " + opu);
    }
    var newColumnDetails = {};
    newColumnDetails["convTo"] = convTo;
    newColumnDetails["convFrom"] = convFrom;
    newColumnDetails["baseUom"] = uom;
    newColumnDetails["uomExtra"] = opu;
    newColumnDetails["status"] = "false";

    console.log("prlinkid :" + prlinkid);
    console.log("conditionLineLevelArraySA :" + JSON.stringify(conditionLineLevelArraySA));
    console.log("conditionLineLevelArraySATemp :" + JSON.stringify(conditionLineLevelArraySATemp));
    var length = $("#conditionTableIdLineLevel tbody tr").length;
    var count = 1;
    var prCount = $("#material_headerClass tbody tr").length;
    var condType;
    var amount;
    var per;
    var condValue;
    var changeId = "";
    conditionLineLevelArraySATemp.forEach(function(e) {
        console.log("Ctype :" + e.Ctype);
        var rows = $("#conditionTableIdLineLevel tbody tr");
        if (prlinkid === e.linkid) {
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
                        var totalamount = calculatetotalamountSA(condType, prlinkid);
                        var totalper = calculatetotaperSA(condType, prlinkid);
                        if (Number(totalamount) !== Number(amount) || Number(totalper) !== per) {
                            $(rows[j]).find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma(Number((Number(amount) + Number(e.amount) - Number(e.oldAmountHidden))).toFixed(2)));
                            $(rows[j]).find("td").eq(5).children(".newPerQuantityLineLavel").val(formatAmountByComma(Number(Number(per) + Number(e.per) - Number(e.oldPerHidden)).toFixed(2)));
                            console.log("condValue :" + condValue + " ,e.conditionValue :" + e.conditionValue + " ,e.oldConditionValue :" + e.oldConditionValue);
                            $(rows[j]).find("td").eq(8).children(".ConditionValueLineLevel").val(formatAmountByComma(Number(Number(condValue) + Number(e.conditionValue) - Number(e.oldConditionValue)).toFixed(2)));
                        }
                    }
                    break;
                } else if (condType !== e.Ctype || (condType === e.Ctype && addedFrom !== "headerlevel")) {
                    if (length === count) {
                        console.log("condType in else[" + j + "]:" + condType + " ,Ctype :" + e.Ctype);
                        var row = "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor' value='" + e.vendorcode + "'><input type='hidden' class='lineAddedFromLineLevel' value='headerlevel'></td>"
                                + "<td><input type='text' class='form-control form-rounded newConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' disabled value='" + e.Ctype + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded NameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' disabled value='" + e.Cname + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded newAmountLineLevel tableInputField' name='AmountLineLevel' style='width: 150px;' disabled value='" + formatAmountByComma(Number(e.amount).toFixed(2)) + "'><input type='hidden' class='AmountLineLevelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' disabled value=" + e.prCurrency + "></td>"
                                + "<td><input type='text' class='form-control form-rounded newPerQuantityLineLavel tableInputField' name='PerQuantityLineLavel' style='width: 150px;' disabled value='" + formatAmountByComma(Number(e.per).toFixed(2)) + "'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' disabled value=" + e.ConditionPricingUnit + "></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' disabled value=" + e.UoM + "></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width: 150px;' disabled value='" + formatAmountByComma(e.conditionValue) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' disabled = 'true' value='" + e.Currency2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' disabled value='" + e.ConditionValue2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled value='" + e.Conditioncurrency + "'></td>"
                                + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel'></td>"
                                + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' min='0' disabled name='numeratorLineLevel' value='" + convTo + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' disabled name='baseUoMLineLevel' value='" + uom + "'></td>"
                                + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' disabled min='0' name='denoForConvLineLevel' value='" + convFrom + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' disabled name='uOMExtraLineLevel' value='" + opu + "'></td>"
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
//            calculateConditionValueInStandAlone(amount, conType, per, "", oldAmountLine, oldPerLine);
            deleteRowFormConditionInStandAlone("");
            var conditionType;
            $("#conditionTableIdLineLevel tbody tr").each(function() {
                if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                    conditionType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
                } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                    conditionType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
                }
                if (conType === conditionType) {
                    $(this).find("td").eq(3).children(".AmountLineLevelHidden").val(amount);
                    $(this).find("td").eq(5).children(".PerQuantityLineLavelHidden").val(amount);
                }
            });
            calculateConditionValueHeaderInStandAlone(Number(amount) * Number(prCount), conType, Number(per) * Number(prCount), oldAmount, oldPercentage);

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
            "conditiontype": conditiontype,
            "newColumnDetails": JSON.stringify(newColumnDetails)
        }
    });

    for (var p = 0; p < conditionLineLevelArraySA.length; p++) {
        if (conditiontype === conditionLineLevelArraySA[p].Ctype && indexnumber === conditionLineLevelArraySA[p].indexnumber) {
            var abort = false;
            conditionLineLevelArraySA[p].oldAmountHidden = Number(possition.parent().parent().find("td").eq(3).children(".newAmountHeaderHidden").val()).toString();
            conditionLineLevelArraySA[p].oldPerHidden = (Number(removeCommaInNumber(possition.parent().parent().find("td").eq(5).children(".newPerQuantityHeader").val()))).toString();
            for (var k = 0; k < conditionAmountJsonArray.length && !abort; k++) {
                if (conditionLineLevelArraySA[p].linkid === conditionAmountJsonArray[k].LinkID) {
                    conditionLineLevelArraySA[p].oldConditionValue = (Number(conditionAmountJsonArray[k].condValue)).toString();
                    abort = true;
                }
            }
            flag = true;
        }
    }
}
function addTOLineConditionOnItemChangeInStandAlone() {
    var condType;
    var amount;
    var condValue;
    var per;
    var prlinkid;
    var dropDownItemNumber = $("#ItemNumberSelect").val();
    var prCount = $("#material_headerClass tbody tr").length;
    $("#material_headerClass tbody tr").each(function() {
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            prlinkid = $(this).find("td").eq(0).children(".linkid").val();
        }
    });
    console.log("prlinkid :" + prlinkid);
    console.log("conditionLineLevelArraySA :" + JSON.stringify(conditionLineLevelArraySA));
    conditionLineLevelArraySA.forEach(function(e) {
        var count = 1;
        var length = $("#conditionTableIdLineLevel tbody tr").length;
        var rows = $("#conditionTableIdLineLevel tbody tr");
        console.log("rows length ;" + rows.length);
        console.log("Clength :" + length);
        console.log("Ctype :" + e.Ctype);
        if (prlinkid === e.linkid) {
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
                        var totalamount = calculatetotalamountSA(condType, prlinkid);
                        var totalper = calculatetotaperSA(condType, prlinkid);
                        if (Number(totalamount) !== Number(amount) || Number(totalper) !== per) {
                            $(rows[j]).find("td").eq(3).children(".newAmountLineLevel").val(formatAmountByComma(Number((Number(amount) + Number(e.amount))).toFixed(2)));
                            $(rows[j]).find("td").eq(5).children(".newPerQuantityLineLavel").val(formatAmountByComma(Number(Number(per) + Number(e.per)).toFixed(2)));
                            alert("condValue :" + condValue + " ,e.conditionValue :" + e.conditionValue);
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
                                + "<td><input type='text' class='form-control form-rounded NameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' value='" + e.Cname + "' disabled></td>"
                                + "<td><input type='text' class='form-control form-rounded newAmountLineLevel tableInputField' name='AmountLineLevel' style='width: 150px;' disabled value='" + formatAmountByComma(Number(e.amount).toFixed(2)) + "'><input type='hidden' class='AmountLineLevelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel' disabled value=" + e.prCurrency + "></td>"
                                + "<td><input type='text' class='form-control form-rounded newPerQuantityLineLavel tableInputField' name='PerQuantityLineLavel' style='width: 150px;' disabled value='" + formatAmountByComma(Number(e.per).toFixed(2)) + "'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel' disabled value=" + e.ConditionPricingUnit + "></td>"
                                + "<td><input type='text' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel' disabled value=" + e.UoM + "></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width: 150px;' disabled value='" + formatAmountByComma(e.conditionValue) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' disabled = 'true' value='" + e.Currency2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionValue2LineLevel tableInputField' value='0.00' name = 'ConditionValue2LineLevel' disabled value='" + e.ConditionValue2 + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' disabled value='" + e.Conditioncurrency + "'></td>"
                                + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel'></td>"
                                + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' min='0' disabled name='numeratorLineLevel'></td>"
                                + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' disabled name='baseUoMLineLevel'></td>"
                                + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' min='0' disabled name='denoForConvLineLevel'></td>"
                                + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' disabled name='uOMExtraLineLevel'></td>"
                                + "<td><input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value='" + e.conditionKAPPL + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value='" + e.conditionKVSL1 + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value='" + e.conditionKVSL2 + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value='" + e.conditionZAEHK + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value='" + e.conditionSTUNR + "'>\n\
                                    <input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='" + e.CHANGEID + "'>\n\
                                    <i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRowLineLevel' aria-hidden='true' style='width:30px;'></i></td>"
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
            calculateConditionValueInStandAlone(amount, conType, per, "", oldAmount, oldPercentage);
//                deleteRowFormConditionInStandAlone("");
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

function calculateConditionValueHeaderInStandAlone(conAmount, conType, perQty, oldAmount, oldPercentage) {


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
    //        alert(PriceInclofdiscSurcharge);
    var conPerQty;
    var totalFreightArr = (expTotalFreight.toString()).split('+');
    for (var i = 0; i < totalFreightArr.length; i++) {
        if (totalFreightArr[i].trim() === conType.trim()) {
            $("#conditionTableId tbody tr").each(function() {
                var conName = $(this).find("td").eq(2).children(".nameConditionsHeader").val();
                amount = removeCommaInNumber($(this).find("td").eq(3).children("input[name=AmountHeader]").val());
                conPerQty = removeCommaInNumber($(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val());
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma((Number(perQty) + Number(conPerQty)).toFixed(2)));
                    } else {
                        $(this).find("td").eq(5).children("input[name=PerQuantityHeader]").val(formatAmountByComma(((Number(perQty) + Number(conPerQty)).toFixed(2) - Number(oldPercentage).toFixed(2)).toFixed(2)));
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
//        alert(PriceInclofdiscSurchargeCondValue);
}

function deleteRowFormConditionHeaderInStandAlone() {

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
    //        alert(PriceInclofdiscSurcharge);
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
//    alert(expZBordercrossingvalueArr);
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

function calculatePBXXForHeaderInStandalone() {
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
        Quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
        netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
        perQuant = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());

//        totalQuantity = Number(totalQuantity) + Number(Quantity);
        if (Quantity !== "" && netPrice !== "" && perQuant !== "") {
            totalNetPrice = Number(totalNetPrice) + Number(netPrice);
            toalPerQuant = Number(toalPerQuant) + Number(perQuant);

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
                    totalConditionValue = Number(totalConditionValue) + Number(condValue);
                    console.log("exp :" + exp);
                    console.log("totalConditionValue bittu:" + totalConditionValue);
                    $(this).find("td").eq(3).children(".AmountHeader").val(formatAmountByComma(Number(totalNetPrice).toFixed(2)));
                    $(this).find("td").eq(5).children(".PerQuantityHeader").val(formatAmountByComma(Number(toalPerQuant).toFixed(2)));
                    $(this).find("td").eq(8).children(".ConditionValueHeader").val(formatAmountByComma(Number(totalConditionValue).toFixed(2)));
                    deleteRowFormConditionHeaderInStandAlone();
                }
            });
        }
    });
}

function getExchangeRateHeader(toCurrency, fromCurrency) {
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
            exchangeRate = obj.ExchangeRate;
        }
    });
    return exchangeRate;
}

function getNGBPCmplxPOCreationLineItemPOAccountAssignment(linkid) {
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getNGBPCmplxPOCreationLineItemPOAccountAssignment",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            var tdrow = "";
//            var table_tr;
            var distribution = $("#distribution").val();
            if (jsonArr.length === 1) {
                $("#distribution").val("Single Account Assignment");
                $("#unloadingPoint").val(jsonArr[0].unloadingPoint);
                $("#recipient").val(jsonArr[0].recepient);
                $("#gLAccount").val(jsonArr[0].glAccount);
                $("#coArea").val(jsonArr[0].coArea);
                $("#costCenterAccAsgn").val(jsonArr[0].costCenter);
                $("#accAsgnOrder").val(jsonArr[0].order);
                $("#accAsgnAsset").val(jsonArr[0].asset);
                $("#accAsgnWBSElementInput").val(jsonArr[0].wbsElement);
                $("#accAsgnSalesOrder").val(jsonArr[0].salesOrder);
                $("#assAsgnItemNumber").val(jsonArr[0].itemNumber);
                $("#assAsgnDelivSch").val(jsonArr[0].deliverySchedule);
                $("#accAsgnfund").val(jsonArr[0].fund);
                $("#accAsgnfunctionalArea").val(jsonArr[0].functionalArea);
                $("#accAsgnFundCenterInput").val(jsonArr[0].fundCenter);
                $("#accAsgnCommItemInput").val(jsonArr[0].commitmentItem);
                $("#accAsgnNActNumInput").val(jsonArr[0].network);
                $("#accountAssngSerialNumber").val(jsonArr[0].serialNumber === undefined ? "" : jsonArr[0].serialNumber);

                $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
                $("#saveAccAsgnFieldBtn").css("display", "none");
                $(".multipleCostCenterDiv").css("display", "none");
                $(".costCenterDiv").css("display", "block");

                ArrayIsEmptyOnLineItemChange();
            } else {
                $("#distribution").val("Distrib. By Percentage");
                $(".multipleCostCenterDiv").css("display", "block");
                $(".costCenterDiv").css("display", "none");
                $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "none");
                for (var i = 0; i < jsonArr.length; i++) {
                    $("#POAccAssPartialInvoiceIndicator").val(jsonArr[i].partialInvoiceIndicator === undefined ? "" : jsonArr[i].partialInvoiceIndicator);
                    $("#costCenteraccountAssignmentTebleId tbody tr").remove();
                    console.log("Quantity after save :" + jsonArr[i].quantity);
                    var quantity = parseFloat(jsonArr[i].quantity).toFixed(1);
                    var percentage = parseFloat(jsonArr[i].percentage).toFixed(1);
                    tdrow += "<tr><td><input type='hidden' class='accAsgnSerialNo' value=" + jsonArr[i].serialNumber + ">" +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" max=' + quantity + ' value=' + formatNumberByComma(quantity) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" max=' + percentage + ' value=' + formatAmountByComma(percentage) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (jsonArr[i].unloadingPoint === undefined ? "" : jsonArr[i].unloadingPoint) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (jsonArr[i].recipient === undefined ? "" : jsonArr[i].recipient) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (jsonArr[i].asset === undefined ? "" : jsonArr[i].asset) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (jsonArr[i].wbsElement === undefined ? "" : jsonArr[i].wbsElement) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>' +
                            "</td></tr>";
                }
                $("#costCenteraccountAssignmentTebleId tbody").append(tdrow);
            }
            $("#FromServiceAccountAssignment").val("afterServiceAccAsgnSave");
//            var distribution = $("#distribution").val();
            if (distribution === "Single Account Assignment") {
                $("#costCenteraccountAssignmentTebleId input").prop("disabled", true);
            }
            $("#distribution").prop("disabled", true);
        }
    });
}

function getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange(linkid, reqFrom) {
    var prType = $("#prType").val();
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            var tdrow = "";
            var table_tr;

            if (jsonArr.length > 0) {
                if (prType === "Service") {
                    $("#FromServiceAccountAssignment").val("afterServiceAccAsgnSave");
                    var poType = "Service";
                    ArrayIsNotEmptyOnLineItemChange(jsonArr, poType, reqFrom);
//                    if (reqFrom === 'itemCatDropDown') {
//                        $(".multipleCostCenterDiv").css("display", "block");
//                        $(".costCenterDiv").css("display", "none");
//                    }
                } else if (prType === "Material") {
                    var distribution = jsonArr[0].distribution;
                    console.log("distribution on Line Itemchnage :" + distribution);
                    if (distribution === "") {
                        $("#distribution").val("Single Account Assignment");
                        for (var i = 0; i < jsonArr.length; i++) {
                            $("#unloadingPoint").val(jsonArr[i].unloadingPoint === undefined ? "" : jsonArr[i].unloadingPoint);
                            $("#recipient").val(jsonArr[i].recipient === undefined ? "" : jsonArr[i].recipient);
                            $("#gLAccount").val(jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount);
                            $("#coArea").val(jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea);
                            $("#costCenterAccAsgn").val(jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter);
                            $("#accAsgnOrder").val(jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder);
                            $("#accAsgnAsset").val(jsonArr[i].asset === undefined ? "" : jsonArr[i].asset);
                            $("#accAsgnWBSElementInput").val(jsonArr[i].wbsElement === undefined ? "" : jsonArr[i].wbsElement);
                            $("#accAsgnSalesOrder").val(jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder);
                            $("#assAsgnItemNumber").val(jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber);
                            $("#assAsgnDelivSch").val(jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule);
                            $("#accAsgnfund").val(jsonArr[i].fund === undefined ? "" : jsonArr[i].fund);
                            $("#accAsgnfunctionalArea").val(jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea);
                            $("#accAsgnFundCenterInput").val(jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre);
                            $("#accAsgnCommItemInput").val(jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem);
                            $("#accAsgnNActNumInput").val(jsonArr[i].network === undefined ? "" : jsonArr[i].network);
                            $("#POAccAssPartialInvoiceIndicator").val(jsonArr[i].partialInvoiceIndicator === undefined ? "" : jsonArr[i].partialInvoiceIndicator);
                            ArrayIsEmptyOnLineItemChange();
                            if (reqFrom === 'itemCatDropDown') {
                                $(".multipleCostCenterDiv").css("display", "none");
                                $(".costCenterDiv").css("display", "block");
                            }
                        }
                    } else if (distribution === "1" || distribution === "2") {
                        if (distribution === "1") {
                            $("#distribution").val("Distrib. On Quantity Basis");
                        } else if (distribution === "2") {
                            $("#distribution").val("Distrib. By Percentage");
                        }
                        var poType = "Material";
                        ArrayIsNotEmptyOnLineItemChange(jsonArr, poType, reqFrom);
                        if (reqFrom === 'itemCatDropDown') {
                            $(".multipleCostCenterDiv").css("display", "block");
                            $(".costCenterDiv").css("display", "none");
                        }
                        var distribution = $("#distribution").val();
                        if (distribution === "Distrib. On Quantity Basis") {
                            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                                $(this).find("td").eq(2).children(".accAsgnPercentage").prop("disabled", true);
                            });
                        } else if (distribution === "Distrib. By Percentage") {
                            $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                                $(this).find("td").eq(1).children(".accAsgnQuantity").prop("disabled", true);
                            });
                        }
                    }
                }
            } else {
                ArrayIsEmptyOnLineItemChange();
                $(".costCenterDiv :input").val("");
                $("#distribution").val("Single Account Assignment");
                var gLCode = "";
                var zGLCOde = "";
                $("#material_headerClass tbody tr").each(function() {
                    var dropDownItemNumber = $("#ItemNumberSelect").val();
                    var prTableItemNumber = $(this).find("td").eq(1).html();
                    if (prTableItemNumber === dropDownItemNumber) {
                        gLCode = $(this).find("td").eq(0).children(".prgLCode").val();
                        zGLCOde = $(this).find("td").eq(0).children(".przGLCode").val();
                    }
                });
                var category = $("#accountAssignmentCategory").val();
                if (category !== "Z") {
                    $("#gLAccount").val(gLCode);
                    $("#gLAccountService").val(gLCode);
                    $("#accAsgnCommItemInput").val(gLCode);
                }
                if (category === "Z") {
                    $("#gLAccount").val(zGLCOde);
                    $("#gLAccountService").val(zGLCOde);
                    $("#accAsgnCommItemInput").val(zGLCOde);
                }

                if (reqFrom === 'itemCatDropDown') {
                    $(".multipleCostCenterDiv").css("display", "none");
                    $(".costCenterDiv").css("display", "block");
                }
                if (prType === "Service") {
                    $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
                }
            }
        }
    });
}
function ArrayIsNotEmptyOnLineItemChange(jsonArr, poType, reqFrom) {
    $("#costCenteraccountAssignmentTebleId tbody tr").remove();
    var tdrow = "";
    if (poType === "Service") {
        if (jsonArr.length === 1) {
            $("#distribution").val("Single Account Assignment");

//            $("#unloadingPoint").val(jsonArr[0].unloadingPoint);
//            $("#recipient").val(jsonArr[0].recepient);
//            $("#gLAccount").val(jsonArr[0].glAccount);
//            $("#coArea").val(jsonArr[0].coArea);
//            $("#costCenterAccAsgn").val(jsonArr[0].costCenter);
//            $("#accAsgnOrder").val(jsonArr[0].order);
//            $("#accAsgnAsset").val(jsonArr[0].asset);
//            $("#accAsgnWBSElementInput").val(jsonArr[0].wbsElement);
//            $("#accAsgnSalesOrder").val(jsonArr[0].salesOrder);
//            $("#assAsgnItemNumber").val(jsonArr[0].itemNumber);
//            $("#assAsgnDelivSch").val(jsonArr[0].deliverySchedule);
//            $("#accAsgnfund").val(jsonArr[0].fund);
//            $("#accAsgnfunctionalArea").val(jsonArr[0].functionalArea);
//            $("#accAsgnFundCenterInput").val(jsonArr[0].fundCenter);
//            $("#accAsgnCommItemInput").val(jsonArr[0].commitmentItem);
//            $("#accAsgnNActNumInput").val(jsonArr[0].network);

            $("#accountAssngSerialNumber").val(jsonArr[0].serialNumber === undefined ? "" : jsonArr[0].serialNumber);
            $("#unloadingPoint").val(jsonArr[0].unloadingPoint === undefined ? "" : jsonArr[0].unloadingPoint);
            $("#recipient").val(jsonArr[0].recipient === undefined ? "" : jsonArr[0].recipient);
            $("#gLAccount").val(jsonArr[0].glAccount === undefined ? "" : jsonArr[0].glAccount);
            $("#coArea").val(jsonArr[0].coArea === undefined ? "" : jsonArr[0].coArea);
            $("#costCenterAccAsgn").val(jsonArr[0].costCenter === undefined ? "" : jsonArr[0].costCenter);
            $("#accAsgnOrder").val(jsonArr[0].accOrder === undefined ? "" : jsonArr[0].accOrder);
            $("#accAsgnAsset").val(jsonArr[0].asset === undefined ? "" : jsonArr[0].asset);
            $("#accAsgnWBSElementInput").val(jsonArr[0].wbsElement === undefined ? "" : jsonArr[0].wbsElement);
            $("#accAsgnSalesOrder").val(jsonArr[0].salesOrder === undefined ? "" : jsonArr[0].salesOrder);
            $("#assAsgnItemNumber").val(jsonArr[0].itemNumber === undefined ? "" : jsonArr[0].itemNumber);
            $("#assAsgnDelivSch").val(jsonArr[0].deliverySchedule === undefined ? "" : jsonArr[0].deliverySchedule);
            $("#accAsgnfund").val(jsonArr[0].fund === undefined ? "" : jsonArr[0].fund);
            $("#accAsgnfunctionalArea").val(jsonArr[0].functionalArea === undefined ? "" : jsonArr[0].functionalArea);
            $("#accAsgnFundCenterInput").val(jsonArr[0].fundsCentre === undefined ? "" : jsonArr[0].fundsCentre);
            $("#accAsgnCommItemInput").val(jsonArr[0].commitmentItem === undefined ? "" : jsonArr[0].commitmentItem);
            $("#accAsgnNActNumInput").val(jsonArr[0].network === undefined ? "" : jsonArr[0].network);

            $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
            $("#saveAccAsgnFieldBtn").css("display", "none");
            $(".multipleCostCenterDiv").css("display", "none");
            $(".costCenterDiv").css("display", "block");

            ArrayIsEmptyOnLineItemChange();
        } else {
            $(".multipleCostCenterDiv").css("display", "block");
            $(".costCenterDiv").css("display", "none");
            $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "none");
            $("#distribution").val("Distrib. By Percentage");
            for (var i = 0; i < jsonArr.length; i++) {
//            if (jsonArr[i].distribution === "1") {
//                $("#distribution").val("Distrib. On Quantity Basis");
//            } else if (jsonArr[i].distribution === "2") {
//                  $("#distribution").val("Distrib. By Percentage");
//            }
                var quantity = parseFloat(jsonArr[i].quantity).toFixed(1);
                var percentage = parseFloat(jsonArr[i].percentage).toFixed(1);
                $("#POAccAssPartialInvoiceIndicator").val(jsonArr[i].partialInvoiceIndicator === undefined ? "" : jsonArr[i].partialInvoiceIndicator);
                console.log("Quantity after save :" + jsonArr[i].quantity);
                tdrow += "<tr><td><input type='hidden' class='accAsgnSerialNo' value='" + jsonArr[i].serialNumber + "'>" +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" max=' + (quantity) + ' value=' + formatNumberByComma(quantity) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" max=' + (percentage) + ' value=' + formatAmountByComma(percentage) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (jsonArr[i].unloadingPoint === undefined ? "" : jsonArr[i].unloadingPoint) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (jsonArr[i].recipient === undefined ? "" : jsonArr[i].recipient) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (jsonArr[i].asset === undefined ? "" : jsonArr[i].asset) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (jsonArr[i].wbsElement === undefined ? "" : jsonArr[i].wbsElement) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>' +
                        "</td></tr>";
            }
        }
    } else if (poType === "Material") {
        for (var i = 0; i < jsonArr.length; i++) {
            $("#POAccAssPartialInvoiceIndicator").val(jsonArr[i].partialInvoiceIndicator === undefined ? "" : jsonArr[i].partialInvoiceIndicator);
            console.log("Quantity after save :" + jsonArr[i].quantity);
            var quantity = parseFloat(jsonArr[i].quantity).toFixed(1);
            var percentage = parseFloat(jsonArr[i].percentage).toFixed(1);
            if (i === 0) {
                tdrow += "<tr><td><input type='hidden' class='accAsgnSerialNo' value='" + jsonArr[i].serialNumber + "'>" +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" max=' + (quantity) + ' value=' + formatNumberByComma(quantity) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" max=' + (percentage) + ' value=' + formatAmountByComma(percentage) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (jsonArr[i].unloadingPoint === undefined ? "" : jsonArr[i].unloadingPoint) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (jsonArr[i].recipient === undefined ? "" : jsonArr[i].recipient) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (jsonArr[i].asset === undefined ? "" : jsonArr[i].asset) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (jsonArr[i].wbsElement === undefined ? "" : jsonArr[i].wbsElement) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>' +
                        "</td></tr>";
            } else {
                tdrow += "<tr><td><i class='fa fa-window-close deleteAccAsgnTableRowClass' aria-hidden='true' style='width:22px;'></i>\n\
                    <input type='hidden' class='accAsgnSerialNo' value='" + jsonArr[i].serialNumber + "'>" +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" max=' + (quantity) + ' value=' + formatNumberByComma(quantity) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" max=' + (percentage) + ' value=' + formatAmountByComma(percentage) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (jsonArr[i].unloadingPoint === undefined ? "" : jsonArr[i].unloadingPoint) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (jsonArr[i].recipient === undefined ? "" : jsonArr[i].recipient) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (jsonArr[i].asset === undefined ? "" : jsonArr[i].asset) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (jsonArr[i].wbsElement === undefined ? "" : jsonArr[i].wbsElement) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>' +
                        "</td></tr>";
            }
        }
    }
    $("#costCenteraccountAssignmentTebleId tbody").append(tdrow);
}

function ArrayIsEmptyOnLineItemChange() {

    $("#costCenteraccountAssignmentTebleId tbody tr").remove();
    var row = "";
    row += "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;">' +
            "</td></tr>";
    $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);

//    alert($("#costCenteraccountAssignmentTebleId tbody tr").length);
}
function getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumber(linkid, serviceLineItemNumber, PoId) {
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumber",
            "linkid": linkid,
            "serviceLineItemNumber": serviceLineItemNumber,
            "PoId": PoId
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            var tdrow = "";
//            alert("jsonArr.length :" + jsonArr.length);
            if (jsonArr.length > 0) {
                var distribution = jsonArr[0].distribution;
                console.log("distribution in service Account Assignment :" + distribution);
                if (distribution === "") {
                    for (var i = 0; i < jsonArr.length; i++) {
                        console.log("Quantity after save :" + jsonArr[i].quantity);
                        console.log("Distribution Single:" + jsonArr[i].distribution);
                        $("#gLAccountService").val(jsonArr[i].glAccount);
                        $("#coAreaService").val(jsonArr[i].coArea);
                        $("#costCenterService").val(jsonArr[i].costCenter);
                        $("#OrderService").val(jsonArr[i].accOrder);
                        $("#AssetService").val(jsonArr[i].accAsset);
                        $("#WBSElementInputService").val(jsonArr[i].accWBSElement);
                        $("#SalesOrderService").val(jsonArr[i].salesOrder);
                        $("#ItemNumberService").val(jsonArr[i].itemNumber);
                        $("#DelivSchService").val(jsonArr[i].deliverySchedule);
                        $("#fundService").val(jsonArr[i].fund);
                        $("#functionalAreaService").val(jsonArr[i].functionalArea);
                        $("#FundCenterServiceInput").val(jsonArr[i].fundsCentre);
                        $("#CommItemServiceInput").val(jsonArr[i].commitmentItem);
                        $("#NActNumServiceInput").val(jsonArr[i].network);
//                        $("#ServiceLinkNumberId").val(jsonArr[i].LINKNUMBER);
                        //                        $("#ServiceNetValueId").val(jsonArr[i].NETVALUE);
                        $("#noMultiAcctAssignment").prop("checked", true);
                        ServiceAccountAssignmentArrayIsEmptyInST();
                        $("#serviceTabAccAsgnTebleId tbody :input").prop("disabled", true);
                    }
                } else if (distribution === "1" || distribution === "2") {

                    //                    $('#accountAssignmentForm').trigger("reset");
                    for (var i = 0; i < jsonArr.length; i++) {
                        $("#serviceTabAccAsgnTebleId tbody tr").remove();
                        var quantity = parseFloat(jsonArr[i].quantity).toFixed(1);
                        var percentage = parseFloat(jsonArr[i].percentage).toFixed(1);
                        if (i === 0) {
                            tdrow += "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" max=' + (jsonArr[i].quantity === undefined ? "" : quantity) + ' value=' + (jsonArr[i].quantity === undefined ? "" : formatNumberByComma(quantity)) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" max=' + (jsonArr[i].percentage === undefined ? "" : percentage) + ' value=' + (jsonArr[i].percentage === undefined ? "" : percentage) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" style="width: 100px;" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" style="width: 100px;" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" style="width: 100px;" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" style="width: 100px;" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" style="width: 100px;" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" style="width: 100px;" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" style="width: 100px;" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" style="width: 100px;" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" style="width: 100px;" value=' + (jsonArr[i].accAsset === undefined ? "" : jsonArr[i].accAsset) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" style="width: 100px;" value=' + (jsonArr[i].accWBSElement === undefined ? "" : jsonArr[i].accWBSElement) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" style="width: 100px;" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" style="width: 100px;" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" style="width: 100px;" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" style="width: 100px;" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>\n\
                                    <input type="hidden" class="form-control form-rounded input-height netValue" value="' + (jsonArr[i].netPrice === undefined ? "" : jsonArr[i].netPrice) + '">\n\
                                        <input type="hidden" class="form-control form-rounded input-height linkNumber" value="' + (jsonArr[i].linkNumber === undefined ? "" : jsonArr[i].linkNumber) + '">' +
                                    "</td></tr>";
                        } else {
                            tdrow += "<tr><td><i class='fa fa-window-close deleterowClass' aria-hidden='true' style='width:22px;'>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" max=' + (jsonArr[i].quantity === undefined ? "" : quantity) + ' value=' + (jsonArr[i].quantity === undefined ? "" : formatNumberByComma(quantity)) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" max=' + (jsonArr[i].percentage === undefined ? "" : percentage) + ' value=' + (jsonArr[i].percentage === undefined ? "" : percentage) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" style="width: 100px;" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" style="width: 100px;" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" style="width: 100px;" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" style="width: 100px;" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" style="width: 100px;" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" style="width: 100px;" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" style="width: 100px;" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" style="width: 100px;" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" style="width: 100px;" value=' + (jsonArr[i].accAsset === undefined ? "" : jsonArr[i].accAsset) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" style="width: 100px;" value=' + (jsonArr[i].accWBSElement === undefined ? "" : jsonArr[i].accWBSElement) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" style="width: 100px;" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" style="width: 100px;" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" style="width: 100px;" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" style="width: 100px;" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>\n\
                                    <input type="hidden" class="form-control form-rounded input-height netValue" value="' + (jsonArr[i].netPrice === undefined ? "" : jsonArr[i].netPrice) + '">\n\
                                    <input type="hidden" class="form-control form-rounded input-height linkNumber" value="' + (jsonArr[i].linkNumber === undefined ? "" : jsonArr[i].linkNumber) + '">' +
                                    "</td></tr>";
                        }
                    }
                    console.log(tdrow);
                    $("#serviceTabAccAsgnTebleId tbody").append(tdrow);

                    if (distribution === "1") {
                        $("#distOnQuantBases").prop("checked", true);
                        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                            $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", false);
                            $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr("disabled", true);
                        });
                    } else if (distribution === "2") {
                        $("#distByPercentage").prop("checked", true);
                        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                            $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
                            $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", false);
                        });
                    }
                }
            } else {
                $("#noMultiAcctAssignment").prop("checked", true);
                ServiceAccountAssignmentArrayIsEmptyInST();
                $("#serviceTabAccAsgnTebleId tbody :input").prop("disabled", true);
            }
        }
    });
}
function ServiceAccountAssignmentArrayIsEmptyInST() {
    $("#serviceTabAccAsgnTebleId tbody tr").remove();
    var tdrow = "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="" style="width: 100px;">' +
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
                            <input type="hidden" class="form-control form-rounded input-height netValue" value="">\n\
                            <input type="hidden" class="form-control form-rounded input-height linkNumber" value="' + 10 + '">' +
            "</td></tr>";
    $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
}

function updatePoLineDelvDateCatFromDelvSchTab(delvDatCat)
{
    console.log("delvDatCat: " + delvDatCat);
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).parent().parent().find("td").eq(1).text();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            $(this).find("td").eq(13).children(".pODeliveryDateCetegory").val(delvDatCat);
            return;
        }
    });
}

$("#addRowConditionsBtnIdLineLevel").click(function() {

    var uom;
    var materialcode = "";
    var opu = "";
    var prPerUnit = "";
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            uom = $(this).find("td").eq(31).children(".prUom").val();
            materialcode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            opu = $(this).find("td").eq(12).children(".prOrderPriceUnit").val();
            prPerUnit = removeCommaInNumber($(this).find("td").eq(10).children(".prPerUnit").val());
        }
    });


    var convTo = "";
    var convFrom = "";
    var CompanyCode = $("#companycodeHeader").val();

    var PrType = $("#prType").val();
    if (PrType === "Material") {
        var jsonArr = getMaterialMasterOnLoadInStandalone(materialcode, CompanyCode);
        if (jsonArr.length !== 0) {
            if (jsonArr[0].orderUnit !== "" && jsonArr[0].orderUnit !== undefined) {
                convTo = jsonArr[0].conversionTo;
                convFrom = jsonArr[0].conversionFrom;
            }
        }
        var infoRecordJsonObj = fetchInfoRecordDetails(materialcode);
        convTo = infoRecordJsonObj.CONV_NUM1 === "" || infoRecordJsonObj.CONV_NUM1 === undefined ? jsonArr[0].conversionFrom : infoRecordJsonObj.CONV_NUM1;
        convFrom = infoRecordJsonObj.CONV_DEN1 === "" || infoRecordJsonObj.CONV_DEN1 === undefined ? jsonArr[0].conversionTo : infoRecordJsonObj.CONV_DEN1;
    }
//        alert("convFrom :" + convFrom);
    var row = "";
    row = "<tr>"
            + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='conditionVendor'><input type='hidden' class='lineAddedFromLineLevel' value='linelevel'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField newConditionTypeLineLevel' id='' name='ConditionTypeLineLevel'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField NameConditionsLineLevel' disabled style='width:200px;' id='' name='nameConditionsLineLevel'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField newAmountLineLevel' disabled id='' name='AmountLineLevel' style='width: 150px;'><input type='hidden' class='AmountLineLevelHidden'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField CurrencyLineLevel' id='' disabled name='CurrencyLineLevel'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField newPerQuantityLineLavel' disabled id='' name='PerQuantityLineLavel' style='width: 150px;' value='" + formatAmountByComma(Number(prPerUnit).toFixed(2)) + "'><input type='hidden' class='PerQuantityLineLavelHidden'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField ConditionPricingUnitLineLevel' disabled id='' name='ConditionPricingUnitLineLevel'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField UoMLineLevel' id='' disabled name='UoMLineLevel'></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField ConditionValueLineLevel' disabled id='' name='ConditionValueLineLevel' style='width: 150px;' disabled></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField Currency2LineLevel' id='' name='Currency2LineLevel' disabled></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField ConditionValue2LineLevel' value='0.00' id='' name='ConditionValue2LineLevel' disabled></td>"
            + "<td><input type='text' class='form-control form-rounded tableInputField ConditionCurrencyLineLevel' id='' name='ConditionCurrencyLineLevel' disabled></td>"
            + "<td><input type='checkbox' class='statusLineLevel' name='statusLineLevel'></td>"
            + "<td><input type='number' class='form-control form-rounded numeratorLineLevel tableInputField' min='0' name='numeratorLineLevel' value='" + convTo + "'></td>"
            + "<td><input type='text' class='form-control form-rounded baseUoMLineLevel tableInputField' name='baseUoMLineLevel' value='" + uom + "'></td>"
            + "<td><input type='number' class='form-control form-rounded denoForConvLineLevel tableInputField' min='0' name='denoForConvLineLevel' value='" + convFrom + "'></td>"
            + "<td><input type='text' class='form-control form-rounded uOMExtraLineLevel tableInputField' name='uOMExtraLineLevel' value='" + opu + "'></td>"
            + "<td><i title='Delete Row' class='fa fa-window-close btn-lg deleteConditionTebleRowLineLevel' aria-hidden='true' style='width:30px;'></i>\n\
                  <input type='hidden' class='form-control form-rounded conditionKAPPL tableInputField' name='conditionKAPPL' value=''>\n\
                  <input type='hidden' class='form-control form-rounded conditionKVSL1 tableInputField' name='conditionKVSL1' value=''>\n\
                  <input type='hidden' class='form-control form-rounded conditionKVSL2 tableInputField' name='conditionKVSL2' value=''>\n\
                  <input type='hidden' class='form-control form-rounded conditionZAEHK tableInputField' name='conditionZAEHK' value=''>\n\
                  <input type='hidden' class='form-control form-rounded conditionSTUNR tableInputField' name='conditionSTUNR' value=''>\n\
                    <input type='hidden' class='form-control form-rounded conditionChangeId tableInputField' name='conditionChangeId' value='I'></td>"
            + "</tr>";
    $(".conditionTableClassLineLevel").children("tbody").append(row);

    $(".conditionTableClassLineLevel tbody tr").last().find("td").eq(1).children(".newConditionTypeLineLevel").focus();
});
