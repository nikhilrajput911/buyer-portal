$(function() {
    (function() {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
    })();
});



jQuery(document).ready(function($) {
    'use strict';
//
//    if ($("table.first").length) {
//
//        $(document).ready(function() {
//            $('table.first').dataTable();
//        });
//    }

    /*Count for Cards*/
    if ($("#buyerRole").val() === "ROLE_BUYER" || $("#buyerRole").val() === "ROLE_ADMIN_BUYER" 
            || $("#buyerRole").val() === "ROLE_TL_BUYER" || $("#buyerRole").val() === "ROLE_ADMIN_TL_BUYER")
    {
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getCountForCards"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                var buyerOverduePendingPRList = obj.buyerOverduePendingPRList;
                $("#overduePrLines").html(buyerOverduePendingPRList.length);
                $("#vendorfinalized").html(obj.vendorFinalizedList.length);
                $("#pendingrfqclosure").html(obj.rfqClosureList.length);
                $("#pendingvendorack").html(obj.acknowlegdePOList.length);
            }
        });
    }
    /* Calender jQuery **/
    if ($("table.rfq-status-table").length) {

        $(document).ready(function() {

            $('#rfq_status_table thead tr').clone(true).appendTo('#rfq_status_table thead');
            $('#rfq_status_table thead tr:eq(1) th').each(function(i) {
                $('#rfq_status_table thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.rfq-status-table').DataTable({
                lengthChange: false,
                orderCellsTop: true,
//                searching: false,
                "columnDefs": [
                    {"width": "10%", "targets": 0}
                ],
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'copy', title: 'RFQ Status'},
                            {extend: 'excel', title: 'RFQ Status'},
                            {extend: 'pdf', title: 'RFQ Status'},
                            {extend: 'print', title: 'RFQ Status'}
                        ]
                    }
                ],
                "aoColumnDefs": [
                    {"sType": "date-uk2", "aTargets": [3]}
                ]
            });
            table.buttons().container()
                    .appendTo('#rfq_status_table_wrapper .col-md-6:eq(0)');
        });
    }


    if ($("table.contract-status-table").length) {

        $(document).ready(function() {

            $('#contract_status_table thead tr').clone(true).appendTo('#contract_status_table thead');
            $('#contract_status_table thead tr:eq(1) th').each(function(i) {
                $('#contract_status_table thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.contract-status-table').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'copy', title: 'Contract Status'},
                            {extend: 'excel', title: 'Contract Status'},
                            {extend: 'pdf', title: 'Contract Status'},
                            {extend: 'print', title: 'Contract Status'}
                        ]
                    }
                ]
            });
            table.buttons().container()
                    .appendTo('#contract_status_table_wrapper .col-md-6:eq(0)');
        });
    }

    if ($("table.pr-details").length) {

        $(document).ready(function() {

            $('#pr_details thead tr').clone(true).appendTo('#pr_details thead');
            $('#pr_details thead tr:eq(1) th').each(function(i) {
                $('#pr_details thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title === '' || title.trim() === "PO Text")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.pr-details').DataTable({
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
                            {extend: 'excel', title: 'Unassigned Material PR Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'Unassigned Material PR Details', orientation: 'landscape', pageSize: 'LEGAL',
                                exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'Unassigned PR Details', customize: function(win)
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
            table.buttons().container()
                    .appendTo('#pr_details_wrapper .col-md-6:eq(0)');
        });
    }
    if ($("table.pr-detailsSerice").length) {

        $(document).ready(function() {

            $('#pr_detailsSerice thead tr').clone(true).appendTo('#pr_detailsSerice thead');
            $('#pr_detailsSerice thead tr:eq(1) th').each(function(i) {
                $('#pr_detailsSerice thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title === '' || title.trim() === "PO Text")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            var table = $('table.pr-detailsSerice').DataTable({
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
                            {extend: 'excel', title: 'Unassigned Service PR Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'Unassigned Service PR Details', orientation: 'landscape', pageSize: 'LEGAL',
                                exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'Unassigned PR Details', customize: function(win)
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
            table.buttons().container()
                    .appendTo('#pr_detailsSerice_wrapper .col-md-6:eq(0)');
        });
    }

    if ($("table.assigned-pr-details").length) {

        $(document).ready(function() {

            $('#assigned_pr_details thead tr').clone(true).appendTo('#assigned_pr_details thead');
            $('#assigned_pr_details thead tr:eq(1) th').each(function(i) {
                $('#assigned_pr_details thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title === '' || title.trim() === "PO Text")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            $("#assigned_pr_tab").click(function() {
//                alert("sds");
//                table.draw();
            });
            var table = $('table.assigned-pr-details').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
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
                            {extend: 'excel', title: 'Assigned Material PR Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'Assigned Material PR Details', orientation: 'landscape', pageSize: 'LEGAL',
                                exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'Assigned PR Details', customize: function(win)
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
                                    columns: 'thead th:not(.noExport)'
                                }
                            }
                        ]
                    }
//                    {extend: 'print', title: "PR Details"}
                ]
            });

            table.buttons().container()
                    .appendTo('#assigned_pr_details_wrapper .col-md-6:eq(0)');


        });
    }

    if ($("table.assigned-pr-detailsService").length) {

        $(document).ready(function() {

            $('#assigned_pr_detailsService thead tr').clone(true).appendTo('#assigned_pr_detailsService thead');
            $('#assigned_pr_detailsService thead tr:eq(1) th').each(function(i) {
                $('#assigned_pr_detailsService thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title === '' || title.trim() === "PO Text")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            $("#assigned_pr_tab").click(function() {
//                alert("sds");
//                table.draw();
            });
            var table = $('table.assigned-pr-detailsService').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
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
                            {extend: 'excel', title: 'Assigned Service PR Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'Assigned Service PR Details', orientation: 'landscape', pageSize: 'LEGAL',
                                exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'Assigned PR Details', customize: function(win)
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
                                    columns: 'thead th:not(.noExport)'
                                }
                            }
                        ]
                    }
//                    {extend: 'print', title: "PR Details"}
                ]
            });

            table.buttons().container()
                    .appendTo('#assigned_pr_detailsService_wrapper .col-md-6:eq(0)');


        });
    }

    if ($("table.reassign-rfq-details-table").length) {

        $(document).ready(function() {

            $('#reassign_rfq_details_table thead tr').clone(true).appendTo('#reassign_rfq_details_table thead');
            $('#reassign_rfq_details_table thead tr:eq(1) th').each(function(i) {
                $('#reassign_rfq_details_table thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title === '' || title.trim() === "#")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            $("#reassign_rfq_details_table").click(function() {
//                alert("sds");
//                table.draw();
            });
            var table = $('table.reassign-rfq-details-table').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
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
                            {extend: 'excel', title: 'RFQ Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'RFQ Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'RFQ Details', customize: function(win)
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
                                    columns: 'thead th:not(.noExport)'
                                }
                            }
                        ]
                    }
//                    {extend: 'print', title: "PR Details"}
                ],
                "aoColumnDefs": [
                    {"sType": "date-uk2", "aTargets": [4]}
                ]
            });

            table.buttons().container()
                    .appendTo('#reassign_rfq_details_table_wrapper .col-md-6:eq(0)');


        });
    }
    if ($("table.reassign-rfq-details-table-service").length) {

        $(document).ready(function() {

            $('#reassign_rfq_details_table_service thead tr').clone(true).appendTo('#reassign_rfq_details_table_service thead');
            $('#reassign_rfq_details_table_service thead tr:eq(1) th').each(function(i) {
                $('#reassign_rfq_details_table_service thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title === '' || title.trim() === "#")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });
            $("#reassign_rfq_details_table_service").click(function() {
//                alert("sds");
//                table.draw();
            });
            var table = $('table.reassign-rfq-details-table-service').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
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
                            {extend: 'excel', title: 'RFQ Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'RFQ Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'RFQ Details', customize: function(win)
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
                                    columns: 'thead th:not(.noExport)'
                                }
                            }
                        ]
                    }
//                    {extend: 'print', title: "PR Details"}
                ],
                "aoColumnDefs": [
                    {"sType": "date-uk2", "aTargets": [4]}
                ]
            });

            table.buttons().container()
                    .appendTo('#reassign_rfq_details_table_service_wrapper .col-md-6:eq(0)');


        });
    }
});
//abi

//  $(".reassign-contract-checkbox-class").click(function () {
$("#assignedContractMaterialLine_table").on("click", ".reassign-contract-checkbox-class", function() {
    // alert('abhshe');
    var isContractChecked = $(this).prop("checked");
    var ContractId = $(this).val();
    var ContractBuyerId = $(this).parent().parent().find("td").eq(8).text();
    console.log(ContractBuyerId)
    var ContractBuyerName = $(this).parent().parent().find("td").eq(1).text();
    if (isContractChecked === true)
    {
        // alert(ContractId);
        reAssignContractIdArray.push(ContractId);
        $("#reassignContractBuyerId option[value=" + ContractBuyerId + "]").remove();
        $("#reassignContractBuyerId").trigger("chosen:updated");
        //   alert("ab"+reAssignContractIdArray);
    } else
    {
        var index = reAssignContractIdArray.indexOf(ContractId);
        reAssignContractIdArray.splice(index, 1);
        //  alert(reAssignContractIdArray);
        var isBuyerPresent = "No";
        $("#reassignContractBuyerId option").each(function() {
            var buyerId = $(this).val();
            if (ContractBuyerId === buyerId)
            {
                isBuyerPresent = "Yes";
            }
        });
        if (isBuyerPresent === "No")
        {
            $("#reassignContractBuyerId").append("<option value=" + ContractBuyerId + ">" + ContractBuyerName + "</option>");
            $("#reassignContractBuyerId").trigger("chosen:updated");
        }
    }
    // alert("length: " + reAssignContractIdArray.length);
    // alert(reAssignContractIdArray);
    $("#reassigncontractlineids").val(reAssignContractIdArray.toString());
});

$("#assignedContractServiceLine_table").on("click", ".reassign-contract-checkbox-class", function() {
    // alert('abhshe');
    var isContractChecked = $(this).prop("checked");
    var ContractId = $(this).val();
    var ContractBuyerId = $(this).parent().parent().find("td").eq(8).text();
    console.log(ContractBuyerId)
    var ContractBuyerName = $(this).parent().parent().find("td").eq(1).text();
    if (isContractChecked === true)
    {
        // alert(ContractId);
        reAssignContractIdArray.push(ContractId);
        $("#reassignContractBuyerId option[value=" + ContractBuyerId + "]").remove();
        $("#reassignContractBuyerId").trigger("chosen:updated");
        //   alert("ab"+reAssignContractIdArray);
    } else
    {
        var index = reAssignContractIdArray.indexOf(ContractId);
        reAssignContractIdArray.splice(index, 1);
        //  alert(reAssignContractIdArray);
        var isBuyerPresent = "No";
        $("#reassignContractBuyerId option").each(function() {
            var buyerId = $(this).val();
            if (ContractBuyerId === buyerId)
            {
                isBuyerPresent = "Yes";
            }
        });
        if (isBuyerPresent === "No")
        {
            $("#reassignContractBuyerId").append("<option value=" + ContractBuyerId + ">" + ContractBuyerName + "</option>");
            $("#reassignContractBuyerId").trigger("chosen:updated");
        }
    }
    // alert("length: " + reAssignContractIdArray.length);
    // alert(reAssignContractIdArray);
    $("#reassigncontractlineids").val(reAssignContractIdArray.toString());
});
var reAssignContractIdArray;
$("#reassignContractBtn").click(function() {
    var buyer = $("#reassignContractBuyerId").val();
//        alert(buyer);
    if (reAssignContractIdArray.length === 0)
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract for Reassignment!"
        });
        return false;
    }
    if (buyer === "")
    {
//            alert("Please select buyer!");
        Lobibox.alert("error", {
            msg: "Please Select Buyer!"
        });
        return false;
    }
//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Are you sure you want to Re-Assign ?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                console.log("ok");
                $("#reassigncontractlineform").submit();
            } else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
});
///////////////////////////////////////////////////////////////////////////////RAM

