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


if ($("table.addVendorsDetailsModalTable_Id").length) {

    $(document).ready(function() {

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
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });

        var table = $('table.addVendorsDetailsModalTable_Id').DataTable({
//            "scrollY": 200,
//            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            fixedHeader: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: ['excel', 'pdf', 'print']
                }
            ]
        });

        table.buttons().container()
                .appendTo('#addVendorsDetailsModalTableId_wrapper .col-md-6:eq(0)');

    });
}

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
//                        buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'excel', title: 'MyTask'},
                            {extend: 'pdf', title: 'MyTask'},
                            {extend: 'print', title: 'MyTask'}
                        ]
                    }
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
                          //  {extend: 'copy', title: 'MyTask'},
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
                alert(tds);
                var qty = $(this).find("td").eq(9).children(".pr-line-item-qty").val();
                alert(qty);
                var pr_id = $(this).find("td").eq(9).children(".pr-id").val();
                alert(pr_id);
                var pr_att_temp_id = $(this).find("td").eq(9).children(".pr-att-temp").val();
                alert(pr_att_temp_id);
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

                var qty = $(this).find("td").eq(9).children(".pr-line-item-qty-afterRfqCreate").val();
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

 
         
    //$("#ro_vendorname").val($("#vendorname").val());
            var vendorname = $("#ro_vendorname").val();
           
           // $("#vendorname").val(vendorname);
      
            $("#co_deliveryterms").val($("#deliveryterms").val());
            $("#co_paymentterms").val($("#paymentterms").val());
            $("#co_rfqvaliduntil").val($("#rfqvaliduntil").val());
            $("#co_rfqcloseson").val($("#rfqcloseson").val());

      // alert($("#deliveryterms").val());

            $("#co_AutoSendPO").val($("#autosendpo").prop("checked"));
            $("#co_NotifyVendor").val($("#notifyvendor").prop("checked"));
            $("#co_VendorRecipients").val($("#vendorrecipients").val());
          //  alert($("#internalrecipients").val());
            $("#co_PORecipients1").val($("#porecipients1").prop("checked"));
            $("#co_InternalRecipients").val($("#internalrecipients").val());
            $("#co_PORecipients2").val($("#porecipients2").prop("checked"));
            $("#co_comment").val($("#comment").val());
          //  alert($("#autosendpo").prop("checked"));

            var line_items_data_table = $("#line_items_data_table tbody");


            var contract_ids = "";
            var contract_quantity = "";
            var contract_att_temp_ids = "";
           var ListnoteSupl = "";

            line_items_data_table.find("tr").each(function() {
                var tds = $(this).find("td");
                alert('tds'+tds);
                var qty = $(this).find("td").eq(7).children(".contract-line-item-qty").val();
                
                var noteSupl = $(this).find("td").eq(11).children(".noteToSupplier").val();
                alert('noteSupl'+noteSupl);
                var contract_id = $(this).find("td").eq(7).children(".contract-id").val();
                alert("contract_id"+contract_id);
               
                var contract_att_temp_id = $(this).find("td").eq(7).children(".contract-att-temp").val();
                 alert(contract_att_temp_id);
//                var baseline_price = $(this).find("td").eq(12).children().val();
                ListnoteSupl=ListnoteSupl+noteSupl+",";
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
            $("#ro_noteToSupl").val(ListnoteSupl);


            var contactpersonetelno = $("#contactpersonetelno").val();
            var contactpersoneemail = $("#contactpersoneemail").val();
            if (contactpersonetelno === '' && contactpersoneemail === '') {
                $("#parsley-id-5").addClass("parsley-errors-list");
                $("#parsley-id-7").addClass("parsley-errors-list");
                $("#parsley_digits").text("This value is required.");
                $("#parsley_email").text("This value is required.");
                Lobibox.alert("error", {
                    msg: "Please enter the required fields!"
                });
                return false;
            } else
            if (contactpersonetelno === '') {
                $("#parsley-id-5").addClass("parsley-errors-list");
                $("#parsley_digits").text("This value is required.");
                Lobibox.alert("error", {
                    msg: "Please enter the contact number!"
                });
                return false;
            } else
            if (contactpersoneemail === '') {
                $("#parsley-id-7").addClass("parsley-errors-list");
                $("#parsley_email").text("This value is required.");
//                $("#parsley_required_email").text("This value is required.");
                Lobibox.alert("error", {
                    msg: "Please enter the email id!"
                });
                return false;
            }
//         

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
        else if (rfq_operation === "update_contract_rfq") {
            
            Lobibox.confirm({
                msg: "Are you sure you want to update RFQ?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#updatecontractrfqdetailsform").submit();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
            
        }
        else if(rfq_operation === "create_rfp_contract")
        {
               Lobibox.confirm({
                msg: "Are you sure you want to create RFP for contract?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#rfpcontractdataform").submit();
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        }
    });
    
    $(".contract-line-item-qty").keyup(function() {
        if (parseInt(this.value) > parseInt(this.max) || parseInt(this.value) < 1) {
//            this.value = null;
            $(this).val(this.max);
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        } else if (this.value === '') {
            $(this).css('border-color', 'red');
//            $("#next-btn").addClass('disabled');
            $(".next-btn").prop("disabled", true);
//            var pr_id = $(this).parent().children(".pr-id").val();
        } else {
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        }
    });

    $(".pr-line-item-qty").keyup(function() {
        if (parseInt(this.value) > parseInt(this.max) || parseInt(this.value) < 1) {
//            this.value = null;
            $(this).val(this.max);
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        } else if (this.value === '') {
            $(this).css('border-color', 'red');
//            $("#next-btn").addClass('disabled');
            $(".next-btn").prop("disabled", true);
//            var pr_id = $(this).parent().children(".pr-id").val();
        } else {
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        }
    });

    $(".pr-line-item-qty-afterRfqCreate").keyup(function() {

        var usedQuantity = $(this).parent().children(".usedQuantity").val();
//        alert(usedQuantity);

        if ((parseInt(this.value) > parseInt(this.max) + parseInt(usedQuantity)) || parseInt(this.value) < 1)
        {
            $(this).val(usedQuantity);
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        }
        else if (this.value === '')
        {
            $(this).css('border-color', 'red');
            $(".next-btn").prop("disabled", true);
        }
        else
        {
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
        var linkId = $(this).parent().children(".linkIdClass").val();
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
                                            msg: "PR Line has been rejected."
                                        });
                                        location.href = "mytask.do";
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
//       alert($("#vendors").val());
        var vendors = $("#vendors").val();
        var groupname = $("#groupname").val();

        if (groupname === "")
        {
            Lobibox.alert("error", {
                msg: "Please enter group name!."
            });

            return false;
        }

        if (vendors == "")
        {
            Lobibox.alert("error", {
                msg: "Please select vendors!"
            });

            return false;
        }
//        alert(vendors);

        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "AssociateGroup",
                                "VendorIdList": vendors + "",
                                "GroupName": groupname
                            },
                    dataType: "json",
                    complete: function(responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);
                        //alert("done: " + arr.length);
//                        alert(obj.Result);
                        $("#associategroupmodal").modal("hide");
                        console.log(obj.GroupList.length);

                        $("#groupselect option").remove();
                        $("#groupselect").selectpicker("refresh");
                        for (var i = 0; i < obj.GroupList.length; i++)
                        {
                            $("<option>").val(obj.GroupList[i].GROUP_ID).text(obj.GroupList[i].GROUP_NAME).appendTo("#groupselect");
                        }
                        $("#groupselect").selectpicker("refresh");
//                        location.href = "pendingprlines.do";
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

//        if (groupid !== 'all') {
        $("#rfq_vendor_table tbody tr").remove();
//        var id= "";
        $("#ro_vendorname").val(vendor.toString());
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
                        var obj = $.parseJSON(responseJson.responseText);

//                        console.log(obj.Data.length);

//                            $("#vendorname optgroup").remove();

//                        $("#vendorname").selectpicker("refresh");
//                            $("#vendorname").selectpicker("destroy");

//                            var vendorGroup = $("<optgroup label='Vendor'>");
//                            var prospectGroup = $("<optgroup  label='Prospect'>");
                        if (obj.Data.length <= 0) {
                            Lobibox.alert("error", {
                                msg: "There are no vendors in this group, please select another group."
                            });

                        } else {

                            for (var i = 0; i < obj.Data.length; i++)
                            {
                                if (obj.Data[i].TYPE === "Vendor")
                                {
//                                $("<option>").val(obj.Data[i].VENDOR_ID).text(obj.Data[i].VENDOR_NAME).appendTo("#vendorname");
//                                    $("<option>").val(obj.Data[i].VENDOR_ID).text(obj.Data[i].VENDOR_NAME).appendTo(vendorGroup);

                                    var row = "";
                                    row = "<tr><td>" + obj.Data[i].VENDOR_NAME + "</td><td>" + obj.Data[i].COMPANY_CODE + "</td><td>" + obj.Data[i].ADDRESS + "</td><td>" + obj.Data[i].EMAIL + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + obj.Data[i].VENDOR_ID + "></td></tr>";

                                    $("#rfq_vendor_table").children("tbody").append(row);

//                                $("#ro_vendorname").val(obj.Data[i].VENDOR_ID);
                                    var vendorid = obj.Data[i].VENDOR_ID;
                                    vendor.push(vendorid);
                                    $("#ro_vendorname").val(vendor.toString());

//                                    $("#VendorRecipients option").remove();
//                                    $("#VendorRecipients").selectpicker("refresh");
//                                    for (var i = 0; i < obj.Data[i].length; i++)
//                                    {
//                                        $("<option>").val(obj.Data[i].EMAIL).text(obj.Data[i].EMAIL).appendTo("#VendorRecipients");
//                                    }
//                                    $("#VendorRecipients").selectpicker("refresh");

                                }
//                                else if (obj.Data[i].TYPE === "Prospect")
//                                {
//                                    $("<option>").val(obj.Data[i].VENDOR_ID).text(obj.Data[i].VENDOR_NAME).appendTo(prospectGroup);
//                                }
                            }
                            $("#rfq_vendor_table").trigger('update');
                        }



//                            vendorGroup.appendTo("#vendorname");
//                            prospectGroup.appendTo("#vendorname");

//                            $("#vendorname").selectpicker();
//                        $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");

                    }
                });
