$(function() {
    (function() {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome',
            soundPath: 'assets/vendor/parsley/sounds/', // The folder path where sounds are located
            soundExt: '.ogg' // Default extension for all sounds
        });

        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            title: true, // Title of notification. If you do not include the title in options it will automatically takes its value 
            //from Lobibox.notify.OPTIONS object depending of the type of the notifications or set custom string. Set this false to disable title
            size: 'normal', // normal, mini, large
            soundPath: 'assets/vendor/lobibox/sounds/', // The folder path where sounds are located
            soundExt: '.ogg', // Default extension for all sounds
            showClass: 'fadeInDown', // Show animation class.
            hideClass: 'zoomOut', // Hide animation class.
            icon: true, // Icon of notification. Leave as is for default icon or set custom string
            msg: '', // Message of notification
            img: null, // Image source string
            closable: true, // Make notifications closable
            hideCloseButton: false, // Notification may be closable but you can hide close button and it will be closed by clicking on notification itsef
            delay: 5000, // Hide notification after this time (in miliseconds)
            delayIndicator: true, // Show timer indicator
            closeOnClick: true, // Close notifications by clicking on them
            width: 400, // Width of notification box
            sound: true, // Sound of notification. Set this false to disable sound. Leave as is for default sound or set custom soud path
            // Place to show notification. Available options: "top left", "top right", "bottom left", "bottom right", "center top", "center bottom"
            // It can also be object {left: number, top: number} to position notification at any place
            position: "bottom right",
            iconSource: 'fontAwesome', // "bootstrap" or "fontAwesome" the library which will be used for icons
            rounded: false, // Whether to make notification corners rounded
            messageHeight: 60, // Notification message maximum height. This is not for notification itself, this is for <code>.lobibox-notify-msg</code>
            pauseDelayOnHover: true, // When you mouse over on notification delay (if it is enabled) will be paused.
            onClickUrl: null, // The url which will be opened when notification is clicked
            showAfterPrevious: false, // Set this to true if you want notification not to be shown until previous notification is closed. This is useful for notification queues
            continueDelayOnInactiveTab: true, // Continue delay when browser tab is inactive
            // Events
            onClick: null
        });
    })();
});

//if ($("table.addVendorsDetailsModalTable_Id").length) {
//
//    $(document).ready(function() {
//
//        $('#addVendorsDetailsModalTableId thead tr').clone(true).appendTo('#addVendorsDetailsModalTableId thead');
//        $('#addVendorsDetailsModalTableId thead tr:eq(1) th').each(function(i) {
//            $('#addVendorsDetailsModalTableId thead tr:eq(0) th').addClass("table-header-color");
//            var title = $(this).text();
//            if (title === '') {
//                $(this).html('');
//            } else {
//                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
//            }
//            $('input', this).on('keyup change', function() {
//                if (table.column(i).search() !== this.value) {
//                    table
//                            .column(i)
//                            .search(this.value)
//                            .draw();
//                }
//            });
//        });
//
//        var table = $('table.addVendorsDetailsModalTable_Id').DataTable({
////            "scrollY": 200,
////            "scrollX": true,
//            lengthChange: false,
//            orderCellsTop: true,
//            fixedHeader: true,
//            buttons: [
//                {
//                    extend: 'collection',
//                    text: 'Export',
//                    buttons: [
//                        {extend: 'excel', title: 'Vendor Details', exportOptions: {columns: 'thead th:not(.noExport)'}},
//                        {extend: 'pdf', title: 'Vendor Details', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
//                        {extend: 'print', title: 'Vendor Details', customize: function(win)
//                            {
//                                var css = '@page { size: landscape; }',
//                                        head = win.document.head || win.document.getElementsByTagName('head')[0],
//                                        style = win.document.createElement('style');
//                                style.type = 'text/css';
//                                style.media = 'print';
//                                if (style.styleSheet)
//                                {
//                                    style.styleSheet.cssText = css;
//                                }
//                                else
//                                {
//                                    style.appendChild(win.document.createTextNode(css));
//                                }
//                                head.appendChild(style);
//                            }, exportOptions: {
//                                columns: "thead th:not(.noExport)"
//                            }
//                        }
//                    ]
//                }
//            ]
//        });
//
//        table.buttons().container()
//                .appendTo('#addVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');
//
//    });
//}

//if ($("table.line_items_data_table").length) {
//
//    $(document).ready(function() {
//
//        $('#line_items_data_table thead tr').clone(true).appendTo('#line_items_data_table thead');
//        $('#line_items_data_table thead tr:eq(1) th').each(function(i) {
//            $('#line_items_data_table thead tr:eq(0) th').addClass("table-header-color");
//            var title = $(this).text();
//            if (title === 'Attachments') {
//                $(this).html('');
//            } else {
//                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');
//            }
//            $('input', this).on('keyup change', function() {
//                if (table.column(i).search() !== this.value) {
//                    table
//                            .column(i)
//                            .search(this.value)
//                            .draw();
//                }
//            });
//        });
//
//        var table = $('table.line_items_data_table').DataTable({
////            "scrollY": 200,
//            "scrollX": true,
//            lengthChange: false,
//            orderCellsTop: true,
//            fixedHeader: true
////            buttons: [
////                {
////                    extend: 'collection',
////                    text: 'Export',
////                    buttons: ['copy', 'excel', 'pdf', 'print', 'colvis']
////                }
////            ]
//        });
//
//        table.buttons().container()
//                .appendTo('#line_items_data_table_wrapper .col-md-6:eq(0)');
//
//    });
//}

if ($("table.rfpdetailstable").length) {

    $(document).ready(function() {

        $('#rfpdetailstable thead tr').clone(true).appendTo('#rfpdetailstable thead');
        $('#rfpdetailstable thead tr:eq(1) th').each(function(i) {
            $('#rfpdetailstable thead tr:eq(0) th').addClass("table-header-color");
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

        var table = $('table.rfpdetailstable').DataTable({
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'RFP Details'},
                        {extend: 'pdf', title: 'RFP Details'},
                        {extend: 'print', title: 'RFP Details'}
                    ]
                }
            ]
        });

        table.buttons().container()
                .appendTo('#rfpdetailstable_wrapper .col-md-6:eq(0)');

    });
}

