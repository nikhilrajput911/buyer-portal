$(document).ready(function() {
    $("#groupname").change(function() {
        var name = $(this).val();
        console.log("name: " + name);
        var size = checkVendorGroupAvailibility(name);
        console.log("size: " + size);
        if (size > 0)
        {
            Lobibox.alert("error", {
                msg: "Group Already Added!"
            });
            $(this).val("");
        }
    });
    $("#creategroupbtn").click(function() {
        var groupname = $("#groupname").val();
        if (groupname === "")
        {
            Lobibox.alert("error", {
                msg: "Please enter group name!"
            });
            return false;
        }

        var noOfVendor = $("#newgroup_vendor_table tbody tr").length;
        console.log("noOfVendor: " + noOfVendor);
        if (noOfVendor === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor(s)!"
            });
            return false;
        }
        $("#overlay").css("display", "block");
        $("#creategroupform").submit();
    });

    //--------------------------------------------------Vendor Picklist Starts------------------------------------------------------------------------//
    // Btn to open vendor modal
    $("#addVendorToNewGroup").click(function() {
        var vendorType = $("#vendorType").val();
        console.log("vendorType: " + vendorType);
        
        $("#overlay").css("display", "block");
        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetailsInCreateGroup();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInCreateGroup();
            }
            $("#overlay").css("display", "none");
            $("#addVendorsDetailsModal").modal("show");
        }, 1000);
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
        var vendorType = $("#vendorType").val();
        console.log("vendorType: " + vendorType);
        
        $("#lastVMSno").val("1");
        $("#overlay").css("display", "block");
        $("#addVendorsDetailsModal").modal("hide");
        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetailsInCreateGroup();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInCreateGroup();
            }
            $("#overlay").css("display", "none");
            $("#addVendorsDetailsModal").modal("show");
        }, 1000);
    });

    // Vendor Picklist Next Btn
    $("#searchVendorMasterNextBtn").click(function() {
        var vendorType = $("#vendorType").val();
        console.log("vendorType: " + vendorType);
        
        $("#overlay").css("display", "block");
        $("#addVendorsDetailsModal").modal("hide");

        var nextPageNo = Number($("#lastVMSno").val()) + 1;
        $("#lastVMSno").val(nextPageNo);

        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetailsInCreateGroup();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInCreateGroup();
            }
            $("#overlay").css("display", "none");
            $("#addVendorsDetailsModal").modal("show");
        }, 1000);

        $("#searchVendorMasterPrevBtn").prop("disabled", false);
    });

    // Vendor Picklist Prev Btn
    $("#searchVendorMasterPrevBtn").click(function() {
        var vendorType = $("#vendorType").val();
        console.log("vendorType: " + vendorType);
        
        var prevPageNo = Number($("#lastVMSno").val()) - 1;
        $("#lastVMSno").val(prevPageNo);

        $("#overlay").css("display", "block");
        $("#addVendorsDetailsModal").modal("hide");
        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetailsInCreateGroup();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInCreateGroup();
            }
            $("#overlay").css("display", "none");
            $("#addVendorsDetailsModal").modal("show");
        }, 1000);

        if (Number(prevPageNo) === 1)
            $("#searchVendorMasterPrevBtn").prop("disabled", true);
        else
            $("#searchVendorMasterPrevBtn").prop("disabled", false);
    });
    //--------------------------------------------------Vendor Picklist Ends------------------------------------------------------------------------//

    var selectedVendorIdsForGroup = [];
    var selectedVendorDetailsArrForGroup = [];

    var sapSelectedVendorCodeForGroup = [];
    var sapSelectedVendorDetailsForGroup = [];

    $("#addVendorsDetailsModalTableId").on('click', '.select-vendor-from-modal', function() {
        var id = $(this).val();
        var vendorType = $(this).parent().children(".vendor-type").val();
        console.log("id: " + id);
        console.log("vendorType: " + vendorType);

        if (vendorType !== "SAP")
        {
            console.log("Selected vendor is not SAP vendor!");

            var tempArr = [];
            tempArr = $("#vendorIdsForNewGroup").val().split(",");
            console.log("Selected Vendor Array: " + tempArr);
            console.log("selectedVendorIds len: " + selectedVendorIdsForGroup.length);
            var isVendorSelected = false;

            for (var k = 0; k < tempArr.length; k++) {
                if (tempArr[k] === id && $(this).prop("checked") === true) {
                    isVendorSelected = true;
                    Lobibox.notify('warning', {
                        title: 'Duplicate Vendor',
                        msg: 'This vendor is already in selected list, please select another vendor or delete from selected list!'
                    });
                    $(this).prop("checked", false);
                    return false;
                }
            }
            console.log("isVendorSelected: " + isVendorSelected);
            if (isVendorSelected)
            {
                return false;
            }
            else
            {
                var vendorDetails = {};

                var vendorName = $(this).parent().parent().find('td').eq(1).html();
                var compCode = $(this).parent().parent().find('td').eq(2).html();
                var emailId = $(this).parent().parent().find('td').eq(4).html();
                var address = $(this).parent().parent().find('td').eq(5).html();

                vendorDetails.vendorId = id;
                vendorDetails.vendorName = vendorName;
                vendorDetails.compCode = compCode;
                vendorDetails.emailId = emailId;
                vendorDetails.address = address;

                if ($(this).prop("checked") === true)
                {
                    console.log("selectedVendorIds: " + selectedVendorIdsForGroup);
                    selectedVendorIdsForGroup.push(id);
                    selectedVendorDetailsArrForGroup.push(vendorDetails);
                }
                else
                {
                    var index = selectedVendorIdsForGroup.indexOf(id);
                    console.log("index: " + index);

                    selectedVendorIdsForGroup.splice(index, 1);
                    selectedVendorDetailsArrForGroup.splice(index, 1);
                }
                console.log("selectedVendorIds.toString(): " + selectedVendorIdsForGroup.toString());
                $("#vendorIdsForNewGroup").val(selectedVendorIdsForGroup.toString());
            }
        }
        else
        {
            console.log("Selected vendor is SAP vendor!");

            var tempArr = [];
            tempArr = $("#sapVendorCodeForNewGroup").val().split(",");
            console.log("Selected SAP Vendor Array: " + tempArr);
            console.log("selectedSAPVendorIds len: " + sapSelectedVendorCodeForGroup.length);
            var isVendorSelected = false;

            for (var k = 0; k < tempArr.length; k++) {
                if (tempArr[k] === id && $(this).prop("checked") === true) {
                    isVendorSelected = true;
                    Lobibox.notify('warning', {
                        title: 'Duplicate Vendor',
                        msg: 'This vendor is already in selected list, please select another vendor or delete from selected list!'
                    });
                    $(this).prop("checked", false);
                    return false;
                }
            }
            console.log("isVendorSelected: " + isVendorSelected);
            if (isVendorSelected)
            {
                return false;
            }
            else
            {
                var vendorDetails = {};

                var vendorName = $(this).parent().parent().find('td').eq(1).html();
                var compCode = $(this).parent().parent().find('td').eq(2).html();
                var emailId = $(this).parent().parent().find('td').eq(4).html();
                var address = $(this).parent().parent().find('td').eq(5).html();

                vendorDetails.vendorId = id;
                vendorDetails.vendorName = vendorName;
                vendorDetails.compCode = compCode;
                vendorDetails.emailId = emailId;
                vendorDetails.address = address;

                if ($(this).prop("checked") === true)
                {
                    sapSelectedVendorCodeForGroup.push(id);
                    sapSelectedVendorDetailsForGroup.push(vendorDetails);
                }
                else
                {
                    var index = sapSelectedVendorCodeForGroup.indexOf(id);
                    console.log("index: " + index);

                    sapSelectedVendorCodeForGroup.splice(index, 1);
                    sapSelectedVendorDetailsForGroup.splice(index, 1);
                }
                $("#sapVendorCodeForNewGroup").val(sapSelectedVendorCodeForGroup.toString());
            }
        }
    });

    $("#addSelectedVendorToNewGroupTable").click(function() {
        if (selectedVendorIdsForGroup.length === 0 && sapSelectedVendorCodeForGroup.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        }
        else
        {
            $("#newgroup_vendor_table tbody tr").remove();
            var row = "";

            // Vendor or Prospect
            for (var i = 0; i < selectedVendorIdsForGroup.length; i++)
            {
                row += "<tr><td>" + selectedVendorDetailsArrForGroup[i].vendorName + "</td><td>" + selectedVendorDetailsArrForGroup[i].compCode + "</td><td>" + selectedVendorDetailsArrForGroup[i].address + "</td><td>" + selectedVendorDetailsArrForGroup[i].emailId + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + selectedVendorDetailsArrForGroup[i].vendorId + "><input type='hidden' class='selected-vendor-type' value='Vendor'></td></tr>";
            }

            // SAP Vendors
            for (var i = 0; i < sapSelectedVendorCodeForGroup.length; i++)
            {
                row += "<tr><td>" + sapSelectedVendorDetailsForGroup[i].vendorName + "</td><td>" + sapSelectedVendorDetailsForGroup[i].compCode + "</td><td>" + sapSelectedVendorDetailsForGroup[i].address + "</td><td>" + sapSelectedVendorDetailsForGroup[i].emailId + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + sapSelectedVendorDetailsForGroup[i].vendorId + "><input type='hidden' class='selected-vendor-type' value='SAP'></td></tr>";
            }

            $("#newgroup_vendor_table").children("tbody").append(row);
            $("#addVendorsDetailsModal").modal("hide");
        }
    });

    $("#newgroup_vendor_table").on("click", ".deleteRow", function() {
        console.log("selectedVendorIds: " + selectedVendorIdsForGroup);
        console.log("sapSelectedVendorCode: " + sapSelectedVendorCodeForGroup);

        var vname = $("#vendorIdsForNewGroup").val();
        var sapVendorCodes = $("#sapVendorCodeForNewGroup").val();
        var id = $(this).parent().find(".vendorclass").val();
        var selectedVendorType = $(this).parent().find(".selected-vendor-type").val();
        console.log("selectedVendorType: " + selectedVendorType);

        if (selectedVendorType !== "SAP")
        {
            var arr = vname.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                selectedVendorDetailsArrForGroup.splice(index, 1);
                $("#vendorIdsForNewGroup").val(arr);
                selectedVendorIdsForGroup = $("#vendorIdsForNewGroup").val().split(",");
            }
        }
        else
        {
            var arr = sapVendorCodes.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                sapSelectedVendorDetailsForGroup.splice(index, 1);
                $("#sapVendorCodeForNewGroup").val(arr);
                sapSelectedVendorCodeForGroup = $("#sapVendorCodeForNewGroup").val().split(",");
            }
        }
        $(this).parent().parent().remove();
    });
});