//        } else {
//            $.ajax(
//                    {
//                        type: "GET",
//                        url: "ajaxcontroller.do",
//                        async: false,
//                        data:
//                                {
//                                    "reqFrom": "ALLVENDORS"
//                                },
//                        dataType: "json",
//                        complete: function(responseJson)
//                        {
//                            var obj = $.parseJSON(responseJson.responseText);
//
////                            alert(obj.Data.length);
//
//                            console.log("length :" + obj.Data.length);
//
//                            $("#vendorname optgroup").remove();
////
////                            $("#vendorname").selectpicker("refresh");
//                            $("#vendorname").selectpicker("destroy");
////
//                            var vendorGroup = $("<optgroup label='Vendor'>");
//                            var prospectGroup = $("<optgroup  label='Prospect'>");
//
//                            for (var i = 0; i < obj.Data.length; i++)
//                            {
//                                if (obj.Data[i].TYPE === "Vendor")
//                                {
////                                    alert("bittu");
////                                $("<option>").val(obj.Data[i].VENDOR_ID).text(obj.Data[i].VENDOR_NAME).appendTo("#vendorname");
//                                    $("<option>").val(obj.Data[i].VENDOR_ID).text(obj.Data[i].VENDOR_NAME).appendTo(vendorGroup);
//
//                                    console.log(obj.Data[i].VENDOR_NAME);
//                                }
//                                else if (obj.Data[i].TYPE === "Prospect")
//                                {
//                                    $("<option>").val(obj.Data[i].VENDOR_ID).text(obj.Data[i].VENDOR_NAME).appendTo(prospectGroup);
//                                }
//                            }
//
//                            vendorGroup.appendTo("#vendorname");
//                            prospectGroup.appendTo("#vendorname");
//
//                            $("#vendorname").selectpicker();
////                        $(".btn.dropdown-toggle").addClass("selectpicker-bg-color");
//
//                        }
//                    });
//        }

        vendor = [];

//        var emailidArr = [];
//        $(".rfq-vendor-table").find("tbody tr").each(function() {
//            var email = $(this).find("td").eq(3).text();
////            alert(email);
//            emailidArr.push(email);
//        });
//
//        console.log("emailidArr len :" + emailidArr.length);
//        for (var i = 0; i < emailidArr.length; i++) {
//            console.log("emailidArr :" + emailidArr[i]);
////                    $("#VendorRecipients").val(emailidArr[i]);
//        }
//        $("#VendorRecipients option").remove();
////        $("#VendorRecipients").selectpicker("refresh");
//        for (var i = 0; i < emailidArr.length; i++)
//        {
//            $("<option>").val(emailidArr[i]).text(emailidArr[i]).appendTo("#VendorRecipients");
//        }
//        $("#VendorRecipients").selectpicker("refresh");
    });