$(document).ready(function() {
    var lobiboxNotifyAlert = null;
    if ($("table.mytask").length) {

        $(document).ready(function() {

            $('#mytask thead tr').clone(true).appendTo('#mytask thead');
            $('#mytask thead tr:eq(1) th').each(function(i) {
                $('#mytask thead tr:eq(0) th').addClass("table-header-color");
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

            var table = $('table.mytask').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
                        buttons: [
                            {extend: 'excel', title: 'MyTask'},
                            {extend: 'pdf', title: 'MyTask'},
                            {extend: 'print', title: 'MyTask'}
                        ]
                    }
                ],
                "aoColumnDefs": [
                    {"sType": "date-uk2", "aTargets": [3, 4]}
                ]
            });

            table.buttons().container()
                    .appendTo('#mytask_wrapper .col-md-6:eq(0)');

//            table.columns().every(function() {
//                var that = this;
//
//                $('input', this.footer()).on('keyup change', function() {
//                    if (that.search() !== this.value)
//                    {
//                        that.search(this.value).draw();
//                    }
//                });
//            });
        });
    }
    if ($("table.mytaskforcontract").length) {

        $(document).ready(function() {
            $('#mytaskforcontract thead tr').clone(true).appendTo('#mytaskforcontract thead');
            $('#mytaskforcontract thead tr:eq(1) th').each(function(i) {
                $('#mytaskforcontract thead tr:eq(0) th').addClass("table-header-color");
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

            var table = $('table.mytaskforcontract').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'copy', title: 'MyTask'},
                            {extend: 'excel', title: 'MyTask'},
                            {extend: 'pdf', title: 'MyTask'},
                            {extend: 'print', title: 'MyTask'}
                        ]
                    }
                ]
            });

            table.buttons().container()
                    .appendTo('#mytaskforcontract_wrapper .col-md-6:eq(0)');

        });
    }

    $("#overlay").css("display", "none");


    $(".finish-btn").click(function() {

//        $("#overlay").css("display", "block");
//       alert('Finished'); 
//       $("#basicdetailsform").submit();

        var rfq_operation = $("#rfq_operation").val();
//        alert(rfq_operation);

        if (rfq_operation === "create")
        {
//            $("#ro_vendorname").val($("#vendorname").val());
            $("#ro_deliveryterms").val($("#deliveryterms").val());
            $("#ro_paymentterms").val($("#paymentterms").val());
            $("#ro_rfqvaliduntil").val($("#rfqvaliduntil").val());
            $("#ro_expecteddeliverydate").val($("#expecteddeliverydate").val());

            console.log("AutoSendPO :" + $("#AutoSendPO").val());
            console.log("NotifyVendor :" + $("#NotifyVendor").val());
            console.log("PORecipients1" + $("#PORecipients1").val());
            console.log("PORecipients2" + $("#PORecipients2").val());
            console.log("selectparmeters :" + $("#selectparameters").val());

            $("#ro_AutoSendPO").val($("#AutoSendPO").prop("checked"));
            $("#ro_NotifyVendor").val($("#NotifyVendor").prop("checked"));
            $("#ro_VendorRecipients").val($("#VendorRecipients").val());
            $("#ro_PORecipients1").val($("#PORecipients1").prop("checked"));
            $("#ro_InternalRecipients").val($("#InternalRecipients").val());
            $("#ro_PORecipients2").val($("#PORecipients2").prop("checked"));
            $("#ro_comment").val($("#comment").val());
            $("#ro_selectparameters").val($("#selectparameters").val());



            var line_items_data_table = $("#line_items_data_table tbody");

            var pr_ids = "";
            var pr_quantity = "";
            var pr_att_temp_ids = "";
//            var pr_baseline_price = "";
//            var termstosuppler = "";
            var notestosuppler = "";

            line_items_data_table.find("tr").each(function() {
                var tds = $(this).find("td");
                var qty = removeCommaInNumber($(this).find("td").eq(9).children(".pr-line-item-qty").val());
                var pr_id = $(this).find("td").eq(9).children(".pr-id").val();
                var pr_att_temp_id = $(this).find("td").eq(9).children(".pr-att-temp").val();
//                var baseline_price = $(this).find("td").eq(12).children().val();
//                var pr_termstosupplier = $(this).find("td").eq(20).children(".termsToSuppler").val();
                var pr_notesToSuppler = $(this).find("td").eq(17).children(".notesToSuppler").val();
//                alert(pr_termstosupplier);


                pr_ids = pr_ids + pr_id + ",";
                pr_quantity = pr_quantity + qty + ",";
                pr_att_temp_ids = pr_att_temp_ids + pr_att_temp_id + ",";
//                pr_baseline_price = pr_baseline_price + baseline_price + "#";
//                termstosuppler = termstosuppler + pr_termstosupplier + ",";
                notestosuppler = notestosuppler + pr_notesToSuppler + ",";

//                console.log("termstosuppler :" + termstosuppler);
//                console.log("notestosuppler :" + notestosuppler);
//                
//                $("#ro_termstosuppler").val(termstosuppler);
                $("#ro_notestosuppler").val(notestosuppler);

            });

//        alert(pr_ids);
//        alert(pr_quantity);
//        alert(pr_baseline_price);

            $("#pr_ids").val(pr_ids);
            $("#pr_quantity").val(pr_quantity);
            $("#pr_att_temp_ids").val(pr_att_temp_ids);
            $("#ro_notestosuppler").val(notestosuppler);

//                  var rfq_operation = $('#rfq_operation').val();
//                if (rfq_operation === 'create') {

//            var vendor = $("#ro_vendorname").val();
////            alert(vendor);
//            if (vendor === '') {
//                Lobibox.alert("error", {
//                    msg: "Please select the vendor!"
//                });
//                return false;
//            }
//            var contactpersonetelno = $("#contactpersonetelno").val();
//            var contactpersoneemail = $("#contactpersoneemail").val();
//            if (contactpersonetelno === '' && contactpersoneemail === '') {
//                $("#parsley-id-5").addClass("parsley-errors-list");
//                $("#parsley-id-7").addClass("parsley-errors-list");
//                $("#parsley_digits").text("This value is required.");
//                $("#parsley_email").text("This value is required.");
//                Lobibox.alert("error", {
//                    msg: "Please enter the required fields!"
//                });
//                return false;
//            } else
//            if (contactpersonetelno === '') {
//                $("#parsley-id-5").addClass("parsley-errors-list");
//                $("#parsley_digits").text("This value is required.");
//                Lobibox.alert("error", {
//                    msg: "Please enter the contact number!"
//                });
//                return false;
//            } else
//            if (contactpersoneemail === '') {
//                $("#parsley-id-7").addClass("parsley-errors-list");
//                $("#parsley_email").text("This value is required.");
////                $("#parsley_required_email").text("This value is required.");
//                Lobibox.alert("error", {
//                    msg: "Please enter the email id!"
//                });
//                return false;
//            }
//                }
//            var AutoSendPO = $("#AutoSendPO").prop("checked")
////            alert(AutoSendPO);
//            var NotifyVendor = $("#NotifyVendor").prop("checked")
//            var VendorRecipients = $("VendorRecipients").val();
////            alert(VendorRecipients);
//            var InternalRecipients = $("#InternalRecipients").val();
//            var comment = $("#comment").val();

//            var AutoSendPO = $("#AutoSendPO").prop("checked");
//            var NotifyVendor = $("#NotifyVendor").prop("checked");
            var VendorRecipients = $("#VendorRecipients").val();
//            alert(VendorRecipients);
            var InternalRecipients = $("#InternalRecipients").val();
//            alert(InternalRecipients);
            var comment = $("#comment").val();
//             alert(comment);
//
//            if (VendorRecipients.toString().trim() === "" && InternalRecipients.toString().trim() === "" && comment.toString().trim() === "") {
////                $("#parsley-id-17").addClass("parsley-errors-list");
////                $("#parsley_autosendpo").text("This value is required.");
////                $("#parsley-id-19").addClass("parsley-errors-list");
////                $("#parsley_notifyvendor").text("This value is required.");
//                $("#parsley-id-21").addClass("parsley-errors-list");
//                $("#parsley_vendorrecipent").text("This value is required.");
//                $("#parsley-id-23").addClass("parsley-errors-list");
//                $("#parsley_internalrecipent").text("This value is required.");
//                $("#parsley-id-25").addClass("parsley-errors-list");
//                $("#parsley_comment").text("This value is required.");
//                return false;
//            }
//            if (VendorRecipients.toString().trim() === "" || InternalRecipients.toString().trim() === "" || comment.toString().trim() === "") {
//                if (VendorRecipients.toString().trim() === "") {
//                    $("#parsley-id-21").addClass("parsley-errors-list");
//                    $("#parsley_vendorrecipent").text("This value is required.");
//                }
//                if (InternalRecipients.toString().trim() === "") {
//                    $("#parsley-id-23").addClass("parsley-errors-list");
//                    $("#parsley_internalrecipent").text("This value is required.");
//                }
//                if (comment.toString().trim() === "") {
//                    $("#parsley-id-25").addClass("parsley-errors-list");
//                    $("#parsley_comment").text("This value is required.");
//                }
//                
//                    return false;
//            }

            Lobibox.confirm({
                msg: "Are you sure you want to create RFQ?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#rfqdataform").submit();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });

        }
        else if (rfq_operation === "update")
        {
            var deliveryterms = $("#deliveryterms").val();
            var paymentterms = $("#paymentterms").val();
//            var rfqvaliduntil = $("rfqvaliduntil").val();
            var expecteddeliverydate = $("#expectedDeliveryDate").val();
            var rfqvaliduntil = $("#rfqvaliduntil").val();

            $("#ro_action").val($("#action").val());
            $("#ro_rfqvaliduntil").val(rfqvaliduntil);
            $("#ro_deliveryterms").val(deliveryterms);
            $("#ro_paymentterms").val(paymentterms);
            $("#ro_expecteddeliverdate").val(expecteddeliverydate);

            console.log("AutoSendPO :" + $("#AutoSendPO").val());
            console.log("NotifyVendor :" + $("#NotifyVendor").val());
            console.log("PORecipients1" + $("#PORecipients1").val());
            console.log("PORecipients2" + $("#PORecipients2").val());

            $("#ro_AutoSendPO").val($("#AutoSendPO").prop("checked"));
            $("#ro_NotifyVendor").val($("#NotifyVendor").prop("checked"));
            $("#ro_VendorRecipients").val($("#VendorRecipients").val());
            $("#ro_PORecipients1").val($("#PORecipients1").prop("checked"));
            $("#ro_InternalRecipients").val($("#InternalRecipients").val());
            $("#ro_PORecipients2").val($("#PORecipients2").prop("checked"));
            $("#ro_comment").val($("#comment").val());


            console.log(deliveryterms);
            console.log(paymentterms);
            console.log(expecteddeliverydate);
            console.log();
            var line_items_data_table = $("#line_items_data_table tbody");
//            var rfqdetails_vendor_table = $("#rfqdetails_vendor_table");
            var pr_ids = "";
            var pr_quantity = "";
            var vendorid = "";
            var pr_insertionOrderIds = "";
//            var pr_baseline_price = "";

//            $("#rfqdetails_vendor_table").find("tbody tr").each(function() {
//                var vendor = $(this).find("td").eq(5).html();
////                alert(vendor);
//                console.log("vendor :" + vendor);
//                
//                
//            });
            line_items_data_table.find("tr").each(function() {
                var tds = $(this).find("td");

                var qty = removeCommaInNumber($(this).find("td").eq(9).children(".pr-line-item-qty-afterRfqCreate").val());
                var pr_id = $(this).find("td").eq(9).children(".rfq-line-id").val();
                var pr_insertionOrderId = $(this).find("td").eq(9).children(".pr-insertionOrderId").val();
//                var baseline_price = $(this).find("td").eq(12).children().val();
//                var vendorid = $(this).find("td").eq

                pr_ids = pr_ids + pr_id + ",";
                pr_quantity = pr_quantity + qty + ",";
                pr_insertionOrderIds = pr_insertionOrderIds + pr_insertionOrderId + ",";
//                pr_baseline_price = pr_baseline_price + baseline_price + "#";


            });

//        alert(pr_ids);
//        alert(pr_quantity);
//        alert(pr_baseline_price);

            $("#pr_ids").val(pr_ids);
            $("#pr_quantity").val(pr_quantity);
            $("#pr_insertionOrderIds").val(pr_insertionOrderIds);
//            $("#pr_baseline_price").val(pr_baseline_price);

            Lobibox.confirm({
                msg: "Are you sure you want to update RFQ?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#rfqdataform").submit();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        } else if (rfq_operation === "create_rfp")
        {
            var vendor = $("#ro_vendorname").val();

            if (vendor === '') {
                Lobibox.alert("error", {
                    msg: "Please select the vendor!"
                });
                return false;
            }

            Lobibox.confirm({
                msg: "Are you sure you want to create RFP?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("yes");
                        $("#rfpdataform").submit();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });

        } else if (rfq_operation === "rfq_for_contract") {

//            alert($("#deliveryterms").val())
//            $("#ro_vendorname").val($("#vendorname").val());
            $("#co_deliveryterms").val($("#deliveryterms").val());
            $("#co_paymentterms").val($("#paymentterms").val());
            $("#co_rfqvaliduntil").val($("#rfqvaliduntil").val());
            $("#co_expecteddeliverydate").val($("#expecteddeliverydate").val());

//            alert($("#deliveryterms").val());

            $("#co_AutoSendPO").val($("#autosendpo").prop("checked"));
            $("#co_NotifyVendor").val($("#notifyvendor").prop("checked"));
            $("#co_VendorRecipients").val($("#vendorrecipients").val());
//            alert($("#internalrecipients").val());
//            $("#co_PORecipients1").val($("#porecipients1").prop("checked"));
            $("#co_InternalRecipients").val($("#internalrecipients").val());
//            $("#co_PORecipients2").val($("#porecipients2").prop("checked"));
            $("#co_comment").val($("#comment").val());
//            alert($("#autosendpo").prop("checked"));

            var line_items_data_table = $("#line_items_data_table tbody");


            var contract_ids = "";
            var contract_quantity = "";
            var contract_att_temp_ids = "";
//            var pr_baseline_price = "";

            line_items_data_table.find("tr").each(function() {
                var tds = $(this).find("td");
                var qty = $(this).find("td").eq(10).children(".contract-line-item-qty").val();
                var contract_id = $(this).find("td").eq(10).children(".contract-id").val();
                var contract_att_temp_id = $(this).find("td").eq(10).children(".contract-att-temp").val();
//                var baseline_price = $(this).find("td").eq(12).children().val();

                contract_ids = contract_ids + contract_id + ",";
                contract_quantity = contract_quantity + qty + ",";
                contract_att_temp_ids = contract_att_temp_ids + contract_att_temp_id + ",";
//                pr_baseline_price = pr_baseline_price + baseline_price + "#";


            });

//        alert(pr_ids);
//        alert(pr_quantity);
//        alert(pr_baseline_price);

            $("#contract_ids").val(contract_ids);
            $("#contract_quantity").val(contract_quantity);
            $("#contract_att_temp_ids").val(contract_att_temp_ids);


//            var contactpersonetelno = $("#contactpersonetelno").val();
//            var contactpersoneemail = $("#contactpersoneemail").val();
//            if (contactpersonetelno === '' && contactpersoneemail === '') {
//                $("#parsley-id-5").addClass("parsley-errors-list");
//                $("#parsley-id-7").addClass("parsley-errors-list");
//                $("#parsley_digits").text("This value is required.");
//                $("#parsley_email").text("This value is required.");
//                Lobibox.alert("error", {
//                    msg: "Please enter the required fields!"
//                });
//                return false;
//            } else
//            if (contactpersonetelno === '') {
//                $("#parsley-id-5").addClass("parsley-errors-list");
//                $("#parsley_digits").text("This value is required.");
//                Lobibox.alert("error", {
//                    msg: "Please enter the contact number!"
//                });
//                return false;
//            } else
//            if (contactpersoneemail === '') {
//                $("#parsley-id-7").addClass("parsley-errors-list");
//                $("#parsley_email").text("This value is required.");
////                $("#parsley_required_email").text("This value is required.");
//                Lobibox.alert("error", {
//                    msg: "Please enter the email id!"
//                });
//                return false;
//            }
////         

            Lobibox.confirm({
                msg: "Are you sure you want to create RFQ?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#contractrfqdataform").submit();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        }
    });

    $(".pr-line-item-qty").change(function() {
        var qty = $(this).val();
        console.log("qty 1: " + qty);
        qty = removeCommaInNumber(qty);
        console.log("qty 2: " + qty);
        if (parseInt(removeCommaInNumber(this.value)) > parseInt(removeCommaInNumber(this.max)) || parseInt(removeCommaInNumber(this.value)) < 1) {
//            this.value = null;
            $(this).val(formatNumberByComma(this.max));
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        } else if (removeCommaInNumber(this.value) === '') {
            $(this).css('border-color', 'red');
//            $("#next-btn").addClass('disabled');
            $(".next-btn").prop("disabled", true);
//            var pr_id = $(this).parent().children(".pr-id").val();
        } else {
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
            $(this).val(formatNumberByComma(qty));
        }
    });

    $(".pr-line-item-qty-afterRfqCreate").change(function() {

        var usedQuantity = removeCommaInNumber($(this).parent().children(".usedQuantity").val());
//        alert(usedQuantity);

        if ((parseInt(removeCommaInNumber(this.value)) > parseInt(removeCommaInNumber(this.max)) + parseInt(removeCommaInNumber(usedQuantity))) || parseInt(removeCommaInNumber(this.value)) < 1)
        {
            $(this).val(removeCommaInNumber(usedQuantity));
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        }
        else if (removeCommaInNumber(this.value) === '')
        {
            $(this).css('border-color', 'red');
            $(".next-btn").prop("disabled", true);
        }
        else
        {
            $(this).val(formatNumberByComma($(this).val()));
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        }
    });

    $(".contract-line-item-qty").keyup(function() {
        if (parseInt(this.value) > parseInt(this.max) || parseInt(this.value) < 1) {
//            this.value = null;
            $(this).val(this.max);
            $(this).css('border-color', '');
            $(".sw-btn-next").prop("disabled", false);
        } else if (this.value === '') {
            $(this).css('border-color', 'red');
//            $("#next-btn").addClass('disabled');
            $(".sw-btn-next").prop("disabled", true);
//            var pr_id = $(this).parent().children(".pr-id").val();
        } else {
            $(this).css('border-color', '');
            $(".sw-btn-next").prop("disabled", false);
        }
    });

    var selectedPrForReject = null;
    $(".reject-pr").click(function() {
//       alert("SAdas");
        selectedPrForReject = $(this).parent().parent();

        var pid = $(this).parent().children(".procInstId").val();
        var linkId = $(this).parent().children(".linkId").val();
        var prCreator = $(this).parent().children(".prCreator").val();

        $("#wiNumber").val(pid);
        $("#linkId").val(linkId);
        $("#rejectreason").val("Select");
        $("#rejectto").val(prCreator);

        $("#rejectprlinemodal").modal("show");

    });
    $("#rejectprlinemodaltn").click(function() {

        var rejectreason = $("#rejectreason").val();
        var rejectcomments = $("#rejectcomments").val();
        var rejectprdoc = $("#rejectprdoc").val();
        var wiNumber = $("#wiNumber").val();
        var linkId = $("#linkId").val();
        var rfqid = $("#rfqid").val();

        console.log("rejectreason: " + rejectreason);
        console.log("rejectcomments: " + rejectcomments);
        console.log("rejectprdoc: " + rejectprdoc);
        console.log("wiNumber: " + wiNumber);
        console.log("linkId: " + linkId);
        console.log("rfqid: " + rfqid);

        if (rejectreason === "Select" || rejectreason === "")
        {
            Lobibox.alert("error", {
                msg: "Please Select Reject Reason!"
            });

            return false;
        }

        Lobibox.confirm({
            msg: "Are you sure you want to reject?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#rejectprlinemodal").modal("hide");
                    $("#overlay").css("display", "block");

                    $.ajax(
                            {
                                type: "GET",
                                url: "ajaxcontroller.do",
                                async: false,
                                data:
                                        {
                                            "reqFrom": "rejectPRFromAfterRfqCreation",
                                            "rejectreason": rejectreason,
                                            "rejectcomments": rejectcomments,
                                            "rejectprdoc": rejectprdoc,
                                            "wiNumber": wiNumber,
                                            "linkId": linkId,
                                            "rfqid": rfqid
                                        },
                                dataType: "json",
                                complete: function(responseJson)
                                {
                                    var obj = $.parseJSON(responseJson.responseText);
                                    console.log(obj.Result);

                                    $("#overlay").css("display", "none");

                                    if (obj.Result === '0')
                                    {
                                        Lobibox.alert("success", {
                                            msg: "PR Line has been rejected.",
                                            callback: function(lobibox, type) {
                                                location.href = "mytask.do";
                                            }
                                        });
                                    }
                                    else
                                    {
                                        Lobibox.alert("error", {
                                            msg: 'PR rejection has been failed, try again!'
                                        });
                                    }
//                                    selectedPrForReject.remove();
                                }
                            });
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });


// $("#rejectprform").submit();
    });

    $("#associatesubmitbtn").click(function() {
        var groupname = $("#groupname").val();
        console.log("groupname: " + groupname);

        var vendorIdsForEditGroup = $("#vendorIdsForEditGroup").val();
        console.log("vendorIdsForEditGroup: " + vendorIdsForEditGroup);

        var sapVendorCodeForEditGroup = $("#sapVendorCodeForEditGroup").val();
        console.log("sapVendorCodeForEditGroup: " + sapVendorCodeForEditGroup);

        if (groupname === "")
        {
            $("#groupname").focus();
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Kindly enter group name !"
            });
            return false;
        }
        if ($("#updategroup_vendor_table tbody tr").length === 0)
        {
            $("#addNewVendorToManageGroupBtn").focus();
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Kindly add vendor(s) !"
            });
            return false;
        }
        $("#associategroupmodal").modal("hide");
        $.ajax(
                {
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "AssociateGroup",
                                "GroupName": groupname,
                                "vendorIdsForEditGroup": vendorIdsForEditGroup,
                                "sapVendorCodeForEditGroup": sapVendorCodeForEditGroup
                            },
                    dataType: "json",
                    beforeSend: function() {
                        $("#overlay").css("display", "block");
                    },
                    error: function() {
                        $("#overlay").css("display", "none");
                    },
                    complete: function(responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log(obj.GroupList.length);

                        $("#groupselect option").remove();
                        $("#groupselect").selectpicker("refresh");
                        for (var i = 0; i < obj.GroupList.length; i++)
                        {
                            $("<option>").val(obj.GroupList[i].GROUP_ID).text(obj.GroupList[i].GROUP_NAME).appendTo("#groupselect");
                        }
                        $("#groupselect").selectpicker("refresh");
                        $("#overlay").css("display", "none");

                        $("#vendorIdsForEditGroup").val("");
                        $("#sapVendorCodeForEditGroup").val("");

                        Lobibox.notify("success", {
                            rounded: true,
                            delayIndicator: false,
                            msg: 'Vendor group created successfully.'
                        });
                    }
                });

    });
    $("#rfq_vendor_table").on('update', function() {
//        alert("sadsa");
        $("#VendorRecipients option").remove();
//        $("#VendorRecipients").selectpicker("refresh");

        var tbody = $(this).find("tbody");
        tbody.find("tr").each(function() {
            var emailId = $(this).find("td").eq(3).text();
//            alert(emailId);
            $("<option>").val(emailId).text(emailId).appendTo("#VendorRecipients");
        });

        $("#VendorRecipients").selectpicker("refresh");
    });

    var vendor = [];
    $("#groupselect").change(function() {
//       alert($(this).val());
        var groupid = $(this).val();

        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
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

                        if (vendorGroupMappingJsonArr.length === 0) {
                            Lobibox.alert("error", {
                                msg: "There are no vendors in this group, please select another group."
                            });
                        } else {
                            var row = "";
                            var groupVendorArr = [];
                            $("#rfq_vendor_table tbody tr").remove();
                            for (var i = 0; i < vendorGroupMappingJsonArr.length; i++)
                            {
//                                console.log("i: " + i);
                                var id = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.id;
                                var firstName = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.firstname === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.firstname;
                                var lastName = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.lastname === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.lastname;
                                var code = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.code === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.code;
                                var address = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.address === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.address;
                                var emailId = vendorGroupMappingJsonArr[i].ngBpVendordetailsId.emailid === undefined ? "" : vendorGroupMappingJsonArr[i].ngBpVendordetailsId.emailid;

                                row += "<tr><td>" + firstName + " " + lastName + "</td><td>" + code + "</td><td>" + address + "</td><td>" + emailId + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + id + "><input type='hidden' class='selected-vendor-type' value='Vendor'></td></tr>";

                                groupVendorArr.push(id);
                            }
                            $("#rfq_vendor_table").children("tbody").append(row);
                            $("#ro_vendorname").val(groupVendorArr.toString());
                            $("#rfq_vendor_table").trigger('update');
                        }
                    }
                });

        vendor = [];

    });

    var current_tr;

    $(".upload-prline-document").click(function() {

//        alert("sdad");
//        var pr_id = $(this).parent().parent().find("td").eq(10).children(".pr-id").val();
//        alert(pr_id);
        current_tr = $(this).parent().parent();
//        alert(current_tr);
        var linkId = $(this).parent().children('.linkIdClass').val();
        var procInstId = $(this).parent().children('.procInstIdClass').val();
        var currentWorkstep = $(this).parent().children('.currentWorkstepClass').val();
        var requester = $(this).parent().children('.requesterClass').val();
        var materialCode = $(this).parent().children('.materialCodeClass').val();
        var shortText = $(this).parent().children('.shortTextClass').val();
        var quantity = $(this).parent().parent().find('td').eq(9).children('.pr-line-item-qty').val();

        $("#linkId").val(linkId);
        $("#procInstId").val(procInstId);
        $("#currentWorkstep").val(currentWorkstep);
        $("#requester").val(requester);
        $("#materialCode").val(materialCode);
        $("#shortText").val(shortText);
        $("#quantity").val(quantity);

        $("#prlineitemattachmentmodal").modal("show");
//
//        $("#file_docDiv1").val(null);
//        $("#file_docDiv2").val(null);
//        $("#file_docDiv3").val(null);
//        $("#file_docDiv4").val(null);
//        $("#file_docDiv5").val(null);
//
//        $("#doc1").val("");
//        $("#doc2").val("");
//        $("#doc3").val("");
//        $("#doc4").val("");
//        $("#doc5").val("");

        $("#prlinedocform").trigger("reset");
    });

    $("#uploadprlinefilesubmitbtn").click(function() {
//        alert($("input[name='file_docDiv1']").val());
//        $("#overlay").css("display", "block");
        if ($("input[name='file_docDiv1']").val().trim() !== "" || $("input[name='file_docDiv2']").val().trim() !== "" ||
                $("input[name='file_docDiv3']").val().trim() !== "" || $("input[name='file_docDiv4']").val().trim() !== "" ||
                $("input[name='file_docDiv5']").val().trim() !== "") {

            $("#prlineitemattachmentmodal").modal("hide");

            var lobiboxProgress = Lobibox.progress({
                title: 'Please wait',
                label: 'Uploading files...',
                onShow: function($this) {
                    var i = 0;
                    var inter = setInterval(function() {
                        if (i > 100) {
                            inter = clearInterval(inter);
                        }
                        i = i + 0.05;
                        $this.setProgress(i);
                    }, 1);
                },
                progressCompleted: function($this)
                {
                    $this.hide();
                    Lobibox.notify("success", {
                        rounded: true,
                        delayIndicator: false,
                        msg: 'Files uploaded successfully.'
                    });
                }
            });
        }
        else
        {
            Lobibox.alert("error",
                    {
                        msg: "Please select at least one file!"
                    });
        }
    });

    $("#prlinedocform").submit(function(event) {

//        $("#overlay").css("display", "block");
//        $("#prlineitemattachmentmodal").modal("hide");
//        alert("sadasd");
        event.preventDefault();

        if ($("input[name='file_docDiv1']").val().trim() !== "" || $("input[name='file_docDiv2']").val().trim() !== "" ||
                $("input[name='file_docDiv3']").val().trim() !== "" || $("input[name='file_docDiv4']").val().trim() !== "" ||
                $("input[name='file_docDiv5']").val().trim() !== "") {


//        $("#prlinedocform").prop("action", "submitrfqprlineattachment.do");

            var formData = new FormData(this);

            $.ajax(
                    {
                        type: "POST",
                        url: "submitrfqprlineattachment.do",
                        async: true,
                        data: formData,
//                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        complete: function(responseJson)
                        {
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("Attch Id: " + obj.TempAttachmentId);

                            current_tr.find("td").eq(9).children(".pr-att-temp").val(obj.TempAttachmentId);
                            current_tr.find("td").eq(20).children(".viewUploadedDocFromDB").removeAttr("style");
//                        $("#prlineitemattachmentmodal").modal("hide");
                            console.log(current_tr.find("td").eq(20).children(".viewUploadedDocFromDB").html());

//                        lobiboxProgress.hide();
                        },
                        success: function(status)
                        {
//                        $("#overlay").css("display", "none");
                        }
                    });
        }
    });

    var totalVendor = 0;
    var totalPR = 0;
    var vendorIdArr = [];
    var extraaRatedParameter = [];
    $("#rfqnumber").change(function() {
//       alert("sfdsf"); 
        var rfq_no = $(this).val();
//        alert(rfq_no);
        $("#overlay").css("display", "block");

        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: true,
                    data:
                            {
                                "reqFrom": "VendorComparisonReport",
                                "rfqNumber": rfq_no
                            },
                    dataType: "json",
                    complete: function(responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);

                        totalVendor = obj.VendorData.length;
                        extraaRatedParameter = obj.ExtraaRatedParameterArr;
                        var rfqStatus = obj.RfqStatus;

                        console.log("rfqStatus: " + rfqStatus);
                        console.log("Vendors: " + totalVendor);
                        console.log("ExtraaRatedParameter Len: " + extraaRatedParameter.length);

                        if (rfqStatus === "Closed")
                        {
                            $("#finalizeVendorBtn").css("visibility", "hidden");
                            $("#createPOBtn").css("visibility", "visible");
                        }
                        else
                        {
                            $("#finalizeVendorBtn").css("visibility", "visible");
                            $("#createPOBtn").css("visibility", "hidden");
                        }

                        var thead_tr = "";
                        var tbody_tr = "";
                        var item_no_array = [];
                        var quantity_array = [];
                        var remainingQuantityForPo_array = [];
                        var insertionOrderId_array = [];
                        var linkId_array = [];
                        var processInstanceId_array = [];
                        var vendor_price_map = {};
                        var buyer_price_map = {};
                        var vendor_converted_price_map = {};
                        var vendorId_array = [];
                        var vendorCode_array = [];
                        var vendorSelectBox = '';
                        var vendorFinalizationTable_tbody_tr = "";

                        thead_tr = "<tr>";
                        thead_tr += "<th class='sticky-cell'>Vendor Details</th>";
                        if (rfqStatus === "Closed")
                        {
                            vendorSelectBox = "<select class='custom-select vendor-select' style='display: none;width: 100%;'>";
                            vendorSelectBox += "<option value=''>Select</option>";
                        }
                        else
                        {
                            vendorSelectBox = "<select class='custom-select vendor-select' style='width: 250px;'>";
                            vendorSelectBox += "<option value=''>Select</option>";
                        }

                        for (var i = 0; i < obj.VendorData.length; i++)
                        {
                            console.log("Vendor Name: " + obj.VendorData[i].VendorName);
                            console.log("PR Length: " + obj.VendorData[i].PRDetails.length);

                            var vendor_name = obj.VendorData[i].VendorName;
                            var vendor_currency = obj.VendorData[i].Currency;
                            var supplier_status = obj.VendorData[i].SupplierStatus;

//                            alert(obj.VendorData[i].VendorCode);
                            vendorIdArr.push(obj.VendorData[i].VendorId);
                            vendorId_array.push(obj.VendorData[i].VendorId);
                            vendorCode_array.push(obj.VendorData[i].VendorCode);
//                            thead_tr += "<th>" + vendor_name + " (price quoted)/ Baseline Price</th>";
                            thead_tr += "<th>" + vendor_name + "<br>Price Quoted in " + vendor_currency + " / Price Quoted in SGD / Final Price (Vendor Currency)</th>";

                            if (supplier_status === "Bid Submitted") {
                                vendorSelectBox += "<option value='" + obj.VendorData[i].VendorId + "'>" + vendor_name + "</option>";
                            }
                            var price_temp_arr = [];
                            var buyer_price_temp_arr = [];
                            var vendor_converted_price_temp_arr = [];

                            for (var j = 0; j < obj.VendorData[i].PRDetails.length; j++)
                            {
                                var pr_array = obj.VendorData[i].PRDetails;

                                if (i === 0)
                                {
                                    item_no_array.push(pr_array[j].ItemNumber);
                                    insertionOrderId_array.push(pr_array[j].InsertionOrderId);
                                    linkId_array.push(pr_array[j].LinkId);
                                    processInstanceId_array.push(pr_array[j].PID);
                                    quantity_array.push(pr_array[j].Quantity);
                                    remainingQuantityForPo_array.push(pr_array[j].RemainingQuantityForPo);
                                }
                                price_temp_arr.push(pr_array[j].Price);
                                buyer_price_temp_arr.push(pr_array[j].BuyerBaselinePrice);
                                vendor_converted_price_temp_arr.push(pr_array[j].ConvertedPrice);
                            }
                            vendor_price_map[vendor_name] = price_temp_arr;
                            buyer_price_map[vendor_name] = buyer_price_temp_arr;
                            vendor_converted_price_map[vendor_name] = vendor_converted_price_temp_arr;
                        }
//                        alert(vendorId_array);
//                        thead_tr += "<th>Baseline Price</th>";
                        thead_tr += "</tr>";
                        vendorSelectBox += "</select>";

//                        console.log("vendor_price: " + vendor_price_map);
//                        console.log("item_no_array: " + item_no_array);
                        totalPR = item_no_array.length;
                        var a = 0;
                        for (var k = 0; k < item_no_array.length; k++)
                        {
                            tbody_tr += "<tr><th class='sticky-cell'>" + item_no_array[k] + " / " + quantity_array[k] + " / <a href='#' class='longTextClass' title='PO Long Text' data-toggle='tooltip' data-placement='auto'><i class='fa fa-file' aria-hidden='true'></i><input type='hidden' class='prLineInsertionOrderId' value='" + insertionOrderId_array[k] + "'></a> <div><button class='btn btn-success btn-sm lastPoDetailsClass' style='padding: 3px;font-size: 11px;'>PO Details</button><input type='hidden' class='prLineInsertionOrderId' value='" + insertionOrderId_array[k] + "'></div></th>";
                            if (rfqStatus === "Closed")
                            {
                                var isPoCreated = obj.FinalizedVendorData[k].IsPoCreated;
                                console.log("isPoCreated: " + isPoCreated);
                                if (remainingQuantityForPo_array[k] !== '0')
                                {
                                    if (isPoCreated === "Yes")
                                    {
                                        vendorFinalizationTable_tbody_tr += "<tr><th id='" + obj.FinalizedVendorData[k].PrId + "'><input type='checkbox' class='vendorCheckboxToCreatePO' value='" + obj.FinalizedVendorData[k].VendorId + "'></th><th>" + obj.FinalizedVendorData[k].ItemNumber + " / " + quantity_array[k] + "</th><td><input type='number' min='0' class='pr-line-quantity' value='" + remainingQuantityForPo_array[k] + "' max='" + remainingQuantityForPo_array[k] + "'></td><td><a href='#' title='Change Vendor' class='change-vendor-link'><i class='fa fa-pen-square fa-2x' aria-hidden='true'></i></a> <div style='width: 100%;'>" + obj.FinalizedVendorData[k].VendorName + "</div>" + vendorSelectBox + "</td><td><textarea cols='40' class='comments'>" + obj.FinalizedVendorData[k].Comments + "</textarea></td><td><textarea cols='40' class='why-this-vendor'>" + obj.FinalizedVendorData[k].WhyThisVendor + "</textarea></td><td>PO created</td></tr>";
                                    }
                                    else
                                    {
                                        vendorFinalizationTable_tbody_tr += "<tr><th id='" + obj.FinalizedVendorData[k].PrId + "'><input type='checkbox' class='vendorCheckboxToCreatePO' value='" + obj.FinalizedVendorData[k].VendorId + "'></th><th>" + obj.FinalizedVendorData[k].ItemNumber + " / " + quantity_array[k] + "</th><td><input type='number' min='0' class='pr-line-quantity' value='" + remainingQuantityForPo_array[k] + "' max='" + remainingQuantityForPo_array[k] + "'></td><td><a href='#' title='Change Vendor' class='change-vendor-link'><i class='fa fa-pen-square fa-2x' aria-hidden='true'></i></a> <div style='width: 100%;'>" + obj.FinalizedVendorData[k].VendorName + "</div>" + vendorSelectBox + "</td><td><textarea cols='40' class='comments'>" + obj.FinalizedVendorData[k].Comments + "</textarea></td><td><textarea cols='40' class='why-this-vendor'>" + obj.FinalizedVendorData[k].WhyThisVendor + "</textarea></td><td></td></tr>";
                                    }
                                }
                                else
                                {
                                    vendorFinalizationTable_tbody_tr += "<tr><th></th><th>" + obj.FinalizedVendorData[k].ItemNumber + " / " + quantity_array[k] + "</th><td>" + remainingQuantityForPo_array[k] + "</td><td><div style='width: 100%;'>" + obj.FinalizedVendorData[k].VendorName + "</div></td><td><textarea cols='40' class='comments'>" + obj.FinalizedVendorData[k].Comments + "</textarea></td><td><textarea cols='40' class='why-this-vendor'>" + obj.FinalizedVendorData[k].WhyThisVendor + "</textarea></td><td>PO created</td></tr>";
                                }
                            }
                            else
                            {
                                vendorFinalizationTable_tbody_tr += "<tr><th></th><th>" + item_no_array[k] + " / " + quantity_array[k] + "</th><td>" + remainingQuantityForPo_array[k] + "</td><td id='InsertionOrderId_" + insertionOrderId_array[k] + "'>" + vendorSelectBox + "</td><td><textarea cols='40' class='comments'></textarea></td><td><textarea cols='40' class='why-this-vendor'></textarea></td><td>Vendor Not Finalized</td></tr>";
                            }
                            for (var vendor in vendor_price_map)
                            {
//                                console.log(vendor + " " + vendor_price_map[vendor]);
                                var price_array = [];
                                price_array = vendor_price_map[vendor];
                                var buyer_price_array = [];
                                buyer_price_array = buyer_price_map[vendor];
                                var vendor_converted_price_array = [];
                                vendor_converted_price_array = vendor_converted_price_map[vendor];

                                if (rfqStatus === "Closed")
                                    tbody_tr += "<td>" + Number(price_array[k]).toFixed(2) + " / " + Number(vendor_converted_price_array[k]).toFixed(2) + " / <input type='number' id='price_" + vendorId_array[a] + "_" + insertionOrderId_array[k] + "' value='" + Number(buyer_price_array[k]).toFixed(2) + "' class='baseline-price-class' disabled> <a href='#' id='id_" + vendorCode_array[a] + "_" + linkId_array[k] + "_" + processInstanceId_array[k] + "' title='View & Download Supplorting Documents' class='view-download-supporting-documents'><i class='fa fa-eye fa-lg' aria-hidden='true'></i></a></td>";
                                else
                                    tbody_tr += "<td>" + Number(price_array[k]).toFixed(2) + " / " + Number(vendor_converted_price_array[k]).toFixed(2) + " / <input type='number' id='price_" + vendorId_array[a] + "_" + insertionOrderId_array[k] + "' value='" + Number(buyer_price_array[k]).toFixed(2) + "' class='baseline-price-class'> <a href='#' id='id_" + vendorCode_array[a] + "_" + linkId_array[k] + "_" + processInstanceId_array[k] + "' title='View & Download Supplorting Documents' class='view-download-supporting-documents'><i class='fa fa-eye fa-lg' aria-hidden='true'></i></a></td>";
                                a++;
                            }
//                            tbody_tr += "<td><input type='text'></td>";
                            tbody_tr += "</tr>";
                            a = 0;
                        }

                        tbody_tr += "<tr><th class='sticky-cell'>Total Value</th>";

                        for (var i = 0; i < obj.VendorData.length; i++)
                        {
                            var total_price = obj.VendorData[i].TotalPrice;
                            var buyer_total_price = obj.VendorData[i].BuyerTotalBaselinePrice;
                            var total_converted_price = obj.VendorData[i].TotalConvertedPrice;

                            tbody_tr += "<td>" + Number(total_price).toFixed(2) + " / " + Number(total_converted_price).toFixed(2) + " / <input type='text' class='total-price' value='" + Number(buyer_total_price).toFixed(2) + "' readonly></td>";
                        }
//                        tbody_tr += "<td><input type='text'></td>";
                        tbody_tr += "</tr>";

                        var parameter = ["MOQ/ MOV Details", "Delivery Lead Time", "Payment Terms", "Brand/ Model", "Incoterms", "Validity of Offer"];

                        for (var p = 0; p < parameter.length; p++)
                        {
                            tbody_tr += "<tr><th class='sticky-cell'>" + parameter[p] + "</th>";
                            for (var i = 0; i < obj.VendorData.length; i++)
                            {
                                var scoreSelect = "";

                                if (parameter[p] === "MOQ/ MOV Details")
                                {
                                    if (rfqStatus === "Closed")
                                    {
                                        if (obj.VendorData[i].MoqMovDetailsScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value='" + obj.VendorData[i].MoqMovDetailsScore + "'>" + obj.VendorData[i].MoqMovDetailsScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    else
                                    {
                                        if (obj.VendorData[i].MoqMovDetailsScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value='" + obj.VendorData[i].MoqMovDetailsScore + "'>" + obj.VendorData[i].MoqMovDetailsScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    if (rfqStatus === "Closed")
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='MoqMov_" + vendorId_array[i] + "' disabled>" + obj.VendorData[i].MoqMovDetails + "</textarea></td>";
                                    else
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='MoqMov_" + vendorId_array[i] + "'>" + obj.VendorData[i].MoqMovDetails + "</textarea></td>";
                                }
                                if (parameter[p] === "Delivery Lead Time")
                                {
                                    if (rfqStatus === "Closed") {
                                        if (obj.VendorData[i].DeliveryLeadTimeScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value='" + obj.VendorData[i].DeliveryLeadTimeScore + "'>" + obj.VendorData[i].DeliveryLeadTimeScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    else
                                    {
                                        if (obj.VendorData[i].DeliveryLeadTimeScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value='" + obj.VendorData[i].DeliveryLeadTimeScore + "'>" + obj.VendorData[i].DeliveryLeadTimeScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    if (rfqStatus === "Closed")
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='DLT_" + vendorId_array[i] + "' disabled>" + obj.VendorData[i].DeliveryLeadTime + "</textarea></td>";
                                    else
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='DLT_" + vendorId_array[i] + "'>" + obj.VendorData[i].DeliveryLeadTime + "</textarea></td>";
                                }
                                if (parameter[p] === "Payment Terms")
                                {
                                    if (rfqStatus === "Closed") {
                                        if (obj.VendorData[i].PaymentTermsScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value='" + obj.VendorData[i].PaymentTermsScore + "'>" + obj.VendorData[i].PaymentTermsScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    else
                                    {
                                        if (obj.VendorData[i].PaymentTermsScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value='" + obj.VendorData[i].PaymentTermsScore + "'>" + obj.VendorData[i].PaymentTermsScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    if (rfqStatus === "Closed")
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='PT_" + vendorId_array[i] + "' disabled>" + obj.VendorData[i].PaymentTerms + "</textarea></td>";
                                    else
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='PT_" + vendorId_array[i] + "'>" + obj.VendorData[i].PaymentTerms + "</textarea></td>";
                                }
                                if (parameter[p] === "Brand/ Model")
                                {
                                    if (rfqStatus === "Closed") {
                                        if (obj.VendorData[i].BrandModelScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value='" + obj.VendorData[i].BrandModelScore + "'>" + obj.VendorData[i].BrandModelScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    else
                                    {
                                        if (obj.VendorData[i].BrandModelScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value='" + obj.VendorData[i].BrandModelScore + "'>" + obj.VendorData[i].BrandModelScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    if (rfqStatus === "Closed")
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='BrandModel_" + vendorId_array[i] + "' disabled>" + obj.VendorData[i].BrandModel + "</textarea></td>";
                                    else
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='BrandModel_" + vendorId_array[i] + "'>" + obj.VendorData[i].BrandModel + "</textarea></td>";
                                }
                                if (parameter[p] === "Incoterms")
                                {
                                    if (rfqStatus === "Closed") {
                                        if (obj.VendorData[i].IncotermScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value='" + obj.VendorData[i].IncotermScore + "'>" + obj.VendorData[i].IncotermScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    else
                                    {
                                        if (obj.VendorData[i].IncotermScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value='" + obj.VendorData[i].IncotermScore + "'>" + obj.VendorData[i].IncotermScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    if (rfqStatus === "Closed")
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='Incoterm_" + vendorId_array[i] + "' disabled>" + obj.VendorData[i].Incoterms + "</textarea></td>";
                                    else
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='Incoterm_" + vendorId_array[i] + "'>" + obj.VendorData[i].Incoterms + "</textarea></td>";
                                }
                                if (parameter[p] === "Validity of Offer")
                                {
                                    if (rfqStatus === "Closed") {
                                        if (obj.VendorData[i].ValidityOfOfferScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value='" + obj.VendorData[i].ValidityOfOfferScore + "'>" + obj.VendorData[i].ValidityOfOfferScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    else
                                    {
                                        if (obj.VendorData[i].ValidityOfOfferScore === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value='" + obj.VendorData[i].ValidityOfOfferScore + "'>" + obj.VendorData[i].ValidityOfOfferScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    if (rfqStatus === "Closed")
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='VOO_" + vendorId_array[i] + "' disabled>" + obj.VendorData[i].VelidityOfOffer + "</textarea></td>";
                                    else
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='VOO_" + vendorId_array[i] + "'>" + obj.VendorData[i].VelidityOfOffer + "</textarea></td>";
                                }
                            }
//                            tbody_tr += "<td></td></tr>";
                            tbody_tr += "</tr>";
                        }

                        $("#vendorcomparisonreporttable").children("thead").html(thead_tr);
                        $("#vendorcomparisonreporttable").children("tbody").html(tbody_tr);

//                        $("#vendorFinalizationTable").css("display", "block");
                        $("#vendorFinalizationTable").children("tbody").html(vendorFinalizationTable_tbody_tr);

                        $("#summaryOfQuotation").removeClass("disabled");
                        $("#summaryOfQuotation").prop("href", "downloadVendorComparisionExcelReport.do?rfqid=" + rfq_no);
                        $("#vendorSelectionCriteria").removeClass("disabled");
                        $("#vendorSelectionCriteria").prop("href", "downloadVendorComparisionPdfReport.do?rfqid=" + rfq_no);
                        $("#getDocumentsFromDMS").removeClass("disabled");
                        $("#reponseManagementBtn").removeClass("disabled");

                        if (rfqStatus === "Closed") {
                            $("#addNewRatedParameter").addClass("disabled");
                        }
                        else {
                            $("#addNewRatedParameter").removeClass("disabled");
                        }

                        if (rfqStatus === "Closed") {
//                            $("#finalizeVendorBtn").css("display", "none");
                            $("#createPOBtn").prop("disabled", false);
                        }
                        else
                        {
//                            $("#finalizeVendorBtn").css("display", "block");
                            $("#createPOBtn").prop("disabled", true);
                        }

                        $("#overlay").css("display", "none");

                        console.log("totalVendor: " + totalVendor);
                        console.log("totalPR: " + totalPR);

                        console.log("extraaRatedParameter.length: " + extraaRatedParameter.length);
                        var extraaRatedParamRow = "";
//                        debugger;
                        for (var i = 0; i < extraaRatedParameter.length; i++)
                        {
                            if (Number(extraaRatedParameter[i].SerialNo) === 1)
                            {
                                if (rfqStatus === "Closed")
                                {
                                    extraaRatedParamRow += "<tr><th>" + extraaRatedParameter[i].RatedParameter + "</th>";
                                }
                                else
                                {
                                    extraaRatedParamRow += "<tr><th class='sticky-cell'><a href='#' title='Save' class='save-new-rated-parameter'><i class='fa fa-save fa-2x' aria-hidden='true'></i></a> <a href='#' title='Delete' class='delete-new-rated-parameter'><i class='fa fa-trash' aria-hidden='true'></i></a> " + extraaRatedParameter[i].RatedParameter + "</th>";
                                }
                            }
                            if (rfqStatus === "Closed")
                            {
                                extraaRatedParamRow += "<td><input type='hidden' class='extra-rated-parameter-mappingId' value='" + extraaRatedParameter[i].MappingId + "'><input type='hidden' class='extra-rated-parameter-vendorId' value='" + extraaRatedParameter[i].VendorId + "'><input type='hidden' class='extra-rated-parameter' value='" + extraaRatedParameter[i].RatedParameter + "'><select class='custom-select extra-score-select' style='width:35%;' disabled><option value='" + extraaRatedParameter[i].RatedParameterScore + "'>" + extraaRatedParameter[i].RatedParameterScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br><textarea class='extra-rated-paramter-desc' cols='50' id='Extra_" + extraaRatedParameter[i].VendorId + "' disabled>" + extraaRatedParameter[i].RatedParameterDesc + "</textarea></td>";
                            }
                            else
                            {
                                extraaRatedParamRow += "<td><input type='hidden' class='extra-rated-parameter-mappingId' value='" + extraaRatedParameter[i].MappingId + "'><input type='hidden' class='extra-rated-parameter-vendorId' value='" + extraaRatedParameter[i].VendorId + "'><input type='hidden' class='extra-rated-parameter' value='" + extraaRatedParameter[i].RatedParameter + "'><select class='custom-select extra-score-select' style='width:35%;'><option value='" + extraaRatedParameter[i].RatedParameterScore + "'>" + extraaRatedParameter[i].RatedParameterScore + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br><textarea class='extra-rated-paramter-desc' cols='50' id='Extra_" + extraaRatedParameter[i].VendorId + "'>" + extraaRatedParameter[i].RatedParameterDesc + "</textarea></td>";
                            }
                            if (i < extraaRatedParameter.length - 1)
                            {
                                if (Number(extraaRatedParameter[i + 1].SerialNo) === 1)
                                    extraaRatedParamRow += "</tr>";
                            }
                            if (i === extraaRatedParameter.length - 1)
                            {
                                extraaRatedParamRow += "</tr>";
                            }
                        }
                        console.log("extraaRatedParamRow: " + extraaRatedParamRow);

                        if (extraaRatedParameter.length !== 0)
                            $("#vendorcomparisonreporttable tbody").append(extraaRatedParamRow);
                    }
                });
    });
    $("#vendorcomparisonreporttable").on("click", ".longTextClass", function() {
        var prLineInsertionOrderId = $(this).children(".prLineInsertionOrderId").val();
        console.log("prLineInsertionOrderId: " + prLineInsertionOrderId);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "findPrLineByInertionOrderId",
                "prLineInsertionOrderId": prLineInsertionOrderId
            },
            beforeSend: function() {
                $("#overlay").css("display", "block");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var prLineJsonObj = $.parseJSON(responseJson.responseText);
                prLineJsonObj = JSON.parse(JSON.stringify(prLineJsonObj));
                console.log("prLineJsonObj.materialLongText: " + prLineJsonObj.prLineObj.materialLongText);
                $('div.longtext').text(prLineJsonObj.prLineObj.materialLongText);
                $("#longTextModal").modal("show");
            }
        });
    });
    $("#vendorcomparisonreporttable").on("click", ".lastPoDetailsClass", function() {
        var prLineInsertionOrderId = $(this).parent().children(".prLineInsertionOrderId").val();
        console.log("prLineInsertionOrderId: " + prLineInsertionOrderId);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "findLastPoDetailsByInertionOrderId",
                "prLineInsertionOrderId": prLineInsertionOrderId
            },
            beforeSend: function() {
                $("#overlay").css("display", "block");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var lastPoDetailsJsonArr = $.parseJSON(responseJson.responseText);
                lastPoDetailsJsonArr = JSON.parse(JSON.stringify(lastPoDetailsJsonArr));
                console.log("lastPoDetailsJsonArr len: " + lastPoDetailsJsonArr.length);
                var row = "";
                for (var i = 0; i < lastPoDetailsJsonArr.length; i++)
                {
                    row += "<tr><td>" + lastPoDetailsJsonArr[i].lastPoNumber + "</td><td>" + lastPoDetailsJsonArr[i].lastPoDate + "</td><td>" + lastPoDetailsJsonArr[i].lastPoBuyer + "</td><td>" + lastPoDetailsJsonArr[i].lastPoSupplier + "</td></tr>";
                }
                $("#lastPoDetailsTable").children("tbody").html(row);
                $("#lastPoDetailsModal").modal("show");
            }
        });
    });
    $("#addNewRatedParameter").click(function() {
        Lobibox.prompt('text', //Any input type will be valid
                {
                    title: 'Please Enter Rated Parameter',
                    attrs: {
                        placeholder: "Rated Parameter"
                    },
                    callback: function(lobibox, type) {
                        console.log("type: " + type);
                        if (type === "ok")
                        {
                            var ratedParameter = $(".lobibox-input").val();
                            console.log("ratedParameter 1: " + ratedParameter);
                            if (ratedParameter.toString().trim() !== "")
                            {
                                console.log("ratedParameter 2: " + ratedParameter);
                                var row = "<tr>";
                                row += "<th class='sticky-cell'><a href='#' title='Save' class='save-new-rated-parameter'><i class='fa fa-save fa-2x' aria-hidden='true'></i></a> <a href='#' title='Delete' class='delete-new-rated-parameter'><i class='fa fa-trash' aria-hidden='true'></i></a> " + ratedParameter + "</th>";
                                var textAreaField = "";
                                for (var i = 0; i < totalVendor; i++)
                                {
                                    textAreaField = "<textarea class='extra-rated-paramter-desc' cols='50' id='Extra_" + vendorIdArr[i] + "'></textarea>";
                                    row += "<td><input type='hidden' class='extra-rated-parameter-mappingId'><input type='hidden' class='extra-rated-parameter-vendorId' value='" + vendorIdArr[i] + "'><input type='hidden' class='extra-rated-parameter' value='" + ratedParameter + "'><select class='custom-select extra-score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>" + textAreaField + "</td>";
                                }
                                row += "</tr>";
                                console.log("row: " + row);
                                $("#vendorcomparisonreporttable tbody").append(row);
                            }
                            else
                            {
                                Lobibox.alert("error", {
                                    msg: "Please enter valid rated parameter !"
                                });
                                return false;
                            }
                        }
                    }
                });
    });

    $("#vendorcomparisonreporttable").on("click", ".delete-new-rated-parameter", function() {
        var currentTr = $(this).parent().parent();
        console.log("currentTr: " + currentTr);
        var mappingIdAsJsonArr = [];
        var rfqId = $("#rfqnumber").val();
        console.log("rfqId: " + rfqId);

        for (var i = 0; i < totalVendor; i++)
        {
            var currentTd = currentTr.find("td").eq(i);
            console.log("currentTd: " + currentTd);

            var ratedParameterMappingId = currentTd.children(".extra-rated-parameter-mappingId").val();
            console.log("ratedParameterMappingId: " + ratedParameterMappingId);

            var mappingIdAsJsonObj = {};
            mappingIdAsJsonObj["MappingId"] = ratedParameterMappingId;
            mappingIdAsJsonArr.push(mappingIdAsJsonObj);
        }
        var mappingIdAsJsonArrString = JSON.stringify(mappingIdAsJsonArr);
        console.log("mappingIdAsJsonArrString: " + mappingIdAsJsonArrString);

        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "DeleteExtraaRatedParameter",
                "rfqId": rfqId,
                "mappingIdAsJsonArrString": mappingIdAsJsonArrString
            },
            beforeSend: function() {
                $("#overlay").css("display", "block");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Result: " + obj.Result);

                currentTr.remove();

                Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                        {
                            msg: "Rated Parameter deleted Successfully."
                        });
            }
        });

    });
    $("#vendorcomparisonreporttable").on("click", ".save-new-rated-parameter", function() {
        var rfqId = $("#rfqnumber").val();
        console.log("rfqId: " + rfqId);

        var currentTr = $(this).parent().parent();
        console.log("currentTr: " + currentTr);
        var extraaRatedParameterDetailsAsJsonArr = [];

        for (var i = 0; i < totalVendor; i++)
        {
            var currentTd = currentTr.find("td").eq(i);
            console.log("currentTd: " + currentTd);

            var ratedParameterMappingId = currentTd.children(".extra-rated-parameter-mappingId").val();
            var ratedParameterVendorId = currentTd.children(".extra-rated-parameter-vendorId").val();
            var ratedParameter = currentTd.children(".extra-rated-parameter").val();
            var score = currentTd.children(".extra-score-select").val();
            var ratedParameterDesc = currentTd.children(".extra-rated-paramter-desc").val();

            console.log("i: " + i);
            console.log("ratedParameterMappingId: " + ratedParameterMappingId);
            console.log("ratedParameterVendorId: " + ratedParameterVendorId);
            console.log("ratedParameter: " + ratedParameter);
            console.log("score: " + score);
            console.log("ratedParameterDesc: " + ratedParameterDesc);

            if (score !== undefined && score === "")
            {
                currentTd.children(".extra-score-select").focus();
                Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please select score!"
                });
                return false;
            }
            if (ratedParameterDesc !== undefined && ratedParameterDesc.toString().trim() === "")
            {
                currentTd.children(".extra-rated-paramter-desc").focus();
                Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please enter rated parameter description!"
                });
                return false;
            }
            var extraaRatedParameterDetailsAsJsonObj = {};

            extraaRatedParameterDetailsAsJsonObj["MappingId"] = ratedParameterMappingId;
            extraaRatedParameterDetailsAsJsonObj["VendorId"] = ratedParameterVendorId;
            extraaRatedParameterDetailsAsJsonObj["RatedParameter"] = ratedParameter;
            extraaRatedParameterDetailsAsJsonObj["Score"] = score;
            extraaRatedParameterDetailsAsJsonObj["RatedParameterDesc"] = ratedParameterDesc;

            extraaRatedParameterDetailsAsJsonArr.push(extraaRatedParameterDetailsAsJsonObj);
        }

        var extraaRatedParameterDetailsAsJsonArrString = JSON.stringify(extraaRatedParameterDetailsAsJsonArr);
        console.log("extraaRatedParameterDetailsAsJsonArrString: " + extraaRatedParameterDetailsAsJsonArrString);

        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "SaveExtraaRatedParameter",
                "rfqId": rfqId,
                "extraaRatedParameterDetailsAsJsonArrString": extraaRatedParameterDetailsAsJsonArrString
            },
            beforeSend: function() {
                $("#overlay").css("display", "block");
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                $("#overlay").css("display", "none");
                var obj = $.parseJSON(responseJson.responseText);

                console.log("Result: " + obj.Result);
                console.log("MappingIds: " + obj.MappingIds.length);

                for (var i = 0; i < obj.MappingIds.length; i++)
                {
                    var currentTd = currentTr.find("td").eq(i);
                    currentTd.children(".extra-rated-parameter-mappingId").val(obj.MappingIds[i]);
                }
                Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                        {
                            msg: "Data saved successfully."
                        });
            }
        });
    });

    $("#vendorFinalizationTable").on("click", ".change-vendor-link", function() {
        var isSelectBoxDisplay = $(this).parent().children(".vendor-select").css("display");
        console.log("isSelectBoxDisplay: " + isSelectBoxDisplay);
        if (isSelectBoxDisplay === "none")
        {
            $(this).parent().children(".vendor-select").val("");
            $(this).parent().children(".vendor-select").css("display", "block");
        }
        else
        {
            $(this).parent().children(".vendor-select").val("");
            $(this).parent().children(".vendor-select").css("display", "none");
        }
    });

//    $("#vendorcomparisonreporttable").on("click", ".view-download-supporting-documents", function() {
//        $("#overlay").css("display", "block");
//        var prAttTempId = "2257";
//        console.log("pr_att_temp_id: " + prAttTempId);
//
//        $.ajax({
//            type: "GET",
//            url: "ajaxcontroller.do",
//            async: true,
//            data: {
//                "reqFrom": "GetDocumentsFromWorkOrderAttTemp",
//                "prAttTempId": prAttTempId
//            },
//            complete: function(responseJson) {
//                var obj = $.parseJSON(responseJson.responseText);
//
//                $("#documentListTable tbody tr").remove();
//                var row = "";
//
//                if (obj.Att1 !== undefined)
//                    row += "<tr><td>" + obj.Att1 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att1' id='DownloadAtt1' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att1' id='DownloadAtt1' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                if (obj.Att2 !== undefined)
//                    row += "<tr><td>" + obj.Att2 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att2' id='DownloadAtt2' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att2' id='DownloadAtt2' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                if (obj.Att3 !== undefined)
//                    row += "<tr><td>" + obj.Att3 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att3' id='DownloadAtt3' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att3' id='DownloadAtt3' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                if (obj.Att4 !== undefined)
//                    row += "<tr><td>" + obj.Att4 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att4' id='DownloadAtt4' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att4' id='DownloadAtt4' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                if (obj.Att5 !== undefined)
//                    row += "<tr><td>" + obj.Att5 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att5' id='DownloadAtt5' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att5' id='DownloadAtt5' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//
//                $("#documentListTable tbody").append(row);
//                $("#overlay").css("display", "none");
//                $("#showSupprtingDocFromDMSModal").modal("show");
//            }
//        });
//    });

    $("#vendorcomparisonreporttable").on("click", ".view-download-supporting-documents", function() {

        $("#overlay").css("display", "block");

        var id = $(this).prop("id");
        console.log("id: " + id);
        var idArray = id.split("_");

        console.log("idArray Length: " + idArray.length);
        console.log("VendorCode: " + idArray[1]);
        console.log("LinkId: " + idArray[2]);
        console.log("PID: " + idArray[3]);

        var VendorCode = idArray[1];
        var LinkId = idArray[2];
        var PID = idArray[3];

        var rfqNumber = $("#rfqnumber :selected").text().split(" - ")[0];
        console.log("rfqNumber: " + rfqNumber);

        var xmlInput = "<InputCriteria>";
        xmlInput += "<LinkID>" + LinkId + "</LinkID>";
        xmlInput += "<PID>" + PID + "</PID>";
        xmlInput += "<RFQno>" + rfqNumber + "</RFQno>";
        xmlInput += "<VendorID>" + VendorCode + "</VendorID>";
        xmlInput += "</InputCriteria>";

        var dmsip = $("#dmsip").val();
        console.log("dmsip: " + dmsip);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var URLParam = xmlInput;
        console.log("URLParam: " + URLParam);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=" + LinkId + "&PID=" + PID + "&RFQno=" + rfqNumber + "&VendorID=" + VendorCode + "&BankForm=&PONO=&AckSupportingDocument=";
        console.log("serviceUrl: " + serviceUrl);

//        getDocumentDetailsByLinkIdAndPid("");
//        $("#overlay").css("display", "none");
//        $("#showSupprtingDocFromDMSModal").modal("show");

        $.ajax({
            type: "GET",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            data: URLParam,
            async: true,
            success: function(data, textStatus, jqXHR) {
//                alert("success: " + data);
                getDocumentDetailsByLinkIdAndPid(data);
                $("#overlay").css("display", "none");
                $("#showSupprtingDocFromDMSModal").modal("show");
            }
        });
    });

    $("#vendorFinalizationTable").on("change", ".pr-line-quantity", function() {
        var maxQty = $(this).prop("max");
        var changedQty = $(this).val();
        if (changedQty > maxQty)
        {
            console.log("++++++++++");
            $(this).val(maxQty);
        }
        if (Number(changedQty) < 0)
        {
            console.log("-----------");
            $(this).val(maxQty);
        }
        if (Number(changedQty) === -0)
        {
            console.log("-0-0-0-0-0-0-0-0-0-0-");
            $(this).val(maxQty);
        }
    });

    $("#vendorcomparisonreporttable").on("change", ".baseline-price-class", function() {
        $("#overlay").css("display", "block");
        var rfq_no = $("#rfqnumber").val();
        var buyerBaselinePrice = $(this).val();

        var baselineprice_filed_id = $(this).prop("id");
        console.log("baselineprice_filed_id: " + baselineprice_filed_id);

        var vendorId = baselineprice_filed_id.split("_")[1];
        var insertionOrderId = baselineprice_filed_id.split("_")[2];
        console.log(vendorId + ", " + insertionOrderId);

        var buyerTotalBaselinePrice = 0;
        var currentColIndex = $(this).parent().index();
        $("#vendorcomparisonreporttable").find("tbody tr").each(function(index) {
            if (index < totalPR)
            {
                var baselinePrice = $(this).find("td").eq(currentColIndex - 1).children(".baseline-price-class").val();
//                alert(baselinePrice);
//                baselinePrice = baselinePrice.replace(",", "");
                buyerTotalBaselinePrice += Number(baselinePrice);
            }
            if (index === totalPR)
            {
                $(this).find("td").eq(currentColIndex - 1).children(".total-price").val(buyerTotalBaselinePrice);
            }
        });
        console.log("buyerTotalBaselinePrice: " + buyerTotalBaselinePrice);

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: true,
            data: {
                "reqFrom": "UpdateBuyerBaselinePrice",
                "rfqId": rfq_no,
                "vendorId": vendorId,
                "insertionOrderId": insertionOrderId,
                "buyerBaselinePrice": buyerBaselinePrice,
                "buyerTotalBaselinePrice": buyerTotalBaselinePrice
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
            }
        });

    });
    $("#vendorcomparisonreporttable").on("change", ".rated-paramter", function() {
        $("#overlay").css("display", "block");
        var rfq_no = $("#rfqnumber").val();
//        alert(rfq_no);
        var rated_parameter_value = $(this).val();
        console.log("rated_parameter_value: " + rated_parameter_value);

        var rated_parameter = $(this).prop("id");
        var parameterType = rated_parameter.split("_")[0];
        var vendorId = rated_parameter.split("_")[1];

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: true,
            data: {
                "reqFrom": "UpdateBuyerRatedParameter",
                "rfqId": rfq_no,
                "vendorId": vendorId,
                "parameterType": parameterType,
                "parameterValue": rated_parameter_value
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
            }
        });
    });
    $("#vendorcomparisonreporttable").on("change", ".score-select", function() {
        $("#overlay").css("display", "block");
        var rfq_no = $("#rfqnumber").val();
//        alert(rfq_no);
        var score = $(this).val();
        console.log("score: " + score);

        var rated_parameter = $(this).parent().children(".rated-paramter").prop("id");
        var parameterType = rated_parameter.split("_")[0];
        var vendorId = rated_parameter.split("_")[1];

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: true,
            data: {
                "reqFrom": "UpdateBuyerRatedParameterScore",
                "rfqId": rfq_no,
                "vendorId": vendorId,
                "parameterType": parameterType,
                "score": score
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
            }
        });
    });

    $("#vendorFinalizationTable").on("click", ".vendorCheckboxToCreatePO", function() {
        var vendorId = $(this).parent().parent().find("td").eq(1).children(".vendor-select").val();
        var prId = $(this).parent().prop("id");
        console.log("VendorId, PrId: " + vendorId + ", " + prId);
        if ($(this).prop("checked"))
        {

        }
        else
        {

        }
    });

    var createPoNotifyAlert = null;
    $("#createPOBtn").click(function() {
        var rfqid = $("#rfqnumber").val();
        var reqFrom = "byprids";
        var prIdArray = [];
        var vendorFinalizationTableDataArray = [];
        var isValid = "Yes";
        var isPrSelected = "No";
        var SelectedVendorId = "";
        var tempVendorIdArray = [];
        console.log("rfqid: " + rfqid);
        var isProspect = "No";
        $("#vendorFinalizationTable").find("tbody tr").each(function(index) {
            var isChecked = $(this).find("th").eq(0).children(".vendorCheckboxToCreatePO").prop("checked");
            if (isChecked === true)
            {
                if ($(this).find("td").eq(0).children(".pr-line-quantity").val() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(0).children(".pr-line-quantity").focus();
                    return false;
                }
                if ($(this).find("td").eq(2).children(".comments").val() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(2).children(".comments").focus();
                    if (createPoNotifyAlert !== null)
                    {
                        createPoNotifyAlert.remove();
                    }
                    createPoNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Please Enter Comments!"
                    });
                    return false;
                }
                if ($(this).find("td").eq(3).children(".why-this-vendor").val() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(3).children(".why-this-vendor").focus();
                    if (createPoNotifyAlert !== null)
                    {
                        createPoNotifyAlert.remove();
                    }
                    createPoNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: "Please Enter Comments in Why was this vendor selected!"
                    });
                    return false;
                }
                isPrSelected = "Yes";
                SelectedVendorId = $(this).find("td").eq(1).children(".vendor-select").val();
                prIdArray.push($(this).find("th").eq(0).prop("id"));

                var vendorFinalizationTableDataObject = {};

                var selectedVendor = $(this).find("td").eq(1).children(".vendor-select").val();
                if (selectedVendor !== "")
                {
                    vendorFinalizationTableDataObject["vendorId"] = $(this).find("td").eq(1).children(".vendor-select").val();
                    tempVendorIdArray.push(SelectedVendorId);
                }
                else
                {
                    vendorFinalizationTableDataObject["vendorId"] = $(this).find("th").eq(0).children(".vendorCheckboxToCreatePO").val();
                    tempVendorIdArray.push($(this).find("th").eq(0).children(".vendorCheckboxToCreatePO").val());
                    SelectedVendorId = $(this).find("th").eq(0).children(".vendorCheckboxToCreatePO").val();
                }

                vendorFinalizationTableDataObject["insertionOrderId"] = $(this).find("th").eq(0).prop("id");
                vendorFinalizationTableDataObject["quantity"] = $(this).find("td").eq(0).children(".pr-line-quantity").val();
                vendorFinalizationTableDataObject["comments"] = $(this).find("td").eq(2).children(".comments").val();
                vendorFinalizationTableDataObject["whyThisVendor"] = $(this).find("td").eq(3).children(".why-this-vendor").val();

                $.ajax({
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data: {
                        "reqFrom": "findVendorById",
                        "vendorid": vendorFinalizationTableDataObject["vendorId"]
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        var vendorCode = obj.Code;
                        var type = obj.TYPE;
                        var vendorName = obj.FIRST_NAME + " " + obj.LAST_NAME;

                        console.log("vendorCode: " + vendorCode);
                        console.log("type: " + type);
                        console.log("vendorName: " + vendorName);

                        if (type === "Prospect")
                        {
                            isProspect = "Yes";
                            Lobibox.alert("error",
                                    {
                                        msg: "'" + vendorName + "' is not a vendor, kindly contact to Administrator !"
                                    });
                            return false;
                        }
                    }
                });

                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "FindVendorPerUnitPrice",
                        "vendorId": vendorFinalizationTableDataObject["vendorId"],
                        "insertionOrderId": vendorFinalizationTableDataObject["insertionOrderId"],
                        "rfqId": rfqid
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("vendorPerUnitPrice: " + obj.vendorPerUnitPrice);
                        vendorFinalizationTableDataObject["vendorPerUnitPrice"] = obj.vendorPerUnitPrice;
                    }
                });

                vendorFinalizationTableDataArray.push(vendorFinalizationTableDataObject);
            }
        });

        var vendorFinalizationTableDataArrayAsJsonString = JSON.stringify(vendorFinalizationTableDataArray);
        console.log("vendorFinalizationTableDataArrayAsJsonString: " + vendorFinalizationTableDataArrayAsJsonString);

        console.log("SelectedVendorId: " + SelectedVendorId);

        if (isValid === "No")
        {
            return false;
        }
        if (isProspect === "Yes")
        {
            return false;
        }
        if (isPrSelected === "No")
        {
            Lobibox.alert("error",
                    {
                        msg: "Please select atleast one PR!"
                    });
            return false;
        }

        var temp = AllTheSame(tempVendorIdArray);
        console.log("temp: " + temp);
        if (!temp)
        {
            Lobibox.alert("error",
                    {
                        msg: "Please select same vendors!"
                    });
            return false;
        }

        Lobibox.confirm({
            msg: "Are you sure you want to create PO ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("yes");

                    $("#vendorFinalizationTableDataArrayAsJsonString").val(vendorFinalizationTableDataArrayAsJsonString);
                    $("#rfqid").val(rfqid);
                    $("#reqFrom").val(reqFrom);
                    $("#SelectedVendorId").val(SelectedVendorId);
                    $("#prids").val(prIdArray.toString());

                    $("#orderEvaluationForm").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    $("#vendorFinalizationTable").on("change", ".vendor-select", function() {
        var areAllVendorSelected = true;
        $("#vendorFinalizationTable").find("tbody tr").each(function(index) {
            var vendorId = $(this).find("td").eq(1).children(".vendor-select").val();
            console.log("vendorId: " + vendorId);
            if (vendorId === "")
            {
                areAllVendorSelected = false;
            }
        });

        if (areAllVendorSelected === true)
        {
            $("#finalizeVendorBtn").prop("disabled", false);
        }
        else
        {
            $("#finalizeVendorBtn").prop("disabled", true);
        }
    });

    var finalizeVendorNotifyAlert = null;
    $("#finalizeVendorBtn").click(function() {

//        alert("sdas");
        var rfq_no = $("#rfqnumber").val();
        var vendorId = "";
        var insertionOrderId = "";
        var comments = "";
        var whyThisVendor = "";
        var isValid = "Yes";
        var quantity = "";
        var isProspect = "No";
        $("#vendorFinalizationTable").find("tbody tr").each(function(index) {
//            alert(index);
            if ($(this).find("td").eq(0).children(".pr-line-quantity").val() === "")
            {
                isValid = "No";
                $(this).find("td").eq(0).children(".pr-line-quantity").css("border-color", "red");
                $(this).find("td").eq(0).children(".pr-line-quantity").focus();
                return false;
            }
            if ($(this).find("td").eq(1).children(".vendor-select").val() === "")
            {
                isValid = "No";
                $(this).find("td").eq(1).children(".vendor-select").focus();
                return false;
            }
            if ($(this).find("td").eq(2).children(".comments").val() === "")
            {
                isValid = "No";
                $(this).find("td").eq(2).children(".comments").css("border-color", "red");
                $(this).find("td").eq(2).children(".comments").focus();
                if (finalizeVendorNotifyAlert !== null)
                {
                    finalizeVendorNotifyAlert.remove();
                }
                finalizeVendorNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please Enter Comments!"
                });
                return false;
            }
            if ($(this).find("td").eq(3).children(".why-this-vendor").val() === "")
            {
                isValid = "No";
                $(this).find("td").eq(3).children(".why-this-vendor").css("border-color", "red");
                $(this).find("td").eq(3).children(".why-this-vendor").focus();
                if (finalizeVendorNotifyAlert !== null)
                {
                    finalizeVendorNotifyAlert.remove();
                }
                finalizeVendorNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please Enter Comments in Why was this vendor selected!"
                });
                return false;
            }

            vendorId += $(this).find("td").eq(1).children(".vendor-select").val() + "#";
            insertionOrderId += $(this).find("td").eq(1).prop("id").split("_")[1] + "#";
            comments += $(this).find("td").eq(2).children(".comments").val() + "#";
            whyThisVendor += $(this).find("td").eq(3).children(".why-this-vendor").val() + "#";
            quantity += $(this).find("td").eq(0).children(".pr-line-quantity").val() + "#";

            var id = $(this).find("td").eq(1).children(".vendor-select").val();
            console.log("id: " + id);

            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "findVendorById",
                    "vendorid": id
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);

                    var vendorCode = obj.Code;
                    var type = obj.TYPE;
                    var vendorName = obj.FIRST_NAME + " " + obj.LAST_NAME;

                    console.log("vendorCode: " + vendorCode);
                    console.log("type: " + type);
                    console.log("vendorName: " + vendorName);

                    if (type === "Prospect")
                    {
                        isProspect = "Yes";
                        Lobibox.alert("error",
                                {
                                    msg: "'" + vendorName + "' is not a vendor, kindly contact to Administrator !"
                                });
                        return false;
                    }
                }
            });

        });
        console.log(vendorId + " " + comments + " " + whyThisVendor + " " + insertionOrderId + " " + quantity);
        if (isValid === "No")
        {
            return false;
        }
        if (isProspect === "Yes")
        {
            return false;
        }


        Lobibox.confirm({
            msg: "Are you sure you want to finalize this RFQ ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    $("#overlay").css("display", "block");

                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: true,
                        data: {
                            "reqFrom": "FinalizeVendorForRfq",
                            "rfqId": rfq_no,
                            "vendorId": vendorId,
                            "insertionOrderId": insertionOrderId,
                            "comments": comments,
                            "whyThisVendor": whyThisVendor,
                            "quantity": quantity
                        },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
                            var rfqNo = obj.RfqNo;
                            $("#overlay").css("display", "none");

                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: rfqNo + " has been finalized successfully.",
                                        callback: function(lobibox, type) {
                                            location.href = "vendorresponses.do";
                                        }
                                    });
                            $("#createPOBtn").prop("disabled", false);
                            $("#finalizeVendorBtn").prop("disabled", true);
                        }
                    });

                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });
    $("#vendorFinalizationTable").on("change", ".comments", function() {
        $(this).css("border-color", "gray");
    });
    $("#vendorFinalizationTable").on("change", ".why-this-vendor", function() {
        $(this).css("border-color", "gray");
    });
    $("#vendorFinalizationTable").on("change", ".pr-line-quantity", function() {
        $(this).css("border-color", "gray");
    });
    $("#getDocumentsFromDMS").click(function() {
        $("#showSupprtingDocFromDMSModal").modal("show");
    });
    $("#registerprospectbtn").click(function() {
        $("#registerprospectmodalform").trigger("reset");
        $("#registerprospect").modal("show");
    });
    $("#registerprospectmodalform").submit(function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        var isFormValidated = $(this).parsley().validate();
        console.log("isFormValidated: " + isFormValidated);

        if (isFormValidated === true)
        {
            $("#registerprospect").modal("hide");
            $.ajax(
                    {
                        type: "POST",
                        url: "saveprospectfromrfq.do",
                        async: true,
                        data: formData,
//                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        beforeSend: function() {
                            $("#overlay").css("display", "block");
                        },
                        error: function() {
                            $("#overlay").css("display", "none");
                        },
                        complete: function(responseJson)
                        {
                            $("#overlay").css("display", "none");
                            var obj = $.parseJSON(responseJson.responseText);

                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Prospect created successfully."
                                    });

                            $.ajax({
                                type: "GET",
                                url: "standalonepoajaxrequest.do",
                                async: false,
                                data: {
                                    "reqFrom": "FindActiveVendorAndProspect"
                                },
                                complete: function(responseJson) {
                                    var obj = $.parseJSON(responseJson.responseText);
                                    var venodorArr = obj.VendorArr;
                                    var ProspectArr = obj.ProspectArr;

                                    console.log("venodorArr: " + venodorArr.length);
                                    console.log("ProspectArr: " + ProspectArr.length);

                                    $("#vendors option").remove();

                                    var vendorTemp = "";
                                    var prospectTemp = "";

                                    for (var i = 0; i < venodorArr.length; i++)
                                    {
                                        vendorTemp += "<option value='" + venodorArr[i].id + "'>" + venodorArr[i].firstname + " " + venodorArr[i].lastname + "</option>";
                                    }
                                    for (var i = 0; i < ProspectArr.length; i++)
                                    {
                                        prospectTemp += "<option value='" + ProspectArr[i].id + "'>" + ProspectArr[i].prospectvendorname + "</option>";
                                    }

                                    $("#associateVendorGroup").append(vendorTemp);
                                    $("#prospectgroup").append(prospectTemp);

                                    $("#vendors").selectpicker("refresh");
                                }
                            });
                        }
                    });
        }
        else
        {
            return false;
        }
    });

    //--------------------------------------------------Vendor Picklist Starts------------------------------------------------------------------------//
    // Btn to open vendor modal
    $("#addvendorsbtnfrommodal").click(function() {
        var vendorType = $("#vendorType").val();
        console.log("vendorType: " + vendorType);
        
        $("#overlay").css("display", "block");
        setTimeout(function() {
            if(vendorType === "PortalVendor") {
                findActiveVendorsAndProspectFromVendorDetailsInRfq();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInRfq();
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
                findActiveVendorsAndProspectFromVendorDetailsInRfq();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInRfq();
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
                findActiveVendorsAndProspectFromVendorDetailsInRfq();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInRfq();
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
                findActiveVendorsAndProspectFromVendorDetailsInRfq();
            } else if(vendorType === "SapVendor") {
                findVendorsFromVendorMasterInRfq();
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
    
    $("#prospectvendorname").change(function() {
//        alert("dvv");
        var name = $(this).val();
        console.log("name: " + name);
        var size = checkProspectAvailibility(name);
//        alert(size);
        console.log("size: " + size);
        if (size > 0)
        {
            Lobibox.alert("error", {
                msg: "Prospect Already Added!"
            });
            $(this).val("");
        }
    });

    $("#groupname").change(function() {
//        alert("dvv");
        var name = $(this).val();
        console.log("name: " + name);
        var size = checkVendorGroupAvailibility(name);
//        alert(size);
        console.log("size: " + size);
        if (size > 0)
        {
            Lobibox.alert("error", {
                msg: "Group Already Added!"
            });
            $(this).val("");
        }
    });

//    var vendorids_rfp = [];
//    var vendor_rfp = [];
//    $("#add_vendor_rfp").click(function() {
////        var vendorids_rfp = [];
////       alert("bittu");
//        var vendorname = $("#vendorname option:selected").text();
//        var companycode = $("#companycode").val();
//        var vendoraddress = $("#vendoraddress").val();
//        var vendoremail = $("#vendoremail").val();
//        var vendorid = $("#vendorname").val();
//
//
//
//        if (vendorname === "") {
//            Lobibox.alert("error", {
//                msg: "Please select Vendor!"
//            });
//            return false;
//        }
//
//        if (vendorids_rfp.length === 0) {
//            vendor_rfp.push(vendorid);
//            vendorids_rfp.push(vendorid);
//        } else {
//
//            var n = vendorids_rfp.includes(vendorid);
////            alert(n);
//            if (n === true) {
//                Lobibox.alert("error", {
//                    msg: "Vendor already selected, please select Another Vendor!"
//                });
//                return false;
//            } else {
//                vendor_rfp.push(vendorid);
//
//                vendorids_rfp.push(vendorid);
//
//            }
//        }
//
////        var rows = $('#rfq_vendor_table tbody tr.rfq_vendor_table_class').length;
////        alert(rows);
//        var row = "";
//        row = "<tr><td>" + vendorname + "</td><td>" + companycode + "</td><td>" + vendoraddress + "</td><td>" + vendoremail + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass_rfp' name='vendorid' value=" + vendorid + "></td></tr>";
//
//        $("#rfp_vendor_table").children("tbody").append(row);
//
//        $("#vendorname").val("");
//        $("#companycode").val("");
//        $("#vendoraddress").val("");
//        $("#vendoremail").val("");
//        $("#ro_vendorname").val(vendor_rfp.toString());
//    });

    $("#rfp_vendor_table").on("click", ".deleteRow", function() {
        var vname = $("#ro_vendorname_rfp").val();

        var id = $(this).parent().find(".vendorclass_rfp").val();
//        alert(vname);
        var arr = vname.split(",");
        var index = arr.indexOf(id);
        if (index > -1) {
            arr.splice(index, 1);
            $("#ro_vendorname").val(arr);
        }
        $(this).parent().parent().remove();

        $("#rfq_vendor_table").trigger('update');
    });


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

//    if ($("#rfqvaliduntil_div").length) {
//        $('#rfqvaliduntil_div').datetimepicker({
//            format: 'DD-MM-YYYY',
//            minDate: new Date()
//        });
//    }
//    if ($("#expecteddeliverydate_div").length) {
//        $('#expecteddeliverydate_div').datetimepicker({
//            format: 'DD-MM-YYYY',
//            minDate: new Date()
//        });
//    }

    if ($("#rfqvaliduntil_div").length) {
        $(function() {
            $('#rfqvaliduntil_div').datetimepicker({
                format: 'DD.MM.YYYY',
                minDate: new Date()
            });
            $('#expecteddeliverydate_div').datetimepicker({
                useCurrent: false,
                format: 'DD.MM.YYYY',
                minDate: new Date()
            });
            $("#rfqvaliduntil_div").on("change.datetimepicker", function(e) {
                $('#expecteddeliverydate_div').datetimepicker('minDate', e.date);
            });
            $("#expecteddeliverydate_div").on("change.datetimepicker", function(e) {
                $('#rfqvaliduntil_div').datetimepicker('maxDate', e.date);
            });
        });
    }

    $("#rfqvaliduntil").keydown(function() {
        return false;
    });
    $("#expecteddeliverydate").keydown(function() {
        return false;
    });
    $("#expectedDeliveryDate").keydown(function() {
        return false;
    });

    var selectedVendorIds = [];
    var selectedVendorDetailsArr = [];

    var sapSelectedVendorCode = [];
    var sapSelectedVendorDetails = [];

    $("#addVendorsDetailsModalTableId").on('click', '.select-vendor-from-modal', function() {
        var id = $(this).val();
        var vendorType = $(this).parent().children(".vendor-type").val();
        console.log("id: " + id);
        console.log("vendorType: " + vendorType);

        if (vendorType !== "SAP")
        {
            console.log("Selected vendor is not SAP vendor!");

            var tempArr = [];
            tempArr = $("#ro_vendorname").val().split(",");
            console.log("Selected Vendor Array: " + tempArr);
            console.log("selectedVendorIds len: " + selectedVendorIds.length);
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
                    console.log("selectedVendorIds: " + selectedVendorIds);
                    selectedVendorIds.push(id);
                    selectedVendorDetailsArr.push(vendorDetails);
                }
                else
                {
                    var index = selectedVendorIds.indexOf(id);
                    console.log("index: " + index);

                    selectedVendorIds.splice(index, 1);
                    selectedVendorDetailsArr.splice(index, 1);
                }
                console.log("selectedVendorIds.toString(): " + selectedVendorIds.toString());
                $("#ro_vendorname").val(selectedVendorIds.toString());
            }
        }
        else
        {
            console.log("Selected vendor is SAP vendor!");

            var tempArr = [];
            tempArr = $("#ro_sapVendorCode").val().split(",");
            console.log("Selected SAP Vendor Array: " + tempArr);
            console.log("selectedSAPVendorIds len: " + sapSelectedVendorCode.length);
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
                    sapSelectedVendorCode.push(id);
                    sapSelectedVendorDetails.push(vendorDetails);
                }
                else
                {
                    var index = sapSelectedVendorCode.indexOf(id);
                    console.log("index: " + index);

                    sapSelectedVendorCode.splice(index, 1);
                    sapSelectedVendorDetails.splice(index, 1);
                }
                $("#ro_sapVendorCode").val(sapSelectedVendorCode.toString());
            }
        }
    });

    $("#addselectedvendortotable").click(function() {
        if (selectedVendorIds.length === 0 && sapSelectedVendorCode.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        }
        else
        {
            $("#rfq_vendor_table tbody tr").remove();
            var row = "";

            // Vendor or Prospect
            for (var i = 0; i < selectedVendorIds.length; i++)
            {
                row += "<tr><td>" + selectedVendorDetailsArr[i].vendorName + "</td><td>" + selectedVendorDetailsArr[i].compCode + "</td><td>" + selectedVendorDetailsArr[i].address + "</td><td>" + selectedVendorDetailsArr[i].emailId + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + selectedVendorDetailsArr[i].vendorId + "><input type='hidden' class='selected-vendor-type' value='Vendor'></td></tr>";
            }

            // SAP Vendors
            for (var i = 0; i < sapSelectedVendorCode.length; i++)
            {
                row += "<tr><td>" + sapSelectedVendorDetails[i].vendorName + "</td><td>" + sapSelectedVendorDetails[i].compCode + "</td><td>" + sapSelectedVendorDetails[i].address + "</td><td>" + sapSelectedVendorDetails[i].emailId + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + sapSelectedVendorDetails[i].vendorId + "><input type='hidden' class='selected-vendor-type' value='SAP'></td></tr>";
            }

            $("#rfq_vendor_table").children("tbody").append(row);
            $("#addVendorsDetailsModal").modal("hide");

            $("#rfq_vendor_table").trigger('update');
        }
    });

    $("#rfq_vendor_table").on("click", ".deleteRow", function() {
        console.log("selectedVendorIds: " + selectedVendorIds);
        console.log("sapSelectedVendorCode: " + sapSelectedVendorCode);

        var vname = $("#ro_vendorname").val();
        var sapVendorCodes = $("#ro_sapVendorCode").val();
        var id = $(this).parent().find(".vendorclass").val();
        var selectedVendorType = $(this).parent().find(".selected-vendor-type").val();
        console.log("selectedVendorType: " + selectedVendorType);

        if (selectedVendorType !== "SAP")
        {
            var arr = vname.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                selectedVendorDetailsArr.splice(index, 1);
                $("#ro_vendorname").val(arr);
                selectedVendorIds = $("#ro_vendorname").val().split(",");
            }
        }
        else
        {
            var arr = sapVendorCodes.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                sapSelectedVendorDetails.splice(index, 1);
                $("#ro_sapVendorCode").val(arr);
                sapSelectedVendorCode = $("#ro_sapVendorCode").val().split(",");
            }
        }
        $(this).parent().parent().remove();
        $("#rfq_vendor_table").trigger("update");
    });

    $("#addselectedvendortocreatedrfq").click(function() {
        if (selectedVendorIds.length === 0 && sapSelectedVendorCode.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        }
        else
        {
            $("#rfqdetails_vendor_table tbody tr").each(function() {
                var type = $(this).find('td').eq(1).children(".selected-vendor-type").val();
                if (type === "Vendor" || type === "SAP")
                {
                    $(this).remove();
                }
            });

            var row = "";
            // Vendor or Prospect
            for (var i = 0; i < selectedVendorIds.length; i++)
            {
                row += "<tr><td></td><td><i class='fa fa-trash deletevenodrfromrfq'></i><input type='hidden' class='selected-vendor-type' value='Vendor'><input type='hidden' class='vendorclass' name='vendorid' value=" + selectedVendorDetailsArr[i].vendorId + "></td><td>" + selectedVendorDetailsArr[i].vendorName + "</td><td>" + selectedVendorDetailsArr[i].compCode + "</td><td>" + selectedVendorDetailsArr[i].address + "</td><td>" + selectedVendorDetailsArr[i].emailId + "</td><td></td><td></td></tr>";
            }
            // SAP Vendors
            for (var i = 0; i < sapSelectedVendorCode.length; i++)
            {
                row += "<tr><td></td><td><i class='fa fa-trash deletevenodrfromrfq'></i><input type='hidden' class='selected-vendor-type' value='SAP'><input type='hidden' class='vendorclass' name='vendorid' value=" + sapSelectedVendorDetails[i].vendorId + "></td><td>" + sapSelectedVendorDetails[i].vendorName + "</td><td>" + sapSelectedVendorDetails[i].compCode + "</td><td>" + sapSelectedVendorDetails[i].address + "</td><td>" + sapSelectedVendorDetails[i].emailId + "</td><td></td><td></td></tr>";
            }
            $("#rfqdetails_vendor_table").children("tbody").append(row);
            $("#addVendorsDetailsModal").modal("hide");
        }
    });

    $("#rfqdetails_vendor_table").on("click", ".deletevenodrfromrfq", function() {
        console.log("selectedVendorIds: " + selectedVendorIds);
        console.log("sapSelectedVendorCode: " + sapSelectedVendorCode);

        var vname = $("#ro_vendorname").val();
        var sapVendorCodes = $("#ro_sapVendorCode").val();
        var id = $(this).parent().find(".vendorclass").val();
        var selectedVendorType = $(this).parent().find(".selected-vendor-type").val();
        console.log("selectedVendorType: " + selectedVendorType);

        if (selectedVendorType !== "SAP")
        {
            var arr = vname.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                selectedVendorDetailsArr.splice(index, 1);
                $("#ro_vendorname").val(arr);
                selectedVendorIds = $("#ro_vendorname").val().split(",");
            }
        }
        else
        {
            var arr = sapVendorCodes.split(",");
            var index = arr.indexOf(id);
            if (index > -1) {
                arr.splice(index, 1);
                sapSelectedVendorDetails.splice(index, 1);
                $("#ro_sapVendorCode").val(arr);
                sapSelectedVendorCode = $("#ro_sapVendorCode").val().split(",");
            }
        }
        $(this).parent().parent().remove();
    });

    $("#add_vendor").click(function() {
        var vendorids = [];
        var vendor = [];
        var emailidArr = [];
//        var vendorids = [];
//        alert("dsf");
        var vendorname = $("#vendorname option:selected").text();
        var companycode = $("#companycode").val();
        var vendoraddress = $("#vendoraddress").val();
        var vendoremail = $("#vendoremail").val();
        var vendorid = $("#vendorname").val();
        var ro_vendorids = $("#ro_vendorname").val();

//        emailidArr.push(vendoremail);
//        console.log("Email length :" + emailidArr.length);
//        for (var i = 0; i < emailidArr.length; i++) {
//            console.log("Email :" + emailidArr[i]);
//        }
//        alert(vendorid);
        if (vendorname === "")
        {
            Lobibox.alert("error", {
                msg: "Please select Vendor!"
            });
            return false;
        }

//        var l = $("#rfq_vendor_table").find("tbody tr").find("td").length;
//        alert(l);
        var ids = [];
        $(".rfq-vendor-table").find("tbody tr").each(function() {
//            alert($(this).find("td").eq(4).find(".vendorclass").val());
            var id = $(this).find("td").eq(4).find(".vendorclass").val();
//            alert(id);
            ids.push(id);
            console.log("Id :" + id);
        });
        if (ids.includes(vendorid)) {
            Lobibox.alert("error", {
                msg: "This vendor is already selected, please select Another vendor!"
            });
            return false;
        }



//        if (vendorids.length === 0) {
        vendor.push(vendorid);
        vendor.push(ro_vendorids);
//            vendorNameArr.push(vendorname);
//        } else {

//            var n = vendorids.includes(vendorid);
//            alert(n);
//            if (n === true) {
//                Lobibox.alert("error", {
//                    msg: "Vendor already selected, please select Another Vendor!"
//                });
//                return false;
//            } else {
//            vendor.push(vendorid);

//            vendorids.push(vendorid);
//                alert(vendor);
//                vendorNameArr.push(vendorname);

//            }
//            alert("vendorname:" + vendorNameArr);
//        }
//        alert(vendor);
////        $('#associateVendorGroup').selectpicker();
//        $('#associateVendorGroup').selectpicker('val', [1016]);
//        $('#associateVendorGroup').selectpicker('refresh');


        var row = "";
        row = "<tr><td>" + vendorname + "</td><td>" + companycode + "</td><td>" + vendoraddress + "</td><td>" + vendoremail + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + vendorid + "></td></tr>";

        $("#rfq_vendor_table").children("tbody").append(row);

        $("#vendorname").val("");
        $("#companycode").val("");
        $("#vendoraddress").val("");
        $("#vendoremail").val("");

//        vendorids.push(vendorid);

//        alert(vendorids.length);
        $("#ro_vendorname").val(vendor.toString());

        $("#associategroupmodal option").each(function()
        {
            // Add $(this).val() to your list

        });
//        var email = $(".rfq-vendor-table").find("tbody tr").find("td").eq(3).text();
//        alert()
//        $(".rfq-vendor-table").find("tbody tr").each(function() {
//            var email = $(this).find("td").eq(3).text();
////            alert(email);
//            emailidArr.push(email);
//        });
//        
//        console.log("emailidArr len :" + emailidArr.length);
//        for(var i=0;i<emailidArr.length;i++){
//        console.log("emailidArr :" + emailidArr[i]);
//        }
        $("#rfq_vendor_table").trigger('update');
    });

    $("#country").change(function() {
        var country = $("#country").val();
//        alert(country);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "findCountryCodeByCountryName",
                "country": country
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Data.COUNTRYCODE);
                var countrycode = obj.Data.COUNTRYCODE;
                $("#countrycode").val(countrycode);
            }
        });
    });


    $("#vendorname").change(function() {

        var vendorid = $(this).val();
        if (vendorid === '')
        {
            $("#vendordetailslink").css("visibility", "hidden");
        }
        else
        {
            $("#vendordetailslink").css("visibility", "visible");
            $("#vendor_id").val(vendorid);
        }

    });
    $("#vendordetailslink").click(function() {
        var id = $("#vendor_id").val();
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "findVendorById",
                "vendorid": id
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
//                alert(obj.Code);
                $("#update_code").val(obj.Code);
                $("#update_organization").val(obj.ORG);
                $("#update_firstname").val(obj.FIRST_NAME);
                $("#update_lastname").val(obj.LAST_NAME);
                $("#update_city").val(obj.CITY);
                $("#update_country").val(obj.COUNTRY);
                $("#update_address").val(obj.ADDRESS);
                $("#update_postalcode").val(obj.POSTAL_CODE);
                $("#update_emailid").val(obj.EMAIL_ID);
                $("#update_spocname").val(obj.SPOC_NAME);
                $("#update_spocemail").val(obj.SPOC_EMAIL);
                $("#update_vendoremailAuto").val(obj.ALT_EMAIL);
                $("#update_contactnumberoff").val(obj.CONTACT_NO_OFF);
                $("#update_contactnumbermob").val(obj.CONTACT_NO_MOB);
                $("#update_contactnumberfax").val(obj.CONTACT_NO_FAX);
                $("#update_paymentTerms").val(obj.PAYMENT_TERMS);
                $("#update_ordercurrency").val(obj.ORDER_CURRENCY);
                $("#update_natureOfPurchase").val(obj.NATURE_OF_PURCHASE);
                $("#update_companyRegNumber").val(obj.COMPANY_REG_NO);
                $("#update_gstRegNumber").val(obj.GST_NO);
            }

        });
        $("#vendordetailsmodal").modal('show');
    });

    $(".matlLongTextClass").click(function() {
//        alert("dsf");
//        $("#filterWorloadReportForm").trigger("reset");

        $("#matlLongTextModal").modal("show");

        var longtext = $(this).parent().children().eq(1).val();
//        $("#longtext").val(longtext);
        $('div.longtext').text(longtext);
//        alert(longtext);
    });

    $("#InternalRecipients").change(function() {
        var selected = $(':selected', this);
//        alert(selected.closest('optgroup').prop('label'));

//        $("#vendorids").val($(this).val());
    });

    $(".deassaiciate-pr").click(function() {
        var deassociateRow = $(this);

        Lobibox.confirm({
            msg: "Are you sure you want disassociate this pr line ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#overlay").css("display", "block");
                    var rfqLineId = deassociateRow.parent().children(".rfqLineId").val();
                    console.log("rfqLineId: " + rfqLineId);

                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: true,
                        data: {
                            "reqFrom": "DeassociatePrLineFromRfq",
                            "rfqLineId": rfqLineId
                        },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("obj.Result: " + obj.Result);

                            deassociateRow.parent().parent().remove();
                            $("#overlay").css("display", "none");

                            Lobibox.alert("success", {
                                msg: "PR Line has been deassociated.",
                                callback: function(lobibox, type) {
                                    var pr = $('#line_items_data_table tbody tr').length;
                                    console.log("pr: " + pr);
                                    if (pr === 0)
                                    {
                                        location.href = "mytask.do";
                                    }
                                }
                            });
                        }
                    });
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    $(".viewUploadedDocFromDB").click(function() {

        var prAttTempId = $(this).parent().parent().find("td").eq(9).children(".pr-att-temp").val();
        console.log("pr_att_temp_id: " + prAttTempId);
        if (prAttTempId === "non")
        {
            Lobibox.alert("error", {
                msg: "There are no documents uploaded for this PR Line!"
            });
            return false;
        }
        else
        {
            $("#overlay").css("display", "block");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: true,
                data: {
                    "reqFrom": "GetDocumentsFromWorkOrderAttTemp",
                    "prAttTempId": prAttTempId
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);

                    $("#documentListTable tbody tr").remove();
                    var row = "";

                    if (obj.Att1 !== undefined)
                        row += "<tr><td>" + obj.Att1 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att1' id='DownloadAtt1' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td><td><a href='#' id='DeleteAtt1_" + prAttTempId + "' class='deleteDocFromDB' title='Delete'><i class='fas fa-trash fa-x'></i></a></td></tr>";
                    if (obj.Att2 !== undefined)
                        row += "<tr><td>" + obj.Att2 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att2' id='DownloadAtt2' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td><td><a href='#' id='DeleteAtt2_" + prAttTempId + "' class='deleteDocFromDB' title='Delete'><i class='fas fa-trash fa-x'></i></a></td></tr>";
                    if (obj.Att3 !== undefined)
                        row += "<tr><td>" + obj.Att3 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att3' id='DownloadAtt3' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td><td><a href='#' id='DeleteAtt3_" + prAttTempId + "' class='deleteDocFromDB' title='Delete'><i class='fas fa-trash fa-x'></i></a></td></tr>";
                    if (obj.Att4 !== undefined)
                        row += "<tr><td>" + obj.Att4 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att4' id='DownloadAtt4' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td><td><a href='#' id='DeleteAtt4_" + prAttTempId + "' class='deleteDocFromDB' title='Delete'><i class='fas fa-trash fa-x'></i></a></td></tr>";
                    if (obj.Att5 !== undefined)
                        row += "<tr><td>" + obj.Att5 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att5' id='DownloadAtt5' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td><td><a href='#' id='DeleteAtt5_" + prAttTempId + "' class='deleteDocFromDB' title='Delete'><i class='fas fa-trash fa-x'></i></a></td></tr>";

                    $("#documentListTable tbody").append(row);
                    $("#overlay").css("display", "none");
                    $("#showUploadedDocFromDBModal").modal("show");
                }
            });
        }
    });

    $("#documentListTable").on("click", ".deleteDocFromDB", function() {
        console.log("deleteDocFromDB");
        var currentTR = $(this).parent().parent();
        console.log($(this).prop("id"));

        var attNo = $(this).prop("id").split("_")[0];
        var attId = $(this).prop("id").split("_")[1];

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "DeleteDocumentsFromWorkOrderAttTemp",
                "attId": attId,
                "attNo": attNo
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Result);

                currentTR.remove();
//                Lobibox.alert("success", {
//                    msg: "Document deleted successfully."
//                });

//                $("#showUploadedDocFromDBModal").modal("hide");

            }
        });
    });
    var tempArray = [];
    $(".rated-parameter-checkbox").click(function() {
        var isChecked = $(this).prop("checked");
        var paramtereId = $(this).prop("id");

//        alert(isChecked);
        console.log("isChecked: " + isChecked + ", paramtereId: " + paramtereId);
        if (isChecked === true)
        {
            $(this).parent().parent().find("td").eq(2).children(".rated-parameter-weight-class").prop("disabled", false);
            tempArray.push(paramtereId);
        }
        else
        {
            $(this).parent().parent().find("td").eq(2).children(".rated-parameter-weight-class").val("");
            $(this).parent().parent().find("td").eq(2).children(".rated-parameter-weight-class").prop("disabled", true);

            var index = tempArray.indexOf(paramtereId);
            tempArray.splice(index, 1);
        }
//        console.log("tempArray: " + tempArray);
    });

    var ratedParameterNotifyAlert = null;
    $("#submitRatedParameterBtn").click(function() {
        console.log("tempArray len: " + tempArray.length);
        var value = document.getElementById("MoqMovDetailsRatedParameterWeight").value;
        var value1 = document.getElementById("PaymentTermsRatedParameterWeight").value;
        var value2 = document.getElementById("BrandModelRatedParameterWeight").value;
        var value3 = document.getElementById("IncotermsRatedParameterWeight").value;
        var value4 = document.getElementById("ValidityOfOfferRatedParameterWeight").value;
        var value5 = document.getElementById("DeliveryLeadTimeRatedParameterWeight").value;
        var sum = 0;
        sum = Number(value) + Number(value1) + Number(value2) + Number(value3) + Number(value4) + Number(value5);
        console.log("Sum is ::" + sum);
        if (ratedParameterNotifyAlert !== null)
        {
            ratedParameterNotifyAlert.remove();
        }
        if ((value < 0 || value > 100) || (value1 < 0 || value1 > 100) || (value2 < 0 || value2 > 100) || (value3 < 0 || value3 > 100) || (value4 < 0 || value4 > 100) || (value5 < 0 || value5 > 100)) {
            console.log("Goku");
            ratedParameterNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Value should be between 0 -100!"
            });
            return false;
        }
        else if (sum > 101) {
            ratedParameterNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Sum of filled parameters is greater then 100.Kindly check!"
            });
            return false;
        }
        else if (tempArray.length !== 0 && sum !== 100) {
            ratedParameterNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Sum of filled parameters should be equal to 100.Kindly check!"
            });
            return false;
        }
        if (tempArray.length === 0)
        {
            ratedParameterNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select atleast one parameter !"
            });
            return false;
        }
        else
        {
            var isValid = "Yes";
            var parameterArray = [];
            var parameterWeightArray = [];

            $("#ratedParameterTable").find("tbody tr").each(function() {
//                alert($(this).index());
                if ($(this).find("td").eq(0).children(".rated-parameter-checkbox").prop("checked") === true && $(this).find("td").eq(2).children(".rated-parameter-weight-class").val() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(2).children(".rated-parameter-weight-class").focus();
                    $(this).find("td").eq(2).children(".rated-parameter-weight-class").css("border-color", "red");
                    return false;
                }
                else if ($(this).find("td").eq(0).children(".rated-parameter-checkbox").prop("checked") === true && $(this).find("td").eq(2).children(".rated-parameter-weight-class").val() !== "")
                {
                    parameterArray.push($(this).find("td").eq(0).children(".rated-parameter-checkbox").prop("id"));
                    parameterWeightArray.push($(this).find("td").eq(2).children(".rated-parameter-weight-class").val());
                }
            });
            if (isValid === "No")
            {
                return false;
            }
            else
            {
                $("#ratedParameterModal").modal("hide");
                console.log("parameterArray: " + parameterArray);
                console.log("parameterWeightArray: " + parameterWeightArray);

                $("#ratedParameterHidden").val(parameterArray.toString());
                $("#ratedParameterWeigthHidden").val(parameterWeightArray.toString());
            }
        }
    });
    $("#ratedParameterBtn").click(function() {
        $("#ratedParameterModal").modal({backdrop: 'static', keyboard: false});
        $("#ratedParameterModal").modal("show");
    });
    $(".rated-parameter-weight-class").change(function() {
        $(this).removeAttr("style");
    });

    $("#saveRfqDataBtn").click(function() {
        var url = window.location.search.substring(1);
        console.log("url: " + url);

        var pr = url.split("&")[0];
        var pr_id = pr.split("=")[1];
        console.log("pr_id: " + pr_id);

        var rfqtitle = $("#RFQTitle").val();
        var contactpersonename = $("#contactpersonename").val();
        var contactpersonetelno = $("#contactpersonetelno").val();
        var contactpersoneemail = $("#contactpersoneemail").val();
        var deliveryterms = $("#deliveryterms").val();
        var paymentterms = $("#paymentterms").val();
        var rfqvaliduntil = $("#rfqvaliduntil").val();
        var expecteddeliverydate = $("#expecteddeliverydate").val();
        var rfqparameter = $("#selectparameters").val();
        var ratedParameterHidden = $("#ratedParameterHidden").val();
        var prtype = $("#prtype").val();
        var tempRfqId = $("#tempRfqId").val();

        if (contactpersonename === '' && contactpersonetelno === '' && contactpersoneemail === '' && deliveryterms === '' && paymentterms === '' && rfqvaliduntil === '' && expecteddeliverydate === '' && rfqparameter == '') {
//            $("#parsley-id-9").addClass("parsley-errors-list");
//            $("#parsley_rfqtitle").text("This value is required.");
            $("#parsley-id-11").addClass("parsley-errors-list");
            $("#parsley_contactpersonename").text("This value is required.");
            $("#parsley-id-13").addClass("parsley-errors-list");
            $("#parsley_contactpersonetelno").text("This value is required.");
            $("#parsley-id-15").addClass("parsley-errors-list");
            $("#parsley_contactpersoneemail").text("This value is required.");
            $("#parsley-id-1").addClass("parsley-errors-list");
            $("#parsley_deliveryterms").text("This value is required.");
            $("#parsley-id-3").addClass("parsley-errors-list");
            $("#parsley_paymentterms").text("This value is required.");
            $("#parsley-id-5").addClass("parsley-errors-list");
            $("#parsley_rfqvaliduntil").text("This value is required.");
            $("#parsley-id-7").addClass("parsley-errors-list");
            $("#parsley_expecteddeliverydate").text("This value is required.");
            $("#parsley-id-17").addClass("parsley-errors-list");
            $("#parsley_rfqparameter").text("This value is required.");
            return false;
        }
        if (contactpersonename === '' || contactpersonetelno === '' || contactpersoneemail === '' || deliveryterms === '' || paymentterms === '' || rfqvaliduntil === '' || expecteddeliverydate === '') {
//                    alert("BIttu");
//            if (rfqtitle === '') {
//                $("#parsley-id-9").addClass("parsley-errors-list");
//                $("#parsley_rfqtitle").text("This value is required.");
//            }
            if (contactpersonename === '') {
                $("#parsley-id-11").addClass("parsley-errors-list");
                $("#parsley_contactpersonename").text("This value is required.");
            }
            if (contactpersonetelno === '') {
                $("#parsley-id-13").addClass("parsley-errors-list");
                $("#parsley_contactpersonetelno").text("This value is required.");
            }
            if (contactpersoneemail === '') {
                $("#parsley-id-15").addClass("parsley-errors-list");
                $("#parsley_contactpersoneemail").text("This value is required.");
            }
            if (deliveryterms === '') {
                $("#parsley-id-1").addClass("parsley-errors-list");
                $("#parsley_deliveryterms").text("This value is required.");
            }
            if (paymentterms === '') {
                $("#parsley-id-3").addClass("parsley-errors-list");
                $("#parsley_paymentterms").text("This value is required.");
            }
            if (rfqvaliduntil === '') {
                $("#parsley-id-5").addClass("parsley-errors-list");
                $("#parsley_rfqvaliduntil").text("This value is required.");
            }
            if (expecteddeliverydate === '') {
                $("#parsley-id-7").addClass("parsley-errors-list");
                $("#parsley_expecteddeliverydate").text("This value is required.");
            }
            return false;
        }
        if (contactpersonetelno !== '') {
            var tel_regx = /^((\(\d{3}\) ?)|(\d{3}))?\d{3}\d{4}$/;
            if (contactpersonetelno.length !== 10)
            {
                $("#parsley-id-13").addClass("parsley-errors-list");
                $("#parsley_contactpersonetelno").text("This field should contain exactly 10 digits.");
                return false;
            }
            if (!tel_regx.test(contactpersonetelno)) {
                $("#parsley-id-13").addClass("parsley-errors-list");
                $("#parsley_contactpersonetelno").text("This value seems to be invalid.");
                return false;
            }
        }
//        if (ratedParameterHidden === "")
//        {
//            Lobibox.alert("error", {
//                msg: "Please select rated parameters!"
//            });
//            return false;
//        }
        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: true,
            data: {
                "reqFrom": "SaveRfqDataInCreateRfq",
                "rfqTitle": rfqtitle,
                "rfqValidUntil": rfqvaliduntil,
                "deliveryTerms": deliveryterms,
                "paymentTerms": paymentterms,
                "expectedDeliveryDate": expecteddeliverydate,
                "contactPersoneName": contactpersonename,
                "contactPersoneTelNo": contactpersonetelno,
                "contactPersoneEmail": contactpersoneemail,
                "ratedParameterHidden": $("#ratedParameterHidden").val(),
                "ratedParameterWeigthHidden": $("#ratedParameterWeigthHidden").val(),
                "prType": prtype,
                "tempRfqId": tempRfqId,
                "prIds": pr_id
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("obj.RFQ_NUMBER: " + obj.RFQ_NUMBER);
                $("#rfqNumber").val(obj.RFQ_NUMBER);
                $("#overlay").css("display", "none");

                if (tempRfqId === "")
                {
                    Lobibox.alert("success", {
                        msg: "Data saved successfully against the temporary RFQ Number " + obj.RFQ_NUMBER
                    });
                }
                else
                {
                    Lobibox.alert("success", {
                        msg: "Data updated successfully against the temporary RFQ Number " + obj.RFQ_NUMBER
                    });
                }
            }
        });

    });
    //Convert Delivery Date formate
    $("#line_items_data_table tbody tr").each(function() {
        var delDate_Buyer = $(this).find("td").eq(5).text();
        var delDateCat = $(this).find("td").eq(0).children(".delDateAct").val();
        if (delDateCat === "D") {
            var delDate = delDate_Buyer.split(" ");
            var date = delDate[0].split("/");
            var month = date[1];
            var months = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "July", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"};
            var monthName = months[month];
            var newDD = date[0] + " " + monthName + " " + date[2];
            $(this).find("td").eq(5).text(newDD + " " + delDate[1]);
        }
    });

});


