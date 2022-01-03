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

$(document).ready(function() {

    if ($("table.all_prlines_contract_table").length) {

        $(document).ready(function() {
            $('#all_prlines_contract_table thead tr').clone(true).appendTo('#all_prlines_contract_table thead');
            $('#all_prlines_contract_table thead tr:eq(1) th').each(function(i) {
                $('#all_prlines_contract_table thead tr:eq(0) th').addClass("table-header-color");
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

            var table = $('table.all_prlines_contract_table').DataTable({
//                "scrollY": 200,
                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'excel', title: 'Pending Service PR Lines', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'Pending Service PR Lines', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'Pending Service PR Lines', exportOptions: {columns: 'thead th:not(.noExport)'}}
                        ]
                    }
                ]
            });

            table.buttons().container()
                    .appendTo('#all_prlines_contract_table_wrapper .col-md-6:eq(0)');
        });
    }

    if ($("table.pending-prlines").length) {
        $(document).ready(function() {
            $('#pending_prlines_table thead tr').clone(true).appendTo('#pending_prlines_table thead');
            $('#pending_prlines_table thead tr:eq(1) th').each(function(i) {
                $('#pending_prlines_table thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title.trim() === '') {
                    $(this).html('');
                } else if (title === 'Reject') {
                    $(this).html('');
                } else if (title === 'Query') {
                    $(this).html('');
                } else if (title === 'PO Text') {
                    $(this).html('');
                } else {
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

            var table = $('table.pending-prlines').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'excel', title: 'Overdue RFQ Creation (PR with overdue > 5 working days)', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'Overdue RFQ Creation (PR with overdue > 5 working days)', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'Overdue RFQ Creation (PR with overdue > 5 working days)', customize: function(win)
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
            });

            table.buttons().container()
                    .appendTo('#pending_prlines_table_wrapper .col-md-6:eq(0)');
        });
    }

    if ($("table.pendingContractLine-details").length) {

        $(document).ready(function() {


            $('#pendingContractLine_pr_details thead tr').clone(true).appendTo('#pendingContractLine_pr_details thead');
            $('#pendingContractLine_pr_details thead tr:eq(1) th').each(function(i) {
                $('#pendingContractLine_pr_details thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === "")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');
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

            var table = $('table.pendingContractLine-details').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'copy', title: 'Pending PR Lines'},
                            {extend: 'excel', title: 'Pending PR Lines'},
                            {extend: 'pdf', title: 'Pending PR Lines'},
                            {extend: 'print', title: 'Pending PR Lines'}
                        ]
                    }
                ]
            });

            table.buttons().container()
                    .appendTo('#pendingContractLine_pr_details_wrapper .col-md-6:eq(0)');
        });
    }
    if ($("table.rfq-in-progress").length) {

        $(document).ready(function() {

            $('#rfq_in_progress thead tr').clone(true).appendTo('#rfq_in_progress thead');
            $('#rfq_in_progress thead tr:eq(1) th').each(function(i) {
                $('#rfq_in_progress thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === "PO Text")
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

            var table = $('table.rfq-in-progress').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'excel', title: 'RFQ in progress', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'RFQ in progress', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'RFQ in progress', exportOptions: {columns: 'thead th:not(.noExport)'}}
                        ]
                    }
                ]
            });

            table.buttons().container()
                    .appendTo('#rfq_in_progress_wrapper .col-md-6:eq(0)');
        });
    }


    if ($("table.pending-po-creation").length) {

        $(document).ready(function() {

            $('#pending_po_creation thead tr').clone(true).appendTo('#pending_po_creation thead');
            $('#pending_po_creation thead tr:eq(1) th').each(function(i) {
                $('#pending_po_creation thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');

                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });

            var table = $('table.pending-po-creation').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'copy', title: 'Pending PO Creation'},
                            {extend: 'excel', title: 'Pending PO Creation'},
                            {extend: 'pdf', title: 'Pending PO Creation'},
                            {extend: 'print', title: 'Pending PO Creation'}
                        ]
                    }
                ]
            });

            table.buttons().container()
                    .appendTo('#pending_po_creation_wrapper .col-md-6:eq(0)');
        });
    }

    if ($("table.all-pending-contractlines").length) {

        $(document).ready(function() {


            $('#all_pending_contractlines_table thead tr').clone(true).appendTo('#all_pending_contractlines_table thead');
            $('#all_pending_contractlines_table thead tr:eq(1) th').each(function(i) {
                $('#all_pending_contractlines_table thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');

                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });

            var table = $('table.all-pending-contractlines').DataTable({
                "scrollY": 200,
                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'copy', title: 'Pending PR Lines'},
                            {extend: 'excel', title: 'Pending PR Lines'},
                            {extend: 'pdf', title: 'Pending PR Lines'},
                            {extend: 'print', title: 'Pending PR Lines'}
                        ]
                    }
                ]
            });

            table.buttons().container()
                    .appendTo('#all_pending_contractlines_table_wrapper .col-md-6:eq(0)');
        });
    }


    if ($("table.rfq-class").length) {

        $(document).ready(function() {

            $('#rfq_id thead tr').clone(true).appendTo('#rfq_id thead');
            $('#rfq_id thead tr:eq(1) th').each(function(i) {
                $('#rfq_id thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === "") {
                    $(this).html("");
                } else {
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

            var table = $('table.rfq-class').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
                        buttons: [
                            {extend: 'excel', title: 'Pending PO Creation'},
                            {extend: 'pdf', title: 'Pending PO Creation'},
                            {extend: 'print', title: 'Pending PO Creation'}
                        ]
                    }
                ]

            });
//
            $('#rfq_id tbody').on('click', 'td.details-control', function() {
                console.log("click parent");
                var tr = $(this).closest('tr');
                var row = table.row(tr);
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                } else {
//                    var rfq_ids = "";
                    var rfqid = $(this).children(".rfqid").val();
                    console.log("rfqid :" + rfqid);
                    $.ajax(
                            {
                                type: "GET",
                                url: "ajaxcontroller.do",
                                async: false,
                                data:
                                        {
                                            "reqFrom": "getprbyrfqid",
                                            "rfqid": rfqid
                                        },
                                dataType: "json",
                                complete: function(responseJson)
                                {
                                    var obj = $.parseJSON(responseJson.responseText);
                                    var materialcode = "";
                                    var baselinepriceperunit = "";
                                    var currency = "";
                                    var plant = "";

                                    for (i = 0; i < obj.Data.length; i++) {
                                        materialcode = obj.Data[i].materialcode;
                                        baselinepriceperunit = obj.Data[i].baselinepriceperunit;
                                        currency = obj.Data[i].currency;
                                        plant = obj.Data[i].plant;

                                        console.log(materialcode);
                                        console.log(baselinepriceperunit);
                                        console.log(currency);
                                        console.log(plant);

//                                        row.child(format(obj)).show();
                                    }
                                    row.child(format(obj)).show();
                                }

                            });
//                    
                    // Open this row
//                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }

            });

            table.buttons().container()
                    .appendTo('#rfq_id_wrapper .col-md-6:eq(0)');
        });

        function format(d) {
//            alert("bittu");
            // `d` is the original data object for the row
            var row = '<div class="row">' +
                    '<div style="padding-left:50px;float:left;" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 table-responsive">' +
                    '<table class="table" cellpadding="5" cellspacing="0" border="0">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>Material Code</th>' +
                    '<th>baselinepriceperunit</th>' +
                    '<th>currency</th>' +
                    '<th>plant</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

            for (i = 0; i < d.Data.length; i++) {
                row += '<tr>' +
                        '<td>' + d.Data[i].materialcode + '</td>' +
                        '<td>' + d.Data[i].baselinepriceperunit + '</td>' +
                        '<td>' + d.Data[i].currency + '</td>' +
                        '<td>' + d.Data[i].plant + '</td>' +
                        '</tr>';
            }
            row += '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '</div>';
            return row;
        }

    }



    $("#overlay").css("display", "none");

    var prIdArray = [];
    var prtype;

    $("#createrfq").click(function() {
//       alert("dsfsd"); 
        location.href = "createrfpforpr.do?prlineids=" + prIdArray.toString() + "&prtype=" + prtype;
    });


    var companyCodeArr = [];
    $(".select-pr-line").click(function() {
//        alert($(this).val());

        var isPrChecked = $(this).prop("checked");
        var companycode = $(this).parent().parent().find("td").eq(2).html();
        var quantity = $(this).parent().parent().find("td").eq(12).html();
        prtype = $(this).parent().find(".prtype").val();
//        alert(prtype);
//        var prtype = 
//        alert(quantity);
//        alert(companycode);
//        alert(isChecked);

        if (quantity !== '') {
            var prId = $(this).val();
//        console.log("prId: " + prId);
            if (isPrChecked === true)
            {
//            prIdArray.push(prId);
//            console.log("prId push: " + prId);
                if (companyCodeArr.length >= 1) {
//                for (j = 0; j < companyCodeArr.length; j++) {
//                    if (companycode === companyCodeArr[j]) {
                    if (companyCodeArr.indexOf(companycode) >= 0) {
                        companyCodeArr.push(companycode);
//                    prIdArray.push(prId);
                    }
//                    } else {
//                        Lobibox.alert("error", {
//                            msg: "Company Code did not match!"
//                        });
//                        return false;
//                    }
//                }
                } else {
                    companyCodeArr.push(companycode);
                }
                prIdArray.push(prId);
            } else
            {
                var index = prIdArray.indexOf(prId);
                prIdArray.splice(index, 1);
//            console.log("prId pop: " + prId);
                var codeIndex = companyCodeArr.indexOf(companycode);
                companyCodeArr.splice(codeIndex, 1);
            }
//        alert("length :" + companyCodeArr.length);
            console.log("companyCodelength :" + companyCodeArr.length)

            console.log("length: " + prIdArray.length);
            console.log(prIdArray);

            if (prIdArray.length !== 0)
            {
                $("#createrfq").removeClass("hidden");
            } else
            {
                $("#createrfq").addClass("hidden");
            }
//        var rejectArr = [];
//        if (prIdArray.length > 1) {
//            for (i = 0; i < prIdArray.length; i++) {
////                $(".reject-pr-btn").attr("disabled", true);
////                $(".query-pr-btn").attr("disabled", true);
//                  var reject = $(this).parent().parent().find("td").eq(12).children().attr('id');
////                  var query = $(this).parent().find("td").eq(13).children().val();
//                   alert(reject);
//                $(reject).attr("disabled", true);
//            }
//        } else {
//            $(".reject-pr-btn").attr("disabled", false);
//            $(".query-pr-btn").attr("disabled", false);
//        }
        } else {
            Lobibox.alert("error", {
                msg: "Quantity not available, Please select another PR !"
            });
            return false;
        }

    });
    var prIdAndCoCodeArr = [];
    $(".select-material-pr-line").click(function() {
        var prIdAndCoCodeObj = {};

        var isPrChecked = $(this).prop("checked");

        var companycode = $(this).parent().children(".companyCode").val();
        console.log("companycode: " + companycode);

        var plantCode = $(this).parent().children(".plantCode").val();
        console.log("plantCode: " + plantCode);

        var quantity = $(this).parent().parent().find("td").eq(4).html();
        prtype = $(this).parent().find(".prtype").val();
        var tableId = $(this).parent().parent().parent().parent().prop("id");
        console.log("tableId: " + tableId);

        if (quantity !== '') {
            var prId = $(this).val();
//        console.log("prId: " + prId);
            if (isPrChecked === true)
            {
                if (companyCodeArr.length >= 1) {
                    if (companyCodeArr.indexOf(companycode) >= 0) {
                        companyCodeArr.push(companycode);
//                    prIdArray.push(prId);
                    }
                } else {
                    companyCodeArr.push(companycode);
                }

                prIdAndCoCodeObj["PrId"] = prId;
                prIdAndCoCodeObj["CoCode"] = companycode;
                prIdAndCoCodeObj["PlantCode"] = plantCode;

                prIdAndCoCodeArr.push(prIdAndCoCodeObj);

                var arePrCoCodeSame = areSame(prIdAndCoCodeArr);
                console.log("arePrCoCodeSame: " + arePrCoCodeSame);

                var arePlantCodeSame = arePlantCodeSameFunction(prIdAndCoCodeArr);
                console.log("arePlantCodeSame: " + arePlantCodeSame);

                if (arePrCoCodeSame === "No")
                {
                    $(this).prop("checked", false);
                    Lobibox.alert("error", {
                        msg: "Kindly select PR from same company code!"
                    });
                    return false;
                }
                else if (arePlantCodeSame === "No")
                {
                    $(this).prop("checked", false);
                    Lobibox.alert("error", {
                        msg: "Kindly select PR from same plant code!"
                    });
                    return false;
                }
                else
                {
                    prIdArray.push(prId);
                }

            } else
            {
                var index = prIdArray.indexOf(prId);
                prIdArray.splice(index, 1);
//            console.log("prId pop: " + prId);
                var codeIndex = companyCodeArr.indexOf(companycode);
                companyCodeArr.splice(codeIndex, 1);

                removePrFromPrIdAndCoCodeArr(prIdAndCoCodeArr, prId);
            }
//        alert("length :" + companyCodeArr.length);
            console.log("companyCodelength :" + companyCodeArr.length);

            console.log("length: " + prIdArray.length);
            console.log(prIdArray);

            if (prIdArray.length !== 0)
            {
                $("#createrfq").removeClass("hidden");
                $("#createpo").removeClass("hidden");
            } else
            {
                $("#createrfq").addClass("hidden");
                $("#createpo").addClass("hidden");
            }
        } else {
            Lobibox.alert("error", {
                msg: "Quantity not available, please select another PR !"
            });
            return false;
        }
        if (prIdArray.length !== 0)
        {
            if (tableId === 'pending_prmateriallines_table')
            {
                $("#PRService-tab-justify").css("display", "none");
            }
            else if (tableId === 'pending_prlines_table')
            {
                $("#PRMaterial-tab-justify").css("display", "none");
            }
        }
        else
        {
            $("#PRService-tab-justify").css("display", "block");
            $("#PRMaterial-tab-justify").css("display", "block");
        }
    });

    var contractIdArray = [];
    var contractType;

    $("#createcontractrfq").click(function() {
//       alert("dsfsd"); 
        location.href = "createrfqforcontract.do?contractRefId=" + contractIdArray.toString() + "&contractType=" + contractType;
    });


    $(".select-contract-line").click(function() {
//      alert("Hello");
        var isContractChecked = $(this).prop("checked");
        var contractId = $(this).val();
        contractType = $(this).parent().find(".contract-type").val();
        console.log("contractType: " + contractType);
        // alert(contractId);
        if (isContractChecked === true)
        {
            contractIdArray.push(contractId);
        } else
        {
            var index = contractIdArray.indexOf(contractId);
            contractIdArray.splice(index, 1);
        }
        console.log("length: " + contractIdArray.length);
        console.log(contractIdArray);
        if (contractIdArray.length !== 0)
        {
            $("#createcontractrfq").removeClass("hidden");
        } else
        {
            $("#createcontractrfq").addClass("hidden");
        }

    });
    $(".select-material-contract-line").click(function() {
//      alert("Hello");
        var prIdAndCoCodeObj = {};
        var isContractChecked = $(this).prop("checked");
        var contractId = $(this).val();
        contractType = $(this).parent().find(".contract-type").val();
        console.log("contractType: " + contractType);

        var companycode = $(this).parent().children(".companyCode").val();
        console.log("companycode: " + companycode);

        var plantCode = $(this).parent().children(".materialGrp").val();
        console.log("materialGrp: " + plantCode);

        var prId = $(this).val();
        // alert(contractId);
        if (isContractChecked === true)
        {
            if (companyCodeArr.length >= 1) {
                if (companyCodeArr.indexOf(companycode) >= 0) {
                    companyCodeArr.push(companycode);
//                    prIdArray.push(prId);
                }
            } else {
                companyCodeArr.push(companycode);
            }

            prIdAndCoCodeObj["PrId"] = prId;
            prIdAndCoCodeObj["CoCode"] = companycode;
            prIdAndCoCodeObj["MaterialGrp"] = plantCode;

            prIdAndCoCodeArr.push(prIdAndCoCodeObj);

            var arePrCoCodeSame = areSame(prIdAndCoCodeArr);
            console.log("arePrCoCodeSame: " + arePrCoCodeSame);

            var areMaterialGrpSame = areMaterialGrpSameFunction(prIdAndCoCodeArr);
            console.log("arePlantCodeSame: " + areMaterialGrpSame);

            if (arePrCoCodeSame === "No")
            {
                $(this).prop("checked", false);
                Lobibox.alert("error", {
                    msg: "Kindly select PR from same company code!"
                });
                return false;
            }
            else if (areMaterialGrpSame === "No")
            {
                $(this).prop("checked", false);
                Lobibox.alert("error", {
                    msg: "Kindly select PR from same material group!"
                });
                return false;
            } else {
                contractIdArray.push(contractId);
            }
        } else
        {
            var index = contractIdArray.indexOf(contractId);
            contractIdArray.splice(index, 1);
            removePrFromPrIdAndCoCodeArr(prIdAndCoCodeArr, prId);
        }
        console.log("length: " + contractIdArray.length);
        console.log(contractIdArray);
        if (contractIdArray.length !== 0)
        {
            $("#createcontractrfq").removeClass("hidden");
        } else
        {
            $("#createcontractrfq").addClass("hidden");
        }

    });


    $(".reject-pr-btn").click(function() {
//       alert("SAdas");
        var prQuantity = $(this).parent().parent().find("td").eq(0).children(".prQuantity").val();
        var remainingQuantity = $(this).parent().parent().find("td").eq(0).children(".remainingQuantity").val();
        
        if(prQuantity !== undefined) {
            prQuantity = prQuantity.toString().replaceAll(",", "");
        }
        console.log("prQuantity: " + prQuantity);
        console.log("remainingQuantity: " + remainingQuantity);

        if (Number(remainingQuantity) !== Number(prQuantity))
        {
            Lobibox.alert("error", {
                msg: "Partial quantity can not be rejected!"
            });
            return false;
        }
        else
        {
            var pid = $(this).parent().parent().find("td").eq(0).children(".procInstId").val();
            var linkId = $(this).parent().parent().find("td").eq(0).children(".linkIdClass").val();
            var prCreator = $(this).parent().parent().find("td").eq(0).children(".prCreator").val();
            var prCreatorEmailId = $(this).parent().parent().find("td").eq(0).children(".prCreatorEmailId").val();
            var prNumber = $(this).parent().parent().find("td").eq(1).text();

            console.log("prNumber: " + prNumber);

            $("#wiNumber").val(pid);
            $("#linkId").val(linkId);
            $("#rejectreason").val("Select");
            $("#rejectto").val(prCreator);
            $("#prNumber").val(prNumber);
            $("#prCreatorEmailId").val(prCreatorEmailId);

            $("#rejectprlinemodal").modal("show");
        }
    });

    $(".query-pr-btn").click(function() {
//        alert("sfas");
        var pr_id = $(this).parent().parent().find("td").eq(0).children().val();

        //Girivasu
        var pid = $(this).parent().parent().find("td").eq(0).children(".procInstId").val();
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkIdClass").val();
        var qPrNumber = $(this).parent().parent().find("td").eq(1).text();

        console.log("qPrNumber: " + qPrNumber);

        $("#qwiNumber").val(pid);
        $("#qlinkId").val(linkId);
        $("#qPrNumber").val(qPrNumber);

        $("#queryreason").val("Select");
        $("#queryraisedto").val("Select");
        $("#querymailaddress").val("");

        $("#queryprlinemodal").modal("show");
    });

    $(".reject-contract-btn").click(function() {
//        alert("sfas");
        $("#rejectcontractmodal").modal("show");
    });
    $(".query-contract-btn").click(function() {
//        alert("sfas");
        $("#querycontractmodal").modal("show");
    });

    if ($("table.all-pending-contractlines").length) {

        $(document).ready(function() {
//
//
//            $('#all_pending_contractlines_table thead tr').clone(true).appendTo('#all_pending_contractlines_table thead');
//            $('#all_pending_contractlines_table thead tr:eq(1) th').each(function(i) {
//                $('#all_pending_contractlines_table thead tr:eq(0) th').addClass("table-header-color");
//                var title = $(this).text();
//                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');
//
//                $('input', this).on('keyup change', function() {
//                    if (table.column(i).search() !== this.value) {
//                        table
//                                .column(i)
//                                .search(this.value)
//                                .draw();
//                    }
//                });
//            });
//
//            var table = $('table.all-pending-contractlines').DataTable({
//                lengthChange: false,
//                orderCellsTop: true,
//                buttons: [
//                    {
//                        extend: 'collection',
//                        text: 'Export',
////                        buttons: ['copy', 'excel', 'pdf', 'print']
//                        buttons: [
//                            {extend: 'copy', title: 'Pending PR Lines'},
//                            {extend: 'excel', title: 'Pending PR Lines'},
//                            {extend: 'pdf', title: 'Pending PR Lines'},
//                            {extend: 'print', title: 'Pending PR Lines'}
//                        ]
//                    }
//                ]
//            });
//
//            table.buttons().container()
//                    .appendTo('#all_pending_contractlines_table_wrapper .col-md-6:eq(0)');
        });
    }



    if ($("table.pendingMaterialContractLine-details").length) {
        $(document).ready(function() {

            $('#pendingMaterialContractLine_pr_details thead tr').clone(true).appendTo('#pendingMaterialContractLine_pr_details thead');
            $('#pendingMaterialContractLine_pr_details thead tr:eq(1) th').each(function(i) {
                $('#pendingMaterialContractLine_pr_details thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === "")
                {
                    $(this).html('');
                }
                else
                {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');
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

            var table = $('table.pendingMaterialContractLine-details').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'copy', title: 'Pending PR Lines'},
                            {extend: 'excel', title: 'Pending PR Lines'},
                            {extend: 'pdf', title: 'Pending PR Lines'},
                            {extend: 'print', title: 'Pending PR Lines'}
                        ]
                    }
                ]
            });

            table.buttons().container()
                    .appendTo('#pendingMaterialContractLine_pr_details_wrapper .col-md-6:eq(0)');

        });


    }


    if ($("table.pending-prmateriallines").length) {

        $(document).ready(function() {

            $('#pending_prmateriallines_table thead tr').clone(true).appendTo('#pending_prmateriallines_table thead');
            $('#pending_prmateriallines_table thead tr:eq(1) th').each(function(i) {
                $('#pending_prmateriallines_table thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
//                alert(title);
                if (title.trim() === '') {
                    $(this).html('');
                } else if (title === 'Reject') {
                    $(this).html('');
                } else if (title === 'Query') {
                    $(this).html('');
                } else if (title === 'PO Text') {
                    $(this).html('');
                } else {
                    $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                }
//                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');

                $('input', this).on('keyup change', function() {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });

            var table = $('table.pending-prmateriallines').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'excel', title: 'Pending Material PR Lines', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'pdf', title: 'Pending Material PR Lines', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                            {extend: 'print', title: 'Pending Material PR Lines', customize: function(win)
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
            });

            table.buttons().container()
                    .appendTo('#pending_prmateriallines_table_wrapper .col-md-6:eq(0)');
        });
    }
    $(".pending_service_prlines").click(function() {
//       alert("Hello");
        if ($(this).prop("checked") === true) {
            $(".select-pr-line").prop("checked", true);
            $("#createrfq").removeClass("hidden");
//            var isChecked = $(this).prop("checked");
            $("#pending_prlines_table").find("tbody tr").each(function() {
                var pr_id = $(this).find("td").eq(0).children(".selec-servicet-pr-line").val();
                prIdArray.push(pr_id);
//              alert(pr_id);
            });
            prtype = "Service";
//           alert("prIdArray length :" + prIdArray.length);
        } else {
            $(".select-pr-line").prop("checked", false);
            $("#createrfq").addClass("hidden");
            prIdArray.splice(0, prIdArray.length);
        }
    });
    $(".pending_material_prlines").click(function() {
//       alert("Hello");
        if ($(this).prop("checked") === true) {
            $(".select-material-pr-line").prop("checked", true);
            $("#createrfq").removeClass("hidden");
//            var isChecked = $(this).prop("checked");
            $("#pending_prmateriallines_table").find("tbody tr").each(function() {
                var pr_id = $(this).find("td").eq(0).children(".select-material-pr-line").val();
                prIdArray.push(pr_id);
//              alert(pr_id);
            });
            prtype = "Material";
//           alert("prIdArray length :" + prIdArray.length);
        } else {
            $(".select-pr-line").prop("checked", false);
            $("#createrfq").addClass("hidden");
            prIdArray.splice(0, prIdArray.length);
        }
    });
    $(".pending_service_contractlines").click(function() {
//       alert("Hello");
        if ($(this).prop("checked") === true) {
            $(".select-contract-line").prop("checked", true);
            $("#createcontractrfq").removeClass("hidden");
//            var isChecked = $(this).prop("checked");
            $("#pendingContractLine_pr_details").find("tbody tr").each(function() {
                var pr_id = $(this).find("td").eq(0).children(".select-contract-line").val();
                contractIdArray.push(pr_id);
//              alert(pr_id);
            });
//           alert("contractIdArray length :" + contractIdArray.length);
        } else {
            $(".select-contract-line").prop("checked", false);
            $("#createcontractrfq").addClass("hidden");
            contractIdArray.splice(0, contractIdArray.length);
        }
    });
    $(".pending_material_contractlines").click(function() {
//       alert("Hello");
        if ($(this).prop("checked") === true) {
            $(".select-material-contract-line").prop("checked", true);
            $("#createcontractrfq").removeClass("hidden");
//            var isChecked = $(this).prop("checked");
            $("#pendingMaterialContractLine_pr_details").find("tbody tr").each(function() {
                var pr_id = $(this).find("td").eq(0).children(".select-material-contract-line").val();
                contractIdArray.push(pr_id);
//              alert(pr_id);
            });
//           alert("contractIdArray length :" + contractIdArray.length);
        } else {
            $(".select-material-contract-line").prop("checked", false);
            $("#createcontractrfq").addClass("hidden");
            contractIdArray.splice(0, contractIdArray.length);
        }
    });
    $("#rejectprlinemodaltn").click(function() {

        var reason = $("#rejectreason").val();
        var rejectto = $("#rejectto").val();

        if (reason === "Select" || reason === "")
        {
            Lobibox.alert("error", {
                msg: "Please Select Reject Reason!."
            });

            return false;
        }

        Lobibox.confirm({
            msg: "Are you sure you want to reject PR?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#rejectprlinemodal").modal("hide");
                    $("#overlay").css("display", "block");
                    $("#rejectprform").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });


// $("#rejectprform").submit();
    });


//Girivasu
    $("#queryprlinemodaltn").click(function() {

        var reason = $("#queryreason").val();
        var queryto = $("#queryraisedto").val();
        var queryEmail = $("#querymailaddress").val();

        if (reason === "Select" || reason === "")
        {
            Lobibox.alert("error", {
                msg: "Please Select Query Reason!"
            });

            return false;
        }
        if (queryto === "Select" || queryto === "")
        {
            Lobibox.alert("error", {
                msg: "Please Select Query Raised To!"
            });

            return false;
        }
        if (queryEmail === "")
        {
            Lobibox.alert("error", {
                msg: "Please Enter Query Mail Address!"
            });

            return false;
        }

        Lobibox.confirm({
            msg: "Are you sure you want to query the PR?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#queryprlinemodal").modal("hide");
                    $("#overlay").css("display", "block");
                    $("#queryprform").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });


// $("#rejectprform").submit();
    });