//
//    $("#uploadprlinefilesubmitbtn").click(function() {
////        alert("sdasds");
//        var csrf = $("#prlinedocform :input[name=_csrf]").val();
//        console.log("_csrf: " + csrf);
//
//        var file_docDiv1 = $("input[name=file_docDiv1]").prop('files')[0];
//        console.log("file_docDiv1: " + file_docDiv1);
//
//        var file_docDiv2 = $("input[name=file_docDiv2]").prop('files');
//        console.log("file_docDiv2: " + file_docDiv2);
//
//        var file_docDiv3 = $("input[name=file_docDiv3]").prop('files');
//        console.log("file_docDiv3: " + file_docDiv3);
//
//        var file_docDiv4 = $("input[name=file_docDiv4]").prop('files');
//        console.log("file_docDiv4: " + file_docDiv4);
//
//        var file_docDiv5 = $("input[name=file_docDiv5]").prop('files');
//        console.log("file_docDiv5: " + file_docDiv5);
//
//
//    });

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
                                "reqFrom": "CMVendorComparisonReport",
                                "rfqNumber": rfq_no
                            },
                    dataType: "json",
                    complete: function(responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);

                        console.log("Vendors: " + obj.VendorData.length);
                        totalVendor = obj.VendorData.length;
                        var rfqStatus = obj.RfqStatus;
                        console.log("rfqStatus: " + rfqStatus);
                        
                        var ratedParametersList = obj.ratedParametersList;
                        console.log("ratedParametersList: " + ratedParametersList);
                        var ratedParameters = obj.ratedParameters;
                        console.log("ratedParameters: " + ratedParameters);

                        var thead_tr = "";
                        var tbody_tr = "";
                        var item_no_array = [];
                        var vendorRfqlineID_array=[];
                        
                        var currency_array = {};
                        var vendor_price_map = {};
                        var buyer_price_map = {};
                        var vendor_converted_price_map = {};
                         var vendor_insertion_map = {};
                        var vendorId_array = [];
                        var vendorIds = {};
                        var vendorSelectBox = '';
                        var vendorSelectBox1 = '';
                        var vendorFinalizationTable_tbody_tr = "";
                        var parameter = [];
                        thead_tr = "<tr>";
                        if (rfqStatus === "Closed") {
                            thead_tr += "<th class='sticky-cell'></th>";
                        }
                        thead_tr += "<th class='sticky-cell'>Vendor Details</th>";
                        vendorSelectBox = "<select class='custom-select vendor-select'>";
                        vendorSelectBox += "<option value=''>Select</option>";
                        vendorSelectBox1 = "<select class='custom-select vendor-select' style='width: 120px;'>";
                        vendorSelectBox1 += "<option value=''>Select</option>";
                        thead_tr += "<th>Quantity</th>";
                        for (var i = 0; i < obj.VendorData.length; i++)
                        {
                            console.log("Vendor Name: " + obj.VendorData[i].VendorName);
                            console.log("PR Length: " + obj.VendorData[i].PRDetails.length);
                            

                            var vendor_name = obj.VendorData[i].VendorName;
                            var vendor_currency = obj.VendorData[i].Currency;
                            var supplier_status = obj.VendorData[i].SupplierStatus;
                            var VendorId = obj.VendorData[i].VendorId;

                            vendorId_array.push(obj.VendorData[i].VendorId);
//                            thead_tr += "<th>" + vendor_name + " (price quoted)/ Baseline Price</th>";
                            
                            thead_tr += "<th>" + vendor_name + "</th>";
//<br>(Price Quoted in " + vendor_currency + ") / (Price Quoted in SGD) / (Baseline Price)</th>";
                            
                            if(supplier_status === "Bid Submitted") {
                                vendorSelectBox += "<option value='" + obj.VendorData[i].VendorId + "'>" + vendor_name + "</option>";
                                vendorSelectBox1 += "<option value='" + obj.VendorData[i].VendorId + "'>" + vendor_name + "</option>";
                            }
                            var price_temp_arr = [];
                            var qty_temp_arr = [];
                            
                            var availqty_temp_arr = [];
                            var buyer_price_temp_arr = [];
                            var vendor_converted_price_temp_arr = [];
                            var insertionOrderId_array = [];
                            
                            var buyer_price_temp_arr = [];
                           // var paramData="RatedParameters"+obj.VendorData[i].VendorId;
                            for (var k = 0; k < obj.VendorData[i].RatedParameters.length; k++)
                            {
                            var rated_array = obj.VendorData[i].RatedParameters;
                            if (i === 0)
                                {
                            parameter.push(rated_array[k].tagName);
                        }
                            }

                            for (var j = 0; j < obj.VendorData[i].PRDetails.length; j++)
                            {
                                var pr_array = obj.VendorData[i].PRDetails;
                                console.log(pr_array)
                                if (i === 0)
                                {
                                    item_no_array.push(pr_array[j].ItemNumber);
                                    
                                    console.log(pr_array[j].vendorRfqlineID)
                                    vendorRfqlineID_array.push(pr_array[j].vendorRfqlineID);
                                    console.log('----------------------------')
                                    console.log(vendorRfqlineID_array)
                                    
                                }
                                console.log('12-->');
                               console.log(pr_array[j].InsertionOrderId)
                                insertionOrderId_array.push(pr_array[j].InsertionOrderId);
                                price_temp_arr.push(pr_array[j].Price);
                                buyer_price_temp_arr.push(pr_array[j].BuyerBaselinePrice);
                                vendor_converted_price_temp_arr.push(pr_array[j].ConvertedPrice);
                                 console.log("Contract Qty:-"+pr_array[j].Quantity)
                                qty_temp_arr.push(pr_array[j].Quantity);
                                
                                availqty_temp_arr.push(pr_array[j].AvailQuantity);
                                
                            }
                            vendorIds[vendor_name]=VendorId;
                            vendor_price_map[vendor_name] = price_temp_arr;
                            currency_array[vendor_name]=vendor_currency;
                            buyer_price_map[vendor_name] = buyer_price_temp_arr;
                            vendor_converted_price_map[vendor_name] = vendor_converted_price_temp_arr;
                            console.log('12-->');console.log(insertionOrderId_array)
                            vendor_insertion_map[vendor_name]=insertionOrderId_array;
                        }
                        
                        thead_tr += "<th>Vendor</th>";
                            thead_tr += "<th>Comments</th>";
                            thead_tr += "<th>Why was this Vendor selected ?</th>";
                        thead_tr += "</tr>";
                        vendorSelectBox += "</select>";
                        vendorSelectBox1 += "</select>";
                        totalPR = item_no_array.length;
                       
                        var a = 0;
                        for (var k = 0; k < item_no_array.length; k++)
                        {
                            
                            
                            if (rfqStatus === "Closed")
                            {
                                console.log('*****************************************')
                                 console.log(vendorRfqlineID_array)
                                  console.log(k)
                                  console.log(vendorRfqlineID_array[k])
                                  console.log('*****************************************')
                                tbody_tr += "<tr><td><input type='checkbox' value='"+vendorRfqlineID_array[k]+"' class='checkbox-class'><input type='hidden' class='vendorrfqLineID' value='"+vendorRfqlineID_array[k]+"'/><input type='hidden' class='finalvendorID' value='"+obj.FinalizedVendorData[k].VendorId+"'/></td>";
                                tbody_tr += "<th class='sticky-cell'>" + item_no_array[k] + "</th>";
                                tbody_tr += "<td><input type='number' id='quantity' value='" + Number(qty_temp_arr[k]).toFixed(2) + "' class='quantity-class' disabled></td>";
                                vendorFinalizationTable_tbody_tr += "<tr><th>" + obj.FinalizedVendorData[k].ItemNumber + "</th><td>" + obj.FinalizedVendorData[k].VendorName + "</td><td><textarea cols='40' disabled='true'>" + obj.FinalizedVendorData[k].Comments + "</textarea></td><td><textarea cols='40' disabled='true'>" + obj.FinalizedVendorData[k].WhyThisVendor + "</textarea></td></tr>";
                            }
                            else
                            {
                                tbody_tr += "<tr><th class='sticky-cell'>" + item_no_array[k] + "</th>";
                                tbody_tr += "<td><input type='number' id='quantity' value='" + Number(qty_temp_arr[k]).toFixed(2) + "' class='quantity-class' ></td>";
                                vendorFinalizationTable_tbody_tr += "<tr><th>" + item_no_array[k] + "</th><td id='InsertionOrderId_" + insertionOrderId_array[k] + "'>" + vendorSelectBox + "</td><td><textarea cols='40' class='comments' disabled='true'></textarea></td><td><textarea cols='40' class='why-this-vendor' disabled='true'></textarea></td></tr>";
                            }
                            
                            for (var vendor in vendor_price_map)
                            {
                                 console.log("----------------------------------------------------------------");
                                console.log(vendor); 
                                console.log( vendor_price_map[vendor]);
                                var price_array = [];
                                price_array = vendor_price_map[vendor];
                                var buyer_price_array = [];
                                buyer_price_array = buyer_price_map[vendor];
                                var vendor_converted_price_array = [];
                                vendor_converted_price_array = vendor_converted_price_map[vendor];
                                console.log('123-->');
                                var insertionOrderId_array = [];
                                console.log(vendor_insertion_map);
                                insertionOrderId_array=vendor_insertion_map[vendor];
                                console.log('1234-->');console.log(insertionOrderId_array);
                               // tbody_tr+="<td>"
                                if (rfqStatus === "Closed"){
                                   
                                    tbody_tr += "<td>Price Quoted in  " + currency_array[vendor] + ":-"+ Number(price_array[k]).toFixed(2) + " <br> Price Quoted in SGD:- " + Number(vendor_converted_price_array[k]).toFixed(2) + " <br> Baseline Price:- <input type='number' id='price_" + vendorIds[vendor] + "_" + insertionOrderId_array[k] + "' value='" + Number(buyer_price_array[k]).toFixed(2) + "' class='baseline-price-class' disabled>\n\
\n\                                             <br>Quoted Qty:-"+availqty_temp_arr[k]+" <input type='hidden'  value='" + insertionOrderId_array[k] + "' class='line-class' ></td>";
                                } else{
                                   // tbody_tr += "<td><input type='number' id='quantity_" + vendorIds[vendor] + "_" + insertionOrderId_array[k] + "' value='" + Number(qty_temp_arr[k]).toFixed(2) + "' class='quantity-class'></td>";
                                    tbody_tr += "<td>Price Quoted in  " + currency_array[vendor] + ":-"+ Number(price_array[k]).toFixed(2) + " <br> Price Quoted in SGD:- " + Number(vendor_converted_price_array[k]).toFixed(2) + " <br> Baseline Price:- <input type='number' id='price_" + vendorIds[vendor] + "_" + insertionOrderId_array[k] + "' value='" + Number(buyer_price_array[k]).toFixed(2) + "' class='baseline-price-class'><br>Quoted Qty:-"+availqty_temp_arr[k]+"<input type='hidden'  value='" + insertionOrderId_array[k] + "' class='line-class' ></td>";
                                }
                                //console.log(vendorSelectBox1)
                                
                               
                                    a++;
                            }
                            
                            if (rfqStatus === "Closed")
                            {
                            tbody_tr += "<td>" + obj.FinalizedVendorData[k].VendorName + "</td><td><textarea cols='40' disabled='true'>" + obj.FinalizedVendorData[k].Comments + "</textarea></td><td><textarea cols='40' disabled='true'>" + obj.FinalizedVendorData[k].WhyThisVendor + "</textarea></td>";
                        }else{
                            tbody_tr =tbody_tr+ "<td>"+vendorSelectBox1+"</td>";
                            tbody_tr +=  "<td><textarea cols='40' class='comments' disabled='true'></textarea></td><td><textarea cols='40' class='why-this-vendor'  disabled='true'></textarea></td>"
                        }
                    
                        
                                //tbody_tr += "<td><input type='text'></td>";
                            tbody_tr += "</tr>";
                            a = 0;
                        }
                         if (rfqStatus === "Closed"){
                        tbody_tr += "<tr><td></td><th class='sticky-cell'>Total Value</th>";
                }else{
                    tbody_tr += "<tr><th class='sticky-cell'>Total Value</th>";
                }
                        tbody_tr += "<td></td>";
                        var vendorId="";
                        for (var i = 0; i < obj.VendorData.length; i++)
                        {
                            if(vendorId===""){
                            vendorId=obj.VendorData[i].VendorId;
                        }else{
                            vendorId=vendorId+","+obj.VendorData[i].VendorId;
                        }
                            var total_price = obj.VendorData[i].TotalPrice;
                            var buyer_total_price = obj.VendorData[i].BuyerTotalBaselinePrice;
                            var total_converted_price = obj.VendorData[i].TotalConvertedPrice;
                            
                            
                            tbody_tr += "<td>Price Quoted in  " + currency_array[vendor] + ":-" + Number(total_price).toFixed(2) + " <br> Price Quoted in SGD:- " + Number(total_converted_price).toFixed(2) + " <br> Baseline Price:- <input type='text' class='total-price' value='" + Number(buyer_total_price).toFixed(2) + "' readonly></td>";
                        }
