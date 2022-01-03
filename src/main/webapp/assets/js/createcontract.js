$(function () {
    (function () {
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


$(document).ready(function () {

    $("#overlay").css("display", "none");

    var itemNumberCount = 10;
    $("#srvAddRowBtn").click(function () {
        var lino = $("#Serv_LineItemNumber").val();
        var srcno = $("#ServiceNumber option:selected").text();
        var shorttxt = $("#ShortText").val();
        var qnty = $("#Serv_Quantity").val();
        var unit = $("#Unit option:selected").text();
        var grossprice = $("#GrossPrice").val();
        var currency = $("#Currency").val();
        var edition = $("#Edition").val();
        var row = "<tr><td>" + lino + "</td><td>" + srcno + "</td><td>" + shorttxt + "</td><td>"
                + qnty + "</td><td>" + unit + "></td><td>" + grossprice + "</td><td>" + currency + "></td><td>"
                + edition + "></td></tr>";
        $("cm_data_details_services_table tbody").append(row);

    });

    $("#rfp_line_items_data_table").on("click", ".deleteRow", function () {
//       alert("sdasd"); 
        itemNumberCount -= 10;
        $(this).parent().parent().remove();
    });


    $(".finish-btn").click(function () {


        var rfq_operation = $("#rfq_operation").val();
//        alert(rfq_operation);

        if (rfq_operation === "ccreate")
        {

            Lobibox.confirm({
                msg: "Are you sure you want to create Contract?",
                callback: function (lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#createcontractform").submit();
                    } else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });

        } else if (rfq_operation === "update")
        {

            Lobibox.confirm({
                msg: "Are you sure you want to update Contract?",
                callback: function (lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#rfqdataform").submit();
                    } else if (type === 'no')
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
                callback: function (lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("yes");
                        $("#rfpdataform").submit();
                    } else if (type === 'no')
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

            line_items_data_table.find("tr").each(function () {
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


            Lobibox.confirm({
                msg: "Are you sure you want to create RFQ?",
                callback: function (lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        console.log("ok");
                        $("#overlay").css("display", "block");
                        $("#contractrfqdataform").submit();
                    } else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        }
    });

    $(".pr-line-item-qty").keyup(function () {
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

    $(".pr-line-item-qty-afterRfqCreate").keyup(function () {

        var usedQuantity = $(this).parent().children(".usedQuantity").val();
//        alert(usedQuantity);

        if ((parseInt(this.value) > parseInt(this.max) + parseInt(usedQuantity)) || parseInt(this.value) < 1)
        {
            $(this).val(usedQuantity);
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        } else if (this.value === '')
        {
            $(this).css('border-color', 'red');
            $(".next-btn").prop("disabled", true);
        } else
        {
            $(this).css('border-color', '');
            $(".next-btn").prop("disabled", false);
        }
    });

    $(".contract-line-item-qty").keyup(function () {
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
    $(".reject-pr").click(function () {
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
    $("#rejectprlinemodaltn").click(function () {

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
            callback: function (lobibox, type) {
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
                                complete: function (responseJson)
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
                                    } else
                                    {
                                        Lobibox.alert("error", {
                                            msg: 'PR rejection has been failed, try again!'
                                        });
                                    }
//                                    selectedPrForReject.remove();
                                }
                            });
                } else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });


// $("#rejectprform").submit();
    });

    $("#associatesubmitbtn").click(function () {
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
                    complete: function (responseJson)
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
    $("#rfq_vendor_table").on('update', function () {
//        alert("sadsa");
        $("#VendorRecipients option").remove();
//        $("#VendorRecipients").selectpicker("refresh");

        var tbody = $(this).find("tbody");
        tbody.find("tr").each(function () {
            var emailId = $(this).find("td").eq(3).text();
//            alert(emailId);
            $("<option>").val(emailId).text(emailId).appendTo("#VendorRecipients");
        });

        $("#VendorRecipients").selectpicker("refresh");
    });

    var vendor = [];
    $("#groupselect").change(function () {
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
                    complete: function (responseJson)
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


                                }
                            }
                            $("#rfq_vendor_table").trigger('update');
                        }


                    }
                });


        vendor = [];


    });


    var current_tr;

    $(".upload-prline-document").click(function () {


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


        $("#prlinedocform").trigger("reset");
    });

    $("#uploadprlinefilesubmitbtn").click(function () {

        if ($("input[name='file_docDiv1']").val().trim() !== "" || $("input[name='file_docDiv2']").val().trim() !== "" ||
                $("input[name='file_docDiv3']").val().trim() !== "" || $("input[name='file_docDiv4']").val().trim() !== "" ||
                $("input[name='file_docDiv5']").val().trim() !== "") {

            $("#prlineitemattachmentmodal").modal("hide");

            var lobiboxProgress = Lobibox.progress({
                title: 'Please wait',
                label: 'Uploading files...',
                onShow: function ($this) {
                    var i = 0;
                    var inter = setInterval(function () {
                        if (i > 100) {
                            inter = clearInterval(inter);
                        }
                        i = i + 0.05;
                        $this.setProgress(i);
                    }, 1);
                },
                progressCompleted: function ($this)
                {
                    $this.hide();
                    Lobibox.notify("success", {
                        rounded: true,
                        delayIndicator: false,
                        msg: 'Files uploaded successfully.'
                    });
                }
            });
        } else
        {
            Lobibox.alert("error",
                    {
                        msg: "Please select at least one file!"
                    });
        }
    });

    $("#prlinedocform").submit(function (event) {


        event.preventDefault();

        if ($("input[name='file_docDiv1']").val().trim() !== "" || $("input[name='file_docDiv2']").val().trim() !== "" ||
                $("input[name='file_docDiv3']").val().trim() !== "" || $("input[name='file_docDiv4']").val().trim() !== "" ||
                $("input[name='file_docDiv5']").val().trim() !== "") {




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
                        complete: function (responseJson)
                        {
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("Attch Id: " + obj.TempAttachmentId);

                            current_tr.find("td").eq(9).children(".pr-att-temp").val(obj.TempAttachmentId);
                            current_tr.find("td").eq(20).children(".viewUploadedDocFromDB").removeAttr("style");
//                        $("#prlineitemattachmentmodal").modal("hide");
                            console.log(current_tr.find("td").eq(20).children(".viewUploadedDocFromDB").html());

//                        lobiboxProgress.hide();
                        },
                        success: function (status)
                        {
//                        $("#overlay").css("display", "none");
                        }
                    });
        }
    });

    var totalVendor = 0;
    var totalPR = 0;
    $("#rfqnumber").change(function () {
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
                    complete: function (responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);

                        console.log("Vendors: " + obj.VendorData.length);
                        totalVendor = obj.VendorData.length;
                        var rfqStatus = obj.RfqStatus;
                        console.log("rfqStatus: " + rfqStatus);

                        var thead_tr = "";
                        var tbody_tr = "";
                        var item_no_array = [];
                        var insertionOrderId_array = [];
                        var vendor_price_map = {};
                        var buyer_price_map = {};
                        var vendor_converted_price_map = {};
                        var vendorId_array = [];
                        var vendorSelectBox = '';
                        var vendorFinalizationTable_tbody_tr = "";

                        thead_tr = "<tr>";
                        thead_tr += "<th class='sticky-cell'>Vendor Details</th>";
                        vendorSelectBox = "<select class='custom-select vendor-select'>";
                        vendorSelectBox += "<option value=''>Select</option>";

                        for (var i = 0; i < obj.VendorData.length; i++)
                        {
                            console.log("Vendor Name: " + obj.VendorData[i].VendorName);
                            console.log("PR Length: " + obj.VendorData[i].PRDetails.length);

                            var vendor_name = obj.VendorData[i].VendorName;
                            var vendor_currency = obj.VendorData[i].Currency;
                            var supplier_status = obj.VendorData[i].SupplierStatus;

                            vendorId_array.push(obj.VendorData[i].VendorId);
//                            thead_tr += "<th>" + vendor_name + " (price quoted)/ Baseline Price</th>";
                            thead_tr += "<th>" + vendor_name + "<br>(Price Quoted in " + vendor_currency + ") / (Price Quoted in SGD) / (Baseline Price)</th>";

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
                                }
                                price_temp_arr.push(pr_array[j].Price);
                                buyer_price_temp_arr.push(pr_array[j].BuyerBaselinePrice);
                                vendor_converted_price_temp_arr.push(pr_array[j].ConvertedPrice);
                            }
                            vendor_price_map[vendor_name] = price_temp_arr;
                            buyer_price_map[vendor_name] = buyer_price_temp_arr;
                            vendor_converted_price_map[vendor_name] = vendor_converted_price_temp_arr;
                        }

                        thead_tr += "</tr>";
                        vendorSelectBox += "</select>";

                        totalPR = item_no_array.length;
                        var a = 0;
                        for (var k = 0; k < item_no_array.length; k++)
                        {
                            tbody_tr += "<tr><th class='sticky-cell'>" + item_no_array[k] + "</th>";
                            if (rfqStatus === "Closed")
                            {
                                vendorFinalizationTable_tbody_tr += "<tr><th>" + obj.FinalizedVendorData[k].ItemNumber + "</th><td>" + obj.FinalizedVendorData[k].VendorName + "</td><td><textarea cols='40' disabled='true'>" + obj.FinalizedVendorData[k].Comments + "</textarea></td><td><textarea cols='40' disabled='true'>" + obj.FinalizedVendorData[k].WhyThisVendor + "</textarea></td></tr>";
                            } else
                            {
                                vendorFinalizationTable_tbody_tr += "<tr><th>" + item_no_array[k] + "</th><td id='InsertionOrderId_" + insertionOrderId_array[k] + "'>" + vendorSelectBox + "</td><td><textarea cols='40' class='comments' disabled='true'></textarea></td><td><textarea cols='40' class='why-this-vendor' disabled='true'></textarea></td></tr>";
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
                                    tbody_tr += "<td>" + Number(price_array[k]).toFixed(2) + " / " + Number(vendor_converted_price_array[k]).toFixed(2) + " / <input type='number' id='price_" + vendorId_array[a] + "_" + insertionOrderId_array[k] + "' value='" + Number(buyer_price_array[k]).toFixed(2) + "' class='baseline-price-class' disabled></td>";
                                else
                                    tbody_tr += "<td>" + Number(price_array[k]).toFixed(2) + " / " + Number(vendor_converted_price_array[k]).toFixed(2) + " / <input type='number' id='price_" + vendorId_array[a] + "_" + insertionOrderId_array[k] + "' value='" + Number(buyer_price_array[k]).toFixed(2) + "' class='baseline-price-class'></td>";
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
                                    } else
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
                                    } else
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
                                    } else
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
                                    } else
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
                                    } else
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
                                    } else
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
                        $("#addNewRatedParameter").removeClass("disabled");
                        $("#reponseManagementBtn").removeClass("disabled");

                        if (rfqStatus === "Closed") {
//                            $("#finalizeVendorBtn").css("display", "none");
                            $("#createOLABtn").prop("disabled", false);
                        } else
                        {
//                            $("#finalizeVendorBtn").css("display", "block");
                            $("#createOLABtn").prop("disabled", true);
                        }

                        $("#overlay").css("display", "none");

                        console.log("totalVendor: " + totalVendor);
                        console.log("totalPR: " + totalPR);
                    }
                });

    });

    $("#vendorcomparisonreporttable").on("change", ".baseline-price-class", function () {
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
        $("#vendorcomparisonreporttable").find("tbody tr").each(function (index) {
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
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
            }
        });

    });
    $("#vendorcomparisonreporttable").on("change", ".rated-paramter", function () {
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
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
            }
        });
    });
    $("#vendorcomparisonreporttable").on("change", ".score-select", function () {
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
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                $("#overlay").css("display", "none");
            }
        });
    });
    $("#vendorFinalizationTable").on("change", ".vendor-select", function () {
//        $("#overlay").css("display", "block");
        var rfq_no = $("#rfqnumber").val();
//        alert(rfq_no);
        var vendorId = $(this).val();
        console.log("vendorId: " + vendorId);
        var insertionOrderId = $(this).parent().prop("id").split("_")[1];
        console.log("insertionOrderId: " + insertionOrderId);

        if (vendorId !== "")
        {
            $(this).parent().parent().find('td').eq(1).children(".comments").prop("disabled", false);
            $(this).parent().parent().find('td').eq(2).children(".why-this-vendor").prop("disabled", false);

            totalPR = totalPR - 1;
//            console.log("totalPR: " + totalPR);
            if (totalPR === 0)
            {
                $("#finalizeVendorBtn").prop("disabled", false);
            }

        } else
        {
            $(this).parent().parent().find('td').eq(1).children(".comments").prop("disabled", true);
            $(this).parent().parent().find('td').eq(2).children(".why-this-vendor").prop("disabled", true);

            totalPR = totalPR + 1;
            $("#finalizeVendorBtn").prop("disabled", true);
        }
    });
    $("#finalizeVendorBtn").click(function () {

//        alert("sdas");
        var rfq_no = $("#rfqnumber").val();
        var vendorId = "";
        var insertionOrderId = "";
        var comments = "";
        var whyThisVendor = "";
        var isValid = "Yes";
        $("#vendorFinalizationTable").find("tbody tr").each(function (index) {
//            alert(index);
            if ($(this).find("td").eq(1).children(".comments").val() === "")
            {
                isValid = "No";
                $(this).find("td").eq(1).children(".comments").css("border-color", "red");
                $(this).find("td").eq(1).children(".comments").focus();
                return false;
            }
            if ($(this).find("td").eq(2).children(".why-this-vendor").val() === "")
            {
                isValid = "No";
                $(this).find("td").eq(2).children(".why-this-vendor").css("border-color", "red");
                $(this).find("td").eq(2).children(".why-this-vendor").focus();
                return false;
            }

            vendorId += $(this).find("td").eq(0).children(".vendor-select").val() + "#";
            insertionOrderId += $(this).find("td").eq(0).prop("id").split("_")[1] + "#";
            comments += $(this).find("td").eq(1).children(".comments").val() + "#";
            whyThisVendor += $(this).find("td").eq(2).children(".why-this-vendor").val() + "#";

        });
        console.log(vendorId + " " + comments + " " + whyThisVendor + " " + insertionOrderId);
        if (isValid === "No")
        {
            return false;
        }

        Lobibox.confirm({
            msg: "Are you sure you want to finalize this RFQ ?",
            callback: function (lobibox, type) {
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
                            "whyThisVendor": whyThisVendor
                        },
                        complete: function (responseJson) {
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

                } else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });
    $("#vendorFinalizationTable").on("change", ".comments", function () {
        $(this).css("border-color", "gray");
    });
    $("#vendorFinalizationTable").on("change", ".why-this-vendor", function () {
        $(this).css("border-color", "gray");
    });
    $("#getDocumentsFromDMS").click(function () {
        $("#showSupprtingDocFromDMSModal").modal("show");
    });
    
    $("#getDocumentsFromDMS").click(function () {
        $("#showSupprtingDocFromDMSModal").modal("show");
    });
    $("#registerprospectbtn").click(function () {

        $("#registerprospect").modal("show");

        $("#registerprospectmodalform").trigger("reset");
    });

    $("#registerprospectmodalform").submit(function (event) {

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
                        complete: function (responseJson)
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
                complete: function (responseJson) {
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
        } else
        {
            return false;
        }
    });
    $("#prospectvendorname").change(function () {
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

    $("#groupname").change(function () {
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


    $("#rfp_vendor_table").on("click", ".deleteRow", function () {


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


    $(".manual-date-input-check").keyup(function () {
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

    //  if ($("#rfqdate_div").length) {
    //     $('#rfqdate_div').datetimepicker({
    //         format: 'DD-MM-YYYY',
    //         minDate: new Date()
    //    });
    //}
    // if ($("#expecteddeliverydate_div").length) {
    //     $('#expecteddeliverydate_div').datetimepicker({
    ///         format: 'DD-MM-YYYY',
    //        minDate: new Date()
    //    });
    // }
    $("#rfqdate").keydown(function () {
        return false;
    });
    $("#expecteddeliverydate").keydown(function () {
        return false;
    });
    $("#expectedDeliveryDate").keydown(function () {
        return false;
    });


    var selectedVendorIds = [];
    var selectedVendorDetailsArr = [];

    $("#addVendorsDetailsModalTableId").on('click', '.select-vendor-from-modal', function () {
        alert("as");
        var id = $(this).val();
        var tempArr = [];
        tempArr = $("#ro_vendorname").val();

        if (tempArr.includes(id)) {
            Lobibox.alert("error", {
                msg: "This vendor is already selected, please select another vendor!"
            });
            $(this).prop("checked", false);
            return false;
        } else
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
            } else
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

    $("#addselectedvendortotable").click(function () {
//        alert("ad");
        if (selectedVendorIds.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        } else
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

    $("#addVendorsDetailsModalTableId").on('click', '.add-vendor-tocreatedrfq', function () {
        alert("hello");
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
            } else
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
        } else
        {
            var index = selectedVendorIds.indexOf(id);
            selectedVendorIds.splice(index, 1);
            selectedVendorDetailsArr.splice(index, 1);
        }
    });
    $("#addselectedvendortocreatedrfq").click(function () {
        if (selectedVendorIds.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select vendor!"
            });
            return false;
        } else
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

    $("#rfqdetails_vendor_table").on("click", ".deletevenodrfromrfq", function () {
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

    $("#add_vendor").click(function () {
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

        if (vendorname === "")
        {
            Lobibox.alert("error", {
                msg: "Please select Vendor!"
            });
            return false;
        }


        var ids = [];
        $(".rfq-vendor-table").find("tbody tr").each(function () {
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

        vendor.push(vendorid);
        vendor.push(ro_vendorids);
        vendorids.push(vendorid);



        var row = "";
        row = "<tr><td>" + vendorname + "</td><td>" + companycode + "</td><td>" + vendoraddress + "</td><td>" + vendoremail + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + vendorid + "></td></tr>";

        $("#rfq_vendor_table").children("tbody").append(row);

        $("#vendorname").val("");
        $("#companycode").val("");
        $("#vendoraddress").val("");
        $("#vendoremail").val("");


        $("#ro_vendorname").val(vendor.toString());

        $("#associategroupmodal option").each(function ()
        {
            // Add $(this).val() to your list

        });

        $("#rfq_vendor_table").trigger('update');
    });

    $("#country").change(function () {
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
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Data.COUNTRYCODE);

                var countrycode = obj.Data.COUNTRYCODE;

//                alert(countrycode);

                $("#countrycode").val(countrycode);

            }
        });
    });


    $("#vendorname").change(function () {

        var vendorid = $(this).val();
        if (vendorid === '')
        {
            $("#vendordetailslink").css("visibility", "hidden");
        } else
        {
            $("#vendordetailslink").css("visibility", "visible");
            $("#vendor_id").val(vendorid);
        }

    });
    $("#vendordetailslink").click(function () {
        var id = $("#vendor_id").val();
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "findVendorById",
                "vendorid": id
            },
            complete: function (responseJson) {
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

    $(".matlLongTextClass").click(function () {

        $("#matlLongTextModal").modal("show");

        var longtext = $(this).parent().children().eq(1).val();
//        $("#longtext").val(longtext);
        $('div.longtext').text(longtext);
//        alert(longtext);
    });

    $("#InternalRecipients").change(function () {
        var selected = $(':selected', this);
    });

    $(".deassaiciate-pr").click(function () {
        var pr = $(this).parent().parent().parent().find("tr").length;
        var deassociateRow = $(this);
//        alert(pr);
        if (pr === 1)
        {
            Lobibox.alert("error", {
                msg: "There is only one PR Line in this RFQ!"
            });
            return false;
        } else
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
                complete: function (responseJson) {
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

    $(".viewUploadedDocFromDB").click(function () {

        var prAttTempId = $(this).parent().parent().find("td").eq(9).children(".pr-att-temp").val();
        console.log("pr_att_temp_id: " + prAttTempId);
        if (prAttTempId === "non")
        {
            Lobibox.alert("error", {
                msg: "There are no documents uploaded for this PR Line!"
            });
            return false;
        } else
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
                complete: function (responseJson) {
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

    $("#documentListTable").on("click", ".deleteDocFromDB", function () {
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
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Result);

                currentTR.remove();

            }
        });
    });
    var tempArray = [];
    $(".rated-parameter-checkbox").click(function () {
        var isChecked = $(this).prop("checked");
        var paramtereId = $(this).prop("id");

//        alert(isChecked);
        console.log("isChecked: " + isChecked + ", paramtereId: " + paramtereId);
        if (isChecked === true)
        {
            $(this).parent().parent().find("td").eq(2).children(".rated-parameter-weight-class").prop("disabled", false);
            tempArray.push(paramtereId);
        } else
        {
            $(this).parent().parent().find("td").eq(2).children(".rated-parameter-weight-class").val("");
            $(this).parent().parent().find("td").eq(2).children(".rated-parameter-weight-class").prop("disabled", true);

            var index = tempArray.indexOf(paramtereId);
            tempArray.splice(index, 1);
        }
//        console.log("tempArray: " + tempArray);
    });
    $("#submitRatedParameterBtn").click(function () {
        console.log("tempArray len: " + tempArray.length);
        if (tempArray.length === 0)
        {
            Lobibox.alert("error", {
                msg: "Please select atleast one parameter !"
            });
            return false;
        } else
        {
            var isValid = "Yes";
            var parameterArray = [];
            var parameterWeightArray = [];

            $("#ratedParameterTable").find("tbody tr").each(function () {
//                alert($(this).index());
                if ($(this).find("td").eq(0).children(".rated-parameter-checkbox").prop("checked") === true && $(this).find("td").eq(2).children(".rated-parameter-weight-class").val() === "")
                {
                    isValid = "No";
                    $(this).find("td").eq(2).children(".rated-parameter-weight-class").focus();
                    $(this).find("td").eq(2).children(".rated-parameter-weight-class").css("border-color", "red");
                    return false;
                } else if ($(this).find("td").eq(0).children(".rated-parameter-checkbox").prop("checked") === true && $(this).find("td").eq(2).children(".rated-parameter-weight-class").val() !== "")
                {
                    parameterArray.push($(this).find("td").eq(0).children(".rated-parameter-checkbox").prop("id"));
                    parameterWeightArray.push($(this).find("td").eq(2).children(".rated-parameter-weight-class").val());
                }
            });
            if (isValid === "No")
            {
                return false;
            } else
            {
                $("#ratedParameterModal").modal("hide");
                console.log("parameterArray: " + parameterArray);
                console.log("parameterWeightArray: " + parameterWeightArray);

                $("#ratedParameterHidden").val(parameterArray.toString());
                $("#ratedParameterWeigthHidden").val(parameterWeightArray.toString());
            }
        }
    });
    $("#ratedParameterBtn").click(function () {
        $("#ratedParameterModal").modal({backdrop: 'static', keyboard: false});
        $("#ratedParameterModal").modal("show");
    });
    $(".rated-parameter-weight-class").change(function () {
        $(this).removeAttr("style");
    });

    $("#saveRfqDataBtn").click(function () {
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
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("obj.RFQ_NUMBER: " + obj.RFQ_NUMBER);
                $("#rfqNumber").val(obj.RFQ_NUMBER);
                $("#overlay").css("display", "none");

                if (tempRfqId === "")
                {
                    Lobibox.alert("success", {
                        msg: "Data saved successfully against the temporary RFQ Number " + obj.RFQ_NUMBER
                    });
                } else
                {
                    Lobibox.alert("success", {
                        msg: "Data updated successfully against the temporary RFQ Number " + obj.RFQ_NUMBER
                    });
                }
            }
        });

    });


});


$("#rfq_vendor_table").on("click", ".deleteRow", function () {


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
$("#vendorname").change(function () {

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
        complete: function (responseJson) {
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


$("#deliveryterms").change(function () {
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

$("#companycode").change(function () {
    $("#parsley-id-1").removeClass("parsley-errors-list");
    $("#parsley_companycode").text("");
});
$("#rfqno").blur(function () {
//        alert("Bittu");
    $("#parsley-id-3").removeClass("parsley-errors-list");
    $("#parsley_rfqno").text("");
});

$("#finalizedvendorcode").blur(function () {
    $("#parsley-id-5").removeClass("parsley-errors-list");
    $("#parsley_finalizedvendorcode").text("");
});
$("#finalizedvendorname").change(function () {
    $("#parsley-id-7").removeClass("parsley-errors-list");
    $("#parsley_finalizedvendorname").text("");
});
$("#finalagreementvalue").change(function () {
    $("#parsley-id-9").removeClass("parsley-errors-list");
    $("#parsley_finalagreementvalue").text("");
});
$("#agreementtype").change(function () {
    $("#parsley-id-11").removeClass("parsley-errors-list");
    $("#parsley_agreementtype").text("");
});
$("#agreementdate").blur(function () {
    $("#parsley-id-13").removeClass("parsley-errors-list");
    $("#parsley_agreementdate").text("");
});
$("#validitystartdate").blur(function () {
    $("#parsley-id-15").removeClass("parsley-errors-list");
    $("#parsley_validitystartdate").text("");
});
$("#validityenddate").blur(function () {
    $("#parsley-id-17").removeClass("parsley-errors-list");
    $("#parsley_validityenddate").text("");
});
$("#currency").change(function () {
    var currency = $("#currency").val();
    if (currency !== 'Select') {
        $("#parsley-id-19").removeClass("parsley-errors-list");
        $("#parsley_currency").text("");
    }
});

$("#PurchOrganization").change(function () {
    var PurchOrganization = $("#PurchOrganization").val();
    if (PurchOrganization !== 'Select') {
        $("#parsley-id-21").removeClass("parsley-errors-list");
        $("#parsley_PurchOrganization").text("");
    }
});

$("#PurchaseGroup").change(function () {
    var PurchaseGroup = $("#PurchaseGroup").val();
    if (PurchaseGroup !== 'Select') {
        $("#parsley-id-23").removeClass("parsley-errors-list");
        $("#parsley_PurchaseGroup").text("");
    }
});

$("#ItemIntervalNumber").change(function () {
    var ItemIntervalNumber = $("#ItemIntervalNumber").val();
    if (ItemIntervalNumber !== 'Select') {
        $("#parsley-id-25").removeClass("parsley-errors-list");
        $("#parsley_ItemIntervalNumber").text("");
    }
});

$("#SubItemInterval").change(function () {
    var SubItemInterval = $("#SubItemInterval").val();
    if (SubItemInterval !== 'Select') {
        $("#parsley-id-27").removeClass("parsley-errors-list");
        $("#parsley_SubItemInterval").text("");
    }
});

$("#AgreedPaymentTerms").change(function () {
    var AgreedPaymentTerms = $("#AgreedPaymentTerms").val();
    if (AgreedPaymentTerms !== 'Select') {
        $("#parsley-id-29").removeClass("parsley-errors-list");
        $("#parsley_AgreedPaymentTerms").text("");
    }
});

$("#Telephone").change(function () {
    var Telephone = $("#Telephone").val();
    if (Telephone !== 'Select') {
        $("#parsley-id-31").removeClass("parsley-errors-list");
        $("#parsley_Telephone").text("");
    }
});

$("#InvoicingParty").change(function () {
    var InvoicingParty = $("#InvoicingParty").val();
    if (InvoicingParty !== 'Select') {
        $("#parsley-id-33").removeClass("parsley-errors-list");
        $("#parsley_InvoicingParty").text("");
    }
});

$("#ProfitCenter").change(function () {
    var ProfitCenter = $("#ProfitCenter").val();
    if (ProfitCenter !== 'Select') {
        $("#parsley-id-35").removeClass("parsley-errors-list");
        $("#parsley_ProfitCenter").text("");
    }
});

$("#PartnerPC").change(function () {
    var PartnerPC = $("#PartnerPC").val();
    if (PartnerPC !== 'Select') {
        $("#parsley-id-37").removeClass("parsley-errors-list");
        $("#parsley_PartnerPC").text("");
    }
});


$("#RFQTitle").change(function () {
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
$("#contactpersonename").change(function () {
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

$("#contactpersonetelno").change(function () {
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
$("#contactpersoneemail").change(function () {
    var contactpersoneemail = $("#contactpersoneemail").val();
    var email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//    var email_reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if (contactpersoneemail === '')
    {
        $("#parsley-id-15").addClass("parsley-errors-list");
        $("#parsley_contactpersoneemail").text("This value is required.");
        return false;
    } else if (email_reg.test(contactpersoneemail))
    {
//        alert(contactpersoneemail);
        $("#parsley-id-15").removeClass("parsley-errors-list");
        $("#parsley_contactpersoneemail").text(" ");
    } else
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


$("#action").change(function () {
//   alert("bittu");
    var action = $("#action").val();

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
                complete: function (responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
//                    alert(obj.size);
                    size = obj.size;
                },
                error: function (data) {
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
                complete: function (responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
//                    alert(obj.size);
                    size = obj.size;
                },
                error: function (data) {
                    alert("dataFail");
                }
            });
    return size;
}
//Girivasu
$("#addContractItemRowBtnId").click(function () {
    var rowCount = ($('#contractItemTableId tr').length) * 10;
    var contractRefId = $('#contractRefId').val();
    var reqType = $('#reqType').val();
     var LinkID;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "getContractLinkID"
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            
            if (jsonArr.length > 0) {
                 LinkID = jsonArr[0].LinkId;
                
                    
                }
            }
        });
        console.log('LinkID-->'+LinkID);
    var tdrow = "<tr>"
           +"    <td><input type='hidden' class='form-control form-rounded linkIdClass tableInputField' id='linkId' name='linkId' value='" + LinkID + "'>"
            +"    <input type='hidden' class='form-control form-rounded accAsgnCommItemInputClass tableInputField'  id='accAsgnCommItemInput' name='accAsgnCommItemInput' >"
             +"   <input type='hidden' class='form-control form-rounded gLAccountClass tableInputField' disabled='true'  id='gLAccount' name='gLAccount'>"
             +"   <input type='hidden' class='form-control form-rounded zgLAccountClass tableInputField' disabled='true'  id='zgLAccount' name='zgLAccount'>"
            + "   <input type='text' class='form-control form-rounded lineItemNumberServices tableInputField' disabled='true' value='" + rowCount + "' id='itemnumber' name='itemnumber'></td>"
            + "   <td><input type='text' class='form-control form-rounded accountAssignmentClass tableInputField' id='accassignment' name='accassignment'></td>";
            if(reqType==="Service"){
            tdrow += "   <td><input type='text' class='form-control form-rounded itemCategoryClass tableInputField' disabled value='D' id='itemcategory' name='itemcategory'></td>";
        }else{
            tdrow += "   <td><input type='text' disabled class='form-control form-rounded itemCategoryClass tableInputField' id='itemcategory' name='itemcategory'></td>";
        }
            tdrow +="    <td><input type='text' class='form-control form-rounded materialCodeClass tableInputField' id='materialCode'   name='materialCode'></td>"
            + "   <td><input type='text' class='form-control form-rounded shortTextClass tableInputField check-negative-value' min='0' id='shorttext' name='shorttext'></td>";
            if(reqType==="Service"){
           tdrow +="    <td><input type='number' class='form-control form-rounded targQtyClass tableInputField' disabled value=1 id='targQty'   name='targQty'></td>";
        }else{
           tdrow +="    <td><input type='number' class='form-control form-rounded targQtyClass tableInputField' id='targQty'   name='targQty'></td>";
        }
            
           tdrow += "   <td><input type='text' class='form-control form-rounded matlLongtxtClass tableInputField' id='matllongtext' name='matllongtext'></td>";
     if(reqType==="Service"){
            tdrow +="   <td><input type='text' class='form-control form-rounded uomClass tableInputField check-negative-value'  disabled value='AU' id='uom' name='uom'></td>";
           tdrow += "   <td><input type='number' class='form-control form-rounded perUnitClass tableInputField' disabled value=1 id='ppu' name='ppu'></td>";
            tdrow +="   <td><input type='text' class='form-control form-rounded orderPriUnClass tableInputField  check-negative-value' disabled value='AU' id='opu' name='opu'></td>";
        }else{
            tdrow += "   <td><input type='text' class='form-control form-rounded uomClass tableInputField check-negative-value'  id='uom' name='uom'></td>";
            tdrow += "   <td><input type='number' class='form-control form-rounded perUnitClass tableInputField' id='ppu' name='ppu'></td>";
            tdrow += "   <td><input type='text' class='form-control form-rounded orderPriUnClass tableInputField check-negative-value' id='opu' name='opu'></td>";
        }
            
            tdrow += "   <td><input type='number' class='form-control form-rounded netPriceClass tableInputField' id='np' name='np'></td>"
            + "   <td><input type='text' class='form-control form-rounded materialGrpClass tableInputField' id='matlgroup' name='matlgroup'></td>"
            + "   <td><input type='text' class='form-control form-rounded plantClass tableInputField' id='plant' name='plant'></td>"
            +"    <td><input type='text' class='form-control form-rounded SlocClass tableInputField' id='Sloc'  name='Sloc'></td>"
            +"    <td><a href='#' title='Delete' class='delete-contract-line'><i class='fas fa-trash-alt'></i></a></td>"
            + "</tr>";
    $("#contractItemTableId tbody").append(tdrow);
   // $("#contractItemTableId").val()=
            
            $('#ItemNumberSelect')
         .append($("<option></option>")
                    .attr("value", rowCount)
                    .text(rowCount)); 
});

$("#addContractServRowBtnId").click(function () {
    var rowCount = ($('#contractServiceTableId tr').length) * 10;
    var contractRefId = $('#contractRefId').val();
    var conItem = $('#ItemNumberSelect').val();
    var SerLinkID;
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "getServiceLinkID"
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            
            if (jsonArr.length > 0) {
                 SerLinkID = jsonArr[0].ServLinkId;
                
                    
                }
            }
        });
        console.log('SerLinkID-->'+SerLinkID)
        
         var selectedItem = $('#ItemNumberSelect').val();
       
   var linkID;
        $('#contractItemTableId tr').each(function (row, tr) {
           
            if(selectedItem === $(tr).find("td #itemnumber").val()){
            
                linkID=$(tr).find("td #linkId").val();
            
        }
    });
    console.log('Con LinkID-->'+linkID);
    var tdrow = "<tr>"
     +"  <td>  <input type='hidden' id='contlinkId' name='contlinkId' value='" + linkID + "'>"
      +"    <input type='hidden' id='serlinkId' name='serlinkId' value='" + SerLinkID + "'>"
            +"    <input type='checkbox' class='checkboxServices' id='' name=''></td>"
            + "   <td><input type='text' class='form-control form-rounded serviceItemNumber tableInputField' disabled='true' value='" + rowCount + "' id='itemnumber' name='itemnumber'></td>"
            + "   <td><input type='text' class='form-control form-rounded ServiceNumberClass tableInputField' id='ServiceNumber' name='ServiceNumber'></td>"
            + "   <td><input type='text' class='form-control form-rounded  ShortTextClass tableInputField' id='ShortText' disabled name='ShortText'></td>"
            + "   <td><input type='text' class='form-control form-rounded UnitClass tableInputField '  disabled id='Unit' name='Unit'></td>"
            + "   <td><input type='number' value='1' class='form-control form-rounded Serv_QuantityClass tableInputField check-negative-value'  min='0' id='Serv_Quantity' name='Serv_Quantity'></td>"
            + "   <td><input type='number'  class='form-control form-rounded GrossPriceClass tableInputField check-negative-value'  min='0' id='GrossPrice' name='GrossPrice'></td>"
            + "   <td><input type='Text'  class='form-control form-rounded CurrencyClass tableInputField '   id='Currency' name='Currency'></td>"
            + "   <td><input type='text' class='form-control form-rounded  tableInputField EditionClass ' id='Edition' name='Edition'></td>"
            + "    <td><a href='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>"
            + "</tr>";
    $("#contractServiceTableId tbody").append(tdrow);
});
//Girivasu
function setNotifyVendorInRfpDetails()
{
    var isVendorNotified = $("#isVendorNotified").val();

    if (isVendorNotified === "Yes")
    {
        $("#notifyvendor").prop("checked", true);
    } else
    {

    }
}
//function callNGWebServiceTOFetchPODetails() {
    $("#fetchOLA").click(function(event) {
    console.log("edit Contract");
//    var poNumber = $(this).parent().parent().find("td").eq(0).text();
    var poNumber = $("#contractNo").val();
    console.log("contractNo: " + poNumber);

    var xmlInput = "<POFetch>";
    xmlInput += "<PONumber>" + poNumber + "</PONumber>";
    xmlInput += "<FetchFlag>R</FetchFlag>";
    xmlInput += "</POFetch>";

//    var dmsip = $("#dmsip").val();
//    console.log(dmsip);
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var URLParam = xmlInput;
    console.log("URLParam: " + URLParam);

//    var serviceUrl = dmsip + "/PR2POWebservice/ng/sapservice/POFetch";
   // var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_FetchPO?PONumber=" + poNumber + "&FetchFlag=R";
    var serviceUrl = "https://natsteeluat.newgenbpmcloud.com/WebServiceCall/FetchContract?ContractNo=" + poNumber;
    console.log("serviceUrl: " + serviceUrl);

//    fetchPODetails("");

$.get(serviceUrl).done(function (data) {
    fetchContractDetails(data);
});

//    $.ajax({
//        type: "GET",
//        url: serviceUrl,
//        contentType: "application/xml",
//        dataType: "xml",
//        async: true,
//        success: function(data, textStatus, jqXHR) {
//           // fetchPODetails(data);
//        }
//    });
});
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
var parsedJsonContractData;
function fetchContractDetails(xmlre)
{
    
    console.log("xmlre in EditStandalonePO :" + xmlre);
    
    var xmlString = XMLToString(xmlre); //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

    var $xml = $(xmlDoc);

    var x2js = new X2JS();
    var jsonPoData = JSON.stringify(x2js.xml_str2json(xmlString));
    console.log("json: " + jsonPoData);

    parsedJsonContractData = $.parseJSON(jsonPoData);

    var MainCode = parsedJsonContractData.ContractFetchOutPut.MainCode;
    var Message = parsedJsonContractData.ContractFetchOutPut.Message;
    console.log("MainCode: " + MainCode);
    console.log("Message: " + Message);

    if (Message === "Error" || Message === "error")
    {
        Lobibox.alert("error", {
            msg: "Failed to Fetch PO Details."
        });
    }
    
    // General Data Starts
    $("#companyCode").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.COMP_CODE);
    $("#requestType").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DOC_TYPE);
    $("#contractType").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DOC_TYPE);
    $("#vendorname").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.VENDOR);
    $("#vendorcode").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.VENDOR);
    $("#rfqno").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.QUOTATION);
    
    //Agreement Data
    $("#finalagreementvalue").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.ACUM_VALUE);
    $("#agreementtype").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DOC_TYPE);
    $("#agreementdate").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DOC_DATE);
    $("#validitystartdate").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.VPER_START);
    $("#validityenddate").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.VPER_END);
   // $("#duration").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.InitiatorEmailId);
    $("#currency").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.CURRENCY);
    $('.selectpicker').selectpicker('refresh');
    //OLA Administrative Fields
    $("#PurchOrganization").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.PURCH_ORG);
    $('.selectpicker').selectpicker('refresh');
    $("#PurchaseGroup").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.PUR_GROUP);
    $('.selectpicker').selectpicker('refresh');
    $("#ItemIntervalNumber").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.ITEM_INTVL);
    $("#SubItemInterval").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.SUBITEMINT);
    
    if (parsedJsonContractData.ContractFetchOutPut.GeneralData.GR_MESSAGE === "X")
        {
            $("#GRMessage").prop("checked", true);
        }
        else
        {
            $("#GRMessage").prop("checked", false);
        }
   // $("#GRMessage").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.GR_MESSAGE);
    
    //Terms of Delivery and Payment
    $("#AgreedPaymentTerms").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.PMNTTRMS);
    $('.selectpicker').selectpicker('refresh');
    $("#paymentindays").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DSCNT1_TO);
    $("#paymentinperc").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DSCT_PCT1);
    $("#paymentindays2").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DSCNT2_TO);
    $("#paymentinperc2").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DSCT_PCT2);
    $("#paymentindaysnet").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.DSCNT3_TO);
    $("#ExchangeRate").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.EXCH_RATE);
    
    if (parsedJsonContractData.ContractFetchOutPut.GeneralData.EX_RATE_FX === "X")
        {
            $("#ExchangeRateFixed").prop("checked", true);
        }
        else
        {
            $("#ExchangeRateFixed").prop("checked", false);
        }
    
    //$("#ExchangeRateFixed").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.EX_RATE_FX);
    $("#IncoTermsPart1").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.INCOTERMS1);
    $("#IncotermsPart2").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.INCOTERMS2);
    
    //Reference Data
    $("#YourReference").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.REFERENCE);
    $("#SalesPerson").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.SALES_PERS);
    $("#OurReference").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.OUR_REFERENCE);
    $("#Telephone").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.TELEPHONE);
    $("#SupplVendor").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.SUPPL_VEND);
    $("#InvoicingParty").val(parsedJsonContractData.ContractFetchOutPut.GeneralData.CUSTOMER);
    
    

