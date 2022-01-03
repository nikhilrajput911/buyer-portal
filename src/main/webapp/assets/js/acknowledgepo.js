if ($("table.acknowledgePoTable").length) {
    $(document).ready(function() {
        $('#acknowledgePoTable thead tr').clone(true).appendTo('#acknowledgePoTable thead');
        $('#acknowledgePoTable thead tr:eq(1) th').each(function(i) {
            $('#acknowledgePoTable thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === "") {
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
        var table = $('table.acknowledgePoTable').DataTable({
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
                    buttons: [
                        {extend: 'excel', title: 'Acknowledge PO', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'Acknowledge PO', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'Acknowledge PO', exportOptions: {columns: 'thead th:not(.noExport)'}}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#acknowledgePoTable_wrapper .col-md-6:eq(0)');
    });
}
if ($("table.pendingVendorAckTableClass").length) {
    $(document).ready(function() {
        $('#pendingVendorAckTableId thead tr').clone(true).appendTo('#pendingVendorAckTableId thead');
        $('#pendingVendorAckTableId thead tr:eq(1) th').each(function(i) {
            $('#pendingVendorAckTableId thead tr:eq(0) th').addClass("table-header-color");
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

        var table = $('table.pendingVendorAckTableClass').DataTable({
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
                        {extend: 'excel', title: 'PO Pending Vendor Acknowledgement', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'pdf', title: 'PO Pending Vendor Acknowledgement', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: {columns: 'thead th:not(.noExport)'}},
                        {extend: 'print', title: 'PO Pending Vendor Acknowledgement', customize: function(win)
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
                .appendTo('#pendingVendorAckTableId_wrapper .col-md-6:eq(0)');
    });
}
$(document).ready(function() {
    $(".viewPoDocument").click(function() {
        console.log("viewPoDocument click");

        var viewPrDocIp = $("#viewPrDocIp").val();
        console.log("viewPrDocIp: " + viewPrDocIp);

        var pid = $("#pidForm").val();
        console.log("pid: " + pid);

        var url = viewPrDocIp + "/omnidocs/integration/foldView/viewFoldList.jsp?Application=ViewPODocument&S=S&FolderName=" + pid;
        console.log("url :" + url);

        window.open(url, "_blank");
    });
    $(".uploadSignedPoCopy").click(function() {
        console.log("uploadSignedPoCopy click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();
        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);
        $("#ro_pid").val(pid);
        $("#ro_poNumber").val(poNumber);
        $("#uploadSignedPOCopyModal").modal("show");
    });
    $("#uploaddocumentModalBtn").click(function() {
        $("#overlay").css("display", "block");
        if ($("input[name='file_docDiv1']").val().trim() !== "")
        {
            console.log("submit...");
            $("#uploadSignedPOCopyModal").modal("hide");
        }
        else
        {
            $("#overlay").css("display", "none");
            Lobibox.alert("error",
                    {
                        msg: "Please Upload Signed PO Copy!"
                    });
        }
    });
    $("#acknowledgeDocForm").submit(function(event) {
        event.preventDefault();
        if ($("input[name='file_docDiv1']").val().trim() !== "") {
            var formData = new FormData(this);
            $.ajax(
                    {
                        type: "POST",
                        url: "uploadsignedpo.do",
                        async: true,
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        complete: function(responseJson)
                        {
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("obj.Result: " + obj.Result);
                            console.log("obj.Message: " + obj.Message);
                            if (obj.Result === "Success")
                            {
                                $("#isSignedPoUploaded").val("Yes");
                                var ro_pid = $("#ro_pid").val();
                                console.log("ro_pid: " + ro_pid);

                                var WebServiceCallIp = $("#WebServiceCallIp").val();
                                console.log("WebServiceCallIp: " + WebServiceCallIp);

                                var buyerUsername = $("#buyerUsername").val();
                                console.log("buyerUsername: " + buyerUsername);

                                var currentDate = $("#currentDate").val();
                                console.log("currentDate: " + currentDate);

                                var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CompleteWI?ProcessInstanceId=" + ro_pid + "&AckDate=" + currentDate + "&AckAction=Approve&AckComments=&AckBy=Buyer&AckByDetails=" + buyerUsername + "&Stage=BuyerAcK&isvendorackreq=";
                                console.log("serviceUrl: " + serviceUrl);

                                $.ajax({
                                    type: "POST",
                                    url: serviceUrl,
                                    contentType: "application/xml",
                                    dataType: "xml",
                                    async: true,
                                    success: function(data, textStatus, jqXHR) {
                                        console.log("success: " + data);
                                        acknowledgePO(data);
                                        $("#overlay").css("display", "none");
                                    }
                                });
                            }
                            else
                            {
                                $("#overlay").css("display", "none");
                                $("#isSignedPoUploaded").val("No");
                                var ro_pid = $("#ro_pid").val();
                                console.log("ro_pid: " + ro_pid);

                                Lobibox.alert("error", {
                                    msg: obj.Message
                                });
                            }
                        }
                    });
        }
    });

    $(".viewSignedPoCopyFromDMS").click(function() {
        console.log("downloadSignedPoCopyFromDMS click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var serviceUrl = serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=&PID=" + pid + "&RFQno=&VendorID=&BankForm=&PONO=" + poNumber + "&AckSupportingDocument=Y";
        console.log("serviceUrl: " + serviceUrl);

        //        getSignedPoDocumentDetails("");
//        $("#showSignedPoDocFromDMSModal").modal("show");

        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.log("success: " + data);
                getSignedPoDocumentDetails(data);
                $("#overlay").css("display", "none");
                $("#showSignedPoDocFromDMSModal").modal("show");
            }
        });
    });

    $(".rejectTransaction").click(function() {
        console.log("rejectTransaction click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);
        $("#selectedPid").val(pid);

        Lobibox.confirm({
            msg: "Are you sure you want to reject this acknowledgement ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    $("#cancelAckPoCommentsModal").modal("show");
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    $("#cancelAckPoCommentsModalBtn").click(function() {
        console.log("cancelAckPoCommentsModalBtn");
        var pid = $("#selectedPid").val();
        console.log("pid: " + pid);

        var canAckPoComments = $("#canAckPoComments").val();
        console.log("canAckPoComments: " + canAckPoComments);
        if (canAckPoComments.toString().trim() === "")
        {
            $("#canAckPoComments").focus();
            return false;
        }
        $("#cancelAckPoCommentsModal").modal("hide");
        $("#overlay").css("display", "block");

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var buyerUsername = $("#buyerUsername").val();
        console.log("buyerUsername: " + buyerUsername);

        var currentDate = $("#currentDate").val();
        console.log("currentDate: " + currentDate);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CompleteWI?ProcessInstanceId=" + pid + "&AckDate=" + currentDate + "&AckAction=Reject&AckComments=" + canAckPoComments + "&AckBy=Buyer&AckByDetails=" + buyerUsername + "&Stage=BuyerAcK&isvendorackreq=";
        console.log("serviceUrl: " + serviceUrl);

//        acknowledgePO("");
//        $("#overlay").css("display", "none");

        $.ajax({
            type: "POST",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.log("success: " + data);
                acknowledgePO(data);
                $("#overlay").css("display", "none");
            }
        });
    });

    $(".completeTransaction").click(function() {
        console.log("completeTransaction click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var buyerUsername = $("#buyerUsername").val();
        console.log("buyerUsername: " + buyerUsername);

        var currentDate = $("#currentDate").val();
        console.log("currentDate: " + currentDate);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CompleteWI?ProcessInstanceId=" + pid + "&AckDate=" + currentDate + "&AckAction=Approve&AckComments=&AckBy=Buyer&AckByDetails=" + buyerUsername + "&Stage=BuyerAcK&isvendorackreq=";
        console.log("serviceUrl: " + serviceUrl);

        Lobibox.confirm({
            msg: "Are you sure you want to complete this acknowledgement ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    $("#overlay").css("display", "block");

//        acknowledgePO("");
//        $("#overlay").css("display", "none");

                    $.ajax({
                        type: "POST",
                        url: serviceUrl,
                        contentType: "application/xml",
                        dataType: "xml",
                        async: true,
                        success: function(data, textStatus, jqXHR) {
                            console.log("success: " + data);
                            acknowledgePO(data);
                            $("#overlay").css("display", "none");
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

    $(".acceptTransaction").click(function() {
        console.log("acceptTransaction click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();
        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);

        Lobibox.confirm({
            msg: "Are you sure you want to accept this acknowledgement ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("yes");
                    $(".editPo").prop("disabled", false);
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    $(".editPo").click(function() {
        console.log("editPo click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);

        Lobibox.confirm({
            msg: "Are you sure you want to edit/ cancel this PO ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    $("#overlay").css("display", "block");
                    console.log("yes");
                    $("#poNumber").val(poNumber);
                    $("#pid").val(pid);

                    $("#AcknowledgePoForm").submit();
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    $("#sendForVendorAckBtn").click(function() {
        console.log("sendForVendorAckBtn click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();
        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);
        $("#selectedPid").val(pid);

        // Check how many PO(s) has been acknowledged out of selected POs
        var ackPidArr = [];
        for (var i = 0; i < transactionSelectedArr.length; i++)
        {
            if (transactionSelectedArr[i].currentWorkstep === "Buyer Ack"
                    && (transactionSelectedArr[i].vendorAckAction === "Approve" || transactionSelectedArr[i].vendorAckAction === "Reject"))
            {
                ackPidArr.push("<br><b>" + transactionSelectedArr[i].pid + "</b>");
            }
        }
        console.log("ackPidArr: " + ackPidArr);

        if (ackPidArr.length !== 0)
        {
            var message = "From selected transactions, below tracansaction(s) has already been acknowledged. Still you want to continue." + ackPidArr.toString();
            Lobibox.confirm({
                msg: message,
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        $("#sendPoCommentsModal").modal("show");
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        }
        else
        {
            Lobibox.confirm({
                msg: "Are you sure you want to send this PO to vendor for acknowledgement ?",
                callback: function(lobibox, type) {
                    console.log("type: " + type);
                    if (type === 'yes')
                    {
                        $("#sendPoCommentsModal").modal("show");
                    }
                    else if (type === 'no')
                    {
                        console.log("no");
                    }
                }
            });
        }
    });

    $("#sendPoCommentsModalBtn").click(function() {
        var pid = $("#selectedPid").val();
        console.log("pid: " + pid);

        var sendPoComments = $("#sendPoComments").val();
        console.log("sendPoComments: " + sendPoComments);
        if (sendPoComments.toString().trim() === "")
        {
            $("#sendPoComments").focus();
            return false;
        }
        $("#sendPoCommentsModal").modal("hide");

        $("#overlay").css("display", "block");

        var pids = "";
        for (var i = 0; i < transactionSelectedArr.length; i++)
        {
            if (i === transactionSelectedArr.length - 1)
            {
                pids += transactionSelectedArr[i].pid;
            }
            else
            {
                pids += transactionSelectedArr[i].pid + ",";
            }
        }
        console.log("pids: " + pids);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var buyerUsername = $("#buyerUsername").val();
        console.log("buyerUsername: " + buyerUsername);

        var currentDate = $("#currentDate").val();
        console.log("currentDate: " + currentDate);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CompleteWI?ProcessInstanceId=" + pids + "&AckDate=" + currentDate + "&AckAction=Reject&AckComments=" + sendPoComments + "&AckBy=Buyer&AckByDetails=" + buyerUsername + "&Stage=BuyerAcK&isvendorackreq=Y";
        console.log("serviceUrl: " + serviceUrl);

        $.ajax({
            type: "POST",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.log("success: " + data);
                acknowledgePO(data);
                $("#overlay").css("display", "none");
            }
        });
    });

    $("#isVendorAckReq").click(function() {
        console.log("editPo click");
        var pid = $("#pidForm").val();
        var poNumber = $("#poNumberForm").val();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);
        if ($(this).prop("checked") === true)
        {
            $(".sendTransaction").prop("disabled", false);
        }
        else
        {
            $(".sendTransaction").prop("disabled", true);
        }
    });

    var transactionSelectedArr = [];
    $("#acknowledgePoTable").on("click", ".selectAckPo", function() {
        console.log("selectAckPo");

        var pid = $(this).parent().parent().find("td").eq(1).text();
        var poNumber = $(this).parent().parent().find("td").eq(2).text();
        var currentWorkstep = $(this).parent().parent().find("td").eq(0).children(".currentWorkstep").val();
        var buyerAckAction = $(this).parent().parent().find("td").eq(0).children(".buyerAckAction").val();
        var vendorAckAction = $(this).parent().parent().find("td").eq(0).children(".vendorAckAction").val();
        var isVendorAckReq = $(this).parent().parent().find("td").eq(0).children(".isVendorAckReq").val();
        var purchaseOrderCreatedDate = $(this).parent().parent().find("td").eq(0).children(".purchaseOrderCreatedDate").val();
        var ackPOEntryDatetime = $(this).parent().parent().find("td").eq(0).children(".ackPOEntryDatetime").val();
        var isPOModified = $(this).parent().parent().find("td").eq(0).children(".isPOModified").val();
        var ackPOExitDT = $(this).parent().parent().find("td").eq(0).children(".ackPOExitDT").val();
        var reworkExitDT = $(this).parent().parent().find("td").eq(0).children(".reworkExitDT").val();
        var transactionSno = $(this).parent().parent().find("td").eq(0).children(".transactionSno").val();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);
        console.log("currentWorkstep: " + currentWorkstep);
        console.log("buyerAckAction: " + buyerAckAction);
        console.log("vendorAckAction: " + vendorAckAction);
        console.log("isVendorAckReq: " + isVendorAckReq);
        console.log("purchaseOrderCreatedDate: " + purchaseOrderCreatedDate);
        console.log("ackPOEntryDatetime: " + ackPOEntryDatetime);
        console.log("isPOModified: " + isPOModified);
        console.log("ackPOExitDT: " + ackPOExitDT);
        console.log("reworkExitDT: " + reworkExitDT);
        console.log("transactionSno: " + transactionSno);

        if ($(this).prop("checked"))
        {
            console.log("true");

            $("#sendMailPoBtn").prop("disabled", false);
            $("#sendForVendorAckBtn").prop("disabled", false);
            $("#commentsHistoryBtn").prop("disabled", false);
            $("#actionList").prop("disabled", false);

            var transactionObj = {};

            transactionObj["pid"] = pid;
            transactionObj["poNumber"] = poNumber;
            transactionObj["currentWorkstep"] = currentWorkstep;
            transactionObj["buyerAckAction"] = buyerAckAction;
            transactionObj["vendorAckAction"] = vendorAckAction;
            transactionObj["isVendorAckReq"] = isVendorAckReq;
            transactionObj["purchaseOrderCreatedDate"] = purchaseOrderCreatedDate;
            transactionObj["ackPOEntryDatetime"] = ackPOEntryDatetime;
            transactionObj["isPOModified"] = isPOModified;
            transactionObj["ackPOExitDT"] = ackPOExitDT;
            transactionObj["reworkExitDT"] = reworkExitDT;
            transactionObj["transactionSno"] = transactionSno;

            transactionSelectedArr.push(transactionObj);

            if (transactionSelectedArr.length > 1)
            {
                $("#commentsHistoryBtn").prop("disabled", true);
                $("#actionList").prop("disabled", true);
                $("#actionList").val("");
            }
            if (transactionSelectedArr.length === 1)
            {
                setPoDetailsProperties(transactionSelectedArr);
            }
        }
        else
        {
            console.log("false");
            var index = -1;
            for (var i = 0; i < transactionSelectedArr.length; i++)
            {
                if (transactionSno === transactionSelectedArr[i].transactionSno)
                {
                    index = i;
                    break;
                }
            }
            console.log("index: " + index);
            transactionSelectedArr.splice(index, 1);

            if (transactionSelectedArr.length === 1)
            {
                $("#commentsHistoryBtn").prop("disabled", false);
                $("#actionList").prop("disabled", false);
                $("#actionList").val("");
            }
            if (transactionSelectedArr.length === 0)
            {
                $("#sendMailPoBtn").prop("disabled", true);
                $("#sendForVendorAckBtn").prop("disabled", true);
                $("#commentsHistoryBtn").prop("disabled", true);
                $("#actionList").prop("disabled", true);
                $("#actionList").val("");
            }
        }
        console.log("transactionSelectedArr: " + JSON.stringify(transactionSelectedArr));

        if (transactionSelectedArr.length > 0)
        {
            $("#pidForm").val(transactionSelectedArr[0].pid);
            $("#poNumberForm").val(transactionSelectedArr[0].poNumber);

            enableDisableActions(transactionSelectedArr);
        }

        if (transactionSelectedArr.length === 1)
        {
            // Disable 'Send for Vendor Ack' button if PO has already acknowledged by vendor
            if (transactionSelectedArr[0].currentWorkstep === "Buyer Ack"
                    && (transactionSelectedArr[0].vendorAckAction === "Approve" || transactionSelectedArr[0].vendorAckAction === "Reject"))
            {
                $("#sendForVendorAckBtn").prop("disabled", true);
            }
            else
            {
                $("#sendForVendorAckBtn").prop("disabled", false);
            }
        }
        else
        {
            if (transactionSelectedArr.length === 0)
                $("#sendForVendorAckBtn").prop("disabled", true);
            else
                $("#sendForVendorAckBtn").prop("disabled", false);
        }
    });

    $("#actionList").change(function() {
        console.log("actionList change");

        var action = $(this).val();
        console.log("action: " + action);

        if (action === "Properties")
        {
            $("#poDetailsModal").modal("show");
        }
        else if (action === "View PO Document")
        {
            viewPoDocument();
        }
        else if (action === "View Supporting Documents")
        {
            viewSupportingDocument();
        }
        else if (action === "Upload & Ack")
        {
            uploadAndAck();
        }
        else if (action === "Complete")
        {
            completeTransaction();
        }
        else if (action === "Reject")
        {
            rejectTransaction();
        }
        else if (action === "Edit")
        {
            editPo();
        }
    });

    var poCommentHistoryTable = null;
    $("#commentsHistoryBtn").click(function() {
        console.log("commentsHistory");
        var pid = $("#pidForm").val();
        console.log("pid: " + pid);
        $("#overlay").css("display", "block");
        setTimeout(
                function()
                {
                    $.ajax({
                        type: "GET",
                        url: "createAmendDeletePoGetAjaxRequest.do",
                        async: false,
                        data: {
                            "reqFrom": "findPoCommentsHistoryByPid",
                            "pid": pid
                        },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
                            obj = JSON.parse(JSON.stringify(obj));
                            console.log("obj.Result: " + obj.Result);

                            $("#poCommentsHistoryModaTable tbody tr").remove();
                            var row = "";
                            for (var i = 0; i < obj.poCommentsJsonArr.length; i++)
                            {
                                var commentBy = obj.poCommentsJsonArr[i].insertedBy;
                                var commentOn = obj.poCommentsJsonArr[i].insertedOn;
                                var comment = obj.poCommentsJsonArr[i].comments;
                                var workStep = obj.poCommentsJsonArr[i].workStep;

                                row += "<tr><td>" + commentBy + "</td><td>" + commentOn + "</td><td>" + comment + "</td><td>" + workStep + "</td></tr>";
                            }
                            $("#poCommentsHistoryModaTable tbody").append(row);

                            if ($.fn.DataTable.isDataTable('#poCommentsHistoryModaTable')) {
                                poCommentHistoryTable.destroy();
                                poCommentHistoryTable = null;
                                $("#poCommentsHistoryModaTable").children('tbody').html(row);
                                poCommentHistoryTable = $('table.poCommentsHistoryModaTable').DataTable({
                                    lengthChange: false,
                                    orderCellsTop: true
                                });
                                poCommentHistoryTable.buttons().container()
                                        .appendTo('#poCommentsHistoryModaTable_wrapper .col-md-6:eq(0)');
                            } else {
                                $('#poCommentsHistoryModaTable thead tr').clone(true).appendTo('#poCommentsHistoryModaTable thead');
                                $('#poCommentsHistoryModaTable thead tr:eq(1) th').each(function(i) {
                                    $('#poCommentsHistoryModaTable thead tr:eq(0) th').addClass("table-header-color");
                                    var title = $(this).text();
                                    if (title === '') {
                                        $(this).html('');
                                    } else {
                                        $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                                    }
                                    $('input', this).on('keyup change', function() {
                                        if (poCommentHistoryTable.column(i).search() !== this.value) {
                                            poCommentHistoryTable
                                                    .column(i)
                                                    .search(this.value)
                                                    .draw();
                                        }
                                    });
                                });
                                poCommentHistoryTable = $('table.poCommentsHistoryModaTable').DataTable({
                                    lengthChange: false,
                                    orderCellsTop: true
                                });
                                poCommentHistoryTable.buttons().container()
                                        .appendTo('#poCommentsHistoryModaTable_wrapper .col-md-6:eq(0)');
                            }
                            $("#overlay").css("display", "none");
                            $("#poCommentsHistoryModal").modal("show");
                        }
                    });
                }
        , 500);
    });

    $("#sendMailPoBtn").click(function() {
        var pids = "";
        for (var i = 0; i < transactionSelectedArr.length; i++) {
            if (i === transactionSelectedArr.length - 1) {
                pids += transactionSelectedArr[i].pid;
            }
            else {
                pids += transactionSelectedArr[i].pid + ",";
            }
        }
        console.log("pids: " + pids);
        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "createAmendDeletePoGetAjaxRequest.do",
            async: true,
            data: {
                "reqFrom": "sendPoToVendorsInMail",
                "pids": pids
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                obj = JSON.parse(JSON.stringify(obj));
                console.log("obj.Result: " + obj.Result);
                $("#overlay").css("display", "none");
                if (obj.Result === "Success") {
                    Lobibox.alert("success", {
                        msg: "PO sent successfully!",
                        callback: function(lobibox, type) {
                            location.href = "acknowledgepo.do";
                        }
                    });
                }
            }
        });
    });
});

function acknowledgePO(xmlre)
{
//    alert(condition_1);
    var xmlString = XMLToString(xmlre);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<CompleteWIOutPut>"
//            + "<MainCode>0</MainCode>"
//            + "<Message>This PO has been acknowledge.</Message>"
//            + "</CompleteWIOutPut>";

//    var xmlDoc = $.parseXML(xmlString); // Localhost

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var Message = $xml.find('Message');

    var mainCode = MainCode.text();
    var msg = Message.text();

    console.log("mainCode: " + mainCode);
    console.log("Message: " + msg);

    var message = "";

//    message = "MainCode: " + mainCode + "<br>Message: " + msg;
    message = "Message: " + msg;

    if (mainCode !== undefined && Number(mainCode.toString().trim()) === 0)
    {
        Lobibox.alert("info", {
            msg: message,
            callback: function(lobibox, type) {
                location.href = "acknowledgepo.do";
            }
        });
    }
    else
    {
        Lobibox.alert("info", {
            msg: message,
            callback: function(lobibox, type) {
                location.href = "acknowledgepo.do";
            }
        });
    }
}

function setPoDetailsProperties(transactionSelectedArr)
{
    console.log("setPoDetailsProperties");

    var pid = transactionSelectedArr[0].pid;
    var poNumber = transactionSelectedArr[0].poNumber;
    var currentWorkstep = transactionSelectedArr[0].currentWorkstep;
    var buyerAckAction = transactionSelectedArr[0].buyerAckAction;
    var vendorAckAction = transactionSelectedArr[0].vendorAckAction;
    var isVendorAckReq = transactionSelectedArr[0].isVendorAckReq;
    var purchaseOrderCreatedDate = transactionSelectedArr[0].purchaseOrderCreatedDate;
    var ackPOEntryDatetime = transactionSelectedArr[0].ackPOEntryDatetime;
    var isPOModified = transactionSelectedArr[0].isPOModified;
    var ackPOExitDT = transactionSelectedArr[0].ackPOExitDT;
    var reworkExitDT = transactionSelectedArr[0].reworkExitDT;
    var transactionSno = transactionSelectedArr[0].transactionSno;

    console.log("pid: " + pid);
    console.log("poNumber: " + poNumber);
    console.log("currentWorkstep: " + currentWorkstep);
    console.log("buyerAckAction: " + buyerAckAction);
    console.log("vendorAckAction: " + vendorAckAction);
    console.log("isVendorAckReq: " + isVendorAckReq);
    console.log("purchaseOrderCreatedDate: " + purchaseOrderCreatedDate);
    console.log("ackPOEntryDatetime: " + ackPOEntryDatetime);
    console.log("isPOModified: " + isPOModified);
    console.log("ackPOExitDT: " + ackPOExitDT);
    console.log("reworkExitDT: " + reworkExitDT);
    console.log("transactionSno: " + transactionSno);

    // Clear all fields
    $("#pidForm").val("");
    $("#poNumberForm").val("");
    $("#poCreatedDate").val("");
    $("#poApprovedDate").val("");
    $("#poStatus").val("");
    $("#buyerAction").val("");
    $("#vendorAction").val("");
    $("#isVendorAckReq").prop("checked", false);
    $("#poAcknowledgedDate").val("");
    $("#poModifiedDate").val("");
    $("#isPoModified").prop("checked", false);

    // Set fields
    $("#pidForm").val(pid);
    $("#poNumberForm").val(poNumber);
    $("#poCreatedDate").val(purchaseOrderCreatedDate);
    $("#poApprovedDate").val(ackPOEntryDatetime);
    $("#poStatus").val("");
    $("#buyerAction").val(buyerAckAction);
    $("#vendorAction").val(vendorAckAction);
    $("#poAcknowledgedDate").val(ackPOExitDT);
    $("#poModifiedDate").val(reworkExitDT);

    if (isPOModified === "Y")
    {
        $("#isPoModified").prop("checked", true);
    }
    else
    {
        $("#isPoModified").prop("checked", false);
    }

    if (isVendorAckReq === "true" || isVendorAckReq === "True")
    {
        $("#isVendorAckReq").prop("checked", true);
    }
    else
    {
        $("#isVendorAckReq").prop("checked", false);
    }
    if (currentWorkstep === "Exit")
        $("#poStatus").val("Acknowledged");
    else if (currentWorkstep === "Buyer Ack")
        $("#poStatus").val("Pending for Buyer Action");
    else if (currentWorkstep === "Vendor Ack")
        $("#poStatus").val("Pending for Vendor Action");
}

function viewPoDocument()
{
    console.log("viewPoDocument");

    var viewPrDocIp = $("#viewPrDocIp").val();
    console.log("viewPrDocIp: " + viewPrDocIp);

    var pid = $("#pidForm").val();
    console.log("pid: " + pid);

    var url = viewPrDocIp + "/omnidocs/integration/foldView/viewFoldList.jsp?Application=ViewPODocument&S=S&FolderName=" + pid;
    console.log("url :" + url);

    window.open(url, "_blank");
}

function viewSupportingDocument()
{
    console.log("downloadSignedPoCopyFromDMS");
    var pid = $("#pidForm").val();
    var poNumber = $("#poNumberForm").val();

    console.log("pid: " + pid);
    console.log("poNumber: " + poNumber);

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var serviceUrl = serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=&PID=" + pid + "&RFQno=&VendorID=&BankForm=&PONO=" + poNumber + "&AckSupportingDocument=Y";
    console.log("serviceUrl: " + serviceUrl);

    $("#overlay").css("display", "block");
    $.ajax({
        type: "GET",
        url: serviceUrl,
        contentType: "application/xml",
        dataType: "xml",
        async: true,
        success: function(data, textStatus, jqXHR) {
            console.log("success: " + data);
            getSignedPoDocumentDetails(data);
            $("#overlay").css("display", "none");
            $("#showSignedPoDocFromDMSModal").modal("show");
        }
    });
}

function uploadAndAck()
{
    console.log("uploadSignedPoCopy");
    var pid = $("#pidForm").val();
    var poNumber = $("#poNumberForm").val();
    console.log("pid: " + pid);
    console.log("poNumber: " + poNumber);
    $("#ro_pid").val(pid);
    $("#ro_poNumber").val(poNumber);
    $("#uploadSignedPOCopyModal").modal("show");
}

function completeTransaction()
{
    console.log("completeTransaction");
    var pid = $("#pidForm").val();
    var poNumber = $("#poNumberForm").val();

    console.log("pid: " + pid);
    console.log("poNumber: " + poNumber);

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var buyerUsername = $("#buyerUsername").val();
    console.log("buyerUsername: " + buyerUsername);

    var currentDate = $("#currentDate").val();
    console.log("currentDate: " + currentDate);

    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CompleteWI?ProcessInstanceId=" + pid + "&AckDate=" + currentDate + "&AckAction=Approve&AckComments=&AckBy=Buyer&AckByDetails=" + buyerUsername + "&Stage=BuyerAcK&isvendorackreq=";
    console.log("serviceUrl: " + serviceUrl);

    Lobibox.confirm({
        msg: "Are you sure you want to complete this acknowledgement ?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                $("#overlay").css("display", "block");

                $.ajax({
                    type: "POST",
                    url: serviceUrl,
                    contentType: "application/xml",
                    dataType: "xml",
                    async: true,
                    success: function(data, textStatus, jqXHR) {
                        console.log("success: " + data);
                        acknowledgePO(data);
                        $("#overlay").css("display", "none");
                    }
                });
            }
            else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
}

function rejectTransaction()
{
    console.log("rejectTransaction");
    var pid = $("#pidForm").val();
    var poNumber = $("#poNumberForm").val();

    console.log("pid: " + pid);
    console.log("poNumber: " + poNumber);
    $("#selectedPid").val(pid);

    Lobibox.confirm({
        msg: "Are you sure you want to reject this acknowledgement ?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                $("#cancelAckPoCommentsModal").modal("show");
            }
            else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
}

function editPo()
{
    console.log("editPo");
    var pid = $("#pidForm").val();
    var poNumber = $("#poNumberForm").val();

    console.log("pid: " + pid);
    console.log("poNumber: " + poNumber);

    Lobibox.confirm({
        msg: "Are you sure you want to edit this PO?",
        callback: function(lobibox, type) {
            console.log("type: " + type);
            if (type === 'yes')
            {
                $("#overlay").css("display", "block");
                console.log("yes");
                $("#poNumber").val(poNumber);
                $("#pid").val(pid);

                $("#AcknowledgePoForm").submit();
            }
            else if (type === 'no')
            {
                console.log("no");
            }
        }
    });
}

function enableDisableActions(transactionSelectedArr)
{
    console.log("enableDisableActions");

    var currentWorkstep = transactionSelectedArr[0].currentWorkstep;
    var buyerAckAction = transactionSelectedArr[0].buyerAckAction;
    var vendorAckAction = transactionSelectedArr[0].vendorAckAction;

    console.log("currentWorkstep: " + currentWorkstep);
    console.log("buyerAckAction: " + buyerAckAction);
    console.log("vendorAckAction: " + vendorAckAction);

    if (currentWorkstep === "Exit")
        $("#poStatus").val("Acknowledged");
    else if (currentWorkstep === "Buyer Ack")
        $("#poStatus").val("Pending for Buyer Action");
    else if (currentWorkstep === "Vendor Ack")
        $("#poStatus").val("Pending for Vendor Action");

    $("#actionList option").each(function() {
        $(this).prop("disabled", false);
        $(this).css("background-color", "");
    });

    if (currentWorkstep === "Exit")
    {
        $("#actionList option").each(function() {
            var action = $(this).text();
            if (action !== "Select Action" && action !== "Properties" && action !== "View PO Document" && action !== "View Supporting Documents")
            {
                $(this).prop("disabled", true);
                $(this).css("background-color", "lightgray");
            }
        });
    }
    else if (currentWorkstep === "Vendor Ack" && vendorAckAction === "" && buyerAckAction === "")
    {
        $("#actionList option").each(function() {
            var action = $(this).text();
            if (action !== "Select Action" && action !== "Properties" && action !== "View PO Document" && action !== "Upload & Ack")
            {
                $(this).prop("disabled", true);
                $(this).css("background-color", "lightgray");
            }
        });
    }
    else if (currentWorkstep === "Buyer Ack" && vendorAckAction === "" && buyerAckAction === "")
    {
        $("#actionList option").each(function() {
            var action = $(this).text();
            if (action !== "Select Action" && action !== "Properties" && action !== "View PO Document" && action !== "Upload & Ack")
            {
                $(this).prop("disabled", true);
                $(this).css("background-color", "lightgray");
            }
        });
    }
    else if (currentWorkstep === "Buyer Ack" && vendorAckAction === "Approve")
    {
        $("#actionList option").each(function() {
            var action = $(this).text();
            if (action !== "Select Action" && action !== "Properties" && action !== "View PO Document" && action !== "View Supporting Documents"
                    && action !== "Complete" && action !== "Reject")
            {
                $(this).prop("disabled", true);
                $(this).css("background-color", "lightgray");
            }
        });
    }
    else if (currentWorkstep === "Buyer Ack" && vendorAckAction === "Reject")
    {
        $("#actionList option").each(function() {
            var action = $(this).text();
            if (action !== "Select Action" && action !== "Properties" && action !== "View PO Document" && action !== "View Supporting Documents"
                    && action !== "Edit" && action !== "Reject")
            {
                $(this).prop("disabled", true);
                $(this).css("background-color", "lightgray");
            }
        });
    }
    else if (currentWorkstep === "Vendor Ack" && buyerAckAction === "Reject")
    {
        $("#actionList option").each(function() {
            var action = $(this).text();
            if (action !== "Select Action" && action !== "Properties" && action !== "View PO Document" && action !== "View Supporting Documents"
                    && action !== "Upload & Ack")
            {
                $(this).prop("disabled", true);
                $(this).css("background-color", "lightgray");
            }
        });
    }
    else
    {
        $("#actionList option").each(function() {
            var action = $(this).text();
            if (action !== "Select Action" && action !== "Properties" && action !== "View PO Document")
            {
                $(this).prop("disabled", true);
                $(this).css("background-color", "lightgray");
            }
        });
    }
}