if ($("table.sar-DetailsMAT").length) {
    $(document).ready(function() {

        $('#sar_DetailsMAT thead tr').clone(true).appendTo('#sar_DetailsMAT thead');
        $('#sar_DetailsMAT thead tr:eq(1) th').each(function(i) {
            $('#sar_DetailsMAT thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.sar-DetailsMAT').DataTable({
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
                        {extend: 'excel', title: 'Spend Analysis Report(Service)', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'Spend Analysis Report(Service)', orientation: 'landscape', pageSize: 'LEGAL',
                            exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'Spend Analysis Report(Service)', customize: function(win)
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
        table.buttons().container()
                .appendTo('#sar_DetailsMAT_wrapper .col-md-6:eq(0)');
    });
}


if ($("table.sarSVC-Details").length) {
    $(document).ready(function() {

        $('#sarSVC_Details thead tr').clone(true).appendTo('#sarSVC_Details thead');
        $('#sarSVC_Details thead tr:eq(1) th').each(function(i) {
            $('#sarSVC_Details thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.sarSVC-Details').DataTable({
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
                        {extend: 'excel', title: 'Spend Analysis Report(Service)', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'Spend Analysis Report(Service)', orientation: 'landscape', pageSize: 'LEGAL',
                            exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'Spend Analysis Report(Service)', customize: function(win)
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
        table.buttons().container()
                .appendTo('#sarSVC_Details_wrapper .col-md-6:eq(0)');
    });
}

if ($("table.sarSVC-DetailsLib").length) {
    $(document).ready(function() {

        $('#sarSVC_DetailsLib thead tr').clone(true).appendTo('#sarSVC_DetailsLib thead');
        $('#sarSVC_DetailsLib thead tr:eq(1) th').each(function(i) {
            $('#sarSVC_DetailsLib thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.sarSVC-DetailsLib').DataTable({
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
                        {extend: 'excel', title: 'Spend Analysis Report(Service)', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'Spend Analysis Report(Service)', orientation: 'landscape', pageSize: 'LEGAL',
                            exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'Spend Analysis Report(Service)', customize: function(win)
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
        table.buttons().container()
                .appendTo('#sarSVC_DetailsLib_wrapper .col-md-6:eq(0)');
    });
}


//    if ($("table.uploadHistory-Details").length) {
//            $(document).ready(function() {
//
//                    $('#uploadHistory_Details thead tr').clone(true).appendTo('#uploadHistory_Details thead');
//                    $('#uploadHistory_Details thead tr:eq(1) th').each(function(i) {
//                        $('#uploadHistory_Details thead tr:eq(0) th').addClass("table-header-color");
//                    });
//                });
//            }


if ($("table.sarlib-details").length) {

    $(document).ready(function() {

        $('#sarlib_details thead tr').clone(true).appendTo('#sarlib_details thead');
        $('#sarlib_details thead tr:eq(1) th').each(function(i) {
            $('#sarlib_details thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });

        var table = $('table.sarlib-details').DataTable({
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
                        {extend: 'excel', title: 'Spend Analysis Library(Material)', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'Spend Analysis Library(Material)', orientation: 'landscape', pageSize: 'LEGAL',
                            exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'Spend Analysis Library(Material)', customize: function(win)
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
        table.buttons().container()
                .appendTo('#sarlib_details_wrapper .col-md-6:eq(0)');
    });
}


//abhishek
var reAssignContractIdArray = [];
var spendIdArray = [];
var companyCodeArray = [];
var message = "";
var TypeofRequest = "";


$(".spend-checkbox-class").click(function() {
    //var isContractChecked = $(this).prop("checked");
    var first = "";
    var mainValue = "";

    var contractId = $(this).val();
    if ($(this).prop("checked") == true)
    {
//            var row = $(this).closest("tr")[0];
//         first = row.cells[2].innerHTML;
//         mainValue = document.getElementById("mainvalue").value;
//        if (mainValue === "") {
//            document.getElementById("mainvalue").value = first;
//        } else {
//            if (mainValue != first) {
//                Lobibox.alert
//                        ("error",
//                                {
//                                    msg: "Please Select Similar Material Group!!"
//                                });
//                return false;
//            }
//        }
        reAssignContractIdArray.push(contractId);
        //alert("test => "+reAssignContractIdArray);

        //$("#addlineids").val(reAssignContractIdArray.toString());

    }
    else
    {
        var index = reAssignContractIdArray.indexOf(contractId);
        if (index > -1) {
            reAssignContractIdArray.splice(index, 1);
        }
        if (!(Array.isArray(reAssignContractIdArray) && reAssignContractIdArray.length))
        {
            first = null;
            document.getElementById("mainvalue").value = "";
        }
        // alert("test => "+reAssignContractIdArray);
        //return false;
    }


});





$("#uploadSpend").click(function() {

    $("#uploadSpendReportModal").modal("show");
});

$("#uploaddocumentContractModalBtn").click(function() {
// alert("abh");
//alert($("input[name='file_docDiv1']").val())
    //event.preventDefault();
    if ($("input[name='file_docDiv1']").val().trim() == "") {
        Lobibox.alert("error", {
            msg: "Please add a document!"
        });
        return false;
    }

});
$("#uploadSpendAttachment").submit(function(event) {
    //alert("Inside UploadAttachment");
    event.preventDefault();
    //var formData = new FormData(document.querySelector('form'));
    var formData = new FormData(this);
    $.ajax(
            {
                type: "POST",
                url: "uploadSpendAttachment.do",
                async: true,
                data: formData,
                contentType: false,
                processData: false,
                dataType: "json",
                complete: function(responseJson)
                {
                    console.log(responseJson);
                    //alert("In Complete");
                    var obj = $.parseJSON(responseJson.responseText);
                    //alert("Response -> "+ obj);

                    console.log("obj.Result: " + obj.Result);
                    console.log("obj.Message: " + obj.Message);

                    if (obj.Result === "Success")
                    {
                        Lobibox.alert("success", {
                            msg: obj.Message
                        });
                        $("#acknowledgePoBtn").prop("disabled", false);
                    }
                    else
                    {
                        Lobibox.alert("error", {
                            msg: obj.Message
                        });
//                                $("#acknowledgePoBtn").prop("disabled", false);
                    }
                }
            });

});

function revoke(id, uniqueID)
{
    //var id = $("#revokeClick").val();
    alert("ID -> " + id + "," + uniqueID);

    Lobibox.confirm({
        msg: "Do you want to revoke this file?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                console.log("ok");

                $.ajax({
                    type: "GET",
                    url: "contractmanagement.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "revokeClick",
                                "uniqueID": uniqueID,
                                "sno": id,
                                "type": "Material"
                            },
                    complete: function(responseJson) {
                        location.reload();

                    }
                });
            } else if (type === 'no')
            {

                console.log("no");
            }
        }
    });
}

function revokeSvc(id, uniqueID)
{
    //var id = $("#revokeClickSvc").val();
    //alert("ID -> "+ id +","+uniqueID);
    Lobibox.confirm({
        msg: "Do you want to revoke this file?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                console.log("ok");

                $.ajax({
                    type: "GET",
                    url: "contractmanagement.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "revokeClick",
                                "uniqueID": uniqueID,
                                "sno": id,
                                "type": "Service"
                            },
                    complete: function(responseJson) {
//                        var response = $.parseJSON(responseJson.responseText);
//                        console.log(response);
                        location.reload();

                    }
                });
            } else if (type === 'no')
            {

                console.log("no");
            }
        }
    });
}

$("#uploadSpendSVChist").click(function() {

    $("#uploadSpendHistoryMod").modal("show");
});

$("#assignSpend").click(function() {

    if (!(Array.isArray(reAssignContractIdArray) && reAssignContractIdArray.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

    $("#addInfoSpendAnalysisReport").modal("show");
});

$("#modcostCentre").click(function() {
    $("#costCentre").val("FromInputField");
    getAllCostCenter();
    $("#costCenterModal").modal("show");
});

$("#costCenterTableId").on("click", ".costCenterCheckboxClass", function() {
    $(".costCenterCheckboxClass").prop("checked", false);
    var costCenter = $(this).parent().parent().find("td").eq(1).html();
    console.log(costCenter);
    $("#modcostCentre").val(costCenter);
    $("#costCentre").val(costCenter.toString());
    $("#costCenterModal").modal("hide");
});



var costCenterTable = null;
function getAllCostCenter() {
    var trackingNumber = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            trackingNumber = $(this).find("td").eq(16).text();
        }
    });
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllContCostCenter"

        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
//                var obj = [
//                            { "COST_CENTER":"Cost Centre1" , "DESCRIPTION":"Desc" }, 
//                            { "COST_CENTER":"Cost Centre2" , "DESCRIPTION":"Desc" }, 
//                            { "COST_CENTER":"Cost Centre3" , "DESCRIPTION":"Desc" } ];

            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='costCenterCheckboxClass'></td>"
                        + "<td>" + obj[i].COST_CENTER + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#costCenterTableId tbody").append(row);
            if ($.fn.DataTable.isDataTable('#costCenterTableId')) {
                costCenterTable.destroy();
                costCenterTable = null;
                $("#costCenterTableId").children('tbody').html(row);
                costCenterTable = $('table.costCenterTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                costCenterTable.buttons().container()
                        .appendTo('#costCenterTableId_wrapper .col-md-6:eq(0)');
            } else {
                $('#costCenterTableId thead tr').clone(true).appendTo('#costCenterTableId thead');
                $('#costCenterTableId thead tr:eq(1) th').each(function(i) {
                    $('#costCenterTableId thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (costCenterTable.column(i).search() !== this.value) {
                            costCenterTable
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                costCenterTable = $('table.costCenterTable-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                costCenterTable.buttons().container()
                        .appendTo('#costCenterTableId_wrapper .col-md-6:eq(0)');
            }
        }
    });
}

$("#assignModelBtn").click(function() {
    // alert("inside assigne spen");
    var SPOC = $("#spoc_contract").val();
    //alert(SPOC);
    if (!(Array.isArray(reAssignContractIdArray) && reAssignContractIdArray.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

    if (reAssignContractIdArray.length > 1)
    {
        document.getElementById("typeofRequest").value = "GroupSend";
    }
//        if (SPOC === "" || SPOC == undefined)
//        {
////            alert("Please select buyer!");
//            Lobibox.alert("error", {
//                msg: "Please Select SPOC."
//            });
//            return false;
//        }
    var requestType = $("#modrequestType").val();
    $("#requestType").val(requestType.toString());

    var tenderTitle = $("#modtenderTitle").val();
    $("#tenderTitle").val(tenderTitle.toString());

    var coCode = $("#modcompanyCode").val();
    $("#companyCode").val(coCode.toString());

    var contractType = $("#modcontractType").val();
    $("#contractType").val(contractType.toString());

    var costCentre = $("costCentre").val;


    if (tenderTitle == '' || tenderTitle == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select Tender Title!!"
        });
        return false;
    }
    if (requestType == '' || requestType == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select Request Type!!"
        });
        return false;
    }
    if (coCode == '' || coCode == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select CoCode!!"
        });
        return false;
    }
    if (contractType == '' || contractType == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select Contract Type!!"
        });
        return false;
    }

//        var costCentre = $("#modcostCentre").val();
//        $("#costCentre").val(costCentre.toString());

//        var activationDate = $("#modactivationDate").val();
//        $("#activationDate").val(activationDate.toString());

    if ((Array.isArray(reAssignContractIdArray) && reAssignContractIdArray.length))
    {
        //Loop through all checked CheckBoxes in GridView.
        -$("#sar_DetailsMAT input[type=checkbox]:checked").each(function() {
            //alert("CHECK BOX TICKED");
            var row = $(this).closest("tr")[0];
            var colums = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML;
            message += "~" + row.cells[2].innerHTML;
            message += "~" + row.cells[3].innerHTML;
            message += "~" + row.cells[5].innerHTML;
            message += "~" + row.cells[6].innerHTML;
            message += "~" + row.cells[7].innerHTML;
            message += "~" + row.cells[8].innerHTML;
            message += "~" + row.cells[9].innerHTML;
            message += "~" + row.cells[10].innerHTML;
            message += "~" + row.cells[11].innerHTML;
            message += "~" + row.cells[12].innerHTML;
            message += "~" + row.cells[13].innerHTML;
            message += "~" + row.cells[14].innerHTML;
            message += "~" + row.cells[15].innerHTML;
            message += "~" + row.cells[16].innerHTML;
            message += "~" + row.cells[18].innerHTML;
            message += "~" + row.cells[19].innerHTML;
            message += "~" + row.cells[20].innerHTML;

            message += "###";
            document.getElementById("uniqueIDMat").value = row.cells[17].innerHTML;
            //contractId += "###";
        });
        document.getElementById("spendValuesJava").value = message;
        document.getElementById("removeCartValues").value = reAssignContractIdArray.toString();
        $("#removeCartValues").val(reAssignContractIdArray.toString());
        //alert(message);
        // document.getElementById("removeCartValues").value = contractId;
        console.log("Message " + message);
        $("messageids").val(reAssignContractIdArray.toString());
        $("#unassignedSpendLines").val(message.toString());
        $("#removeSpendLines").val(reAssignContractIdArray.toString());
    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to create?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                console.log("ok");
                $("#unassignedSpendLinesformMat").submit();
            } else if (type === 'no')
            {
                message = "";
                console.log("no");
            }
        }
    });
});

$("#addtolibrary").click(function() {
    //alert("inside assigne spen");


    $("#addlineids").val(reAssignContractIdArray.toString());
    if (!(Array.isArray(reAssignContractIdArray) && reAssignContractIdArray.length))
    {

        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }
    else {
        $("#addInfoSpendLibraryMod").modal("show");
    }
});

$("#addInfoLibBtn").click(function() {
    var bName = document.getElementById("modBucketName").value;
    TypeofRequest = "libraryadd";
    if (bName != "" || bName != null)
    {
        Lobibox.confirm({
            msg: "Do you want to add ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    // alert(TypeofRequest);
                    document.getElementById("typeofRequest").value = TypeofRequest;
                    document.getElementById("bucketNameMat").value = bName;
                    console.log("BName -> " + bName);
                    $("#unassignedSpendLinesformMat").submit();

                } else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    }
    else
    {
        Lobibox.alert("error", {
            msg: "Please enter a bucket name !"
        });
    }
});

$("#removecart").click(function() {

    TypeofRequest = "RemoveCart";
    $("#removeCartValues").val(reAssignContractIdArray.toString());
    document.getElementById("removeCartValues").value = reAssignContractIdArray.toString();
    if (!(Array.isArray(reAssignContractIdArray) && reAssignContractIdArray.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to remove from cart?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                //console.log("ok");
                //alert("inisde" + contractId);
                document.getElementById("typeofRequest").value = TypeofRequest;
                // alert(TypeofRequest);
                $("#unassignedSpendLinesformMat").submit();
            } else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
});

$(".longTextClassSAR").click(function() {
//        alert("dsf");
//        $("#filterWorloadReportForm").trigger("reset");

    $("#longTextModalSAR").modal("show");
    var longtext = $(this).parent().children().eq(1).val();
//        $("#longtext").val(longtext);
    $('div.longtext').text(longtext);
//        alert(longtext);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////   


$("#uploadSpendSVC").click(function() {

    $("#uploadSpendReportModalSVC").modal("show");
});

$("#uploaddocumentContractModalBtnSVC").click(function() {
// alert("abh");
//alert($("input[name='file_docDiv1']").val())
    //event.preventDefault();
    if ($("input[name='file_docDiv2']").val().trim() == "") {
        Lobibox.alert("error", {
            msg: "Please add a document!"
        });
        return false;
    }
    else
    {
        $("#uploadSpendContractSvc").submit();
    }
});

$("#uploadSpendHistSVC").click(function() {

    $("#uploadSpendHistoryModSvc").modal("show");
});

var arraySVC = [];
$(".spendSVC-checkbox-class").click(function() {
    //var isContractChecked = $(this).prop("checked");
    var first = "";

    var contractId = $(this).val();
    if ($(this).prop("checked") == true)
    {
        arraySVC.push(contractId);

    }
    else
    {
        var index = arraySVC.indexOf(contractId);
        if (index > -1) {
            arraySVC.splice(index, 1);
        }
        if (!(Array.isArray(arraySVC) && arraySVC.length))
        {
            first = null;
            document.getElementById("mainvalue").value = "";
        }
    }


});

$("#assignSpendSVC").click(function() {
    // alert("inside assigne spen");
    var SPOC = $("#spoc_contractSVC").val();
    //alert(SPOC);
    if (SPOC === "" || SPOC == undefined)
    {
        Lobibox.alert("error", {
            msg: "Please Select SPOC."
        });
        return false;
    }
    document.getElementById("spoc_contract").value = SPOC;

    if (!(Array.isArray(arraySVC) && arraySVC.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

    if (arraySVC.length > 1)
    {
        document.getElementById("typeofRequestSVC").value = "GroupSend";
    }

    if ((Array.isArray(arraySVC) && arraySVC.length))
    {
        //Loop through all checked CheckBoxes in GridView.
        -$("#sarSVC_Details input[type=checkbox]:checked").each(function() {
            //alert("CHECK BOX TICKED");
            var row = $(this).closest("tr")[0];
            var colums = $(this).closest("tr")[0];
            message += row.cells[1].innerHTML;
            message += "~" + row.cells[2].innerHTML;
            message += "~" + row.cells[3].innerHTML;
            message += "~" + row.cells[4].innerHTML;
            message += "~" + row.cells[5].innerHTML;
            message += "~" + row.cells[6].innerHTML;
            message += "~" + row.cells[7].innerHTML;
            message += "~" + row.cells[8].innerHTML;
            message += "~" + row.cells[9].innerHTML;
            message += "~" + row.cells[10].innerHTML;
            message += "~" + row.cells[11].innerHTML;
            message += "~" + row.cells[12].innerHTML;
            message += "~" + row.cells[13].innerHTML;
            message += "~" + row.cells[14].innerHTML;
            message += "~" + row.cells[15].innerHTML;
//            message += "~" + requestType;
//            message += "~" + coCode;
//            message += "~" + contractType;
//            message += "~" + costCentre;
//            message += "~" + activationDate;
            message += "###";
            document.getElementById("uniqueIDSvc").value = row.cells[16].innerHTML;
            //contractId += "###";
        });
        document.getElementById("spendValuesJavaSVC").value = message;
        document.getElementById("removeCartValuesSVC").value = arraySVC.toString();
        //$("#removeCartValuesSVC").val(arraySVC.toString());
        //alert(message);
        // document.getElementById("removeCartValues").value = contractId;
        console.log("Message " + message);

    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to create?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                console.log("ok");
                $("#spendAnalysisServiceForm").submit();
            } else if (type === 'no')
            {
                message = "";
                console.log("no");
            }
        }
    });
});



$("#addtolibrarySVC").click(function() {
    ;
    $("#addlineidsSVC").val(arraySVC.toString());
    if (!(Array.isArray(arraySVC) && arraySVC.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }
    else {
        $("#addInfoSpendLibraryModSVC").modal("show");
    }
});

$("#addInfoLibBtnSVC").click(function() {
    var bName = document.getElementById("modBucketNameSVC").value;
    TypeofRequest = "libraryadd";
    if (bName != "" || bName != null)
    {
        Lobibox.confirm({
            msg: "Do you want to add ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    // alert(TypeofRequest);
                    document.getElementById("typeofRequestSVC").value = TypeofRequest;
                    document.getElementById("bucketNameSvc").value = bName;
                    console.log("BName -> " + bName);
                    $("#spendAnalysisServiceForm").submit();

                } else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    }
});

$("#removecartSVC").click(function() {

    TypeofRequest = "RemoveCart";
    $("#removeCartValuesSVC").val(arraySVC.toString());
    document.getElementById("removeCartValuesSVC").value = arraySVC.toString();
    if (!(Array.isArray(arraySVC) && arraySVC.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to remove from cart?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                //console.log("ok");
                //alert("inisde" + contractId);
                document.getElementById("typeofRequestSVC").value = TypeofRequest;
                // alert(TypeofRequest);
                $("#spendAnalysisServiceForm").submit();
            } else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////

var array = [];
$(".spendLib-checkbox-class").click(function() {
    //var isContractChecked = $(this).prop("checked");
    var first = "";
    var mainValue = "";

    var contractId = $(this).val();
//            var Rows = ($('table#sarlib_details tr:last').index() + 1);
//            if(Rows<=1)
//            {
//                if($(this).prop("checked") == true)
//                {
//                    array.push(contractId);
//                    //alert("test => "+array);
//                }
//                else
//                {
//                    array.pop();
//                    //alert("test => "+array);
//                }
//            }
    if ($(this).prop("checked") == true)
    {
        array.push(contractId);

    }
    else
    {
        var index = array.indexOf(contractId);
        if (index > -1) {
            array.splice(index, 1);
        }
        if (!(Array.isArray(array) && array.length))
        {
            first = null;
            document.getElementById("mainvalue").value = "";
        }
    }


});

$("#assignSpend1").click(function() {

    if (!(Array.isArray(array) && array.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }
    if (array.length > 1)
    {
        document.getElementById("typeofRequestLib").value = "GroupSend";
    }

    $("#addInfoSpendAnalysisReportLib").modal("show");
});

//    $("#modcostCentreLib").click(function() {
//        $("#costCentre").val("FromInputField");
//        getAllCostCenter();
//        $("#costCenterModalLib").modal("show");
//    });



$("#assignModelBtnLib").click(function() {
    // alert("inside assigne spen");

    //var SPOC = $("#spoclib_contract").val();
    //alert(SPOC);
    if (!(Array.isArray(array) && array.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }


    var requestType = $("#modrequestTypeLib").val();
    $("#requestTypeLib").val(requestType.toString());

    var coCode = $("#modcompanyCodeLib").val();
    $("#companyCodeLib").val(coCode.toString());

    var contractType = $("#modcontractTypeLib").val();
    $("#contractTypeLib").val(contractType.toString());

    var tenderTitle = $("#modtenderTitleLib").val();
    $("#tenderTitleLib").val(tenderTitle.toString());

//        var costCentre = $("#modcostCentre").val();
//        $("#costCentre").val(costCentre.toString());
    var costCentre = $("costCentre").val;


    if (tenderTitle == '' || tenderTitle == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select Tender Title!!"
        });
        return false;
    }
    if (requestType == '' || requestType == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select Request Type!!"
        });
        return false;
    }
    if (coCode == '' || coCode == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select CoCode!!"
        });
        return false;
    }
    if (contractType == '' || contractType == null)
    {
        Lobibox.alert("error", {
            msg: "Please Select Contract Type!!"
        });
        return false;
    }


    if ((Array.isArray(array) && array.length))
    {
        //Loop through all checked CheckBoxes in GridView.
        -$("#sarlib_details input[type=checkbox]:checked").each(function() {
            //alert("CHECK BOX TICKED");
            var row = $(this).closest("tr")[0];
            var colums = $(this).closest("tr")[0];
            message += row.cells[2].innerHTML;
            message += "~" + row.cells[3].innerHTML;
            message += "~" + row.cells[4].innerHTML;
            message += "~" + row.cells[6].innerHTML;
            message += "~" + row.cells[7].innerHTML;
            message += "~" + row.cells[8].innerHTML;
            message += "~" + row.cells[9].innerHTML;
            message += "~" + row.cells[10].innerHTML;
            message += "~" + row.cells[11].innerHTML;
            message += "~" + row.cells[12].innerHTML;
            message += "~" + row.cells[13].innerHTML;
            message += "~" + row.cells[14].innerHTML;
            message += "~" + row.cells[15].innerHTML;
            message += "~" + row.cells[16].innerHTML;
            message += "~" + row.cells[17].innerHTML;
            message += "~" + row.cells[19].innerHTML;
            message += "~" + row.cells[20].innerHTML;
            message += "~" + row.cells[21].innerHTML;

            message += "###";
            document.getElementById("uniqueIDMatLib").value = row.cells[18].innerHTML;
        });
        document.getElementById("spendValuesJavaLib").value = message;
        document.getElementById("removeCartValuesLib").value = array.toString();
//        document.getElementById("cids").value = array.toString();
        //document.getElementById("transactionType").value = "Material";
        // document.getElementById("removeCartValues").value = contractId;
        console.log("Message " + message);
        // $("#unassignedSpendLines").val(message.toString());
        // $("#removeSpendLines").val(reAssignContractIdArray.toString());
    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to create?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                console.log("ok");
                $("#SpendAnalysisLibraryform").submit();
            } else if (type === 'no')
            {
                message = "";
                console.log("no");
            }
        }
    });
});

$("#removecartLib").click(function() {

    TypeofRequest = "RemoveCart";
    $("#removeCartValuesLib").val(array.toString());
    document.getElementById("removeCartValuesLib").value = array.toString();
    if (!(Array.isArray(array) && array.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to remove from Library?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                //console.log("ok");
                //alert("inisde" + contractId);
                document.getElementById("typeofRequestLib").value = TypeofRequest;
                // alert(TypeofRequest);
                $("#SpendAnalysisLibraryform").submit();
            } else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
});



$(".longTextClassSARLib").click(function() {

    $("#longTextModalSARLib").modal("show");
    var longtext = $(this).parent().children().eq(1).val();

    $('div.longtext').text(longtext);

});

$("#modcostCentreLib").click(function() {
    $("#costCentreLib").val("FromInputField");
    getAllCostCenterLib();
    $("#costCenterModalLib").modal("show");
});

$("#costCenterTableIdLib").on("click", ".costCenterCheckboxClassLib", function() {
    $(".costCenterCheckboxClassLib").prop("checked", false);
    var costCenter = $(this).parent().parent().find("td").eq(1).html();
    console.log(costCenter);
    $("#modcostCentreLib").val(costCenter);
    $("#costCentreLib").val(costCenter.toString());
    $("#costCenterModalLib").modal("hide");
});

var costCenterTableLib = null;
function getAllCostCenterLib() {
    var trackingNumber = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        var insertionid = $("#ItemNumberSelect").val();
        if (insertionid === id) {
            trackingNumber = $(this).find("td").eq(16).text();
        }
    });
    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getAllContCostCenter"

        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
//                var obj = [
//                            { "COST_CENTER":"Cost Centre1" , "DESCRIPTION":"Desc" }, 
//                            { "COST_CENTER":"Cost Centre2" , "DESCRIPTION":"Desc" }, 
//                            { "COST_CENTER":"Cost Centre3" , "DESCRIPTION":"Desc" } ];

            console.log("Obj length :" + obj.length);
            var row = "";
            for (var i = 0; i < obj.length; i++) {
                row += "<tr>"
                        + "<td><input type='checkbox' class='costCenterCheckboxClassLib'></td>"
                        + "<td>" + obj[i].COST_CENTER + "</td>"
                        + "<td>" + obj[i].DESCRIPTION + "</td>"
                        + "</tr>";
            }
            $("#costCenterTableIdLib tbody").append(row);
            if ($.fn.DataTable.isDataTable('#costCenterTableIdLib')) {
                costCenterTableLib.destroy();
                costCenterTableLib = null;
                $("#costCenterTableIdLib").children('tbody').html(row);
                costCenterTableLib = $('table.costCenterTableLib-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                costCenterTableLib.buttons().container()
                        .appendTo('#costCenterTableIdLib_wrapper .col-md-6:eq(0)');
            } else {
                $('#costCenterTableIdLib thead tr').clone(true).appendTo('#costCenterTableIdLib thead');
                $('#costCenterTableIdLib thead tr:eq(1) th').each(function(i) {
                    $('#costCenterTableIdLib thead tr:eq(0) th').addClass("table-header-color");
                    var title = $(this).text();
                    if (title === '') {
                        $(this).html('');
                    } else {
                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                    }
                    $('input', this).on('keyup change', function() {
                        if (costCenterTableLib.column(i).search() !== this.value) {
                            costCenterTableLib
                                    .column(i)
                                    .search(this.value)
                                    .draw();
                        }
                    });
                });
                costCenterTableLib = $('table.costCenterTableLib-Class').DataTable({
                    lengthChange: false,
                    orderCellsTop: true
                });
                costCenterTableLib.buttons().container()
                        .appendTo('#costCenterTableIdLib_wrapper .col-md-6:eq(0)');
            }
        }
    });
}



////////////////////////////////////////////////////////////////////////////////////////////

var array2 = [];
$(".spendSVCLib-checkbox-class").click(function() {
    //var isContractChecked = $(this).prop("checked");
    var first = "";

    var contractId = $(this).val();
    if ($(this).prop("checked") == true)
    {
        array2.push(contractId);

    }
    else
    {
        var index = array2.indexOf(contractId);
        if (index > -1) {
            array2.splice(index, 1);
        }
        if (!(Array.isArray(array2) && array2.length))
        {
            first = null;
            document.getElementById("mainvalue").value = "";
        }
    }
});


$("#removecartSVCLib").click(function() {

    TypeofRequest = "RemoveCart";
    $("#removeCartValuesSVCLib").val(array2.toString());
    document.getElementById("removeCartValuesSVCLib").value = array2.toString();

    if (!(Array.isArray(array2) && array2.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to remove from Library?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                //console.log("ok");
                //alert("inisde" + contractId);
                document.getElementById("typeofRequestSVCLib").value = TypeofRequest;
                // alert(TypeofRequest);
                $("#SpendAnalysisLibraryform2").submit();
            } else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
});

$("#assignSpendSVCLib").click(function() {
    // alert("inside assigne spen");
    var SPOC = $("#spoc_contractSVClib").val();
    //alert(SPOC);
    if (SPOC === "" || SPOC == undefined)
    {
        Lobibox.alert("error", {
            msg: "Please Select SPOC."
        });
        return false;
    }
    document.getElementById("spoc_contractLib").value = SPOC;
    if (!(Array.isArray(array2) && array2.length))
    {
//            alert("Please Select PR!");
        Lobibox.alert("error", {
            msg: "Please Select Contract Line!!"
        });
        return false;
    }

    if (array2.length > 1)
    {
        document.getElementById("typeofRequestSVCLib").value = "GroupSend";
    }

    if ((Array.isArray(array2) && array2.length))
    {
        //Loop through all checked CheckBoxes in GridView.
        -$("#sarSVC_DetailsLib input[type=checkbox]:checked").each(function() {
            //alert("CHECK BOX TICKED");
            var row = $(this).closest("tr")[0];
            var colums = $(this).closest("tr")[0];
            message += row.cells[2].innerHTML;
            message += "~" + row.cells[3].innerHTML;
            message += "~" + row.cells[4].innerHTML;
            message += "~" + row.cells[5].innerHTML;
            message += "~" + row.cells[6].innerHTML;
            message += "~" + row.cells[7].innerHTML;
            message += "~" + row.cells[8].innerHTML;
            message += "~" + row.cells[9].innerHTML;
            message += "~" + row.cells[10].innerHTML;
            message += "~" + row.cells[11].innerHTML;
            message += "~" + row.cells[12].innerHTML;
            message += "~" + row.cells[13].innerHTML;
            message += "~" + row.cells[14].innerHTML;
            message += "~" + row.cells[15].innerHTML;
            message += "~" + row.cells[16].innerHTML;
//            message += "~" + requestType;
//            message += "~" + coCode;
//            message += "~" + contractType;
//            message += "~" + costCentre;
//            message += "~" + activationDate;
            message += "###";
            document.getElementById("uniqueIDSvcLib").value = row.cells[17].innerHTML;
            //contractId += "###";
        });
        document.getElementById("spendValuesJavaSVCLib").value = message;
        document.getElementById("removeCartValuesSVCLib").value = array2.toString();
        //$("#removeCartValuesSVCLib").val(array2.toString());
        //alert(message);
        // document.getElementById("removeCartValues").value = contractId;
        console.log("Message " + message);
    }

//        alert(companyCodeArray.length);
    Lobibox.confirm({
        msg: "Do you want to create?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                console.log("ok");
                $("#SpendAnalysisLibraryform2").submit();
            } else if (type === 'no')
            {
                message = "";
                console.log("no");
            }
        }
    });
});

$("#addRatedParameters").click(function() {



    $("#ratedParameterModel").modal("show");



});


$("#addNewParameterBtn").click(function() {
    var paramName = document.getElementById("newRatedParameterMod").value;
    console.log("Param Name -> " + paramName);
    if (paramName === "" || paramName === null)
    {
        Lobibox.alert("error", {
            msg: "Please enter new Parameter Name!"
        });
        return false;
    }
    $.ajax({
        type: "GET",
        url: "contractmanagement.do",
        async: false,
        data:
                {
                    "reqFrom": "addParameter",
                    "paramName": paramName
                },
        complete: function(responseJson) {
            location.reload();

        }
    });

});



//Abishek
//Modified by Ram


if ($("table.unassignedContractServiceLine_table").length) {

    $(document).ready(function() {

        $('#unassignedContractServiceLine_table thead tr').clone(true).appendTo('#unassignedContractServiceLine_table thead');
        $('#unassignedContractServiceLine_table thead tr:eq(1) th').each(function(i) {
            $('#unassignedContractServiceLine_table thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.unassignedContractServiceLine_table').DataTable({
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
                        {extend: 'excel', title: 'UnAssigned Contract Lines'},
                        {extend: 'pdf', title: 'UnAssigned Contract Lines'},
                        {extend: 'print', title: 'UnAssigned Contract Lines'}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#unassignedContractServiceLine_table_wrapper .col-md-6:eq(0)');
    });
}

if ($("table.unassignedContractMaterialLine_table").length) {

    $(document).ready(function() {

        $('#unassignedContractMaterialLine_table thead tr').clone(true).appendTo('#unassignedContractMaterialLine_table thead');
        $('#unassignedContractMaterialLine_table thead tr:eq(1) th').each(function(i) {
            $('#unassignedContractMaterialLine_table thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.unassignedContractMaterialLine_table').DataTable({
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
                        {extend: 'excel', title: 'UnAssigned Contract Lines'},
                        {extend: 'pdf', title: 'UnAssigned Contract Lines'},
                        {extend: 'print', title: 'UnAssigned Contract Lines'}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#unassignedContractMaterialLine_table_wrapper .col-md-6:eq(0)');
    });
}

if ($("table.reassign-crfq-details-table").length) {

    $(document).ready(function() {

        $('#reassign-crfq-details-table thead tr').clone(true).appendTo('#reassign-crfq-details-table thead');
        $('#reassign-crfq-details-table thead tr:eq(1) th').each(function(i) {
            $('#reassign-crfq-details-table thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.reassign-crfq-details-table').DataTable({
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
                        {extend: 'excel', title: 'UnAssigned Contract Lines'},
                        {extend: 'pdf', title: 'UnAssigned Contract Lines'},
                        {extend: 'print', title: 'UnAssigned Contract Lines'}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#reassign-crfq-details-table .col-md-6:eq(0)');
    });
}

if ($("table.assignedContractServiceLine_table").length) {

    $(document).ready(function() {

        $('#assignedContractServiceLine_table thead tr').clone(true).appendTo('#assignedContractServiceLine_table thead');
        $('#assignedContractServiceLine_table thead tr:eq(1) th').each(function(i) {
            $('#assignedContractServiceLine_table thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.assignedContractServiceLine_table').DataTable({
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
                        {extend: 'excel', title: 'Assigned Contract Lines'},
                        {extend: 'pdf', title: 'Assigned Contract Lines'},
                        {extend: 'print', title: 'Assigned Contract Lines'}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#assignedContractServiceLine_table_wrapper .col-md-6:eq(0)');
    });
}

if ($("table.assignedContractMaterialLine_table").length) {

    $(document).ready(function() {

        $('#assignedContractMaterialLine_table thead tr').clone(true).appendTo('#assignedContractMaterialLine_table thead');
        $('#assignedContractMaterialLine_table thead tr:eq(1) th').each(function(i) {
            $('#assignedContractMaterialLine_table thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
            }
            $('input', this).on('keyup change', function() {
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });
        var table = $('table.assignedContractMaterialLine_table').DataTable({
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
                        {extend: 'excel', title: 'Assigned Contract Lines'},
                        {extend: 'pdf', title: 'Assigned Contract Lines'},
                        {extend: 'print', title: 'Assigned Contract Lines'}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#assignedContractMaterialLine_table_wrapper .col-md-6:eq(0)');
    });
}
$(document).ready(function() {

    if ($('#buyer_rfq_status_chart').length) {
//        alert("fsfa");
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "RfqStatusChart"
                            },
                    complete: function(responseJson) {
                        console.log("responseJson.responseText: " + responseJson.responseText);
                        var response = $.parseJSON(responseJson.responseText);
//            alert(response);
                        var total = 0;
                        for (var i = 0; i < response.length; i++)
                        {
                            total = Number(total) + Number(response[i][1]);
                        }
                        var chart = c3.generate({
                            bindto: "#buyer_rfq_status_chart",
                            data: {
                                columns: response,
                                type: 'donut',
                                onclick: function(d, i) {
                                    console.log("onclick", d, i);
                                },
                                onmouseover: function(d, i) {
                                    console.log("onmouseover", d, i);
                                },
                                onmouseout: function(d, i) {
                                    console.log("onmouseout", d, i);
                                }
                            },
                            donut: {
//                                title: "",
                                label: {
                                    format: function(value, ratio, id) {
                                        return value;
                                    },
                                    threshold: 0.01
                                }
                            },
                            size: {
                                height: 230
//                                width: 300
                            }
                        });
                        setTimeout(function() {
//                                var data = chart.api.data();
                            d3.select('#buyer_rfq_status_chart .c3-chart-arcs-title').node().innerHTML = "Total: " + total;
                        }, 500);
                    }

                });

    }

    if ($('#buyer_pr_status_chart').length) {
        $.ajax(
                {
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "BuyerPrStatusChart"
                            },
                    complete: function(responseJson) {
                        console.log("responseJson.responseText: " + responseJson.responseText);
//                        var response = $.parseJSON('[["Outstanding PR for PO Creation",262],["Pending PR for PO Approval",2]]');
                        var response = $.parseJSON(responseJson.responseText);

                        var total = 0;
                        for (var i = 0; i < response.length; i++)
                        {
                            total = Number(total) + Number(response[i][1]);
                        }
                        var chart = c3.generate({
                            bindto: "#buyer_pr_status_chart",
                            data: {
                                columns: response,
                                type: 'donut',
                                onclick: function(d, i) {
                                    console.log("onclick", d, i);
                                },
                                onmouseover: function(d, i) {
                                    console.log("onmouseover", d, i);
                                },
                                onmouseout: function(d, i) {
                                    console.log("onmouseout", d, i);
                                }
                            },
                            donut: {
//                                title: "",
                                label: {
                                    format: function(value, ratio, id) {
                                        return value;
                                    },
                                    threshold: 0.01
                                }
                            },
                            size: {
                                height: 230
//                                width: 300
                            }
                        });
                        setTimeout(function() {
                            d3.select('#buyer_pr_status_chart .c3-chart-arcs-title').node().innerHTML = "Total: " + total;
                        }, 500);
                    }
                });
    }

    $("#overlay").css("display", "none");
    $(".chosen").chosen();
    $("#unassignedContractLine_buyer_id").chosen();
    $(".selectpicker").selectpicker();
    $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

    var buyerRole = $("#buyerRole").val();
    console.log("buyerRole: " + buyerRole);
    if (buyerRole === "ROLE_BUYER")
    {
        functionPoCountList();
    }

    if ($("#fromPRApprovedDate_div").length) {
        $(function() {
            $('#fromPRApprovedDate_div').datetimepicker({
                format: 'DD.MM.YYYY'
//                minDate: new Date()
            });
            $('#toPRApprovedDate_div').datetimepicker({
                useCurrent: false,
                format: 'DD.MM.YYYY'
//                minDate: new Date()
            });
            $("#fromPRApprovedDate_div").on("change.datetimepicker", function(e) {
                $('#toPRApprovedDate_div').datetimepicker('minDate', e.date);
            });
            $("#toPRApprovedDate_div").on("change.datetimepicker", function(e) {
                $('#fromPRApprovedDate_div').datetimepicker('maxDate', e.date);
            });
        });
    }

    if ($("#fromPRApprovedDateService_div").length) {
        $(function() {
            $('#fromPRApprovedDateService_div').datetimepicker({
                format: 'DD.MM.YYYY'
//                minDate: new Date()
            });
            $('#toPRApprovedDateService_div').datetimepicker({
                useCurrent: false,
                format: 'DD.MM.YYYY'
//                minDate: new Date()
            });
            $("#fromPRApprovedDateService_div").on("change.datetimepicker", function(e) {
                $('#toPRApprovedDateService_div').datetimepicker('minDate', e.date);
            });
            $("#toPRApprovedDateService_div").on("change.datetimepicker", function(e) {
                $('#fromPRApprovedDateService_div').datetimepicker('maxDate', e.date);
            });
        });
    }


    $(".manual-date-input-check").keyup(function() {
//        alert($(this).val());
        var from_date = $(this).val();
        if (from_date !== "")
        {
//                        console.log("len: " + from_date.length);
            if (from_date.length === 2)
            {
                if (from_date > 31)
                {
                    Lobibox.alert("error", {
                        msg: "Enter valid day!"
                    });
//                    $(this).focus();
//                    alert("Enter valid day!");
                    return false;
                }
                $(this).val(from_date + "-");
            }
            if (from_date.length === 5)
            {
                var month = from_date.substr(from_date.indexOf("-") + 1, 2);
                console.log("month: " + month);
                if (month > 12)
                {
                    Lobibox.alert("error", {
                        msg: "Enter valid month!"
                    });
//                    $(this).focus();
                    return false;
                }
                $(this).val(from_date + "-");
            }
            if (from_date.length > 10)
            {

            }
        }
    });

    var reAssignRfqIdArray = [];
    $(".reassign-rfq-checkbox-class").click(function() {
        var isRfqChecked = $(this).prop("checked");
        var rfqId = $(this).val();
        var rfqBuyerId = $(this).parent().parent().find("td").eq(7).text();
        var rfqBuyerName = $(this).parent().parent().find("td").eq(6).text();
//        alert(rfqBuyerId);
        console.log(rfqId + " : " + isRfqChecked);
        if (isRfqChecked === true)
        {
            reAssignRfqIdArray.push(rfqId);

            $("#reassignRfqBuyerId option[value=" + rfqBuyerId + "]").remove();
            $("#reassignRfqBuyerId").trigger("chosen:updated");

        }
        else
        {
            var index = reAssignRfqIdArray.indexOf(rfqId);
            reAssignRfqIdArray.splice(index, 1);

            var isBuyerPresent = "No";
            $("#reassignRfqBuyerId option").each(function() {
                var buyerId = $(this).val();
                if (rfqBuyerId === buyerId)
                {
                    isBuyerPresent = "Yes";
                }
            });

            if (isBuyerPresent === "No")
            {
                $("#reassignRfqBuyerId").append("<option value=" + rfqBuyerId + ">" + rfqBuyerName + "</option>");
                $("#reassignRfqBuyerId").trigger("chosen:updated");
            }
        }
        console.log("length: " + reAssignRfqIdArray.length);
        console.log(reAssignRfqIdArray);
        $("#reassignrfqids").val(reAssignRfqIdArray.toString());

    });
    $("#reassignRfqBtn").click(function() {
        var buyer = $("#reassignRfqBuyerId").val();
//        alert(buyer);
        if (reAssignRfqIdArray.length === 0)
        {
//            alert("Please Select PR!");
            Lobibox.alert("error", {
                msg: "Please Select Any RFQ!"
            });
            return false;
        }
        if (buyer === "")
        {
//            alert("Please select buyer!");
            Lobibox.alert("error", {
                msg: "Please Select Buyer!"
            });
            return false;
        }
//        alert(companyCodeArray.length);
        Lobibox.confirm({
            msg: "Are you sure you want to Re-Assign ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#reassignrfqform").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    var reAssignPrIdArray = [];
    $(".reassign-pr-checkbox-class").click(function() {
        var isPrChecked = $(this).prop("checked");
        var prId = $(this).val();
        var prBuyerId = $(this).parent().parent().find("td").eq(23).text();
        var prBuyerName = $(this).parent().parent().find("td").eq(1).text();
//        console.log("prBuyerId: " + prBuyerId);
        if (isPrChecked === true)
        {
            reAssignPrIdArray.push(prId);

            $("#reassignBuyerId option[value=" + prBuyerId + "]").remove();
            $("#reassignBuyerId").trigger("chosen:updated");
        }
        else
        {
            var index = reAssignPrIdArray.indexOf(prId);
            reAssignPrIdArray.splice(index, 1);

            var isBuyerPresent = "No";
            $("#reassignBuyerId option").each(function() {
                var buyerId = $(this).val();
                if (prBuyerId === buyerId)
                {
                    isBuyerPresent = "Yes";
                }
            });
            if (isBuyerPresent === "No")
            {
                $("#reassignBuyerId").append("<option value=" + prBuyerId + ">" + prBuyerName + "</option>");
                $("#reassignBuyerId").trigger("chosen:updated");
            }
        }
        console.log("length: " + reAssignPrIdArray.length);
        console.log(reAssignPrIdArray);
        $("#reassignprlineids").val(reAssignPrIdArray.toString());
    });
    $("#reassignbtn").click(function() {
        var buyer = $("#reassignBuyerId").val();
//        alert(buyer);
        if (reAssignPrIdArray.length === 0)
        {
//            alert("Please Select PR!");
            Lobibox.alert("error", {
                msg: "Please Select PR!"
            });
            return false;
        }
        if (buyer === "")
        {
//            alert("Please select buyer!");
            Lobibox.alert("error", {
                msg: "Please Select Buyer!"
            });
            return false;
        }
//        alert(companyCodeArray.length);
        Lobibox.confirm({
            msg: "Are you sure you want to Re-Assign ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#reassignprlineform").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    var prIdArray = [];
    var companyCodeArray = [];
    $(".pr-checkbox-class").click(function() {
//        alert("check");
        $("#buyerid").data('pre', $("#buyerid").val());

        var isPrChecked = $(this).prop("checked");
        var prId = $(this).val();
        var companycode = $(this).parent().parent().find("td").eq(13).html();
        console.log("prId: " + prId);
        if (isPrChecked === true)
        {
            prIdArray.push(prId);

//            if (companyCodeArray.length === 0) {
//                companyCodeArray.push(companycode);
//                prIdArray.push(prId);
//                console.log("companyCodeArray :" + companyCodeArray);
//            } else {
//                if (companyCodeArray.includes(companycode)) {
//                    prIdArray.push(prId);
//                    console.log("prIdArray :" + prIdArray);
//                    companyCodeArray.push(companycode);
//                    console.log("companyCodeArray :" + companyCodeArray);
//                    console.log("companyCodeArray length at check :" + companyCodeArray.length);
//                }
//            }
        }
        else
        {
            var index = prIdArray.indexOf(prId);
            var codeIndex = companyCodeArray.indexOf(companycode);
            prIdArray.splice(index, 1);
            companyCodeArray.splice(codeIndex, 1);
//            console.log("prId pop: " + prId);
        }
        console.log("length: " + prIdArray.length);
        console.log(prIdArray);
        $("#prlineids").val(prIdArray.toString());
    });

    var contractIdArray = [];
    $("#unassignedContractMaterialLine_table").on("click", ".contract-checkbox-class", function() {
        //$(".contract-checkbox-class").click(function() {
        //  alert(987)
//       alert("Bittu");

        var isContractChecked = $(this).prop("checked");
        var contractId = $(this).val();
//        alert(contractId);
        if (isContractChecked === true) {
            contractIdArray.push(contractId);
        } else {
            var index = contractIdArray.indexOf(contractId);
            contractIdArray.splice(index, 1);
        }
        console.log("length :" + contractIdArray.length);
        console.log(contractIdArray);
        $("#contractlineids").val(contractIdArray.toString());
    });

    //

    $("#unassignedContractServiceLine_table").on("click", ".contract-checkbox-class", function() {
        //$(".contract-checkbox-class").click(function() {
        // alert(987)
//       alert("Bittu");

        var isContractChecked = $(this).prop("checked");
        var contractId = $(this).val();
//        alert(contractId);
        if (isContractChecked === true) {
            contractIdArray.push(contractId);
        } else {
            var index = contractIdArray.indexOf(contractId);
            contractIdArray.splice(index, 1);
        }
        console.log("length :" + contractIdArray.length);
        console.log(contractIdArray);
        $("#contractlineids").val(contractIdArray.toString());
    });
    $("#assignPRModalBtn").click(function() {
        Lobibox.confirm({
            msg: "Are you sure you want to assign?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#buyerPRAndContractCountModal").modal("hide");
                    $("#assignprlineform").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });
    $("#assignContractModalBtn").click(function() {
        Lobibox.confirm({
            msg: "Are you sure you want to assign?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#buyerPRAndContractCountModal").modal("hide");
                    $("#unassignedContractLine").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });
    $("#assignbtn").click(function() {
        var buyer = $("#buyerid").val();
//        alert(buyer);
        if (prIdArray.length === 0)
        {
//            alert("Please Select PR!");
            Lobibox.alert("error", {
                msg: "Please Select PR."
            });
            return false;
        }
        if (buyer === "")
        {
//            alert("Please select buyer!");
            Lobibox.alert("error", {
                msg: "Please Select Buyer."
            });
            return false;
        }
//        alert(companyCodeArray.length);
        Lobibox.confirm({
            msg: "Are you sure you want to assign?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#assignprlineform").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });
    $("#contractbuyerid").change(function() {
        var buyerid = $("#contractbuyerid").val();
        isBuyerChanged = "Yes";

        var tempPrevCount = $("#buyer_count_card_" + buyerid).find("#buyer_assigned_contract_count_" + buyerid).text();

        prevBuyerIdAndConCount[buyerid] = tempPrevCount;
//        alert(prevBuyerIdAndPrCount[buyerid]);

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data:
                    {
                        "reqFrom": "getBuyerById",
                        "buyerid": buyerid
                    },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
//                alert(obj.Code);
                var companycode = obj.CompanyCode;
//                alert(companycode);
                if (companycode !== undefined)
                {
//                    $('#vendorcode').selectpicker('val', code);
                    $("#companycode").val(companycode);
                }
            }
        });
    });
    $("#assigncontractbtn").click(function() {
        var buyer = $("#contractbuyerid").val();
//        alert(buyer);
        if (contractIdArray.length === 0)
        {
//            alert("Please Select PR!");
            Lobibox.alert("error", {
                msg: "Please Select Contract."
            });
            return false;
        }
        else if (buyer === "")
        {
//            alert("Please select buyer!");
            Lobibox.alert("error", {
                msg: "Please Select Buyer."
            });
            return false;
        }
        else
        {
            Lobibox.confirm({
                msg: "Are you sure you want to assign?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#unassignedContractLine").submit();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        }
    });
    $(".select-all-prline").click(function() {
//        alert("fasf");
        prIdArray = [];
        var isChecked = $(this).prop("checked");
//        $(this).parent().parent().parent().parent().find("tbody tr").each(function() {
        $("#pr_details").find("tbody tr").each(function() {
            var pr_id = $(this).find("td").eq(0).find(".pr-checkbox-class").val();
//            alert("pr_id: " + pr_id);

            if (isChecked === true)
            {
                $(this).find("td").eq(0).find(".pr-checkbox-class").prop("checked", true);
                prIdArray.push(pr_id);
            }
            else
            {
                $(this).find("td").eq(0).find(".pr-checkbox-class").prop("checked", false);
            }
        });
        if (isChecked === true)
        {
//            alert(prIdArray);
            $("#prlineids").val(prIdArray.toString());
        }
        else
        {
            prIdArray = [];
//            alert(prIdArray);
        }
    });
//    if ($('[data-toggle="popover"]').length) {
//        $(".pending-pr").hover(function() {
//            $('[data-toggle="popover"]').popover("show");
//        });
//
//        $(".pending-pr").focusout(function() {
//            $('[data-toggle="popover"]').popover("destroy");
//        });
//    }


    $("#filterLinkId").click(function() {
        $("#filterWorloadReportForm").trigger("reset");
        $("#filterWorkLoadReportModal").modal("show");
    });

    $("#filterLinkId_Service").click(function() {
        $("#filterWorloadReportFormService").trigger("reset");
        $("#filterWorkLoadReportModalService").modal("show");
    });

    $("#contractFilter").click(function() {
        $("#contractFilterWorloadReportForm").trigger("reset");
        $("#contractFilterWorkLoadReportModal").modal("show");
    });

    $(".longTextClass").click(function() {
//        alert("dsf");
//        $("#filterWorloadReportForm").trigger("reset");

        $("#longTextModal").modal("show");
        var longtext = $(this).parent().children().eq(1).val();
//        $("#longtext").val(longtext);
        $('div.longtext').text(longtext);
//        alert(longtext);
    });
    $("#teamleadid").change(function() {
        var teamleadid = $('#teamleadid');
//        alert(teamleadid);

        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "UsernameAvailibility",
                                "username": teamleadid.val()
                            },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        if (obj.size != 0) {
                            Lobibox.alert("error", {
                                msg: " username already exists  "
                            });
                            $("#teamleadid").val("");
                        }

                    }

                });
//        }

    });
    $("#buyerid").change(function() {

        $("#buyerids").val($(this).val());
    });
    $("#filterWorkloadReportBtn").click(function() {

        var fromPlantCode = $("#fromPlantCode").val();
        var toPlantCode = $("#toPlantCode").val();
        var fromPRNumber = $("#fromPRNumber").val();
        var toPRNumber = $("#toPRNumber").val();
        var fromPRNumberNewgen = $("#fromPRNumberNewgen").val();
        var toPRNumberNewgen = $("#toPRNumberNewgen").val();
        var fromPurchaseGroup = $("#fromPurchaseGroup").val();
        var toPurchaseGroup = $("#toPurchaseGroup").val();
        var fromMaterialClass = $("#fromMaterialClass").val();
        var toMaterialClass = $("#toMaterialClass").val();
        var type = $("#type").val();
        var prRaisedBy = $("#prRaisedBy").val();
        var fromPRApprovedDate = $("#fromPRApprovedDate").val();
        var toPRApprovedDate = $("#toPRApprovedDate").val();
        var trackingNumber = $("#trackingNumber").val();
        var materialService = $("#materialService").val();

        console.log("fromPlantCode :" + fromPlantCode);
        console.log("toPlantCode :" + toPlantCode);
        console.log("fromPRNumber :" + fromPRNumber);
        console.log("toPRNumber :" + toPRNumber);
        console.log("fromPRNumberNewgen :" + fromPRNumberNewgen);
        console.log("toPRNumberNewgen :" + toPRNumberNewgen);
        console.log("fromPurchaseGroup :" + fromPurchaseGroup);
        console.log("toPurchaseGroup :" + toPurchaseGroup);
        console.log("fromMaterialClass :" + fromMaterialClass);
        console.log("toMaterialClass :" + toMaterialClass);
        console.log("type :" + type);
        console.log("prRaisedBy :" + prRaisedBy);
        console.log("fromPRApprovedDate :" + fromPRApprovedDate);
        console.log("toPRApprovedDate :" + toPRApprovedDate);
        console.log("trackingNumber :" + trackingNumber);
        console.log("materialService :" + materialService);
        if ($("#fromPlantCode").val() === "" && $("#toPlantCode").val() === "" && $("#fromPRNumber").val() === "" && $("#toPRNumber").val() === "" && $("#fromPRNumberNewgen").val() === "" &&
                $("#toPRNumberNewgen").val() === "" && $("#fromPurchaseGroup").val() === "" && $("#toPurchaseGroup").val() === "" && $("#fromMaterialClass").val() === "" &&
                $("#toMaterialClass").val() === "" && $("#type").val() === "" && $("#prRaisedBy").val() === "" && $("#fromPRApprovedDate").val() === "" &&
                $("#toPRApprovedDate").val() === "" && $("#trackingNumber").val() === "" && $("#materialService").val() === "") {

            Lobibox.alert("error", {
                msg: "Please fill atleast one field!"
            });
            return false;
        }
        $("#overlay").css("display", "block");
        $("#filterWorkLoadReportModal").modal("hide");
        $("#filterWorloadReportForm").submit();
    });

    $("#filterWorkloadReportBtnService").click(function() {

        var fromPlantCode = $("#fromPlantCodeService").val();
        var toPlantCode = $("#toPlantCodeService").val();
        var fromPRNumber = $("#fromPRNumberService").val();
        var toPRNumber = $("#toPRNumberService").val();
        var fromPRNumberNewgen = $("#fromPRNumberNewgenService").val();
        var toPRNumberNewgen = $("#toPRNumberNewgenService").val();
        var fromPurchaseGroup = $("#fromPurchaseGroupService").val();
        var toPurchaseGroup = $("#toPurchaseGroupService").val();
        var fromMaterialClass = $("#fromMaterialClassService").val();
        var toMaterialClass = $("#toMaterialClassService").val();
        var type = $("#typeService").val();
        var prRaisedBy = $("#prRaisedByService").val();
        var fromPRApprovedDate = $("#fromPRApprovedDateService").val();
        var toPRApprovedDate = $("#toPRApprovedDateService").val();
        var trackingNumber = $("#trackingNumberService").val();
        var materialService = $("#Service").val();
        console.log("fromPlantCode :" + fromPlantCode);
        console.log("toPlantCode :" + toPlantCode);
        console.log("fromPRNumber :" + fromPRNumber);
        console.log("toPRNumber :" + toPRNumber);
        console.log("fromPRNumberNewgen :" + fromPRNumberNewgen);
        console.log("toPRNumberNewgen :" + toPRNumberNewgen);
        console.log("fromPurchaseGroup :" + fromPurchaseGroup);
        console.log("toPurchaseGroup :" + toPurchaseGroup);
        console.log("fromMaterialClass :" + fromMaterialClass);
        console.log("toMaterialClass :" + toMaterialClass);
        console.log("type :" + type);
        console.log("prRaisedBy :" + prRaisedBy);
        console.log("fromPRApprovedDate :" + fromPRApprovedDate);
        console.log("toPRApprovedDate :" + toPRApprovedDate);
        console.log("trackingNumber :" + trackingNumber);
        console.log("materialService :" + materialService);
        if ($("#fromPlantCode").val() === "" && $("#toPlantCode").val() === "" && $("#fromPRNumber").val() === "" && $("#toPRNumber").val() === "" && $("#fromPRNumberNewgen").val() === "" &&
                $("#toPRNumberNewgen").val() === "" && $("#fromPurchaseGroup").val() === "" && $("#toPurchaseGroup").val() === "" && $("#fromMaterialClass").val() === "" &&
                $("#toMaterialClass").val() === "" && $("#type").val() === "" && $("#prRaisedBy").val() === "" && $("#fromPRApprovedDate").val() === "" &&
                $("#toPRApprovedDate").val() === "" && $("#trackingNumber").val() === "" && $("#materialService").val() === "") {

            Lobibox.alert("error", {
                msg: "Please fill atleast one field!"
            });
            return false;
        }
        $("#overlay").css("display", "block");
        $("#filterWorkLoadReportModalService").modal("hide");
        $("#filterWorloadReportFormService").submit();
    });


    $("#trackingNumber").change(function() {
        var tno = $(this).val();
//        alert(tno);
        $("#trackingNumberIds").val(tno);
    });

    $("#trackingNumberService").change(function() {
        var tno = $(this).val();
//        alert(tno);
        $("#trackingNumberIdsService").val(tno);
    });

    $("#asstd_teamleadid").change(function() {
        var teamleadid = $('#asstd_teamleadid').val();
//        alert(teamleadid);
        getMappedBuyers(teamleadid);
    });
    $("#ass_teamleadid").change(function() {
        var teamleadid = $("#ass_teamleadid option:selected").val();
        getBuyers(teamleadid);
    });
    $("#mappedbuyerstable").on("click", ".deassociatebuyer", function() {
//        alert("sdas");
        var buyerid = $(this).parent().eq(0).find(".buyerid").val();
        var teamleadid = $('#asstd_teamleadid').val();
//        alert(teamleadid);

        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "DeassociateBuyer",
                                "teamleadId": teamleadid,
                                "buyerId": buyerid
                            },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        getMappedBuyers(teamleadid);
                    }

                });
    });
//    $("#associatesubmitbtn").click(function() {
//
//        if ($("#fromPlantCode").val() == '' || $("#toPlantCode").val() == '' || $("#fromPRNumber").val() == '' || $("#toPRNumber").val() == '' ||
//                $("#fromPRNumberNewgen").val() == '' || $("#toPRNumberNewgen").val() == '' || $("#fromPurchaseGroup").val() == '' || $("").val(toPurchaseGroup) == '' ||
//                $("#fromMaterialClass").val() == '' || $("#toMaterialClass").val() == '' || $("#type").val() == '' || $("prRaisedBy").val() == '' || 
//                $("#fromPRApprovedDate").val() == '' || $("#toPRApprovedDate").val() == '' || $("#trackingNumber").val() == '' || $("#materialService").val() == '') {
//            
//             Lobibox.alert("error", {
//                        msg: "Please Enter Atleast One Field!"
//                    });
//
//                    return false;
//        }
//
//    });


    var ispasswordupdated = $("#ispasswordupdated").val();
    var isPersonalInfoUpdated = $("#isPersonalInfoUpdated").val();
    console.log("ispasswordupdated :" + ispasswordupdated);
    console.log("isPersonalInfoUpdated :" + isPersonalInfoUpdated);
//    var ispasswordupdated = "No";
//    alert(ispasswordupdated);

    if (ispasswordupdated !== "Yes")
    {
        $("#updatePasswordAtFirst").modal({backdrop: 'static', keyboard: false});
        $("#updatePasswordAtFirst").modal("show");
    }
    if (isPersonalInfoUpdated !== "Yes" && ispasswordupdated === "Yes") {
        location.href = "editprofile.do";
    }

    $(".unAssignedPRbtn").click(function() {

        var prid = $(this).parent().find(".prid").val();
//        alert(prid);

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data:
                    {
                        "reqFrom": "ReassignedPR",
                        "prid": prid
                    }
        });
        $(this).parent().parent().remove();
        location.href = "dashboardcont.do";
    });
    $(".unAssignedCpntractbtn").click(function() {

        var contractid = $(this).parent().find(".contractid").val();
//        alert(contractid);

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data:
                    {
                        "reqFrom": "ReassignedContract",
                        "contractid": contractid
                    }
        });
        $(this).parent().parent().remove();
        location.href = "dashboardcont.do";
    });

    var isBlockedAndSimulated = "No";
    var tempPrIdTempLen = 0;
    var isBuyerChanged = "No";
    var prevBuyerId = 0;
    var prevBuyerPrCount = 0;
    var prevBuyerIdAndPrCount = {};

    $("#blockandsimulatebtnpr").click(function() {
        var buyer = $("#buyerid").val();

//        prevBuyerId = $("#buyerid").data('pre');

        if (buyer === "")
        {
            Lobibox.alert("error", {
                msg: "Please select any buyer!"
            });
            return false;
        }
        if (prIdArray.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please Select PR."
            });
            return false;
        }
//        alert(tempPrIdTempLen + ", " + prIdArray.length + ", " + isBlockedAndSimulated + ", " + isBuyerChanged);
//        alert("prevBuyerId: " + prevBuyerId);

        if (isBlockedAndSimulated === "No" || tempPrIdTempLen !== prIdArray.length || isBuyerChanged === "Yes")
        {
            var buyerCardId = $("#buyer_count_card_" + buyer);

            if (isBuyerChanged === "Yes" && prevBuyerId !== 0)
            {
                $("#buyer_count_card_" + prevBuyerId).find("#buyer_assigned_pr_count_" + prevBuyerId).text(prevBuyerIdAndPrCount[prevBuyerId]);
            }
            var pr_count = buyerCardId.find("#buyer_assigned_pr_count_" + buyer).text();
            var contract_count = buyerCardId.find("#buyer_assigned_contract_count_" + buyer).text();

            buyerCardId.find("#buyer_assigned_pr_count_" + buyer).text(Number(Number(prevBuyerIdAndPrCount[buyer]) + prIdArray.length) + " ");

            isBlockedAndSimulated = "Yes";
            tempPrIdTempLen = prIdArray.length;
            isBuyerChanged = "No";
        }
//        if (prevBuyerPrCount !== 0)
//        {
//            prevBuyerPrCount = buyerCardId.find("#buyer_assigned_pr_count_" + prevBuyerId).text();
//        }
        prevBuyerId = buyer;
        $("#assignPRModalBtn").show();
        $("#assignContractModalBtn").hide();
        $("#buyerPRAndContractCountModal").modal("show");
    });

    var isConBlockedAndSimulated = "No";
    var tempConIdTempLen = 0;
    var isConBuyerChanged = "No";
    var prevConBuyerId = 0;
    var prevBuyerConCount = 0;
    var prevBuyerIdAndConCount = {};

    $("#blockandsimulatecontract").click(function() {
        var buyer = $("#contractbuyerid").val();

//        prevBuyerId = $("#buyerid").data('pre');

        if (buyer === "")
        {
            Lobibox.alert("error", {
                msg: "Please select any buyer!"
            });
            return false;
        }
        if (contractIdArray.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please Select Contract."
            });
            return false;
        }
        //  alert(tempConIdTempLen + ", " + contractIdArray.length + ", " + isConBlockedAndSimulated + ", " + isConBuyerChanged);
//        alert("prevBuyerId: " + prevBuyerId);

        if (isConBlockedAndSimulated === "No" || tempConIdTempLen !== contractIdArray.length || isConBuyerChanged === "Yes")
        {
            var buyerCardId = $("#buyer_count_card_" + buyer);

            if (isConBuyerChanged === "Yes" && prevConBuyerId !== 0)
            {
                $("#buyer_count_card_" + prevConBuyerId).find("#buyer_assigned_contract_count_" + prevConBuyerId).text(prevBuyerIdAndConCount[prevBuyerId]);
            }
            var pr_count = buyerCardId.find("#buyer_assigned_pr_count_" + buyer).text();
            var contract_count = buyerCardId.find("#buyer_assigned_contract_count_" + buyer).text();
            console.log(prevBuyerIdAndConCount[buyer])
            console.log(contractIdArray.length)
            buyerCardId.find("#buyer_assigned_contract_count_" + buyer).text(Number(Number(prevBuyerIdAndConCount[buyer]) + contractIdArray.length) + " ");

            isConBlockedAndSimulated = "Yes";
            tempConIdTempLen = contractIdArray.length;
            isConBuyerChanged = "No";
        }
//        if (prevBuyerPrCount !== 0)
//        {
//            prevBuyerPrCount = buyerCardId.find("#buyer_assigned_pr_count_" + prevBuyerId).text();
//        }
        prevBuyerId = buyer;
        $("#assignPRModalBtn").hide();
        $("#assignContractModalBtn").show();
        $("#buyerPRAndContractCountModal").modal("show");
    });



    $("#workloadAssignmentReportbtnContract").click(function() {
        $("#workloadAssignmentReportModal").modal("show");
    });
    $("#workloadAssignmentReportbtnpr").click(function() {
        $("#workloadAssignmentReportModal").modal("show");
    });

//    $("#blockandsimulatecontract").click(function() {
//        $("#ROLE_TEAM_LEAD_DEFAULT_CARD").css("display", "block");
//    });

    $("#buyerid").change(function() {
        var buyerid = $("#buyerid").val();
        isBuyerChanged = "Yes";

        var tempPrevCount = $("#buyer_count_card_" + buyerid).find("#buyer_assigned_pr_count_" + buyerid).text();

        prevBuyerIdAndPrCount[buyerid] = tempPrevCount;
//        alert(prevBuyerIdAndPrCount[buyerid]);

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data:
                    {
                        "reqFrom": "getBuyerById",
                        "buyerid": buyerid
                    },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
//                alert(obj.Code);
                var companycode = obj.CompanyCode;
//                alert(companycode);
                if (companycode !== undefined)
                {
//                    $('#vendorcode').selectpicker('val', code);
                    $("#companycode").val(companycode);
                }
            }
        });
    });
    function getMappedBuyers(teamleadid)
    {
        if (teamleadid !== "")
        {
            $.ajax(
                    {
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data:
                                {
                                    "reqFrom": "TeamleadBuyerMapping",
                                    "teamleadId": teamleadid
                                },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
//                            alert(obj.Data.length);
                            $("#mappedbuyerstable tbody tr").remove();
                            var row = "";
                            for (var i = 0; i < obj.Data.length; i++)
                            {
                                row += "<tr><td>" + (i + 1) + "<input type='hidden' class='buyerid' value='" + obj.Data[i].BuyerId + "'></td><td>" + obj.Data[i].Username + "</td><td>" + obj.Data[i].FirstName + "</td><td>" + obj.Data[i].LastName + "</td><td>" + obj.Data[i].EmailId + "</td><td class='text-align-center deassociatebuyer'><a href='#' title='Deassociate Buyer'><i class='fa fa-trash'></i></a></td></tr>";
                            }

                            $("#mappedbuyerstable").children("tbody").append(row);
                        }

                    });
//        }
        }
    }

    function getBuyers(teamleadid)
    {
        if (teamleadid !== "")
        {
            $.ajax(
                    {
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data:
                                {
                                    "reqFrom": "TeamleadBuyerMapping",
                                    "teamleadId": teamleadid
                                },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
//                        alert(obj.AssociateBuyer.length);
                            for (var i = 0; i < obj.AssociateBuyer.length; i++)
                            {
                                $("#buyerid option").remove();
//                            $('#buyerid').selectpicker("refresh")
                                for (var i = 0; i < obj.AssociateBuyer.length; i++)
                                {
                                    console.log(obj.AssociateBuyer[i].USERID);
                                    $("<option>").val(obj.AssociateBuyer[i].USERID).text(obj.AssociateBuyer[i].USERNAME).appendTo("#buyerid");
                                }
                                $("#buyerid").selectpicker("refresh");
                            }
                        }

                    });
//        }
        }
    }

//    $("#associatesubmitbtn").click(function() {
//        var plants = [];
//        var i;
//        $.each($(".plantCode-Class option:selected"), function() {
//            plants.push($(this).val());
//        });
//        $("#filterWorkLoadReportModal").modal("hide");
//        var rows = $("#pr_details").find("tr").hide();
//////        alert(rows.length)
//        for (i = 0; i <= plants.length; i++) {
//            rows.filter(":contains(" + plants[i] + ")").show();
////            $(".pr-details").find("tr").find("td").addClass("pr_details_class");
////            $("#filterWorkLoadReportModal").modal("hide");
//        }
//    });

    $("#sparkline-revenue").sparkline([5, 5, 7, 7, 9, 5, 3, 5, 2, 4, 6, 7], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#5969ff',
        fillColor: '#dbdeff',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true
    });

    $("#sparkline-revenue2").sparkline([3, 7, 6, 4, 5, 4, 3, 5, 5, 2, 3, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#ff407b',
        fillColor: '#ffdbe6',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true
    });
    $("#sparkline-revenue3").sparkline([5, 3, 4, 6, 5, 7, 9, 4, 3, 5, 6, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#25d5f2',
        fillColor: '#dffaff',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true
    });
    $("#sparkline-revenue4").sparkline([6, 5, 3, 4, 2, 5, 3, 8, 6, 4, 5, 1], {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#fec957',
        fillColor: '#fff2d5',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true
    });
    $("#gm_companycode").change(function() {
//       alert($(this).val()); 
        $("#companycode").val($(this).val());
    });
    $("#fromPurchaseGroup").change(function() {
        $("#toPurchaseGroup").val("0");
    });
    $("#toPurchaseGroup").change(function() {
        var toPurchaseGroup = $(this).val();
        var fromPurchaseGroup = $("#fromPurchaseGroup").val();

        console.log("fromPurchaseGroup: " + fromPurchaseGroup);
        console.log("toPurchaseGroup: " + toPurchaseGroup);

        if (fromPurchaseGroup !== "0" && toPurchaseGroup !== "0")
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
                $("#toPurchaseGroup").val("0");
                return false;
            }
            if (Number(toPGroupSeq) <= Number(fromPGroupSeq))
            {
                Lobibox.alert("error", {
                    msg: "This should be greater than " + fromPurchaseGroup
                });
                $("#toPurchaseGroup").val("0");
                return false;
            }
        }
    });

    $("#newworkloadAssignmentReportbtnpr").click(function() {
        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "rfqEvaluationGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "findAssignedPrCount"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("obj.buyerJsonArr len: " + obj.buyerJsonArr.length);
                console.log("obj.buyerPrCountJsonArr len: " + obj.buyerPrCountJsonArr.length);

                var buyerId = $("#buyerid").val();
                console.log("buyerId: " + buyerId);
                console.log("prIdArray: " + prIdArray);

                var thead_tr = "";
                var existingPr_tbody_tr = "";
                var newPr_tbody_tr = "";
                var totalPr_tbody_tr = "";

                $("#newWorkloadAssignmentReportModalTable thead tr").remove();
                $("#newWorkloadAssignmentReportModalTable tbody tr").remove();

                thead_tr += "<tr>";
                thead_tr += "<th>Buyer</th>";
                existingPr_tbody_tr += "<tr>";
                existingPr_tbody_tr += "<th>Existing PR</th>";
                newPr_tbody_tr += "<tr>";
                newPr_tbody_tr += "<th>New PR</th>";
                totalPr_tbody_tr += "<tr>";
                totalPr_tbody_tr += "<th>Total PR</th>";
                for (var i = 0; i < obj.buyerJsonArr.length; i++)
                {
                    thead_tr += "<th><input type='hidden' value='" + obj.buyerJsonArr[i].id + "'>" + obj.buyerJsonArr[i].firstname + " " + obj.buyerJsonArr[i].lastname + "</th>";
                    existingPr_tbody_tr += "<td>" + obj.buyerPrCountJsonArr[i] + "</td>";

                    if (Number(buyerId) === Number(obj.buyerJsonArr[i].id)) {
                        newPr_tbody_tr += "<td>" + prIdArray.length + "</td>";
                        totalPr_tbody_tr += "<td>" + (Number(obj.buyerPrCountJsonArr[i]) + prIdArray.length) + "</td>";
                    } else {
                        newPr_tbody_tr += "<td>0</td>";
                        totalPr_tbody_tr += "<td>" + obj.buyerPrCountJsonArr[i] + "</td>";
                    }

                }
                thead_tr += "</tr>";
                existingPr_tbody_tr += "</tr>";
                newPr_tbody_tr += "</tr>";
                totalPr_tbody_tr += "</tr>";

                console.log("thead_tr: " + thead_tr);
                console.log("existingPr_tbody_tr: " + existingPr_tbody_tr);
                console.log("newPr_tbody_tr: " + newPr_tbody_tr);
                console.log("totalPr_tbody_tr: " + totalPr_tbody_tr);

                $("#newWorkloadAssignmentReportModalTable thead").append(thead_tr);
                $("#newWorkloadAssignmentReportModalTable tbody").append(existingPr_tbody_tr);
                $("#newWorkloadAssignmentReportModalTable tbody").append(newPr_tbody_tr);
                $("#newWorkloadAssignmentReportModalTable tbody").append(totalPr_tbody_tr);

                $("#overlay").css("display", "none");
                $("#newWorkloadAssignmentReportModal").modal("show");
            }
        });
    });
});




