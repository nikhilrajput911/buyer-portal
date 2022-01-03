$(document).ready(function() {
    console.log("Inside vendorMasterPickList js:");

    $("#clearSearchVendorMasterBtn").click(function() {
        $("#vendorCodeOrName_SearchText").val("");
        $("#lastVMSno").val("1");
    });

    $("#vendorMasterRecordCount").change(function() {
        $("#lastVMSno").val("1");
    });

    $("#searchVendorMasterBtn").click(function() {
        $("#lastVMSno").val("1");
        $("#overlay").css("display", "block");
        $("#vendorMasterModal").modal("hide");
        setTimeout(function() {
            findVendorsFromVendorMaster();
            $("#overlay").css("display", "none");
            $("#vendorMasterModal").modal("show");
        }, 1000);
    });

    $("#searchVendorMasterNextBtn").click(function() {
        $("#overlay").css("display", "block");
        $("#vendorMasterModal").modal("hide");

        var nextPageNo = Number($("#lastVMSno").val()) + 1;
        $("#lastVMSno").val(nextPageNo);

        setTimeout(function() {
            findVendorsFromVendorMaster();
            $("#overlay").css("display", "none");
            $("#vendorMasterModal").modal("show");
        }, 1000);

        $("#searchVendorMasterPrevBtn").prop("disabled", false);
    });

    $("#searchVendorMasterPrevBtn").click(function() {
        var prevPageNo = Number($("#lastVMSno").val()) - 1;
        $("#lastVMSno").val(prevPageNo);

        $("#overlay").css("display", "block");
        $("#vendorMasterModal").modal("hide");
        setTimeout(function() {
            findVendorsFromVendorMaster();
            $("#overlay").css("display", "none");
            $("#vendorMasterModal").modal("show");
        }, 1000);

        if (Number(prevPageNo) === 1)
            $("#searchVendorMasterPrevBtn").prop("disabled", true);
        else
            $("#searchVendorMasterPrevBtn").prop("disabled", false);
    });
});


var vendorMasterTable = null;
function findVendorsFromVendorMaster() {
    console.log("In findVendorsFromVendorMaster:");
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "findVendorsFromVendorMaster",
            "recordCount": $("#vendorMasterRecordCount").val(),
            "vendorCodeOrNameSearchText": $("#vendorCodeOrName_SearchText").val(),
            "lastVMSno": $("#lastVMSno").val()
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

function autoPopulateVendorDetailsFromVendorMasterByCode(vendorCode)
{
    console.log("vendorCode: " + vendorCode);

    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "findMasterVendorByVendorCode",
            "vendorCode": vendorCode
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var name = obj.VENDORNAME;
            var organization = obj.ORGANIZATION;
            var address = obj.ADDRESS;
            var paymentterm = obj.PAYMENTTERM;
            var compcode = obj.COMPANY_CODE;

            var city = obj.CITY;
            var contactNo = obj.CONTACT_NO;
            var country = obj.COUNTRY;
            var postalCode = obj.POSTAL_CODE;

            $("#organization").val(organization + " - " + compcode);
            $("#firstname").val(name);
            $("#address").val(address);
            $("#paymentTerms").val(paymentterm);

            $("#city").val(city);
            $("#country").val(country);
            $("#postalcode").val(postalCode);
            $("#contactnumberoff").val(contactNo);
        }
    });
}