//$("#rfq_vendor_table").on("click", ".deleteRow", function() {
$("#vendorname").change(function() {

    var vendorid = $("#vendorname option:selected").val();
//    alert(vendorid);
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data:
                {
                    "reqFrom": "getVendorById",
                    "vendorid": vendorid
                },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
//            console.log(obj.Data.ADDRESS);
//            for(i=0;i<obj.Data.length;i++){
//                console.log(obj.Data[i].ADDRESS);
//            }
            console.log(obj.Data.ADDRESS);
            console.log(obj.Data.EMAILID);
            console.log(obj.Data.COMPANYCODE);

            var address = obj.Data.ADDRESS;
            var emailid = obj.Data.EMAILID;
            var companycode = obj.Data.COMPANYCODE;

            $("#vendoraddress").val(address);
            $("#vendoremail").val(emailid);
            $("#companycode").val(companycode);
        }
    });


});

//
//$("#contactpersonetelno").change(function() {
////   alert("Bittu"); 
//    var contactpersonetelno = $("#contactpersonetelno").val();
////    alert(contactpersonetelno);
//
//    tel_regx = /^((\(\d{3}\) ?)|(\d{3}))?\d{3}\d{4}$/;
//    if (contactpersonetelno === '') {
//        $("#parsley-id-5").addClass("parsley-errors-list");
//        $("#parsley_digits").text("This value is required.");
//         $("#parsley_required").text("");
//    } else
//    if (tel_regx.test(contactpersonetelno)) {
////        alert("BIttu");
//        $("#parsley-id-5").removeClass("parsley-errors-list");
//        $("#parsley_required").text("");
//        $(".sw-btn-next").prop("disabled", false);
//        $("#parsley_digits").text("");
//    } else if ($.isNumeric(contactpersonetelno)) {
////        alert("BIttu");
//        $("#parsley-id-5").addClass("parsley-errors-list");
//        $("#parsley_required").text("This field should contain exactly 10 digits.");
//        $(".sw-btn-next").prop("disabled", true);
//        $("#parsley_digits").text("");
//    } else {
//        $(".sw-btn-next").prop("disabled", true);
//        $("#parsley-id-5").addClass("parsley-errors-list");
//        $("#parsley_digits").text("This value seems to be invalid.");
//        $("#parsley_required").text("");
//    }
//});
//
//$("#contactpersoneemail").change(function() {
//    var contactpersoneemail = $("#contactpersoneemail").val();
//    var email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
////    var email_reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
//    if (contactpersoneemail === '') {
//        $("#parsley-id-7").addClass("parsley-errors-list");
//        $("#parsley_email").text("This value is required.");
//        $("#parsley_required_email").text(""); 
//    } else
//    if (email_reg.test(contactpersoneemail)) {
////        alert(contactpersoneemail);
//        $("#parsley-id-7").removeClass("parsley-errors-list");
//        $("#parsley_required_email").text(" ");
////        $("#parsley_required").text("");
//        $(".sw-btn-next").prop("disabled", false);
//    } else {
//        $("#parsley-id-7").addClass("parsley-errors-list");
//        $("#parsley_required_email").text("This value seems to be invalid.");
//        $("#parsley_email").text("");
//        $(".sw-btn-next").prop("disabled", true);
//    }
//});