//                        tbody_tr += "<td><input type='text'></td>";
                            $("#vendorIdlist").val(vendorId);
                        tbody_tr += "</tr>";
                        console.log(parameter);
                       // var parameter = ["Safety", "Capability", "Reliability", "Price", "Service Quality"];
                       
                        for (var p = 0; p < parameter.length; p++)
                        {
                            if (rfqStatus === "Closed"){
                            tbody_tr += "<tr><td></td><th class='sticky-cell'>" + parameter[p] + "</th>";
                        }else{
                            tbody_tr += "<tr><th class='sticky-cell'>" + parameter[p] + "</th>";
                        }
                            tbody_tr += "<td></td>";
                            for (var i = 0; i < obj.VendorData.length; i++)
                            {
                                var scoreSelect = "";
                                
                                for (var m = 0; m < obj.VendorData[i].RatedParameters.length; m++)
                            {
                            var rated_array = obj.VendorData[i].RatedParameters;
                            //rated_array[m].tagName
                            

                                if (parameter[p] === rated_array[m].tagName)
                                {
                                                                
                                    if (rfqStatus === "Closed")
                                    {
                                        if (rated_array[m].score === "")
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;' disabled><option value='" + rated_array[m].score + "'>" + rated_array[m].score + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    else
                                    {
                                        if (rated_array[m].score === "" || rated_array[m].score === undefined)
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                        else
                                            scoreSelect = "<select class='custom-select score-select' style='width:35%;'><option value='" + rated_array[m].score + "'>" + rated_array[m].score + " - Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>";
                                    }
                                    if (rfqStatus === "Closed")
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='" + rated_array[m].tagName + "_"+obj.VendorData[i].VendorId+"' disabled>" + rated_array[m].value + "</textarea></td>";
                                    else
                                    {
                                        if (rated_array[m].score === "" || rated_array[m].score === undefined)
                                            tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='" + rated_array[m].tagName + "_"+obj.VendorData[i].VendorId+ "'></textarea></td>";
                                        else                                            
                                        tbody_tr += "<td>" + scoreSelect + "<textarea class='rated-paramter' cols='50' id='" + rated_array[m].tagName + "_"+obj.VendorData[i].VendorId+ "'>" + rated_array[m].value + "</textarea></td>";
                                    }
                                }
                                
                            }


                            }
                            
//                            tbody_tr += "<td></td></tr>";
                            tbody_tr += "</tr>";
                        }
console.log(tbody_tr)
                        $("#vendorcomparisonreporttable").children("thead").html(thead_tr);
                        $("#vendorcomparisonreporttable").children("tbody").html(tbody_tr);

//                        $("#vendorFinalizationTable").css("display", "block");
                        $("#vendorFinalizationTable").children("tbody").html(vendorFinalizationTable_tbody_tr);

                        $("#summaryOfQuotation").removeClass("disabled");
                        $("#summaryOfQuotation").prop("href", "downloadContractVendorComparisionExcelReport.do?rfqid=" + rfq_no);
                        $("#vendorSelectionCriteria").removeClass("disabled");
                        $("#vendorSelectionCriteria").prop("href", "downloadContractVendorComparisionPdfReport.do?rfqid=" + rfq_no);
                        $("#getDocumentsFromDMS").removeClass("disabled");
                        $("#reponseManagementBtn").removeClass("disabled");
                        

                        if (rfqStatus === "Closed") {
//                            $("#finalizeVendorBtn").css("display", "none");
//$("#addNewRatedParameter").removeClass("disabled");
                            $("#createOLABtn").prop("disabled", false);
                        }
                        else
                        {
                            $("#addNewRatedParameter").removeClass("disabled");
//                            $("#finalizeVendorBtn").css("display", "block");
                            $("#createOLABtn").prop("disabled", true);
                        }

                        $("#overlay").css("display", "none");

                        console.log("totalVendor: " + totalVendor);
                        console.log("totalPR: " + totalPR);
                    }
                });

    });
    
     $("#addNewRatedParameter").click(function() {
        var row = "<tr>";
        row += "<td>"
               // + "<a href='#' title='Save' class='save-new-rated-parameter'><i class='fa fa-save fa-2x' aria-hidden='true'></i></a> "
              //  + "<a href='#' title='Delete' class='delete-new-rated-parameter'><i class='fa fa-trash' aria-hidden='true'></i></a>";
        row=row+"<select class=' show-tick show-menu-arrow form-control' style='margin-left: 26%;width: 50%;' title='Choose Rated Parameter...' data-live-search-placeholder='Search' data-live-search='true' data-style='' data-width='100%' id='ratedParameter' name='ratedParameter'>"
    
   var param=document.getElementById("DefaultRatedParam").value;
   var a = param.split(","),
    vendorIds=document.getElementById("vendorIdlist").value;
    var i,k,j,n;
    var vendorId = vendorIds.split(",");
    var table = document.getElementById('vendorcomparisonreporttable'), 
    rows = table.getElementsByTagName('tr');
    row=row+"<option value='' >--Select--</option>";
for (i = 0; i < a.length; i++) {
    var m=0;
    for (k = 0, j = rows.length; k < j; ++k) {
        var x = document.getElementById("vendorcomparisonreporttable").rows[k].cells[0].innerHTML;
        if(x===a[i]){
         m=1;
     }
    }
    if(m===0){
        row=row+"<option value='"+a[i]+"' >"+a[i]+"</option>";
    }
    //girivasu
     }
     
      row=row+"</select>";
               // + "<input type='text' class='extra-rated-parameter form-control' placeholder='Enter parameter name'>"
               row=row + "</td>";
               row=row+"<td></td>"
               for (n = 0; n < vendorId.length; n++) {
               row=row + "<td>"
                
                + "<select class='custom-select score-select' style='width:35%;' ><option value=''>Select Score</option><option value='5'>5 - Score</option><option value='4'>4 - Score</option><option value='3'>3 - Score</option><option value='2'>2 - Score</option><option value='1'>1 - Score</option></select><br>"
//                + "</td>"
//                + "<td></td>"
//                + "<td style='text-align: center;'>"
                + ""
                + "<textarea class='extra-rated-paramter-desc rated-paramter' id='_"+vendorId[n]+"' cols='50' rows='3'></textarea>"
                + "</td>";
               }
        row += "</tr>";
        console.log("row: " + row);
        $("#vendorcomparisonreporttable tbody").append(row);
    });
    