//Girivasu
    $("#queryraisedto").change(function() {

        var queryUser = $("#queryraisedto option:selected").val();

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data:
                    {
                        "reqFrom": "getUserEmailById",
                        "UserId": queryUser
                    },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);

                console.log("UserEmail-->" + obj.Data.EMAILID);
                var emailid = obj.Data.EMAILID;
                $("#querymailaddress").val(emailid);

            }
        });


    });
    $(".longTextClass").click(function() {
//        alert("dsf");
//        $("#filterWorloadReportForm").trigger("reset");

        $("#longTextModal").modal("show");
        var longtext = $(this).parent().parent().find("td").eq(5).children(".longTextHiddenFiled").val();
//        alert(longtext);
        $('div.longtext').text(longtext);
//        alert(longtext);
    });

    $("#createpo").click(function() {
//       alert("dsfsd"); 
        $("#overlay").css("display", "block");
        var reqFrom = "byprids";
//        location.href = "createpo.do?prids=" + prIdArray.toString() + "&reqFrom=" + reqFrom;

        $("#prids").val(prIdArray.toString());
        $("#reqFrom").val(reqFrom);

        $("#pendingPrtoPoForm").submit();
    });

    $("#rfq_id").on("click", ".pending_PO_Creation_Checkbox_td", function() {
        var isPrChecked = $(this).prop("checked");
        var prId = $(this).val();
//        alert(prId);
        if (isPrChecked === true) {
            prIdArray.push(prId);
        } else {
            var index = prIdArray.indexOf(prId);
            prIdArray.splice(index, 1);
        }
        console.log("PR length: " + prIdArray.length);
        if (prIdArray.length !== 0)
        {
            $("#createpo").removeClass("hidden");
        } else
        {
            $("#createpo").addClass("hidden");
        }
    });
    $("#rfq_id").on("click", ".pending_PO_Creation_Checkbox_th", function() {
        if ($(this).prop("checked") === true) {
            $(".pending_PO_Creation_Checkbox_td").prop("checked", true);
            $("#createpo").removeClass("hidden");
//            var isChecked = $(this).prop("checked");
            $("#rfq_id").find("tbody tr").each(function() {
                var pr_id = $(this).find("td").eq(0).children(".pending_PO_Creation_Checkbox_td").val();
                prIdArray.push(pr_id);
//              alert(pr_id);
            });
//            prtype = "Material";
//           alert("prIdArray length :" + prIdArray.length);
        } else {
            $(".pending_PO_Creation_Checkbox_td").prop("checked", false);
            $("#createpo").addClass("hidden");
            prIdArray.splice(0, prIdArray.length);
        }
    });

    $(".viewPrDoc").click(function() {
        console.log("viewPrDoc======================");
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkIdClass").val();
        var procInstId = $(this).parent().parent().find("td").eq(0).children(".procInstId").val();

        console.log("linkId: " + linkId);
        console.log("procInstId: " + procInstId);

        var ViewPrDoc_IP = $("#ViewPrDoc_IP").val();
        console.log("ViewPrDoc_IP: " + ViewPrDoc_IP);

        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "viewPrDoc",
                "name": procInstId
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("jsonArr len: " + jsonArr.length);
                if (jsonArr.length === 0)
                {
                    console.log("No Folder Index Found============");
                    Lobibox.alert("error", {
                        msg: "No document attached to this line item!"
                    });
                }
                else
                {
                    var folderIndex = "";
                    for (var i = 0; i < jsonArr.length; i++)
                    {
                        folderIndex = jsonArr[i];
                    }
                    console.log("folderIndex: " + folderIndex);

                    var url = ViewPrDoc_IP + "/omnidocs/integration/foldView/viewFoldList.jsp?Application=PRandRFQDocuments&S=S&FolderId=" + folderIndex;
                    console.log("url :" + url);

                    window.open(url, "_blank");
                }
            }
        });
    });

    $(".viewPrLineItemDoc").click(function() {
        console.log("viewPrLineItemDoc================");
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkIdClass").val();
        var procInstId = $(this).parent().parent().find("td").eq(0).children(".procInstId").val();

        console.log("linkId: " + linkId);
        console.log("procInstId: " + procInstId);

        var ViewPrDoc_IP = $("#ViewPrDoc_IP").val();
        console.log("ViewPrDoc_IP: " + ViewPrDoc_IP);

        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "viewPrLineItemDoc",
                "linkId": linkId,
                "procInstId": procInstId
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("jsonArr len: " + jsonArr.length);
                if (jsonArr.length === 0)
                {
                    console.log("No Folder Index Found============");
                    Lobibox.alert("error", {
                        msg: "No document attached to this line item!"
                    });
                }
                else
                {
                    var folderIndex = "";
                    for (var i = 0; i < jsonArr.length; i++)
                    {
                        folderIndex = jsonArr[i];
                    }
                    console.log("folderIndex: " + folderIndex);

                    var url = ViewPrDoc_IP + "/omnidocs/integration/foldView/viewFoldList.jsp?Application=PRandRFQDocuments&S=S&FolderId=" + folderIndex;
                    console.log("url :" + url);

                    window.open(url, "_blank");
                }
            }
        });
    });
});