$("#deliveryterms").change(function() {
    var deliveryterms = $("#deliveryterms").val();
    if (deliveryterms === '') {
        $("#parsley-id-1").addClass("parsley-errors-list");
        $("#parsley_deliveryterms").text("This value is required.");
    } else {
        var terms_regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
        if (!terms_regex.test(deliveryterms)) {
//                        alert(deliveryterms);
            $("#parsley-id-1").addClass("parsley-errors-list");
            $("#parsley_deliveryterms").text("Please enter only characters.");
            return false;
        } else {
            $("#parsley-id-1").removeClass("parsley-errors-list");
            $("#parsley_deliveryterms").text("");
        }
    }
    if (deliveryterms.length > 150)
    {
        $("#parsley-id-1").addClass("parsley-errors-list");
        $("#parsley_deliveryterms").text("Delivery Terms can not be more than 150 characters!");
        return false;
    }
});

$("#paymentterms").change(function() {
    $("#parsley-id-3").removeClass("parsley-errors-list");
    $("#parsley_paymentterms").text("");
});
$("#rfqvaliduntil").blur(function() {
//        alert("Bittu");
    $("#parsley-id-5").removeClass("parsley-errors-list");
    $("#parsley_rfqvaliduntil").text("");
});

$("#expecteddeliverydate").blur(function() {
    $("#parsley-id-7").removeClass("parsley-errors-list");
    $("#parsley_expecteddeliverydate").text("");
});
$("#selectparameters").change(function() {
    $("#parsley-id-17").removeClass("parsley-errors-list");
    $("#parsley_rfqparameter").text("");
});
$("#RFQTitle").change(function() {
    var RFQTitle = $("#RFQTitle").val();
    if (RFQTitle !== '') {
//        $("#parsley-id-9").addClass("parsley-errors-list");
//        $("#parsley_rfqtitle").text("This value is required.");
//    } else {
        var title_regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
        if (!title_regex.test(RFQTitle)) {
//                        alert(deliveryterms);
            $("#parsley-id-9").addClass("parsley-errors-list");
            $("#parsley_rfqtitle").text("Please enter only characters.");
            return false;
        } else {
            $("#parsley-id-9").removeClass("parsley-errors-list");
            $("#parsley_rfqtitle").text("");
        }
    } else {
        $("#parsley-id-9").removeClass("parsley-errors-list");
        $("#parsley_rfqtitle").text("");
    }
});
$("#contactpersonename").change(function() {
    var contactpersonename = $("#contactpersonename").val();
    if (contactpersonename === '') {
        $("#parsley-id-11").addClass("parsley-errors-list");
        $("#parsley_contactpersonename").text("This value is required.");
    } else {
//        var name_regex = /^[a-zA-Z]+$/;
        var name_regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
        if (!name_regex.test(contactpersonename)) {
//                        alert(deliveryterms);
            $("#parsley-id-11").addClass("parsley-errors-list");
            $("#parsley_contactpersonename").text("Please enter only characters.");
            return false;
        } else {
            $("#parsley-id-11").removeClass("parsley-errors-list");
            $("#parsley_contactpersonename").text("");
        }
    }
});