//    $("#addNewRatedParameter").click(function () {
//        $("#showSupprtingDocFromDMSModal").modal("show");
//    });

var vendorRfqLineID='';
    var vendorID = '';
    $("#createOLABtn").click(function () {

        $('#vendorcomparisonreporttable').find('input[type="checkbox"]:checked').each(function (index) {

            var vendorRfqLine = $('#vendorcomparisonreporttable tbody tr:eq(' + index + ') td').children(".vendorrfqLineID").val();
            console.log(vendorRfqLine)
            var vendor = $('#vendorcomparisonreporttable tbody tr:eq(' + index + ') td').children(".finalvendorID").val();
            console.log(vendor)
            if (vendorRfqLineID === '') {
                vendorRfqLineID = vendorRfqLine;
            } else {
                vendorRfqLineID = vendorRfqLineID + ',' + vendorRfqLine;
            }

            if (vendorID === '') {
                vendorID = vendor;
            } else if(vendorID !=vendor) {
                    alert('Kindly select the items which are finalised for the same vendor')
                    return false;
            }

        });
        console.log("vendorRfqLineID-->" + vendorRfqLineID.toString())
        console.log("vendorID-->" + vendorID.toString())
        $("#vendorrfqlineID").val(vendorRfqLineID.toString());
        $("#vendorID").val(vendorID.toString());
        if (vendorRfqLineID != '' && vendorID != '') {
            $("#createcontractOLAForm").submit();
        } else {
            alert('Kindly Select Atleast One Line Item');

        }

    });