if ($("table.pending_po_creation_table").length) {
    $(document).ready(function() {
        $('#pending_po_creation_table thead tr').clone(true).appendTo('#pending_po_creation_table thead');
        $('#pending_po_creation_table thead tr:eq(1) th').each(function(i) {
            $('#pending_po_creation_table thead tr:eq(0) th').addClass("table-header-color");
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

        var table = $('table.pending_po_creation_table').DataTable({
//                "scrollY": 200,
            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'Pending PO Creation', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'Pending PO Creation', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'Pending PO Creation', exportOptions: {columns: 'thead th:not(.noExport)'}}
                    ]
                }
            ]
        });

        table.buttons().container()
                .appendTo('#pending_po_creation_table_wrapper .col-md-6:eq(0)');
    });
}
if ($("table.po_creation_table").length) {
    $(document).ready(function() {
        $('#po_creation_table thead tr').clone(true).appendTo('#po_creation_table thead');
        $('#po_creation_table thead tr:eq(1) th').each(function(i) {
            $('#po_creation_table thead tr:eq(0) th').addClass("table-header-color");
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

        var table = $('table.po_creation_table').DataTable({
//                "scrollY": 200,
            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'PO Created', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'PO Created', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'PO Created', exportOptions: {columns: 'thead th:not(.noExport)'}}
                    ]
                }
            ]
        });

        table.buttons().container()
                .appendTo('#po_creation_table_wrapper .col-md-6:eq(0)');
    });
}