$("#contactpersonetelno").change(function() {
//   alert("Bittu"); 
    var contactpersonetelno = $("#contactpersonetelno").val();
//    alert(contactpersonetelno);
    var tel_regx = /^((\(\d{3}\) ?)|(\d{3}))?\d{3}\d{4}$/;
    if (contactpersonetelno === '') {
        $("#parsley-id-13").addClass("parsley-errors-list");
        $("#parsley_contactpersonetelno").text("This value is required.");
        return false;
    } else
    if (tel_regx.test(contactpersonetelno)) {
        $("#parsley-id-13").removeClass("parsley-errors-list");
        $("#parsley_contactpersonetelno").text("");
    } else if ($.isNumeric(contactpersonetelno)) {
        $("#parsley-id-13").addClass("parsley-errors-list");
        $("#parsley_contactpersonetelno").text("This field should contain exactly 10 digits.");
        return false;
    } else {
        $("#parsley-id-13").addClass("parsley-errors-list");
        $("#parsley_contactpersonetelno").text("This value seems to be invalid.");
        return false;
    }
    if (contactpersonetelno.length !== 10)
    {
        $("#parsley-id-13").addClass("parsley-errors-list");
        $("#parsley_contactpersonetelno").text("This field should contain exactly 10 digits.");
        return false;
    }
});
$("#contactpersoneemail").change(function() {
    var contactpersoneemail = $("#contactpersoneemail").val();
    var email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//    var email_reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if (contactpersoneemail === '')
    {
        $("#parsley-id-15").addClass("parsley-errors-list");
        $("#parsley_contactpersoneemail").text("This value is required.");
        return false;
    }
    else if (email_reg.test(contactpersoneemail))
    {
//        alert(contactpersoneemail);
        $("#parsley-id-15").removeClass("parsley-errors-list");
        $("#parsley_contactpersoneemail").text(" ");
    }
    else
    {
        $("#parsley-id-15").addClass("parsley-errors-list");
        $("#parsley_contactpersoneemail").text("This value seems to be invalid.");
        return false;
    }
    var email = contactpersoneemail.split(".");
    if (email.length === 2 && email[1].length === 2)
    {
        $("#parsley-id-15").addClass("parsley-errors-list");
        $("#parsley_contactpersoneemail").text("This value seems to be invalid.");
        return false;
    }
});
//
//$("#VendorRecipients").change(function() {
//    var VendorRecipients = $("#VendorRecipients").val()
//    if (VendorRecipients.toString().trim() === "") {
//
//        $("#parsley-id-21").addClass("parsley-errors-list");
//        $("#parsley_vendorrecipent").text("This value is required.");
//        return false;
//    } else {
//        $("#parsley-id-21").removeClass("parsley-errors-list");
//        $("#parsley_vendorrecipent").text("");
//    }
//});
//
//$("#InternalRecipients").change(function() {
//    var InternalRecipients = $("#InternalRecipients").val();
//    if (InternalRecipients.toString().trim() === "") {
//
//        $("#parsley-id-23").addClass("parsley-errors-list");
//        $("#parsley_internalrecipent").text("This value is required.");
//        return false;
//    } else {
//        $("#parsley-id-23").removeClass("parsley-errors-list");
//        $("#parsley_internalrecipent").text("");
//    }
//});
//
//$("#comment").change(function() {
//    var comment = $("#comment").val();
//    if (comment.toString().trim() === "") {
//
//        $("#parsley-id-25").addClass("parsley-errors-list");
//        $("#parsley_comment").text("This value is required.");
//        return false;
//    } else {
//        $("#parsley-id-25").removeClass("parsley-errors-list");
//        $("#parsley_comment").text("");
//    }
//});