(function(window, document, $, undefined) {
    "use strict";
    $(function() {
        if ($('#pr_rfq_status_chart').length) {
//        alert("fsfa");
            $.ajax(
                    {
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data:
                                {
                                    "reqFrom": "AdminRfqStatusChart"
                                },
                        complete: function(responseJson) {
                            var response = $.parseJSON(responseJson.responseText);
//            alert(response);
                            var total = 0;
                            for (var i = 0; i < response.length; i++)
                            {
                                total = Number(total) + Number(response[i][1]);
                            }
//                            alert(total);
                            var chart = c3.generate({
                                bindto: "#pr_rfq_status_chart",
                                data: {
                                    columns: response,
                                    type: 'donut',
                                    onclick: function(d, i) {
                                        console.log("onclick", d, i);
                                    },
                                    onmouseover: function(d, i) {
                                        console.log("onmouseover", d, i);
                                    },
                                    onmouseout: function(d, i) {
                                        console.log("onmouseout", d, i);
                                    }
                                },
                                donut: {
//                                    title: "Total",
                                    label: {
                                        format: function(value, ratio, id) {
                                            return value;
                                        },
                                        threshold: 0.01
                                    }
                                },
                                size: {
//                                    height: 230
//                                width: 300
                                }
                            });
                            setTimeout(function() {
//                                var data = chart.api.data();
                                d3.select('#pr_rfq_status_chart .c3-chart-arcs-title').node().innerHTML = "Total: " + total;
                            }, 500);
                        }
                    });
        }
        if ($('#pr_rfp_status_chart').length) {
//        alert("fsfa");
            $.ajax(
                    {
                        type: "GET",
                        url: "doajaxrequest.do",
                        async: false,
                        data:
                                {
                                    "reqFrom": "AdminRfpStatusChart"
                                },
                        complete: function(responseJson) {
                            var response = $.parseJSON(responseJson.responseText);
//            alert(response);
                            var total = 0;
                            for (var i = 0; i < response.length; i++)
                            {
                                total = Number(total) + Number(response[i][1]);
                            }
//                            alert(total);
                            var chart = c3.generate({
                                bindto: "#pr_rfp_status_chart",
                                data: {
                                    columns: response,
                                    type: 'donut',
                                    onclick: function(d, i) {
                                        console.log("onclick", d, i);
                                    },
                                    onmouseover: function(d, i) {
                                        console.log("onmouseover", d, i);
                                    },
                                    onmouseout: function(d, i) {
                                        console.log("onmouseout", d, i);
                                    }
                                },
                                donut: {
//                                    title: "Total",
                                    label: {
                                        format: function(value, ratio, id) {
                                            return value;
                                        },
                                        threshold: 0.01
                                    }
                                },
                                size: {
//                                    height: 230
//                                width: 300
                                }
                            });
                            setTimeout(function() {
//                                var data = chart.api.data();
                                d3.select('#pr_rfp_status_chart .c3-chart-arcs-title').node().innerHTML = "Total: " + total;
                            }, 500);
                        }
                    });
        }
//
//        if ($('#pr_rfq_status_chart').length) {
////        alert("Bittu");
//            var chart = c3.generate({
//                bindto: "#pr_rfq_status_chart",
//                data: {
//                    columns: [
//                        ['data1', 30],
//                        ['data2', 120],
//                        ['data3', 180]
//                    ],
//                    type: 'donut',
//                    onclick: function(d, i) {
//                        console.log("onclick", d, i);
//                    },
//                    onmouseover: function(d, i) {
//                        console.log("onmouseover", d, i);
//                    },
//                    onmouseout: function(d, i) {
//                        console.log("onmouseout", d, i);
//                    },
//                    colors: {
//                        data1: '#5969ff',
//                        data2: '#ff407b',
//                        data3: '#ff40ff'
//                    }
//                },
//                donut: {
////                    title: "Iris Petal Width"
//                }
//            });
//
//        }
        if ($('#contract_rfq_status_chart').length) {
//        alert("Bittu");
            var chart = c3.generate({
                bindto: "#contract_rfq_status_chart",
                data: {
                    columns: [
                        ['data1', 30],
                        ['data2', 120]
                    ],
                    type: 'donut',
                    onclick: function(d, i) {
                        console.log("onclick", d, i);
                    },
                    onmouseover: function(d, i) {
                        console.log("onmouseover", d, i);
                    },
                    onmouseout: function(d, i) {
                        console.log("onmouseout", d, i);
                    },
                    colors: {
                        data1: '#5969ff',
                        data2: '#ff407b'
                    }
                },
                donut: {
//                title: "Iris Petal Width"


                }


            });

        }
        if ($('#rfp_status_chart').length) {
//        alert("Bittu");
            var chart = c3.generate({
                bindto: "#rfp_status_chart",
                data: {
                    columns: [
                        ['data1', 30],
                        ['data2', 120]
                    ],
                    type: 'donut',
                    onclick: function(d, i) {
                        console.log("onclick", d, i);
                    },
                    onmouseover: function(d, i) {
                        console.log("onmouseover", d, i);
                    },
                    onmouseout: function(d, i) {
                        console.log("onmouseout", d, i);
                    },
                    colors: {
                        data1: '#5969ff',
                        data2: '#ff407b'


                    }
                },
                donut: {
//                title: "Iris Petal Width"


                }


            });

        }
        if ($('#po_chart').length) {
//        alert("Bittu");
            var x = c3.generate({
                bindto: "#po_chart",
                data: {
                    columns: [
                        ['data1', 30],
                        ['data2', 120]
                    ],
                    type: 'donut',
                    onclick: function(d, i) {
                        console.log("onclick", d, i);
                    },
                    onmouseover: function(d, i) {
                        console.log("onmouseover", d, i);
                    },
                    onmouseout: function(d, i) {
                        console.log("onmouseout", d, i);
                    },
                    colors: {
                        data1: '#5969ff',
                        data2: '#ff407b'


                    }
                },
                donut: {
//                title: "Iris Petal Width"
                }
            });

        }

    });
})(window, document, window.jQuery);