$("#vendorcomparisonreporttable").on("click", ".checkbox-class", function() {
    
     var isPrChecked = $(this).prop("checked");
    var currentColIndex = $(this).parent().index();
   var vendorRfqLine=$(this).find("td").eq(currentColIndex - 1).children(".vendorrfqLineID").val();
    var vendor=$(this).find("td").eq(currentColIndex - 1).children(".finalvendorID").val();
    if(isPrChecked){
    if(vendorRfqLine ===''){
       vendorRfqLineID.push(vendorRfqLine);
    }
    
     if(vendor ===''){
       vendorID.push(vendor);
    //}else{
      // vendorID=vendorID+','+ $(this).find("td").eq(currentColIndex - 1).children(".finalvendorID").val();
    }
    }else{
        var index = vendorRfqLineID.indexOf(vendorRfqLine);
                vendorRfqLineID.splice(index, 1);
                var index1 = vendorRfqLineID.indexOf(vendor);
                vendor.splice(index1, 1);
    }
    console.log("vendorRfqLineID-->"+vendorRfqLineID)
    console.log("vendorID-->"+vendorID)
    console.log("vendorRfqLineID-->"+vendorRfqLineID.toString())
    console.log("vendorID-->"+vendorID.toString())
    $("#vendorrfqlineID").val(vendorRfqLineID.toString());
    $("#vendorID").val(vendorID.toString());
    
    
    
    
})
$(".finish-btn").click(function() {
//        $("#overlay").css("display", "block");


        $("#createpoform").submit();
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
                "reqFrom": "UpdateContractBuyerBaselinePrice",
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
        
        $("#ratingValue").val(rated_parameter_value);
        var score=$("#rating").val();
        console.log("rated_parameter_value: " + $(this).parent().parent().eq(0));
        console.log("rated_parameter_value: " + rated_parameter_value);

        var rated_parameter = $(this).prop("id");
        var parameterType = rated_parameter.split("_")[0];
        var vendorId = rated_parameter.split("_")[1];
        if(parameterType===""){
            parameterType=$(this).parent().parent().find("td").eq(0).children("#ratedParameter").val();
        }
        

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: true,
            data: {
                "reqFrom": "UpdateContractRatedParameterScore",
                "rfqId": rfq_no,
                "vendorId": vendorId,
                "parameterType": parameterType,
                "score": score,
                "parameterValue": rated_parameter_value
            },
            complete: function(responseJson) {
              ///  var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
            }
        });
    });
    
    $("#vendorcomparisonreporttable").on("change", "#ratedParameter", function() {
         console.log($(this).parent().val());
        var x=$(this).val();
       // alert(x)

       $(this).parent().children(".rated-paramter").prop("id",x);
    })
    $("#vendorcomparisonreporttable").on("change", ".score-select", function() {
        $("#overlay").css("display", "block");
        var rfq_no = $("#rfqnumber").val();
        
//        alert(rfq_no);
        var score = $(this).val();
        console.log("score: " + score);
$("#rating").val(score);
var rated_parameter_value=$("#ratingValue").val();
        var rated_parameter = $(this).parent().children(".rated-paramter").prop("id");
        var parameterType = rated_parameter.split("_")[0];
        var vendorId = rated_parameter.split("_")[1];
                if(parameterType===""){
            parameterType=$(this).parent().parent().find("td").eq(0).children("#ratedParameter").val();
        }

        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: true,
            data: {
                "reqFrom": "UpdateContractRatedParameterScore",
                "rfqId": rfq_no,
                "vendorId": vendorId,
                "parameterType": parameterType,
                 "parameterValue": rated_parameter_value,
                "score": score
            },
            complete: function(responseJson) {
                console.log("responseJson: " + responseJson);
                if(responseJson.responseText.trim() ==='Updated'){
                     $("#overlay").css("display", "none");
                }
            }
        });
    });
    $("#vendorFinalizationTable").on("change", ".vendor-select", function() {
//        $("#overlay").css("display", "block");
        var rfq_no = $("#rfqnumber").val();
//        alert(rfq_no);
        var vendorId = $(this).val();
        console.log("vendorId: " + vendorId);
        var insertionOrderId = $(this).parent().prop("id").split("_")[1];
        console.log("insertionOrderId: " + insertionOrderId);

        if (vendorId !== "")
        {
            $(this).parent().parent().find('td').children(".comments").prop("disabled", false);
            $(this).parent().parent().find('td').children(".why-this-vendor").prop("disabled", false);

            totalPR = totalPR - 1;
            console.log("totalPR: " + totalPR);
            if (totalPR === 0)
            {
                $("#finalizeVendorBtn").prop("disabled", false);
            }

        }
        else
        {
            $(this).parent().parent().find('td').eq(1).children(".comments").prop("disabled", true);
            $(this).parent().parent().find('td').eq(2).children(".why-this-vendor").prop("disabled", true);

            totalPR = totalPR + 1;
            $("#finalizeVendorBtn").prop("disabled", true);
        }
    });
      $("#vendorcomparisonreporttable").on("change", ".vendor-select", function() {
//        $("#overlay").css("display", "block");
        var rfq_no = $("#rfqnumber").val();
//        alert(rfq_no);
        var vendorId = $(this).val();
        console.log("vendorId: " + vendorId);
        var insertionOrderId = $(this).parent().prop("id").split("_")[1];
        console.log("insertionOrderId: " + insertionOrderId);

        if (vendorId !== "")
        {
            $(this).parent().parent().find('td').children(".comments").prop("disabled", false);
            $(this).parent().parent().find('td').children(".why-this-vendor").prop("disabled", false);

            totalPR = totalPR - 1;
            console.log("totalPR: " + totalPR);
            //alert(totalPR)
            if (totalPR === 0)
            {
                $("#finalizeVendorBtn").prop("disabled", false);
            }

        }
        else
        {
            $(this).parent().parent().find('td').children(".comments").prop("disabled", true);
            $(this).parent().parent().find('td').children(".why-this-vendor").prop("disabled", true);

            totalPR = totalPR + 1;
            $("#finalizeVendorBtn").prop("disabled", true);
        }
    });
    
    $("#finalizeVendorBtn").click(function() {

//        alert("sdas");
        var rfq_no = $("#rfqnumber").val();
        var vendorId = "";
        var insertionOrderId = "";
        var comments = "";
        var whyThisVendor = "";
        var isValid = "Yes";
        $("#vendorcomparisonreporttable").find("tbody tr").each(function(rowIndex) {
//            alert(index);
            if ($('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".comments").val() === "")
            {
                isValid = "No";
                $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".comments").css("border-color", "red");
                $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".comments").focus();
                return false;
            }
            if ($('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".why-this-vendor").val() === "")
            {
                isValid = "No";
                $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".why-this-vendor").css("border-color", "red");
                $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".why-this-vendor").focus();
                return false;
            }
           var varid=$('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".vendor-select").val();
            console.log(varid !=undefined)
            //console.log(varid !='')
           if(varid!=undefined ){
            vendorId += $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".vendor-select").val() + "#";
            insertionOrderId += $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".line-class").val() + "#";
            comments += $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".comments").val() + "#";
            whyThisVendor += $('#vendorcomparisonreporttable tbody tr:eq('+rowIndex+') td').children(".why-this-vendor").val() + "#";
        }

        });
        console.log(vendorId + " " + comments + " " + whyThisVendor + " " + insertionOrderId);
        if (isValid === "No")
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
                            "reqFrom": "FinalizeVendorForContractRfq",
                            "rfqId": rfq_no,
                            "vendorId": vendorId,
                            "insertionOrderId": insertionOrderId,
                            "comments": comments,
                            "whyThisVendor": whyThisVendor
                        },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
                            var rfqNo = obj.RfqNo;
                            $("#overlay").css("display", "none");

                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: rfqNo + " has been finalized successfully."
                                    });
