$(document).ready(function() {
    $("#overlay").css("display", "none");

    var buyerAuditReportTable = null;
    $("#generateBuyerAuditReport").click(function() {
//        alert("sad");
//        $("#overlay").css("display", "block");
        var buyerid = $("#buyerAuditBuyerName").val();
        var fromDate = $("#buyerAuditFromDate").val();
        var toDate = $("#buyerAuditToDate").val();

        if (buyerid == '' && fromDate === '' && toDate === '')
        {
            Lobibox.alert("error", {
                msg: "Please enter search criteria!"
            });
            return false;
        }
        if (fromDate !== '' && toDate === '')
        {
            Lobibox.alert("error", {
                msg: "Please enter to date!"
            });
            return false;
        }
        if (fromDate === '' && toDate !== '')
        {
            Lobibox.alert("error", {
                msg: "Please enter from date!"
            });
            return false;
        }
        $("#overlay").css("display", "block");
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "findBuyerLogs",
                                "buyerId": buyerid,
                                "fromDate": fromDate,
                                "toDate": toDate
                            },
                    complete: function(responseJson) {
                        var arr = $.parseJSON(responseJson.responseText);
//                        alert(arr.length);
                        $("#buyerAuditReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].Activity + "</td><td>" + arr[i].Date + "</td><td>" + arr[i].Username + "</td><td>" + arr[i].BuyerName + "</td></tr>";
                        }
                        console.log(row);
                        $("#buyerAuditReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#buyerAuditReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            buyerAuditReportTable.destroy();
                            buyerAuditReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#buyerAuditReportTable").children('tbody').html(row);

                            buyerAuditReportTable = $('table.buyer-AuditReport-Table').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                                        buttons: [
                                            {extend: 'excel', title: 'Buyer Audit Log Report'},
                                            {extend: 'pdf', title: 'Buyer Audit Log Report'},
                                            {extend: 'print', title: 'Buyer Audit Log Report'}
                                        ]
                                    }
                                ]
                            });

                            buyerAuditReportTable.buttons().container()
                                    .appendTo('#buyerAuditReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#buyerAuditReportTable thead tr').clone(true).appendTo('#buyerAuditReportTable thead');
                            $('#buyerAuditReportTable thead tr:eq(1) th').each(function(i) {
                                $('#buyerAuditReportTable thead tr:eq(0) th').addClass("table-header-color");
                                var title = $(this).text();
                                if (title === "")
                                {
                                    $(this).html('');
                                }
                                else
                                {
                                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                                }
                                $('input', this).on('keyup change', function() {
                                    if (buyerAuditReportTable.column(i).search() !== this.value) {
                                        buyerAuditReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            buyerAuditReportTable = $('table.buyer-AuditReport-Table').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                                        buttons: [
                                            {extend: 'excel', title: 'Buyer Audit Log Report'},
                                            {extend: 'pdf', title: 'Buyer Audit Log Report'},
                                            {extend: 'print', title: 'Buyer Audit Log Report'}
                                        ]
                                    }
                                ]
                            });

                            buyerAuditReportTable.buttons().container()
                                    .appendTo('#buyerAuditReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
    });
    var openRfqReportTable = null;
    $("#generateOpenRfqReport").click(function() {
//        alert("sad");        
        var plantCode = $("#plantCode_R3").val();
        var rfqId = $("#rfqNo_R3").val();
        var purchaseGroup = $("#PurchaseGroup_R3").val();
        var buyerId = $("#BuyerName_R3").val();

        if (plantCode == '' && rfqId == '' && purchaseGroup == '' && buyerId == '')
        {
            Lobibox.alert("error", {
                msg: "Please enter search criteria!"
            });
            return false;
        }
        $("#overlay").css("display", "block");

        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "findOpenRfqReport",
                                "plantCode": plantCode,
                                "rfqId": rfqId,
                                "purchaseGroup": purchaseGroup,
                                "buyerId": buyerId
                            },
                    complete: function(responseJson) {
                        var arr = $.parseJSON(responseJson.responseText);
//                        alert(arr.length);
                        $("#openRfqReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            var prno = '';
                            if (arr[i].PrNumber !== undefined)
                            {
                                prno = arr[i].PrNumber;
                            }
                            var vendorcount = '';
                            if (arr[i].VendorCount !== undefined)
                            {
                                vendorcount = arr[i].VendorCount;
                            }
                            var vendorselected = '';
                            if (arr[i].VendorSelected !== undefined)
                            {
                                vendorselected = arr[i].VendorSelected;
                            }
                            var vendorrespcount = '';
                            if (arr[i].VendorResponseCount !== undefined)
                            {
                                vendorrespcount = arr[i].VendorResponseCount;
                            }

                            row += "<tr><td>" + arr[i].RfqNumber + "</td><td>" + arr[i].PendingWith + "</td><td>" + arr[i].TotalPrLines + "</td><td>" + prno + "</td><td>" + vendorcount + "</td><td>" + vendorselected + "</td><td>" + vendorrespcount + "</td><td>" + arr[i].AgeingInDays + "</td></tr>";
                        }
                        console.log(row);
                        $("#openRfqReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#openRfqReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            openRfqReportTable.destroy();
                            openRfqReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#openRfqReportTable").children('tbody').html(row);

                            openRfqReportTable = $('table.openRfqReportTable').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                                        buttons: [
                                            {extend: 'excel', title: 'Open RFQ Report'},
                                            {extend: 'pdf', title: 'Open RFQ Report'},
                                            {extend: 'print', title: 'Open RFQ Report'}
                                        ]
                                    }
                                ]
                            });

                            openRfqReportTable.buttons().container()
                                    .appendTo('#openRfqReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#openRfqReportTable thead tr').clone(true).appendTo('#openRfqReportTable thead');
                            $('#openRfqReportTable thead tr:eq(1) th').each(function(i) {
                                $('#openRfqReportTable thead tr:eq(0) th').addClass("table-header-color");
                                var title = $(this).text();
                                if (title === "")
                                {
                                    $(this).html('');
                                }
                                else
                                {
                                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                                }
                                $('input', this).on('keyup change', function() {
                                    if (openRfqReportTable.column(i).search() !== this.value) {
                                        openRfqReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            openRfqReportTable = $('table.openRfqReportTable').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                                        buttons: [
                                            {extend: 'excel', title: 'Open RFQ Report'},
                                            {extend: 'pdf', title: 'Open RFQ Report'},
                                            {extend: 'print', title: 'Open RFQ Report'}
                                        ]
                                    }
                                ]
                            });

                            openRfqReportTable.buttons().container()
                                    .appendTo('#openRfqReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
    });

    var prStatusReportTable = null;
    $("#prStatusReportBtn").click(function() {
        console.log("prStatusReportBtn");

        var PlantCode = $("#PlantCode_R4").val();
        var PrNo = $("#PrNo_R4").val();
        var PurchaseGroup = $("#PurchaseGroup_R4").val();
        var PRRaisedBy = $("#PRRaisedBy_R4").val();
        var FromPRApprovedDate = $("#FromPRApprovedDate_R4").val();
        var ToPRApprovedDate = $("#ToPRApprovedDate_R4").val();
        var FromRequiredDate = $("#FromRequiredDate_R4").val();
        var ToRequiredDate = $("#ToRequiredDate_R4").val();
        var TrackingNumber = $("#TrackingNumber_R4").val();
        var ProcessingStatus = $("#ProcessingStatus_R4").val();
        var ToPlantCode = $("#ToPlantCode_R4").val();
        var ToPrNo = $("#ToPrNo_R4").val();
        var ToPurchaseGroup = $("#ToPurchaseGroup_R4").val();
        var MaterialCode = $("#MaterialCode_R4").val();

        if (PlantCode === "0" && ToPlantCode === "0" && PrNo == "" && ToPrNo == "" && PurchaseGroup == "" && ToPurchaseGroup == ""
                && TrackingNumber == "" && ProcessingStatus === "" && FromPRApprovedDate === "" && ToPRApprovedDate === ""
                && FromRequiredDate === "" && ToRequiredDate === "" && PRRaisedBy === "" && MaterialCode === "")
        {
            Lobibox.alert("error", {
                msg: "Please enter search criteria!"
            });
            return false;
        }

        $("#overlay").css("display", "block");
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "PurchaseRequestStatusReport",
                                "PlantCode": PlantCode,
                                "PrNo": PrNo,
                                "PurchaseGroup": PurchaseGroup,
                                "PRRaisedBy": PRRaisedBy,
                                "FromPRApprovedDate": FromPRApprovedDate,
                                "ToPRApprovedDate": ToPRApprovedDate,
                                "FromRequiredDate": FromRequiredDate,
                                "ToRequiredDate": ToRequiredDate,
                                "TrackingNumber": TrackingNumber,
                                "ProcessingStatus": ProcessingStatus,
                                "ToPlantCode": ToPlantCode,
                                "ToPrNo": ToPrNo,
                                "ToPurchaseGroup": ToPurchaseGroup,
                                "MaterialCode": MaterialCode
                            },
                    complete: function(responseJson) {
                        var arr = $.parseJSON(responseJson.responseText);
//                        alert(arr.length);
                        $("#prStatusReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].DeptDesc + "</td><td>" + arr[i].CompCode + "</td><td>" + arr[i].PRNo + "/ </td><td>" + arr[i].ApprovedBy + "/ " + arr[i].ApprovedDate + "</td><td>" + arr[i].RequisitionDate + "/ </td><td>" + arr[i].MaterialCode + "/ " + arr[i].OldMaterialCode + "/ " + arr[i].ShortText + "</td><td></td><td>" + arr[i].ItemText + "</td><td>" + arr[i].Unit + "</td><td>" + arr[i].Quantity + "/ " + arr[i].UOMStore + "</td><td>" + arr[i].LocalPurchase + "</td><td>" + arr[i].LeadTime + "/ " + arr[i].StorageLocation + "</td><td></td><td>" + arr[i].Overdue + "</td><td></td><td>/ " + arr[i].Currency + "</td><td></td><td>" + arr[i].HeaderNote + "</td><td>" + arr[i].ItemNote + "</td></tr>";
                        }
                        console.log(row);
                        $("#prStatusReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#prStatusReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            prStatusReportTable.destroy();
                            prStatusReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#prStatusReportTable").children('tbody').html(row);

                            prStatusReportTable = $('table.prStatusReportTable').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                                        buttons: [
                                            {extend: 'excel', title: 'Purchase Request Status Report'},
                                            {extend: 'pdf', title: 'Purchase Request Status Report'},
                                            {extend: 'print', title: 'Purchase Request Status Report'}
                                        ]
                                    }
                                ]
                            });

                            prStatusReportTable.buttons().container()
                                    .appendTo('#prStatusReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#prStatusReportTable thead tr').clone(true).appendTo('#prStatusReportTable thead');
                            $('#prStatusReportTable thead tr:eq(1) th').each(function(i) {
                                $('#prStatusReportTable thead tr:eq(0) th').addClass("table-header-color");
                                var title = $(this).text();
                                if (title === "")
                                {
                                    $(this).html('');
                                }
                                else
                                {
                                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                                }
                                $('input', this).on('keyup change', function() {
                                    if (prStatusReportTable.column(i).search() !== this.value) {
                                        prStatusReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            prStatusReportTable = $('table.prStatusReportTable').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                                        buttons: [
                                            {extend: 'excel', title: 'Purchase Request Status Report'},
                                            {extend: 'pdf', title: 'Purchase Request Status Report'},
                                            {extend: 'print', title: 'Purchase Request Status Report'}
                                        ]
                                    }
                                ]
                            });

                            prStatusReportTable.buttons().container()
                                    .appendTo('#prStatusReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
    });
    $("#PurchaseGroup_R4").change(function() {
        $("#ToPurchaseGroup_R4").val("");
        $("#ToPurchaseGroup_R4").selectpicker("refresh");
    });
    $("#ToPurchaseGroup_R4").change(function() {
        var toPurchaseGroup = $(this).val();
        var fromPurchaseGroup = $("#PurchaseGroup_R4").val();

        console.log("fromPurchaseGroup: " + fromPurchaseGroup);
        console.log("toPurchaseGroup: " + toPurchaseGroup);

        if (fromPurchaseGroup !== "" && toPurchaseGroup !== "")
        {
            var fromPGroup = fromPurchaseGroup.substring(0, 1);
            var toPGroup = toPurchaseGroup.substring(0, 1);

            var fromPGroupSeq = fromPurchaseGroup.substring(1, fromPurchaseGroup.length);
            var toPGroupSeq = toPurchaseGroup.substring(1, toPurchaseGroup.length);

            console.log("fromPGroup: " + fromPGroup);
            console.log("toPGroup: " + toPGroup);

            console.log("fromPGroupSeq: " + fromPGroupSeq);
            console.log("toPGroupSeq: " + toPGroupSeq);
            console.log("fromPGroupSeq Number: " + Number(fromPGroupSeq));
            console.log("toPGroupSeq Number: " + Number(toPGroupSeq));

            if (fromPGroup !== toPGroup)
            {
                Lobibox.alert("error", {
                    msg: "This should start with " + fromPGroup
                });
                $("#ToPurchaseGroup_R4").val("");
                $("#ToPurchaseGroup_R4").selectpicker("refresh");
                return false;
            }
            if (Number(toPGroupSeq) <= Number(fromPGroupSeq))
            {
                Lobibox.alert("error", {
                    msg: "This should be greater than " + fromPurchaseGroup
                });
                $("#ToPurchaseGroup_R4").val("");
                $("#ToPurchaseGroup_R4").selectpicker("refresh");
                return false;
            }
        }
    });

    $("#clearOpenRfqReport").click(function() {
//        alert("clear");
        $("#plantCode_R3").val("");
        $("#plantCode_R3").selectpicker('refresh');

        $("#rfqNo_R3").val("");
        $("#rfqNo_R3").selectpicker('refresh');

        $("#PurchaseGroup_R3").val("");
        $("#PurchaseGroup_R3").selectpicker('refresh');

        $("#BuyerName_R3").val("");
        $("#BuyerName_R3").selectpicker('refresh');
    });
    $("#clearPrStatusReportBtn").click(function() {
//        alert("clear");
        $("#PlantCode_R4").val("0");
        $("#ToPlantCode_R4").val("0");

        $("#PrNo_R4").val("");
        $("#PrNo_R4").selectpicker('refresh');
        $("#ToPrNo_R4").val("");
        $("#ToPrNo_R4").selectpicker('refresh');

        $("#PurchaseGroup_R4").val("");
        $("#PurchaseGroup_R4").selectpicker('refresh');
        $("#ToPurchaseGroup_R4").val("");
        $("#ToPurchaseGroup_R4").selectpicker('refresh');

        $("#TrackingNumber_R4").val("");
        $("#TrackingNumber_R4").selectpicker('refresh');
        $("#ProcessingStatus_R4").val("");

        $("#FromPRApprovedDate_R4").val("");
        $("#ToPRApprovedDate_R4").val("");

        $("#FromRequiredDate_R4").val("");
        $("#ToRequiredDate_R4").val("");

        $("#PRRaisedBy_R4").val("");
        $("#MaterialCode_R4").val("");
    });
    $("#clearBuyerAuditReport").click(function() {
//        alert("clear");
        $("#buyerAuditFromDate").val("");
        $("#buyerAuditToDate").val("");

        $("#buyerAuditBuyerName").val("");
        $("#buyerAuditBuyerName").selectpicker('refresh');


    });

    var poAckReportTable = null;
    $("#PoAckGenReport").click(function() {
        var PoAckFromDate = $("#PoAckFromDate").val();
        var PoAckToDate = $("#PoAckToDate").val();
        var PoAckVendorCode = $("#code").val();

        console.log("PoAckFromDate: " + PoAckFromDate);
        console.log("PoAckToDate: " + PoAckToDate);
        console.log("PoAckVendorCode: " + PoAckVendorCode);

        if (PoAckFromDate === '' && PoAckToDate === '' && PoAckVendorCode == '')
        {
            Lobibox.alert("error", {
                msg: "Please enter search criteria!"
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
                                "reqFrom": "PoAcknowledgementReport",
                                "PoAckFromDate": PoAckFromDate,
                                "PoAckToDate": PoAckToDate,
                                "PoAckVendorCode": PoAckVendorCode
                            },
                    complete: function(responseJson) {
                        var arr = $.parseJSON(responseJson.responseText);
                        arr = JSON.parse(JSON.stringify(arr));
                        console.log(arr.length);

                        $("#PoAckReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].purchaseOrderNumber + "</td><td>" + (arr[i].ackByDetails === undefined ? '' : arr[i].ackByDetails) + "</td><td>" + (arr[i].ackByDetails === undefined ? '' : arr[i].ackByDetails) + "</td><td></td></tr>";
                        }
//                        console.log(row);
                        $("#PoAckReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#PoAckReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            poAckReportTable.destroy();
                            poAckReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#PoAckReportTable").children('tbody').html(row);

                            poAckReportTable = $('table.PoAckReportTable').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
                                        buttons: [
                                            {extend: 'excel', title: 'PO Acknowledgement Report'},
                                            {extend: 'pdf', title: 'PO Acknowledgement Report'},
                                            {extend: 'print', title: 'PO Acknowledgement Report'}
                                        ]
                                    }
                                ]
                            });

                            poAckReportTable.buttons().container()
                                    .appendTo('#PoAckReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#PoAckReportTable thead tr').clone(true).appendTo('#PoAckReportTable thead');
                            $('#PoAckReportTable thead tr:eq(1) th').each(function(i) {
                                $('#PoAckReportTable thead tr:eq(0) th').addClass("table-header-color");
                                var title = $(this).text();
                                if (title === "")
                                {
                                    $(this).html('');
                                }
                                else
                                {
                                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                                }
                                $('input', this).on('keyup change', function() {
                                    if (poAckReportTable.column(i).search() !== this.value) {
                                        poAckReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            poAckReportTable = $('table.PoAckReportTable').DataTable({
//                            "scrollY": 200,
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
                                        buttons: [
                                            {extend: 'excel', title: 'PO Acknowledgement Report'},
                                            {extend: 'pdf', title: 'PO Acknowledgement Report'},
                                            {extend: 'print', title: 'PO Acknowledgement Report'}
                                        ]
                                    }
                                ]
                            });

                            poAckReportTable.buttons().container()
                                    .appendTo('#PoAckReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
    });

    $("#clearPoAckReport").click(function() {
        $("#PoAckFromDate").val("");
        $("#PoAckToDate").val("");

        $("#vendorCodeName").val("");
        $("#code").val("");
    });

    $("#clearPrToPoCycleTimeReport").click(function() {
        $("#PrToPoCycleTimeFromDate").val("");
        $("#PrToPoCycleTimeToDate").val("");

        $("#buyerId_R2").val("");
        $("#buyerId_R2").selectpicker('refresh');

        $("#teamLeadId_R2").val("");
        $("#teamLeadId_R2").selectpicker('refresh');
    });

    var prToPoCycleTimeReportTable = null;
    $("#generatePrToPoCycleTimeReport").click(function() {
        var PrToPoCycleTimeFromDate = $("#PrToPoCycleTimeFromDate").val();
        var PrToPoCycleTimeToDate = $("#PrToPoCycleTimeToDate").val();
        var buyerId_R2 = $("#buyerId_R2").val();
        var teamLeadId_R2 = $("#teamLeadId_R2").val();

        console.log("PrToPoCycleTimeFromDate: " + PrToPoCycleTimeFromDate);
        console.log("PrToPoCycleTimeToDate: " + PrToPoCycleTimeToDate);
        console.log("buyerId_R2: " + buyerId_R2);
        console.log("teamLeadId_R2: " + teamLeadId_R2);

//        if (PrToPoCycleTimeFromDate === '' && PrToPoCycleTimeToDate === '' && buyerId_R2 == '' && teamLeadId_R2 == '')
//        {
//            Lobibox.alert("error", {
//                msg: "Please enter search criteria!"
//            });
//            return false;
//        }

        $("#overlay").css("display", "block");
        $.ajax(
                {
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "PrToPoCycleTimeReport",
                                "FromDate": PrToPoCycleTimeFromDate,
                                "ToDate": PrToPoCycleTimeToDate,
                                "BuyerId": buyerId_R2,
                                "TeamLeadId": teamLeadId_R2
                            },
                    complete: function(responseJson) {
                        var arr = $.parseJSON(responseJson.responseText);
                        arr = JSON.parse(JSON.stringify(arr));
                        console.log(arr.length);

                        $("#PrToPoCycleTimeReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].purchaseOrderNumber + "</td><td>" + arr[i].purchaseOrderType + "</td><td>" + (arr[i].targetInDays === undefined ? '' : arr[i].targetInDays) + "</td><td>" + (arr[i].avgTimeTaken === undefined ? '' : arr[i].avgTimeTaken) + "</td><td>" + (arr[i].withinTarget === undefined ? '' : arr[i].withinTarget) + "</td><td>" + (arr[i].beyondTarget === undefined ? '' : arr[i].beyondTarget) + "</td><td>" + (arr[i].totalPrLines === undefined ? '0' : arr[i].totalPrLines) + "</td><td>" + (arr[i].lessThanEqual30DaysPrCount === undefined ? '' : arr[i].lessThanEqual30DaysPrCount) + "</td><td>" + (arr[i].equal30To60DaysPrCount === undefined ? '' : arr[i].equal30To60DaysPrCount) + "</td><td>" + (arr[i].equal60To90DaysPrCount === undefined ? '' : arr[i].equal60To90DaysPrCount) + "</td><td>" + (arr[i].greaterThan90DaysPrCount === undefined ? '' : arr[i].greaterThan90DaysPrCount) + "</td></tr>";
                        }
                        $("#PrToPoCycleTimeReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#PrToPoCycleTimeReportTable'))
                        {
                            prToPoCycleTimeReportTable.destroy();
                            prToPoCycleTimeReportTable = null;
                            $("#PrToPoCycleTimeReportTable").children('tbody').html(row);

                            prToPoCycleTimeReportTable = $('table.PrToPoCycleTimeReportTable').DataTable({
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
                                        buttons: [
                                            {extend: 'excel', title: 'PR to PO Cycle Time Report'},
                                            {extend: 'pdf', title: 'PR to PO Cycle Time Report'}
                                        ]
                                    }
                                ]
                            });

                            prToPoCycleTimeReportTable.buttons().container()
                                    .appendTo('#PrToPoCycleTimeReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#PrToPoCycleTimeReportTable thead tr:eq(0) th').addClass("table-header-color");
                            $('#PrToPoCycleTimeReportTable thead tr:eq(1) th').addClass("table-header-color");
                            
//                            $('#PrToPoCycleTimeReportTable thead tr').clone(true).appendTo('#PrToPoCycleTimeReportTable thead');
//                            $('#PrToPoCycleTimeReportTable thead tr:eq(2) th').each(function(i) {
//                                $('#PrToPoCycleTimeReportTable thead tr:eq(0) th').addClass("table-header-color");
//                                var title = $(this).text();
//                                if (title === "")
//                                {
//                                    $(this).html('');
//                                }
//                                else
//                                {
//                                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
//                                }
//                                $('input', this).on('keyup change', function() {
//                                    if (prToPoCycleTimeReportTable.column(i).search() !== this.value) {
//                                        prToPoCycleTimeReportTable
//                                                .column(i)
//                                                .search(this.value)
//                                                .draw();
//                                    }
//                                });
//                            });

                            prToPoCycleTimeReportTable = $('table.PrToPoCycleTimeReportTable').DataTable({
                                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
                                        buttons: [
                                            {extend: 'excel', title: 'PR to PO Cycle Time Report'},
                                            {extend: 'pdf', title: 'PR to PO Cycle Time Report'}
                                        ]
                                    }
                                ]
                            });

                            prToPoCycleTimeReportTable.buttons().container()
                                    .appendTo('#PrToPoCycleTimeReportTable_wrapper .col-md-6:eq(0)');

                        }
                        $("#overlay").css("display", "none");
                    }
                }
        );
    });
});