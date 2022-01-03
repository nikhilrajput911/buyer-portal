
var SeriveAccountAssignmentDataJsonArray = [];
var PRLineItemArray = [];
var PurchaseRequestType = "";

$(document).ready(function() {

    $(".viewPrDoc").click(function() {
        console.log("viewPrDoc======================");
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        var procInstId = $(this).parent().parent().find("td").eq(0).children(".procInstId_Class").val();

        console.log("linkId: " + linkId);
        console.log("procInstId: " + procInstId);

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

                    var ViewPrDoc_IP = $("#ViewPrDoc_IP").val();
                    console.log("ViewPrDoc_IP: " + ViewPrDoc_IP);

                    var url = ViewPrDoc_IP + "/omnidocs/integration/foldView/viewFoldList.jsp?Application=PRandRFQDocuments&S=S&FolderId=" + folderIndex;
                    console.log("url :" + url);

                    window.open(url, "_blank");
                }
            }
        });
    });

    $(".viewPrLineItemDoc").click(function() {
        console.log("viewPrLineItemDoc================");
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        var procInstId = $(this).parent().parent().find("td").eq(0).children(".procInstId_Class").val();

        console.log("linkId: " + linkId);
        console.log("procInstId: " + procInstId);

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

                    var ViewPrDoc_IP = $("#ViewPrDoc_IP").val();
                    console.log("ViewPrDoc_IP: " + ViewPrDoc_IP);

                    var url = ViewPrDoc_IP + "/omnidocs/integration/foldView/viewFoldList.jsp?Application=PRandRFQDocuments&S=S&FolderId=" + folderIndex;
                    console.log("url :" + url);

                    window.open(url, "_blank");
                }
            }
        });
    });

    $(".viewRfqDoc").click(function() {
        console.log("viewRfqDoc================");
        var linkId = $(this).parent().parent().find("td").eq(0).children(".linkId_Class").val();
        var rfqNumber = $("#rfqNumber").val();

        console.log("linkId: " + linkId);
        console.log("rfqNumber: " + rfqNumber);

        $("#overlay").css("display", "block");
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: true,
            data: {
                "reqFrom": "viewRfqDoc",
                "linkId": linkId,
                "rfqNumber": rfqNumber
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

                    var ViewPrDoc_IP = $("#ViewPrDoc_IP").val();
                    console.log("ViewPrDoc_IP: " + ViewPrDoc_IP);

                    var url = ViewPrDoc_IP + "/omnidocs/integration/foldView/viewFoldList.jsp?Application=PRandRFQDocuments&S=S&FolderId=" + folderIndex;
                    console.log("url :" + url);

                    window.open(url, "_blank");
                }
            }
        });
    });
    var PoFrom = $("#PoFrom").val();
    console.log("PoFrom: " + PoFrom);
    if (PoFrom === "editpo")
    {
        $("#requestType").val("Amend Purchase Order");
        $("#lineLevelTabsDiv").css("display", "none");

        $("#isServiceTabSaved").val("Yes");
        $("#isInvoiceTabSaved").val("Yes");
        $("#isAccountAssignmentTabSaved").val("Yes");
        $("#isDeliveryScheduleTabSaved").val("Yes");

        callNGWebServiceTOFetchPODetails();

        $(".createPoBtn").removeClass("disabled");
    }
    else if (PoFrom === "editApprovedPo")
    {
        $("#requestType").val("Amend Purchase Order");
        $("#lineLevelTabsDiv").css("display", "none");

        $("#isServiceTabSaved").val("Yes");
        $("#isInvoiceTabSaved").val("Yes");
        $("#isAccountAssignmentTabSaved").val("Yes");
        $("#isDeliveryScheduleTabSaved").val("Yes");
    }
    else if (PoFrom === "acknowledgePo")
    {
        $("#requestType").val("Acknowledge Purchase Order");
        $("#lineLevelTabsDiv").css("display", "none");
        $("#savePoLineItemData").css("display", "none");
        $("#PoRequestType").val("AcknowledgePo");
        callNGWebServiceTOFetchPODetails();
    }

    $("#poNumber").blur(function()
    {
        if ($(this).val().toString().trim() !== "")
        {
            callNGWebServiceTOFetchPODetails();
            $("#createPoBtn").prop("disabled", false);
            $("#cancelPoBtn").prop("disabled", false);
            $("#saveAndCloseBtn").prop("disabled", false);
            $("#preCheckPoBtn").prop("disabled", false);
            
            
        }
    });

    $(".acknowledge-po-btn").click(function() {
        var pid = $(this).parent().parent().find("td").eq(0).text().trim();
        var poNumber = $(this).parent().parent().find("td").eq(1).text().trim();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);

        $("#poNumber").val(poNumber);
        $("#pid").val(pid);

        $("#AcknowledgePoForm").submit();
    });

    $("#paymentTermsDelivery").change(function() {
        var paymentTerm = $(this).val();
        console.log("paymentTerm: " + paymentTerm);

        if (paymentTerm !== "")
        {
            $("#overlay").css("display", "block");

            var xmlInput = "<POPaymentTermsIP>";
            xmlInput += "<PaymentTerm>" + paymentTerm + "</PaymentTerm>";
            xmlInput += "</POPaymentTermsIP>";

            console.log("xmlInput: " + xmlInput);

//            var dmsip = $("#dmsip").val();
//            console.log(dmsip);

            var WebServiceCallIp = $("#WebServiceCallIp").val();
            console.log("WebServiceCallIp: " + WebServiceCallIp);

            var URLParam = xmlInput;
            console.log("URLParam: " + URLParam);

//            var serviceUrl = dmsip + "/PR2POWebservice/ng/sapservice/POPaymentTerm";
            var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_ListPaymentTerms?PaymentTerm=" + paymentTerm;
            console.log("serviceUrl: " + serviceUrl);

            var local_dev_uat = $("#local_dev_uat").val();
            console.log("local_dev_uat: " + local_dev_uat);

            if (local_dev_uat === "dev" || local_dev_uat === "uat")
            {
                console.log("Calling Web Service...");
                $.ajax({
                    type: "GET",
                    url: serviceUrl,
                    contentType: "application/xml",
                    dataType: "xml",
//                    data: URLParam,
                    async: true,
                    success: function(data, textStatus, jqXHR) {
                        console.log("success: " + data);
                        fetchPaymentInDays(data);

                        $("#overlay").css("display", "none");
                    }
                });
            }
            else
            {
                fetchPaymentInDaysFromLocal("");
                $("#overlay").css("display", "none");
            }
        }
    });

    $("#sapUpdate").click(function() {
        console.log("sapUpdate==========");

        var poNumber = $("#poNumber").val();
        console.log("poNumber: " + poNumber);

        var dmsip = $("#dmsip").val();
        console.log(dmsip);

        var URLParam = $("#updateInputXml").val();
        console.log("URLParam: " + URLParam);

        var serviceUrl = dmsip + "/PR2POWebservice/ng/service/POCreation";
        console.log("serviceUrl: " + serviceUrl);

        $.ajax({
            type: "POST",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            data: URLParam,
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log("Newgen WI Response: " + data);
                getPOResponse(data);
                $("#overlay").css("display", "none");
            }
        });

    });

    $("#updatePoBtn").click(function() {
        Lobibox.confirm({
            msg: "Are you sure you want to update this PO ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    var URLParam = getPODataAsXmlToUpdate();
                    console.log("URLParam: " + URLParam);

                    console.log("ok");
//                    $("#overlay").css("display", "block");

                    var poNumber = $("#poNumber").val();
                    console.log("poNumber: " + poNumber);

                    var dmsip = $("#dmsip").val();
                    console.log(dmsip);

                    var serviceUrl = dmsip + "/PR2POWebservice/ng/service/POCreation";
                    console.log("serviceUrl: " + serviceUrl);

                    $.ajax({
                        type: "POST",
                        url: serviceUrl,
                        contentType: "application/xml",
                        dataType: "xml",
                        data: URLParam,
                        async: false,
                        success: function(data, textStatus, jqXHR) {
                            console.log("Newgen WI Response: " + data);
                            getPOResponse(data);
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

    $(".cancelEditPo").click(function() {
        Lobibox.confirm({
            msg: "Are you sure you want to cancel this PO ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#overlay").css("display", "block");

                    var poNumber = $("#poNumber").val();
                    console.log("poNumber: " + poNumber);

                    var pid = $("#editPoPid").val();
                    console.log("pid: " + pid);

                    var WebServiceCallIp = $("#WebServiceCallIp").val();
                    console.log("WebServiceCallIp: " + WebServiceCallIp);

                    var deletePoServiceUrl = WebServiceCallIp + "/WebServiceCall/PO_DeletePOSAP?PONumber=" + poNumber + "&FetchFlag=R";
                    console.log("deletePoServiceUrl: " + deletePoServiceUrl);

                    var rejectWIPoServiceUrl = WebServiceCallIp + "/WebServiceCall/PO_RejectWIPO?WorkitemId=" + pid;
                    console.log("rejectWIPoServiceUrl: " + rejectWIPoServiceUrl);

//                    var finalMessage = "";
//                    var deletePoOutputJsonObject = checkIfPOCanceledOrNot("");
//
//                    var deleteMainCode = deletePoOutputJsonObject["MainCode"];
//                    var deleteMessage = deletePoOutputJsonObject["Message"];
//
//                    console.log("deleteMainCode: " + deleteMainCode);
//                    console.log("deleteMessage: " + deleteMessage);
//
//                    if (deleteMainCode !== undefined && Number(deleteMainCode) === 0)
//                    {
//                        console.log("Delete PO");
//
//                        var rejectWIPoOutputJsonObject = checkIfPORejectdOrNot("");
//
//                        var rejectMainCode = rejectWIPoOutputJsonObject["MainCode"];
//                        var rejectProcessInstanceID = rejectWIPoOutputJsonObject["ProcessInstanceID"];
//                        var rejectMessage = rejectWIPoOutputJsonObject["Message"];
//
//                        console.log("rejectMainCode: " + rejectMainCode);
//                        console.log("rejectProcessInstanceID: " + rejectProcessInstanceID);
//                        console.log("rejectMessage: " + rejectMessage);
//
//                        finalMessage = deleteMessage + "<br>" + rejectMessage;
//                        console.log("finalMessage: " + finalMessage);
//
//                        Lobibox.alert("info", {
//                            msg: finalMessage,
//                            callback: function(lobibox, type) {
//                                location.href = "managepo.do";
//                            }
//                        });
//                    }
//                    $("#overlay").css("display", "none");

//                    addPoLineQuantityBackToPrOrRfqLineOnCancelPo();

                    $.ajax({
                        type: "POST",
                        url: deletePoServiceUrl,
                        contentType: "application/xml",
                        dataType: "xml",
                        async: true,
                        success: function(data, textStatus, jqXHR) {
                            console.log("success: " + data);
                            var deletePoOutputJsonObject = checkIfPOCanceledOrNot(data);

                            var deleteMainCode = deletePoOutputJsonObject["MainCode"];
                            var deleteMessage = deletePoOutputJsonObject["Message"];
                            console.log("deleteMainCode: " + deleteMainCode);
                            console.log("deleteMessage: " + deleteMessage);

                            var finalMessage = "";

                            if (deleteMainCode !== undefined && Number(deleteMainCode) === 0)
                            {
                                $.ajax({
                                    type: "POST",
                                    url: rejectWIPoServiceUrl,
                                    contentType: "application/xml",
                                    dataType: "xml",
                                    async: true,
                                    success: function(data, textStatus, jqXHR) {
                                        console.log("success: " + data);
                                        $("#overlay").css("display", "none");
                                        var rejectWIPoOutputJsonObject = checkIfPORejectdOrNot(data);

                                        var rejectMainCode = rejectWIPoOutputJsonObject["MainCode"];
                                        var rejectProcessInstanceID = rejectWIPoOutputJsonObject["ProcessInstanceID"];
                                        var rejectMessage = rejectWIPoOutputJsonObject["Message"];

                                        console.log("rejectMainCode: " + rejectMainCode);
                                        console.log("rejectProcessInstanceID: " + rejectProcessInstanceID);
                                        console.log("rejectMessage: " + rejectMessage);
                                        
                                        if(rejectMainCode !== undefined && Number(rejectMainCode) === 0)
                                        {
                                            addPoLineQuantityBackToPrOrRfqLineOnCancelPo();
                                        }
                                        
                                        finalMessage = deleteMessage + "<br>" + rejectMessage;
                                        console.log("finalMessage: " + finalMessage);

                                        Lobibox.alert("info", {
                                            msg: finalMessage,
                                            callback: function(lobibox, type) {
                                                location.href = "managepo.do";
                                            }
                                        });

                                    }
                                });
                            }
                            else
                            {
                                $("#overlay").css("display", "none");
                                finalMessage = deleteMessage;
                                Lobibox.alert("info", {
                                    msg: finalMessage,
                                    callback: function(lobibox, type) {
//                                        location.href = "managepo.do";
                                    }
                                });
                            }
                        }
                    });

//                    $("#overlay").css("display", "none");
                }
                else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });
    });

    $("#createdPOTable").on("click", ".edit-po", function() {
        $("#overlay").css("display", "block");

        var poNumber = $(this).parent().parent().find("td").eq(3).text().trim();
        var pid = $(this).parent().parent().find("td").eq(2).text().trim();

        console.log("poNumber: " + poNumber);
        console.log("pid: " + pid);

        $("#poNumber").val(poNumber);
        $("#pid").val(pid);

        $("#EditPoForm").submit();

    });

    $("#getVendorBankForm").click(function() {
        $("#overlay").css("display", "block");

        var VendorId = $("#username").val();
        console.log("VendorId: " + VendorId);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=&PID=&RFQno=&VendorID=" + VendorId + "&BankForm=Y&PONO=&AckSupportingDocument=";
        console.log("serviceUrl: " + serviceUrl);

//        getDocumentDetailsByLinkIdAndPid("");
//        $("#overlay").css("display", "none");
//        $("#showSupprtingDocFromDMSModal").modal("show");

        $.ajax({
            type: "GET",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.log("response: " + data);
                getDocumentDetailsByLinkIdAndPid(data);
                $("#overlay").css("display", "none");
                $("#showSupprtingDocFromDMSModal").modal("show");
            }
        });
    });

//    $(".viewSupportingDocFromDMS").click(function() {
//        var isBuyerOrVendorDocuments = $(this).prop("id");
//        console.log("isBuyerOrVendorDocuments: " + isBuyerOrVendorDocuments);
//        $("#overlay").css("display", "block");
//
//        if (isBuyerOrVendorDocuments === "buyer")
//        {
//            var prAttTempId = "2257";
//            console.log("pr_att_temp_id: " + prAttTempId);
//
//            $.ajax({
//                type: "GET",
//                url: "ajaxcontroller.do",
//                async: true,
//                data: {
//                    "reqFrom": "GetDocumentsFromWorkOrderAttTemp",
//                    "prAttTempId": prAttTempId
//                },
//                complete: function(responseJson) {
//                    var obj = $.parseJSON(responseJson.responseText);
//
//                    $("#documentListTable tbody tr").remove();
//                    var row = "";
//
//                    if (obj.Att1 !== undefined)
//                        row += "<tr><td>" + obj.Att1 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att1' id='DownloadAtt1' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att1' id='DownloadAtt1' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att2 !== undefined)
//                        row += "<tr><td>" + obj.Att2 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att2' id='DownloadAtt2' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att2' id='DownloadAtt2' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att3 !== undefined)
//                        row += "<tr><td>" + obj.Att3 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att3' id='DownloadAtt3' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att3' id='DownloadAtt3' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att4 !== undefined)
//                        row += "<tr><td>" + obj.Att4 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att4' id='DownloadAtt4' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att4' id='DownloadAtt4' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att5 !== undefined)
//                        row += "<tr><td>" + obj.Att5 + "</td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att5' id='DownloadAtt5' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='downloadDocFromWorkOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att5' id='DownloadAtt5' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//
//                    $("#documentListTable tbody").append(row);
//                    $("#overlay").css("display", "none");
//                    $("#showSupprtingDocFromDMSModal").modal("show");
//                }
//            });
//        }
//        else
//        {
//            var prAttTempId = "16";
//            console.log("pr_att_temp_id: " + prAttTempId);
//
//            $.ajax({
//                type: "GET",
//                url: "http://localhost:8080/VendorPortal/ajaxcontroller.do",
//                async: true,
//                data: {
//                    "reqFrom": "GetDocumentsFromWorkOrderAttTemp",
//                    "prAttTempId": prAttTempId
//                },
//                complete: function(responseJson) {
//                    var obj = $.parseJSON(responseJson.responseText);
//
//                    $("#documentListTable tbody tr").remove();
//                    var row = "";
//
//                    if (obj.Att1 !== undefined)
//                        row += "<tr><td>" + obj.Att1 + "</td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att1' id='DownloadAtt1' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att1' id='DownloadAtt1' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att2 !== undefined)
//                        row += "<tr><td>" + obj.Att2 + "</td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att2' id='DownloadAtt2' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att2' id='DownloadAtt2' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att3 !== undefined)
//                        row += "<tr><td>" + obj.Att3 + "</td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att3' id='DownloadAtt3' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att3' id='DownloadAtt3' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att4 !== undefined)
//                        row += "<tr><td>" + obj.Att4 + "</td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att4' id='DownloadAtt4' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att4' id='DownloadAtt4' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//                    if (obj.Att5 !== undefined)
//                        row += "<tr><td>" + obj.Att5 + "</td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att5' id='DownloadAtt5' class='downloadDocFromDB' title='Download'><i class='fas fa-eye fa-x'></i></a></td><td><a href='http://localhost:8080/VendorPortal/downloadDocFromSupplierOrderAttTemp.do?attid=" + prAttTempId + "&attachmentno=att5' id='DownloadAtt5' class='downloadDocFromDB' title='Download'><i class='fas fa-download fa-x'></i></a></td></tr>";
//
//                    $("#documentListTable tbody").append(row);
//                    $("#overlay").css("display", "none");
//                    $("#showSupprtingDocFromDMSModal").modal("show");
//                }
//            });
//        }
//    });

    $(".viewSupportingDocFromDMS").click(function() {
        $("#overlay").css("display", "block");

        var rfqNumber = $("#rfqNumber").val();
        console.log("rfqNumber: " + rfqNumber);

        var VendorCode = $("#VendorCode").val();
        console.log("VendorCode: " + VendorCode);

        var linkId = $(this).parent().children('.linkId').val();
        var procInstId = $(this).parent().children('.procInstId').val();
//        alert(linkId + "," + procInstId);

        var isBuyerOrVendorDocuments = $(this).prop("id");
        console.log("isBuyerOrVendorDocuments: " + isBuyerOrVendorDocuments);

        var xmlInput = "<InputCriteria>";
        xmlInput += "<LinkID>" + linkId + "</LinkID>";
        xmlInput += "<PID>" + procInstId + "</PID>";
        xmlInput += "<RFQno>" + rfqNumber + "</RFQno>";
        xmlInput += "<VendorID></VendorID>";
        xmlInput += "<PONO></PONO>";
        xmlInput += "</InputCriteria>";

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var URLParam = xmlInput;
        console.log("URLParam: " + URLParam);

        var serviceUrl = "";
        if (isBuyerOrVendorDocuments === "buyer")
        {
            serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=" + linkId + "&PID=" + procInstId + "&RFQno=" + rfqNumber + "&VendorID=&BankForm=&PONO=&AckSupportingDocument=";
        }
        else if (isBuyerOrVendorDocuments === "vendor")
        {
            serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=" + linkId + "&PID=" + procInstId + "&RFQno=" + rfqNumber + "&VendorID=" + VendorCode + "&BankForm=&PONO=&AckSupportingDocument=";
        }
        console.log("serviceUrl: " + serviceUrl);

        //getDocumentDetailsByLinkIdAndPid("");

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

    $(".downloadSignedPoCopyFromDMS").click(function() {
        console.log("downloadSignedPoCopyFromDMS==========");

        if ($("#poNumber").val().toString().trim() === "")
        {
            $("#poNumber").focus();
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please enter PO Number first!"
            });
            return false;
        }

        $("#overlay").css("display", "block");

        var pid = $("#Pid").val();
        console.log("pid: " + pid);

        var poNumber = $("#PoNumber").val();
        console.log("poNumber: " + poNumber);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var serviceUrl = serviceUrl = WebServiceCallIp + "/WebServiceCall/PR_DocListServlet?LinkID=&PID=" + pid + "&RFQno=&VendorID=&BankForm=&PONO=" + poNumber + "&AckSupportingDocument=Y";
        console.log("serviceUrl: " + serviceUrl);

//        getSignedPoDocumentDetails("");
//        $("#showSignedPoDocFromDMSModal").modal("show");

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

    var serviceTabTableCurrentTd;
    $("#serviceTableId").on("click", ".checkboxServices", function() {
        serviceTabTableCurrentTd = $(this);
    });
    $("#documentListTable").on("click", ".viewDocFromDMS", function() {
        console.log("view");
        var id = $(this).prop("id");
        console.log("id: " + id);
        var docIndex = id.split("_")[1];
        console.log("docIndex: " + docIndex);

        var URLParam = 'InputXML=' + docIndex + '&RequestType=download&ViewOption=Y';
        console.log("URLParam: " + URLParam);

        var dmsip = $("#dmsip").val();
        console.log(dmsip);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        window.open(WebServiceCallIp + "/WebServiceCall/Download?" + URLParam, "_blank");
    });
    $("#documentListTable").on("click", ".downloadDocFromDMS", function() {
        console.log("download");
        var id = $(this).prop("id");
        console.log("id: " + id);
        var docIndex = id.split("_")[1];
        console.log("docIndex: " + docIndex);

        var URLParam = 'InputXML=' + docIndex + '&RequestType=download&ViewOption=N';
        console.log("URLParam: " + URLParam);

        var dmsip = $("#dmsip").val();
        console.log(dmsip);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        window.open(WebServiceCallIp + "/WebServiceCall/Download?" + URLParam, "_blank");
    });

    var lobiboxNotifyAlert = null;

    $("#editAmendPoCommentsModalBtn").click(function() {
        var poComments = $("#poComments").val();
        console.log("poComments: " + poComments);
        if (poComments.toString().trim() === "")
        {
            $("#poComments").focus();
            return false;
        }
        $("#editAmendPoCommentsModal").modal("hide");
    });

    $(".submitPoDetails").click(function() {
//        extractSAPResponseForPreCheck("");
        var isPreCheck = "No";
        var operation = $(this).prop("value");
        console.log("operation: " + operation);
        if (operation === "Cancel PO")
        {
            $("#PoFrom").val("cancelPo");
        }
        else if (operation === "Amend PO")
        {
            $("#PoFrom").val("editApprovedPo");
        }
        else if (operation === "Edit PO")
        {
            $("#PoFrom").val("editpo");
        }
        else if (operation === "Pre Check")
        {
            isPreCheck = "Yes";
        }
        console.log("isPreCheck: " + isPreCheck);

        var companycode = $("#companycodeHeader").val();
        var vendor = $("#vendorSno").val(); // $("#vendorcodeHeader").val();
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        var purchasingOrg = $("#purchasingOrg").val();
        var purchasingGroup = $("#purchasingGroup").val();
        var currencyDeliveryInvoice = $("#currencyDeliveryInvoice").val();
        var ExchangeRate = $("#ExchangeRate").val();
        var streetVendorAddress = $("#streetVendorAddress").val();
        var houseNumberVendorAddress = $("#houseNumberVendorAddress").val();
        var Salesperson = $("#Salesperson").val();
        var requestType = $("#requestType").val();
        console.log("requestType: " + requestType);

        var PrType = $("#PrType").val();
        console.log("PrType: " + PrType);
        $(".collapseDivHeader").find(".active").removeClass("active");

        if (companycode === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Company Code can not be empty!"
            });
            return false;
        }
        if (typeOfPOHeader === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select PO Type!"
            });
            $("#typeOfPOHeader").focus();
            return false;
        }

        if (vendor === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select vendor!"
            });
            $("#vendorcodeHeader").focus();
            return false;
        }

        var validOrNot = validationOnCreatePoForShortcutPo();
        console.log("validOrNot: " + validOrNot);
        if (validOrNot === "NotValid")
        {
            return false;
        }

        if (currencyDeliveryInvoice === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please enter Currency in Delivery / Invoice Tab!"
            });
            $("#deliveryInvoice").addClass("active");
            $("#deliveryInvoice-tab").addClass("active");
            $("#deliveryInvoice-tab").addClass("show");
            $("#currencyDeliveryInvoice").focus();
            return false;
        }
        if (ExchangeRate === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please enter Exchange Rate in Delivery / Invoice Tab!"
            });
            $("#deliveryInvoice").addClass("active");
            $("#deliveryInvoice-tab").addClass("active");
            $("#deliveryInvoice-tab").addClass("show");
            $("#ExchangeRate").focus();
            return false;
        }

        if (streetVendorAddress === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please enter Street in Vendor Address Tab!"
            });
            $("#vendorAddress").addClass("active");
            $("#vendorAddress-tab").addClass("active");
            $("#vendorAddress-tab").addClass("show");
            $("#streetVendorAddress").focus();
            return false;
        }
        if (houseNumberVendorAddress === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please enter House Number in Vendor Address Tab!"
            });
            $("#vendorAddress").addClass("active");
            $("#vendorAddress-tab").addClass("active");
            $("#vendorAddress-tab").addClass("show");
            $("#houseNumberVendorAddress").focus();
            return false;
        }
//        if (Salesperson === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: "Please enter Salesperson in Communication Tab!"
//            });
//            $("#communication").addClass("active");
//            $("#communication-tab").addClass("active");
//            $("#communication-tab").addClass("show");
//            $("#Salesperson").focus();
//            return false;
//        }
        var accAssCat_temp = "";
        var itemCat_temp = "";
        var insertionid_temp = $(".ItemNumberSelectClass").val();
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            if (id === insertionid_temp) {
                accAssCat_temp = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat_temp = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                return;
            }
        });
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        var validityFromHeader = $("#validityFromHeader").val();
        var validityToHeader = $("#validityToHeader").val();
        console.log("validityFromHeader: " + validityFromHeader);
        console.log("validityToHeader: " + validityToHeader);
        if (typeOfPOHeader === "Inter Company" || (typeOfPOHeader === "PO for Services" && accAssCat_temp === "U" && itemCat_temp === "D")) {

            if (validityFromHeader === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Validity From in Additional Data tab!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                $("#additionaldata").addClass("active");
                $("#additionaldata-tab").addClass("active");
                $("#additionaldata-tab").addClass("show");
                $("#validityFromHeader").focus();
                return false;
            }
            if (validityToHeader === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Validity From in Additional Data tab!";
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                $("#additionaldata").addClass("active");
                $("#additionaldata-tab").addClass("active");
                $("#additionaldata-tab").addClass("show");
                $("#validityToHeader").focus();
                return false;
            }

            var validityFromHeader_Date = validityFromHeader.split("-");
            var validityFromHeader_day = validityFromHeader_Date[0];
            var validityFromHeader_month = validityFromHeader_Date[1];
            var validityFromHeader_year = validityFromHeader_Date[2];

            validityFromHeader = validityFromHeader_year + "-" + validityFromHeader_month + "-" + validityFromHeader_day;
            console.log("validityFromHeader new: " + validityFromHeader);

            var validityToHeader_Date = validityToHeader.split("-");
            var validityToHeader_day = validityToHeader_Date[0];
            var validityToHeader_month = validityToHeader_Date[1];
            var validityToHeader_year = validityToHeader_Date[2];

            validityToHeader = validityToHeader_year + "-" + validityToHeader_month + "-" + validityToHeader_day;
            console.log("validityToHeader new: " + validityToHeader);
        }
        else
        {
            validityFromHeader = "";
            validityToHeader = "";
        }

        if (purchasingOrg === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please enter Purchasing Organization in Org. Data Tab!"
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            $("#purchasingOrg").focus();
            return false;
        }
        if (purchasingGroup === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please select Purchasing Group in Org. Data Tab!"
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            $("#purchasingGroup").focus();
            return false;
        }

        var IncoTermsPart1 = $("#IncoTermsPart1").val();
        var typeOfPO = $("#typeOfPOHeader").val();
        if (IncoTermsPart1.trim() === "SC") {
            if (typeOfPO === 'Non-Ferrous PO - Imp' || typeOfPO === 'Ferrous Joint Pur' || typeOfPO === 'Ferrous PO - Import' || typeOfPO === 'Ferrous PO - Local'
                    || typeOfPO === 'Non-Ferrous PO - Loc') {
                var ZoneCollectionScrap = $("#ZoneCollectionScrap").val();
                if (ZoneCollectionScrap === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    var errorMsg = "Please select Zone in Customer Data Data Tab!";
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    $("#customerdata").addClass("active");
                    $("#customerdata-tab").addClass("active");
                    $("#customerdata-tab").addClass("show");
                    $("#ZoneCollectionScrap").focus();
                    return false;
                }
            }
        }

//        var poNotesToApprover = $("#pONotetoApproverHeaderTextsLimits").val();
//        if (poNotesToApprover === "") {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: "Please enter PO Note to Approver in Header Text Tab!"
//            });
//            $("#headerText_linelevel").addClass("active");
//            $("#headerText_linelevel-tab").addClass("active");
//            $("#headerText_linelevel-tab").addClass("show");
//            $("#pONotetoApproverHeaderTextsLimits").focus();
//            return false;
//        } else {
//            $("#headerText_linelevel").addClass("active");
//            $("#headerText_linelevel-tab").addClass("active");
//            $("#headerText_linelevel-tab").addClass("show");
//        }

        var isNetPricePresent = true;
        $("#material_headerClass tbody tr").each(function(index) {
            var prNetPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
            var isFOCEnabled = $(this).find("td").eq(32).children(".prFreeOfCharge").prop("checked");
            if ((prNetPrice.toString().trim() === "" || Number(prNetPrice) === 0) && isFOCEnabled === false)
            {
                $(this).find("td").eq(12).children(".pr-net-price").focus();
                isNetPricePresent = false;
                return false;
            }
        });

//        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
        var accAsgn = "";
        var itemCat = "";
        var lineType = "";
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                lineType = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            }
        });
        var isAccAsgnSaved = "Yes";
        var prIndex = -1;
        if (PrType === "Service") {
            var PoFrom = $("#PoFrom").val();
            if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
//                if (lineType === "EmptyLine") {
                $(".collapseDivLineLevel").find(".active").removeClass("active");
                $("#serviceTableId tbody tr").each(function(index) {
                    if ($(this).find("td").eq(0).children(".saveSarviceAccountAssignment").val() === "No")
                    {
                        isAccAsgnSaved = "No";
                        prIndex = index + 1;
                        return false;
                    }
                });

                if (itemCat !== "" && itemCat === "D") {
                    if (accAsgn !== "U") {
                        if (isAccAsgnSaved === "No")
                        {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please Save Service Account Assignment " + prIndex;
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            $("#services").addClass("active");
                            $("#services-tab").addClass("active");
                            $("#services-tab").addClass("show");
                            return false;
                        }
                    }
                }
//                }
            }
            if (itemCat !== "" && itemCat === "D") {
                if (accAsgn !== "U")
                {
                    if (accAsgn === "R") {
                        $(".collapseDivLineLevel").find(".active").removeClass("active");
                        var isProfSegSaved = "Yes";
                        var prIndex = -1;
                        $("#serviceTableId tbody tr").each(function(index) {
                            if ($(this).find("td").eq(0).children(".isProfitabilitySegmentDataSaved").val() === "No")
                            {
                                isProfSegSaved = "No";
                                prIndex = index + 1;
                                return false;
                            }
                        });
                        if (isProfSegSaved === "No") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please Save Profitability Segment for Service " + prIndex;
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            $("#services").addClass("active");
                            $("#services-tab").addClass("active");
                            $("#services-tab").addClass("show");
                            return false;
                        }
                    }
                }
            }
        }
        var PoFrom = $("#PoFrom").val();
//        if (PoFrom !== "editpo" && PoFrom !== "editApprovedPo") {
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo" || PoFrom === "createpo" || PoFrom === "byrfq") {                //BITTU Kumar
            if (isNetPricePresent === false)
            {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: "Please enter valid Unit Price in PO Line Item!"
                });
                return false;
            }
            console.log("Pr Unit Price Not Present");
        }
        //        }
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
            var ch = prLineItemTableValidation();
            if (ch === "1") {
                return false;
            }
        }

        if ($("#material_headerClass tbody tr").length === 0)
        {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please add PO Line!"
            });
            $("#addEmptyPoLineBtn").focus();
            return false;
        }

        if ($("#PrType").val() === "Material")
        {
            if ($("#PoFrom").val() === "editpo" || $("#PoFrom").val() === "editApprovedPo" || $("#PoFrom").val() === "shortcutPo")
            {
                var isValid = validateClonedPoLineQuantity();
                console.log("isValid: " + isValid);
                if (isValid === false)
                {
                    return false;
                }
            }
        }
        var isServiceTabSaved = $("#isServiceTabSaved").val();
        var isInvoiceTabSaved = $("#isInvoiceTabSaved").val();
        var isAccountAssignmentTabSaved = $("#isAccountAssignmentTabSaved").val();
        var isDeliveryScheduleTabSaved = $("#isDeliveryScheduleTabSaved").val();

        console.log("isServiceTabSaved: " + isServiceTabSaved);
        console.log("isInvoiceTabSaved: " + isInvoiceTabSaved);
        console.log("isAccountAssignmentTabSaved: " + isAccountAssignmentTabSaved);
        console.log("isDeliveryScheduleTabSaved: " + isDeliveryScheduleTabSaved);

        var ItemCat = "";
        var accAsgn = "";
        $("#material_headerClass tbody tr").each(function(index) {
            if (index === 0)
            {
                ItemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                console.log("ItemCat: " + ItemCat);
            }
        });

//        if (isDeliveryScheduleTabSaved !== "Yes")
//        {
//            Lobibox.alert("error", {
//                msg: "Please Save Delivery Schedule Tab Data first!"
//            });
//            return false;
//        }

//        if (isInvoiceTabSaved !== "Yes")
//        {
//            Lobibox.alert("error", {
//                msg: "Please Save Invoice Tab Data First!"
//            });
//            return false;
//        }

        $(".collapseDivLineLevel").find(".active").removeClass("active");
        var isDelSchValid = checkDeliveryScheduleTabValidation();
        console.log("isDelSchValid: " + isDelSchValid);
        if (isDelSchValid === false)
        {
            $("#overlay").css("display", "none");
            return false;
        }

        $(".collapseDivLineLevel").find(".active").removeClass("active");
        var savePoLineLobiboxNotifyAlert = null;
        var TaxCode = $("#TaxCode").val();
        if (TaxCode === "" && TaxCode.toString().trim() === "")
        {
            $("#overlay").css("display", "none");
            if (savePoLineLobiboxNotifyAlert !== null)
            {
                savePoLineLobiboxNotifyAlert.remove();
            }
            savePoLineLobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Enter Tax Code in Invoice Tab!"
            });
            $("#TaxCode").focus();
            $("#invoice").addClass("active");
            $("#invoice-tab").addClass("active");
            $("#invoice-tab").addClass("show");
            $("#TaxCode").focus();
            return false;
        } else {
            $("#invoice").addClass("active");
            $("#invoice-tab").addClass("active");
            $("#invoice-tab").addClass("show");
        }
        var PoFrom = $("#PoFrom").val();
        if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
            var PrType = $("#PrType").val();
            var accountAssignment = "";
            var distribution = $("#distribution").val();
            console.log("distribution on save :" + distribution);
            if (PrType === "Material") {
                /*Edited by Bittu on 15/09/2020*/
                var insertionid = $("#ItemNumberSelect").val();
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    if (insertionid === id) {
                        accountAssignment = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                    }
                });
                var isCorrect = lineLevelValidation(distribution, accountAssignment, "pr");
                $("#invoice").removeClass("active");
                $("#invoice-tab").removeClass("active");
                $("#invoice-tab").removeClass("show");
                $("#account_assignment").addClass("active");
                $("#account_assignment-tab").addClass("active");
                $("#account_assignment-tab").addClass("show");
                if (isCorrect === false) {
                    return false;
                }
            } else if (PrType === "Service") {
                var taxcode = $("#TaxCode").val();
                if (taxcode !== "") {
                    $("#invoice").addClass("active");
                    $("#invoice-tab").addClass("active");
                    $("#invoice-tab").addClass("show");
                }
            }
        }

        var isPrSavedAfterEditDetails = $("#isPrSavedAfterEditDetails").val();
        console.log("isPrSavedAfterEditDetails: " + isPrSavedAfterEditDetails);

        var isAnyFieldValueChanged = $("#isAnyFieldValueChanged").val();
        console.log("isAnyFieldValueChanged: " + isAnyFieldValueChanged);

        var isPrSaved = "Yes";
        var prIndex = -1;
        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(0).children(".isPrSaved").val() === "No")
            {
                isPrSaved = "No";
                prIndex = index + 1;
                return false;
            }
        });
        if (isPrSaved === "No")
        {
            Lobibox.alert("error", {
                msg: "Please enter details for PO Line " + prIndex
            });
            return false;
        }

        var poComments = "";
//        if ($("#PoFrom").val() === "editpo" || $("#PoFrom").val() === "editApprovedPo" || $("#PoFrom").val() === "cancelPo")
        //        if ($("#PoFrom").val() === "editApprovedPo" || $("#PoFrom").val() === "cancelPo")
        if ($("#PoFrom").val() === "cancelPo")
        {
            poComments = $("#poComments").val();
            if (poComments.toString().trim() === "")
            {
                $("#editAmendPoCommentsModal").modal("show");
                return false;
            }
        }
        console.log("poComments: " + poComments);

        $("#overlay").css("display", "block");

        setTimeout(
                function() {
                    var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
                    var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
                    var vendorName = vendorNameCode.substring(0, vendorNameCode.lastIndexOf('-'));
                    console.log(vendorCode + ", " + vendorName);
                    vendorName = handleSpecialCharacter(vendorName);
                    console.log("After Special Character: " + vendorName);

                    var docDate = $("#docDateHeader").val();
                    var arr1 = docDate.split("-");
                    var day = arr1[0].trim();
                    var month = arr1[1].trim();
                    var year = arr1[2].trim();
                    var newDocDate = year + "-" + month + "-" + day;

                    var PoFrom = $("#PoFrom").val();
                    console.log("PoFrom 69: " + PoFrom);
                    var poNumber = "";
                    var pid = "";
                    var PO_SequenceNO = "";

                    if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "cancelPo")
                    {
                        poNumber = $("#PoNumber").val();
                        pid = $("#Pid").val();
                        PO_SequenceNO = $("#PO_SequenceNO").val();
                    }
                    console.log("poNumber: " + poNumber);
                    console.log("pid: " + pid);

                    var RfqNumberPo = $("#rfqNumber").val();
                    console.log("RfqNumberPo 1: " + RfqNumberPo);
                    if (RfqNumberPo === undefined)
                    {
                        RfqNumberPo = "";
                    }
                    console.log("RfqNumberPo 2: " + RfqNumberPo);

                    var RequestType = "Create Purchase Order";
                    var RequestFlag = "C";
                    if (PoFrom === "editpo")
                    {
                        RequestType = $("#requestType").val();
                        RequestFlag = "M";
                    }
                    if (PoFrom === "editApprovedPo")
                    {
                        RequestType = "Amend Purchase Order";
                        RequestFlag = "C";
                    }
                    if (PoFrom === "cancelPo")
                    {
                        RequestType = "Delete Purchase Order";
                        RequestFlag = "C";
                    }
                    if ($("#PoFrom").val() === "shortcutPo")
                    {
                        if ($("#requestType").val() === "Create Purchase Order")
                        {
                            RequestType = "Create Purchase Order";
                            RequestFlag = "C";
                        }
                        else if ($("#requestType").val() === "Amend Purchase Order")
                        {
                            RequestType = "Amend Purchase Order";
                            RequestFlag = "C";
                        }
                        else if ($("#requestType").val() === "Delete Purchase Order")
                        {
                            RequestType = "Delete Purchase Order";
                            RequestFlag = "C";
                        }
                    }
                    console.log("RequestType: " + RequestType);
                    console.log("RequestFlag: " + RequestFlag);
                    var isAckReq = "";                                          //Bittu 09 July 2020
                    //                    if (PoFrom === "createpo" || PoFrom === "byrfq") {
                    if ($("#isAckReq").prop("checked") === true) {
                        isAckReq = true;
                    } else {
                        isAckReq = false;
                    }
                    //                    }

                    var TestRun = "";
                    if (isPreCheck === "Yes")
                    {
                        TestRun = "X";
                    }
                    console.log("TestRun: " + TestRun);

                    var xmlString = "<POCreation>"
                            + "<GeneralData>"
                            + "<PID>" + pid + "</PID>"
                            + "<RequestFlag>" + RequestFlag + "</RequestFlag>"
                            + "<UniqueID></UniqueID>"
                            + "<UserId>" + $("#creatorId").text() + "</UserId>"
                            + "<InitiatorId>" + $("#creatorId").text() + "</InitiatorId>"
                            + "<InitiatorEmailId>" + $("#creatorEmailId").text() + "</InitiatorEmailId>"
                            + "<CompanyCode>" + $("#companycodeHeader").val() + "</CompanyCode>"
                            + "<RequestType>" + RequestType + "</RequestType>"
                            + "<PurchaseSubCategory></PurchaseSubCategory>"
                            + "<PurchaseOrderNumber>" + poNumber + "</PurchaseOrderNumber>"
                            + "<PurchaseOrderType>" + $("#typeOfPOHeader").val() + "</PurchaseOrderType>"
                            + "<ReferenceDocumentType>" + $("#referenceDocType").val() + "</ReferenceDocumentType>"
                            + "<ReferenceDocumentNumber></ReferenceDocumentNumber>"
                            + "<ReferenceDocumentLine></ReferenceDocumentLine>"
                            + "<VendorName>" + vendorName + "</VendorName>"
                            + "<VendorCode>" + vendorCode + "</VendorCode>"
                            + "<DocumentDate>" + newDocDate + "</DocumentDate>"
                            + "<DownpaymentReqd>" + $("#downPaymentReqd").val() + "</DownpaymentReqd>"
                            + "<value>" + $("#downPaymentReqdValue").val() + "</value>"
                            + "<PurchasingOrg>" + $("#purchasingOrg").val() + "</PurchasingOrg>"
                            + "<PurchasingGrp>" + $("#purchasingGroup").val() + "</PurchasingGrp>"
                            + "<CollectiveNumber>" + $("#CollectiveNumber").val() + "</CollectiveNumber>"
                            + "<TotalPOAmount>" + $("#totalPoAmt").val() + "</TotalPOAmount>"
                            + "<TotalPOAmtPOVendor>" + $("#totalPoAmtExcludingVendor").val() + "</TotalPOAmtPOVendor>"
                            + "<PO_SequenceNO>" + PO_SequenceNO + "</PO_SequenceNO>"
                            + "<RFQNo>" + RfqNumberPo + "</RFQNo>"
                            + "<Addtn_ValidFrom>" + validityFromHeader + "</Addtn_ValidFrom>"
                            + "<Addtn_ValidTo>" + validityToHeader + "</Addtn_ValidTo>"
                            + "<Comments>" + poComments + "</Comments>"
                            + "<isVendorAckReq>" + isAckReq + "</isVendorAckReq>"
                            + "<TestRun>" + TestRun + "</TestRun>"
                            + "</GeneralData>";

                    var PODeliveryInvoiceData = "<PODeliveryInvoiceData>"
                            + "<paymentTerms>" + $("#paymentTermsDelivery").val() + "</paymentTerms>"
                            + "<paymentindays1>" + $("#paymentDays1").val() + "</paymentindays1>"
                            + "<paymentinpercnt1>" + $("#paymentPer1").val() + "</paymentinpercnt1>"
                            + "<paymentindays2>" + $("#paymentDays2").val() + "</paymentindays2>"
                            + "<paymentinpercnt2>" + $("#paymentPer1").val() + "</paymentinpercnt2>"
                            + "<paymentindaysnet>" + $("#paymentDaysNet").val() + "</paymentindaysnet>"
                            + "<Currency>" + $("#CurrencyDeliveryInvoice").val() + "</Currency>"
                            + "<ExchangeRate>" + $("#ExchangeRate").val() + "</ExchangeRate>"
                            + "<ExchangeRateFixed>" + ($("#ExchangeReateFixed").prop("checked") === true ? 'true' : 'false') + "</ExchangeRateFixed>"
                            + "<Incoterms1>" + $("#IncoTermsPart1").val() + "</Incoterms1>"
                            + "<Incoterms2>" + $("#IncoTermsPart2").val() + "</Incoterms2>"
                            + "<GRMessage>" + ($("#GRMessage").prop("checked") === true ? 'true' : 'false') + "</GRMessage>"
                            + "</PODeliveryInvoiceData>";

                    console.log("PODeliveryInvoiceData: " + PODeliveryInvoiceData);

                    var POVendorAddressData = "<POVendorAddressData>"
                            + "<Street>" + handleSpecialCharacter($("#streetVendorAddress").val()) + "</Street>"
                            + "<HouseNumber>" + handleSpecialCharacter($("#houseNumberVendorAddress").val()) + "</HouseNumber>"
                            + "<PostalCode>" + handleSpecialCharacter($("#postalCodeVendorAddress").val()) + "</PostalCode>"
                            + "<City>" + handleSpecialCharacter($("#cityVendorAddress").val()) + "</City>"
                            + "<Country>" + handleSpecialCharacter($("#countryVendorAddress").val()) + "</Country>"
                            + "<TelNo>" + handleSpecialCharacter($("#telephoneVendorAddress").val()) + "</TelNo>"
                            + "<TelExt>" + handleSpecialCharacter($("#extTel").val()) + "</TelExt>"
                            + "<FaxNo>" + handleSpecialCharacter($("#faxVendorAddress").val()) + "</FaxNo>"
                            + "<FaxExt>" + handleSpecialCharacter($("#extFax").val()) + "</FaxExt>"
                            + "<MailID>" + handleSpecialCharacter($("#vendorEmail").val()) + "</MailID>"
                            + "</POVendorAddressData>";

                    console.log("POVendorAddressData: " + POVendorAddressData);

                    var POCustomerData = "<POCustomerData>"
                            + "<PaymentImmediate>" + ($("#PaymentImmediate").prop("checked") === true ? 'true' : 'false') + "</PaymentImmediate>"
                            + "<ExternalWeight>" + ($("#ExternalWeight").prop("checked") === true ? 'true' : 'false') + "</ExternalWeight>"
                            + "<InstructionsToWeighter>" + $("#InstructionToWeigher").val() + "</InstructionsToWeighter>"
                            + "<ZoneCollectionScrap>" + $("#ZoneCollectionScrap").val() + "</ZoneCollectionScrap>"
                            + "<PriceDisplay>" + ($("#PriceDisplay").prop("checked") === true ? 'true' : 'false') + "</PriceDisplay>"
                            + "<ProductOrigin>" + $("#ProductOrigin").val() + "</ProductOrigin>"
                            + "<Segment>" + $("#SegmentDescription").val() + "</Segment>"
                            + "</POCustomerData>";

                    console.log("POCustomerData: " + POCustomerData);

                    var POCommunicationData = "<POCommunicationData>"
                            + "<SalesPerson>" + $("#Salesperson").val() + "</SalesPerson>"
                            + "<YourReference>" + $("#YourReference").val() + "</YourReference>"
                            + "<Telephone>" + $("#Telephone").val() + "</Telephone>"
                            + "<OurReference>" + $("#OurReference").val() + "</OurReference>"
                            + "<Language>" + $("#Language").val() + "</Language>"
                            + "</POCommunicationData>";

                    console.log("POCommunicationData: " + POCommunicationData);

                    var POPartnersData = "";
                    $("#partnerTableId tbody tr").each(function() {
                        POPartnersData += "<POPartnersData>"
                                + "<PartnerFunction></PartnerFunction>"
                                + "<Name></Name>"
                                + "<Number></Number>"
                                + "<VendorName></VendorName>"
                                + "</POPartnersData>";
                    });
                    console.log("POPartnersData: " + POPartnersData);

                    var POHeaderTextData = "";

                    POHeaderTextData += "<POHeaderTextData>"
                            + "<ItemNumber></ItemNumber>"
                            + "<PONoteToApprover>" + handleSpecialCharacter($("#pONotetoApproverHeaderTextsLimits").val()) + "</PONoteToApprover>"
                            + "<HeaderNote>" + handleSpecialCharacter($("#HeaderNote").val()) + "</HeaderNote>"
                            + "<PricingTypes>" + handleSpecialCharacter($("#PricingTypes").val()) + "</PricingTypes>"
                            + "<Deadlines>" + handleSpecialCharacter($("#Deadlines").val()) + "</Deadlines>"
                            + "<TermsOfDelivery>" + handleSpecialCharacter($("#TermsofDelivery").val()) + "</TermsOfDelivery>"
                            + "<TermsOfPayment>" + handleSpecialCharacter($("#TermsofPayment").val()) + "</TermsOfPayment>"
                            + "<ShippingInstructions>" + handleSpecialCharacter($("#ShippingInstructions").val()) + "</ShippingInstructions>"
                            + "<VendorMemoGeneral>" + handleSpecialCharacter($("#VendorMemoGeneral").val()) + "</VendorMemoGeneral>"
                            + "<VendorMemoSpecial>" + handleSpecialCharacter($("#VendorMemoSpecial").val()) + "</VendorMemoSpecial>"
                            + "<LinkId></LinkId>"
                            + "<Headertext>" + handleSpecialCharacter($("#headerText").val()) + "</Headertext>"
                            + "</POHeaderTextData>";

                    console.log("POHeaderTextData: " + POHeaderTextData);

                    var POStatusData = "";
                    POStatusData = "<POStatusData>"
                            + "<Ordered>" + removeCommaInNumber($("#ordered").val() !== undefined ? $("#ordered").val() : "") + "</Ordered>"
                            + "<Delivered>" + removeCommaInNumber($("#delivered").val() !== undefined ? $("#delivered").val() : "") + "</Delivered>"
                            + "<Stilltodeliv>" + removeCommaInNumber($("#stillToDeliv").val() !== undefined ? $("#stillToDeliv").val() : "") + "</Stilltodeliv>"
                            + "<Invoiced>" + removeCommaInNumber($("#invoiced").val() !== undefined ? $("#invoiced").val() : "") + "</Invoiced>"
                            + "<OrderedTotalPrice>" + removeCommaInNumber($("#orderedTotalPrice").val() !== undefined ? $("#orderedTotalPrice").val() : "") + "</OrderedTotalPrice>"
                            + "<DeliveredTotalPrice>" + removeCommaInNumber($("#deliveredTotalPrice").val() !== undefined ? $("#deliveredTotalPrice").val() : "") + "</DeliveredTotalPrice>"
                            + "<StilltodelivTotalPrice>" + removeCommaInNumber($("#stillToDelivTotalPrice").val() !== undefined ? $("#stillToDelivTotalPrice").val() : "") + "</StilltodelivTotalPrice>"
                            + "<InvoicedTotalPrice>" + removeCommaInNumber($("#invoicedTotalPrice").val() !== undefined ? $("#invoicedTotalPrice").val() : "") + "</InvoicedTotalPrice>"
                            + "<DownpaymtsTotalPrice>" + removeCommaInNumber($("#downpaymentsTotalPrice").val() !== undefined ? $("#downpaymentsTotalPrice").val() : "") + "</DownpaymtsTotalPrice>"
                            + "<OrderedCurrency>" + ($("#orderedCurrency").val() !== undefined ? $("#orderedCurrency").val() : "") + "</OrderedCurrency>"
                            + "<DeliveredCurrency>" + ($("#deliveredCurrency").val() !== undefined ? $("#deliveredCurrency").val() : "") + "</DeliveredCurrency>"
                            + "<StilltodelivCurrency>" + ($("#stillToDelivCurrency").val() !== undefined ? $("#stillToDelivCurrency").val() : "") + "</StilltodelivCurrency>"
                            + "<InvoicedCurrency>" + ($("#invoicedCurrency").val() !== undefined ? $("#invoicedCurrency").val() : "") + "</InvoicedCurrency>"
                            + "<DownpaymtsCurrency>" + ($("#downpaymentsCurrency").val() !== undefined ? $("#downpaymentsCurrency").val() : "") + "</DownpaymtsCurrency>"
                            + "</POStatusData>";
                    console.log("POStatusData: " + POStatusData);

                    var POLineItemCustomerData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindLineItemCustomerData",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonCustomerDataArr = $.parseJSON(responseJson.responseText);
                                jsonCustomerDataArr = JSON.parse(JSON.stringify(jsonCustomerDataArr));
                                console.log("jsonCustomerDataArr: " + jsonCustomerDataArr);

                                for (var i = 0; i < jsonCustomerDataArr.length; i++)
                                {
                                    console.log("InvoiceItemNumber: " + jsonCustomerDataArr[i].prItemNumber);
                                    POLineItemCustomerData += "<POLineItemCustomerData>"
                                            + "<ItemNumber>" + (jsonCustomerDataArr[i].prItemNumber === undefined ? "" : jsonCustomerDataArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<ProductOrigin>" + (jsonCustomerDataArr[i].productOrigin === undefined ? "" : jsonCustomerDataArr[i].productOrigin) + "</ProductOrigin>"
                                            + "<Segment>" + (jsonCustomerDataArr[i].segment === undefined ? "" : jsonCustomerDataArr[i].segment) + "</Segment>"
                                            + "<LinkId>" + (jsonCustomerDataArr[i].linkId === undefined ? "" : jsonCustomerDataArr[i].linkId) + "</LinkId>"
                                            + "</POLineItemCustomerData>";
                                }
                            }
                        });
                        console.log("POLineItemCustomerData: " + POLineItemCustomerData);
                    });

                    var POConditionsData = "";
                    $("#conditionTableId tbody tr").each(function() {
                        //                        console.log($(this).find("td").eq(1).children(".ConditionTypeHeader").val());

                        var condName = "";
                        if ($(this).find("td").eq(2).children(".nameConditionsHeader").val() !== undefined && $(this).find("td").eq(2).children(".nameConditionsHeader").val() !== "")
                        {
                            condName = handleSpecialCharacter($(this).find("td").eq(2).children(".nameConditionsHeader").val());
                        }
                        var vendorName = "";
                        if ($(this).find("td").eq(11).children(".conditionHeaderVendorName").val() !== undefined && $(this).find("td").eq(11).children(".conditionHeaderVendorName").val() !== "") {
                            vendorName = handleSpecialCharacter($(this).find("td").eq(11).children(".conditionHeaderVendorName").val());
                        }

                        var amount = "";
                        if ($(this).find("td").eq(3).children("input").hasClass("AmountHeader") === true) {
                            amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountHeader").val());
                        } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountHeader") === true) {
                            amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountHeader").val());
                        }

                        POConditionsData += "<POConditionsData>"
                                + "<CondUnit>" + $(this).find("td").eq(7).children(".UoMHeader").val() + "</CondUnit>"
                                + "<CondSTNo>" + $(this).find("td").eq(11).children(".conditionHeaderSTUNR").val() + "</CondSTNo>"
                                + "<CondCount>" + $(this).find("td").eq(11).children(".conditionHeaderZAEHK").val() + "</CondCount>"
                                + "<CondChangeId>" + $(this).find("td").eq(11).children(".conditionHeaderCHANGEID").val() + "</CondChangeId>"
                                + "<CondType>" + $(this).find("td").eq(1).children(".ConditionTypeHeader").val() + "</CondType>"
                                + "<CondName>" + condName + "</CondName>"
                                + "<CondVal>" + removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueHeader").val()) + "</CondVal>"
                                + "<CondCrncy>" + $(this).find("td").eq(4).children(".CurrencyHeader").val() + "</CondCrncy>"
                                + "<Amount>" + amount + "</Amount>"
//                                + "<CondPricUnit>" + $(this).find("td").eq(6).children(".ConditionPricingUnitHeader").val() + "</CondPricUnit>"
                                + "<CondPricUnit>" + $(this).find("td").eq(5).children(".PerQuantityHeader").val() + "</CondPricUnit>"
                                + "<Currency>" + $(this).find("td").eq(9).children(".Currency2Header").val() + "</Currency>"
                                + "<Application>" + $(this).find("td").eq(11).children(".conditionHeaderKAPPL").val() + "</Application>"
                                + "<AccountKey>" + $(this).find("td").eq(11).children(".conditionHeaderKVSL1").val() + "</AccountKey>"
                                + "<Accruals>" + $(this).find("td").eq(11).children(".conditionHeaderKVSL2").val() + "</Accruals>"
                                + "<VendorName>" + vendorName + "</VendorName>"
                                + "<VendorCode>" + $(this).find("td").eq(11).children(".conditionHeaderVendorCode").val() + "</VendorCode>"
                                + "<CondPriceDate>" + $(this).find("td").eq(11).children(".conditionHeaderCondPriceDate").val() + "</CondPriceDate>"
                                + "<CondCurncyExchangeRate>" + $(this).find("td").eq(11).children(".conditionHeaderCondCurncyExchangeRate").val() + "</CondCurncyExchangeRate>"
                                + "<POCurrencyExchangeRate>" + $(this).find("td").eq(11).children(".conditionHeaderPOCurrencyExchangeRate").val() + "</POCurrencyExchangeRate>"
                                + "<CondBaseRate></CondBaseRate>"
                                + "<Currency1></Currency1>"
                                + "<CondVal1></CondVal1>"
                                + "<CondDet></CondDet>"
                                + "<CondBaseVal></CondBaseVal>"
                                + "<CondClass></CondClass>"
                                + "<CalType></CalType>"
                                + "<CondCatg></CondCatg>"
                                + "<CondCtrl></CondCtrl>"
                                + "<CondOrigin></CondOrigin>"
                                + "<Statistical></Statistical>"
                                + "<ChangedManually></ChangedManually>"
                                + "<AcCrualsTxt></AcCrualsTxt>"
                                + "<LinkId></LinkId>"
                                + "</POConditionsData>";
                    });
                    console.log("POConditionsData: " + POConditionsData);

                    var POLineItemConditionsData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "doajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindLineItemConditionByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonConditionArr = $.parseJSON(responseJson.responseText);
                                console.log("jsonConditionArr length: " + jsonConditionArr.length);
                                console.log("JSON.stringify(jsonConditionArr)" + JSON.stringify(jsonConditionArr));
                                console.log("JSON.parse(JSON.stringify(obj))" + JSON.parse(JSON.stringify(jsonConditionArr)));
                                jsonConditionArr = JSON.parse(JSON.stringify(jsonConditionArr));
                                console.log(jsonConditionArr);

                                for (var i = 0; i < jsonConditionArr.length; i++)
                                {
                                    var condName = "";
                                    if (jsonConditionArr[i].name !== undefined)
                                    {
                                        condName = handleSpecialCharacter(jsonConditionArr[i].name);
                                    }
                                    var vendorName = "";
                                    if (jsonConditionArr[i].vendorName !== undefined)
                                    {
                                        vendorName = handleSpecialCharacter(jsonConditionArr[i].vendorName);
                                    }
                                    POLineItemConditionsData += "<POLineItemConditionsData>"
                                            + "<ItemNumber>" + (jsonConditionArr[i].prItemNumber === undefined ? "" : jsonConditionArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<CondUnit>" + (jsonConditionArr[i].uom === undefined ? "" : jsonConditionArr[i].uom) + "</CondUnit>"
                                            + "<CondSTNo>" + (jsonConditionArr[i].stNumber === undefined ? "" : jsonConditionArr[i].stNumber) + "</CondSTNo>"
                                            + "<CondCount>" + (jsonConditionArr[i].conditionCount === undefined ? "" : jsonConditionArr[i].conditionCount) + "</CondCount>"
                                            + "<CondChangeId>" + (jsonConditionArr[i].changeId === undefined ? "" : jsonConditionArr[i].changeId) + "</CondChangeId>"
                                            + "<CondType>" + (jsonConditionArr[i].conditionType === undefined ? "" : jsonConditionArr[i].conditionType) + "</CondType>"
                                            + "<CondName>" + condName + "</CondName>"
                                            + "<CondVal>" + (jsonConditionArr[i].conditionValue1 === undefined ? "" : jsonConditionArr[i].conditionValue1) + "</CondVal>"
                                            + "<CondCrncy>" + (jsonConditionArr[i].currency1 === undefined ? "" : jsonConditionArr[i].currency1) + "</CondCrncy>"
                                            + "<Amount>" + (jsonConditionArr[i].amount === undefined ? "" : jsonConditionArr[i].amount) + "</Amount>"
//                                            + "<CondPricUnit>" + (jsonConditionArr[i].conditionPricingUnit === undefined ? "" : jsonConditionArr[i].conditionPricingUnit) + "</CondPricUnit>"
                                            + "<CondPricUnit>" + (jsonConditionArr[i].per === undefined ? "" : jsonConditionArr[i].per) + "</CondPricUnit>"
                                            + "<Currency>" + (jsonConditionArr[i].currency2 === undefined ? "" : jsonConditionArr[i].currency2) + "</Currency>"
                                            + "<AccountKey>" + (jsonConditionArr[i].kvsl1 === undefined ? "" : jsonConditionArr[i].kvsl1) + "</AccountKey>"
                                            + "<Accruals>" + (jsonConditionArr[i].kvsl2 === undefined ? "" : jsonConditionArr[i].kvsl2) + "</Accruals>"
                                            + "<Application>" + (jsonConditionArr[i].kappl === undefined ? "" : jsonConditionArr[i].kappl) + "</Application>"
                                            + "<VendorName>" + vendorName + "</VendorName>"                                                   // Condition Vendor Name
                                            + "<VendorCode>" + (jsonConditionArr[i].vendorCode === undefined ? "" : jsonConditionArr[i].vendorCode) + "</VendorCode>"                                                   // Condition Vendor Code
                                            + "<CondPriceDate>" + (jsonConditionArr[i].condPriceDate === undefined ? "" : jsonConditionArr[i].condPriceDate) + "</CondPriceDate>"                                       // Need to Pass, Current Date
                                            + "<CondCurncyExchangeRate>" + (jsonConditionArr[i].condCurncyExchangeRate === undefined ? "" : jsonConditionArr[i].condCurncyExchangeRate) + "</CondCurncyExchangeRate>"   // Need to Pass, FromCurrency: PO Currency, ToCurrency: Condition Currency
                                            + "<POCurrencyExchangeRate>" + (jsonConditionArr[i].poCurrencyExchangeRate === undefined ? "" : jsonConditionArr[i].poCurrencyExchangeRate) + "</POCurrencyExchangeRate>"   // Need to Pass, FromCurrency: Local Currency(SGD), ToCurrency: PO Currency
                                            + "<CondBaseRate></CondBaseRate>"
                                            + "<Currency1></Currency1>"
                                            + "<CondVal1></CondVal1>"
                                            + "<CondDet></CondDet>"
                                            + "<CondBaseVal></CondBaseVal>"
                                            + "<CondClass></CondClass>"
                                            + "<CalType></CalType>"
                                            + "<CondCatg></CondCatg>"
                                            + "<CondCtrl></CondCtrl>"
                                            + "<CondOrigin></CondOrigin>"
                                            + "<Statistical></Statistical>"
                                            + "<ChangedManually></ChangedManually>"
                                            + "<AcCrualsTxt></AcCrualsTxt>"
                                            + "<Status>" + (jsonConditionArr[i].ngStatus === undefined ? "" : jsonConditionArr[i].ngStatus) + "</Status>"
                                            + "<Numerator>" + (jsonConditionArr[i].numerator === undefined ? "" : jsonConditionArr[i].numerator) + "</Numerator>"
                                            + "<BaseUOM>" + (jsonConditionArr[i].baseUOM === undefined ? "" : jsonConditionArr[i].baseUOM) + "</BaseUOM>"
                                            + "<Denominator>" + (jsonConditionArr[i].denominatorforconv === undefined ? "" : jsonConditionArr[i].denominatorforconv) + "</Denominator>"
                                            + "<Uom-Extra>" + (jsonConditionArr[i].uomextra === undefined ? "" : jsonConditionArr[i].uomextra) + "</Uom-Extra>"
                                            + "<LinkId>" + (jsonConditionArr[i].linkId === undefined ? "" : jsonConditionArr[i].linkId) + "</LinkId>"
                                            + "</POLineItemConditionsData>";
                                }
                                //                    console.log("POLineItemConditionsData: " + POLineItemConditionsData);
                            }
                        });
                    });

                    var POInvoiceData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPOInvoiceDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonInvoiceArr = $.parseJSON(responseJson.responseText);
                                jsonInvoiceArr = JSON.parse(JSON.stringify(jsonInvoiceArr));
                                console.log("jsonInvoiceArr: " + jsonInvoiceArr);

                                for (var i = 0; i < jsonInvoiceArr.length; i++)
                                {
                                    var serviceBasedIV = "";
                                    if ($("#PrType").val() === "Service") {
                                        serviceBasedIV = (jsonInvoiceArr[i].serviceBasedIV === undefined ? "" : jsonInvoiceArr[i].serviceBasedIV);
                                    }
                                    console.log("serviceBasedIV: " + serviceBasedIV);
                                    
                                    POInvoiceData += "<POInvoiceData>"
                                            + "<ItemNumber>" + (jsonInvoiceArr[i].prItemNumber === undefined ? "" : jsonInvoiceArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<InvoiceReceipt>" + (jsonInvoiceArr[i].invoiceReceipt === undefined ? "" : jsonInvoiceArr[i].invoiceReceipt) + "</InvoiceReceipt>"
                                            + "<FinalInvoice>" + (jsonInvoiceArr[i].finalInvoice === undefined ? "" : jsonInvoiceArr[i].finalInvoice) + "</FinalInvoice>"
                                            + "<GRBasedIV>" + (jsonInvoiceArr[i].grBasedIV === undefined ? "" : jsonInvoiceArr[i].grBasedIV) + "</GRBasedIV>"
                                            + "<DPCategory></DPCategory>"
                                            + "<TaxCode>" + (jsonInvoiceArr[i].taxCode === undefined ? "" : jsonInvoiceArr[i].taxCode) + "</TaxCode>"
                                            + "<LinkId>" + (jsonInvoiceArr[i].linkId === undefined ? "" : jsonInvoiceArr[i].linkId) + "</LinkId>"
                                            + "<SRVBasedIV>" + serviceBasedIV + "</SRVBasedIV>"
                                            + "</POInvoiceData>";
                                }
                            }
                        });
                        //            console.log("POInvoiceData: " + POInvoiceData);
                    });

                    var PODeliveryData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPODeliveryDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonDeliveryArr = $.parseJSON(responseJson.responseText);
                                jsonDeliveryArr = JSON.parse(JSON.stringify(jsonDeliveryArr));
                                console.log("jsonDeliveryArr: " + jsonDeliveryArr);

                                for (var i = 0; i < jsonDeliveryArr.length; i++)
                                {
                                    console.log("DeliveryItemNumber: " + jsonDeliveryArr[i].prItemNumber);

                                    PODeliveryData += "<PODeliveryData>"
                                            + "<ItemNumber>" + (jsonDeliveryArr[i].prItemNumber === undefined ? "" : jsonDeliveryArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<OverDelTol>" + (jsonDeliveryArr[i].overdeliveryTolerance === undefined ? "" : jsonDeliveryArr[i].overdeliveryTolerance) + "</OverDelTol>"
                                            + "<UnderDelTol>" + (jsonDeliveryArr[i].underdeliveryTolerance === undefined ? "" : jsonDeliveryArr[i].underdeliveryTolerance) + "</UnderDelTol>"
                                            + "<ShippingInstructions>" + (jsonDeliveryArr[i].shippingInstruction === undefined ? "" : jsonDeliveryArr[i].shippingInstruction) + "</ShippingInstructions>"
                                            + "<StockType>" + (jsonDeliveryArr[i].stockType === undefined ? "" : jsonDeliveryArr[i].stockType) + "</StockType>"
                                            + "<FstRem_Exped>" + (jsonDeliveryArr[i].firstRemender === undefined ? "" : jsonDeliveryArr[i].firstRemender) + "</FstRem_Exped>"
                                            + "<SecRem_Exped>" + (jsonDeliveryArr[i].secondRemender === undefined ? "" : jsonDeliveryArr[i].secondRemender) + "</SecRem_Exped>"
                                            + "<ThrdRem_Exped>" + (jsonDeliveryArr[i].thirdRemender === undefined ? "" : jsonDeliveryArr[i].thirdRemender) + "</ThrdRem_Exped>"
                                            + "<ValuationType>" + (jsonDeliveryArr[i].valuationType === undefined ? "" : jsonDeliveryArr[i].valuationType) + "</ValuationType>"
                                            + "<RemShelfLife>" + (jsonDeliveryArr[i].remShelfLife === undefined ? "" : jsonDeliveryArr[i].remShelfLife) + "</RemShelfLife>"
                                            + "<QAControlLife>" + (jsonDeliveryArr[i].qaControlLife === undefined ? "" : jsonDeliveryArr[i].qaControlLife) + "</QAControlLife>"
                                            + "<NoExpend>" + (jsonDeliveryArr[i].noExpend === undefined ? "" : jsonDeliveryArr[i].noExpend) + "</NoExpend>"
                                            + "<PlDelTime>" + (jsonDeliveryArr[i].plDeliveryTime === undefined ? "" : jsonDeliveryArr[i].plDeliveryTime) + "</PlDelTime>"
                                            + "<GrProcTime>" + (jsonDeliveryArr[i].grPROCTime === undefined ? "" : jsonDeliveryArr[i].grPROCTime) + "</GrProcTime>"
                                            + "<LatestGRDate></LatestGRDate>"
                                            + "<IncoTerms1>" + (jsonDeliveryArr[i].incoTerms1 === undefined ? "" : jsonDeliveryArr[i].incoTerms1) + "</IncoTerms1>"
                                            + "<IncoTerm2>" + (jsonDeliveryArr[i].incoTerms === undefined ? "" : jsonDeliveryArr[i].incoTerms) + "</IncoTerm2>"
                                            + "<GoodsReceipt>" + (jsonDeliveryArr[i].goodsReceipt === undefined ? "" : jsonDeliveryArr[i].goodsReceipt) + "</GoodsReceipt>"
                                            + "<GRNonVal>" + (jsonDeliveryArr[i].grNonValuated === undefined ? "" : jsonDeliveryArr[i].grNonValuated) + "</GRNonVal>"
                                            + "<DelvCompleted>" + (jsonDeliveryArr[i].delivCompleted === undefined ? "" : jsonDeliveryArr[i].delivCompleted) + "</DelvCompleted>"
                                            + "<Unlimited>" + (jsonDeliveryArr[i].unlimited === undefined ? "" : jsonDeliveryArr[i].unlimited) + "</Unlimited>"
                                            + "<LinkId>" + (jsonDeliveryArr[i].linkId === undefined ? "" : jsonDeliveryArr[i].linkId) + "</LinkId>"
                                            + "</PODeliveryData>";
                                }
                            }
                        });
                        console.log("PODeliveryData: " + PODeliveryData);
                    });

                    var PODeliveryAddressData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPODeliveryAddressDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonDeliveryAddressArr = $.parseJSON(responseJson.responseText);
                                jsonDeliveryAddressArr = JSON.parse(JSON.stringify(jsonDeliveryAddressArr));
                                console.log("jsonDeliveryAddressArr: " + jsonDeliveryAddressArr);

                                for (var i = 0; i < jsonDeliveryAddressArr.length; i++)
                                {
                                    console.log("DeliveryAddressItemNumber: " + jsonDeliveryAddressArr[i].prItemNumber);

                                    PODeliveryAddressData += "<PODeliveryAddressData>"
                                            + "<ItemNo>" + (jsonDeliveryAddressArr[i].prItemNumber === undefined ? "" : jsonDeliveryAddressArr[i].prItemNumber) + "</ItemNo>"
                                            + "<Title>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].title === undefined ? "" : jsonDeliveryAddressArr[i].title)) + "</Title>"
                                            + "<Name1>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].name1 === undefined ? "" : jsonDeliveryAddressArr[i].name1)) + "</Name1>"
                                            + "<Name2>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].name2 === undefined ? "" : jsonDeliveryAddressArr[i].name2)) + "</Name2>"
                                            + "<Street>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].street === undefined ? "" : jsonDeliveryAddressArr[i].street)) + "</Street>"
                                            + "<HouseNo>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].houseNumber === undefined ? "" : jsonDeliveryAddressArr[i].houseNumber)) + "</HouseNo>"
                                            + "<PostalCode>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].postalCode === undefined ? "" : jsonDeliveryAddressArr[i].postalCode)) + "</PostalCode>"
                                            + "<City>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].city === undefined ? "" : jsonDeliveryAddressArr[i].city)) + "</City>"
                                            + "<Country>" + handleSpecialCharacter((jsonDeliveryAddressArr[i].country === undefined ? "" : jsonDeliveryAddressArr[i].country)) + "</Country>"
                                            + "<Region></Region>"
                                            + "<LinkId>" + (jsonDeliveryAddressArr[i].linkId === undefined ? "" : jsonDeliveryAddressArr[i].linkId) + "</LinkId>"
                                            + "</PODeliveryAddressData>";
                                }
                            }
                        });
                        console.log("PODeliveryAddressData: " + PODeliveryAddressData);
                    });

                    var POTextsData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPOTextsDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonTextsArr = $.parseJSON(responseJson.responseText);
                                jsonTextsArr = JSON.parse(JSON.stringify(jsonTextsArr));
                                console.log("jsonTextsArr: " + jsonTextsArr);

                                for (var i = 0; i < jsonTextsArr.length; i++)
                                {
                                    console.log("TextsItemNumber: " + jsonTextsArr[i].prItemNumber);

                                    POTextsData += "<POTextsData>"
                                            + "<ItemNumber>" + (jsonTextsArr[i].prItemNumber === undefined ? "" : jsonTextsArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<ItemText>" + handleSpecialCharacter((jsonTextsArr[i].itemTax === undefined ? "" : jsonTextsArr[i].itemTax)) + "</ItemText>"
                                            + "<InfoRecordPOText>" + handleSpecialCharacter((jsonTextsArr[i].infoRecordPOText === undefined ? "" : jsonTextsArr[i].infoRecordPOText)) + "</InfoRecordPOText>"
                                            + "<MaterialPOText>" + handleSpecialCharacter((jsonTextsArr[i].materialPOText === undefined ? "" : jsonTextsArr[i].materialPOText)) + "</MaterialPOText>"
                                            + "<PONoteToApprover>" + handleSpecialCharacter((jsonTextsArr[i].poNoteToApprover === undefined ? "" : jsonTextsArr[i].poNoteToApprover)) + "</PONoteToApprover>"
                                            + "<DeliveryText>" + handleSpecialCharacter((jsonTextsArr[i].deliveryText === undefined ? "" : jsonTextsArr[i].deliveryText)) + "</DeliveryText>"
                                            + "<LinkId>" + (jsonTextsArr[i].linkId === undefined ? "" : jsonTextsArr[i].linkId) + "</LinkId>"
                                            + "<PrnotetoApproval>" + handleSpecialCharacter((jsonTextsArr[i].prNoteToApprover === undefined ? "" : jsonTextsArr[i].prNoteToApprover)) + "</PrnotetoApproval>"
                                            + "</POTextsData>";
                                }
                            }
                        });
                        console.log("POTextsData: " + POTextsData);
                    });
//
                    var POConfirmationsData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPOConfirmationsDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonConfirmationsArr = $.parseJSON(responseJson.responseText);
                                jsonConfirmationsArr = JSON.parse(JSON.stringify(jsonConfirmationsArr));
                                console.log("jsonConfirmationsArr: " + jsonConfirmationsArr);

                                for (var i = 0; i < jsonConfirmationsArr.length; i++)
                                {
                                    console.log("ConfirmationsItemNumber: " + jsonConfirmationsArr[i].prItemNumber);

                                    POConfirmationsData += "<POConfirmationsData>"
                                            + "<ItemNumber>" + (jsonConfirmationsArr[i].prItemNumber === undefined ? "" : jsonConfirmationsArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<ConfControl>" + (jsonConfirmationsArr[i].confControl === undefined ? "" : jsonConfirmationsArr[i].confControl) + "</ConfControl>"
                                            + "<OrderAck>" + (jsonConfirmationsArr[i].orderAck === undefined ? "" : jsonConfirmationsArr[i].orderAck) + "</OrderAck>"
                                            + "<ConfirmnReq>" + (jsonConfirmationsArr[i].confirmationRequired === undefined ? "" : jsonConfirmationsArr[i].confirmationRequired) + "</ConfirmnReq>"
                                            + "<RejectInd>" + (jsonConfirmationsArr[i].rejectionInd === undefined ? "" : jsonConfirmationsArr[i].rejectionInd) + "</RejectInd>"
                                            + "<LinkId>" + (jsonConfirmationsArr[i].linkId === undefined ? "" : jsonConfirmationsArr[i].linkId) + "</LinkId>"
                                            + "</POConfirmationsData>";
                                }
                            }
                        });
                        console.log("POConfirmationsData: " + POConfirmationsData);
                    });

                    var POCondCtrlData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPOCondCtrlDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonCondCtrlArr = $.parseJSON(responseJson.responseText);
                                jsonCondCtrlArr = JSON.parse(JSON.stringify(jsonCondCtrlArr));
                                console.log("jsonCondCtrlArr: " + jsonCondCtrlArr);

                                for (var i = 0; i < jsonCondCtrlArr.length; i++)
                                {
                                    console.log("CondCtrlItemNumber: " + jsonCondCtrlArr[i].prItemNumber);

                                    POCondCtrlData += "<POCondCtrlData>"
                                            + "<ItemNumber>" + (jsonCondCtrlArr[i].prItemNumber === undefined ? "" : jsonCondCtrlArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<PrintPrice>" + (jsonCondCtrlArr[i].printPrice === undefined ? "" : jsonCondCtrlArr[i].printPrice) + "</PrintPrice>"
                                            + "<EstimatedPrice>" + (jsonCondCtrlArr[i].estimatePrice === undefined ? "" : jsonCondCtrlArr[i].estimatePrice) + "</EstimatedPrice>"
                                            + "<LinkId>" + (jsonCondCtrlArr[i].linkId === undefined ? "" : jsonCondCtrlArr[i].linkId) + "</LinkId>"
                                            + "</POCondCtrlData>";
                                }
                            }
                        });
                        console.log("POCondCtrlData: " + POCondCtrlData);
                    });

                    var POComponentData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var linkId = $(this).find("td").eq(0).children(".linkId_Class").val();
                        var accAss = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                        var itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("linkId: " + linkId);
                        console.log("accAss: " + accAss);
                        console.log("itemCat: " + itemCat);
                        console.log("insertionOrderId: " + insertionOrderId);
                        if (accAss === "" && itemCat === "L")
                        {
                            $.ajax({
                                type: "GET",
                                url: "poajaxrequest.do",
                                async: false,
                                data: {
                                    "reqFrom": "FindLineItemComponentData",
                                    "lineItemNumber": insertionOrderId
                                },
                                complete: function(responseJson) {
                                    var jsonComponentArr = $.parseJSON(responseJson.responseText);
                                    jsonComponentArr = JSON.parse(JSON.stringify(jsonComponentArr));
                                    console.log("jsonComponentArr: " + jsonComponentArr);

                                    for (var i = 0; i < jsonComponentArr.length; i++)
                                    {
                                        POComponentData += "<POComponentsData>"
                                                + "<POItem>" + (jsonComponentArr[i].prItemNumber === undefined ? "" : jsonComponentArr[i].prItemNumber) + "</POItem>"
                                                + "<schedline>" + (i + 1) + "</schedline>" // 1,2,3...
                                                + "<itemno>" + (i + 1) + "</itemno>" // 1,2,3...
                                                + "<ChangeId>" + (jsonComponentArr[i].changeId === undefined ? "" : jsonComponentArr[i].changeId) + "</ChangeId>"
                                                + "<MaterialCode>" + (jsonComponentArr[i].materialCode === undefined ? "" : jsonComponentArr[i].materialCode) + "</MaterialCode>"
                                                + "<Description>" + (jsonComponentArr[i].description === undefined ? "" : jsonComponentArr[i].description) + "</Description>"
                                                + "<Quantity>" + (jsonComponentArr[i].quantity === undefined || Number(jsonComponentArr[i].quantity) === 0 ? "" : jsonComponentArr[i].quantity) + "</Quantity>"
                                                + "<Plant>" + (jsonComponentArr[i].plant === undefined ? "" : jsonComponentArr[i].plant) + "</Plant>"
                                                + "<Unit>" + (jsonComponentArr[i].unit === undefined ? "" : jsonComponentArr[i].unit) + "</Unit>"
                                                + "<FixedQty></FixedQty>"
                                                + "<ProdStorageLocation>" + (jsonComponentArr[i].productStorageLocation === undefined ? "" : jsonComponentArr[i].productStorageLocation) + "</ProdStorageLocation>"
                                                + "<RequirementDate>" + (jsonComponentArr[i].reqDateAsString === undefined ? "" : jsonComponentArr[i].reqDateAsString) + "</RequirementDate>"
                                                + "<LinkId>" + (jsonComponentArr[i].linkId === undefined ? "" : jsonComponentArr[i].linkId) + "</LinkId>"
                                                + "<qtyfixed>" + (jsonComponentArr[i].qtyIsFixed === undefined ? "" : jsonComponentArr[i].qtyIsFixed) + "</qtyfixed>"
                                                + "<latestreqdate>" + (jsonComponentArr[i].latestReqDateAsString === undefined ? "" : jsonComponentArr[i].latestReqDateAsString) + "</latestreqdate>"
                                                + "<distribkey>" + (jsonComponentArr[i].distributionKey === undefined ? "" : jsonComponentArr[i].distributionKey) + "</distribkey>"
                                                + "<batch>" + (jsonComponentArr[i].batch === undefined ? "" : jsonComponentArr[i].batch) + "</batch>"
                                                + "</POComponentsData>";
                                    }
                                }
                            });
                        }
                        console.log("POComponentData: " + POComponentData);
                    });

                    var POLineItemProfitabilitySegmentData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindProfitabilitySegmentByPRItemNumber",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonProfitabilitySegmentDataArr = $.parseJSON(responseJson.responseText);
                                jsonProfitabilitySegmentDataArr = JSON.parse(JSON.stringify(jsonProfitabilitySegmentDataArr));
                                console.log("jsonProfitabilitySegmentDataArr: " + jsonProfitabilitySegmentDataArr);

                                for (var i = 0; i < jsonProfitabilitySegmentDataArr.length; i++)
                                {
                                    POLineItemProfitabilitySegmentData += "<POProfitabilitySegmentDetailsData>"
                                            + "<Itemno>" + (jsonProfitabilitySegmentDataArr[i].prItemNumber === undefined ? "" : jsonProfitabilitySegmentDataArr[i].prItemNumber) + "</Itemno>"
                                            + "<LinkID>" + (jsonProfitabilitySegmentDataArr[i].linkId === undefined ? "" : jsonProfitabilitySegmentDataArr[i].linkId) + "</LinkID>"
                                            + "<CustomerCode>" + (jsonProfitabilitySegmentDataArr[i].customerCode === undefined ? "" : jsonProfitabilitySegmentDataArr[i].customerCode) + "</CustomerCode>"
                                            + "<Product>" + (jsonProfitabilitySegmentDataArr[i].product === undefined ? "" : jsonProfitabilitySegmentDataArr[i].product) + "</Product>"
                                            + "<BillingType>" + (jsonProfitabilitySegmentDataArr[i].billingType === undefined ? "" : jsonProfitabilitySegmentDataArr[i].billingType) + "</BillingType>"
                                            + "<SalesOrder>" + (jsonProfitabilitySegmentDataArr[i].salesOrder === undefined ? "" : jsonProfitabilitySegmentDataArr[i].salesOrder) + "</SalesOrder>"
                                            + "<ItemNumber>" + (jsonProfitabilitySegmentDataArr[i].itemNumber === undefined ? "" : jsonProfitabilitySegmentDataArr[i].itemNumber) + "</ItemNumber>"
                                            + "<OrderVal>" + (jsonProfitabilitySegmentDataArr[i].sgOrder === undefined ? "" : jsonProfitabilitySegmentDataArr[i].sgOrder) + "</OrderVal>"
                                            + "<CompanyCode>" + (jsonProfitabilitySegmentDataArr[i].companyCode === undefined ? "" : jsonProfitabilitySegmentDataArr[i].companyCode) + "</CompanyCode>"
                                            + "<Plant>" + (jsonProfitabilitySegmentDataArr[i].plant === undefined ? "" : jsonProfitabilitySegmentDataArr[i].plant) + "</Plant>"
                                            + "<BusinessArea>" + (jsonProfitabilitySegmentDataArr[i].businessArea === undefined ? "" : jsonProfitabilitySegmentDataArr[i].businessArea) + "</BusinessArea>"
                                            + "<SalesOrganization>" + (jsonProfitabilitySegmentDataArr[i].salesOrg === undefined ? "" : jsonProfitabilitySegmentDataArr[i].salesOrg) + "</SalesOrganization>"
                                            + "<DistrChannel>" + (jsonProfitabilitySegmentDataArr[i].distrChannel === undefined ? "" : jsonProfitabilitySegmentDataArr[i].distrChannel) + "</DistrChannel>"
                                            + "<Division>" + (jsonProfitabilitySegmentDataArr[i].division === undefined ? "" : jsonProfitabilitySegmentDataArr[i].division) + "</Division>"
                                            + "<WBSElement>" + (jsonProfitabilitySegmentDataArr[i].wBSElement === undefined ? "" : jsonProfitabilitySegmentDataArr[i].wBSElement) + "</WBSElement>"
                                            + "<CostObject>" + (jsonProfitabilitySegmentDataArr[i].costObject === undefined ? "" : jsonProfitabilitySegmentDataArr[i].costObject) + "</CostObject>"
                                            + "<ProfitCentre>" + (jsonProfitabilitySegmentDataArr[i].profitCenter === undefined ? "" : jsonProfitabilitySegmentDataArr[i].profitCenter) + "</ProfitCentre>"
                                            + "<PartnerPC>" + (jsonProfitabilitySegmentDataArr[i].partnerPC === undefined ? "" : jsonProfitabilitySegmentDataArr[i].partnerPC) + "</PartnerPC>"
                                            + "<Country>" + (jsonProfitabilitySegmentDataArr[i].country === undefined ? "" : jsonProfitabilitySegmentDataArr[i].country) + "</Country>"
                                            + "<SalesOffice>" + (jsonProfitabilitySegmentDataArr[i].salesOffice === undefined ? "" : jsonProfitabilitySegmentDataArr[i].salesOffice) + "</SalesOffice>"
                                            + "<SalesEmployee>" + (jsonProfitabilitySegmentDataArr[i].salesEmployee === undefined ? "" : jsonProfitabilitySegmentDataArr[i].salesEmployee) + "</SalesEmployee>"
                                            + "<MatlGroup>" + (jsonProfitabilitySegmentDataArr[i].matlGroup === undefined ? "" : jsonProfitabilitySegmentDataArr[i].matlGroup) + "</MatlGroup>"
                                            + "<ProdHierarchy>" + (jsonProfitabilitySegmentDataArr[i].prodHierarchy === undefined ? "" : jsonProfitabilitySegmentDataArr[i].prodHierarchy) + "</ProdHierarchy>"
                                            + "<ItemCategory>" + (jsonProfitabilitySegmentDataArr[i].itemCategory === undefined ? "" : jsonProfitabilitySegmentDataArr[i].itemCategory) + "</ItemCategory>"
                                            + "<HigherLevelItem>" + (jsonProfitabilitySegmentDataArr[i].higherLevItem === undefined ? "" : jsonProfitabilitySegmentDataArr[i].higherLevItem) + "</HigherLevelItem>"
                                            + "<Industry>" + (jsonProfitabilitySegmentDataArr[i].industry === undefined ? "" : jsonProfitabilitySegmentDataArr[i].industry) + "</Industry>"
                                            + "<CustomerGroup>" + (jsonProfitabilitySegmentDataArr[i].customerGroup === undefined ? "" : jsonProfitabilitySegmentDataArr[i].customerGroup) + "</CustomerGroup>"
                                            + "<ProductHierLevel1>" + (jsonProfitabilitySegmentDataArr[i].prodHierLev1 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].prodHierLev1) + "</ProductHierLevel1>"
                                            + "<ProductHierLevel2>" + (jsonProfitabilitySegmentDataArr[i].prodHierLev2 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].prodHierLev2) + "</ProductHierLevel2>"
                                            + "<ProductHierLevel3>" + (jsonProfitabilitySegmentDataArr[i].prodHierLev3 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].prodHierLev3) + "</ProductHierLevel3>"
                                            + "<MaterialType>" + (jsonProfitabilitySegmentDataArr[i].materialType === undefined ? "" : jsonProfitabilitySegmentDataArr[i].materialType) + "</MaterialType>"
                                            + "<ReferenceDoc>" + (jsonProfitabilitySegmentDataArr[i].referenceDoc === undefined ? "" : jsonProfitabilitySegmentDataArr[i].referenceDoc) + "</ReferenceDoc>"
                                            + "<PROJECTNUMBER1>" + (jsonProfitabilitySegmentDataArr[i].projectNumber1 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].projectNumber1) + "</PROJECTNUMBER1>"
                                            + "<ProjectIndicator>" + (jsonProfitabilitySegmentDataArr[i].projectIndecator === undefined ? "" : jsonProfitabilitySegmentDataArr[i].projectIndecator) + "</ProjectIndicator>"
                                            + "<ValuationType>" + (jsonProfitabilitySegmentDataArr[i].valuationType === undefined ? "" : jsonProfitabilitySegmentDataArr[i].valuationType) + "</ValuationType>"
                                            + "<CustomerClass>" + (jsonProfitabilitySegmentDataArr[i].customerClass === undefined ? "" : jsonProfitabilitySegmentDataArr[i].customerClass) + "</CustomerClass>"
                                            + "<MaterialSourceInd>" + (jsonProfitabilitySegmentDataArr[i].materialSourceInd === undefined ? "" : jsonProfitabilitySegmentDataArr[i].materialSourceInd) + "</MaterialSourceInd>"
                                            + "<ContractType>" + (jsonProfitabilitySegmentDataArr[i].contractType === undefined ? "" : jsonProfitabilitySegmentDataArr[i].contractType) + "</ContractType>"
                                            + "<ShipToParty>" + (jsonProfitabilitySegmentDataArr[i].shipToParty === undefined ? "" : jsonProfitabilitySegmentDataArr[i].shipToParty) + "</ShipToParty>"
                                            + "<IndustryCode1>" + (jsonProfitabilitySegmentDataArr[i].industryCode1 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].industryCode1) + "</IndustryCode1>"
                                            + "<IndustryField1>" + (jsonProfitabilitySegmentDataArr[i].industryField001 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].industryField001) + "</IndustryField1>"
                                            + "<IndustryCode2>" + (jsonProfitabilitySegmentDataArr[i].industryCode2 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].industryCode2) + "</IndustryCode2>"
                                            + "<IndustryCode3>" + (jsonProfitabilitySegmentDataArr[i].industryCode3 === undefined ? "" : jsonProfitabilitySegmentDataArr[i].industryCode3) + "</IndustryCode3>"
                                            + "<ReferenceItem>" + (jsonProfitabilitySegmentDataArr[i].referenceItem === undefined ? "" : jsonProfitabilitySegmentDataArr[i].referenceItem) + "</ReferenceItem>"
                                            + "<SalesDocType>" + (jsonProfitabilitySegmentDataArr[i].salesDocType === undefined ? "" : jsonProfitabilitySegmentDataArr[i].salesDocType) + "</SalesDocType>"
                                            + "</POProfitabilitySegmentDetailsData>";
                                }
                            }
                        });
                        console.log("POLineItemProfitabilitySegmentData: " + POLineItemProfitabilitySegmentData);
                    });

                    var POQuantityWeightsData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);
                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPOQuantityWeightsDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonQuantityWeightsArr = $.parseJSON(responseJson.responseText);
                                jsonQuantityWeightsArr = JSON.parse(JSON.stringify(jsonQuantityWeightsArr));
                                console.log("jsonQuantityWeightsArr: " + jsonQuantityWeightsArr);
                                var POQuantitySKU = "";
                                var POQuantitySKUUnit = "";
                                var Order2 = "";
                                var OrderUnit2 = "";
                                var SKU = "";
                                var SKUUnit = "";
                                for (var i = 0; i < jsonQuantityWeightsArr.length; i++)
                                {
                                    console.log("QuantityWeightsItemNumber: " + jsonQuantityWeightsArr[i].prItemNumber);
                                    if (PrType !== "Service")
                                    {
                                        POQuantitySKU = jsonQuantityWeightsArr[i].poQuantityInSKU === undefined ? "" : jsonQuantityWeightsArr[i].poQuantityInSKU;
                                        POQuantitySKUUnit = jsonQuantityWeightsArr[i].unitPOQuantityInSKU === undefined ? "" : jsonQuantityWeightsArr[i].unitPOQuantityInSKU;
                                        Order2 = jsonQuantityWeightsArr[i].orderUnitSKU === undefined ? "" : jsonQuantityWeightsArr[i].orderUnitSKU;
                                        OrderUnit2 = jsonQuantityWeightsArr[i].unitOrderUnitSKU === undefined ? "" : jsonQuantityWeightsArr[i].unitOrderUnitSKU;
                                        SKU = jsonQuantityWeightsArr[i].sku === undefined ? "" : jsonQuantityWeightsArr[i].sku;
                                        SKUUnit = jsonQuantityWeightsArr[i].unitSKU === undefined ? "" : jsonQuantityWeightsArr[i].unitSKU;
                                    }
                                    POQuantityWeightsData += "<POQuantityWeightsData>"
                                            + "<ItemNumber>" + (jsonQuantityWeightsArr[i].prItemNumber === undefined ? "" : jsonQuantityWeightsArr[i].prItemNumber) + "</ItemNumber>"
                                            + "<POQuantity>" + (jsonQuantityWeightsArr[i].poQuantity === undefined ? "" : jsonQuantityWeightsArr[i].poQuantity) + "</POQuantity>"
                                            + "<POQuantityUnit>" + (jsonQuantityWeightsArr[i].unitPOQuantity === undefined ? "" : jsonQuantityWeightsArr[i].unitPOQuantity) + "</POQuantityUnit>"
                                            + "<POQuantitySKU>" + POQuantitySKU + "</POQuantitySKU>"
                                            + "<POQuantitySKUUnit>" + POQuantitySKUUnit + "</POQuantitySKUUnit>"
                                            + "<Order1>" + (jsonQuantityWeightsArr[i].orderUnit === undefined ? "" : jsonQuantityWeightsArr[i].orderUnit) + "</Order1>"
                                            + "<OrderUnit1>" + (jsonQuantityWeightsArr[i].unitOrderUnit === undefined ? "" : jsonQuantityWeightsArr[i].unitOrderUnit) + "</OrderUnit1>"
                                            + "<Order2>" + Order2 + "</Order2>"
                                            + "<OrderUnit2>" + OrderUnit2 + "</OrderUnit2>"
                                            + "<OrderPrice>" + (jsonQuantityWeightsArr[i].orderPriceUnit === undefined ? "" : jsonQuantityWeightsArr[i].orderPriceUnit) + "</OrderPrice>"
                                            + "<OrderPriceUnit>" + (jsonQuantityWeightsArr[i].unitOrderPriceUnit === undefined ? "" : jsonQuantityWeightsArr[i].unitOrderPriceUnit) + "</OrderPriceUnit>"
                                            + "<SKU>" + SKU + "</SKU>"
                                            + "<SKUUnit>" + SKUUnit + "</SKUUnit>"
                                            + "<LinkID>" + (jsonQuantityWeightsArr[i].linkId === undefined ? "" : jsonQuantityWeightsArr[i].linkId) + "</LinkID>"
                                            + "<Netweight>" + (jsonQuantityWeightsArr[i].netWeight === undefined ? "" : jsonQuantityWeightsArr[i].netWeight) + "</Netweight>"
                                            + "<Grossweight>" + (jsonQuantityWeightsArr[i].grossWeight === undefined ? "" : jsonQuantityWeightsArr[i].grossWeight) + "</Grossweight>"
                                            + "<Volume>" + (jsonQuantityWeightsArr[i].volume === undefined ? "" : jsonQuantityWeightsArr[i].volume) + "</Volume>"
                                            + "<Points>" + (jsonQuantityWeightsArr[i].points === undefined ? "" : jsonQuantityWeightsArr[i].points) + "</Points>"
                                            + "<netweightUnit>" + (jsonQuantityWeightsArr[i].netWeightUnit === undefined ? "" : jsonQuantityWeightsArr[i].netWeightUnit) + "</netweightUnit>"
                                            + "<grosswgtunit>" + (jsonQuantityWeightsArr[i].grossWeightUnit === undefined ? "" : jsonQuantityWeightsArr[i].grossWeightUnit) + "</grosswgtunit>"
                                            + "<netwgtperprice>" + (jsonQuantityWeightsArr[i].netWeightPerPrice === undefined ? "" : jsonQuantityWeightsArr[i].netWeightPerPrice) + "</netwgtperprice>"
                                            + "<grosswgtperprice>" + (jsonQuantityWeightsArr[i].grossWeightPerPrice === undefined ? "" : jsonQuantityWeightsArr[i].grossWeightPerPrice) + "</grosswgtperprice>"
                                            + "<volumeperprice>" + (jsonQuantityWeightsArr[i].volumePerPrice === undefined ? "" : jsonQuantityWeightsArr[i].volumePerPrice) + "</volumeperprice>"
                                            + "<pointsperprice>" + (jsonQuantityWeightsArr[i].pointsPerPrice === undefined ? "" : jsonQuantityWeightsArr[i].pointsPerPrice) + "</pointsperprice>"
                                            + "<netwgtorderunit>" + (jsonQuantityWeightsArr[i].netWeightOrderUnit === undefined ? "" : jsonQuantityWeightsArr[i].netWeightOrderUnit) + "</netwgtorderunit>"
                                            + "<grosswgtorderunit>" + (jsonQuantityWeightsArr[i].grossWeightOrderUnit === undefined ? "" : jsonQuantityWeightsArr[i].grossWeightOrderUnit) + "</grosswgtorderunit>"
                                            + "<volumeorderunit>" + (jsonQuantityWeightsArr[i].volumeOrderUnit === undefined ? "" : jsonQuantityWeightsArr[i].volumeOrderUnit) + "</volumeorderunit>"
                                            + "<pointsorderunit>" + (jsonQuantityWeightsArr[i].pointsOrderUnit === undefined ? "" : jsonQuantityWeightsArr[i].pointsOrderUnit) + "</pointsorderunit>"
                                            + "<netweight2>" + (jsonQuantityWeightsArr[i].netWeight2 === undefined ? "" : jsonQuantityWeightsArr[i].netWeight2) + "</netweight2>"
                                            + "<grossweight2>" + (jsonQuantityWeightsArr[i].grossWeight2 === undefined ? "" : jsonQuantityWeightsArr[i].grossWeight2) + "</grossweight2>"
                                            + "<volume2>" + (jsonQuantityWeightsArr[i].volume2 === undefined ? "" : jsonQuantityWeightsArr[i].volume2) + "</volume2>"
                                            + "<points2>" + (jsonQuantityWeightsArr[i].points2 === undefined ? "" : jsonQuantityWeightsArr[i].points2) + "</points2>"
                                            + "<netweight2Unit>" + (jsonQuantityWeightsArr[i].netWeightUnit2 === undefined ? "" : jsonQuantityWeightsArr[i].netWeightUnit2) + "</netweight2Unit>"
                                            + "<grosswgt2unit>" + (jsonQuantityWeightsArr[i].grossWeightUnit2 === undefined ? "" : jsonQuantityWeightsArr[i].grossWeightUnit2) + "</grosswgt2unit>"
                                            + "</POQuantityWeightsData>";
                                }
                            }
                        });
                        console.log("POQuantityWeightsData: " + POQuantityWeightsData);
                    });

                    var PODeliveryScheduleData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        var linetype = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
                        console.log("linetype :" + linetype);
                        console.log("insertionOrderId: " + insertionOrderId);
                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPODeliveryScheduleDataByInsertionOrderIdOfPR",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var jsonQuantityWeightsArr = $.parseJSON(responseJson.responseText);
                                jsonQuantityWeightsArr = JSON.parse(JSON.stringify(jsonQuantityWeightsArr));
                                console.log("jsonQuantityWeightsArr: " + jsonQuantityWeightsArr);
                                for (var i = 0; i < jsonQuantityWeightsArr.length; i++)
                                {
                                    var reqItemNumber = jsonQuantityWeightsArr[i].requestItemNumber;
                                    if (linetype === "EmptyLine") {
                                        reqItemNumber = "";
                                    }
                                    PODeliveryScheduleData += "<PODeliveryScheduleData>"
                                            + "<ItemNo>" + jsonQuantityWeightsArr[i].prItemNumber + "</ItemNo>"
                                            + "<DelDateCatg>" + jsonQuantityWeightsArr[i].deliveryDateCategory + "</DelDateCatg>"
                                            + "<DelDate>" + jsonQuantityWeightsArr[i].deliveryDate + "</DelDate>"
                                            + "<ScheduledQuantity>" + jsonQuantityWeightsArr[i].scheduledQuantity + "</ScheduledQuantity>"
                                            + "<DelTime>" + jsonQuantityWeightsArr[i].time + "</DelTime>"
                                            + "<PRNumber>" + jsonQuantityWeightsArr[i].purchaseRequestNumber + "</PRNumber>"
                                            + "<ReqItemNo>" + reqItemNumber + "</ReqItemNo>"
                                            + "<LinkId>" + jsonQuantityWeightsArr[i].linkId + "</LinkId>"
                                            + "<Scheduledqty></Scheduledqty>"
                                            + "<Statisticaldeliverydate>" + jsonQuantityWeightsArr[i].statisticalDeliveryDate + "</Statisticaldeliverydate>"
                                            + "<GRQty>" + (jsonQuantityWeightsArr[i].grQuantity === undefined || jsonQuantityWeightsArr[i].grQuantity === "0" ? "" : jsonQuantityWeightsArr[i].grQuantity) + "</GRQty>"
                                            + "<openquantity>" + (jsonQuantityWeightsArr[i].openQuantity === undefined || jsonQuantityWeightsArr[i].openQuantity === "0" ? "" : jsonQuantityWeightsArr[i].openQuantity) + "</openquantity>"
                                            + "</PODeliveryScheduleData>";
                                }
                            }
                        });
                        console.log("PODeliveryScheduleData: " + PODeliveryScheduleData);
                    });

                    var POMaterialData = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        console.log("insertionOrderId: " + insertionOrderId);
                        $.ajax({
                            type: "GET",
                            url: "createAmendDeletePoGetAjaxRequest.do",
                            async: false,
                            data: {
                                "reqFrom": "findMaterialTabByInsertionOrderId",
                                "insertionOrderId": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var materialTabJsonArr = $.parseJSON(responseJson.responseText);
                                materialTabJsonArr = JSON.parse(JSON.stringify(materialTabJsonArr));
                                console.log("materialTabJsonArr: " + materialTabJsonArr);

                                for (var i = 0; i < materialTabJsonArr.length; i++)
                                {
                                    POMaterialData += "<POMaterialData>"
                                            + "<ItemNo>" + materialTabJsonArr[i].prItemNumber + "</ItemNo>"
                                            + "<LinkId>" + materialTabJsonArr[i].linkId + "</LinkId>"
                                            + "<revisionlevel>" + (materialTabJsonArr[i].revisionLevel === undefined ? "" : materialTabJsonArr[i].revisionLevel) + "</revisionlevel>"
                                            + "<VendMatno>" + (materialTabJsonArr[i].vendMatNo === undefined ? "" : materialTabJsonArr[i].vendMatNo) + "</VendMatno>"
                                            + "<EANUPC>" + (materialTabJsonArr[i].eanUpc === undefined ? "" : materialTabJsonArr[i].eanUpc) + "</EANUPC>"
                                            + "<Vendorsubrange>" + (materialTabJsonArr[i].vendorSubrange === undefined ? "" : materialTabJsonArr[i].vendorSubrange) + "</Vendorsubrange>"
                                            + "<Batch>" + (materialTabJsonArr[i].batch === undefined ? "" : materialTabJsonArr[i].batch) + "</Batch>"
                                            + "<vendorbatch>" + (materialTabJsonArr[i].vendorBatch === undefined ? "" : materialTabJsonArr[i].vendorBatch) + "</vendorbatch>"
                                            + "<infoupdate>" + (materialTabJsonArr[i].infoUpdate === undefined ? "" : materialTabJsonArr[i].infoUpdate) + "</infoupdate>"
                                            + "<StockType>" + (materialTabJsonArr[i].stockType === undefined ? "" : materialTabJsonArr[i].stockType) + "</StockType>"
                                            + "<MfrPartNumber>" + (materialTabJsonArr[i].mfrPartNumber === undefined ? "" : materialTabJsonArr[i].mfrPartNumber) + "</MfrPartNumber>"
                                            + "<Manufacturer>" + (materialTabJsonArr[i].manufacturer === undefined ? "" : materialTabJsonArr[i].manufacturer) + "</Manufacturer>"
                                            + "</POMaterialData>";
                                }
                            }
                        });
                        console.log("POMaterialData: " + POMaterialData);
                    });

                    var POAccntAssignData = "";
                    var AccAssDistribution = "";
                    var SerialNo = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var insertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        var accAssCat = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                        console.log("insertionOrderId: " + insertionOrderId);
                        console.log("accAssCat: " + accAssCat);

                        $.ajax({
                            type: "GET",
                            url: "ajaxcontroller.do",
                            async: false,
                            data: {
                                "reqFrom": "getAccountAssignmentByLineItemNumber",
                                "lineItemNumber": insertionOrderId
                            },
                            complete: function(responseJson) {
                                var arr = $.parseJSON(responseJson.responseText);
                                console.log("AccAss Len: " + arr.length);
                                for (var i = 0; i < arr.length; i++) {
                                    console.log("arr[i].DISTRIBUTION :" + arr[i].DISTRIBUTION);
                                    console.log("arr[i].PARTIAL_INVOICE_INDICATOR :" + arr[i].PARTIAL_INVOICE_INDICATOR);

                                    AccAssDistribution = arr[i].DISTRIBUTION === undefined ? '' : arr[i].DISTRIBUTION;

                                    if (AccAssDistribution === "")
                                        AccAssDistribution = "Single Account Assignment";
                                    else if (AccAssDistribution === "1")
                                        AccAssDistribution = "Distrib. On Quantity Basis";
                                    else if (AccAssDistribution === "2")
                                        AccAssDistribution = "Distrib. By Percentage";

                                    console.log("AccAssDistribution :" + AccAssDistribution);

                                    SerialNo = i + 1;
                                    if (SerialNo.toString().length === 1)
                                    {
                                        SerialNo = "0" + SerialNo;
                                    }

                                    if (PrType === "Service")
                                    {
                                        console.log("AccAss.SERIAL_NUMBER: " + arr[i].SERIAL_NUMBER);
                                        SerialNo = arr[i].SERIAL_NUMBER === undefined ? '' : arr[i].SERIAL_NUMBER;
                                        console.log("SerialNo: " + SerialNo);

                                        if (SerialNo !== "" && SerialNo.toString().length === 1)
                                        {
                                            SerialNo = "0" + SerialNo;
                                        }
                                    }

                                    POAccntAssignData += "<POAccntAssignData>"
                                            + "<SerialNo>" + SerialNo + "</SerialNo>"
                                            + "<AccountAssignmentCategory>" + (arr[i].ACC_ASS_CAT === undefined ? '' : arr[i].ACC_ASS_CAT) + "</AccountAssignmentCategory>"
                                            + "<Distribution>" + AccAssDistribution + "</Distribution>"
                                            + "<PartialInvoiceIndicator>" + (arr[i].PARTIAL_INVOICE_INDICATOR === undefined || arr[i].PARTIAL_INVOICE_INDICATOR === "0" ? '' : arr[i].PARTIAL_INVOICE_INDICATOR) + "</PartialInvoiceIndicator>"
                                            + "<CoCode>" + (arr[i].COCODE === undefined ? '' : arr[i].COCODE) + "</CoCode>"
                                            + "<UnloadingPoint>" + (arr[i].UNLOADINGPOINT === undefined ? '' : arr[i].UNLOADINGPOINT) + "</UnloadingPoint>"
                                            + "<Recipient>" + (arr[i].RECEPIENT === undefined ? '' : arr[i].RECEPIENT) + "</Recipient>"
                                            + "<GLAccount>" + (arr[i].GLACCOUNT === undefined ? '' : arr[i].GLACCOUNT) + "</GLAccount>"
                                            + "<COArea>" + (arr[i].COAREA === undefined ? '' : arr[i].COAREA.toString().trim()) + "</COArea>"
                                            + "<CostCenter>" + (arr[i].COSTCENTER === undefined ? '' : arr[i].COSTCENTER) + "</CostCenter>"
                                            + "<AccOrder>" + (arr[i].ORDER === undefined ? '' : arr[i].ORDER) + "</AccOrder>"
                                            + "<Asset>" + (arr[i].ASSET === undefined ? '' : arr[i].ASSET) + "</Asset>"
                                            + "<WBSElement>" + (arr[i].WBSELEMENT === undefined ? '' : arr[i].WBSELEMENT) + "</WBSElement>"
                                            + "<SalesOrder>" + (arr[i].SALESORDER === undefined ? '' : arr[i].SALESORDER) + "</SalesOrder>"
                                            + "<ItemNumber>" + (arr[i].ITEMNUMBER === undefined ? '' : arr[i].ITEMNUMBER) + "</ItemNumber>"
                                            + "<ItmNo>" + (arr[i].ITMNO === undefined ? '' : arr[i].ITMNO) + "</ItmNo>"
                                            + "<DeliverySchedule>" + (arr[i].DELIVERYSCHEDULE === undefined ? '' : arr[i].DELIVERYSCHEDULE) + "</DeliverySchedule>"
                                            + "<Quantity>" + (arr[i].QUANTITY === undefined ? '' : arr[i].QUANTITY) + "</Quantity>"
                                            + "<Percentage>" + (arr[i].PERCENTAGE === undefined ? '' : arr[i].PERCENTAGE) + "</Percentage>"
                                            + "<Fund>" + (arr[i].FUND === undefined ? '' : arr[i].FUND) + "</Fund>"
                                            + "<FunctionalArea>" + (arr[i].FUNCTIONALAREA === undefined ? '' : arr[i].FUNCTIONALAREA.toString().trim()) + "</FunctionalArea>"
                                            + "<FundsCentre>" + (arr[i].FUNDSCENTER === undefined ? '' : arr[i].FUNDSCENTER) + "</FundsCentre>"
                                            + "<CommitmentItem>" + (arr[i].COMMITMENTITEM === undefined ? '' : arr[i].COMMITMENTITEM) + "</CommitmentItem>"
                                            + "<Network>" + (arr[i].LINKNUMBER === undefined ? '' : arr[i].LINKNUMBER) + "</Network>"
                                            + "<ActivityNumber>" + (arr[i].ACTIVITYNUMBER === undefined ? '' : arr[i].ACTIVITYNUMBER) + "</ActivityNumber>"
                                            + "<LinkID></LinkID>"
                                            + "<PRLinkID>" + (arr[i].LINKID === undefined ? '' : arr[i].LINKID) + "</PRLinkID>"
                                            + "<DeleteFlag>" + (arr[i].DELETEFLAG === 'true' ? 'true' : 'false') + "</DeleteFlag>"
                                            + "</POAccntAssignData>";
                                }
                            }
                        });
                    });

                    var POAccntAssignvalData = "";
                    var POLimitsData = "";
                    var POLineItemData = "";
                    var POServiceData = "";
                    var POServiceRefData = "";
                    var PackageNo = "";
                    var LineNo = "";
                    var prType = "";
                    var InsertionOrderIdArray = [];
                    var PoLineQuantityArray = [];
                    var AccAssValDistribution = "";
                    var ServiceAccAssDist = "";
                    var vendorFinalizationPrTableDataArray = [];
                    var PoFrom = $("#PoFrom").val();
                    var maxServiceLineNo = "";
                    var totalPoAmount = 0;
                    var totalPoAmountExcludingVendor = 0;

                    $("#material_headerClass tbody tr").each(function(index) {
                        console.log(index);
                        var IO_Id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        var prRfqNumber = $(this).find("td").eq(0).children(".prRfqNumber").val();
                        var prRfqLineItemNumber = $(this).find("td").eq(0).children(".prRfqLineItemNumber").val();
                        var delvDateCat = $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val();
                        console.log("IO_Id: " + IO_Id);
                        console.log("prRfqNumber: " + prRfqNumber);
                        console.log("prRfqLineItemNumber: " + prRfqLineItemNumber);
                        console.log("delvDateCat: " + delvDateCat);

                        InsertionOrderIdArray.push(IO_Id);
                        PoLineQuantityArray.push(removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val()));

                        var vendorFinalizationPrTableDataObject = {};
                        vendorFinalizationPrTableDataObject["prNumber"] = $(this).find("td").eq(0).children(".prNumber_Class").val();
                        vendorFinalizationPrTableDataObject["prItemNumber"] = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();

                        vendorFinalizationPrTableDataArray.push(vendorFinalizationPrTableDataObject);

                        var prPackageNo = $(this).find("td").eq(0).children(".prPackageNo").val();
                        console.log("prPackageNo: " + prPackageNo);

                        var serviceRefLineNo = $(this).find("td").eq(0).children(".serviceRefLineNo").val();
                        console.log("serviceRefLineNo: " + serviceRefLineNo);
                        if (serviceRefLineNo === "" && maxServiceLineNo === "")
                        {
                            maxServiceLineNo = findMaxServiceLineNoOfLastExistingPOItem();
                            console.log("maxServiceLineNo in newgen.js: " + maxServiceLineNo);
                            if (maxServiceLineNo !== undefined && maxServiceLineNo !== "" && maxServiceLineNo.toString().trim() !== "")
                            {
                                LineNo = Number(maxServiceLineNo) + 1;
                            }
                        }

                        if (PackageNo === "")
                            PackageNo = index + 1;
                        if (LineNo === "")
                            LineNo = index + 1;

                        console.log("Requisition Date :" + $(this).find("td").eq(0).children(".prRequisitionDateHidden").val());
                        console.log("Delivery Date :" + $(this).find('td').eq(11).children(".PR_DeliveryDate").text());

                        var reqDate = $(this).find("td").eq(0).children(".prRequisitionDateHidden").val();
                        var delDate = $(this).find('td').eq(11).children(".PR_DeliveryDate").text();
                        prType = $(this).find("td").eq(0).children(".prType_Class").val();

                        var RequisitionDate = "";
                        if (reqDate !== "")
                        {
                            var date = reqDate.split(".");
                            console.log("date 2040: " + date);
                            var day = date[0];
                            var month = date[1];
                            var year = date[2];
                            RequisitionDate = year + "-" + month + "-" + day;
                        }

                        var DeliveryDate = "";
                        if (delvDateCat === "D")
                        {
                            if (delDate !== "")
                            {
                                var date1 = delDate.split(".");
                                console.log("date 2053: " + date1);
                                var day1 = date1[0];
                                var month1 = date1[1];
                                var year1 = date1[2];
                                DeliveryDate = year1 + "-" + month1 + "-" + day1;
                            }
                        }
                        else
                        {
                            DeliveryDate = delDate;
                        }
                        console.log("RequisitionDate :" + RequisitionDate + " ,DeliveryDate :" + DeliveryDate);

                        var taxCode = '';
                        $.ajax({
                            type: "GET",
                            url: "doajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindInvoiceByInsertionOrderIdOfPR",
                                "lineItemNumber": IO_Id
                            },
                            complete: function(responseJson) {
                                var obj = $.parseJSON(responseJson.responseText);
                                console.log("obj: " + obj);
                                console.log("JSON.stringify(obj)" + JSON.stringify(obj));
                                console.log("JSON.parse(JSON.stringify(obj))" + JSON.parse(JSON.stringify(obj)));
                                var InvoiceObj = JSON.parse(JSON.stringify(obj));
                                console.log("TaxCode: " + InvoiceObj.taxCode);
                                taxCode = InvoiceObj.taxCode;
                            }
                        });
                        console.log("taxCode: " + taxCode);

                        var pr_quantity = removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val());
                        var pr_perUnit = removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val());
                        var pr_netPrice = removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val());
                        var pr_currency = $(this).find("td").eq(13).children(".currencyClass").val();
                        var pr_linkId = $(this).find("td").eq(0).children(".linkId_Class").val();

                        var prTaxAmount = 0;
                        if (isPreCheck !== "Yes")
                        {
                            totalPoAmount = totalPoAmount + totalPoAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_linkId, vendorCode, "IncludingVendor", pr_perUnit);
                            console.log("index: " + (index + 1) + ", totalPoAmount: " + totalPoAmount);

                            totalPoAmountExcludingVendor = totalPoAmountExcludingVendor + totalPoAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_linkId, vendorCode, "ExcludingVendor", pr_perUnit);
                            console.log("index: " + (index + 1) + ", totalPoAmountExcludingVendor: " + totalPoAmountExcludingVendor);

                            prTaxAmount = prTaxAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_perUnit);
                            console.log("index: " + (index + 1) + ", prTaxAmount: " + prTaxAmount);
                        }

                        var shortText = "";
                        if ($(this).find("td").eq(5).children(".pr-short-text").val() !== "")
                        {
                            shortText = handleSpecialCharacter($(this).find("td").eq(5).children(".pr-short-text").val());
                        }
                        var MaterialLongText = "";
                        if ($(this).find("td").eq(0).children(".prMaterialLongTextHidden").val() !== "")
                        {
                            MaterialLongText = handleSpecialCharacter($(this).find("td").eq(0).children(".prMaterialLongTextHidden").val());
                        }

                        // Added by nikhil on 24-01-2020
                        var PODistribution = $(this).find("td").eq(0).children(".PODistribution").val();
                        var POPartialInvoiceIndicator = $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val();
                        console.log("PODistribution1: " + PODistribution);
                        console.log("POPartialInvoiceIndicator1: " + POPartialInvoiceIndicator);

//                        if (PODistribution === "Single Account Assignment")
//                        {
//                            PODistribution = "";
                        //                        }

                        if (POPartialInvoiceIndicator === "0")
                        {
                            POPartialInvoiceIndicator = "";
                        }

                        console.log("PODistribution2: " + PODistribution);
                        console.log("POPartialInvoiceIndicator2: " + POPartialInvoiceIndicator);
                        var deleteflag = "";
                        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {                                       //Bittu 09July2020
                            if ($(this).find("td").eq(0).children(".select-pr-to-delete").prop("checked") === true) {
                                deleteflag = true;
                            } else {
                                deleteflag = false;
                            }
                        }
                        var prReturnsItem = $(this).find("td").eq(31).children(".prReturnsItem").prop("checked");

                        var prFreeOfCharge = $(this).find("td").eq(32).children(".prFreeOfCharge").prop("checked");
                        // End
                        POLineItemData += "<POLineItemData>"
                                + "<PRLinkID>" + $(this).find("td").eq(0).children(".linkId_Class").val() + "</PRLinkID>"
                                + "<PRNumber>" + $(this).find("td").eq(0).children(".prNumber_Class").val() + "</PRNumber>"
                                + "<PRItemNumber>" + $(this).find("td").eq(24).text().toString().trim() + "</PRItemNumber>"
                                + "<ItemNumber>" + $(this).find("td").eq(0).children(".PRItemNumber_Class").val() + "</ItemNumber>"
                                + "<AccountAssignment>" + $(this).find("td").eq(2).children(".accountAssignmentClass").val() + "</AccountAssignment>"
                                + "<ItemCategory>" + $(this).find("td").eq(3).children(".itemCategoryClass").val() + "</ItemCategory>"
                                + "<Criticality>" + $(this).find("td").eq(9).children(".criticalityClass").val() + "</Criticality>"
                                + "<ShortText>" + shortText + "</ShortText>"
                                + "<Quantity>" + removeCommaInNumber($(this).find("td").eq(6).children(".pr-quantity").val()) + "</Quantity>"
                                + "<PriceUnit>" + removeCommaInNumber($(this).find("td").eq(14).children(".priceUnitClass").val()) + "</PriceUnit>"
                                + "<ValPrice></ValPrice>"
                                + "<NetPrice>" + removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val()) + "</NetPrice>"
                                + "<Currency>" + $(this).find("td").eq(13).children(".currencyClass").val() + "</Currency>"
                                + "<DeliveryDateCategory>" + $(this).find("td").eq(0).children(".prDeliveryDateCategoryHidden").val() + "</DeliveryDateCategory>"
                                + "<Total></Total>"
                                + "<RequisitionDate>" + RequisitionDate + "</RequisitionDate>"
                                + "<DeliveryDate>" + DeliveryDate + "</DeliveryDate>"
                                + "<MaterialGroup>" + $(this).find("td").eq(15).children(".materialGroupClass").val() + "</MaterialGroup>"
                                + "<PurchasingGroup>" + $(this).find("td").eq(22).children(".purchasingGroupClass").val() + "</PurchasingGroup>"
                                + "<StorageLocation>" + $(this).find("td").eq(17).children(".storageLocationClass").val() + "</StorageLocation>"
                                + "<RequisitionerID>" + $(this).find("td").eq(25).children(".pr-requisitioner-id").val() + "</RequisitionerID>"
                                + "<TrackingNumber>" + $(this).find("td").eq(19).children(".pr-tracking-number").val() + "</TrackingNumber>"
                                + "<QuantityUnit>" + removeCommaInNumber($(this).find("td").eq(12).children(".pr-net-price").val()) + "</QuantityUnit>"
                                + "<QuantityOrderedUnit></QuantityOrderedUnit>"
                                + "<OpenQuantity></OpenQuantity>"
                                + "<RequestDate></RequestDate>"
                                + "<ReleaseDate></ReleaseDate>"
                                + "<PlDelivTime></PlDelivTime>"
                                + "<GRProcTime></GRProcTime>"
                                + "<Closed></Closed>"
                                + "<FixedID></FixedID>"
                                + "<MaterialCode>" + $(this).find("td").eq(4).children(".materialCodeClass").val() + "</MaterialCode>"
                                + "<Description></Description>"
                                + "<Plant>" + $(this).find("td").eq(16).children(".hiddenPlantCode").val() + "</Plant>"
                                + "<Unit>" + $(this).find("td").eq(7).children(".prUom").val() + "</Unit>"
                                + "<ProdStorageLocation></ProdStorageLocation>"
                                + "<SupplyArea></SupplyArea>"
                                + "<RequirementDate></RequirementDate>"
                                + "<ValuationPrice></ValuationPrice>"
                                + "<ValuationCurrency></ValuationCurrency>"
                                + "<ValuationUnit></ValuationUnit>"
                                + "<Promotion></Promotion>"
                                + "<GoodsReceipt></GoodsReceipt>"
                                + "<InvReceipt></InvReceipt>"
                                + "<GRNonVal></GRNonVal>"
                                + "<AgreementLineItem></AgreementLineItem>"
                                + "<FixedVendor></FixedVendor>"
                                + "<InfoRecord>" + $(this).find("td").eq(20).text() + "</InfoRecord>"
                                + "<DesiredVendor></DesiredVendor>"
                                + "<PurchasingOrganization>" + $(this).find("td").eq(21).children(".purchaseOrganizationClass").val() + "</PurchasingOrganization>"
                                + "<POUnit></POUnit>"
                                + "<SupplyingPlant></SupplyingPlant>"
                                + "<IssuingStorageLocation></IssuingStorageLocation>"
                                + "<OverallLimit></OverallLimit>"
                                + "<ExpectedValue></ExpectedValue>"
                                + "<NoLimit></NoLimit>"
                                + "<ItemTextLineItem></ItemTextLineItem>"
                                + "<ItemNote></ItemNote>"
                                + "<DeliveryText></DeliveryText>"
                                + "<MaterialPOText></MaterialPOText>"
                                + "<PRNotetoApprover></PRNotetoApprover>"
                                + "<MaterialLongText>" + MaterialLongText + "</MaterialLongText>"
                                + "<RequsitionEmail></RequsitionEmail>"
                                + "<Distribution>" + PODistribution + "</Distribution>"  //Dist.
                                + "<PartialInvoiceIndicator>" + POPartialInvoiceIndicator + "</PartialInvoiceIndicator>"  //Partial Inv. Ind.
                                + "<BP_assign_date></BP_assign_date>"
                                + "<BP_quantity_remaining></BP_quantity_remaining>"
                                + "<BP_rfq_status></BP_rfq_status>"
                                + "<BP_status></BP_status>"
                                + "<BP_buyerdetails_id></BP_buyerdetails_id>"
                                + "<BP_ItemCode></BP_ItemCode>"
                                + "<BP_PRCreator>" + $(this).find("td").eq(26).text() + "</BP_PRCreator>"
                                + "<BP_UOMStore></BP_UOMStore>"
                                + "<BP_CompanyCode></BP_CompanyCode>"
                                + "<RejectStatus></RejectStatus>"
                                + "<QueryStatus></QueryStatus>"
                                + "<ReferenceDate></ReferenceDate>"
                                + "<SourceList></SourceList>"
                                + "<CountryofOrigin></CountryofOrigin>"
                                + "<HeaderNote></HeaderNote>"
                                + "<OldMaterialCode></OldMaterialCode>"
                                + "<NoteToBuyer></NoteToBuyer>"
                                + "<UOMStore></UOMStore>"
                                + "<PO_Requestor></PO_Requestor>"
                                + "<PO_RequestorEmail></PO_RequestorEmail>"
                                + "<PR_TrackingNumber></PR_TrackingNumber>"
                                + "<QuotationNumber></QuotationNumber>"
                                + "<HigherLevelItem></HigherLevelItem>"
                                + "<SubitemCategory></SubitemCategory>"
                                + "<Batch></Batch>"
                                + "<LinkId></LinkId>"
                                + "<PackageNo>" + (prPackageNo !== '' && prPackageNo !== undefined ? Number(prPackageNo) : PackageNo) + "</PackageNo>"
                                + "<TaxCode>" + taxCode + "</TaxCode>"
                                + "<taxamount>" + (prTaxAmount !== undefined ? Number(prTaxAmount).toFixed(2) : "") + "</taxamount>"
                                + "<PR_PID>" + $(this).find("td").eq(0).children(".procInstId_Class").val() + "</PR_PID>"
                                + "<DeleteFlag>" + deleteflag + "</DeleteFlag>"                                             //Bittu 09July2020
                                + "<LineType>" + $(this).find("td").eq(0).children(".lineType").val() + "</LineType>"
                                + "<RFQ_No>" + prRfqNumber + "</RFQ_No>"
                                + "<RFQ_ItemNo>" + (prRfqLineItemNumber === undefined ? "" : prRfqLineItemNumber) + "</RFQ_ItemNo>"
                                + "<immaterial>" + $(this).find("td").eq(30).children(".prImMaterial").val() + "</immaterial>"
                                + "<returnsitem>" + prReturnsItem + "</returnsitem>"
                                + "<freeofcharge>" + prFreeOfCharge + "</freeofcharge>"
                                + "<OPU>" + $(this).find("td").eq(8).children(".prOrderPriceUnit").val() + "</OPU>"
                                + "</POLineItemData>";

                        POServiceRefData += "<POServiceRefData>"
                                + "<PackageNo>" + (prPackageNo !== '' && prPackageNo !== undefined ? Number(prPackageNo) : PackageNo) + "</PackageNo>"
                                + "<SubPackageNo>" + (prPackageNo !== '' && prPackageNo !== undefined ? Number(prPackageNo) + 1 : PackageNo + 1) + "</SubPackageNo>"
                                + "<LineNo>" + (serviceRefLineNo !== '' && serviceRefLineNo !== undefined ? serviceRefLineNo : LineNo) + "</LineNo>"
                                + "</POServiceRefData>";


                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindPOLimitDataByInsertionOrderIdOfPR",
                                "lineItemNumber": IO_Id
                            },
                            complete: function(responseJson) {
                                var jsonLimitsArr = $.parseJSON(responseJson.responseText);
                                jsonLimitsArr = JSON.parse(JSON.stringify(jsonLimitsArr));
                                console.log("jsonLimitsArr: " + jsonLimitsArr);
                                var OverallLimit = "";
                                var ExpectedValue = "";
                                for (var i = 0; i < jsonLimitsArr.length; i++)
                                {
                                    console.log("InvoiceItemNumber: " + jsonLimitsArr[i].prItemNumber);
                                    OverallLimit = jsonLimitsArr[i].overAllLimits === undefined ? "" : jsonLimitsArr[i].overAllLimits;
                                    if (OverallLimit === "")
                                    {
                                        OverallLimit = "";
                                    }
                                    ExpectedValue = jsonLimitsArr[i].expectedValue === undefined ? "" : jsonLimitsArr[i].expectedValue;
                                    if (ExpectedValue === "")
                                    {
                                        ExpectedValue = "";
                                    }
                                    if ((OverallLimit !== "" && OverallLimit !== undefined)
                                            || (ExpectedValue !== "" && ExpectedValue !== undefined)
                                            || (jsonLimitsArr[i].noLimis !== "" && jsonLimitsArr[i].noLimis !== undefined && jsonLimitsArr[i].noLimis !== "false"))
                                    {
                                        POLimitsData += "<POLimitsData>"
                                                + "<ItemNumber>" + (jsonLimitsArr[i].prItemNumber === undefined ? "" : jsonLimitsArr[i].prItemNumber) + "</ItemNumber>"
                                                + "<PackageNo>" + (prPackageNo !== '' && prPackageNo !== undefined ? Number(prPackageNo) : PackageNo) + "</PackageNo>"
                                                + "<OverallLimit>" + OverallLimit + "</OverallLimit>"
                                                + "<ExpectedValue>" + ExpectedValue + "</ExpectedValue>"
                                                + "<NoLimit>" + (jsonLimitsArr[i].noLimis === undefined ? "" : jsonLimitsArr[i].noLimis) + "</NoLimit>"
                                                + "<LinkId>" + (jsonLimitsArr[i].linkId === undefined ? "" : jsonLimitsArr[i].linkId) + "</LinkId>"
                                                + "<ActualValue>" + (jsonLimitsArr[i].actualValue === undefined ? "" : jsonLimitsArr[i].actualValue) + "</ActualValue>"
                                                + "</POLimitsData>";
                                    }
                                }
                            }
                        });

                        $.ajax({
                            type: "GET",
                            url: "ajaxcontroller.do",
                            async: false,
                            data: {
                                "reqFrom": "findServicesByInsertionOrderIdOfPOLineItem",
                                "lineItemNumber": IO_Id
                            },
                            complete: function(responseJson) {
                                var obj = $.parseJSON(responseJson.responseText);
                                console.log("Service Len: " + obj.length);

                                var linkId = "";
                                var serviceLinkId = "";
                                var lineNo = "";
                                var isServOldOrNew = "";

                                for (var i = 0; i < obj.length; i++) {
                                    console.log("obj[i].lineNoServ: " + obj[i].LineNoServ);
                                    console.log("ServiceAccAssDist :" + obj[i].ServiceAccAssDist);

                                    ServiceAccAssDist = obj[i].ServiceAccAssDist === undefined ? '' : obj[i].ServiceAccAssDist;
                                    console.log("ServiceAccAssDist1 :" + ServiceAccAssDist);

                                    if (ServiceAccAssDist === "" || ServiceAccAssDist === "0")
                                        ServiceAccAssDist = "";
                                    else if (ServiceAccAssDist === "1" || Number(ServiceAccAssDist) === 1)
                                        ServiceAccAssDist = "Distrib. On Quantity Basis";
                                    else if (ServiceAccAssDist === "2" || Number(ServiceAccAssDist) === 2)
                                        ServiceAccAssDist = "Distrib. By Percentage";

                                    console.log("ServiceAccAssDist2 :" + ServiceAccAssDist);

                                    linkId = obj[i].LinkId === undefined ? "" : obj[i].LinkId;
                                    serviceLinkId = obj[i].ServiceLinkId === undefined ? "" : obj[i].ServiceLinkId;
                                    isServOldOrNew = obj[i].IsServOldOrNew === undefined ? "" : obj[i].IsServOldOrNew;
                                    console.log("isServOldOrNew: " + isServOldOrNew);

                                    if (isServOldOrNew === "Yes" && maxServiceLineNo === "")
                                    {
                                        maxServiceLineNo = findMaxServiceLineNoOfLastExistingPOItem();
                                        console.log("maxServiceLineNo in newgen.js: " + maxServiceLineNo);
                                        if (maxServiceLineNo !== undefined && maxServiceLineNo !== "" && maxServiceLineNo.toString().trim() !== "")
                                        {
                                            LineNo = Number(maxServiceLineNo) + 1;
                                        }
                                    }
                                    else
                                    {
                                        LineNo = LineNo + 1;
                                    }

                                    console.log("linkId: " + linkId);
                                    console.log("serviceLinkId: " + serviceLinkId);
                                    console.log("LineNo: " + LineNo);

                                    POServiceData += "<POServiceData>"
                                            + "<Distribution>" + ServiceAccAssDist + "</Distribution>"  // New Tag Added on 04:41 PM 23-01-2020
                                            + "<LineItemNumber>" + obj[i].ServiceLineItemNumber + "</LineItemNumber>"
                                            + "<ServiceNumber>" + obj[i].ServiceNumber + "</ServiceNumber>"
                                            + "<ShortText>" + handleSpecialCharacter(obj[i].ShortText ===undefined ? "" : obj[i].ShortText) + "</ShortText>"
                                            + "<Quantity>" + obj[i].Quantity + "</Quantity>"
                                            + "<Unit>" + obj[i].Unit + "</Unit>"
                                            + "<GrossPrice>" + obj[i].GrossPrice + "</GrossPrice>"
                                            + "<Currency>" + obj[i].Currency + "</Currency>"
                                            + "<NetPrice>" + obj[i].NetPrice + "</NetPrice>"
                                            + "<Edition>" + obj[i].Edition + "</Edition>"
                                            + "<LineItemLongText>" + handleSpecialCharacter(obj[i].LongItemLongText === undefined ? "" : obj[i].LongItemLongText) + "</LineItemLongText>"
                                            + "<OverfTolerance>" + obj[i].OverfTolarence + "</OverfTolerance>"
                                            + "<CostCentre></CostCentre>"
                                            + "<GLCode></GLCode>"
                                            + "<CommitmentItem></CommitmentItem>"
                                            + "<Fund></Fund>"
                                            + "<FundCenter></FundCenter>"
                                            + "<FunctionalArea></FunctionalArea>"
                                            + "<ServiceLongText>" + handleSpecialCharacter(obj[i].ServiceText === undefined ? "" : obj[i].ServiceText) + "</ServiceLongText>"
                                            + "<LinkId>" + linkId + "</LinkId>"
                                            + "<ServiceLinkID>" + serviceLinkId + "</ServiceLinkID>"
                                            + "<PackageNo>" + (prPackageNo !== '' && prPackageNo !== undefined ? Number(prPackageNo) + 1 : PackageNo + 1) + "</PackageNo>"
                                            + "<LineNo>" + (obj[i].LineNoServ !== undefined && obj[i].LineNoServ !== '' ? obj[i].LineNoServ : LineNo) + "</LineNo>"
                                            + "<DeleteFlag>" + (obj[i].DeleteFlag === 'true' ? 'true' : 'false') + "</DeleteFlag>"
                                            + "<actualquantity>" + (obj[i].ActualQuantity === undefined ? "" : obj[i].ActualQuantity) + "</actualquantity>"
                                            + "</POServiceData>";

                                    $.ajax({
                                        type: "GET",
                                        url: "ajaxcontroller.do",
                                        async: false,
                                        data: {
                                            "reqFrom": "findServicesAccAssByInsertionOrderIdAndServiceLineItemNoOfPOLineItem",
                                            "lineItemNumber": IO_Id,
                                            "serviceLineItemNumber": obj[i].ServiceLineItemNumber
                                        },
                                        complete: function(responseJson) {
                                            var obj = $.parseJSON(responseJson.responseText);
                                            console.log("Service Len: " + obj.length);
                                            var SerialNo = "";

                                            for (var i = 0; i < obj.length; i++) {
                                                console.log("obj[i].lineNoSerAcc: " + obj[i].LineNoSerAcc);
                                                console.log("obj[i].Distribution val:" + obj[i].Distribution);
                                                console.log("Service AccAss SerialNumber:" + obj[i].SerialNumber);

                                                AccAssValDistribution = obj[i].Distribution === undefined ? '' : obj[i].Distribution;
                                                console.log("AccAssValDistribution 1: " + AccAssValDistribution);

                                                if (AccAssValDistribution === "")
                                                    AccAssValDistribution = "Single Account Assignment";
                                                else if (AccAssValDistribution === "1" || Number(AccAssValDistribution) === 1)
                                                    AccAssValDistribution = "Distrib. On Quantity Basis";
                                                else if (AccAssValDistribution === "2" || Number(AccAssValDistribution) === 2)
                                                    AccAssValDistribution = "Distrib. By Percentage";

                                                console.log("AccAssValDistribution 2: " + AccAssValDistribution);

                                                SerialNo = obj[i].SerialNumber === undefined ? "" : obj[i].SerialNumber;
                                                console.log("Service Acc Ass SerialNo 1: " + SerialNo);

                                                if (SerialNo !== "" && SerialNo.toString().length === 1)
                                                {
                                                    SerialNo = "0" + SerialNo;
                                                }
                                                console.log("Service Acc Ass SerialNo 2: " + SerialNo);

                                                POAccntAssignvalData += "<POAccntAssignvalData>"
                                                        + "<Distribution>" + AccAssValDistribution + "</Distribution>"
                                                        + "<Quantity>" + obj[i].Quantity + "</Quantity>"
                                                        + "<Percentage>" + obj[i].Percentage + "</Percentage>"
                                                        + "<ActivityNumber></ActivityNumber>"
                                                        + "<LinkNumber></LinkNumber>"
                                                        + "<LinkID>" + serviceLinkId + "</LinkID>"
                                                        + "<NETVALUE>" + obj[i].NetValue + "</NETVALUE>"
                                                        + "<CostCenter>" + obj[i].CostCenter + "</CostCenter>"
                                                        + "<PRLinkID>" + linkId + "</PRLinkID>"
                                                        + "<Acc_Order>" + obj[i].Acc_Order + "</Acc_Order>"
                                                        + "<Acc_Asset>" + obj[i].Acc_Asset + "</Acc_Asset>"
                                                        + "<Acc_WBSElement>" + obj[i].Acc_WBSElement + "</Acc_WBSElement>"
                                                        + "<SalesOrder>" + obj[i].SalesOrder + "</SalesOrder>"
                                                        + "<Network></Network>"
                                                        + "<Activity></Activity>"
                                                        + "<CoArea>" + obj[i].CoArea + "</CoArea>"
                                                        + "<GLAccount>" + obj[i].GLAccount + "</GLAccount>"
                                                        + "<UnloadingPoint>" + obj[i].UnloadingPoint + "</UnloadingPoint>"
                                                        + "<Recipient>" + obj[i].Recipient + "</Recipient>"
                                                        + "<CommitmentItem>" + obj[i].CommitmentItem + "</CommitmentItem>"
                                                        + "<Fund>" + obj[i].Fund + "</Fund>"
                                                        + "<FundsCentre>" + obj[i].FundsCentre + "</FundsCentre>"
                                                        + "<FunctionalArea>" + obj[i].FunctionalArea + "</FunctionalArea>"
                                                        + "<ItemNumber>" + obj[i].ItemNumber + "</ItemNumber>"
                                                        + "<DeliverySchedule>" + obj[i].DeliverySchedule + "</DeliverySchedule>"
                                                        + "<PackageNo>" + (prPackageNo !== '' && prPackageNo !== undefined ? Number(prPackageNo) + 1 : PackageNo + 1) + "</PackageNo>"
                                                        + "<LineNo>" + (obj[i].LineNoSerAcc !== undefined && obj[i].LineNoSerAcc !== '' ? obj[i].LineNoSerAcc : LineNo) + "</LineNo>"
                                                        + "<SerialNo>" + SerialNo + "</SerialNo>"
                                                        + "<SerNoLine>" + (i + 1) + "</SerNoLine>"  // New Tag Added on 01:06 PM 24-01-2020
                                                        + "<DeleteFlag>" + (obj[i].IsDeleteFlag === 'true' ? 'true' : 'false') + "</DeleteFlag>"
                                                        + "</POAccntAssignvalData>";
                                            }
                                        }
                                    });
                                }
                            }
                        });
                        PackageNo = PackageNo + 2;
                        LineNo = LineNo + 1;
                    });

                    console.log("totalPoAmount 1: " + totalPoAmount);
                    console.log("totalPoAmountExcludingVendor 1: " + totalPoAmountExcludingVendor);

                    $("#totalPoAmt").val(Number(totalPoAmount).toFixed(2));
                    $("#totalPoAmtExcludingVendor").val(Number(totalPoAmountExcludingVendor).toFixed(2));

                    var vendorFinalizationTablePrDataArrayAsJsonString = JSON.stringify(vendorFinalizationPrTableDataArray);
                    console.log("vendorFinalizationTablePrDataArrayAsJsonString: " + vendorFinalizationTablePrDataArrayAsJsonString);

                    console.log("prType: " + prType);

                    xmlString += PODeliveryInvoiceData;
                    xmlString += POVendorAddressData;
                    xmlString += POCommunicationData;
                    xmlString += POCustomerData;
                    xmlString += POHeaderTextData;
                    xmlString += POStatusData;
                    xmlString += POPartnersData;
                    xmlString += POLineItemData;
                    xmlString += POAccntAssignData;
                    xmlString += POInvoiceData;
                    xmlString += POLineItemCustomerData;

                    if (PrType === "Service")
                    {
                        xmlString += POServiceRefData;
                        xmlString += POServiceData;
                        xmlString += POAccntAssignvalData;
                        xmlString += POLimitsData;
                        xmlString += POLineItemProfitabilitySegmentData;
                    }

                    xmlString += PODeliveryData;
                    xmlString += PODeliveryAddressData;
                    xmlString += POTextsData;
                    xmlString += POConfirmationsData;
                    xmlString += POCondCtrlData;
                    xmlString += POQuantityWeightsData;
                    xmlString += POLineItemCustomerData;
                    xmlString += PODeliveryScheduleData;
                    xmlString += POComponentData;
                    xmlString += POConditionsData;
                    xmlString += POLineItemConditionsData;
                    xmlString += POMaterialData;
                    xmlString += "</POCreation>";

                    console.log("InputXml: " + xmlString);

                    console.log("totalPoAmount 2: " + $("#totalPoAmt").val());
                    console.log("totalPoAmountExcludingVendor 2: " + $("#totalPoAmtExcludingVendor").val());

                    var x2js = new X2JS();

                    console.log("x2js.xml_str2json(xmlString): " + x2js.xml_str2json(xmlString));

                    var sapJsonObject = x2js.xml_str2json(xmlString);
                    console.log("sapJsonObject: " + sapJsonObject);
                    sapJsonObject.POCreation.GeneralData.TotalPOAmount = $("#totalPoAmt").val() + "";
                    sapJsonObject.POCreation.GeneralData.TotalPOAmtPOVendor = $("#totalPoAmtExcludingVendor").val() + "";

                    var sapJsonPoDataAsString = JSON.stringify(sapJsonObject);
                    console.log("sapJsonPoDataAsString before encodeURIComponent: " + sapJsonPoDataAsString);                    
                    sapJsonPoDataAsString = encodeURIComponent(sapJsonPoDataAsString);
                    console.log("sapJsonPoDataAsString after encodeURIComponent 1: " + sapJsonPoDataAsString);
                    sapJsonPoDataAsString = sapJsonPoDataAsString.replace(/'/g, '&apos;');
                    console.log("sapJsonPoDataAsString after encodeURIComponent 2: " + sapJsonPoDataAsString);
                    
                    var WebServiceCallIp = $("#WebServiceCallIp").val();
                    console.log("WebServiceCallIp: " + WebServiceCallIp);

                    var xmlStringArr = xmlString.split("<PurchaseOrderNumber>");
                    var URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + "" + xmlStringArr[1];

                    $("#inputXml").val(URLParam);

                    var sapUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePOSAP";
                    console.log("sapUrl :" + sapUrl);

                    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePONG";
                    console.log("Newgen serviceUrl: " + serviceUrl);

                    console.log("InsertionOrderIdArray len: " + InsertionOrderIdArray.length);
                    console.log("InsertionOrderIdArray: " + InsertionOrderIdArray);
                    console.log("PoLineQuantityArray len: " + PoLineQuantityArray.length);
                    console.log("PoLineQuantityArray: " + PoLineQuantityArray);

                    var local_dev_uat = $("#local_dev_uat").val();
                    console.log("local_dev_uat: " + local_dev_uat);

                    if (local_dev_uat === "dev" || local_dev_uat === "uat")
                    {
                        $("#overlay").css("display", "block");
                        console.log("Calling SAP Web Service...");
                        if (poNumber === "")
                        {
                            if($("#errorTransactionStatus").val() !== "Yes") 
                            {
                                console.log("errorTransactionStatus 1: " + $("#errorTransactionStatus").val());
                                $.ajax({
                                    type: "POST",
                                    url: sapUrl,
                                    contentType: "application/x-www-form-urlencoded",
                                    dataType: "xml",
                                    data: sapJsonPoDataAsString,
                                    async: true,
                                    beforeSend: function() {
                                        $("#overlay").css("display", "block");
                                    },
                                    error: function() {
                                        $("#overlay").css("display", "none");
                                    },
                                    success: function(data, textStatus, jqXHR) {
                                        console.log("SAP Response: " + data);
                                        $("#overlay").css("display", "none");

                                        var PoSAPResponseJsonObject = getSAPResponse(data);

                                        var PoNumber = PoSAPResponseJsonObject["PoNumber"];
                                        var SAPMessage = PoSAPResponseJsonObject["Message"];

                                        console.log("PoNumber: " + PoNumber);
                                        console.log("SAPMessage: " + SAPMessage);

                                        if (PoNumber !== "" && PoNumber !== undefined && PoNumber.toString().trim() !== "")
                                        {
                                            $("#overlay").css("display", "block");

                                            var message = "";
                                            var GeneratedPoNumber = "";

                                            console.log("PrType: " + PrType);
                                            console.log("Generating PO Number with running sequence...");

                                            $.ajax({
                                                type: "GET",
                                                url: "standalonepoajaxrequest.do",
                                                async: false,
                                                data: {
                                                    "reqFrom": "generatePoRunningSequence",
                                                    "prType": PrType
                                                },
                                                complete: function(responseJson) {
                                                    var obj = $.parseJSON(responseJson.responseText);
                                                    console.log("GeneratedPoNumber: " + obj.GeneratedPoNumber);
                                                    GeneratedPoNumber = obj.GeneratedPoNumber;
                                                    $("#PO_SequenceNO").val(GeneratedPoNumber);
                                                    message = message + "Running Sequence: <b>" + obj.GeneratedPoNumber + "</b>";
                                                }
                                            });

                                            URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + PoNumber + xmlStringArr[1];
                                            console.log("URLParam: " + URLParam);

                                            var ngJsonObject = x2js.xml_str2json(URLParam);
                                            console.log("ngJsonObject: " + ngJsonObject);
                                            ngJsonObject.POCreation.GeneralData.PO_SequenceNO = GeneratedPoNumber;
                                            ngJsonObject.POCreation.GeneralData.TotalPOAmount = $("#totalPoAmt").val();
                                            ngJsonObject.POCreation.GeneralData.TotalPOAmtPOVendor = $("#totalPoAmtExcludingVendor").val();

                                            var ngJsonPoDataAsString = JSON.stringify(ngJsonObject);
                                            console.log("ngJsonPoDataAsString before encodeURIComponent: " + ngJsonPoDataAsString);                                        
                                            ngJsonPoDataAsString = encodeURIComponent(ngJsonPoDataAsString);
                                            console.log("ngJsonPoDataAsString after encodeURIComponent 1: " + ngJsonPoDataAsString);
                                            ngJsonPoDataAsString = ngJsonPoDataAsString.replace(/'/g, '&apos;');
                                            console.log("ngJsonPoDataAsString after encodeURIComponent 2: " + ngJsonPoDataAsString);

                                            serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePONG";
                                            console.log("Newgen WI WS Call... " + serviceUrl);

                                            $.ajax({
                                                type: "POST",
                                                url: serviceUrl,
                                                contentType: "application/x-www-form-urlencoded",
                                                dataType: "xml",
                                                data: ngJsonPoDataAsString,
                                                async: true,
                                                beforeSend: function() {
                                                    $("#overlay").css("display", "block");
                                                },
                                                error: function() {
                                                    $("#overlay").css("display", "none");
                                                },
                                                success: function(data, textStatus, jqXHR) {
                                                    console.log("Newgen Response: " + data);
                                                    $("#overlay").css("display", "none");

                                                    var PoResponseJsonObject = getPOResponse(data);

                                                    var PID = PoResponseJsonObject["PID"];
                                                    var WIMessage = PoResponseJsonObject["Message"];
                                                    console.log("PID: " + PID);
                                                    console.log("WIMessage: " + WIMessage);

                                                    if(PID !== "" && PID !== undefined) {
                                                        console.log("PID is not blank!");
                                                        var PoFrom = $("#PoFrom").val();
                                                        if (PoFrom === "byrfq")
                                                        {
                                                            var VendorFinalizationTableDataArrayAsJsonString = $("#VendorFinalizationTableDataArrayAsJsonString").val();
                                                            // Update Rfq details post PO creation
                                                            updateRfqPoDetails(VendorFinalizationTableDataArrayAsJsonString, PoNumber, PoLineQuantityArray.toString());
                                                            // Upload Rfq evaluation reports into DMS post po Creation
                                                            var rfqIds = $("#rfqIds").val();
                                                            uploadRfqQuotationAndRfqEvaluationReportIntoDMS(rfqIds, PID);
                                                        }
                                                        else if ($("#PoFrom").val() === "shortcutPo" || $("#reqFrom").val() === "shortcutPo")
                                                        {
                                                            updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                                        }
                                                        else
                                                        {
                                                            updatePrLineRemainingQtyAfterPoCreation(InsertionOrderIdArray.toString(), PoLineQuantityArray.toString());
                                                        }

                                                        message = message + "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;

                                                        Lobibox.alert("info", {
                                                            msg: message,
                                                            callback: function(lobibox, type) {
                                                                location.href = "managepo.do";
                                                            }
                                                        });
                                                    } else {
                                                        console.log("%cPID is blank!", "color: red");
                                                        $("#errorTransactionStatus").val("Yes");
                                                        $("#PoNumber").val(PoNumber);
                                                        $("#poNumber").val(PoNumber);

                                                        Lobibox.notify("warning", {
                                                            rounded: true,
                                                            delayIndicator: false,
                                                            msg: "Work item not generated, please wait..."
                                                        });
                                                        $("#overlay").css("display", "block");
                                                        setTimeout(
                                                            function()
                                                            {
                                                                // Click Save&Close button to save data locally.
                                                                $("#saveAndCloseBtn").trigger("click");
                                                            }
                                                        , 100);   
                                                    }
                                                }
                                            });
                                        }
                                        else
                                        {
                                            $("#overlay").css("display", "none");
                                            if(isPreCheck !== "Yes")
                                            {
                                                var message = "PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage;
                                                Lobibox.alert("info", {
                                                    msg: message
                                                });
                                            }
                                            else
                                            {
                                                extractSAPResponseForPreCheck(SAPMessage);
                                            }
                                        }
                                    }
                                });
                            } 
                            else if($("#errorTransactionStatus").val() === "Yes") 
                            {
                                console.log("errorTransactionStatus 2: " + $("#errorTransactionStatus").val());
                                $("#overlay").css("display", "block");
                                var message = "";                                
                                console.log("PrType: " + PrType);

                                var ngJsonObject = x2js.xml_str2json(URLParam);
                                console.log("ngJsonObject: " + ngJsonObject);
                                ngJsonObject.POCreation.GeneralData.PurchaseOrderNumber = $("#PoNumber").val();
                                ngJsonObject.POCreation.GeneralData.PO_SequenceNO = $("#PO_SequenceNO").val();
                                ngJsonObject.POCreation.GeneralData.TotalPOAmount = $("#totalPoAmt").val();
                                ngJsonObject.POCreation.GeneralData.TotalPOAmtPOVendor = $("#totalPoAmtExcludingVendor").val();

                                var ngJsonPoDataAsString = JSON.stringify(ngJsonObject);
                                console.log("ngJsonPoDataAsString before encodeURIComponent: " + ngJsonPoDataAsString);                                        
                                ngJsonPoDataAsString = encodeURIComponent(ngJsonPoDataAsString);
                                console.log("ngJsonPoDataAsString after encodeURIComponent 1: " + ngJsonPoDataAsString);
                                ngJsonPoDataAsString = ngJsonPoDataAsString.replace(/'/g, '&apos;');
                                console.log("ngJsonPoDataAsString after encodeURIComponent 2: " + ngJsonPoDataAsString);

                                serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePONG";
                                console.log("Newgen WI WS Call... " + serviceUrl);
                                
                                $.ajax({
                                    type: "POST",
                                    url: serviceUrl,
                                    contentType: "application/x-www-form-urlencoded",
                                    dataType: "xml",
                                    data: ngJsonPoDataAsString,
                                    async: true,
                                    beforeSend: function() {
                                        $("#overlay").css("display", "block");
                                    },
                                    error: function() {
                                        $("#overlay").css("display", "none");
                                    },
                                    success: function(data, textStatus, jqXHR) {
                                        console.log("Newgen Response: " + data);
                                        $("#overlay").css("display", "none");

                                        var PoResponseJsonObject = getPOResponse(data);

                                        var PID = PoResponseJsonObject["PID"];
                                        var WIMessage = PoResponseJsonObject["Message"];
                                        console.log("PID: " + PID);
                                        console.log("WIMessage: " + WIMessage);

                                        if(PID !== "" && PID !== undefined) {
                                            console.log("PID is not blank!");
                                            var PoFrom = $("#PoFrom").val();
                                            if (PoFrom === "byrfq")
                                            {
                                                var VendorFinalizationTableDataArrayAsJsonString = $("#VendorFinalizationTableDataArrayAsJsonString").val();
                                                // Update Rfq details post PO creation
                                                updateRfqPoDetails(VendorFinalizationTableDataArrayAsJsonString, PoNumber, PoLineQuantityArray.toString());
                                                // Upload Rfq evaluation reports into DMS post po Creation
                                                var rfqIds = $("#rfqIds").val();
                                                uploadRfqQuotationAndRfqEvaluationReportIntoDMS(rfqIds, PID);
                                            }
                                            else if ($("#PoFrom").val() === "shortcutPo" || $("#reqFrom").val() === "shortcutPo")
                                            {
                                                updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                            }
                                            else
                                            {
                                                updatePrLineRemainingQtyAfterPoCreation(InsertionOrderIdArray.toString(), PoLineQuantityArray.toString());
                                            }

                                            message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";

                                            Lobibox.alert("info", {
                                                msg: message,
                                                callback: function(lobibox, type) {
                                                    location.href = "managepo.do";
                                                }
                                            });
                                        } else {
                                            message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";

                                            Lobibox.alert("info", {
                                                msg: message,
                                                callback: function(lobibox, type) {
                                                    location.href = "errorTransactions.do";
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                        else
                        {
                            if ($("#PoFrom").val() !== "cancelPo")
                            {
                                console.log("Calling Amend / Edit Web Service...");
                                if($("#errorTransactionStatus").val() !== "Yes") 
                                {
                                    $.ajax({
                                        type: "POST",
                                        url: sapUrl,
                                        contentType: "application/x-www-form-urlencoded",
                                        dataType: "xml",
                                        data: sapJsonPoDataAsString,
                                        async: true,
                                        beforeSend: function() {
                                            $("#overlay").css("display", "block");
                                        },
                                        error: function() {
                                            $("#overlay").css("display", "none");
                                        },
                                        success: function(data, textStatus, jqXHR) {
                                            console.log("SAP Response: " + data);
                                            $("#overlay").css("display", "none");

                                            var PoSAPResponseJsonObject = getSAPResponse(data);

                                            var PoNumber = PoSAPResponseJsonObject["PoNumber"];
                                            var SAPMessage = PoSAPResponseJsonObject["Message"];

                                            console.log("PoNumber: " + PoNumber);
                                            console.log("SAPMessage: " + SAPMessage);

                                            if (PoNumber !== "" && PoNumber !== undefined && PoNumber.toString().trim() !== "")
                                            {
                                                $("#overlay").css("display", "block");
                                                var message = "";
                                                serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePONG";
                                                console.log("Newgen WI WS Call... " + serviceUrl);

                                                $.ajax({
                                                    type: "POST",
                                                    url: serviceUrl,
                                                    contentType: "application/x-www-form-urlencoded",
                                                    dataType: "xml",
                                                    data: sapJsonPoDataAsString,
                                                    async: true,
                                                    beforeSend: function() {
                                                        $("#overlay").css("display", "block");
                                                    },
                                                    error: function() {
                                                        $("#overlay").css("display", "none");
                                                    },
                                                    success: function(data, textStatus, jqXHR) {
                                                        console.log("Newgen Response: " + data);

                                                        var PoResponseJsonObject = getPOResponse(data);                                                   
                                                        var MainCode = PoResponseJsonObject["MainCode"];
                                                        var PID = PoResponseJsonObject["PID"];
                                                        var WIMessage = PoResponseJsonObject["Message"];
                                                        console.log("MainCode: " + MainCode);
                                                        console.log("PID: " + PID);
                                                        console.log("WIMessage: " + WIMessage);
                                                        console.log("PoFrom in edit/amend: " + $("#PoFrom").val());

                                                        if($("#PoFrom").val() === "editpo") 
                                                        {
                                                            if(MainCode !== "" && Number(MainCode) === 0) 
                                                            {
                                                                var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
                                                                console.log("newPrLineInsertionOrderId: " + newPrLineInsertionOrderId);
                                                                updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                                                $("#overlay").css("display", "none");
                                                                message = message + "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;
                                                                Lobibox.alert("info", {
                                                                    msg: message,
                                                                    callback: function(lobibox, type) {
                                                                        location.href = "managepo.do";
                                                                    }
                                                                });
                                                            }
                                                            else
                                                            {
                                                                console.log("%cMainCode is blank!", "color: red");
                                                                $("#errorTransactionStatus").val("Yes");
                                                                $("#PoNumber").val(PoNumber);
                                                                $("#poNumber").val(PoNumber);
                                                                Lobibox.notify("warning", {
                                                                    rounded: true,
                                                                    delayIndicator: false,
                                                                    msg: "Work item not generated, please wait..."
                                                                });
                                                                $("#overlay").css("display", "block");
                                                                setTimeout(
                                                                    function()
                                                                    {
                                                                        // Click Save&Close button to save data locally.
                                                                        $("#saveAndCloseBtn").trigger("click");
                                                                    }
                                                                , 100);   
                                                            }
                                                        }
                                                        if($("#PoFrom").val() === "editApprovedPo") 
                                                        {
                                                            if(PID !== "" && PID !== undefined)
                                                            {
                                                                var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
                                                                console.log("newPrLineInsertionOrderId: " + newPrLineInsertionOrderId);
                                                                updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                                                $("#overlay").css("display", "none");
                                                                message = message + "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;
                                                                Lobibox.alert("info", {
                                                                    msg: message,
                                                                    callback: function(lobibox, type) {
                                                                        location.href = "managepo.do";
                                                                    }
                                                                });
                                                            }
                                                            else
                                                            {
                                                                console.log("%cPID is blank!", "color: red");
                                                                $("#errorTransactionStatus").val("Yes");
                                                                $("#PoNumber").val(PoNumber);
                                                                $("#poNumber").val(PoNumber);
                                                                Lobibox.notify("warning", {
                                                                    rounded: true,
                                                                    delayIndicator: false,
                                                                    msg: "Work item not generated, please wait..."
                                                                });
                                                                $("#overlay").css("display", "block");
                                                                setTimeout(
                                                                    function()
                                                                    {
                                                                        // Click Save&Close button to save data locally.
                                                                        $("#saveAndCloseBtn").trigger("click");
                                                                    }
                                                                , 100);   
                                                            }
                                                        }
                                                        if($("#PoFrom").val() === "shortcutPo") 
                                                        {
                                                            var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
                                                            console.log("newPrLineInsertionOrderId: " + newPrLineInsertionOrderId);
                                                            updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                                            $("#overlay").css("display", "none");
                                                            message = message + "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;
                                                            Lobibox.alert("info", {
                                                                msg: message,
                                                                callback: function(lobibox, type) {
                                                                    location.href = "managepo.do";
                                                                }
                                                            });
                                                        }

                                                    }
                                                });
                                            }
                                            else
                                            {
                                                $("#overlay").css("display", "none");
                                                if(isPreCheck !== "Yes")
                                                {
                                                    var message = "PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage;
                                                    Lobibox.alert("info", {
                                                        msg: message
                                                    });
                                                }
                                                else
                                                {
                                                    extractSAPResponseForPreCheck(SAPMessage);
                                                }
                                            }
                                        }
                                    });
                                }
                                else if($("#errorTransactionStatus").val() === "Yes") 
                                {
                                    $("#overlay").css("display", "block");
                                    var message = "";
                                    serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePONG";
                                    console.log("Newgen WI WS Call... " + serviceUrl);
                                    
                                    $.ajax({
                                        type: "POST",
                                        url: serviceUrl,
                                        contentType: "application/x-www-form-urlencoded",
                                        dataType: "xml",
                                        data: sapJsonPoDataAsString,
                                        async: true,
                                        beforeSend: function() {
                                            $("#overlay").css("display", "block");
                                        },
                                        error: function() {
                                            $("#overlay").css("display", "none");
                                        },
                                        success: function(data, textStatus, jqXHR) {
                                            console.log("Newgen Response: " + data);

                                            var PoResponseJsonObject = getPOResponse(data);                                                   
                                            var MainCode = PoResponseJsonObject["MainCode"];
                                            var PID = PoResponseJsonObject["PID"];
                                            var WIMessage = PoResponseJsonObject["Message"];
                                            console.log("MainCode: " + MainCode);
                                            console.log("PID: " + PID);
                                            console.log("WIMessage: " + WIMessage);
                                            console.log("PoFrom in edit/amend: " + $("#PoFrom").val());

                                            if($("#PoFrom").val() === "editpo") 
                                            {
                                                if(MainCode !== "" && Number(MainCode) === 0) 
                                                {
                                                    var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
                                                    console.log("newPrLineInsertionOrderId: " + newPrLineInsertionOrderId);
                                                    updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                                    $("#overlay").css("display", "none");
                                                    message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";
                                                    Lobibox.alert("info", {
                                                        msg: message,
                                                        callback: function(lobibox, type) {
                                                            location.href = "managepo.do";
                                                        }
                                                    });
                                                }
                                                else
                                                {
                                                    console.log("%cMainCode is blank!", "color: red");
                                                    $("#overlay").css("display", "none");
                                                    message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";
                                                    Lobibox.alert("info", {
                                                        msg: message,
                                                        callback: function(lobibox, type) {
                                                            location.href = "errorTransactions.do";
                                                        }
                                                    });
                                                }
                                            }
                                            if($("#PoFrom").val() === "editApprovedPo") 
                                            {
                                                if(PID !== "" && PID !== undefined)
                                                {
                                                    var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
                                                    console.log("newPrLineInsertionOrderId: " + newPrLineInsertionOrderId);
                                                    updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                                    $("#overlay").css("display", "none");
                                                    message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";
                                                    Lobibox.alert("info", {
                                                        msg: message,
                                                        callback: function(lobibox, type) {
                                                            location.href = "managepo.do";
                                                        }
                                                    });
                                                }
                                                else
                                                {
                                                    console.log("%cPID is blank!", "color: red");
                                                    $("#overlay").css("display", "none");
                                                    message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";
                                                    Lobibox.alert("info", {
                                                        msg: message,
                                                        callback: function(lobibox, type) {
                                                            location.href = "errorTransactions.do";
                                                        }
                                                    });
                                                }
                                            }
                                            if($("#PoFrom").val() === "shortcutPo") 
                                            {
                                                var newPrLineInsertionOrderId = $("#newPrLineInsertionOrderId").val();
                                                console.log("newPrLineInsertionOrderId: " + newPrLineInsertionOrderId);
                                                updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                                $("#overlay").css("display", "none");
                                                message = message + "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;
                                                Lobibox.alert("info", {
                                                    msg: message,
                                                    callback: function(lobibox, type) {
                                                        location.href = "managepo.do";
                                                    }
                                                });
                                            }

                                        }
                                    });
                                }
                            }
                            else
                            {
                                $("#overlay").css("display", "block");
                                var message = "";
                                serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePONG";
                                console.log("Newgen WI WS Call... " + serviceUrl);

                                $.ajax({
                                    type: "POST",
                                    url: serviceUrl,
                                    contentType: "application/x-www-form-urlencoded",
                                    dataType: "xml",
                                    data: sapJsonPoDataAsString,
                                    async: true,
                                    beforeSend: function() {
                                        $("#overlay").css("display", "block");
                                    },
                                    error: function() {
                                        $("#overlay").css("display", "none");
                                    },
                                    success: function(data, textStatus, jqXHR) {
                                        console.log("Newgen Response: " + data);
                                        $("#overlay").css("display", "none");

                                        var PoResponseJsonObject = getPOResponse(data);
                                        
                                        var MainCode = PoResponseJsonObject["MainCode"];
                                        var PID = PoResponseJsonObject["PID"];
                                        var WIMessage = PoResponseJsonObject["Message"];
                                        
                                        console.log("MainCode: " + MainCode);
                                        console.log("PID: " + PID);
                                        console.log("WIMessage: " + WIMessage);
                                        
                                        if(MainCode !== undefined && Number(MainCode) === 0)
                                        {
                                            addPoLineQuantityBackToPrOrRfqLineOnCancelPo();
                                        }
                                        
                                        message = "Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;

                                        Lobibox.alert("info", {
                                            msg: message,
                                            callback: function(lobibox, type) {
                                                location.href = "managepo.do";
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                    else
                    {
//                        updatePrLineRemainingQtyAfterPoCreation(InsertionOrderIdArray.toString(), PoLineQuantityArray.toString());

                        var PoFrom = $("#PoFrom").val();
                        if (PoFrom === "byrfq")
                        {
                            var VendorFinalizationTableDataArrayAsJsonString = $("#VendorFinalizationTableDataArrayAsJsonString").val();

                            // Update Rfq details post PO creation
                            updateRfqPoDetails(VendorFinalizationTableDataArrayAsJsonString, "Temp-PO", PoLineQuantityArray.toString());
                            // Upload Rfq evaluation reports into DMS post po Creation
                            var rfqIds = $("#rfqIds").val();
                            var PID = "";
                            uploadRfqQuotationAndRfqEvaluationReportIntoDMS(rfqIds, PID);
                            $("#overlay").css("display", "none");

                        }
                        $("#overlay").css("display", "none");

                        var PoSAPResponseJsonObject = getSAPResponseFromLocal("");
                        var PoNumber = PoSAPResponseJsonObject["PoNumber"];
                        var SAPMessage = PoSAPResponseJsonObject["Message"];
                        console.log("PoNumber: " + PoNumber);
                        console.log("SAPMessage: " + SAPMessage);

                        if (PoNumber !== "" && PoNumber !== undefined && PoNumber.toString().trim() !== "")
                        {
                            var PoResponseJsonObject = getPOResponseFromLocal("");
                            var PID = PoResponseJsonObject["PID"];
                            var WIMessage = PoResponseJsonObject["Message"];
                            var message = "PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;
                            
                            if(PID !== "") {
                                console.log("PID is not blank!");
                                if ($("#PoFrom").val() === "editpo" || $("#PoFrom").val() === "editApprovedPo" || $("#PoFrom").val() === "shortcutPo")
                                {
                                    updatePrOrRfqLineRemainingQtyInEditOrAmendPo();
                                }

                                Lobibox.alert("info", {
                                    msg: message,
                                    callback: function(lobibox, type) {
                                    }
                                });
                            } else {
                                console.log("%cPID is blank!", "color: red");
                                $("#errorTransactionStatus").val("Yes");
                                $("#PoNumber").val(PoNumber);
                                $("#poNumber").val(PoNumber);
                                Lobibox.notify("warning", {
                                    rounded: true,
                                    delayIndicator: false,
                                    msg: "Work item not generated, please wait..."
                                });
                                $("#overlay").css("display", "block");
                                setTimeout(
                                    function()
                                    {
                                        // Click Save&Close button to save data locally.
                                        $("#saveAndCloseBtn").trigger("click");
                                    }
                                , 100);                                
                            }
                        }
                        else
                        {
                            var message = "PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage;

                            Lobibox.alert("info", {
                                msg: message
                            });
                        }

                        $("#overlay").css("display", "none");
                    }
                }
        , 1000);

    });

    $("#sap").click(function() {
        //        getSAPResponse("");
        var URLParam = $("#inputXml").val();
        console.log("inputXml: " + URLParam);

        var dmsip = $("#dmsip").val();
        console.log("dmsip :" + dmsip);

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var serviceUrl = dmsip + "/PR2POWebservice/ng/service/POCreation";
        console.log("serviceUrl: " + serviceUrl);

        var sapUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePOSAP?InputXML=" + URLParam;
        console.log("sapUrl :" + sapUrl);

        $.ajax({
            type: "POST",
            url: sapUrl,
            contentType: "application/xml",
            dataType: "xml",
            //            data: URLParam,
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log("SAP Response: " + data);
                var PONumber = getSAPResponse(data);
                console.log("PONumber: " + PONumber);

                if (PONumber !== "")
                {
                    var xmlStringArr = URLParam.split("<PurchaseOrderNumber>");
                    console.log("xmlStringArr[0]: " + xmlStringArr[0]);
                    console.log("xmlStringArr[1]: " + xmlStringArr[1]);

                    URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + PONumber + xmlStringArr[1];
                    console.log("WI URLParam: " + URLParam);
                    $.ajax({
                        type: "POST",
                        url: serviceUrl,
                        contentType: "application/xml",
                        dataType: "xml",
                        data: URLParam,
                        async: false,
                        success: function(data, textStatus, jqXHR) {
                            console.log("Newgen Response: " + data);
                            getPOResponse(data);
                            $("#overlay").css("display", "none");
                        }
                    });
                }
            }
        });

    });

    $("#ItemNumberSelectEdit").change(function() {

        // Refresh Service Account Assignment Array
        SeriveAccountAssignmentDataJsonArray = [];

        itemNumber = $(this).val();
        console.log("itemNumber: " + itemNumber);
        $("#overlay").css("display", "block");

        if (itemNumber !== "")
        {
            $("#SaveLineLevelDataBtn").prop("disabled", false);
            $("#lineLevelTabsDiv").css("display", "block");
        }
        else
        {
            $("#SaveLineLevelDataBtn").prop("disabled", true);
            $("#lineLevelTabsDiv").css("display", "none");
        }

        var POLineItemDataLinkId = findDataOfPrLineItem(parsedJsonPoData, "LinkId", itemNumber);
        console.log("POLineItemDataLinkId: " + POLineItemDataLinkId);

        //POInvoiceData Starts
        var POInvoiceDataArray = parsedJsonPoData.POFetchOP.POInvoiceData;
        console.log("POInvoiceDataArray: " + POInvoiceDataArray);
        console.log("POInvoiceDataArray is Array: " + Array.isArray(POInvoiceDataArray));
        if (POInvoiceDataArray !== undefined) {
            if (Array.isArray(POInvoiceDataArray) === true) {
                console.log("POInvoiceDataArray len: " + POInvoiceDataArray.length);
                for (var i = 0; i < POInvoiceDataArray.length; i++)
                {
                    if (POInvoiceDataArray[i].ItemNumber === itemNumber)
                    {
                        $("#TaxCode").val(POInvoiceDataArray[i].TaxCode);
                        $("#DPCategory").val(POInvoiceDataArray[i].DPCategory);

                        if (POInvoiceDataArray[i].InvoiceReceipt === "true")
                        {
                            $("#InvoiceReceipt").prop("checked", true);
                        }
                        else
                        {
                            $("#InvoiceReceipt").prop("checked", false);
                        }
                        if (POInvoiceDataArray[i].FinalInvoice === "true")
                        {
                            $("#FinalInvoice").prop("checked", true);
                        }
                        else
                        {
                            $("#FinalInvoice").prop("checked", false);
                        }
                        if (POInvoiceDataArray[i].GRBasedIV === "true")
                        {
                            $("#GRBasedIV").prop("checked", true);
                        }
                        else
                        {
                            $("#GRBasedIV").prop("checked", false);
                        }
                    }
                }
            }
            else
            {

                if (POInvoiceDataArray.ItemNumber === itemNumber)
                {
                    $("#TaxCode").val(POInvoiceDataArray.TaxCode);
                    $("#DPCategory").val(POInvoiceDataArray.DPCategory);

                    if (POInvoiceDataArray.InvoiceReceipt === "true")
                    {
                        $("#InvoiceReceipt").prop("checked", true);
                    }
                    else
                    {
                        $("#InvoiceReceipt").prop("checked", false);
                    }
                    if (POInvoiceDataArray.FinalInvoice === "true")
                    {
                        $("#FinalInvoice").prop("checked", true);
                    }
                    else
                    {
                        $("#FinalInvoice").prop("checked", false);
                    }
                    if (POInvoiceDataArray.GRBasedIV === "true")
                    {
                        $("#GRBasedIV").prop("checked", true);
                    }
                    else
                    {
                        $("#GRBasedIV").prop("checked", false);
                    }
                }
                else
                {
                    $("#TaxCode").val("");
                    $("#DPCategory").val("");
                    $("#InvoiceReceipt").prop("checked", false);
                    $("#FinalInvoice").prop("checked", false);
                    $("#GRBasedIV").prop("checked", false);
                }
            }
        }
        //POInvoiceData Ends

        var AccountAssignmentCategory = findDataOfPrLineItem(parsedJsonPoData, "AccountAssignmentCategory", itemNumber);
        console.log("AccountAssignmentCategory: " + AccountAssignmentCategory);
        $("#accountAssignmentCategory").val(AccountAssignmentCategory);

        // PODeliveryAddressData Starts
        var PODeliveryAddressDataArray = parsedJsonPoData.POFetchOP.PODeliveryAddressData;
        console.log("PODeliveryAddressDataArray: " + PODeliveryAddressDataArray);
        console.log("PODeliveryAddressDataArray is Array: " + Array.isArray(PODeliveryAddressDataArray));
        if (PODeliveryAddressDataArray !== undefined) {
            if (Array.isArray(PODeliveryAddressDataArray) === true) {
                console.log("PODeliveryAddressDataArray len: " + PODeliveryAddressDataArray.length);
                for (var i = 0; i < PODeliveryAddressDataArray.length; i++)
                {
                    if (PODeliveryAddressDataArray[i].ItemNo === itemNumber)
                    {
                        $("#Name1").val(PODeliveryAddressDataArray[i].Name1);
                        $("#Name2").val(PODeliveryAddressDataArray[i].Name2);
                        $("#Street").val(PODeliveryAddressDataArray[i].Street);
                        $("#HouseNumber").val(PODeliveryAddressDataArray[i].HouseNo);
                        $("#PostalCode").val(PODeliveryAddressDataArray[i].PostalCode);
                        $("#City").val(PODeliveryAddressDataArray[i].City);
                        $("#countryLimits").val(PODeliveryAddressDataArray[i].Country);
                    }
                }
            }
            else {
                if (PODeliveryAddressDataArray.ItemNo === itemNumber)
                {
                    $("#Name1").val(PODeliveryAddressDataArray.Name1);
                    $("#Name2").val(PODeliveryAddressDataArray.Name2);
                    $("#Street").val(PODeliveryAddressDataArray.Street);
                    $("#HouseNumber").val(PODeliveryAddressDataArray.HouseNo);
                    $("#PostalCode").val(PODeliveryAddressDataArray.PostalCode);
                    $("#City").val(PODeliveryAddressDataArray.City);
                    $("#countryLimits").val(PODeliveryAddressDataArray.Country);
                }
                else {
                    $("#Name1").val("");
                    $("#Name2").val("");
                    $("#Street").val("");
                    $("#HouseNumber").val("");
                    $("#PostalCode").val("");
                    $("#City").val("");
                    $("#countryLimits").val("");
                }
            }
        }
        // PODeliveryAddressData Ends

        // PODeliveryData Starts
        var PODeliveryDataArray = parsedJsonPoData.POFetchOP.PODeliveryData;
        console.log("PODeliveryDataArray: " + PODeliveryDataArray);
        console.log("PODeliveryDataArray is Array: " + Array.isArray(PODeliveryDataArray));
        if (PODeliveryDataArray !== undefined) {
            if (Array.isArray(PODeliveryDataArray) === true) {
                console.log("PODeliveryDataArray len: " + PODeliveryDataArray.length);
                for (var i = 0; i < PODeliveryDataArray.length; i++)
                {
                    if (PODeliveryDataArray[i].ItemNo === itemNumber)
                    {
                        $("#OverdeliveryTolerance").val(PODeliveryDataArray[i].OverDelTol);
                        $("#UnderdeliveryTolerance").val(PODeliveryDataArray[i].UnderDelTol);
                        $("#ShippingInstruction").val(PODeliveryDataArray[i].ShippingInstructions);
                        $("#StockType").val(PODeliveryDataArray[i].StockType);
                        $("#FirstReminderExpediter").val(PODeliveryDataArray[i].FstRem_Exped);
                        $("#SecondReminderExpediter").val(PODeliveryDataArray[i].SecRem_Exped);
                        $("#ThirdReminderExpediter").val(PODeliveryDataArray[i].ThrdRem_Exped);
                        $("#ValuationType").val(PODeliveryDataArray[i].ValuationType);
                        $("#RemShelfLife").val(PODeliveryDataArray[i].RemShelfLife);
                        $("#QAControlLife").val(PODeliveryDataArray[i].QAControlLife);
                        $("#GRProcTime").val(PODeliveryDataArray[i].GrProcTime);
                        $("#PlDeliveryTime").val(PODeliveryDataArray[i].PlDelTime);
                        $("#incoTermsPart1Delivery").val(PODeliveryDataArray[i].IncoTerms1);
                        if (PODeliveryDataArray[i].GRNonVal === "true")
                        {
                            $("#GRNonValuated").prop("checked", true);
                        }
                        else
                        {
                            $("#GRNonValuated").prop("checked", false);
                        }
                        if (PODeliveryDataArray[i].DelvCompleted === "true")
                        {
                            $("#DelivCompleted").prop("checked", true);
                        }
                        else
                        {
                            $("#DelivCompleted").prop("checked", false);
                        }
                    }
                }
            }
            else {
                if (PODeliveryDataArray.ItemNo === itemNumber)
                {
                    $("#OverdeliveryTolerance").val(PODeliveryDataArray.OverDelTol);
                    $("#UnderdeliveryTolerance").val(PODeliveryDataArray.UnderDelTol);
                    $("#ShippingInstruction").val(PODeliveryDataArray.ShippingInstructions);
                    $("#StockType").val(PODeliveryDataArray.StockType);
                    $("#FirstReminderExpediter").val(PODeliveryDataArray.FstRem_Exped);
                    $("#SecondReminderExpediter").val(PODeliveryDataArray.SecRem_Exped);
                    $("#ThirdReminderExpediter").val(PODeliveryDataArray.ThrdRem_Exped);
                    $("#ValuationType").val(PODeliveryDataArray.ValuationType);
                    $("#RemShelfLife").val(PODeliveryDataArray.RemShelfLife);
                    $("#QAControlLife").val(PODeliveryDataArray.QAControlLife);
                    $("#GRProcTime").val(PODeliveryDataArray.GrProcTime);
                    $("#PlDeliveryTime").val(PODeliveryDataArray.PlDelTime);
                    $("#incoTermsPart1Delivery").val(PODeliveryDataArray.IncoTerms1);
                    if (PODeliveryDataArray.GRNonVal === "true")
                    {
                        $("#GRNonValuated").prop("checked", true);
                    }
                    else
                    {
                        $("#GRNonValuated").prop("checked", false);
                    }
                    if (PODeliveryDataArray.DelvCompleted === "true")
                    {
                        $("#DelivCompleted").prop("checked", true);
                    }
                    else
                    {
                        $("#DelivCompleted").prop("checked", false);
                    }
                }
                else {
                    $("#OverdeliveryTolerance").val("");
                    $("#UnderdeliveryTolerance").val("");
                    $("#ShippingInstruction").val("");
                    $("#StockType").val("");
                    $("#FirstReminderExpediter").val("");
                    $("#SecondReminderExpediter").val("");
                    $("#ThirdReminderExpediter").val("");
                    $("#ValuationType").val("");
                    $("#RemShelfLife").val("");
                    $("#QAControlLife").val("");
                    $("#GRProcTime").val("");
                    $("#PlDeliveryTime").val("");
                    $("#incoTermsPart1Delivery").val("");
                    $("#GRNonValuated").prop("checked", false);
                    $("#DelivCompleted").prop("checked", false);
                }
            }
        }
        // PODeliveryData Ends

        // POConfirmationsData Starts
        var POConfirmationsDataArray = parsedJsonPoData.POFetchOP.POConfirmationsData;
        console.log("POConfirmationsDataArray: " + POConfirmationsDataArray);
        console.log("POConfirmationsDataArray is Array: " + Array.isArray(POConfirmationsDataArray));
        if (POConfirmationsDataArray !== undefined) {
            if (Array.isArray(POConfirmationsDataArray) === true) {
                console.log("POConfirmationsDataArray len: " + POConfirmationsDataArray.length);
                for (var i = 0; i < POConfirmationsDataArray.length; i++)
                {
                    if (POConfirmationsDataArray[i].ItemNo === itemNumber)
                    {
                        $("#confControlLimits").val(POConfirmationsDataArray[i].ConfControl);
                        $("#OrderAck").val(POConfirmationsDataArray[i].OrderAck);
                        if (POConfirmationsDataArray[i].ConfirmnReq === "true")
                        {
                            $("#ConfirmationRequired").prop("checked", true);
                        }
                        else
                        {
                            $("#ConfirmationRequired").prop("checked", false);
                        }
                        if (POConfirmationsDataArray[i].RejectInd === "true")
                        {
                            $("#RejectionInd").prop("checked", true);
                        }
                        else
                        {
                            $("#RejectionInd").prop("checked", false);
                        }
                    }
                }
            }
            else {
                if (POConfirmationsDataArray.ItemNo === itemNumber)
                {
                    $("#confControlLimits").val(POConfirmationsDataArray.ConfControl);
                    $("#OrderAck").val(POConfirmationsDataArray.OrderAck);
                    if (POConfirmationsDataArray.ConfirmnReq === "true")
                    {
                        $("#ConfirmationRequired").prop("checked", true);
                    }
                    else
                    {
                        $("#ConfirmationRequired").prop("checked", false);
                    }
                    if (POConfirmationsDataArray.RejectInd === "true")
                    {
                        $("#RejectionInd").prop("checked", true);
                    }
                    else
                    {
                        $("#RejectionInd").prop("checked", false);
                    }
                }
                else {
                    $("#confControlLimits").val("");
                    $("#OrderAck").val("");
                    $("#ConfirmationRequired").prop("checked", false);
                    $("#RejectionInd").prop("checked", false);
                }
            }
        }
        // POConfirmationsData Ends

        // POCondCtrlData Starts
        var POCondCtrlDataArray = parsedJsonPoData.POFetchOP.POCondCtrlData;
        console.log("POCondCtrlDataArray: " + POCondCtrlDataArray);
        console.log("POCondCtrlDataArray is Array: " + Array.isArray(POCondCtrlDataArray));
        if (POCondCtrlDataArray !== undefined) {
            if (Array.isArray(POCondCtrlDataArray) === true) {
                console.log("POCondCtrlDataArray len: " + POCondCtrlDataArray.length);
                for (var i = 0; i < POCondCtrlDataArray.length; i++)
                {
                    if (POCondCtrlDataArray[i].ItemNo === itemNumber)
                    {
                        if (POCondCtrlDataArray[i].PrintPrice === "true")
                        {
                            $("#PrintPrice").prop("checked", true);
                        }
                        else
                        {
                            $("#PrintPrice").prop("checked", false);
                        }
                        if (POCondCtrlDataArray[i].EstimatedPrice === "true")
                        {
                            $("#EstimatedPrice").prop("checked", true);
                        }
                        else
                        {
                            $("#EstimatedPrice").prop("checked", false);
                        }
                    }
                }
            }
            else {
                if (POCondCtrlDataArray.ItemNo === itemNumber)
                {
                    if (POCondCtrlDataArray.PrintPrice === "true")
                    {
                        $("#PrintPrice").prop("checked", true);
                    }
                    else
                    {
                        $("#PrintPrice").prop("checked", false);
                    }
                    if (POCondCtrlDataArray.EstimatedPrice === "true")
                    {
                        $("#EstimatedPrice").prop("checked", true);
                    }
                    else
                    {
                        $("#EstimatedPrice").prop("checked", false);
                    }
                }
                else {
                    $("#PrintPrice").prop("checked", false);
                    $("#EstimatedPrice").prop("checked", false);
                }
            }
        }
        // POCondCtrlData Ends

        // POLineItemConditionsData Starts
        var POLineItemConditionsDataArray = parsedJsonPoData.POFetchOP.POLineItemConditionsData;
        console.log("POLineItemConditionsDataArray: " + POLineItemConditionsDataArray);
        console.log("POLineItemConditionsDataArray is Array: " + Array.isArray(POLineItemConditionsDataArray));
        if (POLineItemConditionsDataArray !== undefined) {
            if (Array.isArray(POLineItemConditionsDataArray) === true) {
                console.log("POLineItemConditionsDataArray len: " + POLineItemConditionsDataArray.length);
                console.log("POLineItemDataLinkId: " + POLineItemDataLinkId);
                var row = "";
                $("#conditionTableIdLineLevel tbody tr").remove();
                for (var i = 0; i < POLineItemConditionsDataArray.length; i++) {

                    if (POLineItemConditionsDataArray[i].LinkId === POLineItemDataLinkId)
                    {
                        console.log("POLineItemConditionsDataArray[i].LinkId: " + POLineItemConditionsDataArray[i].LinkId);
                        row += "<tr>"
                                + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'></td>"
                                + "<td><input type='text' value='" + (POLineItemConditionsDataArray[i].CondType === undefined ? "" : POLineItemConditionsDataArray[i].CondType) + "' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' readonly></td>"
                                + "<td><input type='text' value='' class='form-control form-rounded nameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' readonly></td>"
                                + "<td><input type='text' value='' class='form-control form-rounded AmountLineLevel tableInputField' name='AmountLineLevel' style='width:150px;'></td>"
                                + "<td><input type='text' value='" + (POLineItemConditionsDataArray[i].CondCrncy === undefined ? "" : POLineItemConditionsDataArray[i].CondCrncy) + "' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel'></td>"
                                + "<td><input type='text' value='' class='form-control form-rounded PerQuantityLineLavel  tableInputField' name='PerQuantityLineLavel' style='width:150px;'></td>"
                                + "<td><input type='text' value='" + (POLineItemConditionsDataArray[i].CondPricUnit === undefined ? "" : POLineItemConditionsDataArray[i].CondPricUnit) + "' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel'></td>"
                                + "<td><input type='text' value='" + (POLineItemConditionsDataArray[i].CondUnit === undefined ? "" : POLineItemConditionsDataArray[i].CondUnit) + "' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel'></td>"
                                + "<td><input type='text' value='" + (POLineItemConditionsDataArray[i].CondVal === undefined ? "" : formatAmountByComma(POLineItemConditionsDataArray[i].CondVal)) + "' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;'></td>"
                                + "<td><input type='text' value='' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' readonly></td>"
                                + "<td><input type='text' value='' class='form-control form-rounded ConditionValue2LineLevel tableInputField' name='ConditionValue2LineLevel' readonly></td>"
                                + "<td><input type='text' value='' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' readonly></td>"
                                + "<td><input type='text' value='' class='form-control form-rounded conditionDetailsLineLevel tableInputField' name='conditionDetailsLineLevel'></td>"
                                + "<td>"
                                + "<input type='hidden' value='" + (POLineItemConditionsDataArray[i].LinkId === undefined ? "" : POLineItemConditionsDataArray[i].LinkId) + "' class='CoditionLinkId'>"
                                + "<input type='hidden' value='" + (POLineItemConditionsDataArray[i].ItemNumber === undefined ? "" : POLineItemConditionsDataArray[i].ItemNumber) + "' class='CoditionItemNumber'>"
                                + "<input type='hidden' value='" + (POLineItemConditionsDataArray[i].CondSTNo === undefined ? "" : POLineItemConditionsDataArray[i].CondSTNo) + "' class='conditionSTUNR '>"
                                + "<input type='hidden' value='" + (POLineItemConditionsDataArray[i].CondCount === undefined ? "" : POLineItemConditionsDataArray[i].CondCount) + "' class='conditionZAEHK '>"
                                + "<input type='hidden' value='" + (POLineItemConditionsDataArray[i].CondChangeId === undefined ? "" : POLineItemConditionsDataArray[i].CondChangeId) + "' class='conditionChangeId '>"
                                + "<input type='hidden' value='' class='conditionKAPPL'>"
                                + "<input type='hidden' value='' class='conditionKVSL1'>"
                                + "<input type='hidden' value='' class='conditionKVSL2'>"
                                + "</td>"
                                + "</tr>";
                    }
                }
                $("#conditionTableIdLineLevel tbody").append(row);
            }
            else
            {
                if (POLineItemConditionsDataArray.LinkId === POLineItemDataLinkId) {
                    var row = "";
                    $("#conditionTableIdLineLevel tbody tr").remove();

                    row += "<tr>"
                            + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'></td>"
                            + "<td><input type='text' value='" + (POLineItemConditionsDataArray.CondType === undefined ? "" : POLineItemConditionsDataArray.CondType) + "' class='form-control form-rounded ConditionTypeLineLevel tableInputField' name='ConditionTypeLineLevel' readonly></td>"
                            + "<td><input type='text' value='' class='form-control form-rounded nameConditionsLineLevel tableInputField' name='nameConditionsLineLevel' readonly></td>"
                            + "<td><input type='text' value='' class='form-control form-rounded AmountLineLevel tableInputField' name='AmountLineLevel' style='width:150px;'></td>"
                            + "<td><input type='text' value='" + (POLineItemConditionsDataArray.CondCrncy === undefined ? "" : POLineItemConditionsDataArray.CondCrncy) + "' class='form-control form-rounded CurrencyLineLevel tableInputField' name='CurrencyLineLevel'></td>"
                            + "<td><input type='text' value='' class='form-control form-rounded PerQuantityLineLavel  tableInputField' name='PerQuantityLineLavel' style='width:150px;'></td>"
                            + "<td><input type='text' value='" + (POLineItemConditionsDataArray.CondPricUnit === undefined ? "" : POLineItemConditionsDataArray.CondPricUnit) + "' class='form-control form-rounded ConditionPricingUnitLineLevel tableInputField' name='ConditionPricingUnitLineLevel'></td>"
                            + "<td><input type='text' value='" + (POLineItemConditionsDataArray.CondUnit === undefined ? "" : POLineItemConditionsDataArray.CondUnit) + "' class='form-control form-rounded UoMLineLevel tableInputField' name='UoMLineLevel'></td>"
                            + "<td><input type='text' value='" + (POLineItemConditionsDataArray.CondVal === undefined ? "" : formatAmountByComma(POLineItemConditionsDataArray.CondVal)) + "' class='form-control form-rounded ConditionValueLineLevel tableInputField' name='ConditionValueLineLevel' style='width:150px;'></td>"
                            + "<td><input type='text' value='' class='form-control form-rounded Currency2LineLevel tableInputField' name='Currency2LineLevel' readonly></td>"
                            + "<td><input type='text' value='' class='form-control form-rounded ConditionValue2LineLevel tableInputField' name='ConditionValue2LineLevel' readonly></td>"
                            + "<td><input type='text' value='' class='form-control form-rounded ConditionCurrencyLineLevel tableInputField' name='ConditionCurrencyLineLevel' readonly></td>"
                            + "<td><input type='text' value='' class='form-control form-rounded conditionDetailsLineLevel tableInputField' name='conditionDetailsLineLevel'></td>"
                            + "<td>"
                            + "<input type='hidden' value='" + (POLineItemConditionsDataArray.LinkId === undefined ? "" : POLineItemConditionsDataArray.LinkId) + "' class='CoditionLinkId'>"
                            + "<input type='hidden' value='" + (POLineItemConditionsDataArray.ItemNumber === undefined ? "" : POLineItemConditionsDataArray.ItemNumber) + "' class='CoditionItemNumber'>"
                            + "<input type='hidden' value='" + (POLineItemConditionsDataArray.CondSTNo === undefined ? "" : POLineItemConditionsDataArray.CondSTNo) + "' class='conditionSTUNR '>"
                            + "<input type='hidden' value='" + (POLineItemConditionsDataArray.CondCount === undefined ? "" : POLineItemConditionsDataArray.CondCount) + "' class='conditionZAEHK '>"
                            + "<input type='hidden' value='" + (POLineItemConditionsDataArray.CondChangeId === undefined ? "" : POLineItemConditionsDataArray.CondChangeId) + "' class='conditionChangeId '>"
                            + "<input type='hidden' value='' class='conditionKAPPL'>"
                            + "<input type='hidden' value='' class='conditionKVSL1'>"
                            + "<input type='hidden' value='' class='conditionKVSL2'>"
                            + "</td>"
                            + "</tr>";

                    $("#conditionTableIdLineLevel tbody").append(row);
                }
                else
                {
                    $("#conditionTableIdLineLevel tbody tr").remove();
                }
            }
        }
        // POLineItemConditionsData Ends

        // POServiceData Starts
        var POLineItemPackageNo = findDataOfPrLineItem(parsedJsonPoData, "PackageNo", itemNumber);
        console.log("POLineItemPackageNo: " + POLineItemPackageNo);

        var POServiceRefDataArray = parsedJsonPoData.POFetchOP.POServiceRefData;
        console.log("POServiceRefDataArray: " + POServiceRefDataArray);
        console.log("POServiceRefDataArray is Array: " + Array.isArray(POServiceRefDataArray));

        var POServiceDataArray = parsedJsonPoData.POFetchOP.POServiceData;
        console.log("POServiceDataArray: " + POServiceDataArray);
        console.log("POServiceDataArray is Array: " + Array.isArray(POServiceDataArray));

        if (POServiceRefDataArray !== undefined) {
            $("#serviceTableId tbody tr").remove();
            if (Array.isArray(POServiceRefDataArray) === true) {
                console.log("POServiceRefDataArray len: " + POServiceRefDataArray.length);
                for (var i = 0; i < POServiceRefDataArray.length; i++) {
                    var PackageNo = POServiceRefDataArray[i].PackageNo;
                    var SubPackageNo = POServiceRefDataArray[i].SubPackageNo;
                    if (PackageNo === POLineItemPackageNo) {
                        var row = "";
                        if (POServiceDataArray !== undefined) {
                            $("#serviceTableId tbody tr").remove();
                            if (Array.isArray(POServiceDataArray) === true) {
                                console.log("POServiceDataArray len: " + POServiceDataArray.length);
                                $("#serviceTableId tbody tr").remove();
                                for (var i = 0; i < POServiceDataArray.length; i++) {
                                    if (POServiceDataArray[i].PackageNo === SubPackageNo)
                                    {
                                        console.log(POServiceDataArray[i].PackageNo + " : " + SubPackageNo);
                                        row += "<tr>"
                                                + "<td><input type='checkbox' class='serviceTabTableCheckbox' value='" + (POServiceDataArray[i].PackageNo === undefined ? "" : POServiceDataArray[i].PackageNo) + "'></td>"
                                                + "<td></td>"
                                                + "<td><input type='text' value='' class='form-control form-rounded lineItemNumberServices'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber) + "' class='form-control form-rounded ServicesNumber_Services'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].ShortText === undefined ? "" : POServiceDataArray[i].ShortText) + "' class='form-control form-rounded shortText_Services'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].Quantity === undefined ? "" : formatNumberByComma(POServiceDataArray[i].Quantity)) + "' class='form-control form-rounded quantity_Services' style='width: 150px;'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].Unit === undefined ? "" : POServiceDataArray[i].Unit) + "' class='form-control form-rounded servicesUnit_Services'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].GrossPrice === undefined ? "" : formatAmountByComma(POServiceDataArray[i].GrossPrice)) + "' class='form-control form-rounded grossPrice_Services' style='width:150px;'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].Currency === undefined ? "" : POServiceDataArray[i].Currency) + "' class='form-control form-rounded currency_Services'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].NetPrice === undefined ? "" : formatAmountByComma(POServiceDataArray[i].NetPrice)) + "' class='form-control form-rounded netPrice_Services' style='width:150px;'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].Edition === undefined ? "" : POServiceDataArray[i].Edition) + "' class='form-control form-rounded edition_Services'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].LineItemLongText === undefined ? "" : POServiceDataArray[i].LineItemLongText) + "' class='form-control form-rounded lineItemLongText_Services'></td>"
                                                + "<td><input type='text' value='" + (POServiceDataArray[i].OverfTolerance === undefined ? "" : POServiceDataArray[i].OverfTolerance) + "' class='form-control form-rounded overfTolerance_Services'></td>"
                                                + "</tr>";
                                    }
                                }
                                $("#serviceTableId tbody").append(row);
                            }
                            else {
                                if (POServiceDataArray.PackageNo === SubPackageNo)
                                {
                                    row += "<tr>"
                                            + "<td><input type='checkbox' class='serviceTabTableCheckbox' value='" + (POServiceDataArray.PackageNo === undefined ? "" : POServiceDataArray.PackageNo) + "'></td>"
                                            + "<td></td>"
                                            + "<td><input type='text' value='' class='form-control form-rounded lineItemNumberServices'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber) + "' class='form-control form-rounded ServicesNumber_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.ShortText === undefined ? "" : POServiceDataArray.ShortText) + "' class='form-control form-rounded shortText_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.Quantity === undefined ? "" : formatNumberByComma(POServiceDataArray.Quantity)) + "' class='form-control form-rounded quantity_Services' style='width: 150px;'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.Unit === undefined ? "" : POServiceDataArray.Unit) + "' class='form-control form-rounded servicesUnit_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.GrossPrice === undefined ? "" : formatAmountByComma(POServiceDataArray.GrossPrice)) + "' class='form-control form-rounded grossPrice_Services' style='width:150px;'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.Currency === undefined ? "" : POServiceDataArray.Currency) + "' class='form-control form-rounded currency_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.NetPrice === undefined ? "" : formatAmountByComma(POServiceDataArray.NetPrice)) + "' class='form-control form-rounded netPrice_Services' style='width:150px;'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.Edition === undefined ? "" : POServiceDataArray.Edition) + "' class='form-control form-rounded edition_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.LineItemLongText === undefined ? "" : POServiceDataArray.LineItemLongText) + "' class='form-control form-rounded lineItemLongText_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray.OverfTolerance === undefined ? "" : POServiceDataArray.OverfTolerance) + "' class='form-control form-rounded overfTolerance_Services'></td>"
                                            + "</tr>";

                                    $("#serviceTableId tbody").append(row);
                                }
                            }
                        }
                    }
                }
            }
            else {
                var PackageNo = POServiceRefDataArray.PackageNo;
                var SubPackageNo = POServiceRefDataArray.SubPackageNo;
                if (PackageNo === POLineItemPackageNo) {
                    if (POServiceDataArray !== undefined) {
                        $("#serviceTableId tbody tr").remove();
                        var row = "";
                        if (Array.isArray(POServiceDataArray) === true) {
                            console.log("POServiceDataArray len: " + POServiceDataArray.length);

                            for (var i = 0; i < POServiceDataArray.length; i++) {

                                if (POServiceDataArray[i].PackageNo === SubPackageNo)
                                {
                                    row += "<tr>"
                                            + "<td><input type='checkbox' class='serviceTabTableCheckbox' value='" + (POServiceDataArray[i].PackageNo === undefined ? "" : POServiceDataArray[i].PackageNo) + "'></td>"
                                            + "<td></td>"
                                            + "<td><input type='text' value='' class='form-control form-rounded lineItemNumberServices'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber) + "' class='form-control form-rounded ServicesNumber_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].ShortText === undefined ? "" : POServiceDataArray[i].ShortText) + "' class='form-control form-rounded shortText_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].Quantity === undefined ? "" : formatNumberByComma(POServiceDataArray[i].Quantity)) + "' class='form-control form-rounded quantity_Services' style='width: 150px;'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].Unit === undefined ? "" : POServiceDataArray[i].Unit) + "' class='form-control form-rounded servicesUnit_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].GrossPrice === undefined ? "" : formatAmountByComma(POServiceDataArray[i].GrossPrice)) + "' class='form-control form-rounded grossPrice_Services' style='width:150px;'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].Currency === undefined ? "" : POServiceDataArray[i].Currency) + "' class='form-control form-rounded currency_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].NetPrice === undefined ? "" : formatAmountByComma(POServiceDataArray[i].NetPrice)) + "' class='form-control form-rounded netPrice_Services' style='width:150px;'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].Edition === undefined ? "" : POServiceDataArray[i].Edition) + "' class='form-control form-rounded edition_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].LineItemLongText === undefined ? "" : POServiceDataArray[i].LineItemLongText) + "' class='form-control form-rounded lineItemLongText_Services'></td>"
                                            + "<td><input type='text' value='" + (POServiceDataArray[i].OverfTolerance === undefined ? "" : POServiceDataArray[i].OverfTolerance) + "' class='form-control form-rounded overfTolerance_Services'></td>"
                                            + "</tr>";
                                }
                            }
                            $("#serviceTableId tbody").append(row);
                        }
                        else {
                            if (POServiceDataArray.PackageNo === SubPackageNo)
                            {
                                row += "<tr>"
                                        + "<td><input type='checkbox' class='serviceTabTableCheckbox' value='" + (POServiceDataArray.PackageNo === undefined ? "" : POServiceDataArray.PackageNo) + "'></td>"
                                        + "<td></td>"
                                        + "<td><input type='text' value='' class='form-control form-rounded lineItemNumberServices'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber) + "' class='form-control form-rounded ServicesNumber_Services'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.ShortText === undefined ? "" : POServiceDataArray.ShortText) + "' class='form-control form-rounded shortText_Services'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.Quantity === undefined ? "" : formatNumberByComma(POServiceDataArray.Quantity)) + "' class='form-control form-rounded quantity_Services' style='width: 150px;'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.Unit === undefined ? "" : POServiceDataArray.Unit) + "' class='form-control form-rounded servicesUnit_Services'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.GrossPrice === undefined ? "" : formatAmountByComma(POServiceDataArray.GrossPrice)) + "' class='form-control form-rounded grossPrice_Services' style='width:150px;'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.Currency === undefined ? "" : POServiceDataArray.Currency) + "' class='form-control form-rounded currency_Services'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.NetPrice === undefined ? "" : formatAmountByComma(POServiceDataArray.NetPrice)) + "' class='form-control form-rounded netPrice_Services' style='width:150px;'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.Edition === undefined ? "" : POServiceDataArray.Edition) + "' class='form-control form-rounded edition_Services'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.LineItemLongText === undefined ? "" : POServiceDataArray.LineItemLongText) + "' class='form-control form-rounded lineItemLongText_Services'></td>"
                                        + "<td><input type='text' value='" + (POServiceDataArray.OverfTolerance === undefined ? "" : POServiceDataArray.OverfTolerance) + "' class='form-control form-rounded overfTolerance_Services'></td>"
                                        + "</tr>";

                                $("#serviceTableId tbody").append(row);
                            }
                        }
                    }
                }
            }
        }
        // POServiceData Ends

        // PODeliveryScheduleData Starts

        var PODeliveryScheduleDataArray = parsedJsonPoData.POFetchOP.PODeliveryScheduleData;
        console.log("PODeliveryScheduleDataArray: " + PODeliveryScheduleDataArray);
        console.log("PODeliveryScheduleDataArray is Array: " + Array.isArray(PODeliveryScheduleDataArray));
        var currentDate = $("#currentDate").val();
        console.log("currentDate " + currentDate);
        if (PODeliveryScheduleDataArray !== undefined) {
            if (Array.isArray(PODeliveryScheduleDataArray) === true) {
                console.log("PODeliveryScheduleDataArray len: " + PODeliveryScheduleDataArray.length);
                console.log("POLineItemDataLinkId: " + POLineItemDataLinkId);
                var row = "";
                $("#DeliveryScheduleTableId tbody tr").remove();
                for (var i = 0; i < PODeliveryScheduleDataArray.length; i++) {

                    if (PODeliveryScheduleDataArray[i].LinkId === POLineItemDataLinkId)
                    {
                        console.log("PODeliveryScheduleDataArray[i].LinkId: " + PODeliveryScheduleDataArray[i].LinkId);

                        row += "<tr>"
                                + "<td></td>"
                                + "<td><input type='text' class='form-control form-rounded deliveryDateCategory tableInputField' value='" + PODeliveryScheduleDataArray[i].DelDateCatg + "'></td>"
                                + "<td><input type='date' min='" + currentDate + "' class='deliveryDateClass' style='width:300px;' value='" + PODeliveryScheduleDataArray[i].DelDate + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded tableInputField scheduledQuantityClass' style='width:150px;' value='" + formatNumberByComma(PODeliveryScheduleDataArray[i].ScheduledQuantity) + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded tableInputField timeDeliveryScheduledClass' value='" + PODeliveryScheduleDataArray[i].DelTime + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded tableInputField prNumberDeliveryScheduledClass' value='" + PODeliveryScheduleDataArray[i].PRNumber + "'></td>"
                                + "<td><input type='text' class='form-control form-rounded tableInputField reqItemNumberClass' value='" + PODeliveryScheduleDataArray[i].ReqItemNo + "'></td>"
                                + "<td>"
                                + "<input type='hidden' class='prItemNumber' value='" + PODeliveryScheduleDataArray[i].ItemNo + "'>"
                                + "<input type='hidden' class='prLinkId' value='" + PODeliveryScheduleDataArray[i].LinkId + "'>"
                                + "</td>"
                                + "</tr>";
                    }
                }
                $("#DeliveryScheduleTableId tbody").append(row);
            }
            else
            {
                console.log("PODeliveryScheduleDataArray.LinkId Outside If: " + PODeliveryScheduleDataArray.LinkId);
                if (PODeliveryScheduleDataArray.LinkId === POLineItemDataLinkId) {
                    console.log("PODeliveryScheduleDataArray.LinkId Inside If: " + PODeliveryScheduleDataArray.LinkId);
                    var row = "";
                    $("#DeliveryScheduleTableId tbody tr").remove();

                    row += "<tr>"
                            + "<td></td>"
                            + "<td><input type='text' class='form-control form-rounded deliveryDateCategory tableInputField' value='" + PODeliveryScheduleDataArray.DelDateCatg + "'></td>"
                            + "<td><input type='date' min='" + currentDate + "' class='deliveryDateClass' style='width:300px;' value='" + PODeliveryScheduleDataArray.DelDate + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded tableInputField scheduledQuantityClass' style='width:150px;' value='" + formatNumberByComma(PODeliveryScheduleDataArray.ScheduledQuantity) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded tableInputField timeDeliveryScheduledClass' value='" + PODeliveryScheduleDataArray.DelTime + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded tableInputField prNumberDeliveryScheduledClass' value='" + PODeliveryScheduleDataArray.PRNumber + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded tableInputField reqItemNumberClass' value='" + PODeliveryScheduleDataArray.ReqItemNo + "'></td>"
                            + "<td>"
                            + "<input type='hidden' class='prItemNumber' value='" + PODeliveryScheduleDataArray.ItemNo + "'>"
                            + "<input type='hidden' class='prLinkId' value='" + PODeliveryScheduleDataArray.LinkId + "'>"
                            + "</td>"
                            + "</tr>";
                    console.log("row: " + row);

                    $("#DeliveryScheduleTableId tbody").append(row);
                }
                else
                {
                    $("#DeliveryScheduleTableId tbody tr").remove();
                }
            }
        }

        // PODeliveryScheduleData Ends

        // POQuantityWeightsData Starts

        var POQuantityWeightsDataArray = parsedJsonPoData.POFetchOP.POQuantityWeightsData;
        console.log("POQuantityWeightsDataArray: " + POQuantityWeightsDataArray);
        console.log("POQuantityWeightsDataArray is Array: " + Array.isArray(POQuantityWeightsDataArray));
        if (POQuantityWeightsDataArray !== undefined) {
            if (Array.isArray(POQuantityWeightsDataArray) === true) {
                console.log("POQuantityWeightsDataArray len: " + POQuantityWeightsDataArray.length);
                for (var i = 0; i < POQuantityWeightsDataArray.length; i++)
                {
                    if (POQuantityWeightsDataArray[i].ItemNumber === itemNumber)
                    {
                        $("#pOQuantity").val(POQuantityWeightsDataArray[i].POQuantity === undefined ? "" : formatNumberByComma(POQuantityWeightsDataArray[i].POQuantity));
                        $("#pOUnit").val(POQuantityWeightsDataArray[i].POQuantityUnit === undefined ? "" : POQuantityWeightsDataArray[i].POQuantityUnit);

                        $("#pOQuantitySKU").val(POQuantityWeightsDataArray[i].POQuantitySKU === undefined ? "" : formatNumberByComma(POQuantityWeightsDataArray[i].POQuantitySKU));
                        $("#pOUnitSKU").val(POQuantityWeightsDataArray[i].POQuantitySKUUnit === undefined ? "" : POQuantityWeightsDataArray[i].POQuantitySKUUnit);

                        $("#orderUnit").val(POQuantityWeightsDataArray[i].Order1 === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray[i].Order1));
                        $("#unitOrderUnit").val(POQuantityWeightsDataArray[i].OrderUnit1 === undefined ? "" : POQuantityWeightsDataArray[i].OrderUnit1);

                        $("#orderUnit2").val(POQuantityWeightsDataArray[i].Order2 === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray[i].Order2));
                        $("#unitOrderUnit2").val(POQuantityWeightsDataArray[i].OrderUnit2 === undefined ? "" : POQuantityWeightsDataArray[i].OrderUnit2);

                        $("#orderPriceUnit").val(POQuantityWeightsDataArray[i].OrderPrice === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray[i].OrderPrice));
                        $("#unitOrderPriceUnit").val(POQuantityWeightsDataArray[i].OrderPriceUnit === undefined ? "" : POQuantityWeightsDataArray[i].OrderPriceUnit);

                        $("#sKUUnit").val(POQuantityWeightsDataArray[i].SKU === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray[i].SKU));
                        $("#unitSKUUnit").val(POQuantityWeightsDataArray[i].SKUUnit === undefined ? "" : POQuantityWeightsDataArray[i].SKUUnit);
                    }
                }
            }
            else {
                if (POQuantityWeightsDataArray.ItemNumber === itemNumber)
                {
                    $("#pOQuantity").val(POQuantityWeightsDataArray.POQuantity === undefined ? "" : formatNumberByComma(POQuantityWeightsDataArray.POQuantity));
                    $("#pOUnit").val(POQuantityWeightsDataArray.POQuantityUnit === undefined ? "" : POQuantityWeightsDataArray.POQuantityUnit);

                    $("#pOQuantitySKU").val(POQuantityWeightsDataArray.POQuantitySKU === undefined ? "" : formatNumberByComma(POQuantityWeightsDataArray.POQuantitySKU));
                    $("#pOUnitSKU").val(POQuantityWeightsDataArray.POQuantitySKUUnit === undefined ? "" : POQuantityWeightsDataArray.POQuantitySKUUnit);

                    $("#orderUnit").val(POQuantityWeightsDataArray.Order1 === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray.Order1));
                    $("#unitOrderUnit").val(POQuantityWeightsDataArray.OrderUnit1 === undefined ? "" : POQuantityWeightsDataArray.OrderUnit1);

                    $("#orderUnit2").val(POQuantityWeightsDataArray.Order2 === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray.Order2));
                    $("#unitOrderUnit2").val(POQuantityWeightsDataArray.OrderUnit2 === undefined ? "" : POQuantityWeightsDataArray.OrderUnit2);

                    $("#orderPriceUnit").val(POQuantityWeightsDataArray.OrderPrice === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray.OrderPrice));
                    $("#unitOrderPriceUnit").val(POQuantityWeightsDataArray.OrderPriceUnit === undefined ? "" : POQuantityWeightsDataArray.OrderPriceUnit);

                    $("#sKUUnit").val(POQuantityWeightsDataArray.SKU === undefined ? "" : formatAmountByComma(POQuantityWeightsDataArray.SKU));
                    $("#unitSKUUnit").val(POQuantityWeightsDataArray.SKUUnit === undefined ? "" : POQuantityWeightsDataArray.SKUUnit);
                }
                else
                {
                    $("#pOQuantity").val("");
                    $("#pOUnit").val("");
                    $("#pOQuantitySKU").val("");
                    $("#pOUnitSKU").val("");
                    $("#orderUnit").val("");
                    $("#unitOrderUnit").val("");
                    $("#orderUnit2").val("");
                    $("#unitOrderUnit2").val("");
                    $("#orderPriceUnit").val("");
                    $("#unitOrderPriceUnit").val("");
                    $("#sKUUnit").val("");
                    $("#unitSKUUnit").val("");
                }
            }
        }

        // POQuantityWeightsData Ends

        //        hideAndShowLineLevelTabsAndFields();

        $("#overlay").css("display", "none");
    });

    $("#submitServiceAccAssModalBtn").click(function() {
        // SeriveAccountAssignmentDataJsonArray
        var servicePackageNumber = $("#servicePackageNumber").val();
        console.log("servicePackageNumber: " + servicePackageNumber);

        var distributionId = $('input[type=radio][name=distributionIndicator]:checked').attr('id');
        var distribution = "";

        if (distributionId === "noMultiAcctAssignment") {
            distribution = "";
        } else if (distributionId === "distOnQuantBases") {
            distribution = "1";
        } else if (distributionId === "distByPercentage") {
            distribution = "2";
        }
        console.log("distribution: " + distribution);

        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            var SeriveAccountAssignmentDataJsonObj = {};

            SeriveAccountAssignmentDataJsonObj["ServicePackageNo"] = servicePackageNumber;
            SeriveAccountAssignmentDataJsonObj["Distribution"] = distribution;
            SeriveAccountAssignmentDataJsonObj["Quantity"] = removeCommaInNumber($(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").val()).toString();
            SeriveAccountAssignmentDataJsonObj["Percentage"] = $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").val();
            SeriveAccountAssignmentDataJsonObj["GLAccount"] = $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val();
            SeriveAccountAssignmentDataJsonObj["COArea"] = $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").val();
            SeriveAccountAssignmentDataJsonObj["CostCenter"] = $(this).find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val();
            SeriveAccountAssignmentDataJsonObj["Fund"] = $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").val();
            SeriveAccountAssignmentDataJsonObj["FunctionalArea"] = $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").val();
            SeriveAccountAssignmentDataJsonObj["FundsCentre"] = $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").val();
            SeriveAccountAssignmentDataJsonObj["CommitmentItem"] = $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").val();
            SeriveAccountAssignmentDataJsonObj["Order"] = $(this).find("td").eq(10).children(".serviceAccAsgnTblOrder").val();
            SeriveAccountAssignmentDataJsonObj["Asset"] = $(this).find("td").eq(11).children(".serviceAccAsgnTblAssets").val();
            SeriveAccountAssignmentDataJsonObj["WBSElements"] = $(this).find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val();
            SeriveAccountAssignmentDataJsonObj["SalesOrder"] = $(this).find("td").eq(13).children(".serviceAccAsgnTblSalesOrder").val();
            SeriveAccountAssignmentDataJsonObj["NetworkActivityNo"] = $(this).find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").val();
            SeriveAccountAssignmentDataJsonObj["ItemNumber"] = $(this).find("td").eq(15).children(".serviceAccAsgnTblItemNumber").val();
            SeriveAccountAssignmentDataJsonObj["DeliverySchedule"] = $(this).find("td").eq(16).children(".serviceAccAsgnTblDeliverySchedule").val();

            SeriveAccountAssignmentDataJsonArray.push(SeriveAccountAssignmentDataJsonObj);
        });
        console.log("SeriveAccountAssignmentDataJsonArray length: " + SeriveAccountAssignmentDataJsonArray.length);
        console.log("SeriveAccountAssignmentDataJsonArray: " + SeriveAccountAssignmentDataJsonArray);

        $("#changeAccountAssignmentScreenModal").modal("hide");
    });

    $("#serviceTableId").on("click", ".serviceTabTableCheckbox", function() {
        var servicePackageNo = $(this).val();
        console.log("servicePackageNo: " + servicePackageNo);
        $("#servicePackageNumber").val(servicePackageNo);

        if ($(this).prop("checked") === true)
        {
            $("#serviceTabAccAssgnModelBtn_div").css("display", "block");
        }
        else
        {
            $("#serviceTabAccAssgnModelBtn_div").css("display", "none");
        }
    });
    $("#serviceAccountAssignmentAddBtn").click(function() {
//        SeriveAccountAssignmentDataJsonArray = [];
        //        hideAndShowLineLevelTabsAndFields();
        $("#accountAssignmentModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("InputFields");

    });
    $("#serviceAccountAssignmentchangeScreenbtn").click(function() {
        $("#accountAssignmentModal").modal("hide");
        $("#changeAccountAssignmentScreenModal").modal("show");
    });

    $("#limitsAccountAssignmentBtn").click(function() {
        hideAndShowLineLevelTabsAndFields();
        $("#limitsAccAssignmentModal").modal("show");
    });

    $("#createdPOTable").on("click", ".revoke-po", function() {
        var pid = $(this).parent().parent().find("td").eq(1).text();
        var poNumber = $(this).parent().parent().find("td").eq(2).text().trim();
        var poStatus = $(this).parent().parent().find("td").eq(5).text().trim();

        console.log("pid: " + pid);
        console.log("poNumber: " + poNumber);
        console.log("poStatus: " + poStatus);

        $("#poNumber").val(poNumber);
        $("#pid").val(pid);

        $("#overlay").css("display", "block");

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_RejectWIPO?WorkitemId=" + pid;
        console.log("serviceUrl: " + serviceUrl);

        if (poStatus === "Rework")
        {
            $("#EditPoForm").submit();
        }
        else
        {
            $.ajax({
                type: "POST",
                url: serviceUrl,
                contentType: "application/xml",
                dataType: "xml",
                async: true,
                success: function(data, textStatus, jqXHR) {
                    console.log("success: " + data);
                    $("#overlay").css("display", "none");

                    var revokeResponseJsonObj = revokePO(data);
                    var mainCode = revokeResponseJsonObj["mainCode"];
                    var pid = revokeResponseJsonObj["pid"];
                    var msg = revokeResponseJsonObj["message"];

                    console.log("mainCode: " + mainCode);
                    console.log("pid: " + pid);
                    console.log("msg: " + msg);

                    if (mainCode !== undefined && Number(mainCode) === 0)
                    {
                        $("#EditPoForm").submit();
                    }
                    else
                    {
                        Lobibox.alert("error", {
                            msg: msg
                        });
                    }
                }
            });
        }
    });

    //    var condition = 'default';
    $("#acknowledgePoLinkId").click(function() {
        $("#overlay").css("display", "block");
    });
    $("#acknowledgePoBtn").click(function() {

        var isSignedPoUploaded = $("#isSignedPoUploaded").val();
        if (isSignedPoUploaded !== "Yes")
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Upload Signed PO Copy!"
            });
            return false;
        }

        var pid = $("#Pid").val();

        var WebServiceCallIp = $("#WebServiceCallIp").val();
        console.log("WebServiceCallIp: " + WebServiceCallIp);

        var buyerUsername = $("#buyerUsername").val();
        console.log("buyerUsername: " + buyerUsername);

        var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CompleteWI?ProcessInstanceId=" + pid + "&AcknowledgeFlag=Acknowledge&AckBy=Buyer&AckByDetails=" + buyerUsername;
        console.log("serviceUrl: " + serviceUrl);

//        acknowledgePO("");
        //        $("#overlay").css("display", "block");

        Lobibox.confirm({
            msg: "Are you sure you want to acknowledge this PO ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#overlay").css("display", "block");
                    $.ajax({
                        type: "POST",
                        url: serviceUrl,
                        contentType: "application/xml",
                        dataType: "xml",
                        //                        data: URLParam,
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

    var amountArr = [];
    var perArr = [];
    var canValArr = [];
    var POLineItemConditionJsonArray = [];

    $("#saveLineItemConditionDetailsBtn").click(function() {

        var itemCode = $("#ItemNumberSelectEdit").val();
        var codtnTblValue = "";
        var conditionTableRow = "";
        var conType = "";
        var name = "";
        var amount = "";
        var perQuant = "";
        var pRItemNumber = $("#ItemNumberSelectEdit").val();

        var linkid = findDataOfPrLineItem(parsedJsonPoData, "LinkId", pRItemNumber);
        console.log("linkid: " + linkid);

        $("#conditionTableIdLineLevel tbody tr").each(function(i) {
            if ($(this).find("td").eq(1).children("input").hasClass("ConditionTypeLineLevel") === true) {
                conType = $(this).find("td").eq(1).children(".ConditionTypeLineLevel").val();
            } else if ($(this).find("td").eq(1).children("input").hasClass("newConditionTypeLineLevel") === true) {
                conType = $(this).find("td").eq(1).children(".newConditionTypeLineLevel").val();
            }
            if ($(this).find("td").eq(2).children("input").hasClass("nameConditionsLineLevel") === true) {
                name = $(this).find("td").eq(2).children(".nameConditionsLineLevel").val();
            } else if ($(this).find("td").eq(2).children("input").hasClass("NameConditionsLineLevel") === true) {
                name = $(this).find("td").eq(2).children(".NameConditionsLineLevel").val();
            }
            if ($(this).find("td").eq(3).children("input").hasClass("AmountLineLevel") === true) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".AmountLineLevel").val());
            } else if ($(this).find("td").eq(3).children("input").hasClass("newAmountLineLevel") === true) {
                amount = removeCommaInNumber($(this).find("td").eq(3).children(".newAmountLineLevel").val());
            }
            if ($(this).find("td").eq(5).children("input").hasClass("PerQuantityLineLavel") === true) {
                perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".PerQuantityLineLavel").val());
            } else if ($(this).find("td").eq(5).children("input").hasClass("newPerQuantityLineLavel") === true) {
                perQuant = removeCommaInNumber($(this).find("td").eq(5).children(".newPerQuantityLineLavel").val());
            }
            var conPrUnit = $(this).find("td").eq(6).children(".ConditionPricingUnitLineLevel").val();
            var curr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
            var uOM = $(this).find("td").eq(7).children(".UoMLineLevel").val();
            var conVal1 = removeCommaInNumber($(this).find("td").eq(8).children(".ConditionValueLineLevel").val());
            var curr2 = $(this).find("td").eq(9).children(".Currency2LineLevel").val();
            var conVal2 = $(this).find("td").eq(10).children(".ConditionValue2LineLevel").val();
            var conCurr = $(this).find("td").eq(11).children(".ConditionCurrencyLineLevel").val();
            var conDetails = $(this).find("td").eq(12).children(".conditionDetailsLineLevel ").val();

            var stNumber = $(this).find("td").eq(17).children(".conditionSTUNR").val();
            var condCount = $(this).find("td").eq(17).children(".conditionZAEHK").val();
            var KAPPL = $(this).find("td").eq(17).children(".conditionKAPPL").val();
            var KVSL1 = $(this).find("td").eq(17).children(".conditionKVSL1").val();
            var KVSL2 = $(this).find("td").eq(17).children(".conditionKVSL2").val();
            var condChangeId = $(this).find("td").eq(17).children(".conditionChangeId").val();

            amountArr.push(amount);
            perArr.push(perQuant);
            canValArr.push(conVal1);

            conditionTableRow = conType + ',' + name + ',' + amount + ',' + perQuant + ',' + conPrUnit + ',' + curr1 + ',' + uOM + ',' + conVal1
                    + ',' + curr2 + ',' + conVal2 + ',' + conCurr + ',' + conDetails + ',' + itemCode + ',' + pRItemNumber + ',' + linkid
                    + ',' + stNumber + ',' + condCount + ',' + KAPPL + ',' + KVSL1 + ',' + KVSL2 + ',' + condChangeId;
            codtnTblValue = codtnTblValue + conditionTableRow + "#";

            var POLineItemConditionJsonObject = {};

            POLineItemConditionJsonObject["ConditionType"] = conType;
            POLineItemConditionJsonObject["ConditionName"] = name;
            POLineItemConditionJsonObject["ConditionAmount"] = amount;
            POLineItemConditionJsonObject["ConditionPerQty"] = perQuant;
            POLineItemConditionJsonObject["ConditionPricingUnit"] = conPrUnit;
            POLineItemConditionJsonObject["ConditionCurrency"] = curr1;
            POLineItemConditionJsonObject["ConditionUOM"] = uOM;
            POLineItemConditionJsonObject["ConditionValue"] = conVal1;
            POLineItemConditionJsonObject["ConditionCurrency2"] = curr2;
            POLineItemConditionJsonObject["Conditionvalue2"] = conVal2;
            POLineItemConditionJsonObject["ConditionCurrency3"] = conCurr;
            POLineItemConditionJsonObject["ConditionDetails"] = conDetails;
            POLineItemConditionJsonObject["PRItemNumber"] = pRItemNumber;
            POLineItemConditionJsonObject["PRLinkId"] = linkid;
            POLineItemConditionJsonObject["ConditionSTNumber"] = stNumber;
            POLineItemConditionJsonObject["ConditionCount"] = condCount;
            POLineItemConditionJsonObject["ConditionChangeId"] = condChangeId;
            POLineItemConditionJsonObject["ConditionKAPPL"] = KAPPL;
            POLineItemConditionJsonObject["ConditionKVSL1"] = KVSL1;
            POLineItemConditionJsonObject["ConditionKVSL2"] = KVSL2;

            POLineItemConditionJsonArray.push(POLineItemConditionJsonObject);
        });
        console.log("Condition: " + codtnTblValue);

        mergerLineItemConditionForHeaderCondition(POLineItemConditionJsonArray, canValArr);
    });

    var POInvoiceDataArray = [];
    var POAccntAssignDataArray = [];
    var POLineItemConditionsDataArray = [];
    var PODeliveryAddressDataArray = [];
    var POTextsDataArray = [];
    var POConfirmationsDataArray = [];
    var POCondCtrlDataArray = [];
    var POLineItemCustomerDataArray = [];
    var POHeaderTextDataArray = [];
    var POQuantityWeightsDataArray = [];
    var PODeliveryDataArray = [];
    var PODeliveryScheduleDataArray = [];

    $("#SaveLineLevelDataBtn").click(function() {
        console.log("Saving Line Level Data.................");
        var x2js = new X2JS();

        var ItemNumber = $("#ItemNumberSelectEdit").val();
        console.log("ItemNumber: " + ItemNumber);

        var POLineItemDataLinkId = findDataOfPrLineItem(parsedJsonPoData, "LinkID", ItemNumber);
        var POLineItemDataPackageNo = findDataOfPrLineItem(parsedJsonPoData, "PackageNo", ItemNumber);

        console.log("POLineItemDataLinkId: " + POLineItemDataLinkId);
        console.log("POLineItemDataPackageNo: " + POLineItemDataPackageNo);

        var POLineItemAndServiceAndServiceAccAss = getServiceAccountAssignmentTabDataAsJson(SeriveAccountAssignmentDataJsonArray);
        POLineItemAndAllServicesAndServiceAccAss += POLineItemAndServiceAndServiceAccAss;

        // Make POInvoiceData as Json Starts
        var POInvoiceData = getInvoiceDataAsJson(ItemNumber, POLineItemDataLinkId);
        POInvoiceDataArray = addInvoiceToPOInvoiceDataArray(POInvoiceDataArray, POInvoiceData);
        var jsonObj = {};
        jsonObj["POInvoiceData"] = POInvoiceDataArray;
        POInvoiceDataAsXml = x2js.json2xml_str(jsonObj);
        //        console.log("POInvoiceDataAsXml: " + POInvoiceDataAsXml);
        // Make POInvoiceData as Json Ends

        // Make POAccntAssignData as Json Starts
        POAccntAssignDataArray = getAccountAssignmentTabDataAsJson(ItemNumber, POLineItemDataLinkId, POAccntAssignDataArray);
        //        console.log(JSON.stringify(POAccntAssignDataArray));
        jsonObj = {};
        jsonObj["POAccntAssignData"] = POAccntAssignDataArray;
        POAccntAssignDataAsXml = x2js.json2xml_str(jsonObj);
        //        console.log("POAccntAssignDataAsXml: " + POAccntAssignDataAsXml);
        // Make POAccntAssignData as Json Ends

        // Make POLineItemConditionsData as Json Starts
        POLineItemConditionsDataArray = getLineItemConditionsDataAsJson(ItemNumber, POLineItemDataLinkId, POLineItemConditionsDataArray);
        jsonObj = {};
        jsonObj["POLineItemConditionsData"] = POLineItemConditionsDataArray;
        POLineItemConditionsDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("POLineItemConditionsDataAsXml: " + POLineItemConditionsDataAsXml);
        //        console.log(JSON.stringify(POLineItemConditionsDataArray));
        // Make POConditionsData as Json Ends

        // Make PODeliveryAddressData as Json Starts
        PODeliveryAddressDataArray = getDeliveryAddressDataAsJson(ItemNumber, POLineItemDataLinkId, PODeliveryAddressDataArray);
        jsonObj = {};
        jsonObj["PODeliveryAddressData"] = PODeliveryAddressDataArray;
        PODeliveryAddressDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("PODeliveryAddressDataAsXml: " + PODeliveryAddressDataAsXml);
        //        console.log(JSON.stringify(PODeliveryAddressDataArray));
        // Make PODeliveryAddressData as Json Ends

        // Make POTextsData as Json Starts
        POTextsDataArray = getTextDataAsJson(ItemNumber, POLineItemDataLinkId, POTextsDataArray);
        jsonObj = {};
        jsonObj["POTextsData"] = POTextsDataArray;
        POTextsDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("POTextsDataAsXml: " + POTextsDataAsXml);
        //        console.log(JSON.stringify(POTextsDataArray));
        // Make POTextsData as Json Ends

        // Make POTextsData as Json Starts
        POConfirmationsDataArray = getConfirmationsDataAsJson(ItemNumber, POLineItemDataLinkId, POConfirmationsDataArray);
        jsonObj = {};
        jsonObj["POConfirmationsData"] = POConfirmationsDataArray;
        POConfirmationsDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("POConfirmationsDataAsXml: " + POConfirmationsDataAsXml);
        //        console.log(JSON.stringify(POConfirmationsDataArray));
        // Make POTextsData as Json Ends

        // Make POTextsData as Json Starts
        POCondCtrlDataArray = getCondCtrlDataAsJson(ItemNumber, POLineItemDataLinkId, POCondCtrlDataArray);
        jsonObj = {};
        jsonObj["POCondCtrlData"] = POCondCtrlDataArray;
        POCondCtrlDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("POCondCtrlDataAsXml: " + POCondCtrlDataAsXml);
        //        console.log(JSON.stringify(POCondCtrlDataArray));
        // Make POTextsData as Json Ends

        // Make POTextsData as Json Starts
        POLineItemCustomerDataArray = getLineItemCustomerDataAsJson(ItemNumber, POLineItemDataLinkId, POLineItemCustomerDataArray);
        jsonObj = {};
        jsonObj["POLineItemCustomerData"] = POLineItemCustomerDataArray;
        POLineItemCustomerDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("POLineItemCustomerDataAsXml: " + POLineItemCustomerDataAsXml);
        //        console.log(JSON.stringify(POLineItemCustomerDataArray));
        // Make POTextsData as Json Ends

        // Make POTextsData as Json Starts
        POHeaderTextDataArray = getHeaderTextDataAsJson(ItemNumber, POLineItemDataLinkId, POHeaderTextDataArray);
        jsonObj = {};
        jsonObj["POHeaderTextData"] = POHeaderTextDataArray;
        POHeaderTextDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("POHeaderTextDataXml: " + POHeaderTextDataXml);
        //        console.log(JSON.stringify(POHeaderTextDataArray));
        // Make POTextsData as Json Ends

        // Make POTextsData as Json Starts
        POQuantityWeightsDataArray = getQuantityWeightsDataAsJson(ItemNumber, POLineItemDataLinkId, POQuantityWeightsDataArray);
        jsonObj = {};
        jsonObj["POQuantityWeightsData"] = POQuantityWeightsDataArray;
        POQuantityWeightsDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("POQuantityWeightsDataAsXml: " + POQuantityWeightsDataAsXml);
        //        console.log(JSON.stringify(POQuantityWeightsDataArray));
        // Make POTextsData as Json Ends

        // Make POTextsData as Json Starts
        PODeliveryDataArray = getDeliveryDataAsJson(ItemNumber, POLineItemDataLinkId, PODeliveryDataArray);
        jsonObj = {};
        jsonObj["PODeliveryData"] = PODeliveryDataArray;
        PODeliveryDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("PODeliveryDataAsXml: " + PODeliveryDataAsXml);
        //        console.log(JSON.stringify(PODeliveryDataArray));
        // Make POTextsData as Json Ends

        // Make POTextsData as Json Starts
        PODeliveryScheduleDataArray = getDeliveryScheduleDataAsJson(ItemNumber, POLineItemDataLinkId, PODeliveryScheduleDataArray);
        jsonObj = {};
        jsonObj["PODeliveryScheduleData"] = PODeliveryScheduleDataArray;
        PODeliveryScheduleDataAsXml = x2js.json2xml_str(jsonObj);
//        console.log("PODeliveryScheduleDataAsXml: " + PODeliveryScheduleDataAsXml);
        //        console.log(JSON.stringify(PODeliveryScheduleDataArray));        
        // Make POTextsData as Json Ends

    });

});
var POInvoiceDataAsXml = "";
var POAccntAssignDataAsXml = "";
var POLineItemConditionsDataAsXml = "";
var PODeliveryAddressDataAsXml = "";
var POTextsDataAsXml = "";
var POConfirmationsDataAsXml = "";
var POCondCtrlDataAsXml = "";
var POLineItemCustomerDataAsXml = "";
var POHeaderTextDataAsXml = "";
var POQuantityWeightsDataAsXml = "";
var PODeliveryDataAsXml = "";
var PODeliveryScheduleDataAsXml = "";
var POLineItemAndAllServicesAndServiceAccAss = "";

function getPODataAsXmlToUpdate()
{
    var headerLevelDataAsXml = getHeaderLevelDataAsXml();

    var PrType = $("#PrType").val();
    console.log("PrType: " + PrType);

    var PRLineItemData = "";

    if (PrType === "Material")
    {
        PRLineItemData = getPRLineItemData();
    }
    else if (PrType === "Service")
    {
        PRLineItemData = POLineItemAndAllServicesAndServiceAccAss;
    }
    console.log("PRLineItemData: " + PRLineItemData);

    headerLevelDataAsXml += PRLineItemData;
    headerLevelDataAsXml += POInvoiceDataAsXml;
    headerLevelDataAsXml += POAccntAssignDataAsXml;
    headerLevelDataAsXml += PODeliveryAddressDataAsXml;
    headerLevelDataAsXml += POConfirmationsDataAsXml;
    headerLevelDataAsXml += POCondCtrlDataAsXml;
    headerLevelDataAsXml += POLineItemCustomerDataAsXml;
    //    headerLevelDataAsXml += POHeaderTextDataAsXml;
    headerLevelDataAsXml += POQuantityWeightsDataAsXml;
    headerLevelDataAsXml += PODeliveryDataAsXml;
    headerLevelDataAsXml += PODeliveryScheduleDataAsXml;
    if (POLineItemConditionsDataAsXml !== "")
        //        headerLevelDataAsXml += POLineItemConditionsDataAsXml;
        headerLevelDataAsXml += "</POCreation>";

    console.log("headerLevelDataAsXml: " + headerLevelDataAsXml);
    $("#updateInputXml").val(headerLevelDataAsXml);
    return headerLevelDataAsXml;
}

function revokePO(xmlre)
{
    var xmlString = XMLToString(xmlre);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<RejectWIOutPut>"
//            + "<MainCode>0</MainCode>"
//            + "<ProcessInstanceID>PC-0000000011-process</ProcessInstanceID>"
//            + "<Message>This PO has been revoked.</Message>"
//            + "</RejectWIOutPut>";
//
//    var xmlDoc = $.parseXML(xmlString); // Localhost

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var ProcessInstanceID = $xml.find('ProcessInstanceID');
    var Message = $xml.find('Message');

    var mainCode = MainCode.text();
    var pid = ProcessInstanceID.text();
    var msg = Message.text();

    console.log("mainCode: " + mainCode);
    console.log("pid: " + pid);
    console.log("Message: " + msg);

    var revokeResponseJsonObj = {};

    revokeResponseJsonObj["mainCode"] = mainCode;
    revokeResponseJsonObj["pid"] = pid;
    revokeResponseJsonObj["message"] = msg;

    return revokeResponseJsonObj;
}

function callNGWebServiceTOFetchPODetails()
{
    console.log("edit po");
    var PoRequestType = $("#PoRequestType").val();
    console.log("PoRequestType: " + PoRequestType);

    var poNumber = $("#poNumber").val();
    console.log("poNumber: " + poNumber);

    var pid = $("#Pid").val();
    console.log("Pid: " + pid);

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var PoFrom = $("#PoFrom").val();
    console.log("PoFrom: " + PoFrom);

    var serviceUrl = "";
    if (PoRequestType === "AcknowledgePo") {
        serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_FetchPO?PONumber=" + poNumber + "&FetchFlag=R&Pid=" + pid;
    }
    else {
        if (PoFrom === "editpo") {
            serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_FetchPO?PONumber=" + poNumber + "&FetchFlag=E&Pid=" + pid;
        }
        else if (PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
            serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_FetchPO?PONumber=" + poNumber + "&FetchFlag=Amd&Pid=" + pid;
        }
    }
    console.log("serviceUrl: " + serviceUrl);

    var local_dev_uat = $("#local_dev_uat").val();
    console.log("local_dev_uat: " + local_dev_uat);

    if (local_dev_uat === "local")
    {
        fetchPODetails("");
    }
    else
    {
        $("#overlay").css("display", "block");
        setTimeout(
                function()
                {
                    $.ajax({
                        type: "GET",
                        url: serviceUrl,
                        contentType: "application/xml",
                        dataType: "xml",
                        async: true,
                        beforeSend: function() {
                            $("#overlay").css("display", "block");
                        },
                        error: function() {
                            $("#overlay").css("display", "none");
                        },
                        success: function(data, textStatus, jqXHR) {
                            fetchPODetails(data);
                        }
                    });
                }
        , 500);
    }
}
var parsedJsonPoData = "";
var itemNumber = "";

function fetchPODetails(xmlre)
{
//    var xmlString = XMLToString(xmlre); //Convert the XML Object to a String
//    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><POFetchOP>  <Message>Success</Message>  <GeneralData>    <PurchaseOrderNumber>9050083126</PurchaseOrderNumber>    <PurchaseOrderType>PO for Services</PurchaseOrderType>    <CompanyCode>0640</CompanyCode>    <ReferenceDocumentType></ReferenceDocumentType>    <ReferenceDocumentNumber></ReferenceDocumentNumber>    <ReferenceDocumentLine></ReferenceDocumentLine>    <VendorCode>0001103974</VendorCode>    <DocumentDate>2020-04-30</DocumentDate>    <PurchasingOrg>640</PurchasingOrg>    <PurchasingGrp>F02</PurchasingGrp>    <CollectiveNumber></CollectiveNumber>    <POCreatedDate>2020-04-30</POCreatedDate>  </GeneralData>  <PODeliveryInvoiceData>    <paymentTerms>COD0</paymentTerms>    <Currency>SGD</Currency>    <ExchangeRate>1.00000</ExchangeRate>    <ExchangeRateFixed>f</ExchangeRateFixed>    <Incoterms1>DEL</Incoterms1>    <Incoterms2>NATSTEEL</Incoterms2>    <GRMessage></GRMessage>  </PODeliveryInvoiceData>  <POLineItemData>    <ItemNumber>00010</ItemNumber>    <AccountAssignment>K</AccountAssignment>    <ItemCategory></ItemCategory>    <ShortText>H -</ShortText>    <Quantity>1.000</Quantity>    <PriceUnit>1</PriceUnit>    <Currency>SGD</Currency>    <MaterialGroup>REMA09</MaterialGroup>    <StorageLocation></StorageLocation>    <TrackingNumber>0017</TrackingNumber>    <GRProcTime>0</GRProcTime>    <MaterialCode></MaterialCode>    <Plant>6400</Plant>    <Unit>LE</Unit>    <GoodsReceipt>X</GoodsReceipt>    <GRNonVal></GRNonVal>    <AgreementLineItem>00000</AgreementLineItem>    <InfoRecord></InfoRecord>    <POUnit>LE</POUnit>    <PRLinkID>43450440</PRLinkID>    <Distribution></Distribution>    <PartialInvoiceIndicator>Derive from Account Assignment Category</PartialInvoiceIndicator>    <PackageNo>0002095980</PackageNo>    <TaxCode>BO</TaxCode>    <NetPrice>100.000000000</NetPrice>    <PRItemNumber>00010</PRItemNumber>    <PRNumber>9020092878</PRNumber>  </POLineItemData>  <POAccntAssignData>    <UnloadingPoint></UnloadingPoint>    <GLAccount>0008514928</GLAccount>    <COArea>0640</COArea>    <CostCenter>0640-53031</CostCenter>    <AccOrder></AccOrder>    <Asset></Asset>    <WBSElement></WBSElement>    <ItemNumber>00010</ItemNumber>    <Quantity>1.000</Quantity>    <Percentage>0.0</Percentage>    <Fund>NSH001</Fund>    <FunctionalArea>1000</FunctionalArea>    <FundsCentre>0640-53031</FundsCentre>    <CommitmentItem>8514928</CommitmentItem>    <Network></Network>    <PRLinkID>43450440</PRLinkID>    <SerialNo>01</SerialNo>  </POAccntAssignData>  <PODeliveryAddressData>    <Title></Title>    <Name1>Natsteel holdings</Name1>    <Name2>Natsteel holdings</Name2>    <Street>Tanjong Kling Road</Street>    <HouseNo>22</HouseNo>    <PostalCode>628048</PostalCode>    <City>Singapore</City>    <Country>SG</Country>    <Region></Region>    <LinkId>43450440</LinkId>    <ItemNo>00010</ItemNo>  </PODeliveryAddressData>  <PODeliveryScheduleData>    <DelDateCatg>D</DelDateCatg>    <DelDate>2020-04-21</DelDate>    <ScheduledQuantity>1.000</ScheduledQuantity>    <DelTime>00:00:00</DelTime>    <PRNumber>9020092878</PRNumber>    <ReqItemNo>00010</ReqItemNo>    <LinkId>43450440</LinkId>    <ItemNo>00010</ItemNo>  </PODeliveryScheduleData>  <POServiceData>    <ServiceNumber>REMA09003</ServiceNumber>    <ShortText>R&amp;amp;M - MECHANICAL - LABORS AND MATERIALS</ShortText>    <Quantity>10.000</Quantity>    <GrossPrice>10.0000</GrossPrice>    <OverfTolerance>0.0</OverfTolerance>    <LinkId>43450440</LinkId>    <ServiceLinkID>68577756</ServiceLinkID>    <PackageNo>0002095981</PackageNo>    <SubPackageNo>0000000000</SubPackageNo>    <LineNo>0000000002</LineNo>    <Distribution></Distribution>    <Base_UOM>EA</Base_UOM>  </POServiceData>  <POServiceRefData>    <PackageNo>0002095980</PackageNo>    <SubPackageNo>0002095981</SubPackageNo>    <LineNo>0000000001</LineNo>  </POServiceRefData>  <POAccntAssignvalData>    <Quantity>10.000</Quantity>    <Percentage>100.0</Percentage>    <CostCenter>0640-53031</CostCenter>    <Acc_Order></Acc_Order>    <Acc_Asset></Acc_Asset>    <Acc_WBSElement></Acc_WBSElement>    <Network></Network>    <CoArea>0640</CoArea>    <GLAccount>0008514928</GLAccount>    <CommitmentItem>8514928</CommitmentItem>    <Fund>NSH001</Fund>    <FundsCentre>0640-53031</FundsCentre>    <FunctionalArea>1000</FunctionalArea>    <PackageNo>0002095981</PackageNo>    <SerialNo>01</SerialNo>    <LineNo>0000000002</LineNo>    <SerNoLine>01</SerNoLine>  </POAccntAssignvalData>  <POCommunicationData>    <SalesPerson>dfghj</SalesPerson>    <YourReference></YourReference>    <Telephone>9684 1838</Telephone>    <OurReference></OurReference>    <Language>E</Language>  </POCommunicationData>  <PODeliveryData>    <OverDelTol>0.0</OverDelTol>    <UnderDelTol>0.0</UnderDelTol>    <ShippingInstructions></ShippingInstructions>    <StockType></StockType>    <FstRem_Exped>10</FstRem_Exped>    <SecRem_Exped>20</SecRem_Exped>    <ThrdRem_Exped>30</ThrdRem_Exped>    <ValuationType></ValuationType>    <RemShelfLife>0</RemShelfLife>    <QAControlLife></QAControlLife>    <PlDelTime></PlDelTime>    <GrProcTime>0</GrProcTime>    <IncoTerms1></IncoTerms1>    <IncoTerm2></IncoTerm2>    <GRNonVal></GRNonVal>    <DelvCompleted></DelvCompleted>    <Unlimited>X</Unlimited>    <ItemNumber>00010</ItemNumber>  </PODeliveryData>  <POInvoiceData>    <InvoiceReceipt>True</InvoiceReceipt>    <FinalInvoice>False</FinalInvoice>    <GRBasedIV>True</GRBasedIV>    <TaxCode>BO</TaxCode>    <LinkId>43450440</LinkId>    <ItemNumber>00010</ItemNumber>  </POInvoiceData>  <POConfirmationsData>    <ConfControl></ConfControl>    <OrderAck></OrderAck>    <ConfirmnReq></ConfirmnReq>    <RejectInd>S</RejectInd>    <ItemNo>00010</ItemNo>  </POConfirmationsData>  <POCondCtrlData>    <PrintPrice>X</PrintPrice>    <EstimatedPrice></EstimatedPrice>    <ItemNo>00010</ItemNo>  </POCondCtrlData>  <POLineItemCustomerData>    <ProductOrigin></ProductOrigin>    <Segment></Segment>  </POLineItemCustomerData>  <POHeaderTexts>    <PONoteToApprover>fghj</PONoteToApprover>  </POHeaderTexts>  <POItemTexts>    <ItemText>fghj</ItemText>    <ItemNumber>00010</ItemNumber>  </POItemTexts>  <POItemTexts>    <MaterialPOText></MaterialPOText>    <ItemNumber>00010</ItemNumber>  </POItemTexts>  <POItemTexts>    <PONoteToApprover></PONoteToApprover>    <ItemNumber>00010</ItemNumber>  </POItemTexts>  <POItemTexts></POItemTexts></POFetchOP>";
    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var x2js = new X2JS();
    var jsonPoData = JSON.stringify(x2js.xml_str2json(xmlString));
    // Error
    //    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"1"}}'; 

    // Vendor Name & Code
    // International Materials And  Techno logy (S) Pte Ltd (Imatech)-1100001

    // New Fetch Json for Service
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9050083372","PurchaseOrderType":"PO for Services","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F01","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000372","POCreatedDate":"2020-10-06","TotalPOAmount":"80.00","TotalPOAmtPOVendor":"80.00","PO_SequenceNO":"SPO-06-10-2020-168","RFQNo":"","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"SGD","ExchangeRate":"1.00000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"K","ItemCategory":"D","Criticality":"High Criticality (H)","ShortText":"H -","Quantity":"1.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-01","DeliveryDate":"2020-10-29","MaterialGroup":"REMA01","PurchasingGroup":"N18","StorageLocation":"","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"0","MaterialCode":"","Plant":"6400","Unit":"LE","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"","PurchasingOrganization":"640","POUnit":"LE","MaterialLongText":"","PRLinkID":"34399292","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0002098549","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9020092975","taxamount":"10.00","PR_PID":"PR-0000001623","RFQ_No":"","RFQ_ItemNo":"","immaterial":"","returnsitem":"","freeofcharge":""},"POAccntAssignData":{"AccountAssignmentCategory":"K","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514908","COArea":"0640","CostCenter":"0640-53030","AccOrder":"","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514908","Network":"","ActivityNumber":"","PRLinkID":"34399292","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"34399292","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"AU","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-09-01","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9020092975","ReqItemNo":"00010","LinkId":"34399292","ItemNo":"10","Statisticaldeliverydate":"2020-09-01","GRQty":"","openquantity":"1.000"},"POServiceData":{"LineItemNumber":"10","ServiceNumber":"REMA01099","ShortText":"DISMANTLE AIR CONDITIONER","Quantity":"10.000","Unit":"EA","GrossPrice":"1.0000","Currency":"SGD","NetPrice":"10.0","Edition":"0000","OverfTolerance":"0.0","CostCentre":"","GLCode":"","CommitmentItem":"","Fund":"","FundCenter":"","FunctionalArea":"","ServiceLongText":"TO PROVIDE NECESSARY SKILLED TECHNICIAN, TOOLS,  EQUIPMENT FOR DISMANTLING OF AIR CONDITIONER.","LinkId":"34399292","ServiceLinkID":"61201064","PackageNo":"0002098550","SubPackageNo":"0000000000","LineNo":"0000000003","Distribution":"Single Account Assignment","Base_UOM":"EA","DeleteFlag":"","actualquantity":"0.000"},"POServiceRefData":{"PackageNo":"0002098549","SubPackageNo":"0002098550","LineNo":"0000000001"},"POAccntAssignvalData":{"Distribution":"Single Account Assignment","Quantity":"10.000","Percentage":"100.0","ActivityNumber":"","LinkNumber":"","LinkID":"","NETVALUE":"10.00","CostCenter":"0640-53030","PRLinkID":"","Acc_Order":"","Acc_Asset":"","Acc_WBSElement":"","SalesOrder":"","Network":"","Activity":"","CoArea":"0640","GLAccount":"0008514908","UnloadingPoint":"","Recipient":"","CommitmentItem":"8514908","Fund":"NSH001","FundsCentre":"0640-53030","FunctionalArea":"1000","ItemNumber":"","DeliverySchedule":"","PackageNo":"0002098550","SerialNo":"01","LineNo":"3","SerNoLine":"01"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"0","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"34399292","Unlimited":"True","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"34399292","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"34399292","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"34399292","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"34399292","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"AU","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"sdfghj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"H -","InfoRecordPOText":"","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"34399292","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"LE","POQuantitySKU":"1.000","POQuantitySKUUnit":"","Order1":"1","OrderUnit1":"LE","Order2":"1","OrderUnit2":"LE","OrderPrice":"1","OrderPriceUnit":"LE","SKU":"0.000","SKUUnit":"","LinkID":"34399292","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"","netweight2Unit":"","grosswgtunit":"","grosswgt2unit":"","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"LE","grosswgtorderunit":"LE","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"LE","pointsorderunit":"LE"},"POMaterialData":{"ItemNo":"10","LinkId":"34399292","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"SGD","DeliveredCurrency":"SGD","StilltodelivCurrency":"SGD","InvoicedCurrency":"SGD","DownpaymtsCurrency":"SGD"}}}';

    // New Fetch Json for Material Single PR Line
    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0165A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153993","taxamount":"10.00","PR_PID":"PR-0000000013-process","RFQ_No":"","RFQ_ItemNo":"","immaterial":"0048A0001","returnsitem":"true","freeofcharge":"true"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';
//    Fetch Json for Component
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"","ItemCategory":"L","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0165A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153993","taxamount":"10.00","PR_PID":"PR-0000000013-process","RFQ_No":"","RFQ_ItemNo":"","immaterial":"0048A0001","returnsitem":"true","freeofcharge":"true"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';
    
//    New Fetch Json for Material Single RFQ Line
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0165A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153993","taxamount":"10.00","PR_PID":"PR-0000000013-process","RFQ_No":"GRFQ-26-09-20-0001","RFQ_ItemNo":"20","immaterial":"0048A0001","returnsitem":"true","freeofcharge":"true"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';
    
//    New Fetch Json for Material Multiple PO Line
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065561","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0680","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F01","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000376","POCreatedDate":"2020-10-06","TotalPOAmount":"310.00","TotalPOAmtPOVendor":"310.00","PO_SequenceNO":"GPO-06-10-2020-153","RFQNo":"","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"SGD","ExchangeRate":"1.00000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":[{"ItemNumber":"10","AccountAssignment":"K","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"10.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0048A0001","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"94605578","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153983","taxamount":"100.00","PR_PID":"PR-0000000012-process","RFQ_No":"","RFQ_ItemNo":"","immaterial":"0048A0001","returnsitem":"","freeofcharge":""},{"ItemNumber":"20","AccountAssignment":"K","ItemCategory":"","Criticality":"Select","ShortText":"COKE LANCING RUBBER BUSH","Quantity":"10.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0048A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054866","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"RUBBER BUSH FOR COKE LANCING, 34MM ID X 55MM (H) X 7MM THK (AS % SAMPLE B473457)","PRLinkID":"77717695","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00020","PRNumber":"9010153983","taxamount":"100.00","PR_PID":"PR-0000000013-process","RFQ_No":"GRFQ-21-10-20-0001","RFQ_ItemNo":"20","immaterial":"0048A0002","returnsitem":"true","freeofcharge":""}],"POAccntAssignData":[{"AccountAssignmentCategory":"K","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-22301","AccOrder":"","Asset":"","WBSElement":"","Quantity":"10.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"3000","FundsCentre":"0640-22301","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"94605578","SerialNo":"01","ItmNo":"10"},{"AccountAssignmentCategory":"K","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"","Asset":"","WBSElement":"","Quantity":"10.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"77717695","SerialNo":"01","ItmNo":"20"}],"PODeliveryAddressData":[{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"94605578","ItemNo":"10"},{"Title":"","Name1":"Natsteel Holdings","Name2":"Natsteel Holdings","Street":"22","HouseNo":"22","PostalCode":"628048","City":"628048","Country":"SG","Region":"","LinkId":"77717695","ItemNo":"20"}],"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"94605578","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"77717695","ItemNumber":"20","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":[{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"10.000","DelTime":"","PRNumber":"9010153983","ReqItemNo":"00010","LinkId":"94605578","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"10.000"},{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"10.000","DelTime":"","PRNumber":"9010153983","ReqItemNo":"00020","LinkId":"77717695","ItemNo":"20","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"10.000"}],"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":[{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"94605578","Unlimited":"False","ItemNumber":"00010"},{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"77717695","Unlimited":"False","ItemNumber":"00020"}],"POInvoiceData":[{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"94605578","ItemNumber":"10","SRVBasedIV":""},{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"77717695","ItemNumber":"20","SRVBasedIV":""}],"POConfirmationsData":[{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"94605578","ItemNumber":"10"},{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"77717695","ItemNumber":"20"}],"POCondCtrlData":[{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"94605578","ItemNumber":"10"},{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"77717695","ItemNumber":"20"}],"POLineItemCustomerData":[{"ProductOrigin":"","Segment":"","LinkId":"94605578","ItemNumber":"10"},{"ProductOrigin":"","Segment":"","LinkId":"77717695","ItemNumber":"20"}],"POConditionsData":[{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"100.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"gfhgjk","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":[{"PrnotetoApproval":"","ItemText":"When Account assignment category is A then internal order type should be RMA When Account assignment category is Z then internal ord","InfoRecordPOText":"","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"94605578","ItemNumber":"10"},{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"77717695","ItemNumber":""}],"POQuantityWeightsData":[{"POQuantity":"10.000","POQuantityUnit":"ST","POQuantitySKU":"10.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"94605578","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},{"POQuantity":"10.000","POQuantityUnit":"ST","POQuantitySKU":"10.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"77717695","ItemNumber":"20","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"}],"POMaterialData":[{"ItemNo":"10","LinkId":"94605578","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},{"ItemNo":"20","LinkId":"77717695","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"}],"POStatusData":{"Ordered":"20.0","Delivered":"0.0","Stilltodeliv":"20.0","Invoiced":"0.0","OrderedTotalPrice":"200.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"200.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"SGD","DeliveredCurrency":"SGD","StilltodelivCurrency":"SGD","InvoicedCurrency":"SGD","DownpaymtsCurrency":"SGD"}}}';

// New Fetch Json for Standalone Material Single PO Line
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0048A0001","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"","taxamount":"10.00","PR_PID":"PR-0000001677","RFQ_No":"","RFQ_ItemNo":"","immaterial":"0048A0001","returnsitem":"true","freeofcharge":"true"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';

// New Fetch Json for Standalone Material Single PO Line Distributed by per
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065567","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-07","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F01","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000382","POCreatedDate":"2020-10-07","TotalPOAmount":"8.00","TotalPOAmtPOVendor":"8.00","PO_SequenceNO":"GPO-07-10-2020-157","RFQNo":"","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"SGD","ExchangeRate":"1.00000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"K","ItemCategory":"","Criticality":"","ShortText":"SERAM CRANE RUBBER STOPPER","Quantity":"1.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"2020-10-07","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"F01","StorageLocation":"SC34","RequisitionerID":"","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0048A0001","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"X","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOPPER (AS PERSAMPLE)","PRLinkID":"88979725","Distribution":"Distrib. On Quantity Basis","PartialInvoiceIndicator":"Distribute Proportionally","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"1.000000000","PRItemNumber":"00000","PRNumber":"","taxamount":"1","PR_PID":"","RFQ_No":"","RFQ_ItemNo":"","immaterial":"0048A0001","returnsitem":"","freeofcharge":""},"POAccntAssignData":[{"AccountAssignmentCategory":"K","Distribution":"Distrib. On Quantity Basis","PartialInvoiceIndicator":"Distribute Proportionally","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"","Asset":"","WBSElement":"","Quantity":"0.500","Percentage":"50.0","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"88979725","SerialNo":"01","ItmNo":"10"},{"AccountAssignmentCategory":"K","Distribution":"Distrib. On Quantity Basis","PartialInvoiceIndicator":"Distribute Proportionally","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"","Asset":"","WBSElement":"","Quantity":"0.500","Percentage":"50.0","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"88979725","SerialNo":"02","ItmNo":"10"}],"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Natsteel holdings","HouseNo":"","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"88979725","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-07","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-07","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-07","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"88979725","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"","ReqItemNo":"00000","LinkId":"88979725","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"UAT Test","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"True","DelvCompleted":"False","LinkId":"88979725","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"88979725","ItemNumber":"10","SRVBasedIV":"False"},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"88979725","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"88979725","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"88979725","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"1.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-07","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-07","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-07","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-07","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-07","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"sdfdsf","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"88979725","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"88979725","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"88979725","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"1.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"1.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"SGD","DeliveredCurrency":"SGD","StilltodelivCurrency":"SGD","InvoicedCurrency":"SGD","DownpaymtsCurrency":"SGD"}}}';

//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9050083396","PurchaseOrderType":"PO for Services","UserId":"natsteel","CompanyCode":"0680","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"GEP ELECTRIC MOTOR (FE) PTE LTD","VendorCode":"0001100937","DocumentDate":"2020-10-21","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F02","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000427","POCreatedDate":"2020-10-21","TotalPOAmount":"16.00","TotalPOAmtPOVendor":"16.00","PO_SequenceNO":"SPO-21-10-2020-191","RFQNo":"","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"SGD","ExchangeRate":"1.00000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"K","ItemCategory":"D","Criticality":"Manpower (m)","ShortText":"h-sdfsdf","Quantity":"1.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"2020-10-21","DeliveryDate":"2020-10-31","MaterialGroup":"ADVE01","PurchasingGroup":"F02","StorageLocation":"","RequisitionerID":"","TrackingNumber":"0017","GRProcTime":"0","MaterialCode":"","Plant":"6400","Unit":"AU","GoodsReceipt":"True","GRNonVal":"False","AgreementLineItem":"00000","InfoRecord":"","PurchasingOrganization":"640","POUnit":"AU","MaterialLongText":"","PRLinkID":"91312261","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0002098694","TaxCode":"BO","DeleteFlag":"false","NetPrice":"16.000000000","PRItemNumber":"00000","PRNumber":"","taxamount":"16","PR_PID":"","RFQ_No":"","RFQ_ItemNo":"","immaterial":"","returnsitem":"False","freeofcharge":"","OPU":"AU"},"POAccntAssignData":{"AccountAssignmentCategory":"K","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008210201","COArea":"0640","CostCenter":"0640-53030","AccOrder":"","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8210201","Network":"","ActivityNumber":"","PRLinkID":"91312261","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Natsteel holdings","HouseNo":"","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"91312261","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","CondName":"Freight %","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","CondName":"Freight (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","CondName":"Freight/Quantity","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","CondName":"TM - Freight (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","CondName":"Packing charges.","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","CondName":"Commission (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","CondName":"Commission(Percenta)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","CondName":"Comission/Quantity","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","CondName":"Misc Charges","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","CondName":"Misc Charges Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","CondName":"Inland Transit Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","CondName":"Container Repair Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","CondName":"Weight Variance","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","CondName":"Bin Rental","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","CondName":"Security","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","CondName":"Insurance (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","CondName":"Insurance(Percentag)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","CondName":"Insurance( quntity)","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"AU","Denominator":"1","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","CondName":"Surveyor@ load port","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","CondName":"Surveyor@disc Port","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","CondName":"Stevedoring","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","CondName":"Cranage","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","CondName":"Timekeeper","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","CondName":"Jurong Port charges","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","CondName":"Haulier","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","CondName":"Incentive","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","CondName":"Loading Equipment","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","CondName":"Un Loading Equipment","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","CondName":"Marine Handling Chrg","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","CondName":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","CondName":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","CondName":"Taxes on the PO","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"91312261","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>","Denominator":"0","Uom_Extra":"<?xml version=\"1.0\"?><IGGetData_Output><Option>IGGetData</Option><Exception><MainCode>18</MainCode><TypeOfError>TEMPORARY</TypeOfError><Subject>No more records.</Subject></Exception></IGGetData_Output>"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-31","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"","ReqItemNo":"00000","LinkId":"91312261","ItemNo":"10","Statisticaldeliverydate":"2020-10-31","GRQty":"","openquantity":"1.000"},"POServiceData":{"LineItemNumber":"10","ServiceNumber":"ADVE01001","ShortText":"ADVERTISEMENT-RECRUITMENT","Quantity":"4.000","Unit":"EA","GrossPrice":"4.0000","Currency":"SGD","NetPrice":"16.0","Edition":"0000","OverfTolerance":"0.0","CostCentre":"","GLCode":"","CommitmentItem":"","Fund":"","FundCenter":"","FunctionalArea":"","ServiceLongText":"RECRUITMENT- ADVERTISEMENT.","LinkId":"91312261","ServiceLinkID":"61398551","PackageNo":"0002098695","SubPackageNo":"0000000000","LineNo":"0000000002","Distribution":"Distrib. On Quantity Basis","Base_UOM":"EA","DeleteFlag":"False","actualquantity":"0.000"},"POServiceRefData":{"PackageNo":"0002098694","SubPackageNo":"0002098695","LineNo":"0000000001"},"POAccntAssignvalData":[{"Distribution":"Distrib. On Quantity Basis","Quantity":"2.000","Percentage":"50.0","ActivityNumber":"","LinkNumber":"","LinkID":"","NETVALUE":"8.00","CostCenter":"0640-53030","PRLinkID":"","Acc_Order":"","Acc_Asset":"","Acc_WBSElement":"","SalesOrder":"","Network":"","Activity":"","CoArea":"0640","GLAccount":"0008210201","UnloadingPoint":"","Recipient":"","CommitmentItem":"8210201","Fund":"NSH001","FundsCentre":"0640-53030","FunctionalArea":"1000","ItemNumber":"","DeliverySchedule":"","PackageNo":"0002098695","SerialNo":"01","LineNo":"2","SerNoLine":"01"},{"Distribution":"Distrib. On Quantity Basis","Quantity":"2.000","Percentage":"50.0","ActivityNumber":"","LinkNumber":"","LinkID":"","NETVALUE":"8.00","CostCenter":"0640-53030","PRLinkID":"","Acc_Order":"","Acc_Asset":"","Acc_WBSElement":"","SalesOrder":"","Network":"","Activity":"","CoArea":"0640","GLAccount":"0008210201","UnloadingPoint":"","Recipient":"","CommitmentItem":"8210201","Fund":"NSH001","FundsCentre":"0640-53030","FunctionalArea":"1000","ItemNumber":"","DeliverySchedule":"","PackageNo":"0002098695","SerialNo":"01","LineNo":"2","SerNoLine":"02"}],"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"UAT Test","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"0","SecRem_Exped":"0","ThrdRem_Exped":"0","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"0","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"91312261","Unlimited":"True","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"91312261","ItemNumber":"10","SRVBasedIV":"False"},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"False","LinkId":"91312261","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"91312261","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"91312261","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"16.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-21","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"AU","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"16.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"sdf","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"","MaterialPOText":"h-sdfsdf","PONoteToApprover":"","DeliveryText":"","LinkId":"91312261","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"AU","POQuantitySKU":"1.000","POQuantitySKUUnit":"AU","Order1":"1","OrderUnit1":"AU","Order2":"1","OrderUnit2":"AU","OrderPrice":"1","OrderPriceUnit":"AU","SKU":"1","SKUUnit":"AU","LinkID":"91312261","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.000","grossweight2":"0.000","volume2":"0.000","points2":"0.000","netweightUnit":"","netweight2Unit":"","grosswgtunit":"","grosswgt2unit":"","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"AU","grosswgtorderunit":"AU","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"AU","pointsorderunit":"AU"},"POMaterialData":{"ItemNo":"10","LinkId":"91312261","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"16.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"16.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"SGD","DeliveredCurrency":"SGD","StilltodelivCurrency":"SGD","InvoicedCurrency":"SGD","DownpaymtsCurrency":"SGD"}}}';

//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040055740","PurchaseOrderType":"Local PO for Goods","UserId":"","CompanyCode":"0680","RequestType":"","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2017-08-21","DownpaymentReqd":"","value":"","InitiatorId":"","InitiatorEmailId":"","PurchasingOrg":"640","PurchasingGrp":"N05","CollectiveNumber":"","DownPaymentReqFor":"","PID":"","POCreatedDate":"2017-08-21","TotalPOAmount":"","TotalPOAmtPOVendor":"","PO_SequenceNO":"","RFQNo":"","Addtn_ValidFrom":"","Addtn_ValidTo":""},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"SGD","ExchangeRate":"1.00000","ExchangeRateFixed":"False","Incoterms1":"DEL","Incoterms2":"M5, GATE 4, 22 TANJONG KLING","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"","ShortText":"BEIRI HYDRAULIC PUMP 4002249","Quantity":"1.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"","DeliveryDate":"2017-10-23","MaterialGroup":"203","PurchasingGroup":"N05","StorageLocation":"SC34","RequisitionerID":"","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"2334123","Plant":"6400","Unit":"UNI","GoodsReceipt":"True","GRNonVal":"False","AgreementLineItem":"00000","InfoRecord":"5300049453","PurchasingOrganization":"640","POUnit":"UNI","MaterialLongText":"","PRLinkID":"69229453","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"P7","DeleteFlag":"false","NetPrice":"2295.000000000","PRItemNumber":"00010","PRNumber":"9010126596","taxamount":"","PR_PID":"","RFQ_No":"","RFQ_ItemNo":"","immaterial":"","returnsitem":"False","freeofcharge":"False","OPU":"UNI"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514928","COArea":"0640","CostCenter":"0640-65216","AccOrder":"MEC065220001","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-65216","CommitmentItem":"8514928","Network":"","ActivityNumber":"","PRLinkID":"69229453","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"NatSteel Holdings","Name2":"","Street":"22 Tanjong Kling Road","HouseNo":"","PostalCode":"628048","City":"","Country":"SG","Region":"","LinkId":"69229453","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PB00","CondName":"","Amount":"2295.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"2295.0","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"B","CalType":"C","CondCatg":"X","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"False","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","CondName":"Freight %","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","CondName":"Freight (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","CondName":"Freight/Quantity","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","CondName":"TM - Freight (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","CondName":"Packing charges.","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","CondName":"Commission (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","CondName":"Commission(Percenta)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","CondName":"Comission/Quantity","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","CondName":"Misc Charges","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","CondName":"Misc Charges Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","CondName":"Inland Transit Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","CondName":"Container Repair Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","CondName":"Weight Variance","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","CondName":"Bin Rental","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","CondName":"Security","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","CondName":"Insurance (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","CondName":"Insurance(Percentag)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","CondName":"Insurance( quntity)","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","CondName":"Surveyor@ load port","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","CondName":"Surveyor@disc Port","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","CondName":"Stevedoring","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","CondName":"Cranage","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","CondName":"Timekeeper","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","CondName":"Jurong Port charges","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","CondName":"Haulier","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","CondName":"Incentive","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","CondName":"Loading Equipment","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","CondName":"Un Loading Equipment","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","CondName":"Marine Handling Chrg","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","CondName":"","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","CondName":"","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","CondName":"Taxes on the PO","Amount":"160.650000000","CondPricUnit":"0","Currency":"SGD","CondVal":"160.65","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""}],"POPartnersData":{"Name":"LF","Number":"001101141H"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2017-10-23","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010126596","ReqItemNo":"00010","LinkId":"69229453","ItemNo":"10","Statisticaldeliverydate":"2017-10-23","GRQty":"1.000","openquantity":"0.0"},"POCommunicationData":{"SalesPerson":"LOUIS CHIA","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"0","SecRem_Exped":"0","ThrdRem_Exped":"0","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"69229453","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"P7","LinkId":"69229453","ItemNumber":"10","SRVBasedIV":"False"},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"False","LinkId":"69229453","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"69229453","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"69229453","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","CondName":"Taxes on the PO","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"160.65","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","CondName":"TM - Freight (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","CondName":"Bin Rental","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","CondName":"Un Loading Equipment","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","CondName":"","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","CondName":"Comission/Quantity","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","CondName":"Container Repair Qty","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","CondName":"Surveyor@disc Port","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","CondName":"Incentive","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","CondName":"Misc Charges","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","CondName":"Timekeeper","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","CondName":"","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","CondName":"Loading Equipment","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","CondName":"Freight/Quantity","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","CondName":"Jurong Port charges","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","CondName":"Freight (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","CondName":"Security","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","CondName":"Weight Variance","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","CondName":"Stevedoring","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","CondName":"Inland Transit Qty","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","CondName":"Insurance( quntity)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","CondName":"Misc Charges Qty","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","CondName":"Commission(Percenta)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","CondName":"Insurance (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","CondName":"Freight %","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","CondName":"Cranage","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","CondName":"Haulier","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","CondName":"Surveyor@ load port","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PB00","CondName":"","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"2295.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","CondName":"Commission (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","CondName":"Packing charges.","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","CondName":"Insurance(Percentag)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","CondName":"Marine Handling Chrg","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""}],"POVendorAddressData":{"Street":"7 TUAS AVENUE 8","HouseNumber":"","PostalCode":"639222","City":"SINGAPORE","Country":"SG","TelNo":"65-67417458","TelExt":"","FaxNo":"65-67410434","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"","MaterialPOText":"BEIRI HYDRAULIC PUMP PROOF LOADING, BKP701-3, 14-700-14, 0-250-P-C*00, P/N:4002249","PONoteToApprover":"","DeliveryText":"","LinkId":"69229453","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"UNI","POQuantitySKU":"1.000","POQuantitySKUUnit":"UNI","Order1":"1","OrderUnit1":"UNI","Order2":"1","OrderUnit2":"UNI","OrderPrice":"1","OrderPriceUnit":"UNI","SKU":"1","SKUUnit":"UNI","LinkID":"69229453","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.000","grossweight2":"0.000","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"UNI","grosswgtorderunit":"UNI","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"UNI","pointsorderunit":"UNI"},"POMaterialData":{"ItemNo":"10","LinkId":"69229453","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"1.0","Stilltodeliv":"0.0","Invoiced":"1.0","OrderedTotalPrice":"2295.0","DeliveredTotalPrice":"2295.0","StilltodelivTotalPrice":"0.0","InvoicedTotalPrice":"2295.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"SGD","DeliveredCurrency":"SGD","StilltodelivCurrency":"SGD","InvoicedCurrency":"SGD","DownpaymtsCurrency":"SGD"}}}';
    console.log("json: " + jsonPoData);

    parsedJsonPoData = $.parseJSON(jsonPoData);

//    var formatter = new Intl.NumberFormat('en-US', {
//        style: 'currency',
//        currency: 'USD'
//    });
//    console.log("formatter: " + formatter.format(2500000));

    var MainCode = parsedJsonPoData.POFetchOP.MainCode;
    var Message = parsedJsonPoData.POFetchOP.Message;
    console.log("MainCode: " + MainCode);
    console.log("Message: " + Message);

    if (Message === "Error" || Message === "error" || Number(MainCode) !== 0 || MainCode === undefined)
    {
        $("#overlay").css("display", "none");
        Lobibox.alert("error", {
            msg: "Failed to Fetch PO Details!"
        });
    }

    // General Data Starts
    $("#transactionInitiatedOn").text(parsedJsonPoData.POFetchOP.GeneralData.POCreatedDate);
    $("#creatorId").text(parsedJsonPoData.POFetchOP.GeneralData.InitiatorId);
    $("#creatorEmailId").text(parsedJsonPoData.POFetchOP.GeneralData.InitiatorEmailId);

    var PoFrom = $("#PoFrom").val();
    console.log("PoFrom: " + PoFrom);
    $("#addNewPrLineBtn").prop("disabled", false);
    $("#addRfqLineBtn").prop("disabled", false);
    $("#addEmptyPoLineBtn").prop("disabled", false);

    $("#PO_SequenceNO").val(parsedJsonPoData.POFetchOP.GeneralData.PO_SequenceNO);
    $("#requestType").val(parsedJsonPoData.POFetchOP.GeneralData.RequestType);
    $("#poNumber").val(parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderNumber);
    $("#Pid").val(parsedJsonPoData.POFetchOP.GeneralData.PID);
    $("#PoNumber").val(parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderNumber);
    $("#typeOfPOHeader").val(parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderType);
    if (parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderType === "Inter Company")
    {
        $("#validityFromHeaderDiv").css("display", "block");
        $("#validityToHeaderDiv").css("display", "block");

        var validityFromHeader = parsedJsonPoData.POFetchOP.GeneralData.Addtn_ValidFrom;
        var validityToHeader = parsedJsonPoData.POFetchOP.GeneralData.Addtn_ValidTo;
        console.log("validityFromHeader before: " + validityFromHeader);
        console.log("validityToHeader before: " + validityToHeader);

        if (validityFromHeader !== "" && validityFromHeader !== undefined)
        {
            var validityFromHeader_Date = validityFromHeader.split("-");
            var validityFromHeader_day = validityFromHeader_Date[2];
            var validityFromHeader_month = validityFromHeader_Date[1];
            var validityFromHeader_year = validityFromHeader_Date[0];

            validityFromHeader = validityFromHeader_day + "-" + validityFromHeader_month + "-" + validityFromHeader_year;
            console.log("validityFromHeader new: " + validityFromHeader);
            $('#validityFromHeader_div').datetimepicker({
                format: 'DD-MM-YYYY',
                minDate: new Date(),
                "defaultDate": new Date(validityFromHeader_year, validityFromHeader_month - 1, validityFromHeader_day)
            });
            //            $('#validityFromHeader_div').datetimepicker('refresh');
            console.log("Set from date");
        }
        if (validityToHeader !== "" && validityToHeader !== undefined)
        {
            var validityToHeader_Date = validityToHeader.split("-");
            var validityToHeader_day = validityToHeader_Date[2];
            var validityToHeader_month = validityToHeader_Date[1];
            var validityToHeader_year = validityToHeader_Date[0];

            validityToHeader = validityToHeader_day + "-" + validityToHeader_month + "-" + validityToHeader_year;
            console.log("validityToHeader new: " + validityToHeader);
            $('#validityToHeader_div').datetimepicker({
                format: 'DD-MM-YYYY',
                minDate: new Date(),
                "defaultDate": new Date(validityToHeader_year, validityToHeader_month - 1, validityToHeader_day)
            });
            //            $('#validityToHeader_div').datetimepicker('refresh');
            console.log("Set to date");
        }
    }
    else
    {
        $("#validityFromHeaderDiv").css("display", "none");
        $("#validityToHeaderDiv").css("display", "none");
    }
    $("#companycodeHeader").val(parsedJsonPoData.POFetchOP.GeneralData.CompanyCode);
    $("#CoCode").val(parsedJsonPoData.POFetchOP.GeneralData.CompanyCode);

    console.log("VendorCode: " + parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
    $("#editAmendPoVendorCode").val(parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
    console.log("before: findVendorByCompanyCode");
    $("#overlay").css("display", "block");
    setTimeout(
            function()
            {
                findVendorIdByVendorCode(parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
                findVendorByCompanyCode(parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
                //                $("#vendorcodeHeader").val(parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
                $('.selectpicker').selectpicker('refresh');
            }
    , 500);
    console.log("after: findVendorByCompanyCode");
    var vendorCode = parsedJsonPoData.POFetchOP.GeneralData.VendorCode;
    var vendorName = parsedJsonPoData.POFetchOP.GeneralData.VendorName;
    $("#rfqLineModalLabel").text("RFQ Lines finalized to " + vendorCode + "-" + vendorName);

    $("#docDateHeader").val(parsedJsonPoData.POFetchOP.GeneralData.DocumentDate);
    $("#referenceDocType").val(parsedJsonPoData.POFetchOP.GeneralData.ReferenceDocumentType);
    $("#referenceDocNumber").val(parsedJsonPoData.POFetchOP.GeneralData.ReferenceDocumentNumber);
    $("#referenceDocLine").val(parsedJsonPoData.POFetchOP.GeneralData.ReferenceDocumentLine);
    $("#downPaymentReqd").val(parsedJsonPoData.POFetchOP.GeneralData.DownpaymentReqd);
    $("#downPaymentReqdValue").val(parsedJsonPoData.POFetchOP.GeneralData.value);
    if (parsedJsonPoData.POFetchOP.GeneralData.isVendorAckReq === "true" || parsedJsonPoData.POFetchOP.GeneralData.isVendorAckReq === "True")
    {
        $("#isAckReq").prop("checked", true);
    }
    else
    {
        $("#isAckReq").prop("checked", false);
    }
    if (parsedJsonPoData.POFetchOP.GeneralData.DocumentDate !== "" && parsedJsonPoData.POFetchOP.GeneralData.DocumentDate !== undefined)
    {
        var docDate = $("#docDateHeader").val();
        var arr1 = docDate.split("-");
        var day = arr1[2].trim();
        var month = arr1[1].trim();
        var year = arr1[0].trim();
        var newDocDate = day + "-" + month + "-" + year;
        $("#docDateHeader").val(newDocDate);
    }
    //General Data End

    // Delivery/Invoice Data Starts
    if (parsedJsonPoData.POFetchOP.PODeliveryInvoiceData !== undefined)
    {
        $("#paymentDays1").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentindays1);
        $("#paymentPer1").val(Number(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentinpercnt1).toFixed(2));
        $("#paymentDays2").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentindays2);
        $("#paymentPer2").val(Number(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentinpercnt2).toFixed(2));
        $("#paymentDaysNet").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentindaysnet);
        $("#paymentTermsDelivery").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentTerms);
        $("#CurrencyDeliveryInvoice").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.Currency);
        $("#ExchangeRate").val(Number(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.ExchangeRate).toFixed(2));

        if (parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.ExchangeRateFixed === "true")
        {
            $("#ExchangeReateFixed").prop("checked", true);
        }
        else
        {
            $("#ExchangeReateFixed").prop("checked", false);
        }
        $("#IncoTermsPart1").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.Incoterms1);
        $("#IncoTermsPart2").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.Incoterms2);

        if (parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.GRMessage === "true")
        {
            $("#GRMessage").prop("checked", true);
        }
        else
        {
            $("#GRMessage").prop("checked", false);
        }
    }
    // Delivery/Invoice Data Ends

    // Communication Data Starts
    if (parsedJsonPoData.POFetchOP.POCommunicationData !== undefined)
    {
        $("#Salesperson").val(parsedJsonPoData.POFetchOP.POCommunicationData.SalesPerson);
        $("#YourReference").val(parsedJsonPoData.POFetchOP.POCommunicationData.YourReference);
        $("#Telephone").val(parsedJsonPoData.POFetchOP.POCommunicationData.Telephone);
        $("#OurReference").val(parsedJsonPoData.POFetchOP.POCommunicationData.OurReference);
        $("#Language").val(parsedJsonPoData.POFetchOP.POCommunicationData.Language);
    }
    // Communication Data End

    // Org. Data Starts 
    $("#purchasingOrg").val(parsedJsonPoData.POFetchOP.GeneralData.PurchasingOrg);
    $("#purchasingGroup").val(parsedJsonPoData.POFetchOP.GeneralData.PurchasingGrp);
    // Org. Data End

    // Vendor Address Data Starts
    if (parsedJsonPoData.POFetchOP.POVendorAddressData !== undefined)
    {
        $("#streetVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.Street);
        $("#houseNumberVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.HouseNumber);
        $("#postalCodeVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.PostalCode);
        $("#cityVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.City);
        $("#countryVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.Country);
        $("#telephoneVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.TelNo);
        $("#extTel").val(parsedJsonPoData.POFetchOP.POVendorAddressData.TelExt);
        $("#faxVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.FaxNo);
        $("#extFax").val(parsedJsonPoData.POFetchOP.POVendorAddressData.FaxExt);
    }
    // Vendor Address Data Ends

    // Additional Data Starts
    $("#CollectiveNumber").val(parsedJsonPoData.POFetchOP.GeneralData.CollectiveNumber);
    // Additional Data End

    // POHeaderTextData Starts
    console.log("parsedJsonPoData.POFetchOP.POHeaderTextData: " + parsedJsonPoData.POFetchOP.POHeaderTextData);
    if (parsedJsonPoData.POFetchOP.POHeaderTextData !== undefined)
    {
        $("#pONotetoApproverHeaderTextsLimits").val(parsedJsonPoData.POFetchOP.POHeaderTextData.PONoteToApprover);
        $("#HeaderNote").val(parsedJsonPoData.POFetchOP.POHeaderTextData.HeaderNote);
        $("#PricingTypes").val(parsedJsonPoData.POFetchOP.POHeaderTextData.PricingTypes);
        $("#Deadlines").val(parsedJsonPoData.POFetchOP.POHeaderTextData.Deadlines);
        $("#TermsofDelivery").val(parsedJsonPoData.POFetchOP.POHeaderTextData.TermsOfDelivery);
        $("#TermsofPayment").val(parsedJsonPoData.POFetchOP.POHeaderTextData.TermsOfPayment);
        $("#ShippingInstructions").val(parsedJsonPoData.POFetchOP.POHeaderTextData.ShippingInstructions);
        $("#VendorMemoGeneral").val(parsedJsonPoData.POFetchOP.POHeaderTextData.VendorMemoGeneral);
        $("#VendorMemoSpecial").val(parsedJsonPoData.POFetchOP.POHeaderTextData.VendorMemoSpecial);
        $("#headerText").val(parsedJsonPoData.POFetchOP.POHeaderTextData.Headertext === undefined ? "" : parsedJsonPoData.POFetchOP.POHeaderTextData.Headertext);
    }
    // POHeaderTextData Ends

    // PO Status Tab Data Starts
    console.log("parsedJsonPoData.POFetchOP.POStatusData: " + parsedJsonPoData.POFetchOP.POStatusData);
    if (parsedJsonPoData.POFetchOP.POStatusData !== undefined)
    {
        $("#ordered").val(formatNumberByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.Ordered).toFixed(3)));
        $("#delivered").val(formatNumberByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.Delivered).toFixed(3)));
        $("#stillToDeliv").val(formatNumberByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.Stilltodeliv).toFixed(3)));
        $("#invoiced").val(formatNumberByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.Invoiced).toFixed(3)));
        $("#downpayments").val(parsedJsonPoData.POFetchOP.POStatusData.Downpaymts);

        $("#orderedTotalPrice").val(formatAmountByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.OrderedTotalPrice).toFixed(2)));
        $("#deliveredTotalPrice").val(formatAmountByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.DeliveredTotalPrice).toFixed(2)));
        $("#stillToDelivTotalPrice").val(formatAmountByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.StilltodelivTotalPrice).toFixed(2)));
        $("#invoicedTotalPrice").val(formatAmountByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.InvoicedTotalPrice).toFixed(2)));
        $("#downpaymentsTotalPrice").val(formatAmountByComma(Number(parsedJsonPoData.POFetchOP.POStatusData.DownpaymtsTotalPrice).toFixed(2)));

        $("#orderedCurrency").val(parsedJsonPoData.POFetchOP.POStatusData.OrderedCurrency);
        $("#deliveredCurrency").val(parsedJsonPoData.POFetchOP.POStatusData.DeliveredCurrency);
        $("#stillToDelivCurrency").val(parsedJsonPoData.POFetchOP.POStatusData.StilltodelivCurrency);
        $("#invoicedCurrency").val(parsedJsonPoData.POFetchOP.POStatusData.InvoicedCurrency);
        $("#downpaymentsCurrency").val(parsedJsonPoData.POFetchOP.POStatusData.DownpaymtsCurrency);
    }
    // PO Status Tab Data Ends

    // POConditionsData Starts
    if (parsedJsonPoData.POFetchOP.POConditionsData !== undefined)
    {
        var POConditionsDataArray = parsedJsonPoData.POFetchOP.POConditionsData;
        console.log("POConditionsDataArray: " + POConditionsDataArray);
        console.log("POConditionsDataArray is Array: " + Array.isArray(POConditionsDataArray));
        if (POConditionsDataArray !== undefined) {
            if (Array.isArray(POConditionsDataArray) === true) {
                console.log("POConditionsDataArray len: " + POConditionsDataArray.length);
                var row = "";
                $("#conditionTableId tbody tr").remove();
                for (var i = 0; i < POConditionsDataArray.length; i++) {

                    row += "<tr>"
                            + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' disabled='true' value='" + (POConditionsDataArray[i].CondType === undefined ? "" : POConditionsDataArray[i].CondType) + "'><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex'></td>"
                            + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' disabled='true' value='" + (POConditionsDataArray[i].CondName === undefined ? "" : POConditionsDataArray[i].CondName) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' disabled='true' style='width: 150px;' value='" + (POConditionsDataArray[i].Amount === undefined || POConditionsDataArray[i].Amount === "" ? "" : formatAmountByComma(Number(POConditionsDataArray[i].Amount).toFixed(2))) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' disabled='true' value='" + (POConditionsDataArray[i].CondCrncy === undefined ? "" : POConditionsDataArray[i].CondCrncy) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' disabled='true' value='' style='width: 150px;'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled='true' value='" + (POConditionsDataArray[i].CondPricUnit === undefined ? "" : POConditionsDataArray[i].CondPricUnit) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' disabled='true' value='" + (POConditionsDataArray[i].CondUnit === undefined ? "" : POConditionsDataArray[i].CondUnit) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled='true' style='width: 150px;' value='" + (POConditionsDataArray[i].CondVal === undefined || POConditionsDataArray[i].CondVal === "" ? "" : formatAmountByComma(Number(POConditionsDataArray[i].CondVal).toFixed(2))) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' disabled='true' value='" + (POConditionsDataArray[i].Currency === undefined ? "" : POConditionsDataArray[i].Currency) + "'></td>"
                            + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value=''></td>"
                            + "<td>"
                            + "<input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value=''>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (POConditionsDataArray[i].Application === undefined ? "" : POConditionsDataArray[i].Application) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (POConditionsDataArray[i].AccountKey === undefined ? "" : POConditionsDataArray[i].AccountKey) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (POConditionsDataArray[i].Accruals === undefined ? "" : POConditionsDataArray[i].Accruals) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (POConditionsDataArray[i].CondCount === undefined ? "" : POConditionsDataArray[i].CondCount) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (POConditionsDataArray[i].CondSTNo === undefined ? "" : POConditionsDataArray[i].CondSTNo) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (POConditionsDataArray[i].CondChangeId === undefined ? "" : POConditionsDataArray[i].CondChangeId) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value=''>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value=''>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value=''>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value=''>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value=''></td>"
                            + "<td></td>"
                            + "</tr>";
                }
                $("#conditionTableId tbody").append(row);
            }
            else
            {
                var row = "";
                $("#conditionTableId tbody tr").remove();

                row += "<tr>"
                        + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' disabled='true' value='" + (POConditionsDataArray.CondType === undefined ? "" : POConditionsDataArray.CondType) + "'><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex'></td>"
                        + "<td><input type='text' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' disabled='true' value='" + (POConditionsDataArray.CondName === undefined ? "" : POConditionsDataArray.CondName) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' disabled='true' style='width: 150px;' value='" + (POConditionsDataArray.Amount === undefined || POConditionsDataArray.Amount === "" ? "" : formatAmountByComma(Number(POConditionsDataArray.Amount).toFixed(2))) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' disabled='true' value='" + (POConditionsDataArray.CondCrncy === undefined ? "" : POConditionsDataArray.CondCrncy) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' disabled='true' value='' style='width: 150px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' disabled='true' value='" + (POConditionsDataArray.CondPricUnit === undefined ? "" : POConditionsDataArray.CondPricUnit) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' disabled='true' value='" + (POConditionsDataArray.CondUnit === undefined ? "" : POConditionsDataArray.CondUnit) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' disabled='true' style='width: 150px;' value='" + (POConditionsDataArray.CondVal === undefined || POConditionsDataArray.CondVal === "" ? "" : formatAmountByComma(Number(POConditionsDataArray.CondVal).toFixed(2))) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' disabled='true' value='" + (POConditionsDataArray.Currency === undefined ? "" : POConditionsDataArray.Currency) + "'></td>"
                        + "<td><input type='text' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value=''></td>"
                        + "<td>"
                        + "<input type='text' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value=''>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (POConditionsDataArray.Application === undefined ? "" : POConditionsDataArray.Application) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (POConditionsDataArray.AccountKey === undefined ? "" : POConditionsDataArray.AccountKey) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (POConditionsDataArray.Accruals === undefined ? "" : POConditionsDataArray.Accruals) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (POConditionsDataArray.CondCount === undefined ? "" : POConditionsDataArray.CondCount) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (POConditionsDataArray.CondSTNo === undefined ? "" : POConditionsDataArray.CondSTNo) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (POConditionsDataArray.CondChangeId === undefined ? "" : POConditionsDataArray.CondChangeId) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value=''>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value=''>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value=''>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value=''>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value=''></td>"
                        + "<td></td>"
                        + "</tr>";

                $("#conditionTableId tbody").append(row);
            }
        }
    }
    // POConditionsData Ends

    // POServiceRefData Starts
    var POServiceRefDataArray = parsedJsonPoData.POFetchOP.POServiceRefData;
    console.log("POServiceRefDataArray: " + POServiceRefDataArray);
    console.log("POServiceRefDataArray is Array: " + Array.isArray(POServiceRefDataArray));
    // POServiceRefData Ends

    // POLineItemData Starts    
    var POLineItemDataArray = parsedJsonPoData.POFetchOP.POLineItemData;
    var poLineItemRow = "";
    var itemNumberSelect = "<option value=''>Select</option>";
    console.log("POLineItemDataArray: " + POLineItemDataArray);
    var Ref_Doc_Number = "";
    var Ref_Doc_Line = "";
    var poLineItemUomArray = [];

    if (POLineItemDataArray !== undefined) {
        $("#material_headerClass tbody tr").remove();
        $("#ItemNumberSelect option").remove();
        var typeOfPOHeader = $("#typeOfPOHeader").val();

        if (Array.isArray(POLineItemDataArray) === true) {
            console.log("POLineItemDataArray len: " + POLineItemDataArray.length);

            var prType = "";
            for (var i = 0; i < POLineItemDataArray.length; i++)
            {
                var randomNumberI = Math.floor(Math.random() * 100000);
                console.log("randomNumberI: " + randomNumberI);

                var insertionOrderId = "P" + (i + 1) + "_" + (randomNumberI * (i + 1));
                console.log("insertionOrderId: " + insertionOrderId);

                var prJsonObj = {};

                prJsonObj["ItemNumber"] = POLineItemDataArray[i].ItemNumber;
                prJsonObj["PRItemNumber"] = POLineItemDataArray[i].PRItemNumber;
                prJsonObj["PackageNo"] = POLineItemDataArray[i].PackageNo;
                prJsonObj["LinkId"] = POLineItemDataArray[i].PRLinkID;
                //                prJsonObj["InsertionOrderId"] = 'P' + (i + 1) + '_' + POLineItemDataArray[i].PRLinkID;
                prJsonObj["InsertionOrderId"] = insertionOrderId;

                PRLineItemArray.push(prJsonObj);

                var serviceRefLineNo = "";
                var prLineItemCategory = POLineItemDataArray[i].ItemCategory;
                var prAccAssCat = POLineItemDataArray[i].AccountAssignment;
                if (prLineItemCategory !== "D")
                {
                    $("#serviceTab_li").css("display", "none");
                    $("#limits_li").css("display", "none");

                    $("#PrType").val("Material");
                    PurchaseRequestType = "Material";

                    $("#services-tab").removeClass("active");
//                    $("#quantities").addClass("active");
//                    $("#quantities-tab").addClass("active");
                    $("#material").addClass("active");
                    $("#material-tab").addClass("active");

                    prType = "Capital PR for Materials";
                    
                    $("#ReplicateMainAccAssBtn").prop("disabled", false);
                }
                else
                {
                    PurchaseRequestType = "Service";
                    $("#PrType").val("Service");
                    prType = "Capital PR for Services";

                    if (prAccAssCat !== "U")
                        serviceRefLineNo = POServiceRefDataArray[i].LineNo;

                    if (prAccAssCat === "U" && typeOfPOHeader === "PO for Services") {
                        $("#validityFromHeaderDiv").css("display", "block");
                        $("#validityToHeaderDiv").css("display", "block");
                    } else {
                        $("#validityFromHeaderDiv").css("display", "none");
                        $("#validityToHeaderDiv").css("display", "none");
                    }
                    $("#ReplicateMainAccAssBtn").prop("disabled", true);
                }

                Ref_Doc_Number += "<option>" + POLineItemDataArray[i].PRNumber + "</option>";
                Ref_Doc_Line += "<option>" + POLineItemDataArray[i].PRItemNumber + "</option>";
                //                itemNumberSelect += "<option value='" + ('P' + (i + 1) + '_' + POLineItemDataArray[i].PRLinkID) + "'>" + POLineItemDataArray[i].ItemNumber + " - " + POLineItemDataArray[i].ShortText + "</option>";
                itemNumberSelect += "<option value='" + insertionOrderId + "'>" + POLineItemDataArray[i].ItemNumber + " - " + POLineItemDataArray[i].ShortText + "</option>";

                var prDeliveryDate = POLineItemDataArray[i].DeliveryDate;
                var prRequisitionDate = POLineItemDataArray[i].RequisitionDate;
                var prDeliveryDateNew = "";
                var prRequisitionDateNew = "";
                if (POLineItemDataArray[i].DeliveryDateCategory === "D")
                {
                    if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
                    {
                        var prDeliveryDateArr = prDeliveryDate.split("-");
                        var day = prDeliveryDateArr[2].trim();
                        var month = prDeliveryDateArr[1].trim();
                        var year = prDeliveryDateArr[0].trim();

                        prDeliveryDateNew = day + "." + month + "." + year;
                    }
                }
                if (prRequisitionDate !== "" && prRequisitionDate !== undefined)
                {
                    var prRequisitionDateArr = prRequisitionDate.split("-");
                    var day = prRequisitionDateArr[2].trim();
                    var month = prRequisitionDateArr[1].trim();
                    var year = prRequisitionDateArr[0].trim();

                    prRequisitionDateNew = day + "." + month + "." + year;
                }
                
                poLineItemUomArray.push(POLineItemDataArray[i].Unit);
                
                poLineItemRow += "<tr>"
                        + "<td><input type='checkbox' title='Select PR Line to delete' class='select-pr-to-delete' " + (POLineItemDataArray[i].DeleteFlag === 'true' ? 'checked' : '') + ">  "
                        + "<input type='hidden' class='insertionOrderId_Class' value='" + insertionOrderId + "'>"
                        + "<input type='hidden' class='linkId_Class' value='" + POLineItemDataArray[i].PRLinkID + "'>"
                        + "<input type='hidden' class='prType_Class' value='" + prType + "'>"
                        + "<input type='hidden' class='prNumber_Class' value='" + POLineItemDataArray[i].PRNumber + "'>"
                        + "<input type='hidden' class='PRItemNumber_Class' value='" + POLineItemDataArray[i].ItemNumber + "'>"
                        + "<input type='hidden' class='PRCompanyCode_Class' value='" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "'>"
                        + "<input type='hidden' class='PODistribution' value='" + POLineItemDataArray[i].Distribution + "'>"
                        + "<input type='hidden' class='POPartialInvoiceIndicator' value='" + POLineItemDataArray[i].PartialInvoiceIndicator + "'>"
                        + "<input type='hidden' class='ValuationPrice' value=''>"
                        + "<input type='hidden' class='POLineItemPackageNo' value='" + POLineItemDataArray[i].PackageNo + "'>" // New
                        + "<input type='hidden' class='POLineItemTaxCode' value='" + POLineItemDataArray[i].TaxCode + "'>"  // New
                        + "<input type='hidden' class='prMaterialCodeHidden' value='" + POLineItemDataArray[i].MaterialCode + "'>"
                        + "<input type='hidden' class='prDeliveryDateCategoryHidden' value='" + POLineItemDataArray[i].DeliveryDateCategory + "'>"
                        + "<input type='hidden' class='prRequisitionDateHidden' value='" + prRequisitionDateNew + "'>"
                        + "<input type='hidden' class='prCompanyCodeHidden' value='" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "'>"
                        + "<input type='hidden' class='prMaterialLongTextHidden' value='" + POLineItemDataArray[i].MaterialLongText + "'>"
                        + "<input type='hidden' class='isPrSaved' value='Yes'>"
                        + "<input type='hidden' class='procInstId_Class' value='" + POLineItemDataArray[i].PR_PID + "'>"
                        + "<input type='hidden' class='prCriticalityHidden' value='" + POLineItemDataArray[i].Criticality + "'>"
                        + "<input type='hidden' class='prTaxAmount' value='" + POLineItemDataArray[i].taxamount + "'>"
                        + "<input type='hidden' class='prPackageNo' value='" + POLineItemDataArray[i].PackageNo + "'>"
                        + "<input type='hidden' class='serviceRefLineNo' value='" + serviceRefLineNo + "'>"
                        + "<input type='hidden' class='lineType' value='O'>"
                        + "<input type='hidden' class='TexCodeForLineInPr'>"
                        + "<input type='hidden' class='SegmentForLineInPr'>"
                        + "<input type='hidden' class='isPoLineOrPrLineOrRfqLineOrEmptyLine' value='PoLine'>"
                        + "<input type='hidden' class='parentPrLineInsertionOrderId' value=''>" // New
                        + "<input type='hidden' class='prRfqNumber' value='" + (POLineItemDataArray[i].RFQ_No === undefined ? '' : POLineItemDataArray[i].RFQ_No) + "'>"
                        + "<input type='hidden' class='prRfqLineItemNumber' value='" + (POLineItemDataArray[i].RFQ_ItemNo === undefined ? '' : POLineItemDataArray[i].RFQ_ItemNo) + "'>"
                        + "<input type='hidden' class='quantityBeforeChange' value='" + (POLineItemDataArray[i].Quantity === undefined ? "" : POLineItemDataArray[i].Quantity) + "'>" // New
                        + "<input type='hidden' class='totalQuantityOfThisLine' value='" + (POLineItemDataArray[i].Quantity === undefined ? "" : POLineItemDataArray[i].Quantity) + "'>" // New
                        + "<input type='hidden' class='netPriceHidden' value='" + (POLineItemDataArray[i].NetPrice === undefined || POLineItemDataArray[i].NetPrice === "" ? "" : Number(POLineItemDataArray[i].NetPrice).toFixed(3)) + "'>" // New
                        + "<input type='hidden' class='prgLCode'>"
                        + "<input type='hidden' class='przGLCode'>"
                        + "<input type='hidden' class='prNetPriceHidden' value='" + (POLineItemDataArray[i].NetPrice === undefined || POLineItemDataArray[i].NetPrice === "" ? "" : Number(POLineItemDataArray[i].NetPrice).toFixed(3)) + "'>"
                        + "<input type='hidden' class='timeOfChangeCurrency' value='before'>"
                        + "</td>"
                        + "<td>" + POLineItemDataArray[i].ItemNumber + "</td>"
                        + "<td><input type='text' class='form-control form-rounded accountAssignmentClass' value='" + POLineItemDataArray[i].AccountAssignment + "' disabled='true' style='width:35px;'><input type='hidden' class='accountAssignmentDescClass'></td>"
                        + "<td><input type='text' class='form-control form-rounded itemCategoryClass' value='" + POLineItemDataArray[i].ItemCategory + "' disabled='true' style='width:35px;'><input type='hidden' class='itemCategoryDescClass'></td>"
                        + "<td><input type='text' class='materialCodeClass form-control form-rounded' value='" + (POLineItemDataArray[i].MaterialCode === undefined ? "" : POLineItemDataArray[i].MaterialCode) + "' style='width:100px;' disabled='true'></td>"
                        + "<td><input type='text' class='form-control form-rounded pr-short-text' value='" + (POLineItemDataArray[i].ShortText === undefined ? "" : POLineItemDataArray[i].ShortText) + "' " + (PurchaseRequestType === 'Material' ? 'disabled' : '') + " style='width:340px;'></td>"
                        + "<td><input type='text' class='form-control form-rounded pr-quantity' value='" + (POLineItemDataArray[i].Quantity === undefined ? "" : formatNumberByComma(Number(POLineItemDataArray[i].Quantity).toFixed(3))) + "' style='width:150px;'" + (PurchaseRequestType === 'Service' ? 'disabled' : '') + "></td>"
                        + "<td><input type='text' class='prUom form-control form-rounded' style='width:70px;' value='" + (POLineItemDataArray[i].Unit === undefined ? "" : POLineItemDataArray[i].Unit) + "' disabled='true'></td>"
                        + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value='" + (POLineItemDataArray[i].OPU === undefined ? "" : POLineItemDataArray[i].OPU) + "'></td>"
                        + "<td><input type='text' class='criticalityClass form-control form-rounded' value='" + (POLineItemDataArray[i].Criticality === undefined ? "" : POLineItemDataArray[i].Criticality) + "' style='width:150px;' disabled='true'></td>"
                        + "<td><input type='text' class='prDeliveryDateCat form-control form-rounded' value='" + (POLineItemDataArray[i].DeliveryDateCategory === undefined ? "" : POLineItemDataArray[i].DeliveryDateCategory) + "' readonly='true' style='width:40px;'></td>"
                        + "<td><span class='PR_DeliveryDate'>" + prDeliveryDateNew + "</span> <input type='hidden' class='prDeliveryDatepicker'></td>"
                        + "<td><input type='text' class='form-control form-rounded pr-net-price' value='" + (POLineItemDataArray[i].NetPrice === undefined || POLineItemDataArray[i].NetPrice === "" ? "" : formatAmountByComma(Number(POLineItemDataArray[i].NetPrice).toFixed(2))) + "' " + (PurchaseRequestType === 'Service' ? 'readonly' : '') + " style='width:150px;'></td>"
                        + "<td><input type='text' class='currencyClass form-control form-rounded' value='" + (POLineItemDataArray[i].Currency === undefined ? "" : POLineItemDataArray[i].Currency) + "' disabled='true' style='width:70px;'></td>"
                        + "<td><input type='text' class='priceUnitClass form-control form-rounded' value='" + (POLineItemDataArray[i].PriceUnit === undefined ? "" : formatAmountByComma(Number(POLineItemDataArray[i].PriceUnit).toFixed(2))) + "' disabled='true' style='width:150px;'></td>"
                        + "<td><input type='text' class='materialGroupClass form-control form-rounded' value='" + (POLineItemDataArray[i].MaterialGroup === undefined ? "" : POLineItemDataArray[i].MaterialGroup) + "' disabled='true' style='width:100px;'></td>"
                        + "<td><input type='text' class='hiddenPlantCode form-control form-rounded' value='" + (POLineItemDataArray[i].Plant === undefined ? "" : POLineItemDataArray[i].Plant) + "' disabled='true' style='width:70px;'></td>"
                        + "<td><input type='text' class='storageLocationClass form-control form-rounded' value='" + (POLineItemDataArray[i].StorageLocation === undefined ? "" : POLineItemDataArray[i].StorageLocation) + "' disabled='true' style='width:100px;'></td>"
                        + "<td></td>"
                        + "<td><input type='text' class='form-control form-rounded pr-tracking-number' value='" + (POLineItemDataArray[i].TrackingNumber === undefined ? "" : POLineItemDataArray[i].TrackingNumber) + "' style='width:70px;'></td>"
                        + "<td>" + (POLineItemDataArray[i].InfoRecord === undefined ? "" : POLineItemDataArray[i].InfoRecord) + "</td>"
                        + "<td><input type='text' class='purchaseOrganizationClass form-control form-rounded' value='" + (POLineItemDataArray[i].PurchasingOrganization === undefined ? "" : POLineItemDataArray[i].PurchasingOrganization) + "' disabled='true' style='width:70px;'></td>"
                        + "<td><input type='text' class='purchasingGroupClass form-control form-rounded' value='" + (POLineItemDataArray[i].PurchasingGroup === undefined ? "" : POLineItemDataArray[i].PurchasingGroup) + "' disabled='true' style='width:100px;'></td>"
                        + "<td>" + (POLineItemDataArray[i].PRNumber === undefined ? "" : POLineItemDataArray[i].PRNumber) + "</td>"
                        + "<td>" + (POLineItemDataArray[i].PRItemNumber === undefined ? "" : POLineItemDataArray[i].PRItemNumber) + "</td>"
                        + "<td><input type='text' class='form-control form-rounded pr-requisitioner-id' value='" + (POLineItemDataArray[i].RequisitionerID === undefined ? "" : POLineItemDataArray[i].RequisitionerID) + "' " + (PurchaseRequestType === 'Material' ? 'disabled' : '') + " style='width:200px;'></td>"
                        + "<td></td>"
                        + "<td><input type='text' class='prDeptNameClass form-control form-rounded' value='' disabled='true' style='width:200px;'></td>"
                        + "<td></td>"
                        + "<td></td>"
                        + "<td><input type='text' class='prImMaterial form-control form-rounded' style='width:100px;' readonly='true' value='" + (POLineItemDataArray[i].immaterial === undefined ? '' : POLineItemDataArray[i].immaterial) + "'></td>"
                        + "<td><input type='checkbox' class='prReturnsItem' " + (POLineItemDataArray[i].returnsitem === undefined ? '' : POLineItemDataArray[i].returnsitem === 'true' ? "checked" : '') + "></td>"
                        + "<td><input type='checkbox' class='prFreeOfCharge' " + (POLineItemDataArray[i].freeofcharge === undefined ? '' : POLineItemDataArray[i].freeofcharge === 'true' ? "checked" : '') + "></td>"
                        + "<td><input type='text' class='pr-rfq-Number form-control form-rounded' style='width:150px;' readonly='true' value='" + (POLineItemDataArray[i].RFQ_No === undefined ? '' : POLineItemDataArray[i].RFQ_No) + "'></td>"
                        + "<td><input type='text' class='pr-rfq-line-item-number form-control form-rounded' style='width:70px;' readonly='true' value='" + (POLineItemDataArray[i].RFQ_ItemNo === undefined ? '' : POLineItemDataArray[i].RFQ_ItemNo) + "'></td>"
                        + "<td></td>"
                        + "<td>"
                        //                            + (POLineItemDataArray[i].PRNumber === "" ? "" : "<button type='button' class='btn btn-primary btn-sm delete-pr-line-btn'>Delete</button>") 
                        + "</td>"
                        + "</tr>";
            }
            $("#ItemNumberSelect").append(itemNumberSelect);
            $("#material_headerClass tbody").append(poLineItemRow);
            // POLineItemData Ends
        }
        else
        {
            var randomNumber = Math.floor(Math.random() * 100000);
            console.log("randomNumber: " + randomNumber);

            var insertionOrderId = "P1" + "_" + randomNumber;
            console.log("insertionOrderId: " + insertionOrderId);

            var prJsonObj = {};

            prJsonObj["ItemNumber"] = POLineItemDataArray.ItemNumber;
            prJsonObj["PRItemNumber"] = POLineItemDataArray.PRItemNumber;
            prJsonObj["PackageNo"] = POLineItemDataArray.PackageNo;
            prJsonObj["LinkId"] = POLineItemDataArray.PRLinkID;
            //            prJsonObj["InsertionOrderId"] = 'P1_' + POLineItemDataArray.PRLinkID;
            prJsonObj["InsertionOrderId"] = 'P1_' + insertionOrderId;

            PRLineItemArray.push(prJsonObj);

            var serviceRefLineNo = "";
            var prLineItemCategory = POLineItemDataArray.ItemCategory;
            var prAccAssCat = POLineItemDataArray.AccountAssignment;
            if (prLineItemCategory !== "D")
            {
                $("#serviceTab_li").css("display", "none");
                $("#limits_li").css("display", "none");

                PurchaseRequestType = "Material";
                $("#PrType").val("Material");

                $("#services-tab").removeClass("active");
//                $("#quantities").addClass("active");
//                $("#quantities-tab").addClass("active");
                $("#material").addClass("active");
                $("#material-tab").addClass("active");

                prType = "Capital PR for Materials";
                
                $("#ReplicateMainAccAssBtn").prop("disabled", false);
            }
            else
            {
                PurchaseRequestType = "Service";
                $("#PrType").val("Service");
                prType = "Capital PR for Services";

                if (prAccAssCat !== "U")
                    serviceRefLineNo = POServiceRefDataArray.LineNo;

                if (prAccAssCat === "U" && typeOfPOHeader === "PO for Services") {
                    $("#validityFromHeaderDiv").css("display", "block");
                    $("#validityToHeaderDiv").css("display", "block");
                } else {
                    $("#validityFromHeaderDiv").css("display", "none");
                    $("#validityToHeaderDiv").css("display", "none");
                }
                $("#ReplicateMainAccAssBtn").prop("disabled", true);
            }

            Ref_Doc_Number += "<option>" + POLineItemDataArray.PRNumber + "</option>";
            Ref_Doc_Line += "<option>" + POLineItemDataArray.PRItemNumber + "</option>";
            itemNumberSelect += "<option value='" + insertionOrderId + "'>" + POLineItemDataArray.ItemNumber + " - " + POLineItemDataArray.ShortText + "</option>";

            var prDeliveryDate = POLineItemDataArray.DeliveryDate;
            var prRequisitionDate = POLineItemDataArray.RequisitionDate;
            var prDeliveryDateNew = "";
            var prRequisitionDateNew = "";
            if (POLineItemDataArray.DeliveryDateCategory === "D")
            {
                if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
                {
                    var prDeliveryDateArr = prDeliveryDate.split("-");
                    var day = prDeliveryDateArr[2].trim();
                    var month = prDeliveryDateArr[1].trim();
                    var year = prDeliveryDateArr[0].trim();

                    prDeliveryDateNew = day + "." + month + "." + year;
                }
            }
            if (prRequisitionDate !== "" && prRequisitionDate !== undefined)
            {
                var prRequisitionDateArr = prRequisitionDate.split("-");
                var day = prRequisitionDateArr[2].trim();
                var month = prRequisitionDateArr[1].trim();
                var year = prRequisitionDateArr[0].trim();

                prRequisitionDateNew = day + "." + month + "." + year;
            }
            
            poLineItemUomArray.push(POLineItemDataArray.Unit);
            
            poLineItemRow += "<tr>"
                    + "<td>"
                    + "<input type='hidden' class='insertionOrderId_Class' value='" + insertionOrderId + "'>"
                    + "<input type='hidden' class='linkId_Class' value='" + POLineItemDataArray.PRLinkID + "'>"
                    + "<input type='hidden' class='prType_Class' value='" + prType + "'>"
                    + "<input type='hidden' class='prNumber_Class' value='" + POLineItemDataArray.PRNumber + "'>"
                    + "<input type='hidden' class='PRItemNumber_Class' value='" + POLineItemDataArray.ItemNumber + "'>"
                    + "<input type='hidden' class='PRCompanyCode_Class' value='" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "'>"
                    + "<input type='hidden' class='PODistribution' value='" + POLineItemDataArray.Distribution + "'>"
                    + "<input type='hidden' class='POPartialInvoiceIndicator' value='" + POLineItemDataArray.PartialInvoiceIndicator + "'>"
                    + "<input type='hidden' class='ValuationPrice' value=''>"
                    + "<input type='hidden' class='POLineItemPackageNo' value='" + POLineItemDataArray.PackageNo + "'>"
                    + "<input type='hidden' class='POLineItemTaxCode' value='" + POLineItemDataArray.TaxCode + "'>"
                    + "<input type='hidden' class='prMaterialCodeHidden' value='" + POLineItemDataArray.MaterialCode + "'>"
                    + "<input type='hidden' class='prDeliveryDateCategoryHidden' value='" + POLineItemDataArray.DeliveryDateCategory + "'>"
                    + "<input type='hidden' class='prRequisitionDateHidden' value='" + prRequisitionDateNew + "'>"
                    + "<input type='hidden' class='prCompanyCodeHidden' value='" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "'>"
                    + "<input type='hidden' class='prMaterialLongTextHidden' value='" + POLineItemDataArray.MaterialLongText + "'>"
                    + "<input type='hidden' class='isPrSaved' value='Yes'>"
                    + "<input type='hidden' class='procInstId_Class' value='" + POLineItemDataArray.PR_PID + "'>"
                    + "<input type='hidden' class='prCriticalityHidden' value='" + POLineItemDataArray.Criticality + "'>"
                    + "<input type='hidden' class='prTaxAmount' value='" + POLineItemDataArray.taxamount + "'>"
                    + "<input type='hidden' class='prPackageNo' value='" + POLineItemDataArray.PackageNo + "'>"
                    + "<input type='hidden' class='serviceRefLineNo' value='" + serviceRefLineNo + "'>"
                    + "<input type='hidden' class='lineType' value='O'>"
                    + "<input type='hidden' class='TexCodeForLineInPr'>"
                    + "<input type='hidden' class='SegmentForLineInPr'>"
                    + "<input type='hidden' class='isPoLineOrPrLineOrRfqLineOrEmptyLine' value='PoLine'>"
                    + "<input type='hidden' class='parentPrLineInsertionOrderId' value=''>"
                    + "<input type='hidden' class='prRfqNumber' value='" + (POLineItemDataArray.RFQ_No === undefined ? "" : POLineItemDataArray.RFQ_No) + "'>"
                    + "<input type='hidden' class='prRfqLineItemNumber' value='" + (POLineItemDataArray.RFQ_ItemNo === undefined ? '' : POLineItemDataArray.RFQ_ItemNo) + "'>"
                    + "<input type='hidden' class='quantityBeforeChange' value='" + (POLineItemDataArray.Quantity === undefined ? "" : POLineItemDataArray.Quantity) + "'>"
                    + "<input type='hidden' class='totalQuantityOfThisLine' value='" + (POLineItemDataArray.Quantity === undefined ? "" : POLineItemDataArray.Quantity) + "'>"
                    + "<input type='hidden' class='netPriceHidden' value='" + (POLineItemDataArray.NetPrice === undefined || POLineItemDataArray.NetPrice === "" ? "" : Number(POLineItemDataArray.NetPrice).toFixed(3)) + "'>"
                    + "<input type='hidden' class='prgLCode'>"
                    + "<input type='hidden' class='przGLCode'>"
                    + "<input type='hidden' class='prNetPriceHidden' value='" + (POLineItemDataArray.NetPrice === undefined || POLineItemDataArray.NetPrice === "" ? "" : Number(POLineItemDataArray.NetPrice).toFixed(3)) + "'>"
                    + "<input type='hidden' class='timeOfChangeCurrency' value='before'>"
                    + "</td>"
                    + "<td>" + POLineItemDataArray.ItemNumber + "</td>"
                    + "<td><input type='text' class='form-control form-rounded accountAssignmentClass' value='" + POLineItemDataArray.AccountAssignment + "' disabled='true' style='width:35px;'><input type='hidden' class='accountAssignmentDescClass'></td>"
                    + "<td><input type='text' class='form-control form-rounded itemCategoryClass' value='" + POLineItemDataArray.ItemCategory + "' disabled='true' style='width:35px;'><input type='hidden' class='itemCategoryDescClass'></td>"
                    + "<td><input type='text' class='materialCodeClass form-control form-rounded' value='" + (POLineItemDataArray.MaterialCode === undefined ? "" : POLineItemDataArray.MaterialCode) + "' style='width:100px;' disabled='true'></td>"
                    + "<td><input type='text' class='form-control form-rounded pr-short-text' value='" + (POLineItemDataArray.ShortText === undefined ? "" : POLineItemDataArray.ShortText) + "' " + (PurchaseRequestType === 'Material' ? 'disabled' : '') + " style='width:340px;'></td>"
                    + "<td><input type='text' class='form-control form-rounded pr-quantity' value='" + (POLineItemDataArray.Quantity === undefined ? "" : formatNumberByComma(Number(POLineItemDataArray.Quantity).toFixed(3))) + "' style='width:150px;'" + (PurchaseRequestType === 'Service' ? 'disabled' : '') + "></td>"
                    + "<td><input type='text' class='prUom form-control form-rounded' style='width:70px;' value='" + (POLineItemDataArray.Unit === undefined ? "" : POLineItemDataArray.Unit) + "' disabled='true'></td>"
                    + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value='" + (POLineItemDataArray.OPU === undefined ? "" : POLineItemDataArray.OPU) + "'></td>"
                    + "<td><input type='text' class='criticalityClass form-control form-rounded' value='" + (POLineItemDataArray.Criticality === undefined ? "" : POLineItemDataArray.Criticality) + "' style='width:150px;' disabled='true'></td>"
                    + "<td><input type='text' class='prDeliveryDateCat form-control form-rounded' value='" + (POLineItemDataArray.DeliveryDateCategory === undefined ? "" : POLineItemDataArray.DeliveryDateCategory) + "' readonly='true' style='width:40px;'></td>"
                    + "<td><span class='PR_DeliveryDate'>" + prDeliveryDateNew + "</span> <input type='hidden' class='prDeliveryDatepicker'></td>"
                    + "<td><input type='text' class='form-control form-rounded pr-net-price' value='" + (POLineItemDataArray.NetPrice === undefined || POLineItemDataArray.NetPrice === "" ? "" : formatAmountByComma(Number(POLineItemDataArray.NetPrice).toFixed(2))) + "' " + (PurchaseRequestType === 'Service' ? 'readonly' : '') + " style='width:150px;'></td>"
                    + "<td><input type='text' class='currencyClass form-control form-rounded' value='" + (POLineItemDataArray.Currency === undefined ? "" : POLineItemDataArray.Currency) + "' disabled='true' style='width:70px;'></td>"
                    + "<td><input type='text' class='priceUnitClass form-control form-rounded' value='" + (POLineItemDataArray.PriceUnit === undefined ? "" : formatAmountByComma(Number(POLineItemDataArray.PriceUnit).toFixed(2))) + "' disabled='true' style='width:150px;'></td>"
                    + "<td><input type='text' class='materialGroupClass form-control form-rounded' value='" + (POLineItemDataArray.MaterialGroup === undefined ? "" : POLineItemDataArray.MaterialGroup) + "' disabled='true' style='width:100px;'></td>"
                    + "<td><input type='text' class='hiddenPlantCode form-control form-rounded' value='" + (POLineItemDataArray.Plant === undefined ? "" : POLineItemDataArray.Plant) + "' disabled='true' style='width:70px;'></td>"
                    + "<td><input type='text' class='storageLocationClass form-control form-rounded' value='" + (POLineItemDataArray.StorageLocation === undefined ? "" : POLineItemDataArray.StorageLocation) + "' disabled='true' style='width:100px;'></td>"
                    + "<td></td>"
                    + "<td><input type='text' class='form-control form-rounded pr-tracking-number' value='" + (POLineItemDataArray.TrackingNumber === undefined ? "" : POLineItemDataArray.TrackingNumber) + "' style='width:70px;'></td>"
                    + "<td>" + (POLineItemDataArray.InfoRecord === undefined ? "" : POLineItemDataArray.InfoRecord) + "</td>"
                    + "<td><input type='text' class='purchaseOrganizationClass form-control form-rounded' value='" + (POLineItemDataArray.PurchasingOrganization === undefined ? "" : POLineItemDataArray.PurchasingOrganization) + "' disabled='true' style='width:70px;'></td>"
                    + "<td><input type='text' class='purchasingGroupClass form-control form-rounded' value='" + (POLineItemDataArray.PurchasingGroup === undefined ? "" : POLineItemDataArray.PurchasingGroup) + "' disabled='true' style='width:100px;'></td>"
                    + "<td>" + (POLineItemDataArray.PRNumber === undefined ? "" : POLineItemDataArray.PRNumber) + "</td>"
                    + "<td>" + (POLineItemDataArray.PRItemNumber === undefined ? "" : POLineItemDataArray.PRItemNumber) + "</td>"
                    + "<td><input type='text' class='form-control form-rounded pr-requisitioner-id' value='" + (POLineItemDataArray.RequisitionerID === undefined ? "" : POLineItemDataArray.RequisitionerID) + "' " + (PurchaseRequestType === 'Material' ? 'disabled' : '') + " style='width:200px;'></td>"
                    + "<td></td>"
                    + "<td><input type='text' class='prDeptNameClass form-control form-rounded' value='' disabled='true' style='width:200px;'></td>"
                    + "<td></td>"
                    + "<td></td>"
                    + "<td><input type='text' class='prImMaterial form-control form-rounded' style='width:100px;' readonly='true' value='" + (POLineItemDataArray.immaterial === undefined ? "" : POLineItemDataArray.immaterial) + "'></td>"
                    + "<td><input type='checkbox' class='prReturnsItem' " + (POLineItemDataArray.returnsitem === undefined ? "" : POLineItemDataArray.returnsitem === 'true' ? "checked" : "") + "></td>"
                    + "<td><input type='checkbox' class='prFreeOfCharge' " + (POLineItemDataArray.freeofcharge === undefined ? "" : POLineItemDataArray.freeofcharge === 'true' ? "checked" : "") + "></td>"
                    + "<td><input type='text' class='pr-rfq-Number form-control form-rounded' style='width:150px;' readonly='true' value='" + (POLineItemDataArray.RFQ_No === undefined ? "" : POLineItemDataArray.RFQ_No) + "'></td>"
                    + "<td><input type='text' class='pr-rfq-line-item-number form-control form-rounded' style='width:70px;' readonly='true' value='" + (POLineItemDataArray.RFQ_ItemNo === undefined ? '' : POLineItemDataArray.RFQ_ItemNo) + "'></td>"
                    + "<td></td>"
                    + "<td>"
                    //                        + (POLineItemDataArray.PRNumber === "" ? "" : "<button type='button' class='btn btn-primary btn-sm delete-pr-line-btn'>Delete</button>")
                    + "</td>"
                    + "</tr>";

            $("#ItemNumberSelect").append(itemNumberSelect);
            $("#material_headerClass tbody").append(poLineItemRow);
        }
        $("#referenceDocNumber").append(Ref_Doc_Number);
        $("#referenceDocLine").append(Ref_Doc_Line);

        refreshPrDelvDatepicker();
        hidePoLineTableColsByPoType();
        hideDeliveryTabFieldsByPoType();

        if (PurchaseRequestType === "Service")
        {
            makeAccountAssignmentTabFormFieldReadonly();
        }
        else
        {
            makeAccountAssignmentTabFormFieldNonReadonly();
        }
        
        // Set Status Tab Fields Starts
//        poLineItemUomArray.push("T");
        console.log("poLineItemUomArray 1: " + poLineItemUomArray);
        if (PurchaseRequestType === "Material") {
            if(poLineItemUomArray.length > 0) {
                poLineItemUomArray = poLineItemUomArray.filter((value, index) => poLineItemUomArray.indexOf(value) === index);
                console.log("poLineItemUomArray 2: " + poLineItemUomArray);
            }
            if(poLineItemUomArray.length === 1) {
                $("#orderedUnit").val(poLineItemUomArray[0]);
                $("#deliveredUnit").val(poLineItemUomArray[0]);
                $("#stillToDelivUnit").val(poLineItemUomArray[0]);
                $("#invoicedUnit").val(poLineItemUomArray[0]);
                $("#downpaymentsUnit").val(poLineItemUomArray[0]);
            } else {
                $("#orderedUnit").val("");
                $("#deliveredUnit").val("");
                $("#stillToDelivUnit").val("");
                $("#invoicedUnit").val("");
                $("#downpaymentsUnit").val("");

                $("#ordered").val("");
                $("#delivered").val("");
                $("#stillToDeliv").val("");
                $("#invoiced").val("");
                $("#downpayments").val("");

                $("#orderedUnit").css("visibility", "hidden");
                $("#deliveredUnit").css("visibility", "hidden");
                $("#stillToDelivUnit").css("visibility", "hidden");
                $("#invoicedUnit").css("visibility", "hidden");
                $("#downpaymentsUnit").css("visibility", "hidden");

                $("#ordered").css("visibility", "hidden");
                $("#delivered").css("visibility", "hidden");
                $("#stillToDeliv").css("visibility", "hidden");
                $("#invoiced").css("visibility", "hidden");
                $("#downpayments").css("visibility", "hidden");
            }
        }
        if (PurchaseRequestType === "Service")
        {
            $("#orderedUnit").val("");
            $("#deliveredUnit").val("");
            $("#stillToDelivUnit").val("");
            $("#invoicedUnit").val("");
            $("#downpaymentsUnit").val("");
            
            $("#ordered").val("");
            $("#delivered").val("");
            $("#stillToDeliv").val("");
            $("#invoiced").val("");
            $("#downpayments").val("");
            
            $("#orderedUnit").css("visibility", "hidden");
            $("#deliveredUnit").css("visibility", "hidden");
            $("#stillToDelivUnit").css("visibility", "hidden");
            $("#invoicedUnit").css("visibility", "hidden");
            $("#downpaymentsUnit").css("visibility", "hidden");
            
            $("#ordered").css("visibility", "hidden");
            $("#delivered").css("visibility", "hidden");
            $("#stillToDeliv").css("visibility", "hidden");
            $("#invoiced").css("visibility", "hidden");
            $("#downpayments").css("visibility", "hidden");
        }
        // Set Status Tab Fields Ends
    }
    // POLineItemData Ends

    console.log("PRLineItemArray.length: " + PRLineItemArray.length);
    var poNumber = $("#poNumber").val();
    console.log("poNumber: " + poNumber);
    setTimeout(
            function()
            {
                savePrLineLevelData(poNumber);
            }
    , 500);
}
function savePrLineLevelData(poNumber)
{
    console.log("In savePrLineLevelData: " + poNumber);
    if (poNumber !== "")
    {
        var POLineLevelDataAsJson = {};
        POLineLevelDataAsJson["PoId"] = poNumber.toString().trim();

        console.log("poNumber: " + poNumber);

        var POInvoiceDataJsonArray = [];
        var POServiceDataJsonArray = [];
        var POLineItemConditionDataJsonArray = [];
        var POAccAssDataJsonArray = [];
        var PODeliveryAddressDataJsonArray = [];
        var PODeliveryDataJsonArray = [];
        var POConfirmationDataJsonArray = [];
        var POCondCtrlDataJsonArray = [];
        var POServiceAccAssDataJsonArray = [];
        var POQuantityWeightsDataJsonArray = [];
        var PODeliveryScheduleDataJsonArray = [];
        var POLimitsDataJsonArray = [];
        var POTextsDataJsonArray = [];
        var POLineItemCustomerDataJsonArray = [];
        var POMaterialDataJsonArray = [];
        var POComponentsDataJsonArray = [];
        var POProfitabilitySegmentDetailsDataJsonArray = [];

        $("#material_headerClass tbody tr").each(function(index) {
            var POLineItemDataLinkId = $(this).find("td").eq(0).children(".linkId_Class").val();
            var itemNumber = $(this).find("td").eq(0).children(".PRItemNumber_Class").val();
            var PrLineItemPackageNo = $(this).find("td").eq(0).children(".POLineItemPackageNo").val();
            var PrInsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var PrAccAss = $(this).find("td").eq(2).children(".accountAssignmentClass").val();

            console.log("POLineItemDataLinkId: " + POLineItemDataLinkId);
            console.log("itemNumber: " + itemNumber);
            console.log("PrLineItemPackageNo: " + PrLineItemPackageNo);
            console.log("PrInsertionOrderId: " + PrInsertionOrderId);
            console.log("PrAccAss: " + PrAccAss);

            //POInvoiceData Starts
            var POInvoiceDataArray = parsedJsonPoData.POFetchOP.POInvoiceData;
            console.log("POInvoiceDataArray: " + POInvoiceDataArray);
            console.log("POInvoiceDataArray is Array: " + Array.isArray(POInvoiceDataArray));
            if (POInvoiceDataArray !== undefined) {
                if (Array.isArray(POInvoiceDataArray) === true) {
                    console.log("POInvoiceDataArray len: " + POInvoiceDataArray.length);
                    for (var i = 0; i < POInvoiceDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POInvoiceDataArray[i].LinkId)
                        {
                            var POInoiceDataJsonObject = {};

                            var SRVBasedIV = "false";
                            if (POInvoiceDataArray[i].GRBasedIV === "true" || POInvoiceDataArray[i].GRBasedIV === "True")
                            {
                                SRVBasedIV = "true";
                            }
                            POInoiceDataJsonObject["TaxCode"] = POInvoiceDataArray[i].TaxCode;
                            POInoiceDataJsonObject["DPCategory"] = POInvoiceDataArray[i].DPCategory;
                            POInoiceDataJsonObject["InvoiceReceipt"] = POInvoiceDataArray[i].InvoiceReceipt;
                            POInoiceDataJsonObject["FinalInvoice"] = POInvoiceDataArray[i].FinalInvoice;
                            POInoiceDataJsonObject["GRBasedIV"] = POInvoiceDataArray[i].GRBasedIV;
                            POInoiceDataJsonObject["ItemNumber"] = POInvoiceDataArray[i].ItemNumber;
                            POInoiceDataJsonObject["LineItemNumber"] = PrInsertionOrderId;
                            POInoiceDataJsonObject["LinkId"] = POInvoiceDataArray[i].LinkId;
                            POInoiceDataJsonObject["SRVBasedIV"] = SRVBasedIV;

                            POInvoiceDataJsonArray.push(POInoiceDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POInvoiceDataArray.LinkId)
                    {
                        var POInoiceDataJsonObject = {};

                        var SRVBasedIV = "false";
                        if (POInvoiceDataArray.GRBasedIV === "true" || POInvoiceDataArray.GRBasedIV === "True")
                        {
                            SRVBasedIV = "true";
                        }
                        POInoiceDataJsonObject["TaxCode"] = POInvoiceDataArray.TaxCode;
                        POInoiceDataJsonObject["DPCategory"] = POInvoiceDataArray.DPCategory;
                        POInoiceDataJsonObject["InvoiceReceipt"] = POInvoiceDataArray.InvoiceReceipt;
                        POInoiceDataJsonObject["FinalInvoice"] = POInvoiceDataArray.FinalInvoice;
                        POInoiceDataJsonObject["GRBasedIV"] = POInvoiceDataArray.GRBasedIV;
                        POInoiceDataJsonObject["ItemNumber"] = POInvoiceDataArray.ItemNumber;
                        POInoiceDataJsonObject["LineItemNumber"] = PrInsertionOrderId;
                        POInoiceDataJsonObject["LinkId"] = POInvoiceDataArray.LinkId;
                        POInoiceDataJsonObject["SRVBasedIV"] = SRVBasedIV;

                        POInvoiceDataJsonArray.push(POInoiceDataJsonObject);
                    }
                }
            }
            console.log("POInvoiceDataJsonArray len: " + POInvoiceDataJsonArray.length);
            //POInvoiceData Ends

            // POServiceData Starts

            var POLineItemPackageNo = findDataOfPrLineItem(parsedJsonPoData, "PackageNo", itemNumber);
            console.log("POLineItemPackageNo: " + POLineItemPackageNo);

            var POServiceRefDataArray = parsedJsonPoData.POFetchOP.POServiceRefData;
            console.log("POServiceRefDataArray: " + POServiceRefDataArray);
            console.log("POServiceRefDataArray is Array: " + Array.isArray(POServiceRefDataArray));

            var POServiceDataArray = parsedJsonPoData.POFetchOP.POServiceData;
            console.log("POServiceDataArray: " + POServiceDataArray);
            console.log("POServiceDataArray is Array: " + Array.isArray(POServiceDataArray));

            var POAccntAssignvalDataArray = parsedJsonPoData.POFetchOP.POAccntAssignvalData;
            console.log("POAccntAssignvalDataArray: " + POAccntAssignvalDataArray);
            console.log("POAccntAssignvalDataArray is Array: " + Array.isArray(POAccntAssignvalDataArray));

            //            alert("POLineItemPackageNo: " + POLineItemPackageNo);

            if (POServiceRefDataArray !== undefined) {
                if (Array.isArray(POServiceRefDataArray) === true) {
                    console.log("POServiceRefDataArray len: " + POServiceRefDataArray.length);
                    for (var i = 0; i < POServiceRefDataArray.length; i++) {
                        var PackageNo = POServiceRefDataArray[i].PackageNo;
                        var SubPackageNo = POServiceRefDataArray[i].SubPackageNo;
                        if (PackageNo === POLineItemPackageNo) {
                            if (POServiceDataArray !== undefined) {
                                if (Array.isArray(POServiceDataArray) === true) {
                                    console.log("POServiceDataArray len: " + POServiceDataArray.length);
                                    for (var i = 0; i < POServiceDataArray.length; i++) {
                                        if (POServiceDataArray[i].PackageNo === SubPackageNo)
                                        {
                                            console.log("POServiceDataArray[i].PackageNo: " + POServiceDataArray[i].PackageNo);
                                            var POServiceDataAsJsonObject = {};

                                            POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                            POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                            POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                            POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                            POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray[i].PackageNo === undefined ? "" : POServiceDataArray[i].PackageNo);
                                            POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                            POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray[i].ShortText === undefined ? "" : POServiceDataArray[i].ShortText);
                                            POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray[i].Quantity === undefined ? "" : POServiceDataArray[i].Quantity);
                                            POServiceDataAsJsonObject["Unit"] = (POServiceDataArray[i].Unit === undefined ? "" : POServiceDataArray[i].Unit);
                                            POServiceDataAsJsonObject["Currency"] = (POServiceDataArray[i].Currency === undefined ? "" : POServiceDataArray[i].Currency);
                                            POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray[i].NetPrice === undefined ? "" : POServiceDataArray[i].NetPrice);
                                            POServiceDataAsJsonObject["Edition"] = (POServiceDataArray[i].Edition === undefined ? "" : POServiceDataArray[i].Edition);
                                            POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray[i].LineItemLongText === undefined ? "" : POServiceDataArray[i].LineItemLongText);
                                            POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray[i].OverfTolerance === undefined ? "" : POServiceDataArray[i].OverfTolerance);
                                            POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray[i].GrossPrice === undefined ? "" : POServiceDataArray[i].GrossPrice);
                                            POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);
                                            POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray[i].Distribution === undefined ? "" : POServiceDataArray[i].Distribution);
                                            POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray[i].ServiceLinkID === undefined ? "" : POServiceDataArray[i].ServiceLinkID);
                                            POServiceDataAsJsonObject["LineNo"] = (POServiceDataArray[i].LineNo === undefined ? "" : POServiceDataArray[i].LineNo);
                                            POServiceDataAsJsonObject["ActualQuantity"] = (POServiceDataArray[i].actualquantity === undefined ? "" : POServiceDataArray[i].actualquantity);
                                            POServiceDataAsJsonObject["ServiceLongText"] = (POServiceDataArray[i].ServiceLongText === undefined ? "" : POServiceDataArray[i].ServiceLongText);

                                            POServiceDataJsonArray.push(POServiceDataAsJsonObject);

                                            for (var j = 0; j < POAccntAssignvalDataArray.length; j++)
                                            {
                                                var POServiceAccAssDataAsJsonObject = {};

                                                //                                                if (POServiceDataArray[i].PackageNo === POAccntAssignvalDataArray[j].PackageNo)
                                                if (Number(POServiceDataArray[i].LineNo) === Number(POAccntAssignvalDataArray[j].LineNo) && POServiceDataArray[i].PackageNo === POAccntAssignvalDataArray[j].PackageNo)
                                                {
                                                    console.log("POAccntAssignvalDataArray[i].PackageNo: " + POAccntAssignvalDataArray[j].PackageNo);
                                                    //                                                    alert("POServiceDataArray[i].PackageNo: " + POServiceDataArray[i].PackageNo + ", POAccntAssignvalDataArray[i].PackageNo: " + POAccntAssignvalDataArray[j].PackageNo);

                                                    POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray[j].PackageNo === undefined ? "" : POAccntAssignvalDataArray[j].PackageNo);
                                                    POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray[j].Quantity === "" ? "" : POAccntAssignvalDataArray[j].Quantity);
                                                    POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray[j].Percentage === "" ? "" : POAccntAssignvalDataArray[j].Percentage);
                                                    POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray[j].GLAccount === "" ? "" : POAccntAssignvalDataArray[j].GLAccount);
                                                    POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray[j].CoArea === "" ? "" : POAccntAssignvalDataArray[j].CoArea);
                                                    POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray[j].CostCenter === "" ? "" : POAccntAssignvalDataArray[j].CostCenter);
                                                    POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray[j].Fund === "" ? "" : POAccntAssignvalDataArray[j].Fund);
                                                    POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray[j].FunctionalArea === "" ? "" : POAccntAssignvalDataArray[j].FunctionalArea);
                                                    POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray[j].FundsCentre === "" ? "" : POAccntAssignvalDataArray[j].FundsCentre);
                                                    POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray[j].CommitmentItem === "" ? "" : POAccntAssignvalDataArray[j].CommitmentItem);
                                                    POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray[j].Acc_Order === "" ? "" : POAccntAssignvalDataArray[j].Acc_Order);
                                                    POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray[j].Acc_Asset === "" ? "" : POAccntAssignvalDataArray[j].Acc_Asset);
                                                    POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray[j].Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray[j].Acc_WBSElement);
                                                    POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray[j].SalesOrder === "" ? "" : POAccntAssignvalDataArray[j].SalesOrder);
                                                    POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray[j].ActivityNumber === "" ? "" : POAccntAssignvalDataArray[j].ActivityNumber);
                                                    POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray[j].ItemNumber === "" ? "" : POAccntAssignvalDataArray[j].ItemNumber);
                                                    POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray[j].DeliverySchedule === "" ? "" : POAccntAssignvalDataArray[j].DeliverySchedule);

                                                    POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                                    POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);

                                                    POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                    POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                    POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                    POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                    POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray[j].Distribution === "" ? "" : POAccntAssignvalDataArray[j].Distribution);
                                                    POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray[j].SerialNo === "" ? "" : POAccntAssignvalDataArray[j].SerialNo);
                                                    POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray[j].LinkNumber === "" ? "" : POAccntAssignvalDataArray[j].LinkNumber);
                                                    POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray[j].NETVALUE === "" ? "" : POAccntAssignvalDataArray[j].NETVALUE);
                                                    POServiceAccAssDataAsJsonObject["LineNo"] = (POAccntAssignvalDataArray[j].LineNo === "" ? "" : POAccntAssignvalDataArray[j].LineNo);

                                                    POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    console.log("Single Service====");

                                    if (POServiceDataArray.PackageNo === SubPackageNo)
                                    {
                                        var POServiceDataAsJsonObject = {};

                                        POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                        POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray.ServiceLinkID === undefined ? "" : POServiceDataArray.ServiceLinkID);
                                        POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                        POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                        POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray.Distribution === undefined ? "" : POServiceDataArray.Distribution);
                                        POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                        POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray.PackageNo === undefined ? "" : POServiceDataArray.PackageNo);
                                        POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                        POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray.ShortText === undefined ? "" : POServiceDataArray.ShortText);
                                        POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray.Quantity === undefined ? "" : POServiceDataArray.Quantity);
                                        POServiceDataAsJsonObject["Unit"] = (POServiceDataArray.Unit === undefined ? "" : POServiceDataArray.Unit);
                                        POServiceDataAsJsonObject["Currency"] = (POServiceDataArray.Currency === undefined ? "" : POServiceDataArray.Currency);
                                        POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray.NetPrice === undefined ? "" : POServiceDataArray.NetPrice);
                                        POServiceDataAsJsonObject["Edition"] = (POServiceDataArray.Edition === undefined ? "" : POServiceDataArray.Edition);
                                        POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray.LineItemLongText === undefined ? "" : POServiceDataArray.LineItemLongText);
                                        POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray.OverfTolerance === undefined ? "" : POServiceDataArray.OverfTolerance);
                                        POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray.GrossPrice === undefined ? "" : POServiceDataArray.GrossPrice);
                                        POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);
                                        POServiceDataAsJsonObject["LineNo"] = (POServiceDataArray.LineNo === undefined ? "" : POServiceDataArray.LineNo);
                                        POServiceDataAsJsonObject["ActualQuantity"] = (POServiceDataArray.actualquantity === undefined ? "" : POServiceDataArray.actualquantity);
                                        POServiceDataAsJsonObject["ServiceLongText"] = (POServiceDataArray.ServiceLongText === undefined ? "" : POServiceDataArray.ServiceLongText);

                                        POServiceDataJsonArray.push(POServiceDataAsJsonObject);

                                        if (Array.isArray(POAccntAssignvalDataArray) === true)
                                        {
                                            console.log("Else POAccntAssignvalDataArray len: " + POAccntAssignvalDataArray.length);
                                            for (var j = 0; j < POAccntAssignvalDataArray.length; j++)
                                            {
                                                var POServiceAccAssDataAsJsonObject = {};
                                                //                                                if (POServiceDataArray.PackageNo === POAccntAssignvalDataArray[j].PackageNo)
                                                if (Number(POServiceDataArray.LineNo) === Number(POAccntAssignvalDataArray[j].LineNo) && POServiceDataArray.PackageNo === POAccntAssignvalDataArray[j].PackageNo)
                                                {
                                                    POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray[j].PackageNo === undefined ? "" : POAccntAssignvalDataArray[j].PackageNo);
                                                    POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray[j].Quantity === "" ? "" : POAccntAssignvalDataArray[j].Quantity);
                                                    POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray[j].Percentage === "" ? "" : POAccntAssignvalDataArray[j].Percentage);
                                                    POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray[j].GLAccount === "" ? "" : POAccntAssignvalDataArray[j].GLAccount);
                                                    POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray[j].CoArea === "" ? "" : POAccntAssignvalDataArray[j].CoArea);
                                                    POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray[j].CostCenter === "" ? "" : POAccntAssignvalDataArray[j].CostCenter);
                                                    POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray[j].Fund === "" ? "" : POAccntAssignvalDataArray[j].Fund);
                                                    POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray[j].FunctionalArea === "" ? "" : POAccntAssignvalDataArray[j].FunctionalArea);
                                                    POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray[j].FundsCentre === "" ? "" : POAccntAssignvalDataArray[j].FundsCentre);
                                                    POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray[j].CommitmentItem === "" ? "" : POAccntAssignvalDataArray[j].CommitmentItem);
                                                    POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray[j].Acc_Order === "" ? "" : POAccntAssignvalDataArray[j].Acc_Order);
                                                    POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray[j].Acc_Asset === "" ? "" : POAccntAssignvalDataArray[j].Acc_Asset);
                                                    POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray[j].Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray[j].Acc_WBSElement);
                                                    POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray[j].SalesOrder === "" ? "" : POAccntAssignvalDataArray[j].SalesOrder);
                                                    POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray[j].ActivityNumber === "" ? "" : POAccntAssignvalDataArray[j].ActivityNumber);
                                                    POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray[j].ItemNumber === "" ? "" : POAccntAssignvalDataArray[j].ItemNumber);
                                                    POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray[j].DeliverySchedule === "" ? "" : POAccntAssignvalDataArray[j].DeliverySchedule);

                                                    POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                                    POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                                    POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                    POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                    POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                    POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                    POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray[j].Distribution === "" ? "" : POAccntAssignvalDataArray[j].Distribution);
                                                    POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray[j].SerialNo === "" ? "" : POAccntAssignvalDataArray[j].SerialNo);
                                                    POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray[j].LinkNumber === "" ? "" : POAccntAssignvalDataArray[j].LinkNumber);
                                                    POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray[j].NETVALUE === "" ? "" : POAccntAssignvalDataArray[j].NETVALUE);
                                                    POServiceAccAssDataAsJsonObject["LineNo"] = (POAccntAssignvalDataArray[j].LineNo === "" ? "" : POAccntAssignvalDataArray[j].LineNo);

                                                    POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                                }
                                            }
                                        }
                                        else
                                        {
                                            var POServiceAccAssDataAsJsonObject = {};
                                            //                                            if (POServiceDataArray.PackageNo === POAccntAssignvalDataArray.PackageNo)
                                            if (Number(POServiceDataArray.LineNo) === Number(POAccntAssignvalDataArray.LineNo) && POServiceDataArray.PackageNo === POAccntAssignvalDataArray.PackageNo)
                                            {
                                                POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray.PackageNo === undefined ? "" : POAccntAssignvalDataArray.PackageNo);
                                                POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray.Quantity === "" ? "" : POAccntAssignvalDataArray.Quantity);
                                                POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray.Percentage === "" ? "" : POAccntAssignvalDataArray.Percentage);
                                                POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray.GLAccount === "" ? "" : POAccntAssignvalDataArray.GLAccount);
                                                POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray.CoArea === "" ? "" : POAccntAssignvalDataArray.CoArea);
                                                POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray.CostCenter === "" ? "" : POAccntAssignvalDataArray.CostCenter);
                                                POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray.Fund === "" ? "" : POAccntAssignvalDataArray.Fund);
                                                POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray.FunctionalArea === "" ? "" : POAccntAssignvalDataArray.FunctionalArea);
                                                POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray.FundsCentre === "" ? "" : POAccntAssignvalDataArray.FundsCentre);
                                                POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray.CommitmentItem === "" ? "" : POAccntAssignvalDataArray.CommitmentItem);
                                                POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray.Acc_Order === "" ? "" : POAccntAssignvalDataArray.Acc_Order);
                                                POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray.Acc_Asset === "" ? "" : POAccntAssignvalDataArray.Acc_Asset);
                                                POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray.Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray.Acc_WBSElement);
                                                POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray.SalesOrder === "" ? "" : POAccntAssignvalDataArray.SalesOrder);
                                                POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray.ActivityNumber === "" ? "" : POAccntAssignvalDataArray.ActivityNumber);
                                                POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray.ItemNumber === "" ? "" : POAccntAssignvalDataArray.ItemNumber);
                                                POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray.DeliverySchedule === "" ? "" : POAccntAssignvalDataArray.DeliverySchedule);

                                                POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                                POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                                POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray.Distribution === "" ? "" : POAccntAssignvalDataArray.Distribution);
                                                POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray.SerialNo === "" ? "" : POAccntAssignvalDataArray.SerialNo);
                                                POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray.LinkNumber === "" ? "" : POAccntAssignvalDataArray.LinkNumber);
                                                POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray.NETVALUE === "" ? "" : POAccntAssignvalDataArray.NETVALUE);
                                                POServiceAccAssDataAsJsonObject["LineNo"] = (POAccntAssignvalDataArray.LineNo === "" ? "" : POAccntAssignvalDataArray.LineNo);

                                                POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    console.log("Single POServiceRefDataArray");
                    var PackageNo = POServiceRefDataArray.PackageNo;
                    var SubPackageNo = POServiceRefDataArray.SubPackageNo;
                    if (PackageNo === POLineItemPackageNo) {
                        if (POServiceDataArray !== undefined) {
                            if (Array.isArray(POServiceDataArray) === true) {
                                console.log("Else POServiceDataArray len: " + POServiceDataArray.length);
                                for (var i = 0; i < POServiceDataArray.length; i++) {
                                    if (POServiceDataArray[i].PackageNo === SubPackageNo)
                                    {
                                        var POServiceDataAsJsonObject = {};

                                        POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                        POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray[i].ServiceLinkID === undefined ? "" : POServiceDataArray[i].ServiceLinkID);
                                        POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                        POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                        POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray[i].Distribution === undefined ? "" : POServiceDataArray[i].Distribution);
                                        POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                        POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray[i].PackageNo === undefined ? "" : POServiceDataArray[i].PackageNo);
                                        POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                        POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray[i].ShortText === undefined ? "" : POServiceDataArray[i].ShortText);
                                        POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray[i].Quantity === undefined ? "" : POServiceDataArray[i].Quantity);
                                        POServiceDataAsJsonObject["Unit"] = (POServiceDataArray[i].Unit === undefined ? "" : POServiceDataArray[i].Unit);
                                        POServiceDataAsJsonObject["Currency"] = (POServiceDataArray[i].Currency === undefined ? "" : POServiceDataArray[i].Currency);
                                        POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray[i].NetPrice === undefined ? "" : POServiceDataArray[i].NetPrice);
                                        POServiceDataAsJsonObject["Edition"] = (POServiceDataArray[i].Edition === undefined ? "" : POServiceDataArray[i].Edition);
                                        POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray[i].LineItemLongText === undefined ? "" : POServiceDataArray[i].LineItemLongText);
                                        POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray[i].OverfTolerance === undefined ? "" : POServiceDataArray[i].OverfTolerance);
                                        POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray[i].GrossPrice === undefined ? "" : POServiceDataArray[i].GrossPrice);
                                        POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);
                                        POServiceDataAsJsonObject["LineNo"] = (POServiceDataArray[i].LineNo === undefined ? "" : POServiceDataArray[i].LineNo);
                                        POServiceDataAsJsonObject["ActualQuantity"] = (POServiceDataArray[i].actualquantity === undefined ? "" : POServiceDataArray[i].actualquantity);
                                        POServiceDataAsJsonObject["ServiceLongText"] = (POServiceDataArray[i].ServiceLongText === undefined ? "" : POServiceDataArray[i].ServiceLongText);

                                        POServiceDataJsonArray.push(POServiceDataAsJsonObject);

                                        for (var j = 0; j < POAccntAssignvalDataArray.length; j++)
                                        {
                                            var POServiceAccAssDataAsJsonObject = {};
                                            //                                            if (POServiceDataArray[i].PackageNo === POAccntAssignvalDataArray[j].PackageNo)
                                            if (Number(POServiceDataArray[i].LineNo) === Number(POAccntAssignvalDataArray[j].LineNo) && POServiceDataArray[i].PackageNo === POAccntAssignvalDataArray[j].PackageNo)
                                            {
                                                POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray[j].PackageNo === undefined ? "" : POAccntAssignvalDataArray[j].PackageNo);
                                                POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray[j].Quantity === "" ? "" : POAccntAssignvalDataArray[j].Quantity);
                                                POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray[j].Percentage === "" ? "" : POAccntAssignvalDataArray[j].Percentage);
                                                POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray[j].GLAccount === "" ? "" : POAccntAssignvalDataArray[j].GLAccount);
                                                POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray[j].CoArea === "" ? "" : POAccntAssignvalDataArray[j].CoArea);
                                                POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray[j].CostCenter === "" ? "" : POAccntAssignvalDataArray[j].CostCenter);
                                                POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray[j].Fund === "" ? "" : POAccntAssignvalDataArray[j].Fund);
                                                POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray[j].FunctionalArea === "" ? "" : POAccntAssignvalDataArray[j].FunctionalArea);
                                                POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray[j].FundsCentre === "" ? "" : POAccntAssignvalDataArray[j].FundsCentre);
                                                POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray[j].CommitmentItem === "" ? "" : POAccntAssignvalDataArray[j].CommitmentItem);
                                                POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray[j].Acc_Order === "" ? "" : POAccntAssignvalDataArray[j].Acc_Order);
                                                POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray[j].Acc_Asset === "" ? "" : POAccntAssignvalDataArray[j].Acc_Asset);
                                                POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray[j].Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray[j].Acc_WBSElement);
                                                POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray[j].SalesOrder === "" ? "" : POAccntAssignvalDataArray[j].SalesOrder);
                                                POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray[j].ActivityNumber === "" ? "" : POAccntAssignvalDataArray[j].ActivityNumber);
                                                POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray[j].ItemNumber === "" ? "" : POAccntAssignvalDataArray[j].ItemNumber);
                                                POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray[j].DeliverySchedule === "" ? "" : POAccntAssignvalDataArray[j].DeliverySchedule);

                                                POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                                POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);

                                                POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray[j].Distribution === "" ? "" : POAccntAssignvalDataArray[j].Distribution);
                                                POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray[j].SerialNo === "" ? "" : POAccntAssignvalDataArray[j].SerialNo);
                                                POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray[j].LinkNumber === "" ? "" : POAccntAssignvalDataArray[j].LinkNumber);
                                                POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray[j].NETVALUE === "" ? "" : POAccntAssignvalDataArray[j].NETVALUE);
                                                POServiceAccAssDataAsJsonObject["LineNo"] = (POAccntAssignvalDataArray[j].LineNo === "" ? "" : POAccntAssignvalDataArray[j].LineNo);

                                                POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (POServiceDataArray.PackageNo === SubPackageNo)
                                {
                                    var POServiceDataAsJsonObject = {};

                                    POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                    POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray.ServiceLinkID === undefined ? "" : POServiceDataArray.ServiceLinkID);
                                    POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                    POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                    POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray.Distribution === undefined ? "" : POServiceDataArray.Distribution);
                                    POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                    POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray.PackageNo === undefined ? "" : POServiceDataArray.PackageNo);
                                    POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);
                                    POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                    POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray.ShortText === undefined ? "" : POServiceDataArray.ShortText);
                                    POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray.Quantity === undefined ? "" : POServiceDataArray.Quantity);
                                    POServiceDataAsJsonObject["Unit"] = (POServiceDataArray.Unit === undefined ? "" : POServiceDataArray.Unit);
                                    POServiceDataAsJsonObject["Currency"] = (POServiceDataArray.Currency === undefined ? "" : POServiceDataArray.Currency);
                                    POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray.NetPrice === undefined ? "" : POServiceDataArray.NetPrice);
                                    POServiceDataAsJsonObject["Edition"] = (POServiceDataArray.Edition === undefined ? "" : POServiceDataArray.Edition);
                                    POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray.LineItemLongText === undefined ? "" : POServiceDataArray.LineItemLongText);
                                    POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray.OverfTolerance === undefined ? "" : POServiceDataArray.OverfTolerance);
                                    POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray.GrossPrice === undefined ? "" : POServiceDataArray.GrossPrice);
                                    POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);
                                    POServiceDataAsJsonObject["LineNo"] = (POServiceDataArray.LineNo === undefined ? "" : POServiceDataArray.LineNo);
                                    POServiceDataAsJsonObject["ActualQuantity"] = (POServiceDataArray.actualquantity === undefined ? "" : POServiceDataArray.actualquantity);
                                    POServiceDataAsJsonObject["ServiceLongText"] = (POServiceDataArray.ServiceLongText === undefined ? "" : POServiceDataArray.ServiceLongText);

                                    POServiceDataJsonArray.push(POServiceDataAsJsonObject);

                                    if (Array.isArray(POAccntAssignvalDataArray) === true)
                                    {
                                        console.log("If POAccntAssignvalDataArray len: " + POAccntAssignvalDataArray.length);
                                        for (var j = 0; j < POAccntAssignvalDataArray.length; j++)
                                        {
                                            var POServiceAccAssDataAsJsonObject = {};
                                            //                                            if (POServiceDataArray.PackageNo === POAccntAssignvalDataArray[j].PackageNo)Number(
                                            if (Number(POServiceDataArray.LineNo) === Number(POAccntAssignvalDataArray[j].LineNo) && POServiceDataArray.PackageNo === POAccntAssignvalDataArray[j].PackageNo)
                                            {
                                                POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray[j].PackageNo === undefined ? "" : POAccntAssignvalDataArray[j].PackageNo);
                                                POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray[j].Quantity === "" ? "" : POAccntAssignvalDataArray[j].Quantity);
                                                POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray[j].Percentage === "" ? "" : POAccntAssignvalDataArray[j].Percentage);
                                                POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray[j].GLAccount === "" ? "" : POAccntAssignvalDataArray[j].GLAccount);
                                                POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray[j].CoArea === "" ? "" : POAccntAssignvalDataArray[j].CoArea);
                                                POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray[j].CostCenter === "" ? "" : POAccntAssignvalDataArray[j].CostCenter);
                                                POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray[j].Fund === "" ? "" : POAccntAssignvalDataArray[j].Fund);
                                                POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray[j].FunctionalArea === "" ? "" : POAccntAssignvalDataArray[j].FunctionalArea);
                                                POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray[j].FundsCentre === "" ? "" : POAccntAssignvalDataArray[j].FundsCentre);
                                                POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray[j].CommitmentItem === "" ? "" : POAccntAssignvalDataArray[j].CommitmentItem);
                                                POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray[j].Acc_Order === "" ? "" : POAccntAssignvalDataArray[j].Acc_Order);
                                                POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray[j].Acc_Asset === "" ? "" : POAccntAssignvalDataArray[j].Acc_Asset);
                                                POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray[j].Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray[j].Acc_WBSElement);
                                                POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray[j].SalesOrder === "" ? "" : POAccntAssignvalDataArray[j].SalesOrder);
                                                POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray[j].ActivityNumber === "" ? "" : POAccntAssignvalDataArray[j].ActivityNumber);
                                                POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray[j].ItemNumber === "" ? "" : POAccntAssignvalDataArray[j].ItemNumber);
                                                POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray[j].DeliverySchedule === "" ? "" : POAccntAssignvalDataArray[j].DeliverySchedule);

                                                POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                                POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                                POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray[j].Distribution === "" ? "" : POAccntAssignvalDataArray[j].Distribution);
                                                POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray[j].SerialNo === "" ? "" : POAccntAssignvalDataArray[j].SerialNo);
                                                POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray[j].LinkNumber === "" ? "" : POAccntAssignvalDataArray[j].LinkNumber);
                                                POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray[j].NETVALUE === "" ? "" : POAccntAssignvalDataArray[j].NETVALUE);
                                                POServiceAccAssDataAsJsonObject["LineNo"] = (POAccntAssignvalDataArray[j].LineNo === "" ? "" : POAccntAssignvalDataArray[j].LineNo);

                                                POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        console.log("Else POAccntAssignvalDataArray len: " + JSON.stringify(POAccntAssignvalDataArray));
                                        var POServiceAccAssDataAsJsonObject = {};
                                        //                                        if (POServiceDataArray.PackageNo === POAccntAssignvalDataArray.PackageNo)
                                        if (Number(POServiceDataArray.LineNo) === Number(POAccntAssignvalDataArray.LineNo) && POServiceDataArray.PackageNo === POAccntAssignvalDataArray.PackageNo)
                                        {
                                            POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray.PackageNo === undefined ? "" : POAccntAssignvalDataArray.PackageNo);
                                            POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray.Quantity === "" ? "" : POAccntAssignvalDataArray.Quantity);
                                            POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray.Percentage === "" ? "" : POAccntAssignvalDataArray.Percentage);
                                            POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray.GLAccount === "" ? "" : POAccntAssignvalDataArray.GLAccount);
                                            POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray.CoArea === "" ? "" : POAccntAssignvalDataArray.CoArea);
                                            POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray.CostCenter === "" ? "" : POAccntAssignvalDataArray.CostCenter);
                                            POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray.Fund === "" ? "" : POAccntAssignvalDataArray.Fund);
                                            POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray.FunctionalArea === "" ? "" : POAccntAssignvalDataArray.FunctionalArea);
                                            POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray.FundsCentre === "" ? "" : POAccntAssignvalDataArray.FundsCentre);
                                            POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray.CommitmentItem === "" ? "" : POAccntAssignvalDataArray.CommitmentItem);
                                            POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray.Acc_Order === "" ? "" : POAccntAssignvalDataArray.Acc_Order);
                                            POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray.Acc_Asset === "" ? "" : POAccntAssignvalDataArray.Acc_Asset);
                                            POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray.Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray.Acc_WBSElement);
                                            POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray.SalesOrder === "" ? "" : POAccntAssignvalDataArray.SalesOrder);
                                            POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray.ActivityNumber === "" ? "" : POAccntAssignvalDataArray.ActivityNumber);
                                            POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray.ItemNumber === "" ? "" : POAccntAssignvalDataArray.ItemNumber);
                                            POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray.DeliverySchedule === "" ? "" : POAccntAssignvalDataArray.DeliverySchedule);

                                            POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                            POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                            POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                            POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                            POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                            POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                            POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray.Distribution === "" ? "" : POAccntAssignvalDataArray.Distribution);
                                            POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray.SerialNo === "" ? "" : POAccntAssignvalDataArray.SerialNo);
                                            POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray.LinkNumber === "" ? "" : POAccntAssignvalDataArray.LinkNumber);
                                            POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray.NETVALUE === "" ? "" : POAccntAssignvalDataArray.NETVALUE);
                                            POServiceAccAssDataAsJsonObject["LineNo"] = (POAccntAssignvalDataArray.LineNo === "" ? "" : POAccntAssignvalDataArray.LineNo);

                                            POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // POServiceData Ends

            // POLineItemConditionsData Starts
            var POLineItemConditionsDataArray = parsedJsonPoData.POFetchOP.POLineItemConditionsData;
            console.log("POLineItemConditionsDataArray: " + POLineItemConditionsDataArray);
            console.log("POLineItemConditionsDataArray is Array: " + Array.isArray(POLineItemConditionsDataArray));
            if (POLineItemConditionsDataArray !== undefined) {
                if (Array.isArray(POLineItemConditionsDataArray) === true) {
                    console.log("POLineItemConditionsDataArray len: " + POLineItemConditionsDataArray.length);
                    console.log("POLineItemDataLinkId: " + POLineItemDataLinkId);
                    var row = "";
                    for (var i = 0; i < POLineItemConditionsDataArray.length; i++) {

                        if (POLineItemDataLinkId === POLineItemConditionsDataArray[i].LinkId)
                        {
                            var POConditionDataAsJsonObject = {};

                            POConditionDataAsJsonObject["LinkId"] = (POLineItemConditionsDataArray[i].LinkId === undefined ? "" : POLineItemConditionsDataArray[i].LinkId);
                            POConditionDataAsJsonObject["ItemNumber"] = (POLineItemConditionsDataArray[i].ItemNumber === undefined ? "" : POLineItemConditionsDataArray[i].ItemNumber);
                            POConditionDataAsJsonObject["CondSTNo"] = (POLineItemConditionsDataArray[i].CondSTNo === undefined ? "" : POLineItemConditionsDataArray[i].CondSTNo);
                            POConditionDataAsJsonObject["CondCount"] = (POLineItemConditionsDataArray[i].CondCount === undefined ? "" : POLineItemConditionsDataArray[i].CondCount);
                            POConditionDataAsJsonObject["CondChangeId"] = (POLineItemConditionsDataArray[i].CondChangeId === undefined ? "" : POLineItemConditionsDataArray[i].CondChangeId);
                            POConditionDataAsJsonObject["CondType"] = (POLineItemConditionsDataArray[i].CondType === undefined ? "" : POLineItemConditionsDataArray[i].CondType);
                            POConditionDataAsJsonObject["CondPricUnit"] = (POLineItemConditionsDataArray[i].CondPricUnit === undefined ? "" : POLineItemConditionsDataArray[i].CondPricUnit);
                            POConditionDataAsJsonObject["CondCrncy"] = (POLineItemConditionsDataArray[i].CondCrncy === undefined ? "" : POLineItemConditionsDataArray[i].CondCrncy);
                            POConditionDataAsJsonObject["CondUnit"] = (POLineItemConditionsDataArray[i].CondUnit === undefined ? "" : POLineItemConditionsDataArray[i].CondUnit);
                            POConditionDataAsJsonObject["CondVal"] = (POLineItemConditionsDataArray[i].CondVal === undefined ? "" : POLineItemConditionsDataArray[i].CondVal);
                            POConditionDataAsJsonObject["CondName"] = (POLineItemConditionsDataArray[i].CondName === undefined ? "" : POLineItemConditionsDataArray[i].CondName);
                            POConditionDataAsJsonObject["Amount"] = (POLineItemConditionsDataArray[i].Amount === undefined ? "" : POLineItemConditionsDataArray[i].Amount);
                            POConditionDataAsJsonObject["Currency"] = (POLineItemConditionsDataArray[i].Currency === undefined ? "" : POLineItemConditionsDataArray[i].Currency);
                            POConditionDataAsJsonObject["Application"] = (POLineItemConditionsDataArray[i].Application === undefined ? "" : POLineItemConditionsDataArray[i].Application);
                            POConditionDataAsJsonObject["AccountKey"] = (POLineItemConditionsDataArray[i].AccountKey === undefined ? "" : POLineItemConditionsDataArray[i].AccountKey);
                            POConditionDataAsJsonObject["Accruals"] = (POLineItemConditionsDataArray[i].Accruals === undefined ? "" : POLineItemConditionsDataArray[i].Accruals);
                            POConditionDataAsJsonObject["Status"] = (POLineItemConditionsDataArray[i].Status === undefined ? "" : POLineItemConditionsDataArray[i].Status);
                            POConditionDataAsJsonObject["Numerator"] = (POLineItemConditionsDataArray[i].Numerator === undefined ? "" : POLineItemConditionsDataArray[i].Numerator);
                            POConditionDataAsJsonObject["BaseUOM"] = (POLineItemConditionsDataArray[i].BaseUOM === undefined ? "" : POLineItemConditionsDataArray[i].BaseUOM);
                            POConditionDataAsJsonObject["Denominator"] = (POLineItemConditionsDataArray[i].Denominator === undefined ? "" : POLineItemConditionsDataArray[i].Denominator);
                            POConditionDataAsJsonObject["UomExtra"] = (POLineItemConditionsDataArray[i].Uom_Extra === undefined ? "" : POLineItemConditionsDataArray[i].Uom_Extra);

                            POConditionDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POConditionDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                            POConditionDataAsJsonObject["PrItemNumber"] = itemNumber;

                            POLineItemConditionDataJsonArray.push(POConditionDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POLineItemConditionsDataArray.LinkId)
                    {
                        var POConditionDataAsJsonObject = {};

                        POConditionDataAsJsonObject["LinkId"] = (POLineItemConditionsDataArray.LinkId === undefined ? "" : POLineItemConditionsDataArray.LinkId);
                        POConditionDataAsJsonObject["ItemNumber"] = (POLineItemConditionsDataArray.ItemNumber === undefined ? "" : POLineItemConditionsDataArray.ItemNumber);
                        POConditionDataAsJsonObject["CondSTNo"] = (POLineItemConditionsDataArray.CondSTNo === undefined ? "" : POLineItemConditionsDataArray.CondSTNo);
                        POConditionDataAsJsonObject["CondCount"] = (POLineItemConditionsDataArray.CondCount === undefined ? "" : POLineItemConditionsDataArray.CondCount);
                        POConditionDataAsJsonObject["CondChangeId"] = (POLineItemConditionsDataArray.CondChangeId === undefined ? "" : POLineItemConditionsDataArray.CondChangeId);
                        POConditionDataAsJsonObject["CondType"] = (POLineItemConditionsDataArray.CondType === undefined ? "" : POLineItemConditionsDataArray.CondType);
                        POConditionDataAsJsonObject["CondPricUnit"] = (POLineItemConditionsDataArray.CondPricUnit === undefined ? "" : POLineItemConditionsDataArray.CondPricUnit);
                        POConditionDataAsJsonObject["CondCrncy"] = (POLineItemConditionsDataArray.CondCrncy === undefined ? "" : POLineItemConditionsDataArray.CondCrncy);
                        POConditionDataAsJsonObject["CondUnit"] = (POLineItemConditionsDataArray.CondUnit === undefined ? "" : POLineItemConditionsDataArray.CondUnit);
                        POConditionDataAsJsonObject["CondVal"] = (POLineItemConditionsDataArray.CondVal === undefined ? "" : POLineItemConditionsDataArray.CondVal);
                        POConditionDataAsJsonObject["CondName"] = (POLineItemConditionsDataArray.CondName === undefined ? "" : POLineItemConditionsDataArray.CondName);
                        POConditionDataAsJsonObject["Amount"] = (POLineItemConditionsDataArray.Amount === undefined ? "" : POLineItemConditionsDataArray.Amount);
                        POConditionDataAsJsonObject["Currency"] = (POLineItemConditionsDataArray.Currency === undefined ? "" : POLineItemConditionsDataArray.Currency);
                        POConditionDataAsJsonObject["Application"] = (POLineItemConditionsDataArray.Application === undefined ? "" : POLineItemConditionsDataArray.Application);
                        POConditionDataAsJsonObject["AccountKey"] = (POLineItemConditionsDataArray.AccountKey === undefined ? "" : POLineItemConditionsDataArray.AccountKey);
                        POConditionDataAsJsonObject["Accruals"] = (POLineItemConditionsDataArray.Accruals === undefined ? "" : POLineItemConditionsDataArray.Accruals);
                        POConditionDataAsJsonObject["Status"] = (POLineItemConditionsDataArray.Status === undefined ? "" : POLineItemConditionsDataArray.Status);
                        POConditionDataAsJsonObject["Numerator"] = (POLineItemConditionsDataArray.Numerator === undefined ? "" : POLineItemConditionsDataArray.Numerator);
                        POConditionDataAsJsonObject["BaseUOM"] = (POLineItemConditionsDataArray.BaseUOM === undefined ? "" : POLineItemConditionsDataArray.BaseUOM);
                        POConditionDataAsJsonObject["Denominator"] = (POLineItemConditionsDataArray.Denominator === undefined ? "" : POLineItemConditionsDataArray.Denominator);
                        POConditionDataAsJsonObject["UomExtra"] = (POLineItemConditionsDataArray.Uom_Extra === undefined ? "" : POLineItemConditionsDataArray.Uom_Extra);

                        POConditionDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POConditionDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                        POConditionDataAsJsonObject["PrItemNumber"] = itemNumber;

                        POLineItemConditionDataJsonArray.push(POConditionDataAsJsonObject);
                    }
                }
            }
            // POLineItemConditionsData Ends

            // POAccAssData Starts
            var POAccntAssignDataArray = parsedJsonPoData.POFetchOP.POAccntAssignData;
            console.log("POAccntAssignDataArray: " + POAccntAssignDataArray);
            console.log("POAccntAssignDataArray is Array: " + Array.isArray(POAccntAssignDataArray));
            if (POAccntAssignDataArray !== undefined) {
                if (Array.isArray(POAccntAssignDataArray) === true)
                {
                    console.log("POAccntAssignDataArray len: " + POAccntAssignDataArray.length);
                    var row = "";
                    for (var i = 0; i < POAccntAssignDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POAccntAssignDataArray[i].PRLinkID)
                        {
                            var POAccAssDataAsJsonObject = {};

                            POAccAssDataAsJsonObject["LinkID"] = (POAccntAssignDataArray[i].PRLinkID === undefined ? "" : POAccntAssignDataArray[i].PRLinkID);
                            POAccAssDataAsJsonObject["Quantity"] = (POAccntAssignDataArray[i].Quantity === undefined ? "" : POAccntAssignDataArray[i].Quantity);
                            POAccAssDataAsJsonObject["Percentage"] = (POAccntAssignDataArray[i].Percentage === undefined ? "" : POAccntAssignDataArray[i].Percentage);
                            POAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignDataArray[i].GLAccount === undefined ? "" : POAccntAssignDataArray[i].GLAccount);
                            POAccAssDataAsJsonObject["COArea"] = (POAccntAssignDataArray[i].COArea === undefined ? "" : POAccntAssignDataArray[i].COArea);
                            POAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignDataArray[i].CostCenter === undefined ? "" : POAccntAssignDataArray[i].CostCenter);
                            POAccAssDataAsJsonObject["Fund"] = (POAccntAssignDataArray[i].Fund === undefined ? "" : POAccntAssignDataArray[i].Fund);
                            POAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignDataArray[i].FunctionalArea === undefined ? "" : POAccntAssignDataArray[i].FunctionalArea);
                            POAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignDataArray[i].FundsCentre === undefined ? "" : POAccntAssignDataArray[i].FundsCentre);
                            POAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignDataArray[i].CommitmentItem === undefined ? "" : POAccntAssignDataArray[i].CommitmentItem);
                            POAccAssDataAsJsonObject["UnloadingPoint"] = (POAccntAssignDataArray[i].UnloadingPoint === undefined ? "" : POAccntAssignDataArray[i].UnloadingPoint);
                            POAccAssDataAsJsonObject["Recipient"] = (POAccntAssignDataArray[i].Recipient === undefined ? "" : POAccntAssignDataArray[i].Recipient);
                            POAccAssDataAsJsonObject["AccOrder"] = (POAccntAssignDataArray[i].AccOrder === undefined ? "" : POAccntAssignDataArray[i].AccOrder);
                            POAccAssDataAsJsonObject["Asset"] = (POAccntAssignDataArray[i].Asset === undefined ? "" : POAccntAssignDataArray[i].Asset);
                            POAccAssDataAsJsonObject["WBSElement"] = (POAccntAssignDataArray[i].WBSElement === undefined ? "" : POAccntAssignDataArray[i].WBSElement);
                            POAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignDataArray[i].SalesOrder === undefined ? "" : POAccntAssignDataArray[i].SalesOrder);
                            POAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignDataArray[i].ItemNumber === undefined ? "" : POAccntAssignDataArray[i].ItemNumber);
                            POAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignDataArray[i].DeliverySchedule === undefined ? "" : POAccntAssignDataArray[i].DeliverySchedule);
                            POAccAssDataAsJsonObject["ItmNo"] = (POAccntAssignDataArray[i].ItmNo === undefined ? "" : POAccntAssignDataArray[i].ItmNo);
                            POAccAssDataAsJsonObject["Distribution"] = (POAccntAssignDataArray[i].Distribution === undefined ? "" : POAccntAssignDataArray[i].Distribution);
                            POAccAssDataAsJsonObject["AccountAssignmentCategory"] = (POAccntAssignDataArray[i].AccountAssignmentCategory === undefined ? "" : POAccntAssignDataArray[i].AccountAssignmentCategory);
                            POAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignDataArray[i].SerialNo === undefined ? "" : POAccntAssignDataArray[i].SerialNo);
                            POAccAssDataAsJsonObject["PartialInvoiceIndicator"] = (POAccntAssignDataArray[i].PartialInvoiceIndicator === undefined ? "" : POAccntAssignDataArray[i].PartialInvoiceIndicator);
                            POAccAssDataAsJsonObject["CoCode"] = (POAccntAssignDataArray[i].CoCode === undefined ? "" : POAccntAssignDataArray[i].CoCode);
                            POAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignDataArray[i].ActivityNumber === undefined ? "" : POAccntAssignDataArray[i].ActivityNumber);

                            POAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                            POAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;

                            POAccAssDataJsonArray.push(POAccAssDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POAccntAssignDataArray.PRLinkID)
                    {
                        var POAccAssDataAsJsonObject = {};

                        POAccAssDataAsJsonObject["LinkID"] = (POAccntAssignDataArray.PRLinkID === undefined ? "" : POAccntAssignDataArray.PRLinkID);
                        POAccAssDataAsJsonObject["Quantity"] = (POAccntAssignDataArray.Quantity === undefined ? "" : POAccntAssignDataArray.Quantity);
                        POAccAssDataAsJsonObject["Percentage"] = (POAccntAssignDataArray.Percentage === undefined ? "" : POAccntAssignDataArray.Percentage);
                        POAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignDataArray.GLAccount === undefined ? "" : POAccntAssignDataArray.GLAccount);
                        POAccAssDataAsJsonObject["COArea"] = (POAccntAssignDataArray.COArea === undefined ? "" : POAccntAssignDataArray.COArea);
                        POAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignDataArray.CostCenter === undefined ? "" : POAccntAssignDataArray.CostCenter);
                        POAccAssDataAsJsonObject["Fund"] = (POAccntAssignDataArray.Fund === undefined ? "" : POAccntAssignDataArray.Fund);
                        POAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignDataArray.FunctionalArea === undefined ? "" : POAccntAssignDataArray.FunctionalArea);
                        POAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignDataArray.FundsCentre === undefined ? "" : POAccntAssignDataArray.FundsCentre);
                        POAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignDataArray.CommitmentItem === undefined ? "" : POAccntAssignDataArray.CommitmentItem);
                        POAccAssDataAsJsonObject["UnloadingPoint"] = (POAccntAssignDataArray.UnloadingPoint === undefined ? "" : POAccntAssignDataArray.UnloadingPoint);
                        POAccAssDataAsJsonObject["Recipient"] = (POAccntAssignDataArray.Recipient === undefined ? "" : POAccntAssignDataArray.Recipient);
                        POAccAssDataAsJsonObject["AccOrder"] = (POAccntAssignDataArray.AccOrder === undefined ? "" : POAccntAssignDataArray.AccOrder);
                        POAccAssDataAsJsonObject["Asset"] = (POAccntAssignDataArray.Asset === undefined ? "" : POAccntAssignDataArray.Asset);
                        POAccAssDataAsJsonObject["WBSElement"] = (POAccntAssignDataArray.WBSElement === undefined ? "" : POAccntAssignDataArray.WBSElement);
                        POAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignDataArray.SalesOrder === undefined ? "" : POAccntAssignDataArray.SalesOrder);
                        POAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignDataArray.ItemNumber === undefined ? "" : POAccntAssignDataArray.ItemNumber);
                        POAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignDataArray.DeliverySchedule === undefined ? "" : POAccntAssignDataArray.DeliverySchedule);
                        POAccAssDataAsJsonObject["ItmNo"] = (POAccntAssignDataArray.ItmNo === undefined ? "" : POAccntAssignDataArray.ItmNo);
                        POAccAssDataAsJsonObject["Distribution"] = (POAccntAssignDataArray.Distribution === undefined ? "" : POAccntAssignDataArray.Distribution);
                        POAccAssDataAsJsonObject["AccountAssignmentCategory"] = (POAccntAssignDataArray.AccountAssignmentCategory === undefined ? "" : POAccntAssignDataArray.AccountAssignmentCategory);
                        POAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignDataArray.SerialNo === undefined ? "" : POAccntAssignDataArray.SerialNo);
                        POAccAssDataAsJsonObject["PartialInvoiceIndicator"] = (POAccntAssignDataArray.PartialInvoiceIndicator === undefined ? "" : POAccntAssignDataArray.PartialInvoiceIndicator);
                        POAccAssDataAsJsonObject["CoCode"] = (POAccntAssignDataArray.CoCode === undefined ? "" : POAccntAssignDataArray.CoCode);
                        POAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignDataArray.ActivityNumber === undefined ? "" : POAccntAssignDataArray.ActivityNumber);

                        POAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                        POAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;

                        POAccAssDataJsonArray.push(POAccAssDataAsJsonObject);
                    }
                }
            }
            // POAccAssData Ends

            // PODeliveryAddressData Starts
            var PODeliveryAddressDataArray = parsedJsonPoData.POFetchOP.PODeliveryAddressData;
            console.log("PODeliveryAddressDataArray: " + PODeliveryAddressDataArray);
            console.log("PODeliveryAddressDataArray is Array: " + Array.isArray(PODeliveryAddressDataArray));
            if (PODeliveryAddressDataArray !== undefined) {
                if (Array.isArray(PODeliveryAddressDataArray) === true) {
                    console.log("PODeliveryAddressDataArray len: " + PODeliveryAddressDataArray.length);
                    for (var i = 0; i < PODeliveryAddressDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === PODeliveryAddressDataArray[i].LinkId)
                        {
                            var PODeliveryAddressDataAsJsonObject = {};

                            PODeliveryAddressDataAsJsonObject["LinkId"] = PODeliveryAddressDataArray[i].LinkId;
                            PODeliveryAddressDataAsJsonObject["ItemNo"] = PODeliveryAddressDataArray[i].ItemNo;
                            PODeliveryAddressDataAsJsonObject["Name1"] = PODeliveryAddressDataArray[i].Name1;
                            PODeliveryAddressDataAsJsonObject["Name2"] = PODeliveryAddressDataArray[i].Name2;
                            PODeliveryAddressDataAsJsonObject["Street"] = PODeliveryAddressDataArray[i].Street;
                            PODeliveryAddressDataAsJsonObject["HouseNo"] = PODeliveryAddressDataArray[i].HouseNo;
                            PODeliveryAddressDataAsJsonObject["PostalCode"] = PODeliveryAddressDataArray[i].PostalCode;
                            PODeliveryAddressDataAsJsonObject["City"] = PODeliveryAddressDataArray[i].City;
                            PODeliveryAddressDataAsJsonObject["Country"] = PODeliveryAddressDataArray[i].Country;
                            PODeliveryAddressDataAsJsonObject["Title"] = PODeliveryAddressDataArray[i].Title;

                            PODeliveryAddressDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            PODeliveryAddressDataJsonArray.push(PODeliveryAddressDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === PODeliveryAddressDataArray.LinkId)
                    {
                        var PODeliveryAddressDataAsJsonObject = {};

                        PODeliveryAddressDataAsJsonObject["LinkId"] = PODeliveryAddressDataArray.LinkId;
                        PODeliveryAddressDataAsJsonObject["ItemNo"] = PODeliveryAddressDataArray.ItemNo;
                        PODeliveryAddressDataAsJsonObject["Name1"] = PODeliveryAddressDataArray.Name1;
                        PODeliveryAddressDataAsJsonObject["Name2"] = PODeliveryAddressDataArray.Name2;
                        PODeliveryAddressDataAsJsonObject["Street"] = PODeliveryAddressDataArray.Street;
                        PODeliveryAddressDataAsJsonObject["HouseNo"] = PODeliveryAddressDataArray.HouseNo;
                        PODeliveryAddressDataAsJsonObject["PostalCode"] = PODeliveryAddressDataArray.PostalCode;
                        PODeliveryAddressDataAsJsonObject["City"] = PODeliveryAddressDataArray.City;
                        PODeliveryAddressDataAsJsonObject["Country"] = PODeliveryAddressDataArray.Country;
                        PODeliveryAddressDataAsJsonObject["Title"] = PODeliveryAddressDataArray.Title;

                        PODeliveryAddressDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        PODeliveryAddressDataJsonArray.push(PODeliveryAddressDataAsJsonObject);
                    }
                }
            }
            // PODeliveryAddressData Ends

            // PODeliveryData Starts
            var PODeliveryDataArray = parsedJsonPoData.POFetchOP.PODeliveryData;
            console.log("PODeliveryDataArray: " + PODeliveryDataArray);
            console.log("PODeliveryDataArray is Array: " + Array.isArray(PODeliveryDataArray));
            if (PODeliveryDataArray !== undefined) {
                if (Array.isArray(PODeliveryDataArray) === true) {
                    console.log("PODeliveryDataArray len: " + PODeliveryDataArray.length);
                    for (var i = 0; i < PODeliveryDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === PODeliveryDataArray[i].LinkId)
                        {
                            var PODeliveryDataAsJsonObject = {};

                            PODeliveryDataAsJsonObject["LinkId"] = PODeliveryDataArray[i].LinkId;
                            PODeliveryDataAsJsonObject["ItemNumber"] = Number(PODeliveryDataArray[i].ItemNumber).toString();
                            PODeliveryDataAsJsonObject["OverDelTol"] = PODeliveryDataArray[i].OverDelTol;
                            PODeliveryDataAsJsonObject["UnderDelTol"] = PODeliveryDataArray[i].UnderDelTol;
                            PODeliveryDataAsJsonObject["ShippingInstructions"] = PODeliveryDataArray[i].ShippingInstructions;
                            PODeliveryDataAsJsonObject["StockType"] = PODeliveryDataArray[i].StockType;
                            PODeliveryDataAsJsonObject["FstRem_Exped"] = PODeliveryDataArray[i].FstRem_Exped;
                            PODeliveryDataAsJsonObject["SecRem_Exped"] = PODeliveryDataArray[i].SecRem_Exped;
                            PODeliveryDataAsJsonObject["ThrdRem_Exped"] = PODeliveryDataArray[i].ThrdRem_Exped;
                            PODeliveryDataAsJsonObject["ValuationType"] = PODeliveryDataArray[i].ValuationType;
                            PODeliveryDataAsJsonObject["RemShelfLife"] = PODeliveryDataArray[i].RemShelfLife;
                            PODeliveryDataAsJsonObject["QAControlLife"] = PODeliveryDataArray[i].QAControlLife;
                            PODeliveryDataAsJsonObject["GrProcTime"] = PODeliveryDataArray[i].GrProcTime;
                            PODeliveryDataAsJsonObject["PlDelTime"] = PODeliveryDataArray[i].PlDelTime;
                            PODeliveryDataAsJsonObject["IncoTerms1"] = PODeliveryDataArray[i].IncoTerms1;
                            PODeliveryDataAsJsonObject["GRNonVal"] = PODeliveryDataArray[i].GRNonVal;
                            PODeliveryDataAsJsonObject["DelvCompleted"] = PODeliveryDataArray[i].DelvCompleted;
                            PODeliveryDataAsJsonObject["NoExpend"] = PODeliveryDataArray[i].NoExpend;
                            PODeliveryDataAsJsonObject["GoodsReceipt"] = PODeliveryDataArray[i].GoodsReceipt;
                            PODeliveryDataAsJsonObject["Unlimited"] = PODeliveryDataArray[i].Unlimited === undefined ? "" : PODeliveryDataArray[i].Unlimited;

                            PODeliveryDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            PODeliveryDataJsonArray.push(PODeliveryDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === PODeliveryDataArray.LinkId)
                    {
                        var PODeliveryDataAsJsonObject = {};

                        PODeliveryDataAsJsonObject["LinkId"] = PODeliveryDataArray.LinkId;
                        PODeliveryDataAsJsonObject["ItemNumber"] = Number(PODeliveryDataArray.ItemNumber).toString();
                        PODeliveryDataAsJsonObject["OverDelTol"] = PODeliveryDataArray.OverDelTol;
                        PODeliveryDataAsJsonObject["UnderDelTol"] = PODeliveryDataArray.UnderDelTol;
                        PODeliveryDataAsJsonObject["ShippingInstructions"] = PODeliveryDataArray.ShippingInstructions;
                        PODeliveryDataAsJsonObject["StockType"] = PODeliveryDataArray.StockType;
                        PODeliveryDataAsJsonObject["FstRem_Exped"] = PODeliveryDataArray.FstRem_Exped;
                        PODeliveryDataAsJsonObject["SecRem_Exped"] = PODeliveryDataArray.SecRem_Exped;
                        PODeliveryDataAsJsonObject["ThrdRem_Exped"] = PODeliveryDataArray.ThrdRem_Exped;
                        PODeliveryDataAsJsonObject["ValuationType"] = PODeliveryDataArray.ValuationType;
                        PODeliveryDataAsJsonObject["RemShelfLife"] = PODeliveryDataArray.RemShelfLife;
                        PODeliveryDataAsJsonObject["QAControlLife"] = PODeliveryDataArray.QAControlLife;
                        PODeliveryDataAsJsonObject["GrProcTime"] = PODeliveryDataArray.GrProcTime;
                        PODeliveryDataAsJsonObject["PlDelTime"] = PODeliveryDataArray.PlDelTime;
                        PODeliveryDataAsJsonObject["IncoTerms1"] = PODeliveryDataArray.IncoTerms1;
                        PODeliveryDataAsJsonObject["GRNonVal"] = PODeliveryDataArray.GRNonVal;
                        PODeliveryDataAsJsonObject["DelvCompleted"] = PODeliveryDataArray.DelvCompleted;
                        PODeliveryDataAsJsonObject["NoExpend"] = PODeliveryDataArray.NoExpend;
                        PODeliveryDataAsJsonObject["GoodsReceipt"] = PODeliveryDataArray.GoodsReceipt;
                        PODeliveryDataAsJsonObject["Unlimited"] = PODeliveryDataArray.Unlimited === undefined ? "" : PODeliveryDataArray.Unlimited;

                        PODeliveryDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        PODeliveryDataJsonArray.push(PODeliveryDataAsJsonObject);
                    }
                }
            }
            // PODeliveryData Ends

            // POConfirmationsData Starts
            var POConfirmationsDataArray = parsedJsonPoData.POFetchOP.POConfirmationsData;
            console.log("POConfirmationsDataArray: " + POConfirmationsDataArray);
            console.log("POConfirmationsDataArray is Array: " + Array.isArray(POConfirmationsDataArray));
            if (POConfirmationsDataArray !== undefined) {
                if (Array.isArray(POConfirmationsDataArray) === true) {
                    console.log("POConfirmationsDataArray len: " + POConfirmationsDataArray.length);
                    for (var i = 0; i < POConfirmationsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POConfirmationsDataArray[i].LinkId)
                        {
                            var POConfirmationDataAsJsonObject = {};

                            POConfirmationDataAsJsonObject["LinkId"] = POConfirmationsDataArray[i].LinkId;
                            POConfirmationDataAsJsonObject["ItemNumber"] = POConfirmationsDataArray[i].ItemNumber;
                            POConfirmationDataAsJsonObject["ConfControl"] = POConfirmationsDataArray[i].ConfControl;
                            POConfirmationDataAsJsonObject["OrderAck"] = POConfirmationsDataArray[i].OrderAck;
                            POConfirmationDataAsJsonObject["ConfirmnReq"] = POConfirmationsDataArray[i].ConfirmnReq;
                            POConfirmationDataAsJsonObject["RejectInd"] = POConfirmationsDataArray[i].RejectInd;

                            POConfirmationDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POConfirmationDataJsonArray.push(POConfirmationDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === POConfirmationsDataArray.LinkId)
                    {
                        var POConfirmationDataAsJsonObject = {};

                        POConfirmationDataAsJsonObject["LinkId"] = POConfirmationsDataArray.LinkId;
                        POConfirmationDataAsJsonObject["ItemNumber"] = POConfirmationsDataArray.ItemNumber;
                        POConfirmationDataAsJsonObject["ConfControl"] = POConfirmationsDataArray.ConfControl;
                        POConfirmationDataAsJsonObject["OrderAck"] = POConfirmationsDataArray.OrderAck;
                        POConfirmationDataAsJsonObject["ConfirmnReq"] = POConfirmationsDataArray.ConfirmnReq;
                        POConfirmationDataAsJsonObject["RejectInd"] = POConfirmationsDataArray.RejectInd;

                        POConfirmationDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POConfirmationDataJsonArray.push(POConfirmationDataAsJsonObject);
                    }
                }
            }
            // POConfirmationsData Ends

            // POCondCtrlData Starts
            var POCondCtrlDataArray = parsedJsonPoData.POFetchOP.POCondCtrlData;
            console.log("POCondCtrlDataArray: " + POCondCtrlDataArray);
            console.log("POCondCtrlDataArray is Array: " + Array.isArray(POCondCtrlDataArray));
            if (POCondCtrlDataArray !== undefined) {
                if (Array.isArray(POCondCtrlDataArray) === true) {
                    console.log("POCondCtrlDataArray len: " + POCondCtrlDataArray.length);
                    for (var i = 0; i < POCondCtrlDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POCondCtrlDataArray[i].LinkId)
                        {
                            var POCondCtrlDataAsJsonObject = {};

                            POCondCtrlDataAsJsonObject["LinkId"] = POCondCtrlDataArray[i].LinkId;
                            POCondCtrlDataAsJsonObject["ItemNumber"] = POCondCtrlDataArray[i].ItemNumber;
                            POCondCtrlDataAsJsonObject["PrintPrice"] = POCondCtrlDataArray[i].PrintPrice;
                            POCondCtrlDataAsJsonObject["EstimatedPrice"] = POCondCtrlDataArray[i].EstimatedPrice;

                            POCondCtrlDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POCondCtrlDataJsonArray.push(POCondCtrlDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === POCondCtrlDataArray.LinkId)
                    {
                        var POCondCtrlDataAsJsonObject = {};

                        POCondCtrlDataAsJsonObject["LinkId"] = POCondCtrlDataArray.LinkId;
                        POCondCtrlDataAsJsonObject["ItemNumber"] = POCondCtrlDataArray.ItemNumber;
                        POCondCtrlDataAsJsonObject["PrintPrice"] = POCondCtrlDataArray.PrintPrice;
                        POCondCtrlDataAsJsonObject["EstimatedPrice"] = POCondCtrlDataArray.EstimatedPrice;

                        POCondCtrlDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POCondCtrlDataJsonArray.push(POCondCtrlDataAsJsonObject);
                    }
                }
            }
            // POCondCtrlData Ends

            // POQuantityWeightsData Starts 
            var POQuantityWeightsDataArray = parsedJsonPoData.POFetchOP.POQuantityWeightsData;
            console.log("POQuantityWeightsDataArray: " + POQuantityWeightsDataArray);
            console.log("POQuantityWeightsDataArray is Array: " + Array.isArray(POQuantityWeightsDataArray));
            if (POQuantityWeightsDataArray !== undefined) {
                if (Array.isArray(POQuantityWeightsDataArray) === true)
                {
                    console.log("POQuantityWeightsDataArray len: " + POQuantityWeightsDataArray.length);
                    for (var i = 0; i < POQuantityWeightsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POQuantityWeightsDataArray[i].LinkID)
                        {
                            var POQuantityWeightsDataAsJsonObject = {};

                            POQuantityWeightsDataAsJsonObject["LinkID"] = POQuantityWeightsDataArray[i].LinkID;
                            POQuantityWeightsDataAsJsonObject["ItemNumber"] = POQuantityWeightsDataArray[i].ItemNumber;
                            POQuantityWeightsDataAsJsonObject["POQuantity"] = POQuantityWeightsDataArray[i].POQuantity;
                            POQuantityWeightsDataAsJsonObject["POQuantityUnit"] = POQuantityWeightsDataArray[i].POQuantityUnit;
                            POQuantityWeightsDataAsJsonObject["POQuantitySKU"] = POQuantityWeightsDataArray[i].POQuantitySKU;
                            POQuantityWeightsDataAsJsonObject["POQuantitySKUUnit"] = POQuantityWeightsDataArray[i].POQuantitySKUUnit;
                            POQuantityWeightsDataAsJsonObject["Order1"] = POQuantityWeightsDataArray[i].Order1;
                            POQuantityWeightsDataAsJsonObject["OrderUnit1"] = POQuantityWeightsDataArray[i].OrderUnit1;
                            POQuantityWeightsDataAsJsonObject["Order2"] = POQuantityWeightsDataArray[i].Order2;
                            POQuantityWeightsDataAsJsonObject["OrderUnit2"] = POQuantityWeightsDataArray[i].OrderUnit2;
                            POQuantityWeightsDataAsJsonObject["OrderPrice"] = POQuantityWeightsDataArray[i].OrderPrice;
                            POQuantityWeightsDataAsJsonObject["OrderPriceUnit"] = POQuantityWeightsDataArray[i].OrderPriceUnit;
                            POQuantityWeightsDataAsJsonObject["SKU"] = POQuantityWeightsDataArray[i].SKU;
                            POQuantityWeightsDataAsJsonObject["SKUUnit"] = POQuantityWeightsDataArray[i].SKUUnit;

                            POQuantityWeightsDataAsJsonObject["NetWeight"] = POQuantityWeightsDataArray[i].Netweight === undefined ? "" : POQuantityWeightsDataArray[i].Netweight;
                            POQuantityWeightsDataAsJsonObject["GrossWeight"] = POQuantityWeightsDataArray[i].Grossweight === undefined ? "" : POQuantityWeightsDataArray[i].Grossweight;
                            POQuantityWeightsDataAsJsonObject["Volume"] = POQuantityWeightsDataArray[i].Volume === undefined ? "" : POQuantityWeightsDataArray[i].Volume;
                            POQuantityWeightsDataAsJsonObject["Points"] = POQuantityWeightsDataArray[i].Points === undefined ? "" : POQuantityWeightsDataArray[i].Points;
                            POQuantityWeightsDataAsJsonObject["NetWeightUnit"] = POQuantityWeightsDataArray[i].netweightUnit === undefined ? "" : POQuantityWeightsDataArray[i].netweightUnit;
                            POQuantityWeightsDataAsJsonObject["GrossWgtUnit"] = POQuantityWeightsDataArray[i].grosswgtunit === undefined ? "" : POQuantityWeightsDataArray[i].grosswgtunit;
                            POQuantityWeightsDataAsJsonObject["NetWgtPerPrice"] = POQuantityWeightsDataArray[i].netwgtperprice === undefined ? "" : POQuantityWeightsDataArray[i].netwgtperprice;
                            POQuantityWeightsDataAsJsonObject["GrossWgtPerPrice"] = POQuantityWeightsDataArray[i].grosswgtperprice === undefined ? "" : POQuantityWeightsDataArray[i].grosswgtperprice;
                            POQuantityWeightsDataAsJsonObject["VolumePerPrice"] = POQuantityWeightsDataArray[i].volumeperprice === undefined ? "" : POQuantityWeightsDataArray[i].volumeperprice;
                            POQuantityWeightsDataAsJsonObject["PointsPerPrice"] = POQuantityWeightsDataArray[i].pointsperprice === undefined ? "" : POQuantityWeightsDataArray[i].pointsperprice;
                            POQuantityWeightsDataAsJsonObject["NetWgtOrderUnit"] = POQuantityWeightsDataArray[i].netwgtorderunit === undefined ? "" : POQuantityWeightsDataArray[i].netwgtorderunit;
                            POQuantityWeightsDataAsJsonObject["GrossWgtOrderUnit"] = POQuantityWeightsDataArray[i].grosswgtorderunit === undefined ? "" : POQuantityWeightsDataArray[i].grosswgtorderunit;
                            POQuantityWeightsDataAsJsonObject["VolumeOrderUnit"] = POQuantityWeightsDataArray[i].volumeorderunit === undefined ? "" : POQuantityWeightsDataArray[i].volumeorderunit;
                            POQuantityWeightsDataAsJsonObject["PointsOrderUnit"] = POQuantityWeightsDataArray[i].pointsorderunit === undefined ? "" : POQuantityWeightsDataArray[i].pointsorderunit;
                            POQuantityWeightsDataAsJsonObject["NetWeight2"] = POQuantityWeightsDataArray[i].netweight2 === undefined ? "" : POQuantityWeightsDataArray[i].netweight2;
                            POQuantityWeightsDataAsJsonObject["GrossWeight2"] = POQuantityWeightsDataArray[i].grossweight2 === undefined ? "" : POQuantityWeightsDataArray[i].grossweight2;
                            POQuantityWeightsDataAsJsonObject["Volume2"] = POQuantityWeightsDataArray[i].volume2 === undefined ? "" : POQuantityWeightsDataArray[i].volume2;
                            POQuantityWeightsDataAsJsonObject["Points2"] = POQuantityWeightsDataArray[i].points2 === undefined ? "" : POQuantityWeightsDataArray[i].points2;
                            POQuantityWeightsDataAsJsonObject["NetWeight2Unit"] = POQuantityWeightsDataArray[i].netweight2Unit === undefined ? "" : POQuantityWeightsDataArray[i].netweight2Unit;
                            POQuantityWeightsDataAsJsonObject["GrossWgt2Unit"] = POQuantityWeightsDataArray[i].grosswgt2unit === undefined ? "" : POQuantityWeightsDataArray[i].grosswgt2unit;

                            POQuantityWeightsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POQuantityWeightsDataJsonArray.push(POQuantityWeightsDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POQuantityWeightsDataArray.LinkID)
                    {
                        var POQuantityWeightsDataAsJsonObject = {};

                        POQuantityWeightsDataAsJsonObject["LinkID"] = POQuantityWeightsDataArray.LinkID;
                        POQuantityWeightsDataAsJsonObject["ItemNumber"] = POQuantityWeightsDataArray.ItemNumber;
                        POQuantityWeightsDataAsJsonObject["POQuantity"] = POQuantityWeightsDataArray.POQuantity;
                        POQuantityWeightsDataAsJsonObject["POQuantityUnit"] = POQuantityWeightsDataArray.POQuantityUnit;
                        POQuantityWeightsDataAsJsonObject["POQuantitySKU"] = POQuantityWeightsDataArray.POQuantitySKU;
                        POQuantityWeightsDataAsJsonObject["POQuantitySKUUnit"] = POQuantityWeightsDataArray.POQuantitySKUUnit;
                        POQuantityWeightsDataAsJsonObject["Order1"] = POQuantityWeightsDataArray.Order1;
                        POQuantityWeightsDataAsJsonObject["OrderUnit1"] = POQuantityWeightsDataArray.OrderUnit1;
                        POQuantityWeightsDataAsJsonObject["Order2"] = POQuantityWeightsDataArray.Order2;
                        POQuantityWeightsDataAsJsonObject["OrderUnit2"] = POQuantityWeightsDataArray.OrderUnit2;
                        POQuantityWeightsDataAsJsonObject["OrderPrice"] = POQuantityWeightsDataArray.OrderPrice;
                        POQuantityWeightsDataAsJsonObject["OrderPriceUnit"] = POQuantityWeightsDataArray.OrderPriceUnit;
                        POQuantityWeightsDataAsJsonObject["SKU"] = POQuantityWeightsDataArray.SKU;
                        POQuantityWeightsDataAsJsonObject["SKUUnit"] = POQuantityWeightsDataArray.SKUUnit;

                        POQuantityWeightsDataAsJsonObject["NetWeight"] = POQuantityWeightsDataArray.Netweight === undefined ? "" : POQuantityWeightsDataArray.Netweight;
                        POQuantityWeightsDataAsJsonObject["GrossWeight"] = POQuantityWeightsDataArray.Grossweight === undefined ? "" : POQuantityWeightsDataArray.Grossweight;
                        POQuantityWeightsDataAsJsonObject["Volume"] = POQuantityWeightsDataArray.Volume === undefined ? "" : POQuantityWeightsDataArray.Volume;
                        POQuantityWeightsDataAsJsonObject["Points"] = POQuantityWeightsDataArray.Points === undefined ? "" : POQuantityWeightsDataArray.Points;
                        POQuantityWeightsDataAsJsonObject["NetWeightUnit"] = POQuantityWeightsDataArray.netweightUnit === undefined ? "" : POQuantityWeightsDataArray.netweightUnit;
                        POQuantityWeightsDataAsJsonObject["GrossWgtUnit"] = POQuantityWeightsDataArray.grosswgtunit === undefined ? "" : POQuantityWeightsDataArray.grosswgtunit;
                        POQuantityWeightsDataAsJsonObject["NetWgtPerPrice"] = POQuantityWeightsDataArray.netwgtperprice === undefined ? "" : POQuantityWeightsDataArray.netwgtperprice;
                        POQuantityWeightsDataAsJsonObject["GrossWgtPerPrice"] = POQuantityWeightsDataArray.grosswgtperprice === undefined ? "" : POQuantityWeightsDataArray.grosswgtperprice;
                        POQuantityWeightsDataAsJsonObject["VolumePerPrice"] = POQuantityWeightsDataArray.volumeperprice === undefined ? "" : POQuantityWeightsDataArray.volumeperprice;
                        POQuantityWeightsDataAsJsonObject["PointsPerPrice"] = POQuantityWeightsDataArray.pointsperprice === undefined ? "" : POQuantityWeightsDataArray.pointsperprice;
                        POQuantityWeightsDataAsJsonObject["NetWgtOrderUnit"] = POQuantityWeightsDataArray.netwgtorderunit === undefined ? "" : POQuantityWeightsDataArray.netwgtorderunit;
                        POQuantityWeightsDataAsJsonObject["GrossWgtOrderUnit"] = POQuantityWeightsDataArray.grosswgtorderunit === undefined ? "" : POQuantityWeightsDataArray.grosswgtorderunit;
                        POQuantityWeightsDataAsJsonObject["VolumeOrderUnit"] = POQuantityWeightsDataArray.volumeorderunit === undefined ? "" : POQuantityWeightsDataArray.volumeorderunit;
                        POQuantityWeightsDataAsJsonObject["PointsOrderUnit"] = POQuantityWeightsDataArray.pointsorderunit === undefined ? "" : POQuantityWeightsDataArray.pointsorderunit;
                        POQuantityWeightsDataAsJsonObject["NetWeight2"] = POQuantityWeightsDataArray.netweight2 === undefined ? "" : POQuantityWeightsDataArray.netweight2;
                        POQuantityWeightsDataAsJsonObject["GrossWeight2"] = POQuantityWeightsDataArray.grossweight2 === undefined ? "" : POQuantityWeightsDataArray.grossweight2;
                        POQuantityWeightsDataAsJsonObject["Volume2"] = POQuantityWeightsDataArray.volume2 === undefined ? "" : POQuantityWeightsDataArray.volume2;
                        POQuantityWeightsDataAsJsonObject["Points2"] = POQuantityWeightsDataArray.points2 === undefined ? "" : POQuantityWeightsDataArray.points2;
                        POQuantityWeightsDataAsJsonObject["NetWeight2Unit"] = POQuantityWeightsDataArray.netweight2Unit === undefined ? "" : POQuantityWeightsDataArray.netweight2Unit;
                        POQuantityWeightsDataAsJsonObject["GrossWgt2Unit"] = POQuantityWeightsDataArray.grosswgt2unit === undefined ? "" : POQuantityWeightsDataArray.grosswgt2unit;

                        POQuantityWeightsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POQuantityWeightsDataJsonArray.push(POQuantityWeightsDataAsJsonObject);
                    }
                }
            }
            console.log("POQuantityWeightsDataJsonArray len: " + POQuantityWeightsDataJsonArray.length);
            // POQuantityWeightsData Ends

            // PODeliveryScheduleData Starts
            var PODeliveryScheduleDataArray = parsedJsonPoData.POFetchOP.PODeliveryScheduleData;
            console.log("PODeliveryScheduleDataArray: " + PODeliveryScheduleDataArray);
            console.log("PODeliveryScheduleDataArray is Array: " + Array.isArray(PODeliveryScheduleDataArray));
            if (PODeliveryScheduleDataArray !== undefined) {
                if (Array.isArray(PODeliveryScheduleDataArray) === true)
                {
                    console.log("PODeliveryScheduleDataArray len: " + PODeliveryScheduleDataArray.length);
                    for (var i = 0; i < PODeliveryScheduleDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === PODeliveryScheduleDataArray[i].LinkId)
                        {
                            var PODeliveryScheduleDataAsJsonObject = {};

                            PODeliveryScheduleDataAsJsonObject["ItemNo"] = PODeliveryScheduleDataArray[i].ItemNo;
                            PODeliveryScheduleDataAsJsonObject["LinkId"] = PODeliveryScheduleDataArray[i].LinkId;
                            PODeliveryScheduleDataAsJsonObject["DelDateCatg"] = PODeliveryScheduleDataArray[i].DelDateCatg;
                            PODeliveryScheduleDataAsJsonObject["DelDate"] = PODeliveryScheduleDataArray[i].DelDate;
                            PODeliveryScheduleDataAsJsonObject["ScheduledQuantity"] = PODeliveryScheduleDataArray[i].ScheduledQuantity;
                            PODeliveryScheduleDataAsJsonObject["DelTime"] = PODeliveryScheduleDataArray[i].DelTime;
                            PODeliveryScheduleDataAsJsonObject["PRNumber"] = PODeliveryScheduleDataArray[i].PRNumber;
                            PODeliveryScheduleDataAsJsonObject["ReqItemNo"] = PODeliveryScheduleDataArray[i].ReqItemNo;
                            PODeliveryScheduleDataAsJsonObject["StatisticalDeliveryDate"] = PODeliveryScheduleDataArray[i].Statisticaldeliverydate === undefined ? "" : PODeliveryScheduleDataArray[i].Statisticaldeliverydate;
                            PODeliveryScheduleDataAsJsonObject["GRQty"] = PODeliveryScheduleDataArray[i].GRQty === undefined ? "" : PODeliveryScheduleDataArray[i].GRQty;
                            PODeliveryScheduleDataAsJsonObject["OpenQuantity"] = PODeliveryScheduleDataArray[i].openquantity === undefined ? "" : PODeliveryScheduleDataArray[i].openquantity;

                            PODeliveryScheduleDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            PODeliveryScheduleDataJsonArray.push(PODeliveryScheduleDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === PODeliveryScheduleDataArray.LinkId)
                    {
                        var PODeliveryScheduleDataAsJsonObject = {};

                        PODeliveryScheduleDataAsJsonObject["ItemNo"] = PODeliveryScheduleDataArray.ItemNo;
                        PODeliveryScheduleDataAsJsonObject["LinkId"] = PODeliveryScheduleDataArray.LinkId;
                        PODeliveryScheduleDataAsJsonObject["DelDateCatg"] = PODeliveryScheduleDataArray.DelDateCatg;
                        PODeliveryScheduleDataAsJsonObject["DelDate"] = PODeliveryScheduleDataArray.DelDate;
                        PODeliveryScheduleDataAsJsonObject["ScheduledQuantity"] = PODeliveryScheduleDataArray.ScheduledQuantity;
                        PODeliveryScheduleDataAsJsonObject["DelTime"] = PODeliveryScheduleDataArray.DelTime;
                        PODeliveryScheduleDataAsJsonObject["PRNumber"] = PODeliveryScheduleDataArray.PRNumber;
                        PODeliveryScheduleDataAsJsonObject["ReqItemNo"] = PODeliveryScheduleDataArray.ReqItemNo;
                        PODeliveryScheduleDataAsJsonObject["StatisticalDeliveryDate"] = PODeliveryScheduleDataArray.Statisticaldeliverydate === undefined ? "" : PODeliveryScheduleDataArray.Statisticaldeliverydate;
                        PODeliveryScheduleDataAsJsonObject["GRQty"] = PODeliveryScheduleDataArray.GRQty === undefined ? "" : PODeliveryScheduleDataArray.GRQty;
                        PODeliveryScheduleDataAsJsonObject["OpenQuantity"] = PODeliveryScheduleDataArray.openquantity === undefined ? "" : PODeliveryScheduleDataArray.openquantity;

                        PODeliveryScheduleDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        PODeliveryScheduleDataJsonArray.push(PODeliveryScheduleDataAsJsonObject);
                    }
                }
            }
            // PODeliveryScheduleData Ends

            // POLimitsData Starts
            var POLimitsDataArray = parsedJsonPoData.POFetchOP.POLimitsData;
            console.log("POLimitsDataArray: " + POLimitsDataArray);
            console.log("POLimitsDataArray is Array: " + Array.isArray(POLimitsDataArray));
            if (POLimitsDataArray !== undefined) {
                if (Array.isArray(POLimitsDataArray) === true)
                {
                    console.log("POLimitsDataArray len: " + POLimitsDataArray.length);
                    for (var i = 0; i < POLimitsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POLimitsDataArray[i].LinkId)
                        {
                            var POLimitsDataAsJsonObject = {};

                            POLimitsDataAsJsonObject["ItemNumber"] = POLimitsDataArray[i].ItemNumber;
                            POLimitsDataAsJsonObject["LinkId"] = POLimitsDataArray[i].LinkId;
                            POLimitsDataAsJsonObject["OverallLimit"] = POLimitsDataArray[i].OverallLimit;
                            POLimitsDataAsJsonObject["ExpectedValue"] = POLimitsDataArray[i].ExpectedValue;
                            POLimitsDataAsJsonObject["NoLimit"] = POLimitsDataArray[i].NoLimit;
                            POLimitsDataAsJsonObject["ActualValue"] = POLimitsDataArray[i].ActualValue === undefined ? "" : POLimitsDataArray[i].ActualValue;

                            POLimitsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POLimitsDataJsonArray.push(POLimitsDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POLimitsDataArray.LinkId)
                    {
                        var POLimitsDataAsJsonObject = {};

                        POLimitsDataAsJsonObject["ItemNumber"] = POLimitsDataArray.ItemNumber;
                        POLimitsDataAsJsonObject["LinkId"] = POLimitsDataArray.LinkId;
                        POLimitsDataAsJsonObject["OverallLimit"] = POLimitsDataArray.OverallLimit;
                        POLimitsDataAsJsonObject["ExpectedValue"] = POLimitsDataArray.ExpectedValue;
                        POLimitsDataAsJsonObject["NoLimit"] = POLimitsDataArray.NoLimit;
                        POLimitsDataAsJsonObject["ActualValue"] = POLimitsDataArray.ActualValue === undefined ? "" : POLimitsDataArray.ActualValue;

                        POLimitsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POLimitsDataJsonArray.push(POLimitsDataAsJsonObject);
                    }
                }
            }
            // POLimitsData Ends

            // POTextsData Starts
            var POTextsDataArray = parsedJsonPoData.POFetchOP.POTextsData;
            console.log("POTextsDataArray: " + POTextsDataArray);
            console.log("POTextsDataArray is Array: " + Array.isArray(POTextsDataArray));
            if (POTextsDataArray !== undefined) {
                if (Array.isArray(POTextsDataArray) === true)
                {
                    console.log("POTextsDataArray len: " + POTextsDataArray.length);
                    for (var i = 0; i < POTextsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POTextsDataArray[i].LinkId)
                        {
                            var POTextsDataAsJsonObject = {};

                            POTextsDataAsJsonObject["ItemNumber"] = POTextsDataArray[i].ItemNumber;
                            POTextsDataAsJsonObject["LinkId"] = POTextsDataArray[i].LinkId;
                            POTextsDataAsJsonObject["ItemText"] = POTextsDataArray[i].ItemText;
                            POTextsDataAsJsonObject["InfoRecordPOText"] = POTextsDataArray[i].InfoRecordPOText;
                            POTextsDataAsJsonObject["MaterialPOText"] = POTextsDataArray[i].MaterialPOText;
                            POTextsDataAsJsonObject["PONoteToApprover"] = POTextsDataArray[i].PONoteToApprover;
                            POTextsDataAsJsonObject["DeliveryText"] = POTextsDataArray[i].DeliveryText;
                            POTextsDataAsJsonObject["PrNoteToApproval"] = POTextsDataArray[i].PrnotetoApproval === undefined ? "" : POTextsDataArray[i].PrnotetoApproval;

                            POTextsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POTextsDataJsonArray.push(POTextsDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POTextsDataArray.LinkId)
                    {
                        var POTextsDataAsJsonObject = {};

                        POTextsDataAsJsonObject["ItemNumber"] = POTextsDataArray.ItemNumber;
                        POTextsDataAsJsonObject["LinkId"] = POTextsDataArray.LinkId;
                        POTextsDataAsJsonObject["ItemText"] = POTextsDataArray.ItemText;
                        POTextsDataAsJsonObject["InfoRecordPOText"] = POTextsDataArray.InfoRecordPOText;
                        POTextsDataAsJsonObject["MaterialPOText"] = POTextsDataArray.MaterialPOText;
                        POTextsDataAsJsonObject["PONoteToApprover"] = POTextsDataArray.PONoteToApprover;
                        POTextsDataAsJsonObject["DeliveryText"] = POTextsDataArray.DeliveryText;
                        POTextsDataAsJsonObject["PrNoteToApproval"] = POTextsDataArray.PrnotetoApproval === undefined ? "" : POTextsDataArray.PrnotetoApproval;

                        POTextsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POTextsDataJsonArray.push(POTextsDataAsJsonObject);
                    }
                }
            }
            // POTextsData Ends

            // POLineItemCustomerData Starts
            var POLineItemCustomerDataArray = parsedJsonPoData.POFetchOP.POLineItemCustomerData;
            console.log("POLineItemCustomerDataArray: " + JSON.stringify(POLineItemCustomerDataArray));
            console.log("POLineItemCustomerDataArray is Array: " + Array.isArray(POLineItemCustomerDataArray));
            if (POLineItemCustomerDataArray !== undefined) {
                if (Array.isArray(POLineItemCustomerDataArray) === true)
                {
                    console.log("POLineItemCustomerDataArray len: " + POLineItemCustomerDataArray.length);
                    for (var i = 0; i < POLineItemCustomerDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POLineItemCustomerDataArray[i].LinkId)
                        {
                            var POLineItemCustomerDataJsonObject = {};

                            POLineItemCustomerDataJsonObject["ItemNumber"] = POLineItemCustomerDataArray[i].ItemNumber;
                            POLineItemCustomerDataJsonObject["LinkId"] = POLineItemCustomerDataArray[i].LinkId;
                            POLineItemCustomerDataJsonObject["ProductOrigin"] = POLineItemCustomerDataArray[i].ProductOrigin;
                            POLineItemCustomerDataJsonObject["Segment"] = POLineItemCustomerDataArray[i].Segment;

                            POLineItemCustomerDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POLineItemCustomerDataJsonArray.push(POLineItemCustomerDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POLineItemCustomerDataArray.LinkId)
                    {
                        var POLineItemCustomerDataJsonObject = {};

                        POLineItemCustomerDataJsonObject["ItemNumber"] = POLineItemCustomerDataArray.ItemNumber;
                        POLineItemCustomerDataJsonObject["LinkId"] = POLineItemCustomerDataArray.LinkId;
                        POLineItemCustomerDataJsonObject["ProductOrigin"] = POLineItemCustomerDataArray.ProductOrigin;
                        POLineItemCustomerDataJsonObject["Segment"] = POLineItemCustomerDataArray.Segment;

                        POLineItemCustomerDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POLineItemCustomerDataJsonArray.push(POLineItemCustomerDataJsonObject);
                    }
                }
            }
            // POLineItemCustomerData Ends

            // POMaterialData Starts
            var POMaterialDataArray = parsedJsonPoData.POFetchOP.POMaterialData;
            console.log("POMaterialDataArray: " + JSON.stringify(POMaterialDataArray));
            console.log("POMaterialDataArray is Array: " + Array.isArray(POMaterialDataArray));
            if (POMaterialDataArray !== undefined)
            {
                if (Array.isArray(POMaterialDataArray) === true)
                {
                    console.log("POMaterialDataArray len: " + POMaterialDataArray.length);
                    for (var i = 0; i < POMaterialDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POMaterialDataArray[i].LinkId)
                        {
                            var POMaterialDataJsonObject = {};

                            POMaterialDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POMaterialDataJsonObject["ItemNo"] = POMaterialDataArray[i].ItemNo === undefined ? "" : POMaterialDataArray[i].ItemNo;
                            POMaterialDataJsonObject["LinkId"] = POMaterialDataArray[i].LinkId === undefined ? "" : POMaterialDataArray[i].LinkId;
                            POMaterialDataJsonObject["MfrPartNumber"] = POMaterialDataArray[i].MfrPartNumber === undefined ? "" : POMaterialDataArray[i].MfrPartNumber;
                            POMaterialDataJsonObject["Manufacturer"] = POMaterialDataArray[i].Manufacturer === undefined ? "" : POMaterialDataArray[i].Manufacturer;
                            POMaterialDataJsonObject["RevisionLevel"] = POMaterialDataArray[i].revisionlevel === undefined ? "" : POMaterialDataArray[i].revisionlevel;
                            POMaterialDataJsonObject["VendMatNo"] = POMaterialDataArray[i].VendMatno === undefined ? "" : POMaterialDataArray[i].VendMatno;
                            POMaterialDataJsonObject["EANUPC"] = POMaterialDataArray[i].EANUPC === undefined ? "" : POMaterialDataArray[i].EANUPC;
                            POMaterialDataJsonObject["VendorSubrange"] = POMaterialDataArray[i].Vendorsubrange === undefined ? "" : POMaterialDataArray[i].Vendorsubrange;
                            POMaterialDataJsonObject["Batch"] = POMaterialDataArray[i].Batch === undefined ? "" : POMaterialDataArray[i].Batch;
                            POMaterialDataJsonObject["VendorBatch"] = POMaterialDataArray[i].vendorbatch === undefined ? "" : POMaterialDataArray[i].vendorbatch;
                            POMaterialDataJsonObject["InfoUpdate"] = POMaterialDataArray[i].infoupdate === undefined ? "" : POMaterialDataArray[i].infoupdate;

                            POMaterialDataJsonArray.push(POMaterialDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POMaterialDataArray.LinkId)
                    {
                        var POMaterialDataJsonObject = {};

                        POMaterialDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POMaterialDataJsonObject["ItemNo"] = POMaterialDataArray.ItemNo === undefined ? "" : POMaterialDataArray.ItemNo;
                        POMaterialDataJsonObject["LinkId"] = POMaterialDataArray.LinkId === undefined ? "" : POMaterialDataArray.LinkId;
                        POMaterialDataJsonObject["MfrPartNumber"] = POMaterialDataArray.MfrPartNumber === undefined ? "" : POMaterialDataArray.MfrPartNumber;
                        POMaterialDataJsonObject["Manufacturer"] = POMaterialDataArray.Manufacturer === undefined ? "" : POMaterialDataArray.Manufacturer;
                        POMaterialDataJsonObject["RevisionLevel"] = POMaterialDataArray.revisionlevel === undefined ? "" : POMaterialDataArray.revisionlevel;
                        POMaterialDataJsonObject["VendMatNo"] = POMaterialDataArray.VendMatno === undefined ? "" : POMaterialDataArray.VendMatno;
                        POMaterialDataJsonObject["EANUPC"] = POMaterialDataArray.EANUPC === undefined ? "" : POMaterialDataArray.EANUPC;
                        POMaterialDataJsonObject["VendorSubrange"] = POMaterialDataArray.Vendorsubrange === undefined ? "" : POMaterialDataArray.Vendorsubrange;
                        POMaterialDataJsonObject["Batch"] = POMaterialDataArray.Batch === undefined ? "" : POMaterialDataArray.Batch;
                        POMaterialDataJsonObject["VendorBatch"] = POMaterialDataArray.vendorbatch === undefined ? "" : POMaterialDataArray.vendorbatch;
                        POMaterialDataJsonObject["InfoUpdate"] = POMaterialDataArray.infoupdate === undefined ? "" : POMaterialDataArray.infoupdate;

                        POMaterialDataJsonArray.push(POMaterialDataJsonObject);
                    }
                }
            }
            // POMaterialData Ends

            // POComponentsData Starts
            var POComponentsDataArray = parsedJsonPoData.POFetchOP.POComponentsData;
            console.log("POComponentsDataArray: " + JSON.stringify(POComponentsDataArray));
            console.log("POComponentsDataArray is Array: " + Array.isArray(POComponentsDataArray));
            if (POComponentsDataArray !== undefined)
            {
                if (Array.isArray(POComponentsDataArray) === true)
                {
                    console.log("POComponentsDataArray len: " + POComponentsDataArray.length);
                    for (var i = 0; i < POComponentsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POComponentsDataArray[i].LinkId)
                        {
                            var POComponentsDataJsonObject = {};

                            POComponentsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POComponentsDataJsonObject["ItemNo"] = POComponentsDataArray[i].itemno === undefined ? "" : POComponentsDataArray[i].itemno;
                            POComponentsDataJsonObject["LinkId"] = POComponentsDataArray[i].LinkId === undefined ? "" : POComponentsDataArray[i].LinkId;
                            POComponentsDataJsonObject["MaterialCode"] = POComponentsDataArray[i].MaterialCode === undefined ? "" : POComponentsDataArray[i].MaterialCode;
                            POComponentsDataJsonObject["Description"] = POComponentsDataArray[i].Description === undefined ? "" : POComponentsDataArray[i].Description;
                            POComponentsDataJsonObject["Quantity"] = POComponentsDataArray[i].Quantity === undefined ? "" : POComponentsDataArray[i].Quantity;
                            POComponentsDataJsonObject["Plant"] = POComponentsDataArray[i].Plant === undefined ? "" : POComponentsDataArray[i].Plant;
                            POComponentsDataJsonObject["Unit"] = POComponentsDataArray[i].Unit === undefined ? "" : POComponentsDataArray[i].Unit;
                            POComponentsDataJsonObject["FixedQty"] = POComponentsDataArray[i].FixedQty === undefined ? "" : POComponentsDataArray[i].FixedQty;
                            POComponentsDataJsonObject["ProdStorageLocation"] = POComponentsDataArray[i].ProdStorageLocation === undefined ? "" : POComponentsDataArray[i].ProdStorageLocation;
                            POComponentsDataJsonObject["RequirementDate"] = POComponentsDataArray[i].RequirementDate === undefined ? "" : POComponentsDataArray[i].RequirementDate;
                            POComponentsDataJsonObject["QtyFixed"] = POComponentsDataArray[i].qtyfixed === undefined ? "" : POComponentsDataArray[i].qtyfixed;
                            POComponentsDataJsonObject["LatestReqDate"] = POComponentsDataArray[i].latestreqdate === undefined ? "" : POComponentsDataArray[i].latestreqdate;
                            POComponentsDataJsonObject["DistribKey"] = POComponentsDataArray[i].distribkey === undefined ? "" : POComponentsDataArray[i].distribkey;
                            POComponentsDataJsonObject["Batch"] = POComponentsDataArray[i].batch === undefined ? "" : POComponentsDataArray[i].batch;
                            POComponentsDataJsonObject["ChangeId"] = POComponentsDataArray[i].ChangeId === undefined ? "" : POComponentsDataArray[i].ChangeId;

                            POComponentsDataJsonArray.push(POComponentsDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POComponentsDataArray.LinkId)
                    {
                        var POComponentsDataJsonObject = {};

                        POComponentsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POComponentsDataJsonObject["ItemNo"] = POComponentsDataArray.itemno === undefined ? "" : POComponentsDataArray.itemno;
                        POComponentsDataJsonObject["LinkId"] = POComponentsDataArray.LinkId === undefined ? "" : POComponentsDataArray.LinkId;
                        POComponentsDataJsonObject["MaterialCode"] = POComponentsDataArray.MaterialCode === undefined ? "" : POComponentsDataArray.MaterialCode;
                        POComponentsDataJsonObject["Description"] = POComponentsDataArray.Description === undefined ? "" : POComponentsDataArray.Description;
                        POComponentsDataJsonObject["Quantity"] = POComponentsDataArray.Quantity === undefined ? "" : POComponentsDataArray.Quantity;
                        POComponentsDataJsonObject["Plant"] = POComponentsDataArray.Plant === undefined ? "" : POComponentsDataArray.Plant;
                        POComponentsDataJsonObject["Unit"] = POComponentsDataArray.Unit === undefined ? "" : POComponentsDataArray.Unit;
                        POComponentsDataJsonObject["FixedQty"] = POComponentsDataArray.FixedQty === undefined ? "" : POComponentsDataArray.FixedQty;
                        POComponentsDataJsonObject["ProdStorageLocation"] = POComponentsDataArray.ProdStorageLocation === undefined ? "" : POComponentsDataArray.ProdStorageLocation;
                        POComponentsDataJsonObject["RequirementDate"] = POComponentsDataArray.RequirementDate === undefined ? "" : POComponentsDataArray.RequirementDate;
                        POComponentsDataJsonObject["QtyFixed"] = POComponentsDataArray.qtyfixed === undefined ? "" : POComponentsDataArray.qtyfixed;
                        POComponentsDataJsonObject["LatestReqDate"] = POComponentsDataArray.latestreqdate === undefined ? "" : POComponentsDataArray.latestreqdate;
                        POComponentsDataJsonObject["DistribKey"] = POComponentsDataArray.distribkey === undefined ? "" : POComponentsDataArray.distribkey;
                        POComponentsDataJsonObject["Batch"] = POComponentsDataArray.batch === undefined ? "" : POComponentsDataArray.batch;
                        POComponentsDataJsonObject["ChangeId"] = POComponentsDataArray.ChangeId === undefined ? "" : POComponentsDataArray.ChangeId;

                        POComponentsDataJsonArray.push(POComponentsDataJsonObject);
                    }
                }
            }
            // POComponentsData Ends

            // POProfitabilitySegmentDetailsData Starts
            var POProfitabilitySegmentDetailsDataArray = parsedJsonPoData.POFetchOP.POProfitabilitySegmentDetailsData;
            console.log("POProfitabilitySegmentDetailsDataArray: " + JSON.stringify(POProfitabilitySegmentDetailsDataArray));
            console.log("POProfitabilitySegmentDetailsDataArray is Array: " + Array.isArray(POProfitabilitySegmentDetailsDataArray));
            if (POProfitabilitySegmentDetailsDataArray !== undefined)
            {
                if (Array.isArray(POProfitabilitySegmentDetailsDataArray) === true)
                {
                    console.log("POProfitabilitySegmentDetailsDataArray len: " + POProfitabilitySegmentDetailsDataArray.length);
                    for (var i = 0; i < POProfitabilitySegmentDetailsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POProfitabilitySegmentDetailsDataArray[i].LinkId)
                        {
                            var POProfitabilitySegmentDetailsDataJsonObject = {};

                            POProfitabilitySegmentDetailsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POProfitabilitySegmentDetailsDataJsonObject["ItemNo"] = POProfitabilitySegmentDetailsDataArray[i].Itemno === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Itemno;
                            POProfitabilitySegmentDetailsDataJsonObject["LinkId"] = POProfitabilitySegmentDetailsDataArray[i].LinkID === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].LinkID;
                            POProfitabilitySegmentDetailsDataJsonObject["CustomerCode"] = POProfitabilitySegmentDetailsDataArray[i].CustomerCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CustomerCode;
                            POProfitabilitySegmentDetailsDataJsonObject["Product"] = POProfitabilitySegmentDetailsDataArray[i].Product === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Product;
                            POProfitabilitySegmentDetailsDataJsonObject["BillingType"] = POProfitabilitySegmentDetailsDataArray[i].BillingType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].BillingType;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesOrder"] = POProfitabilitySegmentDetailsDataArray[i].SalesOrder === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesOrder;
                            POProfitabilitySegmentDetailsDataJsonObject["ItemNumber"] = POProfitabilitySegmentDetailsDataArray[i].ItemNumber === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ItemNumber;
                            POProfitabilitySegmentDetailsDataJsonObject["OrderVal"] = POProfitabilitySegmentDetailsDataArray[i].OrderVal === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].OrderVal;
                            POProfitabilitySegmentDetailsDataJsonObject["CompanyCode"] = POProfitabilitySegmentDetailsDataArray[i].CompanyCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CompanyCode;
                            POProfitabilitySegmentDetailsDataJsonObject["Plant"] = POProfitabilitySegmentDetailsDataArray[i].Plant === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Plant;
                            POProfitabilitySegmentDetailsDataJsonObject["BusinessArea"] = POProfitabilitySegmentDetailsDataArray[i].BusinessArea === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].BusinessArea;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesOrganization"] = POProfitabilitySegmentDetailsDataArray[i].SalesOrganization === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesOrganization;
                            POProfitabilitySegmentDetailsDataJsonObject["DistrChannel"] = POProfitabilitySegmentDetailsDataArray[i].DistrChannel === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].DistrChannel;
                            POProfitabilitySegmentDetailsDataJsonObject["Division"] = POProfitabilitySegmentDetailsDataArray[i].Division === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Division;
                            POProfitabilitySegmentDetailsDataJsonObject["WBSElement"] = POProfitabilitySegmentDetailsDataArray[i].WBSElement === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].WBSElement;
                            POProfitabilitySegmentDetailsDataJsonObject["CostObject"] = POProfitabilitySegmentDetailsDataArray[i].CostObject === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CostObject;
                            POProfitabilitySegmentDetailsDataJsonObject["ProfitCentre"] = POProfitabilitySegmentDetailsDataArray[i].ProfitCentre === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProfitCentre;
                            POProfitabilitySegmentDetailsDataJsonObject["PartnerPC"] = POProfitabilitySegmentDetailsDataArray[i].PartnerPC === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].PartnerPC;
                            POProfitabilitySegmentDetailsDataJsonObject["Country"] = POProfitabilitySegmentDetailsDataArray[i].Country === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Country;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesOffice"] = POProfitabilitySegmentDetailsDataArray[i].SalesOffice === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesOffice;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesEmployee"] = POProfitabilitySegmentDetailsDataArray[i].SalesEmployee === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesEmployee;
                            POProfitabilitySegmentDetailsDataJsonObject["MatlGroup"] = POProfitabilitySegmentDetailsDataArray[i].MatlGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].MatlGroup;
                            POProfitabilitySegmentDetailsDataJsonObject["ProdHierarchy"] = POProfitabilitySegmentDetailsDataArray[i].ProdHierarchy === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProdHierarchy;
                            POProfitabilitySegmentDetailsDataJsonObject["ItemCategory"] = POProfitabilitySegmentDetailsDataArray[i].ItemCategory === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ItemCategory;
                            POProfitabilitySegmentDetailsDataJsonObject["HigherLevelItem"] = POProfitabilitySegmentDetailsDataArray[i].HigherLevelItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].HigherLevelItem;
                            POProfitabilitySegmentDetailsDataJsonObject["Industry"] = POProfitabilitySegmentDetailsDataArray[i].Industry === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Industry;
                            POProfitabilitySegmentDetailsDataJsonObject["CustomerGroup"] = POProfitabilitySegmentDetailsDataArray[i].CustomerGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CustomerGroup;
                            POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel1"] = POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel1;
                            POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel2"] = POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel2;
                            POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel3"] = POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel3;
                            POProfitabilitySegmentDetailsDataJsonObject["MaterialType"] = POProfitabilitySegmentDetailsDataArray[i].MaterialType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].MaterialType;
                            POProfitabilitySegmentDetailsDataJsonObject["ReferenceDoc"] = POProfitabilitySegmentDetailsDataArray[i].ReferenceDoc === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ReferenceDoc;
                            POProfitabilitySegmentDetailsDataJsonObject["PROJECTNUMBER1"] = POProfitabilitySegmentDetailsDataArray[i].PROJECTNUMBER1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].PROJECTNUMBER1;
                            POProfitabilitySegmentDetailsDataJsonObject["ProjectIndicator"] = POProfitabilitySegmentDetailsDataArray[i].ProjectIndicator === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProjectIndicator;
                            POProfitabilitySegmentDetailsDataJsonObject["ValuationType"] = POProfitabilitySegmentDetailsDataArray[i].ValuationType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ValuationType;
                            POProfitabilitySegmentDetailsDataJsonObject["CustomerClass"] = POProfitabilitySegmentDetailsDataArray[i].CustomerClass === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CustomerClass;
                            POProfitabilitySegmentDetailsDataJsonObject["MaterialSourceInd"] = POProfitabilitySegmentDetailsDataArray[i].MaterialSourceInd === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].MaterialSourceInd;
                            POProfitabilitySegmentDetailsDataJsonObject["ContractType"] = POProfitabilitySegmentDetailsDataArray[i].ContractType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ContractType;
                            POProfitabilitySegmentDetailsDataJsonObject["ShipToParty"] = POProfitabilitySegmentDetailsDataArray[i].ShipToParty === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ShipToParty;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryCode1"] = POProfitabilitySegmentDetailsDataArray[i].IndustryCode1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryCode1;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryField1"] = POProfitabilitySegmentDetailsDataArray[i].IndustryField1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryField1;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryCode2"] = POProfitabilitySegmentDetailsDataArray[i].IndustryCode2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryCode2;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryCode3"] = POProfitabilitySegmentDetailsDataArray[i].IndustryCode3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryCode3;
                            POProfitabilitySegmentDetailsDataJsonObject["ReferenceItem"] = POProfitabilitySegmentDetailsDataArray[i].ReferenceItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ReferenceItem;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesDocType"] = POProfitabilitySegmentDetailsDataArray[i].SalesDocType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesDocType;

                            POProfitabilitySegmentDetailsDataJsonArray.push(POProfitabilitySegmentDetailsDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POProfitabilitySegmentDetailsDataArray.LinkId)
                    {
                        var POProfitabilitySegmentDetailsDataJsonObject = {};

                        POProfitabilitySegmentDetailsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POProfitabilitySegmentDetailsDataJsonObject["ItemNo"] = POProfitabilitySegmentDetailsDataArray.Itemno === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Itemno;
                        POProfitabilitySegmentDetailsDataJsonObject["LinkId"] = POProfitabilitySegmentDetailsDataArray.LinkID === undefined ? "" : POProfitabilitySegmentDetailsDataArray.LinkID;
                        POProfitabilitySegmentDetailsDataJsonObject["CustomerCode"] = POProfitabilitySegmentDetailsDataArray.CustomerCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CustomerCode;
                        POProfitabilitySegmentDetailsDataJsonObject["Product"] = POProfitabilitySegmentDetailsDataArray.Product === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Product;
                        POProfitabilitySegmentDetailsDataJsonObject["BillingType"] = POProfitabilitySegmentDetailsDataArray.BillingType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.BillingType;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesOrder"] = POProfitabilitySegmentDetailsDataArray.SalesOrder === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesOrder;
                        POProfitabilitySegmentDetailsDataJsonObject["ItemNumber"] = POProfitabilitySegmentDetailsDataArray.ItemNumber === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ItemNumber;
                        POProfitabilitySegmentDetailsDataJsonObject["OrderVal"] = POProfitabilitySegmentDetailsDataArray.OrderVal === undefined ? "" : POProfitabilitySegmentDetailsDataArray.OrderVal;
                        POProfitabilitySegmentDetailsDataJsonObject["CompanyCode"] = POProfitabilitySegmentDetailsDataArray.CompanyCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CompanyCode;
                        POProfitabilitySegmentDetailsDataJsonObject["Plant"] = POProfitabilitySegmentDetailsDataArray.Plant === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Plant;
                        POProfitabilitySegmentDetailsDataJsonObject["BusinessArea"] = POProfitabilitySegmentDetailsDataArray.BusinessArea === undefined ? "" : POProfitabilitySegmentDetailsDataArray.BusinessArea;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesOrganization"] = POProfitabilitySegmentDetailsDataArray.SalesOrganization === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesOrganization;
                        POProfitabilitySegmentDetailsDataJsonObject["DistrChannel"] = POProfitabilitySegmentDetailsDataArray.DistrChannel === undefined ? "" : POProfitabilitySegmentDetailsDataArray.DistrChannel;
                        POProfitabilitySegmentDetailsDataJsonObject["Division"] = POProfitabilitySegmentDetailsDataArray.Division === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Division;
                        POProfitabilitySegmentDetailsDataJsonObject["WBSElement"] = POProfitabilitySegmentDetailsDataArray.WBSElement === undefined ? "" : POProfitabilitySegmentDetailsDataArray.WBSElement;
                        POProfitabilitySegmentDetailsDataJsonObject["CostObject"] = POProfitabilitySegmentDetailsDataArray.CostObject === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CostObject;
                        POProfitabilitySegmentDetailsDataJsonObject["ProfitCentre"] = POProfitabilitySegmentDetailsDataArray.ProfitCentre === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProfitCentre;
                        POProfitabilitySegmentDetailsDataJsonObject["PartnerPC"] = POProfitabilitySegmentDetailsDataArray.PartnerPC === undefined ? "" : POProfitabilitySegmentDetailsDataArray.PartnerPC;
                        POProfitabilitySegmentDetailsDataJsonObject["Country"] = POProfitabilitySegmentDetailsDataArray.Country === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Country;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesOffice"] = POProfitabilitySegmentDetailsDataArray.SalesOffice === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesOffice;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesEmployee"] = POProfitabilitySegmentDetailsDataArray.SalesEmployee === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesEmployee;
                        POProfitabilitySegmentDetailsDataJsonObject["MatlGroup"] = POProfitabilitySegmentDetailsDataArray.MatlGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray.MatlGroup;
                        POProfitabilitySegmentDetailsDataJsonObject["ProdHierarchy"] = POProfitabilitySegmentDetailsDataArray.ProdHierarchy === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProdHierarchy;
                        POProfitabilitySegmentDetailsDataJsonObject["ItemCategory"] = POProfitabilitySegmentDetailsDataArray.ItemCategory === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ItemCategory;
                        POProfitabilitySegmentDetailsDataJsonObject["HigherLevelItem"] = POProfitabilitySegmentDetailsDataArray.HigherLevelItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray.HigherLevelItem;
                        POProfitabilitySegmentDetailsDataJsonObject["Industry"] = POProfitabilitySegmentDetailsDataArray.Industry === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Industry;
                        POProfitabilitySegmentDetailsDataJsonObject["CustomerGroup"] = POProfitabilitySegmentDetailsDataArray.CustomerGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CustomerGroup;
                        POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel1"] = POProfitabilitySegmentDetailsDataArray.ProductHierLevel1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProductHierLevel1;
                        POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel2"] = POProfitabilitySegmentDetailsDataArray.ProductHierLevel2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProductHierLevel2;
                        POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel3"] = POProfitabilitySegmentDetailsDataArray.ProductHierLevel3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProductHierLevel3;
                        POProfitabilitySegmentDetailsDataJsonObject["MaterialType"] = POProfitabilitySegmentDetailsDataArray.MaterialType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.MaterialType;
                        POProfitabilitySegmentDetailsDataJsonObject["ReferenceDoc"] = POProfitabilitySegmentDetailsDataArray.ReferenceDoc === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ReferenceDoc;
                        POProfitabilitySegmentDetailsDataJsonObject["PROJECTNUMBER1"] = POProfitabilitySegmentDetailsDataArray.PROJECTNUMBER1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.PROJECTNUMBER1;
                        POProfitabilitySegmentDetailsDataJsonObject["ProjectIndicator"] = POProfitabilitySegmentDetailsDataArray.ProjectIndicator === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProjectIndicator;
                        POProfitabilitySegmentDetailsDataJsonObject["ValuationType"] = POProfitabilitySegmentDetailsDataArray.ValuationType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ValuationType;
                        POProfitabilitySegmentDetailsDataJsonObject["CustomerClass"] = POProfitabilitySegmentDetailsDataArray.CustomerClass === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CustomerClass;
                        POProfitabilitySegmentDetailsDataJsonObject["MaterialSourceInd"] = POProfitabilitySegmentDetailsDataArray.MaterialSourceInd === undefined ? "" : POProfitabilitySegmentDetailsDataArray.MaterialSourceInd;
                        POProfitabilitySegmentDetailsDataJsonObject["ContractType"] = POProfitabilitySegmentDetailsDataArray.ContractType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ContractType;
                        POProfitabilitySegmentDetailsDataJsonObject["ShipToParty"] = POProfitabilitySegmentDetailsDataArray.ShipToParty === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ShipToParty;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryCode1"] = POProfitabilitySegmentDetailsDataArray.IndustryCode1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryCode1;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryField1"] = POProfitabilitySegmentDetailsDataArray.IndustryField1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryField1;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryCode2"] = POProfitabilitySegmentDetailsDataArray.IndustryCode2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryCode2;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryCode3"] = POProfitabilitySegmentDetailsDataArray.IndustryCode3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryCode3;
                        POProfitabilitySegmentDetailsDataJsonObject["ReferenceItem"] = POProfitabilitySegmentDetailsDataArray.ReferenceItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ReferenceItem;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesDocType"] = POProfitabilitySegmentDetailsDataArray.SalesDocType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesDocType;

                        POProfitabilitySegmentDetailsDataJsonArray.push(POProfitabilitySegmentDetailsDataJsonObject);
                    }
                }
            }
            // POProfitabilitySegmentDetailsData Ends
        });

        console.log("POServiceDataJsonArray len:: " + POServiceDataJsonArray.length);
        console.log("POServiceAccAssDataJsonArray len:: " + POServiceAccAssDataJsonArray.length);

        POLineLevelDataAsJson["PurchaseRequestType"] = PurchaseRequestType;
        POLineLevelDataAsJson["PRLineItemArray"] = PRLineItemArray;
        POLineLevelDataAsJson["POInvoiceData"] = POInvoiceDataJsonArray;
        POLineLevelDataAsJson["POServiceData"] = POServiceDataJsonArray;
        POLineLevelDataAsJson["POLineItemConditionData"] = POLineItemConditionDataJsonArray;
        POLineLevelDataAsJson["POAccAssData"] = POAccAssDataJsonArray;
        POLineLevelDataAsJson["PODeliveryAddressData"] = PODeliveryAddressDataJsonArray;
        POLineLevelDataAsJson["PODeliveryData"] = PODeliveryDataJsonArray;
        POLineLevelDataAsJson["POConfirmationData"] = POConfirmationDataJsonArray;
        POLineLevelDataAsJson["POCondCtrlData"] = POCondCtrlDataJsonArray;
        POLineLevelDataAsJson["POServiceAccAssData"] = POServiceAccAssDataJsonArray;
        POLineLevelDataAsJson["POQuantityWeightsData"] = POQuantityWeightsDataJsonArray;
        POLineLevelDataAsJson["PODeliveryScheduleData"] = PODeliveryScheduleDataJsonArray;
        POLineLevelDataAsJson["POLimitsData"] = POLimitsDataJsonArray;
        POLineLevelDataAsJson["POTextsData"] = POTextsDataJsonArray;
        POLineLevelDataAsJson["POLineItemCustomerData"] = POLineItemCustomerDataJsonArray;
        POLineLevelDataAsJson["POMaterialData"] = POMaterialDataJsonArray;
        POLineLevelDataAsJson["POComponentsData"] = POComponentsDataJsonArray;
        POLineLevelDataAsJson["POProfitabilitySegmentDetailsData"] = POProfitabilitySegmentDetailsDataJsonArray;

        var POLineLevelDataAsJsonString = JSON.stringify(POLineLevelDataAsJson);
        console.log("POLineLevelDataAsJsonString: " + POLineLevelDataAsJsonString);

        $("#overlay").css("display", "none"); //localhost

        var _csrf = $("input[name=_csrf]").val();
        $("#overlay").css("display", "block");
        setTimeout(
                function()
                {
                    $.ajax({
                        type: "POST",
                        url: "saveAmendPoLineLevelData.do",
                        async: true,
                        data: {
                            formdata: POLineLevelDataAsJsonString,
                            reqFrom: "saveAmendPoLineLevelData",
                            _csrf: _csrf
                        },
                        success: function(response) {
                            console.log("response :: " + response);
                            
                            // Set line level tabs details for first PO line by default
                            var PoFrom = $("#PoFrom").val();
                            if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                                var prCount = $("#material_headerClass tbody tr").length;
                                if(prCount === 1){
                                    $("#material_headerClass tbody tr").each(function(){
                                        var insertionId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                        $("#ItemNumberSelect").val(insertionId);
                                        $("#ItemNumberSelect").trigger("change");
                         
                                    });
                                }
                            }
                            
                            $("#overlay").css("display", "none");
                        }
                    });
                }
        , 500);
        
        
    }
}
function functionPOList() {

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
            //            data: URLParam,
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log("Response: " + data);
                getPOList(data);
                $("#overlay").css("display", "none");
            }
        });
    }
    else
    {
        getPOListFromLocal("");
        $("#overlay").css("display", "none");
    }
}

function getDocumentDetailsByLinkIdAndPid(xmlre)
{
    var xmlString = XMLToString(xmlre); //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<Output>"
//            + "<DocumentList>"
//            + "<Document>"
//            + "<documentIndex>574</documentIndex>"
//            + "<documentName>Assisned PR Details.xlsx</documentName>"
//            + "</Document>"
//            + "<Document>"
//            + "<documentIndex>575</documentIndex>"
//            + "<documentName>Unssisned PR Details.xlsx</documentName>"
//            + "</Document>"
//            + "<Document>"
//            + "<documentIndex>576</documentIndex>"
//            + "<documentName>Contract PR Details.xlsx</documentName>"
//            + "</Document>"
//            + "</DocumentList>"
//            + "<LinkID>33761303</LinkID>"
//            + "<maincode>0</maincode>"
//            + "<message>Document List Retrieved Successfully</message>"
//            + "<PID>PR-0000000030-process</PID>"
//            + "</Output>";

    //    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var Document = $xml.find('Document');

    var documentIndexArr = [];
    var documentNameArr = [];

    Document.find('documentIndex').each(function() {
        //        alert($(this).text());
        documentIndexArr.push($(this).text());
    });
    Document.find('documentName').each(function() {
        //        alert($(this).text());
        documentNameArr.push($(this).text());
    });
    console.log("documentIndexArr: " + documentIndexArr);
    console.log("documentNameArr: " + documentNameArr);

    $("#documentListTable tbody tr").remove();
    var row = "";
    for (var i = 0; i < documentIndexArr.length; i++)
    {
        row += "<tr>"
                //                + "<td align='center'><input type='checkbox'></td>"
                + "<td>" + documentNameArr[i] + "</td>"
                + "<td align='center'><a href='#' id='viewDoc_" + documentIndexArr[i] + "' class='viewDocFromDMS' title='View'><i class='fas fa-eye fa-2x'></i></a></td>"
                + "<td align='center'><a href='#' id='downloadDoc_" + documentIndexArr[i] + "' class='downloadDocFromDMS' title='Download'><i class='fas fa-download fa-2x'></i></a></td>"
                + "</tr>";
    }
    //    console.log("row: " + row);

    $("#documentListTable tbody").append(row);
}

function getSignedPoDocumentDetails(xmlre)
{
    var xmlString = XMLToString(xmlre); //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<Output>"
//            + "<DocumentList>"
//            + "<Document>"
//            + "<documentIndex>574</documentIndex>"
//            + "<documentName>Assisned PR Details.xlsx</documentName>"
//            + "</Document>"
//            + "<Document>"
//            + "<documentIndex>575</documentIndex>"
//            + "<documentName>Unssisned PR Details.xlsx</documentName>"
//            + "</Document>"
//            + "<Document>"
//            + "<documentIndex>576</documentIndex>"
//            + "<documentName>Contract PR Details.xlsx</documentName>"
//            + "</Document>"
//            + "</DocumentList>"
//            + "<LinkID>33761303</LinkID>"
//            + "<maincode>0</maincode>"
//            + "<message>Document List Retrieved Successfully</message>"
//            + "<PID>PR-0000000030-process</PID>"
//            + "</Output>";

    //    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var Document = $xml.find('Document');

    var documentIndexArr = [];
    var documentNameArr = [];

    Document.find('documentIndex').each(function() {
        //        alert($(this).text());
        documentIndexArr.push($(this).text());
    });
    Document.find('documentName').each(function() {
        //        alert($(this).text());
        documentNameArr.push($(this).text());
    });
    console.log("documentIndexArr: " + documentIndexArr);
    console.log("documentNameArr: " + documentNameArr);

    $("#documentListTable tbody tr").remove();
    var row = "";
    for (var i = 0; i < documentIndexArr.length; i++)
    {
        row += "<tr>"
                //                + "<td align='center'><input type='checkbox'></td>"
                + "<td>" + documentNameArr[i] + "</td>"
                + "<td align='center'><a href='#' id='viewDoc_" + documentIndexArr[i] + "' class='viewDocFromDMS' title='View'><i class='fas fa-eye fa-2x'></i></a></td>"
                + "<td align='center'><a href='#' id='downloadDoc_" + documentIndexArr[i] + "' class='downloadDocFromDMS' title='Download'><i class='fas fa-download fa-2x'></i></a></td>"
                + "</tr>";
    }
    //    console.log("row: " + row);

    $("#documentListTable tbody").append(row);
}

function getPOResponse(xmlre)
{
    var xmlString = XMLToString(xmlre); //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var ProcessInstanceID = $xml.find('ProcessInstanceID');
    var Message = $xml.find('Message');

    var mainCode = MainCode.text();
    var pid = ProcessInstanceID.text();
    var msg = Message.text();

    console.log("mainCode: " + mainCode);
    console.log("pid: " + pid);
    console.log("Message: " + msg);

    var PoResponseJsonObject = {};

    PoResponseJsonObject["MainCode"] = mainCode;
    PoResponseJsonObject["PID"] = pid;
    PoResponseJsonObject["Message"] = msg;

    return PoResponseJsonObject;
}
function getPOResponseFromLocal(xmlre)
{
    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"   //Localhost
            + "<Output>"
            + "<MainCode>0</MainCode>"
            + "<ProcessInstanceID>PO-0000000377</ProcessInstanceID>"
            + "<Message>Created</Message>"
            + "</Output>";

    var xmlDoc = $.parseXML(xmlString); //Localhost

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var ProcessInstanceID = $xml.find('ProcessInstanceID');
    var Message = $xml.find('Message');

    var mainCode = MainCode.text();
    var pid = ProcessInstanceID.text();
    var msg = Message.text();

    console.log("mainCode: " + mainCode);
    console.log("pid: " + pid);
    console.log("Message: " + msg);

    var PoResponseJsonObject = {};

    PoResponseJsonObject["PID"] = pid;
    PoResponseJsonObject["Message"] = msg;

    return PoResponseJsonObject;
}
function getSAPResponse(xmlsap) {

    var xmlString = XMLToString(xmlsap);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

    var $xml = $(xmlDoc);

    var PONumber = $xml.find('PONumber');
    var Messages = $xml.find('Messages');

    var ponumber = PONumber.text();

    var Message = [];
    Messages.find('Message').each(function() {
        Message.push($(this).text());
    });

    console.log("ponumber: " + ponumber);
    console.log("Message: " + Message);

    var PoSAPResponseJsonObject = {};

    PoSAPResponseJsonObject["PoNumber"] = ponumber;
    PoSAPResponseJsonObject["Message"] = Message;

    return PoSAPResponseJsonObject;
}
function getSAPResponseFromLocal(xmlsap) {

    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
            + "<POOutput>"
            + "<PONumber>9050001033</PONumber>"
            + "<Messages>"
            + "<Message>Scheduling agreement 9050001033 is created successfully</Message>"
            + "</Messages>"
            + "</POOutput>";

    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var PONumber = $xml.find('PONumber');
    var Messages = $xml.find('Messages');

    var ponumber = PONumber.text();

    var Message = [];
    Messages.find('Message').each(function() {
        Message.push($(this).text());
    });

    console.log("ponumber: " + ponumber);
    console.log("Message: " + Message);

    var PoSAPResponseJsonObject = {};

    PoSAPResponseJsonObject["PoNumber"] = ponumber;
    PoSAPResponseJsonObject["Message"] = Message;

    return PoSAPResponseJsonObject;
}
function getPOList(xmlPO) {

    var xmlString = XMLToString(xmlPO);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

    var $xml = $(xmlDoc);

    var POOutput = $xml.find('POOutputList');
    var Message = $xml.find('Message').text();
    var MainCode = $xml.find('MainCode').text();
    var MaterialPOCount = $xml.find('MaterialPOCount').text();
    var ServicePOCount = $xml.find('ServicePOCount').text();

    console.log("Message: " + Message);
    console.log("MainCode: " + MainCode);
    console.log("MaterialPOCount: " + MaterialPOCount);
    console.log("ServicePOCount: " + ServicePOCount);

    var PONumberArr = [];
    var POCreationDateArr = [];
    var VendorNameArr = [];
    var POStatusArr = [];
    var VendorCodeArr = [];
    var PIDArr = [];
    var CompanyCodeArr = [];
    var RequestTypeArr = [];
    var PurchaseOrderTypeArr = [];
    var ActionTakenArr = [];
    var ApproverCountArr = [];

    POOutput.find('PONumber').each(function() {
        PONumberArr.push($(this).text());
    });
    POOutput.find('POCreationDate').each(function() {
        POCreationDateArr.push($(this).text());
    });
    POOutput.find('VendorName').each(function() {
        VendorNameArr.push($(this).text());
    });
    POOutput.find('POStatus').each(function() {
        POStatusArr.push($(this).text());
    });
    POOutput.find('VendorCode').each(function() {
        VendorCodeArr.push($(this).text());
    });
    POOutput.find('PID').each(function() {
        PIDArr.push($(this).text());
    });
    POOutput.find('CompanyCode').each(function() {
        CompanyCodeArr.push($(this).text());
    });
    POOutput.find('RequestType').each(function() {
        RequestTypeArr.push($(this).text());
    });
    POOutput.find('PurchaseOrderType').each(function() {
        PurchaseOrderTypeArr.push($(this).text());
    });
    POOutput.find('ActionTaken').each(function() {
        ActionTakenArr.push($(this).text());
    });
    POOutput.find('approvercount').each(function() {
        ApproverCountArr.push($(this).text());
    });

    $("#createdPOTable tbody tr").remove();
    console.log("PONumberArr.length: " + PONumberArr.length);

    var row = "";
    for (var i = 0; i < PONumberArr.length; i++)
    {
        if (Number(ApproverCountArr[i]) > 0)
        {
            row += "<tr>"
                    + "<td><button title='Revoke PO' class='btn btn-primary btn-sm revoke-po' disabled='true'>Revoke</button><input type='hidden' class='action-taken' value='" + ActionTakenArr[i] + "'><input type='hidden' class='approver-count' value='" + ApproverCountArr[i] + "'></td>"
                    + "<td>" + PIDArr[i] + "</td>"
                    + "<td>" + PONumberArr[i] + "</td>"
                    + "<td>" + POCreationDateArr[i] + "</td>"
                    + "<td>" + VendorNameArr[i] + "</td>"
                    + "<td>" + POStatusArr[i] + "</td>"
                    + "<td>" + CompanyCodeArr[i] + "</td>"
                    + "<td>" + RequestTypeArr[i] + "</td>"
                    + "<td>" + PurchaseOrderTypeArr[i] + "</td>"
                    + "</tr>";
        }
        else
        {
            if(POStatusArr[i] === "Rework") {
                row += "<tr>"
                    + "<td><button title='Revoke PO' class='btn btn-primary btn-sm revoke-po'>Edit</button><input type='hidden' class='action-taken' value='" + ActionTakenArr[i] + "'><input type='hidden' class='approver-count' value='" + ApproverCountArr[i] + "'></td>"
                    + "<td>" + PIDArr[i] + "</td>"
                    + "<td>" + PONumberArr[i] + "</td>"
                    + "<td>" + POCreationDateArr[i] + "</td>"
                    + "<td>" + VendorNameArr[i] + "</td>"
                    + "<td>" + POStatusArr[i] + "</td>"
                    + "<td>" + CompanyCodeArr[i] + "</td>"
                    + "<td>" + RequestTypeArr[i] + "</td>"
                    + "<td>" + PurchaseOrderTypeArr[i] + "</td>"
                    + "</tr>";
            } else {
                row += "<tr>"
                    + "<td><button title='Revoke PO' class='btn btn-primary btn-sm revoke-po'>Revoke</button><input type='hidden' class='action-taken' value='" + ActionTakenArr[i] + "'><input type='hidden' class='approver-count' value='" + ApproverCountArr[i] + "'></td>"
                    + "<td>" + PIDArr[i] + "</td>"
                    + "<td>" + PONumberArr[i] + "</td>"
                    + "<td>" + POCreationDateArr[i] + "</td>"
                    + "<td>" + VendorNameArr[i] + "</td>"
                    + "<td>" + POStatusArr[i] + "</td>"
                    + "<td>" + CompanyCodeArr[i] + "</td>"
                    + "<td>" + RequestTypeArr[i] + "</td>"
                    + "<td>" + PurchaseOrderTypeArr[i] + "</td>"
                    + "</tr>";
            }
        }
    }
    $("#createdPOTable tbody").append(row);

    if ($("table.createdPOTable").length) {
        $(document).ready(function() {
            $('#createdPOTable thead tr').clone(true).appendTo('#createdPOTable thead');
            $('#createdPOTable thead tr:eq(1) th').each(function(i) {
                $('#createdPOTable thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '' || title === 'Details')
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

            var table = $('table.createdPOTable').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
                        //                    buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'excel', title: 'PO Details'},
                            {extend: 'pdf', title: 'PO Details'},
                            {extend: 'print', title: 'PO Details'}
                        ]
                    }
                ]
            });
            table.buttons().container()
                    .appendTo('#createdPOTable_wrapper .col-md-6:eq(0)');
        });
    }
}
function getPOListFromLocal(xmlPO) {
//    var xmlString = XMLToString(xmlPO);             //Convert the XML Object to a String
    //    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
            + "<POListOP>"
            + "<POOutputList>"
            + "<PONumber>PO-28-001-11</PONumber>"
            + "<POCreationDate>2019-10-03</POCreationDate>"
            + "<VendorName>BITTU</VendorName>"
            + "<POStatus>Rework</POStatus>"
            + "<VendorCode>V001</VendorCode>"
            + "<PID>PC-0000000011-process</PID>"
            + "<CompanyCode>0640</CompanyCode>"
            + "<RequestType>Create</RequestType>"
            + "<PurchaseOrderType>POT1</PurchaseOrderType>"
            + "<ActionTaken></ActionTaken>"
            + "<approvercount>0</approvercount>"                         //BITTU 09July2020
            + "</POOutputList>"
            + "<POOutputList>"
            + "<PONumber>PO-15-001-12</PONumber>"
            + "<POCreationDate>2019-10-04</POCreationDate>"
            + "<VendorName>SUNNY</VendorName>"
            + "<POStatus>Pending</POStatus>"
            + "<VendorCode>V002</VendorCode>"
            + "<PID>PC-0000000012-process</PID>"
            + "<CompanyCode>0641</CompanyCode>"
            + "<RequestType>Modify</RequestType>"
            + "<PurchaseOrderType>POT2</PurchaseOrderType>"
            + "<ActionTaken></ActionTaken>"
            + "<approvercount>1</approvercount>"
            + "</POOutputList>"
            + "<POOutputList>"
            + "<PONumber>PO-28-001-11</PONumber>"
            + "<POCreationDate>2019-10-05</POCreationDate>"
            + "<VendorName>NIKHIL</VendorName>"
            + "<POStatus>Rework</POStatus>"
            + "<VendorCode>V003</VendorCode>"
            + "<PID>PC-0000000013-process</PID>"
            + "<CompanyCode>0642</CompanyCode>"
            + "<RequestType>Delete</RequestType>"
            + "<PurchaseOrderType>POT3</PurchaseOrderType>"
            + "<ActionTaken>Reject</ActionTaken>"
            + "<approvercount>1</approvercount>"
            + "</POOutputList>"
            + "<Message>Success</Message>"
            + "<MainCode>0</MainCode>"
            + "<MaterialPOCount>10</MaterialPOCount>"
            + "<ServicePOCount>20</ServicePOCount>"
            + "</POListOP>";

    var xmlDoc = $.parseXML(xmlString); // Localhost

    var $xml = $(xmlDoc);

    var POOutput = $xml.find('POOutputList');
    var Message = $xml.find('Message').text();
    var MainCode = $xml.find('MainCode').text();
    var MaterialPOCount = $xml.find('MaterialPOCount').text();
    var ServicePOCount = $xml.find('ServicePOCount').text();

    console.log("Message: " + Message);
    console.log("MainCode: " + MainCode);
    console.log("MaterialPOCount: " + MaterialPOCount);
    console.log("ServicePOCount: " + ServicePOCount);

    var PONumberArr = [];
    var POCreationDateArr = [];
    var VendorNameArr = [];
    var POStatusArr = [];
    var VendorCodeArr = [];
    var PIDArr = [];
    var CompanyCodeArr = [];
    var RequestTypeArr = [];
    var PurchaseOrderTypeArr = [];
    var ActionTakenArr = [];
    var ApproverCountArr = [];

    POOutput.find('PONumber').each(function() {
        PONumberArr.push($(this).text());
    });
    POOutput.find('POCreationDate').each(function() {
        POCreationDateArr.push($(this).text());
    });
    POOutput.find('VendorName').each(function() {
        VendorNameArr.push($(this).text());
    });
    POOutput.find('POStatus').each(function() {
        POStatusArr.push($(this).text());
    });
    POOutput.find('VendorCode').each(function() {
        VendorCodeArr.push($(this).text());
    });
    POOutput.find('PID').each(function() {
        PIDArr.push($(this).text());
    });
    POOutput.find('CompanyCode').each(function() {
        CompanyCodeArr.push($(this).text());
    });
    POOutput.find('RequestType').each(function() {
        RequestTypeArr.push($(this).text());
    });
    POOutput.find('PurchaseOrderType').each(function() {
        PurchaseOrderTypeArr.push($(this).text());
    });
    POOutput.find('ActionTaken').each(function() {
        ActionTakenArr.push($(this).text());
    });
    POOutput.find('approvercount').each(function() {
        ApproverCountArr.push($(this).text());
    });

    $("#createdPOTable tbody tr").remove();

    var row = "";
    for (var i = 0; i < PONumberArr.length; i++)
    {
        if (Number(ApproverCountArr[i]) > 0)
        {
            row += "<tr>"
                    + "<td><button title='Revoke PO' class='btn btn-primary btn-sm revoke-po' disabled='true'>Revoke</button><input type='hidden' value='" + ActionTakenArr[i] + "'><input type='hidden' value='" + ApproverCountArr[i] + "'></td>"
                    + "<td>" + PIDArr[i] + "</td>"
                    + "<td>" + PONumberArr[i] + "</td>"
                    + "<td>" + POCreationDateArr[i] + "</td>"
                    + "<td>" + VendorNameArr[i] + "</td>"
                    + "<td>" + POStatusArr[i] + "</td>"
                    + "<td>" + CompanyCodeArr[i] + "</td>"
                    + "<td>" + RequestTypeArr[i] + "</td>"
                    + "<td>" + PurchaseOrderTypeArr[i] + "</td>"
                    + "</tr>";
        }
        else
        {
            if(POStatusArr[i] === "Rework") {
                row += "<tr>"
                    + "<td><button title='Revoke PO' class='btn btn-primary btn-sm revoke-po'>Edit</button><input type='hidden' value='" + ActionTakenArr[i] + "'><input type='hidden' value='" + ApproverCountArr[i] + "'></td>"
                    + "<td>" + PIDArr[i] + "</td>"
                    + "<td>" + PONumberArr[i] + "</td>"
                    + "<td>" + POCreationDateArr[i] + "</td>"
                    + "<td>" + VendorNameArr[i] + "</td>"
                    + "<td>" + POStatusArr[i] + "</td>"
                    + "<td>" + CompanyCodeArr[i] + "</td>"
                    + "<td>" + RequestTypeArr[i] + "</td>"
                    + "<td>" + PurchaseOrderTypeArr[i] + "</td>"
                    + "</tr>";
            } else {
                row += "<tr>"
                    + "<td><button title='Revoke PO' class='btn btn-primary btn-sm revoke-po'>Revoke</button><input type='hidden' value='" + ActionTakenArr[i] + "'><input type='hidden' value='" + ApproverCountArr[i] + "'></td>"
                    + "<td>" + PIDArr[i] + "</td>"
                    + "<td>" + PONumberArr[i] + "</td>"
                    + "<td>" + POCreationDateArr[i] + "</td>"
                    + "<td>" + VendorNameArr[i] + "</td>"
                    + "<td>" + POStatusArr[i] + "</td>"
                    + "<td>" + CompanyCodeArr[i] + "</td>"
                    + "<td>" + RequestTypeArr[i] + "</td>"
                    + "<td>" + PurchaseOrderTypeArr[i] + "</td>"
                    + "</tr>";
            }            
        }
    }
    $("#createdPOTable tbody").append(row);

    if ($("table.createdPOTable").length) {
        $(document).ready(function() {
            $('#createdPOTable thead tr').clone(true).appendTo('#createdPOTable thead');
            $('#createdPOTable thead tr:eq(1) th').each(function(i) {
                $('#createdPOTable thead tr:eq(0) th').addClass("table-header-color");
                var title = $(this).text();
                if (title === '' || title === 'Details')
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

            var table = $('table.createdPOTable').DataTable({
                lengthChange: false,
                orderCellsTop: true,
                buttons: [
                    {
                        extend: 'collection',
                        text: 'Export',
                        //                    buttons: ['copy', 'excel', 'pdf', 'print']
                        buttons: [
                            {extend: 'excel', title: 'PO Details'},
                            {extend: 'pdf', title: 'PO Details'},
                            {extend: 'print', title: 'PO Details'}
                        ]
                    }
                ]
            });
            table.buttons().container()
                    .appendTo('#createdPOTable_wrapper .col-md-6:eq(0)');
        });
    }
}
function getTaxResponse(xmlsap) {

//    var xmlString = XMLToString(xmlsap);             //Convert the XML Object to a String
//    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
            + "<POTaxCalcOP>"
            + "<Message></Message>"
            + "<TaxAmnt>10</TaxAmnt>"
            + "</POTaxCalcOP>";

    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var TaxAmnt = $xml.find('TaxAmnt');
    var Message = $xml.find('Message');

    var TaxAmnt = TaxAmnt.text();
    var msg = Message.text();

    console.log("TaxAmnt: " + TaxAmnt);
    console.log("Message: " + msg);

    return TaxAmnt;
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

function fetchPaymentInDays(xmlre)
{
    var xmlString = XMLToString(xmlre);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var Message = $xml.find('Message');
    var PaymentDays1 = $xml.find('PaymentDays1');
    var PaymentDays2 = $xml.find('PaymentDays2');
    var PaymentDays3 = $xml.find('PaymentDays3');

    MainCode = MainCode.text();
    Message = Message.text();
    PaymentDays1 = PaymentDays1.text();
    PaymentDays2 = PaymentDays2.text();
    PaymentDays3 = PaymentDays3.text();

    console.log("MainCode: " + MainCode);
    console.log("Message: " + Message);
    console.log("PaymentDays1: " + PaymentDays1);
    console.log("PaymentDays2: " + PaymentDays2);
    console.log("PaymentDays3: " + PaymentDays3);

    if (MainCode !== "" && (MainCode === "0" || Number(MainCode) === 0))
    {
        if (PaymentDays1 !== "0" && Number(PaymentDays1) !== 0)
            $("#paymentDays1").val(PaymentDays1);
        else
            $("#paymentDays1").val("");

        if (PaymentDays2 !== "0" && Number(PaymentDays2) !== 0)
            $("#paymentDays2").val(PaymentDays2);
        else
            $("#paymentDays2").val("");

        if (PaymentDays3 !== "0" && Number(PaymentDays3) !== 0)
            $("#paymentDaysNet").val(PaymentDays3);
        else
            $("#paymentDaysNet").val("");
    }
    else
    {
        $("#paymentDays1").val("");
        $("#paymentDays2").val("");
        $("#paymentDaysNet").val("");
    }
}
function fetchPaymentInDaysFromLocal(xmlre)
{
    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
            + "<POPaymentTermsOP>"
            + "<MainCode>0</MainCode>"
            + "<Message>Payment fetched.</Message>"
            + "<PaymentDays1>1</PaymentDays1>"
            + "<PaymentDays2>0</PaymentDays2>"
            + "<PaymentDays3>3</PaymentDays3>"
            + "</POPaymentTermsOP>";

    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var Message = $xml.find('Message');
    var PaymentDays1 = $xml.find('PaymentDays1');
    var PaymentDays2 = $xml.find('PaymentDays2');
    var PaymentDays3 = $xml.find('PaymentDays3');

    MainCode = MainCode.text();
    Message = Message.text();
    PaymentDays1 = PaymentDays1.text();
    PaymentDays2 = PaymentDays2.text();
    PaymentDays3 = PaymentDays3.text();

    console.log("MainCode: " + MainCode);
    console.log("Message: " + Message);
    console.log("PaymentDays1: " + PaymentDays1);
    console.log("PaymentDays2: " + PaymentDays2);
    console.log("PaymentDays3: " + PaymentDays3);

    if (MainCode !== "" && (MainCode === "0" || Number(MainCode) === 0))
    {
        if (PaymentDays1 !== "0" && Number(PaymentDays1) !== 0)
            $("#paymentDays1").val(PaymentDays1);
        else
            $("#paymentDays1").val("");

        if (PaymentDays2 !== "0" && Number(PaymentDays2) !== 0)
            $("#paymentDays2").val(PaymentDays2);
        else
            $("#paymentDays2").val("");

        if (PaymentDays3 !== "0" && Number(PaymentDays3) !== 0)
            $("#paymentDaysNet").val(PaymentDays3);
        else
            $("#paymentDaysNet").val("");
    }
    else
    {
        $("#paymentDays1").val("");
        $("#paymentDays2").val("");
        $("#paymentDaysNet").val("");
    }
}
function checkIfPOCanceledOrNot(xmlre)
{
    var xmlString = XMLToString(xmlre);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<POFetchOP>"
//            + "<MainCode>0</MainCode>"
//            + "<Message>PO has been canceled successfully.</Message>"
//            + "</POFetchOP>";
    //    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var Message = $xml.find('Message');

    var MainCode = MainCode.text();
    var Message = Message.text();

    console.log("MainCode: " + MainCode);
    console.log("Message: " + Message);

    var deletePoOutputJsonObject = {};

    deletePoOutputJsonObject["MainCode"] = MainCode;
    deletePoOutputJsonObject["Message"] = Message;

    return deletePoOutputJsonObject;
}

function checkIfPORejectdOrNot(xmlre)
{
    var xmlString = XMLToString(xmlre);             //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
//            + "<RejectWIOutPut>"
//            + "<MainCode>0</MainCode>"
//            + "<ProcessInstanceID>PC-0000000011-process</ProcessInstanceID>"
//            + "<Message>This PO has been rejected.</Message>"
//            + "</RejectWIOutPut>";
    //    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var ProcessInstanceID = $xml.find('ProcessInstanceID');
    var Message = $xml.find('Message');

    var MainCode = MainCode.text();
    var ProcessInstanceID = ProcessInstanceID.text();
    var Message = Message.text();

    console.log("MainCode: " + MainCode);
    console.log("ProcessInstanceID: " + ProcessInstanceID);
    console.log("Message: " + Message);

    var rejectWIPoOutputJsonObject = {};

    rejectWIPoOutputJsonObject["MainCode"] = MainCode;
    rejectWIPoOutputJsonObject["ProcessInstanceID"] = ProcessInstanceID;
    rejectWIPoOutputJsonObject["Message"] = Message;

    return rejectWIPoOutputJsonObject;
}

function updateNGInputXML()
{
//    parsedJsonPoData.POFetchOP.GeneralData.RequestType = "Modify PO";
//    parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderNumber = $("#poNumber").val();
//    parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderType = $("#typeOfPOHeader").val();
//    parsedJsonPoData.POFetchOP.GeneralData.CompanyCode = $("#companycodeHeader").val();
//    parsedJsonPoData.POFetchOP.GeneralData.DownpaymentReqd = $("#downPaymentReqd").val();
//    parsedJsonPoData.POFetchOP.GeneralData.value = $("#downPaymentReqdValue").val();
//    parsedJsonPoData.POFetchOP.GeneralData.PurchasingOrg = $("#purchasingOrg").val();
//    parsedJsonPoData.POFetchOP.GeneralData.PurchasingGrp = $("#purchasingGroup").val();
    //    parsedJsonPoData.POFetchOP.GeneralData.CollectiveNumber = $("#CollectiveNumber").val();

    var x2js = new X2JS();
    var xmlPoData = x2js.json2xml_str(parsedJsonPoData);
    console.log("xmlPoData: " + xmlPoData);
    xmlPoData = xmlPoData.toString().replace("POFetchOP", "POCreation");
    xmlPoData = xmlPoData.toString().replace("POFetchOP", "POCreation");
    $("#updateInputXml").val(xmlPoData);
    return xmlPoData;
}
function checkIfPOUpdatedOrNot(xmlre)
{
    var xmlString = XMLToString(xmlre); //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

////    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"   //Localhost
////            + "<Output>"
////            + "<MainCode>0</MainCode>"
////            + "<ProcessInstanceID>PC-0000000158-process</ProcessInstanceID>"
////            + "<Message>Updated</Message>"
////            + "</Output>";
//
//    //    var xmlDoc = $.parseXML(xmlString); //Localhost

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var ProcessInstanceID = $xml.find('ProcessInstanceID');
    var Message = $xml.find('Message');

    var mainCode = MainCode.text();
    var pid = ProcessInstanceID.text();
    var msg = Message.text();

    console.log("mainCode: " + mainCode);
    console.log("pid: " + pid);
    console.log("Message: " + msg);

    var message = "MainCode: " + mainCode + "<br>Message: " + msg;

    Lobibox.alert("info", {
        msg: message
    });
}

function handleSpecialCharacter(str)
{
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/'/g, '&apos;');
    return str;
}
function handleSpecialCharacterBackToNormalChar(str)
{
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    return str;
}
function handleSpecialCharacterInJson(str)
{
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    return str;
}

function hideAndShowLineLevelTabsAndFields()
{
    var accountAssignmentCategory = $("#accountAssignmentCategory").val();
    console.log("accountAssignmentCategory: " + accountAssignmentCategory);

    if (accountAssignmentCategory === 'K') {
        accountAssignmentTab_AccAssCat_K(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_K(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_K(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'N') {
        accountAssignmentTab_AccAssCat_N(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_N(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_N(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'A') {
        accountAssignmentTab_AccAssCat_A(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_A(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_A(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'B') {
        accountAssignmentTab_AccAssCat_B(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'C') {
        accountAssignmentTab_AccAssCat_C(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_C(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_C(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'D') {
        accountAssignmentTab_AccAssCat_D(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'E') {
        accountAssignmentTab_AccAssCat_E(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'F') {
        accountAssignmentTab_AccAssCat_F(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_F(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_F(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'G') {
        accountAssignmentTab_AccAssCat_G(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'M') {
        accountAssignmentTab_AccAssCat_M(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'P') {
        accountAssignmentTab_AccAssCat_P(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_P(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_P(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'Q') {
        accountAssignmentTab_AccAssCat_Q(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'R') {
        accountAssignmentTab_AccAssCat_R(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_R(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_R(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'T') {
        accountAssignmentTab_AccAssCat_T(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'U') {
        accountAssignmentTab_AccAssCat_U(parsedJsonPoData, itemNumber);
    }
    else if (accountAssignmentCategory === 'X') {
        accountAssignmentTab_AccAssCat_X(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_X(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_X(parsedJsonPoData);
    }
    else if (accountAssignmentCategory === 'Z') {
        accountAssignmentTab_AccAssCat_Z(parsedJsonPoData, itemNumber);
        serviceAccountAssignmentTab_AccAssCat_Z(parsedJsonPoData);
        limitsAccountAssignmentTab_AccAssCat_Z(parsedJsonPoData);
    }
}
function updateFinalizedVendorPoDetails(rfqId, vendorId, prIds, VendorFinalizationTableDataArrayAsJsonString, PoNumber, vendorFinalizationTablePrDataArrayAsJsonString)
{
    console.log("vendorFinalizationTablePrDataArrayAsJsonString in func: " + vendorFinalizationTablePrDataArrayAsJsonString);
    var _csrf = $("input[name=_csrf]").val();
    $.ajax({
        type: "POST",
        url: "saveQuantityWeightForMultiplePr.do",
        async: false,
        data: {
            "reqFrom": "UpdateFinalizedVendorPoDetails",
            "RfqId": rfqId,
            "VendorId": vendorId,
            "PrIds": prIds,
            "VendorFinalizationTableDataArrayAsJsonString": VendorFinalizationTableDataArrayAsJsonString,
            "VendorFinalizationTablePrDataArrayAsJsonString": vendorFinalizationTablePrDataArrayAsJsonString,
            "PoNumber": PoNumber,
            _csrf: _csrf
        },
        complete: function(responseJson) {
            var jsonObj = $.parseJSON(responseJson.responseText);
            console.log("UpdateFinalizedVendorPoDetails: " + jsonObj.Result);
        }
    });
}
function updatePrLineAfterPoCreation(insertionOrderIds, status)
{
    //    alert("inside");
    console.log("insertionOrderIds: " + insertionOrderIds);
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "UpdatePrLineAfterPoCreation",
            "insertionOrderIds": insertionOrderIds,
            "status": status
        },
        complete: function(responseJson) {
            var jsonObj = $.parseJSON(responseJson.responseText);
            console.log("PR Update Result: " + jsonObj.Result);
        }
    });
}
function findVendorByCompanyCode(vendorCode)
{
    var SchemaGroup = "";
    var PruchaseOrg = "";
//    $("#vendorcodeHeader option").remove();
    var companyCodeHeader = $("#companycodeHeader").val();
    console.log("companyCodeHeader: " + companyCodeHeader);
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindVendorByCompanyCode",
            "companyCode": companyCodeHeader
        },
        complete: function(responseJson) {
            var jsonVendorArr = $.parseJSON(responseJson.responseText);
            console.log("jsonVendorArr lengtth :" + jsonVendorArr.length);
            jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));

            var vendorSno = "";
            if (jsonVendorArr.length !== 0) {
//                var option = "";
                for (var i = 0; i < jsonVendorArr.length; i++) {
                    if (vendorCode === jsonVendorArr[i].vendorCode)
                    {
                        vendorSno = jsonVendorArr[i].sno;
                        SchemaGroup = jsonVendorArr[i].schemaGroup;
                        PruchaseOrg = jsonVendorArr[i].purOrg;
                        
                        $("#vendorSno").val(jsonVendorArr[i].sno);
                        $("#vendorcodeHeader").val(jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode);
                    }
//                    option += "<option value='" + jsonVendorArr[i].sno + "'>" + jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode + "</option>";
                }
//                console.log("option vendor:" + option);
//                $("#vendorcodeHeader").append(option);
//                $('.selectpicker').selectpicker('refresh');
                console.log("Set vendor================");
                if (vendorCode !== "")
                {
//                    $("#vendorcodeHeader").val(vendorSno);                    
//                    $('.selectpicker').selectpicker('refresh');
                }
                
                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "findKalsmBySchemaGroupAndPurchaseOrg",
                        "SchemaGroup": SchemaGroup,
                        "PruchaseOrg": PruchaseOrg
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        console.log("obj.kalsm: " + obj.kalsm);
                        $("#kalsmHiddenfield").val(obj.kalsm);
                    }
                });
            }
        }
    });
}
function findDataOfPrLineItem(parsedJsonPoData, input, itemNumber)
{
    console.log("==============In findDataOfPrLineItem==================");
    console.log("itemNumber: " + itemNumber);
    console.log("input: " + input);
    var output = '';
    var POLineItemDataArray = parsedJsonPoData.POFetchOP.POLineItemData;
    console.log("POLineItemDataArray: " + POLineItemDataArray);
    if (POLineItemDataArray !== undefined) {
        if (Array.isArray(POLineItemDataArray) === true) {
            console.log("POLineItemDataArray len: " + POLineItemDataArray.length);
            for (var i = 0; i < POLineItemDataArray.length; i++)
            {
                if (POLineItemDataArray[i].ItemNumber === itemNumber)
                {
                    if (input === "AccountAssignmentCategory")
                    {
                        output = POLineItemDataArray[i].AccountAssignment;
                    }
                    else if (input === "PackageNo")
                    {
                        output = POLineItemDataArray[i].PackageNo;
                    }
                    else if (input === "PRLinkID")
                    {
                        output = POLineItemDataArray[i].PRLinkID;
                    }
                    else if (input === "PackageNo")
                    {
                        output = POLineItemDataArray[i].PackageNo;
                    }
                    else if (input === "LinkId")
                    {
                        output = POLineItemDataArray[i].LinkId;
                    }
                    else if (input === "Currency")
                    {
                        output = POLineItemDataArray[i].Currency;
                    }
                    else if (input === "Quantity")
                    {
                        output = POLineItemDataArray[i].Currency;
                    }
                    else if (input === "PRItemNumber")
                    {
                        output = POLineItemDataArray[i].PRItemNumber;
                    }
                }
            }
        }
        else
        {
            if (POLineItemDataArray.ItemNumber === itemNumber)
            {
                if (input === "AccountAssignmentCategory")
                {
                    output = POLineItemDataArray.AccountAssignment;
                }
                else if (input === "PackageNo")
                {
                    output = POLineItemDataArray.PackageNo;
                }
                else if (input === "PRLinkID")
                {
                    output = POLineItemDataArray.PRLinkID;
                }
                else if (input === "PackageNo")
                {
                    output = POLineItemDataArray.PackageNo;
                }
                else if (input === "LinkId")
                {
                    output = POLineItemDataArray.LinkId;
                }
                else if (input === "Currency")
                {
                    output = POLineItemDataArray.Currency;
                }
                else if (input === "Quantity")
                {
                    output = POLineItemDataArray.Quantity;
                }
                else if (input === "PRItemNumber")
                {
                    output = POLineItemDataArray.PRItemNumber;
                }
            }
        }
        console.log("output: " + output);
        return output;
    }
}

function totalPoAmountFunction(quantity, netPrice, currency, taxCode, linkId, vendorCode, includeOrExcludeVendor, perUnit)
{
    var companyCode = $("#companycodeHeader").val();
    console.log("companyCode: " + companyCode);

    console.log("quantity: " + quantity);
    console.log("netPrice: " + netPrice);
    console.log("currency: " + currency);
    console.log("taxCode: " + taxCode);
    console.log("linkId: " + linkId);
    console.log("vendorCode: " + vendorCode);
    console.log("includeOrExcludeVendor: " + includeOrExcludeVendor);
    console.log("perUnit: " + perUnit);

    var ConditionAmountSum = 0;

    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindSumOfConditionAmtByLinkId",
            "linkId": linkId,
            "vendorCode": vendorCode,
            "includeOrExcludeVendor": includeOrExcludeVendor
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            ConditionAmountSum = obj.ConditionAmountSum;
            console.log("ConditionAmountSum: " + ConditionAmountSum);
        }
    });

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var prAndConditionAmount = ((Number(quantity) * Number(netPrice)) / Number(perUnit)) + Number(ConditionAmountSum);
    console.log("prAndConditionAmount: " + prAndConditionAmount);

    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companyCode + "&TaxCode=" + taxCode + "&Currency=" + currency + "&Amount=" + prAndConditionAmount;
    console.log("serviceUrl: " + serviceUrl);

    var TaxPer = 0;
    //    TaxPer = getTaxResponse("");

    $.ajax({
        type: "POST",
        url: serviceUrl,
        contentType: "application/xml",
        dataType: "xml",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log("Response: " + data);
            TaxPer = getTaxResponse(data);
            console.log("TaxPer: " + TaxPer);
        }
    });

    var totalPoAmt = ((Number(quantity) * Number(netPrice)) / Number(perUnit)) + Number(TaxPer) + Number(ConditionAmountSum);
    console.log("totalPoAmt: " + totalPoAmt);
    return totalPoAmt;
}

function prTaxAmountFunction(quantity, netPrice, currency, taxCode, perUnit)
{
    console.log("prTaxAmountFunction");
    var companyCode = $("#companycodeHeader").val();
    console.log("companyCode: " + companyCode);

    console.log("quantity: " + quantity);
    console.log("netPrice: " + netPrice);
    console.log("currency: " + currency);
    console.log("taxCode: " + taxCode);
    console.log("perUnit: " + perUnit);

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var prAmount = (Number(quantity) * Number(netPrice)) / Number(perUnit);
    console.log("prAmount: " + prAmount);

    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_TaxCalcSAP?CompCode=" + companyCode + "&TaxCode=" + taxCode + "&Currency=" + currency + "&Amount=" + prAmount;
    console.log("serviceUrl: " + serviceUrl);

    var TaxPer = 0;
    //    TaxPer = getTaxResponse("");

    $.ajax({
        type: "POST",
        url: serviceUrl,
        contentType: "application/xml",
        dataType: "xml",
        async: false,
        success: function(data, textStatus, jqXHR) {
            console.log("Response: " + data);
            TaxPer = getTaxResponse(data);
            console.log("TaxPer: " + TaxPer);
        }
    });

    var prTaxAmt = Number(prAmount) + Number(TaxPer);
    console.log("prTaxAmt: " + prTaxAmt);
    return prTaxAmt;
}

function showLoader()
{
    $("#overlay").css("display", "block");
}
function hideLoader()
{
    $("#overlay").css("display", "none");
}
function findVendorIdByVendorCode(vendorCode)
{
    $.ajax({
        type: "GET",
        url: "createAmendDeletePoGetAjaxRequest.do",
        async: false,
        data: {
            "reqFrom": "findVendorIdByVendorCode",
            "vendorCode": vendorCode
        },
        beforeSend: function() {
            $("#overlay").css("display", "block");
        },
        error: function() {
            $("#overlay").css("display", "none");
        },
        success: function() {
            $("#overlay").css("display", "none");
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var vendorId = obj.vendorId;
            console.log("vendorId: " + vendorId);
            $("#editAmendPoVendorId").val(vendorId);
        }
    });
}

function setOverDelivTolAndUnderDelvTolInDelvTab(requestFrom)
{
    console.log("In setOverDelivTolAndUnderDelvTolInDelvTab");
    console.log("%cInfoRecord requestFrom 1: " + requestFrom, "color: blue");
    var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
    var purchasingOrg = $("#purchasingOrg").val();
    var insertionid = $(".ItemNumberSelectClass").val();
    var materialCode = "";
    var itemCat = "";
    var isPoLineOrPrLineOrRfqLineOrEmptyLine = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        if (id === insertionid) {
            materialCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            isPoLineOrPrLineOrRfqLineOrEmptyLine = $(this).find("td").eq(0).children(".isPoLineOrPrLineOrRfqLineOrEmptyLine").val();
            return;
        }
    });
    console.log("vendorCode: " + vendorCode);
    console.log("materialCode: " + materialCode);
    console.log("purchasingOrg: " + purchasingOrg);
    console.log("itemCat: " + itemCat);
    console.log("isPoLineOrPrLineOrRfqLineOrEmptyLine: " + isPoLineOrPrLineOrRfqLineOrEmptyLine);

    if (itemCat !== "D" && isPoLineOrPrLineOrRfqLineOrEmptyLine !== "PoLine") {
        getOverDelivTolAndUnderDelvTolInDelvTab(vendorCode, materialCode, purchasingOrg, requestFrom, isPoLineOrPrLineOrRfqLineOrEmptyLine);
    }
}

function getOverDelivTolAndUnderDelvTolInDelvTab(vendorCode, materialCode, purchaseOrg, requestFrom, isPoLineOrPrLineOrRfqLineOrEmptyLine)
{
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_getToleranceData?VENDOR=" + vendorCode + "&MATERIAL=" + materialCode + "&PURCH_ORG=" + purchaseOrg + "&POType=PR";
    console.log("serviceUrl: " + serviceUrl);

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
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log("Response: " + data);
                var overDetlvTolAndUnserDelvTolResponseJsonObj = fetchOverDelvTolAndUnserDelvTol(data);
                var mainCode = overDetlvTolAndUnserDelvTolResponseJsonObj["mainCode"];
                console.log("%cInfoRecord MainCode: " + mainCode, "color: blue");
                if (Number(mainCode) === 0)
                {
                    setPoLineLevelDataFromInfoRecord(overDetlvTolAndUnserDelvTolResponseJsonObj, requestFrom, isPoLineOrPrLineOrRfqLineOrEmptyLine);
                }
            }
        });
    }
    else
    {
        var overDetlvTolAndUnserDelvTolResponseJsonObj = fetchOverDelvTolAndUnserDelvTol("");
        var mainCode = overDetlvTolAndUnserDelvTolResponseJsonObj["mainCode"];
        console.log("%cInfoRecord MainCode: " + mainCode, "color: blue");
        if (Number(mainCode) === 0)
        {            
            setPoLineLevelDataFromInfoRecord(overDetlvTolAndUnserDelvTolResponseJsonObj, requestFrom, isPoLineOrPrLineOrRfqLineOrEmptyLine);
        }
    }
}
function fetchOverDelvTolAndUnserDelvTol(xmlre)
{
//    var xmlString = XMLToString(xmlre);             //Convert the XML Object to a String
//    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
            + "<POgetToleranceOP>"
                + "<MainCode>0</MainCode>"
                + "<Message>Done</Message>"
                + "<OverDelTolerance>10</OverDelTolerance>"
                + "<UnderDelTolerance>20</UnderDelTolerance>"
                + "<CONV_NUM1>20</CONV_NUM1>"
                + "<CONV_DEN1>2</CONV_DEN1>"
                + "<VEND_MAT>Vend Mat No</VEND_MAT>"
                + "<SALES_PERS>Nikhil Rajput</SALES_PERS>"
                + "<TELEPHONE>8006960399</TELEPHONE>"
                + "<REMINDER1>1</REMINDER1>"
                + "<REMINDER2>2</REMINDER2>"
                + "<REMINDER3>3</REMINDER3>"
                + "<VAR_ORD_UN>1</VAR_ORD_UN>"
                + "<POINTS></POINTS>"
                + "<POINT_UNIT></POINT_UNIT>"
                + "<UNLIMITED>True</UNLIMITED>"
                + "<ORDERPR_UN>IFR</ORDERPR_UN>"
                + "<GR_BASEDIV>false</GR_BASEDIV>"
                + "<INCOTERMS1>30</INCOTERMS1>"
                + "<INCOTERMS2>40</INCOTERMS2>"
                + "<ACKN_REQD>true</ACKN_REQD>"
                + "<VAL_TYPE>VAL_Type</VAL_TYPE>"
                + "<SHIPPING>Shipping Instructions1</SHIPPING>"
                + "<CONF_CTRL>Confirmations</CONF_CTRL>"
                + "<BASE_UOM>IRU</BASE_UOM>"
                + "<PO_UNIT>TIN</PO_UNIT>"
                + "<PRICE_UNIT>9</PRICE_UNIT>"
                + "<PLND_DELRY>11</PLND_DELRY>"
                + "<CURRENCY>INR</CURRENCY>"
            + "</POgetToleranceOP>";
    var xmlDoc = $.parseXML(xmlString); // Localhost

    var $xml = $(xmlDoc);

    var MainCode = $xml.find('MainCode');
    var Message = $xml.find('Message');
    var OverDelTolerance = $xml.find('OverDelTolerance');
    var UnderDelTolerance = $xml.find('UnderDelTolerance');    
    var CONV_NUM1 = $xml.find('CONV_NUM1');
    var CONV_DEN1 = $xml.find('CONV_DEN1');
    var VEND_MAT = $xml.find('VEND_MAT');
    var SALES_PERS = $xml.find('SALES_PERS');
    var TELEPHONE = $xml.find('TELEPHONE');
    var REMINDER1 = $xml.find('REMINDER1');
    var REMINDER2 = $xml.find('REMINDER2');
    var REMINDER3 = $xml.find('REMINDER3');
    var VAR_ORD_UN = $xml.find('VAR_ORD_UN');
    var POINTS = $xml.find('POINTS');
    var POINT_UNIT = $xml.find('POINT_UNIT');
    var UNLIMITED = $xml.find('UNLIMITED');
    var ORDERPR_UN = $xml.find('ORDERPR_UN');
    var GR_BASEDIV = $xml.find('GR_BASEDIV');
    var INCOTERMS1 = $xml.find('INCOTERMS1');
    var INCOTERMS2 = $xml.find('INCOTERMS2');
    var ACKN_REQD = $xml.find('ACKN_REQD');
    var VAL_TYPE = $xml.find('VAL_TYPE');
    var SHIPPING = $xml.find('SHIPPING');
    var CONF_CTRL = $xml.find('CONF_CTRL');
    var BASE_UOM = $xml.find('BASE_UOM');
    var PO_UNIT = $xml.find('PO_UNIT');
    var PRICE_UNIT = $xml.find('PRICE_UNIT');
    var PLND_DELRY = $xml.find('PLND_DELRY');
    var CURRENCY = $xml.find('CURRENCY');

    MainCode = MainCode.text();
    Message = Message.text();
    OverDelTolerance = OverDelTolerance.text();
    UnderDelTolerance = UnderDelTolerance.text();    
    CONV_NUM1 = CONV_NUM1.text();
    CONV_DEN1 = CONV_DEN1.text();
    VEND_MAT = VEND_MAT.text();
    SALES_PERS = SALES_PERS.text();
    TELEPHONE = TELEPHONE.text();
    REMINDER1 = REMINDER1.text();
    REMINDER2 = REMINDER2.text();
    REMINDER3 = REMINDER3.text();
    VAR_ORD_UN = VAR_ORD_UN.text();
    POINTS = POINTS.text();
    POINT_UNIT = POINT_UNIT.text();
    UNLIMITED = UNLIMITED.text();
    ORDERPR_UN = ORDERPR_UN.text();
    GR_BASEDIV = GR_BASEDIV.text();
    INCOTERMS1 = INCOTERMS1.text();
    INCOTERMS2 = INCOTERMS2.text();
    ACKN_REQD = ACKN_REQD.text();
    VAL_TYPE = VAL_TYPE.text();
    SHIPPING = SHIPPING.text();
    CONF_CTRL = CONF_CTRL.text();
    BASE_UOM = BASE_UOM.text();
    PO_UNIT = PO_UNIT.text();
    PRICE_UNIT = PRICE_UNIT.text();
    PLND_DELRY = PLND_DELRY.text();
    CURRENCY = CURRENCY.text();

    console.log("MainCode: " + MainCode);
    console.log("Message: " + Message);
    console.log("OverDelTolerance: " + OverDelTolerance);
    console.log("UnderDelTolerance: " + UnderDelTolerance);    
    console.log("CONV_NUM1: " + CONV_NUM1);
    console.log("CONV_DEN1: " + CONV_DEN1);
    console.log("VEND_MAT: " + VEND_MAT);
    console.log("SALES_PERS: " + SALES_PERS);
    console.log("TELEPHONE: " + TELEPHONE);
    console.log("REMINDER1: " + REMINDER1);
    console.log("REMINDER2: " + REMINDER2);
    console.log("REMINDER3: " + REMINDER3);
    console.log("VAR_ORD_UN: " + VAR_ORD_UN);
    console.log("POINTS: " + POINTS);
    console.log("POINT_UNIT: " + POINT_UNIT);
    console.log("UNLIMITED: " + UNLIMITED);
    console.log("ORDERPR_UN: " + ORDERPR_UN);
    console.log("GR_BASEDIV: " + GR_BASEDIV);
    console.log("INCOTERMS1: " + INCOTERMS1);
    console.log("INCOTERMS2: " + INCOTERMS2);
    console.log("ACKN_REQD: " + ACKN_REQD);
    console.log("VAL_TYPE: " + VAL_TYPE);
    console.log("SHIPPING: " + SHIPPING);
    console.log("CONF_CTRL: " + CONF_CTRL);
    console.log("BASE_UOM: " + BASE_UOM);
    console.log("PO_UNIT: " + PO_UNIT);
    console.log("PRICE_UNIT: " + PRICE_UNIT);
    console.log("PLND_DELRY: " + PLND_DELRY);
    console.log("CURRENCY: " + CURRENCY);

    var overDetlvTolAndUnserDelvTolResponseJsonObj = {};

    overDetlvTolAndUnserDelvTolResponseJsonObj["mainCode"] = MainCode;
    overDetlvTolAndUnserDelvTolResponseJsonObj["message"] = Message;
    overDetlvTolAndUnserDelvTolResponseJsonObj["overDelTolerance"] = OverDelTolerance;
    overDetlvTolAndUnserDelvTolResponseJsonObj["underDelTolerance"] = UnderDelTolerance;    
    overDetlvTolAndUnserDelvTolResponseJsonObj["CONV_NUM1"] = CONV_NUM1;
    overDetlvTolAndUnserDelvTolResponseJsonObj["CONV_DEN1"] = CONV_DEN1;
    overDetlvTolAndUnserDelvTolResponseJsonObj["VEND_MAT"] = VEND_MAT;
    overDetlvTolAndUnserDelvTolResponseJsonObj["SALES_PERS"] = SALES_PERS;
    overDetlvTolAndUnserDelvTolResponseJsonObj["TELEPHONE"] = TELEPHONE;
    overDetlvTolAndUnserDelvTolResponseJsonObj["REMINDER1"] = REMINDER1;
    overDetlvTolAndUnserDelvTolResponseJsonObj["REMINDER2"] = REMINDER2;
    overDetlvTolAndUnserDelvTolResponseJsonObj["REMINDER3"] = REMINDER3;
    overDetlvTolAndUnserDelvTolResponseJsonObj["VAR_ORD_UN"] = VAR_ORD_UN;
    overDetlvTolAndUnserDelvTolResponseJsonObj["POINTS"] = POINTS;
    overDetlvTolAndUnserDelvTolResponseJsonObj["POINT_UNIT"] = POINT_UNIT;
    overDetlvTolAndUnserDelvTolResponseJsonObj["UNLIMITED"] = UNLIMITED;
    overDetlvTolAndUnserDelvTolResponseJsonObj["ORDERPR_UN"] = ORDERPR_UN;
    overDetlvTolAndUnserDelvTolResponseJsonObj["GR_BASEDIV"] = GR_BASEDIV;
    overDetlvTolAndUnserDelvTolResponseJsonObj["INCOTERMS1"] = INCOTERMS1;
    overDetlvTolAndUnserDelvTolResponseJsonObj["INCOTERMS2"] = INCOTERMS2;
    overDetlvTolAndUnserDelvTolResponseJsonObj["ACKN_REQD"] = ACKN_REQD;
    overDetlvTolAndUnserDelvTolResponseJsonObj["VAL_TYPE"] = VAL_TYPE;
    overDetlvTolAndUnserDelvTolResponseJsonObj["SHIPPING"] = SHIPPING;
    overDetlvTolAndUnserDelvTolResponseJsonObj["CONF_CTRL"] = CONF_CTRL;
    overDetlvTolAndUnserDelvTolResponseJsonObj["BASE_UOM"] = BASE_UOM;
    overDetlvTolAndUnserDelvTolResponseJsonObj["PO_UNIT"] = PO_UNIT;
    overDetlvTolAndUnserDelvTolResponseJsonObj["PRICE_UNIT"] = PRICE_UNIT;
    overDetlvTolAndUnserDelvTolResponseJsonObj["PLND_DELRY"] = PLND_DELRY;
    overDetlvTolAndUnserDelvTolResponseJsonObj["CURRENCY"] = CURRENCY;

    return overDetlvTolAndUnserDelvTolResponseJsonObj;
}

if ($("table.createdOLATable").length) {
    $(document).ready(function() {
        $('#createdOLATable thead tr').clone(true).appendTo('#createdOLATable thead');
        $('#createdOLATable thead tr:eq(1) th').each(function(i) {
            $('#createdOLATable thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '' || title === 'Details')
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

        var table = $('table.createdOLATable').DataTable({
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'OLA details'},
                        {extend: 'pdf', title: 'OLA details'},
                        {extend: 'print', title: 'OLA details'}
                    ]
                }
            ]
        });
        table.buttons().container()
                .appendTo('#createdOLATable_wrapper .col-md-6:eq(0)');
    });
};

function fetchInfoRecordDetails(materialCode, requestFor)
{   
    console.log("In fetchInfoRecordDetails:");
    console.log("requestFor: " + requestFor);
    var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
    var purchasingOrg = $("#purchasingOrg").val();
        
    console.log("vendorCode: " + vendorCode);    
    console.log("purchasingOrg: " + purchasingOrg);    
        
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);
    
    var serviceUrl = "";
    if(requestFor === "PR")
        serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_getToleranceData?VENDOR=" + vendorCode + "&MATERIAL=" + materialCode + "&PURCH_ORG=" + purchasingOrg + "&POType=PR";
    else if(requestFor === "SA")
        serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_getToleranceData?VENDOR=" + vendorCode + "&MATERIAL=" + materialCode + "&PURCH_ORG=" + purchasingOrg + "&POType=standalone";
    console.log("serviceUrl: " + serviceUrl);

    var local_dev_uat = $("#local_dev_uat").val();
    console.log("local_dev_uat: " + local_dev_uat);
    
    var infoRecordJsonObj = "";
    if (local_dev_uat === "dev" || local_dev_uat === "uat")
    {
        console.log("Calling Web Service...");
        $.ajax({
            type: "POST",
            url: serviceUrl,
            contentType: "application/xml",
            dataType: "xml",
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log("Response: " + data);
                infoRecordJsonObj = fetchOverDelvTolAndUnserDelvTol(data);
                var mainCode = infoRecordJsonObj["mainCode"];
                console.log("%cInfoRecord MainCode: " + mainCode, "color: blue");
                
            }
        });
    }
    else
    {
        infoRecordJsonObj = fetchOverDelvTolAndUnserDelvTol("");
        var mainCode = infoRecordJsonObj["mainCode"];
        console.log("%cInfoRecord MainCode: " + mainCode, "color: blue");        
    }
    return infoRecordJsonObj;
}