//                            location.href = "vendorresponses.do";
                            $("#createOLABtn").prop("disabled", false);
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
    $("#getDocumentsFromDMS").click(function() {
        $("#showSupprtingDocFromDMSModal").modal("show");
    });
    $("#registerprospectbtn").click(function() {

        $("#registerprospect").modal("show");

        $("#registerprospectmodalform").trigger("reset");
    });

    $("#registerprospectmodalform").submit(function(event) {

        event.preventDefault();

        var formData = new FormData(this);

        var isFormValidated = $(this).parsley().validate();

        console.log("isFormValidated: " + isFormValidated);

        if (isFormValidated === true)
        {
            $.ajax(
                    {
                        type: "POST",
                        url: "saveprospectfromrfq.do",
                        async: false,
                        data: formData,
//                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        complete: function(responseJson)
                        {
                            var obj = $.parseJSON(responseJson.responseText);
//                            alert("ProspectId: " + obj.ProspectId);
                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Prospect created successfully."
                                    });

                            $("#registerprospect").modal("hide");

                        }
                    });
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "findAllVendorAndProspect"
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    var venodorArr = obj.Vendor;
                    var ProspectArr = obj.Prospect;

                    console.log("venodorArr: " + venodorArr.length);
                    console.log("ProspectArr: " + ProspectArr.length);

                    $("#vendorname optgroup").remove();
                    $("#vendorname").selectpicker("refresh");

                    var vendorGroup = $("<optgroup label='Vendor'>");
                    var prospectGroup = $("<optgroup  label='Prospect'>");

                    for (var i = 0; i < venodorArr.length; i++)
                    {
                        $("<option>").val(venodorArr[i].Id).text(venodorArr[i].Name).appendTo(vendorGroup);
                    }
                    for (var i = 0; i < ProspectArr.length; i++)
                    {
                        $("<option>").val(ProspectArr[i].Id).text(ProspectArr[i].Name).appendTo(prospectGroup);
                    }

                    vendorGroup.appendTo("#vendorname");
                    prospectGroup.appendTo("#vendorname");

                    $("#vendorname").selectpicker("refresh");
                }
            });
        }
        else
        {
            return false;
        }
    });
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

    if ($("#rfqvaliduntil_div").length) {
        $('#rfqvaliduntil_div').datetimepicker({
            format: 'DD-MM-YYYY h:mm a',
            minDate: new Date()
        });
    }
    if ($("#expecteddeliverydate_div").length) {
        $('#expecteddeliverydate_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    
    //Girivasu
        if ($("#agreementdate_div").length) {
        $('#agreementdate_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#validitystartdate_div").length) {
        $('#validitystartdate_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    if ($("#validityenddate_div").length) {
        $('#validityenddate_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
    
    //Girivasu
    $("#rfqvaliduntil").keydown(function() {
        return false;
    });
    $("#expecteddeliverydate").keydown(function() {
        return false;
    });
    $("#expectedDeliveryDate").keydown(function() {
        return false;
    });
//    if ($("#rfqRequestDate_div").length) {
//        $('#rfqRequestDate_div').datetimepicker({
//            format: 'DD-MM-YYYY',
//            minDate: new Date()
//        });
////        $("#rfqRequestDate").datetimepicker({dateFormat: "yy-mm-dd"}).datetimepicker("setDate", new Date());
//        
//    }


//    var vendorids = [];
//    var vendor = [];
//    var vendorNameArr = [];
//    $(".select-vendor-from-modal").click(function() {
//        alert("sa");
//    });

    var selectedVendorIds = [];
    var selectedVendorDetailsArr = [];

    $("#addVendorsDetailsModalTableId").on('click', '.select-vendor-from-modal', function() {
//        alert("as");
        var id = $(this).val();
        var tempArr = [];
        tempArr = $("#ro_vendorname").val();

        if (tempArr.includes(id)) {
            Lobibox.alert("error", {
                msg: "This vendor is already selected, please select another vendor!"
            });
            $(this).prop("checked", false);
            return false;
        }
        else
        {
            var vendorDetails = {};

            var vendorName = $(this).parent().parent().find('td').eq(1).html();
            var compCode = $(this).parent().parent().find('td').eq(2).html();
            var emailId = $(this).parent().parent().find('td').eq(4).html();
            var address = $(this).parent().parent().find('td').eq(5).html();
//        alert(vendorName);
            vendorDetails.vendorId = id;
            vendorDetails.vendorName = vendorName;
            vendorDetails.compCode = compCode;
            vendorDetails.emailId = emailId;
            vendorDetails.address = address;
//        alert(vendorDetails.address);

            if ($(this).prop("checked") === true)
            {
                selectedVendorIds.push(id);
                selectedVendorDetailsArr.push(vendorDetails);
            }
            else
            {
                var index = selectedVendorIds.indexOf(id);
//            alert("index: " + index);
                selectedVendorIds.splice(index, 1);
                selectedVendorDetailsArr.splice(index, 1);
//            delete selectedVendorIds[index];
            }
            $("#ro_vendorname").val(selectedVendorIds.toString());
        }
    });

    $("#addselectedvendortotable").click(function() {
//        alert("ad");
        if (selectedVendorIds.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        }
        else
        {
//            $("#rfq_vendor_table tbody tr").remove();
            var row = "";
            for (var i = 0; i < selectedVendorIds.length; i++)
            {
//                alert(selectedVendorDetailsArr[i].vendorId);
                row += "<tr><td>" + selectedVendorDetailsArr[i].vendorName + "</td><td>" + selectedVendorDetailsArr[i].compCode + "</td><td>" + selectedVendorDetailsArr[i].address + "</td><td>" + selectedVendorDetailsArr[i].emailId + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + selectedVendorDetailsArr[i].vendorId + "></td></tr>";
            }
            $("#rfq_vendor_table").children("tbody").append(row);
            $("#addVendorsDetailsModal").modal("hide");

            $("#rfq_vendor_table").trigger('update');
        }
    });

    $("#addVendorsDetailsModalTableId").on('click', '.add-vendor-tocreatedrfq', function() {
        var id = $(this).val();
        var tempArr = [];
        tempArr = $("#ro_vendorname").val();

        if ($(this).prop("checked") === true) {
            if (tempArr.indexOf(id) !== -1) {
                Lobibox.alert("error", {
                    msg: "This vendor is already selected, please select another vendor!"
                });
                $(this).prop("checked", false);
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
                    selectedVendorIds.push(id);
                    selectedVendorDetailsArr.push(vendorDetails);
                }
                $("#ro_vendorname").val(selectedVendorIds.toString());
            }
        }
        else
        {
            var index = selectedVendorIds.indexOf(id);
            selectedVendorIds.splice(index, 1);
            selectedVendorDetailsArr.splice(index, 1);
        }
    });
    $("#addselectedvendortocreatedrfq").click(function() {
        if (selectedVendorIds.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        }
        else
        {
            var row = "";
            for (var i = 0; i < selectedVendorIds.length; i++)
            {
                row += "<tr><td></td><td><i class='fa fa-trash deletevenodrfromrfq'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + selectedVendorDetailsArr[i].vendorId + "></td><td>" + selectedVendorDetailsArr[i].vendorName + "</td><td>" + selectedVendorDetailsArr[i].compCode + "</td><td>" + selectedVendorDetailsArr[i].address + "</td><td>" + selectedVendorDetailsArr[i].emailId + "</td><td></td><td></td></tr>";
            }
            $("#rfqdetails_vendor_table").children("tbody").append(row);
            $("#addVendorsDetailsModal").modal("hide");
        }
    });

    $("#rfqdetails_vendor_table").on("click", ".deletevenodrfromrfq", function() {
        var vname = $("#ro_vendorname").val();
        var id = $(this).parent().find(".vendorclass").val();
        var arr = vname.split(",");
        var index = arr.indexOf(id);
        if (index > -1) {
            arr.splice(index, 1);
            $("#ro_vendorname").val(arr);
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
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getCompanyCodeByCompany",
                "country": country
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Data.COUNTRYCODE);

                var countrycode = obj.Data.COUNTRYCODE;

//                alert(countrycode);

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
        var pr = $(this).parent().parent().parent().find("tr").length;
        var deassociateRow = $(this);
//        alert(pr);
        if (pr === 1)
        {
            Lobibox.alert("error", {
                msg: "There is only one PR Line in this RFQ!"
            });
            return false;
        }
        else
        {
            $("#overlay").css("display", "block");
            var rfqLineId = $(this).parent().children(".rfqLineId").val();
//            alert(rfqLineId);
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "DeassociatePrLineFromRfq",
                    "rfqLineId": rfqLineId
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log(obj.Result);
                    deassociateRow.parent().parent().remove();
                    $("#overlay").css("display", "none");
                    Lobibox.alert("success", {
                        msg: "PR Line has been deassociated."
                    });
                }
            });
        }
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
    $("#submitRatedParameterBtn").click(function() {
        console.log("tempArray len: " + tempArray.length);
        if (tempArray.length === 0)
        {
            Lobibox.alert("error", {
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
//        alert("save");
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

        if (rfqtitle === '' && contactpersonename === '' && contactpersonetelno === '' && contactpersoneemail === '' && deliveryterms === '' && paymentterms === '' && rfqvaliduntil === '' && expecteddeliverydate === '' && rfqparameter == '') {
            $("#parsley-id-9").addClass("parsley-errors-list");
            $("#parsley_rfqtitle").text("This value is required.");
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
        if (rfqtitle === '' || contactpersonename === '' || contactpersonetelno === '' || contactpersoneemail === '' || deliveryterms === '' || paymentterms === '' || rfqvaliduntil === '' || expecteddeliverydate === '') {
//                    alert("BIttu");
            if (rfqtitle === '') {
                $("#parsley-id-9").addClass("parsley-errors-list");
                $("#parsley_rfqtitle").text("This value is required.");
            }
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
        if (ratedParameterHidden === "")
        {
            Lobibox.alert("error", {
                msg: "Please select rated parameters!"
            });
            return false;
        }
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
    
    
});


$("#rfq_vendor_table").on("click", ".deleteRow", function() {


    var vname = $("#ro_vendorname").val();

    var id = $(this).parent().find(".vendorclass").val();
//    var id = $("#vendorid").val();
//        alert(vname);
    var arr = vname.split(",");
    var index = arr.indexOf(id);
//    alert("index:" + index);
//    console.log("index:" + index);
    if (index > -1) {
        arr.splice(index, 1);
//        alert("arr :" + arr)

        $("#ro_vendorname").val(arr);
    }
    $(this).parent().parent().remove();

    $("#rfq_vendor_table").trigger("update");
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
    //alert("abhishek");
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
    if (RFQTitle === '') {
        $("#parsley-id-9").addClass("parsley-errors-list");
        $("#parsley_rfqtitle").text("This value is required.");
    } else {
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
                    alert("dataFail");
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



