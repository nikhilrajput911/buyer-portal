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

    if ($("#gRPostingDateFrom_div").length) {
        $(function() {
            $('#gRPostingDateFrom_div').datetimepicker({
                format: 'DD-MM-YYYY'
//                minDate: new Date()
            });
            $('#gRPostingDateTo_div').datetimepicker({
                useCurrent: false,
                format: 'DD-MM-YYYY'
//                minDate: new Date()
            });
            $("#gRPostingDateFrom_div").on("change.datetimepicker", function(e) {
                $('#gRPostingDateTo_div').datetimepicker('minDate', e.date);
            });
            $("#gRPostingDateTo_div").on("change.datetimepicker", function(e) {
                $('#gRPostingDateFrom_div').datetimepicker('maxDate', e.date);
            });
        });
    }

    $("#plantFrom").click(function() {
        $("#reqFrom").val("plantFrom");
        $("#overlay").css("display", "block");
//        $("#plantMasterModal").modal("show");
        getPlantMaster();
    });
    $("#plantto").click(function() {
        $("#reqFrom").val("plantto");
        $("#overlay").css("display", "block");
//        $("#plantMasterModal").modal("show");
        getPlantMaster();
    });
    $("#plantMasterTable").on("click", ".plantMasterTrClass", function() {
        var plant = $(this).find("td").eq(1).text();
        console.log("plant: " + plant);
        var reqFrom = $("#reqFrom").val();
        if (reqFrom === "plantFrom") {
            $("#plantFrom").val(plant);
        } else if (reqFrom === "plantto") {
            $("#plantto").val(plant);
        }
        $("#plantMasterModal").modal("hide");
    });
    $("#purchasingGroupfrom").click(function() {
        $("#reqFrom").val("purchasingGroupfrom");
        $("#overlay").css("display", "block");
//        $("#purchasingGroupModal").modal("show");
        getPurchasingGroup();
    });
    $("#purchasingGroupto").click(function() {
        $("#reqFrom").val("purchasingGroupto");
        $("#overlay").css("display", "block");
//        $("#purchasingGroupModal").modal("show");
        getPurchasingGroup();
    });
    $("#purchasingGroupTableId").on("click", ".purGroupTrClass", function() {
        var purchasinggroup = $(this).find("td").eq(0).text();
        console.log("purchasinggroup: " + purchasinggroup);
        var reqFrom = $("#reqFrom").val();
        if (reqFrom === "purchasingGroupfrom") {
            $("#purchasingGroupfrom").val(purchasinggroup);
        } else if (reqFrom === "purchasingGroupto") {
            $("#purchasingGroupto").val(purchasinggroup);
        }
        $("#purchasingGroupModal").modal("hide");
    });

    $("#purchasingOrgFrom").click(function() {
        $("#overlay").css("display", "block");
//        $("#PurchaseOrgModal").modal("show");
        $("#reqFrom").val("purchasingOrgFrom");
        getAllPurchaseOrg();

    });
    $("#purchasingOrgto").click(function() {
        $("#overlay").css("display", "block");
//        $("#PurchaseOrgModal").modal("show");
        $("#reqFrom").val("purchasingGroupto");
        getAllPurchaseOrg();
    });

    $("#puechaseOrgTableId").on("click", ".purchaseOrgTrClass", function() {
        var purOrg = $(this).find("td").eq(0).text();
        console.log("purOrg: " + purOrg);
        var reqFrom = $("#reqFrom").val();
        if (reqFrom === "purchasingOrgFrom") {
            $("#purchasingOrgFrom").val(purOrg);
        } else if (reqFrom === "purchasingGroupto") {
            $("#purchasingOrgto").val(purOrg);
        }
        $("#PurchaseOrgModal").modal("hide");
    });
    $("#docCatFrom").click(function() {
        $("#overlay").css("display", "block");
        $("#accountAssignmentCategoryModal").modal("show");
        getAllAccountAssignmentCategory();
    });
    $("#accountAssignmentCategoryTableId").on("click", ".accountAssignmentModalTableTrClass", function() {
        var code = $(this).find("td").eq(0).text();
        $("#docCatFrom").val(code);
        $("#accountAssignmentCategoryModal").modal("hide");
    });
    $("#vendorFrom").click(function() {
        $("#overlay").css("display", "block");
//        $("#vendorModal").modal("show");
        $("#reqFrom").val("vendorFrom");
        getVendorByCompanycode();
    });
    $("#vendorTo").click(function() {
        $("#overlay").css("display", "block");
//        $("#vendorModal").modal("show");
        $("#reqFrom").val("vendorTo");
        getVendorByCompanycode();
    });
    $("#vendorTableId").on("click", ".vendorModalTableTrClass", function() {
        var vendorCode = $(this).find("td").eq(0).text();
        var vendorName = $(this).find("td").eq(1).text();
        console.log("vendorCode: " + vendorCode);
        var reqFrom = $("#reqFrom").val();
        if (reqFrom === "vendorFrom") {
            $("#vendorFrom").val(vendorName + "-" + vendorCode);
            $("#vendorCodeFromHidden").val(vendorCode);
        } else if (reqFrom === "vendorTo") {
            $("#vendorTo").val(vendorName + "-" + vendorCode);
            $("#vendorCodeToHidden").val(vendorCode);
        }
        $("#vendorModal").modal("hide");
    });
    $("#ponoFrom").click(function() {
        $("#overlay").css("display", "block");
//        $("#PONumberModal").modal("show");
        $("#reqFrom").val("ponoFrom");
        getPurchaseOrderNumber();
    });
    $("#ponoTo").click(function() {
        $("#overlay").css("display", "block");
//        $("#PONumberModal").modal("show");
        $("#reqFrom").val("ponoTo");
        getPurchaseOrderNumber();
    });
    $("#PONumberTableId").on("click", ".poNumberModalTableTrClass", function() {
        var PoNumber = $(this).find("td").eq(0).text();
        console.log("PoNumber: " + PoNumber);
        var reqFrom = $("#reqFrom").val();
        if (reqFrom === "ponoFrom") {
            $("#ponoFrom").val(PoNumber);
        } else if (reqFrom === "ponoTo") {
            $("#ponoTo").val(PoNumber);
        }
        $("#PONumberModal").modal("hide");
    });

    $("#generatePoSavingReportBtn").click(function() {
        console.log("generatePoSavingReportBtn ==>");

        var poType = $("input[name=poType]:checked").val();
        console.log("poType: " + poType);

        var coCodeFrom = $("#companycode").val();
        var coCodeTo = $("#tocompanycode").val();
        var plantFrom = $("#plantFrom").val();
        var plantTo = $("#plantto").val();
        var purchasingGroupFrom = $("#purchasingGroupfrom").val();
        var purchasingGroupTo = $("#purchasingGroupto").val();
        var purchasingOrgFrom = $("#purchasingOrgFrom").val();
        var purchasingOrgTo = $("#purchasingOrgto").val();
        var docTypeFrom = $("#docTypeFrom").val();
        var docTypeTo = $("#docTypeto").val();
        var docCatFrom = $("#docCatFrom").val();
        var vendorCodeFrom = $("#vendorCodeFromHidden").val();
        var vendorCodeTo = $("#vendorCodeToHidden").val();
        var vendorNameFrom = $("#vendorFrom").val();
        var vendorNameTo = $("#vendorTo").val();
        var poNoFrom = $("#ponoFrom").val();
        var poNoTo = $("#ponoTo").val();
        var grPostingDateFrom = $("#gRPostingDateFrom").val();
        var grPostingDateTo = $("#gRPostingDateTo").val();

        console.log("coCodeFrom: " + coCodeFrom);
        console.log("coCodeTo: " + coCodeTo);
        console.log("plantFrom: " + plantFrom);
        console.log("plantTo: " + plantTo);
        console.log("purchasingGroupFrom: " + purchasingGroupFrom);
        console.log("purchasingGroupTo: " + purchasingGroupTo);
        console.log("purchasingOrgFrom: " + purchasingOrgFrom);
        console.log("purchasingOrgTo: " + purchasingOrgTo);
        console.log("docTypeFrom: " + docTypeFrom);
        console.log("docTypeTo: " + docTypeTo);
        console.log("docCatFrom: " + docCatFrom);
        console.log("vendorCodeFrom: " + vendorCodeFrom);
        console.log("vendorCodeTo: " + vendorCodeTo);
        console.log("vendorNameFrom: " + vendorNameFrom);
        console.log("vendorNameTo: " + vendorNameTo);
        console.log("poNoFrom: " + poNoFrom);
        console.log("poNoTo: " + poNoTo);
        console.log("grPostingDateFrom: " + grPostingDateFrom);
        console.log("grPostingDateTo: " + grPostingDateTo);

        var url = "generatePoSavingReport.do?poType=" + poType + "&coCodeFrom=" + coCodeFrom + "&coCodeTo=" + coCodeTo + "&plantFrom=" + plantFrom
                + "&plantTo=" + plantTo + "&purchasingGroupFrom=" + purchasingGroupFrom + "&purchasingGroupTo=" + purchasingGroupTo
                + "&purchasingOrgFrom=" + purchasingOrgFrom + "&purchasingOrgTo=" + purchasingOrgTo + "&docTypeFrom=" + docTypeFrom
                + "&docTypeTo=" + docTypeTo + "&docCatFrom=" + docCatFrom + "&vendorCodeFrom=" + vendorCodeFrom + "&vendorCodeTo=" + vendorCodeTo
                + "&poNoFrom=" + poNoFrom + "&poNoTo=" + poNoTo + "&grPostingDateFrom=" + grPostingDateFrom + "&grPostingDateTo=" + grPostingDateTo
                + "&vendorNameFrom=" + vendorNameFrom + "&vendorNameTo=" + vendorNameTo;

        console.log("url: " + url);
        location.href = url;

    });
});