$("#action").change(function() {
//   alert("bittu");
    var action = $("#action").val();
//    if (action === "On Hold") {
//        $("#deliveryterms").prop('readonly', false);
//        $("#paymentterms").prop('readonly', false);
//        $("#expectedDeliveryDate").prop('readonly', false);
//        $("#RFQTitle").prop('readonly', false);
//        $("#rfqRequestDate").prop('readonly', false);
//        $("#contactpersonename").prop('readonly', false);
//        $("#contactpersonetelno").prop('readonly', false);
//        $("#contactpersoneemail").prop('readonly', false);
//        $("#AutoSendPO").prop('disabled', false);
//        $("#NotifyVendor").prop('disabled', false);
//        $("#VendorRecipients").prop('readonly', false);
//        $("#InternalRecipients").prop('readonly', false);
////        $("#comment").prop('readonly', false);
//        $("#rfq_line_quantity").prop('disabled', false);
//    }
//    else {
//        $("#deliveryterms").prop('readonly', true);
//        $("#paymentterms").prop('readonly', true);
//        $("#expectedDeliveryDate").prop('readonly', true);
//        $("#RFQTitle").prop('readonly', true);
//        $("#rfqRequestDate").prop('readonly', true);
//        $("#contactpersonename").prop('readonly', true);
//        $("#contactpersonetelno").prop('readonly', true);
//        $("#contactpersoneemail").prop('readonly', true);
//        $("#AutoSendPO").prop('disabled', true);
//        $("#NotifyVendor").prop('disabled', true);
//        $("#VendorRecipients").prop('readonly', true);
//        $("#InternalRecipients").prop('readonly', true);
////        $("#comment").prop('readonly', true);
//        $("#rfq_line_quantity").prop('disabled', true);
//    }
});