function functionPoCountList() {

    var buyerUsername = $("#buyerUsername").val();
    console.log("buyerUsername :" + buyerUsername);

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_ListPONG?initiatorid=" + buyerUsername;
    console.log("POList serviceUrl: " + serviceUrl);

    var local_dev_uat = $("#local_dev_uat").val();
    console.log("local_dev_uat: " + local_dev_uat);

    if (local_dev_uat === "dev" || local_dev_uat === "uat")
    {
        console.log("Calling Web Service...");
        $.ajax({
            type: "POST",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.log("Response: " + data);
                getPOList(data);
                $("#overlay").css("display", "none");
            }
        });
    }
    else
    {
        getPOList("");
        $("#overlay").css("display", "none");
    }
}
function getPOList(xmlPO) {

    var xmlString = XMLToString(xmlPO);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<POListOP>"
//            + "<POOutputList>"
//            + "<PONumber>PO-28-001-11</PONumber>"
//            + "<POCreationDate>2019-10-03</POCreationDate>"
//            + "<VendorName>BITTU</VendorName>"
//            + "<POStatus>Pending</POStatus>"
//            + "<VendorCode>V001</VendorCode>"
//            + "<PID>PC-0000000011-process</PID>"
//            + "<CompanyCode>0640</CompanyCode>"
//            + "<RequestType>Create</RequestType>"
//            + "<PurchaseOrderType>POT1</PurchaseOrderType>"
//            + "</POOutputList>"
//            + "<POOutputList>"
//            + "<PONumber>PO-15-001-12</PONumber>"
//            + "<POCreationDate>2019-10-04</POCreationDate>"
//            + "<VendorName>SUNNY</VendorName>"
//            + "<POStatus>Pending</POStatus>"
//            + "<VendorCode>V002</VendorCode>"
//            + "<PID>PC-0000000012-process</PID>"
//            + "<CompanyCode>0641</CompanyCode>"
//            + "<RequestType>Modify</RequestType>"
//            + "<PurchaseOrderType>POT2</PurchaseOrderType>"
//            + "</POOutputList>"
//            + "<POOutputList>"
//            + "<PONumber>PO-28-001-11</PONumber>"
//            + "<POCreationDate>2019-10-05</POCreationDate>"
//            + "<VendorName>NIKHIL</VendorName>"
//            + "<POStatus>PO Rejected</POStatus>"
//            + "<VendorCode>V003</VendorCode>"
//            + "<PID>PC-0000000013-process</PID>"
//            + "<CompanyCode>0642</CompanyCode>"
//            + "<RequestType>Delete</RequestType>"
//            + "<PurchaseOrderType>POT3</PurchaseOrderType>"
//            + "</POOutputList>"
//            + "<Message>Success</Message>"
//            + "<MainCode>0</MainCode>"
//            + "<MaterialPOCount>10</MaterialPOCount>"
//            + "<ServicePOCount>20</ServicePOCount>"
//            + "</POListOP>";

//    var xmlDoc = $.parseXML(xmlString); // Localhost

    var $xml = $(xmlDoc);

    var Message = $xml.find('Message').text();
    var MainCode = $xml.find('MainCode').text();
    var MaterialPOCount = $xml.find('MaterialPOCount').text();
    var ServicePOCount = $xml.find('ServicePOCount').text();

    console.log("Message: " + Message);
    console.log("MainCode: " + MainCode);
    console.log("MaterialPOCount: " + MaterialPOCount);
    console.log("ServicePOCount: " + ServicePOCount);

    $("#pendingPoAppMaterialCount").text(MaterialPOCount);
    $("#pendingPoAppServiceCount").text(ServicePOCount);

}
function XMLToString(oXML)
{
    //code for IE
    //    alert("in XMLToString: " + oXML);
    if (window.ActiveXObject) {
        var oString = oXML.xml;
        return oString;
    }
    // code for Chrome, Safari, Firefox, Opera, etc.
    else {
        return (new XMLSerializer()).serializeToString(oXML);
    }
}