//    // ContractItem Starts
    if (parsedJsonContractData.ContractFetchOutPut.ContractLineItemData !== undefined)
    {
        var ContractLineDataArray = parsedJsonContractData.ContractFetchOutPut.ContractLineItemData;
        console.log("ContractLineDataArray: " + ContractLineDataArray);
        console.log("ContractLineDataArray is Array: " + Array.isArray(ContractLineDataArray));
        if (ContractLineDataArray !== undefined) {
            if (Array.isArray(ContractLineDataArray) === true) {
                console.log("ContractLineDataArray len: " + ContractLineDataArray.length);
                var row = "";
                $("#contractItemTableId tbody tr").remove();
                for (var i = 0; i < ContractLineDataArray.length; i++) {

                   
     row =row+ "<tr>"
           +"    <td><input type='hidden' class='form-control form-rounded linkIdClass tableInputField' id='linkId' name='linkId' value='" + LinkID + "'>"
            +"    <input type='hidden' class='form-control form-rounded accAsgnCommItemInputClass tableInputField'  id='accAsgnCommItemInput' name='accAsgnCommItemInput' >"
            +"   <input type='hidden' class='form-control form-rounded gLAccountClass tableInputField' disabled='true'  id='gLAccount' name='gLAccount'>"
            +"   <input type='hidden' class='form-control form-rounded zgLAccountClass tableInputField' disabled='true'  id='zgLAccount' name='zgLAccount'>"
            + "   <input type='text' class='form-control form-rounded lineItemNumberServices tableInputField' disabled='true' value='" + (ContractLineDataArray[i].ITEM_NO === undefined ? "" : ContractLineDataArray[i].ITEM_NO) + "' id='itemnumber' name='itemnumber'></td>"
            + "   <td><input type='text' class='form-control form-rounded accountAssignmentClass tableInputField' id='accassignment' name='accassignment' value='" + (ContractLineDataArray[i].ACCTASSCAT === undefined ? "" : ContractLineDataArray[i].ACCTASSCAT) + "'></td>"
            + "   <td><input type='text' disabled class='form-control form-rounded itemCategoryClass tableInputField' id='itemcategory' name='itemcategory' value='" + (ContractLineDataArray[i].ITEM_CAT === undefined ? "" : ContractLineDataArray[i].ITEM_CAT) + "'></td>"
            +"    <td><input type='text' class='form-control form-rounded materialCodeClass tableInputField' id='materialCode'   name='materialCode' value='" + (ContractLineDataArray[i].MATERIAL === undefined ? "" : ContractLineDataArray[i].MATERIAL) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded shortTextClass tableInputField check-negative-value' min='0' id='shorttext' name='shorttext' value='" + (ContractLineDataArray[i].SHORT_TEXT === undefined ? "" : ContractLineDataArray[i].SHORT_TEXT) + "'></td>"
            +"    <td><input type='number' class='form-control form-rounded targQtyClass tableInputField' disabled value=1 id='targQty'   name='targQty' value='" + (ContractLineDataArray[i].TARGET_QTY === undefined ? "" : ContractLineDataArray[i].TARGET_QTY) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded matlLongtxtClass tableInputField' id='matllongtext' name='matllongtext' value='" + (ContractLineDataArray[i].SHORT_TEXT === undefined ? "" : ContractLineDataArray[i].SHORT_TEXT) + "'></td>"
            +"   <td><input type='text' class='form-control form-rounded uomClass tableInputField check-negative-value'  disabled  id='uom' name='uom' value='" + (ContractLineDataArray[i].PO_UNIT === undefined ? "" : ContractLineDataArray[i].PO_UNIT) + "'></td>"
            + "   <td><input type='number' class='form-control form-rounded perUnitClass tableInputField' disabled value=1 id='ppu' name='ppu' value='" + (ContractLineDataArray[i].PRICE_UNIT === undefined ? "" : ContractLineDataArray[i].PRICE_UNIT) + "'></td>"
             +"   <td><input type='text' class='form-control form-rounded orderPriUnClass tableInputField  check-negative-value' disabled  id='opu' name='opu' value='" + (ContractLineDataArray[i].ORDERPR_UN === undefined ? "" : ContractLineDataArray[i].ORDERPR_UN) + "'></td>"
            + "   <td><input type='number' class='form-control form-rounded netPriceClass tableInputField' id='np' name='np' value='" + (ContractLineDataArray[i].NET_PRICE === undefined ? "" : ContractLineDataArray[i].NET_PRICE) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded materialGrpClass tableInputField' id='matlgroup' name='matlgroup' value='" + (ContractLineDataArray[i].MATL_GROUP === undefined ? "" : ContractLineDataArray[i].MATL_GROUP) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded plantClass tableInputField' id='plant' name='plant' value='" + (ContractLineDataArray[i].PLANT === undefined ? "" : ContractLineDataArray[i].PLANT) + "'></td>"
            +"    <td><input type='text' class='form-control form-rounded SlocClass tableInputField' id='Sloc'  name='Sloc' value='" + (ContractLineDataArray[i].STGE_LOC === undefined ? "" : ContractLineDataArray[i].STGE_LOC) + "'></td>"
//            +"    <td><a href='#' title='Delete' class='delete-contract-line'><i class='fas fa-trash-alt'></i></a></td>"
            +"    <td></td>"
            + "</tr>";
                    
                }
                $("#contractItemTableId tbody").append(row);
            }else{
               $("#contractItemTableId tbody tr").remove(); 
             
    var row = "<tr>"
           +"    <td><input type='hidden' class='form-control form-rounded linkIdClass tableInputField' id='linkId' name='linkId' value='" +  + "'>"
            +"    <input type='hidden' class='form-control form-rounded accAsgnCommItemInputClass tableInputField'  id='accAsgnCommItemInput' name='accAsgnCommItemInput' >"
            +"   <input type='hidden' class='form-control form-rounded gLAccountClass tableInputField' disabled='true'  id='gLAccount' name='gLAccount'>"
            +"   <input type='hidden' class='form-control form-rounded zgLAccountClass tableInputField' disabled='true'  id='zgLAccount' name='zgLAccount'>"
            + "   <input type='text' class='form-control form-rounded lineItemNumberServices tableInputField' disabled='true' value='" + (ContractLineDataArray.ITEM_NO === undefined ? "" : ContractLineDataArray.ITEM_NO) + "' id='itemnumber' name='itemnumber'></td>"
            + "   <td><input type='text' class='form-control form-rounded accountAssignmentClass tableInputField' id='accassignment' name='accassignment' value='" + (ContractLineDataArray.ACCTASSCAT === undefined ? "" : ContractLineDataArray.ACCTASSCAT) + "'></td>"
            + "   <td><input type='text' disabled class='form-control form-rounded itemCategoryClass tableInputField' id='itemcategory' name='itemcategory' value='" + (ContractLineDataArray.ITEM_CAT === undefined ? "" : ContractLineDataArray.ITEM_CAT) + "'></td>"
            +"    <td><input type='text' class='form-control form-rounded materialCodeClass tableInputField' id='materialCode'   name='materialCode' value='" + (ContractLineDataArray.MATERIAL === undefined ? "" : ContractLineDataArray.MATERIAL) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded shortTextClass tableInputField check-negative-value' min='0' id='shorttext' name='shorttext' value='" + (ContractLineDataArray.SHORT_TEXT === undefined ? "" : ContractLineDataArray.SHORT_TEXT) + "'></td>"
            +"    <td><input type='number' class='form-control form-rounded targQtyClass tableInputField' disabled value=1 id='targQty'   name='targQty' value='" + (ContractLineDataArray.TARGET_QTY === undefined ? "" : ContractLineDataArray.TARGET_QTY) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded matlLongtxtClass tableInputField' id='matllongtext' name='matllongtext' value='" + (ContractLineDataArray.SHORT_TEXT === undefined ? "" : ContractLineDataArray.SHORT_TEXT) + "'></td>"
            +"   <td><input type='text' class='form-control form-rounded uomClass tableInputField check-negative-value'  disabled  id='uom' name='uom' value='" + (ContractLineDataArray.PO_UNIT === undefined ? "" : ContractLineDataArray.PO_UNIT) + "'></td>"
            + "   <td><input type='number' class='form-control form-rounded perUnitClass tableInputField' disabled value=1 id='ppu' name='ppu' value='" + (ContractLineDataArray.PRICE_UNIT === undefined ? "" : ContractLineDataArray.PRICE_UNIT) + "'></td>"
             +"   <td><input type='text' class='form-control form-rounded orderPriUnClass tableInputField  check-negative-value' disabled  id='opu' name='opu' value='" + (ContractLineDataArray.ORDERPR_UN === undefined ? "" : ContractLineDataArray.ORDERPR_UN) + "'></td>"
            + "   <td><input type='number' class='form-control form-rounded netPriceClass tableInputField' id='np' name='np' value='" + (ContractLineDataArray.NET_PRICE === undefined ? "" : ContractLineDataArray.NET_PRICE) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded materialGrpClass tableInputField' id='matlgroup' name='matlgroup' value='" + (ContractLineDataArray.MATL_GROUP === undefined ? "" : ContractLineDataArray.MATL_GROUP) + "'></td>"
            + "   <td><input type='text' class='form-control form-rounded plantClass tableInputField' id='plant' name='plant' value='" + (ContractLineDataArray.PLANT === undefined ? "" : ContractLineDataArray.PLANT) + "'></td>"
            +"    <td><input type='text' class='form-control form-rounded SlocClass tableInputField' id='Sloc'  name='Sloc' value='" + (ContractLineDataArray.STGE_LOC === undefined ? "" : ContractLineDataArray.STGE_LOC) + "'></td>"
//            +"    <td><a href='#' title='Delete' class='delete-contract-line'><i class='fas fa-trash-alt'></i></a></td>"
            +"    <td></td>"
            + "</tr>";
    $("#contractItemTableId tbody").append(row);
            }
//            else
//            {
//                var row = "";
//                $("#conditionTableIdLineLevel tbody tr").remove();
//
//                row += "<tr>"
//                        + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'></td>"
//                        + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (POConditionsDataArray[i].CondType === undefined ? "" : POConditionsDataArray[i].CondType) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (POConditionsDataArray[i].CondName === undefined ? "" : POConditionsDataArray[i].CondName) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' value='" + (POConditionsDataArray[i].Amount === undefined ? "" : POConditionsDataArray[i].Amount) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' value=''></td>"
//                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value='" + (POConditionsDataArray[i].CondPricUnit === undefined ? "" : POConditionsDataArray[i].CondPricUnit) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (POConditionsDataArray[i].CondCrncy === undefined ? "" : POConditionsDataArray[i].CondCrncy) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (POConditionsDataArray[i].CondUnit === undefined ? "" : POConditionsDataArray[i].CondUnit) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' value='" + (POConditionsDataArray[i].CondVal === undefined ? "" : POConditionsDataArray[i].CondVal) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (POConditionsDataArray[i].Currency === undefined ? "" : POConditionsDataArray[i].Currency) + "'></td>"
//                        + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value=''></td>"
//                        + "<td><input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value=''></td>"
//                        + "<td><input type='text' class='form-control form-rounded conditionDetailsHeader tableInputField' name='conditionDetailsHeader' value=''>"
//                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (POConditionsDataArray[i].Application === undefined ? "" : POConditionsDataArray[i].Application) + "'>"
//                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (POConditionsDataArray[i].AccountKey === undefined ? "" : POConditionsDataArray[i].AccountKey) + "'>"
//                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (POConditionsDataArray[i].Accruals === undefined ? "" : POConditionsDataArray[i].Accruals) + "'>"
//                        + "<input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (POConditionsDataArray[i].CondCount === undefined ? "" : POConditionsDataArray[i].CondCount) + "'>"
//                        + "<input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (POConditionsDataArray[i].CondSTNo === undefined ? "" : POConditionsDataArray[i].CondSTNo) + "'>"
//                        + "<input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (POConditionsDataArray[i].CondChangeId === undefined ? "" : POConditionsDataArray[i].CondChangeId) + "'></td>"
//                        + "</tr>";
//
//                $("#conditionTableId tbody").append(row);
//            }
        }
    }
    // Contract Item Ends

