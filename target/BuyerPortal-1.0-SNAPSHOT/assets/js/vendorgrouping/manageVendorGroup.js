$(document).ready(function() {
    $("#associateGroupBtnId").click(function() {
        $("#groupname").val("");
        $("#vendorIdsForEditGroup").val("");
        $("#sapVendorCodeForEditGroup").val("");
        $("#updategroup_vendor_table tbody tr").remove();
        selectedVendorIdsForEditGroup = [];
        selectedVendorDetailsArrForEditGroup = [];
        sapSelectedVendorCodeForEditGroup = [];
        sapSelectedVendorDetailsForEditGroup = [];
        $("#associategroupmodal").modal("show");
    });
    $("#groups").change(function() {
        var groupid = $(this).val();
        console.log("groupid: " + groupid);
        $("#overlay").css("display", "block");
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "VendorByGroup",
                                "GroupId": groupid + ""
                            },
                    dataType: "json",
                    complete: function(responseJson)
                    {
                        var vendorGroupMappingJsonArr = $.parseJSON(responseJson.responseText);
                        vendorGroupMappingJsonArr = JSON.parse(JSON.stringify(vendorGroupMappingJsonArr));
                        console.log("vendorGroupMappingJsonArr len: " + vendorGroupMappingJsonArr.length);

                        if (vendorGroupMappingJsonArr.length === 0)
                        {
                            Lobibox.alert("info",
                                    {
                                        msg: "There is no vendor in this group!"
                                    });
                        }

                        var row = "";
                        $("#updategroup_vendor_table tbody tr").remove();
                        for (var i = 0; i < vendorGroupMappingJsonArr.length; i++)
                        {
                            console.log("Vendor Id: " + vendorGroupMappingJsonArr[i].ngBpVendordetailsId.id);

                            var id = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.id;
                            var firstName = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.firstname === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.firstname;
                            var lastName = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.lastname === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.lastname;
                            var code = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.code === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.code;
                            var address = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.address === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.address;
                            var emailId = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.emailid === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.emailid;

                            row += "<tr><td>" + firstName + " " + lastName + "</td><td>" + code + "</td><td>" + address + "</td><td>" + emailId + "</td><td><i class='fa fa-trash deleteRow'/><input type='hidden' class='selected-vendor-type' value='Vendor'><input type='hidden' class='vendorclass' name='vendorid' value=" + id + "><input type='hidden' class='isVendorOldOrNew' value='old'></td></tr>";
                        }
                        $("#updategroup_vendor_table tbody").append(row);
                        $("#mappgroupbtn").prop("disabled", false);
                        $("#addNewVendorToManageGroupBtn").prop("disabled", false);
                        $("#overlay").css("display", "none");
                    }
                });

        $("#changegroupname").removeClass("hidden");
        $("#changegroupname_id").val(groupid);
        $("#vendorgroupname").val($("#groups :selected").text());
    });
    $("#updategroup_vendor_table").on("click", ".deleteRow", function() {
        var vendorId = $(this).parent().children(".vendorclass").val();
        var groupId = $("#groups").val();
        var currentTr = $(this).parent().parent();
        console.log("vendorId: " + vendorId);
        console.log("groupId: " + groupId);
        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "deleteVendorGroupMapping",
                "groupId": groupId,
                "vendorId": vendorId
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Result: " + obj.Result);
                if (obj.Result === "Success")
                {
                    currentTr.remove();
                    Lobibox.alert("success",
                            {
                                msg: "Vendor deleted successfully."
                            });
                }
                else
                {
                    Lobibox.alert("error",
                            {
                                msg: "Error in deleting vendor, try again."
                            });
                }
                $("#overlay").css("display", "none");
            }
        });
    });
    $("#changegroupname").click(function() {
        var groupid = $("#changegroupname_id").val();
        console.log(groupid);
        var groupname = $("#vendorgroupname").val();
        console.log("groupname :" + groupname);
        $("#updategroupname").val(groupname);
        $("#changegroupname_div").modal("show");
    });
    $("#mappgroupbtn").click(function() {
        var groupId = $("#groups").val();
        console.log("groupId: " + groupId);

        var vendorIdsForEditGroup = $("#vendorIdsForEditGroup").val();
        console.log("vendorIdsForEditGroup: " + vendorIdsForEditGroup);

        var sapVendorCodeForEditGroup = $("#sapVendorCodeForEditGroup").val();
        console.log("sapVendorCodeForEditGroup: " + sapVendorCodeForEditGroup);

        if ($("#updategroup_vendor_table tbody tr").length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        }

        $("#overlay").css("display", "block");

        $.ajax(
                {
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "MapVendorsToGroup",
                                "groupId": groupId,
                                "vendorIdsForEditGroup": vendorIdsForEditGroup,
                                "sapVendorCodeForEditGroup": sapVendorCodeForEditGroup
                            },
                    dataType: "json",
                    success: function(data, textStatus, jqXHR) {
//                        alert("success");
                        $("#overlay").css("display", "none");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
//                        alert("error");
                        $("#overlay").css("display", "none");
                        Lobibox.alert("error", {
                            msg: "Please select vendor!"
                        });
                        return false;

                    },
                    complete: function(responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);

                        Lobibox.alert("success", {
                            msg: 'Group updated successfully.'
                        });
                    }

                });
    });

    //--------------------------------------------------Vendor Picklist Starts------------------------------------------------------------------------//
    // Btn to open vendor modal
    $("#addNewVendorToManageGroupBtn").click(function() {
        var vendorType = $("#vendorType_MG").val();
        console.log("vendorType: " + vendorType);

        $("#overlay").css("display", "block");
        setTimeout(function() {
            if (vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetails();
            } else if (vendorType === "SapVendor") {
                findVendorsFromVendorMaster();
            }
            $("#overlay").css("display", "none");
            $("#manageGroupAddVendorsDetailsModal").modal("show");
        }, 1000);
    });

    // Vendor Picklist Clear Btn
    $("#clearSearchVendorMasterBtn_MG").click(function() {
        $("#vendorCodeOrName_SearchText_MG").val("");
        $("#lastVMSno_MG").val("1");
    });

    // Vendor Picklist Record Count Dropdown
    $("#vendorMasterRecordCount_MG").change(function() {
        $("#lastVMSno_MG").val("1");
    });

    // Vendor Picklist Search Btn
    $("#searchVendorMasterBtn_MG").click(function() {
        var vendorType = $("#vendorType_MG").val();
        console.log("vendorType: " + vendorType);
        
        $("#lastVMSno_MG").val("1");
        $("#overlay").css("display", "block");
        $("#manageGroupAddVendorsDetailsModal").modal("hide");
        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetails();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMaster();
            }
            $("#overlay").css("display", "none");
            $("#manageGroupAddVendorsDetailsModal").modal("show");
        }, 1000);
    });

    // Vendor Picklist Next Btn
    $("#searchVendorMasterNextBtn_MG").click(function() {
        var vendorType = $("#vendorType_MG").val();
        console.log("vendorType: " + vendorType);
        
        $("#overlay").css("display", "block");
        $("#manageGroupAddVendorsDetailsModal").modal("hide");

        var nextPageNo = Number($("#lastVMSno_MG").val()) + 1;
        $("#lastVMSno_MG").val(nextPageNo);

        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetails();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMaster();
            }
            $("#overlay").css("display", "none");
            $("#manageGroupAddVendorsDetailsModal").modal("show");
        }, 1000);

        $("#searchVendorMasterPrevBtn_MG").prop("disabled", false);
    });

    // Vendor Picklist Prev Btn
    $("#searchVendorMasterPrevBtn_MG").click(function() {
        var vendorType = $("#vendorType_MG").val();
        console.log("vendorType: " + vendorType);
        
        var prevPageNo = Number($("#lastVMSno_MG").val()) - 1;
        $("#lastVMSno_MG").val(prevPageNo);

        $("#overlay").css("display", "block");
        $("#manageGroupAddVendorsDetailsModal").modal("hide");
        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetails();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMaster();
            }
            $("#overlay").css("display", "none");
            $("#manageGroupAddVendorsDetailsModal").modal("show");
        }, 1000);

        if (Number(prevPageNo) === 1)
            $("#searchVendorMasterPrevBtn_MG").prop("disabled", true);
        else
            $("#searchVendorMasterPrevBtn_MG").prop("disabled", false);
    });
    //--------------------------------------------------Vendor Picklist Ends------------------------------------------------------------------------//

    var selectedVendorIdsForEditGroup = [];
    var selectedVendorDetailsArrForEditGroup = [];

    var sapSelectedVendorCodeForEditGroup = [];
    var sapSelectedVendorDetailsForEditGroup = [];

    $("#manageGroupAddVendorsDetailsModalTableId").on('click', '.select-vendor-from-modal', function() {
        var id = $(this).val();
        var vendorType = $(this).parent().children(".vendor-type").val();
        console.log("id: " + id);
        console.log("vendorType: " + vendorType);

        if (vendorType !== "SAP")
        {
            console.log("Selected vendor is not SAP vendor!");

            var tempArr = [];
            tempArr = $("#vendorIdsForEditGroup").val().split(",");
            console.log("Selected Vendor Array: " + tempArr);
            console.log("selectedVendorIds len: " + selectedVendorIdsForEditGroup.length);
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
                    console.log("selectedVendorIds: " + selectedVendorIdsForEditGroup);
                    selectedVendorIdsForEditGroup.push(id);
                    selectedVendorDetailsArrForEditGroup.push(vendorDetails);
                }
                else
                {
                    var index = selectedVendorIdsForEditGroup.indexOf(id);
                    console.log("index: " + index);

                    selectedVendorIdsForEditGroup.splice(index, 1);
                    selectedVendorDetailsArrForEditGroup.splice(index, 1);
                }
                console.log("selectedVendorIds.toString(): " + selectedVendorIdsForEditGroup.toString());
                $("#vendorIdsForEditGroup").val(selectedVendorIdsForEditGroup.toString());
            }
        }
        else
        {
            console.log("Selected vendor is SAP vendor!");

            var tempArr = [];
            tempArr = $("#sapVendorCodeForEditGroup").val().split(",");
            console.log("Selected SAP Vendor Array: " + tempArr);
            console.log("selectedSAPVendorIds len: " + sapSelectedVendorCodeForEditGroup.length);
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
                    sapSelectedVendorCodeForEditGroup.push(id);
                    sapSelectedVendorDetailsForEditGroup.push(vendorDetails);
                }
                else
                {
                    var index = sapSelectedVendorCodeForEditGroup.indexOf(id);
                    console.log("index: " + index);

                    sapSelectedVendorCodeForEditGroup.splice(index, 1);
                    sapSelectedVendorDetailsForEditGroup.splice(index, 1);
                }
                $("#sapVendorCodeForEditGroup").val(sapSelectedVendorCodeForEditGroup.toString());
            }
        }
    });
    $("#manageGroupAddSelectedVendorToEditGroupTable").click(function() {
        if (selectedVendorIdsForEditGroup.length === 0 && sapSelectedVendorCodeForEditGroup.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        }
        else
        {
            $("#updategroup_vendor_table tbody tr").each(function() {
                var isVendorOldOrNew = $(this).find("td").eq(4).children(".isVendorOldOrNew").val();
                if (isVendorOldOrNew === "new")
                {
                    $(this).remove();
                }
            });

            var row = "";
            // Vendor or Prospect
            for (var i = 0; i < selectedVendorIdsForEditGroup.length; i++)
            {
                row += "<tr><td>" + selectedVendorDetailsArrForEditGroup[i].vendorName + "</td><td>" + selectedVendorDetailsArrForEditGroup[i].compCode + "</td><td>" + selectedVendorDetailsArrForEditGroup[i].address + "</td><td>" + selectedVendorDetailsArrForEditGroup[i].emailId + "</td><td><i class='fa fa-trash deleteNewRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + selectedVendorDetailsArrForEditGroup[i].vendorId + "><input type='hidden' class='selected-vendor-type' value='Vendor'><input type='hidden' class='isVendorOldOrNew' value='new'></td></tr>";
            }

            // SAP Vendors
            for (var i = 0; i < sapSelectedVendorCodeForEditGroup.length; i++)
            {
                row += "<tr><td>" + sapSelectedVendorDetailsForEditGroup[i].vendorName + "</td><td>" + sapSelectedVendorDetailsForEditGroup[i].compCode + "</td><td>" + sapSelectedVendorDetailsForEditGroup[i].address + "</td><td>" + sapSelectedVendorDetailsForEditGroup[i].emailId + "</td><td><i class='fa fa-trash deleteNewRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + sapSelectedVendorDetailsForEditGroup[i].vendorId + "><input type='hidden' class='selected-vendor-type' value='SAP'><input type='hidden' class='isVendorOldOrNew' value='new'></td></tr>";
            }

            $("#updategroup_vendor_table").children("tbody").append(row);
            $("#manageGroupAddVendorsDetailsModal").modal("hide");
            var vendorGroupFrom = $("#vendorGroupFrom").val();
            console.log("vendorGroupFrom: " + vendorGroupFrom);
            if (vendorGroupFrom === "rfq" || vendorGroupFrom === "rfp")
            {
                $("#associategroupmodal").modal("show");
            }
        }
    });

    $("#updategroup_vendor_table").on("click", ".deleteNewRow", function() {
        console.log("selectedVendorIds: " + selectedVendorIdsForEditGroup);
        console.log("sapSelectedVendorCode: " + sapSelectedVendorCodeForEditGroup);

        var vname = $("#vendorIdsForEditGroup").val();
        var sapVendorCodes = $("#sapVendorCodeForEditGroup").val();
        var id = $(this).parent().find(".vendorclass").val();
        var selectedVendorType = $(this).parent().find(".selected-vendor-type").val();
        console.log("selectedVendorType: " + selectedVendorType);

        if (selectedVendorType !== "SAP")
        {
            var arr = vname.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                selectedVendorDetailsArrForEditGroup.splice(index, 1);
                $("#vendorIdsForEditGroup").val(arr);
                selectedVendorIdsForEditGroup = $("#vendorIdsForEditGroup").val().split(",");
            }
        }
        else
        {
            var arr = sapVendorCodes.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                sapSelectedVendorDetailsForEditGroup.splice(index, 1);
                $("#sapVendorCodeForEditGroup").val(arr);
                sapSelectedVendorCodeForEditGroup = $("#sapVendorCodeForEditGroup").val().split(",");
            }
        }
        $(this).parent().parent().remove();
    });
});