function addRow()
{
    var table = document.getElementById("mytable");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = "S.No";
    cell2.innerHTML = "Catagory";
    cell3.innerHTML = "Sub-Catagory";
    cell4.innerHTML = "Item Code";
    cell5.innerHTML = "Item Name";
    cell6.innerHTML = "Target Price ($)";
    cell7.innerHTML = "Quantity";
    cell8.innerHTML = "<button id='myrow' onclick='deletefun(this)'>X</button>";
}
function deletefun(button)
{
    var empTab = document.getElementById('mytable');
    empTab.deleteRow(button.parentNode.parentNode.rowIndex);
}
function checkProspectAvailibility(name)
{
    var size = '';

    $.ajax(
            {
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data:
                        {
                            "reqFrom": "CheckProspectAvailibility",
                            "name": name
                        },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
//                    alert(obj.size);
                    size = obj.size;
                },
                error: function(data) {
                    alert("dataFail");
                }
            });
    return size;
}

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

function setNotifyVendorInRfpDetails()
{
    var isVendorNotified = $("#isVendorNotified").val();

    if (isVendorNotified === "Yes")
    {
        $("#notifyvendor").prop("checked", true);
    }
    else
    {

    }
}
function AllTheSame(array) {
    var first = array[0];
    return array.every(function(element) {
        return element === first;
    });
}

function formatNumberByComma(number)
{
    console.log("In formatNumberByComma");
    console.log("number: " + number);
    number = Number(number);
    var formatNumber = number.toLocaleString('en-US', {minimumFractionDigits: 3});
    console.log("formatNumber: " + formatNumber);
    return formatNumber;
}

function formatAmountByComma(amount)
{
    console.log("In formatAmountByComma");
    console.log("amount: " + amount);
    amount = Number(amount);
    var formatAmount = amount.toLocaleString('en-US', {minimumFractionDigits: 2});
    console.log("formatAmount: " + formatAmount);
    return formatAmount;
}

function removeCommaInNumber(formatNumber)
{
    console.log("In removeCommaInNumber");
    console.log("formatNumber: " + formatNumber);
    formatNumber = formatNumber.toString();
    var numberWOComma = formatNumber.replace(/,/g, '');
    console.log("numberWOComma: " + numberWOComma);
    return Number(numberWOComma);
}

var addVendorsDetailsModalTable = null;
function findActiveVendorsAndProspectFromVendorDetailsInRfq()
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

function findVendorsFromVendorMasterInRfq()
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