if ($("table.pending-rfqClosure").length) {
    $(document).ready(function() {
        $('#pending_rfqClosure_Id thead tr').clone(true).appendTo('#pending_rfqClosure_Id thead');
        $('#pending_rfqClosure_Id thead tr:eq(1) th').each(function(i) {
            $('#pending_rfqClosure_Id thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title.trim() === '') {
                $(this).html('');
            } else if (title === 'Reject') {
                $(this).html('');
            } else if (title === 'Query') {
                $(this).html('');
            } else if (title === 'PO Text') {
                $(this).html('');
            } else {
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

        var table = $('table.pending-rfqClosure').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'Pending RFQ Closure PRs with RFQ created', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'Pending RFQ Closure PRs with RFQ created', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'Pending RFQ Closure PRs with RFQ created', customize: function(win)
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
        });
        table.buttons().container()
                .appendTo('#pending_rfqClosure_Id_wrapper .col-md-6:eq(0)');
    });
}

if ($("table.vendor_Finalized_class").length) {
    $(document).ready(function() {
        $('#vendor_Finalized_Id thead tr').clone(true).appendTo('#vendor_Finalized_Id thead');
        $('#vendor_Finalized_Id thead tr:eq(1) th').each(function(i) {
            $('#vendor_Finalized_Id thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title.trim() === '') {
                $(this).html('');
            } else if (title === 'Reject') {
                $(this).html('');
            } else if (title === 'Query') {
                $(this).html('');
            } else if (title === 'PO Text') {
                $(this).html('');
            } else {
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

        var table = $('table.vendor_Finalized_class').DataTable({
//                "scrollY": 200,
//                "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'PRs with PO created on hold/rejected/cancelled Finalization', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'PRs with PO created on hold/rejected/cancelled Finalization', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'PRs with PO created on hold/rejected/cancelled Finalization', customize: function(win)
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
        });
        table.buttons().container()
                .appendTo('#vendor_Finalized_Id_wrapper .col-md-6:eq(0)');
    });
}


function areSame(prIdAndCoCodeArr)
{
    console.log("prIdAndCoCodeArr.length: " + prIdAndCoCodeArr.length);
    var areSame = "Yes";
    var tempIndex = -1;
    if (prIdAndCoCodeArr.length > 0)
    {
        var prIdAndCoCodeObj = prIdAndCoCodeArr[0];
        for (var i = 1; i < prIdAndCoCodeArr.length; i++)
        {
            var tempObj = prIdAndCoCodeArr[i];
            if (tempObj["CoCode"] !== prIdAndCoCodeObj["CoCode"])
            {
                areSame = "No";
                tempIndex = i;
            }
        }
        if (tempIndex !== -1)
        {
            prIdAndCoCodeArr.splice(tempIndex, 1);
        }
    }
    return areSame;
}
function arePlantCodeSameFunction(prIdAndCoCodeArr)
{
    console.log("prIdAndCoCodeArr.length: " + prIdAndCoCodeArr.length);
    var areSame = "Yes";
    var tempIndex = -1;
    if (prIdAndCoCodeArr.length > 0)
    {
        var prIdAndCoCodeObj = prIdAndCoCodeArr[0];
        for (var i = 1; i < prIdAndCoCodeArr.length; i++)
        {
            var tempObj = prIdAndCoCodeArr[i];
            if (tempObj["PlantCode"] !== prIdAndCoCodeObj["PlantCode"])
            {
                areSame = "No";
                tempIndex = i;
            }
        }
        if (tempIndex !== -1)
        {
            prIdAndCoCodeArr.splice(tempIndex, 1);
        }
    }
    return areSame;
}
function removePrFromPrIdAndCoCodeArr(prIdAndCoCodeArr, prId)
{
    console.log("prIdAndCoCodeArr.length before remove: " + prIdAndCoCodeArr.length);
    var tempIndex = -1;
    if (prIdAndCoCodeArr.length > 0)
    {
        for (var i = 0; i < prIdAndCoCodeArr.length; i++)
        {
            var tempObj = prIdAndCoCodeArr[i];
            if (tempObj["PrId"] === prId)
            {
                tempIndex = i;
            }
        }
        if (tempIndex !== -1)
        {
            prIdAndCoCodeArr.splice(tempIndex, 1);
        }
    }
    console.log("prIdAndCoCodeArr.length after remove: " + prIdAndCoCodeArr.length);
}

//Girivasu
function areMaterialGrpSameFunction(MaterialGrpArr)
{
    console.log("MaterialGrpArr.length: " + MaterialGrpArr.length);
    var areSame = "Yes";
    var tempIndex = -1;
    if (MaterialGrpArr.length > 0)
    {
        var MaterialGrpArrObj = MaterialGrpArr[0];
        for (var i = 1; i < MaterialGrpArr.length; i++)
        {
            var tempObj = MaterialGrpArr[i];
            if (tempObj["MaterialGrp"] !== MaterialGrpArrObj["MaterialGrp"])
            {
                areSame = "No";
                tempIndex = i;
            }
        }
        if (tempIndex !== -1)
        {
            MaterialGrpArr.splice(tempIndex, 1);
        }
    }
    return areSame;
}
//Girivasu