function checkVendorGroupAvailibility(name)
{
    var size = '';
    $.ajax(
            {
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data:
                        {
                            "reqFrom": "CheckVendorGroupAvailibility",
                            "GroupName": name
                        },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
//                    alert(obj.size);
                    size = obj.size;
                },
                error: function(data) {
//                    alert("dataFail");
                }
            });
    return size;
}

var addVendorsDetailsModalTable = null;
function findActiveVendorsAndProspectFromVendorDetailsInCreateGroup()
{
    console.log("In findActiveVendorsAndProspectFromVendorDetails:");
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "findActiveVendorsAndProspectFromVendorDetails",
            "recordCount": $("#vendorMasterRecordCount").val(),
            "vendorCodeOrNameSearchText": $("#vendorCodeOrName_SearchText").val(),
            "lastVMSno": $("#lastVMSno").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var venodorArr = obj;
            console.log("venodorArr len: " + venodorArr.length);

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

            var rfq_operation = $("#rfq_operation").val();
            console.log("rfq_operation: " + rfq_operation);

            var rfqVendorIdArray = [];
            if (rfq_operation === "update")
            {
                $("#rfqdetails_vendor_table tbody tr").each(function() {
                    var rfqVendorId = $(this).find("td").eq(8).text();
                    rfqVendorIdArray.push(rfqVendorId);
                });
                console.log("rfqVendorIdArray: " + rfqVendorIdArray);
            }

            var vendorRow = "";
            $("#addVendorsDetailsModalTableId tbody tr").remove();

            for (var i = 0; i < venodorArr.length; i++)
            {
                if (venodorArr[i].type === "Vendor")
                {
                    if (rfqVendorIdArray.length > 0)
                    {
                        if (rfqVendorIdArray.indexOf(venodorArr[i].id.toString()) === -1)
                        {
                            vendorRow += "<tr>"
                                    + "<td><input type='checkbox' class='select-vendor-from-modal' value='" + venodorArr[i].id + "'><input type='hidden' class='vendor-type' value='Vendor'></td>"
                                    + "<td>" + venodorArr[i].firstname + " " + venodorArr[i].lastname + "</td>"
                                    + "<td>" + (venodorArr[i].code === undefined ? '' : venodorArr[i].code) + "</td>"
                                    + "<td>" + venodorArr[i].organization + "</td>"
                                    + "<td>" + venodorArr[i].emailid + "</td>"
                                    + "<td>" + venodorArr[i].address + "</td>"
                                    + "<td>" + venodorArr[i].type + "</td>"
                                    + "</tr>";
                        }
                    }
                    else
                    {
                        vendorRow += "<tr>"
                                + "<td><input type='checkbox' class='select-vendor-from-modal' value='" + venodorArr[i].id + "'><input type='hidden' class='vendor-type' value='Vendor'></td>"
                                + "<td>" + venodorArr[i].firstname + " " + venodorArr[i].lastname + "</td>"
                                + "<td>" + (venodorArr[i].code === undefined ? '' : venodorArr[i].code) + "</td>"
                                + "<td>" + venodorArr[i].organization + "</td>"
                                + "<td>" + venodorArr[i].emailid + "</td>"
                                + "<td>" + venodorArr[i].address + "</td>"
                                + "<td>" + venodorArr[i].type + "</td>"
                                + "</tr>";
                    }
                }
                else if (venodorArr[i].type === "SAP")
                {
                    if (rfqVendorIdArray.length > 0)
                    {
                        if (rfqVendorIdArray.indexOf(venodorArr[i].id.toString()) === -1)
                        {
                            vendorRow += "<tr>"
                                    + "<td><input type='checkbox' class='select-vendor-from-modal' value='" + venodorArr[i].id + "'><input type='hidden' class='vendor-type' value='Vendor'></td>"
                                    + "<td>" + venodorArr[i].firstname + "</td>"
                                    + "<td>" + (venodorArr[i].code === undefined ? '' : venodorArr[i].code) + "</td>"
                                    + "<td></td>"
                                    + "<td>" + venodorArr[i].emailid + "</td>"
                                    + "<td>" + venodorArr[i].address + "</td>"
                                    + "<td>Vendor</td>"
                                    + "</tr>";
                        }
                    }
                    else
                    {
                        vendorRow += "<tr>"
                                + "<td><input type='checkbox' class='select-vendor-from-modal' value='" + venodorArr[i].id + "'><input type='hidden' class='vendor-type' value='Vendor'></td>"
                                + "<td>" + venodorArr[i].firstname + "</td>"
                                + "<td>" + (venodorArr[i].code === undefined ? '' : venodorArr[i].code) + "</td>"
                                + "<td></td>"
                                + "<td>" + venodorArr[i].emailid + "</td>"
                                + "<td>" + venodorArr[i].address + "</td>"
                                + "<td>Vendor</td>"
                                + "</tr>";
                    }
                }
                else if (venodorArr[i].type === "Prospect")
                {
                    if (rfqVendorIdArray.length > 0)
                    {
                        if (rfqVendorIdArray.indexOf(venodorArr[i].id.toString()) === -1)
                        {
                            vendorRow += "<tr>"
                                    + "<td><input type='checkbox' class='select-vendor-from-modal' value='" + venodorArr[i].id + "'><input type='hidden' class='vendor-type' value='Prospect'></td>"
                                    + "<td>" + venodorArr[i].prospectvendorname + "</td>"
                                    + "<td></td>"
                                    + "<td></td>"
                                    + "<td>" + venodorArr[i].emailid + "</td>"
                                    + "<td>" + venodorArr[i].address + "</td>"
                                    + "<td>" + venodorArr[i].type + "</td>"
                                    + "</tr>";
                        }
                    }
                    else
                    {
                        vendorRow += "<tr>"
                                + "<td><input type='checkbox' class='select-vendor-from-modal' value='" + venodorArr[i].id + "'><input type='hidden' class='vendor-type' value='Prospect'></td>"
                                + "<td>" + venodorArr[i].prospectvendorname + "</td>"
                                + "<td></td>"
                                + "<td></td>"
                                + "<td>" + venodorArr[i].emailid + "</td>"
                                + "<td>" + venodorArr[i].address + "</td>"
                                + "<td>" + venodorArr[i].type + "</td>"
                                + "</tr>";
                    }
                }
            }
            
            $("#addVendorsDetailsModalTableId tbody").append(vendorRow);

            if ($.fn.DataTable.isDataTable('#addVendorsDetailsModalTableId')) {
                addVendorsDetailsModalTable.destroy();
                addVendorsDetailsModalTable = null;
                $("#addVendorsDetailsModalTableId").children('tbody').html(vendorRow);
                addVendorsDetailsModalTable = $('table.addVendorsDetailsModalTable_Id').DataTable({
                    lengthChange: false,
                    orderCellsTop: true,
                    fixedHeader: true,
                    buttons: [
                        {
                            extend: 'collection',
                            text: 'Export',
                            buttons: [
                                {extend: 'excel', title: 'Vendor Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'pdf', title: 'Vendor Details', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'print', title: 'Vendor Details', customize: function(win)
                                    {
                                        var css = '@page { size: landscape; }',
                                                head = win.document.head || win.document.getElementsByTagName('head')[0],
                                                style = win.document.createElement('style');
                                        style.type = 'text/css';
                                        style.media = 'print';
                                        if (style.styleSheet)
                                        {
                                            style.styleSheet.cssText = css;
                                        }
                                        else
                                        {
                                            style.appendChild(win.document.createTextNode(css));
                                        }
                                        head.appendChild(style);
                                    }, exportOptions: {
                                        columns: "thead th:not(.noExport)"
                                    }
                                }
                            ]
                        }
                    ]
                });
                addVendorsDetailsModalTable.buttons().container()
                        .appendTo('#addVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#addVendorsDetailsModalTableId thead tr').clone(true).appendTo('#addVendorsDetailsModalTableId thead');
                $('#addVendorsDetailsModalTableId thead tr:eq(1) th').each(function(i) {
                    $('#addVendorsDetailsModalTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (addVendorsDetailsModalTable.column(i).search() !== this.value) {
                            addVendorsDetailsModalTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                addVendorsDetailsModalTable = $('table.addVendorsDetailsModalTable_Id').DataTable({
                    lengthChange: false,
                    orderCellsTop: true,
                    fixedHeader: true,
                    buttons: [
                        {
                            extend: 'collection',
                            text: 'Export',
                            buttons: [
                                {extend: 'excel', title: 'Vendor Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'pdf', title: 'Vendor Details', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'print', title: 'Vendor Details', customize: function(win)
                                    {
                                        var css = '@page { size: landscape; }',
                                                head = win.document.head || win.document.getElementsByTagName('head')[0],
                                                style = win.document.createElement('style');
                                        style.type = 'text/css';
                                        style.media = 'print';
                                        if (style.styleSheet)
                                        {
                                            style.styleSheet.cssText = css;
                                        }
                                        else
                                        {
                                            style.appendChild(win.document.createTextNode(css));
                                        }
                                        head.appendChild(style);
                                    }, exportOptions: {
                                        columns: "thead th:not(.noExport)"
                                    }
                                }
                            ]
                        }
                    ]
                });
                addVendorsDetailsModalTable.buttons().container()
                        .appendTo('#addVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}

function findVendorsFromVendorMasterInCreateGroup()
{
    console.log("In findVendorsFromVendorMaster:");
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "findVendorsFromVendorMaster",
            "recordCount": $("#vendorMasterRecordCount").val(),
            "vendorCodeOrNameSearchText": $("#vendorCodeOrName_SearchText").val(),
            "lastVMSno": $("#lastVMSno").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var venodorArr = obj;
            console.log("venodorArr len: " + venodorArr.length);

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

            var rfq_operation = $("#rfq_operation").val();
            console.log("rfq_operation: " + rfq_operation);

            var rfqVendorIdArray = [];
            if (rfq_operation === "update")
            {
                $("#rfqdetails_vendor_table tbody tr").each(function() {
                    var rfqVendorId = $(this).find("td").eq(8).text();
                    rfqVendorIdArray.push(rfqVendorId);
                });
                console.log("rfqVendorIdArray: " + rfqVendorIdArray);
            }

            var vendorRow = "";
            $("#addVendorsDetailsModalTableId tbody tr").remove();

            for (var i = 0; i < venodorArr.length; i++)
            {
                vendorRow += "<tr>"
                        + "<td><input type='checkbox' class='select-vendor-from-modal' value='" + venodorArr[i].vendorCode + "'><input type='hidden' class='vendor-type' value='SAP'></td>"
                        + "<td>" + venodorArr[i].vendorName + "</td>"
                        + "<td>" + venodorArr[i].vendorCode + "</td>"
                        + "<td>" + venodorArr[i].company + "</td>"
                        + "<td>" + venodorArr[i].mailId + "</td>"
                        + "<td>" + venodorArr[i].address1 + "," + venodorArr[i].address2 + "," + venodorArr[i].address3 + "</td>"
                        + "<td>SAP Vendor</td>"
                        + "</tr>";

            }

            $("#addVendorsDetailsModalTableId tbody").append(vendorRow);

            if ($.fn.DataTable.isDataTable('#addVendorsDetailsModalTableId')) {
                addVendorsDetailsModalTable.destroy();
                addVendorsDetailsModalTable = null;
                $("#addVendorsDetailsModalTableId").children('tbody').html(vendorRow);
                addVendorsDetailsModalTable = $('table.addVendorsDetailsModalTable_Id').DataTable({
                    lengthChange: false,
                    orderCellsTop: true,
                    fixedHeader: true,
                    buttons: [
                        {
                            extend: 'collection',
                            text: 'Export',
                            buttons: [
                                {extend: 'excel', title: 'Vendor Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'pdf', title: 'Vendor Details', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'print', title: 'Vendor Details', customize: function(win)
                                    {
                                        var css = '@page { size: landscape; }',
                                                head = win.document.head || win.document.getElementsByTagName('head')[0],
                                                style = win.document.createElement('style');
                                        style.type = 'text/css';
                                        style.media = 'print';
                                        if (style.styleSheet)
                                        {
                                            style.styleSheet.cssText = css;
                                        }
                                        else
                                        {
                                            style.appendChild(win.document.createTextNode(css));
                                        }
                                        head.appendChild(style);
                                    }, exportOptions: {
                                        columns: "thead th:not(.noExport)"
                                    }
                                }
                            ]
                        }
                    ]
                });
                addVendorsDetailsModalTable.buttons().container()
                        .appendTo('#addVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#addVendorsDetailsModalTableId thead tr').clone(true).appendTo('#addVendorsDetailsModalTableId thead');
                $('#addVendorsDetailsModalTableId thead tr:eq(1) th').each(function(i) {
                    $('#addVendorsDetailsModalTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (addVendorsDetailsModalTable.column(i).search() !== this.value) {
                            addVendorsDetailsModalTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                addVendorsDetailsModalTable = $('table.addVendorsDetailsModalTable_Id').DataTable({
                    lengthChange: false,
                    orderCellsTop: true,
                    fixedHeader: true,
                    buttons: [
                        {
                            extend: 'collection',
                            text: 'Export',
                            buttons: [
                                {extend: 'excel', title: 'Vendor Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'pdf', title: 'Vendor Details', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                {extend: 'print', title: 'Vendor Details', customize: function(win)
                                    {
                                        var css = '@page { size: landscape; }',
                                                head = win.document.head || win.document.getElementsByTagName('head')[0],
                                                style = win.document.createElement('style');
                                        style.type = 'text/css';
                                        style.media = 'print';
                                        if (style.styleSheet)
                                        {
                                            style.styleSheet.cssText = css;
                                        }
                                        else
                                        {
                                            style.appendChild(win.document.createTextNode(css));
                                        }
                                        head.appendChild(style);
                                    }, exportOptions: {
                                        columns: "thead th:not(.noExport)"
                                    }
                                }
                            ]
                        }
                    ]
                });
                addVendorsDetailsModalTable.buttons().container()
                        .appendTo('#addVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}