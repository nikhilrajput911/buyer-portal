/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $("#overlay").css("display", "none");
    
    
    var sowStatusReportTable = null;
    $("#generateSowStatusReportBtn").click(function() {
        alert("YAYYY !");
        console.log("generateSowStatusReportBtn");

        var fromPlantCode = $("#FromPlantCodeSR").val();
        var toPlantCode = $("#ToPlantCodeSR").val();
        var fromSowNo = $("#FromSowNo").val();
        var toSowNo = $("#ToSowNo").val();
        var fromPurchaseGroup = $("#FromPurchaseGroupSR").val();
        var toPurchaseGroup = $("#ToPurchaseGroupSR").val();
        var sowRaisedBy = $("#SowRaisedBy").val();
        var fromSowApprovedDate = $("#FromSowApprovedDate").val();
        var toSowApprovedDate = $("#ToSowApprovedDate").val();
        var processingStatusSow = $("#ProcessingStatusSRSow").val();
        var olaNumber = $("#OLANo").val();
        var fromMSGroup = $("#FromMSGroup").val();
        var toMSGroup = $("#ToMSGroup").val();
        var mSNumber = $("#MSNo").val();
        var contractRaisedBy = $("#ContractRaisedBySR").val();
        var fromContractApprovedDate = $("#FromContractApprovedDateSR").val();
        var toContractApprovedDate = $("#ToContractApprovedDateSR").val();
        var processingStatusContract = $("#ProcessingStatusSRContract").val();
        
        if (fromPlantCode === "" && olaNumber === "" && toPlantCode == "" && fromMSGroup == "" && fromSowNo == "" && toMSGroup == ""
                && toSowApprovedDate == "" && processingStatusSow === "" && fromPurchaseGroup === "" && toPurchaseGroup === ""
                && sowRaisedBy === "" && fromSowApprovedDate === "" && toSowNo === "" && mSNumber =="" && contractRaisedBy == "" 
                && fromContractApprovedDate == "" && toContractApprovedDate == "" && processingStatusContract == "")
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
                                "reqFrom": "SowRequestStatusReport",
                                "fromPlantCode": fromPlantCode,
                                "toPlantCode": toPlantCode,
                                "fromSowNo": fromSowNo,
                                "toSowNo": toSowNo,
                                "fromPurchaseGroup": fromPurchaseGroup,
                                "toPurchaseGroup": toPurchaseGroup,
                                "sowRaisedBy": sowRaisedBy,
                                "fromSowApprovedDate": fromSowApprovedDate,
                                "toSowApprovedDate": toSowApprovedDate,
                                "processingStatusSow": processingStatusSow,
                                "olaNumber": olaNumber,
                                "fromMSGroup": fromMSGroup,
                                "toMSGroup": toMSGroup,
                                "mSNumber" : mSNumber,
                                "contractRaisedBy" : contractRaisedBy,
                                "fromContractApprovedDate" : fromContractApprovedDate,
                                "toContractApprovedDate" : toContractApprovedDate,
                                "processingStatusContract" : processingStatusContract
    
                            },
                    complete: function(responseJson) {
                       // var arr = $.parseJSON(responseJson.responseText);
                       var arr=[];
//                        alert(arr.length);
                        $("#sowStatusReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].CoCode + "</td><td>" + arr[i].ContractNo + "</td><td>" + arr[i].ContactTitle + "</td><td>" + arr[i].CurrentStatus + "</td><td>" + arr[i].ServiceNo + "</td><td>" + arr[i].ServiceGroup + "</td><td>" + arr[i].OlaNo + "</td><td>" + arr[i].ContractAppDate + "</td><td>" + arr[i].Ageing + "</td><td>" + arr[i].VendorName + "</td><td>" + arr[i].ValidityStartDate + "</td><td> " + arr[i].ValidityEndDate + "</td><td>" + arr[i].VendorName + "</td><td>" + arr[i].Differential +"</td></tr>";
                        }
                        console.log(row);
                        $("#sowStatusReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#sowStatusReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            sowStatusReportTable.destroy();
                            sowStatusReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#sowStatusReportTable").children('tbody').html(row);

                            sowStatusReportTable = $('table.sowStatusReportTable').DataTable({
                //                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                //                dom: '<"top"fipe><"bottom"><"clear">',
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
                                        orientation: 'landscape',
                                        pageSize: 'LEGAL',
                                        buttons: [
                                            {extend: 'excel', title: 'Sow Request Status', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                            {extend: 'pdf', title: 'Sow Request Status', orientation: 'landscape', pageSize: 'LEGAL',
                                                exportOptions: {columns: 'thead th:not(.noExport)'}},
                                            {extend: 'print', title: 'Sow Request Status', customize: function(win)
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
                //                                    columns: 'th:not(:first-child)'
                //                                    columns: [1,2]
                                                    columns: "thead th:not(.noExport)"
                                                }
                                            }
                                        ]
                                    }
                                ]
                //                ajax: "/BuyerPortal/rest-controller.do"
                            });
                            sowStatusReportTable.buttons().container()
                                    .appendTo('#sowStatusReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#sowStatusReportTable thead tr').clone(true).appendTo('#sowStatusReportTable thead');
                            $('#sowStatusReportTable thead tr:eq(1) th').each(function(i) {
                                $('#sowStatusReportTable thead tr:eq(0) th').addClass("table-header-color");
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
                                    if (sowStatusReportTable.column(i).search() !== this.value) {
                                        sowStatusReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            sowStatusReportTable = $('table.sowStatusReportTable').DataTable({
                //                "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                //                dom: '<"top"fipe><"bottom"><"clear">',
                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
                                        "<'row'<'col-sm-12 col-md-6'i>>" +
                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
                                        orientation: 'landscape',
                                        pageSize: 'LEGAL',
                                        buttons: [
                                            {extend: 'excel', title: 'Sow Request Status', exportOptions: {columns: 'thead th:not(.noExport)'}},
                                            {extend: 'pdf', title: 'Sow Request Status', orientation: 'landscape', pageSize: 'LEGAL',
                                                exportOptions: {columns: 'thead th:not(.noExport)'}},
                                            {extend: 'print', title: 'Sow Request Status', customize: function(win)
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
                //                                    columns: 'th:not(:first-child)'
                //                                    columns: [1,2]
                                                    columns: "thead th:not(.noExport)"
                                                }
                                            }
                                        ]
                                    }
                                ]
                //                ajax: "/BuyerPortal/rest-controller.do"
                            });
                            sowStatusReportTable.buttons().container()
                                    .appendTo('#sowStatusReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
    });
    
    $("#clearSowStatusReportBtn").click(function() {
        alert("clear");
        $("#FromPlantCodeSR").val("0");
        $("#ToPlantCodeSR").val("0");
        $("#FromSowNo").val("");
        $("#FromSowNo").selectpicker('refresh');
        $("#ToSowNo").val("");
        $("#ToSowNo").selectpicker('refresh');
        $("#FromPurchaseGroupSR").val("");
        $("#FromPurchaseGroupSR").selectpicker('refresh');
        $("#ToPurchaseGroupSR").val("");
        $("#ToPurchaseGroupSR").selectpicker('refresh');
        $("#SowRaisedBy").val("");
        $("#FromSowApprovedDate").val("");
        $("#ToSowApprovedDate").val("");
        $("#ProcessingStatusSRSow").val("");
        $("#OLANo").val("");
        $("#FromMSGroup").val("");
        $("#FromMSGroup").selectpicker('refresh');
        $("#ToMSGroup").val("");
        $("#ToMSGroup").selectpicker('refresh');
        $("#MSNo").val("");
        $("#ContractRaisedBySR").val("");
        $("#FromContractApprovedDateSR").val("");
        $("#ToContractApprovedDateSR").val("");
        $("#ProcessingStatusSRContract").val("");
        
    });
    
    /////////////////////////////////////////////////////////////////////////////////////
    
    var contractStatusReportTable = null;
    $("#generateContractStatusReport").click(function() {
        alert("YAYYY !");
        console.log("generateContractStatusReport");
        
        var fromPlantCode = $("#FromPlantCodeCS").val();
        var toPlantCode = $("#ToPlantCodeCS").val();
        var fromContractNo = $("#FromContractNo").val();
        var toContractNo = $("#ToContractNo").val();
        var fromPurchaseGroup = $("#FromPurchaseGroupCS").val();
        var toPurchaseGroup = $("#FromPurchaseGroupCS").val();
        var contractRaisedBy = $("#ContractRaisedByCS").val();
        var fromContractApprovedDate = $("#FromContractApprovedDateCS").val();
        var toContractApprovedDate = $("#ToContractApprovedDateCS").val();
        var processingStatusContract = $("#ProcessingStatusCS").val();
        
        if (fromPlantCode === "" && toPlantCode == "" && fromContractNo == "" && toContractNo === "" && fromPurchaseGroup === "" && toPurchaseGroup === ""
                && contractRaisedBy === "" && fromContractApprovedDate == "" && toContractApprovedDate == "" && processingStatusContract == "")
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
                                "reqFrom": "ContractStatusReport",
                                "fromPlantCode": fromPlantCode,
                                "toPlantCode": toPlantCode,
                                "fromContractNo": fromContractNo,
                                "toContractNo": toContractNo,
                                "fromPurchaseGroup": fromPurchaseGroup,
                                "toPurchaseGroup": toPurchaseGroup,
                                "contractRaisedBy" : contractRaisedBy,
                                "fromContractApprovedDate" : fromContractApprovedDate,
                                "toContractApprovedDate" : toContractApprovedDate,
                                "processingStatusContract" : processingStatusContract
    
                            },
                    complete: function(responseJson) {
                        //var arr = $.parseJSON(responseJson.responseText);
                        //arr = JSON.parse(JSON.stringify(arr));
                        var arr=[];
                        console.log(arr.length);
                        
                        $("#contractStatusReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].CoCode + "</td><td>" + arr[i].ContractNo + "</td><td>" + arr[i].ItemCode + "</td><td>" + arr[i].Activationdate + "</td><td>" + arr[i].CostCentre + "</td><td>" + arr[i].Ageing + "</td><td>" + arr[i].Activationdate + "</td><td>" + arr[i].ContractCode + "</td><td>" + arr[i].ValidityStartDate + "</td><td> " + arr[i].ValidityEndDate + "</td><td>" + arr[i].Differential + "</td><td>" + arr[i].WorkmenCompensation  + "</td><td>" + arr[i].PublicLiablity  + "</td><td>" + arr[i].BankerGuarantee + "</td><td>" + arr[i].getSafeCertificate + "</td><td>" + arr[i].getRiskAssessment + "</td></tr>";
                        }
//                        console.log(row);
                        $("#contractStatusReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#contractStatusReportTable'))
                        {
//                            alert(auditLogReportTable);
                            contractStatusReportTable.destroy();
                            contractStatusReportTable = null;
//                            $("#auditLogReportTable").clear();
                            $("#contractStatusReportTable").children('tbody').html(row);

                            contractStatusReportTable = $('table.contractStatusReportTable').DataTable({
//                            "scrollY": 200,
                               // "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                "columnDefs": [
                                {"width": "10%", "targets": 0}
                                ],
//                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
//                                        "<'row'<'col-sm-12 col-md-6'i>>" +
//                                        "<'row'<'col-sm-12'tr>>",
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

                            contractStatusReportTable.buttons().container()
                                    .appendTo('#contractStatusReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#contractStatusReportTable thead tr').clone(true).appendTo('#contractStatusReportTable thead');
                            $('#contractStatusReportTable thead tr:eq(1) th').each(function(i) {
                                $('#contractStatusReportTable thead tr:eq(0) th').addClass("table-header-color");
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
                                    if (contractStatusReportTable.column(i).search() !== this.value) {
                                        contractStatusReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            contractStatusReportTable = $('table.contractStatusReportTable').DataTable({
//                            "scrollY": 200,
                               // "scrollX": true,
                                lengthChange: false,
                                orderCellsTop: true,
                                "columnDefs": [
                                {"width": "10%", "targets": 0}
                                ],
//                                dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'p>>" +
//                                        "<'row'<'col-sm-12 col-md-6'i>>" +
//                                        "<'row'<'col-sm-12'tr>>",
                                buttons: [
                                    {
                                        extend: 'collection',
                                        text: 'Export',
                                        buttons: [
                                            {extend: 'excel', title: 'Contract Status Report'},
                                            {extend: 'pdf', title: 'Contract Status Report'},
                                            {extend: 'print', title: 'Contract Status Report'}
                                        ]
                                    }
                                ]
                            });

                            contractStatusReportTable.buttons().container()
                                    .appendTo('#contractStatusReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
        });
        
     $("#clearContractStatusReport").click(function() {
        alert("clear");
        $("#FromPlantCodeCS").val("0");
        $("#ToPlantCodeCS").val("0");
        $("#FromContractNo").val("");
        $("#FromContractNo").selectpicker('refresh');
        $("#ToContractNo").val("");
        $("#ToContractNo").selectpicker('refresh');
        $("#FromPurchaseGroupCS").val("");
        $("#FromPurchaseGroupCS").selectpicker('refresh');
        $("#ToPurchaseGroupCS").val("");
        $("#ToPurchaseGroupCS").selectpicker('refresh');
        $("#ContractRaisedByCS").val("");
        $("#FromContractApprovedDateCS").val("");
        $("#ToContractApprovedDateCS").val("");
        $("#ProcessingStatusCS").selectpicker('refresh');
        $("#ProcessingStatusCS").val("");
        
    });
    
    //////////////////////////////////////////////////////////////////////////////
    var auditLogReportTable = null;
    $("#generateAuditLogReport").click(function() {
//        alert("sad");
//        $("#overlay").css("display", "block");
        var buyerid = $("#BuyerIDBA").val();
        var fromDate = $("#FromDateBA").val();
        var toDate = $("#ToDateBA").val();

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
                                "reqFrom": "AuditLogReport",
                                "buyerId": buyerid,
                                "fromDate": fromDate,
                                "toDate": toDate
                            },
                    complete: function(responseJson) {
                        //var arr = $.parseJSON(responseJson.responseText);
                        var arr=[];
//                        alert(arr.length);
                        $("#auditLogReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].ActivityPerformed + "</td><td>" + arr[i].DateTime + "</td><td>" + arr[i].Username + "</td><td>" + arr[i].BuyerName + "</td></tr>";
                        }
                        console.log(row);
                        $("#auditLogReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#auditLogReportTable'))
                        {
//                            alert(auditLogReportTable);
                            auditLogReportTable.destroy();
                            auditLogReportTable = null;
//                            $("#auditLogReportTable").clear();
                            $("#auditLogReportTable").children('tbody').html(row);

                            auditLogReportTable = $('table.auditLogReportTable').DataTable({
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
                                            {extend: 'excel', title: 'Audit Log Report'},
                                            {extend: 'pdf', title: 'Audit Log Report'},
                                            {extend: 'print', title: 'Audit Log Report'}
                                        ]
                                    }
                                ]
                            });

                            auditLogReportTable.buttons().container()
                                    .appendTo('#auditLogReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#auditLogReportTable thead tr').clone(true).appendTo('#auditLogReportTable thead');
                            $('#auditLogReportTable thead tr:eq(1) th').each(function(i) {
                                $('#auditLogReportTable thead tr:eq(0) th').addClass("table-header-color");
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
                                    if (auditLogReportTable.column(i).search() !== this.value) {
                                        auditLogReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            auditLogReportTable = $('table.auditLogReportTable').DataTable({
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

                            auditLogReportTable.buttons().container()
                                    .appendTo('#auditLogReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
    });
    
    $("#clearAuditLogReport").click(function() {
//        alert("clear");
        $("#FromDateBA").val("");
        $("#ToDateBA").val("");

        $("#BuyerIDBA").val("");
        $("#BuyerIDBA").selectpicker('refresh');


    });
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    
  var contractAckReportTable = null;
    $("#generateContractAckReportBtn").click(function() {
        
       
        var contractAckFromDate = $("#ContractAckFromDate").val();
        var contractAckToDate = $("#ContractAckToDate").val();
        var contractAckVendorCode = $("#vendorCodeName").val();
        
        
        if (contractAckFromDate === '' && contractAckToDate === '' && contractAckVendorCode == '')
        {
            Lobibox.alert("error", {
                msg: "Please enter search criteria!"
            });
            return false;
        }
        console.log(contractAckFromDate);
        console.log(contractAckToDate);
        console.log(contractAckVendorCode);
        $("#overlay").css("display", "block");

        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "ContractAckReport",
                                "PoAckFromDate": contractAckFromDate,
                                "contractAckToDate": contractAckToDate,
                                "contractAckVendorCode": contractAckVendorCode
                            },
                    complete: function(responseJson) {
                        //var arr = $.parseJSON(responseJson.responseText);
                        //arr = JSON.parse(JSON.stringify(arr));
                        var arr= [];
                        console.log(arr.length);
                        
                        $("#contractAckReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].ContractNumber + "</td><td>"+ arr[i].ContractAckVendor +"</td><td>"+ arr[i].ContractAckBuyer +"</td><td>"+ arr[i].ContractNotAck +"</td></tr>";
                        }
//                        console.log(row);
                        $("#contractAckReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#PoAckReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            contractAckReportTable.destroy();
                            contractAckReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#PoAckReportTable").children('tbody').html(row);

                            contractAckReportTable = $('table.contractAckReportTable').DataTable({
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
                                            {extend: 'excel', title: 'Contract Acknowledgement Report'},
                                            {extend: 'pdf', title: 'Contract Acknowledgement Report'},
                                            {extend: 'print', title: 'Contract Acknowledgement Report'}
                                        ]
                                    }
                                ]
                            });

                            contractAckReportTable.buttons().container()
                                    .appendTo('#contractAckReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#contractAckReportTable thead tr').clone(true).appendTo('#contractAckReportTable thead');
                            $('#contractAckReportTable thead tr:eq(1) th').each(function(i) {
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
                                    if (contractAckReportTable.column(i).search() !== this.value) {
                                        contractAckReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            contractAckReportTable = $('table.contractAckReportTable').DataTable({
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
                                            {extend: 'excel', title: 'Contract Acknowledgement Report'},
                                            {extend: 'pdf', title: 'Contract Acknowledgement Report'},
                                            {extend: 'print', title: 'Contract Acknowledgement Report'}
                                        ]
                                    }
                                ]
                            });

                            contractAckReportTable.buttons().container()
                                    .appendTo('#contractAckReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
    });
    
    $("#clearContractAckReportBtn").click(function() {
        $("#ContractAckFromDate").val("");
        $("#ContractAckToDate").val("");

        $("#ContractAckVendorCode").val("");
        $("#ContractAckVendorCode").selectpicker('refresh');
    });
    
    ///////////////////////////////////////////////////////////////////////////////////
    var contractLineReportTable;
    $("#generateContractLineReport").click(function() {
        var contractLRFromDate = $("#CLRFromDate").val();
        var contractLRToDate = $("#CLRToDate").val();
        var contractLRBuyerId = $("#CLRBuyerID").val();
        var contractLRVendorID = $("#CLRVendorID").val();
        
        
        if (contractLRFromDate === '' && contractLRToDate === '' && contractLRBuyerId == '' && contractLRVendorID == '')
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
                                "reqFrom": "ContractLineCycleReport",
                                "contractLRFromDate": contractLRFromDate,
                                "contractLRToDate": contractLRToDate,
                                "contractLRBuyerId": contractLRBuyerId,
                                "contractLRVendorID": contractLRVendorID
                            },
                    complete: function(responseJson) {
                        //var arr = $.parseJSON(responseJson.responseText);
                        var arr=[];
//                        alert(arr.length);
                        $("#contractLineReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].ContractNumber + "</td><td>" + arr[i].ContractTitle + "</td><td>" + arr[i].MatieralServiceNo + "</td><td>" + arr[i].VendorName + "</td><td>" + arr[i].OlaNumber + "</td><td>" + arr[i].ContractInitiatedDate + "</td><td>" + arr[i].ContractApprovedDate + "</td><td>" + arr[i].CycleTime + "</td></tr>";
                        }
                        console.log(row);
                        $("#contractLineReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#contractLineReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            contractLineReportTable.destroy();
                            contractLineReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#contractLineReportTable").children('tbody').html(row);

                            contractLineReportTable = $('table.contractLineReportTable').DataTable({
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
                                            {extend: 'excel', title: 'Contract Line Cycle Report'},
                                            {extend: 'pdf', title: 'Contract Line Cycle Report'},
                                            {extend: 'print', title: 'Contract Line Cycle Report'}
                                        ]
                                    }
                                ]
                            });

                            contractLineReportTable.buttons().container()
                                    .appendTo('#contractLineReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#contractLineReportTable thead tr').clone(true).appendTo('#contractLineReportTable thead');
                            $('#contractLineReportTable thead tr:eq(1) th').each(function(i) {
                                $('#contractLineReportTable thead tr:eq(0) th').addClass("table-header-color");
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
                                    if (contractLineReportTable.column(i).search() !== this.value) {
                                        contractLineReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            contractLineReportTable = $('table.contractLineReportTable').DataTable({
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
                                            {extend: 'excel', title: 'Contract Line Cycle Report'},
                                            {extend: 'pdf', title: 'Contract Line Cycle Report'},
                                            {extend: 'print', title: 'Contract Line Cycle Report'}
                                        ]
                                    }
                                ]
                            });

                            contractLineReportTable.buttons().container()
                                    .appendTo('#contractLineReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
        
    });
    
    $("#clearContractLineReport").click(function() {
        $("#CLRFromDate").val("");
        $("#CLRToDate").val("");

        $("#CLRBuyerID").val("");
        $("#CLRBuyerID").selectpicker('refresh');
        
        $("#CLRVendorID").val("");
        $("#CLRVendorID").selectpicker('refresh');
    });
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////////////
    var contractVersioningReportTable;
    $("#generateContractVersioningReport").click(function() {
        var contractVRNo = $("#CVRContractNo").val();
        var contractVROlaNo = $("#CVROlaNo").val();
        
        
        if (contractVRNo === '' && contractVROlaNo === '')
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
                                "reqFrom": "ContractVersioningReport",
                                "contractVRNo": contractVRNo,
                                "contractVROlaNo": contractVROlaNo
                            },
                    complete: function(responseJson) {
                        //var arr = $.parseJSON(responseJson.responseText);
                        var arr=[];
//                        alert(arr.length);
                        $("#contractVersioningReportTable tbody tr").remove();
                        var row = '';
                        for (var i = 0; i < arr.length; i++)
                        {
                            row += "<tr><td>" + arr[i].ContractNumber + "</td><td>" + arr[i].OlaNumber + "</td><td>" + arr[i].SupplierContractor + "</td><td>" + arr[i].ContractTitle + "</td><td>" + arr[i].Version + "</td><td>" + arr[i].ModifiedBy + "</td><td>" + arr[i].ModifiedOn + "</td></tr>";
                        }
                        console.log(row);
                        $("#contractVersioningReportTable").children('tbody').html(row);

                        if ($.fn.DataTable.isDataTable('#contractVersioningReportTable'))
                        {
//                            alert(buyerAuditReportTable);
                            contractVersioningReportTable.destroy();
                            contractVersioningReportTable = null;
//                            $("#buyerAuditReportTable").clear();
                            $("#contractVersioningReportTable").children('tbody').html(row);

                            contractVersioningReportTable = $('table.contractVersioningReportTable').DataTable({
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
                                            {extend: 'excel', title: 'Contract Versioning Report'},
                                            {extend: 'pdf', title: 'Contract Versioning Report'},
                                            {extend: 'print', title: 'Contract Versioning Report'}
                                        ]
                                    }
                                ]
                            });

                            contractVersioningReportTable.buttons().container()
                                    .appendTo('#contractVersioningReportTable_wrapper .col-md-6:eq(0)');

                        }
                        else
                        {
                            $('#contractVersioningReportTable thead tr').clone(true).appendTo('#contractVersioningReportTable thead');
                            $('#contractVersioningReportTable thead tr:eq(1) th').each(function(i) {
                                $('#contractVersioningReportTable thead tr:eq(0) th').addClass("table-header-color");
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
                                    if (contractVersioningReportTable.column(i).search() !== this.value) {
                                        contractVersioningReportTable
                                                .column(i)
                                                .search(this.value)
                                                .draw();
                                    }
                                });
                            });

                            contractVersioningReportTable = $('table.contractVersioningReportTable').DataTable({
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
                                            {extend: 'excel', title: 'Contract Versioning Report'},
                                            {extend: 'pdf', title: 'Contract Versioning Report'},
                                            {extend: 'print', title: 'Contract Versioning Report'}
                                        ]
                                    }
                                ]
                            });

                            contractVersioningReportTable.buttons().container()
                                    .appendTo('#contractVersioningReportTable_wrapper .col-md-6:eq(0)');

                        }

                        $("#overlay").css("display", "none");
                    }
                });
        
    });
    
    $("#clearContractVersioningReport").click(function() {
        
        $("#contractVROlaNo").val("");

        $("#contractVRNo").val("");
        $("#contractVRNo").selectpicker('refresh');
        
    });
    
    
 });    //final end

