/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {

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

    var companyCode = $("#companyCodeHidden").val();
    if (companyCode !== "") {
        findDetailsForPersonalSettingsByCompanyCode(companyCode);
    }
    $("#companycodeHeader").val(companyCode);
    var paymentTerms = $("#paymentHidden").val();
    $("#paymentTerms").val(paymentTerms);
    var pOType = $("#pOTypeHidden").val();
    $("#purchasingDocType").val(pOType);
    var purOrgHidden = $("#purOrgHidden").val();
    $("#purchasingOrg").val(purOrgHidden);
    var currency = $("#currencyHidden").val();
    $("#currency").val(currency);
    var plant = $("#ro_plantHidden").val();
    $("#plantLineLevel").val(plant);
    var delDateCat = $("#ro_delDateCatHidden").val();
    $("#delDateCat").val(delDateCat);
    var grMessage = $("#ro_grMessageHidden").val();
    if (grMessage === "Yes") {
        $("#GRMessage").prop("checked", true);
    } else {
        $("#GRMessage").prop("checked", false);
    }
    var isAckReg = $("#ro_isAckReqHidden").val();
    if (isAckReg === "Yes") {
        $("#isAckReq").prop("checked", true);
    } else {
        $("#isAckReq").prop("checked", false);
    }


    var errorMsg = "";
    var lobiboxNotifyAlert = null;
    $("#savePersonalSettings").click(function() {

        var companycode = $("#companycodeHeader").val();

        var purchasingDocType = $("#purchasingDocType").val();
        var purchasingOrg = $("#purchasingOrg").val();
        var paymentTerms = $("#paymentTerms").val();
        var currency = $("#currency").val();
        var ourReference = $("#ourReference").val();
        var IncoTermsPartHeader1 = $("#IncoTermsPart1").val();
        var IncoTermsPartHeader2 = $("#IncoTermsPart2").val();
        var grMessage = "";
        if ($("#GRMessage").prop("checked") === true) {
            grMessage = "Yes";
        } else {
            grMessage = "No";
        }

        var plant = $("#plantLineLevel").val();
        var itemCat = $("#itemCategory").val();
        var accAsgnCat = $('#accAssCat').val();
        var requisitioner = $('#requisitioner').val();
        var trackingNumber = $('#trackingNumber').val();
        var materialGroup = $('#materialGroup').val();
        var delDateCat = $('#delDateCat').val();
        var ackRequired = $('#ackRequired').val();
        var promotion = $('#promotion').val();
        var incoTermsPart1 = $('#IncoTermsPart1_LineLevel').val();
        var incoTermsPart2 = $('#IncoTermsPart2_LineLevel').val();

        console.log("plant :" + plant);
        console.log("itemCat :" + itemCat);
        console.log("accAsgnCat :" + accAsgnCat);
        console.log("requisitioner :" + requisitioner);
        console.log("trackingNumber :" + trackingNumber);
        console.log("materialGroup :" + materialGroup);
        console.log("delDateCat :" + delDateCat);
        console.log("ackRequired :" + ackRequired);
        console.log("promotion :" + promotion);
        console.log("incoTermsPart1 :" + incoTermsPart1);
        console.log("incoTermsPart2 :" + incoTermsPart2);

        if (companycode === "" && purchasingDocType === "" && purchasingOrg === "" && paymentTerms === "" && currency === "" && ourReference === ""
                && IncoTermsPartHeader1 === "" && IncoTermsPartHeader2 === "" && grMessage === "No" && plant === "" && itemCat === "" && accAsgnCat === ""
                && requisitioner === "" && trackingNumber === "" && materialGroup === "" && delDateCat === "" && incoTermsPart1 === ""
                && incoTermsPart2 === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Atleast one field is mandatory!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }


        $("#plantHidden").val(plant);
        $("#itemCatHidden").val(itemCat);
        $("#accAsgnCatHidden").val(accAsgnCat);
        $("#requisitionerHidden").val(requisitioner);
        $("#trackingNumberHidden").val(trackingNumber);
        $("#matlGroupHidden").val(materialGroup);
        $("#delDateCatHidden").val(delDateCat);
        $("#ackReqdHidden").val(ackRequired);
        $("#PromotionHidden").val(promotion);
        $("#incoTerms1LineHidden").val(incoTermsPart1);
        $("#incoTerms2LineHidden").val(incoTermsPart2);

        var grMessage = "";
        if ($("#GRMessage").prop("checked") === true) {
            grMessage = "Yes";
        } else {
            grMessage = "No";
        }
        $("#grMessageHidden").val(grMessage);

        var isAckReq = "";

        if ($("#isAckReq").prop("checked") === true) {
            isAckReq = "Yes";
        } else {
            isAckReq = "No";
        }
        $("#isAckReqHidden").val(isAckReq);

        $("#personalSettingsform").submit();
    });

    $('#companycodeHeader').change(function() {
        $(this).css("border-color", "");
        var companyCode = $(this).val();
        findDetailsForPersonalSettingsByCompanyCode(companyCode);
    });

    $("#itemCategory").click(function() {
        $("#itemCategoryModal").modal("show");
        getAllItemCategory();
    });

    $("#accAssCat").click(function() {
        $("#accountAssignmentCategoryModal").modal("show");
        getAllAccountAssignmentCategory();
    });

    $("#trackingNumber").click(function() {
        var companyCode = $("#companycodeHeader").val();
        if (companyCode !== "") {
            $("#trackingNumnerModal").modal("show");
            getTrackingNumberByCompanyCode(companyCode);
        } else {
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
            $("#companycodeHeader").css("border-color", "red");
            return false;

        }
    });

    $("#materialGroup").click(function() {
        $("#materialGroupModal").modal("show");
        getMaterialGroup();
    });

    $("#IncoTermsPart1").click(function() {
        $("#incoTermsModal").modal("show");
        $("#reqFrom").val("IncoTermsPart1");
        getAllMasterIncoTerms();
    });

    $("#IncoTermsPart2").click(function() {
        $("#incoTermsModal").modal("show");
        $("#reqFrom").val("IncoTermsPart2");
        getAllMasterIncoTerms();
    });
    $("#IncoTermsPart1_LineLevel").click(function() {
        $("#incoTermsModal").modal("show");
        $("#reqFrom").val("IncoTermsPart1_LineLevel");
        getAllMasterIncoTerms();
    });

    $("#IncoTermsPart2_LineLevel").click(function() {
        $("#incoTermsModal").modal("show");
        $("#reqFrom").val("IncoTermsPart2_LineLevel");
        getAllMasterIncoTerms();
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

    var materialGroup = null;
    function getMaterialGroup() {
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getMaterialGroup"
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='materialGroupTrClass'>"
                            + "<td>" + jsonArr[i].materialGroupCode + "</td>"
                            + "<td>" + jsonArr[i].materialGroupDesc + "</td>"
                            + "</tr>";
                }
                $("#materialGroupTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#materialGroupTable')) {
                    materialGroup.destroy();
                    materialGroup = null;
                    $("#materialGroupTable").children('tbody').html(row);
                    materialGroup = $('table.materialGroupTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    materialGroup.buttons().container()
                            .appendTo('#materialGroupTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#materialGroupTable thead tr').clone(true).appendTo('#materialGroupTable thead');
                    $('#materialGroupTable thead tr:eq(1) th').each(function(i) {
                        $('#materialGroupTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (materialGroup.column(i).search() !== this.value) {
                                materialGroup
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    materialGroup = $('table.materialGroupTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    materialGroup.buttons().container()
                            .appendTo('#materialGroupTable_wrapper .col-md-6:eq(0)');
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

    $("#incoTermsTable").on("click", ".incoTermsTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        var reqFrom = $("#reqFrom").val();

        if (reqFrom === "IncoTermsPart1") {
            $("#IncoTermsPart1").val(code);
        } else if (reqFrom === "IncoTermsPart2") {
            $("#IncoTermsPart2").val(code);
        } else if (reqFrom === "IncoTermsPart1_LineLevel") {
            $("#IncoTermsPart1_LineLevel").val(code);
        } else if (reqFrom === "IncoTermsPart2_LineLevel") {
            $("#IncoTermsPart2_LineLevel").val(code);
        }
        $("#incoTermsModal").modal("hide");
    });

    $("#materialGroupTable").on("click", ".materialGroupTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        $("#materialGroup").val(code);
        $("#materialGroupModal").modal("hide");
    });
    $("#trackingNumnerModalTable").on("click", ".poTrackingNumberTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        $('#trackingNumber').val(code);
        $("#trackingNumnerModal").modal("hide");
    });
    $("#accountAssignmentCategoryTableId").on("click", ".accountAssignmentModalTableTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        $("#accAssCat").val(code);
        $("#accountAssignmentCategoryModal").modal("hide");
    });
    $("#itemCategoryTableId").on("click", ".itemCategoryModalTableTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        $("#itemCategory").val(code);
        $("#itemCategoryModal").modal("hide");
    });



    function  findDetailsForPersonalSettingsByCompanyCode() {
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "findDetailsForPersonalSettingsByCompanyCode",
                "companyCode": companyCode
            },
            success: function(responseJson) {
                var obj = $.parseJSON(responseJson);
                console.log("response :: " + responseJson);
                var purOrgJsonArray = obj.purOrgJsonArray;
                var currencyJsonArray = obj.currencyJsonArray;
                var plantJsonArray = obj.plantJsonArray;
                if (purOrgJsonArray.length !== 0) {
                    var option = "";
                    for (var i = 0; i < purOrgJsonArray.length; i++) {
                        option += "<option value='" + purOrgJsonArray[i].purchaseOrgCode + "'>" + purOrgJsonArray[i].purchaseOrgCode + "</option>";
                    }
                    $("#purchasingOrg").append(option);
                }

                if (currencyJsonArray.length !== 0) {
                    var option = "";
                    for (var i = 0; i < currencyJsonArray.length; i++) {
                        option += "<option value='" + currencyJsonArray[i].currencyCode + "'>" + currencyJsonArray[i].currencyCode + "</option>";
                    }
                    $("#currency").append(option);
                }
                if (plantJsonArray.length !== 0) {
                    var option = "";
                    for (var i = 0; i < plantJsonArray.length; i++) {
                        option += "<option value='" + plantJsonArray[i].plantCode + "'>" + plantJsonArray[i].plantCode + "</option>";
                    }
                    $("#plantLineLevel").append(option);
                }
            }
        });
    }

    $("#clearIncoTermsModalBtn").click(function() {
        var reqFrom = $("#reqFrom").val();

        if (reqFrom === "IncoTermsPart1") {
            $("#IncoTermsPart1").val("");
        } else if (reqFrom === "IncoTermsPart2") {
            $("#IncoTermsPart2").val("");
        } else if (reqFrom === "IncoTermsPart1_LineLevel") {
            $("#IncoTermsPart1_LineLevel").val("");
        } else if (reqFrom === "IncoTermsPart2_LineLevel") {
            $("#IncoTermsPart2_LineLevel").val("");
        }
        $("#incoTermsModal").modal("hide");
    });
    $("#clearItemCategoryModalBtn").click(function() {
        $("#itemCategory").val("");
        $("#itemCategoryModal").modal("hide");
    });
    $("#clearAccAsgnModalBtn").click(function() {
        $("#accAssCat").val("");
        $("#accountAssignmentCategoryModal").modal("hide");
    });
    $("#clearTrackNumberModalBtn").click(function() {
        $('#trackingNumber').val("");
        $("#trackingNumnerModal").modal("hide");
    });
    $("#clearMaterialGroupModalBtn").click(function() {
        $("#materialGroup").val("");
        $("#materialGroupModal").modal("hide");
    });
});