//    // POLineItemData Starts 
//    var itemDropdownLength = $("#ItemNumberSelect option").length;
//    $("#ItemNumberSelect option").remove();
//
//    var POLineItemDataArray = parsedJsonPoData.POFetchOP.POLineItemData;
//    var poLineItemRow = "";
//    var itemNumberSelect = "<option value=''>Select</option>";
//    console.log("POLineItemDataArray: " + POLineItemDataArray);
//    var Ref_Doc_Number = "";
//    var Ref_Doc_Line = "";
//
//    if (POLineItemDataArray !== undefined) {
//        $("#material_headerClass tbody tr").remove();
//
//        PRLineItemArray = [];
//        if (Array.isArray(POLineItemDataArray) === true) {
//            console.log("POLineItemDataArray len: " + POLineItemDataArray.length);
//
//            var prType = "";
//            for (var i = 0; i < POLineItemDataArray.length; i++)
//            {
//                var prJsonObj = {};
//
//                prJsonObj["ItemNumber"] = POLineItemDataArray[i].ItemNumber;
//                prJsonObj["PRItemNumber"] = POLineItemDataArray[i].PRItemNumber;
//                prJsonObj["PackageNo"] = POLineItemDataArray[i].PackageNo;
//                prJsonObj["LinkId"] = POLineItemDataArray[i].PRLinkID;
//
//                PRLineItemArray.push(prJsonObj);
//
//                var prLineItemCategory = POLineItemDataArray[i].ItemCategory;
//                if (prLineItemCategory !== "D")
//                {
//                    $("#serviceTab_li").css("display", "none");
//                    $("#limits_li").css("display", "none");
//
//                    $("#prType").val("Material");
//
//                    $("#services-tab").removeClass("active");
//                    $("#quantities").addClass("active");
//                    $("#quantities-tab").addClass("active");
//
////                    prType = "Capital PR for Materials";
//                }
//                else
//                {
//                    $("#prType").val("Service");
////                    prType = "Capital PR for Services";
//                }
//
//                Ref_Doc_Number += "<option>" + POLineItemDataArray[i].PRNumber + "</option>";
//                Ref_Doc_Line += "<option>" + POLineItemDataArray[i].PRItemNumber + "</option>";
//                itemNumberSelect += "<option value='" + (POLineItemDataArray[i].ItemNumber) + "'>" + POLineItemDataArray[i].ItemNumber + "</option>";
////                alert("POLineItemDataArray[i].Unit :" + POLineItemDataArray[i].Unit);
//                poLineItemRow += "<tr>"
//                        + "<td><input type=hidden class=PODistribution>\n\
//                        <input type=hidden class=POPartialInvoiceIndicator>\n\
//                        <input type=hidden class=prTaxCode value='" + POLineItemDataArray[i].TaxCode + "'><i class='fa fa-window-close delete-pr-line' aria-hidden='true'></i>\n\
//                        <input type='hidden' class='linkid' value='" + POLineItemDataArray[i].PRLinkID + "'>\n\
//                        <input type='hidden' class='prNumber' value='" + POLineItemDataArray[i].PRNumber + "'>\n\
//                        <input type='hidden' class='prgLCode'>\n\
//                        <input type='hidden' class='przGLCode'></td>"
//                        + "<td>" + POLineItemDataArray[i].ItemNumber + "</td>"
//                        + "<td><input type='text' value='" + POLineItemDataArray[i].AccountAssignment + "' class='accountAssignmentClass form-control form-rounded'></td>"
//                        + "<td><input type='text' value='" + POLineItemDataArray[i].ItemCategory + "' class='itemCategoryClass form-control form-rounded'></td>"
//                        + "<td><input type='text' value='" + (POLineItemDataArray[i].MaterialCode === undefined ? "" : POLineItemDataArray[i].MaterialCode) + "' class='materialCodeClass form-control form-rounded'></td>"
////                        + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value='" + (POLineItemDataArray[i].Criticality === undefined ? "" : POLineItemDataArray[i].Criticality) + "'>Select</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
//                        + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value='Off Site (o)'>Off Site (o)</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
////                        + "<td><input type=text class='form-control form-rounded prShortText' style='width:150px;' value='" + (POLineItemDataArray[i].ShortText === undefined ? "" : POLineItemDataArray[i].ShortText) + "'></td>"
//                        + "<td><input type=text class='form-control form-rounded prShortText' style='width:150px;' value='h-ASDA'></td>"
//                        + "<td>" + (POLineItemDataArray[i].MaterialLongText === undefined ? "" : POLineItemDataArray[i].MaterialLongText) + "</td>"
//                        + "<td><input style='width:100px;' type='number' value='" + (POLineItemDataArray[i].Quantity === undefined ? "" : POLineItemDataArray[i].Quantity) + "' min='0' class='form-control form-rounded quantity_Class check-negative-value'></td>"
//                        + "<td><input style='width:100px;' type=number min='0' value='" + (POLineItemDataArray[i].NetPrice === undefined ? "" : POLineItemDataArray[i].NetPrice) + "' class='form-control form-rounded prNetPrice check-negative-value'></td>"
//                        + "<td><input style='width:100px;' type=number min='0' value='" + (POLineItemDataArray[i].PriceUnit === undefined ? "" : POLineItemDataArray[i].PriceUnit) + "' class='form-control form-rounded prPerUnit check-negative-value'></td>"
//                        + "<td><input type='text' value='" + (POLineItemDataArray[i].Currency === undefined ? "" : POLineItemDataArray[i].Currency) + "' class='currencyClass form-control form-rounded'></td>"
//                        + "<td></td>"
//                        + "<td><input type=text class='form-control form-rounded pODeliveryDateCetegory' value='" + (POLineItemDataArray[i].DeliveryDateCategory === undefined ? "" : POLineItemDataArray[i].DeliveryDateCategory) + "'></td>"
//                        + "<td><input type='date' value='" + (POLineItemDataArray[i].RequisitionDate === undefined ? "" : POLineItemDataArray[i].RequisitionDate) + "' class='requisitionDateClass form-control form-rounded' min='" + (POLineItemDataArray[i].RequisitionDate === undefined ? "" : POLineItemDataArray[i].RequisitionDate) + "'></td>"
//                        + "<td><input type='date' class='deliveryDateClass form-control form-rounded' value='" + (POLineItemDataArray[i].DeliveryDate === undefined ? "" : POLineItemDataArray[i].DeliveryDate) + "' min='" + (POLineItemDataArray[i].DeliveryDate === undefined ? "" : POLineItemDataArray[i].DeliveryDate) + "'></td>"
//                        + "<td><input type='text'  style='width:100px;' class='plantClass form-control form-rounded' value='" + (POLineItemDataArray[i].Plant === undefined ? "" : POLineItemDataArray[i].Plant) + "'></td>"
////                        + "<td><input type='text'  class='matlGroup form-control form-rounded' value='" + (POLineItemDataArray[i].MaterialGroup === undefined ? "" : POLineItemDataArray[i].MaterialGroup) + "'></td>"
//                        + "<td><input type='text'  class='matlGroup form-control form-rounded' value='INSM01'></td>"
//                        + "<td><input type='text'  class='purchaseOrgClass form-control form-rounded' value='" + (POLineItemDataArray[i].PurchasingOrganization === undefined ? "" : POLineItemDataArray[i].PurchasingOrganization) + "'></td>"
//                        + "<td><input type='text'  class='purchaseGroupClass form-control form-rounded' value='" + (POLineItemDataArray[i].PurchasingGroup === undefined ? "" : POLineItemDataArray[i].PurchasingGroup) + "'></td>"
//                        + "<td><input type='text'  class='storageLocationClass form-control form-rounded' value='" + (POLineItemDataArray[i].StorageLocation === undefined ? "" : POLineItemDataArray[i].StorageLocation) + "'></td>"
//                        + "<td></td>"
//                        + "<td>" + (POLineItemDataArray[i].InfoRecord === undefined ? "" : POLineItemDataArray[i].InfoRecord) + "</td>"
//                        + "<td></td>"
//                        + "<td></td>"
//                        + "<td><input type='text' value='' class='prDeptNameClass form-control form-rounded'></td>"
//                        + "<td><input type='text' value='' class='poDeptNameClass form-control form-rounded'></td>"
//                        + "<td></td>"
//                        + "<td></td>"
//                        + "<td><input type='text' class='trackingNumber form-control form-rounded' value='" + (POLineItemDataArray[i].TrackingNumber === undefined ? "" : POLineItemDataArray[i].TrackingNumber) + "'></td>"
////                        + "<td><input type='text' class='trackingNumber form-control form-rounded' value='17'></td>"
//                        + "<td>" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "</td>"
//                        + "<td>" + (POLineItemDataArray[i].Unit === undefined ? "" : POLineItemDataArray[i].Unit) + "</td>"
//                        + "</tr>";
//
//            }
//            $("#ItemNumberSelect").append(itemNumberSelect);
//            $("#material_headerClass tbody").append(poLineItemRow);
//            // POLineItemData Ends
//        }
//        else
//        {
//            var prJsonObj = {};
//
//            prJsonObj["ItemNumber"] = POLineItemDataArray.ItemNumber;
//            prJsonObj["PRItemNumber"] = POLineItemDataArray.PRItemNumber;
//            prJsonObj["PackageNo"] = POLineItemDataArray.PackageNo;
//            prJsonObj["LinkId"] = POLineItemDataArray.PRLinkID;
//
//            PRLineItemArray.push(prJsonObj);
//
//            var prLineItemCategory = POLineItemDataArray.ItemCategory;
//            if (prLineItemCategory !== "D")
//            {
//                $("#serviceTab_li").css("display", "none");
//                $("#limits_li").css("display", "none");
//
//                $("#prType").val("Material");
//
//                $("#services-tab").removeClass("active");
//                $("#quantities").addClass("active");
//                $("#quantities-tab").addClass("active");
//
////                prType = "Capital PR for Materials";
//            }
//            else
//            {
//                $("#prType").val("Service");
////                prType = "Capital PR for Services";
//            }
//
//            Ref_Doc_Number += "<option>" + POLineItemDataArray.PRNumber + "</option>";
//            Ref_Doc_Line += "<option>" + POLineItemDataArray.PRItemNumber + "</option>";
//            itemNumberSelect += "<option value='" + (POLineItemDataArray.ItemNumber) + "'>" + POLineItemDataArray.ItemNumber + "</option>";
////            alert("POLineItemDataArray.TrackingNumber :" + POLineItemDataArray.TrackingNumber);
//            poLineItemRow = "<tr>"
//                    + "<td><input type=hidden class=PODistribution>\n\
//                        <input type=hidden class=POPartialInvoiceIndicator>\n\
//                        <input type=hidden class=prTaxCode value='" + POLineItemDataArray.TaxCode + "'><i class='fa fa-window-close delete-pr-line' aria-hidden='true'></i>\n\
//                        <input type='hidden' class='linkid' value='" + POLineItemDataArray.PRLinkID + "'>\n\
//                        <input type='hidden' class='prNumber' value='" + POLineItemDataArray.PRNumber + "'>\n\
//                        <input type='hidden' class='prgLCode'>\n\
//                        <input type='hidden' class='przGLCode'></td>"
//                    + "<td>" + POLineItemDataArray.ItemNumber + "</td>"
//                    + "<td><input type='text' value='" + POLineItemDataArray.AccountAssignment + "' class='accountAssignmentClass form-control form-rounded'></td>"
//                    + "<td><input type='text' value='" + POLineItemDataArray.ItemCategory + "' class='itemCategoryClass form-control form-rounded'></td>"
//                    + "<td><input type='text' value='" + (POLineItemDataArray.MaterialCode === undefined ? "" : POLineItemDataArray.MaterialCode) + "' class='materialCodeClass form-control form-rounded'></td>"
//                    + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value='" + (POLineItemDataArray.Criticality === undefined ? "" : POLineItemDataArray.Criticality) + "'>Select</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
//                    + "<td><input type=text class='form-control form-rounded prShortText' style='width:150px;' value='" + (POLineItemDataArray.ShortText === undefined ? "" : POLineItemDataArray.ShortText) + "'></td>"
//                    + "<td>" + (POLineItemDataArray.MaterialLongText === undefined ? "" : POLineItemDataArray.MaterialLongText) + "</td>"
//                    + "<td><input style='width:100px;' type='number' value='" + (POLineItemDataArray.Quantity === undefined ? "" : POLineItemDataArray.Quantity) + "' min='0' class='form-control form-rounded quantity_Class check-negative-value'></td>"
//                    + "<td><input style='width:100px;' type=number min='0' value='" + (POLineItemDataArray.NetPrice === undefined ? "" : POLineItemDataArray.NetPrice) + "' class='form-control form-rounded prNetPrice check-negative-value'></td>"
//                    + "<td><input style='width:100px;' type=number min='0' value='" + (POLineItemDataArray.PriceUnit === undefined ? "" : POLineItemDataArray.PriceUnit) + "' class='form-control form-rounded prPerUnit check-negative-value'></td>"
//                    + "<td><input type='text' value='" + (POLineItemDataArray.Currency === undefined ? "" : POLineItemDataArray.Currency) + "' class='currencyClass form-control form-rounded'></td>"
//                    + "<td></td>"
//                    + "<td><input type=text class='form-control form-rounded pODeliveryDateCetegory' value='" + (POLineItemDataArray.DeliveryDateCategory === undefined ? "" : POLineItemDataArray.DeliveryDateCategory) + "'></td>"
//                    + "<td><input type='date' value='" + (POLineItemDataArray.RequisitionDate === undefined ? "" : POLineItemDataArray.RequisitionDate) + "' class='requisitionDateClass form-control form-rounded' min='" + (POLineItemDataArray.RequisitionDate === undefined ? "" : POLineItemDataArray.RequisitionDate) + "'></td>"
//                    + "<td><input type='date' class='deliveryDateClass form-control form-rounded' value='" + (POLineItemDataArray.DeliveryDate === undefined ? "" : POLineItemDataArray.DeliveryDate) + "' min='" + (POLineItemDataArray.DeliveryDate === undefined ? "" : POLineItemDataArray.DeliveryDate) + "'></td>"
//                    + "<td><input type='text'  style='width:100px;' class='plantClass form-control form-rounded' value='" + (POLineItemDataArray.Plant === undefined ? "" : POLineItemDataArray.Plant) + "'></td>"
//                    + "<td><input type='text'  class='matlGroup form-control form-rounded' value='" + (POLineItemDataArray.MaterialGroup === undefined ? "" : POLineItemDataArray.MaterialGroup) + "'></td>"
//                    + "<td><input type='text'  class='purchaseOrgClass form-control form-rounded' value='" + (POLineItemDataArray.PurchasingOrganization === undefined ? "" : POLineItemDataArray.PurchasingOrganization) + "'></td>"
//                    + "<td><input type='text'  class='purchaseGroupClass form-control form-rounded' value='" + (POLineItemDataArray.PurchasingGroup === undefined ? "" : POLineItemDataArray.PurchasingGroup) + "'></td>"
//                    + "<td><input type='text'  class='storageLocationClass form-control form-rounded' value='" + (POLineItemDataArray.StorageLocation === undefined ? "" : POLineItemDataArray.StorageLocation) + "'></td>"
//                    + "<td></td>"
//                    + "<td>" + (POLineItemDataArray.InfoRecord === undefined ? "" : POLineItemDataArray.InfoRecord) + "</td>"
//                    + "<td></td>"
//                    + "<td></td>"
//                    + "<td><input type='text' value='' class='prDeptNameClass form-control form-rounded'></td>"
//                    + "<td><input type='text' value='' class='poDeptNameClass form-control form-rounded'></td>"
//                    + "<td></td>"
//                    + "<td></td>"
//                    + "<td><input type='text' class='trackingNumber form-control form-rounded' value='" + (POLineItemDataArray.TrackingNumber === undefined ? "" : POLineItemDataArray.TrackingNumber) + "'></td>"
//                    + "<td>" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "</td>"
//                    + "<td>" + (POLineItemDataArray.Unit === undefined ? "" : POLineItemDataArray.Unit) + "</td>"
//                    + "</tr>";
//
//            $("#ItemNumberSelect").append(itemNumberSelect);
//            $("#material_headerClass tbody").append(poLineItemRow);
//        }
//        $("#referenceDocNumber").append(Ref_Doc_Number);
//        $("#referenceDocLine").append(Ref_Doc_Line);
//    }
//    // POLineItemData Ends
//
//    console.log("PRLineItemArray.length: " + PRLineItemArray.length);
//
//    $("#TempAttachmentId").val("1");
//
//    $("#reqDataSavedOnPoNumer").val("FromPONumber");
//    $.ajax({
//        url: saveHeadersa("PONumber"),
//        success: function() {
//
//            var poNumber = $("#poNumber").val();
////            alert("poNumber :" + poNumber);
//            savePrLineLevelData(poNumber);
//        }
//    });
//
//
////    saveHeadersa();
////    savePrLineLevelData(poNumber);
//
//    
}
    



$("#createOLABtn").click(function () {
    var rfqid = $("#rfqnumber").val();
//    alert(rfqid);
    var reqFrom = "byrfq";
    location.href = "createpo.do?rfqid=" + rfqid + "&reqFrom=" + reqFrom;
});