var plantTable = null;
function getPlantMaster() {

    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: true,
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
            $("#plantMasterModal").modal("show");
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
            $("#overlay").css("display", "none");
        }
    });

}

var purGroup = null;
function getPurchasingGroup() {

    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: true,
        data: {
//            "reqFrom": "findAllMasterPurchaseGroup"
            "reqFrom": "findBuyerPurchasingGroupMappingList"
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            console.log("Obj length :" + jsonArr.length);
            var row = "";
            for (var i = 0; i < jsonArr.length; i++) {
                row += "<tr class='purGroupTrClass'>"
                        + "<td>" + jsonArr[i].purchasingGroupCode + "</td>"
                        + "<td>" + jsonArr[i].purchasingGroupDesc + "</td>"
                        + "</tr>";
            }
            $("#purchasingGroupTableId tbody").append(row);
            $("#purchasingGroupModal").modal("show");
            if ($.fn.DataTable.isDataTable('#purchasingGroupTableId')) {
                purGroup.destroy();
                purGroup = null;
                $("#purchasingGroupTableId").children('tbody').html(row);
                purGroup = $('table.purchasingGroupTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                purGroup.buttons().container()
                        .appendTo('#purchasingGroupTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#purchasingGroupTableId thead tr').clone(true).appendTo('#purchasingGroupTableId thead');
                $('#purchasingGroupTableId thead tr:eq(1) th').each(function(i) {
                    $('#purchasingGroupTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (purGroup.column(i).search() !== this.value) {
                            purGroup
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                purGroup = $('table.purchasingGroupTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                purGroup.buttons().container()
                        .appendTo('#purchasingGroupTableId_wrapper .col-md-6:eq(0)');
            }
            $("#overlay").css("display", "none");
        }
    });
}
var purchaseOrgTable = null;
function getAllPurchaseOrg() {
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: true,
        data: {
            "reqFrom": "getAllPurchaseOrg"
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("Obj lengtth :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr class='purchaseOrgTrClass'>"
                        + "<td>" + obj[i].PURCHASE_ORG_CODE + "</td>"
                        + "<td>" + obj[i].DESC + "</td>"
                        + "</tr>";
            }
            $("#puechaseOrgTableId tbody").append(row);
            $("#PurchaseOrgModal").modal("show");
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
            $("#overlay").css("display", "none");
        }
    });
}
var accAsgnCatTable = null;
function getAllAccountAssignmentCategory() {
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: true,
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
            $("#overlay").css("display", "none");
        }
    });
}
var vendorsTable = null;
function getVendorByCompanycode() {
    var companyCodeHeader = $("#companycode").val();
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
            jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));
            console.log("jsonVendorArr length :" + jsonVendorArr.length);
            var row = "";
            for (var i = 0; i < jsonVendorArr.length; i++) {
                row += "<tr class='vendorModalTableTrClass'>"
                        + "<td>" + jsonVendorArr[i].vendorCode + "</td>"
                        + "<td>" + jsonVendorArr[i].vendorName + "</td>"
                        + "</tr>";
            }
            $("#vendorTableId tbody").append(row);
            $("#vendorModal").modal("show");
            if ($.fn.DataTable.isDataTable('#vendorTableId')) {
                vendorsTable.destroy();
                vendorsTable = null;
                $("#vendorTableId").children('tbody').html(row);
                vendorsTable = $('table.vendorTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                vendorsTable.buttons().container()
                        .appendTo('#vendorTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#vendorTableId thead tr').clone(true).appendTo('#vendorTableId thead');
                $('#vendorTableId thead tr:eq(1) th').each(function(i) {
                    $('#vendorTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (vendorsTable.column(i).search() !== this.value) {
                            vendorsTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                vendorsTable = $('table.vendorTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                vendorsTable.buttons().container()
                        .appendTo('#vendorTableId_wrapper .col-md-6:eq(0)');
            }
            $("#overlay").css("display", "none");
        }
    });
}
var poNumberTable = null;
function getPurchaseOrderNumber() {
    var companyCodeHeader = $("#companycode").val();
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "getPurchaseOrderNumber"
        },
        complete: function(responseJson) {
            $("#PONumberModal").modal("show");
            var jsonExtArr = $.parseJSON(responseJson.responseText);
            jsonExtArr = JSON.parse(JSON.stringify(jsonExtArr));
            console.log("jsonExtArr length :" + jsonExtArr.length);
            var row = "";
            for (var i = 0; i < jsonExtArr.length; i++) {
                row += "<tr class='poNumberModalTableTrClass'>"
                        + "<td>" + jsonExtArr[i].purchaseOrderNumber + "</td>"
                        + "<td>" + jsonExtArr[i].companyCode + "</td>"
                        + "<td>" + jsonExtArr[i].purchaseOrderType + "</td>"
                        + "<td>" + jsonExtArr[i].vendorCode + "</td>"
                        + "<td>" + jsonExtArr[i].vendorName + "</td>"
                        + "</tr>";
            }
            $("#PONumberTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#PONumberTableId')) {
                poNumberTable.destroy();
                poNumberTable = null;
                $("#PONumberTableId").children('tbody').html(row);
                poNumberTable = $('table.PONumberTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                poNumberTable.buttons().container()
                        .appendTo('#PONumberTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#PONumberTableId thead tr').clone(true).appendTo('#PONumberTableId thead');
                $('#PONumberTableId thead tr:eq(1) th').each(function(i) {
                    $('#PONumberTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (poNumberTable.column(i).search() !== this.value) {
                            poNumberTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                poNumberTable = $('table.PONumberTableClass').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                poNumberTable.buttons().container()
                        .appendTo('#PONumberTableId_wrapper .col-md-6:eq(0)');
            }
            $("#overlay").css("display", "none");
        }
    });
}