var manageGroupAddVendorsDetailsModalTableId = null;

function findActiveVendorsAndProspectFromVendorDetails()
{
    var vendorGroupFrom = $("#vendorGroupFrom").val();
    console.log("vendorGroupFrom: " + vendorGroupFrom);
    if (vendorGroupFrom === "rfq" || vendorGroupFrom === "rfp")
    {
        $("#associategroupmodal").modal("hide");
    }
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "findActiveVendorsAndProspectFromVendorDetails",
            "recordCount": $("#vendorMasterRecordCount_MG").val(),
            "vendorCodeOrNameSearchText": $("#vendorCodeOrName_SearchText_MG").val(),
            "lastVMSno": $("#lastVMSno_MG").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var venodorArr = obj;
            console.log("venodorArr: " + venodorArr.length);

            var vendorMasterRecordCount = $("#vendorMasterRecordCount_MG").val();
            console.log("vendorMasterRecordCount: " + vendorMasterRecordCount);

            if (obj.length < Number(vendorMasterRecordCount))
            {
                $("#searchVendorMasterNextBtn_MG").prop("disabled", true);
            }
            else
            {
                $("#searchVendorMasterNextBtn_MG").prop("disabled", false);
            }

            var rfqVendorIdArray = [];
            $("#updategroup_vendor_table tbody tr").each(function() {
                var rfqVendorId = $(this).find("td").eq(4).children(".vendorclass").val();
                rfqVendorIdArray.push(rfqVendorId);
            });
            console.log("rfqVendorIdArray: " + rfqVendorIdArray);

            var vendorRow = "";
            $("#manageGroupAddVendorsDetailsModalTableId tbody tr").remove();

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

            $("#manageGroupAddVendorsDetailsModalTableId tbody").append(vendorRow);

            if ($.fn.DataTable.isDataTable('#manageGroupAddVendorsDetailsModalTableId')) {
                manageGroupAddVendorsDetailsModalTableId.destroy();
                manageGroupAddVendorsDetailsModalTableId = null;
                $("#manageGroupAddVendorsDetailsModalTableId").children('tbody').html(vendorRow);
                manageGroupAddVendorsDetailsModalTableId = $('table.manageGroupAddVendorsDetailsModalTableId').DataTable({
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
                manageGroupAddVendorsDetailsModalTableId.buttons().container()
                        .appendTo('#manageGroupAddVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#manageGroupAddVendorsDetailsModalTableId thead tr').clone(true).appendTo('#manageGroupAddVendorsDetailsModalTableId thead');
                $('#manageGroupAddVendorsDetailsModalTableId thead tr:eq(1) th').each(function(i) {
                    $('#manageGroupAddVendorsDetailsModalTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (manageGroupAddVendorsDetailsModalTableId.column(i).search() !== this.value) {
                            manageGroupAddVendorsDetailsModalTableId
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                manageGroupAddVendorsDetailsModalTableId = $('table.manageGroupAddVendorsDetailsModalTableId').DataTable({
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
                manageGroupAddVendorsDetailsModalTableId.buttons().container()
                        .appendTo('#manageGroupAddVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}

function findVendorsFromVendorMaster()
{
    var vendorGroupFrom = $("#vendorGroupFrom").val();
    console.log("vendorGroupFrom: " + vendorGroupFrom);
    if (vendorGroupFrom === "rfq" || vendorGroupFrom === "rfp")
    {
        $("#associategroupmodal").modal("hide");
    }
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: true,
        data: {
            "reqFrom": "findVendorsFromVendorMaster",
            "recordCount": $("#vendorMasterRecordCount_MG").val(),
            "vendorCodeOrNameSearchText": $("#vendorCodeOrName_SearchText_MG").val(),
            "lastVMSno": $("#lastVMSno_MG").val()
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var venodorArr = obj;
            console.log("venodorArr: " + venodorArr.length);

            var vendorMasterRecordCount = $("#vendorMasterRecordCount_MG").val();
            console.log("vendorMasterRecordCount: " + vendorMasterRecordCount);

            if (obj.length < Number(vendorMasterRecordCount))
            {
                $("#searchVendorMasterNextBtn_MG").prop("disabled", true);
            }
            else
            {
                $("#searchVendorMasterNextBtn_MG").prop("disabled", false);
            }

            var rfqVendorIdArray = [];
            $("#updategroup_vendor_table tbody tr").each(function() {
                var rfqVendorId = $(this).find("td").eq(4).children(".vendorclass").val();
                rfqVendorIdArray.push(rfqVendorId);
            });
            console.log("rfqVendorIdArray: " + rfqVendorIdArray);

            var vendorRow = "";
            $("#manageGroupAddVendorsDetailsModalTableId tbody tr").remove();

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

            $("#manageGroupAddVendorsDetailsModalTableId tbody").append(vendorRow);

            if ($.fn.DataTable.isDataTable('#manageGroupAddVendorsDetailsModalTableId')) {
                manageGroupAddVendorsDetailsModalTableId.destroy();
                manageGroupAddVendorsDetailsModalTableId = null;
                $("#manageGroupAddVendorsDetailsModalTableId").children('tbody').html(vendorRow);
                manageGroupAddVendorsDetailsModalTableId = $('table.manageGroupAddVendorsDetailsModalTableId').DataTable({
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
                manageGroupAddVendorsDetailsModalTableId.buttons().container()
                        .appendTo('#manageGroupAddVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#manageGroupAddVendorsDetailsModalTableId thead tr').clone(true).appendTo('#manageGroupAddVendorsDetailsModalTableId thead');
                $('#manageGroupAddVendorsDetailsModalTableId thead tr:eq(1) th').each(function(i) {
                    $('#manageGroupAddVendorsDetailsModalTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (manageGroupAddVendorsDetailsModalTableId.column(i).search() !== this.value) {
                            manageGroupAddVendorsDetailsModalTableId
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                manageGroupAddVendorsDetailsModalTableId = $('table.manageGroupAddVendorsDetailsModalTableId').DataTable({
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
                manageGroupAddVendorsDetailsModalTableId.buttons().container()
                        .appendTo('#manageGroupAddVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}